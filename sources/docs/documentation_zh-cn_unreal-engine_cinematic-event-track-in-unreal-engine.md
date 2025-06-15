# 虚幻引擎过场动画事件轨道 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:11:43.590Z

---

目录

![事件轨道](https://dev.epicgames.com/community/api/documentation/image/643a170c-db30-40e1-a0e1-a8a7ed1e9e34?resizing_type=fill&width=1920&height=335)

在Sequencer中，你可以在要执行[蓝图脚本](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)功能的序列中定义帧。这是使用 **事件轨道（Event Track）** 实现的。

本指南将概述事件轨道，包括创建方式，访问导演蓝图，以及你可以创建的事件类型。

#### 先决条件

-   你已了解[Sequencer](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)及其[界面](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine)。
-   你已了解[蓝图可视化脚本](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)。

## 创建

要创建事件轨道，请点击Sequencer中的 **添加轨道（+）** ，找到 **事件轨道（Event Track）**，然后选择[触发器（Trigger）](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine#%E8%A7%A6%E5%8F%91%E5%99%A8%E4%BA%8B%E4%BB%B6)或[重复器（Repeater）](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine#%E9%87%8D%E5%A4%8D%E5%99%A8%E4%BA%8B%E4%BB%B6)事件类型。

![创建事件轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c75b6389-625f-4409-afca-142b2bdf9a74/createevent1.png)

事件轨道还可以在[Object绑定轨道](/documentation/zh-cn/unreal-engine/cinematic-actor-tracks-in-unreal-engine)下创建，这会[将事件绑定到该对象](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine#%E5%AF%B9%E8%B1%A1%E7%BB%91%E5%AE%9A)。

![创建事件轨道Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dcc42d3e-82ad-4acc-af20-205f8d79780e/createevent2.png)

创建事件轨道后，你可以创建额外的事件[分段](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine#%E5%88%86%E6%AE%B5)，方法是点击该事件轨道上的 **添加分段（+）**，然后选择事件类型。

![添加更多事件轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec7d6874-7180-46f7-8361-2e54869569d0/createevent3.png)

添加事件时，你可以选择添加 **触发器（Trigger）** 或 **重复器（Repeater）** 类型事件。触发器事件会导致事件在与关键帧相同的帧上求值，而重复器事件将事件分段的时长内为每个帧求值。

### 触发器事件

触发器事件是针对每个关键帧求值一次的事件。创建此轨道后，你就可以对其 **[设置关键帧](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine)** 以创建事件关键帧。

![触发器事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f188c8df-155e-4793-8ec7-cd1108d6e290/trigger1.png)

### 重复器事件

重复器事件是将在事件分段的时长内针对序列的每个帧连续触发或求值的事件。调整序列的[每秒帧数（Frames Per Second）](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E6%AF%8F%E7%A7%92%E5%B8%A7%E6%95%B0)还将调整重复器的求值速率以匹配。创建此轨道后，它将包含有限的[分段（Section）](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine#%E5%88%86%E6%AE%B5)范围，从而控制其求值时间。

![重复器事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6beeae8-1fda-4346-a37a-41ec5a9b1eb8/repeater.png)

你可以[编辑、移动和修剪](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine#%E4%BA%A4%E4%BA%92%E5%92%8C%E6%98%BE%E7%A4%BA)此事件分段，就像对Sequencer中的其他分段那样。

## 导演蓝图

导演蓝图是事件轨道的逻辑中心，其中你将从事件端点执行[蓝图可视化脚本（Blueprint Visual Scripting）](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)。你还可以在蓝图中指定 **参数（Parameters）** 和 **对象绑定（Object Bindings）**，以便在整个脚本中传递变量和对象信息。每个 **关卡序列（Level Sequence）** 都有自己的导演蓝图，其中包含该序列中事件的所有逻辑。

你可以使用多种方式打开导演蓝图：

1.  双击事件关键帧或分段。如果事件当前未绑定，此方法还会将事件绑定到新的[**端点**](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine#%E4%BA%8B%E4%BB%B6%E7%AB%AF%E7%82%B9)。
    
    ![双击事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fbfcaa6e-a159-47f7-876e-12c212e74a91/directorbp1.gif)
    
2.  点击[导演蓝图工具栏按钮（Director Blueprint Toolbar button）](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E5%AF%BC%E6%BC%94%E8%93%9D%E5%9B%BE)。
    
    ![导演蓝图工具栏按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/286a0adf-d682-4375-bc60-02840008ca98/opendp2.png)
    
3.  点击[操作工具栏按钮（Actions Toolbar button）](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E6%93%8D%E4%BD%9C)，然后选择 **打开导演蓝图（Open Director Blueprint）**。
    
    ![打开导演蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9fed1e66-12ae-4a00-b692-0c4916ab350b/opendp.png)
    

### 事件端点

无论是创建触发器事件还是重复器事件，你都必须将其绑定到 **事件端点（Event Endpoint）**，以便向其添加逻辑。为此，请右键点击关键帧（如果使用触发器）或分段（如果使用重复器），然后选择 **属性（Properties）> 未绑定（Unbound）> 创建新端点（Create New Endpoint）**。这样做会将事件关键帧或分段绑定到新的端点节点并打开 **导演蓝图（Director Blueprint）**。

![创建新端点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f3f3370-a7eb-4947-82ad-c3474decd701/bind1.png)

事件端点可以通过蓝图的"细节（Details）"面板中的 **名称（Name）** 属性重命名。

![重命名事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84db3d5a-3250-45eb-92c4-6270f8f4e04a/rename.png)

你可以根据需要创建任意数量的事件关键帧或分段。你还可以使用 **快速绑定（Quick Bind）** 或 **重新绑定到（Rebind To）** 菜单来共享事件节点。

![事件轨道链接](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8bf721c-7045-43ec-a36d-a7cd8a10817d/eventlink.png)

### 参数和事件有效负载

与蓝图[自定义事件（Custom Events）](/documentation/zh-cn/unreal-engine/custom-events-in-unreal-engine)相似，事件轨道可以有与之关联的输入参数。你可以使用事件参数和有效负载在事件触发时将属性值发送到目标。

要将参数添加到事件，请选择事件端点，然后点击细节面板中的 **添加参数（+）**。这样做将在细节中以及脚本的节点上创建新参数

![事件轨道参数属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97ea92cd-b554-4cd4-9706-234d8d05042a/newparam.png)

右键点击事件关键帧或分段时，参数的额外属性将显示在 **有效负载（Payload）** 类别下。你可以在此定义参数上的值，而事件在执行时将发送这些值。

![有效负载](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de691861-f336-41d9-a8ec-52a60d34ef37/payload.png)

### 对象绑定

在Sequencer中的绑定对象下创建事件轨道时，将为事件轨道创建 **对象绑定（Object Binding）**，其中事件节点的目标对象将绑定到事件轨道添加到的对象。这样就更容易对序列中的特定Actor编写脚本函数，因为现在可以直接对对象调用函数。

![事件轨道Actor绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7468e28-b495-4e9d-992b-0d3a240b0635/binding1.png)

关键帧或分段属性上下文菜单上还会公开一个额外的属性。**将绑定的对象传递到（Pass Bound Object To）** 将控制此事件应绑定到哪个对象参数。如果你已将额外的 **对象（Object）** 或[蓝图接口（Blueprint Interface）](/documentation/zh-cn/unreal-engine/blueprint-interface-in-unreal-engine)添加到端点节点，它们在这里就是可选择的。

![将绑定的对象传递到](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2cf3224b-7c2d-4cc6-b184-7e37a6990a50/binding2.png)

如果尚未对你的对象绑定事件指定一个端点节点，你可以使用 **快速绑定（Quick Bind）** 命令添加与绑定的对象直接相关的脚本函数，类似于从蓝图中的对象引用调用函数。

![快速绑定事件Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3545e393-d2f5-45ca-a7af-26e2cb680a79/binding3.png)

## 事件属性

右键点击触发器关键帧或重复器分段时，你可以在 **属性（Properties）** 上下文菜单中查看以下属性。

![事件属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/447a6e2f-875a-493c-88a4-2c8eb9d30088/eventproperties.png)

名称

说明

**事件（Event）**

此关键帧或分段在[导演蓝图（Director Blueprint）](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine#%E5%AF%BC%E6%BC%94%E8%93%9D%E5%9B%BE)中绑定到的 **事件端点（Event Endpoint）**。

默认情况下，这是未绑定的，要进行绑定，可以点击下拉菜单，然后选择 **Create New Endpoint** 或其他现有端点节点。

![未绑定创建新端点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/313535f5-fe1d-4cd6-99cb-98417adb0771/newendpoint.png)

**快速绑定（Quick Bind）** 包含此事件的兼容函数列表，在事件轨道绑定到对象时还包括对象绑定。

![快速绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffb0c584-2aca-44f7-9013-21ce4ec0b678/quickbind.png)

**在编辑器中调用（Call In Editor）**

启用此项将导致事件逻辑在编辑器会话中求值，而不需要你[在编辑器中播放或模拟（Play or Simulate in Editor）](/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine)。事件绑定到端点节点后，此属性会立即显示。

你还可以右键点击事件轨道，在 **属性（Properties）** 上下文菜单中查看以下属性。

![事件轨道属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8282d501-669f-425e-b51e-1508ad004760/eventproperties2.png)

名称

说明

向前时触发事件（Fire Event when Forwards）

启用此属性将导致事件在序列正常向前播放时触发。

向后时触发事件（Fire Event when Backwards）

启用此属性将导致事件在序列逆向播放时触发。

如果你需要在预览序列时多次将事件链重置回正常，使用 **向前（Forwards）** 和 **向后（Backwards）** 属性可能很有用。你可以将一个事件轨道设置为仅向前触发，将另一个事件轨道设置为仅向后触发。此后，你可以将向前事件连接到正常事件链，并将向后事件连接到重置链。

事件位置（Event Position）

定义事件应该在求值中的什么位置触发。

-   **在求值开始时（At Start Of Evaluation）** 将导致该事件首先触发，然后再对序列中的其他全部内容求值。
-   **在求值结束时（At End Of Evaluation）** 将导致该事件最后触发，在此之前对序列中的其他全部内容求值。
-   **在生成之后（After Spawn）** 将导致事件在[可生成](/documentation/zh-cn/unreal-engine/spawn-temporary-actors-in-unreal-engine-cinematics)生成并求值之后触发。

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [event track](https://dev.epicgames.com/community/search?query=event%20track)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [创建](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine#%E5%88%9B%E5%BB%BA)
-   [触发器事件](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine#%E8%A7%A6%E5%8F%91%E5%99%A8%E4%BA%8B%E4%BB%B6)
-   [重复器事件](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine#%E9%87%8D%E5%A4%8D%E5%99%A8%E4%BA%8B%E4%BB%B6)
-   [导演蓝图](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine#%E5%AF%BC%E6%BC%94%E8%93%9D%E5%9B%BE)
-   [事件端点](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine#%E4%BA%8B%E4%BB%B6%E7%AB%AF%E7%82%B9)
-   [参数和事件有效负载](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine#%E5%8F%82%E6%95%B0%E5%92%8C%E4%BA%8B%E4%BB%B6%E6%9C%89%E6%95%88%E8%B4%9F%E8%BD%BD)
-   [对象绑定](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine#%E5%AF%B9%E8%B1%A1%E7%BB%91%E5%AE%9A)
-   [事件属性](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine#%E4%BA%8B%E4%BB%B6%E5%B1%9E%E6%80%A7)
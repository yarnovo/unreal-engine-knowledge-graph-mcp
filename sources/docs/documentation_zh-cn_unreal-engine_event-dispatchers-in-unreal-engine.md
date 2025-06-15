# 虚幻引擎事件分发器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/event-dispatchers-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:35:37.208Z

---

目录

![事件分发器](https://dev.epicgames.com/community/api/documentation/image/4ad46ef2-0f46-43a6-9d2f-0ec169f4c4e0?resizing_type=fill&width=1920&height=335)

[Blueprint Actor通信](/documentation/zh-cn/unreal-engine/actor-communication-in-unreal-engine)页面中的\[事件分发器\]((making-interactive-experiences\\interactive-framework\\actors\\actor-communication\\ed-quickstart)示例用蓝图和C++两种语言进行了演示。可被视为蓝图脚本的补充帮助工具。

通过将一个或多个事件绑定到 **事件分发器（Event Dispatcher）**，您可以在调用事件分发器时触发所有这些事件。这些事件可以绑定到蓝图类中，但事件分发器也允许在关卡蓝图中触发事件。

## 创建事件分发器

事件分发器在蓝图编辑器的[蓝图编辑器"我的蓝图"面板](/documentation/zh-cn/unreal-engine/my-blueprint-panel-in-the-blueprints-visual-scripting-editor-for-unreal-engine)选项卡中创建。

若要创建新的事件分发器，请执行以下操作：

1.  在 **我的蓝图（My Blueprint）** 面板中，单击事件分发器类别上的 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/102ec494-e427-419c-9829-d762158abc9f/plus_button.png)按钮：![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb0c0eca-f9f1-4057-b52e-ea01c701024c/myblueprint_eventdispatcher.png).
    
2.  在名称字段中输入事件分发器的名称，该字段显示在 **我的蓝图（My Blueprint）** 选项卡中列表的末尾。
    
    ![](name_event_Dispatcher.png)

### 设置属性

通过在 **我的蓝图（My Blueprint）** 面板中选择事件分发器，您可在 **细节（Details）** 面板中编辑其属性。您可以为事件分发器设置提示文本和类别，并可添加输入。

向事件分发器添加输入允许向绑定到事件分发器的每个事件发送变量。这不仅允许蓝图类中的数据流， 还允许蓝图类与关卡蓝图之间的数据流。

向事件分发程序添加输入的过程类似于向函数、自定义事件和宏添加输入和输出的工作流程。如果您希望使用与另一个事件相同的输入，可以使用 **从…复制签名（Copy Signature from）** 下拉菜单来指示事件。 若要将您自己的输入添加到事件分发器，请执行以下操作：

1.  单击 **细节（Details）** 窗格的 **输入（Inputs）** 部分中的 **新建（New）**。
    
    ![](new_input_Dispatcher.png)
2.  为新输入命名并使用下拉菜单设置其类型。在本例中，有一个名为 **MyStringParam** 的字符串输入参数。
    
    ![](named_new_Dispatcher.png)
3.  您还可以设置一个默认值，并通过展开参数的条目来指示是否通过参考传递参数。
    
    ![](expanded_input_Dispatcher.png)
    
    若要更改此参数在节点边缘上的引脚位置，请在展开的 **细节（Details）** 窗格条目中使用向上和向下箭头。
    

## 使用事件分发器

创建了事件分发器后，您就可以添加事件节点，绑定节点和取消绑定与之链接的节点。虽然您可以双击 **我的蓝图（My Blueprint）** 选项卡中的事件分发器条目以打开事件分发器的图表， 但是图表处于锁定状态，因此您无法直接修改事件分发器。绑定法、取消绑定法和指定法都使您能够将事件添加到事件分发器的事件列表中， 而调用法将激活存储在事件列表中的所有事件。

事件、绑定和解除绑定节点都可以添加到蓝图类和关卡蓝图中。除了事件节点，各个节点都有一个 **目标（Target）** 输入引脚：

-   在蓝图类中，此引脚自动设置为 **自身（Self）**。这意味着事件列表针对该类发生了更改，因此该类的每个实例都会产生变化。
-   在关卡蓝图中，此引脚必须关联到对关卡中该类的一个实例的引用。这意味着，事件列表将仅针对该类的特定实例进行更改。 [关卡蓝图文档](/documentation/zh-cn/unreal-engine/level-blueprint-in-unreal-engine#%E5%BC%95%E7%94%A8actor)说明了如何创建您可能需要的任何 **Actor** 参考。

[

![绑定和解除绑定事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c018d40-2487-467c-b6cd-a0fa79a887ec/placeholder_topic.png)

绑定和解除绑定事件

将事件添加到事件分发器事件列表（以及从中移除事件）。





](/documentation/zh-cn/unreal-engine/binding-and-unbinding-events-in-unreal-engine)[

![调用事件分发器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6511c538-5584-4260-8281-a866a6fbc866/placeholder_topic.png)

调用事件分发器

调用事件分发器来执行事件列表中当前绑定的所有事件。





](/documentation/zh-cn/unreal-engine/calling-event-dispatchers-in-unreal-engine)[

![创建分发器事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd845f99-3bb5-4e39-b65d-644cf309aeb6/create_eventdispatcher_topic.png)

创建分发器事件

创建可以绑定并添加到事件分发器的事件列表中的事件。





](/documentation/zh-cn/unreal-engine/creating-dispatcher-events-in-unreal-engine)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建事件分发器](/documentation/zh-cn/unreal-engine/event-dispatchers-in-unreal-engine#%E5%88%9B%E5%BB%BA%E4%BA%8B%E4%BB%B6%E5%88%86%E5%8F%91%E5%99%A8)
-   [设置属性](/documentation/zh-cn/unreal-engine/event-dispatchers-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%B1%9E%E6%80%A7)
-   [使用事件分发器](/documentation/zh-cn/unreal-engine/event-dispatchers-in-unreal-engine#%E4%BD%BF%E7%94%A8%E4%BA%8B%E4%BB%B6%E5%88%86%E5%8F%91%E5%99%A8)
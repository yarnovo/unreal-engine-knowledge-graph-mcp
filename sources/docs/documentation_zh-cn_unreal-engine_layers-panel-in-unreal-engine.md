# 虚幻引擎层级面板 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/layers-panel-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:19:23.264Z

---

目录

![层级面板](https://dev.epicgames.com/community/api/documentation/image/7b6fb9ed-ce44-4002-b023-6f7b567dd025?resizing_type=fill&width=1920&height=335)

**层级（Layers）** 面板允许您组织关卡中的Actor。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/746811f1-2430-4998-aa18-d301a0ebb9af/01-layer-infra.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/746811f1-2430-4998-aa18-d301a0ebb9af/01-layer-infra.png)

点击查看大图。

层级提供了快速选择和控制相关Actor组可视性的能力。 您可以使用您的层级来快速整理一个场景， 只留下您正在处理的几何体和Actor。例如，您可能正在处理一个由多个模块组成的 多层建筑。通过将每个楼层分配到一个层级，您可以隐藏您不在处理的每个楼层， 使顶视图更易于管理。

一个Actor可以在任意多个层级中。如果有不同Actor集归入重叠层级下， 这可能会很有用。例如，您可以通过将特定 *区域* 内的所有内容分配给一个层级来组织您的层级， 并让另一个层包含您关卡中的所有门。

在创建大关卡时，使用层级的范围越广，工作就越容易。记住， 从一开始就使用层级总是比在您已经深入到关卡创建的时候 再去整合它们要容易的多。

## 层级创建

可以在 **Layers（层级）** 面板中创建为空层级，也可以使用当前选择。

**要创建空层级，请执行以下操作：**

1.  在 **层级（Layers）** 面板中 **右键单击**，并选择 *创建空层级（Create Empty Layer）*。
    
    ![Create Empty Layer menu option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ece3282-50d7-417d-ac4d-7a413eab709a/02-create-empty-layer-menu-option.png "Create Empty Layer menu option")
2.  新层级将显示在列表中。
    
    ![Layer1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44e84115-4d63-490b-839f-37a18810277e/03-layer-layer-1.png "Layer1")

**要从选择中创建层级，请执行以下操作：**

1.  在视口中选择要添加到层级中的对象。
    
    ![Selected Actors](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af962d58-4a72-4962-980e-e16c056a6f02/04-selected-actors.png "Selected Actors")
2.  在 **层级（Layers）** 面板中 **右键单击**，并选择 *将选定Actor添加到新层级（Add Selected Actors to New Layer）*。
    
    ![New Layer from Selection menu option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5437cb71-efa2-4613-bc77-94fe20cff697/05-new-layer-from-selection-menu-option.png "New Layer from Selection menu option")
3.  包含Actor的新层级将显示在列表中。
    
    ![Layer 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/496f76d8-60c5-4911-a84e-e0a2c0d1a629/06-layer-layer-1.png "Layer 1")

**要通过拖放创建层级，请执行以下操作：**

1.  选择要添加到层级的Actor。
    
2.  将Actor从 **世界大纲视图（World Outliner）** 拖到 **层级（Layers）** 面板中的空白区域。
    
    ![Layer drag drop](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4546abb7-1137-4b8c-a1a8-47704f595fe5/07-layer-drag-drop.png "Layer drag drop")
3.  包含Actor的新层级将显示在列表中。
    
    ![Layer 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06d7a4f8-79f3-4ac3-9c30-f577379fb092/08-layerlayer-1.png "Layer 1")

## 层级命名

默认情况下，使用 *层级（Layer）\[编号\]* 命名方案为新层级指定一个名称。每增加一个新层， 这个编号就会增大。最好确保使用描述性名称命名层级， 并且永远不要保留默认名称。例如，一个包含散落在地板上的小物品的层级可能被命名为 *地面杂物（Ground Clutter）*。这不仅可以方便地快速查看每个层级包含的内容， 而且使使用[搜索](/documentation/zh-cn/unreal-engine/layers-panel-in-unreal-engine#%E6%90%9C%E7%B4%A2%E5%B1%82%E7%BA%A7)特性过滤层级成为可能。

层级名称可以包含任何字母数字字符，也可以包含空格、连字符和下划线。

**要重命名层级，请执行以下操作：**

1.  **右键单击** 层级并从上下文菜单中选择 **重命名（Rename）**。
    
    ![Rename layer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4589822-a24f-40ad-92b5-80fc98fd3da0/09-rename-layer.png "Rename layer")
2.  在包含当前名称的文本框中输入名称。
    
    ![Layer new name](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef6a3aba-1a91-493d-908f-e43a6fa63322/10-layer-new-name.png "Layer new name")
3.  该层级以新名称显示。
    
    ![Layer new name](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/744f655c-49e8-48cc-aa0c-c8b1bceef0a3/11-layer-new-name-2.png "Layer new name")

## 搜索层级

可以使用 **层级（Layers）** 面板顶部的搜索框过滤层级。过滤是基于 搜索框中输入的文本与层级的名称之间的匹配进行的。当您在框中输入时， 层级列表会被实时过滤；只显示名称与文本匹配的层级。

![Unfiltered Layer List](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5cbc5ae7-a688-49ae-ae6f-6897852f3f2c/12-layer-new-name-2.png "Unfiltered Layer List")

![Filtered Layer List](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f5eb45d-9556-4dd6-aed4-6a077fdd9cdb/13-layers-filter.png "Filtered Layer List")

未过滤的层级列表

已过滤的层级列表

按"X"按钮清除当前搜索项。

## 层级内容

层级的内容可以直接在 **层级（Layers）** 面板中查看。层级内容视图显示 层级的名称、包含在层级中的所有Actor的列表以及有关层级内容的信息。 要进入层级内容视图，选中要查看的层级， 再按 **层级（Layers）** 面板底部的 **查看内容（See Contents）** 按钮，

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32be3e2e-68b7-4da1-935d-c82ad06b9e04/15-layer-contents-view.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32be3e2e-68b7-4da1-935d-c82ad06b9e04/15-layer-contents-view.png)

点击查看大图。

该层级的名称和一组按钮一起显示在顶部， 这些按钮显示了该层级中包含的Actor的各种类型和数量。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8cd6ce32-8278-4933-bf84-4ccae79fdbfd/16-layer-contents-view-title-bar.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8cd6ce32-8278-4933-bf84-4ccae79fdbfd/16-layer-contents-view-title-bar.png)

点击查看大图。

层级名称右侧的各种按钮显示了层级中包含的各个Actor类型的数量 。例如，层级（Layers）面板右下角的按钮通知用户 层级中包含139个静态网格体Actor。

这些按钮还可以用来执行[特定于类型的选择](/documentation/zh-cn/unreal-engine/layers-panel-in-unreal-engine#%E7%89%B9%E5%AE%9A%E4%BA%8E%E7%B1%BB%E5%9E%8B%E7%9A%84%E9%80%89%E6%8B%A9)。

要返回到层级列表，请按![Back button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4fc83782-37a9-4408-9298-3e5005b1a394/17-back-button.png "Back button")按钮。

### 添加Actor

Actor可以作为选择添加到一个或多个层级中，也可以从 **世界大纲视图（World Outliner）** 中拖放。

**要添加Actor的选择，请执行以下操作：**

1.  选择要添加到层级的Actor。
    
    ![Select Actors to add](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f67b153-bdc2-4cf0-8688-ce26892f7ec8/18-select-actors-to-add.png "Select Actors to add")
2.  **右键单击** 要添加Actor的层级，并选择 *将选定Actor添加到选定层级（Add Selected Actors to Selected Layers）*。
    
    ![Add Selected Actors to Selected Layers](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/224aeab6-95bc-4a95-a45c-3274435e9204/19-add-selected-actors-to-selected-layers.png "Add Selected Actors to Selected Layers")

**要通过拖放添加，请执行以下操作：**

1.  选择要添加到层级的Actor。
    
2.  将Actor从 **世界大纲视图（World Outliner）** 拖到 **层级（Layers）** 面板中的某个层级。
    
    您还可以拖到 **层级（Layers）** 面板底部的内容栏， 将Actor分配到选定层级。
    
    ![Layers drag and drop](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ce9c552-b782-4ca4-9534-63ead7839ad7/20-layers-drag-and-drop.png "Layers drag and drop")在拖放时，已经分配Actor的层级会变灰。 此外，如果已将被拖动的Actor分配到目标层级，则会有一条消息 通知您这一点： ![All Actors already Assigned to Layer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45881a37-67f0-4cad-bf0b-18dcacfa3b0a/21-all-actors-already-assigned-to-layer.png "All Actors already Assigned to Layer") 
3.  Actor被添加到层级。
    

### 移除Actor

Actor可以单独或作为一组选定Actor从层级中移除。

**要移除单独的Actor，请执行以下操作：**

1.  按层级内容视图中的Actor旁的"X"按钮。
    
    ![Remove Actor button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e52c83e2-ec83-4019-963f-28bb8ca13cdf/22-remove-actor-button.png "Remove Actor button")
2.  从层级中移除Actor，并更新列表。
    
    ![Remove Actor button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16d55ae1-d994-45c8-a016-a817b3abe676/23-remove-actor-button.png "Remove Actor button")

**要移除一组选定Actor，请执行以下操作：**

1.  选择要从层级中移除的Actor。
    
    ![Select Actors to remove](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a77fc9eb-ec9a-46e2-bd25-37361f78c019/24-select-actors-to-remove.png "Select Actors to remove")
2.  **右键单击** 该层级，并选择 *从层级中移除选定Actor（Remove Selected Actors from Layers）*。
    
    ![Remove Selected Actors menu option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf07ecf6-fea6-4fb1-9d1a-6ceb713b5d40/25-remove-selected-actors-menu-option.png "Remove Selected Actors menu option")
3.  从层级中移除Actor。
    

### 搜索层级内容

可以使用顶部的搜索框在层级内容视图中过滤层级中的Actor。过滤是基于 搜索框中输入的文本与Actor的名称之间的匹配进行的。当您在框中输入时， Actor列表会被实时过滤；只显示名称与文本匹配的Actor。

![Unfiltered Layer Contents](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41d0f91a-7685-4f41-b10a-f4e9d858c521/26-layers-contents-unfiltered.png "Unfiltered Layer Contents")

![Filtered Layer Contents](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05b05724-9bc5-4a14-b031-07cf50ad3dc3/27-layers-contents-filtered.png "Filtered Layer Contents")

未过滤的层级内容

已过滤的层级内容

按"X"按钮清除当前搜索项。

## 可视性

通过在层级列表中切换层级的可视性（眼睛）按钮， 可以显示或隐藏任何层级的内容。

![Layer Visible](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c72787f2-ee56-4a95-920b-85a5d8b946a3/28-layer-visible.png "Layer Visible")

![Layer Hidden](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c50b5ddf-4cee-46f9-84e6-b07240eb9910/29-layer-hidden.png "Layer Hidden")

可视 ![Visibility](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4db311ee-1399-467c-b3b2-d010b2ce4676/30-visible-visibility.png "Visible")

隐藏 ![Visibility](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b48cf8b-6817-47fb-a13a-73e2f15d11d7/31-hidden-visibility.png "Hidden")

## 选择方法

层级中的Actor可以作为一个组选择、单独选择或基于类型选择。层级中的Actor也可以添加到当前选择项中或从当前选择项中移除。

**要选择层级中的所有Actor，请执行以下操作：**

1.  在层级列表中 **双击** 该层级，或 **右键单击** 该层级并选择 *选择Actor（Select Actors）*。
    
    ![Select Actors menu option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cee40fc4-7a7b-4ee9-b8f7-76216919e2f7/32-select-actors-menu-option.png "Select Actors menu option")
2.  层级中的所有Actor都被选中，替换当前的选择集。
    
    ![Actors Selected](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7613ba2f-a990-4e7c-9f2d-8199f2a81cdb/33-actors-selected.png "Actors Selected")

**要将层级Actor附加到选项，请执行以下操作：**

1.  **右键单击** 该层级，并选择 *将Actor附加到选项（Append Actors to Selection）*。
    
    ![Select Actors menu option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e73e4bc5-4113-4d6a-a6b3-b90ef34b6ffe/34-select-actors-menu-option.png "Select Actors menu option")
2.  选中层级中的所有Actor，将它们附加到当前选择集。
    
    ![Initial Actors Selected](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a5cc6d0-3a3b-4151-a94a-997dd3227ec4/35-initial-actors-selected.png "Initial Selection")
    
    ![Layer Actors Appended](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06a007ef-0e3c-42dd-9582-35976de17678/36-layer-actors-appended.png "Layer Actors Appended")
    
    初始选择
    
    附加的层级Actor
    

**要从选择中移除层级Actor，请执行以下操作：**

1.  **右键单击** 该层级，并选择 *取消选择Actor（Deselect Actors）*。
    
    ![Select Actors menu option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/992fdb22-a7ca-446b-9cd2-e279875aa2c3/37-select-actors-menu-option.png "Select Actors menu option]")
2.  该层级中的所有Actor将从已取消选择项中移除，从当前选择集中移除它们。
    
    ![Initial Actors Selected](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6cc5f6ce-75bb-42ce-b9ea-8e24b4819a24/38-initial-actors-selected.png "Initial Selection")
    
    ![Layer Actors Removed](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fabc5f82-a9d0-4945-967c-22007c949c2f/39-layer-actors-removed.png "Layer Actors Removed")
    
    初始选择
    
    移除的层级Actor
    

### 特定于类型的选择

特定于类型的选择允许您快速地选择层级中包含某种类型的所有Actor。这可以使用主层级列表的内容栏或层级内容视图的标题栏中的按钮来执行。

![Contents Bar](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a430b042-ad5a-49d5-80f7-83cf92649401/40-contents-bar.png "Layer List Contents Bar")

![Title Bar](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62135c90-af7c-47ad-b997-73cd1a86d2d2/41-title-bar.png "Layer Contents View Title Bar")

层级列表内容栏

层级内容视图标题栏

按实例按钮选择层级中的所有静态网格体Actor。

![Selected StaticMeshActors](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24dc60ba-50e0-4fe1-a41a-5b4bc8d75a50/42-selected-static-mesh-actors.png)

## 细节层级分段

**层级（Layers）** 类别采用标签风格的布局，能显示所选Actor所属的层级。

![Layer cloud](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a32d3d40-b7be-4f54-b5f7-07718ee7f2c9/43-layer-cloud.png "Layer cloud")

只有所有被选中的Actor共有的层级才会被显示。

点击某个层级的 ![Remove](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3baa95bb-675d-4674-9ccb-49915ed71ec2/44-remove.png "Remove") 按钮，会将所有选中的Actor从该层级中删除。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [层级创建](/documentation/zh-cn/unreal-engine/layers-panel-in-unreal-engine#%E5%B1%82%E7%BA%A7%E5%88%9B%E5%BB%BA)
-   [层级命名](/documentation/zh-cn/unreal-engine/layers-panel-in-unreal-engine#%E5%B1%82%E7%BA%A7%E5%91%BD%E5%90%8D)
-   [搜索层级](/documentation/zh-cn/unreal-engine/layers-panel-in-unreal-engine#%E6%90%9C%E7%B4%A2%E5%B1%82%E7%BA%A7)
-   [层级内容](/documentation/zh-cn/unreal-engine/layers-panel-in-unreal-engine#%E5%B1%82%E7%BA%A7%E5%86%85%E5%AE%B9)
-   [添加Actor](/documentation/zh-cn/unreal-engine/layers-panel-in-unreal-engine#%E6%B7%BB%E5%8A%A0actor)
-   [移除Actor](/documentation/zh-cn/unreal-engine/layers-panel-in-unreal-engine#%E7%A7%BB%E9%99%A4actor)
-   [搜索层级内容](/documentation/zh-cn/unreal-engine/layers-panel-in-unreal-engine#%E6%90%9C%E7%B4%A2%E5%B1%82%E7%BA%A7%E5%86%85%E5%AE%B9)
-   [可视性](/documentation/zh-cn/unreal-engine/layers-panel-in-unreal-engine#%E5%8F%AF%E8%A7%86%E6%80%A7)
-   [选择方法](/documentation/zh-cn/unreal-engine/layers-panel-in-unreal-engine#%E9%80%89%E6%8B%A9%E6%96%B9%E6%B3%95)
-   [特定于类型的选择](/documentation/zh-cn/unreal-engine/layers-panel-in-unreal-engine#%E7%89%B9%E5%AE%9A%E4%BA%8E%E7%B1%BB%E5%9E%8B%E7%9A%84%E9%80%89%E6%8B%A9)
-   [细节层级分段](/documentation/zh-cn/unreal-engine/layers-panel-in-unreal-engine#%E7%BB%86%E8%8A%82%E5%B1%82%E7%BA%A7%E5%88%86%E6%AE%B5)
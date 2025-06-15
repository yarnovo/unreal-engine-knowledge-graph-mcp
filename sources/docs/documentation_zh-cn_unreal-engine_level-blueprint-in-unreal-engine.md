# 虚幻引擎中的关卡蓝图 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/level-blueprint-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:36:39.455Z

---

目录

![关卡蓝图](https://dev.epicgames.com/community/api/documentation/image/8f69fb72-0974-4a4f-aaf5-c36c3b0a3d69?resizing_type=fill&width=1920&height=335)

**关卡蓝图（Level Blueprint）** 是一种专业类型的 **蓝图（Blueprint）**，用作关卡范围的全局事件图。 在默认情况下，项目中的每个关卡都创建了自己的关卡蓝图，您可以在虚幻编辑器中编辑这些关卡蓝图， 但是不能通过编辑器接口创建新的关卡蓝图。

与整个级别相关的事件，或关卡内Actor的特定实例， 用于以函数调用或流控制操作的形式触发操作序列。 熟悉虚幻引擎3的人应该非常熟悉这个概念， 因为它与Kismet在虚幻引擎3中的工作原理非常相似。

关卡蓝图还提供了关卡流送和[Sequencer](/documentation/zh-cn/unreal-engine/real-time-compositing-with-sequencer-in-unreal-engine)的控制机制， 以及将事件绑定到关卡内的Actor的控制机制。

有关关卡蓝图UI的更多信息，请参阅[蓝图编辑器中的关卡蓝图UI](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-editor-user-interface-for-level-blueprints-in-unreal-engine)。

## 默认关卡蓝图

每个游戏都可以在DefaultGame.ini配置文件中指定默认的关卡蓝图类。所有新地图的关卡蓝图 都将使用此类创建，以允许特定于游戏添加件和功能。

## 打开关卡蓝图

若要打开关卡蓝图进行编辑，请单击 **关卡编辑器工具栏（Level Editor Toolbar）** 中的 **蓝图（Blueprints）** 并选择 **打开关卡蓝图（Open Level Blueprint）**。

![Level Blueprint Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52f74abd-8cd9-402b-84cf-d5e179e5fd23/toolbar_level_editor.png)

此操作将在 **蓝图编辑器（Blueprint Editor）** 中打开关卡蓝图：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04d5f6d7-5e25-4d1b-8154-aa2545736b5e/level_blueprint_editor.png)

**蓝图编辑器（Blueprint Editor）** 仅使用[图表编辑器](/documentation/zh-cn/unreal-engine/graph-editor-for-the-blueprints-visual-scripting-editor-in-unreal-engine)、**我的蓝图（My Blueprints）** 面板和 **细节（Details）** 面板。**类默认（Class Defaults）** 面板使用菜单栏上的 **类默认（Class Defaults）** ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27a036e5-1305-40dd-baa6-01fac197b0cd/classdefaults_button.png)按钮。

## 引用Actor

通常，您需要将对Actor的引用连接到关卡蓝图中节点上的 **目标（Target）** 引脚。若要获取包含Actor引用的节点，请执行以下操作：

1.  在 **关卡视口（Level Viewport）** 或 **世界场景大纲视图（World Outliner）** 中选择Actor。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8861de5-db54-4e40-b8f3-873960a26178/selected_actor.png)
2.  打开关卡蓝图。
    
    ![Level Blueprint Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34581f1c-0802-460e-9505-de5b3235f9f8/toolbar_level_editor.png)
3.  **右键单击** 您要在其中添加节点的图表。
4.  在显示的快捷菜单中选择 **将引用创建到\[SelectedActor\]（Create a reference to \[SelectedActor\]）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49dbdf0e-4b11-45ca-977a-70c9bdc7bbb7/add_reference_to.png)

或者：

1.  从 **世界场景大纲视图（World Outliner）** 选项卡中将一个Actor拖放至关卡蓝图中的某个图表。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6cae87a-b065-4d74-a9a5-83384732663f/add_reference_drag_drop.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6cae87a-b065-4d74-a9a5-83384732663f/add_reference_drag_drop.png)
    
    单击图片查看全图。
    

显示的Actor引用节点可以连接到任何兼容的 **目标（Target）** 引脚。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/646701d9-72f4-43a4-91d6-f86a9e1b811f/actor_reference.png)

在某些情况下，您不需要引用节点，因为您可以将正确类型的输出引脚连接到 **目标（Target）** 输入引脚。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/393cc1aa-0466-4533-b49e-2ac954d28c93/target_pin_noref.png)

## 添加事件

有两种方法可以将特定Actor的[事件](/documentation/zh-cn/unreal-engine/events-in-unreal-engine)添加到关卡蓝图中。

1.  右键点击关卡中的一个Actor，然后在 **关卡蓝图（Level Blueprint）** 下的快捷菜单中选择您想要添加的事件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7547767-3560-46c0-a8f9-d54bca8a0767/add_event_details_tab.png)

或者，一旦您选择了Actor，请执行以下操作：

1.  打开关卡蓝图。
    
    ![Level Blueprint Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45ce62c6-690f-4f2d-b798-71fed07c988d/toolbar_level_editor.png)
2.  右键单击您要在其中添加节点的图表。
    
3.  在显示的快捷菜单中，展开 **为\[ActorName\]添加事件（Add Event for \[ActorName\]）** 并选择您想要的事件类型。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2f8b16f-43d0-41ff-8756-1d12ea451ee5/add_event_for_actor.png)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [默认关卡蓝图](/documentation/zh-cn/unreal-engine/level-blueprint-in-unreal-engine#%E9%BB%98%E8%AE%A4%E5%85%B3%E5%8D%A1%E8%93%9D%E5%9B%BE)
-   [打开关卡蓝图](/documentation/zh-cn/unreal-engine/level-blueprint-in-unreal-engine#%E6%89%93%E5%BC%80%E5%85%B3%E5%8D%A1%E8%93%9D%E5%9B%BE)
-   [引用Actor](/documentation/zh-cn/unreal-engine/level-blueprint-in-unreal-engine#%E5%BC%95%E7%94%A8actor)
-   [添加事件](/documentation/zh-cn/unreal-engine/level-blueprint-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E4%BA%8B%E4%BB%B6)

相关文档

[

蓝图可视化脚本

![蓝图可视化脚本](https://dev.epicgames.com/community/api/documentation/image/a7cce2f7-f09a-4340-b3f4-2a5d4823bc46?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)
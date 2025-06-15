# 在虚幻引擎中创建分发器事件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-dispatcher-events-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:35:42.301Z

---

目录

![创建分发器事件](https://dev.epicgames.com/community/api/documentation/image/7c8879be-3bea-48da-ac16-092cb3d5ad04?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a86d3c7-a171-44fc-b52e-215ccc8fa082/dispatcher_event.png)

使用事件分发器的菜单上的 **事件（Event）** 选项将创建具有正确签名的自定义事件， 这样便可将其绑定到事件分发器。虽然事件节点与[自定义事件节点](/documentation/zh-cn/unreal-engine/custom-events-in-unreal-engine)类似，没有连接到 **绑定（Bind）** 节点， 但在执行 **调用\[EventDispatcherName\]（Call \[EventDispatcherName\]）** 节点时，此事件绝不会被触发。

## 创建事件分发器事件节点

事件分发器 **事件（Event）** 节点通过将其右上角的红色方形引脚连接到 **绑定事件（Bind Event）** 节点上的红色方形 **事件（Event）** 输入引脚，从而连接到 **绑定事件（Bind Event）** 节点。因此， 如果某个特定事件分发器已经有一个 **绑定事件（Bind Event）** 节点，并且您希望为其创建事件节点：

1.  拖走 **事件（Event）** 输入引脚，然后释放，以显示上下文菜单。
    
2.  在上下文菜单中选择 **为分发器添加自定义事件（Add Custom Event for Dispatcher）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/825f5432-c560-48b7-9fc5-2e502c30989e/add_custom_event_for_dispatcher.png)
3.  事件节点将被创建并自动正确地连接到 **绑定事件（Bind Event）** 节点。为您的事件输入一个名称。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d913f96-f44f-4671-a758-afafb1fe151d/delegate_pin_enter_name.png)

从事件分发器（Event Dispatcher）菜单或上下文菜单中选择 **分配（Assign）** 也将创建已经连接在一起的一个 **绑定事件（Bind Event）** 节点和一个相应的 **事件（Event）** 节点。

### 在蓝图类中

1.  在 **我的蓝图（My Blueprint）** 选项卡中拖走事件分发器的名称，并将其拖放到您正在使用的图表中。
    
2.  在显示的菜单中选择 **事件（Event）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06bb8e77-328d-49ce-8847-4d3d9e287f0a/dispatcher_event_menu.png)
3.  为您的事件输入一个名称。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e36c7362-d10a-4082-bb06-6594a945f516/dispatcher_event_enter_name.png)

### 在关卡蓝图中

您可以在关卡蓝图中设置一种特殊类型的事件分发器事件，在这种情况下，事件会自动绑定到事件分发器。这些事件的创建步骤 与默认事件（例如 **OnClicked** 或 **OnOverlap** 事件）相同。[关卡蓝图文档](/documentation/zh-cn/unreal-engine/level-blueprint-in-unreal-engine#addingevents)提供 此过程的演练。

这些特定事件是唯一的，并会在游戏进程开始时自动绑定。因此，无论在何时执行，**取消所有绑定（Unbind All）** 节点都将取消这些事件的绑定。然而， 通过将它们的委托引脚连接到游戏进程中其他时候执行的 **绑定事件（Bind Event）** 节点，则可以重新绑定它们。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建事件分发器事件节点](/documentation/zh-cn/unreal-engine/creating-dispatcher-events-in-unreal-engine#%E5%88%9B%E5%BB%BA%E4%BA%8B%E4%BB%B6%E5%88%86%E5%8F%91%E5%99%A8%E4%BA%8B%E4%BB%B6%E8%8A%82%E7%82%B9)
-   [在蓝图类中](/documentation/zh-cn/unreal-engine/creating-dispatcher-events-in-unreal-engine#%E5%9C%A8%E8%93%9D%E5%9B%BE%E7%B1%BB%E4%B8%AD)
-   [在关卡蓝图中](/documentation/zh-cn/unreal-engine/creating-dispatcher-events-in-unreal-engine#%E5%9C%A8%E5%85%B3%E5%8D%A1%E8%93%9D%E5%9B%BE%E4%B8%AD)
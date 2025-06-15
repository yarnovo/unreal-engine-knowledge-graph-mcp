# 调用虚幻引擎中的事件分发器。 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/calling-event-dispatchers-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:35:43.897Z

---

目录

![调用事件分发器](https://dev.epicgames.com/community/api/documentation/image/217a4237-14bf-4e98-8e50-5be75098cfb9?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d5a9a14-0510-43f9-baa0-df3c70df2647/event_dispatcher_call_node.png)

使用 **Call** 节点调用一个Event Dispatcher(事件分发器)，将会触发绑定到该事件分发器的所有事件。 对于每个事件分发器，您可以应用多个 **Call** 节点，且您既可以在蓝图类中调用事件分发器也可以在关卡蓝图中进行调用。

## 在蓝图类中进行调用

1.  在 **My Blueprint（我的蓝图）** 选卡下，从 Event Dispatcher(事件分发器)名称处开始拖拽鼠标并将其放置到您正处理的图表中。
    
2.  在出现的菜单中选择 **Call（调用）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9676cb8c-4abf-42f8-9f8a-f3ff2d2cb4f1/dispatcher_call_menu.png)

**另一种方法:**

1.  **右击** 图表。
    
2.  在出现的关联菜单中展开 **Event Dispatcher（事件分发器）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/771c9b18-9b50-43ef-901b-bbfebe9d18ec/event_dispatcher_context.png)
3.  选择 **Event Dispatcher（事件分发器）** 下的 **Call \[事件分发器名称\]** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1cd0e70-9b8b-4f1e-b0e4-98e31e442ce6/event_dispatcher_context_name.png)

## 在关卡蓝图中进行调用

1.  添加到关卡中您想为其调用事件分发器的[Actor的引用](/documentation/zh-cn/unreal-engine/level-blueprint-in-unreal-engine#%E5%BC%95%E7%94%A8actor)。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9146baaf-15ed-49f5-b0b3-392202566bb6/target_step1.png)
2.  从该引用节点的输出引脚开始拖拽鼠标，然后释放鼠标来显示关联菜单。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8861fd18-6acf-4175-8afa-e9d12ce93412/empty_context_menu.png)
3.  在关联菜单中，导航到 **Event Dispatcher （事件分发器）> Call \[事件分发器名称\]** 。搜索 "Event Call" 将会快速地弹出正确的选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b00e1c3-a258-4ce1-9791-dd9be571dd8a/call_node_level.png)
    
    **Call** 节点将会出现，且Actor引用已经连接到了 **Target** 引脚上。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d54cf33-64d6-4ab7-97cd-eb70b1d0dab7/call_dispatcher_wired_level.png)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [在蓝图类中进行调用](/documentation/zh-cn/unreal-engine/calling-event-dispatchers-in-unreal-engine#%E5%9C%A8%E8%93%9D%E5%9B%BE%E7%B1%BB%E4%B8%AD%E8%BF%9B%E8%A1%8C%E8%B0%83%E7%94%A8)
-   [在关卡蓝图中进行调用](/documentation/zh-cn/unreal-engine/calling-event-dispatchers-in-unreal-engine#%E5%9C%A8%E5%85%B3%E5%8D%A1%E8%93%9D%E5%9B%BE%E4%B8%AD%E8%BF%9B%E8%A1%8C%E8%B0%83%E7%94%A8)
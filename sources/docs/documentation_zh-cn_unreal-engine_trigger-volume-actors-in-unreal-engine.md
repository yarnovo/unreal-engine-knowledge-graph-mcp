# 虚幻引擎中的触发器体积Actor | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/trigger-volume-actors-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:58:51.493Z

---

目录

![触发器体积Actor](https://dev.epicgames.com/community/api/documentation/image/524c9a44-a254-4c01-9a3c-2127d6421a9a?resizing_type=fill&width=1920&height=335)

**触发器（Triggers）** 属于Actor，当它们与关卡其他对象交互时，可以触发关卡事件。换而言之，它们负责响应关卡对象的动作并触发事件。所有触发器都差不多，区别在于形状不同——有盒体、胶囊体和球体——触发器通过这些形状来判断其他对象是否碰撞并激活了它。

![box trigger](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ab9c95e-f1f1-4ae0-a4ac-e681b7bf945f/box_trigger.png)

![capsule trigger](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffc2b1b9-6e63-4b44-aa5d-43d8d59e8a3f/capsule_trigger.png)

![sphere trigger](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bb264f1-42dc-4ab3-b8ca-1a34f1845d39/sphere_trigger.png)

盒体触发器

胶囊体触发器

球体触发器

## 放置触发器

你可以通过拖拽触发器类型在关卡中放置触发器。在 **选择（Select）** 模式中，你可以在 **放置Actors（Place Actors）** 的 **基本（Basic）** 选项卡中拖拽触发器类型。

![放置触发器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0435881e-1914-47fe-9eee-4e8a23bf7f68/trigger_place.png)

## 触发事件

触发器用于激活放置在[关卡蓝图](/documentation/zh-cn/unreal-engine/level-blueprint-in-unreal-engine)中的事件。触发器可以激活几种不同类型的事件。主要类型的事件用于响应与另一个对象的某种类型的碰撞，例如某物与触发器碰撞或重叠，或响应来自玩家的输入。

当在 **视口（Viewport）** 中选择了触发器时：

-   在 **关卡蓝图事件图表** 中 **单击右键**，并在 **为\[触发器Actor名称\]添加事件（Add Event for \[Trigger Actor Name\]）** 下选择一个事件。
    
    ![触发器时间情境菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59465dee-613d-412f-9916-f1b7e6abb6c8/trigger_event_context.png)

通过这两种方法中的任何一种选择一个事件，都会将一个[事件节点](/documentation/zh-cn/unreal-engine/events-in-unreal-engine) 添加到当前关卡的关卡蓝图中：

![蓝图中的触发器事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eacfcdc9-d633-4bcb-8204-6ac9b9d4fbec/trigger_event.png)

每当发生该事件，都会触发该事件节点的执行引脚——在上述示例中，每当一个Actor与触发器重叠（或穿过触发器）时：

-   [actors](https://dev.epicgames.com/community/search?query=actors)
-   [trigger](https://dev.epicgames.com/community/search?query=trigger)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [放置触发器](/documentation/zh-cn/unreal-engine/trigger-volume-actors-in-unreal-engine#%E6%94%BE%E7%BD%AE%E8%A7%A6%E5%8F%91%E5%99%A8)
-   [触发事件](/documentation/zh-cn/unreal-engine/trigger-volume-actors-in-unreal-engine#%E8%A7%A6%E5%8F%91%E4%BA%8B%E4%BB%B6)
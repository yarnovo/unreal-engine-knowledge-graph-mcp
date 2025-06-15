# 在虚幻引擎中绑定和解除绑定事件。 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/binding-and-unbinding-events-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:35:38.672Z

---

目录

![绑定和解除绑定事件](https://dev.epicgames.com/community/api/documentation/image/d6d10513-fb58-4519-baf5-e5de2158ed89?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3ae1412-6d69-4d3f-b22a-c2293cfb71b1/bind_node.png)

如果事件分发器未绑定任何事件，对其进行调用将没有任何效果。每个事件分发器均有一个与其相关的事件列表。使用 **Bind Event** 节点可以向此列表中添加事件，使用 **Unbind Event** 节点可以从此列表中移除事件。此外，通过 **Unbind All Events** 节点可以解除当前绑定到事件分发器上的所有事件。

**Bind Event** 节点可以执行多次，但每个事件只能绑定一次。此外，蓝图类和关卡蓝图中的事件都将添加到相同的事件列表中，因此 **Unbind All Events** 节点将解除蓝图类和关卡蓝图中的事件绑定。

-   在蓝图类中执行 **Unbind All Events** 节点后，将针对此类的所有实例来解除蓝图类和关卡蓝图中的事件绑定。
-   在关卡蓝图中执行 **Unbind All Events** 节点后，只会针对 **Target** 提供内容来解除蓝图类和关卡蓝图中的事件绑定。

## 创建Bind、Unbind及Unbind All节点

创建 **Bind Event**、**Unbind Event** 及 **Unbind All Events** 节点的过程非常相似。以下步骤只说明了 **Bind Event** 节点的创建方法，但只要在正确步骤处选择了正确的菜单项目，便也能轻松创建 **Unbind Event** 和 **Unbind All Events** 节点。

### 在蓝图类中创建

1.  在 **我的蓝图（My Blueprint）** 选项卡中，从事件分发器的命名处开始拖动鼠标，放置到正在处理的图表中。
    
2.  在出现的菜单中选择 **绑定（Bind）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1326c0c9-65ec-4d30-8cc5-f1d023d3e8ed/dispatcher_bind_menu.png)

**另一种方法：**

1.  在图表中 **点击右键**。
    
2.  在上下文菜单中搜索 **Bind Event to \[EventDispatcherName\]** 并选中它。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29aea557-47cf-4c87-890b-92c81e021f72/event_dispatcher_context.png)

### 在关卡蓝图中创建

1.  为调用事件分发器的关卡中actor[添加一个引用](/documentation/zh-cn/unreal-engine/level-blueprint-in-unreal-engine#referencingactors)。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1a45d54-79e5-451b-966c-465e418eadfe/target_step1.png)
2.  从引用节点连出输出引脚，松开后显示快捷菜单。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6946403-ae98-4057-9ee8-c82fe8baffa6/empty_context_menu.png)
3.  前往快捷菜单中的 **事件分发器 > 将事件绑定到\[事件分发器名\]**。搜索"绑定\[事件名\]"便能迅速呼出正确的条目。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3cd30c9-ab43-4e89-a921-5db90d8ffc33/bind_node_level.png)
    
    **Call** 节点将出现，actor引用已连接到 **Target** 引脚。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a208716-025c-49b1-aeb0-181744e3edb3/bind_dispatcher_wired_level.png)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建Bind、Unbind及Unbind All节点](/documentation/zh-cn/unreal-engine/binding-and-unbinding-events-in-unreal-engine#%E5%88%9B%E5%BB%BAbind%E3%80%81unbind%E5%8F%8Aunbindall%E8%8A%82%E7%82%B9)
-   [在蓝图类中创建](/documentation/zh-cn/unreal-engine/binding-and-unbinding-events-in-unreal-engine#%E5%9C%A8%E8%93%9D%E5%9B%BE%E7%B1%BB%E4%B8%AD%E5%88%9B%E5%BB%BA)
-   [在关卡蓝图中创建](/documentation/zh-cn/unreal-engine/binding-and-unbinding-events-in-unreal-engine#%E5%9C%A8%E5%85%B3%E5%8D%A1%E8%93%9D%E5%9B%BE%E4%B8%AD%E5%88%9B%E5%BB%BA)
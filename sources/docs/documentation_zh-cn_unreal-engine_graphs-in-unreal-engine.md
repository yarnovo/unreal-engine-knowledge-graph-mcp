# 虚幻引擎图表 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/graphs-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:35:05.572Z

---

目录

![图表](https://dev.epicgames.com/community/api/documentation/image/5649861d-7d14-404b-afed-893a3465e6c1?resizing_type=fill&width=1920&height=335)

**图表（Graph）** 是一个节点网络，可连接到另一个节点网络以定义该网络的执行流。图表是在蓝图中实现功能的基础。 每个蓝图都可以包含一个或多个图表，具体取决于蓝图类型，这些图表定义了蓝图特定方面的实现。蓝图中的各个图表也可以包含 子图表，这些子图表本质上是折叠到其自身单独图表中的节点集合，主要用于组织用途。虽然一些专用类型的图标具有独特 属性，但包括添加变量应用、添加和连接节点以及调试在内的关键原则始终适用。

## 图表类型

### 事件图表

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d82b2fe-4bfb-415d-877a-a76286d2ee9c/eventgraph.png)

**事件图表（Event Graphs）** 是蓝图图表的最常见类型。每个新建的蓝图类（Blueprint Class）在创建时都将包含一个事件图表（Event Graph），但可以添加更多事件图表。这些追加的事件图表（Event Graph）可以 帮助组织你的蓝图网络。事件图表（Event Graph）通常包含蓝图的游戏进程行为的网络，而[事件](/documentation/zh-cn/unreal-engine/events-in-unreal-engine)、 [自定义事件](/documentation/zh-cn/unreal-engine/custom-events-in-unreal-engine)和 **输入（Input）** 节点则通过事件图表来启动执行流。

有关这一部分的更多信息，请参阅[事件图表](/documentation/en-us/unreal-engine/event-graph-in-unreal-engine)文档。

### 构造脚本

![Construction Script](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/addd7f50-51e1-42b2-8e4e-5c314909eb6f/constructionscript.png)

**构造脚本（Construction Scripts）** 对于蓝图类是唯一的，每个蓝图类中都只有一个构造脚本（ConstructionScript）。构造脚本（Construction Script）对蓝图类初始化很有用， 因为它们会在为蓝图类设置 **组件（Components）** 列表之后立即运行。

有关这一部分的更多信息，请参阅[构造脚本](/documentation/zh-cn/unreal-engine/construction-script-in-unreal-engine)文档。

### 函数

![Functions](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3caca6fe-14ed-4660-ac13-47a20d1c7434/functions.png)

**函数（Functions）** 是属于特定 **蓝图（Blueprint）** 的节点图表，它们可以从蓝图中的另一个图表 执行或调用。函数具有一个由节点指定的单一进入点，函数的名称 包含一个执行输出引脚。当您从另一个图表调用函数时，输出执行引脚将被激活， 从而使连接的网络执行。

有关这一部分的更多信息，请参阅[函数](/documentation/zh-cn/unreal-engine/functions-in-unreal-engine)文档。

### 宏

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84e58af2-59ef-4b30-8922-dfc2109b6524/macro.png)

**蓝图宏（Blueprint Macros）** 或 **宏（Macros）** 本质上与节点的折叠图相同。它们有一个由隧道节点 指定的入口点和出口点。每个隧道都可以有任意数量的执行或数据引脚，当在其他蓝图和图表中使用时， 这些引脚在宏节点上可见。

有关这一部分的更多信息，请参阅[宏](/documentation/zh-cn/unreal-engine/macros-in-unreal-engine)文档。

## 使用图表

无论你的图表是构造脚本（Construction Script）、事件图表（EventGraph）、函数（Function）还是宏（Macro），你都将在[编辑器](/documentation/zh-cn/unreal-engine/user-interface-reference-for-the-blueprints-visual-scripting-editor-in-unreal-engine)的[图表](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-user-interface-for-blueprint-classes-in-unreal-engine)模式中编辑它。从根本上说， 所有图表都包含由线路连接起来的节点网络。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [graphs](https://dev.epicgames.com/community/search?query=graphs)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [图表类型](/documentation/zh-cn/unreal-engine/graphs-in-unreal-engine#%E5%9B%BE%E8%A1%A8%E7%B1%BB%E5%9E%8B)
-   [事件图表](/documentation/zh-cn/unreal-engine/graphs-in-unreal-engine#%E4%BA%8B%E4%BB%B6%E5%9B%BE%E8%A1%A8)
-   [构造脚本](/documentation/zh-cn/unreal-engine/graphs-in-unreal-engine#%E6%9E%84%E9%80%A0%E8%84%9A%E6%9C%AC)
-   [函数](/documentation/zh-cn/unreal-engine/graphs-in-unreal-engine#%E5%87%BD%E6%95%B0)
-   [宏](/documentation/zh-cn/unreal-engine/graphs-in-unreal-engine#%E5%AE%8F)
-   [使用图表](/documentation/zh-cn/unreal-engine/graphs-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%9B%BE%E8%A1%A8)
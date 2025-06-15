# 虚幻引擎蓝图剖析 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/anatomy-of-a-blueprint-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:34:50.914Z

---

目录

![蓝图剖析](https://dev.epicgames.com/community/api/documentation/image/77742897-c3fa-4efd-a134-d27a94391543?resizing_type=fill&width=1920&height=335)

## 蓝图类

***Blueprint Class（蓝图类）***, 一般缩写为 ***Blueprint(蓝图)***,是一种允许内容创建者轻松地基于现有游戏性类添加功能的资源。 *蓝图* 是在虚幻编辑器中可视化地创建的，不需要书写代码，会被作为类保存在内容包中。 实际上，这些类蓝图定义了一种新类别或类型的Actor，这些Actor可以作为实例放置到地图中， 就和其他类型的Actor的行为一样。

## 组件

**蓝图** 并不固定包含脚本行为。例如，关卡中的灯柱为不可进行互动的物体，只需要一个网格体代表柱子和灯即可。 使用 **组件** 搭建可重复使用的蓝图能提高关卡设计的效率。 当然，之后可在图表中使用这些组件，使玩家和灯进行互动，或通过时辰系统对它们进行相应的调整。

## 图表

**图表** 包含蓝图的设计时行为和游戏时行为。蓝图类实例被创建时 **构建脚本** 按组件列表运行， 以便你对新对象或Actor的观感进行动态调整。

蓝图的 **事件图表（EventGraph）** 包含一个节点图表，它使用事件和函数调用执行操作，以响应与蓝图相关联的Gameplay事件。它添加的功能会对该蓝图的所有实例产生影响。你可以在这里设置交互功能和动态响应。例如，光源蓝图可以通过关闭其 `LightComponent` 和更改其网格体使用的材质，来响应伤害事件。光源蓝图的所有实例会自动具备这个功能。

[

![EventGraph](images/static/document_list/empty_thumbnail.svg)

EventGraph

Uses events and function calls to perform actions in response to Blueprint events.





](/documentation/en-us/unreal-engine/event-graph-in-unreal-engine)[

![图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5120bdde-be0a-4c9d-83ab-5d8ee43d626e/graph_topic.png)

图表

节点图使用事件和函数调用来执行响应与蓝图关联之事件的操作。





](/documentation/zh-cn/unreal-engine/graphs-in-unreal-engine)

## 组织并重复使用脚本

在蓝图中创建更多脚本后，你会发现脚本的一些段存在经常重复使用的情况。利用 **函数** 和 **宏** 可对脚本段进行重复使用， 但每种方法的优势和使用情况皆不相同。如需了解函数和宏 之间的主要不同， 请查阅 [蓝图最佳方法指南](/documentation/zh-cn/unreal-engine/blueprint-best-practices-in-unreal-engine)。

还可将图表的段合并到嵌套图表中进行整理。

[

![函数调用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2e2a895-2bf1-4874-a676-c88760466e3d/functions.png)

函数调用

执行目标Actor或对象的函数的节点，既包括代码定义的函数也包括用户定义的函数。





](/documentation/zh-cn/unreal-engine/function-calls-in-unreal-engine)[

![Using 宏库](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8927d65-2710-4a95-b9a3-cec31e3e3b05/placeholder_topic.png)

Using 宏库

使用宏库中的宏来增加Actor的生命值和大小。





](/documentation/zh-cn/unreal-engine/using-macro-libraries-in-unreal-engine)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [蓝图类](/documentation/zh-cn/unreal-engine/anatomy-of-a-blueprint-in-unreal-engine#%E8%93%9D%E5%9B%BE%E7%B1%BB)
-   [组件](/documentation/zh-cn/unreal-engine/anatomy-of-a-blueprint-in-unreal-engine#%E7%BB%84%E4%BB%B6)
-   [图表](/documentation/zh-cn/unreal-engine/anatomy-of-a-blueprint-in-unreal-engine#%E5%9B%BE%E8%A1%A8)
-   [组织并重复使用脚本](/documentation/zh-cn/unreal-engine/anatomy-of-a-blueprint-in-unreal-engine#%E7%BB%84%E7%BB%87%E5%B9%B6%E9%87%8D%E5%A4%8D%E4%BD%BF%E7%94%A8%E8%84%9A%E6%9C%AC)
# 在虚幻引擎中混合动画 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blending-animations-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:09:40.744Z

---

目录

![混合动画](https://dev.epicgames.com/community/api/documentation/image/19725104-eec8-44bd-9eb4-45f3984c0f4e?resizing_type=fill&width=1920&height=335)

作为一个概念，动画混合仅仅意味着在一个角色或骨架网格上的两个或多个动画之间进行平滑过渡。在虚幻引擎4中，有多种方法可以应用这种混合。在本文中，我们将概述每种方法以及如何将它们应用于您的角色。

## 混合空间

混合动画最常用的方法之一是使用混合空间。

有关混合空间的更多信息，请参阅[混合空间](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine)文档。

## 使用蓝图混合

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f2fd80d-a62c-4c61-930c-5957ee21a3bf/personablendanimgraph.png)

还可以通过动画蓝图中的AnimGraph直接处理动画混合。AnimGraph通过一系列不同的节点绘制动画姿势数据流，每个节点以某种方式对姿势或动作的最终外观做出贡献。专门设计了各种节点，用于帮助以某种方式将多个姿势混合在一起。它们可以是添加式的，基于加权偏差或Alpha值按字面结合两个动画，也可以是现有姿势的直接覆盖。您还可以将动画直接发送到骨骼中的特定骨骼及其所有子项。例如，您可以从包含一个正在奔跑的角色的动画开始，然后有选择地在右臂上应用一个挥手的动画。最终的结果将是角色正在一边奔跑一边挥手。

要了解如何使用蓝图处理动画混合，请参阅[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)和[混合节点](/documentation/zh-cn/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine)。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animation blending](https://dev.epicgames.com/community/search?query=animation%20blending)
-   [animation features](https://dev.epicgames.com/community/search?query=animation%20features)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [混合空间](/documentation/zh-cn/unreal-engine/blending-animations-in-unreal-engine#%E6%B7%B7%E5%90%88%E7%A9%BA%E9%97%B4)
-   [使用蓝图混合](/documentation/zh-cn/unreal-engine/blending-animations-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%93%9D%E5%9B%BE%E6%B7%B7%E5%90%88)
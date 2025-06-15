# 虚幻引擎蓝图样条组件概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blueprint-spline-components-overview-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:20:59.176Z

---

目录

![蓝图样条组件概述](https://dev.epicgames.com/community/api/documentation/image/9dbc576f-18c2-45fb-b5ed-97a0c4b3e6dc?resizing_type=fill&width=1920&height=335)

本质上说，**蓝图样条组件（Blueprint Spline Component）** 是一条可用于定义和使用位置数据的路径。你可以让场景中的 **角色**（或其他 **组件**）沿样条移动，或者沿着样条放置一系列 **角色**（或其他 **组件**）。它们可以直接在蓝图视口和关卡编辑器中编辑，包括添加/删除/复制样条点，改变切线类型，甚至实现逐帧动画。此外，它们还可以通过 **蓝图构建脚本（Blueprint Construction Script）** 进行编辑，例如获取你在蓝图视口或关卡编辑器中的编辑，并做进一步修改。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd67dbfc-1a73-4216-b651-a0bdcf18d6ea/bpsc_1.png)

**蓝图样条网格体组件（Blueprint Spline Mesh Components）** 的功能则完全不同。该组件允许 **静态网格体** 沿着一个由两点构成的样条线执行动画。你无法为蓝图样条网格体组件添加更多样条点，不过这两个点可以通过蓝图控制。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/971e82a2-5452-47c8-8ba2-5037639e1111/bpsmc_1.png)

虽然它们的用途截然不同，但在蓝图中的添加过程是相同的，并且使用相同的编辑工具。

-   [splines](https://dev.epicgames.com/community/search?query=splines)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
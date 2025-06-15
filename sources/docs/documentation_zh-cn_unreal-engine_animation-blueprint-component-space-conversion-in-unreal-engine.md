# 虚幻引擎中的动画蓝图组件空间转换 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-blueprint-component-space-conversion-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:03:41.844Z

---

目录

![空间转换节点](https://dev.epicgames.com/community/api/documentation/image/b7edaac1-04e3-499f-a02b-672a752b44ea?resizing_type=fill&width=1920&height=335)

**AnimGraph** 上的动画蓝图节点将计算并生成新的姿势，以在 **本地空间** 或 **组件空间** 中驱动动画。**本地空间** 中生成的动画姿势会相对于骨骼的 **父骨骼** 计算骨骼变换。**组件空间（Component Space）** 中生成的动画姿势相对于角色的[骨骼网格体组件](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)来计算骨骼变换。

![空间转换节点概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/64a28d41-1db2-4eae-8dc9-c8e42ad1cdcd/overview.png)

使用动画蓝图的 **AnimGraph** 中提供的 **Convert Spaces** 节点，可以在 **本地** 和 **组件** 空间之间转换姿势。

处理动画蓝图中的姿势时，大部分节点都将在本地空间中运行，这由 **白色** 姿势输入和输出引脚指示。但是，特定[混合节点](/documentation/zh-cn/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine)和所有[骨骼控制点节点](/documentation/zh-cn/unreal-engine/animation-blueprint-skeletal-controls-in-unreal-engine)在 **组件空间** 中运行，这由 **蓝色** 姿势输入和输出指示。

要使用在组件空间中运行的节点，姿势必须首先使用Local to Component转换节点转换为组件空间。

![local to component空间转换节点animbp animgraph](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d6a6ae7-6b4b-4f38-8c1d-d209e10c53ff/localtocomponent.png)

动画姿势经历组件空间运算后，必须转换回本地空间，才能由其他节点使用，或提供输出节点的最终姿势。

![component to local空间转换节点animbp animgraph](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b223f6d8-a99f-40a8-8e35-2d9c31a2b592/componenttolocal.png)

由于每次转换 **到** 组件空间或 **从** 中转换时都有相关的成本，最好将在组件空间中运行的所有节点分组在一起，以减少所需的转换次数。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [animation features](https://dev.epicgames.com/community/search?query=animation%20features)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

相关文档

[

蓝图可视化脚本

![蓝图可视化脚本](https://dev.epicgames.com/community/api/documentation/image/a7cce2f7-f09a-4340-b3f4-2a5d4823bc46?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)
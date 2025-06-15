# 破坏概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/destruction-overview
> 
> 生成时间: 2025-06-14T19:48:16.716Z

---

目录

![破坏概述](https://dev.epicgames.com/community/api/documentation/image/a2fc041a-93cb-4211-9c89-77d75e2b2ddc?resizing_type=fill&width=1920&height=335)

![alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82b5b8ae-b1ac-4884-a729-62edbade28bc/city-chaos-destruction-small.gif)

**Chaos破坏（Chaos Destruction）** 系统是一个工具集合，可用于实现电影级画质的实时破坏效果。除了出色的视觉效果之外，该系统还优化了性能，采用直观的非线性工作流，让美术师和设计师能够更好地控制内容创建过程和破坏过程。

该系统允许美术师精确定义几何体在模拟期间会如何破裂。美术师使用预先破裂的几何体构造模拟资产，并利用动态生成的刚性约束，在模拟期间对结构连接建模。模拟中生成的对象可以基于与[物理场](/documentation/zh-cn/unreal-engine/physics-fields-in-unreal-engine)和碰撞等环境要素之间的交互，从连接的结构分开。

破坏系统依赖内部群集模型，它控制如何模拟刚性附加的几何体。利用群集，美术师可以将多组几何体初始化为单个刚体，然后在模拟期间动态打破对象。群集系统的核心是将每个连接的元素的质量和惯性连接为一个更大的单一刚体。

破坏系统使用称为 **几何体集合（Geometry Collection）** 的新资产类型，作为其几何体和模拟属性的基础容器。几何体集合可以从静态和骨骼网格体源创建，然后使用UE5的 **破裂模式（Fracture Mode）** 进行破裂和群集。

在模拟开始，会基于每个破裂的刚体的最接近相邻值初始化连接图表。各个形体之间的每个连接表示群集中的刚性约束，并获得了初始张力值。在模拟期间，会评估连接图表中的张力。碰撞约束或场评估对刚体施加超出连接限制的冲量时，这些连接可能会断开。物理场还可以用于降低连接的内部张力值，从而削弱内部结构。

对于大规模破坏模拟，Chaos破坏系统随附了新的 **缓存系统（Cache System）** ，允许在运行时流畅重播复杂的破坏，而对性能的影响极低。

Chaos破坏系统可轻松与其他虚幻引擎系统集成，例如[Niagara](/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine)和[音频混合器](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine)，以便在模拟期间生成粒子或播放特定声音。

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [chaos](https://dev.epicgames.com/community/search?query=chaos)
-   [destruction](https://dev.epicgames.com/community/search?query=destruction)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
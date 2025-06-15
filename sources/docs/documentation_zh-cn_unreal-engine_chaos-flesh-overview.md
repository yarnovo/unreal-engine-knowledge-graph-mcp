# Chaos Flesh概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/chaos-flesh-overview
> 
> 生成时间: 2025-06-14T19:48:45.526Z

---

目录

![Chaos Flesh概述](https://dev.epicgames.com/community/api/documentation/image/c2462a85-9680-4941-b0c6-279159e7f720?resizing_type=fill&width=1920&height=335)

## Chaos Flesh系统简介

**Chaos Flesh** 系统用于在虚幻引擎中对可变形物体（软体）进行高质量的实时模拟。与刚体模拟不同，软体的形状可以在模拟过程中根据软体的属性发生变化。

该系统支持使用各种参数模拟静态和骨骼网格体，使美术师能够对最终结果进行前所未有的控制。我们设计该系统的目的主要专注于模拟骨骼动画期间角色的肌肉变形。

Chaos Flesh系统通过在运行时模拟低分辨率几何体，并利用高分辨率电影品质几何体离线模拟得到的缓存结果来实现高性能。

## 实时模拟软体

美术师可以使用Chaos Flesh系统在虚幻引擎中探索基于物理的四面体模拟。该系统将创建低分辨率几何体的实时模拟，并会利用高分辨率电影品质几何体的缓存结果。

可以通过 **Dataflow** 资产创作系统来管理Chaos Flesh，为Chaos模拟器生成变形设置。基于Dataflow节点的编辑器提供了一些用于从封闭的静态和骨骼网格体表面自动生成四面体几何体的功能选项，以及用于定义内部模拟属性的工具。

通过连接的 **解算器Actor** 可以管理模拟。独立Actor允许在骨骼网格体的局部空间内进行模拟，并通过骨骼网格体Actor上的表面变形器对结果进行可视化。解算器Actor会显示以下功能选项：

-   管理分步。
-   线程模型。
-   模拟全局属性。

### 技术实现

#### 四面体网格划分工具

要开始模拟软体，必须首先将对象的表面表示（如三角剖分的静态或骨骼网格体）转换为同一对象的体积表示。Chaos Flesh系统将静态或骨骼网格体转换为其等效的四面体几何体表示，以便在模拟期间使用。

Chaos Flesh系统提供了以下方法从封闭的骨骼和静态网格体几何体生成四面体几何体：

-   第一种方法使用等面填充方式生成四面体体积。
-   第二种方法使用 **实际应用场景下的四面体网格划分（TetWild）（Tetrahedral Meshing in the Wild (TetWild)）** 算法生成四面体体积。
-   第三种方法使用自定义算法生成径向四面体几何体。

#### 四面体模拟

Chaos Flesh系统使用其生成的四面体几何体实时运行基于物理的模拟。

该系统使用运动学约束将四面体几何体绑定到骨骼网格体以匹配其动画。此外，该系统使用弱约束将四面体几何体绑定到模拟顶点。

使用该系统可以设置每个粒子的模拟属性，例如阻尼和质量值。此外，该系统附带有限的局部空间模拟支持，并提供统一的不可压缩性和静止状态调整设置。

#### 世界解算器交互

Chaos Flesh模拟可与环境进行实时交互。该系统使用光线投射来检测环境与其四面体（复杂）几何体的交互。

该系统附带蓝图支持，因此可提供对单向环境碰撞的艺术风格控制，并提供可用于驱动约束位置的输入动画。

此外，该系统还可以在世界解算器中检测与刚体的凸包碰撞和分析碰撞。这样可以支持更复杂的模拟，因为软体能够与其他模拟刚体进行实时碰撞。

还可以配置游戏更新顺序，以便在世界解算器之前或之后设置可变形模拟。

#### 渲染功能

虽然四面体网格体是适合用于模拟的体积结构，但它通常不是渲染的理想表面。由于主要关注点是使渲染表面具有良好的外观，因此系统会将模拟结果传输到优化的表面上进行渲染。

Chaos Flesh系统还能够在编辑器中可视化其四面体几何体以便进行调试。此外，该系统带有骨骼网格体变形器可视化功能。

通过静态几何体上的Nanite置换贴图变形还可以支持Nanite网格体。

#### 缓存模拟结果

实时运行Flesh模拟的计算成本可能很高。出于这个原因，Chaos Flesh系统能够缓存其模拟结果，从而实现更流畅的运行时播放。

可以使用Sequencer清理任何模拟的缓存几何体结果，并通过 **获取镜头试拍（Get Take）** 和 **影片渲染队列（MRQ）（Movie Render Queue (MRQ)）** 来渲染模拟结果。

可以按照Epic开发者社区中的[Chaos Flesh](https://dev.epicgames.com/community/learning/tutorials/BEby/unreal-engine-chaos-flesh)教程，学习如何使用Chaos Flesh系统。

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [flesh](https://dev.epicgames.com/community/search?query=flesh)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Chaos Flesh系统简介](/documentation/zh-cn/unreal-engine/chaos-flesh-overview#chaosflesh%E7%B3%BB%E7%BB%9F%E7%AE%80%E4%BB%8B)
-   [实时模拟软体](/documentation/zh-cn/unreal-engine/chaos-flesh-overview#%E5%AE%9E%E6%97%B6%E6%A8%A1%E6%8B%9F%E8%BD%AF%E4%BD%93)
-   [技术实现](/documentation/zh-cn/unreal-engine/chaos-flesh-overview#%E6%8A%80%E6%9C%AF%E5%AE%9E%E7%8E%B0)
-   [四面体网格划分工具](/documentation/zh-cn/unreal-engine/chaos-flesh-overview#%E5%9B%9B%E9%9D%A2%E4%BD%93%E7%BD%91%E6%A0%BC%E5%88%92%E5%88%86%E5%B7%A5%E5%85%B7)
-   [四面体模拟](/documentation/zh-cn/unreal-engine/chaos-flesh-overview#%E5%9B%9B%E9%9D%A2%E4%BD%93%E6%A8%A1%E6%8B%9F)
-   [世界解算器交互](/documentation/zh-cn/unreal-engine/chaos-flesh-overview#%E4%B8%96%E7%95%8C%E8%A7%A3%E7%AE%97%E5%99%A8%E4%BA%A4%E4%BA%92)
-   [渲染功能](/documentation/zh-cn/unreal-engine/chaos-flesh-overview#%E6%B8%B2%E6%9F%93%E5%8A%9F%E8%83%BD)
-   [缓存模拟结果](/documentation/zh-cn/unreal-engine/chaos-flesh-overview#%E7%BC%93%E5%AD%98%E6%A8%A1%E6%8B%9F%E7%BB%93%E6%9E%9C)
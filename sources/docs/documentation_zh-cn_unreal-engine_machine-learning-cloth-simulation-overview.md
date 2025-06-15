# 机器学习布料模拟概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/machine-learning-cloth-simulation-overview
> 
> 生成时间: 2025-06-14T19:48:49.166Z

---

目录

![机器学习布料模拟概述](https://dev.epicgames.com/community/api/documentation/image/a4520408-9e5d-40b2-ae63-c605e9e0276c?resizing_type=fill&width=1920&height=335)

## 机器学习布料模拟系统简介

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/695e7938-5edf-4420-9462-651e0dd301bf/physics-mlcloth-2.gif)

**机器学习（ML）布料模拟（Machine-Learning (ML) Cloth Simulation）** 系统在虚幻引擎中提供了高保真度、高性能的实时布料模拟。

该系统提供了比基于物理的传统模型更高的保真度，使用经过训练的数据集，可以实时用于生成之前只能通过离线模拟实现的结果。

### 使用机器学习的优势

在传统游戏开发中，你会使用物理解算器模拟角色服装。但是，此过程的计算量很大，因为要进行耗时的弹性更新，布料与形体之间也要进行复杂的交互。

机器学习系统可以辅助用户使用提前生成的高质量模拟数据来训练模型。此功能生成的服装网格体在质量上接近预模拟数据，同时在内存使用方面快速又高效。

## 技术实现

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72cc2de2-4bac-4b9e-b491-298b56d702f9/physics-mlcloth.gif)

对于每个帧，ML布料模拟系统会取角色的骨骼姿势作为输入，并使用线性混合蒙皮对基础布料网格体变形，从而预测最终布料姿势。变形有两大组件。

第一个组件是类似于神经变形模型的 **低频率变形** 。

此组件使用多层感知机（MLP）网络建模，该网络会使用骨骼网格体姿势作为输入来预测一组系数。低频率增量的计算方式为：

```cpp
low_frequency_deltas = mean_delta + coeffs * basis 
```

该基础信息可以在训练时习得，也可以通过主组件分析（PCA）预先计算得出。

要训练此组件，你应该准备随机姿势数据集并模拟要在每个姿势上稳定呈现的服装。对于此组件，我们推荐对人形角色采用5000个姿势。

第二个组件是使用 **最接近相邻值（Nearest Neighbor）** 搜索的 **高频率变形**。

此组件会从第一个组件获取系数，并在"最接近相邻值"数据集内搜索最接近相邻值，如：

```cpp
high_frequency_deltas = NearestNeighborSearch(coeffs)
```

对于此组件，应该准备一组较小而多样化的姿势，并模拟要在每个姿势上稳定呈现的服装。理想情况下，姿势应该取自游戏内动画的一些关键帧。为了获得最优效果，推荐对人形角色采用50到100个姿势。

使用此技术，顶点增量按如下公式计算：

```cpp
vertex_delta = low_frequency_deltas + high_frequency_deltas 
```

对于经过训练的数据集，你可以使用虚幻引擎中的 **机器学习变形器编辑器（ML Deformer Editor）** 内的 **Chaos布料生成器（Chaos Cloth Generator）** 工具来为每个姿势生成最终布料位置。这会模拟布料并生成可以实时使用的几何体缓存（Geometry Cache）。

或者，你也可以用任意外部布料解算器（例如Houdini Vellum）。对于每个姿势，模拟布料直至稳定呈现，并在几何体缓存中保存稳定呈现的布料。你可以将缓存作为Alembic文件导入虚幻引擎中。

关于如何在虚幻引擎内生成几何体缓存，请查看[机器学习布料生成教程](https://dev.epicgames.com/community/learning/tutorials/PdRX/unreal-engine-ml-cloth-generation)。

要获得最佳效果，你应该为数据集手动选择最相关的姿势。但是，可以使用 **KMeans姿势生成器（KMeans Pose Generator）** 执行自动姿势选择。生成器会获取动画序列并运行KMeans算法，为"最接近相邻值"数据集生成条目列表。

### 当前限制

当前系统实现存在一个主要的限制，即假定服装是半静态的。这意味着，系统可以预测皱纹等形状细节，但无法预测摇摆或悬挂等动态移动。

此系统当前最适合紧身服装，例如裤子和T恤，但不太适合宽松衣服，例如连衣裙或披风。

你可以学习Epic开发人员社区上的[ML变形器 - 最接近相邻值模型](https://dev.epicgames.com/community/learning/tutorials/pwaY/unreal-engine-nearest-neighbor-model-5-4)教程，了解如何使用ML布料系统。

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [cloth](https://dev.epicgames.com/community/search?query=cloth)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [机器学习布料模拟系统简介](/documentation/zh-cn/unreal-engine/machine-learning-cloth-simulation-overview#%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0%E5%B8%83%E6%96%99%E6%A8%A1%E6%8B%9F%E7%B3%BB%E7%BB%9F%E7%AE%80%E4%BB%8B)
-   [使用机器学习的优势](/documentation/zh-cn/unreal-engine/machine-learning-cloth-simulation-overview#%E4%BD%BF%E7%94%A8%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0%E7%9A%84%E4%BC%98%E5%8A%BF)
-   [技术实现](/documentation/zh-cn/unreal-engine/machine-learning-cloth-simulation-overview#%E6%8A%80%E6%9C%AF%E5%AE%9E%E7%8E%B0)
-   [当前限制](/documentation/zh-cn/unreal-engine/machine-learning-cloth-simulation-overview#%E5%BD%93%E5%89%8D%E9%99%90%E5%88%B6)
# 虚幻引擎材质函数 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/material-functions-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:26:23.002Z

---

目录

![材质函数](https://dev.epicgames.com/community/api/documentation/image/08df2c5b-bc0b-4530-a6b1-cfdd11bf4354?resizing_type=fill&width=1920&height=335)

**材质函数** 允许你将材质图表的一部分打包成可复用的资产，分享到一个函数库中，并轻松插入到其他材质中。它们旨在让你能够快速访问一些常用材质网络，实现简化材质创建。材质函数允许你将复杂的材质逻辑抽象成一个节点，使美术师更容易创建材质。

材质函数的另一个好处是，只要编辑单个函数，就会影响所有使用该函数的材质。因此，如果你需要修复某个材质函数，你不必再去修改其他使用该函数的许多个材质。下面两个页面介绍了如何在虚幻引擎中创建和使用材质函数。

[](/documentation/zh-cn/unreal-engine/unreal-engine-material-functions-overview)

[![材质函数概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c492654-47f8-463a-8c04-0660e29f5db2/material-functions-overview-topic.png)](/documentation/zh-cn/unreal-engine/unreal-engine-material-functions-overview)

[材质函数概述](/documentation/zh-cn/unreal-engine/unreal-engine-material-functions-overview)

[有关材质函数工作方式及其某些重要用法概念的概述。](/documentation/zh-cn/unreal-engine/unreal-engine-material-functions-overview)

[](/documentation/zh-cn/unreal-engine/creating-and-using-material-functions-in-unreal-engine)

[![创建和使用材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c02b3454-052f-4e70-9328-f341031df673/creating-material-functions-topic.png)](/documentation/zh-cn/unreal-engine/creating-and-using-material-functions-in-unreal-engine)

[创建和使用材质函数](/documentation/zh-cn/unreal-engine/creating-and-using-material-functions-in-unreal-engine)

[材质函数的创建和使用指南。](/documentation/zh-cn/unreal-engine/creating-and-using-material-functions-in-unreal-engine)

## 函数参考

下面的参考页提供了虚幻引擎中所有默认材质函数的信息和使用示例。它们按照[材质函数](/documentation/404)面板中的类别组织。

[

![混合材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94c61f07-cbd6-43fb-96f4-908bfd04611b/blends.png)

混合材质函数

这些函数用于将一种颜色与另一颜色混合，这类似于流行图像编辑应用程序中的混合模式。





](/documentation/zh-cn/unreal-engine/blend-material-functions-in-unreal-engine)[

![渐变材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d968a453-f90b-454a-818f-d7bd1655a80a/gradients.png)

渐变材质函数

以程序方式生成要添加至材质的渐变，从而消除对纹理的需求并节省内存。





](/documentation/zh-cn/unreal-engine/gradient-material-functions-in-unreal-engine)[

![图像调整材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1812809e-c749-4861-b26e-ec8e3d17e2f8/imageadjustment.png)

图像调整材质函数

这些函数用来对现有的图像纹理进行调整，例如改变对比度或色调。





](/documentation/zh-cn/unreal-engine/image-adjustment-material-functions-in-unreal-engine)[

![数学材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c7942e5-5af5-440d-9843-c95b40961704/math.png)

数学材质函数

这些材质函数进行预先配置的数学运算，例如计算 π 以及将矢量分量相加等等。





](/documentation/zh-cn/unreal-engine/math-material-functions-in-unreal-engine)[

![杂项材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb9ca37b-31f4-44eb-a47e-1f69875a8aba/misc.png)

杂项材质函数

未归入现有类别的杂项材质函数。





](/documentation/zh-cn/unreal-engine/misc-material-functions-in-unreal-engine)[

![不透明度材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5b75410-8c1d-4733-bdef-ae1c4bfc30de/opacity.png)

不透明度材质函数

这些函数用于处理材质网络中的不透明值。





](/documentation/zh-cn/unreal-engine/opacity-material-functions-in-unreal-engine)[

![粒子材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9804d24b-f620-4adc-8920-71aa7fd117c6/particles.png)

粒子材质函数

这些专用函数用来帮助设置复杂粒子网络的外观。





](/documentation/zh-cn/unreal-engine/particles-material-functions-in-unreal-engine)[

![程序化材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f0b86b8-6239-4f6a-87c5-1ba16dc6fb7f/procedurals.png)

程序化材质函数

以程序方式生成的纹理和操作，例如根据现有的高度贴图来创建法线贴图。





](/documentation/zh-cn/unreal-engine/procedurals-material-functions-in-unreal-engine)[

![反射材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/baf6edeb-a6b8-47d8-8270-763a21348422/reflections.png)

反射材质函数

这些函数帮助计算各种反射类型的值。





](/documentation/zh-cn/unreal-engine/reflections-material-functions-in-unreal-engine)[

![明暗处理材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de17835d-78ac-453f-9936-abba050f02d0/shading.png)

明暗处理材质

这些函数用于处理特殊的明暗处理类型，例如





](/documentation/zh-cn/unreal-engine/shading-material-functions-in-unreal-engine)[

![纹理材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15dccfcd-5eba-4c3c-9dd5-2847312d0845/texturing.png)

纹理材质函数

各种用于帮助处理纹理的函数，例如重新投射 UV 以及裁切等等。





](/documentation/zh-cn/unreal-engine/texturing-material-functions-in-unreal-engine)[

![向量运算材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c89a038c-03a7-4e8b-b3ec-9f749d45903b/vectorops.png)

向量运算材质函数

这些函数用来处理向量数学运算，例如计算菲涅耳效果。





](/documentation/zh-cn/unreal-engine/vector-ops-material-functions-in-unreal-engine)[

![世界位置偏移函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1cb5a7f1-913e-403c-8f41-7df78fe1d1a0/worldpositionoffset.png)

世界位置偏移函数

这些函数使用全局位置偏移来处理顶点操作。





](/documentation/zh-cn/unreal-engine/world-position-offset-material-functions-in-unreal-engine)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [函数参考](/documentation/zh-cn/unreal-engine/material-functions-in-unreal-engine#%E5%87%BD%E6%95%B0%E5%8F%82%E8%80%83)
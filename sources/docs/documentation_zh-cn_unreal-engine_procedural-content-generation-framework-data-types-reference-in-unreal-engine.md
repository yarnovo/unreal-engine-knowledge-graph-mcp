# 虚幻引擎中的程序化内容生成框架数据类型参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-data-types-reference-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:17:58.461Z

---

目录

![程序化内容生成框架数据类型参考](https://dev.epicgames.com/community/api/documentation/image/a8f61a3f-01af-4296-b293-b9514aaf717c?resizing_type=fill&width=1920&height=335)

**程序化内容生成框架（PCG）框架** 中的数据分为以下几种类型：

-   [空间数据](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-data-types-reference-in-unreal-engine#spatialdata)
-   [综合数据](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-data-types-reference-in-unreal-engine#compositedata)
-   [属性集](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-data-types-reference-in-unreal-engine#attributesets)

## 空间数据

空间数据包含对二维（2D）或三维（3D）空间的引用，可以表示体积、高度场、样条线和点数据。

### 体积

体积是一种表示三维形状的空间数据，通常用于布尔集合操作，或使用@@体积采样器（Volume Sampler）节点直接从水平面采样。

### 曲面

曲面是一种表示二维数据的空间数据，如映射到 XY 平面上的地形，或在二维平面上生成点并将其投影到三维形状上的曲面采样器（Surface Sampler）节点。

### 线

线条是一种空间数据，表示样条线和地形样条线组件。该数据可读取带切线和点标度的样条曲线关键点。地形样条线垂直投影。即使样条线偏离地形，也始终适用于曲面。PCG图形中使用获取样条线数据（Get Spline Data）和样条线采样器（Spline Sampler）节点引用该数据类型。

### 点

点云（Point Cloud）是一种空间数据，它是三维空间中代表曲面或体积的点的集合，并带有相关边界。边界允许点代表不同维度的形状。

例如，可以对三维球体进行点采样，点的大小决定了点与球形的吻合程度

此外，每个点都有一个密度值，限制在0到1之间。这些点和它们的密度值共同表达了空间中的浮点函数。PCG图形节点通常会在空间中创建和处理采样密度值，然后再进行采样。

点可包含以下信息

**数据**

**说明**

**变换**

平移、旋转和缩放信息。

**边界最小值和边界最大值**

点所代表的体积的最小和最大范围。

**颜色**

每个点的四个通道颜色值。

**密度**

浮点度量的一个点相对于给定采样中其他点的落差。用于确定采样密度。

**斜度**

点度量的体积的柔和度。每个点都有三维边界，代表一个空间区域。每个点的斜度值可以控制其影响的形状。

**种子**

在随机数生成器的各种操作过程中使用。这可以通过操作来控制随机性的表达方式，并根据位置进行计算，以便与世界位置保持一致。

## 综合数据

综合数据数据是集合操作的结果，如联合、相交和集合差。

在将结果转换回显式数据并应用结果之前，你可以将集合操作串联为多个操作。

## 属性集

属性集是用户定义的变量，作为元数据存储在PCG图形中。这些变量可以使用各种属性操作节点进行操作，并被节点使用。

一个常见的例子是通过扩展节点上的高级引脚并将属性连接到公开引脚来驱动节点设置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb21bb33-a8db-4372-9233-7664592dfbd0/pcg-attributes.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb21bb33-a8db-4372-9233-7664592dfbd0/pcg-attributes.png)

变换点节点上的可用属性输入。

属性可在PCG节点图界面的属性列表窗口中查看。有关使用PCG框架的更多信息，请参阅[程序化内容生成概述](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview)。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [procedural generation](https://dev.epicgames.com/community/search?query=procedural%20generation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [空间数据](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-data-types-reference-in-unreal-engine#%E7%A9%BA%E9%97%B4%E6%95%B0%E6%8D%AE)
-   [体积](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-data-types-reference-in-unreal-engine#%E4%BD%93%E7%A7%AF)
-   [曲面](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-data-types-reference-in-unreal-engine#%E6%9B%B2%E9%9D%A2)
-   [线](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-data-types-reference-in-unreal-engine#%E7%BA%BF)
-   [点](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-data-types-reference-in-unreal-engine#%E7%82%B9)
-   [综合数据](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-data-types-reference-in-unreal-engine#%E7%BB%BC%E5%90%88%E6%95%B0%E6%8D%AE)
-   [属性集](/documentation/zh-cn/unreal-engine/procedural-content-generation-framework-data-types-reference-in-unreal-engine#%E5%B1%9E%E6%80%A7%E9%9B%86)
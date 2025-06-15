# 在虚幻引擎中为顶点权重绘制设置纹理混合材质 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-a-texture-blended-material-for-vertex-weights-painting-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:19:57.401Z

---

目录

你可以在材质中使用顶点颜色数据，根据在网格体上绘制的颜色值在不同的纹理层之间进行混合。在本页面中，你将了解如何利用顶点权重绘制模式，在将多种纹理绘制到网格体上时让它们相互混合。

## 为纹理混合设置材质

首先，你需要设置一种材质，将其作为在网格体上使用顶点颜色数据的基础：

1.  选择一种 **混合模式（Blend Mode）** 。
2.  在材质图表中添加一个 **VertexColor** 材质表达式。
    -   本页面的每个示例都仅使用了一个VertexColor节点，但你可以使用多个该节点。
    -   在混合纹理时，此节点主要与 **Linear Interpolate (Lerp)** 表达式一起使用，其中顶点颜色驱动Alpha输入值进行混合。

### 使用Lerp节点在纹理之间混合VertexColor

对于下面此材质的设置，**Linear Interpolate（或Lerp）** 节点用于通过以下方式在各个纹理之间混合：利用 **Alpha** 输入接收VertexColor节点的颜色通道，以此在材质图表中混合这些纹理。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f107788-cf6f-42aa-8612-784ed7fad2f1/mp-tb-lerpnode.png)

Linear Interpolate（Lerp）材质表达式

这是最基础的设置方式，利用Lerp节点混合两个纹理，并通过VertexColor驱动这两个纹理的分层。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/159381c7-89f0-4cf9-91e0-49dc230b82b8/mp-tb-lerpexample.png)

### 材质纹理混合设置

以下是说明如何使用VertexColor材质表达式设置纹理混合的多个实例，分别使用了两个、三个、四个和五个纹理。

#### 2路纹理混合

以下设置是一个展示如何将两个纹理层混合在一起以在网格体上绘制顶点权重的示例。Alpha颜色通道用于在绘制的各个纹理层之间进行线性插值。

**VertexColor\* 节点的** Alpha **输出会被传递给** Lerp **节点的** Alpha **输入。通过此设置，你将使用** Alpha（两个纹理） **的默认** 纹理权重类型（Texture Weight Type）\*\* 来绘制和擦除这两个纹理层。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d472f660-a1f7-4a34-a024-1a451fc44043/mp-tb-2waylerp.png)

下面是在网格体上绘制此设置的示例：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04ed90ae-518c-4040-97d1-44c35feafd62/mp-tb-2waylerpexample.gif)

#### 3路纹理混合

以下设置是一个展示如何将三个纹理层混合在一起以在网格体上绘制顶点权重的示例。VertexColor节点的红色、绿色和蓝色这些单独的颜色通道用于在绘制的每个纹理层之间进行线性插值。

红色、绿色和蓝色这三个颜色通道用于在网格体上进行绘制。你需要将 **纹理权重类型（Texture Weight Type）** 设置为 **RGB（三个纹理）（RGB (Three Textures)）** ，以绘制和擦除与这些颜色通道中的每个通道相关联的纹理。你可以更改 **绘制纹理权重索引（Paint Texture Weight Index）** 和 **擦除纹理权重索引（Erase Texture Weight Index）** ，以设置两个纹理中的哪一个纹理用于在给定的时间绘制到网格体上。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80e1c490-3b60-4fe4-ac1c-dfb6afe322dc/mp-tb-3waylerp.png)

在VertexColor节点上，颜色通道对应以下纹理：

-   纹理1映射到红色通道以及纹理3的线性插值，因此当材质编译时，它就是默认纹理
-   纹理2映射到绿色通道。
-   纹理3映射到蓝色通道。

下面是在网格体上绘制此设置的示例：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72f996ed-0894-4e63-bd25-ef1a972fd070/mp-tb-3waylerpexample.gif)

#### 4路纹理混合

以下设置是一个展示如何将四个纹理层混合在一起以在网格体上绘制顶点权重的示例。VertexColor节点的Alpha、红色、绿色和蓝色这些单独的颜色通道用于在绘制的每个纹理层之间进行线性插值。

Alpha、红色、绿色和蓝色这四个颜色通道用于在网格体上进行绘制。你需要将 **纹理权重类型（Texture Weight Type）** 设置为 **ARGB（四个纹理）（ARGB (Four Textures)）** ，以绘制和擦除与这些颜色通道中的每个通道相关联的纹理。你可以更改 **绘制纹理权重索引（Paint Texture Weight Index）** 和 **擦除纹理权重索引（Erase Texture Weight Index）** ，以设置两个纹理中的哪一个纹理用于在给定的时间绘制到网格体上。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b4d79fd-e6e6-4e1b-9de6-fac98cda5739/mp-tb-4waylerp.png)

在VertexColor节点上，颜色通道对应以下纹理：

-   纹理1映射到Alpha通道以及纹理4的线性插值，因此当材质编译时，它就是默认纹理
-   纹理2映射到红色通道。
-   纹理3映射到绿色通道。
-   纹理 4 映射到蓝色通道。

下面是在网格体上绘制此设置的示例：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2727c71-068a-4339-87a4-f6687368e19b/mp-tb-4waylerpexample.gif)

#### 5路纹理混合

以下设置是一个展示如何将五个纹理层混合在一起以在网格体上绘制顶点权重的示例。Alpha、红色、绿色和蓝色这些单独的颜色通道用于在绘制的每个层之间进行线性插值。为了获得用于纹理绘制的额外第五个通道，将使用一个 1-x（一减）节点。

Alpha、红色、绿色、蓝色和Alpha-1这五个颜色通道用于在网格体上进行绘制。你需要将 **纹理权重类型（Texture Weight Type）** 设置为 **ARGB - 1（五个纹理）（ARGB - 1 (Five Textures)）** ，以绘制和擦除与这些颜色通道中的每个通道相关联的纹理。你可以更改 **绘制纹理权重索引（Paint Texture Weight Index）** 和 **擦除纹理权重索引（Erase Texture Weight Index）** ，以设置两个纹理中的哪一个纹理用于在给定的时间绘制到网格体上。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6de04ee-531b-4222-8e21-9ba724b33d07/mp-tb-5waylerp.png)

在VertexColor节点上，颜色通道对应以下纹理：

-   纹理1映射到Alpha以及纹理5的线性插值，因此当材质编译时，它就是默认纹理。
-   纹理2映射到红色通道。
-   纹理3映射到绿色通道。
-   纹理 4 映射到蓝色通道。
-   纹理5通过1-x（一减）节点映射到Alpha。

下面是在网格体上绘制此设置的示例：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4fcbcb58-1071-4914-a11d-9da682704c6e/mp-tb-5waylerpexample.gif)

## 在网格体上绘制纹理混合材质

你可以使用以下操作在网格体上绘制：

-   按下 **鼠标左键** (LMB) 在网格体上绘制。
-   按下 **SHIFT + 鼠标左键** 在网格体上擦除已绘制内容。
-   按下 **X** 可快速在绘制纹理权重索引和擦除纹理权重索引之间切换。

使用顶点权重绘画模式时，需要设置 **纹理权重类型（Texture Weight Type）** ，以匹配将用于纹理混合的材质中纹理设置的数量。

要将特定纹理绘制到网格体上，需要使用 **绘制纹理权重索引（Paint Texture Weight Index）** 和 **擦除纹理权重索引（Erase Texture Weight Index）** 来分配要绘制到网格体上的纹理。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd57ba80-a68c-4f2c-a99e-2db8096070d0/mp-tb-weightpaintingsettings.png)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [reference](https://dev.epicgames.com/community/search?query=reference)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [mesh paint tool](https://dev.epicgames.com/community/search?query=mesh%20paint%20tool)
-   [vertex color](https://dev.epicgames.com/community/search?query=vertex%20color)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [为纹理混合设置材质](/documentation/zh-cn/unreal-engine/setting-up-a-texture-blended-material-for-vertex-weights-painting-in-unreal-engine#%E4%B8%BA%E7%BA%B9%E7%90%86%E6%B7%B7%E5%90%88%E8%AE%BE%E7%BD%AE%E6%9D%90%E8%B4%A8)
-   [使用Lerp节点在纹理之间混合VertexColor](/documentation/zh-cn/unreal-engine/setting-up-a-texture-blended-material-for-vertex-weights-painting-in-unreal-engine#%E4%BD%BF%E7%94%A8lerp%E8%8A%82%E7%82%B9%E5%9C%A8%E7%BA%B9%E7%90%86%E4%B9%8B%E9%97%B4%E6%B7%B7%E5%90%88vertexcolor)
-   [材质纹理混合设置](/documentation/zh-cn/unreal-engine/setting-up-a-texture-blended-material-for-vertex-weights-painting-in-unreal-engine#%E6%9D%90%E8%B4%A8%E7%BA%B9%E7%90%86%E6%B7%B7%E5%90%88%E8%AE%BE%E7%BD%AE)
-   [2路纹理混合](/documentation/zh-cn/unreal-engine/setting-up-a-texture-blended-material-for-vertex-weights-painting-in-unreal-engine#2%E8%B7%AF%E7%BA%B9%E7%90%86%E6%B7%B7%E5%90%88)
-   [3路纹理混合](/documentation/zh-cn/unreal-engine/setting-up-a-texture-blended-material-for-vertex-weights-painting-in-unreal-engine#3%E8%B7%AF%E7%BA%B9%E7%90%86%E6%B7%B7%E5%90%88)
-   [4路纹理混合](/documentation/zh-cn/unreal-engine/setting-up-a-texture-blended-material-for-vertex-weights-painting-in-unreal-engine#4%E8%B7%AF%E7%BA%B9%E7%90%86%E6%B7%B7%E5%90%88)
-   [5路纹理混合](/documentation/zh-cn/unreal-engine/setting-up-a-texture-blended-material-for-vertex-weights-painting-in-unreal-engine#5%E8%B7%AF%E7%BA%B9%E7%90%86%E6%B7%B7%E5%90%88)
-   [在网格体上绘制纹理混合材质](/documentation/zh-cn/unreal-engine/setting-up-a-texture-blended-material-for-vertex-weights-painting-in-unreal-engine#%E5%9C%A8%E7%BD%91%E6%A0%BC%E4%BD%93%E4%B8%8A%E7%BB%98%E5%88%B6%E7%BA%B9%E7%90%86%E6%B7%B7%E5%90%88%E6%9D%90%E8%B4%A8)
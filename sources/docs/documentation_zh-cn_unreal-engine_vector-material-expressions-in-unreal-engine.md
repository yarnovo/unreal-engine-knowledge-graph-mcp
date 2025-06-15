# 虚幻引擎向量类材质表达式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:28:24.297Z

---

目录

![向量类材质表达式](https://dev.epicgames.com/community/api/documentation/image/5f9c6299-ef07-4ea9-b59c-7eec49662fac?resizing_type=fill&width=1920&height=335)

本文档介绍了所有可用的向量材质表达式，这些表达式可输出映射至RGBA的向量。这些表达式可用于多种不同的空间材质效果，包括获取对象在世界场景空间中的位置以便材质可以做出响应，或者当进入特定区域时变换字符的颜色。此外，还有许多其他表达式允许你控制本地材质效果，你可以查看下面的示例了解更多信息。

## ActorPositionWS

**ActorPositionWS** 输出向量3(RGB)数据，该数据表示对象在世界场景空间中的位置以及其上的材质。

![Actor Position WS表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4edb2b09-0438-44dc-abad-bfbf3f928065/actor-position-ws.png)

在此示例中，ActorPositionWS被直接输入到材质的底色（Base Color）中。因此，当每个对象被移至三维空间中的不同位置时，每个球体以及应用于它们的材质将显示不同的颜色。请注意，ActorPositionWS节点的结果将除以1600，以创建一个漂亮的颜色过渡效果，而不是让颜色突然切换。

## CameraPositionWS

**CameraWorldPosition** 表达式会输出一个三通道向量值，该值表示摄像机在世界场景空间中的位置。

在下面的示例中，摄像机位置（Camera Position）被输入材质的底色。请注意当摄像机位置改变时，预览球体如何改变颜色。

## CameraVectorWS

**CameraVector** 表达式输出一个三通道向量值，该值表示摄像机相对于表面的方向，即像素到摄像机的方向。

**使用示例：** CameraVector通常通过将CameraVector连接到ComponentMask并使用CameraVector的x和y通道作为纹理坐标，来用于虚设环境贴图。

![Camera Vector example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78e24249-c1e4-4fce-91e4-208f04267335/camera-vector-ws.png)

## Constant2Vector

**Constant2Vector（常量 2 矢量）**表达式输出双通道矢量值，即输出两个常量数值。

属性

说明

**R**

指定表达式所输出的矢量的红色（第一个）通道的浮点值。

**G**

指定表达式所输出的矢量的绿色（第二个）通道的浮点值。

**示例：**(0.4, 0.6) 和 (1.05, -0.3)

**用法示例：**Constant2Vector（常量2矢量）对于修改纹理缩放或偏移非常有用，因为UV坐标需要双通道值。

![Constant2Vector Example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c518a866-457e-4b5f-8728-9302a3c59d26/constant-2-example.png)

按住 **2** 键并在材质图表背景的任意位置 **单击鼠标左键**，即可快速创建 Constant2Vector（常量2矢量）节点。

## Constant3Vector

**Constant3Vector（常量3矢量）**表达式输出三通道矢量值，即输出三个常量数值。Constant3Vector常被用于定义实心的RGB，其中每个通道都被赋予一种颜色（红色、绿色、蓝色）。你可以双击材质图表中的Constant3Vector节点，唤起取色器对话框。

属性

说明

**R**

指定表达式所输出的矢量的红色（第一个）通道的浮点值。

**G**

指定表达式所输出的矢量的绿色（第二个）通道的浮点值。

**B**

指定表达式所输出的矢量的蓝色（第三个）通道的浮点值。

**示例：**(0.4, 0.6, 0.0) 和 (1.05, -0.3, 0.3)

在本示例中，Constant3Vector与一个纹理样本（Texture Sample）相乘，改变了纹理的颜色。

![Constant3Vector Example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9783f97e-4203-49a2-a701-460d989d47ea/color-tint-constant-3-vector.png)

按住 **3** 键并在材质图表背景的任意位置 **单击鼠标左键**，即可快速创建 Constant3Vector（常量3矢量）节点。

## Constant4Vector

**Constant4Vector（常量 4 矢量）**表达式输出四通道矢量值，即输出四个常量数值。你可以用Constant4Vector来定义RGBA颜色，其中每个通道都被赋予一种颜色（红色、绿色、蓝色、alpha）。

属性

说明

**R**

指定表达式所输出的矢量的红色（第一个）通道的浮点值。

**G**

指定表达式所输出的矢量的绿色（第二个）通道的浮点值。

**B**

指定表达式所输出的矢量的蓝色（第三个）通道的浮点值。

**A**

指定表达式所输出的矢量的alpha（第四个）通道的浮点值。

**示例：**(0.4, 0.6, 0.0, 1.0) 和 (1.05, -0.3, 0.3, 0.5)

在下面的示例中，使用Constant4Vector表达式定义材质的 **底色（Base Color）** 和 **不透明度（Opacity）**。最上面的引脚输出RGB颜色，最下面的引脚输出alpha通道的值。alpha值为0.5时就能形成半透明材质。

![Constant4Vector Example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1a73218-0a42-454d-86cc-46816bc540ad/constant-4-example.png)

按住 **4** 键并在材质图表背景的任意位置 **单击鼠标左键**，即可快速创建 Constant4Vector（常量4矢量）节点。

## LightVector

LightVector材质表达式与 **延迟贴花（Deferred Decal）** 材质和贴花Actor一起使用时会输出向量（RGB）数据，这些数据表示当前像素在贴花的坐标空间中相对于贴花投影框的位置，并以归一化单位表示（0到1的区间内）。

如果与 **LightFunction** 材质一起使用，LightVector材质表达式会输出向量（RGB）数据，表示光源的坐标空间中从光源到像素的向量。

在其他材质域中，未使用LightVector表达式。

LightVector材质表达式应该仅用于 **延迟贴花（Deferred Decal）** 或 **LightFunction** 材质域。

### 示例

你可以使用LightVector材质表达式为延迟贴花创建线性衰减效果。 在下面的图表中，有两个参数用于控制贴花与接收表面之间的混合的深度和衰减。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49b98f36-7d1d-4348-992a-84aa8b79239a/light-vector-decal-falloff.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49b98f36-7d1d-4348-992a-84aa8b79239a/light-vector-decal-falloff.png)

结果如下所示。

## 对象边界

**对象边界（Object Bounds）** 表达式输出应用材质的对象在每个轴上的大小。表达式会输出一个float3值，分别表示X轴、Y轴、Z轴。如果将此几点链接到底色（Base Color），轴将分别对应于R、G、B。

![Object Bounds graph](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1f891e2-4a8e-4c59-ace0-c7a506707f85/object-bounds-graph.png)

在上面的视频中，注意当对象延各个轴缩放时，材质如何改变颜色。

## ObjectOrientation

**ObjectOrientation** 表达式输出应用材质的对象的向上空间向量。换言之，对象的局部正z轴正指向此方向。

![Object Orientation表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e85d047a-5d03-4b71-b24e-9537f6680439/object-orientation.png)

## ObjectPositionWS

**ObjectPositionWS** 表达式输出对象边界的世界场景空间中心位置。下图中的每个球体都呈现出不同的颜色，因为它们被移动到了空间中的不同位置。在关卡中，RGB颜色通道分别对应X、Y和Z轴。此节点在为植物创建球形照明时很有用。

![Object Position表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a2411c6-8ad3-457e-b848-5dbdc0991ac5/object-position-ws.png)

## 粒子位置WS

**粒子位置WS（ParticlePositionWS）** 表达式输出代表世界场景空间中每个单独粒子位置的Vector3(RGB)数据。

![Particle Position WS example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2b56f98-8154-4825-8fb8-7fc4da0de38b/particle-position-worldspace.png)

在这幅图像中，粒子位置WS（ParticlePositionWS）被馈送到自发光颜色中来显示数据。粒子系统被放大以显示颜色是如何根据位置变化的。

## PixelNormalWS

**PixelNormalWS** 表达式根据当前法线输出向量数据，该数据表示像素所面对的方向。

![Pixel Normal WS示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/592d0b1c-bcf3-4653-aac1-c1d83feca470/pixel-normal-ws.png)

在此示例中，PixelNormalWS被输入到底色（Base Color）中。请注意，法线贴图用于给出逐像素结果。

## 预蒙皮局部法线

**预蒙皮局部法线（Pre-Skinned Local Normal）** 向量表达式输出一个三通道向量值，该值表示骨架网格体和静态网格体的局部表面法线。这让你能够实现局部对齐的三平面材质以及在材质中实现网格体对齐效果。

在此示例中，材质使用与网格体局部表面法线对齐的三平面纹理。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7783de01-468f-4860-b3e0-d6ad7490b8f9/preskinned-local-normal-full.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7783de01-468f-4860-b3e0-d6ad7490b8f9/preskinned-local-normal-full.png)

点击查看大图。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7462933-f0fd-4624-a9d3-53f0807b49b7/preskinnedtriplanar.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dabed314-77e0-4706-9704-17fdaeab7e97/triplanarmaterial.gif)

三平面预蒙皮局部法线（Tri-Planar Pre-Skinned Local Normal）向量表达式

三平面材质

## 预蒙皮局部位置

**预蒙皮局部位置（Pre-Skinned Local Position）** 向量表达式输出一个三通道向量值，该值允许访问骨架网格体的默认姿势位置以便在每个顶点 输出中使用。这使你能够在动画角色上获得局部化效果。该向量表达式也可用于静态网格体，它将返回 标准局部位置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/acd3b810-d9cb-4e78-a0e7-4c9bf597ed9f/pre-skinned-local-position.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/acd3b810-d9cb-4e78-a0e7-4c9bf597ed9f/pre-skinned-local-position.png)

点击查看大图。

在此示例中，骨架网格体的默认姿势用于对比贴图与右侧的默认UV贴图。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50a98f0e-d654-4d6b-9c98-18fc59a538d0/ps_localpositionmaterial.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf6ccb5b-0514-4c24-8824-1b81fd2e716d/ps_defaultmaterial.gif)

预蒙皮局部位置（Pre-Skinned Local Position）向量表达式

骨架网格体的默认UV布局

## ReflectionVectorWS

**ReflectionVectorWS** 表达式在本质上类似于[CameraVectorWS](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#cameravectorws)，但它输出一个三通道向量值，该值表示通过表面法线反射的摄像机方向。

**使用示例：**ReflectionVector通常用于环境贴图，其中的反射向量会被输入立方体贴图纹理的UV坐标。这可以让你在材质上创建任意反射，不必存寻物理环境的规则。你也可以使用反射向量在未启用 \*Surface TranslucencyVolume **或** Surface ForwardShading\*\* 的半透明材质上创建低开销的伪反射。

![Fake translucent reflections](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ead93ef8-09ee-4a0a-af1f-bb78b6576a00/fake-translucent-reflections.png)

## VertexNormalWS

**VertexNormalWS** 表达式输出世界场景空间顶点法线。它只能用于在顶点着色器中执行的材质输入，例如WorldPositionOffset。该表达式对于设置网格体增大或缩小很有用。请注意，沿法线偏移位置会导致几何图形沿UV缝隙拆分。

在上面的示例中，由于每个顶点在各自的法线方向上移动，预览球体似乎会随着正弦运动按比例放大和缩小。

## 向量噪点

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe36b3a1-dc74-4b7d-9547-2346f60bbb2e/vector_noise_example.png)

向量噪点材质（Vector Noise Material）表达式添加了更多的三维或四维向量噪点结果以在材质中使用。由于这些函数会产生运行时间开销，建议在使用它们开发外观之后，使用渲染目标功能，将所有或部分计算烘焙到纹理中。

这些材质表达式允许在最终资源的引擎中开发程序外观，从而提供了一种使用外部工具创建程序生成纹理的替代方法。在向量噪点材质表达式（Vector Noise Material Expression）中，你将看到以下向量噪点类型。

图像

选项

说明

![Cellnoise](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f5590ea-9d39-4d6b-aa3f-d54846e6b4e6/cellnoise.png)

**单元格噪点（Cellnoise）**

为三维网格中的每个对象返回随机颜色（即从应用于节点输入的数学下限运算）。对于给定位置，结果始终保持一致，因此可以提供一种可靠的方法来将随机性添加到材质中。该向量噪点（Vector Noise）函数的计算非常便宜，因此没有必要为了性能而将它烘焙到纹理中。

![Perlin 3D noise](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90585dff-54da-4a9c-a4b4-5bc2ad9f041f/vectornoise.png)

**Perlin三维噪点（Perlin 3D Noise）**

为三维网格中的每个对象返回随机颜色（即从应用于节点输入的数学下限运算）。对于给定位置，结果始终保持一致，因此可以提供一种可靠的方法来将随机性添加到材质中。该向量噪点（Vector Noise）函数的计算非常便宜，因此没有必要为了性能而将它烘焙到纹理中。

![Perlin Gradient](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94b34d9e-8cc3-4bf0-9621-b7504cc2b63a/gradientnoise.png)

**Perlin梯度（Perlin Gradient）**

计算标量Perlin Simplex噪点的分析三维梯度。输出为四个通道，其中前三个(RGB)为梯度噪点，第四个(A)为标量噪点。该噪点类型对于表面上的凹凸或者流动贴图很有用。

![Perlin Curl](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca530511-565e-4550-a66e-ebc9b6ce074b/curlnoise.png)

**Perlin旋度（Perlin Curl）**

计算向量Perlin Simplex噪点（又名旋度噪点）的分析三维旋度。输出为一个三维有向旋度向量，它对流体或粒子流动很有用。

![Voronoi Noise](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff893ff3-3687-4532-bd75-d38b1e2416d9/voronoinoise.png)

**Voronoi**

计算与标量噪点材质节点相同的Voronoi噪点。标量Voronoi噪点在三维空间中散射种子点，并返回与相隔最近的一个种子点的距离。向量噪点（Vector Noise）变体返回RGB中最近的种子点的位置，以及在A中与它相隔的距离。特别是与单元格噪点（Cellnoise）结合使用时，这可以允许每个Voronoi单元格执行一些随机行为。

下面是一个简单的石床材质，使用Voronoi向量噪点（Voronoi Vector Noise）的距离分量，并结合向量噪点（Vector Noise） > 单元格噪点（Cellnoise），来调整一些表面凹凸并在缝隙和种子位置中混合苔藓，以更改每块岩石的颜色和凹凸高度。

![Stone blend example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11b8478d-dde4-432c-8ff8-0c858a04d906/stone_example.png)

正如普通的Perlin噪点一样，基于导数的 **Perlin旋度** 和 **Perlin梯度** 运算也可以按倍频添加在一起。对于更复杂表达式的导数，有必要计算表达式结果的梯度。为了帮助实现这一点，可以将要计算的表达式放入一个材质函数中，并将其与以下辅助节点一起使用。

选项

说明

**Prepare3DDeriv**

利用四面体图形中的位置偏移计算三维导数。在该函数产生的每个偏移位置计算同一个三维函数，然后将结果值输入Compute3DDeriv。

**Compute3DDeriv**

利用四面体图形中的位置偏移计算三维导数。与Prepare3DDeriv一起使用。

**GradFrom3DDeriv**

根据Prepare3DDeriv/Compute3DDeriv的结果计算三维梯度向量。

**CurlFrom3DDeriv**

根据Prepare3DDeriv/Compute3DDeriv的结果计算三维向量场的旋度。

这些辅助材质函数使用四面体图形中间隔的基本表达式的四个求值来近似计算这些基于导数的运算。

你将在下面看到各种噪点函数的相关说明，这些函数可以在向量噪点材质表达式（Vector Noise Material Expression）中找到。

项目

说明

 

属性

 

 

**函数**

-   **单元格噪点（Cellnoise）**：为三维空间中的每个整数网格单元格提供随机颜色。大约有10条指令。
-   **Perlin三维噪点（Perlin 3D Noise）**：计算性Perlin噪点，带三维输出，每个通道输出的范围为-1到1。如果只使用红色通道，则有大约83条指令；如果使用所有三个通道，则有125条指令。
-   **Perlin梯度（Perlin Gradient）**：计算Perlin噪点函数的梯度。RGB输出包含梯度向量，A为标量噪点。大约有106条指令。
-   **Perlin旋度（Perlin Curl）**：计算三维旋度噪点。输出为Perlin三维噪点的数学旋度。大约有162条指令。
-   **Voronoi**：与 *噪点（Noise）* 表达式中的Voronoi函数的算法和指令数相同，但RGB为每个Voronoi单元格中最近的种子点的位置，A为与该种子点相隔的距离。

 

**质量（Quality）**

外观/性能设置。值越小，速度越快，但可能外观越差；值越大，速度越慢，但可能外观越好。

 

**平铺（Tiling）**

对于支持它的噪点函数，它允许平铺噪点。此函数使用成本较高，但在将噪点烘焙到无缝缠绕纹理时很有用。

 

**平铺大小（Tile Size）**

平铺时噪点应多久重复一次。对于Perlin噪点变体，平铺大小（Tile Size）必须是三的倍数。

 

 

输入

 

**位置（Position）**

允许通过三维向量来调整纹理大小。

 

-   **单元格噪点（Cell Noise）** 材质示例：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6294cc1-cf34-424c-a5cf-f1686ad38148/cell-noise.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6294cc1-cf34-424c-a5cf-f1686ad38148/cell-noise.png)
    
    点击查看大图。
    
-   **Perlin梯度（Perlin Gradient）** 材质示例：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e1fcfb9-5e40-4ea2-963a-03113234be35/perlin-gradient.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e1fcfb9-5e40-4ea2-963a-03113234be35/perlin-gradient.png)
    
    点击查看大图。
    
-   **Voronoi** 材质示例：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb819ae2-ef43-4d49-bc9d-802fed79a7f8/voronoi-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb819ae2-ef43-4d49-bc9d-802fed79a7f8/voronoi-material.png)
    
    点击查看大图。
    

-   [materials](https://dev.epicgames.com/community/search?query=materials)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [ActorPositionWS](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#actorpositionws)
-   [CameraPositionWS](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#camerapositionws)
-   [CameraVectorWS](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#cameravectorws)
-   [Constant2Vector](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#constant2vector)
-   [Constant3Vector](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#constant3vector)
-   [Constant4Vector](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#constant4vector)
-   [LightVector](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#lightvector)
-   [示例](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#%E7%A4%BA%E4%BE%8B)
-   [对象边界](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#%E5%AF%B9%E8%B1%A1%E8%BE%B9%E7%95%8C)
-   [ObjectOrientation](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#objectorientation)
-   [ObjectPositionWS](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#objectpositionws)
-   [粒子位置WS](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#%E7%B2%92%E5%AD%90%E4%BD%8D%E7%BD%AEws)
-   [PixelNormalWS](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#pixelnormalws)
-   [预蒙皮局部法线](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#%E9%A2%84%E8%92%99%E7%9A%AE%E5%B1%80%E9%83%A8%E6%B3%95%E7%BA%BF)
-   [预蒙皮局部位置](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#%E9%A2%84%E8%92%99%E7%9A%AE%E5%B1%80%E9%83%A8%E4%BD%8D%E7%BD%AE)
-   [ReflectionVectorWS](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#reflectionvectorws)
-   [VertexNormalWS](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#vertexnormalws)
-   [向量噪点](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#%E5%90%91%E9%87%8F%E5%99%AA%E7%82%B9)
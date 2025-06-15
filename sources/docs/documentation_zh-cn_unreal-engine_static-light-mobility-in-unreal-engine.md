# 虚幻引擎中静态光源的移动性 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/static-light-mobility-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:15:29.152Z

---

目录

![静态光源的移动性](https://dev.epicgames.com/community/api/documentation/image/7eea144d-92bb-4198-9bc9-11247a03f37c?resizing_type=fill&width=1920&height=335)

将移动性（Mobility）设置为 **静态（Static）** 的光源是在运行时无法改变或移动的光源。它们在执行光照构建时使用[Lightmass](/documentation/zh-cn/unreal-engine/global-illumination-in-unreal-engine)进行预计算。静态光源会将数据存储在称为光照贴图的纹理中，这些纹理应用于关卡中的几何体。光照构建完成后，这些光源不会对性能产生进一步影响。

移动性设置为可移动（Movable）的静态网格体和骨骼网格体不会与静态光照完全集成（或混合）。但是，当进行光源构建时，光照数据会存储在[体积光照贴图](/documentation/zh-cn/unreal-engine/volumetric-lightmaps-in-unreal-engine)或[间接光照缓存](/documentation/zh-cn/unreal-engine/indirect-lighting-cache-in-unreal-engine)中，辅助静态光照区域内这些可移动对象的光照和接地。

在三种光移动性中，静态光源往往拥有中等品质、最低可变性和最低性能成本。

## 光照贴图分辨率

静态光源将使用[Lightmass](/documentation/zh-cn/unreal-engine/global-illumination-in-unreal-engine)生成光照数据，将其存储在每个关卡存储的光照贴图中，并在光照构建发生后应用于该关卡内的几何体。

由于光照贴图将光照数据存储在应用于几何体的纹理中，因此务必要为各个Actor设置良好的光照贴图分辨率，以便捕获表面上的良好阴影细节。你可以使用以下方法之一为场景中的对象设置光照贴图分辨率：

-   在 **静态网格体编辑器（Static Mesh Editor）** 中打开静态网格体资产（Static Mesh Asset），并使用其 **细节（Details）** 面板设置该资产在所有地方使用的默认 **光照贴图分辨率（Light Map Resolution）**。

-   在关卡编辑器（Level Editor）中，选择 **静态网格体Actor（Static Mesh Actor）**，并使用其 **细节（Details）** 面板启用 **已覆盖光照贴图分辨率（Overridden Light Map Res）**，输入新的光照贴图分辨率用于该单个Actor。当你缩放对象并需要使其光照贴图纹理与周围的其他对象保持一致时，此选项最有用。

下面的示例比较了低光照贴图分辨率与高光照贴图分辨率。与高分辨率相比，低光照贴图分辨率无法准确捕获细节。值得注意的是，更高的分辨率需要额外的磁盘空间存储纹理数据，并且在为场景构建光照时需要更长的处理时间。

 

 

 

![光照贴图分辨率64](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcd0c2bf-c90e-4b95-8611-9758e7917ff7/lightmap-resolution-64.png)

![光照贴图分辨率128](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f872b2f-2777-4eb4-a66c-74bef619db93/lightmap-resolution-128.png)

![光照贴图分辨率512](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43eb4ffb-d8b0-4f88-a6a9-ab5d4760de47/lightmap-resolution-512.png)

光照贴图分辨率：64

光照贴图分辨率：128

光照贴图分辨率：512

因为光照贴图分辨率可以按资产设置，或者在关卡中按Actor覆盖，所以接收静态阴影的资产之间的阴影看起来一致，并且它们与周围的阴影适当地融合很重要。**光照贴图密度（Lightmap Density）** 的关卡编辑器（Level Editor）视图模式（位于 **视图模式（View Modes）> 优化视图模式（Optimization Viewmodes）** 下拉菜单下）在所有静态网格体资产上显示平铺图案，其移动性（Mobility）设置为静态（Static），将生成光照贴图纹理。这些平铺图案表示基于静态网格体资产与场景中其他资产的光照贴图分辨率的当前纹素密度。

在此示例中，地板的纹素密度与场景中对象的周围光照贴图分辨率并不匹配。请注意中心的方块与地板相交的位置，以及与方块相比地板上烘焙的阴影不一致。

 

 

![带有内置阴影的仅光照视图模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34065226-9959-4f9b-8f79-e518c7552f9c/lighting-only-viewmode_1.png)

![光照贴图密度视图模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf5df6b9-0339-42f9-ab54-d69f99d81153/lightmap-density-view-mode_1.png)

带有内置阴影的仅光照视图模式

光照贴图密度视图模式 - 地板资产光照贴图低纹素密度

增加地板的光照贴图分辨率，使纹素密度与中心的那一块和场景中的其他对象更紧密地排列。请注意，因为纹素密度排列更紧密，现在地板和方块之间的阴影变得更加一致了。

 

 

![带有内置阴影的仅光照视图模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9387b39-459c-4e46-9d5b-64322df7150f/lighting-only-viewmode_2.png)

![光照贴图密度视图模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec5fab2e-11c9-4726-b735-0cb89166626b/lightmap-density-view-mode_2.png)

带有内置阴影的仅光照视图模式

光照贴图密度视图模式 - 更高的地板资产光照贴图纹素密度

## Lightmass设置

静态光源有自己的设置，这些设置位于光源和 **世界设置（World Settings）** 内，将影响光源在关卡中的交互。

### 逐光源Lightmass设置

在场景中选定 **光源（Lights）** 的移动性（Mobility）设置为 **静态（Static）** 时，**Lightmass** 类别下的以下设置会影响光照构建。

属性

说明

**光源角度（Light Source Angle）**

对于定向光源，这可以控制发射表面相对于接收方的延伸角度，并影响定向光源投射阴影的半影大小。

**间接光照饱和度（Indirect Lighting Saturation）**

控制应用于烘焙反射光照的去饱和量。

**阴影指数（Shadow Exponent）**

控制阴影半影的衰减。

### 世界设置Lightmass设置

对于每个 **关卡（Level）**，使用 **世界设置（World Settings）> Lightmass设置（Lightmass Settings）** 配置静态光照在世界中的计算方式。此处的设置将影响当前加载的关卡中所有的静态光源。

属性

说明

**静态光照关卡比例（Static Lighting Level Scale）**

关卡相对于真实世界的比例（1虚幻单位等于1厘米）。所有与比例相关的Lightmass设置默认值都已设置为适用于真实世界的比例。所有具有不同比例的关卡都应使用此比例进行补偿，例如在大型世界中，设置为较高值（如2或4）时，可以显著减少构建时间。较低的值将大幅增加构建时间。

**间接光照反射次数（Num Indirect Lighting Bounces）**

从光源开始，模拟点光源、聚光源和定向光源的光源反射次数。0仅产生直接光照。第一次反射需要的计算时间最多，并且对视觉质量的影响最大，其次是光源的第二次反射。除非材质漫反射颜色接近1，否则连续反射并不会真正影响光源构建时间，但视觉影响要低得多。

**天空光照的反射次数（Num Sky Light Bounces）**

要模拟的天空光照和自发光反射的次数。Lightmass将使用不可分配的光能传递方法进行天空光照反射，其成本与反射次数成正比。

**间接光照质量（Indirect Lighting Quality）**

此设置可用于增加全局光照解算器示例数，以便为需要它的关卡提供更高的质量。在提高品质以获得定义的间接阴影时，稍微降低 **间接光照平滑度（Indirect Lighting Smoothness）** （大约0.75）会很有用。

此设置不会影响光照构建期间可能发生的压缩瑕疵、UV接缝或其他基于纹理的瑕疵。

**间接光照平滑度（Indirect Lighting Smoothness）**

当Lightmass无法解析准确的间接光照时，此设置在某些光照条件下很有用。1是默认平滑度，设置为适用于各种光照情况。像3这样的值比较高，会使间接光照更加平滑，但代价是间接阴影会丢失细节。

**环境色（Environment Color）**

代表围绕关卡上半球的恒定颜色光照，就像天空一样。光源当前不会作为间接光照反射，并会然导致反射捕获亮度不正确。建议改用静态天空光照。

**漫反射提升（Diffuse Boost）**

缩放场景中所有材质的漫反射效果。

**体积光照方法（Volume Lighting Method)**

用于在Lightmass重要体积内的所有位置提供预计算光照的技术。

-   **体积光照贴图（Volumetric Lightmap）：**光照示例在覆盖整个Lightmass重要体积的自适应网格中计算。几何体附近使用更高密度的网格。体积光照贴图在GPU上逐像素有效地进行插值，从而为动态对象和体积雾提供准确的间接光照。在移动设备上，插值在每个对象边界中心的VPU上完成。
-   **稀疏体积光照示例（Sparse Volume Lighting Samples）：**光照示例以中等密度放置在静态表面的顶部，并以低密度放置在Lightmass重要体积中的其他任意地方。重要体积之外的位置将没有间接光照。此方法需要CPU插值，因此使用间接光照缓存为每个动态对象内插结果，增加了渲染线程开销。体积雾不会受到使用此方法预计算光照的影响。

**使用环境光遮蔽（Use Ambient Occlusion）**

启用后，环境光遮蔽将被烘焙到光照贴图中。

**生成环境光遮蔽材质遮罩（Generate Ambient Occlusion Material Mask）**

是否生成纹理存储Lightmass计算的环境光遮蔽。这些可以通过PrecomputedAOMask材质节点访问，这对于在环境资产上的不同材质层之间进行混合非常有用。

如果你只需要PrecomputedAOMask，请确保将直接光照遮蔽率（Direct Illumination Occlusion Fraction）和间接光照遮蔽率（Indirect Illumination Occlusion Fraction）设置为0。

**可视化材质漫反射（Visualize Material Diffuse）**

如果为true，则仅使用导出的漫反射项覆盖正常的直接和间接光照。

**可视化环境光遮蔽（Visualize Ambient Occlusion）**

如果为true，则仅使用环境光遮蔽项覆盖正常的直接和间接光照。

**压缩光照贴图（Compress Lightmaps）**

是否压缩光照贴图纹理。禁用光照贴图纹理压缩将减少瑕疵，但会大幅增加使用的内存和磁盘大小。

**体积光照贴图细节单元大小（Volumetric Lightmap Detail Cell Size）**

最高密度的体积光照贴图体素的大小（在几何体周围使用），以世界空间为单位。这对构建时间和内存有很大影响，应谨慎使用。将细节单元大小减半，可以增加高达8倍的内存。

**体积光照贴图最大块内存Mb（Volumetric Lightmap Maximum Brick Memory Mb）**

用于体积光照贴图块数据的最大内存量。在达到此限制之前，高密度块将被丢弃，首先丢弃距离几何体最远的块。

**体积光照贴图球谐函数平滑（Volumetric Lightmap Lightmap Spherical Harmonic Smoothing）**

控制在球谐函数去振铃期间应该对体积光照贴图示例进行多大程度的平滑。每当在球谐函数中存储高度定向光源时，就会出现振铃瑕疵，它在另一侧表现为意外的黑色区域。平滑可以减少这种瑕疵。平滑仅在出现振铃瑕疵时才应用。0等于无平滑，1等于强平滑（光照方向性很小）。

**体积光源示例放置比例（Volume Light Sample Placement Scale）**

缩放放置体积光照示例的距离。体积光照示例由Lightmass计算，用于可移动组件的全局光照。使用大比例会减少示例内存使用，并缩短间接光照缓存更新时间，但光照区域之间的过渡精度变低。

**直接光照遮蔽率（Direct Illumination Occlusion Fraction）**

应用到直接光照的环境光遮蔽程度。

**间接光照遮蔽率（Indirect Illumination Occlusion Fraction）**

应用到间接光照的环境光遮蔽程度。

**遮蔽指数（Occlusion Exponent）**

较高的指数会增加对比度。

**完全遮蔽的示例部分（Fully Occluded Samples Fraction）**

为达到完全遮蔽而必须遮蔽的示例部分。

**最大遮蔽距离（Max Occlusion Distance）**

一个对象导致另一个对象被遮蔽的最大距离。

高级属性

 

**光照贴图（Lightmaps）**

保存在关卡中的已计算光照贴图纹理。

**强制无预计算光照（Force No Precomputed Lighting）**

是否强制不创建光照贴图和其他预计算光照，即使引擎认为需要它们。在具有完全动态光照和投影的关卡中，这对于改进迭代很有用。

如果启用此设置，通常预计算的所有光照和投影交互都会丢失。

**打包的光影贴图纹理大小（Packed Light and Shadow Map Texture Size）**

打包的光影贴图的最大纹理尺寸。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [mobility](https://dev.epicgames.com/community/search?query=mobility)
-   [light type](https://dev.epicgames.com/community/search?query=light%20type)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [光照贴图分辨率](/documentation/zh-cn/unreal-engine/static-light-mobility-in-unreal-engine#%E5%85%89%E7%85%A7%E8%B4%B4%E5%9B%BE%E5%88%86%E8%BE%A8%E7%8E%87)
-   [Lightmass设置](/documentation/zh-cn/unreal-engine/static-light-mobility-in-unreal-engine#lightmass%E8%AE%BE%E7%BD%AE)
-   [逐光源Lightmass设置](/documentation/zh-cn/unreal-engine/static-light-mobility-in-unreal-engine#%E9%80%90%E5%85%89%E6%BA%90lightmass%E8%AE%BE%E7%BD%AE)
-   [世界设置Lightmass设置](/documentation/zh-cn/unreal-engine/static-light-mobility-in-unreal-engine#%E4%B8%96%E7%95%8C%E8%AE%BE%E7%BD%AElightmass%E8%AE%BE%E7%BD%AE)
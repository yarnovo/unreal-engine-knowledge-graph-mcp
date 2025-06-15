# Landscape地形概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-overview
> 
> 生成时间: 2025-06-14T19:13:02.406Z

---

目录

![Landscape地形概述](https://dev.epicgames.com/community/api/documentation/image/8fc23c1b-15db-4866-8f89-2c825246151e?resizing_type=fill&width=1920&height=335)

你可以使用 **地形（Landscape）** 为你的世界场景创建地形。山脉、山谷、起伏或倾斜的地面，甚至洞穴的开口都可以做到。使用地形系统的工具集，你就能修改地形的形状和外观。

有关开口和使用地形（Landscape）工具的信息，请参阅[地形快速入门指南](/documentation/zh-cn/unreal-engine/landscape-quick-start-guide-in-unreal-engine)。

## 地形工具模式

![Landscape Tool Modes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f7394b3-ea99-499b-a02a-5b0a69b5e07b/01-landscape-tool-modes.png "Landscape Tool Modes")

地形工具有三种模式，可以通过地形工具窗口顶部的图标访问。

图标

模式

说明

![Manage mode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c1dba98-368c-42fb-ad8e-d1e6c7e8d822/02-landscape-manage-mode.png "Manage mode")

**管理模式（Manage mode）**

创建新的地形，并修改地形组件。你也可在管理模式中使用[地形拷贝工具](/documentation/zh-cn/unreal-engine/landscape-copy-tool-in-unreal-engine)复制、粘贴、导入、导出部分地形。有关管理模式的更多信息，请参阅[地形管理模式](/documentation/zh-cn/unreal-engine/landscape-manage-mode-in-unreal-engine)。

![Sculpt mode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a919a554-1ce7-49e1-b166-807eb0ecab99/03-landscape-sculpt-mode.png "Sculpt mode")

**雕刻模式（Sculpt mode）**

通过选择和使用特定的工具，修改地形的形状。有关雕刻模式的更多信息，请参阅[地形雕刻模式](/documentation/zh-cn/unreal-engine/landscape-sculpt-mode-in-unreal-engine)。

![Paint mode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63470803-e630-4b41-acfe-2570daa3ce16/04-landscape-paint-mode.png "Paint mode")

**绘制模式（Paint mode）**

基于在地形材质中定义的图层，通过在地形上绘画纹理以修改部分地形的外观。有关绘制模式的更多信息，请参阅[地形绘制模式](/documentation/zh-cn/unreal-engine/landscape-paint-mode-in-unreal-engine)。

创建一个地形意味着创建一个地形Actor。与其他Actor一样，你可以在关卡编辑器的 **细节（Details）** 面板中编辑它的许多属性，包括其指定材质。有关 **细节（Details）** 面板的更多信息，请参阅[关卡编辑器细节面板](/documentation/zh-cn/unreal-engine/level-editor-details-panel-in-unreal-engine)。

## 地形功能

下面的章节将介绍Landscape地形系统的主要功能和采用的技术。

### 大地形尺寸

Landscape系统为地形铺平了道路，这些地形比之前在虚幻引擎中可能出现的地形大若干个数量级。由于其强大的 **细节级别（Level of Detail）** (**LOD**)系统和高效利用内存的方式，现在可以合法地实现和使用高达8192x8192像素的高度图。虚幻引擎现在支持广袤的室外世界场景，这意味着用户可以快速创建游戏，而无需修改现有的引擎或工具。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff635a0b-e5ba-45d1-931e-8b2df807b958/city-sample-landscape.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff635a0b-e5ba-45d1-931e-8b2df807b958/city-sample-landscape.png)

点击查看大图。

### Landscape内存使用

对于创建大型地形，Landscape通常是比 **静态网格体** 更好的选择。

对于顶点数据，Landscape为每个顶点使用4个字节。静态网格体以12字节矢量的形式存储位置，每个切线X和Z矢量封装为4个字节，并为每个顶点的共24或28个字节存储16位或32位浮点UV。

这意味着，对于相同的顶点密度，静态网格体将使用6或7倍于Landscape的内存。Landscape还将它们的数据存储为 **纹理**，并且可以为遥远的区域流送未使用的LOD关卡，并在你接近它们时从后台的磁盘加载它们。Landscape使用一个常规的高度场，因此其碰撞数据也能够比静态网格体的碰撞数据更高效地存储。

### 静态渲染数据作为纹理存储在GPU内存中

在大多数平台上，Landscape系统在GPU内存中以纹理的形式存储地形的渲染数据。这种存储形式允许在顶点着色器中查找数据。这种渲染数据使用32位纹理进行存储，高度会占据16位（通过R、G和法线通道）；或者保存为28位的数值（分别用于X和Y，占据B和A通道）。此外，如果使用了[重新拓补](/documentation/zh-cn/unreal-engine/landscape-retopologize-tool-in-unreal-engine) 工具，另外一个32位纹理会保存X和Y偏移。

### 连续Geo-MipMap LOD

标准纹理mipmap为Landscape地形处理LOD。每个mipmap都是一个细节级别，可以使用"text2Dlod"HLSL指令指定要采样的mipmap。你的Landscape可以拥有大量LOD，通知保持平滑的LOD过渡，因为一次过渡中的两个LOD的mip级别都可以被采样，然后高度和X和Y偏移量可以内插到顶点着色器以创建一个干净利落的变换效果。

![Landscape LOD1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36c04fce-e9f4-439a-b7eb-7245b5644a2e/06-landscape-lod-1.png "Landscape LOD1")

![Landscape LOD1 to LOD2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e9314b4-db3a-4db8-a9ba-14f6aeb41ba2/07-landscape-lod-1-to-lod-2.png "Landscape LOD1 to LOD2")

![Landscape LOD2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1417ecaa-87df-41d1-b904-63d45c48da47/08-landscape-lod-2.png "Landscape LOD2")

**完全LOD 1（Fully LOD 1）**

**从LOD 1变换到LOD 2（Morphing from LOD 1 to LOD 2）**

**完全LOD 2（Fully LOD 2）**

### 高度图和权重数据流送

由于使用纹理存储数据，虚幻引擎中的标准纹理流送系统可以根据需要对mipmap进行流进流出处理。这不仅适用于高度图数据，也适用于纹理层的权重。只需要每个LOD所需的mipmap，就可以在任何时候最大程度减少要使用的内存量，这意味着你可以创建更加庞大的地形。

### 高分辨率LOD独立照明

由于存储了地形的X和Y斜率，所以所有的高分辨率（非LOD）法线数据都可以用于照明计算。

![Landscape LODs](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb20d136-fe78-4c07-8f4f-cabe702690fe/09-landscape-lods.png "Landscape LODs")

![Landscape Full Resolution Normals](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa2834db-4f4f-455a-a9b4-8f73b77dec74/10-landscape-full-resolution-normals.png "Landscape Full Resolution Normals")

**地形LOD（Landscape LODs）**

**全分辨率法线（Full Resolution Normals）**

这意味着你可以始终使用地形的最高分辨率执行逐像素照明，甚至在无LOD的遥远组件上也可如此。

![Landscape Simple Vertex Lighting](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0f89c65-0f68-47c5-ada8-6e534c0bf2e7/11-landscape-simple-vertex-lighting.png "Landscape Simple Vertex Lighting")

![Landscape High Res Per-Pixel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f1628e6-e608-47c6-9cbb-919a16ebfb22/12-landscape-hr-per-pixel.png "Landscape High Res Per-Pixel")

**简单顶点照明**

**高分辨率逐像素照明**

当这些高分辨率的法线数据与精细的法线图结合在一起时，Landscape地形可以实现非常精细的照明，却只需要极少的系统开销。

![Landscape Geometry Normals](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15147434-5255-4e0d-a559-45eb7be73b12/13-landscape-geometry-normals.png "Landscape Geometry Normals")

![Landscape Detail Normals](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/368488cb-03cb-475d-b863-18dc06ef6435/14-landscape-detail-normals.png "Landscape Detail Normals")

**仅几何体法线**

**带细节法线**

### PhysX碰撞

Landscape用一个高度场对象来实现碰撞。你可以为图层指定[物理材质](/documentation/zh-cn/unreal-engine/physical-materials-in-unreal-engine)，碰撞系统将使用每一位置的主导层来确定使用哪一种物理材质。可以使用降低的分辨率碰撞高度场（例如0.5x渲染分辨率）来节省大型Landscape地形的内存需求。远距Landscape的碰撞和渲染组件也可以使用关卡流送系统实现流出。

## 地形项目设置

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d9557fa-b981-48c6-a9d2-7b65d87955e3/landscape-project-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d9557fa-b981-48c6-a9d2-7b65d87955e3/landscape-project-settings.png)

地形项目设置

**选项**

**说明**

**最大层数（Max Number of Layers）**

定义可以添加到地形的最大编辑层数。

**默认层信息对象（Default Layer Info Object）**

定义要将哪个 **层信息对象（Layer Info Object）** 默认添加到新地形。

**最大组件数（Max Components）**

定义地形中的最大组件数。

**最大图像导入缓存大小（兆字节）（Max Image Import Cache Size Mega Bytes）**

定义导入图像缓存的最大大小，以MB为单位。

**绘制强度Gamma（Paint Strength Gamma）**

定义用于调整 **绘制（Paint）** 工具的强度的指数。

**地形脏污模式（Landscape Dirtying Mode）**

定义引擎何时要求重新保存地形：

-   **自动（Auto）**：被标记为需要重新保存的地形会出现在 **选择要保存的文件（Choose files to save）** 对话框中。每当地形发出请求时，改动将被保存。此为默认模式。
-   **仅在地形模式中（In Landscape Mode Only）**：被标记为需要重新保存的地形不会出现在 **选择要保存的文件（Choose files to save）** 对话框中。此为手动保存模式，由用户负责避免与其他用户发生文件竞争。视口将显示错误信息，说明地形Actor不是最新版本，需要重新保存。这需要通过 **构建（Build）> 保存修改后的地形（Save Modified Landscapes）** 完成。
-   **在地形模式和用户触发的修改中（In Landscape Mode and User Triggered Changes）**：被标记为需要重新保存的地形不会出现在 **选择要保存的文件（Choose files to save）** 对话框中。但任何用户触发的修改（直接或间接）都会要求重新保存地形。推荐协作团队使用此模式，因为它提供其他两种模式中最好用的功能，同时确保了被修改的地形Actor得到保存，并被正确提交到源控制中。

**默认地形材质（Default Landscape Material）**

定义默认分配给地形的地形材质。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [open world](https://dev.epicgames.com/community/search?query=open%20world)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [地形工具模式](/documentation/zh-cn/unreal-engine/landscape-overview#%E5%9C%B0%E5%BD%A2%E5%B7%A5%E5%85%B7%E6%A8%A1%E5%BC%8F)
-   [地形功能](/documentation/zh-cn/unreal-engine/landscape-overview#%E5%9C%B0%E5%BD%A2%E5%8A%9F%E8%83%BD)
-   [大地形尺寸](/documentation/zh-cn/unreal-engine/landscape-overview#%E5%A4%A7%E5%9C%B0%E5%BD%A2%E5%B0%BA%E5%AF%B8)
-   [Landscape内存使用](/documentation/zh-cn/unreal-engine/landscape-overview#landscape%E5%86%85%E5%AD%98%E4%BD%BF%E7%94%A8)
-   [静态渲染数据作为纹理存储在GPU内存中](/documentation/zh-cn/unreal-engine/landscape-overview#%E9%9D%99%E6%80%81%E6%B8%B2%E6%9F%93%E6%95%B0%E6%8D%AE%E4%BD%9C%E4%B8%BA%E7%BA%B9%E7%90%86%E5%AD%98%E5%82%A8%E5%9C%A8gpu%E5%86%85%E5%AD%98%E4%B8%AD)
-   [连续Geo-MipMap LOD](/documentation/zh-cn/unreal-engine/landscape-overview#%E8%BF%9E%E7%BB%ADgeo-mipmaplod)
-   [高度图和权重数据流送](/documentation/zh-cn/unreal-engine/landscape-overview#%E9%AB%98%E5%BA%A6%E5%9B%BE%E5%92%8C%E6%9D%83%E9%87%8D%E6%95%B0%E6%8D%AE%E6%B5%81%E9%80%81)
-   [高分辨率LOD独立照明](/documentation/zh-cn/unreal-engine/landscape-overview#%E9%AB%98%E5%88%86%E8%BE%A8%E7%8E%87lod%E7%8B%AC%E7%AB%8B%E7%85%A7%E6%98%8E)
-   [PhysX碰撞](/documentation/zh-cn/unreal-engine/landscape-overview#physx%E7%A2%B0%E6%92%9E)
-   [地形项目设置](/documentation/zh-cn/unreal-engine/landscape-overview#%E5%9C%B0%E5%BD%A2%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
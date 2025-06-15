# 在虚幻引擎中构建纹理流送数据 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/building-texture-streaming-data-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:23:35.972Z

---

目录

![构建纹理流送数据](https://dev.epicgames.com/community/api/documentation/image/b019c5d2-6f27-4d0f-992a-c4bc5c86d8d8?resizing_type=fill&width=1920&height=335)

每次修改和重新保存材质或材质实例时，会重新计算与使用的每个纹理有关的纹理流送数据。 每个纹理数据包含UV通道索引和缩放，UV通道索引用于对纹理采样， 缩放是应用于被采样通道的乘法因数。

但是，这不涵盖所有情况，因为采样可能基于场景位置、网格体顶点颜色或任何UV通道组合。这可能会导致无法通过分析 找到相关数据，引擎会假设依赖于UV通道0和缩放1。

分析在多个不同的步骤运行，具体取决于所编辑的内容：

1.  **材质：**当用户应用或保存修改时运行。
2.  **材质实例：**材质实例编辑器关闭或者保存包含材质实例的包时运行。
3.  **关卡：**用户运行"构建纹理流送"时针对每个所用材质运行。用于确保每个材质都是最新的。材质不是最新的原因包括：
    -   4.15之前的材质没有任何数据。
    -   材质父代已更改，实例数据已过期。
    -   上次保存材质后进行了一些改进。
    -   存在错误修复。

对于给定的Primitive组件，需要一些数据来准确计算每个所用纹理的所需分辨率，这些数据来自于：

-   Primitive的边界
-   网格体的纹理坐标大小
-   用于对每个纹理采样的材质纹理坐标缩放

如果缺少该信息，则将使用保守式启发。

**要构建纹理流送数据：**

1.  单击 **工具栏** 中的 **构建（Build）** 旁边的下拉箭头。
2.  单击 **构建纹理流送**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c9d5fd8-25fa-480f-9634-607bee216bdd/buildtexturestreaming.png)

这将产生要在运行时使用的组件和关卡数据。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3527f23c-1002-47b8-8d2b-15e33303de6d/buildingtexturestreaming.png)

请注意，这会使用最高质量级别和支持的功能级别，生成用于所有材质质量级别和平台功能级别的数据。

在运行时，如果组件使用的纹理少于构建流程中使用的纹理，则将忽略未使用的纹理。

## 将流数据迁移到4.15

由于4.15之前的任何材质都不会在材质中存储任何纹理流送数据，因此在修改和重新保存之前不包含任何数据。这也包括重新保存 材质的子实例。要快速迁移数据，你可以使用控制台命令 `BuildMaterialTextureStreamingData`。

这将解析内存中当前加载的所有材质，并生成任何缺少的数据。更新后的材质将标记为重新保存。

## 检测材质数据

构建的数据可以在 **材质纹理缩放（Material Texture Scales）** 查看模式下检查。这种查看模式仅显示已经成功计算的内容，任何回退情况将显示为\_未定义\_。 这种查看模式将显示材质缩放的准确性，并用于在分析中验证更改。如果存在于纹理流送有关的质量问题，它还能识别可能的原因。

要检查材质纹理流送数据，你可以从 **内容浏览器** 中选择材质或从场景视图中选择primitive。主视口中的 **纹理（Texture）** 选项卡显示 选择来源，辨识方法是在选项卡标签结尾添加"（场景选择）(Scene Selection)"或"（内容浏览器）(Content Browser)"。

当使用"场景选择"时，不能选择单个材质，UI会堆来自所有材质的数据分组。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f54b75ff-c92b-45d6-bec3-50f7849895e6/noselection.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb40bd18-5c10-4090-848e-487ec9f1bc98/contentbrowser.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53009ef0-09a5-44ad-a1b9-5bf1aede2835/sceneselection.png)

未选择任何内容

来自内容浏览器的材质

场景选择Actor

#### 场景选择

在使用 **场景选择（Scene Selection）** 时，不能选择单个材质，UI会对来自所有材质的数据分组。当你将鼠标悬浮于下拉菜单中某个纹理选择上时，会看到工具提示中 列出的所有纹理。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ce7eb49-c418-4587-b630-254ab19135d4/singleselection.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa99e3bf-b84c-4e2d-99a7-0bb89a6f22f8/multipleselection.png)

单个对象场景选择

多个对象场景选择

#### 内容浏览器选择

当使用 **内容浏览器** 选择时，纹理通过纹理索引、材质名称（如果选择了多个材质）和纹理名称。 纹理索引是每个材质内的标识符。显示的准确性是通过比较所用GPU值和材质分析中计算的值而得出的。 在材质分析中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f06de299-7494-4862-8fa1-a4589d3a47cc/cb_singleselection.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/192eabef-6f79-42fa-97f2-ff9ef7f46119/cb_multipleselection.png)

单一材质内容浏览器选择

多个材质内容浏览器选择

#### 所有纹理模式

在 **所有纹理（All Textures）** 模式下，会显示来自所有所用纹理的最坏情况。如果全局值准确（浅灰色），则所有纹理都有准确的值。不幸的是， 这种模式有一个限制，即如果用不同缩放对同一纹理多次采样，这通常会显示为过度流送。这是因为 只有只是用了需要最高分辨率的缩放，分析中忽略了需要较低分辨率的缩放。这一限制不适用于每个纹理视图。

## 构建准确性

纹理流送构建期间计算的数据准确性可以通过查看纹理流送准确性视图模式来检查：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e984be9d-e5d5-4675-bbe1-daf5e62355d5/showtexturestreamingaccuracies.png)

这些视图模式将显示构建数据的准确性。当准确性结果过低或过高（红色或绿色）时，有时可以通过手动[配置更改](/documentation/zh-cn/unreal-engine/texture-streaming-configuration-in-unreal-engine)更正数据。 纹理流送构建旨在不需要手动调整的情况下生成最佳数据。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3933200c-9ea1-4a38-95bb-b4c450baa306/originaltexturescene.png)

上图是用于构建以下所示纹理数据的场景。对于所有视图模式，请使用以下图例：

-   红色：缺失2X+个mip
-   黄色：缺失1个mip
-   白色：良好数据
-   青色：多余1个mip
-   绿色：多余2X+个mip

### Primitive距离准确度

这会显示流送器计算的视图网格体距离与实际GPU距离相比较的准确性。流送器计算从视点到纹理实例轴对齐边界框（AABB）的 距离。通过将使用该纹理的组件LOD部分AABB加总起来，在构建流程中计算该边界框。

视点非常接近或进入AABB时，这种模式将始终显示超过2X+，除非几何结构与AABB相符。这是因为流送器计算的距离变为值0， 而GPU距离通常是非0值。因此，流送器计算距离与GPU距离之间的比率变得非常大。这不是错误， 目前也无需修复。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9541dd90-1e7b-4198-b447-ac66aeaf2fe0/primitivedistanceaccuracy.png)

这里显示的值可以通过更改网格体组件的 **流送距离乘数（Streaming Distance Multiplier）** 调整。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/665ac6f3-d41d-4fde-8529-24c006f5f8a0/streamingdistancemultiplier.png)

### 网格体UV密度准确性

这种视图模式显示流送器使用的网格体场景纹理坐标（texcoord）大小与实际GPU值比较的准确性。这种大小通过场景空间单位与纹理坐标变体之间建立关联。 流送器用它来评估纹理坐标对纹理采样的影响。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3a59825-4d19-4540-805e-3b4604e3453a/uvdensities.png)

这种视图模式属于相当的视点不可知类型，当网格体的值不理想时，它们通常与场景无关，而是与网格体有关。这意味着，如果任何网格体包含错误数据，则使用该网格体的任何组件 很可能变得不正确。在静态网格体或骨架网格体编辑器中，通过调整 `StreamingDistanceMultiplier` 直到网格体位于 **良好（Good）** 范围内，可以更改该值。

### 材质纹理缩放准确性

材质中使用的大多数纹理都使用其中一个网格体UV密度的缩放值来采样。纹理流送构建尝试计算使用哪个纹理坐标以及对每个采样纹理应用哪个缩放。 这可能会因为许多原因而失败，如果失败，流送器会假设纹理是使用纹理坐标0和缩放1进行采样的。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6efd7da1-8604-48e2-97d3-24f7f3643f54/materialtexture.png)

除了标准图例，还可以通过黑白棋盘格了解构建因为某个原因而无法生成所需的着色器。此外，由于材质对许多纹理采样，该视图模式在 所有采样纹理中显示最差错误。两个极值（流送不足和过度流送）通过棋盘格显示：一个显示最差过度采样，另一个显示最差采样不足。

每个纹理的独立错误可以使用控制台命令 `r.Streaming.AnalysisIndex X` 进行调查，其中X是介于0到31之间的值。

### 所需纹理分辨率

在该视图模式下，可以显示当前流送纹理分辨率和所需纹理分辨率之间的关系。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17519924-d1da-4457-a67c-3249c53fe45d/requiredtextureres.png)

该视图模式与材质纹理缩放有一些相似之处，但它不显示纹理流送数据的准确性，而是显示当前以绝对方式 加载的纹理分辨率的有用性。

任何时候针对纹理加载的分辨率都来自于逻辑和指标的组合。例如，纹理可能会缺少分辨率，因为没有足够的可用空间加载纹理，或者 它没有过多的分辨率，因为其更高的mip缓存在纹理池中等待将来使用。此外，流送器通常由需要最高分辨率的组件驱动， 因此调查纹理对一个组件的行为仅在这个组件是驱动其分辨率的组件时才有意义。

因此，该视图模式最好用于调查受控环境中纹理流送器的行为。一种有用的设置是：

`r.Streaming.DropMips 2`

这告诉流送器仅保持可见mip，因此禁用缓存和预取。通过四处移动摄像机，你将看到流送器是否在正确的时间加载/卸载正确的mip。

请注意，如果所选组件材质中选择的纹理数量不超过32，那么纹理选择菜单将呈现每个纹理的选项。在这种方式下选择纹理时， 它将在使用这个纹理的所有场景组件上显示。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f137d0a0-3803-410d-8448-eff0c0583358/requiredres_textureselection.png)

## 限制和已知问题

-   分析并不能支持所有材质。当前，贴花和地形材质不受支持。还有一些情况，引擎无法生成用于分析的着色器。 在此情况下，Primitive将呈现均匀的深灰色。通过控制台命令可以启用对所有问题的详细记录：`log TextureStreamingBuild level all`。
-   如果父代发生更改并重新保存，而子实例没有重新保存，则材质实例可能包含被弃用的数据。这是因为纹理流送数据存储在材质中， 修改父材质不会触发对子材质实例的重新保存。
-   在运行时，引擎使用纹理名称来访问材质流送数据。这是为了防止在运行时对资源进行硬引用，同时仍确保良好的性能。这意味着，如果 材质中使用了具有相同名称的多个纹理，则来自于双方数据的所需分辨率将应用于两个纹理。
-   材质纹理缩放视图模式中使用的着色器不是持久的，如果执行了某些类型的操作，如编译着色器或加载贴图，可能会缺失或删除。 再次选择这种视图模式将重新生成缺失的着色器。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [textures](https://dev.epicgames.com/community/search?query=textures)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [将流数据迁移到4.15](/documentation/zh-cn/unreal-engine/building-texture-streaming-data-in-unreal-engine#%E5%B0%86%E6%B5%81%E6%95%B0%E6%8D%AE%E8%BF%81%E7%A7%BB%E5%88%B0415)
-   [检测材质数据](/documentation/zh-cn/unreal-engine/building-texture-streaming-data-in-unreal-engine#%E6%A3%80%E6%B5%8B%E6%9D%90%E8%B4%A8%E6%95%B0%E6%8D%AE)
-   [场景选择](/documentation/zh-cn/unreal-engine/building-texture-streaming-data-in-unreal-engine#%E5%9C%BA%E6%99%AF%E9%80%89%E6%8B%A9)
-   [内容浏览器选择](/documentation/zh-cn/unreal-engine/building-texture-streaming-data-in-unreal-engine#%E5%86%85%E5%AE%B9%E6%B5%8F%E8%A7%88%E5%99%A8%E9%80%89%E6%8B%A9)
-   [所有纹理模式](/documentation/zh-cn/unreal-engine/building-texture-streaming-data-in-unreal-engine#%E6%89%80%E6%9C%89%E7%BA%B9%E7%90%86%E6%A8%A1%E5%BC%8F)
-   [构建准确性](/documentation/zh-cn/unreal-engine/building-texture-streaming-data-in-unreal-engine#%E6%9E%84%E5%BB%BA%E5%87%86%E7%A1%AE%E6%80%A7)
-   [Primitive距离准确度](/documentation/zh-cn/unreal-engine/building-texture-streaming-data-in-unreal-engine#primitive%E8%B7%9D%E7%A6%BB%E5%87%86%E7%A1%AE%E5%BA%A6)
-   [网格体UV密度准确性](/documentation/zh-cn/unreal-engine/building-texture-streaming-data-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93uv%E5%AF%86%E5%BA%A6%E5%87%86%E7%A1%AE%E6%80%A7)
-   [材质纹理缩放准确性](/documentation/zh-cn/unreal-engine/building-texture-streaming-data-in-unreal-engine#%E6%9D%90%E8%B4%A8%E7%BA%B9%E7%90%86%E7%BC%A9%E6%94%BE%E5%87%86%E7%A1%AE%E6%80%A7)
-   [所需纹理分辨率](/documentation/zh-cn/unreal-engine/building-texture-streaming-data-in-unreal-engine#%E6%89%80%E9%9C%80%E7%BA%B9%E7%90%86%E5%88%86%E8%BE%A8%E7%8E%87)
-   [限制和已知问题](/documentation/zh-cn/unreal-engine/building-texture-streaming-data-in-unreal-engine#%E9%99%90%E5%88%B6%E5%92%8C%E5%B7%B2%E7%9F%A5%E9%97%AE%E9%A2%98)
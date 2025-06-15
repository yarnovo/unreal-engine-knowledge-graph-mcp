# 虚幻引擎中的Lumen全局光照和反射 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:15:03.751Z

---

目录

![Lumen全局光照和反射](https://dev.epicgames.com/community/api/documentation/image/5de96506-878f-4f69-af28-cbe20a382001?resizing_type=fill&width=1920&height=335)

Lumen是虚幻引擎5的全动态全局光照和反射系统，专门针对下一代主机进行设计，是默认的全局光照和反射系统。Lumen能够在拥有大量细节的宏大场景中渲染间接漫反射，并确保无限次数的反弹以及间接高光度反射效果；无论是毫米级别的场景细节，还是数以千米的宏大场景，它都能应对得游刃有余。

![Lumen全局光照与反射示例场景](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/acbfe33d-4a01-4a9d-a092-31a1ecbdd592/lumen-scionti-04.png)

## Lumen入门

新创建的项目默认启用Lumen全局光照和反射，及其依赖功能，例如[生成网格体距离场](/documentation/zh-cn/unreal-engine/mesh-distance-fields-in-unreal-engine)。项目从虚幻引擎4升级到虚幻引擎5时， **不会** 自动启用Lumen功能。这能防止破坏或更改这些项目中的光照路线。

Lumen可以在项目设置下的 **渲染（Rendering） > 动态全局光照（Dynamic Global Illumination）** 和 **反射（Reflections）** 类别中启用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98791cf1-0335-4848-a015-d1c24ad577ac/projectsettings_gettingstarted.png)

全局光照和反射可以单独设置。在每个类别中，设置以下功能以启用Lumen：

-   动态全局光照 **Lumen**
-   反射方法： **Lumen**
    
    启用之后，将会启用 **生成网格体距离场（Generate Mesh Distance Fields）** 属性（如果尚未启用）。此属性是Lumen的[软件光线追踪](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E8%BD%AF%E4%BB%B6%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA)模式所必需的。需要重新启用引擎。
    

Lumen的全局光照取代了[屏幕空间全局光照(SSGI)](/documentation/zh-cn/unreal-engine/screen-space-global-illumination-in-unreal-engine)和[距离场环境光遮蔽(DFAO)](/documentation/zh-cn/unreal-engine/distance-field-ambient-occlusion-in-unreal-engine)。Lumen的反射取代了屏幕空间反射。

为项目启用Lumen之后，将会禁用预先计算的静态光照补充，并隐藏所有光照贴图。

## Lumen光照功能

Lumen为虚幻引擎带来了稳定的动态全局光照，并与虚幻引擎5中的其他支持系统充分集成，例如Nanite、世界分区和虚拟阴影贴图。

虚幻引擎4功能，例如[屏幕空间全局光照](/documentation/zh-cn/unreal-engine/screen-space-global-illumination-in-unreal-engine)和[光线追踪全局光照](/documentation/zh-cn/unreal-engine/hardware-ray-tracing-in-unreal-engine) (RTGI)，对于依赖实时提供充足数量的项目而言不太可靠或者性能不足。此外，这些功能未与其他重要系统完全集成，无法广泛支持引擎的大部分功能。

### Lumen全局光照

Lumen全局光照解决了间接漫反射光照问题。例如，在表面上散乱弹射的光线将使用表面的颜色，并将带有颜色的光线反射到其他附近的表面，从而造成颜色溢出效果。场景中的网格体还会拦截间接光照，这也会造成间接阴影。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f77c3d74-92d1-4e1d-8549-d54452f62422/lumentechdemo_2.png)

Lumen支持无限散乱弹射，这在具有明亮漫反射材质的场景中非常重要，例如下面的公寓白色绘画。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e26b4ec-0576-480f-9266-be285467ec79/lumengi_apartment.png)

虚幻引擎5的[Nanite虚拟化几何体](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)允许几何体具有比以往更多的细节。Lumen实现了全分辨率阴影，同时还可以用低得多的分辨率来计算间接光照，从而实现较高的实时性能。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2aa6e080-f6e6-4343-a6f5-13ffa7b6d980/lumentechdemo_3.png)

### 带有天空光照的Lumen

天空光照在Lumen的 **最终采集（Final Gather）** 过程中解决。此过程还解决天空阴影问题，让室内空间可以比室外光照环境暗得多，实现更加自然的效果。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b42e4c5e-8e18-47a2-b1e3-41b91987e763/lumentechdemo_1.png)

Lumen还为[光照半透明](/documentation/zh-cn/unreal-engine/using-transparency-in-unreal-engine-materials)和[体积雾](/documentation/zh-cn/unreal-engine/volumetric-fog-in-unreal-engine)提供更低质量的全局光照。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd3eaf89-4a47-4bcc-b48a-88490878e41c/shadowedfogvolume.png)

### Lumen和自发光材质

自发光材质通过Lumen的最终采集过程来传播光线，不会对性能造成任何影响。但是，小型而明亮的自发光区域将会受到限制，以避免出现噪点瑕疵。这种解决方式会受到内在限制，比手动放置光源困难得多。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c3bf14f-b6bf-4d91-b390-c8cc2b7d6cba/lumen_emissive.png)

### Lumen反射

Lumen为所有材质粗糙度数值解决了间接高光度或反射问题。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/422f9c40-5564-4985-9d9d-e4493eebe66f/lumenreflections.png)

所有反射中都可以看到全局光照漫反射和带阴影的天空光照。Lumen反射还支持透明涂层材质，例如下面示例中的汽车。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a2e5c63-f271-40f1-b709-6ba277ebdc6a/lumen_skylight.png)

Lumen为半透明材质提供有光泽的反射，例如下面示例中的汽车窗户。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/741d13e8-f71b-4fd4-8002-c370ace8cfd0/lumen-glossy-reflections.jpg)

当项目启用了 **高质量半透明反射（High Quality Translucency Reflections）** 时，Lumen反射会在半透明表面材质的最上层提供镜面反射。

![启用了高质量半透明反射的项目中的镜面反射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76c75b79-bcb7-4fdc-ada3-498ce9f2acf2/lumen-hq-reflections.png)

Lumen反射支持 **单层水体（Single Layer Water）** 材质，该材质会将反射强制设置为镜面反射。

![使用了单层水体和Lumen反射的水体材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a13bfd23-d636-44b2-9eb9-b62bbb97331b/lumen-slw-reflections.png)

### Lumen双面植被

**双面植被（Two-Sided Foliage）** 着色模型的解算方式是，采集来自叶片背面的光线，将其通过叶片散射，并根据材质的 **次表面颜色（Subsurface Color）** 而衰减。

![对比示例：由Lumen照亮的双面植被](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/614f4cd6-5175-4bcf-a7eb-b74471b54375/lumen-foliage-1.png) ![示例场景：由Lumen照亮的树冠](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3e28a10-1ff3-4f37-abae-46b6fc794b17/lumen-foliage-2.png)

### 支持的光源类型和其他功能

在更高的层级上，Lumen支持以下功能：

-   支持所有[光源类型](/documentation/zh-cn/unreal-engine/light-types-and-their-mobility-in-unreal-engine)，其中包括方向、天空、点、斑和矩形光源。
-   只有定向光源支持[光源函数](/documentation/zh-cn/unreal-engine/using-light-functions-in-unreal-engine)。
-   不支持将[移动性](/documentation/zh-cn/unreal-engine/light-types-and-their-mobility-in-unreal-engine)设置为 **静态（Static）** 的光源，因为静态光源完全存储在光照贴图中，其作用在启用Lumen之后被禁用。

## Lumen设置

可以在两个地方找到Lumen的设置： **项目设置（Project Settings）** 和 **后期处理体积（Post Process Volumes）** 。

### Lumen项目设置

适用于或能够影响Lumen的所有项目设置都可以在 **引擎（Engine）> 渲染（Rendering）** 部分中找到。项目设置中包含Lumen可以用于项目的所有默认设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f4767e8-65aa-4041-bd15-57f6fab94eb2/projectsettings_lumen.png)

以下是Lumen需要或能够影响Lumen的所有设置的列表。

属性名称

说明

全局光照

 

**动态全局光照方法（Dynamic Global Illumination Method）**

选择要在项目中使用的动态全局光照的类型。

反射

 

**反射方法（Reflection Method）**

选择要在项目中使用的动态反射的类型。

Lumen

 

**在可用时使用硬件光线追踪（Use Hardware Ray Tracing when available）**

当视频卡、RHI和操作系统支持时，使用适用于Lumen的硬件光线追踪功能。否则，Lumen将重新使用软件光线追踪。对于具有超过100,000个实例的场景，硬件光线追踪将产生显著的场景更新成本。如需了解信息，请参阅[光线追踪性能指南](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine)。

**光线照射模式（Ray Lighting Mode）**

当Lumen使用硬件光线追踪时，控制Lumen反射光线如何发光。默认情况下，Lumen使用 **表面缓存（Surface Cache）** 来获得最佳性能，但如果要获得更高的质量，可以设置为 **反射的击中照射（Hit Lighting for Reflections）**。

**高品质半透明反射（High Quality Translucency Reflections）**

确定是否在半透明表面最靠前的层上使用高品质的镜面反射。其他层将使用较低质量的辐射缓存（Radiance Cache）方法。该方法只能产生有光泽的反射。在后期处理体积（Post Process Volume）设置中启用它会增加GPU开销。

**软件光线追踪模式（Software Ray Tracing Mode）**

当对场景进行光线追踪时，控制Lumen使用哪种追踪方法。**细节追踪（Detail Tracing）** 追踪单个网格体的距离场，以获得最高质量。**全局追踪（Global Tracing）** 追踪不太精细的全局距离场，以获得最快的追踪速度。

硬件光线追踪

 

**支持硬件光线追踪（Support Hardware Ray Tracing）**

从支持该功能的操作系统、RHI和视频卡启用光线追踪，以获得更高的质量效果。

软件光线追踪

 

**生成网格体距离场（Generate Mesh Distance Fields）**

是否构建静态网格体的距离场。对于Lumen的软件光线追踪，以及在定向光源上实施可移动天空光照阴影和光线追踪距离场阴影的距离场环境光遮蔽，此功能是必需的。启用此功能将会增加静态网格体的构建时间、内存使用和磁盘大小。

**距离场体素密度（Distance Field Voxel Density）**

确定网格体的默认刻度如何转换成距离场体素密度维度。更改此值将导致重新构建所有距离场。值越大，占用内存的速度越快。

### 后期处理设置

后期处理体积包含Lumen的重载和由美术师控制的属性。这些设置可以在 **全局光照（Global Illumination）** 和 **反射（Reflections）** 类别中找到。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a29fa628-f3a6-4852-b7e2-f41933a4865d/postprocessvolumeoverrides.png)

以下是可以在后期处理体积中找到的Lumen的所有设置：

属性名称

说明

全局光照：Lumen全局光照

 

**Lumen场景光照质量（Lumen Scene Lighting Quality）**

刻度越大，计算Lumen场景所使用的保真度越高，这种变化可以在反射中看到，但产生的GPU成本也越高。

**Lumen场景细节（Lumen Scene Detail）**

控制Lumen场景中可以呈现的实例大小。值越大，越能确保呈现效小的对象，但会增加GPU成本。

**Lumen场景视野距离（Lumen Scene View Distance）**

设置Lumen为光线追踪所保持的场景最大视野距离。值越大，天空阴影和全局光照的有效范围越大，但GPU成本也更高。

**最终采集质量（Final Gather Quality）**

提高Lumen全局光照的质量，减少所渲染的噪点，但会增加渲染时的GPU成本。

**屏幕追踪（Screen Traces）**

是否将屏幕空间追踪用于Lumen全局光照。屏幕空间追踪会绕过Lumen场景，改为对场景深度和颜色取样。这会提高质量，但同时会防止仅限Lumen场景的更改，例如添加仅在全局光照中可见的自发光物体。

**最大跟踪距离（Max Trace Distance）**

在解决光照时，控制Lumen应该跟踪的最大距离。值太小将会导致光照泄漏到较大的范围，例如洞穴。较大的值将会增加渲染场景时的GPU成本。

**场景捕获缓存分辨率（Scene Capture Cache Resolution）**

Lumen表面缓存分辨率的比例因子。使用较小的值可节省GPU内存，但质量会更低。如果未重载，默认为0.5。这应该在场景捕获组件上的后期处理设置中进行设置。

全局光照：Lumen全局光照：高级属性

 

**Lumen场景光照更新速度（Lumen Scene Lighting Update Speed）**

控制Lumen场景可以缓存多少光照结果，以提高性能。刻度越大，光照变化的传播速度越快，但会增加GPU成本。

**最终采集光照更新速度（Final Gather Lighting Update Speed）**

控制Lumen最终采集可以缓存多少光照结果，以提高性能。刻度越大，光照变化的传播速度越快，但会增加GPU成本。

**漫反射颜色增强（Diffuse Color Boost）**

允许通过将材质漫反射颜色计算为pow(DiffuseColor，1/DiffuseColorBoost)，使间接光照变明亮。高于1的值（原始漫反射颜色）在物理上是不正确的，但它们适合用于美术调节，增加场景中的反射光照量。最好将值保持在2以下，否则还会导致反射比场景更明亮。

**天空光照泄露（Skylight Leaking）**

控制应该允许天空光照强度以多大比例泄露。这适合用于美术调节（非基于物理），防止室内区域变为全黑。

**完全天空光照泄露距离（Full Skylight Leaking Distance）**

控制与接收表面相距多远时天空光照泄露达到完全强度。使用较小的值时，天空光照泄露更扁平，而使用较大的值时，会带来环境光遮蔽效果。

反射：Lumen反射

 

**质量（ Quality）**

提高表面的Lumen反射的质量，减少所渲染的噪点，但会增加渲染时的GPU成本。

**光线光照模式（Ray Lighting Mode）**

在使用[Lumen的硬件光线追踪](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E7%A1%AC%E4%BB%B6%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA)时，此设置控制反射是重新使用表面缓存来实现更便宜的光照，还是计算击中点上的光照来实现更高的质量。

**屏幕追踪（Screen Traces）**

是否将屏幕空间追踪用于Lumen全局光照。屏幕空间追踪会绕过Lumen场景，改为对场景深度和颜色取样。这会提高质量，但同时会防止仅限Lumen场景的更改，例如添加仅在全局光照中可见的自发光物体。

**高质量半透明反射（High Quality Translucency Reflections）**

是否在半透明表面的前面一层上使用高质量镜面反射。其他层将使用只能生成光滑反射的较低质量的辐射缓存方法。这在启用后会增加GPU成本。需要首先启用项目设置 **高质量半透明反射（High Quality Translucency Reflections）** 。

**要追踪的最大粗糙度（Max Roughness To Trace）**

设置Lumen将为其追踪专用反射光线的最大粗糙度值。值越大，反射质量越高，但会大幅增加GPU成本。

**最大反射弹射次数（Max Reflection Bounces）**

设置递归反射弹射的最大次数。默认值为1，表示在类似镜面的表面中只弹射一次，没有次生弹射的反射光线。当有足够的性能预算时，2次或更多弹射可以防止反射中出现黑色区域。此后期处理设置可以最高为8次弹射。你可以使用 `r.Lumen.Reflections.MaxBounces` 重载后期处理设置，允许最高64次反射弹射。需要在项目设置中启用[带有反射的击中照射的硬件光线追踪](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#lumen%E5%85%A5%E9%97%A8)。

**最大折射弹射次数（Max Refraction Bounces）**

要追踪的折射事件的最大数量。若使用击中照射，在Lumen最大折射弹射次数大于0时，会追踪半透明网格体，使反射追踪的成本更高昂。

## 附加说明

以下是在项目中使用Lumen功能时需要注意的一些额外事项。

### Lumen光照更新速度

Lumen使用大量缓存来实现实时性能。局部照射的变化可以快速传播，但全局照射变化（例如禁用太阳）可能需要几秒钟才能完成传播。项目可以使用 **Lumen场景光照更新速度（Lumen Scene Lighting Update Speed）** 和 **最终采集光照更新速度（Final Gather Lighting Update Speed）** [后期处理体积中的控制点](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E8%AE%BE%E7%BD%AE)来绕过这种延迟，但需要更高的GPU成本。

### 为项目禁用静态光照

启用Lumen之后，将会从静态光照中移除预先计算的光照。可以为项目完全禁用预先计算的光照，方法是在项目设置中的 **引擎（Engine）> 渲染（Rendering）** 部分下禁用 **允许静态光照（Allow Static Lighting）**。

禁用静态光照还可以在着色器排列方面节约一些静态光照开支。它还允许[材质环境光遮蔽](/documentation/zh-cn/unreal-engine/material-inputs-in-unreal-engine#%E7%8E%AF%E5%A2%83%E5%85%89%E9%81%AE%E8%94%BD)使用Lumen全局光照。

已经使用了静态光照的项目将会把自身的光照贴图加载到内存和磁盘中，直到在已经加载的关卡的 **世界设置（World Settings）** 中启用 **强制无预计算光照（Force No Precomputed Lighting）** 。然后，需要重新构建光照和保存关卡，以移除光照贴图数据。

### 将Lumen反射用于烘焙的静态光照

Lumen反射可以在没有Lumen全局光照的情况下使用。如果游戏和项目使用静态光照，但希望将反射质量提升到超出放置的反射捕获的能力之外，该方法最有利。独立Lumen反射需要启用[Lumen硬件光线追踪模式](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#lumen%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA)，这会自动为反射启用击中照射。

### 透明涂层材质

Lumen支持透明涂层材质（带双法线），但有一些局限。即：

-   只有顶层才能使用很低的粗糙度值。底层假定有粗糙度的值，因此产生了光泽的效果。此限制存在的原因是，单条反射光线按像素投射，使得顶层和底层无法投射清晰的反射。
-   透明涂层数量达到0时，以上限制仍适用。这意味着，尽管有单个（底）层，即使在粗糙度值很低的情况下，反射仍然看起来光滑/粗糙。

### 材质环境光遮蔽

Lumen全局光照支持[材质环境光遮蔽](/documentation/zh-cn/unreal-engine/material-inputs-in-unreal-engine#%E7%8E%AF%E5%A2%83%E5%85%89%E9%81%AE%E8%94%BD)，这样可以在骨骼网格体上提供可靠的自遮挡。

要在Lumen中使用材质环境光遮蔽，请进行以下设置：

-   在项目设置中禁用 **允许静态光照（Allow Static Lighting）** 。这会在GBuffer中腾出空间。
-   将材质设置为输出到 **环境光遮蔽（Ambient Occlusion）** 。

![Lumen材质环境光遮蔽](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4f017e5-989b-4865-b60b-72c8a52e52d0/lumen-ambient-occlusion.png)

左侧：骨骼网格体上启用了Lumen全局光照，并且仅启用了屏幕追踪（软件光追）；右侧：材质环境遮蔽。

使用缓冲区可视化 **环境光遮蔽（Ambient Occlusion）** 视图模式时，材质环境光遮蔽不可见。

Lumen全局光照支持材质的[环境法线贴图](/documentation/zh-cn/unreal-engine/bent-normal-maps-in-unreal-engine)。但是，相对于材质环境遮蔽，这两种方法所导致的渲染成本高得多，但视觉提升非常有限。

要在Lumen中使用环境法线贴图，请进行以下设置：

-   在 `DefaultEngine.ini` 配置文件的 `[SystemSettings]` 部分中，就设置 `r.GBufferDiffuseSampleOcclusion=1` 。
-   将材质设置为输出至 **BentNormal** 自定义输出节点。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [global illumination](https://dev.epicgames.com/community/search?query=global%20illumination)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Lumen入门](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#lumen%E5%85%A5%E9%97%A8)
-   [Lumen光照功能](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#lumen%E5%85%89%E7%85%A7%E5%8A%9F%E8%83%BD)
-   [Lumen全局光照](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#lumen%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7)
-   [带有天空光照的Lumen](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#%E5%B8%A6%E6%9C%89%E5%A4%A9%E7%A9%BA%E5%85%89%E7%85%A7%E7%9A%84lumen)
-   [Lumen和自发光材质](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#lumen%E5%92%8C%E8%87%AA%E5%8F%91%E5%85%89%E6%9D%90%E8%B4%A8)
-   [Lumen反射](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#lumen%E5%8F%8D%E5%B0%84)
-   [Lumen双面植被](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#lumen%E5%8F%8C%E9%9D%A2%E6%A4%8D%E8%A2%AB)
-   [支持的光源类型和其他功能](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84%E5%85%89%E6%BA%90%E7%B1%BB%E5%9E%8B%E5%92%8C%E5%85%B6%E4%BB%96%E5%8A%9F%E8%83%BD)
-   [Lumen设置](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#lumen%E8%AE%BE%E7%BD%AE)
-   [Lumen项目设置](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#lumen%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [后期处理设置](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E8%AE%BE%E7%BD%AE)
-   [附加说明](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#%E9%99%84%E5%8A%A0%E8%AF%B4%E6%98%8E)
-   [Lumen光照更新速度](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#lumen%E5%85%89%E7%85%A7%E6%9B%B4%E6%96%B0%E9%80%9F%E5%BA%A6)
-   [为项目禁用静态光照](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#%E4%B8%BA%E9%A1%B9%E7%9B%AE%E7%A6%81%E7%94%A8%E9%9D%99%E6%80%81%E5%85%89%E7%85%A7)
-   [将Lumen反射用于烘焙的静态光照](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#%E5%B0%86lumen%E5%8F%8D%E5%B0%84%E7%94%A8%E4%BA%8E%E7%83%98%E7%84%99%E7%9A%84%E9%9D%99%E6%80%81%E5%85%89%E7%85%A7)
-   [透明涂层材质](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#%E9%80%8F%E6%98%8E%E6%B6%82%E5%B1%82%E6%9D%90%E8%B4%A8)
-   [材质环境光遮蔽](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine#%E6%9D%90%E8%B4%A8%E7%8E%AF%E5%A2%83%E5%85%89%E9%81%AE%E8%94%BD)
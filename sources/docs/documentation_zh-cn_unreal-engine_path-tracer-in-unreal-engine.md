# 虚幻引擎中的路径追踪器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:16:30.571Z

---

目录

![路径追踪器](https://dev.epicgames.com/community/api/documentation/image/0ed859f0-4630-43fe-a871-f8cdd1aae37f?resizing_type=fill&width=1920&height=335)

路径追踪器是一种渐进式硬件加速渲染模式，可通过材质在物理上正确且无损的全局光照、反射和折射等来弥补实时特性的不足。它拥有虚幻引擎中的内置光线追踪架构，几乎不需要额外的设置，即可实现干净而逼真的渲染。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ae1d5be-79fb-470a-b6e9-585fe18230ff/ls_cinecameraactor13_508_0000_ultra.png)

ARCHVYZ的"虚幻引擎虚拟之旅"。 设计：Toledano Architects。

路径追踪器采用与其他光线追踪功能相同的光线追踪架构，例如[实时光线追踪](/documentation/zh-cn/unreal-engine/hardware-ray-tracing-in-unreal-engine)和[GPU Lightmass](/documentation/zh-cn/unreal-engine/gpu-lightmass-global-illumination-in-unreal-engine)，是用作[基准对照物](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine)和产品渲染的理想之选。路径追踪器仅使用场景中存在的几何体和材质来渲染无偏差的结果，不使用为实时渲染而开发的相同光线追踪代码。

## 路径追踪器的好处

与其他渲染模式相比，路径追踪器具有以下优势：

-   能够生成高质量逼真渲染，并且结果在物理上准确。
-   获得与其他离线渲染器相当的结果，几乎不需要额外的设置。
-   缩小类似实时特性的特性差距。例如，反射和折射中看到的材质可以不受限制地渲染，如存在全局光照和路径追踪阴影。
-   与Sequencer和影片渲染队列完全集成，以便支持影视质量级别的渲染输出。

## 路径追踪的示例

以下场景是使用路径追踪器实现的高质量渲染示例。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b1b3555-ed7e-4f62-8370-38a5b32f91dc/ls_cinecameraactor20_612_0000_ultra.png)

ARCHVYZ的"虚幻引擎虚拟之旅"。 设计：Toledano Architects。

## 在你的项目中启用路径追踪器

路径追踪器需要为项目启用[硬件光线追踪](/documentation/zh-cn/unreal-engine/hardware-ray-tracing-in-unreal-engine)。必须满足以下系统要求，并且必须启用这些设置。

系统要求：

-   操作系统： **Windows 10 1809或更高版本**
-   GPU： **支持NVIDIA RTX和DXR驱动程序的GTX系列显卡**

项目设置：

![路径追踪器项目设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9747b63-e6bb-4f15-8b7b-5f2442873554/projectsettings.png)

-   平台（Platforms ）> Windows > 目标RHI（Targeted RHIs）> 默认RHI（Default RHI）：**DirectX 12**
-   引擎（Engine）> 渲染（Rendering）> 硬件光线追踪（Hardware Ray Tracing）：启用 **路径追踪（Path Tracing）**
-   引擎（Engine）> 渲染（Rendering）> 硬件光线追踪（Hardware Ray Tracing）：启用 **支持硬件光线追踪（Support Hardware Ray Tracing）**
-   引擎（Engine）> 渲染（Rendering）> 硬件光线追踪（Hardware Ray Tracing）：启用 **路径追踪（Path Tracing）**
    
    虚幻引擎5引入了相应设置，用于为材质控制特定于路径追踪器的着色器排列的创建。根本不打算使用路径追踪器的项目可以禁用此设置，缩短着色器编译时间。
    
-   引擎（Engine）> 渲染（Rendering）> 优化（Optimizations）：启用 **支持计算皮肤缓存（Support Compute Skin Cache）**

为项目启用支持硬件光线追踪时，如果 **支持计算皮肤缓存（Support Compute Skin Cache）** 尚未启用，会有弹出窗口要求你将其启用。要支持硬件光线追踪和路径追踪功能，这是必要操作。

重启引擎，使更改生效。

## 在关卡编辑器中使用路径追踪器

使用 **视图模式（View Modes）** 下拉菜单选择 **路径追踪（Path Tracing）** ，在关卡视口（Level Viewport）中启用路径追踪器（Path Tracer）视图。

![路径追踪的关卡视口视图模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d88a27a-cd00-41b7-bc44-738a5b7a3339/enable_pathtracer.png)

启用后，渲染器在摄像机不移动的情况下连续添加示例，从而逐步累加当前视图中的示例。当达到目标示例数时，将对该帧去噪（如果在后期处理设置（Post Process Setting）中启用了去噪），以去除渲染中存在的剩余噪点。

在大多数情况下，当场景发生变化时，示例将失效，该过程重新开始。移动摄像机、更改视图、更新或更改对象上的材质以及将对象移动或添加到场景中，都会导致场景的示例无效。

路径追踪器可以交互使用，并且会随着示例的累加迅速开始显示着色的像素。渲染所需的时间在很大程度上取决于场景的复杂性和取样材质。室外场景往往渲染得更快，因为光线能够以更少和更快的反射逃逸。室内场景，尤其是那些反射率接近1.0的材质，会导致光线路径更长，从而渲染时间更长。

## 将路径追踪器用于影片渲染队列

本小节将详细介绍如何使用影片渲染队列生成路径追踪渲染输出。有关一般用法和工作流程信息，请先参阅[影片渲染队列](/documentation/404)，然后再继续。

在生成高质量渲染输出时， **影片渲染队列** （MRQ）对生产管线很有用。当与路径追踪器结合使用时，它的渲染效果比其他方式好很多。

**路径追踪器** 模块使路径追踪器能够用于输出渲染帧，并提供一些其渲染路径的专用设置。

![影片渲染队列路径追踪器模块设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ad45260-8635-473f-bb73-d2827c3b1910/mrq_pathtracermodule.png)

放置在关卡中的 **后期处理体积（Post Process Volumes）** 还将控制特定的路径追踪功能，例如最大光线反射次数、对自发光材质的支持和曝光。

MRQ还包含其他设置模块，这些模块提供额外的功能按钮和选项，可以实现更高质量的渲染。

-   \[高分辨率\]animating-characters-and-objects/Sequencer/movie-render-pipeline/RenderSettings/Reference#高分辨率)模块提供了将帧作为单独图块渲染的设置，这些图块可以组合起来，渲染出比其他方式更高的单帧分辨率。单个图块可以使用显卡支持的最大分辨率（例如，对于RTX 3080显卡，分辨率为7680x4320）。
-   [抗锯齿](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E6%8A%97%E9%94%AF%E9%BD%BF)模块提供了专用设置来调整逐像素示例数，并且可以获得更好的动态模糊质量。该模块提供了关卡加载和视觉效果准确渲染场景所需的预热时间。
    -   **时间示例计数（Temporal Sample Count）** 将及时在稍微偏移的实例处内插多个渲染帧，从而提高动态模糊质量。这种示例累加发生在去噪之后，有助于稳定来自各个空间通道的残余瑕疵。但是，如果启用 **参考动态模糊（Reference Motion Blur）** ，将在降噪之前获取所有时间示例。在这种情况下，我们推荐将空间示例数保留为1，并推动所有取样经过时间示例，最大限度提高动态模糊质量。
    -   **空间示例数（Spatial Sample Count）** 可以设置每个时间示例要使用的逐像素示例数。增加逐像素示例可减少每个渲染通道中存在的噪点，同时增加渲染每帧所需的时间。使用MRQ时，将忽略逐像素后期处理体积示例数设置。
    -   逐像素采集的示例总数是空间和时间示例计数的乘积。在某些情况下，将示例在空间和时间上扩散可以产生更好的效果。例如，如果你想逐像素使用16个示例，可以将4个示例应用于空间，4个应用于时间，或将16个应用于空间，1个应用于时间，或将1个应用于空间，16个应用于时间。至于哪种方式最好，这主要取决于所需的动态模糊质量。对于定格画面，我们推荐使用所有空间示例（1个时间示例），而对于动画，我们推荐使用1个空间示例和许多时间示例并开启参考动态模糊。
        
-   [控制台变量](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F)模块使你能够添加与渲染帧相关的控制台变量。这包括覆盖质量，或切换与路径追踪器相关的某些设置。
-   [输出](/documentation/404)模块提供了设置供你配置输出目录、文件名、图像分辨率和你要渲染的开始帧/结束帧。

### 路径追踪器后期处理体积设置

关卡中放置的后期处理体积为路径追踪器提供了可配置属性。其中包括最大光线反射次数、逐像素示例、抗锯齿质量（或过滤器宽度）等设置。

路径追踪器的设置可以在 **PathTracing** 类别下的后期处理体积细节（Post Process Volume Details）面板中找到。

![路径追踪器后期处理体积设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d8558c6-0f3b-4261-9eca-eb78b9116e89/postprocessvolume_pathtracersettings.png)

属性

说明

**最大反弹次数（Max. Bounces）**

设置光线在被终止之前应该前进的最大可能反弹次数。

**每个像素的取样数（Samples Per Pixel）**

为收敛设置每个像素要使用的取样数。更高的取样数量会减少所渲染图像的噪点。

**最大路径曝光（Max Path Exposure）**

设置路径追踪允许的最大曝光，以便减少[萤火虫瑕疵（firefly artifacts）](https://en.wikipedia.org/wiki/Fireflies_computer_graphics)的发生情况。将曝光调整为比场景曝光更高的值有助于缓解这些瑕疵。（请参阅此页面的[其他信息](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%85%B6%E4%BB%96%E4%BF%A1%E6%81%AF)小节，了解此类型伪影的更多细节以及示例）。

**参考景深（Reference Depth of Field）**

启用参考质量景深，以取代后期处理效果。此模式可以正确处理半透明表面、体积和毛发几何体。

**参考大气（Reference Atmosphere）**

在大气中启用路径追踪，而不是将天空大气贡献烘焙到天空光照中。启用此设置后，将自动忽略场景中存在的天空光照组件。请参阅本页面的[参考大气](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%8F%82%E8%80%83%E5%A4%A7%E6%B0%94)小节。

**降噪器（Denoiser）**

此开关使用上一次取样中目前加载的降噪器插件来从渲染的输出中删除噪点。默认使用NNE降噪器。如果未启用降噪器插件，此开关对渲染的输出不起作用。

**光照组件（Lighting Components）**

此分段包含许多复选框，可用于限制特定光源路径的计算，允许选择性输出图像。这可以用于将图像分解为多个通道，这些通道保证稍后会拼装回来，实现美观的效果。间接自发光稍有特殊，因为它控制自发光材质的反射光照。你可能需要关闭此属性，以防止对同时由实际光源表示的表面光照重复计数，并减少来自小型发射器的噪点。例如，让自发光材质表示一个小灯泡，同时使用点光源或聚光光源来照亮该区域，在这种情况下就会重复计数。

### 使用MRQ渲染光照组件

路径追踪器可以使用影片渲染队列通过可调用的蓝图事件输出单独的光照组件渲染（例如漫反射和高光度）。

为此，你需要创建包含 **后期处理体积（Post Process Volume）** 的 **Actor蓝图（Actor Blueprint）** 。将体积设置为 **无限范围（未限制）（Infinite Extent (Unbound)）** 并为其提供高 **优先级（Priority）** ，以确保在选择时它总是优先于场景中的其他所有后期处理体积。

![后期处理体积设置 - 优先级和未限制](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eecfdc27-e798-4973-bb20-d9dff743de2a/ppv-priority-unbound.png)

此后期处理体积的用途是通过蓝图中的自定义事件设置所需光照组件配置。这些自定义事件可以使用 **开始控制台命令轨道（Start Console Command Track）** 并使用语法 `Ke * [自定义事件名称]` 调用每个事件，通过影片管道配置文件来执行。

在下面的示例中，名为 **RenderSpecular** 的自定义事件通过控制台命令 `Ke * RenderSpecular` 由影片管道配置调用。

![MRQ光照通道设置 - 开始控制台命令](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/666cc048-c95c-476a-81c9-bc7b03f81773/mrq-startconsolecommand.png)

利用此过程，可以更轻松地设置唯一的光照组件配置，具体取决于项目的需要。

要运行多个光照组件渲染，镜头必须在MRQ中多次受到调用，即为每个所需的通道配置调用一次。队列中的每个项目需要引用不同的影片管道配置，其中每个配置调用不同的自定义事件来设置光照组件（如以下示例所示）。

此设置需要渲染运行多次，但请记住，路径追踪器确实有早期输出，所以在渲染多个光照组件配置时，渲染时间并不存在直接的线性比例。

![MRQ光照组件渲染](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7105dfb2-85fa-46d1-bd1d-8499d3427149/mrq-lightcomprenders.png)

在你创建的蓝图中，你需要设置以下事件：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98d99569-68b3-4901-b55a-ab95cb5147e3/raycompsplit.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98d99569-68b3-4901-b55a-ab95cb5147e3/raycompsplit.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2b0be67-d40e-4661-af01-059ef2d5e998/raypathsplit.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2b0be67-d40e-4661-af01-059ef2d5e998/raypathsplit.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06bf1288-f05a-469e-8bf9-3254bd1f656e/pathcompsplit.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06bf1288-f05a-469e-8bf9-3254bd1f656e/pathcompsplit.png)

光线组件拆分

光线路径拆分

路径配置拆分

点击查看大图。

点击查看大图。

点击查看大图。

## 路径追踪器的局限性

以下是虚幻引擎中路径追踪当前存在的一些局限性。

-   **明亮的材质会使室内渲染速度放慢**
    -   反射率值接近1.0的材质（例如亮白色）会导致帧的渲染用时超过要求，因为路径追踪器需要模拟具有多次反射的光源路径。室内场景尤其容易受到这种影响，因为光线在终止之前，可能需要更长的时间才能逃离环境。路径追踪器采用俄罗斯轮盘技术来更快地终止不太可能为场景做贡献的光线。光线在场景中连续反射的情况不太可能出现，因为光线会在可能的情况下被俄罗斯轮盘技术终止。当材质的反射率值接近1.0时，光线路径不太可能终止，并且会导致帧的渲染时间更长。
    -   在现实世界中，很少有能够反射所有入射光的材质，而且这类材质的表面往往会褪色。因此，建议你将所有漫反射材质的基础颜色保持在0.8以下。
-   **动态场景元素**
    -   路径追踪器的工作原理是让渲染器随时间累加示例。这很适合静态场景，而对于包含移动光源、动画蒙皮网格体和视觉效果等元素的动态场景来说则不然。这些类型的元素不会使编辑器中的路径追踪无效，并且会在帧中显示为模糊或纹路瑕疵。这仅在编辑器中运行时出现，并且可以通过使用影片渲染队列渲染最终元素来补救。以不同于视口的分辨率捕获高分辨率屏幕截图，这是解决此问题的另一种方法，因为它会取所有示例，而且不会向前更新时间。
-   **Path Tracing Material Quality Switch节点**
    -   使用 **PathTracingQualitySwitch** 节点降低材质的复杂度，从而优化材质的路径追踪功能，这可降低标准材质中使用的复杂度或变通方案。由于运行时不是问题，因此不需要对材质折中。使用这些节点有助于提供无折中的结果，而不复制材质。
-   **Ray Tracing Material Quality Switch节点**
    -   使用 **Ray Tracing Quality Switch** 节点降低复杂性，从而为了各种光线追踪特性而优化材质，这有助于降低运行时成本。这样一来，虚幻引擎的光线追踪功能就可以使用相较于延迟渲染器更简单的材质。由于路径追踪器旨在用于高质量输出，因此，即使是基于光线追踪，它也会使用这些Switch节点的 **法线（Normal）** 端口。要专门为路径追踪器控制材质的行为，请改用 **PathTracingQualitySwitch** 节点。
-   **HDRIBackdrop不兼容路径追踪器**
    
    -   HDRIBackdrop组件的当前实现方案会在路径追踪器中导致光照重复计数，并禁用HDRI光照的重要性取样。推荐使用带有指定纹理的天空光照，并设置路径追踪器控制台变量 `r.PathTracing.VisibleLights 2` ，以使背景显示。
    
    这不会提供捕获阴影的地平面。
    

## 支持的路径追踪器功能

路径追踪器的局限性在于，当前实现存在限制或有些功能未计划支持。此功能列表旨在让你了解当前版本目前支持的功能。这并非引擎所有支持功能/属性的完整列表。

路径追踪器使用了与虚幻引擎的[实时光线追踪](/documentation/zh-cn/unreal-engine/hardware-ray-tracing-in-unreal-engine)功能相同的代码。通常，如果实时光线追踪支持某个功能，那么路径追踪器应该也是支持的。

功能名称

是否支持？

额外讲解

几何体类型

 

 

**Nanite**

是

默认情况下，回退网格体用于启用了Nanite的网格体。降低静态网格体编辑器（Static Mesh Editor）中的 **回退相对误差（Fallback Relative Error）** 参数，以多使用源网格体的三角形。（试验性）设置控制台变量 `r.RayTracing.Nanite.Mode 1` 时，启用了对Nanite网格体的原生路径追踪的初始支持。这样可以保留所有细节，而所用GPU内存比零误差回退网格体少得多。

**蒙皮网格体（Skinned Meshes）**

是

动画不会使路径追踪器失效，可能会导致视口中出现模糊或纹路。影片渲染队列应该用于输出最终图像。

**世界位置偏移驱动型动画（World Position Offset-driven Animation）**

是

应该在单个场景Actor上启用 **世界位置偏移求值（Evaluate World Position Offset）** 。它们不会使路径追踪器失效，可能会导致视口中出现模糊或纹路。影片渲染队列应该用于输出最终图像。

**发束（Hair Strands）**

是

发束支持仍被视为试验性，因为它可能需要许多资源来构建高效的加速结构。控制台变量 `r.HairStrands.RaytracingProceduralSplits` 可用于平衡渲染性能和加速结构构建性能（内存使用量）。使用默认值4时，会强调渲染性能，但大量Groom可能导致不稳定。如果你遇到GPU超时，尝试降低该值，或减少Groom中的毛发片段数量。

**地形（Landscape）**

是

 

**样条线网格体（Spline Meshes）**

是

 

**实例化静态网格体（Instanced Static Mesh）**

是

 

**层级实例化静态网格体（Hierarchical Instanced Static Mesh）**

是

 

**水几何体（Water Geometry）**

是

这必须通过控制台变量 `r.RayTracing.Geometry.Water 1` 启用。

视觉效果

 

 

**Niagara粒子系统（Niagara Particle Systems）**

是

粒子系统不会使路径追踪器失效，会导致视口中出现模糊/纹路。影片渲染队列应该用于输出最终图像。

光源类型

 

 

**定向光源（Directional Light）**

是

 

**天空光照（Sky Light）**

是

-   当前，天空光照捕获仅在启用 **实时捕获（Real Time Capture）** 时可见。
    -   尚不支持天空大气和体积云。
    -   要提高渲染质量，请将天空光照捕获的分辨率提高到高于用于实时捕获的分辨率。
-   当不使用实时捕获（Real Time Capture）模式时，天空盒/球体应该会呈现天空。它的材质必须在材质设置中启用 **是天空（Is Sky）** 标记，否则其光照将针对天空光照重复计算，并且可能会产生噪点，因为它不会进行重要性采样。
-   天空盒/球体形状也应该 **不** 投射阴影，因为它们可以遮挡来自天空光照和定向光源的贡献。

**点光源（Point Light）**

是

 

**聚光光源（Spot Light）**

是

 

**矩形光源（Rect Light）**

是

 

光照特性/属性

 

 

**自发光材质（Emissive Materials）**

是

自发光小部件会给渲染后的场景带来大量噪点。如果自发光部件有与之关联的光源，它们也可能导致光照重复计数。使用后期处理体积（Post Process Volume）设置中的 **自发光材质（Emissive Materials）** 复选框禁用它们，或使用控制台变量 `r.PathTracing.EnableEmissive 0` 。

**天空大气（Sky Atmosphere）**

是

场景中需要在组件上启用了 **实时捕获（Real Time Capture）** 的天空光照。或者，启用后期处理体积设置 **参考大气（Reference Atmosphere）** ，它会对大气进行路径追踪，而不是将天空大气贡献烘焙到天空光照中。启用此设置后，将自动忽略场景中存在的天空光照。请参阅本页面的[雾和大气](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E9%9B%BE%E5%92%8C%E5%A4%A7%E6%B0%94%E4%BD%93%E7%A7%AF)小节。

**体积云（Volumetric Clouds）**

部分

场景中需要启用了 **实时捕获（Real Time Capture）** 的天空光照。启用后期处理体积设置 **参考大气（Reference Atmosphere）** 后，此组件目前会被忽略。

**指数高度雾（Exponential Height Fog）**

是

需要启用 **体积雾（Volumetric Fog）** 设置。并非所有功能按钮都支持，因为一些功能按钮具有非物理含义。请参阅本页面的[雾和大气](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E9%9B%BE%E5%92%8C%E5%A4%A7%E6%B0%94%E4%BD%93%E7%A7%AF)小节。

**体积雾（Volumetric Fog）**

是

必须在指数高度雾组件上启用。请参阅本页面的[雾和大气](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E9%9B%BE%E5%92%8C%E5%A4%A7%E6%B0%94%E4%BD%93%E7%A7%AF)小节。

**IES配置文件（IES Profiles）**

是

 

**光源函数（Light Functions）**

是

启用 `r.PathTracing.LightFunctionColor` 后还支持彩色光源函数。彩色光源函数目前仅在路径追踪器中受支持。

后期处理

 

 

**景深（Depth of Field）**

是

路径追踪器会渲染器本身的深度通道，而不是使用光栅器生成的通道。这可以使深度和RGB结果更精准地匹配，改进依赖深度的后期处理通道。这不会影响引用景深选项，后者可以在后期处理体积设置中启用。

**动态模糊（Motion Blur）**

部分

在 **路径追踪（Path Tracing）** 模块上启用 **参考动态模糊（Reference Motion Blur）** 后，使用影片渲染队列可获得最准确的结果。此选项可实现更准确的动态模糊，以更高性能开销获得流畅的结果。在此模式下，不会应用后期处理向量模糊，并且会在所有空间和时间采样累积之后应用降噪。应当应用更高的时间取样数以提高质量。在使用非常高的时间取样数量时，请注意Sequencer中的更新分辨率限制。

材质着色模型

 

 

**无光照（Unlit）**

是

 

**默认光照（Default Lit）**

是

 

**次表面（Subsurface）**

是

 

**预集成皮肤（Preintegrated Skin）**

是

渲染与次表面着色模型相同。

**Alpha维持（Alpha Holdout）**

是

 

**透明涂层（Clear Coat）**

是

 

**次表面轮廓（Subsurface Profile）**

是

需要启用了 **Burley** 次表面散射的次表面轮廓。

**双面植被（Two Sided Foliage）**

是

 

**毛发（Hair）**

是

对此着色模型的支持仍被视为 **试验性** ，尚未针对 **光照（Lit）** 着色模型的行为进行校准。

**布料（Cloth）**

是

 

**眼睛（Eye）**

是

 

**SingleLayerWater**

是

添加了对此着色模型的试验性支持。栅格实现在很大程度上依赖于后期处理，目前无法实现密切匹配。

**薄半透明（Thin Translucent）**

是

 

**从材质表达式（From Material Expression）**

是

 

材质特性

 

 

**Substrate材质（Substrate Materials）**

是

已实现初步支持。[Substrate](/documentation/zh-cn/unreal-engine/substrate-materials-in-unreal-engine)是一项实验性功能，我们仍在积极开发中。

**稀疏体积纹理（Sparse Volume Textures）**

部分

已添加了初步支持。如需相关的设置和使用信息，请参阅[稀疏体积纹理](/documentation/zh-cn/unreal-engine/sparse-volume-textures-in-unreal-engine)。

**异类体积（Heterogeneous Volumes）**

部分

已添加了初步支持。尚不支持天空大气组件。如需更多信息，请参阅[异类体积](/documentation/zh-cn/unreal-engine/heterogeneous-volumes-in-unreal-engine)。

**彩色阴影（Colored Shadows）**

是

可以通过 **薄半透明（Thin Translucent）** 或实心玻璃实现。请参阅本页面的[使用路径追踪器的玻璃渲染](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%99%A8%E8%BF%9B%E8%A1%8C%E7%8E%BB%E7%92%83%E6%B8%B2%E6%9F%93)和[颜色吸收](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E9%A2%9C%E8%89%B2%E5%90%B8%E6%94%B6)小节。

**半透明阴影（Translucent Shadows）**

是

 

**折射（Refraction）**

是

 

**贴花（Decals）**

是

贴花Actor和网格体贴花都受到支持。

**各向异性（Anisotropy）**

是

 

系统支持

 

 

**多个GPU（Multiple GPU）**

是

需要GPU支持NVIDIA NvLink/SLI。请参阅本页面的\[允许使用多个GPU渲染\]（#启用对多个GPU的支持）小节。

**Sequencer影片渲染队列（Sequencer Movie Render Queue）**

是

 

**正交摄像机（Orthographic Camera）**

是

 

**逐个实例的自定义数据（Per Instance Custom Data）**

是

 

**逐个实例的随机数据（Per Instance Random Data）**

是

 

## 其他信息

路径追踪模式的运行方式与虚幻引擎中的其他一些渲染方法不同。这意味着适用于实时渲染的内容可能不适用于路径追踪渲染。以下小节将介绍其中的一些不一致和常见问题，以及你可以采取哪些步骤来改善使用路径追踪器的结果。

### 减少萤火虫瑕疵

路径追踪器模拟光源的方式是根据材质属性随机追踪光线。当场景的明亮区域被发现的可能性较低时，生成的示例可能会变得过亮，从而产生在帧内出现后又消失的光源（或萤火虫）规格。路径追踪尝试将这些影响的最常见来源降至最低，但在某些情况下仍然可能发生。

![路径追踪器萤火虫瑕疵](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73833335-1769-4be9-9c28-572c12b29965/fireflyartifacts.gif)

当路径追踪结果与泛光后处期理通道相结合时，生成的像素会特别显眼，因为它会在出现后又消失，或者变亮后又变暗。

后期处理设置 **最大曝光路径（Max Exposure Path）** 可以控制渲染路径追踪场景中使用的最大曝光。将曝光调整为比当前场景曝光高几阶，通过后期处理 **最大EV100（Max EV100）** （可在镜头（Lens） > 曝光（Exposure）分段下找到）设置，将减少萤火虫出现的机会。

### 降噪选项

通过视口使用路径追踪器交互式渲染帧，使用[影片渲染图表](/documentation/404)或使用[影片渲染队列](/documentation/404)渲染帧时，帧内总是会存在一些噪点。降低噪点的一种方式是，使用降噪算法来稳定最终结果，生成噪点更少的更干净图像。

在 **路径追踪（Path Tracing）** 分段下启用 **降噪器（Denoiser）** 时，路径追踪器通过 **后期处理体积（Post Process Volume）** 设置启用降噪。

降噪算法根据以下降噪库，通过虚幻引擎中的插件来实现：

-   [NNE降噪器](/documentation/zh-cn/unreal-engine/nne-denoiser-in-unreal-engine)默认使用英特尔的GPU加速的开放图像降噪（Open Image Denoise）技术，但允许在CPU或GPU上导入并运行自定义神经降噪网络。
-   [英特尔的开放图像降噪](https://www.openimagedenoise.org/)库是基于CPU的降噪器，用于从上一个取样中去除噪点，并提高长时间运行帧的质量。
-   [NFOR降噪器](/documentation/zh-cn/unreal-engine/nfor-denoiser-in-unreal-engine)是一款时空降噪引擎，设计目的是为离线路径追踪渲染提供高时间稳定性。它能创建流畅的摄像机动画，并通过GPU加速，根据周围的时间和空间斑块对每个像素进行降噪。该算法的灵感来自于论文[用于蒙特卡洛渲染降噪的非线性加权一阶回归](https://cs.dartmouth.edu/~wjarosz/publications/bitterli16nonlinearly.html)。
-   [NVIDIA Optix AI加速的降噪器](https://developer.nvidia.com/optix-denoiser)库是GPU加速的人工智能，通过数万张图像进行训练，以降低视觉噪点，同时提供更快的降噪时间。

下图为已应用降噪和未应用降噪的帧对比：

![未应用降噪](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc506544-d909-4c22-bbf8-a77fc36c4c48/denoiser_off.png)

![已应用降噪](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/194bbc68-051d-4532-87f2-4ba8aa1b9ff2/denoiser_on.png)

未应用降噪

已应用降噪

#### NNE降噪器

NNEDenoiser插件默认启用。

此降噪器为通用降噪器插件，可以导入任意神经降噪器网络，并以不同的NNE运行时运行。配备了不同版本的英特尔开放图像降噪器（快速、均衡以及高质量，有或无阿尔法均可），可以在CPU或GPU上运行。默认设置为GPU运行的有阿尔法均衡预设，提供质量较好的交互式降噪。

如需详细了解如何更改预设或添加并启用自己的神经网络降噪器，请参阅[NNE降噪器](/documentation/zh-cn/unreal-engine/nne-denoiser-in-unreal-engine)。

#### 开放图像降噪插件

此降噪器在CPU上运行，并非为交互式降噪而设计，而是用于帮助提高长时间运行帧的质量。此降噪器不保证在所有情况下取得时间一致性，并可能需要每个像素有很高的取样数量，才能实现稳定输出。使用影片渲染队列增加 **抗锯齿（Anti-Aliasing）** 模块设置中的 **时间取样数量（Temporal Sample Count）** 时，可以提高时间稳定性。

#### Optix降噪插件

此插件为试验性

**OptixDenoise** 插件必须在 **插件（Plugins）** 浏览器中为你的项目启用。

此降噪器会使用GPU加速的人工智能降低视觉噪点，同时能提供更快的降噪时间。该降噪器还包含一个时间组件，可试图减少降噪后动画中的闪烁。

若你的项目同时启用了多个插件，则必须使用控制台变量，选择当后期处理体积设置启用 **降噪器（Denoiser）** 时，使用哪个降噪器。使用控制台变量 `r.PathTracing.SpatialDenoiser.Type` 即可决定使用空间（0，默认）还是时间（1）降噪。使用空间降噪时，通过设定 `r.PathTracing.Denoiser.Name` （例如默认的 `NNEDenoiser` ，或 `OIDN` ）即可决定使用的降噪器。使用时间降噪时，通过设定 `r.PathTracing.TemporalDenoiser.Name` （例如默认的 `NFOR` ，或 `OptiX` ）即可决定使用的降噪器。

### 使用路径追踪器进行天空光照

天空光照有两种处理方式：一是使用带有应用天空材质的传统天空盒，二是使用天空光照的 **实时捕获（Real Time Capture）** 模式来捕获场景中的天空、大气和云。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbc3f4a1-7dcc-40fe-94e7-bb59f3e1952e/skyboxmesh.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f3c1f6c-61ec-463c-ab93-cd5aaed5a971/volclouds.png)

天空盒网格体

天空光照实时捕获

若要使用天空盒表示天空，需要在网格体和材质中进行一些设置，以便顺畅地与路径追踪器配合使用。首先，天空材质必须在材质的 **细节（Details）** 面板设置中启用标记 **是天空（Is Sky）** 。这样可以确保当场景中存在天空光照时，天空盒材质的光照不会被计算两次。如果天空盒实际上被计算两次，这也有可能减少可能出现的噪点量。

![材质设置是天空标记](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0920dec-0df9-402b-bfca-db629bde6afe/materialsettings_isskyflag.png)

在关卡中，选择天空盒Actor并使用 **细节（Details）** 面板以禁用 **投射阴影（Cast Shadows）** ，防止网格体遮挡场景中天空光照和定向光源的贡献。

![禁用天空盒网格体上的阴影](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2546b3b2-840f-4485-9fb8-5af3b57dca90/skyboxmesh_disablecastshadows.png)

或者，来自[天空大气](/documentation/zh-cn/unreal-engine/sky-atmosphere-component-in-unreal-engine)和[体积云](/documentation/zh-cn/unreal-engine/volumetric-cloud-component-in-unreal-engine)系统的光照贡献可以通过在天空光照上启用 **实时捕获（Real Time Capture）** 模式来捕获。由于在呈现天空光照时，存在捕获天空盒、天空大气和体积云的这种限制，它们的分辨率取决于天空光照 **立方体贴图分辨率（Cubemap Resolution）** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1a401a4-e0c0-445e-95f1-355a3d5128d3/volclouds_128res.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/920c4478-21fa-45ae-8d53-12b3ef4eeec8/volclouds_512res.png)

天空光照立方体贴图分辨率：128（默认值）

天空光照立方体贴图分辨率：512

### 雾和大气体积

路径追踪器支持天空大气和指数高度雾组件中的体积。

#### 参考大气

在后期处理体积设置中启用 **参考大气（Reference Atmosphere）** 后，天空大气光照将根据体积计算，带来更逼真的结果。在此模式下，将自动忽略场景中的天空光照，因为天空光照仅受本地和定向光源影响。路径追踪器将行星表示为非常大的球体，这样就会呈现正确的阴影投射，并且地面颜色会在反射光照中从所有方向正确反射到天空。

![没有参考大气的路径追踪的场景](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89d1519e-c9b1-455c-b3ce-a371fe48767c/ref-atmos-2a.png)

![有参考大气的路径追踪的场景](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd037913-0a71-4640-984a-3c2a7976ce39/ref-atmos-2b.png)

没有参考大气的路径追踪的场景

有参考大气的路径追踪的场景

关于使用参考大气的附加说明：

-   要按预期使用 **天空大气（Sky Atmosphere）** ，请将其 **变换模式（Transform Mode）** 设置调整为 **组件变换时的行星顶部（Planet Top at Component Transform）** ，并将组件移至场景下方。
-   **体积云（Volumetric Cloud）** 组件尚不受支持。它们需要启用了 **实时捕获（Real Time Capture）** 的天空光照。请参阅本页面的[使用路径追踪器进行天空光照](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%99%A8%E8%BF%9B%E8%A1%8C%E5%A4%A9%E7%A9%BA%E5%85%89%E7%85%A7)。

#### 体积雾

使用启用了体积雾的指数高度雾组件时，支持雾。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6a1b874-e3eb-4110-aec4-93dfaf9e64b2/path-tracer-fog-4096ssp.png)

并非所有功能按钮都受支持，因为一些参数具有非物理含义。支持的主要参数为：

-   雾密度和雾高度衰减
-   散射分布
-   反射率
-   消光比例
-   视野距离
    -   请注意，这用于限制高度雾的影响区域，因为无限范围可能导致很长的渲染时间。

### 异类体积的渲染

你可以使用Niagara流体插件渲染异类体积，或将场景中使用[稀疏体积纹理](/documentation/zh-cn/unreal-engine/sparse-volume-textures-in-unreal-engine)材质的异类体积实例化来渲染它。

![由Niagara流体粒子系统生成的路径追踪异类体积示例。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9341200e-d0e3-4713-ba6b-ce4c0df020ac/path-tracer-heterogeneous-volume.png)

关于使用路径追踪器渲染异类体积的更多详情，请参阅文档[异类体积](/documentation/zh-cn/unreal-engine/heterogeneous-volumes-in-unreal-engine)和[稀疏体积纹理](/documentation/zh-cn/unreal-engine/sparse-volume-textures-in-unreal-engine)。

### 光源的直接可见性

默认情况下，非精确光源（例如具有源半径的点光源、矩形光源和天空光照）对于直射摄像机光线不可见。例外情况是启用了 **实时捕获（Real Time Capture）** 的天空光照。

与天空盒几何体和静态或指定的立方体贴图配对的天空光照通常不会被摄像机光线看到。这可以通过设置控制台变量 `r.PathTracing.VisibleLights 1` 来修改。

无论是否启用了可见光源控制台变量，所有光源在反射和折射中都可见。这确保了所有可能的光线路径都能看到光源。但是，在某些情况下，这可能会导致意外行为。例如，直接放置在玻璃窗后面的矩形光源将可见，并且会阻挡从窗户望出去的视野，这仅适用于真折射，且折射率不等于1时。

### 使用路径追踪器进行玻璃渲染

#### 基本玻璃材质

路径追踪器中玻璃的基本材质设置取决于几个因素。首先必须决定要着色的网格体是否已使用厚度建模。我们会首先查看实心（或"厚"）的情况。在此情况下，需要在材质上使用以下设置：

-   着色模型：默认光照
-   混合模式：半透明
-   光照模式：表面前向着色（以允许访问所有着色器参数）
-   折射方法：折射率

此基本配置完成后，我们现在可以将不透明度设置为0，使材质的一些部分折射光线。你可以将不透明度参数视为在"默认光照"着色模型（其中包含漫反射和高光度）与纯折射着色模型（表示透明玻璃）之间的混合。默认情况下，折射量自动从高光度颜色派生。要更精细地控制，你可以将值插入材质中的"折射率"插槽以覆盖此项，并独立于IOR的光线弯曲效果控制反射率。下面是最简单的玻璃材质的示例：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e8b970c-3802-4f2e-8e0b-eac7ffe3cffd/pathtracer-basic-glass-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e8b970c-3802-4f2e-8e0b-eac7ffe3cffd/pathtracer-basic-glass-material.png)

点击查看大图。

现在我们来看看如何使用独立的IOR控制菲涅尔效果和折射，更好控制地玻璃着色。我们不使用高光度，它只能生成最高0.08的SpecularColor（对应于大约1.8的IOR），而是会将金属感设置为1.0以使SpecularColor=BaseColor，更直接地驱动高光度颜色。然后，我们利用[公式](https://en.wikipedia.org/wiki/Fresnel_equations#Normal_incidence) **SpecularColor=((IOR-1)/(IOR+1))^2** ，在给定折射率值的情况下计算SpecularColor。下面是示例材质：

![带有更多控制权的玻璃材质的示例。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2bdda43-88f2-42c8-be81-a65ac2b7eb61/pathtracer-intermediate-glass-material.png)

下面是独立控制高光度和折射的示例：

          ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。这些变化相当于1.0到1.789的IOR值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d27c56e6-2d11-4021-bd50-ab64510bcc19/ls-sphererender-spec-ior-000.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。这些变化相当于1.0到1.789的IOR值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfe82f6c-dbf4-4f26-af26-3cc0fcb0cc02/ls-sphererender-spec-ior-001.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。这些变化相当于1.0到1.789的IOR值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83647e41-8864-46aa-be4c-1014215d294d/ls-sphererender-spec-ior-002.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。这些变化相当于1.0到1.789的IOR值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fe61935-b1ab-4c50-8256-7fa32b9f121d/ls-sphererender-spec-ior-003.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。这些变化相当于1.0到1.789的IOR值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8862ab14-683f-4d7e-b88d-420c22af13f5/ls-sphererender-spec-ior-004.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。这些变化相当于1.0到1.789的IOR值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/64ef575a-5e47-4807-a6ba-e497a593daaf/ls-sphererender-spec-ior-005.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。这些变化相当于1.0到1.789的IOR值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20c2dd3b-2a2d-47ff-9949-93efed3603df/ls-sphererender-spec-ior-006.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。这些变化相当于1.0到1.789的IOR值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b79762d-51c3-4606-b90c-6fa39becc8c8/ls-sphererender-spec-ior-007.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。这些变化相当于1.0到1.789的IOR值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c9d4c6b-4315-475b-bb12-91db47b1d6af/ls-sphererender-spec-ior-008.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。这些变化相当于1.0到1.789的IOR值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/432fec73-1dcd-4cfe-a452-6bbc6c8bea38/ls-sphererender-spec-ior-009.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。这些变化相当于1.0到1.789的IOR值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ad6e291-2f78-453b-9f1d-e2391b58db93/ls-sphererender-spec-ior-010.png)

**拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。这些变化相当于1.0到1.789的IOR值。**          ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3a8125b-4f9e-44c7-b522-49f130749f7a/ls-sphererender-v2-000.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ee0085f-f3cd-4e84-b26a-03794b6f548d/ls-sphererender-v2-001.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b82b8aaa-64b1-4660-af0c-7712cca03401/ls-sphererender-v2-002.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/987a5270-e799-4df3-8a28-f4ae84a00dce/ls-sphererender-v2-003.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad30c766-b1ca-44d0-9733-7e7332a9f42e/ls-sphererender-v2-004.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91aa3002-bfc6-4f4b-8cae-6cd483f6e41a/ls-sphererender-v2-005.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbc604ec-106f-40dd-8a36-a92ead836679/ls-sphererender-v2-006.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5efb6886-f16e-40df-ad25-eb51b3002680/ls-sphererender-v2-007.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9ebee76-579f-4a59-8d6c-2999124e64e5/ls-sphererender-v2-008.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5106a58b-b081-4a48-853f-bec56bb3e7c8/ls-sphererender-v2-009.png) ![拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51273615-8eab-4775-8e75-d7803e03ba35/ls-sphererender-v2-010.png)

**拖动滑块以查看玻璃材质的高光度变化。高光度值的范围是0到1.0，增量尺度为0.1。**

#### 薄半透明着色模型

**薄半透明（Thin Translucency）** 着色模型很适合在对象没有厚度（例如，如果玻璃窗格使用单个扁平多边形表示）时实现物理准确的结果。薄玻璃材质的设置大体上与上述情况相同，唯一需要更改的是：

-   着色模型：薄半透明
-   添加 **Thin Translucent Material** 节点以控制颜色（请参阅下面关于颜色吸收的小节）

所有其他行为对于实心和薄的情况都是相同的。但是，这里有一项重要的差异，对于薄的情况，粗糙度很低时，折射率实际上不会更改光线的方向。但是，它确实会对反射率和透射数量有细微的影响，并且会影响反射粗糙度和透射粗糙度之间的比率控制。随着折射率更接近1，透射粗糙度会减小，而反射粗糙度会保持不变。将结果与使用实心玻璃材质的一块薄玻璃比较，就可以看到这种效果。

在两种情况下，如果折射方法未设置为 **折射率（Index Of Refraction）** ，路径追踪器将使用透明度而不是折射。透明度不计为散射事件，因此不计入反射次数。它还意味着，在这些模式中不会应用粗糙度。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b3f1da3-e7e0-47ba-8fc1-6f57382ae453/glass_a.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b3f1da3-e7e0-47ba-8fc1-6f57382ae453/glass_a.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86516bda-986f-4356-b3c5-2c6cf1898029/glass_c.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86516bda-986f-4356-b3c5-2c6cf1898029/glass_c.png)

实心玻璃材质

薄半透明玻璃材质

点击查看大图。

点击查看大图。

#### 颜色吸收

要控制通过玻璃透射的颜色（也称为"比尔定律"），可以使用实心玻璃材质的材质图表中的 **Absorption Medium** 材质输出节点。此功能仅可用于路径追踪器，因为它需要追踪光线颜色在多次反射中的状态。

要将此功能添加到上面的实心玻璃示例，你可以将额外一小组节点添加到类似下面的材质示例的材质。

![颜色吸收材质示例。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/982af25b-1d9d-4354-a523-088eb9785022/pt-color-absorption-material-graph.png)

设置RGB颜色时，接近 **1** 的值不会表现出吸收。

上面的示例材质使用 **透射颜色（Transmittance Color）** 控制正在发生的吸收量。统一设为在距离超过100个单位之后呈现指定的颜色。要更改此距离，请使用公式 `Transmittance Color = Color^(100/Distance)` 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc1f18a1-7d0f-4cca-b9a5-1e15f4885051/pt-color-absorption-1.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8516b04-25c5-493f-a290-95969d2622a5/pt-color-absorption-2.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b95928b6-1288-432d-bc85-91959ba0e9f4/pt-color-absorption-3.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc55a412-6c56-44d9-8f8b-da22c6997571/pt-color-absorption-4.png)

Absorption: 0x

Absorption: 1x

Absorption: 10x

Absorption: 100x

要控制通过薄玻璃的吸收量，需使用"Thin Translucent Output"节点完成。这里，透射颜色将随虚拟厚度发生变化，因此距离控制可以简化为相对的控制：

![带有颜色吸收的薄半透明示例。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd1470a1-b0b6-4d0b-adf6-8204d137d768/pt-color-absoprtion-thin-translucency.png)

#### 节能

虚幻引擎5的节能实现用于减少金属和玻璃材质的高光度叶中的能量损失。

你可以从"项目设置（Project Settings）"中的"引擎（Engine）> 渲染（Rendering）> 材质（Materials）"分段打开节能。

为了保留向后兼容性，此功能目前默认禁用。在引擎的未来版本中，此功能预计会默认启用。

![节能：已禁用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f319efa-f87e-4d79-a4fe-231c1c2932de/glass-wedge-roughness-ec-off.png)

![节能：已启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2638ce33-573c-4a2d-ade2-5be4480fb5e3/glass-wedge-roughness-ec-on.png)

节能：已禁用

节能：已启用

#### 近似焦散

路径追踪器将使用近似焦散路径来帮助减少噪点，尤其是在玻璃或金属表面的粗糙度值较低的情况下。对于这些类型的材质，反射焦散会产生各种图案，并且会占用不合理的时间或示例量来收敛，以便获得无噪点图像。

例如，在渲染和示例累加过程中，这些图像是按顺序拍摄的，最终的图像就是完成后的去噪结果。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/417f223e-8201-4d30-803d-041f1a731d31/approximatecaustics_disabled.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/417f223e-8201-4d30-803d-041f1a731d31/approximatecaustics_disabled.png)

点击查看大图。

因为焦散通常需要很长时间才能收敛到无噪点结果，路径追踪器将通过使用控制台命令 `r.PathTracing.ApproximateCaustics 1` 来接近图像中存在的焦散，从而降低图像噪点。此变量默认启用。

![近似焦散：已启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e732733e-ac01-4099-a025-55584f1531b9/pt_approximatecaustics_1.png)

![近似焦散：已禁用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a9696b0-5be1-4577-ba94-568fa09ddaa8/pt_approximatecaustics_0.png)

近似焦散：已启用

近似焦散：已禁用

另一个需要考虑的因素是折射焦散和近似焦散之间的区别。你可以使用降噪器预览在给予足够时间收敛的情况下焦散的外观，而近似焦散可以在更短的时间内提供可可投入使用的图像。

![折射焦散 | 近似焦散：已启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e7fd3a4-cb38-4a23-aac9-8448ea544fd8/refractivecaustics_approximate.png)

![折射焦散 | 近似焦散：已禁用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b7d5d58-9728-48a2-bf38-a95eceb98ba8/refractivecaustics_traced.png)

折射焦散 | 近似焦散：已启用

折射焦散 | 近似焦散：已禁用

### 粗糙面的光透射和反射

路径追踪器的独特之处在于，除了粗糙面反射之外，它还支持渲染粗糙面透射，而对于路径追踪器，这些着色器参数会耦合在一起。

在下面的示例中，玻璃材质的粗糙度值会发生变化，以便展示近似焦散、反射粗糙度以及它对投射的半透明阴影的影响。

     ![拖动滑块可以看到玻璃材质从无粗糙度变为有粗糙度。粗糙度值范围为0到0.2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fece3b63-709f-4d48-b7d5-5809700f0c75/1_0-0.png) ![拖动滑块可以看到玻璃材质从无粗糙度变为有粗糙度。粗糙度值范围为0到0.2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf07d482-f84f-4fc0-8011-dbc5e2a785ca/2_0-025.png) ![拖动滑块可以看到玻璃材质从无粗糙度变为有粗糙度。粗糙度值范围为0到0.2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3cba8f41-58a2-4c9e-ab8f-adf106fd1123/3_0-05.png) ![拖动滑块可以看到玻璃材质从无粗糙度变为有粗糙度。粗糙度值范围为0到0.2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba9d075d-45cc-424e-98c9-0f251c52a01d/4_0-1.png) ![拖动滑块可以看到玻璃材质从无粗糙度变为有粗糙度。粗糙度值范围为0到0.2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1f4a63d-23d0-4d3f-ac36-38daffc3533a/5_0-15.png) ![拖动滑块可以看到玻璃材质从无粗糙度变为有粗糙度。粗糙度值范围为0到0.2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ab76dd2-d687-4d55-8a9c-131e691a3281/6_0-2.png)

**拖动滑块可以看到玻璃材质从无粗糙度变为有粗糙度。粗糙度值范围为0到0.2**

### Ray Type Switch材质节点

**Path Tracing Ray Type Switch** 节点可用于替换阴影、间接高光度、体积和漫反射光线的材质信息。

![Path Tracer Ray Type Switch材质节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66cd3c96-9851-444e-a2d0-3048e564c9e0/pt-raytypeswitch-node.png)

输入选项

说明

**主要（Main）**

用于摄像机光线，或非路径追踪的着色。

**阴影（Shadow）**

由路径追踪器用于阴影光线，并且仅应用于使用非不透明混合模式的材质。

**IndirectDiffuse**

由路径追踪器用于间接漫反射光线，替换其颜色。

**IndirectSpecular**

由路径追踪器用于间接高光度光线，替换其颜色。

**IndirectVolume**

由路径追踪器用于间接体积光线，替换其颜色。

下面的示例场景显示了使用Path Tracing Ray Type Switch节点设置的两种材质：不透明材质和半透明材质。不透明材质应用于球体，并将反射材质的间接高光度显示为蓝色，红色球体周围的间接光照现在为绿色。而半透明棋盘格材质将其阴影替换为遮罩纹理示例。

![将Ray Type Switch用于各种材质的示例场景。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3ef26e6-0f3d-470b-be17-8e0e44d40e37/pt-raytypeswitch-examplescene.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0fa9efe2-802c-406c-8acc-4baae02101ec/raytypeswitch-indirectdiffuse.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/604f4ea7-ce4c-4094-87a0-542f5605a35f/raytypeswitch-shadow.png)

不透明材质替换间接高光度和间接漫反射。

半透明材质替换材质投射的阴影。

### 后期处理材质缓冲区

后期处理材质缓冲区包括专门用于路径追踪器的更多输出。缓冲区可使用 **路径追踪缓冲区纹理（Path Tracing Buffer Texture）** 材质表达式访问。此节点提供辐射（Radiance）、去噪辐射（Denoised Radiance）、反射率（albedo）、法线（Normal）和方差（Variance）数据。使用细节（Details）面板即可选择想要应用到材质图表中节点的缓冲器类型。

![路径追踪器缓冲区纹理材质表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb5401e3-8c2b-4a88-954c-6d4b9c627f16/path-tracer-post-process-buffers-expression.png)

属性

说明

**辐射（Radiance）**

原始辐射。

**去噪辐射（Denoised Radiance）**

如果在路径追踪器的后期处理设置中启用了去噪功能，则存储去噪辐射，并为当前帧完成去噪，否则它将显示为黑色。

**反射率（Albedo）**

当前采样数的平均反射率。

**法线（Normal）**

当前采样数的平均法线值。

**方差（Variance）**

存储为标准派生的路径追踪方差。方差可以是逐通道方差，也可以是基于路径追踪配置的亮度、反射率或法线值方差。连接此缓冲区会造成额外的开销。

### DBuffer贴花材质表达式

当贴花材质需要提供更广泛的响应，而不仅仅是半透明度及阿尔法复合混合模式时，DBuffer材质表达式会比较有用。这些节点会直接将纹理数据从DBuffer读取到材质图表，为你的贴花材质提供可定制的灵活性，比如响应旧版行为的近似行为，或更复杂的光照交互。

如需详细了解这些表达式在材质中的用法，请参阅[贴花材质](/documentation/zh-cn/unreal-engine/decal-materials-in-unreal-engine)文档中的"DBuffer材质表达式"章节。

## 实用的控制台变量

以下是在使用路径追踪器时启用的一些实用的控制台变量。

控制台变量

说明

`r.PathTracing.VisibleLights`

使所有光源对摄像机光线可见。此功能默认禁用，以便匹配引擎的基于光栅的模式，但它有助于了解光源的建模方式以及发现光源重叠的情况。如果将其设置为2，只有天空光照可见

`r.PathTracing.ProgressDisplay`

这会向视图添加小进度条，显示逐像素配置示例的进度。累加完成后进度条会自动隐藏。它不会影响使用影片渲染队列的渲染，可安全保持开启。此功能默认启用。

`r.PathTracing.Denoiser`

此选项可用于快速切换降噪器的开关状态（假设当前示例累加已完成）。与后期处理体积（Post Process Volume）设置不同，更改此设置不会导致累加重新启动，并且可用于快速比较启用和不启用降噪的渲染帧。

`r.PathTracing.HeterogeneousVolumes`

此选项将允许使用路径追踪器渲染异类体积。如需详细了解异类体积和路径追踪器的用法，请参阅[异类体积](/documentation/zh-cn/unreal-engine/heterogeneous-volumes-in-unreal-engine)。

## 常见问题解答

### 使用HighResShot捕获收敛的路径追踪图像

使用等于你的场景中当前活动的 **逐像素示例数（Samples Per Pixel）** 的控制器变量 `r.HighResScreenshotDelay` 。要验证是否捕获了正确输出，最好将 `r.PathTracing.ProgressDisplay` 保持设置为1。如果捕获的图像中没有进度条，说明示例累积已完成。

### 在运行时启用路径追踪器

路径追踪器可以在运行时使用 **Enable Path Tracing** 蓝图节点在支持的硬件和平台上调用。

![用于在运行时启用路径追踪器的蓝图节点。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/467b954c-306a-4fe2-8c61-156b9207646f/pt-bp-enablepathtracer-runtime.png)

### 避免Windows上因"D3D Device Removed Crashes"而出现超时延迟

Windows会试图限制GPU内核可以使用的时间量，以维持系统响应能力。对于耗费资源的进程，例如暴力路径追踪，可能会更频繁地达到此限制，尤其是在较低端的GPU上，或当光源模拟变得太复杂而无法在合理时间内完成时。

引擎会公开一些控制台变量，用于控制同时执行的工作量，不过这些变量如果设置不正确，可能会降低总体性能。推荐使用 `stat gpu` 命令持续监控总体性能。

-   `r.PathTracing.DispatchSize` 可控制路径追踪的渲染的最大宽度和高度，以像素为单位。如果该值低于你的视口或图像分辨率，渲染可能分多步执行，这会增加Windows可以验证GPU是否仍有响应的时间量。默认值为2048。
-   `r.PathTracing.FlushDispatch` 可控制在路径追踪过程中清空命令列表的频率。如果将其设置为1，Windows就有更多机会验证GPU是否仍有响应。默认情况下，这设置为2。

在极端情况下，可能很难在避免崩溃的同时维持良好的性能。在这种情况下，可以更改Windows超时限制本身。请参阅[如何修复GPU驱动程序崩溃](/documentation/zh-cn/unreal-engine/dealing-with-a-gpu-crash-when-using-unreal-engine)。

对于包含毛发的场景，可能会发生加速结构（BLAS）超时。在此情况下，尝试将 `r.HairStrands.RaytracingProceduralSplits` 的值降低为 **1** 或 **2** 。

### 实例在路径追踪的视图中消失

硬件光线追踪的默认剔除实现在路径追踪的上下文中可能过度激进，因为光线追踪也用于摄像机可视性。如果实例在切换到路径追踪器视图时看起来缺失，请尝试将 `r.RayTracing.Geometry.InstancedStaticMeshes.Culling` 设置为 **0** 。

### 将路径追踪器用于启用了Nanite的网格体

对于启用了Nanite的网格体，我们提供了原生路径追踪的试验性支持，可以使用 `r.RayTracing.Nanite.Mode 1` 启用。此模式使用Nanite流送系统动态准备光线追踪的网格体，保留的细节比回退网格体可能实现的细节要多得多。

路径追踪器还支持使用启用了Nanite的网格体回退网格体进行表示。回退网格体会使用源网格体中一定百分比的三角形来表示，但会导致启用了Nanite的网格体在场景中的细节更少。通过调整 **回退三角形百分比（Fallback Triangle Percent）** 和 **回退相对误差（Fallback Relative Error）** ，可在静态网格体编辑器中增加回退网格体的细节。

如需详细了解如何配置这些设置，请参阅[Nanite](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#%E5%9B%9E%E9%80%80%E7%BD%91%E6%A0%BC%E4%BD%93)文档的"回退网格体（Fallback Mesh）"小节。

### 启用对多个GPU的支持

需要Windows 10版本2004或更高版本才能使用多个GPU。

NVIDIA的可扩展链接接口（SLI）技术可将多个NVIDIA GPU链接在一起，从而让用户使用多个GPU（mGPU）计算光照。这可提高使用核心硬件光线追踪功能（例如路径追踪器和GPU Lightmass）渲染场景所需的处理能力。

通过以下方式启用对多个GPU配置的支持：

-   将GPU与NVLink网桥连接，并在NVIDIA控制面板中启用SLI。
-   传递命令行参数 `-MaxGPUCount=N` ，其中N是可用GPU数量。例如， `-MaxGPUCount=2` 。
-   打开编辑器后，使用控制台变量 `r.PathTracing.MultiGPU 1` 启用多GPU支持。你还可以将此控制台变量添加到 **\[虚幻引擎根目录\]/Engine/Config** 的 `[/Script/Engine.RendererSettings]` 下的 **DefaultEngine.ini** 文件。

打开编辑器后，你可以检查 **输出日志（Output Log）** ，确认多GPU模式已启用。查找 `LogD3D12RHI: Enabling multi-GPU with 2 nodes` 。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [path tracer](https://dev.epicgames.com/community/search?query=path%20tracer)
-   [automotive](https://dev.epicgames.com/community/search?query=automotive)
-   [architecture](https://dev.epicgames.com/community/search?query=architecture)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [路径追踪器的好处](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%99%A8%E7%9A%84%E5%A5%BD%E5%A4%84)
-   [路径追踪的示例](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E7%9A%84%E7%A4%BA%E4%BE%8B)
-   [在你的项目中启用路径追踪器](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%9C%A8%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE%E4%B8%AD%E5%90%AF%E7%94%A8%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%99%A8)
-   [在关卡编辑器中使用路径追踪器](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%9C%A8%E5%85%B3%E5%8D%A1%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E4%BD%BF%E7%94%A8%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%99%A8)
-   [将路径追踪器用于影片渲染队列](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%B0%86%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%99%A8%E7%94%A8%E4%BA%8E%E5%BD%B1%E7%89%87%E6%B8%B2%E6%9F%93%E9%98%9F%E5%88%97)
-   [路径追踪器后期处理体积设置](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%99%A8%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E4%BD%93%E7%A7%AF%E8%AE%BE%E7%BD%AE)
-   [使用MRQ渲染光照组件](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E4%BD%BF%E7%94%A8mrq%E6%B8%B2%E6%9F%93%E5%85%89%E7%85%A7%E7%BB%84%E4%BB%B6)
-   [路径追踪器的局限性](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%99%A8%E7%9A%84%E5%B1%80%E9%99%90%E6%80%A7)
-   [支持的路径追踪器功能](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%99%A8%E5%8A%9F%E8%83%BD)
-   [其他信息](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%85%B6%E4%BB%96%E4%BF%A1%E6%81%AF)
-   [减少萤火虫瑕疵](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%87%8F%E5%B0%91%E8%90%A4%E7%81%AB%E8%99%AB%E7%91%95%E7%96%B5)
-   [降噪选项](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E9%99%8D%E5%99%AA%E9%80%89%E9%A1%B9)
-   [NNE降噪器](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#nne%E9%99%8D%E5%99%AA%E5%99%A8)
-   [开放图像降噪插件](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%BC%80%E6%94%BE%E5%9B%BE%E5%83%8F%E9%99%8D%E5%99%AA%E6%8F%92%E4%BB%B6)
-   [Optix降噪插件](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#optix%E9%99%8D%E5%99%AA%E6%8F%92%E4%BB%B6)
-   [使用路径追踪器进行天空光照](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%99%A8%E8%BF%9B%E8%A1%8C%E5%A4%A9%E7%A9%BA%E5%85%89%E7%85%A7)
-   [雾和大气体积](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E9%9B%BE%E5%92%8C%E5%A4%A7%E6%B0%94%E4%BD%93%E7%A7%AF)
-   [参考大气](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%8F%82%E8%80%83%E5%A4%A7%E6%B0%94)
-   [体积雾](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E4%BD%93%E7%A7%AF%E9%9B%BE)
-   [异类体积的渲染](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%BC%82%E7%B1%BB%E4%BD%93%E7%A7%AF%E7%9A%84%E6%B8%B2%E6%9F%93)
-   [光源的直接可见性](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%85%89%E6%BA%90%E7%9A%84%E7%9B%B4%E6%8E%A5%E5%8F%AF%E8%A7%81%E6%80%A7)
-   [使用路径追踪器进行玻璃渲染](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%99%A8%E8%BF%9B%E8%A1%8C%E7%8E%BB%E7%92%83%E6%B8%B2%E6%9F%93)
-   [基本玻璃材质](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%9F%BA%E6%9C%AC%E7%8E%BB%E7%92%83%E6%9D%90%E8%B4%A8)
-   [薄半透明着色模型](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E8%96%84%E5%8D%8A%E9%80%8F%E6%98%8E%E7%9D%80%E8%89%B2%E6%A8%A1%E5%9E%8B)
-   [颜色吸收](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E9%A2%9C%E8%89%B2%E5%90%B8%E6%94%B6)
-   [节能](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E8%8A%82%E8%83%BD)
-   [近似焦散](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E8%BF%91%E4%BC%BC%E7%84%A6%E6%95%A3)
-   [粗糙面的光透射和反射](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E7%B2%97%E7%B3%99%E9%9D%A2%E7%9A%84%E5%85%89%E9%80%8F%E5%B0%84%E5%92%8C%E5%8F%8D%E5%B0%84)
-   [Ray Type Switch材质节点](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#raytypeswitch%E6%9D%90%E8%B4%A8%E8%8A%82%E7%82%B9)
-   [后期处理材质缓冲区](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E6%9D%90%E8%B4%A8%E7%BC%93%E5%86%B2%E5%8C%BA)
-   [DBuffer贴花材质表达式](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#dbuffer%E8%B4%B4%E8%8A%B1%E6%9D%90%E8%B4%A8%E8%A1%A8%E8%BE%BE%E5%BC%8F)
-   [实用的控制台变量](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%AE%9E%E7%94%A8%E7%9A%84%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F)
-   [常见问题解答](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94)
-   [使用HighResShot捕获收敛的路径追踪图像](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E4%BD%BF%E7%94%A8highresshot%E6%8D%95%E8%8E%B7%E6%94%B6%E6%95%9B%E7%9A%84%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%9B%BE%E5%83%8F)
-   [在运行时启用路径追踪器](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%9C%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E5%90%AF%E7%94%A8%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%99%A8)
-   [避免Windows上因"D3D Device Removed Crashes"而出现超时延迟](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E9%81%BF%E5%85%8Dwindows%E4%B8%8A%E5%9B%A0%22d3ddeviceremovedcrashes%22%E8%80%8C%E5%87%BA%E7%8E%B0%E8%B6%85%E6%97%B6%E5%BB%B6%E8%BF%9F)
-   [实例在路径追踪的视图中消失](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%AE%9E%E4%BE%8B%E5%9C%A8%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E7%9A%84%E8%A7%86%E5%9B%BE%E4%B8%AD%E6%B6%88%E5%A4%B1)
-   [将路径追踪器用于启用了Nanite的网格体](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%B0%86%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%99%A8%E7%94%A8%E4%BA%8E%E5%90%AF%E7%94%A8%E4%BA%86nanite%E7%9A%84%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [启用对多个GPU的支持](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine#%E5%90%AF%E7%94%A8%E5%AF%B9%E5%A4%9A%E4%B8%AAgpu%E7%9A%84%E6%94%AF%E6%8C%81)
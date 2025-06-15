# 虚幻引擎中的Lumen技术细节 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:15:05.447Z

---

目录

![Lumen技术细节](https://dev.epicgames.com/community/api/documentation/image/e20324f6-7152-4a0f-ad89-1beafaeacae0?resizing_type=fill&width=1920&height=335)

Lumen使用多种光线追踪方法来解决全局光照和反射。首先执行屏幕追踪，然后使用更加可靠的方法。在默认情况下，Lumen通过有向距离场使用 **软件光线追踪（Software Ray Tracing）** ，同时在启用 **硬件光线追踪（Hardware Ray Tracing）** 时，在支持的视频显卡上达到更高品质。

Lumen的全局光照和反射最初的主要目标是支持在下一代主机上以每秒60帧（FPS）运行的大型开放世界。引擎的 **高（High）** 可扩展性级别中就包括以60FPS为目标的Lumen设置。

Lumen的次要关注点就是在下一代主机上以30FPS实现通透的室内光照。引擎的 **超高（Epic）** 可扩展性级别在下一代主机上能够在8毫秒内以1080p内部分辨率实现全局光照和反射，这个目标依赖[时序超分辨率（TSR）](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine)来输出接近原生4K的画质。

更多关于Lumen性能的信息，请参阅[Lumen Performance Guide](/documentation/zh-cn/unreal-engine/lumen-performance-guide-for-unreal-engine).

## 表面缓存

Lumen生成附近场景表面的自动参数化，这种方法称为 **表面缓存（Surface Cache）** 。使用这种方法可以快速查找场景中光线接触点的光照。Lumen会从多个角度捕获每个网格体的材质属性。这些捕获位置（即 **卡片（Cards）** ）是针对每个网格体脱机生成的。

可以使用控制台命令 `r.Lumen.Visualize.CardPlacement 1` 来可视化卡片。

![Lumen Card Placement Visualization](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db03fb94-bed7-4ca2-ab2d-fb6be9324e30/mesh-card-placement-visualization-alt.png)

默认情况下，Lumen在一个网格体上放置12个卡，但可以通过在静态网格体编辑器的 **构建设置（Build Settings）** 中设置 **最大Lumen网格体卡片数量（Max Lumen Mesh Cards）** 来增加该数量。调整卡的数量对于更复杂的内部或具有不规则形状的单个网格体非常有用。

![静态网格体编辑器-构建设置-最大Lumen网格体卡片数量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9eb93dc7-080e-4033-b5f0-adbc72c2e261/static-mesh-editor-max-lumen-mesh-cards-setting.png)

没有表面缓存覆盖的区域将在关卡编辑器的 **表面缓存（Surface Cache)** 视图模式中变成粉色。

这些区域不会反射光线，在反射过程中显示为黑色。此类问题可以通过增加最大Lumen网格体卡片数量中的卡片数来解决，但可能无法解决所有问题。或者，将网格体分解成不太复杂的几部分也可以解决这类问题。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16f8c4d3-6d8f-4bd8-bcc9-0b10e5405833/viewmode-lumen-surface-cache.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16f8c4d3-6d8f-4bd8-bcc9-0b10e5405833/viewmode-lumen-surface-cache.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/566b0622-0825-4f33-9f5c-df80e85b748f/lumen-surface-cache-visualization.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/566b0622-0825-4f33-9f5c-df80e85b748f/lumen-surface-cache-visualization.png)

视图模式（View Mode） > Lumen > 表面缓存（Surface Cache）

复杂网格体的Lumen表面缓存可视化（Lumen Surface Cache Visualization of Complex Mesh）

*点击查看大图。*

*点击查看大图。*

具有视图相关逻辑的材质，例如像素深度、摄像机位置或摄像机矢量，在Lumen表面缓存视图模式下看起来可能不正确。使用这些节点的材质可能使用 **光线追踪质量切换（Ray Tracing Quality Switch）** 节点来提供采用Lumen表面缓存的材质版本，或为复杂材质而优化表面缓存捕获。

![光线追踪质量切换材质节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a0e9b08-2799-4b14-afc0-490c2a2efba6/ray-tracing-quality-switch-node.png)

如需详细了解如何使用光线追踪质量切换节点，请参阅[光线追踪性能指南](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine)。

Nanite可以加速用于使表面缓存与三角形场景保持同步的网格体捕获。尤其是多边形网格体，需要使用[Nanite](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)进行有效捕获。只有网格体使用了Nanite，才支持植被和实例化的静态网格体组件。

在使用材质属性填充表面缓存之后，Lumen将计算这些表面位置的直接和间接光照。这些更新分散在多个帧上，可以有效地支持很多动态光照和多次弹射的全局光照。

虚幻引擎为表面缓存和卡呈现提供可视化模式。详情请参阅本页面的[Lumen可视化选项](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#limitationsofgpulightmass)部分。

仅支持具有简单内部结构的网格体——墙壁、地板和天花板都应该是单独的网格体。Lumen不支持在单个网格体中导入带有家具的整个房间。

## 屏幕追踪

Lumen首先在界面中使用追踪光线（即 **屏幕追踪** 或界面空间追踪），如未找到接触点或光线从表面后方穿过，然后再使用更可靠的方法。屏幕追踪支持所有几何体类型，可用于弥合Lumen场景和三角形场景之间存在的不一致情况。

使用屏幕追踪有一个弊端，那就是会严重限制美术设计，而美术设计仅适用于间接光照，例如间接光照缩放（Indirect Lighting Scale）或自发光增强（Emissive Boost）的光照属性。 在光源上设置较大的间接光照范围将会导致依赖于视图的全局光照，因为屏幕追踪无法正确支持它。

下面的示例场景首先使用屏幕追踪，然后再使用其他成本更高的追踪选项。为全局光照和反射禁用屏幕追踪之后，可能只能看到软件光线追踪所产生的的Lumen场景。屏幕汇总可以帮助解决三角形场景和Lumen场景之间的不一致。

通过在关卡视口的 **显示（Show） > Lumen** 菜单中禁用屏幕追踪并移除 **屏幕追踪（Screen Traces）** 旁边的选中标记，即可执行此类型的比较。在 **Lumen全局光照（Lumen Global Illumination）** 和 **Lumen反射（Lumen Reflections）** 下的 **后期处理体积（Post Process Volume）** 中禁用 **屏幕追踪（Screen Traces）** 设置亦可达成此目的。

![启用屏幕追踪 | （默认）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/709c2957-76ed-4994-b19d-8c14814b443c/screen-traces-enabled.jpg)

![禁用屏幕追踪 | 使用表面缓存](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2af96531-16a4-4754-8f13-f691986dee68/screen-traces-disabled.jpg)

启用屏幕追踪 | （默认）

禁用屏幕追踪 | 使用表面缓存

## Lumen光线追踪

Lumen提供了两种方法对场景进行光线追踪：软件光线追踪和硬件光线追踪。

-   **软件光线追踪（Software Ray Tracing）** 使用网格体距离场来运行，适用的硬件和平台范围最广，但能够有效使用的几何体、材质和工作流类型受限。
-   **硬件光线追踪（Hardware Ray Tracing）** 支持更大范围的几何体类型，通过追踪三角形并评估光线击中点上的光照来提供高画质，不会像表面缓存那样提供较低的画质。需要具有支持此功能的显卡和系统才能运行。

软件光线追踪在具有大量重叠实例的场景中是唯一高性能的选项，而硬件光线追踪是唯一能够在表面上实现高质量镜面反射的方法。

### 软件光线追踪

对于有向距离场，Lumen会默认使用软件光线追踪模式。这种追踪呈现方法在任何由硬件支持的Shader Model 5（SM5）上兜售支持，并且只需要在项目设置中启用 **生成网格体距离场（Generate Mesh Distance Fields）** 。

渲染器会把网格体距离场并入全局距离场，以加速追踪。默认情况下，Lumen追踪每个网格体的距离场一到两米，以获得准确度，并针对此距离之外的每道光线追踪合并后的全局距离场。

具有极端重叠情况的实例项目可以控制Lumen用于项目设置 **软件光线追踪模式（Software Ray Tracing Mode）** 的方法。Lumen提供的两种选项供你选择：

-   **细节追踪（Detail Tracing）** 是默认方法，需要追踪单个网格体的有向距离场以获得最高质量。前两米用于获得准确度，而对此距离之外的每道光线则使用全局距离场。
-   **全局追踪（Global Tracing）** 仅对每道光线进行全局距离场追踪，以获得最快的追踪速度。

当摄像机在场景中移动时，网格体距离场会根据距离流送进来和流送出去。它们被打包到单个图集中来进行光线追踪。

使用命令 `r.DistanceFields.LogAtlasStats 1` 将网格体距离场统计数据输出到日志。

Lumen软件光线追踪的质量取决于网格体距离场呈现的质量。系统提供了两种可视化选项，一种用于 **网格体距离场（Mesh DistanceFields）** ，另一种用于 **全局距离场（Global DistanceField）** 。这些可视化模式可以在视口的 **显示（Show） > 可视化（Visualize）** 菜单下找到。

![显示用于查找网格体距离场和全局距离场的可视化菜单选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32be2fa4-b2d0-401a-9444-f58cd98f9dcb/show-visualization-mdf-gdf.png)

![Lumen Scene View](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6fbe7a4b-d341-48f8-926a-21206ce70615/scene-view.png)

![Mesh Distance Field Visualization](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4b2dc73-3250-4c31-be76-3d4422eeed4a/vis-mesh-distance-fields.png)

![Global Distance Field Visualization](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8048ab7-de71-41e5-95b2-8b8d172cf095/vis-global-distance-field.png)

场景视图（Scene View）

网格体距离场可视化（Mesh Distance Fields Visualization）

全局距离场可视化（Global Distance Field Visualization）

对于部分网格体，较薄的表面可能没有良好的距离场呈现，并且可能导致光线泄漏。网格距离场可视化有助于解决这类问题。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b766a202-5b2d-4b78-8715-f32b5ffbd271/mdfresolution-chandelier.png)

（从左到右）三角形网格体、距离场分辨率比例1.0（默认）、1.5、2.0

有两种方法可以改进网格体距离场的呈现：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59fa459c-6abd-4b09-96b2-ebfdeb09e503/projectsettings-voxeldensity.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59fa459c-6abd-4b09-96b2-ebfdeb09e503/projectsettings-voxeldensity.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/411d22d0-9f4e-48f7-8005-eb1ad0deb975/staticmesheditor-proxymeshpercent.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/411d22d0-9f4e-48f7-8005-eb1ad0deb975/staticmesheditor-proxymeshpercent.png)

项目设置：距离场体素密度

静态网格体编辑器：距离场分辨率比例

*点击查看大图。*

*点击查看大图。*

-   项目可以使用项目设置中的 **距离场体素密度（Distance Field Voxel Density）** 来提高网格体距离场的质量。
-   通过静态网格体编辑器的 **构建设置（Build Settings）** 来提高需要更高质量的单个网格体的 **距离场分辨率比例（Distance Field Resolution Scale）** 。

提高距离场分辨率或密度将增加项目的磁盘占用。

### 软件光线追踪的限制

在项目中使用软件光线追踪时将会受到一些限制，它当前支持的几何体和材质类型也受到限制。

**几何体限制（Geometry Limitations）** ：

-   只有静态网格体、实例化静态网格体、分层实例化静态网格体和地形地貌能够在Lumen场景中呈现。
-   必须在植被工具设置中设置 **影响距离场光照（Affect Distance Field Lighting）** 才能启用植被。

**材质限制（Material Limitations）** ：

-   不支持世界位置偏移(WPO)。
-   半透明表面会作为Lumen卡片添加，这样将 **反射的击中照射（Hit Lighting for Reflections）** 与Lumen结合使用时，它们就能接收漫反射全局光照。
-   距离场是使用分配到静态网格体资产的材质属性构建的，而不是重载组件中的属性。
    -   重载具有不同混合模式或启用了双面属性的的材质将会导致三角形呈现和网格的距离场呈现不匹配。

**工作流限制（Workflow Limitations）**：

-   软件光线追踪要求关卡由模块化几何体组成。墙壁、地板和天花板等物体应该是单独的网格体。大型的单个网格体，例如山峰或多层大楼，将会具有较差的距离场呈现，可能会导致出现自遮蔽瑕疵。
-   壁厚度不能少于10厘米，以避免光线泄漏。
-   距离场不能呈现非常薄的特性，也不能呈现单面的网格体的后视效果。如果可以确保查看者看不到单侧网格体的三角形背面或仅使用封闭的几何体，就可以避免这些类型的瑕疵。
-   网格体距离场分辨率根据导入的静态网格体缩放进行分配。
    -   导入后非常小并随后在组件上放大的网格体将 **不会（will not）** 具有充足的距离场分辨率。如果在关卡中放置的实例上进行缩放，则应该根据静态网格体编辑器的构建设置来设置距离场分辨率。

### 硬件光线追踪

硬件光线追踪支持的几何体类型比使用软件光线追踪时要多，尤其是硬件光线追踪模式支持追踪蒙皮网格体。硬件光线追踪还能更好地扩展到更高的质量——它与实际三角形相交，还可以选择在光线接触时评估光照，而不是低质量的表面缓存。

要使用高质量的击中照射，必须在项目设置中的 **引擎（Engine）> 渲染（Rendering）** 部分下启用以下功能：

![用于实现高画质的Lumen项目设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2abab79e-d631-4aed-9c2a-6329f1428469/project-setting-lumen-settings.png)

-   支持硬件光线追踪： **已启用（Enabled）**
-   在可用时使用硬件光线追踪： **已启用（Enabled）**
-   光线照射模式： **反射的击中照射（Hit Lighting for Reflections）**

虽然硬件光线追踪在两种光线追踪方法中可以提供最高质量，但在大型场景中也具有最高的设置成本，它会导致在具有大量重叠的网格体时变得非常昂贵。它可以动态地使网格体（例如蒙皮网格体）变形，并需要较高的成本来更新每帧的光线追踪加速结构，成本与蒙皮三角形的数量成正比。如需详细了解硬件光线追踪的设置和成本，请参阅[光线追踪性能指南](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine)。

对于启用了Nanite的静态网格体，硬件光线追踪模式可以使用Nanite几何体或 **退却网格体（Fallback Mesh）**。这是由Nanite的 **退却相关错误（Fallback Relative Error）** 属性生成的网格体，在无法提供全细节网格体时使用。这些退却网格体可以在关卡视口的 **显示（Show） > 高级（Advanced） > Nanite网格体（Nanite Meshes）** 下可视化。

屏幕追踪可以遮盖Nanite渲染的全三角形网格体和Lumen执行光线追踪的退却网格体之间的不一致。但是在某些情况下，不一致情况过于严重，无法隐藏。在这种情况下，发出退却相关错误可以减少不正确的自相交瑕疵。

![完整细节三角形网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4fc821d-1cec-45c2-91ea-bd8c8791d61d/sme-naniteproxymesh1.png)

![Nanite生成的退却网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afae4ed6-869a-45fc-8d6a-93987e97c70f/sme-naniteproxymesh2.png)

完整细节三角形网格体

Nanite生成的退却网格体

在以下情况中，Lumen将使用硬件光线追踪：

-   项目启用了 **支持硬件光线追踪（Support Hardware Ray Tracing）** 和 **在可用时使用硬件光线追踪（Use Hardware Ray Tracing when available）**。
    -   更改初始设置需要重新启动引擎。
-   该项目在支持的操作系统、RHI和显卡上运行。目前只有以下平台支持高性能的硬件光线追踪：
    -   采用DirectX 12的Windows 10
        -   显卡必须是NVIDIA RTX-2000系列及更高配置，或AMD RX 6000系列及更高配置。
    -   PlayStation 5
    -   Xbox Series S / X

针对Lumen使用硬件光线追踪的项目在必要时可能还是要退而采用软件光线追踪，但不需要同时占用这两者的内存成本和场景更新成本。在这种情况下，应该将以下控制台变量添加到 `DefaultEngine.ini` 配置文件。

```cpp
	r.DistanceFields.SupportEvenIfHardwareRayTracingSupported=0

```

禁用此设置之后，将无法在运行时切换 **在可用时使用硬件光线追踪（Use Hardware Ray Tracing when available）** 。

## 大型开放世界

Lumen场景在摄像机周围的世界中运行，从而实现大型世界和流送。Lumen依靠Nanite的细节级别(LOD)和多视图栅格化来进行快速的场景捕获，从而维持表面缓存，并对所有操作进行节流，以防止卡顿。Lumen不要求Nanite必须运行，但Lumen的场景捕获在具有大量多边形网格体但未启用Nanite的场景中将会变得非常缓慢。如果没有为资产配置良好的LOD，那么这个问题在场景中尤其严重。

摄像机快速移动将会导致Lumen场景更新跟不上摄像机的位置变化，导致在追上摄像机时突然出现间接光照。

当Lumen使用软件光线追踪时，Lumen场景仅遮盖从摄像机位置开始的200米范围，但在后期处理体积中设置 **Lumen场景视野距离（Lumen Scene View Distance）** 之后，这个距离可以增加到800米。超过最远Lumen场景距离之后，则全局光照只能使用屏幕追踪。

### 远场

Lumen的硬件光线追踪实施了 **远场（Far Field）** 追踪，默认情况下可以将Lumen全局光照和反射扩展到距离摄像机一千米的范围。

[远场](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine#farfield)追踪是通过 `DefaultEngine.ini` 配置文件中的控制台变量 `r.LumenScene.FarField=1` 来启用的，需要使用[世界分区的分层细节级别](/documentation/zh-cn/unreal-engine/world-partition---hierarchical-level-of-detail-in-unreal-engine) (HLOD)。远场要求使用构建的HLOD1。

启用远场后，从 **最大追踪距离（Max Trace Distance）** （默认为200米）开始追踪，一直延伸到 `r.LumenScene.FarField.MaxtraceDistance` （默认值为1千米）。由于可以使用 `r.RayTracing.Culling.Radius` 从光线追踪中剔除object，因此项目可能会要求剔除半径和最大追踪距离相匹配。否则，远场遍历点之前的近场（从摄像机到最大追踪距离的object）可能会被剔除，这会导致覆盖范围中留下空隙。

![Lumen远场全局光照和反射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ae97f95-262f-4020-a1df-3e65f7747e33/lumen-far-field.png)

虚幻引擎5的技术演示视频"The Matrix Awakens"展示了使用远场追踪的大型世界全局光照。

## Lumen功能的一般性限制

-   在光照贴图中，Lumen全局光照不能与[静态光照](/documentation/zh-cn/unreal-engine/static-light-mobility-in-unreal-engine)搭配使用。在虚幻引擎5的未来版本中，Lumen反射需要进行扩展才能与光照贴图中的全局光照搭配使用，这样就可以进一步提升使用静态光照技术的项目渲染质量。
-   Lumen与[前向着色](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine)不兼容。

## Lumen的平台支持

-   Lumen **不（does not）** 支持前几代主机，例如PlayStation 4和Xbox One。
-   依赖动态光照的项目可以在这些平台和旧版PC硬件上组合使用[距离场环境光遮蔽](/documentation/zh-cn/unreal-engine/distance-field-ambient-occlusion-in-unreal-engine)和[场景空间全局光照](/documentation/zh-cn/unreal-engine/screen-space-global-illumination-in-unreal-engine)。
-   Lumen是面向次世代主机（PlayStation 5和Xbox Series S/X）和高端PC开发的。Lumen有两种光线追踪模式，每种都有不同的要求。
-   软件光线追踪要求：
-   显卡使用支持Shader Model 5 (SM5)的DirectX 11
    
    要求NVIDIA GeForce GTX-1070或更高级别的显卡。
    
-   Lumen受到 **Android Vulkan** 的支持，可以在移动设备渲染器上使用。在不受支持的移动平台上使用动态光照的游戏需要使用无阴影的[天空光照](/documentation/zh-cn/unreal-engine/sky-lights-in-unreal-engine)。
-   Lumen目前 **不** 支持虚拟现实（VR）系统。尽管它可以支持VR，但VR所要求的高帧率和高分辨率会使动态全局光照的拟合效果不佳。
-   硬件光线追踪要求：
    -   采用DirectX 12的Windows 10
    -   显卡必须是NVIDIA RTX-2000系列或更高，AMD RX-6000系列或更高。
-   （实验性）Vulkan支持硬件光线追踪，但只包括表面缓存反射光照，尚不支持击中照射。

## Lumen可视化选项

Lumen在虚幻编辑器中提供了几种可以用来可视化数据的方法，对于检验Lumen如何照亮场景并排除问题很有帮助。

Lumen的主要视图模式可以在关卡视口的视图模式菜单下找到。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c28d5969-fa3e-4f78-ae49-4b250f2535d1/lumen-viewmodes-menu.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c28d5969-fa3e-4f78-ae49-4b250f2535d1/lumen-viewmodes-menu.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6984978-0db7-4e6b-b30b-615891c1faca/lumen-overview-viewmode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6984978-0db7-4e6b-b30b-615891c1faca/lumen-overview-viewmode.png)

Lumen视图模式选项

Lumen概览可视化

*点击查看大图。*

*点击查看大图。*

-   **概览（Overview）** 在渲染出的场景上将Lumen的所有三种可视化显示为小图块。
-   **Lumen场景（Lumen Scene）** 以可用的最高质量显示Lumen的场景版本：表面缓存或硬件光线追踪。
-   **几何体法线（Geometry Normals）** 会显示几何体的法线，使全局距离场（软件光线追踪）或Nanite退却网格体（硬件光线追踪）的问题更容易被发现。
-   **反射视图（Reflection View）** 显示Lumen反射呈现出的场景，包括反射所使用的有限追踪距离。
-   **表面缓存（Surface Cache）** 与Lumen场景相同，不同之处在于由于太复杂而难以覆盖的网格体区域将用粉色突出显示。

其他可视化方法可以在关卡视口的 **显示（Show） > 可视化（Visualize）** 菜单中找到。

![显示用于查找网格体距离场和全局距离场的可视化菜单选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1051af2-ede3-4c7a-908e-5219a424bdd8/show-visualization-mdf-gdf.png)

![Lumen Scene View](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f194942-b245-4d3f-8dee-6e5f8c373fa7/scene-view.png)

![Mesh Distance Field Visualization](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7e81312-0ef6-41a1-9ca7-43697f0d81a7/vis-mesh-distance-fields.png)

![Global Distance Field Visualization](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/507fa62d-b950-4400-9037-217e2f1e3a82/vis-global-distance-field.png)

场景视图（Scene View）

网格体距离场可视化（Mesh Distance Fields Visualization）

全局距离场可视化（Global Distance Field Visualization）

-   **网格体距离场（Mesh Distance Fields）** 显示组成场景的单个网格体的有向距离场呈现。
-   **全局距离场（Global Distance Field）** 显示已经合并了单个网格体距离场的低细节距离场。 此外还有一些可以用来可视化其他数据的控制台命令，都可以用于Lumen：
    
-   Lumen 的 **卡片放置（Card Placement）** 可以查看场景中如何使用捕获位置（称为 **卡片（Cards）**）。这些卡是针对每个网格体脱机生成的，用于从多个角度捕获每个网格体的材质属性。使用 `r.Lumen.Visualize.CardPlacement 1` 启用此可视化模式。
-   硬件光线追踪使用 **Nanite退却网格体（Nanite Fallback Mesh）**，此类网格体是使用静态网格体资产的 **退却相关错误（Fallback Relative Error）** 属性生成的。退却网格体用于覆盖Lumen反射中的场景追踪和Nanite光线追踪场景之间的不匹配之处。使用 **显示（Show） > 高级（Advanced） > Nanite网格体（Nanite Meshes）** 禁用Nanite渲染，并查看Lumen使用的退却网格体。

## 故障排除主题

在对场景中任何与Lumen有关的问题进行故障排除时，都建议从 **Lumen概览（Lumen Overview）** 模式开始。

Lumen场景应该以能够显著影响间接光照的方法来匹配主场景视图。Lumen表面缓存视图模式中显眼的粉色区域应该通过在静态网格体设置中提高 **最大Lumen网格体卡片数量（Max Lumen Mesh Cards）** 来解决，或通过将网格体分割成多个部分来解决。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/044f9e31-7975-42a9-851b-6d44d9ffab3c/troubleshooting-topic-1.png)

### 引发问题的网格体

如果使用了导致发生问题的网格体来影响间接光照，则可以使用关卡实例的 **细节（Details）** 面板来禁用以下功能之一，从而在Lumen场景中移除这些网格体：

-   对于 **软件光线追踪（Software Ray Tracing）** ，取消选中 **影响距离场光照（Affect Distance Field Lighting）** 的复选框移除它们。
-   对于 **硬件光线追踪（Hardware Ray Tracing）** ，取消选中 **光线追踪中可见（Visible in Ray Tracing）** 的复选框移除它们。

#### 问题：室内镜面反射中发现斑点瑕疵

镜面反射中出现斑点瑕疵是因为Lumen使用非常低质量的设置来计算多次弹射全局光照，因为没有足够的预算来支持此计算。在后期处理设置中，提高 **Lumen场景质量（Lumen Scene Quality）** 即可减少瑕疵。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00d71502-b440-4ae7-8a0e-8a6fddedbb55/lumen-scene-viewmode-default.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7e954a4-cb92-4ab4-8455-39906d26bcbd/lumen-scene-lighting-quality-4.png)

Lumen场景视图模式

将Lumen场景光照质量提升到4

#### 问题：小网格体在镜面反射中是黑色

小网格体在镜面反射中显示为黑色，是因为Lumen从Lumen场景中剔除了小object以提高性能。在后期处理设置中，提高 **Lumen场景细节（Lumen Scene Detail）** 即可捕获较远距离处的小网格体。

![Lumen场景视图模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f14eeef5-10fb-4bf4-84dc-0f29d19a11d5/troubleshooting-topic-black-meshes-1.png)

![Lumen场景细节提升](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2947168b-9b0c-42b6-9e55-8129c76e607f/troubleshooting-topic-black-meshes-2.png)

Lumen场景视图模式

Lumen场景细节提升

#### 问题：天空遮蔽和全局光照在200米处消失

天空遮蔽和全局观照只能维持在Lumen场景的最初200米内。在后期处理设置中，提高 **Lumen场景视野距离（Lumen Scene View Distance）** 即可捕获较远距离处的小网格体。

#### 问题：大型洞穴式区域中发生光线泄漏

在洞穴式或封闭的区域中，如果发生光线泄漏，是因为Lumen限制了光线追踪距离以提高性能，但缺少遮挡物会导致光线泄漏。

在后期处理设置中，提高 **Lumen场景细节（Lumen Scene Detail）** 和 **最大追踪距离（Max Trace Distance）** 。

例如，下面的网格体是从外面看不到孔的封闭式盒子。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d18eba1-0cf2-403e-b472-c5a5fbfa101d/troubleshooting-topic-enclosed-box-1.png)

在盒子中，可以看到天空光照在场景中泄露了出来。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88423303-449c-487c-bf81-6585c11af7c7/troubleshooting-topic-enclosed-box-2.png)

提高以下值：

-   Lumen场景视图距离
-   最大追踪距离

光线泄漏问题现在应该已经解决。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28f1da94-153c-4fdb-b446-4f74d3a774ee/troubleshooting-topic-enclosed-box-3.png)

#### 问题：光照变化传播到全局光照的速度太慢

在改变Lumen全局光照或将其关闭时，场景中的光照变化太慢，从而导致光线看起来是在慢慢变淡，而不是快速亮起或熄灭。

例如，关闭以下场景中的天空光照，就会看到光照慢慢淡出。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/180efba9-d93d-431f-8c0b-3263aecf39f1/troubleshooting-topic-lumen-update-speed-1.gif)

通过提升后期处理体积设置中的 **最终采集光照更新速度（Final Gather Lighting Update Speed）** ，来提升Lumen全局光照变化的速度。

可以看到天空光照熄灭的速度比以前更快。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c5e16c1-cc37-4909-887e-ccb6ddf6e601/troubleshooting-topic-lumen-update-speed-2.gif)

请记得在更改之后将这些设置恢复成默认值，以降低光照成本。

#### 问题：小型发光网格体无法一致地照亮场景

小Object被剔除出Lumen场景，仅保留场景追踪来捕捉小型发光网格体。这就导致场景光照中出现不一致。从 **细节（Details）** 面板中设置关卡实例 **发光的光源（Emissive Light Source）**。

![Lumen场景视图模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f8cb266-0cc3-48dd-9503-c31df187d746/troubleshooting-topic-emissive-1.png)

![启用发光的光源属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/959c7428-ac00-4bb4-beab-f05a80aba728/troubleshooting-topic-emissive-2.png)

Lumen场景视图模式

启用发光的光源属性

#### 问题：希望牺牲性能来获得最高质量的镜面反射

默认情况下，Lumen使用表面缓存来照亮反射光线，因为这样可以更快地进行渲染。但是，通过设置以下选项，可以配置亮度来评估击中点上的光线：

-   在项目设置中，将 **光线光照模式（Ray Lighting Mode）** | 设置为 **反射的击中照射（Hit Lighting for Reflections）** 。
-   这会改变整个项目的光照。
-   在后期处理体积中，将 **光线光照模式（Ray Lighting Mode）** | 设置为 **反射的击中照射（Hit Lighting for Reflections）** 。
    -   非常适合进行个别更改，这样只需要单个照射或视点。

在下面的示例场景中，注意墙壁和台阶上的高光度高光是如何在反射中消失的。

![Lumen表面缓存](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96e86f2a-bc33-47c2-88e6-b2a10553b23e/troubleshooting-topic-reflection-quality-1.png)

![Lumen-反射的击中照射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8808447-fc20-4b24-ae16-3d83e7071e12/troubleshooting-topic-reflection-quality-2.png)

Lumen表面缓存

Lumen-反射的击中照射

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [global illumination](https://dev.epicgames.com/community/search?query=global%20illumination)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [表面缓存](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E8%A1%A8%E9%9D%A2%E7%BC%93%E5%AD%98)
-   [屏幕追踪](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E5%B1%8F%E5%B9%95%E8%BF%BD%E8%B8%AA)
-   [Lumen光线追踪](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#lumen%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA)
-   [软件光线追踪](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E8%BD%AF%E4%BB%B6%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA)
-   [软件光线追踪的限制](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E8%BD%AF%E4%BB%B6%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA%E7%9A%84%E9%99%90%E5%88%B6)
-   [硬件光线追踪](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E7%A1%AC%E4%BB%B6%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA)
-   [大型开放世界](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E5%A4%A7%E5%9E%8B%E5%BC%80%E6%94%BE%E4%B8%96%E7%95%8C)
-   [远场](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E8%BF%9C%E5%9C%BA)
-   [Lumen功能的一般性限制](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#lumen%E5%8A%9F%E8%83%BD%E7%9A%84%E4%B8%80%E8%88%AC%E6%80%A7%E9%99%90%E5%88%B6)
-   [Lumen的平台支持](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#lumen%E7%9A%84%E5%B9%B3%E5%8F%B0%E6%94%AF%E6%8C%81)
-   [Lumen可视化选项](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#lumen%E5%8F%AF%E8%A7%86%E5%8C%96%E9%80%89%E9%A1%B9)
-   [故障排除主题](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4%E4%B8%BB%E9%A2%98)
-   [引发问题的网格体](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E5%BC%95%E5%8F%91%E9%97%AE%E9%A2%98%E7%9A%84%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [问题：室内镜面反射中发现斑点瑕疵](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E9%97%AE%E9%A2%98%EF%BC%9A%E5%AE%A4%E5%86%85%E9%95%9C%E9%9D%A2%E5%8F%8D%E5%B0%84%E4%B8%AD%E5%8F%91%E7%8E%B0%E6%96%91%E7%82%B9%E7%91%95%E7%96%B5)
-   [问题：小网格体在镜面反射中是黑色](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E9%97%AE%E9%A2%98%EF%BC%9A%E5%B0%8F%E7%BD%91%E6%A0%BC%E4%BD%93%E5%9C%A8%E9%95%9C%E9%9D%A2%E5%8F%8D%E5%B0%84%E4%B8%AD%E6%98%AF%E9%BB%91%E8%89%B2)
-   [问题：天空遮蔽和全局光照在200米处消失](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E9%97%AE%E9%A2%98%EF%BC%9A%E5%A4%A9%E7%A9%BA%E9%81%AE%E8%94%BD%E5%92%8C%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7%E5%9C%A8200%E7%B1%B3%E5%A4%84%E6%B6%88%E5%A4%B1)
-   [问题：大型洞穴式区域中发生光线泄漏](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E9%97%AE%E9%A2%98%EF%BC%9A%E5%A4%A7%E5%9E%8B%E6%B4%9E%E7%A9%B4%E5%BC%8F%E5%8C%BA%E5%9F%9F%E4%B8%AD%E5%8F%91%E7%94%9F%E5%85%89%E7%BA%BF%E6%B3%84%E6%BC%8F)
-   [问题：光照变化传播到全局光照的速度太慢](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E9%97%AE%E9%A2%98%EF%BC%9A%E5%85%89%E7%85%A7%E5%8F%98%E5%8C%96%E4%BC%A0%E6%92%AD%E5%88%B0%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7%E7%9A%84%E9%80%9F%E5%BA%A6%E5%A4%AA%E6%85%A2)
-   [问题：小型发光网格体无法一致地照亮场景](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E9%97%AE%E9%A2%98%EF%BC%9A%E5%B0%8F%E5%9E%8B%E5%8F%91%E5%85%89%E7%BD%91%E6%A0%BC%E4%BD%93%E6%97%A0%E6%B3%95%E4%B8%80%E8%87%B4%E5%9C%B0%E7%85%A7%E4%BA%AE%E5%9C%BA%E6%99%AF)
-   [问题：希望牺牲性能来获得最高质量的镜面反射](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E9%97%AE%E9%A2%98%EF%BC%9A%E5%B8%8C%E6%9C%9B%E7%89%BA%E7%89%B2%E6%80%A7%E8%83%BD%E6%9D%A5%E8%8E%B7%E5%BE%97%E6%9C%80%E9%AB%98%E8%B4%A8%E9%87%8F%E7%9A%84%E9%95%9C%E9%9D%A2%E5%8F%8D%E5%B0%84)
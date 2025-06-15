# 虚幻引擎Lumen性能指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lumen-performance-guide-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:15:05.131Z

---

目录

![Lumen性能指南](https://dev.epicgames.com/community/api/documentation/image/2a15da1a-f6c9-4bd1-8a55-7e001ce184e9?resizing_type=fill&width=1920&height=335)

Lumen的目标是，能够在主机上分别以8毫秒和4毫秒的帧预算实现30和60FPS，并为不透明和半透明材质以及体积雾实现全局光照和反射效果。引擎采用了一系列预先配置好的"可扩展/弹性（Scalability）"设置让Lumen应对不同的目标帧率需求。**超高（Epic）** 级别对应的帧率为30FPS。**高（High）** 级别对应的目标帧率为60FPS。

Lumen依赖[时间上采样](/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine)和虚幻引擎5的[时间超级分辨率](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine)（TSR）功能来提供4k输出。Lumen和一些其他功能本身只使用较低的内部分辨率（1080p），这样能赋予TSR最佳的最终图像质量。否则，如果直接以4K原生分辨率渲染这些功能，则需要降低质量设置，这样才能实现30或60 FPS的帧率。

## 可扩展性设置

你可以在关卡编辑器中的 **设置（Settings）> 引擎可扩展性设置（Engine Scalability Settings）** 视口下找到可扩展性设置。在游戏中，请使用GameUserSettings和图形设置菜单来控制可扩展性设置（相关示例请参阅[Lyra](/documentation/zh-cn/unreal-engine/lyra-sample-game-in-unreal-engine)项目）。Lumen的品质可以通过 **全局光照（Global Illumination）** 和 **反射（Reflections）** 质量组进行设置：

-   **电影级（Cinematic）** 可扩展性级别适合用于[影片渲染队列](/documentation/404)。
    
-   **超高（Epic）** 可扩展性级别的性能目标是在主机上实现30 FPS。
    
-   **高（High）** 可扩展性级别的性能目标是在主机上实现60 FPS。
    
-   **低（Low）** 和 **中（Medium）** 可扩展性级别下，Lumen功能会被禁用。
    

![引擎可扩展性设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2cdedc5-6187-4bf6-a5f8-c22d97ab7a13/engine-scalability-settings.png)

默认情况下，虚幻引擎在主机上的性能目标是30 FPS。如需以60 FPS为目标，将 **全局光照（Global Illumination）** 和 **反射（Reflections）** 质量组设置为 **高（High）** 。相关配置描述位于 `[你的项目名称]\Platforms[主机]\Config\` 文件夹。例如，`[你的项目名称]\Platforms\PS5\Config\PS5DeviceProfiles.ini` 。

例如，以60 FPS为目标的PlayStation 5的设备描述如下所示：

```cpp
    [PS5 DeviceProfile]
    ;将Lumen GI和反射质量设置为"高"，目标为60 fps
    +CVars=sg.GlobalIlluminationQuality=2
    +CVars=sg.ReflectionQuality=2
```

## 其他质量级别(不启用Lumen)

**全局光照（Global Illumination）** 和 **反射（Reflections）** 的默认质量设置位于 `\Engine\Config\BaseScalability.ini` 中。这些设置会试图让间接光照的品质在不同质量级别下保持相似。这么做的额外好处是，你无需在不同平台上重新设置你的光照参数，同时还能缩减Lumen的开销。

中质量级别

-   对于大规模的环境光遮蔽， **距离场环境光遮蔽（Distance Field Ambient Occlusion）** 会取代 **Lumen全局光照（Lumen Global Illumination）** 。
-   对于小规模的环境光遮蔽，会启用 **屏幕空间环境光遮蔽（Screen Space Ambient Occlusion）** 。

低质量级别

-   仅使用无阴影的天空光照。
-   降低天空光照强度（`r.SkylightIntensityMultiplier=0.7`），以近似模拟 **中（Medium）** 质量级别中的效果，因为此时没有天空光照阴影。

### 软件光线追踪

[软件光线追踪](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E8%BD%AF%E4%BB%B6%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA)是Lumen中最快速的追踪方法，我们建议将其用于无法负担硬件光线追踪的游戏，或作为不支持硬件光线追踪的GPU的备用方法。

**超高（Epic）** 可扩展性级别会启用 **细节追踪（Detail Traces）** 。这类追踪可带来更高的质量，但会产生庞大的性能开销。追踪的对象是单个网格体距离场。这会使性能容易受到实例数和重叠实例数的影响。如果使用过多的设计元素，并且带有大量相互重叠的网格体，细节追踪将产生巨大开销。你可以禁用 **影响距离场光照（Affects Distance Field Lighting）** ，移除个别距离场实例，不在距离场场景中渲染它们。不太重要的实例对全局光照或反射没有重大影响，移除它们有助于降低细节追踪的开销。

就细节追踪而言，与软件光追相比，可以相似的性能开销提供更高的质量。[硬件光追](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#%E7%A1%AC%E4%BB%B6%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA)可以相似的性能开销提供更高的质量。

**高（High）** 扩展性级别会禁用细节追踪，并且Lumen会追踪一个合并后的全局距离场，而非单个网格体距离场。追踪全局距离场会使追踪不受实例的数量及其与其他实例的重叠的影响。它还非常适合用于具有大量重叠实例的内容。

### 硬件光线追踪

硬件光线追踪能提升Lumen的品质。我们推荐将它作为主机上30 fps和60 fps游戏的默认选项。它的开销比软件光线追踪要高得多，需要对场景进行细致优化，因为它对大量重叠示例十分敏感。

硬件光追要求逐帧重建 **顶层加速结构（Top Level Acceleration Structure）** （TLAS）。此开销与该加速结构中的实例数量成正比。在次世代主机上实现良好的性能通常意味着，在剔除阶段后， **光线追踪场景** 中的实例数量少于10万个。在微软的Windows平台上，实例数量可能会有所差异。

使用 `Stat SceneRendering` 检检查光追场景中可见的实例数。具体可见 **光线追踪激活实例（Ray tracing active instances）** 统计数据。

![统计数据场景渲染](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef1e22bc-6e6a-4b1c-8dd2-8cadea3ac90b/stat-scenerendering.png)

光追场景剔除设置是用来控制场景内光追实例数量的最有用的工具。光追剔除功能是默认启用的，这可以简化其设置过程，但你也可以在 `[你的项目名称]\Config\` 文件夹中的 **DefaultEngine.ini** 配置文件中进行额外更改，可以启用。

```cpp
    [SystemSettings]
    r.RayTracing.Culling=3
    r.RayTracing.Culling.Radius=15000
    r.RayTracing.Culling.Angle=0.5
```

在关卡中的Actor上禁用 **在光线追踪中可见（Visible In Ray Tracing）** ，可从光线追踪场景中移除单个实例。

如需详细了解硬件光线追踪性能，包括性能计数器和调试视图，请参阅[光线追踪性能指南](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine)。

**远场（Far Field）** 可以在不损失全局光照和反射距离的情况下，提供激进式的剔除。超出光追场景半径之后，所有光线都使用远场追踪，以较低开销扩展全局光照和反射的范围。[Lumen技术细节](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine)提供了如何设置远场的信息。

将增加光线追踪场景剔除与远场配合使用，可帮助你优化和缩减Lumen硬件光线追踪性能。

硬件光追性能取决于场景中网格体的重叠程度。例如天空盒等会与整个场景重叠的大型网格体会造成一些性能问题。因此需要禁用这类网格体的 **在光线追踪中可见（Visible In Ray Tracing）** 选项。草地网格，以及一些相互穿插、彼此重叠的网格体，也适合禁用硬件光追来节省性能。

如需在使用硬件光线追踪时保持场景的高性能，你必须将重叠网格体的数量保持在合理的水平。

**反射命中光照（Hit Lighting for Reflections）** 能提升画面的反射品质。这种算法会在光线每次击中对象时，对材质和光照求值，但对游戏来说，这类开销较大，所以我们不建议在游戏中使用它，除非场景材质比较简单，并通过 **Ray Tracing Quality Switch** 节点进行了优化。在主机平台上，你可以使用 `r.Lumen.HardwareRayTracing.MaxIterations` 来限制BVH遍历迭代的次数，并提前终止那些漫长而又昂贵的光线。被终止的光线被视为完全遮挡，产生零辐射（zero radiance），导致过度遮挡。此设置适用于微调性能，以及避免场景中因大量重叠几何体导致性能问题。

## 小提示

**Lumen反射** 的开销可能会因屏幕中的平滑（或低粗糙度）的材质数量而有所不同。这类材质需要专门的反射光线。默认情况下，所有粗糙度低于0.4的像素都将追踪反射光线。高于0.4的像素则会根据Lumen的全局光照，获得"免费"的反射近似效果。。

### Lumen反射粗糙度阈值

你可以使用 **后期处理体积（Post Process Volume）** 中的 **要追踪的最大粗糙度(Max Roughness To Trace)** 设置来控制粗糙度阈值。你还可以使用 `r.Lumen.Reflections.MaxRoughnessToTraceClamp` 的伸缩性设置来进一步限制该阈值。粗糙度低于该阈值的像素将追踪专门的**Lumen反射（Lumen Reflection）** 光线，而粗糙度高于该阈值的像素会退回到无粗糙镜面反射近似值。

植被采用独立的粗糙度阈值。所有使用 **双面植被（Two Sided Foliage）** 或 **次表面（Subsurface）** 着色模型的材质像素都会被视为植被类型。你可以使用 `r.Lumen.Reflections.MaxRoughnessToTraceForFoliage`控制植被粗糙度。需要专门反射光线的像素可以通过 **性能概览（Performance Overview）** 视图模式查看，该模式位于视图模式（View Modes）菜单下的关卡视口中。

![Lumen性能视图模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d23bdf9-287c-42c6-b183-024aedcb1bbf/lumen-performance-view-mode.png)

植被上的反射往往难以看到。将植被最大粗糙度阈值设置为0，可以在不影响质量的情况下实现一些显著的性能提升。

### 用屏幕空间反射取代Lumen反射

用 **屏幕空间反射** （SSR）取代Lumen反射，可以更大幅度地缩减反射开销。只需设置成 r.Lumen.Reflections.Allow=0 即可。例如，你可以将以下内容添加到 XSXDeviceProfiles.ini 文件中，从而在Xbox Series S上节约1 毫米。

```cpp
    [XSX_Lockhart DeviceProfile]
    ;使用SSR代替Lumen反射以提高性能
    +CVars=r.Lumen.Reflections.Allow=0
```

下例演示了即使在禁用了Lumen反射的情况下，Lumen全局光照仍能提供粗糙镜面反射。

![禁用了Lumen反射的Lumen GI镜面反射示例。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cabd9fda-eec7-46f1-bf64-fec44528cea0/lumen-gi-lumen-reflections-disabled.png)

通过复用那些用于漫反射全局光照的追踪光线，可以让Lumen反射获得一些性能提升。这种方法带来的性能加速只适用于那些像素材质粗糙度集中在0.2-0.4范围的场景。使用 `r.Lumen.Reflections.RadianceCache=1` 来启用此功能。

### 表面缓存图块更新

**Lumen场景光照（Lumen Scene Lighting）** 会更新表面缓存中的直接和间接光照。性能开销取决于每帧更新的表面缓存的比例。你可以使用 `r.LumenScene.DirectLighting.MaxLightsPerTile` 和 `r.LumenScene.Radiosity.UpdateFactor` 分别调整直接光照和间接光照的每帧更新速度。

"Lumen场景光照（Lumen Scene Lighting）"在每个表面缓存图块上只选择一小部分最重要的光源，这使其性能不太容易受到场景中光源总数的影响。每个图块的光源数量可由 `r.LumenScene.DirectLighting.MaxLightsPerTile` 控制。

### Lumen性能分析

Lumen可分解成三个通道（pass）：

-   **Lumen场景光照（Lumen Scene Lighting）** ，用于对表面缓存光照求值。
-   **Lumen屏幕探头采集（Lumen Screen Probe Gather）** ，用于对漫反射全局光照和粗糙反射以及半透明全局光照求值。
-   **Lumen反射（Lumen Reflections）** ，用于对光滑表面上的专用反射光线求值。

`Stat GPU` 命令可用于显示GPU各个通道的耗时，其中也包括Lumen的几个通道。

![Stat GPU](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1cd5895-0ac6-4849-a678-cc743b99fdb4/stat-gpu.png)

如需详细了解性能明细，请使用 `ProfileGPU` 命令。你可以使用第三方分析工具，如RenderDoc。

Lumen在主机上使用异步计算。这些计时将为零，直到你使用控制台命令 `r.Lumen.AsyncCompute 0` 禁用它。如需更详细地了解异步计算，请参阅下一小节。

## 异步计算

Lumen在主机平台上使用 **异步计算** 。这便于GPU将Lumen的工作与非Nanite几何体通道以及直接光照通道相重叠。此外，Lumen还可与 **Lumen屏幕探头采集（Lumen Screen Probe Gather）** 和 **Lumen反射（Lumen Reflections）** 通道重叠。

![异步计算图形通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59490b88-ac8b-4d74-9510-e152aa6bea72/async-compute.png)

异步计算已经针对各种常见工作进行了默认配置，但在某些情况下，采用非默认设置可能更快一些。我们遇到过的其中一个案例是，当 **Lumen屏幕探头采集（Lumen Screen Probe Gather）** 通道由于有大量直接光照或阴影贴图在显卡队列中运行而不能与 **Lumen反射（Lumen Reflections）** 通道重叠时，将Lumen完全作为异步计算通道运行可能更好。要这么做，请进行以下设置：

```cpp
    r.LumenScene.Lighting.AsyncCompute=1
    r.Lumen.DiffuseIndirect.AsyncCompute=1
    r.Lumen.Reflections.AsyncCompute=1
```

异步计算会使Lumen与其他渲染通道重叠。这会增加分析的难度，因为 `Stat GPU` 或 `ProfileGPU` 无法正确跟踪计时。在分析和比较完整渲染帧时间或使用外部GPU分析工具时，请禁用异步计算。

## 可扩展性参考

在引擎的默认可扩展性设置中，以及各平台的设备描述配置中，都包含单独的Lumen设置。这些设置对于你了解渲染器最新的性能可扩展性设置，有着重要的参考意义。此外，它们也适合作为你的自定义可扩展性设置的起点。我们建议使用默认的可扩展性级别来实现30 FPS或60 FPS，同时也是为了让不同的质量级别下具有一致的外观。你可以在以下文件中查看这些可扩展性设置：

```cpp
    [Engine Root]\Engine\Config\BaseScalability.ini
    [Engine Root]\Platforms[Console Name]\Base[ConsoleName]DeviceProfile.ini
```

下面的参考表包含对各项设置的说明，以及各可扩展性级别使用的设置状态。

### 通用

设置名称

高

超高

电影级

说明

`r.Lumen.TraceMeshSDFs.Allow`

0

1

1

为 **软件光线追踪（Software Ray Tracing）** 启用 **细节追踪（Detail Traces）** 。细节追踪会因追踪单个网格体距离场而招致严重性能损失，但可提高质量，尤其是表面缓存直接光照质量。

### Lumen场景光照

Lumen场景光照的性能取决于每帧更新的表面缓存的比例，此外还取决于半透明全局光照体积的分辨率。

设置名称

高

超高

电影级

说明

`r.LumenScene.DirectLighting.UpdateFactor`

32

32

32

应每帧更新一次直接光照的一小部分表面缓存区域。设置较高的值可提高性能，但会使光照变化的响应速度下降。

`r.LumenScene.Radiosity.UpdateFactor`

64

64

64

应每帧更新一次间接光照的一小部分表面缓存区域。设置较高的值可提高性能，但会使光照变化的响应速度下降。

`r.LumenScene.Radiosity.ProbeSpacing`

8

4

4

表面缓存间接光照探头之间的间距。设置较低的值可以提高表面缓存中的间接光照的空间分辨率，但代价是性能下降。

`r.LumenScene.Radiosity.HemisphereProbeResolution`

3

4

4

表面缓存间接光照探头的分辨率。

`r.Lumen.TranslucencyVolume.GridPixelSize`

64

32

32

控制半透明全局光照体积的分辨率。

### 屏幕探头采集

全局光照性能取决于内部渲染分辨率和屏幕探头追踪分辨率。

设置名称

高

超高

电影级

说明

`r.Lumen.ScreenProbeGather.RadianceCache.ProbeResolution`

16

32

32

控制每个辐射缓存探头的追踪数。设置较高的值可提高质量，但性能会下降。

`r.Lumen.ScreenProbeGather.RadianceCache.NumProbesToTraceBudget`

300

300

1000

每帧要更新的辐射缓存探头数。设置较高的值可提高质量，但性能会下降。

`r.Lumen.ScreenProbeGather.DownsampleFactor`

32

16

8

允许在不受内部渲染分辨率影响的情况下对全局光照进行下采样。

`r.Lumen.ScreenProbeGather.TracingOctahedronResolution`

8

8

16

确定每个探头完成的追踪数。设置较高的值会使追踪速度减慢，但会提高全局光照质量。

`r.Lumen.ScreenProbeGather.TwoSidedFoliageBackfaceDiffuse`

0

1

1

**双面植被（Two Sided Foliage）** 和 **次表面（Subsurface）** 着色模型是否沿背面采集光照。

`r.Lumen.ScreenProbeGather.ScreenTraces.HZBTraversal.FullResDepth`

0

1

1

屏幕空间追踪是否应对全分辨率深度采样。启用它可以提高屏幕空间追踪的准确度，但性能会有所下降。

`r.Lumen.ScreenProbeGather.ShortRangeAO`

1

1

1

控制添加到全局光照之上的小规模环境光遮蔽。你可以禁用它来提升性能，但会导致接触阴影中出现明显的细节损失。

### 反射

**Lumen反射（Lumen Reflections）** 性能取决于专用反射光线的数量。只有粗糙度值低于阈值的像素才会被追踪。影响性能的另一个重要因素是内部渲染分辨率和反射分辨率。

设置名称

高

超高

电影级

说明

`r.Lumen.Reflections.DownsampleFactor`

2

1

1

是否在不受内部渲染分辨率影响的情况下对反射进行下采样。

`r.Lumen.Reflections.MaxRoughnessToTrace`

1.0

1.0

1.0

项目和后期处理体积的最大粗糙度限定为此值。这允许从可伸缩性的设置中控制专用反射光线的数量。

`r.Lumen.Reflections.MaxRoughnessToTraceForFoliage`

0.2

0.4

0.4

应追踪植被上的专用反射光线的最大粗糙度值。

`r.Lumen.TranslucencyReflections.FrontLayer.Allow`

0

1

1

是否允许从后期处理体积启用半透明材质上的高质量反射。

`r.Lumen.TranslucencyReflections.FrontLayer.Enable`

0

0

1

默认情况下是否启用半透明材质上的高质量反射。

-   [performance](https://dev.epicgames.com/community/search?query=performance)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [global illumination](https://dev.epicgames.com/community/search?query=global%20illumination)
-   [lumen](https://dev.epicgames.com/community/search?query=lumen)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [可扩展性设置](/documentation/zh-cn/unreal-engine/lumen-performance-guide-for-unreal-engine#%E5%8F%AF%E6%89%A9%E5%B1%95%E6%80%A7%E8%AE%BE%E7%BD%AE)
-   [其他质量级别(不启用Lumen)](/documentation/zh-cn/unreal-engine/lumen-performance-guide-for-unreal-engine#%E5%85%B6%E4%BB%96%E8%B4%A8%E9%87%8F%E7%BA%A7%E5%88%AB\(%E4%B8%8D%E5%90%AF%E7%94%A8lumen\))
-   [软件光线追踪](/documentation/zh-cn/unreal-engine/lumen-performance-guide-for-unreal-engine#%E8%BD%AF%E4%BB%B6%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA)
-   [硬件光线追踪](/documentation/zh-cn/unreal-engine/lumen-performance-guide-for-unreal-engine#%E7%A1%AC%E4%BB%B6%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA)
-   [小提示](/documentation/zh-cn/unreal-engine/lumen-performance-guide-for-unreal-engine#%E5%B0%8F%E6%8F%90%E7%A4%BA)
-   [Lumen反射粗糙度阈值](/documentation/zh-cn/unreal-engine/lumen-performance-guide-for-unreal-engine#lumen%E5%8F%8D%E5%B0%84%E7%B2%97%E7%B3%99%E5%BA%A6%E9%98%88%E5%80%BC)
-   [用屏幕空间反射取代Lumen反射](/documentation/zh-cn/unreal-engine/lumen-performance-guide-for-unreal-engine#%E7%94%A8%E5%B1%8F%E5%B9%95%E7%A9%BA%E9%97%B4%E5%8F%8D%E5%B0%84%E5%8F%96%E4%BB%A3lumen%E5%8F%8D%E5%B0%84)
-   [表面缓存图块更新](/documentation/zh-cn/unreal-engine/lumen-performance-guide-for-unreal-engine#%E8%A1%A8%E9%9D%A2%E7%BC%93%E5%AD%98%E5%9B%BE%E5%9D%97%E6%9B%B4%E6%96%B0)
-   [Lumen性能分析](/documentation/zh-cn/unreal-engine/lumen-performance-guide-for-unreal-engine#lumen%E6%80%A7%E8%83%BD%E5%88%86%E6%9E%90)
-   [异步计算](/documentation/zh-cn/unreal-engine/lumen-performance-guide-for-unreal-engine#%E5%BC%82%E6%AD%A5%E8%AE%A1%E7%AE%97)
-   [可扩展性参考](/documentation/zh-cn/unreal-engine/lumen-performance-guide-for-unreal-engine#%E5%8F%AF%E6%89%A9%E5%B1%95%E6%80%A7%E5%8F%82%E8%80%83)
-   [通用](/documentation/zh-cn/unreal-engine/lumen-performance-guide-for-unreal-engine#%E9%80%9A%E7%94%A8)
-   [Lumen场景光照](/documentation/zh-cn/unreal-engine/lumen-performance-guide-for-unreal-engine#lumen%E5%9C%BA%E6%99%AF%E5%85%89%E7%85%A7)
-   [屏幕探头采集](/documentation/zh-cn/unreal-engine/lumen-performance-guide-for-unreal-engine#%E5%B1%8F%E5%B9%95%E6%8E%A2%E5%A4%B4%E9%87%87%E9%9B%86)
-   [反射](/documentation/zh-cn/unreal-engine/lumen-performance-guide-for-unreal-engine#%E5%8F%8D%E5%B0%84)
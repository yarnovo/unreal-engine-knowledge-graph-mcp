# 虚幻引擎中的时间超级分辨率 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:22:33.582Z

---

目录

![时间超级分辨率](https://dev.epicgames.com/community/api/documentation/image/0626e441-3b85-4105-bb3a-490750da1c63?resizing_type=fill&width=1920&height=335)

**时间超级分辨率** （TSR）是一个与平台无关的[时间分辨率修改器](/documentation/zh-cn/unreal-engine/temporal-upscalers-in-unreal-engine)，它使虚幻引擎能够渲染美丽的4K图像。由于将一些开销大的渲染计算分摊到了许多帧，图像的开销只占一小部分。TSR的做法是渲染比虚幻引擎4中的时间抗锯齿上采样（TAAU）更低的内部分辨率。

TSR提供了一种原生的高质量上采样技术，以满足次世代游戏的需求。它实现了[Nanite](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)几何体要求的保真度和细节所需的可能性，同时以低得多的分辨率渲染帧，从而为[Lumen](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)提供足够的性能。

下面的比较展示了在原生4K分辨率下渲染的帧与在1080p经分辨率修改而成的4K分辨率下渲染的帧之间的质量和性能差异。使用TSR，可以实现接近4K分辨率的图像质量，同时还可将GPU帧时减半。

![按原生4K分辨率渲染的4K帧。帧时：57.50毫秒](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6608f191-3e83-4afb-998b-56c014099549/7-tsr-1.png)

![使用1080p分辨率渲染的4K帧。帧时：33.37ms](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e97ac6c1-2440-4632-99c8-cc409dc563a0/7-tsr-2.png)

按原生4K分辨率渲染的4K帧。帧时：57.50毫秒

使用1080p分辨率渲染的4K帧。帧时：33.37ms

两者均为4K图像。如果你要对比图像的完全未压缩分辨率，请右键点击各个图像并将其保存到计算机。

时间超级分辨率具有以下属性：

-   在输入分辨率低至1080p的情况下，渲染帧接近原生4K的质量。
-   相比于采用虚幻引擎4的默认抗锯齿方法，即时间抗锯齿，高频率背景上的可见"重影"瑕疵更少。
-   减少高复杂性几何体频闪，例如通过Nanite渲染的那些。
-   在主机平台上支持动态分辨率缩放。
-   可在支持D3D11、D3D12、Vulkan、Metal、PlayStation 5和Xbox Series S | X的所有硬件上运行，着色器专门针对PlayStation 5和Xbox Series S | X GPU架构进行了优化。

在渲染链中，时间超级分辨率在景深之后发生，后续所有内容都会进行分辨率修改，例如动态模糊、泛光等等。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/599941ca-3d09-49fd-8352-ec2f8e6e2c99/8-pipeline-tsr.png)

## 支持的平台

TSR在支持Shader Model 5及更高版本的所有台式机硬件中的台式机渲染器上可用。以下平台支持时间超级分辨率：

-   Windows D3D11 SM5、D3D12 SM5和SM6、D3D12 SM6，以及Vulkan SM5和SM6
-   Linux Vulkan SM5和SM6
-   Mac Metal SM5和SM6
-   PlayStation 5和Xbox Series S | X

TSR的分辨率修改质量和行为在所有支持的平台中完全相同。但是，TSR已针对PlayStation 5和Xbox Series S | X主机中使用的AMD RDNA GPU专门进行优化，利用16位类型和打包指令。

## TSR的伸缩性

TSR包含很多用于其分辨率修改设置的自定义选项，因此你可以根据项目需求自定义各个平台的分辨率修改设置。以下小节介绍了一些方式，供你在项目中检查TSR，然后进行相应缩放。

### 了解时间细节累积的注意事项

一般来说，作为其功能的重要部分，所有时间分辨率修改器都会有所妥协，TSR也不例外。但是，单纯宣传TSR通过以较低分辨率渲染来提升帧率并不能充分描述该技术的行为和局限性。任何时间分辨率修改技术都存在一个限制，即随着时间的推移会累积分辨率较低的帧以收敛图像，而只有在累积了足够的细节之后才能知晓部分图像的细节，例如第一帧中任何几何体的厚度。

以下面启用和禁用TSR的比较为例，你可以看到随着时间的推移，帧累积起来时，近距离和远距离场景中保留了多少细节。

![启用时间超级分辨率](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3352dc2c-1b34-44d3-aea5-500c4334ed11/tsr-comp-1.png)

![禁用时间超级分辨率](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd731f38-ced0-4235-bce2-3835518ca806/tsr-comp-2.png)

启用时间超级分辨率

禁用时间超级分辨率

示例使用的屏幕百分比是61，并且对于启用TSR的屏幕截图，其辅助分辨率修改（`r.Test.SecondaryUpscaleOverride`）设置为4。

帧的渲染分辨率由 **屏幕百分比（Screen Percentage）** 控制。屏幕百分比控制每帧的可用信息量，收敛所需的其余信息取决于该帧其余待渲染的部分。TSR取决于所渲染帧的分辨率和帧率两个因素。两者会影响细节的累积速度。此行为的主要影响在于，TSR并非仅受GPU限制帧率的影响，例如，当帧受CPU限制或在固定刷新率显示器上使用VSync时，也会受影响。

在编辑器中工作时，TSR帧率统计数据有助于你识别可能影响TSR向整体图像累积的因素。你可以在 **视口选项（Viewport Options）** 菜单的 **统计数据（Stat）> 引擎（Engine）** 下，设置 **TSR** 旁边的复选框。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/084a9bda-beb2-48b3-a722-15152375915a/tsr-scalability-tsr-stats.png)

或者，你可以使用控制台命令 `stat tsr` 打开或关闭TSR统计数据。

与其他统计命令一样，例如显示帧信息的 `stat unit` ，TSR统计数据显示类似的信息，只是添加了两项额外的统计数据，即 **TSR输入** 和 **TSR 1spp** 。

![TSR统计数据](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a63e198-b2dc-4986-8e51-c6c08fa835ba/tsr-stattsr.png)

**TSR输入** 将显示每秒送入TSR的百万像素数，这是一项重要的宏观指标，用于了解TSR需要收敛多少数据才能得到整体图像。也就是 `渲染分辨率宽度 * 渲染分辨率高度 * 帧率 = 显示分辨率宽度 * 显示分辨率高度 * 屏幕百分比^2 * 帧率` 。该指标的优点是，可以在运动中表明宏观图像质量，无需考虑显示分辨率。

下表说明了TSR输入如何修改分辨率：

显示分辨率

屏幕百分比

帧率

TSR输入（MP/s）

4k (3840x2160)

50%

60hz

3840*2160*(50/100)^2\*60 = 124.4 MP/s

4k (3840x2160)

**58%**

60hz

167.4 MP/s

4k (3840x2160)

**66%**

60hz

216.7 MP/s

4k (3840x2160)

50%

**30hz**

62.2 MP/s

4k (3840x2160)

**72% = 50% x sqrt(2)**

**30hz**

124.4 MP/s

**1080p** (1920x1080)

100%

60hz

124.4 MP/s

**1080p** (1920x1080)

**72% = sqrt(0.5)**

60hz

62.2 MP/s

**1080p** (1920x1080)

50%

60hz

31.1 MP/s

**TSR 1spp** 是TSR的收敛速率，即TSR获得足够的数据以达到每个像素一个样本所需的时间。这在运动中尤其重要，因为可能存在需要快速积累细节的解除遮挡。实现公式是 `TSR1spp = 1000 / (屏幕百分比^2 * 帧率)` 。

下表说明了TSR 1spp的收敛：

屏幕百分比

帧率

TSR收敛速率

50%

60hz

1000 / ((50/100)^2 \* 60) = 66.6 ms

**58%**

60hz

49.5 ms

**66%**

60hz

38.2 ms

**100%**

60hz

16.6 ms

50%

30hz

133.3 ms

示例场景说明了在屏幕百分比设置为50时该如何使用这些数据。这意味着你需要 (50/100)^-2 = 4帧，才能让每个像素至少有一个样本。如果每帧渲染需要16.6毫秒，这意味着屏幕上的解除遮挡区域将需要四倍的时间（即66.4ms）才能获得足够的数据。

### 分辨率修改GPU开销

TSR的主要目标是分辨率修改。其大部分GPU工作基于为其提供的分辨率进行缩放。这是由于TSR的部分GPU开销需要在比渲染分辨率更高的显示分辨率下完成。

在编辑器中工作时，使用TSR帧率统计数据有助于你识别可能影响TSR向整体图像累积的因素。为此，你可以在 **视口选项（Viewport Options）** 菜单的 **统计数据（Stat）> 高级（Advanced）** 下，选中 **GPU** 旁边的复选框。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2b3bd8f-47b9-4f2c-9309-3ec79a963f23/tsr-scalability-gpu-stats.png)

显示GPU统计数据时，你可以在视口选项菜单中重载 **屏幕百分比（Screen Percentage）** ，以查看按 **100%** 和 **50%** 屏幕百分比渲染时，性能有何差异。这可以让你了解经过分辨率修改后的显示分辨率将如何影响项目的性能。下面的示例使用[《遗迹峡谷》](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine)示例项目展示了这种对比。

 

 

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1880983-0b2b-4912-995f-1b3a8c5bf463/9-tsr-stats-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1880983-0b2b-4912-995f-1b3a8c5bf463/9-tsr-stats-1.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2948bec-0284-4746-bc3e-36ad792766eb/9-tsr-stats-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2948bec-0284-4746-bc3e-36ad792766eb/9-tsr-stats-2.png)

在r.ScreenPercentage=100时约0.79毫秒

在r.ScreenPercentage=50时约0.43毫秒

点击查看大图

TSR的视差启发法依赖深度和速度缓冲，而不是帧的场景颜色和半透明度。因为深度和速度缓冲在GPU上的完成时间通常远早于场景颜色和半透明度缓冲的完成时间。这样整个TSR视差启发法就可以在GPU上进行异步计算，用 `r.TSR.AsyncComputer=1` 填补因GPU未得到其他渲染算法充分利用而产生的空白。

例如，在PlayStation 5和Xbox Series X上的《堡垒之夜》第4章，TSR异步计算抵消TSR总GPU开销的约0.5ms。在测试整个《空降行动》性能重播过程中的性能时,节省了约0.1ms，从而将有效TSR开销压低到1.5ms，并将完成帧渲染的关键路径GPU开销压低至1.1ms。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d8c0756-6cc1-4532-9cff-de6f5a4dd519/tsr-gpucost-3.png)

### 抗锯齿可伸缩性组

TSR的GPU开销随着使用屏幕百分比渲染的屏幕分辨率而变化。TSR适用于所有支持SM5及更高版本的GPU，但TSR需要具备GPU运行时开销，用于较旧且功能没那么强大的GPU。这是TSR与其他第三方时间分辨率修改解决方案的区别之一，它提供面向用户的可扩展伸缩性控制，以独立于屏幕渲染分辨率来控制分辨率修改、抗锯齿质量和运行时GPU成本。**引擎伸缩性设置（Engine Scalability Settings）** 为这些伸缩性选项提供了基准。

下图显示了屏幕的渲染分辨率和抗锯齿质量如何决定TSR的分辨率修改类型。较低的屏幕百分比需要进行极致的分辨率修改，但最终的成本效益更高。然而，任何高于100%且具有 **高** 及以上伸缩性级别的屏幕百分比都会被超级采样，并且GPU会自此开始上升。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8b5f102-4972-45ee-946f-1cc67653a3d1/tsr-aa-scalabilitygroup-graph.png)

仅当目标显示分辨率大于4K时，或主机平台上有动态分辨率的特殊情况时，才应考虑使用低于50%的屏幕百分比进行极致分辨率修改。

TSR由位于 **设置（Settings） > 引擎伸缩性设置（Engine Scalability Settings）** 下的 **伸缩性组（Scalability Groups）** 卷展栏中的 **抗锯齿（TSR）** 伸缩性组控制。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a94f39ec-a372-4615-a0fe-b30c0454b661/tsr-engine-scalability-settings.png)

在使用 **在编辑器中运行** （PIE）时，引擎伸缩性设置在 **在编辑器中运行3D分辨率（Play-In-Editor 3D Resolution）** 下显示有关屏幕分辨率、屏幕百分比、正在使用的激活视口等信息。在PIE中，你可以使用滑块调整屏幕百分比，或使用下面的任何按钮以根据性能、平衡、质量和原生分辨率进行自动调整。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56a5c22e-4802-4f61-8e5f-7145a93d56f7/tsr-engine-scalability-settings-screen-percentage.png)

编辑器视口具有自己的渲染分辨率，可通过 **视口选项（Viewport Options）** 菜单中的 **屏幕百分比（Screen Percentage）** 设置进行控制。启用 **自定义重载（Custom Override）** 复选框，设置你自己的屏幕百分比。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6edf772c-01f3-4779-ac25-7bd1a7e8a397/tsr-level-editor-screen-percentage-override.png)

或者，你可以使用控制台通过 `sg.AntiAliasingQuality` 设置抗锯齿伸缩性组，其中0 = 低（Low），1 = 中（Medium），2 = 高（High），3 = 超高（Epic），4 = 电影级（Cinematic）品质。

`[虚幻引擎根目录]/Engine/Config` 文件夹中的配置文件 **BaseScalability.ini** 包含所有伸缩性组设置的列表。你可以查看 `AntiAliasingQuality` 分段，了解TSR如何根据所用抗锯齿质量组进行缩放。每个组包含一个控制台变量和值的列表。

你的项目包含自己的配置文件，名为 **DefaultScalability.ini** ，位于 `[项目根目录]/Config` 文件夹中。你可以根据自己项目的需求修改这些控制台变量。 以下是BaseScalability.ini文件中 **高** 抗锯齿质量值的示例：

```cpp
[AntiAliasingQuality@3]
r.FXAA.Quality=4
r.TemporalAA.Quality=2
r.TSR.History.R11G11B10=1
r.TSR.History.ScreenPercentage=200
r.TSR.History.UpdateQuality=3
r.TSR.ShadingRejection.Flickering=1
r.TSR.RejectionAntiAliasingQuality=2
r.TSR.Resurrection=1
```

你可以使用GPU调试器（例如虚幻引擎的GPU分析器、[DumpGPU](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine)）或第三方调试器来检查TSR的抗锯齿分组。选定的 **AntiAlaisingQuality** 组包括 **场景（Scene） > PostProcessing > TemporalSuperResolution** 下的绘制事件的渲染和显示分辨率。

 

 

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4881eb8-e419-45db-b508-fa8cbf600799/tsr-gpu-profiler.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4881eb8-e419-45db-b508-fa8cbf600799/tsr-gpu-profiler.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2e97159-36a4-4221-ab2b-fb7a9d3dad9f/tsr-gpu-dump-viewer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2e97159-36a4-4221-ab2b-fb7a9d3dad9f/tsr-gpu-dump-viewer.png)

GPU分析器

DumpGPU查看器

点击查看大图

当使用 **VisualizeTemporalUpscaler** 显示标记时，在视口的 **显示（Show） > 可视化（Visualize）** 菜单下，左下角的可视化会显示当前正在使用的输入输出和AntiAliasingQuality组：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01c5cb25-b7b1-4c07-83cb-96a7fca798fe/tsr-temporal-upscaler-vis.png)

你可以选择添加自己的抗锯齿伸缩性组，并将组作为单独的设置公开。区分TSR设置与其他抗锯齿选项的一种方法是，添加括号来指示所使用的方法。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8fa2173-4c98-4ef2-8943-91014d165a24/tsr-scalability-antialiasing-tsr-group.png)

对于你自己的项目，你可能需要进一步区分。例如，在《Fortnite》中，支持多种抗锯齿方法。根据低、中、高和超高质量设置，各TSR设置有自己的选项。还有一些额外的参数公开给用户界面。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6b77cac-bef6-44d5-87e2-2a8f854f85fc/tsr-fornite-aa-settings.png)

### 时间分辨率修改的隐藏GPU成本

TSR和其他任何时间分辨率修改器在后期处理渲染链中间出现。这意味着，动态模糊或色调映射器等在TSR之后运行的通道不再使用主屏幕百分比缩放。在缺少带空间分辨率修改器的辅助屏幕百分比（`r.SecondaryScreenPercentage.GameViewport`）的情况下，TSR的输出分辨率按显示分辨率运行，而非按屏幕百分比设置的渲染分辨率运行。

因为这一点，而且TSR为默认开启，所以大量工作将专注于减少在TSR之后发生的通道隐蔽时间分辨率修改开销。

#### 通过TSR优化动态模糊

动态模糊优化在PlayStation 5和Xbox Series X上可带来3倍的动态模糊GPU性能开销改善，这些平台即使在较低分辨率的电视机上也始终显示2160p后台缓冲。因此，考虑到这一点，你可以有以下预期：

-   使用 `stat gpu` 时提高了TSR开销：
    -   比较启用和禁用动态模糊的情况时，TSR开销在使用 `stat gpu` 时可能稍有增加。
    -   启用动态模糊时，TSR会接管其通常按输入分辨率运行的 **速度展平（Velocity Flatten）** 通道。你可以使用控制台命令 `r.MotionBlur.AllowExternalVelocityFlatten` 进行控制，该控制台命令默认启用。
    -   TSR输出半分辨率场景颜色，以减少大型定向动态模糊核中出现的内存带宽瓶颈。你可以使用控制台命令 `r.MotionBlur.HalfResInput` 进行控制，该控制台命令默认启用。
-   定向模糊上的半分辨率：
    -   当在显示分辨率下发生非常大的移动时，定向模糊会自动以半分辨率运行。启用此功能可降低动态模糊的VALU开销。
    -   使用控制台命令 `r.MotionBlur.HalfResGather 1` 启用半分辨率。
-   动态模糊半分辨率和四分之一分辨率：
    -   TSR和动态模糊能够输出半分辨率或四分之一分辨率。这对于全都在动态模糊通道之后运行的高斯景深、卷积泛光、镜头光晕、眼部适应（自动曝光）和局部曝光很重要。

**后期处理质量** 伸缩性组可以缩放一些提到的动态模糊值。你可以在位于 **\[引擎根目录\]/Engine/Config** 文件夹的 **BaseScalability.ini** 配置文件中看到具体的设置。

## 调试时间超级分辨率的工具

TSR的主要优势在于它是一种纯粹的图像处理技术。这意味着所有输入输出都是可见的图像，可以通过内置可视化工具[DumpGPU查看器](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine)或更常见的平台GPU调试工具（如[RenderDoc](/documentation/zh-cn/unreal-engine/using-renderdoc-with-unreal-engine)和[PIX](https://help.pix.online/Windows)）清楚地呈现。

### 可视化时间分辨率修改器的输入输出

有时你需要诊断影响时间分辨率修改的瑕疵。为此，你可以使用 **时间分辨率修改器（Temporal Upscaler）** 显示标记。查看器将显示原始输入输出缓冲，作为诊断这些瑕疵的起始点。

你可以在视口中的 **显示（Show） > 可视化（Visualize）** 下启用此显示标记，并选择 **时间分辨率修改器I/O（TSR、TAAU或第三方插件）** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dabb9f66-80c8-4e7e-83ad-171108bc33ea/tsr-temporal-upscaler-input.png)

时间分辨率修改器可视化模式，抗锯齿（TSR）组质量设置为高

如需了解更多信息，请参阅[时间分辨率修改器](/documentation/zh-cn/unreal-engine/temporal-upscalers-in-unreal-engine)。

### 可视化TSR

**时间超级分辨率** 可视化显示了TSR的概览，这对诊断特定问题最有帮助。此可视化模式也是一个很好的起始点，便于你更好地理解TSR的内部运行以及其图像稳定工作。

你可以从视口 **显示（Show） > 可视化（Visualize）** 菜单下选择 **时间超级分辨率（Temporal Super Resolution）** 访问此显示标记。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e5912ac-14a3-410b-beeb-d1ff590f6b1e/tsr-temporal-super-resolution-input.png)

TSR可视化模式，抗锯齿（TSR）组质量设置为高

可视化模式中的颜色如下：

-   **粉色** 表示某些内容已禁用。
-   **黄色/红色** 表示某些因素对图像质量有不利影响。
-   **绿色** 表示某些因素有利于图像质量。

时间超级分辨率显示标记提供了关于不同可视化选项的概览。你可以使用控制台命令 `r.TSR.Visualize` 通过输入以下值之一来选择其中一个视图：

-   **\-2** 显示概览网格VisualizeTSR可视化，无论视口的显示（Show）菜单中如何设置显示标记。
-   **\-1** 根据视口显示（Show）菜单中显示标记的设置方式显示VisualizeTSR的概览网格。
-   **0** ，显示历史记录中的累积样本数。
-   **1** ，基于深度和速度缓冲，显示视差解除遮挡。
-   **2** ，显示历史记录被拒绝的遮罩。
-   **3** ，显示历史记录被限制的遮罩。
-   **4** ，显示历史记录被恢复的遮罩。
-   **5** ，显示历史记录在恢复帧中被恢复的遮罩。
-   **6** ，显示正在计算空间抗锯齿的遮罩。
-   **7** ，显示闪烁时间分析启发法正在生效的遮罩。

### DumpGPU查看器

[DumpGPU](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine)是一个内置的与平台无关的中间GPU资源查看器。DumpGPU非常适合多帧诊断TSR瑕疵，因为TSR主要涉及图像处理。通过进行一些很少的设置，你可以直接在控制台（\`）中使用DumpGPU来检查TSR的中间渲染目标。为此，你可以使用以下命令：

控制台命令

说明

要使用的值

`r.DumpGPU.Root`

将GPU转储限制为仅GPU通道。

“*TemporalSuperResolution*”

`r.DumpGPU.FrameCount`

转储多个连续帧，这对于诊断TSR相关问题很有用，因为它会累积数帧的结果。

30

`r.DumpGPU.Stream`

将资源从GPU异步流送到磁盘以加快转储过程。

1

`r.DumpGPU.FixedTickRate`

如果转储过程最终降低帧率，则将引擎函数更新率固定为所需帧率。这与 `t.MaxFPS` 的运行方式类似。

30

`r.DumpGPU.`Delay

将转储过程延迟几秒钟，以便有时间按照Gameplay逻辑重现瑕疵。

3

`r.DumpGPU.CameraCut`

这会在第一个转储帧上发出镜头切换。对于诊断DumpGPU相关问题，这是可选项。

1

你可以选择将这些命令复制到项目的 **ConsoleVariables.ini** 文件中：

```cpp
r.DumpGPU.Root="*TemporalSuperResolution*"
r.DumpGPU.FrameCount=30
r.DumpGPU.Stream=1

;如果转储过程最终降低帧率，则将引擎函数更新率固定为所需帧，如t.MaxFPS
r.DumpGPU.FixedTickRate=30
r.DumpGPU.Delay=3
r.DumpGPU.CameraCut=1	
```

对于要检查的TSR的中间渲染目标，你可以向前和向后逐帧查看瑕疵在捕获帧中如何演变。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c166645-416c-4236-b6fc-4f1e14d50881/tsr-dump-viewer-output.png)

你可以通过在控制台中输入 `r.ResetRenderTargetsExtent` 来加速转储GPU流送，以使渲染器的内部渲染目标适配你的渲染分辨率。当使用屏幕百分比更改渲染分辨率时，此操作很有用。另请注意，当启用动态分辨率时，可以使用 `r.DynamicRes.TestScreenPercentage` 锁定渲染分辨率，但内部渲染目标大小仍由 `r.DynamicRes.MaxScreenPercentage` 控制。

如果你要针对TSR问题向Epic提交错误报告或请求帮助，则7-zip (\*.7z)压缩文件最适合压缩用于上传文件的转储目录。

## TSR的构成

TSR由许多不同的算法组成，旨在解决特定问题，以便在当前一代主机上获得最佳图像质量。

TSR采用以下算法：

-   **历史记录（History）** 的作用是累积、存储和重复使用帧之间的细节。
-   **视差启发法（Parallax Heuristics）** 使用运动向量重新投影历史记录，同时在解除遮挡时保持图像质量。
-   **着色拒绝（Shading Rejection）** 检测颜色变化和半透明度。它还在Nanite在框架中包含的细节数量上实现平衡。
-   **闪烁时间分析（Flickering Temporal Analysis）** 可以稳定帧，减少瑕疵，例如某些几何图形上的摩尔纹。
-   当过去帧中存储的数据再次出现在当前帧时， **历史记录恢复（History Resurrection）** 会调用这些存储数据。

你可以通过下面的图表了解这些算法如何输入到TSR的帧输出。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b2590c4-23e1-4692-9d2c-a2e019619f5f/tsr-components.png)

接下来的小节将介绍上面列出的各个算法以及算法如何与时间分辨率修改器和时间超级分辨率可视化模式一起运行。

### TSR历史记录

这是所有TSR抗锯齿伸缩性性的强制项，但可以使用 `r.TSR.History.*` 控制台命令进行自定义。

TSR会随着时间的推移累积细节。这些渲染细节随时间的聚合集成是在显示分辨率的历史记录中完成的。TSR还包括一些隐藏在历史记录中的附加数据，这些数据特定于TSR的内部算法。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6852ef0a-1555-466d-8533-3b4dac426921/tsr-history.png)

随着时间的推移，渲染帧中收集的细节会累积，形成TSR历史记录。

当使用TSR可视化模式时，历史记录中累积的细节量会通过 **累积样本数（Accumulated Sample Count）** 输入显示在左上角。图像越绿，累积的细节就越多。红色区域没有累积足够的像素，而绿色区域已达到每条历史记录的最高样本数。可以使用 `r.TSR.History.SampleCount` 调整每条历史记录的样本数量以满足你的需求。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46679130-16dc-4fe3-acc5-4f0aaeb7a88b/tsr-history-temporalupscaler-vis.png)

要全屏查看 **累积样本数（Accumulated Sample Count）** ，请使用控制台命令 `r.TSR.Visualize 0`。如需了解TSR可视化选项，请参阅此页面的[可视化TSR](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E5%8F%AF%E8%A7%86%E5%8C%96tsr)小节。

**历史记录更新（History Update）** 是TSR总GPU开销中最昂贵的通道，因为历史记录以显示分辨率渲染。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4d71862-6f1a-4ed7-bd64-c1898d2f3aa3/tsr-history-update-timeline.png)

TSR的历史记录更新包括可使用控制台命令 `r.TSR.UpdateHistory` 选择的排列：0表示低，1表示中，2表示高，3表示超高质量。这些质量级别由抗锯齿（TSR）伸缩性组质量设置驱动。如需了解有关每个质量级别提供内容的更多细节，请查看位于 `[虚幻引擎根目录]/Engine/Shaders/Private` 中的 **TSRUpdateHistory.usf** 文件中的 `DIM_UPDATE_QUALITY`。你可以根据你的项目需求从此处检查并进行自定义。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73bdbf82-8e7f-4e5b-8391-1c311f6a7aad/tsr-history-update-ush.png)

示例显示的是，在GPUDump查看器中，TSR UpdateHistory的抗锯齿伸缩性质量设置为"高"。

为了在当 `r.TSR.History.ScreenPercentage=100` 时抑制历史记录重投影模糊，你需要使用 `r.TSR.Velocity.WeightClampingSampleCount` 再次加速细节累积。例如，通过将项目DefaultEngine.ini配置文件中的 `r.TSR.Velocity.WeightClampingSampleCount` 从 4.0（默认值）降低到2.0，《Fortnite》等竞技类游戏可以降低部分移动过程中的图像稳定性来换取清晰度。

#### TSR Nyquist-Shannon历史记录

此功能在 **超高（Epic）** 和 **电影级（Cinematic）** TSR抗锯齿伸缩性级别默认启用。它可以通过控制台变量 `r.TSR.History.ScreenPercentage` 进行控制。

TSR重新投影前一帧的历史记录，该历史记录已将几何和纹理细节聚合成可立即使用的图像，与市场上任何其他时间分辨率修改器相同，理论上效果很好。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a5aa72c-d3f6-40ca-8fa0-b5facec52d3e/tsr-ns-history-1.png)

当将其应用于运动实践时，当前帧和前一帧之间的像素不太可能对齐。TSR和其他时间分辨率修改器必须内插前一帧的像素，从而引入模糊。TSR会尝试通过在此内核中进行一些锐化以减轻像素的过度模糊，但它无法解决在帧中仅移动半个像素的1个像素厚度的细节变换问题。此局限性导致细节因模糊而丢失得更多，使得事后无法恢复这些细节。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e64299ec-8dc9-4137-9c53-5089fbde1919/tsr-ns-history-2.png)

作为历史记录重新投影的结果，当帧中发生运动时，虽然时间分辨率修改器以1080p显示，但看起来就像540p的分辨率。这只会加深对象在帧中移动产生模糊的负面声誉。为了解决此问题，超高和电影级抗锯齿伸缩性组将TSR的历史记录屏幕百分比（`r.TSR.History.ScreenPercentage`）设置为200，以便以两倍的显示分辨率存储TSR历史记录。

此方法的优点是可以消除历史记录重新投影期间发生的模糊，其中重新投影依赖于基于[Mitchell-Netravali下采样核](https://zh.wikipedia.org/wiki/Mitchell%E2%80%93Netravali%E6%BB%A4%E6%B3%A2%E5%99%A8)的[Nyquist-Shannon采样定理](https://zh.wikipedia.org/wiki/%E9%87%87%E6%A0%B7%E5%AE%9A%E7%90%86)。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd2dc95f-fcbd-45ff-8277-ec642df270f4/tsr-ns-history-3.png)

众所周知，历史记录重新投影过程中的模糊是时间分辨率修改器会遭遇的问题。为了解决这个问题，更高的默认历史记录屏幕百分比意味着历史记录更新的GPU开销将提升4倍，大大增加了TSR的GPU开销。虽然此方法会产生开销，从而可能显得违反常理，但此举是为了实现在分辨率轴上提供的信息是显示器显示分辨率信息的两倍。当超级采样历史记录更新被下采样时，相比没有对历史记录使用更高屏幕百分比时保留的细节，这种情况保留的细节要多得多。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6652dca-3547-40ff-a051-a51732986135/tsr-ns-history-4.png)

图表显示了200%屏幕百分比的历史记录及其对TSR总GPU开销的影响。

如果你担心项目的帧预算过高，则可以使用 **高（High）** （或较低）引擎伸缩性组，因为 **超高（Epic）** 抗锯齿伸缩性的GPU开销更高。

Nyquist-Shannon历史记录设置已在Epic自己的演示中使用，最早可追溯到2019年使用具有时间抗锯齿（TAA）的虚幻引擎4.22的[Goodbye Kansas和Deep Forest Films的"Troll"演示](https://www.youtube.com/watch?v=Qjt_MqEOcGM)。对于我们使用时间分辨率修改器的项目来说，这已被证明是一种有效的方法。

### 视差解除遮挡

这对于所有TSR抗锯齿伸缩性组都是强制项。

TSR具有 **视差解除遮挡（Parallax Disocclusion）** 启发法，有助于减少在靠近摄像机的画面区域之后变得可见的画面区域产生的瑕疵。以下面的场景为例，摄像机平移，远处的建筑物在较近的建筑物后面变得可见。这种类型的解除遮挡可能会导致出现瑕疵，因为远处的建筑物需要从帧中积累细节来稳定图像。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba0171a0-757a-4fc9-83ce-80a2be485f23/tsr-parallax-disocclusion.gif)

TSR，伸缩性等级为超高（r.AntiAliasingMethod=4, sg.AntiAliasingQuality=3），且屏幕百分比为50%

该启发法完全基于当前帧的深度和速度缓冲，即可见的时间分辨率修改器可视化模式。从该缓冲区生成视差解除遮挡遮罩，并且可以在时间超级分辨率可视化模式下查看。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c82376d-2b51-4b12-9c62-d5e75030097b/tsr-parallax-heuristic.png)

时间分辨率修改器可视化模式的深度和速度输入，用于TSR可视化模式生成解除遮挡遮罩。

你可能会发现，有时某些对象的运动向量会由处理场景中几何体的每个代码路径计算和绘制，而这可能会引发问题，从而影响这些对象。当发现问题时，第一个检查几何体绘制的无法正常运行的运动向量的组件是TSR的视差启发法及其生成的解除遮挡遮罩。

使用以下TSR可视化来调查这些类型的问题。你可以从视口的 **显示（Show） > 可视化（Visualize）** 菜单中进行切换。

-   **动态模糊** （ `显示VisualizeMotionBlur` ），在摄像机正在移动时将运动向量显示为屏幕上的箭头。
    -   查看箭头是否与对象的方向对应。
    -   查看有问题的对象是否为黄色。这表示它们正在绘制运动向量。
-   **前一帧的重新投影** （ `显示VisualizeReprojection` ），显示当前帧和重新投影的前一帧之间的差异。
    -   未正确重新投影的对象上的运动向量会显示颜色，并且其细节不会正确排列。
-   **时间分辨率修改器I/O（Temporal Upscaler I/O）** （ `显示VisualizeTemporalUpscaler` ），显示TSR的输入输出概览。
-   **时间超级分辨率视差解除遮挡** （ `显示VisualizeTSR` ），显示应位于绘制速度对象后面的解除遮挡晕影。

#### 动画世界位置偏移

具有动画处理参数的材质会给TSR和渲染器的其他时间累积带来问题，例如通过[顶点动画](/documentation/zh-cn/unreal-engine/vertex-animation-tool-in-unreal-engine)使用世界位置偏移（WPO）的材质。对于这些类型的材质，WPO需要对当前帧和前一帧进行求值，以获取适当的运动向量。由于WPO逻辑的前一帧求值只有当前帧的值，因此前一帧的结果最终并不正确。对于绘制速度的材质，指定前一帧的值非常重要。

**Previous Frame Switch** 材质节点能生成与TSR和动态模糊配合使用的校正运动向量，从而解决此问题。该节点可正确地在顶点动画上添加动态模糊，并允许TSR在此过程中正确地重新投影对象。虽然仅随时间而变的材质已经可以不加修改直接使用，但是，它们无法考虑可能在运行时影响动画的其他变量，例如材质参数。Previous Frame Switch节点通过跟踪这些参数在材质中的变化方式来解决这类问题。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ccb89d1-07cc-466c-823d-624bf9dca1b5/tsr-previous-frame-switch-material.png)

需要考虑的其他事项：

-   项目设置 **由于顶点变形而产生的输出速度（Output velocities due to vertex deformation）** 允许使用WPO的材质对当前和之前的帧进行双重求值。即使Actor没有移动，这也会在速度传递过程中输出速度。该设置默认为启用。
-   如果项目设置 **速度通道（Velocity Pass）** 设置为 **在基础通道之后写入（Write after base pass）** ，则可能会因额外的绘制调用而产生性能开销。如果许多对象（例如一片树林）都使用WPO，则性能开销可能会更高。

如需详细了解此表达式的设置和使用方法，请参阅[工具材质表达式](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine)的"上一帧切换"小节。

### 着色拒绝

这是所有TSR抗锯齿伸缩性组的强制项，但可以使用 `r.TSR.ShadingRejection.*` 控制台命令进行自定义。

TSR的 **着色拒绝** 启发法是一个决定当前帧与前一帧的匹配程度以及是否应该重复使用或完全拒绝的过程。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2857d18e-5968-4e33-898b-64238b1f17f8/tsr-shading-rejection-1.png)

着色拒绝的输入可以在 **时间分辨率修改器（Temporal Upscaler）** 可视化模式中查看，分为 **场景颜色（Scene Color）**、**AfterDOF半透明颜色（AfterDOF Translucency Color）** 和 **颜色A（Color A）** 。输出情况，即必须拒绝一帧中的多少内容，显示在 **时间超级分辨率（Temporal Super Resolution）** 可视化模式中，其中包含 **历史记录拒绝（History Rejection）** 和 **历史记录限制（History Clamp）** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf5a098b-4372-49fa-af6a-9ff209d24aa4/tsr-shading-rejection-2.png)

以显示分辨率（或使用Nyquist-Shannon历史记录的更高分辨率）运行的历史记录更新在原则上会变得简单，仅随时间推移进行细节整合。这也很方便快捷。

![](tsr-shading-rejection-3.png)(w:800)

### TSR和半透明度

这对于所有TSR抗锯齿伸缩性组都是强制项。

半透明度是TSR需要处理的一个特殊问题，因为可以将任意数量的任意层混合在一起。默认情况下，半透明材质从不绘制速度，或者最多绘制一个速度。这导致它们的边缘看起来没有本应有的锐度，因为TSR不知道它们究竟是如何移动的。

#### 半透明度通道

半透明材质在不同的半透明度通道中渲染，例如景深之前、景深之后（默认）和动态模糊之后。当多个半透明对象相互重叠时，任何使用半透明度的表面都会出现一个常见问题。这会导致半透明排序问题，因为深度缓冲无法确定哪个半透明对象应该显示在另一个对象的前面。

在材质设置中，你可以指定半透明度通道发生的位置。在 **半透明度（Translucency）** 类别下，使用 **半透明度通道（Translucency pass）** 下拉菜单选择此半透明材质应出现的位置。默认情况下，半透明材质被设置为在 **DOF之后** 渲染。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/136f097a-76ca-42b0-a8fc-cb1d9625da95/tsr-shading-rejection-transparency-pass.png)

由于具有混合特性，TSR必须以不同于不透明几何体的方式处理半透明几何体，并且它们永远不会绘制速度。TSR的着色拒绝启发法利用景深之后发生的半透明效果，因为它们是与场景几何体的其余部分分开绘制的。

下图显示了渲染管线中每个半透明通道发生的位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66a915e3-764b-416e-b882-1336f57df716/tsr-shading-rejection-translucency-pass-2.png)

如果你打开来自DumpGPU的输出，则会在 **场景（Scene） > 半透明度（Translucency）** 下找到半透明度通道。

 

 

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ca814be-8a6c-4b37-acc3-3492e4e32177/tsr-shading-rejection-translucency-pass-3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ca814be-8a6c-4b37-acc3-3492e4e32177/tsr-shading-rejection-translucency-pass-3.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/669f5586-df31-4124-aacf-3039dc23cfca/tsr-shading-rejection-translucency-pass-4.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/669f5586-df31-4124-aacf-3039dc23cfca/tsr-shading-rejection-translucency-pass-4.png)

DumpGPU 输出示例1

DumpGPU输出示例2

点击查看大图。

DumpGPU命令可能需要一段时间才能将所有帧信息转储到磁盘，而 **时间分辨率修改器（Temporal Upscaler）** 可视化模式提供了 **AfterDOF** 视图，这是一种检查半透明度是否绘制在正确位置的便捷方式。

 

 

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37fc00ed-d8ef-4e98-8d1c-187ffea5fa33/tsr-shading-rejection-translucency-pass-5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37fc00ed-d8ef-4e98-8d1c-187ffea5fa33/tsr-shading-rejection-translucency-pass-5.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f1f53df-0b61-4dc2-92e4-1c73e721d310/tsr-shading-rejection-translucency-pass-6.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f1f53df-0b61-4dc2-92e4-1c73e721d310/tsr-shading-rejection-translucency-pass-6.png)

DumpGPU 输出示例1

DumpGPU输出示例2

点击查看大图。

TSR的着色拒绝启发法采用手写卷积网络编译，以做出拒绝决策，其中大多数卷积专用于图像稳定性，进而维持Nanite所能提供的细节数量。然而，如果后续卷积的运动向量不正确，则可能会出现重影，从而产生重影瑕疵。因为半透明度通常没有运动向量，所以在景深之后发生且在单独的通道中绘制的半透明材质的着色拒绝添加了专用的模糊卷积。此卷积牺牲了具有半透明度的对象的一点图像稳定性，以减少重影。

下图显示了在TSR历史记录中这些卷积发生的位置，以使用Nanite提供的所有细节来稳定图像。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7420531b-a511-4994-a7f6-886402cc1045/tsr-shading-rejection-translucency-pass-7.png)

半透明度有时需要手动调整才能获得所需效果。例如，每次拍摄时经常需要手动调整材质的半透明度。**DOF之前自动** （`r.Translucency.AutoBeforeDOF`）功能会在景深之前通道自动在焦距后面绘制半透明效果，避免每次拍摄或进行类似风格的设置时都操作一遍。该功能默认启用。

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51d1b219-851e-4327-8ebb-2541c5efc26c/tsr-shading-rejection-translucency-pass-8.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d2f692a-4b55-4647-bcc6-0df233beb791/tsr-shading-rejection-translucency-pass-9.png)

使用BeforeDOF

未使用BeforeDOF

我们强烈建议你仅在确定自己的意图时才调整材质中的半透明度通道。更改此设置可能会影响半透明材质的外观，并且会产生一些不可预见的性能开销。我们建议使用默认的 **AfterDOF** 。

如需调整值，控制台变量可采用0至1之间的浮点值，其中：

-   0.0设置为1倍焦距
-   0.5设置为2倍焦距
-   1.0设置为100倍焦距

#### 在材质中输出半透明度速度

TSR缺乏光流，这意味着移动的半透明对象看起来边缘会更锐利，有时看起来很不美观，即使这不完全是重影问题。采用半透明度的材质有输出其速度的选项，可以将运动向量写入速度通道中的深度缓冲。对于TSR来说，这是一个有用的起始点，可以确定启用此设置的对象在场景中移动的半透明细节的锐度。

你可以在 **细节（Details）** 面板中的 **半透明度（Translucency）** 类别下勾选 **输出深度和速度（Output Depth and Velocity）** 复选框，使材质输出运动向量。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68fd15fa-e38c-49fc-a8c8-2cd283dd1d70/tsr-shading-rejection-translucency-pass-12.png)

下面的场景示例展示了，与没有深度和速度相比，输出太阳Sprite的半透明材质的深度和速度会如何锐化眼睛和嘴巴的细节。

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9603b902-c464-4e8d-9960-e82cc806a08b/tsr-shading-rejection-translucency-pass-10.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a337721e-01c0-4d50-be36-e77baed059df/tsr-shading-rejection-translucency-pass-11.png)

输出深度和速度：禁用

输出深度和速度：启用

你可以使用 **时间分辨率修改器（Temporal Upscaler）** 可视化模式通过 **vis SceneDepthZ** 、 **显示VisualizeMotionBlur** 和 **显示VisualizeReprojection** 视图检查此设置。

 

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c255f2e-dd38-45aa-b37d-587f3274bb93/tsr-shading-rejection-translucency-pass-13.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59a18ef6-dcfc-494a-b29c-ccebec726819/tsr-shading-rejection-translucency-pass-14.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff146573-3fcc-4c8b-9899-485f8f9b9eab/tsr-shading-rejection-translucency-pass-15.png)

vis SceneDepthZ

显示VisualizeMotionBlur

显示VisualizeReprojection

在时间分辨率修改器（Temporal Upscaler）可视化模式中，你可以看到这三个输入中的半透明材质如何从启用输出深度和速度设置中接收信息，以实现最终结果。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5f51c5a-21fc-4212-8c46-72f6d36939b0/tsr-shading-rejection-translucency-pass-16.png)

半透明度以一定的不透明度混合到场景颜色中，但深度和速度缓冲不能像颜色那样混合。深度和速度缓冲只能被完全覆盖，或者不被覆盖。**不透明遮罩剪辑值（Opacity Mask Clip Value）** 材质设置用于比较渲染器的材质不透明度。

你可以在 **细节（Details）** 面板的 **材质（Material） > 高级（Advanced）** 类别下设置 **不透明遮罩剪辑值（Opacity Mask Clip Value）** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a6feacc-0fd4-457a-8595-0fca75d20144/tsr-shading-rejection-translucency-pass-17.png)

默认的不透明遮罩剪辑值（0.333）有时不适合使用半透明材质的视觉效果（VFX）。对于在透明对象后面重新投影不透明几何体的实例，覆盖深度和速度可能会产生不利影响。在这种情况下，使用更高的不透明遮罩剪辑值仅为VFX最不透明区域绘制速度，其中透明对象后面的不透明几何体的重新投影误差将不太明显。

在下面的示例中，当启用或禁用输出深度和速度（Output Depth and Velocity）设置时，不透明遮罩剪辑值会对细节的锐度或平滑度产生影响。

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a89ce3d4-dfa0-4398-9a2b-e6185dc44d31/tsr-shading-rejection-translucency-pass-18-nodepthvelocity.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36bc339b-88c3-4916-8e8a-ce74141c9317/tsr-shading-rejection-translucency-pass-18-depthvelocity.png)

输出深度和速度：禁用

输出深度和速度：启用

### 采用后期处理材质的TSR

TSR与其他抗锯齿技术之间的行为相同。

[后处理材质](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine)提供的灵活性包括其自身的条件限制，因为TSR发生在后处理链的中间。材质将被插入到具有场景颜色和处于景深之后半透明度的不同位置。

可以通过后期处理材质将材质插入到不同位置的场景颜色中。你可以使用 **可混合位置（Blendable Location）** 材质设置来指定用来修改场景颜色的后期处理材质位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e10f91e-ecbe-4565-b548-24a4fb8f0c2b/tsr-post-process-material-1.png)

可混合位置

说明

**DOF之前的场景颜色（Scene Color Before DOF）**

这将放置后期处理材质位置，以修改半透明度畸变和景深之间的场景颜色。它始终以渲染分辨率运行，输入和输出始终处于线性颜色空间中。

**DOF之后的场景颜色（Scene Color After DOF）**

这会将后期处理材质的位置放在景深和景深之后半透明度之间。它始终以渲染分辨率运行，输入和输出始终处于线性颜色空间中

**DOF之后的半透明度（Translucency After DOF）**

这会将后期处理材质位置放在景深之后半透明度，然后合成到场景颜色中。它始终以渲染分辨率运行，输入和输出始终处于线性颜色空间中。

**SSR输入（SSR Input）**

该后期处理材质使背板构成TSR/TAA和下一帧的SSR之间的屏幕空间反射（SSR）。它以TSR或TAAU渲染分辨率的显示分辨率运行，输入和输出始终处于线性颜色空间中。

**泛光前的场景颜色（Scene Color Before Bloom）**

此后期处理材质位置将修改泛光前的场景颜色。它以TSR或TAAU渲染分辨率的显示分辨率运行，输入和输出始终处于线性颜色空间中。

**替换色调映射器（Replacing the Tonemapper）**

此后期处理材质将替换色调映射器来修改场景颜色。它以TSR或TAAU渲染分辨率的显示分辨率运行，输入始终处于线性颜色空间中。

**色调映射后场景颜色（Scene COlor After Tonemapping）**

此后期处理材质位置将修改色调映射器之后的场景颜色。它以TSR或TAAU渲染分辨率的显示分辨率运行，输入和输出基于渲染设置在不同的颜色空间中。例如，sRGB/Rec709、HDR或线性颜色。

下表有助于描述正在执行的位置、执行时间以及执行的分辨率。下表以 **DOF之前的场景颜色** 、 **DOF之后的场景颜色** 、 **DOF之后的半透明度** 为示例。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c13ab41-3f1d-4399-b7fb-5af8f9170ec5/tsr-post-process-material-2.png)

**时间分辨率修改器（Temporal Upscaler）** 可视化模式非常实用，可以让你更好地了解这些视图以及视图在管线中的位置。具体是指 **vis SceneColor** 、 **vis Translucency.AfterDOF.Color** 、 **vis Translucency.AfterDOF.Color A** 和 **vis TSR.Output** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f403535-95de-48d5-aed2-75b3ce26e692/tsr-post-process-material-3.png)

你可以使用命令 `DumpGPU` 输出GPU的日志转储。在DumpGPU查看器中打开日志时，你可以搜索材质名称，以确认后期处理材质的输入和输出是什么样的。如果你想要更有约束且更快的转储日志，你可以约束日志仅使用 `r.DumpGPU.Root *PostProcessing*` 转储后期处理部分。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d2370f8-495f-455d-9020-a74c6647fce7/tsr-post-process-material-4.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d2370f8-495f-455d-9020-a74c6647fce7/tsr-post-process-material-4.png)

点击查看大图

### 空间抗锯齿选项

此选项在中（Medium）、高（High）、超高（Epic）和电影级（Cinematic）TSR抗锯齿伸缩性组中默认启用。你可以使用控制台命令 `r.TSR.RejectionAntiAliasingQuality` 控制其质量。

有时TSR只能处理单帧的数据，例如在镜头切换时，或者当屏幕上出现新对象或发生变化时。为此，TSR具有内置的空间抗锯齿算法，可自动为图像中最需要的区域提供更好的抗锯齿效果。

在下面的示例中，你可以看到，这对于最需要提高质量的图像区域非常有用，例如靠近画面中间的岩石边缘周围。

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/166745f5-4fbb-4e7b-9d7e-3d774910aade/tsr-spatial-antialiaser-2.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e2935e3-94da-4b85-8637-2db6c418ba27/tsr-spatial-antialiaser-1.png)

使用空间抗锯齿功能

未使用空间抗锯齿功能

你可以使用以下命令在自己的项目中自行测试：

```cpp
r.Test.CameraCut 1
r.Test.SecondaryUpscaleOverride 8
```

设置完成后，你可以使用控制台命令 `r.TSR.RejectionAntiAliasingQuality` 来测试空间抗锯齿的质量。将值设置为 **0** 或 **1** 可切换开和关。

**时间超级分辨率（Temporal Super Resolution）** 可视化模式包括左下角的 **空间抗锯齿（Spatial Anti-Aliasing）** 视图。输入控制台命令 `r.TSR.Visualize 6` 可以全屏查看。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08b3e24c-6452-4dda-af0b-f951146de9d0/tsr-spatial-antialiaser-3.png)

负责邻域锯齿检测的算法是一种快速近似抗锯齿（FXAA）型算法，会在整个帧内进行水平或垂直搜索。该算法可以提高帧中当前内容的质量，但无法创建本身没有的信息。该算法的唯一目的是根据历史记录收敛率，以低开销隐藏在细节继续累积的短时间内没有累积足够细节的帧区域。

你可以在本页的[了解时间细节累积的注意事项](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E4%BA%86%E8%A7%A3%E6%97%B6%E9%97%B4%E7%BB%86%E8%8A%82%E7%B4%AF%E7%A7%AF%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)小节了解有关此内容的更多信息。

### TSR闪烁时间分析

此选项在高（High）、超高（Epic）和电影级（Cinematic）TSR抗锯齿伸缩性组中默认启用。你可以使用控制台命令 `r.TSR.ShadingRejection.Flickering` 控制其质量。

提供良好图像质量的重要因素是保持长期的稳定性。Nanite产生的细节量对于时间整合来说可能是一项挑战。

本节介绍了当帧内有大量细节需要处理时，尝试使用TSR保持图像稳定性时可能出现的常见问题。这些小节将介绍如何分析使用TSR时可能发生的闪烁、发生闪烁的原因，以及你可以在自己的项目中尝试以缓解这些问题的一些方法。

#### 摩尔纹

[摩尔纹](https://zh.wikipedia.org/wiki/%E8%8E%AB%E5%88%97%E6%B3%A2%E7%B4%8B)是一种经常出现在重复细节中的瑕疵，例如重叠的线条或屏幕上足够小的线条（通常在远处），从而产生不良的纹路。在游戏中，解决方法通常是使用纹理为几何体添加细节，而不是将细节直接添加到网格体，因为纹理会使用mipmap在较远的距离获得较低的分辨率，从而减轻不良瑕疵。

Nanite所创建的细节量可能会产生完全不稳定的图像，尤其是当以切线角看对象时。就拿为Epic的《黑客帝国觉醒》GDC演示而创建的[城市示例](https://www.fab.com/listings/4898e707-7855-404b-af0e-a505ee690e68)项目为例。考虑到细节量和在这种环境中通过解除遮挡来浏览摄像机视图的机会，所以存在多种挑战。

左侧图片展示了拥有大量几何细节但在屏幕上占用很少像素时可能发生的摩尔纹瑕疵类型。当TSR使用其闪烁着色拒绝功能时，这些类型的瑕疵可以得到缓解，但不能完全解决。第一张图片是此类瑕疵的最坏情况。

你可以比较下面两张捕获图像，查看在禁用TSR的闪烁着色拒绝时切线角会导致多少瑕疵，启用以及闪烁周期略有增加时瑕疵减少了多少。对于这种类型的瑕疵，第一张捕获图像是最糟糕的情况，因为它禁用了闪烁着色拒绝。

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00c8feb8-8f20-4ac2-aed1-282dacc342ce/tsr-flickering-1.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e18a22a6-2985-456d-935b-64db9643956a/tsr-flickering-2.gif)

不使用着色拒绝(r.TSR.ShadingRejection.Flickering 0)

使用着色拒绝并增加了闪烁周期。 (r.TSR.ShadingRejection.Flickering 1)

每张捕获图像均使用超高抗锯齿伸缩性组以60 Hz的频率进行。右侧的捕获图像还使用控制台命令 `r.TSR.ShadingRejection.Flickering.Period` 将默认闪烁着色拒绝周期从2（默认值）增加到3。

发生这类瑕疵的核心问题是细节丢失。即使禁用抗锯齿功能，也会发生这种情况，如下面的屏幕截图所示。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d45a6726-f71b-403e-94f4-268bee86a450/tsr-flickering-3.gif)

城市示例场景，因禁用抗锯齿功能而导致远处建筑物表面的细节丢失。

丢失细节的原因在于Nanite为任何给定帧保留的细节量。在这个场景中，对于窗户周围的几何体来说尤其如此，因为建筑物柱子的结构会导致占用较少像素且距离摄像机较远的几何体的细节丢失。

下图是从顶部、正面和切线角视角对建筑物几何体的简化表示。从顶视图，你可以看到每个窗口之间的柱子。正面视图显示了这些窗户与柱子之间的间距，以及柱子如何从地面垂直延伸到建筑物的顶部。切线角展示的是从远处看时这些垂直柱的压缩情况。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b168b44b-218e-463c-9d5f-711c26092fdd/tsr-flickering-4.png)

就像此建筑的许多细节一样，构成图像的像素以网格形式排列，并且随着细节随时间不断整合，此网格每帧都会发生变化。

 

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6287b16-9e31-47fb-99b0-b8e076b6cdbb/tsr-flickering-5.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dddfffc1-1180-472b-9154-bb26b266d480/tsr-flickering-6.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6925e619-9c0c-4e58-b5d6-b735fea5f50d/tsr-flickering-7.png)

红色是第N帧像素的取样位置。绿色为第N+1帧的位置。

红色是第N帧的渲染像素位置。黑色是第N帧的显示像素位置。

红色是第N帧的像素位置。黑色是第N帧的较高分辨率显示像素位置。

因此，每隔几帧，帧可能会发现建筑物的一些细节小于一个像素。TSR的设计考虑到了这一点，并非所有帧都具有亚像素Nanite细节，这意味着可以识别图像的哪些部分在从一帧到下一帧之间应该保持稳定。在这种情况下，建筑物的柱子部分不应该在帧间移动，并且应该保持稳定。

下图展示了像素如何在第一帧（红色）和下一帧（棕褐色）之间对齐，并且被识别为稳定的几何体延续到下一帧。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34bd48a1-e6ca-4431-92c7-a3b5e4730893/tsr-flickering-8.png)

在切线角下，一些较小的结构细节与其他部分相比变得更加明显。结构细节的对齐最终可能是与当前正在渲染的像素对齐，这意味着只能找到窗户和墙壁，而不是每个窗户之间的柱子。

下图显示了第N帧（红色）像素和第N+1帧（棕褐色）像素如何导致这种错位，由于网格位置不同，每帧都会看到不同的内容。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7bed38d-0155-44f6-867c-a5b0fe80be95/tsr-flickering-9.png)

这就是导致摩尔纹在画面中出现的原因，而这个问题很难使用TSR解决，因为TSR无法知道像素是否包含相同的几何体或者是否发生了着色变化。除此之外，还有一个问题，不仅要依靠几何体来了解发生了什么变化，还要了解帧的渲染分辨率。

例如，降低渲染分辨率并增加所有被渲染像素的取样采样位置之间的间距，最终会使建筑物的几何体细节更加多样化。可以是建筑物的窗户、墙壁和柱子，这为TSR提供了更多信息，使其能够识别这是建筑物的相同几何体，而不是着色变化。

在下图中，对于与这些像素垂直对齐的几何体，从帧N（红色）到帧N+1（棕褐色）的像素之间的区分更加清晰，有助于保持图像稳定性。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/851ed481-8c5a-4f14-9101-4f0a3b63ee76/tsr-flickering-10.png)

建筑物上的这个特定锯齿问题是场景几何体和每帧渲染像素可能出现的一般采样问题的示例。TSR会随着时间的推移决定正在渲染的像素是否属于场景中的特定几何体，以及是否需要对渲染像素进行采样。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4c99103-2a3f-47ab-a7eb-65ad7d08b896/tsr-flickering-11.png)

图像稳定性是一个多面性问题，TSR负责决定画面中需要稳定的内容。有一些因素可能会导致摩尔纹出现，因此最好让TSR控制应稳定的内容。屏幕上渲染像素网格和几何体之间没有摩尔纹的部分甚至可能会出现不稳定。此示例是一个最坏的情况，也正是这种情况让TSR成为负责检测着色变化和保持时间稳定性紧密耦合的技术解决方案。

#### 时间历史记录的因果悖论

摩尔纹并不是导致TSR不稳定的唯一采样问题。此外还存在渲染的像素网格对Nanite细节采样过多的问题。最终，这会形成一个循环：如果渲染帧中的细节量不在历史记录中，那么历史记录如何与渲染帧相同？如果历史记录与渲染帧差别太大，那么历史记录如何累积这样的细节？

尝试解决此着色拒绝问题会导致在类似情况下出现不合理的重影量，例如当视觉效果在屏幕上移动时，或者当环境中发生光照变化时。随着时间的推移，TSR解决了这个问题，并做了额外的工作来稳定图象并打破这种循环。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/822af976-2ce3-4393-8821-cb2ee93bb2a0/tsr-flickering-history-1.png)

#### 闪烁亮度测量

摩尔纹和时间历史记录因果悖论都源于Nanite能够在屏幕上处理的细节量。为了减少任何可能干扰TSR防重影机制的渲染算法，TSR会在不透明光照后插入一个额外的通道，拍摄帧中不透明几何体的快照。此通道被称为 **TSR.Flickering.Luminance**，其输入可以在时间分辨率修改器（Temporal Upscaler）可视化模式中查看。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0b6d73b-b58f-4c4a-9398-5ea82086510c/tsr-flickering-luminance-1.png)

或者，你也可以在DumpGPU查看器中找到输入。搜索"TSR"并选择 **TSR MeasureFlickeringLuma** 来检查其输出。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c51dc264-a6d8-4bbe-a5e8-cc1ffdaa73bc/tsr-flickering-luminance-2.png)

TSR MeasureFlickeringLuma通道主要将场景颜色转换为低动态范围（LDR）亮度。虽然这可以在最后的光照通道中完成，但这并不是因为虚幻引擎在渲染器中支持大量的代码路径。而是，它被保留为一个独立的通道。

当你准备发布游戏时，你可以使用它来查看正在使用的代码路径，并禁用未使用的代码路径进行优化。例如，如果你仅使用动态光照，则可以禁用烘焙静态光照。

此快照有助于TSR了解场景颜色中的任何其他效果是否应该被视为闪烁，例如雾、云、单层水、预失真半透明和失真。将场景颜色与TSR闪烁亮度快照进行比较可以实现这一点。

查看画面右中部附近的建筑物，你可以看到在闪烁亮度可视化中莫摩尔纹在帧之间发生变化。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4ae52af-fc6f-4b09-936c-7629604cee97/tsr-flickering-luminance-3.gif)

#### 闪烁时间分析

因为TSR知道从一帧到下一帧有什么程度的不透明光照几何体在闪烁，所以可以随着时间的推移跟踪闪烁之间的时间何时小于 `r.TSR.ShadingRejection.Flickering.Period` 指定的时间。该控制台变量以帧为单位测量闪烁周期，并尝试通过放宽着色拒绝启发法来稳定图像。

你可以使用 **时间超级分辨率（Temporal Super Resolution）** 可视化模式来亲眼目睹着色启发法在多大程度上缓解了闪烁。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/644f525f-2463-413c-836c-d0e5d1eca334/tsr-flickering-ta-1.png)

所有这些输入使得防闪烁启发法能够快速聚焦于图像中出现闪烁的部分，例如靠近画面中心的建筑物的柱子和窗户的闪烁。输出以红色突出显示出现闪烁的问题区域。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6cf7bce7-ca81-4514-8463-5b7d52af0cc9/tsr-flickering-ta-2.png)

CitySample, 5.4, r.TSR.ShadingRejection.Flickering.Period=3, r.TSR.Visualize=7

出于性能原因，闪烁的时间分析仅监测像素的亮度。与监控每个颜色通道相比，这使其开销降至原本的三分之一。这意味着启发法可能仍然会让一些闪烁通过，这些闪烁不会引起亮度上的太大闪烁，但会影响帧的色彩元素。

#### 帧率的影响

无论帧率如何，都可能发生闪烁，例如基于时间且与帧率无关的视觉效果。这可能意味着，在60 Hz下表现平稳的视觉效果在较低帧率（比如24 Hz左右）下可能表现为"闪烁"。正因如此，美术师创作的视觉效果必须始终不受帧率的影响，因为TSR的缩放可以满足GPU性能需求，而无法满足特定的帧率。当设备或平台以低于预期的帧率运行时，这可能带来意外影响，导致视觉效果发生变化。

因此，你可以使用控制台命令 `r.TSR.ShadingRejection.Flickering.Period` 在帧率降至低于 `r.TSR.ShadingRejection.Flickering.FrameRateCap` 指定的帧率（默认值为60 Hz）时自动减少闪烁。这意味着，在60 Hz下表现稳定的几何体细节在较低帧率下可能变得不太稳定。你可以在下面的捕获图像中看到相关示例。

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb2003b5-fc55-4180-b7f9-c0a184ac9b85/tsr-flickering-framerate-1.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69f81faa-b78a-471f-a0a2-8e2955c1f2d9/tsr-flickering-framerate-2.gif)

60Hz刷新率

30Hz刷新率

下图显示，帧周期被设置为两帧，低于此值会被视为闪烁，帧率上限被设置为60 Hz。低于60 Hz的频率更有可能随着帧率下降而出现闪烁。60 Hz或以上的频率都被视为稳定。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d3c0d33-cc44-4e47-a398-2f62430650cb/tsr-flickering-framerate-3.png)

下面捕获图像的帧率为30 Hz，并使用与之前的捕获图像相同的设置。但这里，闪烁帧率上限（ `r.TSR.ShadingRejection.Flickering.FrameRateCap` ）已被设置为60Hz而非30Hz，从而稳定图像。

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69f81faa-b78a-471f-a0a2-8e2955c1f2d9/tsr-flickering-framerate-2.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b71f819-9d2b-464b-be5f-868614e8eafa/tsr-flickering-framerate-4.gif)

60Hz刷新率

30Hz刷新率

按照以下步骤对你的项目进行防闪烁微调：

1.  将 `r.TSR.ShadingRejection.Flickering.FrameRateCap` 设置为项目的目标帧率，例如30或60 Hz。
2.  使用 `t.MaxFPS` 将编辑器的刷新率或FPS锁定为相同的帧率值，例如30或60。
3.  使用 `r.TSR.ShadingRejection.Flickering.Period` 自定义闪烁周期，达到理想效果。

在编辑器中锁定这些设置后，你可以将它们复制到 **\[你的项目根目录\]/Config** 文件夹中的 **DefaultEngine.ini** 文件中，以确保编辑器和目标平台上的行为一致。

虽然此防闪烁行为默认启用，但你可以通过将 `r.TSR.ShadingRejection.Flickering.AdjustToFrameRate` 设置为0来选择退出。但为了视觉效果，我们强烈建议不要这样做。

#### 通过移动和改变分辨率实现抗锯齿

正如本页前面的[摩尔纹](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E6%91%A9%E5%B0%94%E7%BA%B9)小节所述，像素网格和Nanite几何体之间出现的摩尔纹将根据渲染分辨率而移动。摩尔纹还取决于对象相对于摄像机在画面中的位置。

例如，在下面的场景中，请注意当屏幕百分比从60%变为90%时，建筑物的闪烁位置如何变化。还需注意的是，这个场景中的其他对象都没有移动。

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56e0035b-994a-4ea5-b44c-458dc764a912/tsr-antiflickering-1.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66d1b8dd-e14f-4340-834a-cd8392d18d68/tsr-antiflickering-2.gif)

屏幕百分比：60

屏幕百分比：90

了解屏幕百分比以及像素网格在场景中相对于几何体的位置很重要，因为这个问题是现有防闪烁启发法存在的局限性。目前尚无足够有效的解决方案来克服现有硬件上的这个问题。因此，当摩尔纹移动时（无论是由于摄像机移动还是渲染分辨率发生改变），在确定确实有闪烁并应尝试稳定之前，TSR都会在几帧的过程中检测任何新区域的闪烁。

请注意，在下面的捕获图像中，当摄像机向后拉时，建筑物上的摩尔纹需要几帧才能被TSR的防闪烁启发法算法锁定，从而稳定图像。另外，请注意摩尔纹在建筑物上的位置变化，如上面的两个示例所示。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/106a3c4e-cfd3-491c-be36-237a76763a34/tsr-antiflickering-3.gif)

(r.AntiAliasingMethod=4, sg.AntiAliasingQuality=3, r.TSR.ShadingRejection.Flickering=1, r.TSR.ShadingRejection.Flickering.FrameRateCap=30, r.TSR.ShadingRejection.Flickering.Period=3)

对于移动的对象以及具有足够大视差变化的像素，TSR的闪烁时间分析将逐像素禁用。这可以缓解没有运动向量的其他内容的问题，例如反射、视差遮挡映射和视差建筑物内饰。

你可以使用时间超级分辨率可视化模式查看 **TSR闪烁分析（TSR Flickering Analysis）** 输入，以查看移动时被禁用的屏幕部分。禁用的像素在画面中显示为粉色。输入控制台命令 `r.TSR.Visualize 7` 可以全屏查看此输入。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a3c9afa-e1af-4a6c-ad63-d63c637825c1/tsr-antiflickering-4.png)

#### 带像素动画的材质

对于执行某些像素着色器动画（例如纹理平移）的不透明材质，如果超过闪烁周期阈值，则可能会出现问题，因为它们会导致TSR出现重影。这是因为移动像素动画缺少运动向量，并且闪烁的时间分析会看到不透明像素经常改变颜色。

以下面的角色为例，角色有带连续动画的不透明材质。时间分辨率修改器可视化模式的 **TSR闪烁亮度（TSR Flickering Luminance）** 输入不会反映其闪烁时间分析中正在变化的材质。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3213bc47-6ed5-470a-a1f4-1cb1d81f9b01/tsr-pixel-animation-1.png)

由于这些像素随着时间的推移经常发生变化，因此会被视为"闪烁"，导致TSR试图稳定图像，从而引入不必要的重影。如果你查看时间超级分辨率可视化模式的 **闪烁时间分析（Flickering Temporal Analysis）** 输入，也可以发现这一点。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e236e76-7322-4722-a3ff-3096e650b2c6/tsr-pixel-animation-2.png)

将有问题的不透明材质标记为具有未用运动向量表示的像素动画的材质，可以抵消由TSR闪烁时间分析引起的重影。方法是在材质的 **细节（Details）** 面板中启用材质的 **具有像素动画（Has Pixel Animation）** 设置。该设置也可以在 **材质属性重载（Material Property Overrides）** 下的材质实例上被重载。

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d685843a-a4ff-4efb-b28e-e7f60c423427/tsr-pixel-animation-3.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1baa76a0-0cb0-4144-8ef4-fdbdc05cc70f/tsr-pixel-animation-4.png)

启用像素动画材质属性

启用像素动画材质实例属性重载

此设置会使用T被SR用作输入的速度缓冲中的材质对图元进行编码。在时间分辨率修改器（Temporal Upscaler）中，材质将在 **UMaterial bHasPixelAnimation** 输入中显示其遮罩。该遮罩会被用作时间超级分辨率可视化模式的 **闪烁时间分析（Flickering Temporal Analysis）** 输入的一部分，以忽略这些像素。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68fb5bbc-c815-4d39-a9fd-9d9d638435fa/tsr-pixel-animation-5.png)

### 历史记录恢复

此选项在中（Medium）、高（High）、超高（Epic）和电影级（Cinematic）TSR抗锯齿伸缩性组中默认启用。你可以使用 `r.TSR.Resurrection.*` 控制台变量控制其质量。

TSR的历史记录恢复是决定是否使用紧接的前一帧或历史记录中更早的"恢复"帧以更好地匹配当前帧中的细节的过程。此过程是为了稳定图像，以限制甚至防止噪点和重影瑕疵的发生。出现重影瑕疵是因为先前累积的细节由于各种原因被丢弃，例如遮挡、着色的变化以及对象超出画面。当这些细节再次出现时，TSR必须重新累积它们的细节，进而导致重影瑕疵。

TSR的恢复帧历史记录可让你访问历史记录中有限数量的帧，以便与当前帧进行比较。当历史记录恢复被禁用时，只有前一帧可用于与当前帧进行要重新投影的细节比较。所有新细节或缺失的细节都必须累积，这是导致重影瑕疵的主要原因。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c8fab32-1049-4074-bcbd-c65785d8c907/tsr-history-rejection-1.png)

当启用TSR恢复时，较旧的持久帧的历史记录将保存在Texture2DArray的内存中。该数组与用于存储前一帧历史记录的数组相同。比较历史记录中可用的最旧持久帧，如果它与当前帧更匹配，则使用它来代替紧接的前一帧。恢复历史记录更新的开销并不高，因为这些帧存储在Texture2DArray中，并且全局着色器要么重新投影前一帧，要么重新投影从数组中获取的恢复帧。开销主要来自于恢复遮罩边缘的额外缓存内存带宽，但由于Texture2DArray历史记录，纹理提取的次数严格一致。

当有多个帧可能比前一帧更匹配时，会将这些帧与当前帧进行比较，如果结果为真，则重新投影。根据较旧的持久帧的帧数和与当前帧的间隔，较旧的持久帧将被删除并替换为较新的帧。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c87210b-ada9-4f92-bf38-3dec089079d0/tsr-history-rejection-2.png)

你可以比较开启和关闭该功能时的历史记录恢复的结果。当无法比较和重新投影恢复历史记录时，就会使用前一帧，而且通常必须重新累积细节，从而在这个过程中导致重影。在下面切换武器的动画画面中，可以特别清楚地看到这一点。

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2fabccf-7446-4a68-9ea0-d9fb069e3bbc/tsr-history-rejection-3.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9995c2f5-0293-49b5-9eba-081f1b8fb141/tsr-history-rejection-4.png)

TSR恢复禁用

TSR恢复启用

使用控制台命令 `r.TSR.Visualize 0` 在视口中以全尺寸查看累积样本输入。

时间超级分辨率可视化模式的 **恢复遮罩（Resurrection Mask）** 和 **恢复帧（Resurrected Frame）** 输入显示为当前帧和前一帧的恢复遮罩（绿色）着色的帧区域，以及由于超出恢复帧的边界而无法恢复的像素（粉色）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa911191-5e57-407e-8e7e-8ac0927537f8/tsr-history-rejection-5.png)

你可能需要根据自己项目的需求配置持久帧历史记录的数量，你可以使用以下控制台变量进行配置：

-   `r.TSR.Resurrection.PersistentFrameCount`：设置要记录的持久帧的数量，以用于将来的历史记录恢复。这会增加整个TSR历史记录的内存占用。此值必须是大于或等于2的 **偶** 数。
-   `r.TSR.Resurrection.PersistentFrameInterval`：设置在历史记录中记录持久帧的频率（以帧数为单位），以便将来恢复历史记录。这对TSR历史记录的内存占用没有影响。此值必须是大于或等于1的 **奇** 数。使用 `r.TSR.Visualize 5` 来根据你的内容进行调整。

### 重投影场

TSR的重投影场在从深度缓冲区获取用于抗锯齿渲染的像素时，会在空间上将重投影向量扩大一半，而不是在膨胀速度通道中按完整渲染像素进行扩大。这使得在速度缓冲区将某些对象挤到边缘时（例如旋转时），能够隐藏渲染分辨率。然而，这会导致DilateVelocity通道中增加空间抗锯齿开销，并且在History Update通道开始时会增加额外的依赖纹理读取。

重投影场会为每个像素嵌入一个2x2的Jacobian矩阵，以便更精确地重投影渲染像素中显示像素的历史记录。例如，这可以让TSR在移动时保持几何边缘的清晰度。

默认情况下，重投影场在高、超高和影视级TSR抗锯齿伸缩性组中是启用的。你可以使用 `r.TSR.ReprojectionField` 来控制它。

## 解决TSR相关的重影问题

以下是你可以用于解决项目中重影问题的一些方法：

-   **确定重影是TSR造成，还是其他原因造成。**
    
    使用时间分辨率修改器可视化模式查看在任何输入视图中是否有重影。如果是，请使用 `DumpGPU` 命令和查看器来识别哪个系统在TSR中引入了重影。
    
    如果你不确定重影是否由TSR引起，请尝试切换到另一种抗锯齿方法，或完全禁用抗锯齿，看看是否仍然出现重影。
    
-   **是否是不良运动向量导致的瑕疵或重影？**
    
    TSR依靠运动向量来重新投影不透明几何体。验证对象的重新投影对齐对于防止重影非常重要。通常，当运动向量是重影的原因所在时，可以通过查看问题是否出在场景中的特定对象来确定，而不是整个场景都存在问题来确定。
    
    有时，检测运动向量问题可能是由细微的半透明效果（如云）引起的，其重载了材质设置中的速度。你可以使用控制台命令 `r.Translucency.Velocity 0` 禁用半透明材质的速度，从而快速检查是否是这种情况。
    
    你可以检查世界位置偏移（WPO）是否基于任何动画材质参数。如果是，请检查Previous Frame Switch节点是否输入了前一帧的值。如需了解材质中的此项设置，请参阅[工具材质表达式](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine)。
    
    运动向量计算缺少每个实例变换运动的自动速度向量。
    
-   **重影是否是由TSR的闪烁时间分析引起的？**
    
    在研究闪烁时间分析之前，你需要完全确定运动向量正确无误。否则，你可能会误以为闪烁时间分析是造成重影的原因。
    
    使用时间超分辨率可视化模式并查找出现重影的帧中的红色区域。如果是具有着色器动画的不透明材质，例如纹理平移，请确保已设置了材质设置 **具有像素动画（Has Pixel Animation）**。如需了解更多相关信息，请参阅本页面[带像素动画的材质](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E5%B8%A6%E5%83%8F%E7%B4%A0%E5%8A%A8%E7%94%BB%E7%9A%84%E6%9D%90%E8%B4%A8)小节。
    
-   **造成重影瑕疵的对象是否是半透明的？**
    
    使用时间分辨率修改器可视化模式，并确认对象是否位于 **Translucency.AfterDOF.Color** 输入视图中。TSR的着色拒绝对于DOF之后半透明度（所有材质的默认设置）的容忍度较低。这是因为材质默认不绘制速度并且无法正确地重新投影。如需了解更多相关信息，请参阅本页面的[TSR和半透明度](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#tsr%E5%92%8C%E5%8D%8A%E9%80%8F%E6%98%8E%E5%BA%A6)小节。
    

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9fd32f5b-7e0c-428c-b54a-e216acfbe041/tsr-ghosting-1.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54315996-2dd4-4c30-8499-fa5c9c38766d/tsr-ghosting-2.png)

半透明材质设置为景深之后出现

半透明材质设置为景深之前出现

## 时间超级分辨率常见问答

如需了解有关本页讨论主题的一些常见问答，请参阅[时间超级分辨率常见问答](/documentation/zh-cn/unreal-engine/temporal-super-resolution-frequently-asked-questions-for-unreal-engine)。

## 控制台变量

控制台变量名称

说明

`r.TSR.16BitVALU`

是否在具有bSupportRealTypes=RuntimeDependent的平台上使用16位VALU。

`r.TSR.16BitVALU.AMD`

重载是否在AMD台式机GPU上使用16位VALU。

`r.TSR.16BitVALU.Intel`

重载是否在英特尔台式机GPU上使用16位VALU。

`r.TSR.16BitVALU.Nvidia`

重载是否在NVIDIA台式机GPU上使用16位VALU。

`r.TSR.AplhaChannel`

控制TSR是否应该处理场景颜色的Alpha通道。

-   **\-1** 基于 `r.PostProcessing.PropagateAlpha` 。（默认值）
-   **0** 为禁用。
-   **1** 为启用。

`r.TSR.AsyncCompute`

控制TSR如何在异步计算上运行。一些TSR通道可以与之前的通道重叠：

-   **0** 为禁用。
-   **1** 在异步仅计算通道运行，这些通道完全独立于该帧的任何中间资源，即ClearPrevTextures和ForwardScatterDepth通道。
-   **2** 在异步仅计算通道运行，这些通道完全独立或仅依赖于深度和速度缓冲，缓冲可以重叠，例如半透明度和景深。关键路径上的通道都保留在图形队列中。（默认值）
-   **3** 在异步计算的所有通道运行。

`r.TSR.Debug.ArraySize`

`TSR.Debug.*` 渲染依赖关系图（RDG）纹理的数组大小。

`r.TSR.ForceSeparateTranslucency`

一旦启用TSR，将重载 `r.SeparateTranslucency` 。此功能默认启用。

`r.TSR.History.R11G11B10`

设置为"1"时选择历史记录的位深度。通过在前一帧的历史记录重新投影以及输出和新历史记录的写出时节省内存，来节省内存带宽，这对于TSR的UpdateHistory运行时性能特别重要。当使用 `r.PostProcessing.PropagateAlpha=1` 时，不支持此优化。另外请注意，由于从TSR历史分辨率到TSR输出分辨率的降频通道，将 `r.TSR.History.ScreenPercentage` 增加到200，与TSR输出的位深度相比，会在历史记录中增加两个额外的隐式编码位。

`r.TSR.History.SampleCount`

TSR历史记录中每个输出像素的最大样本数。值越高，静态图像上的高光越稳定，但可能会在某些样式的VFX（例如萤火虫）上引入额外的重影。由于TSR.History.Metadata的编码原因，你最少可以有8个样本，最多32个。默认样本数为16个。

`r.TSR.History.ScreenPercentage`

基于输出分辨率的TSR历史记录的分辨率乘数。增加分辨率会增加TSR的运行时开销，但可以使其在整个重新投影过程中，通过存储在历史记录中的细节保持更好的清晰度和稳定性。默认情况下，该值设置为200，因为使用了依赖于[Nyquist-Shannon采样定理](https://zh.wikipedia.org/wiki/%E9%87%87%E6%A0%B7%E5%AE%9A%E7%90%86)的特定属性，该属性为历史记录中累积细节的采样率建立了充分条件。因此，仅支持100到200之间的值。此值由抗锯齿伸缩性组控制。超高和电影级质量级别使用200，而所有其他质量级别使用100。

`r.TSR.History.UpdateQuality`

选择TSRHistoryUpdate通道中历史记录更新质量的着色器排列。目前，这由 `sg.AntiAliasingQuality` 伸缩性驱动。如需详细了解每个组提供的内容，请参阅 **TSRUpdateHistory.usf** 中的 `DIM_UPDATE_QUALITY` 以进行自定义。

`r.TSR.RejectionAntiAliasingQuality`

当需要拒绝历史记录时，控制TSR内置空间抗锯齿技术的质量。当渲染分辨率未比显示分辨率低太多时，这并不重要，但这种技术对于隐藏较低的渲染分辨率至关重要，原因有二：锯齿的屏幕空间大小与渲染分辨率成反比，以较低的分辨率渲染意味着，需要更多的帧才能达到每个显示至少1个渲染像素。默认情况下，除低伸缩性组之外的所有抗锯齿伸缩性组均启用此选项。

`r.TSR.Resurrection`

允许TSR恢复很多帧之前丢弃的细节。TSR会查看紧接的前一帧或历史记录中与当前帧很匹配的帧，以重新投影其细节，进而稳定图像。如需了解TSR的恢复工作原理，请参阅本页的[历史记录拒绝](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E6%8B%92%E7%BB%9D)小节。

`r.TSR.Resurrection.PersistentFrameCount`

配置记录到历史记录中的持久帧的数量，以便将来恢复历史记录。若增加历史记录恢复中存储的帧数，将增加整个TSR历史记录。此值必须是大于或等于2的偶数。（默认值为2）。如需了解TSR的恢复工作原理，请参阅本页的[历史记录拒绝](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E6%8B%92%E7%BB%9D)小节。

`r.TSR.Resurrection.PersistentFrameInterval`

配置（以帧数为单位）持久帧应在历史记录中记录的频率，以便将来恢复历史记录。这对TSR历史记录的内存占用没有影响。此值必须是大于或等于1的奇数。使用TSR可视化和 `r.TSR.Visualize 5` ，根据你的内容调整此参数。（默认值为31）。如需了解TSR的恢复工作原理，请参阅本页的[历史记录拒绝](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E6%8B%92%E7%BB%9D)小节。

`r.TSR.ShadingRejection.ExposureOffset`

着色拒绝需要对线性彩色像素最终向用户显示的亮度有一个具象的理解。通过与 `MeasureBackBufferLDRQuantizationError` 中的内容进行比较，着色拒绝可以检测颜色何时变为在后缓冲区中可见。让TSR的 `MeasureBackBufferLDRQuantizationError` 在颜色强度范围内均匀分布非常重要，否则它可能会忽略导致重影的一些细微VFX。

该变量仅在TSR的拒绝启发法中调整线性颜色空间的曝光。高值会提升阴影的LDR强度，这意味着 `MeasureBackBufferLDRQuantizationError` 在这些阴影中减少，而在高光中增加。

最佳验证方法是，查看时间分辨率修改器可视化模式的TSR.Flickering.Luminance输入，或者在DumpGPU查看器中，将TGB 线性\[0;1\]源颜色空间与sRGB源颜色空间中的色调映射器输出进行比较。

`r.TSR.ShadingRejection.Flickering`

TSR输出的不稳定性大多数时候源自着色拒绝的不稳定性。发生此情况的原因可能有多种，比如：

-   最常见的不稳定来源是结构化几何体和渲染像素网格之间的摩尔纹，由于抖动像素网格偏移，摩尔纹每帧都会发生变化。
-   另一来源是由于时间历史记录的先有鸡还是先有蛋的问题而导致的极端几何体复杂性，而这个问题无法通过TSR的RejectionHistory通道中的其他机制来克服，例如，如果帧中可用的细节量尚未存在于历史记录中，那么历史记录如何与渲染的帧相同？或者，如果历史记录与渲染帧的差别太大，历史记录如何累积细节？

启用后，在TSR.Moire.Luma资源中存储的任何半透明绘制在连续帧中演变之前，此启发法会监视帧的亮度。如果不断检测到定期闪烁，并且高于 `r.TSR.ShadingRejection.Flickering` 控制台变量定义的阈值时，则启发法将尝试稳定图像，即让重影发生在与闪烁幅度相关的亮度边界内。这种启发法的缺点是，凡是具有不正确运动向量的不透明几何体，都可能使像素看起来与闪烁相同，从而导致这种启发式法启动，并在受影响的几何体上留下不好的重影效果。当发生这种情况时，你应该验证运动向量如何查看 `VisualizeMotionBlur` 显示标记，以及这些运动向量如何使用 `VisualizeReprojection` 显示标记重新投影前一帧。使用控制台变量 `r.TSR.ShadingRejection.Flickering.Period` 来控制像素被视为闪烁并需要稳定的帧频率。例如，如果将闪烁周期设置为3，则每帧中任何像素的亮度变化等于或大于该值均被视为闪烁。

在确定闪烁像素与动画像素时，还要注意，无论帧速率如何，都会发生闪烁，而视觉效果基于时间/应基于时间，因此与帧率无关。这可能意味着，在每秒60帧的速度下看起来流畅的视觉效果在较低的帧速率（例如24fps）下可能会看起来像"闪烁"。为了避免美术师创作的视觉效果出现重影，控制台变量 `r.TSR.ShadingRejection.Flickering.AdjustToFrameRate` （默认启用）会查找低于 `r.TSR.ShadingRejection.Flickering.FrameRateCap` 设置值的变化。而 `r.TSR.ShadingRejection.Flickering` 则根据伸缩性设置进行控制，以根据低端或高端GPU来打开或关闭此启发法。你还可以在项目的 **DefaultEngine.ini** 中设置此控制台变量，以确保所有平台的一致性。

默认情况下，此控制台变量在高、超高和电影级抗锯齿伸缩性组中启用。

`r.TSR.ShadingRejection.Flickering.AdjustToFrameRate`

当低于此帧率上限时，闪烁周期设置（`r.TSR.ShadingRejection.Flickering.Period`）是否应调整到该帧率。如需了解更多详细信息，请参阅 `r.TSR.ShadingRejection.Flickering` 。

`r.TSR.ShadingRejection.Flickering.FrameRateCap`

以赫兹为单位的帧率上限，当渲染速率更低时，会自动调整 `r.TSR.ShadingRejection.Flickering.Period` 。如需了解更多详细信息，请参阅 `r.TSR.ShadingRejection.Flickering` 条目。默认情况下，设置为60hz。

`r.TSR.ShadingRejection.Flickering.MaxParallaxVelocity`

某些使用视差遮挡映射的材质，例如具有建筑物窗户内饰的[城市示例](https://www.fab.com/listings/4898e707-7855-404b-af0e-a505ee690e68)，通常无法准确渲染这种伪造的内饰几何体的运动向量。这会导致启发法认为它正在闪烁，但事实并非如此。此变量将定义1080p像素中的视差速度，帧率由 `r.TSR.ShadingRejection.Flickering.FrameRateCap` 定义，此时应禁用启发法，以免引起重影。

`r.TSR.ShadingRejection.Flickering.Period`

帧中亮度振荡频率相等或更大的周期被视为闪烁，并且将产生重影以稳定图像。如需了解更多详细信息，请参阅 `r.TSR.ShadingRejection.Flickering` 条目。默认情况下，这设置为3。

`r.TSR.ShadingRejection.SampleCount`

完全拒绝着色后历史记录中每个输出像素的最大样本数。值越低，意味着在历史记录着色拒绝后的图像的清晰度更高，但后续帧中像素的不稳定性更高，会累积新的细节，这可能会在视觉上分散。默认情况下，这设置为2.0。

`r.TSR.ShadingRejection.TileOverscan`

着色拒绝在GPU上运行卷积网络。它无需往返主视频内存即可完成此操作。然而，在图块中链接许多卷积意味着周围边缘的某些卷积会损坏，需要稍微重叠图块以将其隐藏。值越高，越不容易出现平铺瑕疵，但性能会有所损失。

`r.TSR.Velocity.WeightClampingPixelSpeed`

定义历史记录高频的贡献权重受到限制时的输出像素速度。基本上是为了在像素速度小于 `r.TSR.Velocity.WeightClampingPixelSpeed` 时对 `r.TSR.Velocity.WeightClampingSampleCount` 的效果进行插值。

`r.TSR.Velocity.WeightClampingSampleCount`

当输出速度达到 `r.TSR.Velocity.WeightClampingPixelSpeed` 时，在历史记录像素中计数以限制历史记录的样本数。值越高，运动稳定性越高，但由于每次历史重新投影产生连续卷积，会更模糊。你可以使用控制台命令 `r.TSR.History.Metadata` 直观地显示TSR历史记录中的样本数。请注意，这将限制像素历史记录中的样本数，而非输出像素。因此，根据设计，值越低，TSR屏幕百分比（ `r.TSR.History.ScreenPercentage` ）越高时，越不明显。这样做的目的是，无论设置如何，单方面增加值并自动提供更多的时间稳定性，同时保持细节重新投影的锐度，但会产生额外的运行时开销。例如，以故事情节为核心的游戏可能更偏向将此设置保持在4.0，以获得“电影级”观感，而像《Fortnite》这样的竞技类游戏，则更愿意将其降低到2.0左右。（默认为4.0f。）

`r.TSR.Visualize`

将此变量与以下任一值结合使用，以查看构成时间超分辨率可视化模式输入的不同可视化输入。

-   **\-2** 显示概览网格VisualizeTSR可视化，无论视口的显示（Show）菜单中如何设置显示标记。
-   **\-1** 根据视口显示（Show）菜单中显示标记的设置方式显示VisualizeTSR的概览网格。
-   **0** ，显示历史记录中的累积样本数。
-   **1** ，基于深度和速度缓冲，显示视差解除遮挡。
-   **2** ，显示历史记录被拒绝的遮罩。
-   **3** ，显示历史记录被限制的遮罩。
-   **4** ，显示历史记录被恢复的遮罩。
-   **5** ，显示历史记录在恢复帧中被恢复的遮罩。
-   **6** ，显示正在计算空间抗锯齿的遮罩。
-   **7** ，显示闪烁时间分析启发法正在生效的遮罩。

`r.TSR.WaveOps`

是否在着色拒绝启发法中使用波动操作来加速卷积。着色拒绝启发法优化对于着色器编译器来说可能很难，从而导致它们出现损坏或呈现质量损失。

由于使用DXC增加了SPIR-V后端的编译时间，从而导致启动编辑器的时间更长，因此此优化目前在SPIR-V平台（主要是Vulkan和Metal）上禁用。

`r.TSR.WaveSize`

覆盖要使用的WaveSize。

-   **0：** 自动（默认值）
-   **16：** WaveSizeOps 16
-   **32：** WaveSizeOps 32
-   **64：** WaveSizeOps 64

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [anti aliasing](https://dev.epicgames.com/community/search?query=anti%20aliasing)
-   [temporal super resolution](https://dev.epicgames.com/community/search?query=temporal%20super%20resolution)
-   [tsr](https://dev.epicgames.com/community/search?query=tsr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [支持的平台](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84%E5%B9%B3%E5%8F%B0)
-   [TSR的伸缩性](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#tsr%E7%9A%84%E4%BC%B8%E7%BC%A9%E6%80%A7)
-   [了解时间细节累积的注意事项](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E4%BA%86%E8%A7%A3%E6%97%B6%E9%97%B4%E7%BB%86%E8%8A%82%E7%B4%AF%E7%A7%AF%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
-   [分辨率修改GPU开销](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E5%88%86%E8%BE%A8%E7%8E%87%E4%BF%AE%E6%94%B9gpu%E5%BC%80%E9%94%80)
-   [抗锯齿可伸缩性组](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E6%8A%97%E9%94%AF%E9%BD%BF%E5%8F%AF%E4%BC%B8%E7%BC%A9%E6%80%A7%E7%BB%84)
-   [时间分辨率修改的隐藏GPU成本](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E6%97%B6%E9%97%B4%E5%88%86%E8%BE%A8%E7%8E%87%E4%BF%AE%E6%94%B9%E7%9A%84%E9%9A%90%E8%97%8Fgpu%E6%88%90%E6%9C%AC)
-   [通过TSR优化动态模糊](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E9%80%9A%E8%BF%87tsr%E4%BC%98%E5%8C%96%E5%8A%A8%E6%80%81%E6%A8%A1%E7%B3%8A)
-   [调试时间超级分辨率的工具](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E8%B0%83%E8%AF%95%E6%97%B6%E9%97%B4%E8%B6%85%E7%BA%A7%E5%88%86%E8%BE%A8%E7%8E%87%E7%9A%84%E5%B7%A5%E5%85%B7)
-   [可视化时间分辨率修改器的输入输出](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E5%8F%AF%E8%A7%86%E5%8C%96%E6%97%B6%E9%97%B4%E5%88%86%E8%BE%A8%E7%8E%87%E4%BF%AE%E6%94%B9%E5%99%A8%E7%9A%84%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA)
-   [可视化TSR](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E5%8F%AF%E8%A7%86%E5%8C%96tsr)
-   [DumpGPU查看器](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#dumpgpu%E6%9F%A5%E7%9C%8B%E5%99%A8)
-   [TSR的构成](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#tsr%E7%9A%84%E6%9E%84%E6%88%90)
-   [TSR历史记录](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#tsr%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95)
-   [TSR Nyquist-Shannon历史记录](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#tsrnyquist-shannon%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95)
-   [视差解除遮挡](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E8%A7%86%E5%B7%AE%E8%A7%A3%E9%99%A4%E9%81%AE%E6%8C%A1)
-   [动画世界位置偏移](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E5%8A%A8%E7%94%BB%E4%B8%96%E7%95%8C%E4%BD%8D%E7%BD%AE%E5%81%8F%E7%A7%BB)
-   [着色拒绝](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E7%9D%80%E8%89%B2%E6%8B%92%E7%BB%9D)
-   [TSR和半透明度](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#tsr%E5%92%8C%E5%8D%8A%E9%80%8F%E6%98%8E%E5%BA%A6)
-   [半透明度通道](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E5%8D%8A%E9%80%8F%E6%98%8E%E5%BA%A6%E9%80%9A%E9%81%93)
-   [在材质中输出半透明度速度](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E5%9C%A8%E6%9D%90%E8%B4%A8%E4%B8%AD%E8%BE%93%E5%87%BA%E5%8D%8A%E9%80%8F%E6%98%8E%E5%BA%A6%E9%80%9F%E5%BA%A6)
-   [采用后期处理材质的TSR](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E9%87%87%E7%94%A8%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E6%9D%90%E8%B4%A8%E7%9A%84tsr)
-   [空间抗锯齿选项](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E7%A9%BA%E9%97%B4%E6%8A%97%E9%94%AF%E9%BD%BF%E9%80%89%E9%A1%B9)
-   [TSR闪烁时间分析](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#tsr%E9%97%AA%E7%83%81%E6%97%B6%E9%97%B4%E5%88%86%E6%9E%90)
-   [摩尔纹](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E6%91%A9%E5%B0%94%E7%BA%B9)
-   [时间历史记录的因果悖论](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E6%97%B6%E9%97%B4%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E7%9A%84%E5%9B%A0%E6%9E%9C%E6%82%96%E8%AE%BA)
-   [闪烁亮度测量](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E9%97%AA%E7%83%81%E4%BA%AE%E5%BA%A6%E6%B5%8B%E9%87%8F)
-   [闪烁时间分析](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E9%97%AA%E7%83%81%E6%97%B6%E9%97%B4%E5%88%86%E6%9E%90)
-   [帧率的影响](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E5%B8%A7%E7%8E%87%E7%9A%84%E5%BD%B1%E5%93%8D)
-   [通过移动和改变分辨率实现抗锯齿](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E9%80%9A%E8%BF%87%E7%A7%BB%E5%8A%A8%E5%92%8C%E6%94%B9%E5%8F%98%E5%88%86%E8%BE%A8%E7%8E%87%E5%AE%9E%E7%8E%B0%E6%8A%97%E9%94%AF%E9%BD%BF)
-   [带像素动画的材质](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E5%B8%A6%E5%83%8F%E7%B4%A0%E5%8A%A8%E7%94%BB%E7%9A%84%E6%9D%90%E8%B4%A8)
-   [历史记录恢复](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E6%81%A2%E5%A4%8D)
-   [重投影场](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E9%87%8D%E6%8A%95%E5%BD%B1%E5%9C%BA)
-   [解决TSR相关的重影问题](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E8%A7%A3%E5%86%B3tsr%E7%9B%B8%E5%85%B3%E7%9A%84%E9%87%8D%E5%BD%B1%E9%97%AE%E9%A2%98)
-   [时间超级分辨率常见问答](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E6%97%B6%E9%97%B4%E8%B6%85%E7%BA%A7%E5%88%86%E8%BE%A8%E7%8E%87%E5%B8%B8%E8%A7%81%E9%97%AE%E7%AD%94)
-   [控制台变量](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine#%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F)
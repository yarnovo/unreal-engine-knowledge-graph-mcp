# 虚幻引擎中的抗锯齿和上采样 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/anti-aliasing-and-upscaling-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:22:38.531Z

---

目录

![抗锯齿和上采样](https://dev.epicgames.com/community/api/documentation/image/5fdcedf6-672b-4058-9f52-c9d90c0bfa5c?resizing_type=fill&width=1920&height=335)

**抗锯齿（Anti-Aliasing）** 是指在原本应该平滑的边缘和对象上删除锯齿状或阶梯状线条。抗锯齿的方法有很多种，可以减少这些类型的视觉瑕疵。有些方法用于特定渲染器和平台，而有些则非常适合提高性能和保真度。

![未将抗锯齿应用于场景。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95192308-a684-4f6b-b343-6320c005b83d/1-no-aa.png)

![已将抗锯齿应用于场景。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4710e5e0-eb0a-49f1-ab17-a6b61f64cd3d/2-with-aa.png)

未将抗锯齿应用于场景。

已将抗锯齿应用于场景。

## 抗锯齿方法

目前已经开发出来的抗锯齿方法多种多样。虚幻引擎提供了多种方法，你可以根据项目需要和要求进行选择。你可以为台式机/主机和移动平台选择合适的抗锯齿方法。

虚幻引擎为你的项目提供了以下抗锯齿方法。

抗锯齿方法

台式机/主机：延迟渲染器

台式机/主机：正向渲染器

移动：延迟渲染器

移动：正向渲染器

[时间超级分辨率(TSR)](/documentation/zh-cn/unreal-engine/anti-aliasing-and-upscaling-in-unreal-engine#%E6%97%B6%E9%97%B4%E8%B6%85%E7%BA%A7%E5%88%86%E8%BE%A8%E7%8E%87)

Y

Y

N

N

[时间抗锯齿上采样(TAAU)](/documentation/zh-cn/unreal-engine/anti-aliasing-and-upscaling-in-unreal-engine#%E6%97%B6%E9%97%B4%E6%8A%97%E9%94%AF%E9%BD%BF%E4%B8%8A%E9%87%87%E6%A0%B7)

Y

Y

Y

N

[快速近似抗锯齿(FXAA)](/documentation/zh-cn/unreal-engine/anti-aliasing-and-upscaling-in-unreal-engine#%E5%BF%AB%E9%80%9F%E8%BF%91%E4%BC%BC%E6%8A%97%E9%94%AF%E9%BD%BF)

Y

Y

Y

N

[多重取样抗锯齿(MSAA)](/documentation/zh-cn/unreal-engine/anti-aliasing-and-upscaling-in-unreal-engine#%E5%A4%9A%E9%87%8D%E5%8F%96%E6%A0%B7%E6%8A%97%E9%94%AF%E9%BD%BF)

N

Y

N

Y

使用以下图像滑块，可在无抗锯齿和可用抗锯齿方法之间切换，比较两者的结果。这些是显示静态场景的单帧捕获。要查看抗锯齿的最清晰结果，你应该在你有不同类型资产和材质并且可以自由四处移动的场景中进行测试。

图像序列 NO AA、TSR、TAA、FAA、MSAA

    ![使用无抗锯齿、TSR、TAA、FAA或MSAA（正向渲染器）时，拖动滑块以查看场景。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4bad0e41-64ea-4f2e-a0bb-9783e7374af1/3-no-aa.png) ![使用无抗锯齿、TSR、TAA、FAA或MSAA（正向渲染器）时，拖动滑块以查看场景。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52e06c89-9e65-4bd0-9854-d1ef9422e201/3-tsr.png) ![使用无抗锯齿、TSR、TAA、FAA或MSAA（正向渲染器）时，拖动滑块以查看场景。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77885dd1-42bf-4f8b-8ddd-1ad07ce24cf7/3-taau.png) ![使用无抗锯齿、TSR、TAA、FAA或MSAA（正向渲染器）时，拖动滑块以查看场景。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f907223a-6265-4454-89ff-d6e2fb48103f/3-fxaa.png) ![使用无抗锯齿、TSR、TAA、FAA或MSAA（正向渲染器）时，拖动滑块以查看场景。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbbaca88-e19e-4baf-890f-4a200435ee29/3-msaa.png)

**使用无抗锯齿、TSR、TAA、FAA或MSAA（正向渲染器）时，拖动滑块以查看场景。**

## 抗锯齿可扩展性设置

抗锯齿设置在 **引擎可扩展性设置（Engine Scalability Settings）** 中有自己的可扩展性组，用于缩放与每种方法的抗锯齿质量直接相关的GPU成本。可扩展性组将控制每种相应抗锯齿方法的控制台变量。

你可以从 **引擎可扩展性设置（Engine Scalability Settings）** 下的 **设置（Settings）** 下拉菜单访问 **抗锯齿（Anti-Aliasing）** 可扩展性设置。

![打开引擎可扩展性设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfc3fb40-8324-41a7-81f8-4d4b9fc252f7/4-engine-scalability-settings.png)

你可以选择 **低（Low）** 到 **过场动画（Cinematic）** 之间的某个选项来控制质量，或使用 **自动（Auto）** 让编辑器测试你的系统并选择最佳选项。或者，也可以调整抗锯齿或阴影等特定功能的质量。

![引擎可扩展性设置质量选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1c3524c-ea27-4ba3-bc53-e16fb5d1efcb/5-engine-scalability-quality-options.png)

每个引擎可扩展性设置条目对应于 **DefaultScalability.ini** 文件中的一组可配置控制台变量。你可以基于你想要的质量设置来编辑这些条目，更好地适应你的项目。

请参阅可扩展性设置，详细了解如何设置和配置控制台变量。这是一个高级工作流程。

## 选择抗锯齿方法

从 **窗口（Window）** 下的主菜单打开 **项目设置（Project Settings）** 。在项目设置中，抗锯齿设置位于 **引擎（Engine）> 渲染（Rendering）** 设置中。

对于 **台式机/主机（Desktop / Console）** 平台，抗锯齿设置位于 **默认设置（Default Settings）** 分段下。

![渲染项目设置抗锯齿设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1446907d-297d-4d03-af09-dc05ca2c2c3d/6-project-settings-aa-options.png)

对于 **移动（Mobile）** 平台，抗锯齿设置位于 **移动（Mobile）** 分段下。

![渲染项目设置移动抗锯齿设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9df037f-4d3c-44f2-ba61-b090f132f7d8/6-project-settings-mobile-aa-options.png)

## 时间超级分辨率

**时间超级分辨率** （简称TSR）是与平台无关的时间上采样器，使用的算法主要专注于为每个帧投入更多GPU周期，提高时间上采样质量，节省总GPU帧成本。其做法是渲染比虚幻引擎4中的时间抗锯齿上采样显著更低的内部分辨率。

TSR提供了原生高质量上采样技术，通过[Nanite](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)微多边形几何体所能实现的细节和保真度，满足次世代游戏的需求。

以下比较演示了在原生4K分辨率渲染的捕获帧与1080p上采样至4K之间的质量和性能差异。利用TSR，可以实现接近4K分辨率的图像质量，同时将GPU帧时缩短一半。

![按原生4K分辨率渲染的4K帧 | 帧时：57.50毫秒](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1fa19dd6-7fe0-4f4f-9931-9fd7b33bd34b/7-tsr-1.png)

![按1080p分辨率渲染的4K帧(r.ScreenPercentage=50) | 帧时为33.37毫秒](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd24385d-eea3-4f72-ae92-0b69c66003f4/7-tsr-2.png)

按原生4K分辨率渲染的4K帧 | 帧时：57.50毫秒

按1080p分辨率渲染的4K帧(r.ScreenPercentage=50) | 帧时为33.37毫秒

在以上比较中，每个图像是限制为此页面宽度的4K图像。要按完全未压缩的分辨率查看，请右键点击任一图像并将其保存到计算机，或在新的浏览器窗口中打开。

时间超级分辨率具有以下属性：

-   在输入分辨率低至1080p的情况下，渲染帧接近原生4K的质量。
-   相比于采用虚幻引擎4的默认时间抗锯齿方法，高频率背景上的可见"重影"瑕疵更少。
-   \*减少高复杂性几何体频闪。
-   在主机平台上支持[动态分辨率](/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine)缩放。
-   可在支持D3D11、D3D12、Vulkan、Metal、PlayStation 5和Xbox Series S | X的所有硬件上运行。
-   着色器专门针对PlayStation 5和Xbox Series S | X GPU架构进行了优化。

详见[Temporal Super Resolution](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine)获取更多信息。

## 时间抗锯齿上采样

**时间抗锯齿上采样** （简称TAAU）在每个帧内对不同的位置采样，并使用过去的帧将采样混合在一起，去除并平滑锯齿状边缘。

![不使用抗锯齿。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e5a478f-42d6-4c2a-9d45-139fd20b7543/12-no-aa.png)

![使用时间抗锯齿上采样](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55dfbe93-2749-4987-9495-6da48154e409/12-with-taau.png)

不使用抗锯齿。

使用时间抗锯齿上采样

TAAU的质量使用控制台变量 `r.TemporalAA.Quality` 进行控制。你可以从以下值选择：

-   **0：** 禁用输入筛选。
-   **1：** 启用输入筛选。
-   **2：** 启用输入筛选，并基于移动性进行抗重影（默认值）

你可以使用 **引擎可扩展性设置（Engine Scalability Settings）** 更改抗锯齿的质量。

在渲染链中，TAAU默认将时间上采样器配置用于屏幕百分比。

![主屏幕百分比小于100%的时间抗锯齿上采样。 ](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd5b7562-fb47-4744-8103-4afe6110b355/13-pipeline-taau.png)

### 禁用时间上采样

要简化从虚幻引擎4迁移项目至虚幻引擎5的过程，可以禁用时间上采样，将空间上采样器用于主屏幕百分比。

为此，请在UE5项目设置的 **引擎（Engine）> 渲染（Rendering）> 默认设置（Default Settings）** 下禁用 **时间上采样（Temporal Upsampling）** 设置。

![渲染项目设置时间上采样复选框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/901acde2-9888-4b5a-9291-794c323a4383/14-project-settings-temporal-upsampling-checkbox.png)

禁用该设置后，时间抗锯齿的渲染链将如下所示：

![主屏幕百分比小于100%的空间和时间上采样](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/686e7f2a-4b54-4c93-b524-7d6151170a13/14-pipeline-taa.png)

### 屏幕百分比的特定于TAAU的着色器排列

TAAU针对以下主屏幕百分比范围包含自己的着色器排列：

-   **50 - 70** 渲染更快，因为它在内存中使用更小的LDS图块。
-   **71 - 100** 很适合台式机和基础主机上的"普通"DPI渲染。

你可以在关卡编辑器的 **视口选项（Viewport Options）** 下拉菜单中设置主 **屏幕百分比（Screen Percentage）** 。

![关卡视口选项设置主屏幕百分比](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6fa745ba-6588-4bb1-bbc6-d0efaa201189/15-setting-primary-screen-percentage.png)

## 快速近似抗锯齿

**快速近似抗锯齿** （简称FXAA）是一种仅限空间的抗锯齿技术，是一种后期处理效果，使用高对比度滤波器找到边缘，并通过在像素边缘之间混合（抖色）来平滑边缘。顾名思义，该技术能够快速渲染，非常适合低端设备和台式机。

虽然该技术的渲染速度很快，但相较于其他抗锯齿技术，最终图像可能会丧失一定保真度。

![不使用抗锯齿](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b789bed-097f-4707-ab5f-1753521f3bdf/16-no-aa.png)

![使用快速近似抗锯齿](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1142d7c-2a02-4909-80bf-46c4beb963e7/16-with-fxaa.png)

不使用抗锯齿

使用快速近似抗锯齿

FXAA的抖色质量使用控制台变量 `r.FXAA.Quality` 进行控制。你可以设置多少取样用于抖色以去除锯齿状边缘。取样越多，高保真度越高，但GPU成本更高。

从以下选项中选择：

-   **0：** 主机
-   **1：** 使用3个采样的PC中等抖色
-   **2：** 使用5个采样的PC中等抖色
-   **3：** 使用8个采样的PC中等抖色
-   **4：** 使用12个采样的PC低抖色（默认值）
-   **5：** 使用12个采样的PC极端抖色。

你还可以使用 **引擎可扩展性设置（Engine Scalability Settings）** 更改抗锯齿的质量。

在空间和时间上采样链中，空间上采样器在主屏幕百分比的后期处理链末端发生。

![针对FXAA，主屏幕百分比小于100%的空间和时间上采样](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4311b58-cbbe-46b4-8cb3-1d04a4ec1bab/16-pipeline-fxaa.png)

## 多重取样抗锯齿

此抗锯齿技术仅在使用[正向渲染器](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine)时在移动和台式机/主机上可用。

**多重取样抗锯齿** （简称MSAA）是仅对帧的一些部分进行平滑处理的技术。MSAA主要查看容易出问题的地方，例如几何体的边缘。在边缘上可能出现锯齿问题的地方，MSAA会操控其颜色，使其处在构成边缘的两个像素的颜色之间。抖色效果会带来边缘更平滑的错觉。

![不使用抗锯齿 | 正向渲染器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d03f8488-fc31-4ea4-a862-a744c01a90c3/17-no-aa.png)

![使用多重取样抗锯齿 | 正向渲染](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfdfe89c-5b2b-4810-b657-a91a2921a8ce/17-with-msaa.png)

不使用抗锯齿 | 正向渲染器

使用多重取样抗锯齿 | 正向渲染

MSAA的质量依赖于它将多少取样用于沿它确定有锯齿的边缘混合颜色。取样越多，视觉质量越好，但代价是GPU处理更多。

你可以在项目设置的 **引擎（Engine）> 渲染（Rendering）> 默认设置（Default Settings）** 下通过 **MSAA取样数量（MSAA Sample Count）** 设置来设置MSAA使用的取样数量。此设置将控制台式机/主机和移动设备的取样数量。或者，你可以使用控制台变量 `r.MSAA.Quality` 来设置质量。

![渲染项目设置多重取样抗锯齿选项。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53fc44f4-df04-41a2-bb00-8971991c9a01/17-project-settings-msaa-options.png)

在 **2** 、 **4** 和 **8** 个取样之间选择。

   ![拖动滑块增加多重取样抗锯齿使用的取样数量。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afebbf0d-1892-458c-9f78-11cd3f543e07/18-msaa-disabled.png) ![拖动滑块增加多重取样抗锯齿使用的取样数量。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ac22031-14b6-470e-8bb7-13529e9ddeb2/18-msaa-2.png) ![拖动滑块增加多重取样抗锯齿使用的取样数量。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b075f299-77ff-4487-bc02-a856a7222347/18-msaa-4.png) ![拖动滑块增加多重取样抗锯齿使用的取样数量。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ae33170-10e6-4a15-9c55-f55abf0443ed/18-msaa-8.png)

**拖动滑块增加多重取样抗锯齿使用的取样数量。**

不同于其他抗锯齿技术，MSAA **不** 受引擎可扩展性设置控制，必须使用控制台变量或其项目设置进行设置。

在渲染链中，MSAA主要在空间上采样器之前沿边缘解决几何体锯齿。材质、纹理和透明表面中的锯齿不受MSAA影响。

![主屏幕百分比小于100%的MSAA和空间上采样器。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8895d55a-6983-4610-b45b-f6dd18ff8703/18-pipeline-msaa.png)

## 时序上提升器

**时序上提升器（Temporal Upscalers）** 使用来自当前和之前帧的数据来产生高质量的增强结果。 无论是虚幻引擎4的Temporal Anti-Aliasing Upscaling (TAAU)、虚幻引擎5的 [Temporal Super Resolution](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine)，还是诸如NVIDIA的DLSS 2+ Super Resolution、AMD的FSR 2.0+和Intel的XeSS等第三方插件

详见[Temporal Upscalers](/documentation/zh-cn/unreal-engine/temporal-upscalers-in-unreal-engine)，获得更多信息。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [anti aliasing](https://dev.epicgames.com/community/search?query=anti%20aliasing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [抗锯齿方法](/documentation/zh-cn/unreal-engine/anti-aliasing-and-upscaling-in-unreal-engine#%E6%8A%97%E9%94%AF%E9%BD%BF%E6%96%B9%E6%B3%95)
-   [抗锯齿可扩展性设置](/documentation/zh-cn/unreal-engine/anti-aliasing-and-upscaling-in-unreal-engine#%E6%8A%97%E9%94%AF%E9%BD%BF%E5%8F%AF%E6%89%A9%E5%B1%95%E6%80%A7%E8%AE%BE%E7%BD%AE)
-   [选择抗锯齿方法](/documentation/zh-cn/unreal-engine/anti-aliasing-and-upscaling-in-unreal-engine#%E9%80%89%E6%8B%A9%E6%8A%97%E9%94%AF%E9%BD%BF%E6%96%B9%E6%B3%95)
-   [时间超级分辨率](/documentation/zh-cn/unreal-engine/anti-aliasing-and-upscaling-in-unreal-engine#%E6%97%B6%E9%97%B4%E8%B6%85%E7%BA%A7%E5%88%86%E8%BE%A8%E7%8E%87)
-   [时间抗锯齿上采样](/documentation/zh-cn/unreal-engine/anti-aliasing-and-upscaling-in-unreal-engine#%E6%97%B6%E9%97%B4%E6%8A%97%E9%94%AF%E9%BD%BF%E4%B8%8A%E9%87%87%E6%A0%B7)
-   [禁用时间上采样](/documentation/zh-cn/unreal-engine/anti-aliasing-and-upscaling-in-unreal-engine#%E7%A6%81%E7%94%A8%E6%97%B6%E9%97%B4%E4%B8%8A%E9%87%87%E6%A0%B7)
-   [屏幕百分比的特定于TAAU的着色器排列](/documentation/zh-cn/unreal-engine/anti-aliasing-and-upscaling-in-unreal-engine#%E5%B1%8F%E5%B9%95%E7%99%BE%E5%88%86%E6%AF%94%E7%9A%84%E7%89%B9%E5%AE%9A%E4%BA%8Etaau%E7%9A%84%E7%9D%80%E8%89%B2%E5%99%A8%E6%8E%92%E5%88%97)
-   [快速近似抗锯齿](/documentation/zh-cn/unreal-engine/anti-aliasing-and-upscaling-in-unreal-engine#%E5%BF%AB%E9%80%9F%E8%BF%91%E4%BC%BC%E6%8A%97%E9%94%AF%E9%BD%BF)
-   [多重取样抗锯齿](/documentation/zh-cn/unreal-engine/anti-aliasing-and-upscaling-in-unreal-engine#%E5%A4%9A%E9%87%8D%E5%8F%96%E6%A0%B7%E6%8A%97%E9%94%AF%E9%BD%BF)
-   [时序上提升器](/documentation/zh-cn/unreal-engine/anti-aliasing-and-upscaling-in-unreal-engine#%E6%97%B6%E5%BA%8F%E4%B8%8A%E6%8F%90%E5%8D%87%E5%99%A8)
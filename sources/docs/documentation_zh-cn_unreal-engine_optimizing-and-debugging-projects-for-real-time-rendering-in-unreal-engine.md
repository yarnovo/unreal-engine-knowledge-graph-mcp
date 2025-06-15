# 在虚幻引擎中优化并调试实时渲染项目 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/optimizing-and-debugging-projects-for-real-time-rendering-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:22:30.915Z

---

目录

![优化和调试实时渲染项目](https://dev.epicgames.com/community/api/documentation/image/469ebe99-5f84-4400-a4b4-ab5dba6894f4?resizing_type=fill&width=1920&height=335)

优化项目并非始终是个易事。获取最佳性能也并非易事，有些时候，毫秒之差就会产生巨大的影响。

## 开始优化项目

你可以从多个地方入手优化项目，从而改善性能。首先可以改进内容创作工作流、进行性能分析捕捉，了解用于渲染各帧所用的时间，以及使用编辑器内置工具。

虚幻引擎已经去繁从简，帮助你优化项目性能，不必再进行任何设置。然而，这并不代表你不能调整内置系统，从而更好地满足项目需求。

以下指南可帮助你确认常见的性能问题，了解如何发现问题。你还可以了解编辑器中可用于优化和改进性能的部分工具。

[](/documentation/zh-cn/unreal-engine/guidelines-for-optimizing-rendering-for-real-time-in-unreal-engine)

[![实时渲染优化指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8d21bda-b531-46ef-9f46-04408a169aef/image_1.png)](/documentation/zh-cn/unreal-engine/guidelines-for-optimizing-rendering-for-real-time-in-unreal-engine)

[实时渲染优化指南](/documentation/zh-cn/unreal-engine/guidelines-for-optimizing-rendering-for-real-time-in-unreal-engine)

[实时渲染优化和开发实践。](/documentation/zh-cn/unreal-engine/guidelines-for-optimizing-rendering-for-real-time-in-unreal-engine)

## 渲染管线优化

部分优化选择会直接影响到虚幻引擎所用的渲染管线。它们可以改善项目的整体性能，或者更合适你希望开发的特定平台。

例如，虚幻引擎的延迟路径（默认）和前向渲染器提供了多种渲染路径。对于VR和移动平台，前向渲染器可以改进性能，但并不支持引擎的全部渲染功能。

在其他情况下，渲染管线能够以更低的分辨率进行渲染并随后上推，而非直接以原始分辨率渲染，从而优化性能，同时维持了和原始分辨率相同的视觉保真度。

[](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine)

[![XR最佳实践](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/395e0fe2-5e38-4f1c-ad9b-cd6013ef6af1/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine)

[XR最佳实践](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine)

[关于创建与优化XR项目的最佳实践](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine)

[

![屏幕百分比与时序上采样](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0953635c-7c82-4305-87ab-5a9de1c2d66f/temporalupsample_after1-1.jpg)

屏幕百分比与时序上采样

介绍了屏幕百分比和时序上采样。





](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine)[

![动态分辨率](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c925291f-91f3-48ec-b2b1-c7a134733f12/dynamicres_topic.png)

动态分辨率

介绍如何动态调整屏幕分辨率来提升性能。





](/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine)

## 配置文件和扩展性优化

你可以通过控制台命令和配置文件设置属性，根据开发应用的平台或体验，相应地扩展项目。

控制台命令可用于调用与设置特定属性。它们可以在配置文件和扩展性设置中使用，提升项目开发或最终发布产品的渲染图片质量，同时优化性能。配置文件会存储可调用的扩展性设置，自动在项目中设置它们，并且可以针对特定平台。

例如，配置文件可以设置有多个扩展性选项，使用户能够从中选择，让应用在低端硬件上更流畅地运行。配置文件也可以存储专为特定平台设计的预设，使在该平台上运行的应用得到最佳的优化。

[](/documentation/zh-cn/unreal-engine/configuration-files-in-unreal-engine)

[![配置文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eec063ee-d5cb-4c6b-89e9-658109e8962f/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/configuration-files-in-unreal-engine)

[配置文件](/documentation/zh-cn/unreal-engine/configuration-files-in-unreal-engine)

[用于配置启动时的Gameplay或引擎行为的初始设置。](/documentation/zh-cn/unreal-engine/configuration-files-in-unreal-engine)

[

![命令行参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/242d03b4-214f-4e33-a7df-9c44aa198ea0/placeholder_topic.png)

命令行参数

可以传递到引擎可执行文件以自定义引擎在启动时的运行方式的参数。





](/documentation/zh-cn/unreal-engine/command-line-arguments-in-unreal-engine)[

![抗锯齿和上采样](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1648da04-a014-4d5a-8988-3b795d91e15e/aa-topic.png)

抗锯齿和上采样

虚幻引擎中提供的抗锯齿选项的简要概述。





](/documentation/zh-cn/unreal-engine/anti-aliasing-and-upscaling-in-unreal-engine)[

![光线追踪性能指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0fe57a34-736b-4a6f-bd11-7e4ccea3e191/stat-scenerendering-4.png)

光线追踪性能指南

用于提高项目中光线追踪功能性能的一系列精选主题。





](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine)[

![硬件光线追踪的建议和技巧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65c93759-d94a-46bc-88a6-cb4eac73b65d/raytracingbanner_hero.png)

硬件光线追踪的建议和技巧

介绍了使用硬件光线追踪开发项目时有助于项目开发的一系列技巧。





](/documentation/zh-cn/unreal-engine/hardware-ray-tracing-tips-and-tricks-in-unreal-engine)[

![伸缩性和开发人员](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8f9c76b-4ab9-47fa-9ad2-b0f44ba01ae2/scalability_topic.png)

伸缩性和开发人员

概述了伸缩性选项以及内容开发者、测试者、程序员和项目经理需要考虑的内容。





](/documentation/zh-cn/unreal-engine/scalability-and-the-developer-for-unreal-engine)[

![可延展参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db4efccd-85de-4373-920f-11d1fcfdeb37/scalability_topic.png)

可延展参考

可延展性选项、属性和控制台变量。





](/documentation/zh-cn/unreal-engine/scalability-reference-for-unreal-engine)[

![Stat命令](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cef73177-fff5-43ea-b0c7-d62ee6a4ac92/statcommand_topicimage.png)

Stat命令

专门针对显示游戏统计的控制台命令。





](/documentation/zh-cn/unreal-engine/stat-commands-in-unreal-engine)

## 资产优化

项目中的资产优化从开发项目时选择的工作流程开始。有时这意味着你需要使用最适合虚幻引擎工具的方式创建资产。而在其他情况下，内置编辑器工具就能替你代劳。

例如，人工为每个对象创建的细节等级（LOD）网格体是个费时费力的过程。虚幻引擎提供了自动工具，能够为你的网格体生成LOD。你甚至可以配置人工生成LOD的属性，或者让工具自动执行任务。

以下内置工具和系统可以帮助你在项目开发中改善性能。

%designing-visuals-rendering-and-graphics/rendering-optimization/nanite:Topic%[](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine)

[![可视性和遮挡剔除](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e853a11-34eb-437f-a6d7-ed0d0d0bc081/sceneview_viewfrustumculled.png)](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine)

[可视性和遮挡剔除](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine)

[介绍了虚幻引擎中的可视性与遮挡剔除方法。](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine)

[

![纹理流送](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca3f3595-51b3-4854-9fee-e837fe9dd0d9/overview_topic.png)

纹理流送

用于在运行时在内存中加载和卸载纹理的系统。





](/documentation/zh-cn/unreal-engine/texture-streaming-in-unreal-engine)[

![虚拟纹理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cceadf8a-945f-430d-bc49-d001aae1aab1/vt_hero.png)

虚拟纹理

介绍虚幻引擎中虚拟纹理的使用方法。





](/documentation/zh-cn/unreal-engine/virtual-texturing-in-unreal-engine)[

![分层细节级别（HLOD）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28d11f9b-6b7f-4bb5-b9bb-699ba1d2505d/topic-image.png)

分层细节级别（HLOD）

关于虚幻引擎中HLOD系统的信息





](/documentation/zh-cn/unreal-engine/hierarchical-level-of-detail-in-unreal-engine)[

![创建并使用 LOD](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93cc8c24-39e8-43fc-8da4-44ab573f120f/topic-image.png)

创建并使用 LOD

如何创建并使用 LOD。





](/documentation/zh-cn/unreal-engine/creating-and-using-lods-in-unreal-engine)[

![根据平台设置LOD](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6655457-e759-44a0-a168-2a1530667c63/topic-image.png)

根据平台设置LOD

讲解如何根据平台设置LOD。





](/documentation/zh-cn/unreal-engine/setting-up-per-platform-lods)[

![为静态网格体自动生成LOD](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f699580-7187-4569-b42d-d41ab71fad34/topic-image.png)

为静态网格体自动生成LOD

如何在UE5中使用自动LOD生成系统。





](/documentation/zh-cn/unreal-engine/static-mesh-automatic-lod-generation-in-unreal-engine)[

![代理几何工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ec74f3b-39f4-450a-a957-cfc81f33f0d6/placeholder_topic.png)

代理几何工具

代理几何工具集是一种提高您的虚幻引擎4(UE4)项目性能，同时保持您项目的视觉质量不受影响的工具。





](/documentation/zh-cn/unreal-engine/proxy-geometry-tool-in-unreal-engine)

## 调试和性能分析工具

虚幻引擎提供了自己的调试和性能分析工具，并为一些外部应用提供了插件。这些工具适合用于辨识与甄别能够提升性能的区域。

例如，使用关卡编辑器的可视化模式，就能在屏幕中通过视觉效果，确认当前渲染的材质开销。CPU和GPU性能分析工具可以捕捉单独一帧，解析渲染该帧所需的毫秒时间。凭借这类信息，你就能理解单独一阵中渲染最久的部分。调查高开销的行列项目，才能够进一步优化这些元素。

以下工具能帮助你调试项目元素并分析性能，以寻找优化性能的机会。

[](/documentation/zh-cn/unreal-engine/using-renderdoc-with-unreal-engine)

[![使用RenderDoc分析虚幻引擎画面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7ddbb3c-5270-4094-92ad-c0077e244e67/renderdoctopicimage.png)](/documentation/zh-cn/unreal-engine/using-renderdoc-with-unreal-engine)

[使用RenderDoc分析虚幻引擎画面](/documentation/zh-cn/unreal-engine/using-renderdoc-with-unreal-engine)

[RenderDoc是一款免费的开源图形调试程序，可以逐帧捕捉应用中的画面。](/documentation/zh-cn/unreal-engine/using-renderdoc-with-unreal-engine)

[

![Unreal Insights](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3818740-1216-4fbb-bff6-249ed0ed43ef/placeholder_topic.png)

Unreal Insights

使用Unreal Insights对你的项目进行解析。





](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)[

![GPU转储文件查看器工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ef767b7-9ebf-418c-ab2a-9fc05cf685b9/gpu-dump-viewer-pass-viewer.png)

GPU转储文件查看器工具

这个多平台命令可以将中间RDG纹理和缓冲转储至磁盘中，用以调查并调试渲染问题。





](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine)[

![渲染资源查看器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee30e4ae-9553-40c7-9abe-972a8054968a/rrv-topic.png)

渲染资源查看器

一个帮助识别分配给GPU内存的资源及其资产的工具。





](/documentation/zh-cn/unreal-engine/render-resource-viewer-in-unreal-engine)[

![图元调试器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/817f3436-98e6-4418-8fb4-69005b3add9b/rpd-1.png)

图元调试器

这是一项仅适用于运行时的工具，可以查看游戏客户端中渲染的图元相关的信息。





](/documentation/zh-cn/unreal-engine/primitive-debugger-in-unreal-engine)

## 其他话题

[](/documentation/zh-cn/unreal-engine/dealing-with-a-gpu-crash-when-using-unreal-engine)

[![如何修复GPU驱动程序崩溃](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/189c3958-d728-47f6-8b42-dbb7d9b95d64/fix-a-gpu-crash-topic.png)](/documentation/zh-cn/unreal-engine/dealing-with-a-gpu-crash-when-using-unreal-engine)

[如何修复GPU驱动程序崩溃](/documentation/zh-cn/unreal-engine/dealing-with-a-gpu-crash-when-using-unreal-engine)

[了解如何在Windows中编辑注册表项来修复GPU驱动程序崩溃。](/documentation/zh-cn/unreal-engine/dealing-with-a-gpu-crash-when-using-unreal-engine)

-   [performance](https://dev.epicgames.com/community/search?query=performance)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [开始优化项目](/documentation/zh-cn/unreal-engine/optimizing-and-debugging-projects-for-real-time-rendering-in-unreal-engine#%E5%BC%80%E5%A7%8B%E4%BC%98%E5%8C%96%E9%A1%B9%E7%9B%AE)
-   [渲染管线优化](/documentation/zh-cn/unreal-engine/optimizing-and-debugging-projects-for-real-time-rendering-in-unreal-engine#%E6%B8%B2%E6%9F%93%E7%AE%A1%E7%BA%BF%E4%BC%98%E5%8C%96)
-   [配置文件和扩展性优化](/documentation/zh-cn/unreal-engine/optimizing-and-debugging-projects-for-real-time-rendering-in-unreal-engine#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%92%8C%E6%89%A9%E5%B1%95%E6%80%A7%E4%BC%98%E5%8C%96)
-   [资产优化](/documentation/zh-cn/unreal-engine/optimizing-and-debugging-projects-for-real-time-rendering-in-unreal-engine#%E8%B5%84%E4%BA%A7%E4%BC%98%E5%8C%96)
-   [调试和性能分析工具](/documentation/zh-cn/unreal-engine/optimizing-and-debugging-projects-for-real-time-rendering-in-unreal-engine#%E8%B0%83%E8%AF%95%E5%92%8C%E6%80%A7%E8%83%BD%E5%88%86%E6%9E%90%E5%B7%A5%E5%85%B7)
-   [其他话题](/documentation/zh-cn/unreal-engine/optimizing-and-debugging-projects-for-real-time-rendering-in-unreal-engine#%E5%85%B6%E4%BB%96%E8%AF%9D%E9%A2%98)
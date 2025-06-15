# 虚幻引擎中的光线追踪和路径追踪功能 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/ray-tracing-and-path-tracing-features-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:16:29.532Z

---

目录

![硬件光线追踪和路径追踪功能](https://dev.epicgames.com/community/api/documentation/image/a666e5cc-077c-445d-acb4-3da168fe2b9a?resizing_type=fill&width=1920&height=335)

长期以来，影视和可视化领域一直在使用光线追踪技术来渲染逼真的图像，但这种渲染方式通常需要高性能的计算机，而且需要逐图（或逐帧）渲染，非常耗时。如果是建筑可视化内容，通常需要渲染数小时。对于电影和电视，渲染高质量的图像序列可能需要数小时甚至数天。

虚幻引擎使用自身的光线追踪代码库，其实时和离线渲染路径都共享这套代码库。在渲染实时场景时，例如交互式体验或游戏，实时光追路径更加合适。相比而言，离线路径使用内置的路径追踪器生成无损的场景渲染画面。它与[影片渲染队列](/documentation/404)无缝协作，输出质量最高的帧渲染。

浏览以下主题，了解有关这些路径的更多信息，以及如何在自己的项目中加以使用。

## 虚幻引擎中的光线追踪

虚幻引擎中的光线追踪支持两种模式：

-   混合 **光线追踪器**，将光线追踪功能与用于实时渲染的传统光栅技术相结合。
-   **路径追踪器**，用于生成高质量、无损的渲染结果。

## 系统要求

计算机必须满足以下系统要求，才能使用虚幻引擎的光线追踪和路径追踪功能：

系统要求

 

**操作系统**

-   [Windows 10 RS5（版本1809）或更高版本](https://support.microsoft.com/en-us/help/4028685/windows-10-get-the-update)
    
    在Windows搜索栏中输入 **winver**，确认你的Windows版本。
    
-   Linux和Windows上的Vulkan Desktop
    
    -   关于需要的操作系统构建的详情，请参阅[硬件和软件规格](/documentation/404)。

**GPU**

NVIDIA RTX和一些GTX系列显卡，支持DXR，使用最新的设备驱动程序。

有关更多信息，请参阅[此处](https://www.nvidia.com/en-us/geforce/news/geforce-gtx-dxr-ray-tracing-available-now)的NVIDIA网站。

**虚幻引擎版本**

5.0及以上

**虚幻引擎渲染路径**

延迟路径

## 概述

[](/documentation/zh-cn/unreal-engine/hardware-ray-tracing-in-unreal-engine)

[![硬件光线追踪](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8434f629-dd29-458f-bffd-2e82ebf1f1b0/rt_softshadows_1.png)](/documentation/zh-cn/unreal-engine/hardware-ray-tracing-in-unreal-engine)

[硬件光线追踪](/documentation/zh-cn/unreal-engine/hardware-ray-tracing-in-unreal-engine)

[介绍基于硬件的实时光追功能。](/documentation/zh-cn/unreal-engine/hardware-ray-tracing-in-unreal-engine)

[

![路径追踪器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0887f69e-6bb4-4a64-a752-5ffaee1ef462/pathtracer.png)

路径追踪器

了解路径追踪器，以及如何用它为最终镜头渲染高质量图像，并与实时渲染场景进行直观的比较。





](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine)

## 指南

[](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine)

[![光线追踪性能指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0fe57a34-736b-4a6f-bd11-7e4ccea3e191/stat-scenerendering-4.png)](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine)

[光线追踪性能指南](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine)

[用于提高项目中光线追踪功能性能的一系列精选主题。](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine)

[

![硬件光线追踪的建议和技巧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65c93759-d94a-46bc-88a6-cb4eac73b65d/raytracingbanner_hero.png)

硬件光线追踪的建议和技巧

介绍了使用硬件光线追踪开发项目时有助于项目开发的一系列技巧。





](/documentation/zh-cn/unreal-engine/hardware-ray-tracing-tips-and-tricks-in-unreal-engine)[

![如何将影片渲染队列用于高质量渲染](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d710db46-a322-4206-94cf-74f529495065/placeholder_topic.png)

如何将影片渲染队列用于高质量渲染

关于虚幻引擎影片渲染队列功能的配置指南，旨在帮助你便获取高质量过场动画（特别适用于启用光线追踪的情况下）。





](/documentation/zh-cn/unreal-engine/rendering-high-quality-frames-with-movie-render-queue-in-unreal-engine)

## 参考

[](/documentation/zh-cn/unreal-engine/ray-tracing-and-path-tracer-features-properties-in-unreal-engine)

[![硬件光线追踪和路径追踪器功能属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/594e85a3-2e88-4134-8778-10c1f382f230/rectlight_settings.png)](/documentation/zh-cn/unreal-engine/ray-tracing-and-path-tracer-features-properties-in-unreal-engine)

[硬件光线追踪和路径追踪器功能属性](/documentation/zh-cn/unreal-engine/ray-tracing-and-path-tracer-features-properties-in-unreal-engine)

[光线追踪和路径追踪器功能的所有可用属性设置的列表。](/documentation/zh-cn/unreal-engine/ray-tracing-and-path-tracer-features-properties-in-unreal-engine)

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [film](https://dev.epicgames.com/community/search?query=film)
-   [architectural visualization](https://dev.epicgames.com/community/search?query=architectural%20visualization)
-   [ray tracing](https://dev.epicgames.com/community/search?query=ray%20tracing)
-   [path tracing](https://dev.epicgames.com/community/search?query=path%20tracing)
-   [tv](https://dev.epicgames.com/community/search?query=tv)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [虚幻引擎中的光线追踪](/documentation/zh-cn/unreal-engine/ray-tracing-and-path-tracing-features-in-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%B8%AD%E7%9A%84%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA)
-   [系统要求](/documentation/zh-cn/unreal-engine/ray-tracing-and-path-tracing-features-in-unreal-engine#%E7%B3%BB%E7%BB%9F%E8%A6%81%E6%B1%82)
-   [概述](/documentation/zh-cn/unreal-engine/ray-tracing-and-path-tracing-features-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [指南](/documentation/zh-cn/unreal-engine/ray-tracing-and-path-tracing-features-in-unreal-engine#%E6%8C%87%E5%8D%97)
-   [参考](/documentation/zh-cn/unreal-engine/ray-tracing-and-path-tracing-features-in-unreal-engine#%E5%8F%82%E8%80%83)
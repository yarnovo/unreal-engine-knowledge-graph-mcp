# 虚幻引擎中的ICVFX | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/in-camera-vfx-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:25:33.169Z

---

目录

![ICVFX](https://dev.epicgames.com/community/api/documentation/image/d83bda3a-cd0a-4e93-a60d-210a4198ce57?resizing_type=fill&width=1920&height=335)

摄像机内视效（In-Camera VFX）是一种令人兴奋的全新技术，允许你在拍摄实景镜头时，同时拍摄实时视觉特效。这项技术依赖众多其他技术，例如LED光照、实时摄像机追踪、离轴投影下的实时渲染，从而实现前景演员和虚拟背景之间的无缝过渡。它的主要目的是取代绿幕合成，让摄像机能直接拍摄到最终画面。

## 开始入门

[](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine)

[![镜头内视效概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46fac2a5-7803-4c73-ac9b-c79ed883f232/topicimage_incameravfx.png)](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine)

[镜头内视效概述](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine)

[介绍了在沉浸式LED摄影棚中拍摄电影时，如何运用](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine)

[

![In-Camera VFX 编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83c136a4-530f-46ff-9bff-305a1f6e1beb/placeholder_topic.png)

In-Camera VFX 编辑器

一个为虚拟制片设计的工具，它将常用工具全都集成在一个单一界面中。





](/documentation/zh-cn/unreal-engine/in-camera-vfx-editor-for-unreal-engine)[

![ICVFX快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7daca4cb-0a7e-43c5-80cc-382c7ca2c5a7/topicimage_incameravfx.png)

ICVFX快速入门

关于在LED体积中使用摄像机内视觉特效处理（ICVFX）的初始步骤指南





](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine)[

![ICVFX推荐硬件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35b60862-175d-4cdd-878f-a271dedf481a/placeholder_topic.png)

ICVFX推荐硬件

详细介绍使用虚幻引擎拍摄镜头内视效时推荐使用的硬件配置





](/documentation/zh-cn/unreal-engine/recommended-hardware-for-in-camera-vfx-in-unreal-engine)[

![ICVFX项目结构示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/845dbd8a-7fc5-4224-83e9-e72d30c10afe/placeholder_topic.png)

ICVFX项目结构示例

关于在内容浏览器中整理摄像机视觉特效处理项目的文件结构的参考指南。





](/documentation/zh-cn/unreal-engine/in-camera-vfx-project-structure-example-in-unreal-engine)[

![ICVFX最佳实践](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/138f081a-c9bd-4bdc-a256-419a4daf07dd/placeholder_topic.png)

ICVFX最佳实践

介绍多种ICVFX改进方法，从而获得最佳效果





](/documentation/zh-cn/unreal-engine/in-camera-vfx-best-practices-in-unreal-engine)[

![ICVFX颜色校准](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a12072dd-d7e3-4aa9-ae78-644b684e26a2/placeholder_topic.png)

ICVFX颜色校准

如何校准LED墙上内容的显示，以通过给定摄像机进行捕获。





](/documentation/zh-cn/unreal-engine/camera-color-calibration-for-in-camera-vfx-in-unreal-engine)[

![使用Aruco将LED墙对齐到摄像机追踪](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a9bbb29-b14b-4233-93f5-7a395e7af3a6/lwc_topicimage.png)

使用Aruco将LED墙对齐到摄像机追踪

关于使用LED墙上显示的Aruco标识将光学追踪系统对齐到LED墙的指南。





](/documentation/zh-cn/unreal-engine/aligning-the-led-wall-to-camera-tracking-using-arucos-in-unreal-engine)[

![ICVFX模板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab95a1be-c957-40a0-8674-12a12ce0ac83/vfx_template_topic.png)

ICVFX模板

ICVFX模板的概述





](/documentation/zh-cn/unreal-engine/in-camera-vfx-template-in-unreal-engine)[

![ICVFX制片测试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/693904d1-d3bf-445e-98cc-3d2d67eed6ef/icvfx-production-test-topic.png)

ICVFX制片测试

介绍如何设置ICVFX制片测试示例，探究制片期间使用的功能、项目结构和设置。





](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine)

-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [virtual scouting](https://dev.epicgames.com/community/search?query=virtual%20scouting)
-   [camera](https://dev.epicgames.com/community/search?query=camera)
-   [live link](https://dev.epicgames.com/community/search?query=live%20link)
-   [in-camera vfx](https://dev.epicgames.com/community/search?query=in-camera%20vfx)
-   [composure](https://dev.epicgames.com/community/search?query=composure)
-   [ndisplay](https://dev.epicgames.com/community/search?query=ndisplay)
-   [multi-user editing](https://dev.epicgames.com/community/search?query=multi-user%20editing)
-   [synchronization](https://dev.epicgames.com/community/search?query=synchronization)
-   [remote control](https://dev.epicgames.com/community/search?query=remote%20control)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [开始入门](/documentation/zh-cn/unreal-engine/in-camera-vfx-in-unreal-engine#%E5%BC%80%E5%A7%8B%E5%85%A5%E9%97%A8)
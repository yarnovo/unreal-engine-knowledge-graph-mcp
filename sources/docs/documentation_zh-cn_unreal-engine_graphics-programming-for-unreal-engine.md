# 虚幻引擎中的图形编程 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/graphics-programming-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:24:26.245Z

---

目录

![图形编程](https://dev.epicgames.com/community/api/documentation/image/b3d4d42b-be73-4c39-b5bb-8711a0378db9?resizing_type=fill&width=1920&height=335)

引擎中的渲染器模块管理并渲染场景，而场景拥有和每个世界场景相关的可渲染信息。它包括所有绘制规则和着色器的定义。

RHI 模块是渲染 API 的接口，是图形编程的另一个关键组件。[图形编程介绍](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine)包含许多可研究的键类、设置和变量，以下子页面包含详细的渲染要点。

[

![FShaderCache](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/290d40f5-c12d-4735-9d7f-36e271a27698/placeholder_topic.png)

FShaderCache

FShaderCache 提供的机制可减少游戏中着色器的卡顿。





](/documentation/zh-cn/unreal-engine/fshadercache-in-unreal-engine)[

![网格体绘制管道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46bf8951-d7c9-4cb1-bc44-4509f9919baa/meshpipelineoverview_1.png)

网格体绘制管道

介绍如何添加自定义网格体通道以及虚幻引擎网格体绘制的性能特定。





](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine)[

![图形编程介绍](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a56f5890-e9df-446c-b5ca-b0f38f276d8f/graphics.jpg)

图形编程介绍

介绍图形程序员如何使用渲染系统和编写着色器。





](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine)[

![并行渲染介绍](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/404f491d-376a-4a32-8311-f43c36a76374/parallel_rendering_00.png)

并行渲染介绍

介绍并行渲染





](/documentation/zh-cn/unreal-engine/parallel-rendering-overview-for-unreal-engine)[

![渲染依赖图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44b30844-771d-46e1-a51f-72200420ed0c/setup-and-execute-timelines-with-and-without-rdg.png)

渲染依赖图

一种即时模式API，可将要编译和执行的渲染命令记录到图数据结构中。





](/documentation/zh-cn/unreal-engine/render-dependency-graph-in-unreal-engine)[

![着色器开发](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/caffccaf-a207-4412-b645-440525811ce5/placeholder_topic.png)

着色器开发

面向编写着色器的图形程序员的信息。





](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine)[

![异步计算](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcc89393-5f82-476b-a984-f07280dd9696/pixtimingcapture.png)

异步计算

异步计算（AsyncCompute） 是一种硬件功能，用于交错不同GPU任务并提高工作效率。





](/documentation/zh-cn/unreal-engine/asynccompute-in-unreal-engine)[

![插件中的Shader](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2a5679c-b49a-457b-a4a4-a578a46b1b52/ht_hero_image.png)

插件中的Shader

在插件中创建和使用Shader。





](/documentation/zh-cn/unreal-engine/shaders-in-plugins-for-unreal-engine)[

![插件中的 Shader](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc13c2eb-b940-4ac1-8c4c-371395dde981/placeholder_topic.png)

插件中的 Shader

介绍如何在插件中编写 Shader





](/documentation/zh-cn/unreal-engine/overview-of-shaders-in-plugins-unreal-engine)[

![新建全局着色器并作为插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2728e94a-5853-4290-9405-af9e25acc1ca/ht_hero_image.png)

新建全局着色器并作为插件

通过插件来新建和设置全局着色器。





](/documentation/zh-cn/unreal-engine/creating-a-new-global-shader-as-a-plugin-in-unreal-engine)[

![线程渲染](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ade7c781-8b52-4850-ae73-e909ecb362d5/placeholder_topic.png)

线程渲染

针对图形程序员的线程渲染器使用信息。





](/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine)

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
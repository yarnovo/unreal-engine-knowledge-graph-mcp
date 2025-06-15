# 虚幻引擎中的寻路系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/navigation-system-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:42:59.007Z

---

目录

![寻路系统](https://dev.epicgames.com/community/api/documentation/image/6e6ce7bd-0f7e-4b8e-be8f-e989bc7235ef?resizing_type=fill&width=1920&height=335)

**虚幻引擎寻路系统** 允许人工智能代理通过寻路功能在关卡中走动。

该系统会从关卡中的碰撞几何结构生成寻路网格体，并将网格体划分为图块。这些图块接着划分为多边形，以构成代理在前往目的地时使用的图表。每个多边形都指定有成本，可供代理用于确定总体成本最低的最优路径。

寻路系统包含各种组件以及可修改寻路网格体生成方式的设置，例如指定给多边形的成本。这进而影响代理在你的关卡中寻路的方式。你还可以将寻路网格体中不连续的区域连接起来，如平台和桥梁。

寻路系统包含三种 **生成模式（Generation Modes）**：**静态（Static）**、**动态（Dynamic）** 和 **仅限动态修改器（Dynamic Modifiers Only）**。这些模式控制了项目中生成寻路网格体的方式，并提供了各种选项来满足你的需要。

该系统还为代理提供了两种规避方法：**相对速度障碍物(RVO)（Reciprocal Velocity Obstacles (RVO)）** 和 **大规模人群绕行避让管理器（Detour Crowd Manager）**。这些方法允许代理在游戏过程中绕行，避让动态障碍物和其他代理。

在以下指南中，你将学习寻路系统的不同组件和设置，以及如何使用它们为项目创建互动式人工智能代理。

你可以在此处下周寻路系统示例：[示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/3aa1013f-bbc6-420a-9a4c-cfcd9d1b7e07/navsystemsample.zip)。其中的关卡示例涉及下述指南中的内容。

[

![基本寻路](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a53e7794-7d0d-4a3d-8b94-b6b11f678918/basic-nav-topic-image.png)

基本寻路

本指南将介绍如何使用虚幻引擎中的寻路系统。





](/documentation/zh-cn/unreal-engine/basic-navigation-in-unreal-engine)[

![如何修改寻路网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be3f72ab-540c-447b-94e4-e7967817244b/modnav_topicimage.png)

如何修改寻路网格体

介绍在虚幻引擎中修改寻路网格体的不同方法。





](/documentation/zh-cn/unreal-engine/modifying-the-navigation-mesh-in-unreal-engine)[

![自定义寻路区域和查询筛选器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bcfe4ce-a426-46dc-b839-fb1649569911/customnav_topicimage.png)

自定义寻路区域和查询筛选器

本指南介绍如何使用寻路系统中的自定义区域和查询筛选器。





](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-in-unreal-engine)[

![在寻路系统中使用避障机制](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70a68fd0-aeb0-4b80-9d51-8c0082fbf483/avoidance-topic-image.png)

在寻路系统中使用避障机制

本指南介绍如何使用寻路系统中的避障。





](/documentation/zh-cn/unreal-engine/using-avoidance-with-the-navigation-system-in-unreal-engine)[

![使用寻路调用程序](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e150a9a8-49f0-48f3-8fdf-e5edb7d91613/invokers-topic-image.png)

使用寻路调用程序

本指南将介绍如何使用寻路调用程序。





](/documentation/zh-cn/unreal-engine/using-navigation-invokers-in-unreal-engine)[

![优化寻路网格体的生成速度](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dced508b-901c-49e9-98e4-b43927d93582/basic-navigation-topic-image.png)

优化寻路网格体的生成速度

关于如何优化寻路网格体生成速度的入门指南。





](/documentation/zh-cn/unreal-engine/optimizing-navigation-mesh-generation-speed-in-unreal-engine)[

![寻路网格体分辨率用户指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0be83d9-3d5e-47c8-92d9-b3861c6a159d/basic-nav-topic-image.png)

寻路网格体分辨率用户指南

本指南旨在帮助你了解在虚幻引擎中，如何在同一寻路网格体内应用多种分辨率。





](/documentation/zh-cn/unreal-engine/navigation-mesh-resolutions-user-guide)[

![世界分区寻路网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89054dea-10d1-4ce4-ae96-0cad25dca005/basicnav_topicimage.png)

世界分区寻路网格体

介绍如何通过世界分区使用寻路网格体。





](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh)[

![自动生成寻路链接](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ace6e3c4-1857-46e2-88e3-e0bfa6937c20/nav-auto-links-topic.png)

自动生成寻路链接

了解如何在虚幻引擎中自动生成寻路链接。





](/documentation/zh-cn/unreal-engine/automatic-navigation-link-generation)[

![寻路组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec0afce3-7694-4c9d-90d0-663361efc5e1/placeholder_topic.png)

寻路组件

概述如何使用寻路组件来修改或扩展寻路功能。





](/documentation/zh-cn/unreal-engine/navigation-components-in-unreal-engine)

-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [navigation](https://dev.epicgames.com/community/search?query=navigation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
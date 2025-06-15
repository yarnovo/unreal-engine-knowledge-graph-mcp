# 虚幻引擎自定义寻路区域和查询筛选器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:43:00.689Z

---

目录

![自定义寻路区域和查询筛选器](https://dev.epicgames.com/community/api/documentation/image/ed8f2dc2-f640-40ea-9a0b-f6e05174365d?resizing_type=fill&width=1920&height=335)

**虚幻引擎的** **寻路系统（Navigation System）** 可以借助 **寻路网格体（Navigation Mesh）** 让代理（Agent）在关卡中进行寻路。

代理会比较寻路网格体中不同寻路多边形的成本，最终选出最优路线。如果路线中所有多边形的成本均等，那么代理就会选择到达目标的最短路线（通常是直线距离）。

你可以通过 **寻路调整器体积（Navigation Modifier Volumes）** 和 **寻路查询筛选器（Navigation Query Filters）** 来改变寻路多边形的成本。

准备指南能够帮助你创建[自定义寻路区域和查询筛选器](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-quick-start-in-unreal-engine) 指南所需的示例关卡。或者，你可以下载[完整示例项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/0eaab25a-0a79-44a7-87cc-0017f2391986/navsystemsample.zip)，其中已经包括了名为 **LevelCustomZones** 的完整关卡。

[

![自定义导航区域和查询筛选器准备指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6068d7bc-32b8-416d-a5b6-e02e71296e29/custom-nav-topic-image.png)

自定义导航区域和查询筛选器准备指南

本指南涵盖了解自定义导航区域和查询筛选器所需的初始步骤。





](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-preparation-guide-in-unreal-engine)[

![自定义寻路区域和查询筛选器概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a906fce0-9a9c-4705-a703-1ece0afa5f50/custom-nav-topic-image.png)

自定义寻路区域和查询筛选器概述

本指南将介绍如何在寻路系统中使用自定义区域和查询筛选器。





](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-quick-start-in-unreal-engine)

-   [ai](https://dev.epicgames.com/community/search?query=ai)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
# 修改虚幻引擎寻路网格体 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/modifying-the-navigation-mesh-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:42:54.949Z

---

目录

![如何修改寻路网格体](https://dev.epicgames.com/community/api/documentation/image/fa951f53-b991-4dd1-8ccf-f60193eff1bc?resizing_type=fill&width=1920&height=335)

虚幻引擎的 **寻路系统（Navigation System）** 为人工智能代理提供了寻路功能。为了能够找到起点和终点之间的路径，引擎会根据场景中的碰撞几何体生成寻路网格体。本文中的指南将介绍如何在虚幻引擎中修改寻路网格体。

准备指南将创建[修改导航网格](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine)指南所需的示例关卡。或者，你可以下载[完整的示例项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/660c21ae-daa4-4fb0-810f-d1972a270a93/navsystemsample.zip)，其中包括名为 **LevelMod\_Navigation\_0** 的完整关卡。

[

![关于修改导航系统的准备指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4edef257-e69f-4551-b32f-f9e5f4c6e6c0/mod-nav-topic-image.png)

关于修改导航系统的准备指南

本指南涵盖了学习修改导航系统所需的基本步骤。





](/documentation/zh-cn/unreal-engine/modifying-the-navigation-mesh-preparation-guide-in-unreal-engine)[

![修改寻路系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/478d7767-51ca-42e8-86bd-ed5dd5a4e45d/mod-nav-topic-image.png)

修改寻路系统

本指南将介绍如何修改虚幻引擎中的寻路系统。





](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine)

-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [navigation](https://dev.epicgames.com/community/search?query=navigation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
# 虚幻引擎中的分层细节级别（HLOD） | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/hierarchical-level-of-detail-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:11:45.138Z

---

目录

![分层细节级别（HLOD）](https://dev.epicgames.com/community/api/documentation/image/1af6a48b-f67e-483a-8483-e3cf31efbd0a?resizing_type=fill&width=1920&height=335)

虚幻引擎中的一个复杂关卡可以包含上百个细节丰富的静态网格体资产。对于这种程度的细节，一次加载方圆数公里的关卡会非常缓慢。

当模型处于远距离时，分层细节级别（HLOD）系统可以将多个静态网格体Actor合并成单个代理网格体和材质。这能减少场景中需要渲染的Actor数量，从而减少每帧的绘制调用数量，并提高性能。这在处理大型开放世界时特别有用。

[

![构建HLOD网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53ebd9c3-2d3c-4cd4-bf94-a9c09ef59548/topic-image.png)

构建HLOD网格体

本文介绍了如何在启用HLOD的虚幻引擎5项目中生成HLOD网格体。





](/documentation/zh-cn/unreal-engine/building-hierarchical-level-of-detail-meshes-in-unreal-engine)[

![HLOD概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/433b2b8f-f9ff-4353-be99-fbde23523eeb/hlod_overview_topic.png)

HLOD概述

介绍虚幻引擎4中的HLOD系统





](/documentation/zh-cn/unreal-engine/hierarchical-level-of-detail-overview-in-unreal-engine)[

![分层细节级别大纲视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81481343-f002-4ed7-9f92-a5d766220357/topic-image.png)

分层细节级别大纲视图

HLOD大纲视图中的界面元素和属性的参考页面。





](/documentation/zh-cn/unreal-engine/hierarchical-level-of-detail-outliner-in-unreal-engine)

-   [hlod](https://dev.epicgames.com/community/search?query=hlod)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
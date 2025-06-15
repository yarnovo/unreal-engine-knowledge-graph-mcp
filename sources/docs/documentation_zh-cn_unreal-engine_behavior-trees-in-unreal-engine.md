# 虚幻引擎中的行为树 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/behavior-trees-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:42:05.240Z

---

目录

![行为树](https://dev.epicgames.com/community/api/documentation/image/18b950c2-e141-4762-b510-a2424345c03d?resizing_type=fill&width=1920&height=335)

我们可以用虚幻引擎5（虚幻引擎）中的 **行为树资源** 为项目中的非玩家角色创建人工智能（AI）。虽然行为树资源将被用于执行包含逻辑的分支，从而决定应该执行的分支，但行为树依赖于另一种称为 **黑板** 的资源，它充当了行为树的"大脑"。

黑板包含了数个用户定义的 **键**，这些键会保存行为树用于进行决策的信息。举例而言，用户可以设置一个名为 *Is Light On* 的布尔键，行为树可以引用该键来查看数值是否已变化。如果该值为true，它就会执行一个让蟑螂逃跑的分支。如果该值为false，它就会执行另一个分支，使蟑螂在环境中随机移动。蟑螂范例中给出的行为树非常简单。而在多人游戏中则十分复杂，其能模拟另一个真人玩家，进行寻找掩护、向玩家射击和寻找拾取物等操作。

如您还不熟悉虚幻引擎中的行为树，建议先行阅读 **行为树快速入门指南**，快速创建并运行AI角色。如果您已经熟悉其他应用程序中行为树的概念，则建议阅读 **概要** 部分，其中包含行为树在虚幻引擎中工作方式的概述、行为树和黑板的用户指南，以及行为树中可用的各种节点的参考页面。

## 开始

[](/documentation/zh-cn/unreal-engine/behavior-tree-in-unreal-engine---quick-start-guide)

[![行为树快速入门指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35704c4a-7a79-45a2-9927-72597c60ff5d/behavior-tree-qs-topic.png)](/documentation/zh-cn/unreal-engine/behavior-tree-in-unreal-engine---quick-start-guide)

[行为树快速入门指南](/documentation/zh-cn/unreal-engine/behavior-tree-in-unreal-engine---quick-start-guide)

[本指南说明如何使用行为树设置AI角色，使其利用行为树巡逻或追逐玩家。](/documentation/zh-cn/unreal-engine/behavior-tree-in-unreal-engine---quick-start-guide)

## 概要

[](/documentation/zh-cn/unreal-engine/behavior-tree-in-unreal-engine---overview)

[![行为树概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d88261b-bb03-4673-9c44-10149641f101/behavior-tree-overview-anatomy-run-behavior-tree.png)](/documentation/zh-cn/unreal-engine/behavior-tree-in-unreal-engine---overview)

[行为树概述](/documentation/zh-cn/unreal-engine/behavior-tree-in-unreal-engine---overview)

[介绍虚幻引擎中行为树背后的概念，以及其与传统行为树的区别。](/documentation/zh-cn/unreal-engine/behavior-tree-in-unreal-engine---overview)

[

![行为树用户指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53d040b1-259c-4e5d-8a93-fdbb2c623932/behavior-tree-user-guide-topic.png)

行为树用户指南

描述如何创建和编辑行为树及行为树相关的资源。





](/documentation/zh-cn/unreal-engine/behavior-tree-in-unreal-engine---user-guide)[

![行为树节点参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a808741-dc23-4eb3-859d-b05699c2611c/behavior-tree-nodes-topic.png)

行为树节点参考

概述使用行为树编辑器时可用的各种节点。





](/documentation/zh-cn/unreal-engine/behavior-tree-node-reference-in-unreal-engine)

-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [artificial intelligence](https://dev.epicgames.com/community/search?query=artificial%20intelligence)
-   [behavior trees](https://dev.epicgames.com/community/search?query=behavior%20trees)
-   [ai systems](https://dev.epicgames.com/community/search?query=ai%20systems)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [开始](/documentation/zh-cn/unreal-engine/behavior-trees-in-unreal-engine#%E5%BC%80%E5%A7%8B)
-   [概要](/documentation/zh-cn/unreal-engine/behavior-trees-in-unreal-engine#%E6%A6%82%E8%A6%81)
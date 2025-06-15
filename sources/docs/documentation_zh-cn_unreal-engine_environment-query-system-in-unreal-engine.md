# 虚幻引擎中的场景查询系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/environment-query-system-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:44:20.229Z

---

目录

![场景查询系统](https://dev.epicgames.com/community/api/documentation/image/8a199102-670d-4c75-a1d6-3c6f09768035?resizing_type=fill&width=1920&height=335)

**场景查询系统（EQS）** 是虚幻引擎5（UE5） AI系统的一个功能，可将其用于从环境中收集数据。在EQS中，可以通过不同种类的测试向收集的数据提问，这些测试会根据提出问题的类型来生成最适合的项目。 

可以从[行为树](/documentation/zh-cn/unreal-engine/behavior-trees-in-unreal-engine)中调用EQS查询，并根据测试的结果将其用于后续操作的决定。EQS查询主要由[生成器](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine)节点（用于生成将被测试及加权的位置或Actor）和[情境](/documentation/zh-cn/unreal-engine/eqs-node-reference-contexts-in-unreal-engine)节点（被用作各种测试和生成器引用的框架）组成。可以用EQS查询指引AI角色找到能够发现玩家并发起攻击的最佳位置、找到距离最近的体力值或弹药拾取物，或找到最近的掩体（以及其他可进行的动作）。 

对虚幻引擎中行为树的工作方式有大致了解后，如果希望AI进行环境查询，建议从 **场景查询系统快速入门** 指南开始，它会向您全程展示一个案例，该案例中的AI会找到对玩家发起远程攻击的最佳位置。您还可以查阅"概要"部分，其中包含EQS的概述、讲述EQS用法的用户指南、以及详解EQS中可用节点和属性的节点参考页面。 

## 开始

[](/documentation/zh-cn/unreal-engine/environment-query-system-quick-start-in-unreal-engine)

[![场景查询系统快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19384a00-3e60-45f4-9d22-4a92e07cdee6/environment-query-system-quick-start-image.png)](/documentation/zh-cn/unreal-engine/environment-query-system-quick-start-in-unreal-engine)

[场景查询系统快速入门](/documentation/zh-cn/unreal-engine/environment-query-system-quick-start-in-unreal-engine)

[场景查询系统快速入门旨在帮助用户快速了解该系统的一些知识和用于处理EQS与AI的工具。](/documentation/zh-cn/unreal-engine/environment-query-system-quick-start-in-unreal-engine)

## 概要

[](/documentation/zh-cn/unreal-engine/environment-query-system-overview-in-unreal-engine)

[![场景查询系统概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e5d6d33-1937-4f33-9922-c10d620912d0/environment-query-system-overview-run-environment-query-system-1.png)](/documentation/zh-cn/unreal-engine/environment-query-system-overview-in-unreal-engine)

[场景查询系统概述](/documentation/zh-cn/unreal-engine/environment-query-system-overview-in-unreal-engine)

[场景查询系统的概述页面。](/documentation/zh-cn/unreal-engine/environment-query-system-overview-in-unreal-engine)

[

![场景查询系统用户指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/108a0889-1382-4599-a9ab-52aaec9e5bea/environment-query-system-user-guide-image.png)

场景查询系统用户指南

描述了创建和使用EQS资源的常见方法。





](/documentation/zh-cn/unreal-engine/environment-query-system-user-guide-in-unreal-engine)[

![场景查询系统节点参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea88e9dc-8ff1-44d1-a706-3600737c337b/environment-query-system-node-reference-image.png)

场景查询系统节点参考

场景查询系统节点参考页面。





](/documentation/zh-cn/unreal-engine/environment-query-system-node-reference-in-unreal-engine)[

![场景查询测试Pawn](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6d7aa14-b81d-45ea-b26f-970f57759c92/environment-query-system-testing-pawn-topic.png)

场景查询测试Pawn

概述如何使用EQS测试Pawn进行调试并查看EQS查询的执行情况。





](/documentation/zh-cn/unreal-engine/environment-query-testing-pawn-in-unreal-engine)

-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [behavior trees](https://dev.epicgames.com/community/search?query=behavior%20trees)
-   [ai systems](https://dev.epicgames.com/community/search?query=ai%20systems)
-   [eqs](https://dev.epicgames.com/community/search?query=eqs)
-   [environment query system](https://dev.epicgames.com/community/search?query=environment%20query%20system)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [开始](/documentation/zh-cn/unreal-engine/environment-query-system-in-unreal-engine#%E5%BC%80%E5%A7%8B)
-   [概要](/documentation/zh-cn/unreal-engine/environment-query-system-in-unreal-engine#%E6%A6%82%E8%A6%81)
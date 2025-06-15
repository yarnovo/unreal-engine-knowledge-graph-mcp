# 虚幻引擎游戏内分析 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/in-game-analytics-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:55:46.119Z

---

目录

![游戏运行的性能分析](https://dev.epicgames.com/community/api/documentation/image/8dedd636-a2fc-4c39-8524-9035bf80a1bc?resizing_type=fill&width=1920&height=335)

要获得有关游戏性能的数据，会需要用到外部的分析软件，获取并处理游戏数据。对于没有自制解决方案的开发人员或团队而言，则可从各种 免费服务以及付费服务中选择。虚幻引擎提供简单的接口来供你与一个或多个分析软件进行数据交互。你的游戏使用该接口， 而分析软件对其实现提供支持。在某些情况下，Epic已经构建了支持软件。此前，Epic Games提供了一种实现方式来对分析事件进行多播，将其转发给多个提供商。此外，Epic还向支持[Swrve](http://www.swrve.com)（付费服务）的软件提供支持，并支持Flurry。

随着时间的推移，我们将会提供更多软件的插件，如果需要，你还可以添加自己的软件支持。

## 实现游戏分析

[](/documentation/zh-cn/unreal-engine/instrumenting-your-game-with-analytics-in-unreal-engine)

[![检测游戏](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/245a1f56-d234-4a63-9749-85ca5cfcdae2/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/instrumenting-your-game-with-analytics-in-unreal-engine)

[检测游戏](/documentation/zh-cn/unreal-engine/instrumenting-your-game-with-analytics-in-unreal-engine)

[使用游戏内分析跟踪玩家参与和查找平衡问题。](/documentation/zh-cn/unreal-engine/instrumenting-your-game-with-analytics-in-unreal-engine)

[

![蓝图分析插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0856a58-3176-4e24-ae51-9bbc458108f8/placeholder_topic.png)

蓝图分析插件

提供一组蓝图节点，以允许你用来分析服务通讯





](/documentation/zh-cn/unreal-engine/blueprint-analytics-plugin-for-unreal-engine)

## 外部分析软件

[](/documentation/zh-cn/unreal-engine/file-logging-analytics-provider-for-unreal-engine)

[![文件日志记录分析服务商](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19a053e2-034b-4536-b41e-ea4ef2a364d3/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/file-logging-analytics-provider-for-unreal-engine)

[文件日志记录分析服务商](/documentation/zh-cn/unreal-engine/file-logging-analytics-provider-for-unreal-engine)

[文件日志记录服务商可在开发期间调试分析过程。](/documentation/zh-cn/unreal-engine/file-logging-analytics-provider-for-unreal-engine)

[

![Flurry分析供应商](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15a98ef6-21e6-42a2-8e95-f499b76a4d06/placeholder_topic.png)

Flurry分析供应商

提供一组蓝图节点，以允许您用分析服务





](/documentation/zh-cn/unreal-engine/flurry-analytics-provider-for-unreal-engine)[

![多播分析服务商](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2ba8c1e-d8ab-4234-a6a0-0eaa4bd61f68/placeholder_topic.png)

多播分析服务商

提供一组蓝图节点，以允许您与分析服务通讯。





](/documentation/zh-cn/unreal-engine/multicast-analytics-provider-for-unreal-engine)

-   [analytics](https://dev.epicgames.com/community/search?query=analytics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [实现游戏分析](/documentation/zh-cn/unreal-engine/in-game-analytics-for-unreal-engine#%E5%AE%9E%E7%8E%B0%E6%B8%B8%E6%88%8F%E5%88%86%E6%9E%90)
-   [外部分析软件](/documentation/zh-cn/unreal-engine/in-game-analytics-for-unreal-engine#%E5%A4%96%E9%83%A8%E5%88%86%E6%9E%90%E8%BD%AF%E4%BB%B6)
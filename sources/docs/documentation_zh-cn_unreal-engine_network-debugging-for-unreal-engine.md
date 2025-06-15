# 虚幻引擎中的网络调试 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/network-debugging-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:57:56.311Z

---

目录

![网络调试](https://dev.epicgames.com/community/api/documentation/image/154f1839-cacf-4dc1-bd19-e3f84b1aeb97?resizing_type=fill&width=1920&height=335)

在 **虚幻引擎（UE）** 中创建多人游戏或网络项目时，在调试、分析和测试项目的过程中会遇到一些独特的挑战。这些挑战包括：

-   调试项目的多个实例
    
-   考虑网络通信带来的普遍不可靠性和不稳定性
    
-   检查 **客户端** 与 **服务器** 上存在的不同功能。
    

UE多人游戏基于客户端-服务器模型。这意味着将有单个服务器对[GameState](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine)具有权威性，而连接的客户端需要非常相似。有关其他文档，请参阅\[[客户端-服务器模型](/documentation/zh-cn/unreal-engine/setting-up-dedicated-servers-in-unreal-engine)。

虚幻引擎将提供用于调试网络应用程序的专用工具和工作流程。下面的指南将展示这些工具的用法，以及解决常见网络问题的技巧和最佳实践。

## 索引

[

![测试和调试网络游戏](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fe77c24-d555-400c-b4b6-1817baecd129/placeholder_topic.png)

测试和调试网络游戏

在虚幻引擎中测试和调试网络游戏。





](/documentation/zh-cn/unreal-engine/testing-and-debugging-networked-games-in-unreal-engine)[

![网络游戏的日志记录](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34506555-15e1-436d-a51b-214dd189cd67/placeholder_topic.png)

网络游戏的日志记录

关于网络游戏日志记录的概述。





](/documentation/zh-cn/unreal-engine/logging-for-networked-games-in-unreal-engine)[

![使用网络模拟](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b03954a-86b0-4083-9773-c3dc8ec9465f/placeholder_topic.png)

使用网络模拟

关于在虚幻引擎中使用网络模拟的概述。





](/documentation/zh-cn/unreal-engine/using-network-emulation-in-unreal-engine)[

![控制台命令](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/163194a4-0e68-4a91-9905-017cfc1db15b/placeholder_topic.png)

控制台命令

指定网络设置并在运行时获取有用的调试信息。





](/documentation/zh-cn/unreal-engine/console-commands-for-network-debugging-in-unreal-engine)[

![测试多人游戏](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/671d5d31-42e1-47b9-9887-dd7add349370/placeholder_topic.png)

测试多人游戏

设置虚幻编辑器以测试多人游戏。





](/documentation/zh-cn/unreal-engine/testing-multiplayer-in-unreal-engine)[

![网络分析器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d4af2a0-38ed-4015-beba-31e0f0fe72af/placeholder_topic.png)

网络分析器

分析在运行时捕获的网络流量和性能信息。





](/documentation/zh-cn/unreal-engine/using-the-network-profiler-in-unreal-engine)[

![性能与带宽注意事项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08bdfec2-5d2c-429b-8f72-83df5ac71f53/placeholder_topic.png)

性能与带宽注意事项

关于 Actor 复制过程中的性能和带宽优化提示





](/documentation/zh-cn/unreal-engine/performance-and-bandwidth-tips-for-unreal-engine)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [索引](/documentation/zh-cn/unreal-engine/network-debugging-for-unreal-engine#%E7%B4%A2%E5%BC%95)
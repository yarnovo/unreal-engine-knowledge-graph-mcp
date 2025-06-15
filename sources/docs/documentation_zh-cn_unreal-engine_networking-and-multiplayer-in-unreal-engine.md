# 虚幻引擎中的联网和多人游戏 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/networking-and-multiplayer-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:56:21.011Z

---

目录

![联网和多人游戏](https://dev.epicgames.com/community/api/documentation/image/57c4d54a-1b34-4460-8e39-d9db61fa8663?resizing_type=fill&width=1920&height=335)

现代多人游戏体验需要在世界范围内的大量客户端间同步庞大数据。对于向用户提供引人入胜的体验而言，发送数据的类型和方式至关重要，因为其会极大影响项目的执行和质感。在虚幻引擎中，在客户端与服务器间同步数据和调用程序的过程被称为 **复制（Replication）** 。复制系统同时提供了较高层次的抽象物以及低层次的自定义，以便在创建针对多个并发用户的项目时更加方便地处理可能遇到的情况。

## 简介

[

![网络概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c77659b0-e047-4e95-a907-0428efa36f92/placeholder_topic.png)

网络概述

学习虚幻引擎网络的知识，包括基础概念和可用的复制系统。





](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine)[

![多人游戏编程快速入门指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1d0b748-ce8b-47f8-8e08-4feb539408da/preview.png)

多人游戏编程快速入门指南

用C++创建简单的多人游戏。





](/documentation/zh-cn/unreal-engine/multiplayer-programming-quick-start-for-unreal-engine)

## 管理会话

[

![多人游戏中的关卡切换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dfa35e63-1fed-4eac-be8b-edb39a7ec424/placeholder_topic.png)

多人游戏中的关卡切换

关于多人游戏中关卡切换方式的概述。





](/documentation/zh-cn/unreal-engine/travelling-in-multiplayer-in-unreal-engine)

## 网络多人游戏编程

[

![Actor所有者和所属连接](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/642bd791-351b-43f2-a953-c12b33aa8134/placeholder_topic.png)

Actor所有者和所属连接

Actor所有者、所属连接以及这与联网游戏中的Actor有何关联。





](/documentation/zh-cn/unreal-engine/actor-owner-and-owning-connection-in-unreal-engine)[

![Actor复制流程详解](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4ab9d12-a4be-4603-af67-06eaaedf8fec/placeholder_topic.png)

Actor复制流程详解

低级别Actor复制的详细说明。





](/documentation/zh-cn/unreal-engine/detailed-actor-replication-flow-in-unreal-engine)[

![Actor 的 Role 和 RemoteRole 属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1c46bcf-b5d8-4665-a07c-13b715e0773f/placeholder_topic.png)

Actor 的 Role 和 RemoteRole 属性

关于复制 Actor 对象的全面介绍。





](/documentation/zh-cn/unreal-engine/actor-role-and-remote-role-in-unreal-engine)[

![Actor网络休眠](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d2f5867-0ce9-481c-88ec-301e68441477/placeholder_topic.png)

Actor网络休眠

有效使用休眠，优化多人游戏。





](/documentation/zh-cn/unreal-engine/actor-network-dormancy-in-unreal-engine)[

![Actor相关性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/784cf9da-2bf4-4637-a6fa-123a139f7578/relevancy-topic.png)

Actor相关性

确定Actor当前与复制到网络连接是否相关。





](/documentation/zh-cn/unreal-engine/actor-relevancy-in-unreal-engine)[

![Actor优先级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dec67547-6d33-4cac-96be-c5d965d24431/priority-topic.png)

Actor优先级

确定复制时Actor的网络优先级。





](/documentation/zh-cn/unreal-engine/actor-priority-in-unreal-engine)[

![复制Actor属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70fda8b2-fb67-4e01-81d7-d4895fd8e4af/placeholder_topic.png)

复制Actor属性

属性复制、条件复制、自定义条件和对象引用。





](/documentation/zh-cn/unreal-engine/replicate-actor-properties-in-unreal-engine)[

![Actor组件复制](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2413e318-8660-40ca-9581-bf31bf2aa712/placeholder_topic.png)

Actor组件复制

了解如何复制Actor拥有的组件。





](/documentation/zh-cn/unreal-engine/replicating-actor-components-in-unreal-engine)[

![复制子对象](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d0ac9fb-0aea-47e2-914d-ce139f5057a9/placeholder_topic.png)

复制子对象

了解如何复制从UObject派生的类及其包含的复制属性。





](/documentation/zh-cn/unreal-engine/replicating-uobjects-in-unreal-engine)[

![在线信标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c14eeda1-a688-4015-957e-47644e3b3ea6/placeholder_topic.png)

在线信标

服务器和客户端之间的轻量级交互机制。





](/documentation/zh-cn/unreal-engine/using-online-beacons-in-unreal-engine)[

![远程程序调用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4851306a-1064-431c-9852-b6c5baf807f7/placeholder_topic.png)

远程程序调用

通过网络在远程机器上调用函数。





](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine)[

![复制对象的执行顺序](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1bcdb5a7-59cb-4bfb-b477-7c5a859a0909/placeholder_topic.png)

复制对象的执行顺序

复制属性和远程过程调用在接收端机器上的执行顺序保证。





](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine)

## Iris复制系统

[

![Iris简介](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7cb5e92d-caf1-49a3-862c-79136b3e6109/placeholder_topic.png)

Iris简介

了解Iris的设计和组件以及如何将你的项目配置为使用Iris。





](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine)[

![Migrate to Iris](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0938636-2e40-4fdd-90c6-652e781f1ec1/placeholder_topic.png)

Migrate to Iris

Learn what has changed between the existing replication systems and Iris.





](/documentation/en-us/unreal-engine/migrate-to-iris-in-unreal-engine)[

![Iris组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88557fe8-40d2-4d80-96b5-88bee0cb6db6/placeholder_topic.png)

Iris组件

了解Iris复制系统中的主要组件及其用法。





](/documentation/zh-cn/unreal-engine/components-of-iris-in-unreal-engine)[

![Iris术语表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a10eccb-3f97-4ac2-ba9c-fd00a28a2940/placeholder_topic.png)

Iris术语表

Iris的术语表页面。





](/documentation/zh-cn/unreal-engine/glossary-of-iris-terms-in-unreal-engine)

## 复制图表

[](/documentation/zh-cn/unreal-engine/replication-graph-in-unreal-engine)

[![Replication Graph](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a59f6c5f-af34-4dae-bcf6-802077ac38f0/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/replication-graph-in-unreal-engine)

[Replication Graph](/documentation/zh-cn/unreal-engine/replication-graph-in-unreal-engine)

[概述Replication Graph功能和Replication Graph节点。](/documentation/zh-cn/unreal-engine/replication-graph-in-unreal-engine)

## 重播系统

[](/documentation/zh-cn/unreal-engine/using-the-replay-system-in-unreal-engine)

[![重播系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88795eef-f785-4503-8bdc-d258064f4c44/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/using-the-replay-system-in-unreal-engine)

[重播系统](/documentation/zh-cn/unreal-engine/using-the-replay-system-in-unreal-engine)

[关于用于录制和播放游戏的重播系统的概述。](/documentation/zh-cn/unreal-engine/using-the-replay-system-in-unreal-engine)

## 部署多人游戏

[

![使用Steam Sockets](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56e492a2-808e-473e-b9a3-a7868de7f15e/placeholder_topic.png)

使用Steam Sockets

如何为虚幻项目启用Steam网络协议层。





](/documentation/zh-cn/unreal-engine/using-steam-sockets-in-unreal-engine)

## 调试和优化

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

[](/documentation/zh-cn/unreal-engine/oodle-network)

[![Oodle网络](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf5c2839-71d5-4503-b7c8-349f81ae0313/oodle-topic.png)](/documentation/zh-cn/unreal-engine/oodle-network)

[Oodle网络](/documentation/zh-cn/unreal-engine/oodle-network)

[关于使用Oodle网络提高项目流送性能的概述。](/documentation/zh-cn/unreal-engine/oodle-network)

## 教程和示例

[

![角色移动组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4cc6653-13b1-4bd9-b50f-457f204fcfaa/placeholder_topic.png)

角色移动组件

关于角色移动组件的详细介绍





](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine)[

![设置专用服务器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bd3e0e9-f70f-4b88-bb6d-fc7aa7cde796/placeholder_topic.png)

设置专用服务器

为你的项目设置和运行专用服务器。





](/documentation/zh-cn/unreal-engine/setting-up-dedicated-servers-in-unreal-engine)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [简介](/documentation/zh-cn/unreal-engine/networking-and-multiplayer-in-unreal-engine#%E7%AE%80%E4%BB%8B)
-   [管理会话](/documentation/zh-cn/unreal-engine/networking-and-multiplayer-in-unreal-engine#%E7%AE%A1%E7%90%86%E4%BC%9A%E8%AF%9D)
-   [网络多人游戏编程](/documentation/zh-cn/unreal-engine/networking-and-multiplayer-in-unreal-engine#%E7%BD%91%E7%BB%9C%E5%A4%9A%E4%BA%BA%E6%B8%B8%E6%88%8F%E7%BC%96%E7%A8%8B)
-   [Iris复制系统](/documentation/zh-cn/unreal-engine/networking-and-multiplayer-in-unreal-engine#iris%E5%A4%8D%E5%88%B6%E7%B3%BB%E7%BB%9F)
-   [复制图表](/documentation/zh-cn/unreal-engine/networking-and-multiplayer-in-unreal-engine#%E5%A4%8D%E5%88%B6%E5%9B%BE%E8%A1%A8)
-   [重播系统](/documentation/zh-cn/unreal-engine/networking-and-multiplayer-in-unreal-engine#%E9%87%8D%E6%92%AD%E7%B3%BB%E7%BB%9F)
-   [部署多人游戏](/documentation/zh-cn/unreal-engine/networking-and-multiplayer-in-unreal-engine#%E9%83%A8%E7%BD%B2%E5%A4%9A%E4%BA%BA%E6%B8%B8%E6%88%8F)
-   [调试和优化](/documentation/zh-cn/unreal-engine/networking-and-multiplayer-in-unreal-engine#%E8%B0%83%E8%AF%95%E5%92%8C%E4%BC%98%E5%8C%96)
-   [教程和示例](/documentation/zh-cn/unreal-engine/networking-and-multiplayer-in-unreal-engine#%E6%95%99%E7%A8%8B%E5%92%8C%E7%A4%BA%E4%BE%8B)
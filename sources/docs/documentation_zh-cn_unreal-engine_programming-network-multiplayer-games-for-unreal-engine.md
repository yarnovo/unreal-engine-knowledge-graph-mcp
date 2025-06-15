# 在虚幻引擎中制作在线多人游戏 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/programming-network-multiplayer-games-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:56:25.655Z

---

目录

![编写多人游戏](https://dev.epicgames.com/community/api/documentation/image/51756b58-1a2f-41ee-a434-fea1cb6b54c5?resizing_type=fill&width=1920&height=335)

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

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
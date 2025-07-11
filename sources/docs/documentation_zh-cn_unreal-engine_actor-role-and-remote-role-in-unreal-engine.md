# 虚幻引擎Actor的 Role 和 RemoteRole属性 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/actor-role-and-remote-role-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:56:22.043Z

---

目录

![Actor 的 Role 和 RemoteRole 属性](https://dev.epicgames.com/community/api/documentation/image/cfa809d4-2bd5-4e9f-b498-978e78da4347?resizing_type=fill&width=1920&height=335)

在 Actor 的复制过程中，有两个属性扮演了重要角色，分别是 **Role** 和 **RemoteRole**。

有了这两个属性，您可以知道：

-   谁拥有 actor 的主控权
-   actor 是否被复制
-   复制模式

首先一件要确定的事，就是谁拥有特定 actor 的主控权。要确定当前运行的引擎实例是否有主控者，需要查看 Role 属性是否为 `ROLE_Authority`。如果是，就表明这个运行中的 **虚幻引擎** 实例负责掌管此 actor（决定其是否被复制）。

如果 Role 是 `ROLE_Authority`，RemoteRole 是 `ROLE_SimulatedProxy` 或 `ROLE_AutonomousProxy`，就说明这个引擎实例负责将此 actor 复制到远程连接。

就目前而言，只有服务器能够向已连接的客户端同步 Actor （客户端永远都不能向服务器同步）。始终记住这一点， *只有* 服务器才能看到 `Role == ROLE_Authority` 和 `RemoteRole == ROLE_SimulatedProxy` 或者 `ROLE_AutonomousProxy`。

## Role/RemoteRole 对调

对于不同的数值观察者，它们的 Role 和 RemoteRole 值可能发生对调。例如，如果您的服务器上有这样的配置：

-   `Role == ROLE_Authority`
-   `RemoteRole == ROLE_SimulatedProxy`

客户端会将其识别为以下形式：

-   `Role == ROLE_SimulatedProxy`
-   `RemoteRole == ROLE_Authority`

这种情况是正常的，因为服务器要负责掌管 actor 并将其复制到客户端。而客户端只是接收更新，并在更新的间歇模拟 actor。

## 复制模式

服务器不会在每次更新时复制 actor。这会消耗太多的带宽和 CPU 资源。实际上，服务器会按照 `AActor::NetUpdateFrequency` 属性指定的频度来复制 actor。

因此在 actor 更新的间歇，会有一些时间数据被传递到客户端。这会导致 actor 呈现出断续、不连贯的移动。为了弥补这个缺陷，客户端将在更新的间歇中模拟 actor。

目前共有两种类型的模拟。

### `ROLE_SimulatedProxy`

这是标准的模拟途径，通常是根据上次获得的速率对移动进行推算。当服务器为特定的 actor 发送更新时，客户端将向着新的方位调整其位置，然后利用更新的间歇，根据由服务器发送的最近的速率值来继续移动 actor。

使用上次获得的速率值进行模拟，只是普通模拟方式中的一种。您完全可以编写自己的定制代码，在服务器更新的间隔使用其他的一些信息来进行推算。

### `ROLE_AutonomousProxy`

这种模拟通常只用于 PlayerController 所拥有的 actor。这说明此 actor 会接收来自真人控制者的输入，所以在我们进行推算时，我们会有更多一些的信息，而且能使用真人输入内容来补足缺失的信息（而不是根据上次获得的速率来进行推算）。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Role/RemoteRole 对调](/documentation/zh-cn/unreal-engine/actor-role-and-remote-role-in-unreal-engine#role/remoterole%E5%AF%B9%E8%B0%83)
-   [复制模式](/documentation/zh-cn/unreal-engine/actor-role-and-remote-role-in-unreal-engine#%E5%A4%8D%E5%88%B6%E6%A8%A1%E5%BC%8F)
-   [ROLE\_SimulatedProxy](/documentation/zh-cn/unreal-engine/actor-role-and-remote-role-in-unreal-engine#role-simulatedproxy)
-   [ROLE\_AutonomousProxy](/documentation/zh-cn/unreal-engine/actor-role-and-remote-role-in-unreal-engine#role-autonomousproxy)
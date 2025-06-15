# 虚幻引擎中的Actor复制流程详解 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/detailed-actor-replication-flow-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:56:28.169Z

---

目录

![Actor复制流程详解](https://dev.epicgames.com/community/api/documentation/image/7878e124-76f9-44cd-90a9-5368bab99de3?resizing_type=fill&width=1920&height=335)

**Actor复制** 是一个详细的多步骤过程，由 **网络驱动程序** （Net Driver）决定哪些Actor需要以何种顺序复制到哪些连接中。本页面概述了Actor复制的操作流程。

大多数情况下，Actor的复制均在[`UNetDriver::ServerReplicateActors`](/documentation/en-us/unreal-engine/API/Runtime/Engine/Engine/UNetDriver/ServerReplicateActors)函数中进行。在此过程中，服务器首先会收集经它判断与各客户端相关的所有Actor，然后发送自上次各个已连接客户端更新后发生了变化的所有属性。然后由[`UActorChannel::ReplicateActor`](/documentation/en-us/unreal-engine/API/Runtime/Engine/Engine/UActorChannel/ReplicateActor)函数处理将Actor复制到特定通道的细节。

## 重要属性

Actor的更新流程固定不变，同样固定的还有调用哪些框架回调，以及用于确定Actor在当前服务器tick期间是否被复制的属性。重要属性包括：

**属性**

**说明**

[`AActor::NetUpdateFrequency`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor)

决定Actor的复制频率。

[`AActor::PreReplication`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/PreReplication)

在所有复制发生前均调用。

[`AActor::bOnlyRelevantToOwner`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/bOnlyRelevantToOwner)

如果该Actor只复制给其所有者，则为true。

[`AActor::IsRelevancyOwnerFor`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/IsRelevancyOwnerFor)

用于在bOnlyRelevantToOwner为true时确定相关性。

[`AActor::IsNetRelevantFor`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/IsNetRelevantFor)

用于在bOnlyRelevantToOwner为false时确定相关性。

[`AActor::NetDormancy`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor)

决定Actor的状态是休眠还是苏醒。

## Actor复制流程概述

以下步骤高度概括了Actor的复制流程：

1.  确定哪些Actor正在复制，并执行检查以确定休眠状态、更新频率和所属的连接。
    -   将通过检查的Actor添加到"考虑复制的列表"中。
2.  循环遍历所有连接，并根据当前Actor和连接执行检查。此步骤最后会得出一份针对各个连接的"考虑复制的Actor列表"。
    -   按各连接的优先级对Actor进行排序。
3.  判断Actor是否与此连接相关。
4.  将Actor复制到当前连接。

以下各节将更加详细地讲解上文Actor复制流程概述中的各个步骤。

### 将Actor添加到"考虑复制列表"

这一步会初步检查所有Actor，通过检查Actor是否调用了 `Actor::SetReplicates(true)` 来判断哪些Actor正在进行主动复制。对于进行主动复制的Actor，NetDriver会执行以下检查：

1.  判断当前Actor初始状态是否为休眠（ `ENetDormancy::DORM_Initial` ）。
    -   如果初始状态为休眠，则跳过此Actor。
2.  检查 `AActor::NetUpdateFrequency` 的值，从而判断是否需要更新当前Actor。
    -   如果不需要则跳过此Actor。
3.  如果 `AActor::bOnlyRelevantToOwner` 为true，则在所属连接的查看器上调用 `AActor::IsRelevancyOwnerFor` ，从而检查该Actor的所属连接是否具有相关性。
    -   如果相关，则将其添加到连接上的所属相关性列表中。
    -   本用例中，该Actor将只发送到单个连接。

对所有通过了初步检查的Actor进行 `Actor::PreReplication` 的调用。在 `AActor::PreReplication` 中，你可以决定是否要为某些连接复制属性。使用 `DOREPLIFETIME_ACTIVE_OVERRIDE` 宏即可具体控制将Actor复制到哪些连接。如果Actor通过了上述所有检查，则将其添加到"考虑复制的Actor列表"中。

### 循环遍历所有连接

接下来，系统会循环处理所有连接，并对当前连接的"考虑复制列表"（详见上一步）中的每个Actor执行以下检查和操作：

1.  调用 `AActor::NetDormancy` 判断当前Actor是否为休眠状态。
    -   如果Actor对此连接处于休眠状态，则跳过此Actor。
2.  如果尚未有通道，那么：
    -   判断客户端是否已加载当前Actor所在的关卡。
        -   如果未加载关卡，则跳过此Actor。
    -   调用连接的 `AActor::IsNetRelevantFor` 判断当前Actor是否相关。
        -   如果Actor不具有相关性，则跳过此Actor。

添加上述连接所属相关列表中的所有Actor。此时会得到一个与此连接相关的非休眠Actor列表。将此列表中的Actor按优先级降序（ `Actor::GetNetPriority` ）排序。按优先级对Actor排序十分重要，因为必须确保优先考虑复制高优先级的Actor，而不是低优先级的Actor，在考虑大量Actor以及连接可能饱和时尤为如此。

#### 循环遍历已排序的Actor列表

针对此连接"考虑复制列表"中的所有Actor：

1.  如果连接尚未加载此Actor所在的关卡，则关闭通道（如果有）并继续。
2.  每秒调用 `AActor::IsNetRelevantFor` 以判断Actor是否与连接相关。
    -   如果5秒内都不相关，则关闭通道。
    -   如果相关且尚未开通任何通道，则开通一条通道。
    -   如果该连接在任何时候变为饱和状态：
        -   针对剩余的Actor：
            -   如果相关时间少于1秒，则强制在下一个tick时进行更新。
            -   如果相关时间超过1秒，则调用 `AActor::IsNetRelevantFor` 以确定是否应该在下一个tick时进行更新。

针对通过上述所有条件的Actor，调用 `UActorChannel::ReplicateActor` 将该Actor复制到连接中。

可以通过不同的方式控制每次调用 `UNetDriver::ServerReplicateActors` 时复制的客户端数量：

1.  引擎配置和命令行参数：
    1.  使用命令行参数 `-limitclientticks` 启动你的项目。
    2.  更改 `[/Script/Engine.Engine]` 引擎配置类别中 `NetClientTicksPerSecond` 的值。
2.  命令行参数：
    1.  使用此命令行参数启动你的项目：`-limitclientticks -ini:Engine:[/Script/Engine.Engine]:NetClientTicksPerSecond=<VALUE>` ，其中 `<VALUE>` 是你要使用的每秒客户端tick数。
3.  控制台变量：
    1.  设置控制台变量 `net.MaxConnectionsToTickPerServerFrame`

详见 `UNetDriver::ServerReplicateActors_PrepConnections` 。

##### 将Actor复制到连接

`UActorChannel::ReplicateActor` 是将Actor及其所有组件复制到连接的主要方法。流程如下所示：

1.  判断是否为该Actor通道开通后的首次更新。
    -   如果是，则序列化所需的特定信息（初始位置、旋转等）。
2.  判断此连接是否拥有此Actor。
    -   如果不拥有，且该Actor的角色是 `ENetRole::ROLE_AutonomousProxy` ，则降级为 `ENetRole::ROLE_SimulatedProxy` 。
3.  复制该Actor已更改的属性。
4.  复制各组件已更改的属性。
5.  对于所有已删除的组件，发送特殊的删除命令。

过完Actor列表或通道饱和后，考虑下一个连接，并重复这一过程，直到所有连接都更新完毕。

## 更多信息

如需详细了解Actor复制的信息，请参阅虚幻引擎源代码中的下列头文件：

-   `/Engine/Source/Runtime/Engine/Classes/Engine/NetDriver.h`
    -   关于 `UNetDriver::ServerReplicateActors` 的信息。
-   `/Engine/Source/Runtime/Engine/Classes/GameFramework/Actor.h`
    -   关于 `AActor` 及其函数和属性的信息。
-   `/Engine/Source/Runtime/Engine/Classes/Engine/ActorChannel.h`
    -   关于 `UActorChannel` 和 `UActorChannel::ReplicateActor` 的信息。
-   `/Engine/Source/Runtime/Engine/Classes/Engine/EngineTypes.h`
    -   关于诸如 `ENetRole` 和 `ENetDormancy` 等类型的信息。

-   [networking](https://dev.epicgames.com/community/search?query=networking)
-   [replication](https://dev.epicgames.com/community/search?query=replication)
-   [relevancy](https://dev.epicgames.com/community/search?query=relevancy)
-   [dormancy](https://dev.epicgames.com/community/search?query=dormancy)
-   [frequency](https://dev.epicgames.com/community/search?query=frequency)
-   [priority](https://dev.epicgames.com/community/search?query=priority)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [重要属性](/documentation/zh-cn/unreal-engine/detailed-actor-replication-flow-in-unreal-engine#%E9%87%8D%E8%A6%81%E5%B1%9E%E6%80%A7)
-   [Actor复制流程概述](/documentation/zh-cn/unreal-engine/detailed-actor-replication-flow-in-unreal-engine#actor%E5%A4%8D%E5%88%B6%E6%B5%81%E7%A8%8B%E6%A6%82%E8%BF%B0)
-   [将Actor添加到"考虑复制列表"](/documentation/zh-cn/unreal-engine/detailed-actor-replication-flow-in-unreal-engine#%E5%B0%86actor%E6%B7%BB%E5%8A%A0%E5%88%B0%22%E8%80%83%E8%99%91%E5%A4%8D%E5%88%B6%E5%88%97%E8%A1%A8%22)
-   [循环遍历所有连接](/documentation/zh-cn/unreal-engine/detailed-actor-replication-flow-in-unreal-engine#%E5%BE%AA%E7%8E%AF%E9%81%8D%E5%8E%86%E6%89%80%E6%9C%89%E8%BF%9E%E6%8E%A5)
-   [循环遍历已排序的Actor列表](/documentation/zh-cn/unreal-engine/detailed-actor-replication-flow-in-unreal-engine#%E5%BE%AA%E7%8E%AF%E9%81%8D%E5%8E%86%E5%B7%B2%E6%8E%92%E5%BA%8F%E7%9A%84actor%E5%88%97%E8%A1%A8)
-   [将Actor复制到连接](/documentation/zh-cn/unreal-engine/detailed-actor-replication-flow-in-unreal-engine#%E5%B0%86actor%E5%A4%8D%E5%88%B6%E5%88%B0%E8%BF%9E%E6%8E%A5)
-   [更多信息](/documentation/zh-cn/unreal-engine/detailed-actor-replication-flow-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF)
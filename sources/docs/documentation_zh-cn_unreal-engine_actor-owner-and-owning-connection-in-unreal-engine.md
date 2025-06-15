# 虚幻引擎中的Actor所有者和所属连接 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/actor-owner-and-owning-connection-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:56:32.966Z

---

目录

![Actor所有者和所属连接](https://dev.epicgames.com/community/api/documentation/image/f0ef2b42-d983-428c-9342-6d4bd6f21904?resizing_type=fill&width=1920&height=335)

虚幻引擎中的对象有许多不同类型的父子关系。虚幻引擎的网络复制有两种重要的关系，即Actor的所有者及所有者的关联所属连接。

## 概述

虚幻引擎中的多人游戏使用服务器授权的客户端-服务器模型。在此模型中，客户端连接到集中式服务器。客户端连接到服务器时，将在所连接客户端（一个所连接客户端即为一个 *连接* ）的关联服务器上创建玩家控制器。客户端开始在服务器上运行时，此玩家控制器将拥有一个Pawn，供客户端在游戏中控制。玩家控制器是Pawn的 *所有者* 。Actor的 *所属连接* 是与Actor的所属玩家控制器关联的连接。所有者和所属连接将确定哪个所连接客户端有权做出更改和调用远程函数。

每个 `AActor` 派生的对象将存储其所有者的指针。并非每个 `AActor` 派生的对象都有所有者。Actor的所有者可以为null，在这种情况下，Actor没有所有者。

### 所属连接的用法

连接所有权对于以下情况很重要：

-   Actor复制
-   属性复制
-   RPC

Actor的所属连接在Actor复制期间用于确定哪些连接获得Actor的更新，这就是[Actor相关性](/documentation/zh-cn/unreal-engine/actor-relevancy-in-unreal-engine)。对于[`bOnlyRelevantToOwner`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/bOnlyRelevantToOwner)设置为true的Actor，只有拥有该Actor的连接才会收到该Actor的属性更新。默认情况下，所有玩家控制器仅与其所有者相关。正因为如此，每个客户端仅会收到自身玩家控制器的更新。

若属性复制期间涉及的条件会使用所有者，将使用Actor的所属连接。如需详细了解Actor的所有者如何影响属性复制，请参阅[条件复制](/documentation/zh-cn/unreal-engine/replicate-actor-properties-in-unreal-engine#%E6%9D%A1%E4%BB%B6%E5%A4%8D%E5%88%B6)。

Actor的所属连接对于RPC也很重要。服务器在Actor上调用客户端RPC函数时，除非RPC被标记为 `NetMulticast` ，否则RPC需要知道要在哪些连接上执行RPC。Actor的所属连接将确定要发送和执行RPC的连接。

## 确定所有者和所属连接

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5dbf0c9-0824-4e45-936f-97e46851ce28/network-player-controller.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5dbf0c9-0824-4e45-936f-97e46851ce28/network-player-controller.png)

图1.连接到中央服务器的客户端，显示Pawn、所属玩家控制器和所属连接。

假设你正在玩一款多人游戏，以客户端的形式连接到了服务器。在你的计算机上，玩家控制器就是你作为玩家的抽象化身。在 *图1* 的环境中，如果你在客户端1上运行，你的输入将在玩家控制器1中处理，然后传达给Pawn 1。如前所述，当你的客户端计算机连接到服务器时，在你的连接关联的服务器上，会建立网络连接1并创建玩家控制器S1。服务器Pawn Actor（即Pawn S1）由玩家控制器S1拥有。这意味着，玩家控制器S1拥有Pawn S1。Pawn S1的所属连接是网络连接1，这是玩家控制器S1的所属连接。Pawn S1仅会在它也由玩家控制器S1拥有期间才由此连接拥有。一旦玩家控制器S1不再拥有Pawn S1，网络连接1就不再是Pawn S1的所属连接。

你的游戏内角色Pawn放在物品栏中的物品也遵循这个逻辑。物品栏中的物品由可能拥有该Pawn的相同连接拥有。

Actor组件以相似方式运行，以确定所有权，但会使用一些额外步骤。对于Actor组件，你必须首先确定组件的所有者，方法是遍历Actor组件的外部链，直至找到所属Actor。你可以按照上面概述的过程操作，确定Actor组件的所属Actor的所属连接。

### 所有者

要确定Actor的所有者，请查询Actor的最外层所有者。如果最外层所有者是玩家控制器，则原始Actor的所属连接与玩家控制器的所属连接相同。

要获取Actor的所有者，请调用[`AActor::GetOwner`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/GetOwner)。

要获取Actor组件的所属Actor，请调用[`UActorComponent::GetOwner`](/documentation/en-us/unreal-engine/API/Runtime/Engine/Components/UActorComponent/GetOwner)。

### 所属连接

要获取Actor的所属连接，请调用[`AActor::GetNetConnection`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/GetNetConnection)。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [networking](https://dev.epicgames.com/community/search?query=networking)
-   [properties](https://dev.epicgames.com/community/search?query=properties)
-   [owner](https://dev.epicgames.com/community/search?query=owner)
-   [owning connection](https://dev.epicgames.com/community/search?query=owning%20connection)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/actor-owner-and-owning-connection-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [所属连接的用法](/documentation/zh-cn/unreal-engine/actor-owner-and-owning-connection-in-unreal-engine#%E6%89%80%E5%B1%9E%E8%BF%9E%E6%8E%A5%E7%9A%84%E7%94%A8%E6%B3%95)
-   [确定所有者和所属连接](/documentation/zh-cn/unreal-engine/actor-owner-and-owning-connection-in-unreal-engine#%E7%A1%AE%E5%AE%9A%E6%89%80%E6%9C%89%E8%80%85%E5%92%8C%E6%89%80%E5%B1%9E%E8%BF%9E%E6%8E%A5)
-   [所有者](/documentation/zh-cn/unreal-engine/actor-owner-and-owning-connection-in-unreal-engine#%E6%89%80%E6%9C%89%E8%80%85)
-   [所属连接](/documentation/zh-cn/unreal-engine/actor-owner-and-owning-connection-in-unreal-engine#%E6%89%80%E5%B1%9E%E8%BF%9E%E6%8E%A5)

相关文档

[

Actor复制流程详解

![Actor复制流程详解](https://dev.epicgames.com/community/api/documentation/image/a4ab9d12-a4be-4603-af67-06eaaedf8fec?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/detailed-actor-replication-flow-in-unreal-engine)
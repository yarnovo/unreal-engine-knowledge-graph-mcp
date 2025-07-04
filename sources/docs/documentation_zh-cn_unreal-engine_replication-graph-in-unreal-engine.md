# 虚幻引擎Replication Graph | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/replication-graph-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:57:22.015Z

---

目录

![Replication Graph](https://dev.epicgames.com/community/api/documentation/image/5da0283c-e5e0-452c-bc60-a9e48209c837?resizing_type=fill&width=1920&height=335)

**Replication Graph** 插件是一个用于多人游戏的网络复制系统，它的设计可以很好地适应大量玩家和复制Actor。例如，Epic自己的[Fortnite Battle Royale](https://www.epicgames.com/fortnite)从一开始就支持每场比赛100名玩家，包含大约50,000个复制的Actor。标准的网络复制策略（要求每个复制的Actor决定是否应该向每个连接的客户端发送更新）在这种情况下表现很差，并且会限制服务器的CPU。像将Actor划分为交错的组，或者只是降低更新频率，这样的解决方案可能会缓解这个问题，但降低更新频率也会降低客户端体验。Replication Graph消除了Actor单独评估每个连接的客户端的需要，同时在不牺牲客户端体验的情况下，解决了CPU性能问题。

## 结构

Replication Graph包含一系列 **Replication Graph节点**，它们负责按需创建要复制到每个客户端的Actor列表。由于此系统是由持久对象构建的，而不是仅仅由复制的Actor自己处理函数调用，因此数据可以跨多个帧存储并在客户端连接之间共享。这种持久、共享的数据减少了Replication Graph系统为每个客户端生成复制列表所需的时间。

Replication Graph节点（我们简称为"节点"）执行以下实际工作：确定哪些Actor可能需要更新、将它们分组、存储要发送到客户端的预计算列表等。它们的最终任务是，尽可能快地为每个客户端连接按需提供Actor"复制列表"，以便服务器在每个Actor、每个客户端上花费尽可能少的CPU周期。每个节点都可以以一种独特的方式运行，鼓励开发者根据需要为自己的游戏编写自定义节点。节点可能与游戏无关，也可能利用特定于游戏的信息。根据Actor在游戏中的角色将它们放到不同的节点中，可以让你更好地控制它们复制的方式和时间。构建新节点，并根据Actor在游戏中的行为方式使用Replication Graph将Actor分配到最佳节点，这将极大地减少服务器CPU为准备网络复制列表所花费的时间。

## 启用此系统

你可以通过以下两种方式之一，配置你的项目使用自定义 **Replication Driver**（Replication Graph的父类）：

-   在"DefaultEngine.ini"文件中指定Replication Driver类。
-   将返回Replication Driver类实例的函数绑定到Replication Driver的默认创建委托。

ShooterGame项目是如何设置和实现Replication Graph的一个很好的示例。但是，请注意Replication Graph在控制台版本中是禁用的，因为它目前不适用于分屏游戏。

### 配置(.ini)文件

要配置引擎的默认Replication Driver，打开项目的"DefaultEngine.ini"文件。找到（或添加）`[/Script/OnlineSubsystemUtils.IpNetDriver]`部分，并设置（或添加）"ReplicationDriverClassName"条目，以便它指示希望使用的Replication Driver（或Replication Graph）类的名称。这应该大致如下所示，用实际项目的名称替换"ProjectName"，用自定义类名称替换"ClassName"：

```cpp
[/Script/OnlineSubsystemUtils.IpNetDriver]
ReplicationDriverClassName="/Script/ProjectName.ClassName"
```

### 在代码中绑定

如果你的项目有多个游戏模式或地图，而这些模式或地图的网络要求有很大的不同，那么绑定到委托将使你能够在代码中为当前游戏模式或地图创建适当的Replication Driver。要使用此方法，将一个函数绑定到名为`CreateReplicationDriverDelegate`的`UReplicationDriver`函数。绑定函数必须返回所需Replication Driver类的一个有效实例，就像下面的lambda函数示例所做的：

```cpp
	UReplicationDriver::CreateReplicationDriverDelegate().BindLambda([](UNetDriver* ForNetDriver, const FURL& URL, UWorld* World) -> UReplicationDriver*
	{
	return NewObject<UMyReplicationDriverClass>(GetTransientPackage());
	});
```

## 高级示例

对于具有大量连接客户端甚至更多同步Actor的游戏而言，根据不同节点的类型和状态分配Actor的Replication Graph可以节省大量CPU时间。这使得构建传统复制方法无法实现的游戏成为可能。在概念层面上，这种规模的游戏可以构建具有以下功能的Replication Graph和Replication Graph节点，以处理数量庞大的复制Actor和连接客户端：

-   **根据位置将Actor分组。**场景可以划分为游戏的网格空间（在大逃杀、MOBA或MMORPG流派游戏中），预定义房间或区域（对于地牢爬行游戏或走廊风格的第一人称或第三人称射击游戏），或任何适合你游戏空间的方法。将Actor添加到每个网格单元或房间中，以便可以从其中潜在地看到或听到Actor，这将加快客户端的更新速度，因为节点可以简单地为客户端摄像机所在的任何网格单元或房间内，向客户端提供持久性Actor列表。
-   **确定"休眠"放置的Actor，并将它们放在单独的列表中。**虽然一些Actor，比如那些表示玩家或由AI控制角色的Actor，可能需要频繁的更新，但也有许多Actor可能是预先放置在关卡中的，在玩家与它们交互之前，它们是不会自己移动或改变状态的。这些Actor可能会维持很长时间（可能是整个游戏会话），而无需发送网络更新。例如，在Fortnite Battle Royale中，玩家和发射物可能会不断地更新，直到从游戏中移除为止。另一方面，树可能会休眠很长时间，无需对任何客户端进行更新。当树被损坏时，任何能够看到树的客户端都会需要接收关于此树的更新。最后，当树被销毁时，任何接收描述树被销毁更新的客户端都不需要接收关于此树的任何进一步更新。
-   **如果你游戏中的角色** **能够拾取并携带物品，随物品的携带者一起更新这些物品。**当一个玩家取出一个物品或者武器并携带它，或者穿一件衣服或盔甲时，将表示该物品的Actor（假设这是一个单独的Actor，而不仅仅是一个组件）添加到一个特殊组，该组始终在拥有玩家更新时进行更新，否则绝不进行更新。
-   **制定所有客户端始终已知的特殊Actor的列表。**特殊Actor始终通过与每个玩家相关，并且可以放在一个简单的节点中来跟踪这些Actor，这样就可以将它们排除在其他列表之外，它们可能会占用CPU周期来进行不必要的计算。
-   **制定始终（或从不）与特定客户端相关的特殊Actor的列表。**可以为单个玩家或玩家团队创建一个类似的始终相关的列表节点。这对于类似以下情况特别有用：确保玩家的队友始终更新，或者通过特殊的游戏内检测能力"暴露"对手，使对手对玩家的整个团队都是可见。如果"暴露"到期，可以将这些Actor添加回它们的默认节点。

构建一个Replication Graph，并根据对Actor在游戏中角色的了解，明智地将Actor分配到不同的节点，这可以充分利用服务器的CPU时间。最终的结果是为游戏提供稳定的服务器性能，否则游戏将无法在当前硬件上运行。Replication Graph插件包含几个Replication Graph节点类，你可以在大型在线游戏中使用它们。此外，鼓励开发者基于对特定游戏内部工作原理的了解来构建自定义节点类。

-   [advanced](https://dev.epicgames.com/community/search?query=advanced)
-   [networking](https://dev.epicgames.com/community/search?query=networking)
-   [replication](https://dev.epicgames.com/community/search?query=replication)
-   [replication graph](https://dev.epicgames.com/community/search?query=replication%20graph)
-   [replication graph node](https://dev.epicgames.com/community/search?query=replication%20graph%20node)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [结构](/documentation/zh-cn/unreal-engine/replication-graph-in-unreal-engine#%E7%BB%93%E6%9E%84)
-   [启用此系统](/documentation/zh-cn/unreal-engine/replication-graph-in-unreal-engine#%E5%90%AF%E7%94%A8%E6%AD%A4%E7%B3%BB%E7%BB%9F)
-   [配置(.ini)文件](/documentation/zh-cn/unreal-engine/replication-graph-in-unreal-engine#%E9%85%8D%E7%BD%AE\(ini\)%E6%96%87%E4%BB%B6)
-   [在代码中绑定](/documentation/zh-cn/unreal-engine/replication-graph-in-unreal-engine#%E5%9C%A8%E4%BB%A3%E7%A0%81%E4%B8%AD%E7%BB%91%E5%AE%9A)
-   [高级示例](/documentation/zh-cn/unreal-engine/replication-graph-in-unreal-engine#%E9%AB%98%E7%BA%A7%E7%A4%BA%E4%BE%8B)
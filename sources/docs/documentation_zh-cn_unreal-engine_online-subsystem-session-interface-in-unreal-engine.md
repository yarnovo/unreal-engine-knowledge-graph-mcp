# 虚幻引擎在线子系统会话接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/online-subsystem-session-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:55:19.520Z

---

目录

![会话接口](https://dev.epicgames.com/community/api/documentation/image/2c10aff4-fd62-41b6-8f50-315169616313?resizing_type=fill&width=1920&height=335)

玩家匹配是使用会话来匹配玩家的过程。 会话本质上是使用给定的属性集在服务器上运行的游戏实例，它可能是广告形式，这样就可以让想要玩游戏的玩家发现和加入，也可能是私密形式，这样只有以某种形式受到邀请或通知的玩家可以加入。

想象列出了当前正在进行的所有游戏的在线游戏大厅。 每个列表中的游戏都是会话，或单独的在线比赛。 可以通过搜索或其他方式来匹配会话中的玩家，然后玩家加入会话来玩游戏。

会话的基础生命周期是：

-   使用所需设置创建新会话
-   等待玩家申请加入比赛
-   注册想要加入的玩家
-   开始会话
-   玩游戏
-   终止会话
-   取消玩家注册
-   或者:
    
    -   如果你想要变更比赛类型并返回以等待玩家加入，则更新会话
    -   终止会话

## 会话接口

**会话接口（Session Interface）**，`IOnlineSession`，提供了用于执行玩家匹配所需的后台设置以及其他让玩家搜寻和加入在线游戏的方式的平台特定的功能。 这包括了会话管理，通过搜索或其他方式来搜寻会话，以及加入和离开这些会话。 会话界面由在线子系统来创建和所有。 这表示它仅存在于服务器上。

在每个平台上只有一个会话接口类。 当为新平台添加支持时，必须创建新类型的会话接口。 这里说的平台指的是硬件平台。 这种情况下，一次只能存在一个会话接口-即引擎当前正在运行的平台上的会话接口。

会话接口执行所有的会话处理，游戏一般不直接与其进行互动。 一般来说， **游戏会话** ，`AGameSession`，作为会话接口周围的游戏特定封装，并且游戏代码在其需要与会话进行互动时会对其进行调用。 游戏会话由游戏模式 `AGameMode` 所创建和拥有，并且仅在运行在线游戏时存在于服务器上。

每个游戏都可以有多种游戏会话类型，但一次只能使用一种。 游戏具有不止一种会话的最常见例子是在游戏使用专门的服务器时来添加游戏会话类型。

## 会话设置

**会话设置** 由 `FOnlineSessionSettings` 类定义，是决定会话特性的属性集。 在基础应用中，一般具有如下属性：

-   允许的玩家数量
-   该会话为广告会话还是私密会话
-   该会话是否为局域网比赛
-   该服务器为专用还是由玩家作为主机
-   是否允许邀请玩家
-   等等.

以在线游戏大厅的示例来说，每个游戏都是会话，并且具有其会话设置。 举例来说，一些会话可能为玩家对玩家（PVP），而另一些会话为合作式的多人游戏(Co-Op)。 不同的会话可能会使用不同的地图或游戏列表，或需要不同数量的玩家，等等。

## 会话管理

会话接口的主要任务之一是会话管理，包括会话设置，更新以及退出。

### 创建会话

为能让玩家找到会话并加入，你需要创建会话并设置其属性，并决定哪些属性可见，这样可以对其进行搜索。

会话使用 `IOnlineSession::CreateSession()` 进行创建，它使用会话设置集来配置新会话。 当会话被创建后，会触发 `OnCreateSessionComplete` 代理。

### 更新会话

当你想要变更已存会话设置并使用 `IOnlineSession::UpdateSession()` 函数来执行时，更新会话完成。 举例来说，当前会话可能设置为只允许8个玩家，而下一场游戏需要允许12个玩家的加入。 如需更新会话，`UpdateSession()` 将被调用，传递指定最高12名玩家的新会话设置。

当申请更新会话完成后，触发 `OnUpdateSessionComplete` 代理。 这提供了执行任意配置或所需的初始化以处理会话设置变更的条件。

更新会话一般在服务器上的比赛之间进行，但也会在客户端执行以保持会话信息的同步。

### 退出会话

当会话结束并且不再需要时，我们使用 `IOnlineSession::DestroySession()` 函数来退出会话。 当退出会话完成时，触发 `OnDestroySessionComplete` 代理，从而让你执行清理操作。

## 玩家匹配 - 搜寻会话

在线子系统提供了将玩家按照活动会话进行匹配的必要基础构建块。 它不会提供任意特定类型的内置了基础应用的玩家匹配。 但是，提供玩家匹配服务的平台上的应用向这些服务开放了访问权限。 这是搜寻会话以供玩家加入的过程。 当我们搜寻到该会话，玩家可以[加入会话](/documentation/zh-cn/unreal-engine/online-subsystem-session-interface-in-unreal-engine#%E5%8A%A0%E5%85%A5%E4%BC%9A%E8%AF%9D)。

### 搜索会话

搜寻会话最简单的方法是搜寻匹配所需设置子集的会话。 这可以是在用户接口中对用户选择筛选器的集合所作出的响应，也可以是基于玩家的技巧和其它因素在后台自动进行，或者是这两种方法的综合。

搜索会话的最为基础的形式是传统的服务器浏览器，它会显示所有可玩的游戏并让玩家基于他们想玩的游戏类型来进行筛选，并选择加入符合这些标准的会话之一。

如需搜索会话，使用 `IOnlineSession::FindSessions()` 并传递引用到会话设置以搜索 `FOnlineSessionSearch` 对象。 会话设置引用的 `SearchResults` 成员与游戏会话一起弹出。 当搜素完成时，触发 `OnFindSessionsComplete` 代理。 在此代理中，你可以通过搜索结果进行迭代。

### 基于云端的玩家匹配

基于云端的玩家匹配指的是内置的可用的玩家匹配服务，并且一般是特定平台的。 此类型服务的一个示例是通过微软的Xbox Live服务所提供的TrueSkill（真实技巧）系统。

如需对支持玩家匹配的平台进行其初始化，你可以调用 `IOnlineSession::Startmatchmaking()` 并传递给它用以匹配的玩家控制器数量，会话名称，创建新会话所需的会话设置，以及搜索的设置。 当玩家匹配完成时，会触发 `OnMatchmakingComplete` 代理。 这提供了定义过程是否成功的布尔值以及待加入的会话名称的信息。

正在运行中的玩家匹配操作可以通过调用 `IOnlineSession::CancelMatchmaking()` 来取消，并且可以在一开始就通过传递玩家控制器数量和传递到调用中的会话名称来开始玩家匹配。 当取消操作完成时，会调用 `OnCancelMatchmakingComplete` 代理。

### 跟随并邀请好友

在支持好友的平台上，玩家可以跟随好友进入会话或邀请好友加入会话。

你可以通过调用 `IOnlineSession:FindFriendSession()` 来跟从好友进入会话，并传递本地想要加入会话的玩家数量和已经在会话中的玩家ID到其中。 当找到会话并且其包含可用于加入会话的搜索结果时，触发 `OnFindFriendSessionComplete` 代理。

玩家也可以使用 `IOnlineSession:SendSessionInviteToFriend()` 或 `IOnlineSession::SendSessionInviteToFriends()` 来邀请一个或多个好友加入他们的当前会话，并传递本地玩家数量，会话名称以及待邀请的玩家ID的信息。 当好友接受邀请时，包含待加入的会话的搜索结果的 `OnSessionUserInviteAccepted` 代理被触发。

## 加入会话

当你确定了供玩家加入的会话时，加入的过程通过调用 `IOnlineSession::JoinSession()` 并传递玩家数量、名称和待加入的会话的搜索结果来初始化。 当加入会话完成时，触发 `OnJoinSessionComplete` 代理。 此时逻辑会让玩家加入已经进行的游戏。 首先，你需要调用 `IOnlineSession::GetResolvedConnectString()` ，它会返回加入游戏的平台特定连接信息。 从此函数中获得的字符串可以随后被传递到 `APlayerController::ClientTravel()` 或 `UWorld::Servertravel()` 以将玩家传递到游戏中。

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [会话接口](/documentation/zh-cn/unreal-engine/online-subsystem-session-interface-in-unreal-engine#%E4%BC%9A%E8%AF%9D%E6%8E%A5%E5%8F%A3)
-   [会话设置](/documentation/zh-cn/unreal-engine/online-subsystem-session-interface-in-unreal-engine#%E4%BC%9A%E8%AF%9D%E8%AE%BE%E7%BD%AE)
-   [会话管理](/documentation/zh-cn/unreal-engine/online-subsystem-session-interface-in-unreal-engine#%E4%BC%9A%E8%AF%9D%E7%AE%A1%E7%90%86)
-   [创建会话](/documentation/zh-cn/unreal-engine/online-subsystem-session-interface-in-unreal-engine#%E5%88%9B%E5%BB%BA%E4%BC%9A%E8%AF%9D)
-   [更新会话](/documentation/zh-cn/unreal-engine/online-subsystem-session-interface-in-unreal-engine#%E6%9B%B4%E6%96%B0%E4%BC%9A%E8%AF%9D)
-   [退出会话](/documentation/zh-cn/unreal-engine/online-subsystem-session-interface-in-unreal-engine#%E9%80%80%E5%87%BA%E4%BC%9A%E8%AF%9D)
-   [玩家匹配 - 搜寻会话](/documentation/zh-cn/unreal-engine/online-subsystem-session-interface-in-unreal-engine#%E7%8E%A9%E5%AE%B6%E5%8C%B9%E9%85%8D-%E6%90%9C%E5%AF%BB%E4%BC%9A%E8%AF%9D)
-   [搜索会话](/documentation/zh-cn/unreal-engine/online-subsystem-session-interface-in-unreal-engine#%E6%90%9C%E7%B4%A2%E4%BC%9A%E8%AF%9D)
-   [基于云端的玩家匹配](/documentation/zh-cn/unreal-engine/online-subsystem-session-interface-in-unreal-engine#%E5%9F%BA%E4%BA%8E%E4%BA%91%E7%AB%AF%E7%9A%84%E7%8E%A9%E5%AE%B6%E5%8C%B9%E9%85%8D)
-   [跟随并邀请好友](/documentation/zh-cn/unreal-engine/online-subsystem-session-interface-in-unreal-engine#%E8%B7%9F%E9%9A%8F%E5%B9%B6%E9%82%80%E8%AF%B7%E5%A5%BD%E5%8F%8B)
-   [加入会话](/documentation/zh-cn/unreal-engine/online-subsystem-session-interface-in-unreal-engine#%E5%8A%A0%E5%85%A5%E4%BC%9A%E8%AF%9D)
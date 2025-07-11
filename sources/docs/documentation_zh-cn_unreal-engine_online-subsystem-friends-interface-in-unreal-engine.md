# 虚幻引擎Online Subsystem好友接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/online-subsystem-friends-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:55:15.292Z

---

目录

![好友接口](https://dev.epicgames.com/community/api/documentation/image/3f6abbbb-55ae-45fc-a1ad-f3e73e51e5e2?resizing_type=fill&width=1920&height=335)

和好友一起玩游戏和在网上结识新玩家是许多在线服务的重要组成部分。 **好友接口（Friends Interface）** 包含管理用户社交联系人列表的功能，包括添加、删除和屏蔽其他用户。

## 管理好友

好友列表存储于在线服务的服务器上，可以在会话期间更改，比如添加或删除好友，加入或退出游戏和会话，或者登录和退出服务时。 因此，管理这些列表涉及到查询服务器的最新信息，然后缓存这些信息并在游戏中使用。

### 检索好友列表

处理用户好友列表的第一步通常是调用"ReadFriendsList"，它检索属于指定本地用户已命名好友列表的最新版本。 有效列表名称可在[`EFriendsList`](/documentation/en-us/unreal-engine/API/Plugins/OnlineSubsystem/Interfaces/EFriendsLists__Type)枚举类型中找到，并可由提供的"ToString"函数转换为字符串。 因为它查询远程机器，所以"ReadFriendsList"是异步进行的，并且完成后会调用"FOnReadFriendsListComplete"类型的委托。

成功后，该调用将缓存列表，以便稍后可以检查它，而无需重复查询远程机器，或者要求开发人员编写他们自己的缓存代码。 它还为列表上的用户更新[存在](/documentation/zh-cn/unreal-engine/online-subsystem-presence-interface-in-unreal-engine)状态数据。 "FOnReadFriendsListComplete"返回的数据只包含"ReadFriendsList"操作成功或失败的信息。

### 检查好友列表

在成功调用"ReadFriendsList"以检索并缓存列表后，开发人员可以使用"GetFriendsList"获取列表本身的副本，或者使用"GetFriend"从列表中检索单个好友。 此外，已知用户的"FUniqueNetId"可以被传递给"IsFriend"函数，用来检查该用户的指定列表。

好友列表可以随时更改，包括游戏内事件（例如结交新玩家）和游戏外事件（例如用户从单独的系统修改帐户）。 应该考虑调用"ReadFriendsList"来使缓存列表保持最新状态。

## 邀请好友

"SendInvite"函数将向另一个用户发送邀请，由该用户的"FUniqueNetId"识别。 一旦接受邀请，该用户将被在线服务添加到指定的列表中。 当此操作完成时，"FOnSendInviteComplete"类型的委托随即被调用，但这仅意味着已发送邀请（或未能发送），而不是预期的收件人已接收或响应邀请。 一些在线服务可能具有用于发送邀请的自定义用户接口，当调用"SendInvite"时，这些用户接口可能会自动打开。

所有"SendInvite"调用最终都会触发"FOnSendInviteComplete"委托。 这包括打开外部UI且用户取消它的情况。

### 接受和拒绝邀请

当来自另一个用户的邀请到达时，"FOnInviteReceivedDelegate"类型的委托随即被调用，其中包含发送方和接收方的"FUniqueNetId"。 然后，受邀用户可以调用"AcceptInvite"或"RejectInvite"来响应，指定新朋友所属列表的名称。 "AcceptInvite"使用"FOnAcceptInviteComplete"类型的委托来传递操作结果，而"RejectInvite"则使用"FOnRejectInviteComplete"类型的委托。

### 删除好友列表

您可以指示在线服务通过异步的"DeleteFriendsList"函数删除好友列表。 完成后，"FOnDeleteFriendsListComplete"类型的委托随即被调用。

### 删除好友

若要从属于本地用户的列表中删除好友，请调用"DeleteFriend"函数。 当操作完成时，"FOnDeleteFriendComplete"类型的委托随即被调用。 某一好友可能存在于某些在线服务的多个列表中；如果是这样，该函数将只从指定列表中删除该好友。

## 处理玩家在线会面

在线服务通常会保留一个单独的列表，其中包含的是用户最近遇到（比如在公共游戏会话中）但没有添加到好友列表或屏蔽的玩家。 像好友列表一样，最近遇到的玩家列表是通过查询在线服务然后缓存列表来处理的。

### 检索最近遇到的玩家列表

"QueryRecentPlayers"对在线服务进行异步调用，完成后调用"FOnQueryRecentPlayersComplete"类型的委托。 如果成功，好友接口（Friends Interface）将在本地缓存列表。

### 检查最近遇到的玩家

一旦对"QueryRecentPlayers"的成功调用检索到最近遇到的玩家列表，"GetRecentPlayers"函数将返回缓存的阵列。 阵列中的单独元素包含用户数据，以及一个用于告知用户该玩家上一次在线是在何时的函数。

## 管理屏蔽列表

许多在线服务允许用户屏蔽特定的其他用户通过该服务与他们联系或玩游戏。 好友接口（Friends Interface）可以检索和缓存被屏蔽用户的列表，以及利用在线服务的屏蔽和取消屏蔽功能。

### 列示当前屏蔽的用户

若要检索被屏蔽用户的列表，请调用"QueryBlockedPlayers"函数。 这个函数为异步函数，当它完成后将调用"FOnQueryBlockedPlayersComplete"类型的委托。 此外，对被屏蔽用户列表所做的任何更改都将通过"FOnBlockListChange"委托产生通知。

### 屏蔽和取消屏蔽用户

"BlockPlayer"和"UnblockPlayer"函数将对在线服务进行异步调用，请求被"FUniqueNetId"标识的特定玩家由本地用户屏蔽或取消屏蔽。 当这些操作完成后，它们将分别通过"FOnBlockedPlayerComplete"和"FOnUnblockedPlayerComplete"类型的委托返回成功或失败信息。

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [管理好友](/documentation/zh-cn/unreal-engine/online-subsystem-friends-interface-in-unreal-engine#%E7%AE%A1%E7%90%86%E5%A5%BD%E5%8F%8B)
-   [检索好友列表](/documentation/zh-cn/unreal-engine/online-subsystem-friends-interface-in-unreal-engine#%E6%A3%80%E7%B4%A2%E5%A5%BD%E5%8F%8B%E5%88%97%E8%A1%A8)
-   [检查好友列表](/documentation/zh-cn/unreal-engine/online-subsystem-friends-interface-in-unreal-engine#%E6%A3%80%E6%9F%A5%E5%A5%BD%E5%8F%8B%E5%88%97%E8%A1%A8)
-   [邀请好友](/documentation/zh-cn/unreal-engine/online-subsystem-friends-interface-in-unreal-engine#%E9%82%80%E8%AF%B7%E5%A5%BD%E5%8F%8B)
-   [接受和拒绝邀请](/documentation/zh-cn/unreal-engine/online-subsystem-friends-interface-in-unreal-engine#%E6%8E%A5%E5%8F%97%E5%92%8C%E6%8B%92%E7%BB%9D%E9%82%80%E8%AF%B7)
-   [删除好友列表](/documentation/zh-cn/unreal-engine/online-subsystem-friends-interface-in-unreal-engine#%E5%88%A0%E9%99%A4%E5%A5%BD%E5%8F%8B%E5%88%97%E8%A1%A8)
-   [删除好友](/documentation/zh-cn/unreal-engine/online-subsystem-friends-interface-in-unreal-engine#%E5%88%A0%E9%99%A4%E5%A5%BD%E5%8F%8B)
-   [处理玩家在线会面](/documentation/zh-cn/unreal-engine/online-subsystem-friends-interface-in-unreal-engine#%E5%A4%84%E7%90%86%E7%8E%A9%E5%AE%B6%E5%9C%A8%E7%BA%BF%E4%BC%9A%E9%9D%A2)
-   [检索最近遇到的玩家列表](/documentation/zh-cn/unreal-engine/online-subsystem-friends-interface-in-unreal-engine#%E6%A3%80%E7%B4%A2%E6%9C%80%E8%BF%91%E9%81%87%E5%88%B0%E7%9A%84%E7%8E%A9%E5%AE%B6%E5%88%97%E8%A1%A8)
-   [检查最近遇到的玩家](/documentation/zh-cn/unreal-engine/online-subsystem-friends-interface-in-unreal-engine#%E6%A3%80%E6%9F%A5%E6%9C%80%E8%BF%91%E9%81%87%E5%88%B0%E7%9A%84%E7%8E%A9%E5%AE%B6)
-   [管理屏蔽列表](/documentation/zh-cn/unreal-engine/online-subsystem-friends-interface-in-unreal-engine#%E7%AE%A1%E7%90%86%E5%B1%8F%E8%94%BD%E5%88%97%E8%A1%A8)
-   [列示当前屏蔽的用户](/documentation/zh-cn/unreal-engine/online-subsystem-friends-interface-in-unreal-engine#%E5%88%97%E7%A4%BA%E5%BD%93%E5%89%8D%E5%B1%8F%E8%94%BD%E7%9A%84%E7%94%A8%E6%88%B7)
-   [屏蔽和取消屏蔽用户](/documentation/zh-cn/unreal-engine/online-subsystem-friends-interface-in-unreal-engine#%E5%B1%8F%E8%94%BD%E5%92%8C%E5%8F%96%E6%B6%88%E5%B1%8F%E8%94%BD%E7%94%A8%E6%88%B7)
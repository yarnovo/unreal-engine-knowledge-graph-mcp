# 虚幻引擎中的社交接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/social-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:54:14.122Z

---

目录

![社交接口](https://dev.epicgames.com/community/api/documentation/image/4185eef8-1270-41ef-95dc-19376f7383ea?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**在线服务社交接口（Online Services Social Interface）** 管理用户之间的关系。其中包括：

-   检索和查看玩家的好友列表。
-   发送好友邀请。
-   接受/拒绝好友邀请。
-   查看阻止的玩家的列表。
-   阻止其他玩家。

## API 概述

### 函数

下表概述了社交接口提供的函数：

**函数**

**说明**

**查看**

 

[`QueryFriends`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISocial/QueryFriends)

查询玩家的好友列表。

[`GetFriends`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISocial/GetFriends)

检索 `QueryFriends` 缓存的好友列表。

**邀请（Invite）**

 

[`SendFriendInvite`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISocial/SendFriendInvite)

发送好友邀请。

[`AcceptFriendInvite`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISocial/AcceptFriendInvite)

接受好友邀请。

[`RejectFriendInvite`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISocial/RejectFriendInvite)

拒绝好友邀请。

**阻止**

 

[`QueryBlockedUsers`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISocial/QueryBlockedUsers)

查询阻止的用户列表。

[`GetBlockedUsers`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISocial/GetBlockedUsers)

检索 `QueryBlockedUsers` 缓存的阻止的用户列表。

[`BlockUser`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISocial/BlockUser)

阻止指定用户。

**事件监听**

 

[`OnRelationshipUpdated`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISocial/OnRelationshipUpdated)

更新好友列表所触发的事件。

### 主结构体

社交接口主要通过 [`FFriend`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/FFriend) 结构体传达其功能，并使用特定于函数的结构体传递参数和返回值。

#### FFriend

**成员**

**类型**

**说明**

`FriendId`

`FAccountId`

此好友的账号ID。

`DisplayName`

`FString`

显示此好友的姓名。

`Nickname`

`FString`

此好友的本地昵称。

查阅你的平台的在线服务的文档，了解可用性。

`Relationship`

`ERelationship`

与此好友的关系。

### 枚举类

[`ERelationship`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/UE__Online__ERelationship) 枚举的类将保存本地用户与访问它所通过的 `Ffriend` 结构体表示的在线用户之间的关系状态。

#### ERelationship

**值**

**说明**

`Friend`

好友

`NotFriend`

不是好友

`InviteSent`

已发送给用户的邀请。

`InviteReceived`

从用户收到的邀请。

`Blocked`

本地用户阻止了此用户。

## 流程

### 查看好友

启动游戏时，玩家查看哪些好友在线。为此， `QueryFriends` 使用社交接口缓存玩家的好友列表，然后 `GetFriends` 检索之前缓存的好友列表以供读取。现在玩家可以查看其好友列表，决定是否邀请其好友加入大厅并一起进入游戏会话。

### 邀请好友

与好友和其他在线玩家一起玩游戏后，玩家认识了一起玩得开心的其他几个玩家。玩家决定向其中两个在线玩家发送好友邀请。`SendFriendInvite` 在每次调用时向单个提供的玩家提供友谊邀请。其中一个在线玩家看到邀请并拒绝了。游戏调用 `RejectFriendInvite` 来拒绝玩家的邀请。

与此同时，第二个在线玩家接受了邀请。调用 `AcceptFriendInvite` 接受玩家的邀请。此友谊接受操作会针对发送邀请的玩家和接受邀请的在线玩家触发 `OnRelationshipUpdated` 事件。

### 阻止用户

在与新好友玩游戏的过程中，玩家认识了另一个在线玩家。这次，玩家决定以后不想与此在线玩家互动。玩家前往阻止此在线玩家。玩家可以查询其阻止的列表，查看自己阻止的在线玩家。`QueryBlockedUsers` 缓存接口中的信息，后续调用 `GetBlockedUsers` 会检索阻止的玩家的列表。如果相关在线玩家没有显示在此列表中，调用 `BlockUser` 会将该在线玩家添加到玩家的阻止列表。

根据你的平台，邀请和阻止API可能会弹出平台对话框，以执行关联的操作。如需了解更多信息，请查阅你的特定平台的文档。

## 从在线子系统转换代码

在线服务社交接口负责[在线子系统](/documentation/zh-cn/unreal-engine/online-subsystem-in-unreal-engine)[好友接口](/documentation/zh-cn/unreal-engine/online-subsystem-friends-interface-in-unreal-engine)之前处理的所有代码。

## 更多信息

### 头文件

直接查阅 `Social.h` 头文件，根据需要了解更多信息。社交接口头文件 `Social.h` 位于以下目录中：

```cpp
Engine\Plugins\Online\OnlineServices\Source\OnlineServicesInterface\Public\Online
```

如需有关如何获取UE源代码的说明，请参阅关于[下载虚幻引擎源代码](/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine)的文档。

### 函数参数和返回类型

请参阅[在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)页面的[函数](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%87%BD%E6%95%B0)小节，了解函数参数和返回类型的说明，包括如何传递参数和处理函数返回时的结果。

-   [social](https://dev.epicgames.com/community/search?query=social)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [online services](https://dev.epicgames.com/community/search?query=online%20services)
-   [friends](https://dev.epicgames.com/community/search?query=friends)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [API 概述](/documentation/zh-cn/unreal-engine/social-interface-in-unreal-engine#api%E6%A6%82%E8%BF%B0)
-   [函数](/documentation/zh-cn/unreal-engine/social-interface-in-unreal-engine#%E5%87%BD%E6%95%B0)
-   [主结构体](/documentation/zh-cn/unreal-engine/social-interface-in-unreal-engine#%E4%B8%BB%E7%BB%93%E6%9E%84%E4%BD%93)
-   [FFriend](/documentation/zh-cn/unreal-engine/social-interface-in-unreal-engine#ffriend)
-   [枚举类](/documentation/zh-cn/unreal-engine/social-interface-in-unreal-engine#%E6%9E%9A%E4%B8%BE%E7%B1%BB)
-   [ERelationship](/documentation/zh-cn/unreal-engine/social-interface-in-unreal-engine#erelationship)
-   [流程](/documentation/zh-cn/unreal-engine/social-interface-in-unreal-engine#%E6%B5%81%E7%A8%8B)
-   [查看好友](/documentation/zh-cn/unreal-engine/social-interface-in-unreal-engine#%E6%9F%A5%E7%9C%8B%E5%A5%BD%E5%8F%8B)
-   [邀请好友](/documentation/zh-cn/unreal-engine/social-interface-in-unreal-engine#%E9%82%80%E8%AF%B7%E5%A5%BD%E5%8F%8B)
-   [阻止用户](/documentation/zh-cn/unreal-engine/social-interface-in-unreal-engine#%E9%98%BB%E6%AD%A2%E7%94%A8%E6%88%B7)
-   [从在线子系统转换代码](/documentation/zh-cn/unreal-engine/social-interface-in-unreal-engine#%E4%BB%8E%E5%9C%A8%E7%BA%BF%E5%AD%90%E7%B3%BB%E7%BB%9F%E8%BD%AC%E6%8D%A2%E4%BB%A3%E7%A0%81)
-   [更多信息](/documentation/zh-cn/unreal-engine/social-interface-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF)
-   [头文件](/documentation/zh-cn/unreal-engine/social-interface-in-unreal-engine#%E5%A4%B4%E6%96%87%E4%BB%B6)
-   [函数参数和返回类型](/documentation/zh-cn/unreal-engine/social-interface-in-unreal-engine#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E5%92%8C%E8%BF%94%E5%9B%9E%E7%B1%BB%E5%9E%8B)

相关文档

[

好友接口

![好友接口](https://dev.epicgames.com/community/api/documentation/image/344a43a6-7e67-4af5-ae6b-5965693d4ad8?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/online-subsystem-friends-interface-in-unreal-engine)
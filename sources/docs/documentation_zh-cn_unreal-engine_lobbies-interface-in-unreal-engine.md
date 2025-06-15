# 虚幻引擎中的大厅接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:54:18.721Z

---

目录

![大厅接口](https://dev.epicgames.com/community/api/documentation/image/c7a25174-8c5f-46a4-bf2c-afafbc43d594?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**在线服务大厅接口（Online Services Lobbies Interface）** 提供了用于创建和管理大厅的API。**大厅（lobby）** 是客户端应用程序情境中的一组玩家，其中所有玩家都共有某种状态。这可能意味着，他们都在一起参加同一场在线比赛，或在等待同一场比赛开始。大厅及其成员都有用于共享此状态的属性。更改大厅的属性或其成员的属性之后，所有连接的大厅成员都会实时看到这些更改。

厅长可以更改大厅的属性，每个成员（包括厅长）可以随时更改自己的属性。**大厅模式（lobby schema）** 定义了这些属性，以及其类型和值约束，然后会使用这些属性创建大厅。此大厅模式在应用程序配置文件中定义，并在应用程序启动时进行验证。你不需要定义所有属性即可创建大厅，但如果你定义的某个属性未通过模式验证，大厅创建将失败。

大厅的常见用法是将多个玩家归为一组，然后前往比赛。在单个大厅的生命周期内，可以运行多场游戏比赛。下面是大厅的生命周期示例：

-   一个玩家使用所需的隐私设置和属性创建新大厅。此玩家被指定为厅长。
-   其他玩家通过公共搜索、邀请或社交在线状态找到并加入大厅。
-   玩家通过属性更新共享大厅中的属性。
-   大厅选择运行比赛时，厅长会将比赛会话ID记录为大厅属性。
-   其他大厅成员会看到此会话ID并加入同一游戏会话。
-   在多场游戏比赛的生命周期内，会有玩家加入或离开大厅。

## API 概述

### 函数

下表概述了大厅接口提供的函数：

**函数**

**说明**

**操作**

 

[`CreateLobby`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/CreateLobby)

创建并加入新大厅。

[`FindLobbies`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/FindLobbies)

按照提供的参数搜索适合的大厅。

[`RestoreLobbies`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/RestoreLobbies)

尝试重新加入之前加入的大厅。

[`JoinLobby`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/JoinLobby)

使用提供的大厅ID加入大厅。

[`LeaveLobby`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/LeaveLobby)

离开已加入的大厅。

[`InviteLobbyMember`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/InviteLobbyMember)

邀请玩家加入大厅。

[`DeclineLobbyInvitation`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/DeclineLobbyInvitation)

拒绝加入大厅的邀请。

[`KickLobbyMember`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/KickLobbyMember)

将某个成员踢出目标大厅。

[`PromoteLobbyMember`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/PromoteLobbyMember)

将另一个大厅成员晋升为厅长。调用 `PromoteLobbyMember` 的本地玩家必须是当前厅长，才能晋升另一个成员。

**突变**

 

[`ModifyLobbySchema`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/ModifyLobbySchema)

更改应用于大厅和成员属性的模式。只有厅长可以更改模式。新模式中不存在的现有属性将被清除。

[`ModifyLobbyJoinPolicy`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/ModifyLobbyJoinPolicy)

更改应用于大厅的加入规则。只有厅长可以更改加入规则。

[`ModifyLobbyAttributes`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/ModifyLobbyAttributes)

更改应用于大厅的属性。只有厅长可以更改大厅属性。属性会针对大厅模式进行验证，然后更新才能成功。

[`ModifyLobbyMemberAttributes`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/ModifyLobbyMemberAttributes)

更改应用于大厅成员的属性。大厅成员只能更改自己的属性。属性会针对大厅模式进行验证，然后更新才能成功。

**访问器**

 

[`GetJoinedLobbies`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/GetJoinedLobbies)

检索目标本地玩家的已加入大厅列表。

[`GetReceivedInvitations`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/GetReceivedInvitations)

检索目标本地玩家的已收到邀请列表。

**事件监听**

 

[`OnLobbyJoined`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/OnLobbyJoined)

玩家加入大厅时触发的事件。

[`OnLobbyLeft`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/OnLobbyLeft)

所有本地成员离开大厅时触发的事件。

[`OnLobbyMemberJoined`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/OnLobbyMemberJoined)

大厅成员加入时（因本地玩家创建或加入大厅）或远程玩家加入时触发的事件。

[`OnLobbyMemberLeft`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/OnLobbyMemberLeft)

大厅成员离开已加入的大厅时触发的事件。

[`OnLobbyLeaderChanged`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/OnLobbyLeaderChanged)

大厅的领导权更改时触发的事件。

[`OnLobbySchemaChanged`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/OnLobbySchemaChanged)

大厅的属性模式更改时触发的事件。

[`OnLobbyAttributesChanged`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/OnLobbyAttributesChanged)

大厅的属性更改时触发的事件。

[`OnLobbyMemberAttributesChanged`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/OnLobbyMemberAtt-)

大厅成员的属性更改时触发的事件。

[`OnLobbyInvitationAdded`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/OnLobbyInvitationAdded)

大厅成员收到邀请时触发的事件。

[`OnLobbyInvitationRemoved`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/OnLobbyInvitationRemoved)

大厅成员处理邀请或邀请到期时触发的事件。

[`OnUILobbyJoinRequested`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILobbies/OnUILobbyJoinRequested)

玩家请求通过外部机制加入大厅时触发的事件。

### 枚举类

大厅接口提供了枚举类，以反映大厅加入规则和大厅成员离开原因：

#### ELobbyJoinPolicy

**枚举器**

**说明**

`PublicAdvertised`

用户可以基于属性匹配、大厅ID或邀请通过搜索找到大厅。

`PublicNotAdvertised`

用户可以通过大厅ID或邀请加入大厅。

`InvitationOnly`

用户只能通过邀请加入大厅。

#### ELobbyMemberLeaveReason

**枚举器**

**说明**

`Left`

大厅成员选择了离开大厅。

`Kicked`

大厅成员被厅主踢出大厅。

`Disconnected`

大厅成员意外离开了。

`Closed`

大厅被在线服务销毁，所有成员都已离开。

### 主要结构体

大厅接口功能主要通过两种结构体通信：`FLobbyMember` 和 `Flobby` ，以及用于传递参数和返回值的特定于函数的结构体。

#### FLobbyMember

**成员**

**类型**

**说明**

`AccountId`

`FAccountId`

此大厅成员的账号ID。

`PlatfromAccountId`

`FAccountId`

此大厅成员的平台账号ID。

`PlatfromDisplayName`

`FString`

此大厅成员的平台显示名称。

`Attributes`

`TMap<FSchemaAttributeId, FSchemaVariant>`

此大厅成员的属性，如配置中所定义。

`bIsLocalMember`

`bool`

此大厅成员是否为此客户端上的本地玩家。（默认值为 `false` 。）

#### FLobby

**成员**

**类型**

**说明**

`LobbyId`

`FLobbyId`

此大厅的ID。

`OwnerAccountId`

`FAccountId`

作为当前厅主的大厅成员账号ID。

`LocalName`

`FName`

此大厅的本地名称。

`SchemaId`

`FSchemaId`

应用于此大厅的模式的ID。

`MaxMembers`

`int32`

在给定时间可以加入此大厅的成员人数上限。

`JoinPolicy`

`ELobbyJoinPolicy`

此大厅的加入规则设置。

`Attributes`

`TMap<FSchemaAttributeId, FSchemaVariant>`

此大厅的属性，如配置中所定义。

`Members`

`TMap<FAccountId, TSharedRef<const FLobbyMember>>`

大厅成员的字典，其中键是账号ID，值是指向其对应大厅成员结构体的指针。

## 配置

大厅使用模式系统来定义大厅的结构和属性，以及大厅成员属性。游戏可以声明多个单独的模式定义，支持许多不同类型的大厅。所有大厅模式都必须从 `LobbyBase` 模式派生。

`LobbyBase` 模式包含玩家可用于搜索大厅的所有属性。此继承结构意味着，大厅接口知道要将游戏提供的哪个模式应用于搜索结果。`SchemaCompatibilityId` 是 `LobbyBase` 中的特殊属性，其存在目的是确保模式在两个客户端之间兼容。

游戏必须为模式定义中存在的每个模式属性声明定义。模式在项目的配置文件（ `*.ini` 文件）中定义。这些定义包括属性的类型、最大大小和可视性，以及其他行为，例如属性是否作为搜索参数可用。

一般来说，模式拥有类别，而类别包含属性定义。大厅接口模式有两个类别：`Lobby` 和 `LobbyMember` 。这些类别包含分别应用于大厅对象和大厅成员对象的属性定义。

### 示例

下面是大厅接口的示例配置：

**DefaultEngine.ini**

```cpp
	[OnlineServices.Lobbies]
	+SchemaDescriptors=(Id="GameLobby", ParentId="LobbyBase")

	!SchemaCategoryAttributeDescriptors=ClearArray
	+SchemaCategoryAttributeDescriptors=(SchemaId="LobbyBase", CategoryId="Lobby", AttributeIds=("SchemaCompatibilityId", "ExampleSearchableLobbyAttribute"))
	+SchemaCategoryAttributeDescriptors=(SchemaId="LobbyBase", CategoryId="LobbyMember")

	+SchemaCategoryAttributeDescriptors=(SchemaId="GameLobby", CategoryId="Lobby", AttributeIds=("GameMode", "GameSessionId", "MapName", "MatchTimeout"))
	+SchemaCategoryAttributeDescriptors=(SchemaId="GameLobby", CategoryId="LobbyMember", AttributeIds=("Appearance"))

	+SchemaAttributeDescriptors=(Id="ExampleSearchableLobbyAttribute", Type="String", Flags=("Public", "Searchable"), MaxSize=64)
	+SchemaAttributeDescriptors=(Id="GameMode", Type="String", Flags=("Public"), MaxSize=64)
	+SchemaAttributeDescriptors=(Id="GameSessionId", Type="String", Flags=("Private"), MaxSize=64)
	+SchemaAttributeDescriptors=(Id="MapName", Type="String", Flags=("Public"), MaxSize=64)
	+SchemaAttributeDescriptors=(Id="MatchTimeout", Type="Double", Flags=("Public"))
	+SchemaAttributeDescriptors=(Id="Appearance", Type="String", Flags=("Public"), MaxSize=64)
```

## 流程

### 创建

玩家发起大厅创建，并将在大厅创建后被指定为厅长。执行创建操作的玩家决定初始大厅设置。这些设置可以包括：

-   可视性
-   加入规则
-   模式ID
-   大厅属性
-   大厅成员属性

其他玩家可以在搜索大厅时看到公共属性。厅长有更多权限，本页[厅长操作](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E5%8E%85%E9%95%BF%E6%93%8D%E4%BD%9C)小节中有所概括。包括厅长在内，所有大厅成员都可以更改自己的个人属性或邀请玩家加入大厅。这些操作在[成员操作](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E6%88%90%E5%91%98%E6%93%8D%E4%BD%9C)小节中进行了总结。

成功创建大厅后，执行创建操作的玩家会收到 `OnLobbyJoined` 事件，接着是 `OnLobbyMemberJoined` ，因为该玩家现在是指定的厅长。只要此玩家被指定为厅长，就会在玩家加入和离开大厅时收到更多 `OnLobbyMemberJoined` 和 `OnLobbyMemberLeft` 事件。

### 查找

要加入大厅，玩家首先需要知道大厅的ID。玩家可以通过以下方式查找ID：

-   搜索
-   邀请

搜索和邀请都会向客户端应用程序提供大厅数据的快照。玩家加入大厅之后，快照中的属性才会更新。

#### 搜索

在搜索大厅时，玩家可以指定属性，按照所需配置查找匹配的大厅。玩家可以通过以下方式搜索大厅：

-   属性筛选器
-   目标玩家
-   特定大厅ID

#### 邀请

根据大厅的隐私设置，大厅成员可以邀请更多玩家加入大厅。发送邀请后，目标玩家会收到 `OnLobbyInvitationAdded` 事件，该事件会向玩家通知等待中的邀请。`OnLobbyInvitationRemoved` 事件在邀请被处理或到期时触发。

#### 社交在线状态

一些在线服务实现允许玩家通过社交用户接口加入好友的大厅，例如[在线服务在线状态接口](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine)。玩家选择以此方式加入时， `OnUILobbyJoinRequested` 事件将触发应用程序，表明玩家想要加入大厅。

### 加入

玩家知道想要加入的大厅ID后，调用 `JoinLobby` 就会启动添加本地玩家的过程。本地玩家必须提供其初始 `LobbyMember` 属性，这些属性会在其他现有大厅成员加入大厅时与之共享。

成功加入大厅后，玩家会收到 `OnLobbyJoined` 事件。大厅的每个现有成员会收到 `OnLobbyMemberJoined` 事件，该事件会向所有成员通知新玩家已加入。只要玩家留在大厅中，就会在其他玩家加入和离开大厅时收到更多 `OnLobbyMemberJoined` 和 `OnLobbyMemberLeft` 事件。

### 离开

玩家不想留在大厅中时， `LeaveLobby` 会将玩家从带有所附大厅ID的大厅删除，并停止通知。玩家离开大厅后，大厅中的其他所有玩家都会收到 `OnLobbyMemberLeft` 通知。这会向所有其他人通知玩家已离开大厅。在这些通知之后，会向离开大厅的玩家发送 `OnLobbyLeft` 事件。

### 恢复

`RestoreLobbies` 可恢复调用此函数的玩家之前加入的所有大厅。这通常由游戏在应用程序启动时执行，以将本地玩家重新加入到应用程序上次退出时所在的大厅。

## 厅长操作

厅长有更多专属权限，可用于帮助维护大厅。

### 晋升成员

厅长可以调用 `PromoteLobbyMember` ，将其他大厅成员晋升为厅长。此操作会为所有大厅成员触发 `OnLobbyLeaderChanged` 事件。之前是厅长的玩家会变成普通大厅成员。

### 踢出成员

厅长可以调用 `KickLobbyMember` ，将目标成员从大厅删除。此操作会为被踢的大厅成员触发 `OnLobbyLeft` 事件，并为其他所有大厅成员触发 `OnLobbyMemberLeft` 事件。

### 更新大厅属性

厅长可以更改大厅对象的属性。这通过调用 `ModifyLobbyAttributes` 进行处理。大厅属性更改时，所有大厅成员会收到 `OnLobbyAttributesChanged` 事件，该事件会向成员通知更改的属性。

### 更改大厅加入规则

大厅的加入规则会影响大厅是否显示在搜索结果中，仅限邀请，或者可以通过社交在线状态加入。厅长可以调用 `ModifyLobbyJoinPolicy` 更改此设置。

## 成员操作

大厅成员仅可执行两个操作。成员可以更新自己的属性，可以邀请其他成员加入大厅。

### 更改成员属性

大厅成员可以调用 `ModifyLobbyMemberAttributes` 更改自己的属性。`OnLobbyMemberAttributesChanged` 事件会向其他大厅成员通知此更改。

### 邀请玩家加入大厅

如果大厅加入规则当前允许邀请，大厅成员可以通过调用 `InviteLobbyMember` 邀请更多玩家。邀请目标会收到 `OnLobbyInvitationAdded` 事件，该事件会向其通知待处理邀请。受邀玩家可选择调用 `JoinLobby` 选择加入大厅，或调用 `DeclineLobbyInvitation` 拒绝邀请。

## 从在线子系统转换代码

大厅是在线服务的新接口，在 **在线子系统（Online Subsystem）** 中没有直接对等物。

## 更多信息

### 头文件

直接查阅 `Lobbies.h` 头文件，根据需要了解更多信息。大厅接口头文件 `Lobbies.h` 位于以下目录中：

```cpp

	UNREAL_ENGINE_ROOT\Engine\Plugins\Online\OnlineServices\Source\OnlineServicesInterface\Public\Online

```

如需有关如何获取UE源代码的说明，请参阅关于[下载虚幻引擎源代码](/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine)的文档。

### 函数参数和返回类型

请参阅[在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)页面的[函数](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%87%BD%E6%95%B0)小节，了解函数参数和返回类型的说明，包括如何传递参数和处理函数返回时的结果。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [online services](https://dev.epicgames.com/community/search?query=online%20services)
-   [lobbies](https://dev.epicgames.com/community/search?query=lobbies)
-   [invite](https://dev.epicgames.com/community/search?query=invite)
-   [lobby schema](https://dev.epicgames.com/community/search?query=lobby%20schema)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [API 概述](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#api%E6%A6%82%E8%BF%B0)
-   [函数](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E5%87%BD%E6%95%B0)
-   [枚举类](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E6%9E%9A%E4%B8%BE%E7%B1%BB)
-   [ELobbyJoinPolicy](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#elobbyjoinpolicy)
-   [ELobbyMemberLeaveReason](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#elobbymemberleavereason)
-   [主要结构体](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E4%B8%BB%E8%A6%81%E7%BB%93%E6%9E%84%E4%BD%93)
-   [FLobbyMember](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#flobbymember)
-   [FLobby](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#flobby)
-   [配置](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E9%85%8D%E7%BD%AE)
-   [示例](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E7%A4%BA%E4%BE%8B)
-   [流程](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E6%B5%81%E7%A8%8B)
-   [创建](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E5%88%9B%E5%BB%BA)
-   [查找](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E6%9F%A5%E6%89%BE)
-   [搜索](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E6%90%9C%E7%B4%A2)
-   [邀请](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E9%82%80%E8%AF%B7)
-   [社交在线状态](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E7%A4%BE%E4%BA%A4%E5%9C%A8%E7%BA%BF%E7%8A%B6%E6%80%81)
-   [加入](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E5%8A%A0%E5%85%A5)
-   [离开](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E7%A6%BB%E5%BC%80)
-   [恢复](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E6%81%A2%E5%A4%8D)
-   [厅长操作](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E5%8E%85%E9%95%BF%E6%93%8D%E4%BD%9C)
-   [晋升成员](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E6%99%8B%E5%8D%87%E6%88%90%E5%91%98)
-   [踢出成员](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E8%B8%A2%E5%87%BA%E6%88%90%E5%91%98)
-   [更新大厅属性](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E6%9B%B4%E6%96%B0%E5%A4%A7%E5%8E%85%E5%B1%9E%E6%80%A7)
-   [更改大厅加入规则](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E6%9B%B4%E6%94%B9%E5%A4%A7%E5%8E%85%E5%8A%A0%E5%85%A5%E8%A7%84%E5%88%99)
-   [成员操作](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E6%88%90%E5%91%98%E6%93%8D%E4%BD%9C)
-   [更改成员属性](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E6%9B%B4%E6%94%B9%E6%88%90%E5%91%98%E5%B1%9E%E6%80%A7)
-   [邀请玩家加入大厅](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E9%82%80%E8%AF%B7%E7%8E%A9%E5%AE%B6%E5%8A%A0%E5%85%A5%E5%A4%A7%E5%8E%85)
-   [从在线子系统转换代码](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E4%BB%8E%E5%9C%A8%E7%BA%BF%E5%AD%90%E7%B3%BB%E7%BB%9F%E8%BD%AC%E6%8D%A2%E4%BB%A3%E7%A0%81)
-   [更多信息](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF)
-   [头文件](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E5%A4%B4%E6%96%87%E4%BB%B6)
-   [函数参数和返回类型](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E5%92%8C%E8%BF%94%E5%9B%9E%E7%B1%BB%E5%9E%8B)

相关文档

[

在线子系统

![在线子系统](https://dev.epicgames.com/community/api/documentation/image/c34af712-b971-4b54-ae87-0b1a7bdea497?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/online-subsystem-in-unreal-engine)
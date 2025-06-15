# 虚幻引擎中的在线状态接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:54:18.234Z

---

目录

![在线服务在线状态接口](https://dev.epicgames.com/community/api/documentation/image/0a36ac33-2592-415a-9493-12cc54099305?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

登录在线服务后，你可能想查找有关你的好友和在线结识的其他用户的信息。例如，在许多在线服务上，你都可以查看其他用户是否在线、他们当前正在玩什么游戏、他们是否可以加入比赛等信息。**在线服务在线状态接口（Online Services Presence Interface）** 包含所有与跨在线服务的平台特有用户状态相关的功能，包括查询和更新用户的在线状态以及侦听变化。

本文档提供了API概述和代码示例，以及从[在线子系统在线状态接口](/documentation/zh-cn/unreal-engine/online-subsystem-presence-interface-in-unreal-engine)转换代码的技巧。

## API 概述

### 函数

下表概要说明了在线状态接口中包括的函数。

**函数**

**说明**

**查询**

 

[`QueryPresence`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IPresence/QueryPresence)

使用提供的 `TargetAccountId` 获取用户的在线状态。

[`BatchQueryPresence`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IPresence/BatchQueryPresence)

获取提供的 `TargetAccountId` 列表中每个用户的在线状态。

**获取**

 

[`GetCachedPresence`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IPresence/GetCachedPresence)

使用接口内缓存的所提供 `TargetAccountId` 检索用户的在线状态。

**更新**

 

[`UpdatePresence`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IPresence/UpdatePresence)

更新用户的在线状态。

[`PartialUpdatePresence`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IPresence/PartialUpdatePresence)

仅使用指定的在线状态设置更新用户的在线状态。

**事件监听**

 

[`OnPresenceUpdated`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IPresence/OnPresenceUpdated)

将根据用户在线状态的更新结果触发事件。

### 枚举类

在线状态接口定义了三个枚举类，分别表示用户的状态（[`EUserPresenceStatus`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/UE__Online__EUserPresenceStatus)）、可加入性（[`EUserPresenceJoinability`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/UE__Online__EUserPresenceJoinabi-)）和游戏状态（[`EUserPresenceGameStatus`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/UE__Online__EUserPresenceGameSta-)）。这些枚举类表示 `FUserPresence` 结构体的三个主要成员。请参阅本页面的[主结构体](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine#%E4%B8%BB%E7%BB%93%E6%9E%84%E4%BD%93)分段，了解详细信息。

#### EUserPresenceStatus

**枚举器**

**说明**

`Offline`

用户离线。

`Online`

用户在线。

`Away`

用户离开。

`ExtendedAway`

用户已离开至少两个小时（可能取决于平台）。

`DoNotDisturb`

用户不想被打扰。

`Unknown`

默认用户在线状态。

#### EUserPresenceJoinability

**枚举器**

**说明**

`Public`

任何人都可以发现并加入此会话。

`FriendsOnly`

试图加入的人必须是某个大厅成员的好友。

`InviteOnly`

试图加入的人必须先得到邀请。

`Private`

用户目前不接受邀请。

`Unknown`

默认用户可加入性在线状态。

#### EUserPresenceGameStatus

**枚举器**

**说明**

`PlayingThisGame`

用户正在玩与你相同的游戏。

`PlayingOtherGame`

用户正在玩与你不同的游戏。

`Unknown`

默认用户游戏在线状态。

### 主结构体

#### FUserPresence

[`FUserPresence`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/FUserPresence)结构体是在线状态接口中的主要对象，包含所有与用户在线状态有关的必要信息。

**成员**

**类型**

**说明**

`AccountId`

`FAccountId`

具有此在线状态的用户。

`Status`

`EUserPresenceStatus`

用户在线状态。（默认值为 `EUserPresenceStatus::Unknown` 。）

`Joinability`

`EUserPresenceJoinability`

用户会话状态。（默认值为 `EUserPresenceJoinability::Unknown` 。）

`GameStatus`

`EUserPresenceGameStatus`

用户游戏状态。（默认值为 `EUserPresenceGameStatus::Unknown` 。）

`StatusString`

`FString`

用户在线状态的字符串表示形式。

`RichPresenceString`

`FString`

当前游戏状态的游戏定义表示形式。

`Properties`

`FPresenceProperties`

会话密钥。

类型 `FPresenceProperties` 是 `TMap<FString, FPresenceVariant>` 的typedef，其中 `FPresenceVariant` 是一个 `FString` 。

## 示例

我们现在举例来演示 `UpdatePresence`、`QueryPresence` 和 `GetPresence`。`UserA` 使用默认平台服务更新其在线状态，然后 `UserB` 在 `UserA` 的在线状态更新后查询其在线状态。如果查询成功返回结果，则 `UserB` 检索 `UserA` 的在线状态。

### 代码

UserAPresence.cpp

```cpp
UE::Online::IOnlineServicesPtr OnlineServices = UE::Online::GetServices();
UE::Online::IPresencePtr PresenceInterface = OnlineServices->GetPresenceInterface();

TSharedRef<UE::Online::FUserPresence> Presence = MakeShared<UE::Online::FUserPresence>();
Presence->AccountId = UserA;
Presence->Status = UE::Online::EUserPresenceStatus::Online;
Presence->Joinability = UE::Online::EUserPresenceJoinability::Public;
Presence->RichPresenceString = TEXT("Exploring the Great Citadel");
Presence->Properties.Add(TEXT("advanced_class"), TEXT("advanced_class_assassin"));

UE::Online::FUpdatePresence::Params Params;
Params.LocalAccountId = AccountId;
Params.Presence = Presence;

PresenceInterface->UpdatePresence(MoveTemp(Params))
.OnComplete([](const UE::Online::TOnlineResult<UE::Online::FUpdatePresence> Result)
{
	if(Result.IsOk())
	{
		// 我们成功了 - UserB现在可以查询在线状态
	}
	else
	{
		// 我们失败了 - 检查Result.GetErrorValue();中的错误状态
	}
});
```

UserBPresence.cpp

```cpp
UE::Online::IOnlineServicesPtr OnlineServices = UE::Online::GetServices();
UE::Online::IPresencePtr PresenceInterface = OnlineServices->GetPresenceInterface();

PresenceInterface->QueryPresence({UserA})
.OnComplete([](const UE::Online::TOnlineResult<UE::Online::FQueryPresence> Result)
{
	if(Result.IsOk())
	{
		// 我们成功了 - 现在使用GetPresence实际查看在线状态对象

		UE::Online::TOnlineResult<UE::Online::FGetPresence> GetPresenceResult = PresenceInterface->GetPresence({UserB});
		if(GetPresenceResult.IsOk())
		{
			TSharedRef<const UE::Online::FUserPresence> Presence = GetPresenceResult.GetOkValue().Presence;

			// Presence->RichPresenceString现在将是"探索大城堡"
			// Presence->Properties现在将包含{advanced_class: advanced_class_assassin}
			// 等等...
		}
		else
		{
			// 我们失败了 - 通过GetPresenceResult.GetErrorValue();检查错误状态
		}

	}
	else
	{
		//我们失败了 - 检查Result.GetErrorValue();中的错误状态
	}
});
```

##### 讲解

1.  两个用户都通过不指定参数调用 `GetServices` 检索默认在线服务，并访问在线状态接口：
    
    UserAPresence.cpp和UserBPresence.cpp
    
    ```cpp
     UE::Online::IOnlineServicesPtr OnlineServices = UE::Online::GetServices();
     UE::Online::IPresencePtr PresenceInterface = OnlineServices->GetPresenceInterface();
    ```
    
2.  `UserA` 初始化名为 `Presence` 的 `FUserPresence` 结构体。请注意，我们使用的是上述在线状态接口提供的两个枚举： `EUserPresenceStatus` 和 `EUserPresenceJoinability` 。
    
    UserAPresence.cpp
    
    ```cpp
     TSharedRef<UE::Online::FUserPresence> Presence = MakeShared<UE::Online::FUserPresence>();
     Presence->AccountId = UserA;
     Presence->Status = UE::Online::EUserPresenceStatus::Online;
     Presence->Joinability = UE::Online::EUserPresenceJoinability::Public;
     Presence->RichPresenceString = TEXT("Exploring the Great Citadel");
     Presence->Properties.Add(TEXT("advanced_class"), TEXT("advanced_class_assassin"));
    ```
    
3.  `UserA` 初始化名为 `Params` 的 `FUpdatePresence::Params` 结构体，其参数将传递给 `UpdatePresence` ：
    
    UserAPresence.cpp
    
    ```cpp
     UE::Online::FUpdatePresence::Params Params;
     Params.LocalAccountId = AccountId;
     Params.Presence = Presence;
    ```
    
4.  `UserA` 调用 `UpdatePresence` 并通过 `OnComplete` 回调处理结果：
    
    UserAPresence.cpp
    
    ```cpp
     PresenceInterface->UpdatePresence(MoveTemp(Params))
     .OnComplete([](const UE::Online::TOnlineResult<UE::Online::FUpdatePresence> Result)
     {
         if(Result.IsOk())
         {
             // 我们成功了 - UserB现在可以查询在线状态
         }
         else
         {
             // 我们失败了 - 检查Result.GetErrorValue();中的错误状态
         }
     });
    ```
    
5.  `UserB` 查询 `UserA` 的在线状态。在查询的 `OnComplete` 回调内，`UserB` 首先检查以确保 `QueryPresence` 返回的是 "Ok" 状态。若是，则 `UserB` 可以安全地检索 `UserA` 的在线状态，并相应地处理 `GetPresence` 的结果或错误：
    
    UserBPresence.cpp
    
    ```cpp
     PresenceInterface->QueryPresence({UserA})
     .OnComplete([](const UE::Online::TOnlineResult<UE::Online::FQueryPresence> Result)
     {
         if(Result.IsOk())
         {
             // 我们成功了 - 现在使用GetPresence实际查看在线状态对象
    
             UE::Online::TOnlineResult<UE::Online::FGetPresence> GetPresenceResult = PresenceInterface->GetPresence({UserB});
             if(GetPresenceResult.IsOk())
             {
                 // 我们成功了！
             }
             else
             {
                 // 我们失败了 - 通过GetPresenceResult.GetErrorValue();检查错误状态
             }
    
         }
         else
         {
             // 我们失败了 - 检查Result.GetErrorValue();中的错误状态
         }
     });
    ```
    

如果所有函数调用的返回结果均未出错，则 `UserB` 现在会看到 `UserA` 更新后的状态，并且 `UserB` 可以选择根据该状态做出决定。例如，`UserB` 可以通过访问 `GetPresenceResult` 看到 `UserA` 处于在线状态，并且其可加入性状态为公开。设置此状态后，`UserB` 可以决定加入 `UserA`，与其一起 "探索大城堡"。

## 从在线子系统转换代码

[在线服务](/documentation/zh-cn/unreal-engine/online-services-in-unreal-engine)插件是[在线子系统](/documentation/zh-cn/unreal-engine/online-subsystem-in-unreal-engine)插件的更新版本，在可预见的未来将彼此共存。在线服务在线状态接口的API功能与在线子系统在线状态接口的API功能大致一对一对应。一些注意事项包括：

-   `SetPresence` 已重命名为 `UpdatePresence`，更充分地体现了函数的异步性。
-   `UpdatePresence` 和 `QueryPresence` 不再重载。
-   我们建议改用它们的重命名函数 `PartialUpdatePresence` 和 `BatchQueryPresence` 。
    -   `UpdatePresence` 和 `QueryPresence` 的重载已分别重命名为 `PartialUpdatePresence` 和 `BatchQueryPresence` 。
-   为 `QueryPresence` 指定了 `bListenToChanges` 参数。
    -   这会将特定用户添加到 `OnPresenceUpdated` 事件。
    -   默认情况下，该参数设置为true。

## 更多信息

### 头文件

直接查阅 `Presence.h` 头文件，根据需要了解更多信息。在线状态接口头文件 `Presence.h` 位于以下目录中：

```cpp
Engine\Plugins\Online\OnlineServices\Source\OnlineServicesInterface\Public\Online
```

如需有关如何获取UE源代码的说明，请参阅关于[下载虚幻引擎源代码](/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine)的文档。

### 函数参数和返回类型

请参阅[在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)页面的[函数](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%87%BD%E6%95%B0)小节，了解函数参数和返回类型的说明，包括如何传递参数和处理函数返回时的结果。

-   [social](https://dev.epicgames.com/community/search?query=social)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [presence](https://dev.epicgames.com/community/search?query=presence)
-   [multiplayer](https://dev.epicgames.com/community/search?query=multiplayer)
-   [online services](https://dev.epicgames.com/community/search?query=online%20services)
-   [status](https://dev.epicgames.com/community/search?query=status)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [API 概述](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine#api%E6%A6%82%E8%BF%B0)
-   [函数](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine#%E5%87%BD%E6%95%B0)
-   [枚举类](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine#%E6%9E%9A%E4%B8%BE%E7%B1%BB)
-   [EUserPresenceStatus](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine#euserpresencestatus)
-   [EUserPresenceJoinability](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine#euserpresencejoinability)
-   [EUserPresenceGameStatus](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine#euserpresencegamestatus)
-   [主结构体](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine#%E4%B8%BB%E7%BB%93%E6%9E%84%E4%BD%93)
-   [FUserPresence](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine#fuserpresence)
-   [示例](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine#%E7%A4%BA%E4%BE%8B)
-   [代码](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine#%E4%BB%A3%E7%A0%81)
-   [讲解](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine#%E8%AE%B2%E8%A7%A3)
-   [从在线子系统转换代码](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine#%E4%BB%8E%E5%9C%A8%E7%BA%BF%E5%AD%90%E7%B3%BB%E7%BB%9F%E8%BD%AC%E6%8D%A2%E4%BB%A3%E7%A0%81)
-   [更多信息](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF)
-   [头文件](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine#%E5%A4%B4%E6%96%87%E4%BB%B6)
-   [函数参数和返回类型](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E5%92%8C%E8%BF%94%E5%9B%9E%E7%B1%BB%E5%9E%8B)

相关文档

[

在线子系统在线状态接口

![在线子系统在线状态接口](https://dev.epicgames.com/community/api/documentation/image/a48c3026-b6d0-4641-833f-1b4fd357539c?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/online-subsystem-presence-interface-in-unreal-engine)
# 虚幻引擎中的会话接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:54:22.727Z

---

目录

![会话接口](https://dev.epicgames.com/community/api/documentation/image/547067b3-704f-4345-b406-28cd8102cc49?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**在线服务会话接口（Online Services Session Interface）** 处理在线游戏会话的创建、销毁和管理。**会话** 表示游戏中的在线比赛，在玩家的计算机或专用服务器上运行。会话可以有以下加入策略：

-   **仅限邀请（Invite Only）** ：受到邀请的玩家可以加入会话。
-   **仅限好友（Friends Only）** ：会话成员的好友可以加入会话。
-   **公共（Public）** ：任何人都可以查找并加入会话。

你可以使用充当筛选器的一组属性来定义公共会话，允许玩家搜索特定游戏模式或地图。

## API概述

下表概要说明了会话接口中包含的函数。

**函数**

**说明**

**获取会话**

 

[`GetAllSessions`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/GetAllSessions)

检索用户所属所有会话的引用的数组。

[`GetSessionByName`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/GetSessionByName)

检索带有所提供名称的会话的引用。

[`GetSessionById`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/GetSessionById)

检索带有所提供ID句柄的会话的引用。

**在线状态**

 

[`GetPresenceSession`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/GetPresenceSession)

检索当前设置为用户的在线状态会话的会话的引用。

[`IsPresenceSession`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/IsPresenceSession)

确定带有给定ID的会话是否设置为用户的在线状态会话。

[`SetPresenceSession`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/SetPresenceSession)

将带有给定ID的会话设置为用户的在线状态会话。

[`ClearPresenceSession`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/ClearPresenceSession)

清除用户的在线状态会话。

**会话管理**

 

[`CreateSession`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/CreateSession)

使用提供的参数创建新会话。

[`UpdateSessionSettings`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/UpdateSessionSettings)

更新所提供名称识别的会话的设置。

[`LeaveSession`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/LeaveSession)

离开并可选择销毁所提供名称识别的会话。

[`FindSessions`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/FindSessions)

查询会话服务以查找匹配提供的参数的会话。

[`JoinSession`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/JoinSession)

加入带有提供的会话ID的会话。

[`StartMatchmaking`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/StartMatchmaking)

开始匹配过程。这会搜索并加入匹配给定搜索筛选器的会话，或者，如果找不到这样的会话，将使用提供的参数创建会话。

[`AddSessionMember`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/AddSessionMember)

将用户作为新会话成员添加到提供的名称识别的会话。

[`RemoveSessionMember`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/RemoveSessionMember)

从提供的名称识别的会话中删除用户。

**邀请**

 

[`SendSessionInvite`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/SendSessionInvite)

向所有提供的用户发送进入所提供名称识别的会话的邀请。

[`GetSessionInviteById`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/GetSessionInviteById)

获取所提供邀请ID识别的会话邀请的引用。

[`GetAllSessionInvites`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/GetAllSessionInvites)

获取用户收到的所有会话邀请的引用的数组。

[`RejectSessionInvite`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/RejectSessionInvite)

拒绝所提供邀请ID识别的会话邀请。

**事件监听**

事件将作为以下函数的结果触发：

[`OnSessionJoined`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/OnSessionJoined)

加入会话。

[`OnSessionLeft`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/OnSessionLeft)

离开或销毁会话。

[`OnSessionUpdated`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/OnSessionUpdated)

更新会话的设置，或每次收到会话更新事件时。

[`OnSessionInviteReceived`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/OnSessionInviteReceived)

收到会话邀请。

[`OnUISessionJoinRequested`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ISessions/OnUISessionJoinRequested)

通过平台UI接受会话邀请或加入会话。

## 流程

### 会话生命周期

-   使用所需的设置创建新会话。
-   在会话生命周期的任意时刻，你都可以更新会话，反映它表示的在线比赛的属性更改。这些更改可以包括：
    -   就会话在搜索中的显示方式或它是否显示，改变相应的参数。
    -   游戏开始进行后，禁止新玩家加入会话。
-   发现该会话的玩家可以加入。
-   使用加入会话所获取的信息，新玩家可以连接到会话主机或专用服务器。
    -   连接之后，玩家需要向会话注册。此过程将由未来版本的引擎自动处理。
-   玩游戏。
-   游戏结束后，玩家可以离开会话或销毁会话（如果玩家是所有者或主机）。
-   从主机或服务器断开连接之后，需要从会话注销玩家。此过程将由未来版本的引擎自动处理。

#### 创建

会话生命周期中的第一步是使用所需参数创建会话。这些参数包括在整个会话生命周期保持不变的一些参数（例如 `CreateSession` 函数中的 `bIsLANSession` 和 `bAllowSanctionedPlayers` ）以及你可以随时更新的一些参数（例如函数 `SessionSettings` 提供的选项）。

每个用户最多可以将一个会话设置为 **在线状态会话（Presence Session）** 。这意味着，它将显示在用户的在线状态信息中，并按照在线状态接口所公开的那样显示给好友和粉丝。如果用户是许多会话的成员，可以通过 `SetPresenceSession` 更改哪个会话显示为在线状态会话（此功能可能并非在所有平台实现中都可用）。

#### 发现

用户可以通过几种不同的方式发现新会话：

##### 搜索

利用 `FindSessions` ，用户可以定义搜索参数，例如匹配所需会话的自定义设置的标签，或特定用户ID，以查找其好友所在的会话。这会返回会话ID列表，每个ID表示缓存的会话信息，用户可以使用 `GetSessionById` 搜索和访问这些信息。

##### 邀请

用户可以接收其他用户发送的会话邀请。收到邀请后，用户可以使用 `GetSessionInviteById` 访问邀请，查看有关会话的信息。此后，用户可决定是否使用邀请信息提供的会话ID加入会话。

##### 在线状态

特定平台UI可能会向用户显示有关其好友已加入的会话的信息。

#### 加入

用户通过搜索、邀请或在线状态获取有关会话的信息后，就可以调用 `JoinSession` ，尝试加入会话。他们还可以选择是否要使用 `SetPresenceSession` 将此新会话设置为其在线状态会话。

##### 匹配

你也可以调用 `StartMatchmaking` 来加入会话。此函数相当于组合使用 `CreateSession` 和 `FindSessions` 。`StartMatchmaking` 会查找匹配预定义的一组搜索筛选器的会话，如果找不到，将使用给定信息创建会话。

加入会话后，你可以调用 `IOnlineServices::GetResolvedConnectString` ，这将返回加入比赛所需的特定于平台的连接信息。然后从此函数获取的字符串可以传递给 `APlayerController::ClientTravel` 或 `UWorld::ServerTravel` ，将玩家发送到比赛中。如果行程成功，玩家将添加到会话，并会调用 `AddSessionMember` ，向会话注册玩家。

##### 邀请

加入会话（无论是通过创建会话还是直接加入会话）后，你可以使用 `SendSessionInvite` 将会话信息发送给其他玩家。这很适合用于让好友一起参加同一场在线比赛。玩家收到邀请后，可以访问其信息，即使用 `GetAllSessionInvites` 访问给定用户的所有邀请，或使用 `GetSessionInviteById` 获取有关特定邀请的信息。他们还可以调用 `RejectSessionInvite` 并传递对应邀请ID作为参数，从而拒绝会话邀请。

#### 更新

你可以在会话生命周期的任意时刻调用 `UpdateSessionSettings` 来更新会话设置。这些设置包括但不限于：

-   会话中的最大玩家数量
-   会话的加入策略：
    -   仅限邀请
    -   仅限好友
    -   公共
-   仅限新玩家访问
-   添加、修改或删除自定义设置和用户定义的参数

#### 离开并销毁

你可以调用 `LeaveSession` 来离开会话。会话所有者可以将额外的参数 `bDestroySession` 设置为 `true` ，在离开时从后端服务删除会话。这还会强制会话的所有其他成员离开。

## 示例

你可以通过OnlineServices实例的引用来访问会话接口。会话接口的功能将从此处公开。我们提供了访问会话接口以及执行同步和异步操作的几个示例。

### 按名称获取会话

```cpp
	UE::Online::IOnlineServicesPtr OnlineServices = UE::Online::GetServices();
	UE::Online::ISessionsPtr SessionsInterface = OnlineServices->GetSessionsInterface();
	UE::Online::FGetSessionByName::Params Params;
	Params.SessionName = FName(TEXT("MySession"));

	UE::Online::TOnlineResult<UE::Online::FGetSessionByName> Result = SessionsInterface->GetSessionByName(MoveTemp(Params));
	if(Result.IsOk())
	{
		TSharedRef<const UE::Online::ISession> Session = Result.GetOkValue().Session;
		// 现在我们可以从会话读取信息
	}

```

#### 操作说明

1.  调用 `GetServices` 而不指定参数，以使用默认在线服务：
    
    UE::Online::IOnlineServicesPtr OnlineServices = UE::Online::GetServices();
    
2.  访问默认在线服务的会话接口：
    
    UE::Online::ISessionsPtr SessionsInterface = OnlineServices->GetSessionsInterface();
    
3.  使用必要的参数调用 `GetSessionByName` ，初始化 `FGetSessionByName` 结构体：
    
    UE::Online::FGetSessionByName::Params Params; Params.SessionName = FName(TEXT("MySession"));
    
4.  调用 `GetSessionByName` ，传入上一步的参数，并保存结果：
    
    ```cpp
             UE::Online::TOnlineResult<UE::Online::FGetSessionByName> Result = SessionsInterface->GetSessionByName(MoveTemp(Params));
    		
    ```
    
5.  确保函数调用不会抛出错误并且结果可以访问之后，处理调用 `GetSessionByName` 的结果：
    
    ```cpp
             if(Result.IsOk())
             {
                 TSharedRef<const UE::Online::ISession> Session = Result.GetOkValue().Session;
                 // 现在我们可以从会话读取信息
             }
    		
    ```
    

### 更新会话设置

```cpp
	UE::Online::IOnlineServicesPtr OnlineServices = UE::Online::GetServices();
	UE::Online::ISessionsPtr SessionsInterface = OnlineServices->GetSessionsInterface();

	UE::Online::FUpdateSessionSettings::Params Params;
	Params.LocalAccountId = AccountId;
	Params.SessionName = FName(TEXT("MySession"));
	Params.Mutations.bAllowNewMembers = false;

	SessionsInterface->UpdateSessionSettings(MoveTemp(Params))
	.OnComplete([this](const UE::Online::TOnlineResult<UE::Online::FUpdateSessionSettings>& Result)
	{
		if(Result.IsError())
		{
			const UE::Online::FOnlineError OnlineError = Result.GetErrorValue();
			// 更新不成功，处理OnlineError
			return;
		}
		// 更新成功
	});

```

#### 操作说明

1.  调用 `GetServices` 而不指定参数，以使用默认在线服务，并访问默认在线服务的会话接口：
    
    ```cpp
             UE::Online::IOnlineServicesPtr OnlineServices = UE::Online::GetServices();
             UE::Online::ISessionsPtr SessionsInterface = OnlineServices->GetSessionsInterface();
    		
    ```
    
2.  使用必要的参数调用 `UpdateSessionSettings` ，初始化结构体：
    
    ```cpp
             UE::Online::FUpdateSessionSettings::Params Params;
             Params.LocalAccountId = AccountId;
             Params.SessionName = FName(TEXT("MySession"));
             Params.Mutations.bAllowNewMembers = false;
    		
    ```
    
3.  处理 `UpdateSessionSettings.OnComplete` 回调，在它生成错误时处理错误或查询的统计数据，或在它使用lambda函数返回正常时处理结果：
    
    ```cpp
             SessionsInterface->UpdateSessionSettings(MoveTemp(Params))
             .OnComplete([this](const UE::Online::TOnlineResult<UE::Online::FUpdateSessionSettings>& Result)
             {
                 if(Result.IsError())
                 {
                     const UE::Online::FOnlineError OnlineError = Result.GetErrorValue();
                     // 更新不成功，处理OnlineError
                     return;
                 }
                 // 更新成功
             });
    		
    ```
    

## 从在线子系统转换代码

在线服务会话接口负责[在线子系统会话接口](/documentation/zh-cn/unreal-engine/online-subsystem-session-interface-in-unreal-engine)拥有的所有代码。

## 更多信息

### 头文件

直接查阅 `Sessions.h` 头文件，根据需要了解更多信息。会话接口头文件 `Sessions.h` 位于以下目录中：

```cpp
	UNREAL_ENGINE_ROOT\Engine\Plugins\Online\OnlineServices\Source\OnlineServicesInterface\Public\Online

```

如需有关如何获取UE源代码的说明，请参阅关于[下载虚幻引擎源代码](/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine)的文档。

### 函数参数和返回类型

请参阅[在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)页面的[函数](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%87%BD%E6%95%B0)小节，了解函数参数和返回类型的说明，包括如何传递参数和处理函数返回时的结果。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [multiplayer](https://dev.epicgames.com/community/search?query=multiplayer)
-   [online services](https://dev.epicgames.com/community/search?query=online%20services)
-   [sessions](https://dev.epicgames.com/community/search?query=sessions)
-   [invites](https://dev.epicgames.com/community/search?query=invites)
-   [matchmaking](https://dev.epicgames.com/community/search?query=matchmaking)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [API概述](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#api%E6%A6%82%E8%BF%B0)
-   [流程](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E6%B5%81%E7%A8%8B)
-   [会话生命周期](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E4%BC%9A%E8%AF%9D%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
-   [创建](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E5%88%9B%E5%BB%BA)
-   [发现](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E5%8F%91%E7%8E%B0)
-   [搜索](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E6%90%9C%E7%B4%A2)
-   [邀请](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E9%82%80%E8%AF%B7)
-   [在线状态](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E5%9C%A8%E7%BA%BF%E7%8A%B6%E6%80%81)
-   [加入](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E5%8A%A0%E5%85%A5)
-   [匹配](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E5%8C%B9%E9%85%8D)
-   [邀请](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E9%82%80%E8%AF%B7-2)
-   [更新](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E6%9B%B4%E6%96%B0)
-   [离开并销毁](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E7%A6%BB%E5%BC%80%E5%B9%B6%E9%94%80%E6%AF%81)
-   [示例](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E7%A4%BA%E4%BE%8B)
-   [按名称获取会话](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E6%8C%89%E5%90%8D%E7%A7%B0%E8%8E%B7%E5%8F%96%E4%BC%9A%E8%AF%9D)
-   [操作说明](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E6%93%8D%E4%BD%9C%E8%AF%B4%E6%98%8E)
-   [更新会话设置](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E6%9B%B4%E6%96%B0%E4%BC%9A%E8%AF%9D%E8%AE%BE%E7%BD%AE)
-   [操作说明](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E6%93%8D%E4%BD%9C%E8%AF%B4%E6%98%8E-2)
-   [从在线子系统转换代码](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E4%BB%8E%E5%9C%A8%E7%BA%BF%E5%AD%90%E7%B3%BB%E7%BB%9F%E8%BD%AC%E6%8D%A2%E4%BB%A3%E7%A0%81)
-   [更多信息](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF)
-   [头文件](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E5%A4%B4%E6%96%87%E4%BB%B6)
-   [函数参数和返回类型](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E5%92%8C%E8%BF%94%E5%9B%9E%E7%B1%BB%E5%9E%8B)

相关文档

[

会话接口

![会话接口](https://dev.epicgames.com/community/api/documentation/image/fa53e796-5c9f-4464-919c-5ec25dafeb66?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/online-subsystem-session-interface-in-unreal-engine)
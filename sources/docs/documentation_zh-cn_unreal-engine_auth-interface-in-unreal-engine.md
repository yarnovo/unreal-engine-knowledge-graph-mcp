# 虚幻引擎中的身份验证接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:54:07.028Z

---

目录

![身份验证接口](https://dev.epicgames.com/community/api/documentation/image/c42e62dd-1286-466c-a378-097aeaa4bb1e?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**在线服务身份验证接口（Online Services Auth Interface）** 提供了一个API，用于向在线服务验证和核实本地用户的身份。本地用户的身份验证会返回账号ID，您的项目可将其用于与其他许多在线服务功能交互。

## API 概述

### 函数

下表概括说明了身份验证接口中包含的函数。

**函数**

**说明**

[`Login`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAuth/Login)

验证本地用户的身份。

[`Logout`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAuth/Logout)

结束本地用户的身份验证会话。

[`ModifyAccountAttributes`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAuth/ModifyAccountAttributes)

在账号通过了身份验证之后，修改与该账号关联的属性。

[`QueryExternalServerAuthTicket`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAuth/QueryExternalServerAuthTicket)

查询工单，代表已登录用户执行服务器到服务器的调用。工单旨在用于单一用途。若在需要工单的地方重复调用，用户必须再次调用API以检索新工单。

[`QueryExternalAuthToken`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAuth/QueryExternalAuthToken)

检索令牌，用于将该服务账号与不同服务类型的服务账号关联。

[`QueryVerifiedAuthTicket`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAuth/QueryVerifiedAuthTicket)

检索工单，用于在远程客户端创建身份经过身份核实的会话。

[`CancelVerifiedAuthTicket`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAuth/CancelVerifiedAuthTicket)

取消与已核实身份验证会话关联的工单，并清除与工单关联的所有资源。

**会话（Session）**

 

[`BeginVerifiedAuthSession`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAuth/BeginVerifiedAuthSession)

为远程用户开始已核实的身份验证会话。

[`EndVerifiedAuthSession`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAuth/EndVerifiedAuthSession)

清除已核实的远程身份验证会话和所有关联的资源。

**获取用户（Get Users）**

 

[`GetLocalOnlineUserByOnlineAccountId`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAuth/GetLocalOnlineUs-)

使用在线账号ID检索已登录用户账号。

[`GetLocalOnlineUserByPlatformUserId`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAuth/GetLocalOnlineUs-_1)

使用平台用户ID检索已登录用户账号。

[`GetAllLocalOnlineUsers`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAuth/GetAllLocalOnlineUsers)

检索所有已登录用户账号。

**事件监听**

 

[`OnLoginStatusChanged`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAuth/OnLoginStatusChanged)

事件因用户登录状态发生变化而触发。

[`OnPendingAuthExpiration`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAuth/OnPendingAuthExpiration)

事件因身份验证令牌即将到期而触发。

[`OnAccountAttributesChanged`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAuth/OnAccountAttributesChanged)

账号通过了身份验证之后，与账号关联的其他属性发生了变化，事件因而触发。

**帮助程序（Helper）**

 

[`IsLoggedIn`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAuth/IsLoggedIn)

查询本地用户的登录状态。

### 枚举类

身份验证接口定义了三个枚举类，表示用户的登录状态、身份验证工单受众和身份验证令牌方法。

#### ELoginStatus

**枚举器**

**说明**

`NotLoggedIn`

玩家未登录，或选择了本地配置文件。

`UsingLocalProfile`

玩家使用的是本地配置文件，但未登录。

`LoggedInReducedFunctionality`

玩家已登录，但可能对在线服务拥有更少的功能。

`LoggedIn`

玩家已登录，并已由特定于平台的身份验证服务验证。

#### ERemoteAuthTicketAudience

**枚举器**

**说明**

`Peer`

生成适合对等端验证的工单。

`DedicatedServer`

生成适合专用服务器验证的工单。

#### EExternalAuthTokenMethod

**枚举器**

**说明**

`Primary`

使用身份验证接口提供的主要方法获取外部身份验证令牌。

`Secondary`

使用身份验证接口提供的备用方法获取外部身份验证令牌。

### 主结构体

#### FAccountInfo

**成员**

**类型**

**说明**

`AccountId`

`FAccountId`

此用户的账号ID。这表示用户的在线平台账号。

`PlatformUserId`

`FPlatformUserId`

与此在线用户关联的平台用户ID。

`LoginStatus`

`ELoginStatus`

此当前用户的登录状态。

`Attributes`

`TMap<FSchemaAttributeId, FSchemaVariant>`

其他账号属性。

## 流程

### 登录

`Login` 使用所选在线服务验证本地用户的身份。成功后， `Login` 将返回 `FAccountInfo` 结构体。`FAccountInfo` 结构体包含 `FAccountId` ，这样才能使用身份验证接口中的许多其他函数。登录成功后，还会将用户的 `LoginStatus` 设置为 `ELoginStatus::LoggedIn` 。用户登录账号后，状态可能在未来因为其他条件而更改为 `ELoginStatus::UsingLocalProfile` 或 `ELoginStatus::LoggedInReducedFunctionality` 。

如果有多个本地用户需要登录，每个用户都必须单独登录。此外，平台服务可能不需要显式登录。在这些服务上，用户会在应用程序启动时隐式登录。请参见特定平台服务文档了解详情。

### 使用外部服务器验证身份

游戏常常有自定义 Web 服务，可提供特定于游戏的功能。这些服务需要先核实调用者的身份，然后再提供访问权限。`QueryExternalServerAuthTicket` 将检索单一用途工单，用于使用外部服务器验证用户的身份。

#### 将通过了身份验证的用户与其他在线服务关联

许多游戏需要利用多个在线服务。常见情况包括一个平台服务搭配另一个服务，从而扩展前者的功能。`QueryExternalAuthToken` 将返回一个合适的令牌，以便使用不同在线服务验证身份，这样用户就不必为次要服务提供单独的登录凭证。

在大部分平台上，此令牌是OpenID令牌，可保证用户身份的真实性。接着，游戏会将此令牌提供给次要服务的登录方法，具体做法是将 `CredentialsType` 设置为 `ExternalAuth` 并将令牌作为 `CredentialsToken` 传递。

#### 使用P2P或专用服务器核实用户身份

用户在连接到游戏服务器或点对点网络时，需要证明其身份，并允许身份验证会话跟踪。在客户端， `QueryVerifiedAuthTicket` 会检索要发送到游戏服务器的单一用途工单，用于证明用户的身份。`CancelVerifiedAuthTicket` 会在游戏服务器上的运行会话结束时取消此工单。

由于通过调用 `QueryVerifiedAuthTicket` 获取的工单是单一用途工单，每次用户开始新的已核实身份验证会话时必须调用 `QueryVerifiedAuthTicket` 。相同逻辑适用于 `CancelVerifiedAuthTicket` 。必须为用户创建的每个工单调用 `CancelVerifiedAuthTicket` 。

客户端连接时，游戏服务器会使用客户端提供的工单调用 `BeginVerifiedAuthSession` 。成功完成后，对于关联了该工单的用户，将开始已核实身份验证会话。`EndVerifiedAuthSession` 会在游戏结束时清除关联的资源。

用户客户端连接到远程游戏服务器的这一过程概括如下：

-   客户端通过调用 `QueryVerifiedAuthTicket` ，获取会话身份验证工单。
-   客户端向服务器发送会话身份验证工单、工单ID及其账号ID。
-   服务器将接收此信息，并通过调用 `BeginVerifiedAuthSession` 来使用该信息开始已核实身份验证会话。
-   在会话结束时，客户端会使用 `CancelVerifiedAuthTicket` 取消其身份验证工单，服务器会使用 `EndVerifiedAuthSession` 结束身份验证会话。

在点对点网络模型中，以上过程有所不同。每个用户客户端会为它连接到的每个远程客户端创建新的身份验证工单。使用游戏服务器验证身份的步骤适用于每个远程对等端：

-   每个新远程对等端会调用 `QueryVerifiedAuthTicket` 并检索单一用途工单，以对每个其他现有对等端验证身份。
-   每个现有对等端会调用 `BeginVerifiedAuthSession` ，为新的远程对等端开始已核实身份验证会话。

并非所有接口实现都有点对点支持。请参见你的平台服务文档了解详情。

### 修改账号属性

游戏代码可以根据需要调用 `ModifyAccountAttributes` ，将更多自定义属性存储在 `FAccountInfo` 结构体中。

修改后的属性会在用户的数据中持久保存，直到调用 `Logout` 为止。身份验证会话结束后，这些属性不再持久保存。`Logout` 会销毁用户的 `FAccountInfo` 结构体，而该结构体中包含了这些属性。

### 注销

`Logout` 会为本地用户结束当前身份验证会话，并清除关联的资源和结构。

## 示例

### 登录平台服务

```cpp
	UE::Online::IOnlineServicesPtr OnlineServices = UE::Online::GetServices();
	UE::Online::IAuthPtr AuthInterface = OnlineServices->GetAuthInterface();

	UE::Online::FAuthLogin::Params Params;
	Params.PlatformUserId = PlatformUserId;
	Params.CredentialsType = LoginCredentialsType::ExchangeCode;
	Params.CredentialsToken = TEXT("1234567890"); // 交换命令行中的代码

	AuthInterface->Login(MoveTemp(Params)).OnComplete([](const UE::Online::TOnlineResult<UE::Online::FAuthLogin>& Result)
	{
		if(Result.IsOk())
		{
			const TSharedRef<UE::Online::FAccountInfo> AccountInfo = Result.GetOkValue().AccountInfo;
			// AccountInfo对象现在可访问
		}
		else
		{
			FOnlineError Error = Result.GetErrorValue();
			// 错误现在可以处理
		}
	});

```

#### 操作说明

1.  通过不带参数调用 `GetServices` 来检索默认在线服务，然后访问身份验证接口：
    
    ```cpp
             UE::Online::IOnlineServicesPtr OnlineServices = UE::Online::GetServices();
             UE::Online::IAuthPtr AuthInterface = OnlineServices->GetAuthInterface();
    		
    ```
    
2.  实例化使用户登录所必需的参数。
    
    ```cpp
             UE::Online::FAuthLogin::Params Params;
             Params.PlatformUserId = PlatformUserId;
             Params.CredentialsType = LoginCredentialsType::ExchangeCode;
             Params.CredentialsToken = TEXT("1234567890"); // 交换命令行中的代码
    		
    ```
    
3.  通过在成功登录时注册账号息，或处理生成的错误，处理 `Login.OnComplete` 回调：
    
    ```cpp
             AuthInterface->Login(MoveTemp(Params)).OnComplete([](const UE::Online::TOnlineResult<UE::Online::FAuthLogin>& Result)
             {
                 if(Result.IsOk())
                 {
                     const TSharedRef<UE::Online::FAccountInfo> AccountInfo = Result.GetOkValue().AccountInfo;
                     // AccountInfo对象现在可访问
                 }
                 else
                 {
                     FOnlineError Error = Result.GetErrorValue();
                     // 错误现在可以处理
                 }
             });
    		
    ```
    

## 从在线子系统转换代码

在线服务身份验证接口负责[在线子系统身份接口](/documentation/zh-cn/unreal-engine/online-subsystem-identity-interface-in-unreal-engine)拥有的所有代码。

## 更多信息

### 头文件

直接查阅 `Auth.h` 头文件，根据需要了解更多信息。身份验证接口头文件 `Auth.h` 位于以下目录中：

```cpp
	UNREAL_ENGINE_ROOT\Engine\Plugins\Online\OnlineServices\Source\OnlineServicesInterface\Public\Online

```

如需有关如何获取UE源代码的说明，请参见关于[下载虚幻引擎源代码](/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine)的文档。

### 函数参数和返回类型

请参见[在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)页面的[函数](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%87%BD%E6%95%B0)小节，了解函数参数和返回类型的说明，包括如何传递参数和处理函数返回时的结果。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [online services](https://dev.epicgames.com/community/search?query=online%20services)
-   [auth](https://dev.epicgames.com/community/search?query=auth)
-   [authentication](https://dev.epicgames.com/community/search?query=authentication)
-   [session](https://dev.epicgames.com/community/search?query=session)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [API 概述](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#api%E6%A6%82%E8%BF%B0)
-   [函数](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#%E5%87%BD%E6%95%B0)
-   [枚举类](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#%E6%9E%9A%E4%B8%BE%E7%B1%BB)
-   [ELoginStatus](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#eloginstatus)
-   [ERemoteAuthTicketAudience](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#eremoteauthticketaudience)
-   [EExternalAuthTokenMethod](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#eexternalauthtokenmethod)
-   [主结构体](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#%E4%B8%BB%E7%BB%93%E6%9E%84%E4%BD%93)
-   [FAccountInfo](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#faccountinfo)
-   [流程](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#%E6%B5%81%E7%A8%8B)
-   [登录](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#%E7%99%BB%E5%BD%95)
-   [使用外部服务器验证身份](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%A4%96%E9%83%A8%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%AA%8C%E8%AF%81%E8%BA%AB%E4%BB%BD)
-   [将通过了身份验证的用户与其他在线服务关联](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#%E5%B0%86%E9%80%9A%E8%BF%87%E4%BA%86%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81%E7%9A%84%E7%94%A8%E6%88%B7%E4%B8%8E%E5%85%B6%E4%BB%96%E5%9C%A8%E7%BA%BF%E6%9C%8D%E5%8A%A1%E5%85%B3%E8%81%94)
-   [使用P2P或专用服务器核实用户身份](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#%E4%BD%BF%E7%94%A8p2p%E6%88%96%E4%B8%93%E7%94%A8%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%A0%B8%E5%AE%9E%E7%94%A8%E6%88%B7%E8%BA%AB%E4%BB%BD)
-   [修改账号属性](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#%E4%BF%AE%E6%94%B9%E8%B4%A6%E5%8F%B7%E5%B1%9E%E6%80%A7)
-   [注销](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#%E6%B3%A8%E9%94%80)
-   [示例](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#%E7%A4%BA%E4%BE%8B)
-   [登录平台服务](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#%E7%99%BB%E5%BD%95%E5%B9%B3%E5%8F%B0%E6%9C%8D%E5%8A%A1)
-   [操作说明](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#%E6%93%8D%E4%BD%9C%E8%AF%B4%E6%98%8E)
-   [从在线子系统转换代码](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#%E4%BB%8E%E5%9C%A8%E7%BA%BF%E5%AD%90%E7%B3%BB%E7%BB%9F%E8%BD%AC%E6%8D%A2%E4%BB%A3%E7%A0%81)
-   [更多信息](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF)
-   [头文件](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#%E5%A4%B4%E6%96%87%E4%BB%B6)
-   [函数参数和返回类型](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E5%92%8C%E8%BF%94%E5%9B%9E%E7%B1%BB%E5%9E%8B)

相关文档

[

身份接口

![身份接口](https://dev.epicgames.com/community/api/documentation/image/270deef7-197b-4136-8b58-defebd0e64a3?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/online-subsystem-identity-interface-in-unreal-engine)
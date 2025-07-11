# 虚幻引擎在线子系统身份接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/online-subsystem-identity-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:55:15.402Z

---

目录

![身份接口](https://dev.epicgames.com/community/api/documentation/image/fdecfc4c-2229-4234-a589-f10cd9bc474e?resizing_type=fill&width=1920&height=335)

连接到游戏会话并通过互联网与其他玩家进行交互通常需要登录一个在第三方在线服务上注册的账户。 这些服务可被社交媒体站点、硬件平台拥有者或游戏服务运行。 在虚幻引擎中，**身份接口** 负责处理与这些服务账户相关的交互，并提供验证使用者以及获取访问令牌的功能。

## 验证函数

### 登录

`Login` 函数获取本地玩家的账户登录信息（`FOnlineAccountCredentials`）并尝试登入在线服务。 如需自动生成账户登录信息（或通过命令行参数生成），可转而调用 `AutoLogin`。 在线服务响应后，无论登录尝试成功与否，`FOnLoginCompleteDelegate` 均会被调用。 此外，特定本地玩家的登录状态改变时均会调用 `FOnLoginStatusChangedDelegate`。

每个本地使用者均单独登入。 这在拥有本地多人模式的游戏中尤为重要，玩家可使用自己单独的账户名进行在线对战、获得排行榜积分、邀请好友和解锁成就。

如对 `Login` 的调用失败，[外部UI接口](/documentation/zh-cn/unreal-engine/online-subsystem-external-ui-interface-in-unreal-engine)能够让使用者通过在线服务的内置用户界面手动登入。 并非所有在线平台均会将 `FOnlineAccountCredentials` 用作其验证进程的一部分，在部分情况下，内置用户界面将是唯一支持的登入方式。

### 登出

如需让用户登出在线服务，则使用 `Logout` 函数。 操作完成后将调用 `FOnLogoutCompleteDelegate`。 此外，特定本地用户的登录状态发生变化时将调用 `FOnLoginStatusChangedDelegate`。

### 检查当前登录状态

本地玩家可以登入在线、登入本地配置（但未在线），或完全不登入。 为找到玩家当前的状态，请使用 `GetLoginStatus` 函数。 登入状态基于与在线服务最近的通信而定，因此没有要绑定的委托。 如果正在等待特定状态发生变化（如玩家登入），则请勿定期轮询此函数，绑定 `FOnLoginStatusChangedDelegate` 将有所帮助。

在部分系统上，用户可将物理输入设备重新指定到不同的玩家，这将改变虚幻引擎中的本地玩家索引值。 这能切换已登入使用者的本地使用者索引值，而不会实际改变任何使用者的登录状态。 在此情况下将调用 `OnControllerPairingChanged` 委托，提供相关用户的控制器索引和 `FUniqueNetId` 值。

## 玩家身份与信息

### 在身份系统之间转换

在虚幻引擎的网络连接环境中，登录尝试成功后一个不透明的 `FUniqueNetId` 值将自动与一个本地玩家关联。 除在虚幻引擎4的网络连接代码中使用外，其也将作为每种在线服务专属身份数据类型的抽象物。

如果需要复制使用者的 `FUniqueNetId`，[`FUniqueNetIdRepl`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/FUniqueNetIdRepl)提供了一种 `ToString` 方法，其把 `FUniqueNetId` 转换为能安全复制的字符串，然后其可被 `CreateUniquePlayerId` 转换回来。

身份接口拥有数个函数，可在各种系统和身份类型之间进行连接。 获取玩家 `FUniqueNetId` 的方法有两种：随该玩家的服务专属身份调用 `CreateUniquePlayerId`，或随玩家的本地使用者索引调用 `GetUniquePlayerId`。 使用玩家的 `FUniqueNetId` 调用 `GetPlatformUserIdFromUniqueNetId` 来获取玩家服务专属的身份（类型为 `FPlatformUserId`），但这在多数情况下均不需要。 所有这些函数均使用本地可用的信息，因此不涉及委托或回调。

`GetSponsorUniquePlayerId` 将返回发起玩家的 `FUniqueNetId`，但此函数只针对Xbox Live服务实现。

### 使用者账户信息

抽象类 `FOnlineUser` 代表任意在线子系统相关用户账户的基础信息，并用作访问本地或远程使用者公开可见信息的通用接口。 借助此类的延展 `FUserOnlineAccount` 能够访问本地已登入使用者的所有可用信息。

在部分情况下，可对在线系统的 `FOnlineUser` 子类进行延展，满足特定在线服务的需求。 基类支持返回用户 `FUniqueNetId`、真实和显示名称（基于所使用的在线服务），以及可能与使用者相关的所有基于字符串的属性。但这些属性的保存必须在子类中实现。

`FUserOnlineAccount` 类同样为抽象，但她将建立一个框架，设置使用者属性并保存本地已登入使用者的元数据（包括服务专属访问令牌或其他数据）。 部分子系统使用这些令牌来访问功能，可将其用于进行RESTful调用，或与自有的后端服务进行协调。

### 获取本地已知账户

多种在线服务均能追踪从本地机上登入（或在本地机上创建）的使用者账户。 对执行此操作的本地服务而言，实现 `GetAllUserAccounts` 函数将返回这些所有已知账户的排列列表。 这些账户将被返回为 `FUserOnlineAccount` 数据。 如需查看特定玩家是否在列表上，可调用 `GetUserAccount` 将玩家 `FUniqueNetId` 映射到一个已知的 `FUserOnlineAccount`（如列表中存在）。

### 玩家显示名

部分在线服务允许使用者输入与其账户登录名不同的"显示名"或"昵称"。 在游戏聊天、计分板、角色标签或相似的使用者显示中，此名称的使用优先级高于账户名。 使用玩家的 `FOnlineUser`，调用 `GetDisplayName` 从本地缓存的用户账户数据中获取该玩家的显示名或昵称。

### 使用者权限

在线服务可用作一个门户，同意或阻止对特定在线功能的访问，而其最重要的功能便是让在线使用者进行在线游戏。 `GetUserPrivilege` 函数将报告一个使用者是否拥有特定权限（在[`EUserPrivileges`](/documentation/en-us/unreal-engine/API/Plugins/OnlineSubsystem/Interfaces/EUserPrivileges__Type)中定义）。 此函数需要连接在线服务，将通过 `FOnGetUserPrivilegeCompleteDelegate` 响应使用者请求，返回一个[`EPrivilegeResults`](/documentation/en-us/unreal-engine/API/Plugins/OnlineSubsystem/Interfaces/IOnlineIdentity/EPrivilegeResults)类型的结果。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [online subsystem](https://dev.epicgames.com/community/search?query=online%20subsystem)
-   [online](https://dev.epicgames.com/community/search?query=online)
-   [identity](https://dev.epicgames.com/community/search?query=identity)
-   [login](https://dev.epicgames.com/community/search?query=login)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [验证函数](/documentation/zh-cn/unreal-engine/online-subsystem-identity-interface-in-unreal-engine#%E9%AA%8C%E8%AF%81%E5%87%BD%E6%95%B0)
-   [登录](/documentation/zh-cn/unreal-engine/online-subsystem-identity-interface-in-unreal-engine#%E7%99%BB%E5%BD%95)
-   [登出](/documentation/zh-cn/unreal-engine/online-subsystem-identity-interface-in-unreal-engine#%E7%99%BB%E5%87%BA)
-   [检查当前登录状态](/documentation/zh-cn/unreal-engine/online-subsystem-identity-interface-in-unreal-engine#%E6%A3%80%E6%9F%A5%E5%BD%93%E5%89%8D%E7%99%BB%E5%BD%95%E7%8A%B6%E6%80%81)
-   [玩家身份与信息](/documentation/zh-cn/unreal-engine/online-subsystem-identity-interface-in-unreal-engine#%E7%8E%A9%E5%AE%B6%E8%BA%AB%E4%BB%BD%E4%B8%8E%E4%BF%A1%E6%81%AF)
-   [在身份系统之间转换](/documentation/zh-cn/unreal-engine/online-subsystem-identity-interface-in-unreal-engine#%E5%9C%A8%E8%BA%AB%E4%BB%BD%E7%B3%BB%E7%BB%9F%E4%B9%8B%E9%97%B4%E8%BD%AC%E6%8D%A2)
-   [使用者账户信息](/documentation/zh-cn/unreal-engine/online-subsystem-identity-interface-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%80%85%E8%B4%A6%E6%88%B7%E4%BF%A1%E6%81%AF)
-   [获取本地已知账户](/documentation/zh-cn/unreal-engine/online-subsystem-identity-interface-in-unreal-engine#%E8%8E%B7%E5%8F%96%E6%9C%AC%E5%9C%B0%E5%B7%B2%E7%9F%A5%E8%B4%A6%E6%88%B7)
-   [玩家显示名](/documentation/zh-cn/unreal-engine/online-subsystem-identity-interface-in-unreal-engine#%E7%8E%A9%E5%AE%B6%E6%98%BE%E7%A4%BA%E5%90%8D)
-   [使用者权限](/documentation/zh-cn/unreal-engine/online-subsystem-identity-interface-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%80%85%E6%9D%83%E9%99%90)
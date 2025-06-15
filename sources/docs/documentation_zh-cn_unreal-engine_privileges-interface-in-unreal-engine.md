# 虚幻引擎中的权限接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/privileges-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:54:15.766Z

---

目录

![权限接口](https://dev.epicgames.com/community/api/documentation/image/eabd1b7a-637e-4119-b53f-14873a89ab16?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**在线服务权限接口（Online Services Privileges Interface）** 管理玩家的在线权限。权限指的是玩家执行以下操作的能力：

-   在线玩游戏。
-   参与跨平台游戏。
-   与其他玩家通信。
-   使用社区生成的内容。

## API 概述

### 函数

下表概述了权限接口提供的函数：

**函数**

**说明**

[`QueryUserPrivilege`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IPrivileges/QueryUserPrivilege)

为提供的用户查询给定[权限](/documentation/zh-cn/unreal-engine/privileges-interface-in-unreal-engine#euserprivileges)。

### 枚举类

权限接口通过两个枚举类传达用户权限和用户权限状态，而权限状态由 `EPrivilegeResults` 提供。

#### EUserPrivileges

用户权限由 [`EUserPrivileges`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/UE__Online__EUserPrivileges) 枚举类表示：

**值**

**说明**

`CanPlay`

指定用户是否可以玩游戏，无论在线或离线。

`CanPlayOnline`

指定用户是否可以通过在线模式玩游戏。

`CanCommunicateViaTextOnline`

指定用户是否可以使用文本聊天。

`CanCommunicateViaVoiceOnline`

指定用户是否可以使用语音聊天。

`CanUseUserGeneratedContent`

指定用户是否可以使用其他用户生成的内容。

`CanCrossPlay`

指定用户是否可以参与跨平台游戏。

#### EPrivilegeResults

用户权限状态由一个或多个 [`EPrivilegeResults`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/UE__Online__EPrivilegeResults) 提供：

**值**

**说明**

`NoFailures`

用户拥有请求的权限。

`RequiredPatchAvailable`

需要补丁，用户才能使用权限。

`RequiredSystemUpdate`

需要系统更新，用户才能使用权限。

`AgeRestrictionFailure`

权限由于家长控制失败而受限制。

`AccountTypeFailure`

权限需要高级账户。

`UserNotFound`

用户无效。

`UserNotLoggedIn`

用户必须登录才能使用权限。

`ChatRestriction`

用户被禁止聊天。

`UGCRestriction`

用户被禁止访问用户生成的内容（UGC）。

`GenericFailure`

平台因未知原因而故障，并处理其自己的对话。

`OnlinePlayRestricted`

在线游戏被限制。

`NetworkConnectionUnavailable`

检查失败，因为网络不可用。

## 用户权限

调用 `QueryUserPrivilege` ，确定是否允许用户在你的游戏中使用特定在线功能或权限。`QueryUserPrivilege` 需要你提供用户的本地账户ID和相关权限作为参数。`QueryUserPrivilege` 返回的结果指示是否允许你指定的用户获得你指定的权限。如果不允许该用户使用查询的权限，结果包含了具体原因。

不允许用户使用权限的原因可能有多种。因此，结果的结构是 `EPrivilegeResults` 值（表示不允许此用户使用所提供权限的原因）的累积按位或运算。如果允许该用户使用此权限，则查询将返回 `EPrivilegeResults::NoFailures` ，这表示没有什么阻止用户使用所需的权限。

特定权限可以更改何时暂停游戏。请务必在游戏返回活动状态时重新查询用户权限，因为特定游戏选项可能不再可用。

## 更多信息

### 头文件

直接查阅 `Privileges.h` 头文件，根据需要了解更多信息。权限接口头文件 `Privileges.h` 位于以下目录中：

```cpp

	UNREAL_ENGINE_ROOT\Engine\Plugins\Online\OnlineServices\Source\OnlineServicesInterface\Public\Online

```

如需有关如何获取UE源代码的说明，请参阅关于[下载虚幻引擎源代码](/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine)的文档。

### 函数参数和返回类型

请参阅[在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)页面的[函数](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%87%BD%E6%95%B0)小节，了解函数参数和返回类型的说明，包括如何传递参数以及如何处理函数返回时的结果。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [online services](https://dev.epicgames.com/community/search?query=online%20services)
-   [privileges](https://dev.epicgames.com/community/search?query=privileges)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [API 概述](/documentation/zh-cn/unreal-engine/privileges-interface-in-unreal-engine#api%E6%A6%82%E8%BF%B0)
-   [函数](/documentation/zh-cn/unreal-engine/privileges-interface-in-unreal-engine#%E5%87%BD%E6%95%B0)
-   [枚举类](/documentation/zh-cn/unreal-engine/privileges-interface-in-unreal-engine#%E6%9E%9A%E4%B8%BE%E7%B1%BB)
-   [EUserPrivileges](/documentation/zh-cn/unreal-engine/privileges-interface-in-unreal-engine#euserprivileges)
-   [EPrivilegeResults](/documentation/zh-cn/unreal-engine/privileges-interface-in-unreal-engine#eprivilegeresults)
-   [用户权限](/documentation/zh-cn/unreal-engine/privileges-interface-in-unreal-engine#%E7%94%A8%E6%88%B7%E6%9D%83%E9%99%90)
-   [更多信息](/documentation/zh-cn/unreal-engine/privileges-interface-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF)
-   [头文件](/documentation/zh-cn/unreal-engine/privileges-interface-in-unreal-engine#%E5%A4%B4%E6%96%87%E4%BB%B6)
-   [函数参数和返回类型](/documentation/zh-cn/unreal-engine/privileges-interface-in-unreal-engine#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E5%92%8C%E8%BF%94%E5%9B%9E%E7%B1%BB%E5%9E%8B)
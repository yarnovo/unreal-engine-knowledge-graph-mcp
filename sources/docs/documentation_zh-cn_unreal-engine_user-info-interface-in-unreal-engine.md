# 虚幻引擎中的用户信息接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/user-info-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:54:41.542Z

---

目录

![用户信息接口](https://dev.epicgames.com/community/api/documentation/image/38ad65b1-cbb2-404e-896c-1da846cf4f0a?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**在线服务用户信息接口（Online Services User Info Interface）** 为你提供特定工具，供你从Steam或Epic在线服务等在线服务检索用户信息以便在你的游戏中显示。这些信息包括玩家的：

-   平台档案。
-   显示名称。
-   头像。

## API 概述

### 函数

下表概述了用户信息接口提供的函数：

**函数**

**说明**

**用户信息**

 

[`QueryUserInfo`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IUserInfo/QueryUserInfo)

查询用户信息以获取账号ID列表。

[`GetUserInfo`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IUserInfo/GetUserInfo)

检索之前通过 `QueryUserInfo` 缓存的账号ID的用户信息。

**用户头像**

 

[`QueryUserAvatar`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IUserInfo/QueryUserAvatar)

查询用户头像以获取账号ID列表。

[`GetUserAvatar`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IUserInfo/GetUserAvatar)

检索之前通过 `QueryUserAvatar` 缓存的账号ID的用户头像。

**平台UI**

 

[`ShowUserProfile`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IUserInfo/ShowUserProfile)

显示提供的账号ID的档案UI。

## 访问用户信息

通过用户信息接口访问用户信息的工作原理与使用其他[在线服务接口](/documentation/zh-cn/unreal-engine/online-services-interfaces-in-unreal-engine)类似。

`QueryUserInfo` 通过该接口缓存与用户对应的账号ID关联的用户显示名称的列表。`QueryUserInfo` 要求你提供一个列表，其中包含你想以参数形式访问显示名称的用户账号ID。如需访问每个用户的显示名称，请使用其账号ID调用 `GetUserInfo` 。

## 访问用户头像

[访问用户信息](/documentation/zh-cn/unreal-engine/user-info-interface-in-unreal-engine#%E8%AE%BF%E9%97%AE%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF)小节中定义的工作流程也适用于访问用户的头像。`QueryUserAvatar` 通过该接口缓存信息。`GetUserAvatar` 分别检索每个头像。

## 平台用户档案

`ShowUserProfile` 为提供的用户调出平台服务的档案用户界面。平台服务档案是用户当前玩游戏所用平台特有的档案。如需了解有关档案用户界面的更多信息，请参阅你的平台服务的文档。

## 更多信息

### 头文件

直接查阅 `UserInfo.h` 头文件，根据需要了解更多信息。用户信息接口头文件 `UserInfo.h` 位于以下目录中：

```cpp
<UNREAL_ENGINE_ROOT>\Engine\Plugins\Online\OnlineServices\Source\OnlineServicesInterface\Public\Online
```

如需有关如何获取UE源代码的说明，请参阅关于[下载虚幻引擎源代码](/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine)的文档。

### 函数参数和返回类型

请参阅[在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)页面的[函数](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%87%BD%E6%95%B0)小节，了解函数参数和返回类型的说明，包括如何传递参数以及如何处理函数返回时的结果。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [online services](https://dev.epicgames.com/community/search?query=online%20services)
-   [user info](https://dev.epicgames.com/community/search?query=user%20info)
-   [user metadata](https://dev.epicgames.com/community/search?query=user%20metadata)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [API 概述](/documentation/zh-cn/unreal-engine/user-info-interface-in-unreal-engine#api%E6%A6%82%E8%BF%B0)
-   [函数](/documentation/zh-cn/unreal-engine/user-info-interface-in-unreal-engine#%E5%87%BD%E6%95%B0)
-   [访问用户信息](/documentation/zh-cn/unreal-engine/user-info-interface-in-unreal-engine#%E8%AE%BF%E9%97%AE%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF)
-   [访问用户头像](/documentation/zh-cn/unreal-engine/user-info-interface-in-unreal-engine#%E8%AE%BF%E9%97%AE%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F)
-   [平台用户档案](/documentation/zh-cn/unreal-engine/user-info-interface-in-unreal-engine#%E5%B9%B3%E5%8F%B0%E7%94%A8%E6%88%B7%E6%A1%A3%E6%A1%88)
-   [更多信息](/documentation/zh-cn/unreal-engine/user-info-interface-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF)
-   [头文件](/documentation/zh-cn/unreal-engine/user-info-interface-in-unreal-engine#%E5%A4%B4%E6%96%87%E4%BB%B6)
-   [函数参数和返回类型](/documentation/zh-cn/unreal-engine/user-info-interface-in-unreal-engine#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E5%92%8C%E8%BF%94%E5%9B%9E%E7%B1%BB%E5%9E%8B)
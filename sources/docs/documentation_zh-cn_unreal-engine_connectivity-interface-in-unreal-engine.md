# 虚幻引擎中的连接接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/connectivity-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:54:12.904Z

---

目录

![连接接口](https://dev.epicgames.com/community/api/documentation/image/e80e2089-1265-46ea-993a-dbfed8d76e8b?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**在线服务（Online Services）** **连接接口（Connectivity Interface）** 提供了工具来确定你的游戏是否连接到你的平台的后端在线服务。

## API 概述

### 函数

下表概述了连接接口提供的函数：

**函数**

**说明**

[`GetConnectionStatus`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IConnectivity/GetConnectionStatus)

检索提供的在线服务的连接状态。

[`OnConnectionStatusChanged`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IConnectivity/OnConnectionStat-)

在线服务连接状态更改时触发的事件。

### 枚举类

在线服务连接状态由 [`EOnlineServicesConnectionStatus`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/UE__Online__EOnl-) 枚举类表示。

#### EOnlineServicesConnectionStatus

**值**

**说明**

`Connected`

已连接到在线服务。

`NotConnected`

未连接到在线服务。

## 连接状态

`GetConnectionStatus` 将返回所提供的在线服务的当前连接状态。一些在线服务由多个底层微服务构成。使用其中某个微服务的名称作为 `GetConnectionStatus` 的参数，确定特定微服务的连接状态。如果你不指定在线服务参数，仅当所有底层微服务都已连接时， `GetConnectionStatus` 才会返回 `EOnlineServicesConnectionStatus::Connected` 。

你可以将 `OnConnectionStatusChanged` 绑定到事件，以便在某个在线服务或其某个微服务的连接状态更改时通知你。

在线服务的组织及其特定微服务的可访问性因平台而异。请查阅你的平台的在线服务文档，了解更多信息。

## 更多信息

### 头文件

直接查阅 `Connectivity.h` 头文件，根据需要了解更多信息。连接接口头文件 `Connectivity.h` 位于以下目录中：

```cpp
UNREAL_ENGINE_ROOT\Engine\Plugins\Online\OnlineServices\Source\OnlineServicesInterface\Public\Online
```

如需有关如何获取UE源代码的说明，请参阅关于[下载虚幻引擎源代码](/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine)的文档。

### 函数参数和返回类型

请参阅[在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)页面的[函数](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%87%BD%E6%95%B0)小节，了解函数参数和返回类型的说明，包括如何传递参数和处理函数返回时的结果。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [online services](https://dev.epicgames.com/community/search?query=online%20services)
-   [status](https://dev.epicgames.com/community/search?query=status)
-   [connectivity](https://dev.epicgames.com/community/search?query=connectivity)
-   [connection](https://dev.epicgames.com/community/search?query=connection)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [API 概述](/documentation/zh-cn/unreal-engine/connectivity-interface-in-unreal-engine#api%E6%A6%82%E8%BF%B0)
-   [函数](/documentation/zh-cn/unreal-engine/connectivity-interface-in-unreal-engine#%E5%87%BD%E6%95%B0)
-   [枚举类](/documentation/zh-cn/unreal-engine/connectivity-interface-in-unreal-engine#%E6%9E%9A%E4%B8%BE%E7%B1%BB)
-   [EOnlineServicesConnectionStatus](/documentation/zh-cn/unreal-engine/connectivity-interface-in-unreal-engine#eonlineservicesconnectionstatus)
-   [连接状态](/documentation/zh-cn/unreal-engine/connectivity-interface-in-unreal-engine#%E8%BF%9E%E6%8E%A5%E7%8A%B6%E6%80%81)
-   [更多信息](/documentation/zh-cn/unreal-engine/connectivity-interface-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF)
-   [头文件](/documentation/zh-cn/unreal-engine/connectivity-interface-in-unreal-engine#%E5%A4%B4%E6%96%87%E4%BB%B6)
-   [函数参数和返回类型](/documentation/zh-cn/unreal-engine/connectivity-interface-in-unreal-engine#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E5%92%8C%E8%BF%94%E5%9B%9E%E7%B1%BB%E5%9E%8B)
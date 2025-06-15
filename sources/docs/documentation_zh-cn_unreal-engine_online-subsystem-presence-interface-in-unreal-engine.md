# 虚幻引擎在线子系统在线状态接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/online-subsystem-presence-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:55:15.337Z

---

目录

![在线子系统在线状态接口](https://dev.epicgames.com/community/api/documentation/image/dab6fd89-3ea9-4379-9369-59df4c6d211b?resizing_type=fill&width=1920&height=335)

登入在线服务后，使用者通常能看到好友以及其他在线用户的相关信息，例如这些用户是否在线、其正在进行的行为、其是否能够加入比赛等。 在线子系统通过 **使用者状态接口（Presence Interface）** 访问这些功能。

## 使用者状态

多数在线服务均可识别每个使用者的数种基础状态，例如"在线"、"离线"和"离开"，以及游戏特定的状态（如"在大厅中"或"在（地图）上进行一场比赛"）。 然而这些设置并非固定可见，或者因服务特定的隐私政策和账户设置而仅对部分使用者（并非所有）可见。 在线子系统不会与这些政策或设置进行交互，但其获取的信息将受到它们影响。

### 定义使用者状态

[`FOnlineUserPresence`](/documentation/en-us/unreal-engine/API/Plugins/OnlineSubsystem/Interfaces/FOnlineUserPresence)类包含与使用者状态相关的所有信息。 除使用者是否在线、使用者是否正在进行游戏之类的基础信息外，使用者状态（使用[`FOnlineUserPresenceStatus`](/documentation/en-us/unreal-engine/API/Plugins/OnlineSubsystem/Interfaces/FOnlineUserPresenceStatus)类）还保存了更多深入信息。 通常包括要显示的本地化字符串、一个描述使用者基础状态的列举值（类型为[`EOnlinePresenceState`](/documentation/en-us/unreal-engine/API/Plugins/OnlineSubsystem/Interfaces/EOnlinePresenceState__Type)），以及保存任意游戏特定自定义数据的一套键值对（其可在构建准确使用者状态显示消息时使用）。

### 获取其他使用者的相关信息

收集特定用户使用者状态信息的基础流程是通过 `QueryPresence` 对在线服务进行请求，用 `FUniqueNetId` 指定该用户。 该操作完成后，提供的 `FOnPresenceTaskCompleteDelegate` 将被调用，指出用户以及请求成功或失败。 如成功，本地使用者状态信息缓存将包含最新使用者状态信息，其可通过 `GetCachedPresence` 函数获得。

部分在线服务将主动通知在线子服务关于使用者状态的信息。 在这些服务上，虽然并不一定需要调用 `QueryPresence` 或等候其委托，但常规的代码流程应保持不变，使其在多个服务上均可通用。

### 设置使用者状态

`SetPresence` 函数通过在线服务来设置本地使用者的状态。 由于需要验证在线服务的新状态，因此这是一个异步调用，完成时将调用一个类型为 `FOnPresenceTaskCompleteDelegate` 的委托。 使用者状态自身由 `FOnlineUserPresenceStatus` 类进行描述。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [online subsystem](https://dev.epicgames.com/community/search?query=online%20subsystem)
-   [presence](https://dev.epicgames.com/community/search?query=presence)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用者状态](/documentation/zh-cn/unreal-engine/online-subsystem-presence-interface-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%80%85%E7%8A%B6%E6%80%81)
-   [定义使用者状态](/documentation/zh-cn/unreal-engine/online-subsystem-presence-interface-in-unreal-engine#%E5%AE%9A%E4%B9%89%E4%BD%BF%E7%94%A8%E8%80%85%E7%8A%B6%E6%80%81)
-   [获取其他使用者的相关信息](/documentation/zh-cn/unreal-engine/online-subsystem-presence-interface-in-unreal-engine#%E8%8E%B7%E5%8F%96%E5%85%B6%E4%BB%96%E4%BD%BF%E7%94%A8%E8%80%85%E7%9A%84%E7%9B%B8%E5%85%B3%E4%BF%A1%E6%81%AF)
-   [设置使用者状态](/documentation/zh-cn/unreal-engine/online-subsystem-presence-interface-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E4%BD%BF%E7%94%A8%E8%80%85%E7%8A%B6%E6%80%81)
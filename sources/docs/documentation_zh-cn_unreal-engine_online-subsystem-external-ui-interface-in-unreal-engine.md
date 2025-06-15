# 虚幻引擎在线子系统外部UI接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/online-subsystem-external-ui-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:54:43.883Z

---

目录

![在线子系统外部UI接口](https://dev.epicgames.com/community/api/documentation/image/42f2dfaa-d28a-4125-b9ce-fbe22ff48c98?resizing_type=fill&width=1920&height=335)

部分在线服务（尤其是在游戏主机之类的专属设备上运行的服务）内置有标准化用户界面，启动特定操作时便会呼出这些界面。 举例而言，添加好友、发送加入比赛的邀请，或注册信用卡等操作均能呼出游戏专有的表格、覆层、画面或工作流，用户必须进行导航才能访问功能。 这些操作通常都会进行，以确保特定的敏感交互均固定以相同方式处理，并由拥有在线服务的公司所掌控（而非由个体第三方开发者进行掌控）。 每种在线服务的功能各有不同，一些功能只存在于特定的服务或系统上。 为处理这些各不相同的功能，在线子系统将把它们收集起来，并提供 **外部UI接口** 与其进行交互。

## 使用外部用户接口

外部用户界面关闭时将调用外部UI接口特有的诸多委托来通知在线子系统。 此外，其执行的修改可能导致从在线子系统的其他部分（如登陆接口）对委托进行调用。 外部UI接口的给定函数不太可能会在多数在线服务上实现，因此需要特别注意这些函数的返回值。 如返回值为 `false`，则说明当前在线服务上不支持给定的用户函数，或无法打开。 这类失败不会引起委托调用，因为没有要执行的操作。

### 显示消息框

如果需要在平台的内置样式中显示一条消息，则调用 `ShowPlatformMessageBox`。 这通常会显示"系统"消息（与"游戏"消息相反），如通知用户有补丁或其他更新，或提供错误反馈（如尝试在离线时使用仅限多人的功能）。 此操作在完成时不会触发委托。

### 查看用户描述

如需查看用户描述覆层，调用 `ShowProfileUI`（含请求查看描述的用户和拥有描述的用户的 `FUniqueNetId`）。 覆层关闭时，提供的委托（类型为 `FOnProfileUIClosedDelegate`）将被调用。

### 登入

[身份接口](/documentation/zh-cn/unreal-engine/online-subsystem-identity-interface-in-unreal-engine)通常负责处理验证功能，特定平台可能要求执行用户界面流程，或其只是比编写自身的登入用户界面流程更为便利（且更为稳定）。 `ShowLoginUI` 将使用当前在线服务的标准登陆UI（如有）。 用户关闭界面时，将调用提供的委托（类型为 `FOnLoginUIClosedDelegate`）。 对用户登入状态的修改仍将通过身份接口调用委托。

### 使用好友列表

如在线服务包含内置的功能，`ShowFriendsUI` 将呼出好友列表。 如需了解好友列表的更多直接交互，请参见[好友接口](/documentation/zh-cn/unreal-engine/online-subsystem-friends-interface-in-unreal-engine)。 使用者通过外部好友列表UI执行的修改仍将调用正确的好友接口委托。

### 发送邀请

如要显示邀请到游戏会话的好友列表的内置UI，须调用 `ShowInviteUI`（含会话命名）。 如需了解详情，请参阅[会话和配对](/documentation/zh-cn/unreal-engine/online-subsystem-session-interface-in-unreal-engine)页面。

### 向另一个用户发送消息

在提供有"邮箱"功能的服务中，`ShowSendMessageUI` 将打开UI发送消息。 可提供一个类型为 `FOnShowSendMessageUIClosedDelegate` 的委托，消息UI关闭时可以对其进行调用。 提供的 `FShowSendMessageParams` 参数将初始化界面。

### 查看成就

`ShowAchievementsUI` 函数随本地用户的索引调用，将呼出内置界面来查看特定本地用户未解锁的成就，并将其与其他用户进行对比。 要管理用户的成就，使用[成就接口](/documentation/zh-cn/unreal-engine/online-subsystem-achievements-interface-in-unreal-engine)。

### 创建或更新账户

部分在线服务（尤其是主机在线服务）拥有创建和升级账户的功能（无需登陆官网）。 使用 `ShowAccountCreationUI` 和 `ShowAccountUpgradeUI` 来打开这些功能的用户界面。 完成时 `ShowAccountCreationUI` 将调用一个 `FOnAccountCreationUIClosedDelegate`。

### 访问商店

`ShowStoreUI` 将把用户带往在线服务的商店中。 如果在线服务支持，开发者可在一个 `FShowStoreParams` 数据结构中指定类型命名或产品ID，在商店中提供一个供浏览的类型或供查看的特定产品。 商店UI关闭时将调用提供的委托（类型为 `FOnShowStoreUIClosedDelegate`）。

### 访问外部网站

如果游戏将使用者送至一个外部站点，可使用 `ShowWebURL` 在系统的默认浏览器中打开站点，并在游戏确认用户不再需要查看站点时使用 `CloseWebURL` 关闭站点。 站点关闭时（用户关闭或调用 `CloseWebURL` 关闭），提供到 `ShowWebURL` 函数的 `FOnShowWebUrlClosedDelegate` 将被调用。

调用 `ShowWebURL` 时，除指定要打开的URL外还可以指定更多内容。 参见[`FShowWebUrlParams`](https://api.unrealengine.com/INT/API/Plugins/OnlineSubsystem/Interfaces/FShowWebUrlParams/index.html)的API页面了解详细信息。

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用外部用户接口](/documentation/zh-cn/unreal-engine/online-subsystem-external-ui-interface-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%A4%96%E9%83%A8%E7%94%A8%E6%88%B7%E6%8E%A5%E5%8F%A3)
-   [显示消息框](/documentation/zh-cn/unreal-engine/online-subsystem-external-ui-interface-in-unreal-engine#%E6%98%BE%E7%A4%BA%E6%B6%88%E6%81%AF%E6%A1%86)
-   [查看用户描述](/documentation/zh-cn/unreal-engine/online-subsystem-external-ui-interface-in-unreal-engine#%E6%9F%A5%E7%9C%8B%E7%94%A8%E6%88%B7%E6%8F%8F%E8%BF%B0)
-   [登入](/documentation/zh-cn/unreal-engine/online-subsystem-external-ui-interface-in-unreal-engine#%E7%99%BB%E5%85%A5)
-   [使用好友列表](/documentation/zh-cn/unreal-engine/online-subsystem-external-ui-interface-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%A5%BD%E5%8F%8B%E5%88%97%E8%A1%A8)
-   [发送邀请](/documentation/zh-cn/unreal-engine/online-subsystem-external-ui-interface-in-unreal-engine#%E5%8F%91%E9%80%81%E9%82%80%E8%AF%B7)
-   [向另一个用户发送消息](/documentation/zh-cn/unreal-engine/online-subsystem-external-ui-interface-in-unreal-engine#%E5%90%91%E5%8F%A6%E4%B8%80%E4%B8%AA%E7%94%A8%E6%88%B7%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF)
-   [查看成就](/documentation/zh-cn/unreal-engine/online-subsystem-external-ui-interface-in-unreal-engine#%E6%9F%A5%E7%9C%8B%E6%88%90%E5%B0%B1)
-   [创建或更新账户](/documentation/zh-cn/unreal-engine/online-subsystem-external-ui-interface-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%88%96%E6%9B%B4%E6%96%B0%E8%B4%A6%E6%88%B7)
-   [访问商店](/documentation/zh-cn/unreal-engine/online-subsystem-external-ui-interface-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%95%86%E5%BA%97)
-   [访问外部网站](/documentation/zh-cn/unreal-engine/online-subsystem-external-ui-interface-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%A4%96%E9%83%A8%E7%BD%91%E7%AB%99)
# 虚幻引擎中的外部UI接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/external-ui-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:54:18.294Z

---

目录

![在线服务外部UI接口](https://dev.epicgames.com/community/api/documentation/image/0c3f3d35-9376-42c2-b7d9-2d3946a45e7f?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**在线服务外部UI接口（Online Services External UI Interface）** 提供对平台在线服务外部用户接口的访问权限。特定于平台的外部UI适用于以下操作：

-   用户登录
-   好友和社交互动

## API概述

**函数**

**说明**

[`ShowLoginUI`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IExternalUI/ShowLoginUI)

显示默认在线服务的登录UI。

[`ShowFriendsUI`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IExternalUI/ShowFriendsUI)

显示默认在线服务的好友UI。

[`OnExternalUIStatusChanged`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IExternalUI/OnExternalUIStatusChanged)

外部UI状态变更时触发的事件。

仅当你使用的在线服务平台实施支持外部UI接口时，才能成功访问外部UI接口。

## 访问外部UI接口

某些在线服务拥有内置的标准化用户接口，会在执行特定操作时显示。会显示内置UI的操作示例可能包括：

-   登录在线服务
-   将玩家邀请至会话
-   添加好友

这些操作可能会产生一个独立于游戏的表单、覆层、屏幕或工作流程，用户必须浏览这些内容才能访问对应功能。这样做通常是为了确保某些敏感的交互始终以同一方式进行处理，并且由拥有该在线服务的公司控制，而非由个人第三方开发人员控制。这些功能也不是所有在线服务的标准功能，在某些情况下，可能只存在于某个特定的服务或系统上。为了处理这些不同的功能，在线服务插件将收集各种功能，并提供外部UI接口与之交互。

## 更多信息

### 头文件

直接查阅 `ExternalUI.h` 头文件，根据需要了解更多信息。外部UI接口头文件 `ExternalUI.h` 位于以下目录中：

```cpp
Engine\Plugins\Online\OnlineServices\Source\OnlineServicesInterface\Public\Online
```

如需有关如何获取UE源代码的说明，请参阅关于[下载虚幻引擎源代码](/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine)的文档。

### 函数参数和返回类型

请参阅[在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)页面的[函数](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%87%BD%E6%95%B0)小节，了解函数参数和返回类型的说明，包括如何传递参数和处理函数返回时的结果。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [online services](https://dev.epicgames.com/community/search?query=online%20services)
-   [external ui](https://dev.epicgames.com/community/search?query=external%20ui)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [API概述](/documentation/zh-cn/unreal-engine/external-ui-interface-in-unreal-engine#api%E6%A6%82%E8%BF%B0)
-   [访问外部UI接口](/documentation/zh-cn/unreal-engine/external-ui-interface-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%A4%96%E9%83%A8ui%E6%8E%A5%E5%8F%A3)
-   [更多信息](/documentation/zh-cn/unreal-engine/external-ui-interface-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF)
-   [头文件](/documentation/zh-cn/unreal-engine/external-ui-interface-in-unreal-engine#%E5%A4%B4%E6%96%87%E4%BB%B6)
-   [函数参数和返回类型](/documentation/zh-cn/unreal-engine/external-ui-interface-in-unreal-engine#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E5%92%8C%E8%BF%94%E5%9B%9E%E7%B1%BB%E5%9E%8B)

相关文档

[

在线子系统外部UI接口

![在线子系统外部UI接口](https://dev.epicgames.com/community/api/documentation/image/7f2035c0-8ecd-441d-9e84-e1d16ff417e9?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/online-subsystem-external-ui-interface-in-unreal-engine)
# 虚幻引擎在线服务概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:53:35.689Z

---

目录

![在线服务概述](https://dev.epicgames.com/community/api/documentation/image/f2c32d91-58a2-4200-a1e5-6bdebc9ccaf3?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**在线服务（Online Services）** 插件及其接口提供了一种通用方法，可访问Playstation Network、Xbox Live、Epic、Steam等各种在线服务功能。在线服务插件经过精心设计，若开发人员开发的游戏需要在多个平台上发行，或者需要支持多种在线服务，则此插件可确保开发人员唯一需要做的变更就是对所有支持的服务进行配置调整。

## 设计理念

在线服务插件提供服务专用的模块化 **接口（Interface）** ，这些接口按支持的功能分组。有关接口的列表和每个接口支持的功能组，请参阅本页面的[接口](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E6%8E%A5%E5%8F%A3)表。

在线服务插件的设计目的是处理与各种在线服务之间的异步通信。由于网络连接速度波动、服务器延迟和后端服务时间未知，所以与这些系统进行交互所需的时间不可预测。为了克服这些问题，在线服务接口为所有远程操作返回 `TOnlineAsyncOpHandle`，以保证对句柄的 `OnComplete` 事件回调将得到调用。

在支持功能组的在线服务上，都存在相应功能组的接口。如果特定函数不受某一在线服务支持，`OnComplete` 回调将返回 `Errors::NotImplemented`。此功能可以确保开发人员为所有在线服务使用相同代码。

### 事件回调和监听

`OnComplete` 回调提供以下功能：

-   它在请求完成时对其作出响应。
-   它可以查询未完成请求。
-   它使用单一代码路径。

这最后一点很重要，因为它使开发人员不必编写自定义代码来捕获不同的成功或失败条件。

#### 回调格式

根据开发人员为 `OnComplete` 回调（在线服务的事件回调）或事件监听传入参数的方式，系统会自动构建相应的委托。在下例中，将根据 `this` 的类型，使用Stats接口的 `QueryStats` 函数，调用不同的委托创建函数：

```cpp
Stats->QueryStats(MoveTemp(Params)).OnComplete(this, &MyClass::OnQueryStatsComplete);
```

或者使用 OnStatsUpdated\`函数进行调用，如下例所示：

```cpp
Stats->OnStatsUpdated().Add(this, &MyClass::OnStatsUpdated);
```

以上任一示例都包含以下行为：

-   如果这是一个UObject，则调用底层委托的 `CreateUObject`。
-   如果这是 `TSharedFromThis` 的派生项，则调用 `CreateThreadSafeSP` 或 `CreateSP`（前提是它是非线程安全型共享指针）。
-   在任何其他情况下，调用 `CreateRaw`。

一般而言，将使用最安全的委托创建函数调用。

## 接口

在线服务插件中包括以下接口。

**接口**

**功能组说明**

[成就（Achievements）](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine)

列出游戏中的所有成就、解锁成就和查看你自己以及其他用户已解锁的成就。

[身份验证（Auth）](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine)

向在线服务验证和核实本地用户的身份。

[商务（Commerce）](/documentation/zh-cn/unreal-engine/commerce-interface-in-unreal-engine)

检索可用于游戏内购买的品类和特定商品。

[连接（Connectivity）](/documentation/zh-cn/unreal-engine/connectivity-interface-in-unreal-engine)

获取在线服务的连接状态或接收其状态通知。

[外部UI](/documentation/zh-cn/unreal-engine/external-ui-interface-in-unreal-engine)

打开特定硬件平台或在线服务的内置用户接口。在某些情况下，服务仅通过此接口授予对特定核心功能的访问权。

[排行榜（Leaderboard）](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine)

访问在线排行榜，包括登记自己的得分，以及在排行榜中查看好友列表上的得分或世界各地其他玩家的得分。

[大厅（Lobbies）](/documentation/zh-cn/unreal-engine/lobbies-interface-in-unreal-engine)

创建和加入大厅，以便与好友一起游戏。

[在线状态（Presence）](/documentation/zh-cn/unreal-engine/presence-interface-in-unreal-engine)

设置用户在线状态和可加入性对其他用户的显示方式。状态包括"在线（Online）"、"离线（Offline）"、"离开（Away）"等。

[权限（Privileges）](/documentation/zh-cn/unreal-engine/privileges-interface-in-unreal-engine)

查询用户的权限，如年龄限制、通信限制、跨平台游戏设置等。

[会话（Session）](/documentation/zh-cn/unreal-engine/sessions-interface-in-unreal-engine)

创建、销毁和管理在线游戏会话，包括搜索会话和配对系统。

[社交（Social）](/documentation/zh-cn/unreal-engine/social-interface-in-unreal-engine)

将用户添加到你的好友列表、屏蔽用户、解除用户屏蔽以及列出你近期在网上结识的玩家。

[统计数据（Stats）](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine)

将统计数据上传到后端以完成相应的功能，如统计数据查询、成就进度、排行榜排名等。

[作品文件（Title File）](/documentation/zh-cn/unreal-engine/title-file-interface-in-unreal-engine)

使作品能够读取未与发行的作品一并打包，而是上传到后端服务并在运行时下载到当前作品的文件。

[用户文件（User File）](/documentation/zh-cn/unreal-engine/user-file-interface-in-unreal-engine)

与用户文件存储对接。

[用户信息（User Info）](/documentation/zh-cn/unreal-engine/user-info-interface-in-unreal-engine)

收集有关用户的元数据。

## 函数

每个接口都包含各种同步和异步函数。现在我们简要介绍一下如何向函数传递参数以及在函数返回时处理结果。有关具体的接口函数的更多详细信息，请参阅[虚幻引擎C++ API参考](/documentation/en-us/unreal-engine/API)中的[OnlinServices](https://docs.unrealengine.com/API/)模块。

### 参数

在线服务接口函数的参数是使用每个函数的关联结构体的 `Params` 成员创建的。这些参数随后通过 `MoveTemp`（相当于UE中的 `std::move`）或通过以{}分隔的列表传递给相关函数。

### 返回类型

在线服务接口中定义的函数有三种不同的返回类型：

-   [`TOnlineResult`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/TOnlineResult)
-   [`TOnlineAsyncOpHandle`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/TOnlineAsyncOpHandle)
-   [`TOnlineEvent`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/TOnlineEvent)

#### TOnlineResult

同步函数返回 `TOnlineResult<T>`，其中 `T` 是与相关函数关联的结构体。为了确定返回是否成功，我们需要调用 `IsOk` 或 `IsError`。两者都返回布尔值，表示结果是可以访问还是导致了错误。最后，如果 `IsOk` 返回true，则可以通过调用 `GetOkValue` 访问 `T::Result`。同理，如果 `IsError` 返回true，则可以通过调用 `GetErrorValue` 访问 `FOnlineError`。

#### TOnlineAsyncOpHandle

需要异步通信的函数返回 `TOnlineAsyncOpHandle<T>`。在此句柄上添加 `OnComplete` 回调将监听该句柄的最终状态变化—无论是成功完成、失败、超时还是其他。回调的 `TOnlineResult<T>` 参数将包含成功的结果数据或说明函数失败原因的 `FOnlineError`。此回调接受唯一的函数，因此如果使用lambda函数，可将唯一的指针和重数据类型移入lambda的捕获范围。

#### TOnlineEvent

用于事件监听的函数返回 `TOnlineEvent<T>`。与 `TOnlineAsyncOpHandle` 类似，你可以用 `Add` 函数监听事件回调。每当检测到符合条件的事件时，`Add` 都将以签名 `T` 触发该回调。可添加同一事件的多个回调。调用Add将返回 `FOnlineEventDelegateHandle`—如果将此句柄析构，该委托回调将解除绑定，因此要确保在监听这个事件的系统生命周期内保持它的有效性，并且在销毁所关联系统的同时妥善析构/调用该句柄上的 `Unbind`。

## 使用在线服务或在线子系统

**虚幻引擎(UE)** 现在提供了两个用于访问在线服务的框架：在线服务和 **在线子系统（Online Subsystem）** 。继续阅读以确定哪种框架适合你的项目。

### 在线服务

在线服务插件尚未在发行作品中进行测试。从UE 5.1开始，在线服务插件已成为供开发人员使用的API完备版本，意在让它们在未来的引擎版本上正式发行。对于以自己的后端为目标，或者将若干UE 5.1以后的升级整合到项目中后再发行的开发人员，我们也推荐使用该框架。

### 在线子系统

如果你近期需要发行作品，或者不打算将UE 5.1以后的引擎升级整合到项目中，请使用[在线子系统](/documentation/zh-cn/unreal-engine/online-subsystem-in-unreal-engine)。

## 配置

在线服务插件的基础模块是 `OnlineServices`。该模块定义并向UE注册服务专用模块。所有对在线服务的访问都将通过该模块进行。`OnlineServices` 会在初始化期间尝试加载 `DefaultEngine.ini` 中指定的默认在线服务模块。在你的 `DefaultEngine.ini` 文件中添加以下代码，以启用在线服务，并指定一个默认的在线服务：

```cpp
[OnlineServices]
DefaultServices=<DEFAULT_PLATFORM_IDENTIFIER>
```

`DEFAULT_PLATFORM_IDENTIFIER` 是一个变量，你必须将其替换为以下某个支持的平台标识符：

-   Null
-   Epic
-   Xbox
-   PSN
-   Nintendo
-   Steam
-   Google
-   GooglePlay
-   Apple
-   AppleGameKit
-   Samsung
-   Oculus
-   Tencent

`DefaultEngine.ini` 中指定的 `DefaultServices` 可在不指定参数的情况下使用函数 [`UE::Online::GetServices`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/UE__Online__GetServices) 获取：

```cpp
TSharedPtr<IOnlineServices> GetServices(EOnlineServices OnlineServices = EOnlineServices::Default, FName InstanceName = NAME_None);
```

当调用 `UE::Online::GetServices` 请求其他在线服务时，会按需加载这些服务。标识符无效或加载模块失败将返回 `null`。

## 使用接口

各种在线服务接口的头文件都位于引擎目录中：

```cpp
UNREAL_ENGINE_ROOT/Engine/Plugins/Online/OnlineServices/Source/OnlineServicesInterface/Public/Online
```

我们鼓励你查阅该目录中的头文件，了解有关在线服务及其各种接口的更多信息。

在线服务每个接口的文档页面都包含代码示例或样例流程，可以帮助你了解在线服务插件的用法。

### 用控制台命令运行接口

你也可以使用控制台命令运行在线服务接口。请参阅[在线服务控制台命令](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine)，了解在线服务插件控制台命令使用方法及其语法的信息。

[](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine)

[![在线服务控制台命令](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7dbfcfe0-5261-428b-9d05-adb7ba20275b/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine)

[在线服务控制台命令](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine)

[在游戏过程中使用控制台命令调试和测试在线服务插件。](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine)

-   [social](https://dev.epicgames.com/community/search?query=social)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [multiplayer](https://dev.epicgames.com/community/search?query=multiplayer)
-   [online services](https://dev.epicgames.com/community/search?query=online%20services)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设计理念](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E8%AE%BE%E8%AE%A1%E7%90%86%E5%BF%B5)
-   [事件回调和监听](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E4%BA%8B%E4%BB%B6%E5%9B%9E%E8%B0%83%E5%92%8C%E7%9B%91%E5%90%AC)
-   [回调格式](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%9B%9E%E8%B0%83%E6%A0%BC%E5%BC%8F)
-   [接口](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E6%8E%A5%E5%8F%A3)
-   [函数](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%87%BD%E6%95%B0)
-   [参数](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%8F%82%E6%95%B0)
-   [返回类型](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E8%BF%94%E5%9B%9E%E7%B1%BB%E5%9E%8B)
-   [TOnlineResult](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#tonlineresult)
-   [TOnlineAsyncOpHandle](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#tonlineasyncophandle)
-   [TOnlineEvent](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#tonlineevent)
-   [使用在线服务或在线子系统](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%9C%A8%E7%BA%BF%E6%9C%8D%E5%8A%A1%E6%88%96%E5%9C%A8%E7%BA%BF%E5%AD%90%E7%B3%BB%E7%BB%9F)
-   [在线服务](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%9C%A8%E7%BA%BF%E6%9C%8D%E5%8A%A1)
-   [在线子系统](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%9C%A8%E7%BA%BF%E5%AD%90%E7%B3%BB%E7%BB%9F)
-   [配置](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E9%85%8D%E7%BD%AE)
-   [使用接口](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%8E%A5%E5%8F%A3)
-   [用控制台命令运行接口](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E7%94%A8%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%91%BD%E4%BB%A4%E8%BF%90%E8%A1%8C%E6%8E%A5%E5%8F%A3)

相关文档

[

在线子系统

![在线子系统](https://dev.epicgames.com/community/api/documentation/image/c34af712-b971-4b54-ae87-0b1a7bdea497?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/online-subsystem-in-unreal-engine)
# 虚幻引擎中的在线服务控制台命令 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:54:43.332Z

---

目录

![在线服务控制台命令](https://dev.epicgames.com/community/api/documentation/image/7aaf042f-eff6-4d04-9928-053948b52296?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

你可以在游戏过程中使用控制台命令调试和测试在线服务插件。

## 执行控制台命令

在线服务插件控制台命令通过虚幻引擎（UE）控制台执行。在编辑器中运行（PIE）期间，可按一次（无反馈）或两次（详细反馈）波浪号（~）键来访问控制台。使用以下句法来执行在线服务控制台命令：

```cpp
OnlineServices Index=<NUM> <INTERFACE> <FUNCTION> [ARG1] [ARG2] ...
```

### 参数

下表说明了组成在线服务插件控制台命令的参数：

**参数**

**说明**

**额外信息**

`NUM`

要访问的服务的索引号。

-   你可以使用控制台命令 `OnlineServices List` 获取服务列表及其编号。
-   在正常情况下，"Index=0"是默认的平台服务。

`INTERFACE`

要访问的功能的接口。

-   例如身份验证、在线状态、数据统计等。
-   有关接口的完整列表，请参阅[在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)文档的接口部分。

`FUNCTION`

要使用的指定接口内的功能。

-   示例包括在线状态接口中的 `UpdatePresence`，身份验证接口中的 `Login`，等等。
-   有关所选接口可用功能的完整列表，请参阅接口的文档页面。
-   你可以[在线服务接口](/documentation/zh-cn/unreal-engine/online-services-interfaces-in-unreal-engine)登陆页面找到所有可用的接口。

`ARG1`, `ARG2`, …

按声明顺序组成 `FUNCTION` 的相关 `Param` 结构的参数。

-   有关参数的完整列表，请参阅[虚幻引擎API文档](https://docs.unrealengine.com/API/)查寻你想要的功能。
-   有关传递复杂参数类型的更多信息，请参阅下方的[参数](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine#arguments)部分。

有关在线服务控制台命令的示例，请参阅本页的[控制台命令示例](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine#%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%91%BD%E4%BB%A4%E7%A4%BA%E4%BE%8B)部分。

## 参数

在线服务功能要求你传递多种参数类型。由于在线服务控制台命令提供了运行在线服务功能的机制，因此实现了与这些功能参数类型相对应的不同控制台命令参数类型。在线服务控制台命令有一种特殊的方法来处理这些类型，以帮助你通过虚幻引擎控制台传递复杂的C++类型，从而使它们能够被识别并用于这些功能。

特殊类型包括：

-   FAccountId
-   TSharedPtr
-   TOptional
-   TVariant
-   Objects
-   TArray
-   TMap

下表提供了有关传递这些特殊类型的更多信息以及一些示例：

**类型**

**信息**

**示例**

`FAccountId`

对于 `FAccountId`，你可以传递以下之一：

-   从0到9的任意整数，表示第n个本地用户。
-   由句柄的 `ToString` 方法输出，前缀是服务的名称，例如 `epic:<EPIC_ID>`。前缀旨在区分使用标准整数ID的不同平台。

 

`TSharedPtr`

正常键入参数名称。

技术上来说 `TSharedRef`可以实现，但使用 `TSharedRef` 会因为无法默认构造共享引用导致崩溃。目前，我们建议所有使用共享指针的控制台命令使用 `TSharedPtr`，而不是 `TSharedRef`。

 

`TOptional`

使用 `null` 传递未设置的可选值。

 

`TVariant`

传递TVariant的句法是 `<TYPE>:<VALUE>`。目前实现的类型有：

-   `s`: string
-   `i`: int64
-   `i32`: int32
-   `b`: bool
-   `u`: user (FAccountId)
-   `d`: double
-   `f`: float
-   `e`: enum

如果你有一个自定义枚举，则必须使用宏 `MAKE_VARIANT_ENUM_INFO(<YOUR_ENUM_NAME>)` 才能使其与在线服务控制台命令正常工作。如果有多个枚举，则必须限定整个枚举名称，例如，`ELoginStatus::Unknown` 就是 `Unknown` 的完全限定名称。在包含一个以上枚举的变量中使用 `e:` 是未定义的行为。

下面是每个类型的示例，每个类型都有一个类型和值对：

-   `s:MyString`
-   `i:42000000000`
-   `i32:42`
-   `b:true`
-   `u:0`
-   `d:2.718`
-   `f:3.14`
-   `e:Unknown`

`Objects`

对于带有在线元数据的对象，请使用以大括号分隔的句法，直接声明所有参数。对象支持内部对象和数组。

下面是一些对象的示例：

-   `{true "AuthLogin" s:username s:password}`
-   `{{5 3} {4 false}}`

`TArray`

使用以方括号分隔的句法来表示 `TArray`。用于分隔列表中数值的逗号是可选项。

下面是相同的 `TArray` 的两个等价示例：

-   `[5, 3, 7, 9]`
-   `[5 3 7 9]`

`TMap`

使用以大括号分隔的句法来表示 `TMap`。`TMap` 不支持丰富的句法，因此嵌套对象、数组等可能无法正常解析。

下面是一个 `TMap`的示例：

-   `{licenseData=licenseDataText, kNumUsers=5}`

## 控制台命令示例

本节包含几个控制台命令示例，你可以在项目中启用在线服务插件后使用这些命令。要使用在线服务控制台命令，请确保你已经：

-   启用在线服务插件。
-   已在你的项目中配置了可用的插件
-   获取你希望在项目代码中使用的服务的引用。

如果你没有检索要使用的服务的引用并对每个接口进行适当配置，这些控制台命令在你的项目中可能不会像下面这样运行。

### 列出可用的在线服务

#### 命令

```cpp
OnlineServices List
```

此命令列出可通过在线服务插件访问的平台服务。

#### 示例输出

```cpp
0: Null
1: Epic
2: Steam
...
```

在此示例输出中，有多个在线平台服务可用，可以在在线服务控制台命令中使用相应的索引号进行引用。例如，Null 可以用 `Index=0` 引用，Epic 可以用 `Index=1` 引用，Steam 可以用 `Index=2` 引用等等。

### 获取本地在线用户

#### 命令

```cpp
OnlineServices Index=0 Auth GetLocalOnlineUserByPlatformUserId 0
```

#### 示例输出

```cpp
LogConsoleResponse: Display: GetLocalOnlineUserByPlatformUserId result: { AccountInfo: [{ AccountId: Null:1 (ID_STRING), PlatformUserId: 0, LoginStatus: LoggedIn, Attributes: {DisplayName:String:ID_STRING} }] }
```

### 获取作品文件

#### 命令

```cpp
OnlineServices Index=0 TitleFile GetEnumeratedFiles 0
```

#### 示例输出

```cpp
LogConsoleResponse: Display: GetEnumeratedFiles result: { Filenames: [StatusFile] }
```

输出结果显示，有一个作品文件在后台在线服务中注册，名为"StatusFile"。

## 更多信息

有关本页内容的更多信息，请参阅以下页面：

-   [在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)
-   [在线服务接口](/documentation/zh-cn/unreal-engine/online-services-interfaces-in-unreal-engine)
-   [控制台变量](/documentation/zh-cn/unreal-engine/console-variables-cplusplus-in-unreal-engine)

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [online](https://dev.epicgames.com/community/search?query=online)
-   [online services](https://dev.epicgames.com/community/search?query=online%20services)
-   [console](https://dev.epicgames.com/community/search?query=console)
-   [console command](https://dev.epicgames.com/community/search?query=console%20command)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [执行控制台命令](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine#%E6%89%A7%E8%A1%8C%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%91%BD%E4%BB%A4)
-   [参数](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine#%E5%8F%82%E6%95%B0)
-   [参数](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine#%E5%8F%82%E6%95%B0-2)
-   [控制台命令示例](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine#%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%91%BD%E4%BB%A4%E7%A4%BA%E4%BE%8B)
-   [列出可用的在线服务](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine#%E5%88%97%E5%87%BA%E5%8F%AF%E7%94%A8%E7%9A%84%E5%9C%A8%E7%BA%BF%E6%9C%8D%E5%8A%A1)
-   [命令](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine#%E5%91%BD%E4%BB%A4)
-   [示例输出](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine#%E7%A4%BA%E4%BE%8B%E8%BE%93%E5%87%BA)
-   [获取本地在线用户](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine#%E8%8E%B7%E5%8F%96%E6%9C%AC%E5%9C%B0%E5%9C%A8%E7%BA%BF%E7%94%A8%E6%88%B7)
-   [命令](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine#%E5%91%BD%E4%BB%A4-2)
-   [示例输出](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine#%E7%A4%BA%E4%BE%8B%E8%BE%93%E5%87%BA-2)
-   [获取作品文件](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine#%E8%8E%B7%E5%8F%96%E4%BD%9C%E5%93%81%E6%96%87%E4%BB%B6)
-   [命令](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine#%E5%91%BD%E4%BB%A4-3)
-   [示例输出](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine#%E7%A4%BA%E4%BE%8B%E8%BE%93%E5%87%BA-3)
-   [更多信息](/documentation/zh-cn/unreal-engine/online-services-console-commands-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF)

相关文档

[

在线服务概述

![在线服务概述](https://dev.epicgames.com/community/api/documentation/image/604f7896-c9e6-4007-a408-d229c7789a29?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)

[

在线服务接口

![在线服务接口](https://dev.epicgames.com/community/api/documentation/image/76c6c27b-740d-4bc6-baac-a8fd8a45c8ac?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/online-services-interfaces-in-unreal-engine)

[

控制台变量和命令

![控制台变量和命令](https://dev.epicgames.com/community/api/documentation/image/dc680599-f0a3-4909-80ff-0694861ddd95?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/console-variables-cplusplus-in-unreal-engine)
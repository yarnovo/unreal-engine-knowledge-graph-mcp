# 虚幻引擎中的网络游戏的日志记录 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/logging-for-networked-games-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:57:52.996Z

---

目录

![网络游戏的日志记录](https://dev.epicgames.com/community/api/documentation/image/01460bf6-ca7d-46fd-924f-6314844655b3?resizing_type=fill&width=1920&height=335)

## 网络游戏的日志记录

**客户端** 和 **服务器** 日志对于识别和调试网络问题很重要。虽然许多网络日志属于 **LogNet** 类别，但我们建议检查与特定系统更密切相关的日志类别，以便更深入地了解问题。

这些类别默认情况下未启用，并且具有不同的冗长度，你可能需要调整，从而获取有关你正在经历的行为的信息。下面的列表提供了一些推荐的类别：

类别

说明

**LogNetTraffic**

当此日志变量设置为VeryVerbose时，记录所有网络流量。

**LogNetPackageMap**

记录关于如何发送、接收和确认NetGUID的信息。

**LogNetVersion**

记录关于FRepLayout和FObjectReplicator使用的属性复制和RepNotify函数的信息。

**LogNetFastTArray**

^

**LogNetDormancy**

^

**LogRep**

^

**LogRepTraffic**

^

**LogRepProperties**

记录关于发送和接收复制属性的信息。

**PacketHandlerLog**

记录关于数据包处理程序及其组件的信息。这些组件有自己的子类别。例如LogDTLSHandler、OodleNetworkHandlerComponentLog和LogHandshake。

**LogDemo**

记录关于录制和播放的信息。每个回放流送器都有相关的日志类别：LogLocalFileReplay、LogSaveGameReplay、LogNullReplay和LogMemoryReplay。

你可以启用这些类别并调整其冗长度，方法是传入命令行参数：

### 命令行参数

传入 `LogCmds` 命令行参数：

```cpp
-LogCmds="<LOG_CATEGORY> <LOG_VERBOSITY>"
```

例如， `LogNetTraffic` 设置为 `VeryVerbose`：

```cpp
-LogCmds="LogNetTraffic VeryVerbose"
```

### 控制台命令

使用 `Log` 控制台命令：

```cpp
Log <LOG_CATEGORY> <LOG_VERBOSITY>
```

例如， `LogNetTraffic` 设置成 `Verbose`：

```cpp
Log LogNetTraffic Verbose
```

### 引擎配置

在项目的 `DefaultEngine.ini.` 中设置它们：

```cpp
[Core.Log]
<LOG_CATEGORY1>=<LOG_VERBOSITY1>
<LOG_CATEGORY2>=<LOG_VERBOSITY2>
...
```

例如，将不同类型的内容设置为不同日志等级：

```cpp
[Core.Log]
LogNetPackageMap=Log
LogNetTraffic=Verbose
LogRep=VeryVerbose
```

## 帮助性报错

读取日志时，以下列表可用于确定发生的错误类型。

**UEngine::BroadcastNetworkFailure**

当网络驱动程序遇到一些重大错误时打印。日志行将包括失败类型、错误字符串和关于出现错误的网络驱动程序的描述。你可以在EngineBaseTypes.h的ENetworkFailure枚举中查看可能的网络故障列表和简要说明。

**UNetConnection::Close**

关于正在关闭的连接的描述。

**UActorChannel::Close**

LogNetTraffic类别将包括通道索引、该通道的Actor及其关闭原因。检查有关这些行的日志有助于提供有关连接或Actor通道关闭原因的一些指示。

命令行参数 `-LogTrace=<PARTIAL_LOG_LINE>` 将从部分日志消息字符串执行堆栈追踪。例如：`-LogTrace=UNetConnection::Close` 会在每次将 `UNetConnection::Close` 打印到日志时生成堆栈追踪。命令行参数 `-DumpRPCs` 将提供转储RPC及其参数的功能，这对于跟踪正在发送的RPC及其参数很有用。

LogTrace和DumpRPCs都需要启用 **NetcodeUnitTest**。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [网络游戏的日志记录](/documentation/zh-cn/unreal-engine/logging-for-networked-games-in-unreal-engine#%E7%BD%91%E7%BB%9C%E6%B8%B8%E6%88%8F%E7%9A%84%E6%97%A5%E5%BF%97%E8%AE%B0%E5%BD%95)
-   [命令行参数](/documentation/zh-cn/unreal-engine/logging-for-networked-games-in-unreal-engine#%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%8F%82%E6%95%B0)
-   [控制台命令](/documentation/zh-cn/unreal-engine/logging-for-networked-games-in-unreal-engine#%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%91%BD%E4%BB%A4)
-   [引擎配置](/documentation/zh-cn/unreal-engine/logging-for-networked-games-in-unreal-engine#%E5%BC%95%E6%93%8E%E9%85%8D%E7%BD%AE)
-   [帮助性报错](/documentation/zh-cn/unreal-engine/logging-for-networked-games-in-unreal-engine#%E5%B8%AE%E5%8A%A9%E6%80%A7%E6%8A%A5%E9%94%99)
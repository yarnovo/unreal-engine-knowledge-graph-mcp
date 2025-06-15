# 面向虚幻引擎的Horde租赁 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/horde-leases-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:37:42.747Z

---

目录

![Horde租赁](https://dev.epicgames.com/community/api/documentation/image/657cf9e7-95a9-4411-b54d-7b10428cc2ec?resizing_type=fill&width=1920&height=335)

Horde与其代理通信的机制主要基于Google的Remote Worker API。分配给代理的工作项被称为 **租赁** 。

代理与服务器之间的通信是通过代理发起的流式gRPC调用实现的。连接的两端会交换各自认为代理所拥有的当前租赁状态的副本，而状态机将确定在不同时间哪个字段具有权威性。服务器和代理会不断地交换状态对象并协调差异，直至协调一致；此时，代理会确认它正在接受服务器添加的新租赁，而服务器也会确认代理对已解除租赁的完成。

在Horde服务器中，租赁是通过实现 `ITaskSource` 的类分配给代理的。

## 租赁类型

每种租赁类型都由以下关键类组成：

-   一条用于定义租赁本身的消息（即代理需要执行的操作），
-   服务器上用于决定将租期分配给代理的任务源（ `ITaskSource` ），
-   代理上用于执行该工作的租赁处理程序（ `LeaseHandler` ）。

Horde附带以下租赁类型：

消息

任务源（服务器）

租赁处理程序（代理）

说明

`job_task.proto`

`JobTaskSource`

`JobHandler`

执行批处理，将其作为CI作业的一部分。

`upgrade_task.proto`

`UpgradeTaskSource`

`UpgradeHandler`

将Horde代理软件升级到新版本。

`conform_task.proto`

`ConformTaskSource`

`ConformHandler`

将机器上的所有工作空间同步到最新状态，并可选择删除未追踪的文件。

`restart_task.proto`

`RestartTaskSource`

`RestartHandler`

重新启动机器。

`shutdown_task.proto`

`ShutdownTaskSource`

`ShutdownHandler`

关闭机器电源。

## 添加新租赁类型

要添加一种新租赁类型，必须添加上文提及的每一种关键类。

-   将任务源添加到服务器后，在 `Startup.cs` 中将其注册为实现 `ITaskSource` 的单例。
-   将租赁处理程序添加到代理后，在 `Program.cs` 中将其注册为实现 `LeaseHandler` 的单例。

-   [horde](https://dev.epicgames.com/community/search?query=horde)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [租赁类型](/documentation/zh-cn/unreal-engine/horde-leases-for-unreal-engine#%E7%A7%9F%E8%B5%81%E7%B1%BB%E5%9E%8B)
-   [添加新租赁类型](/documentation/zh-cn/unreal-engine/horde-leases-for-unreal-engine#%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%A7%9F%E8%B5%81%E7%B1%BB%E5%9E%8B)
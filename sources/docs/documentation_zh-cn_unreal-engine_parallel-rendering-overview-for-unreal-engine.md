# 并行渲染介绍 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/parallel-rendering-overview-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:24:30.688Z

---

目录

![并行渲染介绍](https://dev.epicgames.com/community/api/documentation/image/b23d74d4-f596-4586-ae78-344cdf7f6107?resizing_type=fill&width=1920&height=335)

## 线程概述

最初，渲染器运行在渲染线程中，游戏线程将该线程的命令排队，以便稍后在帧中运行。这些命令会调用渲染硬件接口（RHI）层，它是受支持的平台上不同图形API的跨平台接口。

为了提高此过程的效率并利用受支持的平台的功能，渲染线程现在作为一个前端，将不受平台限制的图形命令排入渲染器的命令列表，然后新的RHI线程通过后端的相应图形API转换（执行）这些命令。借助这种分离，可在支持它的平台（例如游戏机、DX12和Vulkan）上实现独立的后端并行化。一般来说，在前端并行生成的任何内容都会在后端并行转换。

某些命令可在不使用命令列表系统的情况下执行，例如锁定和解锁操作。这些命令由渲染线程直接发出。在这些情况下，引擎要么转储清除RHI线程并等待操作完成，要么复制数据并对其进行排队。实现方式根据根据操作和平台的不同而异。

## 图形命令和命令列表

渲染线程排队的命令是从 `FRHICommand` 模板衍生的结构体的实例。这些命令覆盖在转换过程中调用的 `Execute` 函数，并存储所需的任何数据。根据不同平台的最佳性能的启发法，可在平台上以不同方式将命令提交给GPU（例如，每帧提交多次，在帧结束时一次提交等），或者也可通过发出 `FRHISubmitCommandsHint` 命令来提交。

平移中使用的主要接口是 `IRHICommandContext`。每个平台和API都有一个衍生的 `RHICommandContext`。在平移期间，系统向 `RHICommandList` 提供了 `RHICommandContext` 以用于操作，并且每个命令的 `Execute` 函数都调用 `RHICommandContext` API。命令的上下文负责执行给定操作所需的状态阴影、验证和任何特定于API的细节。

## 同步

GameThread、RenderThread、RHI Thread和GPU之间的渲染器同步是一个非常复杂的主题。简而言之，虚幻引擎4通常配置为"后一帧（single frame behind）"渲染器。这意味着当RenderThread处理第N帧时GameThread处理第N + 1帧，除非RenderThread的运行速度比GameThread快。添加RHI线程使同步过程更为复杂化，因为当RHI线程处理第N帧时，RenderThread能够通过完成第N+1帧的可视性计算而移动到RHI线程之前。最终结果是，当GameThread处理第N+1帧时，RenderThread可以处理第N帧或第N+1帧的命令，RHI线程也可以平移第N帧或第N+1帧的命令，具体取决于执行时间。这些保证由 `FFrameEndSync` 和名为 `RHIThreadFence` 的 `FRHICommandListImmediate` 函数仲裁。它还可以保证，无论并行化的配置方式如何，向GPU提交命令的顺序与在单线程渲染器中提交命令的顺序相同。这可以确保一致性，如果更改渲染代码，必须保持顺序不变。

## 调试

控制此行为的控制台变量有多种。由于这些阶段中的许多阶段是互不相关的，可在测试中将它们单独禁用，并在时间允许的情况下分阶段启动新平台。例如

命令

说明

**r.rhicmdusedeferredcontexts**

如果设置为0，将禁用后端的并行化。默认值为 1。

**r.rhicmduseparallelalgorithms**

如果设置为0，将禁用前端的并行化。默认值为 1。

**r.rhithread.enable**

如果设置为0，将完全禁用RHI线程。命令列表仍将生成，但它们在某些点将直接在渲染线程上进行转换。

**r.rhicmdbypass**

如果设置为1，将完全禁用命令列表生成并使渲染器的行为与原来一样，直接在没有命令列表的情况下调用渲染线程上的RHI命令。请注意，除非禁用RHI线程，否则将忽略此项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33a41b83-ea16-47fd-82e9-12ed26a188b1/parallel_rendering_00.png)

显示并行命令列表生成在Unreal Engine中的工作原理。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [线程概述](/documentation/zh-cn/unreal-engine/parallel-rendering-overview-for-unreal-engine#%E7%BA%BF%E7%A8%8B%E6%A6%82%E8%BF%B0)
-   [图形命令和命令列表](/documentation/zh-cn/unreal-engine/parallel-rendering-overview-for-unreal-engine#%E5%9B%BE%E5%BD%A2%E5%91%BD%E4%BB%A4%E5%92%8C%E5%91%BD%E4%BB%A4%E5%88%97%E8%A1%A8)
-   [同步](/documentation/zh-cn/unreal-engine/parallel-rendering-overview-for-unreal-engine#%E5%90%8C%E6%AD%A5)
-   [调试](/documentation/zh-cn/unreal-engine/parallel-rendering-overview-for-unreal-engine#%E8%B0%83%E8%AF%95)
# 虚幻引擎异步计算 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/asynccompute-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:24:56.617Z

---

目录

![异步计算](https://dev.epicgames.com/community/api/documentation/image/fe4eb289-65af-4530-a164-caac1cc55f4f?resizing_type=fill&width=1920&height=335)

渲染硬件接口（RHI）现支持 Xbox One 的异步计算（**AsyncCompute**）。此法可运行与渲染异步的 **dispatch()** 调用，有效利用未使用的 GPU 资源（计算单元（CU）、寄存器和带宽）。异步计算使用单独的上下文，我们通过 RHI 函数同步渲染和计算上下文。Dr PIX 可用于识别从异步计算获益的区域。例如，特定渲染通道中半数 CU 均未使用，这些 CU 则可能被异步计算任务所利用。异步计算存在一些限制：

*不支持 UAV 计数器缓冲（这是 XDK 的限制，将生成 D3D 警告）* 异步计算任务不显示在 PIX GPU 采集中（但它们会出现在定时采集中） PIX 只采集图形直接上下文（这是平台限制）。 \* 驱动器不提供自动管线强制清空。如需清空，需显式调用 RHICSManualGpuFlush。 （例如一个调度依赖于前一个调度）

## API

***RHIBeginAsyncComputeJob\_DrawThread** (EAsyncComputePriority Priority) 从渲染线程开始异步计算任务。优先级用于确定分配任务（通过 ID3D11XComputeContext::SetLimits）的 着色器资源数量。当前有两个可用优先级：AsyncComputePriority\_High、 AsyncComputePriority\_Default。* **RHIEndAsyncComputeJob\_DrawThread** 完成异步计算任务。返回一个用于同步的 32 位栅栏指数； 如计算被禁用或无进行中的计算任务，则返回 -1。 \* **RHIGraphicsWaitOnAsyncComputeJob** 在图形直接上下文中插入一个命令进行阻止，直到异步任务完成。传递 -1 会导致此进程提前结束。

在 RHIBeginAsyncComputeJob\_DrawThread 和 RHIEndAsyncComputeJob\_DrawThread 调用之间，RHI 处于异步计算状态。 这段时间中，支持的 RHI 命令将通过异步计算上下文执行。不支持的 RHI 函数将断言。

## 启用/禁用

编译时可通过 #define USE\_ASYNC\_COMPUTE\_CONTEXT 启用或禁用异步计算。运行时可通过 r.AsyncCompute 控制台变量禁用。异步计算禁用后，异步计算块中的调度将在图形命令缓冲上同步执行。PC 上的 USE\_ASYNC\_COMPUTE\_CONTEXT 被定义为 0，因 D3D11.1 不支持。

## PIX

异步计算上下文任务不在 GPU 采集中进行采集，因此异步计算启用时这些采集可能呈现出错误的 GPU 性能画面。为进行图形调试，应使用上述控制台变量禁用异步计算。异步计算由 PIX 定时采集支持。它们在时间轴中如下图所示：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/660b2e85-5006-4ef2-93e3-7330926f6ebf/pixtimingcapture.png)

## 鸣谢

此功能由 Lionhead Studios 实现。我们将其整合并用作 Xbox One 渲染的优化工具。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [API](/documentation/zh-cn/unreal-engine/asynccompute-in-unreal-engine#api)
-   [启用/禁用](/documentation/zh-cn/unreal-engine/asynccompute-in-unreal-engine#%E5%90%AF%E7%94%A8/%E7%A6%81%E7%94%A8)
-   [PIX](/documentation/zh-cn/unreal-engine/asynccompute-in-unreal-engine#pix)
-   [鸣谢](/documentation/zh-cn/unreal-engine/asynccompute-in-unreal-engine#%E9%B8%A3%E8%B0%A2)
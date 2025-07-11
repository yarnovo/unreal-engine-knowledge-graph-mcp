# 虚幻引擎低延迟框架同步 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/low-latency-frame-syncing-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:42:04.373Z

---

目录

![低延迟框架同步](https://dev.epicgames.com/community/api/documentation/image/0631ba89-f322-443f-84a1-fd1be0ce2273?resizing_type=fill&width=1920&height=335)

**低延迟帧同步** 模式会修改游戏、渲染及RHI线程和GPU之间线程同步的执行方式，以显著减少和控制输入延迟。在之前的引擎发行版中，游戏线程在帧结束时与渲染线程同步。当启用 **r.OneFrameThreadLag** CVar（默认情况下启用）时，这种同步方式可确保游戏线程不会比渲染线程提前一整帧以上。   
特定于平台的显卡驱动程序通常会暂停调用Present()的线程，以防止游戏的运行速度比帧的显示速度快。驱动程序允许交换链得到填充，并且在空间不足时暂停调用线程。在UE4的并行渲染引入之前，该渲染行为是正确的，因为游戏线程会等待渲染线程，而渲染线程会被显卡驱动程序/操作系统暂停。但是，伴随着并行渲染的引入，Present()现在由RHI线程调用，因此驱动程序现在会调节该线程。游戏线程仍然仅与渲染线程同步，这将使这两种线程同以前相比大大提前于GPU和翻转帧。在 **rhi.SyncInterval** 设置为2、刷新率为30Hz的游戏中，这将导致最高达130 ms的输入延迟。

要实现与并行渲染之前相同的输入延迟，需要将游戏线程改为与RHI线程同步。此外，启用垂直同步时，交换链提供规律、可预测的同步间隔，即交换链翻转前台/后台缓冲区的时间点。通过将游戏线程帧的开头与相对于垂直同步的任意点同步，可以准确地控制输入延迟。通过谨慎选择该点，我们可以在输入延迟和性能之间进行抉择，反之亦然。 

该新低延迟帧同步模式添加了一种称为 **r.GTSyncType**（游戏线程同步线程）的新CVar。此CVar驱动此帧同步机制的工作方式。它允许以下值：

**值**

**说明**

0

游戏线程与渲染线程同步（旧行为，默认）。

1

游戏线程与RHI线程同步（相当于采用并行渲染前的UE4）

2

游戏线程与交换链同步，显示+/-以毫秒为单位表示的偏移。

为实现模式2同步，引擎通过调用Present()时传入驱动程序的索引跟踪显示的帧。此索引是从平台帧翻转统计数据检索的，它指示每帧翻转的精确时间。引擎用户使用这些值来预测下一帧应于何时翻转，然后基于该时间启动下一个游戏线程帧。

CVar **rhi.SyncSlackMS** 决定应用到预测的下一次垂直同步时间的偏移。减小该值将缩小输入延迟，但是会缩短引擎管道，更容易出现由卡顿造成的掉帧。相似地，增大该值会延长该引擎管道，赋予游戏更多应对卡顿的弹性，但是会增大输入延迟。

一般来说，使用这个新的帧同步系统的游戏应在维持可接受帧率的情况下尽可能缩小 **rhi.SyncSlackMS**。

例如，更新率为30 Hz的游戏具有以下CVar设置：

-   **rhi.SyncInterval 2**
-   **r.GTSyncType 2**
-   **r.OneFrameThreadLag 1**
-   **r.Vsync 1**
-   **rhi.SyncSlackMS 0**

它将拥有的最佳输入延迟为~66ms（两个30 Hz帧）。如果将 **rhi.SyncSlackMS** 增大至10，则最佳输入延迟为~76ms。

**r.GTSyncType 2** 也适用于更新率为60 Hz的游戏（即，**rhi.SyncInterval** 设置为1），但是采用此设置的好处不易察觉，由于与30hz相比，帧率为两倍，输入延迟会降低一半。

在不受支持的平台上，**r.GTSyncType 2** 将会退回到模式1。

-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
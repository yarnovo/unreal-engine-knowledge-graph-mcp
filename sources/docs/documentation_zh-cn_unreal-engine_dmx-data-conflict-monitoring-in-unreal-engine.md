# 虚幻引擎中的DMX数据冲突监控 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dmx-data-conflict-monitoring-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:29:24.980Z

---

目录

![DMX冲突监控器](https://dev.epicgames.com/community/api/documentation/image/b5a2d825-f750-40db-92c4-ba80bc3c99ce?resizing_type=fill&width=1920&height=335)

在将引擎中的DMX数据发送到外部设备时，DMX冲突监控器可检查所有启用的域和配接范围上的潜在DMX数据冲突。虚幻引擎中的不同DMX工具（例如控制台、像素映射器和蓝图）将DMX数据写入相同地址时，它们之间可能会发生冲突。

要打开冲突监控器，点击 **主工具栏** 中的 **DMX** > **冲突监控器（Conflict Monitor）** 。

![主工具栏中的冲突监控器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/103ec0d0-3016-492f-afd5-36ab9c383aed/open-monitor.png)

冲突监控器将作为可停靠的窗口打开。点击 **省略号（...）** 可配置其选项。

-   **播放/停止（Play/stop）**：启动和停止监控过程。
-   **选项（Options）**
    -   **自动暂停（Auto Pause）**：检测到冲突时暂停。
    -   **打印到日志（Print to Log）**：将冲突打印到UE输出日志。仅在启用自动暂停时可用。
-   **监控器（Monitor）**
    -   **打开时运行（Run when opened）**：打开时监控自动启动。
    -   **深度（Depth）**：控制在日志条目中包含多少详情。

在冲突监控器运行时， **发生DMX的对象（Objects Sending DMX）** 分段会更新，显示当前正在发送DMX的资产。你可以根据显示打开对应资产，或在 **内容浏览器** 中找到它。

![The Objects Sending DMX section](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a84d5b9c-ace2-46ca-ad03-fdcd0dbdef4d/objects-sending-dmx.png)

冲突监控可能会占用大量CPU资产。你可以在冲突监控器的右上角查看当前CPU使用情况。

![The CPU usage bar](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f96bc15-43ae-4118-afc5-73a941805ef6/cpu-usage.png)

如果冲突监控器检测到冲突，则监控器会记录关于冲突的信息，包括冲突的DMX工具和受影响的端口。

![Conflict Monitor log with information about a conflict](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed12c3e5-aa7a-4eb2-b32b-4740d46ee5d9/conflict-log.png)

如果选择了 **打印到日志（Print To Log）** 选项，则冲突监控器还会将相同信息发送到UE输出日志。

![UE Output log with Conflict Monitor information](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c02ecff2-58b1-4187-89e8-0f49e963328e/ue-log.png)

-   [reference](https://dev.epicgames.com/community/search?query=reference)
-   [dmx](https://dev.epicgames.com/community/search?query=dmx)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
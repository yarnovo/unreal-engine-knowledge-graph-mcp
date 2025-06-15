# 虚幻引擎中的ＤＭＸ活动和通道监控器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dmx-activity-and-channel-monitors-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:29:27.138Z

---

目录

![ＤＭＸ活动和通道监控器](https://dev.epicgames.com/community/api/documentation/image/98a501ac-4971-45ff-9a2c-7187a1cf133c?resizing_type=fill&width=1920&height=335)

# 介绍

**DMX监控器（DMX Monitor）**　是用于可视化DMX输入和输出的工具。

# 访问DMX监控器

DMX监控器在DMX工具栏菜单中可用。

![The DMX monitors in the DMX Toolbar menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23a83fd7-c93d-4c82-9c5c-3c8c5a280261/dmx-monitors-dropdown.png)

在DMX库的灯具配接编辑器中也有一个通道监控器。它只监控DMX输入。

![The DMX Monitor in the Fixture Patch Editor.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c85cebf-ddf1-4f3c-af13-475222744c38/dmx-fixture-monitor.png)

# 通道监控器

当虚幻引擎收到指定的universe数据时，监控器器会显示信息。

选择控件为你提供了一种挑选要监控的universe的方法。

![Selecting a universe to monitor with the DMX universe selection widget.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7498068c-3b02-4139-a632-f6b4dbb38b27/dmx-universe-selection.png)

**属性**

**说明**

**监控所有端口（Monitor All Ports）**

选择时，所有的输入或输出端口都被监控。

**源（Source）**

选择一个要监控的源，你可以选择　**监控所有端口**　来监控所有　**输入**　或　**输出**　端口，或者你可以选择一个特定的输入或输出端口。

**本地universe（Local Universe）**

指定监测的本地universe。

**清除DMX缓冲区（Clear DMX Buffers）**

清除所有DMX缓冲区。这将清空缓冲区，它将不发送零或默认值。

# 活动监控器

**DMX活动监控器**　是一种调试工具，用于可视化多个universe中的DMX输入和输出。活动监控器显示它所监控的所有universe中接收到的任何非零DMX值。

![the DMX Activity Monitor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f62c58b4-9d50-49aa-8cce-cd3f67bca4a1/dmx-activity-monitor.png)

**属性**

**说明**

**监控所有端口（Monitor All Ports）**

选择时，所有的输入或输出端口都被监控。

**源（Source）**

选择一个要监控的源，你可以选择　**监控所有端口**　来监控所有　**输入**　或　**输出**　端口，或者你可以选择一个特定的输入或输出端口。

**Universes**

选择监测的Universe范围

**清除DMX缓冲区（Clear DMX Buffers）**

清除所有DMX缓冲区。这将清空缓冲区，它将不发送零或默认值。

-   [dmx](https://dev.epicgames.com/community/search?query=dmx)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [介绍](/documentation/zh-cn/unreal-engine/dmx-activity-and-channel-monitors-in-unreal-engine#%E4%BB%8B%E7%BB%8D)
-   [访问DMX监控器](/documentation/zh-cn/unreal-engine/dmx-activity-and-channel-monitors-in-unreal-engine#%E8%AE%BF%E9%97%AEdmx%E7%9B%91%E6%8E%A7%E5%99%A8)
-   [通道监控器](/documentation/zh-cn/unreal-engine/dmx-activity-and-channel-monitors-in-unreal-engine#%E9%80%9A%E9%81%93%E7%9B%91%E6%8E%A7%E5%99%A8)
-   [活动监控器](/documentation/zh-cn/unreal-engine/dmx-activity-and-channel-monitors-in-unreal-engine#%E6%B4%BB%E5%8A%A8%E7%9B%91%E6%8E%A7%E5%99%A8)
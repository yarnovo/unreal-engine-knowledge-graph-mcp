# Niagara数据通道概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/niagara-data-channels-overview
> 
> 生成时间: 2025-06-14T19:30:39.454Z

---

目录

![Niagara数据通道概述](https://dev.epicgames.com/community/api/documentation/image/34e922ff-2033-480f-9fba-9439b58adc60?resizing_type=fill&width=1920&height=335)

## 概述

**Niagara数据通道（NDC）** 可促进游戏代码与Niagara系统之间或不同Niagara系统之间的通信。

数据通道是具有已确定负载的数据流，游戏代码或Niagara系统可以读取或写入该数据流。Niagara系统可以读取负载并根据该信息修改其行为。该系统还可以将信息写入数据通道，并且其他Niagara系统或蓝图可以在Gameplay过程中使用该信息。一个项目可以有多种专用数据通道类型，用于多种用途。

数据通道的一个常见用例是Niagara冲击效果，其中玩家可能会在Gameplay过程中多次生成相同的Niagara系统。每个系统都单独生成并执行。如果玩家快速生成许多这类系统，开销可能会变得很高。

Niagara数据通道提供了一种替代方案，你可以将喷发的Niagara系统组合成一个大型共享模拟，从而优化这些系统。因此，你无需生成多个独立的Niagara系统，而是生成单一的系统来处理分配给数据通道的所有喷发粒子。此功能可以显著提高性能。

## 关键类和概念

使用Niagara的数据通道需要以下关键组件：

-   **数据通道资产** ，包含将写入通道的变量（负载）以及将使用该通道的Niagara系统列表。
-   配置为连续监听器系统的 **Niagara系统** 。每个岛状区会生成一个Niagara系统，用于监听数据通道事件。系统可以利用这些信息来生成粒子。
-   写入数据通道并传递指定信息（负载）的 **蓝图** 。

### Niagara数据通道资产

![Niagara数据通道资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5969d62-a5b5-4e9b-869a-4f993ef2065d/niagara-data-channels-1.png)

此资产包含常见的数据通道设置，例如数据通道类型和通道变量。如果使用岛状区类型，你可以指定岛状区的初始和最大范围以及岛状区池大小。变量可以是常见类型，例如浮点或向量4，也可以是枚举器，例如碰撞通道、物理表面或Niagara执行状态。你还可以添加代表特定Chaos破坏系统和Niagara碰撞事件的变量。

每个数据通道都包含一个Niagara系统列表，当事件被提交到数据通道时，这些系统可以在岛状区边界内被生成。

### Niagara系统

你的Niagara系统将监听数据通道中的事件，并利用该信息生成粒子。此系统必须配置无限循环行为（Infinite Loop Behavior），以便一旦系统在岛状区生成，只要从数据通道接收到事件，系统就可以保持激活。

![无限循环行为](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5bb57fa8-ebab-44da-802b-17cc3bdb3531/niagara-data-channels-2.png)

系统还应有一个"若未使用则完成（Complete if Unused）"模块。一旦在一段时间之后没有收到任何事件，系统就会被销毁。这也将允许数据通道在不再有剩余Niagara系统时清理该岛状区。

![若未使用则完成](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/763ebdb3-87d5-42dc-aae3-8a99dbc4c455/niagara-data-channels-3.png)

发射器应该有两个暂存区（Scratchpad）模块，一个用于从数据通道读取数据，另一个用于基于从数据通道读取的数据生成粒子。

![从Niagara数据通道读取](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c75c2786-2be5-4628-9a19-35c0d04313a1/niagara-data-channels-4.png) ![从Niagara数据通道生成](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afefde65-f91d-439b-a52d-2065fd5da86c/niagara-data-channels-5.png)

### 蓝图

你的蓝图将直接写入Niagara数据通道并设置相关变量。

![写入Niagara数据通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf9cd7bc-3c02-434c-b294-c759a585465a/niagara-data-channels-6.png)

有关如何使用Niagara数据通道的分步指南，请查看EDC中的[Niagara数据通道简介](https://dev.epicgames.com/community/learning/tutorials/OpJ8/unreal-engine-niagara-data-channels-5-4-update)。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/niagara-data-channels-overview#%E6%A6%82%E8%BF%B0)
-   [关键类和概念](/documentation/zh-cn/unreal-engine/niagara-data-channels-overview#%E5%85%B3%E9%94%AE%E7%B1%BB%E5%92%8C%E6%A6%82%E5%BF%B5)
-   [Niagara数据通道资产](/documentation/zh-cn/unreal-engine/niagara-data-channels-overview#niagara%E6%95%B0%E6%8D%AE%E9%80%9A%E9%81%93%E8%B5%84%E4%BA%A7)
-   [Niagara系统](/documentation/zh-cn/unreal-engine/niagara-data-channels-overview#niagara%E7%B3%BB%E7%BB%9F)
-   [蓝图](/documentation/zh-cn/unreal-engine/niagara-data-channels-overview#%E8%93%9D%E5%9B%BE)
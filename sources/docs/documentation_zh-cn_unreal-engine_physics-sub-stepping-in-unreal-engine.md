# 虚幻引擎物理子步 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/physics-sub-stepping-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:52:05.880Z

---

目录

![物理子步](https://dev.epicgames.com/community/api/documentation/image/8dca6ffd-114a-40a8-8708-7de818dbc4c8?resizing_type=fill&width=1920&height=335)

使用物理 **子步（Sub-stepping）** 可获取更加精准且稳定的物理模拟，但将造成性能的损失。最明显的改进涉及到布偶振动和其他复杂物理资源。

## 启用子步

在 **编辑（Edit）** > **项目设置（Project Setting）** > **物理（Physics）** 标签下可开启子步：

![Sub-stepping Enabled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66e55aac-0b5f-410c-977a-9684f4b45198/sub-stepping-enabled.png)

此功能尚处于开发阶段，APEX销毁无法完美支持。移动设备目前也无法支持此功能。我们将持续对其进行开发，以便优化外观和使用感受。

属性

描述

**设置子步**

在当前项目中启用或停用子步。

**子步异步**

是否对异步物理模拟设置子步。

**最大子步差量时间**

一个子步所允许花费的最长时间（以秒计）。因此如一个整步花费时间为0.05秒，同时 **最大子步差量时间** 被设为0.025，则整步将被分为两个子步。整步若花费较长时间（如2秒整），则将基于 **最大子步** 的数值对步进行均分，而不是直接分为 **80** `(2.0/0.025=80)` 个子步。值得注意的是 **最大物理差量时间**　会对物理步长所花费的时间进行限制。

**最大子步**

一个整步可划分出的最大子步数。

## 技术细节

虚幻引擎5使用可变帧率。可变帧率有利于硬件的可延展性，但因物理引擎适用的是小幅固定时间步，其将会此类引擎造成一定困难。设置子步会获取总帧时并将其划分为子步。然后会逐帧多次tick物理模拟。采用的子步数量取决于最大子步差量时间所设置的最小值。最大子步时间越小，模拟越稳定，但CPU的开销将升高。

设置子步对玩家为隐藏状态，意味着须内插或维持对物理引擎的部分调用。举例而言，如用户在单帧中对Actor施加一个力，同时对帧内部设置N次子步，则需要连续施加N次模拟步的力量来达到相同的加速度。同理，如用户设置Actor的目标位置，则须将目标位置内插到多个分步上，以维持理想速度。虚幻引擎已将以上细节进行内部处理，但必需的信息记录将消耗部分CPU和内存。

需要注意的另一个技术细节是子步设置过程中碰撞回调行为的方式。虚幻引擎以一个单独的物理线程执行物理子步，使游戏线程能持续工作。为获得最佳性能，我们将延迟碰撞回调，直到完成最后一个子步。这意味着一个碰撞可能会获得多个回调。例如A和B发生碰撞并弹开，则可能会获得A和B重叠的回调，以及同一帧中A和B不再重叠的回调。所有回调会被内部推入到一个队列中，因此将会在处理来自子步2的回调之前先处理来自子步1的回调。

## 使用

设置子步将极大提高复杂物理资源的质量（如布偶所用的资源）。实际运用中应根据游戏的实际所需，在提高质量和CPU消耗进行权衡。

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [sub-stepping](https://dev.epicgames.com/community/search?query=sub-stepping)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用子步](/documentation/zh-cn/unreal-engine/physics-sub-stepping-in-unreal-engine#%E5%90%AF%E7%94%A8%E5%AD%90%E6%AD%A5)
-   [技术细节](/documentation/zh-cn/unreal-engine/physics-sub-stepping-in-unreal-engine#%E6%8A%80%E6%9C%AF%E7%BB%86%E8%8A%82)
-   [使用](/documentation/zh-cn/unreal-engine/physics-sub-stepping-in-unreal-engine#%E4%BD%BF%E7%94%A8)
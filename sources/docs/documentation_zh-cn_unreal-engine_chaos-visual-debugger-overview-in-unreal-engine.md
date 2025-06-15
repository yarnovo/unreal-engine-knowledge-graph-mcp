# 介绍虚幻引擎中的Chaos视觉调试器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/chaos-visual-debugger-overview-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:48:50.900Z

---

目录

![Chaos视觉调试器概述](https://dev.epicgames.com/community/api/documentation/image/a8d3c53f-9d3b-48c1-b038-a1fe4e3c7f97?resizing_type=fill&width=1920&height=335)

![Chaos视觉调试器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f9058b3-e21a-4d75-9975-7f266918e79f/chaos-visual-debugger-1.gif)

## 概述

**Chaos视觉调试器（CVD）** 是用于Chaos物理模拟系统的视觉调试工具。该调试器提供了Chaos物理场景的图形视图，并配备了用于直观显示数据和分析模拟结果的各种工具。

CVD作为编辑器工具和运行时系统包含在虚幻引擎中，用于记录Gameplay过程中的物理模拟状态。然后，它可以在工具内部重放这些模拟，并检查模拟的任何给定帧或子步骤的数据。

## 支持的功能

Chaos视觉调试器支持记录场景中所有激活的 **刚体** 和 **刚体动画节点（RBAN）** 解算器。其中包括所有物理粒子及其状态和碰撞数据，例如接触和约束。

### 保存并加载你的物理场景

![加载你的物理场景](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b33d4165-a7c7-4289-8590-421f053151e7/chaos-visual-debugger-1.png)

该工具可以记录会话并将其保存到磁盘以供稍后检查。保存的资产独立于项目本身，也就是任何人都可以将CVD资产加载到虚幻引擎中以分析物理场景。

### 可视化场景数据

![色彩模式：状态](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61dba4a2-e30f-4b6f-98d0-4a036c91448a/chaos-visual-debugger-2a.png)

![色彩模式：形状类型](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d382a57c-0986-4cb9-aae6-6ede2d01a639/chaos-visual-debugger-2b.png)

色彩模式：状态

色彩模式：形状类型

加载后，你可以根据粒子的 **状态** 、 **形状类型** 或粒子是否 **在客户端或服务器上处于激活状态** ，对粒子进行颜色编码，从而直观地显示场景。

你还可以直观地显示以下内容：

-   **全局粒子数据（Global Particle Data）**：在视口中显示选定粒子或所有粒子的速度、加速度、冲量、连接边缘和质心。
-   **全局碰撞数据（Global Collision Data）**：在视口中显示选定粒子或所有粒子的接触点、法线、冲量和推出。
-   **全局场景查询（Global Scene Queries）**：绘制场景查询，例如扫描、线迹和按源重叠。
-   **全局关节数据（Global Joint Data）**：在视口中显示选定粒子或所有粒子的推出、连接器、拉伸、轴以及粒子是否正在被模拟或运动。

### 调试碰撞

![调试碰撞](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6479df22-fefc-4fd3-b32e-264ddc4f0b9d/chaos-visual-debugger-3.png)

CVD可以通过显示每个粒子的以下数据来帮助调试碰撞：

-   **接触点（Contact Points）**：在粒子上绘制碰撞接触点。
-   **接触信息（Contact Info）**：绘制其他碰撞信息，例如粒子的过度穿透。
-   **净推出（Net Push Out）**：绘制粒子的推出力。
-   **净冲量（Net Impulse）**：绘制该接触点施加的总冲量。
-   **接触法线（Contact Normal）**：在第二个形状上绘制形状空间接触法线，指向远离第一个形状的方向。
-   **累积冲量（Accumulated Impulse）**：绘制碰撞约束中的累积冲量。
-   **绘制未激活接触点（Draw Inactive Contacts）**：绘制已生成的碰撞接触点，但这些接触点要么被标记为无效，要么没有任何计算出的推出力或冲量值。

### 调试场景查询

![调试场景查询](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0058cfab-c547-460e-a573-ae11d0e7eaaf/chaos-visual-debugger-4.png)

CVD可以通过显示每个粒子的以下数据来帮助调试场景查询：

-   **线迹查询（Line Trace Queries）**：绘制与粒子相关的线迹。
-   **扫描查询（Sweep Queries）**：绘制与粒子相关的扫描。
-   **重叠查询（Overlap Queries）**：绘制与粒子相关的重叠。
-   **命中（Hits）：** 绘制与粒子相关的命中。
-   **服务器查询（Server Queries）**：绘制在服务器上执行的粒子查询。
-   **客户端查询（Client Queries）**：绘制在客户端执行的粒子查询。

### 实时会话调试

![实时会话调试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbbc8c0f-3c23-49fe-8767-dd8f1f4e3dc1/chaos-visual-debugger-live.gif)

你可以连接到实时Gameplay会话，并实时查看Chaos物理场景。这在游戏运行时提供了上下文中的运行时调试功能。会话可以是本地会话（在同一工作站或PIE上），也可以是通过网络进行的会话。

你可以随时停止实时会话，并继续使用记录的数据进行调试。

### 调试服务器阶段

目前可供记录的解算器阶段如下

-   **演变开始（Evolution Start）**：在解算器步骤开始时，对所有粒子拍摄快照。
-   **合并后（Post-Integrate）**：对粒子执行合并计算后，对所有粒子拍摄快照。
-   **碰撞检测粗略阶段（Collision Detection Broad Phase）**：在运行碰撞检测过程的粗略阶段后，对所有中间阶段（为每个边界重叠的粒子对创建对象）拍摄快照。
-   **碰撞检测精确阶段（Collision Detection Narrow Phase：** 在运行碰撞检测过程的精确阶段后，对所有中间阶段（为每个边界重叠的粒子对创建对象）拍摄快照。
-   **预约束解算（Pre Constraint Solve）**：在开始解算可用约束之前，对所有粒子拍摄快照。
-   **后约束解算（Post Constraint Solve）**：在解算约束之后，对所有粒子拍摄快照
-   **演变结束（Evolution End）**：在解算器步骤结束时，对所有粒子拍摄快照。

## 检查物理数据

### 粒子数据检查器

![粒子数据检查器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c334f24-f3ec-4490-8ccb-28cc3cb38544/chaos-visual-debugger-7.png)

**粒子数据检查器（Particle Data Inspector）** 或细节面板将显示有关场景中选定粒子的信息。

对于给定粒子，检查器显示可视化标记、粒子数据（例如旋转和速度）、粒子动力和粒子质量属性设置。

### 碰撞数据检查器

![碰撞数据检查器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5ee4b86-bf0f-4db9-a742-2b15fe2009c8/chaos-visual-debugger-8.png)

**碰撞数据检查器（Collision Data Inspector）** 显示选定粒子的数据。当选定一个粒子时，你可以通过下拉菜单查看该粒子所属的所有 **中间阶段对** 。你可以进一步选择特定的中间阶段对进行检查，并查看约束数据。

**中间阶段对** 是为每个边界重叠的粒子对创建的对象。中间阶段对负责编译一组可能发生碰撞的形状对，并在每次函数更新时对这些形状对运行碰撞检测。

当选定一个接触点时，你可以查看该接触点的所有数据以及该粒子所属的约束数据。

### 场景查询检查器

![场景查询检查器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b85c649-f552-4c3a-8118-7f217d04bc4f/chaos-visual-debugger-9.png)

**场景查询检查器（Scene Query Inspector）** 可以帮助你检查场景中的特定场景查询。如果你选择任何可视化查询，你可以在检查器中查看所有相关数据，包括为采集结果而执行的每个内部步骤（SQ Visit）。

场景查询是针对加速结构（如AABBTree）进行的，旨在减少需要求值的对象数量。当执行查询时，将对加速结构中与查询区域相对应的节点进行求值。此节点求值是场景查询检查器显示为SQ Visit的内容，你可以在其中查看在特定查询点采集的数据。

场景查询检查器具有步进时间轴控制，用于单步调试每次记录的SQ Visit。当检查器中的步骤发生变化时，视口将被更新以绘制直至选定步骤的查询。

对于你预期某个对象是查询结果的一部分（如重叠）但未检测到该对象的调试情况，这很有用。通过单步调试每次SQ Visit，你可以确定该对象是否一开始就被求值了，如果是，那么你可以调查对象被忽略的原因。

一些查询可以执行子追踪，在这种情况下，检查器将显示一个按钮，可以通过该按钮前往父查询或子查询数据（如果可用）。

### 关节约束数据检查器

![关节约束数据检查器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2b2affd-cb45-4269-9cb8-9f0b92d20d53/chaos-visual-debugger-10.png)

**关节约束数据检查器（Joint Constraint Data Inspector）** 可帮助你检查视口中选定的关节。选择可视化关节将打开检查器（如果关闭）并显示该帧中关节的状态。

检查器将显示关节状态以及它是否在该帧中接收角度和线性冲量。此外，其中还将展示几个关节设置，例如刚度、线性和角度投影、冲击传播以及传送距离和角度。

如需详细了解 **Chaos视觉调试器** ，请参阅[Chaos视觉调试器 - 用户指南](https://dev.epicgames.com/community/learning/tutorials/EpnO/unreal-engine-chaos-visual-debugger-user-guide)。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/chaos-visual-debugger-overview-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [支持的功能](/documentation/zh-cn/unreal-engine/chaos-visual-debugger-overview-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84%E5%8A%9F%E8%83%BD)
-   [保存并加载你的物理场景](/documentation/zh-cn/unreal-engine/chaos-visual-debugger-overview-in-unreal-engine#%E4%BF%9D%E5%AD%98%E5%B9%B6%E5%8A%A0%E8%BD%BD%E4%BD%A0%E7%9A%84%E7%89%A9%E7%90%86%E5%9C%BA%E6%99%AF)
-   [可视化场景数据](/documentation/zh-cn/unreal-engine/chaos-visual-debugger-overview-in-unreal-engine#%E5%8F%AF%E8%A7%86%E5%8C%96%E5%9C%BA%E6%99%AF%E6%95%B0%E6%8D%AE)
-   [调试碰撞](/documentation/zh-cn/unreal-engine/chaos-visual-debugger-overview-in-unreal-engine#%E8%B0%83%E8%AF%95%E7%A2%B0%E6%92%9E)
-   [调试场景查询](/documentation/zh-cn/unreal-engine/chaos-visual-debugger-overview-in-unreal-engine#%E8%B0%83%E8%AF%95%E5%9C%BA%E6%99%AF%E6%9F%A5%E8%AF%A2)
-   [实时会话调试](/documentation/zh-cn/unreal-engine/chaos-visual-debugger-overview-in-unreal-engine#%E5%AE%9E%E6%97%B6%E4%BC%9A%E8%AF%9D%E8%B0%83%E8%AF%95)
-   [调试服务器阶段](/documentation/zh-cn/unreal-engine/chaos-visual-debugger-overview-in-unreal-engine#%E8%B0%83%E8%AF%95%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%98%B6%E6%AE%B5)
-   [检查物理数据](/documentation/zh-cn/unreal-engine/chaos-visual-debugger-overview-in-unreal-engine#%E6%A3%80%E6%9F%A5%E7%89%A9%E7%90%86%E6%95%B0%E6%8D%AE)
-   [粒子数据检查器](/documentation/zh-cn/unreal-engine/chaos-visual-debugger-overview-in-unreal-engine#%E7%B2%92%E5%AD%90%E6%95%B0%E6%8D%AE%E6%A3%80%E6%9F%A5%E5%99%A8)
-   [碰撞数据检查器](/documentation/zh-cn/unreal-engine/chaos-visual-debugger-overview-in-unreal-engine#%E7%A2%B0%E6%92%9E%E6%95%B0%E6%8D%AE%E6%A3%80%E6%9F%A5%E5%99%A8)
-   [场景查询检查器](/documentation/zh-cn/unreal-engine/chaos-visual-debugger-overview-in-unreal-engine#%E5%9C%BA%E6%99%AF%E6%9F%A5%E8%AF%A2%E6%A3%80%E6%9F%A5%E5%99%A8)
-   [关节约束数据检查器](/documentation/zh-cn/unreal-engine/chaos-visual-debugger-overview-in-unreal-engine#%E5%85%B3%E8%8A%82%E7%BA%A6%E6%9D%9F%E6%95%B0%E6%8D%AE%E6%A3%80%E6%9F%A5%E5%99%A8)
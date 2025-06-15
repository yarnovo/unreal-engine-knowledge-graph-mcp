# 虚幻引擎中的群体避障概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mass-avoidance-overview-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:42:32.986Z

---

目录

![群体避障概述](https://dev.epicgames.com/community/api/documentation/image/b4ed9767-551a-4766-a0f7-dd0e8e1893b7?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

## 概述

**群体避障（Mass Avoidance）** 是集成在[MassEntity](/documentation/zh-cn/unreal-engine/overview-of-mass-entity-in-unreal-engine)中的基于力的避障系统。该系统可为使用MassEntity系统的所有实体提供高性能避障。

该系统使用 **UMassMovingAvoidanceProcessor** 处理多个输入，并将转向力输出到 **FMassForceFragment** 中。输出力将用于调整实体的方向，使其绕开环境中的其他实体。

## 系统输入

**输入**

**说明**

**FMassForceFragment**

代表施加给实体力，以便该实体离开其他实体。

**FMassNavigationEdgesFragment**

提供了用于实体避障的边缘（墙壁）列表。

**FMassMoveTargetFragment**

代表实体的目的地。其中还包含了其他信息，例如正前方向和当前状态（静止不动、正在移动等）

**FDataFragment\_Transform**

代表实体的变换。

**FMassVelocityFragment**

代表实体的速度。

**FDataFragment\_AgentRadius**

代表实体的半径。

## 系统输出

**输出**

**说明**

**FMassForceFragment**

为实体施加的最终转向力。

## 系统执行

### UMassMovingAvoidanceProcessor

**UMassMovingAvoidanceProcessor** 会计算每个实体的分离力和避障力的总和。这些力是由附近的实体和障碍产生的。

其他实体会以碰撞物（见FMassAvoidanceColliderFragment）的形式呈现，对于人类和载具，分别呈胶囊和药丸形状。你可以调整多项设置，平衡这些力的效果。

附近的实体会通过 **FNavigationObstacleHashGrid2D**（归属于 **UMassNavigationSubsystem**）采集，并且只会考虑最接近的实体。障碍物会以边缘的形式呈现，主要来自 **FMassNavigationEdgesFragment**。 避障力是预测性的，其方向是根据未来的碰撞位置所计算的。分离力术语正交力，旨在与环境保持一定的距离。

### UMassStandingAvoidanceProcessor

**UMassStandingAvoidanceProcessor** 是一个类似的处理器，主要在实体静止不动时使用。

### UMassNavigationObstacleGridProcessor

**UMassNavigationObstacleGridProcessor** 可用于将障碍物信息传递到 **FNavigationObstacleHashGrid2D** 中。

### UMassZoneGraphLaneCacheBoundaryProcessor

**UMassZoneGraphLaneCacheBoundaryProcessor** 会与区域图表结合使用，为当前追踪的缓存道路部分构造边缘（见FMassZoneGraphCachedLaneFragment和FMassZoneGraphPathFollowTask）。

这些边缘会被添加到 **FMassNavigationEdgesFragment** 里。

### 系统设置

群体避障设置会存储在 **FMassMovingAvoidanceParameters** 和 **FMassStandingAvoidanceParameters** 中。要查看所有可用设置的详细说明，请参考项目文件中的 **MassAvoidanceFragments.h**，了解设置选项的详细信息。

## 群体避障调试

你可以使用 **可视化日志（Visual Logger）** 和 **Gameplay调试程序（Gameplay Debugger）**，对群体避障系统进行调试。

### 可视化日志

你可以使用 **可视化日志**，在编辑器中显示以下类别：

**类别**

**说明**

**LogAvoidance**

显示基础信息，例如初始和最终转向力，以及当前实体。

**LogAvoidanceVelocity**

显示实体的当前速度和理想速度。

**LogAvoidanceAgents**

显示障碍物边缘、预测碰撞和实体相关的力。

#### 启用可视化日志

1.  点击 **工具 > 调试 > 可视化日志（Tools > Debug > Visual Logger）**，打开 **可视化日志（Visual Logger）** 窗口。
    
    ![点击工具-调试-可视化日志以打开可视化日志窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b39e4bf4-21e7-40cc-899b-f43d843c2c0d/ma-overview-vl-1.png)
2.  在列表中选择 **MassSimulationSubsystem** 轨道。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0dd5191d-9bab-409d-a18e-3fe823ccb4f2/ma-overview-vl-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0dd5191d-9bab-409d-a18e-3fe823ccb4f2/ma-overview-vl-2.png)
    
3.  进入 **编辑 > 编辑器偏好设置（Edit > Editor Preferences）**，打开 **编辑器偏好设置** 窗口。点击 **可视化日志（Visual Logger）** 类别，启用 **装载最新数据（Stick to Recent Data）** 勾选框，显示实时数据。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e20e55f8-6240-4981-b66c-9d4a57529877/ma-overview-vl-3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e20e55f8-6240-4981-b66c-9d4a57529877/ma-overview-vl-3.png)
    
4.  按下 **~** 键打开 **命令行**，输入 **ai.debug.mass.DebugEntity** 或 **ai.debug.mass.SetDebugEntityRange**，设置在调试期间显示的实体。
    
5.  按下 **运行设置菜单（Play Settings menu）** 按钮，点击 **模拟（Simulate）**，在编辑器中查看可视化窗口。
    
    ![Press Simulate](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8c688a8-9cd7-4c4f-ad95-0f8481872359/ma-overview-vl-4.png) ![按下模拟在编辑器中查看可视化调试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bd74b35-5ca8-404d-a668-7e78b73d6012/ma-overview-vl-demo.gif)

要进一步了解如何使用可视化日志，请参考[可视化日志](/documentation/zh-cn/unreal-engine/visual-logger-in-unreal-engine)文档。

### Gameplay调试程序

你可以使用 **Gameplay调试程序**，在编辑器中显示实体的移动目标、转向和碰撞物等信息。

#### 启用Gameplay调试程序

在游戏运行时，按下 **\`** 键可以激活Gameplay调试程序。随后按下 **Shift+O** 可以查看 **实体概况**，按下 **Shift+V** 则可显示 **避障**。

![在游戏运行时按下 ` 键，激活Gameplay调试程序](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bd52f99-0b94-4527-b256-035c6999a2bc/ma-overview-gd-demo.gif)

打开 **GameplayDebuggerCategory\_Mass.cpp** 源文件可以查看更多信息，了解如何为Mass Avoidance使用Gameplay调试程序。

-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [mass](https://dev.epicgames.com/community/search?query=mass)
-   [avoidance](https://dev.epicgames.com/community/search?query=avoidance)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/mass-avoidance-overview-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [系统输入](/documentation/zh-cn/unreal-engine/mass-avoidance-overview-in-unreal-engine#%E7%B3%BB%E7%BB%9F%E8%BE%93%E5%85%A5)
-   [系统输出](/documentation/zh-cn/unreal-engine/mass-avoidance-overview-in-unreal-engine#%E7%B3%BB%E7%BB%9F%E8%BE%93%E5%87%BA)
-   [系统执行](/documentation/zh-cn/unreal-engine/mass-avoidance-overview-in-unreal-engine#%E7%B3%BB%E7%BB%9F%E6%89%A7%E8%A1%8C)
-   [UMassMovingAvoidanceProcessor](/documentation/zh-cn/unreal-engine/mass-avoidance-overview-in-unreal-engine#umassmovingavoidanceprocessor)
-   [UMassStandingAvoidanceProcessor](/documentation/zh-cn/unreal-engine/mass-avoidance-overview-in-unreal-engine#umassstandingavoidanceprocessor)
-   [UMassNavigationObstacleGridProcessor](/documentation/zh-cn/unreal-engine/mass-avoidance-overview-in-unreal-engine#umassnavigationobstaclegridprocessor)
-   [UMassZoneGraphLaneCacheBoundaryProcessor](/documentation/zh-cn/unreal-engine/mass-avoidance-overview-in-unreal-engine#umasszonegraphlanecacheboundaryprocessor)
-   [系统设置](/documentation/zh-cn/unreal-engine/mass-avoidance-overview-in-unreal-engine#%E7%B3%BB%E7%BB%9F%E8%AE%BE%E7%BD%AE)
-   [群体避障调试](/documentation/zh-cn/unreal-engine/mass-avoidance-overview-in-unreal-engine#%E7%BE%A4%E4%BD%93%E9%81%BF%E9%9A%9C%E8%B0%83%E8%AF%95)
-   [可视化日志](/documentation/zh-cn/unreal-engine/mass-avoidance-overview-in-unreal-engine#%E5%8F%AF%E8%A7%86%E5%8C%96%E6%97%A5%E5%BF%97)
-   [启用可视化日志](/documentation/zh-cn/unreal-engine/mass-avoidance-overview-in-unreal-engine#%E5%90%AF%E7%94%A8%E5%8F%AF%E8%A7%86%E5%8C%96%E6%97%A5%E5%BF%97)
-   [Gameplay调试程序](/documentation/zh-cn/unreal-engine/mass-avoidance-overview-in-unreal-engine#gameplay%E8%B0%83%E8%AF%95%E7%A8%8B%E5%BA%8F)
-   [启用Gameplay调试程序](/documentation/zh-cn/unreal-engine/mass-avoidance-overview-in-unreal-engine#%E5%90%AF%E7%94%A8gameplay%E8%B0%83%E8%AF%95%E7%A8%8B%E5%BA%8F)
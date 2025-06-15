# 虚幻引擎中的模拟空白模板 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/simulation-blank-template-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:52:49.052Z

---

目录

![模拟空白模板](https://dev.epicgames.com/community/api/documentation/image/b3d1d097-d0e4-4335-9ee0-d31c3bafe302?resizing_type=fill&width=1920&height=335)

**模拟空白（Simulation Blank）** 模板是一种 **空世界（Empty World）** 关卡模板，内附特定于模拟的设置和功能。它由带有以下功能和特征的空环境组成：

-   作为地面/地板的扁平静态网格体。
    
-   带有特定于地球的设置的[SunSky](/documentation/zh-cn/unreal-engine/geographically-accurate-sun-positioning-tool-in-unreal-engine)系统：
    
    -   与地理配准插件规范兼容的北偏移。
        
    -   带有逼真太阳属性（ **强度（Intensity）** 、 **源角度（Source Angle）** ）的定向光源，投射利用[虚拟阴影贴图](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine)系统的远阴影（需要在 **项目设置（Project Settings）> 平台 - Windows（Platforms - Windows）** 下启用 **DirectX 12（SM6试验性）（DirectX 12 (SM6.Experimental)）** 选项，还需要兼容的显卡）。
        
-   [体积云](/documentation/zh-cn/unreal-engine/volumetric-cloud-component-in-unreal-engine)，带有外观自然的材质。
    
-   [指数高度雾](/documentation/en-us/unreal-engine/exponential-height-fog-in-unreal-engine)。
    
-   星星（请注意，这些仅用于美化目的，并不能准确表示给定现实世界位置的真实星星定位）。
    
-   带有对应人眼视觉的 **曝光（Exposure）** 设置的全局后期处理体积。
    
-   [地理配准](/documentation/zh-cn/unreal-engine/georeferencing-a-level-in-unreal-engine)Actor，用于定位地球上的环境。
    

SunSky和地理配准Actor中UE原点的地理位置已设置为73W, 45N。你必须根据实际环境位置酌情调整。

该模板还随附自定义 `BP_SimGameMode` 蓝图，它定义了特定 `BP_SimPlayerController` 和 `BP_SimfloatingPawn` 。这些蓝图示例说明了如何增强Controller和Pawn基类的默认功能，详见下文。

## 模拟玩家控制器（BP\_SimPlayerController）

该控制器随附一些快捷键，用于在运行时允许以下玩家操作：

-   使用运行之时生成的浮动Pawn自由寻路（ `BP_SimfloatingPawn` ）。
    
-   在此浮动Pawn和关卡中已存在的Pawn之间交替。
    
-   控制当日时间。
    
-   显示分析和统计数据控件。
    
-   显示地理空间位置状态栏。
    

以下键盘快捷键可供使用：

**键**

**操作**

Pawn功能按钮

 

**Enter**

在浮动Pawn和预先存在的关卡Pawn之间交替。

**Tab**

控制关卡Pawn时，切换到下一个可控制的Pawn。

**Shift + Tab**

控制关卡Pawn时，切换到上一个可控制的Pawn。

**1 - 6**

用于控制特定关卡Pawn的直接快捷键。如果数量超过6个，请使用 **Tab** 键。

当日时间功能按钮

 

**End**

减少当前的当日时间。

**Page Down**

增加当前的当日时间。

**Insert**

将当日时间平滑过渡到黎明值。

**Home**

将当日时间平滑过渡到中午值。

**Page Up**

将当日时间平滑过渡到傍晚值。

控件功能按钮

 

**P**

显示/隐藏分析控件。

**G**

显示/隐藏地理空间控件。

### 地理空间控件

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/441e8c8f-9f1c-448a-8511-24f86d81743a/geospatial-widget.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/441e8c8f-9f1c-448a-8511-24f86d81743a/geospatial-widget.png)

点击查看大图。

**地理空间控件（Geospatial Widget）** 是在不同坐标系中显示你在地球上的当前位置的状态栏：

-   投影CRS。
    
-   地理CRS（纬度/经度）。
    
-   地心（ECEF）。
    

如需更多信息，请参阅[关卡地理配准](/documentation/zh-cn/unreal-engine/georeferencing-a-level-in-unreal-engine)页面。

### 分析控件

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a705099-86ea-49e7-8a43-7ad839ec73cb/profiling-widget.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a705099-86ea-49e7-8a43-7ad839ec73cb/profiling-widget.png)

点击查看大图。

**分析控件（Profiling Widget）** 是用于分析应用程序性能的调试工具。

左侧按钮堆栈将显示或隐藏不同的性能计数器，你也可以通过关联的 `stat counterName` 控制台命令访问这些计数器。控件显示了最常见、最有用的计数器：

-   FPS
    
-   Unit
    
-   Engine
    
-   SceneRendering
    
-   Game
    
-   GPU
    

由于分析与每秒帧数（FPS）密切相关，你可以在第二列按钮中启用或禁用垂直同步（VSync），或根据需要将FPS限制为30或60FPS。

## 模拟浮动Pawn（BP\_SimfloatingPawn）

模拟浮动Pawn是虚幻引擎默认Pawn的改进版本，增加了使用 **鼠标滚轮** 控制最大寻路速度的功能。这有助于处理大型环境。

**点击** 鼠标滚轮将重置为默认速度。

-   [templates](https://dev.epicgames.com/community/search?query=templates)
-   [simulation](https://dev.epicgames.com/community/search?query=simulation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [模拟玩家控制器（BP\_SimPlayerController）](/documentation/zh-cn/unreal-engine/simulation-blank-template-in-unreal-engine#%E6%A8%A1%E6%8B%9F%E7%8E%A9%E5%AE%B6%E6%8E%A7%E5%88%B6%E5%99%A8%EF%BC%88bp-simplayercontroller%EF%BC%89)
-   [地理空间控件](/documentation/zh-cn/unreal-engine/simulation-blank-template-in-unreal-engine#%E5%9C%B0%E7%90%86%E7%A9%BA%E9%97%B4%E6%8E%A7%E4%BB%B6)
-   [分析控件](/documentation/zh-cn/unreal-engine/simulation-blank-template-in-unreal-engine#%E5%88%86%E6%9E%90%E6%8E%A7%E4%BB%B6)
-   [模拟浮动Pawn（BP\_SimfloatingPawn）](/documentation/zh-cn/unreal-engine/simulation-blank-template-in-unreal-engine#%E6%A8%A1%E6%8B%9F%E6%B5%AE%E5%8A%A8pawn%EF%BC%88bp-simfloatingpawn%EF%BC%89)

相关文档

[

运行和模拟

![运行和模拟](https://dev.epicgames.com/community/api/documentation/image/1b10ee72-f9fc-4135-8030-366605b4187a?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/playing-and-simulating-in-unreal-engine)
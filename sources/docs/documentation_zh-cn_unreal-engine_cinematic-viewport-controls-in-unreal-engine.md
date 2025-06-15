# 虚幻引擎中的过场动画视口控制选项 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cinematic-viewport-controls-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:13:41.837Z

---

目录

![过场动画视口](https://dev.epicgames.com/community/api/documentation/image/193402ee-f3c2-42a3-8c08-23b8bb7c84cf?resizing_type=fill&width=1920&height=335)

在虚幻编辑器中，你可以将 **关卡视口（Level Viewport）** 更改为专用的 **过场动画视口（Cinematic Viewport）** 。过场动画视口支持附加功能、行为和显示模式，可帮助你创建过场动画内容。本指南概述了如何启用过场动画视口及其功能。

#### 先决条件

-   你有一个正在使用Sequencer的项目。如果没有，你可以使用提供的[**过场动画示例**](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine#%E8%BF%87%E5%9C%BA%E5%8A%A8%E7%94%BB%E7%A4%BA%E4%BE%8B)之一。
    
-   **[Sequencer](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)** 当前在你的关卡中打开。
    

## 启用过场动画视口

要启用过场动画视口（Cinematic Viewport）模式，请选择 **视口视角（Viewport Perspective）** 菜单，并启用 **过场动画视口** 。

![启用过场动画视口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93888cb7-2902-4b14-b2d8-085c573dc7e3/enableviewport.png)

## 概述

启用过场动画视口（**Sequencer** ）并打开 **Sequencer** 后，你的视口现在应该显示新的过场动画元素。

![过场动画视口布局](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb96c9d7-74ad-4499-979d-0cb5381b1559/overview.png)

1.  [**电影覆层**](/documentation/zh-cn/unreal-engine/cinematic-viewport-controls-in-unreal-engine#%E7%94%B5%E5%BD%B1%E8%A6%86%E5%B1%82)
    
2.  [**播放预览和功能按钮**](/documentation/zh-cn/unreal-engine/cinematic-viewport-controls-in-unreal-engine#%E6%92%AD%E6%94%BE%E9%A2%84%E8%A7%88%E5%92%8C%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
    

### 电影覆层

**电影覆层（Film Overlays）** 菜单包含视口的视觉效果导线，你可以启用这些导线帮助你取景和构图。覆层类别主要有两种，即 **构图（Composition）** 和 **帧（Frame）** 覆层。

![电影覆层菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/623c6131-e89c-4387-a453-b0525cd13fa9/overlaysmenu.png)

#### 构图覆层

名称

说明

**禁用（Disabled）**

默认视图模式，不显示覆层。

**网格（Grid）（3x3）**

在视口上显示3x3网格，允许基于 **[三分法则](https://en.wikipedia.org/wiki/Rule_of_thirds)** 取景。

![3x3网格](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9151fb71-0bf3-4217-a7d8-ad256a86ab8a/3x3.png)

**网格（Grid）（2x2）**

在视口上显示2x2网格。

![2x2网格](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed77a984-c387-4262-a00d-84dfb550328f/2x2.png)

**十字准线（Crosshair）**

显示中央标线，可用于模拟摄影标线。

![十字准线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0064e88c-1a50-4f69-9b1c-048edd04a871/crosshair.png)

**栅格化（Rabatment）**

在视口上显示栅格化覆层，允许基于 **[矩形栅格化](https://en.wikipedia.org/wiki/Rabatment_of_the_rectangle)** 取景。

![栅格化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2cc0716c-783e-4273-8991-68401d930b9f/rabatment.png)

构图覆层线也可以着色为你想要的颜色或阿尔法值。点击 **色调（Tint）** 旁边的颜色条，将打开 **取色器（Color Picker）** ，你可以在其中选择线条的颜色和透明度。

![构图线条颜色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbb35f27-b89f-464b-bffd-da5b138f3afa/comptinting.gif)

#### 帧覆层

**帧覆层（Frame Overlays）** 是用于在给图片组帧时模拟 **[安全区域](https://en.wikipedia.org/wiki/Safe_area_%28television%29)** 或 **[黑边](https://en.wikipedia.org/wiki/Letterboxing_%28filming%29)** 的准线。

名称

说明

**操作安全（Action Safe）**

显示"操作"安全准线。默认情况下，它位于屏幕空间边距的 **95%** 处，颜色为 **红色**。

![操作安全准线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b2434aa-aab9-4a33-9cc1-866676a0077f/action.png)

**标题安全（Title Safe）**

显示"标题"安全准线。默认情况下，它位于屏幕空间边距的 **90%** 处，颜色为 **黄色** 。

![标题安全准线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/602dacd6-4fdc-4edc-80e2-5dd3c26fc532/title.png)

**自定义安全（Custom Safe）**

显示自定义安全准线。默认情况下，它位于屏幕空间边距的 **85%** 处，颜色为 **绿色** 。

![自定义安全准线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1de309fb-342f-4c6a-9e88-f5349e27e74b/custom.png)

**黑边遮罩（Letterbox Mask）**

显示黑边覆层，显示目标纵横比将从原始图像中裁剪的比例。默认情况下，黑边纵横比为 **2.35:1** 。

![黑边覆层](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2923e4a-f780-4c77-9e61-0b8f0c1aa5c0/letterbox.png)

你需要确保在你的[**摄像机属性**](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine#%E5%B1%9E%E6%80%A7)上启用了 **约束纵横比（Constrain Aspect Ratio）** 属性，以便黑边适用于你的摄像机传感器尺寸。

每个安全区域条目旁边都有百分比字段，对应于准线的屏幕大小。值为100%时，准线到达屏幕的外边缘，而为0%时，准线到达屏幕的中心点。准线范围限制在1%到99%之间，以保持完全可见。

![安全区域大小](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc0bbf80-3023-4a54-8d1f-f576c00c706e/safesize.gif)

你可以在 **黑边遮罩（Letterbox Mask）** 条目旁边输入不同的黑边纵横比。这样做会改变黑边的形状，以符合输入的纵横比。

![黑边比例变化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16171ae5-c0df-4625-b7f8-2351984e475c/letterboxchange.png)

单击其属性下的颜色栏，可以将安全和黑边准线染成任何颜色。此操作将打开 **取色器（Color Picker）** ，你可以在其中选择准线的颜色和透明度。

![帧覆层着色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86dc370f-6aed-4dec-a287-b5941057433c/framestinting.png)

### 播放预览和功能按钮

启用过场动画视口后，新的功能按钮和显示将出现在视口底部。

![过场动画视口播放显示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c3a97f3-f20e-4d4f-8153-e621166e16c9/playbackdisplay.png)

该区域的上部区域显示有关当前拍摄、摄像机和时间的信息。

![过场动画视口时间显示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/838d1700-77c1-4e87-a0d0-f928c0d300b5/timingdisplay.png)

1.  当前 **序列（Sequence）** 和当前 **[摄像机](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine)** 的名称。
2.  当前摄像机的[**胶片背板属性**](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine#%E5%B1%9E%E6%80%A7)。
3.  序列或 **[主序列](/documentation/zh-cn/unreal-engine/sequences-shots-and-takes-in-unreal-engine)** 的当前 **时间** 。

界面上还会显示时间条，你可以使用来自Sequencer的类似[**播放头**](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E6%92%AD%E6%94%BE%E5%A4%B4)交互功能与之交互。显示的时间条与Sequencer中的时间条同步。

![过场动画视口时间条](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/771821c1-0891-4247-b23c-f67bfcb6cb76/timebar.gif)

底部区域显示时间和播放功能按钮。

![过场动画视口播放功能按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8176dd4-4e8b-479a-998c-618ba15c8842/playbackcontrols.png)

1.  **工作范围（Working Range）** 和 **播放范围（Playback Range）** 的开始时间。
2.  激活序列的当前时间。
3.  [**播放功能按钮**](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E6%92%AD%E6%94%BE%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)。单击这些功能按钮，可以播放、暂停和执行其他播放功能。
4.  **播放范围（Playback Range）** 和 **工作范围（Working Range）** 的结束时间。

在底部区域，你可与时间显示进行交互，单击时间显示可输入不同的值，或者单击后左右拖动可擦除值。

![过场动画视口时间交互](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5dd0a948-55f8-4d3d-a8f5-040d312f0ccc/timeinteract.gif)

## 允许过场动画控制

在虚幻引擎中处理过场动画内容时，你可能需要使用 [多个视口（Multiple Viewports）](/documentation/zh-cn/unreal-engine/using-editor-viewports-in-unreal-engine#viewportlayout)，以便结合主过场动画视图从不同视角预览场景。使用 **允许过场动画控制（Allow Cinematic Control）** 选项，你可以选择当 **Sequencer** 具有摄影机控制时应显示过场动画的哪个视口。

![过场动画控制视口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5acadf46-8f51-4d7d-8ccc-695660a526d6/cinecontrol1.png)

**允许过场动画控制（Allow Cinematic Control）** 只能在使用 **视角（Perspective）** 视图模式的视口上启用或禁用。

默认情况下，虚幻引擎的主视口启用了 **允许过场动画控制（Allow Cinematic Control）** 。

![允许过场动画控制](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0fa07f3d-0056-40c9-9739-cf72a1bfa675/4panelcompare.png)

在将多个视口设置为视角（Perspective）视口的情况下，通过在视口选项菜单中启用或禁用 **允许过场动画控制（Allow Cinematic Control）**，你可以选择哪些视口将具有全面的过场动画控制。在大多数情况下，你需要为至少一个视口启用 **允许过场动画控制（Allow Cinematic Control）** ，而对所有其他视口保持禁用状态。

![允许过场动画控制比较](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2eb33fd-70e4-48af-807e-cc2418104016/cinecontrol2.png)

-   [cameras](https://dev.epicgames.com/community/search?query=cameras)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/cinematic-viewport-controls-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [启用过场动画视口](/documentation/zh-cn/unreal-engine/cinematic-viewport-controls-in-unreal-engine#%E5%90%AF%E7%94%A8%E8%BF%87%E5%9C%BA%E5%8A%A8%E7%94%BB%E8%A7%86%E5%8F%A3)
-   [概述](/documentation/zh-cn/unreal-engine/cinematic-viewport-controls-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [电影覆层](/documentation/zh-cn/unreal-engine/cinematic-viewport-controls-in-unreal-engine#%E7%94%B5%E5%BD%B1%E8%A6%86%E5%B1%82)
-   [构图覆层](/documentation/zh-cn/unreal-engine/cinematic-viewport-controls-in-unreal-engine#%E6%9E%84%E5%9B%BE%E8%A6%86%E5%B1%82)
-   [帧覆层](/documentation/zh-cn/unreal-engine/cinematic-viewport-controls-in-unreal-engine#%E5%B8%A7%E8%A6%86%E5%B1%82)
-   [播放预览和功能按钮](/documentation/zh-cn/unreal-engine/cinematic-viewport-controls-in-unreal-engine#%E6%92%AD%E6%94%BE%E9%A2%84%E8%A7%88%E5%92%8C%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [允许过场动画控制](/documentation/zh-cn/unreal-engine/cinematic-viewport-controls-in-unreal-engine#%E5%85%81%E8%AE%B8%E8%BF%87%E5%9C%BA%E5%8A%A8%E7%94%BB%E6%8E%A7%E5%88%B6)
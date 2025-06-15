# 虚幻引擎电视安全区调试 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-tv-safe-zone-debugging-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:42:24.340Z

---

目录

![电视安全区调试](https://dev.epicgames.com/community/api/documentation/image/fc3c2ae8-3988-4ec3-88a8-9e5beacc036c?resizing_type=fill&width=1920&height=335)

在开发虚幻引擎4（UE4）项目时须注意，UI元素和文本不能过于靠近屏幕边缘，以免这些元素出现扭曲失真。为避免出现类似情况，引擎中加入了电视安全区调试工具。该文档说明如何在 UE4 项目中使用此工具。

## 什么是电视安全区

电视安全区或安全域是电视生产中用于描述电视画面区域的术语，确保绝大多数电视观众能够清楚地看到播放内容。总而言之，电视节目最重要的内容将被放置在该区域内，确保在各种电视机上播放时不会出现失真。

您可以在维基百科页面中查阅有关电视安全区和安全域的更多内容：[电视安全区](http://tinyurl.com/zq55mzl).

## 标题安全区（Title Safe Zone）和动作安全区（Action Safe Zone）的区别

UE4 有两种不同类型的电视安全区：标题安全区（Title Safe Zone）和动作安全区（Action Safe Zone）。

-   **T标题安全区 -** 标题安全区可确保UI或文本在查看时不会出现截断或失真。
    
-   **T动作安全区 -** 动作安全区可确保角色或敌人移动时身体部分不会出屏。
    

动作安全区之外的区域在以过扫描显示时可能被裁掉，而动作安全区和标题安全区之间的区域可能被裁掉一部分。部分动作（如其他角色或敌人）发生在该区域中是可以接受的。在许多平台上，动作安全区和标题安全区的尺寸一致。

## 电视安全区命令

以下部分将介绍电视安全区的命令，以及在虚幻引擎 4（UE4）项目中启用并使用电视安全区调试的两种不同方式。

可在 UE4 控制台中直接输入以下电视安全区命令。

命令名

数值

描述

r.DebugSafeZone.Mode

0

显示所有覆层。

r.DebugSafeZone.Mode

1

启用标题安全区。

r.DebugSafeZone.Mode

2

启用动作安全区。

r.DebugSafeZone.OverlayAlpha

0 到 1

控制调试可视覆层的透明度（默认为 0.3）

r.DebugSafeZone.TitleRatio

0 到 1

控制 FDisplayMetrics 中返回的标题安全区边缘（默认为 0.9）。

r.DebugActionZone.ActionRatio

0 到 1

控制 FDisplayMetrics 中返回的动作安全区边缘（默认为 0.9）。

也可将电视安全区命令放置在项目 **\[SystemSettings\]** 部分下的 **DefaultEngine.ini** 文件中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93e4c4ad-91b0-4c25-ae02-017883808b18/sz_default_engine_ini.png)

## 启用标题安全区调试预览

为正确显示安全区的比例，您 **必须** 在 **窗口全屏** 或 **全屏** 状态下运行项目。如果不这么做，安全区将无法正确显示，或显示尺寸小于预期。

以下部分将说明如何在调试预览模式下启用安全区。

1.  前往 **主工具栏** 的 **Play** 部分，点击旁边的白色小箭头变更播放模式选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ac36d68-b111-4928-b99e-9a0fa244fa6a/sz_play_mode.png)
2.  打开 **Play Modes** 菜单后，选择 **New Editor Window (PIE)** 选项，让游戏在新的独立窗口中运行。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45f545d0-90ad-4462-aa9e-da7af2e8dd7e/sz_new_pie.png)
3.  按下 **Play** 按钮在游戏自身的窗口中运行，然后将窗口放大为全屏。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa7e9991-57c0-4df7-baca-a67ec34214c6/sz_fullscreen_window.png)
4.  接着，按下波浪符（~）键打开虚幻控制台，输入`r.DebugSafeZone.Mode 1`，然后按下 **Enter** 键应用。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/687b61ea-0f83-4ad5-be02-5c6bfb77c63e/sz_enter_command.png)
5.  现在，您应该能看到整个播放窗口周边出现了略微透明的红色边界（如下图所示）。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89b659ef-5e05-432c-8da3-b0e3d9d03db9/safe_zone_00.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89b659ef-5e05-432c-8da3-b0e3d9d03db9/safe_zone_00.png)
    
    点击查看全图。
    

## 调整安全区和动作区的大小

在虚幻控制台中输入以下命令，调整安全区或动作区的大小。

命令名

数值

描述

r.DebugSafeZone.TitleRatio

范围 0 到 1

控制 FDisplayMetrics 中返回的安全区边缘（默认为 0.9）。

r.DebugActionZone.ActionRatio

范围 0 到 1

控制 FDisplayMetrics 中返回的动作区边缘（默认为 0.9）。

无法同时启用安全区和动作区。如要查看另一个区，必须先禁用当前正在查看的区，然后再启用需要查看的区。

下图中，命令 **r.DebugActionZone.ActionRatio** 将动作区的大小从 0.99 缩小到 0.1。

         ![拖动滑条可显示调整安全区大小的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ecf6e74-1324-4f57-89a0-96b0e6ecd684/sz_1.png) ![拖动滑条可显示调整安全区大小的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3643509-c696-476f-9008-f76fce0598ae/sz_2.png) ![拖动滑条可显示调整安全区大小的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ec770aa-904b-4b92-b5f3-e782e6e9929a/sz_3.png) ![拖动滑条可显示调整安全区大小的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4269259-de1d-4688-8c62-b76d9aab6a64/sz_4.png) ![拖动滑条可显示调整安全区大小的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d5c1400-d903-4f3d-aeb6-1134e033fd5a/sz_5.png) ![拖动滑条可显示调整安全区大小的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eabf0101-59c6-4179-a2b6-d492fd0181d0/sz_6.png) ![拖动滑条可显示调整安全区大小的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63f5a5f9-aad3-4a29-b30b-de917aa119b0/sz_7.png) ![拖动滑条可显示调整安全区大小的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0fd977b6-cbb4-4ffc-a71c-9d92b79310c4/sz_8.png) ![拖动滑条可显示调整安全区大小的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a66af69-320a-4b39-a6d7-cac34e1a8a04/sz_9.png) ![拖动滑条可显示调整安全区大小的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8395118-f91c-404a-8be4-b4db2192d5c6/sz_10.png)

**拖动滑条可显示调整安全区大小的效果。**

## 调整安全区和动作区覆层的透明度

在虚幻控制台中输入以下命令，增加/减少安全区和动作区的不透明度。

命令名

数值

描述

r.DebugSafeZone.OverlayAlpha

0 到 1

控制安全区和动作区覆层的不透明度（默认为 0.3）。

在下图中可了解到 r.DebugSafeZone.OverlayAlpha 数值从 1.0 设为 0.1 后安全区和动作区覆层不透明度的变化。

         ![拖动滑条可显示调整 Alpha 覆层不透明度的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bc3d31d-ced6-4667-bae4-23c3f3f1b56e/sza_1.png) ![拖动滑条可显示调整 Alpha 覆层不透明度的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/949ea977-cf20-4f13-87ff-8e2561eda8b9/sza_2.png) ![拖动滑条可显示调整 Alpha 覆层不透明度的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c7d79e1-4469-437a-957f-4a9f42e582c0/sza_3.png) ![拖动滑条可显示调整 Alpha 覆层不透明度的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0c28b4b-616e-4b3f-b04f-c891c3920072/sza_4.png) ![拖动滑条可显示调整 Alpha 覆层不透明度的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fff05386-1a67-4ece-adf5-3fd9a7220226/sza_5.png) ![拖动滑条可显示调整 Alpha 覆层不透明度的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1da458c7-77ea-45df-a9ec-20896911f03b/sza_6.png) ![拖动滑条可显示调整 Alpha 覆层不透明度的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2eaf6a4a-19c5-4582-ab42-782190fadf75/sza_7.png) ![拖动滑条可显示调整 Alpha 覆层不透明度的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3bc73b46-21c8-4a1f-944b-e54f58678884/sza_8.png) ![拖动滑条可显示调整 Alpha 覆层不透明度的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60150802-4f45-46b6-aa14-e9b9f9e18c79/sza_9.png) ![拖动滑条可显示调整 Alpha 覆层不透明度的效果。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c964c2d5-66d0-44d4-a21e-6dcf3acfca0e/sza_10.png)

**拖动滑条可显示调整 Alpha 覆层不透明度的效果。**

## 电视安全区疑难排解

以下部分介绍需要注意的一些信息，确保正确使用电视安全区。

-   现在安全区根据全屏尺寸进行定义（API 并非针对非主机平台设计），不会直接返回比例在窗口模式中使用。此项在未来的版本中可能会进行修改，但当下需要在 **窗口全屏** 或 **全屏** 下运行才能获得正确比例。
    
-   当前 UI 还无法在运行时处理此修改，因此在运行中通过控制台变更标题比例/动作比例时需要切换游戏模式方可显示变化（如：从前端到游戏中，或相反，或再次"open FrontEndScene"）。
    
-   在 PS4 上使用此工具时只需要第一个命令 **r.DebugSafeZone.Mode 1**，因为可在 PS4 操作系统菜单中选择系统设置决定安全区数值。
    

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [debugging](https://dev.epicgames.com/community/search?query=debugging)
-   [safe zone](https://dev.epicgames.com/community/search?query=safe%20zone)
-   [safe zones](https://dev.epicgames.com/community/search?query=safe%20zones)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [什么是电视安全区](/documentation/zh-cn/unreal-engine/setting-up-tv-safe-zone-debugging-in-unreal-engine#%E4%BB%80%E4%B9%88%E6%98%AF%E7%94%B5%E8%A7%86%E5%AE%89%E5%85%A8%E5%8C%BA)
-   [标题安全区（Title Safe Zone）和动作安全区（Action Safe Zone）的区别](/documentation/zh-cn/unreal-engine/setting-up-tv-safe-zone-debugging-in-unreal-engine#%E6%A0%87%E9%A2%98%E5%AE%89%E5%85%A8%E5%8C%BA%EF%BC%88titlesafezone%EF%BC%89%E5%92%8C%E5%8A%A8%E4%BD%9C%E5%AE%89%E5%85%A8%E5%8C%BA%EF%BC%88actionsafezone%EF%BC%89%E7%9A%84%E5%8C%BA%E5%88%AB)
-   [电视安全区命令](/documentation/zh-cn/unreal-engine/setting-up-tv-safe-zone-debugging-in-unreal-engine#%E7%94%B5%E8%A7%86%E5%AE%89%E5%85%A8%E5%8C%BA%E5%91%BD%E4%BB%A4)
-   [启用标题安全区调试预览](/documentation/zh-cn/unreal-engine/setting-up-tv-safe-zone-debugging-in-unreal-engine#%E5%90%AF%E7%94%A8%E6%A0%87%E9%A2%98%E5%AE%89%E5%85%A8%E5%8C%BA%E8%B0%83%E8%AF%95%E9%A2%84%E8%A7%88)
-   [调整安全区和动作区的大小](/documentation/zh-cn/unreal-engine/setting-up-tv-safe-zone-debugging-in-unreal-engine#%E8%B0%83%E6%95%B4%E5%AE%89%E5%85%A8%E5%8C%BA%E5%92%8C%E5%8A%A8%E4%BD%9C%E5%8C%BA%E7%9A%84%E5%A4%A7%E5%B0%8F)
-   [调整安全区和动作区覆层的透明度](/documentation/zh-cn/unreal-engine/setting-up-tv-safe-zone-debugging-in-unreal-engine#%E8%B0%83%E6%95%B4%E5%AE%89%E5%85%A8%E5%8C%BA%E5%92%8C%E5%8A%A8%E4%BD%9C%E5%8C%BA%E8%A6%86%E5%B1%82%E7%9A%84%E9%80%8F%E6%98%8E%E5%BA%A6)
-   [电视安全区疑难排解](/documentation/zh-cn/unreal-engine/setting-up-tv-safe-zone-debugging-in-unreal-engine#%E7%94%B5%E8%A7%86%E5%AE%89%E5%85%A8%E5%8C%BA%E7%96%91%E9%9A%BE%E6%8E%92%E8%A7%A3)
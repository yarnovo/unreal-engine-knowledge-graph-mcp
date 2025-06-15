# 虚幻引擎VR分析工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/vr-profiling-tools-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:44:36.510Z

---

目录

![VR分析工具](https://dev.epicgames.com/community/api/documentation/image/80899477-e19c-469f-b47b-5d93ca35a5fb?resizing_type=fill&width=1920&height=335)

本文介绍了适合VR项目使用的性能分析工具。有关性能优化及故障排除的通用信息，你可以使用[Unreal Insights](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)来收集相关项目性能信息。

## Oculus性能HUD

Oculus性能HUD是一个可以用来显示性能信息的工具，无论在编辑器中还是打包的构建版本中都可使用。此工具将帮助验证实际的CPU和GPU时间，排除应用程序执行的所有限制的影响。在Oculus的[文档](https://developer.oculus.com/documentation/native/pc/dg-hud)中有关于屏幕和数值含义的精彩概述。

通常，你会希望查看 **应用程序渲染器时间（Application Render Timing）** 屏幕上的图和数值。这可以让你了解到Oculus合成器所观察到的CPU和GPU时间，从而得到更准确的绘图和GPU时间。

要将Oculus PerfHud配合虚幻引擎（UE）使用，你需要执行下列操作：

1.  首先，转到 `C:\Program Files\Oculus\Support\oculus-diagnostics` 并找到 **OculusDebugTool.exe**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f016507-13cf-4091-94de-7509520140b2/odt_01.png)
2.  双击OculusDebugTool.exe将它打开，然后将 **可见HUD（Visible HUD）** 设置为 **性能（Performance）** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/621aa5de-aff3-47b4-9ee3-b58baea506b5/odt_02.png)
3.  现在启动你的UE项目，戴上Oculus Rift HMD，你会看到Rift上显示关于UE项目的性能信息。要更改显示的信息类型，你需要更改输入到"可见HUD（Visible HUD）"选项的内容，如下图所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08f70d8f-2315-496a-acca-1d945ff82ae6/oculus_perf_hud.jpg)

## SteamVR Frame Timing工具

SteamVR Frame Timing工具可以让你查看VR项目在编辑器中以及打包的构建版本中的性能。此工具将帮助验证实际的CPU和GPU时间，排除应用程序执行的所有限制的影响。在[Valve开发者社区](https://developer.valvesoftware.com/wiki/SteamVR/Frame_Timing)页面上有关于如何打开该工具以及各种数值的相关信息的精彩概述。请注意，你不需要在UE4中进行任何操作就可以使用SteamVR Frame Timing工具。该工具的所有功能和使用都是在SteamVR应用程序中完成的。

## RenderDoc

RenderDoc是一种外部工具，你也可以用它来分析虚幻引擎项目。要将它配合UE使用：

1.  下载最新的[RenderDoc](https://renderdoc.org/builds)。
2.  在RenderDoc中，配置它来启动你的游戏（例如使用相应的命令行参数运行UE5Editor.exe）。
3.  从应用程序的命令行运行 `ToggleDrawEvents`，以获得人类可读的事件。
4.  按F12截图。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Oculus性能HUD](/documentation/zh-cn/unreal-engine/vr-profiling-tools-in-unreal-engine#oculus%E6%80%A7%E8%83%BDhud)
-   [SteamVR Frame Timing工具](/documentation/zh-cn/unreal-engine/vr-profiling-tools-in-unreal-engine#steamvrframetiming%E5%B7%A5%E5%85%B7)
-   [RenderDoc](/documentation/zh-cn/unreal-engine/vr-profiling-tools-in-unreal-engine#renderdoc)
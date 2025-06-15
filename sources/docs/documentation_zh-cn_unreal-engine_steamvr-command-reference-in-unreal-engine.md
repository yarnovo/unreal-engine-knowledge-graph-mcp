# 虚幻引擎SteamVR命令参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/steamvr-command-reference-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:44:58.351Z

---

目录

![SteamVR命令参考](https://dev.epicgames.com/community/api/documentation/image/b066d439-07bd-416e-a702-dcc4f635691c?resizing_type=fill&width=1920&height=335)

在下面你可以找到可用来调节虚幻引擎（UE）与SteamVR的交互方式的各种控制台命令。

命令

描述

**vr.SteamVR.AdaptiveDebugGPUTime**

以毫秒为单位添加到GPU帧时间用于测试。

**vr.SteamVR.AdaptiveGPUTimeThreshold**

以毫秒为单位的时间，作为稳定GPU帧时间的目标。

**vr.SteamVR.PixelDensityAdaptiveDebugCycle**

如果不为零，则自适应像素密度将从最大像素密度循环至最小像素密度，然后再跳转至最大密度。

**vr.SteamVR.PixelDensityAdaptiveDebugOutput**

如果不为零，则自适应像素密度将把调试信息输出到日志。

**vr.SteamVR.PixelDensityAdaptivePostProcess**

如果不为零，当自适应像素密度更改时，我们将对若干帧禁用时空抗锯齿（TAA）以清除缓冲区。

**vr.SteamVR.PixelDensityMax**

浮点形式的最大像素密度。

**vr.SteamVR.PixelDensityMin**

浮点形式的最小像素密度。

**vr.SteamVR.ShowDebug**

如果不为零，则将调试信息绘制到画布。

**vr.SteamVR.UsePostPresentHandoff**

是否使用PostPresentHandoff。如果为true，将有更多GPU时间可用，但前提是场景中没有活动的SceneCaptureComponent2D或WidgetComponents。否则，将破坏异步重投影。

**vr.SteamVR.UseVisibleAreaMesh**

如果不为零，SteamVR除了隐藏区域网格体优化之外，还将使用可用的可见区域网格体。这可能在平台的Beta版本上造成问题。

-   [vr](https://dev.epicgames.com/community/search?query=vr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

相关文档

[

虚拟现实旁观者模式

![虚拟现实旁观者模式](https://dev.epicgames.com/community/api/documentation/image/08494eea-2fce-4040-a1bc-ebd24f14ff0a?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/virtual-reality-spectator-screen-in-unreal-engine)
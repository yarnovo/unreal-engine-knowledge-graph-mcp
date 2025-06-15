# 虚幻引擎中的OpenXR先决条件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/openxr-prerequisites-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:42:59.177Z

---

目录

![OpenXR运行时](https://dev.epicgames.com/community/api/documentation/image/30766648-a7e5-4afe-afe1-b2d93215ec91?resizing_type=fill&width=1920&height=335)

OpenXR运行时

要在虚幻引擎（UE）中开发OpenXR项目，你必须根据开发时针对的平台和硬件安装OpenXR运行时。以下各节介绍如何安装正确的OpenXR运行时以及每个平台需要哪些插件。

目前，UE中某些特定于平台的插件与OpenXR插件不兼容。在你的虚幻项目中使用OpenXR插件时，确保禁用Oculus、SteamVR和Windows Mixed Reality插件。

## Windows Mixed Reality

完成以下项目，以开始在虚幻编辑器中使用你安装了OpenXR的Windows Mixed Reality设备：

-   完成Microsoft的[OpenXR入门指南](https://docs.microsoft.com/en-us/windows/mixed-reality/develop/native/openxr-getting-started#getting-started-with-openxr-for-windows-mixed-reality-headsets)文档中的步骤，在你的计算机上为 **Windows Mixed Reality** 安装 **OpenXR** 运行时。
-   在你的虚幻项目中启用 **OpenXR** 插件。
-   可选：安装[Microsoft OpenXR插件](https://www.fab.com/listings/8c00dec5-60fa-4b23-b861-98ee885419ce)

## Oculus

完成以下项目，以开始在虚幻编辑器中使用你安装了OpenXR的Oculus设备：

-   完成[Oculus先决条件](/documentation/zh-cn/unreal-engine/oculus-prerequisites-in-unreal-engine)中的步骤，以设置你的计算机和设备。
-   在你的虚幻项目中启用 **OpenXR** 插件。

## SteamVR

完成以下项目，以开始在虚幻编辑器中使用你安装了OpenXR的SteamVR设备：

-   完成[SteamVR先决条件](/documentation/zh-cn/unreal-engine/steamvr-prerequisites-in-unreal-engine)中的步骤，以设置你的计算机和设备。
-   在你的虚幻项目中启用 **OpenXR** 插件。

## OpenXR运行时环境变量

如果你的计算机上有多个OpenXR运行时，则需要设置一个环境变量，以便虚幻引擎可以找到正确的OpenXR运行时。

虽然每个兼容OpenXR的运行时都 *应该* 支持任何OpenXR设备，但为了获得最佳效果，请安装官方运行时（SteamVR for Vive/Index、Oculus Quest应用，等等）。你可以手动安装，但我们使用并推荐使用[OpenXR Explorer](https://github.com/maluoi/openxr-explorer)。使用它可以在各个OpenXR运行时之间轻松切换，显示运行时支持的一系列扩展，点击[OpenXR规范](https://registry.khronos.org/OpenXR/specs/1.0/pdf/xrspec.pdf)相关部分的直接链接即可检查常用属性和枚举。

-   [xr](https://dev.epicgames.com/community/search?query=xr)
-   [steamvr](https://dev.epicgames.com/community/search?query=steamvr)
-   [openxr](https://dev.epicgames.com/community/search?query=openxr)
-   [oculus](https://dev.epicgames.com/community/search?query=oculus)
-   [windows mixed reality](https://dev.epicgames.com/community/search?query=windows%20mixed%20reality)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Windows Mixed Reality](/documentation/zh-cn/unreal-engine/openxr-prerequisites-in-unreal-engine#windowsmixedreality)
-   [Oculus](/documentation/zh-cn/unreal-engine/openxr-prerequisites-in-unreal-engine#oculus)
-   [SteamVR](/documentation/zh-cn/unreal-engine/openxr-prerequisites-in-unreal-engine#steamvr)
-   [OpenXR运行时环境变量](/documentation/zh-cn/unreal-engine/openxr-prerequisites-in-unreal-engine#openxr%E8%BF%90%E8%A1%8C%E6%97%B6%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)

相关文档

[

使用OpenXR进行头戴式体验开发

![使用OpenXR进行头戴式体验开发](https://dev.epicgames.com/community/api/documentation/image/c709b1d5-6c44-499f-83d4-c69963f59568?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)

[

制作交互式XR体验

![制作交互式XR体验](https://dev.epicgames.com/community/api/documentation/image/f5ab45fa-0ac9-4371-a1fc-605ae6be23f5?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine)
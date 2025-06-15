# 虚幻引擎Windows混合现实开发 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/develping-for-windows-mixed-reality-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:45:27.111Z

---

目录

![Windows混合现实开发](https://dev.epicgames.com/community/api/documentation/image/3edcdbd5-5ee4-46d5-869c-6c16b68358e4?resizing_type=fill&width=1920&height=335)

[Windows混合现实（Windows Mixed Reality）](https://www.microsoft.com/en-us/mixed-reality/windows-mixed-reality)是由[Microsoft](https://www.microsoft.com)提供的[头戴式虚拟现实](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)平台，受到OpenXR和虚幻引擎的支持。本文介绍了虚幻引擎如何支持Windows Mixed Reality，以及如何设置环境以使用Windows Mixed Reality进行开发。如需了解虚幻引擎支持哪些设备，请参阅[支持的XR设备](/documentation/zh-cn/unreal-engine/supported-xr-devices-in-unreal-engine)获取完整列表。

如需为Windows混合现实VR设备开发虚幻引擎项目，你需要使用 **OpenXR** 插件和 **[Microsoft OpenXR](https://www.fab.com/listings/8c00dec5-60fa-4b23-b861-98ee885419ce)** 插件。

如需了解更多详细信息，请参阅下文中的[使用OpenXR API进行开发](/documentation/zh-cn/unreal-engine/develping-for-windows-mixed-reality-in-unreal-engine#%E4%BD%BF%E7%94%A8openxrapi%E8%BF%9B%E8%A1%8C%E5%BC%80%E5%8F%91)和[使用Windows Mixed Reality API进行开发](/documentation/zh-cn/unreal-engine/develping-for-windows-mixed-reality-in-unreal-engine#%E4%BD%BF%E7%94%A8windows%E6%B7%B7%E5%90%88%E7%8E%B0%E5%AE%9Eapi%E8%BF%9B%E8%A1%8C%E5%BC%80%E5%8F%91)小节。

## 使用OpenXR API进行开发

如需使用OpenXR在虚幻引擎中针对Windows混合现实VR设备进行开发，必须设置以下内容：

-   已更新硬件和软件。请参阅Microsoft的[安装检查列表](https://docs.microsoft.com/windows/mixed-reality/develop/install-the-tools)。
-   [适用于Windows混合现实的OpenXR Runtime](/documentation/zh-cn/unreal-engine/openxr-prerequisites-in-unreal-engine)。
-   已在项目中启用 **OpenXR** 插件。
-   已经从[Fab](https://www.fab.com)安装了[Microsoft OpenXR](https://www.fab.com/listings/8c00dec5-60fa-4b23-b861-98ee885419ce)插件并已启用。

完成使用OpenXR进行开发的所有必要设置之后，你就可以使用OpenXR API针对Windows混合现实VR设备和支持OpenXR API的设备进行开发了。如需获得更多详细信息，请参阅[使用OpenXR进行头戴式体验开发](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)。

## 使用Windows混合现实API进行开发

如需使用Windows Mixed Reality API在虚幻引擎中针对Windows混合现实VR设备进行开发，必须设置以下内容：

-   已更新硬件和软件。请参阅Microsoft的[安装检查列表](https://docs.microsoft.com/windows/mixed-reality/develop/install-the-tools)
-   已在项目中启用 **Windows混合现实** 插件。

完成使用Windows混合现实插件进行开发的所有必要设置之后，你就可以使用Windows混合现实API为Windows混合现实VR设备打造出色的体验了。

## 开发入门

在使用OpenXR或Windows混合现实插件设置项目之后，即可按照以下指示开始针对XR进行开发。

[](/documentation/zh-cn/unreal-engine/getting-started-with-xr-development-in-unreal-engine)

[![XR开发入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/caa97a50-c9e5-4608-8f04-c28a1fda462a/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/getting-started-with-xr-development-in-unreal-engine)

[XR开发入门](/documentation/zh-cn/unreal-engine/getting-started-with-xr-development-in-unreal-engine)

[使用虚幻引擎设置你的项目，并为AR和VR设备应用最佳实践。](/documentation/zh-cn/unreal-engine/getting-started-with-xr-development-in-unreal-engine)

[

![制作交互式XR体验](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5ab45fa-0ac9-4371-a1fc-605ae6be23f5/placeholder_topic.png)

制作交互式XR体验

为你的虚幻引擎AR和VR项目添加用户输入功能





](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine)[

![为XR体验设计UI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a689d2b9-4c4f-4d44-b743-ad4cc5d341a5/placeholder_topic.png)

为XR体验设计UI

在虚幻引擎中为XR体验设计用户界面





](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine)[

![XR性能和分析](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0eec00da-99fe-4131-9c2b-042ecdc646fa/placeholder_topic.png)

XR性能和分析

在虚幻引擎中分析虚拟现实项目的工具和方法





](/documentation/zh-cn/unreal-engine/xr-performance-and-profiling-in-unreal-engine)

## 性能分析

以下内容将介绍如何分析XR应用程序，以及在需要提高性能时应该考虑的事项。

-   [虚幻引擎中的XR性能和分析](/documentation/zh-cn/unreal-engine/xr-performance-and-profiling-in-unreal-engine)
-   [在虚幻引擎中测试和优化内容](/documentation/zh-cn/unreal-engine/testing-and-optimizing-your-content)
-   关于[使用Unreal Insights进行分析](https://docs.microsoft.com/windows/mixed-reality/develop/unreal/unreal-insights)的Microsoft文档

-   [vr](https://dev.epicgames.com/community/search?query=vr)
-   [platform](https://dev.epicgames.com/community/search?query=platform)
-   [openxr](https://dev.epicgames.com/community/search?query=openxr)
-   [windows mixed reality](https://dev.epicgames.com/community/search?query=windows%20mixed%20reality)
-   [desktop](https://dev.epicgames.com/community/search?query=desktop)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用OpenXR API进行开发](/documentation/zh-cn/unreal-engine/develping-for-windows-mixed-reality-in-unreal-engine#%E4%BD%BF%E7%94%A8openxrapi%E8%BF%9B%E8%A1%8C%E5%BC%80%E5%8F%91)
-   [使用Windows混合现实API进行开发](/documentation/zh-cn/unreal-engine/develping-for-windows-mixed-reality-in-unreal-engine#%E4%BD%BF%E7%94%A8windows%E6%B7%B7%E5%90%88%E7%8E%B0%E5%AE%9Eapi%E8%BF%9B%E8%A1%8C%E5%BC%80%E5%8F%91)
-   [开发入门](/documentation/zh-cn/unreal-engine/develping-for-windows-mixed-reality-in-unreal-engine#%E5%BC%80%E5%8F%91%E5%85%A5%E9%97%A8)
-   [性能分析](/documentation/zh-cn/unreal-engine/develping-for-windows-mixed-reality-in-unreal-engine#%E6%80%A7%E8%83%BD%E5%88%86%E6%9E%90)
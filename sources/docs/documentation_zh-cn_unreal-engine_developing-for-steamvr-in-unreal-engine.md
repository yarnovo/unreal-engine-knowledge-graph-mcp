# 虚幻引擎SteamVR开发 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-steamvr-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:44:55.637Z

---

目录

![SteamVR开发](https://dev.epicgames.com/community/api/documentation/image/9ab3a04e-14f5-41c5-b524-45d4b9f53c4c?resizing_type=fill&width=1920&height=335)

虚幻引擎5.1已经停用SteamVR插件。请改用OpenXR插件。

[SteamVR](https://www.steamvr.com)是由[Valve](https://www.valvesoftware.com)提供的[头戴式虚拟现实](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)平台，受到OpenXR和虚幻引擎的支持。本文介绍了虚幻引擎如何支持SteamVR，以及如何设置环境以使用SteamVR进行开发。

SteamVR支持Vive、Oculus和Windows混合现实头戴设备。如需了解虚幻引擎支持哪些XR设备，请参阅[支持的XR设备](/documentation/zh-cn/unreal-engine/supported-xr-devices-in-unreal-engine)获取完整列表。

目前，你可以使用 OpenXR 插件或 SteamVR 插件针对SteamVR进行开发:

-   在使用OpenXR插件进行开发时，你的应用程序可以在支持OpenXR API的设备上运行。
-   在使用SteamVR插件进行开发时，你的应用程序只能在SteamVR支持的设备上运行。部分虚幻引擎功能，例如[Live Link XR](/documentation/zh-cn/unreal-engine/livelinkxr-in-unreal-engine)需要具有SteamVR插件才能使用。

如需了解更多详细信息，请参阅下文中的[使用OpenXR API进行开发](/documentation/zh-cn/unreal-engine/developing-for-steamvr-in-unreal-engine#%E4%BD%BF%E7%94%A8openxrapi%E8%BF%9B%E8%A1%8C%E5%BC%80%E5%8F%91)和[使用SteamVR API进行开发](/documentation/zh-cn/unreal-engine/developing-for-steamvr-in-unreal-engine#%E4%BD%BF%E7%94%A8steamvrapi%E8%BF%9B%E8%A1%8C%E5%BC%80%E5%8F%91)小节。

## 使用OpenXR API进行开发

如需使用OpenXR在虚幻引擎中对SteamVR进行开发，必须设置以下内容：

-   已更新硬件和软件。请参阅设备的系统和硬件要求。
-   SteamVR 1.5.17或更高版本
-   [适用于SteamVR的OpenXR Runtime](/documentation/zh-cn/unreal-engine/openxr-prerequisites-in-unreal-engine)
-   已在项目中启用 **OpenXR** 插件

完成使用OpenXR进行开发的所有必要设置之后，你就可以使用OpenXR API针对SteamVR和支持OpenXR API的设备进行开发了。如需获得更多详细信息，请参阅[使用OpenXR进行头戴式体验开发](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)。

## 使用SteamVR API进行开发

如需使用SteamVR插件进行开发，必须设置以下内容：

-   已更新硬件和软件。请参阅设备的系统和硬件要求。
-   SteamVR 1.5.17或更高版本
-   已在项目中启用 **SteamVR** 插件

在准备好使用SteamVR插件进行开发之后，你就可以使用SteamVR API功能为支持SteamVR的设备进行开发了。

## 开发入门

在使用OpenXR或SteamVR插件设置项目之后，即可按照以下指示开始针对XR进行开发。

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

## 故障排除和分析

以下内容将介绍如何分析XR应用程序，以及在需要提高性能时应该考虑的事项。

-   [虚幻引擎中的XR性能和分析](/documentation/zh-cn/unreal-engine/xr-performance-and-profiling-in-unreal-engine)
-   [在虚幻引擎中测试和优化内容](/documentation/zh-cn/unreal-engine/testing-and-optimizing-your-content)
-   [SteamVR帧计时](https://developer.valvesoftware.com/wiki/SteamVR/Frame_Timing)

如果遇到头戴设备的相关问题，请访问[SteamVR支持中心](https://support.steampowered.com/kb_article.php?ref=8566-SDZC-9326)或[HTC Vive支持中心](https://www.vive.com/us/support/)获得有关故障排除方面的帮助。

-   [vr](https://dev.epicgames.com/community/search?query=vr)
-   [platform](https://dev.epicgames.com/community/search?query=platform)
-   [steamvr](https://dev.epicgames.com/community/search?query=steamvr)
-   [openxr](https://dev.epicgames.com/community/search?query=openxr)
-   [desktop vr](https://dev.epicgames.com/community/search?query=desktop%20vr)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用OpenXR API进行开发](/documentation/zh-cn/unreal-engine/developing-for-steamvr-in-unreal-engine#%E4%BD%BF%E7%94%A8openxrapi%E8%BF%9B%E8%A1%8C%E5%BC%80%E5%8F%91)
-   [使用SteamVR API进行开发](/documentation/zh-cn/unreal-engine/developing-for-steamvr-in-unreal-engine#%E4%BD%BF%E7%94%A8steamvrapi%E8%BF%9B%E8%A1%8C%E5%BC%80%E5%8F%91)
-   [开发入门](/documentation/zh-cn/unreal-engine/developing-for-steamvr-in-unreal-engine#%E5%BC%80%E5%8F%91%E5%85%A5%E9%97%A8)
-   [故障排除和分析](/documentation/zh-cn/unreal-engine/developing-for-steamvr-in-unreal-engine#%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4%E5%92%8C%E5%88%86%E6%9E%90)
# 在虚幻引擎中使用OpenXR为头戴式AR和VR设备开发内容 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:42:36.383Z

---

目录

![使用OpenXR进行头戴式体验开发](https://dev.epicgames.com/community/api/documentation/image/0efadf11-f369-4eae-8050-5e061ced9b65?resizing_type=fill&width=1920&height=335)

[OpenXR](https://www.khronos.org/openxr)是一种免版税的开放标准，可提供对XR平台和设备的高性能访问。Epic Games是OpenXR工作组的创始成员之一，组内成员还有Khronos Group和其他行业合作伙伴。这个由多个公司组成的组织致力于使用跨平台的标准来解决XR分段问题。

你可以利用OpenXR在虚幻引擎中营造沉浸式体验，该体验可以在所有支持OpenXR API的系统上实现。目前，虚幻引擎中的OpenXR仅支持头戴式设备。要为手持设备开发XR项目，请参阅[手持增强现实体验开发](/documentation/zh-cn/unreal-engine/developing-for-handheld-augmented-reality-experiences-in-unreal-engine)。

![openxr徽标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbe70772-8ba4-45a0-a6f3-17a8107149c6/openxr_logo.png)

OpenXR和OpenXR徽标是Khronos Group Inc.的商标。

此页面包含有关OpenXR支持的设备以及如何在虚幻引擎中使用OpenXR开发头戴式设备体验的文档链接。

## OpenXR运行时

每个平台都有OpenXR运行时，它是该平台的OpenXR API的实现。本页面介绍了所有支持的OpenXR运行时以及如何设置你的项目从而加以使用。

[](/documentation/zh-cn/unreal-engine/openxr-prerequisites-in-unreal-engine)

[![OpenXR运行时](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc90af7a-f035-4d8c-abfb-94a7da359ad3/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/openxr-prerequisites-in-unreal-engine)

[OpenXR运行时](/documentation/zh-cn/unreal-engine/openxr-prerequisites-in-unreal-engine)

[学习如何安装OpenXR运行时以及为OpenXR设置你的项目。](/documentation/zh-cn/unreal-engine/openxr-prerequisites-in-unreal-engine)

### 插件优先级

你的虚幻引擎项目在发行时可以启用以下插件：OpenXR、Oculus、SteamVR和Windows Mixed Reality。当你启动应用程序时，程序会按照插件优先级以从高到低的顺序检查插件列表。选择列表中的第一个插件，应用程序可以连接到它的运行时。

以下是虚幻引擎中当前插件优先级顺序，从高到低排列：

-   Oculus
-   OpenXR
-   Windows Mixed Reality
-   SteamVR

## 在虚幻引擎中扩展OpenXR

虚幻引擎中的OpenXR插件支持扩展插件，无论引擎是什么版本，你都可以向OpenXR添加功能。OpenXR扩展插件已经包含在引擎版本中。

虚幻引擎中当前可用于扩展OpenXR插件的插件包括：

-   OpenXRHandTracking
-   OpenXREyeTracker
-   XRVisualization
-   OpenXRMsftHandInteraction
-   HP Motion Controller
-   OpenXRViveTracker
-   XRScribe

你还可以从[Fab](https://www.fab.com/)安装扩展插件，也可以自行制作插件。

## 支持的平台

虚幻引擎5支持Windows和Android上的OpenXR设备。 对于通过[OpenXR厂商扩展](https://registry.khronos.org/OpenXR/specs/1.0/extprocess.html)提供的设备特定功能，由设备厂商负责开发和支持。你可以在Fab中找到XR设备的厂商插件。

### 使用原生OpenXR插件的内部验证设备

-   Meta Quest 2/3（PC和Android）
-   HTC Vive
-   Valve Index

### 外部验证设备

Epic不保证或提供对使用以下平台的设备特定功能的支持。

-   [Meta Quest](https://developers.meta.com/horizon/downloads/package/unreal-engine-5-integration/)
-   [Windows Mixed Reality](https://www.fab.com/listings/8c00dec5-60fa-4b23-b861-98ee885419ce)
-   [Varjo](https://www.fab.com/listings/aac38f51-491b-4b92-95bf-8ce04311a2ff)
-   [Pico](https://www.fab.com/listings/a7eb0f28-d7f1-4b30-8d2d-49d12eeb1d62)
-   [Magic Leap](https://developer-docs.magicleap.cloud/docs/guides/unreal/unreal-overview/)

-   [xr](https://dev.epicgames.com/community/search?query=xr)
-   [steamvr](https://dev.epicgames.com/community/search?query=steamvr)
-   [openxr](https://dev.epicgames.com/community/search?query=openxr)
-   [oculus](https://dev.epicgames.com/community/search?query=oculus)
-   [windows mixed reality](https://dev.epicgames.com/community/search?query=windows%20mixed%20reality)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [OpenXR运行时](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine#openxr%E8%BF%90%E8%A1%8C%E6%97%B6)
-   [插件优先级](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine#%E6%8F%92%E4%BB%B6%E4%BC%98%E5%85%88%E7%BA%A7)
-   [在虚幻引擎中扩展OpenXR](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine#%E5%9C%A8%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%B8%AD%E6%89%A9%E5%B1%95openxr)
-   [支持的平台](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84%E5%B9%B3%E5%8F%B0)
-   [使用原生OpenXR插件的内部验证设备](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%8E%9F%E7%94%9Fopenxr%E6%8F%92%E4%BB%B6%E7%9A%84%E5%86%85%E9%83%A8%E9%AA%8C%E8%AF%81%E8%AE%BE%E5%A4%87)
-   [外部验证设备](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine#%E5%A4%96%E9%83%A8%E9%AA%8C%E8%AF%81%E8%AE%BE%E5%A4%87)
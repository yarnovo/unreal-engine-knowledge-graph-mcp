# 在虚幻引擎中进行XR体验开发 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-xr-experiences-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:42:24.107Z

---

目录

![XR开发](https://dev.epicgames.com/community/api/documentation/image/6b954aac-0ae5-400a-83d0-4e1314bfd402?resizing_type=fill&width=1920&height=335)

XR是指以下体验的集合：

-   **增强现实：** 通过手持或可穿戴设备在用户的现实世界视野中叠加感官信息。
-   **虚拟现实：** 通过可穿戴设备用虚拟环境替换用户的视野。
-   **混合现实：** 增强现实和虚拟现实的融合体验。

虚幻引擎既支持面向XR平台的开发，也支持在内容创建管线中使用XR设备。以下小节包含有关如何在项目中使用XR设备的文档链接。

## 使用OpenXR进行头戴式XR体验开发

[OpenXR](https://www.khronos.org/openxr/)是一种免税的开放标准，可以实现对XR平台和设备的高效利用。你可以利用OpenXR在虚幻引擎中营造沉浸式体验，该体验可以在所有支持OpenXR API的系统上实现。目前，虚幻引擎中的OpenXR仅支持头戴式设备。

本小节将介绍OpenXR在虚幻引擎中的工作原理。

[](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)

[![使用OpenXR进行头戴式体验开发](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c709b1d5-6c44-499f-83d4-c69963f59568/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)

[使用OpenXR进行头戴式体验开发](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)

[在虚幻引擎中使用OpenXR为头戴式AR和VR设备开发内容。](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)

## 进行手持增强现实体验开发

手持式AR体验与头戴式XR体验存在根本性的区别。本小节将介绍手持AR的入门知识，以及如何使用这些平台中包含的独特功能。

[](/documentation/zh-cn/unreal-engine/developing-for-handheld-augmented-reality-experiences-in-unreal-engine)

[![为手持式设备开发增强现实体验](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7a1fc89-a67f-449c-ab35-69d739081d21/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/developing-for-handheld-augmented-reality-experiences-in-unreal-engine)

[为手持式设备开发增强现实体验](/documentation/zh-cn/unreal-engine/developing-for-handheld-augmented-reality-experiences-in-unreal-engine)

[在虚幻引擎中为手持式AR设备开发体验](/documentation/zh-cn/unreal-engine/developing-for-handheld-augmented-reality-experiences-in-unreal-engine)

## XR入门指南

本小节将介绍在虚幻引擎中创建XR应用程序的基础知识。

[](/documentation/zh-cn/unreal-engine/getting-started-with-xr-development-in-unreal-engine)

[![XR开发入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/caa97a50-c9e5-4608-8f04-c28a1fda462a/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/getting-started-with-xr-development-in-unreal-engine)

[XR开发入门](/documentation/zh-cn/unreal-engine/getting-started-with-xr-development-in-unreal-engine)

[使用虚幻引擎设置你的项目，并为AR和VR设备应用最佳实践。](/documentation/zh-cn/unreal-engine/getting-started-with-xr-development-in-unreal-engine)

## 打造交互式XR体验

XR有许多不同类型的输入，例如手部跟踪、运动控制器和眼部跟踪。本小节将介绍如何在虚幻引擎中向XR应用程序添加输入。

[](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine)

[![制作交互式XR体验](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5ab45fa-0ac9-4371-a1fc-605ae6be23f5/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine)

[制作交互式XR体验](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine)

[为你的虚幻引擎AR和VR项目添加用户输入功能](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine)

## 为XR体验创建UI

对于XR体验，用户界面（UI）必须是3D的，以便你可以在虚拟环境中与其交互。本小节将指导你了解如何在虚幻引擎中为XR应用程序创建UI。

[](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine)

[![为XR体验设计UI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a689d2b9-4c4f-4d44-b743-ad4cc5d341a5/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine)

[为XR体验设计UI](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine)

[在虚幻引擎中为XR体验设计用户界面](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine)

## XR中的共享体验

本小节将介绍如何创建可跨多个XR设备共享的内容。

[](/documentation/zh-cn/unreal-engine/sharing-xr-experiences-in-unreal-engine)

[![共享XR体验](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60694710-4d24-4496-8fdb-348dd01604ea/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/sharing-xr-experiences-in-unreal-engine)

[共享XR体验](/documentation/zh-cn/unreal-engine/sharing-xr-experiences-in-unreal-engine)

[使用虚幻引擎为多个用户打造沉浸式体验](/documentation/zh-cn/unreal-engine/sharing-xr-experiences-in-unreal-engine)

## 虚幻引擎中支持的XR平台

本文提供了有关虚幻引擎支持的XR平台和设备以及如何设置的信息。

%sharing-and-releasing-projects/xr-development/supported-xr-platforms:topic%

## 性能和使用XR进行分析

本小节将指导你了解如何分析你的XR应用程序，以及在你需要提高性能时应考虑的事项。

[](/documentation/zh-cn/unreal-engine/xr-performance-and-profiling-in-unreal-engine)

[![XR性能和分析](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0eec00da-99fe-4131-9c2b-042ecdc646fa/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/xr-performance-and-profiling-in-unreal-engine)

[XR性能和分析](/documentation/zh-cn/unreal-engine/xr-performance-and-profiling-in-unreal-engine)

[在虚幻引擎中分析虚拟现实项目的工具和方法](/documentation/zh-cn/unreal-engine/xr-performance-and-profiling-in-unreal-engine)

## 使用XR创建内容

虚幻引擎还支持在你的内容创建管线中使用XR，例如在虚拟现实中构建环境，以及将跟踪数据从设备流送到引擎中进行动画处理。这些页面将介绍如何将你的XR设备与虚幻引擎结合使用，而不仅仅是在设备上进行开发。

[](/documentation/zh-cn/unreal-engine/livelinkxr-in-unreal-engine)

[![LiveLinkXR](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/531c933b-349b-405f-8dd6-7551e859a7c9/llxr_topicimage.png)](/documentation/zh-cn/unreal-engine/livelinkxr-in-unreal-engine)

[LiveLinkXR](/documentation/zh-cn/unreal-engine/livelinkxr-in-unreal-engine)

[通过LiveLinkXR插件，在XR设备上使用LiveLink](/documentation/zh-cn/unreal-engine/livelinkxr-in-unreal-engine)

[

![Live Link VRPN](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a60558e3-fd9c-4a70-ac1c-03d15984a5a5/placeholder_topic.png)

Live Link VRPN

使用Live Link VRPN插件，添加来自VR外围设备的跟踪和输入数据





](/documentation/zh-cn/unreal-engine/live-link-vrpn-in-unreal-engine)[

![使用iOS设备录制面部动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c8bbd51-5fd6-405b-919f-73fc376ccf5a/faceapp-topic.png)

使用iOS设备录制面部动画

使用Live Link Face、ARKit和Live Link捕捉面部动画并将其应用于虚幻引擎中的角色。





](/documentation/zh-cn/unreal-engine/recording-face-animation-on-ios-device-in-unreal-engine)

-   [xr](https://dev.epicgames.com/community/search?query=xr)
-   [virtual reality](https://dev.epicgames.com/community/search?query=virtual%20reality)
-   [augmented reality](https://dev.epicgames.com/community/search?query=augmented%20reality)
-   [mixed reality](https://dev.epicgames.com/community/search?query=mixed%20reality)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用OpenXR进行头戴式XR体验开发](/documentation/zh-cn/unreal-engine/developing-for-xr-experiences-in-unreal-engine#%E4%BD%BF%E7%94%A8openxr%E8%BF%9B%E8%A1%8C%E5%A4%B4%E6%88%B4%E5%BC%8Fxr%E4%BD%93%E9%AA%8C%E5%BC%80%E5%8F%91)
-   [进行手持增强现实体验开发](/documentation/zh-cn/unreal-engine/developing-for-xr-experiences-in-unreal-engine#%E8%BF%9B%E8%A1%8C%E6%89%8B%E6%8C%81%E5%A2%9E%E5%BC%BA%E7%8E%B0%E5%AE%9E%E4%BD%93%E9%AA%8C%E5%BC%80%E5%8F%91)
-   [XR入门指南](/documentation/zh-cn/unreal-engine/developing-for-xr-experiences-in-unreal-engine#xr%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)
-   [打造交互式XR体验](/documentation/zh-cn/unreal-engine/developing-for-xr-experiences-in-unreal-engine#%E6%89%93%E9%80%A0%E4%BA%A4%E4%BA%92%E5%BC%8Fxr%E4%BD%93%E9%AA%8C)
-   [为XR体验创建UI](/documentation/zh-cn/unreal-engine/developing-for-xr-experiences-in-unreal-engine#%E4%B8%BAxr%E4%BD%93%E9%AA%8C%E5%88%9B%E5%BB%BAui)
-   [XR中的共享体验](/documentation/zh-cn/unreal-engine/developing-for-xr-experiences-in-unreal-engine#xr%E4%B8%AD%E7%9A%84%E5%85%B1%E4%BA%AB%E4%BD%93%E9%AA%8C)
-   [虚幻引擎中支持的XR平台](/documentation/zh-cn/unreal-engine/developing-for-xr-experiences-in-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%B8%AD%E6%94%AF%E6%8C%81%E7%9A%84xr%E5%B9%B3%E5%8F%B0)
-   [性能和使用XR进行分析](/documentation/zh-cn/unreal-engine/developing-for-xr-experiences-in-unreal-engine#%E6%80%A7%E8%83%BD%E5%92%8C%E4%BD%BF%E7%94%A8xr%E8%BF%9B%E8%A1%8C%E5%88%86%E6%9E%90)
-   [使用XR创建内容](/documentation/zh-cn/unreal-engine/developing-for-xr-experiences-in-unreal-engine#%E4%BD%BF%E7%94%A8xr%E5%88%9B%E5%BB%BA%E5%86%85%E5%AE%B9)
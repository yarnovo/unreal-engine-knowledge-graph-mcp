# 在虚幻引擎中为手持式AR设备开发体验 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-handheld-augmented-reality-experiences-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:42:28.904Z

---

目录

![为手持式设备开发增强现实体验](https://dev.epicgames.com/community/api/documentation/image/9496b159-e7fc-41ea-a918-b41b9ef02950?resizing_type=fill&width=1920&height=335)

虚幻引擎使用一个统一框架来支持手持式AR设备体验开发，因此，你的应用程序能以最少的平台检查来服务多个移动平台。手持式AR平台提供多种功能，你可以在虚幻引擎项目中使用这些功能，例如面部跟踪、环境探测和对象遮挡。

目前，你无法使用OpenXR进行手持式AR设备体验的开发。使用OpenXR开发XR项目，请参阅[使用OpenXR进行头戴式设备体验开发](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)。

本页面包含有关如何在虚幻引擎中进行手持式AR设备体验开发的文档链接。

## 手持式AR设备体验开发入门

虚幻引擎包含面向手持式AR设备的模板项目。此模板为手持式增强现实项目提供了简单的基础，你可以根据你的项目需求进行修改。这些页面介绍了如何使用模板，以及如何在虚幻引擎中开始进行手持式AR设备体验开发。

[

![手持类AR项目模板快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ecea164-d82f-4e6c-999b-4577fcb65897/scanningplanes.png)

手持类AR项目模板快速入门

本指南介绍了如何使用手持类AR模板来创建项目，并在移动设备上测试你的项目





](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine)[

![手持类AR模板技术参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2fd23ca3-6865-4bac-a761-c51641e9e154/placeholder_topic.png)

手持类AR模板技术参考

介绍了手持类AR模板的关键功能及实现方法





](/documentation/zh-cn/unreal-engine/handheld-ar-template-technical-reference)

## 支持的平台

这些页面提供了有关在虚幻引擎中支持手持式增强现实的平台和移动设备，以及如何将你的应用程序部署到这些平台和设备上的信息。

[

![ARCore开发](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2327f750-5708-43a3-813a-49fd27eb2184/placeholder_topic.png)

ARCore开发

如何在虚幻引擎中针对支持ARCore的设备进行开发





](/documentation/zh-cn/unreal-engine/developing-for-arcore-in-unreal-engine)[

![ARKit开发](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2446bd26-bac0-448b-9c45-1427d987ab96/placeholder_topic.png)

ARKit开发

如何在虚幻引擎中针对支持ARKit的设备进行开发





](/documentation/zh-cn/unreal-engine/developing-for-arkit-in-unreal-engine)

## 手持式AR设备功能

以下是你可以添加到项目中的手持式AR设备功能列表，以及这些功能是否在平台上受支持。

功能

说明

ARCore支持

ARKit支持

**平面检测（Plane Detection）**

你可以检测现实世界中的垂直或水平平面。检测到平面后，你就可以将虚拟对象放置在该位置，这样它们看起来就像是附着在真实世界的对象上，例如在桌面上。

是（Yes）

是（Yes）

**对象遮挡（Object Occlusion）**

现实世界对象可以遮挡你的虚拟对象，也就是说，你的虚拟对象看起来是在现实世界对象的后面渲染。

是（Yes）

是（Yes）

**人员遮挡（People Occlusion）**

与对象遮挡类似，人员可以遮挡虚拟对象。

否（No）

是（Yes）

**环境探测（Environment Probe）**

你可以估算真实世界光照的强度和方向。然后，你可以将这种光估算应用于你的虚拟对象，将它们与现实世界融合。

是（Yes）

是（Yes）

**ARPins**

你可以使用ARPin将虚拟对象附加到现实世界位置。你还可以将这些ARPin保存到云端，并与其他设备共享，以便多个用户可以在同一位置查看相同内容。

是，使用云锚点和Azure空间锚点保存在本地和云端。

是，使用地理位置锚点、云锚点和Azure空间锚点保存在本地和云端。

**增强图像（Augmented Images）**

你可以提供让你的应用能检测和增强的参考图像。

是（Yes）

是（Yes）

**面部跟踪（Facial Tracking）**

你可以检测用户面部的特征点，以便进行跟踪和增强。

是（Yes）

是，通过ARKit API或[Live Link Face应用](/documentation/zh-cn/unreal-engine/recording-face-animation-on-ios-device-in-unreal-engine)，实现跟踪。

**地理位置跟踪（Geotracking）**

你可以使用设备的GPS和基于下载图像的世界跟踪来跟踪特定的地理位置。此功能取决于是否已收集该区域的图像。

否（No）

是，有关更多细节，请参阅[Apple文档](https://developer.apple.com/documentation/arkit/content_anchors/tracking_geographic_locations_in_ar)。

**摄像机固有参数（Camera Intrinsics）**

你可以检索有关设备物理摄像机的信息，例如焦距和图像分辨率。

是（Yes）

是（Yes）

-   [xr](https://dev.epicgames.com/community/search?query=xr)
-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [ar](https://dev.epicgames.com/community/search?query=ar)
-   [handheld ar](https://dev.epicgames.com/community/search?query=handheld%20ar)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [手持式AR设备体验开发入门](/documentation/zh-cn/unreal-engine/developing-for-handheld-augmented-reality-experiences-in-unreal-engine#%E6%89%8B%E6%8C%81%E5%BC%8Far%E8%AE%BE%E5%A4%87%E4%BD%93%E9%AA%8C%E5%BC%80%E5%8F%91%E5%85%A5%E9%97%A8)
-   [支持的平台](/documentation/zh-cn/unreal-engine/developing-for-handheld-augmented-reality-experiences-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84%E5%B9%B3%E5%8F%B0)
-   [手持式AR设备功能](/documentation/zh-cn/unreal-engine/developing-for-handheld-augmented-reality-experiences-in-unreal-engine#%E6%89%8B%E6%8C%81%E5%BC%8Far%E8%AE%BE%E5%A4%87%E5%8A%9F%E8%83%BD)
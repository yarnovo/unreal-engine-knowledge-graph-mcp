# 虚幻引擎支持的XR设备 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/supported-xr-devices-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:44:57.049Z

---

目录

![支持的XR设备](https://dev.epicgames.com/community/api/documentation/image/8f79c452-bd82-4ff9-81d5-96dace147921?resizing_type=fill&width=1920&height=335)

虚幻引擎支持对多种[XR](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-xr-experiences-in-unreal-engine)设备进行开发和内容创建。 本文列出了虚幻引擎支持的XR平台和设备的相关文档。

## 支持的XR设备

以下XR设备已经完成测试和验证，能够使用虚幻引擎。

设备

平台类型

设备类型

支持的SDK版本

支持状态

说明

AR设备

 

 

 

 

 

[**运行Android 7.0 (Nougat)和更高版本的Android设备**](https://developers.google.com/ar/devices)

移动端

手持式

ARCore 1.37

支持，关于所支持功能的更多详细信息，请参阅[手持式AR功能](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-handheld-augmented-reality-experiences-in-unreal-engine)。

如需了解如何针对此设备进行开发，请参阅[针对手持增强现实体验进行开发](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-handheld-augmented-reality-experiences-in-unreal-engine)，

[**运行iOS 11.0和更高版本的iOS设备**](https://developer.apple.com/documentation/arkit)

移动端

手持式

ARKit 4.0

支持，关于所支持功能的更多详细信息，请参阅[手持式AR功能](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-handheld-augmented-reality-experiences-in-unreal-engine)。

如需了解如何针对此设备进行开发，请参阅[针对手持增强现实体验进行开发](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-handheld-augmented-reality-experiences-in-unreal-engine)，

VR设备

 

 

 

 

 

**HTC Vive**

台式机

头戴式

不适用

最低限度的支持

如需了解如何针对此设备进行开发，请参阅[使用OpenXR开发头戴式体验](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)。

**HTC Vive Pro**

台式机

头戴式

不适用

支持

如需了解如何针对此设备进行开发，请参阅[使用OpenXR开发头戴式体验](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)。

**Meta Quest 3**

台式机

头戴式

Quest SDK Android API Level 29

支持

如需了解如何针对此设备进行开发，请参阅[针对Oculus进行开发](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)。

**Meta Quest 2**

移动端

头戴式

Quest SDK Android API Level 29

支持

如需了解如何针对此设备进行开发，请参阅[针对Oculus进行开发](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)。

**Meta Quest 2 / 3 with Link**

台式机

头戴式

不适用

支持

如需了解如何针对此设备进行开发，请参阅[针对Oculus进行开发](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)。

**PSVR**

主机

头戴式

不适用

支持

如需了解如何针对此设备进行开发，请咨询Epic专业支持或论坛。

**PSVR2**

主机

头戴式

不适用

支持

如需了解如何针对此设备进行开发，请咨询Epic专业支持或论坛。

**Valve Index**

台式机

头戴式

不适用

支持

如需了解如何针对此设备进行开发，请参阅[使用OpenXR开发头戴式体验](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)。

**Apple Vision Pro**

移动端

头戴式

visionOS 1.1

支持

如需了解如何针对此设备进行开发，请参阅[Apple Vision Pro快速入门指南](https://dev.epicgames.com/community/learning/tutorials/1JWr/unreal-engine-apple-vision-pro-quick-start-guide)。

## 支持的XR平台

以下各小节将介绍与虚幻引擎中支持的XR平台有关的信息。

如需了解如何使用OpenXR进行开发，请参阅使用[OpenXR开发头戴式体验](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)。

### ARCore

[ARCore](https://developers.google.com/ar)是一个[手持式增强现实](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-handheld-augmented-reality-experiences-in-unreal-engine)平台，由[Google](https://www.google.com/)提供，受虚幻引擎支持。 本文介绍了虚幻引擎如何支持ARCore，以及你该如何设置环境以使用ARCore进行开发。

[

![ARCore开发](https://dev.epicgames.com/community/api/documentation/image/2327f750-5708-43a3-813a-49fd27eb2184?resizing_type=fit&width=640&height=640)

ARCore开发

如何在虚幻引擎中针对支持ARCore的设备进行开发





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-arcore-in-unreal-engine)

### ARKit

[ARKit](https://developer.apple.com/augmented-reality/)是一个[手持式增强现实](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-handheld-augmented-reality-experiences-in-unreal-engine)平台，由[Apple](https://www.apple.com/)提供，受虚幻引擎支持。 本文介绍了虚幻引擎对ARKit的支持程度，以及如何设置环境，以便使用ARKit进行开发。

[

![ARKit开发](https://dev.epicgames.com/community/api/documentation/image/2446bd26-bac0-448b-9c45-1427d987ab96?resizing_type=fit&width=640&height=640)

ARKit开发

如何在虚幻引擎中针对支持ARKit的设备进行开发





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-arkit-in-unreal-engine)

-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [支持的XR设备](/documentation/zh-cn/unreal-engine/supported-xr-devices-in-unreal-engine#supported-xr-devices)
-   [支持的XR平台](/documentation/zh-cn/unreal-engine/supported-xr-devices-in-unreal-engine#supported-xr-platforms)
-   [ARCore](/documentation/zh-cn/unreal-engine/supported-xr-devices-in-unreal-engine#ar-core)
-   [ARKit](/documentation/zh-cn/unreal-engine/supported-xr-devices-in-unreal-engine#ar-kit)
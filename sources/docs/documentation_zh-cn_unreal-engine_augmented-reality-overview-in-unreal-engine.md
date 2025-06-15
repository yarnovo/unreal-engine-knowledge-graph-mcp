# 虚幻引擎增强现实概览 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/augmented-reality-overview-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:42:39.751Z

---

目录

![增强现实概览](https://dev.epicgames.com/community/api/documentation/image/d1587327-910d-4f49-98a6-9da1ee20c7ea?resizing_type=fill&width=1920&height=335)

增强现实（AR）是一种将计算机生成的图像覆盖到用户看到的真实场景上的技术，可以提供一种复合视图。 

虚幻引擎AR框架提供了一个丰富而统一的框架，以便使用虚幻引擎为iOS和Android手持式平台构建增强现实应用程序。该统一框架为两个平台提供了单一的开发路径，允许开发人员使用单个代码路径为两个平台构建增强现实应用程序。**手持式AR** 蓝图模板提供了一个完整的示例项目，演示虚幻引擎中提供的增强现实功能。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d15d05f3-d2c9-41c2-a307-980fc022ae86/ar_introshot.png)

增强现实技术提供了一种用户体验，即将2D或3D元素添加到设备摄像机的实时取景中，使这些元素看起来像是存在于现实世界中。

## 支持iOS和Android版本

统一的AR框架包括对基本AR功能的支持，如对齐、测量亮度、定位、会话状态、追踪结果和追踪。

然而，Android和iOS的增强现实故事正在不断演变。从虚幻引擎4.23开始，我们现在支持最新版ARCore中提供的部分高级功能。

**ARCore 1.7**

-   增强面部
-   增强图像
-   云锚
-   垂直平面检测

**ARKit 3.0**

-   2D图像检测
-   3D对象检测
-   面部追踪
-   持续经验
-   分享经验
-   人物遮挡\*
-   动作捕捉（2D、3D、LiveLink）\*

\* 虚幻引擎4.23.1对此功能提供测试版支持。

Epic Games开发人员 **Joe Graf** 写了几篇内容丰富的博文，讨论了UE4中的ARKit功能。

-   [UE4 4.20中的2D图像检测](https://medium.com/@joe.j.graf/arkit-1-5-image-detection-in-ue4-4-20-4dcbefb7a178)
-   [UE4 4.20中的ARKit2.0支持](https://medium.com/@joe.j.graf/arkit-2-0-support-in-ue4-4-20-47d1156d545f)
-   [UE4 4.20中的AR环境探测器](https://medium.com/@joe.j.graf/ar-environment-probes-in-ue4-4-20-afda05bcc587)

## 增强现实API

统一的AR框架允许使用虚幻引擎为iOS和Android手持式平台构建增强现实应用程序。该统一AR框架提供了一个新的C++和蓝图函数库，允许开发人员使用单个代码路径为两个平台构建增强现实应用程序。这些新函数也使增强现实技术的使用更加轻松。   
如需了解更多细节，可以参阅[虚幻引擎API参考](http://api.unrealengine.com/INT/API/)。 

**手持式AR** 蓝图模板提供了一个完整的示例项目，演示虚幻引擎中提供的新的增强现实功能。要探索此项目和新的增强现实功能，可以通过以下方式开始：打开 **内容浏览器（Content Browser）**，导航至 **Content\\HandheldARBP\\Blueprints\\UI**，然后在 **蓝图编辑器（Blueprint Editor）** 中打开 **BP\_DebugMenu** 资源。

## 支持的手持式平台

目前我们支持iOS和Android平台。请通读以下页面，了解各个平台上支持的设备类型。

-   [Apple的iOS设备兼容性参考](https://developer.apple.com/library/content/documentation/DeviceInformation/Reference/iOSDeviceCompatibility/DeviceCompatibilityMatrix/DeviceCompatibilityMatrix.html)
-   [ARCore支持设备概览](https://developers.google.com/ar/discover#supported_devices)

值得一提的是，就虚幻引擎来说，其对手持式iOS和Android设备的支持并不新鲜，所以如果您已经在使用虚幻引擎和iOS或Android设备，那么您只需要再进行少量的配置就可以在虚幻引擎中使用增强现实了。

### iOS

有关详细的iOS增强现实先决条件信息，请参阅[ARKit先决条件](/documentation/zh-cn/unreal-engine/arkit-prerequisites-in-unreal-engine)主题。此外，虚幻引擎和iOS设备的基本配置详见虚幻引擎文档的[iOs和tvOS](/documentation/zh-cn/unreal-engine/setting-up-an-unreal-engine-project-for-ios)部分。 

### Android

有关详细的Android增强现实先决条件信息，请参阅[使用ARCore的先决条件](/documentation/zh-cn/unreal-engine/arcore-prerequisites-in-unreal-engine)主题。虚幻引擎和Android设备的基本配置详见虚幻引擎文档的[Android快速入门](/documentation/zh-cn/unreal-engine/setting-up-unreal-engine-projects-for-android-development) 部分。

## 虚幻AR初体验

现在已完成有关使用虚幻引擎和增强现实技术基本信息的了解，现在就可以浏览[手持类AR项目模板快速入门](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine)教程，开启您的体验之旅了。

-   [xr](https://dev.epicgames.com/community/search?query=xr)
-   [virtual reality](https://dev.epicgames.com/community/search?query=virtual%20reality)
-   [ar](https://dev.epicgames.com/community/search?query=ar)
-   [ios](https://dev.epicgames.com/community/search?query=ios)
-   [android](https://dev.epicgames.com/community/search?query=android)
-   [startingout](https://dev.epicgames.com/community/search?query=startingout)
-   [augmented reality](https://dev.epicgames.com/community/search?query=augmented%20reality)
-   [mixed reality](https://dev.epicgames.com/community/search?query=mixed%20reality)
-   [mobile ar](https://dev.epicgames.com/community/search?query=mobile%20ar)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [支持iOS和Android版本](/documentation/zh-cn/unreal-engine/augmented-reality-overview-in-unreal-engine#%E6%94%AF%E6%8C%81ios%E5%92%8Candroid%E7%89%88%E6%9C%AC)
-   [增强现实API](/documentation/zh-cn/unreal-engine/augmented-reality-overview-in-unreal-engine#%E5%A2%9E%E5%BC%BA%E7%8E%B0%E5%AE%9Eapi)
-   [支持的手持式平台](/documentation/zh-cn/unreal-engine/augmented-reality-overview-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84%E6%89%8B%E6%8C%81%E5%BC%8F%E5%B9%B3%E5%8F%B0)
-   [iOS](/documentation/zh-cn/unreal-engine/augmented-reality-overview-in-unreal-engine#ios)
-   [Android](/documentation/zh-cn/unreal-engine/augmented-reality-overview-in-unreal-engine#android)
-   [虚幻AR初体验](/documentation/zh-cn/unreal-engine/augmented-reality-overview-in-unreal-engine#%E8%99%9A%E5%B9%BBar%E5%88%9D%E4%BD%93%E9%AA%8C)

相关文档

[

手持类AR项目模板快速入门

![手持类AR项目模板快速入门](https://dev.epicgames.com/community/api/documentation/image/2ecea164-d82f-4e6c-999b-4577fcb65897?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine)

[

使用ARKit先决条件和准备工作

![使用ARKit先决条件和准备工作](https://dev.epicgames.com/community/api/documentation/image/0b9a8329-44ee-4ae6-b61a-d3407d71cd39?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/arkit-prerequisites-in-unreal-engine)

[

使用ARCore的先决条件

![使用ARCore的先决条件](https://dev.epicgames.com/community/api/documentation/image/36c85986-d8ab-40b8-9fee-081041bb7698?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/arcore-prerequisites-in-unreal-engine)
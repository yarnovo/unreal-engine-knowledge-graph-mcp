# 虚幻引擎ARKit开发 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-arkit-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:44:55.493Z

---

目录

![ARKit开发](https://dev.epicgames.com/community/api/documentation/image/69b3638a-4128-4691-b5d3-417058e39a14?resizing_type=fill&width=1920&height=335)

[ARKit](https://developer.apple.com/augmented-reality/)是由[Apple](https://www.apple.com)提供的[手持增强现实](/documentation/zh-cn/unreal-engine/developing-for-handheld-augmented-reality-experiences-in-unreal-engine)平台，受到虚幻引擎的支持。本文介绍了虚幻引擎对ARKit的支持程度，以及如何设置环境，以便使用ARKit进行开发。如需了解虚幻引擎支持哪些设备，以及支持哪些版本的SDK，请参阅[支持的XR设备](/documentation/zh-cn/unreal-engine/supported-xr-devices-in-unreal-engine)获取完整列表。

## 使用ARKit API进行开发

如需在虚幻引擎中针对ARKit进行开发，必须设置以下内容：

-   已更新硬件和软件。请参阅[iOS开发要求](/documentation/zh-cn/unreal-engine/ios-ipados-and-tvos-support-for-unreal-engine)。
-   已安装Xcode 12或更高版本。
-   已安装iOS 14或更高版本
-   手持iOS设备受支持、已配置并且已连接，搭载A12 Bionic或更高级别的芯片。
-   已在项目中启用 **Apple ARKit** 插件。

完成使用ARKit进行开发的所有必要设置之后，你就可以使用ARKit独有的功能为iOS设备进行开发了。如需了解虚幻引擎支持哪些功能，请参阅[手持式AR设备功能](/documentation/zh-cn/unreal-engine/developing-for-handheld-augmented-reality-experiences-in-unreal-engine#%E6%89%8B%E6%8C%81%E5%BC%8Far%E8%AE%BE%E5%A4%87%E5%8A%9F%E8%83%BD)。

## 开发入门

在使用Apple ARKit插件设置项目之后，即可按照以下指示开始为ARKit设备进行开发。

[

![手持类AR项目模板快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ecea164-d82f-4e6c-999b-4577fcb65897/scanningplanes.png)

手持类AR项目模板快速入门

本指南介绍了如何使用手持类AR模板来创建项目，并在移动设备上测试你的项目





](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine)[

![手持类AR模板技术参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2fd23ca3-6865-4bac-a761-c51641e9e154/placeholder_topic.png)

手持类AR模板技术参考

介绍了手持类AR模板的关键功能及实现方法





](/documentation/zh-cn/unreal-engine/handheld-ar-template-technical-reference)

[](/documentation/zh-cn/unreal-engine/arpins-in-unreal-engine)

[![ARPin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e7bce9c-72fa-47f9-848e-5f9c3e8cfd23/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/arpins-in-unreal-engine)

[ARPin](/documentation/zh-cn/unreal-engine/arpins-in-unreal-engine)

[ARPin是AR应用中用来标记真实世界中位置的工具，你可以将虚幻引擎中的虚拟内容绑定到ARPin上。](/documentation/zh-cn/unreal-engine/arpins-in-unreal-engine)

## 分析

以下内容将介绍如何分析XR应用程序，以及在需要提高性能时应该考虑的事项。

-   [虚幻引擎中的XR性能和分析](/documentation/zh-cn/unreal-engine/xr-performance-and-profiling-in-unreal-engine)
-   [在虚幻引擎中测试和优化内容](/documentation/zh-cn/unreal-engine/testing-and-optimizing-your-content)
-   [调试iOS和tvOS项目](/documentation/404)

## 已知限制

以下是ARKit功能的已知限制：

-   图像检测功能的候选图像必须具有唯一且易识别的名称。如果多个候选图像具有相同的易识别名称，则系统仅会识别第一个具有易识别名称的图像。

-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [ar](https://dev.epicgames.com/community/search?query=ar)
-   [ios](https://dev.epicgames.com/community/search?query=ios)
-   [handheld ar](https://dev.epicgames.com/community/search?query=handheld%20ar)
-   [arkit](https://dev.epicgames.com/community/search?query=arkit)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用ARKit API进行开发](/documentation/zh-cn/unreal-engine/developing-for-arkit-in-unreal-engine#%E4%BD%BF%E7%94%A8arkitapi%E8%BF%9B%E8%A1%8C%E5%BC%80%E5%8F%91)
-   [开发入门](/documentation/zh-cn/unreal-engine/developing-for-arkit-in-unreal-engine#%E5%BC%80%E5%8F%91%E5%85%A5%E9%97%A8)
-   [分析](/documentation/zh-cn/unreal-engine/developing-for-arkit-in-unreal-engine#%E5%88%86%E6%9E%90)
-   [已知限制](/documentation/zh-cn/unreal-engine/developing-for-arkit-in-unreal-engine#%E5%B7%B2%E7%9F%A5%E9%99%90%E5%88%B6)
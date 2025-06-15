# 虚幻引擎5的项目分享和发布 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/sharing-and-releasing-projects-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:41:29.613Z

---

目录

![分享和发布项目](https://dev.epicgames.com/community/api/documentation/image/32eb4bad-6b45-4c47-8d34-d3824af8feab?resizing_type=fill&width=1920&height=335)

本文介绍了如何在虚幻引擎支持的平台上打包和发布，并罗列了相关的所有指南。尽管所有平台的打包流程基本通用，但是各个平台仍会有一些特定要求、特有功能，以及专门的调试和优化技巧。

## Deployment

[

![构建操作：烘焙、打包、部署、运行](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db87581d-f852-4a1a-95a4-9ef308349ce4/buildops_topic.png)

构建操作：烘焙、打包、部署、运行

虚幻引擎项目可用的构建操作（烘焙、打包、运行、部署）概述。





](/documentation/zh-cn/unreal-engine/build-operations-cooking-packaging-deploying-and-running-projects-in-unreal-engine)[

![内容烘焙](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6af04704-d61f-4d62-8a5a-d91a64ee7f9c/placeholder_topic.png)

内容烘焙

针对游戏中使用的资源生成特定于平台的内容。





](/documentation/zh-cn/unreal-engine/cooking-content-in-unreal-engine)[

![烘焙和数据块划分](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8eace240-ad30-4027-abfa-cdd21f888179/placeholder_topic.png)

烘焙和数据块划分

烘焙内容、编译.pak文件进行分发





](/documentation/zh-cn/unreal-engine/cooking-content-and-creating-chunks-in-unreal-engine)[

![在设备上启动项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/956776c6-dc35-4a90-bca7-cb60fe463725/launching-to-device-topic.png)

在设备上启动项目

通过一键点击将你的游戏部署到像iOS和Android这样的设备上，以进行测试。





](/documentation/zh-cn/unreal-engine/launching-unreal-engine-projects-on-devices)[

![发布项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db0b8121-8f78-4ab6-b0de-9605cdbfdcf7/placeholder_topic.png)

发布项目

创建包含已烘焙内容的发布版项目以供发行。





](/documentation/zh-cn/unreal-engine/preparing-unreal-engine-projects-for-release)[

![在编辑器中使用已烘焙内容](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e741ebb-4663-4d80-8e92-eaa58b35f2c5/allow-cooked-content-topic.png)

在编辑器中使用已烘焙内容

关于在编辑器中使用已烘焙内容的概述。





](/documentation/zh-cn/unreal-engine/working-with-cooked-content-in-the-unreal-engine)[

![项目启动程序](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6cad18e2-70b7-4c80-948c-d6c4f4f67ab0/ue5_1-project-launcher-topic.png)

项目启动程序

用于部署项目的项目启动程序参考。





](/documentation/zh-cn/unreal-engine/using-the-project-launcher-in-unreal-engine)[

![Unreal Frontend](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04e3cd5e-1c19-4d91-afae-232ce10c368c/placeholder_topic.png)

Unreal Frontend

用于管理应用程序和部署到主机的工具





](/documentation/zh-cn/unreal-engine/using-the-unreal-frontend-tool)

## 平台通用支持工具

[

![AutoSDK参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba74ae94-888e-4702-b727-3e992f8cdfcf/placeholder_topic.png)

AutoSDK参考

用户可以借助AutoSDK系统来分发目标平台SDK，同时根据需要对其进行虚幻引擎配置。





](/documentation/zh-cn/unreal-engine/using-the-autosdk-system-in-unreal-engine)[

![Device Manager](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef9c8a5d-dad4-4d32-a409-8a276c716b02/placeholder_topic.png)

Device Manager





](/documentation/zh-cn/unreal-engine/connecting-to-and-managing-devices-in-unreal-engine)[

![设置设备描述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21975893-f085-4e29-9ebf-f92a3775ead8/placeholder_topic.png)

设置设备描述

设置指定平台配置的设备描述





](/documentation/zh-cn/unreal-engine/setting-up-device-profiles-in-unreal-engine)[

![低延迟框架同步](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f53e18a1-0f49-4e5e-af48-508b1196cb7c/placeholder_topic.png)

低延迟框架同步

改变线程同步方式以大幅降低输入延迟。





](/documentation/zh-cn/unreal-engine/low-latency-frame-syncing-in-unreal-engine)[

![电视安全区调试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e920fe15-24c3-4e59-bcbf-d75170e01ab9/tv-safe-zone-topic.png)

电视安全区调试

避免 UI 元素过于靠近电视屏幕边缘





](/documentation/zh-cn/unreal-engine/setting-up-tv-safe-zone-debugging-in-unreal-engine)

## 通用移动开发

[

![移动端开发工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c45d88d-4e81-4df3-96c8-a9baaca5c106/placeholder_topic.png)

移动端开发工具

了解虚幻引擎为移动设备准备的项目构建和调试工具。





](/documentation/zh-cn/unreal-engine/development-tools-for-mobile-applications)[

![移动端渲染功能](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9689bd3b-b42c-474e-b658-900ab248b433/placeholder_topic.png)

移动端渲染功能

了解虚幻引擎移动端渲染路径以及其对于图形功能的支持。





](/documentation/zh-cn/unreal-engine/rendering-features-for-mobile-games-in-unreal-engine)[

![支持移动端服务](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce6690fe-204c-4420-856e-9ab3253881e8/placeholder_topic.png)

支持移动端服务

实现常见的移动端服务，例如成就、通知和应用内购。





](/documentation/zh-cn/unreal-engine/in-app-purchases-and-ads-in-unreal-engine-projects)[

![移动端优化指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26c0fa6b-eed1-443a-9248-f6e11c65ca44/placeholder_topic.png)

移动端优化指南

关于优化移动端内容的工具和最佳实践。





](/documentation/zh-cn/unreal-engine/debugging-and-optimization-for-mobile-in-unreal-engine)

## iOS、iPadOS和tvOS

[

![虚幻引擎中iOS和tvOS相关的入门指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ef34d77-a48d-495c-a036-75340b667dd8/placeholder_topic.png)

虚幻引擎中iOS和tvOS相关的入门指南

了解创建iOS和tvOS应用所需的基础知识。





](/documentation/zh-cn/unreal-engine/getting-started-and-setup-guides-for-ios-and-tvos-in-unreal-engine)[

![在Windows上开发iOS项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2705d41-faf7-4179-a1bc-48274d1c9d0a/placeholder_topic.png)

在Windows上开发iOS项目

介绍在Windows设备上进行开发时，简化iOS工作流程的指南。





](/documentation/zh-cn/unreal-engine/working-on-ios-projects-using-a-windows-machine-in-unreal-engine)[

![iOS和tvOS开发指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/124ebb16-00d1-4946-8847-3a88414110b1/placeholder_topic.png)

iOS和tvOS开发指南

使用iOS、tvOS和iPadOS的功能和服务开发项目。





](/documentation/zh-cn/unreal-engine/developing-on-ios-tvos-and-ipados-in-unreal-engine)[

![打包和发布](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26ad6398-6fc9-4d23-833c-7d658fba87c1/placeholder_topic.png)

打包和发布

为iOS、tvOS和iPadOS项目创建版本





](/documentation/zh-cn/unreal-engine/building-packaging-and-publishing-unreal-engine-projects-for-ios-tvos-and-ipados)

## Android

[

![虚幻引擎Android项目入门指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e968ac1-e453-43d1-97be-063af23e30b8/placeholder_topic.png)

虚幻引擎Android项目入门指南

介绍如何设置虚幻编辑器、开发环境和你的Android设备，以便在虚幻引擎中开发项目。





](/documentation/zh-cn/unreal-engine/getting-started-and-setup-for-android-projects-in-unreal-engine)[

![Android开发指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f45b68bb-66a9-406a-8676-61790443dbd9/placeholder_topic.png)

Android开发指南

开发安卓项目以及在虚幻引擎中使用安卓相关功能的参考资料





](/documentation/zh-cn/unreal-engine/developing-guides-for-android-in-unreal-engine)[

![打包和发布](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f06035f9-0f45-4f44-8e0a-92c3d6e1b275/placeholder_topic.png)

打包和发布

安卓平台内容发布指南





](/documentation/zh-cn/unreal-engine/packaging-and-publishing-android-projects-in-unreal-engine)[

![Android调试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a55c35f3-3407-4a31-9e06-71978022e133/placeholder_topic.png)

Android调试

介绍如何使用Visual Studio、Android Studio和虚幻引擎的调试工具在设备上调试Android应用程序。





](/documentation/zh-cn/unreal-engine/debugging-for-android-devices-in-unreal-engine)[

![虚幻引擎Android优化指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/954b7c00-0f26-4b7c-8445-89608f77fc96/placeholder_topic.png)

虚幻引擎Android优化指南

关于优化Android项目性能的最佳实践。





](/documentation/zh-cn/unreal-engine/optimization-guides-for-android-in-unreal-engine)

## XR开发（AR和VR）

[

![使用OpenXR进行头戴式体验开发](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c709b1d5-6c44-499f-83d4-c69963f59568/placeholder_topic.png)

使用OpenXR进行头戴式体验开发

在虚幻引擎中使用OpenXR为头戴式AR和VR设备开发内容。





](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)[

![为手持式设备开发增强现实体验](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7a1fc89-a67f-449c-ab35-69d739081d21/placeholder_topic.png)

为手持式设备开发增强现实体验

在虚幻引擎中为手持式AR设备开发体验





](/documentation/zh-cn/unreal-engine/developing-for-handheld-augmented-reality-experiences-in-unreal-engine)[

![XR开发入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/caa97a50-c9e5-4608-8f04-c28a1fda462a/placeholder_topic.png)

XR开发入门

使用虚幻引擎设置你的项目，并为AR和VR设备应用最佳实践。





](/documentation/zh-cn/unreal-engine/getting-started-with-xr-development-in-unreal-engine)[

![制作交互式XR体验](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5ab45fa-0ac9-4371-a1fc-605ae6be23f5/placeholder_topic.png)

制作交互式XR体验

为你的虚幻引擎AR和VR项目添加用户输入功能





](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine)[

![为XR体验设计UI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a689d2b9-4c4f-4d44-b743-ad4cc5d341a5/placeholder_topic.png)

为XR体验设计UI

在虚幻引擎中为XR体验设计用户界面





](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine)[

![共享XR体验](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60694710-4d24-4496-8fdb-348dd01604ea/placeholder_topic.png)

共享XR体验

使用虚幻引擎为多个用户打造沉浸式体验





](/documentation/zh-cn/unreal-engine/sharing-xr-experiences-in-unreal-engine)[

![支持的XR设备](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8e026e6-5196-4f3c-8b12-0d71d5fa061d/placeholder_topic.png)

支持的XR设备

设置你的增强现实和虚拟现实设备，以用虚幻引擎为其开发内容。





](/documentation/zh-cn/unreal-engine/supported-xr-devices-in-unreal-engine)

### Microsoft Windows和Xbox主机平台

![GDK](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce8c7423-7ea9-4460-a774-b0a555dcc058/console_gdk_topic.png)

-   [在UDN上查看GDK](https://udn.unrealengine.com/s/article/Xbox-GDK-Documentation-Download)
-   [从虚幻引擎论坛下载](https://forums.unrealengine.com/t/unreal-engine-gdk-documentation/1211003)

### Nintendo Switch

![Nintendo Switch](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c32ba425-43c6-41d5-ba6f-3fe39de5f9c8/console_ns_topic.png)

-   [在UDN上查看Nintendo Switch内容](https://udn.unrealengine.com/questions/510385/view.html)
-   [从虚幻引擎论坛下载](https://forums.unrealengine.com/t/unreal-engine-nintendo-switch-documentation/126664)

## 云部署

[](/documentation/zh-cn/unreal-engine/pixel-streaming-in-unreal-engine)

[![像素流送](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5cac83b4-b000-4905-8536-45572591dac9/pixelstreaming_topic_01.png)](/documentation/zh-cn/unreal-engine/pixel-streaming-in-unreal-engine)

[像素流送](/documentation/zh-cn/unreal-engine/pixel-streaming-in-unreal-engine)

[在云端服务器上运行虚幻引擎应用程序，通过WebRTC将渲染的帧和音频流送到浏览器和移动设备。](/documentation/zh-cn/unreal-engine/pixel-streaming-in-unreal-engine)

-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Deployment](/documentation/zh-cn/unreal-engine/sharing-and-releasing-projects-for-unreal-engine#deployment)
-   [平台通用支持工具](/documentation/zh-cn/unreal-engine/sharing-and-releasing-projects-for-unreal-engine#%E5%B9%B3%E5%8F%B0%E9%80%9A%E7%94%A8%E6%94%AF%E6%8C%81%E5%B7%A5%E5%85%B7)
-   [通用移动开发](/documentation/zh-cn/unreal-engine/sharing-and-releasing-projects-for-unreal-engine#%E9%80%9A%E7%94%A8%E7%A7%BB%E5%8A%A8%E5%BC%80%E5%8F%91)
-   [iOS、iPadOS和tvOS](/documentation/zh-cn/unreal-engine/sharing-and-releasing-projects-for-unreal-engine#ios%E3%80%81ipados%E5%92%8Ctvos)
-   [Android](/documentation/zh-cn/unreal-engine/sharing-and-releasing-projects-for-unreal-engine#android)
-   [XR开发（AR和VR）](/documentation/zh-cn/unreal-engine/sharing-and-releasing-projects-for-unreal-engine#xr%E5%BC%80%E5%8F%91%EF%BC%88ar%E5%92%8Cvr%EF%BC%89)
-   [Microsoft Windows和Xbox主机平台](/documentation/zh-cn/unreal-engine/sharing-and-releasing-projects-for-unreal-engine#microsoftwindows%E5%92%8Cxbox%E4%B8%BB%E6%9C%BA%E5%B9%B3%E5%8F%B0)
-   [Nintendo Switch](/documentation/zh-cn/unreal-engine/sharing-and-releasing-projects-for-unreal-engine#nintendoswitch)
-   [云部署](/documentation/zh-cn/unreal-engine/sharing-and-releasing-projects-for-unreal-engine#%E4%BA%91%E9%83%A8%E7%BD%B2)
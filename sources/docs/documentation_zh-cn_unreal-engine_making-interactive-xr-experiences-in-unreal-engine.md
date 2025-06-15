# 用虚幻引擎制作交互式XR体验 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:43:33.557Z

---

目录

![制作交互式XR体验](https://dev.epicgames.com/community/api/documentation/image/d6dd4d4f-54bf-48b4-a61d-806dcc2e35f0?resizing_type=fill&width=1920&height=335)

XR项目通常有许多种输入机制，例如手部追踪、手柄，以及眼部追踪。点击本文中的相关文档链接，了解如何为XR项目添加这类输入机制。

## OpenXR中为头戴式设备准备的输入机制

OpenXR运行时使用交互配置文件来支持各种硬件控制器，并且能够为连接的控制器提供按键/操作绑定。本文将解释输入机制的概念以及虚幻引擎中的OpenXR控制器映射模拟。

## 运动控制器

运动控制器（Motion Controller）表示参与XR设备输入机制的控制器（即手柄）或手。你可以通过运动控制器组件（Motion Controller Component）访问运动控制器，该组件通常连接到项目的Pawn。动作控制器组件继承自场景组件，场景组件支持基于位置的行为，并根据硬件追踪数据移动它所关联的Pawn。此组件会渲染运动控制器，并将控制器暴露给Pawn定义的用户交互。

这些页面将介绍如何在项目中设置运动控制器。

[

![使用运动控制器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57b17582-8c66-423f-8cbd-139b5fe290c8/placeholder_topic.png)

使用运动控制器

展示如何使用运动控制器拾取和放置物体。





](/documentation/zh-cn/unreal-engine/using-motion-controllers-in-unreal-engine)[

![运动控制器组件设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81e10c2b-5703-4c46-bcc9-61f009ec38ce/placeholder_topic.png)

运动控制器组件设置

有关如何为VR互动设置运动控制器的信息。





](/documentation/zh-cn/unreal-engine/motion-controller-component-setup-in-unreal-engine)

## 手部追踪

目前，有两个平台支持在虚幻引擎中实现手部追踪：HoloLens 2和Oculus Quest。以下小节将介绍了在其支持的各大平台上使用手部追踪的入门知识。

### Oculus Quest

Oculus Quest上的手部追踪可通过 **Oculus VR** 插件实现。目前，还无法在OpenXR项目中使用手部追踪。Oculus Quest上用于手部追踪的API通过Oculus的自定义组件提供。有关显示用户手部，并将其用作输入的更多细节，请参阅Oculus的[手部追踪文档](https://developer.oculus.com/documentation/unreal/unreal-hand-tracking/)。

![Oculus Quest手部追踪](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10d5afc0-58b7-4870-99e2-b077b7cff920/handtracking_smaller.gif)

## 培训教程

观看这些培训教程，学习如何为XR项目添加输入功能。

## 后续步骤

在XR项目中实现输入功能后，请按照这些指南，将更多的功能添加到项目中，并提高其性能。

[](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine)

[![为XR体验设计UI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a689d2b9-4c4f-4d44-b743-ad4cc5d341a5/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine)

[为XR体验设计UI](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine)

[在虚幻引擎中为XR体验设计用户界面](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine)

[

![共享XR体验](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60694710-4d24-4496-8fdb-348dd01604ea/placeholder_topic.png)

共享XR体验

使用虚幻引擎为多个用户打造沉浸式体验





](/documentation/zh-cn/unreal-engine/sharing-xr-experiences-in-unreal-engine)[

![XR性能和分析](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0eec00da-99fe-4131-9c2b-042ecdc646fa/placeholder_topic.png)

XR性能和分析

在虚幻引擎中分析虚拟现实项目的工具和方法





](/documentation/zh-cn/unreal-engine/xr-performance-and-profiling-in-unreal-engine)

-   [xr](https://dev.epicgames.com/community/search?query=xr)
-   [input](https://dev.epicgames.com/community/search?query=input)
-   [openxr](https://dev.epicgames.com/community/search?query=openxr)
-   [hand tracking](https://dev.epicgames.com/community/search?query=hand%20tracking)
-   [motion controllers](https://dev.epicgames.com/community/search?query=motion%20controllers)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [OpenXR中为头戴式设备准备的输入机制](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine#openxr%E4%B8%AD%E4%B8%BA%E5%A4%B4%E6%88%B4%E5%BC%8F%E8%AE%BE%E5%A4%87%E5%87%86%E5%A4%87%E7%9A%84%E8%BE%93%E5%85%A5%E6%9C%BA%E5%88%B6)
-   [运动控制器](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine#%E8%BF%90%E5%8A%A8%E6%8E%A7%E5%88%B6%E5%99%A8)
-   [手部追踪](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine#%E6%89%8B%E9%83%A8%E8%BF%BD%E8%B8%AA)
-   [Oculus Quest](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine#oculusquest)
-   [培训教程](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine#%E5%9F%B9%E8%AE%AD%E6%95%99%E7%A8%8B)
-   [后续步骤](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine#%E5%90%8E%E7%BB%AD%E6%AD%A5%E9%AA%A4)
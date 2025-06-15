# 在虚幻引擎中为XR体验设计用户界面 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:43:37.220Z

---

目录

![为XR体验设计UI](https://dev.epicgames.com/community/api/documentation/image/664f127e-2565-48df-aa82-a876a6c809eb?resizing_type=fill&width=1920&height=335)

你可以将用户界面（UI）添加到混合现实（XR）项目中，以便呈现信息，创建可交互对象。本文列出了在虚幻引擎中为XR应用创建UI的文档链接。

## 3D控件和交互

在XR项目中，UI必须是3D的，以便你可以在虚拟场景中与之交互。下述页面将引导你了解如何在虚幻引擎中创建可交互的3D控件。

## 在头显上显示内容

你可以用Pawn的摄像机组件，在头戴式显示设备（HMD）上添加内容。你可以创建HUD，添加需要跟随玩家的内容。本页面将引导你将项目附加到你的HMD。

[](/documentation/zh-cn/unreal-engine/attaching-items-to-the-hmd-in-unreal-engine)

[![在HMD中添加显示内容](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4788c5dd-abdf-4cbb-adcc-3947ea17dd10/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/attaching-items-to-the-hmd-in-unreal-engine)

[在HMD中添加显示内容](/documentation/zh-cn/unreal-engine/attaching-items-to-the-hmd-in-unreal-engine)

[在任意HMD中添加显示内容的相关信息。](/documentation/zh-cn/unreal-engine/attaching-items-to-the-hmd-in-unreal-engine)

## 在头戴式XR体验中显示游戏区域

用户可以在他们的XR设备上定义游戏区域的大小。本文介绍了如何在你的项目中显示用户的游戏区域边界。

[](/documentation/zh-cn/unreal-engine/visualizing-play-area-bounds-in-unreal-engine)

[![游戏区域边界可视化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03d74d7c-5265-4109-b633-23a815988c27/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/visualizing-play-area-bounds-in-unreal-engine)

[游戏区域边界可视化](/documentation/zh-cn/unreal-engine/visualizing-play-area-bounds-in-unreal-engine)

[使用OpenXR在头戴式体验中将用户的游戏区域可视化](/documentation/zh-cn/unreal-engine/visualizing-play-area-bounds-in-unreal-engine)

## 头戴式体验的立体图层

你可以通过单独的渲染通道，将纹理发送给头戴式显示器（HMD）。这些纹理可以在不经过后期处理的情况下直接显示。

这些页面介绍了不同类型的立体图层（stereo layer），以及如何在你的项目中使用。

[](/documentation/zh-cn/unreal-engine/openxr-stero-layers-in-unreal-engine)

[![OpenXR立体图层](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05286a99-a423-4523-9810-dae29f04953c/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/openxr-stero-layers-in-unreal-engine)

[OpenXR立体图层](/documentation/zh-cn/unreal-engine/openxr-stero-layers-in-unreal-engine)

[如何让纹理在单独渲染通道中渲染，从而避免受到后期处理设置的影响。](/documentation/zh-cn/unreal-engine/openxr-stero-layers-in-unreal-engine)

## 头戴式体验的加载屏幕

对于基于HMD的应用来说，你可以将纹理用作加载界面，作为关卡间的过渡效果。本页面介绍如何为项目添加加载界面。

[](/documentation/zh-cn/unreal-engine/openxr-loading-screens-in-unreal-engine)

[![OpenXR加载界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb8664e4-ce7f-4ba7-b6e6-e7f733b49b4f/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/openxr-loading-screens-in-unreal-engine)

[OpenXR加载界面](/documentation/zh-cn/unreal-engine/openxr-loading-screens-in-unreal-engine)

[了解如何将纹理用作加载界面，以便衔接XR项目中的不同关卡。](/documentation/zh-cn/unreal-engine/openxr-loading-screens-in-unreal-engine)

## 后续步骤

为XR项目添加UI界面后，你可以按照下述指南，添加更多功能，改善项目的性能。

[](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine)

[![制作交互式XR体验](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5ab45fa-0ac9-4371-a1fc-605ae6be23f5/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine)

[制作交互式XR体验](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine)

[为你的虚幻引擎AR和VR项目添加用户输入功能](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine)

[

![共享XR体验](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60694710-4d24-4496-8fdb-348dd01604ea/placeholder_topic.png)

共享XR体验

使用虚幻引擎为多个用户打造沉浸式体验





](/documentation/zh-cn/unreal-engine/sharing-xr-experiences-in-unreal-engine)[

![XR性能和分析](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0eec00da-99fe-4131-9c2b-042ecdc646fa/placeholder_topic.png)

XR性能和分析

在虚幻引擎中分析虚拟现实项目的工具和方法





](/documentation/zh-cn/unreal-engine/xr-performance-and-profiling-in-unreal-engine)

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [xr](https://dev.epicgames.com/community/search?query=xr)
-   [openxr](https://dev.epicgames.com/community/search?query=openxr)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [3D控件和交互](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine#3d%E6%8E%A7%E4%BB%B6%E5%92%8C%E4%BA%A4%E4%BA%92)
-   [在头显上显示内容](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine#%E5%9C%A8%E5%A4%B4%E6%98%BE%E4%B8%8A%E6%98%BE%E7%A4%BA%E5%86%85%E5%AE%B9)
-   [在头戴式XR体验中显示游戏区域](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine#%E5%9C%A8%E5%A4%B4%E6%88%B4%E5%BC%8Fxr%E4%BD%93%E9%AA%8C%E4%B8%AD%E6%98%BE%E7%A4%BA%E6%B8%B8%E6%88%8F%E5%8C%BA%E5%9F%9F)
-   [头戴式体验的立体图层](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine#%E5%A4%B4%E6%88%B4%E5%BC%8F%E4%BD%93%E9%AA%8C%E7%9A%84%E7%AB%8B%E4%BD%93%E5%9B%BE%E5%B1%82)
-   [头戴式体验的加载屏幕](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine#%E5%A4%B4%E6%88%B4%E5%BC%8F%E4%BD%93%E9%AA%8C%E7%9A%84%E5%8A%A0%E8%BD%BD%E5%B1%8F%E5%B9%95)
-   [后续步骤](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine#%E5%90%8E%E7%BB%AD%E6%AD%A5%E9%AA%A4)
# 虚幻引擎Oculus开发 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/developing-for-oculus-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:45:46.712Z

---

目录

![Oculus开发](https://dev.epicgames.com/community/api/documentation/image/ed4cd8c6-e194-42e0-910d-79575d61a8fb?resizing_type=fill&width=1920&height=335)

虚幻引擎5.1已经停用OculusVR插件。请改用OpenXR插件。

[Oculus](https://www.oculus.com/)是由[Meta](https://about.facebook.com/meta/)提供的[头戴式虚拟现实](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)平台，受到虚幻引擎的支持。本文介绍了虚幻引擎如何支持Oculus，以及你该如何设置环境以使用Oculus进行开发。如需了解虚幻引擎支持哪些Oculus设备，请参阅[支持的XR设备](/documentation/zh-cn/unreal-engine/supported-xr-devices-in-unreal-engine)获取完整列表。

目前，你可以使用 **OpenXR** 插件或 **Oculus VR** 插件针对Oculus设备进行开发:

-   在使用OpenXR插件进行开发时，你的应用程序可以在支持OpenXR API的设备上运行。
    
-   在使用Oculus VR插件进行开发时，你的应用程序可以使用Oculus独有但目前未包含在 **Oculus OpenXR** 扩展插件中的功能。
    

如需了解更多详细信息，请参阅下文中的[使用OpenXR API进行开发](/documentation/zh-cn/unreal-engine/developing-for-oculus-in-unreal-engine#%E4%BD%BF%E7%94%A8openxrapi%E8%BF%9B%E8%A1%8C%E5%BC%80%E5%8F%91)和[使用Oculus API进行开发](/documentation/zh-cn/unreal-engine/developing-for-oculus-in-unreal-engine#%E4%BD%BF%E7%94%A8oculusapi%E8%BF%9B%E8%A1%8C%E5%BC%80%E5%8F%91)小节。

## 使用OpenXR API进行开发

如需使用OpenXR在虚幻引擎中针对Oculus进行开发，必须设置以下内容：

-   已更新硬件和软件。请参阅[Oculus的系统和硬件要求](https://developer.oculus.com/documentation/mobilesdk/latest/concepts/mobile-reqs#mobile-reqs)
    
-   [Oculus应用](https://www.oculus.com/setup/)
    
-   Oculus Runtime v33.0或更高版本
    
-   [适用于Oculus的OpenXR Runtime](/documentation/zh-cn/unreal-engine/openxr-prerequisites-in-unreal-engine)
    
-   已在项目中启用 **OpenXR** 插件
    
-   （仅限Oculus Quest）已在项目中启用 **Oculus OpenXR** 插件
    

完成使用OpenXR进行开发的所有必要设置之后，你就可以使用OpenXR API针对Oculus设备和支持OpenXR API的设备进行开发了。如需获得更多详细信息，请参阅[使用OpenXR进行头戴式体验开发](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)。

## 使用Oculus API进行开发

如需使用Oculus的专用API在虚幻引擎中针对Oculus进行开发，必须设置以下内容：

-   已更新硬件和软件。请参阅[Oculus的系统和硬件要求](https://developer.oculus.com/documentation/mobilesdk/latest/concepts/mobile-reqs#mobile-reqs)
    
-   [Oculus应用](https://www.oculus.com/setup/)
    
-   Oculus Runtime v33.0或更高版本
    
-   已在项目中启用 **Oculus VR** 插件
    

完成使用Oculus VR插件进行开发的所有必要设置之后，你就可以使用OpenXR API中尚未提供的Oculus独有功能了。以下功能目前只能通过Oculus VR插件提供给Oculus设备：

-   [使用Oculus Quest进行手部追踪](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine#oculusquest)
    
-   [固定注视点渲染](/documentation/zh-cn/unreal-engine/xr-performance-features-in-unreal-engine#%E5%8F%AF%E5%8F%98%E9%80%9F%E7%8E%87%E7%9D%80%E8%89%B2%E5%92%8C%E5%9B%BA%E5%AE%9A%E6%B3%A8%E8%A7%86%E7%82%B9%E6%B8%B2%E6%9F%93)
    

## 开发入门

在使用 **OpenXR** 或 **Oculus VR** 插件设置项目之后，即可按照以下指示开始为Oculus设备进行开发。

[](/documentation/zh-cn/unreal-engine/getting-started-with-xr-development-in-unreal-engine)

[![XR开发入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/caa97a50-c9e5-4608-8f04-c28a1fda462a/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/getting-started-with-xr-development-in-unreal-engine)

[XR开发入门](/documentation/zh-cn/unreal-engine/getting-started-with-xr-development-in-unreal-engine)

[使用虚幻引擎设置你的项目，并为AR和VR设备应用最佳实践。](/documentation/zh-cn/unreal-engine/getting-started-with-xr-development-in-unreal-engine)

[](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine)

[![制作交互式XR体验](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5ab45fa-0ac9-4371-a1fc-605ae6be23f5/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine)

[制作交互式XR体验](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine)

[为你的虚幻引擎AR和VR项目添加用户输入功能](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine)

[](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine)

[![为XR体验设计UI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a689d2b9-4c4f-4d44-b743-ad4cc5d341a5/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine)

[为XR体验设计UI](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine)

[在虚幻引擎中为XR体验设计用户界面](/documentation/zh-cn/unreal-engine/design-user-interfaces-for-xr-experiences-in-unreal-engine)

[](/documentation/zh-cn/unreal-engine/xr-performance-and-profiling-in-unreal-engine)

[![XR性能和分析](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0eec00da-99fe-4131-9c2b-042ecdc646fa/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/xr-performance-and-profiling-in-unreal-engine)

[XR性能和分析](/documentation/zh-cn/unreal-engine/xr-performance-and-profiling-in-unreal-engine)

[在虚幻引擎中分析虚拟现实项目的工具和方法](/documentation/zh-cn/unreal-engine/xr-performance-and-profiling-in-unreal-engine)

## Oculus上的自动实例化

**绘制调用** 是用于绘制对象的RHI命令。**自动实例化** 是一种将多个绘制调用自动组合成单个实例化绘制调用的功能。**实例化绘制调用** 可供图形API为具有不同属性的类似对象绘制多个实例。这些属性可以是与网格体渲染相关的任何属性：位置、方向、颜色等等。本页面提供在Oculus Quest上进行自动实例化有关的更多详细信息。

[](/documentation/zh-cn/unreal-engine/auto-instancing-on-oculus-in-unreal-engine)

[![Oculus上的自动实例化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be41a81e-d308-4687-be7c-a522226e4741/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/auto-instancing-on-oculus-in-unreal-engine)

[Oculus上的自动实例化](/documentation/zh-cn/unreal-engine/auto-instancing-on-oculus-in-unreal-engine)

[在UE4中为Oculus Quest项目调试自动实例化](/documentation/zh-cn/unreal-engine/auto-instancing-on-oculus-in-unreal-engine)

## 故障排除和分析

以下内容将介绍如何分析XR应用程序，以及在需要提高性能时应该考虑的事项。

-   [虚幻引擎中的XR性能和分析](/documentation/zh-cn/unreal-engine/xr-performance-and-profiling-in-unreal-engine)
    
-   [在虚幻引擎中测试和优化内容](/documentation/zh-cn/unreal-engine/testing-and-optimizing-your-content)
    
-   关于[优化工具](https://developer.oculus.com/documentation/unreal/ts-book-tools)的Oculus页面
    

如果遇到Oculus头戴设备的相关问题，请访问[Oculus支持中心](https://support.oculus.com/)获得有关故障排除方面的帮助。

-   [vr](https://dev.epicgames.com/community/search?query=vr)
-   [platform](https://dev.epicgames.com/community/search?query=platform)
-   [openxr](https://dev.epicgames.com/community/search?query=openxr)
-   [oculus](https://dev.epicgames.com/community/search?query=oculus)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用OpenXR API进行开发](/documentation/zh-cn/unreal-engine/developing-for-oculus-in-unreal-engine#%E4%BD%BF%E7%94%A8openxrapi%E8%BF%9B%E8%A1%8C%E5%BC%80%E5%8F%91)
-   [使用Oculus API进行开发](/documentation/zh-cn/unreal-engine/developing-for-oculus-in-unreal-engine#%E4%BD%BF%E7%94%A8oculusapi%E8%BF%9B%E8%A1%8C%E5%BC%80%E5%8F%91)
-   [开发入门](/documentation/zh-cn/unreal-engine/developing-for-oculus-in-unreal-engine#%E5%BC%80%E5%8F%91%E5%85%A5%E9%97%A8)
-   [Oculus上的自动实例化](/documentation/zh-cn/unreal-engine/developing-for-oculus-in-unreal-engine#oculus%E4%B8%8A%E7%9A%84%E8%87%AA%E5%8A%A8%E5%AE%9E%E4%BE%8B%E5%8C%96)
-   [故障排除和分析](/documentation/zh-cn/unreal-engine/developing-for-oculus-in-unreal-engine#%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4%E5%92%8C%E5%88%86%E6%9E%90)
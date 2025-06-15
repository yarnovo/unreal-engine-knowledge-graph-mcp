# 虚幻引擎中光源的特性和属性 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/features-and-properties-of-lights-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:14:25.263Z

---

目录

![直接光照](https://dev.epicgames.com/community/api/documentation/image/eb2840b7-36a1-45d9-848a-c6748fe39823?resizing_type=fill&width=1920&height=335)

虚幻引擎中的光源包含大量属性，这些属性一定程度上取决于[光源的移动性和类型](/documentation/zh-cn/unreal-engine/light-types-and-their-mobility-in-unreal-engine)。

在关卡中选择光源时，可以在 **细节（Details）** 面板中找到光源属性。根据光源 **移动性（Mobility）** 是 **静态（Static）** 、**固定（Stationary）** 或 **可移动（Movable）**，光源特性和属性会各有不同。

![定向光源属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61b5b4ed-7665-4cdc-8bd5-a4cddd1a8de3/light-properties.png)

定向光源的光源属性。

## 光源属性相关的注意事项

在深入了解光源的专有特性和属性之前，你需要考虑以下事项：

-   你的场景需要什么类型的光源照亮？
-   光源应该具备什么样的移动性？
-   可以根据需求混合和匹配具有不同移动性的光源来照亮场景。但是，必须考虑这对关卡内的光照、阴影和资产有什么影响。并非所有属性都支持每种移动性或光源类型。
-   [阴影](/documentation/zh-cn/unreal-engine/shadowing-in-unreal-engine)是与光照相关的一个广泛主题。项目设置中的移动性、光源类型甚至启用的光照特性都会影响项目中光照的工作方式。
-   某些类型的光源可以补充其他独立特性，例如用于[环境光照](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine)的光源。

## 设置光源属性

在关卡中选择光源时，可以在 **细节（Details）** 面板中找到光源属性和特性。

每个光源都必须将其 **移动性（Mobility）** 设置为 **静态（Static）** 、**固定（Stationary）** 或 **可移动（Movable）** 。

![光源移动性选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e9e7f91-a2e5-49c9-9d85-6c9289e767dd/il_mobility.png)

无论选择何种光源，其所有属性都会列出，但移动性会决定哪些属性受支持。例如，Lightmass设置仅影响移动性为静态（Static）或固定（Stationary）的光源。

浏览以下主题，了解适用于场景和项目中光源的一些特性和属性。

### 光源特性和属性相关的常见话题

下文列出了所有（或大多数）类型的光源会涉及的常见概念和特性。它们可能是某种单独的光源特性，或者适用于更大规模特性（如全局光照）的光源属性。

[](/documentation/zh-cn/unreal-engine/megalights-in-unreal-engine)

[![MegaLights](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4a9ed76-ba0c-4328-a648-7c999e2460c7/ml-example-1.png)](/documentation/zh-cn/unreal-engine/megalights-in-unreal-engine)

[MegaLights](/documentation/zh-cn/unreal-engine/megalights-in-unreal-engine)

[一种全新的直接光照路径，可在场景中放置大量动态和阴影区域光源。](/documentation/zh-cn/unreal-engine/megalights-in-unreal-engine)

[

![物理光照单位](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d646aee8-2275-413f-830a-894ddf444c66/physical-light-units-topic.png)

物理光照单位

设置光源的物理光照单位





](/documentation/zh-cn/unreal-engine/using-physical-lighting-units-in-unreal-engine)[

![全局光照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff7195e6-3800-4fca-94de-cc7296c1dafe/randg_topicsmall.png)

全局光照

介绍可供选择的全局光照选项。





](/documentation/zh-cn/unreal-engine/global-illumination-in-unreal-engine)[

![阴影](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7641372c-de10-407f-afdd-575b9edf0736/source-radius-example.png)

阴影

介绍可用的阴影方法以及它们提供的属性。





](/documentation/zh-cn/unreal-engine/shadowing-in-unreal-engine)[

![反射环境](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2dc1da12-b82e-42ad-a4fd-2de780b38357/rtr_multiplebounces.png)

反射环境

捕捉并显示局部光泽反射的系统。





](/documentation/zh-cn/unreal-engine/reflections-environment-in-unreal-engine)[

![光源类型及其可移动性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5ffff19-6050-4086-854a-ed04e197be65/lm_topic.png)

光源类型及其可移动性

可供选择的可用光源类型及其移动性设置如何影响场景中的光照。





](/documentation/zh-cn/unreal-engine/light-types-and-their-mobility-in-unreal-engine)[

![网格体距离场](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be2eff44-81d0-496b-b929-f960c1a94daf/distance-field-topic.png)

网格体距离场

概述网格体距离场以及你在开发游戏可以用到的相关功能。





](/documentation/zh-cn/unreal-engine/mesh-distance-fields-in-unreal-engine)[

![光照通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/276e51f4-b600-4381-ac34-af7003bcc06f/using-lightning-channels-topic.png)

光照通道

通过设置光源的光照通道来选择性地照亮表面。





](/documentation/zh-cn/unreal-engine/using-lighting-channels-in-unreal-engine)[

![IES光源描述文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86c60176-90f7-42ce-9bb7-4a9b8c79612b/ies-light-profiles-topic.png)

IES光源描述文件

介绍如何设置光源使用IES纹理。





](/documentation/zh-cn/unreal-engine/using-ies-light-profiles-in-unreal-engine)%building-virtual-worlds/lighting-and-shadows/features-of-lights/light-functions:Topic%

## 定向光源特性和属性主题

以下特性适用于[定向光源](/documentation/zh-cn/unreal-engine/directional-lights-in-unreal-engine)。

%building-virtual-worlds/lighting-and-shadows/features-of-lights/light-shafts:Topic%[](/documentation/zh-cn/unreal-engine/sky-atmosphere-component-in-unreal-engine)

[![天空大气组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e09f97c-fad2-4d77-9cd1-55a4e79e8ce5/sky-atmosphere-topic-image.png)](/documentation/zh-cn/unreal-engine/sky-atmosphere-component-in-unreal-engine)

[天空大气组件](/documentation/zh-cn/unreal-engine/sky-atmosphere-component-in-unreal-engine)

[天空大气系统用于创建基于物理的天空和大气渲染，提供一天时间功能以及具有空气透视的地面到太空视图过渡。](/documentation/zh-cn/unreal-engine/sky-atmosphere-component-in-unreal-engine)

[

![体积云组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea75acb8-2a02-4931-bbf2-d673ce364f61/volumetric-cloud-topic-image.png)

体积云组件

使用体积材质进行实时云渲染





](/documentation/zh-cn/unreal-engine/volumetric-cloud-component-in-unreal-engine)

## 天空光照特性和属性主题

以下特性适用于[天空光照](/documentation/zh-cn/unreal-engine/sky-lights-in-unreal-engine)。

[](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine)

[![雾、云、天空和大气的环境光源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12ac4bfd-fe43-42bf-b7dd-583bdc8f4b1f/randg_topicfull.png)](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine)

[雾、云、天空和大气的环境光源](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine)

[使用户能够利用雾、云、天空和大气的环境光照构建沉浸式世界的组件和工具。](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine)

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [lights](https://dev.epicgames.com/community/search?query=lights)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [光源属性相关的注意事项](/documentation/zh-cn/unreal-engine/features-and-properties-of-lights-in-unreal-engine#%E5%85%89%E6%BA%90%E5%B1%9E%E6%80%A7%E7%9B%B8%E5%85%B3%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
-   [设置光源属性](/documentation/zh-cn/unreal-engine/features-and-properties-of-lights-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%85%89%E6%BA%90%E5%B1%9E%E6%80%A7)
-   [光源特性和属性相关的常见话题](/documentation/zh-cn/unreal-engine/features-and-properties-of-lights-in-unreal-engine#%E5%85%89%E6%BA%90%E7%89%B9%E6%80%A7%E5%92%8C%E5%B1%9E%E6%80%A7%E7%9B%B8%E5%85%B3%E7%9A%84%E5%B8%B8%E8%A7%81%E8%AF%9D%E9%A2%98)
-   [定向光源特性和属性主题](/documentation/zh-cn/unreal-engine/features-and-properties-of-lights-in-unreal-engine#%E5%AE%9A%E5%90%91%E5%85%89%E6%BA%90%E7%89%B9%E6%80%A7%E5%92%8C%E5%B1%9E%E6%80%A7%E4%B8%BB%E9%A2%98)
-   [天空光照特性和属性主题](/documentation/zh-cn/unreal-engine/features-and-properties-of-lights-in-unreal-engine#%E5%A4%A9%E7%A9%BA%E5%85%89%E7%85%A7%E7%89%B9%E6%80%A7%E5%92%8C%E5%B1%9E%E6%80%A7%E4%B8%BB%E9%A2%98)
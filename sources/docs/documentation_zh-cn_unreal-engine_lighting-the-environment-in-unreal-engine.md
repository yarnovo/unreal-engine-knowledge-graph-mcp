# 在虚幻引擎中为场景设置光照 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lighting-the-environment-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:13:38.751Z

---

目录

![为场景设置光照](https://dev.epicgames.com/community/api/documentation/image/a120fa1d-d01d-4f65-8fff-79e9e9661072?resizing_type=fill&width=1920&height=335)

在搭建虚拟世界时，设计光照的方式将会是重要的一环。这意味着你既要考虑如何用一些小型光源为小型的封闭场景打光，也要考虑如何用单盏大型光源为大型场景打光。虚幻引擎提供了各种工具和光照选项，能满足你的项目的各种需求。

本文主题介绍了各种可用的光照功能和工具，同时还包含了在虚幻引擎中对场景进行光照的学习路径介绍。

## 全新UE5光照功能

[](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)

[![Lumen全局光照和反射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9405eaf-e44e-42b5-bbf2-204bb365d72f/lumentopicimage.png)](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)

[Lumen全局光照和反射](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)

[介绍Lumen的动态全局光照和反射功能。](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)

[

![Lumen技术细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/950b8fa2-7fd8-46a7-aab2-4b439b26ba47/lumen-far-field.png)

Lumen技术细节

深入介绍通过软件或硬件光线追踪使用Lumen全局光照以及反射功能的技术细节。





](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine)%building-virtual-worlds/lighting-and-shadows/shadows/virtual-shadow-maps:Topic%

## 光照基本知识

[](/documentation/zh-cn/unreal-engine/light-types-and-their-mobility-in-unreal-engine)

[![光源类型及其可移动性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5ffff19-6050-4086-854a-ed04e197be65/lm_topic.png)](/documentation/zh-cn/unreal-engine/light-types-and-their-mobility-in-unreal-engine)

[光源类型及其可移动性](/documentation/zh-cn/unreal-engine/light-types-and-their-mobility-in-unreal-engine)

[可供选择的可用光源类型及其移动性设置如何影响场景中的光照。](/documentation/zh-cn/unreal-engine/light-types-and-their-mobility-in-unreal-engine)

[

![直接光照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6018a8b-b6ce-4991-832f-81bf6f8580b8/pcls-topic.png)

直接光照

关于光源支持的各种属性和特性的概述。





](/documentation/zh-cn/unreal-engine/features-and-properties-of-lights-in-unreal-engine)[

![设计视觉、渲染和图形效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3f84596-e583-408d-89c9-4a797dfa3e0a/randg_topicsmall.png)

设计视觉、渲染和图形效果

介绍渲染相关的子系统，包括光照阴影、材质纹理、视觉特效以及后期处理。





](/documentation/zh-cn/unreal-engine/designing-visuals-rendering-and-graphics-with-unreal-engine)

## 光照功能和工具

[](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine)

[![雾、云、天空和大气的环境光源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12ac4bfd-fe43-42bf-b7dd-583bdc8f4b1f/randg_topicfull.png)](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine)

[雾、云、天空和大气的环境光源](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine)

[使用户能够利用雾、云、天空和大气的环境光照构建沉浸式世界的组件和工具。](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine)

[

![全局光照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff7195e6-3800-4fca-94de-cc7296c1dafe/randg_topicsmall.png)

全局光照

介绍可供选择的全局光照选项。





](/documentation/zh-cn/unreal-engine/global-illumination-in-unreal-engine)[

![Lumen全局光照和反射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9405eaf-e44e-42b5-bbf2-204bb365d72f/lumentopicimage.png)

Lumen全局光照和反射

介绍Lumen的动态全局光照和反射功能。





](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)[

![网格体距离场](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be2eff44-81d0-496b-b929-f960c1a94daf/distance-field-topic.png)

网格体距离场

概述网格体距离场以及你在开发游戏可以用到的相关功能。





](/documentation/zh-cn/unreal-engine/mesh-distance-fields-in-unreal-engine)[

![硬件光线追踪和路径追踪功能](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26c2165b-146d-4c3e-8657-c3e0b3a546e9/rt_shadows_enabled-3.png)

硬件光线追踪和路径追踪功能

探索使用光线追踪光照功能设置并使用实时硬件光线追踪和路径追踪渲染场景的话题。





](/documentation/zh-cn/unreal-engine/ray-tracing-and-path-tracing-features-in-unreal-engine)[

![阴影](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7641372c-de10-407f-afdd-575b9edf0736/source-radius-example.png)

阴影

介绍可用的阴影方法以及它们提供的属性。





](/documentation/zh-cn/unreal-engine/shadowing-in-unreal-engine)%building-virtual-worlds/lighting-and-shadows/shadows/virtual-shadow-maps:Topic%[

![反射环境](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2dc1da12-b82e-42ad-a4fd-2de780b38357/rtr_multiplebounces.png)

反射环境

捕捉并显示局部光泽反射的系统。





](/documentation/zh-cn/unreal-engine/reflections-environment-in-unreal-engine)

## 光照工具和插件

[](/documentation/zh-cn/unreal-engine/lighting-tools-and-plugins-in-unreal-engine)

[![光照工具和插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ef4006d-3337-4115-a64f-3992754f640e/randg_topicfull.png)](/documentation/zh-cn/unreal-engine/lighting-tools-and-plugins-in-unreal-engine)

[光照工具和插件](/documentation/zh-cn/unreal-engine/lighting-tools-and-plugins-in-unreal-engine)

[介绍各种可以为场景添加光照的工具和插件。](/documentation/zh-cn/unreal-engine/lighting-tools-and-plugins-in-unreal-engine)

[

![接触阴影](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8529a24-a307-49be-9cdd-b856b23ecd53/contactshadow_topic.png)

接触阴影

介绍如何使用屏幕空间阴影来实现接触硬阴影。





](/documentation/zh-cn/unreal-engine/contact-shadows-in-unreal-engine)[

![胶囊体阴影](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef76cd36-143d-4836-91e4-7e866adf686f/capsuleshadows_topic.png)

胶囊体阴影

使用物理胶囊体来实现骨骼网格体的动态软阴影。





](/documentation/zh-cn/unreal-engine/capsule-shadows-in-unreal-engine)

## 综合

[](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)

[![后期处理效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42d36cb0-8539-4ae6-8985-aa39fa20aaa5/ppe_topic.png)](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)

[后期处理效果](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)

[了解可以被应用到放置的体积和摄像机上的效果。这些美术向的效果可以用颜色、色调映射、光照等定义场景的外观和氛围。](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)

%building-virtual-worlds/lighting-and-shadows/environmental-lighting/volumetric-fog:Topic% %building-virtual-worlds/lighting-and-shadows/features-of-lights/light-shafts:Topic%[

![在材质中使用透明度](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9adfb7e1-2397-48d9-a1d6-c99ac5d332a4/transparency-topic-image.png)

在材质中使用透明度

本页面说明了如何在你的材质中使用透明度。





](/documentation/zh-cn/unreal-engine/using-transparency-in-unreal-engine-materials)[

![使用凹凸贴图偏移](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b83e83dc-9490-4d41-8115-c2cee1e64de4/bump-offset-topic.png)

使用凹凸贴图偏移

有关在材质中使用凹凸贴图偏移（Bump Offset）节点的指南。





](/documentation/zh-cn/unreal-engine/using-bump-offset-in-unreal-engine)[

![IES光源描述文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86c60176-90f7-42ce-9bb7-4a9b8c79612b/ies-light-profiles-topic.png)

IES光源描述文件

介绍如何设置光源使用IES纹理。





](/documentation/zh-cn/unreal-engine/using-ies-light-profiles-in-unreal-engine)[

![HDRI背景可视化工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3eb941d2-d7e3-42e6-9847-7703900eb9e4/hdri-topic.png)

HDRI背景可视化工具

一个蓝图工具，通过使用带有实时光照和阴影的HDR图像投影，快速设置你的产品可视化效果。





](/documentation/zh-cn/unreal-engine/hdri-backdrop-visualization-tool-in-unreal-engine)

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [shadowing](https://dev.epicgames.com/community/search?query=shadowing)
-   [global illumination](https://dev.epicgames.com/community/search?query=global%20illumination)
-   [reflections](https://dev.epicgames.com/community/search?query=reflections)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [全新UE5光照功能](/documentation/zh-cn/unreal-engine/lighting-the-environment-in-unreal-engine#%E5%85%A8%E6%96%B0ue5%E5%85%89%E7%85%A7%E5%8A%9F%E8%83%BD)
-   [光照基本知识](/documentation/zh-cn/unreal-engine/lighting-the-environment-in-unreal-engine#%E5%85%89%E7%85%A7%E5%9F%BA%E6%9C%AC%E7%9F%A5%E8%AF%86)
-   [光照功能和工具](/documentation/zh-cn/unreal-engine/lighting-the-environment-in-unreal-engine#%E5%85%89%E7%85%A7%E5%8A%9F%E8%83%BD%E5%92%8C%E5%B7%A5%E5%85%B7)
-   [光照工具和插件](/documentation/zh-cn/unreal-engine/lighting-the-environment-in-unreal-engine#%E5%85%89%E7%85%A7%E5%B7%A5%E5%85%B7%E5%92%8C%E6%8F%92%E4%BB%B6)
-   [综合](/documentation/zh-cn/unreal-engine/lighting-the-environment-in-unreal-engine#%E7%BB%BC%E5%90%88)
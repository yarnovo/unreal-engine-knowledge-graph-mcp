# 使用虚幻引擎设计视觉、渲染和图形效果 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/designing-visuals-rendering-and-graphics-with-unreal-engine
> 
> 生成时间: 2025-06-14T19:20:56.595Z

---

目录

![设计视觉、渲染和图形效果](https://dev.epicgames.com/community/api/documentation/image/5db6dd13-0e1f-4db1-bb32-4a837781cf74?resizing_type=fill&width=1920&height=335)

虚幻引擎的渲染系统是其拥有业界领先画质以及卓越的交互式实时体验的关键所在。在本文中，你将见识到可用于设计、开发项目的各种功能、概念及工具；通过它们，你可以开发出拥有影视级品质的作品，也可以为次世代主机和移动平台打造拥有无与伦比真实度的作品。

下列主题能帮助你设置并管理纹理及材质，然后应用到模型表面上，它们还有助于你了解一些概念性的光照技巧，帮助你[搭建虚拟场景世界](/documentation/zh-cn/unreal-engine/lighting-the-environment-in-unreal-engine)，创建令人惊艳的视觉效果，对性能进行优化和调试，以及更多内容。

## 虚幻引擎5中的全新渲染功能和工具

[](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)

[![Lumen全局光照和反射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9405eaf-e44e-42b5-bbf2-204bb365d72f/lumentopicimage.png)](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)

[Lumen全局光照和反射](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)

[介绍Lumen的动态全局光照和反射功能。](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)

[

![Lumen技术细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/950b8fa2-7fd8-46a7-aab2-4b439b26ba47/lumen-far-field.png)

Lumen技术细节

深入介绍通过软件或硬件光线追踪使用Lumen全局光照以及反射功能的技术细节。





](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine)%designing-visuals-rendering-and-graphics/rendering-optimization/nanite:Topic% %building-virtual-worlds/lighting-and-shadows/shadows/virtual-shadow-maps:Topic%[

![Substrate材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d582b7df-09c3-4315-81d2-f0edc4860a1c/substrate-topic.png)

Substrate材质

有关Substrate材质框架的信息和参考内容。





](/documentation/zh-cn/unreal-engine/substrate-materials-in-unreal-engine)[

![路径追踪器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0887f69e-6bb4-4a64-a752-5ffaee1ef462/pathtracer.png)

路径追踪器

了解路径追踪器，以及如何用它为最终镜头渲染高质量图像，并与实时渲染场景进行直观的比较。





](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine)[

![GPU转储文件查看器工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ef767b7-9ebf-418c-ab2a-9fc05cf685b9/gpu-dump-viewer-pass-viewer.png)

GPU转储文件查看器工具

这个多平台命令可以将中间RDG纹理和缓冲转储至磁盘中，用以调查并调试渲染问题。





](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine)[

![渲染依赖图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44b30844-771d-46e1-a51f-72200420ed0c/setup-and-execute-timelines-with-and-without-rdg.png)

渲染依赖图

一种即时模式API，可将要编译和执行的渲染命令记录到图数据结构中。





](/documentation/zh-cn/unreal-engine/render-dependency-graph-in-unreal-engine)

## 美术设置及工具

[](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine)

[![纹理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba1ff4b2-613a-41ac-a7d1-d350fedca14e/texture-asset-editor.png)](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine)

[纹理](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine)

[介绍纹理资产的用处和用法。](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine)

[

![材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cdeef2f5-00ad-4403-bbd3-ee8f0b14330e/materials-topic-image.png)

材质

使用着色器控制世界中表面的外观。





](/documentation/zh-cn/unreal-engine/unreal-engine-materials)[

![基于物理的材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d659c3a3-4fe9-461d-b484-ccab548f1612/pbr-topic-image.png)

基于物理的材质

基于物理的材质主要输入及其最佳使用方法的概述。





](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine)[

![UV编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2906765c-72b8-440a-81d1-606f236ada26/topic.png)

UV编辑器

UV编辑器界面和工具概述。





](/documentation/zh-cn/unreal-engine/uv-editor-in-unreal-engine)

## 光照概念和功能

[](/documentation/zh-cn/unreal-engine/lighting-the-environment-in-unreal-engine)

[![为场景设置光照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/efa8f2d1-22c0-4c0f-b235-1330c6d5a663/lighting_topic.png)](/documentation/zh-cn/unreal-engine/lighting-the-environment-in-unreal-engine)

[为场景设置光照](/documentation/zh-cn/unreal-engine/lighting-the-environment-in-unreal-engine)

[介绍与场景光照相关的功能和工具。](/documentation/zh-cn/unreal-engine/lighting-the-environment-in-unreal-engine)

[

![全局光照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff7195e6-3800-4fca-94de-cc7296c1dafe/randg_topicsmall.png)

全局光照

介绍可供选择的全局光照选项。





](/documentation/zh-cn/unreal-engine/global-illumination-in-unreal-engine)[

![Lumen全局光照和反射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9405eaf-e44e-42b5-bbf2-204bb365d72f/lumentopicimage.png)

Lumen全局光照和反射

介绍Lumen的动态全局光照和反射功能。





](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)[

![Lumen技术细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/950b8fa2-7fd8-46a7-aab2-4b439b26ba47/lumen-far-field.png)

Lumen技术细节

深入介绍通过软件或硬件光线追踪使用Lumen全局光照以及反射功能的技术细节。





](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine)%building-virtual-worlds/lighting-and-shadows/shadows/virtual-shadow-maps:Topic%[

![异类体积](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aed9fc46-6175-48ef-9832-fc66c4bbd4ba/hv-niagara-fluid-path-tracer.png)

异类体积

使用异类体积组件渲染从稀疏体积纹理取样的体积域材质。





](/documentation/zh-cn/unreal-engine/heterogeneous-volumes-in-unreal-engine)[

![稀疏体积纹理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ecc9c89-e61f-46c0-8c45-85f6b8a84534/svt-cloud-example.png)

稀疏体积纹理

该资产将存储烘焙的模拟数据来表示体积介质，例如烟雾、火焰和水。





](/documentation/zh-cn/unreal-engine/sparse-volume-textures-in-unreal-engine)[

![硬件光线追踪和路径追踪功能](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26c2165b-146d-4c3e-8657-c3e0b3a546e9/rt_shadows_enabled-3.png)

硬件光线追踪和路径追踪功能

探索使用光线追踪光照功能设置并使用实时硬件光线追踪和路径追踪渲染场景的话题。





](/documentation/zh-cn/unreal-engine/ray-tracing-and-path-tracing-features-in-unreal-engine)[

![直接光照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6018a8b-b6ce-4991-832f-81bf6f8580b8/pcls-topic.png)

直接光照

关于光源支持的各种属性和特性的概述。





](/documentation/zh-cn/unreal-engine/features-and-properties-of-lights-in-unreal-engine)[

![光源类型及其可移动性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5ffff19-6050-4086-854a-ed04e197be65/lm_topic.png)

光源类型及其可移动性

可供选择的可用光源类型及其移动性设置如何影响场景中的光照。





](/documentation/zh-cn/unreal-engine/light-types-and-their-mobility-in-unreal-engine)[

![雾、云、天空和大气的环境光源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12ac4bfd-fe43-42bf-b7dd-583bdc8f4b1f/randg_topicfull.png)

雾、云、天空和大气的环境光源

使用户能够利用雾、云、天空和大气的环境光照构建沉浸式世界的组件和工具。





](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine)[

![网格体距离场](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be2eff44-81d0-496b-b929-f960c1a94daf/distance-field-topic.png)

网格体距离场

概述网格体距离场以及你在开发游戏可以用到的相关功能。





](/documentation/zh-cn/unreal-engine/mesh-distance-fields-in-unreal-engine)[

![反射环境](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2dc1da12-b82e-42ad-a4fd-2de780b38357/rtr_multiplebounces.png)

反射环境

捕捉并显示局部光泽反射的系统。





](/documentation/zh-cn/unreal-engine/reflections-environment-in-unreal-engine)[

![阴影](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7641372c-de10-407f-afdd-575b9edf0736/source-radius-example.png)

阴影

介绍可用的阴影方法以及它们提供的属性。





](/documentation/zh-cn/unreal-engine/shadowing-in-unreal-engine)

## 常用渲染功能

[](/documentation/zh-cn/unreal-engine/rendering-components-in-unreal-engine)

[![渲染组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25df0a43-890b-442d-8c8f-5960390f6b4b/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/rendering-components-in-unreal-engine)

[渲染组件](/documentation/zh-cn/unreal-engine/rendering-components-in-unreal-engine)

[介绍不同的渲染类组件，包括粒子系统组件、贴花组件、广告牌组件。](/documentation/zh-cn/unreal-engine/rendering-components-in-unreal-engine)

[

![骨骼网格体渲染路径](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10a5003e-fd7f-458b-8864-668e36f2233b/skin-cache-topic.png)

骨骼网格体渲染路径

关于骨骼网格体可用渲染路径的简要概述。





](/documentation/zh-cn/unreal-engine/skeletal-mesh-rendering-paths-in-unreal-engine)[

![如何将影片渲染队列用于高质量渲染](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d710db46-a322-4206-94cf-74f529495065/placeholder_topic.png)

如何将影片渲染队列用于高质量渲染

关于虚幻引擎影片渲染队列功能的配置指南，旨在帮助你便获取高质量过场动画（特别适用于启用光线追踪的情况下）。





](/documentation/zh-cn/unreal-engine/rendering-high-quality-frames-with-movie-render-queue-in-unreal-engine)%building-virtual-worlds/landscape-outdoor-terrain/landscape-material-layer-blending:Topic%[

![创建并使用 LOD](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93cc8c24-39e8-43fc-8da4-44ab573f120f/topic-image.png)

创建并使用 LOD

如何创建并使用 LOD。





](/documentation/zh-cn/unreal-engine/creating-and-using-lods-in-unreal-engine)[

![理解虚幻引擎中的光照贴图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de010fa6-24c9-42ed-b7f2-728a27b1bc67/placeholder_topic.png)

理解虚幻引擎中的光照贴图

关于为静态网格体设置光照贴图UV的技巧和指南。





](/documentation/zh-cn/unreal-engine/understanding-lightmapping-in-unreal-engine)[

![生成光照贴图UV](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f4aa0e1-56ea-48c4-b7bc-a24e80e6a665/topic-image.png)

生成光照贴图UV

介绍如何在虚幻引擎中生成你自己的光照贴图UV。





](/documentation/zh-cn/unreal-engine/generating-lightmap-uvs-in-unreal-engine)

## 视觉和系统工具

[](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)

[![后期处理效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42d36cb0-8539-4ae6-8985-aa39fa20aaa5/ppe_topic.png)](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)

[后期处理效果](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)

[了解可以被应用到放置的体积和摄像机上的效果。这些美术向的效果可以用颜色、色调映射、光照等定义场景的外观和氛围。](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)

[

![创建视觉效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19dab511-9b5c-4eb2-b8bd-199fb41c7e81/niagara-landing-topic.png)

创建视觉效果

虚幻引擎的Niagara视觉效果系统可用于创建和实时预览粒子效果。





](/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine)[

![XR最佳实践](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/395e0fe2-5e38-4f1c-ad9b-cd6013ef6af1/placeholder_topic.png)

XR最佳实践

关于创建与优化XR项目的最佳实践





](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine)[

![正交摄像机](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/185e2f39-9d97-47f5-b978-5c2f6ad43b1b/placeholder_topic.png)

正交摄像机

介绍摄像机的正交投影设置。





](/documentation/zh-cn/unreal-engine/orthographic-camera-in-unreal-engine)

## 性能和调试

[](/documentation/zh-cn/unreal-engine/optimizing-and-debugging-projects-for-real-time-rendering-in-unreal-engine)

[![优化和调试实时渲染项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae92a42e-36a6-4002-9661-5d3c28726bd4/randg_topicfull.png)](/documentation/zh-cn/unreal-engine/optimizing-and-debugging-projects-for-real-time-rendering-in-unreal-engine)

[优化和调试实时渲染项目](/documentation/zh-cn/unreal-engine/optimizing-and-debugging-projects-for-real-time-rendering-in-unreal-engine)

[介绍使用虚幻引擎的功能和工具为你的实时渲染项目进行优化和调试的相关概念和方法。](/documentation/zh-cn/unreal-engine/optimizing-and-debugging-projects-for-real-time-rendering-in-unreal-engine)

%designing-visuals-rendering-and-graphics/rendering-optimization/nanite:Topic%[

![抗锯齿和上采样](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1648da04-a014-4d5a-8988-3b795d91e15e/aa-topic.png)

抗锯齿和上采样

虚幻引擎中提供的抗锯齿选项的简要概述。





](/documentation/zh-cn/unreal-engine/anti-aliasing-and-upscaling-in-unreal-engine)[

![时间超级分辨率](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43dbb1b6-15e8-4d05-a585-64046018b53f/aa-topic.png)

时间超级分辨率

虚幻引擎中提供的抗锯齿选项的简要概述。





](/documentation/zh-cn/unreal-engine/temporal-super-resolution-in-unreal-engine)[

![虚拟纹理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cceadf8a-945f-430d-bc49-d001aae1aab1/vt_hero.png)

虚拟纹理

介绍虚幻引擎中虚拟纹理的使用方法。





](/documentation/zh-cn/unreal-engine/virtual-texturing-in-unreal-engine)[

![可视性和遮挡剔除](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e853a11-34eb-437f-a6d7-ed0d0d0bc081/sceneview_viewfrustumculled.png)

可视性和遮挡剔除

介绍了虚幻引擎中的可视性与遮挡剔除方法。





](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine)[

![使用RenderDoc分析虚幻引擎画面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7ddbb3c-5270-4094-92ad-c0077e244e67/renderdoctopicimage.png)

使用RenderDoc分析虚幻引擎画面

RenderDoc是一款免费的开源图形调试程序，可以逐帧捕捉应用中的画面。





](/documentation/zh-cn/unreal-engine/using-renderdoc-with-unreal-engine)[

![GPU转储文件查看器工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ef767b7-9ebf-418c-ab2a-9fc05cf685b9/gpu-dump-viewer-pass-viewer.png)

GPU转储文件查看器工具

这个多平台命令可以将中间RDG纹理和缓冲转储至磁盘中，用以调查并调试渲染问题。





](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine)[

![纹理流送](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca3f3595-51b3-4854-9fee-e837fe9dd0d9/overview_topic.png)

纹理流送

用于在运行时在内存中加载和卸载纹理的系统。





](/documentation/zh-cn/unreal-engine/texture-streaming-in-unreal-engine)[

![渲染资源查看器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee30e4ae-9553-40c7-9abe-972a8054968a/rrv-topic.png)

渲染资源查看器

一个帮助识别分配给GPU内存的资源及其资产的工具。





](/documentation/zh-cn/unreal-engine/render-resource-viewer-in-unreal-engine)

## 移动渲染和可视化

[](/documentation/zh-cn/unreal-engine/rendering-features-for-mobile-games-in-unreal-engine)

[![移动端渲染功能](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9689bd3b-b42c-474e-b658-900ab248b433/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/rendering-features-for-mobile-games-in-unreal-engine)

[移动端渲染功能](/documentation/zh-cn/unreal-engine/rendering-features-for-mobile-games-in-unreal-engine)

[了解虚幻引擎移动端渲染路径以及其对于图形功能的支持。](/documentation/zh-cn/unreal-engine/rendering-features-for-mobile-games-in-unreal-engine)

[

![移动预览器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/321ae035-209d-4da9-b2db-475745f75ee0/mobilepreview_topic.png)

移动预览器

基于所选的移动端平台，在虚幻引擎编辑器中预览游戏。





](/documentation/zh-cn/unreal-engine/using-the-mobile-previewer-in-unreal-engine)

## 可视化工具

[](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine)

[![路径追踪器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0887f69e-6bb4-4a64-a752-5ffaee1ef462/pathtracer.png)](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine)

[路径追踪器](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine)

[了解路径追踪器，以及如何用它为最终镜头渲染高质量图像，并与实时渲染场景进行直观的比较。](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine)

[

![HDRI背景可视化工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3eb941d2-d7e3-42e6-9847-7703900eb9e4/hdri-topic.png)

HDRI背景可视化工具

一个蓝图工具，通过使用带有实时光照和阴影的HDR图像投影，快速设置你的产品可视化效果。





](/documentation/zh-cn/unreal-engine/hdri-backdrop-visualization-tool-in-unreal-engine)[

![太阳和天空Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/180cd03d-8532-4b09-aca5-0e5a0d1f6a7b/sunsky-plugin-topic.png)

太阳和天空Actor

一个可以提供日夜时间系统的工具，并且可以根据地点、日期和时间精确地调整时间。





](/documentation/zh-cn/unreal-engine/sun-and-sky-actor-in-unreal-engine)[

![地理位置准确的太阳定位工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d4c23fe-827a-441d-93de-071cb1f60897/sun-position-topic.png)

地理位置准确的太阳定位工具

让你可以根据纬度、经度、日期和时间精细控制太阳地理位置的工具。





](/documentation/zh-cn/unreal-engine/geographically-accurate-sun-positioning-tool-in-unreal-engine)

## 第三方工具

[](/documentation/zh-cn/unreal-engine/third-party-rendering-tools-and-plugins-in-unreal-engine)

[![第三方渲染工具和插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c06114e8-cbbe-4ebd-b0a5-d71a4dc1bb09/randg_topicfull.png)](/documentation/zh-cn/unreal-engine/third-party-rendering-tools-and-plugins-in-unreal-engine)

[第三方渲染工具和插件](/documentation/zh-cn/unreal-engine/third-party-rendering-tools-and-plugins-in-unreal-engine)

[列出可用的第三方渲染工具和插件。](/documentation/zh-cn/unreal-engine/third-party-rendering-tools-and-plugins-in-unreal-engine)

## 图形编程

[

![FShaderCache](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/290d40f5-c12d-4735-9d7f-36e271a27698/placeholder_topic.png)

FShaderCache

FShaderCache 提供的机制可减少游戏中着色器的卡顿。





](/documentation/zh-cn/unreal-engine/fshadercache-in-unreal-engine)[

![网格体绘制管道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46bf8951-d7c9-4cb1-bc44-4509f9919baa/meshpipelineoverview_1.png)

网格体绘制管道

介绍如何添加自定义网格体通道以及虚幻引擎网格体绘制的性能特定。





](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine)[

![图形编程介绍](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a56f5890-e9df-446c-b5ca-b0f38f276d8f/graphics.jpg)

图形编程介绍

介绍图形程序员如何使用渲染系统和编写着色器。





](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine)[

![并行渲染介绍](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/404f491d-376a-4a32-8311-f43c36a76374/parallel_rendering_00.png)

并行渲染介绍

介绍并行渲染





](/documentation/zh-cn/unreal-engine/parallel-rendering-overview-for-unreal-engine)[

![渲染依赖图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44b30844-771d-46e1-a51f-72200420ed0c/setup-and-execute-timelines-with-and-without-rdg.png)

渲染依赖图

一种即时模式API，可将要编译和执行的渲染命令记录到图数据结构中。





](/documentation/zh-cn/unreal-engine/render-dependency-graph-in-unreal-engine)[

![着色器开发](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/caffccaf-a207-4412-b645-440525811ce5/placeholder_topic.png)

着色器开发

面向编写着色器的图形程序员的信息。





](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine)[

![异步计算](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcc89393-5f82-476b-a984-f07280dd9696/pixtimingcapture.png)

异步计算

异步计算（AsyncCompute） 是一种硬件功能，用于交错不同GPU任务并提高工作效率。





](/documentation/zh-cn/unreal-engine/asynccompute-in-unreal-engine)[

![插件中的Shader](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2a5679c-b49a-457b-a4a4-a578a46b1b52/ht_hero_image.png)

插件中的Shader

在插件中创建和使用Shader。





](/documentation/zh-cn/unreal-engine/shaders-in-plugins-for-unreal-engine)[

![插件中的 Shader](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc13c2eb-b940-4ac1-8c4c-371395dde981/placeholder_topic.png)

插件中的 Shader

介绍如何在插件中编写 Shader





](/documentation/zh-cn/unreal-engine/overview-of-shaders-in-plugins-unreal-engine)[

![新建全局着色器并作为插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2728e94a-5853-4290-9405-af9e25acc1ca/ht_hero_image.png)

新建全局着色器并作为插件

通过插件来新建和设置全局着色器。





](/documentation/zh-cn/unreal-engine/creating-a-new-global-shader-as-a-plugin-in-unreal-engine)[

![线程渲染](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ade7c781-8b52-4850-ae73-e909ecb362d5/placeholder_topic.png)

线程渲染

针对图形程序员的线程渲染器使用信息。





](/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine)

[](/documentation/zh-cn/unreal-engine/large-world-coordinates-rendering-in-unreal-engine-5)

[![大型世界坐标渲染介绍。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af3d01ae-874f-4dff-8508-c18a78800820/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/large-world-coordinates-rendering-in-unreal-engine-5)

[大型世界坐标渲染介绍。](/documentation/zh-cn/unreal-engine/large-world-coordinates-rendering-in-unreal-engine-5)

[介绍大型世界坐标渲染。](/documentation/zh-cn/unreal-engine/large-world-coordinates-rendering-in-unreal-engine-5)

## 人工智能/机器学习

[](/documentation/zh-cn/unreal-engine/neural-network-engine-in-unreal-engine)

[![神经网络引擎](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a51085c8-82e7-41f8-a982-0f5593dc70f0/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/neural-network-engine-in-unreal-engine)

[神经网络引擎](/documentation/zh-cn/unreal-engine/neural-network-engine-in-unreal-engine)

[关于通过虚幻引擎的神经网络引擎使用人工智能的一系列主题。](/documentation/zh-cn/unreal-engine/neural-network-engine-in-unreal-engine)

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [film](https://dev.epicgames.com/community/search?query=film)
-   [architectural visualization](https://dev.epicgames.com/community/search?query=architectural%20visualization)
-   [ray tracing](https://dev.epicgames.com/community/search?query=ray%20tracing)
-   [path tracing](https://dev.epicgames.com/community/search?query=path%20tracing)
-   [tv](https://dev.epicgames.com/community/search?query=tv)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [虚幻引擎5中的全新渲染功能和工具](/documentation/zh-cn/unreal-engine/designing-visuals-rendering-and-graphics-with-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E5%E4%B8%AD%E7%9A%84%E5%85%A8%E6%96%B0%E6%B8%B2%E6%9F%93%E5%8A%9F%E8%83%BD%E5%92%8C%E5%B7%A5%E5%85%B7)
-   [美术设置及工具](/documentation/zh-cn/unreal-engine/designing-visuals-rendering-and-graphics-with-unreal-engine#%E7%BE%8E%E6%9C%AF%E8%AE%BE%E7%BD%AE%E5%8F%8A%E5%B7%A5%E5%85%B7)
-   [光照概念和功能](/documentation/zh-cn/unreal-engine/designing-visuals-rendering-and-graphics-with-unreal-engine#%E5%85%89%E7%85%A7%E6%A6%82%E5%BF%B5%E5%92%8C%E5%8A%9F%E8%83%BD)
-   [常用渲染功能](/documentation/zh-cn/unreal-engine/designing-visuals-rendering-and-graphics-with-unreal-engine#%E5%B8%B8%E7%94%A8%E6%B8%B2%E6%9F%93%E5%8A%9F%E8%83%BD)
-   [视觉和系统工具](/documentation/zh-cn/unreal-engine/designing-visuals-rendering-and-graphics-with-unreal-engine#%E8%A7%86%E8%A7%89%E5%92%8C%E7%B3%BB%E7%BB%9F%E5%B7%A5%E5%85%B7)
-   [性能和调试](/documentation/zh-cn/unreal-engine/designing-visuals-rendering-and-graphics-with-unreal-engine#%E6%80%A7%E8%83%BD%E5%92%8C%E8%B0%83%E8%AF%95)
-   [移动渲染和可视化](/documentation/zh-cn/unreal-engine/designing-visuals-rendering-and-graphics-with-unreal-engine#%E7%A7%BB%E5%8A%A8%E6%B8%B2%E6%9F%93%E5%92%8C%E5%8F%AF%E8%A7%86%E5%8C%96)
-   [可视化工具](/documentation/zh-cn/unreal-engine/designing-visuals-rendering-and-graphics-with-unreal-engine#%E5%8F%AF%E8%A7%86%E5%8C%96%E5%B7%A5%E5%85%B7)
-   [第三方工具](/documentation/zh-cn/unreal-engine/designing-visuals-rendering-and-graphics-with-unreal-engine#%E7%AC%AC%E4%B8%89%E6%96%B9%E5%B7%A5%E5%85%B7)
-   [图形编程](/documentation/zh-cn/unreal-engine/designing-visuals-rendering-and-graphics-with-unreal-engine#%E5%9B%BE%E5%BD%A2%E7%BC%96%E7%A8%8B)
-   [人工智能/机器学习](/documentation/zh-cn/unreal-engine/designing-visuals-rendering-and-graphics-with-unreal-engine#%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD/%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0)
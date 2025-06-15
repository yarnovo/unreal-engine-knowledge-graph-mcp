# 虚幻引擎中的全局光照 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/global-illumination-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:14:31.434Z

---

目录

![全局光照](https://dev.epicgames.com/community/api/documentation/image/ca45bc70-6967-4bf4-b57c-64bb474c24f8?resizing_type=fill&width=1920&height=335)

**全局光照（Global illumination）**（有时也称为间接照明和间接光照）能够模拟光照与几何体及材质表面的交互效果，从而为场景添加真实的照明效果。此外，全局光照还考虑到与之相互作用的材质光线吸收性和反射性。

有两种方法可以在3D世界中模拟光线运动：一是使用支持移动和交互的光照；二是使用预计算的光照，不需要场景有过于动态或交互的光照。

虚幻引擎为全局光照解决方案提供多种光照方法，通常它们彼此互不排斥，可以无缝地混合使用。例如，在同一个场景中，可以同时存在动态光照和烘焙光照。

为方便比较，以下列表介绍了使用预计算或动态全局光照两种方法的各自亮点：

-   非常适合无需变更光照的场景。
-   性能成本与加载和存储光照贴图纹理所需的内存有关。
-   结果的质量和精确度是由被烘焙和应用到几何体的光照贴图纹理的纹理分辨率所决定的。
-   默认支持静态网格体和BSP几何体。
-   静态网格体需要设置光照贴图UV来存储光照数据。
-   可与动态光照结合使用。

-   非常适合需要变更光照的场景，如开灯或关灯，或昼夜变换系统。
-   大型的开放世界环境对烘焙光照提出了不切实际的要求（即使没有昼夜变换系统）。烘焙时间、内存使用率、纹理存储和播放是使用动态GI时需要考量的重要因素。
-   实时计算的性能成本可能要昂贵得多，具体取决于所使用的方法。
-   经常需要在质量和精确度以及性能之间寻找平衡。一些动态GI方法会受到实时使用情况的限制。
-   默认支持所有几何体类型。
-   可与预计算的光照结合使用。

## 预计算的全局光照

虚幻引擎中的光照烘焙系统使用Lightmass全局光照系统在CPU或GPU上计算光照数据。使用此方法预计算光照旨在获得高质量结果，可以将信息存储在将要应用至几何体的纹理中，不受实时限制因素的影响。使用此方法，光照无法动态修改，对于那些无需改变光照效果的项目来说十分理想，对于动态光照受限的移动平台项目也是非常好的选择。

-   **基于CPU的Lightmass** 使用CPU和名为[Unreal Swarm](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine)的独立进程来计算和生成光照数据。此方法可使用单个机器或将光照分配到构建场。
-   **基于GPU的Lightmass** 使用当前计算机上支持DirectX 12和光线追踪的NVIDIA GPU来计算和生成光照数据。

### 预计算的全局光照方法

[](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine)

[![CPU Lightmass全局光照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4183a2d0-8ede-46d0-b5ad-57f3aa8afa78/lightmass-global-illum-topic.png)](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine)

[CPU Lightmass全局光照](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine)

[概述Lightmass的全部功能和设置。](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine)

[

![GPU Lightmass全局光照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/071e6a57-62c2-4bfb-8ce3-a7b20aace978/13_gpulm_withdenoisingapplied.png)

GPU Lightmass全局光照

了解如何采用基于GPU的系统来生成预计算光照数据。





](/documentation/zh-cn/unreal-engine/gpu-lightmass-global-illumination-in-unreal-engine)

### 预计算的全局光照相关内容

[](/documentation/zh-cn/unreal-engine/indirect-lighting-cache-in-unreal-engine)

[![间接光照缓存](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/966b4662-b060-4c5f-9d5e-b55a09674f6a/indirect-cache-topic.png)](/documentation/zh-cn/unreal-engine/indirect-lighting-cache-in-unreal-engine)

[间接光照缓存](/documentation/zh-cn/unreal-engine/indirect-lighting-cache-in-unreal-engine)

[缓存的间接光照采样，用于模拟动态对象和未构建场景预览的全局光照效果。](/documentation/zh-cn/unreal-engine/indirect-lighting-cache-in-unreal-engine)

[

![体积光照贴图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7be3468f-d9f1-4e6b-8b71-9d98a71642da/volumetric-lightmaps-topic.png)

体积光照贴图

用于模拟动态对象及预览未构建场景的全局光照效果的体积光照采样。





](/documentation/zh-cn/unreal-engine/volumetric-lightmaps-in-unreal-engine)[

![Lightmass门户](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4870eb81-ed35-4dab-b888-646ef6bfb057/lightmass-portals-topic.png)

Lightmass门户

提升室内光照烘焙的质量。





](/documentation/zh-cn/unreal-engine/lightmass-portals-in-unreal-engine)[

![Unreal Swarm](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f42ba850-0bb6-4d21-9fd0-fc76b8eac067/unrealswarm_overviewimage-2.png)

Unreal Swarm

介绍了Unreal Swarm——用于计算开销较大的应用的任务分配系统，其中包括高质量静态全局光照解决方案Unreal Lightmass。





](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine)[

![Lightmass基础知识](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04748220-2148-4308-9ee4-ff69b22b87d2/lightmass-basics-topic.png)

Lightmass基础知识

关于Lightmass的概述。





](/documentation/zh-cn/unreal-engine/lightmass-basics-in-unreal-engine)[

![预计算光照情景](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b417f188-ad49-4276-a0c1-e9adfc3044e9/pcls-topic.png)

预计算光照情景

介绍如何再单个场景中使用多种光照设置。





](/documentation/zh-cn/unreal-engine/using-precomputed-lighting-scenarios-in-unreal-engine)

## 动态全局光照

虚幻引擎中的动态光照方法提供了实时可扩展的全局光照解决方案，可以为项目提供动态间接光照。这意味着你可以放置、移动并点亮世界中的对象，无需额外花费烘焙光照成本或进行额外的设置。动态间接光照也能够精确模拟昼夜变换过渡或开关灯等一些简单的操作，实现光线的精确反射。

![lumen-global-illumination](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97843bfc-e90b-416b-a14d-16fcba5361c0/lumentechdemo_1.png)

-   **Lumen** 是一套全动态全局光照和反射系统，专为次世代主机而设计。Lumen作为默认的全局光照系统，可以使用多种光线追踪方法，解决大规模全局光照和反射。
-   **屏幕空间全局光照（Screen Space Global Illumination）** （SSGI）是一种后期处理效果，为仅限于摄像机视图中的当前可见的对象生成全局光照。此方法成本较低，可以作为附加效果与现有的预计算或动态全局光照方法结合使用，这样效果最好。
    
    此功能已废弃。未来的引擎版本中会删除此功能。
    

### 动态全局光照相关内容

[](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)

[![Lumen全局光照和反射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9405eaf-e44e-42b5-bbf2-204bb365d72f/lumentopicimage.png)](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)

[Lumen全局光照和反射](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)

[介绍Lumen的动态全局光照和反射功能。](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)

[

![Lumen技术细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/950b8fa2-7fd8-46a7-aab2-4b439b26ba47/lumen-far-field.png)

Lumen技术细节

深入介绍通过软件或硬件光线追踪使用Lumen全局光照以及反射功能的技术细节。





](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine)[

![屏幕空间全局光照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9976ffae-2492-4b35-87d4-a1d3828899d0/screen-space-topic.png)

屏幕空间全局光照

介绍基于屏幕空间效果的动态全局光照。





](/documentation/zh-cn/unreal-engine/screen-space-global-illumination-in-unreal-engine)[

![硬件光线追踪](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8434f629-dd29-458f-bffd-2e82ebf1f1b0/rt_softshadows_1.png)

硬件光线追踪

介绍基于硬件的实时光追功能。





](/documentation/zh-cn/unreal-engine/hardware-ray-tracing-in-unreal-engine)

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [global illumination](https://dev.epicgames.com/community/search?query=global%20illumination)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [预计算的全局光照](/documentation/zh-cn/unreal-engine/global-illumination-in-unreal-engine#%E9%A2%84%E8%AE%A1%E7%AE%97%E7%9A%84%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7)
-   [预计算的全局光照方法](/documentation/zh-cn/unreal-engine/global-illumination-in-unreal-engine#%E9%A2%84%E8%AE%A1%E7%AE%97%E7%9A%84%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7%E6%96%B9%E6%B3%95)
-   [预计算的全局光照相关内容](/documentation/zh-cn/unreal-engine/global-illumination-in-unreal-engine#%E9%A2%84%E8%AE%A1%E7%AE%97%E7%9A%84%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7%E7%9B%B8%E5%85%B3%E5%86%85%E5%AE%B9)
-   [动态全局光照](/documentation/zh-cn/unreal-engine/global-illumination-in-unreal-engine#%E5%8A%A8%E6%80%81%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7)
-   [动态全局光照相关内容](/documentation/zh-cn/unreal-engine/global-illumination-in-unreal-engine#%E5%8A%A8%E6%80%81%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7%E7%9B%B8%E5%85%B3%E5%86%85%E5%AE%B9)
# 虚幻引擎中的虚拟纹理 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-texturing-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:23:52.170Z

---

目录

![虚拟纹理](https://dev.epicgames.com/community/api/documentation/image/aa9b2841-8b63-4782-b8a8-b51e509d438d?resizing_type=fill&width=1920&height=335)

利用项目对 **虚拟纹理** 的支持，可在运行时以更低内存占用率和更高一致性创建和使用大尺寸纹理。

## 虚拟纹理方法

虚幻引擎4(UE4)支持两种虚拟纹理方法：**运行时虚拟纹理** (RVT) 和 **流送虚拟纹理** (SVT)。

运行时虚拟纹理

流送虚拟纹理

-   支持超高纹理分辨率。
-   按需将纹素数据缓存于内存中。
-   运行时由GPU生成的纹素数据。
-   非常适用于可按需渲染的纹理数据，如过程纹理或合成分层材质。

-   支持超高纹理分辨率。
-   按需将纹素数据缓存于内存中。
-   在硬盘中烘焙和加载纹素数据。
-   非常适用于生成时间较长的纹理数据，如光照贴图或美术师创建的大型细节纹理。

### 运行时虚拟纹理

利用 **运行时虚拟纹理** 可有效渲染过程生成或分层的复杂材质，使运行时虚拟纹理适用于渲染复杂的地形材质。其能改善地形样条、网格体和材质贴花，及一般地形与对象混合的渲染性能和工作流程。

欲了解更多详情，参见[运行时虚拟纹理](/documentation/zh-cn/unreal-engine/runtime-virtual-texturing-in-unreal-engine)。

### 流送虚拟纹理

**流送虚拟纹理** 可降低使用超大尺寸纹理时的纹理内存开销，包括支持虚拟纹理光照贴图和UDIM（U维度）。与现有的基于mip纹理流送相比，流送虚拟纹理是一种从硬盘流送纹理的替代方法。

欲了解更多详情，参见[流送虚拟纹理](/documentation/zh-cn/unreal-engine/streaming-virtual-texturing-in-unreal-engine)。

#### 虚拟纹理光照贴图

支持虚拟纹理光照贴图可提高光照贴图烘焙的流送性能和质量。

在 **项目设置（Project Settings）** 中的 **引擎（Engine）** > **渲染（Rendering）** 下，设置 **启用虚拟纹理光照贴图（Enable virtual texture lightmaps）**，以启用对光照贴图的虚拟纹理支持。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31530a09-e9b2-4311-bb23-713d52431dbc/ps_enablevtlightmaps.png)

启用以下控制台变量，控制项目中虚拟纹理光照贴图的使用方式：

控制台变量

说明

`r.IncludeNonVirtualTexturedLightmaps`

控制是否生成/保存非VT光照贴图。包含非VT光照贴图会限制图谱大小，从而失去VT光照贴图部分优势。

`r.VT.EnableLossyCompressLightmaps`

启用虚拟纹理光照贴图的有损压缩。与常规颜色纹理相比，有损压缩的光照贴图纹理质量较低。

## 虚拟纹理主题

[](/documentation/zh-cn/unreal-engine/virtual-texture-memory-pools-in-unreal-engine)

[![虚拟纹理内存池](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aba817a5-b087-4717-946e-f98243a18696/residency-graph.png)](/documentation/zh-cn/unreal-engine/virtual-texture-memory-pools-in-unreal-engine)

[虚拟纹理内存池](/documentation/zh-cn/unreal-engine/virtual-texture-memory-pools-in-unreal-engine)

[介绍虚拟纹理物理内存池的GPU内存分配。](/documentation/zh-cn/unreal-engine/virtual-texture-memory-pools-in-unreal-engine)

[

![虚拟纹理参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9729d057-fa15-4576-a8d4-f6856350e04c/rvt_actorsettings.png)

虚拟纹理参考

包含虚拟纹理中涉及的项目设置、控制台命令和Actor设置的相关参考信息。





](/documentation/zh-cn/unreal-engine/virtual-texturing-settings-and-properties-in-unreal-engine)[

![运行时虚拟纹理快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3d0940e-8ac4-4d04-99b8-9bab18d4f8a0/ue5_1-rvt-actors-1.png)

运行时虚拟纹理快速入门

介绍如何设置地形材质并使用运行时虚拟纹理。





](/documentation/zh-cn/unreal-engine/runtimevirtual-texturing-quick-start-in-unreal-engine)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [performance](https://dev.epicgames.com/community/search?query=performance)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [textures](https://dev.epicgames.com/community/search?query=textures)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [虚拟纹理方法](/documentation/zh-cn/unreal-engine/virtual-texturing-in-unreal-engine#%E8%99%9A%E6%8B%9F%E7%BA%B9%E7%90%86%E6%96%B9%E6%B3%95)
-   [运行时虚拟纹理](/documentation/zh-cn/unreal-engine/virtual-texturing-in-unreal-engine#%E8%BF%90%E8%A1%8C%E6%97%B6%E8%99%9A%E6%8B%9F%E7%BA%B9%E7%90%86)
-   [流送虚拟纹理](/documentation/zh-cn/unreal-engine/virtual-texturing-in-unreal-engine#%E6%B5%81%E9%80%81%E8%99%9A%E6%8B%9F%E7%BA%B9%E7%90%86)
-   [虚拟纹理光照贴图](/documentation/zh-cn/unreal-engine/virtual-texturing-in-unreal-engine#%E8%99%9A%E6%8B%9F%E7%BA%B9%E7%90%86%E5%85%89%E7%85%A7%E8%B4%B4%E5%9B%BE)
-   [虚拟纹理主题](/documentation/zh-cn/unreal-engine/virtual-texturing-in-unreal-engine#%E8%99%9A%E6%8B%9F%E7%BA%B9%E7%90%86%E4%B8%BB%E9%A2%98)
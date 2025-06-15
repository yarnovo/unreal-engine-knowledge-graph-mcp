# 虚幻引擎中雾、云、天空和大气的环境光源 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:13:34.922Z

---

目录

![雾、云、天空和大气的环境光源](https://dev.epicgames.com/community/api/documentation/image/894ba2a6-52b5-4187-9001-c2645e736e45?resizing_type=fill&width=1920&height=335)

虚幻引擎提供了一系列组件，让设计师和美术师能够利用基于物理的光照来创建大规模（甚至小规模）沉浸式世界，同时保证工作高效性。这些针对大气、云、雾和光照的环境光照组件可无缝协作，打造统一的体验，让人领略到完全动态光照的世界。

此页面中的工具和功能将帮助你了解入门知识，学会创建自己的世界。

## 光源混合器

**光源混合器（Light Mixer）** 是可停靠的编辑器窗口，你可以在其中添加、编辑和引用关卡中的定向光源、点光源、聚光源和矩形区域光源的属性。

此窗口将属性全部集中在一个位置以供编辑，可以简化美术师和设计师的工作，加快工作流程。其中包括作为场景Actor组件或蓝图组件的光源。你也可以以合集的形式组织它们。

![Light Mixer Panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/64156d8d-9fd4-445d-83f5-4a385048fa24/light-mixer.png)

如需更多信息，请参阅[光源混合器](/documentation/zh-cn/unreal-engine/using-the-light-mixer-in-unreal-engine)。

## 环境光源混合器

**环境光源混合器（Environment Light Mixer）** 是可停靠的编辑器窗口，你可以在其中添加、编辑和引用天空、云、环境光源和天空光照的环境光照组件的属性。

此窗口将属性全部集中在一个位置，可以简化美术师和设计师的工作，加快工作流程。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d72f8321-27c1-4a55-ae8e-e199ac3ee9d6/1_envlightmixer.png)

有关更多信息，请参阅[环境光源混合器](/documentation/zh-cn/unreal-engine/environment-light-mixer-in-unreal-engine)。

## 雾效果

雾效果可用于为世界增添氛围，并为环境营造气氛。这包括为高耸和低洼区域创建多层雾，以及为光轴创建体积效果。

![volumetric fog](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/062addea-00ee-46c1-9d84-86970ed98298/volumetricfog.png)

[天空大气](/documentation/zh-cn/unreal-engine/sky-atmosphere-component-in-unreal-engine)包括它本身的散射和高度雾模拟，但也可以很好地与指数高度雾配合使用，支持场景中所有类型的光源。

![Sky Atmosphere's Height Fog](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2f1da6e-9388-4937-b612-4faba32395a9/skyatmos_heightfog.png)

![Sky Atmosphere | with Exponential Height Fog](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6f4aec2-9f31-4fba-b0b7-a438927c2c87/expoheightfog_2.png)

Sky Atmosphere's Height Fog

Sky Atmosphere | with Exponential Height Fog

当项目设置 **支持影响高度雾的天空大气（Support Sky Atmosphere Affecting Height Fog）** 启用时，来自指数高度雾的所有影响都是附加的。天空大气的高度雾应用于指数高度雾颜色的顶部。但是，如果 **雾内散射颜色（Fog Inscattering Color）** 和 **定向内散射颜色（Directional Inscattering Color）** 设置为黑色，则天空大气将直接影响场景中所有指数高度雾的着色。

此外，你也可以使用本地放置的雾体积来为场景的大小区域创建雾效果。这些本地雾体积支持所有平台和体积雾效果（如启用）。

![Placed Local Fog Volumes in a scene.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5bd0370-fea3-4a45-9e9c-226d459983fe/lfv-withfog.png)

### 雾效果主题

[](/documentation/en-us/unreal-engine/exponential-height-fog-in-unreal-engine)

[![Exponential Height Fog](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d4a0bf6-f2a3-4f59-a2e0-0fe9ece4d07c/exponential-height-fog-topic-image.png)](/documentation/en-us/unreal-engine/exponential-height-fog-in-unreal-engine)

[Exponential Height Fog](/documentation/en-us/unreal-engine/exponential-height-fog-in-unreal-engine)

[An overview of the height-based, distant fog system.](/documentation/en-us/unreal-engine/exponential-height-fog-in-unreal-engine)

[

![局部雾体积](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cb95326-d847-4fa8-a128-0878a45ecc56/lfv-topic.png)

局部雾体积

概述如何局部放置体积以创建基于高度的雾效果。





](/documentation/zh-cn/unreal-engine/local-fog-volumes-in-unreal-engine)%building-virtual-worlds/lighting-and-shadows/environmental-lighting/volumetric-fog:Topic%

## 大气、云和世界光照效果

天空大气、体积云、定向光源和天空光照的光照组件构成了环境光照的大部分。这些组件均能无缝协作，可以动态照亮大型世界。

![enviornment lighting components](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33daa77c-9b49-4203-8eb3-a956f90e91e6/vt_cloudexamples.png)

在关卡中，你可以使用以下组件：

-   最多两个用于太阳和月亮、两个太阳或任意组合的定向光源。
-   具有可选实时捕获功能的单个天空光照。
-   具有自身高度雾的天空大气。
-   带有或不带有天空球网格体的体积云。

在天空光照上启用 **实时捕捉（Real Time Capture）** 后，使用键盘快捷键 **右Ctrl + L**（第一个定向光源）或 **右Ctrl + 右Shift + L**（第二个定向光源），同时移动鼠标，可动态改变光照，并立即查看结果。

### 大气、云和世界光照主题

[](/documentation/zh-cn/unreal-engine/sky-atmosphere-component-in-unreal-engine)

[![天空大气组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e09f97c-fad2-4d77-9cd1-55a4e79e8ce5/sky-atmosphere-topic-image.png)](/documentation/zh-cn/unreal-engine/sky-atmosphere-component-in-unreal-engine)

[天空大气组件](/documentation/zh-cn/unreal-engine/sky-atmosphere-component-in-unreal-engine)

[天空大气系统用于创建基于物理的天空和大气渲染，提供一天时间功能以及具有空气透视的地面到太空视图过渡。](/documentation/zh-cn/unreal-engine/sky-atmosphere-component-in-unreal-engine)

[

![体积云组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea75acb8-2a02-4931-bbf2-d673ce364f61/volumetric-cloud-topic-image.png)

体积云组件

使用体积材质进行实时云渲染





](/documentation/zh-cn/unreal-engine/volumetric-cloud-component-in-unreal-engine)%building-virtual-worlds/lighting-and-shadows/light-types-and-mobility/Directional:Topic%[

![天空光照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/709256fb-8e2b-41d9-85e5-a7af0ae2d1db/skylight_topic.png)

天空光照

理解天空光照的基本概念。





](/documentation/zh-cn/unreal-engine/sky-lights-in-unreal-engine)[

![异类体积](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aed9fc46-6175-48ef-9832-fc66c4bbd4ba/hv-niagara-fluid-path-tracer.png)

异类体积

使用异类体积组件渲染从稀疏体积纹理取样的体积域材质。





](/documentation/zh-cn/unreal-engine/heterogeneous-volumes-in-unreal-engine)

### 大气、云和世界光照属性参考

[](/documentation/zh-cn/unreal-engine/sky-atmosphere-component-properties-in-unreal-engine)

[![天空大气组件属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46f0d1f4-a69a-42d2-b18f-d35ef9c19159/sky-atmosphere-topic-image.png)](/documentation/zh-cn/unreal-engine/sky-atmosphere-component-properties-in-unreal-engine)

[天空大气组件属性](/documentation/zh-cn/unreal-engine/sky-atmosphere-component-properties-in-unreal-engine)

[天空大气组件的选项和属性说明。](/documentation/zh-cn/unreal-engine/sky-atmosphere-component-properties-in-unreal-engine)

[

![体积云组件属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f56e60d-4b10-414d-812c-cc0cf872e788/volumetric-cloud-topic-image.png)

体积云组件属性

体积云组件设置和属性说明





](/documentation/zh-cn/unreal-engine/volumetric-cloud-component-properties-in-unreal-engine)

## 材质和稀疏体积纹理资产

[](/documentation/zh-cn/unreal-engine/sparse-volume-textures-in-unreal-engine)

[![稀疏体积纹理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ecc9c89-e61f-46c0-8c45-85f6b8a84534/svt-cloud-example.png)](/documentation/zh-cn/unreal-engine/sparse-volume-textures-in-unreal-engine)

[稀疏体积纹理](/documentation/zh-cn/unreal-engine/sparse-volume-textures-in-unreal-engine)

[该资产将存储烘焙的模拟数据来表示体积介质，例如烟雾、火焰和水。](/documentation/zh-cn/unreal-engine/sparse-volume-textures-in-unreal-engine)

[

![体积云材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7e54d01-9bc5-4758-8a23-b8ac1f61f6f1/vcm-topic.png)

体积云材质

用于创建各种云类型、形状和效果的默认体积材质。





](/documentation/zh-cn/unreal-engine/volumetric-cloud-material-in-unreal-engine)

-   [environment](https://dev.epicgames.com/community/search?query=environment)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [fog](https://dev.epicgames.com/community/search?query=fog)
-   [clouds](https://dev.epicgames.com/community/search?query=clouds)
-   [atmosphere](https://dev.epicgames.com/community/search?query=atmosphere)
-   [sky](https://dev.epicgames.com/community/search?query=sky)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [光源混合器](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine#%E5%85%89%E6%BA%90%E6%B7%B7%E5%90%88%E5%99%A8)
-   [环境光源混合器](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine#%E7%8E%AF%E5%A2%83%E5%85%89%E6%BA%90%E6%B7%B7%E5%90%88%E5%99%A8)
-   [雾效果](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine#%E9%9B%BE%E6%95%88%E6%9E%9C)
-   [雾效果主题](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine#%E9%9B%BE%E6%95%88%E6%9E%9C%E4%B8%BB%E9%A2%98)
-   [大气、云和世界光照效果](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine#%E5%A4%A7%E6%B0%94%E3%80%81%E4%BA%91%E5%92%8C%E4%B8%96%E7%95%8C%E5%85%89%E7%85%A7%E6%95%88%E6%9E%9C)
-   [大气、云和世界光照主题](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine#%E5%A4%A7%E6%B0%94%E3%80%81%E4%BA%91%E5%92%8C%E4%B8%96%E7%95%8C%E5%85%89%E7%85%A7%E4%B8%BB%E9%A2%98)
-   [大气、云和世界光照属性参考](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine#%E5%A4%A7%E6%B0%94%E3%80%81%E4%BA%91%E5%92%8C%E4%B8%96%E7%95%8C%E5%85%89%E7%85%A7%E5%B1%9E%E6%80%A7%E5%8F%82%E8%80%83)
-   [材质和稀疏体积纹理资产](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine#%E6%9D%90%E8%B4%A8%E5%92%8C%E7%A8%80%E7%96%8F%E4%BD%93%E7%A7%AF%E7%BA%B9%E7%90%86%E8%B5%84%E4%BA%A7)
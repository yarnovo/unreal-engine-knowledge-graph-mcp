# 虚幻引擎中ICVFX模板 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/in-camera-vfx-template-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:26:15.995Z

---

目录

![ICVFX模板](https://dev.epicgames.com/community/api/documentation/image/a1c98af5-0a51-4c59-a6f8-10266d552ed2?resizing_type=fill&width=1920&height=335)

**ICVFX模板** 是创建LED实景舞台复杂配置的起点。它提供了一个基本地图和多种功能，可帮助你开始进行ICVFX项目。

## 从模板创建项目

1.  启动 **虚幻引擎**。
    
2.  选择 **影视活动（Film, Television, and Live Events）** 模板类别。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cd3727b-bd7a-4c3c-96cc-edd75890f265/ue5_01-select-section.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cd3727b-bd7a-4c3c-96cc-edd75890f265/ue5_01-select-section.png)
    
    点击查看大图。
    
3.  点击 **InCamera VFX**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/647a513b-e8c1-429d-97e6-4a6b0e9bcb24/ue5_02-select-template.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/647a513b-e8c1-429d-97e6-4a6b0e9bcb24/ue5_02-select-template.png)
    
    点击查看大图。
    
4.  选择是否包含起始内容和是否启用回溯功能，并为项目选择路径和名称。
    
5.  点击 **创建**。
    

## 模板功能

-   用于ICVFX的nDisplay配置和蓝图设置
-   可设置的内凹面和外凹面
-   实时链接
-   色键和追踪标记
-   颜色校正区域
-   网络遥控
-   OSC

有关如何使用这些功能的信息，请参阅[ICVFX概述](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine)和[ICVFX快速入门](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine)。

要访问模板中描述的 **蓝图（Blueprint）** 和其他资产，请确保在 **内容浏览器（Content Browser）** 的 **查看选项（View Options）** 菜单中启用 **显示引擎内容（Show Engine Content）** 和 **显示插件内容（Show Plugin Content）**。

![查看引擎内容和插件内容选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/469e2470-dc3b-41a6-ac1d-9bc350aefce3/ue5_03-enable-engin-plugin-content.png "View engine content and plugin content options")

## 地图

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/191e09f5-8acd-4ccc-abc2-515ab7edde1e/ue5_04-curved-stage-map.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/191e09f5-8acd-4ccc-abc2-515ab7edde1e/ue5_04-curved-stage-map.png)

点击查看大图。

主地图为 **LED\_CurvedStage**。它适用于一些常见的ICVFX设置和配置。

### LED曲面舞台

![LED曲面舞台](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/129795b3-0795-44de-b2a9-201094fba0ce/ue5_05-curved-stage-example.png "LED Curved Stage")

该地图提供了另一种设置方案，即使用曲面网格体作为LED墙。LED墙由四个子部分组成，左右两边各两个，因此在根组件下的 **nDisplay\_InCamVFX\_Config** 中有四个屏幕。你可以自定义这些子部分，以此为基础来描述任何类型的曲面LED显示器，使其与你的硬件配置相匹配。

![层次结构中的曲面屏幕部分](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5d471c8-7bcf-443b-9dd7-38eba145a31f/ue5_06-screen-components.png "Curved screen section in the hierarchy")

#### 色键

在曲面舞台地图内 **nDisplay\_InCamVFX\_Config** 的详细信息（Detail）中，有一个控制设置可以启用色键，从而控制该层的可见性。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4db5895-539a-44d2-afe7-c91a20394d17/ue5_07-enable-chromakey.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4db5895-539a-44d2-afe7-c91a20394d17/ue5_07-enable-chromakey.png)

点击查看大图。

-   [templates](https://dev.epicgames.com/community/search?query=templates)
-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [in-camera vfx](https://dev.epicgames.com/community/search?query=in-camera%20vfx)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [从模板创建项目](/documentation/zh-cn/unreal-engine/in-camera-vfx-template-in-unreal-engine#%E4%BB%8E%E6%A8%A1%E6%9D%BF%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE)
-   [模板功能](/documentation/zh-cn/unreal-engine/in-camera-vfx-template-in-unreal-engine#%E6%A8%A1%E6%9D%BF%E5%8A%9F%E8%83%BD)
-   [地图](/documentation/zh-cn/unreal-engine/in-camera-vfx-template-in-unreal-engine#%E5%9C%B0%E5%9B%BE)
-   [LED曲面舞台](/documentation/zh-cn/unreal-engine/in-camera-vfx-template-in-unreal-engine#led%E6%9B%B2%E9%9D%A2%E8%88%9E%E5%8F%B0)
-   [色键](/documentation/zh-cn/unreal-engine/in-camera-vfx-template-in-unreal-engine#%E8%89%B2%E9%94%AE)
# 虚幻引擎中的程序化内容生成（PCG）群系核心和示例插件概述指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-overview-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:18:06.135Z

---

目录

![PCG群系核心概述](https://dev.epicgames.com/community/api/documentation/image/dc0f911c-2865-4d3c-8de8-4302bdd0a192?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

PCG群系核心和示例插件提供了关于如何将[PCG框架](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview)用于属性集表、反馈循环、递归子图表和[运行时分层生成](/documentation/404)等功能的示例。本小节包含PCG群系核心和示例插件的定义、工具功能列表、未来更新及已知问题的待办事项。

如需详细了解程序化内容生成（PCG）框架，请参阅[程序化内容生成框架](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview)。

## 什么是PCG群系核心

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9fdb3253-1ec8-4463-90d4-35175a96146a/pcg-biome-overview-image-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9fdb3253-1ec8-4463-90d4-35175a96146a/pcg-biome-overview-image-1.png)

PCG群系核心是一种数据驱动的群系创建工具，由原生PCG框架节点、图表构成，并利用了数据资产。该工具使用一种提供固定管线的系统性方法编译而成，按逻辑分段排列，附带可自定义的步骤。

它充当一个示例，可供你了解PCG框架，并利用了属性集表、反馈循环、递归子图表和[运行时分层生成](/documentation/404)等功能。

它可以用于生产，你可以将其世界创建工具集可以作为起点，并根据自身需要和需求对其进行复制、修改或扩展，而不需要或只需要极少的编程支持。

该插件本身带有试验性标签，将在未来更新中不断完善，同时依赖测试版或可用于生产的PCG框架和标准UE功能。如果要在生产中使用，我们推荐复制插件，以避免未来版本破坏现有内容。

PCG群系核心插件是独立的，仅包含工具正常运行所需的内容，例如基础数据资产、结构体、蓝图类和PCG图表。如需详细了解如何启用插件，请参阅[使用插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)。

## 什么是PCG群系示例

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95702c86-6ac8-4311-b726-4429d42e4082/pcg-biome-overview-image-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95702c86-6ac8-4311-b726-4429d42e4082/pcg-biome-overview-image-2.png)

PCG群系示例是展示PCG群系核心工具的内容示例。它包含BiomeSampleLevel、预配置了BiomeCore的世界、多个群系及其资产和不同的输入，例如群系体积、群系样条线、群系纹理和其他注入的数据、特定的CropField发生器和独立的Actor。

群系示例插件可以使用插件设置在所有项目中启用。它依赖群系核心插件及其自身内容。群系示例是一份指南和参考，介绍了如何在不加载单独项目的情况下设置群系核心。

## 功能列表

PCG群系核心包含以下功能：

-   由数据驱动，可以复制、修改或扩展，以满足所有生产需要。
    
-   仅限PCG原生节点，无自定义代码，无自定义蓝图元素。
    
-   固定管线按逻辑分段排列，附带可自定义的步骤，使用PCG图表和数据资产。
    
-   不限数量的用户定义的群系。
    
-   可立即使用的类、结构体、数据资产、图表。
    
-   AttributeSet表包含从所有数据资产引用动态收集和编译的群系资产属性。
    
-   用于在3D空间中分离群系输入的群系缓存。
    
-   群系可以通过体积、样条线和/或纹理在空间上定义。
    
-   群系优先级排序。
    
-   群系全局混合。
    
-   支持通过排除项和注入的数据手动或半手动交互。
    
-   网格体、PCG数据资产/程序集和Actor生成。
    
-   支持自定义边界扩展的网格体中的点边界。
    
-   将生成的点分层，其重叠由发生器优先级和准确边界管理。
    
-   支持多个发生器子类型，以更好地控制群系中的资产分布（即，使用地形层权重绘制）。
    
-   通过可自定义的计算和/或纹理投射筛选器图表（高度、密度、流，等等）进行全局根点和子点筛选。
    
-   按资产递归分层变换和生成，支持每个递归级别多个子级。
    
-   递归最大深度和比率控制。
    
-   对每个资产条目的静态网格体属性进行重载（投射阴影、碰撞，等等）。
    
-   变换每个资产条目的偏移和比例。
    
-   地形和网格体上的运行时分层生成细节生成。
    

## 待办事项

**每个群系的混合范围** ：允许在每个群系核心Actor上指定混合范围，而不是当前全局混合范围。

**程序集层级和标签支持** ：通过类似于《电子梦》示例所展示内容的内部层级和标签，增加对变换和筛选程序集的更高级控制。

**地形块工作流程** ：在使用地形块组件生成Actor时，防止地形刷新和PCG更新之间的潜在反馈循环。

## 已知问题

-   子资产没有遵守排除项和群系边界。
    
-   子资产与来自不同层级分支的根资产和子资产重叠。
    
-   按发生器优先级的对比在筛选之前发生，导致点被抢先删除。
    

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [procedural generation](https://dev.epicgames.com/community/search?query=procedural%20generation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [什么是PCG群系核心](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-overview-guide-in-unreal-engine#%E4%BB%80%E4%B9%88%E6%98%AFpcg%E7%BE%A4%E7%B3%BB%E6%A0%B8%E5%BF%83)
-   [什么是PCG群系示例](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-overview-guide-in-unreal-engine#%E4%BB%80%E4%B9%88%E6%98%AFpcg%E7%BE%A4%E7%B3%BB%E7%A4%BA%E4%BE%8B)
-   [功能列表](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-overview-guide-in-unreal-engine#%E5%8A%9F%E8%83%BD%E5%88%97%E8%A1%A8)
-   [待办事项](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-overview-guide-in-unreal-engine#%E5%BE%85%E5%8A%9E%E4%BA%8B%E9%A1%B9)
-   [已知问题](/documentation/zh-cn/unreal-engine/procedural-content-generation-pcg-biome-core-and-sample-plugins-overview-guide-in-unreal-engine#%E5%B7%B2%E7%9F%A5%E9%97%AE%E9%A2%98)
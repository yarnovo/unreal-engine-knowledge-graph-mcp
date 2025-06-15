# 面向Maya用户的虚幻引擎的光照和渲染 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lighting-and-rendering-in-unreal-engine-for-maya-users
> 
> 生成时间: 2025-06-14T18:50:40.877Z

---

目录

![面向Maya用户的虚幻引擎的光照和渲染](https://dev.epicgames.com/community/api/documentation/image/599aea87-f5c4-4a95-baab-542b93556cad?resizing_type=fill&width=1920&height=335)

虚幻引擎的光照和渲染功能优先支持针对游戏和交互式环境优化的实时工作流，这类场景通常需要在性能和质量之间取得平衡，而非采用离线渲染工作流程。 这意味着，在编辑器内操作时，无需等待完整场景渲染即可即时查看效果，这与传统离线渲染工作流程不同。

尽管如此，当引擎在所见即所得的基础上优先支持实时工作流程时，它仍支持更贴近离线渲染工作流程的功能与工作流程，以进一步提升最终渲染画面的品质。 这包括通过影片渲染队列或影片渲染图表等功能结合光线追踪功能，或使用独立路径追踪器进行图像输出。

## 虚幻引擎光照系统

虚幻引擎的光照主要由以下组件驱动：

-   **全局光照**：
    
    -   **Lumen全局光照**是一种实时全局光照和反射系统。 它提供适用于各种硬件的选项。 追求更高质量的结果时，可将Lumen与[硬件光线追踪](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine)结合使用，以获得高质量反射效果。
        
-   **阴影投射**：
    
    -   **虚拟阴影贴图**提供一致的高分辨率阴影投射，适用于电影级品质的资产以及大型动态光照的开放世界，并受Nanite虚拟几何体和Lumen全局光照的支持。 在支持DirectX 12的项目中，虚拟阴影贴图默认处于启用状态。
        
-   **渲染设置**：
    
    -   **后期处理体积**包含许多渲染设置，这些设置可全局影响场景渲染，或仅对关卡中的孤立区域产生影响。 这些设置包括景深、泛光、曝光、颜色分级、反射等各项功能设置。
        
-   **可放置光源**：
    
    -   你可以放置多种类型的光源来实现不同的光照效果。 这包括定向光源、天空光源、点光源和聚光源、区域光源。
        
-   **环境光照**：
    
    -   有多种世界光照功能可用于定义世界的观感。 这些包括体积云、大气渲染和雾效功能。
        

### 放置和使用不同类型的光源

虚幻引擎提供了不同类型的光源，可用于创建几乎任何类型的光照情景，同时适用于小型和大型场景。 这些光源包括用于模拟多个太阳或月亮的大型光源，以及适用于中小型室内外空间的小型光源。

下表列出了虚幻引擎包含的光源类型及其在Maya中的对应类型：

虚幻引擎

Maya

说明

**定向光源**

定向光源

用于模拟阳光/月光。 无限平行光线

**点光源**

点光源

从一个点向各个方向发光

**聚光源**

聚光源

椎体形状光源。 适用于手电筒、舞台灯光等

**矩形光源**

区域光源

矩形柔光。 非常适用于电视、窗户等。

**天空光源**

环境光源

捕捉环境光和天空反射（通常配合立方体贴图/HDRI使用）。

以下是虚幻引擎中点光源、聚光源和矩形光源的示例。

[![](https://dev.epicgames.com/community/api/documentation/image/85e0cb6c-888c-459d-937f-dd8015a6e735?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/85e0cb6c-888c-459d-937f-dd8015a6e735?resizing_type=fit)

[![](https://dev.epicgames.com/community/api/documentation/image/792fcb82-3b44-4008-9294-d768f975acc8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/792fcb82-3b44-4008-9294-d768f975acc8?resizing_type=fit)

[![](https://dev.epicgames.com/community/api/documentation/image/688f9684-6dc0-422b-a3dd-8322b5c74d23?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/688f9684-6dc0-422b-a3dd-8322b5c74d23?resizing_type=fit)

**点光源**

**聚光源**

**矩形光源**

以下是在引擎中处理光照时可使用的一些快速参考笔记：

-   **在光标位置快速放置光源**：
    
    -   在视口中按**L**键，可在光标位置放置一个点光源。
        
        -   使用右键菜单选择"**替换所选Actor（Replace Selected Actors with）**"，可选择其他类型的光源进行替换。
            
-   **定向光源**：
    
    -   场景中最多可放置两个定向光源。 例如，模拟多个太阳或太阳与月亮。
        
        -   每个定向光源必须在其Actor设置中设置不同的**大气太阳光索引（Atmosphere Sun Light Index）**。
            
    -   拖动鼠标光标时按住**右Shift+L**，可更改索引0的定向光源位置。
        
    -   拖动鼠标光标时按**右Shift+右Ctrl和L**，可更改索引1的定向光源位置。
        
-   **光源移动性**：
    
    -   每种类型的Actor（无论是场景中的光源还是对象）都可以设置移动性，该移动性决定了它们在动态光照和预计算光照等不同光照路径中的处理方式。 虽然光照移动性可能并非必需因素，除非你计划在项目中使用烘焙光照，但值得注意的是，该属性存在，并且会影响虚幻引擎中对象与不同光照路径的交互方式。
        
-   **天空光照和HDRI**：
    
    -   如果要为环境场景实现逼真的光照效果，建议使用天空大气、定向光源和天空光源。
        
    -   可将HDRI指定给任何在设置中启用**实时捕获（Real Time Capture）**的天空光源Actor。 另一种方法是创建材质，并将HDRI应用于大型天空球体作为背景。
        

为了让在包含大量光源的复杂场景和环境中工作变得更简单，你可以使用**光源混合器（Light Mixer）**面板来更改光源属性，这比从虚幻编辑器的大纲视图面板中选择单个光源或光源组进行调整要便捷得多。

你可以从主菜单的**Windows（窗口）**菜单中将光源混合器（Light Mixer）面板启用为可停靠面板。

[![光源混合器](https://dev.epicgames.com/community/api/documentation/image/3aae569a-2b04-4be6-a833-745a44fafed6?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/3aae569a-2b04-4be6-a833-745a44fafed6?resizing_type=fit)

如需详细了解虚幻引擎中的光照及其组件，请参阅以下主题：

-   [光源类型及其可移动性](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/light-types-and-their-mobility-in-unreal-engine)
    
-   [Lumen全局光照和反射](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)
    
-   [虚拟阴影贴图](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine)
    
-   [阴影](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/shadowing-in-unreal-engine)
    
-   [光源混合器](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-light-mixer-in-unreal-engine)
    

### 后期处理体积

在虚幻引擎中，**后期处理体积**是可放置的体积对象，通过它可以配置影响某一区域观感的渲染设置。 这些设置可作用于体积内的孤立区域，也可以全局应用于关卡中的所有位置。

放置后期处理体积后，你可以更改颜色分级、景深、泛光、反射等设置。 你还可以将材质与后期处理结合使用，创建更具针对性的效果。

为了让场景中的颜色分级更易操作和调整，你可以将**颜色分级（Color Grading）**与任何集成了后期处理设置的Actor配合使用，例如前文提到的后期处理体积、过场动画摄像机Actor和摄像机Actor。

你可以从主菜单的**Windows（窗口）**菜单中将颜色分级（Color Grading）面板启用为可停靠面板。

[![颜色分级面板](https://dev.epicgames.com/community/api/documentation/image/c00a425c-2cd9-475b-ac44-d0c6f97078a8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/c00a425c-2cd9-475b-ac44-d0c6f97078a8?resizing_type=fit)

如需详细了解虚幻引擎中的后期处理，请参阅以下主题：

-   [后期处理效果](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)
    
-   [后期处理材质](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine)
    
-   [颜色分级和胶片色调映射器](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/color-grading-and-the-filmic-tonemapper-in-unreal-engine)
    
-   [颜色分级面板](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine)
    
-   [景深](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/depth-of-field-in-unreal-engine)
    

### 环境光照功能

环境通常由光源、大气和云构成。 虚幻引擎自带一套功能，让使你可以打造环境，使其融入更大的世界（无论你是否按该比例编译）。 引擎中的光照系统支持所有这些功能，可通过拖放方式快速上手。

[![云和天空示例](https://dev.epicgames.com/community/api/documentation/image/028c7e06-930e-42b2-b7fd-f5db8cb025c8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/028c7e06-930e-42b2-b7fd-f5db8cb025c8?resizing_type=fit)

为了让环境光照更易操作和调整，**环境光源混合器（Environment Light Mixer）**面板将所有相关Actor的细节（Details）面板集中在一处。 你甚至可以直接打开该面板，将构成环境元素的Actor添加到场景中，立即开始调整。

你可以从主菜单的**Windows（窗口）**菜单中将环境光源混合器（Environment Light Mixer）面板启用为可停靠面板。

[![环境光源混合器](https://dev.epicgames.com/community/api/documentation/image/e77d380e-166f-4b41-9fdb-f5a33fb2eaff?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e77d380e-166f-4b41-9fdb-f5a33fb2eaff?resizing_type=fit)

如需详细了解如何使用这些构成大型环境的光照组件，请参阅以下主题：

-   [环境光源混合器](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/environment-light-mixer-in-unreal-engine)
    
-   [雾、云、天空和大气的环境光源](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine)
    
-   [天空大气组件](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/sky-atmosphere-component-in-unreal-engine)
    
-   [体积云组件](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/volumetric-cloud-component-in-unreal-engine)
    
-   [体积云材质](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/volumetric-cloud-material-in-unreal-engine)
    
-   [天空光照](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/sky-lights-in-unreal-engine)
    
-   指数高度雾
    
-   [局部雾体积](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/local-fog-volumes-in-unreal-engine)
    

## 含Day Sequence的昼夜变换系统

如果用户希望为场景快速设置和应用初始方案，可以使用Day Sequence插件，它包含一个完全可拖放到场景中的昼夜变换系统（如下例所示），你也可以使用更具可定制性的Day Sequence来满足项目的特定需求。

如需详细了解如何使用内置昼夜变换系统，请参阅[Setting Up A Time Of Day With Day Sequence](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/day-sequence-time-of-day-plugin-for-unreal-engine)。

## 下一页

[

![面向Maya用户的虚幻引擎脚本编写](https://dev.epicgames.com/community/api/documentation/image/99aff70c-a054-43d4-9914-619d44f0aa7b?resizing_type=fit&width=640&height=640)

面向Maya用户的虚幻引擎脚本编写

面向Maya用户的虚幻引擎脚本编写功能概述。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/scripting-in-unreal-engine-for-maya-users)

-   [maya](https://dev.epicgames.com/community/search?query=maya)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [虚幻引擎光照系统](/documentation/zh-cn/unreal-engine/lighting-and-rendering-in-unreal-engine-for-maya-users#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E5%85%89%E7%85%A7%E7%B3%BB%E7%BB%9F)
-   [放置和使用不同类型的光源](/documentation/zh-cn/unreal-engine/lighting-and-rendering-in-unreal-engine-for-maya-users#%E6%94%BE%E7%BD%AE%E5%92%8C%E4%BD%BF%E7%94%A8%E4%B8%8D%E5%90%8C%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%85%89%E6%BA%90)
-   [后期处理体积](/documentation/zh-cn/unreal-engine/lighting-and-rendering-in-unreal-engine-for-maya-users#%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E4%BD%93%E7%A7%AF)
-   [环境光照功能](/documentation/zh-cn/unreal-engine/lighting-and-rendering-in-unreal-engine-for-maya-users#%E7%8E%AF%E5%A2%83%E5%85%89%E7%85%A7%E5%8A%9F%E8%83%BD)
-   [含Day Sequence的昼夜变换系统](/documentation/zh-cn/unreal-engine/lighting-and-rendering-in-unreal-engine-for-maya-users#%E5%90%ABdaysequence%E7%9A%84%E6%98%BC%E5%A4%9C%E5%8F%98%E6%8D%A2%E7%B3%BB%E7%BB%9F)
-   [下一页](/documentation/zh-cn/unreal-engine/lighting-and-rendering-in-unreal-engine-for-maya-users#%E4%B8%8B%E4%B8%80%E9%A1%B5)
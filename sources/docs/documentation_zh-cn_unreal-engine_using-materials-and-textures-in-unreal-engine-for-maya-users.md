# 面向Maya用户的虚幻引擎材质和纹理的使用 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-materials-and-textures-in-unreal-engine-for-maya-users
> 
> 生成时间: 2025-06-14T18:50:35.848Z

---

目录

虚幻引擎的**材质**系统提供基于节点的材质编辑器，你可以通过联系纹理、数学运算、参数和表达式来创建表面外观。 此材质系统可以实时优化并渲染材质效果。

对于Maya用户而言，此工作流程与在Hypershade中打造材质的方式极其相似，但存在一些关键差异。

[![虚幻编辑器材质系统](https://dev.epicgames.com/community/api/documentation/image/490132b4-2d1d-43d9-9c4f-44bf10148df1?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/490132b4-2d1d-43d9-9c4f-44bf10148df1?resizing_type=fit)

虚幻引擎中的材质通过以下方式生成：

-   基于节点的材质编辑器，针对实时预览和工作流程进行了简化。
    
-   基于物理的渲染（PBR），通过基础颜色、金属感、粗糙度、高光度和法线贴图等定义的属性输入来强调真实感。
    
-   实时反馈机制，在预览视口中结合实时光照和反射，显示材质更改效果。
    
-   通过材质实例实现参数驱动的工作流，可通过重载参数调整材质，无需重新编译父材质。
    

## 材质的定义特性

在虚幻引擎中，材质的渲染方式及其对光照和表面的反应等定义特性，由其材质属性、材质输入和材质图表逻辑共同决定。

### 材质属性和材质输入

在材质编辑器中，**细节（Details）**面板用于设置材质的定义特性。 在创建材质时，你需要考虑三类主要属性，具体取决于所制作的材质类型。 这些属性决定了主材质节点的输入内容，用于在材质图表中设置材质外观。

[![虚幻编辑器材质属性](https://dev.epicgames.com/community/api/documentation/image/54f92ff3-407a-4efb-84b9-f1b813b1e7e0?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/54f92ff3-407a-4efb-84b9-f1b813b1e7e0?resizing_type=fit)

-   **材质域**定义了材质在你的项目中的用途。 例如，3D表面、用户界面、后期处理、光源函数或贴花等。
    
-   **混合模式**定义了材质与周围背景彩色像素的混合方式。 例如，不透明、半透明、遮罩以及其他类型的混合选项。
    
-   **着色模型**定义了材质与光源的交互方式，决定了表面的视觉外观和光照表现。 例如，与默认光照着色模型相比，布料着色模型和毛发着色模型会使用不同的材质输入来实现表面的真实感。 部分着色模型会增加材质的复杂度和性能开销。
    

设定这些材质属性后，你可以利用材质图表中主材质节点的可用输入来打造材质。 输入列表直接取决于为所开发材质设置的域、混合模式和着色模型。 对于在虚幻引擎中创建的大多数材质，你将使用以下设置：

以下示例展示了仅更改**混合模式**以使用不同输出时，主材质节点上的不同输入。

[![](https://dev.epicgames.com/community/api/documentation/image/ddc643fa-c457-41c3-b4f4-4a22761ae90a?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ddc643fa-c457-41c3-b4f4-4a22761ae90a?resizing_type=fit)

[![](https://dev.epicgames.com/community/api/documentation/image/2440efb4-1fe1-4c6e-a5d5-41be62ae9cc8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/2440efb4-1fe1-4c6e-a5d5-41be62ae9cc8?resizing_type=fit)

[![](https://dev.epicgames.com/community/api/documentation/image/fc5d5728-afe2-44f0-945c-a44369d1617c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/fc5d5728-afe2-44f0-945c-a44369d1617c?resizing_type=fit)

**材质域**：表面

**混合模式**：不透明

**着色模型**：默认光照

**材质域**：表面

**混合模式**：半透明

**着色模型**：默认光照

**材质域**：表面

**混合模式**：遮罩

**着色模型**：默认光照

以下是Maya Hypershade材质常用输入名称及其在虚幻引擎中的对应关系。 这还包括在虚幻引擎的材质图表中定义逻辑时，这些输入各自的典型源输入类型。

Maya Hypershade材质输入

虚幻引擎材质输入

典型源类型

材质输入说明

**颜色**

**基础颜色**

纹理或颜色

表面的主要漫反射颜色。

**反射率**

**金属感**

标量或纹理

定义表面外观为金属（1）或非金属（0）。

**粗糙度**

**粗糙度**

标量或纹理

控制表面光滑度（0为光滑，1为粗糙）。

**反射率**

**高光度**

标量或纹理

控制非金属表面的反射强度（0为无反射，1为强反射）。

**凹凸**/**法线**

**法线**

法线贴图纹理

通过纹理贴图应用表面细节。

**自发光**/**自发光颜色**/**白炽**

**自发光颜色**

颜色或纹理

控制表面自发光的强度。

**透明度**/**半透明度**

**不透明度**

标量或纹理

控制表面透明度（0为完全透明，1为不透明）。

**环境色**

**环境光遮蔽**

纹理

控制间接阴影的强度。

如需详细了解在材质中使用这些材质属性及其输入的信息和示例，请参阅以下主题：

-   [材质混合模式](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/material-blend-modes-in-unreal-engine)
    
-   [材质着色模型](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/shading-models-in-unreal-engine)
    
-   [材质输入](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/material-inputs-in-unreal-engine)
    
-   [材质属性](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-material-properties)
    

### 材质图表

**材质图表**是基于节点的编辑器，你可在其中联系纹理、表达式、数学运算和数值，以定义表面的外观。 材质的复杂程度可根据定义表面的需求灵活调整，从简单到复杂均可。

[![虚幻编辑器材质图表](https://dev.epicgames.com/community/api/documentation/image/079c461e-b7d5-41c6-b2ee-8d4704a54cfd?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/079c461e-b7d5-41c6-b2ee-8d4704a54cfd?resizing_type=fit)

常用的节点类型包括：

-   **纹理取样**
    
    -   此节点使用纹理资产，如颜色贴图和法线贴图。
        
-   **常量**
    
    -   这些是单值数字，可用于控制标量属性，例如Linear Interpolate节点的输入值，或直接接入主材质节点的金属感、粗糙度或不透明度等输入。
        
-   **数学节点**
    
    -   这些是用于加法、乘法、减法、除法、线性插值（Lerp）、幂运算、钳制等的数学运算。
        
-   **工具节点**
    
    -   这些是用于在图表中与其他节点建立逻辑关系的节点。 这些包括菲涅尔、摄像机向量、世界位置、纹理坐标等表达式。
        

如需了解在材质图表中使用逻辑及常规功能的更多信息，请参阅以下主题：

-   [在材质图表中使用主材质节点](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-main-material-node-in-unreal-engine)
    
-   [放置材质表达式和函数](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/placing-material-expressions-and-functions-in-unreal-engine)
    
-   [材质表达式参考](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-material-expressions-reference)
    

## 材质和纹理的补充说明

以下是与虚幻引擎中材质开发相关主题的一些简要概述。 如需深入了解这些概念及应用，请查看其关联文档页面。

### 材质和材质实例

虚幻引擎的材质系统专为实时渲染和光照的定制化与参数化而设计。 优化材质操作的一种方法是使用材质实例化，通过这种方式可自定义参数，同时不影响其派生自的原始材质。

因此，如果说**材质**是定义对象表面外观及其与光照交互方式的主要资产，则**材质实例**利用父级或基础材质的特性和参数，通过重载这些值来创造多样性和自定义效果。 这种方式比为每个对象单独使用独立材质更具成本效益。

[![虚幻编辑器材质编辑器](https://dev.epicgames.com/community/api/documentation/image/8bec6a2b-3674-49ae-a7f2-989f8b852120?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/8bec6a2b-3674-49ae-a7f2-989f8b852120?resizing_type=fit)

[![虚幻编辑器材质实例编辑器](https://dev.epicgames.com/community/api/documentation/image/df1ce4a3-a6c9-469b-ba4b-91d56f382ef7?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/df1ce4a3-a6c9-469b-ba4b-91d56f382ef7?resizing_type=fit)

**材质编辑器**

**材质实例编辑器**

可通过以下方式拆解材质和材质实例的特征：

材质特征

材质实例特征

使用基于节点的编辑器创建。

使用由公开参数驱动的编辑器，这些参数可从基础材质中进行重载。

包含材质的所有可能功能输入，例如颜色、金属感、粗糙度、不透明度等。

仅提供对基础材质中可重载的公开参数的访问权限。

更改材质后，需要重新编译才能预览更改效果。

更改参数时提供实时反馈，因此无需重新编译材质。

材质图表可以具有任意复杂程度，以实现其视觉需求。

仅访问公开参数，从而提升性能和工作流程效率。

更改此材质会影响所有使用它的对象。

更改此材质实例仅影响使用此材质的对象，因此非常适合用于创建多个外观相似、基于同一父材质且具有共同特征的对象表面。

当你仅需自定义细节和调整参数（如材质颜色、纹理、缩放等）时，就是考虑将材质实例与基础材质结合使用的最佳时机。 当需要定义新的视觉行为和样式（例如不透明与半透明效果），或需在材质图表中设置新的逻辑时，则应创建新的基础材质。

通常，对于具有相似属性和特性的材质，使用材质相比材质实例需要更长的初始设置时间，且性能表现更差。

如需了解在项目中使用材质和材质实例的信息，请参阅以下主题：

-   [实例化材质](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)
    
-   [材质实例编辑器界面](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui)
    
-   [创建和使用材质实例](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine)
    

### 纹理

与Maya类似，纹理是应用于所创建材质输入特性的图像贴图，例如基础颜色、法线、粗糙度等，用于定义表面细节。 在虚幻引擎中，开发材质时更注重基于物理的渲染概念和实时反馈。

导入纹理后，可以在**纹理资产编辑器**中打开它们，查看相关信息、配置设置并进行一些调整。

[![虚幻编辑器纹理资产编辑器](https://dev.epicgames.com/community/api/documentation/image/e4af7f10-76fa-4c01-b078-b35577c2f88e?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e4af7f10-76fa-4c01-b078-b35577c2f88e?resizing_type=fit)

虚幻引擎的纹理资产编辑器

在虚幻引擎中，你可以通过以下方式优化纹理处理并提高工作效率：

-   在导入之前，使用第三方工具创建和调整纹理。
    
-   使用通道打包技术，将粗糙度、金属感和环境光遮蔽等材质输入的多张灰度纹理合并为单张RGB纹理。 通过引用单张纹理替代多张不同纹理，可优化性能。
    
-   引擎会自动压缩纹理，但了解如何利用这一特点可提升视觉保真度和性能。
    
-   注意纹理尺寸。 为保证实时性能，理想情况下使用2的幂次方尺寸（如128、512、1024等）的纹理。 非2的幂次方纹理无法使用引擎的纹理流送系统，可能导致远处出现视觉瑕疵。
    

如需了解虚幻引擎中纹理的使用方法，请参阅以下主题：

-   [在虚幻引擎中使用纹理](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/textures-in-unreal-engine)
    
-   [纹理资产编辑器概述](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/texture-asset-editor-in-unreal-engine)
    

### Substrate材质框架

虚幻引擎的**Substrate材质框架**是一种材质创作方法，它通过更具表现力的模块化框架，取代了固定的着色模型和混合模式组合。 材质创作流程与标准材质系统一致，但你不再受限于为单个材质单独指定单个着色模型和混合模式。 在此工作流程中，你可以无缝混合这些元素，以创建具有更丰富复杂性的独特材质。

[![虚幻引擎Substrate材质](https://dev.epicgames.com/community/api/documentation/image/86a0ff50-c7ec-439f-968e-a3a535e71bd9?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/86a0ff50-c7ec-439f-968e-a3a535e71bd9?resizing_type=fit)

如需了解在项目中使用Substrate以及材质创建工作流程的更多信息，请参阅[Substrate材质概述](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine)。

### 基于物理的材质渲染

虚幻引擎采用**基于物理的渲染**（PBR）技术进行着色和渲染，可精确模拟光源与表面的交互行为。 这种技术通过符合物理规律的光源交互，在直射阳光与室内照明等不同的光照条件下，创建逼真且（更重要的是）可预测的视觉效果，无论是写实表面还是从手绘到卡通渲染等风格化表现，都能保持一致的物理可信度。

在虚幻引擎中使用PBR材质时，需要考虑的关键原则如下：

-   **逼真的光照交互**，表面能够对不同的光照设置（无论是自然光照（室外）还是人工光照（室内））做出准确且可预测的反应。
    
-   材质**一致性**，确保材质在不同场景和光照环境中均呈现正确效果。
    
-   **简化工作流程**，美术师可通过材质的物理属性（而非任意数值）定义材质，在实时环境中通过即时场景反馈，显著减少着色和光照调节的试错成本。
    

如需更多信息，请参阅[基于物理的材质](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine)。

## 下一页

[

![面向Maya用户的虚幻引擎的光照和渲染](https://dev.epicgames.com/community/api/documentation/image/7d33fa95-94e5-41a0-a0b0-8aa675febf9c?resizing_type=fit&width=640&height=640)

面向Maya用户的虚幻引擎的光照和渲染

面向Maya用户的虚幻引擎的光照和渲染功能概述。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lighting-and-rendering-in-unreal-engine-for-maya-users)

-   [maya](https://dev.epicgames.com/community/search?query=maya)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [材质的定义特性](/documentation/zh-cn/unreal-engine/using-materials-and-textures-in-unreal-engine-for-maya-users#%E6%9D%90%E8%B4%A8%E7%9A%84%E5%AE%9A%E4%B9%89%E7%89%B9%E6%80%A7)
-   [材质属性和材质输入](/documentation/zh-cn/unreal-engine/using-materials-and-textures-in-unreal-engine-for-maya-users#%E6%9D%90%E8%B4%A8%E5%B1%9E%E6%80%A7%E5%92%8C%E6%9D%90%E8%B4%A8%E8%BE%93%E5%85%A5)
-   [材质图表](/documentation/zh-cn/unreal-engine/using-materials-and-textures-in-unreal-engine-for-maya-users#%E6%9D%90%E8%B4%A8%E5%9B%BE%E8%A1%A8)
-   [材质和纹理的补充说明](/documentation/zh-cn/unreal-engine/using-materials-and-textures-in-unreal-engine-for-maya-users#%E6%9D%90%E8%B4%A8%E5%92%8C%E7%BA%B9%E7%90%86%E7%9A%84%E8%A1%A5%E5%85%85%E8%AF%B4%E6%98%8E)
-   [材质和材质实例](/documentation/zh-cn/unreal-engine/using-materials-and-textures-in-unreal-engine-for-maya-users#%E6%9D%90%E8%B4%A8%E5%92%8C%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B)
-   [纹理](/documentation/zh-cn/unreal-engine/using-materials-and-textures-in-unreal-engine-for-maya-users#%E7%BA%B9%E7%90%86)
-   [Substrate材质框架](/documentation/zh-cn/unreal-engine/using-materials-and-textures-in-unreal-engine-for-maya-users#substrate%E6%9D%90%E8%B4%A8%E6%A1%86%E6%9E%B6)
-   [基于物理的材质渲染](/documentation/zh-cn/unreal-engine/using-materials-and-textures-in-unreal-engine-for-maya-users#%E5%9F%BA%E4%BA%8E%E7%89%A9%E7%90%86%E7%9A%84%E6%9D%90%E8%B4%A8%E6%B8%B2%E6%9F%93)
-   [下一页](/documentation/zh-cn/unreal-engine/using-materials-and-textures-in-unreal-engine-for-maya-users#%E4%B8%8B%E4%B8%80%E9%A1%B5)
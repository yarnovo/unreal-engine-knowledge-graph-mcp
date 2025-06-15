# 在虚幻引擎中激活和使用网格体绘制模式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/activating-and-using-mesh-paint-mode-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:19:29.676Z

---

目录

关卡视口中包含一系列模式供你选择，可直接在视口中交互式编辑内容。**网格体绘制（Mesh Paint）** 模式中的工具可以直接在视口中对网格体的顶点和纹理进行绘制。你可以绘制单个网格体的多个实例，每个实例都可以有独特的颜色值和Alpha值，这样可以根据需要在你创建的材质中使用此数据。颜色值可以被绘制到网格体的顶点上，也可以被绘制到其分配的纹理中。你可以直接可视化这些颜色数据，从而同时编辑多个网格体。

## 网格体绘制工作流程

大多数绘制功能设计得非常直观，几乎无需设置即可直接使用。一般的工作流程如下：

1.  选择你想要执行的网格体绘制类型。
    -   如果使用顶点颜色或顶点权重，你需要设置[顶点颜色材质](/documentation/zh-cn/unreal-engine/setting-up-a-vertex-color-material-for-mesh-painting-in-unreal-engine)。
    -   如果使用纹理颜色，你需要设置[纹理颜色材质和网格体](/documentation/zh-cn/unreal-engine/setting-up-a-material-and-mesh-for-texture-color-painting-in-unreal-engine)。
    -   如果同时使用两者，你需要设置[同时处理顶点颜色和纹理颜色的材质](/documentation/zh-cn/unreal-engine/how-to-share-vertex-color-data-between-instances-in-unreal-engine#%E5%90%8C%E6%97%B6%E4%B8%BA%E9%A1%B6%E7%82%B9%E9%A2%9C%E8%89%B2%E5%92%8C%E7%BA%B9%E7%90%86%E9%A2%9C%E8%89%B2%E8%AE%BE%E7%BD%AE%E6%9D%90%E8%B4%A8)。
2.  在关卡编辑器中激活 **网格体绘制（Mesh Paint）** 模式并选择绘制方法。
3.  选择 **绘制方法（Paint Method）** 选项卡。
4.  选择你想要绘制的 **网格体** 。
5.  选择 **绘制（Paint）** 工具。
6.  对选定的网格体应用绘制。

## 网格体绘制的要求

必须满足以下额外要求，才能使用网格体绘制模式的特定功能：

-   **纹理颜色绘制要求项目启用虚拟纹理。**
    -   要启用虚拟纹理，可以前往项目设置的 **引擎（Engine） - 渲染（Rendering）** 分段下的 **启用虚拟纹理支持（Enable virtual texture support）** 。
    -   如需详情，请参阅[虚拟纹理](/documentation/zh-cn/unreal-engine/virtual-texturing-in-unreal-engine)。
-   **对启用Nanite的网格体进行顶点颜色绘制。**
    -   对于启用了Nanite的网格体，即使存在逐实例顶点颜色数据，无法可视化数据。要查看和绘制此类型的数据，应暂时禁用Nanite。
    -   如需了解详情，请参阅此页面的[在Nanite网格体上绘制](/documentation/zh-cn/unreal-engine/activating-and-using-mesh-paint-mode-in-unreal-engine#%E5%9C%A8nanite%E7%BD%91%E6%A0%BC%E4%BD%93%E4%B8%8A%E7%BB%98%E5%88%B6)小节。

## 激活网格体绘制模式

在关卡视口的主工具栏中，使用 **模式（Modes）** 下拉菜单选择 **网格体绘制（Mesh Paint）** 以在关卡视口中激活网格体绘制。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94acd8b4-3258-4ec0-b899-c6bf727c4dc7/mp-mode-selection.png)

激活后，将在视口左侧打开 **网格体绘制（Mesh Paint）** 面板。从下拉菜单中选择其他模式，系统将自动关闭网格体绘制面板，并（在适用情况下）打开所选模式的面板。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0559f24-a94f-4116-a86a-4b42f8550b1d/mp-meshpaint-tab.png)

网格体绘制选项卡

当网格体绘制模式激活时，你仍可以执行大部分编辑器常见操作，例如摄像机移动和选择一些关卡Actor。但平移和缩放等功能将被禁用。当网格体绘制模式激活时， **创建（Create）** 工具栏菜单仍然可用，可用于添加和放置对象。

当网格体绘制模式激活时，透视视口默认强制启用实时模式。你可以在视口设置的 **禁用实时重载（Disable Realtime Override）** 中更改此设置以及其他视口设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23792148-bd8c-4843-9ee7-fcd3a0fe9e0c/mp-viewport-controls.png)

## 网格体绘制及其工具

网格体绘制面板包括一系列网格体绘制方法，每种方法都有各自的工具和设置，可以用来在关卡视口中交互式绘制网格体。

网格体绘制面板分为以下几个部分：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aac15382-20c3-44fe-92e3-652eb0ec5ee5/mp-interface.png)

1.  网格体绘制方法
2.  所选模式的网格体绘制工具
3.  网格体绘制工具设置

### 网格体绘制方法

网格体绘制模式包含一组绘制方法，用于将颜色绘制到网格体上，从而在顶点或纹理中存储颜色数据。选择其中一种方法后，将在下方显示一组工具（大多数工具在各种绘制方法中都有）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/071d68d7-1deb-42ba-9dc8-b8602867c802/mp-painting-methods.png)

四种网格体绘制方法可供选择：

网格体绘制方法

说明

**顶点颜色（Vertex Color）**

在网格体上绘制顶点颜色。顶点颜色数据可以存储在网格体组件上，也可以应用于共享的网格体资产。

**顶点权重（Vertex Weights）**

在网格体上绘制顶点权重，这些权重可在材质中用于在不同纹理层之间混合。

**纹理颜色（Texture Color）**

在网格体上绘制颜色，这些颜色将存储在称为网格体绘制纹理的专用纹理资产的实例中。

**纹理（Textures）**

在纹理资产上绘制。你可以在网格体的可用纹理资产之间切换，以分别绘制。一次只能选择一个组件进行纹理绘制。

### 网格体绘制工具及其设置

每种网格体绘制方法都包含一个工具栏，其中有一组特定于该方法的工具。不同的网格体绘制方法之间也有一些通用工具。这些工具包括可能特定于网格体绘制方法的设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af2b2d27-50e6-4187-a7df-ac0b1b0edbfa/mp-paint-tools.png)

当选择 **绘制（Paint）** 工具时，网格体绘制方法的设置将填充所选工具下方的面板。

如需详细了解网格体绘制工具的各个属性和设置，请参阅[网格体绘制模式工具和设置](/documentation/zh-cn/unreal-engine/mesh-paint-tool-reference-in-unreal-engine)。

## 在实例上绘制

当使用顶点颜色或纹理颜色进行绘制时，你仅在网格体的单个实例上进行绘制，而不是在实际网格体资产本身上进行绘制。存储在实例上的颜色数据可以使用 **顶点颜色（Vertex Color）** 和 **纹理颜色（Texture Color）** 选项卡的常用功能复制到网格体的另一个实例中，从而在单个或多个网格体之间复制和粘贴数据。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97c3ba9f-6b5c-4105-84f0-1793e1484723/mp-vertexcolor-tools.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2509181-0cd1-4eeb-ba38-6330a6733ce0/mp-texturecolor-tools.png)

顶点颜色绘制工具

纹理颜色绘制工具

每个网格体绘制工具都会在详细信息和设置的资源使用情况（Resource Usage）类别下显示所存储的颜色和纹理数据的大小。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66b2362b-38ec-4016-b77a-43be400fc1b8/mp-resource-usage.png)

在绘制顶点颜色时， **实例颜色尺寸（Instance Color Size）** 字段将显示顶点颜色数据使用的内存字节数。此值反映当前选定的所有实例的总数。

在绘制纹理颜色时， **网格体绘制纹理资源大小（Mesh Paint Texture Resources Size）** 字段将显示纹理资源的字节大小。此值反映当前选定的所有实例的总数。

对于纹理颜色，网格体绘制纹理资源大小并非暂存包中的 *最终* 大小，因为它没有考虑项目中所有纹理的打包压缩。同样，也不是内存中的大小，因为此模式使用的是虚拟纹理，具有由共享虚拟纹理池定义的固定内存成本开销。

### 绘制功能按钮

在网格体上绘制时，你可以使用以下热键：

功能按钮

说明

**鼠标左键**

将绘制颜色应用到网格体。

**\[**

减小绘制半径。

**\]**

增大绘制半径。

**X**

交换绘制颜色和擦除颜色。

**Shift + 鼠标左键**

将"擦除"绘制颜色应用到网格体。当需要在两种不同的绘制之间快速交换以应用到网格体时，这非常有用。

## 绘制颜色和权重

网格体绘制工具提供将颜色和权重应用于顶点和纹理的选项。每个工具选择在绘制和擦除方面都具有相似的属性。

顶点颜色、纹理颜色和纹理工具在以下方面都有相似的属性：绘制颜色、擦除颜色以及各个颜色通道选择。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a098e648-1ef9-47fe-bb64-4ecafb49e26a/mp-color-painting-settings.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e3d4083-1301-4569-aa1a-68fcddc9aa47/mp-weight-painting-settings.png)

顶点颜色、纹理颜色和纹理的颜色绘制设置

顶点权重的权重绘制设置

顶点颜色、纹理颜色和纹理工具包括以下属性：

属性

说明

**绘制颜色（Paint Color）**

用于应用颜色绘制的颜色。

**擦除颜色（Erase Color）**

用于擦除颜色绘制的颜色。

**通道（Channels）**

在绘制过程中应受影响的颜色通道。

**传播到顶点颜色（Propagate to Vertex Color）**

（仅纹理颜色属性）是否将所有纹理颜色绘制复制到顶点颜色。

**顶点权重（Vertex Weights）** 工具包括加权选项，用于绘制和擦除分配给网格体的材质中设置的混合层部分。该工具包括以下属性：

属性

说明

**纹理权重类型（Texture Weight Type）**

选择要使用的混合权重绘制模式：

-   **Alpha（双纹理）** ：使用Alpha值在两个纹理之间插值。
-   **RGB（三纹理）** ：根据颜色通道对三个纹理应用权重。
-   **ARGB（四纹理）** ：根据颜色通道和Alpha通道对四个纹理应用权重。
-   **ARGB - 1（五纹理）** ：根据颜色通道和Alpha通道对五个纹理应用权重。

**绘制纹理权重索引（Paint Texture Weight Index）**

要应用绘制的纹理混合权重索引（哪个纹理）。

**擦除纹理权重指数（Erase Texture Weight Index）**

在绘制期间应擦除的纹理混合权重索引（哪个纹理）。

对于使用颜色的工具，你可以使用 **取色器** 来选择特定的 **绘制** 和 **擦除** 颜色。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/314006c2-c983-49b5-9527-b3824661817a/mp-color-picker.png)

对于工作流程而言，你应将 **绘制颜色** 和 **擦除颜色** 视为前景色和背景色。擦除颜色只是一种替代的绘制颜色，它不会像其他应用程序中的擦除工具那样移除之前绘制的笔划。它只是在绘制另一个颜色。例如，如果底色是白色，则你可以使用白色作为擦除颜色，从而覆盖前景绘制颜色。

**交换（Swap）** 图标可切换绘制颜色和擦除颜色的位置。当你需要在两种颜色之间来回切换，或者修改画错的笔划时，此功能非常有用。同样， **交换（Swap）** 工具也能执行相同的操作。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee906302-413e-4510-a945-512959341d3a/mp-color-swap.gif)

## 在Nanite网格体上绘制

在启用了Nanite的网格体上进行绘制时，需要考虑以下几点：

-   **Nanite网格体不支持顶点颜色绘制：**
    -   Nanite网格体应使用纹理颜色进行网格体绘制。这还要求项目启用[虚拟纹理](/documentation/zh-cn/unreal-engine/virtual-texturing-in-unreal-engine)，因为纹体理颜色的网格体绘制纹理始终是虚拟纹理。
-   **如果你同时使用顶点颜色和纹理颜色，可以设置一些材质逻辑来处理两者：**
    -   如需如何设置此功能的简化示例，请参阅[在顶点颜色和纹理颜色之间共享数据](/documentation/zh-cn/unreal-engine/how-to-share-vertex-color-data-between-instances-in-unreal-engine)中的"为顶点颜色和纹理颜色设置材质"小节。
-   **在启用了Nanite后，即使存在顶点颜色数据，也无法逐实例可视化：**
    -   要可视化顶点颜色数据，应在编辑器中暂时禁用Nanite。禁用后，将使用回退网格体来可视化此颜色数据。要暂时禁用Nanite，请执行以下操作：
        -   使用控制台将`r.Nanite`设置为0。将其设置回1以重新启用。
        -   在网格体组件的渲染（Rendering） > 高级（Advanced）设置下，勾选 **禁用Nanite（Disallow Nanite）** 复选框，使用回退网格体进行可视化。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [reference](https://dev.epicgames.com/community/search?query=reference)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [mesh paint tool](https://dev.epicgames.com/community/search?query=mesh%20paint%20tool)
-   [vertex color](https://dev.epicgames.com/community/search?query=vertex%20color)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [网格体绘制工作流程](/documentation/zh-cn/unreal-engine/activating-and-using-mesh-paint-mode-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%98%E5%88%B6%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
-   [网格体绘制的要求](/documentation/zh-cn/unreal-engine/activating-and-using-mesh-paint-mode-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%98%E5%88%B6%E7%9A%84%E8%A6%81%E6%B1%82)
-   [激活网格体绘制模式](/documentation/zh-cn/unreal-engine/activating-and-using-mesh-paint-mode-in-unreal-engine#%E6%BF%80%E6%B4%BB%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%98%E5%88%B6%E6%A8%A1%E5%BC%8F)
-   [网格体绘制及其工具](/documentation/zh-cn/unreal-engine/activating-and-using-mesh-paint-mode-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%98%E5%88%B6%E5%8F%8A%E5%85%B6%E5%B7%A5%E5%85%B7)
-   [网格体绘制方法](/documentation/zh-cn/unreal-engine/activating-and-using-mesh-paint-mode-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%98%E5%88%B6%E6%96%B9%E6%B3%95)
-   [网格体绘制工具及其设置](/documentation/zh-cn/unreal-engine/activating-and-using-mesh-paint-mode-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%98%E5%88%B6%E5%B7%A5%E5%85%B7%E5%8F%8A%E5%85%B6%E8%AE%BE%E7%BD%AE)
-   [在实例上绘制](/documentation/zh-cn/unreal-engine/activating-and-using-mesh-paint-mode-in-unreal-engine#%E5%9C%A8%E5%AE%9E%E4%BE%8B%E4%B8%8A%E7%BB%98%E5%88%B6)
-   [绘制功能按钮](/documentation/zh-cn/unreal-engine/activating-and-using-mesh-paint-mode-in-unreal-engine#%E7%BB%98%E5%88%B6%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [绘制颜色和权重](/documentation/zh-cn/unreal-engine/activating-and-using-mesh-paint-mode-in-unreal-engine#%E7%BB%98%E5%88%B6%E9%A2%9C%E8%89%B2%E5%92%8C%E6%9D%83%E9%87%8D)
-   [在Nanite网格体上绘制](/documentation/zh-cn/unreal-engine/activating-and-using-mesh-paint-mode-in-unreal-engine#%E5%9C%A8nanite%E7%BD%91%E6%A0%BC%E4%BD%93%E4%B8%8A%E7%BB%98%E5%88%B6)
# 虚幻引擎网格体纹理颜色绘制快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/getting-started-with-mesh-texture-color-painting-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:19:30.705Z

---

目录

**纹理颜色（Texture Color）** 模式会将颜色绘制到网格体上，而绘制内容将被写入到一个名为 **网格体绘制纹理** 的特殊纹理中。该纹理存储在正在绘制的网格体实例上。这类似于顶点颜色模式的绘制内容的存储方式，即绘制内容存储在正在进行绘制的网格体实例的额外顶点缓冲区中。将颜色绘制到网格体绘制纹理，而不是绘制到网格体的顶点，这样做的优点是，选择纹理大小时不受顶点密度影响。如果你的网格体不需要如此高的绘制分辨率，这可能很有用，但对于一些帧预算较小的平台，这可能会受到限制。

Nanite网格体不支持为每个实例进行顶点颜色绘制。只能选择使用纹理颜色绘制。

## 网格体纹理颜色绘制的必要设置

为了让项目和网格体能够使用 **纹理颜色（Texture Color）** 模式，必须执行以下几个步骤。即：

-   为项目启用[虚拟纹理](/documentation/zh-cn/unreal-engine/virtual-texturing-in-unreal-engine)。
-   使用纹理颜色模式将网格体绘制纹理添加到选定的网格体实例中。
-   设置材质以使用网格体绘制纹理。
-   为网格体绘制设置网格体的UV分配。

### 向静态网格体中添加网格体绘制纹理

按照以下步骤将网格体绘制纹理添加到你的静态网格体中：

1.  使用 **模式（Modes）** 下拉菜单，在关卡视口中启用 **网格体绘制模式（Mesh Paint Mode）** 。
2.  在网格体绘制（Mesh Paint）面板中，选择 **纹理颜色（Texture Color）** 选项卡。
3.  在纹理颜色（Texture Color）工具栏中，点击 **添加（Add）** 工具。
    
    如果 **添加（Add）** 工具显示为灰色，请检查你的项目是否已启用虚拟纹理（Virtual Textures）。
    

这将创建一个空白的虚拟纹理资产，并将其分配给 **网格体绘制纹理** 。你可以在网格体组件的细节（Details）面板中的"网格体绘制（Mesh Painting）"类别下检查此纹理。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd55a41b-991f-47bf-a38f-442278c5a15d/mp-gs-meshpainttexture.png)

### 网格体绘制虚拟纹理材质表达式

你需要设置一个可以引用纹理对象进行绘制的材质，才可以使用已创建并已分配给网格体组件的网格体绘制纹理。

你需要使用 **MeshPaintTextureObject** 材质表达式和一个Texture Sample节点，将网格体绘制纹理的引用传递给此材质。如果此材质所分配的网格体存在网格绘制纹理，则在纹理颜色（Texture Color）绘制模式下，你将能够在网格体上进行绘制。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3dad4749-e7ed-4566-a82b-57788bb3ebe1/mp-gs-meshpainttextureobjectnode.png)

在Texture Sample节点上， **Tex** 输入接收MeshPaintTextureObject节点的数据，且UV必须设置为静态网格体用于绘制的UV坐标（请参阅下面的"静态网格体UV和坐标"）。

有时，你可能希望多个网格体共享一个材质，而不希望它仅用于使用网格纹理绘制的网格体。在这些情况下，你需要使用 **MeshPaintTextureReplace** 材质表达式。它是一个"回退"选项，用于根据是否有有效的网格体绘制纹理可供取样来切换输入。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/782c2649-1d50-45ba-9410-70684ad16033/mp-gs-materialexample.png)

要使用此节点，当此材质所分配的网格体上没有有效的网格体绘制纹理时，将使用 **默认（Default）** 路径。此路径可以是一个简单的颜色或纹理节点，也可以是更复杂的内容。当此材质所分配的网格体上有有效的网格体绘制纹理时，将使用 **MeshPaintTexture** 路径。

如需网格体绘制纹理的设置和使用指南，请参阅[为纹理颜色绘制设置材质和网格体](/documentation/zh-cn/unreal-engine/setting-up-a-material-and-mesh-for-texture-color-painting-in-unreal-engine)。

### 静态网格体UV和坐标

为了有效地在网格体上使用纹理颜色模式进行绘制，你的网格体必须具有 *合适的* UV参数化。理想情况下，这意味着UV在整个网格体上是唯一的，没有重叠图表、重复UV或平铺UV。有些网格体可能已经这样设置了，但有些可能并非如此。当UV的设置不适合进行网格体绘制时，网格体工具仍然可以工作，但可能会得到意外的结果，例如在网格体的一个部分上进行绘制时，也会在其他部分上进行绘制。

以下面的立方体为例。左边的立方体具有重叠UV，其中每个面都使用了整个0,1 UV空间。右边的网格体具有唯一的UV，没有重叠、重复或平铺。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e246f1ff-318b-43bd-b88b-040413ba0ec2/mp-gs-overlappinguvs.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/714d540d-2d32-455b-ab39-6e3c9fbb20d0/mp-gs-uniqueuvs.gif)

具有重叠UV图表的静态网格体

具有唯一UV图表的静态网格体

如果你查看每个网格体的UV图表及其布局方式，就会明白为什么会出现这种情况。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f44b3db6-35c1-465c-8384-f31ac4878b26/mp-gs-overlappinguvs.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84b1343e-3740-4cac-b195-5242485170dd/mp-gs-uniqueuvs.png)

具有重叠UV图表的静态网格体

具有唯一UV图表的静态网格体

虽然对于应用的材质而言，重叠的UV坐标能带来好处，但对于应用于网格体本身的颜色数据绘制而言，这并不理想。如果你的网格体需要一个将所有UV图表展平且每个图表都有唯一ID的UV，你可以在静态网格体编辑器中使用 **生成光照贴图UV（Generate Lightmap UVs）** 属性为此网格体创建一个。

如需详细了解如何使用唯一UV图表设置UV通道，请参阅[为纹理颜色绘制设置材质和网格体](/documentation/zh-cn/unreal-engine/setting-up-a-material-and-mesh-for-texture-color-painting-in-unreal-engine)。

## 在网格体上进行纹理颜色绘制

当你开始使用纹理颜色模式在网格体上进行绘制时，需要注意一些设置。

### 按网格体和按实例设置支持

有时，你需要防止在不必要的情况下创建网格体绘制纹理，因此在场景中筛选掉某些网格体或特定网格体实例非常有用。

你可以在静态网格体编辑器中将"常规设置（General Settings）"类别下的 **支持纹理颜色网格体绘制（Support Texture Color Mesh Painting）** 设置更改为以下选项之一，从而 **按网格体** 禁用网格体纹理绘制：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e90b52d3-765d-47ca-94d7-44258f11dcf9/mp-gs-permeshsettings.png)

选择选项

说明

**默认（Default）**

网格体使用项目设置的"引擎 - 渲染"部分中的"网格体绘制默认静态网格体支持"设置。

**启用（Enabled）**

网格体已启用纹理颜色绘制。

**禁用（Disabled）**

网格体已禁用纹理颜色绘制。

或者，你也可以 **按实例** 禁用静态网格体组件上的绘制。使用 **细节（Details）** 面板，取消勾选"网格体绘制（Mesh Painting）"类别下 **启用纹理颜色网格体绘制（Enable Texture Color Mesh Painting）** 旁边的复选框。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ba74fb6-9d74-48c2-a4c0-90b50452a7ec/mp-gs-enabletexturecolorpainting.png)

当禁用网格体资产或网格体实例上的纹理颜色绘制时，并不会删除现有的纹理数据。这只会阻止网格体绘制纹理的创建或修改。

### 网格体绘制纹理分辨率

当使用纹理颜色绘制时，网格体绘制纹理具有默认的大小启发法。但你可以明确设置网格体绘制纹理的大小，以满足项目需求。这可以在网格体资产上设置，也可以按实例重载。默认情况下，网格体绘制纹理分辨率设置为0，此时使用默认启发法，并基于（非Nanite）LOD0网格体中的顶点数量。网格体绘制纹理分辨率始终四舍五入到最接近的2的幂次方值（如果不是2的幂次方）。

你可以使用项目设置 **每个顶点的网格体绘制纹素（Mesh paint texels per vertex）** 为默认启发法配置纹素与顶点的默认比率，这将创建一个网格体绘制纹理，满足以下条件：

最小纹素数 = （每个顶点的网格体绘制纹素）×（LOD 0网格体中的顶点数量）

纹理大小是第一个大于该最小纹素数的2的幂次方值。

要在静态网格体资产上设置特定的网格体绘制纹理分辨率，请在"常规设置（General Settings）"类别下为 **网格体绘制纹理分辨率（Mesh Paint Texture Resolution）** 输入一个值。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/339c0f9f-2518-49f4-b776-8b7e423cb752/mp-gs-staticmesheditorsettings.png)

或者，你可以在网格体的细节（Details）面板中输入 **重载网格体绘制纹理分辨率（Override Mesh Paint Texture Resolution）** 的值，重载每个网格体实例的网格体绘制纹理分辨率。

更改任何影响网格体绘制纹理分辨率的设置，都不会影响现有的网格体绘制纹理。这些设置仅适用于在所选网格体上使用 **添加（Add）** 工具时创建的网格体绘制纹理。但你可以使用 **修复（Fix）** 工具应用这些设置，以调整大小并保留你的工作。

#### 虚拟纹理网格体绘制项目设置

网格体绘制纹理资产始终是虚拟纹理，并且必须为项目启用此功能。这将允许它们按需流送，并使用项目设置中的虚拟纹理池配置来限制其内存使用。

项目设置中的虚拟纹理设置包括可配置的网格体绘制设置，以满足项目的需求。例如， **网格体绘制图块大小（Mesh paint tile size）** 独立于通用流式虚拟纹理的 **图块大小（Tile Size）** 。对于网格体绘制，你通常希望使用较小的图块大小，因为网格体绘制纹理的分辨率通常较低。

所有网格体绘制纹理共享同一个纹理格式。默认使用压缩格式，相比于未压缩格式，所需的GPU内存更少。如果有损压缩导致视觉瑕疵，你可以取消勾选 **网格体绘制使用压缩纹理（Mesh paint use compressed textures）** 复选框，从而禁用压缩。

虚拟纹理项目设置位于 **引擎 - 渲染（Engine - Rendering）** 下的"虚拟纹理（Virtual Texture）"类别中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67154f97-9fd2-4e05-a92a-c775eb719ac4/mp-gs-virtualtexturesettings.png)

如需详细了解项目设置中的其他虚拟纹理网格体绘制设置，请参阅[网格体绘制模式工具和设置](/documentation/zh-cn/unreal-engine/mesh-paint-tool-reference-in-unreal-engine)。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [reference](https://dev.epicgames.com/community/search?query=reference)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [mesh paint tool](https://dev.epicgames.com/community/search?query=mesh%20paint%20tool)
-   [vertex color](https://dev.epicgames.com/community/search?query=vertex%20color)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [网格体纹理颜色绘制的必要设置](/documentation/zh-cn/unreal-engine/getting-started-with-mesh-texture-color-painting-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BA%B9%E7%90%86%E9%A2%9C%E8%89%B2%E7%BB%98%E5%88%B6%E7%9A%84%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [向静态网格体中添加网格体绘制纹理](/documentation/zh-cn/unreal-engine/getting-started-with-mesh-texture-color-painting-in-unreal-engine#%E5%90%91%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E4%B8%AD%E6%B7%BB%E5%8A%A0%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%98%E5%88%B6%E7%BA%B9%E7%90%86)
-   [网格体绘制虚拟纹理材质表达式](/documentation/zh-cn/unreal-engine/getting-started-with-mesh-texture-color-painting-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%98%E5%88%B6%E8%99%9A%E6%8B%9F%E7%BA%B9%E7%90%86%E6%9D%90%E8%B4%A8%E8%A1%A8%E8%BE%BE%E5%BC%8F)
-   [静态网格体UV和坐标](/documentation/zh-cn/unreal-engine/getting-started-with-mesh-texture-color-painting-in-unreal-engine#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93uv%E5%92%8C%E5%9D%90%E6%A0%87)
-   [在网格体上进行纹理颜色绘制](/documentation/zh-cn/unreal-engine/getting-started-with-mesh-texture-color-painting-in-unreal-engine#%E5%9C%A8%E7%BD%91%E6%A0%BC%E4%BD%93%E4%B8%8A%E8%BF%9B%E8%A1%8C%E7%BA%B9%E7%90%86%E9%A2%9C%E8%89%B2%E7%BB%98%E5%88%B6)
-   [按网格体和按实例设置支持](/documentation/zh-cn/unreal-engine/getting-started-with-mesh-texture-color-painting-in-unreal-engine#%E6%8C%89%E7%BD%91%E6%A0%BC%E4%BD%93%E5%92%8C%E6%8C%89%E5%AE%9E%E4%BE%8B%E8%AE%BE%E7%BD%AE%E6%94%AF%E6%8C%81)
-   [网格体绘制纹理分辨率](/documentation/zh-cn/unreal-engine/getting-started-with-mesh-texture-color-painting-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%98%E5%88%B6%E7%BA%B9%E7%90%86%E5%88%86%E8%BE%A8%E7%8E%87)
-   [虚拟纹理网格体绘制项目设置](/documentation/zh-cn/unreal-engine/getting-started-with-mesh-texture-color-painting-in-unreal-engine#%E8%99%9A%E6%8B%9F%E7%BA%B9%E7%90%86%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%98%E5%88%B6%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
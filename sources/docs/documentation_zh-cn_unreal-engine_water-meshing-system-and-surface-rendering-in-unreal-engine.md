# 虚幻引擎中水体的网格系统及表面渲染 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/water-meshing-system-and-surface-rendering-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:18:32.995Z

---

目录

![水体的网格系统及表面渲染](https://dev.epicgames.com/community/api/documentation/image/57ec7eb2-9472-426a-a9df-1b311c3a18eb?resizing_type=fill&width=1920&height=335)

水系统由两个关键元素构成：可编辑的水面和水面材质。这两个元素确定了项目中的水如何表现，以及与所接触对象互动。这可以是非常简单，比如水材质如何将光反射和折射到与水面接触的对象上。对于Gameplay，这可以是角色在水中移动时如何让水面产生波浪，或者对象在水面上漂浮时的浮力有多大。

## 水面网格体

水系统有自己的基于样条线的网格体系统，可定义世界内应该包含水的区域。它使用 **Water Zone** 来修改关卡中所有 **水体Actor（Water Body Actors）**（江河、湖泊和海洋）的属性。水网格体主要定义了所渲染水面的质量和细节。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/523f47e2-0077-4eff-8a77-1a43b768e651/01-create-landscape.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/523f47e2-0077-4eff-8a77-1a43b768e651/01-create-landscape.png)

点击查看大图。

你必须将Water Zone放入场景中，以生成关卡中"水体（Water Body）"类型的表面。Water Zone本身并不会渲染表面。水体将使用样条线来定义关卡中表示江湖、湖泊和海洋的区域。这些样条线定义了Water Zone在何处绘制并渲染水网格体图块。这样做更高效，因为它仅渲染当前摄像机视图中可见的表面网格体。

Water Zone位于场景中时，将水体拖放到场景中可添加或移除表示水面的图块。由于所有水体使用相同的网格体来渲染水面，因此它们会无缝地混合在一起（见下）。这还意味着，你可以在不同类型的水面之间进行过渡，如从奔流的江河汇入平静的湖泊或汹涌的海洋。

使用控制台命令 `r.Water.WaterMesh.ShowWireframe 1` 启用水网格体线框视图，以查看不同水体之间的这些过渡如何相互作用，从而创建无缝的表面。

`r.Water.WaterMesh.ShowWireframe 0` disable.

## Water Zone

**Water Zone** 负责控制表面网格体的质量，该网格体构成放入关卡中的各个水体的图块。各个水体还对关卡中的大小设置了自己的硬性限制。它还提供了特定于海洋水体的额外选项。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f87757b5-ea67-4ed8-a873-2526b0b69f82/02-water-mesh-actor-details.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f87757b5-ea67-4ed8-a873-2526b0b69f82/02-water-mesh-actor-details.png)

点击查看大图。

在使用高度曲面细分的表面和大的范围时，这些设置可显著影响性能。

### 水网格体细节级别缩放和曲面细分

细节级别（LOD）或水网格体图块的处理方式是，每帧遍历一个四叉树，生成屏幕上可见图块的最优集合。接着，这些图块会针对每个细节级别尽可能折叠，在最重要的地方（即最接近当前摄像机视图的地方）应用更大或更小的密度。

每个细节级别由摄像机视图周围基于距离的同心圆构成，细节级别越低离摄像机越远，并且包含的顶点数是上一级别的一半。

若使用传统细节级别的几何结构（例如静态网格体），几何结构会基于屏幕大小在不同级别之间快速过渡，这可能导致网格体在不同级别之间切换时显示比较明显的过渡。由于水系统使用网格体图块来表示表面，随着细节级别的过渡，这些级别会彼此变入和变出，这样四个四叉树会在切换到更低的细节级别时变为单个四叉树，或在切换到更高的细节级别时变为16个四叉树（参阅下面的示例）。

![Quad grid morphing](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7bc1565-0f52-417a-a92a-d2dac7efd787/03-quad-grid-morphing.gif)

![Quad grid morphing example scene](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86c0733d-aa98-4576-b136-e9cc68543fce/04-quad-grid-morphing-example-scene.gif)

4x4四叉树网格变为2x2网格又变回来的示例。

《堡垒之夜》中的水LOD过渡示例。

水网格体Actor提供了功能按钮来显式定义网格体图块的细节级别和曲面细分量。其中每个属性都彼此独立地起作用，但应同时配置，以在水面的性能和质量之间实现良好的平衡。

每个同心细节级别的大小半径由 **LODScale** 属性控制。它设置与摄像机的距离，图块应从此距离开始变为更低的细节级别。

**曲面细分因子（Tessellation Factor）** 通过增加图块包含的顶点数，设置了对于放入关卡中的所有水体，你想要网格体图块拥有的质量程度。较高程度的曲面细分对湖泊和海洋水体最为有益，尤其是有波峰很大、波谷很低的波浪时。

设置这些属性时，请务必平衡以下各项内容：

-   高质量特写镜头，使玩家可看到更精细的细节
-   拉远距离后质量变低，但这对于玩家来说并不重要
-   曲面细分质量的性能成本

请记住，你的水材质也可能具备水系统不需要通过曲面细分处理的精细细节。

通过以下方法启用水图块的可视化：

-   在关卡视口中使用 **笔刷线框（Brush Wireframe）** 视图模式。如果你在场景中没有大量几何结构，或者只有可见的水网格体，这种方法非常适合。
-   使用控制台命令将水网格体渲染为线框：
    -   `r.Water.WaterMesh.ShowWireframe 1` 会将所有水网格体显示为线框。
    -   `r.Water.WaterMesh.ShowWireframeAtBaseHeight 1` 会将所有水网格体显示在其平底高度位置。

### 水网格体图块大小、范围和远距离

水网格体Actor提供了选项，用于定义构成关卡的水网格体的各个图块的大小，定义每个有多少图块，并且该Actor还处理海洋中水天相接处的长距离情况。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/674e7049-fe47-40f0-9717-f29374cdd7dc/05-water-mesh-tile-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/674e7049-fe47-40f0-9717-f29374cdd7dc/05-water-mesh-tile-settings.png)

点击查看大图。

**图块大小（Tile Size）** 属性设置了构成水网格体的各个图块的大小。这些是按默认世界单位测量的。提高/降低"图块大小（Tile Size）"会缩放构成关卡中的水网格体的所有图块。

![Graph gridtilesize](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5b0d25b-04d5-47d1-be6e-744bd95d6032/06-graph-gridtilesize.png "Graph gridtilesize")

![Graph gridtilesize example 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08c6fca3-d78a-4a90-b0b0-6e93f92a2682/07-graph-gridtilesize-example-1.png "Graph gridtilesize example 1")

![Graph gridtilesize example 2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2f95d1c-b0a1-470b-b9df-2ce31333aaf0/08-graph-gridtilesize-example-2.png "Graph gridtilesize example 2")

图块大小网格示例

水网格体图块大小：2400（默认大小）

水网格体图块大小：1000

**图块范围（Extent in Tiles）** 属性设置了构成水网格体的各个图块的数量。范围是针对XY轴从水网格体中心到边缘进行测量的。

![Graph grid tile extents](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13705483-7826-4314-af53-6cf878137058/09-graph-gridtileextents.png "Graph grid tile extents")

![Graph grid tile extents example 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d15d2d2-d7f7-4a4a-91a9-37deb080b784/10-graph-gridtileextents-example-1.png "Graph grid tile extents example 1")

![Graph grid tile extents example 2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c646b574-4963-4aba-8f4e-29633f739a6c/11-graph-gridtileextents-example-2.png "Graph grid tile extents example 2")

图块范围网格示例

图块范围：64（默认大小）

图块范围：32

**远距离（Far Distance）** 用于填充"图块范围（Extent in Tiles）"属性所用最远端图块与地平线之间的空间。这会添加一个低顶点水网格体，它会造成海洋水体图块无限延伸的错觉。

![Graph Far Distance](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8bcac391-4f13-442a-b2dd-21d928e94683/12-graph-fardistance.png "Graph Far Distance")

![Graph Far Distance example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a14e2a88-3140-429a-9795-5b26ee531e84/13-graph-fardistance-example.png "Graph Far Distance example")

远距离网格示例

远距离水网格体已启用

此远距离水网格体位于海洋水体基底高度位置正下方，因此它限制了剪辑片段操作，避免了可能变为可见的任何接缝。它还使用单独的材质，应该将其应用于水网格体Actor的 **远距离材质（Far Distance Material）** 指定槽。该材质可以很简单，实际上只需要匹配颜色，就可以创造从平铺水网格体无缝混合的效果。

使用 **远距离网格体范围（Far Distance Mesh Extent）** 属性可设置简化网格体延伸的距离（按世界单位计算）。

下面的场景示例使用了海洋水体，其中显示了水体如何从地面冒出来。注意，水体看起来并没有与地平线（左侧）相接。水网格体Actor的"远距离（Far Distance）"属性填充了这个缺口，同时在水体和远距离网格体之间创造了无缝的外观。

![水网格体Actor远距离：已禁用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcca9fd3-16be-4b38-a9d0-d31916f8c6b5/14-water-mesh-actor-far-distance-disabled.png "Water Mesh Actor Far Distance Disabled")

![水网格体Actor远距离：已启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4402f1a-ab32-4c11-8cb7-8987b10b9a61/15-water-mesh-actor-far-distance-enabled.png "Water Mesh Actor Far Distance Enabled")

水网格体Actor远距离：已禁用

水网格体Actor远距离：已启用

从空中看，高度曲面细分的水网格体终止的地方清晰可见。使用匹配颜色的远距离网格体时，它可以轻松填充场景，并减少性能影响，同时无缝匹配详细的水网格体。

![水网格体Actor远距离：已禁用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f1d4ff6-a109-4ce0-be03-e7654cff432b/16-water-mesh-actor-far-distance-disabled.png "Water Mesh Actor Far Distance Disabled")

![水网格体Actor远距离：已启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fbe911bd-17af-45d1-b6da-93fa89f1c0d7/17-water-mesh-actor-far-distance-enabled.png "Water Mesh Actor Far Distance Enabled")

水网格体Actor远距离：已禁用

水网格体Actor远距离：已启用

基底水材质有一种称为 **Water\_FarMesh** 的简化材质实例，在内容浏览器的 `Water Content/Materials/WaterSurface` 文件夹中可供使用。

## 水材质和水下后期处理

水系统使用多种不同类型的材质来处理水面渲染，以及不同类型水体之间的过渡，如江河流入海洋。水系统还使用后期处理材质来定义水面以下的外观。

每个水体都有一组材质指定槽，可用于重载预配置的默认水材质。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7754be6d-ef1f-47c4-95ca-5ffdd5655e36/18-under-water-post-process-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7754be6d-ef1f-47c4-95ca-5ffdd5655e36/18-under-water-post-process-settings.png)

点击查看大图。

### 水体Actor材质

江河、湖泊和海洋的水体全都使用相同的材质（`Water_Material`）作为基底。它包含特定于每种水体类型的一组开关和参数，这样单个源材质可以用于驱动所用的所有类型的水。将为每种水体类型（江河、湖泊、海洋）创建一个材质实例，并且每个实例会启用一个开关，用于确定对应于该水体类型的可用参数。此工作流程在每种水体类型材质之间维持一致的外观和设计。

在下面的图像中，你可以看到浮点值、RGBA颜色的参数，以及用于启用和禁用材质路径的开关是如何定义的。参数可通过子材质实例进行访问，其中可以覆盖父材质的参数，以更改材质的外观。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e6f3f4f-d152-421d-b396-dcdbc93ce4fe/19-water-basematerial.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e6f3f4f-d152-421d-b396-dcdbc93ce4fe/19-water-basematerial.png)

点击查看大图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6270ca9e-da0e-445d-b2f6-93ee466a38cd/20-water-material-instance.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6270ca9e-da0e-445d-b2f6-93ee466a38cd/20-water-material-instance.png)

点击查看大图。

带有开关和参数的基底材质

使用重载开关和参数的材质实例

点击查看大图。

对于使用湖泊、海洋或江河材质的水体类型，大部分材质参数类似。但江河材质是一个例外。江河材质包含其他水体材质所不具备的特定参数，如速度、流量控制、密度等等。但是，江河水体没有波浪的参数，而海洋和湖泊却有此参数。

在内容浏览器中打开 `Water Content/Materials/WaterSurface` 文件夹，探索每种不同的水体类型材质实例。

### 江河水体材质过渡

江河水体允许水沿着不同位置之间的样条线流动，并且可以源自湖泊、海洋、江河或其任意组合。与湖泊和海洋不同，江河有大致的水流方向。它可以从湖泊流入海洋或另一个湖泊，甚至可以沿途与另一条江河合流。

由于江河有不同于湖泊和海洋的一组属性（即，江河不会产生波浪），因此江河使用过渡性材质从 **江河到湖泊** 和 **江河到海洋** 过渡无缝混合。江河水体具有与湖泊和海洋水体相同的图块网格体，因此过渡性材质就能够很好地融合到所接触到的任何其他水体的表面。

过渡性材质是江河水体的默认材质实例。要让关卡中的水有一致的外观，唯一需要的设置是，手动将其颜色匹配到所使用的任何其他湖泊、海洋（和江河（水体材质。

在下面的简单场景示例中，使用了一个地块，在中心包含湖泊水体，围绕岛屿的是海洋水体，连接两者的是江河水体。过渡性材质处理了水开始从湖泊流入江河，再从江河过渡到海洋的过程。每种水体和过渡材质都匹配了颜色，以保证一致。

![Water body river transitions](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83f60580-02fe-4649-86dc-f4c5ff0c0f85/waterbody_rivertransitions.gif "Water body river transitions")

## 水下后期处理

视你的项目而定，有必要确定水如何从水面上方过渡到下方。水系统使用后期处理来处理这个方面。

每个水体都指定了 **水下后期处理材质（Underwater Post Process Material）**，以使用[后期处理材质](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine)驱动穿过水面的过渡。摄像机位于给定水体边界之内，沉没到水面以下时，会自动进行水下后期处理。后期处理材质还会屏蔽掉场景中不在水下的部分来创建部分水下的视图，从而处理进入和离开水面的过渡。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/465cffa6-e33e-4910-911f-3de788dc2e61/22-water-underwater-post-processing.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/465cffa6-e33e-4910-911f-3de788dc2e61/22-water-underwater-post-processing.png)

点击查看大图。

每种水体的 **细节（Details）** 面板包含Actor的特定设置，并且可在其中访问 **后期处理设置（Post Processing Settings）**，进一步调整水下的外观，无需打开并手动配置材质属性。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3cd7019-a0f0-4e02-a17c-27b327ebcf38/23-water-under-water-post-processing-material-slot.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3cd7019-a0f0-4e02-a17c-27b327ebcf38/23-water-under-water-post-processing-material-slot.png)

点击查看大图。

出于优化目的，仅当摄像机在水面以下或略微露出水面之上时，才会进行水下后期处理。这是为了考虑湖泊和海洋的情况，其中波峰和波谷可能会导致摄像机完全或部分沉没水下。需要启用 **生成碰撞（Generate Collision）**，才能进行此水下后期处理。

此外，水体图块网格体能够使用江河水体的过渡性材质无缝混合。但是，如果水下后期处理的外观在两种水体之间差异显著（例如，从清澈的江河流入浑浊的湖泊），那么随着摄像机在两种后期处理体积之间移动，会显示一种硬过渡。

### 单层水材质着色模型

**单层水（Single Layer Water）** 着色模型可用于所有默认水材质，因为它能使用单厚度层提供一种经济高效的半透明方法。这种基于物理原理的着色模型支持水面上恰当的光散射、吸收、反射和折射以及阴影投射。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14bf868a-30f4-4873-b624-aa8c58a7d3cf/24-water-single-layer-water-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14bf868a-30f4-4873-b624-aa8c58a7d3cf/24-water-single-layer-water-material.png)

点击查看大图。

指定给水体的所有默认水材质都使用"单层水（Single Layer Water）"着色模型。任何着色模型都可以用于水体。

要获取有关此着色模型的更多信息，请参阅[单层水着色模型](/documentation/zh-cn/unreal-engine/single-layer-water-shading-model-in-unreal-engine)。

### 创建自己的水材质

你可以创建自己的水材质来配合水系统使用，因此你不必专门使用指定给每种水体的默认水材质。

设置自己的材质时，请记住以下几点：

-   水体支持使用任何类型的着色模型的水材质。
-   材质需要启用 **用于水（Used with Water）** 的 **用法标记（Usage Flag）**。每当将材质指定给不同类型的Actor时，此标记应该会自动启用，并且该材质将重新编译。如果不是这种情况，材质未正确渲染，请检查此标记是否已启用。
-   **SingleLayerWater** 着色模型可提供半透明和照明结果，成本以比传统半透明材质更低。

-   [water](https://dev.epicgames.com/community/search?query=water)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [level editing](https://dev.epicgames.com/community/search?query=level%20editing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [水面网格体](/documentation/zh-cn/unreal-engine/water-meshing-system-and-surface-rendering-in-unreal-engine#%E6%B0%B4%E9%9D%A2%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [Water Zone](/documentation/zh-cn/unreal-engine/water-meshing-system-and-surface-rendering-in-unreal-engine#waterzone)
-   [水网格体细节级别缩放和曲面细分](/documentation/zh-cn/unreal-engine/water-meshing-system-and-surface-rendering-in-unreal-engine#%E6%B0%B4%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%86%E8%8A%82%E7%BA%A7%E5%88%AB%E7%BC%A9%E6%94%BE%E5%92%8C%E6%9B%B2%E9%9D%A2%E7%BB%86%E5%88%86)
-   [水网格体图块大小、范围和远距离](/documentation/zh-cn/unreal-engine/water-meshing-system-and-surface-rendering-in-unreal-engine#%E6%B0%B4%E7%BD%91%E6%A0%BC%E4%BD%93%E5%9B%BE%E5%9D%97%E5%A4%A7%E5%B0%8F%E3%80%81%E8%8C%83%E5%9B%B4%E5%92%8C%E8%BF%9C%E8%B7%9D%E7%A6%BB)
-   [水材质和水下后期处理](/documentation/zh-cn/unreal-engine/water-meshing-system-and-surface-rendering-in-unreal-engine#%E6%B0%B4%E6%9D%90%E8%B4%A8%E5%92%8C%E6%B0%B4%E4%B8%8B%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86)
-   [水体Actor材质](/documentation/zh-cn/unreal-engine/water-meshing-system-and-surface-rendering-in-unreal-engine#%E6%B0%B4%E4%BD%93actor%E6%9D%90%E8%B4%A8)
-   [江河水体材质过渡](/documentation/zh-cn/unreal-engine/water-meshing-system-and-surface-rendering-in-unreal-engine#%E6%B1%9F%E6%B2%B3%E6%B0%B4%E4%BD%93%E6%9D%90%E8%B4%A8%E8%BF%87%E6%B8%A1)
-   [水下后期处理](/documentation/zh-cn/unreal-engine/water-meshing-system-and-surface-rendering-in-unreal-engine#%E6%B0%B4%E4%B8%8B%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86)
-   [单层水材质着色模型](/documentation/zh-cn/unreal-engine/water-meshing-system-and-surface-rendering-in-unreal-engine#%E5%8D%95%E5%B1%82%E6%B0%B4%E6%9D%90%E8%B4%A8%E7%9D%80%E8%89%B2%E6%A8%A1%E5%9E%8B)
-   [创建自己的水材质](/documentation/zh-cn/unreal-engine/water-meshing-system-and-surface-rendering-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84%E6%B0%B4%E6%9D%90%E8%B4%A8)

相关文档

[

单层水着色模型

![单层水着色模型](https://dev.epicgames.com/community/api/documentation/image/649721d3-d726-4114-b983-ae0e38c5d0ee?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/single-layer-water-shading-model-in-unreal-engine)
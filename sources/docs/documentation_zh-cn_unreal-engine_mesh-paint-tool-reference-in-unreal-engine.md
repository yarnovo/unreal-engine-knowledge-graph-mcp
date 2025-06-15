# 虚幻引擎中的网格体绘制工具参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mesh-paint-tool-reference-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:19:24.380Z

---

目录

本页面介绍了各种网格体绘制模式的可用工具和设置。

## 网格体绘制模式工具

每种网格体绘制模式都包含一组工具，用于帮助你绘制网格体并管理网格体的颜色数据。大多数工具在不同的绘画模式中是通用的，但有些工具是选定绘制模式所独有的。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d1100dc-1c41-437f-a2de-053d00b4ba71/mp-settings-toolsbar.png)

下表列出了各种网格体绘制模式的所有可用工具以及工具在哪些模式下可用。

工具

说明

顶点颜色

顶点权重

纹理颜色

纹理

**选择（Select）**

用于选择要绘制的网格体。

Y

Y

Y

Y

**绘制（Paint）**

用于启用网格体绘制工具设置。

Y

Y

Y

Y

**切换（Swap）**

切换用于网格体绘制的绘制颜色和擦除颜色。或者，你可以使用设置中绘制颜色（Paint Color）旁边的图标。

Y

N

Y

Y

**填充（Fill）**

填充使用绘制颜色绘制的网格体或实例，遵循通道设置。

Y

Y

Y

Y

**至LOD（To LODs）**

将LOD0中的顶点颜色应用于所有LOD级别。

Y

Y

N

N

**至网格体（To Mesh）**

将实例上的顶点颜色传播到源网格体。

Y

Y

N

N

**保存（Save）**

这将保存所选网格体实例的任何已修改源网格体或纹理。

Y

Y

Y

Y

**新增（Add）**

将新的网格体绘制纹理添加到选定的网格体实例。

N

N

Y

N

**删除（Remove）**

对于顶点绘制工具，此项可用于从选定的网格体实例中删除顶点颜色。对于纹理颜色绘制工具，此项可用于从选定的网格体实例中删除网格体绘制纹理。

Y

Y

Y

N

**复制（Copy）**

将绘制颜色从选定的网格体实例复制到复制缓冲区，然后再粘贴到另一个网格体实例上。

Y

Y

Y

N

**粘贴（Paste）**

将复制的颜色粘贴到选定的网格体实例上。

Y

Y

Y

N

**导入（Import）**

导入TGA图像文件，以填充所选实例的顶点颜色。

Y

Y

N

N

**自纹理（From Textures）**

导入当前网格体绘制纹理颜色，以填充所选实例的顶点颜色。

Y

N

N

N

**自顶点（From Vertex）**

导入当前顶点颜色，以填充所选实例的网格体绘制纹理。顶点颜色始终取自LOD0。

N

N

Y

N

**修复（Fix）**

对于顶点绘制工具，此项可用于修复应用于所选网格体的顶点颜色。对于纹理颜色绘制工具，此项可用于调整网格体绘制纹理的大小，以匹配当前请求的纹理大小。在两种情况下，仅当有工作要做时才会启用修复（Fix）工具。

Y

Y

Y

N

## 网格体绘制工具设置

网格体绘制工具包括控制绘制颜色如何在网格体上发挥作用的设置。有些设置是其网格体绘制方法所独有的，而其他设置则是通用的。

当选择 \*绘制（Paint）\*\* 工具时，所有设置在网格体绘制（Mesh Paint）面板中可用。

### 资源使用设置

**资源使用（Resource Usage）** 类别显示有关当前选定网格体的数据和纹理大小的信息。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa9e614d-c711-4736-82ed-e9748d6b99f1/mp-settings-resourceusage.png)

设置

说明

**实例化顶点颜色大小（Instanced vertex color size）**

对于使用绘制顶点颜色的网格体，此设置将显示顶点颜色数据使用的内存字节数。该值反映当前选定的所有实例的总颜色数据。

**网格体绘制纹理资源大小（Mesh paint texture resource size）**

对于使用绘制纹理颜色的网格体，这将显示纹理资源的大小，以字节为单位。此值反映当前选定的所有实例的总纹理数据。

对于纹理颜色，网格体绘制纹理资源大小并非暂存包中的最终大小，因为它没有考虑项目中所有纹理的打包压缩。同样，也不是内存中的大小，因为此模式使用的是虚拟纹理，具有由共享虚拟纹理池定义的固定内存成本开销。

### 可视化设置

**可视化（Visualization）** 类别包括 \*颜色视图模式（Color View Mode）\*\* ，用于查看如何在关卡视口中将颜色应用于网格体。使用此选项，你可以选择查看RGB、Alpha或单个颜色通道。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76d806fa-2dc7-4020-9291-90b24edcfddc/mp-settings-colorviewsettings.png)

**颜色视图模式（Color View Mode）** 属性在其下拉列表中包含以下可视化选项：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5cbf51d2-ecb4-4f28-a063-06370999e8e2/mp-settings-colorviewmode.png)

设置

说明

**关闭（Off）**

恢复默认编辑器视图模式。

**RGB通道（RGB Channels）**

该选项显示无光照选定网格体，具有各自的绘制RGB颜色。

**Alpha通道（Alpha Channel）**

该选项显示无光照选定网格体，仅显示绘制的Alpha值。

**红色通道（Red Channel）**

该选项显示无光照选定网格体，仅显示绘制的红色通道。

**绿色通道（Green Channel）**

该选项显示无光照选定网格体，仅显示绘制的绿色通道。

**蓝色通道（Blue Channel）**

该选项显示无光照选定网格体，仅显示绘制的蓝色通道。

### 颜色和权重绘制设置

**颜色绘制（Color Painting）** 和 **权重绘制（Weight Painting）** 类别具有特定于网格体绘制方法的设置。

用于 **顶点颜色（Vertex Color）** 、 **纹理颜色（Texture Color）** 和 **纹理（Textures）** 的网格体绘制方法在 **颜色绘制（Color Painting）** 类别下具有相似的属性，用于绘制和擦除颜色以及指定颜色绘制效果的通道。

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d29f162-0442-4fba-9e28-4183bfdfaffc/mp-settings-vertexcolorsettings.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b4bcdc3-711f-404d-a0f7-0f94554de1bd/mp-settings-texturecolorsettings.png)

顶点颜色和纹理绘制设置

纹理颜色设置

设置

说明

顶点颜色

纹理颜色

纹理

**绘制颜色（Paint Color）**

选择绘制时应用的颜色。色条显示当前选定颜色的预览。点击色条可打开取色器，选择其他颜色。你还可以扩展此属性并直接将颜色值输入为R、G、B和A值。

Y

Y

Y

**擦除颜色（Erase Color）**

选择绘制时用作"橡皮擦"的颜色。事实上，这不会擦除绘制颜色留下的先前颜色。相反，最好将其视为可以切换的辅助绘制颜色。色条显示当前选定颜色的预览。点击色条可打开取色器，选择其他颜色。你还可以扩展此属性并直接将颜色值输入为R、G、B和A值。

Y

Y

Y

**通道（Channels）**

颜色通道复选框设置受绘制笔刷影响的颜色/Alpha通道。

Y

Y

Y

**传播到顶点颜色（Propagate to Vertex Color）**

是否将所有纹理颜色绘制复制到顶点颜色。

N

Y

N

用于 **顶点权重（Vertex Weights）** 的网格体绘制方法在 **权重绘制（Weight Painting）** 类别下具有属性，这些属性设置了纹理绘制应如何根据绘制权重在目标层之间进行混合。此设置需要为正在绘制的网格体设置[纹理混合材质](/documentation/zh-cn/unreal-engine/setting-up-a-texture-blended-material-for-vertex-weights-painting-in-unreal-engine)。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/165c5a59-7060-43c8-9e66-5a9addc64138/mp-settings-weightpainting.png)

设置

说明

**纹理权重类型（Texture Weight Type）**

通过设置在分配给网格体的材质中混合的纹理数量，此项可用于配置此网格体的混合权重"策略"。更改此选项时，可用于绘制纹理（Paint Texture）和擦除纹理（Erase Texture）的选项将更新。每个可选选项需要不同类型的材质，方可正常使用。你可以从以下选项中选择：

-   Alpha（双纹理）
-   RGB（三纹理）
-   ARGB（四纹理）
-   ARGB - 1（五纹理）

请参阅下面的[绘制纹理权重](/documentation/zh-cn/unreal-engine/mesh-paint-tool-reference-in-unreal-engine#%E7%BB%98%E5%88%B6%E7%BA%B9%E7%90%86%E6%9D%83%E9%87%8D)小节。

**绘制纹理权重索引（Paint Texture Weight Index）**

绘制过程中应用时将使用的纹理混合权重索引。你只能根据所选的纹理权重类型选择选项。选择类型中不可用的其他选项将灰显。

**擦除纹理权重指数（Erase Texture Weight Index）**

绘制期间擦除时将使用的纹理混合权重指数。你只能根据所选的纹理权重类型选择选项。选择类型中不可用的其他选项将灰显。

#### 绘制纹理权重

绘制纹理权重时，你所绘制的网格体必须指定材质，该材质被设置为针对不同层混合纹理。此材质将设置多个纹理，以便可以绘制和擦除每个图层，显示网格体上的纹理部分。例如，想象一下在泥路材质上绘制水坑。

要使用此工作流程，你需要执行以下操作：

1.  设置[用于网格体绘制的纹理混合材质](/documentation/zh-cn/unreal-engine/setting-up-a-texture-blended-material-for-vertex-weights-painting-in-unreal-engine)。
2.  选择与网格体绘制工具混合的纹理数量相匹配的 **纹理权重类型（Texture Weight Type）** 。
3.  使20250209用 **绘制纹理权重索引（Paint Texture Weight Index）** 和 **擦除纹理权重索引（Erase Texture Weight Index）** 绘制到特定图层。此选择基于可用于混合的图层数量的纹理权重类型。

**纹理权重类型（Texture Weight Type）** 包括以下用于混合绘制图层的选项：

选择选项

说明

**Alpha（双纹理）（Alpha (Two Textures)）**

提供两个纹理通道，通过绘制Alpha控制。这意味着，材质将仅使用Alpha值0（黑色）和1（白色）进行混合。此设置要求网格体应用双向Alpha插值混合材质。

**RGB（三纹理）（RGB (Three Textures)）**

提供三个纹理通道，通过绘制RGB值控制。这意味着材质将仅使用RGB值来混合纹理。此设置要求网格体应用三向插值混合材质。

**ARGB（四纹理）（ARGB (Four Textures)）**

提供四个纹理通道，通过绘制ARGB值控制。这意味着材质将仅使用RGB值以及Alpha来混合纹理。此设置要求网格体应用四向插值混合材质。

**ARGB - 1（五纹理）（ARGB - 1 (Five Textures)）**

提供五个纹理通道，通过绘制ARGB值控制。这意味着材质将仅使用RGB值以及Alpha来混合前四个纹理。在内部用1减去alpha，计算得出用于混合的第五个通道。此设置要求网格体应用五向插值混合材质。

### 笔刷设置

网格体绘制工具是一种基于笔刷的系统。**笔刷（Brush）** 类别包括 **绘制（Paint）** 工具下针对所选网格体绘制方法的设置。这些设置确定了专为大面积或精细细节设计的笔刷。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5b0897f-4d9b-4d3f-ad24-f93f962fe118/mp-settings-brushsettings.png)

笔刷设置包括以下内容：

设置

说明

**大小（Size）**

设置笔刷的大小。大小根据正在绘制的实例的大小采用规格化单位。你可以按CTRL + 左方括号(\[)缩小笔刷，按CTRL + 右方括号(\])增大笔刷。

**强度（Strength）**

设置在启用绘制的情况下，每次点击或移动鼠标光标时要应用的绘制量。如果勾选 **启用笔刷流量（Enable Brush Flow）** ，将对表面应用笔刷强度的某个百分比（流量）。

**衰减（Falloff）**

设置笔刷的强度如何随距离衰减。衰减值1.0表示笔刷中心的强度为100%，朝笔刷半径方向线性衰减。衰减值0.5表示笔刷在半径的一半距离处强度为100%，然后线性衰减。衰减值0.0表示笔刷在整个半径范围内强度都为100%。

无论此设置如何，笔刷将随深度而衰减，等于其半径的一半，且始终处于激活状态。

**启用笔刷流量（Enable Brush Flow）**

勾选此框后，此设置可将置笔刷配置为每个渲染帧都应用绘制，即使未移动光标。这会产生类似于喷枪的结果。

**忽略背向（Ignore Back-Facing）**

勾选此框后，此设置将忽略背向摄像机的三角形。这些三角形不会受到绘制笔刷的影响。

高级（Advanced）

 

**指定半径（Specify Radius）**

勾选此框后，将使用 **半径（Radius）** 值而不是 **大小（Size）** 值来设置用于绘制的笔刷大小。

**半径（Radius）**

用虚幻单位设置笔刷的径向大小。

### 顶点和纹理绘制设置

**顶点绘制（Vertex Painting）** 和 **纹理绘制（Texture Painting）** 类别中有些设置可影响如何与顶点颜色数据共享颜色数据，以及在使用网格体绘制方法时访问纹理资产属性。

**顶点颜色（Vertex Color）** 和 **顶点权重（Vertex Weights）** 网格体绘制方法在其 **顶点绘制（Vertex Painting）** 类别下有附加设置。这些设置使得处理网格上的多个细节级别（LOD）以及具有不同顶点密度的网格体变得更加简单。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be670cff-e82a-4485-86d6-6158d256027b/mp-settings-vertexpainting.png)

设置

说明

**LOD模型绘制（LOD Model Painting）**

这是要应用顶点颜色绘制的特定细节级别（LOD）。默认设置是绘制所有细节级别。

**顶点预览大小（Vertex Preview Size）**

这是网格体绘制处于激活状态时所绘制顶点的大小。当网格体具有高密度顶点时，这可以用于调整顶点的大小。

**纹理颜色（Texture Color）** 和 **纹理（Textures）** 绘制模式的设置位于"纹理绘制（Texture Painting）"类别下。这些设置在纹理资产（而非网格体的顶点）上绘制，以应用颜色数据。

**纹理颜色（Texture Color）** 绘制模式将创建网格体绘制纹理资产，用于存储绘制颜色信息。**纹理（Textures）** 绘制模式会将绘制笔划直接应用于纹理，以及特定于指定网格体及其可用纹理的其他纹理属性。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc087f35-9c52-4a48-b842-2574ce8ce72e/mp-settings-texturepainting1.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/275f0f0b-2f1a-4bfb-b789-aa8201774ee7/mp-settings-texturepainting2.png)

纹理颜色设置

纹理设置

纹理绘制类别具有以下设置：

设置

说明

纹理颜色

纹理

**UV通道（UV Channel）**

将用于绘制的纹理的所选Actor的UV通道。

N

Y

**绘制纹理（Paint Texture）**

此色条显示要应用绘制的纹理。要更改纹理，请点击色条右侧的名称（Name）字段。

N

Y

**启用接缝绘制（Enable Seam Painting）**

如果勾选此框，将使用膨胀来允许绘制纹理接缝。

Y

Y

**绘制笔刷（Paint Brush）**

如果在此处设置了纹理，将用作用于绘制的笔刷形状，取代默认的圆形笔刷形状。

Y

Y

**点笔刷旋转（Point Brush Rotation）**

应用于任何绘制笔刷形状的初始旋转。

Y

Y

**沿方向旋转笔刷（Rotate Brush Towards Direction）**

如果勾选此框，任何绘制笔刷形状都将朝着绘制方向连续旋转。

Y

Y

## 网格体纹理颜色绘制设置

以下设置特定于 **纹理颜色（Texture Color）** 绘制模式及其网格体绘制纹理的使用。

要详细了解纹理颜色数据及其网格体绘制纹理的用法，请参阅[网格体纹理颜色绘制快速入门](/documentation/zh-cn/unreal-engine/getting-started-with-mesh-texture-color-painting-in-unreal-engine)。

### 静态网格体编辑器设置

静态网格体编辑器包含以下特定于纹理颜色模式及其网格体绘制纹理的设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0fb3b8a-15d2-4e88-898c-7a2e1d4917a9/mp-settings-staticmesheditorsettings.png)

属性

说明

**支持纹理颜色网格体绘制（Support Texture Color Mesh Painting）**

该网格体是否可以使用纹理颜色绘制：

-   **默认值（Default）** ：该网格体使用引擎 - 渲染项目设置中的 **网格体绘制默认静态网格体支持（Mesh paint default static mesh support）** 设置。
-   **启用（Enabled）** ：该网格体可以使用绘制的纹理颜色数据。
-   **禁用（Disabled）** ：该网格体不能使用绘制的纹理颜色数据。

**网格体绘制纹理坐标索引（Mesh Paint Texture Coordinate Index）**

在此网格体上绘制纹理颜色时使用的默认UV坐标索引。此项还应设置为与此网格体所用材质中的Texture Sample节点上的该值匹配。

**网格体绘制纹理分辨率（Mesh Paint Texture Resolution）**

此网格体上纹理颜色网格体绘制纹理的分辨率。最终大小四舍五入为2的幂和"网格体绘制纹理大小（Mesh Paint Texture Size）"项目设置的倍数。采用默认值0时，将自动使用每顶点网格体绘制纹素（Mesh Paint Texels Per Vertex）项目设置计算大小。

### 静态网格体组件设置

静态网格体组件包含以下与纹理颜色绘制模式相关的属性。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e88dd64b-5373-4c8c-9906-ef6baeecd531/mp-settings-staticmeshcomponents.png)

属性

说明

**启用顶点颜色网格体绘制（Enable Vertex Color Mesh Painting）**

如果为false，则此组件上的顶点颜色网格体绘制将被禁用。请注意，蓝图函数可能会将其设置为false，这些函数会在构造脚本中重载顶点颜色。

**启用纹理颜色网格体绘制（Enable Texture Color Mesh Painting）**

如果为false，则此组件上的纹理颜色网格体绘制将被禁用。

**网格体绘制纹理（Mesh Paint Texture）**

包含此网格体组件的纹理颜色网格体绘制的纹理。

**重载网格体绘制纹理坐标索引（Overridden Mesh Paint Texture Coordinate Index）**

在此组件上绘制纹理颜色时使用的重载UV坐标索引。

**重载网格体绘制纹理分辨率（Overridden Mesh Paint Texture Resolution）**

此组件上纹理颜色网格体绘制纹理的重载分辨率。

### 虚拟纹理网格体绘制项目设置

**纹理颜色（Texture Color）** 网格体绘制方法将为正在绘制的网格体实例创建网格体绘制纹理资产。网格体绘制纹理始终为虚拟纹理，具有自己的项目设置，设置可以在 **引擎（Engine） - 渲染（Rendering）** 类别下找到。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/627c25ab-70d0-40b3-9a45-47e32ce2ed76/mp-settings-virtualtextures.png)

项目设置具有以下与网格体绘制相关的虚拟纹理设置：

属性

说明

**网格体绘制图块大小（Mesh paint tile size）**

网格体绘制虚拟纹理图块的像素大小。该值未输入时，将四舍五入为下一个2的幂。

**网格体绘制图块边框大小（Mesh paint tile border size）**

虚拟纹理图块边框的像素大小。该值未输入时，将四舍五入为下一个2的倍数。

**网格体绘制使用压缩纹理（Mesh paint use compressed textures）**

是否使用压缩纹理格式存储网格体绘制纹理。

**网格体绘制默认静态网格体支持（Mesh paint default static mesh support）**

静态网格体资产是否支持网格体绘制纹理的默认设置。这可以针对单个实例在静态网格体组件上重载。

**每顶点的网格体绘制纹素（Mesh paint texels per vertex）**

为网格体创建网格体绘制纹理时，纹素与顶点的默认比率。

**网格体绘制最大纹理大小（Mesh paint maximum texture size）**

网格体绘制虚拟纹理的最大像素大小。该值未输入时，将四舍五入为下一个2的幂。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [reference](https://dev.epicgames.com/community/search?query=reference)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [mesh paint tool](https://dev.epicgames.com/community/search?query=mesh%20paint%20tool)
-   [vertex color](https://dev.epicgames.com/community/search?query=vertex%20color)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [网格体绘制模式工具](/documentation/zh-cn/unreal-engine/mesh-paint-tool-reference-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%98%E5%88%B6%E6%A8%A1%E5%BC%8F%E5%B7%A5%E5%85%B7)
-   [网格体绘制工具设置](/documentation/zh-cn/unreal-engine/mesh-paint-tool-reference-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%98%E5%88%B6%E5%B7%A5%E5%85%B7%E8%AE%BE%E7%BD%AE)
-   [资源使用设置](/documentation/zh-cn/unreal-engine/mesh-paint-tool-reference-in-unreal-engine#%E8%B5%84%E6%BA%90%E4%BD%BF%E7%94%A8%E8%AE%BE%E7%BD%AE)
-   [可视化设置](/documentation/zh-cn/unreal-engine/mesh-paint-tool-reference-in-unreal-engine#%E5%8F%AF%E8%A7%86%E5%8C%96%E8%AE%BE%E7%BD%AE)
-   [颜色和权重绘制设置](/documentation/zh-cn/unreal-engine/mesh-paint-tool-reference-in-unreal-engine#%E9%A2%9C%E8%89%B2%E5%92%8C%E6%9D%83%E9%87%8D%E7%BB%98%E5%88%B6%E8%AE%BE%E7%BD%AE)
-   [绘制纹理权重](/documentation/zh-cn/unreal-engine/mesh-paint-tool-reference-in-unreal-engine#%E7%BB%98%E5%88%B6%E7%BA%B9%E7%90%86%E6%9D%83%E9%87%8D)
-   [笔刷设置](/documentation/zh-cn/unreal-engine/mesh-paint-tool-reference-in-unreal-engine#%E7%AC%94%E5%88%B7%E8%AE%BE%E7%BD%AE)
-   [顶点和纹理绘制设置](/documentation/zh-cn/unreal-engine/mesh-paint-tool-reference-in-unreal-engine#%E9%A1%B6%E7%82%B9%E5%92%8C%E7%BA%B9%E7%90%86%E7%BB%98%E5%88%B6%E8%AE%BE%E7%BD%AE)
-   [网格体纹理颜色绘制设置](/documentation/zh-cn/unreal-engine/mesh-paint-tool-reference-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BA%B9%E7%90%86%E9%A2%9C%E8%89%B2%E7%BB%98%E5%88%B6%E8%AE%BE%E7%BD%AE)
-   [静态网格体编辑器设置](/documentation/zh-cn/unreal-engine/mesh-paint-tool-reference-in-unreal-engine#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BC%96%E8%BE%91%E5%99%A8%E8%AE%BE%E7%BD%AE)
-   [静态网格体组件设置](/documentation/zh-cn/unreal-engine/mesh-paint-tool-reference-in-unreal-engine#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%84%E4%BB%B6%E8%AE%BE%E7%BD%AE)
-   [虚拟纹理网格体绘制项目设置](/documentation/zh-cn/unreal-engine/mesh-paint-tool-reference-in-unreal-engine#%E8%99%9A%E6%8B%9F%E7%BA%B9%E7%90%86%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%98%E5%88%B6%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
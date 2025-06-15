# 虚幻引擎中的UV类别 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:08:02.528Z

---

目录

![UV类别](https://dev.epicgames.com/community/api/documentation/image/ad6aba5f-cf28-4e23-965a-0762664af828?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

建模之后的一个重要步骤是创建UV，以便在网格体上准确放置纹理。**建模模式（Modeling Mode）** 中的 **UV** 类别为基于 **关卡（Level）** 的UV编辑提供了工具。关卡中的UV编辑有助于将模型UV与其所在环境进行对比，从而确定其上下文。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b6035fe-108f-4407-ae28-27c7f3d49c73/uv-tools.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b6035fe-108f-4407-ae28-27c7f3d49c73/uv-tools.png)

点击查看大图。

此工作流程存在限制，你可能会发现，使用[UV编辑器](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#uv%E7%BC%96%E8%BE%91%E5%99%A8)实现所需的UV贴图更合适。

## 理解关键概念

了解工具之前，我们建议你先熟悉常见术语。

### UV

UV是3D表面网格体到规格化(0-1) 2D空间的参数化(U,V)。换句话说，它们表示2D空间中的坐标，且可以被转换为3D模型上的顶点。

![UV坐标转换为3D模型上的顶点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0aa574be-d81a-428b-9c43-6ac5ab20dfc5/uv-coordinates.gif)

2D空间在水平方向表示为U，垂直方向表示为V，因此取名为UV坐标（也称为2D或纹理坐标）。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cdc1e65d-9137-496c-8711-e1b1f3e92c62/uv-grid.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cdc1e65d-9137-496c-8711-e1b1f3e92c62/uv-grid.png)

点击查看大图。

### UV贴图

UV岛状区及其布局的集合称为UV贴图。UV贴图将确定纹理在渲染时如何封装你的3D几何体，这一纹理封装过程称为UV贴图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51a3e729-596b-4018-8ea6-a8ab40c0fb07/uv-map.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51a3e729-596b-4018-8ea6-a8ab40c0fb07/uv-map.png)

点击查看大图。

材质会使用2D坐标和3D顶点位置之间的映射，来确定将纹理的哪些区域用于对3D模型中的哪些三角形着色。

### UV岛状区

UV岛状区也称为图表，是边缘的给定边界中相连三角形的统称。但是，一个三角形可以表示一个岛状区。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b446968c-5220-4b11-a91f-4a24e26bfd38/uv-island.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b446968c-5220-4b11-a91f-4a24e26bfd38/uv-island.png)

点击查看大图。

### UDIM

传统UV贴图在0-1[单位正方形](/documentation/zh-cn/unreal-engine/uv-editor-in-unreal-engine#2d%E8%A7%86%E5%8F%A3)中创建。由于纹理空间存在这种局限性，要创建高效的纹理可能很困难。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73cf5dd6-b38a-4cc3-9e25-50631a5f58a5/uv-unit-square.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73cf5dd6-b38a-4cc3-9e25-50631a5f58a5/uv-unit-square.png)

点击查看大图。

利用UDIM，可以通过使用额外的单位正方形，为单个模型管理多个分辨率。你可能需要模型的特定部分有一个1k纹理，而其他部分则使用一个4k纹理。此外，你还可以为不同部分选择多个较低分辨率的纹理，以累积为高分辨率图像。在不同纹理区域使用不同分辨率，有助于为模型实现合适的纹素密度。

UDIM的全称是U-Dimension，表示将固定数量的单位正方形（或UDIM图块）用于纹理的方向，然后它们沿V方向上移，并重复该过程。相较于传统电子游戏开发，UDIM在视觉特效处理行业中运用得更加频繁。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0384d105-0881-4274-ae99-efb6b00a461d/uv-udim.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0384d105-0881-4274-ae99-efb6b00a461d/uv-udim.png)

点击查看大图。

对于UDIM创建和管理，你需要使用UV编辑器。

## 常见功能

一些工具有相同的设置，我们在下面进行说明。

### UV通道

**UV通道（UV Channel）** 包含你的UV贴图。你可以使用UV通道为一个模型创建多个UV贴图。

利用UV通道，可以在网格体上分层叠放纹理，并存储烘焙的光源等数据。你可以使用以下工具创建和管理通道：

-   UV编辑器的 **通道（Channel）** 工具
-   **静态网格体编辑器（Static Mesh Editor）**
-   在建模模式下， **属性（Attributes）** 类别下的 **AttrEd** 工具

UV编辑器提供了添加、删除、复制通道的功能。

如需详细了解UV通道，请参阅[将UV通道用于静态网格体](/documentation/zh-cn/unreal-engine/using-uv-channels-with-static-meshes-in-unreal-engine)文档。

### 多边形组层

你可以决定基于几何体的 **多边形组（PolyGroups）** 约束UV的排列。

你可以通过[GrpGen](/documentation/zh-cn/unreal-engine/understanding-polygroups-in-unreal-engine#%E5%A4%9A%E8%BE%B9%E5%BD%A2%E7%BB%84%E7%94%9F%E6%88%90%E5%B7%A5%E5%85%B7)和[GrpPnt](/documentation/zh-cn/unreal-engine/understanding-polygroups-in-unreal-engine#%E5%A4%9A%E8%BE%B9%E5%BD%A2%E7%BB%84%E7%BB%98%E5%88%B6%E5%B7%A5%E5%85%B7)等工具创建和管理多边形组。如需详细了解多边形组，请参阅[理解多边形组](/documentation/zh-cn/unreal-engine/understanding-polygroups-in-unreal-engine)文档。

### 预览材质

使用 **预览材质（Preview Material）** 可帮助直观显示你的UV。你可以在以下材质之间切换：

材质

说明

**原始（Original）**

显示细节面板中应用的当前材质。

**棋盘格（Checkerboard）**

应用临时棋盘格材质。

**重载（Override）**

应用内容浏览器中的临时材质。

使用棋盘格材质，你可以调整设置到网格体的额外通道的密度并预览其外观。

### 预览UV布局

对于一些工具，你可以在2D空间中预览UV贴图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51525583-5aee-436a-b6fb-52fbce86b41f/uv-preview-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51525583-5aee-436a-b6fb-52fbce86b41f/uv-preview-1.png)

点击查看大图。

预览面板将匹配摄像机的移动，以便可视。此外，你还可以：

-   控制它显示在哪一面
-   缩放面板
-   使用 **偏移（Offset）** 手动调整位置
-   启用线框

预览面板将显示你的所有UV，并使用正方形边框表示0-1单位正方形。但是，对于UDIM或UV远离0-1的模型，面板可能很难阅读。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0aadfcf2-71fc-4843-92c5-5bc7942cba98/uv-preview-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0aadfcf2-71fc-4843-92c5-5bc7942cba98/uv-preview-2.png)

点击查看大图。

## UV工具

创建新的UV时，你可以使用AutoUV或[**投影（Project）**](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#%E6%8A%95%E5%BD%B1)工具开始创建。你可以在此后使用剩余工具完善细节。使用[**SeamEd**](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#seamed)工具手动开始。

你可以使用 **布局（Layout）** 、 **AutoUV** 和 **解包（Unwrap）** 工具调整纹理分辨率。

### AutoUV

你可以使用 **AutoUV** 自动解包和打包UV。对于自定义UV贴图或需要快速UV贴图的背景资产，这种自动执行是一个很有用的起始点。

有三种控制方法：**UVAtlas** 、 **XAtlas** 、 **PatchBuilder** 。

方法

说明

**补丁构建器（Patch Builder）**

支持大模型，例如Nanite。引擎中内置的默认选项。

**UV图集（UV Atlas）**

对于有机对象更有价值，可最大限度减少拉伸。如需详细了解UV图集，请参阅[使用UVAtlas](https://learn.microsoft.com/zh-cn/windows/win32/direct3d9/using-uvatlas)。

不适用于Linux。

**XAtlas**

为光照贴图和机械网格体而设计。如需详细了解XAtlas，请参阅[XAtlas Github](https://github.com/jpcy/xatlas)。

在补丁构建器模式下，你可以基于预定义的多边形组给UV布局。

### 解包

**解包（Unwrap）** 工具会将3D对象展平到2D空间中，以计算UV坐标，帮助最大限度减少拉伸和挤压的区域（失真）

在视频中，使用解包工具重新计算UV会去除接缝周围的高失真区域，让UV的比例更协调。

你可以使用UV编辑器在所选UV岛状区上执行操作。

你可以决定是要基于 **现有UV（Existing UVs）** 还是 **多边形组（PolyGroups）** 进行UV解包。UV自动解包的方式由 **解包类型（Unwrap Type）** 确定。

解包类型

说明

**ExpMap**

执行快速解包，但在减少失真方面作用有限。

**Conformal**

相较于ExpMap可减少失真，但在大的岛状区上成本越来越高昂。

**SpectralConformal**

相较于Conformal方法，可进一步减少失真，但计算成本更加昂贵。此外，还有"保留不规则（Preserve Irregularity）"选项，可去除网格体不规则造成的不自然失真。

**岛状区合并（Island Merging）**

UV岛状区会合并到更大的岛状区，但不会将失真增加到超出定义的限制。

如果你要对平面等简单几何体制作纹理，所有解包类型都会产生大致相同的效果。如果你要处理非均匀进行曲面细分并有复杂形状的网格体，Spectral Conformal是最佳选项。它产生的失真最少；但是计算速度更慢。

你还可以选择[布局类型](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#%E5%B8%83%E5%B1%80)并保留UDIM。

### 投影

创建UV贴图的一种方式是，从所选形状或点将其投影到你的几何体。**投影（Project）** 工具是 **AutoUV** 的备用工具，用于快速初始化UV贴图。

投影非常适合轮廓类似于所选 **投影类型（Projection Type）** 的几何体。 该工具可能不是复杂几何体的最佳选择，因为它可能会造成失真和不必要的接缝。但是，它可以充当使用UV编辑器之前的起始点。

你可以在下表中演示的不同投影类型中选择。

 

 

 

 

![UV Box Projection](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bf4458f-f443-4bdc-8ceb-ce4f489bb178/uv-box-project.png)

![UV Cylinder Projection](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0698d58-dabe-4a5e-b0a5-534be0a41e9e/uv-cylinder-project.png)

![UV Plane Projection](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e8c7173-57fc-48c7-9dba-cd6824b98908/uv-plane-project.png)

![UV ExpMap Projection](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/444afa40-74b7-41c5-a7c0-da1243b3bb3b/uv-expmap-project.png)

**盒体（Box）**

**圆柱体（Cylinder）**

**平面（Plane）**

**ExMap**

很适合有锐利边缘的资产，例如木箱或图书。

很适合有圆形边缘的资产，例如手臂或树干。

很适合扁平资产，例如镜子或墙壁。

很适合单独UV通道中的贴花。

你可能会注意到 **ExpMap** 的形状与 **平面（Plane）** 投影完全相同；但是，其操作是不同的。ExpMap基于点投影，而不是基于形状投影。

如需详细了解ExpMap投影，请参阅[交互式贴花合成与离散指数贴图](https://prism.ucalgary.ca/bitstream/handle/1880/46212/2006-824-17.pdf;jsessionid=EA77D1B305EA6B2A72425CAF119503CE?sequence=2)一文。

#### 做出调整

你可以调整每个形状的维度，更好地适应你的网格体。要均匀地定义大小，请启用 **均匀维度（Uniform Dimensions）** 并仅调整X值。然后，你可以使用变换控件进一步调整。

**初始化（Initialization）** 确定了在激活投影工具时投影形状自动适应模型的方式。你有四个选项，具体在下表中说明。

初始化类型

说明

**默认值（Default）**

投影到边界框中心。

**使用之前值（Use Previous）**

基于投影工具的之前用法进行投影。

**自动适应（Auto Fit）**

基于当前投影方向，自动调整UV投影维度以适应你的几何体。

除非投影形状的方向发生改变，否则此方法看起来与默认值一样。

**自动适应对齐（Autofit Align）**

自动调整投影方向，然后自动调整UV投影维度以适应你的模型。

你可以在打开 **投影（Project）** 工具后更改初始化类型。但是，改变投影类型、维度或位置之后，初始化将立即停止。

要重新激活初始化，请设置所需类型，然后执行以下任一操作：

-   重新选择投影工具。
-   按 **操作（Actions）** 下的 **重置（Reset）** 按钮。

操作选项还允许你随时根据需要启动自动适应（Auto Fit）和自动适应对齐（Auto Fit Align）。

如果启用了均匀维度（Uniform Dimension），你可能在使用初始化或操作时看不到投影形状更改。

最后，使用 **UV变换（UV Transformation）** 设置，你可以调整投影的UV的旋转、缩放和平移。

### SeamEd

你可以交互式分离边缘，在视口中创建接缝。点击一个顶点并拖入相邻顶点以创建接缝。你可以创建多个接缝，然后点击"接受（Accept）"或按 **Enter** 键。

不必直接选择到顶点即可将其高亮显示；在几何体上顶点附近点击即可。此选择选项将帮助你避免选择场景中的其他Actor。

你通常希望接缝对受众不可见，除非显示接缝更美观。知道资产的哪些部分在体验中可见，对于理解在何处创建接缝至关重要。

要将接缝合并在一起，你需要使用UV编辑器中的[缝制工具](/documentation/zh-cn/unreal-engine/uv-editor-in-unreal-engine#%E7%BC%9D%E5%88%B6)。此外，该工具不支持多个UV通道。

### XFormUV

**XFormUV** 工具还在视口中提供了交互式控制。你可以逐个岛状区缩放、旋转和平移UV。要同时调整多个岛状区，请按住 **Shift** 键。

XFormUV工具可帮助在使用其他UV工具之后调整个别岛状区中的失真。

### 布局

**布局（Layout）** 工具可帮助将你的UV岛状区整理到0-1单位正方形中。

将UV布局到UV空间的过程称为UV打包。有三种布局类型可帮助打包你的UV：

布局类型

说明

**变换（Transform）**

变换将缩放和平移应用于你的所有UV，无论是否选择了特定岛状区。保留UV的当前布局。这些缩放和平移功能按钮在堆叠和重新打包中可用。

**堆叠（Stack）**

单独均匀缩放和平移每个UV岛状区，以在单位正方形中重叠打包。两个UV岛状区有相同的纹理设计时，堆叠很有用，这样就无需复制。

**重新打包（Repack）**

一起均匀缩放和平移各个UV岛状区，以在单位正方形中不重叠地打包。重新打包所特有的是允许反转（Allow Flips）设置。启用此功能后，打包UV时可以节省空间，但可能为下游操作带来问题。

使用UV编辑器，你可以在启用 **保留UDIM（Preserve UDIMs）** 后在UV岛状区源自的UDIM中整理这些岛状区。

### UV编辑器

虽然UV工具提供了编辑功能，但存在一些限制，例如：

-   合并边缘
-   UDIM管理
-   多资产工作流程
-   手动精确控制岛状区、顶点和三角形

UV编辑器通过为这种功能提供工具集和视口，克服了这些限制。请参阅[UV编辑器](/documentation/zh-cn/unreal-engine/uv-editor-in-unreal-engine)文档，了解如何使用此编辑器。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b915bc07-03d2-4fc1-9895-72f2908d525f/uv-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b915bc07-03d2-4fc1-9895-72f2908d525f/uv-editor.png)

点击查看大图。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [modeling mode](https://dev.epicgames.com/community/search?query=modeling%20mode)
-   [uv mapping](https://dev.epicgames.com/community/search?query=uv%20mapping)
-   [texturing](https://dev.epicgames.com/community/search?query=texturing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [理解关键概念](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#%E7%90%86%E8%A7%A3%E5%85%B3%E9%94%AE%E6%A6%82%E5%BF%B5)
-   [UV](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#uv)
-   [UV贴图](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#uv%E8%B4%B4%E5%9B%BE)
-   [UV岛状区](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#uv%E5%B2%9B%E7%8A%B6%E5%8C%BA)
-   [UDIM](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#udim)
-   [常见功能](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#%E5%B8%B8%E8%A7%81%E5%8A%9F%E8%83%BD)
-   [UV通道](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#uv%E9%80%9A%E9%81%93)
-   [多边形组层](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#%E5%A4%9A%E8%BE%B9%E5%BD%A2%E7%BB%84%E5%B1%82)
-   [预览材质](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#%E9%A2%84%E8%A7%88%E6%9D%90%E8%B4%A8)
-   [预览UV布局](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#%E9%A2%84%E8%A7%88uv%E5%B8%83%E5%B1%80)
-   [UV工具](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#uv%E5%B7%A5%E5%85%B7)
-   [AutoUV](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#autouv)
-   [解包](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#%E8%A7%A3%E5%8C%85)
-   [投影](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#%E6%8A%95%E5%BD%B1)
-   [做出调整](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#%E5%81%9A%E5%87%BA%E8%B0%83%E6%95%B4)
-   [SeamEd](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#seamed)
-   [XFormUV](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#xformuv)
-   [布局](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#%E5%B8%83%E5%B1%80)
-   [UV编辑器](/documentation/zh-cn/unreal-engine/uvs-category-in-unreal-engine#uv%E7%BC%96%E8%BE%91%E5%99%A8)

相关文档

[

建模模式概述

![建模模式概述](https://dev.epicgames.com/community/api/documentation/image/5f9ab70c-68fd-4dd1-9e68-9294f46ed6e0?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)

[

UV编辑器

![UV编辑器](https://dev.epicgames.com/community/api/documentation/image/2906765c-72b8-440a-81d1-606f236ada26?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/uv-editor-in-unreal-engine)
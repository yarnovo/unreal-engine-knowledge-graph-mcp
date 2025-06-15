# 破裂几何体集合用户指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide
> 
> 生成时间: 2025-06-14T19:48:18.241Z

---

目录

![破裂几何体集合用户指南](https://dev.epicgames.com/community/api/documentation/image/2e922a83-98ba-400b-b43d-2e55c9e2ad34?resizing_type=fill&width=1920&height=335)

你可以在Epic开发者社区站点上观看[破裂和群集](https://dev.epicgames.com/community/learning/tutorials/k84m/chaos-destruction-fracture-and-clustering)教程，找到视频格式的类似信息。

**破裂模式（Fracture Mode）** 是一种编辑器模式，包含各种各样的工具，用于创建、破裂和操控 **几何体集合（Geometry Collections）** 。几何体集合是由Chaos破坏系统用于在虚幻引擎中模拟实时破裂的资产类型。

利用可用的破裂工具，用户可以对几何体集合的破裂方式进行诸多控制。这包括破裂的片段数量，以及它们如何彼此相关（破裂层级）。

每个破裂工具使用不同的方法或算法来生成不同的破裂模式。每种方法随附各种选项，用于进一步自定义生成的模式，包括增加随机性。

在本指南中，你将学习如何使用破裂模式下可用的各种破裂工具。

学习破裂模式的前提是，你知道如何基于关卡中的Actor创建几何体集合。如果你不熟悉该过程，请参阅[几何体集合用户指南](/documentation/zh-cn/unreal-engine/chaos-destruction-key-concepts-in-unreal-engine)。

## 破裂几何体集合

使用破裂工具之前，利用关卡中的静态网格体Actor创建几何体集合，并将其选中。

![利用关卡中的静态网格体Actor创建几何体集合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31f4cd3e-321f-4e6c-8519-95f30062b991/destruction-fracture-6.png)

现在你可以在 **破裂模式（Fracture Mode）** 面板的 **破裂（Fracture）** 分段下访问可用的破裂工具。每个工具可以应用于几何体集合整体，或应用于破裂后的所选破裂片段（单独的骨骼）。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40173251-2d65-42ab-915b-ee022048c7f8/destruction-fracture-7.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40173251-2d65-42ab-915b-ee022048c7f8/destruction-fracture-7.png)

点击查看大图。

将破裂方法应用于几何体集合时，将创建新的破裂级别。这会在几何体集合的 **破裂层级（Fracture Hierarchy）** 窗口中反映出来。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9877b27-6022-465d-bd39-d92c08d67701/destruction-fracture-6b.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9877b27-6022-465d-bd39-d92c08d67701/destruction-fracture-6b.png)

点击查看大图。

几何体集合的破裂层级类似于树状结构。它包含一个根骨骼，并带有构成破裂片段的一个或多个子骨骼。每个子骨骼进而可以包含自己的子骨骼。

破裂层级中的级别表示树的结构，其中四个级别表示带三个分支级别子骨骼的树状结构。

![4层破裂层级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/202d8b10-e5d2-4d07-a838-8011467eaeab/destruction-fracture-6c.png)

每次破裂几何体集合时，你可以使用不同的破裂工具，在破裂层级中的每个级别创建不同的破裂模式。

你可以在几何体集合中选择多个骨骼（破裂的片段），方法是直接在视口中按住 **CTRL** 键并进行选择。你还可以使用提供的[选择工具](/documentation/zh-cn/unreal-engine/fracture-mode-selection-tools-user-guide)，直接快速选择一组骨骼。

### 重置几何体集合

破裂几何体集合后，你可以点击 **生成（Generate）** 分段下的 **重置（Reset）** 按钮，将其重置为原始状态。这会将几何体集合设置为创建时未应用破裂的原始状态。这很适合用于尝试不同的破裂方法，直至你找到可带来所需效果的配置。

![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71ac5a47-cc45-4356-8e38-6d3fd965eb32/destruction-fracture-11.png) ![你可以点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b1a3bb1-5be4-4730-9de1-615691817bf9/destruction-fracture-reset.gif)

### 视图设置

**视图设置（View Settings）** 有助于直观地呈现几何体集合在应用破裂操作后的外观。

![通用视图选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/110863ee-4132-4562-a1fb-d29c07e981b3/destruction-fracture-8.png)

选项

说明

**爆炸数量（Explode Amount）**

显示几何体集合在Gameplay期间破裂时的外观。值为1时，将分离所有骨骼，并显示完全破裂的几何体集合的外观。

**隐藏未选择项（Hide UnSelected）**

隐藏几何体集合中当前未选择的骨骼。这有助于你在应用破裂方法时专注于特定骨骼。

**破裂级别（Fracture Level）**

定义要直观呈现的破裂级别。选择"全部（All）"将显示所有破裂级别的骨骼。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dba45088-4269-4a3a-a427-9c1935b4f5e9/destruction-fracture-9.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dba45088-4269-4a3a-a427-9c1935b4f5e9/destruction-fracture-9.png)

点击查看大图。

![将爆炸值从0更改为1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4484f51-766b-4220-9757-8a41511ba30d/destruction-fracture-explode.gif)

### 大部分破裂方法随附的通用选项

所有破裂工具都有这些 **通用破裂（Common Fracture）** 选项：

![所有破裂方法的通用破裂选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/651c5d31-00b2-4da1-be45-4f8fd18bcd72/destruction-fracture-10.png)

选项

说明

**随机种子（Random Seed）**

该值用于对几何体集合生成随机破裂模式。若值为-1，每次应用新的破裂操作时，将使用随机种子值。指定值会生成绑定到该种子数字的破裂模式，进入时会总是生成相同的破裂模式。

**破裂几率（Chance to Fracture）**

设置骨骼在破裂操作期间可能破裂的几率，1等于100%，表示所有骨骼都将破裂。0表示任何骨骼破裂的几率都为0%。

**群组破裂（Group Fracture）**

在所有选中网格体中生成破裂模式。

**绘制站点（Draw Sites）**

在骨骼中心绘制要由破裂模式切割的点。

**绘制图（Draw Diagram）**

在几何体集合上绘制破裂模式图。

**水泥浆（Grout）**

定义切割片段之间留下的空间。

![带有水泥浆的破裂几何体集合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c12d1a00-d3e6-4108-8ea7-f4b4e1a06950/destruction-fracture-12.png)

大部分破裂方法都有以下 **噪点（Noise）** 选项：

-   **振幅（Amplitude）** ：定义Perlin噪点置换的大小，以厘米为单位。值为0时，表示在生成破裂模式时不会使用噪点。
    
    ![振幅： 0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d1e0d20-4c04-494e-a363-7b656cbe89f4/destruction-fracture-13a.png)
    
    ![振幅： 30](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f90ca25-2c67-4cec-ae71-66dd5c153c9a/destruction-fracture-13b.png)
    
    振幅： 0
    
    振幅： 30
    
-   **频率（Frequency）** ：定义Perlin噪点的周期。值越小，生成的噪点模式越平滑，值越大，生成的噪点模式越粗糙。
    
    ![振幅：5，频率：0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b5b6536-39bf-4e8c-b541-c4803991bbf9/destruction-fracture-14a.png)
    
    ![振幅：5，频率： 200](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85ecb390-e6c7-4ce6-8b20-c8c30f7ea756/destruction-fracture-14b.png)
    
    振幅：5，频率：0
    
    振幅：5，频率： 200
    
-   **持久性（Persistence）** ：定义Perlin噪点层的持久性。对于第一个层之后的每个层（倍频），Perlin噪点的 **振幅（amplitude）** 将按此因子缩放。
    
    ![振幅：5，持久性：0.5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52f0d4fe-cea8-4b2f-b4f1-a0e1fb2b1c68/destruction-fracture-15a.png)
    
    ![振幅：5，持久性： 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb1d0755-d14d-443c-9c2c-c09971c57801/destruction-fracture-15b.png)
    
    振幅：5，持久性：0.5
    
    振幅：5，持久性： 1
    
-   **间隙度（Lacunarity）** ：定义Perlin噪点层的间隙度。对于第一个层之后的每个层（倍频），Perlin噪点的 **频率（frequency）** 将按此因子缩放。
    
    ![振幅：5，间隙度：2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/162ed4f8-ab6c-4d96-831d-0ca33c0a1459/destruction-fracture-16a.png)
    
    ![振幅：5，间隙度： 4](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e10ae75-d88d-46f0-b7d0-e6d3039a9bac/destruction-fracture-16b.png)
    
    振幅：5，间隙度：2
    
    振幅：5，间隙度： 4
    
-   **倍频数（Octave Number）** ：定义将应用于破裂模式的Perlin噪点分形层（倍频）数量。每个层是叠加的，振幅和频率分别按持久性和间隙度缩放。使用更小的值（1-2）将生成平滑模式，值越大，生成的模式越崎岖。
    
    ![振幅：5，倍频数：1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/195c006a-5887-4ad7-8581-f2fa7a853bd6/destruction-fracture-17a.png)
    
    ![振幅：5，倍频数： 8](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82c7b4c1-765e-4e63-a21e-3872ca5a845a/destruction-fracture-17b.png)
    
    振幅：5，倍频数：1
    
    振幅：5，倍频数： 8
    
-   **点间距（Point Spacing）** ：切割表面上添加噪点的顶点之间的距离（以厘米为单位）。顶点之间的间距越大，产生的网格体越高效，三角形越少。但是，这也会产生更低的总体分辨率来显示添加的噪点的形状。
    

## 使用破裂工具

每个破裂工具都有自己的设置，可提供相关选项来实现所需结果。

### 均匀破裂

**均匀（Uniform）** 工具使用Voronoi算法生成破裂模式。输入Voronoi站点的最小和最大数量（或破裂的片段数量），该算法将选择该范围内的随机值。

![你可以输入Voronoi站点的最小和最大数量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a03f33c-51ac-4db3-b6b9-18701ec1262f/destruction-fracture-18.png)

在下面的破裂几何体集合中，左侧的集合将 **最小（Min）** 和 **最大Voronoi站点数量（Max Voronoi Sites）** 设置为 **20** 。这意味着，破裂几何体集合将有20个破裂片段。右侧的示例将 **最小（Min）** 和 **最大Voronoi站点数量（Max Voronoi Sites）** 设置为 **100** 。

![最小/最大Voronoi站点数量：20](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/926fd15b-e71f-4195-81ff-a8136f2798e1/destruction-fracture-19a.png)

![最小/最大Voronoi站点数量： 100](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1f1a8e3-3cb4-4d7a-a719-ad15a5f7d119/destruction-fracture-19b.png)

20个Voronoi站点

100个Voronoi站点

*点击查看大图。*

*点击查看大图。*

### 群集破裂

**群集（Cluster）** 破裂工具是均匀破裂方法的扩展，两者在生成其破裂模式时都使用Voronoi算法。均匀Voronoi方法会生成相对均匀分布的站点，而群集方法则会将其站点汇集为彼此靠得很近的孤岛，创造出相较于均匀方法更多样化的破裂模式。

![群集破裂工具选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a85e8f8-94da-4b17-aaaf-3ce1aff74c47/destruction-fracture-58.png)

选项

说明

**最小群集数量（Min Num Clusters）**

定义将创建的Voronoi群集的最小数量。

**最大群集数量（Max Num Clusters）**

定义将创建的Voronoi群集的最大数量。

**每个群集的最小站点数量（Min Sites per Cluster）**

定义每个群集的Voronoi站点的最小数量。

**每个群集的最大站点数量（Max Sites per Cluster）**

定义每个群集的Voronoi站点的最大数量。

**与中心的最小距离（Min Dist from Center）**

定义最小群集半径。群集半径偏移将添加到该值。

**与中心的最大距离（Max Dist from Center）**

定义最大群集半径（以厘米为单位）。群集半径偏移将添加到该值。

**群集半径偏移（Cluster Radius Offset）**

定义添加到与中心的最小和最大距离的群集半径偏移（以厘米为单位）。

下面的例子使用以下群集设置作为起始点：

设置

值

**最小群集数量（Min Num Clusters）**

2

**最大群集数量（Max Num Clusters）**

2

**每个群集的最小站点数量（Min Sites per Cluster）**

5

**每个群集的最大站点数量（Max Sites per Cluster）**

5

**与中心的最小距离（Min Dist from Center）**

0.1

**与中心的最大距离（Max Dist from Center）**

0.1

**群集半径偏移（Cluster Radius Offset）**

0

通用破裂设置下还设置了以下内容：

-   **绘制站点（Draw Sites）** ：启用
-   **绘制图（Draw Diagram）** ：禁用

在下方示例中，你可以看到将 **最小（Min）** / **最大群集数量（Max Number of Clusters）** 从 **2** 设置为 **5** 之间的差异。

![最小/最大群集数量：2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2854519a-0c80-430b-b8c8-9200a491390e/destruction-fracture-20a.png)

![最小/最大群集数量： 5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74b5b85e-671b-4576-894c-39f78fe34f2f/destruction-fracture-20b.png)

最小/最大群集数量：2

最小/最大群集数量： 5

在下方示例中，你可以看到将 **每个群集的最小/最大站点数量（Min / Max Sites per Cluster）** 从 **5** 设置为 **10** 之间的差异。

![每个群集的最小/最大站点数量：5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9970b5e-9741-41b5-b613-7f921192e15c/destruction-fracture-20a.png)

![每个群集的最小/最大站点数量： 10](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b73435c-7fa1-426b-8296-290739e7822f/destruction-fracture-21b.png)

每个群集的最小/最大站点数量：5

每个群集的最小/最大站点数量： 10

在下方示例中，你可以看到将 **与中心的最小/最大距离（（Min / Max Distance from Center）** 从 **0.1** 设置为 **0.2** 之间的差异。

![与中心的最小/最大距离：0.1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17b80727-7707-48c5-aa63-15d1780ba417/destruction-fracture-20a.png)

![与中心的最小/最大距离： 0.2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20994f3c-2148-4290-bb33-847beb0c5ccc/destruction-fracture-22b.png)

与中心的最小/最大距离：0.1

与中心的最小/最大距离： 0.2

在下方示例中，你可以看到将 **群集半径偏移（Cluster Radius Offset\*）** 从 **0** 设置为 **10** 之间的差异。

![群集半径偏移：0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab398cee-a5fc-4de6-baee-4d948aad1df5/destruction-fracture-20a.png)

![群集半径偏移： 10](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ecc91aaa-72f2-4dae-85bd-caa4987e034c/destruction-fracture-23b.png)

群集半径偏移：0

群集半径偏移： 10

### 辐射破裂

**辐射（Radial）** 破裂工具会创建从中心点运行并向外辐射的Voronoi站点分布。中心位置通过操控视口中的小工具来控制。

![辐射破裂工具小工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a90c965d-8756-424a-bcde-5c8263f7e314/destruction-fracture-24.png)

如果你想将其放在特定位置，可以直接在 **辐射Voronoi（Radial Voronoi）** 选项中输入中心点的 **中心（Center）** 和 **法线（Normal）** 旋转(1)。要激活这些字段，请在 **放置功能按钮（Placement Controls）** 中 **禁用** **使用小工具（Use Gizmo）** 复选框(2)。

![辐射Voronoi选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b4b67a7-45fe-4f60-acb0-54187a836651/destruction-fracture-59.png)

辐射破裂工具随附以下选项：

-   **中心（Center）** ：定义生成的破裂模式的中心位置。此选项仅在你禁用 **使用小工具（Use Gizmo）** 复选框时可用。
    
-   **法线（Normal）** ：定义用于生成破裂模式的平面的法线旋转。此选项仅在你禁用 **使用小工具（Use Gizmo）** 复选框时可用。
    
-   **半径** ：定义模式从中心位置起的半径。
    
    ![半径：50](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3448536-8f2f-45a3-8c82-501f0eab9e18/destruction-fracture-27a.png)
    
    ![半径： 100](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8776a0b2-14d4-4c58-ab9a-571594f37f3d/destruction-fracture-27b.png)
    
    半径：50
    
    半径： 100
    
-   **角度步进（Angular Steps）** ：定义用于生成破裂模式的角度步进数量。这些步进对图的周长进行再分割。
    
    ![角度步进：5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e804a691-f890-4300-83e9-9f1a53b7b63f/destruction-fracture-27a.png)
    
    ![角度步进： 20](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6ee3c79-e960-4da6-ad5e-83972c3a940c/destruction-fracture-28b.png)
    
    角度步进：5
    
    角度步进： 20
    
-   **辐射步进（Radial Steps）** ：定义用于生成破裂模式的辐射步进数量。这会影响模式从中心向外分割的次数。
    
    ![辐射步进：5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f269a61b-be69-4f9f-bd7c-e25d2eb2fcd5/destruction-fracture-27a.png)
    
    ![辐射步进： 20](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/200214b5-7593-4782-b775-1d92abb24d92/destruction-fracture-29b.png)
    
    辐射步进：5
    
    辐射步进： 20
    
-   **角度偏移（Angle Offset）** ：定义用于每个辐射步进的角度偏移（以度为单位）。
    
    ![角度偏移：0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a93556c1-984f-4c00-9fd8-5e65e367e7f0/destruction-fracture-27a.png)
    
    ![角度偏移： 35](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/313c980e-6bfe-474e-86b5-c96515bef1c4/destruction-fracture-30b.png)
    
    角度偏移：0
    
    角度偏移： 35
    
-   **可变性（Variability）** ：定义每个生成的Voronoi站点之间随机间隔的数量（以厘米为单位）。
    
    ![可变性：0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48b135b2-894a-4459-b640-237062dfe938/destruction-fracture-27a.png)
    
    ![可变性： 5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aec6d43b-1608-4a13-a785-96c8f8c43bbe/destruction-fracture-31b.png)
    
    可变性：0
    
    可变性： 5
    

### 平面破裂

**平面（Planar）** 破裂工具用于在几何体集合中创建平面切割。随着在几何体集合中创建切割，小工具会重置为当前选择内容的质心。如果你试图在视口中选择不同骨骼时做出刻意切割，该功能很有用。

你可以通过在 **放置功能按钮（Placement Controls）** 分段下禁用 **选择时居中（Center on Selection）** ，禁止小工具重置到当前选择内容的中心。

![在](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82df41f4-ac40-4509-94af-498dfb8a6f78/destruction-fracture-32.png)

请务必注意，用于每个切割的平面会无限延伸，这意味着即使小工具按特定大小显示平面，切割仍会沿平面的方向延伸，切割整个几何体集合。

你还可以通过在 **放置功能按钮（Placement Controls）** 分段下禁用 **使用小工具（Use Gizmo）** ，放弃使用小工具。

![在](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44ef2dc8-c4ea-4044-a66a-a385ebeba15e/destruction-fracture-33.png)

禁用小工具后，你可以在 **平面切割（Plane Cut）** 分段下设置 **切割次数（Number of Cuts）** 。这会导致向几何体集合切割随机次数。

![现在你可以在](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e9c9d5f-91ba-4efe-ae45-d9e20f091a26/destruction-fracture-34.png)

在下方示例中，你可以看到将 **切割次数（Number of Cuts）** 从 **1** 设置为 **10** 之间的差异。

![切割次数：1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93e92c95-3f87-4cfa-9371-b6ec3a60e327/destruction-fracture-35a.png)

![切割次数： 10](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0088d19-a46c-4149-999f-fe59af33bde0/destruction-fracture-35b.png)

切割次数：1

切割次数： 10

你可以通过在 **通用破裂（Common Fracture）** 分段下更改 **随机种子（Random Seed）** 值，更改这些切割的放置。

![随机种子：20](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4361db0a-4ffc-4e15-9afb-0db5d983b13a/destruction-fracture-36a.png)

![随机种子： 40](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97adcc9e-28de-480e-b97a-52abc7817c40/destruction-fracture-36b.png)

随机种子：20

随机种子： 40

### 切片破裂

**切片（Slice）** 破裂工具是 **平面（Planar）** 破裂工具的扩展，增加了沿每个轴设置切割次数的能力。这样就可以使初始切割对齐到列和行。切片还可以应用随机角度和偏移变体。

选项

说明

**切片X（Slices X）**

定义X轴上的切片数量。

**切片Y（Slices Y）**

定义Y轴上的切片数量。

**切片Z（Slices Z）**

定义Z轴上的切片数量。

**随机角度变体（Random Angle Variation）**

定义随机旋转每个切片平面的最大角度（以度为单位）。

**随机偏移变体（Random Offset Variation）**

定义随机移位每个切片平面的最大距离（以厘米为单位）。

在下方示例中，你可以看到将 **随机角度变体（Random Angle Variation）** 从 **0** 设置为 **35** 之间的差异。

![随机角度变体：0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47b30ef4-cd01-4435-9835-30942652d3dc/destruction-fracture-37a.png)

![随机角度变体： 35](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e26e8db-7927-4b35-86cf-d606821552d2/destruction-fracture-37b.png)

随机角度变体：0

随机角度变体： 35

在下方示例中，你可以看到将 **随机偏移变体（Random Offset Variation）** 从 **0** 设置为 **50** 之间的差异。

![随机偏移变体：0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6226844e-8129-4388-abb4-5f198787a405/destruction-fracture-37a.png)

![随机偏移变体： 50](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44401a0b-1732-4966-9109-9c43cadc8dac/destruction-fracture-38b.png)

随机偏移变体：0

随机偏移变体： 50

### 砖块破裂

砖块破裂工具被视为试验性功能，可能会在引擎的未来版本中发生重大更改。

**砖块（Brick）** 破裂工具会生成可自定义的砖块模式。你可以指定在模式应用于几何体集合时排列砖块的方式及其大小。

选项

说明

**砌合（Bond）**

设置砖块砌合模式，用于确定砖块在破裂模式中的排列方式。你可以选择以下任一项：顺砖（Stretcher）、堆叠（Stack）、英式（English）、丁砖（Header）和佛兰德式（Flemish）。

**砖块长度（Brick Length）**

定义砖块长度，以厘米为单位。

**砖块高度（Brick Height）**

定义砖块高度，以厘米为单位。

**砖块厚度（Brick Depth）**

定义砖块厚度，以厘米为单位。

下面的例子显示了应用于几何体集合的 **顺砖（Stretcher）** 砌合方法。

![顺砖砌合方法的例子](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b065c01-6ff8-4081-b871-577060f4a9b3/destruction-fracture-39.png)

### 网格体破裂

**网格体（Mesh）** 破裂工具使用静态网格体的形状生成破裂模式。如果你想创建非常具体的模式形状，这很有用。

将 **静态网格体（Static Mesh）** 拖入关卡中，并调整位置，使其与几何体集合相交。

![将静态网格体拖入关卡中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c76442e7-2a94-4230-aa5e-8d08154b2c53/destruction-fracture-44.png)

点击 **网格体（Mesh）** 并转至 **破裂（Fracture）** 面板中的 **网格体切割（Mesh Cut）** 分段。

![转至](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b674b98-de66-42dd-af70-16b534c5ace0/destruction-fracture-45a.png)

点击 **切割Actor（Cutting Actor）** 下拉菜单。选择你拖入关卡中的静态网格体Actor。你也可以点击"滴管"按钮，然后点击视口中的静态网格体。

![从列表选择静态网格体Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/702a1cfd-1181-496f-a508-7d1f764c529c/destruction-fracture-45.png)

点击 **破裂（Fracture）** ，以切割Actor的形状切割几何体集合。要查看结果，请在 **视口（Viewport）** 中选择 **切割Actor（Cutting Actor）** 并移动它。

![将切割Actor移出几何体集合以查看结果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d66af974-6c56-41fc-855a-e5b9a44581ec/destruction-fracture-cut-mesh.gif)

以下 **切割分布（Cut Distributions）** 可用于该工具：

![可用切割分布选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fbc06612-1f75-4c9f-b1e5-31a0cb842529/destruction-fracture-46a.png)

选项

说明

**单次切割（Single Cut）**

在切割Actor的当前位置生成单次切割。

**均匀随机（Uniform Random）**

围绕几何体集合的边界框在均匀随机分布中分散切割Actor。

**网格（Grid）**

在几何体集合中的规则网格模式中排列切割Actor。

以下选项可用于 **均匀随机（Uniform Random）** 切割分布：

![均匀随机切割分布选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/058fccc3-0a98-49a1-bedc-c74acaa5c6d9/destruction-fracture-46b.png)

选项

说明

**分散数量（Number to Scatter）**

定义要随机分散的Actor数量。

**最小比例因子（Min Scale Factor）**

定义要应用于切割网格体的最小比例因子。将在最小值和最大值之间选择随机比例。

**最大比例因子（Max Scale Factor）**

定义要应用于切割网格体的最大比例因子。将在最小值和最大值之间选择随机比例。

**随机方向（Random Orientation）**

是否随机变化切割Actor的方向。

**+/-滚动范围（+/- Roll Range）**

定义将用于选取切割Actor的随机滚动（X轴的旋转）的范围。

**+/-俯仰范围（+/- Pitch Range）**

定义将用于选取切割Actor的随机俯仰（Y轴的旋转）的范围。

**+/-偏转范围（+/- Yaw Range）**

定义将用于选取切割Actor的随机偏转（Z轴的旋转）的范围。

在下方示例中，你可以看到将 **分散次数（Number to Scatter）** 从 **5** 设置为 **10** 之间的差异。

![分散次数：5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cceea5d3-e1e8-4d11-84b1-bbcc3045b67a/destruction-fracture-47a.png)

![分散次数： 10](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27d8cd57-d349-4aeb-9691-dbeb8e78d881/destruction-fracture-47b.png)

分散次数：5

分散次数： 10

在下方示例中，你可以看到 **启用** 和 **禁用** **随机方向（Random Orientation）**之间的差异。

![随机方向：启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd229322-d537-4860-82d6-e84690822be4/destruction-fracture-48a.png)

![随机方向：禁用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/587451b4-038d-4bbf-ab49-535714286004/destruction-fracture-48b.png)

随机方向：启用

随机方向：禁用

以下选项可用于网格切割分布：

![网格分布选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac6f5fc5-f4fb-4d0c-b2e7-71c1d476103e/destruction-fracture-60.png)

选项

说明

**网格宽度（Grid Width）**

定义要添加到网格X轴的切割网格体数量。

**网格深度（Grid Depth）**

定义要添加到网格Y轴的切割网格体数量。

**网格高度（Grid Height）**

定义要添加到网格Z轴的切割网格体数量。

**可变性（Variability）**

定义切割Actor的随机置换的大小。

**最小比例因子（Min Scale Factor）**

定义要应用于切割Actor的最小比例因子。

**最大比例因子（Max Scale Factor）**

定义要应用于切割Actor的最大比例因子。

**随机方向（Random Orientation）**

是否随机变化切割Actor的方向。

在下方示例中，你可以看到 **启用** 和 **禁用** **随机方向（Random Orientation）**之间的差异。

![随机方向：启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e891027-00e2-4679-9ae4-ee2e7f5690e4/destruction-fracture-49a.png)

![随机方向：禁用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31bb90a2-62d0-4dca-9f55-be30b0e3fb24/destruction-fracture-49b.png)

随机方向：启用

随机方向：禁用

### 自定义破裂

**自定义（Custom）** 破裂工具是破裂模式随附的最广泛的破裂工具。

![自定义破裂工具选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/711f54dc-d1aa-4032-ad01-1876a05ce0cb/destruction-fracture-61.png)

选项

说明

**模式（Pattern）**

定义用于生成Voronoi站点的模式。

**法线偏移（Normal Offset）**

定义用于每个顶点的法线方向的偏移值。

**可变性（Variability）**

定义每个Voronoi站点随机偏移的数量，以厘米为单位。

**要添加的站点数（Sites to Add）**

定义要添加到模式的Voronoi站点数量。

**跳过部分（Skip Fraction）**

定义不会破裂（跳过）的点的部分。

**跳过模式（Skip Mode）**

定义用于跳过不会破裂的点的方法。

使用此工具时，**破裂图（Fracture Diagram）** 被视为可以相对于几何体集合移动的独立实体。如果你想创建自定义程度更高的破裂模式，这很有用。

![小工具居中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3000be2-37d2-405b-8486-a2cfefcffcf7/destruction-fracture-50a.png)

![小工具移至边角](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a29c6c4f-7bb6-41e9-a089-76724af03820/destruction-fracture-50b.png)

小工具居中

小工具移至边角

*点击查看大图。*

*点击查看大图。*

要更好地可视化破裂图，你可以冻结破裂站点的位置数据。在 **通用破裂（Common Fracture）** 分段下，启用 **绘制站点（Draw Sites）** 并禁用 **绘制图（Draw Diagram）** 。

![启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/def1e890-6482-401b-a51f-c27a509a0007/destruction-fracture-51.png)

此外，在 **实时Voronoi站点（Live Voronoi Sites）** 分段下，将 **模式（Pattern）** 设置为 **居中（Centered）** ，并将 **可变性（Variability）** 设置为 **40** 。

![选择居中模式并将可变性设置为40](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1fae4d36-9416-4302-a42a-28b21043f81d/destruction-fracture-52.png)

这样做，你可以将小工具移至几何体集合上的所需位置。在"破裂模式（Fracture Mode）"面板的 **自定义Voronoi（Custom Voronoi）** 分段下，点击 **冻结实时站点（Freeze Live Sites）** 。

![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5050390e-0cd4-40e3-8dc9-3249fdf44e82/destruction-fracture-53.png)

![小工具位于左上角](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f06574d6-711d-49b9-bd02-3e0291847a5a/destruction-fracture-54a.png)

![小工具移动以显示冻结站点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c255bda8-1891-445b-8f1f-5766050c37dd/destruction-fracture-54b.png)

小工具位于左上角

小工具移动以显示冻结站点

*点击查看大图。*

*点击查看大图。*

你可以继续此过程，有意将站点放在几何体集合上。准备就绪后，点击 **破裂（Fracture）** 可查看几何体集合上放置的所有站点的结果。

![破裂的几何体集合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b67241a-20fe-4ea4-a5a7-9b4390b7ba12/destruction-fracture-55.png)

由于破裂图独立于几何体集合，你可以更改几何体集合，而不会影响破裂本身。

例如，如果你将 **要添加的站点数（Sites to Add）** 设置为 **2000** ，将几何体集合缩减为柱子的形状，并点击 **破裂（Fracture）** ，就可以将破裂模式应用于几何体集合的当前形状。

![将](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99b5576c-1ec7-4d8e-a608-7fbbd546a9c3/destruction-fracture-56a.png) ![缩放几何体集合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f33fe01-b626-4c32-809d-10be986f4cd2/destruction-fracture-56b.png)

将几何体集合重新缩放为原始大小，注意破裂模式现在会拉伸，类似于碎木片。

![将几何体集合重新缩放为原始大小](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3a492fb-2592-406d-9c4f-2e2cbafbec74/destruction-fracture-57.png)

由于破裂图并不直接绑定到几何体集合，当你重新缩放几何体集合时，破裂图保持不变。这意味着，你可以根据项目所选的风格创建独特的破裂模式，比如这个有细长破裂的模式。

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [chaos](https://dev.epicgames.com/community/search?query=chaos)
-   [destruction](https://dev.epicgames.com/community/search?query=destruction)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [破裂几何体集合](/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide#%E7%A0%B4%E8%A3%82%E5%87%A0%E4%BD%95%E4%BD%93%E9%9B%86%E5%90%88)
-   [重置几何体集合](/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide#%E9%87%8D%E7%BD%AE%E5%87%A0%E4%BD%95%E4%BD%93%E9%9B%86%E5%90%88)
-   [视图设置](/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide#%E8%A7%86%E5%9B%BE%E8%AE%BE%E7%BD%AE)
-   [大部分破裂方法随附的通用选项](/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide#%E5%A4%A7%E9%83%A8%E5%88%86%E7%A0%B4%E8%A3%82%E6%96%B9%E6%B3%95%E9%9A%8F%E9%99%84%E7%9A%84%E9%80%9A%E7%94%A8%E9%80%89%E9%A1%B9)
-   [使用破裂工具](/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide#%E4%BD%BF%E7%94%A8%E7%A0%B4%E8%A3%82%E5%B7%A5%E5%85%B7)
-   [均匀破裂](/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide#%E5%9D%87%E5%8C%80%E7%A0%B4%E8%A3%82)
-   [群集破裂](/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide#%E7%BE%A4%E9%9B%86%E7%A0%B4%E8%A3%82)
-   [辐射破裂](/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide#%E8%BE%90%E5%B0%84%E7%A0%B4%E8%A3%82)
-   [平面破裂](/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide#%E5%B9%B3%E9%9D%A2%E7%A0%B4%E8%A3%82)
-   [切片破裂](/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide#%E5%88%87%E7%89%87%E7%A0%B4%E8%A3%82)
-   [砖块破裂](/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide#%E7%A0%96%E5%9D%97%E7%A0%B4%E8%A3%82)
-   [网格体破裂](/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide#%E7%BD%91%E6%A0%BC%E4%BD%93%E7%A0%B4%E8%A3%82)
-   [自定义破裂](/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%A0%B4%E8%A3%82)
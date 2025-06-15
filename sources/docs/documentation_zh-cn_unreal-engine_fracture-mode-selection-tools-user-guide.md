# 破裂模式选择工具用户指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fracture-mode-selection-tools-user-guide
> 
> 生成时间: 2025-06-14T19:48:17.143Z

---

目录

![破裂模式选择工具用户指南](https://dev.epicgames.com/community/api/documentation/image/478b2def-9854-4164-b8a3-9edd8676f56c?resizing_type=fill&width=1920&height=335)

你可以在Epic开发者社区站点上观看[使用选择工具](https://dev.epicgames.com/community/learning/tutorials/k84m/chaos-destruction-fracture-and-clustering)教程，找到视频格式的类似信息。

**破裂模式（Fracture Mode）** 是一种[关卡编辑器模式](/documentation/zh-cn/unreal-engine/level-editor-modes-in-unreal-engine)，其中包含各种工具，包括Chaos破坏系统（Chaos Destruction System）用于创建、破裂和操控 **几何体集合（Geometry Collection）** 的工具，几何体集合是用于虚幻引擎中模拟实时破裂的资产类型。

在本指南中，你将学习如何使用破裂模式中的各种选择工具。这些工具提供了有用的方法，可以在几何体集合中选择可进一步破裂或群集的特定破裂片段（也称骨骼）。

学习破裂模式的前提是，你知道如何基于关卡中的Actor创建几何体集合。如果你不熟悉该流程，请参阅[几何体集合用户指南](/documentation/zh-cn/unreal-engine/geometry-collections-user-guide)。

## 破裂几何体集合

在本小节中，你将创建几何体集合并使其破裂，在此过程中了解 **破裂模式（Fracture Mode）** 随附的选择工具。

1.  利用关卡中的静态网格体Actor创建几何体集合。
    
    ![在你的关卡中以静态网格体Actor为基础创建几何体集合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1f2eb15-dac1-4271-ad83-5f4679ec02bc/destruction-selection-6.png)
2.  选择几何体集合后，转至 **破裂（Fracture）** 分段，选择其中一个可用的破裂工具。转至 **破裂（Fracture）** 面板，并点击 **破裂（Fracture）**。你可以多次使用同一破裂工具来破裂几何体集合，也可以在每次点击破裂（Fracture）时都选择不同的工具。
    
    ![Go to the Fracture panel and click Fracture](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81984d08-183b-430d-940e-554709bb2a8d/destruction-selection-21.png)
3.  下例使用了 **切片（Slice）** 和 **均匀Voronoi（Uniform Voronoi）** 破裂工具来破裂几何体集合。
    
    ![下例使用了切片和均匀Voronoi破裂工具来破裂几何体集合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1c9ad5f-a173-4f84-934f-c313b4621619/destruction-selection-20.png) ![几何体集合已破裂](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c170b80-6e3b-42d8-933a-e059f5f055a8/destruction-selection-8.png)

请参阅[破裂几何体集合用户指南](/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide)，详细了解如何破裂几何体集合。

## 使用选择工具

几何体集合的破裂层级类似于树状结构。它包含一个根骨骼（级别0）以及一个或多个子骨骼（级别1）。而每个子骨骼又包含自己的子项（级别2和3）。

![4层破裂层级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ddd2803-5e53-401b-a5a9-6308f8ad36d6/destruction-selection-8b.png)

在 **破裂模式（Fracture Mode）** 下，你可以直接使用 **选择工具** 选择几何体集合的骨骼。

你可以在 **选择（Select）** 分段找到选择工具，其中包含以下选项：

![选择工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f108f471-8512-40d8-bedd-45cb5031159e/destruction-selection-22.png)

名称

说明

**全部（All）**

选择几何体集合中的所有骨骼。

**反转（Invert）**

对几何体集合中当前选择的骨骼进行反向选择。

**无（None）**

取消选择几何体集合中的所有骨骼。

**父节点（Parent）**

选择当前选定的骨骼的父骨骼。

**子节点（Children）**

选择当前选定的骨骼的所有子骨骼。

**兄弟节点（Siblings）**

选择所有与当前选定的骨骼具有相同父骨骼的骨骼。

**级别（Level）**

选择层级中同一级别的所有骨骼。

**接触节点（Contact）**

选择所有与任何当前选定骨骼相邻的骨骼。

**交互式（Interactive）**

启用交互式选择模式，在该模式下，你可以使用选框和筛选在几何体集合中选择所需数量的骨骼。

你可以在视口中按住 **CTRL** 并直接点选几何体集合中的多个骨骼（破裂片段）。

### 选择所有节点

点击 **全部（All）** 按钮可选择几何体集合中的所有骨骼。这包括层级中每个级别的所有骨骼。

![点击全部按钮可选择几何体集合中的所有骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e4a2e07-b3d9-4401-8dac-5d83b1696763/destruction-selection-9.png)

### 反转你的选择

使用选择工具，或按住CTRL+点击，可以选择破裂网格体的个体骨骼。然后，点击 **反转（Invert）** 按钮反向选择。

![点击反转按钮进行反向选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de0e4e8c-cdde-4176-9444-151523b97ee6/destruction-selection-10.png)

## 取消选择所有骨骼

点击 **无（None）** 按钮可取消选择几何体集合中的所有骨骼。

![点击无按钮可取消选择所有骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f9316ea-6aa1-436c-b5cd-391e504d89cf/destruction-selection-11.png)

### 选择父骨骼

选择作为几何体集合中另一骨骼子项的骨骼。点击 **父节点（Parent）** 可选择层级中选定子骨骼的直接父骨骼。

![点击父节点按钮可选择该骨骼的父骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c4530c0-b2a1-4871-a8d5-781127ffde54/destruction-selection-14.png)

在下例中，选择子骨骼87，然后点击父节点（Parent），就会选择它的父骨骼，即骨骼12。

![层级中的父骨骼已选定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4a96359-8a45-4cc4-a196-0cf1d3bc0ff1/destruction-selection-12.png)

### 选择子骨骼

选择父骨骼并点击 **子节点（Children）**，可选择选定父骨骼的所有子骨骼。

在下例中，骨骼12的所有子项都已选定。

![层级中的所有子骨骼都已选定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e970e7e-b20e-4a20-95f5-9097ebb6cfc7/destruction-selection-13.png)

### 选择兄弟骨骼

选择几何体集合中的骨骼。点击 **兄弟节点（Siblings）** 可选择所有与选定骨骼具有相同父项的骨骼。

![点击兄弟节点按钮可选择所有父节点相同的骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ed4deb6-d829-4d12-bbeb-de63147907b5/destruction-selection-14.png)

在下例中，骨骼87已选定。点击兄弟节点（Sibling）时，系统会选定骨骼12的所有子项，因为它们共有同一父骨骼。

![层级中所有父节点相同的骨骼都已选定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23db96a0-185b-4d4c-916c-bba4e6a86a96/destruction-selection-15.png)

### 选择所有处于同一层级级别的骨骼

选择几何体集合中的骨骼。点击 **级别（Level）** 可选择所有在层级中处于同一级别的骨骼。

![点击级别可选择所有在层级中处于同一级别的骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f050c7fd-b7f4-4a6b-b9bd-b88da0c1ea56/destruction-selection-16.png)

在下例中，几何体集合包含的若干骨骼在它们的破裂树中处于同一层级级别。在选择了骨骼5的情况下，点击选择工具中的级别（Level）时，系统将选择所有其他处于同一层级级别的骨骼，例如骨骼6、7和8。

![层级中所有级别相同的骨骼都已选定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43d60d14-442e-4cd1-a27f-c5d195ec1d9d/destruction-selection-17.png)

## 骨骼的接触选择

点击 **接触节点（Contact）** 可选择几何体集合中所有与当前选定骨骼相邻的骨骼。

![点击接触节点按钮可选择所有与当前选定骨骼相邻的骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db293379-823a-4ed7-8ff3-80bc5addfb43/destruction-selection-18.png)

## 骨骼的交互式选择

点击 **交互式（Interactive）** 可进入选框模式。在视口中左键点击并拖动鼠标可选择多个骨骼。你可以按住CTRL键拖动鼠标来取消对骨骼的选择。

交互式选择模式具有以下选项：

![交互式选择模式选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a758433a-d29d-4151-94f7-0acd61aac0ee/destruction-selection-23.png)

选项

说明

**鼠标选择方法（Mouse Selection Method）**

决定骨骼选择方法。**矩形选择（Rect Select）** 使用一个矩形区域来选择所有重叠骨骼。**标准选择（Standard Select）** 允许通过直接在每个骨骼上点击鼠标左键的方式来选择骨骼。

**体积选择方法（Volume Selection Method）**

决定在计算由筛选操作选择的骨骼时所使用的方法。

**选择操作（Selection Operation）**

决定是否从当前选择中 **替换（replace）**、**添加（add）** 或 **删除（remove）** 筛选操作。

**最小体积破裂（Min Volume Fracture）**

决定为选择考虑的最小骨骼体积。

**最大体积破裂（Max Volume Fracture）**

决定为选择考虑的最大骨骼体积。

你可以使用 **筛选器设置（Filter Settings）**，按骨骼大小筛选你的选择。如果将 **最大体积破裂（Max Volume Fracture）** 增加到 **1**，将在筛选器操作中包括所有骨骼大小。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db5081dc-b681-491b-b4f5-f2706a8fc61f/destruction-selection-19.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db5081dc-b681-491b-b4f5-f2706a8fc61f/destruction-selection-19.png)

点击查看大图。

使用 **最小体积破裂（Min Volume Fracture）** 可筛选掉最小的骨骼。执行此操作，直至选择满足你的需要。一个常见示例是，将最小骨骼排除在选择范围之外，以便为最大的骨骼额外增加一个破裂级别。

![你可以开始通过增加最小体积破裂，筛选掉最小的骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45e5dcf8-ddf6-45aa-a250-73e2f3ceec7a/destruction-selection-filter.gif)

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [chaos](https://dev.epicgames.com/community/search?query=chaos)
-   [destruction](https://dev.epicgames.com/community/search?query=destruction)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [破裂几何体集合](/documentation/zh-cn/unreal-engine/fracture-mode-selection-tools-user-guide#%E7%A0%B4%E8%A3%82%E5%87%A0%E4%BD%95%E4%BD%93%E9%9B%86%E5%90%88)
-   [使用选择工具](/documentation/zh-cn/unreal-engine/fracture-mode-selection-tools-user-guide#%E4%BD%BF%E7%94%A8%E9%80%89%E6%8B%A9%E5%B7%A5%E5%85%B7)
-   [选择所有节点](/documentation/zh-cn/unreal-engine/fracture-mode-selection-tools-user-guide#%E9%80%89%E6%8B%A9%E6%89%80%E6%9C%89%E8%8A%82%E7%82%B9)
-   [反转你的选择](/documentation/zh-cn/unreal-engine/fracture-mode-selection-tools-user-guide#%E5%8F%8D%E8%BD%AC%E4%BD%A0%E7%9A%84%E9%80%89%E6%8B%A9)
-   [取消选择所有骨骼](/documentation/zh-cn/unreal-engine/fracture-mode-selection-tools-user-guide#%E5%8F%96%E6%B6%88%E9%80%89%E6%8B%A9%E6%89%80%E6%9C%89%E9%AA%A8%E9%AA%BC)
-   [选择父骨骼](/documentation/zh-cn/unreal-engine/fracture-mode-selection-tools-user-guide#%E9%80%89%E6%8B%A9%E7%88%B6%E9%AA%A8%E9%AA%BC)
-   [选择子骨骼](/documentation/zh-cn/unreal-engine/fracture-mode-selection-tools-user-guide#%E9%80%89%E6%8B%A9%E5%AD%90%E9%AA%A8%E9%AA%BC)
-   [选择兄弟骨骼](/documentation/zh-cn/unreal-engine/fracture-mode-selection-tools-user-guide#%E9%80%89%E6%8B%A9%E5%85%84%E5%BC%9F%E9%AA%A8%E9%AA%BC)
-   [选择所有处于同一层级级别的骨骼](/documentation/zh-cn/unreal-engine/fracture-mode-selection-tools-user-guide#%E9%80%89%E6%8B%A9%E6%89%80%E6%9C%89%E5%A4%84%E4%BA%8E%E5%90%8C%E4%B8%80%E5%B1%82%E7%BA%A7%E7%BA%A7%E5%88%AB%E7%9A%84%E9%AA%A8%E9%AA%BC)
-   [骨骼的接触选择](/documentation/zh-cn/unreal-engine/fracture-mode-selection-tools-user-guide#%E9%AA%A8%E9%AA%BC%E7%9A%84%E6%8E%A5%E8%A7%A6%E9%80%89%E6%8B%A9)
-   [骨骼的交互式选择](/documentation/zh-cn/unreal-engine/fracture-mode-selection-tools-user-guide#%E9%AA%A8%E9%AA%BC%E7%9A%84%E4%BA%A4%E4%BA%92%E5%BC%8F%E9%80%89%E6%8B%A9)
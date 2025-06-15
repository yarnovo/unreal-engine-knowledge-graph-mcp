# 虚幻引擎群集几何体集合用户指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cluster-geometry-collections-user-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:48:18.846Z

---

目录

![群集几何体集合用户指南](https://dev.epicgames.com/community/api/documentation/image/ab9f648e-ae53-4aa6-984b-fdf774414335?resizing_type=fill&width=1920&height=335)

你可以观看[破裂和群集](https://dev.epicgames.com/community/learning/tutorials/k84m/chaos-destruction-fracture-and-clustering)教程，在开发人员社区站点找到视频格式的类似信息。

**破裂模式（Fracture Mode）** 是一种[关卡编辑器模式](/documentation/zh-cn/unreal-engine/level-editor-modes-in-unreal-engine)，其中包含各种工具，包括 **Chaos破坏系统（Chaos Destruction System）** 用于创建、破裂和操控 **几何体集合（Geometry Collections）** 的工具，几何体集合是用于在虚幻引擎中模拟实时破裂的资产类型。

几何体集合破裂时，将创建新的 **破裂级别** 。这会在几何体集合的 **破裂层级（Fracture Hierarchy）** 窗口中反映出来。

![几何体集合破裂时，将创建新的破裂级别](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1bf5904-432f-4f3a-a5d7-ffa133b3f7dd/destruction-cluster-8.png)

你还可以在 **级别统计数据（Level Statistics）** 面板中查看破裂级别的摘要。

![级别统计数据面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bf0a882-a4ca-45da-bbd1-1d5d8cbbece2/destruction-cluster-9.png)

层级中的每个破裂级别表示几何体集合的一个 **骨骼群集**（破裂的片段）。换句话说，就破裂模拟而言，分组在相同级别的所有骨骼都将视为一个组。

群集有助于减轻模拟对性能的影响，因为系统需要同时计算的碰撞更少。在模拟期间，高级别群集将先折断，低级别群集后折断。在上面的例子中，级别1（20个片段）将先折断，然后是级别2（87个），以此类推。

群集可以实现更逼真的破坏模拟，因为现实世界的大部分物体在首次受到压力时，会破裂为较大的片段。你还可以使用群集向你的几何体集合应用不同的破裂模式，让你的可破坏对象呈现不同的艺术效果。

你可以在模拟期间选择你的几何体集合并参考 **细节（Details）** 面板，从而启用或禁用群集。向下滚动到 **群集（Clustering）** 分段并切换 **启用群集（Enable Clustering）** 复选框。

![向下滚动到](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa71cf7e-a7b0-4cef-86d3-b6adbdb47706/destruction-cluster-10.png) ![群集已启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a96d96cb-190e-459f-9f67-30b903237363/destruction-cluster-clustering.gif) ![群集已禁用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65f83041-7db3-4fdf-b30d-380a558b4c03/destruction-cluster-noclustering.gif)

破裂模式有各种工具可用于在几何体集合中调整骨骼群集。这样你可以更好地控制模拟的性能和美观情况。

在本指南中，你将学习可用的群集工具的用法。

学习群集工具的前提是，你知道如何创建几何体集合并使其破裂。如果你不熟悉该过程，请参阅[几何体集合用户指南](/documentation/zh-cn/unreal-engine/geometry-collections-user-guide)和[破裂用户指南](/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide)。

## 群集工具

在本小节中，你将学习如何使用破裂模式下可用的群集工具。

### 自动群集

![自动群集工具已选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33b9c0e5-03b0-46e9-9d8d-1b94de745e38/destruction-cluster-11.png)

**自动（Auto）** 群集工具使用指定数量的 **群集站点（Cluster Sites）** 创建骨骼群集。这样你可以精准地控制在将群集操作应用于几何体集合时创建的群集数量。你还可以启用 **强制群集连接（Enforce Cluster Connectivity）** 复选框，指定归为一组的骨骼是否应该连接起来。

![自动群集工具使用指定数量的群集站点创建骨骼群集](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2378e2d0-f3cf-4bbd-8a39-4d4db5514b33/destruction-cluster-12.png)

该工具基于分支，这意味着它会基于 **破裂层级（Fracture Hierarchy）** 中选择的当前骨骼数量创建群集。

下方示例使用 **均匀Voronoi（Uniform Voronoi）** 破裂工具创建了 **500** 个站点。

![几何体集合破裂为500个站点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fca793f8-ef84-4c91-9134-6ad4cd23ccdc/destruction-cluster-13.png)

你可以在级别统计数据面板或破裂层级窗口中查看层级。

![级别统计数据面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58846a11-a33f-46f3-934d-2942ef034d53/destruction-cluster-14.png)

选择 **自动（Auto）** 群集工具并输入 **200个群集站点** 。

![选择自动群集工具并输入200个群集站点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96e7690e-6a2b-40b1-bc02-1850aba9f1c5/destruction-cluster-15.png)

点击 **自动群集（Auto Cluster）** 按钮查看结果。

![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a4cee21-8f30-4e26-93ac-94d4f3c4b815/destruction-cluster-37.png)

现在你可以看到结果。

![级别1现在有200个骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a315d4bb-de9b-41c0-bd55-9f10bcb9a8c4/destruction-cluster-16.png)

重复该过程，添加额外的100、50和15个群集站点。

![新层级反映了你创建的群集](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e6b5c13-0f2c-4f55-b6d6-7a2a6e892074/destruction-cluster-17.png)

如你所见，你可以创建所需任意数量的破裂级别（群集）来实现所需效果。

### 磁性群集

![磁性群集工具已选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff3948fb-a716-450f-adcd-f114d983d3b4/destruction-cluster-18.png)

**磁性群集（Magnet Cluster）** 工具通过将当前选择内容的所有连接骨骼归为一组来创建骨骼群集。你可以指定 **迭代（Iterations）** 次数，从而控制使用该操作分组的骨骼数量。

![磁性群集工具中的迭代次数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75b6e267-a621-46c4-96ab-a3f2a5b61ae7/destruction-cluster-20.png)

下方示例使用了 **1** 个迭代来群集所选内容的外环上的所有骨骼。

![群集之前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97f4002d-eb11-44aa-a47f-f975eb9d5e76/destruction-cluster-19a.png)

![群集之后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14252cd2-a88e-424b-9b62-21e1bb5d1e05/destruction-cluster-19b.png)

群集之前

群集之后

*点击查看大图。*

*点击查看大图。*

在此例子中，使用了 **2** 个迭代来群集所选内容中的两个外环。

![群集之前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f3f5628-5817-434a-b3b6-76ca4b8e4aa9/destruction-cluster-19b.png)

![群集之后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9b13038-424a-4446-ad53-231ca6f1dea3/destruction-cluster-19c.png)

群集之前

群集之后

*点击查看大图。*

*点击查看大图。*

磁性群集工具还可以同时处理多个所选内容。在下方示例中，该工具用于同时为1个迭代选择的3个骨骼。你可以看到，每次我们应用该操作时，每个所选内容的连接骨骼是单独群集的。

![每次你应用该操作时，每个所选内容的连接骨骼是单独群集的](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/caa8a883-0ea5-406b-a915-e8821960ce60/destruction-cluster-magnet.gif)

### 扁平化群集

![扁平化群集工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/766b135c-6e4b-4e5d-8aee-1355d270de30/destruction-cluster-38.png)

**扁平化（Flatten）** 群集工具会将骨骼层级扁平化，删除 **破坏层级（Destruction Hierarchy）** 的中间级别。这可用于删除中间破裂步骤，直达最终破裂模式。

在下方示例中，几何体集合在第一个级别破裂为光束（级别1），然后进一步破裂为区块（级别2）。

![级别1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0c826c4-6833-4f8d-939c-1b4acf0eb288/destruction-cluster-21a.png)

![级别2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/abc0ea31-7a9f-405e-8818-803faf214121/destruction-cluster-21b.png)

级别1

级别2

*点击查看大图。*

*点击查看大图。*

我们可以使用扁平化群集工具将层级扁平化，并完全删除光束配置。选择层级中的根骨骼，然后点击 **扁平化（Flatten）**。

![使用扁平化之前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38d57276-b361-4267-8f46-9b9a96e05658/destruction-cluster-22a.png)

![使用扁平化之后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3f82ec1-5343-4a6d-b629-1d64c755b482/destruction-cluster-22b.png)

使用扁平化之前

使用扁平化之后

*点击查看大图。*

*点击查看大图。*

### 群集和取消群集

![群集和取消群集工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e32de4f-8e74-4a2a-aecc-25d6d3cb36d1/destruction-cluster-39.png)

**群集（Cluster）** 工具会根据当前骨骼所选内容创建骨骼群集。**取消群集（Uncluster）** 工具会从当前所选内容删除骨骼群集。这样你可以完全控制几何体集合中群集的创建。

在下方示例中，我们将几何体集合破裂为区块，层级中有两个级别。

![几何体集合在破裂级别中有两个级别](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99f80f72-7df7-4539-b1da-c8387946e703/destruction-cluster-23.png)

选择一组骨骼，点击 **群集（Cluster）** 为所选骨骼创建新群集。

![使用群集之前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a196916-28f1-4cb7-8469-91a679934514/destruction-cluster-24a.png)

![使用群集之后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee61416f-7669-4cff-991b-71a061a94dc2/destruction-cluster-24b.png)

使用群集之前

使用群集之后

*点击查看大图。*

*点击查看大图。*

重复该过程，再创建两个群集。

![重复该过程，再创建两个群集](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b180fe80-1972-4b1c-a396-f15496a1facb/destruction-cluster-25.png) ![群集之后的新层级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70451222-8cb0-4ab8-920f-c55903043b68/destruction-cluster-26.png)

你可以使用 **取消群集（Uncluster）** 工具删除群集，方法是在层级中选择骨骼，然后点击 **UnClstr**。

![使用取消群集之前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79013aee-cc98-475d-965a-e6fea7cdddc8/destruction-cluster-27a.png)

![使用取消群集之后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dce58d0e-c6ee-4124-8e99-77d0c48eb84e/destruction-cluster-27b.png)

使用取消群集之前

使用取消群集之后

*点击查看大图。*

*点击查看大图。*

### 合并群集

![合并工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac8acea8-621d-41aa-aba7-8f3d7395ecb5/destruction-cluster-40.png)

**合并（Merge）** 群集工具会将多个群集合并为单个群集，并保持层级中的相同结构。

这可用于在你的模拟的层级中保持特定数量的骨骼。

在下方示例中，级别1有三个群集的几何体集合。如果我们选择两个群集并点击 **群集（Cluster）** ，这两个群集会合并为一个群集。但是，层级现在如下所示：

![使用群集之前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9832ea83-e1de-45ce-8436-143bd833a3cb/destruction-cluster-28a.png)

![使用群集之后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13177619-f857-4d67-b29f-351781f58e5f/destruction-cluster-28b.png)

使用群集之前

使用群集之后

*点击查看大图。*

*点击查看大图。*

如你所见，层级在该操作之后发生变化。相反，如果我们使用 **合并（Merge）** 群集工具，层级将保持不变：

![使用合并之前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/195f89ee-ba16-494d-9c2f-ec96155d1415/destruction-cluster-28a.png)

![使用合并之后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d66ecfbb-95e2-45f3-8f54-1f05f98f2c68/destruction-cluster-28c.png)

使用合并之前

使用合并之后

*点击查看大图。*

*点击查看大图。*

### 级别上移群集

![级别上移群集工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e963d00-d0cd-4c9c-9c3e-df92f1443277/destruction-cluster-41.png)

**级别上移（Level Up）** 群集工具可将所选骨骼移至层级中的更高级别。在 **破裂层级（Fracture Hierarchy）** 窗口中选择所需的节点，然后点击 **级别上移（Level Up）** 查看结果。

你还可以选择根骨骼并点击 **级别上移（Level Up）**，从而对整个层级执行此操作。

![使用级别上移工具之前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/380b005c-11c9-49b0-aa41-f5857f9abc82/destruction-cluster-29a.png)

![使用级别上移工具之后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bfe3f6ff-9873-4a02-a959-cc28d865d77d/destruction-cluster-29b.png)

使用级别上移工具之前

使用级别上移工具之后

### 拖放群集

你可以手动创建骨骼群集，直接在 **破裂层级（Fracture Hierarchy）** 窗口中拖放骨骼即可。你可以将群集或叶节点拖入其他群集中。

在下方示例中，几何体集合在层级的 **级别1（Level 1）** 中有 **2** 个骨骼，在 **级别2（Level 2）** 中有 **25** 个骨骼。

![级别1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2dfb9db8-59cd-4443-be10-f5f909ff810c/destruction-cluster-30a.png)

![级别2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97a8605c-a615-43c2-a8bd-14b48b7ddb1c/destruction-cluster-30b.png)

级别1

级别2

*点击查看大图。*

*点击查看大图。*

你可以选择层级中的任意骨骼并移动它，从而改变上述级别中的群集。

![你可以选择层级中的任意骨骼并移动它，从而改变上述级别中的群集](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68e645f7-c5a1-475f-ab28-5e665facdac2/destruction-cluster-manual-cluster.gif)

## 嵌入式几何体工具

破裂模式随附了一些工具，可用于将其他几何体嵌入破裂模拟中。嵌入式几何体的主要用途是进一步提升视觉效果的复杂性，增强模拟。为此，嵌入式几何体没有碰撞，也不被视为模拟的一部分。

常见例子就是使用嵌入式几何体创建建筑物的内部结构。这可以是墙内的钢筋、电缆或水泥浆。

在下方示例中，我们有一个沿对角线分割的几何体集合。将 **静态网格体（Static Mesh）** 拖入几何体集合中，并确保它与几何体集合相交。

![将静态网格体拖入几何体集合中，并确保它们相交](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3bcd9459-0751-427c-b23d-a124ff617f43/destruction-cluster-31.png)

复制静态网格体，并将其移至几何体集合另一侧。

![复制静态网格体，并将其移至几何体集合另一侧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48e8d1c2-b62c-47df-b27b-a626cd1cf023/destruction-cluster-32.png)

同时选择静态网格体和几何体集合，转至 **嵌入（Embed）** 分段，点击 **自动（Auto）** 。

![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f14aa809-0009-4a3f-a894-b3325c6fa872/destruction-cluster-33.png)

现在你可以从该级别中删除静态网格体。你会注意到，静态网格体看起来仍与几何体集合相交。

转至 **内容浏览器（Content Browser）** ，打开 **几何体集合（Geometry Collection）** 资产。向下滚动到 **嵌入式几何体范例（Embedded Geometry Exemplar）** 分段并将其展开。注意，静态网格体已添加到列表中，并有 **实例数量（Instance Count）** ，表示我们正在使用几何体集合中的2个网格体实例。

![向下滚动到](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dab5507d-d5e9-4d6b-bafe-75ad637c7ba9/destruction-cluster-34.png)

你可以继续将静态网格体添加到几何体集合，方法是点击 **自动（Auto）** ，将其嵌入几何体集合中。

![网格体嵌入了其在几何体集合中的相应骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2d8b3c6-9c1a-4fe5-91da-9221ea567081/destruction-cluster-embedded-1.gif)

如果你想嵌入不与几何体集合重叠的静态网格体，请选择几何体集合中的骨骼和静态网格体，然后点击 **嵌入（Embed）** 。

![选择静态网格体和几何体集合的骨骼并点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ca5d352-6315-4ab5-b975-eaf087df93e4/destruction-cluster-35.png) ![网格体嵌入几何体集合骨骼而不与之重叠](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e083e600-cb82-498e-80f9-18a2ce24e9dc/destruction-cluster-embedded-2.gif)

点击 **清空（Flush）** 从几何体集合删除所有嵌入的几何体。

![你可以点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/802dd8a5-43b9-4aec-8b08-463f2cbaf671/destruction-cluster-36.png)

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [chaos](https://dev.epicgames.com/community/search?query=chaos)
-   [destruction](https://dev.epicgames.com/community/search?query=destruction)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [群集工具](/documentation/zh-cn/unreal-engine/cluster-geometry-collections-user-guide-in-unreal-engine#%E7%BE%A4%E9%9B%86%E5%B7%A5%E5%85%B7)
-   [自动群集](/documentation/zh-cn/unreal-engine/cluster-geometry-collections-user-guide-in-unreal-engine#%E8%87%AA%E5%8A%A8%E7%BE%A4%E9%9B%86)
-   [磁性群集](/documentation/zh-cn/unreal-engine/cluster-geometry-collections-user-guide-in-unreal-engine#%E7%A3%81%E6%80%A7%E7%BE%A4%E9%9B%86)
-   [扁平化群集](/documentation/zh-cn/unreal-engine/cluster-geometry-collections-user-guide-in-unreal-engine#%E6%89%81%E5%B9%B3%E5%8C%96%E7%BE%A4%E9%9B%86)
-   [群集和取消群集](/documentation/zh-cn/unreal-engine/cluster-geometry-collections-user-guide-in-unreal-engine#%E7%BE%A4%E9%9B%86%E5%92%8C%E5%8F%96%E6%B6%88%E7%BE%A4%E9%9B%86)
-   [合并群集](/documentation/zh-cn/unreal-engine/cluster-geometry-collections-user-guide-in-unreal-engine#%E5%90%88%E5%B9%B6%E7%BE%A4%E9%9B%86)
-   [级别上移群集](/documentation/zh-cn/unreal-engine/cluster-geometry-collections-user-guide-in-unreal-engine#%E7%BA%A7%E5%88%AB%E4%B8%8A%E7%A7%BB%E7%BE%A4%E9%9B%86)
-   [拖放群集](/documentation/zh-cn/unreal-engine/cluster-geometry-collections-user-guide-in-unreal-engine#%E6%8B%96%E6%94%BE%E7%BE%A4%E9%9B%86)
-   [嵌入式几何体工具](/documentation/zh-cn/unreal-engine/cluster-geometry-collections-user-guide-in-unreal-engine#%E5%B5%8C%E5%85%A5%E5%BC%8F%E5%87%A0%E4%BD%95%E4%BD%93%E5%B7%A5%E5%85%B7)
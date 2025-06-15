# 虚幻引擎编辑工具用户指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/edit-tools-user-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:48:19.568Z

---

目录

![编辑工具用户指南](https://dev.epicgames.com/community/api/documentation/image/2769542c-c641-430b-8dfa-f732ec380192?resizing_type=fill&width=1920&height=335)

你可以在Epic开发者社区中找到类似信息的视频，可以观看[破碎和集束](https://dev.epicgames.com/community/learning/tutorials/k84m/chaos-destruction-fracture-and-clustering)视频教程。

**破碎模式（Fracture Mode）** 包含的编辑工具可以从几何体集合层级移除不想要的骨骼（破碎的碎片），也可以隐藏或者取消隐藏特定的骨骼。这些工具可以在创建复杂的几何体集合破碎效果时提供高效的工作流程。

在该指南中，你将会学习如何使用 **编辑（Edit）** 面板中的工具。

在了解编辑工具之前，你应该熟悉如何创建几何体集合并使其破碎。如果你还不了解这些操作，请参考[几何体集合用户指南](/documentation/zh-cn/unreal-engine/chaos-destruction-key-concepts-in-unreal-engine)和[破碎用户指南](/documentation/zh-cn/unreal-engine/fracturing-geometry-collections-user-guide)。

## 几何体集合破碎

在该小节中，你将要创建一个几何体集合并使其破碎，从而了解 **破碎模式（Fracture Mode）** 中的编辑工具。

1.  在关卡中从静态网格体Actor创建一个几何体集合。
    
    ![Create a Geometry Collection from a Static Mesh Actor in your Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ae273a4-973d-4219-92ff-7184921dae48/destruction-cluster-6.png)
2.  选择以下方式之一，使几何体集合破碎。在下面的示例中，我们使用 **切片（Slice）** 工具来将几何体集合切成8块。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69708c13-ce90-45fc-817b-4fb146ac45af/destruction-cluster-7.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69708c13-ce90-45fc-817b-4fb146ac45af/destruction-cluster-7.png)
    
    点击查看大图。
    

## 使用编辑工具

### 削减工具

**削减（Prune）** 工具用于从破碎层级中移除任何选中的骨骼（破碎的碎片）。

在视口或者层级中选择一个或多个骨骼。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/246c068f-d0fc-4456-9fa9-9eff487cf48a/destruction-edit-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/246c068f-d0fc-4456-9fa9-9eff487cf48a/destruction-edit-1.png)

点击查看大图。

点击 **削减（Prune）** 来移除选中的骨骼。

![Click Prune to remove the selected bones](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/608d2b6e-6481-4699-9201-8cbb10e95a55/destruction-edit-2.png)

该工具通常用于移除几何体集合破碎之后重叠的几何体或者不想要的骨骼。

![The selected bone has been removed](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b053d0b9-36e5-44c5-8f4d-aedaaaf5b845/destruction-edit-3.png)

## 可视性工具

**可视性（Visibility）** 工具用于在视口中临时隐藏选中的骨骼。如果想要重点处理层级中特定的一些骨骼，可以使用该功能。

单击 **编辑（Edit）** 类目中的 **隐藏（Hide）** 以隐藏所有选定的骨骼。

![Click Hide in the Edit category to hide all selected Bones](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f45c38d7-2954-4bc8-9281-44846aa280b5/destruction-edit-7.png)

![显示所有骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ea0ace7-2d37-400b-ac70-fc8e97d048f0/destruction-edit-4a.png)

![隐藏选定的骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b324de1a-0018-4bde-9850-ed4ae2ad38d2/destruction-edit-4b.png)

显示所有骨骼

隐藏选定的骨骼

要显示被隐藏的骨骼，在 **破碎层级（Fracture Hierarchy）** 中将它们选中，然后点击 **取消隐藏（Unhide）**。

![Select the Bones in the Fracture Hierarchy](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e06a4801-a4ab-4c8d-bda9-e84450adb535/destruction-edit-5.png) ![Click Unhide to show the Bones in the viewport](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9dd713a-969d-41d3-bbea-5cecd605e2d4/destruction-edit-6.png) 

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [chaos](https://dev.epicgames.com/community/search?query=chaos)
-   [destruction](https://dev.epicgames.com/community/search?query=destruction)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [几何体集合破碎](/documentation/zh-cn/unreal-engine/edit-tools-user-guide-in-unreal-engine#%E5%87%A0%E4%BD%95%E4%BD%93%E9%9B%86%E5%90%88%E7%A0%B4%E7%A2%8E)
-   [使用编辑工具](/documentation/zh-cn/unreal-engine/edit-tools-user-guide-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%BC%96%E8%BE%91%E5%B7%A5%E5%85%B7)
-   [削减工具](/documentation/zh-cn/unreal-engine/edit-tools-user-guide-in-unreal-engine#%E5%89%8A%E5%87%8F%E5%B7%A5%E5%85%B7)
-   [可视性工具](/documentation/zh-cn/unreal-engine/edit-tools-user-guide-in-unreal-engine#%E5%8F%AF%E8%A7%86%E6%80%A7%E5%B7%A5%E5%85%B7)
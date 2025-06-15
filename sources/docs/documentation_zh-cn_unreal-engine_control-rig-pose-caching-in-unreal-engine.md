# 虚幻引擎中的控制绑定姿势缓存 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/control-rig-pose-caching-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:15:11.903Z

---

目录

![姿势缓存](https://dev.epicgames.com/community/api/documentation/image/8d2d3b18-ee72-499f-bf62-077cdb09f13e?resizing_type=fill&width=1920&height=335)

控制绑定中的姿势缓存功能用于在控制绑定图表中的不同时间保存和应用动画姿势。所有 **[绑定元素](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine)** 都可以缓存到姿势中，并且可以访问绑定图表中的不同属性，例如曲线值或变换。

本文档概述了姿势缓存功能以及如何存储和应用姿势。

#### 先决条件

-   你已经为角色创建控制绑定资产。有关如何执行此操作的信息，请参阅 **[控制绑定快速入门指南](/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine)** 页面。

## 快速入门

下面是显示如何存储和检索姿势的快速指南。

### 存储姿势

姿势在控制绑定的 **我的蓝图（My Blueprint）** 面板中存储为变量。要创建新的姿势变量，请点击 **变量（Variables）** 类别上的 **添加(+)（Add (+)）** 按钮，并将变量类型设置为 **绑定姿势（Rig Pose）** 。

![绑定姿势变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5b870d4-8622-4ad5-94b9-03c27448eaf4/posevar.png)

接下来，将变量拖入绑定图表中并选择 **设置（Set）**，以在图表中将该变量作为 **设置（Set）** 操作进行引用。

![绑定姿势引用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/181773a5-8b46-48f5-bb55-0056b448035d/store1.png)

然后，在图表中右键点击并选择 **获取姿势缓存（Get Pose Cache）**，以创建 **获取姿势缓存（Get Pose Cache）** 节点。连接 **姿势（Pose）** 和 **值（Value）** 引脚。

![获取姿势缓存](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42402046-a9ec-4b9a-98fe-35160234f510/store2.png)

最后，将"设置（Set）"节点连接到一个事件。在此示例中，你可以将其连接到 **[设置事件](/documentation/zh-cn/unreal-engine/control-rig-forwards-solve-and-backwards-solve-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E4%BA%8B%E4%BB%B6)** ，其中将存储角色的初始A姿势。

![存储控制绑定姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/edfa997c-325d-477b-8813-b9acddc28536/store3.png)

### 应用姿势

姿势使用 **应用姿势缓存（Apply Pose Cache）** 节点来应用，该节点从你的绑定姿势变量读取值。

首先，将绑定姿势变量拖入图表中并选择 **获取（Get）**，以在图表中将该变量作为 **获取（Get）** 操作进行引用。

![绑定姿势引用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6a1fa55-1b06-4231-a1f2-5b89d369e030/apply1.png)

然后，在图表中右键点击并选择 **应用姿势缓存（Apply Pose Cache）**，以创建 **应用姿势缓存（Apply Pose Cache）** 节点。连接 **姿势（Pose）** 和 **值（Value）** 引脚。还要将其连接到一个事件，这样你可以预览其评估，比如 **[正向解算](/documentation/zh-cn/unreal-engine/control-rig-forwards-solve-and-backwards-solve-in-unreal-engine#forwardssolve)** 事件。

![应用姿势缓存](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6beddcab-5695-4f0c-ab05-81db2e594607/apply2.png)

由于你应用的是整个姿势，因此你可以编辑 **权重（Weight）** 值来预览姿势效果。对于此示例，你还可以使用 **[预览场景设置](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine#%E9%A2%84%E8%A7%88%E5%9C%BA%E6%99%AF%E8%AE%BE%E7%BD%AE)** 中的预览控制器，以便更好地查看姿势应用情况。

![应用姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0165690e-76a0-46c3-9a16-248659c656fa/apply3.gif)

## 姿势缓存节点

以下姿势缓存节点可供在控制绑定图表中使用：

名称

图像

说明

**应用姿势缓存（Apply Pose Cache）**

![应用姿势缓存](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b8c6325-7b1f-448f-82b4-7d61117cb3bb/node_apply.png)

应用保存的姿势。包括用于设置绑定元素的属性、变换空间、要设置的项目以及权重。

**对于每个姿势缓存元素（For Each Pose Cache Element）**

![对于每个姿势缓存元素](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc65ec43-c9bd-4cb9-b035-0b55f7ca22ff/node_loop.png)

此节点在给定姿势中的所有项目中以迭代方式执行。

**获取姿势缓存（Get Pose Cache）**

![获取姿势缓存](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e60f760-0cfb-4dd7-96ac-8dfbd8576cce/node_get.png)

基于 **要获取的项目（Items to Get）** 绑定元素类型的输入来保存姿势。如果未指定项目，则将使用所有项目。

**获取姿势缓存曲线（Get Pose Cache Curve）**

![获取姿势缓存曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7545418a-d241-4325-a448-6cf46a082723/node_getcurve.png)

从保存的姿势获取单个 **[动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)** 。

**获取姿势缓存增量（Get Pose Cache Delta）**

![获取姿势缓存增量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01a26124-5ca6-4cff-befd-20d11e84d7ba/node_getdelta.png)

比较两个姿势并输出比较检查布尔值。

**获取姿势缓存项目（Get Pose Cache Items）**

![获取姿势缓存项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d00d632-8c04-4fa5-bce2-3de7e18957eb/node_getitems.png)

在项目数组中返回绑定元素。

**获取姿势缓存变换（Get Pose Cache Transform）**

![获取姿势缓存变换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8abca522-53ec-4541-8f9c-550c5d3ae083/node_gettrans.png)

从姿势中的单个绑定元素获取变换或动画曲线值。

**获取姿势缓存变换数组（Get Pose Cache Transform Array）**

![获取姿势缓存变换数组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b3faea9-9928-4f37-a7a5-f0f61324dcfc/node_getarray.png)

获取姿势中所有项目的变换并将其作为变换数组返回。

**姿势缓存是否为空（Is Pose Cache Empty）**

![姿势缓存是否为空](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92d6c700-1013-48c3-bf69-3fecbceeb456/node_empty.png)

检查姿势是否为空。

**绘制姿势缓存（Draw Pose Cache）**

![绘制姿势缓存](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c00d127-4c10-470b-b631-0a911c811c53/node_draw.png)

在视口中保存的姿势上绘制轴调试信息。它仅绘制姿势中保存的元素。

![绘制姿势缓存](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9580be02-41d4-420e-abd7-7c11aabf7456/debugdraw.png)

与姿势缓存相关的大多数节点都包含以下常见属性：

![应用姿势缓存](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5234b62c-b6d0-4d9c-86e8-bd72e312ba65/node_apply.png)

名称

说明

**元素类型（Element Type）**

保存姿势时要筛选的绑定元素。你可以从以下元素选择：

-   **骨骼（Bones）**
-   **Nulls**
-   **功能按钮（Controls）**
-   **曲线（Curves）**
-   **所有（All）**

**空间（Space）**

姿势信息应该在变换空间中存储和应用。可以是 **本地（Local）** 或 **全局（Global）** 空间。

**要设置的项目（Items to Set）**

保存姿势时要包含的绑定元素的数组。如果此处未设置内容，则将根据指定的 **元素类型（Element Type）** 包含所有元素。

## 工作流程示例

通过使用数组构建节点（如 **获取子节点（Get Children）** ），你可以仅获取一部分绑定元素以保存到姿势中。这一步在你只想将姿势保存并应用到特定元素中时很有用。

![部分应用姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/adad7863-0137-4645-9830-a0ec344996ce/childrenexample.gif)

**分支（Branch）** 之类的执行节点可用于在特定时间或状态保存姿势。

![分支设置姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/faa8d9a2-7d5e-40b4-9427-881492990b65/branch.png)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [control rig](https://dev.epicgames.com/community/search?query=control%20rig)
-   [pose caching](https://dev.epicgames.com/community/search?query=pose%20caching)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/control-rig-pose-caching-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [快速入门](/documentation/zh-cn/unreal-engine/control-rig-pose-caching-in-unreal-engine#%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8)
-   [存储姿势](/documentation/zh-cn/unreal-engine/control-rig-pose-caching-in-unreal-engine#%E5%AD%98%E5%82%A8%E5%A7%BF%E5%8A%BF)
-   [应用姿势](/documentation/zh-cn/unreal-engine/control-rig-pose-caching-in-unreal-engine#%E5%BA%94%E7%94%A8%E5%A7%BF%E5%8A%BF)
-   [姿势缓存节点](/documentation/zh-cn/unreal-engine/control-rig-pose-caching-in-unreal-engine#%E5%A7%BF%E5%8A%BF%E7%BC%93%E5%AD%98%E8%8A%82%E7%82%B9)
-   [工作流程示例](/documentation/zh-cn/unreal-engine/control-rig-pose-caching-in-unreal-engine#%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B%E7%A4%BA%E4%BE%8B)
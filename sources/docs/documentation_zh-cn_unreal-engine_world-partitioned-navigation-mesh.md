# 世界分区寻路网格体 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh
> 
> 生成时间: 2025-06-14T19:43:22.409Z

---

目录

![世界分区寻路网格体](https://dev.epicgames.com/community/api/documentation/image/62795c09-985a-4e38-8a27-5697333490b9?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

## 概述

本文档旨在介绍如何通过虚幻引擎的 **世界分区（World Partition）** 系统使用世界分区 **寻路网格体** 。

世界分区是一种自动数据管理和基于距离的关卡流送系统，为大型世界管理提供了完整的解决方案。该系统将你的世界存储在分隔为网格单元的单个持久关卡中，无需将大型关卡划分为子关卡，并提供自动流送系统，以基于与流送源的距离加载和卸载这些单元。

阅读[世界分区](/documentation/zh-cn/unreal-engine/world-partition-in-unreal-engine)文档，了解有关该系统的更多信息。

## 世界分区寻路网格体

一个世界分区寻路网格体可分为多个寻路网格体数据块Actor，后者可像其他世界分区资源一样加载/卸载。

世界分区寻路网格体仅在世界分区地图背景下才有意义。要转换地图，就需要使用世界分区，请参阅[世界分区](/documentation/zh-cn/unreal-engine/world-partition-in-unreal-engine)文档。

你也可以创建新关卡并选择开放世界（Open World）模板，从而创建世界分区地图。

## 运行时生成

世界分区寻路网格体支持所有可用的生成模式：**静态（Static）** 、 **仅限静态修饰符（Dynamic Modifiers Only）** 和 **动态（Dynamic）** 。

## 动态模式

使用动态生成模式时，寻路网格体图块生成将在运行时进行。然而，对于作为基础寻路网格体的一部分加载和卸载的对象，寻路脏污（需要重新构建寻路）将被忽略（见下文）。这样可以防止由于加载和卸载世界而导致的过度脏污。

使用世界分区动态寻路网格体时，动态图块构建仅限于加载的空间。

## 基础寻路网格体和数据层

所有运行时寻路生成模式均使用 **基础寻路网格体（Base Navmesh）** 。这里指加载单元时通过流送加载的初始寻路网格体。

在静态模式下，寻路网格体不会改变。然而，在静态模式下，生成的与寻路相关的Actor将弄脏基础寻路网格体，并触发寻路图块的重新构建。

### 基础寻路网格体中包含什么？

数据层以外的寻路相关对象将包含在基础寻路网格体中（即在初始寻路网格体中烘焙）。此外，还包含编辑器数据层中的所有对象。

最后，基础寻路网格体中还将考虑基础寻路网格体数据层列表中的所有层（包括运行时数据层）。

阅读[数据层](/documentation/zh-cn/unreal-engine/world-partition---data-layers-in-unreal-engine)文档，了解有关世界分区数据层的更多信息。

## 外部打包

构建世界分区寻路网格体时，寻路数据Actor（ANavigationData）在外部打包。这意味着构建世界分区寻路网格体不会弄脏主地图。

有关外部打包的更多信息，请参阅[一个Actor一个文件](/documentation/zh-cn/unreal-engine/one-file-per-actor-in-unreal-engine)文档。

## 创建世界分区寻路网格体

### 1 - 必要设置

1.  在 **游戏（Games）** 类别中，根据模板新建项目。在此示例中，我们选择了 **第三人称（Third Person）** 模板。
    
    ![新建项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d1eeb51-41fc-496d-82bd-ab6700433c63/wp-navmesh-1.png)
2.  在编辑器中，点击 **文件（File）> 新关卡（New Level）** 。选择 **开放世界（Open World）** 地图类型，并点击 **创建（Create）** 。保存关卡。
    
    ![创建新的开放世界关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f50e2cb4-187e-4a3c-979b-28174ae1594e/wp-navmesh-2.png)
    
    开放世界默认地图类型设计为创建大型开放世界地图的起始点，默认启用以下功能：
    
    -   世界分区
    -   一个Actor一个文件
    -   数据层
    -   分层细节级别
3.  前往 **世界设置（World Settings）** 窗口，并向下滚动至 **世界分区（World Partition）** 分段。
    
    1.  展开 **运行时设置（Runtime Settings）> 网格（Grids）> 索引\[0\]（Index \[0\]）** 。
        
    2.  将 **加载范围（Loading Range）** 值更改为 **12800** 。当通过世界分区加载寻路网格体时，值越小，越容易查看。
        
    
    ![创建新的开放世界关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/493489c6-0d1d-4da0-9034-6ff1fd487f55/wp-navmesh-2b.png)

#### 阶段成果

在此阶段，你新建了一个项目，关卡设置为使用世界分区。在下一阶段中，你将配置寻路网格体，以便配合世界分区使用。

### 2 - 配置寻路网体，以使用世界分区

1.  点击 **设置（Settings） > 项目设置（Project Settings）** ，打开 **项目设置（Project Settings）** 窗口。
    
    ![点击设置 > 项目设置，打开项目设置窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93df2f68-18f8-4657-b7ec-1dbae74db0f6/wp-navmesh-3.png)
2.  点击 **寻路网格体（Navigation Mesh）** 类别，并向下滚动至 **运行时（Runtime）** 分段。点击 **运行时生成（Runtime Generation）** 下拉菜单，并选择 **静态（Static）** 。
    
    ![点击运行时生成下拉菜单并选择静态](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2cd61c3-84c2-48f4-889c-aec676f7bebd/wp-navmesh-4.png)
3.  如果你的项目有大型世界，前往 **生成（Generation）** 分段，启用 **固定的图块池大小（Fixed Tile Pool Size）** 复选框，并调整 **图块池大小（Tile Pool Size）** ，你可以限制内存占用。池大小将限制寻路网格体占用的内存大小。
    
    池中的图块数必须足够多，以便允许你添加： *运行时在加载气泡中加载寻路网格体Actor所需的最大图块数量。* 当加载部分世界分区地图时，你要在编辑中呈现的最大图块数量。
    
    ![点击运行时生成下拉菜单并选择静态](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a26a064-c645-4570-a24a-5ea774f50141/wp-navmesh-4a.png)
4.  依次点击 **添加+（Add +）> 体积（Volumes）> NavMeshBoundsVolume** ，将 **寻路网格体（Navigation Mesh）** 体积Actor添加到你的关卡中。
    
    ![将寻路网格体体积Actor添加你的关卡中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ba92ad9-7872-41dc-9dd5-2ee54fd0d8e6/wp-navmesh-5.png)
5.  在 **大纲视图（Outliner）** 窗口中，选择 **NavMeshBoundsVolume** Actor，并前往 **细节（Details）** 面板。
    
    1.  **缩放** Actor，以便其能覆盖关卡中的可运行空间。
        
    2.  按 **P** 可查看视口中构建的寻路。
        
    
    ![在大纲视图窗口中选择NavMeshBoundsVolume Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/365a4625-168b-4075-9a99-b0d21f88f5cc/wp-navmesh-6.png) ![按P可查看视口中构建的寻路](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3038df63-e64b-46d3-b470-5dc92153be2a/wp-navmesh-7.png)
6.  在 **大纲视图（Outliner）** 窗口中，选择 **RecastNavMesh-Default** Actor，并前往 **细节（Details）** 面板。向下滚动至 **生成（Generation）** 分段，并 **启用** **是世界分区寻路网格体（Is World Partitioned Navmesh）** 复选框。
    
    ![在大纲视图窗口中选择RecastNavMesh-Default Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84abee9c-0359-46fe-8666-2abef7d42a18/wp-navmesh-8.png) ![启用是世界分区复选框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/999315e2-d6c7-48eb-97a7-9d079ca87af1/wp-navmesh-9.png)

#### 阶段成果

在此阶段，你将寻路网格体边界（Navigation Mesh Bounds）体积添加到了你的关卡中。你还配置了寻路网格体，以与世界分区配合使用。

在下一阶段，你将配置编辑器以改善你的工作流。

### 3 - 配置编辑器

由于你很有可能要处理一个非常大的关卡，推荐你禁用自动寻路网格体生成，以改善你的工作流。

为此，请按照下列步骤操作：

1.  点击 **编辑（Edit）> 编辑器偏好设置（Editor Preferences）** ，打开 **偏好设置（Preferences）** 窗口。
    
    ![点击编辑 - 编辑器偏好设置以打开偏好设置窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6a9f937-039d-44a1-805d-b6916c5f287d/wp-navmesh-10.png)
2.  向下滚动至 **关卡编辑器（Level Editor）** 分段，点击 **杂项（Miscellaneous）** 类别。向下滚动至 **编辑（Editing）** 类别，并禁用 **自动更新寻路（Update Navigation Automatically）** 复选框。
    
    ![禁用自动更新寻路复选框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e317c72f-4e57-4a42-98fb-54793d048f7d/wp-navmesh-11.png)

#### 阶段成果

在此阶段，你配置了寻路网格体，所以它不会自动更新。当你使用世界分区处理大型世界时，这样做通常可以改善你的工作流。

在下一阶段，你将在你的关卡中构建寻路网格体。

### 4 - 构建寻路网格体

使用世界分区地图时，有些资产通常会在另一些资产卸载时加载。因此，构建完整的寻路网格体需要不同的流程。

要在你的关卡中构建寻路网格体，需执行以下步骤：

1.  在命令行中输入以下控制台命令，然后按 **Enter** ： **n.bNavmeshAllowPartitionedBuildingFromEditor 1**
    
    ![输入命令n.bNavmeshAllowPartitionedBuildingFromEditor 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1b53213-6a2c-42e2-954b-d965d627aed0/wp-navmesh-12.png)
2.  点击 **构建（Build）> 构建路径（Build Paths）** ，在你的关卡中构建寻路网格体。
    
    ![点击构建 - 构建路径在你的关卡中构建寻路网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1fb765ce-ed2d-4500-9269-904828a6187c/wp-navmesh-13.png)
3.  在 **构建寻路设置（Build Navigation Settings）** 窗口中，点击 **确定（Ok）** 构建寻路网格体。还有以下选项供你选择：
    
    1.  **详细（Verbose）** - 如果你想要查看更详细的构建流程日志，可启用此复选框。在项目的 **已保存（Saved）> 日志（Logs）** 目录中，你可以找到名为 **WPNavigationBuilderLog.txt** 的输出日志。
        
    2.  **清理包（Clean Packages）** - 如果你想要从项目中删除所有的世界分区寻路网格体Actor包，可启用此选项。这样做将不会构建寻路。
        
    
    ![构建寻路设置选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03eef1b1-caa2-4a13-8705-1d16d38a84e2/wp-navmesh-14.png)
4.  前往 **大纲视图（Outliner）** 窗口，可以看到现在有四个 **NavDataChunk** Actor。这些Actor携有世界分区加载和卸载的寻路数据。已创建NavDataChunk Actor的数量取决于数据块网格的大小（如需了解更多详情，请参阅第6小节）。
    
    ![前往大纲视图窗口，可以看到现在有四个NavDataChunk Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66def8fc-351f-486b-bd5a-4f1b40929730/wp-navmesh-14b.png)

#### 阶段成果

在此阶段，你了解了如何为你的关卡构建寻路。你还了解了不同的寻路设置选项，以及如何在你的关卡中创建NavDataChunk Actor。

在下一阶段，你将了解如何在编辑器之外构建寻路。

### 5 - 使用世界分区寻路数据构建器构建寻路网格体

将 **WorldPartitionBuilderCommandlet** 与 **WorldPartitionNavigationDataBuilder** 结合使用，也可以在编辑器之外构建世界分区静态寻路网格体。

遵照[世界分区](/documentation/zh-cn/unreal-engine/world-partition-in-unreal-engine)文档中 **世界分区寻路数据构建器（World Partition Navigation Data Builder）** 小节中的指引，了解如何操作。

### 6 - 寻路网格体的其他设置

1.  前往 **世界设置（World Settings）** 窗口，并向下滚动至 **寻路（Navigation）** 分段，找到关卡的 **寻路网格体（Navigation Mesh）** 设置。
    
    选项如下：
    
    设置
    
    说明
    
    寻路数据块网格大小（Navigation Data Chunk Grid Size）
    
    此选项定义了世界分区每个单元加载的数据块Actor的大小。值越小，数据粒度越细。
    
    寻路数据构建器加载单元大小（Navigation Data Builder Loading Cell Size）
    
    此选项定义了用于将寻路数据加载到内存的加载单元的大小。
    
    将 **寻路数据块网格大小（Navigation Data Chunk Grid Size）** 设置为 **25600** 。值越小，越能更好地展示世界分区如何加载和卸载寻路网格体。应基于Gameplay需求、加载范围和所需粒度调整此值。
    
    ![将寻路数据块网格大小设置为25600](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48d55b9c-65be-498e-befa-dae8201b065c/wp-navmesh-15.png)
2.  点击 **构建（Build）> 构建路径（Build Paths）** ，在你的关卡中构建寻路网格体。
    
3.  前往 **大纲视图（Outliner）** 窗口，可以看到关卡中多了很多 **NavDataChunk** Actor。这符合预期，因为数据块网格大小比之前要小。
    
    ![关卡中多了很多 **avDataChunk** Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37068595-2b4c-434a-a4b0-3974636b7d3f/wp-navmesh-16.png)

#### 阶段成果

在此阶段，你了解了如何更改寻路数据块网格大小及其如何影响关卡中创建的NavDataChunk Actor的数量。

在下一阶段，你将看到当玩家穿越关卡时，如何加载和卸载寻路网格体。

### 7 - 世界分区设置

除了寻路网格体设置，你还可以使用以下世界分区设置设置你的地图。

命令

说明

**wp.Runtime.RuntimeSpatialHashPlacePartitionActorsUsingLocation = 0**

如果设置为0，在检查是否应加载时，分区Actor将使用其边界（而非其位置）。当使用加载半径较小的大型地形图块时，此设置很有用。

**LevelStreaming.ShouldReuseUnloadedButStillAroundLevels 0**

此设置将在关卡流出后强制进行垃圾回收。这将删除世界分区已卸载的寻路Actor。否则，可能需要一些时间回收卸载的Actor。

### 8 - 查看成果

执行以下步骤查看如何通过世界分区单元加载和卸载寻路网格体。

1.  在命令行中输入以下寻路网格体Gameplay调试控制台命令，按 **Enter** ：
    
    1.  **ai.debug.nav.RefreshInterval 0.3**
        
    2.  **ai.debug.nav.DisplaySize 100**
        
    
    这些命令可调整显示尺寸以及寻路网格体可视化的更新频率。
    
    ![输入ai.debug.nav.DisplaySize 100命令](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9bb9dc8-5879-47b5-b12f-f274af4d3302/wp-navmesh-17.png)
2.  按 **运行（Play）** 启动游戏。按 **波浪号（~）** 打开命令行，然后输入以下世界分区调试命令：
    
    1.**wp.Runtime.ToggleDrawRuntimeHash2D**
    
    1.  **wp.Runtime.ShowRuntimeSpatialHashGridLevel 2**
    
    这些命令可显示玩家周围加载了哪些世界分区单元。
    
    ![在Gameplay期间，你可以看到玩家周围加载了哪些世界分区单元](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2c93180-8141-466a-b38c-2d1664ea154c/wp-navmesh-18.png)
3.  按 **单引号（'）** 启用 **Gameplay调试器（Gameplay Debugger）** ，按 **零** **（0）** 可切换至 **寻路（Navigation）** 视图。你可以查看玩家周围加载的寻路网格体。
    
    ![你可以查看玩家周围加载的寻路网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61e22ef5-eb17-4922-8e22-746f5c13bc12/wp-navmesh-19.png)
4.  在关卡中移动，并查看当每个世界分区单元在玩家周围加载时寻路网格体如何加载。
    
    ![在关卡中移动，并查看寻路网格体如何在玩家周围加载](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e1054d5-3a32-4022-a54e-a21cc8bf51f9/wp-navmesh-demo-1.gif) ![在玩家周围加载的寻路网格体的顶视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90fe6326-23fb-4b83-a2e6-cf6e94d39545/wp-navmesh-demo-2.gif)

#### 阶段成果

在此阶段，你了解了如何呈现当世界分区加载和卸载寻路网格体时的情形。

-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [navigation](https://dev.epicgames.com/community/search?query=navigation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#%E6%A6%82%E8%BF%B0)
-   [世界分区寻路网格体](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#%E4%B8%96%E7%95%8C%E5%88%86%E5%8C%BA%E5%AF%BB%E8%B7%AF%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [运行时生成](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#%E8%BF%90%E8%A1%8C%E6%97%B6%E7%94%9F%E6%88%90)
-   [动态模式](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#%E5%8A%A8%E6%80%81%E6%A8%A1%E5%BC%8F)
-   [基础寻路网格体和数据层](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#%E5%9F%BA%E7%A1%80%E5%AF%BB%E8%B7%AF%E7%BD%91%E6%A0%BC%E4%BD%93%E5%92%8C%E6%95%B0%E6%8D%AE%E5%B1%82)
-   [基础寻路网格体中包含什么？](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#%E5%9F%BA%E7%A1%80%E5%AF%BB%E8%B7%AF%E7%BD%91%E6%A0%BC%E4%BD%93%E4%B8%AD%E5%8C%85%E5%90%AB%E4%BB%80%E4%B9%88%EF%BC%9F)
-   [外部打包](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#%E5%A4%96%E9%83%A8%E6%89%93%E5%8C%85)
-   [创建世界分区寻路网格体](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#%E5%88%9B%E5%BB%BA%E4%B8%96%E7%95%8C%E5%88%86%E5%8C%BA%E5%AF%BB%E8%B7%AF%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [1 - 必要设置](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#1-%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [阶段成果](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C)
-   [2 - 配置寻路网体，以使用世界分区](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#2-%E9%85%8D%E7%BD%AE%E5%AF%BB%E8%B7%AF%E7%BD%91%E4%BD%93%EF%BC%8C%E4%BB%A5%E4%BD%BF%E7%94%A8%E4%B8%96%E7%95%8C%E5%88%86%E5%8C%BA)
-   [阶段成果](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-2)
-   [3 - 配置编辑器](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#3-%E9%85%8D%E7%BD%AE%E7%BC%96%E8%BE%91%E5%99%A8)
-   [阶段成果](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-3)
-   [4 - 构建寻路网格体](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#4-%E6%9E%84%E5%BB%BA%E5%AF%BB%E8%B7%AF%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [阶段成果](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-4)
-   [5 - 使用世界分区寻路数据构建器构建寻路网格体](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#5-%E4%BD%BF%E7%94%A8%E4%B8%96%E7%95%8C%E5%88%86%E5%8C%BA%E5%AF%BB%E8%B7%AF%E6%95%B0%E6%8D%AE%E6%9E%84%E5%BB%BA%E5%99%A8%E6%9E%84%E5%BB%BA%E5%AF%BB%E8%B7%AF%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [6 - 寻路网格体的其他设置](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#6-%E5%AF%BB%E8%B7%AF%E7%BD%91%E6%A0%BC%E4%BD%93%E7%9A%84%E5%85%B6%E4%BB%96%E8%AE%BE%E7%BD%AE)
-   [阶段成果](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-5)
-   [7 - 世界分区设置](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#7-%E4%B8%96%E7%95%8C%E5%88%86%E5%8C%BA%E8%AE%BE%E7%BD%AE)
-   [8 - 查看成果](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#8-%E6%9F%A5%E7%9C%8B%E6%88%90%E6%9E%9C)
-   [阶段成果](/documentation/zh-cn/unreal-engine/world-partitioned-navigation-mesh#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-6)
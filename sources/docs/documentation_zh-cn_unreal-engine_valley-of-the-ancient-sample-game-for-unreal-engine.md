# 虚幻引擎《古代山谷》示例 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:50:12.709Z

---

目录

![《古代山谷》示例](https://dev.epicgames.com/community/api/documentation/image/cfa521c1-d7d6-4b76-82f5-c5429dc217d6?resizing_type=fill&width=1920&height=335)

**《古代山谷》（Valley of the Ancient）** 是一个简短的游戏示例，展示了虚幻引擎5（Unreal Engine 5）的诸多最新功能。玩家可以控制UE5宣传片中的主角Echo，跟随她探索干旱的峡谷地形，寻找通往神秘暗黑世界的传送门。一路上，她将穿越众多障碍，并与强大的远古巨人交战。在这个示例中，你将一窥UE5在使用体验上的优化、渲染效果上的强化、以及工作流程中的创新。

本文将带领你领略这些令人兴奋的新功能，展示Epic Games团队如何利用这些功能突破实时渲染技术的极限，同时最大程度简化高真实度开放场景的创建流程。

## 概述

《古代山谷》的亮点包括：

-   基于Nanite和Lumen的高端渲染效果。
-   基于Megascans资产和全新几何体工具创建的大型场景。
-   基于改良后的Chaos破裂工作流创建的可破坏资产。
-   全新的关卡文件和关卡Actor组织规范，让基于同一地图的团队协作更方便。
-   基于全身逆向运动学（Full Body IK）和运动扭曲的实时可调节动画，使角色动作实时匹配游戏场景。
-   可在运行时完整加载和卸载的模块化Gameplay系统。
-   基于全新Metasounds系统创建的程序化音效。
-   基于Quartz同步游戏体验和音乐的动态音乐系统。

## 获取《古代山谷》示例

要安装古代山谷示例项目，请按以下步骤操作：

1.  通过 **Fab** 访问[古代山谷示例](https://fab.com/s/a38f8ea9c116)，点击 **添加到我的库（Add to My Library）**，让项目文件出现在 **Epic Games启动程序** 中。
    1.  或者，你也可以在UE的Fab插件中搜索该示例项目。
2.  在 **Epic Games启动程序** 中，找到 **虚幻引擎 > 库 > Fab库** 以访问项目。
    
    只有在你安装了兼容的引擎版本时，示例项目才会出现在 **Fab库** 中。
    
3.  点击 **创建项目（Create Project）** 并按照屏幕上的提示下载示例并启动新项目。

关于访问示例内容及虚幻引擎的Fab插件，详见[示例与教程](/documentation/zh-cn/unreal-engine/samples-and-tutorials-for-unreal-engine)。

### 推荐的系统规格

此示例拥有大量的高品质图形内容，因此需要高性能显卡才能以稳定帧率运行。我们还建议将示例项目安装在固态硬盘中，因为Nanite和虚拟纹理需要高速读取才能实现最佳效果。推荐的硬件规格如下：

推荐系统配置 （100%屏幕百分比）

最低系统配置 （50%屏幕百分比）

-   12-core CPU at 3.4 GHz
-   64 GB of system RAM
-   GeForce RTX 2080 / AMD Radeon 5700 XT 或更高型号

-   12-core CPU at 3.4 GHz
-   32 GB of system RAM
-   GeForce GTX 1080 / AMD RX Vega 64

Nanite仅支持Nvidia的Maxwell GPU和AMD的GCN GPU（或更高版本）。请确保你的显卡安装了最新的驱动程序。

假如系统配置较低，你可以调整视口屏幕百分比来获得更好的性能。在最低配置下，我们建议你设置成50%或更低。你可以使用编辑器视口左上角 **视口选项菜单（Viewport Options Menu）** 中的 **屏幕百分比（Screen Percentage）** 滑块来设置。

![视口选项菜单中的屏幕百分比滑块](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/784558ff-6604-4021-a123-24c44dd2557a/screenpercentageslider.png)

或者，你可以用控制台命令 `r.ScreenPercentage` 在运行时设置这个值。

## 初识UE5编辑器

UE5的 **虚幻编辑器（Unreal Editor）** 保留了虚幻引擎4编辑器的所有功能，同时也对工作流程和用户体验进行了大量改进。在探索《古代山谷》前，大家不妨先来熟悉一下。

![UE5主界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fc60da3-888d-4731-b71b-400dae488259/ue5_initial.png)

### 内容侧滑菜单

**内容侧滑菜单（Content Drawer）** 位于编辑器的左下角。你可以点击内容侧滑菜单（Content Drawer）按钮，也可按 **CTRL+空格键（CTRL+Spacebar）** 打开或关闭它。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7cf633dd-84b2-41c3-bf30-fe001650c8de/ue5_contentdrawer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7cf633dd-84b2-41c3-bf30-fe001650c8de/ue5_contentdrawer.png)

点击 **停靠在界面中（Dock in Layout）** 可以创建一个持续停靠在界面中的内容浏览器，显示效果就和UE4中的内容浏览器一样。停靠中的内容浏览器和内容侧滑菜单可以同时使用。你也可以点击主工具栏中的 **内容（Content）** 下拉菜单来管理内容浏览器。这提升了内容浏览器的灵活性，还能让你在必要时隐藏内容浏览器，从而增加编辑器视口的可用画面。

内容浏览器本身的布局也有所修改——左侧会固定显示一个树形目录结构，右侧则有一个全新的 **设置（Settings）** 菜单。你可以在设置菜单中配置资产的显示方式，包括视图类型、缩略图大小和内容过滤器。

### 选择编辑器模式

现在你能点击主工具栏中的图标来切换 **编辑器模式（Editor Modes）**。

![主工具栏中的编辑器模式图标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7482ad55-0e00-4632-b544-c546d96d4b79/editormodeicons.png)

除了UE4用户熟悉的传统模式，其中还包括一些强大功能的新模式。具体如下所示：

编号

编辑器模式

说明

1

选择（Select）

默认编辑模式，用于在游戏场景中选择资产并编辑细节。

2

地形（Landscape）

雕刻、绘制和管理地形。

3

植被（Foliage）

绘制并调整场景中的植被。

4

网格体绘制（Mesh Painting）

用于在场景网格体上绘制顶点的工具。支持绘制颜色、权重或纹理。

5

破裂（Fracture）

基于Chaos破坏系统的工具，用于让静态网格体产生破裂效果。

6

笔刷编辑（Brush Editing）

经典的笔刷几何体编辑器。使用笔刷工具在正交视口下绘制内容，然后根据需要使用其他工具微调内容。

7

动画（Animation）

用于控制Control Rig、快速添加姿势和简单设置Tween的工具。

8

建模（Modeling）

一个完整的多边形几何体编辑套件。允许你使用基本图元来建模或修改场景中的单个网格体。

## 了解项目

项目打开后，它会首先打开 **启动（Startup）** 地图。《古代山谷》的大部分内容都包含在 **AncientWorld** 地图中，在 **AncientContent** > **地图（Maps）** 文件夹中可以找到这张地图。

场景的大部分相关文件都在游戏的内容（Content）目录中，但是"Hover Drone"和"Ancient One"的资产位于游戏功能插件（Game Feature Plugins）中，与游戏的基本项目是相互独立的。"Hover Drone"的资产位于 **HoverDrone Content** 目录中，而光镖技能以及与"Ancient One"的战斗素材位于 **AncientBattle Content** 目录中。要显示这些目录，请在内容侧滑菜单中点击"设置（Settings）"按钮，然后勾选 **显示插件内容（Show Plugin Content）**。

![在内容侧滑菜单的设置中突出显示的](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1bcc691-5f11-4c65-9876-0b57b90f1fe2/navigation_plugincontent.png)

这个场景是游戏的默认场景。尽管《古代山谷》是一个大型场景，但并没有像UE4那样使用关卡流送来流送子关卡。相反，它使用 **世界分区（World Partitions）** 和 **数据层（Data Layers）** 将场景划分成可独立编辑的部分。

要查看整个场景，请点击 **窗口（Window）> 世界分区（World Partition）**。这会打开世界分区（World Partition）窗口，窗口中是世界场景的简化地图。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a015deb3-c6d7-48ce-a8fd-4d6bb50c766d/navigationworldpartition.png)

你可以用鼠标滚轮来放大场景的不同区域，也可以点击并拖动地图中的单元格来选中某片区域。选中某片单元后点击右键，再点击 **加载所选单元（Load Selected Cells）**，就能将所选区域加载到主视口中。同样，你可以使用 **卸载所选单元（Unload Selected Cells）** 移除你不想显示的单元，降低电脑的工作负担。

我们建议你不要同时加载所有的世界场景单元，而是只加载希望查看或编辑的区域。单元的加载数量取决于系统的可用内存大小。如需了解该系统，请参阅下文中的[世界分区](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E4%B8%96%E7%95%8C%E5%88%86%E5%8C%BA)章节。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2826d41d-0187-41ef-81d7-052ecf7660c1/navigationloadingcells.png)

要查看游戏中暗黑世界或光明世界相关的数据层，请点击 **窗口（Window）> 数据层（Data Layers）**，打开数据层（Data Layers）窗口。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4182eec7-6cd8-442f-8541-4d2bcbbc9ee7/navigationdatalayers.png)

你可以用此窗口启用或禁用场景的某个数据层。要查看暗黑世界，请启用 **暗黑世界（Dark World）** 数据层。要查看光明世界，请启用 **Campfire Replace**、**植被（Foliage）** 和 **主区域山脉（Hero Area Mountain Range）** 数据层。**Campfire Geometry** 数据层应该始终打开。试着开启/关闭这些数据层，感受两种场景的不同效果。

有关这些系统的详情、它们的实现方式，以及它们为开发流程带来的好处，请参阅[协同构建大型开放世界](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E5%8D%8F%E5%90%8C%E6%9E%84%E5%BB%BA%E5%A4%A7%E5%9E%8B%E5%BC%80%E6%94%BE%E4%B8%96%E7%95%8C)。

## 视效更高端、迭代更快

虚幻引擎5的目标不仅是打造高真实度视效的新标杆，同时也是为各行各业提供最易使用的实时高分辨率应用创建平台。在本节中，我们将详细介绍UE5的新渲染功能是如何丰富《古代山谷》中的细节，并介绍开发团队在制作该示例时享受到的高效和便捷性。

### 直接导入Quixel Megascans资产

![犹他州Megascans资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8939fb4-b100-4a3c-9117-0fef11b574ac/megascansassetimage.png)

在古代山谷使用的场景类静态网格体和纹理中，从犹他州莫阿布收集的Quixel Megascans资产约占环境中资产的90%。这些内容位于内容侧滑菜单的 **AncientContent** \> **Megascans** 文件夹中。

![内容侧滑菜单中的Ancient Content Megascans文件夹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd9f8221-f6fc-45e9-96ef-1b4d1d0640a6/megascansassetslocation.png)

所有这些资产都可以在[犹他州峡谷](https://quixel.com/megascans/collections?category=environment&category=natural&category=canyons-of-utah)Megascans素材包中找到。此外，Quixel Bridge现在直接集成到了虚幻编辑器中。在导入或管理Megascans资产时，你无需使用任何外部程序。UE5会自动生成所需的材质实例和网格体，它们可以在游戏中直接使用。在下文中，你将感受到UE5在处理高分辨率资产时的高效，还将了解到UE5工具赋予场景美术团队在地形编辑上的灵活性。

### Nanite虚拟化几何体

场景中的资产无一使用了传统的LOD技巧，也没有进行额外优化。相反，它们启用了 **Nanite**。Nanite从磁盘流送静态网格体资产，然后用虚拟几何体表示它们；它会根据用户的视口分辨率动态调整多边形数量。虚拟纹理在纹理细节上也会产生类似的效果。随着用户在场景中移动，场景细节会实时更新。距离近的对象接收的细节较多，距离远的对象接收的细节较少，但屏幕上的总体细节水平大致不变。

![Nanite流送细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f179ec87-1174-407b-ac06-4147bbc13c6a/nanitedetailedworld.png)

得益于Nanite，《古代山谷》的场景直接使用了数百个拥有海量多边形的Megascans资产，并且没有做任何准备工作。即使是场景中的峭壁——使用了多达数千万个多边形和超大分辨率纹理——也可以即时渲染，技术美术师无需进行任何设置。你甚至可以直接在游戏中使用Zbrush中的高模雕刻模型。

如需实时查看Nanite效果，请点击 **查看模式（View Mode）** 下拉菜单，并将其从光照（Lit）更改为 **Nanite可视化（Nanite Visualization）> 三角形（Triangles）**。

[在"查看模式"下拉菜单中选择"三角形"可视化](/documentation/404)

引擎将实时显示Nanite输出的三角形效果。

![标准渲染](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1a29de0-20ba-41d9-aa5b-47c0339ace5c/naniteechobefore.png)

![Nanite三角形可视化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8585895-aeb7-4bba-abad-5b0a91c25197/naniteechoafter.png)

标准渲染

Nanite三角形可视化

Nanite不支持变形，所以它只能用于静态网格体。不过仅凭这一点，它就足以让场景开发流程变得大为简化。此外，尽管Nanite无法用于骨骼模型变形，但在最后表现耸立的远古巨人时，我们通过将静态网格体绑定到骨骼网格体上，从而让巨人盔甲展现出Nanite级别的超高分辨率。

![标准渲染](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77b53a9b-46c2-4529-8376-02ff232cd702/naniteancientbefore.png)

![Nanite三角形可视化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f1155ff-8b5b-4330-9136-2d93657e0206/naniteancientafter.png)

标准渲染

Nanite三角形可视化

有关Nanite的详细用法和设置信息，请参阅[Nanite文档](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)。

### Lumen全局光照

峡谷中的光照细节十分丰富。这一切得益于虚幻引擎5的全动态全局光照和反射系统——Lumen。Lumen能渲染出动态、逼真的场景。场景中的间接光照能够根据直接光照和几何体的变化实时进行调整。通过结合新旧技术，Lumen得以实现高品质的实时效果。Lumen专为次世代主机和高端电脑设计，目标是在UE5发布时能在这些平台上实现30到60FPS的帧率。

![采用GI/天光](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a61aa310-ad55-45f1-85ba-27508fb0325a/lumenlandscapegi.png)

![不采用GI/天光](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a31d1858-7011-486f-8a77-95107664ee80/lumenlandscapenogi.png)

采用GI/天光

不采用GI/天光

Lumen是可扩展的，并且支持在各种DX11和DX12硬件上运行软件光追模式和硬件光追模式。《古代山谷》使用软件光追模式在场景中生成间接光照，该模式混合使用了 **屏幕追踪（Screen Traces）** （或屏幕空间追踪）与 **表面缓存（Surface Cache）**。Lumen使用屏幕追踪来掩盖低品质表面缓存可能引起的不一致。此类不一致是由各个网格体的有向距离场（Signed Distance Field）导致的。你可以使用 **显示（Show）** > **可视化（Visualize）** > **Lumen场景（Lumen Scene）** 来显示表面缓存。表面缓存只适用于前200米，超过200米后会改为使用屏幕追踪。

Lumen功能强大，它提供了大量质量设置，使它既能用于渲染Nanite虚拟化几何体，也能用于渲染传统的静态网格体；它的屏幕追踪功能还能让蒙皮网格体接收并影响间接光照（但仅限于屏幕空间）。在编辑器视口中点击 **显示（Show）** > **可视化（Visualize）** > **Lumen全局光照（Lumen Global Illumination）**，能够显示Lumen采用的各种技巧。

![标准渲染](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17fc6663-f661-48cf-9fee-9a4384b5b558/lumencampfire1.png)

![Lumen GI可视化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0bdaf87-9d53-4002-93db-fef7718ff9a2/lumencampfire2.png)

标准渲染

Lumen GI可视化

Lumen能够处理所有的可移动光源，包括作为光源的自发光材质。天光使用Lumen的最终采集（Final Gather）来处理天空阴影，这使得室内区域能比室外区域暗得多，有助于突显能够反射更多光线的浅色表面。

  ![不同光照下的篝火效果，从左到右分别是：启用Lumen/天光、禁用Lumen、同时禁用Lumen/天光。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f2d9060-2368-40a2-9e14-52c5c139298c/lumen1.png) ![不同光照下的篝火效果，从左到右分别是：启用Lumen/天光、禁用Lumen、同时禁用Lumen/天光。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d637c49-f7ed-4917-b8f4-20921c9fd4b1/lumen2.png) ![不同光照下的篝火效果，从左到右分别是：启用Lumen/天光、禁用Lumen、同时禁用Lumen/天光。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/339690f9-3f63-45f5-bb8f-4af094aadd74/lumen3.png)

不同光照下的篝火效果，从左到右分别是：启用Lumen/天光、禁用Lumen、同时禁用Lumen/天光。

由于Lumen兼顾了品质和渲染速度，并拥有"所见即所得"的特点，因此开发团队能够直观地为宏大的山谷地貌打光，无需费心调整传统流程中的各种光照选项。如需进一步了解Lumen及其用法，请参见[Lumen全局光照和反射系统](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)以及[Lumen技术细节](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine)文档。

### 使用新建模工具定制网格体

![建模编辑器示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94f246f4-7663-4a80-aa05-3a73ad5af0e2/modelingwarp.png)

场景中的许多Megascans网格体都不是直接从素材库中导入的原始网格体，而是在虚幻编辑器中进行了更改，以便适应地形的独特需求。《古代山谷》的场景美术师通过UE5的全新 **建模编辑器模式（Modeling Editor Mode）** 实现了这一点。

你可以像使用DCC工具一样使用建模编辑器来从头创建网格体；你也可以选中场景中的静态网格体或实例化静态网格体然后修改其外观。考虑到逐个编辑多边形会很麻烦，建模（Modeling）模式提供了许多变形工具和雕刻工具，允许你对大量网格体进行快速更改。

例如，假设有一个峭壁资产 `SM_umshejnga_High2`，你想让它看起来聚拢一些，你可以切换到建模编辑器模式，在视口中选中该网格体，然后对它应用 **弯曲（Bend）** 变形器。只需略作调整，你就可以将变形效果添加到网格体上。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bac9456-6dbd-49bc-b8fb-bb4417990a94/modelingbend1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bac9456-6dbd-49bc-b8fb-bb4417990a94/modelingbend1.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dacf3f1e-b70f-4414-97aa-6e5c88a74d4c/modelingbend2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dacf3f1e-b70f-4414-97aa-6e5c88a74d4c/modelingbend2.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71f66d1a-d4b7-4a56-85bf-c10f0c83911b/modelingbend3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71f66d1a-d4b7-4a56-85bf-c10f0c83911b/modelingbend3.png)

初始网格体

启用弯曲形变器后

采用弯曲形变器后的最终效果

点击查看大图。

只需一个高分辨率网格体，你就能衍生出各种独特的网格体，并且无需重做任何UV，而且品质和原来的网格体相当。这就使美术师能发挥出资产的最大作用，无需离开关卡编辑器就能根据需求实现各种美术概念。

### 使用打包的关卡实例来填充地形

古代山谷非常宏大，如果一个个去放置Megascans资产，那么即便是使用上文中提及的这些工具，也需要耗费很久才能创建出精细的效果。因此，古代山谷的场景美术团队使用 **关卡实例打包（Packed Level Instances）** 来组合成大规模场景。

关卡实例本质上是一种可以嵌套的关卡，可以添加到任何采用世界分区系统的游戏世界中。尽管世界分区系统并非必须使用关卡实例，但关卡实例是非常优秀的工具，能将场景内容分割成可复用的部分，或者将关卡拆分成更易管理的区域，以便在主关卡外部编辑。

要创建关卡实例，请在场景中选中一组对象，点击右键，然后点击 **根据选中项进行创建（Create From Selection）**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d59b4167-d1e1-4759-a720-abedd186b724/packedlevelinstancemenu.png)

这将打开 **新建关卡实例（New Level Instance）** 菜单，选择你要创建的关卡实例类型。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/434d226a-60c1-4c7c-ba53-2f392615cf91/levelinstancemenu.png)

点击 **确定（OK）** 之后，即可将新关卡实例保存为项目中的关卡文件，同时生成一个对应的蓝图资产。你选中的所有Actor都会被替换为一个包含着它们的关卡实例Actor。你可以使用关卡实例对应的关卡文件来编辑该实例，并使用关卡实例的蓝图资产来放置实例副本。

![放置关卡实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae1ef839-c77c-45bb-98fe-44a4950127d8/levelinstanceplacement.png)

操作关卡实例和操作关卡中的其他Actor一样简便。你还可以直接编辑关卡实例的组件。在关卡实例的 **细节（Details）** 面板中，点击 **关卡实例编辑（Level Instance Editing）** 中的 **编辑（Edit）** 按钮，即可将镜头对准该关卡实例。然后，你就能对照着游戏场景并编辑关卡实例的组件。

![编辑关卡实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98c29c15-f890-44fd-95f3-d3dfda0594be/levelinstanceediting.png)

完成后，点击 **提交更改（Commit Changes）** 来结束调整并返回游戏场景。此时会询问你是否保存更改。保存后，该关卡实例的所有副本都会应用更改效果。

![提交关卡实例的更改](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d67184d-9819-4289-bdf9-3532567316c2/commitlevelinstancechanges.png)

古代山谷主要是由打包后的关卡实例组建的。这类关卡实例不同于标准关卡实例，它们会忽略非静态网格体类型的Actor，然后将静态网格体转换成实例化静态网格体，以此减少组件资产产生的绘制调用次数。

此工作流使得场景美术团队可以独立构建出由许多大型场景区域构成的场景库，并以非破坏性的方式编辑它们。这不同于那些构成玩家周围可观察地形的小型多功能资产，以及可以构建很大一片远距离地形的巨型地理形状。尽管其中的很多场景区域都是由编辑器中的静态网格体资产组成的，但其中一些由团队以Megascans资产为基础定制的。这就为环境美术团队提供了一条灵活的场景搭建流程，可以在短短几周内对4平方公里的陆地进行逼真化细节处理。

你可以在 **AncientGameContent/Maps/MASS** 文件夹中找到这些区域场景的地图文件，可以在 **AncientGameContent/Geometry** 文件夹中找到与其对应的关卡实例Actor。有关如何使用这类工具的更多信息，请参阅[关卡实例](/documentation/zh-cn/unreal-engine/level-instancing-in-unreal-engine)。

### Chaos破坏系统工作流

在为古代山谷创建可破坏网格体时，例如在创建暗黑世界中的立柱以及巨人坟冢时，我们对UE5的 **Chaos破坏系统（Chaos Destruction）** 进行了大量改进。改进后的工作流结合了新的建模模式和 **破裂（Fracture）** 编辑器模式。

破坏系统的开发团队在准备网格体、创建目标破裂效果时大量使用了建模工具。**简化**、平面切割(**PlnCut**)、**偏移** 和 **置换**（添加一个噪点更多的表面）等工具使团队可以通过原始网格体雕刻出初始的破裂碎块。随后，可以使用破裂工具中的 **网格体破裂** 工具把这些网格体设置为目标。我们使用 **布尔（Boolean）** 工具来删除所有彼此穿透的网格体，仅在表面保留几何体。游离的多边形或几何体"孤岛"则用 **TriSel** 工具剔除。

![使用网格体工具在Chaos Mesa中创建平面切割](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58841437-ab03-454e-8e9d-2a5abdcf2216/chaosmesaplanarcuts.png)

在破裂编辑模式下，团队使用网格体破裂工具（ Mesh Fracture tool）将可破坏网格体分成较大的碎块。本质上，这个工具是用另一个网格体来"咬掉"几何体的一部分，作用类似于布尔减法工具，只不过会将网格体的各个部分留在原地。此工具创建的碎块将用作可破坏对象的主要碎块，并且能对对象破碎时的外观和方式进行一定程度的控制。在创建这些碎块后，团队使用更为传统的Voronoi破裂法（使用 **均匀（Uniform）** 或 **Cluster（群集）** 破裂工具），将块分解成更小的碎片。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/094b2b4e-996c-45f4-b528-7b05de1a1d4b/chaoscolumnmeshcut.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/094b2b4e-996c-45f4-b528-7b05de1a1d4b/chaoscolumnmeshcut.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/171da64d-1ea1-403e-809a-b1ffc680aee3/chaoscolumnmeshcutresult.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/171da64d-1ea1-403e-809a-b1ffc680aee3/chaoscolumnmeshcutresult.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e271f2a-aa3c-4208-98d2-5190eb53ad05/chaoscolumnvoronoi.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e271f2a-aa3c-4208-98d2-5190eb53ad05/chaoscolumnvoronoi.png)

在立柱上添加网格体剪切

添加网格体剪切效果后的立柱

添加Voronoi破裂效果

点击查看大图。

得益于UE5中推出的 **噪点（Noise）** 设置，这些碎块看起来更自然并且拥有不均匀的边缘。

![破裂模式的AutoUV工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6051983b-e81b-431e-9e39-5940764dedf2/chaosdestructiblemesh.png)

团队使用 **AutoUV** 工具为碎块资产的内部表面生成UV。这个工具会根据网格体的深度生成一张纹理（映射到梯度）。这样就能将材质融合到一起，并让破裂截面根据深度拥有不同的表面材质，从而形成更自然的外观。例如，横截面较深处的网格体看起来更干燥，而靠近表面的部分颜色更深，风化程度也更深。

最后，团队使用了 **Chaos缓存管理器（Chaos Cache Manager）** 来缓存资产的物理模拟效果。这个系统可以记录编辑器中的模拟数据并在游戏中回放，从而让你每次都能触发相同的模拟效果。这样一来，在游戏中展示复杂破坏效果的同时，还能节省处理资源，并且让破坏效果满足特定的关卡设计需求。例如，确保Echo破坏的第一根柱子倒下时不会挡住入口，或者避免巨人坟冢留下的碎片妨碍Echo穿越竞技场。在用缓存管理器记录模拟后，在关卡中放置它的副本将放置所有与之相关的其他资产。

![Chaos缓存管理器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7707a921-56d4-4d9c-953d-730e68cdccd7/chaoscachemanagers_mound.png)

这些资产的原始模拟设置已经在项目的最终版本中剥离。但是，这些资产的几何体集合以及缓存管理器被保留了下来，位于 **AncientBattle内容（AncientBattle Content）** > **地图（Maps）** > **破坏（Destruction）** 中。你可以在 **c\_Destruction** > **3\_Lt\_Hand** 中检查这些集合，查看用于目标破裂的资产示例。

目前，我们仍在对工作流的灵活性进行改善。同时，古代山谷中的内容也体现了我们在UE5中从品质、操作性和灵活性等方面提升Chaos破坏效果的理念。

### 使用天空大气和体积Niagara效果来设置场景氛围

在创建古代山谷的大气效果时，我们使用了最新的 **天空大气** 系统。

![天空大气第三人称宽阔视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33818618-fa98-41c0-8768-8c6efc3a2bae/skyatmospherehero.png)

将天空大气Actor放置在场景后，你就可以设置星球的模拟信息，例如地面半径（公里）、大气物理参数、以及美术设计。此系统使用 **定向光源** 作为 **大气太阳光**，还用到了 **天空光照**。将所有这些元素放置到位后，天空大气系统就能在全局范围内生成逼真的大气环境、体积云和雾气。得益于天空光照的实时捕获和卷积处理，此场景中的环境光照是完全动态的。

![启用了天空大气](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76dfa4d8-988f-4261-bfcb-4cf724336f7f/skyatmosphereon.png)

![禁用了天空大气](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc7ede89-6504-41a7-a8ad-27c1307977cd/skyatmosphereoff.png)

启用了天空大气

禁用了天空大气

在《古代山谷》中，光明世界使用了天空大气Actor，以便让大气效果更加细致并真实的尘土效果。它还用到了动态体积云，它们会被光线实时照亮。与此同时，暗黑世界则使用更为传统的天空球来呈现更加风格化、奇幻的景象。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cf0e62e-51e1-40dc-9b63-08326f782ff0/atmosphere_lightworld.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cf0e62e-51e1-40dc-9b63-08326f782ff0/atmosphere_lightworld.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a3e49b4-aac2-4e74-89a4-4a07f41c9b84/atmosphere_darkworld.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a3e49b4-aac2-4e74-89a4-4a07f41c9b84/atmosphere_darkworld.png)

光明世界场景

暗黑世界场景

Click image for full size.

在进行最终润色时，比如表现岩石表面的薄雾和风沙效果时，团队使用了Niagara粒子与 **volumetric paint（体积绘制）** 数据，以便指引它们在场景中变化。

![吹过地面的尘土条带](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a162cc4e-3b63-4cbc-812c-39012f44685e/atmospheredustparticles.gif)

你可以在暗黑世界的数据层中找到这些粒子Actor：**BP\_NiagaraPainted\_FarFog**、**BP\_NiagaraPainted\_FogDetail** 和 **BP\_NiagaraPainted\_SandStripe**。

![暗黑世界Niagara蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/013b4ea7-dfbb-4192-9607-c14db97a48fb/atmosphere_particles.png)

每个Actor都使用了两种Niagara数据接口（Niagara Data Interface）纹理：**VolumetricPaintingDensityMap** 和 **VolumetricPaintingVelocityMap**。

![Niagara数据接口纹理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e005d33-490f-4fe0-9e4e-15e6a12491b1/atmosphere_maps.png)

密度贴图使用RGB信息和alpha通道来确定粒子相对于地面的高度和密度，而速度贴图则确定了这些粒子的移动方向。团队使用了一个自己开发的体积绘制工具，以便在场景中绘制这些图层并输出纹理。在下图中，覆盖在地面上的网格表示密度贴图，而箭头表示方向贴图。BP\_NiagaraPainted\_FogDetail（雾的序列视图）以相同的3D密度放置在BP\_TerrainFogMaster（体积雾）之上，以便增加细节。

![密度贴图网格和方向贴图箭头覆层](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b379f8d8-db35-4c15-8239-d7f107dfaee4/atmospherevolumetricpaint.png)

借助这种方法，古代山谷仅用了三个Niagara系统，就在暗黑世界的地形上模拟出了超过10万个GPU粒子。所有的Niagara系统都能融入场景以及体积雾（使用了相同的体积绘制数据），从而让细节完美契合场景。虽然体积绘制工具仍在开发中，这个场景足以证明了它与Niagara结合使用后，在性能和可用性方面带来的价值。

## 协同构建大型开放世界

过去，用户需要将一个关卡划分成多个子场景，然后使用关卡流送或世界场景合成（World Composition）系统将它们流送到固定关卡中。这种情况下，文件结构会比较难管理，而且用户难以协作。此外，为了避免版本冲突，通常一次只能有一个用户修改场景。

在虚幻引擎5中，我们重新实现了用户与关卡文件的交互方式。整个过程会更简洁、更直观。你不仅能在单个关卡文件中编辑大型场景，还能与其他一众开发人员协同编辑，并将冲突降到最低。本节将详细介绍实现此功能的工具，并介绍开发《古代山谷》时它们为团队带来的便利。

### 一Actor一文件

《古代山谷》整体上采用了UE5的 **一Actor一文件 (OFPA)** 新系统。启用后，关卡中的每个Actor实例都有一个单独的写入文件，而不是将所有数据写入单个地图文件中。

用户操作关卡编辑器时，工作流程不会有任何改变。编辑关卡时，你依然要在编辑器中点开单个关卡文件。不过，由于底层文件系统会将每个Actor作为单独的文件进行跟踪，因此关卡设计师和场景美术师可以同时编辑关卡的不同区域或图层，并且在提交更改时，很少、甚至几乎不会遇到冲突。

《古代山谷》整体采用了OFPA。你可以 **世界设置（World Settings）** 高级分类的 **世界（World）** 参数中找到此设置，标签是 **使用外部Actor（**Use External Actors）\*\*。

![世界设置-使用外部Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa2bb532-0a0f-4a5d-bf2d-bf54ad1e816a/ofpa.png)

你可以选择为单个Actor启用此功能，也可以为整个项目启用此功能。请参见[一Actor一文件](/documentation/zh-cn/unreal-engine/one-file-per-actor-in-unreal-engine)了解详情。

得益于此系统，《古代山谷》的开发人员可以全天候提交更改，并在编辑器中快速了解彼此的改动效果，无需担心版本冲突问题。由于可以对游戏脚本和场景美术进行不断调整，迭代变得更快，同时场景美术流程变得更加协作化。

### 世界分区

大型开放世界类游戏一般会将地图划分成多个子地图，然后在玩家穿越地形时适时地加载或卸载地图，因为通常无法将数公里大的地图一次全部加载出来。在以往的工具集中，开发人需要手动将地图划分成子地图，并细心管理地图的加载和卸载机制。同时查看整张地图通常比较困难。在上下文中查看世界的不同分段往往很难实现。

新的 **世界分区（World Partition）**系统极大简化了这个过程。在为关卡启用世界分区系统后，系统会自动根据场景对象的网格位置将它们划分到单元格中，随着你在关卡编辑器中调整场景，这些单元格的内容会自动更新，因此你不需要将对象手动分配到单元格中。在游戏期间，世界分区可以根据玩家的位置自动加载和卸载单元格，而不需要手动管理或指定流送体积。

你可以在 **世界设置（World Settings）** 的 **世界分区设置（World Partition Setup）** 中为AncientGameEntry场景启用该系统。

![世界设置-世界分区设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/831f0e49-5048-4330-a760-12b14fbfbea5/worldpartitionworldsettings.png)

你可以点击 **窗口（Window）> 世界分区（World Partition）**，以此打开世界分区（World Partition）窗口。你能以拖选方式来选中单元格，并根据编辑需求加载或卸载它们。你还可以将摄像机移到某个单元，以便在编辑器中快速导航。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b7f5ef4-c2a5-4e90-b1ef-1cd9b537e648/worldpartitioncellselect.png)

你可以在 **细节（Details）** 面板的 **世界分区（World Partition）** 分段中查看各个Actor的世界分区设置。也可以在蓝图编辑器的类默认值中编辑该选项。

![世界分区的各个Actor设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a45ff63e-04e3-4467-a4f5-6785048a3cab/worldpartitionactorinfo.png)

默认情况下，大多数场景Actor都是通过它们在世界分区系统中的网格位置来确定归属哪个单元。Echo被设置为始终加载，因为她是玩家操纵的角色。

可以看到，世界分区系统大幅简化了大型世界的创建过程。尽管它在后台仍需管理类似于子关卡的文件，但借助自动化细节处理，它解放了美术师和设计师，让他们能专注于场景设计和用户体验的打造。如需详细了解如何在游戏中配置世界分区，请参阅[世界分区文档](/documentation/zh-cn/unreal-engine/world-partition-in-unreal-engine)。

### 数据层

**数据层系统（Data Layers）** 允许你将场景对象划分到单独的层级中，并按需加载或卸载这些对象。这个系统为子关卡提供了另一种替代方案，旨在与世界分区系统协同工作。它为你的项目提供了额外的管理途径和游戏驱动逻辑，让你对场景拥有更多的掌控方式。

点击**窗口（Window）>数据层（Data Layers）**，打开数据层（Data Layers）窗口。你可以使用此菜单在编辑器中创建、组织、加载或卸载数据层。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8d36813-7e53-400a-8bec-0a806945e295/datalayerswindowlocation.png)

你可以滚动至 **细节（Details）** 分段的 **数据层（Data Layers）**，查看Actor的数据层信息。你可以使用此处的下拉菜单更改Actor的数据层，或点击数据层后将其从数据层窗口拖放到其中一个条目。

![数据层的各个Actor设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e8c6754-5ffa-4e8a-be56-7479f9ce29d1/datalayersinfolocation.png)

你还可以将世界大纲视图中的多个Actor拖放到数据层中，以便同时将多个Actor分配给数据层。

![将多个Actor拖动到数据层](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e6874c8-3c53-4956-9a56-244a6363d393/datalayersclickdrag.png)

《古代山谷》使用数据层驱动光明世界和暗黑世界的过渡。当Echo激活传送门后，它会卸载代表光明世界的多个数据层，然后加载代表暗黑世界的另一套设置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/312668b6-a6b1-420d-9796-42dc277c1f2a/datalayerslightworld.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/312668b6-a6b1-420d-9796-42dc277c1f2a/datalayerslightworld.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/471bf568-aaae-4c7c-a2d4-a2bfb3575ad7/datalayersdarkworld.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/471bf568-aaae-4c7c-a2d4-a2bfb3575ad7/datalayersdarkworld.png)

光明世界

暗黑世界

点击查看大图。

这些（数据层）可以通过游戏中的事件激活或关闭，而事件由暗黑世界Rift对象触发。两者设置都在同一关卡文件中构建，并且位于相同的空间；虽然是同一个世界，但产生了截然不同的版本。

篝火的数据层在两个世界中都有用到，所以当Echo从一个世界切换到另一个世界时，篝火相当于玩家在场景中的固定参照物。整个场景没有必要打造多个版本，唯一改变的就是光明和暗黑世界中使用的大气和光照。

![篝火：光明世界](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84e71ada-b1ca-4d6f-92de-4c6767e9ab9c/datalayerscampfirelight.png)

![篝火：暗黑世界](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba293108-2d17-4d98-8e3e-3fcd1d540e88/datalayerscampfiredark.png)

篝火：光明世界

篝火：暗黑世界

开发期间，数据层还能让游戏逻辑和场景设置元素分离开来，环境美术师可以在自己的数据层中单独工作，不会受到触发器或游戏逻辑对象的影响，而设计师可以专注处理游戏事件相关的对象。

详情请参阅[数据层](/documentation/zh-cn/unreal-engine/world-partition---data-layers-in-unreal-engine)。

## 灵活的实时动画

UE5还对骨架网格体的实时动画进行了多项改良，其中重点改进了角色以及角色与世界的交互方式。《古代山谷》中，Echo以及她遇到的远古巨人都用到了这些改良内容。

### 运动扭曲

全新 **运动扭曲（Motion Warping）** 系统能让动画基于场景中的扭曲点位置来动态调整根骨骼位置。这样用户可以在不同情境中灵活复用同一个动画，从而降低处理复杂场景交互的工作量。

例如，在《古代山谷》中，Echo会在暗黑世界中翻越各种碎砾和障碍物。

![运动扭曲翻越动作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35280591-efb6-444c-a7e0-f1c3d1ea4fae/motionwarpingdemonstration.gif)

在传统的工作流中，要实现此类游戏动画，开发团队要么必须严格遵循障碍物的物理参数要求，为特定障碍物创建特定动画，要么需要将这些动作分解为组件动画，对动作的播放方式以及播放时间设定复杂的规则。

然而，在此项目中，Echo的翻越动作完全由 **VaultOver\_Montage**资产处理。

![编辑器中的VaultOver_Montage资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/def3fa2c-48ce-4767-833c-7b24de3970b5/animationvaultmontage.png)

此资产使用新的 **MotionWarping通知状态（MotionWarping Notify States）** 标记动画片段，角色的根骨骼位置可以动态调整，以便适应场景。每个都对应环境中某个 **同步点（Sync Point）**。在本示例中，同步点分别为FrontEdge、BackEdge和BackFloor，分别对应可翻越对象上的不同参考点。FrontEdge是Echo翻越障碍物时手触摸的位置，BackEdge是她起身跳跃的位置，BackFloor是她另一侧落脚的位置。

这些点在一个名为 **GA\_Vault** 的GameplayAbility中设置。GA\_Vault会基于 **BP\_EchoCharacter** 中的 **VaultingTriggerVolume** 触发翻越行为。尽管蓝图内置了节点来设置运动扭曲的同步点，但这个技能使用了一个自定义节点来读取可跨越障碍物的数据，并一次性计算出所有同步点。

![设置蒙太奇蓝图节点的翻越动作同步点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24fcebc1-e52e-46a6-acd4-636005822320/animationvaultsyncformontage.png)

将这三个点提供给Echo的**MotionWarping** 组件后，VaultOver\_Montage会在运行时自动将她的根骨骼位置对齐到这些动作点。这会影响MotionWarpingd的通知状态，也会影响这些片段的运动扭曲的表现方式。

借助此系统，Echo只需一个动画就可以轻松翻过场景中的各种障碍物。无论障碍物有多高，她的动画都会以自然的方式自我调整，以适应每个目标点位置。这样，开发人员只需少量动画素材就能获得极大的扩展效果。

有关如何实现运动扭曲的更多信息，请参阅[运动扭曲文档](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine)。

### Control Rig改进

Echo和高耸的巨人都用到了虚幻引擎的 **Control Rig** 功能，因此它们的动画都可以直接在编辑器中制作。 在UE5中，我们对Control Rig的工具进行了扩充，新功能包括：

-   **姿势库（Pose Library）**：能保存可重复使用的姿势，以便你在创建动画时快速指定给模型。
    
-   **Tween工具（Tween Tool）**：可以生成中间帧，并根据周围关键帧的信息进行加权。
    
-   **对齐工具（Snapper Tool）**：可以将Control Rig的某些部分对齐到到游戏场景对象上。
    

这些工具提升了操作体验，让创建动画素材变得更简便。在古代山谷中，远古巨人的动画完全由虚幻编辑器的Control Rig和Sequencer制作完成。该巨人的模型和动画由Aaron Sims创意团队设计。

![Control Rig编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f484bb41-2d87-4bd3-ac88-3582547bb84c/animationancientrig.jpg)

远古巨人和Echo都用到了Control Rig。试着探索这些新功能。你可以在 **AncientContent** > **角色（Characters）** > **Echo** > **Rig** 中找到Echo的Rig，可在 **AncientBattle内容（AncientBattle Content）** > **角色（Characters）** > **AncientOne** > **Rig** 中找到远古巨人的Control Rig。

![Control Rig内容文件夹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f24ac3fc-6a04-43cc-a31f-15af2bdcf58e/ancientrigdirectory.png)

有关UE5中的Control Rig改良信息，请参阅[Control Rig](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine)。

### 全身IK解算器

两个角色都使用了全新的 **全身IK（FBIK）解算器（Full-body IK (FBIK) Solver）**，这为他们响应场景提供了额外的空间。FBIK是**Control Rig** 的 **Forwards Solve** 图表中的一个节点。在处理完网格体的所有标准动画后，这个解算器会在后期处理层中对模型应用校正。

![Control Rig资产中的FBIK解算器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a05e723d-2efb-4e24-adb9-6e9905e99c78/fbik_nodes.png)

举个例子，当远古巨人使用能量束攻击时，其手臂在指向Echo时的位置是由蓝图控制的，FBIK解算器会在发射光束时校正身体其余部分的位置。

![远古巨人发射光束gif](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c3e8ea5-7306-47a5-b4bc-58c9bd300655/fbik_ancientarm.gif)

再举一个例子，Echo在崎岖路面上走动时，她会使用FBIK来适应场景中的路面变化，根据地面坡度调整脚和臀部的位置。这样就能实现更加丰富自然的移动效果，尤其是行走在斜坡上或翻越障碍物时。

![Echo在斜坡上行走gif](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b3b9012-7dcf-4e80-a774-3d419c33f970/fbik_step.gif)

有关如何实现FBIK的更多信息，请参阅[全身IK文档](/documentation/zh-cn/unreal-engine/control-rig-full-body-ik-in-unreal-engine)。

## 构建模块化Gamplay

UE5还提供了一个模块化构建Gameplay的框架，而《古代山谷》在切换到暗黑世界时就利用了这些系统。发生变化的不仅是Echo身边的环境，还有输入绑定和其他机制。

### 利用游戏功能插件来扩展Gameplay

![Echo投掷光镖](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a778bcab-9d9a-4901-9b5b-350384254d21/gamefeaturelightdart.png)

在光明世界中，Echo使用远程控制的光源粒子鸟瞰周围的环境。在暗黑世界中，她可以掷光镖摧毁障碍物并对敌人造成伤害。每个系统都是一个单独的 **游戏功能插件（Game Feature Plugin）**。此系统受《堡垒之夜》启发，能让开发者开发相互独立的功能，然后根据需要整合到游戏主体中。你甚至可以在运行时加载和卸载插件。

要创建新游戏功能，请打开 **插件（Plugins）** 窗口并点击 **创建插件（Create Plugin）**。你可以选择"游戏功能"（Game Feature）作为基础插件类型。

![创建游戏功能插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d64d718d-bac2-48e6-966a-220accc5843d/gamefeatureplugin.png)

然后，你可以在项目的插件目录找到该插件。

在使用标准插件时，游戏本体可以引用插件中的类和资产，但插件无法看到游戏代码或资产。但对于游戏功能（Game Feature）类型的插件来说，这种依赖关系是反过来的。游戏功能可以访问游戏本体，但游戏本地无法引用游戏功能中的类或函数。这就使它们类似于游戏模组，能够扩展或修改游戏本体中的元素。

在《古代山谷》中，光镖和远古巨人都包含在名为 **AncientBattle** 的游戏功能插件中。Echo在获取和使用特殊技能时所需用到的基本系统已经包含在她的Actor中，但光镖是一种特殊实现。远古巨人和其他能够响应破坏效果的Actor也包含在此游戏功能插件中，这就让战斗系统完全封装在此模块中。此功能的内容位于 **AncientBattle内容（AncientBattle Content）** 文件夹中。

如需在内容侧滑菜单中查看此游戏功能的内容，请点击 **设置（Settings）** 按钮，然后选择 **显示插件内容（Show Plugin Content）**，找到 **AncientBattle内容（AncientBattle Content）** 文件夹。

![AncientBattle内容文件夹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4a59b39-4c60-4565-a953-91e3130b7814/ancientbattlecontentfolder.png)

与光镖相关的所有资产都位于此文件夹中，包括动画、视觉效果、UI元素和蓝图。在文件夹的根目录，有一个AncientBattle **游戏功能数据（Game Feature Data）** 资产。

![AncientBattle游戏功能数据资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0610a53e-a8f9-49d7-b018-a21b9c5957d8/ancientbattlepluginlocation.png)

此资产包含插件在加载和卸载后会如何运行的指令。光镖插件包含了专门的指令，用以实现如何为Echo添加LightDart Gameplay技能、如何为她设置激活技能的输入、以及如何为她添加所需的组件。

在Gameplay期间，当场景切换成暗黑世界时，这些功能会在 **BP\_DarkWorldRift** 蓝图中切换。

![BP_DarkWorldRift蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7cc2f94b-3671-4591-b1fb-9a78336fc3ac/gamefeaturepluginfunctions.png)

游戏本体中的代码或资产无需额外引用LightDart。将它添加给Echo后，得益于游戏功能数据中的指令，它的所有组件都可以使用。

此系统使开发人员能够轻松控制给定时间内哪些功能处于激活状态。这在处理只在有限时间内运行的机制时尤其有用。这里，我们用它来切换Echo在不同世界之间的光镖效果，但游戏功能插件的应用不止于此，它还可以用于在线游戏中的某些事件，用于简短的过场动画片段，或用于游戏玩法中的主要模式变化。

有关游戏功能插件以及如何在项目中使用的更多信息，请参阅[游戏功能插件文档](/documentation/zh-cn/unreal-engine/game-features-and-modular-gameplay-in-unreal-engine)。

### 基于增强输入系统的灵活操控

UE5采用了全新的 **增强输入系统（Enhanced Input System）**。玩家在古代山谷中使用该系统来操控Echo。该系统不仅能处理Echo的移动操作和技能施放，还提供了多种办法来处理输入中与当前场景有关的元素，例如与特定控制有关的情境元素，以及根据玩家状态来添加或删除输入。

UE4中的输入系统通过Actor事件图表中的事件来处理原始输入，而增强输入模型则采用 **输入操作（Input Actions）** 的方式进行控制，这些操作用内容侧滑菜单中的资产来表示。《古代山谷》的大部分输入操作都位于 **内容（Content） > AncientGameContent > 输入（Input）**。与暗黑世界有关的输入操作位于 **AncientBattle\_Content > 输入（Input）** 中,与悬停无人机有关的输入操作位于 **HoverDrone\_Content > 输入（Input）** 中。

![内容侧滑菜单中的输入操作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc60714b-f5b3-451b-a813-c94f73a10428/inputlocation.png)

它们不仅包括常见的操控，例如 **IA\_MoveForward** 和 **IA\_MoveRight**，还包括高度情景化的操控，例如 **IA\_SitStand**（Echo从篝火旁站起来时使用）。你可以打开"输入操作"来配置它们返回的数值类型，包括不同类型的方向轴数值。此外，你还可以提供一组 **触发器（Triggers）**，用于添加上下文信息来激活输入，或添加 **修饰符（Modifiers）**，用于处理输入的数值，然后再将其传递到游戏逻辑中。

![输入操作详细信息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/337f5029-cf0e-4343-9c19-92b5b26b3b50/inputasset.png)

触发器和修饰符使得系统能够处理死区、响应曲线、或用于激活输入的情境操作，所有这些都不需要在Actor的Gameplay代码中手动筛选输入数据。你可以在项目中添加更多的触发器或修饰符，只要将其定义为蓝图或C++类即可。

在内容侧滑菜单中定义输入操作之后，就能通过蓝图中的事件来访问它。控制Echo的输入操作是在BP\_EchoCharacter中处理的。

![BP_EchoCharacter蓝图中的输入操作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b41927e0-0e16-42d3-8643-f6b43b186f6f/inputevents.png)

虽然这些事件类似于标准输入事件，但可以提供与输入操作相关的更多上下文信息，包括操作开始、完成、进行中或被强制取消的时间信息，以及操作的激活时间。输入事件的数值是由输入操作资产中列出的 **数值类型（Value Type）** 定义的。在输出此数值之前，为输入操作列出的所有修饰符都会被应用。

**输入映射上下文（Input Mapping Contexts）** 负责将输入操作映射到实体按钮上。你可以在输入操作旁边找到这些资产。**IM\_ThirdPerson\_Controls\_InputMapping** 包含Echo的大部分操控，而**IM\_LightDartInputMappings** 包含为光镖技能和慢跑添加的操控。

![输入操作映射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0b41e6d-79ce-4a99-89cb-a84a64e0b94a/inputmappingasset.png)

这些操控选项的界面类似于UE4输入系统中的操作映射和轴映射界面；除了将输入操作映射到物理输入上，它们还可以将修饰符和触发器应用到特定的控制实现上。例如，Echo需要读取IA\_MoveForward来确定向前和向后运动。虽然W键没有添加修饰符，但S键使用 **负号（Negate）** 修饰符，该修饰符可以将输入读取为负输入。

输入映射上下文（Input Mapping Context）的一个优势在于，可以在运行时为个体玩家添加和删除。例如，AncientBattle游戏功能插件会在加载时添加IM\_LightDartInputMappings。

![光镖输入映射详细信息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6da92f6a-d034-4b26-bd3a-1fc58f3449bc/inputmappinginplugin.png)

此游戏功能操作是专门用C++为此项目创建的。你可以在 **HoverDroneControlsComponent**（HoverDrone Gameplay中的一个C++类），继承自 **EnhancedInputComponent** 中查看运行时添加和删除输入映射的另一个示例。

这个示例展示了增强输入系统如何为游戏的输入管理提供可高度扩展且灵活的框架。在开发过程中，你可以对游戏输入轻松地进行扩展和改进，而不需要对游戏逻辑代码进行破坏性的更改，并且该系统还提供了许多针对情境输入或特殊输入的工具。如需更多信息，请参阅[增强输入系统文档](/documentation/zh-cn/unreal-engine/enhanced-input-in-unreal-engine)。

## 动态交互音频

除了提供各类视觉效果、游戏机制和游戏场景的创建工具外，虚幻引擎5还提供了全新的音频系统，能让你可以更好地控制游戏音效。本节将演示古代山谷如何利用这些新工具，为Echo与远古巨人的最后遭遇战营造激烈氛围的。

### MetaSounds

**MetaSounds** 是虚幻引擎5的全新高性能音频系统，为音效设计师提供了功能完善的动态信号处理（DSP）图表。该系统可以从零开始合成程序化音效和音乐，并提供了一套蓝图接口，允许设计师根据事件和游戏数据来控制音效。这使得音效设计师能在开发期间获得更多灵活性，实现快速迭代并设计出复杂、动态的音效，还能轻松根据游戏设计变化来调整音效。

假如你希望通过示例查看MetaSounds的丰富功能，可以查看 **音频（Audio）** > **MetaSounds** 下的 **AncientBattle内容（AncientBattle Content）** 文件夹中的 **sfx\_Golem\_RobotBlast\_Meta**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85e2c459-829e-4b29-99bc-8d26907eb667/metasoundsoverview.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85e2c459-829e-4b29-99bc-8d26907eb667/metasoundsoverview.png)

MetaSound综合使用了程序化生成的音效和.wav采样来创建远古巨人的光束充能音效。第一批分段处理主充能音效的批量合成和调制，这个阶段是完全程序化的。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d172b41e-4671-4bc3-9891-afec84d73f0f/metasoundproceduralsegment.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d172b41e-4671-4bc3-9891-afec84d73f0f/metasoundproceduralsegment.png)

**前摇（Intro Wave）** 和 **发射（Shot Waves）** 部分，再加上一些补充性.wav文件，共同为音效添加了一层额外质感。光束开始充能时，会触发前摇部分。光束开始充能时，会触发发射部分中的一个音效；充能音效全部播放后，还有一些组件会触发。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/907e7331-edb5-4c4e-932a-5e3031b356f7/introandshotwaves.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/907e7331-edb5-4c4e-932a-5e3031b356f7/introandshotwaves.png)

图表的中间部分负责处理这些不同部分之间的混合和过滤，合成为最终的 **立体声混音（Stereo Mix）**，然后传递给 **输出（Output）** 节点来播放最终音效。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8643eb9c-165d-4557-982d-e5052a0a0639/metasoundsmixing.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8643eb9c-165d-4557-982d-e5052a0a0639/metasoundsmixing.png)

输入包括触发器、参数和.wav文件，随后MetaSounds流程图会根据DSP节点处理这些信息，并将其混合成最终的音效输出。这个系统允许音效设计师能像编辑材质一样去灵活地编辑音效，并能灵活采用常见音效参数和游戏内数据，让设计师能和游戏开发团队在同一个音效设计环境中紧密高效工作。

例如，在开发战斗序列时，很多迭代时间都花费在调整远古巨人光束充能的时间长度上。在传统音效设计流程中，需要根据游戏逻辑的变化重新编写音效，这就让工作更加繁琐。然而，sfx\_Golem\_RobotBlast\_meta MetaSound使用名为 **ChargeDuration** 的 **时间（Time）** 输入来确定音效的播放时间长度。由于主充能音效是完全程序化的，因此可以根据给定的输入来自动调整时间长度。

要查看实际效果，请在 **输入（Inputs）** 列表中选择ChargeDuration，将默认值4.0秒更改为其他数值，然后尝试播放音效。

![ChargeDuration时间输入](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a29e93ad-c70d-4674-a2ea-1f127eec12ac/metasoundschargeduration.png)

得益于此功能，游戏设计团队可以随意更改远古巨人的充能时长，而不必重新编写音效。

此外还有很多其他输入参数可以使用，包括可以在游戏代码中通过音频参数接口激活的触发器。你可以使用这些输入参数创建MetaSound并让它们程序化地完成开始、停止和中间事件。 例如，像开枪这样的操作，以前需要多个音效来实现开枪、停止和循环开火，而这个系统可以将所有音效压缩到一个MetaSound中。

![StopBeam事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbc0ec8e-f749-4325-80d8-17f3eb2f7e2c/metasoundsparameterinterface.png)

你还可以使用此API操控其他音频参数。这使得MetaSounds能将复杂音效的音效播放逻辑封装起来，并提供标精确到采样的计时（sample-accurate timing）。

MetaSounds除了具备设计灵活性和近乎无限的拓展性以外，还拥有显著的性能提升。MetaSounds图表是异步渲染的（类似于单个音效的正常解码方式），在处理CPU资源时具有更高的灵活性。更重要的是，由于MetaSounds是真正的音频渲染系统，无论多么复杂，每个MetaSound都代表一个游戏内声音。这意味着，你在MetaSounds编辑器中听到的回放将和游戏内音效始终相同。相比于以前的系统，而游戏内的声音管理会更加可预测。这也让评估音频性能的工作流更加简短，因为未来在UE5中，可以单独分析某个MetaSounds的性能。

如需MetaSounds的深度信息，请参阅[MetaSounds文档](/documentation/zh-cn/unreal-engine/metasounds-in-unreal-engine)。

### Quartz音频同步

正常情况下，由于游戏逻辑线程和音频线程在处理方式上存在差异，导致很难以精确的计时在它们之间同步事件。但是，**Quartz** 提供了一个时钟，可以根据游戏事件来调度并播放音效，并能精确到采样。使用Quartz调度音频时，可以根据与调度音效有关的计时来设置委托。**Quartz时钟（Quartz Clock）** 会为该音效的播放提供事件委托，以便游戏逻辑预测预计时间，并适时同步其他游戏逻辑事件。这样就可以创建出精确到采样的动态音乐系统，以及与音频保持高度同步的游戏系统。

《古代山谷》在其名为 **Underscore Subsystem** 的动态音乐系统中用到了Quartz，Underscore Subsystem可以根据音乐节拍和小节来调度事件。可以看到，远古巨人在和Echo决战时，会根据音乐计时来发射激光。此系统的类包含在 **Underscore C++类（Underscore C++ Classes）** 中。

![内容滑菜单中的Quartz Underscore Subsystem](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f1069fb-56ea-4798-b8a6-664c927629e2/quartzunderscorelocation.png)

此系统的音乐包含在名为 **UnderscoreCue** 的特殊数据资产中，该数据资产包含音乐的拍号数据、音乐片段数据、转换数据、以及与音乐状态和事件有关的其他信息。远古巨人战斗时的战斗音乐包含在 **Arena\_Battle\_Cue** 资产中，该资产位于 **AncientContent** > **音频（Audio）** > **UnderscoreCues** 中。

![Arena_Battle_Cue资产细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56a1eea4-3f26-40ff-b4a8-35595dbbe7a6/quartzunderscorecue.png)

它包含构成音乐的片段引用，以及音乐的**BPM** 和 **拍号（Time Signature）**。该数据是对音乐的说明，音乐系统使用它来设置Quartz时钟并管理每个分段之间的计时转换。序曲设置为转换成战斗音乐的主体，而主体分成几个不同的状态。这些状态会根据不同的游戏事件发生。最后，音乐以一个与节拍同步的结尾来结束。得益于Quartz，所有这些动作都以无缝的标杆级精准度发生。

如需查看这些分段如何与游戏内事件相关联，你可以查看**BP\_Laser** 和 **BP\_AncientOne**（位于 **AncientBattle内容（AncientBattle Content）** 目录中）中的节点连接方式。除了激光本身的逻辑外，BP\_Laser还负责将事件绑定到Underscore Subsystem，以便音乐触发激光。

![图表中激光的UnderScore Subsystem音乐提示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4699b77-d765-4def-a1c3-ac1f6c36fdf2/quartzunderscoreexample2.png)

它还会调用Underscore Subsystem，目的是告知音乐何时过渡到歌曲的其他分段，包括光束何时完成发射以及何时击败远古巨人。

![UnderScore Subsystem音乐过渡提示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74190ba0-a96a-40b1-adc0-a85efac12da9/quartzunderscoreexample1.png)

这只是Underscore子系统使用Quartz来促进动态音乐系统以及游戏与音频之间精确互动的几个例子。

## 总结

![Echo使用光镖攻击远古巨人](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e7b65cb-8e9b-4ff0-834b-1fb46814facb/finalimage.png)

可以看到，虚幻引擎5提供了一系列不可思议的工具，使创建宏伟的高真实度场景比以往任何时候都更容易。《古代山谷》融合了这些工具，通过实例展示了它们的实际开发作用，并演示了它们如何有助于简化游戏的开发流程。有了UE5，开发人员能以更简单的方式实现更高品质的视觉效果和更宏大的场景，以及更加丰富的交互效果和场景细节。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [valley of the ancient sample](https://dev.epicgames.com/community/search?query=valley%20of%20the%20ancient%20sample)
-   [fab](https://dev.epicgames.com/community/search?query=fab)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [获取《古代山谷》示例](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E8%8E%B7%E5%8F%96%E3%80%8A%E5%8F%A4%E4%BB%A3%E5%B1%B1%E8%B0%B7%E3%80%8B%E7%A4%BA%E4%BE%8B)
-   [推荐的系统规格](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E6%8E%A8%E8%8D%90%E7%9A%84%E7%B3%BB%E7%BB%9F%E8%A7%84%E6%A0%BC)
-   [初识UE5编辑器](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E5%88%9D%E8%AF%86ue5%E7%BC%96%E8%BE%91%E5%99%A8)
-   [内容侧滑菜单](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E5%86%85%E5%AE%B9%E4%BE%A7%E6%BB%91%E8%8F%9C%E5%8D%95)
-   [选择编辑器模式](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E9%80%89%E6%8B%A9%E7%BC%96%E8%BE%91%E5%99%A8%E6%A8%A1%E5%BC%8F)
-   [了解项目](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E4%BA%86%E8%A7%A3%E9%A1%B9%E7%9B%AE)
-   [视效更高端、迭代更快](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E8%A7%86%E6%95%88%E6%9B%B4%E9%AB%98%E7%AB%AF%E3%80%81%E8%BF%AD%E4%BB%A3%E6%9B%B4%E5%BF%AB)
-   [直接导入Quixel Megascans资产](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E7%9B%B4%E6%8E%A5%E5%AF%BC%E5%85%A5quixelmegascans%E8%B5%84%E4%BA%A7)
-   [Nanite虚拟化几何体](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#nanite%E8%99%9A%E6%8B%9F%E5%8C%96%E5%87%A0%E4%BD%95%E4%BD%93)
-   [Lumen全局光照](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#lumen%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7)
-   [使用新建模工具定制网格体](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E4%BD%BF%E7%94%A8%E6%96%B0%E5%BB%BA%E6%A8%A1%E5%B7%A5%E5%85%B7%E5%AE%9A%E5%88%B6%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [使用打包的关卡实例来填充地形](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E4%BD%BF%E7%94%A8%E6%89%93%E5%8C%85%E7%9A%84%E5%85%B3%E5%8D%A1%E5%AE%9E%E4%BE%8B%E6%9D%A5%E5%A1%AB%E5%85%85%E5%9C%B0%E5%BD%A2)
-   [Chaos破坏系统工作流](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#chaos%E7%A0%B4%E5%9D%8F%E7%B3%BB%E7%BB%9F%E5%B7%A5%E4%BD%9C%E6%B5%81)
-   [使用天空大气和体积Niagara效果来设置场景氛围](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E4%BD%BF%E7%94%A8%E5%A4%A9%E7%A9%BA%E5%A4%A7%E6%B0%94%E5%92%8C%E4%BD%93%E7%A7%AFniagara%E6%95%88%E6%9E%9C%E6%9D%A5%E8%AE%BE%E7%BD%AE%E5%9C%BA%E6%99%AF%E6%B0%9B%E5%9B%B4)
-   [协同构建大型开放世界](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E5%8D%8F%E5%90%8C%E6%9E%84%E5%BB%BA%E5%A4%A7%E5%9E%8B%E5%BC%80%E6%94%BE%E4%B8%96%E7%95%8C)
-   [一Actor一文件](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E4%B8%80actor%E4%B8%80%E6%96%87%E4%BB%B6)
-   [世界分区](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E4%B8%96%E7%95%8C%E5%88%86%E5%8C%BA)
-   [数据层](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E6%95%B0%E6%8D%AE%E5%B1%82)
-   [灵活的实时动画](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E7%81%B5%E6%B4%BB%E7%9A%84%E5%AE%9E%E6%97%B6%E5%8A%A8%E7%94%BB)
-   [运动扭曲](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E8%BF%90%E5%8A%A8%E6%89%AD%E6%9B%B2)
-   [Control Rig改进](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#controlrig%E6%94%B9%E8%BF%9B)
-   [全身IK解算器](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E5%85%A8%E8%BA%ABik%E8%A7%A3%E7%AE%97%E5%99%A8)
-   [构建模块化Gamplay](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E6%9E%84%E5%BB%BA%E6%A8%A1%E5%9D%97%E5%8C%96gamplay)
-   [利用游戏功能插件来扩展Gameplay](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E5%88%A9%E7%94%A8%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%8F%92%E4%BB%B6%E6%9D%A5%E6%89%A9%E5%B1%95gameplay)
-   [基于增强输入系统的灵活操控](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E5%9F%BA%E4%BA%8E%E5%A2%9E%E5%BC%BA%E8%BE%93%E5%85%A5%E7%B3%BB%E7%BB%9F%E7%9A%84%E7%81%B5%E6%B4%BB%E6%93%8D%E6%8E%A7)
-   [动态交互音频](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E5%8A%A8%E6%80%81%E4%BA%A4%E4%BA%92%E9%9F%B3%E9%A2%91)
-   [MetaSounds](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#metasounds)
-   [Quartz音频同步](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#quartz%E9%9F%B3%E9%A2%91%E5%90%8C%E6%AD%A5)
-   [总结](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine#%E6%80%BB%E7%BB%93)
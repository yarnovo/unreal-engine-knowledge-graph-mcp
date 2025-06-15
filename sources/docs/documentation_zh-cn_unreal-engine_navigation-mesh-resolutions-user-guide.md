# 寻路网格体分辨率用户指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/navigation-mesh-resolutions-user-guide
> 
> 生成时间: 2025-06-14T19:43:22.728Z

---

目录

![寻路网格体分辨率用户指南](https://dev.epicgames.com/community/api/documentation/image/5b353efd-74df-4f60-9152-1ee9df7280d5?resizing_type=fill&width=1920&height=335)

## 概述

通过 **寻路网格体分辨率（Navigation Mesh Resolutions）** 功能，用户可以在同一寻路网格体中以3种不同的分辨率生成寻路网格体图块。现在，用户可以在高、中（默认）、低三种精度设置下生成图块组，这样可以提升运行时动态寻路网格体的生成速度。

在此实例中，寻路网格体分辨率是指为覆盖指定寻路空间而生成的单元的精度和数量。例如，高分辨率图块可以用更多的多边形细分给定空间，以更好地模拟空间形状。然而，低分辨图块将使用更少的多边形覆盖相同的空间。这样可以更快地生成图块，但代价是牺牲精度。

### 常见用例

在以下用例中，用户可以从此功能中受益：

用例

说明

**提升生成速度**

当使用动态寻路网格体时，在AI艾真体不需要良好寻路精度的开放空间或区域，使用低分辨率图块。仅在AI艾真体需要在障碍物之间的更小空间寻路的密集区域，使用默认或高分辨率图块。

**减少内存占用**

相比使用默认或高分辨率图块，将低分辨率图块用于寻路网格体可减少内存占用。对于在内存有限的硬件设备（如手机）上运行的游戏，这很有帮助。

## 在寻路网格体中应用多种分辨率

1.  依次点击 **添加+（Add +） > 体积（Volumes） > 寻路网格体边界体积（Nav Mesh Bounds Volume）** ，在你的关卡中放置 **寻路网格体边界体积（Navigation Mesh Bounds Volume）** 。按'**P**'可直观查看寻路网格体。
    
    ![将寻路网格体边界体积添加到你的关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00ae7c4f-3854-4606-939a-3afecb79bd2b/navmesh-res-1.png) ![按P可直观查看寻路网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2f70f85-6704-436e-885d-dd15caa3a16c/navmesh-res-2.png)
2.  在 **大纲视图（Outliner）** 窗口中，选择 **RecastNavMesh-Default** Actor。前往 **细节（Details）** 面板，并 **启用** **绘制图块构建时间（Draw Tile Build Times）** 复选框。这样可显示构建每个寻路网格体图块所需的时间（以毫秒为单位）。
    
    ![在细节面板中，启用绘制图块构建时间复选框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e56b0cf-159e-492d-b7e8-0403c4ac91f6/navmesh-res-3.png) ![寻路网格体图块将显示它们的构建时间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ccf039c-bc76-4ab7-a6db-2dd42f36ffcd/navmesh-res-4.png)
3.  依次点击 **添加+（Add +） > 体积（Volumes） > 寻路修饰体积（Nav Modifier Volume）** ，将 **寻路修饰体积（Navigation Modifier Volume）** 放置到你的关卡中。放置你的修饰体积，以便其与多个寻路网格体图块重叠。
    
    ![将寻路修饰体积添加到你的关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e653036e-06fb-4a8f-b7e2-0883bb7652f9/navmesh-res-5.png) ![放置寻路修饰体积，以便其与寻路网格体重叠](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/122894a3-6605-4f35-a6ca-9fd01056e0df/navmesh-res-6.png)
4.  选定 **寻路修饰（Navigation Modifier）** 体积后，前往 **细节（Details）** 面板，然后，点击 **寻路网格体分辨率（Nav Mesh Resolution）** 下接菜单，选择 **低（Low）** 。你可以看到寻路修饰体积中的构建时间如何大幅缩短。
    
    ![点击寻路网格体分辨率下拉菜单，选择低](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a9dcdcf-7172-4d94-a8c0-9394c6774102/navmesh-res-7.png) ![寻路修饰体积中的构建时间缩短](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a66f9cb3-eb2b-4f7a-b79b-103241128196/navmesh-res-8.png)
5.  使用Actor蓝图中的 **寻路修饰（Nav Modifier）** 组件，你可以修改寻路网格体图块分辨率。添加NavModifier组件，然后前往 **细节（Details）** 面板。从 **寻路网格体分辨率（Nav Mesh Resolution）** 下拉菜单中，选择所需分辨率。
    
    ![将NavModifier组件添加到蓝图Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cedf37d9-0278-4f10-8819-14f7c7aaab74/navmesh-res-9.png) ![从寻路网格体分辨率下拉菜单选择所需的分辨率](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbb9105a-e0cb-4a71-83f3-2662812fbab4/navmesh-res-10.png)
6.  在下方示例中，我们创建了Actor蓝图，并添加了 **NavModifier** 组件。然后，我们选择了 **低（Low）** 分辨率设置。注意，当沿着 **寻路网格体（Navigation Mesh）** 体积拖动Actor时，寻路图块发生了重建。
    
    ![当我们移动Actor时，寻路网格体图块实时重建](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50ef2d3c-f101-486b-aa16-a506e698673c/navmesh-res-component.gif)

## 寻路网格体分辨率可以影响艾真体寻路

寻路网格体图块分辨率可以影响AI艾真体寻路路径。当艾真体必须在近距离障碍物之间或狭窄空间寻路时，尤其如此。

在下图中，我们向寻路网格体添加了3个障碍物，并将图块分辨率设置为 **低（Low）** 。注意，底部两个障碍物之间是没有可用路径。这是因为没有足够的分辨率可用于在这些障碍物之间创建多边形。

![艾真体无法在底部两个障碍物之间移动](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8d2d94c-9a3b-4b68-a784-7fd9e6e940a3/navmesh-res-11a.png)

在下面的示例中，我们将图块分辨率更改为 **默认（Default）** 。此分辨率支持更高密度的多边形，使得底部两个障碍物之间有可用路径。在此示例中，艾真体可以在这些障碍物之间寻路，并且其路径经过优化（直线）。

![艾真体现在可以在底部两个障碍物之间移动](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d2613af-7da6-4511-a2c1-897b0cdf1f52/navmesh-res-11b.png)

## 最优设置

你可以通过以下步骤更改寻路网格体图块分辨率设置：

1.  点击 **设置（Settings） > 项目设置（Project Settings）** ，打开 **项目设置（Project Settings）** 。
    
    ![打开项目设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4181d36b-17bb-4b31-9bb7-3ac96f369664/navmesh-res-12.png)
2.  点击 **寻路网格体（Navigation Mesh）** 类别，向下滚动至 **生成（Generation）** 分段。展开 **寻路网格体分辨率参数（Nav Mesh Resolution Params）** 结构体，查看每种分辨率级别的设置。
    
    ![展开寻路网格体分辨率参数结构体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4fd0744-e3af-4f4d-8284-c77ae3b8ac93/navmesh-res-13.png)
3.  现在，你可以更改每种分辨率级别的 **单元尺寸（Cell Size）** 。单元尺寸越大，生成速度越快。
    
    ![更改每种分辨率级别的单元尺寸](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c806afdd-5c3e-4c90-9047-884ee8d5eedd/navmesh-res-14.png)

为实现最优性能，你可以将每个单元尺寸设置为彼此的倍数，并确保 **图块尺寸UU（Tile Size UU）** 能够被所有 **单元尺寸（Cell Sizes）** 整除。

## 调试工具

在 **大纲视图（Outliner）** 窗口中，选择 **RecastNavMesh-Default** Actor，并前往 **细节（Details）** 面板，你可以访问寻路网格体图块分辨率调试工具。

## 绘制图块分辨率

启用 **绘制图块分辨率（Draw Tile Resolutions）** 复选框，以不同的颜色呈现每个图块的分辨率。下表显示了每种颜色与图块分辨率的关系。

分辨率

颜色

**蓝色**

低分辨率。

**绿色**

默认分辨率。

**黄色**

高分辨率。

![启用绘制图块分辨率复选框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6823606d-ebca-40c1-954d-774ae104c683/navmesh-res-15.png) ![每种图块颜色代表不同的分辨率](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0349eaf0-26db-43ab-b94f-b41af05ccc49/navmesh-res-16.png)

## 构建时间热图

你可以启用 **绘制图块构建时间热图（Draw Tile Build Times Heat Map）** 复选框，在你的寻路网格体中呈现图块构建时间热图。每种颜色代表一个构建时间范围，淡蓝色代表低水平构建时间，红色代表高水平构建时间。

![启用绘制图块构建时间热图复选框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be925b31-31e5-4ae8-9d37-f98227cd752c/navmesh-res-17.png) ![寻路网格体中显示的构建热图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9e8ff11-b463-4fc8-a844-28a19024c4ad/navmesh-res-18.png) 

-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [navigation](https://dev.epicgames.com/community/search?query=navigation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/navigation-mesh-resolutions-user-guide#%E6%A6%82%E8%BF%B0)
-   [常见用例](/documentation/zh-cn/unreal-engine/navigation-mesh-resolutions-user-guide#%E5%B8%B8%E8%A7%81%E7%94%A8%E4%BE%8B)
-   [在寻路网格体中应用多种分辨率](/documentation/zh-cn/unreal-engine/navigation-mesh-resolutions-user-guide#%E5%9C%A8%E5%AF%BB%E8%B7%AF%E7%BD%91%E6%A0%BC%E4%BD%93%E4%B8%AD%E5%BA%94%E7%94%A8%E5%A4%9A%E7%A7%8D%E5%88%86%E8%BE%A8%E7%8E%87)
-   [寻路网格体分辨率可以影响艾真体寻路](/documentation/zh-cn/unreal-engine/navigation-mesh-resolutions-user-guide#%E5%AF%BB%E8%B7%AF%E7%BD%91%E6%A0%BC%E4%BD%93%E5%88%86%E8%BE%A8%E7%8E%87%E5%8F%AF%E4%BB%A5%E5%BD%B1%E5%93%8D%E8%89%BE%E7%9C%9F%E4%BD%93%E5%AF%BB%E8%B7%AF)
-   [最优设置](/documentation/zh-cn/unreal-engine/navigation-mesh-resolutions-user-guide#%E6%9C%80%E4%BC%98%E8%AE%BE%E7%BD%AE)
-   [调试工具](/documentation/zh-cn/unreal-engine/navigation-mesh-resolutions-user-guide#%E8%B0%83%E8%AF%95%E5%B7%A5%E5%85%B7)
-   [绘制图块分辨率](/documentation/zh-cn/unreal-engine/navigation-mesh-resolutions-user-guide#%E7%BB%98%E5%88%B6%E5%9B%BE%E5%9D%97%E5%88%86%E8%BE%A8%E7%8E%87)
-   [构建时间热图](/documentation/zh-cn/unreal-engine/navigation-mesh-resolutions-user-guide#%E6%9E%84%E5%BB%BA%E6%97%B6%E9%97%B4%E7%83%AD%E5%9B%BE)
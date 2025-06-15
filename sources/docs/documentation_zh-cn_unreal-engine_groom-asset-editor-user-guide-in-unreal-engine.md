# 虚幻引擎Groom资产编辑器用户指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/groom-asset-editor-user-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:00:45.096Z

---

目录

![Groom资产编辑器](https://dev.epicgames.com/community/api/documentation/image/af56f277-9b54-4eaf-b90d-dcc70556001b?resizing_type=fill&width=1920&height=335)

**毛发造型（Groom）** 系统主要用于处理导入的Alembic `.abc` 文件中的毛发发束。但是，出于扩展考虑，它还支持发片、网格体等其他几何体形式来表现毛发。为方便设置，所有这些几何体表现类型都可以在单个资产和组件中管理。**毛发资产编辑器（Groom Asset Editor）** 负责管理毛发的大部分内容，你可以用它来修改毛发的不同部分，确定其渲染方式以及物理模拟方式，或者创建并管理毛发的LOD。

## 打开毛发资产编辑器

要打开毛发资产编辑器，你可在内容浏览器中 **双击毛发资产** ，或者使用 **毛发资产的上下文菜单** 打开。

![Groom Asset in the Content Browser](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92763be1-134f-454a-92fe-22b8d2d6dc10/01-groom-asset-in-the-content-browser.png)

## 毛发资产编辑器界面

毛发资产编辑器由这些区域组成：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70aa81b8-3ddb-4c53-b422-5829860c7397/02-groom-asset-editor-interface.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70aa81b8-3ddb-4c53-b422-5829860c7397/02-groom-asset-editor-interface.png)

点击查看大图

1.  [视口显示选项（Viewport Display Options）](/documentation/zh-cn/unreal-engine/groom-asset-editor-user-guide-in-unreal-engine#viewportdisplayoptions)：包括视口选项、视图视角、视图模式、调试视图和LOD可视化选项。
2.  [视口（Viewport）](/documentation/zh-cn/unreal-engine/groom-asset-editor-user-guide-in-unreal-engine#viewport)：显示毛发资产及其指定材质、细节层级和物理呈现。
3.  [细节面板（Details Panels）](/documentation/zh-cn/unreal-engine/groom-asset-editor-user-guide-in-unreal-engine#detailspanels)：包括

## 视口显示选项

**视口显示选项（Viewport Display Options）** 工具栏提供基本的渲染和可视化选项。

![The Viewport Display Option Toolbar](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50752aba-cf4b-4fe2-ad01-97985506bba1/03-viewport-display-options-toolbar.png)

### 视口选项

**视口选项（Viewport Options）** 下拉菜单提供视口中的基本渲染选项。你可以切换实时模式、更改视野和设置超采样的界面百分比。

这些选项和其他选项可以使用视口显示选项工具栏中的下拉 **箭头** 进行访问。

![Viewport Options Dropdown Menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ba42e88-1531-40d1-80b7-ee6274216b67/04-viewport-options-dropdown-menu.png)

### 视角

**视角（Perspectives）** 下拉菜单提供透视和正交两种视图模式；透视视图相当于以普通3D视角显示关卡，而正交视角则是以2D视口的方式俯瞰关卡。

![The Perspectives Viewport Dropdown Menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b62e8f1e-b9e3-4158-8a81-9a9565b326b1/05-perspectives-dropdown.png)

### 视图模式

**视图模式（View Modes）** 下拉菜单提供所有编辑器视口中通用的多种可视化选项，例如视口的光照、优化、材质和曝光数值控制。

![The View Modes Dropdown Menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49873b09-d3fe-48b2-b82a-fad184d45272/06-view-modes-dropdown.png)

### 显示

**显示（Show）** 下拉菜单提供了与毛发资产编辑器相关的可视化选项，帮助你查看场景中要处理的数据类型，以及于此毛发相关的诊断错误或意外结果。

![The Show Dropdown Menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7277772f-c804-47e3-a930-cf5dd4945cef/07-show-dropdown.png)

属性

说明

**导线（Guide）**

显示用于模拟的导线。

**导线影响（Guide Influence）**

以彩色显示模拟中的毛发聚丛（所有受某根导线影响的发束）。

**UV**

显示每个发束的UV。

**根UV（Root UV）**

显示每个发束根部的UV。

**根UDIM（Root UDIM）**

在每个发束的根部显示UDIM。

**尺寸（Dimension）**

显示每个发束的宽度/长度变体。

**种子（Seed）**

（用彩色）显示每个发束使用的随机种子。

**半径差异（Radius Variation）**

（用彩色）显示发束的大小。蓝色表示较细的发束。黄色表示较粗的发束。

**切线（Tangent）**

显示每股发束的切线法相。

**底色（Base Color）**

显示每个顶点存储的底色。如果建模应用导出的毛发不包含底色，发束将显示为黑色。

**粗糙度（Roughness）**

显示每个顶点存储的粗糙度。如果建模应用导出的毛发不包含粗糙度，发束将显示为黑色。

**毛发CV（Hair CVs）**

显示毛发发束CVs。

**Vis.簇（Vis Cluster）**

显示用于剔除和细节层次用途的毛发簇。

**毛发群组（Hair Groups）**

显示毛发群组

**发片导线（Cards Guide）**

 

**显示（Show）** 下拉菜单中有一些可视化示例。

 

 

 

 

![Show Seed Visualization](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/514b298e-f36e-4527-a8a0-40cd9be834b7/08-show-seed.png)

![Show Hair CVs Visualization](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82bf8a4f-e9ac-421c-b967-55dec262fd66/09-show-hair-cvs.png)

![Show Vis. Clusters Visualization](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/662483aa-3311-4cdd-bcc7-2654c3d79854/10-show-vis-clusters.png)

![Show Base Color Visualization](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3340cd1f-0c07-411c-bde1-42b808dd54e8/11-show-base-color.png)

种子

毛发CV

Vis.簇

底色

### LOD

LOD下拉菜单允许你自动调节视口中的细节层次，或者以某一个指定的细节层次来显示毛发。

![The LODs Dropdown](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6e8935a-5b47-47d2-84ea-06c34790746c/12-lods-dropdown.png)

使用"LOD自动（LOD Auto）"选项时，LOD会根据[细节层次（Level of Detail）](/documentation/zh-cn/unreal-engine/groom-asset-editor-user-guide-in-unreal-engine#levelofdetail)面板中指定的选项自动切换。此选项根据LOD在视口中的屏幕尺寸来自动切换LOD。或者忽视毛发的屏幕尺寸，使用下拉菜单从已经生成的可用LOD中选择，查看它们的效果。

## 视口

在 **视口（Viewport）** 中，你可以查看导入的毛发资产，并在其不同的细节面板中进行更改；你还可以使用不同的可视化和调试模式来检验毛发。

## 细节面板

毛发资产编辑器中包含多个 **细节（Details）** 面板，用于控制与毛发有关的多种特性。

![Groom Asset Editor Details Panels](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85d76d19-4821-4ef4-8e2d-850b175ea3e0/groom-editor-panels.png)

探索下文，详细了解这些细节面板：

细节面板

说明

[细节级别（Level of Detail）](/documentation/zh-cn/unreal-engine/setting-up-level-of-detail-for-grooms-in-unreal-engine)

使用此面板配置你的Groom拥有的LOD数量，以其各自的属性。

[插值（Interpolation）](/documentation/zh-cn/unreal-engine/groom-interpolation-in-unreal-engine)

使用此面板定义Groom的曲线该如何根据蒙皮和物理模拟移动。

[发束（Strands）](/documentation/zh-cn/unreal-engine/groom-strands-in-unreal-engine)

使用此面板配置Groom的发束几何体的属性。

[发片（Cards）](/documentation/zh-cn/unreal-engine/setting-up-cards-and-meshes-for-grooms-in-unreal-engine)

使用此面板为Groom的LOD配置和生成发片几何体。这些发片将按LOD生成和分配。

[网格体（Meshes）](/documentation/zh-cn/unreal-engine/setting-up-cards-and-meshes-for-grooms-in-unreal-engine)

使使用此面板为Groom的LOD配置和生成网格体几何体。这些网格体将按LOD生成和分配。

[材质（Materials）](/documentation/zh-cn/unreal-engine/groom-materials-in-unreal-engine)

使用此面板为Groom分配材质。

[物理（Physics）](/documentation/zh-cn/unreal-engine/enabling-physics-simulation-on-grooms-in-unreal-engine)

使用此面板设置Groom的物理模拟。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [hair](https://dev.epicgames.com/community/search?query=hair)
-   [metahumans](https://dev.epicgames.com/community/search?query=metahumans)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [打开毛发资产编辑器](/documentation/zh-cn/unreal-engine/groom-asset-editor-user-guide-in-unreal-engine#%E6%89%93%E5%BC%80%E6%AF%9B%E5%8F%91%E8%B5%84%E4%BA%A7%E7%BC%96%E8%BE%91%E5%99%A8)
-   [毛发资产编辑器界面](/documentation/zh-cn/unreal-engine/groom-asset-editor-user-guide-in-unreal-engine#%E6%AF%9B%E5%8F%91%E8%B5%84%E4%BA%A7%E7%BC%96%E8%BE%91%E5%99%A8%E7%95%8C%E9%9D%A2)
-   [视口显示选项](/documentation/zh-cn/unreal-engine/groom-asset-editor-user-guide-in-unreal-engine#%E8%A7%86%E5%8F%A3%E6%98%BE%E7%A4%BA%E9%80%89%E9%A1%B9)
-   [视口选项](/documentation/zh-cn/unreal-engine/groom-asset-editor-user-guide-in-unreal-engine#%E8%A7%86%E5%8F%A3%E9%80%89%E9%A1%B9)
-   [视角](/documentation/zh-cn/unreal-engine/groom-asset-editor-user-guide-in-unreal-engine#%E8%A7%86%E8%A7%92)
-   [视图模式](/documentation/zh-cn/unreal-engine/groom-asset-editor-user-guide-in-unreal-engine#%E8%A7%86%E5%9B%BE%E6%A8%A1%E5%BC%8F)
-   [显示](/documentation/zh-cn/unreal-engine/groom-asset-editor-user-guide-in-unreal-engine#%E6%98%BE%E7%A4%BA)
-   [LOD](/documentation/zh-cn/unreal-engine/groom-asset-editor-user-guide-in-unreal-engine#lod)
-   [视口](/documentation/zh-cn/unreal-engine/groom-asset-editor-user-guide-in-unreal-engine#%E8%A7%86%E5%8F%A3)
-   [细节面板](/documentation/zh-cn/unreal-engine/groom-asset-editor-user-guide-in-unreal-engine#%E7%BB%86%E8%8A%82%E9%9D%A2%E6%9D%BF)
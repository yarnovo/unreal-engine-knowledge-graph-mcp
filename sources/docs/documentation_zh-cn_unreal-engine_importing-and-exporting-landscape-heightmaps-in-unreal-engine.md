# 在虚幻引擎中导入和导出地形高度图 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/importing-and-exporting-landscape-heightmaps-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:13:33.957Z

---

目录

![导入和导出地形高度图](https://dev.epicgames.com/community/api/documentation/image/56cbd11f-ba7b-4c75-9bcd-45ec65060fdf?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [Landscape地形概述](/documentation/zh-cn/unreal-engine/landscape-overview)
-   [创建地形](/documentation/zh-cn/unreal-engine/creating-landscapes-in-unreal-engine)

虚幻引擎地形系统将高度数据存储在高度图中，这是一个灰阶图像，使用黑白色值来存储地貌高程。在高度图中，纯黑色值（在所有RGB颜色通道中都为0）表示最低点，纯白色值（所有RGB颜色通道中都为255）表示最高点。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a51791b-e7c6-4097-99df-08880013df96/heightmap-example.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a51791b-e7c6-4097-99df-08880013df96/heightmap-example.png)

从Gaea导出的灰阶高度图示例。

虚幻引擎支持使用地貌生成应用程序（例如Gaea、World Machine、Terragen或Houdini）创建高度图，或使用以下格式在图像编辑应用程序中手绘高度图：

-   16位灰阶PNG
-   8位灰阶r8
-   16位灰阶r16

虚幻引擎还支持使用JSON sidecar文件的RAW格式高度图。如需更多信息，请参阅[地形技术指南](/documentation/zh-cn/unreal-engine/landscape-technical-guide-in-unreal-engine#%E5%AF%BC%E5%85%A5raw%E6%A0%BC%E5%BC%8F%E9%AB%98%E5%BA%A6%E5%9B%BE)。

## 导入自定义高度图

导入的高度图可以在创建地形时使用，或使用 **导入（Import）** 工具应用于现有地形。虚幻引擎还支持使用[世界分区](/documentation/zh-cn/unreal-engine/world-partition-in-unreal-engine)创建大型世界，并支持导入图块化高度图。

### 导入新地形的高度图

要在创建地形期间导入高度图，请执行以下操作：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d749311-4982-489f-9b50-1372338539ec/new-import-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d749311-4982-489f-9b50-1372338539ec/new-import-settings.png)

用于将高度图导入新地形的设置菜单。

1.  进入 **地形（Landscape）** 模式。
2.  点击 **从文件导入（Import from File）** 。如果使用[世界分区](/documentation/zh-cn/unreal-engine/world-partition-in-unreal-engine)，请调整以下额外设置。
    1.  调整 **世界分区网格大小（World Partition Grid Size）** 。
    2.  调整 **世界分区区域大小（World Partition Region Size）** 。
3.  点击 **高度图文件（Heightmap File）** 旁边的按钮并选择你的高度图。
    1.  如果你的高度图是图块化的，虚幻引擎会询问你是否要使用图块化图像路径。
    2.  点击 **是（Yes）** 以继续。
4.  计算你的高度图的Z轴刻度。
    
    1.  Z轴刻度公式是(以米为单位的高度图最大高度) x (100，以转换为厘米) x 0.001953125。如需关于计算Z轴刻度的更多信息，请参阅[地形技术指南](/documentation/zh-cn/unreal-engine/landscape-technical-guide-in-unreal-engine)。
    
    你可能需要基于生成高度图的应用程序调整高度图的X轴刻度和Y轴刻度。请参阅应用程序的文档，了解详情。
    
5.  单击 **导入（Import）** 。

### 导入现有地形的高度图

要将高度图导入现有地形，请执行以下操作：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/991360ca-0670-4558-a76c-918a6f7b7acf/existing-import-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/991360ca-0670-4558-a76c-918a6f7b7acf/existing-import-settings.png)

用于将高度图导入现有地形的设置菜单。

1.  进入 **地形（Landscape）** 模式。
2.  在 **管理（Manage）** 模式中，点击 **导入（Import）** 工具。
3.  点击 **高度图文件（Heightmap File）** 旁边的按钮并选择你的高度图。
    1.  如果你的高度图是图块化的，虚幻引擎会询问你是否要使用图块化图像路径。
    2.  点击 **是（Yes）** 以继续。
4.  根据需要调整设置。如需更多信息，请参阅[地形导入设置](/documentation/zh-cn/unreal-engine/importing-and-exporting-landscape-heightmaps-in-unreal-engine#%E5%9C%B0%E5%BD%A2%E5%AF%BC%E5%85%A5%E8%AE%BE%E7%BD%AE)。
5.  调整 **导入类型（Import Type）** 。如果你要使用[世界分区](/documentation/zh-cn/unreal-engine/world-partition-in-unreal-engine)，请选择 **子区域（Subregion）** 。
6.  将 **模式（Mode）** 选项调整为 **全部（All）** 。
7.  单击 **导入（Import）** 。

## 地形导入设置

### 导入设置 - 新地形

**选项**

**说明**

**启用编辑层（Enable Edit Layers）**

开启/关闭对[地形编辑层](/documentation/zh-cn/unreal-engine/landscape-edit-layers-in-unreal-engine)的支持。

**翻转Y轴（Flip Y Axis）**

翻转导入文件的Y坐标。这用于解决图块化高度图在导入时不能恰当地吻合的问题。

**世界分区网格大小（World Partition Grid Size）**

定义每个地形组件沿X轴和Y轴使用的地形流送代理数量。需要[世界分区](/documentation/zh-cn/unreal-engine/world-partition-in-unreal-engine)。

**世界分区区域大小（World Partition Region Size）**

定义每个轴上每个世界分区区域的地形组件数量。需要[世界分区](/documentation/zh-cn/unreal-engine/world-partition-in-unreal-engine)。

**高度图文件（Heightmap File）**

选择要导入的高度图文件。

**高度图分辨率（Heightmap Resolution）**

定义高度图分辨率。虚幻引擎会从你的高度图文件读取此信息，并自动填充正确的值。

**材质（Material）**

定义初始应用于地形的地形材质。

**层Alphamap类型（Layer Alphamap Type）**

定义创建的新地形层是 **叠加（Additive）** 还是 **分层（Layered）** （权重混合）。仅在选择默认材质时可用。

**层（Layers）**

显示将在导入时创建的地形层。仅在选择默认材质时可用。

**位置（Location）**

定义新地形的位置。

**旋转（Rotation）**

定义新地形的旋转。

**比例（Scale）**

定义新地形上每个顶点之间的距离。如需关于计算地形比例的更多信息，请参阅[地形技术指南](/documentation/zh-cn/unreal-engine/landscape-technical-guide-in-unreal-engine)。

**分段大小（Section Size）**

定义地形分段中的四边形数量。一个分段是地形渲染期间LOD的过渡单位。

**每个组件的分段数（Sections Per Component）**

定义每个地形组件中的分段数量。该值和分段大小将确定每个地形组件的大小。如需关于地形组件的更多信息，请参阅[地形技术指南](/documentation/zh-cn/unreal-engine/landscape-technical-guide-in-unreal-engine)。

**组件数量（Number of Components）**

确定X轴和Y轴上的组件数量。该值将确定地形的总体大小。

**总体分辨率（Overall Resolution）**

显示地形的最终总体分辨率。

**组件总数（Total Components）**

显示地形中的组件总数。

**编辑层（Edit Layers）**

显示将在新地形上创建的编辑层。

**编辑层蓝图笔刷（Edit Layers Blueprint Brushes）**

显示将在新地形上创建的编辑层蓝图笔刷。

### 导入设置 - 现有地形

**选项**

**说明**

**高度图文件（Heightmap File）**

选择要导入的高度图文件。

**导入类型（Import Type）**

确定如何处理导入的高度数据。该下拉菜单有以下选项：

-   **原始（Original）** ：在小工具位置按原始大小导入高度图数据。
-   **扩展（Expand）** ：在小工具位置导入数据并扩展数据以吻合地形。
-   **重新采样（Resample）** ：对导入的数据重新采样以吻合地形。
-   **子区域（Subregion）** ：在小工具位置导入高度图数据，而不检查分辨率。

**翻转Y轴（Flip Y Axis）**

翻转导入文件的Y坐标。这用于解决图块化高度图在导入时不能恰当地吻合的问题。

**导入分辨率（Import Resolution）**

定义导入的高度图分辨率。虚幻引擎会从你的高度图文件读取此信息，并自动填充正确的值。

**层（Layers）**

显示将在导入时创建的地形层。仅在选择默认材质时可用。

**模式（Mode）**

确定是仅导入加载的区域还是导入所有区域。

**将小工具对齐到地形网格（Snap Gizmo to Landscape grid）**

确定如何处理导入的高度数据。该下拉菜单有以下选项：

-   **无（None）** ：无对齐。
-   **纹素（Texel）** ：使用纹素大小对齐。
-   **组件（Component）** ：使用地形组件大小对齐。

**编辑层（Edit Layers）**

显示将在地形上创建的编辑层。

**编辑蓝图层（Edit Layer Blueprint Brushes）**

显示将在地形上创建的编辑层蓝图笔刷。

## 导出高度图

虚幻引擎可以将你的高度图文件导出为16位灰阶.png或16位灰阶.r16文件，并支持各种选项。

### 导出高度图

要导出你的高度图，请执行以下操作：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e8efa76-ac7d-4e72-a3d1-e8122ddfd5f0/export-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e8efa76-ac7d-4e72-a3d1-e8122ddfd5f0/export-settings.png)

用于导出现有地形的高度图的设置菜单。

1.  进入 **地形（Landscape）** 模式。
2.  在 **管理（Manage）** 模式中，点击 **导入（Import）** 工具。
3.  点击 **导出（Export）** 。
4.  点击 **高度图文件（Heightmap File）** 旁边的复选框按钮，然后点击文本框旁边的按钮选择你的高度图。
5.  为你的文件命名，并选择 **另存为类型（Save as type）** 。完成后，点击 **保存（Save）** 按钮。
6.  根据需要调整设置。如需更多信息，请参阅[地形导出设置](/documentation/zh-cn/unreal-engine/importing-and-exporting-landscape-heightmaps-in-unreal-engine#%E5%9C%B0%E5%BD%A2%E5%AF%BC%E5%87%BA%E8%AE%BE%E7%BD%AE)。
7.  单击 **导出（Export）** 。

## 地形导出设置

**选项**

**说明**

**高度图文件（Heightmap File）**

选择新导出的高度图文件的文件名和文件位置。

**翻转Y轴（Flip Y Axis）**

翻转导出文件的Y坐标。

**导出单个文件（Export Single File）**

将高度图导出为单个文件。如果为false，则将高度图导出为图块化高度图。需要[世界分区](/documentation/zh-cn/unreal-engine/world-partition-in-unreal-engine)。

**导出选定编辑层（Export Selected Edit Layer）**

导出选定的编辑层。如果为false，导则出所有编辑层的混合结果。

**层（Layers）**

显示将导出的地形层。

**模式（Mode）**

确定是仅导出加载的区域还是导出所有区域。

**将小工具对齐到地形网格（Snap Gizmo to Landscape grid）**

确定如何处理导入的高度数据。该下拉菜单有以下选项：

-   **无（None）** ：无对齐。
-   **纹素（Texel）** ：使用纹素大小对齐。
-   **组件（Component）** ：使用地形组件大小对齐。

**编辑层（Edit Layers）**

显示将随地形导出的编辑层。

**编辑层蓝图笔刷（Edit Layers Blueprint Brushes）**

显示将随地形导出的编辑层蓝图笔刷。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [导入自定义高度图](/documentation/zh-cn/unreal-engine/importing-and-exporting-landscape-heightmaps-in-unreal-engine#%E5%AF%BC%E5%85%A5%E8%87%AA%E5%AE%9A%E4%B9%89%E9%AB%98%E5%BA%A6%E5%9B%BE)
-   [导入新地形的高度图](/documentation/zh-cn/unreal-engine/importing-and-exporting-landscape-heightmaps-in-unreal-engine#%E5%AF%BC%E5%85%A5%E6%96%B0%E5%9C%B0%E5%BD%A2%E7%9A%84%E9%AB%98%E5%BA%A6%E5%9B%BE)
-   [导入现有地形的高度图](/documentation/zh-cn/unreal-engine/importing-and-exporting-landscape-heightmaps-in-unreal-engine#%E5%AF%BC%E5%85%A5%E7%8E%B0%E6%9C%89%E5%9C%B0%E5%BD%A2%E7%9A%84%E9%AB%98%E5%BA%A6%E5%9B%BE)
-   [地形导入设置](/documentation/zh-cn/unreal-engine/importing-and-exporting-landscape-heightmaps-in-unreal-engine#%E5%9C%B0%E5%BD%A2%E5%AF%BC%E5%85%A5%E8%AE%BE%E7%BD%AE)
-   [导入设置 - 新地形](/documentation/zh-cn/unreal-engine/importing-and-exporting-landscape-heightmaps-in-unreal-engine#%E5%AF%BC%E5%85%A5%E8%AE%BE%E7%BD%AE-%E6%96%B0%E5%9C%B0%E5%BD%A2)
-   [导入设置 - 现有地形](/documentation/zh-cn/unreal-engine/importing-and-exporting-landscape-heightmaps-in-unreal-engine#%E5%AF%BC%E5%85%A5%E8%AE%BE%E7%BD%AE-%E7%8E%B0%E6%9C%89%E5%9C%B0%E5%BD%A2)
-   [导出高度图](/documentation/zh-cn/unreal-engine/importing-and-exporting-landscape-heightmaps-in-unreal-engine#%E5%AF%BC%E5%87%BA%E9%AB%98%E5%BA%A6%E5%9B%BE)
-   [导出高度图](/documentation/zh-cn/unreal-engine/importing-and-exporting-landscape-heightmaps-in-unreal-engine#%E5%AF%BC%E5%87%BA%E9%AB%98%E5%BA%A6%E5%9B%BE-2)
-   [地形导出设置](/documentation/zh-cn/unreal-engine/importing-and-exporting-landscape-heightmaps-in-unreal-engine#%E5%9C%B0%E5%BD%A2%E5%AF%BC%E5%87%BA%E8%AE%BE%E7%BD%AE)
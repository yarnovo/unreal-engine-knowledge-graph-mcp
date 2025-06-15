# 虚幻引擎中的Paper 2D 图块集/图块地图 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/paper-2d-tile-sets-and-tile-maps-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:16:42.827Z

---

目录

![Paper 2D 图块集/图块地图](https://dev.epicgames.com/community/api/documentation/image/087b537b-0ebd-4dc1-9659-5862e460a5b7?resizing_type=fill&width=1920&height=335)

此页面中的功能当前仍处于 **实验阶段**，因此可能不支持部分功能。

通过 **Paper 2D** 中的 **图块集** 和 **图块地图** 可快速完成框架布局，或 2D 关卡的"整体布局"。结合图块地图（含明确高宽的图块的 2D 网格）创建并使用图块集（从纹理拉取的图块合集）后，即可选择诸多图块"绘制"到图块地图上，然后利用图块地图进行关卡布局。也可在多个层上进行图块绘制，并指定特定层中地图的每个单元格上出现的图块。

## 创建图块集

和其他资源相似，可在 **内容浏览器** 中创建图块集。它们既可作为空白资源从头创建，也可从其他现有资源中生成。

### 空白图块集

**新建空白图块集资源的步骤：**

1.  点击 **内容浏览器** 中的 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e36bf4fc-22e8-4294-b5cb-e38e574b490d/addnewbutton.png) 按钮，然后在 *Miscellaneous* 下选择 **Tile Set**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78fbf31a-45d1-4727-b2b9-ee085e2104d8/tilesetbutton.png)
2.  为新建的图块集资源命名。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2505d2e4-e986-4f6b-8c9e-0a72528e01d0/papertitleset.png)
3.  **双击** 资源将其在 **Tile Set Editor** 窗口中打开。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c48a13ba-cf64-42ec-8389-9d46d1b376b5/papertitleseteditor.png)
4.  在 **Details** 面板中指定一个 **Tile Sheet** 纹理资源进行使用。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/035966cd-aa33-4a0a-a614-97fdc8da380f/tilesetdata.png)

### 从纹理创建图块集

**从现有纹理创建图块集：**

1.  在 **内容浏览器** 中 **右键单击** 纹理资源，然后在 *Sprite Actions* 下选择 **Create Tile Set**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97591d5d-d720-44d2-a3ae-134d42dfd24d/rightclickmethod.png)
2.  将基于所提供的纹理自动完成图块集的创建和命名。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0da8a413-f52e-419a-a595-d853fac49962/autocreate.png)
    
    点击资源并按下 **F2**，或 **单击右键** 选择 **Rename** 即可重命名资源。
    
3.  **双击** 资源将其在 **Tile Set Editor** 窗口中打开。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e314692-a314-456a-a603-031d1b1e601d/createdtitleset.png)

## 图块集编辑器

新建一个图块集资源后，**双击** 将其在 **图块集编辑器** 中打开。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84ccbd14-97f3-4889-935b-192c94fcfdfb/tileseteditorwindow.png)

在上图的 **视口** 窗口（1）中可找到指定用于图块集的图块表单。**图块编辑器（Tile Editor）** 窗口（2）显示当前选中的图块。可在 **Details** 面板中进行诸多设置，对图块集或组成图块集的单个 Sprite 产生影响（查看下方的 *配置图块集*）。

### 配置图块集

对图块集进行配置很有必要，以便精确选择表单中的每个图块。

在 **视口** 中 **左键单击** 图块表单将出现一个白色的图块选择框，显示当前选中的图块。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cdeb2bc4-fb62-430e-a31b-6cb253114e83/defaultsettings.png)

在视口中进行 **鼠标右键** 拖动可执行平移，使用 **鼠标滚轮** 可在图块表单上进行放大缩小。

上图中的白色选择框代表默认使用的 32 像素 **图块宽度** 和 **图块高度**。然而我们使用的图块明显大于此默认值，因此需要使图块宽度和高度覆盖整个图块（图中黄色框所示）。

**图块编辑器** 预览窗口显示当前选中的图块及其相关的图块编号（下图所示）。在下方的 **Details** 面板中可调整 *图块宽度* 和 *图块高度*，使其完全包含整个图块。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45faa9bc-c8f1-4c15-8fce-a3893956dfbc/currentlyselectedtile.png)

在此例中，我们将 *图块宽度* 和 *图块高度* 增加到 64 像素，以匹配图块尺寸。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d3450c7-fafe-4669-888a-ede5db8fb913/updatedtilesheet.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d3450c7-fafe-4669-888a-ede5db8fb913/updatedtilesheet.png)

*点击查看全图。*

视口中，白色图块选择框和图块表单中单独的一个图块完全重合（可能需要根据图块表单的设置方式试验多个数值）。图块编辑器窗口也更新显示在图块表单中选中的单个图块。

除设置 *图块宽度* 和 *图块高度* 外，还可在 **Details** 面板中通过以下设置对图块集进行更多设置。

设置

描述

**Tile Width**

单个图块的宽度（像素）。

**Tile Height**

单个图块的高度（像素）。

**Margin**

沿图块表单周长的填充量（像素）。

**Spacing**

图块表单中图块之间的填充量（像素）。

**Drawing Offset**

此集中图块的绘制偏移（像素）。

**Background Color**

图块集查看器中显示的背景颜色。

### 单个图块设置/应用图块碰撞

在 **Details** 面板中还可进行单个图块设置（如应用碰撞到特定的图块）。

**对图块应用碰撞**：

1.  在视口中选择图块（1），然后点击用于碰撞的外形（2）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aee5ef8d-4b34-4d7f-ae6e-3c31f834553e/collision_1.png)
2.  外形将被应用，还可在 **图块编辑器** 窗口中进行更多编辑。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36b61edc-604c-4626-9dfc-228664fdb6c3/collision_2.png)
    
    留意编辑中的图块编号（上图绿色框），需要通过它应用设置到这个特定的图块。
    
3.  在 **Details** 面板中的 **Sprite** 部分下找到选中的图块并改为所需的 **几何体类型（Geometry Type）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad1d7932-0391-4786-af82-46e40a789f03/collision_3.png)
    
    如需了解关于 sprite 碰撞类型的内容，请查阅 [**Sprite 碰撞**](/documentation/zh-cn/unreal-engine/paper-2d-sprite-collision-in-unreal-engine) 文档。
    

这将基于指定的几何体类型和使用的外形设置图块的碰撞。为使碰撞在游戏中实际生效，创建 **图块地图** 时需要设置 **Sprite 碰撞域**（查阅以下图块地图的创建/使用信息）。

## 创建图块地图

图块地图在 **内容浏览器** 中进行创建，在 **图块地图编辑器（Tile Map Editor）** 中进行编辑。

### 新建图块地图

**新建图块地图资源的步骤：**

1.  在 **内容浏览器** 中点击 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a297b8f7-7082-4c51-aa9e-dcad6c0cbc8e/addnewbutton.png) 按钮，然后在 *Miscellaneous* 下选择 **Tile Map**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eebd7ebf-edf4-47c0-bc4e-a26a4d0bb9ee/newtilemap.png)
2.  为新建的图块地图资源命名。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b5de716-e849-4358-bc5b-d6a9e763f564/newpapertilemap.png)
3.  **双击** 资源将其在 **图块地图编辑器** 窗口中打开。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c976c6f-14a8-4018-94de-aa52aa783d87/tilemapeditorwindow.png)

## 图块地图编辑器

打开一个新的图块地图资源后，在图块地图编辑器中开始工作之前需要指定一个 **Active Tile Set** 进行使用。

1.  在 **工具箱** 窗口中点击 **选择** 框即可指定使用的 **活动图块集（Active Tile Set）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36d65033-1ab0-4a10-84c1-605f747e49a2/selecttilesetwindow.png)
    
    然后选择当前需要使用的图块集。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1028666c-93cd-4334-b986-418fc94f2681/selecttileset.png)
    
    创建的所有图块集均会显示在上图窗口中，以便您切换使用"活动图块集"。
    
2.  选中一个图块集后，查看器将更新选择。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8667cc4-622d-4b3a-b5f4-0fc79f77c938/tilemapreadytoedit.png)

组成图块地图编辑器的三个窗口显示如下。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2418b046-f16d-4c34-aa3c-0a30dcb5bcc7/tilemapeditoroverview.png)

在上图的 **工具盒** 窗口中（1），可在不同图块集之间切换使用，完成图块地图的创建。用于 **绘制**、**消除** 或 **填充** 地图上图块的工具也显示于此（此外还包括翻转或旋转当前选中图块的选项）。此窗口的底部包含查看器，它的导航操作与图块集查看器相同（**鼠标右键** 拖动平移，**鼠标滚轮** 放大缩小）。

中间的窗口为 **视口**（2），用于填充图块地图布局。使用工具箱中的工具可对地图上的图块进行填充，通过对组成图块地图的图块进行绘制、消除或填充实现所需的效果。您可在此处按照自己的思路对游戏中的地图进行"绘制"。

在 **Details** 面板中（3），可对图块地图的层数进行配置，并对诸多设置进行调整（如图块地图自身的高/宽、组成地图的图块高/宽、虚幻单位和像素之间的转换系数、使用的碰撞类型，等等）。

### 启用图块地图的碰撞

如图块集部分所述，指定哪些图块使用碰撞后，还需要设置图块地图使用的碰撞类型。可在 **Details** 面板下的 **Collision** 部分进行设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/424e9895-ffef-408a-a980-4cb2c3bb2f77/collision_4.png)

可对碰撞厚度（即为使用 3D 碰撞域时碰撞几何体的挤压厚度）以及碰撞域（决定图块地图是否应拥有碰撞几何体并参与到物理世界中）进行设置。

**Use 2D Physics** 选项当前仍在调试阶段，可能存在问题，建议使用 **Use 3D Physics** 选项。

在关卡中进行游戏时，可通过 **Show Collision** 控制台命令检查图块是否带有碰撞。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5818bb8f-171d-4726-b508-550b81eb7379/showcollision.png)

上图中，角色行走的上层地面图块应用了碰撞，而下层地面图块和水波图块未应用碰撞。

## 图块地图工作流范例

以下是创建图块地图的典型工作流范例。

1.  打开图块地图资源。
    
2.  在 **Details** 面板中设置图块地图的 **Map Width** 和 **Map Height**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09419202-e8c3-47fc-9d80-23e42d655314/setmapsize.png)
    
    这即是地图或关卡的尺寸。
    
3.  然后设置地图中单个图块的 **Tile Width** 和 **Tile Height**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d2158b5-34d4-48cc-8e57-c16af4eebf23/tilesizesinmap.png)
    
    它们通常是图块集中定义的相同尺寸。
    
4.  指定 **活跃图块集** 进行使用，构建图块地图。
    
5.  再添加一些额外的层（一层为背景、一层为前景、一层为可进行操作的关卡几何体）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12e6b0d6-7aec-4ab9-a1f0-14b7fdc7850d/readytopaint.png)
    
    这可根据您的需求任选，通常一层为背景元素、一层为前景元素、另外一层放置角色行走的关卡几何体（地面、盒子、平台等）。
    
6.  在查看器中选中一个图块，然后在地图中 **单击左键** 将其绘制在地图上。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7879eb7-4e09-4049-9a9e-4c2f26d9efea/beginpainting.png)
    
    在查看器中 **单击左键** 并在图块上拖动，可同时选择多个图块并在地图中将它们绘制。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ddee858-a4bb-4da1-971e-cbb0d7698cae/multipletiles.png)
    
    之后即可在地图中使用选中的图块进行绘制。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/adddb0fd-0f75-4e92-aa90-c743d701e260/inmapmultipletiles.png)
7.  继续在地图上绘制、填充或移除图块，达成预期的布局效果。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15e4704e-34d5-4b5a-b717-801906a49c8d/examplemap.png)
8.  必须在 **Details** 面板的 **Collision** 部分启用碰撞。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da1426fa-3ef6-49d8-934d-4b01b0b596b3/collision_4.png)
    
    必须在图块集中指定哪些图块带有碰撞，哪些图块不带碰撞。
    
9.  将图块地图资源拖入关卡，根据需求进行缩放或移动。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01eb90bf-0b18-4b23-8158-316f8d2d5219/examplegameimage.png)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建图块集](/documentation/zh-cn/unreal-engine/paper-2d-tile-sets-and-tile-maps-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%9B%BE%E5%9D%97%E9%9B%86)
-   [空白图块集](/documentation/zh-cn/unreal-engine/paper-2d-tile-sets-and-tile-maps-in-unreal-engine#%E7%A9%BA%E7%99%BD%E5%9B%BE%E5%9D%97%E9%9B%86)
-   [从纹理创建图块集](/documentation/zh-cn/unreal-engine/paper-2d-tile-sets-and-tile-maps-in-unreal-engine#%E4%BB%8E%E7%BA%B9%E7%90%86%E5%88%9B%E5%BB%BA%E5%9B%BE%E5%9D%97%E9%9B%86)
-   [图块集编辑器](/documentation/zh-cn/unreal-engine/paper-2d-tile-sets-and-tile-maps-in-unreal-engine#%E5%9B%BE%E5%9D%97%E9%9B%86%E7%BC%96%E8%BE%91%E5%99%A8)
-   [配置图块集](/documentation/zh-cn/unreal-engine/paper-2d-tile-sets-and-tile-maps-in-unreal-engine#%E9%85%8D%E7%BD%AE%E5%9B%BE%E5%9D%97%E9%9B%86)
-   [单个图块设置/应用图块碰撞](/documentation/zh-cn/unreal-engine/paper-2d-tile-sets-and-tile-maps-in-unreal-engine#%E5%8D%95%E4%B8%AA%E5%9B%BE%E5%9D%97%E8%AE%BE%E7%BD%AE/%E5%BA%94%E7%94%A8%E5%9B%BE%E5%9D%97%E7%A2%B0%E6%92%9E)
-   [创建图块地图](/documentation/zh-cn/unreal-engine/paper-2d-tile-sets-and-tile-maps-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%9B%BE%E5%9D%97%E5%9C%B0%E5%9B%BE)
-   [新建图块地图](/documentation/zh-cn/unreal-engine/paper-2d-tile-sets-and-tile-maps-in-unreal-engine#%E6%96%B0%E5%BB%BA%E5%9B%BE%E5%9D%97%E5%9C%B0%E5%9B%BE)
-   [图块地图编辑器](/documentation/zh-cn/unreal-engine/paper-2d-tile-sets-and-tile-maps-in-unreal-engine#%E5%9B%BE%E5%9D%97%E5%9C%B0%E5%9B%BE%E7%BC%96%E8%BE%91%E5%99%A8)
-   [启用图块地图的碰撞](/documentation/zh-cn/unreal-engine/paper-2d-tile-sets-and-tile-maps-in-unreal-engine#%E5%90%AF%E7%94%A8%E5%9B%BE%E5%9D%97%E5%9C%B0%E5%9B%BE%E7%9A%84%E7%A2%B0%E6%92%9E)
-   [图块地图工作流范例](/documentation/zh-cn/unreal-engine/paper-2d-tile-sets-and-tile-maps-in-unreal-engine#%E5%9B%BE%E5%9D%97%E5%9C%B0%E5%9B%BE%E5%B7%A5%E4%BD%9C%E6%B5%81%E8%8C%83%E4%BE%8B)

相关文档

[

材质

![材质](https://dev.epicgames.com/community/api/documentation/image/cdeef2f5-00ad-4403-bbd3-ee8f0b14330e?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-materials)

[

纹理

![纹理](https://dev.epicgames.com/community/api/documentation/image/ba1ff4b2-613a-41ac-a7d1-d350fedca14e?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine)
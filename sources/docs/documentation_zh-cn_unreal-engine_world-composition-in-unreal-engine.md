# 虚幻引擎中的World Composition | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/world-composition-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:20:25.794Z

---

目录

![World Composition](https://dev.epicgames.com/community/api/documentation/image/3c0ba817-e419-4c07-a7f5-17afbe72b259?resizing_type=fill&width=1920&height=335)

**世界场景构成（World Composition）** 旨在简化大型世界场景的管理。其目的之一是避免使用 持久关卡来存储流送信息，因为这会给团队中的关卡设计师同时处理关卡 造成瓶颈。持久关卡不存储任何流送信息，而是扫描文件夹 并将找到的所有关卡视为流送关卡。每个流送关卡的信息存储在包头中， 不用把关卡加载到内存中，"世界场景构成"就能读取这些信息。默认情况下，除持续关卡 之外的所有关卡都会在"世界场景构成"中卸载。你可以随时手动加载或卸载世界场景的任何部分。

"世界场景构成"依赖于世界场景原点移位功能，在基于距离的关卡流送中使用时， 可以创建出不局限于引擎中硬编码的`WORLD_MAX`常量值的世界场景。

World Composition是此前用于关卡流送的旧版系统。现在我们推荐使用虚幻引擎5.0或更高版本中的[世界分区（World Partition）](/documentation/zh-cn/unreal-engine/world-partition-in-unreal-engine)来实现项目的关卡流送。

## 激活世界场景构成

"世界场景构成"管理的世界场景可以通过启用 **世界场景设置（World Settings）** 中的 **启用世界场景构成（Enable World Composition）** 标记来激活。

你也可以禁用世界场景原点移位，只需关闭"世界场景设置"中的"启用世界场景构成"即可。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ed3569e-fdaf-4397-88c5-9846546b3d97/worldbrowsersettings.png)

## 关卡层级

激活"世界场景构成"后，项目中的所有关卡都将显示在 **关卡（Levels）** 窗口中。要打开 此窗口，单击 **Windows** 菜单，然后选择"关卡"。

"关卡"窗口中的条目表示世界场景的层级。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0b6bd10-5d2a-44e1-adbe-220826cab429/levelswindow.png)

名称显示为蓝色文字的关卡是当前关卡。当前加载的关卡名称显示为白色文字，而卸载的关卡名称显示为灰色。

要将关卡加载到"世界场景构成"中，只需 **双击** 其名称即可。通过拖放操作可以设置各个关卡之间的关系。 子关卡存储其相对于父关卡的位置，因此如果更改父关卡的位置，那么所有子关卡的位置将相应地重新计算。

在"关卡"窗口中，你可以锁定和保存关卡，也可以用关卡名称右侧的按钮打开每个关卡的 **关卡蓝图**。

## 关卡构成

打开"启用世界场景构成"后，在"关卡"窗口顶部有一个按钮可打开"世界场景构成"。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74b37a38-edfc-436a-9735-1ef50c839422/worldcomposition.png)

在这里，你可以看到世界场景的布局。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29d425fe-8984-4080-96a2-c0daabdd56bc/world_layout.png)

### 图层

默认情况下，所有关卡被分配给 **未分类（Uncategorized）** 图层。图层存储有关流送距离的信息，因此分配给特定图层的关卡 会继承这个关卡的流送距离。分配给禁用流送距离的图层的关卡将从距离流送中排除，但是可以 通过蓝图来控制。

单击现有图层名称右侧的 **Add(+)** 按钮可以创建新图层。 每个关卡一次只能分配给一个图层。

图层无法删除或编辑，因此如果想更改流送距离设置，可创建具有所需设置的新图层并为其分配对应的关卡。 下次打开关卡时，会自动删除未分配关卡的图层。

单击小地图上的图层名称，可以逐层过滤关卡。使用 **Control+鼠标单击** 可在多个图层之间切换。 无任何图层打开时，无法执行过滤。

### 小地图

除持久关卡外，小地图上会显示每个关卡在世界场景中的图像和位置。每次更改关卡的内容时， 关卡的图像都会更新。使用此地图可从上方预览世界场景并拖动关卡调整其位置。当 拖动关卡时，它们会与其他关卡的边对齐。按住 **Control** 键会使关卡移动 使用关卡编辑器的对齐设置。请注意，关卡位置存储为整数坐标值，因此为了精确匹配相邻 关卡拼贴，必须将关卡的边界值设置为整数。

基于地形Actor的关卡会根据基础地形组件的尺寸进行对齐。这样做是为了能在不同关卡 的地形Actor之间进行无缝编辑。

所有地形Actor都会在编辑器视口中禁用转换，以确保地形不能任意移动， 从而无法与其他地形关卡对齐。

首次将关卡加载到"世界场景构成"中时，将在该关卡中自动创建一个新的关卡边界Actor。 关卡边界Actor用于计算关卡的大小。

默认情况下，关卡边界Actor会自动调整大小，以包含存在于关卡中的所有Actor。但是，某些 Actor（如天空盒）的边界框可能会非常大，这会导致世界场景小地图中的关卡拼贴变得非常大。 如果你有此类Actor且不希望包含在关卡边界计算中，可以禁用 自动关卡边界计算，为关卡边界Actor设置固定的大小。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffa977d9-b376-4069-9fde-95b8b823640a/transform.png)

目前，必须在视口中启用"实时（Realtime）"功能，才能使关卡边界Actor正常工作。

小地图上的黄色矩形表示安全编辑区域。安全编辑区域的大小等于引擎中的`WORLD_MAX`常量。 此区域外的关卡会自动隐藏，其关卡图像将反映此情况。"世界场景构成"试图 将正在处理的关卡保持在编辑器世界原点附近。此功能称为"聚焦"，在对安全编辑区域外的关卡进行编辑时， 可能会将当前世界原点移动到新位置。移位后的关卡仍保留Actor在保存时的原始 转换，因此保存当前移位的关卡不会更改Actor的绝对位置。

### UI键

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e8fcb2d-34d6-4da3-a8b1-defea9a268b9/world_layout_ui.jpg)

编号

状态栏

说明

1

图层（Layers）

单击图层名称来切换该图层的过滤，或单击 **+** 来创建新图层。

2

`WORLD_MAX`

此栏显示`WORLD_MAX`常量的比例。

3

世界场景原点（World Origin）

世界场景原点的当前位置。

4

当前关卡（Current Level）

当前关卡的名称。

5

鼠标光标位置（Mouse Cursor Position）

鼠标光标的当前世界场景位置。

6

框选（Marquee Selection）

以世界场景单位显示的选取框的大小。

7

世界场景大小（World Size）

世界场景的大小，计算为所有关卡边界框的总和。

## 关卡细节

要在"关卡"窗口中查看任何关卡的细节，选中该关卡，然后单击工具栏中的放大镜图标。这将打开 **关卡细节（Level Details）** 窗口，也可用其中的下拉菜单切换可用关卡信息。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1de0811d-e74e-4e35-95da-e167ffda8336/level_details.png)

### 拼贴设置

设置

说明

包名称（Package Name）

所选关卡的包名称。它是只读信息。

父包名称（Parent Package Name）

父关卡的包名称。如果为关卡指定了父级，则其位置将相对于父关卡。

位置（Position）

关卡从世界场景原点零偏移，存储为整数2D矢量。当关卡添加到世界场景（变为可见）时，关卡中的所有Actor都会按此值移位并在该关卡从世界场景中删除（变为隐藏）时移回。

绝对位置（Absolute Position）

关卡的绝对位置。它与关卡没有父级时的 **位置** 相同。它是只读信息。

Z顺序

定义小地图中关卡拼贴的Z排序顺序。当存在多个重叠的拼贴且希望按特定顺序排序时，这很实用。

### LOD设置

"世界场景构成"中的每个关卡最多可以有4个LOD流送关卡。LOD流送关卡类似于 网格体LOD。根据流送距离设置，流关卡将替换为相应的LOD关卡。世界 场景构成使用\[Package name\]\_LOD#模式自动发现LOD关卡。其中＃为从1到4。 LOD关卡可以手动创建，也可以使用自动LOD贴图生成器创建。

设置

说明

LOD数量

所选关卡的LOD关卡数。

LOD\[1..4\]

 

生成（Generate）

通过将关卡中包含的静态网格体Actor合并为一个简化的代理网格体来生成原始关卡的简化版本。地形Actor将使用最高地形LOD转换为静态网格体。通常，如果关卡具有地形、Actor和多个静态网格体Actor，将产生包含2个简化的静态网格体Actor的LOD关卡。此操作将覆盖磁盘上先前存在的LOD关卡。

距离（Distance）

相对于原始关卡流送距离的距离。例如，如果原始关卡的流送距离 = 1000，LOD 1关卡距离为1500，则可以在\[1000..2500\]的范围内看到LOD1关卡，在\[0..1000\]的范围内看到原始关卡。

细节百分比（Details percentage）

缩小原始网格体时保留的细节的百分比。

## 世界场景原点移位

"世界场景构成"编辑器支持以任意的量移动世界场景原点。当移动世界场景原点时，会向世界场景中注册的所有 **Actor** 添加偏移矢量。每个Actor都有一个ApplyWorldOffset函数，可在子类中覆盖该函数以执行其他操作。如果创建了一个新的AActor派生类并将绝对位置值存储在其中，则必须覆盖ApplyWorldOffset函数，以使其适用于世界场景原点更改并将绝对值移至其中。渲染和物理Primitives会与游戏线程中的Actor并行移位。

## 大型世界场景与多人游戏

目前，多人游戏不支持世界场景原点移位。你可以根据需要实施以下两种解决方案：

1.  实施自己的服务器方案。MMO被许可人大多是这样。
2.  在客户端和虚幻专用服务器之间实施某些层，将移位的绝对位置从客户端转换，然后路由到仅部分存储客户端所在世界场景的相应专用服务器。

但是，如果禁用世界场景原点移位，可使用专用服务器运行拼贴的世界场景。 专用服务器将加载所有依赖于距离的关卡，每个连接到它的客户端将照常只加载满足流送距离设置的关卡。服务器存储每个客户端的可见关卡列表，并通过此列表过滤Actor复制。

## 创建地形关卡

**右键单击** 关卡拼贴来调用包含地形Actor的情境菜单时，将显示用于添加具有地形代理Actor的相邻关卡的选项。这要求相邻关卡的地形大小与源地形大小相等。

### 导入拼贴地形

在 **关卡（Levels）** 面板工具栏中，可以找到用于导入拼贴地形的选项。拼贴地形是从拼贴高度图创建的。每个高度图的拼贴表示包含地形Actor的关卡。拼贴高度图/权重图可从World Machine等应用程序导出。相邻的高度图拼贴应共享边界顶点（在World Machine中为"共享边顶点"）。此外，每个拼贴的分辨率都应遵循[创建地形](/documentation/zh-cn/unreal-engine/creating-landscapes-in-unreal-engine)页面上的建议。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/237c981a-fdb8-472d-8845-9769038d1f76/tiled_heightmap_import.png)

设置

说明

选择高度图拼贴...（Select Heightmap Tiles...）

你可以选择要导入的多个高度图拼贴。

反转拼贴Y坐标（Flip Tile Y Coordinate）

你可以设置是否导入Y轴反转的拼贴。导入在World Machine中创建的拼贴时，应启用此选项。

拼贴坐标偏移（Tile Coordinates Offset）

从原点偏移拼贴。设置为0时，将在世界创建原点创建坐标为x0\_y0的拼贴。

导入配置（Import Configuration）

根据所选拼贴的分辨率创建所有可能的地形配置。

地形比例（Landscape Scale）

拼贴地形的缩放比例。

材质（Material）

要使用的材质。选择材质后，你可以为材质中存在的每个地形图层分配权重图拼贴，并设置每个图层的混合方式。

导入拼贴地形后，通过 **右键单击** 小地图上的情境菜单，可以重新导入所选关卡的高度图和权重图。

-   [level streaming](https://dev.epicgames.com/community/search?query=level%20streaming)
-   [world composition](https://dev.epicgames.com/community/search?query=world%20composition)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [激活世界场景构成](/documentation/zh-cn/unreal-engine/world-composition-in-unreal-engine#%E6%BF%80%E6%B4%BB%E4%B8%96%E7%95%8C%E5%9C%BA%E6%99%AF%E6%9E%84%E6%88%90)
-   [关卡层级](/documentation/zh-cn/unreal-engine/world-composition-in-unreal-engine#%E5%85%B3%E5%8D%A1%E5%B1%82%E7%BA%A7)
-   [关卡构成](/documentation/zh-cn/unreal-engine/world-composition-in-unreal-engine#%E5%85%B3%E5%8D%A1%E6%9E%84%E6%88%90)
-   [图层](/documentation/zh-cn/unreal-engine/world-composition-in-unreal-engine#%E5%9B%BE%E5%B1%82)
-   [小地图](/documentation/zh-cn/unreal-engine/world-composition-in-unreal-engine#%E5%B0%8F%E5%9C%B0%E5%9B%BE)
-   [UI键](/documentation/zh-cn/unreal-engine/world-composition-in-unreal-engine#ui%E9%94%AE)
-   [关卡细节](/documentation/zh-cn/unreal-engine/world-composition-in-unreal-engine#%E5%85%B3%E5%8D%A1%E7%BB%86%E8%8A%82)
-   [拼贴设置](/documentation/zh-cn/unreal-engine/world-composition-in-unreal-engine#%E6%8B%BC%E8%B4%B4%E8%AE%BE%E7%BD%AE)
-   [LOD设置](/documentation/zh-cn/unreal-engine/world-composition-in-unreal-engine#lod%E8%AE%BE%E7%BD%AE)
-   [世界场景原点移位](/documentation/zh-cn/unreal-engine/world-composition-in-unreal-engine#%E4%B8%96%E7%95%8C%E5%9C%BA%E6%99%AF%E5%8E%9F%E7%82%B9%E7%A7%BB%E4%BD%8D)
-   [大型世界场景与多人游戏](/documentation/zh-cn/unreal-engine/world-composition-in-unreal-engine#%E5%A4%A7%E5%9E%8B%E4%B8%96%E7%95%8C%E5%9C%BA%E6%99%AF%E4%B8%8E%E5%A4%9A%E4%BA%BA%E6%B8%B8%E6%88%8F)
-   [创建地形关卡](/documentation/zh-cn/unreal-engine/world-composition-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%9C%B0%E5%BD%A2%E5%85%B3%E5%8D%A1)
-   [导入拼贴地形](/documentation/zh-cn/unreal-engine/world-composition-in-unreal-engine#%E5%AF%BC%E5%85%A5%E6%8B%BC%E8%B4%B4%E5%9C%B0%E5%BD%A2)
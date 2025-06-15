# 虚幻引擎地形拷贝工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-copy-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:11:57.959Z

---

目录

![地形拷贝工具](https://dev.epicgames.com/community/api/documentation/image/a23189e6-cf29-4967-ae84-117b67d18d94?resizing_type=fill&width=1920&height=335)

**地形小工具** 是纯编辑器的actor，与其所定义特定区域的体积相似。其作用是保存地形区域的高度和图层数据，以便被复制到地形上的另一个位置，或导出在另一个地形或高度图生成器（World Machine、Terresculptor等）中使用。

## 访问小工具

**访问小工具的方法：**

1.  在 **地形** 模式中点击 **造型（Sculpt）** 标签页，打开 **造型工具（Sculpting Tools）** 工具栏。
    
    ![Sculpt Menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/890142d8-7041-44c2-9faa-34267bedfb99/landscape_sculptmenu.png)
2.  从工具栏中选择 **复制（Copy）** 选项。小工具笔刷在选中的地形上显示为一个红色外框。
    
    ![Gizmo Outline](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76c32e02-39bd-408c-a364-d57c24152c05/landscape_gizmooutline.png)

选择小工具笔刷创建一个临时的小工具actor。可使用变换工具操纵此actor（方式于操纵其他内容相同），以此定义需要复制的地形区域。

如需了解变换工具的详细信息，请查阅[变换Actor](/documentation/zh-cn/unreal-engine/transforming-actors-in-unreal-engine)。

可在 **细节** 面板中修改小工具actor的属性。

![Gizmo Properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69f6addf-f19d-4dd1-b77c-6d5562ac5382/landscape_gizmoproperties.png)

属性

描述

**Width**

小工具actor的基础宽度（以虚幻单位计）；X轴显示为红线。

**Height**

小工具actor的基础高度（以虚幻单位计）；Y轴显示为绿线。

**LengthZ**

小工具actor的基础Z长度（以虚幻单位计）。

**MarginZ**

将小工具与选择匹配时的Z值，含最大高度和最小高度。将小工具与所选区域匹配时，LengthZ = （最大高度 - 最小高度） + 2 \* MarginZ。

**MinRelativeZ**

小工具中数据的最小高度值。小工具中的高度值被标准化（从0.f到1.f），并显示为（值 - MinRelativeZ） \* RelativeScaleZ。

**RelativeScaleZ**

小工具中数据的高度缩放。

**TargetLandscape**

当前选中、小工具将用于的地形。

## 复制到小工具

为复制地形的部分，区域的数据必须复制到小工具。之后数据可被粘贴到另一个位置。

**复制选定区域的方法：**

1.  在 **雕刻** 模式中选择 **区域选择（Region Selection）** 雕刻工具。
    
    ![Region Select](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1d85910-c74e-416f-839f-67c8d2abadb7/landscape_regionselect.png)
2.  用笔刷涂抹，选中地形中的一个区域，类似普通的绘制流程。
    
    ![Gizmo Copy](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5de5858-b5d1-4a32-b880-5f7acaa68ad8/landscape_gizmocopy1.png)
3.  选择 **复制/粘贴** 雕刻工具。
    
    ![Copy button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a63d7658-476d-4d13-9ffe-42ef4b6aceaf/landscape_copy.png)
    
    小工具在视口中不可见。
    
    ![Gizmo Tool](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3557213e-62b2-4372-ae3e-82505b683241/landscape_gizmocopy2.png)

1.  点击 **将小工具匹配到选定区域（Fit Gizmo to Selected Regions）** 按钮来放置小工具并调整大小，使其包围所有选定的区域。
    
    ![Copy Gizmo Data](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d586075-356c-4ac0-90d4-c0dfefd8e565/landscape_gizmocopy3.png)
2.  点击 **复制数据到小工具（Copy Data to Gizmo）** 按钮在小工具的边界中转移地形选定区域的数据。按下 **Ctrl + C** 可执行相同操作。
    
    ![Copied Gizmo Data](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6d7ff00-4cf3-4f57-b095-305cf88e64de/landscape_gizmocopy4.png)

**在小工具中复制区域的方法：**

1.  选择 **区域复制/粘贴** 雕刻工具。小工具将显示在视口中。
2.  点击选中小工具。变换控件将出现。
    
    ![Transform Gizmo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f7f34ab-4df7-4358-bbfa-a832a2d86dc5/landscape_gizmocopy5.png)
3.  移动、旋转并缩放小工具，使其包围希望复制的地形部分。
    
    ![Transformed Gizmo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a37802f-9136-4d65-bc68-c2d7581f6ec3/landscape_gizmocopy6.png)
4.  按下 **复制数据到小工具（Copy Data to Gizmo）** 按钮在小工具的边界中转移地形部分的数据。按下 **Ctrl + C** 可执行相同操作。
    
    ![Copied Data to Gizmo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e583983-eaff-4b0c-9717-16492b0045b1/landscape_gizmocopy7.png) ![Copiy Data to Gizmo button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/312ddd81-3cb0-45ac-a277-05af18da46f2/landscape_gizmocopy7-2.png)

## 从小工具进行粘贴

从小工具粘贴数据则无法将地形的部分从一个位置转移到另一个位置。数据可被完整[粘贴](/documentation/zh-cn/unreal-engine/landscape-copy-tool-in-unreal-engine#pastingdata)来创建一个完全相同的地貌；或使用笔刷笔刷和强度设置来转移部分地貌，将其绘制到新位置。

从小工具粘贴数据前，其必须先被[复制](/documentation/zh-cn/unreal-engine/landscape-copy-tool-in-unreal-engine#copyingdata)到一个小工具。

**粘贴小工具数据的方法：**

1.  移动、旋转和放缩一个包含数据的小工具，使其覆盖需要粘贴数据的区域。
    
    ![Translating Gizmo to Paste](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c509315-1e24-43c4-a991-7fd946ba9a01/landscape_gizmopaste1.png) ![Gizmo Paste](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/30b840fc-ce2b-49e1-8463-098c4025fdc8/landscape_gizmopaste2.png)
2.  使用一个可用笔刷（圆形、图案、透明度、小工具）来粘贴数据，"绘制"来自小工具的数据。
    
    -   小工具笔刷可将完整粘贴来自小工具的数据。按下 **Ctrl + V** 也可完整粘贴来自小工具的数据。
    -   其他笔刷也可使用当前笔刷大小和强度来绘制来自小工具的数据。
    
    ![Painting Gizmo Data](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b995003-ecc6-461a-b20e-b7745e94a814/landscape_gizmopaste4.png) ![Painted Gizmo Data](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bedcb8a7-1842-44c0-a3d2-1517d89e2a07/landscape_gizmopaste5.png)

## 小工具数据导出/导入

可通过 **地形编辑器（Landscape Editor）** 中的 **小工具导入/导出** 部分将高度图数据导出至小工具，以及从小工具进行导入。

![Gizmo Import/Export options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b9ba701-6897-4a6a-8e50-28829b7e1f13/gizmo_importexport.png)

**将数据导入小工具：**

1.  点击浏览文件按钮( ![import_filebrowse.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b49c943-1ab3-455b-91a5-258b65a3835e/import_filebrowse.png))并选择需要导入到小工具的高度图文件（16位原始文件）。 ![Importing external Gizmo data](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8eeb31e1-b8f7-45f1-b906-4dd246277e04/gizmo_import_file.png)
    
    因为导入进程使用.raw文件格式，因此无法正确确定尺寸。将自动进行猜测，但需要手动调整尺寸才能正确导入高度图。UE4会生成一个包含不同尺寸的下拉菜单，可通过点击上图中的向下箭头访问。你可能需要尝试几个不同尺寸才能找到合适的那个。
    
2.  如果也希望导入层权重信息，请按下"添加层"按钮( ![import_layeradd.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22e4317e-55c1-4501-9531-07954adcf0f2/import_layeradd.png))来添加所需的层数量。  
    ![Importing Layer weight data](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba4ded72-e250-41a3-b59d-83bc862bcf5e/gizmo_import_layerfields.png)
3.  选择导入到每层的层权重图文件（8位raw文件）。将填入文件和层命名。层命名默认使用文件的命名。如有需要可修改层命名。启用 **无导入** 勾选框可防止单个层信息被导入。
    
    层命名必须匹配存在于地形上的层的命名，否则导入将失败。
    
    ![Layer name must match exactly what is in the file](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b50f4cc7-c06a-43a4-9262-3291f6cd1d87/gizmo_import_layerfile.png)
4.  选中高度图和任意层后，按下 **导入至小工具（Import to Gizmo）** 按钮将数据导入到小工具。  
    如尺寸不正确，则可能看到这种现象：
    
    ![Import Wrong Dimensions](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3511d96-63b0-4f09-9bf6-f655c510651f/landscape_importwrongdimensions.png)
    
    反转尺寸并重新导入则能够获得正确结果。如果尺寸正确，小工具应显示正确数据。
    

**导入小工具数据的方法：**

1.  小工具填入数据后（参见[复制到小工具](/documentation/zh-cn/unreal-engine/landscape-copy-tool-in-unreal-engine#copyingdata)），按下 **导出小工具数据（Export Gizmo Data）** 按钮将小工具数据导出到文件。启用小工具选项顶部的 **小工具复制/粘贴所有层** 勾选框后将把高度图和所有层的权重数据导出到文件。
2.  选择高度图文件的位置和命名。  
    ![Exporting Heightmap file](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f207bb16-9777-40d3-85e6-8279ba9990eb/export_file.png)
3.  如正在导出层，则选择每个导出层的位置和文件名。  
    ![Exporting Layer file](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a666df3-fdd3-44e2-ac33-ff5dfcc8e15d/export_layerfile.png)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [访问小工具](/documentation/zh-cn/unreal-engine/landscape-copy-tool-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%B0%8F%E5%B7%A5%E5%85%B7)
-   [复制到小工具](/documentation/zh-cn/unreal-engine/landscape-copy-tool-in-unreal-engine#%E5%A4%8D%E5%88%B6%E5%88%B0%E5%B0%8F%E5%B7%A5%E5%85%B7)
-   [从小工具进行粘贴](/documentation/zh-cn/unreal-engine/landscape-copy-tool-in-unreal-engine#%E4%BB%8E%E5%B0%8F%E5%B7%A5%E5%85%B7%E8%BF%9B%E8%A1%8C%E7%B2%98%E8%B4%B4)
-   [小工具数据导出/导入](/documentation/zh-cn/unreal-engine/landscape-copy-tool-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7%E6%95%B0%E6%8D%AE%E5%AF%BC%E5%87%BA/%E5%AF%BC%E5%85%A5)
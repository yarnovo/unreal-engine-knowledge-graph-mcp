# 虚幻引擎中的网格体元素选择 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mesh-element-selection-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:07:33.082Z

---

目录

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**建模模式（Modeling Mode）** 提供了在虚幻引擎中直接选择网格体元素（拓扑）的选项，以实现更加一致且优化的建模工作流程。美术师可以使用 **网格体元素选择（Mesh Element Selection）** 工具栏来选择网格体或网格体元素，然后调用操作，而无需使用 **多边形组编辑（PolyGroup Edit）** 或 **三角形编辑（Triangle Edit）** 等中间工具。

网格体元素包括以下内容：

-   三角形
-   三角形的顶点
-   三角形的边缘
-   多边形组
-   多边形组的边缘
-   多边形组的顶点

这些元素代表构成网格体的粒状几何体。元素的选择和编辑工作流程可以帮助你创建干净的网格体拓扑。

多边形组是一组已分组的三角形，对你的建模工作流程有帮助。例如，你可以构造类似于四边形的组以进行盒体建模。如需详细了解多边形组以及其与三角形的区别，请参阅[了解多边形组](/documentation/zh-cn/unreal-engine/understanding-polygroups-in-unreal-engine)。

## 访问工具栏

在建模模式下，默认禁用网格体元素选择（Mesh Element Selection）工具栏。如需详细了解建模模式及其访问方式，请参阅[建模模式概述](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)。

要启用工具栏，请按照以下步骤操作：

1.  在 **建模模式快速设置（Modeling Mode Quick Settings）** 中，点击 **齿轮** 图标。
    
2.  点击 **网格体元素选择（Mesh Element Selection）**。
    
3.  退出并重新进入建模模式。
    

**视口（Viewport）** 中将出现工具栏。此外，当你重新进入建模模式时， **选择（Select）** 类别将变为可用，并提供用于编辑元素选择的工具。

## 使用网格体元素选择

你可以使用建模小工具变换元素选择，并使用 **选择** 类别工具进行额外的编辑。当你打开可用工具时，将保留你选择的元素。

在打开工具时，元素选择是不可编辑的。要更新所选的元素，你必须退出工具，调整选择，再重新进入工具。

选择命令，例如 **全选（Select All）** 和 **反选（Invert Selection）** ，可帮助你快速选择所需的元素。你可以切换 **拖动模式（Drag Mode）** 来调整突出显示元素的方法。拖动模式选项是点击单个元素或用鼠标拖动以选择多个元素。如需详细了解这些属性，请参阅本页的 **工具栏属性** 小节。

对于导入的静态网格体，网格元素分段默认被锁定。此设置可确保你不会意外编辑网格体的几何体。要启用元素选择，你可以开关工具栏中的 **锁定** 图标。

### 小工具和数字控制

你可以使用建模小工具变换每个元素选择，或者使用 **变换（Transformation）** 面板进行数字输入。要将小工具的方向从本地空间调整为法线选择，请使用工具栏的附加设置分段（参见下表）。

如需详细了解建模小工具和变换面板，请参阅建模模式概述的[小工具](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7)小节。

### 工具栏属性

图标

说明

![元素选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14ad0acd-9feb-4f39-898d-770001b60498/select.png)

禁用元素选择。返回至网格体选择。

![三角形](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b99b789-7273-48c4-bf77-a4d51296b1be/tri.png)

选择三角形的（面）。

![三角形的边](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/577e11d7-8175-40ae-9406-aecc1fd7748c/tri-edge.png)

选择三角形的边缘。

![三角形的顶点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0edfcb6e-3792-4fe6-8630-d0bec2fd50eb/tri-vertex.png)

选择三角形的顶点。

![多边形组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c00b143-4c2a-4fcd-b3e4-6e98a1813abf/polygroup.png)

选择多边形组的（面）。

![多边形组的边](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9bc702e4-7ca9-44c9-924e-b75e864f8ca6/polygroup-edge.png)

选择多边形组的边缘，也称为边界。

![多边形组的顶点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53cf6b08-d237-460c-af1c-3b1bd2d316c1/polygroup-vertex.png)

选择多边形组的顶点，也称为角。

![其他选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a66e0d70-1a89-41f3-853c-c0260e010ad8/selection-edits.png)

其他选择功能。

-   全选
-   展开到已连接
-   反选
-   反转已连接
-   展开选择
-   收起选择

![其他设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f61aaecf-ae34-45c2-90bf-f5d53266039b/selection-settings.png)

其他设置。

-   **拖动模式（Drag Mode）：**鼠标选择方法。
    -   **无（None）：** 点击单个元素。
    -   **路径（Path）：** 点击一个元素，然后拖动以选中更多。
-   **可选的网格体类型（Selectable Mesh Types）：**
    -   体积（Volumes）
    -   静态网格体（Static Mesh）
-   **本地线框模式（Local Frame Mode）：**调整小工具的方向。
    -   **根据几何体（From Geometry）** （选择法线）
    -   **根据对象（From Object）** （本地空间）

![锁定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2319f5d-c19c-441b-afae-fb170beb1543/selection-lock.png)

从元素选择中锁定和解锁选定的网格体。当你选择元素类型时可用。

多边形组元素基于三角形的分组。为获取特定选择，请尝试调整你的多边形组。如需了解更多信息，请参阅[了解多边形组](/documentation/zh-cn/unreal-engine/understanding-polygroups-in-unreal-engine)。

### 热键

**命令**

**说明**

**Shift + 点击（网格体）**

将元素添加到选择中。启用 **路径拖动模式（Path Drag Mode）** 后，使用 **Ctrl + 拖动** 。

**Ctrl + 点击（网格体）**

从选择中删除元素。启用 **路径拖动模式（Path Drag Mode）** 后，使用 **Ctrl + 拖动** 。

**Ctrl + Z**

撤消操作。

**鼠标中键 + 平移（小工具）**

暂时重置小工具的位置。

**Shift + Ctrl + 点击（小工具）**

将小工具网格重新定位到命中法线。

## 选择类别工具

**选择（Select）** 类别中的许多工具都可以打开拥有额外操作的面板。但是， **清理（Clean）** 和 **删除（Delete）** 选项是一键操作。

-   **删除（Delete）**：删除选择。
-   **清理（Clean）**：对选择重新进行三角剖分。仅适用于多边形组选择。

你可以在下表中查看有关其余工具的更多信息。

有些工具仅适用于特定元素，或位于其他类别下。

工具

说明

**挤压（Extrude）**

通过移动和缝合从一组选定面中突出几何体。

**挤压边缘（Extrude Edge）**

通过移动并缝合一组选定的边缘来挤出几何体。

**偏移（Offset）**

突出所选面，类似于挤压操作，但默认沿顶点法线而非单一方向移动面。移动鼠标可控制偏移距离。在视口中点击可完成偏移。

**推拉（Push Pull）**

面可以切掉网格体或桥接网格体部分。如需了解更多信息，请参阅[推拉](/documentation/zh-cn/unreal-engine/push-pull-tool-in-unreal-engine)。

**内嵌（Inset）**

内嵌当前选定一组面。鼠标移动可控制内嵌距离。在视口中点击可完成内嵌。

**外嵌（Outset）**

向外扩展选定的一组面。鼠标移动可控制外嵌距离。在视口中点击可确认外嵌距离。

**切割（Cut）**

沿着绘制的线条分割所选的多边形组面，如同使用穿过该线条的面切割了多边形组。点击面绘制切割线。切线的边界处将形成新的多边形组。

**斜边（Bevel）**

围绕选定面倾斜边缘循环。

**插入循环（Insert Loop）**

在网格体中的四边形之间添加边缘链。你不能在非四边形面上插入边缘。

**结合（Weld）**

将所选元素合并到容差范围内的、与其匹配且未连接的元素。该工具位于 **网格体（Mesh）** 类别中。

**拆分（Split）**

将所选元素与未选择的元素断开，创建一个新网格体。该工具位于 **XForm** 类别中。

**平滑（Smooth）**

将顶点向其相邻顶点的平均位置移动，以使表面更加柔和。该工具位于 **变形（Deform）** 类别中。详情请参阅[平滑](/documentation/zh-cn/unreal-engine/smooth-tool-in-unreal-engine)。

**格栅（Lattice）**

通过点的3D网格编辑网格体的顶点。该工具位于 **变形（Deform）** 类别中。详情请参阅[格栅](/documentation/zh-cn/unreal-engine/lattice-tool-in-unreal-engine)。

**置换（Displace）**

为网格体添加曲边细分和扭曲。在使用 **扁平（Flat）** 细分类型时，该工具位于 **变形（Deform）** 类别中。详情请参阅[置换](/documentation/zh-cn/unreal-engine/displace-tool-in-unreal-engine)。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [modeling mode](https://dev.epicgames.com/community/search?query=modeling%20mode)
-   [modeling tools](https://dev.epicgames.com/community/search?query=modeling%20tools)
-   [mesh selection](https://dev.epicgames.com/community/search?query=mesh%20selection)
-   [topology](https://dev.epicgames.com/community/search?query=topology)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [访问工具栏](/documentation/zh-cn/unreal-engine/mesh-element-selection-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%B7%A5%E5%85%B7%E6%A0%8F)
-   [使用网格体元素选择](/documentation/zh-cn/unreal-engine/mesh-element-selection-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%BD%91%E6%A0%BC%E4%BD%93%E5%85%83%E7%B4%A0%E9%80%89%E6%8B%A9)
-   [小工具和数字控制](/documentation/zh-cn/unreal-engine/mesh-element-selection-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7%E5%92%8C%E6%95%B0%E5%AD%97%E6%8E%A7%E5%88%B6)
-   [工具栏属性](/documentation/zh-cn/unreal-engine/mesh-element-selection-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%A0%8F%E5%B1%9E%E6%80%A7)
-   [热键](/documentation/zh-cn/unreal-engine/mesh-element-selection-in-unreal-engine#%E7%83%AD%E9%94%AE)
-   [选择类别工具](/documentation/zh-cn/unreal-engine/mesh-element-selection-in-unreal-engine#%E9%80%89%E6%8B%A9%E7%B1%BB%E5%88%AB%E5%B7%A5%E5%85%B7)

相关文档

[

建模工具

![建模工具](https://dev.epicgames.com/community/api/documentation/image/152a0302-28b3-46e6-91d6-98c2ff1dde1b?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/modeling-tools-in-unreal-engine)

[

建模模式概述

![建模模式概述](https://dev.epicgames.com/community/api/documentation/image/5f9ab70c-68fd-4dd1-9e68-9294f46ed6e0?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)

[

建模模式 - 处理资产

![建模模式 - 处理资产](https://dev.epicgames.com/community/api/documentation/image/a47163cd-8973-4f6f-b9d8-6f3f03f03df0?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/working-with-meshes-in-unreal-engine)
# 虚幻引擎中的编辑枢轴点工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/edit-pivot-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:08:07.558Z

---

目录

![编辑枢轴点](https://dev.epicgames.com/community/api/documentation/image/e91ac8f2-4428-44fd-a2cf-1e229a0d6999?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**编辑枢轴点（Edit Pivot）** 工具可更改网格体的枢轴点位置。枢轴点是场景中的一个固定点，定义了发生旋转和缩放的网格体的中心。枢轴点也代表着网格体的位置。

你可以使用编辑枢轴点工具更改枢轴点：

-   使用光标手动操作。
-   使用预设按钮自动运行。

编辑枢轴点对于建模和非建模工作流程的许多领域都很有帮助。编辑或导入网格体后，你可能必须将枢轴点调整到理想位置。将枢轴点设置到网格体上的特定位置有助于各种过程，例如：

-   一个网格体如何对齐到另一个网格体的某个区域。
-   网格体弯曲和旋转的方向。

## 访问工具

你可以从 **建模模式（Modeling Mode）** 中的 **Xform** （变换）类别访问编辑枢轴点工具。如需详细了解建模模式以及访问方法，请参阅[建模模式概述](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)。

## 使用编辑枢轴点

当你打开编辑枢轴点（Edit Pivot）工具时，网格体的枢轴点位置将在关卡中变为可见（表示为小工具）。

如果枢轴点未出现在网格体上，则可能由于各种原因位于网格体之外。可以缩小关卡来找到枢轴点，或选择 **盒体位置（Box Positions）** 中的预设中心来自动重新定位。

当你接受新位置时，该位置将被烘焙到网格体中，这意味着该位置将应用于到静态网格体资产和场景中的实例。为避免更改静态网格体实例的资产和位置，你可以复制网格体，使用[复制](/documentation/zh-cn/unreal-engine/modeling-tools-in-unreal-engine#xform)工具创建新的Actor。

### 调整位置

你可以拖动小工具手动变换枢轴点位置。要以交互方式将枢轴点与网格体上的某个区域对齐，并确定LOD（细节级别）是否受到影响，请使用 **选项（Options）** 分段。

**选项**

**说明**

**应用于所有LOD（Apply to All LODs）**

将枢轴点变换烘焙至所有可用的LOD。此设置对没有LOD的选项没有影响。

**启用对齐拖动（Enable Snap Dragging）**

激活用于变换枢轴点的徒手模式。你可以点击并拖动网格体，以对齐枢轴点的位置。你可以使用 **旋转模式（Rotation Mode）** 自动调整旋转。

**旋转模式（Rotation Mode）**

确定在对齐拖动过程中如何旋转枢轴点。你可以从以下选项中选择：

-   **忽略（Ignore）** ：仅平移枢轴点。
-   **对齐（Align）** ：将枢轴点的Z轴和网格体的法线对齐，以指向同一方向。
-   **对齐翻转（Align Flipped）** ：将枢轴点的Z轴与网格体的相反法线对齐。

要以数字方式改变枢轴点的位置和旋转，请使用 **变换面板（Transform Panel）** 。如需详细了解建模小工具以及如何访问变换面板，请参阅概述文档的[小工具](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7)小节。

你可以使用 **盒体位置（Box Positions）** 分段中的预设，自动将枢轴点对齐到某个位置。这些位置基于你在 **使用世界盒体（Use World Box）** 属性中选择的边界盒体的轴。

为了帮助确定枢轴点的方向，将小工具的颜色与[关卡编辑器](/documentation/zh-cn/unreal-engine/level-editor-in-unreal-engine)的轴控件进行比较。

**盒体位置**

**说明**

**中心（Center）**

将枢轴点定位到边界盒体的质心。

**底部（Bottom）**

将枢轴点定位到边界盒体Z轴的最低点。

**顶部（Top）**

将枢轴定位到边界盒体Z轴的最高点。

**左侧（Left）**

将枢轴点定位到边界盒体Y轴的最低点。

**右侧（Right）**

将枢轴点定位到边界盒体Y轴的最高点。

**背面（Back）**

将枢轴定位到边界盒体X轴的最高点。

**正面（Front）**

将枢轴点定位到边界盒体X轴的最低点。

**世界原点（World Origin）**

将枢轴点定位到世界原点（0,0,0）。

**使用世界盒体（Use Word Box）**

启用后，将使用网格体的世界空间边界盒体，而非网格体空间边界盒体。

工具使用完毕后，在[工具确认](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%92%A4%E9%94%80%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E5%92%8C%E6%8E%A5%E5%8F%97%E6%9B%B4%E6%94%B9)面板中接受或取消更改。

## 热键

**热键**

**说明**

**F**

放大网格体的位置。

**CTRL + 拖动**

将小工具对齐到场景。

**Enter**

接受工具更改。

**ESC**

取消更改并退出工具。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [modeling mode](https://dev.epicgames.com/community/search?query=modeling%20mode)
-   [modeling tools](https://dev.epicgames.com/community/search?query=modeling%20tools)
-   [pivot](https://dev.epicgames.com/community/search?query=pivot)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [访问工具](/documentation/zh-cn/unreal-engine/edit-pivot-tool-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%B7%A5%E5%85%B7)
-   [使用编辑枢轴点](/documentation/zh-cn/unreal-engine/edit-pivot-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%BC%96%E8%BE%91%E6%9E%A2%E8%BD%B4%E7%82%B9)
-   [调整位置](/documentation/zh-cn/unreal-engine/edit-pivot-tool-in-unreal-engine#%E8%B0%83%E6%95%B4%E4%BD%8D%E7%BD%AE)
-   [热键](/documentation/zh-cn/unreal-engine/edit-pivot-tool-in-unreal-engine#%E7%83%AD%E9%94%AE)

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
# 虚幻引擎中的变形多边形组 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/deform-polygroups-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:08:36.397Z

---

目录

![变形多边形组](https://dev.epicgames.com/community/api/documentation/image/5ee98ea7-da9d-44ae-9fe7-f978881c3fa4?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**变形多边形组（Deform PolyGroup）** 建模工具通过[多边形组](/documentation/zh-cn/unreal-engine/understanding-polygroups-in-unreal-engine)动态地改变网格体的形状。变形是快速重塑网格体和创建有机几何体的有效方法。

你可以选择顶点、边或面，然后沿世界网格轴拖动它们，使网格体的整体轮廓发生变形。你还可以在一个工具会话中应用多个变形。

如果网格体没有发生预期的变形，可能是分辨率（三角形数量）太低。你可以使用 **[重新网格化](/documentation/zh-cn/unreal-engine/modeling-tools-in-unreal-engine#mesh)** 工具重新标定。

## 获取工具

你可以通过以下方法访问变形多边形组工具：

-   **建模模式（Modeling Mode）** 中的 **变形（Deform）** 类别。如需详细了解建模模式以及访问方法，请参阅[建模模式概述](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)。
-   **骨架编辑器（Skeleton Editor）** 中的 **编辑工具（Editing Tools）** 选项卡。更多详情，请参阅[骨架编辑](/documentation/zh-cn/unreal-engine/skeleton-editing-in-unreal-engine)。

## 设置

### 选项

使用该工具有两个核心选项：**变形** 和 **变换**。

你可以在**线性**和**平滑**之间选择变形类型。

**变形**

**说明**

**线性**

与所选组件相连的多边形组边线会保持平直。

**平滑**

与所选组件相连的多边形组边线平滑插值成为一条曲线。

变换选项决定了选择组件时的移动类型。

**变换**

**说明**

**平移**

在 X、Y 和 Z 轴上线性移动所选组件。

**选装**

围绕 X、Y 和 Z 轴移动选中的组件。

### 选择

**选择（Selection）** 决定可选择的元素类型（边、面或顶点）。你可以同时开启/关闭多个选项。

如不能按预期选择元素，请确认多边形组设置正确。更多详情，请参阅[了解多边形组](/documentation/zh-cn/unreal-engine/understanding-polygroups-in-unreal-engine)。

### 显示线框

启用 **显示线框（Show Wireframe）** 后，网格体上会出现2D线框覆层，描绘底层三角形。

工具使用完毕后，请在[工具确认](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B7%A5%E5%85%B7-%E6%92%A4%E9%94%80%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E5%92%8C%E6%8E%A5%E5%8F%97%E6%9B%B4%E6%94%B9)面板中接受或取消改动。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [modeling mode](https://dev.epicgames.com/community/search?query=modeling%20mode)
-   [modeling tools](https://dev.epicgames.com/community/search?query=modeling%20tools)
-   [sculpting](https://dev.epicgames.com/community/search?query=sculpting)
-   [skeleton editing](https://dev.epicgames.com/community/search?query=skeleton%20editing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [获取工具](/documentation/zh-cn/unreal-engine/deform-polygroups-tool-in-unreal-engine#%E8%8E%B7%E5%8F%96%E5%B7%A5%E5%85%B7)
-   [设置](/documentation/zh-cn/unreal-engine/deform-polygroups-tool-in-unreal-engine#%E8%AE%BE%E7%BD%AE)
-   [选项](/documentation/zh-cn/unreal-engine/deform-polygroups-tool-in-unreal-engine#%E9%80%89%E9%A1%B9)
-   [选择](/documentation/zh-cn/unreal-engine/deform-polygroups-tool-in-unreal-engine#%E9%80%89%E6%8B%A9)
-   [显示线框](/documentation/zh-cn/unreal-engine/deform-polygroups-tool-in-unreal-engine#%E6%98%BE%E7%A4%BA%E7%BA%BF%E6%A1%86)

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
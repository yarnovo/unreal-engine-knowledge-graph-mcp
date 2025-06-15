# 虚幻引擎中的生成多边形组工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/generate-polygroups-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:09:12.186Z

---

目录

![生成多边形组](https://dev.epicgames.com/community/api/documentation/image/078ed586-4e5a-4dee-901b-f2ee0c6a2d35?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**生成多边形组（Generate PolyGroup）** 工具会对三角形进行自动分组，从而为网格体创建多边形组。多边形组是一组已成组的三角形。你可以将多边形组用于各种操作，例如：

-   建模与变形
-   传统的盒体建模
-   UV布局
-   材质整理
-   皮肤权重

如需了解更多信息，请参阅[了解多边形组](/documentation/zh-cn/unreal-engine/understanding-polygroups-in-unreal-engine)。

在上面的视频中，我们根据网格体的UV岛状区生成多边形组。然后，利用分组插入边缘，并动态改变网格体的形状。此外，视频还使用了[多边形组编辑](/documentation/zh-cn/unreal-engine/polygroup-edit-tool-in-unreal-engine)和[多边形组变形](/documentation/zh-cn/unreal-engine/deform-polygroups-tool-in-unreal-engine)工具。

对于将基线多边形组数据应用到网格体，生成多边形组工具是一个很好的起始点，然后你可以使用[绘制多边形组](/documentation/zh-cn/unreal-engine/paint-polygroups-tool-in-unreal-engine)工具进行微调。

## 访问工具

你可以从以下位置访问生成多边形组工具：

-   **建模模式（Modeling Mode）** 中的 **属性（Attributes）** 类别。如需详细了解建模模式以及访问方法，请参阅[建模模式概述](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)。
-   **骨架编辑器（Skeleton Editor）** 中的 **编辑工具（Editing Tools）** 选项卡。如需了解更多信息，请参阅[骨架编辑](/documentation/zh-cn/unreal-engine/skeleton-editing-in-unreal-engine)。

## 使用生成多边形组

打开生成多边形组工具后，会自动生成多边形组。**转换模式（Conversion Mode）** 定义了三角形的分组方式。选择转换模式来生成新的多边形组，并调整指定的值。下表列出了这些转换模式。

转换模式

说明

**面法线偏差（Face Normal Deviation）**

根据面法线之间的 **角度公差** 创建多边形组。

**查找四边形（Find Quads）**

通过将成对的三角形合并为四边形来创建多边形组。

**根据UV岛状区（From UV Islands）**

根据UV岛状区创建多边形组。如需详细了解如何创建UV岛状区，请参阅[UV编辑器](/documentation/zh-cn/unreal-engine/uv-editor-in-unreal-engine)。

**根据硬法线接缝（From Hard Normal Seams）**

根据硬法线接缝创建多边形组。

**根据连接的三角形（From Connected Tris）**

根据连接的三角形创建多边形组。对于具有断开部分的网格体很有用。

**最远点取样（Furthest Point Sampling）**

创建以间距适当的取样点为中心的多边形组，近似表面[沃罗诺伊图](https://zh.wikipedia.org/wiki/%E6%B2%83%E7%BD%97%E8%AF%BA%E4%BC%8A%E5%9B%BE)。

**从图层复制（Copy From Layer）**

从现有多边形组图层复制多边形组。

你可以在现有或新的多边形组图层上生成多边形组。这些图层可以对应不同的操作，而不用每次返回并调整多边形组。例如，你可以设置第1层用于调整拓扑，第2层用于UV，第3层用于多种材质分配。要添加更多图层，请使用 **输出层（Output Layer）** 属性。

工具使用完毕后，在[工具确认](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B7%A5%E5%85%B7-%E6%92%A4%E6%B6%88%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E5%92%8C%E6%8E%A5%E5%8F%97%E6%9B%B4%E6%94%B9)面板中接受或取消更改。

### 热键

**热键**

**说明**

**Enter**

接受工具更改。

**ESC**

取消更改并退出工具。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [modeling mode](https://dev.epicgames.com/community/search?query=modeling%20mode)
-   [modeling tools](https://dev.epicgames.com/community/search?query=modeling%20tools)
-   [polygroups](https://dev.epicgames.com/community/search?query=polygroups)
-   [quads](https://dev.epicgames.com/community/search?query=quads)
-   [skeleton editing](https://dev.epicgames.com/community/search?query=skeleton%20editing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [访问工具](/documentation/zh-cn/unreal-engine/generate-polygroups-tool-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%B7%A5%E5%85%B7)
-   [使用生成多边形组](/documentation/zh-cn/unreal-engine/generate-polygroups-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%94%9F%E6%88%90%E5%A4%9A%E8%BE%B9%E5%BD%A2%E7%BB%84)
-   [热键](/documentation/zh-cn/unreal-engine/generate-polygroups-tool-in-unreal-engine#%E7%83%AD%E9%94%AE)

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
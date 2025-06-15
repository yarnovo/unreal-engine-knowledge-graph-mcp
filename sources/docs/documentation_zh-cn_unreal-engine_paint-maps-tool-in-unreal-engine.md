# 虚幻引擎中的地图绘制工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/paint-maps-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:09:13.866Z

---

目录

![绘制地图](https://dev.epicgames.com/community/api/documentation/image/3ba58fbe-81cb-4bc6-90d3-deb9e9a523cd?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**绘制地图（Paint Maps）** 工具将在网格体顶点中存储0到1的值，以创建 **权重地图** 。值的范围将确定网格体顶点受所选过程影响的强度。你可以在其他[建模模式](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)工具中使用权重地图对特定顶点区域执行运算。

![在偏移工具中使用权重地图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/964be7f4-3247-419e-a7a7-31c03fcef2f4/paint-map-tool.png)

在 偏移（Offset） 工具中使用权重地图定义沿法线（红色区域）移动的顶点，以创建鹅卵石效果。

以下建模工具支持权重地图：

-   [平滑](/documentation/zh-cn/unreal-engine/smooth-tool-in-unreal-engine)
-   [置换](/documentation/zh-cn/unreal-engine/displace-tool-in-unreal-engine)
-   [偏移](/documentation/zh-cn/unreal-engine/offset-tool-in-unreal-engine)
-   [绘制顶点颜色](/documentation/404)

你使用绘制地图工具创建的权重地图无法由[材质](/documentation/zh-cn/unreal-engine/unreal-engine-materials)访问。你可以使用绘制顶点颜色工具复制权重地图，然后将其用于材质和其他工作流程。

## 访问工具

你可以通过以下方法访问绘制地图工具：

-   **建模模式（Modeling Mode）** 中的 **属性（Attributes）** 类别。如需详细了解建模模式以及访问方法，请参阅[建模模式概述](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)。
-   **骨架编辑器（Skeleton Editor）** 中的 **编辑工具（Editing Tools）** 选项卡。更多详情，请参阅[骨架编辑](/documentation/zh-cn/unreal-engine/skeleton-editing-in-unreal-engine)。

![绘制地图工具图标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c88e341-919d-4c67-8019-b122bbcbb77f/paint-map-tool-icon.png)

## 使用绘制地图

使用绘制地图工具之前，你必须在[编辑属性](/documentation/zh-cn/unreal-engine/modeling-tools-in-unreal-engine#%E5%B1%9E%E6%80%A7)工具中创建权重地图层。

绘制地图工具的功能与建模模式中其他基于笔刷的工具类似。你可以使用笔刷交互式地将权重地图值绘制到网格体顶点上，并调整各种笔刷设置。网格体可以有多个权重地图层，并且你可以在单个工具会话中在每个层之间切换。

如果笔刷强度高于0，但未显示笔划，这可能表示你未命中顶点，而是命中了三角形区域。你可以使用[重新网格化](/documentation/zh-cn/unreal-engine/modeling-tools-in-unreal-engine#meshops)工具增加几何体的分辨率。顶点的增加有助于在创建权重地图时创建连续的绘制流。

工具使用完毕后，你可以在[工具确认](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%92%A4%E9%94%80%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E5%92%8C%E6%8E%A5%E5%8F%97%E6%9B%B4%E6%94%B9)面板中接受或取消更改。

### 设置

**笔刷操作**

**说明**

**绘制（Paint）**

通过笔划创建权重地图。

**洪水填充（Flood Fill）**

将整个网格体设置为笔刷设置。

**笔刷**

**说明**

**大小（Size）**

设置相对于网格体大小的笔刷大小。

**强度（Strength）**

确定每个笔划应用什么颜色值（0-1）。更高的值会创建纯色，更低的值会创建更不透明的颜色。

**衰减（Falloff）**

从笔刷中心，确定半径的强度。设置的值是衰减圆圈大小占笔刷大小的百分比。值越低，创建的边缘越清晰，值越高，创建的边缘越模糊。

**指定半径（Specify Radius）**

启用以忽略相对笔刷大小并使用显式世界半径。

**半径（Radius）**

半径的大小。

你可以使用 **所选属性（Selected Attribute）** 属性在网格体的权重地图层之间切换。

## 热键

**热键**

**说明**

**Shift + 点击**

混合颜色值。点击并按住以连续混合。

**CTRL + 点击**

擦除颜色。点击并按住以连续擦除。

**\[或S**

每次按键将笔刷减小0.025。按住Shift键时，每次按键将减小0.005。

**\]或D**

每次按键将笔刷增大0.025。按住Shift键时，每次按键将增大0.005。

**F**

放大笔刷的位置。

**Enter**

接受工具更改。

**ESC**

取消更改并退出工具。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [modeling mode](https://dev.epicgames.com/community/search?query=modeling%20mode)
-   [modeling tools](https://dev.epicgames.com/community/search?query=modeling%20tools)
-   [weight maps](https://dev.epicgames.com/community/search?query=weight%20maps)
-   [skeleton editing](https://dev.epicgames.com/community/search?query=skeleton%20editing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [访问工具](/documentation/zh-cn/unreal-engine/paint-maps-tool-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%B7%A5%E5%85%B7)
-   [使用绘制地图](/documentation/zh-cn/unreal-engine/paint-maps-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%BB%98%E5%88%B6%E5%9C%B0%E5%9B%BE)
-   [设置](/documentation/zh-cn/unreal-engine/paint-maps-tool-in-unreal-engine#%E8%AE%BE%E7%BD%AE)
-   [热键](/documentation/zh-cn/unreal-engine/paint-maps-tool-in-unreal-engine#%E7%83%AD%E9%94%AE)

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
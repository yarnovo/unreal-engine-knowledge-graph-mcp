# 虚幻引擎中的平滑工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/smooth-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:08:15.030Z

---

目录

![平滑](https://dev.epicgames.com/community/api/documentation/image/3428b6f6-0be8-4f24-bfc2-3626e50638ac?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**平滑（Smooth）** 工具通过将顶点移向其相邻顶点的平均位置来柔化表面的边缘。当网格体有锯齿状边缘瑕疵时，此操作很有用。

![有锯齿的鹅卵石](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9e355e9-ad75-400e-abdf-7b10ea65c44d/jagged-cobble.png)

![平滑鹅卵石](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af339335-f75b-4547-9c00-6f41378266e1/smooth-cobble.png)

有锯齿的鹅卵石

平滑鹅卵石

## 访问工具

你可以通过以下方法访问平滑工具：

-   **建模模式（Modeling Mode）** 中的 **变形（Deform）** 类别。如需详细了解建模模式以及访问方法，请参阅[建模模式概述](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)。
-   **骨架编辑器（Skeleton Editor）** 中的 **编辑工具（Editing Tools）** 选项卡。更多详情，请参阅[骨架编辑](/documentation/zh-cn/unreal-engine/skeleton-editing-in-unreal-engine)。

## 使用平滑

网格体的平滑方式由 **平滑类型（Smoothing Type）** 属性设置。每个平滑类型都有调整平滑数量的选项。

**快速迭代（Fast Iterative）** 和 **快速隐式（Fast Implicit）** 平滑类型有调整网格体特定区域的顶点权重地图选项。你必须首先在[属性编辑](/documentation/zh-cn/unreal-engine/edit-attributes-tool-in-unreal-engine)工具中创建权重地图层。上面的对比图就使用了权重地图来创建鹅卵石效果。 如需详细了解如何创建权重地图，请参阅[绘制地图工具](/documentation/zh-cn/unreal-engine/paint-maps-tool-in-unreal-engine)。

有时，在使用平滑工具时，你的网格体可能看起来消失了。其实你的网格体并没有消失，而是经过了大幅度的平滑处理，尺寸也缩小了。这种尺寸变化取决于网格体的分辨率（三角形数量）和 **迭代平滑选项（Iterative Smoothing Options）** 使用的数值。

要避免此问题，请执行以下任一操作：

-   使用 **重新网格化（Remesh）** 工具增加网格体包含的三角形数量（你必须取消当前工具会话才能执行此操作）。
-   降低 **迭代平滑选项（Iterative Smoothing Options）** 下的 **逐步平滑（Smoothing Per Step）** 设置。
-   降低 **迭代平滑选项（Iterative Smoothing Options）** 下的 **步（Steps）** 设置。

工具使用完毕后，在[工具确认](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%92%A4%E9%94%80%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E5%92%8C%E6%8E%A5%E5%8F%97%E6%9B%B4%E6%94%B9)面板中接受或取消更改。

### 热键

**按键命令**

**操作**

**F**

放大网格体的位置。

**ESC**

取消更改并退出工具。

**Enter**

接受工具更改。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [modeling mode](https://dev.epicgames.com/community/search?query=modeling%20mode)
-   [sculpting](https://dev.epicgames.com/community/search?query=sculpting)
-   [skeleton editing](https://dev.epicgames.com/community/search?query=skeleton%20editing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [访问工具](/documentation/zh-cn/unreal-engine/smooth-tool-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%B7%A5%E5%85%B7)
-   [使用平滑](/documentation/zh-cn/unreal-engine/smooth-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%B9%B3%E6%BB%91)
-   [热键](/documentation/zh-cn/unreal-engine/smooth-tool-in-unreal-engine#%E7%83%AD%E9%94%AE)

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
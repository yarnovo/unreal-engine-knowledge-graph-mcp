# 虚幻引擎中的偏移工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/offset-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:08:38.373Z

---

目录

![偏移](https://dev.epicgames.com/community/api/documentation/image/37db3ddb-2283-47b8-90ef-e05101b5cfcf?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**偏移（Offset）** 工具可以沿网格体的法线以指定量调整网格体顶点的位置，例如在高度曲面细分的几何体中制作额外的细节，比如鹅卵石图案。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70d3ef82-652b-4f8e-9159-03d6e2cd75bf/flat-rec.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29926854-056d-4a01-a56b-add5536918c3/jagged-cobble.png)

扁平矩形

鹅卵石

该工具还能提供以下帮助：

-   增加网格体（例如墙壁）的厚度。
-   增大或缩小固体对象。
-   创建自定义[体积Actor](/documentation/zh-cn/unreal-engine/volume-actors-in-unreal-engine)和[切割Actor产生破裂](https://dev.epicgames.com/community/learning/tutorials/k84m/unreal-engine-chaos-destruction-fracture-and-clustering#:~:text=Play%20Video-,MESH%20CUT,-The%20Mesh%20fracture)。

## 访问工具

你可以通过以下方法访问偏移工具：

-   **建模模式（Modeling Mode）** 中的 **变形（Deform）** 类别。如需详细了解建模模式以及访问方法，请参阅[建模模式概述](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)。
-   **骨架编辑器（Skeleton Editor）** 中的 **编辑工具（Editing Tools）** 选项卡。更多详情，请参阅[骨架编辑](/documentation/zh-cn/unreal-engine/skeleton-editing-in-unreal-engine)。

## 使用偏移

偏移具有以下几种操作类型：

-   **迭代（Iterative）** ：进行N次迭代的偏移。
-   **隐式（Implicit）** ：以产生更平滑输出的方式进行偏移，并能更好地保留UV，但在大型网格体上速度可能会很慢

当你偏移网格体时，你可以开关 **创建壳（Create Shell）** 功能来添加增厚的壳，而不仅仅是移动输入顶点。

要在你的网格体上直观地看到效果，你可以切换 **显示线框（Show Wireframe）** 和 **扁平着色（Flat Shading）** ，并在 **渲染（Rending）** 分段中更改材质模式。

![权重贴图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4dbcbab7-ae5c-416d-8be4-5c737bb7fc3d/map-paint-tool.png)

工具使用完毕后，在[工具确认](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B7%A5%E5%85%B7-%E6%92%A4%E9%94%80%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E5%92%8C%E6%8E%A5%E5%8F%97%E6%9B%B4%E6%94%B9)面板中接受或取消更改。

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

-   [访问工具](/documentation/zh-cn/unreal-engine/offset-tool-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%B7%A5%E5%85%B7)
-   [使用偏移](/documentation/zh-cn/unreal-engine/offset-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%81%8F%E7%A7%BB)

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
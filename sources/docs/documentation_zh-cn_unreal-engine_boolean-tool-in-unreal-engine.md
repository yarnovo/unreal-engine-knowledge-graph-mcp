# 虚幻引擎中的布尔工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/boolean-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:08:43.696Z

---

目录

![布尔操作](https://dev.epicgames.com/community/api/documentation/image/87891af5-dec3-431e-9719-cc72dc9347ab?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**布尔** 工具用于为一对网格体进行删减或添加操作。它能让网格体快速添加细节以及置换效果。

## 访问工具

布尔工具位于 **建模模式（Modeling Mode）** 的 **模型（Model）** 类别中。如需详细了解建模模式以及访问方法，请参阅[建模模式概述](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)。

## 使用布尔工具

你需要两个网格体才能使用该工具，因为新生成的网格体的最终效果取决于原有两个网格体的相交方式。网格体的选择顺序对于操作也很重要：

-   你的第一个选择将成为 **A** 。
-   你的第二个选择将成为 **B** 。

下表显示了你可以使用的四种操作。

**操作**

**说明**

**A-B差集（Difference A - B）**

从第一个网格体减去第二个网格体。

**B-A差集（Difference B - A）**

从第二个网格体减去第一个网格体。

**交集（Intersection）**

减去非重叠几何体。

**并集（Union）**

合并两个网格体并解决自相交。

选中两个网格体并激活工具后，你就能在视口中调整网格体了；可能是一个，可能是两个同时调整，具体取决于你的操作方式。

编辑网格体后，你可以选择下表中的操作方式，决定如何处理网格体的输出效果。

**操作**

**说明**

**输出类型（Output Type）**

选择要创建的Actor类型。仅在 **输出对象（Output Object）** 中选择了 **新对象（New Object）** 时才可用。

**输出对象（Output Object）**

确定是创建新Actor还是覆盖某个输入网格体。

**在工具接受时（On Tool Accept）**

确定在接受更改时所选网格体会发生什么。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [modeling mode](https://dev.epicgames.com/community/search?query=modeling%20mode)
-   [modeling tools](https://dev.epicgames.com/community/search?query=modeling%20tools)
-   [low-poly modeling](https://dev.epicgames.com/community/search?query=low-poly%20modeling)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [访问工具](/documentation/zh-cn/unreal-engine/boolean-tool-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%B7%A5%E5%85%B7)
-   [使用布尔工具](/documentation/zh-cn/unreal-engine/boolean-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%B8%83%E5%B0%94%E5%B7%A5%E5%85%B7)

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
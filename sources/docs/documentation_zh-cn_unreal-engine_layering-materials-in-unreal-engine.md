# 在虚幻引擎将材质分层 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/layering-materials-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:27:22.695Z

---

目录

![分层材质](https://dev.epicgames.com/community/api/documentation/image/dc913bfa-8e3f-483c-9978-cf57f1c401a7?resizing_type=fill&width=1920&height=335)

虚幻引擎主要提供了两种方法来为材质进行分层，以便在不同表面类型之间创建复杂的混合效果。这些方法使你能够在单个网格体的不同区域上应用不同的材质属性。虽然你可以使用纹理遮罩和其他基于像素的逻辑，在普通材质中实现类似效果，但本文中的两个系统能够生成更加可读的材质图表，并且在需要对材质进行修改时，其编辑流程对美术师更加友好。

分层材质的两个工作流程如下：

作为材质函数系统扩展的 **分层材质**。 在材质实例编辑器中实现的 **材质层**。

## 用材质函数分层材质

这种分层材质方法是[材质函数](/documentation/404)的扩展。所有要作为一个层使用的材质类型，都在其材质函数中通过[材质属性](/documentation/zh-cn/unreal-engine/material-attributes-expressions-in-unreal-engine)表达式定义。然后你创建一个基类材质——它会包含在各个层之间进行混合所需的所有逻辑。阅读下面的两个页面，了解如何使用这种方法。

[](/documentation/zh-cn/unreal-engine/layered-materials-in-unreal-engine)

[![分层材质概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0894bdf3-9f76-4b2a-9ea2-79fe08868536/layeredmaterialstopic.png)](/documentation/zh-cn/unreal-engine/layered-materials-in-unreal-engine)

[分层材质概述](/documentation/zh-cn/unreal-engine/layered-materials-in-unreal-engine)

[关于使用材质函数创建复杂分层材质的介绍文档。](/documentation/zh-cn/unreal-engine/layered-materials-in-unreal-engine)

[

![创建分层材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e414d4c9-dc6e-4391-9dd0-3117c0697b2d/topic-image-layered-tutorial.png)

创建分层材质

介绍如何在虚幻引擎中使用分层材质技术。





](/documentation/zh-cn/unreal-engine/creating-layered-materials-in-unreal-engine)

## 材质层

[材质层](/documentation/404)系统通过在[材质实例编辑器](/documentation/404)中提供一个用户界面选项卡，使编辑分层材质更加容易。这个 **层参数（Layer Parameters）** 选项卡允许美术师直观在材质实例中切换材质层，改变材质层的堆叠顺序，并修改其混合方式，而无需编辑基本材质中的节点图表。

虽然上文中的分层材质函数流程仍然是一种有效方法，但 **材质层** 系统通常用于为美术师和设计师提供更快、更易迭代的用户体验（他们通常没有编辑节点图表的技术背景）。请在下文中学习如何使用材质层。

[](/documentation/zh-cn/unreal-engine/using-material-layers-in-unreal-engine)

[![使用材质图层](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/896369e0-d68a-4422-aa87-36e95b309dd3/material-layers-topic.png)](/documentation/zh-cn/unreal-engine/using-material-layers-in-unreal-engine)

[使用材质图层](/documentation/zh-cn/unreal-engine/using-material-layers-in-unreal-engine)

[编译利用材质实例化的复杂分层及混合材质。](/documentation/zh-cn/unreal-engine/using-material-layers-in-unreal-engine)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [用材质函数分层材质](/documentation/zh-cn/unreal-engine/layering-materials-in-unreal-engine#%E7%94%A8%E6%9D%90%E8%B4%A8%E5%87%BD%E6%95%B0%E5%88%86%E5%B1%82%E6%9D%90%E8%B4%A8)
-   [材质层](/documentation/zh-cn/unreal-engine/layering-materials-in-unreal-engine#%E6%9D%90%E8%B4%A8%E5%B1%82)
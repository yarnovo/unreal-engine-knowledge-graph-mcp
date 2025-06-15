# 纹理布局 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/texture-layouts
> 
> 生成时间: 2025-06-14T19:03:13.786Z

---

目录

![纹理布局](https://dev.epicgames.com/community/api/documentation/image/405671d4-789e-41d8-a8f3-164beb8ff482?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

正如[概述页面](/documentation/zh-cn/unreal-engine/mutable-overview-in-unreal-engine#%E7%BA%B9%E7%90%86%E5%B8%83%E5%B1%80)所介绍的，你可以使用Mutable管理每个网格体的UV布局，以优化其使用效果。它们可以被分离并归入不同的块，从而在渲染、优化和整理上获得一些好处。本页面将介绍三个关于其应用的示例。

## 纹理和网格体部分合并

如果不同网格体共享材质，Mutable可以合并这些网格体的纹理。此示例显示了一个简单的可自定义对象，其中包含一个子对象，该子对象向基础对象添加了一个网格体及其纹理。此示例包含一个黄黑相间的柱子，其侧面可以用粉色小柱子进行扩展。

### 资产

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/201b0c36-f057-41b8-9000-475ccd44021a/mutable-texture-layouts-1.png)

基础对象的UV已准备好整理成两个块

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c5787ad-e4ba-4abf-8dd0-60b3f9d6547f/mutable-texture-layouts-2.png)

此配件的UV将仅形成一个块

所有这些骨骼网格体共享相同的材质，只有一个纹理参数，即颜色纹理贴图（如之前图片中间所示）。

### 对象结构

此示例的节点图表由一个基础对象和一个子对象组成。子对象使用扩展网格体部分修饰符，将一个带有纹理的网格体片段添加到基础网格体中。

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7be3c632-a47e-4477-a6a5-c515fc344dac/mutable-texture-layouts-3.png)

### UV布局设置

在[骨骼网格体节点](https://github.com/anticto/Mutable-Documentation/wiki/Node-Skeletal-Mesh)的属性选项卡中，你可以设置用于创建块的网格分辨率。基础网格体的网格体布局的分辨率决定了同一可自定义对象层级中所有子网格体的分辨率。

在此示例中，基础网格体的分辨率为2x2，并整理成两个块。这两个块经过策略性设置，因为其中一个块中的网格体在未来的自定义操作中会被完全删除。

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/abcc65d0-7651-4b23-bf20-3f078c9ee3c9/mutable-texture-layouts-4.png)

在此示例中，此网格体中设置的原始纹理为256x256，块分辨率为2x2。这意味着子网格体的任何块单元将为128x128。

下图显示了在没有激活子对象情况下的最终UV布局。

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d086ea1-2939-4292-9b56-296266580086/mutable-texture-layouts-5.png)

点击Mutable编辑器中预览实例视口（Preview Instance Viewport）选项卡中的"UV"按钮，可以显示每个网格体部分的最终UV布局。

### 纹理合并

扩展网格体修饰符根据其标签（请参阅[标签和修饰符](https://github.com/anticto/Mutable-Documentation/wiki/Node-Modifier-Properties)）扩展其应用的网格体部分。这意味着，其网格体将被添加到已修改的网格体部分，其纹理将被添加到已修改部分的纹理中。此子网格体的网格体布局的块分辨率设置为1x1。此1x1块将被添加到基础块中。

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49fcd6c0-6ed7-4cae-b129-1533978c2373/mutable-texture-layouts-6.png)

在此示例中，此子网格体的原始纹理为256x256，但由于它被设置在1x1块中，当与已修改对象的纹理合并时，它将被调整为128x128。如果纹理已经是128x128，则不会应用大小调整。

在创建资产的UV布局时，必须规划纹理大小和块分辨率，以获得最优化且符合预期的质量和外观效果。

下图显示了在激活此子对象情况下的最终UV布局。

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27d8a4fa-b60b-48fa-b06f-30dd0d14dc32/mutable-texture-layouts-7.png)

1x1块已被添加到空白位置。

### 最终纹理

下图显示了最终纹理。

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c252cca3-f193-4db2-86e3-b30d029f2874/mutable-texture-layouts-8.png)

当只有基础网格体时

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/297acd03-dce0-49c9-a50a-c5f69a05f624/mutable-texture-layouts-9.png)

当子网格体激活时

## 使用块删除网格体

Mutable允许通过在UV布局中选择块来删除网格体。这可以通过[Remove Mesh Blocks](https://github.com/anticto/Mutable-Documentation/wiki/Node-Remove-Mesh-Blocks)修饰符节点来实现。

在上述示例的扩展内容中，在黄色柱子上添加了一个更大的蓝色底座。黄色柱子网格体的一部分将与新的蓝色底座重叠，因此这一部分将被删除。

### 资产

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f03f9e19-0866-49f0-91af-9b0f5a8abd51/mutable-texture-layouts-10.png)

此其他配件的UV将仅由一个2x1块组成，此块将替换其父对象的一个块。

## 对象结构

第二个子对象已被添加到示例中。此子对象与前一个具有相同的结构，但有一个附加项。

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/940d441e-d66a-4dd2-a7de-df32ad4c32c6/mutable-texture-layouts-11.png)

### 运行方式

在此示例中，子网格体的UV布局网格分辨率为2x2，仅有一个1x2块。

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7e54745-c3c6-4501-ad80-051fc6d54786/mutable-texture-layouts-12.png)

在此子对象的两个块中，一个块将放置在基础布局的空白空间中，另一个将替换基础网格体的已删除网格体。

除了网格体布局节点外，此子对象还有一个Remove Mesh Blocks修饰符节点，此节点影响基础对象网格体部分。通过在节点属性（Node Properties）选项卡中设置正确的标签，你可以显示已修改的网格体的UV布局并添加UV布局块。Remove Mesh Blocks节点将删除这些块中的任何网格体。

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f51062d-9760-4853-adcb-2efd89d4c467/mutable-texture-layouts-13.png)

在此示例中，选择了右上角的1x1块。此块包含黄色柱子的黑色底座部分。此部分将被删除。

当可自定义对象经过编译且蓝色底座子对象激活时，黑色底座被删除，新的蓝色底座的块被合并到最终的UV布局中。

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d285d6f2-3cda-46fd-8ca0-2a4efa6e0741/mutable-texture-layouts-14.png)

### 最终纹理

下图显示了应用第二个子对象时的最终纹理。

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0fa86092-bf17-4592-880b-6b848af6a10a/mutable-texture-layouts-15.png)

## 复杂块结构示例

下图显示了可自定义对象示例角色"Bandit\_forRPG"的块结构。

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93150e64-85f8-4cf0-8cf3-5e44acf43082/mutable-texture-layouts-16.png)

网格体布局节点属性，显示角色块结构。

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b1e32ff-9750-4591-b786-be228a917a62/mutable-texture-layouts-17.png)

实例参数设置为默认值。

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4c8ddb1-241e-40da-aed4-e054663a309f/mutable-texture-layouts-18.png)

实例示例及其最终颜色纹理。

![图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39d1d89c-f1cf-42e5-8def-777e92cdc4b2/mutable-texture-layouts-19.png)

另一个实例示例及其最终纹理。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [working with content](https://dev.epicgames.com/community/search?query=working%20with%20content)
-   [skeletal mesh](https://dev.epicgames.com/community/search?query=skeletal%20mesh)
-   [mutable](https://dev.epicgames.com/community/search?query=mutable)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [纹理和网格体部分合并](/documentation/zh-cn/unreal-engine/texture-layouts#%E7%BA%B9%E7%90%86%E5%92%8C%E7%BD%91%E6%A0%BC%E4%BD%93%E9%83%A8%E5%88%86%E5%90%88%E5%B9%B6)
-   [资产](/documentation/zh-cn/unreal-engine/texture-layouts#%E8%B5%84%E4%BA%A7)
-   [对象结构](/documentation/zh-cn/unreal-engine/texture-layouts#%E5%AF%B9%E8%B1%A1%E7%BB%93%E6%9E%84)
-   [UV布局设置](/documentation/zh-cn/unreal-engine/texture-layouts#uv%E5%B8%83%E5%B1%80%E8%AE%BE%E7%BD%AE)
-   [纹理合并](/documentation/zh-cn/unreal-engine/texture-layouts#%E7%BA%B9%E7%90%86%E5%90%88%E5%B9%B6)
-   [最终纹理](/documentation/zh-cn/unreal-engine/texture-layouts#%E6%9C%80%E7%BB%88%E7%BA%B9%E7%90%86)
-   [使用块删除网格体](/documentation/zh-cn/unreal-engine/texture-layouts#%E4%BD%BF%E7%94%A8%E5%9D%97%E5%88%A0%E9%99%A4%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [资产](/documentation/zh-cn/unreal-engine/texture-layouts#%E8%B5%84%E4%BA%A7-2)
-   [对象结构](/documentation/zh-cn/unreal-engine/texture-layouts#%E5%AF%B9%E8%B1%A1%E7%BB%93%E6%9E%84-2)
-   [运行方式](/documentation/zh-cn/unreal-engine/texture-layouts#%E8%BF%90%E8%A1%8C%E6%96%B9%E5%BC%8F)
-   [最终纹理](/documentation/zh-cn/unreal-engine/texture-layouts#%E6%9C%80%E7%BB%88%E7%BA%B9%E7%90%86-2)
-   [复杂块结构示例](/documentation/zh-cn/unreal-engine/texture-layouts#%E5%A4%8D%E6%9D%82%E5%9D%97%E7%BB%93%E6%9E%84%E7%A4%BA%E4%BE%8B)
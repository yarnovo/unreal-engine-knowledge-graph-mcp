# 虚幻引擎中的产品配置器模板 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/product-configurator-template-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:10:46.199Z

---

目录

![产品配置器](https://dev.epicgames.com/community/api/documentation/image/eed88d23-11b2-4f08-8ee5-cd8968fcf6dd?resizing_type=fill&width=1920&height=335)

![产品配置器中的吉他示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02adb01d-4e75-4e9c-91ce-564948e74df0/01-the-guitar-sample-from-the-product-configurator.png "Guitar sample from the Product Configurator")

**虚幻引擎5（UE5）** 中的 **产品配置器（Product Configurator）** 模板能为3D可视化美术师提供一个现成的起点，可用于创建拥有自定义功能的产品配置器和用户界面。该模板用到了关卡变体集（Level Variant Set）、自定义UMG界面元素、以及一个拥有下列功能的专用配置蓝图：

-   具备Actor切换的几何体变体。
-   材质和可视性选项。
-   摄像机位置与设置变体。
-   光照和环境变体。
-   过程生成界面，为用户提供选项。
-   无需使用蓝图代码即可添加新变体的功能。

## 概述

你可以使用 **变体管理器（Variant Manager）** 在 **关卡变体集（LevelVariantSet）** Actor中定义 **Actor变体** 和 **变体集（Variant Sets）** 。然后信息将传递到 **BP\_Configurator** 蓝图；蓝图使用该信息动态创建用户界面，并显示所有变体选项，以及用户定义的缩略图：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42ee3df4-549b-4dae-b768-a5ea982b4fb0/02-configurator-with-the-upholstery-options-for-a-car-seat.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42ee3df4-549b-4dae-b768-a5ea982b4fb0/02-configurator-with-the-upholstery-options-for-a-car-seat.png)

点击查看大图。

### 控制模板

**控件**

**说明**

**Alt + LMB**

围绕产品旋转摄像机。

**Alt + RMB**

放大/缩小

**G**

隐藏/显示界面

**退出键（Escape）**

退出配置器

## 模板功能

该模板使用变体管理器，这是一个专门的UI面板，用于整理关卡中Actor的不同属性配置，并将其存储在LevelVariantSet Actor中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/413ad2cd-b1df-47c0-b9ea-cb8ab1395373/03-variant-manager.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/413ad2cd-b1df-47c0-b9ea-cb8ab1395373/03-variant-manager.png)

点击查看大图。

**数量**

**说明**

**1**

变体

**2**

Actor

**3**

属性

**4**

启用自动采集属性

变体（Variants）列包含整理为变体集的所有Actor配置（称为变体）。每个变体代表配置器中的一个选项，并且可以包含一个或多个带有各种属性更改的Actor。这些由用户设置的缩略图图像表示。运行时所有变体都将通过BP\_Configurator转换为界面中的按钮。

有关使用变体管理器的更多信息，请参阅[变体管理器](/documentation/zh-cn/unreal-engine/variant-manager-template-overview)文档。

### 使用BP\_Configurator

BP\_Configurator蓝图从指定的关卡变体集中接收数据，并为配置器动态创建用户界面：

1.  BP\_Configurator从指定的关卡变体集中接收数据。
2.  每个变体集都会转换为主UI工具栏上的图标。
3.  每个变体成为变体集子菜单中的选项。
4.  变体通过变体管理器中设置的缩略图直观展示。
5.  变体集由当前活动变体的图标表示。

## 如何导入你的数据

自定义产品配置器模板从导入你的3D作品和纹理开始。虚幻引擎5支持使用[Datasmith](/documentation/zh-cn/unreal-engine/datasmith-plugins-overview)以及[FBX内容通道](/documentation/zh-cn/unreal-engine/fbx-content-pipeline)，从你喜欢的3D应用程序（例如Maya、3ds Max和Blender）中导入。

将3D和2D资产导入内容浏览器后，你将需要从关卡中删除吉他示例，并使用变体管理器构建变体和变体集。最后一步是将关卡变体集连接到BP\_Configurator，以便在运行时创建自定义用户界面。

### 将你的作品添加到主关卡

将你的资产导入到UE5并在内容浏览器中进行设置时，将需要删除吉他示例，并将新作品添加到该关卡中：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ce2c2a5-04d6-4448-b67f-3c508d02d0f8/04-project-start.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ce2c2a5-04d6-4448-b67f-3c508d02d0f8/04-project-start.png)

点击查看大图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aebfadc4-5eb8-4273-91d7-bae2c91ed140/05-guitar.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aebfadc4-5eb8-4273-91d7-bae2c91ed140/05-guitar.png)

点击查看大图。

产品配置器使用一个或多个根Actor为你的静态网格体提供标准布局：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e105ee9a-d241-49f0-8c43-0613b5965c73/06-guitar-root.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e105ee9a-d241-49f0-8c43-0613b5965c73/06-guitar-root.png)

点击查看大图。

要删除示例模型，请删除GuitarRoot对象及其所有子对象。

接下来，将一个新的空Actor放入关卡中，以用作新的根对象。将其位置居于关卡原点（X=0，Y=0，Z=0）：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c8e3a2a-d7fc-4401-aeb0-e9d1a65443db/07-create-blueprint-class.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c8e3a2a-d7fc-4401-aeb0-e9d1a65443db/07-create-blueprint-class.png)

点击查看大图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67769613-b792-423c-83e4-0b080da75ac1/08-actor-class.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67769613-b792-423c-83e4-0b080da75ac1/08-actor-class.png)

点击查看大图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e1d5e69-9ab6-4dea-87a0-530bc3949294/09-empty-scene-object.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e1d5e69-9ab6-4dea-87a0-530bc3949294/09-empty-scene-object.png)

点击查看大图。

这样会将你的产品置于现有摄像机设置的前面。

现在，将产品的各个部分作为根对象的子级放置在关卡中：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3ddb859-4471-4de9-b3ff-ec9ff8ae4e2b/10-car-seat-blueprint.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3ddb859-4471-4de9-b3ff-ec9ff8ae4e2b/10-car-seat-blueprint.png)

点击查看大图。

### 在变体管理器中创建变体

在关卡中设置了作品之后，你可以开始使用LevelVariantSet Actor和变体管理器创建变体和变体集。

为了使BP\_Configurator创建的动态UI能够正常运行，第一个和第二个变体集 **必须** 是环境（Environment）和摄像机。

在内容浏览器中点击右键，导航到"杂项"（Miscellaneous）子菜单，并选择"关卡变体集"（Level Variant Sets）选项，创建"关卡变体集Actor"（LevelVariantSet Actor）：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d9d75f0-8685-4b21-9af7-728782d696a5/11-level-variant-set.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d9d75f0-8685-4b21-9af7-728782d696a5/11-level-variant-set.png)

点击查看大图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1391b4a6-364f-4ed2-a1f5-db03dd5cbd86/12-level-variant-set-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1391b4a6-364f-4ed2-a1f5-db03dd5cbd86/12-level-variant-set-1.png)

点击查看大图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c96731ec-e392-4296-a51c-b76b9be1f529/13-drag-the-level-variant-set-to-the-viewport.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c96731ec-e392-4296-a51c-b76b9be1f529/13-drag-the-level-variant-set-to-the-viewport.png)

点击查看大图。

给它指定唯一名称，然后双击打开变体管理器。

从创建自定义变体集开始。点击 **+变体集** 按钮，命名新变体集：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b0ac3ec-e80e-4143-a127-0bf6bbe33cb5/14-variant-set.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b0ac3ec-e80e-4143-a127-0bf6bbe33cb5/14-variant-set.png)

点击查看大图。

创建变体集后，点击其名称旁边的 **+** 按钮，创建变体。这代表当用户选择此预设时你要更改的Actor和属性：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dcbd5577-235e-4407-9518-96f0fb517c21/15-adding-variant.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dcbd5577-235e-4407-9518-96f0fb517c21/15-adding-variant.png)

点击查看大图。

点击新变体，高亮显示它，然后点击Actors列中的 "+" 按钮。这将打开一个新窗口并列出你场景中的所有Actor。选择当用户选择此变体时你要更改的Actor。对将成为此预设一部分的每个Actor重复该过程：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec32bf94-3810-47fc-8ba5-a0377fdfdbd4/16-adding-actors.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec32bf94-3810-47fc-8ba5-a0377fdfdbd4/16-adding-actors.png)

点击查看大图。

接下来，高亮显示你要使用的Actor，然后点击属性（Properties）列中的 **+** 按钮。这将创建一个新窗口，其中列出了Actor的所有属性，这些属性可以作为变体的一部分进行更改。勾选每个属性的复选框（它们会在变体选中后更改）：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a16b0f8f-0a53-481a-b51b-1e16dec0c1de/17-adding-properties.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a16b0f8f-0a53-481a-b51b-1e16dec0c1de/17-adding-properties.png)

点击查看大图。

该列表包括默认属性和任何用户定义属性。在上述示例中，已选择环境地图（Env Map）属性。更改此属性将允许你在运行时更改产品配置器中的环境。

最后一步是设置属性值。有两种操作方法：第一种是使用值（Values）列手动设置值：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d03f4ed9-884b-4710-acf6-848b7729238d/18-setting-property.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d03f4ed9-884b-4710-acf6-848b7729238d/18-setting-property.png)

点击查看大图。

你还可以使用关卡中设置的值设置属性，方法是右键点击属性，然后从上下文菜单选择 **记录当前值（Record current value）** ，记录你的变体的当前值。

或者，按下 **自动捕捉（Auto Capture）** 按钮，启用自动采集属性。激活后，此选项会告知变体管理器在关卡中侦听对Actor所做的更改，并将其记录在选定的变体中。若修改的Actor还未绑定到所选变体，它会自动绑定。

变体集中的每个变体都需要缩略图。这些缩略图在用户界面中用作按钮图标，并且可以是导入到引擎或从UE4视口捕获的纹理图像。右键点击变体，打开菜单：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c6a018c-2a61-4d45-8d3e-7a134f62bbc2/21-thumbnail-viewport.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c6a018c-2a61-4d45-8d3e-7a134f62bbc2/21-thumbnail-viewport.png)

点击查看大图。

对所有变体和变体集重复此过程。

## 连接到BP\_Configurator

要完成自定义模板的过程，需要将关卡变体集连接到BP\_Configurator。首先从关卡中删除现有的LevelVariantSet Actor，并将其替换为你自己的Actor。Actor必须在关卡中才能对BP\_Configurator可见：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/686eb4b9-789e-47fd-9431-7461edde9e15/23-setting-up-config.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/686eb4b9-789e-47fd-9431-7461edde9e15/23-setting-up-config.png)

点击查看大图。

在细节（Details）面板中，在菜单的默认分段找到LVSActor选项，然后使用下拉菜单将设置更改为关卡变体集。

最后，测试你的配置器：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd238c45-e6c2-41b8-b3b5-3ce116a60817/24-car-seat-blueprint-on-the-viewport.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd238c45-e6c2-41b8-b3b5-3ce116a60817/24-car-seat-blueprint-on-the-viewport.png)

点击查看大图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5fadb406-4d6e-4ec1-98f9-5b471082c198/25-press-play-button.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5fadb406-4d6e-4ec1-98f9-5b471082c198/25-press-play-button.png)

点击查看大图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c050e178-467a-4ce7-8e4e-afbd2eaba31b/26-final.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c050e178-467a-4ce7-8e4e-afbd2eaba31b/26-final.png)

点击查看大图。

-   [templates](https://dev.epicgames.com/community/search?query=templates)
-   [variantmanager](https://dev.epicgames.com/community/search?query=variantmanager)
-   [productconfigurator](https://dev.epicgames.com/community/search?query=productconfigurator)
-   [variant manager](https://dev.epicgames.com/community/search?query=variant%20manager)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/product-configurator-template-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [控制模板](/documentation/zh-cn/unreal-engine/product-configurator-template-in-unreal-engine#%E6%8E%A7%E5%88%B6%E6%A8%A1%E6%9D%BF)
-   [模板功能](/documentation/zh-cn/unreal-engine/product-configurator-template-in-unreal-engine#%E6%A8%A1%E6%9D%BF%E5%8A%9F%E8%83%BD)
-   [使用BP\_Configurator](/documentation/zh-cn/unreal-engine/product-configurator-template-in-unreal-engine#%E4%BD%BF%E7%94%A8bp-configurator)
-   [如何导入你的数据](/documentation/zh-cn/unreal-engine/product-configurator-template-in-unreal-engine#%E5%A6%82%E4%BD%95%E5%AF%BC%E5%85%A5%E4%BD%A0%E7%9A%84%E6%95%B0%E6%8D%AE)
-   [将你的作品添加到主关卡](/documentation/zh-cn/unreal-engine/product-configurator-template-in-unreal-engine#%E5%B0%86%E4%BD%A0%E7%9A%84%E4%BD%9C%E5%93%81%E6%B7%BB%E5%8A%A0%E5%88%B0%E4%B8%BB%E5%85%B3%E5%8D%A1)
-   [在变体管理器中创建变体](/documentation/zh-cn/unreal-engine/product-configurator-template-in-unreal-engine#%E5%9C%A8%E5%8F%98%E4%BD%93%E7%AE%A1%E7%90%86%E5%99%A8%E4%B8%AD%E5%88%9B%E5%BB%BA%E5%8F%98%E4%BD%93)
-   [连接到BP\_Configurator](/documentation/zh-cn/unreal-engine/product-configurator-template-in-unreal-engine#%E8%BF%9E%E6%8E%A5%E5%88%B0bp-configurator)
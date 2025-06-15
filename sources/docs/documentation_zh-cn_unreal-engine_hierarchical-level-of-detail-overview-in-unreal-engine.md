# 虚幻引擎HLOD概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/hierarchical-level-of-detail-overview-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:11:51.453Z

---

目录

![HLOD概述](https://dev.epicgames.com/community/api/documentation/image/36894ffe-627d-48af-a89c-ce491c5d2db7?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9491cf68-f006-472f-8aec-0fd835dde1d7/hlod_howto_header.png)

就其最简单的形式而言，**分层细节级别（Hierarchical Level of Detail）** （简称 HLOD）将预先存在的[静态网格体Actor](/documentation/zh-cn/unreal-engine/static-mesh-actors-in-unreal-engine)组合为一个单一的HLOD代理模型和材质（带有图谱纹理）。因为HLOD可以将每个代理模型的多个绘制调用减少为一个调用，而不是每个静态网格体Actor一个绘制调用，因此使用它可以提升性能。生成HLOD代理模型时，可以调整几个参数，这些参数有助于定义如何将静态网格体Actor作为群集分组在一起，它们最终将被编译到代理模型中。 

要使用HLOD，需要在希望利用此系统的每个关卡中启用HLOD系统。

## 代理模型

代理模型可以单独打开，还可以根据需要调整它们的设置。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a63d61c9-3145-4450-ab2b-25f67b192720/image_16.png)

上方的代理模型包含数个不同元素，它们原本均拥有自身的纹理，现在这些纹理已组合为一个单一的纹理。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbaf1048-efc4-447a-a142-432fde4af1fd/image_17.png)

对于使用 **遮罩** 和 **不透明度** 的任何内容，透明通道不会传递到合并的纹理。如果需要带不透明度或遮罩的内容，请禁用 **合并纹理（Merge Textures）** 选项。执行此操作时，代理模型将把原始材质指定为一个 **材质元素ID**，而非组合它们。

## 分层LOD体积域

**分层LOD体积域**（HLOD体积域）用于手动定义/创建HLOD群集。可从 **放置Actor（Place Actors）** 面板的 **体积** 选项卡中拖入关卡。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00a79871-54c4-4266-99d3-efd5834c338b/hlodoverview_hlodvolume.png "HLODOverview_HLODvolume.png")

将此体积域放置在需要放入同一群集的Actor周围。将此体积域的范围设为略大于希望包含的Actor较好，不应包裹太紧。将体积域设置在Actor周围后，即可使用 **HLOD大纲视图（HLOD Outliner）** 中的选项 **生成群集（Generate Clusters）** 创建这些分组Actor的新群集。

下面，在HLOD体积域中有几个立方体和球体，在体积域之外有一个立方体和地面。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/64bf9963-e2d6-4001-b0df-77a3b9294ddc/hlodoverview_volume01.png "HLODOverview_Volume01.png")

当我们在 **HLOD大纲视图（HLOD Outliner）** 中 **生成群集** 时，我们有两个单独的群集：一个群集包含HLOD体积域以内的静态网格体Actor，另一个群集包含HLOD体积域以外的静态网格体Actor。 

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1efdff33-fe55-4bb4-985c-143ab760972a/hlodoverview_volume02-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1efdff33-fe55-4bb4-985c-143ab760972a/hlodoverview_volume02-1.png)

点击查看大图。

您还可以选择启用 **仅生成体积群集（Only Generate Clusters for Volume）**（如下所示），仅为HLOD体积域中存在的静态网格体Actor生成群集。 

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/122fbb33-1d0d-4370-b46e-601cdac8b782/hlodoverview_volume03.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/122fbb33-1d0d-4370-b46e-601cdac8b782/hlodoverview_volume03.png)

点击查看大图。

### 示例

以下是添加HLOD体积域前后生成的群集示例。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9c8b3da-fd79-4d19-9526-3496bc066bf8/image_19.png)

HLOD等级所需的边界半径：500

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/affee6b6-b882-417b-92bb-f4d09de2b470/image_20.png)

拖入体积域并进行相应的缩放以覆盖 **Actor**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5ab7869-761e-4541-9725-29921d1401da/image_21.png)

从HLOD大纲视图选择生成的 **LODActor** 将显示创建的群集和群集边界。

在HLOD大纲视图中右键单击 **LODActor**，并单击 **选择包含的Actor（Select Contained Actors）** 查看用于场景中该特定 **LODActor** 的Actor。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d65630ca-859c-4437-979c-f8e3bd4634e2/image_22.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56e4707c-0545-4b9d-a636-36cf73a136a8/image_23.png)

## HLOD覆盖

当您选择了关卡中的一个LOD Actor时，您可以在 **详细信息（Details）** 面板中覆盖正在使用的 **分层LOD设置（Hierarchical LODSettings）**。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c99735c7-378c-4c80-87da-ab2140a90a4f/hlodoverview_overides.png "HLODOverview_Overides.png")

请参阅[模型生成设置](/documentation/zh-cn/unreal-engine/hierarchical-level-of-detail-outliner-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E7%94%9F%E6%88%90%E8%AE%BE%E7%BD%AE)和属性了解详情。

## HLOD可视化

您可以使用可视化模式来在视口中查看模型LOD和HLOD。要访问这些，单击视口左上角的 **查看模式（View Mode）** 按钮并选择首选的LOD着色方法。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f116207d-f6b4-4117-9043-765962579a58/levelofdetailcoloration.png)

在播放会话期间，您可以输入控制台命令 `viewmode hlodcoloration` 来获得相同的结果。

-   [hlod](https://dev.epicgames.com/community/search?query=hlod)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [代理模型](/documentation/zh-cn/unreal-engine/hierarchical-level-of-detail-overview-in-unreal-engine#%E4%BB%A3%E7%90%86%E6%A8%A1%E5%9E%8B)
-   [分层LOD体积域](/documentation/zh-cn/unreal-engine/hierarchical-level-of-detail-overview-in-unreal-engine#%E5%88%86%E5%B1%82lod%E4%BD%93%E7%A7%AF%E5%9F%9F)
-   [示例](/documentation/zh-cn/unreal-engine/hierarchical-level-of-detail-overview-in-unreal-engine#%E7%A4%BA%E4%BE%8B)
-   [HLOD覆盖](/documentation/zh-cn/unreal-engine/hierarchical-level-of-detail-overview-in-unreal-engine#hlod%E8%A6%86%E7%9B%96)
-   [HLOD可视化](/documentation/zh-cn/unreal-engine/hierarchical-level-of-detail-overview-in-unreal-engine#hlod%E5%8F%AF%E8%A7%86%E5%8C%96)
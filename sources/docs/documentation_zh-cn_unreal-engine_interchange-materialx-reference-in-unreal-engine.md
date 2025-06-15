# 虚幻引擎中的交换MaterialX参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/interchange-materialx-reference-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:01:22.972Z

---

目录

![交换MaterialX参考](https://dev.epicgames.com/community/api/documentation/image/dca06462-5e9f-44c7-9171-dec5b230b746?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

**MaterialX** 格式是工业光魔（Industrial Light & Magic）在2012年开发的开源交换方法。这种方法不挑软件，可用于描述模式、纹理、着色器网络及其几何分配。**虚幻引擎（UE）** 使用以下标准支持[交换框架](/documentation/zh-cn/unreal-engine/interchange-framework-in-unreal-engine)中的MaterialX：

-   Autodesk开发的标准表面着色（Standard Surface Shading）模型：
-   使用皮克斯开发的通用场景描述（USD）预览表面着色模型的[USD](/documentation/zh-cn/unreal-engine/universal-scene-description-usd-in-unreal-engine)工作流程。
-   Adobe和Autodesk指定的OpenPBR着色模型。

在默认情况下，OpenPBR材质使用标准表明着色器。使用[Substrate材质](/documentation/zh-cn/unreal-engine/substrate-materials-in-unreal-engine)可以带来更好的材质保真度，因为它支持不透明和半透明材质。该功能目前属于实验性功能。

## 导入MaterialX文件

要将MaterialX文件导入虚幻引擎中，请使用标准[交换](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine)导入流程。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/532b0fc4-c17c-4d18-a5a1-a348b302df0e/materialx-import-dialog.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/532b0fc4-c17c-4d18-a5a1-a348b302df0e/materialx-import-dialog.png)

将MaterialX文件导入关卡。

交换导入过程会导入图像数据并自动创建相应数量的材质。

## 编辑MaterialX导入设置

若要自定义MaterialX导入设置，你可以：

-   随时在虚幻引擎的 **项目设置（Project Settings）** 编辑器中操作。
-   在交换管线配置窗口中导入时操作。

如需详细了解如何使用交换管线配置窗口自定义设置，请参阅[交换导入参考](/documentation/zh-cn/unreal-engine/interchange-import-reference-in-unreal-engine)。

MaterialX导入设置位于 **项目设置（Project Settings）> 交换MaterialX（Interchange MaterialX）** 中：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bea33528-1026-4d47-9986-757346a5a4b6/materialx-project-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bea33528-1026-4d47-9986-757346a5a4b6/materialx-project-settings.png)

MaterialX项目设置

**选项**

**说明**

**标准表面（Standard Surface）**

定义在解译Autodesk的标准表面着色器的数据时要使用的材质函数。

**标准表面透射（Standard Surface Transmission）**

定义在解译透明度的标准表面数据时要使用的材质函数。

**表面无光照（Surface Unlit）**

定义在解译无光照表面的标准表面数据时要使用的材质函数。

**USD预览表面（USD Preview Surface）**

定义在解译USD的表面着色器的数据时要使用的材质函数。

**OpenPBR表面（OpenPBR Surface）**

定义在解译OpenPBR表面着色器的数据时要使用的材质函数。

**OpenPBR表面投射（OpenPBR Surface Transmission）**

定义在解译透明度的OpenPBR表面数据时要使用的材质函数。

导入过程使用以下材质函数将MaterialX定义解译为虚幻着色器节点：

-   `MX_StandardSurface`
-   `MX_TransmissionSurface`
-   `MX_SurfaceUnlit`
-   `MX_USDPreviewSurface`
-   `MX_Surface`
-   `MX_OpenPBR_Opaque`
-   `MX_OpenPBR_Translucent`
-   `MX_Substrate-StandardSurface-Opaque`
-   `MX_Substrate-StandardSurface-Translucent`
-   `MX_Substrate_OpenPBR_Opaque`
-   `MX_Substrate_OpenPBR_Translucent`

当导入的数据使用不受支持的着色器模型时，虚幻会尝试生成一个使用MX\_Surface和其他受支持材质函数的着色器图表。

这些材质位于以下虚幻引擎目录中：

-   `Engine/Plugins/InterchangeFrameworkContent/Functions`
-   `Engine/Plugins/InterchangeFrameworkContent/Substrate`
-   `Engine/Content/Functions/Substrate`

不推荐编辑默认引擎材质函数。如果你需要自定义这些函数，请遵循以下步骤：

1.  创建你想编辑的材质函数的副本，并将此新函数移入项目的 **Content** 文件夹中。
2.  更改材质函数并保存。
3.  在 **项目设置（Project Settings）> 交换MaterialX（Interchange MaterialX）** 中选择新材质函数。

-   [import](https://dev.epicgames.com/community/search?query=import)
-   [working with content](https://dev.epicgames.com/community/search?query=working%20with%20content)
-   [export](https://dev.epicgames.com/community/search?query=export)
-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [interchange](https://dev.epicgames.com/community/search?query=interchange)
-   [materialx](https://dev.epicgames.com/community/search?query=materialx)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [导入MaterialX文件](/documentation/zh-cn/unreal-engine/interchange-materialx-reference-in-unreal-engine#%E5%AF%BC%E5%85%A5materialx%E6%96%87%E4%BB%B6)
-   [编辑MaterialX导入设置](/documentation/zh-cn/unreal-engine/interchange-materialx-reference-in-unreal-engine#%E7%BC%96%E8%BE%91materialx%E5%AF%BC%E5%85%A5%E8%AE%BE%E7%BD%AE)
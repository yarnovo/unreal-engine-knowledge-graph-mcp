# 虚幻引擎的OpenColorIO快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/opencolorio-quick-start-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:30:19.253Z

---

目录

![OpenColorIO快速入门](https://dev.epicgames.com/community/api/documentation/image/c304efac-5a9c-4882-b49b-19c927ea83fc?resizing_type=fill&width=1920&height=335)

本文将介绍如何在虚幻引擎（UE）中使用OpenColorIO（OCIO）， 并展示如何基于OCIO配置来创建 **OpenColor配置资产（OpenColor Configuration Asset）**。

创建此文件后，可以使用OCIO来应用颜色变换。你可以通过[蓝图](/documentation/zh-cn/unreal-engine/converting-colors-in-unreal-engine-blueprints)以及在UE的[视口模式和在编辑器中运行模式](/documentation/zh-cn/unreal-engine/apply-color-conversion-to-the-level-viewport-and-play-in-editor-with-opencolorio-in-unreal-engine)中进行操作。

## 先决条件

在你新建项目时，UE会自动启用OpenColorIO插件。 如果OpenColorIO插件被禁用，则必须将其启用才能在UE中使用OCIO。 如需了解如何在UE中启用插件，请参阅[使用插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)。

## OCIO配置

OCIO配置包含可与OCIO一起使用的颜色空间、显示和视图的集合。 你可以使用自己的OCIO配置文件、OCIO插件提供的默认ACES配置之一，或[美国学院软件基金会（Academy Software Foundation）](https://github.com/AcademySoftwareFoundation/OpenColorIO-Config-ACES/releases/tag/v1.0.0)GitHub仓库中的ACES配置文件之一。

## 使用内置的OCIO配置

若要使用其中一个内置OCIO配置，可以在OpenColorIO配置资产的 **配置文件（Configuration File）** 路径中输入以下字符串之一（请参阅"创建OpenColorIO配置资产"）。 这些配置文件内置于OCIO库中，不需要任何外部文件。

-   若要使用[默认ACES CG配置](https://opencolorio.readthedocs.io/en/latest/releases/ocio_2_2.html#built-in-configs)，请在 **配置文件（Configuration File）** 路径中输入以下字符串：`ocio://default`
    
-   若要使用ACES CG配置，请在 **配置文件（Configuration File）** 路径中输入以下字符串：`ocio://cg-config-v1.0.0_aces-v1.3_ocio-v2.1`
    
-   若要使用ACES Studio配置，请在 **配置文件（Configuration File）** 路径中输入以下字符串：`ocio://studio-config-v1.0.0_aces-v1.3_ocio-v2.1`
    

## 导入OCIO配置文件

要将OCIO配置（`ocio` 或 `.ocioz`）文件添加到项目中，必须使用计算机的文件资源管理器将该文件添加到项目的内容（Content）文件夹中。 UE无法自动识别 `.ocio` 和 `.ocioz` 文件，因此你无法使用UE中的内容抽屉（Content Drawer）将这些文件添加到项目中。

OCIO插件还支持 `.ocioz` 存档文件。 如果要将配置文件及其LUT纹理文件夹压缩到单个存档中，此格式的存档文件可能很有用。

## 示例OCIO配置文件

Epic创建了一个示例 `.ocio` 配置文件并将其包含OCIO插件中。 此示例配置文件位于引擎安装文件夹中，在 `Engine\Plugins\Compositing\OpenColorIO\Content\OCIO` 下面。

在内容浏览器（Content Browser）中浏览到OpenColorIO插件的内容时，内容浏览器不会显示这些文件，因为内容浏览器只显示.uasset文件。 请改为使用计算机的文件资源管理器浏览到这些文件。

## 创建OpenColorIO配置资产

OCIO插件使用OpenColorIO配置资产来管理要在项目中使用的颜色描述。 此资产引用一个OCIO配置，这个配置包含有关多个颜色描述以及如何在这些颜色描述之间进行转换的详细规范。

UE目前支持OCIO v2.2。 有关OCIO配置文件的更多细节，请参阅[OpenColorIO v2文档](https://opencolorio.readthedocs.io/en/latest/index.html)和[OCIO v2.2版本信息](https://opencolorio.readthedocs.io/en/latest/releases/ocio_2_2.html)。

在使用OCIO之前，必须先创建一个OpenColorIO配置资产。

要创建OpenColorIO配置资产，请执行以下操作：

1.  在[内容浏览器（Content Browser）](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)中，单击右键以打开上下文菜单，然后选择 **杂项（Miscellaneous）> OpenColorIO配置（OpenColorIO Configuration）** 以创建 **OpenColorIO配置资产（OpenColorIO Configuration Asset）**。
    
    ![Create an OpenColorIO Configuration Asset ](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca10bb6d-da94-4527-a973-3a6b3e262a00/create-ocio-config-asset.png)
2.  双击你创建的 **OpenColorIO配置资产** 以编辑其设置。 在此示例中，资产名为 **OCIO\_Example**。
    
    ![Edit the OpenColorIO Configuration Asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f8c48b5-cca7-449d-8e67-332af5a9c984/ocio-config-asset-settings.png)
3.  对于 **配置文件（Configuration File）** 参数，单击 **浏览（Browse）** 以查找并选择计算机上的OCIO配置（`.ocio`）文件，或输入URL以使用其中一个内置配置。 默认情况下，新的OpenColor配置资产使用 `ocio://default` OCIO配置。
    
    ![Select a Configuration File](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2e8ac02-9c21-45c3-a73a-a3d6477ca7e6/set-ocio-configuration-file.png)
4.  对于 **需要的颜色空间（Desired Color Spaces）** 参数，请单击 **添加（+）（Add (+)）** 以添加新的颜色空间条目。
    
    ![Add a new color space](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0262857d-c3a7-4df7-98e1-68db87522edf/add-new-color-space.png)
5.  在新条目中，打开下拉列表，然后选择要在UE中使用的配置文件中定义的颜色空间之一。
    
    ![Select the color space you want to use](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ee8ed18-a153-4b2f-bf52-bd70f0c2e091/set-color-space.png)
6.  对要使用的每个颜色空间或显示视图重复最后两个步骤，然后单击 **保存（Save）** 以保存你的资产。
    
    ![Add extra color spaces](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51a80c64-3531-4848-be55-a95569bf0aa9/ocio-config-asset-with-color-spaces-added.png)

仅设置你在UE中实际需要使用的颜色描述。 这有助于你的配置资产尽可能保持轻量级。

你的OpenColorIO配置资产现已设置完毕，接下来可以使用此配置资产将颜色转换应用于引擎中的不同系统。

## 配置OpenColorIO配置资产

![The OCIO Configuration Asset details panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c578f31-2d23-4ec5-9b54-6815a6c1ee1a/generic-apply-ocio-asset.png)

虽然在UE中为系统设置颜色转换的方法可能不同，但针对OpenColorIO的颜色转换设置是相同的。 你需要指定要使用的OpenColorIO配置资产，以及源和目标颜色空间：

-   **配置源（Configuration Source）**：你正在使用的OpenColorIO配置资产。
    
-   **源颜色空间（Source Color Space）**：要进行转换的输入颜色空间。
    
-   **目标颜色空间（Destination Color Space）**：要转换到的输出颜色空间。
    
-   **目标显示视图（Destination Display View）**：要在其中转换颜色的显示视图。
    

-   [vfx](https://dev.epicgames.com/community/search?query=vfx)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/opencolorio-quick-start-for-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [OCIO配置](/documentation/zh-cn/unreal-engine/opencolorio-quick-start-for-unreal-engine#ocio%E9%85%8D%E7%BD%AE)
-   [使用内置的OCIO配置](/documentation/zh-cn/unreal-engine/opencolorio-quick-start-for-unreal-engine#%E4%BD%BF%E7%94%A8%E5%86%85%E7%BD%AE%E7%9A%84ocio%E9%85%8D%E7%BD%AE)
-   [导入OCIO配置文件](/documentation/zh-cn/unreal-engine/opencolorio-quick-start-for-unreal-engine#%E5%AF%BC%E5%85%A5ocio%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
-   [示例OCIO配置文件](/documentation/zh-cn/unreal-engine/opencolorio-quick-start-for-unreal-engine#%E7%A4%BA%E4%BE%8Bocio%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
-   [创建OpenColorIO配置资产](/documentation/zh-cn/unreal-engine/opencolorio-quick-start-for-unreal-engine#%E5%88%9B%E5%BB%BAopencolorio%E9%85%8D%E7%BD%AE%E8%B5%84%E4%BA%A7)
-   [配置OpenColorIO配置资产](/documentation/zh-cn/unreal-engine/opencolorio-quick-start-for-unreal-engine#%E9%85%8D%E7%BD%AEopencolorio%E9%85%8D%E7%BD%AE%E8%B5%84%E4%BA%A7)
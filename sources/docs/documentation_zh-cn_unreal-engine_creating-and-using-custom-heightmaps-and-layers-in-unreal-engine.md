# 在虚幻引擎中创建和使用自定义高度图和图层 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-and-using-custom-heightmaps-and-layers-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:13:35.196Z

---

目录

![创建和使用自定义高度图和图层](https://dev.epicgames.com/community/api/documentation/image/80df39fb-b6f8-4a3d-a7fa-9f47555b75b4?resizing_type=fill&width=1920&height=335)

用户有时需要使用第三方程序来为地形创建需要的高度图和图层。 为了适应这一工作流程，虚幻引擎允许导入自定义的高度图和图层。

![Image of From Landscape Mountains sample project](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7ae3535-856e-4efa-98cf-7599d00590d9/landscape_example_image.png "Landscape Mountains sample project")

如果这是您首次使用地形工具，可能需要首先查阅[地形总览](/documentation/zh-cn/unreal-engine/editing-landscapes-in-unreal-engine)。

## 图层

地形图层是特殊的纹理，包含高度图和色彩数据。它可用户自定义地形的外观和感觉。

### 图层格式

通过 `ILandscapeHeightmapFileFormat` 和 `ILandscapeWeightmapFileFormat` 接口的实现即可从第三方程序导出地形图层。编辑器对基于图像的导出的现有支持已转换为使用此接口，且完全支持。内置格式的图像仍需要为灰阶、每像素8位、.PNG或.RAW格式的单通道文件。如果在Photoshop中创建层，创建新文件时应使用以下设置：

![Image of Photoshop sample settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6ab57f3-3fe5-4d1a-b448-6ec4724298e2/photoshop_layer_example.png)

### 图层导入

为了适应不同的地形工作流程，从外部应用程序导入图层的流程十分灵活，但首先需要进行几项设置，才能让工作顺利进行。

1.  首先需要创建一个可使用的地形。如果你对地形创建流程有疑问，请参阅[地形创建](/documentation/zh-cn/unreal-engine/creating-landscapes-in-unreal-engine)。
    
2.  然后，制作一个新材质。在本例中，我们将制作一个非常简单的材质，它可以根据需求轻松延展。该材质的设置应与下图类似。
    
    ![Image of basic Landscape shader setup](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53e276e4-50e9-4af8-b40d-a2f0624ccac2/landscape_simple_shader.png)

数值

描述

1

LandscapeLayerCoords

2

TextureSample: T\_Ground\_Grass\_D (Found in **StarterContent/Textures**)

3

TextureSample: T\_Ground\_Gravel\_D (Found in **StarterContent/Textures**)

4

TextureSample: T\_Rock\_Slate\_D (Found in **StarterContent/Textures**)

5

LandscapeLayerBlend

1.  材质创建完成后，将其应用到地形Actor。这会让你的整个地形变成黑色。
    
    ![Image of applying the Landscape Material to the Landscape Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b44e1790-75e0-46b5-954a-cb6f9fa73dcb/landscape_applied_material.png)
2.  要解决此问题，你需要添加一些 **图层信息（Layer Info）** 到地形Actor。在本例中，你需要为全部三个图层各创建一个 **图层信息**。如需阅读关于 **图层信息** 对象的更多内容，请参阅[图层信息对象](/documentation/zh-cn/unreal-engine/landscape-paint-mode-in-unreal-engine#%E5%9B%BE%E5%B1%82%E4%BF%A1%E6%81%AF%E5%AF%B9%E8%B1%A1)页面。
    
    ![Image of Creating the Landscape Layer Info objects](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2df9d2bb-e482-4d4b-8bfc-4ae3d41cdf40/landscape_create_layer.png)
3.  操作完成后，地形面板中的 **目标图层（Target Layer）** 部分应与下图类似。
    
    ![Image showing all Layer Info objects in the Target Layers section of the Landscape panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/441f567a-484c-4597-8585-96fdb49cb9b9/landscape_target_layers.png)
4.  现在可以导入自定义图层了。右键点击选中的 **目标图层**，然后在弹出的菜单中选择 **从文件导入（Import from file** 选项，再从出现的对话框中选择需要包含自定义图层数据的.PNG或.RAW文件。自定义图层文件的分辨率应与你创建地形Actor时设置的 **整体分辨率（Overall Resolution）** 保持一致（默认为505 x 505）。
    
    ![Image of Importing custom layer data from file](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ea9df50-3fbd-4c10-a9ae-ea5ef83e8b03/landscape_import_layer_option.png)
5.  如果图层未以正确的尺寸输出，将出现以下警告：
    
    ![Image of Layer size warning](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32d6fe2d-4dc0-43b7-9117-741f0523f42f/landscape_layer_import_error.png)
    
    要修复此问题，请返回你的图片编辑软件，重新调整文件尺寸，使其与警告信息中显示的正确地形尺寸保持一致。
    

## 高度图

为了加快地形创建进程，使用第三方工具创建可在UE4中使用的基础高度图是一个很好的方法。World Machine和Terragen之类的软件都可以为你的地形快速创建基础高度图。之后即可使用虚幻编辑器中的编辑工具来导入、清理或修改它，使其与世界场景和所需的游戏玩法更为相符。

关于导入和导出高度图的更多详情，请参阅[导入和导出高度图](/documentation/zh-cn/unreal-engine/importing-and-exporting-landscape-heightmaps-in-unreal-engine)一文。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [图层](/documentation/zh-cn/unreal-engine/creating-and-using-custom-heightmaps-and-layers-in-unreal-engine#%E5%9B%BE%E5%B1%82)
-   [图层格式](/documentation/zh-cn/unreal-engine/creating-and-using-custom-heightmaps-and-layers-in-unreal-engine#%E5%9B%BE%E5%B1%82%E6%A0%BC%E5%BC%8F)
-   [图层导入](/documentation/zh-cn/unreal-engine/creating-and-using-custom-heightmaps-and-layers-in-unreal-engine#%E5%9B%BE%E5%B1%82%E5%AF%BC%E5%85%A5)
-   [高度图](/documentation/zh-cn/unreal-engine/creating-and-using-custom-heightmaps-and-layers-in-unreal-engine#%E9%AB%98%E5%BA%A6%E5%9B%BE)

相关文档

[

编辑地形

![编辑地形](https://dev.epicgames.com/community/api/documentation/image/f04817e4-099b-49ed-92b0-8d158103c771?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/editing-landscapes-in-unreal-engine)

[

地形绘制模式

![地形绘制模式](https://dev.epicgames.com/community/api/documentation/image/d9069e87-5daf-4bcf-a02e-71125be3b10f?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/landscape-paint-mode-in-unreal-engine)

[

创建地形

![创建地形](https://dev.epicgames.com/community/api/documentation/image/ff2279a8-0b1c-4abf-a40e-898f8b3a4c8d?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/creating-landscapes-in-unreal-engine)
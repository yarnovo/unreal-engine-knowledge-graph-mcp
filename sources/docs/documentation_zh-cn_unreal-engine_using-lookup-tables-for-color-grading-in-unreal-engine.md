# 使用虚幻引擎查找表（LUT）进行颜色校正 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-lookup-tables-for-color-grading-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:22:04.994Z

---

目录

![使用查找表（LUT）进行颜色校正](https://dev.epicgames.com/community/api/documentation/image/1d0ca62d-700e-411c-858c-3d718a3eb283?resizing_type=fill&width=1920&height=335)

可以利用**查找表**（LUT）来实现使用后期处理体积的颜色校正。 不要使用三个一维（1D）查找表，而应该使用一个三维（3D）查找表。 这样可以提供 更精细的色彩变换，从而可用于去饱和度之类的用途。

[![中性LUT](https://dev.epicgames.com/community/api/documentation/image/51a634e6-ac38-45c1-b5e6-fed9e71502dd?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/51a634e6-ac38-45c1-b5e6-fed9e71502dd?resizing_type=fit)

[![棕褐色调LUT](https://dev.epicgames.com/community/api/documentation/image/7ed5518a-8023-4308-a6eb-52e08be21662?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/7ed5518a-8023-4308-a6eb-52e08be21662?resizing_type=fit)

中性色调LUT

棕褐色调LUT

虚幻引擎中使用的一种查找表是16x16x16的中性色调LUT，解压后为256x16的纹理。 这些示例显示了中性色调和棕褐色调的LUT。 如果要应用中性色调LUT，你将不会看到默认场景有任何变化，但是如果使用棕褐色调的LUT，就会看到类似于下图这样的情况：

![中性色调LUT](https://dev.epicgames.com/community/api/documentation/image/146df8a8-8f6c-454b-b529-f924cc269f42?resizing_type=fit&width=1920&height=1080)

![棕褐色调LUT](https://dev.epicgames.com/community/api/documentation/image/3d6f361d-0db4-4767-b3cb-d56a6c7eef32?resizing_type=fit&width=1920&height=1080)

中性色调LUT

棕褐色调LUT

## 使用LUT纹理

要使用LUT，请使用下列属性将LUT纹理分配到要搭配它使用的后期处理体积并调整它的强度。

属性

说明

**颜色分级LUT强度（Color Grading LUT Intensity）**

控制色彩修正效果的换算系数。

**颜色分级LUT（Color Grading LUT）**

用于色彩修正查找表的LUT纹理。 [详见下方示例。](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-lookup-tables-for-color-grading-in-unreal-engine)

#### 颜色分级查询表

[![中性色调场景](https://dev.epicgames.com/community/api/documentation/image/962492b3-5535-4fa9-9f2a-cf1baef6ad84?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/962492b3-5535-4fa9-9f2a-cf1baef6ad84?resizing_type=fit)

*点击查看大图。*

[![偏绿场景](https://dev.epicgames.com/community/api/documentation/image/66370b43-364a-4846-8eb7-5728d45d1000?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/66370b43-364a-4846-8eb7-5728d45d1000?resizing_type=fit)

*点击查看大图。*

[![偏红场景](https://dev.epicgames.com/community/api/documentation/image/a45fa72e-e11e-4534-bb10-cc10cfa5f93b?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/a45fa72e-e11e-4534-bb10-cc10cfa5f93b?resizing_type=fit)

*点击查看大图。*

[![中性LUT](https://dev.epicgames.com/community/api/documentation/image/b60dc390-dfde-4642-aa35-5368530d33a9?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/b60dc390-dfde-4642-aa35-5368530d33a9?resizing_type=fit)

[![偏绿LUT](https://dev.epicgames.com/community/api/documentation/image/0737e193-3a3e-45d4-9f2a-bc681a8f2e06?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/0737e193-3a3e-45d4-9f2a-bc681a8f2e06?resizing_type=fit)

[![偏红LUT](https://dev.epicgames.com/community/api/documentation/image/fcec0305-b246-4a45-a939-34c21fa88b85?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/fcec0305-b246-4a45-a939-34c21fa88b85?resizing_type=fit)

## 创建自定义LUT纹理

要创建你自己的LUT纹理，首先需要一个能够对捕获的图像进行颜色调整的图像编辑应用程序（例如Photoshop或GIMP）。 在这个演示中， 我们将使用由Epic Games启动程序**学习（Learn）**选项卡中提供的**Sun Temple**项目，并选择Photoshop作为LUT图像编辑应用程序。 本示例中使用的某些术语 可能是Photoshop特有的。

1.  首先对你也要应用颜色校正的场景截取至少一张有代表性的屏幕截图。 可以使用编辑器中提供的 截图工具来截取场景的高分辨率图像。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/62159cc2-07bd-422a-9e19-848ad970dbb8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/62159cc2-07bd-422a-9e19-848ad970dbb8?resizing_type=fit)
    
2.  在Photoshop中打开该截图，然后从右侧图层（Layers）面板上方的调整（Adjustments）选项卡添加你自己的**调整**图层。 在这里可以找到许多不同的图标，分别代表可以对图像执行的各种更改类型，例如亮度和对比度、色调、饱和度，等等。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/2965672b-7fab-4535-9639-32c71c3a1771?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/2965672b-7fab-4535-9639-32c71c3a1771?resizing_type=fit)
    
    *点击查看大图。*
    
3.  在**调整（Adjustments）**面板中，点击任意图标以向图层（Layers）面板添加图层。 可以使用这些图层对最终图像作特定的颜色校正。 在此示例中， 我们添加并调整了**自然饱和度（Vibrance）**和**亮度/对比度（Brightness/Contrasts）**。 将图层添加到图层（Layers）面板之后，从列表中选择这些图层以公开它们的属性，如果 看不到属性，可以右键点击并选择**编辑调整（Edit Adjustment）**来将其公开。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/00d0ccd0-2f39-4120-8aaf-bc1adc317773?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/00d0ccd0-2f39-4120-8aaf-bc1adc317773?resizing_type=fit)
    
4.  你进行的任何调整都可以显示在视口中。 请调整调整图层的属性，直到获得想要的颜色校正效果为止。 在下方示例中， 自然饱和度（Vibrance）和亮度/对比度（Brightness/Contrasts）的调整图层属性已经被调整过了，这让截图的颜色饱和度和清晰度更高，更有视觉吸引力。
    
    ![前](https://dev.epicgames.com/community/api/documentation/image/c5082dbb-a9c7-43cc-9945-842d75541b92?resizing_type=fit&width=1920&height=1080)
    
    ![后](https://dev.epicgames.com/community/api/documentation/image/9367ec8f-acb5-4d7c-9c76-a5d836843962?resizing_type=fit&width=1920&height=1080)
    
    前
    
    后
    
5.  现在你已经通过调整图层实现了所需的视觉效果，需要另外打开**中性色调LUT**的一个副本。 可以将为屏幕截图创建的调整图层拖动到该中性色调LUT上。
    
    如果没有可用的中性色调LUT，可以使用本页面引言部分显示的RGBTable16x1.png图像。 右键点击[LUT纹理示例压缩文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/3e919734-8431-4ed4-bf84-d49c925e2498/neutral-color-lut-example.zip)并选择**另存为（Save as）**。
    
    打开带有调整图层的截图和中性色调LUT后，将调整图层从截图的图层（Layers）面板**拖放**到中性色调LUT图像上。 此时你应该会看到它们填充在LUT的图层（Layers）面板中。
    
6.  现在，前往**文件（File）** > **另存为（Save As）**，为经过颜色校正的LUT命名。
    
7.  将经过颜色校正的LUT导入编辑器中，你可以将其**拖放**到内容浏览器中，也可以使用内容浏览器中的**导入（Import）**按钮。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/9ec0ac5b-e795-4061-88c7-4cdc3d12c796?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9ec0ac5b-e795-4061-88c7-4cdc3d12c796?resizing_type=fit)
    
8.  要在后期处理体积中使用LUT获得最佳效果，在纹理编辑器（Texture Editor）中打开LUT图像，设置下列属性：
    
    [![](https://dev.epicgames.com/community/api/documentation/image/32e85a70-9ddb-49ef-8a0a-2034fd61275e?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/32e85a70-9ddb-49ef-8a0a-2034fd61275e?resizing_type=fit)
    
    -   Mip生成设置（Mip Gen Settings）：**NoMipMaps**
        
    -   纹理组（Texture Group）：**颜色查找表（Color Lookup Table）**
        
    
9.  接下来，在后期处理体积（Post Process Volume）中，使用**细节（Details）**面板，转到**颜色分级（Color Grading）** > **全局（Global）**分段，启用**颜色分级LUT（Color Grading LUT）**并应用你的LUT。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/eaa6d28b-fad2-436a-a5ae-6e6e0d278daa?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/eaa6d28b-fad2-436a-a5ae-6e6e0d278daa?resizing_type=fit)
    
    ![默认（Default）](https://dev.epicgames.com/community/api/documentation/image/fe5c9e88-cb8c-4ee1-a997-886d2fc178b2?resizing_type=fit&width=1920&height=1080)
    
    ![有创建的LUT](https://dev.epicgames.com/community/api/documentation/image/88d8cf27-6393-4f71-8030-d45e0d34d249?resizing_type=fit&width=1920&height=1080)
    
    默认（Default）
    
    有创建的LUT
    

## 其他说明

以下是在项目中使用LUT时应该了解的知识：

-   因为LUT发生在低动态范围（LDR）中，并且在sRGB空间中输出到显示器的最终图像颜色上，所以它只是与显示器支持对应的一张适时快照，不一定在它输出到的所有显示器上都呈现相同外观。这就不同于[高动态范围](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/high-dynamic-range-display-output-in-unreal-engine)（HDR），后者的处理方式使所有颜色校正都发生在色调映射之前。 因此，建议使用虚幻引擎4.16和更高版本中提供的最新版[颜色分级](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/color-grading-and-the-filmic-tonemapper-in-unreal-engine)颜色校正工具来取代LUT。
    
-   LUT可能是在你的当前显示器上为项目快速定位特定外观的好方法，但你在此后应该使用后期处理体积（Post Process Volume）**颜色分级（Color Grading）**分段下的颜色校正属性进行最终调整，以确保不同类型显示器上的外观都一致。
    
-   使用LUT时会丢失一致性，因为发生的任何颜色校正都不适用于HDR显示。 后期处理体积中的颜色分级属性都在所谓的**场景引用线性空间**中运算。 这意味着颜色是一致的，因为它们发生在色调映射之前，也发生在变换为特定显示器的颜色空间之前。 例如，如果要输出到使用Rec709而不是sRGB的电视机，在使用LUT的情况下颜色校正效果就不会呈现在该电视机上，因为颜色校正发生在图像已经输出到显示器之后。 因此，我们正在淘汰作为颜色校正图像处理方法的LUT。
    

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [post process](https://dev.epicgames.com/community/search?query=post%20process)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用LUT纹理](/documentation/zh-cn/unreal-engine/using-lookup-tables-for-color-grading-in-unreal-engine#using-a-lut-texture)
-   [颜色分级查询表](/documentation/zh-cn/unreal-engine/using-lookup-tables-for-color-grading-in-unreal-engine#color-grading-lut)
-   [创建自定义LUT纹理](/documentation/zh-cn/unreal-engine/using-lookup-tables-for-color-grading-in-unreal-engine#creating-your-own-lut-texture)
-   [其他说明](/documentation/zh-cn/unreal-engine/using-lookup-tables-for-color-grading-in-unreal-engine#additional-notes)
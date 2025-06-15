# 在虚幻引擎中的Composure中使用OpenColorIO转换颜色 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/converting-colors-in-composure-with-opencolorio-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:28:25.850Z

---

目录

![在Composure中使用OpenColorIO转换颜色](https://dev.epicgames.com/community/api/documentation/image/515b938a-974c-481f-a49d-b85dd88b1ecf?resizing_type=fill&width=1920&height=335)

本文介绍了如何在[Composure](/documentation/zh-cn/unreal-engine/real-time-compositing-with-composure-in-unreal-engine)中，将[OpenColorIO](/documentation/zh-cn/unreal-engine/color-management-with-opencolorio-in-unreal-engine) (**OCIO**)颜色转换应用至输入和输出媒体。

## 先决条件

你必须在项目中设置以下内容才能完成后续内容：

-   一个 **OpenColorIO配置资产（OpenColorIO Configuration Asset）** 。请参阅[OpenColorIO快速入门](/documentation/zh-cn/unreal-engine/opencolorio-quick-start-for-unreal-engine)了解创建此资产的步骤。
    
-   含有效 **媒体源（Media Source）** 和 **输出（Output）** 的 **Composure元素（Composure Element）** 。请参阅[实时合成快速入门](/documentation/zh-cn/unreal-engine/real-time-compositing-quick-start-for-unreal-engine)了解设置这些要素的步骤。
    

## 在Composure中转换媒体元素

此过程旨在说明如何为Composure元素创建新的 **变换通道（Transform Pass）** ，以及如何设置该变换通道，以便将元素媒体源的颜色空间从一种颜色配置文件转换为另一种。

1.  在 **大纲视图（Outliner）** 中，选择 **Composure元素（Composure Element）** 以打开其 **细节（Detail）** 面板。
    
2.  在 **细节（Detail）** 面板中的 **Composure > 变换/合成通道（Transform/Compositing Passes）** 分段下，点击 **添加(+)（Add (+)）** 添加新的变换通道条目。
    
    ![添加新变换通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56bf76c5-8abe-4d95-9cb9-6f72ac68b6ac/add-new-transform-pass.png)
3.  在新 **变换通道（Transform Pass）** 的设置中，打开 **下拉菜单**，然后从列表中选择 **OpenColorIO通道（OpenColorIO Pass）** 。
    
    ![将变换通道设置为OpenColorIO通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b590eb03-4619-4c6c-94ae-89bb746d8648/set-opencolorio-pass.png)
4.  展开你的 **变换通道（Transform Pass）** 的设置，然后展开其 **颜色转换设置（Color Conversion Settings）** 。
    
    ![展开颜色转换设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63595e8a-a8db-421c-b3fd-222d25d2c1d4/expand-color-conversion-settings.png)
5.  在颜色转换设置（Color Conversion Settings）下：
    
    1.  将 **配置源（Configuration Source）** 参数设置为指向 **OpenColorIO配置资产（OpenColorIO Configuration Asset）** 。
        
    2.  将 **源颜色空间（Source Color Space）** 参数设置为作为转换源的颜色配置文件。这通常是最初捕获媒体源的颜色空间。
        
    3.  将 **目标颜色空间（Destination Color Space）** 参数设置为要转换到的颜色配置文件。通常情况下，你可能需要使用 **线性** 颜色空间，以便媒体与虚幻引擎中使用的线性颜色空间相匹配。
        
    4.  勾选 **启用（Enabled）** 设置。
        
    
    ![设置颜色转换设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5de07b08-40e1-4bed-8b60-38050e731b2a/set-color-conversion-settings.png)
6.  为变换通道设置了源和目标颜色空间后，你立刻可以在Composure元素预览和关卡视口中看到媒体源中的颜色发生变化。
    

## 在Composure中转换媒体输出

此过程展示了如何使用新的色彩校正通道设置Composure的输出，该通道将合成媒体的颜色从一个OCIO颜色配置文件转换为另一个。

1.  在 **大纲视图（Outliner）** 中，选择 **Composure元素（Composure Element）** 以打开其 **细节（Detail）** 面板。
    
2.  在 **细节（Detail）** 面板中的 **Composure > 输出（Output）** 下 ，展开 **输出通道（Output Pass）** 。
    
    ![展开输出通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c592422e-95d3-43af-8b95-c641eed4fdd3/expand-output-pass.png)
3.  在新 **输出通道（Output Pass）** 的设置中，打开 **下拉菜单**，然后从列表中选择 **OpenColorIO通道（OpenColorIO Pass）** 。
    
    ![将输出通道设置为OpenColorIO通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/221e25ea-97cf-4e78-8fd3-966a7c2a2c40/set-opencolorio-output-pass.png)
4.  展开 **输出通道（Output Pass）** 的 **颜色转换（Color Conversion）** **设置（Settings）** 。在颜色转换设置（Color Conversion Settings）下：
    
    1.  将 **配置源（Configuration Source）** 参数设置为指向 **OpenColorIO配置资产（OpenColorIO Configuration Asset）** 。
        
    2.  将 **源颜色空间（Source Color Space）** 参数设置为作为转换源的颜色配置文件。通常情况下，你可能需要使用 **线性** 颜色空间，以便媒体与虚幻引擎中使用的线性颜色空间相匹配。
        
    3.  将 **目标颜色空间（Destination Color Space）** 参数设置为要转换到的颜色配置文件。通常情况下，你可能需要匹配监控器所使用的颜色空间才能显示结果，或者匹配你需要的另一个目标颜色空间。
        
    4.  开启 **启用（Enabled）** 设置。
        
    
    ![设置颜色转换设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fc374b5-0a96-4e0d-838b-cfdec0d4ea2d/set-color-conversion-settings.png)
5.  在显示合成媒体时，颜色会发生变化。
    

-   [vfx](https://dev.epicgames.com/community/search?query=vfx)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/converting-colors-in-composure-with-opencolorio-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [在Composure中转换媒体元素](/documentation/zh-cn/unreal-engine/converting-colors-in-composure-with-opencolorio-in-unreal-engine#%E5%9C%A8composure%E4%B8%AD%E8%BD%AC%E6%8D%A2%E5%AA%92%E4%BD%93%E5%85%83%E7%B4%A0)
-   [在Composure中转换媒体输出](/documentation/zh-cn/unreal-engine/converting-colors-in-composure-with-opencolorio-in-unreal-engine#%E5%9C%A8composure%E4%B8%AD%E8%BD%AC%E6%8D%A2%E5%AA%92%E4%BD%93%E8%BE%93%E5%87%BA)
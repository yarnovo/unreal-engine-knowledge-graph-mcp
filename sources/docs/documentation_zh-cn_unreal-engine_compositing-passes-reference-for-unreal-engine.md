# 虚幻引擎合成通道参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/compositing-passes-reference-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:28:50.562Z

---

目录

![合成通道参考](https://dev.epicgames.com/community/api/documentation/image/7ecbee59-b3c8-486d-b0fb-2eb2d5c25a27?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

合成通道是属于合成元素的对象。通道是渲染元素时执行的单个步骤，并按顺序运行。

有3种合成通道类型：

-   输入
    
-   变换
    
-   输出
    

![](01-composure-refrences.png. "01-composure-refrences.png")

多数通道负责渲染图像。对输入和变换而言，这些图像可用于后续的通道，并可在渲染材质时引用。

## 可设蓝图

通道可以设置蓝图，因此您可以轻松地创建自己的通道，并将其结合合成系统一起使用。只需创建蓝图，并从 **CompositingElementInput\*、**CompositingElementTransform **或** CompositingElementOutput\*\* 继承即可。

## 共享设置

每个通道自身皆有一套属性，但每个通道均共享下列属性：

属性

描述

**启用（Enabled）**

和元素一样，单个通道可被禁用。关闭时，元素的行为将把通道视为不存在。

**通道名称（Pass Name）**

通道拥有名称，以便被其他后续通道引用。如果要在渲染材质中引用通道，则必须对其进行唯一命名。

**中间（Intermediate）**

将对每个渲染通道分配一个渲染目标。默认情况下，其假定您只需要通过下个通道获得该结果。之后，为了节约渲染资源，它释放它的渲染目标，以便它可被另一个通道使用。如果需要更长时间访问通道的结果，请取消勾选此框。

## 输入

### 媒体纹理输入

本通道负责将视频输入到合成系统中。它需要媒体纹理来引用。其媒体源通过通道的材质来进行处理。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40670779-9032-483c-aa21-17e6de99a71e/02-media-texture-compositing-input.png "02-media-texture-compositing-input.png")

没有 **媒体源**，媒体通道将为空。但是，您可以在游戏配置文件中设置一个默认静止图像：`[/Script/Composure.ComposureGameSettings] StaticVideoPlateDebugImage="/Game/Path/To/My/TextureAsset"`

### 纹理输入

本通道为您提供了一个将源静态纹理导入合成系统的简单方法。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70b5e771-d1c9-4acb-97df-058c2df4eae0/03-texture-input.png "03-texture-input.png")

## 变换

变换负责获取输入图像并输出处理后的图像。传统意义上，这是进行合成的地方——引用子元素并对其进行组合的材质通道。

### 自定义材质通道

此通道允许用户编写自定义材质，在该材质中可以引用其他元素/通道。这是合成系统的主要部分。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0dd45b4a-4bfb-4412-8c20-b153efe0cee0/04-compositing-element-material-pass.png "04-compositing-element-material-pass.png")

### 后期处理通道集

此通道在之前的通道上应用一组后期处理效果（如果是第一个通道，则无法进行操作）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3767cdb2-cdce-4c69-af26-6b342c8fcdd0/05-compositing-post-process-past.png "05-compositing-post-process-past.png")

只有某些效果可用（泛光和色调映射）。用户可以创建 **ComposurePostProcessPassPolicy** 子类来创建更多效果。

### 色调映射

本通道在前一个通道上应用完成的后期处理色调映射。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/256b6b54-9e73-403c-a995-c3b7f08bca09/06-compositing-tonemap-pass.png "06-compositing-tonemap-pass.png")

这有助于将图像从线性色彩空间转换回图像。它可用作预览变换，或用于输出通道（中间材质操作需要线性颜色）。

### 多通道色度镶迭器

**媒体板元素** 使用此通道来镶迭图像。 **镶迭颜色（Key Colors）** 属性指定要变为透明的颜色。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09833776-e3e5-4046-a344-a7e3efd78c71/07-multi-pass-chroma-keyer.png "07-multi-pass-chroma-keyer.png")

如果需要，您可以使用 **所需材质参数（Required Material Parameters）** 域中列出的参数来为您自己的色度镶迭器切换出材质。

此通道运行多次，每种镶迭颜色运行一次。

### 多通道防溢出

此通道可消除图像中的色度反弹（绿屏上的"溢出"）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d71250d-ac56-43d3-8a1d-09a4d625599a/08-multi-pass-despill.png "08-multi-pass-despill.png")

和 **色度镶迭器通道** 一样，可以指定要删除的 **镶迭颜色**。也和 **色度镶迭器通道** 一样，此通道运行多次——每个镶迭运行一次。您可以为自己的防溢出进程切换出材质（它只需要"所需材质参数"域中列出的参数）。

您可以在\[此博文\]（https://www.unrealengine.com/en-US/blog/setup-a-chroma-key-material-in-ue4）中找到更多关于色度镶迭和防溢出更多信息。

## 输出

输出通道定义一个目的地，以便元素的全处理图像能广播到此。部分输出在转存图像之前将执行其自身的变换。

### 媒体采集

此通道将元素的结果转存到媒体采集目标。**采集输出（Capture Output）** 域需要媒体输出资源，这是一个配置文件，详细说明将图像转存到何处（采集卡、端口ID、像素格式等）。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6dea1e7a-6e76-4533-8efd-a2fa7c1a29d2/10-compositing-media-capture-output.png "10-compositing-media-capture-output.png")

此通道拥有与之关联的 **颜色转换** 变换，此变换在输出图像之前运行。

### 图像序列

此通道将为元素渲染的每个帧将.EXR图像文件保存到硬盘驱动中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/100e3156-fe41-4490-87cc-1989b68b9556/11-exrfile-compositing-output.png "11-exrfile-compositing-output.png")

一旦拥有 **输出目录** 后，此通道就会开始写出图像（每帧一张图像）。如要进行更多控制，请先禁用此通道。

### 玩家视口

使用此通道可接管玩家在游戏中的视口，并将显示替换为元素的结果。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c8e0120-7d4f-4aed-94a7-371f9b7cef3d/12-player-viewport-compositing-output.png "12-player-viewport-compositing-output.png")

此通道拥有与其相关联的 **颜色转换** 变换，其在显示图像之前运行。在编辑器中运行来查看它的操作。

### 渲染目标资源

此通道将把元素的结果写入到渲染目标。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa439f29-52f9-4a4c-9c18-4ae4a95c4751/13-render-target-compositing-output.png "13-render-target-compositing-output.png")

使用 **渲染目标（Render Target）** 域来指定哪些资源。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [reference](https://dev.epicgames.com/community/search?query=reference)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [可设蓝图](/documentation/zh-cn/unreal-engine/compositing-passes-reference-for-unreal-engine#%E5%8F%AF%E8%AE%BE%E8%93%9D%E5%9B%BE)
-   [共享设置](/documentation/zh-cn/unreal-engine/compositing-passes-reference-for-unreal-engine#%E5%85%B1%E4%BA%AB%E8%AE%BE%E7%BD%AE)
-   [输入](/documentation/zh-cn/unreal-engine/compositing-passes-reference-for-unreal-engine#%E8%BE%93%E5%85%A5)
-   [媒体纹理输入](/documentation/zh-cn/unreal-engine/compositing-passes-reference-for-unreal-engine#%E5%AA%92%E4%BD%93%E7%BA%B9%E7%90%86%E8%BE%93%E5%85%A5)
-   [纹理输入](/documentation/zh-cn/unreal-engine/compositing-passes-reference-for-unreal-engine#%E7%BA%B9%E7%90%86%E8%BE%93%E5%85%A5)
-   [变换](/documentation/zh-cn/unreal-engine/compositing-passes-reference-for-unreal-engine#%E5%8F%98%E6%8D%A2)
-   [自定义材质通道](/documentation/zh-cn/unreal-engine/compositing-passes-reference-for-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%9D%90%E8%B4%A8%E9%80%9A%E9%81%93)
-   [后期处理通道集](/documentation/zh-cn/unreal-engine/compositing-passes-reference-for-unreal-engine#%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E9%80%9A%E9%81%93%E9%9B%86)
-   [色调映射](/documentation/zh-cn/unreal-engine/compositing-passes-reference-for-unreal-engine#%E8%89%B2%E8%B0%83%E6%98%A0%E5%B0%84)
-   [多通道色度镶迭器](/documentation/zh-cn/unreal-engine/compositing-passes-reference-for-unreal-engine#%E5%A4%9A%E9%80%9A%E9%81%93%E8%89%B2%E5%BA%A6%E9%95%B6%E8%BF%AD%E5%99%A8)
-   [多通道防溢出](/documentation/zh-cn/unreal-engine/compositing-passes-reference-for-unreal-engine#%E5%A4%9A%E9%80%9A%E9%81%93%E9%98%B2%E6%BA%A2%E5%87%BA)
-   [输出](/documentation/zh-cn/unreal-engine/compositing-passes-reference-for-unreal-engine#%E8%BE%93%E5%87%BA)
-   [媒体采集](/documentation/zh-cn/unreal-engine/compositing-passes-reference-for-unreal-engine#%E5%AA%92%E4%BD%93%E9%87%87%E9%9B%86)
-   [图像序列](/documentation/zh-cn/unreal-engine/compositing-passes-reference-for-unreal-engine#%E5%9B%BE%E5%83%8F%E5%BA%8F%E5%88%97)
-   [玩家视口](/documentation/zh-cn/unreal-engine/compositing-passes-reference-for-unreal-engine#%E7%8E%A9%E5%AE%B6%E8%A7%86%E5%8F%A3)
-   [渲染目标资源](/documentation/zh-cn/unreal-engine/compositing-passes-reference-for-unreal-engine#%E6%B8%B2%E6%9F%93%E7%9B%AE%E6%A0%87%E8%B5%84%E6%BA%90)
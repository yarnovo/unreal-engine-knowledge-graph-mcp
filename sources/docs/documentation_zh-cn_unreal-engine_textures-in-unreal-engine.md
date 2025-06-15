# 虚幻引擎中的纹理贴图 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/textures-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:25:03.781Z

---

目录

![纹理](https://dev.epicgames.com/community/api/documentation/image/d5281c83-0af7-4361-b5bf-38c6c5a1f144?resizing_type=fill&width=1920&height=335)

纹理是一种主要用于材质的图像资产，但也能用于其他地方，比如用作HUD的纹理。

纹理映射在材质表面上。纹理可以作为材质的输入参数，直接参与材质的各种计算，例如作为基础颜色的输入参数、用作遮罩，或使用其自带的RGBA值。

材质可能会用到多种纹理，实现多种目的。例如，一个普通材质可能用到基础颜色纹理、高光纹理，以及法线纹理。此外，还可能有一张纹理用于自发光颜色和粗糙度（数值保存在纹理的alpha通道中）。通过将多类数值打包在同一张纹理中，有助于降低绘制调用次数，减少磁盘空间。

## 导入纹理

纹理可以通过 **导入** 按钮或直接拖入的方式（将图片从系统浏览器中直接拖入）导入到 **内容浏览器（Content Browser）** 中。

虚幻引擎支持多种图像格式（文件类型）：

-   .bmp
-   .float
-   .jpeg
-   .jpg
-   .pcx
-   .png
-   .psd
-   .tga
-   .dds (Cubemap or 2D)
-   .exr (HDR)
-   .tif (TIFF)
-   .tiff (TIFF)

在导入纹理时，请注意纹理尺寸存在以下要求：

-   纹理尺寸尽可能是2的平方（2的幂），例如 32、64、128、2048 等。
    -   纹理尺寸是2的幂时，纹理可以生成Mipmap，可以被流送。否则无法流送且无法生成Mipmap。
-   某些 GPU 能够支持的纹理尺寸存在上限。例如，一些GPU可能无法支持超过 8192 （8K）像素的纹理。

## 纹理图表编辑器

**纹理图表编辑器** 提供基于节点的界面，供美术师用程序化的方法在虚幻引擎中创建和编辑纹理。

![Texture Graph Editor in Unreal Engine](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28f7eea6-c066-40e9-9f51-483212c2fd57/main-graph-view.png)

你可以将纹理图表和蓝图、材质及材质函数结合使用，形成只有在虚幻引擎中才能实现的独特工作流程。该编辑器可以与纹理材质编辑器一起使用，后者为纹理资产的管理提供了额外的控制功能。

更多详情，请参阅[纹理图表入门](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine)。

## 纹理资产编辑器

**纹理资产编辑器** 是一个独立窗口，可以查看和编辑纹理资产。

![纹理资产编辑器界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19cff203-6fb5-4525-96c1-f9ea86965bf3/texture-asset-editor.png)

在编辑器窗口中，你可以查看纹理和它的颜色通道。细节面板会显示纹理的额外信息，以及一组可配置的属性，例如设置压缩格式，调整亮度和饱和度，设置其细节水平等。

更多详情请参见[纹理资产编辑器](/documentation/zh-cn/unreal-engine/texture-asset-editor-in-unreal-engine)。

## 纹理流程和优化

下述话题详细介绍了项目中涉及纹理的一些常见流程和优化措施。

[](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine)

[![Getting started with Texture Graph](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2616c545-1853-411a-987f-815108ad2a30/topic.png)](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine)

[Getting started with Texture Graph](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine)

[Fundamentals of the Texture Graph Editor and asset to procedurally create and edit textures.](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine)

[

![纹理编辑器界面](images/static/document_list/empty_thumbnail.svg)

纹理编辑器界面

介绍纹理编辑器的用户界面。





](/documentation/zh-cn/unreal-engine/texture-asset-editor-in-unreal-engine)[

![支持的纹理格式和设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/942b7408-387d-499e-a748-423c9f10aaef/placeholder_topic.png)

支持的纹理格式和设置

介绍支持的纹理格式、纹理类型及其配置。





](/documentation/zh-cn/unreal-engine/texture-format-support-and-settings-in-unreal-engine)[

![纹理流送](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca3f3595-51b3-4854-9fee-e837fe9dd0d9/overview_topic.png)

纹理流送

用于在运行时在内存中加载和卸载纹理的系统。





](/documentation/zh-cn/unreal-engine/texture-streaming-in-unreal-engine)[

![虚拟纹理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cceadf8a-945f-430d-bc49-d001aae1aab1/vt_hero.png)

虚拟纹理

介绍虚幻引擎中虚拟纹理的使用方法。





](/documentation/zh-cn/unreal-engine/virtual-texturing-in-unreal-engine)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [textures](https://dev.epicgames.com/community/search?query=textures)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [导入纹理](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine#%E5%AF%BC%E5%85%A5%E7%BA%B9%E7%90%86)
-   [纹理图表编辑器](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine#%E7%BA%B9%E7%90%86%E5%9B%BE%E8%A1%A8%E7%BC%96%E8%BE%91%E5%99%A8)
-   [纹理资产编辑器](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine#%E7%BA%B9%E7%90%86%E8%B5%84%E4%BA%A7%E7%BC%96%E8%BE%91%E5%99%A8)
-   [纹理流程和优化](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine#%E7%BA%B9%E7%90%86%E6%B5%81%E7%A8%8B%E5%92%8C%E4%BC%98%E5%8C%96)
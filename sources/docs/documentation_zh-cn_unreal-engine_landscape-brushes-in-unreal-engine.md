# 虚幻引擎地形笔刷 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-brushes-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:12:01.714Z

---

目录

![地形笔刷](https://dev.epicgames.com/community/api/documentation/image/678d9488-d2b1-435f-b8a1-56af09cb922f?resizing_type=fill&width=1920&height=335)

**地形（Landscape）** 工具的笔刷定义了地形区域（其将受雕刻或绘制的影响）的形状和大小。笔刷可拥有不同形状、大小和衰减。对曾经使用过Photoshop等图像编辑软件的人来说，笔刷工具并不会让他们感到陌生。

可在地形工具栏的 **雕刻** 或 **绘制** 标签页中设置笔刷类型和衰减。地形面板中也可以调整设置。

![Brush Settings Toolbar](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be512269-4700-4504-a3d8-1c83898b5faa/01-brush-settings-toolbar.png "Brush Settings Toolbar") ![Brush Settingsin the Landscape Panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88926748-e673-4a91-af83-0b54a3baa465/02-brush-settingsin-the-landscape-panel.png "Brush Settingsin the Landscape Panel")

Property

Description

**笔刷尺寸**

决定着笔刷的尺寸（按虚幻单位计，含衰减）。在此区域中，笔刷将至少拥有一些效果。

**笔刷衰减**

决定了衰减开始处笔刷范围的百分比。本质上来说，它决定着笔刷边缘的硬度。0.0的衰减意味着笔刷拥有硬边，整体皆拥有完整的效果。1.0的衰减意味着笔刷只在中心拥有完整效果，效果将从其所在的整个区域到边缘逐渐减弱。

**使用泥浆笔刷**

泥浆笔刷可以用一种有机的、叠加的方法雕刻地形，类似使用数字泥浆。选中后，就可使用泥浆笔刷。

当前笔刷的尺寸和衰减在视口中显示为一对同心圆。

![Falloff of 0.0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1aa75073-39bd-4362-8421-9c1402a60139/03-falloff-0-0.png "Falloff of 0.0")

![Falloff of 0.5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cf800c2-068e-4d51-91e6-5fe2025715e6/04-falloff-0-5.png "Falloff of 0.5")

![Falloff of 1.0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67467e16-140e-4cf1-800e-2a23f0ac7407/05-falloff-1-0.png "Falloff of 1.0")

衰减：0.0

衰减：0.5

衰减：1.0

## 圆

![Circle Brush](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fdb24ea4-346d-4088-9dd9-b265cafdcd9b/06-circle-brush.png "Circle Brush")

**圆** 笔刷在一个圆形区域中应用当前的工具，带数字和类型两者定义的衰减。

![Circle Brush in use](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77ca0e6c-c5d6-4445-9aeb-297bf46601e8/07-circle-brush-in-use.png "Circle Brush in use")

### 圆笔刷衰减类型

图标

类型

描述

![Smooth Falloff](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98ef9838-6fb4-4484-a021-aa8c08e7dc3c/08-smooth-falloff.png "Smooth Falloff")

**平滑**

线性衰减已被平滑，磨圆衰减开始和结束的锐边。

![Linear Falloff](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/037129e5-2f1e-4a3e-b499-83c2b939fda9/09-linear-falloff.png "Linear Falloff")

**线性**

锐利的线性衰减，不带磨圆的边。

![Spherical Falloff](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc09a200-8f2d-4521-a6eb-7bfc035a283d/10-spherical-falloff.png "Spherical Falloff")

**球形**

头端平滑而末端锐利的半椭圆形衰减。

![Tip Falloff](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a530650-5118-4785-8d26-9218064e143b/11-tip-falloff.png "Tip Falloff")

**尖端**

头端凸出而末端平滑椭圆的衰减。**球形** 衰减的反面。

以下是这些衰减类型在高度图上呈现出的效果（半径和衰减量均相同）：

![Smooth Falloff example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a6a930a-7897-4cdb-94ec-e273b040ef70/12-smooth-falloff-example.png "Smooth Falloff example")

![Linear Falloff example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00708e5f-4ef9-4de0-ba5b-bea66a440e1c/13-linear-falloff-example.png "Linear Falloff example")

![Spherical Falloff example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/858d05d7-6341-4e3a-8081-309003bb7f3d/14-spherical-falloff-example.png "Spherical Falloff example")

![Tip Falloff example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9864dd3-02e5-403a-8a7b-29abe71f8734/15-tip-falloff-example.png "Tip Falloff example")

**平滑**

**线性**

**球形**

**尖端**

## 透明度

![Alpha Brush](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87fc4b57-e085-4493-84b2-2e34dd012b8c/16-alpha-brush.png "Alpha Brush")

**透明度** 笔刷与图案笔刷相似，但绘制时它不会在地形上平铺纹理，它将把笔刷纹理对准绘制的方向并在移动鼠标时拖动形状。

![Dragging a Brush Alpha](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/897a88cb-b011-4702-93d2-41a9c306f659/17-brush-alpha-drag.png "Dragging a Brush Alpha")

### 透明度笔刷设置

![Alpha Brush Settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae3eee38-e672-422e-94f6-cbfa23a562ca/18-alpha-brush-settings.png "Alpha Brush Settings")

**设置**

**描述**

**纹理**

设置要使用的纹理，从 **内容浏览器** 中进行指定。

**纹理通道**

将透明度笔刷的内容设置为来自当前指定纹理的相应通道的数据。

**笔刷尺寸**

设置笔刷的大小。

**使用泥浆笔刷**

选中后将使用一个泥浆笔刷。

## 图案

![Pattern Brush](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94317809-d14b-4ab1-b2c3-993b7f7edfef/19-pattern-brush.png "Pattern Brush")

**图案** 笔刷可使用任意的笔刷形状，其工作原理是从纹理采样单一色彩通道，用作笔刷的透明度。绘制笔刷时将平铺纹理图案。

举例而言，以下纹理即可用作透明度：

![Alpha Tex](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3204dbfc-3ae5-41d5-96ec-120f689cdc94/20-alpha-tex.png "Alpha Tex") ![Alpha Tex Checker](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf68ddbd-8343-4785-944c-7e91dccdf427/21-alpha-tex-checker.png "Alpha Tex Checker")

它们可形成以下笔刷：

![Alpha Pattern](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83007e39-96d5-4be9-a72e-425b7c469c47/22-alpha-pattern.png "Alpha Pattern") ![Alpha Applied](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d26f2487-cdab-48e9-8ded-f3afb35743d5/23-alpha-applied.png "Alpha Applied")

![Alpha Pattern Checker](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1bf72e19-ebd7-42db-a154-631e4646e172/24-alpha-pattern-checker.png "Alpha Pattern Checker") ![Alpha Default Checker](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/195f0672-8bfa-4d18-9bb9-88de588972cf/25-alpha-default-checker.png "Alpha Default Checker")

### 图案笔刷设置

![Pattern Brush Settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4ab7052-3bc9-4f48-bfd9-4b2889731e91/26-pattern-brush-settings.png "Pattern Brush Settings")

**设置**

**描述**

**纹理**

设置要使用的纹理，从 **内容浏览器** 中进行指定。

**纹理通道**

将图案笔刷的内容设置为来自当前指定纹理的相应通道的数据。

**笔刷尺寸**

设置笔刷的大小。

**笔刷衰减**

设置笔刷衰减。

**使用泥浆笔刷**

可使用一个泥浆笔刷。

**纹理缩放**

设置采样纹理相对于地形表面的大小。![Alpha Default](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7cb5bd57-078d-42e9-bb11-6d3d71d64af2/27-alpha-default.png "Alpha Default") ![Alpha Texscale](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92c48f6c-7e36-464e-a42a-8e8c3efedd46/28-alpha-texscale.png "Alpha Texscale")

**纹理旋转**

设置采样纹理相对于地形表面的旋转。![Alpha Texrot Default](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48759ede-4e78-4933-b3af-5970270f7c43/29-alpha-texrot-default.png "Alpha Texrot Default") ![Alpha Texrotation](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/211411f3-0d41-4ec0-9b83-42b83f32bd0d/30-alpha-texrotation.png "Alpha Texrotation")

**纹理平移\[U/V\]**

设在地形表面上设置采样纹理的偏差。![Alpha Default](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff5b5ac1-a908-4b7e-87d4-3ee7c38bb0fc/31-alpha-default.png "Alpha Default") ![Alpha Texpan](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47e1584a-81f3-4ec6-9d72-312b3247c333/32-alpha-texpan.png "Alpha Texpan")

## 组件

![Component Brush](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a22e358-e848-4211-ad21-e3b3a2eaf038/33-component-brush.png)

**组件** 笔刷用于在单个组件上进行操作。光标一次将受限于一个单一组件：

![Component Brush selection](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e0d1978-449a-43d4-8004-b8206e7839c6/34-component-brush-selection.png)

使用工具在个体组件关卡上进行操作时，组件笔刷是唯一可用的笔刷。

## 小工具

![Gizmo Brush](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae754a57-16db-4d32-8296-8575bc409a58/35-gizmo-brush.png)

**小工具** 笔刷可使用地形小工具来修改地形。地形小工具可用于对地形的特定本地化区域执行操作。

只有在雕刻模式中使用复制/粘贴工具时才可以使用小工具笔刷。

如需了解小工具的更多信息，请参见 [地形拷贝工具](/documentation/zh-cn/unreal-engine/landscape-copy-tool-in-unreal-engine)。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [圆](/documentation/zh-cn/unreal-engine/landscape-brushes-in-unreal-engine#%E5%9C%86)
-   [圆笔刷衰减类型](/documentation/zh-cn/unreal-engine/landscape-brushes-in-unreal-engine#%E5%9C%86%E7%AC%94%E5%88%B7%E8%A1%B0%E5%87%8F%E7%B1%BB%E5%9E%8B)
-   [透明度](/documentation/zh-cn/unreal-engine/landscape-brushes-in-unreal-engine#%E9%80%8F%E6%98%8E%E5%BA%A6)
-   [透明度笔刷设置](/documentation/zh-cn/unreal-engine/landscape-brushes-in-unreal-engine#%E9%80%8F%E6%98%8E%E5%BA%A6%E7%AC%94%E5%88%B7%E8%AE%BE%E7%BD%AE)
-   [图案](/documentation/zh-cn/unreal-engine/landscape-brushes-in-unreal-engine#%E5%9B%BE%E6%A1%88)
-   [图案笔刷设置](/documentation/zh-cn/unreal-engine/landscape-brushes-in-unreal-engine#%E5%9B%BE%E6%A1%88%E7%AC%94%E5%88%B7%E8%AE%BE%E7%BD%AE)
-   [组件](/documentation/zh-cn/unreal-engine/landscape-brushes-in-unreal-engine#%E7%BB%84%E4%BB%B6)
-   [小工具](/documentation/zh-cn/unreal-engine/landscape-brushes-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7)
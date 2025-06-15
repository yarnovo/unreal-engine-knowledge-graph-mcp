# 虚幻引擎UMG样式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/umg-styling-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:18:20.863Z

---

目录

![UMG样式](https://dev.epicgames.com/community/api/documentation/image/bffc054c-2800-48f0-a25a-e1fcfe461638?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc43d851-6bc6-4d8b-979c-9919e9c52a36/styleheader.png)

当通过 UMG 创建您的 UI 屏幕时，排布各种元素的布局仅仅是第一步。对于每个按钮、状态条、文本框等，UMG 的 **详情** 面板中都提供了可以直接分配的数个"样式"选项，这些选项将影响这些对象的显示方式。

下列各个控件都使用了 **样式** 选项，但它们各自的样式选项可能有所不同：

-   按钮
-   复选框
-   可编辑的文本框
-   可编辑的多行文本框
-   进度条
-   调整大小框
-   滑块
-   数字调整框
-   文本块
-   组合框（字符串）
-   可编辑的文本
-   可编辑的多行文本

## 状态

在很多情况下，尤其对于交互式控件而言，您可能希望根据各个控件交互方式或所处条件的不同，需要它们具备不同的外观。例如，假设您的屏幕上有一个正常显示的按钮，当将鼠标悬停在此按钮上方时，按钮的颜色会发生变化或者按钮按一定规律闪烁，而点击按钮时又会执行完全不同的操作。我们将这种现象称为 **状态**，这是一种最常见的设定样式的形式，用于根据控件当前所处的状态来指定控件的显示方式。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a629896-f9ac-4830-9994-6239748705a0/style1.png)

上图中，按钮控件会根据正常、按下、光标悬停或禁用这些不同的状态而发生变化。大部分控件都将使用正常、按下、光标悬停和禁用状态，但根据您使用的控件类型，也可能有更多选项可用。

### 设置图像状态

对于每种状态，您都可以为控件设置要使用的 **图像**（**纹理** 或 **材质** 资产）。**图像大小** 是指平板单元中资源的大小，而 **绘制为** 选项使用 9 个缩放框，用于指定以 **方框**、**边框** 或 **图像** 的形式绘制图像。

每种形式的示例如下图所示：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/494a4d07-622f-49a2-aa1d-0906aad12b4d/boxexample.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1dc4e280-fb76-4eae-bc55-d7eb4227af4c/borderexample.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c49a73e-8d56-439b-917e-05c86dba30ae/boxandimage.png)

方框

边框

图像

-   **方框** 会绘制一个 3x3 的框，其中根据边距（蓝色虚线）来确定侧面和中间区域的拉伸（橙色箭头所指）。
    -   绿色箭头代表根据边距乘图像大小所得出的常数值。
-   **边框** 会绘制一个 3x3 的边框，其中根据边距（蓝色虚线）来确定侧面的图块（橙色箭头所指）。
    -   使用边框选项时不会绘制中间部分。
    -   绿色箭头代表根据边距乘图像大小所得出的常数值。
-   **图像** 将绘制图像并进行拉伸（橙色箭头所指），并且会忽略边距。

#### 基于纹理的图像

您可以指定纹理作为图像资产，但也可以设置一些旗标，以便在每种设备上清晰地显示纹理并避免出现压缩失真。在"细节层次"下的"纹理编辑器"中，将 **Mip Gen 设置** 设为 **NoMipmaps**，并将 **LOD 组** 设为 **UI**。在"压缩"下，将 **压缩设置** 设为 **TC 编辑器图标**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bc52a1b-43ff-4cb2-a25f-d03450af835a/texturesetup.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bc52a1b-43ff-4cb2-a25f-d03450af835a/texturesetup.png)

*点击查看全图。*

#### 基于材质的图像

针对图像状态，也可以将材质指定为图像资产，但您需要更改一些设置。在"材质"中，需要在 **详情** 面板的 **使用** 下勾选 **用于 UI** 复选框。这将会为平板专门编译另一个着色器。您还需要仅输出 **放射颜色**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/282dd241-8ad6-4a33-9d62-3aa31a82b925/usedwithui.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/282dd241-8ad6-4a33-9d62-3aa31a82b925/usedwithui.png)

*点击查看全图。*

#### 动态材质

要修改材质参数，您需要一个 **动态材质实例**。只要图像控件具有带材质的平板刷功能，您可以向其请求动态图像（只需要创建一次，然后对其进行缓存即可），从而轻松实现这一目的。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e67de880-ac50-45ef-a207-2e60e834ca36/umg_auto_dynamic_material_image.png)

### 着色/边距

在每种状态下，还有为图像 **着色** 的选项，用于向与状态相关的图像应用着色颜色。还有一个 **边距** 选项，您可以使用该选项来输入 **方框** 和 **边框** 绘制模式的边距尺寸（在图像模式中，会忽略边距）。

## 填充

**填充** 样式选项是指围绕控件创建的边框。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6a150c9-70f4-4aa8-96e8-8d135c8ed334/padding.png)

例如，在针对方框按钮的上图中，**正常填充** 负责绘制按钮背景图像中的边框。应用它时，按钮内容将与按钮的边框齐平显示。**按下填充** 与正常填充相同，但它表示的是按下按钮时所应用的填充方式。

根据您使用的控件类型，可能会提供不同的 **填充** 选项。

## 音效

可根据控件所处的状态为控件设置 **音效**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d89b8fa2-8fed-4b03-985a-f054301f9104/sounds.png)

允许应用音效的大部分控件都使用光标悬停或按下音效事件，即在光标悬停在控件上方时或点击控件时会播放指定的音效。在针对复选框控件的上图中，存在相关选项，可以为 **选中**、**取消选中** 以及 **光标悬停** 状态设置音效事件。

根据您使用的控件类型，可能会提供不同的 **音效** 选项。

## 渲染转换

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/874dcdea-f43e-408a-afd8-fc2a5364f819/rendertransformmenu.png)

在控件 **详情** 面板的 **渲染转换** 部分下，提供有更多样式设置选项，它们可用于修改您控件的外观。利用渲染转换设置，您可以 **平移**、**缩放**、**修剪** 或 **旋转** 您的控件，还可以调整它的 **枢轴** 点。

下图给出了 **渲染转换** 设置的示例。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b41e7721-fe0c-4d2a-85db-9cee3b8a0fc7/rendertransforms.png)

每个渲染转换设置都可以被设为关键帧，这让您能够通过动画功能来修改它们，而同时由于可以通过蓝图来修改它们，因此您能够在用户执行游戏操作期间或根据用户的操作来进行修改。渲染转换与布局转换是相对的，并且并不会被它们的父操作所裁剪（例如，如果您有一个布满按钮的滚动框，那么调整"渲染转换"中的"平移"设置会将按钮推出它们所在的框）。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [状态](/documentation/zh-cn/unreal-engine/umg-styling-in-unreal-engine#%E7%8A%B6%E6%80%81)
-   [设置图像状态](/documentation/zh-cn/unreal-engine/umg-styling-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%9B%BE%E5%83%8F%E7%8A%B6%E6%80%81)
-   [基于纹理的图像](/documentation/zh-cn/unreal-engine/umg-styling-in-unreal-engine#%E5%9F%BA%E4%BA%8E%E7%BA%B9%E7%90%86%E7%9A%84%E5%9B%BE%E5%83%8F)
-   [基于材质的图像](/documentation/zh-cn/unreal-engine/umg-styling-in-unreal-engine#%E5%9F%BA%E4%BA%8E%E6%9D%90%E8%B4%A8%E7%9A%84%E5%9B%BE%E5%83%8F)
-   [动态材质](/documentation/zh-cn/unreal-engine/umg-styling-in-unreal-engine#%E5%8A%A8%E6%80%81%E6%9D%90%E8%B4%A8)
-   [着色/边距](/documentation/zh-cn/unreal-engine/umg-styling-in-unreal-engine#%E7%9D%80%E8%89%B2/%E8%BE%B9%E8%B7%9D)
-   [填充](/documentation/zh-cn/unreal-engine/umg-styling-in-unreal-engine#%E5%A1%AB%E5%85%85)
-   [音效](/documentation/zh-cn/unreal-engine/umg-styling-in-unreal-engine#%E9%9F%B3%E6%95%88)
-   [渲染转换](/documentation/zh-cn/unreal-engine/umg-styling-in-unreal-engine#%E6%B8%B2%E6%9F%93%E8%BD%AC%E6%8D%A2)

相关文档

[

控件类型参考说明

![控件类型参考说明](https://dev.epicgames.com/community/api/documentation/image/d25cc82c-39d2-4c65-b9c3-96fd77e35065?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/widget-type-reference-for-umg-ui-designer-in-unreal-engine)
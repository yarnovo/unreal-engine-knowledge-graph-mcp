# 使用虚幻引擎UMG无效化方框 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-invalidation-box-for-umg-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:20:18.663Z

---

目录

![无效化方框](https://dev.epicgames.com/community/api/documentation/image/f84a4d67-134a-4caf-9707-671856ac1f5b?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [控件类型参考说明](/documentation/zh-cn/unreal-engine/widget-type-reference-for-umg-ui-designer-in-unreal-engine)

## 介绍

被"无效化方框"（Invalidation Box）围绕的控件的子控件的几何体会被缓存，以便加快Slate的渲染速度。任何被无效化方框缓存的控件都不会进行预处理（pre-passed）、更新或绘制。总的来说，如果你想优化项目，你可以将特定控件放置在无效化方框中，这样可以提升性能（特别是处理移动端项目或复杂UI界面时）。如果控件只是偶尔变动，就可以将它们放置在无效化方框中进行缓存，这样就不会在绘制、更新或预通道（prepass）中处理它们。

但是如果控件发生变动，它会失效，你需要手动将缓存失效（本质上是将其丢弃），以此强制控件在下一个绘制通道中重新绘制。任何导致控件外观改动的操作都会要求它被无效化。唯一例外是，改动的外观没有存储在控件的顶点缓冲区中（例如材质，更改材质参数不需要将控件无效化）。

## 细节面板

在 **无效化方框** 的 **细节** 面板中，可以对一些属于该控件的特定选项进行设置：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e743972-bc19-49ab-94d3-6abbc961e38f/invalidationbox.png)

选项

描述

**缓存相对变换（Cache Relative Transforms）**

缓存子绘制元素（相对于无效化方框）的位置，会导致每帧绘制它们并增加额外开销。但是，假如无效化方框的位置每帧都会改变，则这能节省很多开销。

**易变（Is Volatile）**

如果为真，会防止控件或其子控件的几何体或布局信息被缓存。如果控件会逐帧发生改变，但你仍希望该控件处于无效面板中，应该将其设置为"易变"，而不是每帧对它进行无效化处理（后者会导致无效面板无法缓存任何内容）。

关于 **易变（Is Volatile）** 复选框，任何控件都可以设置为"易变"。易变类型的控件类似于普通的、未经无效化处理的Slate控件。这些控件（包括其子控件）每帧都会重新绘制。结合无效化面板后，你就只需考虑重新绘制UI中最为动态的部分，因为相比而言，让整个面板无效化的开销会大很多。

## 函数

使用 **无效化方框（Invalidation Box）** 时，用户可以通过 C++ 或 **Invalidate Layout And Volatility** 节点（下图所示）在子控件上调用 [`Invalidate`](/documentation/en-us/unreal-engine/API/Runtime/SlateCore/Widgets/SWidget/Invalidate) 以强制进行无效化。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60106ba8-fecc-4ef2-949f-69412e56019e/bpinvalidatenode.png)

目前，某些核心控件会在特定属性更改后自动这样做；今后将会有更多控件支持这项功能。

## 调试

可以使用 **控件反映器**（CTRL+Shift+W）并单击 **无效调试** 选项来调试无效化方框。

如果在调用 `SlateDebugger.Invalidate.Enable 1` 时想显示图例，请使用 `SlateDebugger.Invalidate.ToggleLegend`。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1144dc64-dbd2-4e60-8fe5-585b492929a5/widgetreflector.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1144dc64-dbd2-4e60-8fe5-585b492929a5/widgetreflector.png)

点击查看大图。

打开控件反映器并开启无效调试后，会看到以下内容：

颜色

描述

**黄色**

在这一帧无效化的"Paint"。

**灰色**

在这一帧无效化的"Volatility"。

**青色**

在这一帧无效化的"ChildOrder"。

**黑色**

在这一帧无效化的"RenderTransform"。

**白色**

在这一帧无效化的"Visibility"。

**粉色**

在这一帧为无效化方框无效化的布局。

**蓝色**

所有控件都重新排序。

**红色**

完整更新。

如需调试无效化方框（InvalidationBox）的行为，请使用 `SlateDebugger.InvalidationRoot.Enable`。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/093a0c3d-f960-46d8-af03-49a8c9ffbe4c/exampledebugging.png)

上图中，一个标记为易变的图像位于边界内，同时封装在一个无效化方框中。由于图像已标记为易变，游戏过程中在边界（或任何其他想要显示在图像周围且保持不变的图形资产）进行缓存时，该图像可以动态更新。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [介绍](/documentation/zh-cn/unreal-engine/using-the-invalidation-box-for-umg-in-unreal-engine#%E4%BB%8B%E7%BB%8D)
-   [细节面板](/documentation/zh-cn/unreal-engine/using-the-invalidation-box-for-umg-in-unreal-engine#%E7%BB%86%E8%8A%82%E9%9D%A2%E6%9D%BF)
-   [函数](/documentation/zh-cn/unreal-engine/using-the-invalidation-box-for-umg-in-unreal-engine#%E5%87%BD%E6%95%B0)
-   [调试](/documentation/zh-cn/unreal-engine/using-the-invalidation-box-for-umg-in-unreal-engine#%E8%B0%83%E8%AF%95)

相关文档

[

UI无效化

![UI无效化](https://dev.epicgames.com/community/api/documentation/image/7bce77e7-baf2-4d74-a601-d121cce3c64d?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/invalidation-in-slate-and-umg-for-unreal-engine)
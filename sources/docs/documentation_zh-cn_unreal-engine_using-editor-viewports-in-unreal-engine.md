# 使用虚幻引擎中的编辑器视口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-editor-viewports-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:18:56.200Z

---

目录

![使用编辑器视口](https://dev.epicgames.com/community/api/documentation/image/da8402eb-b701-4d1d-b4d9-459f900747bb?resizing_type=fill&width=1920&height=335)

选择操作系统：

Windows macOS Linux

**视口（Viewports）** 是你在虚幻引擎中创建世界的窗口。你可以像在游戏中那样在视口中移动，也可以像建筑蓝图那样用于设计各种方案。虚幻编辑器的视口包含各种工具和可视化选项，能帮助你准确查看所需的数据。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed1e8b23-96ff-4a43-ae82-e7f934937715/01-viewports-topic.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed1e8b23-96ff-4a43-ae82-e7f934937715/01-viewports-topic.png)

Click image for full size.

## 视口类型

虚幻编辑器中主要有两种视口类型：透视和正交。透视视图是进入游戏场景 的一个3D窗口。正交视图（正面视图、侧面视图和顶部视图）是2D视口， 每个视图俯视一个主轴（X轴、Y轴或Z轴）

![View Perspective](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ad97b9e-a71d-49ae-8d67-ccd5211b260b/02-view-perspective.png "View Perspective")

![View Front](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c0f095b-e0c6-4f67-b19d-0a4d4d8fef94/03-view-front.png)

![View Side](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53029607-3577-4563-89c4-2d53d330a93c/04-view-side.png)

![View Top](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13e4016e-c756-4073-ba0e-c60174a0a171/05-view-top.png)

透视 (3D)

正面（X轴）

侧面（Y轴）

顶部（Z轴）

你可以通过按 **Alt** 和 **G**、**H**、**J** 或 **K** 循环查看视口的类型。它们分别将视口设置为 透视、正面、侧面或顶部。

## 视口布局

默认情况下，当你打开虚幻编辑器时，你会看到一个透视视口。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53bec867-8f12-44ba-87fb-21c3c6ea4338/06-viewport-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53bec867-8f12-44ba-87fb-21c3c6ea4338/06-viewport-1.png)

Click image for full size.

实际上，**视口（Viewport）** 面板包含多个视口，它们被放置在一个网格中，任何一个都可以最大化 显示。默认布局是4x4，其中每种类型的视口包含一个一个——透视、顶部、正面和侧面。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63d36c50-55fd-44b6-8c66-6745a205c12d/07-viewport-4.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63d36c50-55fd-44b6-8c66-6745a205c12d/07-viewport-4.png)

Click image for full size.

可以使用位于每个视口右上角的 ![Minimize Viewport](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12b2c4dc-0137-4549-b16c-8c319301deb5/08-minimize-viewport.png "Minimize Viewport") 和 ![Maximize Viewport](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b00b961e-1b08-49c3-85c2-30be12c10672/09-maximize-viewport.png "Maximize Viewport") 按钮 将视口最小化和最大化。

## 视图模式

虚幻编辑器视口提供了许多可视化模式来帮助您查看场景中正在处理的数据类型，以及诊断任何错误或意外结果。较为常用的视图模式有自己的热键，但所有视图模式都可从视口内通过 **视图模式（View Mode）**菜单进行访问。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9d71899-ebe3-4e82-aba6-aeb5e7dbe2e7/02-viewmode-menu.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9d71899-ebe3-4e82-aba6-aeb5e7dbe2e7/02-viewmode-menu.png)

点击查看大图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e127064-f1f6-4dae-b952-47736f9185c5/03-viewmodes-sub-menu-button.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e127064-f1f6-4dae-b952-47736f9185c5/03-viewmodes-sub-menu-button.png)

点击查看大图。

这里显示了最常用的视图模式：

![Viewmode Lit](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97cc339f-41b8-43f2-a3b1-633d7694978d/12-viewmode-lit.png "Viewmode Lit")

![Viewmode Unlit](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c71d477d-593d-45bc-bced-2a8cf30fdc4a/13-viewmode-unlit.png "Viewmode Unlit")

![Viewmode Wireframe](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d868e334-0523-4f69-bdab-2414892b3bf2/14-viewmode-wireframe.png "Viewmode Wireframe")

光照

无光照

线框

请参阅[视图模式](/documentation/zh-cn/unreal-engine/viewport-modes-in-unreal-engine)了解所有可用模式的列表和描述。

## 游戏视图

**游戏视图（Game View）** 使视口像在游戏中一样显示场景。这意味着不显示任何 特定于编辑器的元素，例如Actor图标。当你在游戏中运行关卡时，它提供一种简单的方法 来查看关卡的外观。

 ![拖动滑条以切换游戏视图。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6484b927-8ca1-4abe-956c-f1538fcc16e9/15-game-view.png "Game View") ![拖动滑条以切换游戏视图。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8badc30a-84e8-4b31-a59b-8b9b6fa32030/16-game-view-1.png "Game View")

**拖动滑条以切换游戏视图。**

要启用游戏视图，只需在聚焦视口的同时按 **G** 键（默认情况下），或者 从视口选项菜单中选择 **游戏视图（Game View）** 选项：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02bded5e-393e-4dc0-9591-337fcbc45ad0/17-gamemode-viewport.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02bded5e-393e-4dc0-9591-337fcbc45ad0/17-gamemode-viewport.png)

Click image for full size.

## 沉浸模式

除了最大化和最小化外，视口还有另一种状态，叫做 **沉浸模式（Immersive Mode）**。这是指 视口被最大化到窗口的全部范围，包含 **视口（Viewport）** 面板。当你将关卡编辑器最大化时， 这将使你能够在全屏幕上运行视口，以获得真正的 *immersive* 编辑体验！

要启用沉浸模式，只需在聚焦视口的同时按下 **F11** 键（默认情况下），或者 从视口选项菜单中选择 **沉浸模式（Immersive Mode）** 选项：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dae64c94-f82b-4a73-842e-0819e52f349e/18-immersive-mode-options.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dae64c94-f82b-4a73-842e-0819e52f349e/18-immersive-mode-options.png)

Click image for full size.

在沉浸模式下，你可以使用与上面相同的过程，或者按下位于视口右上方的 ![Restore Viewport](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/498a6338-1e69-4c87-9556-f6bc9e8cd29b/19-restore-viewport.png "Restore Viewport") 按钮，将视口恢复为正常状态。

     ![拖动滑条以看到沉浸式模式的效果！](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d928edf4-f13a-4fff-a754-2b78a302d160/20-immersive-mode.png "Immersive Mode") ![拖动滑条以看到沉浸式模式的效果！](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fce63440-4d65-4a12-8660-2bc6eb144a9e/21-immersive-mode-1.png "Immersive Mode") ![拖动滑条以看到沉浸式模式的效果！](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4e8a101-e6b0-4f59-a4b2-dd895e2981e9/22-immersive-mode-2.png "Immersive Mode") ![拖动滑条以看到沉浸式模式的效果！](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1b59219-768c-4d62-ac05-cb8c05af740f/23-immersive-mode-3.png "Immersive Mode") ![拖动滑条以看到沉浸式模式的效果！](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54b4e811-0d58-4708-abf9-12e15a36699d/24-immersive-mode-4.png "Immersive Mode") ![拖动滑条以看到沉浸式模式的效果！](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5382128e-bc2b-4232-a5e3-46b3809910ed/25-immersive-mode-5.png "Immersive Mode")

**拖动滑条以看到沉浸式模式的效果！**    ![拖动滑条以看到沉浸式模式的效果！](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/141c8879-d9f6-4228-aa29-674f633c0e00/mac_immersive_1.png) ![拖动滑条以看到沉浸式模式的效果！](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8a9ef65-ccb6-40ae-964d-ca6a6a065216/mac_immersive_2.png) ![拖动滑条以看到沉浸式模式的效果！](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d009b77-e471-4f8b-88a3-a83a5d201e57/mac_immersive_3.png) ![拖动滑条以看到沉浸式模式的效果！](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46afc321-639e-4272-afb4-26a02e6e502a/mac_immersive_4.png) ![拖动滑条以看到沉浸式模式的效果！](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad506429-8bdc-4f98-ad0d-9474d24bb446/mac_immersive_5.png)

**拖动滑条以看到沉浸式模式的效果！**

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [视口类型](/documentation/zh-cn/unreal-engine/using-editor-viewports-in-unreal-engine#%E8%A7%86%E5%8F%A3%E7%B1%BB%E5%9E%8B)
-   [视口布局](/documentation/zh-cn/unreal-engine/using-editor-viewports-in-unreal-engine#%E8%A7%86%E5%8F%A3%E5%B8%83%E5%B1%80)
-   [视图模式](/documentation/zh-cn/unreal-engine/using-editor-viewports-in-unreal-engine#%E8%A7%86%E5%9B%BE%E6%A8%A1%E5%BC%8F)
-   [游戏视图](/documentation/zh-cn/unreal-engine/using-editor-viewports-in-unreal-engine#%E6%B8%B8%E6%88%8F%E8%A7%86%E5%9B%BE)
-   [沉浸模式](/documentation/zh-cn/unreal-engine/using-editor-viewports-in-unreal-engine#%E6%B2%89%E6%B5%B8%E6%A8%A1%E5%BC%8F)
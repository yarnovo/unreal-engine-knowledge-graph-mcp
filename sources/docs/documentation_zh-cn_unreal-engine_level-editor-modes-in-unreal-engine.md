# 虚幻引擎关卡编辑器模式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/level-editor-modes-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:19:22.502Z

---

目录

![关卡编辑器模式](https://dev.epicgames.com/community/api/documentation/image/3e583aee-afa2-43f9-b06e-b2a09fd1ed80?resizing_type=fill&width=1920&height=335)

**关卡编辑器（Level Editor）** 可以进入不同的编辑模式，以启用特定的编辑界面和工作流程，从而编辑特定类型的Actor或几何体。

为了显示可显示的模式，在关卡编辑器工具栏中，打开 **模式（Modes）** 下拉菜单。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2de6416f-d4ba-4d28-a24b-ffd8960494c3/01-modes-dropdown.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2de6416f-d4ba-4d28-a24b-ffd8960494c3/01-modes-dropdown.png)

点击查看大图

图标

模式

快捷键

说明

![LE工具选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dce7b6eb-6f8b-4061-9c17-2b17c855bf12/02-le-tools-select.png "LE Tools Select")

**选择（Select）**

**Shift + 1**

激活[**选择** 模式](/documentation/zh-cn/unreal-engine/select-mode-in-unreal-engine)以便在场景中选择Actor。

![LE工具地形](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0068320d-0b9e-4e4d-9052-4afac72a4194/03-le-tools-landscape.png "LE Tools Landscape")

**地形**

**Shift + 2**

激活[**地形（Landscape）** 模式](/documentation/zh-cn/unreal-engine/landscape-outdoor-terrain-in-unreal-engine)以便编辑地貌地形。

![LE工具植被](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0244ef14-35ed-4447-8021-26291c15fb83/04-le-tools-foliage.png "LE Tools Foliage")

**植被（Foliage）**

**Shift + 3**

激活[**植被** 模式](/documentation/zh-cn/unreal-engine/foliage-mode-in-unreal-engine)以便绘制实例化的植被。

![LE工具网格体绘制](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d000e66-ba67-49e3-af88-f0fbb8204964/06-le-tools-mesh-paint.png "LE Tools Mesh Paint")

**网格体绘制（Mesh Paint）**

**Shift + 4**

激活 [**网格体绘制（Mesh Paint）** 模式](/documentation/zh-cn/unreal-engine/mesh-paint-mode-in-unreal-engine)以便使用视口在静态网格体Actor上直接绘制顶点颜色和纹理。

![LE工具建模](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7d617fb-9242-41e9-8297-e31e6af3a8e3/08-le-tools-modeling.png "LE Tools Modeling")

**建模（Modeling）**

**Shift + 5**

激活 **建模（Modeling）** 编辑模式。

![LE工具破碎](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f50fd9bd-4a8d-438d-8dcf-545d99bad72b/07-le-tools-fracture.png "LE Tools Fracture")

**破碎（Fracture）**

**Shift-6**

激活 [**破碎（Fracture）** 莫斯](/documentation/404)以便创建可破坏的物体和环境。

![LE工具笔刷](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4a5e52d-88e4-4983-b8ee-da793f2e0fba/05-le-tools-brush.png "LE Tools Brush")

**笔刷编辑（Brush Editing）**

**Shift + 7**

激活 [**笔刷编辑（Brush Editing）** 模式](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine)以便修改几何体笔刷。

![LE工具动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2977347-d845-429b-a446-5518823bfc3b/09-le-tools-animation.png "LE Tools Animation")

**动画（Animation）**

**Shift + 8**

激活 **动画（Animation）** 编辑模式。

**模式（Modes）** 会针对特定任务，更改关卡编辑器主要行为，例如在场景中移动变换某个资产，雕刻地形，生成植被，创建几何笔刷和体积，以及在网格体上绘制。模式（Modes）面板包含一组工具，并且这些工具会根据你选择的编辑模式而调整。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31eaeb16-c266-47d8-8b4e-a799ff49569e/10-landscape-panel.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31eaeb16-c266-47d8-8b4e-a799ff49569e/10-landscape-panel.png)

点击查看大图。

地形面板

你可以通过点击标签页右上角的"X"来关闭面板，也可以右键点击标签页，然后在出现的上下文菜单中点击 **隐藏标签页** 来隐藏面板。要重新打开已关闭的面板，请在 **窗口** 菜单中点击该面板的名称。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
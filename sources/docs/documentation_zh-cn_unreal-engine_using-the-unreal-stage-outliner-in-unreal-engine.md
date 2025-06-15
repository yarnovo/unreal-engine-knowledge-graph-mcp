# 在虚幻引擎中使用Unreal Stage大纲视图 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-unreal-stage-outliner-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:26:56.883Z

---

目录

![使用Unreal Stage大纲视图](https://dev.epicgames.com/community/api/documentation/image/623dca6c-1e5d-465a-a3d8-932a5843920d?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

## 大纲视图

大纲视图可以随时选择性地显示，还能列出场景中的所有ICVFX内容，并显示当前选定的内容。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d53f4214-b857-4e0b-a4b7-f8d95021e526/outliner-1.gif)

## 大纲视图工具

大纲视图菜单栏为管理ICVFX内容提供了如下工具。

### 筛选

与桌面端虚幻引擎的大纲视图一样，这里的内容列表也可以按类型进行筛选，帮助你轻松找到所需的Actor，尤其是在更大、更复杂的场景中。

同样可以通过"按条件搜索（search by）"来按名称搜索内容。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a91c6358-f90c-42ea-b73a-f69f0b2e2ba7/outliner-2.gif)

### 可视性

Unreal Stage的可视性按钮可开关"游戏中隐藏Actor（Actor Hidden in Game）"属性，从而对视图隐藏选定的内容。隐藏内容将不再通过LED体积的nDisplay可见，但仍可通过编辑器和应用程序进行进一步操作（例如在不干扰其他现场工作的情况下进行调整，或找到它以使其再次可见）。隐藏内容将在大纲视图中以斜体显示，将其与可见内容区分开来。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/680752f8-5579-4fc3-9e92-999dc232fc2f/outliner-3.gif)

### 多选

你可以通过大纲视图开启或关闭多选模式。 开启时，选择内容会将其添加到选择项中并创建选择集，而不是将选择项从一个Actor更改为另一个Actor。

如果选择了可视性状态不同的多个内容（例如一个可见但另一个隐藏），Unreal Stage会将选择的内容视为可见。这意味着点击可视性按钮将隐藏LED体积内所有选定的Actor。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a03c0332-4426-4da3-8421-2322db10f743/outliner-4.gif)

### 省略号菜单

-   省略号菜单中的其他实用操作如下：
-   聚焦到选中项（Focus Selected）
-   编辑器预览将被缩放和平移，以聚焦到选定的Actor。
-   复制选中项（Duplicate Selected）
-   删除选中项（Delete Selected）
-   重命名选中项（Rename Selected）

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0635bf3-3cd7-4a7d-b2cb-b443100ab049/outliner-5.gif)

### 滑动操作

大纲视图中的Actor也可以进行左右滑动，以更快更轻松地访问关键操作：

-   向右滑动
-   切换可视性
-   向左滑动
-   删除选中项

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34689130-f9f4-47a0-b60d-62eb0583a89d/outliner-6.gif)

-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)
-   [ndisplay](https://dev.epicgames.com/community/search?query=ndisplay)
-   [icvfx](https://dev.epicgames.com/community/search?query=icvfx)
-   [virtual sets](https://dev.epicgames.com/community/search?query=virtual%20sets)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [大纲视图](/documentation/zh-cn/unreal-engine/using-the-unreal-stage-outliner-in-unreal-engine#%E5%A4%A7%E7%BA%B2%E8%A7%86%E5%9B%BE)
-   [大纲视图工具](/documentation/zh-cn/unreal-engine/using-the-unreal-stage-outliner-in-unreal-engine#%E5%A4%A7%E7%BA%B2%E8%A7%86%E5%9B%BE%E5%B7%A5%E5%85%B7)
-   [筛选](/documentation/zh-cn/unreal-engine/using-the-unreal-stage-outliner-in-unreal-engine#%E7%AD%9B%E9%80%89)
-   [可视性](/documentation/zh-cn/unreal-engine/using-the-unreal-stage-outliner-in-unreal-engine#%E5%8F%AF%E8%A7%86%E6%80%A7)
-   [多选](/documentation/zh-cn/unreal-engine/using-the-unreal-stage-outliner-in-unreal-engine#%E5%A4%9A%E9%80%89)
-   [省略号菜单](/documentation/zh-cn/unreal-engine/using-the-unreal-stage-outliner-in-unreal-engine#%E7%9C%81%E7%95%A5%E5%8F%B7%E8%8F%9C%E5%8D%95)
-   [滑动操作](/documentation/zh-cn/unreal-engine/using-the-unreal-stage-outliner-in-unreal-engine#%E6%BB%91%E5%8A%A8%E6%93%8D%E4%BD%9C)
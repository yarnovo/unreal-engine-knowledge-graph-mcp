# 虚幻引擎纹理编辑器界面 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/texture-asset-editor-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:25:00.263Z

---

目录

**纹理属性编辑器（Texture Properties Editor）** 可用于预览纹理资产和编辑其属性。 还可以应用颜色调整和修改压缩和LOD设置。

要打开纹理编辑器，在 **内容浏览器** 中 **双击** 一个纹理资产，或 **右键点击** 一个纹理资产，然后点击上下文菜单中的 **编辑（Edit）**。

![纹理编辑器UI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0562c57f-8035-4557-94fc-570f97a78fa5/texture_ui.png)

1.  **菜单栏（Menu Bar）**
2.  **工具栏（Toolbar）**
3.  **视口（Viewport）**
4.  **细节面板（Details Panel）**

## 菜单栏

### 文件

-   **保存（Save）** - 保存当前处理的资产。
-   **打开资产（Open Asset）** - 打开 **全局资产选取器（Global Asset Picker）**，快速找到资产并打开相应的编辑器。
-   **全部保存（Save All）** - 保存项目中所有未保存的关卡及资产。
-   **选择要保存的文件（Choose Files to Save）** - 弹出一个对话框，可选择想为项目保存的关卡及资产。
-   **连接到源码控制（Connect To Source Control）** - 弹出一个对话框，可选择一个虚幻编辑器可以集成的源码控制系统，或者同其进行交互。

### 编辑

-   **撤销（Undo）** - 撤销最近的操作。
-   **重做（Redo）** - 如果最后一次操作是撤销操作，则重做最近一次撤销的操作。
-   **编辑器偏好设置（Editor Preferences）** - 提供了一个选项列表，点击其中任意选项都会打开 **编辑器偏好设置（Editor Preferences）** 的对应部分，可在其中修改虚幻编辑器偏好设置。
-   **项目设置（Project Settings）** - 提供了一个选项列表，点击其中任意选项都会打开 **项目设置（Project Settings）** 窗口的对应部分，可在其中修改虚幻引擎项目的各种设置。

### 资产

-   **在内容浏览器中查找（Find in Content Browser）** - 在内容浏览器中查找并选择当前资产。
-   **查看引用（View Reference）** - 启动引用查看器，显示选定资产的引用。
-   **重新导入 *文件名*（Reimport *filename*）**\* - 从磁盘上的资源原始位置处重新导入当前资源。

### 窗口

-   **工具条（Toolbar）** - 切换工具条的显示状态。
-   **视口（Viewport）** - 切换 **视口（Viewport）** 面板的显示状态。
-   **细节（Details）** - 切换 **细节（Details）** 面板的显示状态。
-   **内容浏览器（Content Browser）** - 在一个单独的窗口中打开 **内容浏览器**。
-   **开发人员工具（Developer Tools）** - 在单独的窗口中打开选中的 **开发人员工具**（摄像机调试器、碰撞分析器、调试工具、模块、控件映射器）。
    -   **蓝图调试器（Blueprint Debugger）** - 在一个单独的窗口中打开 **蓝图调试器**。
    -   **碰撞分析器（Collision Analyzer）** - 在一个单独的窗口中打开 **碰撞分析器**。
    -   **调试工具（Debug Tool）** - 在一个单独的窗口中打开 **调试工具**。
    -   **消息日志（Message Log）** - 在一个单独的窗口中打开 **消息日志**。
    -   **输出日志（Output Log）** - 在一个单独的窗口中打开 **输出日志**。
    -   **可视记录器（Visual Logger）** - 在一个单独的窗口中打开 **可视记录器** 工具。
    -   **类查看器（Class Viewer）** - 在一个单独的窗口中打开 **类查看器**。
    -   **设备管理器（Device Manager）** - 在一个单独的窗口中打开 **设备管理器**。
    -   **设备描述（Device Profiles）** - 在一个单独的窗口中打开 **设备描述**。
    -   **模块（Modules）** - 在一个单独的窗口中打开 **模块**。
    -   **会话前端（Session Frontend）** - 在一个单独的窗口中打开 **会话前端**。
    -   **控件反射器（Widget Reflector）** - 在一个单独的窗口中打开 **控件反射器**。
-   **撤销操作历史记录（Undo History）** - 在一个单独的窗口中弹出 **撤销操作历史记录（Undo History）** 面板。
-   **插件（Plugins）** - 弹出一个 **插件（Plugins）** 窗口。
-   **重置布局（Reset Layout）** - 将布局重置为默认布局。要求编辑器在保存更改并创建设置备份后重新启动。
-   **保存布局（Save Layout）** - 将面板的当前布局保存作为新的默认布局。
-   **启用全屏（Enable Fullscreen）** - 为该应用程序启用全屏模式，在整个显示器上展开应用程序。

## 工具栏

项目

说明

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc6ac070-be76-4d60-83f3-fa207bc10f45/common_toolbar_save.png)

保存当前资产。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2adb5488-5471-4a3c-899f-35883c49e845/common_toolbar_cb.png)

在内容浏览器中查找并选择当前资产。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f204580-457f-46b7-a9c8-0247c1780ec3/textureui_toolbar_compress.png)

根据 **细节（Details）** 面板的 **压缩（Compression）** 部分中的设置压缩纹理。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48fd8f77-a400-4e04-b003-0b7c304148e6/textureui_toolbar_reimport.png)

从磁盘上的资产原始位置处重新导入当前资产。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3f6b180-e388-4f1e-900b-f02f05169fdb/textureui_toolbar_mip.png)

可点击复选框并拖动滑块（或点击加减按钮）可改变纹理的mip级别。

## 视口

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44e1efce-bbfe-4eb3-a94e-cc641c699f47/texture_ui_viewport.png)

该视口显示了贴图资源的预览效果。

视口左上角包含一个下拉菜单 **View(视图)** ，该菜单为你提供了切换各种通道及设置的选项，可以修改贴图的显示方式。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0eeac4d6-fc03-4a06-9758-e87eeb63d017/textureui_viewport_viewmenu.png)

你可以通过拖拽视口右下角的Zoom(缩放)滑条，或者通过使用下拉菜单修改 **Fill（填充）** 设置，你可以重新调整所预览的贴图资源的大小。

## 细节面板

**Details（细节）** 面板显示了贴图的各种属性，使你可以修改这些属性。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [textures](https://dev.epicgames.com/community/search?query=textures)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [菜单栏](/documentation/zh-cn/unreal-engine/texture-asset-editor-in-unreal-engine#%E8%8F%9C%E5%8D%95%E6%A0%8F)
-   [文件](/documentation/zh-cn/unreal-engine/texture-asset-editor-in-unreal-engine#%E6%96%87%E4%BB%B6)
-   [编辑](/documentation/zh-cn/unreal-engine/texture-asset-editor-in-unreal-engine#%E7%BC%96%E8%BE%91)
-   [资产](/documentation/zh-cn/unreal-engine/texture-asset-editor-in-unreal-engine#%E8%B5%84%E4%BA%A7)
-   [窗口](/documentation/zh-cn/unreal-engine/texture-asset-editor-in-unreal-engine#%E7%AA%97%E5%8F%A3)
-   [工具栏](/documentation/zh-cn/unreal-engine/texture-asset-editor-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%A0%8F)
-   [视口](/documentation/zh-cn/unreal-engine/texture-asset-editor-in-unreal-engine#%E8%A7%86%E5%8F%A3)
-   [细节面板](/documentation/zh-cn/unreal-engine/texture-asset-editor-in-unreal-engine#%E7%BB%86%E8%8A%82%E9%9D%A2%E6%9D%BF)
# 虚幻引擎UMG中的控件蓝图 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/widget-blueprints-in-umg-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:17:24.169Z

---

目录

![控件蓝图](https://dev.epicgames.com/community/api/documentation/image/e5764509-863d-470e-a6cb-b91571e37695?resizing_type=fill&width=1920&height=335)

首先，你应该创建一个 **控件蓝图（Widget Blueprint）**，如下所示。有了它之后，你便可以开始使用 **虚幻示意图形（Unreal Motion Graphics (UMG)）**.

1.  创建 **控件蓝图（Widget Blueprint）**。在 **内容浏览器（Content Browser）** 中点击 **添加（Add）**，然后选择 **用户界面（User Interface） > 控件蓝图（Widget Blueprint）**。
    
    ![Create Widget Blueprint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f68ab07-2f2f-4e67-bf7c-2c9e9a7563d7/ue5_1-01-create-widget-blueprint.png "Create Widget Blueprint")
    
    除了点击 **添加（Add）** 按钮以外，你还可以在 **内容浏览器（Content Browser）** 中右键点击。
    
2.  你可以重命名在内容浏览器中创建的控件蓝图，也可以使用默认名称。
    
    ![Name created Widget Blueprint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e24508a-8b77-4753-af49-1977adb06e48/ue5_1-02-rename-widget-blueprint.png "Name created Widget Blueprint")
3.  **双击** 创建的 **控件蓝图（Widget Blueprint）** 来将其在 **控件蓝图编辑器（Widget Blueprint Editor）** 中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d661ef72-31c0-4663-817b-cafc64dd8629/ue5_1-03-widget-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d661ef72-31c0-4663-817b-cafc64dd8629/ue5_1-03-widget-editor.png)
    
    *点击查看大图。*
    

## 控件蓝图编辑器

**设计器（Designer）** 选项卡是在 **控件蓝图编辑器（Widget Blueprint Editor）** 中默认打开。利用这些编辑器工具，你可以自定义UI的外观。另外，你可以根据你调整的布局来预览游戏内画面。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/686ec8c5-4f0e-4dea-950c-86cd7adb1ce7/ue5_1-04-widget-editor-scheme.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/686ec8c5-4f0e-4dea-950c-86cd7adb1ce7/ue5_1-04-widget-editor-scheme.png)

*点击查看大图。*

数字

窗口

描述

**1**

**菜单栏（Menu Bar）**

包含常用的菜单选项。

**2**

**工具栏（Tool Bar）**

包含蓝图编辑器一些常用的功能，比如 **编译（Compile）**、**保存（Save）**、**浏览（Browse）**、**播放（Play）** 等等。

**3**

**编辑器模式（Editor Mode）**

切换蓝图编辑器的 **设计器（Designer)** 和 **图形（Graph）** 模式。

**4**

**调色板（Palette）**

包含一个控件列表，可以将其中的控件拖放到 **视觉设计器（Visual Designer）** 中。显示继承自UWidget的所有类。

**5**

**层级（Hierarchy）**

显示用户控件的层级结构。可以将控件从 **调色板（Palette）** 拖动到此面板。

**6**

**视觉设计器（Visual Designer）**

这里显示布局的视觉呈现。在此窗口中可以操纵已拖动到视觉设计器中的控件。

**7**

**详情（Details）**

显示当前所选控件的属性。也可以在该面板调整属性。

**8**

**动画（Animations）**

UMG的动画轨道，用于设置控件的关键帧动画。

**视觉设计器（Visual Designer）** 窗口默认按 1:1 比例显示，但是可以按住 **Ctrl** 键并使用 **鼠标滚轮** 来更改比例大小。

下图为 **控件蓝图编辑器（Widget Blueprint Editor）** 的 **图形（Graph）** 选项卡。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f5190f9-981e-4695-a7f0-2e1e567a2d94/ue5_1-05-widget-editor-graph.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f5190f9-981e-4695-a7f0-2e1e567a2d94/ue5_1-05-widget-editor-graph.png)

*点击查看大图。*

图形选项卡的功能与蓝图编辑器的设计器选项卡类似。有关图形选项卡基本功能的信息，请参阅 [蓝图编辑器图表编辑器](/documentation/zh-cn/unreal-engine/graph-editor-for-the-blueprints-visual-scripting-editor-in-unreal-engine) 文档。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [控件蓝图编辑器](/documentation/zh-cn/unreal-engine/widget-blueprints-in-umg-for-unreal-engine#%E6%8E%A7%E4%BB%B6%E8%93%9D%E5%9B%BE%E7%BC%96%E8%BE%91%E5%99%A8)
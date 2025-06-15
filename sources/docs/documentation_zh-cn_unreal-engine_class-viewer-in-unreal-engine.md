# 虚幻引擎中的类查看器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/class-viewer-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:57:56.230Z

---

目录

![类查看器](https://dev.epicgames.com/community/api/documentation/image/4bae8455-bb44-43b7-88ee-96ccdbd0fb97?resizing_type=fill&width=1920&height=335)

虚幻引擎中的 **类查看器（Class Viewer）** 用于以下操作：

-   查看编辑器使用的类的层级列表。
-   创建并打开蓝图。
-   打开关联C++头文件，并基于特定类创建新的C++类。

## 打开类查看器

要打开类查看器（Class Viewer），请从虚幻引擎的主菜单前往 **工具（Tools）> 类查看器（Class Viewer）** 。

## 类查看器界面

![类查看器窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b17a5515-049c-4d86-9723-bb8ef6c0bd1c/ue5_1-class-viewer-window.png)

类查看器界面包括以下区域：

**编号**

**名称**

**说明**

1

过滤器和搜索栏

使用 **过滤器（Filters）** 下拉菜单限制显示以下一项或多项的类：

-   Actor
-   可放置Actor
-   蓝图基类

使用 **搜索（Search）** 栏按名称找到类。

2

设置按钮

点击此按钮打开 **设置（Settings）** 菜单，你可以通过该菜单执行以下操作：

-   展开或折叠全部类。
-   显示或隐藏内部类。
-   显示使用开发人员文件夹的其他开发人员的类。

3

类视图

显示符合你所选条件的所有类。

## 类操作

![展开类](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a60f5ff7-f8dc-45d7-88fa-e2c86ade21e5/ue5_1-class-viewer-working-with-classes.png)

如果类有子项，点击类名称（1）左侧的下拉箭头，显示该类的子项。

点击类名称（2）右侧的下拉箭头或右键点击类名称，打开带有下述选项的上下文菜单。

根据类类型（蓝图或C++），你可执行的类操作会有所不同。

**选项（Option）**

**蓝图类（Blueprint Class）**

**C++类（C++ Class）**

**创建蓝图（Create Blueprint）**

创建以所选蓝图为父级的新蓝图。

创建以所选蓝图为父级的新蓝图。

**编辑蓝图（Edit Blueprint）**

在[蓝图编辑器](/documentation/zh-cn/unreal-engine/user-interface-reference-for-the-blueprints-visual-scripting-editor-in-unreal-engine)中打开所选蓝图。

不适用

**在内容浏览器中查找（Find in Content Browser）**

在[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)中查找蓝图Actor。

不适用

**打开源代码（Open Source Code）**

不适用

在Visual Studio中打开类头文件。

**新建C++类（Create New C++ Class）**

不适用

打开[C++类向导](/documentation/zh-cn/unreal-engine/using-the-cplusplus-class-wizard-in-unreal-engine)，创建以所选类为父类的新类。

### 拖放类

从类查看器（Class Viewer）中点击蓝图类并将其拖放至视口，将该类的新蓝图Actor添加到当前打开的关卡。

如果一个类是与组合框关联的类的子项，你还可以将该类从类查看器（Class Viewer）拖放到细节（Details）面板或世界设置（World Settings）的组合框中。例如，你可以将 `GameMode` 子类拖放到世界设置（World Settings）中的"游戏模式覆盖（GameMode Override）"组合框中。

当将类拖放到组合框中时，需注意以下事项：

-   未加载的类不会在组合框中显示。
-   将类拖放到组合框中，将强制加载该类。

## 使用类选择器

"类选择器（Class Picker）"是仅使用代码就可切换到"类查看器（Class Viewer）"的模式。类选择器（Class Picker）将显示可用类的列表，例如，可用于转换静态网格体或可为新蓝图选择父项的类。

使用类选择器需要了解如何在虚幻引擎中使用C++。

### 配置类选择器

`FClassViewerInitializationOptions` 用于初始化类选择器，具有控制类选择器行为的以下选项：

**选项**

**说明**

`模式（Mode）`

默认情况下，设置为 `ClassPicker` 。

你可以将此更改为 `ClassBrowsing` ，这会生成一个常规类查看器。请注意，下面大多数选项在类查看器中不运行。

`显示模式（DisplayMode）`

你可以从以下选项中选择：

-   `TreeView` ，将显示类之间的父子项关系。
-   `ListView` ，将显示类的简单列表。

你可以使用以下过滤器配置在类选择器中显示哪些类：

**过滤器**

**说明**

`bIsActorsOnly`

仅显示属于 `Aactor` 子项的类。

`bIsPlaceableOnly`

仅显示可放置在关卡中的类。如果此项为 `true` ， `bIsActorsOnly` 也将被认定为 `true` 。

`bIsBlueprintBaseOnly`

仅显示蓝图基类。当你仅想查看可用于创建蓝图的类时，此项非常有用。

`bShowUnloadedBlueprints`

显示未加载的蓝图，即使它们的父项由于自定义过滤器的原因被过滤掉也不例外。

`bShowNoneOption`

在类选择器中显示 **无（None）** 选项。不影响类查看器。当你选择某项时，将传递 `NULL` 类。

-   [](https://dev.epicgames.com/community/search)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [打开类查看器](/documentation/zh-cn/unreal-engine/class-viewer-in-unreal-engine#%E6%89%93%E5%BC%80%E7%B1%BB%E6%9F%A5%E7%9C%8B%E5%99%A8)
-   [类查看器界面](/documentation/zh-cn/unreal-engine/class-viewer-in-unreal-engine#%E7%B1%BB%E6%9F%A5%E7%9C%8B%E5%99%A8%E7%95%8C%E9%9D%A2)
-   [类操作](/documentation/zh-cn/unreal-engine/class-viewer-in-unreal-engine#%E7%B1%BB%E6%93%8D%E4%BD%9C)
-   [拖放类](/documentation/zh-cn/unreal-engine/class-viewer-in-unreal-engine#%E6%8B%96%E6%94%BE%E7%B1%BB)
-   [使用类选择器](/documentation/zh-cn/unreal-engine/class-viewer-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%B1%BB%E9%80%89%E6%8B%A9%E5%99%A8)
-   [配置类选择器](/documentation/zh-cn/unreal-engine/class-viewer-in-unreal-engine#%E9%85%8D%E7%BD%AE%E7%B1%BB%E9%80%89%E6%8B%A9%E5%99%A8)
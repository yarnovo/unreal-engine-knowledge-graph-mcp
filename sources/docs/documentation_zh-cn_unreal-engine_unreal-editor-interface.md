# 虚幻编辑器界面 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-editor-interface
> 
> 生成时间: 2025-06-14T18:49:42.364Z

---

目录

![虚幻编辑器界面](https://dev.epicgames.com/community/api/documentation/image/0bd516a7-1276-496d-8ba7-a29180d5d56b?resizing_type=fill&width=1920&height=335)

本页面介绍**虚幻引擎5界面**中最常见的元素及其作用。 此外，还提供了用于提供更多信息的其他页面的链接。 本页面中介绍的部分元素（例如面板和菜单栏）在引擎的不同部分中往往都是相同的。 你应该花一些时间熟悉其一般用途和功能，尤其是如果你是使用虚幻引擎开发游戏和应用程序的新手。

首次打开虚幻引擎5时，将会打开**关卡编辑器（Level Editor）**。 你将看到以下窗口：

[![默认虚幻编辑器界面](https://dev.epicgames.com/community/api/documentation/image/96096fb3-6dc6-4d36-8a28-7098232f4da2?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/96096fb3-6dc6-4d36-8a28-7098232f4da2?resizing_type=fit)

*虚幻引擎5中的默认虚幻编辑器界面。 点击查看大图。*

编号

名称

说明

1

**菜单栏**

使用这些菜单访问编辑器专用的命令和功能。

2

**主工具栏**

包含虚幻引擎中部分最常用工具和编辑器的快捷方式，以及用于进入**播放（Play）**模式（在虚幻编辑器中运行游戏）和用于将项目部署到其他平台的快捷方式。

3

**关卡视口**

显示关卡的内容，例如摄像机、Actor、静态网格体等。

4

**内容侧滑菜单**按钮

打开**内容侧滑菜单（Content Drawer）**，可以在其中访问项目中的所有资产。

5

**底部工具栏**

包含命令控制台、输出日志和派生数据功能的快捷方式。 此外还显示源控制状态。

6

**大纲视图**

显示关卡中所有内容的分层树状图。

7

**细节**面板

在选择Actor时显示。 显示该Actor的各种属性，例如**变换（Transform）**（在关卡中的位置）、静态网格体、材质和物理设置。 此面板显示不同设置，具体取决于你在关卡视口中选择的内容。

## 菜单栏

[![虚幻编辑器中的菜单栏](https://dev.epicgames.com/community/api/documentation/image/ea88eb2a-6d01-474a-b675-78d825bc353a?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ea88eb2a-6d01-474a-b675-78d825bc353a?resizing_type=fit)

虚幻引擎中的每个编辑器都有一个**菜单栏**，位于该编辑器窗口右上角（Windows）或屏幕顶部（macOS）。 部分菜单会出现在所有编辑器窗口中，而不仅仅是关卡编辑器中，例如**文件（File）**、**窗口（Window）**和**帮助（Help）**。 其他菜单则是编辑器特有的。

## 主工具栏

**主工具栏**包含虚幻编辑器中部分最常使用的工具和命令的快捷方式。 其中包含以下几个区域：

[![虚幻编辑器中的主工具栏](https://dev.epicgames.com/community/api/documentation/image/d08e8e23-7cff-4307-a7c1-21eb7f8c0295?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/d08e8e23-7cff-4307-a7c1-21eb7f8c0295?resizing_type=fit)

### 1\. 保存按钮

点击此按钮即可保存当前打开的关卡。

### 2\. 模式选择

包含的快捷方式用于在不同的模式之间快速切换，以编辑关卡中的内容：

-   选择编辑
    
-   地形编辑
    
-   植被编辑
    
-   网格体绘制（Mesh Painting）
    
-   破裂编辑
    
-   笔刷编辑（Brush Editing）
    

### 3\. 内容快捷方式

包含用于添加和打开关卡编辑器中常见内容类型的快捷方式。

快捷键

说明

**创建**

从常见资产列表中进行选择，以快速添加到关卡。 此外还可以在此菜单中访问**放置Actor（Place Actors）**面板。

**蓝图**

创建和访问蓝图。

**过场动画**

创建关卡序列或主序列过场动画。

### 4\. 播放模式功能按钮

包含用于在编辑器中运行游戏的快捷方式按钮（播放、跳过、停止和弹出）。

### 5\. 平台菜单

包含一系列选项，可以用于配置、准备项目并将其部署到不同的平台，例如台式机、台式设备或主机。

### 6\. 设置

包含虚幻编辑器、关卡编辑器视口和游戏行为的各种设置。

## 关卡视口

**关卡视口（Level Viewport）**显示当前打开的关卡的内容。 在虚幻引擎中打开项目时，项目的默认关卡默认在关卡视口中打开。 在这里可以查看和编辑活跃关卡的内容，无论是在游戏环境中、产品可视化应用中还是其他位置。

关卡视口通常以两种不同的方式显示关卡的内容：

-   **透视（Perspective）**，这是3D视图，你可以在其中导航，从不同角度查看视口的内容。
    
-   **正交（Ortographic）**，这是2D视图，沿着一个主轴（X、Y或Z）俯视。
    

[![虚幻引擎5中的透视和正交视口](https://dev.epicgames.com/community/api/documentation/image/22cec1a4-5890-4e3b-8769-66d44926eb80?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/22cec1a4-5890-4e3b-8769-66d44926eb80?resizing_type=fit)

*虚幻引擎5中关卡视口的不同视图。 顶部：角度视图。 底部：自上而下的直角视图。 点击查看大图。*

## 内容侧滑菜单/内容浏览器

**内容浏览器（Content Browser）**是文件浏览器窗口，可以显示项目中包含的所有资产、蓝图和其他文件。 可以使用内容浏览器来浏览内容、将资产拖动到关卡中、在项目之间迁移资产以及执行其他操作。

[![虚幻引擎5中的内容浏览器窗口](https://dev.epicgames.com/community/api/documentation/image/2497ee02-d040-4cb2-a315-ae7f0ba2b719?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/2497ee02-d040-4cb2-a315-ae7f0ba2b719?resizing_type=fit)

*虚幻引擎5中的内容浏览器窗口。 点击查看大图。*

**内容侧滑菜单（Content Drawer）**按钮位于虚幻编辑器的左下角，可以打开内容浏览器的一个特殊实例，该实例在非焦点状态下时（即点击其他位置后）就会自动最小化。 要使该实例保持打开状态，请点击内容侧滑菜单右上角的**停靠在布局中（Dock in Layout）**按钮。 这会创建内容浏览器的新实例，但你仍然可以打开新的内容侧滑菜单（Content Drawer）。

## 底部工具栏

底部菜单栏包含命令控制台、输出日志和派生数据功能的快捷方式。 此外还显示源控制状态。 其中包含以下几个区域：

[![虚幻引擎5中的底部工具栏](https://dev.epicgames.com/community/api/documentation/image/d819cf52-9695-44ac-b69f-32bba57568ff?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/d819cf52-9695-44ac-b69f-32bba57568ff?resizing_type=fit)

编号

名称

说明

1

**输出日志**

调试工具，可以在应用程序运行时打印有用的信息。

2

**命令控制台**

操作与其他命令行界面一样：输入控制台命令可触发特定的编辑器行为。

键入`help`并按**Enter**键即可在浏览器中打开可用控制台命令的列表。

3

**派生数据**

提供[派生数据](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/derived-data-settings-in-the-unreal-engine-project-settings)功能。

4

**源码控制状态**

如果项目连接到源控制（例如GitHub或Perforce），则显示源控制状态。 否则，将提示*源码控制关闭（Source Control Off）*。

## 大纲视图

**大纲视图（Outliner）**面板（以前称为"世界大纲视图"）显示关卡中所有内容的分层视图。 默认情况下，此面板位于虚幻编辑器窗口的右上角。 你可以最多打开四个不同的大纲界面，每个大纲的布局和过滤设置都可以不一样。

[![虚幻引擎5中的大纲视图面板](https://dev.epicgames.com/community/api/documentation/image/b1767b22-c336-426e-867d-008db94f1271?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/b1767b22-c336-426e-867d-008db94f1271?resizing_type=fit)

此外，还可以使用大纲面板执行以下操作：

-   点击关联的**眼睛**按钮可快速隐藏或显示Actor。
    
-   右键点击Actor即可访问该Actor的**上下文菜单**。 然后，可以从该菜单中执行其他特定于Actor的操作。
    
-   创建、移动和删除内容文件夹。
    

## 细节面板

在关卡视口中选择一个Actor之后，**细节（Details）**面板将会显示影响所选Actor的设置和属性。 默认情况下，该面板位于虚幻编辑器窗口右侧的**世界大纲视图（World Outliner）**面板下。

[![Actor的细节面板](https://dev.epicgames.com/community/api/documentation/image/cb20b098-7535-46ea-ae34-7800bdbe8806?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/cb20b098-7535-46ea-ae34-7800bdbe8806?resizing_type=fit)

*此示例显示立方体静态网格体Actor的"细节（Details）"面板。 选择立方体静态网格体之后，细节面板将停靠在虚幻编辑器的右侧。 点击查看大图。*

[

![取色器](images/static/document_list/empty_thumbnail.svg)

取色器

用于选择颜色并将其指定给Actor颜色的工具。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/color-picker-in-unreal-engine)

-   [用户界面](https://dev.epicgames.com/community/search?query=%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [菜单栏](/documentation/zh-cn/unreal-engine/unreal-editor-interface#menu-bar)
-   [主工具栏](/documentation/zh-cn/unreal-engine/unreal-editor-interface#main-toolbar)
-   [1\. 保存按钮](/documentation/zh-cn/unreal-engine/unreal-editor-interface#1-save-button)
-   [2\. 模式选择](/documentation/zh-cn/unreal-engine/unreal-editor-interface#2-mode-selection)
-   [3\. 内容快捷方式](/documentation/zh-cn/unreal-engine/unreal-editor-interface#3-content-shortcuts)
-   [4\. 播放模式功能按钮](/documentation/zh-cn/unreal-engine/unreal-editor-interface#4-play-mode-controls)
-   [5\. 平台菜单](/documentation/zh-cn/unreal-engine/unreal-editor-interface#5-platforms-menu)
-   [6\. 设置](/documentation/zh-cn/unreal-engine/unreal-editor-interface#6-settings)
-   [关卡视口](/documentation/zh-cn/unreal-engine/unreal-editor-interface#level-viewport)
-   [内容侧滑菜单/内容浏览器](/documentation/zh-cn/unreal-engine/unreal-editor-interface#content-drawer-and-content-browser)
-   [底部工具栏](/documentation/zh-cn/unreal-engine/unreal-editor-interface#bottom-toolbar)
-   [大纲视图](/documentation/zh-cn/unreal-engine/unreal-editor-interface#outliner)
-   [细节面板](/documentation/zh-cn/unreal-engine/unreal-editor-interface#details-panel)

相关文档

[

内容浏览器

![内容浏览器](https://dev.epicgames.com/community/api/documentation/image/133ace36-135f-4673-9d72-c841fdb16066?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)
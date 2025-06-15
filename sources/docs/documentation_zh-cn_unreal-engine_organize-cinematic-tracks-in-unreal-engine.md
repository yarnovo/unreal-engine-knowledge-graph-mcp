# 管理虚幻引擎中的过场动画轨道 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/organize-cinematic-tracks-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:12:11.551Z

---

目录

![文件夹轨道](https://dev.epicgames.com/community/api/documentation/image/82515ee9-0f09-44bf-bd47-868e22c9916b?resizing_type=fill&width=1920&height=335)

Sequencer中的文件夹轨道用于整理自定义文件夹中的内容和其他轨道。本页面概述了文件夹轨道的创建方法与用法。

#### 先决条件

-   你已了解 **[Sequencer](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)** 及其 **[界面](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine)**。

## 创建

最常用的文件夹轨道创建方法是，点击Sequencer中的 **\+ 轨道（+ Track）** 按钮，然后选择 **添加文件夹（Add Folder）**。

![Sequencer创建文件夹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18dd8b41-a4c9-409e-9a80-df5c0d0737e2/createfolder1.png)

右键点击单个轨道或一组轨道，然后选择 **移动到文件夹（Move to Folder）> 新建文件夹（New Folder）**，也可以创建文件夹。这样做将创建一个新的文件夹轨道，选定的轨道会移动到它下面。

![Sequencer移动到新文件夹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b1e5abc-055c-4b10-9dde-fcb9e03e48b1/createfolder2.png)

你也可以选择一个或多个轨道，然后在键盘上按 **Ctrl + G**。这样做将创建一个新的文件夹，选定的轨道会移动到它下面。

![Sequencer文件夹轨道热键](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5e75781-7af9-432d-b09c-c25fd93aee57/ctrlg.gif)

右键点击文件夹，选择 **添加文件夹（Add Folder）**，这还会在该文件夹轨道上创建一个子文件夹。

![Sequencer子文件夹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c64e337-d709-47ff-a182-e466d12d69a8/createfolder3.png)

## 用途

文件夹轨道支持各种直观的移动和整理操作。

### 重命名

与大多数最高层级的轨道一样，三击轨道文本，右键点击后选择 **重命名（Rename）** 或按 **F2** 可重命名文件夹。

![重命名Sequencer文件夹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb1ef18a-3eb7-4f7c-a751-83ec616b7162/rename.png)

### 添加到文件夹

将轨道拖动到Sequencer大纲视图中的文件夹，可以将轨道添加到文件夹中。

![将轨道添加到文件夹拖动](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80813e4d-5e39-4e6c-8989-0b8d501eace0/dragdrop1.gif)

右键点击轨道并从 **移动到文件夹（Move to Folder）** 菜单中选择文件夹，这样也可以将轨道添加到任何现有文件夹中。

![移动到文件夹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2325ea9e-71f2-4919-820a-6d4600f830ec/movetofolder.png)

### 从文件夹删除

将轨道从文件夹拖到Sequencer大纲视图中的空白区域，即可从文件夹中删除轨道。

![删除轨道文件夹拖动](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b161db84-f6d7-4839-9791-9ef6d1cf890a/dragdrop2.gif)

### 设置文件夹颜色

你可以为每个文件夹轨道的图标应用颜色，以便于区分。

为此，请右键点击文件夹后选择 **设置颜色（Set Color）**。此时会出现"颜色拾取器"窗口，你可以从中选择颜色。选择颜色后，点击 **确定（OK）** 按钮，文件夹图标将变为所选颜色。

![Sequencer文件夹颜色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/472e5048-0616-46e2-85da-aaca9c74bff9/color.gif)

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [track](https://dev.epicgames.com/community/search?query=track)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/organize-cinematic-tracks-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [创建](/documentation/zh-cn/unreal-engine/organize-cinematic-tracks-in-unreal-engine#%E5%88%9B%E5%BB%BA)
-   [用途](/documentation/zh-cn/unreal-engine/organize-cinematic-tracks-in-unreal-engine#%E7%94%A8%E9%80%94)
-   [重命名](/documentation/zh-cn/unreal-engine/organize-cinematic-tracks-in-unreal-engine#%E9%87%8D%E5%91%BD%E5%90%8D)
-   [添加到文件夹](/documentation/zh-cn/unreal-engine/organize-cinematic-tracks-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%88%B0%E6%96%87%E4%BB%B6%E5%A4%B9)
-   [从文件夹删除](/documentation/zh-cn/unreal-engine/organize-cinematic-tracks-in-unreal-engine#%E4%BB%8E%E6%96%87%E4%BB%B6%E5%A4%B9%E5%88%A0%E9%99%A4)
-   [设置文件夹颜色](/documentation/zh-cn/unreal-engine/organize-cinematic-tracks-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E6%96%87%E4%BB%B6%E5%A4%B9%E9%A2%9C%E8%89%B2)
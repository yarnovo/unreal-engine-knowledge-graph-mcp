# 使用Live Link将Motionbuilder内容流送到虚幻引擎 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/live-link-stream-motionbuilder-to-unreal-engine
> 
> 生成时间: 2025-06-14T20:08:15.738Z

---

目录

在本方法说明中，我们将完成设置流程，使用Live Link插件将虚幻引擎4 (UE4)连接到Motionbuilder (Mobu)。一旦建立了连接，即可从Motionbuilder将内容实时流送到UE4中，让您可以在UE4中预览您的内容，而无需导出内容然后再将内容导入到引擎。

![motionbuilder live link unreal](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/890aa604-3e96-471e-b808-bc65df6b1c6a/overview.gif)

对于本指南，我们使用的是蓝图第三人称模板项目和Mobu 2017。

Live Link也适用于其他版本的Mobu和其他DDC工具。详情请参阅[Live Link插件](/documentation/zh-cn/unreal-engine/live-link-in-unreal-engine)文档页面。

## 1 - 项目设置

1.  在您的UE4项目中，从 **编辑（Edit）** 下的 **菜单栏（Menu Bar）**，选择 **插件（Plugins）**。
    
    ![](Step_01-1.png)
2.  在 **动画（Animation）** 部分下，针对 **Live Link** 单击 **已启用（Enabled）**，然后重启编辑器。
    
    ![](Step_02-3.png)
    
    这将启用Live Link插件以连接到外部数字内容创建（DCC）工具。为了将您的DCC工具连接到UE4，您将需要启用对应插件。在本方法说明中，我们将与Motionbuilder建立连接，然而您也可以连接到Maya或您自己的工具（如果该工具有Live Link的公开源）。 
    
3.  在 **内容（Content）> 人物模型（Mannequin）> 动画（Animations）**文件夹下的 **内容浏览器（Content Browser）** 中，打开 **第三人称行走（ThirdPersonWalk）** 动画。
    
    ![](ThirdPersonWalkImage.png)
4.  从工具栏中单击 **导出资源（Export Asset）**，然后选择 **预览网格体（Preview Mesh）** 并选择保存位置。 
    
    ![](MobuHowTo_03.png)
5.  启用 **导出预览网格体（Export Preview Mesh）** 选项，然后点击 **导出（Export）** 来导出动画和网格体。
    
    ![](MobuHowTo_03b.png)
6.  从 [GitHub元库](https://github.com/ue4plugins/MobuLiveLink) 下载 **Motionbuilder** 插件并将zip文件解压缩到您的计算机。
    
    ![](MobuFiles.png)
    
    解压缩zip文件后，您将找到各个不同版本Motionbuilder的文件夹，以及设置Mobu内插件所需的插件文件。
    
    最新版的插件只适用于UE 4.23。更早的UE版本需要使用1.0版插件。
    
7.  在 **Motionbuilder** 内的 **设置（Settings）** 下，选择 **首选项...（Preferences...）**
    
    ![](MobuHowTo_04.png)
8.  在 **SDK** 下，单击 **添加（Add）** 按钮并指向已解压缩的文件夹路径和您的Motionbuilder版本。 
    
    ![](MobuHowTo_05.png)
    
    一旦在窗口中看到路径，单击 **确定（Ok）**。 
    
    ![](MobuHowTo_05b.png "MobuHowTo_05b.png")
9.  在确认窗口上，单击 **确定（Ok）**，然后重启Motionbuilder使更改生效。 
    
    ![](MobuHowTo_05c.png)
    
    在 **资源浏览器（Asset Browser）** 中的 **设备（Devices）** 下，您现在可看到 **UE - LiveLink** 资源。 
    
    ![](MobuHowTo_05d.png)
    
    这使您可以定义您想要从场景中流送到UE4的内容。 
    
10.  **打开（Open）** 从UE4中导出的 **ThirdPersonWalk\_PreviewMesh**，然后单击 **打开选项（Open Options）** 菜单上的 **打开（Open）**。
    
    ![](MobuHowTo_06.png)
    
    这会将角色网格体和动画导入到Motionbuilder。 
    
    ![](MobuHowTo_06b.png)
11.  在 **资源浏览器（Asset Browser）** 中的 **元素（Elements）** 下，将一个 **摄像机（Camera）** 拖动到视口中。 
    
    ![](MobuHowTo_07.png)
    
    将此摄像机移动到任何所需位置，因为这将是我们可以在UE4内切换和预览的替换摄像机。 
    
    ![](MobuHowTo_07b.png)
    
    下一步，我们将设置UE - LiveLink资源，以定义要流送到UE4的元素。 
    

## 2 - Mobu Live Link设置

1.  在Motionbuilder的 **资源浏览器（Asset Browser）** 内，将 **UE - LiveLink**  资源拖动到视口中。 
    
    ![](MobuHowTo_08.png)
    
    这将打开Live Link连接（Live Link Connection）窗口，您可在 **设备（Devices）** 部分下找到该窗口。 
    
    [![](MobuHowTo_08b.png)](MobuHowTo_08b.png)
    
    单击图像显示全视图。
    
2.  在连接（Connection）窗口中单击 **...**（选择器）按钮，并选择 **根（Root）** 骨骼和 **摄像机（Camera）**，然后单击 **添加（Add）** 按钮。 
    
    ![](MobuHowTo_09.png)
    
    这将把这两者添加为主题，以流送到UE4。注意，将根据您正在试图流送的内容自动检测流类型。 
    
    ![](MobuHowTo_10.png)
    
    -   **主题名称（Subject Name）** 是它将在UE4中显示的名称。
    -   **流类型（Stream Type）** 是发送的数据类型。
    -   **状态（Status）** 是主题是否处于活动状态，可进行流动。 
    
    利用流类型，将根据您正在流送的内容类型自动检测它。但您可以选择流类型，并会根据您的内容看到不同的选项。 
    
    一些示例包括： 
    
    流类型
    
    说明
    
    **仅根（Root Only）**
    
    将仅流送根变换。
    
    **全层级（Full Hierarchy）**
    
    将捕获主题的所有子项，并流送变换及其拥有的任何可动画属性。
    
    **骨架层级（Skeleton Hierarchy）**
    
    流送主题的所有子骨骼，并检查确认它们确实是骨骼（以骨骼为父项，但不是骨骼的内容将被忽略）。
    
    **摄像机（Camera）**
    
    与仅根类似，但是在在摄像机属性（例如Filmback Settings中流送。
    
3.  在 **根（Root）** 对象的 **主题名称（Subject Name）** 字段中，将来自根（Root）的名称更改为 **角色（Character）**。
    
    ![](MobuHowTo_10b.png)
4.  单击 **在线（Online）** 旁的按钮启用内容流送。 
    
    ![](MobuHowTo_11.png)
    
    在线状态（Online status）按钮将从红色（离线）更改为绿色（在线）。 
    
5.  在导航器（Navigator）窗口 **系统（System）** 下，启用 **始终刷新查看器（Always refresh viewer）** 选项。 
    
    ![](MobuHowTo_12.png)
    
    当您在使用Live Link流送内容时，您将需要启用此选项，因为当Motionbuilder变成后台应用程序时将导致失去焦点，造成性能限制，最后引起流送过程卡顿。
    

## 3 - 将内容流送到UE4

1.  当Mobu在后台运行时，在UE4内，从 **文件（File）** 菜单的 **窗口（Window）** 下，选择 **Live Link（Live Link）**。 
    
    ![](MobuHowTo_13.png)
    
    这将打开Live Link流送管理器（Live Link Streaming Manager），使您能够连接到正在运行的Motionbuilder实例。 
    
2.  单击 **添加源（+ Source）** 按钮，然后在 **消息总线源（Message Bus Source）** 下，选择您的Mobu实例并单击 **确定（Ok）**。 
    
    ![](MobuHowTo_14.png)
    
    流送管理器将更新，以显示正在流送到UE4的已连接源类型和主题。 
    
    ![](MobuHowTo_14b.png)
    
    参阅[Live Link概述](/documentation/zh-cn/unreal-engine/live-link-in-unreal-engine)页面，了解关于Live Link选项、角色和状态指示器的更多详情。
    
3.  在 **内容浏览器（Content Browser）** 中的 **内容（Content）> 人物模型（Mannequin）> 角色（Character）> 网格体（Mesh）** 下，打开 **SK\_Mannequin** 资源。 
    
    ![](SK_MannequinImage.png)
4.  在 **预览场景设置（Preview Scene Settings）** 选项卡上，使用以下设置： 
    
    ![](MobuHowTo_15.png)
    
    -   预览控制器（Preview Controller）：**Live Link预览控制器（Live Link Preview Controller）**
    -   主题名称（Subject Name）：**角色（Character）**
    -   启用摄像机同步（Enable Camera Sync）：**已启用（Enabled）**
    
    这使我们可以获取Mobo中名为角色（Character）的主题，并将其流送到UE4，使用Live Link控制器预览它。我们还从Mobu的活动摄像机中流送。 
    

您还可以使用 [蓝图函数](/documentation/zh-cn/unreal-engine/using-live-link-data-in-unreal-engine) 建立连接，而非通过Live LinkUI（Live Link UI）窗口手动连接。 除了使用预览控制器，你也可以使用[Live Link组件](/documentation/zh-cn/unreal-engine/live-link-in-unreal-engine#livelink%E7%BB%84%E4%BB%B6)附加到Actor上。

## 4 - 最终结果

Motionbuilder和UE4都处于活动状态并已连接Live Link，现在您可以在UE4中从Mobu实时预览内容。在下方的视频中，我们能够在Mobu中操作摄像机并在UE4中反映，我们还能更改摄像机视角，并同样在UE4中实现更新。在Mobu擦除动画会反映到UE4中，我们可以调整骨骼变换或制作新姿势的关键帧，这些也会反映到UE4中。 

您还可直接在Mobu中控制骨骼，并可看到这些更改反映到UE4中。这使您能够在Mobu中制作动画的关键帧，同时实时预览这些关键帧动画在UE4中的样子。 

-   [live link](https://dev.epicgames.com/community/search?query=live%20link)
-   [motionbuilder](https://dev.epicgames.com/community/search?query=motionbuilder)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1 - 项目设置](/documentation/zh-cn/unreal-engine/live-link-stream-motionbuilder-to-unreal-engine#1-%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [2 - Mobu Live Link设置](/documentation/zh-cn/unreal-engine/live-link-stream-motionbuilder-to-unreal-engine#2-mobulivelink%E8%AE%BE%E7%BD%AE)
-   [3 - 将内容流送到UE4](/documentation/zh-cn/unreal-engine/live-link-stream-motionbuilder-to-unreal-engine#3-%E5%B0%86%E5%86%85%E5%AE%B9%E6%B5%81%E9%80%81%E5%88%B0ue4)
-   [4 - 最终结果](/documentation/zh-cn/unreal-engine/live-link-stream-motionbuilder-to-unreal-engine#4-%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
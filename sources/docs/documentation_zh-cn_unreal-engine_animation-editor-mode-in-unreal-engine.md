# 虚幻引擎中的动画编辑器模式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:15:37.226Z

---

目录

![虚幻引擎中的动画编辑器模式](https://dev.epicgames.com/community/api/documentation/image/32135b71-aaff-4754-be4e-1d6c4f97e07f?resizing_type=fill&width=1920&height=335)

**动画模式（Animation Mode）** 是虚幻引擎中的一种[模式](/documentation/zh-cn/unreal-engine/level-editor-modes-in-unreal-engine)，它提供了有助于执行动画工作流程的新工具、面板和编辑器行为。在通过控制绑定进行动画制作时使用此模式可提供更专注于动画的编辑器体验，其中提供的选项卡可帮助用户选择控制点、变换显示和启动工具。

本文概述了动画模式，包括其用户界面、工具和设置。

#### 先决条件

-   你已创建一个 **控制绑定资产** 。请参阅[控制绑定快速入门指南](/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine)页面以了解如何执行此操作。
-   动画模式主要依赖于在Sequencer中使用控制绑定，因此需要掌握Sequencer的[基本知识](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)。

## 启用动画模式

可以通过以下方式启用动画模式：

1.  将一个控制绑定资产从[内容浏览器（Content Browser）](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)拖到关卡中。随即会创建一个新的[关卡序列](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)，请添加具有 **控制绑定轨道** 的角色，然后启用动画模式。
    
    ![启用动画模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65393ff2-f3d1-4239-9fb3-823b733c9ad1/enable1.gif)
    
2.  在Sequencer中选择一个控制绑定轨道。
    
    ![启用动画模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e949874b-4cac-4696-aab2-27f665cda7ce/enable2.gif)
    
3.  点击 **模式（Mode）** 下拉菜单并选择 **动画（Animation）** 手动启用动画模式。或者，也可以按 **Shift + 7** 。
    
    ![启用动画模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92f1bbab-d194-4814-8cc5-8c82ebe18907/enable3.png)
    

点击选择 **模式（Mode）** 下拉菜单并单击 **选择（Select）** ，按 **Shift + 1** ，可以禁用动画模式并恢复正常关卡编辑模式。

![禁用动画模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9dbb3967-943a-48d3-8fde-a2116c2e7748/disable.png)

## 动画模式概述

动画模式是一种关卡编辑器[模式](/documentation/zh-cn/unreal-engine/level-editor-modes-in-unreal-engine)，包含专门的编辑界面和工作流程。激活该模式将向虚幻编辑器界面添加以下面板：

![动画模式用户界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09984896-b59a-4f10-80eb-05749978c5a1/modeoverview.png)

1.  **动画（Animation）** 面板，其中包含[动画模式工具（Animation Mode Tools）](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%8A%A8%E7%94%BB%E6%A8%A1%E5%BC%8F%E5%B7%A5%E5%85%B7)、[设置（Settings）](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%8A%A8%E7%94%BB%E6%A8%A1%E5%BC%8F%E8%AE%BE%E7%BD%AE)和[空间切换控制点（Space Switching Controls）](/documentation/zh-cn/unreal-engine/re-parent-control-rig-controls-in-real-time-in-unreal-engine)。
2.  **[动画大纲视图（Anim Outliner）](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%8A%A8%E7%94%BB%E5%A4%A7%E7%BA%B2%E8%A7%86%E5%9B%BE)** ，这是一个经过修改的大纲视图，仅显示选定控制绑定的控制点。
3.  **[动画细节（Anim Details）](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%8A%A8%E7%94%BB%E7%BB%86%E8%8A%82)** ，这是一个经过修改的"细节（Details）"面板，仅显示选定控制点的可动画化的相关属性。

### 动画大纲视图

"动画大纲视图（Anim Outliner）"面板显示所有可动画化的控制点，并根据层级进行组织（按照控制绑定中的定义）。

![动画大纲视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd83f41d-4859-4148-9a10-b67d489309da/outliner.png)

在此处选择控制点也会在视口和Sequencer中选择它们。反之，在视口或Sequencer中选择控制点也会在此处选择它们。

控制点图标继承其控制点的[控制点形状颜色](/documentation/zh-cn/unreal-engine/control-shapes-and-control-shape-library-in-unreal-engine#%E6%9B%B4%E6%94%B9%E5%BD%A2%E7%8A%B6)，因此更易于辨识控制点并将其与视口颜色匹配。

### 动画细节

"动画细节（Anim Details）"面板显示选定控制点的可动画化的相关属性，包括子通道控制点的属性。

![动画细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6851937c-ede9-494d-b5a0-dc43ce8a12d3/details.png)

变换数值与在控制绑定资产中的控制点上定义的初始局部/全局值相关，因此，这些控制点的"零点"等于这些值。

选择父控制点时，作为选定控制点的子项的布尔值控制点、浮点控制点、整型控制点和枚举控制点将自动被选中，并将在"动画细节（Anim Details）"面板中显示为 **通道（Channels）** 。这样，便可与父控制点同时操作这些控制点，还可以在单个控制点上创建自定义属性和通道。

## 动画模式工具

"动画（Animation）"面板中提供的以下工具可帮助你执行动画工作流程：

名称

图标

描述

**选择（Select）**

![选择工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8104cae7-8ac1-40cb-8bcb-e17b717020e8/select.png)

启用此功能只会使控制绑定控制点在视口中可供选择。包括角色在内的所有其他对象都将不可选择。也可以在[动画设置（Animation Settings）](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%8A%A8%E7%94%BB%E6%A8%A1%E5%BC%8F%E8%AE%BE%E7%BD%AE)中通过启用 **仅选择控制绑定控制点（Only Select Rig Controls）** 来启用此功能。

**姿势（Poses）**

![姿势工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b5e6ea8-7314-49c1-9918-5578f4992777/poses.png)

打开[控制绑定姿势工具（Control Rig Pose Tool）](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%A7%BF%E5%8A%BF%E5%B7%A5%E5%85%B7)。

**Tween**

![tweens工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c3d9982-16fc-4e1b-a064-ac1ef6a0a737/tweens.png)

打开[Tween控制器（Tween Controller）](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#tween%E5%B7%A5%E5%85%B7)。

**吸附工具（Snapper）**

![吸附工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab123961-ab5f-4f19-917a-db2acc8c81d4/snapper.png)

打开[控制绑定吸附工具（Control Rig Snapper Tool）](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%90%B8%E9%99%84%E5%B7%A5%E5%85%B7)。

**尾迹（Trails）**

![运动尾迹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3d25340-ea0f-4ef3-a152-ee2a1739069c/motiontrail.png)

打开[运动尾迹窗口（Motion Trail Window）](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E8%BF%90%E5%8A%A8%E5%B0%BE%E8%BF%B9%E7%AA%97%E5%8F%A3)。

**枢轴点（Pivot）**

![枢轴点工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/960c1410-c872-4024-ad63-a128b0ca073a/pivot.png)

创建[临时枢轴点](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E6%9E%A2%E8%BD%B4%E7%82%B9%E5%B7%A5%E5%85%B7)以执行可选的控制点操作。

### 姿势工具

"控制绑定姿势工具（Control Rig Pose Tool）"是一种在控制点上存储和检索数据的工具。你可以将相对姿势保存在选定控制点上，调整缩略图图标，并配置保存的姿势以应用到对称的控制点。

![姿势工具界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d02a88cd-0f9c-4a84-b561-56d04575a655/pose1.png)

#### 保存姿势

要保存新姿势，首先选择要包含在姿势中的控制点，然后单击工具栏中的 **创建姿势（Create Pose）** 。随后，系统将提示你为姿势资产命名。输入名称，然后单击 **创建资产（Create Asset）** 以创建姿势。新姿势将在所选文件夹中创建。

![创建姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6705d1e-7bb4-451b-ae78-49387770b279/pose2.png)

你还可以通过在浏览器中选择姿势、更改视口摄像机并单击 **捕获缩略图（Capture Thumbnail）** 来调整缩略图。

![姿势工具捕获缩略图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4dd26a3b-401e-4159-9a2c-e43aae5f8b13/pose3.gif)

#### 应用姿势

在应用姿势之前，必须确保选择了适当的控制点。要执行此操作，你可以手动选择控制点，或者选择姿势并单击 **选择控制点（Select Controls）** （这样就可以选择该姿势中的所有控制点）。

![姿势工具选择控制点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa88939f-64b8-4734-a57d-baccb1033353/pose4.png)

你可以通过多种方式将保存的姿势应用到控制点。你可以采用以下任一种方式：

-   在浏览器中双击该姿势，这将应用选定的姿势。
    
    ![应用保存姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61e0ef45-daea-4825-93a1-87d22208943d/applypose1.gif)
    
-   单击 **粘帖姿势（Paste Pose）** 。
    
    ![应用姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43be45b4-c0c7-4742-834c-22d46020c372/applypose2.png)
    
-   操作 **混合姿势滑块（Blend Pose Slider）** ，它将基于控制点的当前姿势和选定姿势之间的增量来部分应用姿势。值 **0** 将保持当前姿势，而值 **1** 将完全应用选定姿势。
    
    ![应用姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20356599-ce99-4ea9-8109-a457ace91f49/applypose3.gif)
    

当姿势应用到选定的控制点后，启用 **关键帧（Key）** 选项将创建[关键帧](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine)。

![姿势工具关键帧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b6c7d96-28b4-458d-811f-69efd85b1b79/keyframe.png)

#### 镜像姿势

对于类人绑定和其他对称绑定，还可以在对称线的任一侧应用姿势。这是通过结合命名空间搜索与轴镜像和翻转来完成的。启用 **镜像（Mirror）** 选项会将保存的姿势应用到另一侧，确保你首先选择控制点。

![镜像姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ee3b677-6beb-49cc-b65c-1cd7f15b3b10/mirror1.gif)

默认情况下，命名规范机制假定 **左（Left）** 和 **右（Right）** 分别指定为 `_l_` 和 `_r_` 。你可以通过编辑 **右侧（Right Side）** 和 **左侧（Left Side）** 属性字段来更改此设置，以匹配你为控制绑定指定的对称方式。例如，如果你指定的对称方式为后缀，你可能希望更改这些属性以显示 `_left` 和 `_right` 。

![镜像姿势左侧右侧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0b247b5-224d-41f9-9a77-694a72e46699/mirror2.png)

你可以在 **镜像轴（Mirror Axis）** 中指定角色的对称轴。在大多数情况下，如果在虚幻引擎中使用标准的 **Y - 朝向（Y - Facing）** 角色，此设置将保持为 **X** 。

![镜像轴](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e2c457b-ff65-4e89-b4a2-73c42397060a/mirror3.png)

**要翻转的轴（Axis to Flip）** 是为了计算镜像的姿势而在反转其他轴时要保持的旋转轴。在大多数情况下，此设置应该为 **X**，这意味着保持旋转 **X** 值相同，同时反转 **Y** 和 **Z** 。

由于某些控制绑定具有任意性，应确保构建的控制绑定对称性可以满足轴镜像和翻转的要求。

#### 其他控制点和热键

右键单击某个姿势将显示包含以下命令的上下文菜单：

![姿势上下文菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51fbbea1-4d40-46e8-935d-25d93db2fa4e/posecontext.png)

名称

描述

**重命名资产（Rename Asset）**

对姿势进行重命名。

**保存资产（Save Asset）**

保存姿势。

**删除资产（Delete Asset）**

删除姿势。

**粘帖姿势（Paste Pose）**

将姿势应用到选定的控制点。

**粘帖镜像姿势（Paste Mirror Pose）**

将姿势应用到选定的镜像控制点。

**选择控制点（Select Controls）**

选择由姿势定义的控制点。

**更新姿势（Update Pose）**

根据当前选定的控制点及其姿势来更新姿势。

**重命名控制点（Rename Controls）**

打开一个属性矩阵以更改姿势中保存的控制点的名称。如果你希望将姿势应用到具有不同控制点名称的不同控制绑定，此选项将很有用。

按住 **Alt** 并双击某个姿势将从该姿势中选择控制点。

![Alt点击姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26ad6fb8-ae29-41c7-abf1-b63d1240df43/posealtclick.gif)

#### 文件夹显示

默认情况下，用于保存和使用姿势的文件夹结构为 `Content/ControlRig/Pose` 。如果你要保存到不同的目录，或者导入了不在此默认目录中的姿势，你可以将其他文件夹添加到你的姿势工具目录中。

为此，请右键单击目录区域并选择 **添加现有文件夹到视图（Add Existing Folder To View）** 。选择你要添加的文件夹，并单击 **确定（OK）** 。

![添加现有文件夹到视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9de2bd24-0667-44d8-b078-2b0fe925de88/posefolder1.png)

该文件夹以及其中的姿势现在应该在姿势工具目录中显示。

![添加现有文件夹到视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66c43216-f323-462e-9ee4-0713f12b332d/posefolder2.png)

### Tween工具

Tweens工具可以通过多种方式调整选中关键帧及其相邻帧之间的插值。

![Tweens工具控制器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/744ab840-2dab-4d7a-b498-3f03faeeb03f/tweens1.png)

打开 **Tween控制器（Tween Controller）** ，选择你的关键帧控制点，并确保播放头位于两个关键帧之间。通过拖动滑块或键入介于 **\-1** 和 **1** 之间的值来操作"Tween控制器（Tween Controller）"值。值 **\-1** 将导致新的中间关键帧匹配前一个关键帧的值，而值 **1** 将匹配后一个关键帧的值。

![Tween控制器编辑](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca064a1b-caaa-4721-a8f8-90091c35cce4/tweens2.gif)

Tween控制器有多个用于调整中间关键帧的模式，位于Tween工具下拉菜单中。

Tween模式

描述

**混合到相邻帧（Blend to Neighbor (BN)）**

将关键帧从当前的相对位置移动到上一个（-1）或者下一个（1）相邻的关键帧。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cf0c66c-0b58-4c93-bd3b-cdf4bd8ffab5/tweens_bn.gif)

**推拉（Push Pull (PP)）**

在第一个和最后一个帧之间弱化（-1）或者加强（1）选中关键帧总体数值。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44753ed4-0b6e-4b37-a7ca-e3ae5ebd78ca/tweens_pp.gif)

**Tween (TW)**

将关键帧以绝对值移动到上一个（-1）或者下一个（1）相邻的关键帧。这意味着 **0** 总是会将关键帧数值移动到相邻数值之间。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c0c3f0c-4caa-49bb-ba2e-cc29ff8b9268/tweens_tw.gif)

### 吸附工具

"吸附工具（Snapper Tool）"可用于在一段时间内将你的控制点固定到其他源。该工具不会附加控制点，而是烘焙关键帧，因此你可以在吸附后轻松修改生成的动画。你可以吸附到其他控制点、Sequencer中的对象或者是世界。

![吸附工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b75bf58-422d-44a1-89b1-7c9d21dee3f6/snapper1.gif)

#### 吸附工具用法

要使用吸附工具，必须首先定义子Actor和父Actor。单击 **子项（Children）** 或 **父项（Parent）** 按钮会将你当前的选定项指定给该类目。在本例中，**手控制点（Hand Control）** 被选为 **子项（Child）** ，**球（Ball）** 被选为 **父项（Parent）** 。

![吸附工具父子项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e2ee68d-d4ff-4e78-9e62-a7a7a703ddba/snapper2.gif)

接下来，如果需要，你可以定义激活吸附效果的时间范围以及烘焙[关键帧](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine)的位置。在本例中，时间范围指定在帧 **6 - 24** 之间。

![吸附工具时间区域](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad3edcd3-ea76-4325-880b-79e3e1da3402/snapper3.png)

最后，有一些设置可以控制吸附行为：

名称

描述

**保持偏移（Keep Offset）**

是否在初始吸附时间保持父项和子项之间的偏移。如果禁用此设置，则子项将在吸附期间附加到与父项相同的变换。

**吸附位置（Snap Position）**

是否将子项的位置吸附到父项。

**吸附旋转（Snap Rotation）**

是否将子项的旋转吸附到父项。

**吸附缩放（Snap Scale）**

是否将子项的缩放吸附到父项。

单击 **吸附动画（Snap Animation）** 将执行吸附操作。在本例中，已启用 **保持偏移（Keep Offset）** ，以便将手保持在球的顶部。

![吸附工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/051d205e-846c-44c9-8bc0-9e5d8da2c93f/snapper1.gif)

### 运动尾迹工具

"Motion Trail Tool（运动尾迹工具）"通过将运动绘制为视口中的可交互曲线来预览你的整体控制点运动。然后，你可以通过沿曲线操纵关键帧来编辑运动。

![运动尾迹工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c58160b3-7fcd-488b-8591-47e42bbc98f0/motiontrail1.png)

#### 运动尾迹用法

打开 **运动尾迹（Motion Trail）** 窗口后，启用 **显示尾迹（Show Trails）** 选项，使所选控制点的运动曲线可见。

![运动尾迹显示尾迹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6737937-049c-4206-9ec1-12434cab0776/motiontrail2.png)

在启用 **显示尾迹（Show Trails）** 的情况下，选择其他控制点或选择多个控制点也会为这些控制点绘制运动尾迹。

![运动尾迹多选](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86cb1f5a-395e-489e-a42a-68929bf31406/motiontrail3.gif)

启用 **显示关键帧（Show Keys）** 选项以沿曲线绘制[关键帧](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine)的位置信息。在视口中选择这些关键帧以显示一个操纵器，该操纵器可用于从视口中编辑运动的位置数据。

![运动尾迹显示帧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8b7d090-13f7-4358-9c2b-82af00225166/motiontrail4.gif)

#### 运动尾迹属性

运动尾迹工具中提供了以下属性和功能：

名称

描述

**显示尾迹（Show Trails）**

为选定的控制点绘制运动尾迹。

**尾迹颜色（Trail Color）**

设置运动尾迹的颜色。

**显示完整尾迹（Show Full Trail）**

启用此属性会根据Sequencer中的所有关键帧来绘制完整的运动尾迹。禁用此属性只会绘制一段相对于播放头的尾迹。

![运动尾迹显示完整尾迹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7664d751-7e4f-4432-b88a-f6d0faa131cc/showfulltrail.gif)

**尾迹厚度（Trail Thickness）**

控制运动尾迹的厚度。值 **0** 将使尾迹的厚度为1个像素。

**之前的帧数（Frames Before）**

在禁用 **显示完整尾迹（Show Full Trail）** 的情况下，在当前播放头时间之前显示的尾迹量（以帧为单位）。

**之后的帧数（Frames After）**

在禁用 **显示完整尾迹（Show Full Trail）** 的情况下，在当前播放头时间之后显示的尾迹量（以帧为单位）。

**每帧求值次数（Evals Per Frame）**

此属性控制运动尾迹曲线的平滑度。增加此值将使曲线看起来更平滑，但会降低性能。

**显示关键帧（Show Keys）**

允许显示沿运动尾迹的关键帧。需同时启用 **显示尾迹（Show Trails）** 。可选择和操作关键帧以更改其位置信息。

**显示帧数（Show Frame Number）**

启用一个显示在每个关键帧旁边的帧计数器。该数字基于关键帧时间（以帧为单位），并遵循Sequencer的 **每秒帧数（Frames Per Second）** 设置。

**关键帧颜色（Key Color）**

设置关键帧显示的颜色，包括关键帧编号。

**关键帧大小（Key Size）**

控制关键帧点的大小。

**显示标记（Show Marks）**

允许显示沿运动尾迹的可视化时间标记。这些标记用于可视化沿曲线运动的速度。分开的标记表示高速区域，而靠近的标记表示低速区域。

![运动尾迹显示标记](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0cc02c3e-b28e-471e-8187-ef3f797f12cd/marks1.png)

**标记颜色（Mark Color）**

设置时间标记的颜色。

**标记大小（Mark Size）**

控制时间标记的大小。

**将标记锁定到帧（Lock Marks to Frames）**

设置时间标记的分布以匹配Sequencer的 **每秒帧数（Frames Per Second）** 设置。

**每个标记的秒数（Seconds Per Mark）**

如果已禁用 **将标记锁定到帧（Lock Marks to Frames）**，则可以在此处设置任意时间（以秒为单位）以使标记沿曲线分布。

可以使用控制台命令在Sequencer中为非控制绑定对象和Actor启用运动尾迹：`Sequencer.UseOldSequencerTrails 0` 。这将禁用旧的变换轨迹显示，启用要使用的新运动尾迹工具。

### 枢轴点工具

"枢轴点工具（Pivot Tool）"为选定的控制点创建一个临时枢轴点，然后可以将该枢轴点移动到任意点。如果你需要相对于其他点临时操纵控制点，则此工具很有用。启用枢轴点工具（Pivot Tool）后，单击 **编辑（Edit）** 可使枢轴点移动到其他点。单击 **姿势（Pose）** 会将枢轴点锁定到当前位置，在此处操纵它将相对于枢轴点移动选定的控制点。

![枢轴点工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b94c37ab-902c-4ed5-a46a-13bd0b8a66c9/pivot1.gif)

#### 枢轴点工具用法

有几个热键和行为可以帮助你以不同的方式使用枢轴点工具。

热键

描述

**Ctrl + Shift + Alt + G**

将枢轴点位置重置回控制点。

![重置枢轴点工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bfada6f2-aa80-4a76-ab20-41b9b1200da2/pivot2.gif)

**Shift + 鼠标左键点击枢轴点工具**

选择多个控制点时，按住Shift并单击枢轴点工具会将所有枢轴点吸附到最后选择的控制点。

![吸附枢轴点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/559e47b5-3016-4535-909e-babda3757d26/pivot3.gif)

**Ctrl + 鼠标左键点击枢轴点工具**

选择多个控制点时，按住Ctrl并单击枢轴点工具会将所有枢轴点吸附到所有选定控制点中的中间点。

![吸附枢轴点中间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e3ad733-5dc0-4df4-a888-c6ec8ad84fab/pivot4.gif)

**Ctrl + 在视口中使用鼠标左键点击**

按住Ctrl并在视口中单击会将枢轴点吸附到选定点。

![光线投射枢轴点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/942b39cc-ae4c-41c4-90d8-d15342a40a44/pivot5.gif)

**Shift + 枢轴点**

绕轴旋转时按住 **Shift** 将在绕轴转时禁用控制点上的旋转，使其仅平移。

![枢轴点旋转关闭](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81720dd1-00f9-4e43-9c32-753116b435e3/pivot6.gif)

## 动画模式设置

在 **动画模式面板（Animation Mode Panel）** 中，可以展开"动画设置（Animation Settings）"分段以显示以下附加设置：

![动画模式设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b03be9f-abb1-4bc4-bba3-115ea636bc6e/settings.png)

名称

描述

**显示层级（Display Hierarchy）**

启用此设置将在角色上绘制骨骼。

![动画模式显示层级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a8addd3-3778-49c8-9198-3ef737a820da/settingsbones.png)

**显示Null（Display Nulls）**

启用此设置将从视口中的控制绑定绘制所有[Null](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#nulls)。

**隐藏控制点形状（Hide Control Shapes）**

在视口中隐藏所有控制点。如果已启用 **显示层级（Display Hierarchy）** 或 **显示Null（Display Nulls）** ，此设置还将隐藏骨骼和Null。

**显示全部代理控制（Show All Proxy Controls）**

在视口中隐藏或显示全部[代理控制](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#controlandvaluetypes)。代理控制只有在你选中其驱动的控制时才能看到。启用该选项可以帮助你看到绑定中的全部代理控制。

**以覆层显示控制（Show Controls as Overlay）**

启用此项可使被遮挡的控制点可见（类似其他软件中的X光模式），使位于其他控制点或几何体后方的控制点可以被选中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b8f6450-4c98-45f4-bce6-b479b05a75a0/settingsxray.gif)

**驱动控制颜色（Driven Control Color）**

在选中一个代理控制点时，所有被其驱动的控制点将以此颜色显示，这有助于选择代理控制点关系的反馈。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f7508cf-1f9f-4fd7-b07a-487c518f8e03/settingsdrivencolor.gif)

**选择时显示轴（Display Axes on Selection）**

在选定元素上显示预览轴。

**轴缩放（Axis Scale）**

启用 **选择时显示轴（Display Axes on Selection）** 时预览轴的缩放。

**每个控件模式的坐标系统（Coord System Per Widget Mode）**

在视口中更改小工具模式时恢复坐标空间。

**仅选择控制绑定控制点（Only Select Rig Controls）**

启用此功能只会使控制绑定控制点在视口中可供选择。包括角色在内的所有其他对象都将不可选择。也可以通过单击"动画（Animation）"面板工具栏中的 **选择（Select）** 按钮从工具栏中启用此功能。

**每个局部空间中的局部变换（Local Transforms in Each Local Space）**

如果你的变换小工具设置为局部坐标，启用此设置将相对于局部变换空间变换每个选定的控制点。

![每个局部空间中的动画模式局部变换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1a4524e-2656-406e-890a-1f34566e9d54/localspacesetting.gif)

**小工具缩放（Gizmo Scale）**

增加或减少小工具缩放。

![动画模式小工具缩放](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef91f8b2-27e1-46d2-848f-6776a06cc2cd/shapescale.gif)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [control rig](https://dev.epicgames.com/community/search?query=control%20rig)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [tool](https://dev.epicgames.com/community/search?query=tool)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [启用动画模式](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%90%AF%E7%94%A8%E5%8A%A8%E7%94%BB%E6%A8%A1%E5%BC%8F)
-   [动画模式概述](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%8A%A8%E7%94%BB%E6%A8%A1%E5%BC%8F%E6%A6%82%E8%BF%B0)
-   [动画大纲视图](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%8A%A8%E7%94%BB%E5%A4%A7%E7%BA%B2%E8%A7%86%E5%9B%BE)
-   [动画细节](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%8A%A8%E7%94%BB%E7%BB%86%E8%8A%82)
-   [动画模式工具](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%8A%A8%E7%94%BB%E6%A8%A1%E5%BC%8F%E5%B7%A5%E5%85%B7)
-   [姿势工具](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%A7%BF%E5%8A%BF%E5%B7%A5%E5%85%B7)
-   [保存姿势](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E4%BF%9D%E5%AD%98%E5%A7%BF%E5%8A%BF)
-   [应用姿势](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%BA%94%E7%94%A8%E5%A7%BF%E5%8A%BF)
-   [镜像姿势](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E9%95%9C%E5%83%8F%E5%A7%BF%E5%8A%BF)
-   [其他控制点和热键](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%85%B6%E4%BB%96%E6%8E%A7%E5%88%B6%E7%82%B9%E5%92%8C%E7%83%AD%E9%94%AE)
-   [文件夹显示](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E6%96%87%E4%BB%B6%E5%A4%B9%E6%98%BE%E7%A4%BA)
-   [Tween工具](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#tween%E5%B7%A5%E5%85%B7)
-   [吸附工具](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%90%B8%E9%99%84%E5%B7%A5%E5%85%B7)
-   [吸附工具用法](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%90%B8%E9%99%84%E5%B7%A5%E5%85%B7%E7%94%A8%E6%B3%95)
-   [运动尾迹工具](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E8%BF%90%E5%8A%A8%E5%B0%BE%E8%BF%B9%E5%B7%A5%E5%85%B7)
-   [运动尾迹用法](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E8%BF%90%E5%8A%A8%E5%B0%BE%E8%BF%B9%E7%94%A8%E6%B3%95)
-   [运动尾迹属性](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E8%BF%90%E5%8A%A8%E5%B0%BE%E8%BF%B9%E5%B1%9E%E6%80%A7)
-   [枢轴点工具](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E6%9E%A2%E8%BD%B4%E7%82%B9%E5%B7%A5%E5%85%B7)
-   [枢轴点工具用法](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E6%9E%A2%E8%BD%B4%E7%82%B9%E5%B7%A5%E5%85%B7%E7%94%A8%E6%B3%95)
-   [动画模式设置](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#%E5%8A%A8%E7%94%BB%E6%A8%A1%E5%BC%8F%E8%AE%BE%E7%BD%AE)
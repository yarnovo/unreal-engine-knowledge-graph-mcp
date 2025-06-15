# 在虚幻引擎中实时重新关联控制绑定控制点 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/re-parent-control-rig-controls-in-real-time-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:16:09.316Z

---

目录

![空间切换](https://dev.epicgames.com/community/api/documentation/image/72fd9a14-7917-4401-9779-197d10ea723d?resizing_type=fill&width=1920&height=335)

在制作动画时，某些情况下，你可能需要更改控制点上的变换空间来满足不同需求，例如手与身体的一部分或其他物体接触和移动。如果绑定比较复杂，这种问题可能会比较棘手，因为需要在控制点中创建预设的约束系统。

为满足动画需求，你可以使用 **控制绑定空间切换（Control Rig Space Switching）**，轻松、动态地将控制点与其他绑定元素重新关联。空间可以在 **控制绑定资产（Control Rig Asset）** 中预定义，或者在 **Sequencer** 中创建，从而提供很大的灵活性。

本文提供了在Sequencer和控制绑定中进行空间切换的概述。

#### 先决条件

-   你已经创建 **控制绑定资产（Control Rig Asset）** 。有关如何执行此操作的信息，请参阅[控制绑定快速入门指南](/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine)页面。
-   动画过程中的空间切换通过[动画模式](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine)面板访问，因此需要启用 **动画模式（Animation Mode）** 。
-   空间切换主要依赖于使用在 **Sequencer** 中使用控制绑定，因此需要具备Sequencer的[基础知识](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)。

## Sequencer中的空间切换

-   在启用[动画模式](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine)后，你可以通过 **动画（Animation）** 面板访问控制绑定动画过程中的空间切换。点击面板中的 **空间（Spaces）** 即可打开空间切换界面。

![动画空间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f97b1b9-7635-419c-854b-7e2ccc4ee09c/spacesoverview.png)

将鼠标放在 **视口（Viewport）** 上时，按 **Tab** 键还可打开临时的 **空间（Spaces）** 菜单。

![tab空间菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ffc460d-4de1-44fb-b020-97f8ff85a800/tabhotkey.gif)

### 父节点和世界空间

默认情况下，你可以为控制点应用两种空间：**父节点（Parent）** 和 **世界（World）** 。

对于常见的控制点来说，默认空间将设置为 **父节点（Parent）** ，这种空间将控制点放在控制绑定框架中定义的父节点空间内。例如，选择颈部控制点将突出显示父节点空间，这意味着它是当前变换空间，可以用于关联到 **动画大纲视图工（Anim Outliner）** 中的层级。

![父节点变换空间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d38e7669-2a85-4d01-95d5-c59a58767348/parentspace.png)

点击 **世界（World）** 会将所选控制点的变换空间更改为相对于绝对世界坐标。实际上，这种方式会取消任何已选的控制点在其控制绑定中的层级位置的父节点地位。

![世界变换空间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fac6f59a-2fa7-4abe-96ee-7f468d605eb4/worldspace.gif)

### 自定义空间

所有[控制点、骨骼或Null](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine)都可以用作变换空间，这使空间切换更加全面，因为可以动态地将控制点重新设置为其他控制点的父节点。

![自定义变换空间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1603d330-b7cb-49f8-8a55-7e85a8277d16/customspace1.gif)

要为所选的控制点添加自定义空间，请点击空间 **标题菜单** 中的 **添加（Add）（+）** ，然后选择 **绑定元素** 。这会将其作为可选择的空间添加到空间列表中。

![添加自定义空间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f7687a3-47fb-414c-8643-39c968f307e1/customspace2.png)

虽然你可以选择骨骼、控制点或Null作为自定义空间，但我们建议主要选择 **控制点（Controls）** ，以避免重新确定父节点的过程中循环发生绑定错误。

### 确定空间变换的关键帧

空间的一个主要优势在于能够更改动画中的空间。如果角色将手放在接触点上，并在随后制作这些点的动画，该功能将非常有用。

在选择不同的空间时，它会自动为该控制点创建 **空间关键帧（Space Keyframe）** ，并创建补偿性的 **变换关键帧（Transform Keyframes）** 以维持该控制点的视觉效果位置。每个空间关键帧还会在该空间存在的过程中在轨道行使用唯一的颜色。

![关键帧变换空间切换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65d7eac1-f7b1-46f2-a67b-ec742676cd43/keyframe1.gif)

当控制点切换空间时，将会占据新父节点的本地空间。因此，其本地空间坐标将变得与之前的空间坐标不同。通过这种方式，空间切换在单个帧上发生。通过在[曲线编辑器](/documentation/zh-cn/unreal-engine/animation-curve-editor-in-unreal-engine)中查看关键帧，能够直观地看到此过程。

![变换空间切换-曲线编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e466b9f5-4edd-408e-a7f0-86f586318e15/keyframe2.png)

你可以在不同的空间关键帧上移动播放头和操控父控制点，从而预览空间切换功能。在此示例中，当头部控制点是父节点时，将会影响手部IK控制点，而不需要将手部设置为关键帧。

![关键帧变换空间切换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff3056d8-e3eb-47b6-8435-858ef6c54fb6/keyframe3.gif)

### 烘焙

完成动画的空间切换之后，你可以烘焙关键帧的最终效果。如果要将最终动画稳定到默认父节点空间，此功能将非常有用。

要烘焙所选的控制点，请点击空间菜单中的 **烘焙...（Bake…）** ，这将打开具有以下界面的烘焙 **对话框菜单** ：

![烘焙变换空间切换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af538295-4a5e-47cc-9677-ba6b42e0959b/bake1.png)

1.  要烘焙到的变换空间。通常情况下，你需要选择 **父节点（Parent）** 才能恢复控制点的原始空间，但是如果要维持非父节点变换空间，你也可以选择或添加其他空间。
2.  烘焙设置，其中包含以下属性：

名称

说明

**开始帧（Start Frame）**

Sequencer中的开始帧，用于定义烘焙范围。

**结束帧（End Frame）**

Sequencer中的结束帧，用于定义烘焙范围。

**减少关键帧（Reduce Keys）**

启用此项以在烘焙过程发生后运行[简化](/documentation/zh-cn/unreal-engine/animation-curve-editor-in-unreal-engine#%E7%AE%80%E5%8C%96)过程，这会基于公差数量删除冗余的关键帧。

**容差（Tolerance）**

**容差（Tolerance）** 值越高，允许滤波曲线偏离原始值的程度就越高，在启用 **减少关键帧（Reduce Keys）** 的情况下，这会导致更多关键帧被删除。

### 设置和偏好

你可以从 **编辑器偏好设置（Editor Preferences）** 窗口更改Sequencer中使用的空间关键帧颜色。要访问这些设置，请从虚幻引擎菜单中选择 **编辑（Edit） > 编辑器偏好设置（Editor Preferences）** ，然后找到 **曲线编辑器（Curve Editor）** 分段，然后找到以下属性：

![空间关键帧颜色设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95dc56cc-f320-437d-8e24-c400202d1410/preferences.png)

设置

说明

**父节点空间自定义颜色（Parent Space Custom Color）**

在当前空间设置为 **父节点（Parent）** 时，要使用的关键帧轨道颜色。

**世界空间自定义颜色（World Space Custom Color）**

在当前空间设置为 **世界（World）** 时，要使用的关键帧轨道颜色。

**控制点空间自定义颜色（Control Space Custom Colors）**

可以向其添加自定义控制点名称并设置要用于这些控制点的显式关键帧轨道颜色的可自定义数组。

## 控制绑定资产中的空间切换

空间切换也可以预构建到控制绑定资产中。如果要提前在控制点上定义通用空间以避免在Sequencer中持续添加，此功能将非常有用。此外，你还可以创建逻辑，以通过控制点属性来控制空间切换。

### 预定义自定义空间

在控制绑定资产中，选择 **控制点（Control）** ，找到 **细节（Details）** 面板，然后找到 **可用空间（Available Spaces）** 属性。你可以利用此数组预定义要用作变换空间的其他绑定元素。

![可用空间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c9712b5-309d-4bc8-b41b-07484392879b/predefine1.png)

点击 **添加（Add）(+)** 按钮添加新条目，并指定要在 **下拉菜单** 中使用的 **类型（Type）** 和 **元素（Element）** 。如上所述，虽然你可以选择骨骼、控制点或Null作为自定义空间，但我们建议主要选择 **控制点（Controls）** ，以避免重新确定父节点的过程中循环发生绑定错误。

![添加可用空间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ef61e9f-af49-437d-a101-a0cd289c3ad4/predefine2.png)

一旦在"可用空间（Available Spaces）"属性中指定项目之后，你就可以看到此自定义空间自动显示为该控制点的可切换空间。

![变换空间添加](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de643c36-6182-4dc9-9513-ee03d11aaa4d/predefine3.png)

### 动态层级节点

此外，你可以使用动态层级节点在控制绑定图表中绘制空间切换功能的图表。在 **控制绑定图表（Control Rig graph）** 中右键点击，然后在 **动态层级（Dynamic Hierarchy）** 下找到以下节点：

![动态层级节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8704cc67-909f-4287-8eaf-2528081ee912/graphing.png)

名称

图像

说明

**添加父节点（Add Parent）**

![添加父节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c561ec3a-27e0-4e40-b0a3-1fc75ab24d02/nodeaddparent.png)

将第二个父节点添加到绑定元素。新父节点的权重最初为0，然后你可以使用 **设置父节点权重（Set Parent Weights）** 来设置权重。此节点包含以下选项：

-   **子节点（Child）** ，此选项可以定义用于接收额外父节点的项目。
-   **父节点（Parent）** ，此选项可以定义新的父节点。

**获取父节点权重（Get Parent Weights）**

![获取父节点权重](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a853eb02-9b05-4663-b73d-563c493fd1c0/nodegetparentweights.png)

返回给定绑定元素的所有父节点的当前权重数组。

**设置父节点权重（Set Parent Weights）**

![设置父节点权重](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e131fe3-3565-48ac-8036-e865dc97d41d/nodesetparentweights.png)

设置给定绑定元素的父节点权重数组。权重数量必须等于绑定元素的父节点数量。

**切换父节点（Switch Parent）**

![切换父节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/461b6cd3-df8f-4c84-898c-5ca35c8266fa/nodeswitchparent.png)

将绑定元素切换为新的父节点。此节点包含以下选项：

-   **模式（Mode）** ，此选项可以让子节点要么切换到新的 **父节点（Parent）** 、**世界空间（World Space）** ，要么切换回其 **默认空间（Default Space）** 。
-   **子节点（Child）** ，此选项将定义要切换空间的项目。
-   **父节点（Parent）** ，如果模式设置为 **父节点项目（Parent Item）** ，此选项将定义要切换到的新父节点项目。否则，你可以将此引脚保持无链接状态。
-   **保持全局（Maintain Global）** ，此选项将定义在切换时应该保持本地空间还是世界空间。

### 预览空间切换

空间变换以 **动态层级（Dynamic Hierarchy）** 系统为基础而构建，可以在控制绑定资产中预览和调试。在这个示例中，绑定层级面板在控制空间切换到 **世界空间（World Space）** 时自动更新。

![dynamic hierarchy](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7ecb008-a313-401d-b6b7-982c53c9ddd4/preview2.gif)

在此示例中，它影响了将父节点切换到 **世界空间（World Space）** 的控制点。绑定层级框架还将突出显示为 **蓝色** 。以此说明启用了 **动态层级（Dynamic Hierarchy）** 。

![test space switching](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2510288b-f777-457a-bb21-f0be35962ecb/preview3.png)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [control rig](https://dev.epicgames.com/community/search?query=control%20rig)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [space](https://dev.epicgames.com/community/search?query=space)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/re-parent-control-rig-controls-in-real-time-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [Sequencer中的空间切换](/documentation/zh-cn/unreal-engine/re-parent-control-rig-controls-in-real-time-in-unreal-engine#sequencer%E4%B8%AD%E7%9A%84%E7%A9%BA%E9%97%B4%E5%88%87%E6%8D%A2)
-   [父节点和世界空间](/documentation/zh-cn/unreal-engine/re-parent-control-rig-controls-in-real-time-in-unreal-engine#%E7%88%B6%E8%8A%82%E7%82%B9%E5%92%8C%E4%B8%96%E7%95%8C%E7%A9%BA%E9%97%B4)
-   [自定义空间](/documentation/zh-cn/unreal-engine/re-parent-control-rig-controls-in-real-time-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%A9%BA%E9%97%B4)
-   [确定空间变换的关键帧](/documentation/zh-cn/unreal-engine/re-parent-control-rig-controls-in-real-time-in-unreal-engine#%E7%A1%AE%E5%AE%9A%E7%A9%BA%E9%97%B4%E5%8F%98%E6%8D%A2%E7%9A%84%E5%85%B3%E9%94%AE%E5%B8%A7)
-   [烘焙](/documentation/zh-cn/unreal-engine/re-parent-control-rig-controls-in-real-time-in-unreal-engine#%E7%83%98%E7%84%99)
-   [设置和偏好](/documentation/zh-cn/unreal-engine/re-parent-control-rig-controls-in-real-time-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%92%8C%E5%81%8F%E5%A5%BD)
-   [控制绑定资产中的空间切换](/documentation/zh-cn/unreal-engine/re-parent-control-rig-controls-in-real-time-in-unreal-engine#%E6%8E%A7%E5%88%B6%E7%BB%91%E5%AE%9A%E8%B5%84%E4%BA%A7%E4%B8%AD%E7%9A%84%E7%A9%BA%E9%97%B4%E5%88%87%E6%8D%A2)
-   [预定义自定义空间](/documentation/zh-cn/unreal-engine/re-parent-control-rig-controls-in-real-time-in-unreal-engine#%E9%A2%84%E5%AE%9A%E4%B9%89%E8%87%AA%E5%AE%9A%E4%B9%89%E7%A9%BA%E9%97%B4)
-   [动态层级节点](/documentation/zh-cn/unreal-engine/re-parent-control-rig-controls-in-real-time-in-unreal-engine#%E5%8A%A8%E6%80%81%E5%B1%82%E7%BA%A7%E8%8A%82%E7%82%B9)
-   [预览空间切换](/documentation/zh-cn/unreal-engine/re-parent-control-rig-controls-in-real-time-in-unreal-engine#%E9%A2%84%E8%A7%88%E7%A9%BA%E9%97%B4%E5%88%87%E6%8D%A2)
# 虚幻引擎中的动画约束工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:15:37.590Z

---

目录

![约束](https://dev.epicgames.com/community/api/documentation/image/3196c271-9b6d-4ae4-9add-86191755b10e?resizing_type=fill&width=1920&height=335)

动画过程中，可能在一些情况下你需要将元素附加到一起，而不在大纲视图或控制点层级中造成更改。这种附加称为 **约束** 。虚幻引擎中的约束分解为不同的方法：**位置（Position）** 、 **旋转（Rotation）** 、 **缩放（Scale）** 、 **父节点（Parent）** 和 **LookAt** 。通过这些方法，你可以设置选项来控制这些约束的运作方式，例如控制附加偏移和将约束烘焙回法线关键帧。

本文档概述了Sequencer中的约束，以及每种约束方法的不同工作流程。

#### 先决条件

-   你已经创建 **控制绑定资产（Control Rig Asset）** 。有关如何执行此操作的信息，请参阅[控制绑定快速入门指南](/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine)页面。
-   动画过程中的约束通过[动画模式](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine)面板访问，因此需要启用 **动画模式（Animation Mode）** 。
-   约束主要依赖于使用在 **Sequencer** 中使用控制绑定，因此需要具备Sequencer的[基础知识](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)。

## 创建约束

-   在启用[动画模式](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine)后，约束信息以及用于添加约束的工作流程位于"动画（Animation）"面板中。

![动画面板中的约束分段](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75038756-e89c-49b5-ba70-0e6955ffca90/create1.png)

约束通过在两个或更多对象之间创建 **父子（Parent - Child）** 关系来建立。要创建新约束，首先选择你想约束的控制点（子），然后点击 **添加约束（Add Constraint (+)）** 并选择约束类型。你的光标会变为滴管工具，可用于在视口中选择要约束到的对象（父）。

![创建约束](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4f9f20f-9c75-4138-ac3c-2b99376ca8db/create2.gif)

约束不限于控制绑定元素，你可以约束任意对象或Actor。此外，无需打开Sequencer就可以约束Actor。

创建约束后，你可以在受约束控制点的Sequencer中查看其关键帧信息。大部分约束还将创建补偿性关键帧，以在约束激活时维护子节点的当前视觉位置。这些补偿性关键帧链接到约束关键帧，如果你更改了时序，会遵循约束关键帧。

![约束关键帧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf741794-734b-497e-ab8d-151a9e8afbc0/create3.gif)

## 约束用法

选择受约束控制点时，你的约束还可以在动画面板的 **约束（Constraints）** 分段中查看。这里你可以创建新的约束关键帧，编辑约束的属性，并将约束烘焙回法线关键帧。

![约束选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/202ade8e-3f23-43c1-b192-4a7c97380cf3/manage1.png)

如果你将多个约束应用于某个对象，它们也会显示在此处。播放或推移序列时，每个约束通过在变为活动或非活动状态时高亮显示来表示其状态。

![约束切换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c589120-3f13-49cc-8071-1139d44e3017/manage2.gif)

约束条目的按钮提供了以下功能：

按钮

说明

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/adef173f-0c88-4b57-90ac-4bfb9dc97511/button1.png)

在Sequencer中的当前时间创建约束的活动关键帧。如果约束已经处于活动状态，将改为创建停用关键帧。此我还会创建补偿性关键帧，以在受约束对象上维护相同的世界位置

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea9d08a3-6878-437b-8f13-37562ec21005/manage4.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/517edc8b-55ba-4c23-943b-3773aaf61fb4/button2.png)

如果同一个对象上有多个约束，这些按钮会在列表中将约束上移或下移。虚幻引擎中的约束是分层的，会覆盖列表中更高位置的其他约束（仅当这些约束对相同通道制作动画时）。新约束始终优先于旧约束，并且放在列表中较低位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43609c21-213e-4d9b-99b1-f4b0e3640edf/manage6.gif)

由于约束可以被覆盖，因此并非总是需要停用其他约束。例如，由于[父节点约束](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E7%88%B6%E8%8A%82%E7%82%B9%E7%BA%A6%E6%9D%9F)对控制点的所有变换通道制作动画，所以只要激活的约束有更高优先级，只需激活这一个约束就足以实际上停用其他全部约束。在此例子中，虽然两个约束都处于活动状态，但只有 **根** 约束提供了约束效果，因为它在列表中更低位置，拥有更高优先级

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59f81028-7c17-4265-8186-15b398d6b58f/manage5.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54aafbdd-6c6a-4df4-8697-3d3a47361194/button3.png)

移除此约束。

右键点击约束条目将显示上下文菜单，可用于编辑特定于该约束类型的属性，[烘焙](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E7%83%98%E7%84%99%E7%BA%A6%E6%9D%9F)约束，并设置[补偿性关键帧](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E8%A1%A5%E5%81%BF%E5%85%B3%E9%94%AE%E5%B8%A7)。

![约束属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99070bbb-1579-4a68-912a-79c961379d5c/manage3.png)

### 烘焙约束

完成约束的动画制作之后，你可以将最终效果烘焙到关键帧。这适合用于恢复到法线关键帧动画，进行进一步编辑，而不必考虑约束。

要烘焙所选控制点，请右键点击约束条目，然后选择 **烘焙（Bake）** 。

![烘焙约束](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14f09df7-55ab-417b-8f55-cdebda9c3555/bake1.gif)

### 补偿关键帧

动画过程中，可能在一些情况下约束会在激活或停用时表现出明显的中断。如果你在约束创建之后调整父节点的姿势，常常会发生此情况，这会打破原始补偿性关键帧所提供的视觉匹配。

![约束中断](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24d134c2-6170-468d-903c-fa5d73546a0b/compensate1.gif)

要解决此问题，请选择发生问题的控制点，右键点击该约束，然后选择 **补偿关键帧（Compensate Key）** 。你还必须确保Sequencer **播放头（Playhead）** 位于你想修复的约束关键帧所在时间。这将为父对象的新位置重新创建新的补偿性关键帧。

![修复约束中断](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8c60031-aa8c-4e1d-b04c-e96ee8a8881c/compensate2.gif)

**补偿关键帧（Compensate Keys）** 可用于解决单个约束的错误，而 **补偿所有关键帧（Compensate All Keys）** 也可以用于为序列中每个受约束控制点重新创建所有补偿性关键帧，无论选择内容或播放头位置如何。

### 动态偏移

默认情况下，你可以对受约束对象以及影响它的约束设定关键帧。如果你想禁用此选项，不允许子对象制作动画，请右键点击该约束，然后禁用 **动态偏移（Dynamic Offset）** 。这会将受约束对象的位置锁定在当前变换处，现在它仅在父对象移动时才会移动。

![动态偏移](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66deafbd-576e-4692-adf7-a0d7f07831a5/dynamicoffset.gif)

### 约束管理器

随着你在关卡序列中约束许多对象，管理和查看你的约束可能变得越来越困难。你可以使用 **约束管理器Actor（Constraints Manager Actor）** 来查看和管理关卡中的所有约束。

首次创建约束时， **约束管理器Actor（Constraints Manager Actor）** 会自动在你的关卡中创建，选择它会将所有使用的约束合并到单个列表中。这样就更容易同时在多个对象上查看和管理大量约束。

![约束管理器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/027aa583-e558-47fd-9e7b-2496a23e6759/manager1.png)

## 约束类型

点击 **添加约束（Add Constraint (+)）** 时可以创建以下约束类型：

![约束类型](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/102db9c2-8c71-46f0-a2e5-142497e3bc27/types1.png)

-   [平移约束](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E5%B9%B3%E7%A7%BB%E7%BA%A6%E6%9D%9F)
-   [旋转约束](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E6%97%8B%E8%BD%AC%E7%BA%A6%E6%9D%9F)
-   [缩放约束](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E7%BC%A9%E6%94%BE%E7%BA%A6%E6%9D%9F)
-   [父节点约束](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E7%88%B6%E8%8A%82%E7%82%B9%E7%BA%A6%E6%9D%9F)
-   [LookAt约束](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#lookat%E7%BA%A6%E6%9D%9F)

### 平移约束

**平移约束（Translation Constraints）** 仅沿平移轴约束对象。它遵循父节点位置，但不遵循其旋转或缩放。

![平移约束](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fdf50e08-eeaa-4199-899f-4b05b745cd36/types2.gif)

如果从约束上下文菜单禁用了 **维持偏移（Maintain Offset）** ，则受约束对象按绝对坐标遵循父对象位置，而不是相对于创建约束时。

![平移约束维持偏移](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60e5560c-356b-4a93-8ae5-2e57372821f4/types3.gif)

### 旋转约束

**旋转约束（Rotation Constraints）** 仅沿旋转轴约束对象。它遵循父节点旋转，但不遵循其平移或缩放。

![旋转约束](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f32ed40b-96ae-45fa-9178-4615aeaf9303/types4.gif)

如果从约束上下文菜单禁用了 **维持偏移（Maintain Offset）** ，则受约束对象按绝对坐标遵循父对象旋转，而不是相对于创建约束时。

![旋转约束维持偏移](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b3b017b-2699-48d8-bd06-c00d8b8a78df/types5.gif)

### 缩放约束

**缩放约束（Scale Constraints）** 仅沿缩放轴约束对象。它遵循父节点缩放，但不遵循其平移或旋转。

![缩放约束](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f033e8c-9e73-409a-8dd2-c2c4ce5b34fe/types6.gif)

如果从约束上下文菜单禁用了 **维持偏移（Maintain Offset）** ，则受约束对象按绝对坐标遵循父对象缩放，而不是相对于创建约束时。

![缩放约束维持偏移](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52804a5d-a71f-4e76-8749-13dde537263c/types7.gif)

### 父节点约束

**父节点约束（Parent Constraints）** 沿所有轴和通道将对象约束到父节点，如同是分层附加的那样。

![父节点约束](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4fcdb5e5-0da6-49ed-a6d5-8a1e5a07266a/types8.gif)

默认情况下，缩放未包含在父节点约束中。要包含缩放，请右键点击约束条目并启用 **缩放（Scaling）** 。

![在父节点约束中启用缩放](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8804c222-477b-4e69-a5f0-eee4b964224d/types9.gif)

与其他约束类型相似，禁用 **维持偏移（Maintain Offset）** 会导致受约束对象按绝对坐标遵循父节点变换，而不是相对于创建约束时。

### LookAt约束

**LookAt约束（LookAt Constraints）** 通过瞄准父节点位置，仅沿旋转轴约束对象。

![瞄准约束](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d858129-60de-406e-918b-2eb5e641305d/types10.gif)

你可以右键点击约束条目并编辑 **轴（Axis）** 属性来设置子对象的瞄准方向。

![瞄准轴](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51eadcd0-e3ed-4e7c-99ad-831eebdeeafb/types11.png)

不同于其他瞄准类型的附加，LookAt约束不会用尽向量。相反，你可以对 **滚动（roll）** 轴制作动画，手动控制滚动的行为。这还适合用于消除旋转翻转问题，这些问题在其他瞄准类型附加中很常见。

![瞄准约束滚动无翻转](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b32dceee-9971-4448-8872-c9b59d5208c1/types12.gif)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [control rig](https://dev.epicgames.com/community/search?query=control%20rig)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [constraint](https://dev.epicgames.com/community/search?query=constraint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [创建约束](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E5%88%9B%E5%BB%BA%E7%BA%A6%E6%9D%9F)
-   [约束用法](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E7%BA%A6%E6%9D%9F%E7%94%A8%E6%B3%95)
-   [烘焙约束](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E7%83%98%E7%84%99%E7%BA%A6%E6%9D%9F)
-   [补偿关键帧](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E8%A1%A5%E5%81%BF%E5%85%B3%E9%94%AE%E5%B8%A7)
-   [动态偏移](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E5%8A%A8%E6%80%81%E5%81%8F%E7%A7%BB)
-   [约束管理器](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E7%BA%A6%E6%9D%9F%E7%AE%A1%E7%90%86%E5%99%A8)
-   [约束类型](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E7%BA%A6%E6%9D%9F%E7%B1%BB%E5%9E%8B)
-   [平移约束](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E5%B9%B3%E7%A7%BB%E7%BA%A6%E6%9D%9F)
-   [旋转约束](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E6%97%8B%E8%BD%AC%E7%BA%A6%E6%9D%9F)
-   [缩放约束](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E7%BC%A9%E6%94%BE%E7%BA%A6%E6%9D%9F)
-   [父节点约束](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#%E7%88%B6%E8%8A%82%E7%82%B9%E7%BA%A6%E6%9D%9F)
-   [LookAt约束](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine#lookat%E7%BA%A6%E6%9D%9F)
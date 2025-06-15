# 虚幻引擎中的FK控制绑定 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fk-control-rig-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:15:36.167Z

---

目录

![FK控制绑定](https://dev.epicgames.com/community/api/documentation/image/3562dbf8-d876-42d3-bd0c-8cc0a308cecc?resizing_type=fill&width=1920&height=335)

**FK控制绑定** 是一种程序化生成的控制绑定，可以被添加到 **Sequencer** 中的任意 **骨架网格体（Skeletal Mesh）** 中（无论该Actor是否拥有控制绑定资产）。这些绑定可对骨骼进行叠加式的更改，而无需创建完整的控制绑定资产。此外，你可以将任意动画序列烘焙到FK控制绑定，以实现覆盖性质的调整。

本文介绍了如何在[Sequencer](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)中创建和使用FK控制绑定。

#### 先决条件

-   你已将骨架网格体角色添加到Sequencer。有关如何执行此操作的信息，请参阅[将动画应用到角色](/documentation/zh-cn/unreal-engine/how-to-add-cinematic-animation-to-a-character-in-unreal-engine)页面。
    
-   你已熟悉Sequencer中的[关键帧](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine)。
    

## 创建和概述

创建FK控制绑定时，首先假定你已将骨架网格体添加到Sequencer，然后请点击角色的轨道上的 **添加(+)轨道（Add (+) Track）** ，然后选择 **控制绑定（Control Rig） > FK控制绑定（FK Control Rig）** 。

![创建控制绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40ed58a6-385d-49ef-a197-e49850d9be0d/addfk1.png)

现在你可以看到FK控制绑定了，并且骨骼会显示在关卡视口中的骨架网格体上。

![fk控制绑定Sequencer轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d277cf0b-68fe-46cd-8e74-69c50a4172bc/addfk2.png)

展开FK控制绑定轨道后，会显示骨骼的列表。你可以在此处选择骨骼（视口中会同时选中它们），也可以直接在视口中选择骨骼，这样还会选择该轨道。一旦选择骨骼后，你可以像处理Sequencer中的其他对象那样，对该骨骼进行操控和[设为关键帧](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine)。

![fk控制绑定选择骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/987ea6cc-ade5-43f0-b7a8-1efab1c40c24/fkoverview1.gif)

## 用途

在Sequencer中创建FK控制绑定后，在gujia 网格体上创建动画时，你可以对各个骨骼单独制作动画。根据角色复杂度或动画的范围，有时可能更适合使用FK控制绑定，而不是在虚幻引擎之外的软件中额外创建一个动画。

例如，骨骼很少的骨架网格体可以使用FK控制绑定轻松制作出动画。选择你想制作动画的骨骼，并按 **S**（如果你的焦点在视口中）或 **回车键（Enter）**（如果你的当前焦点在Sequencer中）将其设为关键帧。

![关键帧fk控制绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01cc97c0-2697-4843-8d17-2eb9db734540/keyframe.gif)

### 叠加FK

FK控制绑定还可以累加方式应用于Sequencer中的动画序列。如果你想对动画执行叠加式的编辑而不是将其覆盖，这就很有用。

要使FK控制绑定成为累加的，请右键点击 **FK控制绑定轨道（FK Control Rig track）** ，然后选择 **累加（Additive）** 。

![累加fk控制绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52bf8872-b2ed-438f-a68f-f4c25b26812d/additive1.gif)

现在你可以编辑骨骼和将骨骼设为关键帧，并将这些更改以累加方式应用于基础动画。

![累加fk控制绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed73cdad-dee7-4a6c-9db3-6eb8c541f729/additive2.gif)

### 烘焙到FK控制绑定

你还可以将动画从Sequencer烘焙到FK控制绑定。如果你需要执行覆盖性调整（例如修复动画弹出内容或不合格曲线），这会很有用，无需在虚幻引擎外部执行相同的修复并重新导入。

为此，请右键点击Sequencer中的 **骨架网格体轨道（Skeletal Mesh track）** ，然后选择 **使用FK控制绑定编辑（Edit With FK Control Rig）** 。这会打开烘焙对话框窗口，你可以在其中指定以下选项：

![烘焙到fk控制绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/052d6871-e325-40a1-b7d1-566065a9d01f/bake1.png)

名称

说明

**导出变换（Export Transforms）**

将变换数据烘焙到FK功能按钮。

**导出曲线（Export Curves）**

将 **AnimCurve** 数据烘焙到FK功能按钮。

**在世界空间中录制（Record in World Space）**

在绝对世界空间坐标中烘焙。

**对所有骨架网格体组件求值（Evaluate All Skeletal Mesh Components）**

在烘焙时对所有骨架网格体组件求值。通常，如果你将蓝图用于其他骨架网格体组件，你可能想启用此项。

**预热帧（Warm Up Frames）**

在烘焙过程开始前要求值的帧数。如果有后期处理动画蓝图效果，这会很有用，因为这种效果需要更多的时间才能在求值前确定下来。

**开始前的延迟（Delay Before Start）**

在烘焙过程开始前要延迟的显示速度帧数。如果你需要在求值前反复运行后期处理动画蓝图效果，这会很有用。

**减少关键帧（Reduce Keys）**

启用此项以在烘焙过程发生后运行[简化](/documentation/zh-cn/unreal-engine/animation-curve-editor-in-unreal-engine#%E7%AE%80%E5%8C%96)过程，这会基于公差数量删除冗余的关键帧。

**容差（Tolerance）**

**容差（Tolerance）** 值越高，允许滤波曲线偏离原始值的程度就越高，在启用 **减少关键帧（Reduce Keys）** 的情况下，这会导致更多关键帧被删除。

按 **创建（Create）** 会完成烘焙操作，这会根据烘焙的动画使用关键帧创建FK控制绑定轨道。

![烘焙到fk控制绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95afdb16-7569-49a4-95eb-57736c150d30/bake2.gif)

使用FK控制绑定编辑动画后，你还可以烘焙回动画序列，方法是右键点击 **骨架网格体轨道（Skeletal Mesh track）** ，然后选择 **烘焙动画序列（Bake Animation Sequence）** 或 **创建链接的动画序列（Create Linked Animation Sequence）** 。

![将fk控制绑定烘焙到动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c6ecf3e-0163-4a18-9aff-ff54ff0cd9c4/bake3.png)

### 筛选骨骼列表

根据骨架网格体，FK控制绑定显示的骨骼列表有时可能非常大，并且可能包含你的动画用不到的骨骼。要解决该问题，你可以筛选所显示的骨骼列表，使其仅显示与你的工作流程相关的骨骼。

要筛选骨骼，请右键点击 **FK控制绑定轨道（FK Control Rig track）** ，然后点击 **选择要制作动画的骨骼或曲线（Select Bones Or Curves To Animate）** 。这会打开一个窗口，你可以在其中手动允许或禁止各个骨骼显示。

![fk控制绑定骨骼筛选器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0796feb9-8a78-437d-b92f-7eb4a1a1ad27/filter1.png)

被筛选掉的骨骼会将从FK控制绑定轨道中被移除，并在视口中被隐藏，这样就可以更轻松地只处理你需要的骨骼。指定要筛选的骨骼后，点击 **确定（OK）** 应用筛选器。

![fk控制绑定骨骼筛选器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7f0f49a-9838-4288-99ba-10bee16622c3/filter2.png)

-   [control rig](https://dev.epicgames.com/community/search?query=control%20rig)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [fk](https://dev.epicgames.com/community/search?query=fk)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/fk-control-rig-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [创建和概述](/documentation/zh-cn/unreal-engine/fk-control-rig-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E6%A6%82%E8%BF%B0)
-   [用途](/documentation/zh-cn/unreal-engine/fk-control-rig-in-unreal-engine#%E7%94%A8%E9%80%94)
-   [叠加FK](/documentation/zh-cn/unreal-engine/fk-control-rig-in-unreal-engine#%E5%8F%A0%E5%8A%A0fk)
-   [烘焙到FK控制绑定](/documentation/zh-cn/unreal-engine/fk-control-rig-in-unreal-engine#%E7%83%98%E7%84%99%E5%88%B0fk%E6%8E%A7%E5%88%B6%E7%BB%91%E5%AE%9A)
-   [筛选骨骼列表](/documentation/zh-cn/unreal-engine/fk-control-rig-in-unreal-engine#%E7%AD%9B%E9%80%89%E9%AA%A8%E9%AA%BC%E5%88%97%E8%A1%A8)
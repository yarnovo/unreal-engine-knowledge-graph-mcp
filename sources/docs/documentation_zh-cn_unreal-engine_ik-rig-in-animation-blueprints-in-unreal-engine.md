# 虚幻引擎中动画蓝图中的IK Rig | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/ik-rig-in-animation-blueprints-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:06:08.696Z

---

目录

![动画蓝图中的IK Rig](https://dev.epicgames.com/community/api/documentation/image/2bd55339-a748-4bba-a001-2e2e93e904af?resizing_type=fill&width=1920&height=335)

在创建 **IK Rig** 后，可以在[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)中加以引用，从而在游戏中使用相应的IK行为。

本文档概述了此过程以及可供使用的各种功能。

#### 先决条件

-   已经为 **骨骼网格体** 创建一个IK Rig。请参阅[IK Rig编辑器](/documentation/zh-cn/unreal-engine/ik-rig-in-unreal-engine)页面了解示例设置指南。
-   骨骼网格体包含一个 **动画蓝图**。如果没有，将由[第三人称模板](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine)项目为你提供。
-   基本了解[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)的使用。

## 设置

IK Rig会在动画蓝图的AnimGraph面板中引用。右键单击 **图表**，然后从 **杂项（Misc）** 类目中选择 **IK Rig** 以创建一个IK Rig节点。

![ik rig blueprint node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/896ac544-12ce-452b-895a-ae8a701f8fc8/setup1.png)

添加完成后，需要在 **细节（Details）** 面板中将IK Rig指定给 **Rig定义资产（Rig Definition Asset）** 属性。

![ik rig definition asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48438d81-870b-4e20-a255-665b2de71f1a/setup2.png)

在常用设置中，IK Rig节点放置在大部分运动和其他AnimBP逻辑之后。这样可以保证IK调整会在其他效果之后按照顺序正确执行。

![ik rig node graph placement](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d1d9e42-c0c9-4435-8aca-deb86812cd1a/setup3.png)

## 用法

默认情况下，IK Rig不会导致动画姿势发生任何变化。为了从节点影响IK更改，你需要公开IK目标（IK Goal）的位置、旋转或将两者同时公开。

为此，请在 **IK Rig编辑器（IK Rig editor）** 中选择一个 **IK目标（IK Goal）**，并在 **细节（Details）** 面板中启用 **公开位置（Expose Position）** 和 **公开旋转（Expose Rotation）**。这将在IK Rig节点上为该目标的位置或旋转添加引脚，并公开目标以供操作。

![expose position expose rotation](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c403d31d-d67d-407b-9af7-7c5aa98d516c/usage1.png)

你可以在此处为这些属性创建 **变量（Variables）**，并构建操作IK Rig的逻辑。

可以通过调整 **目标位置（Goal Position）** 或 **旋转（Rotation）** 引脚值来测试动画蓝图中IK Rig的行为。

![ik rig node adjust ik position](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8706c642-e2a0-48d3-aff0-8e15d36f8b92/usage2.png)

编辑 **位置/旋转Alpha（Position / Rotation Alpha）** 将在相应轴上为该目标混合开关IK效果。

![position rotation alpha](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7b8fda6-1642-43d6-926b-46399c0e3aa0/usage3.gif)

## 属性

选择IK Rig节点后，"细节（Details）"面板中将出现以下特定于IK Rig的属性：

![ik rig node properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b961572-f115-4eea-af73-b0792e3d89c4/properties.png)

名称

描述

**目标**

属性分段将填充每个公开的IK目标，并为你提供控制其行为的其他设置。你可以将目标指定为以下一种类型：

-   **手动输入（Manual Input）**，公开节点上的位置和旋转引脚，以手动控制目标的变换。你还可以选择应用于目标的位置或旋转空间：
    -   **叠加（Additive）**，将目标变换视为相对于执行器处的骨骼而言的世界空间叠加偏移。
    -   **组件（Component）**，将目标变换视为处于骨骼网格体Actor组件的空间中。
    -   **世界（World）**，将目标变换视为处于世界空间中。
-   **骨骼（Bone）**，可以在此骨架中指定目标将吸附的骨骼。这在使用辅助骨骼时很有用，例如武器或道具骨骼，它们可以进行程序化调整。
    
    ![ik goal bone](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04bc22f9-3ba0-4a1a-81be-dad62e3c20c3/goals.png)

**Rig定义资产（Rig Definition Asset）**

用于修改传入姿势的IK Rig资产。

**从引用姿势开始（Start from Ref Pose）**

启用此功能会忽略传入的姿势，转而使用骨骼网格体引用姿势开始求解。

**启用调试绘制（Enable Debug Draw）**

这实现了所有IK目标在视口中的可视性，以便进行调试和预览。

![enable debug draw](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4fd2dee8-0c1e-47eb-9507-1166576609b3/debugdraw.png)

**调试比例（Debug Scale）**

在"启用调试绘制（Enable Debug Draw）"启用时，增大或减小IK Rig调试绘制的比例。

-   [animation](https://dev.epicgames.com/community/search?query=animation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/ik-rig-in-animation-blueprints-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [设置](/documentation/zh-cn/unreal-engine/ik-rig-in-animation-blueprints-in-unreal-engine#%E8%AE%BE%E7%BD%AE)
-   [用法](/documentation/zh-cn/unreal-engine/ik-rig-in-animation-blueprints-in-unreal-engine#%E7%94%A8%E6%B3%95)
-   [属性](/documentation/zh-cn/unreal-engine/ik-rig-in-animation-blueprints-in-unreal-engine#%E5%B1%9E%E6%80%A7)
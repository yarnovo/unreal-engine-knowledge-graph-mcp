# 虚幻引擎动画蓝图Twist Corrective | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-blueprint-twist-corrective-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:04:41.727Z

---

目录

![Twist Corrective](https://dev.epicgames.com/community/api/documentation/image/bc5f932a-92ea-4921-bf8b-9b9ab91bd1f4?resizing_type=fill&width=1920&height=335)

你可以使用 **Twist Corrective** [动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)节点来控制[动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)，例如[变形目标](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)。在此过程中你需要用到增量角度的变换，而增量角度要根据 **扭转平面（Twist Planer）** 的方向使用 **基础帧（Base Frame）** 和 **扭转帧（Twist Frame）** 计算得出。

![twist corrective动画蓝图节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b13d954-b040-4b8a-9bd2-38e3c2bc30fc/twist.png)

## 概述

你可以使用Twist Corrective节点根据一个骨骼相对于另一个骨骼的扭转来驱动[动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)值，例如[变形目标](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)。

在下面的示例中，角色的嵌接变形目标随着头部骨骼扭转而调整，这样看起来更自然。

![twist corrective已禁用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0272912-7a31-40e3-b5cf-b6531cea8a45/demooff.gif)

![twist corrective已启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a71b3b2-ac29-450f-90e7-ae59d8b33fab/demoon.gif)

已禁用Twist Corrective

已启用Twist Corrective

### 示例工作流程

Twist Corrective节点在 **组件空间（Component Space）** 中运行，因此需要进行[空间转换](/documentation/zh-cn/unreal-engine/animation-blueprint-component-space-conversion-in-unreal-engine)，以在角色的动画蓝图中实现该节点。

首先，你必须选择充当 **基础帧（Base Frame）** 的骨骼，或选择一个参考骨骼，来计算扭转骨骼的alpha。此外，请务必定义扭转alpha所在的运动是相对于哪个轴。在轴（Axis）属性中，将值设置为1，定义运动将在哪个轴中发生。在提供的示例中，使用了neck\_02骨骼，并为Z轴提供了值1。

![twist corrective动画蓝图节点细节面板中的基础帧设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb63c5d5-27a8-4659-902a-98eb4d2f2ae2/baseframe.png)

接下来，选择经历扭转运动的骨骼作为 **扭转帧骨骼（Twist Frame Bone）** ，在示例中，使用了 **头部** 骨骼。你还必须定义运动的轴，在本例中，该属性将仅使用 **Z** 轴上的值 **1**，复制 **基础帧轴（Base Frame Axis）** 。

![twist corrective动画蓝图节点细节面板中的扭转帧设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5daf4791-9391-4adf-bb4e-ab5cc054fc48/twistframe.png)

你还必须设置扭转平面作为参考点，以计算alpha运动。在示例中，在 **Y** 轴（Y-Axis）字段中设置了值 **1** 来启用 **Y** 轴。

![twist corrective动画蓝图节点细节面板中的扭转平面法线轴设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bfcdeb5e-893b-493a-bcfb-ea9723fca49c/twistplane.png)

最后，你必须输入[动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)的名称，在本例中，这是供Twist Corrective节点遵循的变形目标。在工作流程示例中，是变形目标 `C_BipedHeadNeck_A_NeckMid_Jnt_n11_44_n1`，它表示演示中可见的嵌接运动。

![twist corrective动画蓝图节点细节面板中的曲线名称设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d4157d0-3322-4fba-9bfe-bf49dea62375/curvename.png)

编译动画蓝图后，效果应该可见，因为头部骨骼在视口中沿 **Z** 轴旋转。

## 属性参考

![twist corrective动画蓝图节点细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa146eae-dd98-4906-be95-08a7276acab7/details.png)

下面你可以参考Twist Corrective节点的一系列属性。

属性

说明

**基础帧（Base Frame）**

基础帧系列的属性定义了计算 **扭转帧（Twist Frame）** 的运动alpha的参考点。

在 **骨骼（Bone）** 属性中，你可以从角色的[骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)选择要用作基础帧的骨骼。

在 **轴（Axis）** 属性中，你可以选择要计算运动的运动轴。值为 **0** 时不会计算运动，值为 **1** 时将计算正向运动，值为 **\-1** 时将计算负向运动。

你还可以启用在 **在本地空间中（In Local Space）** 属性以在本地空间中计算运动，或禁用 **在本地空间中（In Local Space）** 以在世界空间中计算运动。

**扭转帧（Twist Frame）**

扭转帧系列属性定义了扭转骨骼，以相对于 **基础帧（Base Frame）** 和 **扭转刨刀法线轴（Twist Planer Normal Axis）** 计算运动alpha。

在 **骨骼（Bone）** 属性中，你可以从角色的[骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)选择要用作扭转帧的骨骼。

在 **轴（Axis）** 属性中，你可以选择要计算运动的运动轴。值为 **0** 时不会计算运动，值为 **1** 时将计算正向运动，值为 **\-1** 时将计算负向运动。

你还可以启用在 **在本地空间中（In Local Space）** 属性以在本地空间中计算运动，或禁用 **在本地空间中（In Local Space）** 以在世界空间中计算运动。

**扭转刨刀法线轴（Twist Planer Normal Axis）**

此处你可以设置平面的法线，以计算 **扭转帧（Twist Frame）\* 相对于** 基础帧（Base Frame）\*\* 的角度alpha。

在 **轴（Axis）** 属性中，你可以选择要计算运动的运动轴。值为 **0** 时不会计算运动，值为 **1** 时将计算正向运动，值为 **\-1** 时将计算负向运动。

你还可以启用在 **在本地空间中（In Local Space）** 属性以在本地空间中计算运动，或禁用 **在本地空间中（In Local Space）** 以在世界空间中计算运动。

**最大角度度数（Max Angle in Degree）**

设置将值输出到 **曲线（Curve）** 的扭转的最大限制。例如，在怎样的度数下扭转才会导致输出最大曲线值。值不能超过180。

**映射的范围下限（Mapped Range Min）**

要应用于曲线的最小值。值0表示曲线开头，值 **1** 表示曲线结尾。

**映射的范围上限（Mapped Range Max）**

要应用于曲线的最大值。值0表示曲线开头，值 **1** 表示曲线结尾。

**曲线（Curve）**

输入你想根据 **扭转帧骨骼（Twist Frame Bone）** 中计算的扭转alpha来应用 **映射的范围下限（Mapped Range Min）** 和 **映射的范围上限（Mapped Range Max）** 的[曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)或[变形目标](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)的名称。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animation blending](https://dev.epicgames.com/community/search?query=animation%20blending)
-   [skeletal control](https://dev.epicgames.com/community/search?query=skeletal%20control)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/animation-blueprint-twist-corrective-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [示例工作流程](/documentation/zh-cn/unreal-engine/animation-blueprint-twist-corrective-in-unreal-engine#%E7%A4%BA%E4%BE%8B%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
-   [属性参考](/documentation/zh-cn/unreal-engine/animation-blueprint-twist-corrective-in-unreal-engine#%E5%B1%9E%E6%80%A7%E5%8F%82%E8%80%83)
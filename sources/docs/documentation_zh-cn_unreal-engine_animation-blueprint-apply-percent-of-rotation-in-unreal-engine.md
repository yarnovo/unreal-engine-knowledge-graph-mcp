# 在虚幻引擎的动画蓝图中应用旋转百分比 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-blueprint-apply-percent-of-rotation-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:04:04.758Z

---

目录

![应用旋转百分比](https://dev.epicgames.com/community/api/documentation/image/0b01321b-8d7b-48fe-8159-c6fbb40d1337?resizing_type=fill&width=1920&height=335)

借助[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)中的 **应用旋转百分比（Apply a Percentage of Rotation）** 节点，你可以将 **源骨骼（Source Bone）** 的旋转运动应用到 **目标骨骼（Target Bone）** 上。

这里，机器人的天线骨骼结匹配了其头部骨骼的X轴旋转运动。

![不应用旋转百分比](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a4640fd-389a-4dfc-b685-4bc69661179b/botdemooff.gif)

![应用旋转百分比](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d27a8de5-96d2-4208-9312-8702aabd35ba/botdemoon.gif)

不应用旋转百分比

应用旋转百分比

## 概况

应用旋转百分比节点在 **组件空间（Component Space）** 中运作，所以角色的动画蓝图中必须有一个[空间转换](/documentation/zh-cn/unreal-engine/animation-blueprint-component-space-conversion-in-unreal-engine)才能实现这个节点。

![应用旋转百分比动画蓝图节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61447ac1-b24c-4310-8c33-e38f872622ab/applypercentage.png)

通过 **Alpha** 属性（引脚），你可以控制在生成的输出姿势上应用旋转的程度。数值 **1** 会使用生成的输出姿势，而数值 **0** 会直接输出源姿势。

**乘数（Multiplier）** 属性（引脚）允许你在 **源骨骼（Source Bones）** 旋转度的基础上实现更大的旋转。

**乘数（Multiplier）** 数值为0时，不会在目标骨骼上进行任何旋转。

应用旋转百分比节点的 **细节（Details）** 面板中可以选择要复制动作的 **源骨骼**，以及要应用复制来的旋转的 **目标骨骼**。

![应用旋转百分比动画蓝图节点细节面板中的源骨骼和目标骨骼属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b85c6196-9028-475d-b51c-939146627ac3/detailspanelhighlight.png)

请参阅[属性参考](/documentation/zh-cn/unreal-engine/animation-blueprint-apply-percent-of-rotation-in-unreal-engine#propertyreference)表格来了解应用旋转百分比节点的更多属性。

### 叠加节点

叠加多个应用旋转百分比节点可以实现多轴旋转，并且可以给每个节点分配不同的旋转轴。

![叠加的应用旋转百分比动画蓝图节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfd9e5d1-90b3-4ac7-99c0-819d5b800896/stack.png)

叠加应用旋转百分比节点时，要确保 **细节** 面板中的 **可叠加（Is Additive）** 属性已启用，才能让多个节点给一块骨骼应用旋转。在同一块骨骼上同时使用应用旋转百分比节点和其它动画或者节点时也需要选用该属性。

## 属性参考

![应用旋转百分比动画蓝图节点细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/668bc03f-e20d-4cfa-af91-b330b9f07784/detailspanel.png)

下表罗列了应用旋转百分比节点的各个属性。

属性

描述

**目标骨骼（Target Bone）**

从角色的[骨骼](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)中选择一块骨骼用于应用来自 **源骨骼（Source Bone）** 的旋转。目标骨骼的子骨骼也会根据父骨骼的动作而运动。

**源骨骼（Source Bone）**

旋转要从中复制旋转动作的骨骼，使用的旋转轴由 **引用旋转轴（Rotation Axis To Refer）** 属性决定。该旋转会被应用到 **目标骨骼（Target Bone）**。

**乘数（Multiplyer）**

设置乘数，将 **源骨骼（Source Bone）** 的旋转运动应用到 **目标骨骼（Target Bone）** 上。数值1意味着原样复制旋转。

默认给属性可以在选中节点的 **动画图表（AnimGraph）** 中找到。

**引用旋转轴（Rotation Axis To Refer）**

这里可以旋转复制 **源骨骼（Source Bone）** 上的哪一个旋转轴并将其应用到 **目标骨骼（Target Bone）**。

**可叠加（Is Additive）**

启用该属性可以让应用到骨骼上的旋转动作叠加。禁用该属性将会覆盖之前 **目标骨骼（Target Bone）** 的所有动作。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animation blending](https://dev.epicgames.com/community/search?query=animation%20blending)
-   [skeletal controls](https://dev.epicgames.com/community/search?query=skeletal%20controls)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概况](/documentation/zh-cn/unreal-engine/animation-blueprint-apply-percent-of-rotation-in-unreal-engine#%E6%A6%82%E5%86%B5)
-   [叠加节点](/documentation/zh-cn/unreal-engine/animation-blueprint-apply-percent-of-rotation-in-unreal-engine#%E5%8F%A0%E5%8A%A0%E8%8A%82%E7%82%B9)
-   [属性参考](/documentation/zh-cn/unreal-engine/animation-blueprint-apply-percent-of-rotation-in-unreal-engine#%E5%B1%9E%E6%80%A7%E5%8F%82%E8%80%83)
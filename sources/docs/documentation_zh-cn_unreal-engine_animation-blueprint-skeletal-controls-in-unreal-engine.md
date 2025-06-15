# 虚幻引擎动画蓝图中的骨骼控制 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-blueprint-skeletal-controls-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:03:44.479Z

---

目录

![骨骼控制](https://dev.epicgames.com/community/api/documentation/image/6d2d600d-4b50-4a6b-befe-19df13d4f179?resizing_type=fill&width=1920&height=335)

使用 **骨骼控制（Skeletal Control）** [动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)节点，你可以直接控制角色的[骨架资产](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)。骨骼控制节点可在角色的动画蓝图中的 **AnimGraph** 上使用，以控制单独的骨骼，创建IK链以及其他由骨骼驱动的流程性动态动画。

![概述骨骼控制节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3ae2156-7165-41ee-b773-55f44837d841/overview.png)

骨骼控制节点的结构类似于其他AnimBP节点。节点可以通过 **输入引脚** 接收动画姿势，并通过 **输出引脚** 生成修改的姿势。大部分骨骼控制节点在 **组件空间（Component Space）** 中操作和计算变换。**组件空间（Component Space）** 中生成的动画姿势相对于角色的[骨骼网格体组件](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)而非骨骼的父骨骼来计算骨骼变换。组件空间姿势引脚在动画图表中显示为蓝色。

![高亮了输入和输出引脚组件姿势的骨骼控制动画蓝图节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec372bc4-3359-42a7-accf-438bca1aba20/inputoutput.png)

你可以使用[空间转换节点](/documentation/zh-cn/unreal-engine/animation-blueprint-component-space-conversion-in-unreal-engine)将姿势从本地空间转换到组件空间。

![空间转换节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee4ca173-ab55-4d38-b87e-88fb652175ff/overview.png)

空间转换节点会对项目的性能带来相关成本。推荐将特定依赖空间的函数分组在一起，尽可能接近最终姿势节点，从而尽可能减少空间转换的发生。

**Alpha值** 在骨骼控制节点中也很常见。类似于[混合节点](/documentation/zh-cn/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine)，alpha值将控制在生成新姿势时对源姿势应用的修改程度。

![高亮了alpha引脚的骨骼控制节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d1a0c40-0233-4745-88b9-b6d4b50965a8/alpha.png)

对于骨骼控制节点，0.0到1.0之间的浮点值用作alpha值，以确定应用的骨骼变换的权重。使用值0.0时，输入姿势将获得完全权重，而使用值1.0时，控制点的计算变换将获得完全权重。

在每个骨骼控制节点的 **细节（Details）** 面板中，你还可以设置考虑节点的 **LOD阈值（LOD Threshold）** 。 定义为LOD阈值的值将是使用骨骼控制节点的最高LOD级别。使用更高的[LOD级别](/documentation/zh-cn/unreal-engine/skeletal-mesh-lods-in-unreal-engine)时，模型的质量更低，将忽略骨骼控制节点。

![骨骼控制节点的细节面板中的lod细节级别阈值属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a10e9009-66fa-4602-8790-ee8daecccc7f/lodthreshold.png)

通过限制LOD级别骨骼控制节点来计算骨骼变换，你可以降低动画系统的性能成本。

## 骨骼控制节点

你可以在此处参考更多文档，了解你可以在项目中使用的所有骨骼控制节点。

[

![AnimDynamics](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc89260d-8e49-4791-abfa-e4cb1e79527b/topicimage.png)

AnimDynamics

介绍如何将Anim Dynamics AnimBP节点用作轻量级物理模拟解决方案，你可以通过该解决方案将基于物理的辅助动画应用于角色。





](/documentation/zh-cn/unreal-engine/animation-blueprint-animdynamics-in-unreal-engine)[

![应用旋转百分比](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae8cd5bb-6f92-474f-bcf6-fc86c3afa1dc/topicimage.png)

应用旋转百分比

介绍如何应用旋转百分比，并通过骨架中其他骨骼的旋转的指定百分比数值，形成目标骨骼的旋转。





](/documentation/zh-cn/unreal-engine/animation-blueprint-apply-percent-of-rotation-in-unreal-engine)[

![骨骼驱动控制器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea67198f-30ff-4960-8042-ee60c05bfd4a/topicimage.png)

骨骼驱动控制器

介绍骨骼驱动控制器节点。此节点允许 '驱动' 骨骼动态影响目标对象的运动。





](/documentation/zh-cn/unreal-engine/animation-blueprint-bone-driven-controller-in-unreal-engine)[

![CCDIK](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09f1a053-538c-4e3b-af12-36d45a4dc39b/topicimage.png)

CCDIK

介绍如何访问并使用CCDIK骨架控制节点来设置并控制IK链。





](/documentation/zh-cn/unreal-engine/animation-blueprint-ccdik-in-unreal-engine)[

![复制骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48c16f00-9119-4cef-b7b4-a3deac545a2a/topicimage.png)

复制骨骼

介绍复制骨骼节点——一种可以将变换数据或其任何组件从一个骨骼复制到另一个骨骼的节点。





](/documentation/zh-cn/unreal-engine/animation-blueprint-copy-bone-in-unreal-engine)[

![手部IK重定向](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4bd4ab30-d10e-45ac-a7e5-76022c16d457/topicimage.png)

手部IK重定向

介绍可用于处理IK骨骼重定向的手部IK重定向控制点。





](/documentation/zh-cn/unreal-engine/animation-blueprint-hand-ik-retargeting-in-unreal-engine)[

![Look At](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/daf32aed-5d17-4c27-bd9b-e6ab3f23f18e/topicimage.png)

Look At

介绍如何使用Look At控制点指定要追踪或跟随另一骨骼的骨骼。





](/documentation/zh-cn/unreal-engine/animation-blueprint-head-look-at-in-unreal-engine)[

![Modify Curve](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a958f8b-7dcc-409c-9a55-2a0010c64ed4/topicimage.png)

Modify Curve

介绍Modify Curve节点，该节点可在动画图表中使用任意逻辑修改动画曲线。





](/documentation/zh-cn/unreal-engine/animation-blueprint-modify-curve-in-unreal-engine)[

![观察骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5eb2e586-82f5-4097-9595-46c25901c999/topicimage.png)

观察骨骼

介绍如何使用





](/documentation/zh-cn/unreal-engine/animation-blueprint-observe-bone-in-unreal-engine)[

![RigidBody](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3366990c-5e3e-4eb7-b7e1-b66597a9f383/topicimage.png)

RigidBody

描述RigidBody节点以及如何在动画蓝图中将其作为轻量级物理模拟使用。





](/documentation/zh-cn/unreal-engine/animation-blueprint-rigid-body-in-unreal-engine)[

![Spline IK](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad1eed83-2c72-49cc-9b4a-f3ea3c8bb9bc/topicimage.png)

Spline IK

介绍如何使用





](/documentation/zh-cn/unreal-engine/animation-blueprint-spine-ik-in-unreal-engine)[

![弹簧控制器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1d41c01-a6a8-4f6a-a5ab-9eddf18b0cae/topicimage.png)

弹簧控制器

介绍弹簧控制器（Spring Controller）；弹簧控制器用于限制一个骨骼可从其参考姿势位置处拉伸的距离，超过此距离之后，将应用反方向的力。





](/documentation/zh-cn/unreal-engine/animation-blueprint-spring-controller-in-unreal-engine)[

![Trail Controller](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f04ef668-65ec-40a0-8921-e03110819744/topicimage.png)

Trail Controller

介绍Trail Controller节点如何用于影响骨骼链。





](/documentation/zh-cn/unreal-engine/animation-blueprint-trail-controller-in-unreal-engine)[

![Transform Bone](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a483f01-11f1-4795-9733-fbdb76c11392/topicimage.png)

Transform Bone

说明Transform (Modify) Bone骨骼控制点节点，该节点可用于修改指定骨骼的变换。





](/documentation/zh-cn/unreal-engine/animation-blueprint-transform-bone-in-unreal-engine)[

![Twist Corrective](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7a341a7-5718-4821-ac19-d9b0b119b72a/topicimage.png)

Twist Corrective

介绍Twist Corrective控制点如何用于根据一个骨骼相对于另一个骨骼的扭转来驱动曲线值。





](/documentation/zh-cn/unreal-engine/animation-blueprint-twist-corrective-in-unreal-engine)[

![Two Bone IK](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/abc1fd95-2886-46b1-b925-4ec1360bc0d6/topicimage.png)

Two Bone IK

介绍如何使用Two Bone IK控制点将IK用于包含3个关节的链。





](/documentation/zh-cn/unreal-engine/animation-blueprint-two-bone-ik-in-unreal-engine)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animation blending](https://dev.epicgames.com/community/search?query=animation%20blending)
-   [skeletal controls](https://dev.epicgames.com/community/search?query=skeletal%20controls)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [骨骼控制节点](/documentation/zh-cn/unreal-engine/animation-blueprint-skeletal-controls-in-unreal-engine#%E9%AA%A8%E9%AA%BC%E6%8E%A7%E5%88%B6%E8%8A%82%E7%82%B9)
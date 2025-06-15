# 虚幻引擎中的物理组件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/physics-components-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:51:41.954Z

---

目录

![物理组件](https://dev.epicgames.com/community/api/documentation/image/f5d0d4cd-9219-4229-b5f4-dcd303d071af?resizing_type=fill&width=1920&height=335)

这些物理组件用于影响那些在你的场景中以不同方式应用物理效果的任意对象。

## 物理动画组件

**物理动画组件（Physical Animation Component）** 在 **骨骼网格体（Skeletal Mesh）** 动画顶部应用 **物理模拟** 。通过使用该组件，你可以在播放动画的同时将真实的物理模拟应用到骨骼网格体中的特定骨骼组。

![Physical Animation Component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ee04273-523a-45c5-8de7-3a7fea0ec4cf/ue5_1-physical-animation.png)

## 物理约束组件

**物理约束组件（PhysicsConstraintComponent）** 是一种能连接两个刚性物体的接合点。你可以借助该组件的各类参数来创建不同类型的接合点。

借助 **PhysicsConstraintComponent** 和两个 **StaticMeshComponents** ，你可以创建悬摆型对象，如秋千、重沙袋或标牌。它们可以对世界中的物理作用做出响应，让玩家与之互动（请参见 **[约束蓝图](/documentation/zh-cn/unreal-engine/physics-constraint-component-user-guide-in-unreal-engine)** 了解基于 **Blueprints** 的相关示例）。

![Physics Constraint Component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/585e0e58-b4c1-40ff-bab8-77e672d8dae1/ue5_1-constraint.png)

## 物理抓柄组件

**物理抓柄组件（PhysicsHandleComponent）** 用于"抓取"和移动物理对象，同时允许抓取对象继续使用物理效果。案例包括"重力枪"——你可以拾取和掉落物理对象（参见 [**物理内容示例**](/documentation/zh-cn/unreal-engine/physics-in-unreal-engine) 了解详细信息）。

![Physics Handle Component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bab4254c-e88d-4aa8-ad2d-9718ee92a21a/ue5_1-handle.png)

## 物理推进器组件

**物理推进器组件（PhysicsThrusterComponent）** 可以沿着 X 轴的负方向施加特定作用力。推力组件属于连续作用力，而且能通过脚本来自动激活、一般激活或取消激活。

推力组件的用途包括火箭（见下图）。它将持续施加作用力，将火箭向上推（因为推力部分位于火箭下方）。你可以用 **阻挡体积（Blocking Volumes）** ，限制受推力影响的组件的动作。

![Physics Thruster Component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/493f0cfe-917a-4e2f-b868-a23b419bc1bc/ue5_1-thruster.png)

## 径向力组件

**径向力组件（RadialForceComponent）** 用于发出径向力或脉冲来影响物理对象或可摧毁对象。与 **PhysicsThrusterComponent** 不同，这类组件只施加"发射后不管"类型的作用力，而且并不持续。

你可以使用这类组件来推动被摧毁对象（如爆炸物）的碎片。使用 **RadialForceComponent** 指定作用力和方向，当对象被摧毁时，你可以像下面的图示那样，沿着特定方向将碎片向外"推"（参见 [**可破坏物内容示例**](/documentation/zh-cn/unreal-engine/content-examples-sample-project-for-unreal-engine) 了解详细信息）。

![Radial Force Component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65989139-2a64-44f4-82a1-d223ea4c8486/ue5_1-radial_force.png)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [物理动画组件](/documentation/zh-cn/unreal-engine/physics-components-in-unreal-engine#%E7%89%A9%E7%90%86%E5%8A%A8%E7%94%BB%E7%BB%84%E4%BB%B6)
-   [物理约束组件](/documentation/zh-cn/unreal-engine/physics-components-in-unreal-engine#%E7%89%A9%E7%90%86%E7%BA%A6%E6%9D%9F%E7%BB%84%E4%BB%B6)
-   [物理抓柄组件](/documentation/zh-cn/unreal-engine/physics-components-in-unreal-engine#%E7%89%A9%E7%90%86%E6%8A%93%E6%9F%84%E7%BB%84%E4%BB%B6)
-   [物理推进器组件](/documentation/zh-cn/unreal-engine/physics-components-in-unreal-engine#%E7%89%A9%E7%90%86%E6%8E%A8%E8%BF%9B%E5%99%A8%E7%BB%84%E4%BB%B6)
-   [径向力组件](/documentation/zh-cn/unreal-engine/physics-components-in-unreal-engine#%E5%BE%84%E5%90%91%E5%8A%9B%E7%BB%84%E4%BB%B6)

相关文档

[

内容示例

![内容示例](https://dev.epicgames.com/community/api/documentation/image/87759153-fcb5-4532-8861-ff747c395c30?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/content-examples-sample-project-for-unreal-engine)
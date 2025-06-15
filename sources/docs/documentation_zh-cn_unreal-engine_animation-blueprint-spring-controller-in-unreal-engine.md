# 虚幻引擎中的动画蓝图"弹簧控制器" | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-blueprint-spring-controller-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:04:34.792Z

---

目录

![弹簧控制器](https://dev.epicgames.com/community/api/documentation/image/4bcfc1a1-b52c-46a7-be26-701f376c4c6f?resizing_type=fill&width=1920&height=335)

借助 **弹簧控制器（Spring Controller）** [动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)节点，你可以将拉伸效果应用于角色骨架中的骨骼。

![spring controller animation blueprint node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c49dfdf7-b22b-444d-b330-0b993f712735/springcontroller.png)

此示例中的"弹簧控制器（Spring Controller）"节点用于对角色运动施加反方向的力，模拟非动画骨骼的运动。

![spring cotroller demo disabled](BPDemoOff.gif)(convert:false)

![spring controller demo enabled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fe3142e-447b-474d-81a4-647ada7a7d65/bpdemo.gif)

禁用了"弹簧控制器（Spring Controller）"

启用了"弹簧控制器（Spring Controller）"

## 属性参考

![spring controller animation blueprint node details pannel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d8ffee4-877e-467d-bf82-91fb414aa085/details.png)

"弹簧控制器（Spring Controller）"节点的属性列表如下。

属性

描述

**弹簧骨骼（Spring Bone）**

从角色的骨架中选择要应用"弹簧控制器（Spring Controller）"节点的骨骼。

**最大位移（Max Displacement）**

启用 **限制位移（Limit Displacement）** 后，设置骨骼可从参考姿势位置处拉伸的最大距离（采用虚幻引擎单位）。

**弹簧刚度（Spring Stiffness）**

设置用于计算弹簧刚度的乘数值。值越大，骨骼位移时要求的骨骼速度就越高，因此应用的力也越大，反应运动也更快。

**弹簧阻尼（Spring Damping）**

设置乘数以降低 **弹簧骨骼（Spring Bones）** 的速度，使产生的效果更平滑、更可控。

**错误重置阈值（Error Reset Thresh）**

设置一个阈值，超过此阈值将重置弹簧骨骼（采用虚幻引擎单位）。如果 **弹簧骨骼（Spring Bone）** 拉伸超过此值，则会重置以避免突然的大位移（例如由传送Actor引起）造成错误。

**限制位移（Limit Displacement）**

启用此属性后，**最大位移（Max Displacement）** 属性将生效。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [skeletal controls](https://dev.epicgames.com/community/search?query=skeletal%20controls)
-   [animation graph](https://dev.epicgames.com/community/search?query=animation%20graph)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [属性参考](/documentation/zh-cn/unreal-engine/animation-blueprint-spring-controller-in-unreal-engine#%E5%B1%9E%E6%80%A7%E5%8F%82%E8%80%83)
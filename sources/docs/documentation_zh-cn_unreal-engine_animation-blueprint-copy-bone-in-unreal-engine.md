# 虚幻引擎中的动画蓝图"复制骨骼" | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-blueprint-copy-bone-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:04:06.788Z

---

目录

![复制骨骼](https://dev.epicgames.com/community/api/documentation/image/1d3a0b43-b044-4a04-83c6-af764d706455?resizing_type=fill&width=1920&height=335)

借助 [动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)中的 **复制骨骼（Copy Bone）**节点，你可以将 **平移（Translation）**、**旋转（Rotation）** 和 **缩放（Scale）** 等变换数据从 **源骨骼（Source Bone）** 复制到 **目标骨骼（Target Bone）**。

![copy bone animation blueprint node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/233c457c-5a73-464a-8728-9138b6e7bbe5/copybone.png)

得益于一种简单的实现方式，你可以用"复制骨骼（Copy Bone）"节点将 **源骨骼（Source Bone）** 的位置和运动复制到 **目标骨骼（Target Bone）**。例如，此处选择了角色的右手辅助武器骨骼（`weapon_r`）作为 **目标骨骼（Target Bone）**，然后复制 **源骨骼（Source Bone）**，也就是角色的左手骨骼（`hand_l`）、位置和运动。现在，我们可以看到"复制骨骼（Copy Bone）"节点的效果：在运行时将武器骨骼从角色的右手移动到左手。

![copy bone demo disabled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f41c770-d99b-485a-bda9-10e35196e78b/wbdemooff.gif)

![copy bone demo enabled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1c899c0-8a29-40aa-888d-b3cae0982c3d/wbdemoon.gif)

禁用了复制骨骼

启用了复制骨骼

使用"复制骨骼（Copy Bone）"节点的这一实现方式可以在动画播放期间将某个对象从[骨骼网格体（Skeletal Mesh）](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)的一只手传递到另一只手。

在 **AnimGraph** 中，你可以切换不同的运动组件，包括 **平移（Translation）**、**旋转（Rotation）** 和 **缩放（Scale）**，从而将 **源骨骼（Source Bone）** 运动应用到 **目标骨骼（Target Bone）**。

使用 **Alpha** 值或引脚，可以控制生成的输出姿势的混合程度。值为 **1** 将使用生成的输出姿势，而值为 **0** 将会输出源姿势。

## 属性参考

![copy bone animation blueprint node details pannel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/142dbf7e-966c-4632-805d-68877b53cc0d/details.png)

"复制骨骼（Copy Bone）"节点的属性如下。

属性

描述

**源骨骼（Source Bone）**

从角色的[骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)中选择一个骨骼作为应用于 **目标骨骼（Target Bone）** 的运动数据源。

**目标骨骼（Target Bone）**

从角色的[骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)中选择一个骨骼作为运动数据目标。

**复制平移（Copy Translation）**

将 **平移（Translation）** 运动从 **源骨骼（Source Bone）** 应用到 **目标骨骼（Target Bone）**。默认情况下，此属性在 **AnimGraph** 中的节点上显示为布尔值。

**复制旋转（Copy Rotation）**

将 **旋转（Rotation）** 运动从 **源骨骼（Source Bone）** 应用到 **目标骨骼（Target Bone）**。默认情况下，此属性在 **AnimGraph** 中的节点上显示为布尔值。

**复制缩放（Copy Scale）**

将 **缩放（Scale）** 运动从 **源骨骼（Source Bone）** 应用到 **目标骨骼（Target Bone）**。默认情况下，此属性在 **AnimGraph** 中的节点上显示为布尔值。

**控制空间（Control Space）**

选择在哪个空间中计算 **源骨骼（Source Bone）** 运动并应用于 **目标骨骼（Target Bone）**。

-   **世界空间（World Space）**：复制 **源骨骼（Source Bone）** 在世界空间中的绝对位置。
-   **组件空间（Component Space）**：在[骨骼网格体（Skeletal Mesh）](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)的参考框架内复制 **源骨骼（Source Bone）** 的位置和运动数据。
-   **父骨骼空间（Parent Bone Space）**：复制 **源骨骼（Source Bone）** 相对于父骨骼的位置和运动数据。
-   **骨骼空间（Bone Space）**：复制 **源骨骼（Source Bone）** 在其自己的参考框架内的位置和运动数据。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [landing page](https://dev.epicgames.com/community/search?query=landing%20page)
-   [skeletal controls](https://dev.epicgames.com/community/search?query=skeletal%20controls)
-   [skeletal control](https://dev.epicgames.com/community/search?query=skeletal%20control)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [属性参考](/documentation/zh-cn/unreal-engine/animation-blueprint-copy-bone-in-unreal-engine#%E5%B1%9E%E6%80%A7%E5%8F%82%E8%80%83)
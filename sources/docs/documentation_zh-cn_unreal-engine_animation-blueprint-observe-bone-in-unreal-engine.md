# 虚幻引擎中的动画蓝图"观察骨骼" | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-blueprint-observe-bone-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:04:10.544Z

---

目录

![观察骨骼](https://dev.epicgames.com/community/api/documentation/image/93e07bf4-0544-4c20-888a-84f2bf096ec0?resizing_type=fill&width=1920&height=335)

借助[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)中的 **观察骨骼（Observe Bone）** 节点，你可以观察选定骨骼的平移、旋转和缩放运动以便进行调试。

![observe bone animation blueprint node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eafb8c9e-a43f-4df2-9621-c4f3dbdcbf91/observebone.png)

此处正在动画过程中观察角色的 `upperarm_l`。

![observe bone animation blueprint node demonstration](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbbd410d-04d3-41f1-bb90-e85fa49916f5/demo.gif)

该节点将在 **AnimGraph** 中使用 **要观察的骨骼（Bone to Observe）** 运动的坐标来显示调试数据。调试数据的每一行显示每个轴上运动数据的元素。

例如：

-   **TX** 表示在X轴上"平移（Translation）"。
-   **RY** 表示在Y轴上"旋转（Rotation）"。
-   **SZ** 表示在Z轴上"缩放（Scale）"。

## 属性参考

该节点的 **细节（Details）** 面板中可访问的"观察骨骼（Observe Bone）"属性如下。

属性

描述

**要观察的骨骼（Bone to Observe）**

在此处可定义角色[骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)中的骨骼以追踪位置和运动数据。

**显示空间（Display Space）**

在此处可选择在哪个空间中计算 **要观察的骨骼（Bone to Observe）** 运动。

-   **世界空间（World Space）**：观察 **要观察的骨骼（Bone to Observe）**\* 在世界空间中的绝对位置。
-   **组件空间（Component Space）**：观察 **要观察的骨骼（Bone to Observe）** 在[骨骼网格体（Skeletal Mesh）](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)的参考框架内的位置。
-   **父骨骼空间（Parent Bone Space）**：观察 **要观察的骨骼（Bone to Observe）** 相对于父骨骼的位置。
-   **骨骼空间（Bone Space）**：观察 **要观察的骨骼（Bone to Observe）** 在其自己的参考框架内的位置。

**相对于参考姿势（Relative to Ref Pose）**

启用此属性后，将根据 **显示空间（Display Space）** 属性中定义的空间，追踪与[骨骼网格体（Skeletal Mesh）](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)的参考姿势相关的 **要观察的骨骼（Bone to Observe）** 的位置和运动数据。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [skeletal control](https://dev.epicgames.com/community/search?query=skeletal%20control)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [属性参考](/documentation/zh-cn/unreal-engine/animation-blueprint-observe-bone-in-unreal-engine#%E5%B1%9E%E6%80%A7%E5%8F%82%E8%80%83)
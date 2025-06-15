# 虚幻引擎中的动画蓝图Transform Bone | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-blueprint-transform-bone-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:04:34.819Z

---

目录

![Transform Bone](https://dev.epicgames.com/community/api/documentation/image/39de5a7e-1d7a-4b1d-aa4b-0f33cfd8a9ae?resizing_type=fill&width=1920&height=335)

你可以使用[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)中的 **Transform (Modify) Bone** 节点对指定骨骼进行变换（**平移** 、 **旋转** 和 **缩放** 。

![transform bone动画蓝图节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb5e6eba-6bdd-465b-a2fe-383ebf93009f/transformbone.png)

使用 **要修改的骨骼（Bone to Modify）** 属性选择要控制的骨骼之后，你可以在 **平移（Translation）** 、 **旋转（Rotation）** 和 **缩放（Scale）** 属性分段中选择变换模式种类。此处选择了角色的 `upperarm_l` ，并且正在使用视口中的控制器进行累加变换。

![transform modify bone动画蓝图节点演示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eaedb7c0-cbc6-4837-bdb6-fc423a19d84e/demo.gif)

Transform Bone节点在 **组件空间（Component Space）** 中运行，因此需要进行[空间转换](/documentation/zh-cn/unreal-engine/animation-blueprint-component-space-conversion-in-unreal-engine)，以在角色的动画蓝图中实现该节点。

## 属性参考

![transform bone动画蓝图节点细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61c7e9bd-5782-406f-9ac1-e85294fa2a10/details.png)

下面你可以参考Transform Bone节点的一系列属性。

属性

说明

**要修改的骨骼（Bone To Modify）**

从角色的[骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)选择要使用Transform Bone节点控制的骨骼。

**平移（Translation）**

控制所选骨骼的 **平移** 。默认情况下，平移坐标可在AnimGraph中控制。

你可以使用 **平移模式（Translation Mode）** 属性设置节点，以 **忽略（Ignore）** 节点所做的修改并保留骨骼上的现有平移，**替换现有（Replace Existing）** 以将骨骼上的平移替换为节点所执行的平移，以及 **添加到现有（Add to Existing）** 以将Transform Bone的平移添加到骨骼上的现有平移。

你还可以设置节点的 **平移空间（Translation Space）** ，以控制应用了平移的空间。你可以设置以下选项：

-   **世界空间（World Space）** ：根据世界空间中的绝对位置应用平移。
-   **组件空间（Component Space）** ：根据骨骼相对于[骨骼网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)的参考帧的位置应用平移。
-   **父骨骼空间（Parent Bone Space）** ：根据骨骼相对于父骨骼的位置应用平移。
-   **骨骼空间（Bone Space）** ：根据骨骼自己的参考帧应用平移。

**旋转（Rotation）**

控制所选骨骼的 **旋转** 。默认情况下，旋转坐标可在AnimGraph中控制。

你可以使用 **旋转模式（Rotation Mode）** 属性设置节点，以 **忽略（Ignore）** 节点所做的修改并保留骨骼上的现有旋转，**替换现有（Replace Existing）** 以将骨骼上的旋转替换为节点所执行的旋转，以及 **添加到现有（Add to Existing）** 以将Transform Bone的旋转添加到骨骼上的现有旋转。

你还可以设置节点的 **旋转空间（Rotation Space）** ，以控制应用了旋转的空间。你可以设置以下选项：

-   **世界空间（World Space）** ：根据世界空间中的绝对位置应用旋转。
-   **组件空间（Component Space）** ：根据骨骼相对于[骨骼网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)\*\* 的参考帧的位置应用旋转。
-   **父骨骼空间（Parent Bone Space）** ：根据骨骼相对于父骨骼的位置应用旋转。
-   **骨骼空间（Bone Space）** ：根据骨骼自己的参考帧应用旋转。

**缩放（Scale）**

控制所选骨骼的 **缩放** 。默认情况下，缩放坐标可在AnimGraph中控制。

你可以使用 **缩放模式（Scale Mode）** 属性设置节点，以 **忽略（Ignore）** 节点所做的修改并保留骨骼上的现有缩放，**替换现有（Replace Existing）** 以将骨骼上的缩放替换为节点所执行的缩放，以及 **添加到现有（Add to Existing）** 以将Transform Bone的缩放添加到骨骼上的现有缩放。

你还可以设置节点的 **缩放空间（Scale Space）** ，以控制应用了缩放的空间。你可以设置以下选项：

-   **世界空间（World Space）** ：根据世界空间中的绝对位置应用缩放。
-   **组件空间（Component Space）** ：根据骨骼相对于[骨骼网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)\*\* 的参考帧的位置应用缩放。
-   **父骨骼空间（Parent Bone Space）** ：根据骨骼相对于父骨骼的位置应用缩放。
-   **骨骼空间（Bone Space）** ：根据骨骼自己的参考帧应用缩放。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animation blending](https://dev.epicgames.com/community/search?query=animation%20blending)
-   [skeletal control](https://dev.epicgames.com/community/search?query=skeletal%20control)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [属性参考](/documentation/zh-cn/unreal-engine/animation-blueprint-transform-bone-in-unreal-engine#%E5%B1%9E%E6%80%A7%E5%8F%82%E8%80%83)
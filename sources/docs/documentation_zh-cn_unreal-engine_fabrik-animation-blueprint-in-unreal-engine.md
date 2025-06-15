# 虚幻引擎中的FABRIK动画蓝图 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fabrik-animation-blueprint-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:03:43.213Z

---

目录

![FABRIK动画蓝图节点](https://dev.epicgames.com/community/api/documentation/image/9ef39932-322f-456f-8154-8139244af1dd?resizing_type=fill&width=1920&height=335)

**前后延伸反向运动学（Forward And Backward Reaching Inverse Kinematics，简称 FABRIK）**，是处理一串任意长度的[骨骼](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)（至少 2 节）的 IK 解算器。

![fabrik动画蓝图节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df58effb-c411-48e7-a519-b193ba90e2dc/fabrik.png)

## 概览

你可以将 **FABRIK** 蓝图节点添加到动画蓝图的 **动画图表（AnimGraph）** 中。添加后，你可以通过物体的 **组件姿势（Component Pose）** 将FABRIK节点整合到动画蓝图。

你可以使用FABRIK节点的 **效果器变换（Effector Transform）** 输入引脚，连接一个[变换变量](/documentation/zh-cn/unreal-engine/blueprint-variables-in-unreal-engine)，来控制骨骼对于骨骼链的 **相对（relative）** 或者 **绝对（absolute）** 变换。你可以使用相对变换来引用同一骨架上的不同骨骼进行变换，或者使用绝对变换在没有引用的情况下对骨骼链进行变换。

![效果器转换变量输入引脚](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0dd32d00-fac7-4575-94e1-cb8d44cf59af/transformvar.png)

要决定应用的 **骨骼控制（Skeletal Control）** 的力度，你可以设置 **Alpha** 输入引脚的Alpha值。你既可以手动设置Alpha输入引脚，也可以通过动画图表中的动态变量来设置。Alpha值越大，意味着更多的骨骼控制，数值越小控制越少。

![alpha变量值输入引脚](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3cd1dd85-6338-44d6-a919-f3d72a577794/alpha.png)

## Properties and Settings

在 **FABRIK** 节点的 **细节（Details）** 面板中，你可以找到可用于进一步调整解算器功能的更多设置：

![fabrik动画蓝图节点细节面板属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/025e1e09-6875-488a-9e4e-581197622e53/fabrik_details.png)

在 **最终效果器（End Effector）** 部分，你可以确定目标位置和旋转角度。

FABRIK节点的细节面板中的 **最终效果器（End Effector）** 属性与[TwoBone\_IK](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine) 节点属性很相似。

属性

描述

**位置（Location）、旋转（Rotation）、比例（Scale）**

末梢骨骼的目标位置的坐标 - 如果 **效果器位置空间** 设为 **骨骼**，那么这就是相对于作为目标位置使用的目标骨骼的偏移（也可以在节点上作为引脚设置）。

**效果器转换空间（Effector Transform Space**

设置骨骼在骨骼网格组件的参考帧中的位置。

**效果器转换骨骼（Effector Transform Bone）**

如果 **效果器转换空间** 设为 **骨骼**，那么这就是要使用的骨骼。

**效果器旋转源（Effector Rotation Source）**

控制旋转（维持组件空间、局部空间或匹配最终效果器目标旋转）。

在 **解算器（Solver）**部分，您可以定义要使用的骨骼串，从 **根** 至 **末梢**。末梢将尽量到达最终效果器位置。

属性

说明

**末梢骨骼（Tip Bone）**

从 **骨骼树** 中设置引用 **末梢骨骼**。

**根骨骼（Root Bone）**

从 **骨骼树** 中设置引用 **根骨骼**。

**精度（Precision）**

最终 **末梢骨骼** 位置相对于 **效果器位置** 输入引脚之差的 **容差（Tolerance）**。该值越低，到达 **最终效果器** 目标的精度越高，但性能成本也越高。

**最大迭代次数（Max Iterations）**

为了控制性能和确保大量使用不会使帧率下降而允许的最大迭代次数。

**启用调试绘图（Enable Debug Draw）**

切换用于调试关节旋转的轴的绘制。

在 **设置（Settings）** 部分，可以设置应用的力度。

属性

说明

**阿尔法（Alpha）**

骨骼控件的当前力度（也可作为节点上的引脚设置）。

**阿尔法标度偏差（Alpha Scale Bias）**

设置 **最小** 和 **最大** 输入标度值。

**节点（Node）**

如果将它设置为非 **相对于父项的局部旋转**，可以用于重置 **效果器旋转源（Effector Rotation Source）**。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [animation features](https://dev.epicgames.com/community/search?query=animation%20features)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概览](/documentation/zh-cn/unreal-engine/fabrik-animation-blueprint-in-unreal-engine#%E6%A6%82%E8%A7%88)
-   [Properties and Settings](/documentation/zh-cn/unreal-engine/fabrik-animation-blueprint-in-unreal-engine#propertiesandsettings)

相关文档

[

蓝图可视化脚本

![蓝图可视化脚本](https://dev.epicgames.com/community/api/documentation/image/a7cce2f7-f09a-4340-b3f4-2a5d4823bc46?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)
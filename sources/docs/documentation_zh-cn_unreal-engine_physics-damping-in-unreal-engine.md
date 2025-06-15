# 虚幻引擎物理阻尼 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/physics-damping-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:51:42.571Z

---

目录

![物理阻尼](https://dev.epicgames.com/community/api/documentation/image/8a8185c6-1108-461d-84dd-564b81b64a0d?resizing_type=fill&width=1920&height=335)

如果要减慢 **物理形体** 的速度，或者模拟大气阻力，或者增大铰链阻力，物理形体和 **物理约束** 可使用以下两种属性：**线速度阻尼（Linear Damping）** 和 **角速度阻尼（Angular Damping）**。线速度阻尼控制物理形体或物理约束抵抗平移的程度，而角速度阻尼控制两者抵抗旋转的程度。

## 物体形体

所有物理形体都有 **线速度阻尼** 和 **角速度阻尼** 属性。主要用于模拟阻力，即使值为1.0时也将对物理形体产生实质 效果。

![Physics properties in the Details panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d21867a-78ae-4e90-a87e-97e3661a9011/phys-body-damping.png)

以供参考：在正常重力下（9.8m/s^2），模拟开始时，在初始引力作用下，线速度阻尼值30即可阻止单个形体Actor掉落。多个物理形体相互作用时（通过使用物理约束或若发生碰撞），则阻止物理形体所需阻尼量将增大。

使被应用力的物理形体停止所需的 *最小* 线性阻尼值约100。

最后，在无角阻尼的情况下，物理形体将继续旋转，直到受到外力影响。很小的值便可迅速降低旋转；如值为100， 则几乎可以立即使外部源造成的角运动停止。

## 物理约束

物理约束的阻尼与物理形体有所些许不同：其只在运动尝试超越其限制时在受限运动上发生。将物理 约束的运动设为"受限"将显示 **软限制**：

![ Setting a Physics Constraint's Motions to Limited will display the Soft Limits](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f72fbd68-0ec0-4ae4-9ef7-7a9f2dbbd8b3/angular-limits-mod.png)![Linear Limits Mod](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b71be78-9401-4f23-8243-cb759972431e/linear-limits-mod.png)

两个角摇摆运动共享阻尼值，角扭曲接收其自身的阻尼值，且所有线性轴使用相同的阻尼值。虽然其可能 拥有单独的属性，但在其相关的运动上所有属性均拥有相同的效果。

属性

说明

**限制刚度**

。超过一个限制时，此值影响约束尝试停止不良运动的积极性。默认值为50，几乎不会对运动产生影响，值设为5000则会弹回限制内，值设为50000将使运动完全调转方向。

**限制阻尼**

和物理形体上的阻尼一样，此项定义运动减缓的量。与物理形体上的阻尼不同，阻尼影响只会在超过运动限制时发生，其将吸收动量，直到物理形体停止运动。

两个值共同创造出不同效果。如刚度较高而阻尼较低，则会呈现出硬性限制的效果；而将两者设为较高则 呈现出在焦油中移动的效果，柔和而迅速地停止运动。需要进行一系列实验才能使结果满足具体需要的值。

欲了解约束的更多相关信息，参见： **[关于约束的用户指南](/documentation/zh-cn/unreal-engine/constraints-user-guide-in-unreal-engine)**

如需了解物理约束可用属性的参考，请参阅： **[物理约束参考](/documentation/zh-cn/unreal-engine/physics-constraint-reference-in-unreal-engine)**

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [constraints](https://dev.epicgames.com/community/search?query=constraints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [物体形体](/documentation/zh-cn/unreal-engine/physics-damping-in-unreal-engine#%E7%89%A9%E4%BD%93%E5%BD%A2%E4%BD%93)
-   [物理约束](/documentation/zh-cn/unreal-engine/physics-damping-in-unreal-engine#%E7%89%A9%E7%90%86%E7%BA%A6%E6%9D%9F)
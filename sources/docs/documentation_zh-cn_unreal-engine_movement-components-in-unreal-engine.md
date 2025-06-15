# 虚幻引擎中的移动组件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/movement-components-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:47:23.535Z

---

目录

![移动组件](https://dev.epicgames.com/community/api/documentation/image/1457f671-6734-4af3-84fb-b4fad52d91ee?resizing_type=fill&width=1920&height=335)

**移动组件（Movement Components）** 能为所属的 Actor（或角色）提供移动功能。

## 人物移动组件

**角色移动组件（CharacterMovementComponent）** 允许非物理刚体类的角色移动（走、跑、跳、飞、跌落和游泳）。 该组件专用于 **角色（Characters）**，无法由其他类实现。当你创建一个继承自 **Characters** 的 **蓝图（Blueprints）** 时，CharacterMovementComponent会自动添加，无需你手动添加。

组件包含一些可设置属性，包括角色跌落和行走时的摩擦力、角色飞行、游泳、以及行走时的速度、浮力、重力系数、以及人物可施加在物理对象上的力。 CharacterMovementComponent还包含动画自带的、且已经转换成世界空间的根骨骼运动参数，可供物理系统使用。请参见[根运动](/documentation/zh-cn/unreal-engine/root-motion-in-unreal-engine) 以了解更多信息。

有关使用人物移动的信息，请参见[设置角色动作](/documentation/zh-cn/unreal-engine/setting-up-character-movement)。

## 发射物移动组件

在更新（Tick）过程中，**发射物移动组件（ProjectileMovementComponent）** 会更新另一个组件的位置。该组件还支持碰撞后的跳弹以及跟踪等功能。 通常情况下，拥有该组件的Actor的根组件会发生移动；不过，可能会选择另一个组件（see [SetUpdatedComponent](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/UMovementComponent/SetUpdatedComponent)). 如果更新后的组件正在进行物理模拟，只有初始参数（当初始速度非零时）将影响子弹（Projectile），且物理模拟将从该位置开始。

以下是使用ProjectileMovementComponent的蓝图示例（点击查看大图）。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e272415-b7e0-40e6-b411-23d34e2736c6/projectile.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e272415-b7e0-40e6-b411-23d34e2736c6/projectile.png)

## 旋转移动组件

**RotatingMovementComponent** 允许某个组件以指定的速率执持续旋转。（可选）你可以偏移旋转时参照的枢轴点。注意，在移动过程中，无法进行碰撞检测。

使用旋转移动组件的案例包括：飞机螺旋桨、风车，甚至是围绕恒星旋转的行星。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [人物移动组件](/documentation/zh-cn/unreal-engine/movement-components-in-unreal-engine#%E4%BA%BA%E7%89%A9%E7%A7%BB%E5%8A%A8%E7%BB%84%E4%BB%B6)
-   [发射物移动组件](/documentation/zh-cn/unreal-engine/movement-components-in-unreal-engine#%E5%8F%91%E5%B0%84%E7%89%A9%E7%A7%BB%E5%8A%A8%E7%BB%84%E4%BB%B6)
-   [旋转移动组件](/documentation/zh-cn/unreal-engine/movement-components-in-unreal-engine#%E6%97%8B%E8%BD%AC%E7%A7%BB%E5%8A%A8%E7%BB%84%E4%BB%B6)
# 虚幻引擎中的角色 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/characters-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:47:48.769Z

---

目录

![角色](https://dev.epicgames.com/community/api/documentation/image/fb01f4ce-1e8e-40fa-96a8-e23ef4a5a5f5?resizing_type=fill&width=1920&height=335)

添加 `CharacterMovementComponent`、`CapsuleComponent` 和 `SkeletalMeshComponent` 后，[Pawn](/documentation/404)类可延展为功能完善的 **角色** 类。 角色用于代表垂直站立的玩家，可以在场景中行走、跑动、跳跃、飞行和游泳。 此类也包含基础网络连接和输入模型的实现。

### 骨架网格体组件

与pawn不同的是，角色自带 `SkeletalMeshComponent`，可启用使用骨架的高级动画。可以将其他骨架网格体添加到角色派生的类，但这才是与角色相关的主骨架网格体。 如需了解骨架网格体的更多内容，请参见：

## 骨架网格体要点

-   [](/documentation/404)
-   [骨架网格体动画系统](/documentation/zh-cn/unreal-engine/skeletal-mesh-animation-system-in-unreal-engine)

### 胶囊体组件

`CapsuleComponent` 用于运动碰撞。为了计算 `CharacterMovementComponent` 的复杂几何体，会假设角色类中的碰撞组件是垂直向的胶囊体。如需了解碰撞的更多信息，请参见：

## 胶囊体组件要点

-   [](/documentation/404)
-   [](/documentation/404)

### 角色移动组件

`CharacterMovementComponent` 能够使人身不使用刚体物理即可行走、跑动、飞行、坠落和游泳。 其为角色特定，无法被任何其他类实现。 可在 `CharacterMovementComponent` 中设置的属性包含了摔倒和行走摩擦力的值、在空气、水、土地中行进的速度、浮力、重力标度，以及角色能对物理对象施加的物理力。 `CharacterMovementComponent` 还包含来自动画的根运动参数， 其已转换到世界空间中，可直接用于物理。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [gameplay framework](https://dev.epicgames.com/community/search?query=gameplay%20framework)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [骨架网格体组件](/documentation/zh-cn/unreal-engine/characters-in-unreal-engine#%E9%AA%A8%E6%9E%B6%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%84%E4%BB%B6)
-   [骨架网格体要点](/documentation/zh-cn/unreal-engine/characters-in-unreal-engine#%E9%AA%A8%E6%9E%B6%E7%BD%91%E6%A0%BC%E4%BD%93%E8%A6%81%E7%82%B9)
-   [胶囊体组件](/documentation/zh-cn/unreal-engine/characters-in-unreal-engine#%E8%83%B6%E5%9B%8A%E4%BD%93%E7%BB%84%E4%BB%B6)
-   [胶囊体组件要点](/documentation/zh-cn/unreal-engine/characters-in-unreal-engine#%E8%83%B6%E5%9B%8A%E4%BD%93%E7%BB%84%E4%BB%B6%E8%A6%81%E7%82%B9)
-   [角色移动组件](/documentation/zh-cn/unreal-engine/characters-in-unreal-engine#%E8%A7%92%E8%89%B2%E7%A7%BB%E5%8A%A8%E7%BB%84%E4%BB%B6)
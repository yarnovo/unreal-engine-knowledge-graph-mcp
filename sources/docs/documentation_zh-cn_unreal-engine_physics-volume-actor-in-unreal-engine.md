# 虚幻引擎中的物理体积Actor | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/physics-volume-actor-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:58:30.202Z

---

目录

![物理体积Actor](https://dev.epicgames.com/community/api/documentation/image/c3b9888c-b840-4597-8253-0d36e0dcbe49?resizing_type=fill&width=1920&height=335)

物理体积提供了一些属性，可以在 **细节（Details）** 面板中调整，如下所示：

属性

描述

**末速度（Terminal Velocity）**

决定了Pawn（应用CharacterMovement）下落时的速度。

**优先级（Priority）**

决定当PhysicsVolume重叠时哪个体积占主导地位。

**流体摩擦（Fluid Friction）**

决定了应用CharacterMovement的Pawn在穿过体积移动时，该体积所应用的摩擦力大小。  
该值越高，就感觉越难穿过体积。

**水体积（Water Volume）**

决定体积是否包流体，比如水。

**接触时的物理影响（Physics on Contact）**

决定了Actor接触体积时是否会受到该体积的影响（默认情况下，Actor必须在体积内部才会受到影响）。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
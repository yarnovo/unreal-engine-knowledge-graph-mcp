# 虚幻引擎中的Mover功能与概念 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mover-features-and-concepts-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:58:33.450Z

---

目录

![Mover功能与概念](https://dev.epicgames.com/community/api/documentation/image/e428aa5d-5923-4ef5-bb0c-e996fd414ca3?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

本文将介绍Mover的功能和高级概念，以帮助你更好地理解该插件。

## MoverComponent

**MoverComponent** 是一种管理移动的Actor组件，可充当状态查询的源，并提供用于影响移动操作的API。

## 移动模式

**移动模式（movement mode）** 是一种对象。它会观察输入信息，以决定Actor的移动方式，如行走、坠落，或是攀爬。在决定移动方式后，模式会尝试让角色进行移动。

同一时间内只能激活一种模式。

## 分层移动

**分层移动（Layered moves）** 是一种对象。它表示额外的（通常是临时的）移动。比如，一种持续施加的力会将角色推开，一种复位力会使其朝向敌人移动，甚至是动画驱动的根运动。

分层移动会生成一个建议动作，并依靠当前激活的移动模式来执行它。同一时间可以激活多个分层移动，它们会与其他影响因素相互作用。它们的持续时间可以是有限的，也可以是瞬间的，并且无视移动模式的变化而持续存在。

## 过渡

**过渡（Transitions）** 是一种对象。它会评估Actor是否应该根据当前状态改变移动模式。它们可以与特定模式关联，从只在该模式激活时进行评估，也可以无视模式进行全局评估。

是否使用过渡是可选的，因为还有其他可用的模式切换方法。

## 默认角色移动集

**默认角色移动集（Default Character Movement Set）** 是一组模式和机制，其表现应与 **角色移动组件（CMC）** 的内置功能类似。它存在一些局限性，比如假定所有Actor都使用垂直胶囊体图元。

Mover插件中的默认角色移动集是为那些习惯使用CMC的开发者准备的过渡方案。

这种运动集所阐述的方法只是设计移动的一种方式。只要适合你的项目，你以替换其中任何一部分或全部内容。其他方法可能涉及源自单一类型但具有高度可配置性的多种专门模式。

## 其他影响移动的因素

### 移动修饰符

对于像蹲姿或站姿变化这类情况，你可以使用移动修饰符来调整移动模拟的参数，而无需实际产生移动效果。你可以使用它们批量更改移动设置，例如蹲姿时的最大速度和加速度。

### 瞬时效果

瞬时效果包括某些机制。这些机制可以瞬间改变移动模式，不会消耗任何时间也不依赖模式来执行这种改变，比如传送或强制赋予速度。

### 导航和寻路

Mover支持通过 **NavMoverComponent** 和默认移动集中的 **NavWalking** 移动模式进行导航。除了Mover组件外，NavMoverComponent还会被添加到Actor上。

目前尚不支持相对速度障碍（RVO）规避功能。

## 可组合输入与状态

由控制者设定的 **输入（Input）** 会影响移动模拟步骤。这包括诸如期望移动方向、跳跃输入或是期望的路径信息等要素。

**同步状态（Sync states）** 是一种快照，可描述Actor在某个时间点的移动。这包括位置、朝向、速度和移动模式。

输入和同步状态都可以动态附加特定于项目的结构化数据。例如，在运行时赋予玩家的一项物品可能会启用可激活新的移动模式的输入，并写入额外的状态数据。

## 共享设置

你可以在多个相互独立的移动模式间共享 **设置**。例如，最大可行走坡度可以同时影响行走和坠落模式。每个模式都会声明它们需要哪些设置类型，而MoverComponent则确保这两种模式都使用该类型的一个实例。

## 后端

你可以使用网络预测（Network Prediction）之外的系统来驱动Mover Actor。例如，基于物理的角色可使用一个不同的后端，该后端与Chaos联网物理系统进行交互。你甚至可以为非联网游戏创建一个简单的独立后端，以避免其他系统的开销。

模式实现还可以进行专门化处理，以对所建议的移动采取不同的执行方式。例如，基于物理的移动模式仅执行设置操作，而将实际的移动交由物理模拟来处理。这与默认模式不同，后者会直接移动场景组件。

-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [character](https://dev.epicgames.com/community/search?query=character)
-   [mover](https://dev.epicgames.com/community/search?query=mover)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [MoverComponent](/documentation/zh-cn/unreal-engine/mover-features-and-concepts-in-unreal-engine#movercomponent)
-   [移动模式](/documentation/zh-cn/unreal-engine/mover-features-and-concepts-in-unreal-engine#%E7%A7%BB%E5%8A%A8%E6%A8%A1%E5%BC%8F)
-   [分层移动](/documentation/zh-cn/unreal-engine/mover-features-and-concepts-in-unreal-engine#%E5%88%86%E5%B1%82%E7%A7%BB%E5%8A%A8)
-   [过渡](/documentation/zh-cn/unreal-engine/mover-features-and-concepts-in-unreal-engine#%E8%BF%87%E6%B8%A1)
-   [默认角色移动集](/documentation/zh-cn/unreal-engine/mover-features-and-concepts-in-unreal-engine#%E9%BB%98%E8%AE%A4%E8%A7%92%E8%89%B2%E7%A7%BB%E5%8A%A8%E9%9B%86)
-   [其他影响移动的因素](/documentation/zh-cn/unreal-engine/mover-features-and-concepts-in-unreal-engine#%E5%85%B6%E4%BB%96%E5%BD%B1%E5%93%8D%E7%A7%BB%E5%8A%A8%E7%9A%84%E5%9B%A0%E7%B4%A0)
-   [移动修饰符](/documentation/zh-cn/unreal-engine/mover-features-and-concepts-in-unreal-engine#%E7%A7%BB%E5%8A%A8%E4%BF%AE%E9%A5%B0%E7%AC%A6)
-   [瞬时效果](/documentation/zh-cn/unreal-engine/mover-features-and-concepts-in-unreal-engine#%E7%9E%AC%E6%97%B6%E6%95%88%E6%9E%9C)
-   [导航和寻路](/documentation/zh-cn/unreal-engine/mover-features-and-concepts-in-unreal-engine#%E5%AF%BC%E8%88%AA%E5%92%8C%E5%AF%BB%E8%B7%AF)
-   [可组合输入与状态](/documentation/zh-cn/unreal-engine/mover-features-and-concepts-in-unreal-engine#%E5%8F%AF%E7%BB%84%E5%90%88%E8%BE%93%E5%85%A5%E4%B8%8E%E7%8A%B6%E6%80%81)
-   [共享设置](/documentation/zh-cn/unreal-engine/mover-features-and-concepts-in-unreal-engine#%E5%85%B1%E4%BA%AB%E8%AE%BE%E7%BD%AE)
-   [后端](/documentation/zh-cn/unreal-engine/mover-features-and-concepts-in-unreal-engine#%E5%90%8E%E7%AB%AF)
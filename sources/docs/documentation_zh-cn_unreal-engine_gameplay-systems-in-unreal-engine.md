# 在虚幻引擎中创建交互体验和游戏玩法 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/gameplay-systems-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:41:55.092Z

---

目录

![创建交互体验](https://dev.epicgames.com/community/api/documentation/image/2ff8b8c1-09eb-4391-9923-63139b283dce?resizing_type=fill&width=1920&height=335)

在"创建交互体验"这一部分中，我们将介绍 **虚幻引擎** （ **UE** ）中与游戏编程以及脚本编写有关的一系列高级内容，重点帮助你实现角色与场景的交互功能。

-   UE中的[Gameplay框架](/documentation/zh-cn/unreal-engine/gameplay-framework-in-unreal-engine)包括核心系统和用于处理通用Gameplay元素的框架，如[Actor](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine)、[摄像机](/documentation/zh-cn/unreal-engine/cameras-in-unreal-engine)、[组件](/documentation/zh-cn/unreal-engine/components-in-unreal-engine)、[控制器](/documentation/zh-cn/unreal-engine/controllers-in-unreal-engine)、[游戏规则](/documentation/zh-cn/unreal-engine/game-features-and-modular-gameplay-in-unreal-engine)、[游戏模式](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine)、[玩家输入](/documentation/zh-cn/unreal-engine/input-in-unreal-engine)、[Gameplay定时器](/documentation/zh-cn/unreal-engine/gameplay-timers-in-unreal-engine)和[用户界面](/documentation/zh-cn/unreal-engine/user-interfaces-and-huds-in-unreal-engine)。
    
-   [人工智能](/documentation/zh-cn/unreal-engine/artificial-intelligence-in-unreal-engine)介绍了可用于在UE中进行创作的各种可用系统，如[行为树](/documentation/zh-cn/unreal-engine/behavior-trees-in-unreal-engine)、[批量实体系统](/documentation/zh-cn/unreal-engine/mass-entity-in-unreal-engine)、[状态树](/documentation/zh-cn/unreal-engine/state-tree-in-unreal-engine)、[寻路系统](/documentation/zh-cn/unreal-engine/navigation-system-in-unreal-engine)、[智能对象](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine)、[环境查询系统](/documentation/zh-cn/unreal-engine/environment-query-system-in-unreal-engine)、[AI感知组件](/documentation/zh-cn/unreal-engine/ai-perception-in-unreal-engine)和[调试](/documentation/zh-cn/unreal-engine/ai-debugging-in-unreal-engine)。
    
-   [物理](/documentation/zh-cn/unreal-engine/physics-in-unreal-engine)包含各种子系统，可计算[碰撞](/documentation/zh-cn/unreal-engine/collision-in-unreal-engine)、[光线投射](/documentation/zh-cn/unreal-engine/traces-with-raycasts-in-unreal-engine)、[Chaos破坏系统](/documentation/zh-cn/unreal-engine/chaos-destruction-in-unreal-engine)和模拟[物理Actor](/documentation/zh-cn/unreal-engine/physics-bodies-in-unreal-engine)、[布料物理](/documentation/zh-cn/unreal-engine/cloth-simulation-in-unreal-engine)和[材质](/documentation/zh-cn/unreal-engine/physical-materials-in-unreal-engine)，包括[毛发物理](/documentation/zh-cn/unreal-engine/hair-physics-in-unreal-engine)。
    
-   [大型世界坐标](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-unreal-engine-5)在UE中引入了对双精度数据变量类型的支持，并对所有引擎系统进行了广泛更改，以便提高其浮点精度。
    
-   [数据驱动型Gameplay元素](/documentation/zh-cn/unreal-engine/data-driven-gameplay-elements-in-unreal-engine)有助于降低生命周期延长的游戏所涉及的工作量和复杂性。例如，有些游戏可能通过在线服务模式为用户提供更新。此模式可能调整游戏中的某些数据参数，以基于用户反馈平衡或增加内容。
    
-   [Gameplay技能系统](/documentation/zh-cn/unreal-engine/gameplay-ability-system-for-unreal-engine)是一种高度灵活的框架，可构建你可能在RPG或MOBA产品中看到的技能类型和属性。你可以为游戏中的角色构建要使用的操作或被动技能，以及因为这些操作而加强或削弱各种属性的状态效果，此外，你还可以实现"冷却"定时器或资源成本，以调节这些操作的用法，更改技能等级及其在每个等级的效果，激活粒子、音效等。
    
-   [载具](/documentation/zh-cn/unreal-engine/vehicles-in-unreal-engine)是虚幻引擎的轻量级系统，用于执行载具物理模拟。
    
-   [网络和多玩家](/documentation/zh-cn/unreal-engine/networking-and-multiplayer-in-unreal-engine)现代多人游戏体验需要在全球的大量客户端之间同步海量数据。为了让用户拥有引人入胜的体验，你发送什么数据以及如何发送数据就变得极其重要，因为这会显著影响项目的表现和玩家的感受
    
-   本小节的[Gameplay教程](/documentation/zh-cn/unreal-engine/gameplay-tutorials-for-unreal-engine)指导将介绍如何使用这些功能，并讲解如何使用蓝图和C++在游戏中重新创建通用机制和系统。
    

## 小节主题目录

[

![输入](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/150032e5-47f3-4555-bfc8-7968a3aab7db/placeholder_topic.png)

输入

在虚幻引擎中创建和设置输入的不同方法





](/documentation/zh-cn/unreal-engine/input-in-unreal-engine)[

![物理](images/static/document_list/empty_thumbnail.svg)

物理

用于计算碰撞和模拟物理Actor的子系统。





](/documentation/zh-cn/unreal-engine/physics-in-unreal-engine)[

![Gameplay教程](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f744580-3c8f-4a4c-b50d-92ce1643d6b6/placeholder_topic.png)

Gameplay教程

关于实现各类常见游戏玩法的教程。





](/documentation/zh-cn/unreal-engine/gameplay-tutorials-for-unreal-engine)[

![大世界坐标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4bb7df2d-aeef-4edd-9dec-b756e3889cf4/placeholder_topic.png)

大世界坐标

介绍虚幻引擎5中的大世界坐标及其用法。





](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-unreal-engine-5)[

![人工智能](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a4dc47b-52b9-4e06-b61d-512591255b60/basicnav_topicimage.png)

人工智能

介绍了虚幻引擎中的AI系统——一种可用于在项目中创建高真实度AI实体的系统。





](/documentation/zh-cn/unreal-engine/artificial-intelligence-in-unreal-engine)[

![数据驱动的Gameplay元素](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94e03c4d-aed4-4259-9066-6d638f763c83/placeholder_topic.png)

数据驱动的Gameplay元素

使用外部存储的数据来驱动Gameplay元素。





](/documentation/zh-cn/unreal-engine/data-driven-gameplay-elements-in-unreal-engine)[

![Gameplay技能系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c03c2d13-fc5d-413c-96c4-81e3d44743ff/gameplayabilitysystemtopicimage_01.png)

Gameplay技能系统

Gameplay技能系统概览





](/documentation/zh-cn/unreal-engine/gameplay-ability-system-for-unreal-engine)[

![Gameplay摄像机系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/670401e7-a591-4a92-be6b-9d9605539aa9/gameplay-cameras-topic.png)

Gameplay摄像机系统

介绍虚幻引擎Gameplay摄像机系统的文档。





](/documentation/zh-cn/unreal-engine/gameplay-camera-system)[

![Gameplay定位系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/505c7acb-bfae-4cfc-a814-e951203137e5/placeholder_topic.png)

Gameplay定位系统

虚幻引擎中Gameplay定位系统插件框架的概述。





](/documentation/zh-cn/unreal-engine/gameplay-targeting-system-in-unreal-engine)[

![Gameplay框架](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec81a3a1-348f-406d-8475-49f72f933f0f/cropouthero.png)

Gameplay框架

核心游戏系统，入游戏模式、玩家状态、控制器、Pawn、摄像机等。





](/documentation/zh-cn/unreal-engine/gameplay-framework-in-unreal-engine)[

![载具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0f4793a-aac2-4993-9d2d-0c1d35ff361b/vehicles-topic-image.png)

载具

虚幻引擎载具文档。





](/documentation/zh-cn/unreal-engine/vehicles-in-unreal-engine)[

![联网和多人游戏](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31fbb234-004a-447b-a210-103cb0e1d71b/placeholder_topic.png)

联网和多人游戏

为多人游戏设置联网游戏。





](/documentation/zh-cn/unreal-engine/networking-and-multiplayer-in-unreal-engine)[

![Mover](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/376fcda9-5582-4aed-bd4d-26587ddd138a/placeholder_topic.png)

Mover

创建具有回滚网络支持的动作功能。





](/documentation/zh-cn/unreal-engine/mover-in-unreal-engine)

-   [gameplay](https://dev.epicgames.com/community/search?query=gameplay)
-   [physics](https://dev.epicgames.com/community/search?query=physics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [小节主题目录](/documentation/zh-cn/unreal-engine/gameplay-systems-in-unreal-engine#%E5%B0%8F%E8%8A%82%E4%B8%BB%E9%A2%98%E7%9B%AE%E5%BD%95)
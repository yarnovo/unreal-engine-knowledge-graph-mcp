# 虚幻引擎中的控制器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/controllers-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:47:24.209Z

---

目录

![控制器](https://dev.epicgames.com/community/api/documentation/image/35a4f9a8-8a5c-45e0-a880-d236e1c7feec?resizing_type=fill&width=1920&height=335)

**控制器（Controller）** 是一种可以控制Pawn（或Pawn的派生类，例如角色（Character）），从而控制其动作的非实体Actor。人类玩家使用PlayerController控制Pawn，而AIController则对它们控制的Pawn实加人工智能效果。控制器用Possess函数控制Pawn，用Unpossess函数放弃控制Pawn。

控制器会接收其控制的Pawn所发生诸多事件的通知。因此控制器可借机实现 响应此事件的行为，拦截事件并接替Pawn的默认行为。可以让控制器在给定的Pawn之前运行， 从而从而最大限度减少输入处理与Pawn移动之间的延迟。

默认情况下，控制器与Pawn之间存在一对一的关系；也就是说，每个控制器在任何给定的时间只控制一个Pawn。这对于大多数 类型的游戏都是可以接受的，但对于某些类型的游戏可能需要进行调整，因为实时策略可能需要能够同时控制多个实体。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [gameplay framework](https://dev.epicgames.com/community/search?query=gameplay%20framework)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
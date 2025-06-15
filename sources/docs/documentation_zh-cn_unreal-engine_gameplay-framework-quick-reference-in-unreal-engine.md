# 虚幻引擎Gameplay框架快速参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/gameplay-framework-quick-reference-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:47:48.803Z

---

目录

![Gameplay框架快速参考](https://dev.epicgames.com/community/api/documentation/image/31b0c114-0533-405b-ab94-7939e8091ca3?resizing_type=fill&width=1920&height=335)

基本的Gameplay类包括用于表示玩家、盟友和敌人的功能，以及通过玩家输入或AI逻辑控制这些化身的功能。还包括为玩家创建 抬头显示和摄像机的类。总之，Gameplay类（如**游戏模式**、**游戏状态** 和 **玩家状态**）可用于设置游戏规则，并追踪游戏和玩家的进展情况。

这些类创建所有类型的Actor，它们可以放置在关卡中，也可以在在需要时生成。

## 在世界场景中表示玩家、好友和敌人

类

介绍

**Pawn**

[Pawn](/documentation/zh-cn/unreal-engine/pawn-in-unreal-engine)是可作为世界场景中"代理"的Actor。Pawn可被控制器所有，且可将其设置为易于接受输入，用于执行各种各样类似于玩家的任务。请注意，Pawn不被认定为具有人的特性。

**角色（Character）**

[Gameplay框架](/documentation/zh-cn/unreal-engine/gameplay-framework-in-unreal-engine)是类人式的Pawn。默认情况下，它带有一个用于碰撞的胶囊组件和一个角色移动组件。它可以执行类似人类的基本动作，可以流畅地复制网络上的动作，还具有一些与动画相关的功能。

## 使用玩家输入或AI逻辑控制Pawn

类

介绍

**控制器（Controller）**

[控制器](/documentation/zh-cn/unreal-engine/controllers-in-unreal-engine)是负责定向Pawn的Actor。它们通常有两种风格：AI控制器和玩家控制器。一个控制器可以"拥有"一个Pawn来控制它。

**玩家控制器**

[玩家控制器](/documentation/zh-cn/unreal-engine/player-controllers-in-unreal-engine)是Pawn和控制Pawn的人类玩家之间的界面。玩家控制器基本上代表人类玩家的意愿。

**AI控制器**

[AI控制器](/documentation/zh-cn/unreal-engine/ai-controllers-in-unreal-engine)和听起来一样；可以控制Pawn的模拟"意愿"。

## 向玩家显示信息

类

介绍

**HUD**

[HUD](/documentation/zh-cn/unreal-engine/user-interfaces-and-huds-in-unreal-engine)是指"抬头显视"或二维屏幕显示，在许多游戏中较为常用。例如显示血条、弹药指示器、枪准星等。每个玩家控制器通常都配有其中一种显示。

**摄像机（Camera）**

玩家摄像机管理器是玩家的"眼球"，负责管理它的行为。通常情况下，每个玩家控制器也有一个此类型的摄像机。请参见[摄像机工作流程](/documentation/zh-cn/unreal-engine/cameras-in-unreal-engine)页面，了解更多信息。

## 设置并追踪游戏的规则

类

介绍

**游戏模式**

"游戏"的概念分为两类。[Game Mode 和 Game State](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine)是游戏的定义，包括游戏规则和获胜条件等内容。它仅存在于服务器上。它通常不应有太多在游戏过程中会发生变化的数据，也绝对不应有客户端需要了解的临时数据。

**游戏状态**

[GameState](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine)包含游戏的状态，其中可以包括联网玩家列表、得分、棋类游戏中棋子的位置，或者在开放世界场景中完成的任务列表。游戏状态存在于服务器和所有客户端上，可以自由复制以保持所有机器处于最新状态。

**玩家状态**

**玩家状态** 是游戏玩家的状态，例如人类玩家或模拟玩家的机器人。作为游戏的一部分而存在的非玩家AI将不会拥有玩家状态。在玩家状态中适当的示例数据包括玩家姓名或得分、比赛中MOBA等的等级，或玩家当前是否在CTF游戏中携带旗帜。所有玩家的玩家状态存在于所有机器上（与玩家控制器不同），并且可以自由复制以保持同步。

## 框架类关系

此流程图说明了这些Gameplay类是如何相互关联的。游戏由游戏模式和游戏状态组成。加入游戏的人类玩家与玩家控制器相关联。 这些玩家控制器允许玩家在游戏中拥有Pawn，这样他们就可以在关卡中拥有物理代表。玩家控制器还向玩家提供输入控制、抬头显示（HUD）， 以及用于处理摄像机视图的玩家摄像机管理器。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13342b63-c2cc-4171-9f43-be75df44aaba/gameframework.png)

有关Gameplay框架类的更多信息，请参阅[Gameplay框架](/documentation/zh-cn/unreal-engine/gameplay-framework-in-unreal-engine)。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [gameplay framework](https://dev.epicgames.com/community/search?query=gameplay%20framework)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [在世界场景中表示玩家、好友和敌人](/documentation/zh-cn/unreal-engine/gameplay-framework-quick-reference-in-unreal-engine#%E5%9C%A8%E4%B8%96%E7%95%8C%E5%9C%BA%E6%99%AF%E4%B8%AD%E8%A1%A8%E7%A4%BA%E7%8E%A9%E5%AE%B6%E3%80%81%E5%A5%BD%E5%8F%8B%E5%92%8C%E6%95%8C%E4%BA%BA)
-   [使用玩家输入或AI逻辑控制Pawn](/documentation/zh-cn/unreal-engine/gameplay-framework-quick-reference-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%8E%A9%E5%AE%B6%E8%BE%93%E5%85%A5%E6%88%96ai%E9%80%BB%E8%BE%91%E6%8E%A7%E5%88%B6pawn)
-   [向玩家显示信息](/documentation/zh-cn/unreal-engine/gameplay-framework-quick-reference-in-unreal-engine#%E5%90%91%E7%8E%A9%E5%AE%B6%E6%98%BE%E7%A4%BA%E4%BF%A1%E6%81%AF)
-   [设置并追踪游戏的规则](/documentation/zh-cn/unreal-engine/gameplay-framework-quick-reference-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%B9%B6%E8%BF%BD%E8%B8%AA%E6%B8%B8%E6%88%8F%E7%9A%84%E8%A7%84%E5%88%99)
-   [框架类关系](/documentation/zh-cn/unreal-engine/gameplay-framework-quick-reference-in-unreal-engine#%E6%A1%86%E6%9E%B6%E7%B1%BB%E5%85%B3%E7%B3%BB)
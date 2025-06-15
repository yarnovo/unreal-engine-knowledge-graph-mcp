# 虚幻引擎中的Gameplay框架 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/gameplay-framework-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:46:27.166Z

---

目录

![Gameplay框架](https://dev.epicgames.com/community/api/documentation/image/2d55d540-671c-48a9-b436-8dd68894869f?resizing_type=fill&width=1920&height=335)

**虚幻引擎的Gameplay框架** 是一组类，你可以基于它们提供的模块化功能构建自己的游戏体验。你可以从中选取适合自己游戏的元素，因为这些类是相互配合、相辅相成的。

## 概述

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e48f12be-54cd-419c-93b0-47715d80e51d/gameplay-schematic.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e48f12be-54cd-419c-93b0-47715d80e51d/gameplay-schematic.png)

Gameplay框架类，以及它们在虚幻引擎中关系的视觉表示。点击查看大图。

*游戏实例* 会在引擎启动时实例化，并保持活跃直至引擎关闭。这是一种管理器类，在游戏中不存在实体，但会追踪数据和运行代码。在联网多人游戏中，游戏实例不会被复制，而是独立存在于服务器以及所有互联的客户端上。所有你希望在关卡加载间保持的内容都应存于游戏实例中。例如，游戏实例是管理游戏保存系统的到地方。游戏实例还可以充当任意数量的 *游戏实例子系统* 的管理器，这些子系统由游戏实例创建和销毁，并且与游戏实例本身具有相同的生命周期。在线子系统就属于这类子系统。你可以用它管理游戏内的在线服务功能，如好友、游戏会话、游戏大厅、排行榜等等。

*游戏模式* 会在引擎加载你的关卡并创建世界后立即实例化。游戏模式是一种基于服务器的管理器类，继承自Actor类。由于这种类会在关卡加载时创建，它不会持续运载于所有关卡中。游戏模式是在关卡加载时第一个被实例化的Actor，可以按地图一一设置。游戏模式在Gameplay框架中处于核心地位，管理着一个Gameplay会话的所有规则和结构，并在创建时实例化剩余的框架Actor。前两个将是游戏状态和玩家状态。

*游戏状态* 和 *玩家状态* 是非实体Actor，分别用于追踪游戏和游戏内玩家的状态。在联网多人游戏中，这些类会在权威服务器和所有互联的客户端间复制其状态信息。游戏状态包含与游戏内所有玩家相关的数据和逻辑，例如队伍得分、目标以及所有玩家及其相关玩家状态的列表。而玩家状态处理其关联玩家的相关数据和逻辑，例如生命值、子弹数量和物品栏。游戏状态由游戏模式创建。玩家状态会在每个玩家加入游戏或进入关卡时分别创建。

游戏模式会在玩家加入游戏时生成玩家。一个玩家主要由一个 *控制器* 和一个 *Pawn* 组成。控制器类处理玩家在游戏世界内的操作逻辑。UE中有两种用途广泛的控制器类：*玩家控制器* 和 *AI控制器*。玩家控制器类是一种管理器类，可以处理来自人类的输入，显示抬头信息并处理游戏内的物理表现。AI控制器类也是管理器类，主要处理游戏内的物理表现，并在UE的人工智能帮助下显示其操作，包括：行为树、状态树、寻路等等。

作为一种非实体Actor类，控制器类及其派生的类在游戏世界内没有实体。*Pawn* 类由玩家在游戏世界内的物理实体组成。Pawn类对玩家的重要性不亚于控制器类。控制器处理Pawn并指使其在游戏执行操作。Pawn作为一种派生自Actor的类，由数种Actor组件构成，包括碰撞组件、静态网格体组件和移动组件。角色类是派生自Pawn的子类，由默认Pawn类以及多种功能丰富的组件构成，包括：角色移动组件、骨架网格体组件和胶囊体组件。

Epic开发者社区中的教程：[新手指南](https://dev.epicgames.com/community/learning/tutorials/l21z/unreal-engine-begin-play-gameplay)以视频的方式对虚化引擎中的Gameplay框架进行了全面的概述。

## Gameplay框架类

下表列出了Gameplay框架中重要的类，简单介绍了每种类，并给出了每种类的对应文档链接：

**类**

**说明**

**派生类**

[Actor](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine)

Actor是可以放置在关卡中的任意对象，如摄像机、静态网格体或玩家出生点。Actor支持变换，如平移、选择和缩放。你可以通过Gameplay代码生成和摧毁它们。

Actors还是一种容器，持有名为Actor组件的特定对象类型。不同类型的组件可控制Actor的移动方式、渲染方式，等等。Actor的其他主要功能还包括在游戏过程中，在网络中复制属性和函数。

Pawn、控制器（Controller）、游戏模式（Game Mode）、游戏状态（Game State）、玩家状态（Player State）、HUD、摄像机（Camera），等等。

[Actor组件](/documentation/zh-cn/unreal-engine/components-in-unreal-engine)

Actor组件是Actor的构成元素。不同的Actor组件控制者着Actor的不同方面，如Actor的移动方式、渲染方式、在世界中的位置及其呈现给玩家的样子等。

场景组件（Scene Component）、音频组件（Audio Component）、粒子系统组件（Particle System Component）、图元组件（Primitive Component）、摄像机㢟（Camera Component）、弹簧臂组件（Spring Arm Component）、骨架网格体组件（Skeletal Mesh Component）、静态网格体组件（Static Mesh Component），等等。

[Pawn](/documentation/zh-cn/unreal-engine/pawn-in-unreal-engine)

Pawn是所有可以被玩家或AI控制的Actor的基类。

默认Pawn（Default Pawn）、旁观者Pawn（Spectator Pawn）、角色（Character）

[角色（Character）](/documentation/zh-cn/unreal-engine/characters-in-unreal-engine)

角色是一种特殊的Pawn，是可以在世界中直立行走、奔跑、跳跃、飞行和游泳的玩家表示。

 

[控制器（Controller）](/documentation/zh-cn/unreal-engine/controllers-in-unreal-engine)

控制器是一种非实体Actor，可以处理Pawn以控制其操作。人类玩家使用玩家控制器操控Pawn，而AI控制器依靠人工智能来实现Pawn的操作。

[玩家控制器（Player Controller）](/documentation/zh-cn/unreal-engine/player-controllers-in-unreal-engine)、[AI控制器（AI Controller）](/documentation/zh-cn/unreal-engine/ai-controllers-in-unreal-engine)

世界（World）

世界是表示地图的最上层对象，Actor和组件都存在于世界中，并在其中渲染。它包含持久关卡以及许多其他对象，如游戏状态、游戏模式以及当前存在于地图中的Pawn和控制器列表。

 

[游戏模式（Game Mode）](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine#gamemodes)

游戏模式是最主要的类，指定Gameplay框架中要使用的其他类，通常被用于指定模式的游戏规则，例如夺旗。

 

游戏实例（Game Instance）

游戏实例类在游戏整个生命周期内始终存在。在地图和菜单间切换都将维护此类的同一个实例。此类被用于管理需要在游戏整个生命周期内始终存在，不受关卡和地图切换影响的信息和系统。你也可以用游戏实例类管理不同的游戏实例子系统。

 

游戏实例子系统（Game Instance Subsystem）

游戏实例子系统被用于管理需要在游戏整个生命周期内持续存在的系统和功能，例如为提供联网体验的游戏控制游戏内的在线服务功能。

 

[游戏状态（Game State）](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine#gamestate)

游戏状态包含与游戏内所有玩家相关的数据和逻辑，例如队伍得分、目标以及所有玩家及其相关玩家状态的列表。

 

玩家状态（Player State）

玩家状态处理其关联玩家的相关数据和逻辑，例如生命值、子弹数量和物品栏。

 

Gameplay静态（Gameplay Statics）

静态类处理常见的游戏相关功能，如播放音效、生成粒子效果、生成Actor、对Actor施加伤害、获取玩家Pawn、玩家控制器等等。

 

[用户界面（User Interface）](/documentation/zh-cn/unreal-engine/creating-user-interfaces-with-umg-and-slate-in-unreal-engine)

用户界面（UI）由游戏菜单、抬头显示（HUD）和绘制在游戏屏幕上的其他元素组成。它们为用户提供信息，帮助玩家与游戏交互。

 

[HUD](/documentation/zh-cn/unreal-engine/user-interfaces-and-huds-in-unreal-engine)

HUD是一种基础对象，用于显示覆盖在屏幕上的元素。 游戏中每个由人类控制的玩家都有各自的实例，以绘制其个人视口。

 

[摄像机（Camera）](/documentation/zh-cn/unreal-engine/cameras-in-unreal-engine)

摄像机表示玩家的视角，或玩家观察世界的方式。因此，摄像机只与人类控制的玩家相关。T

 

你可以在C++、蓝图或是（也是最常见的）两者混用中自定义并使用UE的Gameplay框架中的大部份类。

## 目录

[

![组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/225bc3a7-af21-42bc-b4d7-2cde194e7ab6/placeholder_topic.png)

组件

解释组件，并讲解各种可用类型。





](/documentation/zh-cn/unreal-engine/components-in-unreal-engine)[

![控制器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/919ec666-826e-4e3e-bafb-e69564235762/controller_lander.png)

控制器

控制器概述





](/documentation/zh-cn/unreal-engine/controllers-in-unreal-engine)[

![Pawn](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a2b5dbe-fa24-411d-b594-61f6bb86e67b/placeholder_topic.png)

Pawn

介绍什么是Pawn





](/documentation/zh-cn/unreal-engine/pawn-in-unreal-engine)[

![Gameplay框架快速参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8265feff-42eb-4b3d-b177-6aad4fdf8160/placeholder_topic.png)

Gameplay框架快速参考

简要介绍构成游戏框架的常见游戏类





](/documentation/zh-cn/unreal-engine/gameplay-framework-quick-reference-in-unreal-engine)[

![Actors](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/393c57e0-bfaf-48ca-aa42-14eca2c26f40/placeholder_topic.png)

Actors

介绍基本的Gameplay元素、Actor和Object





](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine)[

![摄像机](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d47b3bbe-ce01-473d-96c1-38d0cbad3819/topicimage.png)

摄像机

摄像机概览





](/documentation/zh-cn/unreal-engine/cameras-in-unreal-engine)[

![游戏功能和模块化Gameplay](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51420537-920d-42cc-b914-39895359df7f/gamefeaturesandmodulargameplaytopicimage.png)

游戏功能和模块化Gameplay

构建你可以轻松激活、停用或在项目之间共享的独立功能。





](/documentation/zh-cn/unreal-engine/game-features-and-modular-gameplay-in-unreal-engine)[

![Game Mode 和 Game State](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0df45086-fddb-4367-b7e4-88dde4b22245/gamemode_lander.png)

Game Mode 和 Game State

关于 Game Mode 和 Game State 的概述





](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine)[

![Gameplay定时器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b275c53-066e-4ef8-b90c-d01e327129c9/placeholder_topic.png)

Gameplay定时器

定时器可用于执行延时操作或重复操作





](/documentation/zh-cn/unreal-engine/gameplay-timers-in-unreal-engine)[

![用户界面和HUD](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5aaef300-06d2-48d7-aaf8-736ed1b17fb7/placeholder_topic.png)

用户界面和HUD

面向美术和程序员的关于创建用户界面（如菜单和HUD）的指南和信息。





](/documentation/zh-cn/unreal-engine/user-interfaces-and-huds-in-unreal-engine)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [gameplay framework](https://dev.epicgames.com/community/search?query=gameplay%20framework)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/gameplay-framework-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [Gameplay框架类](/documentation/zh-cn/unreal-engine/gameplay-framework-in-unreal-engine#gameplay%E6%A1%86%E6%9E%B6%E7%B1%BB)
-   [目录](/documentation/zh-cn/unreal-engine/gameplay-framework-in-unreal-engine#%E7%9B%AE%E5%BD%95)
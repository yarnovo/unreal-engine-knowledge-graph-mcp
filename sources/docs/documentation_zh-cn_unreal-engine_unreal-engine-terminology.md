# 虚幻引擎术语 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-terminology
> 
> 生成时间: 2025-06-14T18:51:40.132Z

---

目录

![虚幻引擎术语](https://dev.epicgames.com/community/api/documentation/image/0595aa82-8339-4544-aed8-84ae22a43f44?resizing_type=fill&width=1920&height=335)

本页面介绍使用 **虚幻引擎** 时的最常用术语。如果你想知道"什么是 **Actor** ？"或"什么是 **组件（Component）** ？"，那么此页面能够回答你的问题，并提供额外的信息。

当你了解术语后，可以选择分段末尾链接的主题了解更多信息。

本页面会使用一些编程概念，如 **类** 和 **子类** 。在C++中，**类** 是包含可执行变量和行为的代码模板。**子类** 是从父类继承部分或全部代码和功能的类。

本页面提及的所有C++类专用于虚幻引擎。

## 项目

**虚幻引擎5项目（Unreal Engine 5 Project）** 中包含游戏的所有内容。项目中包含的大量文件夹都在磁盘上，例如 `Blueprints` 和 `Materials` 。你可以按照自己的意愿命名文件夹并将其整理到项目中。**虚幻编辑器（Unreal Editor）** 中的 **内容浏览器（Content Browser）** 面板显示与磁盘上的 `Project` 文件夹相同的目录结构。

每个项目都有与其关联的 `.uproject` 文件。`.uproject` 文件是创建、打开或保存项目的方法。你可以创建任意数量的不同项目，然后并行处理它们。

如需了解更多信息，请参阅[使用项目和模板](/documentation/zh-cn/unreal-engine/working-with-projects-and-templates-in-unreal-engine)。

## 蓝图

**蓝图视觉效果脚本（Blueprint Visual Scripting）** 系统是完善的gameplay脚本系统，在虚幻编辑器中使用基于节点的界面来创建gameplay元素。就像许多常用的脚本编写语言，它可以用于在引擎中定义以object为导向（OO）的类或object。在使用虚幻引擎时，经常会发现使用蓝图定义的object被统称为"蓝图"。

有关更多信息，请参阅[蓝图可视化脚本](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)。

## 对象

**Object** 是虚幻引擎中最基本的类——换而言之，它们就像建造系统的砖块，包含资产的大量基本功能。虚幻引擎中的几乎所有功能都继承自object（或使用其中的部分功能）。

在C++中，`UObject` 是所有object的基类，可以实施多种功能，例如垃圾回收、用于将变量提供给虚幻编辑器的元数据（`UProperty`）支持以及用于加载和保存的序列化。

更多信息请参阅：

-   [虚幻架构](/documentation/zh-cn/unreal-engine/programming-in-the-unreal-engine-architecture)

## 类

**类（Class）** 定义虚幻引擎中特定Actor或Object的行为和属性。类是分层的，意味着类从其父类（即派生出类的类，或"子类"的来源）中继承信息并将该信息传递给其子项。可以在C++代码或蓝图中创建类。

更多信息请参阅：

-   [蓝图类](/documentation/zh-cn/unreal-engine/blueprint-class-assets-in-unreal-engine)
-   [游戏性类](/documentation/zh-cn/unreal-engine/gameplay-classes-in-unreal-engine)
-   [类创建基础知识](/documentation/zh-cn/unreal-engine/class-creation-basics-in-unreal-engine)

## Actor

**Actor** 是可以放到关卡中的任何object，例如摄像机、静态网格体或玩家出生点位置。Actor支持3D变换，例如转换、旋转和缩放。可以通过gameplay代码（C++或蓝图）创建（生成）或销毁Actor。

在C++中，`AActor` 是所有Actor的基类。

更多信息请参阅：

-   [Actors](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine)
-   [Actor和几何体](/documentation/zh-cn/unreal-engine/actors-and-geometry-in-unreal-engine)

## 类型转换

**类型转换（Casting）** 是一种动作，将会提取特定类的Actor并尝试将其作为其他类进行处理。类型转换可能成功，也可能失败。如果类型转换成功，则可以在你类型转换到的Actor上访问特定于类的功能。

例如，如果你要制作一款游戏，在其中具有能够以不同方式影响玩家角色的多种体积类型。其中一个体积是 **火焰（Fire）**，可以随着时间降低玩家血量。当角色与关卡中的任何体积重叠时，就可以将该体积 **类型转换（Cast）** 到 **火焰（Fire）** 上，以尝试访问其"损害玩家血量"功能。

-   如果类型转换成功——即如果玩家站在火中——玩家的血量将开始下降。
-   如果类型转换失败——即如果玩家站在任何其他类型的体积中——其血量将不受影响。

类型转换不同于简单地检查Actor是否是给定的类，它将返回一个二选一的答案（是或否），但不允许你与该类的任何特定功能进行交互。

## 组件

**组件（Component）** 是一种可以添加到Actor的功能。

将组件添加到Actor时，Actor可以使用组件提供的功能。例如：

-   点光源组件将使Actor像点光源一样发光。
-   旋转移动组件将使Actor转动。
-   音频组件将使Actor能够播放音效。

组件必须连接到Actor，不能独自存在。

更多信息请参阅：

-   [基础组件](/documentation/zh-cn/unreal-engine/basic-components-in-unreal-engine)
-   [组件窗口](/documentation/zh-cn/unreal-engine/components-window-in-unreal-engine)
-   [组件](/documentation/zh-cn/unreal-engine/components-in-unreal-engine)

## Pawn

**Pawn** 是Actor的子类，作为游戏内的形象或人像（例如游戏中的角色）。玩家或游戏的AI可以控制Pawn，将其作为非玩家角色（NPC）。

当人类或AI玩家控制Pawn时，会将其视为 *被占有* 。相反，当人类或AI玩家未控制Pawn时，会将其视为 *未被占有* 。

更多信息请参阅：

-   [Pawn](/documentation/zh-cn/unreal-engine/pawn-in-unreal-engine)
-   [持有Pawn](/documentation/zh-cn/unreal-engine/possessing-pawns-in-unreal-engine)

## 角色

**角色（Character）** 是计划用作玩家角色的Pawn Actor的子类。角色子类包括碰撞设置、双足运动的输入绑定以及用于玩家控制动作的其他代码。

更多信息请参阅：

-   [角色](/documentation/zh-cn/unreal-engine/characters-in-unreal-engine)
-   [设置角色](/documentation/zh-cn/unreal-engine/setting-up-a-character-in-unreal-engine)
-   [设置角色动作](/documentation/zh-cn/unreal-engine/setting-up-character-movement)

## 玩家控制器

**玩家控制器（Player Controller）** 获取玩家输入，并将其转换到游戏内的互动中。每个游戏内部都至少具有一个玩家控制器。玩家控制器通常操控一个Pawn或角色作为玩家在游戏中的呈现方式。

玩家控制器还是多人游戏的主要网络互动点。在多人游戏期间，服务器具有游戏中每个玩家的玩家控制器的一个实例，因为它还必须对每个玩家进行网络功能调用。每个客户端都只有一个与玩家对应的玩家控制器，并且只能使用其玩家控制器与服务器进行通信。

关联的C++类是 `PlayerController` 。

有关更多信息，请参阅[玩家控制器](/documentation/zh-cn/unreal-engine/player-controllers-in-unreal-engine)。

## AI控制器

就像玩家控制器操控Pawn作为玩家在游戏中的呈现方式，**AI控制器（AI Controller）** 操控Pawn在游戏中呈现非玩家角色（NPC）。默认情况下，Pawn和角色都以基本AI控制器终结，除非它们被玩家控制器专门操控或者收到指令不允许为自己创建AI控制器。

关联的C++类是 `AIController` 。

有关更多信息，请参阅[AI控制器](/documentation/zh-cn/unreal-engine/ai-controllers-in-unreal-engine)。

## 玩家状态

**玩家状态（Player State）** 是游戏参与者在游戏中的状态，例如人类玩家或模拟玩家的机器人。非玩家AI作为游戏世界的一部分而存在，没有玩家状态。

玩家状态可能包含的玩家信息示例包括：

-   名称
-   当前级别
-   血量
-   得分
-   它们当前是否在"夺旗"游戏中扛旗。

对于多人游戏，所有玩家的玩家状态都在所有机器中存在，可以将数据从游戏中复制到客户端以保持内容一致。这不同于玩家控制器，因为玩家控制器仅存在于玩家所使用的机器上。

关联的C++类是 `PlayerState`。

有关更多信息，请参阅[Gameplay框架快速参考](/documentation/zh-cn/unreal-engine/gameplay-framework-quick-reference-in-unreal-engine)。

## 游戏模式

**游戏模式（Game Mode）** 设置要运行的游戏的规则。这些规则可以包括：

-   玩家如何加入游戏。
-   游戏是否可以暂停。
-   任何游戏特定行为，例如获胜条件。

可以在[项目设置](/documentation/zh-cn/unreal-engine/project-settings-in-unreal-engine)中设置默认游戏模式，并针对不同的关卡重载游戏模式。无论你选择以何种方式实施，每个关卡都只能有一个游戏模式。

在多人游戏中，游戏模式新存在于服务器上，而规则将复制（发送）到每个连接的客户端。

关联的C++类是 `GameMode`。

更多信息请参阅：

-   [Game Mode 和 Game State](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine).
-   [设置游戏模式](/documentation/zh-cn/unreal-engine/setting-up-a-game-mode-in-unreal-engine)

## 游戏状态

**游戏状态（Game State）** 是一个容器，包含你要在游戏中复制到每个客户端的信息。简而言之，它是每个连接的人的"游戏状态"。

游戏状态可能包含的内容示例包括：

-   与游戏得分相关的信息。
-   比赛是否开始。
-   根据世界中的玩家数量确定生成AI角色的数量。

对于多人游戏，每个玩家的机器上都有一个本地游戏状态实例。本地游戏状态实例从游戏状态的服务器实例获取更新的信息。

关联的C++类是 `GameState`。

有关更多信息，请参阅[Game Mode 和 Game State](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine)。

## 笔刷

**笔刷（Brush）** 是用于描述3D形状的Actor，例如立方体或球体。可以将笔刷放置在关卡中以定义关卡几何体（这些几何体称为二进制空间分区或BSP笔刷）。例如，如果要快速封锁关卡，此功能非常有用。

更多信息请参阅：

-   [几何体笔刷Actor](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine)
-   [内容示例](/documentation/zh-cn/unreal-engine/content-examples-sample-project-for-unreal-engine)

## 体积

**体积（Volumes）** 是带有边界的3D空间，根据连接到体积的效果，具有不同的使用方法。例如：

-   **阻挡体积（Blocking Volumes）** 是可见的，用于阻止Actor通过它们。
-   **施加伤害体积（Pain Causing Volume）** 对与其重叠的任何Actor造成持续伤害。
-   **触发器体积（Trigger Volumes）** 的编程方式为，在Actor进入或退出体积时触发事件。

如需了解更多信息，请参阅[Actor参考](/documentation/zh-cn/unreal-engine/unreal-engine-actors-reference)。

## 关卡

**关卡（Level）** 是你定义的gameplay区域。关卡包含玩家可以看到并与其交互的所有内容，例如几何体、Pawn和Actor。

虚幻引擎将每个关卡保存为单独的 `.umap` 文件，这也是为什么你在某些情况下会看到它们被称为 **地图（Maps）** 。

更多信息请参阅：

-   [关卡](/documentation/zh-cn/unreal-engine/levels-in-unreal-engine)
-   [关卡编辑器](/documentation/zh-cn/unreal-engine/level-editor-in-unreal-engine)

## 世界

**世界（World）** 是构成游戏的所有关卡的容器。它处理关卡的流送和动态Actor的生成（创建）。

更多信息请参阅：

-   [World Settings](/documentation/en-us/unreal-engine/world-settings-in-unreal-engine)
-   [关卡流送](/documentation/zh-cn/unreal-engine/level-streaming-in-unreal-engine)

-   [](https://dev.epicgames.com/community/search)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [项目](/documentation/zh-cn/unreal-engine/unreal-engine-terminology#%E9%A1%B9%E7%9B%AE)
-   [蓝图](/documentation/zh-cn/unreal-engine/unreal-engine-terminology#%E8%93%9D%E5%9B%BE)
-   [对象](/documentation/zh-cn/unreal-engine/unreal-engine-terminology#%E5%AF%B9%E8%B1%A1)
-   [类](/documentation/zh-cn/unreal-engine/unreal-engine-terminology#%E7%B1%BB)
-   [Actor](/documentation/zh-cn/unreal-engine/unreal-engine-terminology#actor)
-   [类型转换](/documentation/zh-cn/unreal-engine/unreal-engine-terminology#%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2)
-   [组件](/documentation/zh-cn/unreal-engine/unreal-engine-terminology#%E7%BB%84%E4%BB%B6)
-   [Pawn](/documentation/zh-cn/unreal-engine/unreal-engine-terminology#pawn)
-   [角色](/documentation/zh-cn/unreal-engine/unreal-engine-terminology#%E8%A7%92%E8%89%B2)
-   [玩家控制器](/documentation/zh-cn/unreal-engine/unreal-engine-terminology#%E7%8E%A9%E5%AE%B6%E6%8E%A7%E5%88%B6%E5%99%A8)
-   [AI控制器](/documentation/zh-cn/unreal-engine/unreal-engine-terminology#ai%E6%8E%A7%E5%88%B6%E5%99%A8)
-   [玩家状态](/documentation/zh-cn/unreal-engine/unreal-engine-terminology#%E7%8E%A9%E5%AE%B6%E7%8A%B6%E6%80%81)
-   [游戏模式](/documentation/zh-cn/unreal-engine/unreal-engine-terminology#%E6%B8%B8%E6%88%8F%E6%A8%A1%E5%BC%8F)
-   [游戏状态](/documentation/zh-cn/unreal-engine/unreal-engine-terminology#%E6%B8%B8%E6%88%8F%E7%8A%B6%E6%80%81)
-   [笔刷](/documentation/zh-cn/unreal-engine/unreal-engine-terminology#%E7%AC%94%E5%88%B7)
-   [体积](/documentation/zh-cn/unreal-engine/unreal-engine-terminology#%E4%BD%93%E7%A7%AF)
-   [关卡](/documentation/zh-cn/unreal-engine/unreal-engine-terminology#%E5%85%B3%E5%8D%A1)
-   [世界](/documentation/zh-cn/unreal-engine/unreal-engine-terminology#%E4%B8%96%E7%95%8C)
# 虚幻引擎中的 Game Mode 和 Game State | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:47:47.203Z

---

目录

![Game Mode 和 Game State](https://dev.epicgames.com/community/api/documentation/image/c04bc47c-03e7-4725-893a-17aadc642474?resizing_type=fill&width=1920&height=335)

两个主要类负责处理进行中游戏的相关信息：**Game Mode** 和 **Game State**。

即使最开放的游戏也拥有基础规则，而这些规则构成了 **Game Mode**。在最基础的层面上，这些规则包括：

-   出现的玩家和观众数量，以及允许的玩家和观众最大数量。
-   玩家进入游戏的方式，可包含选择生成地点和其他生成/重生成行为的规则。
-   游戏是否可以暂停，以及如何处理游戏暂停。
-   关卡之间的过渡，包括游戏是否以动画模式开场。

基于规则的事件在游戏中发生，需要进行追踪并和所有玩家共享时，信息将通过 **Game State** 进行存储和同步。这些信息包括：

-   游戏已运行的时间（包括本地玩家加入前的运行时间）。
-   每个个体玩家加入游戏的时间和玩家的当前状态。
-   当前 Game Mode 的基类。
-   游戏是否已开始。

## Game Modes

特定的基础（如进行游戏所需要的玩家数量，或玩家加入游戏的方法）在多种类型的游戏中具有共通性。可根据开发的特定游戏进行无穷无尽的规则变化。无论规则如何，Game Modes 的任务都是定义和实现规则。Game Modes 当前常用的基类有两个。

4.14 版本中加入了 `AGameModeBase`，这是所有 Game Mode 的基类，是经典的 `AGameMode` 简化版本。`AGameMode` 是 4.14 版本之前的基类，仍然保留，功能 如旧，但现在是 `AGameModeBase` 的子类。由于其比赛状态概念的实现，`AGameMode` 更适用于标准游戏类型（如多人射击游戏）。`AGameModeBase` 简洁高效，是新代码项目中包含的全新默认游戏模式。

### AGameModeBase

所有 Game Mode 均为 `AGameModeBase` 的子类。而 `AGameModeBase` 包含大量可覆盖的基础功能。部分常见函数包括：

函数/事件

目的

`InitGame`

`InitGame` 事件在其他脚本之前调用（包括 `PreInitializeComponents`），由 `AGameModeBase` 使用，初始化参数并生成其助手类。

它在任意 Actor 运行 `PreInitializeComponents` 前调用（包括 Game Mode 实例自身）。

`PreLogin`

接受或拒绝尝试加入服务器的玩家。如它将 `ErrorMessage` 设为一个非空字符串，会导致 `Login` 函数失败。`PreLogin` 在 `Login` 前调用，Login 调用前可能需要大量时间，加入的玩家需要下载游戏内容时尤其如此。

`PostLogin`

成功登录后调用。这是首个在 `PlayerController` 上安全调用复制函数之处。`OnPostLogin` 可在蓝图中实现，以添加额外的逻辑。

`HandleStartingNewPlayer`

在 `PostLogin` 后或无缝游历后调用，可在蓝图中覆盖，修改新玩家身上发生的事件。它将默认创建一个玩家 pawn。

`RestartPlayer`

调用开始生成一个玩家 pawn。如需要指定 Pawn 生成的地点，还可使用 `RestartPlayerAtPlayerStart` 和 `RestartPlayerAtTransform` 函数。`OnRestartPlayer` 可在蓝图中实现，在此函数完成后添加逻辑。

`SpawnDefaultPawnAtTransform`

这实际生成玩家 Pawn，可在蓝图中覆盖。

`Logout`

玩家离开游戏或被摧毁时调用。可实现 `OnLogout` 执行蓝图逻辑。

可针对游戏提供的每个比赛格式、任务类型或特殊区域创建 `AGameModeBase` 的子类。一款游戏可拥有任意数量的 Game Mode，因此也可拥有任意数量的 `AGameModeBase` 类子类；然而，给定时间上只能使用一个 Game Mode。每次关卡进行游戏实例化时 Game Mode Actor 将通过 `UGameEngine::LoadMap()` 函数进行实例化。

Game Mode 不会复制到加入多人游戏的远程客户端；它只存在于服务器上，因此本地客户端可看到之前使用过的留存 Game Mode 类（或蓝图）；但无法访问实际的实例并检查其变量，确定游戏进程中已发生哪些变化。如玩家确实需要更新与当前 Game Mode 相关的信息，可将信息保存在一个 `AGameStateBase` Actor 上，轻松保持同步。`AGameStateBase` Actor 随 Game Mode 而创建，之后被复制到所有远程客户端。

### AGameMode

`AGameMode` 是 `AGameModeBase` 的子类，拥有一些额外的功能支持多人游戏和旧行为。所有新建项目默认使用 `AGameModeBase`。如果需要此额外行为，可切换到从 `AGameMode` 进行继承。如从 `AGameMode` 进行继承，也可从 `AGameState` 继承游戏状态（其支持比赛状态机）。

`AGameMode` 包含一个跟踪比赛状态或整体游戏流程的状态机。可使用 `GetMatchState` 或 `HasMatchStarted`、`IsMatchInProgress` 和 `HasMatchEnded` 之类的封装器查询当前的状态。以下是可能的比赛状态：

-   `EnteringMap` 是初始状态。Actor 尚未进行 tick，世界场景尚未完整初始化。内容完整加载后将过渡到下个状态。
-   `WaitingToStart` 是下个状态，进入时将调用 `HandleMatchIsWaitingToStart`。Actor 正在进行 tick，但玩家尚未生成。如 `ReadyToStartMatch` 返回 *true* 或 `StartMatch` 被调用，它将过渡到下个状态。
-   `InProgress` 是游戏主体所发生的状态。进入此状态时将调用 `HandleMatchHasStarted`，然后在所有 Actor 上调用 `BeginPlay`。此时，正常游戏进程已在进行中。`ReadyToEndMatch` 返回 *true* 或调用 `EndMatch` 时比赛将过渡到下个状态。
-   `WaitingPostMatch` 是倒数第二个状态，进入时将调用 `HandleMatchHasEnded`。Actor 仍在 tick，但新玩家无法加入。地图转换开始时它将过渡到下个状态。
-   `LeavingMap` 是正常流程中的最后一个状态，进入时将调用 `HandleLeavingMap`。转换到新地图时比赛将保持在此状态中，进入新地图时将过渡回到 `EnteringMap`。
-   `Aborted` 是失败状态，调用 `AbortMatch` 可开始此状态。出现无法恢复的错误时将进行此设置。

游戏状态将固定为 `InProgress`，因为这是调用 `BeginPlay`、actor 开始 tick 的状态。然而，个体游戏可能覆盖这些状态的行为，用更复杂的规则构建一个多人游戏，如在一款多人射击游戏中等待其他玩家加入时允许玩家在关卡中自由飞行。

### Game Mode 蓝图

可创建派生自 Game Mode 类的蓝图，并将它们用作项目或关卡的默认 Game Mode。

派生自 Game Mode 的蓝图可进行以下默认设置：

-   默认 [Pawn](/documentation/zh-cn/unreal-engine/pawn-in-unreal-engine) 类
-   HUD 类
-   [玩家控制器](/documentation/zh-cn/unreal-engine/player-controllers-in-unreal-engine) 类
-   Spectator 类
-   Game State 类
-   Player State 类

此外，Game Mode 的蓝图十分实用，因为它们无需调整代码即可启用变量调整。因此可用于使单一 Game Mode 适用到多个不同关卡，无需使用硬编码资源引用或为每次调整请求工程支持和代码修改。

### 设置 Game Mode

设置关卡的 Game Mode 有多种，此处的排序从优先级最低到最高：

-   设置 `DefaultEngine.ini` 文件的 `/Script/EngineSettings.GameMapsSettings` 部分的 `GlobalDefaultGameMode` 输入将设置项目中所有地图的默认游戏模式。
    
    ```cpp
              [/Script/EngineSettings.GameMapsSettings]
              GlobalDefaultGameMode="/Script/MyGame.MyGameGameMode"
              GlobalDefaultServerGameMode="/Script/MyGame.MyGameGameMode"
    		
    ```
    
-   在编辑器中 **World Settings** 标签下设置 **GameMode Override** 即可覆盖个体地图的项目设置。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dca89208-5520-4a03-9304-5acc62215ce3/worldsettings_gamemode.png)
-   URL 可被传到可执行文件，强制游戏加载时带特定选项。使用 `game` 选项设置游戏模式。查看 [命令行参数](/documentation/zh-cn/unreal-engine/command-line-arguments-in-unreal-engine)中的详细内容。
    
    ```cpp
              UE4Editor.exe /Game/Maps/MyMap?game=MyGameMode -game
    		
    ```
    
-   最后，可在 `DefaultEngine.ini` 文件的 `/Script/Engine.WorldSettings/` 部分中设置地图前缀（和 URL 法的别名）。这些前缀设置所有拥有特定前缀的地图的默认游戏模式。
    
    ```cpp
              [/Script/EngineSettings.GameMapsSettings]
              +GameModeMapPrefixes=(Name="DM",GameMode="/Script/UnrealTournament.UTDMGameMode")
              +GameModeClassAliases=(Name="DM",GameMode="/Script/UnrealTournament.UTDMGameMode")
    ```
    

请查阅 [设置 Game Mode](/documentation/zh-cn/unreal-engine/setting-up-a-game-mode-in-unreal-engine) 文档中设置 Game Mode 的范例。

## Game State

**Game State** 负责启用客户端监控游戏状态。从概念上而言，Game State 应该管理所有已连接客户端已知的信息（特定于 Game Mode 但不特定于任何个体玩家）。它能够追踪游戏层面的属性，如已连接玩家的列表、夺旗游戏中的团队得分、开放世界游戏中已完成的任务，等等。

Game State 并非追踪玩家特有内容（如夺旗比赛中特定玩家为团队获得的分数）的最佳之处，因为它们由 **Player State** 更清晰地处理。整体而言，GameState 应该追踪游戏进程中变化的属性。这些属性与所有人皆相关，且所有人可见。Game mode 只存在于服务器上，而 Game State 存在于服务器上且会被复制到所有客户端，保持所有已连接机器的游戏进程更新。

`AGameStateBase` 是基础实现，其部分默认功能包括：

函数或变量

使用

`GetServerWorldTimeSeconds`

这是 `UWorld` 函数 `GetTimeSeconds` 的服务器版本，将在客户端和服务器上同步，因此该时间可用于复制，十分可靠。

`PlayerArray`

这是所有 `APlayerState` 对象的阵列，对游戏中所有玩家执行操作时十分实用。

`HasBegunPlay`

如 `BeginPlay` 函数在游戏中的 actor 上调用，则返回 true。

`AGameStateBase` 通常在 C++ 或蓝图中延展，包含用于使游戏中玩家知晓当前情况的额外变量和函数。进行的特定修改通常基于 Game State 的配对 Game Mode。Game Mode 自身也可将其默认 Game State 类覆盖为派生自 `AGameStateBase` 的任意 C++ 类或蓝图。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [gameplay framework](https://dev.epicgames.com/community/search?query=gameplay%20framework)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Game Modes](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine#gamemodes)
-   [AGameModeBase](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine#agamemodebase)
-   [AGameMode](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine#agamemode)
-   [Game Mode 蓝图](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine#gamemode%E8%93%9D%E5%9B%BE)
-   [设置 Game Mode](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine#%E8%AE%BE%E7%BD%AEgamemode)
-   [Game State](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine#gamestate)
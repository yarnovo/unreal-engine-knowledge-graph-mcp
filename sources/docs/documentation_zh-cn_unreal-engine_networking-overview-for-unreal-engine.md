# 虚幻引擎网络概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:56:26.350Z

---

目录

![网络概述](https://dev.epicgames.com/community/api/documentation/image/f4b86732-6496-43fd-bd07-928d3a854319?resizing_type=fill&width=1920&height=335)

在多人游戏会话中，游戏状态信息将通过网络连接在多台计算机之间传达。相反，单人本地游戏会将所有游戏状态信息存储在单台计算机上。因为需要通过网络连接进行通信，因此多人游戏编程天然比单人游戏编程复杂。在不同玩家之间共享信息的过程中，会用到不同于单人游戏的方法。**虚幻引擎（UE）** 提供的网络框架非常强大，支持着世界上最流行的一些在线多人游戏，可帮助你简化此过程。本页面概括介绍了驱动多人游戏编程的概念，并将指导你参阅更多文档，了解用于构建多人游戏的UE工具。

## 尽早规划多人游戏

若项目可能需要多人游戏功能，则从项目开始阶段起，构建所有Gameplay时都应将多人游戏功能考虑在内。若开发团队通常会在创建多人游戏时实施额外步骤，相较于单人游戏，构建Gameplay的流程并不会耗时过久。长远来看，项目将便于整个团队进行调试和维护。同时，UE中编写的多人游戏Gameplay仍可在无需联网游玩的单人游戏中使用。

如果你在设计项目时没有从一开始就考虑多人游戏，那么在重构无网络情况下编译的代码库时，就需要梳理整个项目，很大一部分的Gameplay功能需要重新编写。你可能还需要重新考虑你的设计，因为网络中的技术瓶颈（例如网络速度和稳定性）可能迫使你更改现有设计。

## 虚幻引擎网络架构

UE将 **客户端-服务器架构** 用于联网多人游戏。多人游戏有两种类型：本地多人游戏和联网多人游戏。在单人或本地多人游戏中，你的游戏在单台计算机本地作为单机游戏运行。在此情况下，所有玩家、资产和功能都存在于单台计算机上，所有输入都在单台计算机上处理。玩家将输入连接到此计算机，直接控制游戏中的所有内容。将来自玩家的通信输入传达给游戏不存在隐患，因为玩家直接连接到游戏实例，而游戏实例可以迅速处理所有输入。

![本地多人游戏](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b64b31a1-3a6e-45f3-ac39-6a04317cf0bf/localplayexample.png)

单人游戏和本地多人游戏都仅在一台机器上执行。

在联网多人游戏中，很多玩家使用不同的计算机通过网络连接到一台中央计算机。中央计算机称为 **服务器** ，它会托管多人游戏，而不同计算机上的其他所有玩家都作为 **客户端** 连接到该服务器。服务器会将游戏状态信息与每个连接的客户端共享，并为不同计算机上的所有玩家提供了彼此通信的方式。

![联网多人游戏](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcd4b59b-9d59-42f8-b9cc-7040f5d5c2df/networkplayexample.png)

在联网多人游戏中，游戏将在服务器与多个与之连接的客户端之间进行。服务器处理Gameplay，客户端为用户渲染游戏。

与本地多人游戏不同，这带来了额外的挑战。不同的客户端可能有不同的网络连接速度，而且信息必须通过网络来传达，但是网络有可能不稳定，输入可能会丢失。因此，在任何给定时间，一台客户端计算机上的游戏状态很可能不同于其他每一台客户端计算机。服务器作为游戏主机保存一个真正的 **权威** 游戏状态。换句话说，服务器是多人游戏实际运行的地方。客户端各自控制它们在服务器上拥有的远程 **Pawn** 。客户端从其本地Pawn向其服务器Pawn发送 *远程程序调用* 以在游戏中执行操作。接着，服务器向每个客户端 *复制* 关于游戏状态的信息，例如 **Actor** 所在的位置，这些Actor应该具备怎样的行为，以及不同的变量应该有哪些值。然后每个客户端使用这些信息，近似模拟服务器上实际正在发生的情况。

默认情况下，服务器不会直接将视觉效果流送到客户端显示器进行显示，服务器会将状态信息发送给客户端游戏实例，以便客户端计算机可以在自己的游戏实例中重现视觉效果。虚幻引擎提供了 **像素流送（Pixel Streaming）** 系统，用于预渲染帧和音频，以在移动端和Web浏览器上显示。更多信息请参阅[像素流送](/documentation/zh-cn/unreal-engine/pixel-streaming-in-unreal-engine)文档。

### 客户端-服务器Gameplay示例

此小节并排比较了多人游戏中的两个玩家，展示了本地和联网多人游戏之间的差异。在左侧，两个玩家在玩本地多人游戏。在右侧，两个玩家在玩联网多人游戏。

**本地多人游戏**

**联网多人游戏**

![本地玩游戏](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea58a14d-1aaa-46f8-b854-4280136eb32c/localmultiplayerexample.png)

![客户端服务器网络游戏](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9c68515-de33-4c28-886a-8f90e123652e/clientserverexample.png)

**玩家1按输入以发射武器。**

-   玩家1的Pawn响应此操作，发射当前武器。
-   玩家1的武器生成发射物，并播放随附的声音或视觉效果。

**玩家1在本地计算机上按输入以发射武器。**

-   玩家1的本地Pawn将发射武器的命令中传递到服务器上其连接的Pawn。
-   玩家1在服务器上的武器生成发射物。
-   服务器通知每个连接的客户端各自创建玩家1的发射物副本。
-   玩家1在服务器上的武器通知每个客户端播放与发射武器关联的声音和视觉效果。

**玩家1的发射物从武器中射出。**

**玩家1在服务器上的发射物从武器中射出。**

-   服务器通知每个客户端复制玩家1的发射物正在进行的移动，以便每个客户端上的玩家1发射物也跟着移动。

**玩家1的发射物撞击玩家2的Pawn。**

-   该撞击将触发一个函数来销毁玩家1的发射物，对玩家2的Pawn造成伤害，并播放随附的声音和视觉效果。
-   玩家2播放画面效果响应伤害。

**玩家1在服务器上的发射物撞击玩家2的Pawn。**

-   该撞击针触发一个函数来销毁玩家1在服务器上的发射物。
-   服务器自动通知每个客户销毁玩家1发射物的副本。
-   该撞击将触发一个函数来通知所有客户端播放该撞击随附的声音和视觉效果。
-   玩家2在服务器上的Pawn承受因发射物撞击造成的伤害。
-   玩家2在服务器上的Pawn通知玩家2的客户端播放画面效果响应该伤害。

在本地多人游戏中，这些交互全部在同一台计算机上的同一个世界中发生，因此相较于联网多人游戏更易于理解和编程。例如，当游戏生成一个对象时，所有玩家肯定都能看到该对象，因为所有玩家全部存在于同一个游戏世界中。

而在联网多人游戏中，这些交互在多个不同的世界中发生：

-   服务器上的权威世界。
-   玩家1的客户端世界。
-   玩家2的客户端世界。
-   连接到此服务器游戏实例的其他所有客户端的额外世界。

每个世界都有自己的玩家控制器、Pawn、武器和发射物。服务器是游戏实际运行的地方，但每个客户端的世界必须准确复制服务器上发生的事件，因此需要向每个客户端选择性地发送信息，在视觉上准确地展示服务器上的世界。

此过程在基础Gameplay交互（碰撞、移动、损伤）、美化效果（视觉效果和声音）以及玩家信息（HUD更新）之间进行了划分。这三者各自与网络中的特定计算机或一组计算机关联。此信息的复制过程并非完全自动化，你必须在Gameplay编程中指定要将哪些信息复制到哪些计算机。主要难点在于选择应该将哪些信息复制到哪些连接，才能为所有玩家提供一致的体验，同时还要最大限度减少信息复制量，避免网络带宽频繁饱和。

## 基础网络概念

此小节将详细介绍在UE中驱动网络Gameplay的概念，并简要介绍UE提供的工具，帮助你构建自己的联网多人游戏。

### 网络模式

**网络模式** 说明了计算机与联网多人游戏会话之间的关系。

**网络模式**

`ENetMode`

**说明**

**单机**

`NM_Standalone`

有一个或多个本地玩家且没有联网的游戏。仍被视为服务器，因为它包含所有服务器功能，但不接受来自远程客户端的连接。此模式用于单人和本地多人游戏。此模式可根据需要同时运行服务器端和客户端逻辑。

**专用服务器**

`NM_DedicatedServer`

没有本地玩家的服务器。服务器仅接受来自远程客户端的连接，因此为了更高效地运行，服务器放弃了图形、声音、输入和其他面向玩家的功能。此模式常用于需要更持久、安全或大规模多玩家的游戏。

**监听服务器**

`NM_ListenServer`

此服务器也有一个本地玩家，此玩家负责托管游戏。可供网络上的其他玩家链接。此模式常用于临时合作和竞技多人游戏。

**客户端**

`NM_Client`

连接到远程服务器的客户端。客户端连接到网络多人游戏会话中的监听服务器或专用服务器。客户端不运行服务器端逻辑。

由于单机游戏同时充当服务器和客户端，因此为多人游戏创建的逻辑可以在单人单机网络模式中运作，无需额外的工作。

要确定你的游戏实例的网络模式，请使用 `GetNetMode` 。UE还提供了预处理器定义，帮助你选择哪些代码应该编译，哪些不应该编译，具体取决于你是要编译游戏、服务器还是客户端目标：

**目标**

`UE_SERVER`

`WITH_SERVER_CODE`

**游戏**

0

1

**服务器**

1

1

**客户端**

0

0

如需详细了解UE目标，请参阅[目标](/documentation/zh-cn/unreal-engine/unreal-engine-build-tool-target-reference)文档。

#### 服务器类型

##### 监听服务器

**监听服务器** 以简单易用为设计出发点，可供用户自发进行设置，因为用户只要有游戏副本，就可以在同一台计算机上启动监听服务器并运行。支持监听服务器的游戏常常采用游戏中用户界面（UI）来启动服务器或搜索要加入的现有服务器。监听服务器并非没有缺点。由于托管监听服务器的玩家是直接在服务器上玩游戏，因此相对于作为客户端在监听服务器上玩游戏的玩家来说，他们更有优势。这可能引发游戏公平性的问题。另一方面，既要作为服务器运行，同时还要支持图形和音频渲染等玩家相关系统，这也会带来额外的处理负载。考虑到这些因素，监听服务器不太适合极其考验竞技能力的环境，也不适合网络负载非常高的游戏，但对于小型玩家群体间进行临时合作和竞技多人游戏而言，却十分好用。

##### 专用服务器

**专用服务器** 成本更高，更难配置。专用服务器需要独立于所有游戏参与玩家的计算机，并且需要完成自身网络连接。加入专用服务器的所有玩家使用远程网络连接体验游戏，这样更能保证公平性。由于专用服务器不渲染图形，也不执行仅对本地玩家相关的逻辑，因此还能够更高效地处理Gameplay事件并执行网络功能。因此，出于安全、公平、可靠方面的原因，专用服务器更适合需要大量玩家或高性能可靠服务器的游戏。这类游戏包括大型多人在线游戏（MMO）、竞技型多人在线战术竞技游戏（MOBA）或快节奏在线射击游戏。

网络连接速度和带宽会影响客户端在连接到服务器时的性能。无法保证所有客户端都有相同的网络连接速度，速度不相同的可能性更大。

### 复制

**复制** 是指权威服务器将状态数据发送到连接的客户端的过程。如前所述，真正的游戏状态存在于服务器上。连接的客户端会将此状态 *复制* 到本地，并渲染图形和音频，以便客户端可以与其他客户端通信并参与游戏。如果正确配置了复制，不同计算机的游戏实例会同步，并且Gameplay会流畅运行。

主要使用Actor和Actor派生的类通过UE中的网络连接复制其状态。`AActor` 是可以在关卡中放置或生成的对象的基类，也是UE的 `UObject` 继承层级中第一个支持用于网络的类。`UObject` 派生的类也可以复制，但必须作为复制的子对象附加到Actor才能恰当复制。

在UE情境中，有两个不同的领域与复制相关。第一是所复制的对象，标记需要复制的属性，并定义通过网络连接调用的函数。与此相关的大部分信息可在[Actor复制](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#actor%E5%A4%8D%E5%88%B6)小节中找到。第二是内部系统本身，它负责将对象复制到正确的计算机。就第二点而言，UE有几个不同的系统可复制对象，详见[复制系统](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E5%A4%8D%E5%88%B6%E7%B3%BB%E7%BB%9F)小节。

#### Actor复制

Actor使用几种不同的机制通过网络交互，其中包括：复制的属性、Replicated Using属性和远程程序调用。[复制的属性](/documentation/zh-cn/unreal-engine/replicate-actor-properties-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%A4%8D%E5%88%B6%E7%9A%84%E5%B1%9E%E6%80%A7)是通过网络复制其状态的Actor属性。[Replicated Using属性](/documentation/zh-cn/unreal-engine/replicate-actor-properties-in-unreal-engine#%E6%B7%BB%E5%8A%A0replicatedusing%E5%B1%9E%E6%80%A7)是通过网络复制其状态并随后在复制其状态后调用函数来执行操作的Actor属性。[远程程序调用](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine)使Actor能够从一台计算机调用函数，并在不同的计算机上运行它。例如，一个Actor可以在客户端上调用服务器远程程序调用，该函数接着将在服务器收到网络数据包之后在服务器上运行。

Actor复制是一种极其精细且步骤繁多的过程，涉及几个主要步骤：

-   客户端计算机确定哪些Actor需要复制到哪些连接。
    -   更多信息请参阅[详细Actor复制流程](/documentation/zh-cn/unreal-engine/detailed-actor-replication-flow-in-unreal-engine)文档。
-   服务器确定按怎样的顺序更新属性以及执行远程程序调用。
    -   更多信息请参阅[复制的对象执行顺序](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine)文档。
-   服务器向其他所有连接的客户端发送相关信息。

默认情况下，大部分Actor不会复制，而是在本地执行其函数。你可以将C++中的 `bReplicates` 变量或蓝图中的 **Replicates** 设置设为 `true` ，为Actor派生的类启用复制。关于如何复制Actor及其属性的概述，请参阅[复制Actor属性](/documentation/zh-cn/unreal-engine/replicate-actor-properties-in-unreal-engine)文档。

下表概述了可用的不同复制功能：

**功能**

**说明**

**更多信息**

**创建和销毁**

在服务器上生成复制的Actor的权威版本时，它会在所有连接的客户端上生成自身的远程代理。接着它会将信息复制到这些远程代理。若销毁权威Actor，将自动销毁所有连接的客户端上的远程代理。

[Actor所有者和所属连接](/documentation/zh-cn/unreal-engine/actor-owner-and-owning-connection-in-unreal-engine) [Actor角色和远程角色](/documentation/zh-cn/unreal-engine/actor-role-and-remote-role-in-unreal-engine)

**移动**

如果权威Actor启用了 **复制移动（Replicate Movement）** ，或在C++中将 `bReplicateMovement` 设为 `true` ，它将自动复制其位置、旋转和速度。

[角色移动组件中的联网移动](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine)

**属性**

设计为自动复制的属性会在每次其值发生更改时从权威Actor复制到其远程代理。

[复制Actor属性](/documentation/zh-cn/unreal-engine/replicate-actor-properties-in-unreal-engine)

**组件**

Actor组件如果设置为复制，会作为其所属Actor的一部分进行复制。组件中指定为要复制的变量将复制，组件中调用的RPC的行为将与Actor类中调用的RPC保持一致。

 

**子对象**

UObject派生的对象可以作为子对象附加到Actor并进行复制。

[复制的子对象](/documentation/zh-cn/unreal-engine/replicating-uobjects-in-unreal-engine)

**远程程序调用**

RPC是在网络游戏中传输到特定计算机的特殊函数。无论初始在哪台计算机上调用RPC，其实现将仅在目标计算机上运行。其可以是服务器（仅在服务器上运行）、客户端（仅在Actor的所属客户端上运行）或NetMulticast（在连接到会话的每台计算机上运行，包括服务器）。

[远程程序调用](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine)

创建、销毁、移动等常见用例会自动处理，但其他所有Gameplay功能在默认情况下不会复制，即使你为Actor启用复制也是如此。你必须手动指定：

-   要复制的属性和自定义条件。
-   要在你的代码中复制并手动调用的函数。
-   要复制的组件和子对象及其关联的属性和函数。

Actor、Pawn和角色的一些常见功能不会复制，例如：

-   骨骼网格体组件
-   静态网格体组件
-   材质
-   动画蓝图
-   粒子系统组件
-   声音发射器
-   物理对象

以上每项都在所有客户端上单独运行，但是，如果复制了驱动这些视觉元素的变量，这会确保所有客户端都有相同的信息，每个客户端会以大致相同的方式模拟这些功能。

### 调试、分析和测试

因为多个游戏实例会增加复杂度，网络连接的可靠性参差不齐，服务器与客户端之间的功能也存在差异，因此，调试、分析和测试就成了联网多人游戏开发过程中不可或缺的部分。UE提供了多个功能和特殊工具，帮助你调试、分析和测试你的项目。更多信息请参阅[网络调试](/documentation/zh-cn/unreal-engine/network-debugging-for-unreal-engine)文档小节。

## 复制系统

UE现在提供了三个不同的系统来通过网络连接复制状态数据：

-   [通用复制系统](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E9%80%9A%E7%94%A8%E5%A4%8D%E5%88%B6%E7%B3%BB%E7%BB%9F)
-   [复制图表](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E5%A4%8D%E5%88%B6%E5%9B%BE%E8%A1%A8)
-   [Iris复制系统](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#iris%E5%A4%8D%E5%88%B6%E7%B3%BB%E7%BB%9F)

开始设计联网多人游戏之前，需要先详细了解每种复制系统及其提供的功能，决定哪种最适合你的情况。

### 通用复制系统

通用复制系统是UE当前默认使用的系统。这是支持复制Actor、其属性和远程程序调用的基础复制系统。[网络和多人游戏](/documentation/zh-cn/unreal-engine/networking-and-multiplayer-in-unreal-engine)文档目录中包括的大部分文档都与通用复制系统相关，但以下文档 *除外* ：

-   [复制图表](/documentation/zh-cn/unreal-engine/replication-graph-in-unreal-engine)
-   [Iris复制系统](/documentation/zh-cn/unreal-engine/iris-replication-system-in-unreal-engine)

#### 重要功能

**功能**

**说明**

[**休眠（Dormancy）**](/documentation/zh-cn/unreal-engine/actor-network-dormancy-in-unreal-engine)

控制是否将某个Actor添加到连接的考虑进行复制的Actor列表。

[**优先级（Priority）**](/documentation/zh-cn/unreal-engine/actor-priority-in-unreal-engine)

控制在带宽有限的情况下，某个Actor对于每帧复制的重要性。

[**相关性（Relevancy）**](/documentation/zh-cn/unreal-engine/actor-relevancy-in-unreal-engine)

控制某个Actor对于特定连接是否相关。

### 复制图表

复制图表插件是一种网络复制系统，在有大量复制的Actor时能很好地扩展。更多信息请参阅[复制图表](/documentation/zh-cn/unreal-engine/replication-graph-in-unreal-engine)文档。

### Iris复制系统

Iris复制系统是最新添加到UE网络功能中的内容。Iris可与UE的通用复制系统协同工作，因此现有Actor复制和远程程序调用会像之前那样运作，但它还有新功能，用于替换通用系统中的一些功能并旨在改进它们。

关于Iris的更多通用信息，请参阅[Iris复制系统](/documentation/zh-cn/unreal-engine/iris-replication-system-in-unreal-engine)文档。如需详细了解通用复制系统和Iris之间的差异，请参阅[迁移到Iris](/documentation/en-us/unreal-engine/migrate-to-iris-in-unreal-engine)文档。

#### 重要功能

**功能**

**说明**

[**筛选**](/documentation/zh-cn/unreal-engine/iris-filtering-in-unreal-engine)

控制某个Actor要复制到的连接，Actor属于哪些复制组，以及动态复制筛选。

[**优先级安排**](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine)

基于静态优先级或自定义动态优先级，控制某个Actor对于每帧复制的重要性。

## 联网提示

下面概括了一些针对UE中联网功能的提示。你可以在本目录中的相关文档页面上找到更多信息。

-   使用尽可能少的RPC和复制的蓝图函数。如果你可以改用Replicated Using（RepNotify）属性，就应该使用它。
-   少用多播函数，因为它们会为每个连接的客户端带来额外的网络流量。
-   如果你可以保证非复制的函数仅在服务器上执行，仅限服务器的逻辑不一定需要包含在服务器RPC中。
-   将可靠RPC绑定到玩家输入时需谨慎操作。玩家可能会迅速反复按键，从而使可靠RPC队列溢出。如果你要这样做，就应该创建一种机制，限制玩家可以根据输入激活RPC的频率。
-   如果RPC被特别频繁地调用，例如在Actor更新函数中，则应将RPC设为不可靠。
-   尽可能经常回收函数。一些函数可以通过调用它们以响应Gameplay逻辑来回收，也可以作为RepNotify来回收，以确保客户端和服务器有并行执行。
-   检查你的Actor的网络角色。若要在同时在服务器和客户端上激活的函数中筛选执行，这会非常有用。
-   使用 `IsLocallyControlled` 检查你的Pawn是否在本地受控制。若要根据Pawn是否对所属客户端相关而筛选执行，这会非常有用。
-   利用网络休眠。这是你可以在网络Gameplay中做出的最显著优化之一。

## 教程

本文档分段提供了一些教程，可帮助你开始在UE中使用网络编程：

[](/documentation/zh-cn/unreal-engine/multiplayer-programming-quick-start-for-unreal-engine)

[![多人游戏编程快速入门指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1d0b748-ce8b-47f8-8e08-4feb539408da/preview.png)](/documentation/zh-cn/unreal-engine/multiplayer-programming-quick-start-for-unreal-engine)

[多人游戏编程快速入门指南](/documentation/zh-cn/unreal-engine/multiplayer-programming-quick-start-for-unreal-engine)

[用C++创建简单的多人游戏。](/documentation/zh-cn/unreal-engine/multiplayer-programming-quick-start-for-unreal-engine)

[](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine)

[![角色移动组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4cc6653-13b1-4bd9-b50f-457f204fcfaa/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine)

[角色移动组件](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine)

[关于角色移动组件的详细介绍](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine)

[](/documentation/zh-cn/unreal-engine/setting-up-dedicated-servers-in-unreal-engine)

[![设置专用服务器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bd3e0e9-f70f-4b88-bb6d-fc7aa7cde796/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/setting-up-dedicated-servers-in-unreal-engine)

[设置专用服务器](/documentation/zh-cn/unreal-engine/setting-up-dedicated-servers-in-unreal-engine)

[为你的项目设置和运行专用服务器。](/documentation/zh-cn/unreal-engine/setting-up-dedicated-servers-in-unreal-engine)

-   [gameplay](https://dev.epicgames.com/community/search?query=gameplay)
-   [multiplayer](https://dev.epicgames.com/community/search?query=multiplayer)
-   [network](https://dev.epicgames.com/community/search?query=network)
-   [replication](https://dev.epicgames.com/community/search?query=replication)
-   [replication graph](https://dev.epicgames.com/community/search?query=replication%20graph)
-   [iris](https://dev.epicgames.com/community/search?query=iris)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [尽早规划多人游戏](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E5%B0%BD%E6%97%A9%E8%A7%84%E5%88%92%E5%A4%9A%E4%BA%BA%E6%B8%B8%E6%88%8F)
-   [虚幻引擎网络架构](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E7%BD%91%E7%BB%9C%E6%9E%B6%E6%9E%84)
-   [客户端-服务器Gameplay示例](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E5%AE%A2%E6%88%B7%E7%AB%AF-%E6%9C%8D%E5%8A%A1%E5%99%A8gameplay%E7%A4%BA%E4%BE%8B)
-   [基础网络概念](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E5%9F%BA%E7%A1%80%E7%BD%91%E7%BB%9C%E6%A6%82%E5%BF%B5)
-   [网络模式](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E7%BD%91%E7%BB%9C%E6%A8%A1%E5%BC%8F)
-   [服务器类型](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%B1%BB%E5%9E%8B)
-   [监听服务器](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E7%9B%91%E5%90%AC%E6%9C%8D%E5%8A%A1%E5%99%A8)
-   [专用服务器](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E4%B8%93%E7%94%A8%E6%9C%8D%E5%8A%A1%E5%99%A8)
-   [复制](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E5%A4%8D%E5%88%B6)
-   [Actor复制](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#actor%E5%A4%8D%E5%88%B6)
-   [调试、分析和测试](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E8%B0%83%E8%AF%95%E3%80%81%E5%88%86%E6%9E%90%E5%92%8C%E6%B5%8B%E8%AF%95)
-   [复制系统](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E5%A4%8D%E5%88%B6%E7%B3%BB%E7%BB%9F)
-   [通用复制系统](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E9%80%9A%E7%94%A8%E5%A4%8D%E5%88%B6%E7%B3%BB%E7%BB%9F)
-   [重要功能](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E9%87%8D%E8%A6%81%E5%8A%9F%E8%83%BD)
-   [复制图表](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E5%A4%8D%E5%88%B6%E5%9B%BE%E8%A1%A8)
-   [Iris复制系统](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#iris%E5%A4%8D%E5%88%B6%E7%B3%BB%E7%BB%9F)
-   [重要功能](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E9%87%8D%E8%A6%81%E5%8A%9F%E8%83%BD-2)
-   [联网提示](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E8%81%94%E7%BD%91%E6%8F%90%E7%A4%BA)
-   [教程](/documentation/zh-cn/unreal-engine/networking-overview-for-unreal-engine#%E6%95%99%E7%A8%8B)

相关文档

[

网络多人游戏基础

![网络多人游戏基础](https://dev.epicgames.com/community/api/documentation/image/ae24446f-9825-4216-b80b-c0edc0287023?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/basics-of-network-multiplayer-in-unreal-engine)

[

编写多人游戏

![编写多人游戏](https://dev.epicgames.com/community/api/documentation/image/16e82f3f-6edb-4cd2-b447-4fc9a1060563?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/programming-network-multiplayer-games-for-unreal-engine)

[

Iris复制系统

![Iris复制系统](https://dev.epicgames.com/community/api/documentation/image/5815ebc6-b484-4554-91e1-440cfdbc682a?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/iris-replication-system-in-unreal-engine)

[

网络编程教程和示例

![网络编程教程和示例](https://dev.epicgames.com/community/api/documentation/image/26e77c63-3391-414f-b429-80f03117a688?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/network-programming-tutorials-and-examples)

[

网络调试

![网络调试](https://dev.epicgames.com/community/api/documentation/image/0ae54a70-ceb3-481a-9ae9-c4687d7633bf?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/network-debugging-for-unreal-engine)

[

部署多人游戏

![部署多人游戏](https://dev.epicgames.com/community/api/documentation/image/709f5509-2518-40de-9a94-a5209e63cc9e?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/deploying-multiplayer-games-with-unreal-engine)
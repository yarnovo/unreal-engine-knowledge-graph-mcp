# 了解虚幻引擎角色移动组件中的网络移动 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:58:28.208Z

---

目录

![角色移动组件](https://dev.epicgames.com/community/api/documentation/image/5a5a2512-5c4b-4fab-a12b-d2e909357f94?resizing_type=fill&width=1920&height=335)

**角色移动组件** 是一个 **Actor组件** ，它提供封装式运动系统，具有人体模型 **角色** 的常见移动模式，包括步行、降落、游泳和飞行。角色移动组件还具有可靠的网络Gameplay集成功能。其默认移动模式均为默认复制，它提供的框架可帮助开发人员创建自定义联网移动。

## 角色移动基础知识

[`UCharacterMovementComponent`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/UCharacterMovementComponent)预先附加到[`ACharacter`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/ACharacter)Actor类以及根据它派生的所有 **蓝图** 。

在其 `TickComponent` 函数运行期间，`UCharacterMovementComponent` 将调用 `PerformMovement` ，以根据当前使用的 **移动模式** 以及玩家的输入变量（通常用[`APlayerController`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/APlayerController)中的 *控制输入* 变量表示）计算世界中所需的加速度。完成移动计算后，`UCharacterMovementComponent` 会将最终移动应用于所属角色。

虽然 `ACharacter` 派生自[`APawn`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/APawn)，但角色不仅仅是添加了角色移动组件的Pawn。`UCharacterMovementComponent` 和 `Acharacter` 设计为结合使用，`ACharacter` 会覆盖数个复制的变量和函数，专门用于方便 `UCharacterMovementComponent` 中的复制。

### PerformMovement和移动物理效果

`PerformMovement` 函数负责让角色在游戏世界中的移动符合物理原理。在非联网游戏中，`UCharacterMovementComponent` 会在每次函数更新时直接调用 `PerformMovement` 。在网络游戏中，`PerformMovement` 由服务器和客户端的专用函数调用，可在玩家的本地机器上执行初始移动或在远程机器上重现该移动。

`PerformMovement` 负责处理以下内容：

-   施加外部物理效果，如冲量、力和重力。
-   根据动画根骨骼运动和 ***根骨骼运动源*** 计算移动。
-   调用 `StartNewPhysics` ，它根据角色使用的移动模式选择 `Phys*` 函数。

每种运动模式都有自己的 `Phys*` 函数，负责计算速度和加速度。例如，`PhysWalking` 决定了角色在地面上移动时的移动物理效果，而 `PhysFalling` 决定了角色在空中的行为方式。要想调试这些行为的细节，你可以查看每个函数的具体内容。

如果移动模式在函数更新期间发生变化，例如当角色开始下落或与对象碰撞时，`Phys*` 函数会再次调用 `StartNewPhysics`，继续让角色在新移动模式下运动。`StartNewPhysics` 和 `Phys*` 函数会各自传递已发生的 `StartNewPhysics` 的迭代次数。参数 `MaxSimulationIterations` 是此递归的最大允许次数。

## 移动复制摘要

`UCharacterMovementComponent` 将根据其所属者的 **网络角色** 来确定如何复制移动。三种网络角色如下：

网络角色

说明

**自主代理（Autonomous Proxy）**

角色位于其 *所属客户端的* 机器上，由玩家在本地控制。

**权限（Authority）**

该角色位于托管游戏的服务器上。

**模拟代理（Simulated Proxy）**

该角色位于可以看到远程控制角色的所有其他客户端上，无论它是由服务器上的AI控制，还是由其他客户端上的自主代理控制。

复制过程遵循 `TickComponent` 函数的周期，该周期在每次更新函数时重复。当角色执行移动时，网络游戏中所有不同机器上的角色副本会相互生成 ***远程程序调用（RPC）*** 以同步移动信息，不同的网络角色酌情使用不同的执行路径。

下表概述了在此过程中 `UCharacterMovementComponent` 在每台机器上的分步操作：

步骤

说明

自主代理（所属玩家的客户端）

 

**1**

所属客户端将在本地控制自主代理。`PerformMovement` 将运行移动组件的物理移动逻辑。

**2**

代理将构建 `FSavedMove_Character` ，其中包含角色刚刚的移动数据，然后将其排入 `SavedMoves` 队列。

**3**

类似的 `FSavedMove` 条目将组合在一起。自主代理将使用 ***ServerMove*** RPC 将其精简版数据发送到服务器。

授权Actor（服务器）

 

**4**

服务器将接收ServerMove并使用 `PerformMovement` 再现客户端的移动。

**5**

服务器将检查它在ServerMove之后的位置是否与客户端报告的结束位置一致。

**6**

如果服务器和客户端的最终位置一致，服务器会向客户端发回信号，表明移动有效。否则，它会使用 ***ClientAdjustPosition*** RPC发送校正。

**7**

服务器将复制 `ReplicatedMovement` 结构，从而将其位置、旋转和当前状态发送到其他已连接客户端上的模拟代理。

自主代理（所属玩家的客户端）

 

**8**

如果客户端收到ClientAdjustPosition，它会复制服务器的移动并使用 `SavedMoves` 队列重新追踪其进程，获取新的最终位置。成功处理动作后，客户端会从队列中移除已存动作。

模拟代理（所有其他客户端）

 

**9**

模拟的代理将直接应用复制的移动信息。***网络平滑*** 会为最终运动提供视觉效果清理。

此过程可同步网络游戏中三种机器类型间的移动。要让用户在控制特定角色时不怎么受到服务器的干扰，要让用户以为自己正在本地控制角色，要让用户在自己的机器上执行动作时，能够看到其他用户的角色在相差不多的时间内所执行的动作。

此过程的复杂性很大程度在于协调自主代理与服务器代理之间的预测和校正，从而确保玩家在控制自己角色方面拥有最流畅的体验。相比之下，模拟代理只需在服务器要求的位置保持最新状态。

## 角色重复移动的深入探讨

以下小节提供了上面简述流程的详细分步说明。虽然大多数项目不会覆盖 `UCharacterMovementComponent` 的行为，但这可以用作参考，以备你需要开发类似功能或需要找到修改位置时使用。

本小节重点介绍复制角色的正常移动模式。但是，若有其他Actor作为基础，则根骨骼运动和移动有替代执行路径，其步骤与本节中列出的步骤类似。

### 所属客户端上的本地运动

自主代理会通过 `TickComponent` 本地处理移动，进行相关记录，然后发送到服务器进行授权的复制和应用。本节将细说自主代理在每次函数更新时历经的过程。

#### 构建客户端预测数据

为了记录动作和处理来自服务器的校正，自主代理会构建名为 `ClientPredictionData` 的 `FNetworkPredictionData_Client_Character` 对象。参数包括：

-   客户端与服务器通信时的时间戳
-   已保存或待定动作列表
-   来自服务器校正的已保存信息
-   表示如何应用校正的标记
-   确定平滑行为的参数

`ClientPredictionData` 还包括与这些参数交互的辅助函数。你可以在[`FNetworkPredictionData_Client_Character` API参考](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/FNetworkPredictionData_Client_Ch-)中找到此对象信息和函数的完整列表。当客户端执行本地移动、准备动作以发送到服务器并处理校正时，其参数会被频繁引用和更改。

#### 复制服务器校正

在处理玩家的输入或世界中的力之前，自主代理会调用 `ClientUpdatePositionAfterServerUpdate` 。此操作会检查服务器是否已向所属玩家发送校正。如果已发送，则 `ClientPredictionData` 中的变量 `bUpdatePosition` 为true，并且角色会通过客户端校正过程再现从服务器发出的动作。有关服务器校正的更多信息，请参阅下面关于处理客户端误差和校正的小节。

#### 执行和记录移动

自主代理角色在 `TickComponent` 期间调用 `ReplicateMoveToServer` ，而不是直接调用 `PerformMovement` 。此函数将 `PerformMovement` 与必要逻辑关联，以在角色执行移动时记录，然后将动作提交给服务器。`FSavedMove_Character` 结构是关于自主代理在每次函数更新时如何开始和结束动作的记录，之后其数据的最小子集通过ServerMove RPC发送到服务器。参数包括：

-   角色的最终位置和旋转信息
-   捕获了什么移动输入
-   角色的速度和加速度如何
-   从 **AnimMontages** 捕获的根骨骼运动信息

你可以在[`FSavedMove_Character` API参考](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/FSavedMove_Character)中查看此结构参数的完整列表。服务器可通过此信息再现玩家执行的移动，然后针对客户端的最终位置进行检查。

处理 `PerformMovement` 后，`ReplicateMoveToServer` 函数会使用名为 `NewMove` 的 `FSavedMove_Character` 结构在客户端预测数据中记录角色移动的结果，然后将该结构添加到名为 `SavedMoves` 的缓冲区中。此缓冲区按从最早到最新的已存动作排序，并形成队列，直到可以将已存动作提交给服务器。在提交前将缓冲区中类似的动作整合到单一的 `FSavedMove_Character` ，可以缓解带宽压力。参数 `PendingMove` 充当存储空间，用于存放那些等着与即将发生的移动结合在一起的动作。

这些动作经过确认后（即经过 *ACK* 之后），将从缓冲区移除。服务器可以通过确认客户端位置有效来直接确认（ACK）动作，或者客户端可以在处理来自服务器的校正时确认（ACK）动作。要确认（ACK）的最后一个动作将保存在 `LastAckedMove` 中，用于处理未来的校正。

#### 将动作提交给服务器

`ReplicateMoveToServer` 最终会运行函数 `CallServerMove`，该函数会接收尚未被服务器确认的队列中最新的动作和最早的动作。这将为提交动作到服务器做好最后的准备工作，它会尝试首先提交旧动作（如果适用），然后调用相应的ServerMove函数来提交用于新动作的最终移动。最终的ServerMove作为 *不可靠* 服务器RPC直接提交给 `UCharacterMovementComponent` 的所属角色。

ServerMove函数不可靠的原因有两种：

1.  在正常的Gameplay期间，会频繁调用ServerMove函数，如果将它们指定为可靠函数，它们可能会溢出可靠函数的缓冲区，从而迫使所属玩家断开连接。
2.  用于缓冲已存动作的系统已经确保会重新提交并评估传输过程中丢失的移动信息。这样可为可靠函数提供类似的安全网，但没有溢出可靠RPC缓冲区的风险，并且增加了配置来丢弃过旧的移动数据。

### 评估服务器上的移动

服务器不会定期与游戏的函数更新周期同步对移动更新函数。而是会等待接收来自自主代理的ServerMove调用，`ServerMove_Implementation` 会处理服务器端的移动，重构客户端的移动并检查不符的情况。本节将详细说明ServerMove执行的过程。

本文档广泛提及了 `ServerMove` 和 `ServerMove_Implementation` ，但有多种类型的ServerMove调用，具体视排队的信息类型而定。

#### 构建服务器预测数据

角色移动组件的授权版本将创建名为 `ServerPredictionData` 的 `FNetworkPredictionData_Server_Character` 对象，该对象会在角色的生命周期内存在。在 `ServerMove_Implementation` 期间，此对象将存储供后续过程会用到的信息，以再现所属客户端移动。在服务器接收数据时，该对象在后台不断被修改，其参数包括：

-   用于计算服务器增量时间的时间戳
-   待定客户端调整
-   与处理时间差异相关的标记
-   用来表明服务器是确认还是校正移动的标记

你可以在[`FNetworkPredictionData_Server_Character` API参考指南](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/FNetworkPredictionData_Server_Ch-)中查看完整的参数和函数列表。

#### 验证客户端时间戳

使用ServerMove RPC发送的信息包括移动发生时的时间戳。如果服务器的时间戳和客户端的时间戳存在太大差异，客户端的时间戳会被视为过期，该动作将遭到丢弃。否则，将差异标记为待解决，`UCharacterMovementComponent` 将使用 `ProcessClientTimeStampForTimeDiscrepancy` 在下一步中为增量时间创建覆盖。

#### 计算增量时间

增量时间通常通过跟踪当前函数更新和前一个函数更新之间的间隔时间来获取，服务器上的角色不使用 `TickComponent` 计算移动。而是，`ServerMove_Implementation` 会调用 `GetServerMoveDeltaTime` 并在收到ServerMove时计算移动。如果服务器预测数据标记为尝试解决时间戳差异，它将使用 `TimeDiscrepancyResolutionMoveDeltaOverride` 。如果没有时间差异，它会使用服务器预测数据基于当前ServerMove RPC的时间戳和上一个ServerMove RPC时间戳之间的差异创建增量时间。为额外提供一层安全保障，其中大多数计算使用服务器的时间戳而非客户端的时间戳执行，防止客户端通过加快本地游戏时钟来篡改他们的速度。

#### 动作求值

然后，服务器会使用来自ServerMove RPC的数据重构所属玩家控制器的控制旋转，然后调用函数 `MoveAutonomous` 处理角色的加速、旋转和跳跃输入。

`MoveAutonomous` 将使用 `PerformMovement` 函数来模拟角色的移动物理效果，其中将用到此重构数据和前一步中提供的增量时间。服务器并非从客户端开始位置模拟移动，而是从当它获取ServerMove调用时自身角色副本所在位置进行模拟。

如果角色正在执行动画的根骨骼运动，MoveAutonomous也会使用提供的增量时间对角色的动画姿势更新函数。这将触发相应的动画事件。否则，动画正常更新函数。

### 处理客户端误差和校正

服务器移动基于以下假定运行：服务器和所属客户端两者在同一位置开始移动，如果服务器执行客户端报告的相同动作，则结束动作的位置也将相同。如果客户端的动作因为连接问题遭到丢弃，或者如果客户端提交了错误数据，则两者将在不同位置结束，此时将需要校正。函数 `ServerMoveHandleClientError` 负责这类操作。

#### 确定是否需要调整

频繁发布校正会占用带宽，并导致客户端过于频繁地重新模拟大量已存动作，所以我们首先要根据 `WithinUpdateDelayBounds` 返回的值进行检查，了解动作之间的间隔时间是否超过了最短限制。如果返回 `false` ，则不会发布校正。如果返回true，则允许运行其余进程。

然后，我们使用 `ServerCheckClientError` 了解服务器和客户端之间的误差是否大到需要校正。如果返回true，或者如果有事件将 `bForceClientUpdate` 设置为true强制校正，则 `ServerMoveHandleClientError` 会继续处理余下进程。

用于调整这两种操作的参数可在 `BaseGame.ini` 中找到，你可以在项目的 `DefaultGame.ini` 中提供项目专用覆盖。值 `ClientErrorUpdateRateLimit` 可确定服务器向客户端发送误差校正的最低延迟（以秒为单位）。值 `MAXPOSITIONERRORSQUARED` 是网络播放中接受的不校正情况下最大位置误差的平方。这两个值均可在配置文件的 `[/Script/Engine.GameNetworkManager]` 分段中找到。

如果需要调整，服务器预测数据会填充名为 `PendingAdjustment` 的 **[`FClientAdjustment`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/FClientAdjustment)** 结构，其中当前移动变量从服务器的角色副本中取样，包括位置、旋转、速度以及可能充当角色移动基础的所有对象。否则，我们将 `PendingAdjustment` 的 `bAckGoodMove` 值设为 `true` ，以将客户端的移动标记为有效。

#### 发送客户端调整或确认动作

用于向客户端确认移动的最终调用将用到 `SendClientAdjustment`。此函数不会作为 `ServerMove_Implementation` 的一部分出现。它其实是属于 `UNetDriver::ServerReplicateActors` 的一部分，后者在服务器上在更新函数结束时调用，同样负责调用其他客户端调整RPC。当调用 `SendClientAdjustment` 时，它的作用将取决于我们在前面步骤中构建的预测数据的标记方式。

如果服务器预测数据的 `PendingAdjustment` 将 `bAckGoodMove` 标记为 `true` ，它将调用 `ClientAckGoodMove` RPC确认动作，告知所属客户端机器上的自主代理动作有效。这将从所属客户端的 `SavedMoves` 缓冲区移除原始动作，将其记录为 `LastAckedMove` ，供构建未来预测数据时使用。

如果 `PendingAdjustment` 将 `bAckGoodMove` 标记为false，它将调用客户端调整函数，将最终校正发送到客户端。

#### 接收自主代理上的客户端调整

客户端调整RPC包括 `ClientAdjustPosition` 、 `ClientAdjustRotation` ，速度为零时出现的简短版本和专用于基于根骨骼运动移动的版本。服务器可能会调用其中多项内容作为 `SendClientAdjustment` 的一部分，具体取决于待校正内容的性质和严重程度。应用必要校正后，每个客户端调整RPC都能告知 `ClientPredictionData` 确认动作，并且每个都将 `bUpdatePosition` 标记为true。

然后，最终校正将在客户端的下一个 `TickComponent` 开始时使用 `ClientUpdatePosition` 应用。

### 将移动复制到模拟代理

在除所属者之外的客户端机器上，角色是模拟代理而非自主代理。将移动从服务器复制到模拟代理的过程已高度简化，因为模拟代理的唯一工作是响应服务器。模拟代理不会模拟移动物理效果，当它们从服务器收到移动更新时，它们会将其位置、旋转和速度设置为服务器指示的相应值，并通过一些额外的过程使移动更顺畅、更可信。

#### 存储复制的移动信息

Actor在复制移动时不会直接复制变换。所有Actor将维持名为 `ReplicatedMovement` 的复制变量，该变量使用结构[`FRepMovement`](/documentation/en-us/unreal-engine/API/Runtime/Engine/Engine/FRepMovement)。

布尔值 `bReplicateMovement` 由蓝图中的 **复制移动（Replicate Movement）** 变量表示，它会标记Actor，以将移动信息存储于此结构中，并将其复制到客户端。当客户端收到 `ReplicatedMovement` 更新时，**RepNotify** 函数 `OnRep_ReplicatedMovement` 会解压存储的移动数据，并对Actor的位置和速度执行相应更新。

`ReplicatedMovement` 或其OnRep均不可在蓝图中访问，但可以在C++中覆盖 `OnRep_ReplicatedMovement` ，`ReplicatedMovement` 的复制条件也可以在 `GetLifetimeReplicatedProps` 中覆盖。这样你可以自定义移动复制在基于C++的Actor类中的行为方式。

在 `ACharacter` 中，仅为模拟代理复制 `ReplicatedMovement` 结构。该结构在自主代理上会被忽视，自主代理使用服务器动作和客户端调整RPC处理移动。

如果角色将另一个Actor用作基类，则将改为使用 `ReplicatedBasedMovement` ，因为该结构将应用附加逻辑，以根据服务器正确部署客户端。如果角色使用根骨骼运动系统，所有这类进程会被忽略，转而使用 `RepRootMotion` 。

#### 模拟代理上移动的函数更新

当 `UCharacterMovementComponent` 在模拟代理上运行 `TickComponent` 时，它会调用 `SimulatedTick` 处理用来模拟移动的逻辑。此操作不执行上述复制移动。`SimulatedTick` 将继续根据最新提供的复制移动数据移动。执行标准移动物理效果时，`UCharacterMovementComponent` 将调用 `SimulateMovement` 函数，然后使用 `SmoothClientPosition` 执行最终验证和网络平滑。

#### 执行模拟移动

`SimulateMovement` 函数负责移动模拟代理角色。除了通过 `SimulatedTick` 调用外，它还通过 `OnRep_ReplicateMovement` 调用。此函数将执行以下过程：

1.  调用所属角色的 `GetReplicatedMovement` 函数，获取 `ReplicatedMovement` 引用。
2.  执行安全检查，确保复制移动数据有效且客户端的基础已解决。
3.  检查是否收到网络更新。
4.  应用通过 `GetReplicatedMovementMode` 获取的来自服务器的角色移动模式。
5.  重设关于网络更新的所有标记。
6.  基于当前 `MovementMode` 和角色当前状态信息执行模拟动作的逻辑。

相比标准动作物理效果，模拟移动的逻辑已高度简化，几乎全部包含在 `SimulateMovement` 函数本身中，而不是分解为更小的函数。然而，此函数仍负责更新本地移动状态，包括其应过渡到的移动模式，角色是否已着陆地面，以及速度为多少。此信息可确保角色能够正确更新其动画，并且移动看起来非常准确。

#### 网络平滑

如果我们通过简单地复制角色的位置和旋转来复制移动，那么角色看起来会是每隔几分钟传送一次。这是因为本地机器的渲染速度快于我们要通过网络发送数据的速度。例如，客户端可能正在以240 Hz的刷新率渲染到监视器，但复制运动可能仅以30 Hz发送。

网络平滑是平滑此动作的过程，即将角色从源位置逐渐插值到目标位置，而不是立即将其附于目标位置。源位置由角色的当前位置确定，而目标位置由客户端预测数据确定。插值本身通过 `SmoothClientPosition` 处理，后者使用[`NetworkSmoothingMode`](/documentation/en-us/unreal-engine/API/Runtime/Engine/Engine/ENetworkSmoothingMode)确定应该使用哪种插值。

## 特殊移动用例

以下小节提供了关于常见特殊移动用例的信息，包括你可能在特殊技能中看到的传送、自定义移动和编码驱动型移动。

### 在多人游戏中传送角色

通过调用 **SetLocation** 函数或 **Teleport** 蓝图节点，你可以在网络游戏中传送角色，前提是你：

1.  必须在服务器上调用它们。
2.  如果使用 `SetLocation` 函数，请将 `bTeleport` 变量设置为true，以便其将移动识别为传送。

![传送角色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6151fe9-c373-4956-9699-94526dda1dcf/charactermovement_teleport.png)

如果满足这些条件，移动会作为传送记录在服务器的预测数据和复制移动中，所有客户端通过将角色附于所需位置（而非应用平滑）进行相应响应。

### 使用自定义移动模式

移动模式 `MOVE_Custom` 将暂停所有其他移动物理效果，使你能够实现自定义移动逻辑，而不会受到 `UCharacterMovementComponent` 的正常进程所干扰。

`UCharacterMovementComponent` 通常不可进行蓝图处理，所以蓝图中的自定义移动通常使用 **UpdateCustomMovement** 事件直接在角色中实现。你可以使用 **自定义移动模式（Custom Movement Mode）** 字节变量来提供子模式，在这个过程中你可以使用整型切换或自定义枚举转换。

![蓝图中的自定义移动模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ea845df-be1f-4895-a6ec-dc3089755ff6/charactermovement_custommovementmodebp.png)

`UpdateCustomMovement` 通过 `UCharacterMovementComponent` 中的 `PhysCustom` 函数调用。`StartNewPhysics` 、 `PhysCustom` 函数和所有其他移动物理效果函数均为虚拟函数，所以如果你在C++中创建自定义 `UCharacterMovementComponent` ，你可以直接覆盖它们。

### 使用根骨骼运动复制特殊用例移动

你可能需要在短时间内直接控制角色的移动，例如在使用 **Gameplay技能系统（Gameplay Ability System）** 创建技能期间或在执行动画驱动型操作期间。虽然这在仅限本地的游戏中易于操作，不过复制特殊用例移动需要使用根骨骼运动，而这通常指应用来自动画的移动。根骨骼运动系统也经过调整，以支持代码驱动型特殊用例移动。

根骨骼运动始终优先于标准的移动物理效果，无论 `UCharacterMovementComponent` 使用什么移动模式。当你的根骨骼运动完成时，正常移动将恢复。

#### 来自AnimMontages

大多数根骨骼运动应用预计来自AnimMontage，后者用于代码触发的一次性动画。使用这种根骨骼运动会暂停角色正在执行的其他移动，直到动画结束。角色会消耗来自其骨架根骨骼的移动，并将其平移到世界空间移动，使动画能够控制角色的动作。操作完成后，角色的正常物理效果恢复使用。

如果你的角色处于下落移动模式，即使角色在执行根骨骼运动，重力也将施加于角色的Z移动。

在上述复制流程中，根骨骼运动信息通过 `FSavedMove_Character` 结构捕获，包括其源AnimMontage、角色在蒙太奇中的轨迹位置以及用于角色移动本身的参数。

服务器和所属客户端上的自主代理不会检查它们是否在播放同一个动画，因为这通常被视为美化功能。因此，你必须编写Gameplay逻辑，让AnimMontages在连接到游戏的所有机器上正确触发。然而，模拟代理具有和上述流程相同的并行流程，用于同步基于根骨骼运动的移动。

Gameplay技能系统插件会通过复制那个触发它们的技能来同步AnimMontages和根骨骼运动。

#### 来自根骨骼运动源

有时，对于特殊用例，你可能需要手动控制角色的位置。例如，你可能需要创造特殊技能：角色跳跃至空中的特定高度，然后落到正在移动的目标上。

在单机游戏中可以使用 `SetLocation` 和 `SetRotation` 手动控制角色，但在网络游戏中，此运动并非由上述复制流程捕获，因此服务器会将客户端的最终位置视为存在误差并发布校正。同时，来自AnimMontage的根骨骼运动遵循来自动画的仅限预计算运动。这意味着根骨骼运动无法正常从游戏世界获取实时信息，例如其他角色的位置，也无法使用Gameplay变量轻松调整它。

**根骨骼运动源** 为程序员提供了手动控制角色根骨骼运动的途径。你能够编写程序来控制角色的移动，同时利用上述系统在联网期间处理根骨骼运动。

根运动源应该应用于所属客户端上的自主代理。

要使用此系统，你必须创建新的FRootMotionSource结构。不同类型的移动有不同的FRootMotionSource变体。例如，FRootMotionSource\_MoveToForce用于从起始位置直接移动到目标位置，而FRootMotionSource\_JumpForce遵循类似跳跃的弧线。创建相应的根骨骼运动源后，你可以使用所需源位置、目标位置及界定其移动应如何表现的参数来初始化其属性。

函数 `UCharacterMovementComponent::ApplyRootMotionSource` 会将根骨骼运动源应用于角色，并返回句柄供后续引用。根骨骼运动源本身不处理移动。角色移动组件执行与提供的 `FRootMotionSource` 中的参数一致的移动，代替动画。这最终会添加到 `FSavedMove_Character` 结构中的 `SavedRootMotion` ，如果 `FRootMotionSource` 应用于自主代理，则在复制周期中捕获它。

移动完成后，你必须调用 `UCharacterMovementComponent::RemoveRootMotionSource` ，从而使用从 `ApplyRootMotionSource` 返回的句柄删除它。

Gameplay技能系统插件包含能利用根骨骼运动源的数个技能任务，使技能能够执行复制的程序化移动序列。你可以参阅 `AbilityTask_ApplyRootMotionMoveToForce` 了解基础示例。

## 自定义联网角色移动

虚幻引擎实现了对自定义函数参数的复制角色移动支持。若开发人员不需要此功能并且想要保留旧版API，可以在项目构建文件中将 `SUPPORT_DEPRECATED_CHARACTER_MOVEMENT_RPCS` 定义为非零值，并将控制台变量"p.NetUsePackedMovementRPCs"设置为零。

角色移动组件使用 `FSavedMove_Character` 结构体通过网络发送数据。系统将来自一次或多次更新的动作数据整合为单个长度可变的比特流，用于在网络上传输。将新旧数据打包在一起，可避免潜在排序问题，其中涉及在 `ServerMove` 之后调用 `ServerMoveOld` RPC，这可能会导致旧（但仍然重要的）数据被错误地视为废弃数据。在内部，角色移动组件不再使用旧的 `CallServerMove` 函数，而是使用新的 `CallServerMovePacked` 函数将多个 `FSavedMove_Character` 实例序列化为 `FCharacterNetworkMoveDataContainer` 。

### 扩展已存动作数据

要添加新数据，首先扩展 `FSavedMove_Character` 以包括你的角色移动组件需要的所有信息。然后，扩展 `FCharacterNetworkMoveData` ，并添加你要通过网络发送的自定义数据，在大多数情况下，此操作会对添加到 `FSavedMove_Character` 的数据做镜像处理。你还将需要扩展 `FCharacterNetworkMoveDataContainer` ，以便它能序列化 `FCharacterNetworkMoveData`，供网络传输之用，并在收到时对其进行反序列化。完成此设置后，进行如下系统配置：

-   将你的角色移动组件修改为使用你通过 `SetNetworkMoveDataContainer` 函数创建的 `FCharacterNetworkMoveDataContainer` 子类。要完成此操作，最简单方式是将你的 `FCharacterNetworkMoveDataContainer` 实例添加到你的角色移动组件子类，并从构造函数调用 `SetNetworkMoveDataContainer` 。

由于 `FCharacterNetworkMoveDataContainer` 需要自己的 `FCharacterNetworkMoveData` 实例，将其（通常位于构造函数中）指向你的 `FCharacterNetworkMoveData` 子类的实例。参阅基础构造函数，了解更多细节和示例。

-   在你的扩展版 `FCharacterNetworkMoveData` 中，覆盖 `ClientFillNetworkMoveData` 函数以从已存动作中复制或计算数据。覆盖 `序列化` 函数，使用 `Farchive` 读写数据，这是RPC所需的比特流。

若要扩展服务器对客户端的响应，使其可以确认合适的移动或发送校正数据，请扩展 `FCharacterMoveResponseData` 、 `FCharacterMoveResponseDataContainer` ，并覆盖角色移动组件的 `SetMoveResponseDataContainer` 版本。

### 访问扩展移动数据

为了保持向后兼容性，没有更改用于处理服务器上客户端动作并在收到校正后在客户端上重放动作的函数堆栈。虽然这样可为旧版函数提供稳定的API，但也意味着这些函数签名不适合新的移动数据。通过调用 `GetCurrentMoveData` ，并将返回的 `FCharacterNetworkMoveData` 转换到子类，你可以在处理动作时在服务器上访问这些数据，或在重放动作时，在客户端上访问这些数据。

-   [gameplay](https://dev.epicgames.com/community/search?query=gameplay)
-   [multiplayer](https://dev.epicgames.com/community/search?query=multiplayer)
-   [network](https://dev.epicgames.com/community/search?query=network)
-   [making interactive experiences](https://dev.epicgames.com/community/search?query=making%20interactive%20experiences)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [角色移动基础知识](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E8%A7%92%E8%89%B2%E7%A7%BB%E5%8A%A8%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86)
-   [PerformMovement和移动物理效果](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#performmovement%E5%92%8C%E7%A7%BB%E5%8A%A8%E7%89%A9%E7%90%86%E6%95%88%E6%9E%9C)
-   [移动复制摘要](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E7%A7%BB%E5%8A%A8%E5%A4%8D%E5%88%B6%E6%91%98%E8%A6%81)
-   [角色重复移动的深入探讨](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E8%A7%92%E8%89%B2%E9%87%8D%E5%A4%8D%E7%A7%BB%E5%8A%A8%E7%9A%84%E6%B7%B1%E5%85%A5%E6%8E%A2%E8%AE%A8)
-   [所属客户端上的本地运动](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E6%89%80%E5%B1%9E%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%B8%8A%E7%9A%84%E6%9C%AC%E5%9C%B0%E8%BF%90%E5%8A%A8)
-   [构建客户端预测数据](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E6%9E%84%E5%BB%BA%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%A2%84%E6%B5%8B%E6%95%B0%E6%8D%AE)
-   [复制服务器校正](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E5%A4%8D%E5%88%B6%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%A0%A1%E6%AD%A3)
-   [执行和记录移动](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E6%89%A7%E8%A1%8C%E5%92%8C%E8%AE%B0%E5%BD%95%E7%A7%BB%E5%8A%A8)
-   [将动作提交给服务器](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E5%B0%86%E5%8A%A8%E4%BD%9C%E6%8F%90%E4%BA%A4%E7%BB%99%E6%9C%8D%E5%8A%A1%E5%99%A8)
-   [评估服务器上的移动](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E8%AF%84%E4%BC%B0%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%9A%84%E7%A7%BB%E5%8A%A8)
-   [构建服务器预测数据](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E6%9E%84%E5%BB%BA%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%A2%84%E6%B5%8B%E6%95%B0%E6%8D%AE)
-   [验证客户端时间戳](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E9%AA%8C%E8%AF%81%E5%AE%A2%E6%88%B7%E7%AB%AF%E6%97%B6%E9%97%B4%E6%88%B3)
-   [计算增量时间](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E8%AE%A1%E7%AE%97%E5%A2%9E%E9%87%8F%E6%97%B6%E9%97%B4)
-   [动作求值](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E5%8A%A8%E4%BD%9C%E6%B1%82%E5%80%BC)
-   [处理客户端误差和校正](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E5%A4%84%E7%90%86%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%AF%AF%E5%B7%AE%E5%92%8C%E6%A0%A1%E6%AD%A3)
-   [确定是否需要调整](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E7%A1%AE%E5%AE%9A%E6%98%AF%E5%90%A6%E9%9C%80%E8%A6%81%E8%B0%83%E6%95%B4)
-   [发送客户端调整或确认动作](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E5%8F%91%E9%80%81%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%B0%83%E6%95%B4%E6%88%96%E7%A1%AE%E8%AE%A4%E5%8A%A8%E4%BD%9C)
-   [接收自主代理上的客户端调整](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E6%8E%A5%E6%94%B6%E8%87%AA%E4%B8%BB%E4%BB%A3%E7%90%86%E4%B8%8A%E7%9A%84%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%B0%83%E6%95%B4)
-   [将移动复制到模拟代理](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E5%B0%86%E7%A7%BB%E5%8A%A8%E5%A4%8D%E5%88%B6%E5%88%B0%E6%A8%A1%E6%8B%9F%E4%BB%A3%E7%90%86)
-   [存储复制的移动信息](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E5%AD%98%E5%82%A8%E5%A4%8D%E5%88%B6%E7%9A%84%E7%A7%BB%E5%8A%A8%E4%BF%A1%E6%81%AF)
-   [模拟代理上移动的函数更新](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E6%A8%A1%E6%8B%9F%E4%BB%A3%E7%90%86%E4%B8%8A%E7%A7%BB%E5%8A%A8%E7%9A%84%E5%87%BD%E6%95%B0%E6%9B%B4%E6%96%B0)
-   [执行模拟移动](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E6%89%A7%E8%A1%8C%E6%A8%A1%E6%8B%9F%E7%A7%BB%E5%8A%A8)
-   [网络平滑](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E7%BD%91%E7%BB%9C%E5%B9%B3%E6%BB%91)
-   [特殊移动用例](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E7%89%B9%E6%AE%8A%E7%A7%BB%E5%8A%A8%E7%94%A8%E4%BE%8B)
-   [在多人游戏中传送角色](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E5%9C%A8%E5%A4%9A%E4%BA%BA%E6%B8%B8%E6%88%8F%E4%B8%AD%E4%BC%A0%E9%80%81%E8%A7%92%E8%89%B2)
-   [使用自定义移动模式](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E4%BD%BF%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E7%A7%BB%E5%8A%A8%E6%A8%A1%E5%BC%8F)
-   [使用根骨骼运动复制特殊用例移动](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E4%BD%BF%E7%94%A8%E6%A0%B9%E9%AA%A8%E9%AA%BC%E8%BF%90%E5%8A%A8%E5%A4%8D%E5%88%B6%E7%89%B9%E6%AE%8A%E7%94%A8%E4%BE%8B%E7%A7%BB%E5%8A%A8)
-   [来自AnimMontages](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E6%9D%A5%E8%87%AAanimmontages)
-   [来自根骨骼运动源](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E6%9D%A5%E8%87%AA%E6%A0%B9%E9%AA%A8%E9%AA%BC%E8%BF%90%E5%8A%A8%E6%BA%90)
-   [自定义联网角色移动](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%81%94%E7%BD%91%E8%A7%92%E8%89%B2%E7%A7%BB%E5%8A%A8)
-   [扩展已存动作数据](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E6%89%A9%E5%B1%95%E5%B7%B2%E5%AD%98%E5%8A%A8%E4%BD%9C%E6%95%B0%E6%8D%AE)
-   [访问扩展移动数据](/documentation/zh-cn/unreal-engine/understanding-networked-movement-in-the-character-movement-component-for-unreal-engine#%E8%AE%BF%E9%97%AE%E6%89%A9%E5%B1%95%E7%A7%BB%E5%8A%A8%E6%95%B0%E6%8D%AE)
# 使用虚幻引擎中的Gameplay Abilities | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-gameplay-abilities-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:45:02.720Z

---

目录

![Gameplay Ability](https://dev.epicgames.com/community/api/documentation/image/f4c149ce-b767-44d2-b4bb-91c2795ab560?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7713a1bf-7712-4b96-a0f0-fcda4938c4c8/gameplayabilitytopicimage_01.png "GameplayAbilityTopicImage_01.png")

**Gameplay Ability** 源自 `UGameplayAbility` 类，定义了游戏中技能的效果、使用技能付出的代价（如有），以及何时或在何情况下可以使用等。玩法技能可以作为异步运行的实例化对象存在，因此你可以运行专门的多阶段任务，包括角色动画、粒子和声效，乃至根据执行时的用户输入或角色交互设计分支。玩法技能可以在整个网络中自我复制，运行在客户端或服务器计算机上（包括客户端预测支持），甚至还能同步变量和执行远程过程调用（RPC）。玩法技能还使引擎可在游戏会话期间灵活实现游戏技能，例如提供的扩展功能可用于实现冷却和使用消耗、玩家输入、使用动画蒙太奇的动画，以及对给予Actor的技能本身做出反应。

## 授予和撤销技能

在Actor可以使用某项技能之前，必须向其技能系统组件授予该技能。技能系统组件的以下函数可以授予对某项技能的访问：

-   `GiveAbility`：使用 `FGameplayAbilitySpec` 指定要添加的技能，并返回 `FGameplayAbilitySpecHandle`。只有服务器才能赋予或撤销技能。
    
-   `GiveAbilityAndActivateOnce`：使用 `FGameplayAbilitySpec` 指定要添加的技能，并返回 `FGameplayAbilitySpecHandle`。因为只有服务器才能赋予技能，技能必须实例化，并且必须能够在服务器上运行。尝试运行技能后，将返回 `FGameplayAbilitySpecHandle`。如果技能没有满足所需条件，或者无法执行，返回值将无效，并且技能系统组件将不会被授予该技能。
    

和赋予技能类似，只有服务器才能移除技能。以下函数可以利用授予技能后返回的 `FGameplayAbilitySpecHandle`，来撤销对技能系统组件中该技能的访问。

-   `ClearAbility`: 从技能系统组件中移除指定技能。
    
-   `SetRemoveAbilityOnEnd`：当该技能执行完毕时，将该技能从技能系统组件中移除。如果未执行该技能，将立即移除它。如果正在执行该技能，将立即清除其输入，这样玩家就无法重新激活它或与它互动。
    
-   `ClearAllAbilities`：从技能系统组件中移除所有技能。此函数是唯一不需要 `FGameplayAbilitySpecHandle` 的函数。
    

## 基本用法

将玩法技能授予Actor的技能系统组件后，玩法技能的基本执行生命周期如下：

1.  即使调用者没有尝试执行某项技能，`CanActivateAbility`也可以让调用者知道是否可执行该技能。例如，您可以在户界面上将玩家无法使用的图标变成灰色并停用这些图标，或者对角色播放声音或粒子效果来显示某项技能是否可用。
    
2.  `CallActivateAbility`执行技能相关的游戏代码，但不会检查该技能是否可用。通常在 `CanActivateAbility`检查及执行技能之间需要某些逻辑时才会调用该函数。
    -   用户需要使用技能的定制功能覆盖的主代码要么是名为`ActivateAbility`的C++函数，要么是名为Activate Ability的蓝图事件。
        
    -   与Actor和组件不同，玩法技能不会使用"tick"函数完成主要工作，而是在激活过程中启动技能任务，异步完成大部分工作，然后连接代理（在C++中）以处理这些任务的输出，或者连接节点以输出执行引脚（在蓝图中）。
        
    -   如果从"激活"中调用`CommitAbility`函数，它将应用执行技能的消耗，例如从玩法属性中减去资源（例如"魔法值"、"体力值"或游戏系统所用的任何其他资源）和应用冷却。
        
    -   `CancelAbility`提供了取消技能的机制，不过技能的`CanBeCanceled`函数可以拒绝请求。与`CommitAbility`不同，该函数可供技能外调用者使用。成功的取消先播放给On Gameplay Ability Cancelled，然后通过标准代码路径结束技能，让技能可运行特殊的清理代码，否则取消时的行为将与自行结束时的行为不同。
        
3.  `TryActivateAbility` 是执行技能的典型方式。该函数调用 `CanActivateAbility` 来确定技能是否可以立即运行，如果可以，则继续调用 `CallActivateAbility`。
    
4.  `EndAbility` （C++）或End Ability节点（蓝图）会在技能执行完毕后将其关闭。如果技能被取消，`UGameplayAbility` 类会将其作为取消流程的一部分自动处理，但其他情况下，开发者都必须调用C++函数或在技能的蓝图图表中添加节点。如果未能正常结束技能，将导致玩法技能系统认为技能仍在运行，从而带来一些影响，例如禁止将来再使用该技能或任何被该技能阻止的技能。例如，如果游戏的"喝生命药剂"玩法技能没有正常结束，那么使用该技能的角色就无法执行任何在喝血量药剂时无法执行的操作（例如喝其他药剂、快跑、爬梯子等）。这种阻碍会一直存在，因为玩法技能系统会认为角色还在喝药剂。

要了解如何在虚幻引擎项目中设置玩法技能，请阅读[动作角色扮演游戏中的Gameplay Abilities](/documentation/zh-cn/unreal-engine/samples-and-tutorials-for-unreal-engine)文档。

## 标记

**Gameplay标记** 有助于确定玩法技能之间的交互方式。每种技能都拥有一组标记，以可影响其行为的方式识别和分类技能，还有玩法标记容器和游戏标记查询，用于支持与其他技能进行交互。

玩法标记变量

目的

Cancel Abilities With Tag

如果任何已在执行的技能带有与执行此技能时提供的列表匹配的标记，则取消那些技能。

Block Abilities With Tag

在执行此技能时，阻止执行具有匹配标记的任何其他技能。

Activation Owned Tags

在执行此技能时，技能的所有者将被给予这组标记。

Activation Required Tags

只有激活的Actor或组件具有所有这些标记时，技能才会被激活。

Activation Blocked Tags

只有激活的Actor或组件没有任何这些标记时，技能才会被激活

Target Required Tags

只有目标Actor或组件具有所有这些标记时，技能才会被激活。

Target Blocked Tags

只有目标Actor或组件没有任何这些标记时，技能才会被激活。

## 复制

Gameplay Abilities支持复制内蕴状态和[玩法事件](/documentation/zh-cn/unreal-engine/using-gameplay-abilities-in-unreal-engine#%E8%A7%A6%E5%8F%91%E7%8E%A9%E6%B3%95%E4%BA%8B%E4%BB%B6)，或关闭复制以节省网络带宽和缩短CPU周期。技能的 **Gameplay Abilities复制策略（Gameplay Ability Replication Policy）** 可以设置为"是"或"否"，这控制着技能是否复制自身实例、更新状态或跨网络发送玩法事件。这与复制技能的激活或终止不同，其发生可无视该设置。

对于复制技能的多人游戏，你可以选择复制的处理方式，这些选项被称为 **玩法网络执行策略（Gameplay Net Execution Policy）**：

1.  **本地预测：（Local Predicted:）**此选项有助于在响应能力和准确性之间实现良好的平衡。在本地客户端发出命令后，技能将立即在客户端上运行，但服务器起着决定性作用，并且可以根据技能的实际影响来覆盖客户端。客户端实际上是从服务器请求执行"技能"的权限，但也在本地进行处理，就像服务器需要同意客户端对结果的看法一样。因为客户端在本地预测技能的行为，所以只要客户端的预测与服务器不矛盾，它就会非常顺利地运行且无滞后。
    
2.  **仅限本地：（Local Only:）**客户端仅在本地运行技能。如果使用服务器的客户端是主机（在物理服务器计算机上播放）或者是在单人游戏中，尽管技能将在服务器上运行，也不会对服务器应用复制。这种情况不适用于专用服务器游戏，因为在专用服务器游戏中客户端永远不会在服务器计算机上运行。客户端通过该技能带来的任何影响都将继续遵循常规复制协议，包括可能从服务器接收更正。
    
3.  **服务器启动：（Server Initiated:）**在服务器上启动的技能将传播到客户端。从客户端的角度来看，这可以更准确地复制服务器上实际发生的情况，但使用技能的客户端会因缺少本地预测而发生延迟。虽然这种延迟非常短，但某些类型的技能（特别是在压力情况下快速执行的操作）将不会像在本地预测模式中那样顺畅。
    
4.  **仅限服务器：（Server Only:）**"仅限服务器"技能将在服务器上运行，不会复制到客户端。Gameplay Ability之外的数据都将正常复制。以这种方式，技能仍然可以影响客户端的观察，尽管技能本身只在服务器上运行。
    

## 实例化策略

在执行玩法技能时，通常会产生一个（技能类型的）新对象，用于跟踪正在进行的技能。由于在某些情况下可能会非常频繁地执行技能，例如在大逃杀、MOBA、MMO或RTS游戏中一百个或更多玩家与AI角色之间的战斗，可能会出现快速创建技能对象对性能产生负面影响的情况。为了解决这个问题，技能可以选择三种不同的实例化策略，以在效率和功能之间达到平衡。支持的三种实例化类型：

-   **按执行实例化：（Instanced per Execution:）**每次技能运行时，都会产生技能对象的副本。这样做的优点是可以自由使用蓝图图表和成员变量，并且所有内容都将在执行开始时初始化为默认值。这是最简单的实例化策略，但由于开销较大，该策略更适合不会频繁运行的技能。例如，MOBA中的"终极技能"可以使用该策略，因为两次执行之间存在较长的冷却时间（通常为60-90秒），并且只有少数几个角色（通常约为10个）使用这些技能。由计算机控制的"小兵"使用的基本攻击技能就不能使用该策略，因为可能同时存在数百个"小兵"，每个都可以频繁地发出基本攻击，从而导致快速创建（或者复制）新对象。
    
-   **按Actor实例化：（Instanced per Actor:）**在技能首次执行时，每个Actor会生成该技能的一个实例，该对象会在以后的执行中重复使用。这就要求在两次技能执行之间清理成员变量，同时也使保存多个执行的信息成为可能。按Actor是较为理想的复制方法，因为技能具有可处理变量和RPC的复制对象，而不是浪费网络带宽和CPU时间，在每次运行时产生新对象。该策略适用于大规模的情况，因为大量使用技能的Actor（例如在大型战斗中）只会在第一次使用技能时产生对象。
    
-   **非实例化：（Non-Instanced:）**这是所有类别中最高效的实例化策略。在运行时，技能不会生成任何对象，而是使用[类默认对象](/documentation/zh-cn/unreal-engine/objects-in-unreal-engine)。但是，在高效的同时也伴随着一些限制。首先，该策略特别要求技能完全用C ++编写，因为创建蓝图图表需要对象实例。你可以创建非实例化技能的蓝图类，但这只能更改已公开属性的默认值。此外，在执行技能期间，即使在本机C ++代码中，技能也不能更改成员变量，不能绑定代理，也不能复制变量或处理RPC。该策略仅适用于不需要内部变量存储（尽管可以针对技能用户设置属性）并且不需要复制任何数据的技能。它尤其适合频繁运行且被许多角色使用的技能，例如大型RTS或MOBA作品中部队使用的基本攻击。
    

更改实例化策略（Instancing Policy）会改变Gameplay Ability的行为方式。例如，对OnAvatarSet、OnGiveAbility、ShouldAbilityRespondToEvent、OnRemoveAbility和and CanActivateAbility调用可以在不激活技能的情况下发生。如果使用"按Actor实例化（InstancedPerActor）"，这些调用会发生在实例化的技能上（因为我们会在赋予技能时立即将其实例化）。但是，非实例化和按Actor实例化会在其类默认对象（Class Default Object）上收到这些调用，因为它们在调用执行时不具有实例。

## 触发玩法事件

**玩法事件（Gameplay Events）** 是可以传递的数据结构，能够直接触发玩法技能，无需通过正常通道，即可根据情境发送数据有效负载。常用的方法是调用Send Gameplay Event To Actor并提供实施`IAbilitySystemInterface`接口的Actor和玩法事件所需的情境信息，但也可以直接在技能系统组件上调用Handle Gameplay Event。因为这不是调用玩法技能的正常方式，所以技能可能需要的情境信息将通过`FGameplayEventData`数据结构传递。该结构是一种通用结构，不会针对任何特定的玩法事件或技能进行扩展，但应该能够满足任何用例的要求。多态`ContextHandle`字段会根据需要提供其他信息。

当游戏事件触发玩法技能时，玩法技能不会通过激活技能代码路径运行，而是使用提供附加情境数据作为参数的"从事件激活技能"（Activate Ability From Event）。如果希望技能响应游戏事件，请务必处理此代码路径，

-   [gameplay ability system](https://dev.epicgames.com/community/search?query=gameplay%20ability%20system)
-   [abilities](https://dev.epicgames.com/community/search?query=abilities)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [授予和撤销技能](/documentation/zh-cn/unreal-engine/using-gameplay-abilities-in-unreal-engine#%E6%8E%88%E4%BA%88%E5%92%8C%E6%92%A4%E9%94%80%E6%8A%80%E8%83%BD)
-   [基本用法](/documentation/zh-cn/unreal-engine/using-gameplay-abilities-in-unreal-engine#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95)
-   [标记](/documentation/zh-cn/unreal-engine/using-gameplay-abilities-in-unreal-engine#%E6%A0%87%E8%AE%B0)
-   [复制](/documentation/zh-cn/unreal-engine/using-gameplay-abilities-in-unreal-engine#%E5%A4%8D%E5%88%B6)
-   [实例化策略](/documentation/zh-cn/unreal-engine/using-gameplay-abilities-in-unreal-engine#%E5%AE%9E%E4%BE%8B%E5%8C%96%E7%AD%96%E7%95%A5)
-   [触发玩法事件](/documentation/zh-cn/unreal-engine/using-gameplay-abilities-in-unreal-engine#%E8%A7%A6%E5%8F%91%E7%8E%A9%E6%B3%95%E4%BA%8B%E4%BB%B6)
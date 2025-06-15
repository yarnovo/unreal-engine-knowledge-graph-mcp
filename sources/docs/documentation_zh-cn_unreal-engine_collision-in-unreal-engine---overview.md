# 虚幻引擎中的碰撞概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/collision-in-unreal-engine---overview
> 
> 生成时间: 2025-06-14T19:49:22.014Z

---

目录

![碰撞概述](https://dev.epicgames.com/community/api/documentation/image/cf438e24-e4c2-48b1-a678-b4dc34638c05?resizing_type=fill&width=1920&height=335)

**碰撞响应** 和 **追踪响应** 构成了虚幻引擎4在运行时处理碰撞和光线投射的基础。能够碰撞的每个对象都有 **对象类型** 和一系列响应，用来定义它与所有其他对象类型交互的方式。当碰撞或重叠事件发生时，涉及的两个（或全部）对象都会发出或受到阻挡、重叠或忽略的作用。

**追踪响应** 的原理基本相同，唯一的区别是追踪（光线投射）本身可以定义为一种追踪响应类型，因此Actor可以根据\_其\_追踪响应阻挡或忽略。

## 交互

关于碰撞的处理方式，需要记住几点规则：

-   **阻挡** 会设置为阻挡的两个（或更多）Actor之间自然发生。但是，需要启用 **模拟生成命中事件（Simulation Generates Hit Events）** 才能执行 **事件命中**，该功能在蓝图、可破坏物Actor、触发器等处使用。
-   将Actor设置为 **重叠** 往往看起来它们彼此 **忽略**，如果没有 **生成重叠事件（Generate Overlap Events）**，则二者基本相同。
-   对于彼此阻挡的两个或更多模拟对象，它们都需要设置为阻挡相应的对象类型。
-   对于两个或更多模拟对象：如果一个设置为重叠对象，另一个设置为阻挡对象，则发生重叠，而不会发生阻挡。
-   即使一个对象会 **阻挡** 另一个对象，也 **可以** 生成重叠事件，尤其是高速运行的对象。
    -   不建议一个对象同时拥有碰撞和重叠事件。虽然可以，但需要手动处理的部分太多。
-   如果一个对象设置为忽略，另一个设置为重叠，则不会触发重叠事件。

对于测试关卡和检视场景目的：

-   默认的 **在编辑器中运行** 摄像机是一个Pawn。因此可以被设置为阻挡Pawn的任何对象阻挡。
-   **在编辑器中模拟** 摄像机在处理任何事务之前**不是**Pawn。它可以自由穿过任何对象，不会造成任何碰撞或重叠事件。

## 常见碰撞交互示例

这些交互假设所有对象的 **启用碰撞** 设置为 **启用碰撞**，这样它们就设置为与任何对象发生完全碰撞。如果禁用碰撞，就像所有 **碰撞响应** 都设置为 **忽略** 一样。

在下一节中，将通过这种设置来解释实际发生的情况：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45256e3e-cbda-45a1-bae0-a17626ed9e3f/col_setup.png)

该球体是 **物理形体（PhysicsBody）**，箱体是 **场景动态（WorldDynamic）**，通过更改它们的碰撞设置，我们可以得出多种行为。

### 碰撞

通过将二者的碰撞设置设定为互相阻挡，可以得到碰撞，非常有利于产生对象彼此交互的效果。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50dd67b0-de64-42a3-b0d3-942222f6f570/col_collidenoevent.png)

球体碰撞设置

墙壁碰撞设置

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ace0d79-027c-49b9-8d2e-8e556a75ca7b/col_collidenoevent_sphere.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a735459-aba9-4c08-aa25-e5314f1c8947/col_collidenoevent_box.png)

在本例中，球体是 **物理形体（PhysicsBody）**，它设置为`阻挡（block）`**场景动态（WorldDynamic）**（这是墙壁的类型）。

墙壁是 **场景动态（WorldDynamic）**，它设置为`阻挡（block）`**物理形体（PhysicsBody）**Actor（这是球体的类型）。

在本例中，球体和墙壁只是发生碰撞，不会有进一步的碰撞通知。

### 碰撞和模拟生成命中事件

只是碰撞有一定用处，总的来说，就是物理交互的最基础作用，但如果你希望 **报告** 发生了碰撞，以便触发蓝图或一段代码：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ddc40f1-6553-46c3-9656-070a5fe3c85f/col_collideevent.png)

球体碰撞设置

墙壁碰撞设置

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bfe8cfc-f282-4af2-bd88-b53c0f3e7a68/col_collideevent_sphere.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e8b912b-7115-4067-8941-7a4c0cbbbabd/col_collidenoevent_box.png)

在以上示例中，球体是 **物理形体（PhysicsBody）**，它设置为`阻挡（block）`**场景动态（WorldDynamic）**（这是墙壁的类型）。但是，球体也启用了 **模拟生成命中事件（Simulation Generates Hit Events）**，这样每当它发生碰撞时就会针对自己触发事件。

墙壁是 **场景动态（WorldDynamic）**，它设置为`阻挡（block）`**物理形体（PhysicsBody）**Actor（这是球体的类型）。由于墙壁没有设置为 **模拟生成命中事件（Simulation Generates Hit Events）**，因此不会针对自己生成事件。

通过将球体设置为 **模拟生成命中事件（Simulation Generates Hit Events）**，球体就会告诉自己发生了碰撞。它会触发球体蓝图中的事件，例如 **ReceiveHit** 或 **OnComponentHit**。现在，如果箱体发生了碰撞事件，则不会触发，因为它永远不会通知自己发生了碰撞。

此外，报告刚性碰撞的对象将汇报所有报告，包括它们坐在某个对象上时的垃圾报告，所以最好在蓝图或代码中仔细过滤碰撞的对象。

### 重叠和忽略

如果禁用了 **生成重叠事件（Generate Overlap Events）**，则不管目的为何，**重叠** 和 **忽略** 的效果完全相同。在此情况下，球体设置为重叠或忽略箱体：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aedf93d3-8a73-48bc-b02f-5a2878dd5d34/col_ignore.png)

球体碰撞设置

墙壁碰撞设置

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57a4eb19-4e67-4e27-83cd-d09da412623c/col_overlapnoevent_sphere.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0001afd-c916-47bc-8525-9b1b3dd21068/col_collidenoevent_box.png)

这里的球体设置为`重叠（overlap）`**场景动态（WorldDynamic）**Actor（比如墙壁），但没有启用 **生成重叠事件（Generate Overlap Events）**。就球体而言，它没有与任何对象碰撞或重叠，它实际上是忽略墙壁。

墙壁是 **场景动态（WorldDynamic）**，它设置为`阻挡（block）`**物理形体（PhysicsBody）**Actor（这是球体的类型）。如上所述，两个Actor都需要设置为阻挡彼此相应的对象类型。如果不这样设置，就不会发生碰撞。

或者：

球体碰撞设置

墙壁碰撞设置

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ec3a398-ce07-4638-a388-4378462bd87a/col_ignore_sphere.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cbeb3bac-e40f-4856-93b5-95157471a222/col_collidenoevent_box.png)

这里的球体设置为`忽略（ignore）`**场景动态（WorldDynamic）**Actor（比如墙壁），并穿过墙壁。

墙壁是 **场景动态（WorldDynamic）**，它设置为`阻挡（block）`**物理形体（PhysicsBody）**Actor（这是球体的类型）。如上所述，两个Actor都需要设置为阻挡彼此相应的对象类型。如果不这样设置，就不会发生碰撞。

### 重叠和生成重叠事件

与可以随时触发的碰撞不同，重叠事件是 **ReceiveBeginOverlap** 和 **ReceiveEndOverlap**，仅在特定情况下触发。

为了使重叠发生，两个Actor都需要启用 **生成重叠事件（Generate Overlap Events）**。这是为效果考虑。如果球体和箱体都希望在我们移动球体或箱体时发生重叠，则执行重叠查询以确认是否需要触发任何事件。

如果箱体不希望在移动时发生重叠，则不执行重叠查询。但现在，可以与球体重叠，因此球体需要tick事件，并逐帧检查是否有重叠以防有对象与它们相撞。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0984c7dc-57ae-4bb8-b8be-ce290ef15320/col_overlapevent.png)

球体碰撞设置

墙壁碰撞设置

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/704ec623-3597-44d3-84b4-041b6ed9c3a7/col_overlapevent_sphere.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ebaa8e43-bd1d-4753-a24b-247159ccb229/col_collideoverlapevent_box.png)

这里的球体设置为`重叠（overlap）`**场景动态（WorldDynamic）**Actor（比如墙壁），它会在发生重叠时针对自己生成事件。

墙壁是 **场景动态（WorldDynamic）**，它设置为`阻挡（block）`**物理形体（PhysicsBody）**Actor（这是球体的类型）。如上所述，两个Actor都需要设置为阻挡彼此相应的对象类型。如果不这样设置，就不会发生碰撞。但是，这里会发生 **重叠**，并触发球体和箱体的事件。

-   [collision](https://dev.epicgames.com/community/search?query=collision)
-   [physics](https://dev.epicgames.com/community/search?query=physics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [交互](/documentation/zh-cn/unreal-engine/collision-in-unreal-engine---overview#%E4%BA%A4%E4%BA%92)
-   [常见碰撞交互示例](/documentation/zh-cn/unreal-engine/collision-in-unreal-engine---overview#%E5%B8%B8%E8%A7%81%E7%A2%B0%E6%92%9E%E4%BA%A4%E4%BA%92%E7%A4%BA%E4%BE%8B)
-   [碰撞](/documentation/zh-cn/unreal-engine/collision-in-unreal-engine---overview#%E7%A2%B0%E6%92%9E)
-   [碰撞和模拟生成命中事件](/documentation/zh-cn/unreal-engine/collision-in-unreal-engine---overview#%E7%A2%B0%E6%92%9E%E5%92%8C%E6%A8%A1%E6%8B%9F%E7%94%9F%E6%88%90%E5%91%BD%E4%B8%AD%E4%BA%8B%E4%BB%B6)
-   [重叠和忽略](/documentation/zh-cn/unreal-engine/collision-in-unreal-engine---overview#%E9%87%8D%E5%8F%A0%E5%92%8C%E5%BF%BD%E7%95%A5)
-   [重叠和生成重叠事件](/documentation/zh-cn/unreal-engine/collision-in-unreal-engine---overview#%E9%87%8D%E5%8F%A0%E5%92%8C%E7%94%9F%E6%88%90%E9%87%8D%E5%8F%A0%E4%BA%8B%E4%BB%B6)
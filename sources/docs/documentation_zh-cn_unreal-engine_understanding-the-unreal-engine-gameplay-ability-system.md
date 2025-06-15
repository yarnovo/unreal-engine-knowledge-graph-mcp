# 理解虚幻引擎中的Gameplay技能系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system
> 
> 生成时间: 2025-06-14T19:45:18.935Z

---

目录

![Gameplay技能系统概述](https://dev.epicgames.com/community/api/documentation/image/255878a4-0a72-4529-86d1-7b4bff1038cd?resizing_type=fill&width=1920&height=335)

**Gameplay技能系统（Gameplay Ability System）** 是构建Actor可以拥有和触发的技能和交互的一种框架。该系统主要针对角色扮演游戏（RPG）、动作冒险游戏、多人联机在线竞技游戏（MOBA），以及其他一些类型的游戏，其中角色的技能需要协调机制、视觉效果、动画、声音和数据驱动的元素，不过该系统可以适应范围广泛的各类项目。Gameplay技能系统还对多人游戏支持复制，让开发人员在扩展设计来支持多人游戏时节省大量时间。

你可以利用该系统创建单次攻击这样的简单技能，也可以创建十分复杂的咒语，根据来自用户和目标的数据触发许多状态效果。本页提供了关于技能系统及其组件如何协同作用的概述。

## 什么是Gameplay技能？

**Gameplay技能（Gameplay Ability）** 是Actor可以拥有并反复触发的一种游戏内动作。常见例子有咒语、特殊攻击或物品触发的效果。这一概念在电子游戏中十分普遍，常常被视为理所当然，不过运行技能所涉及的过程常常很复杂，并需要具体的时序。例如，虽然编写攻击激活代码本身相当简单，但在长期项目的过程中，随着你为玩家添加或去除增益或减益效果、增加资源成本、连击系统及其他细节，构建技能的复杂度可能会呈爆炸式增长。因此，在设计虚幻引擎的Gameplay技能系统时，有三大注意事项。

### 追踪技能的所有者

技能及其效果必须维持所有权的概念。当一种效果运行计算时，它需要知道其所有者是谁，以便使用其属性，当一种技能的作用会让玩家得分时，它需要知道哪个玩家拥有它，以便正确给分。

Gameplay技能的"所有者"与网络复制术语中的所有权不是一回事。

### 追踪技能的状态

技能必须能够在以下情况下追踪状态循环：

-   技能激活时。
-   技能目前正在执行中时。
-   技能完全完成并且不再处于活动状态时。

[Lyra示例项目](/documentation/zh-cn/unreal-engine/lyra-sample-game-in-unreal-engine)还会追踪何时授予技能。

例如，正在使用技能的Actor通常必须在技能使用完成之后，才能再次激活同一个技能。但是，技能可以有特殊规则，以便能够 **取消** 某个技能，提早结束执行，然后启动另一个技能。

### 协调技能的执行

技能必须能够在执行期间使用特定时序与多个不同的系统交互。这些交互可以包括：

-   激活动画蒙太奇。
    
-   临时控制角色的移动。
    
-   触发视觉效果。
    
-   执行重叠或碰撞事件。
    
-   临时或永久更改角色的统计数据。
    
-   增加或减少游戏内资源。
    
-   允许或阻止激活其他技能。
    
-   处理技能冷却以限制技能使用。
    
-   被游戏内事件中断。
    
-   取消进行中的其他技能。
    
-   对角色做出重大状态更改，例如激活新的移动模式。
    
-   响应其他交互中途的输入。
    
-   更新UI元素，显示技能的游戏内状态。
    

根据技能的工作方式，它可以在处于活动状态时在许多不同时间点执行其中任意交互，包括在动画中途，并且一些效果可能需要在技能本身完成后持久存在。

## Gameplay技能系统的组件

Gameplay技能系统指在处理所有这些用例，方法是将技能建模为负责自身执行的完全独立的实体。该系统由多个组件构成：

-   带有 **技能系统组件（Ability System Component）** 的所属Actor，维持该Actor拥有的所有技能的列表，并处理激活。
    
-   **Gameplay技能蓝图（Gameplay Ability Blueprints）** ，表示各个技能，并协调其游戏内执行。
    -   由 **Gameplay技能任务（Gameplay Ability Tasks）** 以及其他函数构成。
-   **属性集（Attribute Set）** ，附加到技能系统组件。
    -   包含 **Gameplay属性（Gameplay Attributes）** ，用于驱动计算或表示资源。
-   **Gameplay效果（Gameplay Effects）** ，处理Actor因使用技能而发生的更改。
    -   **Gameplay效果计算（Gameplay Effect Calculations）** ，提供模块化、可复用的方法来计算效果。
    -   **Gameplay提示（Gameplay Cues）** ，与Gameplay效果关联，并提供数据驱动的方法来处理视觉效果。

下面的分段更详细地总结了这些类。

### 追踪所有权

你需要将技能系统组件附加到Actor，该Actor才能使用Gameplay技能。此组件负责为Actor添加和去除技能，追踪Actor拥有的技能，以及激活技能。它还是技能系统上下文中所属Actor的主要表示，提供一个系统来追踪属性、持续进行的效果、**Gameplay标签（Gameplay Tags）** 和 **Gameplay事件（Gameplay Events）** 以及直接访问所属Actor的接口。

在多人游戏中，技能系统组件还负责将信息复制到客户端，将玩家动作传达到服务器，并验证客户端是否有权更改技能系统组件的状态。技能系统组件的父Actor必须属于本地控制的玩家才能远程激活。

### 处理技能及其执行

Gameplay技能是一个蓝图对象，负责执行技能的所有事件，包括播放动画，触发效果，从所有者获取属性，以及显示视觉效果。

#### 控制激活

你主要有四种方法 **激活** Gameplay技能：

-   你可以使用 **Gameplay技能句柄（Gameplay Ability Handle）** 通过蓝图或C++代码显式激活技能。这在授予技能时由技能系统组件提供。
    
-   使用Gameplay事件。这会使用匹配的技能触发器触发所有技能。如果你需要抽象输入和决策机制，此方法非常适合，因为它提供了最大的灵活度。
    
-   通过匹配的标签使用Gameplay效果。这会使用匹配的技能触发器触发所有技能。这是触发技能的Gameplay效果的首选方法。典型用例是休眠减益，它触发的技能会播放禁用动画，并禁止其他游戏动作。
    

Gameplay技能可以表示一组范围广泛的游戏内动作，不限于玩家显式使用的能力或咒语。击中反应或以上例子的休眠动画，都是很好的例子。

-   使用 **输入代码（Input Codes）** 。这些会添加到技能系统组件，在调用时会触发匹配的所有技能。其运作方式类似于Gameplay事件。

当你 **激活** Gameplay技能时，系统会将该技能识别为进行中。接着，它会触发附加到激活事件的代码，遍历每个函数和Gameplay任务，直到你调用 **完成（Finish）** 函数来表示技能已完成执行。如果你需要执行额外的清理，你可以将更多代码附加到 **完成时（On Finished）** 事件。你还可以 **取消（Cancel）** 技能，使其在执行中途停止。

Gameplay技能使用Gameplay标签来限制执行。所有技能都有在激活时会添加到其所属Actor的标签列表，以及阻止激活或自动取消该技能的标签列表。虽然你可以使用自己的代码手动取消、阻止或允许技能的执行，但这里提供了在整个系统内一致的方法。

#### 控制执行

Gameplay技能支持各种常见用例，例如技能冷却和分配资源成本，并且有一个预制的Gameplay技能任务库，用于处理动画和企图常见虚幻引擎系统。

虽然标准蓝图函数节点会立即完成执行，但Gameplay技能任务会追踪它们是处于不活动状态、进行中还是已完成，并且可以编程为在执行期间触发其他事件。它们还可以追踪其父Gameplay技能是否已取消并相应清理。游戏通过扩展Gameplay技能任务来实现自定义Gameplay逻辑是很常见的做法。

Gameplay技能还可以响应Gameplay事件，它们是通用事件侦听器，等待从所属Actor接收Gameplay标签和 **事件数据（Event Data）** 结构体。

### 属性集和属性

Gameplay技能系统主要通过 **属性集（Attribute Sets）** 与Actor交互，其中包含 **Gameplay属性（Gameplay Attributes）** 。这些是可在计算中使用或由Gameplay技能修改的数字浮点值。它们可用于你需要的任意目的，但常见用例包括追踪角色的生命值或击中点，以及角色的核心统计数据值（例如力量和智能）。虽然你可以使用基本变量来表示这些值，但Gameplay属性可带来多项优势：

-   属性集提供了一组一致、可复用的属性，可用于构建系统。
    
-   Gameplay技能可以通过反射访问Gameplay属性，以便可以直接在蓝图编辑器中创建简单的计算和效果。
    
-   Gameplay属性会单独追踪默认值、当前值和最大值，这样就更容易创建临时修改（增益和减益）以及持久效果。Gameplay属性还会将其值复制到所有客户端，适合直观地显示敌方血条等本地UI。
    

要使Actor能够使用Gameplay属性，你必须将属性集添加到其技能系统组件。在此之后，技能系统组件可以自动访问你分配给属性集的属性。

### 处理Gameplay效果

Gameplay技能系统会使用Gameplay效果将更改应用于Gameplay技能的目标Actor。这些可以是一次性的效果，例如应用伤害，也可以是持久效果，例如持续的毒素伤害、增益和减益。就持久效果而言，Gameplay效果会将自身附加到目标Actor，直到去除为止，并且它们可以预设为拥有有限的生命周期，此后将到期并自行清理，撤销对目标Actor的Gameplay属性的所有更改。

Gameplay效果使用Gameplay效果计算来基于Gameplay属性处理计算。虽然你可以直接在蓝图编辑器中创建简单的计算，但你还可以编写逻辑更复杂并且一次可影响多个属性的自定义效果计算。这些能够处理来自Gameplay技能的所属Actor和目标Actor的信息，以便你可以将常用计算集中放到一个可复用的代码片段中。

### 处理美化效果

Gameplay提示是负责运行视觉和声音效果的Actor和UObject，是在多人游戏中复制美化反馈的首选方法。创建Gameplay提示时，你会运行要在事件图表中播放的效果的逻辑。Gameplay提示可以与一系列Gameplay标签关联，并且匹配这些标签的Gameplay效果将自动应用它们。

例如，如果你将标签Ability.Magic.Fire.Weak添加到Gameplay提示，拥有Ability.Magic.Fire.Weak的Gameplay效果将自动生成该Gameplay提示并运行它。这样就可以快速轻松创建视觉效果的通用库，而不必手动从代码触发它们。

或者，你也可以触发没有Gameplay效果关联的提示。有关此实现的例子，你可以查看Lyra示例游戏的武器发射反馈。

Gameplay提示不使用可靠的复制，因此有可能一些客户端没有接收到提示或显示其反馈。如果你将Gameplay代码绑定到这些提示，这可能造成不同步。因此，Gameplay提示应该仅用于美化反馈。对于需要复制到所有客户端的Gameplay相关反馈，你应该转而依赖技能任务来处理复制。**播放蒙太奇（Play Montage）** 技能任务就是很好的例子。

## 支持网络多玩家

Gameplay技能提供了一些内置功能来支持联网多人游戏，但存在一些局限性和指南，你应该加以注意。其中许多指南反映了一般网络多人游戏最佳实践。

### 技能系统组件和复制

为节省带宽和防止作弊，技能系统组件不将其完整状态复制到所有客户端。具体而言，它们不将技能和Gameplay效果复制到所有客户端，只复制它们影响的Gameplay属性和标签。

### 复制技能和使用预测

网络游戏中的大部分技能都应该在服务器上运行并复制到客户端，因此技能激活时通常有延迟。这在大部分快节奏的多人游戏中是不能接受的。要掩盖这种延迟，你可以在本地激活技能，然后向服务器表明你已将其激活，以便服务器可以跟上。

有可能服务器会拒绝技能激活，这意味着它必须撤销技能在本地做出的更改。你可以使用 **本地预测的** 技能处理这些情况。为提供帮助，当授予效果的技能被服务器拒绝时，一些Gameplay效果支持回滚。这包括大部分非瞬时Gameplay效果，但要注意，伤害以及其他瞬时属性/标签更改等不包括在内。

### 使用技能与服务器拥有的对象交互

Gameplay技能可以处理与机器人、NPC以及其他由服务器拥有的Actor和对象之间的交互。你必须通过本地拥有的Actor（通常是玩家的Pawn）以及复制的技能或调用服务器函数的另一个非GAS机制来执行此操作。这会将交互复制到服务器，后者接着有权执行对NPC的更改。

## 延伸阅读

有关Gameplay技能系统的实操运行模型，请检查[Lyra示例游戏项目](/documentation/zh-cn/unreal-engine/abilities-in-lyra-in-unreal-engine)，它实现了多项技能和武器。要开始亲自处理这些构建块，请学习《Gameplay技能系统快速入门指南》。

-   [gameplay](https://dev.epicgames.com/community/search?query=gameplay)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [gameplay ability system](https://dev.epicgames.com/community/search?query=gameplay%20ability%20system)
-   [gameplay abilities](https://dev.epicgames.com/community/search?query=gameplay%20abilities)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [什么是Gameplay技能？](/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system#%E4%BB%80%E4%B9%88%E6%98%AFgameplay%E6%8A%80%E8%83%BD%EF%BC%9F)
-   [追踪技能的所有者](/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system#%E8%BF%BD%E8%B8%AA%E6%8A%80%E8%83%BD%E7%9A%84%E6%89%80%E6%9C%89%E8%80%85)
-   [追踪技能的状态](/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system#%E8%BF%BD%E8%B8%AA%E6%8A%80%E8%83%BD%E7%9A%84%E7%8A%B6%E6%80%81)
-   [协调技能的执行](/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system#%E5%8D%8F%E8%B0%83%E6%8A%80%E8%83%BD%E7%9A%84%E6%89%A7%E8%A1%8C)
-   [Gameplay技能系统的组件](/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system#gameplay%E6%8A%80%E8%83%BD%E7%B3%BB%E7%BB%9F%E7%9A%84%E7%BB%84%E4%BB%B6)
-   [追踪所有权](/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system#%E8%BF%BD%E8%B8%AA%E6%89%80%E6%9C%89%E6%9D%83)
-   [处理技能及其执行](/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system#%E5%A4%84%E7%90%86%E6%8A%80%E8%83%BD%E5%8F%8A%E5%85%B6%E6%89%A7%E8%A1%8C)
-   [控制激活](/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system#%E6%8E%A7%E5%88%B6%E6%BF%80%E6%B4%BB)
-   [控制执行](/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system#%E6%8E%A7%E5%88%B6%E6%89%A7%E8%A1%8C)
-   [属性集和属性](/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system#%E5%B1%9E%E6%80%A7%E9%9B%86%E5%92%8C%E5%B1%9E%E6%80%A7)
-   [处理Gameplay效果](/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system#%E5%A4%84%E7%90%86gameplay%E6%95%88%E6%9E%9C)
-   [处理美化效果](/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system#%E5%A4%84%E7%90%86%E7%BE%8E%E5%8C%96%E6%95%88%E6%9E%9C)
-   [支持网络多玩家](/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system#%E6%94%AF%E6%8C%81%E7%BD%91%E7%BB%9C%E5%A4%9A%E7%8E%A9%E5%AE%B6)
-   [技能系统组件和复制](/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system#%E6%8A%80%E8%83%BD%E7%B3%BB%E7%BB%9F%E7%BB%84%E4%BB%B6%E5%92%8C%E5%A4%8D%E5%88%B6)
-   [复制技能和使用预测](/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system#%E5%A4%8D%E5%88%B6%E6%8A%80%E8%83%BD%E5%92%8C%E4%BD%BF%E7%94%A8%E9%A2%84%E6%B5%8B)
-   [使用技能与服务器拥有的对象交互](/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system#%E4%BD%BF%E7%94%A8%E6%8A%80%E8%83%BD%E4%B8%8E%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%8B%A5%E6%9C%89%E7%9A%84%E5%AF%B9%E8%B1%A1%E4%BA%A4%E4%BA%92)
-   [延伸阅读](/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system#%E5%BB%B6%E4%BC%B8%E9%98%85%E8%AF%BB)

相关文档

[

Lyra中的技能

![Lyra中的技能](https://dev.epicgames.com/community/api/documentation/image/0db170b1-e035-4a2c-87a9-bf0d5e90cce6?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/abilities-in-lyra-in-unreal-engine)
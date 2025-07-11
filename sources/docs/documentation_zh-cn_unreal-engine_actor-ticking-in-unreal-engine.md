# Unreal Engine中的Actor Ticking | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/actor-ticking-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:46:50.893Z

---

目录

![Actor Ticking](https://dev.epicgames.com/community/api/documentation/image/8e450bd3-d0cc-4338-acf9-b214fa3cb9b4?resizing_type=fill&width=1920&height=335)

## Ticking

"Tick"指的是以规则间隔（常为每帧一次）在一个 actor 或组件上运行一段代码或蓝图脚本。正确理解游戏 actor 和组件之间相对的 tick 顺序和引擎执行的其他每帧任务十分重要，可避免帧差一问题，并确保游戏运行的一致性。Actors 和组件可设为每帧 tick，也可设为以最低时间间隔 tick，或完全不 tick。此外，它们可在引擎每帧更新循环中的不同阶段被合并为组；也可接受单独指令，等待特定 tick 完成后再开始。

## Tick 组

除非已指定最低 tick 间隔，Actors 和组件每帧 tick 一次。Ticking 根据 tick 组发生。Tick 组可在代码或蓝图中指定。Actor 或组件的 tick 组用于确定在帧中何时进行 tick，相对于其他引擎中的帧处理（主要是物理模拟）。每个 tick 组将完成对指定的每个 actor 和组件的 tick，然后再开始下一个 tick 组。除 tick 组外，actors 或组件还可设置 tick 依赖性，意味着其他特定 actor 或组件的 tick 函数完成后它们才会进行 tick。Tick 组和 tick 依赖性的使用十分重要，可确保游戏在涉及到多个 actors 或组件的物理相依行为或循序游戏性行为方面工作正常。

下表是可用于游戏性的 tick 组，按它们在帧中运行的顺序排序，并包含每个组的特定含义和环境。

### Tick 组排序

**Tick 组**

**引擎活动**

**TG\_PrePhysics**

帧的开始。

**TG\_DuringPhysics**

到达此步骤时，物理模拟已开始。Tick 此组时的任意时候，或所有组成员已 tick 后，模拟完成并更新引擎的物理数据。

**TG\_PostPhysics**

此步骤开始时物理模拟已完成，引擎正在使用当前帧的数据。

n/a

处理隐藏操作、tick 世界时间管理器、更新摄像机、更新关卡流送体积域和流送操作。

**TG\_PostUpdateWork**

n/a

n/a

处理之前在帧中创建的 actor 的延迟生成。完成帧并渲染。

#### TG\_PrePhysics

-   Actor 将与物理对象（包括基于物理的附着物）进行交互时使用的 tick 组。如此，actor 的运动便完成，并可被纳入物理模拟因素。
-   此 tick 中的物理模拟数据属于上一帧 — 也就是上一帧渲染到屏幕上的数据。

#### TG\_DuringPhysics

-   因它在物理模拟的同时运行，无法确定此 tick 中的物理数据来自上一帧或当前帧。物理模拟可在此 tick 组中的任意时候完成，且不会显示信息来表达此结果。
-   因为物理模拟数据可能来自当前帧或上一帧，此 tick 组只推荐用于无视物理数据或允许一帧偏差的逻辑。常见用途为更新物品栏画面或小地图显示。此处物理数据完全无关，或显示要求不精确，一帧延迟不会造成问题。

#### TG\_PostPhysics

-   此 tick 组运行时，此帧的物理模拟结果已完成。
-   此组可用于武器或运动追踪。渲染此帧时所有物理对象将位于它们的最终位置。这尤其适用于射击游戏中的激光瞄准器。在此情况中激光束必须从枪的最终位置发出，即便出现一帧延迟也会十分明显。

#### TG\_PostUpdateWork

-   这在 TG\_PostPhysics 之后运行。从以往来看，它的基函数是将最靠后的信息送入粒子系统。
-   TG\_PostUpdateWork 在摄像机更新后发生。如特效必须知晓摄像机朝向的准确位置，可将控制这些特效的 actor 放置于此。
-   这也可用于在帧中绝对最靠后运行的游戏逻辑，如解决格斗游戏中两个角色在同一帧中尝试抓住对方的情况。

## Tick 依赖性

存在于 actor 和组件上的 `AddTickPrerequisiteActor` 和 `AddTickPrerequisiteComponent` 函数将设置存在函数调用的 actor 或组件等待 tick，直到特定的其他 actor 或组件完成 tick。这尤其适用于这样的情况：在帧中几乎相同时间发生，但一个 actor/组件将设置另一个 actor/组件所需的数据。在 tick 组上使用它的原因是：如存在于相同组中，许多 actor 可被并行更新。如 actors 只是个体依赖于一个或两个其他 actors，而无需等待整个组完成后再进行 tick，则没有必要将一组 actors 移动到一个全新的组。

## 范例

### Tick 组/Tick 依赖性使用范例

以一个游戏来举例说明如何使用以上列出的每种 tick 组：在这个游戏中玩家控制一个动画 actor 进行激光瞄准，在影响的点上放置一个特殊的瞄准标线 actor。只要激光对准特定类型的目标物体，一个特殊的条便会开始填充。一个 HUD actor 将把此条显示在屏幕上。

玩家的动画 actor 将在 TG\_PrePhysics 中移动和执行动画。需要在物理之前完成它的动画设置，使物理模拟对象正常跟随并与之交互。

HUD 可在任意 tick 组中更新，但出于两大原因，TG\_DuringPhysics 为优选。第一，TG\_DuringPhysics 可接受，因为它不直接与游戏的物理模拟产生交互或使用来自物理模拟的数据。第二，没有原因强制物理模拟等待 HUD 完成更新，也没有原因强制 HUD 等待物理模拟完成。注意，HUD 为游戏后的一帧。对准目标物体时，此帧不会反映到条中，下一帧才会。

标线 actor 在 TG\_PostPhysics 中更新。如此标线便可了解其对场景的追踪。因为它将在帧的最后渲染，所以它将正常出现在物体表面。它还将基于目标物体的正确位置调整条的数值。

最后，在 TG\_PostUpdateWork 中，激光粒子效果将更新到瞄准 actor 和标线的最后位置。

Tick 依赖性可消除对 TG\_PostUpdateWork 的需求。激光粒子可随标线 actor 放置在 TG\_PostPhysics 中，使用 tick 依赖性确保标线完成 tick 后激光才会更新到标线的位置。将激光的 tick 依赖性设为标线，可确保激光不会被过早更新，但无需等待其他不相关、位于物理之后的其他 tick。此操作比将激光移入不同的 tick 组更为高效。

作为不从 tick 依赖性获益的一个范例，标线自身无需依赖于瞄准 actor 进行 tick，但是它需要瞄准 actor 完成 tick 后才能执行其自身的 tick。不需要 tick 依赖性的原因是标线处于物理之后，而瞄准 actor 处于物理之前。它们处于不同的 tick 组中，即可确定它们将按组自身的排序运行。因为每个 tick 组完成所有 actor 和组件的 tick 后下一个 tick 组才会开始。

## Actor 生成

在 `BeginPlay` 中，actor 将向引擎注册其主 tick 函数和其组件的 tick 函数。Actor 的 tick 函数可通过 `PrimaryActorTick` 成员设为在特定 tick 组中运行，或完全禁用。这通常在构造函数中完成，以确保 `BeginPlay` 调用前数据设置正确。一些常用代码如下：

```cpp
	PrimaryActorTick.bCanEverTick = true;
	PrimaryActorTick.bTickEvenWhenPaused = true;
	PrimaryActorTick.TickGroup = TG_PrePhysics;

```

## 组件 Tick

组件可以和 Actor 一样被分隔为不同的 tick 组。之前，Actor 在 Actor 的 tick 中 tick 其所有组件。这仍在发生，但需要处于不同群组中的组件将被添加到一个列表中，在这些组件被 tick 时进行管理。将组件指定到 tick 组时应使用指定 actor 到 tick 组的相同标准。组件的 tick 结构的命名方式与 Actor 有所不同，但工作方式相同：

```cpp
	PrimaryComponentTick.bCanEverTick = true;
	PrimaryComponentTick.bTickEvenWhenPaused = true;
	PrimaryComponentTick.TickGroup = TG_PrePhysics;

```

注意：`PrimaryActorTick` 使用 Actor 的 `Tick()` 函数，而 PrimaryComponentTick 使用 ActorComponent 的 `TickComponent()` 函数。

## 高级 Tick 功能

Actor 或组件的默认 tick 函数可在游戏中分别通过 `AActor::SetActorTickEnabled` 和 `UActorComponent::SetComponentTickEnabled` 函数启用或禁用。此外，一个 actor 或组件可拥有多个 tick 函数。达成方法为：创建一个继承自 `FTickFunction` 的结构体，并覆写 `ExecuteTick` 和 `DiagnosticMessage` 函数。默认 actor 和组件 tick 函数结构是自行构建的好参考，可在 `FActorTickFunction` 和 `FComponentTickFunction` 下的 EngineBaseTypes.h 中找到它们。

将自建的 tick 函数结构添加到 actor 或组件后即可将其初始化（通常在拥有类的构造函数中进行）。启用和注册 tick 函数的最常用路径是覆写 `AActor::RegisterActorTickFunctions` 并添加调用到 tick 函数结构的 `SetTickFunctionEnable`，之后是作为参数的 `RegisterTickFunction`（含拥有 actor 的等级）。此过程的最终结果是：创建的 actor 或组件可进行多次 tick，包括不同组中的 tick，以及每个 tick 函数单独的依赖性。手动设置 tick 依赖性的方法为：在需要依赖于其他函数结构的 tick 函数结构上调用 `AddPrerequisite`，然后传入用作依赖性的 tick 函数结构。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Ticking](/documentation/zh-cn/unreal-engine/actor-ticking-in-unreal-engine#ticking)
-   [Tick 组](/documentation/zh-cn/unreal-engine/actor-ticking-in-unreal-engine#tick%E7%BB%84)
-   [Tick 组排序](/documentation/zh-cn/unreal-engine/actor-ticking-in-unreal-engine#tick%E7%BB%84%E6%8E%92%E5%BA%8F)
-   [TG\_PrePhysics](/documentation/zh-cn/unreal-engine/actor-ticking-in-unreal-engine#tg-prephysics)
-   [TG\_DuringPhysics](/documentation/zh-cn/unreal-engine/actor-ticking-in-unreal-engine#tg-duringphysics)
-   [TG\_PostPhysics](/documentation/zh-cn/unreal-engine/actor-ticking-in-unreal-engine#tg-postphysics)
-   [TG\_PostUpdateWork](/documentation/zh-cn/unreal-engine/actor-ticking-in-unreal-engine#tg-postupdatework)
-   [Tick 依赖性](/documentation/zh-cn/unreal-engine/actor-ticking-in-unreal-engine#tick%E4%BE%9D%E8%B5%96%E6%80%A7)
-   [范例](/documentation/zh-cn/unreal-engine/actor-ticking-in-unreal-engine#%E8%8C%83%E4%BE%8B)
-   [Tick 组/Tick 依赖性使用范例](/documentation/zh-cn/unreal-engine/actor-ticking-in-unreal-engine#tick%E7%BB%84/tick%E4%BE%9D%E8%B5%96%E6%80%A7%E4%BD%BF%E7%94%A8%E8%8C%83%E4%BE%8B)
-   [Actor 生成](/documentation/zh-cn/unreal-engine/actor-ticking-in-unreal-engine#actor%E7%94%9F%E6%88%90)
-   [组件 Tick](/documentation/zh-cn/unreal-engine/actor-ticking-in-unreal-engine#%E7%BB%84%E4%BB%B6tick)
-   [高级 Tick 功能](/documentation/zh-cn/unreal-engine/actor-ticking-in-unreal-engine#%E9%AB%98%E7%BA%A7tick%E5%8A%9F%E8%83%BD)
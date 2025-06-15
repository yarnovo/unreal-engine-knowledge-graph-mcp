# 虚幻引擎StateTree概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/overview-of-state-tree-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:43:59.250Z

---

目录

![StateTree概述](https://dev.epicgames.com/community/api/documentation/image/6c7036e3-d34d-4c14-9cad-a6caaa78c85f?resizing_type=fill&width=1920&height=335)

## 概述

**StateTree** 是一种通用分层状态机，组合了行为树中的 **选择器（Selectors）** 与状态机中的 **状态（States）** 和 **过渡（Transitions）** 。用户可以创建非常高效、保持灵活且井然有序的逻辑。

StateTree包含以树结构布局的状态。状态选择可以在树中的任意位置触发，但它最初从根开始。在选择过程中，将对每个状态的 **进入条件（Enter Conditions）** 求值。如果通过，选择将前进到该状态的子状态（如果可用）。如果没有子状态可用，将激活当前状态。

选择状态将激活从根到叶状态的所有状态。每个状态由 **任务（Tasks）** 和 **过渡（Transitions）** 组成。

选择某个状态时，所选状态及其所有父状态都将激活。为所有活动状态执行所有任务，执行方式为从根开始，直至所选的状态。

每个任务都向StateTree提供一个输出。常见输出示例包括选择目标、播放动画和查看对象。每个状态可以有多个任务，只要状态保持活动，该状态中的所有任务都会并发运行。完成执行的第一个任务将触发过渡，这可能导致选择新状态。

作为一个简单的例子，你可以使用StateTree创建昼夜变换系统。你会为每个时刻创建一个状态，并会在每个状态下创建单独的任务。每个任务可以处理不同的元素，例如雾密度、天空球体颜色，等等。

另一个例子是让AI代理在关卡中四处行走，并在环顾四周的同时持续检查是否有命中效果。你可以使用一个状态来表示四处行走和环顾四周，另一个状态来表示对命中做出反应。

StateTree中的过渡可以指向树中的其他任意状态。过渡包含 **触发器条件（Trigger Conditions）** ，需要满足这些条件，过渡才会触发状态选择过程。

如果状态选择成功，将选择一个新的状态。一些过渡会被持续监控，而其他过渡仅在状态完成时执行。过渡从叶状态开始进行求值，并朝根向上推进。在此过程中，将选择第一个成功并导致状态选择的过渡。此层级允许对常见过渡进行分组。

下面是StateTree的不同元素：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66a94b7a-551d-4a2d-937d-8c39a3991609/st-overview-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66a94b7a-551d-4a2d-937d-8c39a3991609/st-overview-1.png)

图例

StateTree元素

说明

**1**

根（Root）

StateTree开始运行时选择的第一个状态。

**2**

选择器状态（Selector State）

指的是有子状态的状态。该状态绝不会直接被选择，选择将继续到其子状态之一。

**3**

状态进入条件（State Enter Condition）

指用于确定是否可以选择某个状态的条件列表。

**4**

任务（Task）

指的是属于某个状态并且在该状态激活时执行的一组操作。

**5**

过渡（Transition）

定义触发状态选择过程的条件。任务完成、成功或失败时，或者某个被监控的条件达成时，会触发过渡。

## 选择流

### 选择新状态

StateTree以类似于行为树的方式选择活动状态。状态选择从第一个Tick上的根开始，并在树中向下继续对每个状态的进入条件求值。

-   如果进入条件未通过，选择将继续到下一个同级状态。
-   如果进入条件通过，并且该状态是叶状态，则将其选择作为新状态。
-   如果该状态有子状态，将继续对第一个子状态执行相同过程，直到找到叶状态为止。

如果一个状态有子状态，但没有一个子状态可选择（其进入条件失败），那么即使该状态的所有进入条件都通过测试，也不会选择该状态。

行为树与状态机之间的一大区别是，状态机通常在执行沿树向下推进时提交状态选择，而行为树则尝试查找合适的叶节点。

一般来说，即使已经选择一个状态，行为树也会继续执行状态选择逻辑。这是在状态之间过渡的唯一方法。

StateTree基于过渡按需运行状态选择过程。在第一个Tick上，会隐式过渡到根状态，这将选择要运行的第一个状态。选择该状态之后，过渡会指示何时及在何处执行选择逻辑。

### 执行状态任务

选择一个状态之后，其所有任务都将开始并发执行。任务将一直执行，直到某个过渡触发选择过程并选择某个状态为止。所选状态可以是当前状态（该状态继续执行）或新状态。

最常见的过渡触发器是 **完成（completion）** ，它在活动状态的第一个任务完成后立即执行。其他过渡可能标记为 **更新（Tick）** 并在每个Tick上进行测试。如果条件过渡通过测试，将执行状态选择逻辑，并且选择过程在目标状态处开始。如果目标状态有子状态，选择过程会将子状态视为选择逻辑的一部分。

### 数据流

状态树使用数据绑定功能在树内传递数据。 数据绑定功能可用于创建条件，或用于配置要运行的任务。 数据绑定功能能够以特定方式访问传递到状态树或在节点之间传递的数据。

状态树中所有节点通用的数据类型包括：

数据类型

描述

**状态树参数（State Tree Parameters）**

用户可以将输入参数添加到状态树，这样就可以在树运行时引用这些输入参数。 通过这些参数，用户可以根据树的使用情况来自定义树的使用方式。 例如，用户可以定义一个动画资产参数，该参数可以从外部传递到树，以便在Gameplay过程中使用。

**上下文数据（Context Data）**

"上下文数据"是指基于选定状态树模式而可供状态树使用的预定义数据。 此数据会根据状态树的使用位置而变化。 例如，Actor使用的状态树将以该Actor作为其上下文。 但是，如果将同一状态树用于智能对象行为，则上下文指的是使用的智能对象以及使用此智能对象的Actor。

**求值器（Evaluators）**

通过求值器可以向状态树公开无法通过"参数"或"上下文数据"公开的数据。 求值器是一个单独的类，可以在运行时在状态树中执行。 求值器包含变量，并可以在树启动、停止以及每次更新时执行自定义代码。 求值器的属性可以绑定到"参数"或"上下文数据"，也可以绑定到在求值器列表中更早出现的其他求值器。

**全局任务（Global Tasks）**

通过全局任务可以运行在树启动和停止事件之间激活的状态树任务。 如果需要可用于状态选择的永久数据，便可以使用全局任务。 例如，时间系统可以创建一个用于确定当前时间的全局任务。 由于全局任务是在树中的根状态之前启动的，因此在树启动时和第一次状态选择期间，此信息将可用。

状态树节点可以在彼此之间共享数据。 状态树中的不同元素可以通过以下方式绑定到数据：

状态树元素

元素可以绑定到的数据

**进入条件（Enter Conditions）**

可以绑定到通用数据，以及所有父状态中的任务。

**过渡条件（Transition Conditions）**

可以绑定到通用数据，以及当前状态和所有父状态中的任务。

**任务（Tasks）**

可以绑定到通用数据，以及当前状态和所有父状态中的之前任务。

### 蓝图集成

StateTree设计为通过蓝图脚本编写进行扩展。你可以通过扩展以下蓝图类来创建自定义任务、求值器和条件：

基类

说明

**UStateTreeTaskBlueprintBase**

StateTree任务的基类。

**UStateTreeEvaluatorBlueprintBase**

StateTree求值器的基类。

**UStateTreeConditionBlueprintBase**

StateTree条件的基类。

在上述例子之后，你可以使用StateTree和蓝图创建昼夜变换系统。此系统会根据时间更改关卡的雾密度。该系统还可以检查是否有风暴咒语，以便更改光照条件且不受时间影响。

对于这个例子，你可以创建以下蓝图类：

蓝图类

功能

任务（Task）

随时间推移逐渐更改雾密度。该任务可以添加到表示特定时刻的所有状态。

条件（Condition）

检查是否施了风暴咒语。该条件可以在根状态处求值。如果为true，它会将执行移至特别的风暴状态。

求值器（Evaluator）

将时间公开给过渡和进入条件。

## 常见模式

### 对类似任务分组

![智能对象任务分组在一个状态及其子状态中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60fcac20-202e-4b19-9ff4-11ffb9a35d09/st-overview-2.png)

任务可以分组在一个公共状态下。在上述例子中，有一个状态用于处理世界中的智能对象。该状态包含用于处理"伸展智能对象"和"使用智能对象"的子状态。

其中每个子状态都包含在选择该状态时执行的任务。"伸展"子状态包含用于查找智能对象并将AI代理移至智能对象的任务。

当你使用此分组策略时，所有任务都通过该状态共享相同的过渡。

### 序列

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75d96bce-a2db-4998-b686-424dbb609b0e/st-overview-3.png)

StateTree包含 **下一个（Next）** 过渡，它简化了状态序列的创建和布局。

在上述例子中，选择 **伸展（Reach）** 状态时，将执行 **查找SO目标（Find SO Target）** 、 **移至SO（Move to SO）** 和 **查看（Look）** 任务。这些任务完成后 ，**下一个（Next）** 过渡会将执行移至下面的 **使用（Use）** 状态，其中的任务可以开始执行。

### 失败处理

![StateTree中的失败处理示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a195d8f9-a804-420a-ac3a-e08e0c128435/st-overview-4.png)

StateTree以分层方式处理任务完成失败，从活动任务开始，并沿树向上推进。

在上述例子中， **伸展插槽（Reach Slot）** 状态会在成功时将执行移至下一个状态（等待），或在失败时将执行移至其父状态（在相交处等待）。 **在相交处等待（Wait at Intersection）** 状态会在其任意子状态失败时触发过渡到 **空闲（Idling）** 状态。

**等待（Wait）** 状态会在成功或失败时将执行无限期移至自身，直到其父状态选择不同的状态为止。

### 分层数据

![在该例子中，任务可以获取数据并将数据与后续任务共享](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c35e43d2-3609-472d-acd5-e1ffa9e1139c/st-overview-5.png)

任务可以彼此共享数据。任务公开的数据将可用于属于活动状态的其他任意任务。这可提高StateTree中资源处理的效率。

在上述例子中，**群体声明等待插槽（Crowd Claim Wait Slot）** 任务将尝试为AI代理声明智能对象插槽，如果成功，它会将执行传递给 **移至等待插槽（Move To Wait Slot）** 任务。该任务将使用父任务中的插槽位置。如果成功，它会将执行传递给 **在插槽处等待（Wait At Slot）** 任务，它还将使用其父任务中的插槽位置。

### 优化行为

![StateTree提供了一种组织任务的方法，以便轻松实现上下文行为。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12926d72-c28f-4efd-9e14-da04a0967e0b/st-overview-6.png)

StateTree提供了一种组织任务的方法，以便轻松实现上下文行为。

在上述例子中，**等待（Wait）** 状态处理AI代理的站立移动——AI代理环顾四周并在被击中时做出反应。默认情况下，将执行 **等待查看（Wait Look）** 状态。如果该状态成功，它会将执行返回给父状态。但是，如果失败，它会将执行移至 **等待命中（Wait Hit）** 状态。

**等待命中（Wait Hit）** 状态将执行 **质量查看（Mass LookAt）** 和 **质量上下文动画（Mass Contextual Anim）** 任务。然后，这些任务将播放命中的相应动画。

-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [statetree](https://dev.epicgames.com/community/search?query=statetree)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/overview-of-state-tree-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [选择流](/documentation/zh-cn/unreal-engine/overview-of-state-tree-in-unreal-engine#%E9%80%89%E6%8B%A9%E6%B5%81)
-   [选择新状态](/documentation/zh-cn/unreal-engine/overview-of-state-tree-in-unreal-engine#%E9%80%89%E6%8B%A9%E6%96%B0%E7%8A%B6%E6%80%81)
-   [执行状态任务](/documentation/zh-cn/unreal-engine/overview-of-state-tree-in-unreal-engine#%E6%89%A7%E8%A1%8C%E7%8A%B6%E6%80%81%E4%BB%BB%E5%8A%A1)
-   [数据流](/documentation/zh-cn/unreal-engine/overview-of-state-tree-in-unreal-engine#%E6%95%B0%E6%8D%AE%E6%B5%81)
-   [蓝图集成](/documentation/zh-cn/unreal-engine/overview-of-state-tree-in-unreal-engine#%E8%93%9D%E5%9B%BE%E9%9B%86%E6%88%90)
-   [常见模式](/documentation/zh-cn/unreal-engine/overview-of-state-tree-in-unreal-engine#%E5%B8%B8%E8%A7%81%E6%A8%A1%E5%BC%8F)
-   [对类似任务分组](/documentation/zh-cn/unreal-engine/overview-of-state-tree-in-unreal-engine#%E5%AF%B9%E7%B1%BB%E4%BC%BC%E4%BB%BB%E5%8A%A1%E5%88%86%E7%BB%84)
-   [序列](/documentation/zh-cn/unreal-engine/overview-of-state-tree-in-unreal-engine#%E5%BA%8F%E5%88%97)
-   [失败处理](/documentation/zh-cn/unreal-engine/overview-of-state-tree-in-unreal-engine#%E5%A4%B1%E8%B4%A5%E5%A4%84%E7%90%86)
-   [分层数据](/documentation/zh-cn/unreal-engine/overview-of-state-tree-in-unreal-engine#%E5%88%86%E5%B1%82%E6%95%B0%E6%8D%AE)
-   [优化行为](/documentation/zh-cn/unreal-engine/overview-of-state-tree-in-unreal-engine#%E4%BC%98%E5%8C%96%E8%A1%8C%E4%B8%BA)
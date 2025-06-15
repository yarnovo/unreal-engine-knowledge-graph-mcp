# 虚幻引擎Niagara关键概念 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/key-concepts-in-niagara-effects-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:30:02.482Z

---

目录

![Niagara关键概念](https://dev.epicgames.com/community/api/documentation/image/1a0b94c1-9088-42d4-9b42-f19246903e27?resizing_type=fill&width=1920&height=335)

## Niagara设计理念

### 为何要重新塑造虚幻引擎的视觉效果系统？

虚幻引擎的用户群体在不断扩大，虚幻引擎广泛应于游戏开发领域以外的众多行业。例如：

-   建筑视觉表现
-   工业设计（如汽车设计）
-   虚拟影视制作

用户更加多样化——有设计专业的学生、独立开发者、大型专业工作室团队，以及非游戏领域的个人和公司。随着不断发展，Epic开发人员无法全面了解虚幻引擎介入的所有行业。因此我们希望创建适用于各行业所有用户的视觉效果（VFX）系统。

### 新VFX系统的目标

我们要创建新系统，取Cascade之精华，去其糟粕。因此，新VFX系统的目标是：

-   美术师可全权掌控效果。
-   各轴均可编程、可自定义。
-   提供更好的调试、显示和性能工具。
-   支持来自虚幻引擎4其他部分或外部源的数据。
-   不妨碍用户操作。

### Niagara如何实现目标

#### 数据共享

实现用户全面控制，从数据访问开始。我们希望用户能够使用虚幻引擎的所有部分的数据，以及来自其他应用程序的数据。因此，我们决定向用户公开一切数据。

#### 粒子负载

为向用户公开所有此类数据，必须确定用户使用数据的方式。命名空间可容纳层级数据。比如，Emitter.Age包含发射器数据；Particle.Position包含粒子数据。参数映射是携带粒子所有属性的粒子负载。因此，一切都是可选项。

#### 可添加许多数据类型

任何数据类型均可添加为粒子参数。可添加复杂结构体、变换矩阵或布尔标记。可添加任何数据类型，并应用于效果模拟。

#### 将图表范式和堆栈范式结合

堆栈范式（例如Cascade中所用范式）和图表范式（例如蓝图中所用范式）各有优势。堆栈提供模块化行为和可读性。图表增强用户对行为的控制。新效果系统兼具两者之长。

## Niagara混合结构的层级

### 模块

模块可用于图表范式 - 可使用可视节点图表在脚本编辑器中创建带HLSL的模块。模块相当于Cascade的行为。模块与公共数据通信、封装行为，并堆叠在一起。

### 发射器

发射器用于堆栈范式 - 作为模块容器，可堆叠在一起创建各种效果。发射器用途单一，但可重复使用。参数可从模块传输到发射器级别，但用户可在发射器中修改模块和参数。

### 系统

发射器、系统用于堆栈范式，也与Sequencer时间轴配合用于控制发射器在系统中的行为。系统是发射器的容器。系统将此类发射器组合成一种效果。在Niagara编辑器中编辑系统时，可以修改和覆盖系统中的参数、模块或发射器。

## Niagara选择堆栈和堆栈组

从概念上讲，Niagara中的粒子模拟作为堆栈运行，模拟从堆栈顶部流向底部，依次执行各模块。关键点是，每个模块都指定到组，以确定模块执行时间。例如，初始化粒子的模块或粒子生成时起作用的模块位于 **粒子生成** 组中。

每个组中都有多个 *阶段*，会在一个系统的生命周期内的特定时间点上调用它们。 发射器、系统和粒子都默认具有 **生成** 和 **更新** 阶段。生成阶段会在组存在的第一帧内被触发。例如，系统会在关卡内首次实例化并被激活时触发其生成阶段。粒子会在发射器发射粒子时触发其生成阶段，在每个新粒子被创建出来时将执行生成指令。更新阶段会在系统、发射器或粒子被激活的每一帧中触发。

此外还有其他高级阶段，如 **事件** 和 **模拟阶段**。它们可以被添加到生成和更新流程中。每当粒子生成一个新事件，并设置一个发射器去处理该事件时，就会触发 **事件**。如果有可能，事件句柄阶段会发生在同一帧中，但位于发起事件之后。**模拟阶段** 是一个高级GPU功能。该功能可让一个序列中发生多个生成和更新阶段，对于构建流体模拟之类的复杂结构非常有用。

**模块是项目，但项目并不是模块**。*模块* 是用户可创建的可编辑资源。*项目* 指的是系统或发射器中用户无法创建的部分。举例而言，系统属性、发射器属性和渲染器都是项目。

## 阶段、组、命名空间及数据封装

通过将各个模块添加到 *组*（系统、发射器或粒子）的 *阶段*（更新、生成、事件或模拟），可控制模块执行时间及模块处理的数据。堆栈组关联 **命名空间**；此类命名空间将定义该组中的模块可读取或写入的数据。

例如，**系统** 组中执行的模块可读写系统命名空间的参数，但只能读取引擎或用户命名空间中的参数。沿堆栈从系统组向下执行至发射器组时，**发射器** 组中执行的模块可读写发射器命名空间中的参数，但只能读取系统、引擎和用户命名空间中的参数。**粒子** 组中的模块只能读取系统和发射器命名空间的参数。

由于发射器组中的模块可读取系统命名空间中的参数，因此系统组中的模块可执行一次与所有发射器相关的模拟，并由各个发射器中的发射器组模块读取模拟结果（存储在系统命名空间中）。这也适用于粒子组中的模块，其可读取系统和发射器命名空间中的参数。下表清楚地列出了它们之间的关系。

模块组

可读取命名空间

可写入命名空间

系统

系统、引擎、用户

系统

发射器

系统、发射器、引擎、用户

发射器

粒子

系统、发射器、粒子、引擎、用户

粒子

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)
-   [design philosophy](https://dev.epicgames.com/community/search?query=design%20philosophy)
-   [key concepts](https://dev.epicgames.com/community/search?query=key%20concepts)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Niagara设计理念](/documentation/zh-cn/unreal-engine/key-concepts-in-niagara-effects-for-unreal-engine#niagara%E8%AE%BE%E8%AE%A1%E7%90%86%E5%BF%B5)
-   [为何要重新塑造虚幻引擎的视觉效果系统？](/documentation/zh-cn/unreal-engine/key-concepts-in-niagara-effects-for-unreal-engine#%E4%B8%BA%E4%BD%95%E8%A6%81%E9%87%8D%E6%96%B0%E5%A1%91%E9%80%A0%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E7%9A%84%E8%A7%86%E8%A7%89%E6%95%88%E6%9E%9C%E7%B3%BB%E7%BB%9F%EF%BC%9F)
-   [新VFX系统的目标](/documentation/zh-cn/unreal-engine/key-concepts-in-niagara-effects-for-unreal-engine#%E6%96%B0vfx%E7%B3%BB%E7%BB%9F%E7%9A%84%E7%9B%AE%E6%A0%87)
-   [Niagara如何实现目标](/documentation/zh-cn/unreal-engine/key-concepts-in-niagara-effects-for-unreal-engine#niagara%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E7%9B%AE%E6%A0%87)
-   [数据共享](/documentation/zh-cn/unreal-engine/key-concepts-in-niagara-effects-for-unreal-engine#%E6%95%B0%E6%8D%AE%E5%85%B1%E4%BA%AB)
-   [粒子负载](/documentation/zh-cn/unreal-engine/key-concepts-in-niagara-effects-for-unreal-engine#%E7%B2%92%E5%AD%90%E8%B4%9F%E8%BD%BD)
-   [可添加许多数据类型](/documentation/zh-cn/unreal-engine/key-concepts-in-niagara-effects-for-unreal-engine#%E5%8F%AF%E6%B7%BB%E5%8A%A0%E8%AE%B8%E5%A4%9A%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)
-   [将图表范式和堆栈范式结合](/documentation/zh-cn/unreal-engine/key-concepts-in-niagara-effects-for-unreal-engine#%E5%B0%86%E5%9B%BE%E8%A1%A8%E8%8C%83%E5%BC%8F%E5%92%8C%E5%A0%86%E6%A0%88%E8%8C%83%E5%BC%8F%E7%BB%93%E5%90%88)
-   [Niagara混合结构的层级](/documentation/zh-cn/unreal-engine/key-concepts-in-niagara-effects-for-unreal-engine#niagara%E6%B7%B7%E5%90%88%E7%BB%93%E6%9E%84%E7%9A%84%E5%B1%82%E7%BA%A7)
-   [模块](/documentation/zh-cn/unreal-engine/key-concepts-in-niagara-effects-for-unreal-engine#%E6%A8%A1%E5%9D%97)
-   [发射器](/documentation/zh-cn/unreal-engine/key-concepts-in-niagara-effects-for-unreal-engine#%E5%8F%91%E5%B0%84%E5%99%A8)
-   [系统](/documentation/zh-cn/unreal-engine/key-concepts-in-niagara-effects-for-unreal-engine#%E7%B3%BB%E7%BB%9F)
-   [Niagara选择堆栈和堆栈组](/documentation/zh-cn/unreal-engine/key-concepts-in-niagara-effects-for-unreal-engine#niagara%E9%80%89%E6%8B%A9%E5%A0%86%E6%A0%88%E5%92%8C%E5%A0%86%E6%A0%88%E7%BB%84)
-   [阶段、组、命名空间及数据封装](/documentation/zh-cn/unreal-engine/key-concepts-in-niagara-effects-for-unreal-engine#%E9%98%B6%E6%AE%B5%E3%80%81%E7%BB%84%E3%80%81%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4%E5%8F%8A%E6%95%B0%E6%8D%AE%E5%B0%81%E8%A3%85)
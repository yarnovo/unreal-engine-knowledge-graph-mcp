# Niagara的伸缩性和最佳实践 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/scalability-and-best-practices-for-niagara
> 
> 生成时间: 2025-06-14T19:30:42.776Z

---

目录

![伸缩性和最佳实践](https://dev.epicgames.com/community/api/documentation/image/4ffd1cda-2f7d-4577-8a6b-f72b9e5b961c?resizing_type=fill&width=1920&height=335)

## 概述

本文概述了多个策略，主要用来减少粒子系统在单个和总体关卡上所做的工作量。第一篇教程已指出了执行额外工作的区域，本教程将介绍在这些区域做出更改的工具和选项。通常，减少了执行的工作量，就可以避免不必要的工作，或者选择开销更少的解决方案。

## 实例数：减少关卡中的系统数量

即使一个系统经过了优化，如果关卡中这样的系统太多，也会影响性能。默认情况下，我们会使用Niagara World Manager批量刷新同一系统的实例，但系统的实例越多，游戏线程上需要执行的工作就越多。通常，在模拟的粒子数量不变的情况下，实例越多，达到的性能就越低，但拥有更多的实例可以让Niagara以更高的粒度剔除粒子，所以你需要在少量大实例与大量小实例之间进行权衡。

## 实例数减少策略

总的来说，你可以使用两种方法减少实例数量，一是控制关卡中生成的系统数量，二是在系统生成后更激进地剔除系统。这两种方法各有长处，我们为这两种方法提供了工具，但通常最好先为项目设置一些核心效果类型，然后确保所有Niagara系统都获得了一个效果类型。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0c53863-d285-4eb3-a8d6-1030e207b47e/niagara-scalability-1.png)

### 伸缩性和效果类型

我们在Niagara中提供了许多伸缩性选项，包括可复用资产，这些资产可以应用于任何包含我们的效果类型资产的系统，并在Niagara资产的系统、发射器和渲染器层面直接重载。这些选项允许基于伸缩性级别（例如，中、高、超高和逐平台）进行控制，以便你区分每个级别对项目的每个目标平台的意义。许多此类设置将通过剔除方式来减少关卡中Niagara系统实例的数量，你还可以使用此类设置来减少生成的粒子数量、禁用开销高昂的渲染器，或者完全禁用发射器和系统。

### 系统即服务

减少实例数的另一种方法是充分利用现有的系统。对于发射物和冲击等粒子效果，经常出现在集中区域内短时间内连续产生多个实例的情况。这时你可以在一定程度上利用池化，防止为这些实例重新分配组件，但重新激活实例仍会产生开销，并且依赖之前已完成并已返回到池中的实例。系统即服务的方法会寻求向现有系统添加新粒子，而不是向某个关卡添加新系统。5.4引入了新功能来简化该工作流程，但在旧版本中你可使用用户参数。下一篇教程将更深入地介绍该策略。

## 发射器数：减少资产层面的开销

在编译Niagara系统时，尤其是从级联（Cascade）范式切换过来时，你会为每个唯一视觉元素向系统添加新的发射器，或者在行为上稍作变化，这是很自然的。但这可能会对性能带来负面影响，因为每个发射器都有相关开销。

Niagara使用虚拟机在CPU上运行脚本。这样做主要有两个原因：可扩展性和并行化。利用能够模拟GPU SIMD特性的虚拟机，我们可以让所有Niagara脚本默认同时为CPU和GPU工作。从一开始就将其编译为脚本，这可以为那些希望创建自己的脚本的用户降低进入门槛，从而提高可扩展性，同时为SIMD设计这些脚本，可以让Niagara更容易在CPU上并行执行。

使用该虚拟机的代价是每个发射器都有相关开销。即便是针对用于GPU模拟的粒子，我们仍在CPU上运行系统和发射器脚本，以便它们可以与游戏线程进行交互。这意味着，开销是固定的，而避免开销的唯一方法是，减少系统中的发射器数或关卡中的实例数。

对于5.4，我们提供了放弃可扩展性的实验性轻量级发射器，以及其他有利于性能的功能。在未来版本中，它们将在许多用例中成为减少发射器数的可行替代方案，因为这些发射器没有虚拟机开销。

### 缓解策略

下面是一些可用于减少系统中发射器数量的策略。总的来说就是，如果模拟的行为基本上差不多，只是视觉元素（渲染器）或初始化数据（比如起始位置）有所不同，那就将发射器合并起来。

#### 生成索引

生成索引可用于在发射器中创建粒子分组，这些分组具有共同的行为或起始数据。粒子将其生成索引保存为参数，这些参数可用于在Niagara脚本中动态选择不同数据。常见示例是创建分组，从而为对网格体的不同分段进行采样，否则会具有相同的行为。例如《Fortnite》中的轨迹便是从角色的手脚进行采样。在级联（Cascade）中，这需要为每个尾迹创建一个发射器，但在Niagara中，是利用四个生成分组为整体效果创建一个发射器，将每个分组设置为对角色骨架上的不同骨骼或插槽进行采样。

#### 多个渲染器

由于Niagara中，一个发射器可以有多个渲染器，因此可以从发射器模拟的每个粒子创建多个视觉元素。常见示例是，将光源渲染器与Sprite或网格体渲染器相结合，使粒子不仅可以发光，还能有相关几何形状。这还可以用来改变几何形状，只要随机选择不同的网格体或Sprite表示即可。此外，这还可用于根据距离从网格体过渡到Sprite。你可以将不同参数绑定到不同渲染器，从而在模拟中形成轻微变化。例如，你可以为每个渲染器设置不同的位置绑定，从而为其中一个渲染提供偏移，同时仍跟进另一个渲染器。

网格体渲染器允许指定网格体数组，并使用网格体索引绑定来控制要渲染数组中的哪一个网格体。它可以用来代替多个渲染器，从而提供更广泛的网格体形状，而无需复制渲染器并设置其启用和禁用。 可视性标签和网格体数组都有相关开销。总的来说，它们应该胜过多用一个发射器，但在多个发射器或这些策略之间做出决定时，可能需要考虑项目的不同性能特点。如果你的项目需要进一步优化，你可能需要比较这两者。

## 池化：管理内存并减少分配

通过"在位置生产系统（Spawn System at Location}"和"生成附着系统（Spawn System Attached）"生成系统时，Niagara函数库允许选择池化方法。池化后，基于相同资产的Niagara组件不会正常进行分配和垃圾回收。相反，不再使用的已分配组件会被保存在池中，并在生成使用了相同资产的新组件时复用。对于频繁使用的组件，这避免了分配和垃圾回收的开销。

Niagara系统可以控制池的大小，并在"性能"下的"系统属性"中启动它。启动池可以减少运行时分配，但如果资产是动态加载的，则可能导致卡顿。

## 模拟开销：优化Niagara脚本

### GPU与CPU

正如上文的发射器数开销部分所指出的，所有Niagara模拟都有CPU开销。若在CPU与GPU模拟之间进行选择，只会改变粒子模拟的目标，即只有粒子生成、粒子更新、模拟阶段中的脚本会随着发射器所选择的模拟目标发生改变。

粒子脚本具有最大的并行机会，因此如果选择GPU，它们获益最多，而且在大多数情况下，GPU模拟具有更高的性能，且可以模拟更多的粒子。对于粒子数量较少的发射器，CPU模拟可能更适合，因为GPU资源不能按粒度划分。具体划分取决于硬件，但是1个粒子的模拟可能与64个粒子的模拟占用相同的资源。

还要注意的是，在某些项目和某些平台上，GPU会成为瓶颈，CPU模拟可能更适合。这对于移动设备等GPU内存较小的平台而言尤为常见。反过来说，受CPU限制的项目也可以通过改为GPU模拟来获益，即使那是仅有少量粒子的模拟。这就是务必要在开发项目时验证这些性能假设的众多原因之一。

## 其他最佳实践

分析项目可以帮你获得最具体的数据，从而了解项目瓶颈所在，这也是发现性能问题的最好方法，但最佳实践可以在很大程度上帮你避开在内容创作过程中常见或容易忽略的错误。这些最佳实践都是Epic视觉效果美术师在处理《Fortnite》等项目时积累的经验，是我们在团队中分享的一般建议。但也会有例外情况，最终决定还要是取决于各个项目的情况，即在何处牺牲性能以换取功能和视觉效果。

**固定边界与动态边界**

一般来说，固定边界的性能会比动态边界更好，因为它的工作量更少。但也有例外，例如，一个范围虽小但传播距离却很远的效果，比如子弹轨迹穿越一个大关卡。它的固定边界将比实际视觉效果大得多，但在大部分时间里，效果将在视线之外，但由于其边界，它仍可能相关。

除了更改边界类型之外，我们还有控制台变量来降低动态变换更新频率

-   fx.Niagara.EmitterBounds.DynamicSnapValue
-   fx.Niagara.EmitterBounds.DynamicExpandMultiplier
-   fx.Niagara.EmitterBounds.FixedExpandMultiplier

**预热**

最好避免对粒子系统进行预热，因为需要按顺序对预热中的每一帧进行求值，这很容易导致卡顿。

**网格体资产卫生（Mesh Asset Hygiene）**

简化Niagara使用的静态网格体资产，将提高生成和渲染这些网格的性能，而不改变它们的几何形状。例如：

-   从静态网格体资产中移除碰撞。
-   如果不需要阴影，则关闭Niagara使用的LOD上的"投射阴影（Cast Shadow）"。例如使用透明材质时。
-   将LOD的距离场分辨率比例设置为0.0，从而关闭距离场
-   确保网格体没有额外的UV通道。

**粒子大迸发**

如果需要创建大量粒子，在同一帧中生成所有粒子可能会导致卡顿。将生成过程分散到多个帧中，可以分散工作量，避免这些卡顿。

**当前帧数据**

对于不依赖最新游戏数据的粒子，停用"需要当前帧数据（Require Current Frame Data）"，这将使得Niagara能在帧中尽早地开始刷新，从而将工作分散在更长的时间段里。对于不会移动或不对移动对象进行采样的粒子系统，通常会停用此选项，但一些移动粒子可以对最后一帧的数据进行采样，而且看起来仍然很好。尝试停用该标志，然后查看是否有明显变化，这是很有帮助的。

**向上移动复杂操作在堆栈中的位置**

如果是对于每个粒子或发射器来说都一样的复杂工作，通常可以向上移动这些工作在堆栈中的位置，以避免经常重复这种工作。此外，在发射器和系统脚本中读取信息，可以提高与数据接口和Niagara参数集的交互性能。即便一个模块的所有工作对于每个粒子而言都不同，采样方面的工作往往还是可以分开处理，这仍然有助于提升性能。

**数据接口（Data Interfaces）**

与复杂工作类似，发射器和粒子有重复数据接口会导致使用不必要的内存。如果可以将数据接口移至堆栈中更高的位置，则应该可以提高性能。

将数据接口作为用户参数也会使用更多的内存，因为系统会为每个Niagara组件新建一个UObject，或者每次在现有Niagara组件上调用Set Asset时，系统都会新建一个UObject。

**避免事件**

使用属性读取器数据接口的粒子读取，通常会比事件的性能更高，而且通常可以达到相同的行为。

**排序（Sorting）**

默认停用排序，但如果启用，排序任务默认在GPU上运行，这会增加GPU开销，还会占用索引缓冲区中的额外内存。这可能导致绘制性能较差。

控制台变量可以强制CPU发射器在CPU上排序

-   Niagara.GPUSorting.CPUToGPUThreshold
-   Niagara.GPUCulling.CPUToGPUThreshold

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/scalability-and-best-practices-for-niagara#%E6%A6%82%E8%BF%B0)
-   [实例数：减少关卡中的系统数量](/documentation/zh-cn/unreal-engine/scalability-and-best-practices-for-niagara#%E5%AE%9E%E4%BE%8B%E6%95%B0%EF%BC%9A%E5%87%8F%E5%B0%91%E5%85%B3%E5%8D%A1%E4%B8%AD%E7%9A%84%E7%B3%BB%E7%BB%9F%E6%95%B0%E9%87%8F)
-   [实例数减少策略](/documentation/zh-cn/unreal-engine/scalability-and-best-practices-for-niagara#%E5%AE%9E%E4%BE%8B%E6%95%B0%E5%87%8F%E5%B0%91%E7%AD%96%E7%95%A5)
-   [伸缩性和效果类型](/documentation/zh-cn/unreal-engine/scalability-and-best-practices-for-niagara#%E4%BC%B8%E7%BC%A9%E6%80%A7%E5%92%8C%E6%95%88%E6%9E%9C%E7%B1%BB%E5%9E%8B)
-   [系统即服务](/documentation/zh-cn/unreal-engine/scalability-and-best-practices-for-niagara#%E7%B3%BB%E7%BB%9F%E5%8D%B3%E6%9C%8D%E5%8A%A1)
-   [发射器数：减少资产层面的开销](/documentation/zh-cn/unreal-engine/scalability-and-best-practices-for-niagara#%E5%8F%91%E5%B0%84%E5%99%A8%E6%95%B0%EF%BC%9A%E5%87%8F%E5%B0%91%E8%B5%84%E4%BA%A7%E5%B1%82%E9%9D%A2%E7%9A%84%E5%BC%80%E9%94%80)
-   [缓解策略](/documentation/zh-cn/unreal-engine/scalability-and-best-practices-for-niagara#%E7%BC%93%E8%A7%A3%E7%AD%96%E7%95%A5)
-   [生成索引](/documentation/zh-cn/unreal-engine/scalability-and-best-practices-for-niagara#%E7%94%9F%E6%88%90%E7%B4%A2%E5%BC%95)
-   [多个渲染器](/documentation/zh-cn/unreal-engine/scalability-and-best-practices-for-niagara#%E5%A4%9A%E4%B8%AA%E6%B8%B2%E6%9F%93%E5%99%A8)
-   [池化：管理内存并减少分配](/documentation/zh-cn/unreal-engine/scalability-and-best-practices-for-niagara#%E6%B1%A0%E5%8C%96%EF%BC%9A%E7%AE%A1%E7%90%86%E5%86%85%E5%AD%98%E5%B9%B6%E5%87%8F%E5%B0%91%E5%88%86%E9%85%8D)
-   [模拟开销：优化Niagara脚本](/documentation/zh-cn/unreal-engine/scalability-and-best-practices-for-niagara#%E6%A8%A1%E6%8B%9F%E5%BC%80%E9%94%80%EF%BC%9A%E4%BC%98%E5%8C%96niagara%E8%84%9A%E6%9C%AC)
-   [GPU与CPU](/documentation/zh-cn/unreal-engine/scalability-and-best-practices-for-niagara#gpu%E4%B8%8Ecpu)
-   [其他最佳实践](/documentation/zh-cn/unreal-engine/scalability-and-best-practices-for-niagara#%E5%85%B6%E4%BB%96%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)
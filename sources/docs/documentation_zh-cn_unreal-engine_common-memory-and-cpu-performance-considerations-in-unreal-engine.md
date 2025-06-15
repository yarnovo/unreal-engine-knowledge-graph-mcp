# 虚幻引擎中的常见内存和CPU性能注意事项 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/common-memory-and-cpu-performance-considerations-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:41:29.921Z

---

目录

下文各节分别概述了可能影响应用程序性能的情况，并给出了替代方法和变通方法的指导，以帮助你解决可能遇到的问题。

## 在继续阅读之前

如果你不熟悉虚幻引擎的性能分析，强烈建议先阅读[性能分析与配置简介](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/introduction-to-performance-profiling-and-configuration-in-unreal-engine)，以获取本主题的基础知识，再行继续阅读下文章节。

## 受管理对象、垃圾回收和处理峰值

在虚幻引擎中，**UObjects**及其所有派生类（例如Actor和数据资产）均受引擎的*垃圾回收器*的*管理*。 垃圾回收器会定期清理世界中被删除的UObject，并清理对该对象的任何现存引用。

相比之下，标准C++对象则*不受管理*。 这意味着当你删除对象的副本或将其无效化时，你必须手动清理对它的引用。 如果处理不慎，这就会带来风险，因为清理逻辑中的任何漏洞都可能导致内存泄漏（如果对象未被清理）以及无效引用（如果对象被删除，但引用仍然存在）。

支持受管理对象会导致额外内存占用。 UObjects会携带额外的元数据，如`FName`和`Outer`引用等，这些元数据都会占用额外的内存。 垃圾回收器必须每隔一段时间运行一次才能自动清理对象，因此后端系统必须能够监控对象被引用的所有位置。 在垃圾回收器运行的帧中经常会出现处理峰值，尤其是在应用程序最近销毁了大量对象的情况下。

你可以前往**项目设置（Project Settings）** > **引擎（Engine）** > **垃圾回收（Garbage Collection）**，配置垃圾回收的设置，包括垃圾回收间隔、在任何给定时间内可以清理的最大对象数，以及垃圾回收处理方式的其他设置。 虽然在项目早期不太可能需要微调，但这能为你提供一些选项，让你能根据项目的独特需求来定制虚幻引擎垃圾回收器的行为方式。

[![引擎的垃圾回收项目设置。](https://dev.epicgames.com/community/api/documentation/image/56be8ed0-a324-4574-8372-d6b722031bba?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/56be8ed0-a324-4574-8372-d6b722031bba?resizing_type=fit)

建议使用自动垃圾回收功能。 如有必要，也可以使用蓝图的**Collect Garbage**节点或C++的`UObjectGlobals::CollectGarbage`函数，手动调用垃圾回收器。

[![Collect Garbage节点](https://dev.epicgames.com/community/api/documentation/image/ab15fe5e-3022-40ec-8f68-5a577fd818af?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ab15fe5e-3022-40ec-8f68-5a577fd818af?resizing_type=fit)

这样做将导致处理峰值，但有时手动调用垃圾回收可以避免垃圾在后台堆积，垃圾堆积可能在稍后自动运行垃圾回收时导致更大的峰值。

手动垃圾回收适用于以下情况：

-   从用户体验的角度来看，程序所处的状态可以容忍帧峰值，例如显示加载屏幕期间。 这时，手动垃圾回收可以减少其在更明显或更难以忍受的状态下发生的几率。
    
-   在执行会分配大量内存的操作前，如果你在测试时发现该操作会导致内存不足崩溃或页面交换卡顿，因此必须事先立即执行垃圾回收。
    

## 创建和销毁对象vs. 对象池化

要创建对象，计算机必须分配一个新的内存块来保存该对象的副本，然后将其与所需的子对象一起初始化。 在销毁对象时，必须删除该信息、取消内存分配，并清除应用程序代码中别处可能存在的对该对象的引用。

这两种操作都可能造成大量负载，当其初始化涉及到与其他系统协调时尤其如此。 在大多数情况下，虚幻引擎处理这些操作的效率都很高，让你可以在PC和主机端的大量上下文中安全地进行这些操作，但是在CPU处理余量有限的项目中，你可能需要使用*对象池化*来代替以上做法。 对象池化（Object Pooling）是指预先创建所需对象的所有副本，将它们分配到内存中，然后将它们禁用或隐藏起来，等到需要时再使用。

对象的级别越高，创建和销毁对象的开销就越高。 与组件相比，池化对Actor的作用更大；而与其他UObjects相比，池化对组件的作用更大。 这是因为，创建一个Actor的开销还包括将其插入世界的Actor列表、创建其组件，以及将Actor及其组件注册到渲染和物理等附加的基础架构中。 对于在创建和销毁时不会与其他类交互的C++结构而言，尝试将它们池化的效率可能反而会低于让系统分配器回收其原始内存的效率。

举例说明，设想一款发射弹丸的武器。 通常情况下，武器在开火时会生成一个弹丸，而弹丸会在撞击到其他对象时自动销毁。

利用对象池化功能，武器就不需要在每次开火时都生成一枚新的弹丸，而是预先生成在任何给定时间内可以激活的最大弹丸数，然后将其隐藏并禁用。 这组被禁用的弹丸就是对象池。 当武器发射弹丸时，它将从对象池中取出弹丸，将其移动到武器的末端，取消隐藏并启用弹丸，然后按正确方向初始化弹丸。 然后，当弹丸击中目标时，它会隐藏并禁用自己，同时回到对象池中，以便之后再次使用。

[![](https://dev.epicgames.com/community/api/documentation/image/0c74f33a-b515-4cde-8904-926213b97e67?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/0c74f33a-b515-4cde-8904-926213b97e67?resizing_type=fit)

对象池的好处是让你无需创建或销毁对象，不必花大量处理时间来初始化和清理对象。 代价是即使对象池中的对象处于非活动状态，也会占用本可以不占用的内存。 不过，在许多情况下，你本来就需要留出对象池所需最大对象数量所占的空间。 此外，这些对象的内存也将更为稳定，因为其分配和清理使用的是大块内存（而非小块内存），从而降低了出现*内存碎片*的几率。

## On-Tick逻辑vs. 回调、定时器和计划逻辑

可更新UObject和Actor的更新（Tick）事件提供了一种创建逐帧重复逻辑的方法。 这对于处理实时的移动而言非常适用。 但是，将Tick用于偶发而非连续的例程可能会浪费CPU的性能。

另外，使用逻辑来检查变量是否每帧都发生变化，通常不是最佳做法，比如下方示例。 一个类使用Tick来重复地检查另一个类的变量是否发生变化。

```
UCLASS()
class AMyActor : public AActor
{
	GENERATED_BODY()
public:
	//Set this reference in the details panel.
	UPROPERTY(BlueprintReadOnly, EditAnywhere)
	AChildActor* ChildActor;

protected:
```

展开代码复制完整片段(23行长度)

```
UCLASS()
class AChildActor : public AActor
{
	GENERATED_BODY()
public:
int32 getMyInt(){
	return MyInt;
}
private:
	int32 myInt = 0;
```

展开代码复制完整片段(11行长度)

与其使用Tick来监控值，不如创建自定义的Setter函数来包围更改变量的操作，然后仅在更改该值时，调用另一个函数或事件来执行所需的逻辑。

下方示例包含了上一个示例中的类，但转而使用了回调，并仅在变量发生变化时才执行操作：

```
UCLASS()
class AMyActor : public AActor
{
	GENERATED_BODY()

public:
	void OnChildIntChanged(int32 NewValue)
{
		if (newValue > 3)
		{
```

展开代码复制完整片段(20行长度)

```
UCLASS()
class AChildActor : public AActor
{
	GENERATED_BODY()

public:
	//Set this reference in the details panel.
	UPROPERTY(BlueprintReadOnly, EditAnywhere)
	AMyActor* ParentActor;

```

展开代码复制完整片段(24行长度)

这样可以确保仅在变量发生变化时才运行逻辑，而无需每帧都查询一个值。

不过，事件驱动的方法也可能并非最优选项，这具体取决于条件变化的频率。 如果某个事件会每帧触发多次，或者如果某个函数与许多事件相连，而这些事件都可能在同一帧中全都发生变化，那么使用**Tick**或"命令模式"就可能更为高效。 这样可以避免计算在渲染前就被覆盖的结果。

如果要安排一个事件在设定的时间段后发生，你可以启动一个**定时器**，定时器将暂时记录流逝的时间，直到事件结束，然后自行清理。 或者，你也可以使用蓝图事件图表中的**Delay**节点。

如果你需要经常重复执行某个逻辑，但又不需要每帧都执行，那么可以考虑以一定的帧间隔或秒间隔执行该逻辑。 你可以对单个对象和Actor组件这样做，将其Tick间隔设置为一定的秒数即可。 或者，你也可以为**Tick**函数中的逻辑子集创建间隔。 虽然这样做仍然需要累积和重置一个变量，但比起逐帧运行逻辑，开销还是低得多。

## 异步vs. 同步逻辑

*同步*逻辑指按顺序从头到尾完成操作。 默认情况下，使用蓝图或C++编写的大多数逻辑都是同步逻辑。 例如，如果你用蓝图创建了一个事件，但没有添加任何Delay节点、定时器或Gameplay任务，那么源自该蓝图事件的所有逻辑都将在同一帧上同时执行。 在这些逻辑执行完毕之前，该帧将无法完成处理。 在运行大量操作（尤其是必须从内存中加载或卸载的大型数据集或大型对象）时，这可能会导致明显的处理峰值。

*异步*逻辑是指并行完成操作，可以是字面意义上的同时完成（在不同的CPU内核上），也可以是逻辑意义上的同时完成（以小块交错，技术上在底层同步执行）。 异步操作会一直运行到完成为止，而主程序则会继续运行，无需等待操作的跟进。 通常而言，异步操作会使用回调来表示其完成状况。

虚幻引擎中的一些框架（例如世界分区系统和各种按需的内容交付系统）已经实现异步处理了。 针对你自己的项目，请考虑实施异步逻辑，将操作分配到一段时间内，从而避免过度依赖于单个操作或单个帧。

举例来说，在波次防御类游戏中，你可能需要加载并实例化大量敌人，比如30个或更多。 因为在运行时创建一个新Actor的开销已经很高了，所以试图在同一帧内处理所有Actor会显得非常繁琐。 作为替代方法，你可以创建一个异步操作，每帧最多只生成5个敌人，直到达到指定上限或用尽所有指定的生成位置为止。这样一来，你就可以在6帧内生成所有的30个敌人。此时你就可以发出信号，表示大规模生成操作已完成。 这样一来，你不但显著降低了生成大量敌人的工作量，而且让大多数玩家都不会注意到生成敌人的耗时，因为这一过程仅会持续约十分之一秒或五分之一秒。

## 虚幻引擎中的并行处理

并行处理是一种异步处理方式，即在同一台计算机上以不同的线程或CPU核心处理操作。 虚幻引擎中并行处理的部分示例如下：

-   解析软指针。
    
-   在后台加载关卡和资产。
    
-   通过在线内容交付系统异步加载资产。
    

*线程*是CPU或GPU处理指令所用的专用路径。 大多数CPU都拥有复数的*核心*，这些核心本身就是独立的处理器，而每个核心都可以拥有多个线程。 利用并行处理是确保程序不会遇到CPU进程瓶颈的关键，在处理复杂任务和大量数据时尤其如此。

### 主要处理线程

虚幻引擎为以下功能提供了专用线程：

线程名称

说明

游戏

用C++和蓝图处理UObject和Actor逻辑以及UI逻辑。 你将在此线程上进行大部分编程工作。

渲染

将场景结构转换为绘制命令。

RHI

向GPU发送绘制命令。

任务池（Task Pools）

在可重复使用的线程中处理各种任务。

音频

处理声音和音乐。

加载

处理数据的加载和卸载。

你可以在Unreal Insights的**Timing Insights**窗口中查看这些线程。

由于游戏线程需要处理大量逻辑，因此你必须仔细分析和优化代码。

### 创建自己的线程逻辑

虚幻引擎提供了多种资源供你添加自己的并行处理逻辑：

-   [任务系统](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/tasks-systems-in-unreal-engine) 提供了一套强大且相对轻量的框架，用于将逻辑划分为可在不同线程上并行执行的任务。
    
-   FRunnable为在任意线程上执行函数提供了最直接的底层接口。 除非你知道自己在执行什么操作，并且有合理的理由使用专用线程而不是线程池，否则应避免使用它。
    

请谨慎自行创建线程逻辑，因为这可能导致*竞争条件*，即如果操作以意料之外的顺序执行，就会发生错误。

此外，[线程渲染](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine)页面还提供了关于渲染专用线程逻辑的信息。

## 着色器编译、帧率卡顿和PSO缓存

虚幻引擎会将材质指令编译为着色器，以便在GPU上执行。 虽然在编译完成后，材质的整体性能会大幅提升，但编译着色器的操作可能会导致显著的处理峰值，这反过来又会造成暂时但明显的帧率卡顿。

为解决此问题，虚幻引擎实现了**PSO缓存**。 你可以运行和测试应用程序并[手动收集PSO](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/manually-creating-bundled-pso-caches-in-unreal-engine)，也可以使用[PSO预缓存](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/pso-precaching-for-unreal-engine)自动生成PSO。 无论你用哪种方式，其原理都是记录应用程序运行时显卡可能呈现的所有状态，然后缓存这些数据并将其打包，供后续构建使用。 这样一来就大大减少了运行时必须进行的着色器编译，因为你可以提前加载大部分着色器，从而减少了加载新区域和材质时用户会遇到的卡顿现象。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [在继续阅读之前](/documentation/zh-cn/unreal-engine/common-memory-and-cpu-performance-considerations-in-unreal-engine#%E5%9C%A8%E7%BB%A7%E7%BB%AD%E9%98%85%E8%AF%BB%E4%B9%8B%E5%89%8D)
-   [受管理对象、垃圾回收和处理峰值](/documentation/zh-cn/unreal-engine/common-memory-and-cpu-performance-considerations-in-unreal-engine#%E5%8F%97%E7%AE%A1%E7%90%86%E5%AF%B9%E8%B1%A1%E3%80%81%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E5%92%8C%E5%A4%84%E7%90%86%E5%B3%B0%E5%80%BC)
-   [创建和销毁对象vs. 对象池化](/documentation/zh-cn/unreal-engine/common-memory-and-cpu-performance-considerations-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E9%94%80%E6%AF%81%E5%AF%B9%E8%B1%A1vs%E5%AF%B9%E8%B1%A1%E6%B1%A0%E5%8C%96)
-   [On-Tick逻辑vs. 回调、定时器和计划逻辑](/documentation/zh-cn/unreal-engine/common-memory-and-cpu-performance-considerations-in-unreal-engine#on-tick%E9%80%BB%E8%BE%91vs%E5%9B%9E%E8%B0%83%E3%80%81%E5%AE%9A%E6%97%B6%E5%99%A8%E5%92%8C%E8%AE%A1%E5%88%92%E9%80%BB%E8%BE%91)
-   [异步vs. 同步逻辑](/documentation/zh-cn/unreal-engine/common-memory-and-cpu-performance-considerations-in-unreal-engine#%E5%BC%82%E6%AD%A5vs%E5%90%8C%E6%AD%A5%E9%80%BB%E8%BE%91)
-   [虚幻引擎中的并行处理](/documentation/zh-cn/unreal-engine/common-memory-and-cpu-performance-considerations-in-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%B8%AD%E7%9A%84%E5%B9%B6%E8%A1%8C%E5%A4%84%E7%90%86)
-   [主要处理线程](/documentation/zh-cn/unreal-engine/common-memory-and-cpu-performance-considerations-in-unreal-engine#%E4%B8%BB%E8%A6%81%E5%A4%84%E7%90%86%E7%BA%BF%E7%A8%8B)
-   [创建自己的线程逻辑](/documentation/zh-cn/unreal-engine/common-memory-and-cpu-performance-considerations-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84%E7%BA%BF%E7%A8%8B%E9%80%BB%E8%BE%91)
-   [着色器编译、帧率卡顿和PSO缓存](/documentation/zh-cn/unreal-engine/common-memory-and-cpu-performance-considerations-in-unreal-engine#%E7%9D%80%E8%89%B2%E5%99%A8%E7%BC%96%E8%AF%91%E3%80%81%E5%B8%A7%E7%8E%87%E5%8D%A1%E9%A1%BF%E5%92%8Cpso%E7%BC%93%E5%AD%98)
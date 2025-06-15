# 虚幻引擎Actor生命周期 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-actor-lifecycle
> 
> 生成时间: 2025-06-14T19:46:50.016Z

---

目录

![Actor生命周期](https://dev.epicgames.com/community/api/documentation/image/883fcebe-d18f-4617-8992-762e82363289?resizing_type=fill&width=1920&height=335)

本文档大致介绍了[Actor](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine)的生命周期，其中包括：

-   如何在关卡中实例化或生成Actor，包括如何初始化Actor。
    
-   如何将Actor标识为PendingKill，然后通过垃圾回收移除或销毁。
    
-   下方流程图展示了如何实例化Actor的主要路径。无论Actor是如何创建的，它们的销毁路径均相同。
    

## 生命周期详解

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e63c12cc-0186-4e34-a7bc-5ca774b0bce6/actorlifecycle1.png)

## 从磁盘加载

从磁盘加载（Load From Disk）路径适用于已经在关卡中的Actor，如当 [**UEngine::LoadMap**](/documentation/en-us/unreal-engine/API/Runtime/Engine/Engine/UEngine/LoadMap) 发生时，或当[关卡流送](/documentation/zh-cn/unreal-engine/level-streaming-in-unreal-engine)调用 [**UWorld::AddToWorld**](/documentation/en-us/unreal-engine/API/Runtime/Engine/Engine/UWorld/AddToWorld) 时。

1.  从磁盘加载包/关卡中的Actor。
2.  序列化的Actor从磁盘加载完成后调用 [**PostLoad**](/documentation/en-us/unreal-engine/API/Runtime/CoreUObject/UObject/UObject/PostLoad) 。所有自定义版本化和修复操作应在此处执行。PostLoad与 [**AActor::PostActorCreated**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/PostActorCreated) 互斥。
3.  世界调用 [**UAISystemBase::InitializeActorsForPlay**](/documentation/en-us/unreal-engine/API/Runtime/Engine/AI/UAISystemBase/InitializeActorsForPlay) ，以准备Actor启动Gameplay。
4.  关卡为未初始化的Actor和无缝行程结转调用 [**ULevel::RouteActorInitialize**](/documentation/en-us/unreal-engine/API/Runtime/Engine/Engine/ULevel/RouteActorInitialize) 。
    
    1.  在Actor的组件上调用InitializeComponent之前调用 [**AActor::PreInitializeComponents**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/PreInitializeComponents) 。
    2.  [**UActorComponent::InitializeComponent**](/documentation/en-us/unreal-engine/API/Runtime/Engine/Components/UActorComponent/InitializeComponent) 是Actor上定义的每个组件的创建辅助函数。
    3.  在Actor的组件初始化后，调用 [**AActor::PostInitializeComponents**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/PostInitializeComponents) 。
5.  关卡启动后，调用 [**AActor::BeginPlay**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/BeginPlay) 。

## 在编辑器中运行

在"在编辑器中运行（Play in Editor）"路径中，Actor是从编辑器中复制而来，并非从磁盘中加载。然后，复制的Actor按与"从磁盘加载（Load From Disk）"路径中所述的相同流程初始化。

1.  将编辑器中的Actor复制到新世界中。
2.  调用 [**UObject::PostDuplicate**](/documentation/en-us/unreal-engine/API/Runtime/CoreUObject/UObject/UObject/PostDuplicate) 。
3.  [**UAISystemBase::InitializeActorsForPlay**](/documentation/en-us/unreal-engine/API/Runtime/Engine/AI/UAISystemBase/InitializeActorsForPlay)
4.  为未初始化的Actor调用 [**ULevel::RouteActorInitialize**](/documentation/en-us/unreal-engine/API/Runtime/Engine/Engine/ULevel/RouteActorInitialize) ，涵盖无缝行程结转。
    
    1.  在Actor的组件上调用InitializeComponent之前调用 [**AActor::PreInitializeComponents**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/PreInitializeComponents) 。
    2.  [**UActorComponent::InitializeComponent**](/documentation/en-us/unreal-engine/API/Runtime/Engine/Components/UActorComponent/InitializeComponent) 是Actor上定义的每个组件的创建辅助函数。
    3.  在Actor的组件初始化后，调用 [**AActor::PostInitializeComponents**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/PostInitializeComponents) 。
5.  关卡启动后，调用 [**AActor::BeginPlay**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/BeginPlay) 。

## 生成

当你生成Actorr的实例时，这是相关路径：

1.  调用 [**UWorld::SpawnActor**](/documentation/en-us/unreal-engine/API/Runtime/Engine/Engine/UWorld/SpawnActor) 。
2.  在世界中生成Actor后，调用 [**AActor::PostSpawnInitialize**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/PostSpawnInitialize) 。
3.  已生成Actor创建后为其调用 [**AActor::PostActorCreated**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/PostActorCreated) ，所有构造函数实现行为应在此发生。PostActorCreated与[PostLoad](/documentation/en-us/unreal-engine/API/Runtime/CoreUObject/UObject/UObject/PostLoad)互斥。
4.  [**AActor::ExecuteConstruction**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/ExecuteConstruction) ：
5.  [**AActor::OnConstruction**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/OnConstruction) \- Actor的构建，蓝图Actor的组件在此处创建，蓝图变量在此处初始化。
6.  [**AActor::PostActorConstruction**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/PostActorConstruction) ：
    
    1.  在Actor的组件上调用InitializeComponent之前调用 [**AActor::PreInitializeComponents**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/PreInitializeComponents) 。
    2.  [**UActorComponent::InitializeComponent**](/documentation/en-us/unreal-engine/API/Runtime/Engine/Components/UActorComponent/InitializeComponent) 是Actor上定义的每个组件的创建辅助函数。
    3.  在Actor的组件初始化后，调用 [**AActor::PostInitializeComponents**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/PostInitializeComponents) 。
7.  [**UWorld::OnActorSpawned**](/documentation/en-us/unreal-engine/API/Runtime/Engine/Engine/UWorld/AddOnActorSpawnedHandler) 在UWorld上播放。
8.  调用 [**AActor::BeginPlay**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/BeginPlay) 。

## 延迟生成

将任意属性设为"生成时公开（Expose on Spawn）"即可延迟Actor生成。

1.  [**UWorld::SpawnActorDeferred**](/documentation/en-us/unreal-engine/API/Runtime/Engine/Engine/UWorld/SpawnActorDeferred) 旨在生成流程性Actor，允许在蓝图构建脚本之前进行额外设置。
2.  SpawnActor中的所有操作发生，但在 [**AActor::PostActorCreated**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/PostActorCreated) 之后发生以下操作：
    
    1.  通过一个有效但不完整的Actor实例设置并调用多个"初始化函数"。
    2.  调用 [**AActor::FinishSpawning**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/FinishSpawning) 以最终确定Actor，在Spawn Actor行中的 [**AActor::ExecuteConstruction**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/ExecuteConstruction) 选取。

## Actor生命周期终点

你可以通过多种方式销毁Actor，但从世界中删除它们的方式始终如一。在Gameplay期间，你可以调用以下函数，但是，函数完全可选，因为许多Actor在运行中不会实际销毁（参阅垃圾回收）：

-   当游戏在任何时候需要移除Actor时，手动调用 [**AActor::Destroy**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/Destroy) ，但Gameplay仍在继续。Actor被标记为等待销毁并从关卡的Actor数组中移除。
    
-   [**AActor::EndPlay**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/EndPlay) 在数个地方调用，旨在保证Actor的生命走向终点。在游戏过程中，如果包含Actor的流送关卡被卸载，Destroy将调用此方法和关卡过渡（Level Transitions）。
    
-   调用EndPlay的全部情形：
    
    -   对Destroy显式调用。
    -   "在编辑器中运行（Play in Editor）"终结。
    -   关卡过渡（无缝行程或加载地图）。
    -   包含Actor的流送关卡被卸载。
    -   Actor的生命周期已过。
    -   应用程序关闭（全部Actor被销毁）。

无论这些情形出现的方式如何，Actor都将被标记为 `RF_PendingKill` ，因此在下个垃圾回收周期中，UE会将其从内存中解除分配。此外，可以考虑使用更清洁的 `FWeakObjectPtr<AActor>` 代替手动检查"等待销毁"。

Actor不一定在调用EndPlay时被销毁。例如，如果 `s.ForceGCAfterLevelStreamedOut` 为 `false` ，并快速重新加载子关卡，则将调用Actor的EndPlay，但Actor可能"复活"，并与之前存在的Actor完全相同，其本地变量也一样，未重新初始化为其默认值

-   [**AActor::OnDestroyed**](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor) \- 这是对Destroy的旧有反应。我们推荐你将此处的逻辑移到EndPlay，因为会由关卡过渡和其他游戏清理函数调用。

## 垃圾回收

一个对象被标记待销毁的一段时间后，垃圾回收会将其从内存中移除，释放其使用的资源。

在销毁过程中，调用以下函数：

1.  [**UObject::BeginDestroy**](/documentation/en-us/unreal-engine/API/Runtime/CoreUObject/UObject/UObject/BeginDestroy) \- 对象可利用此机会释放内存并处理其他多线程资源（即：图像线程代理对象）。与销毁相关的大多数Gameplay功能理应在EndPlay中更早地处理。
2.  [**UObject::IsReadyForFinishDestroy**](/documentation/en-us/unreal-engine/API/Runtime/CoreUObject/UObject/UObject/IsReadyForFinishDestroy) \- 垃圾回收过程将调用此函数，以确定对象是否可以永久解除分配。返回false，此函数即可延迟对象的实际销毁，直到下一个垃圾回收过程。
3.  [**UObject::FinishDestroy**](/documentation/en-us/unreal-engine/API/Runtime/CoreUObject/UObject/UObject/FinishDestroy) \- 最后，对象将被销毁，这也是释放内部数据结构的机会。这是内存释放前的最后一次调用。

### 高级垃圾回收

**虚幻引擎** 中的[垃圾回收](/documentation/zh-cn/unreal-engine/unreal-object-handling-in-unreal-engine)过程将构建要一并销毁对象的群集。较之于单个删除对象， **群集处理** 可减少垃圾回收相关的总时间和总内存抖动。 随着对象加载，可能创建子对象。将对象与其子对象组合到垃圾回收器的单个群集后，引擎可延迟释放群集使用的资源，直到整个对象可被释放时一次性释放全部资源。

多数项目中无需对垃圾回收进行配置或修改，但存在一些特定情况 - 可以如下方式对垃圾回收器的"集群"行为进行调整，以提高效率：

-   **群集处理（Clustering）** - 关闭集群。在 **项目设置（Project Settings）** 中的 **垃圾回收（Garbage Collection）** 部分下，可将 **创建垃圾回收器UObject群集（Create Garbage Collector UObject Clusters）** 选项设为 false。对多数项目而言，此操作将导致垃圾回收效率降低，因此只建议在性能测试证明其绝对有益的情况下使用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/229848b8-9bed-4ac0-8e97-07fc67d0eef8/advancedgc.png)

垃圾回收的集群合并选项位于项目设置菜单中。

-   [actors](https://dev.epicgames.com/community/search?query=actors)
-   [architecture](https://dev.epicgames.com/community/search?query=architecture)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [生命周期详解](/documentation/zh-cn/unreal-engine/unreal-engine-actor-lifecycle#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E8%AF%A6%E8%A7%A3)
-   [从磁盘加载](/documentation/zh-cn/unreal-engine/unreal-engine-actor-lifecycle#%E4%BB%8E%E7%A3%81%E7%9B%98%E5%8A%A0%E8%BD%BD)
-   [在编辑器中运行](/documentation/zh-cn/unreal-engine/unreal-engine-actor-lifecycle#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E8%BF%90%E8%A1%8C)
-   [生成](/documentation/zh-cn/unreal-engine/unreal-engine-actor-lifecycle#%E7%94%9F%E6%88%90)
-   [延迟生成](/documentation/zh-cn/unreal-engine/unreal-engine-actor-lifecycle#%E5%BB%B6%E8%BF%9F%E7%94%9F%E6%88%90)
-   [Actor生命周期终点](/documentation/zh-cn/unreal-engine/unreal-engine-actor-lifecycle#actor%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E7%BB%88%E7%82%B9)
-   [垃圾回收](/documentation/zh-cn/unreal-engine/unreal-engine-actor-lifecycle#%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6)
-   [高级垃圾回收](/documentation/zh-cn/unreal-engine/unreal-engine-actor-lifecycle#%E9%AB%98%E7%BA%A7%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6)
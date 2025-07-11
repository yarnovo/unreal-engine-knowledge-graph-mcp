# 虚幻引擎线程渲染 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:25:02.641Z

---

目录

![线程渲染](https://dev.epicgames.com/community/api/documentation/image/2e9fa1af-76bf-4856-a554-23f52b82278f?resizing_type=fill&width=1920&height=335)

## 渲染线程

在虚幻引擎中，整个渲染器在其自身的线程中执行操作，该线程位于游戏线程的一两帧后。

执行渲染操作时，必须仔细地考虑内存读写，确保线程安全，以及行为的确定性。功能行为取决于两个线程之间的执行速度差，这种情况被称作竞争条件。需要尽量避免竞争条件的出现，因为它们难以重现；且因为速度差的缘故，它们可能依赖于机器、平台、调试器或配置。这类 bug 很难进行调试，所花费的修复时间约为可重现的普通 bug 的 10 倍。

这是一个竞争条件/线程 bug 的简单例子：

```cpp
	/** 组件注册到场景时，游戏线程上将调用 FStaticMeshSceneProxy Actor。*/
	FStaticMeshSceneProxy::FStaticMeshSceneProxy(UStaticMeshComponent* InComponent):
		FPrimitiveSceneProxy(...),
		Owner(InComponent->GetOwner()) <======== 注：AActor 指示器已缓存
		...

		/** 渲染器在场景上执行一次通路时，渲染线程上将调用 DrawDynamicElements。*/
		void FStaticMeshSceneProxy::DrawDynamicElements(...)
		{
			if (Owner->AnyProperty) <========== Race condition! 游戏线程拥有所有 AActor / UObject 状态，
				// 并随时可能对其进行写入。UObject 可能已经执行过垃圾回收，导致程序崩溃。
				// 在此代理中镜像 AnyProperty 的数值即可安全执行操作。
		}

```

#### 开发方法

不存在通过彻底测试找到竞争条件的方法。理解这点十分重要：猜测检验或消极的 bug 修复无法创建可靠的线程代码。最好的方法是完全理解游戏线程和渲染线程的互动，并使用机制保证确定性。应具备能力解释使每个互动具有决定性的事件顺序，否则定会出现竞争条件。

#### 线程特定数据结构

因此可取的方法是 - 将数据保存在不同线程"拥有"的单独结构中，明确修改者和修改对象。此法同样适用于函数。最佳方法是 - 固定从相同线程或极为复杂的情况中调用每个函数。Unreal Engine 的大部分结构皆为如此。例如，**UPrimitiveComponent** 是属于可被渲染、可投射阴影资源的基础游戏线程类，拥有其自身的可视状态等属性。渲染线程无法直接触及 UPrimitiveComponent 的内存，因为游戏线程可能随时写入其构件中。渲染线程自身拥有代表此功能的类 - **FPrimitiveSceneProxy**。游戏线程被创建和注册后，无法触及 FPrimitiveSceneProxy 的内存构件。**UActorComponent::RegisterComponent** 将一个组件添加到场景，并创建一个 FPrimitiveSceneProxy 使其对渲染器可见。组件注册后，如其为可见，将为所需的每次通路调用 **FPrimitiveSceneProxy::DrawDynamicElements**。

#### 性能注意事项

游戏线程将在每个 **Tick()** 事件的末尾阻塞，直到渲染线程赶上一到两帧的差距。因渲染线程十分滞后，在游戏进程中阻塞游戏线程，等待渲染线程完全赶上的方式完全不可取。在读取或单个物体垃圾回收时进行阻塞也不可取，因为虚幻引擎支持异步流关卡。诸多操作均有异步机制，防止阻塞。

## 线程间通讯

#### 异步

两个线程间通讯的主要方法是通过 ENQUEUE\_UNIQUE\_RENDER\_COMMAND\_XXXPARAMETER 宏进行。此宏使用虚拟的 **执行** 函数（包含输入宏的代码）创建本地类。游戏线程将命令插入渲染命令队列，渲染线程在开始时调用执行函数。

利用 **FRenderCommandFence** 可在游戏线程上方便地追踪渲染线程的进度。游戏线程调用 **FRenderCommandFence::BeginFence** 开始栅栏。然后游戏线程将调用 **FRenderCommandFence::Wait** 进行阻塞，直到渲染线程处理栅栏；或者检查 **GetNumPendingFences**，轮询渲染线程的进程。当 GetNumPendingFences 返回为零时，渲染线程已经处理栅栏。

#### 阻塞

**FlushRenderingCommands** 是阻塞游戏线程直到渲染线程赶上的标准方法。这在离线（编辑器）操作中十分有用，通过渲染线程修改使用的内存。

#### 渲染资源

**FRenderResource** 提供基础渲染资源接口、以及初始化和释放的挂钩。从 FRenderResource（**FVertexBuffer**、**FIndexBuffer** 等）派生出的资源在用于渲染前需要被初始化、在被删除前需要被释放。**FRenderResource::InitResource** 只能从渲染线程调用，因此游戏线程上可调用一个辅助函数（**BeginInitResource**），使渲染命令入列，以便调用 FRenderResource::InitResource。RHI 函数只能从渲染线程调用（创建设备、视口等除外）。

#### UObjects 与垃圾回收

**Garbage Collection**（GC）在游戏线程上发生，并运算 **UObjects**。渲染线程正在处理引用 UObject 的命令时，游戏线程可能将 UObject 删除。因此渲染线程不应该解除 UObject 指示器的引用，除非有机制能确保 UObject 被渲染线程引用时不会被删除。以 UPrimitiveComponent 为例，它使用一个称为 **DetachFence** 的 FRenderCommandFence 防止 GC 在渲染线程处理分离命令前将 UObject 删除。

#### 游戏线程 FRenderResource 处理

需要考虑的游戏线程渲染线程交互常见情况有两种：静态资源（只能在加载后或编辑器中进行编辑，与索引缓冲相似）和动态资源（需要将游戏线程模拟的最新结果更新到每帧）。

#### 静态资源

本节讲述虚幻引擎中如何处理静态资源交互，以 **USkeletalMesh** 为例。

-   加载后将调用 **USkeletalMesh::PostLoad**，此资源将调用 **InitResources**。与索引缓冲相同，它在自身拥有的任意静态 **FRenderResources** 上调用 **BeginInitResource**。BeginInitResource 使一个渲染命令入列，以便调用 **FRenderResource::InitResource**。从此时起，游戏线程无法修改索引缓冲内存，除非重新拿回所有权。
-   组件注册，以 USkeletalMesh 索引缓冲开始渲染。
-   GC 在一些情况下（关卡未加载或不再引用）将停止引用组件并将其分离。注意：此时游戏线程无法删除索引缓冲内存，因为渲染线程可能尚未将分离处理完毕而仍然在使用索引缓冲渲染。
-   GC 调用 **USkeletalMesh::BeginDestroy**（游戏线程物体使命令入列，释放渲染资源的机会），因此它执行 **BeginReleaseResource(&IndexBuffer)**；游戏线程仍无法删除 **索引缓冲** 的内存，因为渲染线程不一定已完成释放的处理。可阻塞游戏线程，等候渲染线程赶上，但会引发故障并减慢速度，因此我们使用异步机制代替。为追踪渲染线程处理释放命令的进度，我们将开始一个栅栏。
-   GC 调用 **USkeletalMesh::IsReadyForFinishDestroy**，在此函数返回 `true` 之前不会销毁 UObject。渲染线程通过栅栏后，函数将只返回 `true`，意味着可以从游戏线程中安全地删除索引缓冲内存。
-   GC 最后将调用 **UObject::FinishDestroy**，可在中心位置释放内存。而索引缓冲的内存在 USkeletalMesh 析构函数调用 **FRawStaticIndexBuffer** 析构函数时将被清空。被调用的析构函数将调用持有索引缓冲内存 **TArray** 的析构函数并清空内存。

该机制高效（不阻塞线程、在中心位置进行初始化，而不在每帧检查是否需要初始化）而具有决定性，十分实用。

#### 动态资源

动态资源更新的一个最佳范例是游戏线程动画每帧生成的骨骼网格体骨骼变形。目的是：在每个动画更新进渲染线程上（在此可将变形设为着色器常数）的一个阵列后，从游戏线程中获取变形。如在每帧更新索引或顶点缓冲，结果相同。以下是操作顺序：

-   **USkinnedMeshComponent::CreateRenderState\_Concurrent** 分配 **USkinnedMeshComponent::MeshObject**。从此时起，游戏线程只可写入 **MeshObject** 指示器，但不可写入 **FSkeletalMeshObject** 的内存。
-   **USkinnedMeshComponent::UpdateTransform** 每帧被调用至少一次，更新组件的移动。在 GPU 蒙皮中将调用 **FSkeletalMeshObjectGPUSkin::Update**。现在游戏线程上拥有最新的变形，需要将它们转移到渲染线程中。操作方法：首先在堆（**FDynamicSkelMeshObjectData**）上分配内存，然后将骨骼变形复制进去，再使用 ENQUEUE\_UNIQUE\_RENDER\_COMMAND\_TWOPARAMETER 将此拷贝传到渲染线程。渲染线程现在拥有此拷贝，并负责删除。ENQUEUE\_UNIQUE\_RENDER\_COMMAND\_TWOPARAMETER 宏包含复制变形到最终目的地的代码，因此变形可被设为着色器常数。如更新顶点位置，这就是锁定和更新顶点缓冲的位置。
-   在一些情况下，组件会被分离。游戏线程使渲染命令入列，以释放所有动态 FRenderResources，现在可将 MeshObject 指示器设为 NULL；然而实际内存仍被渲染线程引用，无法删除。此时延迟删除机制即可发挥作用。从 **FDeferredCleanupInterface** 派生的类可按对线程无害的异步方式进行删除。FSkeletalMeshObject 应用此接口。游戏线程需要开始 FSkeletalMeshObject 的延迟删除，因此它调用了 **BeginCleanup(MeshObject)**。安全且完成清理后，内存将被逐步删除。

## 更新状态 VS 遍历渲染场景

在开发一个拥有独特更新和渲染操作的系统时，将两者合并进 **DrawDynamicElements** 看上去很美，而实际上却是不是个好点子。更好的方法是将更新从渲染遍历中独立出来，例如使来自游戏线程 Tick 事件的更新入列。

通过高阶渲染代码调用 DrawDynamicElements，绘制原始组件的元素。高阶代码假定不对 RHI 进行改变，在每帧中可将 DrawDynamicElements 调用任意次（取决于着色通路、画面数量、以及场景中的场景捕捉）。甚至可能调用 DrawDynamicElements，但底层绘制规则会因为多种原因放弃结果（例如：深度通路中提交的半透明 FMeshElement 将被放弃）。如原始组件实际为不可见，遮挡系统可能会/不会实际调用 DrawDynamicElements（取决于其使用的启发法）。这些所有因素均可能和每帧发生一次的状态更新产生冲突。

更好的解决方法是将更新和渲染遍历独立开来。游戏线程 Tick 事件可使渲染命令入列，执行更新操作。渲染命令可基于可见性略过更新。如使用情况允许，可使用原始场景信息的 **LastRenderTime** 执行操作。如更新操作以这样的方式单独入列，任意 RHI 函数皆可使用（包括设置不同的渲染目标）。

状态缓存（与更新相反）是此规则的例外。状态缓存将渲染遍历的中间结果作为优化保存。它与遍历密切相关，且不改变 RHI 状态，因此它不受上文提到的负面影响（设置正确时机进行缓存即可）。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [渲染线程](/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine#%E6%B8%B2%E6%9F%93%E7%BA%BF%E7%A8%8B)
-   [开发方法](/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine#%E5%BC%80%E5%8F%91%E6%96%B9%E6%B3%95)
-   [线程特定数据结构](/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine#%E7%BA%BF%E7%A8%8B%E7%89%B9%E5%AE%9A%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)
-   [性能注意事项](/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine#%E6%80%A7%E8%83%BD%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
-   [线程间通讯](/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine#%E7%BA%BF%E7%A8%8B%E9%97%B4%E9%80%9A%E8%AE%AF)
-   [异步](/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine#%E5%BC%82%E6%AD%A5)
-   [阻塞](/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine#%E9%98%BB%E5%A1%9E)
-   [渲染资源](/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine#%E6%B8%B2%E6%9F%93%E8%B5%84%E6%BA%90)
-   [UObjects 与垃圾回收](/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine#uobjects%E4%B8%8E%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6)
-   [游戏线程 FRenderResource 处理](/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine#%E6%B8%B8%E6%88%8F%E7%BA%BF%E7%A8%8Bfrenderresource%E5%A4%84%E7%90%86)
-   [静态资源](/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine#%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90)
-   [动态资源](/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine#%E5%8A%A8%E6%80%81%E8%B5%84%E6%BA%90)
-   [更新状态 VS 遍历渲染场景](/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine#%E6%9B%B4%E6%96%B0%E7%8A%B6%E6%80%81vs%E9%81%8D%E5%8E%86%E6%B8%B2%E6%9F%93%E5%9C%BA%E6%99%AF)
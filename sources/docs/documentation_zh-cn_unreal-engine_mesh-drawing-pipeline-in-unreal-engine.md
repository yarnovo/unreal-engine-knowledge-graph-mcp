# 虚幻引擎网格体绘制管道 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:24:26.981Z

---

目录

![网格体绘制管道](https://dev.epicgames.com/community/api/documentation/image/2db58e37-48aa-4e13-a866-64e16ed1517b?resizing_type=fill&width=1920&height=335)

本页包含的信息适用于那些想要添加自定义网格体通道，或者想要理解虚幻引擎网格绘制性能特征的程序员。

**网格体绘制管道** 基于保留模式的概念，其中所有场景绘制都是预先准备好的，而不是每帧都构建它们。它还具有积极缓存和绘制调用合并功能，以便利用静态网格体的属性，这些属性很少变化，可以跨帧重用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7714b2c3-537f-4fd5-ac0e-43e0a059e284/meshpipelineoverview_1.png)

绘制之旅。

网格体渲染从"FPrimitiveSceneProxy"开始，这是游戏线程的"UPrimitiveComponent"渲染线程表示。"FPrimitiveSceneProxy"负责通过对"GetDynamicMeshElements"和"DrawStaticElements"的回调将FMeshBatch提交给渲染器。

"FMeshBatch"将"FPrimitiveSceneProxy"实现（用户代码）与网格体通道（私有渲染器模块）解耦。它包含了通道确定最终着色器绑定和渲染状态所需的所有内容，因此代理永远不知道将在哪些通道中渲染。

下一步是将"FMeshBatch"转换为一个特定于网格体通道的"FMeshDrawCommand"。"FMeshDrawCommand"是"FMeshBatch"和RHI之间的接口。它是一个完全无状态的绘制描述，存储了RHI需要知道的，关于网格体绘制的所有信息：

-   要使用的着色器。
    
-   其资源绑定。
    
-   绘制调用参数。
    

这允许在RHI级别之上缓存和合并绘制调用。"FMeshDrawCommand"是由一个特定于网格体通道的"FMeshPassProcessor"根据"FMeshBatch"创建的。

最后，"SubmitMeshDrawCommands"用于将"FMeshDrawCommand"转换为RHICommandList上设置的一系列RHI命令。

## 缓存和动态网格体批次

"FPrimitiveSceneProxy"有两个生成"FMeshBatches"的路径：缓存路径和动态路径。"FPrimitiveSceneProxy"实现通过"GetViewRelevance()"函数控制每个帧使用的路径。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/64851ff6-01c1-4609-b3fc-ecc7f7c161b8/meshpipelineoverview_2.png)

"FMeshBatch"代码路径。橙色箭头表示每帧都必须执行的操作，而蓝色箭头表示执行一次就缓存的操作。

缓存的路径构建并重用"FMeshBatch"，对于不改变每一帧（比如静态网格体）的绘制，它是快速渲染的首选路径。这是由"DrawStaticElements"实现的，当一个代理被添加到场景中时会调用此函数。创建的"FMeshBatches"存储在"FPrimitiveSceneInfo::StaticMeshes"中，并且每一帧都被重用，直到从场景中删除代理为止。

动态路径每一帧重新创建"FMeshBatch"。这是最灵活的路径，用于在帧与帧之间经常会发生变化的绘制，例如粒子。它由"GetDynamicMeshElements"实现。该函数从InitViews中调用每一帧，并为每个视图创建一个临时的"FMeshBatch"。

## FMeshPassProcessor

特定的通道网格体处理器派生自"FMeshPassProcessor"基类，负责将"FMeshBatch"转换为用于给定通道的网格体绘制命令。这是最终的绘制筛选发生的地方，会选择适当的着色器并收集着色器绑定。

为了创建一个自定义网格体通道处理器，它必须派生自"FMeshPassProcessor"，且需要覆盖"AddMeshBatch"函数。

"AddMeshBatch"实现：

-   绘制筛选 - 例如，如果一个材质具有半透明的绘制模式，那么不要在"FDepthPassMeshProcessor"中处理它。
    
-   选择着色器和管道状态（深度/模具/混合状态）
    
-   最后调用"BuildMeshDrawCommands()"，它为通道/材质/顶点factory/基元收集着色器绑定，并将新的绘制命令添加到相关列表中。
    

## 着色器绑定

虚幻引擎中的着色器绑定可以是统一缓冲区、采样器、纹理、着色器资源视图或松散参数（"FShaderParameter"）。

"FMeshPassProcessor"不将着色器绑定随随RHICmdList.SetShaderParameter一起直接发送到RHI，它只将它们记录到"FMeshDrawSingleShaderBindings"类中。函数"BuildMeshDrawCommands()"在所有通道之间共享代码，它将在通道着色器上调用"GetShaderBindings()"。

着色器绑定可分为几个类别：

-   通道常量统一缓冲区，例如"ViewUniformBuffer"或"DepthPassUniformBuffer"
    
-   顶点Factory绑定
    
-   材质绑定
    
-   基元绑定
    
-   通道特定的绑定，在绘制之间会发生更改。
    

注意，每次绘制设置不同的绑定可以防止绘制调用合并。此外，设置松散参数（即不位于统一缓冲区中的着色器参数）可以防止绘制调用合并，从而迫使绘制之间的常量缓冲区更新放慢。

因为每个"FMeshPassProcessor"必须通过"BuildMeshDrawCommands()"来调用通道着色器的"GetShaderBindings()"，所以我们需要一种机制来将任意数据从"FMeshPassProcessor"传递到"GetShaderBindings()"调用。这是通过"ShaderElementData"参数到"BuildMeshDrawCommands()"来完成的。

### FMeshDrawCommand性能危害

"FMeshDrawCommand"中使用了许多内联分配器来存储可变长度的数组，而不需要额外的堆分配。溢出这些会导致性能风险，因为每个网格体绘制命令在遍历命令时必须构造/销毁/复制堆分配以及缓存丢失。

"FMeshDrawShaderBindings"假设 **2** 着色器频率（顶点 + 像素）：

```cpp
	TArray<FMeshDrawShaderBindingsLayout, TInlineAllocator<2>>ShaderLayouts

```

"FMeshDrawCommand"假设所有频率之间有 **10** 个着色器绑定：

```cpp
	const int32 NumInlineShaderBindings = 10;

```

"FMeshDrawCommand"假设来自顶点factory的 **4** 个顶点流送：

```cpp
	typedef TArray<FVertexInputStream, TInlineAllocator<4>>FVertexInputStreamArray;
```

## 通道类型

有三种方法来使用"FMeshPassProcessor"绘制：

通道类型

说明

**"EMeshPass::Type"枚举**

在此处添加一个条目会在"FScene"中分配一个"FParallelMeshDrawCommandPass"。这使得"FScene"能够在"AddToScene"时间缓存通道的网格体绘制命令。"FMeshPassProcessor"必须使用"FRegisterPassProcessorCreateFunction"注册到它们的枚举中。通道设置和调度发生在任务中。

**手动通道**

使用手动通道，其中"FParallelMeshDrawCommandPass"作为变量存储在任意类中。当每个帧的通道数可变时（例如，阴影深度通道），就会使用这种方法。这种类型的通道不能在"FScene::AddToScene"时间缓存命令，但仍然可以获得在任务中设置和调度通道的好处。

**"DrawDynamicMeshPass"**

这用于即时模式绘制，是最慢但最方便的方法。通道设置和调度立即在调用者线程中发生。

注意，目前渲染器还没有扩展到插件，除了"DrawDynamicMeshPass"之外，添加新的通道需要更改渲染器模块代码。

### FParallelMeshDrawCommandPass

为了添加自定义网格体通道，首先我们需要向"EMeshPass"枚举添加一个新条目。接下来，在"FRelevancePacket::MarkRelevant()"中，根据相关标记，将静态网格体添加到可见网格体绘制命令列表中。例如，这段代码添加了一个网格体绘制命令到深度通道（如果它与深度通道相关）：

```cpp
	if (StaticMeshRelevance.bUseForDepthPass)
	{
		DrawCommandPacket.AddCommandsForMesh(PrimitiveIndex, PrimitiveSceneInfo, StaticMeshRelevance, StaticMesh, Scene, bCanCache, EMeshPass::DepthPass);
	}

```

在"ComputeDynamicMeshRelevance"中标记"EMeshPass"与动态绘制的相关性：

```cpp
	if (ViewRelevance.bDrawRelevance && (ViewRelevance.bRenderInMainPass || ViewRelevance.bRenderCustomDepth))
	{
		PassMask.Set(EMeshPass::DepthPass);
		View.NumVisibleDynamicMeshElements[EMeshPass::DepthPass] += NumElements;
	}

```

使用"FParallelMeshDrawCommandPass::DispatchDraw"绘制该特定通道：

```cpp
	View.ParallelMeshDrawCommandPasses[EMeshPass::DepthPass].DispatchDraw(nullptr, RHICmdList);

```

也可以设置一个并行命令列表集，以便并行地绘制该通道：

```cpp
	FPrePassParallelCommandListSet ParallelCommandListSet(View, this, ParentCmdList, true, DrawRenderState);
	View.ParallelMeshDrawCommandPasses[EMeshPass::DepthPass].DispatchDraw(&ParallelCommandListSet, ParentCmdList);

```

### DrawDynamicMeshPass

"FParallelMeshDrawCommandPass"是常用网格体通道的默认路径。它应该用于性能关键型网格体通道，因为它是唯一支持网格体绘制命令缓存和并行渲染的路径。另一方面，性能要求执行非常严格的设计，例如，在InitViews之后不可能修改网格体绘制命令或着色器绑定。

对于某些用例，例如在编辑器中绘制一些网格体，"DrawDynamicMeshPass"可能是一个更简单的解决方案。它提供即时模式网格体绘制，是最灵活的渲染路径。Unreal Engine使用"DrawDynamicMeshPass"进行一些纯编辑器通道和画布的渲染。

使用"DrawDynamicMeshPass"绘制非常简单，只需要传递一个lambda，它将填充网格体绘制命令的临时列表：

```cpp
	DrawDynamicMeshPass(View, RHICmdList, [&View, CurrentDecalStage, RenderTargetMode](FDynamicPassMeshDrawListContext* DynamicMeshPassContext)
	{
		FMeshDecalMeshProcessor PassMeshProcessor(
			View.Family->Scene->GetRenderScene(),
			&View,
			CurrentDecalStage,
			RenderTargetMode,
			DynamicMeshPassContext);

		for (int32 MeshBatchIndex = 0; MeshBatchIndex < View.MeshDecalBatches.Num(); ++MeshBatchIndex)
		{
			const FMeshBatch* Mesh = View.MeshDecalBatches[MeshBatchIndex].Mesh;
			const FPrimitiveSceneProxy* PrimitiveSceneProxy = View.MeshDecalBatches[MeshBatchIndex].Proxy;
			const uint64 DefaultBatchElementMask = ~0ull;

			PassMeshProcessor.AddMeshBatch(*Mesh, DefaultBatchElementMask, PrimitiveSceneProxy);
		}
	});

```

## 缓存的网格体绘制命令

缓存的网格体绘制命令是"FPrimitiveSceneInfo::CacheMeshDrawCommands"中内置的"FPrimitiveSceneInfo::AddToScene"。使用这些命令绘制非常有效，因为我们只需每帧选择适当的预构建命令即可（"FDrawCommandRelevancePacket::AddCommandsForMesh"）。只有在绘制状态不每帧都改变，且可以在AddToScene内设置所有着色器绑定时，才能缓存的绘制命令。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b29d9c62-a52d-4f50-aab2-d76ca5238694/meshpipelineoverview_3.png)

网格体绘制命令缓存路径。橙色箭头表示每帧都必须执行的操作，而蓝色箭头表示执行一次就缓存的操作。

为了支持缓存的网格体绘制命令：

-   该通道必须正在使用"EMeshPass::Type"中的条目
    
-   注册自定义网格体处理器时必须传递"EMeshPassFlags::CachedMeshCommands"标记
    
-   网格体通道处理器需要能够设置所有的着色器绑定，而不依赖于"FSceneView"，因为在缓存期间它将是空的
    

为了让着色器使用缓存的网格体绘制命令访问每帧数据，我们绑定了场景范围的统一缓冲区（请参阅"FScene::UniformBuffers"），然后使用"RHIUpdateUniformBuffer"在绘制之前更改它们的内容。

目前，只有"FLocalVertexFactory (UStaticMeshComponent)"可以被缓存，因为所有其他顶点factory都需要为它们的着色器绑定设置一个视图。

### 缓存失效

网格体通道处理器在"AddMeshBatch"中读取的任何数据都依赖于缓存的网格体绘制命令。当该依赖性发生更改时，缓存的命令必然失效。使用"FPrimitiveSceneInfo::BeginDeferredUpdateStaticMeshes"可以使单个基元缓存的命令失效。通过将"Scene->bScenesPrimitivesNeedStaticMeshElementUpdate"设置为"true"，可以使整个场景缓存的命令无效。这是一个重负荷的操作，在游戏过程中应该避免，因为它会在较大的场景中造成卡顿。

例如，"FBasePassMeshProcessor::AddMeshBatch"使用"Scene->SkyLight"决定是否选择天空光源着色器置换。当"Scene-SkyLight"更改时，我们必须使缓存的网格体绘制命令无效。

为了通过这种缓存方案获得良好的性能，将数据放在持久的统一缓冲区中非常重要。然后，您需要更新这些缓冲区，而不是频繁地使缓存的命令失效。例如，天空光源案例可以根据"PassUniformBuffer"内容更改为着色器中的一个动态分支，而不是选择不同的着色器Permutation。

### 资源生命周期管理

"FMeshDrawCommand"不负责维护它引用的任何资源的生命周期，因此必须对缓存的网格体绘制命令特别小心，以使可能引用特定资源的命令无效。例如，当重新创建由缓存的网格体绘制命令引用的统一缓冲区时，在遍历用于渲染的缓存网格体绘制命令时将导致崩溃。应该更新统一缓冲区，否则缓存的网格体绘制命令必然会无效。

"VALIDATE\_UNIFORM\_BUFFER\_LIFETIME"可用于跟踪删除统一缓冲区的情况，该缓冲区仍然由缓存的网格体绘制命令引用。

## 绘制调用合并

因为"FMeshDrawCommands"捕获了绘制在RHI级别之上所需的所有状态，所以我们可以很容易地比较它们与绘制调用合并的兼容性。目前实现的绘制调用合并的唯一形式是基于D3D11特性集，它支持将具有相同着色器绑定的绘制调用合并到实例化绘制中。更高级的RHI，例如D3D12，可以更积极地合并绘制，但这还没有实现。

### 动态实例化

为了将两个绘制合并到一个实例化绘制中，它们必须具有相同的着色器绑定（"FMeshDrawCommand::MatchesForDynamicInstancing"）。只有着色器中的InstanceID会在它们之间变化，或者顶点流送在实例频率方面的设置。

着色器参数必须精心设计以支持动态实例化。这可根据参数频率通过多种方式实现：

通道类型

说明

**通道参数（Pass Parameters）**

它们被放置在通道统一缓冲区中，在这里可以合并通道中的任何绘制。

**FLocalVertexFactory参数（FLocalVertexFactory Parameters）**

它们被放置在一个由"UStaticMesh"拥有的统一缓冲区中，其中，任何具有相同"UStaticMesh"的绘制都可以合并。

**材质实例参数（Material Instance Parameters）**

它们放置在材质统一缓冲区中，其中，任何使用相同材质实例的绘图都可以合并。

**光照贴图资源参数（Lightmap Resource Parameters）**

它们被放置在一个"LightmapResourceCluster"统一缓冲区中，其中，任何使用相同"LightmapTexture"的绘图都可以合并。

**基元参数（Primitive Parameters）**

它们被放置在名为"GPUScene"的场景范围的基元数据缓冲区中，并使用"PrimitiveID"在着色器中索引。

### GPU场景

为了在相同的实例化绘制中使用不同的基元参数，支持平台（"UseGPUScene"）将它们上载到场景范围的缓冲区（"UpdateGPUScene"），并使用"PrimitiveId"索引到其中。对于"FLocalVertexFactory"，PrimitiveId来自一个实例频率的顶点输入流。这必须传递给像素着色器，它必须使用"GetPrimitiveData(Parameters.PrimitiveId).Member"来访问基元着色器参数，而不是直接访问基元统一缓冲区（"Primitive.Member"）。

### 实例化效率

目前，只有缓存的网格体绘制命令可以与动态实例化合并，这将动态实例化限制为"FLocalVertexFactory"。

某些边缘情况也会阻止合并：

-   光照贴图制作小纹理 - 调整"DefaultEngine.ini"中的 **MaxLightmapRadius**
    
-   每组件顶点颜色
    
-   SpeedTree **Wind** 节点
    

要调查某个关卡中的动态实例化效率，可以使用 **r.MeshDrawCommands.LogDynamicInstancingStats 1** 控制台命令并检查日志中的输出。

注意，**深度预通道（Depth Prepass）** 和 **阴影深度（Shadow Depth）** 通道实现了更高的合并效率，因为它们经常在可能的情况下使用默认材质的着色器覆盖。

## 网格体绘制并行性

网格体绘制的大部分工作都是在任务中完成的，以远离渲染线程的关键路径。在RT帧开始时的InitViews中，"FParallelMeshDrawCommandPass"为通道设置（动态命令生成、排序和绘制调用合并）针对每个通道发出一个任务。随着渲染线程通过帧进行并到达网格体通道（例如，RenderBasePass），它为绘制调度的每个通道启动多个"FDrawVisibleMeshCommandsAnyThreadTasks"（记录"RHICmdList"），这取决于系统的核心数量和要调度的绘制数量。

-   将 **r.MeshDrawCommands.ParallelPassSetup** 设置为 **0** 会禁用通道设置任务，并使工作在渲染线程上完成，这对于调试非常有用。
    
-   将 **r.RHICmdBasePassDeferredContexts** 设置为 **0** 会禁用基础通道绘制调度的并行任务，导致这些任务发生在渲染线程上。
    

这些任务通过依赖关系链尽早启动，因此可以与帧的渲染线程并行执行。渲染线程只在"FSceneRenderer::WaitForTasksClearSnapshotsAndDeleteSceneRenderer"中的帧末尾时阻塞这些任务的完成。

## 控制台变量

这些是一些有用的控制台变量，用于诊断网格体绘制管道中的问题：

控制台变量

说明

"r.MeshDrawCommands.ParallelPassSetup"

切换网格体绘制命令处理任务，这对于诊断网格体通道线程问题非常有用。

"r.MeshDrawCommands.UseCachedCommands"

禁用时强制让所有网格体绘制命令都成为动态，这对于诊断缓存的网格体绘制命令中陈旧数据的问题非常有用。

"r.MeshDrawCommands.DynamicInstancing"

这将切换动态实例化。它对于诊断动态实例化问题很有用。

"r.MeshDrawCommands.LogDynamicInstancingStats"

这对于检查动态实例化效率非常有用。

"r.GPUScene.UploadEveryFrame"

强制每一帧都完全更新GPU场景，这对于诊断陈旧的GPU场景数据的问题很有用。

"r.GPUScene.ValidatePrimitiveBuffer"

这将把GPU场景下载到CPU，并根据基元统一缓冲区验证其内容。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [缓存和动态网格体批次](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine#%E7%BC%93%E5%AD%98%E5%92%8C%E5%8A%A8%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E6%89%B9%E6%AC%A1)
-   [FMeshPassProcessor](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine#fmeshpassprocessor)
-   [着色器绑定](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine#%E7%9D%80%E8%89%B2%E5%99%A8%E7%BB%91%E5%AE%9A)
-   [FMeshDrawCommand性能危害](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine#fmeshdrawcommand%E6%80%A7%E8%83%BD%E5%8D%B1%E5%AE%B3)
-   [通道类型](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine#%E9%80%9A%E9%81%93%E7%B1%BB%E5%9E%8B)
-   [FParallelMeshDrawCommandPass](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine#fparallelmeshdrawcommandpass)
-   [DrawDynamicMeshPass](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine#drawdynamicmeshpass)
-   [缓存的网格体绘制命令](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine#%E7%BC%93%E5%AD%98%E7%9A%84%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%98%E5%88%B6%E5%91%BD%E4%BB%A4)
-   [缓存失效](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine#%E7%BC%93%E5%AD%98%E5%A4%B1%E6%95%88)
-   [资源生命周期管理](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine#%E8%B5%84%E6%BA%90%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E7%AE%A1%E7%90%86)
-   [绘制调用合并](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine#%E7%BB%98%E5%88%B6%E8%B0%83%E7%94%A8%E5%90%88%E5%B9%B6)
-   [动态实例化](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine#%E5%8A%A8%E6%80%81%E5%AE%9E%E4%BE%8B%E5%8C%96)
-   [GPU场景](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine#gpu%E5%9C%BA%E6%99%AF)
-   [实例化效率](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine#%E5%AE%9E%E4%BE%8B%E5%8C%96%E6%95%88%E7%8E%87)
-   [网格体绘制并行性](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%98%E5%88%B6%E5%B9%B6%E8%A1%8C%E6%80%A7)
-   [控制台变量](/documentation/zh-cn/unreal-engine/mesh-drawing-pipeline-in-unreal-engine#%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F)
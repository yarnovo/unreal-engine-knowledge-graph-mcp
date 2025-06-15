# 虚幻引擎5.6版本说明 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes
> 
> 生成时间: 2025-06-14T18:49:13.211Z

---

目录

![虚幻引擎5.6版本说明](https://dev.epicgames.com/community/api/documentation/image/f164a1ba-f594-40c3-bab0-d0c9f71bc4a7?resizing_type=fill&width=1920&height=335)

## 新内容

虚幻引擎5.6版本将继续完善UE5工具集。 此版本优化了多个方面，包括渲染、世界构建、动画、MetaHuman和程序化内容生成（PCG），等等。

此版本包含我们的虚幻引擎开发者社区在GitHub上提交的改进。 感谢虚幻引擎5.6的每一位贡献者：  

747929791, 21cBioC, aaronfranke, Absurdponcho, acren, afterwise, aknarts, AlbinBernhardssonARM, AlexanderVeselov-arm, AlexThiv, almax27, Andrej730, antialiased, avudnez, Bashlez, bavis-m, belchy06, ben-mkiv, benvlodgi, brasky, bruyn, BryceGattis, brycegbrazen, bunnylacey, cmartel, cray-arenanet, Damue01, devchagrins, dgiannetti-riot, Distantz, djbozkosz, djethernet1, dmergele, DoctorGoat, DoubleDeez, drandall-microsoft, dsb-rmiller, dtg-will-marshall, DulcheE, Duroxxigar, dyanikoglu, Ebrahim-Mottaghi-Rezaei, ele-ea, emr4378, endragor, epicfiresprite, erebel55, Eric2-Praxinos, F-Mu, felixweilbach, FishBone0, g-dewar, geordiemhall, grimpunch, gsnook, Gusten, hach-que, Hassaoui, I-m-None-user, ilkeraktug, iniside, javidcf, jbradbyrd, jerparent, JFxBertrand, JohnJFarrow, jokerro, jolanValteau, Jonartis, jorgenpt, joshuaGriffinSKYMAP, jpritchard1010, jseghers-hwg, karimluccin, KeithRare, kiruru002, kissSimple, klukule, KrakenParty, KristofMorva, kronok, kvathupo, KXOC, liaoKM, ligazetom, lightbringer, litruv, lizardthief, lostlont, lsandersljungberg, magforceseven, Maigo, marcussvensson92, MartinWickhamFB, marvelius, matt-edmondson, maximedup, mderzelle, michael-buschbeck-ms, mihxen, mike-praxinos, MileyHollenberg, mingyangan, miuliano, monsieurgustav, moppius, mpliskins, neocolis, nerites, nickdarnell, nicoell-threedy, nievesj, nollbit, nrs-mparker, opeeler, paco-ms, phyronnaz, PICO-XR, piotr-j, PW-Bpowell, q2a3z, rafeliaaa, rayza, Razzile, reapazor, riotcam, riotjserrallonga, rmatchett, sadunkit, scootpl, sk83rjosh, skylonxe, slonopotamus, smatcher, spl-5971354, Sqazine, srombauts, steelixb, StefanZimecki-Sharkmob, stephgoy, stevehei-ms, steven-main, SVasilev, systemicsmitty, tezenari, ThomasHill-SBL, tlabeyti, tompyne, toniseifert, troutzhang, Tt-Wes, tyryanosaurus, Victov, VladimirGavrilovSergeevich, Voulz, wuyakuma, x157, xophiix, ywake, zeroeightsix, zeroerrors, ZeroNinx, ZhengzhongSun, Zzzzzya

## 渲染

### Lumen硬件光线追踪优化

在虚幻引擎5.6中，Lumen硬件光线追踪（HWRT）模式能在当前世代的硬件上提供更强的性能。 这些底层优化确保了更快、更高效的渲染，带来了高端视觉效果保真度和可伸缩性，如今已经能够匹敌软件光线追踪模式的帧预算。 这释放了目标平台上宝贵的CPU资源，总体上有助于实现更稳定的60hz帧率。

### RHI - 渲染器并行化

[![RHI - 渲染器并行化](https://dev.epicgames.com/community/api/documentation/image/447641e2-7126-46c1-b66b-5edd6cd89a34?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/447641e2-7126-46c1-b66b-5edd6cd89a34?resizing_type=fit)

渲染线程性能很多时候都是UE游戏的限制因素。 这是因为，即使当前平台和图形API提供了方法来行执行操作，以前有些操作也只能使用这种线程。 我们重构了渲染器硬件接口（RHI）API，删除了这些约束，并充分利用了目标硬件的多线程功能，从而提高了性能。

### RHI - 无绑定资源

[![RHI - 无绑定资源](https://dev.epicgames.com/community/api/documentation/image/4dd80bfd-194d-4a03-967e-a3f6be10e77b?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/4dd80bfd-194d-4a03-967e-a3f6be10e77b?resizing_type=fit)

无绑定资源是一种低级别的功能，涉及DX12、Vulkan、Metal等现代渲染器硬件接口（RHI）中纹理和其他类型的数据缓冲的管理。 我们添加了对无绑定资源的支持，从而在渲染器中实现更灵活的GPU编程范例和额外的功能，而且达到这个要求才能在Vulkan上获得光线追踪的完整支持。

虽然此功能不直接面向用户，但用户如果需要编写与渲染相关的C++插件和自定义引擎修改，那他们可能会对无绑定功能支持感兴趣。

### Niagara异类体积

[![Niagara异类体积](https://dev.epicgames.com/community/api/documentation/image/742eff4f-c980-449d-814a-604b498fa770?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/742eff4f-c980-449d-814a-604b498fa770?resizing_type=fit)

虚幻引擎5.6已可投入使用，并且为PC和第9代游戏主机进一步优化了下采样和运行时性能。

-   如今，在以下采样分辨率进行渲染时会采用双边上采样。
    
-   我们对雾内散射求值和间接光照等高开销操作进行了近似处理，以降低VGPR压力，并收紧主光线步进环路。
    
-   间接光照的计算可在光照缓存计算中选择性地进行，以降低光线步进的复杂度和减少VGPR占用。
    
-   可选择性地将雾内散射从主光线步进环路中移除并进行插值，以提高实时性能。
    
-   对异类体积组件进行了加固，使其在游戏中的运行更为稳定。
    
-   在与半透明渲染混合时，可选择性使用Beer阴影贴图，虽然这是一种近似方法，但对实时应用程序而言性能更佳
    

### 虚拟阴影贴图优化

虚幻引擎5.6中的虚拟阴影贴图优化了场景剔除，在进一步优化阴影性能和内存占用的同时，还增加了保真度和美术上的可控性。

### Substrate材质（Beta测试版）

[![Substrate材质](https://dev.epicgames.com/community/api/documentation/image/23748892-fef9-4ca7-8dee-f5dfef13f966?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/23748892-fef9-4ca7-8dee-f5dfef13f966?resizing_type=fit)

虚幻引擎5.6目前提供测试版Substrate材质。

Substrate是虚幻引擎5中的材质创建方法，将着色模型和混合模式的固定套件（例如默认光照和透明涂层）换成了表现力更强、更为模块化的框架。 此方法支持旧版材质的所有功能，而且支持部署了虚幻引擎的所有平台。 随着我们进一步深化将Substrate作为默认项的工作，与旧版材质系统相比，新版本在性能对等性上有了更多改进。

### 第一人称渲染（Beta测试版）

![第一人称渲染](https://dev.epicgames.com/community/api/documentation/image/cc24fc7b-b70b-46f8-a72c-48f51a5779b8?resizing_type=fit)

在虚幻引擎5.6中，第一人称渲染现已进入Beta测试阶段。

第一人称渲染方法可以防止玩家的手或武器穿模到世界对象中，此外还包含了一套独立的视野（FOV），这意味着开发者可以为第一人称资产指定不同于世界其他部分的FOV。

虚幻引擎5.6新增的第一人称渲染功能如下：

-   阴影贴图渲染（VSM）
    
-   光线追踪反射和阴影
    
-   第一人称自身阴影（屏幕空间）
    
-   第一人称渲染已与材质集成：
    
    -   **Scene Texture**节点现包含**IsFirstPerson**输入数据，可供材质采样使用。
        
    -   **First Person Output**节点支持对第一人称效果的逐顶点控制。 此可选输出支持在世界空间与任何被视为第一人称空间中的内容之间进行插值处理。 当需要让几何体的某些部分处于世界空间以实现与世界的衔接时，例如让角色的脚踩在地面上，该功能将非常实用。
        
    -   **Transform Position**节点可将任意位置转换为第一人称空间，这在以第一人称视角渲染某点时计算该点在屏幕上的最终位置非常有用。
        

### 景深 - Petzval散景

[![景深 - Petzval散景](https://dev.epicgames.com/community/api/documentation/image/cfea5144-3030-45a2-81a6-b769510cf10d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/cfea5144-3030-45a2-81a6-b769510cf10d?resizing_type=fit)

虚幻引擎5.6为景深渲染引入了新的Petzval散景设置，同时在实时渲染和路径追踪渲染中也实现了支持。 衰减滑块可以让你控制该效果从中心到边缘的增强（线性/指数）速度。

### GPU分析器2.0

[![GPU分析器2.0](https://dev.epicgames.com/community/api/documentation/image/a6fda148-c04a-4be1-b345-ca8e5b1829ab?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/a6fda148-c04a-4be1-b345-ca8e5b1829ab?resizing_type=fit)

虚幻引擎5.6引入了重新架构的Insights GPU分析器。

我们目的在于统一引擎内现存的分析系统（即Stats、ProfileGPU和Insights），从而在分析场景时使用相同的数据流，以此提高报告的准确性和一致性。

我们重做了GPU时间轴的时间戳收集方式，并让所有RHI以通用的格式生成这些信息。 得益于新的事件流和经过优化的Insights API，新的GPU分析工具能够呈现更多信息：

-   异步队列
    
-   mGPU
    
-   管线空泡（GPU空闲/繁忙状态）
    
-   跨队列依赖项（栅栏等待）
    

## 世界构建

### 快速几何体流送插件（试验性）

![快速几何体流送插件](https://dev.epicgames.com/community/api/documentation/image/b18d1497-f3cd-492c-985e-338c25b56d81?resizing_type=fit)

我们编译了快速几何体流送插件，为更快捷地流送特定类型的Actor而设计，即那些属于不可变静态几何体类型且不会影响Gameplay的Actor。 该插件采用一种更快、更轻量级的方法，在图形和物理场景中注册和取消注册静态几何体，同时不会牺牲现存的世界分区功能，如运行时数据层和HLOD等。

它会利用"世界分区 - 运行时单元格变换器"功能，定义生成流送阶段期间（每次进入"在编辑器中运行（PIE）"模式时以及烘焙时发生），可考虑进行快速几何体流送的内容。 这使整个过程变得顺畅且不具破坏性。

快速几何体流送的要求如下：

-   在项目中启用快速几何体流送插件。
    
-   在关卡的世界设置（World Settings） - 世界分区设置（World Partition Setup）中添加一个名为`FastGeoWorldPartitionRuntimeCellTransformer`的世界分区运行时单元格变换器。
    
-   进入PIE，或烘焙内容。
    

我们建议你根据分析和项目的预期结果调整AddToWorld/RemoveFromWorld和快速几何体流送的时间预算。

在以游戏主机硬件为平台，使用《城市示例》进行内部性能测试时，我们使用了以下控制台变量和数值：

-   `s.LevelStreamingActorsUpdateTimeLimit`被设为1毫秒。
    
-   `s.UnregisterComponentsTimeLimit`被设为1毫秒。
    
-   `LevelStreaming.MaximumMakingVisibleLevels`被设为2，从而支持在等待异步任务时处理其他关卡。
    
-   `FastGeo.AsyncRenderStateTask.TimeBudgetMS`被设为1毫秒。
    
-   `FastGeo.AsyncRenderStateTask.ParallelWorkerCount`被设为4，从而避免在遇到慢速流送警告时出现阻塞。
    
-   `FastGeo.AsyncRenderStateTask.MaxNumComponentsToProcess`保留为0（无限制）。
    

### 流送性能（试验性）

![流送性能](https://dev.epicgames.com/community/api/documentation/image/49b76ed4-5de7-4af4-b2f0-f6b0f911e892?resizing_type=fit)

我们提高了在运行时流进/流出世界内容时的整体引擎性能。

下方列出的核心优化适用于所有项目，且可以与（负责不可变静态几何体的）快速几何体流送插件搭配使用。 由于在5.6中被视为试验性优化，因此大部分优化都需要分别针对项目逐个启用并进行全面测试。

**UpdateStreamingState**

-   **Asynchronous UWorldPartitionStreamingPolicy::UpdateStreamingState**  
    
    启用方法：`wp.runtime.UpdateStreaming.EnableAsyncUpdate = true`
    
-   **UWorld::InternalUpdateStreamingState**  
    
    优化后移除非必要调用。
    

**异步物理状态创建/销毁**

-   **异步物理状态创建（InitBody）和销毁**   
    
    在Chaos中启用：`p.Chaos.EnableAsyncInitBody = true`
    
    在关卡流送中启用：`LevelStreaming.AllowIncrementalPreRegisterComponents = true` 和 `LevelStreaming.AllowIncrementalPreUnregisterComponents = true`
    

-   **异步地形高度场碰撞组件的物理状态****创建**  
    
    在Chaos中启用：`p.Chaos.EnableAsyncInitBody = true`
    
    在关卡流送中启用：`LevelStreaming.AllowIncrementalPreRegisterComponents = true`
    

-   **异步物理状态创建和销毁的优化**
    

-   **多个AddToWorld/RemoveFromWorld**  
    
    在使用异步物理状态创建和销毁时，最大化AddToWorld和RemoveFromWorld所允许的时限。
    
    要求：`p.Chaos.EnableAsyncInitBody = true` 和 `LevelStreaming.AllowIncrementalPreRegisterComponents = true` 和/或 `LevelStreaming.AllowIncrementalPreUnregisterComponents = true`
    
    在关卡流送中启用：`LevelStreaming.MaximumMakingVisibleLevels =` 和 `LevelStreaming.MaximumMakingInvisibleLevels =   `
    

**InstancedStaticMeshComponent CalcBounds**

-   **缓存边界，以尽量缩短为不可变的InstanceStaticMeshes重建边界所需的时间。**
    

**PrecachePSOs**

-   **UPrimitiveComponent::SetupPrecachePSOParams**  
    
    实现一个新的专用函数，以获取`bUsesWorldPositionOffset`
    

-   **UStaticMeshComponent::OnRegister**  
    
    检测组件世界变换是否发生了变化以及PrecachePSOs是否已被调用。
    

**DoesPackageExist**

-   **FPackageName::DoesPackageExistEx**  
    
    针对关卡流送，不是先测试再请求资源包，而是让请求执行并在完成的回调`ULevelStreaming::AsyncLevelLoadComplete`中处理错误`EAsyncLoadingResult::Failed`。
    

**AddPrimitive**

-   **Async AddToWorld/AddPrimitive**   
    
    启用方法：`LevelStreaming.AsyncRegisterLevelContext.Enabled = true`
    
    设置方法：`LevelStreaming.AsyncRegisterLevelContext.PrimitiveBatchSize =` 和`s.LevelStreamingAddPrimitiveGranularity`
    

**RemoveFromWorld Incremental EndPlay**

-   优化了**UWorld::RemoveFromWorld**的时间切片  
    
    启用方法：`s.LevelStreamingRouteActorEndPlayForRemoveFromWorldGranularity = (0 = disabled)`
    

**渲染资产流送（纹理/网格体流送）**

-   **FRenderAssetStreamingManager::IncrementalUpdate**
    
    -   **并行处理**  
        
        启用方法：`r.Streaming.AllowParallelRenderAssetStreamingManagerIncrementalUpdate = true`
        
    -   **缓存**  
        
        启用方法：`r.Streaming.EnableTexturesSamplingStreamingCache = true`
        
    -   **其他优化**  
        
        使用：`r.Streaming.WorkerCountForParallelRenderAssetStreamingManagerIncrementalUpdateto`以控制使用`usingr.Streaming.AllowParallelRenderAssetStreamingManagerIncrementalUpdate`时所用的工作程序数量上限
        

**ProcessAsyncLoading和UpdateLevelStreaming的统一/共享时间预算**

-   **ProcessAsyncLoading和UpdateLevelStreaming的时间预算**  
    
    在帧末尾通过`HandleUnifiedStreaming`运行异步资产和关卡流送，同时处理高优先级的流送。 如果`ProcessAsyncLoading`期间出现卡顿，`UpdateLevelStreaming`的时间就会减少，而未被`UpdateLevelStreaming`使用的时间将被用于处理更多的已加载资产。 此外，这样还能修复`RemoveFromWorld`等函数的性能和计时问题，这些函数在某些情况下会无法正确计算耗时。 启用方法：`s.UseUnifiedTimeBudgetForStreaming 1.`
    

### 世界书签

![世界书签](https://dev.epicgames.com/community/api/documentation/image/7d574ace-70e7-4d2c-9de3-2dae0bb974ca?resizing_type=fit)

世界书签是一套系统，能帮助用户在使用编辑器时在关卡内和跨多个世界进行导航。 在编辑器顶部菜单项，前往**窗口（Window） - 世界分区（World Partition） - 世界书签（World Bookmarks）**，可以打开专用的新版世界书签大纲视图。

世界书签是一种资产，既可共享也可本地保存。 在创建或更新时，摄像机变换和FOV、加载的区域和位置体积、数据层状态和编辑器上下文都会被保存在世界书签中，并在加载时恢复。

用户可以在编辑器偏好设置中设置"主页（Home）"书签，也可以在关卡设置中逐关卡指定默认书签，以便随时以最理想的可用上下文状态进行加载。 你可以将世界书签作为文本复制，以便与其他应用程序共享或在漏洞报告中使用。

通过世界书签大纲视图或编辑器的打开资产（Open Asset）对话框，用户可以访问世界书签，并进行分类和搜索。

### 子世界分区HLOD

[![子世界分区HLOD](https://dev.epicgames.com/community/api/documentation/image/1d9ced09-bdd1-4f37-bd13-71c6512334b0?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1d9ced09-bdd1-4f37-bd13-71c6512334b0?resizing_type=fit)

现在可以显示子世界分区的HLOD，即使其所属关卡未被流入，也可以通过在其世界设置（World Settings） - 世界分区设置（World Partition Setup）选项下的子世界分区关卡中设置新的编译独立HLOD（Build Standalone HLOD）选项来实现。

启用此选项后，为关卡生成的HLOD将被存储为单独的HLOD关卡，然后在进入"在编辑器中运行（PIE）"模式时和烘焙时期间，在流送生成步骤中被注入编辑器并嵌入主世界分区关卡。

子世界分区关卡属于关卡实例Actor，其关卡行为模式被设为独立（Standalone），其引用关卡会随世界分区而配置。 子世界分区不会将其内容嵌入主世界，而是根据其自身的世界分区系统管理其内部内容的流送。 子世界分区非常适合用于制作大型世界，在这种世界中，位置和流送需求的差别极大，且这些需求在单个更大的环境中并存。

### 地形 - 分批合并

[![地形 - 分批合并](https://dev.epicgames.com/community/api/documentation/image/e28a663c-dfdb-415f-92fb-fd58f750e419?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e28a663c-dfdb-415f-92fb-fd58f750e419?resizing_type=fit)

在虚幻引擎5.6之前，一旦修改地形就会触发所有图层的全局合并，从而导致在进行大规模工作时出现GPU内存不足的问题。 虚幻引擎5.6默认启用分批合并（Batched Merge）功能，该功能会在应用更新时将大型地形细分为多个不同区域，从而解决在处理大型地形时遇到的可伸缩性问题。

分批合并适用于所有的基础地形编辑操作和地形补丁插件。 某些依赖BP笔刷的系统尚不完全支持分批合并，此类系统仍然会导致全局合并，包括地块和水体笔刷。 为利用此功能，部分笔刷可能会在后续版本中更新，但目前在使用这些系统时，分批合并会像全局合并一样工作，因此依然会出现类似的GPU内存不足问题。 为避免这种情况，请尽量避免使用BP笔刷。

要**禁用**分批合并：`landscape.EditLayersLocalMerge.Enable 0`

要**启用**分批合并：`landscape.EditLayersLocalMerge.Enable 2`

要**调整**分批合并：`landscape.EditLayersLocalMerge.MaxResolutionPerRenderBatch`（默认批处理大小为1024 x 1024，可在内存和效率之间取得良好平衡）

### 地形 - 关卡实例和数据层支持

[![地形 - 关卡实例和数据层支持](https://dev.epicgames.com/community/api/documentation/image/4b1c1b2f-090d-4a72-9977-77152c3de1f0?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/4b1c1b2f-090d-4a72-9977-77152c3de1f0?resizing_type=fit)

现支持在关卡实例内编辑地形，无论该地形是位于被编辑的关卡实例内部，还是位于外部的主世界。

你可以将地形和植被之类的分区Actor重新分配到不同的数据层，方法是打开右键菜单并应用当前编辑器的上下文。

### 天穹（Celestial Vault）

[![天穹（Celestial Vault）](https://dev.epicgames.com/community/api/documentation/image/b16220cc-a66e-4ca8-907a-38d747db2875?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/b16220cc-a66e-4ca8-907a-38d747db2875?resizing_type=fit)

天穹（Celestial Vault）插件是"昼夜序列（Day Sequence）"功能的全新实现，可提供完整的昼夜循环效果，其中所有天体（包括太阳、月亮、行星、恒星及深空天体）均基于星历表中的日期/位置精确定位，并采用精确的光照单位。 它采用数据驱动模型，既适用于地球天空模拟，也适用于虚构星座设计。

## 角色和动画

### Sequencer整理

虚幻引擎5.6提供了工具和操作来提升整理水平，以帮助用户更好地管理复杂的过场动画，例如拥有多层级镜头/子序列和跨序列绑定的过场动画。 此外，我们还将逐步清理Sequencer在对齐和编辑器静音方面的应用。

-   针对分层序列的大纲视图样式面板
    
    -   可自定义的列，用于查看镜头和子序列的属性和开关操作。
        
    -   搜索和筛选。
        
-   添加了一种名为代理绑定（Proxy Binding）的新型绑定，用以轻松引用父序列、兄弟序列或子序列中的绑定。
    
-   轨道的静音（Mute）和独奏（Solo）选项现仅由编辑器提供，不会被保存到资产中。
    
    -   停用（Deactivate）轨道选项仍会被保存到资产中。
        
-   对齐选项的清理。
    

### 过场动画的无缝Gameplay过渡（试验性）

![过场动画的无缝Gameplay过渡](https://dev.epicgames.com/community/api/documentation/image/1ad84b15-fd3d-4e8e-a255-3ea90e7bcc57?resizing_type=fit)

搭配新版虚幻动画框架，Sequencer能够将角色动画无缝过渡到Gameplay中，或从中过渡出来。 此功能作为新的试验性插件提供，插件名为Sequencer Anim Mixer，用户可选择启用与否。

-   按优先级顺序混合轨道以生成动画姿势。
    
-   用C++创建自定义动画轨道。
    
-   新的拼接轨道，使用运动匹配确定最佳动画，以动态Gameplay动画为起点进行过渡（仅UAF）。
    
-   对根骨骼运动动画的更优控制和支持
    
-   支持动画蓝图和虚幻动画框架。
    

### Sequencer中的Gameplay摄像机整合（试验性）

![Sequencer中的Gameplay摄像机整合](https://dev.epicgames.com/community/api/documentation/image/4d4bc39c-1184-40d3-8c7a-d24c837fc9c7?resizing_type=fit)

随着虚幻引擎5.5对Gameplay摄像机系统的引入，Sequencer将支持Gameplay摄像机绑定。 这将为过场动画创作解锁用户生成程序化摄像机的强大功能：

-   直接在Sequencer中使用Gameplay摄像机绑定和为参数制作动画。
    
-   直接在Sequencer中使用Gameplay摄像机指示器。
    
-   将Gameplay摄像机绑定和指示器指定为镜头切换的一部分。
    

### Sequencer的相对时间缩放（试验性）

许多叙事性交互体验都会在过场动画中用到本地化音频。 虚幻引擎5.6扩展了Sequencer的功能，使其能够根据本地化音频进行相对缩放，从而让序列匹配不同语言的时序。

-   音轨支持预览语言变更。
    
-   可以分配音频分段，使用本地化音频进行动态缩放。
    
-   序列中的所有元素都将根据被驱动音频分段的时序进行缩放。
    
-   本地化的骨架动画也将根据音轨的预览语言进行变更。
    

### 重定向操作堆栈

[![重定向操作堆栈](https://dev.epicgames.com/community/api/documentation/image/75257305-48a0-46f8-badf-3fa1ea989abf?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/75257305-48a0-46f8-badf-3fa1ea989abf?resizing_type=fit)

在虚幻引擎5.6中，我们已将IK重定向器的框架转换为可重新排序的操作堆栈。 IK重定向器的功能因此得到了拓展，可以进行自定义操作，从而更好地实现基于美术指导的行为，具体如下：

-   全新的编辑器用户体验，以更好地创作重定向行为。
    
    -   在操作堆栈中对任意一组重定向操作进行排序。
        
    -   访问单个操作属性。
        
-   在重定向操作之间或之后使用FK调整对姿势进行偏移。
    
-   将自定义操作写入操作堆栈。
    
-   不依赖IK绑定即可创建重定向。
    
-   更好的运行时优化、新的脚本编写和重定向配置文件API。
    

### Tween工具

![Tween工具](https://dev.epicgames.com/community/api/documentation/image/1f729d9a-dc78-493f-b462-082b07bab8f2?resizing_type=fit)

Tween工具是动画师工具箱中不可或缺的一部分。 我们重新设计了Tween工具的外观，并新增了功能以提高实用性。 在此之前，仅视口中才有这些工具，如今我们在曲线编辑器的顶部工具栏中直接嵌入了这些工具，方便用户快速访问。 你可以使用新的热键来间接驱动这些工具（要求按住修饰符）、切换不同的滑块，甚至打开或关闭超量模式。

-   新的外观和样式
    
-   新的超量模式
    
-   现已在曲线编辑器的工具栏中嵌入
    
-   新的热键
    
    -   间接操纵
        
    -   开关滑块
        
    -   选择滑块
        
    -   开关超量模式
        
-   新的滑块
    
    -   时间偏差
        

### 运动尾迹

运动尾迹适用于直接在视口中查看和调整弧线及间距。 我们在虚幻引擎5.6中重写了运动尾迹，提升了实用性和性能。 现在你可以直接在视口中使用新图标激活运动尾迹，而且图标旁会显示所有选项。 我们还对运动尾迹进行了统一处理，可用于Actor和角色控制，同时可理解约束和空间切换。

-   提升了性能。
    
-   对Actor也生效的统一系统。
    
-   可自定义的新样式和外观：
    
    -   虚线
        
    -   时间
        
    -   热图
        
-   新的视口工具栏图标。
    
-   新的固定系统：
    
    -   可偏移尾迹。
        
    -   可将尾迹放置到其他空间。
        
-   可选择和调整视口内的关键点。
    
-   适用空间切换和空间约束。
    

### Sequencer曲线

![Sequencer曲线](https://dev.epicgames.com/community/api/documentation/image/bdbb5f14-dea3-433b-b0a1-68f031d07d39?resizing_type=fit)

我们在新版本中对曲线编辑器进行了优化。 它现在速度更快、性能更强，而且针对美术师对关键帧的可视化和操控进行了高度优化。

**修复**

-   性能 - 绘制/显示
    
-   为撤消堆栈（Undo Stack）添加了关键点选择功能
    
-   边框选择精度
    
-   修复了规格化模式的缩放
    
-   调整了移动关键点时的“移位（Shift）”约束轴
    
-   粘贴关键点将总是进行替换。
    
-   优化了重定时工具
    
    -   拖动的热键现已生效
        
    -   撤销堆栈现已具备添加/删除锚点功能
        
-   更灵敏的缩放速度
    

**新增**

-   键值指示器
    
-   重新设计的工具栏
    
    -   合并的图标
        
    -   内嵌了Tween工具，且具备可编辑的热键
        
        -   U+鼠标左键 = 间接推动滑块
            
        -   Shift+U = 开关滑块
            
        -   Ctrl+U = 开关超量模式
            
    -   顶部栏新增欧拉筛选器图标
        
-   格栅工具
    
    -   移动边缘
        
    -   双击以展平边缘
        
    -   双击选框以垂直翻转选定的关键点
        
    -   倾斜角
        
    -   可正常使用用户调整的握柄（展平和翻转）
        
-   用户调整的握柄可与所有缩放工具更好地搭配使用。
    
-   智能关键帧对齐（Ctrl-H）
    
-   相对粘贴（Alt-V）
    

### 动画修复和更新

![动画修复和更新](https://dev.epicgames.com/community/api/documentation/image/3c1a6fc6-677b-4861-83fd-24e8c5c0a0b2?resizing_type=fit)

我们优化了通道盒，为其添加了新的选择方法和多单元格推移功能，还能让用户对选定的多个单元格进行输入操作和数学运算。 通道盒现在还支持对多个对象进行选择和操作。

我们更新了约束系统，现在动画工作流程的可控性和灵活性更强了。 有了新的父项预选功能、更流畅且更强大的求值功能以及大量其他优化，约束的设置和管理现已变得更快、更直观、更可靠。

最后，动画大纲视图会列出各种绑定的功能按钮。 我们改进了这些功能按钮的可达性，并为其提供了更多显示选项。

-   动画细节
    
    -   对多个项目进行多选和数值调整
        
    -   为多个项目输入数值并进行数学运算
        
    -   支持多对象和多单元格
        
    -   小数的显示选项
        
    -   绘制选择选项
        
    -   拖动值时可用乘数
        
        -   SHIFT+鼠标左键拖动 = \*10
            
        -   CTRL+鼠标左键拖动 = /10
            
-   约束
    
    -   优化了求值引擎
        
    -   优化了约束双关键点
        
    -   能够在创建约束前选择父项
        
        -   从大纲视图拖放
            
        -   使用箭头填充父项
            
-   动画大纲视图
    
    -   对控制绑定进行了分组
        
    -   聚焦所选项
        
    -   优化了对模块化绑定的支持
        
        -   按模块选项对功能按钮进行了排序
            
        -   展平了模块列表选项
            
        -   可逐模块开关显示
            
-   动画层
    
    -   更改层时可保留选择的项目
        
    -   为零关键帧（ZeroKey）和直通关键帧（Passthrough Key）分配了新图标和新热键
        

### 按比例缩放了重定向

![按比例缩放了重定向](https://dev.epicgames.com/community/api/documentation/image/834021b3-d525-4373-a48e-2b8c996ba1e6?resizing_type=fit)

我们扩展了IK重定向器的功能，使其可重定向不同缩放比例的角色。 现在，包括上述功能在内的更多功能都可以更轻松地应用于角色骨架，只要角色骨架兼容或层级相似即可。

-   全局缩放源运动，以便更好地固定IK目标
    
-   针对道具/IK骨骼的相对固定
    
-   在IK重定向器内，应用"从网格体复制姿势（Copy Pose From Mesh）"的逻辑
    
-   针对"从网格体重定向姿势（Retarget Pose From Mesh）"节点的"姿势输入（Pose Input）"引脚
    
-   分离针对平移和旋转的"混合到源（Blend to Source）"功能
    

### 控制绑定的物理效果（试验性）

![控制绑定的物理效果](https://dev.epicgames.com/community/api/documentation/image/ec41730e-ffc1-4cae-82db-3dc05090f818?resizing_type=fit)

为数字动画增添无与伦比的真实感和可信度。 快速轻松地以程序化的方式为动画和控制绑定添加物理运动。

-   **以程序化的方式**，使用节点为控制绑定中的角色创建物理设置。
    
-   为模块化控制绑定创建**基于物理的模块**。
    
-   使用Sequencer制作附带物理效果的**动画**和**姿势**。
    

### 塑造变形形状

[![塑造变形形状](https://dev.epicgames.com/community/api/documentation/image/1ffb12dd-3c25-4ce6-885f-24863c3bd3fe?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1ffb12dd-3c25-4ce6-885f-24863c3bd3fe?resizing_type=fit)

使用虚幻引擎内置的建模工具，直接在骨骼网格体编辑器中创建和塑造变形目标。 轻松编辑已有的变形目标，并在运行时快速塑造形状。

-   骨骼网格体编辑器中新增了**塑造模式**
    
-   创建新形状或编辑旧形状。
    
-   将形状连接到控制绑定，以在动画中使用。
    

### 几何体缓存

[![几何体缓存](https://dev.epicgames.com/community/api/documentation/image/754dea90-58e9-40fe-8748-f961cb842fd6?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/754dea90-58e9-40fe-8748-f961cb842fd6?resizing_type=fit)

现在你可以将骨骼网格体动画烘焙到几何体缓存中。 这通过通用场景描述（USD）实现几何体数据在不同软件包（如Houdini）之间的交换。

-   输出由GPU回读所捕获的实际渲染几何体。
    
-   如有必要在高帧率下进行缓存，则逐帧捕获多个样本。
    

### 绑定运动器（试验性）

![绑定运动器](https://dev.epicgames.com/community/api/documentation/image/9fced5ee-c195-4b65-9ddb-bf0c9f638fd5?resizing_type=fit)

此插件旨在帮助你在控制绑定内部制作以程序化方式行走的绑定，例如在运行时沿各种几何体行走的蜘蛛。

-   新的**运动器插件**，可与控制绑定配合使用。
    
-   运动器节点。
    
-   使用控制器来控制由玩家控制的机制，或以程序化的方式用于背景角色。
    
-   适用于具有任意数量肢体的角色。
    

### Mutable自定义宏库和流送

[![Mutable自定义宏库和流送](https://dev.epicgames.com/community/api/documentation/image/718318bf-1786-4c15-ad57-5f44a88b60f7?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/718318bf-1786-4c15-ad57-5f44a88b60f7?resizing_type=fit)

**宏库**提供一种复用Mutable图表的方式。

-   在不同自定义选项之间共享子图表，以获得更好的可维护性、可变更性和开发效率。
    

改善了可自定义网格体的**Mutable流送**。

-   自定义网格体将直接集成到UE流送系统中，从而以更低的CPU和内存占用在最佳LOD下实现更快速地生成。
    

## MetaHuman

适用于虚幻引擎5.6的MetaHuman不断升级MetaHuman产品套件，在角色创建、动画制作和风格设计等多个领域提供全新功能与特性。 

![](https://dev.epicgames.com/community/api/documentation/image/1783178e-52fb-4edd-b976-6f5916263c34?resizing_type=fit)

在最新版本中，**MetaHuman Creator**随虚幻引擎一同发布，支持创建视觉保真度显著提升的MetaHuman角色，并配备全新的参数化身体系统。 **MetaHuman Animator**能够通过更广泛的单摄像机设备进行实时面部动画解算，同时基于音频的动画可添加头部动作，并支持对情感状态的创意化控制。

MetaHuman及其兼容资产首次实现了在Fab上进行交易，让更多创作者能够分享作品并参与市场交易。 

**Maya版MetaHuman**和**Houdini版MetaHuman**支持在这些平台上继续进行MetaHuman创作，同时EULA已更新，允许MetaHuman在任意引擎中使用。

### MetaHuman Creator

![](https://dev.epicgames.com/community/api/documentation/image/666a3b7f-6619-484c-8028-f371c4bd5301?resizing_type=fit)

在虚幻引擎5.6中，MetaHuman Creator工作流已集成至虚幻引擎内，支持使用全新的MetaHuman角色资产在编辑器中直接创建和制作MetaHuman角色。 全新的参数化身体系统与提升的视觉保真度相结合，为塑造所需角色形象提供了更高的灵活度。 现在，你可以在MetaHuman Creator中直接使用MetaHuman兼容的自定义Groom与布料资产，这意味着角色视觉效果将达到全新高度。  

此外，为了展示这些新功能的潜力，我们还提供了一组全新的MetaHuman预设角色，可供你直接使用。

### MetaHuman Animator

![](https://dev.epicgames.com/community/api/documentation/image/586538e1-9fac-4db7-8ade-0ec2eea1aa42?resizing_type=fit)

现在，你可以使用各种单摄像机数据源（包括网络摄像头）、移动设备或音频输入实时进行动画解算。 通过与Live Link的集成，实时动画可用于在MetaHuman Creator中预览角色，或在编辑时为在关卡中放置的角色制作动画。 

对于仅通过音频输入来离线解算的动画，现在可包括自然的头部动作，同时还允许你调整角色情绪状态。

要使用深度数据（iOS设备或立体摄像机对）解算动画或使用MetaHuman身份，需安装全新的[MetaHuman Animator 深度处理](https://www.fab.com/listings/8efe3d9d-ae3b-4d75-955c-d404ff8108f9)插件。

### MetaHuman捕捉

为支持MetaHuman Animator的实时动画，现可从[Google Play 商店](https://play.google.com/store/apps/details?id=com.epicgames.facelink)下载**Live Link Face（测试版）**应用程序，适用于搭载Qualcomm Snapdragon 8 Gen 1（或更高版本）芯片组的Android设备。 iOS端的Live Link Face应用程序（可在[App Store](https://apps.apple.com/us/app/live-link-face/id1495370836)获取）也已更新，支持在设备端实时生成动画。  

同时，**Live Link中心**现用于接收表演数据，以便在MetaHuman Animator中进行离线动画解算，无论使用何种设备，该工具都能简化数据管理，优化虚拟制片和表演捕捉的设置。

### Fab上的MetaHuman

在此版本中，我们在Fab商城上建立了MetaHuman频道，借助虚幻引擎中提供的验证和打包工具（MetaHuman管理器），你可以轻松购买和出售MetaHumans以及与MetaHuman兼容的Groom和布料资产。

要在Fab商城上交易MetaHuman，需遵守[虚幻引擎EULA](https://www.unrealengine.com/en-US/eula/unreal)、[Fab EULA](https://www.fab.com/eula)和[Fab 分销协议](https://www.fab.com/distribution-agreement)。

### Maya版MetaHuman

[Maya版MetaHuman](https://www.fab.com/listings/9e3bf55e-d4c3-44fc-a3d4-ec4cb772ec29)是适用于Maya 2022-2025的全新插件，它提供三个新工具，支持在Maya中直接创作和处理MetaHuman角色。  

**角色组装器（Character Assembler）**工具可加载从虚幻引擎中MetaHuman Creator导出的MetaHuman角色，便于预览和动画制作。  

全新的**表情编辑器（Expression Editor）**工具可微调角色的面部表情，它采用的正是我们在创建很多自有MetaHuman角色时所用的工具。  

最后，全新的**Groom导出器（Groom Exporter）**支持将XGen Groom轻松导出为MetaHuman兼容的Groom，以便与虚幻引擎的MetaHuman Creator配合使用。 

Groom导出器（Groom Exporter）受到[Fab上的Groom入门套件](https://www.fab.com/listings/7a345328-2e1d-42d7-9ff3-b0ed8d7effd7)的支持。

### Houdini版MetaHuman

[Houdini版MetaHuman](https://www.fab.com/listings/7bbdfbb5-5eaf-4aa6-b32b-b8b048ebea25)是适用于Houdini 20.5的全新插件，它提供一组HDA工具，用于创建MetaHuman兼容的Groom资产，这些资产可导出并用于虚幻引擎的MetaHuman Creator。  

该插件受到[Fab上的Groom入门套件](https://www.fab.com/listings/d5a3a803-e63d-4c40-a7b3-150acd8f394e)的支持。

## 编辑器和UI系统

### 内容浏览器

[![内容浏览器](https://dev.epicgames.com/community/api/documentation/image/9e85ff2f-d584-4f5c-8e1f-0f6c8ad56e43?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9e85ff2f-d584-4f5c-8e1f-0f6c8ad56e43?resizing_type=fit)

我们重新设计了内容浏览器以优化资产管理和查看体验，并实现了更流畅的缩略图大小调整功能。 此外，它现在能够在横向和纵向上无缝运行。

### 视口工具栏导航

[![视口工具栏导航](https://dev.epicgames.com/community/api/documentation/image/09de8afe-a4fd-45f0-bad8-94f4ff6c61ab?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/09de8afe-a4fd-45f0-bad8-94f4ff6c61ab?resizing_type=fit)

视口工具栏经过了重新设计，让你能更快速地访问重要工具。 我们对视口工具栏进行了更新，能够更快、更直观地访问关键设置项，如相机控制、视图模式和可伸缩性选项等。 工具栏现在可以动态地调整大小，确保了在视口尺寸较小的时候，也能为你显示最相关的工具。

编辑器模式（如选择模式或建模模式）现在都能提供选项菜单及其快速访问工具，并将这些功能直接集成到了视口工具栏中。

资产编辑器也受益于新的设计，实现了虚幻编辑器中统一的工具栏操作体验。

## 开发者迭代

### 增量烘焙（试验性）

增量烘焙在虚幻引擎5.6中处于试验阶段。它通过缩短整体烘焙时间，让你能更快地在目标设备上迭代。 目前烘焙的输出存储在Zen服务器中。同时，烘焙过程会自动分析资产变更，只烘焙发生了更新的项目资产。 这适用于所有的原生引擎资产，包括蓝图和世界分区图块。

### UBA缓存服务器（试验性）

通过缓存C++构建的输出，在持续集成（CI）构建运行中实现快速、确定且可伸缩的周转，从而避免重复工作。

### Zen服务器：烘焙输出存储

[![Zen服务器：烘焙输出存储](https://dev.epicgames.com/community/api/documentation/image/80e159b0-1d80-4e64-b4ef-e4696ecfe048?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/80e159b0-1d80-4e64-b4ef-e4696ecfe048?resizing_type=fit)

在虚幻引擎5.6中，已可使用Zen服务器来存储烘焙输出。

先前，系统将经烘培的输出数据作为松散文件存储在磁盘上，从而导致了文件系统进程开销。 而现在，只要在项目设置中启用，平台的烘焙数据就会被存储在本地和/或共享的虚幻Zen存储服务器以及（可选）云DDC存储中。

将烘焙数据直接存储在Zen服务器中，可以带来更好的调节性能和网络I/O性能。 这也是充分利用新功能的前提条件，例如针对烘焙过程的Zen加载器路径、针对目标迭代（测试版）的Zen流送，以及增量烘焙（试验性）。

### Zen服务器 - 流送至目标平台（Beta测试版）

[![Zen服务器 - 流送至目标平台](https://dev.epicgames.com/community/api/documentation/image/01f4250d-1c00-4904-8bcb-bef949f66887?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/01f4250d-1c00-4904-8bcb-bef949f66887?resizing_type=fit)

**Zen流送**如今在虚幻引擎5.6中进入了Beta测试阶段。 它省去了完整打包构建和复制/安装部署等消耗时间的步骤，简化了内容迭代和在目标平台上的测试，从而提高了工作效率。 烘焙数据将通过网络/直接连接从Zen服务器流送到目标设备。 目标设备会对烘焙数据进行本地缓存，从而避免重新流送先前加载过的数据。 另外，你还可以选择将打包的烘焙数据（`.pak`）流送至目标平台。

### 新版项目启动程序UI（Beta测试版）

[![新版项目启动程序UI](https://dev.epicgames.com/community/api/documentation/image/7a820d8f-ab4b-4d26-b1ac-ba056d913fe7?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/7a820d8f-ab4b-4d26-b1ac-ba056d913fe7?resizing_type=fit)

虚幻引擎5.6引入了新的项目启动程序用户界面（Beta测试版）。我们彻底地重新设计了这套用户界面，提高了可用性和效率，让你可以更快捷地创建和管理设备启动配置文件。 新版本仍会保留旧版的项目启动程序界面，同时我们将努力让新版界面进入可投入使用状态。

新版界面更为简洁，可以快速选择构建、烘焙和设备部署的配置，还提供用于导入烘培后快照的新Zen服务器功能、对目标进行Zen流送、增量烘焙等。

### Zen服务器：快照（Beta测试版）

现在烘焙快照在虚幻引擎5.6中进入了Beta测试阶段。

烘焙依赖于编译代理程序的持久状态，从而避免重新烘焙相同的数据。 但我们无法保证下一项烘焙任务会被分配给同一代理程序。

而Zen服务器快照功能会存储烘培作业的状态，使其能够快速恢复，并重新用于另一个编译代理程序的新作业，从而实现更快、更大量的构建农场烘培。

### macOS和Linux上的UBA着色器编译

虚幻引擎5.6版本的虚幻编译加速功能现在支持在macOS和Linux主机编译设备上进行分布式着色器编译。

虚幻编译加速器（Unreal Build Accelerator, UBA）是用于C++和着色器编译的本地和分布式编译解决方案，需要与虚幻编译工具和/或Horde的远程编译（计算任务）系统结合使用。

## 程序化内容生成（PCG）

### GPU草和微散射

[![GPU草和微散射](https://dev.epicgames.com/community/api/documentation/image/a2f6fc76-5e1e-486c-b5f7-0998c0df9abd?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/a2f6fc76-5e1e-486c-b5f7-0998c0df9abd?resizing_type=fit)

我们增加了对PCG GPU计算的支持，以便直接在GPU上对地形RVT和草地贴图进行采样，从而在运行时构建高效且可定制的草地生成。 我们添加了RVT启动（RVT Priming）功能，可以控制范围和特定的Mip级别，以便在预先渲染RVT的情况下运行PCG GPU计算。

我们添加了对拷贝点GPU计算的支持，以及一个新的复制点选项，利用匹配索引，将多个高密度微细节PCG数据资产分布到各自的目标点上，并通过单次操作，在运行时的GPU上实现高效生成。 你可以使用此方法为较大的网格体添加高频细节（如岩石和树木上的苔藓），同时还能将磁盘空间和性能占用控制在预算范围内。

### GPU计算性能

![GPU计算性能](https://dev.epicgames.com/community/api/documentation/image/6487e378-8ed4-4dd0-bc5d-cb963db74216?resizing_type=fit)

虚幻引擎5.6针对PCG GPU计算引入了多项性能优化，具体如下：

-   支持在处理子图表、采集节点和网格大小节点时进行延迟回读，以避免繁重的GPU到CPU的往返操作。
    
-   通过轻量级、仅计算实例数的CPU往返操作，自动调整缓冲区的大小。 这样就可以通过GPU上的特性过滤掉点和生成静态网格体，且无需退却到最差大小的缓冲区，从而显著优化了写入GPU场景的实例数，同时还能防止溢出。
    
-   编译时优化和验证。
    
-   减少了主线程占用。
    
-   更早地从显存中释放临时资源。
    

### GPU分层生成

[![GPU分层生成](https://dev.epicgames.com/community/api/documentation/image/45d91a3a-e0da-4b36-979c-8124199e203b?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/45d91a3a-e0da-4b36-979c-8124199e203b?resizing_type=fit)

针对同时使用分层生成和GPU计算的图表，可以从GPU向下游GPU节点传递数据，并以较小的网格大小执行。

### GPU数据接口

[![GPU数据接口](https://dev.epicgames.com/community/api/documentation/image/95fe43ed-733b-425a-80f5-125604c6f04d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/95fe43ed-733b-425a-80f5-125604c6f04d?resizing_type=fit)

#### 纹理（读/写）

纹理数据接口支持使用Get Texture Data和Base Texture Data节点的输入和输出以及特定的PCG GPU计算HLSL核心声明，在GPU上读取和写入纹理。 我们还添加了预配置的纹理处理器（Texture Processor）和纹理生成器（Texture Generator）HLSL运算符。

#### 静态网格体

静态网格体数据接口支持使用获取静态网格体资源数据和网格体资源数据节点的输入和输出，以及特定的PCG GPU计算HLSL核心声明，在GPU上对网格体顶点和三角形进行访问和采样。

#### 运行时虚拟纹理（RVT）

RVT数据接口支持使用获取虚拟纹理数据和虚拟纹理数据节点的输入和输出以及特定的PCG GPU计算HLSL核心声明，从GPU上对现存RVT和RVT布局进行读取。

我们添加了RVT启动（RVT Priming）功能，可以控制范围和特定的Mip级别，以便在预先渲染RVT的情况下运行PCG GPU计算。

#### 地形RVT和草地贴图

获取地形节点可用于为GPU计算自动检索地形RVT。 还有生成草地贴图节点可用于指定需准备的草贴图，以供在GPU计算核心中使用。

### 点数据 - 数组结构

[![点数据 - 数组结构](https://dev.epicgames.com/community/api/documentation/image/50b36121-58b3-43d9-9708-649e86a2e2ce?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/50b36121-58b3-43d9-9708-649e86a2e2ce?resizing_type=fit)

使用PCG时的总体内存消耗降低。

新的默认`UPCGPointArrayData`点数据会以数组结构（SoA）表示法存储属性（Property）和特性（Attribute），这使其尤其适合用于处理大量的点和特性。 这大大优化了编辑器内和运行时用例中的内存占用。

### 执行效率

[![执行效率](https://dev.epicgames.com/community/api/documentation/image/bce0184a-a039-4577-ae82-be3eb2088e4a?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/bce0184a-a039-4577-ae82-be3eb2088e4a?resizing_type=fit)

在虚幻引擎5.6中，我们优化了PCG框架在离线编辑器内和运行时用例中的执行效率，更改如下：

-   现在默认启用多线程图表执行。
    
-   动态调度（如循环）对性能的影响已被大幅降低。
    
-   游戏线程中移出了大量执行和调度代码。
    
-   现在默认启用逐数据CRC缓存，从而减少了集合中仅有部分数据发生变化时的工作量。
    
-   更高的CRC稳定性实现更佳的资源再利用。
    
-   优化了调度开销。
    
-   我们在运行时生成调度策略中添加了视锥体剔除选项。
    
-   我们为运行时用例添加了世界流送依赖性选项。
    
-   你现在可以使用`pcg.RuntimeGeneration.NumGeneratingComponents`控制对运行时生成过程中的并发生成的限制。
    
-   我们为八叉树、地形缓存等项目添加了准备阶段。
    

鉴于上述性能优化，我们调整了默认的PCG编辑器和运行时框架时间预算，以减少图表执行时该框架所产生的整体影响。 你应更改和微调PCG帧时间预算（毫秒），具体请以具体项目需求和编辑器和运行时执行的预算为准。具体需利用：`pcg.EditorFrameTime`以及`pcg.FrameTime`。

### 群系核心V2插件（试验性）

![群系核心V2插件](https://dev.epicgames.com/community/api/documentation/image/b06fc85b-4849-4249-9fd7-e9adcabae941?resizing_type=fit)

群系核心和群系示例插件V2对基于PCG的工具进行了全面改造，旨在解决性能和可伸缩性问题、改进工作流程并增加新功能。

它在概念上发生了重大的改变，即逐个针对各群系actor，在本地进行一切事物的定义和生成。 一套新的本地群系核心PCG组件和图表会负责针对各群系actor逐个执行并产出点数据。 随后，这些点将在全局群系核心中被使用，而全局群系核心只负责更新和生成修改过的点数据。 此次改造可以处理上述的各项要点，同时保持数据与旧版兼容，并解锁以下新功能：

1.  逐群系actor进行本地更新。
    
2.  逐群系进行本地缓存，为大型世界的可伸缩性和性能进行了简化。
    
3.  逐群系进行本地混合，同时还可以控制混合范围、噪点和密度。
    
4.  支持多群系分层，替代之前的二元行为。
    
5.  根据优先级，为所有群系应用生成点之间的差异。
    
6.  运行时GPU地面散射示例支持本地群系缓存数据、逐群系混合、微细节汇编，并使用新的RVT数据接口。
    
7.  支持完整程序集和子程序集。
    
    -   程序集属性重载、应用层级和基于标签的变换。
        
8.  新的基于纹理的群系actor类型，使用actor边界作为UV，并在能够控制群系颜色容差的情况下应用其变换。 （即适用于群系贴图，也适用于任何遮罩）。
    
9.  本地资产可选，群系定义对每个群系actor都唯一且默认嵌入，因此减少了对单独资产文件的需求。
    
10.  本地预览模式在创建新群系时更为高效。
    
11.  向下兼容现有数据。
    
12.  图表的简化和整理，包括使用内联常量、删除不必要的循环以及消除群系缓存处理的复杂性等。
    

新版本附带了一个运行时GPU地面散射示例，该示例利用了PCG GPU地形RVT接口，并通过索引匹配使用GPU复制点进行微散射。 该示例非常适合用来深入了解GPU新功能的使用方法。

不管是群系核心工具，还是展示工具内容的群系示例，我们都已在其原始插件内容的基础上更新至虚幻引擎5.6版本。  

在升级之前，尽管数据兼容性基本得到了保留，如果插件尚未被复制，且直接在源代码中进行了使用或修改，我们建议对插件进行复制。

### 元数据域

在虚幻引擎5.6中，我们添加了对点和特性集之外的元数据支持，还扩展了框架以支持元数据域。 我们还更新了特性操作，以支持这一概念。

#### 元数据域

元数据域定义了应在哪个级别访问和写入元数据，这包含了从点条目到点数据的种种级别，这使流动特性成为理想选择，同时无需将特性写入每个条目。 以网格体为例，这一点将很容易理解：这时元数据可以存在于顶点、三角形和网格体本身之中。

在虚幻引擎5.6版本中，最高级别的域是数据域。 在选择域进行读取或写入时，域以`@`开头。

示例：要在最高数据域中写入一个新特性，请在特性节点中使用`@Data.MyAttribute`作为输出特性名称。 然后在乘算特性操作节点中使用`@Data.MyAttribute`作为源之一，并将其应用到每个点数据条目的`$Scale`属性中。

每个数据对象都需要了解哪些域受支持，以及哪些域是默认域。 默认域名为：

-   对于点，默认域为`@Points`
    
-   对于特性集，默认域为`@Elements`
    
-   对于样条线，默认域为`@ControlPoints`
    

对于所有其他空间数据，默认域为`@Data`。 如果没有指定的域，则使用默认域，这与虚幻引擎5.6之前处理特性操作时的行为一致。

数据域目前仅限于单个值，但在未来版本中可能会得到扩展。

#### 样条线 - 属性和特性

在虚幻引擎5.6版本中，你可以直接操作控制点的属性，添加、读取或写入任何元数据特性，并将它们用于不同的特性操作，而无需将其转换为点数据。

可访问的控制点属性包括：  

-   `$Position`
    
-   `$Rotation`
    
-   `$Scale`
    
-   `$Transform`
    
-   `$ArriveTangent`
    
-   `$LeaveTangent`
    
-   `$InterpType`
    
-   `$LocalPosition`
    
-   `$LocalRotation`
    
-   `$LocalScale`
    
-   `$LocalTransform`
    

样条线数据域特性包括：  

-   `@Data.$SplineTransform`
    
-   `@Data.$IsClosed`
    

### 图表参数UX

![图表参数UX](https://dev.epicgames.com/community/api/documentation/image/46cb5d0b-8e5e-4517-beee-3a6999e4e7aa?resizing_type=fit)

由于框架的整体可用性得到了多项优化，PCG图表参数现在也更易于使用。

虚幻引擎5.6带来的变更如下：

-   专用的图表参数面板，可停靠在PCG图表编辑器中的任意位置。
    
-   直接拖放到图表中即可获取参数。
    
-   将参数拖动到所需位置即可重新排序。
    
-   在图表中快速将常量转换为参数，反之亦可。
    
-   右键点击节点控制板即可创建新的常量或参数。
    
-   将图表参数分类，并使用"|"符号表示子类别（例如蓝图）。
    
-   修复了将图表参数设置为蓝图类的PCG组件时会发生重载的问题。
    

### 内联常量

与图表参数一样，内联常量也是框架可用性优化的一部分。 所有特性操作节点（例如Add、Multiply和Compare运算符等）都支持内联常量。 它可以直接在节点输入引脚上输入常量值，类似于蓝图和材质图表的节点，而无需创建单独的常量节点。

右键点击对应的输入引脚，即可修改内联常量的类型。 你可以将其重置为默认类型的值，还可以禁用以强制连接到输入，以便按需控制其执行。

### 预览视口

PCG图表编辑器现在支持多个数据视口，可预览被检查节点的数据，帮助你在创建世界和资产的过程中根据上下文开展迭代工作流程。

虚幻引擎5.6的数据视口支持的数据类型包括：

-   静态网格体和动态网格体
    
-   纹理
    
-   点
    
-   体积
    
-   样条线
    
-   碰撞形状
    
-   图元
    

### 调试工作流程

我们针对PCG图表编辑器、子图表、循环、深层级和多项PCG组件优化了调试工作流程。

虚幻引擎5.6的改进如下：

-   可在图表之间进行直观的导航，能够快速跳转到和返回至选定的调试对象函数，且选择状态保持不变。
    
-   优化了所选数据的稳定性，能够在特性列表视图中进行排序和筛选。
    
-   动态填充的调试对象树状图，附带筛选功能。
    
-   基于所选调试对象的动态填充查找功能，可在动态子图表中进行搜索。
    
-   优化的错误和警告显示和筛选功能。
    
-   双击特性的定界符，即可根据显示的内容将行展开。
    

### 模板图表

[![模板图表](https://dev.epicgames.com/community/api/documentation/image/4ab25cc3-f3da-4441-a113-c5d371c42687?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/4ab25cc3-f3da-4441-a113-c5d371c42687?resizing_type=fit)

现在你可以使用图表设置的IsTemplate标记，将任何图表标记为模板。 创建新的PCG图表时，你可以选择一个模板图表作为起始点，该模板将包含预配置的节点和图表参数。

对于依赖PCG或提供示例的系统用户而言，这种方法能帮用户轻松进行图表的预配置。

### 图表自定义

[![图表自定义](https://dev.epicgames.com/community/api/documentation/image/c6b5a44c-1874-46ad-a6a5-5ce40987d89c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/c6b5a44c-1874-46ad-a6a5-5ce40987d89c?resizing_type=fit)

现在，你可以筛选PCG图表的可用节点类别和子图。

结合模板图表，即可轻松限制特定上下文中的可访问内容。 将两者结合，还可以将PCG编辑器本身作为抽象工具加以利用，即限制用户仅可访问特定工具或系统才能使用的内容，而用户无需事先了解关于PCG的知识。

例如，你可以创建一款PCG地下城生成器工具，其中PCG图表编辑器因具备图表模板和自定义功能而成为高级别地下城布局创建工具，它限制用户仅可访问地下城房间子图表，并从节点面板中移除了所有的基础PCG节点。

### 显式执行依赖项

[![显式执行依赖项](https://dev.epicgames.com/community/api/documentation/image/5be0b653-f0fa-4aa7-beda-5aba679f8629?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/5be0b653-f0fa-4aa7-beda-5aba679f8629?resizing_type=fit)

为更好地控制执行，我们为每个节点都添加了一个新的显式执行依赖项引脚。 这使得我们可以在任意时间点根据其他节点的完成情况来控制数据流图表的执行。

此外，在使用分层生成时，你可以使用它来定义在哪个网格大小级别执行无输入节点。 在虚幻引擎5.6之前，除非被放置在以指定网格大小执行的子图表中，否则所有无输入节点都会在顶层执行。 无输入节点包含了大多数Getter函数，例如获取地形数据和获取Actor数据。

### 其他节点和运算符

[![其他节点和运算符](https://dev.epicgames.com/community/api/documentation/image/3ae8903c-5d5f-45e0-9f65-7b7861fdb765?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/3ae8903c-5d5f-45e0-9f65-7b7861fdb765?resizing_type=fit)

虚幻引擎5.6还引入了多项原生PCG元素，包括：

-   **获取执行上下文信息：**根据所选执行上下文返回True或False。 你可以使用它在图表中进行上下文分支。 可用于测试的上下文包括：
    
    -   Is Editor
        
    -   Is Runtime
        
    -   Is Original
        
    -   Is Local
        
    -   Is Partitioned
        
    -   Is Runtime Generation
        
-   **应用层级：**重新应用从PCG数据资产中所导出特性的父层级的变换。 适用于处理程序集以及修改其点数据的情况。 例如，某个树干点可能被强制停留在斜坡上的给定范围内，而其上附着的树枝和树叶应相对于树干的位置进行放置。 我们最初为《Electric Dreams》创建此节点，并在虚拟引擎5.6中原生化，以便在群系核心V2中使用。
    
-   **Hash：**根据任意传入特性生成哈希整型值。 适合用于在组合了不同特性的情况下创建唯一标识符。
    
-   **生成种子：**通过随机流送、哈希源特性或哈希常量字符串生成种子。
    
-   **HLOD和数据层支持：**你现在可以在生成Actor时，或在目标Actor上，分配指定的数据层和HLOD。 执行分区图表时，系统会遵循分配给原始组件所属actor的数据层，并创建专用的分区actor，且除非另有说明，数据层引用将保持不变。
    
-   **数据层分区：**你可以使用此节点，按照对应Actor的数据层引用对传入的Actor引用进行分区，并在应用数据分区时提供包含和排除列表。 此节点会输出分区后的数据以及表示分区结果的特性列表。
    
-   **移除空数据：**从集合中删除无元素的数据。
    
-   **设置网格大小：**与变更网格大小节点（之前叫做网格大小）类似，新的设置网格大小是该节点的无输入变体版本。设置网格大小可通过新的执行依赖项（执行依赖项）引脚定义任何给定节点的执行所对应的网格大小，包括各种无输入Getter节点。
    
-   **获取子图深度：**在嵌套子图表内部使用时，输出节点的执行对应的级别。
    
-   **获取控制台变量：**返回给定控制台变量的值。
    
-   **实例化蒙皮网格体生成器：**生成实例化蒙皮网格体视觉效果，以支持带蒙皮的动画，其原理类似于依赖特性工作的静态网格体生成器。
    
-   **生成实例化Actor：**生成实例化Actor。此节点仅在启用了专门的PCG实例化Actor互操作插件时可用。
    
-   **获取虚拟纹理数据：**通过世界获取虚拟纹理数据，并将其输出以供GPU核心使用。
    
-   **获取静态网格体资源数据：**获取供GPU核心使用的静态网格体资源数据，以便直接在GPU上对顶点和三角形进行采样。
    
-   **纹理生成器：**预配置的自定义HLSL核心，用于在GPU上写入新纹理并将其输出，以供后续GPU计算节点中实行进一步操作。
    
-   **纹理处理器：**预配置的自定义HLSL核心，负责接受基础纹理数据输入，该输入可在GPU计算节点中写入并变换，然后输出以供在后续的GPU计算节点中实行进一步操作。
    
-   **生成草地贴图：**为指定的任意草类型生成基础纹理数据，用于在GPU计算节点中进行采样和筛选。 需要根据草类型设置地形材质。
    
-   **导出选定属性：**将传入的点数据或特性集的数据特性，以二进制文件或JSON文件的格式，导出至指定磁盘位置，以供外部使用。
    
-   **等待：**当连接到节点上新的执行依赖项引脚时，为图表的继续执行插入显式延迟。 你可以用秒、引擎帧和渲染帧等单位指定等待时间，并可选择仅在满足所有对应条件时才继续执行。
    

### 实例化Actor交互操作（试验性）

![实例化Actor交互操作](https://dev.epicgames.com/community/api/documentation/image/5718b0a9-9030-4ccf-bbd1-da151718858f?resizing_type=fit)

我们推出了一款全新的实例化Actor交互操作插件，现在该插件可用于生成并利用实例化actor系统。

实例化Actor是复杂Actor的轻量级实例。在进入玩家位置周围的给定范围内之前，它们会始终以最简单的纯视觉呈现的形式存在。一旦进入给定范围，其视觉效果就会变得"饱满"，并被呈现为完整的Actor。 实例化Actor需要搭配Mass Entity框架使用，十分适合用于优化Gameplay性能。它可以将Actor的数量降至最低，同时仍保持互动性。

鉴于Instance Actor API目前的离线性质，尚不支持在运行时生成新的实例化Actor。

## 虚拟制片

### 动捕管理器

[![动捕管理器](https://dev.epicgames.com/community/api/documentation/image/42ff577d-396c-4b35-8e4f-4374383d375f?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/42ff577d-396c-4b35-8e4f-4374383d375f?resizing_type=fit)

**动捕管理器**是专为希望在虚幻引擎中进行可视化、录制和管理表演捕捉工作的动画创作人员而设计的工具。 动捕管理器提供了一种端到端的工作流程，用户可以在虚幻引擎编辑器中进行资产管理、创建动捕舞台可视化环境、设置表演者、角色、重定向和道具、预览Live Link数据、录制动画和审查镜头试拍的全套流程。

### 捕获管理器

[![捕获管理器](https://dev.epicgames.com/community/api/documentation/image/2c7f82d9-4baa-4086-a9c2-66ae88d098f6?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/2c7f82d9-4baa-4086-a9c2-66ae88d098f6?resizing_type=fit)

**捕获管理器**现在属于Live Link Hub的第一类组件。 我们重新设计了从移动设备、视频文件和立体头戴式摄像机采集MetaHuman镜头试拍的流程，以实现对下载和资产创建过程的精细控制，从而让团队能够管理和分配多个面部表演的提取和处理工作。

### 用户可定义的命名标记

[![用户可定义的命名标记](https://dev.epicgames.com/community/api/documentation/image/4f713904-c9c0-410f-8dd1-0d0038a04245?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/4f713904-c9c0-410f-8dd1-0d0038a04245?resizing_type=fit)

使用蓝图和C++轻松对动态命名{Tokens}进行定义和求值。 这款新插件简化了各类关键工具的命名工作流程，包括镜头试拍录制器、动捕管理器、Live Link Hub、蓝图和新版的过场动画汇编工具，从而实现更快、更一致的资产创建体验。

### 制片向导

[![制片向导](https://dev.epicgames.com/community/api/documentation/image/58671626-dae5-4084-8456-2ed26031ed68?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/58671626-dae5-4084-8456-2ed26031ed68?resizing_type=fit)

**制片向导**是配置线性内容制作的一站式解决方案。 设置常用Sequencer默认值、重载资产命名规范、预填充文件夹层级 — 所有操作在一处完成。 设置是按制片项目独立保存的，你可以在单个项目中进行热切换，从而轻松地通过单个uProject管理多个制片。 未来更新还将带来更多功能。

### 使用过场动画汇编工具进行镜头管理

![使用过场动画汇编工具进行镜头管理](https://dev.epicgames.com/community/api/documentation/image/2d489f13-9dd3-46aa-b4b7-2d2f7bd6dab8?resizing_type=fit)

**过场动画汇编**是一种新型过场动画资产，也是过场动画汇编工具（CAT）的基石。 每项汇编都会以默认级别打开，是与管线实体相关的所有元数据的聚集地。 汇编将根据过场动画汇编模式生成，该模式决定需要随汇编创建的子序列结构、元数据和文件夹组织。 CAT还包含了全套的Python API，以便与现有的镜头管理管线无缝集成。

过场动画汇编受镜头试拍录制器、Sequencer、动捕管理器和影片渲染队列支持，构成了一套完整的线性内容管线！

### 自定义镜头试拍录制器标记

[![自定义镜头试拍录制器标记](https://dev.epicgames.com/community/api/documentation/image/15ce120d-5da5-47f2-8d9c-171bed95f8eb?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/15ce120d-5da5-47f2-8d9c-171bed95f8eb?resizing_type=fit)

用户现在可以搭配使用新的命名标记系统和镜头试拍录制器，从而以程序化的方式命名镜头试拍！ 使用新的标记还让用户可以在命名标题中为自定义字段创建新条目，而不必局限于旧有的Slate和Take字段。

### 镜头试拍录制器子系统

[![镜头试拍录制器子系统](https://dev.epicgames.com/community/api/documentation/image/1028d3cc-cdc1-4d18-b3ec-a45426661e9d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1028d3cc-cdc1-4d18-b3ec-a45426661e9d?resizing_type=fit)

得益于新的镜头试拍录制器子系统，镜头试拍录制器已经能够在编辑器中实现完全的脚本化。 你现在无需打开默认面板，就可围绕它构建自定义工具和工作流程，包括完全自定义的镜头试拍界面。

### Nvidia DLSS对nDisplay的支持

[![Nvidia DLSS对nDisplay的支持](https://dev.epicgames.com/community/api/documentation/image/9e74e730-c37b-4e90-96d2-d855fa7b08d5?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9e74e730-c37b-4e90-96d2-d855fa7b08d5?resizing_type=fit)

**Nvidia DLSS**是一项功能强大的技术，能够为摄像机内VFX工作流程和其他nDisplay应用场景带来诸多益处。 在虚幻引擎5.6中，**nDisplay**现已支持Nvidia DLSS以及包含时序超级分辨率（TSR）在内的内置分辨率修改方法。 操作者现在可以使用Nvidia DLSS分别控制外视口和内视锥体的设置，效果等同于使用原生选项。

### nDisplay主节点故障转移

![nDisplay主节点故障转移](https://dev.epicgames.com/community/api/documentation/image/de2e0a94-be01-4b5a-9e8c-a2bfcb1b3466?resizing_type=fit)

在此之前，我们为nDisplay添加了必要的挂钩，因此群集系统可以通过允许渲染节点在发生故障时从群集中脱离，从而在遇到最常见的故障类型时从容地恢复。 在虚幻引擎5.6中，我们也新增了支持主节点失效的功能。 该功能专为管理大型nDisplay群集的直播、广播和虚拟制片工作室而设计。 同时，对其他需要对潜在故障进行有效缓解和妥善处理的复杂显示系统而言，此功能可能同样适用。

启用后，故障转移功能将显示用户定义的以下列表：

-   **高优先级备份节点**，专供在主节点出现故障时进行接管。 从列表中选出的新节点将接管主节点的角色，直到再没有其他节点可用。 届时，群集将终止运行。
    
-   **关键节点**，任何关键节点都不允许出现故障。 如果一个关键节点出现故障，此群集将终止运行。
    

### 将虚拟摄像机录制为过场动画摄像机

虚拟摄像机已不再依赖于录制/代理摄像机来支持直接录制到过场动画摄像机的功能。 现在，用户可以直接从虚拟摄像机HUD触发虚拟摄像机录制，且无需辅助Actor即可录制过场动画摄像机Actor。

### Live Link OpenTrackIO

[OpenTrackIO](http://opentrackio.org)是由SMPTE RiS - OSVP小组设计的免费开源摄像机追踪协议，旨在提升虚拟制作及相关领域的互操作性。 在虚幻引擎5.6中，我们发布了支持该协议的Live Link插件。 该插件支持单播和组播网络协议，以及JSON和CBOR序列化格式。

## 动态设计

### 克隆器和效果器

[![克隆器和效果器](https://dev.epicgames.com/community/api/documentation/image/ddee29de-4dc2-4f72-a6ad-768b1f0db4da?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ddee29de-4dc2-4f72-a6ad-768b1f0db4da?resizing_type=fit)

我们在克隆器和效果器系统新增了多项功能，具体如下：

-   **克隆器**
    
    -   **纹理：**在一系列克隆体上绘制一张全彩纹理。 根据使用的克隆体数量来增减其感知分辨率。
        
    -   **位移（Displacement）：**以选定的纹理资产作为因素，并根据一组简单的参数偏移各个克隆体的缩放/旋转方式。 这样一来，你就可以对纹理进行平铺、旋转和偏移，从而产出一些奇妙的效果。
        
    -   **自由放置（Free Placement）：**选择多个Actor，将它们以任意方式放置在克隆器之下，并按照范围（Range）或步进（Step）属性偏移它们的位置，从而创造出依附动画。
        
-   **效果器**
    
    -   **取消（Cancel）：**将此效果器传递给受其他效果器（例如"推动（Push）"效果器）操纵的任意克隆体，即可将其恢复到原始状态。
        
    -   **剔除（Cull）：**根据选定的形状和比例设置减少/隐藏克隆体。
        
    -   **步进（Step）：**沿线性曲线调整单个克隆体的位置和旋转。
        
-   **效果器属性**
    
    -   **延迟（Delay）：**在效果器激活时创造类似于弹簧的效果。
        

### PSD图层导入

[![PSD图层导入](https://dev.epicgames.com/community/api/documentation/image/0aca203d-343c-4688-8ded-4d5cffef6a96?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/0aca203d-343c-4688-8ded-4d5cffef6a96?resizing_type=fit)

现在，将PSD文件原生导入引擎后，会自动重现Photoshop的分层PSD。 你可以使用图层深度偏移（Layer Depth Offset）属性对图层进行动画处理，从而在移动发生时和移动停止时都能产生动态效果。

### 广播和现场活动的数据支持

![广播和现场活动的数据支持](https://dev.epicgames.com/community/api/documentation/image/5bb98b47-e2c2-43bc-a15c-6672217afaef?resizing_type=fit)

要为广播和现场活动绑定图形，通常需要通过各种来源获取存档数据。 现在，我们支持拉取数据，从而为新闻、体育和电竞市场等领域创建更具动态、更省时的图形填充功能。

-   支持JSON、Google Sheets和原生虚幻数据表，未来还可能支持更多格式。
    
-   兼容远程控制（Remote Control）和纲要（Rundown）功能。
    

### 材质设计器媒体层

![材质设计器媒体层](https://dev.epicgames.com/community/api/documentation/image/d7fad20b-f17d-4275-b105-52f0267f3488?resizing_type=fit)

**材质设计器**现可以通过媒体图层系统播放视频文件。 为材质设计器添加一个图层，选择媒体（Media）作为舞台源（Stage Source），然后指向要播放的文件即可。 然后你就可以直接通过材质设计器播放该文件，或者将其添加到Sequencer中运行。

-   充分利用**Electra Protron**播放器和**Sequencer**的集成。
    
-   支持**保留合成（Holdout Composite）**组件，实现清晰的播放质量。
    

### 动态设计场景状态

![动态设计场景状态](https://dev.epicgames.com/community/api/documentation/image/6f9d31cd-d18d-4618-afdf-f2fb283bf37a?resizing_type=fit)

对于新闻、股票和体育直播而言，一份针对收报机或"报数虫（Score Bug）"量身定制的解决方案显得非常重要。 在一个界面和资产中绑定这些系统的效果是最好的。 针对上述应用场景，动态设计场景状态（Motion Design Scene State）提供了一种支持在单个Actor中拥有多个状态机的方案，还给出了一套方便进行调试的界面。 你可以按照典型的Sequencer风格为系统中的各个元素分别创建动画，然后通过动态设计场景状态触发和播放这些动画。

## 模拟和视觉特效处理

### Niagara LWC图块更新模式

如果用户需要在大型世界坐标中进行操作，同时需要Niagara系统处理远距离移动和无缝运行，则此功能将非常适用。 举例说明：在世界空间中排放烟雾的飞机引擎。

为节省内存和提高性能，Niagara系统采用浮点值运算，而不采用双精度值运算。 位置则按照相对于系统初始生成的图块位置进行存储。 默认情况下，当Niagara系统跨越过多的图块时，我们将重置系统，清空粒子并更新图块，以避免出现浮点精度问题。 这种做法并不理想，因为这会让粒子突然消失。

在虚幻引擎5.6中，我们提供了一条项目设置项（大型世界坐标图块更新模式），你可以逐系统资产进行重载，以定义你希望对跨越实例的图块做出响应的方式。 该选项将动态更改系统实例图块，并将所有粒子从旧图块空间移动到新图块空间。 对用户而言，这意味着飞机引擎会持续排放烟雾，且一切都会按照预期运行。

### 最优化Niagara系统编译

在虚幻引擎5.6中，我们启用了一种全新的Niagara系统默认编译模式。 新的编译模式可以有效利用异步任务来减少等待编译结果的时间，并大幅减少编译过程中创建的UObject的数量。 对所有需要等待Niagara系统编译结果的用户而言，这都将极大改善用户体验。例如等待查看修改结果的美术师、等待关卡加载或等待烘焙完成的用户等等。

这一优化对**使用大量发射器或复杂效果的系统而言**尤为明显。 让结果准备就绪所需的总体时间缩短了，用户机器的响应速度也会大幅提高。 新的编译模式还解决了一个长期存在的问题，即Niagara系统会造成烘焙过程的卡顿。 虽然不同的项目的结果会有差异，但我们发现，在使用单一进程进行烘焙时，很多Niagara系统的**烘焙时间最多可缩短10倍**。

**其他信息**

除了能够高效地并行编译脚本的框架外，虚拟引擎5.6还对将Niagara图表转译为HLSL的实际转译过程进行了大量优化，使整体耗时缩短了**约40%**。

### Chaos核心

[![Chaos核心](https://dev.epicgames.com/community/api/documentation/image/723b7915-4aed-40ae-9747-9de23503298d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/723b7915-4aed-40ae-9747-9de23503298d?resizing_type=fit)

我们正在对Chaos物理系统进行持续的更新和优化，力求为美术师、开发者和程序员提供更好的模拟效果。 Rigid Body动力学是大多数游戏物理都依赖的核心技术。 随着我们朝着更具规模、物理效果更丰富且更加基于物理原理的虚拟世界迈进，我们需要确保这一核心系统能适应并处理这些用例。 与rigid body动力学一样，查询功能也是虚幻引擎中大量系统所依赖的核心技术，我们也需要确保查询的性能**能够适应极其庞大的动态世界**。

我们对核心解算器进行了以下优化：

-   部分休眠岛状区
    
-   场景查询优化
    
-   模拟初始化的优化
    
-   多线程碰撞检测和处理
    
-   多线程岛状区生成
    
-   网络物理开发
    

### Chaos布料

随着布料模拟和复杂布料在虚幻引擎中的需求增加，我们的旧版骨骼网格体布料编辑器和工作流程已经难以适配未来为满足这些需求而必须进行的升级了。 时装和大多数角色创作工作几乎都转向了使用专门的数字内容创建软件（DCC）。这些DCC能提供专业的、基于面板的布料构造。 为了跟上这些外部DCC的发展步伐，我们将继续开发自己的布料编辑器，以便在完善布料设置工作流程的同时改进面板设置。

虚幻引擎5.6的Chaos布料系统自带处于持续开发状态的**Beta测试版**布料编辑器。

从虚幻引擎5.5到虚幻引擎5.6的更改

-   布料尺寸调整
    
-   为物理资产添加了运动碰撞物
    
-   布料间约束
    
-   统一的数据流编辑器
    
-   对变量的支持
    
-   服装资产
    
-   UV缩放/扭曲
    
-   速度缩放优化
    

### Chaos Flesh

![Chaos Flesh](https://dev.epicgames.com/community/api/documentation/image/c366583e-157c-436d-b847-0d9e46458815?resizing_type=fit)

美术师、工程师和游戏设计师需要引擎内置的途径来设置和模拟四面体，从而生成肌肉、肉体和各种各样的角色抖动运动。 将几何体嵌入四面体中，还可以提供各种破坏效果的解决方案，如金属凹陷和类似效果。

虚幻引擎5.6的更新如下：

5.6版的改进扩展了我们模拟和缓存完整肌肉系统的能力，新增了由动画驱动的肌肉收缩效果、肌肉上方脂肪运动的滑动约束效果、体积保存的优化，以及有助于保存肌肉和脂肪层之间体积的互连组织。

### Chaos可视调试器

Chaos可视调试器（CVD）是一款多功能工具，可用于记录和播放游戏进程中的物理模拟状态。 它支持对所有运行中的刚体和RBAN解算器进行记录，包括粒子状态和碰撞数据。 CVD可作为虚幻引擎中的编辑器工具使用，同时提供了丰富的自定义选项，例如通过UI或控制台命令选择要记录的具体数据通道。

该工具还具有实时调试功能，让你可以在模拟过程中实时检查物理数据。 此外，CVD还提供各种可视化选项，如粒子状态、碰撞数据和场景查询等，以帮助开发者高效地进行物理模拟分析和故障排除。

最近的更新如下：

-   **性能改进：**我们重做了对象在后台的表示方式以及几何图形的生成方式，以降低资源消耗。 我们还引入了性能设置，你可以在主工具栏的新设置按钮下对这些系统中的设置进行调整。
    
-   **优化了网络物理调试的支持：**
    
    -   **多源支持：**你可以将两个或多个独立录制（例如服务器和客户端）加载到单个CVD实例中，可视化内容将合并且精准同步。
        
    -   **打包构建的工作流程优化：**我们使用了会话发现系统，该系统可帮助CVD找到任何本地运行的服务器或客户端构建，随后你只需点击一次即可开始录制这些内容（操作与早期版本的PIE会话模式相同）。
        
-   **独立调试器：**现在你可以构建CVD并将其打包为独立可移植UE程序。
    
-   **扩展系统：**在此版本中，我们将发布扩展系统的首个迭代版本。 你可用它录制游戏中的自定义数据，同时录制其他CVD数据，并实现你自己的序列化、可视化和用户界面系统。
    
-   **稳定性和用户体验优化：**更多详情请参阅下面的版本说明。
    

### Chaos数据流编辑器

![Chaos数据流编辑器](https://dev.epicgames.com/community/api/documentation/image/88570c3c-bb3e-41c1-af3e-0f9140865c75?resizing_type=fit)

数据流图表让用户能够在基于节点的环境中以程序化方式生成资产。 图表的实现方案采用了基于拉取的求值方法，即图表中的节点根据其输入求值生成缓存输出状态。 数据流资产则被用于协助模拟系统的程序化编写和设置。 例如，Chaos布料系统会使用数据流从Marvelous Designer中导入并设置服装。

虚幻引擎5.6的更新如下：

**新功能**

-   变量
    
-   子图表
    
-   逐循环功能
    
-   场景大纲视图
    
-   工具蓝图API
    

**UI优化**

-   节点菜单现在更具备上下文关联性
    
-   求值按钮
    
-   警告/错误日志
    
-   更优的集合电子表格
    
-   性能报告
    
-   观察输出
    
-   资产拖放
    
-   更优的渲染系统
    
-   升级的视口
    

### Chaos破坏系统

![Chaos破坏系统](https://dev.epicgames.com/community/api/documentation/image/408aa460-9c5f-4365-bae3-8db6f0ee4199?resizing_type=fit)

Chaos破坏系统是一款工具集，可用于实现电影级画质的实时破坏效果。 除了出色的视觉效果之外，该系统还优化了性能，采用直观的非线性工作流程，让美术师和设计师能够更好地控制内容创建过程和破坏过程。

**数据流**

-   新增和优化的数据流节点（纹理、UV、破裂、碰撞）。
    
-   节点可视化的优化（凸包、连接性、破裂）。
    

**破裂编辑器**

-   你现在可以使用破裂编辑器，利用使用数据流对几何体集合资产进行求值和参数化。
    
-   我们使用Nanite为几何体集合的选择添加了视觉效果。
    
-   你可以在通过编辑器创建几何体集合时选择物理材质。
    

**通用项**

-   我们为根代理添加了变换。
    
-   我们为破坏和拖尾事件添加了方向
    
-   我们将破坏和性能优化的控制台变量作为选项在项目设置中进行了公开。
    

### Chaos毛发

在毛发模拟方面，我们通过在数据流中定义引导样条线来模拟毛发资产。这些引导样条线能够与角色的动画一起进行模拟。 数据流中的Groom编辑器力求为美术师和授权用户提供一套更完善的工具，为毛发Groom提供艺术指导，从而在编辑器中满足过场动画和游戏玩法方面的需求。

虚幻引擎5.6的更新如下：

-   新版基于数据流的Groom编辑器。
    
-   新版毛发发片生成。
    

## 平台

### Android模拟器集成

Android模拟器让移动端游戏开发者能够通过虚幻编辑器的虚拟设备测试Android游戏。 虚幻引擎5.6让你可以直接通过平台菜单安装并启动模拟器，而且我们改善了工作流程，使调试游戏的过程变得更加容易。

### 针对60Hz的最优化设备描述

虚幻引擎5.6提供了开箱即用的最新设备描述，这些描述体现了Epic Games的《堡垒之夜》的最优化设置，能够在所有支持的平台上实现60 FPS的流畅运行。

### OpenXR 1.1

OpenXR 1.1将多项扩展整合进了OpenXR核心规范中，能够减少碎片化，并简化高级XR应用程序的开发。 虚幻引擎5.6支持并默认采用OpenXR 1.1标准。但如果OpenXR运行时不支持该标准，则会回退到1.0。 如需了解如何手动支持重载，请参阅**项目设置（Project Settings） -> 插件（Plugins） -> （OpenXR）**。

### Adreno快速遮蔽模式

由于支持Adreno快速遮蔽模式，在高通Adreno GPU上进行硬件遮蔽查询的速度得到了提升。这包括Meta Quest等设备。 这包括Meta Quest等设备。设置`r.Mobile.AdrenoOcclusionMode=1`即可利用这一功能。

### 对ARCore Vulkan的支持

现在，在使用ARCore开发手持AR应用程序时，你可以使用现代开放标准图形API Vulkan了。 在虚幻引擎中，Vulkan是适用于移动设备的默认RHI，同时现在我们已经不再为ARCore提供OpenGL的支持。

### 编辑器内平台预览

[![编辑器内平台预览](https://dev.epicgames.com/community/api/documentation/image/429a0271-520d-4666-874a-ee5f19ed7c00?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/429a0271-520d-4666-874a-ee5f19ed7c00?resizing_type=fit)

平台预览功能让美术师可以在虚幻编辑器中预览内容将在目标设备上呈现的模样。 虚幻引擎5.6对平台预览功能的改进如下：

-   纹理组预览。
    
-   支持JSON设备预览的高宽比和安全区域功能。
    
-   纹理流送预算的模拟
    
-   UI优化
    

### 移动渲染

![移动渲染](https://dev.epicgames.com/community/api/documentation/image/e1b9523b-ac93-4d12-a4b4-1c106cdf604a?resizing_type=fit)

在虚幻引擎5.6中，我们优化了移动渲染器的性能和功能集，具体如下：

-   我们添加了对天空光照的实时捕获的支持。
    
-   对GPUScene进行了优化，同时我们增加了对蒙皮网格体的支持。
    
-   我们添加了Android Vulkan的试验性多通道延迟模式（控制台变量），支持无需深度预通道的阴影和屏幕空间技术。
    
-   我们添加了试验性的距离场环境光遮蔽（控制台变量）。
    

### OpenXR直通

我们实现了对直通功能的支持，无需使用特定于供应商的OpenXR扩展。 详情请参阅：

为虚幻引擎5.6启用不限设备的OpenXR直通功能的步骤如下：

1.  在下方任意文件中设置`r.Mobile.PropagateAlpha=True`：
    
    -   引擎的`BaseEngine.ini`文件
        
    -   项目的`DefaultEngine.ini`文件
        
    -   设备描述文件
        
    -   这样可以确保将Alpha图层传递给设备。
        
    -   对于非移动端设备，请改为使用`r.PostProcess.PropagateAlpha=True`。 保险起见，你可以同时使用两种方法。
        
2.  在同一`.ini`文件中设置`xr.OpenXREnvironmentBlendMode=3`文件。
    
    -   这将从运行时请求环境混合模式`XR_ENVIRONMENT_BLEND_MODE_ALPHA_BLEND`，并要求其尝试使用直通。
        
    -   另一种实现方式（或许更受欢迎）是使用蓝图节点"Set Environment Blend Mode"。 传入"3"。
        
    -   你可以使用此功能按需启用/禁用直通。
        
3.  在同一.ini文件中设置`xr.OpenXRInvertAlpha=True`文件。
    
    -   这将在HMD运行时使用`XR_EXT_composition_layer_inverted_alpha extension`扩展（如可用）将虚幻引擎基于半透明度的Alpha层（1=透明，0=不透明）反转为基于不透明度的Alpha层（1=不透明，0=透明）。
        
    -   否则，本应显示直通画面的区域将显示关卡的几何体，反之亦然。
        

在上述三项设置中，只有环境混合模式可以在运行时更改。 `PropagateAlpha`和`OpenXRInvertAlpha`会被缓存，其在启动时所用的值将在整个会话期间一直使用。

该功能已在Meta Quest 3上进行了测试。 其他OpenXR运行时和设备应该也支持该功能，前提是它们符合以下条件：

-   支持通过`XR_ENVIRONMENT_BLEND_MODE_ALPHA_BLEND`环境混合模式开启的直通功能。
    
-   支持`XR_EXT_composition_layer_inverted_alpha`。
    

Meta Quest 3还要求在Android清单文件中添加以下行。 当`bPackageForMetaQuest`为`true`时，该行会被自动添加：

`<uses-feature android:name="com.oculus.feature.PASSTHROUGH" android:required="false" />`

&lt;uses-feature android:name=&quot;com.oculus.feature.PASSTHROUGH&quot; android:required=&quot;false&quot; /&gt;

复制完整片段(1行长度)

### 过场动画XR摄像机平滑

这是一款全新的试验性功能，可平滑摄像机变换，从而在传统显示器上获得更好的观看体验，你也可以使用它捕获XR游戏画面，从而打造预告片。 你可以启用和配置此功能的控制台变量如下：

-   `xr.CinematicCameraSmoothing` - 1启用，0禁用（默认为0）
    
-   `xr.CinematicCameraSmoothing.RollDecay`（默认为1.0）
    
-   `xr.CinematicCameraSmoothing.PitchDecay`（默认为0.18）
    
-   `xr.CinematicCameraSmoothing.YawDecay`（默认为0.18）
    

### Insights资产内存分析（试验性）

[![Insights资产内存分析](https://dev.epicgames.com/community/api/documentation/image/208bb245-3990-4e9a-8bdc-5b7a1e314b33?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/208bb245-3990-4e9a-8bdc-5b7a1e314b33?resizing_type=fit)

虚幻引擎5.6中，Insight分析功能引入了对项目中的资产进行低级别内存（LLM）跟踪的新功能（试验性）。 使用适当的参数启动客户端，即可在游戏客户端中启用资产内存跟踪。 功能如下：

-   根据资产类型逐平台定义内存预算
    
-   查看LLM时间轴/标签集（TagSet）树视图。
    
-   在标签集之间切换分析，尤其是在系统（System）、资产类（AssetClass）、资产（Asset）标签集之间。
    
-   按名称和大小对标签集进行排序
    
-   逐标签集查看所有条目和相关预算。超出预算的项目都会被明确显示出来。
    
-   对不同帧的内存占用进行A/B比较。
    

## 音频

### Audio Insights

![Audio Insights](https://dev.epicgames.com/community/api/documentation/image/7522cc9f-28b3-4fd9-b788-6e1642be5c28?resizing_type=fit)

**Audio insights**是我们用于分析和调试音频的主要工具。 其目标用户包括在虚幻引擎中使用音频的所有人。 在此版本中，我们将提供以下用户体验功能：

-   你现在可以使用音频分析器机架代替单独的仪表和示波器。
    
-   音频调制：矩阵视图操作面板
    
-   我们增加了一项新功能，即动态选择音频子混音以供进行独立分析。
    
-   我们为子混音和总线添加了状态指示器。
    

### Sequencer音频拖动

![Sequencer音频拖动](https://dev.epicgames.com/community/api/documentation/image/9372fbcb-8113-42cb-b326-eb90a809374b?resizing_type=fit)

许多动画编辑器和各种工作流程中都会用到音频拖动。 在虚幻引擎5.6中，**我们优化了Sequencer音频拖动的性能和延迟**，从而提高了它的帧精确度，并使其能更好地匹配播放头的位置。 这一点尤其针对使用Sequencer和音轨的动画空间用户，但也适用于希望对齐音频数据的用户。

-   音频拖动现在已颗粒化，音质也有了显著提升。
    
-   在Sequencer轨道中移动光标，即可对音频文件进行持续的颗粒化处理。 这样可以调整声音，使其缓慢回放，同时避免音高移位。
    
-   若将Sequencer播放头固定在一个位置时，那么它将在给定的时间位置连续播放一小段音频。
    

### 不限声道类型（试验性）

音效设计师经常需要在不同格式/声道数量的MetaSound节点之间发送和接收音频数据。 在虚幻引擎5.6中，音频程序员可以使用新的**试验性不限声道类型（Channel Agnostic Type，简称CAT）**对包含输入和输出引用的自定义节点编码：

-   新的音频速率数据类型让音频缓冲区可以通过一个引脚类型支持多个声道。
    
-   现在，节点可以支持不同音频声道格式的多种配置。
    
-   降低MetaSound图表中的杂乱度和复杂性。
    

### 高声道数量

[![高声道数量](https://dev.epicgames.com/community/api/documentation/image/7d042f46-3148-4a97-ad47-d4ce9917a0db?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/7d042f46-3148-4a97-ad47-d4ce9917a0db?resizing_type=fit)

凭借WASAPI（Windows音频会话API）和聚合式设备支持，我们现在可以**在Windows平台上支持较高的音频声道数量**。 这一点主要针对高端客户和专业项目，但对需要用到超过8声道（当前最大值）音频输出的人而言同样有益。

在平台音频API下拉菜单中，选择"Wasapi"即可启用：

-   这将创建一个WASAPI聚合设备，其中所有设备都将通过单一一台物理音频适配器进行呈现。
    

微软规定音频设备最多只支持8个声道。 如果一台物理设备支持的声道超过8个，那么它在操作系统中将被表示为多个8声道设备。 例如，一个32声道的音频设备会在Windows音频设置中显示为4个独立的8声道设备，但事实上它只是一台物理设备。

### WASAPI后端实现

![WASAPI后端实现](https://dev.epicgames.com/community/api/documentation/image/8231428e-afa8-4568-a297-0140a797d7f6?resizing_type=fit)

在虚幻引擎5.6中，我们**为Windows和Xbox平台实现了WASAPI（Windows音频会话API）后端**。 这主要有两个好处。 首先，这将使虚幻引擎的音频迎合未来的发展趋势。 其次，这让我们能够更好地控制与现有音频硬件的交互。

-   针对Windows和XBOX的新版音频硬件API后端。
    
-   新模块，而非新插件。
    

支持WASAPI后端的原理与当前对XAudio后端的实现完全一致。

### MetaSound节点配置

在虚幻引擎5.6中，我们通过**MetaSound节点配置**功能为MetaSound节点提供了全新的表达能力。 该功能让单个节点可以在MetaSound编辑器中改变其输入和输出。 节点配置利用MetaSound编辑器的细节面板，为节点接口的修改和辅助数据（这些数据可在节点渲染音频时使用）的序列化提供了途径。

除了可以让音效设计师和开发者创建更细致入微的交互式节点外，用户体验也得到改善。 例如，清理节点控制板、减少很多MetaSound常见设计任务的步骤并降低重新布线的复杂性。

### 音频字幕插件

![音频字幕插件](https://dev.epicgames.com/community/api/documentation/image/34a7ea8e-36ca-4363-9d05-2b5cc18c592f?resizing_type=fit)

音频字幕对许多无障碍功能而言都是必须的，比如对话系统、隐藏式字幕和语音聊天等。 在虚幻引擎5.6中，我们提供了一款**字幕引擎插件**，该插件专为支持编辑器时或运行时字幕制作而设计，适用于所有需要字幕支持的相邻子系统。 这款插件重构实现了对音频数据的解耦，从而使字幕的渲染不必依赖于音频数据或音频的渲染状态。

### MetaSound预设编辑器

![MetaSound预设编辑器](https://dev.epicgames.com/community/api/documentation/image/e74d10f3-3f2f-459a-b743-107e09c9bf81?resizing_type=fit)

在虚幻引擎5.6中，**MetaSound预设编辑器**将为技术音效设计师提供一种机制，用于在编辑预设时提供自定义的UMG控件。 这可以为相关MetaSound参数和功能按钮带来更加直观的布局，从而便于探索底层MetaSound源的各项预设设置。

-   在MetaSound预设视图中公开自定义控件BP，并连接控件与编译器。
    

### 音频波形编辑器

![音频波形编辑器](https://dev.epicgames.com/community/api/documentation/image/4056cacf-6279-4552-a33a-68bdcf4a15cf?resizing_type=fit)

音效设计师在处理音频资产时常常需要在虚幻引擎中来回切换。 为优化音效设计师在虚幻引擎5.6中的工作流程，我们添加了在导入的声音文件中显示标记和循环区域的功能。

这还包括其他编辑流程优化，以充分扩展波形编辑器的功能，从而让音效设计师可以在虚幻编辑器中完成常见的音频编辑任务。

### 技术音频工具

技术音频（Tech Audio）在编辑器工具方面的体验和应用能为游戏音频社区带来极大的裨益。 这一举措旨在帮助新手开发者熟悉虚幻引擎的音频系统，降低大规模工作的难度，并作为开发者编译自己的项目专用工具提供一个起始点。

-   一套蓝图脚本编写实用程序、工具和图表，用于帮助用户运用虚幻音频技术。
    
-   技术音频（Tech Audio）希望打造一套编辑器工具和工作流程的范例集，以助力内部使用和对外展示。
    

## 建模

### 纹理工具（Beta测试版）

[![纹理工具](https://dev.epicgames.com/community/api/documentation/image/8131273a-487d-469d-9ca2-16da5a58d5d3?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/8131273a-487d-469d-9ca2-16da5a58d5d3?resizing_type=fit)

我们对纹理图表（TextureGraph）工具集进行了大量优化，以支持在开发与纹理相关工具时提供更广泛的应用。

-   **纹理图表实例：**你现在可以创建纹理图表的实例。该实例能够为各个实例分别存储指定参数，从而让主图表拥有多个变体成为多个可能。
    
-   **材质实例支持：**我们扩大了对材质实例的支持，为与材质进行更复杂的集成提供可能。
    
-   **数组：**我们扩展了纹理图表对图像数组处理的支持。 你现在可以通过纹理路径或单个纹理资产构造数组。 我们新增了多个节点以支持数组管理。 现在，大多数节点都将支持图像数组。
    
    -   **Array4**
        
    -   **ArrayGrid**
        
    -   **ConcatenateArray**
        
    -   **ModifyArray**
        
-   **大小调整：**我们新增了一个调整图像大小的工作流程，并增加了对应的图像设置参数。 这允许定义和存储尺寸不为2的幂的图像。
    
-   **同步蓝图API**
    
-   **材质节点：**现在支持多个输出。
    
-   **新节点**
    
    -   **Color Correction**
        
    -   **Erode/Dilate**
        
    -   **Swizzle**
        
    -   **Resize**
        
    -   **MakeVector4**
        
    -   **PremultiplyAlpha**
        
    -   **String**
        
    -   **Boolean**
        

### 几何体脚本

[![几何体脚本](https://dev.epicgames.com/community/api/documentation/image/f6527fb1-d536-4acd-8d75-167d786d86ab?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f6527fb1-d536-4acd-8d75-167d786d86ab?resizing_type=fit)

几何脚本功能得到了进一步扩展，按用户要求增加并优化了大量节点。

**低级别网格体编译**

-   MergeMeshVertexPair
    
-   MergeMeshVerticesInSelections
    

**网格体建模**

-   ApplyMeshIsoCurves
    

**复合和分解**

-   SplitMeshByVertexOverlap
    
-   SortMeshesByVolume
    
-   SortMeshesByArea
    
-   SortMeshesByBoundsVolume
    
-   SortMeshesByCustomValues
    

**法线**

-   FlipTriangleSelectionNormals
    

**多边形组**

-   AddNamedPolygroupLayer
    
-   FindExtendedPolygroupLayerByName
    
-   GetPolyGroupBoundingBox
    
-   GetPolyGroupUVBoundingBox
    
-   GetPolyGroupUVCentroid
    

**网格体采样**

-   ComputeUniformRandomPointSampling
    

**网格体造型层**

-   EnableSculptLayers
    
-   SetActiveSculptLayer
    
-   SetSculptLayerWeight
    
-   SetSculptLayerWeightsArray
    
-   GetSculptLayerWeightsArray
    
-   GetNumSculptLayers
    
-   GetActiveSculptLayer
    
-   DiscardSculptLayers
    
-   MergeSculptLayers
    

**网格体****选择**

-   SelectMeshSplitNormalEdges
    
-   SelectMeshUVSeamEdges
    
-   SelectMeshPolyGroupBoundaryEdges
    

**简化**

-   ApplyEditorSimplifyToTriangleCount
    
-   ApplyEditorSimplifyToVertexCount
    

**变换**网格体

-   InverseTransformMesh
    
-   InverseTransformMeshSelection
    

**UV**

-   ClearUVChannel
    
-   TransferMeshUVsByProjection
    
-   IntersectsUVBox2D
    

**顶点值**

-   TransferVertexColorsFromMesh
    

**烘焙**

-   MakeBakeTypeHeight
    

## 内容管线

### 使用交换功能导入FBX关卡

[![使用交换功能导入FBX关卡](https://dev.epicgames.com/community/api/documentation/image/1368f8b6-db15-431c-a674-c5f1ef7031cb?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1368f8b6-db15-431c-a674-c5f1ef7031cb?resizing_type=fit)

为了在将不同格式的文件导入到引擎中时拥有一致的用户界面和用户体验，现通过"交换框架（Interchange Framework）"提供FBX关卡导入流程。 现在这也是将FBX导入关卡的默认路径。 你仍可使用控制台变量回退到"旧版"行为。

主要的变化在于，现在使用的导入对话框与通过Content文件夹进行导入所用的对话框一致。 现在，你可以执行一些旧版功能，如从导入中移除资产或Actor，或使用不同的选项集进行导入等，都可以通过自定义的交换管线来执行。

### 交换工作流程的优化

[![交换工作流程的优化](https://dev.epicgames.com/community/api/documentation/image/eb01684f-f988-42e0-9aea-016318c65f66?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/eb01684f-f988-42e0-9aea-016318c65f66?resizing_type=fit)

交换框架可以让你更轻松地创建、扩展、参数化导入和重新导入工作流程，并将在不久之后对相关导出流程做出类似的改进。

交换功能的拓展：

-   我们添加了在导入资产时导入插槽和创建文件夹层级的选项。
    
-   我们更新了冲突分析的UI，更新了用来在导入或重新导入时控制对话框可见性的设置。
    
-   现在，你可以添加将交换预设归入不同组的功能，从而让一个项目中不同类别的用户可以分别使用指定的预设。
    
-   针对glTF/glb，我们增加了对IES光源的支持。
    
-   针对USD，我们增加了对在USD文件中定义的MaterialX材质的支持。
    

### 使用交换功能自定义USD资产的导入（试验性）

[![](https://dev.epicgames.com/community/api/documentation/image/d3b044d6-dc86-454d-80a0-05c260b768ad?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/d3b044d6-dc86-454d-80a0-05c260b768ad?resizing_type=fit)

USD是一种用途广泛的场景描述文件格式，在3D行业的采用率日益增长。

在虚幻引擎5.5中，我们将USD添加到了交换框架支持所的文件格式列表中，并在虚幻引擎5.6中扩展了相关支持。 内容创建者现在可以对导入过程进行更多控制，可以为USD文件的资产导入添加自定义的处理步骤，类似于FBX等其他格式已有的交换功能。

交换功能对USD的支持仍处于试验阶段，且仅限于资产的导入。 5.6版添加了对下列内容的支持：

-   几何体缓存
    
-   SparseVolumeTexture
    
-   图元形状
    
-   LOD
    
-   嵌入式MaterialX说明
    
-   碰撞模式
    
-   USDz
    

## 框架

### 简化的批量处理器API

[![简化的批量处理器API](https://dev.epicgames.com/community/api/documentation/image/71962bd8-80cf-45bd-986a-aec74359df73?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/71962bd8-80cf-45bd-986a-aec74359df73?resizing_type=fit)

我们引入了新的查询编写工作流程和简约化的实体迭代，从而精简了用户编译Mass处理器的方式。 这减少了样板代码的数量，提高了可读性，并增强了调试功能 — 让使用Mass开发变得更为简单快捷。

新的`MassQueryExecutor`还统一并简化了核心功能，让Mass框架更贴近大家所熟悉的ECS模式。

### 移动器插件：AI集成、动画支持和性能优化

[![移动器插件：AI集成、动画支持和性能优化](https://dev.epicgames.com/community/api/documentation/image/05ab3e6a-8f6e-4569-a271-04732457259e?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/05ab3e6a-8f6e-4569-a271-04732457259e?resizing_type=fit)

移动器插件正在演变为一款高度灵活、高性能的移动框架，旨在支持现代游戏的需求。 我们扩展了其功能，使其更加接近旧版的角色移动组件，并为包括Mass、寻路网格体（NavMesh）和基于寻路的轨迹预测等功能在内的**AI系统**提供强大的支持。

我们还扩展了**动画集成**：该插件现在可以更好地支持**虚幻动画框架**、基于根骨骼运动的移动和复杂的角色设置 — 这意味动画驱动的移动可以直接影响模拟，而不受线程执行顺序的影响。

为了适应大规模人群和高要求的Gameplay场景，我们引入了**线程模拟**功能，该功能让移动器插件能够脱离游戏线程异步运行。 现在输入收集和模拟之间也被解耦，从而让多个Actor间的并发移动更新成为可能。

尽管这种线程模型目前仅限于**单人游戏环境**，但它为未来对联网场景的支持奠定了基础。 移动器插件将不断改进，成为一款适用于玩家和AI移动的灵活、高性能解决方案。

### Mass调试器改造

[![Mass调试器改造](https://dev.epicgames.com/community/api/documentation/image/3d7c86c4-5669-45d3-8b56-2c5dde7ec2a4?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/3d7c86c4-5669-45d3-8b56-2c5dde7ec2a4?resizing_type=fit)

我们推出了经过全面重新设计的**Mass调试器**，让Mass实体、片段和处理器的使用变得更加容易且易于理解。

新的调试器UI让你可以检查世界中的实体，实时探索其结构和片段数据，并设置与Visual Studio等工具集成的**数据写入断点**。 现在，你可以按原型进行筛选，选择要显示的具体片段，并精细地监控变化 — 这一切都大幅简化了复杂Mass系统的调试和验证工作。

以上只是更大规模工作的第一步 — 我们计划在未来发布的版本中**持续改进**Mass调试器，以进一步扩展其功能和可用性。

### Mass实体编译器（试验性）

Mass实体编译器是一款新的试验性工具，旨在简化和精简Mass中的程序化实体创建过程。 它会封装现有和未来的MassEntity API，旨在为生成有效实体提供更安全、更简洁、更直观的方法，并降低复杂性、减少样板的使用。

我们引入了对动态实体生成的支持，让用户在最终创建之前能对实体设置进行精细的控制。 这种延迟生成方法让用户可以设置或重载片段数据（如变换或自定义标签等），其方式与传统的Gameplay工作流程相似，同时也符合ECS的最佳实践。另外，我们还优化了Mass实体配置编辑器的编辑流程。

### Gameplay摄像机（试验性）

[![Gameplay摄像机](https://dev.epicgames.com/community/api/documentation/image/9363ca73-3eb1-4ec1-97e8-8d51ec7049a2?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9363ca73-3eb1-4ec1-97e8-8d51ec7049a2?resizing_type=fit)

随着摄像机系统的不断发展，它也为Gameplay和过场动画工作流程带来了全新的强大工具：

-   **Sequencer驱动的摄像机绑定** – 现在你可直接在Sequencer中对公开的绑定参数进行关键帧设置，从而让你能够精确地控制时序和行为。
    
-   **实时编辑器预览：**摄像机绑定现在可以在编辑器中完全模拟运行，包括画中画预览和导航期间的HUD覆层。
    
-   **蓝图参数化绑定：**Gameplay逻辑可使用蓝图输入实时驱动摄像机行为，实现完全动态和反应式的绑定。
    

### StateTree任务控制流程

[![StateTree任务控制流程](https://dev.epicgames.com/community/api/documentation/image/67ad6d14-b718-47d5-9a2c-e69dc2ab36e3?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/67ad6d14-b718-47d5-9a2c-e69dc2ab36e3?resizing_type=fit)

我们改进了State Tree中任务完成对状态转换的触发机制，为设计师提供了更多的控制权和清晰度。 在此之前，只要有任务完成，状态就会变为完成，这往往会导致意想不到的行为。

有了新的任务控制流程，设计师现在可以定义哪些任务会影响状态的完成，以及是否应等待所有选定任务完成才转换状态。 这让State Tree的调试更为容易，用法也更加直观，这在某些任务（如日志记录或视觉效果）不应中断状态逻辑的复杂场景中尤其明显。

### Mass导航系统支持（试验性）

[![Mass导航系统支持](https://dev.epicgames.com/community/api/documentation/image/d8164cc6-0866-471e-8e13-812c092f69c0?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/d8164cc6-0866-471e-8e13-812c092f69c0?resizing_type=fit)

我们为Mass引入了一款试验性的导航系统。该系统让基于Mass的角色能够使用寻路网格体和寻路功能在复杂的环境中导航。 现在，实体可以发出路径查询，存储生成的路径，并使用专用的**State Tree任务**沿路径进行智能化的移动。

### StateTree：UX和工作流程优化

[![StateTree：UX和工作流程优化](https://dev.epicgames.com/community/api/documentation/image/57b90bd6-dd53-451b-8ce1-babf447e21e9?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/57b90bd6-dd53-451b-8ce1-babf447e21e9?resizing_type=fit)

我们优化了State Tree编辑器的使用体验，并进行了多项编辑流程升级，以提高清晰度和可用性。

-   新的**绑定查看器（Binding Viewer）**可帮助用户快速检查State Tree资产中的所有数据绑定，从而更轻松地进行调试和维护复杂逻辑。
    
-   现在你还可以直接在**状态视图（State View）**中管理任务和条件，从而精简编辑工作流程。
    
-   现在，你可以根据上下文选择性地隐藏节点和实例数据中的属性，这有助于减少视觉混乱，并将注意力集中到最需要的地方。
    

未来的新版本还将推出更多优化，以进一步改善创作体验。

### StateTree：委托和异步任务支持

[![StateTree：委托和异步任务支持](https://dev.epicgames.com/community/api/documentation/image/e9715997-7b75-41d4-a43f-5c3e7eb99696?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e9715997-7b75-41d4-a43f-5c3e7eb99696?resizing_type=fit)

为了让State Tree更注重事件驱动和性能友好，我们新增了一些工具，首先是对**委托**和**异步任务**的支持。

新的**State Tree委托系统**让任务可以使用调度器（Dispatcher）和监听器（Listener）绑定进行内部通信。 这简化了反应式逻辑链的搭建 — 举例说明，检测到命中事件的任务可以通知另一个任务进行变色，而无需依赖函数更新（ticking）或外部事件。 现在，设计师可以在编辑器中将过渡或操作直接绑定到任务级委托，使逻辑更加模块化、可读性更高、响应更迅速。

我们还通过**WeakExecutionContext**扩展了异步任务支持。 WeakExecutionContext较为轻量化，且可以安全地被复制。 它为异步逻辑提供了一个简单的句柄。 当被固定时，你可以从异步任务中完全访问实例数据，从而安全地进行异步读取或修改任务状态，同时防止过早发生垃圾回收。 你还需要确保其访问具备线程安全性。

### StateTree定时更新和性能

[![StateTree定时更新和性能1](https://dev.epicgames.com/community/api/documentation/image/65f5e863-ad53-4e69-9641-8fb6f976f2e6?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/65f5e863-ad53-4e69-9641-8fb6f976f2e6?resizing_type=fit)

State Tree现支持**定时更新**，这样能够避免不必要的更新，大幅降低性能开销。 现在，State Tree只在需要时才更新，如任务需要时、事件发生时或延迟完成时，而不是每帧都更新。 **任务或状态还可以请求指定的更新间隔**，从而实现按状态进行节流。 在相关活动恢复时，休眠实例会被自动唤醒。

[![StateTree定时更新和性能2](https://dev.epicgames.com/community/api/documentation/image/dc456df7-8c10-46de-af4d-0ecf8d6c23d8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/dc456df7-8c10-46de-af4d-0ecf8d6c23d8?resizing_type=fit)

这种优化可以显著降低复杂游戏中的CPU占用，尤其是当许多树处于闲置状态时。 设计师可以使用编辑器中的新版可视化指示器查看哪些状态或任务会更新，并可按需逐资产开关定时更新。

### Iris网络系统

[![Iris网络系统](https://dev.epicgames.com/community/api/documentation/image/05a12eec-d096-4707-a9e1-31b0ea618935?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/05a12eec-d096-4707-a9e1-31b0ea618935?resizing_type=fit)

我们为次世代复制框架**Iris网络系统**持续进行了稳定性、性能和功能支持的优化。 Iris现在支持**基于实体的复制**、**多服务器设置**和**实时编辑工作流程**等高级应用场景，同时为大玩家数量和动态世界提供更出色的可伸缩性。

此次发布包含的基础工作如下：

-   更强大的**动态对象和嵌套对象复制功能**，同时优化了对复杂Actor和FastArray的支持。
    
-   **扩展了调试工具**和内部日志记录，以帮助用户诊断复制不匹配问题和NetRefHandle错误。
    
-   修复了**崩溃和复制不同步问题**，尤其针对异步销毁、所有权转移和服务器专用Actor。
    
-   优化了高带宽和低延迟条件下的**网络性能**，提高了带宽利用率，降低了小型对象的复制延迟。
    

针对主要游戏模式和工具，Iris目前仍处于积极开发和测试阶段。我们的重点是让其尽早达成可投入使用状态，以供在《堡垒之夜》和UEFN中更广泛地使用。 我们欢迎内部团队和被授权用户持续提供反馈，以促进其推广使用。

## 媒体

### 可停靠的媒体查看器

![可停靠的媒体查看器](https://dev.epicgames.com/community/api/documentation/image/b050d0e9-6a72-413a-9d11-1ac4055feb26?resizing_type=fit)

动画师常常需要根据现有的参考片段来调整动画。 在虚幻引擎5.6中，我们新增了一项功能，让用户可以将视频文件或Sequencer驱动的媒体轨道停靠在动画制作所用视口旁。 这一新机制意味着，你可以在虚幻引擎主界面的任何位置停靠媒体资产（包括图像、媒体纹理、视频文件、实时视口纹理等）。 采用水平或垂直配置的两种AB库能帮助用户对比两组图像。 你可以缩放和平移功能按钮，进一步对齐内容。

该功能主要为动画师设计，但对其他需要在编辑器中引用可停靠媒体的用户和行业来说也可能会很有用。

虚幻引擎5.6更新：

我们将推出**一款新插件，提供媒体停靠的功能：**

-   通过Sequencer或内容浏览器引用和查看媒体纹理。
    
-   引用实时视口纹理。
    
-   从内容浏览器或Windows资源管理器引用和查看图像/文件媒体源。
    

### Sequencer媒体播放、拖动和循环

![Sequencer媒体播放、拖动和循环](https://dev.epicgames.com/community/api/documentation/image/1b7426a6-8bb5-4620-a4e2-c91b83b88f39?resizing_type=fit)

视频的进度拖动、剪切和循环播放是动画师和视频剪辑工作流程中常用的行业功能。 我们在以下关键领域中对Sequencer驱动的视频播放功能的可用性进行了优化：

-   响应式视频拖动和循环（使用兼容的视频编码解码器，如Apple Pro Res）。
    
-   使用新版Electra Protron播放器优化了基于容器的媒体的本地播放速度。
    
-   使用图像媒体播放器提高图像序列的读取和解码速度。
    

为了实现无缝循环，Electra Protron播放器的全新播放范围（Playback Range）确保了当你剪裁媒体轨道时，视频缓存能够循环播放。 我们计划未来工作将涵盖其他循环的边缘情况。 例如，当媒体轨道的长度超过统一长度时，或者当Sequencer的持续时间长于媒体轨道时。

### 媒体IO优化

![媒体IO优化](https://dev.epicgames.com/community/api/documentation/image/07a0bb27-eb7f-4dc1-9a07-1f7a37c3940a?resizing_type=fit)

为了继续改进虚幻引擎中基于容器的媒体和图像序列的视频播放，虚幻引擎5.6引入了许多全面的编辑流程优化。 这些可用性功能和修复将为所有行业的用户带来积极的影响。

-   图像序列的色彩管理。
    
-   改进了图像序列和基于容器的媒体的播放拖动性能。
    
-   媒体板Actor保留合成现在采用复选框替代上下文菜单（用于绕过TSR和色调映射）。
    
-   媒体层与动态设计材质设计器的集成。
    
-   实时MIP不再要求你指定数量。
    

### Electra Protron播放器

![Electra Protron播放器](https://dev.epicgames.com/community/api/documentation/image/f44554f7-dd89-440e-bf70-dea05acabc59?resizing_type=fit)

为了实现在编辑器中实现流畅的播放拖动、循环和搜索性能，**我们为虚幻引擎5.6引入了Electra Protron**。 这个Electra播放器版本专门针对本地文件系统和基于容器的媒体进行了优化。 它适合需要编辑器内视频播放性能的用户，也适合需要实时视频播放性能的用户。 动画师、虚拟制片、媒体和娱乐用户将从中受益匪浅。 建议使用Apple Pro Res编码解码器，以获取最佳的播放拖动性能。

### NDI输入插件

[![NDI输入插件](https://dev.epicgames.com/community/api/documentation/image/6c31b382-8dd7-48be-9fa4-ca36cf0ced44?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6c31b382-8dd7-48be-9fa4-ca36cf0ced44?resizing_type=fit)

NDI是一款广泛使用的知名IP视频协议，在广播业务中的应用尤其广泛。 我们在虚幻引擎5.5中为**输出**添加了**NDI媒体插件**，而在5.6中，我们通过添加**输入支持**完成了工作的闭环。 NDI媒体插件推出了**全新的NDI媒体源实现**，你既可以将其与媒体板配合使用，也可以直接与独立媒体播放器结合使用。

这利用了媒体框架（Media Framework）的后端，以便与我们的虚幻媒体技术栈达成兼容。 此功能适用于所有对在虚幻引擎中使用NDI IP协议输入或输出IP视频感兴趣的用户。 NDI媒体也支持Alpha通道。

## 制片渲染管线

### 快速渲染

[![快速渲染](https://dev.epicgames.com/community/api/documentation/image/b6ef3aa1-188c-452e-bdb6-8d43e2b262e6?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/b6ef3aa1-188c-452e-bdb6-8d43e2b262e6?resizing_type=fit)

使用影片渲染队列启动渲染需要多个步骤，这会减慢美术工作流程的迭代时间。 **快速渲染（Quick Render）**功能让用户可以在虚幻引擎编辑器中的任何位置使用引擎的实时渲染功能，且做到了一键触达。快速渲染提供了四个选项供你选择：

-   **当前序列（Current Sequence）：**渲染Sequencer中当前打开的关卡序列，同时省去了将其添加到队列中的步骤。
    
-   **当前视口（Current Viewport）：**与影片渲染队列化的高分辨率截图类似。该选项可将美术师当前通过编辑器视口看到的内容渲染为静态图像，而无需在Sequencer中执行任何其他步骤。
    
-   **选定摄像机（Selected Camera）：**你可以在大纲视图中选择一个或多个摄像机，并渲染它们的静态图像，而无需在Sequencer中执行任何其他步骤。
    
-   **使用序列中的视口摄像机（Use Viewport Camera in Sequence）：**从多个角度查看作品通常对动画师有益，但这些角度不一定是拍摄摄像机的角度。 此选项可以将动画师当前在编辑器视口中看到的内容替换为其动画所在的关卡序列中的摄像机视角。
    

### 高分辨率平铺和图表中的全景渲染

[![高分辨率平铺和图表中的全景渲染](https://dev.epicgames.com/community/api/documentation/image/17687890-eebf-484d-963c-701cb9994fea?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/17687890-eebf-484d-963c-701cb9994fea?resizing_type=fit)

虚幻引擎在标准分辨率下具有快速、高质量的渲染能力，而这自然会让用户渴望更高的分辨率。 **高分辨率平铺（High Resolution Tiling）**曾经遇到过很严重的内存问题，这让用户难以使用超高的分辨率进行渲染（尤其是在没有顶级GPU的情况下）。将该功能过渡到影片渲染图表让我们消除了这方面的渲染限制。

虚幻引擎5.6提供了内存优化，可通过高分辨率平铺功能大幅提升分辨率上限。 新的**分页存储至系统内存（Page to System Memory）**选项可以将GPU内存中的数据镜像到系统内存中。 这样做会产生性能开销，但可以大幅提高分辨率，在用户的GPU内存不足时尤其如此。

360度输出的**全景渲染**与高分辨率平铺功能相辅相成，它们在工作流程上有着许多相同的要求。 同样地，它们在向**影片渲染图表**过渡后也获取了相同的优化。

### 播放渲染输出

![播放渲染输出](https://dev.epicgames.com/community/api/documentation/image/bf4b673e-e4f2-4dec-be25-cc57107096a6?resizing_type=fit)

**播放渲染输出（Play Render Output）**会在你所选的查看程序中自动播放渲染后的媒体。 用户需要在编辑器偏好设置中设定具体的选择，并且需要按用户进行设置，以便在给定的多用户项目中提供灵活性，从而满足不同用户的需求。 播放渲染输出目前仅对**快速渲染**可用，在未来的版本中将对完整的**影片渲染队列**渲染可用。

### 多部件EXR支持

[![多部件EXR支持](https://dev.epicgames.com/community/api/documentation/image/532618cf-834c-4f47-9150-73da31c66405?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/532618cf-834c-4f47-9150-73da31c66405?resizing_type=fit)

在现有的多层EXR支持的基础上，影片渲染图表还能根据EXR 2.0规范输出**多部件EXR**。 启用多部件EXR后，生成的图像输出将包含多个层/元素，而这些层和元素可根据下游应用程序的请求分别加载，而无需每次都加载整个文件。

### H.264影片支持

[![H.264影片支持](https://dev.epicgames.com/community/api/documentation/image/30713495-932f-491e-bb33-998719aaca52?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/30713495-932f-491e-bb33-998719aaca52?resizing_type=fit)

**H.264影片**现在已经可以作为**输出类型**节点在Windows操作系统上使用的。 这让用户可以直接使用**影片渲染图表**生成H.264影片，而无需通过**命令行编码器**进行后期处理。

此外，**Apple的ProRes影片**的支持也已在Mac OS系统实现。

### 影片渲染图表可用性

[![影片渲染图表可用性](https://dev.epicgames.com/community/api/documentation/image/c84d3e8f-4264-4950-bd59-f83bfd67d79c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/c84d3e8f-4264-4950-bd59-f83bfd67d79c?resizing_type=fit)

我们一直在根据用户反馈不断优化**影片渲染图表**中基于图表的配置工作流程。 虚幻引擎5.6就包含了许多针对美术师和管线开发者的增强功能：

-   **帧范围变量**
    
    -   在渲染时便捷地设置开始帧/结束帧的重载项。
        
-   **更快的暖场**
    
    -   如果图表配置中使用了较高的时间样本数，则可更有效地进行暖场管理。
        
-   **适应分辨率**
    
    -   将输出分辨率设为标准分辨率中的一个，并根据胶片背板来调整方向。
        
-   **基于组件的集合条件**
    
    -   根据复杂蓝图Actor中的组件指定一项条件。
        
-   **裁剪摄像机过扫描**
    
    -   提高后期处理效果和镜头失真的输出质量。
        
-   **时间膨胀**
    
    -   现在可在影片渲染图表中使用。
        

## 模板变体

我们怀着无比兴奋的心情在此宣布，虚幻引擎5.6模板迎来重大更新，旨在助你快速上手。 模板体积显著缩减，不仅有助于缩短引擎下载时间，还可以在每个模板中增加更多功能！ 全新的"变体（Variants）"选项让你可以针对特定类型的Gameplay扩展模板。 无论你是在为横版平台跳跃游戏制作原型、编译开放世界赛车游戏，还是制作俯视视角策略游戏，变体功能都可为你提供更具针对性的定制化起始点，助力你将创意愿景变为现实。

你可以在虚幻引擎的"新建项目（New Project）"画面中创建模板。 使用变体下拉菜单为每个模板选择你要使用的变体类型。 如果你倾向于更基础的选项，可从变体下拉菜单中选择"无（None）"，以使用模板的轻量级版本。

我们使用可选变体更新了以下核心模板。

### 第一人称（First Person）

第一人称模板现在包含独立FOV、缩放和光照的第一人称渲染功能。 此外，还实现了完整角色（告别漂浮手臂），并配备了自定义控制绑定处理向第一人称视角的扭曲转换。 基础第一人称模板已移除武器，以便在加载轻量级第一人称模板时减少初始内容量。

#### 恐怖游戏

-   为玩家Pawn添加了火炬。
    
-   示例地图，展示在黑暗环境下的最佳光照实践。
    
-   冲刺机制及相关UI。
    
-   闪烁光源。
    

#### 射击游戏

-   多种武器拾取
    
-   多种子弹类型
    
-   AI敌人
    
-   弹药UI
    
-   竞技场地图示例
    

### 第三人称

基础第三人称模板基本保持不变，但我们在战斗游戏（Combat）、横版过关游戏（Side Scroller）和平台跳跃游戏（Platformer）变体中对其进行了扩展。

#### 战斗

-   简单徒手战斗
    
-   连招攻击
    
-   AI敌人
    
-   游戏内生命值条形UI
    
-   战斗地图示例
    

#### 横版过关游戏

-   固定摄像机示例
    
-   约束平面设置
    
-   拾取物品
    
-   单面碰撞和穿透碰撞交互
    
-   固定到地板与锁定摄像机示例
    
-   横版过关地图示例
    

#### 平台跳跃游戏

-   冲刺机制
    
-   墙壁跳跃
    
-   平台跳跃地图示例
    

### 俯视角

基础俯视角模板基本保持不变，但在策略（Strategy）和双摇杆（Twin Stick）变体中对其进行了扩展。

#### 策略

-   拖拽选择AI角色
    
-   简单角色交互
    
-   屋顶过渡效果
    
-   简单AI移动示例
    
-   正交摄像机设置
    

#### 双摇杆

-   简单AI敌人
    
-   炸弹和射击机制
    
-   简单竞技场地图
    
-   得分与倍率用户界面
    

### 载具

我们对基础载具模板进行了一些修改，将基础载具拆分为附着在空骨架上的静态网格体部件。 我们还简化了载具的材质和纹理。 现在有两个蓝图用于演示静态网格体和样条线网格体的简单生成。 当PCG结束Beta测试阶段后，我们将用其替换这些蓝图。 我们为项目启用了RVT，并针对每张地图完成了相应的设置。

#### 越野

-   开放世界探索地图
    
-   越野全轮驱动载具示例
    
-   样条线道路
    
-   RVT地图设置
    
-   HLOD结构（为节省内存未编译HLOD）
    

#### 计时赛

-   简易赛道地图
    
-   用于标记单圈穿越的门结构
    
-   时间与最佳时间UI
    

### 共享资源

除新增模板变体外，我们还对变体之间的共享内容进行了更新。

#### 关卡原型设计

-   我们将网格体更新为Nanite品质。
    
-   在可交互对象下新增了门、跳跃板和物理虚拟体
    

#### 角色

-   我们优化了Manny和Quinn的材质与纹理。
    
-   我们新增了徒手、持械、冲刺、战斗、受击、死亡等一系列动画。
    

#### 输入

-   我们新增了输入包，实现跨模板的输入标准化。
    
-   演示移动端触控输入设置
    
-   控件触控摇杆
    

#### 武器

-   我们新增了更多武器，包括手枪、步枪和榴弹发射器。
    
-   我们优化了武器纹理和材质。
    

## 平台SDK升级

[![虚幻引擎的SDK徽标](https://dev.epicgames.com/community/api/documentation/image/828ce40c-7455-4914-ae87-f27b30a2cf17?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/828ce40c-7455-4914-ae87-f27b30a2cf17?resizing_type=fit)

-   **Windows**
    
    -   Visual Studio 2022 v17.14或更高版本
        
    -   Windows SDK 10.0.22621.0或更高版本
        
    -   LLVM clang
        
        -   最低：18.1.3
            
        -   首选：18.1.8
            
    -   .NET 8.0
        
-   **构建农场编译时面向的IDE版本**
    
    -   Visual Studio 2022 17.8 14.38.33130工具链和Windows 10 SDK (10.0.22621.0)
        
    -   Xcode 15.4
        

-   **GDK**
    
    -   Windows SDK最低版本：10.0.22000.0
        
    -   GDK：2025年4月
        
    -   最新恢复版本
        
    -   支持的IDE：Visual Studio 2022
        
-   **Linux**
    
    -   原生Linux开发
        
        -   推荐操作系统：Ubuntu 22.04、Rocky Linux 8或更高版本、Redhat Linux 8或更高版本
            
        -   编译器：clang 18.1.0
            
    -   交叉编译工具链：基于v25 clang-18.1.0
        
-   **macOS**
    
    -   推荐操作系统：最新的macOS Sonoma 14
        
    -   最低操作系统：macOS Sonoma 14.0
        
    -   推荐Xcode：15.4或更高版本
        
    -   最低的Xcode：15.2
        
    -   支持的macOS SDK：14及更高版本
        
-   **Android**
    
    -   Android Studio Koala 2024.1.2 2024年8月29日
        
    -   Android NDK r25b
        
    -   Android SDK
        
        -   推荐版本：SDK 34
            
        -   用于编译UE的最低版本：SDK 34
            
        -   用于发售的默认目标SDK：SDK 34
            
        -   最低安装SDK级别：SDK 26
            
        -   如果你使用AGDE进行调试，推荐使用AGDE v23.2.91以上版本，因为该版本修复了SIGBUS错误。
            
    -   编译工具：34.0.0
        
        -   如果你要使用35.0.0版，那么在Windows上使用aidl时可能会出现问题。 35.0.1版本已修复此问题。
            
    -   Java运行时：
        
        -   OpenJDK 21.0.3 2024-04-16
            
        -   OpenJDK运行时环境（构建21.0.3+-12282718-b509.11）
            
        -   OpenJDK 64位服务器虚拟机（构建21.0.3+-12282718-b509.11，混合模式）
            
    -   其他注意事项
        
        -   虚幻引擎已更新为使用Gradle 8.7，我们使用的Android Gradle插件（AGP）版本也已更新为8.5.2。 如果你使用Android Studio进行调试，那么推荐使用Android Studio Koala。 Ladybug也可用，但不要从上述版本更新Gradle或AGP。
            
        -   选择NDK等级时，应该以android-26为目标，因为它支持Android 8.0以上版本。
            
-   **其他注意事项**
    
    -   Shader Model 6（SM6）要求macOS 15。 此项支持目前为Beta测试版，暂不推荐应用到生产环境。
        
-   **iOS/tvOS/iPadOS/visionOS**
    
    -   推荐操作系统：最新的macOS 14 Sonoma
        
    -   最低操作系统：macOS Sonoma 14.5
        
    -   推荐Xcode：16.1或更高版本
        
    -   最低的Xcode：15.4
        
    -   支持的目标SDK版本：
        
        -   iOS SDK版本：15或更高版本
            
        -   iPadOS SDK版本：15或更高版本
            
        -   tvOS SDK版本：15或更高版本
            
        -   推荐搭载Xcode 16.3的visionOS 2.4
            
        -   注意：v2.5/x16.4已通过基础测试，表现符合预期，预计可向下兼容至v2/x16版本
            
    -   iOS图形API：Metal 2.4 - 3.1
        

-   **EOSSDK**
    
    -   1.16.4-36651368
        
-   **Steam**
    
    -   1.57
        
-   **Switch**
    
    -   默认SDK版本：20.5.6
        
    -   默认固件版本：20.1.0-2.2
        
    -   最低SDK版本：18.3.1
        
    -   最低固件版本：18.1.0-1.0
        
    -   Nintendo文件包管理器：1.7.0
        
    -   支持的IDE：Visual Studio 2022
        
-   **Switch 2**
    
    -   默认SDK版本：20.5.6
        
    -   默认固件版本：20.1.0-2.2
        
    -   最低SDK版本：19.3.5
        
    -   最低固件版本：19.1.0-1.4
        
    -   Nintendo文件包管理器：1.7.0
        
    -   支持的IDE：Visual Studio 2022
        
-   **PS4**
    
    -   默认Orbis SDK 12.508.001
        
    -   最低Orbis SDK 12.008.011
        
    -   系统软件12.508.001
        
    -   支持的IDE：Visual Studio 2022
        
-   **PS5**
    
    -   默认Prospero SDK 11.00.00.40
        
    -   最低Prospero SDK 10.00.00.48
        
    -   系统软件 11.00.00.43
        
    -   支持的IDE：Visual Studio 2022
        
-   **ARCore**
    
    -   1.48
        
-   **ARKit**
    
    -   4.0
        
-   **OpenXR**
    
    -   1.1.46
        
    -   支持OpenXR 1.0和1.1运行时，两者均可在项目设置中禁用。
        

## 版本说明

### Animation

**New:**

-   Fix rig mapper crash when changing definitions at runtime if definition has mismatch in inputs and outputs count.
    
-   Prevent AnimInstanceProxy doing draw debug on server. AnimInstanceProxy DrawDebugCapsule now take DepthPriority like other DebugDraw functions.
    
-   Add cvar option (default to true) for whether animeditorviewportclient outputs engine debug messages.
    
-   Animationbudgetallocator now resets external tick state on skeletal mesh components when disabled via cvar.
    
-   Add a Mirror AnimationModifier that mirrors all bones in a sequence based on a mirror data table.
    
-   \[RigMapper\]:
    
    -   Fix value range warning triggered when comparing floats (i.e. 1.000001f >= 1.0f)
        
    -   Add tests for the processor, and clearer log for some tests
        
    -   Fix output values generation when not using the processor
        
-   Added RigMapper Experimental Plugin
    
-   Rig Mapper plugin update: - Optimizations & performance improvements - Refactoring & Commenting
    
-   When sorting components in AnimationBudgetAllocator, prioritise components with neverskip.
    
-   Update Rig Mapper Offline Subsystem Fix framerate issue when generating anim sequence assets. Update some incorrect return types.
    
-   Set some functions in AnimationSharingManager to virtual so they can be overridden.   
    
    -   Add some more debug options to AnimationSharing system including showing current playing anims.
        
    -   Add support for creating and registering custom AnimationSharingManagers.
        

**Bug Fix:**

-   Add an unchecked variant for subtypes to test the skeletal mesh component association on a UAnimInstance object.
    
-   Remove dll export from SkeletalMeshComponentInstance data as it lives in a private header
    
-   This change removes skeletal mesh asset properties that were incorrectly added to the global UCS modified property list in 5.5.0 and 5.5.1. Only assets serialized in those versions are affected. This change also only affects blueprint added skeletal mesh components. Components added natively were unaffected by the original issue.
    
-   Increase stack sizes to avoid animation running out of space in deep scopes
    
-   Fixed a crash on compilation of CalculateVelocityFromPositionHistory in Animation Blueprints
    
-   Add support for following tokenized hyperlinks in animation blueprint logging
    
-   Fixed an issue with tooltip names in SOverrideStatusWidgets
    

#### Animating in Engine

**New:**

-   Added a new experimental plugin "GeometryCacheLevelSequenceBaker" that bakes skeletal mesh animation in a level sequence into a Geometry Cache.
    
-   Added "Recreate Control Rig With New Settings" option to Control Rig Track right click menu to allow users to change the value of a rig's public variables after the rig is added to sequencer
    
-   \[Animation Kit\] - Spline path utility rig for testing.
    
-   \[Animation Kit\]- Add single sim. Add chain sim.
    
-   \[Animation Kit\]- Added aim option for blendParent. Changed control shapes to not be solid.
    
-   Added a new Lattice Rig "CR\_Lattice" to Animator Kit plugin, which exposes a few rig settings to sequencer that users can configure via the "Recreate Rig with New Settings" option, accessible from the Control Rig Track right click menu. Both the size of the lattice, as well as deformer execution phase (pre-skinning or post-skinning) can be tweaked.
    

**Bug Fix:**

-   \[Animation Kit\] - Adding back mesh connection to utility rigs. Changed root bone name of utility skm.
    
-   Anim Details' keying section now indicates if a control has a key on another frame
    

#### Character Customization

**New:**

-   \[Mutable\] Moved COE headers to private.These headers should not be public.Kept COESchema as public but moved to private many of its functions.
    
-   \[Mutable\] Remove Customizable Object Instance Usage Tick.
    
    -   Moved UCustomizableObjectInstanceUsage::Tick to UCusotmizableObjectSystem::TickInternal.
        
    -   Removed calls to SetSkeletalMesh that did not follow the Update flow. Callbacks must always be called.
        
    -   Removed UCustomizableObjectInstanceUsage SetSkeletalMesh. Added bAutomaticUpdateRequired which marks an Instance to start a normal Update flow.
        
    -   Removed EditorUpdateComponent SetSkeletalMesh. No longer necessary.
        
    -   UCustomizableObjectSystem::DiscardInstances and UCustomizableInstancePrivate::SetDefaultSkeletalMesh now sets the Reference Skeletal Mesh directly instead of using SetSkeletalMeshAndOverrideMaterials. SetSkeletalMeshAndOverrideMaterials had code specific to the normal Update flow.
        
    -   Inlined SetSkeletalMesh (+SetSkeletalMeshAndOverrideMaterials) and SetPhysicsAsset.
        
    -   Moved RequiresReinitPose to the UCustomizableObjectSystem.
        
    -   Simplified and renamed SetDefaultSkeletalMesh to SetReferenceSkeletalMesh.
        
-   \[Mutable\] Made UEdGraphSchema\_CustomizableObject funcitons private.
    
-   \[Mutable\] Change the default name of Component nodes.
    
-   \[Mutable\] Moved clothing physics clipping to a mutable external data manipulation plugin.
    
    -   Added IMutableClothingModule interface.
        
    -   Added new experimental MutableClothing plugin implementing the MutableClothingModule interface.
        
-   \[Mutable\] Improved TickWarnings performance. Work split in between Game Thread ticks.
    
    -   Reenabled TickWarnings ticker.
        
    -   Optimized FollowPinArray.
        
    -   Optimized GetRootNode (removed bOutMultipleBaseObjectsFound since is no longer valid).
        
    -   GetParticipatingObjects now uses VisitNodes.
        
    -   GetParticipatingObjects now discovers all assets + is more granual.
        
    -   Implemented an async version of IsCompilationOutOfDate.
        
    -   Added GraphTraversal functions inside the namespace.
        
    -   Renamed GetRootObject to GetObject.
        
    -   Changed GetFullGraphRootNode to start from a Customizable Object instead of a node.
        
-   \[Mutable\] Avoid loading objects on node PostLoads. Only load them if required due to backwards compatible code.
    
-   \[Mutable\] New Customizable Object Compile API. Unified functionalities of ConditionalAutoCompile and CompileCustomizableObjectSynchronously into a single new Compile function.
    
    -   Soft deprecated ConditionalAutoCompile.
        
    -   Soft deprecated CompileCustomizableObjectSynchronously.
        
    -   Exposed "Compile Only Selected".
        
    -   Customizable Object editor now displays "Compiling..." when a compilation is in the queue.
        
    -   Fixed Customizable Objects not loading in Standalone.
        
    -   Moved Compilation On Screen Warnings/Errors to the Customizable Object module. Now they also appear in Standalone.
        
-   \[Mutable\] Allow multiple GameThread tasks per tick. The time limit can be changed with a CVar. Currently set to 0.5ms.
    

**Bug Fix:**

-   \[Mutable\] Fix Components PImpl pattern + Actor improvements.
    
    -   Created ACustomizableSkeletalMeshActorPrivate.
        
    -   Renamed CustomizableObjectInstanceUsage due to old assets having the Usage serialized (must be transient).
        
    -   Prepared Mutable Actor to use dynamic components.
        
    -   Deprecated Actor debug material functions.
        
-   \[Mutable\] Fix pins breaking due to Editor language settings.
    
-   \[Mutable\] Fix LOD update using the wrong update parameters.
    
    -   Moved ESkeletalMeshStatus to private.
        
-   \[Mutable\] Fix Bake modifying original Materials when using the "Generate Constant Material Instances" option.
    
    -   Fixed CopyAllMaterialParameters setting the parameters to the original Material (instead of the UMaterialInstanceConstant).
        
    -   Simplified CopyAllMaterialParameters by using a template (instead of runtime type switching).
        
    -   Inlined GetTextureParameterNames.
        
-   \[Mutable\] Fix unwanted assets being added to package due to missing cook scope. Wrapped all loading functions to ease maintenance.
    
-   \[Mutable\] Fix deadlock when compiling a Customizable Object and shutting down the editor.
    
-   \[Mutable\] Fix Morph issues with Streaming.
    
-   \[Mutable\] Fixed multiple streaming issues.
    
    -   Avoid crash when streaming without morphs.
        
    -   Fixed Morphs using non-existing data from initial generation.
        
    -   Allow disabling morphs when using streaming with the CVar.
        
    -   Removed MinLOD usages from initial generation.
        
    -   Documented LOD variables
        
    -   Renamed LOD variables.
        
-   \[Mutable\] Fixed morph streaming issues.
    
    -   Fixed morph crash without streaming.
        
    -   Fixed DoComponentsNeedUpdate issue when streaming.
        
-   \[Mutable\] Removed Parameter not found check. These functions are public and the user can easily call them with a non-existing parameter. In any case (editor, game, shipping, development...) Mutable should not crash if a parameter is not found.
    
-   \[Mutable\] Fix crash when using Image Layer Blend Normals with a Mask.
    
-   \[Mutable\] Fix grooms not attaching when opening an editor.
    
-   \[Mutable, HairStrandsMutable\] Fix Grooms not detaching when discarding an Instance
    
-   \[Mutable\] Fix UCusotmizableComponent and UCustomizableObjectInstanceUsage using CDO objects
    

**Deprecated:**

-   \[Mutable\] Deprecate FindParameterNameIndex. Users should not interact with ParameterIndex. Replaced with ContainsParameter.
    
-   \[Mutable\] Improved UCustomizableObject public API.
    
    -   Deprecated all functions that use ParameterIndex.
        
    -   Added missing ParameterName signatures.
        
    -   Removed old unused deprecated functions.
        
    -   Started with the Int -> Enum / Option -> Value renaming. Only renamed functions which we had to change the signature.
        

#### Control Rig

**New:**

-   Added debug draw settings to debug functions and debug nodes in ControlRig
    
-   Extracted IO Mapping, Pose Adapter, Variable Mapping and Hierarchy Mappings from AnimNode to external helpers, so these can be reused externally.
    
-   Added an option that allows refreshing the hierarchy using only bones that exist on the mesh, removing bones that exist in the skeleton but have been removed from the mesh
    
-   Control Rig dynamic hierarchy now supports using a skeleton for binding at import bones rig unit
    
-   \[Modular Control Rig\]
    
    -   Made all modules a Variant for upgrading in UE56. This will maintain backwards compatibility with any older Modules.
        
    -   Adding tags for Epic, Biped, Quadruped modules.
        
    -   Tagging root module.
        
    -   Made Root56 module the default for 56.
        
    -   Tag all modules
        
    -   Add variation for Root module.
        
-   Added persistence options to ControlRig debug draw settings
    
-   ChainInfo Control Rig Node This is a node that takes in a list of items and a param value, interprets those items as a chain, and outputs helpful info about:  
    
    -   Segment info including:
        
        -   Segment Length
            
        -   Segment Stretch Value
            
        -   Local Segment Param
            
        -   Segment Start Item
            
        -   Segment End Item
            
        -   Segment Index
            
    -   The chain at the current param value including:
        
        -   Chain Length
            
        -   Param Length
            
        -   Chain Stretch Factor
            
        -   Interpolated transform
            
-   Added an option to exclude virtual bones in the Import Skeleton rig unit
    
-   Add gizmo interaction events to ControlRigEditMode
    
-   Add tag filter to the module browser tab
    

**Bug Fix:**

-   Fixed a crash in Control Rig when undocking the hierarchy and opening multiple editors
    
-   Prevent control rig debug draw displaying in game view mode when high resolution screenshots are taken
    
-   Fix struct redirector handling in the RigVM registry
    
-   FKControlRig control-name mapping are now forced to be lower-case to address cook indeterminism.
    
-   \[Modular Control Rig\]
    
    -   Backward solve fixes for Biped modules.
        
    -   Fix AnimalSpine first bone auto connection.
        
    -   Fixed naming of head control.
        
    -   Fixed IK/FK fixes on a few modules that were not working. Included some incredibly small low risk module bug fixes that have been reported
        
    -   Fixed flipping on HindLeg, hooked up number of spine bones, fixed modules to work with left side axis, further fixed backwards solves.
        
    -   Fixed foot backwards solve. Added basic twist bone rigging to arm. Various cleanup and fixes to some of the graphs. Fixed Shoulder and arm FK.
        
    -   Added twist to legs. Fixed IK/FK naming. Added back public function from arm to leg so it picks up changes. Fixed hind legs ik fk.
        
    -   Fix bug in VehiclePivot that caused an array to fill up during the interaction event.
        
    -   Add missing toe metadata for mGear skeletons. Expose distance on VehiclePivot Module.
        
    -   Improved backwards solve for Foot Module.
        
    -   Fixed HindLeg FK controls not rotating. Fixed AnimalNeck stretch.
        
    -   Fixed Shoulder backwards solve by parenting to chest null instead of body ctrl.
        
-   Fixed a crash in Control Rig when closing one tab and multiple rigs are open
    
-   Fixed Control Rig not returning correctly the value of the initial rotation of a control
    
-   Fixed a memory use after delete at RigVMHierarchyController import from text function
    
-   Fix defaults not being set for template nodes in RigVM
    
-   Avoid an infinite loop/recursion in URigVMPin::GetParentScriptStruct, which could happen when loading assets that have invalid but handleable data types in them.
    
-   Refactored RigVM math customizations to use property handles, in order to fix a memory stomp while setting values in the details pannel
    
-   Fixed a crash in Modular Rig when switching the preview mesh to a different compatible asset
    
-   Fixed a crash in RigVM graph details when using instanced structs.
    
-   \[Control Rig Content\]
    
    -   Marked draw functions outdated and renamed variants to debug in Standard Function Library.
        
-   Added visual logging support for RigVM
    
-   RigVM fix to avoid a crash when checking if a pin can be linked and one of the target pins is an unresolved wildcard pin
    
-   Protected Control Rig anim node cache bones function with the evaluation lock, as we can receive a cache bones request on a worker thread while the main thread is executing the rig
    
-   Fixed Control Rig Hierarchy random initialization issues by converting static names into lazy names
    
-   Fixed a crash in Control Rig when the user generates controls in the construction event and expose these controls as a promoted variable
    
-   Avoid Control Rig mark the asset as dirty with node selection (but keeps selection undo redo)
    
-   Fix for RigVM removing spaces from default pin values
    
-   Allowed RigVM event nodes to vary their event name based around the node's defaults
    
-   Avoid Control Rig type registry performing a full engine type scan when an user defined struct or enum is missing from startup type scan.
    

#### Deformer Graph

**New:**

-   Enabled Deformer Graph support for mobile platforms
    
-   Added a new property "Target Mesh Deformers" on Skeletal Mesh that accepts a new asset type "Mesh Deformer Collection", which allows the Skeletal Mesh to automatically determining if half edge data or other deformer graph specific data should be built for the Skeletal Mesh during cook.
    
-   Added a default MeshDeformerCollection "DA\_DeformerCollection\_RecomputeNormals" to the Deformer Graph plugin, which can be used to make sure half edge data is built for any Skeletal Mesh that may run a Deformer Graph that contains Half Edge data interface.
    
-   Added support for "AddDeformer" control rig node to initialize Deformer Graph variable pins with the default value of those variables defined in the Deformer Graph asset.
    
-   Added support for comment nodes
    
-   Updated Deformer Graph plugin default deformers to use the Read Skinned Mesh Data Interface instead of Skinned Mesh Data Interface such that pre-skinning deformers can affect skinning performed by these default deformers.
    

**Bug Fix:**

-   Added some safety checks to compute graph/optimus to prevent crashes on nullptr.
    
-   Fixed bad kernel dispatch order when a copy is required from a set/get resource node to another data interface node like write skinned mesh. Previously the copy kernel was dispatched too early.
    
-   Fixed a typo in skin weight as vertex mask data interface causing the wrong LOD Index to be used when creating buffers.
    
-   Fixed having multiple variable nodes of the same variable leads to shader compilation error around redefinition of functions from the graph data interface
    
-   Fixed errors related to unsupported typed UAV loads on Dx11 when a Read Skinned Mesh data interface and a Write Skinned Mesh data interface are connected the same kernel. Read Skinned Mesh data interface now uses SRV instead UAV to avoid the error.
    
-   Fixed crash when using the new skeleton data interface on LOD change from LOD1 to LOD0 if LOD0 has more material section than LOD1
    
-   Fixed copy & paste not working in the shader text editor
    

#### Gameplay

**New:**

-   Adding visual logger logline support in rewind debugger.
    
-   Exposing anim to texture editor functions as a public interface.
    

**Bug Fix:**

-   Account for possible invalid section when montage is force moved
    
-   Fix for an issue in sequencer where shots that are set to blend will have the incorrect blend time if the sequence play rate has changed.
    
-   Fixing some logging typos in the animation blueprint library after some feedback from licensee.
    
-   Prevent Foot Placement running when an actor is dropped into the level viewport
    
-   Fix for issue where looping level sequences could get stuck on the final frame
    
-   Adding missing GatherDebugData calls.
    
-   Fix for an issue when doing a replace on multiple selected notifies. When iterating through the array of nodes user chose, we now do it in reverse because we delete as we go. Previously this was changing the size of the array.
    
-   Passthrough inputs correctly when properties aren't set on certain chooser column types
    
-   Fix for when removing a montage section, any sections that used that section as link will now become unlinked automatically.
    
-   Fix to allow motion warping of rotations to account for montage play rate
    
-   Fix root motion sampling in blend stack
    

#### IK & Retargeting

**Bug Fix:**

-   Fix potential crash in Retarget Component when used with a MetaHuman BP.
    

#### ML Deformer

**New:**

-   Use the component space transforms instead of bone space transforms. And calculate the bone space transforms from those. This fixes some cases where no leader pose is used, but some things copy poses and don't update the bone space transforms. It also makes it easier to visualize the input pose.
    
-   Added a confirmation dialog to the Finalize Morph Targets button as you cannot undo this.
    
-   Automatically create two hidden layers when creating a new Nearest Neighbor model. And automatically create a section as well. This makes the UX a bit better.
    
-   Show a UI warning when the frame rate of a geom cache and animation don't match. As this can result in issues when scrubbing the timeline or training. Directly added some safety check to the morph model instance, which could potentially cause a crash.
    
-   Added support for curves on the skeletal meshes.
    
-   Some improvements to the memory management in geometry caches. Preventing reallocations, resulting in faster performance.
    
-   Added a new console command "MLDeformer.DebugDrawInputPoses" which will draw the input pose to the ML Deformer. It can be useful to quickly visually see what meshes have ML Deformers on them, and what bones are included.
    
-   Moved the tick group from pre-physics to post-physics.
    

**Bug Fix:**

-   Fixed the timeline from breaking when switching models. This was because some delegates were still pointing to the old editor model which got destroyed after switching models. Directly fixed a few small errors in the comments.
    
-   Added some cook scoped object in the GeometryCacheModel to make it tag the training geom caches as editor only and be excluded from the cook. Also removed some unneeded code to set editor\_only marked properties to nullptr before serialization during cook.
    
-   Fixed a crash when there are no input sample animations, and the NMM is set to local mode, and you click a bone.
    
-   Fixed a crash and potentially incorrect behavior when switching from Local mode to Global mode in the Neural Morph Model.
    
-   Avoid crash due to nullptr in FMLDeformerEditorToolkit::OnModelChanged.
    
-   Crash fix while cooking. This was because the MLDeformerModelInstance wasn't keeping the SkeletalMeshComponent alive and that could a crash. Made the TObjectPtr a transient UPROPERTY now.
    
-   Fixed a crash in the Nearest Neighbor Model where the GetNumBaseMeshVerts() is 0, which can be caused by the imported model data not to be present.
    
-   Removed an error log that shouldn't really be logged in the Nearest Neighbor model.
    
-   Add the advanced preview scene settings tab to editor.
    
-   Fix python errors when launching with "-game" as argument.
    
-   Fixed a bug when training, related to masks of input animations. Training would fail with some error right after sampling.
    

#### Runtime

**New:**

-   Expose AddAnimationModifier for Editor Tooling
    
-   Add editor option to hide long list of enum blueprint actions in the animation blueprint editor.
    
-   Optimized NamedValueArray union operations used by animation blending
    
-   Enable NEON intrinsics for RigLogic on supported platforms
    
-   Reduced inlining to save stack space in AnimBP graph traversal to avoid stack overflows
    
-   Optimized component space to bind space conversion when sending matrices to render thread
    
-   Optimize RigLogic for low LOD evaluation (targeting low-power devices), bringing a 30-40% performance improvement
    
-   Allow 'None' to be selected in SBoneSelectionWidget.
    
-   Add property to disable transition in state machine editor.
    
-   Added public API (IAnimSequenceCompilingManager::FinishCompilation) to wait for animation compression to be finished (for specific assets)
    
-   Avoided weak object ptr testing in hot loop during animation decompression
    
-   Fixed marker pair detection when it overlaps the start/end of a sequence
    
-   Ensured ACL curve compression never fails by gracefully handling bad data
    
-   Animation blueprint navigation speed has been improved when several animation blueprints are opened simultaneously in the editor.
    
-   Exposes the option to sync anims in blendspaces. Blendspaces apply time scaling using the "Axis Scaling" feature, whether or not anims are being synced
    
-   Optimized RichCurve evaluation
    
-   Add ability to feed a LOD pose to a Run Graph rig unit Added an input pose trait that reads a LOD pose from e.g. a get variable node and pushes the pose onto the pose stack. The input pose trait can then be connected to any other node in an anim graph and be further used.
    
-   RigLogic Body Correctives for AnimNext This change enables the new body correctives using RigLogic that will replace MH pose drivers in AnimNext.
    
    -   AnimNext's reference pose now generates and stores a mapping from mesh bone indices to LOD pose bone indices.
        
    -   We're now using pose indices directly without any bone index translation at runtime. This is more cache friendly as we're less jumping around in the transform arrays and should help increase performance.
        
    -   Fixed a bone index translation issue when initializing the bone index mapping.
        
    -   Dense and sparse driver joint mapping is now stored per LOD and only the needed data is sent over to the trait tasks.
        
    -   Some more safety checks and warning/error logging.
        
-   Optimized skinned mesh proxy creation
    
-   Modify SAnimCurvePicker to optionally support multiselect.
    
-   Added memory usage estimate during animated curve compression
    
-   AnimNext: Skeletal mesh attachments with minimal bones This allows us to remap and attach skeletal meshes that only contain the bones it needs, like e.g. only skinned bones. For the cases where the target skeleton does not share the same root bone with the source, try to find the corresponding bone on the source skeleton for the target's root bone and sync the skeletons up from there by calculating the delta transform between the two and move it along with the source.
    
-   Allow pinnable blend profiles in profile blend node and refactor.
    
-   Refactor animation editor asset family to support plugins.
    
-   Add local/mesh space blending toggle to Profile Blend node.
    
-   Animation Attributes now use Interpolation rather than Weighted-Multiplication when blending Animation Attributes. This makes it so it blends from identity/default value rather than from zero for non-zero default attributes, e.g. Transform and Quaternion Attributes.
    
-   Animation Sequence trimming tools:Inserting frames into Animation Sequence using timeline now prompts users for number of frames to insertTrimming/inserting frames now adjusts animation notify (states) and sync-markers correctly
    
-   Added ability to lazy-initialize UAnimationSequencerDataModel's URigHierarchy data - to speed up editor load and cook memory footprint. Currently disabled by default. Use a.AnimSequencer.LazyRigHierarchyInitMode to enable using four different modes/values:
    
    -   0 = RigHierarchy is always initialized during PostLoad.
        
    -   1 = RigHierarchy is lazily initialized while running CookCommandlet otherwise during PostLoad
        
    -   2 = RigHierarchy is always lazily initialized when required for pose evaluation or model modification while not running CookCommandlet
        
    -   3 = RigHierarchy is always lazily initialized
        
-   Enabled editing of overlapping AnimNotify(state) properties during multi selection.
    

Bug Fix:

-   Fixed issue causing reimported Animation Sequences from FBX not reflecting their respective new frame-rate
    
-   Breakpoints in Animation Blueprints can now get hit when not debugging a specific object
    
-   Skeletal mesh component global scale animation rate has been clamped to a minimum of 0, in order to avoid issues with global negative values in other dependant systems
    
-   Fix missing fast path icons for blend space nodes
    
-   Exposed bShouldStopAllMontages pin in latent Play Montage node
    
-   Skeletal mesh editor now uses the required bones to display the skeleton tree, so the bones stay in sync with the preview scene, making it clear if bones are excluded or not.
    
-   Added option to disable animation ticking when a skeletal mesh is directly occlusion/frustum culled
    
-   Fixed potential race condition when building skinned asset linkup data
    
-   Added checks in anim sequences and pose assets to avoid creating transient retarget source assets
    
-   Fix for aim offset anim node to account for socket offset when calculating pivot location
    
-   Fixed TSAN race condition around bForceRefPose flag
    
-   Fixed crashes when re-instancing animation blueprints with custom proxies
    
-   Fix FAnimMontageInstance::GetNextSection to return next section of instance rather than the montage default next section.
    
-   Fix crash with setting bone name in skeletal mesh region bone filter.
    
-   Fix crash in 'call function from anim graph' node BP menu population
    
-   Deprecated USkeletalMeshComponent::SetAnimClass function
    
-   Fixup redirects and remove UFUNCTION markup for redirected SetAnimClass function
    
-   Ensure Dynamic Anim Montage use the target frame-rate from the Animation Sequence it is created for.
    
-   Fix race condition between parent and child Anim BP class sparse class data patching/copying
    
-   Fix race condition when copying sparse class data in base Anim BP subsystem
    
-   AnimNext RigLogic trait crash: RigLogic crashed when the mesh's DNA for a given LOD had a bone enabled that wasn't part of the given pose's LOD. Filter these in the init-phase already in order to prevent out of bound access and avoid runtime checks.
    
-   PR: Fix incorrect comparison of VisibilityBasedAnimTickOption in AnimationBudgetAllocator.
    
-   Fix crash when selecting anim sequence with empty reference inside an anim composite.
    
-   Fix the graph ordering constraint when using anim node reference node.
    
-   AnimNext: Control rig trait crash fix Wrong skeletal mesh used which resulted in a crash for multi-mesh characters.
    
-   Fix crashes when skeletal meshes are saved with more bones than their skeleton
    
-   AnimNext: Crash when remap target has less LODs than the source skeletal mesh In case the source ref pose has fewer LOD levels available than the input/source pose, use the highest quality mapping available. This happens in case the source skeletal mesh does e.g. have 4 LODs while the target skeletal mesh only has 1. In this case we just create a single mapping for memory reasons as we'd store duplicated data otherwise and bones are guaranteed to be sorted.
    
-   Fix Anim BP reinstancing crash in the edge case of a nested linked anim graph
    
-   Fix assumption that compact pose always has the same set of bone indices as the ref pose override
    
-   Properly accounted for keyframes that have an infinite error in ACL codec
    
-   Fix mapping of DNA indices to UE bone and curve indices, such that the mapping cache key is composed from both the SkeletalMesh and Skeleton, not just the SkeletalMesh, and also make sure the containers are sorted during initialization to prevent it happening at runtime which may corrupt the data structure
    
-   Fix montage editor selection issues. Dragging montage selections now correctly selects the montage. Marquee selection now requires the Alt modifier key.
    
-   Allowed post process Animation Blueprints to be applied based on a LOD threshold per-component
    
-   Ensure AnimationSequencerDataModel evaluation does not override bone pose in case the target reference skeleton is different to the Animation Sequence its reference skeleton.
    
-   Fixed an Undo / Redo crash on animation sequences caused by outdated tooltips, by refreshing the notify list
    
-   Animation Blueprints will no longer show animation graphs using animation layers default shared groups in My Blueprint.
    
-   Fixed Regenerate LOD button not getting enabled in the Skeletal Mesh Editor under some circumstances at a post edit change
    
-   Fixed problems editing various property types in anim notifies
    
-   Fixed animation budget allocator debug rendering sometimes getting removed
    
-   Fixed memory leak when switching skeletal meshes and setting animation mode during montages
    
-   Fix anim getter node titles not updating on state rename.
    
-   Made sure required bones are up to date when ticking animation
    
-   Fix bone names being drawn for bones when they are not visible.
    
-   Fixed OnlyTickMontagesAndRefreshBonesWhenPlayingMontages option updating the anim instance multiple times
    
-   Fix copy-pasting shared transition rules not behaving correctly.
    
-   Fixed compilation non-determinism in animation blueprints
    
-   Fix to calculate all active transition alphas prior to setting state weights
    
-   Fix potential invalid reference within budgeted components to deleted allocator
    
-   Fix issue where sequence length of child montages could get out of sync with the parent asset. Also force update of common frame rate when child montage is created to prevent display of very large number of frames
    
-   Added wait for additive base sequence to finish compressing before we attempt compression
    
-   Fix invalid condition that was causing anim task evaluation to be triggered on the game thread, on the frame a mesh is spawned
    
-   Prevent auto calculate significance overriding budget allocator component data flags
    
-   Clamp preview cursor of blend space to bounds of blend space.
    
-   Fix white thumbnail for skeletal meshes due to missing large icon file.
    
-   Made DeviceProfiles::GetConsolidatedCVarValue thread-safe
    
-   Deformed faces multi-threading issue in AnimNext RigLogic
    
-   Ensure that Blendspace pose sampling forward the extraction context to the Animation Asset evaluation
    
-   Fix double drawing of selected bone name when bone name drawing is enabled in the animation editors.
    
-   Ensure that any Animation Sequence compressed data validation in cooked-editor runtime does not try to access editor-only data.
    
-   Fix collapsed meshes with skeletal mesh components with disabled animation
    
-   Add framework for supporting custom blend profile implementations in animation blueprints.
    
-   AnimNext: Crash in remap pose node when either the source or target mesh are invalid when remapping attributes
    
-   Replace invalid/stale assertion on mmap'd data to just assert on data type alignment for FScriptContainerElement. Assertion predates application bundles and as such, files may be addressed by offset which will not necessarily be platform page size aligned.
    
-   Prevent possible crashes when there is a potential mismatch in bones between retarget transforms vs the animation transforms
    
-   Fixed issue causing EvaluateAnimationBlueprintWithInputPose AnimationModifier node to not evaluate the pose correctly.
    
-   Avoided container usage in loop that can modify its content
    
-   Fixed ACL curve codec asserts in debug builds
    
-   Skipped ACL error computation when logging isn't verbose
    
-   Make SimulateAdvance symmetrical with Advance when dealing with ends of sections
    
-   Prevented crash by disallowing renaming states in animation state machines to 'None'
    
-   Fix memory leak when calling functions via property access that return non-POD values
    
-   Fix skeletal meshes getting ticked offscreen incorrectly when using montage-related visibility options
    
-   Fix uninitialized pose transforms being generated in some circumstances
    
-   Minimize the amount of processing done in UAnimSequencerController::UpdateWithSkeleton - by first checking whether anything is actually going to change
    
-   Replaced hard check(s) in AnimSequencerDataMode validation with error logging instead.
    
-   Addressed issue where Animation Sequences could have matching DDC keys causing compressed animation data indeterminism: Animation Sequence X with length of 30 frames, containing uniform pose across its framesAnimation Sequence Y with length of 15 frames, containing uniform pose - matching that in X - across its frames. The DDC key now includes the number of frames to make it unique.
    
-   Enabled component tick when unregistering from the Animation Budget Allocator
    
-   Fix cook non-determinism with generated 'mutables' struct in animation blueprints
    
-   Fix memory leak when GC-ing both skeletal mesh component & anim instance in the same pass
    
-   Fix crash when creating a preview scene for animation assets with a deleted compatible skeleton
    
-   Fix thumbnail scene references of anim sequences preventing deletion when assets contain notify states
    
-   Fixed incorrect duplicate GUID warning when an Anim state machine transition rule is shared
    
-   Fix copy-paste of transition nodes in Anim state machines creating duplicate GUIDs/assets
    
-   Prevent renaming state machines to 'None' in Anim state machines
    
-   Fix AnimSequence segment length fix button in AnimMontage not working
    
-   UCopyBonesModifier::OnApply\_Implementation optimization reimplemented pull-request using SetBoneTrackKeys rather than UpdateBoneTrackKeys to minimize controller operations
    
-   Ensure that interactive changes are not processed in AnimationModifierAssetUserData::PostEditChangeOwner - causing excessive load and hangs.
    
-   Changed Animation Modifier library plugin loading phase to be PreDefault, to ensure any referencing assets are loaded correctly.
    
-   Creating an AnimStreamable asset no longer crashes the editor
    
-   Remove usage of deprecated GetCompactPoseIndexFromSkeletonIndex
    
-   Fixed issue of Control Rig writing Animation Attributes using Skeleton indices as CompactPose indices - causing remapping issues and potential crashes.
    

#### Sequencer

**New:**

-   Ctrl-B now browses to the selected section's source object (ie. audio asset or skeletal animation asset)
    
-   Sequencer Scripting: GetPlaybackStartPosition and GetPlaybackEndPosition functions now return the last valid frame that the playback controls in the UI respect
    
-   ULevelSequenceEditorSubsystem::AddSpawnableFromInstance and AddSpawnableFromClass are now to be used in favor of UMovieSceneSequenceExtensions::AddSpawnableFromInstance and AddSpawnableFromClass
    
-   Rerun Construction Scripts has been renamed to Allow Construction Scripts to Rerun Every Frame
    
-   Sequencer Scripting: The CopyFolders function now recursively gathers tracks and objects to copy as well as folders
    
-   Sequencer Scripting: The particle channel now has corresponding functions (AddKey, RemoveKey, GetKeys, etc)
    
-    Link Filters with Curve Editor now allows the user to toggle whether Sequencer's filter should affect what tracks are shown in the Curve Editor
    
-   Snap Keys to Elements and Snap Sections to Elements is now off by default
    
-   Sequencer Scripting: The Transform function now allows you offset and scale keys in bulk
    
-   Force Whole Frames is now a separate button on the toolbar
    
-   Add ability to set the sequencer sections grip height
    
-   Engine: CinematicTimeDilation can now be clamped, ie \[/Script/Engine.WorldSettings\] MinCinematicTimeDilation=0.0001, MaxCinematicTimeDilation=20.0
    
-   Audio sections tooltips now indicate which attach socket they are attached to
    
-   Duplicate keys are now removed when deselecting keys
    
-   Sequencer Scripting: The GetSections function on the ScriptingObject now returns the sections given the nodes. This allows you to get the sections on a track row as well.
    
-   The Material Parameter Collection track now has a button to browse to the source asset and a chooser to assign another asset
    
-   Snap Keys and Sections is now Snap Keys to Elements
    
-   When importing cameras apply uniform scale modifier to distance based parameters (Manual Focus Distance).
    

**Bug Fix:**

-   Blueprint read only properties are no longer keyable
    
-   Fixed crash after tearing down a level sequencer object
    
-   Creating keys with the middle mouse button now only functions when there are no modifier keys pressed. This fixes an issue where if you zoom scroll (ctrl and middle mouse wheel) you might accidentally press the middle mouse button down, creating a bunch of keys.
    
-   Labels in Sequencer now follow the same rules as labels in the Outliner. For example, when cubes are added sequentially, they will be named as Cube, Cube2, Cube 3, Cube 4 instead of Cube, Cube (1), Cube (1) (1), Cube (2) (1), etc.
    
-   Ctrl+S in Sequencer will now perform all the specific sequence saving operations (ie. thumbnail, save all sequences from the root) and not just save the single sequence
    
-   GetPossessedObjectClass is now LOAD\_EditorOnly so that it doesn't load during cooking
    
-   Pasting overlapping sections now outputs an error if the track doesn't allow overlaps
    
-   Component velocity is now reset in pre animated state. This fixes a bug where Sequencer will set component velocity when animating but never reset it when done. This bug had some unexpected side effects. If the user animates the transform of an object and then closes the Sequencer UI, the component velocity will have been retained.
    
-   Movie Scene: Removed the reliance on actors and actor components for Media Player Proxies.
    
-   Sequencer's cut/copy/duplicate commands no longer take priority over the Level Editor commands.
    
-   The cursor no longer gets stuck when switching sequences.
    
-   Keys are now copied in root time space so that they can be pasted into a different time space
    
-   When the user cancels a paste operation, it no longer continues pasting other sections
    
-   Send a track value changed if any property changed for skeletal animations. This fixes a bug where if you change any property on a skeletal mesh, the pose will revert to a t-pose until you scrub Sequencer again. This is because the change causes the skeletal mesh to update/tick, but since Sequencer data isn't actually changed (unless you autokey), Sequencer doesn't evaluate again.
    
-   Keys no longer disappear when expanding a track that has no children (ie. Event and Spawn tracks)
    
-   By default, the curve editor should not be visible until the user opens it
    
-   Reduce Tolerance in the right click menu of a track section no longer crashes
    
-   The bound actor is now selected only when the user selects child nodes. When you select keys/sections/layer bars, the corresponding bound actor is no longer automatically selected.
    
-   Fix for a crash where Conditions are not weakly referenced by MovieSceneCompiledDataManager, and when a level sequence actor is destroyed that uses them, GC will crash on breaking Disregard for GC assumptions.
    
-   Ease handles are now correctly displayed in frames
    
-   Track rows on the cinematic shot track now correctly respects mute/deactivate
    
-   Curve Editor: The retime tool now properly respects undo
    
-   Add a key with the middle mouse button now properly respects snapping to whole frames
    
-   Objects are now properly selected when they are initially added to the sequence
    
-   A new infinite section is created automatically when you create a Console Variable track
    
-   When deleting all keys, the current value is now set as the default value so that there is no visible change
    
-   All selected bindings are expanded/collapsed when a selected binding is expanded/collapsed
    
-   The actor reference key editor now properly finds the bound object so that it can display a component and socket chooser for the actor reference key
    
-   Improved performance of dragging keys by optimizing the rebuilding of track model sections
    
-   Cycling through time formats now properly skips past Hidden time formats
    
-   Custom track names are no longer lost when upgrading spawnables from 5.4.
    
-   Improve/restore remapping of bindings when objects are pasted. This now only remaps binding IDs in sections that are newly created.   
    
    -   However, if the user duplicates a camera that is referenced by a camera cut track, the camera cut track will not be switched to reference the newly created duplicate camera.
        
    -   For example, if the user duplicates two bindings that are attached to each other, the newly created duplicates will be attached to each other.
        
-   Fix RefreshBindingDetails so that it doesn't create a new BindingPropertyInfoList when the menu is still visible and instead just refills the existing menu. This fixes an issue where if you right click on Binding Properties and modify UOLs, it would only complete the first operation. For example, you have to open the menu, set the fragment to Actor, close the menu, open the menu, pick the Actor (you couldn't do this all with the menu open once).
    
-   Binding labels are now updated properly when using Assign Actor->Add Selected or Replace with Selected
    
-   Ctrl double click on a subsequence to open the the subsequence no longer crashes
    
-   Layer bars are no longer selected when pressing the right mouse button
    
-   Fix Vector4f properties crashing sequencer
    
-   The AutoSize computation now correctly calculates the range of the source object
    
-   Fixing a bug where decal material tracks would display red and disconnected when they were actually connected.
    
-   Rebind Possessable References now correctly rebinds child components
    
-   Select All in Selection Range now prioritizes keys over sections just as when you do a marquee select in the track area
    
-   Sequencer Scripting: The SetObjectPropertyClass function now correctly initializes the object property track
    
-   Changes in the key editor are now only committed on pressing Enter
    
-   Copy/pasting multiple sections from different rows are now pasted onto the same corresponding rows
    
-   Group and level filters now correctly reset when filters are reset
    
-   Fix ensure hit when creating piecewise curves from curves with multiple keys on the same frame
    
-   Ensure that evaluation context buffers have been flipped if an eval task is active prior to forced update
    

#### Skeletal Editing

**New:**

-   Expose TriEdit in skeletal mesh editor.
    

### Editor

**New:**

-   Added UMaterial and UMaterialInstance asset validators
    
-   Added ability to create preview shader platforms in DataDrivenPlatformInfo
    
-   \[Selection\] Allow for BP ISM components to opt into per hit proxy generation, so that PCG workflows can set this on BP ISM components
    
-   Added API to manage and query uncontrolled changelists via their internal GUIDThis is useful for creating programatic uncontrolled changelists (with a fixed ID) that aren't the default changelist
    
-   Imath version was upgraded to 3.1.12
    
-   Boost version was upgraded to 1.85.0
    
-   \[Content Browser\] Change the default preference for showing "Content" suffix on folders to false. We have added icons which denote additional content directories from plugins which are the visual differentiator now.
    
-   Use the TextureLODSettings of the preview DP when preview is active
    
-   UEditorEngine::Save now includes the path of the package being saved in its Unreal Insights trace information, matching the convention established by Load
    
-   Modify maximize/restore button so that it drops you out of windowed-fullscreen.
    
-   Improve Previewing Texture Streaming Pool in Editor - Get the correct PoolSize value from the DP cvar in Texture Streaming Stats - Exclude Editor Resident Memory from the Runtime Resident Memory in Texture Streaming Stats
    
-   Add multi selection for static mesh sockets in the static mesh editor.
    
-   OpenEXR version was upgraded to 3.3.2
    
-   Improve display of Far View Plane slider so that the maximum value more intuitively represents "Infinity" rather than zero. UE-238977
    
-   \[TEDS\] Added option to batch delete rows from TEDS and made the Index Table use garbage collection. Options to batch delete rows from TEDS have been added.
    
    The first option deletes all in the provided list of rows. The second version removes all rows that match a set of provided columns for better performance when large tables are removed. It does this to avoid the overhead of first compiling a list of entities to remove, but the downside is that these were needed by the Index Table to clean itself properly.
    
    To avoid adding this cost, the Index Table has been updated to not immediately check to see if a deleted row needs to be removed from itself, but instead uses a garbage collection like approach by first going over all its stored rows to see if any have been removed and then clears out the ones that have been removed. This process is spread out over multiple threads and multiple frames and targets no more than 2ms per frame by selfbalancing job counts per frame and rows per batch. This also only happens after at least one row has been deleted so if a user isn't interacting with the editor typically no work is done.
    
    The extra benefit is that the Index Table now doesn't add any cost during deletion, where previously even rows that didn't have an index would pay the cost for checking and updating the Index Table's internal bookkeeping. The downside is that while there's pending clean up work, resolving a hash to a row handle is more expensive and periodically 2ms per frame is used up for the cleanup cycle.
    
    Additional changes made:
    
    -   Reindexing a row in the TEDS Index Table no longer needs the row itself.
        
    -   A utils header was introduced. It currently provides functions that quickly convert to/from Mass entity (arrays).
        
    -   Unsafe versions of IsRowAvailable and IsRowAssigned have been added that omit checking if the database has been initialized. This is internal to the TEDS plugin and can be used in most places that get created during initialization to save on a bit of performance cost checking the state.
        
    -   Marked UEditorDataStorage as "final" to give the compiler a few more optimization opportunities whenever a pointer of reference to UEditorDataStorage is directly called.
        
-   \[TEDS\] Added an std::initializer\_list constructor to FRowHandleArrayView. There were lifecycle issues when constructing an FRowHandleArrayView with an inline array, e.g. FRowHandleArrayView({1,2,3}, ...). With the initializer list and lifetime checks this should be avoided now.
    
-   \[Transforms\] Flip left / right ortho camera to align to camera view space Update 2x2 default to flip orientation of panes vertically
    
-   \[TEDS\] Added a Query Stack node that monitors for row adds/removes to keep a row list up to date. The new Query Stack node takes either a fixed list of columns to monitor or extracts them from a provided query. It then sets up add and remove observers to collect changes that it will apply to the list of rows once per update. If a row node is provided as a parent, this node will try to update the parent's row array, otherwise it will keep a local array. In order to support monitoring the Row Handle Array had to be extended with support for removing rows.
    
-   \[TEDS\] Added a Query Stack node that monitors for row adds/removes to keep a row list up to date.
    
-   Modify startup ordering to ensure a consistent time for FEdMisc to initialize during editor startup
    
-   The "Settings" menu in the level editor is now hidden by default. All contents have been migrated elsewhere.# Set "LevelEditorToolbarSettings 1" to re-enable the menu.
    
-   Greatly speedup material validator by only translating material to HLSL first and only compiling if estimated amount of samplers exceed platform limits
    
-   Pugixml: added an installation of third-party library pugixml version 1.15 as a module
    
-   Aspect Ratio Preview fixes and Safe Zones preview implementation Wrapped the main editor viewport in the middle of a 3x3 grid in order to restrict aspect ratio for preview platforms that request it. By default, without preview or aspect ratio restriction, the middle cell will fill the entire screen. Safe Zones are gathered from adb dumpsys windows display atm and made resolution independent
    
-   Add option to open .uproject directly in visual studio as well as an option to prefer preview releases
    
-   Waveform Editor: UI buttons added to waveform toolbar to allow creating a new cue marker, a new loop region or to delete a selected marker or loop region.
    
-   Add filter UI to SDeleteAssetsDialog to allow usage of FARFilters and other filters (e.g. writeable, checked out, gameplay tags)
    
-   Waveform Editor: Real-time loop preview audio selected loop regions
    
-   When sorting the autocomplete list, console commands that actually begin with what the user typed will appear at the top. This makes it consistent with the other command box.
    
-   The ASTC texture format has been improved and updated when using astcenc:
    
    -   The ASTC texture format now encodes using multiple threads.
        
    -   ASTC can now support multiple versions to encode with, defaulting to the version that was current before this release (4.2.0).
        
-   \[TEDS Compatibility API\] Refactoring TEDS compatibility API UScriptStructs to use const and const\_cast
    
-   Add PlatformName to FDataDrivenShaderPlatformInfo. In Editor, when using -game we now also load the TPS module of the preview platform if we are using OverrideSP command
    
-   Use the Runtime Value of bSupportsInlineRayTracing and bSupportsRayTracingShaders for preview platforms This avoids getting in a bad state where the Preview platform has bSupportsRayTracing=true, but bSupportsRayTracingShaders=bSupportsInlineRayTracing=false while Runtime RHI globals like GRHISupportsRayTracing is true, leading to crashes because of missing shaders. Like Android VK SM5 Preview in D3D Editor
    
-   Re-enable VK SM5 preview for D3D Force SM6 for preview VK SM5, Mac SM5 Enable Lumen Support for Preview VK SM5, Mac SM5 Modifying FeatureLevelSwitch to respect the parent ShaderPlatform FeatureLevel and not the one set by preview in order to have consistent material logic with the Shader Platform we are trying to preview
    
-   Chooser tables: Add NoPrimaryResult chooser type. This is mostly UX fluff for when you are just interested in writing output values (especially integral ones), and not in returning an asset or class per se.  
    
    -   Fix EvaluateChooser BP node showing input struct pins as by-value when they are by-reference (the node modifies Read/Write parameters in-place)
        
    -   Adapt EvaluateChooser BP node to hide the Result pin and Mode setting in case we are working with NoPrimaryResult.
        
    -   Fix EvaluateChooser BP node compiling itself out along what followed its Then pin if no value pin was connected (it was setup as a Pure node)  
        
-   Added FScopedDisableSourceControl. This is more reliable than disabling the current provider for things like temporarily disabling source control when saving writable files, as disabling the provider causes other systems to interact with that change and potentially do expensive refreshes. It also keeps things like Perforce connected to their server, and avoids losing any source control settings.
    
    Note: ISourceControlModule::GetProvider still returns the current source control provider even when temporarily disabled, so code must also check ISourceControlModule::IsEnabled before using it.
    
-   Favor using uncontrolled changelists (if possible) when using the BackupAndOverwrite auto-save method
    
-   Exporting AssetDefinition\_DataTable and DataAssetFactory via API macro, so that user projects can create subclasses.
    
-   Allow IsAutoSaving to query for both transient or persistent auto-savesNote: It still only queries for transient auto-saves by default, to maintain backwards compatibility with the existing API
    
-   Add Default Button to Scalability Menu in Editor that will reset the scalability to what the device profile initially set
    
-   Allow a custom EditCondition to be treated as an additional condition rather than an overrideThis is controlled by a new ECustomEditConditionMode argument to EditCondition, and makes it easier to add additional EditCondition to a property via a detail customization, without replacing the EditCondition that was set on the property itself.
    
-   Update OutputLog with improved behavior, display, and saved filter settings.
    
-   \[TEDS\] Added a new array and array view optimized for row handles.
    
-   TBB version was upgraded to (oneTBB) 2021.13.0
    
-   OpenVDB version was upgraded to 12.0.0
    
-   Add "Show in Content Browser" option for plugins in the Plugin Reference Viewer.
    
-   \[TEDS\] Initial step for the TEDS Query Stack. This change list adds the TEDS Query Stack module. The Query Stack can be used to composite nodes together that each have a unique ability that when combined creates a stack to handle complex row handle manipulation.
    
    -   The first version includes two nodes:
        
        -   Row view node: a node that takes a collection of row handles and allows them to be used in the query stack.
            
        -   Row merge node: a node that has zero or more parent nodes that it combines together into a new list of nodes.
            
    -   Merging can happen in the following ways:
        
        -   Append: The parents are appended to each other without any further manipulation.
            
        -   Sorted: The parents are combined together into a sorted list.
            
        -   Unique: The parents are combined together into a sorted list and only one instance of any row handle is kept.
            
        -   Repeated: The parents are combined together into a sorted list and only row handles are kept that appear at least twice in the result.
            
-   Added a new plugin, Directory Placeholders, which adds a new asset type, the Directory Placeholder. This is a very small asset with no properties, whose sole purpose is to act as a placeholder so that an otherwise empty folder can be submitted to source control. This plugin also adds a feature to automatically generate placeholder assets when new folders are created, and delete them when otherwise empty folders are deleted.
    
-   Material Editor: Double clicking on the parameter rows in the parameter tab jumps to and selects parameter nodes.
    
-   Expose control of the Near View Plane in the level editor viewport options.
    
-   Allow custom ISM editor proxy objects
    
-   \[TEDS\] Added support for retrieving delta time in the TEDS Query Callbacks.
    
-   The Texture Editor now has a tab showing what various texture properties will be resolved to for each platform. This includes mip sizes, which mips are streaming/optional, as well as the final pixel format and texture format.
    
-   \[TEDS\] New Query Stack nodes to manage queries.
    
-   Improved the consistency of data validation auto-registration. Data validation now hooks into module load/unload and Blueprint asset creation/deletion to update the set of auto-registered validators accordingly.
    
-   \[DataTable Import Options\] Adding a reimport options popup to when the Curve Table reimport button is pressed so an interpolation mode can be selected
    
-   Allow overriding the MessageLog name used for validation errors
    
-   \[TEDS\] New Query Stack node to manage a row handle array directly as well as a new interface call so nodes can share row arrays.
    
-   \[TEDS\] Added a Query Stack node that converts queries to row handle arrays. This change also has a small behavior change to queries that only have a context. Instead of running them repeatedly for each row, they now only get called once. A query callback with this signature will have to do any work to access rows internally so it fits better to not attempt to do a row iteration.
    
-   Aspect Ratio added to Android Json Preview
    
-   \[Viewports\] Viewport camera navigation: Add local up/down movement with R/F
    
-   Waveform Editor: Waveform editor UI updated to allow controlling a loop region with the mouse. This includes selecting a region by clicking on it, highlighted mouse drag handles for the left and right bounds of the loop and the ability to drag a loop region by clicking and dragging from an area inside it.
    
-   \[TEDS\] Extended the widget constructor class with a way to provide sorting information. This is part of a larger effort to introduce generic sorting through TEDS to the editor.
    
-   Waveform Editor: Keyboard shortcuts to modify the loop region bounds in Waveform. This includes incrementing and decrementing the start and end bounds, changing the increment step amounts, and selecting the next or previous region. All key binds can be remapped in settings.
    
-   \[TEDS Core API\] Refactoring TEDS Core API UScriptStructs to use const and const\_cast
    
-   Add an in-PIE toolbar that can control view modes and show flags.
    
-   New: Added automatic installation of the Android Emulator during Android setup, and creation of an AVD suitable for UE.New: Added launching an AVD Emulator to UBT command line with -device=avd- syntax.
    
-   Update UBT to report when a project uses a deprecated plugin and promote the field to the PluginManager so users can see when a plugin is mounted that has been marked deprecated.
    
-   Add a "Diff Against" menu entry that allows users to pick any other asset of the same type to diff. This will appear anywhere we show revision control options for assets.
    
-   Ctrl+RMB will always create the AddMenu in the ContentBrowser
    
-   Templates can now have Variants
    

**Bug Fix:**

-   Fixed assert when copying from spline properties that have different values (prevent copying when this happens)Added copy/paste options to the spline point's type property
    
-   \[TEDS\] Fixed an issue where ListColumns wouldn't report pending columns. To remain consistent with \`HasColumns\`, \`ListColumns\` should also return the list of columns that are known up until that point. Since this applies to reserved rows, it's still impossible to return the list of columns for the table as those are not yet known. The documentation in the interface has been updated to reflect this.
    
-   Fix 10x source code accessor to pull the correct solution file name
    
-   Allowed GetAllowedClasses metadata to use fully-qualified paths to function libraries, enabling use on USTRUCTs
    
-   Hide several asset actions in context menu for aliases in content browser
    
-   Reverting a source control added file with "Should Delete New Files on Revert" disabled will now track it as an uncontrolled add, rather than leave it in limbo
    
-   Fix crash in composite curve editor when table view tab closed
    
-   Allow GetOptions metadata to work for nodes other than 'call function'
    
-   Fix a regression that causes editinline subobject override names to no longer map to default subobject archetypes.
    
-   Fixed bug where FAssetManagerEditorModule::WriteCollection tries to add PackageNames to the wrong collection share type.
    
-   Fix editor crash refreshing widgets of tool menus
    
-   \[Property Matrix Editor\] Can now unselect individual cells from the property matrix editor
    
-   Fix an issue where the level editor toolbar started to clip items while there was still free space.
    
-   Keep Simulation Changes should now properly keep all the changes
    
-   Fix Wrong texture format used in velocity pass with mobile preview
    
-   \[Revision Control\] Fix an issue where renaming files resulted in no revision control history for the new, moved file
    
-   \[Gizmos\] Fixed Translate and Rotate gizmo's not fully rendering properly at the widget matrix
    
-   Bug Fix: Fixed that installing the Android SDK from the Editor Platform menu doesn't take effect until after a restart on Windows, by broadcasting environment variable changes.
    
-   Fix to stop a crash on Mac when diffing files with Git
    
-   Encoding fix for PipInstall which should avoid crashes on systems where UE is installed in a path with special characters.
    
-   \[Curve Editor\] Fixed Crashes in array remove/clear and undo/redo, when the curve data is inline allocated in a container, or wrapped by InstancedStruct
    
-   Fix unchanged assets being marked as dirty when checking out unrelated assets
    
-   Added success/failure message when reverting an uncontrolled changelist, to match the UX of reverting a controlled changelist
    
-   Optimized the uncontrolled and unsaved filter processing in the scene outliner
    
-   Convert a delete to a checkout when restoring a deleted actor via an interactive save
    
-   Fix crash on Mac preview when mobile deferred is activated
    
-   \[Curve Editor\] Fix crash when Curve wrapped by InstanceStruct gets reset/replaced, causing memory address to change.
    
-   Propagate outer object archetype flags to inner optional subobject archetypes when instanced at edit time in order to allow packages containing one or more instances of those subobjects to import them at save time.
    
-   Fix material editor keeping reference to derived material instances during level unloading
    
-   \[Curve Editor\] Fixed Curve Editor not updated its data when resetting the runtime curve property
    
-   \[Debug Draw\] Fix a crash when brushes don't have any polys to draw
    
-   Fixed bug where FCollectionManager::EmptyCollection returns false when it successfully empties a collection rather than true.
    
-   Make CustomDepth behave same between Editor and EditorPreview on mobile platform
    
-   \[Editor Mode Plugin Template\] Fixed a bug of a new plugin not creating with the Editor Plugin template and non-unity mode is enabled / general cleanup
    
-   \[Curve Editor\] - Fixed editor locking issue when the user resets any property to default on the property chain
    
-   \[TEDS\] Fixed the TEDS Query Builder not being able to bind to a referenced lambda.
    
-   \[TEDS\] Alerts could attempt to check a parent that has become invalid, causing a crash deep in Mass due to an invalid archetype.
    
-   Fixed FValidateAssetsDetails::ValidationMessages not being populated when using FValidateAssetsSettings::bCollectPerAssetDetails
    
-   Fix SplineComponent Losing Custom Tangents of adjacent points when inserting point.
    
    -   Needed updates to fit with the current implementation
        
-   \[Viewports\] Fixed zoom ratio to be consistent in ortho viewport.
    
-   Fixed FText time zone conversions
    
-   Fixed a bug associated with shared linear and cpu accessible textures.
    
-   Bug Fix: Fixed Quick Launch to build the correct architecture of the selected Android device.
    
-   Bug Fix: Removed stopping latency of Android Device Detection thread on close.Bug Fix: Added 10s timeout to ADB in Android Device Detection thread.
    
-   PixelInspector: Fixed aspect-ratio-constrained viewport inspecting.
    
-   Fix regression where browse to asset no longer works on unloaded assets
    
-   Include propagated subobject and archetype flags on new instances constructed for non-nullable editable reference container properties on editor "add" actions.
    
-   For PreviewShaderPlatform do not try to inherit from ParentShaderPlatform if that Section does not exist
    

**Deprecated:**

-   Deprecating the "Tiling" style of texture formats.This only affects users who have implemented their own texture formats (derived from ITextureFormat) and implemented the CompressImageTiled style instead of the normal CompressImage(Ex) path. The CompresImageTiled path will be removed soon.
    
-   Truncation Warnings enabled for ToolMenu and ToolWidget modules
    
-   Truncation warnings are enabled in the Graph Editor module. Graph Editor module APIs were updated to use FVector2f for slate positioning, and FVector2D functions were deprecated.
    

#### Datasmith

**New:**

-   \[solidworks\] Add support for Datasmith exporter plugin for Solidworks 2025
    
-   Alembic version was upgraded to 1.8.7
    

**Bug **Fix**:**

-   \[CAD\] Fixed some import of CAD files containing non-manifold mesh hanging the editor
    
-   Fixed occasional crash importing CAD files
    
-   Fixed crash importing CAD scene with root node(and below) hidden
    
-   Fixed some file import of CAD files hanging the editor
    
-   SketchUp Datasmith Exporter : Fix NaN in Transforms due to double -> float -> double conversion that is now useless. Culprit was creating an Identity FQuat from a Imath::Quat.
    

#### Framework

**New:**

-   Adding a PropertyVisibilityOverrideSubsystem which can handle multiple override delegates for controlling property visibility on a property-by-property basis.
    

**Bug Fix:**

-   Fixed TOptional properties not being fully hidden when using MarkHiddenByCustomization because the flag was not applied to the eventual child optional node (also fixed MarkResetToDefaultCustomized and ClearResetToDefaultCustomized)
    
-   Fixed an issue where world partitioning would assume worlds were PIE worlds in -game or -server modePlace One Filer Per Actor (OFPA) actors in a sublevel instead of the Memory package in -game or -server mode to mimic what happens when the level is cooked.
    
-   Bug Fix: Updated the scene outliner tree item id from uint32 to uint64, as other systems like TEDS where using item IDs represented with uint64.
    
-   Fixed a crash that could happen on undo/redo of a static mesh component change where the component could attempt to access invalid static mesh render data.
    
-   Property Editor: Standalone Widgets now use visibility attribute.
    
    -   The GenerateStandaloneWidget method now copies the visiblity attribute when using a customisation.
        
-   Fixed an assert when looking up localized package names in -game or -server mode
    
-   In the startup of the geometry framework module, skip registering the level editor outliner filter in -server mode
    

#### Interchange

**New:**

-   Allow saving and loading translator settings via Python
    
-   Use "usdc" as default payload format when exporting to USD
    
-   Use InstancedStaticMeshComponents instead of HierarchicalInstancedStaticMeshComponents components when opening or importing USD stages, whenever possible
    
-   Prevent unnecessary patching of USD plugInfo.json files every editor launch
    
-   Export Unreal level by default when exporting level sequences to USD, defaulting to the current level
    
-   Show the root layer as dirty by default for new USD stages made with the USD Stage Editor
    
-   Change USD metersPerUnit handling to use doubles instead of floats whenever possible
    
-   MaterialX: upgraded MaterialX to version 1.38.10
    
-   Keep track of previously added USD API schema names and show those on the Add Schema list, whenever right-clicking a prim on the USD Stage Editor
    
-   Updated the LoadAll/LoadNone payload options on the USD Stage Editor to also affect the currently opened stage and its payloads
    
-   Added support for converting more UsdGeomCamera parameters into the corresponding Unreal camera properties
    
-   Handle textures inside USDZ files when importing via USD Interchange
    
-   Support variant-style LODs via USD Interchange
    
-   Add support for USD stages referencing OpenVDB files via USD Interchange and SparseVolumeTextures assets
    
-   Add new Interchange MaterialReferenceNode to allow describing material assignments of existing material assets
    
-   Move USD Geometry Purpose option from USD Interchange translator settings to the new USD Pipeline
    
-   Add support for making primvar-compatible material instances on USD Interchange
    
-   There's a new experimental Interchange USD plugin that must now be enabled manually to support importing USD files through Interchange.
    
-   Downgrade warning into a log when MDL SDK is not available as that can prevent cooking in some cases
    
-   Allow material slot merging to affect imported multi-LOD meshes from USD, for static and skeletal mesh assets
    
-   Added an option to set the root prim name when exporting Levels and LevelSequences to USD
    
-   Interchange : in FBX parser, add different possible texture paths encoded in fbx file like we used to have in Legacy FBX importer (Absolute, Relative to fbx source file)
    
-   Re-enable the cvar for import into level via USD interchange for 5.6
    
-   Try to pick up any new existing assets on the asset cache's asset folder before loading a stage
    
-   The USD Stage Editor will now show prim kind on the properties panel even if the prim doesn't have any opinion authored, so that we can author a new one via the combo box
    
-   Improve support for UTF8 USD strings and paths on USD importer plugins
    
-   Added new items to the Options menu on the USD Stage Editor to allow quickly selecting the currently bound stage actor and opening its LevelSequence with the Sequencer
    
-   Import USD prim visibility onto actors/components on the level when importing via USD Interchange
    
-   Add support for specifying component/actor visibility on Interchange scene and factory nodes
    
-   Add a new InterchangeUSDPipeline for some USD-related factory node post-processing
    
-   Allow removing the ParentNodeUid of a given node
    
-   Use shorter file names and file paths when exporting levels, level sequences and assets to USD
    
-   Add USD prim kind as a custom Interchange translated scene node attribute
    
-   Translate USD prim attributes as Interchange translated node attributes (just non-animated, non-array attributes for now)
    
-   Added support for importing geometry caches through Interchange USD.
    
-   Fix "Import as Material" vs "Import as Material Instance" issues for USD Interchange
    
-   OpenUSD version was upgraded to v25.02a
    
-   Move USD MDL schema translator to dedicated plugin that can be independently disabled
    
-   Add USDImporter option for setting FallbackCollisionType for static meshes, when opening and importing USD Stages
    
-   Add support for physics collision schemas via USD Interchange
    
-   Use more sparse typename authoring when adding references/payloads and exporting assets, Levels and LevelSequences to USD
    
-   Add new Interchange project settings for controlling when to display the reimport options dialog. Overrides can be placed per asset type and translator
    
-   Refactor USD error and logging utilities to better utilize the message log for user-facing messages, and to automatically deduplicate similar messages
    
-   Show some feedback when trying to reimport with USD Importer something that was imported via USD Interchange
    
-   Fix USD Interchange not being able to parse skeletal animations when the animSource relationship is authored within the Skeleton prim itself
    
-   The USD Stage Editor will no longer try to reuse static meshes in case it needs to specify different collision settings. It will instead make a new, separate static mesh
    
-   Assign AnimSequences to spawned SkeletalMeshComponents when importing USD stages through Interchange
    
-   Optimize generation of skeletal meshes with many morph targets when parsing stages via USD Interchange
    
-   Enable support for producing textures with non-power-of-2 sizes from USD Interchange imports
    
-   Simplify handling of skinned meshes to just use bind pose on meshes and skeletons, fixing incorrect morph target results in complex cases.
    

**Bug Fix:**

-   Fixed materials exported from UE importing via USD interchange as black plastic without any warning or feedback
    
-   Fixed missing skeleton when Skeleton prim is named after one of its own bones
    
-   Only clean up the USD asset cache when actively closing stages
    
-   Fixed duplicate morph targets when importing skeletal meshes.
    
-   Fixed spawnable USD stage actors not animating in PIE or showing up in MovieRenderQueue
    
-   Fixed some strange behavior when playing LevelSequences with spawnable USD stage actors during PIE.
    
-   Fixed textures not being parsed via USD Interchange translation in some scenarios.
    
-   Fix errors when undoing setting a prim purpose via the USD Stage Editor in some scenarios
    
-   Fixed multiple issues when manipulating visibility of the prims/components related to point instancers
    
-   Prevented the USD Stage Editor clear payloads/references buttons from being enabled if the prim doesn't have a payload/reference spec in the local layer stack
    
-   Fixed multiple issues when manipulating the stage properties relevant for the USD stage actor's LevelSequence, especially related to start/end time codes and playback ranges
    
-   Fixed a crash when importing USD blend shapes with invalid point indices
    
-   Fixed USD level exporter generating invalid point instancers if a foliage static mesh fails to export
    
-   Patch USD plugInfo.json files only when needed
    
-   Fixed USD stage importer top-level actors having RF\_Public flag, triggering crashes on WorldPartition levels
    
-   Fixed a crash when failing to produce some asset types during the process of opening USD stages
    
-   Automatically resize subsequence sections to match the USD stage's playback range
    
-   Fixed USD stage actor losing connection to its spawned actors and components after recompiling its blueprint
    
-   Fixed ensure/error spam when force-deleting the asset cache currently in use by a stage actor
    
-   Fixed a warning about UnrealUSDWrapper module not being loaded when cooking
    
-   Fix warnings about asset names differing from package names when opening USDZ stages with textures via the USD Stage Actors
    
-   Fix crash when parsing USD skeletal mesh data with polygons that have 0 vertices
    
-   Prevent render contexts registered for the USD Stage Actor from showing up on Interchange USD's list
    
-   Fixed a crash when undoing a change that regenerated the Time track on the USD Stage Actor's LevelSequence
    
-   Fixed an off-by-one error when exporting AnimationSequences to USD which was causing animations to be one frame too short
    
-   Fix import of USD stages with skeletal animations and blend shapes not flagging the curves as morph target curves
    
-   Implemented a fallback for collecting mesh data from USD Mesh prims in case it was authored all on a single time sample
    
-   Fix USD asset imports persistently disabling the option to import actors on the USD Stage Importer options dialog, when importing via Python
    
-   Fixed DisplayColors materials no longer working via Interchange USD
    
-   Fixed USD AssetCache cleaning assets way too aggressively, ignoring some situations where they were still actively being used
    
-   Fixed crash when importing a stage with a component of the previous import already selected.
    
-   Prevented the binding of stage actor properties other than Time onto its LevelSequences
    
-   Fixed draw mode extents animation not being written out to USD
    
-   Fixed USD AssetCache never cleaning up GeometryCaches as the asset cache's own reference to the asset was being counted as an "external reference".
    
-   Fixed a crash when using the USD Stage Editor and trying to reuse a LevelSequence that was destroyed during PlayInEditor
    
-   Fixed a Mac-specific crash when reloading USD Stages with the USD Stage Editor
    
-   Remove unnecessary stopping of VolumeComponents whenever the USD Stage Editor updated them
    
-   Fixed assets and components not being cleaned up when a prim is removed from the stage
    
-   Fix USD level exports creating empty prims for Brush actors
    
-   Fixed isolate layers functionality of the USD Stage Editor not using UE transactions or being undo/redoable
    
-   Fixed crash when reimporting a static mesh with a skeletal mesh USD file
    
-   Fixed failing to duplicate prims on the USD Stage Editor in some complex scenarios
    
-   Fixed a crash when turning the USD stage actor into a spawnable within it's own LevelSequence
    
-   Fixed a crash when parsing skeletal meshes with no mesh data from USD files
    
-   Allow undo/redoing apiSchema/reference/payload changes after tweaking them on the USD Stage Editor
    
-   Fixed more issues related to LevelSequence handling on the USD Stage Editor, related to sublayers, offsets and scales
    
-   Fixed an ensure when opening USD stages that reference .mdl materials that don't exist
    
-   Fixed a logic error when detecting whether to enable the USD SDK or not
    
-   Fix incorrect item count after removing one entry from Interchange ArrayHelpers with duplicate entries
    
-   Fix broken skeletal meshes when handling USD skeletal data with faces that have less than 3 vertices
    
-   Fix asset references from the currently opened Level and blueprint previews not being updated when reimporting assets from USD
    
-   Fixed a crash when using using the Actions -> Import option on the USD Stage Editor while the stage's LevelSequence was opened
    
-   Fixed how the Sequencer wouldn't properly refresh in some workflows that involved regenerating the USD Stage Actor's LevelSequence
    
-   Fix AnimSequences seeming to have no animation data after using Actions -> Import on the USD Stage Editor
    
-   Fix USD Interchange not producing AnimSequence assets whenever the animation length wasn't an integer multiple of the bake interval
    
-   Allow discovering and reusing existing Material Instance assets from the content browser when importing with Interchange and using the material search location option.
    
-   Fix Interchange USD not using timeCodesPerSecond when baking skeletal animation assets
    
-   Fix name-prefix-based collision meshes sometimes being imported as separate static meshes via Interchange in some scenarios with name collisions
    

#### Scripting

**New:**

-   Add ToolMenuContext DebugLogContextObjectClasses() scripting function for python to see what context objects are available
    
-   Added a CookAsset function to CookFunctionLibrary, an experimental function which allows for an asset to be cooked from an editor script
    
-   Improved Python initialization API for deferred initialization
    
    -   Added IPythonScriptPlugin::IsPythonConfigured and IPythonScriptPlugin::OnPythonConfigured to know when Python has been configured by deferred initialization.
        
    -   Added IPythonScriptPlugin::IsPythonInitialized to compliment IPythonScriptPlugin::OnPythonInitialized for deferred initialization.
        
    -   Added IPythonScriptPlugin::RegisterOnPythonConfigured and IPythonScriptPlugin::RegisterOnPythonInitialized as convenience wrappers around their respective IsX and OnX functions.
        
    -   Fixed -ExecutePythonScript failing with deferred initialization by updating it to use these new APIs.
        
-   Exposed DuplicateObject to editor scripting
    
-   \[Revision Control\] Add batch versions of get status and provide information on branch status to the BPFL SourceControlHelpers
    
-   Added support for lazy Python initialization, when running with 'Engine.Python.IsEnabledByDefault' set to false.
    
    -   This allows tools that require Python to request that it be enabled and initialized on-demand at runtime, rather than require everyone have Python enabled in-case they want to use any tooling that uses Python.
        
    -   This can be triggered by calling IPythonScriptPlugin::ForceEnablePythonAtRuntime (from C++) or UPythonScriptLibrary::ForceEnablePythonAtRuntime (from BP).
        
    -   ForceEnablePythonAtRuntime will flag Python as being enabled, and can be called at any point. If called prior to Python being ready to initialize, it will just set a flag for it to use to enable itself when it's ready. If Python has already passed the point where it would have naturally initialized (past OnPostEngineInit) then it will immediately initialize Python. Similarly, if Python has passed the point where it would have naturally run its start-up scripts (the first Tick) then it will immediately run the start-up scripts.
        
    -   Running the Python commandlet (-run=PythonScript) or the Python executor (-ExecutePythonScript) will automatically call ForceEnablePythonAtRuntime as those tools always require Python to be enabled.
        
    -   A user may choose to enable Python temporarily via the new "Enable Python" menu entry in the Output Log, or permanently via the EnablePythonOverride property in UPythonScriptPluginUserSettings. EnablePythonOverride set to Enabled acts the same as passing -EnablePython on the command line, and set to Disabled acts the same as passing -DisablePython on the command line.
        
-   Exposed utils for querying whether and asset or object is cooked or has its editor-only data, or whether an asset is considered read-only in-memory
    
-   Level Editor: The GetExactCameraView/SetExactCameraView functions now allow the user to toggle bLockedCameraView
    
-   Added basic support for deprecated enum entries in PythonNote: This is currently limited to entities deprecated via ScriptName meta-data on the enum entry
    
-   Added new ToolkitBuilder UI layout to ScriptableTools. The older layout is still accessible through the ScriptableTools project settings bUseLegacyPalette option.
    
-   Scriptable Tools now supports command registration in the new ToolkitBuilder UI layout. This allows Scriptable Tools to now be individually keybound in Editor Preferences.
    
-   DiffString has been added to KismetStringLibrary/StringLibrary as an editor only method for diffing two strings from blueprints, python, or C++
    
-   Improvements to editor utility start-up and unload management
    
    -   Editor utilities may now opt-in to running on start-up via a new 'Run on Start-up' option on their Class Defaults.
        
    -   Like the existing StartupObjects config array method, this requires that the Blueprint implement a Run function/event, and the editor will wait until the main editor frame is available before running this function/event.
        
    -   The new 'Run on Start-up' option also requires that the initial asset registry scan has completed, so may run later than the StartupObjects config array method.
        
-   Added GetBlueprintForClass to find the Blueprint object that generated a class, if any
    
-   EditTextSourceString scripting improvements
    
    -   Added a variant of UKismetTextLibrary::EditTextSourceString that takes a property name, so that Python can also use it.
        
    -   Updated UKismetTextLibrary::Generic\_EditTextPropertySourceString to respect the read-only state of the property (via PropertyAccessUtil).Updated UKismetTextLibrary::Generic\_EditTextPropertySourceString to emit pre/post edit change events (via PropertyAccessUtil) when in the editor.
        
    -   Updated UKismetTextLibrary::Generic\_EditTextPropertySourceString to perform archetype value propagation (via PropertyAccessUtil) when in the editor.
        
-   Exposed unreal.collect\_garbage() to PythonUnlike unreal.SystemLibrary.collect\_garbage(), this runs immediately (rather than the next frame) and will handle being called from a commandlet correctly
    

**Bug Fix:**

-   Any blueprint that is based on an editor only class can now use the editor utility APIs
    
-   Run a Python GC prior to the UE GCThis helps to clean-up any reference cycles that Python might have that are keeping UObject instances alive
    
-   Fixed crash when an exception is encountered when evaluating the inputs of an Execute Python Script node
    
-   JsonObjectGraph::Stringify now properly encodes subobjects of objects in the transient package
    
-   \[Scripted Asset Actions\] Fix an issue where types derived from blueprints would not filter correctly in scripted asset actions for blueprint actions. This was caused by the modification to stop fully loading assets on right click. We were only walking the native class chain in the case the asset action was for blueprint types, since those are no longer loaded fully on a right click
    
    -   Cvar to enable: Editor.AssetActions.ExperimentalClassSupport 1
        
-   Fixed ScriptName deprecation failing to handle the real property/function name being used as the deprecated name. e.g.: A function called GetLODs in C++ having a ScriptName of "GetLods;GetLODs" would fail to export the "GetLODs" deprecated entry as it still resolved to an existing function, despite having a different name than "GetLods" when exposed to Python (GetLods -> get\_lods; GetLODs -> get\_lo\_ds).
    
-   The BlueprintEditorLibrary AddMemberVariableWithValue function now properly sets the provided default on the created member variable
    
-   Defer any -execcmds for Python that are requested before it's fully initialized
    
-   Tests based on editor only AFunctionalTest classes now run in an editor world, rather than a PIE world
    
-   Fixed auto-save failing to update the state of source controlled files when using an uncontrolled changelist
    
-   The object associated with an FSubobjectData should now be retrieved by GetAssociatedObject rather than GetObject, this new function will properly resolve the object using the root context, rather than potentially returning a template object
    
-   Don't call back into Python tick callbacks while user Python script is already running on the stack
    
-   Keep legacy Python type redirectors alive through a Garbage Collect
    
-   Cleaned up LODs -> lo\_ds in Python exposed APIThere is now a clean lods version, and the lo\_ds variant is deprecated
    
-   Add redirector for the PythonGeneratedClass CDO (from the old short name to the new unique name)
    
-   Fixed an issue where ScriptableInteractiveToolPropertySet functions were not readily available in contextual function searches.
    
-   Fixed a crash when editing Scriptable Tools Mode project settings after exiting the mode.
    
-   The delay node now works correctly when executed by editor functions
    
-   \[Revision Control\] ResavePackages: support providers that do not use readonly flag or checkouts
    
-   Fixed a sporadic crash that could occur if a ScriptableTool invoked SpawnActorFromClass during tool Setup.
    
-   Calling AssetTools functions should not crash anymore in headless.
    
-   Fixed a crash and emit an error in ScriptableTools that destroy gizmos during a GizmoTransformStateChange event.
    
-   Fixed a crash when calling dynamic delegates from Python
    
-   Fixed parsing issues in the Python stub file
    

**Deprecated:**

-   \[Python\] Update Python docs generator to include enterprise as part of engine
    

#### UI

**New****:**

-   UMGEditor: Restore selection of the root preview widget when refreshing the preview.
    
-   MVVM: Support fixing up references to renamed view models in unloaded blueprints
    
-   Notifications now have an optional copy to clipboard button. It has been made available on revision control submit notifications.
    
-   CommonUI: Don't broadcast input method changed events when EI rebuilds its input mappings and instead bind directly to \`ControlMappingsRebuiltDelegate\` in CommonActionWidget to update itself in case the keys changed.
    
-   UMGEditor: Clean up and expose Delete/Replace widget API to support operating on widget blueprints without opening the widget blueprint editor.
    
-   Menu Anchor Widget: Added an option to hide the menu background when using the application stack.
    
-   CommonUI: Prevent needlessly setting cursor position every frame when the viewport is the cursor target due to incorrect change target geometry logic
    
-   CommonUI: Add option for action bar to display actions without valid keys for the current input type
    
-   Removing Grey Background from Viewport layout icons and decreased icon size from UX feedback
    
-   CommonUI: Add ResetCalculatedActionDomainCache() for widgets to call when their Action Domain is changed at runtime
    
-   New setting for drawing the grid in the UMG editor and the node graph using antialiasing
    
-   Added GetClassFilter metadata tag for class and soft class properties which allows specifying a static UFunction with the signature bool (const UClass\*) to filter classes in the class picker.
    
-   Adds possibility for actionable message to force the widget's expansion
    
-   Allowed Slate attribute bindings to be explicitly initialized on assignment. When attributes are bound they are not automatically updated to the current value until later. This can cause issues with dynamically created widgets as they can have a frame where they use the default value before getting the value from the binding next frame. In the case of the color block this resulted in a white flash. However the existing code indicated that there's also a need for this behavior in certain cases, so to allow for both a new flag enum has been added so the widget can individually choose how to respond to attribute binding.
    
-   CommonUI: Add CVar to prevent Mouse Wheel and Gestures from updating the current input method
    
-   CommonUI: Add CommonUI.ShouldVirtualAcceptSimulateMouseButton CVar to modify if virtual accept events should convert to left mouse button events at runtime
    
-   CommonUI: Add UCommonUISettings::CommonButtonAcceptKeyHandling to configure how SCommonButton reacts to key events for FNavigationConfig's Accept action For existing projects, the default is to ignore those key events and to rely on the button's Triggering Input Action instead. New projects will use the "TriggerClick" option by default and it is recommended to update the FNavigationConfig appropriately instead of switching to "Ignore" mode.
    
-   \[SSpinBox\] Spin boxes now revert to the previous value on escape key press
    
-   Added CVar "Slate.AllowTooltipsWhileMouseDown" to restore old functionality where Slate tooltips would continue to display while the mouse button was down
    
-   Update CommonActionWidget to mark SetInputAction functions as virtual
    
-   \[Reimport Icon\] Adding a new reimport icon and applying it to icons that were using the import icon (when they should be using a reimport one)
    
-   CommonUI - TabListWidgetBase - Added a bool to control whether the tab navigation should wrap or not.
    
-   \[Widget Path\] When users are moving focus, they will no longer traverse through the children of disabled widgets
    
-   Common UI: - Add Throbber (Swidget) argument to SLoadGuard and setter for it. If unset, will use current ini defined throbber brush in an SImage - Add throbber brush property to CommonLazyImage, CommonLazyWidget & CommonLoadGuard - Use new brush property to feed the SWidget argument with an SImage when the brush is not set to draw as none
    
-   Added the option for row headers to indicate that they're busy sorting. A new option "Sorting" was added to SHeaderRow's EColumnSortMode list. When set to this option, the up/down arrows are replaced with a spinner to indicate that sorting is in progress. This was added because in some cases in the editor sorting can take a couple of seconds when the sorting is complex or done on a large list of rows. With this option it's possible to show a spinner for the duration of the sorting so users aren't left wondering why nothing is happening.
    
-   Update plugin browser to show disabled entries for plugins that require C++ when your project is blueprint only (rather than just hide them)
    
-   CommonNumericTextBlock allows to always show the sign of the value, i.e. "+1" and "-1"
    
-   MVVM: Improve handling of renamed fields
    
    -   Load dependent blueprints when renaming view models so they get fixed too
        
    -   Fixup conversion functions when renaming view models
        
    -   Fixup components of binding property paths when renaming fields
        
    -   Fix case where renaming a field in one blueprint could falsely rename properties in bindings in dependent blueprints Fixes asserts that can occur when view models are renamed.
        
    -   Fixup bindings in dependent blueprints when renaming view models
        
-   UMGEditor: Fix inconsistencies in IPropertyBindingExtension by passing the PropertyHandle to all functions
    
-   Changed SInputKeySelector to be able to assign multiple modifier keys in it
    
-   CommonUI - Back Action can now have Display Name overridden in the Activatable Widgets
    
-   UMG: Support fixing up references to renamed widgets and animations in unloaded blueprints
    
-   Removed FTickableGameObject from UCommonBoundActionBar. It now sets a ticker when bound actions are updated and when input mode changes (if ticker isn't already set).
    
-   CommonUI: Support registering inputs for multiple local players on a single widget
    
-   The text input widget at the base of the Output Log window now fills the available space.
    
-   Added a mechanism to UContentBrowserDataSubsystem to customize the logic used to hide empty folders (such as /Game/Collections) even when Show Empty Folders is enabled in the Content Browser.
    
-   FEditorViewportClient: allow focusing on objects smaller than 10cm. This change replaces the hardcoded 10.0 lower limit with a member variable that subclasses can modify. Default behavior is unchanged. FDataflowConstructionViewportClient: set the minimum object size to 0.1cm, since we could be dealing with coordinates in the 0-1 range.
    
-   FEditorViewportClient: make GetMinimumOrthoZoom virtual. FDataflowConstructionViewportClient: set a custom GetMinimumOrthoZoom, ignoring ULevelEditorViewportSettings::MinimumOrthographicZoom
    
-   Use the platform format when copying disk file paths to the clipboard.
    
-   Slate: FPointerEvent constructed with a Gesture is now considered a TouchEvent
    
-   UMG Extensions: Correction to UserWidget Extension Preconstruct to be called when the Extension is added after construction was already called.
    
-   Updated Widget Previews to respect the preview size specified in the UMG designer (Desired, Fill, etc.) and display the current preview size in the corner. Added a Widget Size override property to explicitly set the Preview Widget's size
    
-   UMG: Add option to List/Tile Views to decouple navigation from item selection
    
-   \[Progress Bars\] Remove toast notification functionality for progress bars since it is just duplicate information
    
-   SCustomDialog can now control the enabled state and tooltip of each button
    
-   CommonUI - ActivatableWidgetContainer - Added a bool to reset pool of widgets when releasing slate resources (usually when loading a new map).
    
-   Enhance debugging support of Action Domains for the CommonUI.DumpActivatableTree command
    
-   CommonUI - BoundActionButton - Actions requiring hold can now require it for button mouse presses as well.
    
-   The Reference Viewer now displays friendly plugin names.
    

**Bug Fix:**

-   \[Common UI\] Restore cursor visibility when exiting PIE while using a gamepad
    
-   UMGEditor: Improve the usability of the Widget Reflector at design time, widgets in the UMG Designer can now be picked by the widget reflector while in "Pick Painted Widgets" mode
    
-   Fixed log lines containing new lines overlapping when displayed in the texture editor.
    
-   Slate: Fix crash caused by SlateEditableTextLayout's HintTextStyle getting out of sync with its TextStyle
    
-   \[Common UI\] Fix the bClearFocusRestorationTargetOfDeactivatedWidgets setting from UCommonActivatableWidgetSwitcher has no effect
    
-   Slate: Menu Anchors now properly only set focus for the provided FocusUserIndex when using EPopupMethod::CreateNewWindow
    
-   Updated FMVVMListViewBaseExtensionCustomizationExtender to find the Entry Widget Class by property name instead of display name. This prevents an assert when the editor is set to a language other than English
    
-   Protect against check/crash during blueprint compile in MVVM system
    
-   CommonUI: Fix action domain root nodes not receiving focus/applying their input config if they are activated before painting
    
-   Perforce Provider: Guard access to the state caches for concurrent queries to files & changelists states. Fixes a crash when right clicking on the tree view menus in the content browser while the thumbnails are fetching their Perforce states.
    
-   CommonUI: Fix UCommonUIInputSettings::bLinkCursorToGamepadFocus not working
    
-   Fixed NaN when trying to draw blurred regions with Slate
    
-   CommonUI: Fix UCommonUIActionRouterBase::HandleSlateFocusChanging not considering leaf nodes of the active root node nor action domain nodes
    
-   Update CommonUI preprocessor to switch input methods when the mouse wheel is scrolled
    
-   Fixed a deadlock when a long running source control operation on a collection causes the slow task or source control progress dialog to appear.
    
-   Fixed pasting package paths into the asset property editor not working if the package was unloaded.
    
-   ComboBox Widgets: Fixed potential null access when widget becomes invalid as a result of OnSelectionChanged
    
-   Fixed offset when using a background blur widget within a retainer panel
    
-   Slate: fixed a bug with retainer widget where the hit test grid could no longer hit testable elements, resulting in incorrect input processing.
    
-   Fixed glyphs that may be displayed incorrectly with SDF activated.
    
-   Fixed ApplyLineHeightToBottomLine(false) being incorrectly applied to all lines during layout, rather than only the last line in the current view
    
-   CommonUI: Update CommonButtonBase to consistently focus the child SCommonButton
    
-   SLoadGuard: Fix OnLoadingStateChanged not getting copied in the Construct call
    
-   Apply widget scale to corner radius in SBackgroundBlur widget. This ensures the corners stay the same relative to other widgets being scaled.
    
-   Fix default view model resolvers to be created in the correct package so they save properly
    
-   CommonUI: Fix assert when using a CommonWidgetCarousel widget when 1 or 2 children with Global Invalidation enabled
    
    -   Slate GI doesn't allow widgets to exist in multiple slots
        
    -   When the CommonWidgetCarousel had fewer then 3 children, it would reuse children in the left and right slots
        
    -   Reused widgets are now replaced with \`SNullWidget::NullWidget\` in slots that will not be visible during transitions
        
    -   Also fixed not being able to accurately preview the selected widget due to transitions being active when selecting widgets in the designer
        
-   CommonUI: Fix crash caused by Input Actions with null Triggers
    
-   Fix crash when widget removes itself from the parent in OnPaint and reindex and invalidation are enabled. The cached value needs to be fetched again after an OnPaint. The proxy will become invalid at the end of the loop (and need to stay valid or everything else will break).
    
-   Fix warning when adding a view binding to a function
    
-   Slate Text Highlights: Replace OffsetX with an Offset Vector2D and set the Y offset based on the difference between the block's LocationOffset and the line's offset. This lets us properly align highlights on lines of text that contain multiple font sizes
    
-   CommonUI: Fix hitting a check in List View caused by entries still handling events after having been removed
    
-   CommonUI: Fix Common Action Widget not updating its icon when switching from showing an Enhanced Input to a Data Table input
    
-   Slate: Fix transform calculation in SFxWidget::OnPaint that was incorrectly using RenderScale as a translation rather than a scale that was causing a 1 px padding offset for carousel widgets
    
-   CommonUI: Fix FBindUIActionArgs::OverrideDisplayName / FUIActionBinding::ActionDisplayName not working for enhanced input actions
    
-   Minor editor fix for Common UI uncategorized widgets in widget blueprint palette
    
-   CommonUI: Fix action domain widgets overriding focus and input config when they're not the active widget
    
-   Fixed crash when closing the engine during the preinit phase.
    
-   Fix bad access to widget invalidation list.
    
-   Removing ensure in CommonActionWidget::UpdateActionWidget that could be hit when Common Input Subsystem is not ready as it can be updated even if it's not set.
    
-   Texture Editor: Fixed the Source Alpha Detect button overlapping the rest of the UI.
    
-   UMG: When rebuilding widgets, don't overwrite the player context on child widgets if they already have a valid player context
    
-   CommonUI: Fix issue where the focused widget would not get hovered by the virtual cursor when focus moved to the viewport and back to the original widget
    
-   MVVM: Fix up MemberParents in binding paths when a field in the path has changed type
    
-   Fixed various issues with Slate text runs that could cause unwanted spacing/alignment when using rich text blocks with multiple styles
    
-   Fixed empty folders showing up in the content browser path bread crumbs when Show Empty Folders is unchecked.
    
-   EnhancedInput: Fix validation error when saving widget blueprints with disconnected input action event nodes
    
-   Fix font assets not properly displaying their thumbnails
    
-   Updated ListView to properly send the OnEntryWidgetGenerated event without relying on a timer This resolves an issue with MVVM where ListView entries won't have their VM bound if no world timer is running (i.e. the game is paused)
    
-   Fix clipping of controls under RetainerBox when offset is non zero \[RN\] fix creator/ui
    
-   UMG: Fix not being able to use "Wrap With..." on the first widget in an inherited Named Slot
    
-   UMG: Slate - Added properly working absolute <-> local transform BP functions
    
-   UMG: SetAnimationCurrentTime now properly takes into account UnwarpedPosition
    
-   \[SDockTab\] SDockTab can no longer be closed when \`CanEverClose\` is set to false
    
-   UMGEditor: Fix not being able to save navigation settings on the root userwidget in widget blueprints
    
-   Fixed issue where CategoryDrivenContentBuilderBase did not update visibility on reinitialization.
    
-   Slate: fix various possible crashes and bugs when importing offline fonts.
    
-   Fixed the display name of merged folders in the Content Browser asset view being selected non-deterministically, causing it to appear differently than other areas of the Content Browser UI.
    

**Deprecated****:**

-   Add a define to conditionally add final to virtual functions for slate APIs transitioning to FVector2f from FVector2D
    

#### UX

**New:**

-   Allow to override Wireframe Material of Dynamicmesh
    
-   \[TEDSOutliner\] Implementing support for multiselect visibility, in parity with the old outliner
    
-   Add Audio section filter for actor and component detail panels
    
-   Allow SDlgPickPath to show the view options by default. This matches the behavior from SDlgPickAssetPath. Without this, it's impossible to pick a path from a plugin folder
    
-   Made the toolbar extension log verbose in render capture plugins
    
-   Improved Gameplay Tags UX:
    
    -   Added "Search For References (all children)" item to the context menu for individual tags. Triggers the Reference Viewer with the selected tag AND all its recursive children.
        
    -   Added Gameplay Tag Manager entry to the Editor "Tools" menu. Now you don't have to look for a tag variable editor widget to start this from. Also dockable.
        
-   Added asset name and package path as tie breakers to the Packages dialog column sorting.
    
-   Updated the Color Picker UI, featuring visual updates to the color sliders, color themes menu, color blocks, icons, hexadecimal fields, and a new Recents color theme.
    
-   Fixed ensure when trying to capture thumbnail on an unloaded asset : we now try load the package (like is done when clearing the thumbnail)
    
    -   Also changed label "Capture Thumbnail" into "Capture Thumbnail From Viewport", to make it explicit that this will not capture the asset scene's thumbnail, but rather, use the current viewport as its thumbnail (the tooltip was already explicit about it)
        
-   Also hide (per instance) Custom Data when there are too many instances in a static mesh component
    
-   Updated the source control Revert dialog to appear and function similar to the Checkout dialog.
    
    -   Added asset name and package path as tie breakers to the source control Submit dialog column sorting.
        
    -   Added support for sorting columns to the source control Conflict dialog. Show file paths in source control dialogs using the platform format.
        

**Bug Fix:**

-   Fixed SSourceControlCheckedOutDialog Asset Class column visibility being controlled by the ShowColumnAssetName argument rather than the ShowColumnAssetClass argument.
    
-   ProjectBrowser: Changed "Most Recently Used" sorting to descending instead of ascending so that recent projects get listed first.
    

### Foundation

**New:**

-   Allow specifying if a functional test is in a sublevel and in which persistent level is should be enabled.
    
-   Add support for reading/writing metadata into the PNG text header.
    
-   Streamable Manager error handling - Add an Error field to FStreamableHandle. - Add FStreamableDelegateWithHandle to more easily find and inspect handles when a load completes. - MakeShareable -> MakeShared - Remove unecessary dll imports/exports
    

**Bug Fix:**

-   Fix potential signed overflow UB around bitmask-generating shifts in a few places.
    

#### Build

**New:**

-   Add UBT option to enable warning for switches on enumerations that don't have a case for all enumerators. It is off by default, and can be enabled per-module or per-target. Add macros to disable and restore the previous warning behavior for specific code regions.
    
-   Added support of the analysis-paths flag in integration with PVS-Studio
    
-   Don't automatically add installed plugins as project dependencies
    
-   Support package names containing the 'build' substring when building AABs. Having build in the package name would cause Java files not to be deployed to AAB grandle directory resulting in failed builds. Update 'build' file path filtering to ignore java source root.
    
-   Add Clang FPass-Plugin support to UBT This adds the functionality for a module to specify any number of LLVM FPass-Plugin to be included in the clang compile arguments and run during the individual module's compilation.
    
-   Reduced compilation times of \*.ispc files by around 40%. It has been achieved by rebuilding the ispc compiler with the optimal settings and enabling Link Time Optimization.
    

**Bug Fix:**

-   Fixed crashes in the AutomationTool .NET incompatibility when launching external tools relying on .NET version other than the default one used by Unreal Engine. Now, AutomationTool clears DOTNET\_\* environment variables when launching tools from outside of the Unreal Engine directory.
    
-   Added UBT support for the Game Feature Plugin "Activate" flag in PluginReferenceDescriptors. Fixed issue where the Activate flag would be deleted from plugin descriptors when running some UAT programs
    

#### Compile Time Improvements

**New:**

-   Add WindowsPlatform.PreferredCompilers a list of compilers a target will use, allowing for falling back to a different compiler if not available
    
-   Add support for debugging optimized code with MSVC. Please see http://aka.ms/vcdd for more details
    
-   ICX 2025.1 and Microsoft Clang 19 HWPGO integrations
    

#### Core

**New:**

-   Update minimum MSVC to 14.38.33130 & minimum Visual Studio 2022 to 17.8
    
-   Add FQuat::GetShortestArcWith to simplify creating the rotation between two quaternions
    
-   Optimized actor range iterations in the editor
    
-   Add a default data-driven subobject instancing path that does not rely on 'Instanced' property flags on generated types. Allows for decoupling of compile-time 'Instanced' semantics to support non-native UE class types that do not statically bind references for subobject instancing. Note: This path is disabled by default; UClass subtypes can opt-in via override.
    
-   Added a way to override the EAllowShrinking defaults.
    
-   Updated FGuid::Parse and FGuid::ParseExact to accept a FStringView
    
-   SavePackage: Remove handling of deprecated UObject::PreSave, UObject::PreSaveRoot, and UObject::PostSaveRoot functions.
    
-   Added Unreal.natjmc for skipping over certain Core operations during debugging.
    
-   Added non-shipping tracking for ResetAsyncTrace Delegates
    
    -   The delegate dispatch step inside ResetAsyncTraces is now Timed, and if it's above a defined threshold, we dump some key info about those delegates to help diagnose rare performance spikes.
        
-   Refactored TArray to limit template instantiations.
    
-   Add an experimental thread sanitizer that can be run on the Windows platform.
    
-   Oodle updated to version 2.9.13
    
-   Optimized FMatrix float/double coercion
    
-   Optimized FTransform::ToMatrixInternal to avoid float coercion
    
-   \[UBT\] Added Project level scope support for BuildConfiguration.xml.
    
-   Made FMath::Min, FMath::Max, HashCombine and HashCombineFast variadic.
    
-   Added \[\[nodiscard\]\] to relevant container functions.
    
-   Reduced template instantiations in weak and SP lambda delegate bindings, as the type of the user object is unimportant in these cases.
    
-   CVars: Allow FAutoConsoleVariableRef to hold a FName directly This is useful in rendering code for cvars that ultimately get used as an FName such as for debug visualization modes. The cvar is a string cvar internally, but also keeps a FName representation available so that the string to name conversion cost only happens when setting the variable, not every time it is queried.
    
-   Added TCopyQualifiersFromTo\_T and TLosesQualifiersFromTo\_V.
    
-   Added Projection(), a helper companion/replacement for Invoke.
    
-   Change to FProperty::ImportSingleProperty which means we can process Enums in Quotes within a Struct when loading from a config. This approach means that we identify Enums within Structs (and Structs in Arrays) and take away the first quote before passing it to ImportEnumFromBuffer later on. This means that ImportEnumFromBuffer can assume that the enum is unquoted and will allow it to process bitwise enums within quotes the same way whether it came from a Struct or not. Additionally, this includes Unit Tests which prove that the parsing is well-behaved in various scenarios (including empty quotes or missing quotes). \[RN\] When loading config files, Structs now support Quoted Bitwise Enums of the form "EMyEnum::A | EMyEnum::B"
    
-   Added an RAII FPooledSyncEvent.
    
-   Added support for references and void in TTypeCompatibleBytes.
    
-   Added project based timeout settings which can be adjusted by either a console variable or through the default engine configuration.
    
-   Added operators to TStructView & TConstStructView to make them easier to use
    
-   Made the expression parsing code templated on character type and implemented TAnsiString::Format and TUtf8String::Format.
    
-   FPlatformString and FCString: Deprecate Strcpy and Strcat that take a DestLen, because some platforms are ignoring the DestLen and allowing buffer overflows.
    
    -   Add FPlatformString::Strncat to provide similar functionality (but following CRT's standard of taking SrcLen rather than DestSize).
        
    -   Deprecate FCString::Strncat because it has a different meaning than C++ strncat.
        
    -   Provide StrncatTruncateDest and StrncatTruncateSrc to replace it.
        
    -   Change FCString::Strncpy's MaxLen argument from int32 to SIZE\_T to match CRT strncpy.
        
    -   Change the bufferlength arguments passed into GetSystemErrorMessage from the incorrect sizeof(TCharBuffer) to the correct UE\_ARRAY\_COUNT(TCharBuffer) to avoid the possibility of overflowing the buffer due to passing in twice the character count of the buffer.
        
-   Remove manifest from compiled DLLs as it was causing a delay for each module loaded to query WinSxS with an out-of-process call. This saved about 10s of boot time for ~2300 dlls loaded at editor startup.
    
-   Zenloader can be enabled to read loose files when loading in non-editor configs by passing "-loosefileloading" on the commandline or specifying "s.LooseFileLoadingEnabled=true" in Engine.StreamingSettings INI. \`WITH\_EDITOR\` configs continue to load loose files by default.Note: loose files will override IOStore content if there is an overlap.
    
-   Added \[\[nodiscard\]\] to FSoftObjectPath where appropriate.
    
-   Added support for UTF-8 to FormatStringSan.
    
-   Exported explicit template specializations are no longer created for StaticClass and StaticStruct, a normal template implementation is used instead.
    
-   Exposed some extra DLC and validation options to ICookInfo
    
-   Removed TargetFramework override in "Tests" .csproj files
    
-   Utility functions and console commands that print UObject state information:
    
    -   PrintObjectsInOuter
        
    -   PrintObjectsWithName
        
    -   PrintObjectProperties
        
    -   PrintObjectArchetype
        
    -   PrintObjectIDO
        
    -   Utility functions and console commands that print UObject state information.
        
-   Introduce TStripedMap that wraps TMap and TMultiMap providing thread-safety guarantees and reduce contention when its striping feature is used.
    
-   Add LoadAsync wrappers to TSoftObjectPtr and TSoftClassPtr to better expose it as an alternative to LoadSynchronous
    
-   Zen streaming uses on-target cache to speedup consecutive runs
    
-   Added Algo::Contains and Algo::ContainsBy.
    
-   Add IsTaskEvent to FBaseGraphTask and fix it so Unlock and DispatchSubsequents are safe to call on either type. Also improved headers now that the old taskgraph frontend has been removed
    
-   Added PRAGMA\_DISABLE\_CPP20\_EXTENSION\_WARNINGS for allowing asm in constexpr blocks (supported in Clang, but not officially until C++20).
    
-   Update asio to 1.30.2
    
-   AssetRegistry:
    
    -   Remove deprecation handling of FAssetPackageData::PackageGuid and instead store the entire PackageSavedHash read from the PackageHeader.
        
    -   Change GetPackageSavedHash to be WITH\_EDITORONLY\_DATA to match the UPackage::GetSavedHash API. The PackageSavedHash will always be serialized when serializing FAssetPackageData, but the game will not store a copy of it and will write out zeroes if it ever serializes AssetPackageData.
        
-   Additional CrashReportClient customizations:
    
    -   Option for hiding the allow to be contacted text
        
    -   Option for customizing whether the user can send a crash without providing detailed information
        
-   Added a new define UE\_UOBJECT\_HASH\_USES\_ARRAYS that replaces FHashBucket in UObjectHash implementation with a one that uses arrays instead of sets. This reduced memory consumption by ~20%.Please note that this might reduce performance in some corner cases. This will be addressed in a future engine update.
    
-   Added an operation to rename properties within a PropertyBag. Naming through the PropertyBag API has also been restricted to match standard object naming as best as possible.
    
-   Remove lambdas from the implementation of ensure() as an optimization.
    
-   Change FTimeout to use FPlatformTime::Cycles64 internally instead of FTimespan, this can be significantly faster depending on the platform. Also added functions to access the platform time as double seconds in C++
    
-   Added UTF32CHAR\* constructors and appending to FString, FUtf8String and FAnsiString.
    
-   Rename TiimerHandle.cpp to TimerHandle.cpp
    
-   Add GetTypeHash for FBox so that it can be used in sets and maps.
    
-   Added extracting FQDN via getnameinfo to FSocketSubsystemBSD::GetAddressInfo if getaddrinfo only returns a hostname
    
-   Added TAdderRef and TAdderReserverRef, for type-erased adding to containers.
    
-   Added hostnames as the last resort for client to connect to zen server when zen streaming is used
    
-   Improved performance of strnstr significantly
    
-   Overloaded PluginUtils functions to support full paths to plugin descriptors for situations where you want to sidestep plugin naming conventions.
    
-   Add support for UBSan for msvc platforms
    
-   Allow loading config System{TYPE}.ini from FPlatformProcess::ApplicationSettingsDir()
    
-   Added a way to configure zen streaming target side cache size via defines
    
-   Cooker: Added command line arguments:
    
    -   \-DeviceProfile=\[device profile name\], to set an override device profile to use instead of the platform's default device profile
        
    -   \-CookCVarControl=\[0|1|2|3\], to control the value of the CVar Cook.CVarControl.
        
        -   0 uses default behavior
            
        -   1 redirects CVars that are accessed via GetPlatformValueVariable to the platform (or override) device profile
            
        -   2 additionally temporarily updates all ECVF\_Preview CVars to match the active device profile
            
        -   3 additionally temporarily updates all CVars to match the active device profile
            
-   \[UBT\] Automation scripts are now added to generated Visual Studio solutions by UnrealBuildTool project generation mode.
    
-   ScopedCSVStat with conditional invocation
    
-   Added cvar to control if non-nullable properties produce an error, a warning or a default object when failing to resolve an object reference. Default objects will not be created if the class is abstract.
    
-   \[StudioTelemetry\] Added support for plain-text ProjectID GUIDs from \*.ini.
    
-   PVS null checking improved by changes to CA\_ASSUME
    
-   Added UTF-8 overloads of LexFromString for numeric types.
    
-   Cooker: Implement budgeted time-based triggering of SoftGC instead of relying on the memory threshold approach, because the memory threshold approach is stymied by our lack of knowledge of how much memory is buffered inside the memory allocator.
    
-   \[UBT\] Added CppCompileWarnings system to control compiler arguments related to disabling/enabling warnings, and validating Plugin & Module settings.
    
-   Added a variable sized read-write spinlock class (TRWSpinLock) along with new templated scope for read-write locks in general
    
-   Adds new "PluginManager.LeakedAssetTrace.Severity.Editor" CVar allowing Editor builds to configure the severity of leaked asset reporting from GameFeaturePlugins. If not set, "PluginManager.LeakedAssetTrace.Severity.Editor" == "PluginManager.LeakedAssetTrace.Severity". "PluginManager.LeakedAssetTrace.Severity.Shipping" overrides "PluginManager.LeakedAssetTrace.Severity.Editor" as it does "PluginManager.LeakedAssetTrace.Severity" already
    
-   UnrealBuildTool: Support opt-in unity files for source code that isn't .cpp
    
-   Fixed TSet::EmplaceByHash returning an incorrect element ID
    
-   Add the option to use TDirectoryTree in PakFile for directory scans.
    
    -   This change improves directory scan perf when using for e.g. IFileManager::Get().FindFiles. Without the change, the path lookup involves doing a linear search through all directories in a pak.
        
    -   This change adds a directory tree index that mirrors the directory index for faster path lookups. Overall perf gains depend on the size of the project/paks and eventually the directory index.
        
    -   For FN we see the total inclusive time drop from ~13s for 117k lookups to ~350ms for the same so around a 97% cost reduction. These gains were measured on last gen platforms and can vary per platform. The mirrored directory tree in FN has a memory overhead of 2MB.
        
    -   The use of DirectoryTree is disabled by default and can be opted into by adding \`GlobalDefinitions.Add("ENABLE\_PAKFILE\_USE\_DIRECTORY\_TREE=1")\` to project configurations.
        
-   Added TMap::Remove(Id), TMap::FindId(Key) and TMap::FindIdByHash(Hash, Key).
    
-   Added \[\[nodiscard\]\] to relevant algorithms.
    
-   Add static NumComponents variable and IsValidIndex function to TVector2, TVector3, and TVector4. Clean up operator\[\] and Component functions on all vector type
    
-   Added support for 64-bit radix sorting.
    
-   Implemented virtualized utoc files using memory mapped IO on supported platforms. Allows platform OS to unload memory pages occupied for that files and only keep what's actively used. Can be disabled with CVar "IoStore.AllowMemoryMappedUtoc=false".
    
-   Add option to run KMeans' distance-to-cluster loop in parallel.
    
-   Add a local queue in the scheduler for the game thread to improve its task queuing efficiency
    
-   Define object versions in such a way that if they get merged or cherrypicked out of order there is a static assert.
    
-   Added ANSI and UTF-8 overloads to FText::FromString and FText::AsCultureInvariant.
    
-   PackageName: improve SplitPackageName functions.
    
    -   Add flags to specify whether slashes are kept.
        
    -   Add SplitPackageName that does the same splitting done by SplitLongPackageName but does not test for IsValidPath.
        
    -   Fix IsValidPath to return true for /Memory/ packages, to match the behavior of other functions such as MountPointExists.
        
-   Added an FWideString alias and TIsTString trait for testing if a type is a UE string class.
    
-   Expanded natviz support for TVariant from 8 to 12 template arguments.
    
-   Split the LoadFromCompactBinary overloads for FString into FWideString and FUtf8String overloads.
    
-   Add System.Text.Json reference so module rules can read JSON files
    
-   Added FUtf8String support for FName.
    
-   Added \[\[nodiscard\]\] to TOptional.
    
-   Decouple FProperty->JsonValue conversion from instanced property flags to support exporting object properties to nested JSON object values on types w/ dynamic reference values.
    
-   Annotated TVariant with \[\[nodiscard\]\] and UE\_LIFETIMEBOUND.
    
-   IncrementalCook: Change the API of CookPackageSplitter to take a single FPopulateContext& argument instead of multiple arguments, so that for future API changes we can add on inputs and outputs without needing to write the difficult boilerplate required for deprecation of a virtual function.
    
-   Update TStaticArray to be constexpr along with Swap and Exchange. Also added some basic compile time tests for TStaticArray. \[RN\] Update TStaticArray to be constexpr along with Swap and Exchange.
    
-   FBox ctor from FSphere - initialize box to tightest enclosing box around a sphere.
    
-   FileHelper: Add LoadFileInBlocks for TryHashFile and other similar performant reading of files.
    
-   Missing log format %s or arguments
    
-   Python wrapper generation are now run in parallel by default
    
-   Add template versions for some of the 2d vector math to support FVector2d -> 2f updates
    
-   Added UE\_NODEBUG across TArray functions which are simple getters, forwarding functions, or metaprogramming implementation details.
    
-   WorldPartition - GetStreamingPerformance now reports streaming performance also for non blocking cells/sources.
    
    -   Poor streaming performance caused by blocking cells/sources take preference over poor streaming performance from non blocking cells/sources.
        
    -   The thresholds for reporting streaming performance from non-blocking sources can be configured via "wp.Runtime.SlowStreamingRatio" and "wp.Runtime.SlowStreamingWarningFactor".
        
    -   GetStreamingPerformance also reports an additional enum for streaming performance ("Immediate") that triggers when sources are within unloaded cell content bounds.
        
-   SourceLocationUtils: Add adapter-based API for source location formatting.
    
-   Added a CVar: \`LevelStreaming.LevelStreamingPriorityBias\` that can be used to offset level streaming LoadPackageAsync request priorities (added to the levels calculated StreamingPriority).
    
-   Stomp malloc is now lock-less for improved scalability when active
    
-   Added zen server plugin support to zen launcher
    
-   Updated zenserver transport-sdk to v5.6.6
    
-   Add Async.ParallelFor.DisableOversubscription (defaults to false) cvar which specifies if parallel for requests can spawn additional threads when waiting for spawned tasks to finish
    
-   Added a cvar for managing how GenericPlatformMallocCrash handles allocation requests on non-crashing threads, allowing them to permanently suspend on allocs/frees, suspend on allocs and skip frees, or process as normal. New default is to suspend on allocation and skip frees to allow threads to tear down and avoid deadlocking during crash processing on some platforms.
    
-   DLC Packaging: Fixed DLCName.upluginmanifest missing from output when packaging DLCs The generated output folder from a DLC package can now be copied into a packaged game and the DLC will be loaded through the default plugin discovery and loading process.
    
-   Add TInstancedStruct::NetSerialize function
    
-   Added a new function GetRequestedRemoveContentOnNextInit to InstallBundleManager to return the list of bundle names are currently pending removal on next init
    
-   Changed FPlatformMallocCrash::IsActive to a static function instead of requiring getting an instance, to allow it to be safely called during static/TLS initialization.
    
-   Fixed loading localized content when running the editor with -game. Previously localized imports would not load properly when using zen loader.
    

**Bug Fix:**

-   Push array inner property to current archiver state when serializing "replacement" array item value overrides on load.
    
-   AssetRegistryExportCommandlet: Fixed possible SQL syntax errors with the generated output when the column/tag names are also SQL keywords.
    
-   Removed some implicit dependencies on instanced property flags during reference property value iteration.
    
-   Redirect TPropertyValueIterator for FObjectPropertyBase types to the RefLink chain instead of visiting all linked properties.
    
-   Fixed FUtfStringView and TUtf8StringBuilder .natvis.
    
-   \[FastBuild\] Fixed an issue where FastBuild is issuing duplicate local build actions.
    
-   Correctly handle struct redirection when importing an InstancedStruct from text
    
-   When loading assets in the editor we now fall back to tagged serialization if an object has changed to an unrelated type, rather than losing its data completely
    
-   Console: Fixed for a visual issue where the last line of the scrollback buffer was not being displayed and the previous to last line could overlap with the input field.
    
-   Forwarded missing flags to inner UPropertyToJsonValue exporting functions.
    
-   Removed a negative size check from TArray's serialization path which is handled anyway.
    
-   Fixed algorithms to take either an rvalue range, so views can be passed as temporaries, or const lvalue refs if the range isn't modified to produce fewer template instantiations.
    
-   ImageWrapper: Made sure the CompressedBuffer for LibJPG has a minimum size so compression doesn't fail when compressed size > sourcesize
    
-   Cache/apply cooked metadata for inner fields on container/optional property types.
    
-   Explicitly disabled GetTypeHash and comparison operators for TSet and TMap.
    
-   Prevented calling Swap on non-copyable types.
    
-   Fixed object properties using MustImplement to now use ObjectMustImplement metadata, as MustImplement is only for class properties.
    
-   Fix leak in UE::Tasks::Any when using it with a collection that has a single item
    
-   Removed assert when using escapes (\`) or argument modifiers (|) in localized structured logs since they actually format correctly in UE. It's only in external tools like Horde that they are not ATM but support can be added later.
    
-   Bug Fix: Fixed an issue where IsChildOf with ustructs whose hierarchy is altered at runtime, didn't work properly with UE Programs that compiled against Editor code.
    
-   Fix use-after-free in UE::Tasks::Wait along with a rare but severe issue where the function would exit before all tasks were finished
    
-   Fix crash when calling TFieldPath::ToString after a field is invalidated without a subsequent call to ResolveField
    
-   Fix TDeque not retaining capacity when copying/moving with an inline allocator.
    
-   Correctly disable delta serialization for InstancedStruct by passing value as defaults, not nullptr
    
-   Fix missing support in the loader for localized packages when running editor with -game
    
-   Treating missing zen streaming chunks as warnings instead of errors
    
-   Editor-time created packages get marked as EndLoaded once saved, similarly to packages loaded from disk.
    
-   Struct Deserializers now grow containers to fit incoming entries rather than skipping entries out of range entirely.
    
-   Removed the need for FDecimalNumberSigningStrings::GetEmptyString() which is more optimal and avoids some bad codegen in the AutoRTFM compiler.
    
-   Fixed const overload of TFutureState::GetResult().
    
-   Fix for FName::IsValidXName not using InErrorCtx in one case when producing OutReason.
    
-   Made TIsCharEncodingCompatibleWith accept non-char types but return false, which makes it easier to use in SFINAE contexts.
    
-   Fixed TSparseArray::Reserve() to not use growth semantics for the storage of elements.
    
-   Fixed a thread-safety issue on init inside LLM
    
-   Fixed .natvis of FNames under Clang.
    
-   Added checks for too few specifiers in FormatStringSan.
    
-   Fix LoadAssetAsync (and the soft object wrappers) to correctly handle UObjectRedirector, it will now return the redirected asset like the sync load functions
    
-   Fixed Cbor for FUtf8StrProperty and FAnsiStrProperty.
    
-   Change FFieldPath to properly handle blueprint class redirectors when resolving structs by name
    
-   Fix crash in crash reporting during certain scenarios in late stages of shutdown.
    
-   Fixed possibly shutdown crashes by unregistering FWindowsApplication::ShutDownAfterError against FCoreDelegates::OnShutdownAfterError in its destructor.
    
-   \[Fastbuild\] Fastbuild executor fails when there are not multiple installations.
    
-   No longer skip EditorOnly properties from config files when not in Editor so standalone mode (-game) will be consistent with Editor and PIE.
    
-   Properly handled non-uniform scale in FTransform::GetRelativeTransformReverse
    
-   Fix to ensure that new container items created in the Property Editor get scoped to the correct instance when IDO features are enabled.
    
-   Fix potential memory ordering issue between tasks inside the same pipe
    
-   Address some clang warnings
    
-   Support for InstancedStruct in FPropertyValueIterator.
    
-   Add support for an unlimited number of cores in FWindowsPlatformProcess::GetPerFrameProcessorUsage. The previous code was hardcoded to support a maximum of 128 cores and would assert if more cores were detected.
    
-   Fix compilation issues with derived type uses of StructView
    
-   Fixed unnecessary resolving when assigning FSoftObjectPtr with a TObjectPtr.
    
-   Fixed forwarding of FArchiveState::ArThisRequiresLocalizationGather to proxies.
    
-   Fixed JsonObjectConverter not loading BP classes when deserializing JSON.
    
-   Fixed FEnumProperty::ImportText to skip leading whitespace and some questionable null handling.
    
-   Fixed errors in TRingBuffer when using an allocator with NeedsElementType == false.
    
-   Fix possible race on platforms with weak memory ordering when using the result of an AddSubsequent call to decide if it is safe to start using the memory modified by the task
    
-   Use a faster VirtualAlloc2 approach in editor allocator (mimalloc) when alignment is required to avoid potential random OOM that could happen with the older method
    
-   Fixed assert in TFixedAllocator::CalculateSlackGrow to guard against overflow.
    
-   \[UBT\] Fixed symbol redefinition issue under Target.bWarnAboutMonolithicHeadersIncluded context.
    
-   Fixed an assert during save when invalid references are found.
    
-   Added constraints to TVariant's constructor and Emplace function to ensure constructibility.
    
-   Improved error messages for failure to construct a default object for an unfulfilled non-nullable property.
    
-   Fixed the TSubclassOf overloads of Casts to be const correct.
    
-   Fixed TIsImplicitlyConstructible false positive for aggregates.
    
-   Refactored TFuture, fixing TFuture::Then() to take a continuation without a parameter rather than an int.
    
-   Fixed validations for Class and SoftClass properties in FPropertyBag. Also added typed validated version of SetSoftObjectPath when an object pointer is provided.
    
-   Force the condition in CA\_ASSUME (and therefore check macros) to be referenced, so that users don't need to mark their otherwise-unused variables with \[\[maybe\_unused\]\].
    
-   Fixed TCppStructOps::Destruct by avoiding an unnecessary virtual dispatch, which also fixes a warning when calling a non-virtual destructor on a struct with virtual functions. (-Wdelete-non-abstract-non-virtual-dtor)
    
-   Fix performance regression for the loader at runtime that might check for file existence on disk even for packaged builds
    
-   Fix potential use-after-free when destroying an FPipe just after a call to WaitUntilEmpty Fix potential race between ClearTask and WaitUntilEmpty in FPipe because of missing barriers on TaskCount
    
-   Fix EventCount WaitFor and WaitUntil that would return a wrong value to the caller when the value changed before actually waiting
    
-   Fixed an issue where AutomationTool.reference file was placed in the project Intermediates, instead of engine scoped Intermediates folder.
    
-   Added missing call to the destructor of the wrapped struct in FSharedStruct.
    
-   Fix case where the loader was not properly loading a package if that UPackage was created outside the loader
    
-   Define the same UnrealMath aliases for NEON as we do for SSE/FPU.
    
-   AVX/AVX512 CPU detection fixes: only allow AVX/F16C/AVX512 if OS has context-save support.
    
-   Use unsigned constants to avoid signed overflow UB in a few functions.
    
-   Added container property override support for instanced subobjects when experimental override serialization logic is not in use and explicit instanced property flags are not present.
    
-   Fixed TOptional::operator== where it would compare objects with an intrusive unset state. This would cause incorrect results in cases like TOptional() == TOptional(TEXT("")).
    
-   Add support for linker load external read dependencies in ZenLoader
    
-   Fixed a thread-safety issue in the scheduler that could happen during a restart worker call
    
-   Fix potential deadlock in the loader when recursive loads are involved
    
-   Fix invalidated GameUserSettings not getting deleted
    
-   Fixed garbled TMatrix comment, adding a clearer explanation of how matrix-matrix multiplication applies
    
-   Fixed many incorrect printf format specifiers.
    
-   Added support for %hs not being supported by vsnprintf.
    
-   Moved AtomicQueue module dependency from private dependency list to public dependency list, so that modules that tried to use FTaskConcurrencyLimiter would not have to manually add AtomicQueue as a dependency to allow compiling.
    
-   Update UObject::SaveConfig() to respect the "DeprecatedProperty" property metadata key and skip saving deprecated properties to disk. This allows UpdateSinglePropertyInConfigFile() to be properly used to delete deprecated properties from .ini files.
    
-   Allow users to change the derived type on default value instantiations used to initialize a base type reference member in saved instance data when using override serialization.
    

**Deprecated**:

-   Deleted unused TCancellablePromise.
    
-   Removed deprecated CHAR8 typedef.
    
-   Deleted deprecated TIsVoidType, TIsSame and TRemoveConst traits.
    
-   Removed deprecated functionality from GenericPlatformString.h.
    
-   Remove DirectXMath support for UnrealVectorMath. It's been inoperable since 5.0.
    
-   Replaced some deprecations with static asserts in ContainerAllocationPolicies.
    
-   Removed deprecated functionality from FSoftObjectPath and related calls.
    
-   Removed deprecated functions from FStructView.
    
-   Converted FSoftObjectPath::SubPathString to FUtf8String and added new accessors, deprecating the relevant FString-taking functions.
    
-   Deprecated bool AllowShrinking parameters.
    
-   Removed IPlugin::SetVersePath, IPlugin::SetVerseVersion and IPlugin::SetEnableSceneGraph setters. Users should call IPlugin::UpdateDescriptor instead so an event gets raised when the plugin descriptor changes.
    
-   Remove bogus char logging, which hasn't worked for 11 years.
    
-   Removed StaticFindObject overload for VersePaths.
    
-   Deprecated FPlatformSplash::SetSplashText overload that takes a const TCHAR\* - Use FText instead
    

#### Dev Tools

**New:**

-   Added option to UGS to toggle whether to use the perforce native dll.
    
-   CSVTools: Added support for adding custom csvColor overrides when using Csv2SvgUse -csvColors : list of hex colors. Applied in order to corresponding csv files when used in combination with a list of csv files or csvDir.
    
-   Add support for toolbar button groups in UToolMenus.
    
-   Added ZenImportSnapshot build graph task to allow import of cooked data snapshots produced by the ZenExportSnapshot build graph task.
    
-   Improve where optional attributes can appear in enum, class, and struct definitions.
    
-   Added async RPC functionality to Gauntlet
    
-   Added verification that interfaces have matching native interface base classes
    
-   Added -cookincremental parameter to BuildCookRun which will perform an incremental cook using the most recently cooked data as a baseline.
    
-   Added -snapshot parameter to BuildCookRun, which will retrieve the most recent snapshot published to Jupiter and cook incrementally on top of the fetched data.
    

**Bug Fix:**

-   Fixed a bug where an error would occur when moving UGS between monitors with different DPIs. Also fixed a bug where we would not immediately adjust the UI based on the new monitor DPI.
    
-   Fixed a bug where if no project tabs have been created in UGS an exception is thrown on mouse move.
    
-   Clear the currently synced CL when switching the stream a workspace targets. This correctly updates the state of UGS to recognise the synced CL has been invalidated and also fixes a bug with Fast Sync where it misses files in the sync.
    
-   Fixed issues with object id generation from C# Time part was mixing up units. The serial part was not initializing from random value.
    
-   Add throw if Refresh token was not returned in response.
    
-   Added support for null values in property comparison in DiffTool to handle add/remove of empty elements in arrays in the diff'ed assets while the tool active
    

#### Horde

**New:**

-   HordeAgent on Windows now defaults to installing the Windows Service with recovery options to restart the service on abnormal shutdowns.
    
-   Improvements to downtime schedule configuration:
    
    -   Add a Duration property that can be used instead of FinishTime.
        
    -   Add a TimeZone property that can be used instead of an explicit offset in the StartTime and FinishTime values.
        
    -   Support abbreviation values for StartTime and FinishTime as an alternative to ISO 8601, for example "Sun Dec 1, 2024, 3AM".
        
-   HashiCorp Vault can be used to store secrets.
    
-   Documentation for Scheduled Downtime
    
-   PostLoad method for GlobalConfig and IPluginConfig is now async
    
-   Documentation to create an external secret provider.
    

**Bug Fix:**

-   Added an additional sanitise case for the PerforceMetadataLogger when trying to get file annotations.
    
-   Fixed a bug where the same error/warning message using different slash directions would not match with an existing issue when handled by the hashed issue handler. We now standardise the slash direction before hashing to give a consistent result.
    
-   LogicalCores property uses CpuCount and CpuMultiplier from AgentSettings Limit the number of logical processors to CpuCount or the number of logical processors reported by the OS, whichever is the smallestScale the number of logical processors by CpuMultiplierThe variable UE\_HORDE\_CPU\_COUNT set to the value of CpuCount, when CpuCount is set
    
-   Fixed an issue where CIDR blocks were not performing inclusive checks.
    
-   Do not run matchers on partial json log line entries. This prevents us from trying to match unreliable log lines which were only partially written out e.g. due to the process crashing mid output.
    
-   Fixed a bug where issues would have their FixCommitId set to 0 rather than cleared after re-assignment to a new owner.
    

#### Insights

**New:**

-   Adds a data stream type for Trace analysis which allows a runtime to connect directly to the analysis session, bypassing UnrealTraceServer. The session is analyzed directly in memory and not stored on disk. The direct socket connection is using a different port than the standard networked trace connection, to avoid collisions with UTS. It is only available for local connections and in the same process.
    
-   Added "ConsoleCmd" CPU scoped trace event for console input processing (includes the console command execution). The CPU timer has the actual command string as metadata.
    
-   Improved the debug stats/counters for TraceLog:
    
    -   Added defines in TraceAuxiliary.cpp to easily enable/disable code for STAT, TRACE, LLM and/or CSV stats/counters.
        
    -   Added additional debug counters/stats:
        
        -   "Cache Unused"
            
        -   "Emitted not Traced"
            
        -   "Memory Error" (total - block pool - fixed - shared - cache).
            
    -   Added also trace counters API stats and made it default (instead of STAT counters).
        
    -   Added block pool, fixed buffers, shared buffers, emitted and traced stats also to the output of "trace.status" console command.
        
    -   Added initial zero values to all stats/counters (improves graph display in Insights for all the stats).
        
    -   Simplified code re registering EndFrame callbacks.
        
    -   Added support for registering a callback to be called each time TraceLog updates: added OnUpdateFunc in UE::Trace::FInitializeDesc + added UE::Trace::SetUpdateCallback(func).
        
    -   The new trace update callback is now used to emit stats/counters also during engine initialization. Once the engine finishes the initialization, the stats counters will be emitted only once per frame (by resetting the update callback and further emitting stats from end frame updates).
        
-   Added utility function to find out if a trace session has a certain channel
    
-   CpuProfilerTrace:
    
    -   Added support for FName variants of CpuProfilerTrace macros:
        
        -   for TRACE\_CPUPROFILER\_EVENT\_SCOPE\_STR (when the provided event name does not change)
            
        -   for TRACE\_CPUPROFILER\_EVENT\_SCOPE\_TEXT (when the provided event name is dynamic).
            
    -   FEventScope and FDynamicEventScope can also be initialized now with an FName.CpuProfilerTrace:
        
        -   Added variations for \_STR macros (\_STR\_ON\_CHANNEL\_CONDITIONAL vs. \_ON\_CHANNEL\_STR\_CONDITIONAL vs \_ON\_CHANNEL\_CONDITIONAL\_STR).
            
-   Exposed a new TraceServices::IStringStore public interface. The main string store can be accessed now from IAnalysisSession (using GetStringStore()).The AnalyssiSession's string store now also supports Find() in addition to Store().
    
-   MemoryTrace: Added MemoryTrace\_UpdateAlloc API; can be used to update the context (tag and metadata) for an allocation.
    
-   Add a hard size limit on TraceLogs usage of block pool. Once the limit is hit and no free buffers are available, tracing threads will start to block until the worker thread has had time to write out data and give back buffers to the pool.
    
-   Add ability to show callstacks for bookmarks in UnrealInsights. Enable \`callstack,module,bookmark\` channels to gather this information from the tracing target.
    
-   Added CPU scopes (TRACE\_CPUPROFILER\_EVENT\_SCOPE) to FTraceAuxiliary API.
    
-   Add option to emit Trace scoped from TraceLog itself. Enable by passing \`-tracescopes\` on the commandline.
    
-   Add optional profiler hooks in TraceLog, and instrument common worker thread functions.
    
-   Stats: Support flags in lightweight stats
    
    -   This re-uses existing declaration macros (that were previously only utilized when STATS is 1) to define lightweight structs containing information about the stat such as the flags and group.
        
    -   This allows us to do things like properly filter out verbose stats when profiling in the Test config (where STATS is 0).
        
-   Added tracing for all LLM tag sets (assets and asset classes).
    
-   CounterTrace: Added more options to set value for a trace counter:
    
    -   TRACE\_COUNTER\_SET\_IF\_DIFFERENT(CounterName, Value)
        
    -   TRACE\_COUNTER\_ADD\_IF\_NOT\_ZERO(CounterName, Value)
        
    -   TRACE\_COUNTER\_SUBTRACT\_IF\_NOT\_ZERO(CounterName, Value)
        
    -   TRACE\_COUNTER\_SET\_ALWAYS(CounterName, Value)
        
    -   TRACE\_COUNTER\_ADD\_ALWAYS(CounterName, Value)
        
    -   TRACE\_COUNTER\_SUBTRACT\_ALWAYS(CounterName, Value)
        
    -   These can be used no matter how counter is created ("checked" or "unchecked").
        
-   MemoryTrace: Added support for UE\_MEMSCOPE\_PTR with a video memory (or other root heap) pointer; i.e. UE\_MEMSCOPE\_PTR(InPtr, InRootHeap).
    
-   Allow platforms to filter modules included in callstack tracing.
    
-   Timing Regions now support an optional second parameter to specify a category (Regions macros and \`FMiscTrace::OutputBeginRegion\`). This allows filtering and grouping in the Insights Frontend.
    
-   CsvProfiler - Report explicit event wait names as trace scopes.
    

**Bug Fix:**

-   Fixed timing regions emitted from SlowTask to use unique ids. Matching by name was not reliable when multiple slow tasks with the same name are active at the same time.
    
-   Fixed HighResShot not working when trace is disabled.
    
-   Fixed consistency regarding usage of the Metadata trace channel (for AssetMetadata and IoStore).
    
-   MemoryTrace: Fixed memory tracing to enable tracing of tags and mem scope with "memalloc" channel (and not with "memtag" channel which is used to enable tracing from LLM).
    
-   Fixed parameters to UE\_TRACE\_METADATA\_SCOPE macro when UE\_TRACE\_METADATA\_ENABLED is 0.
    
-   Remove FName block allocations and TextureManager construction from contributing to the MemQuery/Memtrace asset memory cost readings, increases the precision of per-asset memory consumption reports.
    
-   Fix trace.file when launching from editor to console.
    
-   Fix the Open Live Session on Trace Start functionality in the trace status bar widget.
    
-   Fixed crash in RenderGraphInsights plugin. Added support for late connect (i.e. enabling late the RDGTrace channel).
    
-   Fixed max number of callstack frames traced to be 255 (instead of 256; some platforms still limit this to max 64 frames).
    
    -   Added UE\_CALLSTACK\_TRACE\_MAX\_FRAMES to override this if necessary.
        
    -   Memory Insights analysis would already limit this to max 255 frames (length of callstack is stored as an uint8).
        
-   Fixed issues re-tracing of the "Asset Registry Scan" timing region (begin events being traced multiple times without a corresponding end event).
    
-   Trace: Fixed "-tracescopes" resulting in corrupt trace if scope functions emits sync trace events.
    
-   Trace: Fixed "trace.status" console command displaying incorrect value for "Emitted - Traced" statistic.Trace: Fixed TraceLog messages to not duplicate the message type into the log message.
    
-   Launch UnrealTraceServer with job breakout only when allowed. On Windows UTS is sometimes launched from a process that runs in a job that does not allow breakaway.
    

**Deprecated:**

-   Marked the Profiler\* modules as deprecated. The old Profiler has actually been deprecated since UE 5.0, superseded by Trace/UnrealInsights.
    
-   Deprecate TraceDataFilters plugin because the functionality has been moved to the Trace Control Widget from Session Frontend and the Live Trace Control Widget from Unreal Insights.
    

#### Unreal Build Accelerator

**New:**

-   This change adds a couple of minor improvements to the UBA visualizer:
    
    -   Shows the world time in addition to time offset from session start on mouseover of the timeline view.
        
    -   Adds a new optional graph showing active process count over time across all active machines (hovering over the graph shows the number of active processes at the selected time).
        

### Framework

**New:**

-   Chooser Tables: Add support for gameplay tag query columns
    

#### AI

**New:**

-   Synchronize namespace reference in comments in CrowdManager.h to namespace found in CrowdManager.cpp
    
-   Activate PathFollowingComponent ticking only when necessary
    
-   Context ambiguous AIMoveTo strafe fix
    
-   Improve K2\_AIMoveTo Tooltip
    
-   NNERuntimeORT upgrade to ONNX Runtime 1.20 and upgraded DirectML to version 1.15.2.
    
-   Learning Agents: Fix shared memory on Mac by supporting guid short format
    
-   Added Auto-Scroll button to visual logger
    
-   Learning Agents: Implement multi-socket training
    

**Bug Fix:**

-   Added cleanup for gameplay tasks owned by the AIController when handling OnUnPossess.
    

#### AI Behavior Trees

**New:**

-   AAIController::UseBlackboard - Fix to correctly return the result of trying to initialize the Blackboard.
    

**Bug Fix:**

-   ApplySearchUpdatesImpl now applies the active instance index stored in pending update to make sure methods calls use the right instance (i.e., decorators will get memory from the right buffer)
    
-   Fixed BTDecorator\_ForceSuccess when used used on aborted RunBehavior nodes
    

#### AI Debugging

**New:**

-   Visual logger improvements in order to better handle high item number scenarios:
    
    -   Added frustum culling for all types of rendered debug items, instead of just 2 of them
        
    -   Added FarClippingDistance to visual logger tool, in order to set a smaller far clipping distance only for the visual log items
        
    -   Added a CVar r.DebugRender.AllowFrustumCulling, to eventually disable frustum culling on debug render items
        
    -   Added a CVar r.DebugRender.OverrideFarClippingPlane, to override the far clipping distance of all debug renders made by a FDebugRenderSceneProxy
        
    -   Circles are now handled as a whole instead of a list of lines. This accelerates frustum culling since we perform it on the circle rather than per-line
        
-   Added log owner display name to visual log entries.
    
    -   This avoids having to rely on "Use Unique Log Names" in order not to miss some log events that might occur on different objects that are names identically (e.g. 2 components from different actors that are default-named, like "PrimitiveComponent").
        
    -   The log entry name is now based on the UObject's fully-qualified name, which avoids misregistering events from 2 different objects onto the same track.
        
    -   The display name is what we use in the visual logger window, so user-wise, this is unchanged. The timeline track's tooltip now displays the fully-qualified name.
        
-   \[Visual Logger\] Added support for Coordinate System entries for Visual Logger
    
-   \[Mass Navigation\] Add optional display of mass navmesh short path in the gameplay debugger tool.
    
-   \[Visual Logger\] Added coordinate system macro defines to the section for !ENABLE\_VISUAL\_LOG to fix compilation failure when cooking non-desktop platforms.
    
-   \[Mass Gameplay Debug Tool\] Added keybindings to toggle lookat and entity descriptions, with the addition of small updates to the entity debug display.
    
-   Improved filtering for row items and tooltips in Visual Logger
    
    -   Replaced MatchCategoryFilters by faster ShouldDisplayCategory base on FName comparison
        
    -   Changed selected entry color to reduce confusion with the color used when warnings are present
        
    -   Error and warning colored boxes are now slightly larger if they are the selected entry to preserve that information
        
    -   Filtered rows are now preserved when a category filter level is modified
        
    -   Tooltips now reflect the category filters
        
-   VisualLoggerKismetLibrary functions are now BlueprintThreadSafe. For message logging, FMessageLog is used only when functions are called on the game thread, otherwise FMsg is used for thread safety
    
-   \[Mass Navigation Debug\] Move UE::MassNavigation::Debug utils to its own file.
    
-   GameplayDebugger: Which categories are enabled and disabled persist across PIE/editor/game sessions by saving them to EditorPerProjectUserSettings.ini.
    

**Bug Fix:**

-   Threading fixes and improvements to VisualLogger added MT access detector for the list of maps of object entriesmade EditorBaseTimeStamp thread safeSVisualLogger now listens to FWorldDelegates::OnPostWorldInitialization instead ofFEditorDelegates::PostPIEStarted so EditorBaseTimeStamp can be reset properly before other threads start creating new entries for the new world. This fixes an ensure related to mismatching timestamps when merging entries.
    
-   \[VisualLogger\] FDebugRenderSceneProxy: match wired and solid render side counts when both are used.
    
-   Added an associated world to FDebugDrawDelegateHelper to only draw text labels on the associated canvas
    
-   Fix debug draw text location for VisualLogger, RewindDebugger and DebugRenderSceneProxy by considering DPI scale and aspect ratio requirement (black bars)
    
-   Rewind Debugger: Fixed RewindDebugger drawing debug capsules at the wrong location. Previously it passed in the capsule's floor coordinate as the center when calling DrawDebugCapsule, causing a half height offset.
    
-   Fix VisualLogger Deprecation messages
    

#### AI EQS

**New:**

-   Adds #ifndef macro to USE\_EQS\_DEBUGGER in EnvQueryTypes.h to allow for the preprocessor macro to be modified in target.cs files via the GlobalDefinitions or Definitions variable.
    
-   EQS Update : Add a NavDataOverrideContext in UEnvQueryGenerator\_ProjectedPoints to be able to override Navigation Data instead of using the owner's one.
    

**Bug Fix:**

-   Prevent AIDataProvider values from being replaced by an incompatible one when using copy/paste
    
-   Fixed AIDataProvider PostEditChange to only validate providers when the struct is of the right type
    
-   EnvQuery runtime template object stored in the EnvQueryManager will always be created with a unique name now
    
-   \[EQS\] fixed ever growing list of queries when the owners are GC'ed Fixing a memory leak in the EQS Debugger.
    

#### AI Navigation

**New:**

-   Made annotation events collection and handling thread safe
    
-   Mass Navmesh NavigationAllows mass entities to find and follow a navmesh path using FMassNavMeshPathFollowTask.
    
    -   Addition of a MassNavMeshNavigation module.
        
    -   Addition of UMassNavMeshNavigationTrait.
        
    -   Addition of a FMassNavMeshPathFollowTask to request a navmesh path and update the short path when needed.
        
    -   Addition of FMassNavMeshShortPathFragment, a subpath used by UMassNavMeshPathFollowProcessor.
        
    -   Addition of FMassFindSmartObjectTargetTask to set target location and associated intent.Addition of a FMassNavMeshStandTask and action.
        
    -   Keep FMassNavMeshPathFollowTask running until the entity reaches its destination.
        
-   \[ZoneGraph\] Added prefix to parameter names.
    
-   Mass Navigation Debug
    
    -   Addition of vislog for standing avoidance
        
    -   Addition of vislog to UMassSteerToMoveTargetProcessor
        
-   Allow RecastNavMeshDataChunks to reclaim navmesh tiles when using Dynamic Modifiers Only runtime generation while detaching them if they have different layers but the same XY position.
    
    -   Also updated the warning for reusing unloaded sublevels to use the updated console command 'LevelStreaming.ShouldReuseUnloadedButStillAroundLevels 0'.
        
-   \[Mass Navigation\] Clarify UMassSteerToMoveTargetProcessor debug display.
    
-   \[Navmesh\] Addition of a Boolean to track if a navmesh has been loaded without its tiles and update the display so it shows as "needs to be rebuilt".
    
-   \[Navmesh\] Addition of a "Navmesh needs to be rebuilt" message to the navigation display since the stat display is not always enabled.
    
-   \[Navlink\] Addition of LinkBuilderFlags to the generation config to control which point links will be added from the created links (center, extremity or both).
    
-   \[Navlink Generation\] Addition of "Selected Edge Collisions Samples" flag to display individual trajectory samples that hit a collision when debugging tile generation.
    
-   Mass Avoidance
    
    -   Allow UMassMovingAvoidanceProcessor to account for environment edges.
        
    -   Addition of environment boundaries in FMassNavMeshShortPathFragment.Those boundaries are added when requesting a short path and are made from a FNavCorridor of the path.Fix in avoidance processor to ignore environment edges that are not yet relevant.
        
    -   Addition of UMassNavMeshNavigationBoundaryProcessor to pass the boundaries to the avoidance through the FMassNavigationEdgesFragment.
        
    -   Added leading and trailing points at the start and end of the short path.
        
    -   \[UMassMovingAvoidanceProcessor\] Environment avoidance can now work with extruded edges (giving more freedom of movement in tight spots).
        
    -   \[UMassMovingAvoidanceProcessor\] Avoidance bug fixes in environment separation and avoidance prediction handling.
        
    -   Fix check on environment edge normals.
        
    -   Fix inverted force generated by environment edges.
        
    -   Added text display to DebugDrawLine and display environment edges index when using avoidance debug display.
        
    -   Simplified avoidance debug display, improved consistency and revisited coloring.
        
-   Optimization: add missing references for loops in UCrowdManager::PostMovePointUpdate.
    
-   \[Navmesh\] Fixed warning "Referenced by: FRecastTileGenerator->AddRereferencedObjects"
    
-   \[UMassSteerToMoveTargetProcessor\] Clearer and improved debug display.
    
-   New console command "ai.debug.nav.DumpRepositoryElements" to list all elements registered in the Navigation repository with their bounds and parent
    
-   The call to OnActorRegistered in NavigationSystem from AActor::PostRegisterAllComponents will now handle registration for the actor and all its components. Component registration to the navigation system will be ignored until all components are registered to the scene to avoid extra work since actor registration will take care of it. The component specific operations are now only used after the initial registration (e.g., component added/removed/updated).
    
    -   This change fixes an issue exposed by the new registration flow when the NavigationElement is created and pushed with all the relevant data instead of relying on the callbacks when processing the registration queue. That delay was hiding the dependencies between some components.
        
-   \[Mass Navigation\] Prevent MoveTarget progress to continue without its entity.
    
-   \[Mass Navigation\] Addition of LogMassMoverDivergence. It allows to track divergences between the mass entity requested velocity and the mover result (if any).
    
-   \[Mass Navigation\] Added an option to prevent the usage of catchup speed scale in animation driven mode to avoid undesirable speed changes.
    
-   \[Navlink\] Improved functionality for navigation segment links with addition of logs and changes related to TileRefs.
    
-   \[NavigationSystem\] replace legacy repository unregisternavrelevantobject method with UnregisterNavRelevantObjectInternal
    

**Bug Fix:**

-   \[Navlink\] Fix navlink trajectory issue occurring when using large values for end heights tolerance.
    
-   \[Navlink\] Only register generated navlink proxies if bGenerateNavLinks is enabled.
    
-   \[Navmesh\] Fix "Added an oversized dirty area" warnings occurring even if using the disabled threshold value when using invokers.
    
-   Navigation: Stability fix. Fixes nav mesh generation crash on application exit when bDoFullyAsyncNavDataGathering is set to true in the project and FNavigationDataHandler::DemandLazyDataGathering is executing when the application is exiting. Destroying the NavOctree while other threads are running nav building tasks is unsafe, so now the GameThread will wait for the nav mesh build to cancel which waits at least until running async tasks are finished.
    
-   Navigation: Stability fix. Addresses an incorrect array resizeGrow implementation in Recast helper struct rcScopedDelete. When an array is grown from N to M, M elements were copied from the last array address which read-accesses memory it shouldn't.
    
-   \[NavArea\] Fix regression when creating area modifiers SetAreaClassToReplace sets ApplyMode and bIsLowAreaModifier, calling SetApplyMode was overriding the change.
    
-   Moved unsubscribing from FCoreDelegates::OnGetOnScreenMessages in NavigationSystemV1's destructor over to NavigationSystemV1::CleanUp where the other unsubscribing takes place - by the time the navigation system's destructor gets called the WeakObjectPtr stored in FCoreDelegates::OnGetOnScreenMessages is no longer valid and unsubscribing fails.
    
-   \[InstancedStaticMesh\] Fix ensure cause by invalidated CachedBounds in UInstancedStaticMeshComponent (AddInstancesInternal is called in a callstack where the bound cache gets invalidated).
    
-   \[Navmesh\] Recast: prevent layer IDs from being overwritten in complex tiles.
    
-   Fix invoker registration on navigation system override initialisation
    
-   \[NavLink\] Fix warning for invalid bounds if ANavLinkProxy does not have a simple link but is using a smart link.
    
-   Added support for an edge case in NavigationSystem caused by AActor::RerunConstructionScripts
    
-   Prevent navigation updates on component destroyed during ConsolidatedPostEditChange
    
-   \[Navmesh\] Brush Navmesh Issues
    
    -   Rebuild Level BSP when sublevel transforms as a whole
        
    -   Fixed framerate tanked when dragging the brush with navmesh
        
-   Fixed InstancedStaticMesh to make sure that UpdateBounds is completed before UStaticMeshComponent::PostStaticMeshCompilation calls FNavigationSubsystem::UpdateComponentData, which relies on updated and cached bounds to create a valid FNavigationElement.
    
-   UpdateActorAndComponentsInNavOctree in NavigationSystem now only performs a full update (unregister/register) on registered components. Otherwise they only need to be unregistered. This is to prevent trashed components to stay registered in the NavOctree when executing RerunConstructionScript.
    
-   \[WP Navmesh\] When building WP navmesh and deleting unnecessary packages, skip packages already deleted to avoid "Error deleting packages" errors.
    
-   \[ZoneGraph\] Fix UMassZoneGraphLaneCacheBoundaryProcessor not running by adding the missing FMassLaneCacheBoundaryFragment.
    
-   \[Avoidance\] In CreateCrowdManager, use warning instead of making an error if no navdata is found. This is because OnNavMeshUpdate() is called on UnregisterNavData and it might be the last one. We want to avoid errors on closing maps.
    
-   \[Navmesh\] Fix crash in FRecastTileGenerator::AddReferencedObjects by removing invalid check in FNavigationElement::GetWeakUObject.
    
-   \[Navmesh\] Fix: only spawn the navmesh for the world that was loaded.
    
-   \[ZoneGraph\] Fix UMassZoneGraphLaneCacheBoundaryProcessor incorrectly calculating segment normals.
    
-   \[Mass Navigation\] Clamp steering force to respect MaxAcceleration parameter from FMassMovementParameters.
    
-   \[Mass Navigation\] Addition of FTransformFragment as a requirement for UMassNavigationObstacleTrait.
    
-   \[Brush Navmesh\] Fixed BSP Navmesh not updated when undo/redo a move
    
-   \[ZoneGraph\] Fixed crash when attempting to debug ZoneGraph in a non-shipping build by moving ZoneGraph ShowFlag from the ZoneGraphEditor module to the main ZoneGraph module
    
-   \[Navlink Generation\] Fix generated navLinks ground validation when using a high JumpEndsHeightTolerance value.
    
-   \[NavCorridor\] Fix issue with SimplifyConcavePortals that could break some portals while simplifying the corridor.
    

#### AI Perception

**New:**

-   Improve OnTargetPerceptionForgotten Callbacks in AIPerceptionComponent
    
-   Replaced the RefreshStimulus() method with a new method, ConditionallyStoreSuccessfulStimulus(), which returns a boolean result.   
    
    -   This also enables the inclusion of custom logic, such as handling events for a changing Stimulus.Strength parameter when NotifyType == EAISenseNotifyType::OnPerceptionChange
        
    -   This change allows for method overloading and enforces the invocation of OnTargetPerceptionUpdated when needed.
        

#### AI Smart Objects

**New:**

-   Added partial multithreading support to be able to update/use/release slots from multiple threads. SmartObject instance lifetime is still single threaded and mainly controlled by components lifetime. The functionality is off by default and can be activated by setting WITH\_SMARTOBJECT\_MT to 1
    
-   Added support for FSharedStruct and FInstancedStructContainer to 'FPropertyBindingPath::ResolveIndirectionsWithValue'
    
    -   Replaced sharedptr in FWorldConditionQueryDefinition by a transient FSharedStruct so it can be pointed at through property bindings.
        
    -   USmartObjectDefinition::ApplyParameters() will try to redirect bindings to conditions to the runtime structs since EditableCondition used for the bindings are not available in non Editor builds.
        
    -   Clear cached DefinitionAsset variation when SmartObjectComponent is reconstructed to make sure we get an updated variation in case blueprint scripts are modifying some parameters.
        
-   \[SmartObject\] In FMassFindSmartObjectTask, addition of an option to find the SO from the lane location or the world location (keeping the default as it is currently, by lane).
    
-   Deprecated GetSlotView to force callers to use safer InspectSlotDataFromView/MutateSlotDataFromView.
    
    -   Added FConstSmartObjectSlotView
        
-   Add a public const view accessor for smart object owner data
    
-   Refactored SmartObjectDefinition to use PropertyBindingUtils to share functionalities and add proper support for more types (e.g., object pointers)
    
-   Updated FSmartObjectHandle to use a guid to get proper support of persistent collections with world partitioned level using level instances. Each component will have its own Guid that we combine with the owner Guid when it is time to create a unique handle.
    
    -   This is required for components in LevelInstances since those can be reused many times in a single level and we need to ensure to generate an ID that we can bind to the runtime instances when those components get loaded by the streaming grid.
        
-   Added toolbars in SmartObjectEditor viewport for widget modes, camera, and fixed translation snapping.
    
-   Improved viewport preview bounds computation to ignore invalid definition bounds so the camera position is more appropriate
    

**Bug Fix:**

-   \[Smart Objects\] Fix smart objects with parameters are not saved properly in a persistent collection.
    
-   Asset variations are now created using the provided world as Outer so they get properly GC'ed when changing world. This is required since Parameters can have pointers to objects in the level (e.g., actors, components, etc.)
    
-   Forget set InstanceData.LastLane
    
-   Fixed unbound parameter validation for cases where there is no bound parameters
    
-   Prevent uses of variations created for a different world.
    
-   \[Smart Objects\] Fix a crash inside USmartObjectZoneAnnotations::DebugDraw()
    
-   Added move operations to FSmartObjectRuntime and FWorldConditionQueryState to fix cleanup issues when calling RemoveAndCopyValue in SmartObjectSubsystem::UnregisterCollection
    
-   Fixed SmartObjectZoneAnnotation by using FActorComponentInstanceData to store data that is considered modified by the UCS and not generically saved during RerunConstructionScripts (i.e., SmartObjectAnnotationDataArray)
    
-   Fixed BoundToSimulation called twice for objects registered in a collection
    

#### AI State Tree

**New:**

-   Make StateTree Schema SetContextData virtual instead of forcing the child component class to manually call a static function.
    
-   Merge bindings related types with PropertyBindingUtils types
    
-   Added new debug delegates that can be used for debug purposes and added new dedicated update phases for trace/debug.
    
-   Refactored StateTreeDebugger event buffering to support instance execution for multiple worker threads. Buffered data flushing (when starting a trace session) is now handled by callbacks from the main thread. Locks are used with the assumption that the struct associated to a given state tree instance can only be used by a single worker thread in a given frame. Based on that assumption the locks are only used to protect creation of new entries when new instances are producing events. Note that those "Write" operations are a lot less frequent than the read accesses.
    
-   Expose the SetStateTree function to BP. Add a state tree reference setter. Validate if the tree has the correct schema.
    
-   Reorder the EStateTreeRunStatus to be aligned with ETaskCompletionStatus.
    
    -   Fix EStateTreeFinishTaskType::Failed start at value 0 to make UObject that contains the enum valid. They are memset to 0, so the 0 value needs to be valid.
        
-   Add Debug callback and runtime check framework.
    
    -   Check if the context is the same between each execution context.
        
    -   Check if every call to StartState is met with a StopState.
        
-   Added option for MassStateTree processor to run on multiple threads and use ParallelForEachEntityChunk (instead of ForEachEntityChunk)
    
-   Add icons in the editor to show which task ticks.
    
-   Small optimization to skip tasks ticking if no task requests a tick.
    
    -   Moved bHasGlobalTransitionTasks and bHasTransitionTasks from the compiler to the runtime flag initialization.
        
    -   Reordered the data in FCompactStateTreeState for better memory padding.
        
-   Display the other states that are linked to the selected state.
    
-   Multithread access detection. Detect if 2 threads are accessing the same instance data. The validation can be deactivate with the cvar StateTree.RuntimeValidation.MultithreadAccessDetector
    
-   \[State Tree Compiler\] Added warning report for Condition Evaluation Mode and Disabled Tasks
    
-   Update TStateTreeInstanceDataStructRef to access data in temporary frames. When selecting a state the evaluator and global task data are not in the active frame.
    
-   For linked assets, test if the schema is the same. Add unit test for invalid SetLinkedStateTreeOverrides.
    
-   Log error when collecting external data fails with the component schema.
    
-   \[StateTree\] Mark UStateTreeAIComponentSchema for export from the module so it can be overridden by users.
    
-   \[State Tree\] async MoveTo Task - only tick the task when it is tracking the destination vector - added ICompileNodeContext, FCompileNodeContext - added native delegate in AI MoveTo gameplay task
    
-   \[State Tree\] async RunEnvQuery Task
    
-   Prevent enter conditions and utilities from binding to task instance data. A parent state can try to enter a child state before it's accepted by the transition. The task instance data is only available once the transition is completed.
    
-   Add a function to set the LinkedStateTreeOverrides from BP.
    
-   Adding filtering of state selection behavior options based on schema
    

**Bug Fix:**

-   Global tasks and evaluators are not started if temporary data for them already exists. It's a leftover from times when we were not stopping them in such cases.
    
-   Call the base function for UStateTreeComponent::InitializeComponent and UStateTreeComponent::UninitializeComponent. P4 history doesn't mention it but we guess that it was to skip the UBrainComponent from initializing a behavior tree.
    
-   StateTreeDebugger fixes
    
    -   Added missing information in transition source struct to refer to the proper asset in case of linked trees (this fixes an ensure for mismatching transition information when reading the trace)
        
    -   Fixed scoped state phase display (missing case for Push/Pop)fixed broken icons in frame details view for log events (warning, error and fatal)
        
-   \[State Tree Editor\] fixed StateTreeViewModel's selected states not synced to StateTree View's ones
    
-   Update transition request to use frame ID. FrameID uniquely identifies the frame and prevents errors in async tasks.
    
-   Removed the property's custom label if its member is bound.
    
-   \[State Tree Editor\] fixed nullptr access from skipping the header initialization for Property Function Nodes
    
-   \[State Tree Editor\] Fixed typos in State and Node Height tooltips in a State View settings
    
-   Fix calls to PostEditInstanceDataChangeChainProperty on nodes with TArray property.
    
-   Fixed copy binding for function bindings.
    
-   Make the StateTreeComponent Blueprintable.
    
-   Use the correct tree instance data when migrating a linked asset tree.
    
-   \[State Tree\] barf nullptr UClass due to BP/c++ class deletion in StateTree link
    
-   Fix bad index usage in transition. The index used was the state index inside the asset, and we needed the state index in the active list.
    
-   Fix runtime issue with context constructed with one owner on start by with another to gather info.
    
-   Fixed crash during bindings compilation (accessing view to array under modification).
    
-   \[State Tree\] Fixed Random Selector not using the correct StateIndex
    
-   \[State Tree\] Fixed a few glitches in transitioning logic
    
    -   Fixed when the active path doesn't have any tickable tasks, on-completion transitions in subsequent frames will be ignored
        
    -   Fixed when there are only disabled task on the active path, on-completion transitions will be ignored
        
    -   Fixed unnecessary looping through parent frames when a on-completion transition has already been found that triggers faulty behaviors in ST Debugger
        
-   Make sure there is always one editor color. Fix states color ref when it does not exist.
    
-   Hashing the editor data after the compilation, in case the compilation process changes the data.
    
-   Fixed memory leak in FPropertyBindingBindingCollection::ResetObjects when the binding is a complex type with a destructor since InitializeValue() does not check for CPF\_NoDestructor. The issue was seen with a TArray leaking its buffer when it was reset. Fix for a memory leak and crash in StateTree.
    
-   Use the correct tree to iterate on transitions when selecting a new state.
    
-   Add support for transition on PropertyRef K2Node.
    
-   Use redirector when resolving binding path to solve issues with renamed BP property.
    
-   Separates the workspace tab to initialize the tab for the editor toolkit and the editor mode.
    
-   Fixed incorrectly created ArrayView to ActiveStates.
    
-   Rename objects that will be duplicated on compiles to get predictable object names.
    
-   When duplicating the asset, make sure the new binding collection owner is correctly set. Because struct property cannot be DuplicatedTransient, the value is set to the CDO value when duplicating the collection.
    
    -   Licenses should do the same for their implementation.
        
-   Force the UStateTreeEditorData outer to be a UStateTree. When the asset is used or compiled the nodes expect the outer to be a state tree.
    
-   Use the correct buffer when accessing the temporary global buffer.
    
-   Reset the compiled data when the editor data is copied. It prevents old data in the compiled data.
    
-   Fix for weight property being visible in state detail even when schema disabled utility.
    
-   StateTree: Update the K2Node for PropertyRef to use the byte type (as blueprint does) when the property is an enum.
    
-   Update the delete key input for mac.
    
-   Do not update the bound properties, for the delay task, on Tick and ExitState. They are not needed
    
-   Use the correct tree to iterate by active state for GetDebugInfo
    
-   Resetting temporary instances after a transition. Previously, the instance data was reset only when the transition succeeded.
    
-   Fix rebuild state tree view with undo/redo.
    
-   StateTreeDebugger now registers to be notified when the associated StateTree asset gets successfully recompiled to clear any previously recorded data that could mismatch the new compiled tree data version.
    
-   Added refresh on undo/redo for the Editor Data details view to make sure cached data in binding row extensions are up-to-date
    
-   \[State Tree\] prompt needs recompile and force recompile pre-PIE when binding is changed
    
-   \[State Tree Editor\] Dirtied Editor Compiler button when changing global data
    

#### API

**New:**

-   Refactor MemQuery code to get rid of FString operations, input handling and provide cleaner API.
    
-   Simplified ChangeBundleStateForPrimaryAssets by returning CombinedHandle even for 1 asset requests
    
-   Fixed a state transition logic to correctly handle bundle states when asset is already loaded
    
-   Fixed a state transition logic to correctly handle cancelation of streaming handle
    
-   Made AddTargetLayer optional after calling ALandscapeProxy::Import. Missing layer info is automatically added as needed. This restored the behavior that Import had in 5.4.
    

**Bug Fix:**

-   Fix assert by skipping refcount checks for property bag instances when exiting the application
    

#### Audio

**New:**

-   The ADM plugin is an implementation of the ADM-OSC spec enabling spatial audio workflows in UE.
    
    -   Individual source positions are transmitted via OSC in (x, y, z) coordinates.
        
    -   Corresponding source audio is transmitted through the direct outs of a WASAPI aggregate device enabling large channel count spatialized audio.
        
-   Waveform Editor supports cue points and loop regions (markers)
    
-   Folder actions added for bulk versioning MetaSounds easily either recursively or locally.
    
-   ModulationPatchEditor: Tooltip improvements so that when you hover over a point on a curve, it shows you the unit value accompanied by its unit as well as the normalised value
    
-   Waveform Editor GUI - Added support for Add/Remove Cue Points/Markers and to reimport and overwrite transformations
    
-   Added a new CVar (au.Concurrency.IncludeVolumeModulation) which allows the volume modulation on a Sound to impact Concurrency and Voice Management when using Stop Quietest.
    
    -   When set to 0, this behavior is unchanged from before (Audio Modulation has no impact).
        
    -   When set to 1, the behavior only applies to One-Shots.
        
    -   When set to 2, it applies to all sounds.
        
-   Added a new value to ActiveSound, which allows the Virtualization Mode of a sound to be overridden at runtime
    
-   Export marker data to soundwave using the Waveform Editor Toolbar and export marker data to .wav files using the right click context menu in the content browser
    
-   New -muteaudio command line tool and au.MuteAudio cvar apply a mute on the final output buffer without modify audio engine behavior (audio analysis, memory, or performance profile)
    
-   Waveform Editor: Added the ability to tune and preview loop points
    
-   Added a new Duration parameter to Control Bus Mixes.
    
    -   When set to a value above 0, the Control Bus Mix will start a timer upon Activation. When the time set in the Duration value is reached, the Control Bus Mix will automatically deactivate itself.
        
    -   Added a new option on Control Bus Mixes called "Retrigger On Activation"When set to true, affects the behavior when activating a mix which is already activated. The Mix will return all stages to their default values, and then begin the Attack segment again (like retriggering an envelope).
        
-   Added a new experimental Virtualization Mode: Seek Restart
    
    -   This mode mostly behaves like Restart, but once the sound realizes, it will start the sound and seek to the appropriate location in the sound's loop based on how it's been since the sound first played.
        
    -   This feature is currently experimental; you may hear unexpected behavior in some use cases.
        
-   Added smoothing to MetaSound delay nodes
    
-   Append metasound instance unique ID to the graph name for Print Log metasound nodes
    
    -   Helps when debugging a metasound that can have several instances playing at once
        
-   Settings have been added to the Editor preferences for configuring XAudio2, WASAPI and WASAPI aggregate devices. WASAPI support is new to UE and utilizes the high quality, low latency, modern audio device layer.
    
    -   WASAPI aggregate devices unlock all of the channels of physical audio devices whereas a normal, windows device would max out at eight channels.
        
    -   Combining a large channel count audio device with UE's aggregate audio device support and the new ADM plugin enables large channel count spatialized audio configurations and workflows.
        
-   New variant of MetaSound delay node that accepts an audio buffer for delay time, to allow for sample-accurate manipulation of a delay line
    
-   Add new keywords to common MetaSound nodes:
    
    -   "length" and "size" for array Num nodes
        
    -   "append" for the array Concat node
        
    -   "slice" for the array Subset node
        
    -   "gain" and "vca" for the Multiply (Audio by Float) node
        
    -   "if" and "branch" for Trigger Compare nodes
        
    -   "select" for Trigger Route nodes.
        
-   Clamped no-repeats order to be half the array size vs the whole array size using RandomGet in MetaSounds.
    
-   Changed the default settings on newly created Modulation Parameter Patches:Bypass is now false by defaultContains one input, with a custom curve that goes linearly from 0 at 0 to 1 at 1
    
-   Hid the Pitch Modulation option on Source Buses, since it never worked and was never intended to be visible.
    
-   Added Unreal Insights asset scopes for MetaSound building and rendering memory use.
    
-   Added log for the case when the audio engine is unable to initialize due to intentional audio disablement (-nosound or an application mode without audio backend support)
    
-   Added Unwatch functions to MetaSound Output Subsystem to Unbind Output Delegates
    
-   Adding 5.1 and 7.1 markup for audio busses to reflect common string representations
    
-   Improve UX around Submix and Bus Sends. Based on the Send Level Control Method enum selection, we now hide irrelevant properties from view (e.g. only show Custom Curve if the send method is set to Custom Curve).
    
-   Users are now notified to restart the editor after changing audio callback buffer size or number of buffers.
    
-   Polishing up source and submix effects uproperty displays, tooltips, and more.
    
-   Added ability to disable hardware accelerated convolution by commandline or cvar. "au.DisableHardwareConvolution 1" or "-DisableHardwareConvolution"
    
-   Added UAssetUserData to USoundClass to allow users to sidecar custom data that can be shared across a large amount of content more efficiently
    
-   Added new command line argument "ForceSurroundSound", which adds the ability to force a Windows machine to initialize the audio device to render 8 channels of audio. Will downmix to stereo. Useful for scenarios where an 8-channel audio device isn't available and a developer needs to exercise 8-channel audio rendering code.
    
-   Added icons for fade options in the Waveform Editor
    
-   Renamed "Binaural" audio attenuation spatialization method as "Plugin-Spatialized"
    

**Bug Fix:**

-   Fix Audio repeating in sequence when sequence time dilation is set below 1 and audio is not set to looping
    
-   Fixed issue where the ADSR Envelope MetaSound node would only trigger OnSustain if the Decay stage was more than 0 seconds long. Now it triggers when the Sustain stage begins regardless of the Decay stage length.
    
-   Fixed bug where attenuation spatialization and focus settings were dependent. Focus works independent of spatialize.
    
-   Fix for crash due to hardcoded byte size of 4 instead of using size of template numeric type when writing numeric type to OSC stream
    
-   Fixed a bug where sending a submix to an audio bus with a mismatched channel configuration did not properly convert the signal, leading to undefined behavior.
    
-   Fixed crashes in the "Create x" Audio Modulation Blueprint Functions (e.g. Create Control Bus Mix, Create AD Envelope Generator) caused by passing any of them matching names.
    
-   Fixed crash for SoundWave Haptics.
    
-   Fixed one-shot truncation in the audio renderer.
    
-   Fix serialization issue when making and saving a new bitcrusher source effect
    
-   Added tooltips, categories, and a bypass option to source effect dynamics processor
    
-   Fixing crash in simple sound when there are no variations.
    
-   Renamed "real time audio" slider to "Level Editor Volume" and added clear tooltips. Changed volume display to decibels.
    
-   Omniblend is fixed for mono sources using Direct2D for the case of surround sound outputs.
    
-   Fixed up settings category for MetaSounds and AudioModulation plugins to show up in Plugins.
    
-   Omniblend is fixed for mono sources using Direct2D for the case of surround sound outputs.
    
-   Fixed the audio mixer event timeout duration changing to minimum if you attach and then detach a debugger.
    
-   Fixing issue of MetaSounds on sequencer having a gigantic duration. Now, it gives a 1-second region you can drag for the region.
    
-   Fixed a crashing issue in the SoundCue node USoundNodeRandom.
    
-   Fixed a bug where the Wet and Dry Modulation settings on a Submix used the Output Volume Modulation settings instead.
    
-   Fix for MetaSound Editor performance regression causing larger graphs to stall while editing connections, adding or removing nodes, etc.
    
-   Fix issue where MetaSounds Midi Clock State node was not correctly reporting tempo until a tempo change event was received, and equivalent behavior for other outputs
    
-   Fixed issue where sounds played with PlayQuantized / Quartz may have their tails cut one audio buffer early.
    
-   Fix for crash when calling BuildNewMetaSound & BuildAndOverwriteMetaSound via MetaSound Builder Subsystem in Blueprint.
    
-   Fixed a bug where dragging a pin off a submix to create a new one does not automatically connect the two submixes.
    
-   Fixed bug on MetaSound Mid-Side Encode/Decode nodes preventing live update of input values
    
-   General improvements to audio device swapping in XAudio2 and WASAPI mixer backends.
    
-   Fixed an issue where adjusting volume on audio components stops a sound regardless of their virtualization mode.
    
-   Fix for Surround2D non-spatialized radius mode not working when output is stereo.
    
-   Fixed bug where MetaSound relative render cost reporting wouldn't work for MetaSound operators retrieved from the Operator Cache.
    
-   Clamped no-repeats order to be half the array size vs the whole array size using RandomGet in MetaSounds.
    
-   Fixed an issue with GC and bus sends on wave instances.
    
-   Fix for unrolled SoundWaves not looping in sequencer
    
-   Fixed an editor crash when using more than 1024 characters to name Metasound Variable or Vertex.
    
-   Fixed an editor crash when creating a Sound Cue with more than 32 Sound Sources
    
-   Fix for connections in the MetaSound Asset Editor sometimes disappearing when swapping an output's data type on an asset that implements paged graphs.
    
-   Fixed a bug using MetaSounds with a Level Sequence where MetaSound input channels were being sent to Pitch and Volume channels as well.
    

**Deprecated**:

-   UMetaSoundSource: Generators are stored in an array with their AudioComponentID and InstanceID instead of in a map. Uses of UMetaSoundSource::OnGeneratorInstanceDestroyed and UMetaSoundSource::OnGeneratorInstanceCreatedshould be replaced with UMetaSoundSource::OnGeneratorInstanceInfoDestroyed and UMetaSoundSource::OnGeneratorInstanceInfoCreated
    
-   Deprecated the following Audio Modulation Functions:
    
    -   Activate Bus
        
    -   Deactivate Bus
        
    -   Activate Generator
        
    -   Deactivate Generator
        
    -   To manage the state of Control Buses and Modulation Generators without playing a sound, use the Audio Modulation Destination type in Blueprints (accessible via Create Modulation Destination and Clear Modulator).
        
-   Deprecated the GetModulationParameter function
    
    -   We have replaced this function with one of the same name which returns a const pointer instead of a const reference.
        

#### Blueprint

**New:**

-   Update K2Node\_SwitchEnum.h (add SetEnum to the DLL export table)
    
-   Allow blueprint compilers to specify FBPVariableDescriptions to generate blueprint variables with during compilation
    
-   Add support for custom k2 nodes to be more easily detected by macros as latent. Currently, we hard code any nodes that might be latent and nested in a macro. However, this is restrictive for anyone trying to create a custom node with latent behavior. Instead, nodes can override IsLatentForMacros.
    
    -   Moved IsLatentForMacros to UK2Node from UEdGraphNode. Macros are a Blueprint-only concept.
        
-   Add autocast to GetAssetUserDataOfClass
    
-   Deprecated BaseClassesToAllowRecompilingDuringPlayInEditor, and allowed compilation during Play In Editor (PIE) by default. If blueprint editing during PIE is problematic use BaseClassesToDisallowRecompilingDuringPlayInEditor to disable the new behavior.
    
    -   E.g. \[/Script/UnrealEd.BlueprintEditorProjectSettings\]+BaseClassesToDisallowRecompilingDuringPlayInEditor=/Script/CoreUObject.Objectin DefaultEditor.ini can be used to disable all blueprint editing and compilation during PIE
        
-   Corrected comment on Blueprint property meta specifier "BlueprintBaseOnly": The specifier shows classes that can be used as a base for Blueprints, not classes that are Blueprints.
    
-   Blueprint property categories in the details panel are now sorted according to the user defined order.
    
-   Add the ability to set DeprecatedFunction="Note" (and DeprecatedVariable) metadata in C++ to lower the severity of a blueprint deprecation message. This can be used to softly deprecate functions without causing build warnings.
    
-   Updated the comment for BlueprintPure to reflect the correct definition of "pure". BlueprintPure was originally intended to mean functional pure, but that never materialized. It just means that a Blueprint function node will hide its exec pins by default, which can be toggled at the callsite.
    
-   Renamed the "Max" parameter in RandomInteger and RandomInteger64 to "Max Exclusive". This only affects Blueprints. The "Max" sometimes throws off users thinking that it means inclusive max, when it's actually exclusive. While the tooltip does mention this, renaming the parameter helps enforce the meaning.
    
-   Add support for the AdvancedDisplay markup on properties when using K2Node\_ConstructObjectFromClass
    
-   Add additional pixel formats to FImportanceTexture to support high dynamic range Data is linearized on load for RGBA8 formats, and floating point data is loaded directly.
    
-   Expand 'HideAssetPicker' meta usefulness This expands the metadata to work on other node types besides function calls (eg: property setters). Additionally, the metadata was renamed to "HidePinAssetPicker". Previously, it was a little ambiguous because it could give the incorrect impression that it hides the picker on the details panel for any properties.
    
-   Convert Bool to Branch similar to Validated Get Getter nodes for bools can be converted to branches via the context menu. This is a minor quality of life issue that obviates the need for manually adding a separate branch node. The implementation generalizes the bIsPureGet to an enum that represents either the 'validated object get' or a regular boolean. This also removes some really old and irrelevant code that was intended to catch issues tied to another change.
    
-   Implement ForEachLoop node for TSet datatypes. Additional changes made by Epic:
    
    -   Used minimal API to reduce export count.
        
    -   Added value name customization.
        
    -   Changed PinConnectionListChanged to NotifyPinConnectionListChanged.
        
    -   Replaced type state-tracking with RefreshWildcardPins, which updates the pins based on the current set link. This also simplifies the implementation.
        
    -   Removed pin tooltip customization.
        
    -   Fixed an iterator bug in GenericSet\_GetItemByIndex.
        
-   Create a blueprint node for iterating TMap's in a ForEach style similar to the ForEach for TArray. Additional changes made by Epic:
    
    -   Used minimal API to reduce export count.
        
    -   Changed PinConnectionListChanged to NotifyPinConnectionListChanged.
        
    -   Replaced type state-tracking with RefreshWildcardPins, which updates the pins based on the current set link. This also simplifies the implementation.
        
    -   Removed pin tooltip customization.
        
    -   Added an InferType overload for setting a pin type from a FEdGraphTerminalType.
        
    -   Fixed a bug in ResetToWildcard that didn't reset value pin data.
        

**Bug Fix:**

-   The Details Panel's Create New Blueprint button now works correctly with Soft Class Properties
    
-   Nodes within math expression sub-graph can be edited to show exec pins We shouldn't enable the pure toggle during any type of debugging mode.
    
-   Fix \`NotEqual\_IntPointIntPoint\` function meta Keywords and ScriptOperator
    
-   Able to add a Custom Event to a function graph using Create Event node When adding new custom events via the Create Event node, we need to ensure that we add them to the Blueprint's event graph, and not the node's current graph. Additionally, we should only allow this option if the Blueprint actually supports event graphs (eg: Blueprint libraries do \_not\_ have these).
    
-   Fixed crashes when running GenerateBlueprintAPICommandlet
    
-   Fix compile error on Mac.
    
-   Editor crash after disconnecting EnumToString node input from a wildcard output pin
    
    -   When an EnumToString node is created, its widget creates a SGraphPinEnum that also generates a combo box of enumerator values based on the currently linked enum. If there's no attached enum, it creates a generic byte-based SGraphPin.
        
    -   The logic of SGraphPinEnum assumes that its corresponding pin remains invariant. However, that's not the case if a link is ever broken or changes enum type. As a result, we can trip various asserts in SGraphPinEnum that assume there's a valid UEnum.
        
    -   We can fix this by forcing a node reconstruction if the linked enum ever changes. In fact, we have to do this when breaking a link because we need a SGraphPin as opposed to a SGraphPinEnum.
        
    -   Additionally, we need to trigger the reconstruction in NodeConnectionListChanged. NotifyPinConnectionListChanged isn't safe for calling ReconstructNode because it's frequently called in contexts that expect stable pins, which reconstruction will destroy.
        
-   Blueprint nodes that are replaced on load can now reconnect mistakenly orphaned pins
    
-   Structure assets in the error state will no longer remove themselves from other structure assets
    
-   The \[/Script/Engine.Blueprint\] bRecompileOnLoad config value is once again honored by the blueprint compiler. It has been ignored for several releases and now warns when it is used to suppress compilation on load
    
-   Bitfield enums don't cast correctly in Blueprints
    
    -   Casting bytes to an enum wasn't working correctly if the enum was a bitfield and the byte value was a combination of valid flags.
        
-   Subobjects: Fixed DefaultToInstanced subobjects breaking on blueprint duplication.
    
    -   When blueprint assets were duplicated, previously instanced subobjects became orphaned due to UPROPERTY pointers to them becoming null in the duplicated blueprint.
        
    -   This was caused by a SkeletonOnly blueprint compilation for the new asset which creates the CDO while the blueprint generated class did not have correctly initialized class flags yet.
        
    -   This caused instanced subobject reference restoration to be skipped in the CDO's PostConstructInit->InstanceSubobjects.
        
    -   This fix makes some workflows with instanced and DefaultToInstanced subobjects possible again, including GAS default subobject AttributeSets.
        

#### Blueprint Compiler

**New:**

-   Blueprints will now have their Tick function disabled if it's empty.
    

**Bug Fix:**

-   Fixed bug that caused MakeArray with wildcard pins not behaving correctly when using smart macro inference
    
-   Harvest metadata from user-defined function local variable descriptors at compile time to support details customizations that may expose it for editing.
    
-   The blueprint reinstancer is now less aggressive about disallowing RootComponent overwrites, use bp.UseLegacyRootComponentPreservation to return to the baseline behavior if the RootComponent is incorrect after blueprint compilation
    
-   Fixed crash when creating a macro blueprint based on a blueprint that is not up to date
    
-   Don't map subobject archetypes until they've been reinstanced during a batched Blueprint compile on load.
    
-   Disallow reference replacement on derived class artifacts left over from a previous compile during Blueprint reinstancing.These may be kept alive due to e.g. transaction records that can still reference reinstanced build artifacts across a Blueprint compile.
    
-   Retain archetypes cached during the CDO/archetype reinstancing phase that may be needed later to resolve old instance subgraph archetypes during non-archetype reinstancing.Also hooked the editor's archetype cache into core UObject archetype lookup logic for outer chains. This maintains archetype coherency during reinstancing if the chain is not fully reinstanced.
    
-   Fix for a regression in Blueprint reinstancing that could lead to data loss of an editor-spawned nested instanced subobject archetype.
    
-   Blueprint function calls with literal values supplied for interface parameters now compile correctly
    
-   Interface parameters in blueprints that are assigned to 'self' on the function call node now behave correctly
    
-   Fix instability in the generated class for blueprints that use UMVVMK2Node\_MakeBrushFromSoftResource
    

#### Blueprint Editor

**New:**

-   Modify SGraphNodeResizeable so that the resizing hotspots grow along as the node panel zooms out. This makes resizing & moving derived nodes such as Blueprint Comments much easier.
    
-   Localization fixes: The Blueprint Graph Editor will be localized for all Functions/Events/Actions again. This should be consistent across all Blueprint Graph Editor areas.
    
-   Mark UK2Node\_BaseAsyncTask::GetFactoryFunction as public so it can be used for external validation
    
-   Adding multiline Details field to Comment block node. This info will show up in the tooltip as well.
    
-   When connecting incompatible pins in a blueprint graph the context menu is now shown, allowing the user to search for a compatible node. This new behavior can be disabled via the ShowPanelContextMenuForIncompatibleConnections Blueprint Editor Setting
    
-   Adds a Stack command for Blueprint node alignment + with some general cleanup and icons
    
-   Collection Manager Scripting Subsystem is a new subsystem exposing the Collection Container system to Blueprint.
    

**Bug Fix:**

-   The blueprint compiler no longer attempts to add a scene root component to blueprints that do not support a construction script but currently have one
    
-   Do not mark Blueprint assets dirty when reconstructing graph nodes outside of a transaction scope.
    
-   Fixed crash when adding an interface with functions that have "AnimBlueprintFunction" metadata to a non-animation blueprint
    
-   Fixed cashes when creating blueprints based on blueprints in the dirty state
    
-   Fix potential for a new race condition during async Blueprint indexing.
    
-   Fixed an ensure that would fire when diffing some blueprints with custom details panel controls
    
-   Fixed crash when changing levels after restoring an editor session that had open blueprint editors
    
-   Fixed a crash when adding abstract Components and other invalid Blueprint classes to a Blueprint Graph. The nodes now result in a compilation error.
    
-   Auto-generate BP class path name if asset tag is missing during component type registration.
    
-   Fix a potential race condition during Blueprint asset search data indexing.
    
-   Fixed performance problem when booting the editor with an open blueprint editor when the palette tab is active
    
-   Fixed crash when editing a blueprint math expression node
    
-   Ctrl clicking on wires with multiple connections now behaves as expected, disconnecting from the closest pin rather than the pin with the fewest connections
    
-   Fixed crash when attempting to implement an interface inherited function in a Blueprint Macro Library, instead a toast is triggered explaining that this is not permitted
    
-   Fixed an ensure that fired when diffing blueprint assets that contained TMaps
    
-   Fixed ensure when navigating to a function via the Blueprint Callstack Viewer when there were multiple classes with the same name
    
-   Fixed a crash after renaming and replacing the DefaultSceneRoot component. It now resets its name to the default one when "deleted".
    
-   The blueprint diff tool now reports changes to Create Event Node's signature function
    
-   Fix editor crash after clicking on a deleted graph node hyperlink in the Blueprint editor's compiler results tab.
    

**Deprecated:**

-   Marked editor-only Asset Tags Subsystem functions as deprecated with an encouragement to migrate to Collection Manager Scripting Subsystem
    

#### Blueprint Runtime

**Bug Fix:**

-   Fixed an old regression that caused components attached to Blueprint actors dynamically spawned at runtime using the fast path option to fail to instance subobject templates in a cooked build.
    
-   Fixed memory leaks when accessing TArrays out of bounds or searching TMaps for keys that are not present when the contained type allocates in its native default constructor
    

#### Gameplay

**New:**

-   Trace Targeting Selection / Engineering: Added option to use Single trace instead of Multi trace. This allows for ensuring only one hit result is given, avoiding the case where an initial overlap hit is given along with the first hit past the initial overlap.
    
-   Add GetPossibleDataRegistryIdList to the DataRegistrySubsystem to allow iterating registries from blueprint. Deprecate GetCachedItemFromLookupBP in favor of new "Find Data Registry Item From Lookup" that uses multiple output pins.
    
-   Mover: Adding NavWalkingMode to support more efficient walking movement for actors using a navmesh
    
-   Expose \`APlayerController::IsPrimaryPlayer()\` to BP as \`BlueprintPure\` This will allow games to check if a controller is a primary player from Blueprint, without having to try to expose it through BP function libraries, components, or other methods.
    
-   Mover: Added BlueprintInternalUseOnly to LayeredMove, InstantEffect and MovmentModifier base structs to disallow making and queueing the base structs in Blueprint.
    
-   Add AsyncMessage.EnableWorldSubsystem (defaults to on) and AsyncMessage.EnableWorldSubsystemForEditor (defaults to off) cvars to control when the async message world subsystem is actually created
    
-   Mover: Teleport instant effect now supports setting rotation in addition to location
    
-   EnhancedInput: Add RegistrationTrackingMode to Input Mapping Context to select how multiple registrations of the IMC is handled
    
-   Mover: Fixing performance concern where nav walking modes perform duplicate GetNavData queries
    
-   Mover: Adding display name to instant effects so they are easier to find/make/break in Blueprints
    
-   Mover: Adding option for input production to be performed in parallel for the standalone backend
    
-   Mover: Updating NavMoverComponent GetLocation functions to get rid of unneeded casting
    
-   Gameplay Ability System: ATTRIBUTE\_ACCESSORS macro which was commented as a suggestion in AttributeSet.h is now usable out of the box as ATTRIBUTE\_ACCESSORS\_BASIC.
    
-   Improvements to the performance and thread safety of the tick.AllowBatchedTicks system first added in 5.5.
    
-   Mover: Adding an external gameplay tag container allowing outside systems to add gameplay tags for Mover evaluations.
    
-   \[GAS\] Allowing AbiiltySystem.Ability.Activate to distinguish between previously granted abilities and ones that need to activate immediately. This helps debug situations where you can't activate a granted ability.
    
-   GameplayCueNotify\_Actors that receive multiple WhileActive/OnBecameRelevant events will now ensure that OnRemove/OnCeaseRelevant events are executed afterwards. The console variable "AbilitySystem.GameplayCueNotifyMultipleRemoveEvents 0" can be used to force a single OnRemove/OnCeaseRelevant event per instance in all situations.
    
-   UGameplayTagsManager::IsValidGameplayTagString - Add overloads for using FStringView and FStringBuilderBase. Address cases where the value of OutFixedString would not be valid if TagString was an invalid gameplay tag string of a particular format.
    
-   Mover: Removing FMoverDefaultSyncState data collection add from FMoverSyncState constructor. Also adding a workaround for the NPP liaison to make sure start state has valid persistent sync states.
    
-   GameplayTags: Added a ShowOnlyLeafTag UPROPERTY meta tag, which allows you to show only the leaf name in the tag chip instead of the full tag path.
    
-   Mover: Editing NavMoverComponent to remove Tick and adding some uint64s to help keep track of when input is requested and consumed to help with caching and clearing cached nav input values.
    
-   Change ticking to use ProcessUntilTasksComplete to periodically call an update function while waiting for tasks on other threads. Added tick.IdleTaskWorkMS cvar to control this, if > 0 the game thread will spend that many milliseconds trying to process other work (like worker thread tasks) when the game thread is idle
    
-   \[GAS\] GAMEPLAYABILITIES\_API added to cue notify structs so they are exposed and can be aggregated for use with custom GameplayCueNotify objects.
    
-   Mover: Exposing functions, parameters and structs/properties to allow for a Movement Mode to be created entirely in Blueprints.
    
-   Mover: reduced costs of various queries by ensuring we always have a valid cached state to refer to
    
-   Moved Modifier Magnitude stack calculation into the GE so that stacking can be changed per effect.
    
-   Mover: added navmesh walking options for sliding along edges, and for alternative behaviors when attempting to go off the navmesh
    
-   Mover: NavWalkingMode changes that grab the NavigationSystem directly and find NavData based on properties from the NavMoverComponent.
    
-   Added gameplay tag binding and unbinding functions to the UAbilitySystemBlueprintLibrary.
    
-   Mover: added BP access to trajectory sample variables
    
-   Mover: improving copy implementation of data collections and sync state to avoid memory reallocation when possible
    
-   Mover: Adding AdditiveVelocity MixMode support to MultiJump Layered Move. Also making small adjustments to the extended Mover pawn to make sure additive velocity is respected by turning off extra jump input from CharacterMoverComponent Jump
    
-   Change GameFeatureSubsystem::AddObserver to notify the new observer about any already loaded plugins
    
-   Passing -m to gamever will display the gameversion components on separate lines to make it easier to view the information you want
    
-   Add checks to prevent adding invalid tags (consistent with FGameplayTagContainer).
    
    -   FGameplayTagCountContainer:
        
        -   Added ensure in UpdateTagMap\_Internal. Logic should return early before reaching this point.
            
        -   Early returns in UpdateTagCount and SetTagCount if the tag is invalid.
            
    -   FMinimalReplicationTagCountMap:
        
        -   Early returns in AddTag and SetTagCount if the tag is invalid.
            
    -   GameplayCues:
        
        -   Early returns in GameplayCueManager's InvokeGameplayCueExecuted and InvokeGameplayCueExecuted
            
        -   Early return in UAbilitySystemComponent::AddGameplayCue\_Internal.
            
-   Physics Mover: Jumping can now apply a reaction force to the ground if it is a dynamic body
    
-   Mover: Adding support for arbitrary gravity directions to default movement modes and util libraries.
    
-   Gameplay Tags: Added the DevComment to the tooltip for tag chips in both SGameplayTagCombo and SGameplayTagContainerCombo
    
-   \[GAS\] GameplayTagsManager will not ensure against Fast Tag Replication network indices size when not using Fast Tag Replication. We achieve this by not reconstructing the Net Indices when using non-Fast Tag Replication (e.g. the new Dynamic Tag Replication). This allows Dynamic Replication to continue past the size of uint16 Gameplay Tags without workflow issues.
    
-   Add GameFeaturePlugin.ForceSyncRegisterStartupPlugins (defaults to true) cvar to make the game feature state machine synchronously register plugins during engine startup even if async loading is enabled.
    
-   Mover: Moving bShouldNextModeReenter from UImmediateMovementModeTransition to UBaseMovementModeTransition so we can check it and avoid reentering a mode as the default behavior.
    
-   AActor::CheckActorComponents has misleading warning. This warning is \_really\_ old, and not very useful to begin with. It'll always trip because the component template objects have the GEN\_VARIABLE suffix, which instances don't have. This warning was never updated to reflect that. It tends to pop up when users enable all warnings (i.e.: -logCmds="global warning").
    
-   Mover: Providing a gameplay tag that can be used to skip proposed movement in RootMotionAttributeLayeredMoves
    
-   World: Add support for disabling Time Dilation in GetEffectiveTimeDilation() without modifying any of the time dilation values; When disabled, time dilation can still be set via existing functions, but calling GetEffectiveTimeDilation() will return 1.0, indicating no time dilation. Once set back to true, GetEffectiveTimeDilation() will return the time dilation as last set (even if it was set while time dilation was disabled).
    
-   Adjusting APawn::UpdateNavAgent and APawn::GetNavAgentPropertiesRef() to use the NavMovementInterface
    
-   Mover: Removing unneeded MoverDataCollection additions in constructors and reset functions
    
-   Mover: Exposing BaseVisualComponentTransform with a getter and setter function so we can set the offset of visual components. We now also use these functions to properly adjust the visual component of the pawn when crouching.
    
-   Add a way to attach a breakpoint to specific game feature's state changes. This can be enabled while editing a game feature or using the console command "EnableDebugGameFeatureState "
    
-   Mover Examples: Adding new flying BP movement modes to show making a mode entirely in BP.
    
-   Mover: added new move input type to differentiate between none and invalid, avoiding erroneous warnings
    
-   \[GAS\] Added EditorGetAssetTags() for a mutable version of the Ability Tags for use in Editor Tooling.
    
-   Mover: misc memory-related improvements during simulation
    
-   Mover: improving thread safety with locked access around certain operations
    
-   Add an optional deferred component move handler (s.GroupedComponentMovement.Enable) on the UWorld to allow scene components to request movement to be propagated later on the frame as a larger group of updates to help improve performance
    
-   Add LevelStreaming.VisibilityPrioritySort to change the order that it processes level streaming adds and removes
    
-   Mover: added warnings to detect excessive speed coming from root motion attributes
    
-   Mover: Adding double buffer for cached sync state to avoid issues with reading in data that may be freed/overwritten
    
-   Mover: Adding Mover-Mass translators along with a Mover Integrations plugin to house various integrations between Mover and other systems
    
-   Mover: Making NavWalking mode set floor results in the Mover Blackboard when projecting to level geometry is enabled.
    
-   Mover: supporting the combination of root motion + kinematic gravity, and ensure gameplay tag checks are against current state
    
-   Added a new (experimental) TaskSyncManager to the engine which allows registration of globally accessible tick functions that can be used to synchronize different runtime systems and efficiently batch per-frame updates.
    
-   Added support for manual task dispatch to FTickFunction so functions can wait to be triggered halfway through a tick group. If tick.CreateTaskSyncManager is enabled, it will create the manager at startup and register sync points that are defined in the Task Synchronization section of project settings. RegisterWorkHandle can be used to request work at a specific sync point, and RegisterTickGroupWorkHandle can be used to request work to run on the game thread during a tick group. The TickTaskManager was modified to support this system and other methods for improving tick performance
    
-   Introduced a shared time budget for ProcessAsyncLoading and UpdateLevelStreaming that can be enabled with s.UseUnifiedTimeBudgetForStreaming 1. When this is set, it runs the async asset and level streaming at the end of the frame from HandleUnifiedStreaming which also handles high priority streaming. UpdateLevelStreaming will have less time if there are hitches in ProcessAsyncLoading, and time unused by UpdateLevelStreaming will be used to process more loaded assets.
    

**Bug Fix:**

-   Fix for AActor's ForEachComponent crashing when using default constructed TSubclassOf.
    
-   Mover: Fixed issue with nav movement consuming invalid data causing slow/bad movement when framerate differed from fixed tick rate of Mover.
    
-   Mover: Fixing issue with sim step infinite loop detection if movement modes refund an impossible amount
    
-   Mover: Adding more nullptr checks to the NavMoverComponent to avoid crashes with using NavMoverComponent before it's initialized
    
-   Mover: Vertical speed is now properly clamped in positive and negative directions when going over terminal vertical speed.
    
-   \[GAS\] Fixing a crash in FMinimalReplicationTagCountMap::UpdateOwnerTagMap. If we received a Tag Count Update which in turn causes a callback to remove that same tag, it would invalidate our iterator and cause a crash.
    
-   Changing LogActor CompileTimeVerbosity to All rather than Warning.
    
-   \[GAS\] Preventing potential crash in CheckForClearedAbilities. This was occuring in Lyra when traveling between levels (e.g. playnextgame).
    
-   \[GAS\] - Fixed Targeting Selection Debug display.Targeting selection debug for cylinders display correctly. Now enforcing size rules to avoid incorrect overlap detection for cylinders.
    
-   Fixed double \* on dirty Gameplay Ability Blueprints.
    
-   Gameplay Cues: Addresses a race condition involving first-time async loading of GameplayCueNotify classes where deferred cue events (OnActive, WhileActive, OnRemove) could execute out of order.
    
    -   Additionally, GameplayCueManager now avoids doing multiple async load requests for the same GCN class.
        
    -   Previously, GameplayCues could be executed out of order when the async load of a GCN class has progressed enough that the class is resolvable by path, but the FStreamingDelegate async load callback hasn't fired yet since those are deferred until next frame.
        
    -   During that frame, gameplay cues will execute immediately while prior cues that were deferred haven't executed yet. Cues had a chance of being executed out of order: i.e. calling AddGameplayCue and RemoveGameplayCue could result in the remove being executed before the add. In practice this ends up with cues that remain active while they shouldn't.
        
-   Increased PawnRemoteViewPitch precision from 8 bits to 16 bits, to greatly improve the quality of sim proxy aim animations and firing in default configurations.
    
-   FGameplayAbilityTargetDataHandle::IsValid() accounts for negative indices.
    
-   \[GAS\] Fix for UGameplayEffect::PostLoad potentially causing an attempt at DataRegistry loads prematurely.
    
-   Mover: Properly cleaning up our movement modes when a MoverComponent is destroyed. Unregistered is now called on all movement modes on the state machine and Deactivate will be called on the active mode.
    
-   Fixing issue with FScopedMovementUpdate::RevertMove not updating the cached rotations of the Scenecomponent which could lead to some bad rotation applied to the component after reverting movement with rotation and then applying a different move.
    
-   Mover: fix cases where turn generator options were not filtered properly on some movement modes
    
-   Mover: Removing a setting NavAgentProps.NavWalkingSearchHeightScale to default nav values in UpdateNavComponent as it erases set values set by user
    
-   \[GAS\] RootMotionJumpForce ability task updated so clients don't call EndTask() before the server.
    
-   Don't invalidate the CurveTable cache id when emptying an already empty table or a CompositeCurveTable that is still being loaded. We only want to invalidate when something could possibly be referencing the curve
    
-   Make sure touch is considered when checking if a key is from keyboard in UKismetInputLibrary::Key\_IsKeyboardKey.
    
-   Use a more standard and predictable Quat to Rotator conversion when gimbal locked at +/-90 degrees pitch.
    
-   Mover: Ensure consistent turns when rotating by 180 degrees. Previously, if the target motion was a 180 degree turn, the character could turn in different directions on client and server causing a desync
    
-   Gameplay Effect / Engineering: Gameplay Effect Handles are now no longer removed from the global map while the Gameplay Effect is locked. Instead they will now be removed while handling pending removes after the Gameplay Effect is no longer locked.
    
-   Mover examples: Fixing up some animations that were causing load warnings
    
-   Fix the Add Gameplay Tag window to correctly show tag sources (it would randomly fail before). Also improve the window to handle filtering by name
    
-   FixedEditor Crash when adding components to a Editor Only BP Actor
    
    -   Iteration over child nodes didn't have sufficient safeguards for any entry removal. After calling FactoryCreateInheritedBpSubobject, we need to ensure that the iteration index is still within bounds.
        
-   Mover: Fixing FindMovementModifier to search through queued modifiers in addition to active ones
    
-   Moved the call of UWorld::OnActorSpawned to FinishSpawningActor so that we can be certain the Actor is fully initialized before that event is broadcast.
    
    -   Previously, spawning an Actor through Blueprints would cause this OnActorSpawned to trigger between the first call of a Deferred Actor Spawn and the FinishSpawning call, meaning that the listener would receive a half-initialized AActor.
        
-   Gameplay Ability System: Initial OnRep\_SpawnedAttributes from DefaultStartingData no longer clears attribute aggregators for already replicated ActiveGameplayEffects. This fixes a bug where client-side attributes will have the wrong value when modifiers are applied before the first time SpawnedAttributes are replicated over from the server.
    
-   \[GAS\] Fixing up an issue where the Blocked Ability Tags HasAny checks were transposed, thus doing logic such as "A".HasAny("A.1") would return false, when in reality, the old logic was "A.1".HasAny("A") and it should return true.
    
-   Mover: Fixed issue with Velocity input only being used to calculate direction input. It now is taken into account and Mover tries to match the velocity given its own constraints.
    
-   Correctly unregister actor tick functions when streaming out sublevels, these were previously getting freed on the next tick when it couldn't find the actors
    
-   \[Bugfix\] Correct the bit value of EMoveComponentFlags::MOVECOMP\_CheckBlockingRootActorInIgnoreList (from 10110 to 10000)
    
-   Mover: Fixing NetSerialize issue with JumpTo layered move where jump rotation was only synced when bUseActorRotation was true
    
-   Fixing an issue where the Visual Logger does not work with Immersive mode.
    
-   \[GAS\] Adding back the explicit call to AreAbilityTagsBlocked so that users can continue to choose to override that function rather than DoesAbilitySatisfyTagRequirements. I also added some better logging to figure out why an ability was not activated properly.
    
-   Fix tick dependency bug where if a tick function with an early start and end group depended on a function with an early start but a late end group, it would deadlock forever. With this change it now defers the end group separately from the begin group
    
-   Cine Camera: The Camera Rig rail's display now properly shows the last loop when Closed Loop is enabled
    
-   \[GAS\] When we're destroying an Actor that owns an AbilitySystemComponent with an active Gameplay Ability, it's possible that we will miss the FGameplayAbilitySpec::PreReplicatedRemove. In order to ensure we get a proper EndAbility call, let's force the Cancellation of the Ability using a Replicated RPC. This RPC is guaranteed to execute before the destruction of the Gameplay Ability Instance.
    
-   \[GAS\] - Fixed loading invalid or deleted attributes in Blueprint.Now provides a warning when loading. reassigning invalid or deleted attributes in Blueprint doesn't crash.
    
-   Actor Spawning: FActorSpawnParameters::bNoFail has more coverage of upgrading spawn collision handling method to a spawning one. Before it would ignore spawn collision upgrading for some settings of SpawnCollisionHandlingOverride + SpawnCollisionHandlingMethod but not others.
    
-   Fixed loss of precision in UKismetMathLibrary FTimeSpawn functions taking or returning float when they should use doubles. Modified from contrib #13055.
    
-   \[GAS\] GameplayEffectSpec::GetPeriod() will always return NO\_PERIOD if it has instant duration policy, fixing GameplayEffect prediction for instant effects that had duration data.
    
-   Mover: fix bugs where an actor could violate the min/max distance it's supposed to float above walkable floors
    
-   Improved Character movement floor check code when we have a valid walkable floor hit result but no PrimitiveComponent, which happens with SG meshes.
    
-   Mover: changing init flow so that all movement mechanisms are ready before BeginPlay, alleviating the need to wait
    
-   Chaos Mover: Fixing floating point precision error in ChaosMoverStateMachines's fixed delta time calculation
    
-   Mover: Finding a movement modifier by handle and by type now searches through the queued modifiers on the Mover State Machine as well. Fixes an issue where modifiers weren't found immediately after queuing them.
    
-   Mover: fix issue with navmesh movement to refresh floor information after teleportation
    
-   Mover: Initializing the Mover mode state machine earlier so it can be used in backend initialization if desired
    
-   Mover: changed "remain vertical" behavior to be enforced at in all default movement modes' simulation functions, so that other motion contributors don't need to be aware of the setting
    
-   Mover: fixed bad local-to-world root motion conversions when multiple axis rotations were involved
    
-   Removed "transient" from CMC server properties allowing client authoritative position. Typically they are dynamically set at runtime but this now allows them to be globally set and saved as intended, since they are editable.
    
-   Mover: Fixing floating point precision error in mover's fixed delta time calculation
    
-   Mover: fix bug in standalone backend where the time step was being truncated
    

#### Mass

**New:**

-   Added a way to clear out specific tag requirement from FMassFragmentRequirements
    
-   Added a way to fetch FMassISMCSharedData indicated by an ISM component
    
-   Allow Mass phases to run outside the game thread
    
-   Change LogMassBehavior to be UE\_VLOG\_ALWAYS\_UELOG (not just vlog anymore).
    
-   EntityBuilder can now be used when IsProcessing == true - the appropriate command will be issued instead of synchronized creation
    
-   Debugger processor view overhaul
    
    -   Added resource usage highlight to debugger processor view
        
    -   Added "Go To Code" button to processors in the Mass debugger
        
-   Improved MassEntityView so that it can detect if the stored data is still correct (i.e. whether the underlaying archetype/chunk has changed)
    
-   Made Mass subsystems ini-configurable via DefaultMass.ini
    
-   Mass State Tree changes to support creating dedicated dynamic processors per-ST-requirements
    
-   Introducing TypeInfoManager, where we store type traits so that Mass can deduce things about accessing data at runtime. We use this to determine whether a subsystem dependency expressed at runtime with a TSubclassOf is gamethread-only.
    
-   Added support for adding and removing shared fragments via FMassEntityManager::AddCompositionToEntity\_GetDelta and FMassEntityManager::RemoveCompositionFromEntity, respectively.
    
-   Added the ability to retrieve all archetype handles that match a Mass query.
    
-   Added Entities list to Mass debugger
    
    -   Added real-time entity fragment data inspection to mass debugger
        
    -   Added fragment entity-specific write breakpoint support to mass debugger
        
-   \[MassGameplay\] Made entity-spawning functions of MassSpawnerSubsystem return the creation context so that the call-sites have some control over when the accumulated commands and observers get executed.
    
    -   This new functionality is utilized in \`UMassAgentSubsystem::HandlePendingInitialization\` where entity views are being created with an assumption that the entities being processed had not changed their archetypes just after spawning.
        
    -   This assumption can be invalidated with entity creation observers changing entity's composition with commands that get flushed as soon as the creation context gets released.
        
-   Introduced the concept of debug-time "color" to MassArchetypeData. Used by \`mass.debug.DrawAllEntities\`.
    
-   Improved Mass processor dependency cycles detection and reporting
    
-   Added a new entity collection type, that can store an arbitrary array of entity handles, that can be then efficiently passed to the EntityManager's Batch API via the FMassArchetypeEntityCollection array the type caches and can rebuild to make it up-to-date.
    
-   The change makes MassProcessingContext capable of creating properly configured FMassExecutionContext instances, as well as hosting one and cleaning up when going out of scope. Simplified logic for commands flushing at the end of processing.
    
-   Updated MassGameplay category in GameplayDebugger to handle more fragments as optional.
    
-   Added a concept of "ActivationState" for Mass processors. These are Active, OneShot and Inactive. Processor CDOs can also be configured (via project settings or DefaultMass.ini) which affects all instances created after that point.
    
-   Changes to how MassDebugger collects its information about processors. Now everybody can register as a provider of processors! The collected processors are also nicely grouped in the Processors View.
    
-   Mass can now optionally auto-balance parallel queries. This comes at a slight scheduling overhead, but can improve performance for processors that don't have even performance for all their chunks.
    
-   Made instances with settings of MaxActorDistance == 0 never hydrate, including as a response to physics queries. This makes never-hydrating InstancedActors a lot cheaper. The new feature is disabled by default and is controlled by IA.EnableCanHydrateLogic console variable.
    
-   Reduced the cost of setting the debug execution description in Mass. This change also introduces the ability to selectively turn debug features on/off through a central flag on a per entity manager basis.
    
-   Minor modification to how a MassProcessor can declare it doesn't want to be pruned based on queries - no longer needing to override ShouldAllowQueryBasedPruning
    
-   Added debug per-entity and per-processor breakpoint support
    
-   Made FMassProcessingPhase.bRunInParallelMode \`true\` by default.
    
    -   Also switched application of changes to \`mass.FullyParallel\` from taking place in FMassProcessingPhaseManager::OnPhaseEnd to FMassProcessingPhaseManager::OnPhaseStart
        
-   EntityBuilder extension:
    
    -   Can use pre-reserved handles now
        
    -   Can seed a builder instance with composition and values of an existing entity
        
    -   Can append composition and values of an existing entity to the builder
        
-   Added Breakpoints list to Mass Debugger
    
-   Made it thread-safe to register and unregister dynamic processors. It's also allowed while the Mass processing is underway now.
    
-   Added ability to Pause and Resume a Mass Simulation
    
-   Added Mass trace channel for MassEntity Unreal Insights plugin
    
-   Introducing "versioned" archetype handle, that will become "out of date" when the target archetype goes through changes that change the ordering of the hosted entities (essentially removing entities or compaction)
    
-   Added a way to export actual entity handles from FMassArchetypeEntityCollection.
    
-   Made debug-time requirement access detection by entity queries a bit more automatic (with a scoped "detector") which fixes an edge case of not cleaning up the detection on failed \`FScopedEntityQueryContext\` initialization (can happen when required subsystems are missing, for example).
    
-   \[Added functionality that creates EntityBuilder instances configured in-bulk with provided data. This functionality is then used to create a FMassEntityTemplateData function that spits out a builder configured with template's data.
    
-   Extension to FMassArchetypeEntityCollection's functionality. It's now possible to compare two collection's archetype handles and append one compatible collection to another.
    
-   Introduced ExecutionPriority for MassProcessors that is used to position the given processor (and its dependencies) earlier in the processing graph (modified with mass.dependencies.ProcessorExecutionPriorityEnabled)
    
-   Changed how \`WITH\_MASSENTITY\_DEBUG\` is defined so that it's possible to disable it on a per-project basis without modifying engine code.
    
-   Improved detection and reporting of LODCollector class issues with LODCollectorTraits
    
-   Added a way for Traits to remove tags from FMassEntityTemplateBuildContext. It comes with full editor-time explanation when a needed tag has been removed (via the validation tool).
    
-   Added type-safe, simplified Mass Query/Processor API with MassQueryExecutor
    
-   Mass Command Buffer can automatically lock observers execution to improve batching of "Add" operation observers. Disabled by default, controlled by \`mass.commands.LockObserversDuringFlushing\` console variable (can be set via ini file too).
    
-   New way to fetch fragment views from ExecutionContext has been added. It lets users fetch the view as a view to some base class, while providing the actual fragment's type with a UScriptStruct pointer.
    
    -   Note that the provided UScriptStruct type must have been declared as query's requirement for the operation to work.
        
-   EntityBuilder for procedural entity configuring and spawning.
    
-   Archetype/entity grouping: Added capability to group entities/archetypes with groups created at runtime. Groups can be used by EntityQueries to control the order of archetype processing. An example of when that could be useful would be a hierarchical structure where parents get processed before their children. Current limitations:
    
    -   Supported only in non-parallel ForEachEntityChunk approaches.
        
    -   No way to create entities with groups assigned at the very start - can only group entities after their creation (resulting in additional archetype creation and entity move).
        
    -   Grouping is not "observable" via MassObservers.
        

**Bug Fix:**

-   Added MT access detector in MassSignals for delayed signals and replaced calls to DelaySignalEntity by DelaySignalEntityDeferred to fix threading issues
    
-   Fixed Mass debug FAgentDebugVisualization wire shape visualization, should work again.
    
-   Fixed a bug in how FMassArchetypeEntityCollection::FArchetypeEntityRange.Length == 0 is treated - the comments (and the design) say it means "all the entities in the chunk starting at index SubchunkStart", while only FMassArchetypeData::ExecutionFunctionForChunk was actually respecting it.
    
-   Fix crash when debugging Mass entities due to inverted range.
    
-   Fixed inconsistencies in MassEntity's shared and const shared fragments-related API. The change also significantly reduces code duplication in the related code. The change fixes a flaw in existing API allowing calling ForEachSharedFragment on FMassConstSharedFragments which in turns let them modify the instances, which is conceptually wrong.
    
-   Fixed UMassSimulationSubsystem's editor-time event handles still being active after the subsystem has been Deinitialize-ed. The bug resulted in UMassSimulationSubsystem::StartSimulation being called upon PIE end even if the given subsystem instance has already been deinitialized (for example due to the editor world's reinitialization, like after geometry rebuilding).
    
-   Made UMassSceneComponentLocationToMassTranslator gamethread-only to sidestep data races when the engine updates components' transforms.
    
-   Fixed FMassObserverManager::Initialize stomping any observer processor instances registered beforehand via FMassObserverManager::AddObserverInstance
    
-   Marked the movement and orientation translators as "gamethread-only" to avoid data-race with the UObjects being touched by the translators.
    
-   MassLOD: Use Correct \`bLocalViewersOnly\` Setting
    
    -   The change makes listen-servers behave the same as dedicated servers when considering Mass LOD Viewers (i.e. considering all viewers, not just the local ones).
        
    -   The change also makes Standalone games use the same path, which doesn't make any difference since there are no non-local viewers in that scenario.
        
-   Fixed MassAgentComponent trying to register with the agent subsystem in inactive worlds
    
-   Regenerating entity config GUID when copy-pasting MassAgentComponent-owning Actor into a scene in the Editor
    
-   Fixed a bug in FMassEntityManager::MoveEntityToAnotherArchetype resulting in observers not being triggered.
    
-   Switched UMassDebugVisualizationComponent from using HISM components over to ISM components. This change fixes issues with DebugVisualization trait.
    
-   Calls to FlushCommands after entity manager deinitialization are now gracefully handled
    
-   UMassCapsuleTransformToMassTranslator are now marked as "game-thread only" to avoid data races when the observed component is modified in game thread as the data is being accessed by the processor
    
-   InstancedActors Project Settings Fixed to apply changes on every engine load or change via editor's UI. The change also fixes the bug that was causing the editor's "Convert To IA" option to not use the settings-indicated subsystem.
    
-   Fixes to standalone-game IA use cases by properly talking to ServerInstancedActorsSpawnerSubsystem, which fixes some IA representation issues. fixes to ServerInstancedActorsSpawnerSubsystem's to call \`FinishSpawning\` actors only once their IAComponent has been configured.
    

**Deprecated:**

-   Deprecated some of the MassObserversManager API in preparation for the larger observers change. This change affects only people that called MassObserverManager's functions directly, which the user shouldn't need to do.
    

#### Networking

**New:**

-   Implemented FConnectionHandle which carries both parent connection and child connection information. This can be useful for APIs where it's important to keep track of child connections as well, such as in split screen code.
    
-   Iris - Ensure fully push based classes remain so. The classes known to be fully push based are manually configured in DefaultEngine.ini via the ReplicationStateDescriptorConfig.
    
-   Iris - ReplicationDataStream runtime togglable debug features.
    
    -   Cvar net.Iris.ReplicationWriter.WriteBatchSizePerObject 0/1 controls whether sizes are sent per object or not rather than just one size for an object batch. This allows the reader to more quickly detect bitstream overflow and underflow errors.
        
    -   Cvar net.Iris.ReplicationWriter.WriteSentinels 0/1 controls whether sentinels are injected at a certain point in the object replication to more quickly detect errors within a single object.
        
    -   The cvars can be changed at any point in time and both the reader and writer will adjust accordingly. Different build configurations are still 100% compatible with each other but the code to handle the debug features is compiled out in shipping.
        
    -   If a non-shipping executable is connected to a shipping executable the non-shipping executable will cause a disconnect of the shipping executable if any of the debug features are enabled.
        
-   Iris - NetBitStreamReader substream support.
    
-   \[Replay Subsystem\] Added GetReplayTotalTime function to the ReplaySubsystem.
    
-   Iris - Don't send state with subobject destroy. Behavior can be controlled via cvar net.Iris.AllowSendStateWithEndReplicationForSubObjects which defaults to false.
    
-   Iris - Added delegates for when a valid connection is added and removed to the ReplicationSystem
    
-   Added ForAllExclusiveBitsByPredicate to FNetBitArray and FNetBitArrayView. This makes it easy to iterate over the same pair of bitarrays multiple times using different conditions for when to invoke the exclusive bit functors.
    
-   Iris - Implemented AlwaysRelevantNetObjectFilter. When you want to be more explicit about something being always relevant rather than configuring the class to a None filter.
    
-   Iris - Handle object hierarchy destruction atomically. Limit the number of objects and destruction infos sent per frame using the new cvar net.Iris.ReplicationWriterMaxDestroyObjectsPerFrame which defaults to 150.
    
-   GameModeBase DispatchPostLogin has been deprecated and the behavior was moved to OnPostLogin, so subclasses can override it.
    
-   Iris - Added command Net.Iris.PrintDynamicFilterClassConfigIssues with options SkipBPIssueDetection and SkipActorChildIssueDetection. I
    
    -   t will report filter configured classes that cannot be found and potential issues with unconfigured subclasses that aren't being filtered as their parent.
        
    -   SkipBPIssueDetection will not report filtering issues for blueprint classes.
        
    -   SkipActorChildIssueDetection will ignore reporting potential issues for classes whose nearest configured super class is Actor.
        
-   Added support for recording CSV stats in AActor::ForceNetUpdate and AActor::FlushNetDormancy. Recording is only enabled in Non-Shipping builds and when compiling for Dedicated servers only.
    
    -   The new CSV Categories (Actor\_FlushNetDormancy and Actor\_ForceNetUpdate) are disabled by default.
        
    -   By default we record the NativeParentClass name of the Actor.
        
    -   The CVar: net.Debug.ActorClassNameTypeCSV, controls which type of class name to record:
        
        -   0: Record the Parent native class name of the given Actor
            
        -   1: Record the TopMost non-native class name of the given Actor
            
        -   2: Record the Actor class name
            
-   Replication:
    
    -   Allow actors to opt-in to full init state replication by settting FOutBunch::bOutWantsFullInitState in their OnSerializeNewActor
        
    -   This causes ALL replicated properties to be sent even if they are identical to the Archetype/CDO of the replicated object
        
    -   Can be used to fix issues where the authority sets the replicated value of a loaded (stable) actor back to the CDO value.
        
    -   In non-iris replication this prevents the client from receiving the replicated value and causes a divergence between each.
        
    -   EngineNetTest:
        
        -   Added UnitTest Net.Engine.InitState showing the issue and the fix.
            
-   Replicated UProperties no longer need to register themselves via DOREPLIFETIME in GetLifetimeReplicatedProps.
    
    -   Now unregistered properties will be replicated using default settings.
        
    -   This simulates the default behavior when Iris is enabled
        
    -   Revert to the previous behavior of not replicating missing DOREPLIFETIME by setting Net.AutoRegisterReplicatedProperties=false
        
    -   You can now also ensure when unregistered properties are detected with Net.EnsureOnMissingReplicatedPropertiesRegister=true
        

**Bug Fix:**

-   Iris - Don't ensure on clients ending replication on actors due to a level being streamed out.
    
-   Iris- Fixed FieldOfViewNetObjectPrioritizer issue causing incorrect priorities at view positions other than origin.
    
-   Network Insights - Display all HugeObject packet contents.
    
-   NetDriver
    
    -   Fix memory leak if a PIE session is stopped while the PendingNetGame is still active
        
-   Fix seamless travel crashes by explicitly clearing the network object list during the transition to make sure nothing from the old world is still there
    
-   Fix crash when receiving NMT\_JoinSplit with unique net ID V2
    
-   NetDriver:
    
    -   Prevent crash when NetDriver destruction is triggered while NetDriver is ticking. Ex: Calling Shutdown from inside an RPC.
        
    -   Now NetDriver will wait until PostTickFlush to shutdown. Previously queued destruction request could also occur earlier in PostTickDispatch
        
-   Iris - Fixed a few cases where we did not properly propagate HasPushBasedDirtiness. Make sure function descriptors are marked as push based. This is a small polling performance optimization.
    
-   Fix ForkProcess logs and log the timestamp at which the fork signal event was received
    
-   Iris - The Net.Iris.PrintAlwaysRelevantObjects console command now includes objects filtered through AlwaysRelevantNetObjectFilter.
    
-   Iris - Don't clobber not replicated properties when applying instanced structs.
    
-   Iris - Fix issues with owning connection information and replication conditionals not always being correct under rare circumstances. Prior to this fix tear off might not have replicated some updated properties due to the incorrect information.
    
-   Iris - Structs with custom serializers with Apply will now prevent the AllMembersAreReplicated trait from being added to the ReplicationStateDescriptor. Prior to this fix Apply weren't being called in some cases.
    
-   Iris - Fixed ensures related to tear off and object scope changes.
    
-   Fixed some rare crashes during replay recording.
    
-   Iris - Update autonomous role replication condition as part of updating the owning net connection, regardless whether it's to be enabled or disabled. Fixes issue with for example COND\_SimulatedOnly properties not replicating to the former autonomous proxy connection when unpossessing a pawn.
    
-   Iris - Fixed bitstream errors with blueprint implemented interfaces.
    

### Learning Resources

#### Sample Content

**Bug Fix:**

-   Updating templates that weren't setting r.AllowStaticLighting to either False or True, to r.AllowStaticLighting=False
    

### Level Design and Art Tools

#### Geometry Core

**New:**

-   Added a bitflag enum to the mesh transform methods, so the caller can specify which attributes should be transformed
    
-   Add optional 'sculpt layer' feature to Dynamic Mesh attribute sets
    
-   Made convex decomposition produce a decomposition for planar inputs, by applying the 'thicken on hull failure' pass to the input mesh
    
-   Added a new cluster-based simplifier, based on mesh edge-graph Voronoi connectivity, for quick simplification of large meshes.
    
-   Add dynamic mesh overlay / attribute set methods to test if a vertex is on a seam intersection
    

**Bug Fix:**

-   Added optional thickening/inflate parameter to FitKDOP3, and set default to .1, to match previous KDOP fitting behavior and guarantee that flat shapes still generate valid KDOPs. This fixes an ensure and collision generation failure on asset import.
    
-   TAxisAlignedBox3: fix for implicitly converting an Empty box into an Infinite box
    
-   Fixed TDynamicMeshOverlay::GetElementIDAtVertex to be more robust to unset triangles in the overlay
    
-   Made dynamic mesh overlay more robust to the case where a seam edge is flipped (e.g., due to not setting constraints correctly before remeshing)
    
-   Made dynamic mesh handle vertex attribute set changes more consistently
    
-   Fixed an issue with Dynamic Mesh serialization loading of meshes with disabled attributes
    
-   UDynamicMeshComponent::ApplyTransform: pass the VertexPosition and NormalsTangents flags to EditMesh. Avoids triggering an ensure in UDynamicMeshComponent::FastNotifyVertexAttributesUpdated
    
-   SparseMatrix: guard against integer overflow when computing how many entries to allocate
    
-   Fixed parameters mappings in the ftetwild wrapper code, so scaling field and ideal edge length parameter should now work as expected
    
-   Fixed a crash in DynamicMesh's 'compact in place' method when the mesh has zero triangles
    
-   GeometryCore: Fix a crash in FDynamicMeshAttributeSet::CompactInPlace due to compacting the same skin weight attributes twice. SkinWeightAttributes are also RegisteredAttributes so just compacting the RegisteredAttributes should take care of it
    
-   Made point hash grid / scale indexing clamp the cell size above zero, since a zero cell size will not work. Also changed the radius search to a <= test, so it will find exactly coincident points when using a zero-radius search.
    
-   Fixed crash in implicit morphology offset operation when offset grid dimensions overflow int32
    
-   Made mesh surface point sampling more robust to inputs w/ very small bounds
    

#### Geometry Script

**New:**

-   Added more edge selection methods to geometry script
    
-   Cleaned up various geometry script methods display names, and added keywords to make nodes easier to find
    
-   Exposed point set component to blueprint (equivalently to line set component)
    
-   Added a new geometry script macro to iterate over the valid polygroup IDs in a mesh
    
-   Added additional mesh polygroup query functions for polygroup bounds, uv bounds, and uv centroid
    
-   Added selection-based version of geometry script flip normals method
    
-   Added box2d bounds overlap method to geometry script w/ support for testing for overlap in a wrapped \[0, 1\] space (for testing for UV overlap)
    
-   Added geometry script nodes: "Add Named PolyGroup Layer" and "Find Extended PolyGroup Layer By Name"
    
-   Exposed the optional Dynamic Mesh sculpt layers attribute to geometry script
    
-   ScriptableTools: Make the gizmo respect the "scale uniform" flag, and add the free translate and rotate flags so that uniform scale, arcball, and screen translation can be used.
    
-   Added InverseTransformMesh and InverseTransformMeshSelection methods to geometry script
    
-   Added capsule fitting as option in convex hulls -> simple collision geometry script fitting method
    
-   Added a new TransferMeshUVsByProjection geometry script method to transfer UVs from a source mesh to a target mesh by projection along a direction
    
-   Added control over whether lightmap UV generation is enabled in the build settings of a target LOD when updating a static mesh via geometry script. Defaults to copying the existing setting, or LOD 0's setting if the target LOD doesn't exist yet
    
-   Added a vertex-overlap-based split mesh method to geometry script, matching the one in modeling tools
    
-   The CopyMeshFromComponent geometry script method now also supports Geometry Cache components
    
-   Added option for geometry script 'voxel' functions (solidify and offset) to operate with caller-specified bounds rather than the input mesh bounds
    
-   Added geometry script methods to sort an array of meshes, optionally either by volume, bounds volume, surface area, or by a second array of float values
    
-   Added a mesh isocurves algorithm for cutting a mesh by marching triangles on a function over the vertices
    
-   Added world context object version of the geometry script "Create New Volume From Mesh" method
    
-   Add directional scaling options to convex decomposition tolerance, so decomposition can require more accuracy e.g. on floors vs ceilings
    
-   Added uniform random mesh sampling methods
    
-   Added a method to clear a UV channel
    
-   Added geometry script methods to merge mesh vertices -- either a pair of specific vertices by index, or closest pairs in two selections of vertices
    
-   Added support for applying nanite settings in Geometry Script's Skeletal Mesh asset update/creation methods
    
-   Added geometry script support for more boolean operations: trim inside, trim outside, new polygroup inside, and new polygroup outside
    
-   Added option to choose the output space for geometry script mesh booleans
    
-   Added an editor-only node to run the 'UE Standard' mesh simplifier in geometry script
    
-   Added height map bake support to the BakeTexture and BakeVertex nodes.
    
-   Added GutterSize to the BakeTexture node.
    
-   Allow key capture behavior to notify its target of a forced end capture, and expose this in scriptable tools. Also fix a bug with multi key behaviors incorrectly triggering release callbacks after the first time all keys were pressed.
    

**Bug Fix:**

-   Geometry Script's AppendBoundingBox method now does not attempt to append invalid (e.g., empty) boxes
    
-   Added a missing null pointer check to geometry script set simple collision on static mesh function
    
-   Fixed an issue where a skeletal mesh LOD written by geometry script could have incorrect materials -- we now clear the LOD material remapping when setting up new materials on skeletal mesh LOD
    
-   Made dynamic mesh component broadcast the property changed event for dynamic mesh changes
    
-   Added an error message for scene component conversion failing due to an unsupported component type
    
-   Fixed the split mesh by polygroup and split mesh by material ID geometry script methods not ordering the returned IDs in the same order as the split meshes.
    
-   Fixed the 'preserve vertex positions' flag in the geometry script simplify nodes, which previous was not used
    
-   Added a guard against infinite recursion or adding-to-loop-while-iterating issues when generated dynamic mesh actor adds new actors or triggers rebuilds of actors inside its own rebuild
    
-   Fixed simple polygon query functions not returning their computed results, and clarified display names for different Polygon Area geometry script methods
    
-   Changed the dynamic mesh component log message category from 'display' to 'warning' when it is refusing to generate complex collision for a too-large mesh, to make it a bit easier for people to see why their mesh isn't getting collision in this case
    
-   Fixed CreateVolumeFromMesh in editor to use actor factories to ensure that the Brush is correctly assigned to the resulting actor.
    
-   Fixed a dynamic mesh component crash when the mesh is non-compact and the complex collision physics mesh is built with UV hit result support
    
-   Fixed an issue where the material slot names would not be properly copied over when copying a dynamic mesh to a skeletal mesh.
    
-   Fixed output param display name for the GetMaxMaterialID node.
    

**Deprecated:**

-   Deprecated dynamic mesh component's distance field support. For lumen support with dynamic mesh, use hardware ray tracing instead.
    

#### Landscape

**New:**

-   Disabled Retopologize tool button when unsupported.
    
-   Landscape error reporting improvements :
    
    -   Removed erroneous "unsynchronized landscape properties" map check error when fixing up unused edit layer data only
        
    -   Unified post-load fixup map check messages to display the landscape proxy's actor label (rather than its package path) and let the the user fix the problem by clicking on a "Save Modified Landscapes" token
        
-   Added proper material compilation error when reaching the max number of landscape physical material outputs
    
-   Optimization for landscape sculpting. Add ParallelFor to ULandscapeComponent::UpdateCachedBounds and ComputeMipToMipMaxDeltas.
    
-   Small optimization for landscape sculpting. Faster version of generating the material index array for the UseDefaultMaterialOnly case in WriteRuntimeData.
    
-   Disable TAA when in landscape mode : landscape brushes don't play well with temporal algorithms
    
-   Added console command to force rebuild of landscape physical material data. landscape.RebuildPhysicalMaterial
    
-   Landscape edit layers batched merge :
    
    -   Fixed edit layer BP brushes that would not get disabled by their parent layer's visibility state when using batched merge, unlike global merge
        
    -   Fixed weightmap alpha not being properly applied to edit layers
        
    -   Optimized renderer / render item analysis
        
    -   Fixed some confusion around CanAffect/Affects for BP brushes
        
    -   Fixed performance issue with BP brushes by trying to use intermediate (scratch) render targets of constant size from one batch/one run to another (instead of using only the size necessary for a given batch). This avoids calling Initialize repeatedly (which is very inefficient in the case of the water brush, for example, as it flushes all cached render targets)
        
    -   Fixed landscape patch manager not supporting the individual "enable heightmap/weightmap/visibility" toggles
        
-   Added Landscape Spline scale and z-offset variables configurable in project settings to improve Spline icon visibility
    
-   Expose ReadOnly blueprint access for HeightTextureAsset and HeightEncodingSettings in LandscapePatchComponent
    
-   Refactored the landscape edit layer renderer API to be able to run via a minimal amount of render commands (and FRDGBuilder)Fixed crash with water brush when running with batched merge due to an uninitialized BP brush render target size
    
-   Added Landscape Spline linear path navigation and selection controls. Navigation controls include Select First/Last, Prev/Next, Add Prev/Next to selection, Select All/NoneNew button to convert selection between spline control point and segment mode
    
-   Landscape Editor - Paint
    
    -   Added Create Layers From Assigned Materials new workflow with Auto-Fill layers button
        
    -   Create Layers From Assigned Materials creates layers but no longer auto selects Target Layer Info Assets
        
    -   New Auto-Fill Target Layer Assets button opens a dialog allowing users to find or create new assets based on the Default Target Layer Asset Path
        
-   Landscape Paint
    
    -   Added Rename option to target layer quick action menu
        
    -   Refactored action menu to show disabled states
        
    -   Automatically select/rename new target layers on creation
        
-   Deprecating SDragAndDropVerticalBox::CanAcceptDrop. Adds new CanAcceptDrop with a slot index parameter.
    
-   Made water body exclusion volumes not spatially loaded by default as they tend to be costly when spawned dynamically
    
-   Removed auto-filling of empty landscape target layers : this is purely arbitrary as it will almost never be the user's intention to fill a layer with a fully painted layer.
    
-   Added option for landscape sculpt and erase tools to apply only when moving the brush.
    
-   Landscape Editor - Blueprint Brush UX updates
    
    -   Disables tool for edit layers that don't support blueprint brushes
        
    -   Moved Blueprint Brush Tool from the Paint/Sculpt panel into the Manage panel
        
-   Landscape Paint - Show unique thumbnail for target layers not referenced by any landscape proxy material
    
-   Added option for landscape BP brushes to tell if they require power-of-2 render targets to operate.
    
-   Fixed landscape target layers UX refresh issues
    
    -   Added info message to explain to the user that all the landscape's target layers are hidden (either by the "Hide unused layers" filter of by the filter text box)
        
    -   Used a standard show/hide icon button to the "Hide unused layers" toggle button" in order to help the user understand the status of that filter
        
    -   Allowed drag and dropping target layers even when the "Hide unused layers" filter is active
        
-   Landscape mode : display the level instance prefix when editing a landscape that is inside the level instance being edited. This allows to distinguish between the world's landscape(s) and the edited level instance one(s) when they are named similarly
    
-   Small optimization for FHeightField::BuildGeomData and EditGeomData. Convert indirect callback function into inlinable plain lambda template param.
    
-   Optimization for landscape sculpt when many proxies are loaded.
    
    -   Don't lock UTextures for write when we know the data isn't changing.
        
    -   Avoids expensive ComputeChannelLinearMinMax and FIoHash for unchanged proxies at the end of the stroke.
        
    -   Most applicable with a large number of landscape proxies loaded.
        
-   Added debug color to physical materials, to have them maintain the same color from run to run and be tweakable by the user. Currently only supported by landscape collision display (with landscape.CollisionMesh.ShowPhysicalMaterial). Initialized with a random color.
    
-   Optimization for landscape sculpting. Bypass expensive serialization steps for collision data in the editor.
    
-   Cleanup Landscape Build commands:
    
    -   Added log at the end of each command, indicating how many landscape proxies were effectively processed by each
        
    -   Added additional log at the end of the actionable message-issued build command to indicate how many landscape proxy packages still need to be saved after the user has clicked on the "update/build" button
        
    -   Removed Build Physical Materials / Grass Maps / Nanite Only commands since they are all covered by Build Landscape and we should not need to run them individually
        
-   Detect re-entrant calls to UpdateLayersContent or other main entry points to add or remove layers during UpdateLayersContent.
    
-   Changed default landscape edit layer method to BatchMerge. landscape.EditLayersLocalMerge.Enable default value changed to 2.
    
-   Fixed crash when landscape proxies (somehow) end up with an invalid root component. It's unclear how this can happen but the landscape collision heightfield component failed to survive this as it would contain a Chaos heightfield with an invalid heighfield geometry. On top of this, we now try to re-assign a root component if we find that it's missing from the proxy on load
    
-   Added project setting to disable landscape target layer thumbnails. Because of how the thumbnail renderer is implemented, this can cause several hiccups at the moment (synchronous GPU readbacks) and the thumbnails are not working well anyway because of the RVT usage in the landscape material, so this setting represents an easy kill switch
    
-   Landscape Editor - Create New Tab
    
    -   Added auto-fill button for target layer info assets
        
    -   Hid Layers/LayersBrushStack sections when creating new landscapes
        
-   Improvements to landscape thumbnail renders:
    
    -   Don't bother generating landscape thumbnail MICs if the option is disabled and display a generic layer icon instead
        
    -   Optimize landscape thumbnail material generation
        
-   Added separate blend step for landscape edit layer renderers. This moves the blend step into a separate, standardized blend step, which allows to apply blend methods in a way that works across renderers
    
-   Automatically migrate legacy LandscapePatchManager setups to the new system when a scene is loaded. Can be disabled by setting "LandscapePatch.AutoMigrateLegacyListToPrioritySystem=0".
    
-   Updating various Landscape Editor icons including Landscape Paint, Sculpt, Visibility, Auto-Fill Layers, Create Layers From Materials, and Landscape Spline icons.
    
-   Made autosaves faster by not forcing a build of landscape nanite.
    
-   Adding Transaction support for Landscape Spline selection and navigation. Modifications to the landscape spline selection are tracked and supported by Undo/Redo transactions.
    
-   Improved undo performance for large landscape changes
    

**Bug Fix:**

-   Fixed wrong warning when importing landscape weightmap from 8bit source image. Prevented cached result from attempted 16-bit import from preventing the 8bit attempt from running at all.
    
-   Fixed target layers filter not appearing when no target layer was selected
    
-   Fixed landscape heightmap import in expand mode when the target region extends outside the landscape.
    
-   Fixed landscape heightmap export tile filenames when regions are not loaded. Hide UI control for export mode (loaded-only vs all) when export is selected, where it has no effect.
    
-   Fixed crash with landscape edit layers batched merge
    
-   LandscapePatch: Fix external texture asset patches slightly aligning incorrectly due to using incorrect resolution for coverage calculation. Existing instances that used an external texture asset should be checked and resaved. LandscapePatch.UseExternalTextureAlignmentFix can be set to 0 to revert to old behavior temporarily if needed.
    
-   Fixed checkSlow when building Nanite landscape with visibility
    
-   Fixed crash when showing collision mesh after a material asset fails to load.
    
-   Update the physical material mask correctly when unpainting or clearing a landscape target layer.
    
-   Fixed landscape proxy marked as "not using edit layers" when using the Add Component tool. This would then lead to non-edit layers->edit layers data migration on load, which would stomp the existing edit layers data, leading to a potential crash because of a missing weightmap texture. Also added a post-load fixup when this type of problem is detected
    
-   Fixed crash when destroying a landscape after an Undo
    
-   Landscape Editor - Stores persistent Landscape debug view mode to ensure debug visualization is not reset when opening and closing Landscape editor mode
    
-   Fixed regression with legacy weight-blending not being applied when using landscape edit layers batched merge
    
-   Fixed landscape weightmap import comparison vs heightmap resolution.
    
-   Fixed memory stomp when "reinitializing" heightmap or weightmap in landscape patches
    
-   Defensive fix for landscape (wrongly) assuming a root component is available (same approach as everywhere else in the code)
    
-   Fixed case where, in WP, the landscape heightmaps' FTextureSource could have an initialized mip0 (non zero) but zeroed-out mip1 and up, which would break the assumption that the texture hash (which is only based on mip0) is representative of all mips. Instead, we now make sure that when using edit layers, all mips are initialized to zero, so that the first GPU readback appropriately updates the heightmap
    
-   Fixed crash introduced in UE5.5 (likely happening following an undo, but also 100% repro when spawning a landscape actor via the BP Spawn Actor function)
    
-   Fixed race condition crash in landscape when async physics state creation is enabled
    
-   Prevent landscape components that render in an additional tool-specific pass from being occluded
    
-   Prevent performance warning related to calling FindConsoleObject too often in landscape
    
-   Prevented Water Body River component from greatly increasing memory usage in the editor with large landscapes.
    
-   Fix for disappearing water when hit proxy renders are those that trigger the water info texture render
    
-   Fixed assert in landscape on undo
    
-   Fixed ensure when analyzing the grass map count in parallel, but on the game thread
    
-   Fixed crash when unloading a map while landscape mode is active
    
-   Moved landscape visibility layer info asset to from EditorLandscapeResources to EngineResources so that it doesn't get stripped on cook when "Exclude editor content when cooking" is used
    
-   Fixed editor crash from importing heightmap images with invalid tile coordinates.
    
-   Fixed landscape heightmap import from tiled image set when file path contains brackets.
    
-   Fixed Build > Build Landscape dirtying the main level. The landscape proxies' outer is already properly dirtied if necessary and there's nothing in the persistent level that requires to be dirty (it's also not happening when using the in-viewport actionable notification)
    
-   Fix new Landscape offset not matching preview Landscape
    
-   Fixed up layer info objects that have been re-mapped to a new asset in the main landscape actor without re-saving all the associated proxies:
    
    -   In such a case, the layer name can be used to retrieve the new layer info object from the main landscape actor so we can do the fixup.
        
    -   Also, those layer fixups now mark the landscape proxy as "soft-"dirty (i.e. the landscape way of notifying the user that a re-save is needed) in order to make it more visible to the user that a user action is needed
        
-   Fixed assert/crash when trying to resolve a soft object ptr from BeginDestroy/FinishDestroy in landscape
    
-   Fixed landscape proxy holding references on some of its foliage components if those components are selectively removed
    
-   Landscape crash fixes
    
-   Fixed generating bad landscape physical material data after opening a map.
    
-   Added safety code to flush pending work related to landscape layers and physical material when saving.
    
-   Fixed undo on new landscapes (i.e. when they haven't been saved yet).
    
-   Added landscape project setting to prevent landscape mode from disabling Temporal Anti Aliasing. Some projects are just so noisy that the lack of TAA is too detrimental
    
-   Moved TargetDisplayOrder and TargetDisplayOrderList out of ALandscapeProxy and into ALandscape. This is just a UI setting that doesn't need to be duplicated to all streaming proxiesFixed landscape thumbnails disappearing anytime we unload a region
    
-   Fixed landscape splines always dirtying the proxies on load when they affect the weightmaps.
    
-   Prevented landscape edit layers merge context from automatically changing the RT state when cycling render targets.
    
-   Fixed crash in actionable message system when reloading a level without clicking Update.
    
-   Fixed grass map generation being stalled forever when one of the landscape actor of the map has no loaded components.
    
-   Fixed selection getting lost on landscape undo
    
-   Landscape Editor: Fixed a problem in where landscape editor UISettings weren't refreshing correctly when switching between different landscapes or maps
    
-   Moved creation of landscape nanite's UStaticMesh out to the game thread to remove danger of threading issues.
    
-   Fixed PCG refresh on undo/redo landscape painting.
    
-   Fixed bad ensure condition when trying to cache data from an empty area in the landscape smooth/flatten/erosion tools
    
-   Fixed crash if saving when landscape subsystem is not available.
    
-   Fixed race condition that could lead to invalid Nanite landscape static meshes on cook, breaking the entire Nanite streamer at runtime
    
-   Landscape Editor: Making Blueprint brushes non-placeable from the Place Actors panel. Brushes are only addable to supporting Edit Layers from the Landscape Blueprint brush tool.
    
-   Fix landscape crash when deleting a newly-created map containing a landscape from the content browser
    

**Deprecated**:

-   Cleaned up LandscapePatch public API
    
-   Declared batched merge APIs as experimental rather than internal
    
-   Removed deprecated/unused landscape grass CVar
    
-   Deprecated landscape's per-proxy setting for enabling/disabling heightmap compression. It's now only controlled by the per-platform CVar landscape.HeightmapCompressionMode
    

#### Modeling Tools

**New:**

-   Add tooltip for the status/help bar at the bottom of the editor.
    
-   Change some primitive creation tools to default to PerQuad, and make LatLong sphere PerFace mean PerQuad.
    
-   Updated the default Mesh Element Selection colors
    
-   Add an "isolate selection" option to the attribute paint tool.
    
-   Added a 'show target' option to the collision inspector tool
    
-   Add "isolate selection" option to vertex color paint tool.
    
-   Made tool target factories generate writable or non-writable targets depending on the source, so that e.g. users will not lose work running a modeling tool on an engine asset that the tool cannot modify.
    
-   InteractiveToolsFramework: Add support for hotkeys in tool extensions.
    
-   Added "Hit Back Faces" option to the modeling mesh element selection system.
    
-   Added height map bake support to the BakeVertex tool.
    
-   Added height map bake support the BakeTextures tool.
    
-   Added 'material ID' options to the generate polygroups tool
    
-   Added option to use new mesh cluster simplifier in the simplify mesh tool
    
-   Added alpha support for vertex color bakes in MeshPropertyMapEvaluator.
    
-   Added Mesh Element Selection controls to the viewport toolbar
    
-   Added an option to BakeVertex tool to reuse existing vertex color topology rather than always generating it.
    
-   Modify FEditor2DScrollBehaviorTarget to work in orthographic viewports
    
-   Refactor UBrushAdjusterInputBehavior to support any brush tool.
    
-   The following Modeling tools have been promoted to the Beta MeshModelingToolset plugin:
    
    -   DeformMeshPolygonsTool
        
    -   HoleFillTool
        
    -   PolygonOnMeshTool
        
    -   SimplifyMeshTool
        
    -   RemeshMeshTool
        
    -   WeldMeshEdgesTool
        
    -   RemoveOccludedTrianglesTool
        
    -   ProjectToTargetTool
        
    -   ConvertToPolygonsTool
        
    -   MeshGroupPaintTool
        
    -   MeshVertexSculptTool
        
    -   DynamicMeshSculptTool
        
    -   SmoothMeshTool
        
    -   OffsetMeshTool
        
    -   MeshSpaceDeformerTool
        
    -   LatticeDeformerTool
        
    -   DisplaceMeshTool
        
    -   AttributeEditorTool
        
    -   MeshAttributePaintTool
        
    -   MeshVertexPaintTool
        
    -   SkinWeightsPaintTool
        
    -   SkinWeightsBindingTool
        
    -   SkeletonEditingTool
        
-   Modified the default CollisionMode for new meshes to SimpleAndComplex.
    
    -   The previous default CollisionMode of UseComplexAsSimple was chosen to get a quick out of the box collision from generated meshes. Although this default works for out of the box collision, it does not work for physics simulations. It can be difficult to deduce why that is the case when you have collision.
        
    -   To make this easier to discover and more consistent with the rest of the engine, the default for new meshes is now SimpleAndComplex. Users can use the collision tools under the Attribs category of Modeling Mode to generate collision.
        

**Bug Fix:**

-   Fixed a crash when running MeshMapBaker.ComputeUVCharts on non-compact DynamicMeshes.
    
-   Fixed an issue where the level editor's scale snapping affected the UV editor's scale snapping
    
-   Disabled the ability to frustum select while in an active tool
    
-   Fixed an issue with ProceduralMeshComponent and DynamicMeshComponent that left behind ghost collision after clearing mesh sections w/ bUseAsyncCooking.
    
-   Fixed a crash on editor exit after using Mesh Element Selection
    
-   Ensured that a Mesh Element Selection is preserved after an incompletion or cancellation of the Path Extrude or Extrude Polygon tools
    
-   Ensured that the UV Snapshot tool could not be accepted until after its initial computation has been completedBug Fix: Improved clarity in the UV Snapshot tool by adding an indicator for when the tool is in the middle of computing
    
-   Fixed a deadlock that could happen on undo/redo of changes to static meshes with simple collision.
    
-   Made interactive tools context also log to console when displaying tool user info or warning messages, since it's easy for the tool messages to be lost (overwritten by other messages, or discarded on tool exit)
    
-   Fixed an issue where Symmetry was enabled by default in the MeshVertexSculpt tool.
    
-   Fixed an issue where the simple collision editor would not respect the local/world-space toggle for transforms. Controls for capsule and box dimensions are now provided via interval gizmos, instead of the transform scale.
    
-   Fixed an issue where free rotation could (rarely) get 'stuck' (due to the internal rotation representation being filled w/ NaN values)
    
-   Fixed erroneous tooltips for actions in the Edit Attributes tool.
    
-   Fixed PaintVertexTool displaying the wrong values in Unlit Vertex Color mode. Changed the default material mode in the PaintVertexTool to Unlit Vertex Color mode.
    
-   Fixed an issue with the PaintVertexTool applying double sRGB transformation on shutdown.
    
-   Fixed crash in selection system when operating on volumes due to converted volumes not matching the tool view (selection will currently still sometimes be incorrect, but will not crash).
    
-   The Displace tool will now prefer texture source data over platform data that will allow displacements to reference higher precision source data, when available.
    
    -   Added a bUsePlatformData (default: false) advanced setting if users prefer to exclusively displace using platform data.
        
-   Fixed some bugs in PolyGroup Edit extrusion and selection.
    
-   Bug Fix: Fixed a bug and crash that did not allow for the deselection of an Edge in Mesh Element Selection in some cases of using Undo/Redo
    
-   Fixed an issue where focusing the viewport in sculpt tools could focus on world origin.
    
-   Fixed "unknown brush type" warnings in dynamic sculpt tool when using kelvin brushes
    
-   Fixed a crash when accepting the Duplicate tool on a volume.
    
-   Fixed a crash when running the Subdivide tool using the Loop subdivision scheme on a volume.
    
-   Made sculpt tool more robust to operating on meshes with partially-set normals in overlay
    
-   Fixed an issue with the PivotActorTool that caused it to output generic actor names for actors with multiple components.
    
-   Fixed an issue in the Union tool so that all UV channels in the source meshes are now transferred to the result mesh.
    
-   Fixed a crash when swapping from Modeling Mode to Animation Mode with Motion Trails active.
    

#### Procedural

**New:**

-   Added a get subgraph/recursion depth node.
    
-   Cleanup now loads unloaded actors before cleaning up (disabled by default, will go wider on testing before enabling)
    
    -   Scale: this will eventually need to be replaced by proper cleanup of unloaded actors which doesn't require loading pcg.LoadManagedActorsForCleanup
        
-   Updated the Print String node to allow displaying messages without logging.
    
-   Find window now uses debug object context to search across the full execution scope. Update visuals and added options & filtering.
    
-   Added support for dynamic pins in the Merge node.
    
-   Added an Execution Dependency Pin to most nodes as an advanced pin (excl. Control Flow, Compact nodes, Input/Output, etc). This dataless pin can be used to force dependency and guarantee ordering to a degree across the graph. Ex. Ray Hit Query that needs to be executed after a Static Mesh with collision is to be spawned.
    
-   Added mouse click shortcuts, which are editable in user parameters, for spawning many common PCG nodes in the graph. Any additional PCG node can be added to the user settings .ini files to utilize this as well.
    
-   Added shape and line sweep support to World Raycast and World Ray Hit Query nodes. Created action aliases for various combinations in the search menu.
    
-   Add experimental GPU support for Attribute Partition node.
    
-   Added the option to convert some PCG nodes through the node right click context menu. Ex. Create Constant -> Graph Parameter.
    
-   Added template functionality to graphs (property) and added a dialog to create a graph from a template when at least one is found.
    
-   Add Element Count Multiplier setting to GPU output pins for 1:N expansions of data.
    
-   Added feature which actively releases GPU as soon as processing is finished to reduce peak memory usage during generation.
    
-   Updated metadata operations to support inline constant default values, directly editable on the node pins.
    
-   Added new Generate Seed node for more complex seed generation. Added Hash Attribute metadata operation for all hashable types.
    
-   Add frustum culling support to runtime gen scheduling policy.
    
-   Added multiple options, editable as user preferences for double clicking nodes: Inspect node on double-click (new default)Debug node on double-clickJump to Source Code (previous default)
    
-   Fix "Clear PCG Link"
    
    -   Do not attach Child stamps to original stamp as this breaks streaming (because of references)
        
    -   Instead place Child stamps into a folder
        
    -   In WP worlds, load all PAs and Generated Actors so that Clear PCG Link is not partial
        
    -   Fix UPCGSubsystem::ForAllOverlappingCells not properly adding Cell Tasks to dependencies
        
-   Find actor/component by tag now allows wildcards (\* and ?).
    
-   Added additional per-data managed ISM components reuse capabilities and option to never merge for different input data.
    
-   Fix warning when creating a Level Instance from a generated PCG Actor
    
    -   The managed resources were not marked as garbage and were reporting invalid references
        
    -   This was also causing the actors in the level instance keeping their offset because of an early save (prior to setting bAlreadyMovedActors being set to true) caused by the reference
        
    -   Level Instance Offset could happen with a different system (separate fix incoming)
        
-   Added the ability to rename a graph parameter directly from any getter node within the graph.
    
-   Added fine grained time slicing to compute graph dispatch to help stay within execution budget.
    
-   Added new Start->Goal mapping modes the Pathfinder node.
    
    -   Each Start to Each Goal
        
    -   Each Start to Nearest Goal
        
    -   Each Start to Pairwise Goal
        
    -   Also fixed an oversight where users were forced into 1:N, N:1, or N:N, when those cases were valid. Ex. 2 start points to 5 goal points.
        
-   Added number of "Final Centroids" as an optional output to the Cluster node.
    
-   Clarified behavior when casting attributes in the Match & Set node and allowed processing even if a warning happens (prevents data breakage).
    
-   Replaced the number of dispatched runtime generation components per frame by a "number of concurrently generating components" - limited to 16 by default.
    
    -   See the "pcg.RuntimeGeneration.NumGeneratingComponents" cvar.
        
-   Optimized dispatch of GPU graphs to reduce game thread cost.
    
-   Automatically select a debug object when toggling on inspection if no object was selected before.
    
-   PCG Level to Asset add 'PCGLevelToAssetExclude' tag support will exclude actor and all its children (level instance, attachments)
    
-   Disabled PCG generation toast notification when the system is only generating runtime gen components.
    
-   Fixed multiple different crash instances that could occur during generation due to memory-related issues.
    
-   Fix forced GC triggered every frame when graph cache is disabled.
    
-   Make sure GraphExecutor respects frame budget in the scheduling code (not only in the FPCGGraphExecutor::Execute top level loop)
    
-   Enabled Data Count to work as a GPU node.
    
-   Extended Set node to work with FRotator, FQuat, FTransform, FSoftObjectPtr, FSoftClassPtr.
    
-   Created a new "Export Selected Attributes" node to export data attributes directly to file in binary or Json.
    
-   Changed the default behavior of the surface sampler to make it driven primarily by the points per squared meters. Basically, sampling will sample as many points as required, up to the maximal amount driven by the point extents.
    
-   Added node to gather contextual information in the graph (is generating from the editor, is running on the original/root component, etc.)
    
-   Added dynamic pins to Gather and Union nodes for more granular input control.
    
-   Added new string metadata operations: ToUpperToLowerTrimStartTrimEndTrimStartAndEnd
    
-   Optimization of FPCGGraphCache::CleanFromCache/GetGraphCacheEntryCount
    
    -   Add IPCGElement to FPCGCacheEntryKey(s) acceleration table
        
-   Added user preference options to enable/disable the display of certain submenus within the node right click context menu.
    
-   Added some options to remove scaling/rotation from position transformation in the copy points as needed.
    
-   Added graph customization (at a single level) that can control visible nodes (category-based) and graphs (based on list/hierarchy)
    
-   Added overridable tag list on PCG ISM descriptors (comma-separated list).
    
-   Made match & set attributes node multi-data-aware
    
-   In the PCG Editor, updated "jump to" in the find window to preserve debug object selection.
    
-   Improved the Cull Points Outside Actor Bounds node by adding a fast octree-based ordered culling path.
    
    -   Normalized behavior to use point center instead of point position (in all cases)
        
    -   Normalized behavior for the unordered path where it will accept only points with centers that lie in the bounds.
        
-   Implement a native Apply Hierarchy node, replaces the blueprint that was used in Electric Dreams.
    
-   Fixed a bug in metadata comparison operations causing them to ignore user defined tolerances.
    
-   Added muladd metadata operation (e.g. d = a + b \* c) in the metadata operations.
    
-   Added support to GPU Copy Points for selecting copy pairs by matching attribute value on source and target data items.
    
-   HLODLayer Targeting - Partition Actors will inherit HLOD Layer of their Original Component - SpawnActor/CreateTargetActor have 3 modes (Self, Template, Reference)
    
-   Added default value providers for the load asset node, useful to normalize data when loading.
    
-   Added buttons to the Debug section of the properties panel to easily assign debug materials for visualizing density or color.
    
-   Added analysis pass to GPU Static Mesh Spawner to fix over-allocations of instances when using by-attribute spawning.
    
-   Optimized CPU path for sampling landscape heights from GPU nodes by parallelizing extraction of height data from landscape collision components.
    
-   Separated Graph Parameters into its own dockable panel. It can be enabled through the Windows file menu or using the helper button in the graph and node properties panel.
    
-   Added a general purpose wait node that allows to wait some time, some amount of engine frames or some amount of rendering frames, or until all three conditions are met.
    
-   Extended preconfigured settings for nodes to include extra search hints provided from metadata.Ex. Math nodes can now be found in search using +, -, \*, -1, etc.
    
-   Made the PCG landscape cache object instanced on the PCG World Actor to make it easier to find. Also improved error message when the landscape cache is not enabled, and appropriately added validation in the prepare spatial query call.
    
-   Removed duplicate generation sources (player controller vs wp source) by adding named generation sources. Usage of WP streaming sources-as-generation sources in general can now be opted-out.
    
-   Fixed synchronous loads of meshes scattered via GPU instancing.
    
-   Added transient resources tracking through PCG data collections. Currently used for efficient release of transient gpu resources. Accessible through a cvar.
    
-   Added filtering (show downstream, show only errors) to the debug object tree view.
    
-   Added drag and drop to graph parameters, so they can be dragged directly into the graph.
    
-   Enable per-data crc caching by default. Can be turned off through the pcg.AllowPerDataCaching cvar.
    
-   Overhauled the user interface of graph parameters.
    
-   Added small yellow indicators above nodes to visualize data transfers to/from GPU to warn of potential performance issues.
    
-   Added debug draw info for runtime generation to help understand which grid cells are generating and diagnose issues.
    
-   Added world streaming queries to runtime generation scheduler so that generation works gracefully in streamed worlds.
    
-   Adjusted PCG generation time cvars (pcg.FrameTime - to 5ms and pcg.EditorFrameTime - to 15ms) and enabled early transient resources cleanup by default (pcg.ReleaseTransientResourcesEarly)
    
-   Added render material and index as optional queries for the World Raycast and WRHQ nodes.
    
-   Added re-nameable categories for organizing graph parameters.
    
-   Added action aliases for creating new graph parameters with basic types to the graph panel right click context menu.
    
-   Optimized runtime generation to reduce game thread cost.
    
-   Added generation radius multiplier console variable to runtime generation scheduler to increase or decrease generation radius at runtime.
    
-   Added cvars to control the behavior of the PCG cache when cleanup happens.
    
    -   Default option in editor isn't changed (option 2 - full GC).
        
    -   The runtime behavior has been changed to only release the data so that it can be garbage collected later (option 0).
        
    -   An additional option exists to only do incremental GC (option 1).
        
    -   The cvars are pcg.Cache.EditorCleanupLevel (editor usage) and pcg.Cache.CleanupLevel (runtime usage).
        
-   Fix cook warnings emitted from the GPU node data interface shader code.
    
-   Added the option to make the execution dependency pins required. This can be used to do dynamic culling based on predicates for nodes that wouldn't have otherwise required inputs.
    

**Bug Fix:**

-   Do not early out of Cleanup for non-generated/generating components if they have managed resources
    
-   Added robustness to security measures in PCG Samplers to help mitigate OOM crashes.
    
-   Adjusted node palette so it never updates more than once per frame.
    
-   Added an error when the spawn actor node fails, and added a recovery so that BP assets that aren't cooked but their class is are able to be spawned at runtime. Changed behavior of value tags (A:B) when the value is empty (A:) so it behaves like a string value and not a boolean.
    
-   Fixed uninitialized data in the output of GPU nodes when running on Linux and Mac for point properties that are not explicitly written in the node.
    
-   Fix -game usage of UActorEditorContextSubsystem
    
-   Fixed GPU Copy Points combining source and target rotations in wrong order.
    
-   Lowered tolerance for module placement on splines as it could create "large" (up to 1cm) seams and exposed a control for it.
    
-   Fixed component seed being incorporated into node CRC even if the seed is unused. In one case this was causing a Get Texture Data node to do a lot of unnecessary texture initializations due to varying seed values.
    
-   Fixed undefined behavior when reading/writing non-existent attributes from GPU nodes.
    
-   Fixed crash in GPU nodes with texture pins when one or more incoming texture resources are null.
    
-   Use generated class for wave function collapse with blueprints in the Wave Function Collapse plugin.
    
-   Fixed issues with PCG Builder in Iterative Cell mode
    
    -   PCGPartitionActor: Properly set Local PCG Component grid size in PostLoad (transient property).
        
    -   Call FPCGWorldPartitionBuilder::UpdatePartitionedActors after expanding bounds in case some new PAs were loaded
        
-   Level to Asset : Make sure to load all Level Instance actors so they can get exported
    
-   Fixed a crash caused by trying to debug too many points.
    
-   Fixed a bug where pasting an out-of-date editor graph node could crash the editor.
    
-   Removed invalid tracking for resources that weren't able to be loaded (in the Load Asset node). Cleaned up tracking on component cleanup too.
    
-   Fix ensure happening when PCG Partition Actors GenerateOnLoad without a loaded OriginalComponent
    
-   Fixed a couple of bugs in Get Texture Data node, including waiting for texture compilation correctly and duplicating textures correctly when necessary.
    
-   Fixed crash in Attribute List View constructing UI strings when data has many tags
    
-   Fixed potential aliasing issue in the runtime generation scheduler because we didn't use the intersected bounds for the generation range distance test. Fixed typo in GetCleanupRadius for unbounded.
    
-   Progress Notification fix: total tasks wasn't properly updated
    
-   Fix "onethread" issue where we were executing/queuing RunnerFunc infinitely because RenderThread == GameThread - Task execution was stuck in a loop where there was always a task to execute (RunnerFunc was never completing because Gamethread wasn't advancing) - Check IsInActualRenderThread and use ExecuteOnGameThread to delay the call
    
-   Fix Server/Single-thread deadlock issue: replace FPlatformMisc::NumberOfCoresIncludingHyperthreads() with LowLevelTasks::FScheduler::Get().GetNumWorkers()  
    
    -   By checking GetNumWorkers instead we can avoid launching tasks completely if the result is 0
        
    -   Only wait on lock if we have a mainthread task pointer (instead of checking if we are inside the gamethread), this will avoid waiting on scheduling in a task if it is being executed on the main thread at any point.
        
    -   Check FApp::ShouldUseThreadingForPerformance() to know if we should be multithreading at all.
        
    -   This fixes a server stall where GetNumWorkers returns 0 and so Launching tasks would execute them in the launching thread stack causing a recursive lock.
        
-   Used proper static mesh transform in PCG level exporter.
    
-   Fix for texture sampler not working on non-square textures.
    
-   Fixed some issues with per-data crc caching related to the order in which we pushed results back to the output. Also fixed an issue where the post-execute push to cache would be missing additional data if any. Also added some robustness wrt to ordering to maximize caching chances.
    
-   Attribute List View: Preserve selection of Data and Domain combobox
    
-   Builder: Fix missing outputs when using "One Component at a Time" + Hierarchical Generation
    
-   Release preview resources when unloading PCG Components
    
-   Fixed cases where attributes could get mixed up when passing data between compute graphs, resulting in incorrect values in the downstream graph and possible undefined behaviour.
    
-   Fix Crash caused by PCGAssetExporterUtils bad reuse mechanism
    
-   FGridGenerationKey fix - cache bUse2DGrid instead of resolving OriginalComponent which might be stale - use FObjectKey for equality comparison / hash
    
-   GetLandscapeData: Remove ensure that could fire with older data (5.2 allowed ActorSelectionClass to be edited by user)
    
-   Preview actors now have an external package (in WorldPartition worlds) so they can support data layers
    
    -   Changing the transient state now doesn't need to set an external package it just needs to change the transient flag and dirtyness of the actor package
        
-   Removed too stringent check in landscape cache when getting only the metadata. Fixed issue with BP method (for landscape layer retrieval) that didn't infer world context automatically.
    
-   Replace usage of UBlueprint::OnChanged by FCoreUObjectDelegates::OnObjectsReplaced. This properly updates the object ptrs when class is recompiled, no need to do any reinstancing code because it is already handled by the blueprint compiler
    
    -   PCGSpawnActor
        
    -   PCGCreateTargetActor
        
    -   PCGAddComponent
        
    -   PCGExecuteBlueprint
        
-   Fixed distance behavior change - in 5.4 and before, the Distance node with the OutputToAttribute created the attribute even if there was no target data, but this was broken in 5.5. This brings back the old behavior, but this will be deprecated in the future.
    
-   Fixed an issue with the way bounds were obtained for actor tracking and changes.
    
-   Fixed indexing mismatch in per-data crc mechanism that could cause some issues in multi-data situations if the cvar for per-data caching was enabled
    
    -   Note: it was not in 5.5, it is now in 5.6.
        
-   Fixed runtime generation bug where changing Partition Grid Size setting on PCGWorldActor resulted in generated actors being leaked into the level.
    

**Deprecated:**

-   Renamed the "Create Attribute" node to "Create Constant" to alleviate confusion and better mirror other UE graphs. Create Attribute remains as an alias.
    

#### Texturing Tools

**New:**

-   Support Mesh Paint Texture Object being passed as an input to Material Functions.
    
-   Support standard hotkeys for Mesh Painting brush size, strength and falloff.
    
-   Support multi-selection of components when in Mesh Texture Asset Paint Mode. When multi-selecting the list of paintable textures is the intersection of the per component texture lists.
    
-   Added support for 32-bit textures (RGBA32F and R32F) in modelling tools texture importer.
    

**Bug Fix:**

-   All Mesh Paint Mode tools now share their brush settings, so that they don't change when changing mode.
    
-   Fix copying of any MeshPaintTexture objects stored on mesh components when duplicating an actor.
    

#### UV Editor

**New:**

-   Make the seam tool follow paths better in certain "against the grain" situations.
    

**Bug Fix:**

-   Fixed an issue where notifications/warnings emitted from Actions would not post.
    
-   Fixed a crash by preventing UV Layer property from being reset to default.Fixed the Snapshot tool being disabled when launching the UV Editor from the Modeling Tools palette
    

#### World Building

**New:**

-   \[PCG\] Support runtime grass map generation in PCG
    
-   \[PCG\] Add support for render targets in PCGTextureDataInterface
    
-   \[PCG\] Conditional copy option on Copy Points node in GPU mode
    
-   \[PCG\] Support selecting layers in GenerateGrassMaps
    
-   \[PCG\] Add option to skip readback during texture initialization
    
-   \[PCG\] Support adaptive RVT in landscape data interface
    
-   \[PCG\] Add editor preference to make PCG Partition Actors unselectable
    
-   \[PCGEditor\] Add node context menu action to jump to source file
    
-   \[PCG\] Add BaseTexture support to data visualization viewport
    
-   \[PCG\] Add UPCGVirtualTextureData, 'Get Virtual Texture Data' node, and GPU data interface for virtual texture sampling in GPU nodes
    
-   \[PCG\] Add new node 'Get Console Variable'
    
-   \[WorldPartition\] Properly handle actors using transforms relative to their parent
    
-   \[PCG\] Add support for accessing data by 'data label' in CustomHLSL nodes
    
-   \[PCG\] Set/Change GridSize nodes presets
    
-   \[PCG\] Add InstanceMinDrawDistance to ProceduralISM
    
-   \[PCG\] GPU Static Mesh Data Interface
    
-   \[PCG\] Landscape Data Interface RVT Support
    
-   \[PCG\] Support texture arrays as a single binding in PCGTextureDataInterface
    
-   Data Layers Streaming Priority
    
    -   Adds Streaming Priority property to Data Layer Instance
        
    -   Determines the streaming priority (lower value means higher priority), relative to target grid cells.
        
    -   Priority 0 means the same priority as target grid cells.Maintains existing sorting criteria: source priority -> cell hierarchical level -> cell priority (affected by this change) -> cell distance and angle from source
        
-   \[PCG\] Add support for dynamic mesh data to the data viewport
    
-   \[PCG\] Request runtime virtual textures to be primed before PCG component generation, via adding FPCGVirtualTexturePrimingInfo as a graph parameter
    
-   \[PCG\] Allow drawing debug box for virtual texture priming bounds in standalone
    
-   \[PCG\] Allow PCG compute kernels to add additional sources
    
-   \[PCG\] Add additional sources and kernel source override to Custom HLSL node
    
-   \[PCG\] Support GPU texture outputs in data viewport
    
-   \[PCG\] Support output textures in GPU kernels
    
-   \[HLOD\] \[Experimental\] Add better support for SubWP HLODs by introducing Standalone HLODs
    

**Bug Fix:**

-   Fix "Update Redirector References" process unable to fix up redirectors of assets used in level instances
    
-   Disable collisions on location volumes
    
-   Updates WorldPartition Builders to wait for the AssetRegistry initial scanning before initializing WP.
    
    -   Fixes invalid LevelInstanceActorDesc loading when AssetRegistry initialization is not complete.
        
-   Fixed LightComponent generating non-deterministic GUID in cook.
    
-   Fix an issue that could cause Level Instance to trigger an assert indicating that it hasn't been deserialized prior to PostLoad.
    
-   Fix foliage HLODs not respecting "Disallow Nanite" setting
    
-   Fixed non-deterministic cook due to FName numbers being unstable for instanced static mesh MID duplicates.
    
-   Fix assertion when trying to break LevelInstanceActor when its level isn't current
    
-   Fix Deleting Assets progress bar exceeding 100% when deleting WP levels
    
-   Fix warnings appearing after creating a new Empty Open World Level
    
-   Fix Level Sequences unable to properly resolve EditorPaths at runtime
    
-   Fix World Partition Rename Duplicate Builder commandlet to properly replace references to duplicated objects
    
-   Fix source queries not respecting Spatial Query flag. In some cases Location and Radius were still used to find cells, despite Spatial Query flag set to False.
    
-   \[HLOD\] Make -DumpStats available with cmdlet.
    
-   Fixed some non-deterministic cook with HierarchicalInstancedStaticMesh components that get renamed after adding instances.
    
-   \[PCG\] Add deprecation for old clockwise algorithm in Spline Direction
    
    -   Algorithm changed for detecting if the spline is clockwise. The old one was working only on linear splines and was giving the inverse result.
        
    -   New algorithm works with all splines and gives the right result.
        
    -   Since it changes the behavior, old nodes flips the result of the new algorithm and throw a warning.
        
    -   To update, create a new node (don't copy or duplicate it)
        
-   \[WorldPartition Minimap\] Fix Excluded Data layers (broken since we used assets).
    
    -   Add the Included/Excluded Data layers asset directly on the WP Builder and update the builders (In use by Miinimap, NavMesh & PCG)
        
-   \[HLOD\] Fix persistent partition being incorrectly used for HLOD partitions in some cases, disregarding the Spatially Loaded setting
    
-   \[HLOD\] Fix an issue preventing Static Mesh Components from being merged in some cases
    
-   Fix Gather Text From Assets Commandlet to support non-partitioned worlds using external actors
    
-   \[EditorPaths\] Fix soft references to actors within Level Instances being broken on asset reloads
    

### Localization

**New:**

-   Updated GatherText to be able to run embedded within another editor process
    
    -   Added UGatherTextCommandlet::Execute as an entry point for running UGatherTextCommandlet::Main that allows additional options when running embedded within another editor process.
        
    -   Fixed UGatherTextFromAssetsCommandlet running a GC that can unload RF\_Standalone objects when running embedded in a standard editor.
        
    -   Fixed UGatherTextFromAssetsCommandlet unloading the current world when running embedded in a standard editor.
        
    -   Instrumented UGatherTextCommandlet and UGatherTextFromAssetsCommandlet with FScopedSlowTask to provide feedback when running embedded in a standard editor.
        
-   Updated GatherTextFromAssetsCommandlet to discover external actors for a world without needing to load it
    
    -   This takes several minutes off the localization gather (7-10 in internal testing, though it would be more or less depending on the number of worlds included in the gather)
        
-   Concatenation "Activate {Mode} Mode" leads to grammar mistakes in localized languages. Changed to "Activate Mode: {Mode}"
    
-   Added support for being notified when an async localization data load has finished, and updated GFP loading to use that rather than blocking for each GFP loaded
    
-   FTextLocalizationManager::NotifyWhenAsyncTasksCompleted takes a function to call when the current set of async localization data loads has finished, or immediately if there are no pending async localization data loads. The notification function may be called on any thread.
    
-   Other functions on FTextLocalizationManager that start an async localization data load may now directly take an optional notification callback, which is called when that localization data load has finished. The notification function may be called on any thread.GFP loading now uses a notification callback rather than using FTextLocalizationManager::WaitForAsyncTasks.
    
-   Include the in-memory text cache in the "Asset Localization -> Show Localization Cache" reportThis makes it easier to debug cache invalidation issues, plus see what text will be gathered for assets that skip the on-disk cache (like Blueprints)
    
-   Make an invariant text property localizable again when overriding it from its default valueSuch overrides are typically intended to be localizable, and if they're not, the override can be manually set back to invariant and future edits to it will stay invariant
    

**Bug Fix:**

-   Fixed StringTables not setting the PKG\_RequiresLocalizationGather flag when serializing
    
-   Update the in-memory text ID of a FText when it gets re-keyed during package saveThis ensures the in-memory state matches what was written to disk, and keeps the ID deterministic after the first save (e.g., saving after resetting the package localization ID)
    
-   Fixed crash when re-ordering localization gather paths in the Localization Dashboard
    
-   Fixed sub-categories having unlocalized display names
    
-   Volume menu in the show flags level editor viewports will now pull the display name from the class data when one does not exist
    
-   Localize Copy Of when saving layout strings in the Editor
    

### Media

**New:**

-   Sequencer Media Track: Support parsing timecode meta data and fills in the media track section's source time code. The timecode is also displayed in the media info tab in the MediaSource editor.
    
    -   Note: this is only supported by Electra family of players.
        
-   MediaPlate: Marked overlay composite as deprecated.
    
-   Removing Mips Quantity from Media Texture. When mipgen is enabled, all mipmaps are generated.
    
-   MediaPlate: Holdout composite is now a checkbox instead of a right-click option that adds a component.
    
-   MediaPlate: Disabled Media Plate's controls in the detail panel while it is controlled by sequencer. Prevents users mistakenly playing 2 instances (sequencer and media plate), but having only one visible. The sequencer control has priority in this scenario.
    
-   Sequencer Media Track: Improved editor responsiveness when dragging a Media Section
    
-   NDI Media: Bundled runtime library updated to NDI 6.1.1.0.
    
-   NDI Media: Adding NDI Media Source implementation that can be used with the media framework, i.e. Media Player, Media Plate and Media Stream. Support alpha channel and audio.
    
-   NDI Media: Fix interoperability by allowing NDI Media to use the system's NDI runtime instead of the bundled one. This way it is possible to use a range of runtime versions. NDI media requires NDI 5.x as minimum.
    
-   Added .DDS image sequence support to the image sequence media player for fast reads with hardware decoding of BC1/DXT1, BC3/DXT5, BC4, sRGB & linear formats.
    
-   Sequencer Media Track: Scrubbing performance improvements.
    
    -   Seek requests are async and throttled to allow 1 frame of output to be delivered before issuing the next seek.
        
    -   While this allows for improved editor responsiveness, this may lead to desynchronization of the video output with the sequencer's play head (and other video tracks).
        
    -   If synchronized scrubbing is needed, there is new option "frame accurate scrubbing" in the media track to restore previous blocking behavior.
        
-   MediaPlate: Default aspect ratio is set to 16:9.
    
-   Exposed source color space, encoding & chromatic adaptation settings on image sequence media media sources.
    
-   NDI Media: Implementing Audio Output.
    
-   MediaPlate: MediaPlateResource Editor: when in external file mode, make the paths relative to content folder (priority) or project folder (fallback). Relative paths always start with "./" as a convention. The exception is ImgMediaSource which also supports tokens (project\_dir, engine\_dir).
    
-   Sequencer Media Track: Looping performance improvement by using the player's PlaybackRange api (only supported by Electra familiy players).
    
    -   This feature is enabled by default and should improve the looping performance in a lot of cases.
        
    -   A new cvar "MediaTrack.UpdatePlaybackRange" has been added to disable this behavior in case of regressions.
        
-   Added "MediaUtils.BlockOnFetchTimeout" console variable to control block on the block on range timeout duration.
    
-   Exposed media track "Synchronous Scrubbing" option to force synchronous frame requests while manually scrubbing the media track, at the cost of blocking the editor.
    
-   Media Player Editor: Validate the globally specified desired player before opening the media source to avoid mistakes with incompatible media sources. If the media source can't be opened by the desired player, it will be reset so the player from the media source can be selected instead.
    
-   MediaPlate: Exposing Next() and Previous() to blueprint.
    
-   Sequencer Media Track: Display Media Info and GOP Codec Warning on the media section in sequencer editor.
    
-   Improving performance of EXR sequences during sequencer media track pre-roll by providing the "view" media texture early so the player can determine the needed set of mips and tiles to load.
    

Bug Fix:

1.  Fixed color space transformation on hdr videos with electra player and introduced "Electra.HDR.WhiteLevel" and "Electra.HDR.ToneMapMethod" console variables for more control.
    
2.  Android GLES media player fixes. Remove invalid call to GetNativeResource off the RHI thread which was causing assertion. Restore the external texture path which was disabled accidentally in CL 30423346. In maintaining that fix, explicitly mark the AndroidMediaTextureSample as an external image and adjust MediaTextureResource's path to allow the conversion of external texture to standard 2D. Additionally, fix the channel swizzle in the external texture copy shader.
    
3.  Fixed media texture mip generation colors with floating point texture formats.
    
4.  NDI Media Output: Fix ndi senders leaking in case of an error during the capture's initialization. Leaking senders will cause name collisions that will prevent restarting the capture. More explicit error message about name collisions have been added to make it easier to troubleshoot.
    
5.  Fix missing media info (player name, time code, seek warning) in the media player and media plate player editors.
    
6.  Disabled exr gpu reader pool pre-allocation with sequencer playback.
    

### MetaHuman

**New:**

-   MH component: Move to pull mechanism rather than caching links to other components
    
-   Improved: Underwear Textures details
    
-   Skin detail map added
    
-   Improved: underwear seem
    
-   Fixed shared underwear texture not matching
    
-   Chest underwear map added
    
-   3 channel cav for skin added
    
-   Improved: skin normal maps fixes
    
-   Fixed Undo range underwear
    
-   Improved underwear maps
    

### Mobile Rendering

New:

-   Add ReplaceTonemapper BlendLocation to the Mobile PostProcess
    
-   Enable LightGrid Debug for Mobile Keep Light Grid Debug disabled for Preview and D3D ES31 because of FXC restriction
    
-   Use R8G8B8\_UNORM where supported When r.Mobile.SceneColorFormat=3 use R8G8B8\_UNORM if supported and alpha is not needed
    
    -   For everyone else use R8G8B8\_UNORM in tonemapping if supported and alpha is not needed
        
-   Make ASTC\_RGB\_HDR on IOS/Android default to ASTC\_RGB if ASTC HDR is not supported instead of RGBA16F
    
-   Mobile/Desktop PostFX parity. PostProcessMaterialAfterTonemapping after FXAA. Drive-by cleanup of unused bLastPass.
    
-   Add Bloom to ReplaceTonemapper Mobile
    
-   Allow some ISceneViewExtension postprocess delegates to extend mobile postprocessing
    
-   Mobile DFAO implementation Mobile Deferred MultiPass has its own DFAO generation renderpass, samples the DFAO texture and composites it with other AO like SSAO Mobile Forward and Deferred Single Pass will modulate the DFAO result into the SSAO texture and sample it.
    

**Bug Fix:**

-   Don't apply AerialPerspective to Translucent Materials on Mobile when r.Mobile.PixelFogQuality is 0
    
-   Force FullPrecision for Mobile DOF shaders
    
-   Skip the last transition for memory less texture.
    
-   Wrong type used in Velocity pass shaders on Opengl Windows
    
-   Fix hair (voxel) shadow causing incorrect shadow causing incorrect light transmission from thin diffuse surface.
    
-   Fix metallic properties not making it into the shader path for mobile materials. The conditions around IsNonmetal are invalid as they only consider input connections but not constant scalar values. In either case, the constant value could be modified at runtime. Moreover, the optimization from this path was limited to a lerp and a multiplication operation.
    
-   Fixed strange stripes on the screen when using gtao on mobile.
    
-   Resolve thread timing issue that was causing invalid Scene texture config. Move TaskDatas.VisibilityTaskData->Finish(); to precede IsMobileSeparateTranslucencyActive calls as it depends on results from TaskDatas.VisibilityTaskData, namely SetupMeshPasses and the collection of DynamicMeshRelevance data.
    
-   Fixed shader compilation for SM5 on tvOS
    

**Deprecated:**

-   Remove the mobile PixelProjectReflection because we have the mobile SSR.
    

#### Mobile Lighting

**New:**

-   Added a Map Check warning when static lights are present in the scene but disabled due to Lumen.
    

**Bug Fix:**

-   Fix OIT crash on platform not supporting R16uint format for UAV write.
    

#### Mobile Materials

**New:**

-   Disable normal output for GBuffer decals on mobile deferred.
    

### Motion Design

**New:**

-   Modifiers: Removing auto size ability to follow reference actor to avoid performance impact when marked dirty, auto size is now a geometry modifier, auto follow modifier will handle the layout arrangement and padding instead
    
-   Material Designer Texture Set: Changed the background color of the texture name on the texture set creator to black and the color of the text to a slightly brighter white.
    
-   Added 4 new "simple" materials which have 1 side.
    
-   Added the ability to pick one or two sided simple materials (default 2).
    
-   Material Designer: When viewing a template material, rather than an instance, the word "Material" is displayed at the bottom-left of the material preview.
    
-   Animators
    
    -   Adding bounce, oscillate, pulse preset assets for animators
        
    -   Adding pulse wave curve asset
        
-   Material Designer: Added transaction to adding effects.
    
-   Material Designer: Actors assigned material assets now have a button to create and replace the asset with a local material instance.
    
-   Animators: Fix animating rotator properties would jump and cause unexpected behavior due to euler angles / gimbal lock
    
-   Material Designer: Displacement center and magnitude are now available as options.
    
-   Material Designer: The save button is no longer visible when editing an asset that exists inside an actor rather than as an asset in the content browser.
    
-   Actor spawn, duplication behavior in Outliner is now designed so that items are added below rather than above their source/template.
    
-   Custom Details View: Item ID redesign, item Ids are now based on paths, where possible, instead of just names.
    
-   ClonerEffector: Texture constraint can now be clamped, offsetted, scaled, rotated in grid layout
    
-   Modifiers: Add SplinePath modifier that moves an actor along a path with various options (orient, scale, time, percentage, index, distance)
    
-   Added support for child nodes within exposed properties to show in the Rundown Editor. Additionally added support for functions to be shown/called in the Rundown page.
    
-   Material Designer: Create Button made optional - There is now a 'Show Create Button' option in the editor settings for the Material Designer. This can be used to disable the details view buttons.
    
-   Template map update
    
    -   Updated to save the camera being piloted by default.
        
    -   Removed the extra BG quad.
        
-   Piloted camera saved
    
    -   The piloted camera is now saved and re-piloted when re-opening a Motion Design map.
        
    -   Changing the piloted camera now marks the level dirty.
        
-   Material Designer: Renamed menu option
    
    -   The "Reset all to defaults" menu option has been renamed to "Reset UI Settings".
        
-   Shapes
    
    -   Add simple texture option within parametric material used by shapes to avoid having to create a material designer each time
        
    -   Size to texture button added next to parametric texture property that find/add size to texture modifier and links the texture to it
        
    -   Add GradientRotation property for LinearGradient style
        
    -   Updated toolbox materials to support cloner texture and color
        
-   ClonerEffector:
    
    -   Added warning bounds mismatch on load, cached mesh is different than actual mesh, could be due to asset missing
        
    -   Improved cloner load time by reusing cache as much as possible instead of regenerating attachment meshes, resave the asset in order to benefit from these improvements
        
    -   Instead of checking and updating the tree each tick, delegates are used to mark the tree dirty reducing attachments checks
        
    -   Removing ability to control tree interval updates, this will be done internally
        
-   MediaPlate:
    
    -   Adding support for transition logic, dynamic level instancing and remote control of the media source.
        
    -   Adding latent open for support of a transition logic blueprint task.
        
    -   Close the player in EndPlay(). This is need for using a MediaPlate in a dynamic level instance. Without it, the playerkeeps going and consume resources.
        
    -   Fixing RefreshMediaPlateResource so it doesn't close the player if called multiple times without actual change (RC does that).
        
-   Custom Details View: Modified extension button system
    
    -   Refactored the way extension buttons are generated to allow better overriding.
        
    -   Details tree nodes are now aware of extension button overrides.
        
    -   Added ability for an item to set a delegate to generate child details rows.
        
-   Adding cvar "MotionDesignCamera.EnableCameraSubsystem" to disable camera controls for rundown to run in "ICVFX mode" on a display cluster.
    
-   Storm Sync: Support Multiple Storm Sync TCP servers on the same host. Some configurations require running multiple unreal processes, either editors or games, with Storm Sync tcp servers on the same host. In order to make this easier, the tcp servers will try to find an available port automatically upon finding a collision.
    
-   Better Material Designer preset picking. Now uses translucent preset for textures with alpha and emissive for ones without it.
    
-   Text3D: Adding support for additional rendering options like affect indirect lighting, holdout in Text3D rendering extension
    
-   Material Designer: Opacity pre-blend update
    
    -   The Add, Subtract, Multiply and Divide blend modes now use those operations on their base layers to create the opacity (mask) base layer input.
        
    -   Updated display name on Texture Clamp to indicate it affects UVs.
        
-   Renaming actors now propagates to all the sequences inside the motion design scene and any sub-sequence used within these.
    
-   Material Designer: When selecting an actor with no valid material slot, it will tell you this.
    
-   Material Designer:
    
    -   Added "(Inst)" to the toolbar when a material instance is open.
        
    -   Changed "Dynamic" to "Instance" on the preview.
        
-   Material Designer: bUsedWithNanite is now enabled if there is a displacement channel or bNaniteTessellationEnabled is enabled.
    
-   Material Designer:
    
    -   "Material Instance" has been renamed "Material Designer Material"
        
    -   "Material Dynamic" has been renamed "Material Designer Instance"
        
-   Material Designer
    
    -   Changed asset name in content browser to be "MD Material" or "MD Instance".
        
    -   Prefixes for exporter assets are now T\_ M\_ MD\_ MDI\_ MDM\_ MDMI\_
        
-   Modifiers
    
    -   DynamicMeshConverter modifier now uses cloner mesh builder to convert various mesh types to dynamic mesh
        
    -   Detects changes on geometry or transform and retrigger modifier
        
-   Material Designer: Textures (multiple) and texture sets can now be dropped directly into the wizard.
    
-   Material Designer: The Light Function material domain is now available.
    
-   Material Designer
    
    -   Material object names are now called "Material Designer" instead of "Dynamic Material Instance"
        
    -   Model object names are now "Material Designer Model" and "Material Designer Model Instance".
        
-   Material Designer: The brown/yellow color of the wizard preset selection buttons is now green.
    
-   Material Designer: Texture names in the asset creator now have a translucent background so the texture can be seen through it.
    
-   Material Designer: Adds a notification if a texture set adds a texture to a channel which is incompatible with the current material model.
    
-   ClonerEffector: Preview collision grid size and grid resolution in editor
    
-   SVGImporter: Fix crash caused by incorrect parsing of points path in svg data, should support multiple svg formats
    
-   Modifiers: Fixed boolean modifier overlapping check to support Text3D and its various disconnected glyphs not being detected due to tool bounding box being in between glyphs and not intersecting any geometry
    
-   Material Designer: Undo - The wizard and actor slot selector now have undo.
    
-   Material Designer: Texture sample optimisation
    
    -   You can now select "Use Base Texture" on mask stages to re-use the texture sample from the base stage, if it's using a texture.
        
    -   The correct channel is used for mask stage previews
        
-   ClonerEffector: Add concentric support in circle layout by specifying RingCount
    
-   Rundown Server: Support for creating Combo Templates and various page editing improvements.
    
    -   New Commands:
        
        -   Added "CreateComboTemplate"
            
        -   Added "GetPlayableAssets" command to have the server list all it's available playable assets. Needed for clients UI implementation to obtain the asset path for CreateTemplate command.
            
        -   Added "ChangePageName": Allows renaming either template or instance pages.
            
    -   Modified Commands:
        
        -   "CreatePage": Adding the PageId generator parameters to support page id insertion.
            
        -   "CreateTemplate": Adding the PageId generator parameters to support template id insertion.
            
        -   "CreateTemplate": Adding the asset path to be able to create the template in a single command. This avoid having to delete the invalid template if setting up the asset fails.
            
        -   "ChangeTemplateBP": Adding bReimport parameter to allow reimporting the source asset, i.e. refreshing the template's information from the source asset.
            
    -   New events:
        
        -   PageNameChanged: when a page or template is renamed.
            
-   Animators: Ability to generate a different seed per property owner for integer property with "Seed" metadata, uses property type min/max and clamp min/max metadata for proper range
    
-   Animators: Allow system time source to specify a target time instead of duration to avoid cases where time source is reactivated and countdown restarts over and operator needs to calculate the time difference
    
-   Material Designer: Blend descriptions. Added descriptions / tooltips to the different blend modes.
    
-   Material Designer: Updated menus
    
    -   Every menu now has an extension point.
        
    -   Video renamed to Media.
        
    -   Video moved to base menu instead of Advanced menu.
        
-   SVGImporter
    
    -   Fixed duplicated joined SVG actor would not apply colors to materials
        
    -   Fixed duplicated joined SVG actor would not regenerate geometry when render mode is changed (2D -> 3D)
        
    -   Fixed pixelated SVG materials
        
    -   Add ability to use SVG as target for mask instead of only source
        
-   ClonerEffector: Updated cloner component details customization to show properties from parent class (UNiagaraComponent and above) in a separate category
    
-   Rundown: collecting cook dependencies from page values.
    
-   Animators: Allowing multi-edit for property animator properties options (amplitude, magnitude, ...) as long as linked properties are the same and count matches
    
-   Modifiers: Improving pattern modifier to support keyframe on properties and simplifying alignment options
    
    -   Pattern modifier tool can be extended to create more patterns
        
    -   Assets using this modifier old version will be migrated
        
-   Material Designer: UI Fixes
    
    -   Disabling follow selection will now only take effect when there is no material currently opened. Having it disabled with no opened material will open the first valid material on a selected item and keep it open.
        
    -   The Compile button has been removed.
        
    -   A Live Preview toggle button has been added to flip the value of automatic preview material compile. When enabling the automatic compilation, an immediate preview material compile will be triggered if needed.
        
    -   The red warning icon that indicates a property not available in the source material is now a yellow warning icon.
        
-   ClonerEffector
    
    -   Add submenu to create cloner with specific layout or create linked effector with specific shape
        
    -   Fixed undo+redo issue causing effector to not work anymore when removed (undo) then recreated (redo)
        
-   Rundown "Stop Layers" Page Command to transition logic. Adds the ability to take out some layers.
    
-   ClonerEffector:
    
    -   Fix cloner and effector rotation issue with quaternion drifting over time
        
    -   Add particles spawn frame/total limit to avoid cloner performance impact due to large particles count spawn
        
    -   Fix vortex force origin moved from emitter position to effector position
        
-   Activating/deactivating motion design mode now persist across sessions
    
-   Implement Playback Transition Start Synchronization on display cluster.
    
-   Added menu action for user to discard pre-animated state, to keep the current animated state when changing sequences.
    
-   Rundown and Playback:
    
    -   Support for scene state events through RC controller behaviors.
        
    -   Refactor to allow the UpdateRC command to carry flags for more specific purposes.
        
    -   In particular, for any RC update that is not part of a transition, it will now execute the controller behaviors.
        
-   Adding Playable Blueprint Latent action to synchronize an event on display clusters.
    
-   Adding Rundown Page Commands to help adjust transforms of MD assets:
    
    -   SetTransform page command to directly specify a level transform.
        
    -   SetSpawnPoint page command to be able to spawn the graphics at specific tagged null actor positions in the persistent level.
        
-   Animators: Improving animator manual time source to allow custom time and player to be used together
    
-   Material Designer:
    
    -   Redesign of the wizard new material page.
        
    -   Fix for the channels list so it appears correctly.
        
    -   Fix for the template selector to enable engine, plugin and developer content.
        
-   Rundown Server: implementing API for new commands:
    
    -   Stop Transition command
        
    -   Stop/ForceStop Layer command
        
-   A lot of Motion Design plugins are now in Beta. The ones moved to beta are as follows:
    
    -   ActorModifier
        
    -   ActorModifierCore
        
    -   Motion Design
        
    -   ClonerEffector
        
    -   CustomDetailsView
        
    -   Material Designer
        
    -   GeometryMask
        
    -   OperatorStack
        
    -   PropertyAnimator
        
    -   PropertyAnimatorCore
        
    -   StormSync
        
    -   StormSync Motion Design Bridge
        
-   Material Designer: Changed order of "change stage source" and "add layer" menus.
    
-   Modifiers: Added inverted outliner tree sort mode to the translucency sort priority modifier
    
-   SVGImporter: Added option to toggle visibility of all svg components in the actor
    
-   Motion Design Outliner now refreshes when sub-levels are added/removed
    
-   Rundown/Playable: Support for ignoring Remote Control controllers to not interfere with Scene State tasks (that are also using RC controllers).
    
-   Updated Motion Design 2D Template Level
    
-   Removed unnecessary asset.
    
-   Updating default Motion Design Template Levels
    
-   Material Designer: Duel playhead control. The play controls in the Material Designer for media now (attempt) to control both the source and preview media.
    
-   Text3D:
    
    -   Exposing material extension properties to material designer
        
    -   Adding LocationBegin in LayoutTransformEffect to adjust starting offset
        
    -   Add toggle for material mask, off by default
        
    -   Fix mask material function to work fully in local space without continuous updates to adjust itself
        
    -   Visualizer character kerning handle only show when kerning editing is toggled on
        
    -   Adding missing blueprint functions to retrieve text extensions
        
    -   Use single custom material for front, back, extrude, bevel slots
        
-   Shapes
    
    -   Fix UV mode behavior not updating properly
        
    -   Removing property blueprint specifier and instead exposing getter/setter where relevant
        

**Bug Fix:**

-   Fixed a bug on Mac and Linux where fetching the command list cross-module would result in a crash.
    
-   Material Designer: Fixed failing to check for invalid values when creating instanced material.
    
-   Floating Properties: Now properly accounts for DPI.
    
-   Material Designer: When applying texture sets to MD assets, the channels are now enabled if they are disabled.
    
-   Material Designer: Fix crash on bad rename on material replace.
    
-   Material Designer: Value and texture parameter names are now not changed upon load.
    
-   Material Designer: When undoing, the UI is not unnecessarily refreshed.
    
-   Material Designer: When automatically setting a texture to the mask stage, the channel override is now set correctly. - Rejigged the slot editor and its sub-widgets so that events centre around the slot editor widget, instead of its sub-widgets. - Undo now doesn't refresh the UI when it is not necessary.
    
-   Material Designer: Changed the node arranger to account for long material titles.
    
-   Material Designer: When textures are dragged into he viewport, it will no longer cause a crash if the actor and material is deleted during compilation.
    
-   Viewport Transactions: Fixed some viewport transaction issues related to post process and rulers.
    
-   Fixed performance issue with Outliner unregistering and re-registering the same material item causing refresh and long stalls.
    
-   Custom Details View / Media Stream: Fixed row visibility.
    
    -   CDV now properly uses the row visibility attr to produce dynamic details panels.
        
    -   The media stream customisations now correctly set the row visibility.
        
-   Fix for color picker theme menu. The color picker theme menu will now correctly close when selecting an option.
    
-   Modifiers:
    
    -   Align between modifier only saves location instead of whole transform
        
    -   Fix modifier shared transform object save/restore capability
        
    -   Removing boolean modifier async execution to avoid having one frame delay for animation
        
    -   Removing usage of promises and simplifying stack execution flow to avoid crash caused by promises not fulfilled
        
-   Fixed issue with jump marks not working outside of sequencer.
    
-   Fixed issue with no reimport handler to deal with reimport logic when dragging the same files again
    
-   Material Designer: Fixed non-editor compile
    
-   Storm Sync: Fix for revive discovery service connection. If a node becomes non-responsive and disconnects, it will try to reconnect upon resuming and will register itself as the connection instead of the peer. Any further operations would result in a no-op.
    
    -   Also, added a new command "StormSync.Discovery.Wakeup" to be able to reactivate client end points when they become inactive.
        
-   Material Designer: Fixed marking map dirty on load. When the preview material is initially compiled on open, it will not be automatically applied to the source material.
    
-   Material Designer: Material build issues
    
    -   Fixed properties generating nodes when they are disabled.
        
    -   Fixed translucent materials not being translucent at creation
        
-   Motion Design: PIE Camera fix. When starting PIE, the camera darken overlay and pan/zoom controller are disabled.
    
-   Motion Design: Guide enable toggle fix
    
-   Material Designer: Material Stream integration fixes
    
    -   Corrected the icon when a video is the current source.
        
    -   Made sure that changes to the video propagate to the source material.
        
    -   Made sure that the source material loads its texture.
        
-   Material Designer:
    
    -   Mask channel thumbnail should now update when the source is changed via the base stage texture being changed.
        
    -   When built in debug, ctrl+shift+right click will open the stage preview materials in the material editor for debugging.
        
-   Material Designer: When checking if a throughput should keep input, a valid option is now a single scalar instead of needing to match the float count exactly (e.g. vector3 vs vector3.)
    
    -   This will mean that channel-filtered inputs will not be reset.
        
    -   This is also correct when it comes to materials as a single float is a valid input for anything that accepts scalars or vectors (where this is concerned).
        
-   Motion Design / Material Designer: Mask (Apply) now works correctly with Material Designer materials in the editor.
    
-   Material Designer:
    
    -   When selecting the Alpha channel override, preview images will now compile correctly.
        
    -   When disabling mask stages in the base and emissive channels, they will correctly be ignored by the opacity channel's automatic multiplier.
        
    -   Blends and Functions that attempt to use the base and mask properties will now only use those properties if they are enabled.
        
-   Material Designer: Effects can no longer be toggled or removed from material instances.
    
-   Material Designer: The channels page now remembers expansion states.
    
-   Display Media Output: Disabling fullscreen on Mac platform to avoid a hard lock.
    
-   Material Designer: Fixed a crash when creating a material designer instance from the details on a Motion Design shape.
    
-   Material Designer: Alpha-based effects now work correctly.
    
-   Material Designer: When updating input maps, if the input map will be unchanged, no update event will be triggered.
    
-   Material Designer: Undoing after changing the opened material designer asset will no longer cause a crash.
    
-   Floating Properties: Properties attached to other properties will no longer mistakenly appear at the top-left.
    
-   Custom Details View: Double copy/paste actions
    
    -   Copy/paste actions from the CDV will not additionally display on the regular details panel, creating 2 copy/paste entries.
        
-   Custom Details View: Fixed child visibility
    
    -   Child visibility now checks parent visibility.
        
    -   Reworked widget initialisation.
        
-   Material Designer: Swirl UV fix. The swirl uv effect was based on time, so the effect was different in each world instance (viewport, md preview, etc.) It is now a static value of 720.
    
-   Material Designer: Warp UV fix. Warp UV's effect amount parameter now has a min and max of 0/100 respectively.
    
-   Custom Details View: Edit Condition bug. Edit Condition Hide now works correctly.
    
-   Fixed issues with tabs registered through motion design editor were not properly retained on layouts.
    
-   Material Designer: Blend mode layer connections fixed. An issue preventing layers from connecting their outputs to each other correctly has been fixed.
    
-   Shapes: Fix export to static mesh asset, could not save asset due to material being referenced in motion design level
    
-   Material Designer: Fixed layer blend tooltip. Changed the layer blend selection tooltip to include the name of the blend mode.
    
-   Material Designer: Fixed actor copy. Copying actors was not copying script interface. Changed to UObject.
    
-   StormSync: Improvements: FStormSyncStatusMessageService::HandleStatusRequest implements the task in async thread to no block the main thread. This operation can be expensive and lock the main thread for a significant time and cause render nodes to time out and disconnect.
    
-   Material Designer: Fixed texture edge color property display
    
-   Material Designer: Fixed material effect property enumeration
    
-   Material Designer: Undo crash fix
    
-   Material Designer: Fixed media source
    
    -   Media sources now properly work between the preview and source materials.
        
    -   Added play controls for both the preview and source materials.
        
    -   Adding a track now correctly adds the track for the source material version.
        
    -   Added playback state, requested seek frame and playlist index properties.
        
-   StormSync: Lifting the 2 GB size limit for SPAKs and TCP transfers.
    
-   Material Designer: Media source selection. The panel now refreshes when source details are changed.
    
-   Material Designer: Fixed object properties to display full row widgets when no display name is provided.
    
-   Motion Design: Overlay/zoom fix redux. PIE is now detected as "GEditor->PlayWorld" rather than checking the associated viewport world as the viewport world was inconsistent.
    
-   Material Designer: Layer duplication fix. When duplicating layers, cached parameter names are no longer copied.
    
-   Motion Design: Fixed crash on shutdown
    
-   Motion Design: Missing viewport toolbar entries. The viewport toolbar entries on the camera menu have been added to the new toolbar redesign.
    
-   Fixed issue with Translate/Rotate/Scale shortcut keys in viewport while in Motion Design not working after changing viewport types.
    
-   Material Designer / Media Stream: When choosing a media layer, now sets the mask stage to a 'use base texture' texture source.
    
-   Material Designer: Changing channel overrides now correctly updates the material.
    
-   Fixed issue where asset registry search was done prior to scan finishing, causing intermittent issues where Motion Design templates levels would sometimes not appear.
    
-   Material Designer: Fixed cyclic call to CopyParameters - A details panel refresh will no longer trigger parameter copying.
    
-   Material Designer / Media Stream: Fixed remote control integration for source selector.
    
-   Material Designer: New/Fixed effect assets
    
    -   Fixed typo in flipbook description.
        
    -   Added flipbook animated asset.
        
-   Material Designer: Moved actor name and property selector to the end of the title row.
    
-   Material Designer: Changed how transactions work when applying preview material to the source material.
    
-   Motion Design: Fix on undo related to guides
    
-   Reparenting sequence now transacts (undo/redo) properly
    
-   Material Designer: Fixed actor property display. Custom material property generators will now display correctly when using something other than the Primitive Component's material list.
    
-   Motion Design: FIxed viewport mouse location. The internal SViewport is now used to detect mouse position instead of the outer widget.
    
-   Fixed issue caused by creating a sequence in Motion Design then undoing resulting in a 'None' sequence that can't be deleted.
    
-   Fixed issue with opening settings in "Apply Preset" section from sequence list not opening the Motion Design Sequencer settings.
    
-   Fixed issue where Window > Layout > Load Default Layout would cause Motion Design tabs (Outliner, Scene Settings) to no longer appear
    
-   Fixed issue where Asset by Path Remote Control behavior would not properly work in Rundown.
    
-   Fixed issues when multiple masking elements are drawn. The issue stemmed from the draw code pushing index values that were 'relative' to the current shape being drawn, rather than the actual indices in the BatchedElement vertex buffer. Additionally, every canvas was being updated per world regardless of the world which was causing issues when multiple worlds were present (e.g. the In-Editor World, and Rundown).
    
-   Material Designer: Fixed inability to key or expose layer opacity.
    
-   Material Designer: Shaders module is now runtime instead of editor.
    
-   Material Designer / Motion Design Text: Style fix
    
    -   New SetMaterialDelegate that can be used to manually handle setting object property.
        
    -   Text now uses this delegate to enable custom styling.
        
-   Material Designer: Fixed ability to change structure of material instance
    
-   Material Designer: Text and UMG Renderers and Render Targets now correctly copy their properties from the preview to the source material.
    

**Deprecated:**

-   Cleanup unused Startup Camera and the interfaces built up for it.
    
-   Transition Logic: Removed the "Out Scenes" from StateTransitionInfo used in BP\_StateTask.
    
    -   This is because now there is rundown support to take out pages via commands. This was initially a workaround when Rundown did not have this feature.
        
    -   The BP\_StateTask still has this ignore functionality via the new "Levels to Ignore" variable that can be used within the Transition Logic State Tree.
        

### Movie Render Pipeline

**New:**

-   Packaged builds now automatically mark the Sequence as Volatile so that features that change the size of sections (e.g.: temporal sub-samples, handle frames) now work as expected in packaged builds.
    
-   MovieGraph: Burn-ins now show the correct camera data for the camera they are being rendered for. This fixes an issue where when using multi-camera support, all burn-ins showed the Primary camera's data (focal length, aperture, etc.)
    
-   Added ability for the movie render pipeline to crop out overscanned pixels.
    
    -   When rendering non-EXR file formats, all overscanned pixels are now cropped during the final output pass, and the output resolution will now match the user specified resolution in the render settings.
        
    -   EXR files will continue to have overscanned pixels included as part of the data window, with the display window set to match the user specified resolution.
        
    -   Further, burn-ins and other overlays can now be composited onto overscanned images in EXR and will be rendered at the user specified resolution and positioned in the display window.
        
-   Added ability for the render pipeline to support animated overscan by allowing each frame to have a potentially different internal resolution
    
-   MovieGraph: Add support for time dilation in renders.
    
    -   Time Dilation is cached at the start of each output frame so that all temporal sub-samples for that frame will use the same Time Dilation scale, which is required for the motion blur to line up within a given output frame.
        
    -   When using Time Dilation the {frame\_number} tokens will be forcibly made into {frame\_number\_rel} because the frame numbers given by Sequencer are no longer unique, ie: at a 0.5x timescale, Frame 0 would produce two frames for Sequencer's singular frame 0, and {frame\_number} would assign both of them to Frame 0, which would cause the resulting files to overwrite each other on disk (resulting in data loss from a render).
        
    -   In Movie Render Graph, relative frame numbers are now relative to the start of the level sequence/shot and not zero, meaning that if you have a shot that uses time dilation half way through it then it will create a consistent frame range even if your sequence didn't start at zero.
        
-   Added basic support for multi-part EXR files, which allow multiple headers with different data window sizes, to allow burn-ins rendered at output resolution to be included in the same EXR as the overscanned render instead of as a separate file when using multi-layering.
    
    -   Also changed EXR data and display window computations so that display window top left is always (0, 0) and data window can be negative for overscan.
        
    -   A new checkbox, "Multipart", has been added to the EXR settings, which enables or disables using multi-part EXR files.
        
-   Added support for embedding audio recording into Apple ProRes .mov files. This does not improve the quality of recorded audio (ie: there are still gaps between shots where engine warm-ups take place) but now embeds the recorded audio into the .mov file as uncompressed lpcm audio.
    
-   Alpha output renderer setting (r.PostProcessing.PropagateAlpha) is now automatically enabled by default during renders. It can be disabled by setting MoviePipeline.AlphaOutputOverride to false/0.
    
-   Updated the drag-drop behavior for dropping pins on the Outputs and Inputs nodes. When drag-dropping a branch pin from a Render Layer node onto the Outputs or Inputs node, the new member created is now named based on the layer name in the Render Layer node. Previously the new input or output created was given a generic name like "NewInput" or "NewOutput".
    
-   MovieGraph: Added initial support for high-resolution tiling into Movie Graph on the deferred renderer.
    
-   Added reroute nodes to the graph (under Utility -> Reroute in the node creation menu, or by double-clicking on a connection).
    
-   Added the capability to match components (in addition to actors) within MRG collections.
    
-   Added \_API exports to debug-widget related classes so they can be inherited from in C++ for custom pipelines.
    
-   MovieGraph: Improvements to the UMovieGraphConfig API for finding nodes by type, and for finding nodes by tag.
    
-   MovieGraph: Add support for Custom Playback Ranges to be optionally overridden as a variable.
    
-   MovieGraph: Added the ability for the output resolution to automatically be adapted based on the aspect ratio of cameras, allowing the user to leave their settings at a given resolution and know that they'll get an image that is no bigger than the specified image, while preserving the aspect ratio, and removing any letterboxing. See the "Adapt Resolution" setting on the Global Output Settings Node.
    
-   Added support for controlling Post-Process Volume visibility within MRG modifiers.
    
-   The random offsets used during 16->8 bit image quantization now use a fixed seed, instead of GFrameCounter to make resulting images more deterministic.
    
-   MoviePipeline: Added experimental support for encoding mp4 files on Windows.
    
-   Adding ProRes movie exporting capability on Mac
    
-   Added a new setting to the Global Game Overrides node in MRG ("Rebuild Lumen Scene Between Render Layers") that can help with Lumen consistency between render layers.
    
-   Updated MRG to skip temporal sampling during warm-ups, except during the last 5 warm-up frames (can significantly speed up warm-ups). This can be customized with the MovieRenderPipeline.NumWarmUpFramesWithTemporalSampling cvar if needed.
    
-   MovieGraph: Added high-res tiling support to the Path Tracer node in MRG.
    
-   MovieGraph: Implement Page to System Memory on Deferred Panoramic Renders and Deferred High Res Tiling.
    
    -   Page to System Memory, when using history-per-tile (or pane), will download the per-tile GPU resources off of the GPU after each tile is rendered, and then re-upload them on the next frame that needs it.
        
    -   This is about 3x slower than without it, but allows for using large amounts of system memory to free up some GPU memory if history is required for the scene to render correctly.
        
    -   High resolution images/panoramics are still targeted at high-VRAM cards regardless of this feature.
        
-   MovieGraph: Added panoramic blending support to the Movie Graph system, mirroring functionality that Movie Render Queue had. Minor improvements to blending quality, memory usage, and blending performance (on high core count machines).
    
-   Updated Python code examples for MRG to cover more of the API and provide clarification on how variables work.
    

**Bug Fix:**

-   Fixed an issue where UI Renderers composited incorrectly when dealing with partially translucent UIs, which resulted in overly bright composites compared to the viewport.
    
-   Fixed multiple issues with Object ID when it is used across multiple layers (inconsistent IDs when multiple modifiers are in use, missing EXR metadata, flickering).
    
-   Fixed a performance/memory issue in the EXR writer that was especially noticeable when multiple Object ID layers were being generated in multi-layer EXRs.
    
-   Fixed an issue with multi-layer EXRs that would cause layers with explicit naming to sometimes be written out to the primary/RGBA layer. This could break Object ID depending on the graph setup.
    
-   Added multi-cam compatibility with Object ID in MRG. Previously Object ID only worked with the first camera.
    
-   Fixed an issue that could cause the OnShotFinished callback on the Execute Script node to not contain all of the files generated by MRG.
    
-   Fixed a few cases where job variables would not properly refresh when changing/clearing graphs on the job/shot.
    
-   Fixed a UI state issue in MRG (when marking a member as a branch or not a branch, the other properties in the details panel may not properly refresh their enable state).
    
-   Fixed an issue where creating a float variable in MRG created a double instead. Floats and doubles are also now interoperable within the graph.
    
-   Fixed an issue where media would not be written to disk when a UNC path was used in the graph.
    
-   Fixed a GC-related crash that could occur when using the Object ID node in MRG.
    
-   Fixed a crash that could occur with video output nodes. If a video node was not in the Globals branch, there were multiple output branches, and a video node was not included on each output branch, a crash could happen.
    
-   Fixed an issue that caused MRQ to not shut down correctly if a zero-range custom frame range was specified.
    
-   Fixed a bug in MRG that caused the "Overwrite Existing Output" property on the Global Output Settings node to not work correctly (no files were written if there were already files on disk).
    
-   Fixed a bug in MRG that caused the "Cast Shadow While Hidden" property on the Modifier node to not work in isolation (it required the "Affect Indirect Lighting While Hidden" property to take effect).
    
-   Fixed "Resize PIEWindow to Output Resolution" not working when using the Movie Graph. Only the basic output resolution setting is supported, even though MRG can ultimately support multiple output resolutions at once (due to multi-camera support and adaptive resolutions).
    
-   MovieGraph: Fixed spatial samples not working in ObjectId pass, fixed occasional garbage collection related crash.
    
-   Fixed a bug that caused the Select and Branch nodes to not properly resolve a value on the pin that controls their behavior if the pin was connected to a subgraph or controlled via the queue.
    

**Deprecated:**

-   Deprecated blueprint APIs that referred to overscanned resolution as "effective output resolution", as it is no longer accurate with overscan crop. Also fixed issue where EXR display windows were off by one pixel for some resolutions
    

### Online

**New:**

-   NetDriverDefinition refactor across all platforms.
    
    -   Removed GameEngine re-definitions in Platform config.
        
    -   Moved Platform config from Engine to BaseEngine
        
-   Addition of support for EOS\_Connect\_AddNotifyAuthExpiration and related changes
    
-   Added support for creating JSON objects from utf8 strings, and utf8 strings from JSON objects
    
-   Added support to inject Javascript bound objects in onPageStarted instead of in onPageLoaded
    
-   Added functionality to public interface to convert EOS id type into UE id type
    
-   Added support for EOS\_Lobby\_AddNotifyLeaveLobbyRequested, new Sessions interface event and corresponding logic in CommonSessionSubsystem and CommonGameInstance reacting to it
    
-   Addition of support for new result of EOS\_Ecom\_Checkout: EOS\_Ecom\_PurchaseProcessing in OSS.
    
-   Deprecated OnlineIdEOSGS global methods
    
    -   Added new variants taking a Services parameter, to enable their use by other Services implementations.
        
    -   Modified relevant call-sites.
        
    -   Added OnlineServicesEpicCommon plugin, module and classes to encapsulate common functionality between the EOS/EOSGS and EpicGame/EpicAccount Services
        
    -   Added support for a new launch parameter -EnableEOSSplitPlugins, which will use EpicGame/EpicAccount instead of EOS/EOSGS
        
-   Update LAN sessions logic & API.
    
    -   Hosted LAN session information is now included in search results.
        
    -   Optimize session look-ups.
        
-   Refactored NetDriverEOS to infer P2P channel from the netdriver definition name.
    
    -   Removed related logic handling passed-in URL port.
        
-   Missing copyright boilerplate in new platform file for Privileges
    
-   Created platform Privileges interface base and moving auth to a component
    
-   Added logic to process sandboxid and deploymentid overrides for EOS platform creation in OnlineServices
    

**Bug Fix:**

-   Removed potentially lossy intermediate conversion to Ansi from FBase64::Encode and FBase64::Decode when encoding from or decoding to FString
    
-   Filter out touches on WebView control so they go through to the Android view that is under it
    

#### Hotfix System

**New:**

-   Removed an unnecessary FlushAsyncLoading call in the hotfix manager if there are no classes to reload
    

#### HTTP

**New:**

-   Limit the number of concurrent HTTP requests by default (256, previously INT\_MAX). This helps avoid connection timeouts when queuing up a very large number of HTTP requests.
    
-   Upgrade curl to 8.12.1
    
-   Upgrade nghttp2 to 1.64.0
    
-   Add option to enable different http versions for http request.
    

**Bug Fix:**

-   Use threadsafe delegate for FSslCertificateDelegates::VerifySslCertificates to prevent issues when the user provided ssl certification validation is changed while there's in-flight http requests.
    

#### Online Subsystem

**New:**

-   Fixes in FUserManagerEOS::GetLoginStatus and OnlineAchievementsEOS
    
-   OnlineServices (OSSv2): Implement OnSessionCreated and OnSessionJoined in the SessionsOSSAdapter so that an event is fired when a session is created and joined between OnlineSubsystem and OnlineServices
    
-   Added EOS Player Reports to OnlineSubsystemEOS
    
-   Add the lobby owner to member settings on creation, and change the log level from warning to verbose. This fix removes warnings that were incorrectly logged when a lobby was created.
    
-   Add SteamShared dependency to EOSShared and Lyra SteamEOS config.
    
-   Add a log message to EOS\_Ecom\_Checkout callback when EOS\_Ecom\_PurcahseProcessing is returned to let the caller know to call the OSS API that calls EOS\_Ecom\_QueryEntitlement
    
-   Rebound EOS P2P notifications when the EOS SDK transitions from online to offline, and then back to online.
    
-   Fixed incorrectly logged warnings when joining a lobby.
    
-   OnlineSubsystemEOS is moved out of BETA.
    
-   Adding EOS Player Reports and Player Sanctions to OnlineServicesEOSGS
    
-   Added logging to FSocketEOS
    

**Bug Fix:**

-   Update to AutoRefreshConnectLogin to support EOS as default OSS without EAS
    
-   Fix to a crashing bug in FSocketSubsystemEOS
    
-   Moving code to create/delete steam\_appid.txt to SteamShared. This was done to add SteamShared dependency to EOSShared. This fixes a crash on shutdown when EOS and Steam are used.
    
-   Add SteamShared dependency to EOSShared. This fixes a crash on shutdown when EOS and Steam are used.
    
-   Fix Connect Login refresh, which was failing on Switch due to missing UserLoginInfo
    
-   Allow "ENABLE\_PGO\_PROFILE 1" Shipping configuration to disable online subsystems from the command line, previously this was not possible, but was desirable for PGO profiling of Shipping executables.
    
-   OnlineSubsystemIOS: Handle race condition that can occur under poor network conditions when purchasing an offer immediately after finalizing a successful purchase of the same offer.
    

#### Websockets

**New:**

-   LwsWebSockets: Added ini configurable disabling of FLwsWebSocketsManager's default polling behavior.
    

#### XboxLive

**Bug Fix:**

-   Fixed a bug that could report incorrect privileges briefly after suspend/resume.
    

### Platform

**New:**

-   Platform screenshots, video recording, and video streaming can now be enabled and disabled via Console commands on platforms that support it. pf.SetScreenshotEnableStatepf.EnableRecordingpf.EnableStreaming
    
-   PerfTool: Adds support for Mac and Linux.
    
    -   Example commandline to build for Mac: cd Engine/Source/Programs/CSVTools/ ../../../../Engine/Binaries/ThirdParty/DotNet/8.0.300/mac-arm64/dotnet build CSVTools.sln -c
        
    -   Release Will output to a Platform specific folder (Windows continues to just be at CSVTools/): CSVStats -> /Users/zack.neyland/Perforce/zn\_ue5\_main/Engine/Binaries/DotNET/CsvTools/Mac/CSVStats.dll
        
    -   Updated the various .cs files to refer to the dlls (on Mac/Linux) and run them via UE's version of dotnet for Mac and Linux.
        
-   \[Linux\] \[Mac\] Make Turnkey persist UE\_SDKS\_ROOT on Mac and Linux
    
-   Streamlined the PlatformCrypto plugin by consolidating platform-specific context modules into a single PlatformCryptoContext module.
    
    -   Each platform now extends this module for its specific implementation.
        
    -   If no extension exists for a platform, the system defaults to the base OpenSSL implementation.
        

**Bug Fix:**

-   \[Linux\] \[Mac\] Fixed free disk space check in UGS CLI for mac and linux
    

#### Desktop

**New:**

-   ForceMaxTouchpadSensitivity
    
    -   Windows has a system setting which suppresses touchpad inputs while the user types on the keyboard. This setting is bad for playing a game with the touchpad and keyboard, the touchpad is often unresponsive. The setting defaults to "Medium". If it is set to "Most Sensitive" this touchpad suppression is disabled and many games work much better with the touchpad.
        
    -   The underlying system has several modes of operation, depending on the windows version and api availability.
        
    -   For windows 11 23H2+ we probe for the new SetMaxTouchpadSensitivity api and if it is available use that. When done this way the setting is specific to our app and we do not have to worry about focus/exit/crash.
        
    -   For windows 10 22H2+ (including all windows 11 that do not have the new API) we use the windows SetTouchpadParameters api to change the system setting. We undo that change when our app loses focus or exits. We write the restore setting to the registry and will re-apply that on a subsequent app run in order to hopefully preserve the user's system setting if the app crashes. We \*could\* also read that registry value in a separate process to repair after a crash, but this is not implemented here.
        
    -   For versions earlier than windows 10 22H2 we do nothing.
        
    -   See WindowsApplication.cpp namespace UE::WindowsApplication::TouchpadSensitivity for the CVar that activate the system and several CVars that can disable parts of the system.
        

**Bug Fix:**

-   Execute One Command List at a Time on Async Queues with NVIDIA Hardware
    
    -   Some NVIDIA drivers may drop barriers at the beginning of command lists executed on async queues. This can result in visual corruption.
        
    -   As a work-around, execute each command list individually on async queues when NVIDIA desktop hardware is detected. This can limit the overlap of GPU work in some cases but avoids corruption.
        
    -   New cvars were added to control this behavior on all DX12 platforms and per queue type:
        
        -   r.D3D12.Submission.MaxExecuteBatchSize.Direct
            
        -   r.D3D12.Submission.MaxExecuteBatchSize.Copy
            
        -   r.D3D12.Submission.MaxExecuteBatchSize.Async
            
    -   These are automatically configured during engine startup per the explanation above.
        

#### Linux

**New:**

-   Updated SDL to SDL 2.30.6 in preparation for future upgrade to SDL 3
    
-   Optimized compilation flags for Linux Server ARM builds. Added option to optimize for AWS Graviton2 and Graviton3 CPUs
    
-   Deprecated Linux toolchains older than v23, since they can no longer link against third-party libs compiled against Rocky Linux
    
-   Please use the v25 toolchain (llvm 18.1.0) even if you were previously using v23 on UE 5.5. Some glibc dependency issues were fixed up
    

**Bug Fix:**

-   Fixed an issue with chunked builds related to incorrect quoting of path
    
-   Fixed crash handler to print address when catching a SIMD SIGSEGV on Linux
    
-   \[Linux server\] Fixed Linux servers to regenerate crash GUIDs post-fork so that we don't get a ton of crash duplicates in the backend
    
-   Fixed FUnixPlatformProcess::GetDllHandle issue when non-module shared libraries are reloaded
    
-   Rebuild EpicWebHelper so it uses the new libtbb so.
    

#### Mac

**New:**

-   MacOS quality of life. When downloading from GitHub, a flurry of quarantine messages come up when running Setup on macOS. Remove quarantine to allow running post Github fetch Setup out of the box.
    
-   Implement mapped file support for all Apple platforms.
    
-   Bump minOS for Editor/Mac runtime to 14.00
    
    -   Also enables ld\_prime (the new linker).
        
-   Compatibility for mac SDK 14.0
    
-   Added RunOnQueue function to the Metal RHI to support third party up-scalars
    
-   Metal RHI SM6 now uses compute shaders to update bindless descriptors.
    

**Bug Fix:**

-   Fix disconnecting bug with sockets.
    
-   Add the AppStoreConnect ini keys to the base ini key deny list
    
-   Changed maximum query buffer size in MetalRHI to a CVar. Instead of failing when over allocating we now pass the occlusion query count when acquiring the buffer to ensure it fits.
    
-   Fix multithreaded threading crash.
    
    -   Decrement OutstandingAllocs at end of FreeRange rather than at the start of the method. This is because in some cases, an FMetalBuffer deletion may be pushed to a worker thread.
        
    -   That can then result in OutstandingAllocs hitting 0 while the deletion is still in flight on a worker, resulting in RHI thread Metah buffer heap compaction to kick in and delete the buffer's owning FMetalSubBufferHeap, leaving the worker FMetalBuffer deletion referencing dangling memory from the now deleted FMetalSubBufferHeap.
        
-   Rebuild EpicWebHelper so it uses the new libtbb dylibs.
    
-   Fix for TCC error with Bridge. Seems Bridge/CEF or something else requires bluetooth permissions, even though we aren't using them. Not having this key in the plist causes TCC to just kill/crash out app.
    
-   Removed triple buffering in MetalRHIBuffer, this could cause corruption whenever there are more that 3 locks per frame.
    

#### Online

**New:**

-   \[PixelStreaming2\] Refactor: InputHandler logic. It is now up to the individual modules to implement decoding of message structures. This enables the use of the base FPixelStreaming2InputHandler with differing protocols and message layouts.
    
-   \[PixelStreaming2\] Add: Ability to configure the embedded signalling server to serve content over HTTPS
    
-   \[PixelStreaming2\] Add: Option to configure the maximum number of reconnect attempts. Option defaults to unrestricted and can be accessed through the following.
    
    -   CVar: \`PixelStreaming2.SignalingMaxReconnectAttempts\`
        
    -   Launch argument: \`PixelStreamingSignalingMaxReconnectAttempts\`
        
    -   Project setting: \`SignalingMaxReconnectAttempts\`
        
-   \[PixelStreaming2\] Add: Option to configure whether the default stream starts automatically after module load. Option defaults to true and can be accessed through the following:
    
    -   CVar: \`PixelStreaming2.AutoStartStream\`
        
    -   Launch argument: \`PixelStreamingAutoStartStream\`
        
    -   Project setting: \`AutoStartStream\`
        
-   \[PixelStreaming2\] Add: Option to dump the mixed audio for local debugging. Option defaults to false and can be accessed through the following:
    
    -   CVar: \`PixelStreaming2.DumpDebugAudio\`
        
    -   Launch argument: \`PixelStreamingDumpDebugAudio\`
        
-   \[PixelStreaming2\] Add: Log category LogPixelStreaming2WebRtc for WebRtc logging used to differentiate EpicRtc logging.
    
-   \[PixelStreaming2\] Add: Option to select the type of default streamer to be created. Option defaults to "DefaultRtc" and can be accessed through the following:
    
    -   CVar: \`PixelStreaming2.DefaultStreamerType\`
        
    -   Launch argument: \`PixelStreamingDefaultStreamerType\`
        
    -   Project setting: \`DefaultStreamerType\`
        
-   \[PixelStreaming2\] Add: Option to filter EpicRtc logs. Option contains a double forward slash separated list of regex patterns to filter from the EpicRtc logs and can be accessed through the following:
    
    -   CVar: \`PixelStreaming2.EpicRtcLogFilter\`
        
    -   Launch argument: \`PixelStreamingEpicRtcLogFilter\`
        
    -   Project setting: \`EpicRtcLogFilter\`
        
-   \[PixelStreaming2\] Refactor: Use PixelCapture plugin for texture pixel format conversion during decode.
    

**Bug Fix:**

-   \[PixelStreaming2\] Fix: Mac not working with VPX.
    
-   \[PixelStreaming1, PixelStreaming2\] Fix: Infinite KeyFrameLength encoding with AMD graphics card with Pixel Streaming 1 and 2.
    
-   \[PixelStreaming2\] Fix: PixelStreamingWebRTCPortAllocatorFlags CVar is now read correctly.
    
-   \[PixelSTreaming1, PixelStreaming2\] Fix: Frame tearing when streaming with VP8 and VP9.
    
-   \[PixelStreaming2\] Fix: Quality setting not being set.
    
-   \[PixelStreaming2\] Fix: SendPixelStreaming2Response not working.
    
-   \[PixelStreaming2\] Fix: Simulcast streams not streaming the highest resolution layer.
    
-   \[PixelStreaming2\] Fix: StreamerComponent missing calls to Super.
    
-   \[PixelStreaming2\] Fix: Application crash when processing a gamepad analog event if the gamepad has been disconnected.
    
-   \[PixelStreaming2\] Fix: Pixel Streaming 2 crash with VP8 when frame resizes.
    
-   \[PixelStreaming2\] Fix: H264 not streaming with NegotiateCodecs with AMD graphics card. Receiving video is disabled with an AMD graphics card and H264.
    
-   \[PixelStreaming1, PixelStreaming2\] Fix: Pixel Streaming Capture Stats using incorrect time units.
    
-   \[PixelStreaming2\] Fix: Frame stuttering with MediaIO due to not waiting for texture copy completion
    
-   \[PixelStreaming2\] Fix: Streamer disconnect/reconnect logic
    
-   \[PixelStreaming2\] Fix: Play In Editor (PIE) streamer not disabling the CPU throttling setting
    
-   \[PixelStreaming2\] Fix: Crash using blueprint delegates.
    
-   \[PixelStreaming2\] Fix: Several deadlocks and crashes when stopping a PixelStreaming2 stream or shutting down.
    
-   \[PixelStreaming1, PixelStreaming2\] Fix: Crash when Decoding VP9 on Apple with VTCodecs.
    
-   \[PixelStreaming2\] Fix: Crash streaming VP9 video with an odd width or height. Streamed VP9 video will be clamped to an even size.
    
-   \[PixelStreaming2\] Fix: Stat groups showing up twice in standalone and packaged.
    
-   \[PixelStreaming2\] QOL: Added legacy command arguments to support PixelStreaming1 style launch arguments.
    
-   \[PixelStreaming2\] Refactor: Removed OnScreenStats cvar. \`-PixelStreamingOnScreenStats\` and \`-PixelStreamingHudStats\` still work to trigger the stat group on launch.
    
-   \[PixelStreaming2\] Fix: Crash in VideoSourceGroup that could happening when stopping a stream.
    
-   \[PixelStreaming2\] Fix: Screen tearing in stream when using Pixel Streaming 2 with AMD gpu. PixelStreaming2 now enables CaptureUseFence CVar by default with AMD graphics cards.
    
-   \[PixelStreaming, PixelStreaming2\] Fix: StreamerComponent not working with internal signalling server.
    
-   \[PixelStreaming1, PixelStreaming22\] Fix: A crash that could happen when ending a stream caused by a data race accessing Pixel Streaming stat delegates. These delegates now fire on the game thread.
    
-   \[PixelStreaming1, PixelStreaming2\] Fix: A crash when multiple FrameCapturers capture a frame, causing a data race inside Pixel Capture OnComplete delegate.
    
-   \[PixelStreaming\] Fix: Crash when SFU and normal player connect to PixelStreaming1.
    
-   \[PixelStreaming2\] Fix: Frames appearing out of order when using MediaCapturer.
    
-   \[PixelStreaming2\] Fix: Crash during application shutdown due to the SoundGenerator being accessed post UObject destruction.
    
-   \[PixelStreaming2\] Fix: Input handling not functioning correctly when multiple gamepads are connected.
    
-   Fixing some issues with signalling connection that can happen after the connection has been destroyed.
    
-   \[PixelStreaming2\] Fix: Decoder displaying old frames and leaking video memory.
    
-   \[PixelStreaming2\] Fix: Project settings set in an ini not loading when the application is packaged.
    
-   \[PixelStreaming2\] Fix: Pixel Streaming 2 VP9 sporadic frame corruption.
    
-   \[PixelStreaming2\] Fix: Improve recovery from black stream when resizing the window when multiple streamers are connected.
    
-   \[PixelStreaming2\] Fix: Max bitrate not being set after stream starts.
    
-   \[PixelStreaming2\] Fix: Signalling server unable to connect when port is already in use.
    
-   Fix: Intermittent crash in Pixel Streaming 2 when sending TextboxEntry message from frontend.
    
-   \[PixelStreaming1, PixelStreaming2\] Fix: Capturing frames with VP8 and VP9 on Mac with MediaCapture.
    
-   \[PixelStreaming2\] Fix: Application crashing when peer connected with UseCamera URL param disconnects
    
-   \[PixelStreaming2\] Fix: Audio stopping when multiple players are connected and one is removed.
    
-   \[PixelStreaming2\] Fix: Encoder not creating a new dump file each time the debug dump frames cvar is toggled.
    
-   \[PixelCapture, PixelStreaming, PixelStreaming2\] Fix: Memory leaks on DX11 due to fences not being removed.
    
-   \[PixelStreaming2\] Fix: When streaming the level editor, match viewport changes the  level editor viewport resolution instead of the editor window resolution.
    
-   \[PixelStreaming1, PixelStreaming2\] Fix: Removed log spam about "Can't capture frame" when using MediaCapture with VP8 and VP9.
    
-   \[PixelStreaming2\] Fix: Don't display error about unable to push frame on last frame during stream.
    
-   \[PixelStreaming2\] Fix: Only one frame being displayed when decoding on Mac
    
-   \[PixelStreaming, PixelStreaming2\] Fix: Crash using -stompmalloc due to bad buffer sizes
    

#### Windows

**New:**

-   Opt-in experimental remote debugging support for Visual Studio on Windows. When enabled via BuildConfiguration.xml, Win64-arm64 will default to Remote Windows Debugger on x64 platforms with the necessary Visual Studio fields configured.
    
-   Windows architecture selection is available in the Platforms menu when building for Windows.
    

**Bug Fix:**

-   Fixed the underreporting of Windows D3D12 texture data in LLM
    

#### XR

**New:**

-   Added CVar to control whether late update poses are snapshotted before or after planar reflection rendering (xr.OpenXRLateUpdateDeviceLocationsAfterReflections, defaults to false).
    
-   OpenXR 1.1 support, some additional minor fixes
    
    -   OpenXR header update: OpenXR-SDK-release-1.1.46
        
    -   New project settings in OpenXR plugin: Enable OpenXR 1.0, Enable OpenXR 1.1. We will try to create an instance with each versions enabled, starting with the latest enabled version.
        
    -   We now support both XR\_EXT\_COMPOSITION\_LAYER\_INVERTED\_ALPHA\_EXTENSION\_NAME and XR\_FB\_COMPOSITION\_LAYER\_ALPHA\_BLEND\_EXTENSION\_NAME with the former taking precedence.
        
    -   XR\_VIEW\_CONFIGURATION\_TYPE\_PRIMARY\_QUAD\_VARJO has been replaced by XR\_VIEW\_CONFIGURATION\_TYPE\_PRIMARY\_STEREO\_WITH\_FOVEATED\_INSET. These defines have the same value and function with openxr 1.1 or 1.0.
        
    -   The LocalFloor space is always supported in 1.1, we only check for the extension in 1.0. XR\_REFERENCE\_SPACE\_TYPE\_LOCAL\_FLOOR\_EXT replaced by XR\_REFERENCE\_SPACE\_TYPE\_LOCAL\_FLOOR. These defines have the same value and function with openxr 1.1 or 1.0.
        
    -   With openxr 1.1 we now prefer the grip\_surface pose identifier to the palm\_ext pose identifier, and will use the former for the palmAction. In openxr 1.0 palm\_ext would be used if the extension is supported. The two poses have an identical geometric specification in the standard.
        
    -   OpenXRHMD->IsOpenXRAPIVersionMet() is provided to help with any openxr version support decisions that are needed.
        
-   ARCore Vulkan Support
    
    -   Vulkan support for GoogleARCore plugin on Android.
        
    -   ARCore with OpenGL is now officially deprecated. It is also non-functional in UE 5.6 because an opengl context refactor removed the shared contexts available on the game thread. A significant refactor of ARCore support would be needed to get it working in 5.6.
        
        -   5.4 is the recommended version with OpenGL support for ARCore working correctly.
            
-   Significantly overhauled the OpenXR API and layer system for improved thread safety and flexibility.
    
    -   GraphBuilder is now passed instead of RHICmdList for OpenXRHMD rendering, and the original overloads have been deprecated.
        
    -   FSceneViewFamily is now passed to IOpenXRExtensionPlugin calls, and the original overloads have been deprecated.
        
    -   IStereoLayers are now accessed strictly on the game thread, with render state management moved to specific implementations such as FOpenXRLayer.
        
    -   See programmer notes for info on API changes.
        
-   XR Passthrough alpha blending incorrect on some platforms.
    
    -   The common issue is that Unreal uses 0=opaque 1=transparent for alpha values rather than the reverse which is much more common.
        
    -   Here I extend and refactor the AlphaInvert pass I originally added only to the Mobile renderer to the desktop renderer.
        
    -   A new AlphaInvert Engine ShowFlag will cause the pass to run at the end of postprocessing in the desktop renderer. It also runs at the end of the mobile renderer. OpenXRHMD will set this showflag if the CVAR r.AlphaInvert is true.
        
    -   In principle setting this showflag could also be useful for other scenarios where we are outputting with alpha.
        
    -   The pass does not run if the primary upscale pass is running, because that already does an alpha invert.
        
    -   This is not the most performance-optimal way to invert the alpha value for output. It may be possible to working the invert into another already running full screen pass, as we did with the primary upscale pass.
        
    -   r.AlphaInvertPass will now enable the pass for all renders.
        
    -   OpenXR.AlphaInvertPass will do it specifically for the XR views.
        
-   Added CVar r.ForceStartInVR, which overrides the project setting (or lack of -vr commandline argument) and forces the application to attempt to start in VR.
    
-   VisionOS | Enable Mixed Immersion mode by default if VisionOS 2+ is used. This allows Mixed Immersion Mode to work in Binary/Launcher-version of the Editor.
    
    -   Note that /Engine/ or /Project/'s VisonOSEngine.ini settings must also be enabled as outlined in the AVP Quick Start guide for Passthrough to work.
        
-   Added CVars to choose which slice of the texture array is used for screenshots when in Mobile Multi-View (r.Screenshot.TextureArrayIndex), and to allow collating multiple slices into a single image, vertically or horizontally (r.Screenshot.TextureArrayMode).
    
-   Update ARCore to 1.48
    
-   OpenXR Android Loader 1.1.46 -
    
    -   Added openxr android libopenxr\_loader.so from openxr 1.1.46.
        
    -   Removed and stopped using the oculus libopenxr\_loader.so from the OculusOpenXRLoader module, but we are still using the OculusOpenXRLoader\_APL.xml to setup to launch into vr on oculus if we are set to package for quest in android project settings.
        
-   Updated r.DynamicRes.TestScreenPercentage even when dynamic resolution is not supported by the RHI, and on stereo devices.
    
-   Improved XR cinematic smoothing (xr.CinematicCameraSmoothing):
    
    -   Prevent delayed camera rotation from taking the "wrong route" to get to the current camera rotation by normalizing DeltaRotation.
        
    -   Ensure that the delayed camera rotation matches the current camera rotation when smoothing is enabled rather than starting at (0,0,0), or the last stored value.
        
-   VisionOS Improve switching between Fully Immersive and Mixed Mode
    
    -   VisionOSRuntimeSettings now control the immersionStyle and upperLimbVisibility properties of the immersive space.
        
    -   Establishes a pipeline for pushing data into SwiftMain.swift from Unreal C++, specifically from LaunchIOS.cpp in this case.
        
-   Added a new API "virtual void PostBeginFrame\_RHIThread(XrTime PredictedDisplayTime)" to IOpenXRExtensionPlugin. This API is called from OpenXRHMD immediately after xrBeginFrame.
    
-   Added support for generic passthrough on supporting runtimes.
    
    -   Add use-feature com.oculus.feature.PASSTHROUGH to the Android manifest when packaging for Meta Quest.
        
    -   Avoid pulling in the XR\_FB\_composition\_layer\_alpha\_blend OpenXR extension when XR\_EXT\_composition\_layer\_inverted\_alpha is available. The FB extension restricts available environment blend modes and prevents using passthrough via the generic EXT extension.
        
    -   Set bProjectionLayerAlphaEnabled to true in OpenXRHMD when we are on a mobile platform and r.Mobile.PropagateAlpha=True.
        
-   Combined light grid data for both eyes into one buffer when using single pass stereo (instanced stereo or mobile multi-view).
    
-   Added UnrealInsights TRACE\_BOOKMARK tags to major OpenXR frame events (xrWaitFrame, xrBeginFrame, xrEndFrame).
    

**Bug Fix:**

-   Fixed ensure caused by the editor forcing EngineShowFlags.ScreenPercentage on for HighDPI even when screen percentage is unsupported by the view.
    
-   Fix shader compilation failure when Mobile HDR and MMV is enabled in project
    
-   MSAA resolve with explicit fmask produces incorrect alpha values
    
    -   We were accumulating the sample values into a 0,0,0,1 vector, so there was always an extra +1/msaaLevel into the resolved pixel value (ie msaa2x alpha ranged from 0.5-1.5 and 4x from 0.25-1.25).
        
    -   In 4x, for example, the 1.25 would be clamped down to 1, aka full transparency in UE's convention but the 0.25 would remain meaning we never had full opacity.
        
-   Only update the Activity Intent-filter for Quest
    
-   Remove USB host feature manifest tag for Meta devices
    
-   Fixed screenshot functional tests taking corrupted screenshots and failing on mobile XR devices.
    
-   ARCoreServices breaks ARCore with Vulkan
    
    -   Fixed blueprint function which activates cloud anchors losing various other settings, including one required for vulkan to function.
        
-   VisionOS SwiftUI splash dialog improvements
    
    -   Fix the problem where audio goes away when you close the splash dialog. The issue is that the audio is associated with the window such that when the window closes audio is killed. We can avoid that simply by dismissing the window before we start up audio, and really the dialog should auto-dismiss anyway.
        
    -   Added a countdown display to the auto-start, mainly because it is less confusing.
        
    -   Note that in this implementation the dialog goes away and then it takes UE 2-3 seconds to present an immersive frame, so we get a gap where nothing is displayed.
        
-   Fixed a crash when updating or moving OpenXRHMD static swapchain layers.
    
-   Fixed a bug causing audio to be directed to the PC speakers when using Quest devices via Link.
    
-   VisionOS
    
    -   Fixing RHIEndDrawingViewport assert and LOCAL\_FLOOR space problem
        
    -   If the current encoder does not currently have a command buffer we need to start one.
        
    -   Added support for LOCAL\_FLOOR space. The default space in visionOS does put zero at the floor.
        
-   Apple Vision Pro audio spatialization fix
    
    -   Our audio is already spatialized, but was also being spatialized by Apple's audio system.
        
-   Add handtracking permissions for Quest
    
-   VisionOS uninitialized bRuntimeRequiresRHIContext
    
    -   This member was uninitialized. If it is randomly true we would pass this extension into other openxr runtimes, which they should ignore, but we still do not want to pass it unnecessarily
        
-   Fixed a crash caused by a race condition in FLateUpdateManager when the game thread was significantly ahead of the render thread.
    
-   Draw debug will crash visionOS
    
    -   Fixed FPopulateCompositeDepthPS missing shader problem, we were attempting to use a shader permutation that doesn't make sense and isn't compiled.
        

**Deprecated:**

-   Removed "Quest" from ApplicationSettings when Package for Meta Quest is checked. Quest 1 is no longer supported.
    
-   Deprecated the OpenXR "GetPixelDensity" BP node, replacing it with "Get XR Secondary Screen Percentage".
    
-   Mobile Multi-View Fallback, which was used to emulate MMV for platform previews when the editor's RHI did not support it (such as running Android Vulkan Mobile VR Preview on an editor launched with the default D3D12 RHI), has been deprecated.
    
    -   Normal "splitscreen-like" rendering will now be used instead.To preview MMV on desktop, you can launch the editor with "-vulkan" to use the Vulkan editor, which can support MMV on desktop if your driver supports the VK\_KHR\_Multiview extension.
        
    -   If you still need to use MMV Fallback, it can be re-enabled by toggling the UE\_SUPPORT\_MMV\_FALLBACK define in StereoRenderUtils.cpp to 1.
        

### Platform Mobile

****New**:**

-   Added API needed for cellular data download opt-in dialogue
    

**Bug Fix:**

-   Mobile: Wait for main visibility tasks to be finished before starting shadow tasks which depend on their results. Failing to do so results in a race condition where the shadow system references these results while they are still being computed resulting in a variety of potential crashes.
    

#### Android

**New:**

-   Updated to AGP (Android Gradle Plugin) 8.5.2 with Gradle 8.7
    
-   Added -f option to UAFT for to select file to write to commandline with the command operation
    
-   Updated to new Android Studio version for Turnkey (Android Studio Koala 2024.1.1 Patch 2)
    
-   Added support for Android NDK r28
    
-   Changed the default InputDeviceMappingPolicy to PrimaryUserSharesKeyboardAndFirstGamepad.
    
-   Implement support for android:minAspectRatio, generally useful for foldables with square aspect ratios and apps that may want to cut off the aspect ratio to 4:3 for example. Additionally, adjust Max Aspect Ratio default to 2.4 to not letterbox on many newer devices (with aspect ratios above 2.1) by default.
    
-   Added device profiles for Adreno 8xx devices
    
-   Updated vulkan validation layers with 16kb page support
    
-   Updated swappy with 16kb page support
    
-   Moved UE Android from 64kb to 16kb ELF alignment for 16kb page size support
    
-   Bypassed the NaN thermal headroom return value from getThermalHeadroom(), and EForecastPeriod::INSTANT is provided for calling getThermalHeadroom with 0 forecast period.
    
-   Improved the performance of Android Media Player by utilizing ImageReader/HardwareBuffer to provide image data to renderers.
    
-   Overlap system info collection with loadlibraries Add caching to configrules (optional CONFIGRULES\_CACHE\_KEY for encryption), invalidated by system info changes or new configrules file.
    
-   Increased minimum Vulkan requirement for Adreno devices to drivers greater than V@0500, due to GPUScene compatibility issues with older drivers
    
-   A new, experimental, and much faster ElectraPlayer video output path for Vulkan is now available and can be enabled via CVAR Electra.AndroidUseGpuOutputPath
    
-   Added new -crvars commandline option to modify ConfigRules variables for non-Shipping builds. -{var} clears it, {var}={value} sets value.Example: -crvars=myvar=true,-clearme
    
-   Added preparsing to config rules for improved startup timeConfigRulesTool parser mode ('p' command)New -verbose flag for 'p' (regex optimizes) and 'd' commands (offsets for debug)
    
    -   Added validation with errors showing line number RegEx optimizer (replaces simple string comparisons)
        
-   Removed deprecated GoogleSignIn support implementation from OnlineSubsystemGoogle for Android. Supported only CredentialManager implementation
    
-   Made generation of Visual Studio Solution also create additional Android-arm64/x64 configs.
    
-   If bUseChangeListAsStoreVersion is set, the Android store version is now set to the changelist number from Engine\\Build\\Build.version even for non-build machines. This is useful for UnrealGameSync users, as UGS updates Build.version automatically.
    
-   Removed excessive number of libUnreal.so copies during Android builds, by creating symlinks/hardlinks to the source.
    
-   Fixed typo in JavaReservedKeywords in UEDeployAndroid.cs
    
-   Updated heapprofile with 16kb memory page support
    
-   Changed FAndroidPlatformProperties::GetMemoryMappingAlignment to 16kb from 4kb to support 16kb page size on Android
    
-   Added compression of debug symbols with the flag bCompressDebugSymbols under /Script/AndroidRuntimeSettings.AndroidRuntimeSettings.
    
-   Added support to run on Android Emulators on non-shipping builds with the flag bForceEmulatorProfileSelectionInNonShippingBuilds under /Script/AndroidRuntimeSettings.AndroidRuntimeSettings.
    
-   Added support for multiple manually installed Android SDK/NDKs for different engine versions.Bug Fix: Fixed gradle NDK\_VERSION and NDKROOT potentially being out of sync.
    
-   Added support for Google Play Games for PC Emulator.
    
-   Added zen server plugin to forward zen server port to any connected android device that has apps requiring zen streaming
    
-   Replaced reading bundle value with a generated build constant IS\_SHIPPING\_CONFIG in both GameApplication and GameActivity java classes.
    
-   Updated GooglePlay Billing library to 7.1.1 in OnlineSubsystemGooglePlay
    
-   Removed need for security token for debuggable applications when using AndroidFileServer with UnrealAndroidFileTool
    
-   Start loading libUnreal dependencies early for faster startup time
    
-   Recompile libopenxr\_loader with 16kb page support based on NDK 27.2
    

**Bug Fix:**

-   Additional threading protections for background downloading
    
-   Fixed the BP node "Get Game Controller Name" and "Is Controller Assigned to Gamepad" not working when launching the game while a gamepad is already connected.
    
    -   Fixed the gamepad disconnection delegate not being called.
        
-   Added GameController classes to Proguard
    
-   Allow airplane mode to use WiFi if enabled by user
    
-   Fixed hazard with request completion broadcast in background downloader
    
-   Fixed issue with how results for work manager tasks status checked
    
-   Fixed up support for localized notification channel names (getLocalizedResource() in LocalNotificationReceiver.java)
    
-   Enabled trim for UnrealAndroidFileTool to reduce size of executable.
    
-   Fixed Android OS thread always thinking it's the game thread.
    
-   Fixed the most recently used hardware input device is reported as the wrong type.
    
-   Fixed touch input with device ID 0 is not handled.
    
-   Do not attach network connection monitoring to PSOService processes
    
-   Updated to Fetch2 3.3.0 to fix issue with enqueuing new requests after previous batch completes in background downloader plugin
    
-   Fixed resuming from waiting for cellular if WiFi reconnects (background downloader)
    
-   Reworked handling of network activity (airplane mode, datasaver, cellular) for background downloader
    
-   Fixed directory checked for profile for Android variables on Mac
    
-   Fixed FFileHandleAndroid::GetSize returning old size after Truncate call
    
-   Fixed issue with multiple restarts of background download worker
    
-   Fixed issue with premature reuse of previous download task filenames in background downloader
    
-   In SplashActivity terminate early to allow activity already running at top of stack to resume (helps with calling out to external activities)
    
-   Fixed the Input Device Subsystem delegate not being called.
    
-   Fix for missing virtual keyboard input on Meta devices
    
-   Fixed failure creating sockets for Android in when the resulting socket file descriptor is greater 1024
    
-   Fixed the game controller reconnection state not being updated.
    
-   Fixed the mouse inputs won't be acknowledged when using scrcpy to simulate the input.
    
-   Added .aiexclude to Gradle to disable Gemini by default when using Android Studio (edit or delete from Engine/Build/Android/Java/gradle if you want to use it)
    
-   Fix OpenGL LLM buffer tracking by lining it up with RHI core stats.
    
-   Use correct Manual depth test for 32F depth for Vulkan and GL.
    
-   Fixed a crash when calling AssetRegistry.ScanPathsSynchronous() with a folder path ending in '/'.
    
-   Fixed the events of Ctrl keys are discarded.
    
-   Fixed generated non-Windows Android install scripts, for builds with overflow OBBs.
    
-   Added detection of SQLite lock error on enqueue (can happen after deleteAll) for background downloader
    
-   Fixed GetConfigRuleVars FConditionVariable usage, as it could cause a hang.
    
-   Added new dump\_syms\_comp.exe supporting compressed Symbols for Android use
    
-   Replace libhwcpipe with C wrapped .so to avoid C++ STL ABI conflicts on Android
    
-   Fixed issue with reading from assets from AssetManager with starting offset other than 0 (could happen if uncompressed)
    
-   Updated Background downloader plugin with rebuilt version of Fetch2 3.3.0 using new version of androidx.room 2.7.1 to correct issue with database locking
    
-   Fix kotlin stdlib related building issues on Android by constraining conflicting kotlin stdlib dependencies to >=1.8.0
    
-   Fixed bSaveSymbols from being always forced to true.
    
-   Fixed symbols now able to be hidden in non-shipping builds.
    
-   Fixed small bugs in the Android deploy process.
    

#### iOS, tvOS, and iPadOS

**New:**

-   Add all the new iPhone16 based devices to the base device profile
    
-   Added information about UE allocations into Apple XCode Instruments memory tracker
    
-   Fixed issue with GeneratePsyms command where input files have spaces in path
    
-   Expose IOS entitlement paths.
    
-   Added webview.EnableInspectable CVar for iOS to allow to inspect WebView with Safari developer tools
    
-   Update MetalDeveloperTools to version 4.4 from 4.1
    
-   Limit rhi.Metal.MaxQueryBufferSize to 65528 on A12 or below devices.
    
-   Add new early 2025 iPads to device profiles.
    
-   Add initial support for iOS App Extensions, starting with the Notification Service Extension
    
-   Allow separate signing profile for iOS app extensions for the ResignApp.sh scrip. ie: IOSProvisioningProfile\_NotifService=(FilePath="")
    
-   Make FAppleHttpRequest::SetContentAsStreamedFile log the actual error when stat fails
    
-   Update NSAppTransportSecurity support for iOS17+.
    
-   Move metallib to paks Memmap metallibs to not run oom Removed most of the non-UFS code that was used only for metallibs Removed bundle install logic that was for metallibs/IOS as it is no longer needed
    
-   Fixed iOS Remote Toolchain build issue where blueprint projects did not correctly use the project's settings for the remote Mac IP and username.
    
-   Unreal Insights now will capture information about swap memory and swap events when memory tracing is enabled on Apple platforms. You can inspect what allocations are go to/from swap and optimize your memory usage even further.
    
-   IPad physical keyboard improvements
    
-   IOS functional parity with Android. Ensure that when supported orientations are set at runtime, that the application autorates to a valid orientation.
    
-   Replace deprecated SCNetworkReachability API with a lower level Network based nw\_path implementation.
    
-   Adding Apple Silicon mac as a target device for running iOS projects
    
-   New: Broadcast network changed core delegate for iOS
    

**Bug Fix:**

-   Verified background downloaded files by comparing their size to expected file size and rejecting the download if sizes don't match
    
-   Fix launch of iOS Blueprint projects
    
-   Fix iOS/Metal assertion and termination when Scene Captures are in use but the Distortion pass is disabled.
    
-   Fixed various issues in iOS background download code
    
-   Fix plist value causing issues with launch orientation and UISupportedInterfaceOrientations plist duplication
    
-   Ensure the pragma clang optimizations are defined on/off appropriately for Mac and iOS clients
    
-   Fix for Editor failing to launch iOS build on device
    
-   Allow DefaultDeviceProfiles.ini to define future iOS devices.
    
    -   There was an issue whereby new IOSDeviceMappings would be ignored when added application side to DefaultDeviceProfiles.ini.
        
    -   This was due to BaseDeviceProfiles.ini defining fallback devices for future proofing (iPhone\*, iPad\*, etc.) that would supersede any mapping defined app side.
        
    -   To avoid this, move fallback device mappings to its own IOSFallbackDeviceMappings section and handle separately.
        
    -   Support addition of future iOS device profiles via game side DefaultDeviceProfiles.ini
        
-   Migrate from deprecated openURL: to openURL:options:completionHandler. As of iOS 17, openURL is documented as "Calling this method has no effect.", however, in practice, it still appears to still have lingering functionality, however, schemes such as shareddocuments are not handled. Drive by add URL scheme detection parity WRT Mac/Android, adding http:// if no scheme is present in the requested URL.
    
-   iOS fix audio interruption during foreground phone calls.
    
    -   When iOS is interrupted by a phone call, users can take the call while keeping the application in the foreground.
        
    -   During this time, the Audio mixer still runs, however, AudioUnit/AUGraph gets paused and stops dispatching callbacks.
        
    -   During these interruptions spawn a Null audio device to continue consuming the packets similarly to the necessary approach on XAudio2.
        
    -   To achieve this, add audio interruption delegate that the AudioUnit platform can listen to and adjust its behaviour accordingly.
        
    -   Additionally, in AudioMixerNullDevice.cpp, ensure that CallbackThread is initialized before the Null device thread is awakened so that it isn't dereferened on that thread prior to initialization.
        
-   Work around iOS 16 and older dynamic linker bug that could cause libc++.dylib's operator new/delete stub pointing to UE's new/delete global overrides initially, get replaced with the default operator new/delete from libc++abi.dylib on subsequent runs of the application.
    
    -   Issue and experimental workaround are documented at https://developer.apple.com/forums/thread/774805?answerId=826017022#826017022 . The workaround consists in creating and linking a framework with Dyld interposing. The presence of the "\_\_DATA,\_\_interpose" section and function replacement triggers a different path in the dynamic linker avoiding the issue at hand.
        
-   Fix iOS dialog alerts not showing during startup
    
-   Fix Xcode16.3 compilation issues
    
-   \[Gauntlet.TargetDeviceIOS\] Improved validation for host connection at the start of a test.
    
-   Added parsing for Tunnel State when validating iDevice connections.
    
-   Added usbmuxd process restarting in InitializeDevices()
    

### Rendering

**New:**

-   Expose additional properties to blueprints on SkyAtmosphereComponent. AerialPerspectiveStartDepth and TransmittanceMinLightElevationAngle.
    
-   SceneCapture: Moved SetupViewFamily & SetupView scene view extension calls before renderer creation to match the main render path.
    
-   Refactored GPUSceneWriter API to hide internals from public interfaces.
    
    -   This is a step towards refactoring the GPU scene data layout to support reserved resources (and other future changes we may want to effect).
        
    -   The general change is to move the writer parameters into an UB that is forward declared (abstract) in public RENDERER\_API and to move GPUSceneWriter.h to the Renderer module.
        
    -   As FGPUSceneWriteDelegate is referenced in the FMeshBatchDynamicPrimitiveData in the Engine module, this also required an abstraction.
        
    -   API breakage: To minimize impact on the mesh batch pipeline, FGPUSceneWriteDelegate::CreateLambda was overloaded to take FMeshElementCollector to allocate from. This will produce a compile error which is simple to fix for any licensee that may use this.
        
-   Workaround for crash triggered by using the duplicate function in the ISMC instance array in the editor by forcing a full update.
    
-   Fixed capture passes using RenderCaptureInterface::FScopedCapture being culled in RDG & made scoped captures able to open PIX. This path is used by e.g., r.CaptureNextDeferredShadingRendererFrame
    
-   Added view updates and ID to FScene similar to how other primitives are managed. This applies to view states, as state-less views are not able to retain persistent information.
    
-   Decouple spline mesh rendering from the spline mesh component - FSplineMeshSceneProxyDesc can be used to render a spline mesh instead of using a component.
    
-   \[First Person\] Initial support for HWRT effects.
    
    -   Supports Lumen HWRT reflections and HWRT shadows.
        
    -   Primitives tagged as FirstPerson are ignored by HWRT as they only make sense from the camera's point of view and would cause weird visuals if they were visible in reflections or shadows.
        
    -   Primitives tagged as the WorldSpaceRepresentation of a FirstPerson primitive are "seen" by rays launched from scene pixels but ignored by rays launched from first person pixels.
        
    -   This way we can achieve player shadows/reflections on the ground/scene without getting "self"-intersection artifacts on the first person geometry seen by the player.
        
-   \[First Person\] Implemented support for custom material outputs in MaterialAttributes.
    
    -   This extends support for the handful of existing supported outputs to now actually compile them without needing to get the custom output attribute at the end of the graph and then pipe it into the corresponding custom output node.
        
    -   In addition, the FirstPerson output node (FirstPersonInterpolationAlpha to be precise) is now also supported by MaterialAttributes, enabling workflows where the FirstPerson lerp factor can be set from material functions.
        
-   \[VSM\] Implemented VSM per-instance deforming state tracking on GPU such that we can know when an instance switched state on the GPU and trigger invalidation.
    
-   \[First Person\] Implemented a specialized first-person clipmap for casting shadow from the (owner no-see) 3rd person mesh onto the environment, but not the (visible) first-person geometry.
    
-   Scene proxy instance management cleanup.
    
    -   Removed dependency on UInstancedStaticMeshComponent/FInstancedStaticMeshSceneDesc from scene interface.
        
    -   Removed StaticMeshBounds from UpdateInstances\_RenderThread as it is unused and tied instancing to the static mesh for no reason and deprecated the old version.
        
    -   Removed some previously deprecated interface from FPrimitiveSceneProxy.
        
-   Fix hair strands texture generation parameters being not preserved if the groom didn't have any import settings saved. This exposes and saves a list of textures generated by the hair strands texture generation. This allows regenerating the hair texture into the same texture, or rerouting them.
    
-   Added instance hierarchy support for updating primitives with precomputed data. This supports rebuilding the hierarchy on the fly, which is useful for debugging, among other things.
    
-   \[First Person\] Added IsFirstPerson material graph node.
    
-   Removed deprecated ISMC interface and fixed a small bug in the implementation of UpdateInstanceTransformById (confusing bTeleport for bMarkRenderstateDirty).
    
-   Changed the shadow fade out to depend on the shadow resolution scale to give greater control over how individual lights fade out their shadow, the old behavior can be enabled by turning off "r.Shadow.DoesFadeUseResolutionScale".
    
-   Remove ability to turn off r.SceneCulling. Allows us to remove duplicated InstanceCullVSM logic and shaders and simplify architecture.
    
-   \[First Person\] Added First Person Space as a transform destination to the TransformPosition material graph node.
    
-   Add Build All button for SVT, which bakes the texture for both the current feature level and the alternate one (mobile SVT) if needed
    
    -   Centralized code for SVT baking (editor build command, commandlets, RVT component Build(/All) button)
        
    -   Better messaging when SVT is detected as not up-to-date (e.g. when the mobile SVT is not up to date because it was only partially rebuilt)
        
    -   Use Fixed Color is now consistently used across all SVT baking processes (editor build command, commandlets, RVT component Build(/All) button) instead of only the RVT component Build buttons
        
-   Add vertex color support for cards/meshes groom. Vertex color presents in the imported static meshes used for cards/meshes geometry are now preserved and accessible in shaders. This data is optional.
    
-   Add Groom binding support for Guide-Cache.
    
-   Update the D3D12 SamplerState cache to use a hybrid LRU cache, increasing the global unique sampler limit from 2048 to 65536. There is still a limit of 2048 used in a single frame.
    
-   Prevent unregistered RVT components from being processed by the SVT builder. This can happen for RVT components part of an unloaded data layer.
    
-   Add UI for remapping groups when reimporting groom assets with different group layouts.
    
-   \[VSM\] Set clipmap far culling plane to just beyond the visible range when force invalidate is enabled, greatly reducing rendered geometry in some cases. Can be disabled using r.Shadow.Virtual.Clipmap.CullDynamicTightly (default true).
    
-   Add groom support for batched import and reimport.
    
-   Add HZBParameters shader parameters and unify HZB parameter bindings.
    
-   Add copy pasting to groom asset panel data.
    
-   Expanded option to visualize SVT in editor, which now has 3 options : Always, Never and Only In PIE.
    
-   \[First Person\] Enabled additional primitive types to work with FP (WidgetComponent, Paper2D, ParticleSystem).
    
-   Added separate RayTracing TLAS for FarField. Makes Far Field traces ~20-25% faster on console
    
-   Remove unnecessary FTransform ZeroRotator->Quat conversion in (H)ISM
    
-   Made the light grid feedback pass also run on the async queue to prevent it from causing a sync.
    
-   Allow light culling to be run on async compute.
    
-   \[First Person\] Added support for first person rendering in scene capture 2D components.
    
-   \[VSM\] Added receiver masks that can improve clipmap culling effectiveness significantly for dense scenes, especially with a dynamic light. Disabled by default and can be enabled using r.Shadow.Virtual.UseReceiverMask. There's a potential for artifacts when used with r.Shadow.Virtual.MaxDOFResolutionBias.
    
-   \[SingleLayerWater\] SLW can now always output velocity, independent of whether the Velocity Ouput Pass is set to "Write during base pass" or not. There's a new r.Water.SingleLayer.ForceVelocity cvar, which defaults to 1 and can be used to revert to the old behavior.
    
-   \[First Person\] Removed "Cast First Person Self Shadow" checkbox on light component. Self-Shadow is now driven by the light being shadow casting (dynamic shadows) and r.FirstPerson.SelfShadow and r.FirstPerson.SelfShadow.LightTypes. The first cvar enables the effect at all, the second cvar can be used to have it affect only directional lights, only local lights or all lights.
    
-   Add source curve/point index mapping so that attribute computed on source data can be retrieved with this index mapping. This is useful for dataflow attributes computed for strands data and stored into attribute collection. Dataflow attributes are computed on source data, not on build data.
    
-   Fix incorrect groom binding transfer when source skeletal mesh has different section count based on project settings. The matching section now is mapped onto a material index in order to recover the set of sections mapped onto this material index.
    
-   Expose SkyAtmosphereAmbientContributionColorScale to Blueprints
    
-   \[TSR\] Reduce the loop unroll time for TSR shader compiler by adding manual unroll to frequently used paths.
    
-   Renamed Build / Build Virtual Textures into Build / Build Streaming Virtual Textures to be more consistent with the names in use in the Runtime Virtual Texture ComponentAdded explicit reason for why the SVT warning is displayed in order to better guide the user : either the standard SVT is not up to date or the mobile SVT or both
    
-   \[First Person\] Exposed FP FOV and scale on ViewProperty material graph node.
    
-   \[First Person\] Added support for sampling the bIsFirstPerson GBuffer bit from SceneTextures in material graphs.
    
-   Add support binding triangle selection/filtering based on vertex attribute. Also add vertex attribute transfer from LOD to LOD to use the same attribute across LODs.
    
-   Quantized Automatic View Texture Mip Bias to significantly reduce the number of independent sampler states used when Dynamic Resolution is enabled, preventing crashes in long-running applications that hit the sampler limit.
    
    -   Number of quantization steps is controlled with r.ViewTextureMipBias.Quantization (defaults to 1024).
        
-   Various changes to improve RVT responsiveness in the editor:
    
    -   Added priority system to VT producers (8 possible values : Lowest -> Highest)
        
    -   Added "prioritize" flag to VT tile requests
        
    -   Allowed RVT invalidations to be be prioritized so that the affected RVT pages get processed before others. This maintains the throttling behavior but allows the marked areas to be updated first
        
    -   RVTs can specify what their VT producer's priority should be, either automatically, based on the virtual texture's material type (BaseColor and its variant = High, Mask4 = BelowNormal, WorldHeigh = Low, Displacement = Lower) or using a custom priority
        
    -   RVT components can also override their RVT's priority by using a custom priority
        
    -   Added CVar to enable/disable these 2 priority systems : r.VT.SortTileRequestsByPriority (enabled by default)
        
    -   Added CVar to drop a visual log whenever a RVT component invalidation occurs (r.VT.RVT.VisLogManualInvalidations)
        
-   Change hair strands radius to be scale by the instance's transform to be consistent with the scale of the instance. This change of behavior can be disabled with r.HairStrands.Strands.ScaleHairRadiusByTransform 0
    
-   Added support for reserved resources for the GPU-Scene instance data buffer to remove the need to perform copies on grow/shrink, reducing hitches and peak GPU-memory use. Disabled by default, may be enabled using e.g., r.GPUScene.InstanceDataTileSizeLog2 12 on supporting platforms.
    
-   \[First Person\] Implemented self-shadows for first person primitives.
    
-   \[First Person\] Fixed setting primitive to FirstPersonWorldSpaceRepresentation not properly configuring the primitive to behave as if it was set to bOwnerNoSee.
    
    -   Also disabled most shadow casting options on FirstPerson primitives as these don't properly work with such primitives. Shadowing is instead solved with First Person Self Shadows and an invisible FirstPersonWorldSpaceRepresentation primitive for casting shadow onto the scene.
        
-   Add per-group auto LOD bias for finer control.
    
-   Add Width tracking as imported hair attribute.
    
-   Moved more shadow rendering logic inside the FShadowScene\[Renderer\]
    
-   \[VSM\] Fixed the pre-cull instance counts for nanitestats virtualshadowmaps and optimized the loop iteration by using bit logic to skip empty bits.
    
-   Added support for ACES 2.0 as an alternative to 1.3 in HDR mode, activated with "r.HDR.Aces.Version=2".
    
-   Stat unit now displays the current render resolution
    
-   \[TSR\] Improve the temporal stability of thin geometry like foliage and hair rendering (controlled by r.TSR.ThinGeometryDetection, off by default). It should largely reduce patch flickering.
    
    -   Use r.TSR.Visualize 15 to visualize edge line (red), partial coverage (green), and others (yellow). Only red and green regions have stability improved.
        
-   \[Screenspace Subsurface Scattering\] Use subsurface profile cache for Separable as well. It improves the performance when SSS covers a lot of screen.
    
-   \[VSM\] Added per-chunk aggregate of shadow casting flag and early out in the chunk culling to improve culling efficiency.
    
-   Changed the GPUSceneInstanceCount csv counter to be the actual used instance count rather than the current allocation maximum.
    
-   \[Screenspace Subsurface Scattering\] Add mixed SSS implementation exposure for quality and performance balance.
    
    -   Add a new field 'Implementation' in Subsurface profile under \`Burley Normalized\`, with 'AFIS' and \`Separable\`. Default to \`AFIS\`. When set to \`Separable\`, the corresponding material will directly use Separable. This allows mixed setting for best quality(skin) and performance(snow, ice).
        
    -   Add half resolution support to AFIS.
        
    -   Add a CVar \`r.SSS.HalfRes.ForceSeparalbe 1\` so that the old behavior still holds. Users will need to disable this CVar to have the expected mixed support for half resolution.
        
-   Add debug visualization of position offset for groom.
    
-   Added minimum draw distance to Instanced Static Mesh (ISM). This enables customizing the distance from the camera at which the ISM starts rendering.
    

**Bug Fix:**

-   Fix hair strands texture dilation pass not applied on the inside of the mesh part (on all attributes apart coverage).
    
-   Fix CPU RBF deformation for freezing groom assets. Recompute binding data from scratch, and store more information in the intermediate CPU binding data. This extra information is transient (non-serialized). These info are used later during the RBF process to ensure skel. mesh triangle data are consistent.
    
-   Fix CPU RBF deformation for freezing groom assets. The transformed then exported control points were not ordered similarly to the original hair description, because of added control points at the end of each curve.
    
-   SceneCapture: Fixed missing show flag property reset, instance property reset toggles and transactions.
    
-   Fixed display gamma issues with backbuffer format renderer setting: FloatRGBA now also updates DisplayGamma and view family SceneCaptureSource to output linear colors matching the regular R10G10B10A2 appearance.
    
-   Fix groom binding cooking on target platform.
    
-   Fix overflow allocation when creating a binding asset for a very large groom.
    
-   Fix groom reimporting when the group's layout differs from the original asset. This preserves the groom settings of each group when the group layout differs.
    
-   Fixed FTextureRenderTarget2DArrayResource::GetSizeY() and FTextureRenderTarget2DArrayResource::GetSizeXY(), which had been broken forever
    
-   Fix an issue where non-component static mesh scene proxies would not create hit proxies due to not having an owner actor.
    
-   Fix hit proxy rendering and outline rendering with Groom when using PPLL rendering
    
-   Updated the FVolumetricRenderTargetViewStateData constructor to initialize all class members to sensible values. This is to prevent crashes in cases where these values are read with invalid data, before FVolumetricRenderTargetViewStateData::Initialize() properly sets them.
    
-   Fixed a race condition with virtual texture memory management where the RHI thread could potentially decommit the memory after we commit but before we have a chance to remove it from the queue.
    
-   Fix hair cards's normal recomputation when not bound to a skel. mesh.
    
-   Fixed an issue where a Nanite-enabled Geometry Collection rendering section with an invalid material can cause all subsequent sections to show the default material
    
-   Enable hair voxelization only on platform supporting atomic on volume texture.
    
-   Fix incorrect hair macro AABB with split screen. The clusterAABB are expressed in view0's translated world position.
    
-   Fix crash with RT view mode when view state is nullptr on the view.
    
-   Fix comments for r.AmbientOcclusion.Compute which also works on PC
    
-   Fixed issue where Geometry Collections were not always updating the rendering velocity buffersThis resolves artefacts that would appear when using motion blur for example
    
-   Fix 0-byte request done by groom system on cooked build, causing crashes on loose-file/non-packaged builds.
    
-   Fix groom cache interpolation when triangle strip geometry is enabled.
    
-   Fix cook of groom binding asset on certain target platform, due to skel. mesh updating their DDC when building their data.
    
-   Fixed cinematic camera focus incorrectly affecting exposure by overriding the f-stop no matter the focus method since aperture also impacts physical camera exposure.
    
-   Add lock on skel. mesh DDC key building to avoid ensure the function is more thread-safe when different groom binding assets are built in parallel.
    
-   Fixed crash in HairStrandsInterpolation on GPUs where GRHIMinimumWaveSize is detected as 64
    
-   Fix potential crash when dependencies of groom bindings are getting GCed
    
-   Fix groom cache (guide & strands) not working correctly when hair triangle strip geometry is enabled.
    
-   Fix a bug in static mesh building where LODs built as a reduction of LOD0 from the Nanite fallback will apply build scale to the mesh twice.
    
-   Fixed working color space support in blackbody material node.
    
-   Fixed sRGB transfer functions (gamma) clipping values below 0.0000610352.
    
-   Fix automatic UsedWithHairStrands usage setup for material which was missing when assigned to a groom asset/component.
    
-   \[SparseVolumeTextures\] Fixed SparseVolumeTexture streaming manager not freeing allocated FIoBuffers at the earliest opportunity, leading to runaway memory allocations.
    
-   Fix hair proxy resource not being recreated correctly when changing property on groom binding.
    
-   Fix crash when using groom binding with Nanite Skeletal mesh.
    
-   Fixed "Affects Indirect While Hidden" or "Hidden Shadow" not working with in-scene capture renders with primitives tagged as "Hidden In Scene Capture".
    
-   Fix hair jittering when using Niagara simulation cache and pausing the sequencer.
    
-   Fix a bug in Light Function of Volumetric Fog, it doesn't work properly with world position as input.
    
-   Added sane defaults for three FVolumetricRenderTargetViewStateData class members when calling FVolumetricRenderTargetViewStateData::Reset. This is to prevent some rare crashes where these values contain uninitialized data that can lead to crashes.
    
-   Fixed previously lying scene capture post-process default settings, which were overridden in code but invisible to the user; default values now reflect the code.
    
-   Fixed 2D unwrapped tone-mapping LUT going out of bounds for extremely bright colors.
    
-   Fix copy pasting groom material.
    
-   \[Contact Shadows\] Fixed contact shadow screen traces marching across view boundaries, causing issues in splitscreen.
    
-   DX12: Fix a case where a temporary staging texture free wasn't being traced, which resulted in Memory Insights reporting ever-growing memory usage.
    
-   Setup dummy fog uniform parameters in real time sky capture if height fog is hidden for real time sky capture.
    
-   Fix InitResources() reentrance when calling InitResources() while the BindingAssets are async. building at the same time.
    
-   Fix memory leak due to unrelease ref. count on skel. mesh LOD data.
    
-   Fix incorrect assert in groom builder.
    
-   \[TSR\] Fix for banding that occurs in TSR when saving 16 bit float data into 11 or 10 bit float data due to quantization. Added dither based on mantissa precision to make the value fluctuate between its closest neighbors over time.
    
-   Fix material with UseHairStrands flag to issue a non-necessary draw call when used on hair strands geometry.
    
-   Fixed crash in FMeshBatchAndRelevance constructor.
    
-   Delay groom binding platform data release in order to accommodate existing resources still in flight while async building. These resources point to bulk data, which needs to not be released until the resources are actually released.
    
-   Fixed an issue introduced in Unreal Engine 5.5 where spline meshes could get gaps when placed end-to-end after going into the Static Mesh editor for the mesh used and generating reduced LODs.
    
-   Fix incorrect groom binding validation when initializing groom component resources when a groom asset has strands data but none of the LOD are using strands.
    
-   Fix conversion from/to groom edit causing extra attributes to be written while they shouldn't.
    
-   Fix hair barycentric value returning NaN in certain configuration when transferring positions.
    

**Deprecated:**

-   Deprecated FRayTracingSceneInitializer2. FRayTracingSceneInitializer should be used instead.
    

#### Architecture

**New:**

-   Added the rendered object's name as metadata to the RenderThumbnail CPU trace, in order to quickly diagnose the costliest thumbnail renders
    
-   Changes to add initial support for an overview view for material expressions inside the material editor. Initial support is for Texture Sample nodes, but more additions can be made further down the line
    
-   Reenable shader print on Mac SM6.
    
-   Add border to ShaderPrint widget for better visibility.
    

**Bug Fix:**

-   Only output GPU assert message when a GPU crash happens.
    
-   Fix missing shader's diagnostic data when compiling with shader worker.
    
-   Fixed missing InstancedStaticMesh allocations that were ending up in LoadMapMisc
    
-   Fixed programmatic RenderDoc captures randomly crashing
    

#### Lighting

**New:**

-   DaySequenceActors now replicate playback by default.
    
-   Add filter history pixel based on shading info during the MegaLights temporal pass. The MegaLights temporal pass now uses the stochastic lighting history normal texture.
    
-   Allow the DaySequence details view time slider to scrub when StaticTime is active.
    
-   Added the function GetApparentTimeOfDay() to DaySequenceActor. This is distinct from GetTimeOfDay() in that it accounts for fixed time and interpolation curve remapping.
    
-   Ray Tracing: Improve translucent shadow tracing Translucent shadows in ray tracing should now render faster by only tracing a single ray and using the any-hit mechanism to accumulate opacity changes.
    
-   Added a Time blending mode to DaySequenceModifierComponent.
    
-   Embree version was upgraded to 4.3.3
    
-   Added support for temporal filtering in Translucency Lighting Volume (r.TranslucencyLightingVolume.Temporal).
    
-   Added StaticTimeMode property to the DaySequenceActor.
    
    -   StaticTimeMode supports two modes: RootTimeWarp and LocalTimeWarp.
        
    -   RootTimeWarp behaves as it did prior to the addition of this property, where StaticTime will directly influence Root Sequence evaluation time.
        
    -   In contrast, LocalTimeWarp is a contract implemented by DaySequenceModifierComponents where the time warp only applies to the modifier's sequences so that those sequences are always evaluated at the frame that matches the desired fixed time.
        
    -   The benefit of LocalTimeWarp is that the DaySequenceActor will use hierarchical blending to lerp towards the look of the target time rather than lerping actual time which can cause jarring visual shifts (ex. transitioning through sunrise / sunset)
        
    -   By using TimeWarp to achieve this behavior, users can reuse existing sequences without needing to re-author a sequence specifically for the desired time of day.
        
-   Skip queuing cache invalidations for dynamic geometry when receiver mask is enabled
    
-   Add (optional) support for local light shadow on forward lit surfaces.
    
-   Update some VSM options for best current paths:
    
    -   Remove ability to turn off StaticSeparate as it is fairly integral to how the fast path caching logic works now
        
    -   Ensure r.shadow.virtual.cache 0 also enables the fast "uncached" paths on the nanite view
        
    -   Remove mode "1" for VSM nanite and non-nanite HZB. Only two pass occlusion culling on the current frame is supported. Not yet enabling receiver mask by default due to some memory overhead, but that is the intended path moving forward.
        
-   Support receiver mask for local lights (disabled by default, see r.shadow.virtual.usereceivermasklocal)
    
    -   Requires using non-greedy mip selection when enabled for SMRT and single sample lookups
        
    -   Cvar to enable/disable VSM overflow screen messages (enabled by default)
        
    -   Add force invalidate local cvar
        
    -   Remove greedy selection clipmap cvar; has been off for a while and increasingly clashes with the dynamic geo optimization strategies (receiver mask, etc)
        
-   Add screen trace support for hair transmittance computation. This adds finer/higher frequency shadow details.
    
-   DaySequenceModifierComponents do not inject subsections into the root sequence on server. The root sequence is meant to exist on the server only for the purpose of keeping clients synchronized via replicated playback.
    
-   Add source texture region support for rect lights allowing to target a particular portion of its source texture.
    
-   Optimization to skip/simplify VSM light grid pruning when there are no VSM local lights
    
-   Allow procedural DaySequences to use condition tags.
    
-   Ray Tracing: Add debug visualization for flags and masks Add new picker domains to visualize the unique flag and mask settings throughout the scene. This can be used to validate which modes are being used. In particular this is useful to track down materials that require any-hit shading.
    
-   Embree: renamed the third-party source module from "Embree3" to "Embree"
    
-   Add HairStrands support to MegaLights. This is an initial implementation which can result in a noisy look.
    
-   Deprecated DaySequenceCollection in favor of an array of DaySequenceCollections on both the DaySequenceActor and DaySequenceModifierComponent.
    
    -   The addition of an array of collections will allow for greater flexibility in modularizing sequences particularly with the recent introduction of local time warp for Modifier Components, where it is useful to reuse a particular combination of DaySequenceCollections to recreate the visual target of a modifier at a specific time of day.
        
-   VSM: Support receiver mask with caching enabled.
    
    -   When enabled via r.Shadow.Virtual.UseReceiverMaskDirectional, receiver mask will be used for all dynamic pages (which will thus become uncached as it is unsafe to cache partial pages), but static pages can remain fully cached.
        
    -   This is generally a benefit to most applications as relatively static objects should migrate to the static pages, while dynamic pages are frequently invalidated every frame.
        
-   VSM Dynamic Z range tight culling when using receiver mask
    
-   Add OIT triangle sorting support for skinned mesh.
    
-   Update how hair strands coverage computation is done. Compute actual coverage per pixel for each segment. Clip segment within its voxel to ensure that the segment's coverage is only accounted once.
    
-   Properly detect BP subclasses of native classes which derive from UDaySequenceConditionTag
    
-   Add initialization phase to UDaySequenceConditionTag defaults.
    
    -   Valid options are Immediate and GameState.
        
    -   This option determines when the condition tag is initialized.
        
    -   Choosing GameState means that initialization is deferred until the game state is ready.
        
-   Add material control for local light shadow casting and local/directional light shadow casting quality for translucent material.
    
-   Normalize a few default High scalability VSM settings across platforms.
    

**Bug Fix:**

-   Fix Groom holdout with fog. The groom's holdout pass now runs in two steps:
    
    -   Attenuate the scene pixel alpha value by the hair coverage
        
    -   Add hair's fog attenuation to the alpha pixel value
        
-   Fix missing hair shadow on instance having both 'hidden in game' and 'hidden shadow' enabled with light having RT shadow.
    
-   Fixed Distance Field Shadows being corrupted in split-screen or stereo views other than the first.
    
-   Fix separate translucent with per-pixel OIT. The transmittance was accounted for twice due to the OIT combine pass being rendered twice.
    
-   Fixed DaySequence TimeOfDayPreview property not updating when using the transport controls in the details view to playback the preview sequence.
    
-   Hair Strands: Hairs were getting culled when hidden but still affecting indirect lighting. Hair did not obey CastShadow flags in ray/path tracing
    
-   Fix missing exposure correction during OIT combine, when per-pixel OIT is enabled.
    
-   Fix hair traversal causing incorrect occlusion
    
-   Fix GTAO console command minor issues
    
-   Fix ClearCoat shading model bottom layer, having incorrect specular response when clear coat value is set to 0 (but using ClearCoat shading model).
    
-   Natively defined DaySequenceConditionTags are now detected when choosing conditions in a DaySequenceCollection.
    
-   Fix shadow mask on gbuffer input being run several times if the VSM shadow projection pass if not culled by RDG
    
-   Fixed an issue when using a very large TimePerCycle on a DaySequenceActor which could cause the duration of the RootSequence to overflow the maximum valid range.
    
-   Fixed procedural Day Sequences not functioning correctly in packaged builds.
    
-   Fix rect. light atlas leaking.
    
-   Fix anisotropy rendering with split screen.
    
-   Fixed an issue where "Refresh Day Sequence Actor" did not properly rebuild/refresh the root sequence.
    
-   Fixed an issue in DaySequence where restoring the preview time based on the root sequence global time was incorrect when focused on a sequence with a different playback range than the root sequence.
    
-   Removed additional multiply from URectLightComponent::ComputeLightBrightness Rect lights configured to use EV unit were using a slightly incorrect formula.
    
    -   To preserve backwards compatibility, the old (incorrect) formula will be used for RectLight actors configured with EV units in scenes created prior to UE 5.6.
        
    -   If the new behavior is desired, the actor should simply be recreated.
        
-   Remove MegaLight screen traced from hair material as it could be very noisy, and create light leak when the light direction and the view direction are opposed.
    
-   Shadows: Directional light penumbra size is incorrect The sampling of the directional light was slightly wider than expected. The result now matches much more closely with the reference computed with the path tracer.
    
-   Fix rect. texture atlas refreshing when several rect lights reference the same animated texture.
    
-   Fixed an editor perf regression when closing tabs by constraining the DaySequence actor preview to editor world updates.
    
-   Fixed incorrect scissor rect handling for Distance Field Shadows in stereo rendering. This could lead to incorrect or missing shadows for lights with small attenuation radii.
    
-   Fix IES manager force update not working correctly.
    
-   Ray Tracing: Fix TextRenderComponent not obeying CastShadow flag
    
-   Fix hair strands voxelization having incorrect voxel size due to missing quantization.
    
-   Ray Tracing: Fix InstanceLocalToWorld and InstanceWorldToLocal transforms not being propagated
    
-   Process cluster lights after directional so that directional isn't applied to local lights. Additionally, ensure that cluster deferred shading doesn't run in the absence of directional lights.
    
-   Fix AlphaComposite with per-pixel OIT.
    
-   Fixed an issue in DaySequence that caused the sky to flicker on closing the root sequence.
    
-   Lights: Allow EV units to become negative The EV unit is logarithmic, so values less than or equal to zero are valid emission values that should not be ignored.
    
-   Fix incorrect shadow masks on hair strands when using VSM and light functions at the same time.
    

#### Lumen

**New:**

-   Added relative temporal variance threshold for the spatial filter in Lumen Reflection Denoiser in order to not blur very bright spots, which can have high absolute error due to subpixel jitter or numerical precision issues
    
-   Changed Lumen Diffuse Color Boost PPV setting to increase only brightness in order to preserve GI color bleedingImplemented Lumen Diffuse Color Boost PPV setting for the hit-lighting path
    
-   Lumen Scene Update CPU performance optimizations
    
-   ShortRangeAO is now running at half resolution with a denoiser. This makes it two times faster on console
    
-   Added r.Lumen.ScreenProbeGather.HardwareRayTracing.HairBias, which helps with self-intersection artifacts on hair as hair RT representation usually heavily mismatches raster
    
-   Lumen Far Field Optimizations making Far Field 30% faster on console and ~50% when using new occlusion only far field mode (Added r.LumenScene.FarField.OcclusionOnly 1)
    
-   Added Single Layer Water reflection downsampling and denoising. Downsampling allows to scale down water reflections and denoising allows to make them more stable.
    
-   Reworked Lumen Reflection radiance cache. It can now sample sky directly for higher quality (r.Lumen.ScreenProbeGather.RadianceCache.SkyVisibility) and has better controls where it needs to be applied
    
-   Sharper and more stable temporal accumulation of GI and rough specular
    
-   Implement basic SER support for HitLighting and ray traced translucency This can improves performance on hardware that supports SER on scenes that use hit lighting and have many materials. This feature is controlled by the cvar: r.Lumen.HardwareRayTracing.ShaderExecutionReordering
    
-   Shift cached lighting range from -\[16;16\] EV to \[-8;24\] EV, which fixes issues with clipping (missing) indirect lighting when using physically based lighting values. Cached lighting range can be now controlled using r.Lumen.CachedLightingPreExposure
    
-   Lumen Surface Cache update is now driven by distance to frustum. This allowed to half number of updated pages making it two times faster without a large impact on the GI update speed on High scalability
    
-   Improve Lumen Skylight leaking in reflections by simulating integrated Skylight leaking at hit point instead of adding Skyleaking term to each reflection ray
    
-   Exposed Lumen reflection ray bias settings under r.Lumen.Reflections.HardwareRayTracing.Bias and r.Lumen.Reflections.HardwareRayTracing.NormalBias. Default settings are now a bit larger, so that reflections without screen space traces now work better out of the box
    
-   Display a screen warning when Lumen visualization is enabled, but Lumen itself is disabled
    
-   Added r.RayTracedTranslucency.MaxRayIntensity CVar for setting max lighting intensity for raytraced translucency.
    
    -   The value was previously driven by r.Lumen.Reflections.MaxRayIntensity, which had too low value for raytraced translucency.
        
    -   The reason being raytraced translucency contains both direct lighting and reflection/env lighting. The direct lighting can be very high, causing discrepancy between translucent and opaque geometry.
        
-   Disable DistanceFieldRepresentation bit when HWRT is used with Lumen. This saves ~0.07ms (1080p, console) on skipping CopyStencilToLightingChannelTexture and skipping reading this bit during ScreenProbeGather and ShortRangeAO tracing.
    
-   Added r.Lumen.ScreenProbeGather.IntegrateDownsampleFactor.
    
    -   It allows downsample Screen Probe Gather integration which makes this pass ~3 times faster (~0.3-0.5ms speedup on console 1080p, depending on the content).
        
    -   Downsampled integration is pretty stable thanks to jittered and irregular sampling patterns, upsampling based on depth and normal, and full resolution temporal accumulation.
        
    -   The downside is that it does remove some of the fine grained normal detail making it blurry, so for now it's not enabled by default
        
-   Improve Screen Probe Gather denoising on foliage
    
-   Restore screen space traces on hair, so that hair retains occlusion in the distance where RT geometry is being culled from the BVH
    
-   Wew ray weighting for Lumen Reflections. It improves reflection stability on some features and speeds up reflection pass
    
-   Lumen performance visualization view now uses different color brightness for different roughness ranges
    
-   Lumen Screen Probe Gather fast out optimizations for quickly skipping sky pixelsFixed RoughReflectionsDiffuseLerp logic, so that now it doesn't alway run rough reflection path for clear coat. When DiffuseLerp=1 we can skip all rough reflection computations no matter if it's a clear coat or not
    
-   Tighten GI screen space ray hit test, so that we don't pickup lighting from unrelated objects during movement. Now it matches Lumen Reflection screen space ray hit test threshold
    
-   New Lumen Screen Probe Gather adaptive probe placement algorithm. Major GI optimization due to ability to place less adaptive probes while retaining similar visuals
    
-   Add cvars for improved control over when any-hit shaders are executed in the hit-lighting case Change the default for shadows in reflections/refractions back to executing masked shadows only (with a cvar to include translucency as an option).
    
    -   See the description of r.Lumen.HardwareRayTracing.HitLighting.ShadowTranslucencyMode and r.Lumen.HardwareRayTracing.HitLighting.ForceOpaque for additional details.
        
-   Lumen Surface Cache Radiosity pass optimizations
    
-   Reduce Lumen Reflections output format to 32 bits. This saves 0.02ms in Lumen Reflections and 0.03ms in Water Rendering on console at 900p
    
-   Lighting Only and Detail Lighting View Mode now overrides materials for all bounces in Lumen and Path Tracer
    
-   Unify denoiser tonemapping settings between Epic and High.
    
    -   Reflections on all scalability levels are now denoised in a tonemapped space with a default max range of 10.
        
    -   On Epic this replaces x^2 color space and restores more energy in the reflections, but also brings in a bit more noise.
        
    -   On High this replaces tonemapped space with a max range of 1. This restores a lot of missing energy, but also brings in visibility more noise in complex scenarios. Overall it brings back missing energy and makes scalability levels match closer.
        
-   Changed Lumen default settings.
    
    -   SWRT detail traces (mesh SDF tracing) is now a deprecated path, which won't be worked on much.
        
    -   For scaling quality beyond SWRT global traces it is recommended to use HWRT path instead Firefly filtering is now more aggressive by default (r.Lumen.ScreenProbeGather.MaxRayIntensity 10 instead of 40).
        
    -   This removes some interesting GI features, but also reduces noise, especially from things like small bright emissives.
        

**Bug Fix:**

-   Fixed indirect light intensity multiplier when hit-lighting is used
    
-   Fixed mesh card generation when first card fails and we stop the entire process instead of trying to generate another one with a different near plane (in a different spot)
    
-   Fixed async compute overlap when async Lumen reflections are enabled
    
-   Fixed Lumen Reflections artifacts in split screen
    
-   Fix Lumen Rough Reflection compositing with SSR
    
-   Don't use inline ray tracing when if-hit lighting is enabled, as now we have both paths working on PC.
    
-   Fixed ScreenProbeGather crash when DiffuseIndirectNormalHistory is missing. This could happen for example by toggling between Lit and Ray Tracing Visualization.
    
-   Fixed hand-off between screen space and RT traces. Previously even if a screen space ray reached radiance cache we still had to retrace part of the RT pass due to approximate screen space trace nature and due to the pullback bias. Now this hand-off works correctly and we never trace RT rays if a screen space reached the radiance cache probe.
    
-   Fix incorrect dispatch resolution when downsample factor is >1 in Lumen's ShortAO HWRT.
    
-   Fixed Lumen Radiance Cache cache update time splicing causing major performance spikes on fast camera movement or disocclusion
    
-   Fixed ray biasing (avoid-self intersection mode) when using hit-lighting
    
-   Fixed Lumen Screen Probe Gather logic preventing Lumen from exceeding max texture limits, it wasn't accounting for adaptive probes and probe borders.
    
-   Remove tonemapping from Lumen Visualization views which display surface properties like normals or albedo
    
-   Disable visualization tonemapping when main view tonemapping is disabled in order to match both views as closely as possible
    
-   Fix Lumen screen probe gather + SSR reflection with Lumen.
    
-   Fixed scene captures with Lumen disabled triggering full Lumen Scene reupload
    
-   Fix crash in LumenSceneAtlas when toggling Lumen on/off. The lookup table used to find the correct sub-page allocator was incorrectly reset, causing the PageBin to be reallocated, and the whole bookkeeping of sub-page allocation was busted. And the condition to deallocate a physical page for a particular sub-page allocator was incorrect.
    
-   Fixed async compute reflections crash when reflections are being disabled through r.Lumen.Reflections.Allow 0
    
-   Fixed subsurface GI energy being too low on Epic scalability (r.Lumen.ScreenProbeGather.IrradianceFormat 0)
    
-   Don't reset Lumen temporal history on SceneTexture resize
    
-   Fixed tile artifacts on indirect rough specular on cloth pixels in the same tiles as hair pixels
    

#### Materials and Shaders

**New:**

-   This change adds functionality to write a minimal set of debug information when preprocessing fails - a simple .usf file containing commented defines, base64 env and directcompile cmdline (the former may help to determine why preprocessing is failing, while the latter two can be used to inspect the FShaderCompilerEnvironment via running ShaderCompileWorker in direct mode).
    
-   Moved r.MaterialEditor.AllowIgnoringCompilationErrors and r.Material.ContextMenu.\* CVars to MaterialEditorSettings.
    
-   Add option for translucent materials "Velocity From Depth Only". This can be set when a translucent material is set to "Output Depth and Velocity". It indicates that we want to calculate the velocity based on the written depth only. It is only intended for special cases such as writing depth when raycasting a translucent volume.
    
-   Add support for material custom data on a Runtime Virtual Texture. The custom data is a float4 that is routed to the material shader. A new material expression RuntimeVirtualTextureCustomData is added to access the value.
    
-   This change fixes the partial implementation of C99-style pragma handling in our shader preprocessor.
    
-   Initial work on data-driven external code declarations for new material translator.
    
-   Enable Virtual Texture feedback and sampling for post process materials.
    
-   This change adds the ability to configure shader symbol-related cvars on a per-shaderformat basis in ini files, so i.e. PC SM6 symbols can be enabled while keeping PC SM5 symbols disabled. This example was chosen intentionally as it was our primarily internal use case; SM6 shaders compiled with DXC are deterministic, while SM5 shaders compiled with FXC or not, so this allows us to enable the former without causing DDC non-determinism issues with the latter.
    
-   ListShaders console command added, similar to ListTextures, for runtime analysis of shader memory / loads.
    
-   Change default value of r.VT.PageFreeThreshold from 60 to 15. This has been seen to be a better default setting on a range of internal projects. It reduces pool residency on fast camera movement which can slow down page production causing pop in.
    
-   Change default Virtual Texture behavior in cooked builds to not wait on render thread for root pages to be mapped. Instead we read from an average fallback color generated during texture compilation. This removes render thread hitches.
    
-   Materials now can opt themselves out of Static Mesh vertex factories. This is an advanced option, defaults to true, and can be used to reduce vertex factory compilations and memory. Useful in UI, Niagara, Skeletal Mesh, and other materials when a material will not ever used on a Static Mesh.
    
-   Enabling of virtual textures now defaults to on (but still defaults off for mobile).
    
-   Added a new cook artifact (shadertypestats.csv) that can be used for more granular tracking of shader/shader type growth over time.
    
    -   It contains, for each shader type, both the number and total memory size of all unique shaders, prior to chunking.
        
    -   Note that isn't directly representative of final shader memory/disk size since it doesn't account for shader library deduplication, or shader library chunk re-duplication (the case where multiple shadermaps which would have shared bytecode end up in different chunks).
        
    -   This artifact is saved to both the root of the ShaderDebugInfo folder for each cooked shader format, and also renamed to include the shader format name and saved in the Metadata folder for a cooked build.
        
-   Improve performance for large scale conversion of Virtual Textures to and from regular textures.
    
-   Add new Custom Primitive Data setter functions in Primitive Component for float vectors and float arrays. Includes small optimization by converting internal Custom Primitive Data function arguments from TArray to TArrayView.
    
-   Add AES encryption support to UbaController.
    
-   Modified behaviour of writing out shader symbols such that it occurs both when actually compiling shaders locally, as well as when loading compile results from DDC. This has the effect of shader symbols being written out to disk (when enabled) when using ODSC/running in the editor, as well as when getting DDC hits for shadermaps or individual shaders during a cook.
    
-   Exposed WorldPositionOffset so that it can be picked from the ConnectMaterialProperty BP node.
    
-   Enable Virtual Texture feedback for Slate UI renderer. This allows Virtual Textures to be used in UI material domain.
    
-   FShader::NumInstructions is now Editor Only data
    
-   Support Virtual Texture sampling and feedback in light functions.
    
-   Optimize UMaterial::PostLoad and UMaterialInstance::PostLoad by assuming shadermap completion in test/shipping builds if the platform requires cooked data. This significantly reduces cost of these functions for builds where ODSC is never used and as such incomplete materials are rare (i.e. due to some kind of runtime/cooktime ShouldCompilePermutation mismatch; such errors will still be reported in debug/development builds).
    
-   Make Virtual Texture Residency Mip Bias a per group value instead of a single global value. Pool configs can specify one of 4 independent Mip Bias Groups. Each group accumulates the highest requested Bias from its associated physical pools.
    
-   Add Virtual Texture specific LOD bias to texture group lod settings. The new setting is named LODBias\_VT and is used instead of LODBias when compiling a Virtual Texture.
    
-   Add RequestPreload() function to the Runtime Virtual Texture component. This attempts to fill the pages at the given mip level in the given world space bounds.
    
-   Add a new "Record Texture Streaming Info" material node. This records the material UV scales for use by the texture streaming system. It is useful for textures that are sampled only in custom HLSL nodes.
    
-   Add support for debug visualization of pending virtual texture mips to nanite meshes.
    
-   Added MaterialNormal and MaterialAmbientOcclusion show flags. They can be useful to investigate issues with materials and find materials which have lighting baked into albedo or too strong AO removing indirect lighting.
    
-   Use of virtual texture for opacity mask is no longer a material compilation error. The renderer setting for this now only applies to importer behavior.
    
-   Add CPU distance based streaming for virtual textures. Virtual textures can opt into having mip levels streamed using the existing regular texture streaming logic. A budget is configured using r.Streaming.PoolSizeForVirtualTextures.
    
-   Add a VirtualTextureStreamingPriority setting to TextureLODGroup and Texture assets. We use it to prioritize when collecting virtual texture pages to populate.
    

**Bug Fix:**

-   Fix a race condition handling shadermaps that was manipulating a bitfield from different threads
    
-   This change fixes the determinism of compiling with shader symbols enabled for many platforms. We now keep a deterministic single copy of platform debug data; some platforms embed full source into the debug data so this can differ when we have multiple jobs that deduplicate to the same bytecode after compilation (but it doesn't matter which we keep, they necessarily only differ by line numbers/dead code).
    
-   Improved error reporting around duplicate static parameters in materials / material functions / etc. (when r.Material.PedanticErrorChecksEnabled is used):
    
    -   Added asset path of the duplicate value and dumped the values that differHandled the static component mask case as well as the static switch case
        
-   Fix for occasional crash when undoing and redoing material function inputs deletion.
    
-   Prevents UMaterialExpressionPinBase from being deleted by the user.
    
    -   Before the user was able to accidentally delete a pin base in a material expression composite, permanently breaking the expression.
        
    -   Also, turned off logging "editor only data" renamed warning when a material is duplicated, as the renaming will always occur and is normal behavior.
        
-   Fixed bug that prevented material function editing undo/redo/copy/paste operations to work reliably. This caused data invalidations, crashes and various unexpected behaviors, like sudden missing connections upon function reopening.
    
-   Make DBuffer BaseColor texture sRGB. Fixes banding issues in some content.
    
-   Fixes bug triggered by copy pasting then deleting collapsed nodes, causing Input and Output pin base expressions to linger in the material.
    
-   Fixed bug preventing material expression parameters and comments from being created.
    
-   Unified the two disparate shader job retry mechanisms and in the process fixed a couple of bugs related to dumping shader debug info on retries:
    
    -   Fix r.DumpShaderDebugInfo=2/3 not working correctly if a global/default shader error is encountered during startup. The previous reissue path occurred asynchronously and so chances were good the fatal error would cause the process to exit before the reissued job completed; this unified code blocks until the reissued shaders are finished compiling.
        
    -   Fixed the issue of r.DumpShaderDebugInfo=3 not outputting all artifacts when re-running a job with only warnings (it wasn't actually re-running the jobs due to hitting the job cache); this required an explicit state bit in the job input to skip the cache query.
        
-   Added support for redirectors while loading parameter collections references in FEnvironmentDefines.
    
-   Fixed handling of stray % characters by FStringTemplate.
    
-   Fix for regression in MaterialEditor::DeleteNodes that caused the operation to show the "Apply Changes" dialog.
    
-   Fixed an issue that caused frequent crashes when performing delete, undo, and redo operations on Material Expressions, especially when these operations were applied to Function Inputs while a material using the Function was open in the editor.
    
-   Fixed a bug in HLSLMaterialTranslator where incorrect shader code generation caused material translation issues, specifically by selecting the pixel members locals code based on the last evaluated property rather than the property with the largest code chunk. The fix now correctly selects the largest evaluated code chunk, ensuring all necessary locals are properly output to the HLSL shader.
    
-   Fixed bug occurring when trying to duplicate a default Material with an incorrect EditorOnlyData name.
    
-   Add a nullptr check in UMaterialExpressionPinBase::PostEditChangeProperty, fixing a crash when deleting an orphaned pin from a Material with bad data.
    
-   Fixed crashes occurring when undoing operations on a material created by dragging and dropping a texture onto a mesh. The created material was missing the Transactional flag, causing undo operations to not fully restore the original state.
    
-   Add float suffix to float literals generated by the Material Translator to workaround FXC internal error.
    
-   Fixed a bug where MaterialFunctionInstance failed to gather all parameters from the material function.
    
-   Fix world position offset not showing on nanite geometry collections.
    
-   Add a workaround fix for rare RVT page corruption that has been seen in the wild. The workaround can be enabled with "r.VT.RVT.PageCorruptionFix".
    
-   Fix materials with parameter collections not waiting for parameter collections to finish loading. Thank you Crystal Dynamics!
    
-   Fixed crash in SafeRenameEditorOnlyData() when EditorOnlyCurrent is null.
    
-   Explicitly remove SSD shaders from Mobile Platforms as its never used
    

**Deprecated:**

-   Removed unused dead code in the material translator.
    
-   Removed unused cvar r.MaterialParameterLegacyChecks.
    

#### MegaLights

**New:**

-   Implement directional light VSM tracing support for MegaLights
    
-   Improve convergence on disocclusion and when there are strong occluded lights
    
-   Added support for guiding in Mega Lights Volume.
    
-   Add a setting to select MegaLights RT or VSM. Infer which projection passes (VSM one pass projection, megalights VSM projection) are needed based on the lights present in the frame.
    
-   Reduce noise on penumbras using a better confidence heuristic
    
-   Increase supported light limit to 65536
    
-   Exposed r.MegaLights.DownsampleFactor, which allows to change between 1x and 2x donwsampling factor for scaling quality up
    
-   Two-sided foliage and subsurface shading model support. Subsurface and two-sided foliage materials and now skip screen space traces and reverse normal for biasing if light is behind the surface and we want to estimate backside lighting.
    
-   Added support for cast volumetric shadows light setting
    

**Bug Fix:**

-   Fixed alpha masking support
    
-   Restored a check for whether or not the scene supports textured rectangular light tile types in Megalights::RenderMegaLights
    
-   Fix pack/unpack inconsistency in MegaLights Fix stochastic bilinear edge case in MegaLights
    
-   MegaLights: Fix light leaks from point/spots with non-zero source length
    

#### Nanite

**New:**

-   Moved Nanite::PrintStats to after VSM rendering so "nanitestats virtualshadowmaps" show the stats for the current frame (not the previous).
    
-   Added explicit chunk bounds to instance culling hierarchy and used those to make it possible to store and update only the bounds for the dynamic contents of a cell. This improves performance in CitySample by some 100us (which had regressed when we switched dynamic geometry to be "cullable").
    
-   Fixed distance culling bug for Nanite rendering into CSM, where it would not set up the culling view overrides correctly leading to issues with e.g., per instance cull distance (foliage).
    
-   Nanite shading pass now supports resolutions up to 16k instead of just 8k.
    
-   Added specialization for single-view case (visbuffer) for the chunk based instance cull shader allowing the compiler to remove the loop and significantly lower register pressure.
    
-   Added specialized instance cull for static geometry to reduce the cost as well as register pressure. Disabled by default due to potential failure modes (r.Nanite.StaticGeometryInstanceCull).
    
-   Add support for Non-Nanite fallback mesh for Nanite Geometry Collections.
    
-   Implemented nanite skinning distance disable using the new per view and instance tracking.
    
-   Prevent reading visbuffer pixels OOB (use a zero packed pixel value instead).
    
-   Added aggregate instance draw distance and culling to hierarchy cells and chunks. This can be a significant win in scenes with many small instances that use per-instance culling ranges.
    
-   Changed the instance hierarchy AppenUncullable to improve load balancing with varying numbers of views and chunks to append.
    
-   Changed hierarchical instance culling to work on chunks of 64 instances rather than on cells and support culling GPU-updated instances. Significantly improves instance culling in many cases, especially scenes with large amounts of GPU-generated PCG instances.
    
-   Fix curvature to roughness on Nanite due to missing derivatives.
    

**Bug Fix:**

-   Fix Nanite Geometry Collections not visually rotating for gizmo driven rotations.
    
-   Fixed potential GPU crash when r.Nanite.RasterIndirectionMultiplier was not set conservatively.
    
-   Fix regression of LOD generation (when Nanite is enabled) that would allow meshes with low poly counts to simplify too much in generated LODs and destroy their silhouettes.
    
-   Fix a bug where meshes using a high res source model for Nanite would simplify the LOD0 source mesh on non-Nanite platforms when it shouldn't.
    
-   Fixed an issue where VRS could shade using a pixel position that was outside the rasterized footprint.
    
-   Fix an issue where cooking Nanite shaders on a machine that doesn't have 64-bit atomic support would create DDC key issues. Also fixes issues where \`r.Nanite\` is configured differently between the cooker and the target.
    
-   Updated Nanite Software VRS to respect the per-material "Allow Variable Rate Shading" checkbox.
    
-   Fix static mesh DDC key generation to prevent an issue where non-Nanite platforms could cache static meshes with Nanite data built from LOD0 instead of the high resolution source, causing Nanite platforms to have incorrect geometry when loading from the cache.
    
-   Fixed Nanite::FResource::MeshBounds not being zeroed in the constructor.
    
-   Fixed leak of virtual page metadata in Nanite streamer.
    

#### Niagara

**New:**

-   Remove Force Solo from being a UPROPERTY as we do not want to save the state, or transfer is when duplicating components
    
    -   Force Solo can still be called from BP / C++ to temporarily disable batching
        
-   Extend SVT asset actions to allow creating a simple material or a material instance based off the engine default
    
-   Add menu options to enable/disable parts of Niagara - Main component activation control + renderer controls
    
    -   Does not push to the client, only works in the editor
        
-   Add Gpu Cone / Torus support for debug draw
    
-   Fixes for ray traced ribbons on CPU & GPU - Fixed various transition issues also
    
-   Add constant value option for static bool parameter bindings
    
    -   Change action menu to use SNiagaraParameter widget
        
-   Added color option for notes & revamped note UI
    
-   Optimize socket reading when in filtered / unfiltered mode
    
-   Added a validation rule to limit modules to certain sim targets (cpu/gpu)
    
-   Mesh Array Data Interface
    
    -   Can be bound to a mesh renderer so that the array of meshes can be modified at runtime
        
    -   Can not be manipulated in the VVM currently as Object handling through the graph is not functional
        
-   Add Object Reader source mode option to bind directly to the attach component (i.e. Niagara Component)
    
    -   This allows us to get at properties like the Cached Max Draw Distance without requiring BP hook up
        
-   Allow for int-enum conversion in niagara python upgrade scripts
    
-   Static mesh export for Niagara Baker
    
-   Fix for crash when calling SetIsEnabled directly on renderers
    
-   Add a mesh LOD option to use the component origin as the source of the LOD calculation
    
    -   This is more stable if you have dynamic bounds and allows for a single mesh to be rendered vs per particle LODs
        
-   Added a setting to record niagara systems at a rate lower than the sequencer play rate.
    
-   Improved default value for scale input in multiply transform function
    
-   Clear allocation estimate when changing scalability level
    
-   Niagara data channel wizard improvements: Autowrap header text, Added emitter spawn count scale multiplication, Improved target namespaces for spawn module
    
-   Add support for Velocity Cone to Cascade Converter
    
    -   Ignores owner scale / in world bools
        
-   Thread safety changes for AllowAsyncRenderThreadUpdatesEditorGameWorld and AllowAsyncRenderThreadUpdatesEditor
    
    -   This is a partial integrate of PR 12926 with minor modifications to Niagara
        
-   Added missing icons for emitter and script context actions in the Content Browser
    
-   Updated stateless forces and velocity solver.
    
    -   This fixes a problem where even small increases in mass values could quickly cause float precision issues, making the whole sim unstable after a few frames. This change might alter the look of existing content, especially if non-standard particle mass is used together with acceleration force.
        
    -   Details:
        
        -   Ignore particle mass for drag module, more precise calculation when drag = 0
            
        -   Acceleration force factors in mass now (gravity does not and still acts independent of mass)
            
-   Added 'Show Only Modified Properties' filter to the Niagara Details panel and tweaked iconography to be consistent with the Details Panel.
    
-   Lifted hierarchy order restrictions in Niagara Scripts (parameters and categories can be sorted freely now)
    
    -   Fixed child inputs allowing for layers > 1
        
    -   Fixed stack inputs with a Data Interface that have children inputs listing the children inputs before the Data Interface properties
        
-   Added favorites feature to Niagara Menus. Favorited actions will show up as Suggested actions.
    
-   Add Create Asset from transient sim caches (i.e. ones that were captured with debugging in mind).
    
    -   Add option to remove Debug Data from an existing cache
        
-   Added a wizard to spawn particles from data channel entries.
    
    -   Also allow existing read/write data channel wizards to define the target namespace + improved usage bitmask for read and write modules.
        
    -   Added auto-transformation of position values that are read or written with data channel functions in localspace emitters and improved default values.
        
-   Added a getter for the current splitscreen mode to the camera DI
    
-   Fix for skipping out FX calls in the mobile renderers hit proxy rendering
    
    -   Add a check to the count manager to ensure we don't leave dangling references in the indirect arg map
        
-   Add ability to opt out of hit proxy to sprite / mesh / ribbon renderer
    
-   Add Export To Disk button to sim cache viewer
    
    -   This allows you to export transient / none asset caches for further inspection, i.e. those captured in the attribute spreadsheet / from running clients
        
-   Render Target Sim Cache Storage changes
    
    -   Reworked so that it can be shared between the different data interfaces
        
    -   Added sim cache comparison for RT2D
        
    -   Added visualizer for RT2D data
        
-   Improve SNiagaraBaselineViewport performance
    
-   Color widget editor changes
    
    -   Added a mode to show alpha & color separate vs combined (default option, right click menu to change)
        
    -   Adding a key will select the interpolated color
        
    -   Adding a key with CTRL pressed will insert 1.0 for all channels
        
    -   Adding a key with ALT pressed will insert 0.0 for all channels
        
-   Made graph zoom limit break configurable in the Niagara Editor settings.
    
-   Renderer vertex data export
    
    -   Creates a permutation for Niagara Vertex Factories that can export the geometry into the target UAV
        
    -   These permutations are only enabled in editor builds by default, but can be enabled on cooked targets
        
    -   Call NiagaraRendererReadback::EnqueueReadback with a list of components you want to capture, when complete the callback will execute on the game thread with a list of sections and vertices that are captures.
        
    -   The vertex data is not deduplicated, so we have 3 vertices per triangle.
        
    -   Mesh vertex factory is not supported currently
        
-   Add Near Plane to camera DI
    
-   Allow desired age modes to run async when possible
    
    -   Can be disabled using the console variable fx.Niagara.AllowDesiredAgeAsync
        
-   Rename OverrideName to Parameter Name for consistency
    
-   Add previous / current FOV data to GPU view properties
    
-   Add Get Position Array Count dynamic input
    
-   Numerous upgrades to Cascade converter - Contribution by ATLUS
    
-   Added an option for data channel data interfaces to only process functions once per frame, to prevent erratic behavior in systems which tick multiple times per frame (e.g. systems with fixed tick delta timing).
    
-   Add 'fx.Niagara.SystemInstance.LWCTileUpdateMode' to control what happens when we cross LWC tile boundaries
    
    -   Default is to reset the simulation, optionally can be changed to rebase position attributes
        
    -   Does not handle data interface rebasing
        
-   Enable Niagara Editor Performance Stats for new VM
    
    -   The new VM doesn't breakdown per module and will only display information for each stack group
        
-   When using performance mode disable compile for edit to ensure performance measurements is more accurate
    
    -   One measurement I made was ~40% delta between edit mode and none edit mode
        
    -   There is a separate option to enable edit mode for profiling
        
-   Added a new mode for emitter interpolated spawn to only run the spawn + update script without value interpolation.
    
-   Add support for float32 formats to Sub UV generation
    
-   Blueprint and C++ delegates can now subscribe to data channel writes. This ensures that the data is always received on the same tick that it's written and doesn't require the listener to actively poll the data channel each tick.
    
-   Expose options for mesh exporting to baker
    
    -   Static Mesh building requires various attributes so make sure we set with defaults if not exported
        
-   Data Table Data Interface
    
-   Added alternate search names for linked input parameters. This way 'Particles.Age' will get an exact match if you type 'Age'
    
-   Add wildcard name match exclusions to sim cache compare
    
-   Add Shift+D to enable selected emitters (reverse of D which disables selected emitters)
    
-   Allow validation rules to be disabled by config file
    
-   Add debug draw to renderers
    
    -   Implement debug draw for light & decal renderer
        

**Bug Fix:**

-   Fixed crash when undoing creation of scratch pad
    
-   Fix crash when reading parameter store data for aligned types (i.e. quat / FVector4f)
    
-   Fix race when generating GPU ribbons with parallel GDME enabled
    
-   Add missing transition when copying a texture 2D to the cache
    
-   Fixed 'Open Asset' on stack entries that point to dynamic inputs opening up the asset the input belongs to instead of the dynamic input itself
    
-   Fix for not being able to change isolation when the system is paused
    
-   Fixes for ray tracing & sprite cutouts
    
-   Fix name collisions when adding empty emitters and a combination of stateless & stateful emitters
    
-   Add child components to the baker
    
    -   This is to allow for things like the component renderer to be visible and not having to toggle Niagara only off
        
-   Remove scaling from SimCache when rebasing and fix ordering of operations
    
    -   This does not precisely mirror an uncached simulation as the way scale is applied in the stack can be arbitrary, so it keeps the locations looking the same which is more accurate vs moving them
        
-   When rebasing is enabled push the sim cache data into the system instance if it has moved, even if the time has not advanced
    
    -   This fixes issues with local space emitters when time does not advance
        
    -   It does mean world space emitters diverge, but they already work like local space when a cache is active (as in they will move if the component moves).
        
-   Fix for pending spawn paused instances switching solo mode being in the wrong simulation
    
-   Fixed repeating UI refresh in summary view which was reducing performance
    
-   Fix not handling constant matrix case in VM shader format
    
-   Fix for toggling library only not working if library only was checked
    
    -   When gathering actions we should not filter as we filter the display menu, so adjusting the filter after gathering resulted in no change
        
-   Fix OOB reads from solo simulations
    
    -   Updated the reregister context to ensure solo simulations are destroyed rather than just batched
        
    -   Invalidated the script execution context when emitters are enabled / disabled / removed, this fixes parameter store bindings potentially reading OOB memory
        
-   Fix for Cutout + UV Flips when not in SubUV mode
    
-   Fix race with Post Init Views particle systems
    
    -   This call must be made before we send of GDME tasks and should hopefully never move again!
        
-   Fix mismatch between computed renderer draw order and generating the render data - Stateless didn't exactly follow stateful in this regard so when combined with scalability we got a mismatch
    
-   Fixed renames of staticswitch parameters getting lost in the input hierarchy
    
-   Disable compression on Position types to fix precision issues when compression is enabled
    
-   Fix for SKM pre skinned extents / half extends being half the value
    
-   Updated shader files with "pragma once", to prevent compilation errors by niagara data interfaces
    
-   Fix for rebasing the sim cache when interpolation is enabled
    
    -   Only one frames transform was taken into account which would result in jitter on playback if the cached simulation was moving
        
-   Fixed crash when Undo/Redoing deleting an emitter while in Scalability Mode
    
-   Added option for static switch output pins to move
    
-   Changed Niagara Parameter Reference counts to count all references of all emitters & system itself when nothing is selected. Previously, if nothing was selected we'd show the system node's references instead
    
-   On pool reuse, update solo mode & clear the component tick
    
-   Fixed a bug where recording a sim cache with "renderer only" attributes would cache all particle attributes when the renderer was in emitter mode.
    
-   Sim cache fix for GPU emitter resetting when detaching full sim cache
    
-   Fix for invalid array data size being pushed into the cache storage
    
    -   Fix for potentially reallocating the array on the RT, there's a small window but it could happen
        
-   Fixed typo in output var name of geometry collection read module
    
-   Don't show position types as source attribute to scale spawn count, as it's not lwc compatible and a vector works just as well
    
-   Fix for not copying data to the internal array data when CopyToInternal is called
    
    -   This can result in an off by one error in the editor
        
-   Add transient to runtime spawned Cascade & Niagara components
    
    -   This fixes an issue where they can Modify the attached actor resulting in invalidations of DDC keys
        
-   Fix transition error if using a simple counter and it doesn't execute the readback on the final stage
    
-   Update the bone transforms if the number of expected transforms does not match
    
    -   This fixes an issue where we don't require current frame data (so do not wait on a tick) and change which SKM the component is using
        
-   Fix RemoveEmitterHandlesById not calling RemoveSystemParametersForEmitter
    
    -   This could result in dangling parameters being used (OOB memory read)
        
-   Fix a crash when attempting to fix up outers if the parameter store data is out of sync
    
-   Fix missing external access for texture sample data interfaces
    
-   Fixed a bug where the "Show Only Issues" filter toggle would hide selected modules and could not be turned off again.
    
-   Use the aliased variable when finding the default mode
    
    -   This fixes an issue if the first time a variable was encountered it was in StackContext as we would ignore the binding
        
-   Disable low latency when anything other than the lit view mode is active
    
    -   Some of the view modes short circuit rendering so the data may not be ready in time
        
-   Change default for LOD size Y to -1 to fix issue with meshes being culled incorrectly
    
    -   A value of -1 indicates that it will never be culled by screen size
        
    -   The previous value of 2 would be adjusted to 1.0 and fail the >= screen size test if bounds were large enough
        
-   Fix crash when copying script variable meta data
    

**Deprecated:**

-   Moved Cascade editor into its own plugin. The Cascade runtime is still part of the core engine.
    

#### Path Tracer

**New:**

-   Implement Single Layer Water for Substrate
    
-   Improve diffuse response in thin glass case for Substrate
    
-   Implement analytic derivatives for r.Raytracing.Nanite.Mode=1 case
    
    -   This improves texture filtering as well as allows substrate glints to work properly in the path tracer.
        
-   Added r.PathTracing.InvalidateOnMaterialParameterChange which allows to ignore material parameter changes causing path tracing output accumulation reset
    

**Bug Fix:**

-   Fix double-accumulation of emission with multi-layered Substrate materials
    
-   Fix rare condition that could lead to infinite loop
    
-   Fix approximate caustics with substrate
    
-   Fix possible GPU hangs on AMD GPUs when using subsurface scattering or transparency
    
-   Fix exponential height fog mismatches with FogFalloff The height distribution of fog was not always consistent with the rasterizer due to an incorrect translation of falloff parameters.
    
-   Fix rare fireflies from rect lights
    
-   Fix incorrect refraction on DefaultLit materials with partial opacity
    
-   Fix hair shading not taking into account per pixel tangent variation.
    

#### Postprocessing

**New:**

-   Added Local Exposure Thresholds visualization mode.
    
-   Added Local Exposure Overview visualization mode.
    
-   New hardware ray traced translucency properties were added to the post process volume that match existing cvars (r.RayTracedTranslucency.MaxPrimaryHitEvents, r.RayTracedTranslucency.MaxSecondaryHitEvents, and r.RayTracedTranslucency.UseRayTracedRefraction), which are exposed under a new Translucency Method "Ray Traced".
    
    -   The old hardware ray traced translucency method has been deprecated and renamed to "Legacy Ray Tracing"
        

**Bug Fix:**

-   Fixed InverseExposureLerp NaNs when eye adaption is disabled. Thank you Gearbox!
    

#### RHI

**New:**

-   VulkanRHI: Update to Vulkan SDK 1.4.304.1.
    
-   VulkanRHI: Use pipeline libraries and pipeline cache for ray tracing pipelines.
    
-   Improved detection of integrated GPU that are using Unified Memory Architecture (UMA)
    
-   Updated the PSO Precaching for the Material Billboard Component to also trigger when any updates to the component are made via the AddElement, SetElements, SetMaterial, and PostLoad function calls. This is done to bring it more in line with how other components utilize the PSO Precaching mechanism.
    
-   VulkanRHI: Enable parallel translate by default on desktop.
    
-   Switched breadcrumb markers for D3D11 to use ID3DUserDefinedAnnotation from D3D11.1 and not D3DPERF\_ from D3D9 to work with Intel GPA.
    

**Bug Fix:**

-   Fix PSO chunk cache. Files generated have format $ShaderLibraryName\_Chunk$ChunkID\_$ShaderFormat, however, $ShaderLibraryName\_$ShaderFormat, \_Chunk$ChunkID was being written, resulting in files failing to load at runtime.
    
-   Fixed a bug in PipelineStateCache::GetAndOrCreateComputePipelineState that would trigger an unnecessary stall on the render thread. Precached PSOs should not be added as a dispatch prerequisite on the RHI command list, since they aren't used for drawing.
    
-   Fixed a compilation error in FVulkanCommandBuffer::SetSubmitted when enabling the RHI\_NEW\_GPU\_PROFILER macro. Some of the referenced symbols in that function have been refactored and needed to be updated.
    
-   \[AgcRHI\] Fix leak in AgcShaderBundles where input buffer memory could be allocated but not freed - Free the input buffer memory before earlying out #
    
-   MaxBufferDimensions fixed
    
    -   Changed default from DX11 max of 1<< 27 to 1<< 32 - DX11, VK,Metal,GL and other RHIs changed to set their maximum.
        
    -   Added a validation when creating SRV/UAV if the Size is greater than the value allowed for that type. You can check that with -rhivalidation
        
    -   Tested with rhiunittest and in FN
        

**Deprecated:**

-   ID3D12DynamicRHI::RHITransitionResource since it doesn't have an explicit Before state is deprecated.
    

#### Substrate

**New:**

-   Readd energy conservation correction rough diffuse. Without this correction the diffuse value at grazing angle is too low, which is problematic when doing accurate material matching. This correction is disabled for lower platforms.
    
-   Add support for imported materials to be converted with Substrate.
    
-   Add colored refracted light support for Lumen reflection on objects with non-zero transmittance.
    
-   Added default thickness value for Substrate's node in tooltips and clarified meaning of thickness in the tooltip of the transmittance to MPF node.
    
-   Change Glint density parameterization.
    
    -   Glint density is now a normalized value (0..1), with 0 meaning very low glint density, and 1 very dense glints.
        
    -   Change Glint default value from 0 to 1. A value of 1 means very dense glints, which is equivalent to a regular single specular lobe (aggregating all the glint highlights).
        
    -   Now, when glint density is set to 1, it means no glint, just a single (aggregating) specular lobe.
        
-   Change SpecularProfile to run on complex material and enable on all platforms to reduce visual disparity.
    
-   Add support for stochastic Lumen reflection with Substrate (Experimental: r.Substrate.StochasticLighting 1, runtime toggle with r.Substrate.StochasticLighting.Active).
    
    -   Allows better performance, but can result in noisy output.
        
-   Add warning about asset compatibility when saving a Substrate's auto-converted material.
    
-   Add visual cue in material graph on Substrate Slab node about SSS type and active features.
    
-   Add Substrate support for Lumen ShortAO downsample.
    
-   Improve parameter blending with vertical layering by changing transmittance computation to use refracted vectors.
    
-   Add max closure count define and use closure count == 1 to prune code evaluation.
    
-   Add soft transition from glint to GGX to avoid pops when transitioning from glint to no-glint.
    
-   Add initial implementation for Substrate stochastic lighting with MegaLights (experimental)
    
-   Optimize MegaLights with Substrate by leveraging Substrate Tile in MegaLights.
    
-   Auto enable IsThin during Substrate's material auto-conversion with foliage material.
    
-   Force rough diffuse energy preservation correction to be achromatic.
    
-   Optimized Lumen Reflections with hit lighting by utilising the fact that RT materials use simplified material (=single closure).
    
-   Fix Lumen Reflections with Substrate with Substrate for pixel containing several closure per pixels. The resolve was using tile potentially not initialized.
    
-   Add material instance override support for SpecularProfile.
    
-   Add MaterialSubSurfaceType to Substrate's Slab node. The user now explicitly selects which SSS technique is used.
    
-   Optimize Lumen ScreenProbeGather pass with Substrate.
    
-   Change Substrate SSS diffusion fallback to none rather than wrap to minimize look differences.
    
-   Add support multiple-closure evaluation for ShortRangeAO HWRT path.
    

**Bug Fix:**

-   Fix missing env. lighting rendering in thumbnail when Substrate is enabled. The energy conservation texture were never bound as the view didn't have any ViewState.
    
-   Fix Subsurface profile being not passed to the material proxy when converted through Substrate.
    
-   Fix material compilation failure with Substrate with Nanite displacement.
    
-   Fix missing SSS on surface with precomputed lighting.
    
-   Fix numerical precision causing incorrect shading results on certain platforms when opaque rough refraction is enabled with Substrate.
    
-   Fix crash on Mobile due to read/write on UAV by disabling specular profile convolution on unsupported platforms.
    
-   Fix discrepancy with haze material with LumenReflectionOnly path.
    
-   Fix incorrect Lumen reflection tracing when a material has dual specular but both roughness are larger than tracing threshold.
    
-   Fix missing diffuse contribution on SSS surface (profile, or free MFP) in Lumen reflection with Substrate. The diffuse split contribution was applied on the HitLighting shader, causing the diffuse contribution to be bypassed.
    
-   Fix haloing artifact on Substrate material blending several closures spatially.
    
-   Fix Substrate opaque rough refraction, caused by the thickness value being rescaled too soon, causing incorrect variance computation.
    
-   Fix incorrect material data offset when fetching BSDF data during Lumen screen probe sampling pass.
    
-   Fix missing indirect lighting with Substrate when sky hit lighting is enabled.
    
-   Fix runtime generation of the energy conservation table.
    
-   Fix incorrect header size in Substrate's material visualization.
    
-   Fix Substrate shader compilation issue when running -featureleveles31 with material having glints.
    
-   Fix incorrect dual source blending on PS4 with Substrate due to incorrect output format for the second RT.
    
-   Improved shader error with Substrate when mixing the Unlit node with other Slab nodes.
    
-   Fix NaN value output by LumenScreenProbe backlighting and Lumen reflection due to border pixels pixel for pixels having more than one closure.
    
-   Clamp tex.coord derivatives during Glint evaluation to avoid incorrect pattern in distance.
    
-   Fixed VRS data propagation for Substrate with material writing data beyond MRTs outputs.
    
-   Fix incorrect lighting with Substrate with MegaLight on CompleSpecial tiles.
    
-   Fix pin color with SubstrateType in material function (input/output/call)
    
-   Fix WPO no longer being visible and active for deferred decal with Substrate.
    

#### UnrealLightmass

**New:**

-   UnrealLightmass: updated to use the engine's version of Embree (version 4.3.3)
    

### Simulation

#### Physics

**New:**

-   \[NetPhysics\] Optimize physics resimulationRely on FRewind.
    
    -   Data for both rewind and stepping through non-resim objects histories during resimulation. Deactivate FEvolutionResimCache by default since it holds duplicate data.
        
    -   CVar to opt in or out of caching dirty proxies in PushData in resim history: p.Resim.CachePushDataDirtyProxies (enabled by default)
        
    -   CVar to opt in or out of caching async inputs in PushData in resim history: p.Resim.CachePushDataAsyncInputs (enabled by default)
        
    -   CVar to optimize FRewindData: p.Resim.RewindDataOptimization (enabled by default)
        

-   Cloth Transfer Skin Weights Tool: add scale to transform gizmo
    
-   Cloth Editor: remove interactive tools support from Preview Viewport. This shouldn't have any effect on behavior but should simplify the code a bit. This can be reversed if we end up re-adding tools to the preview viewport.
    
-   \[NetPhysics\] Balancing the default physics frame offset sync values to handle bad networking.
    
-   Added the ability to transform the mesh for the Dataflow StaticMeshToCollection node
    
-   Dataflow Editor: add support for materials in the Construction viewport. This requires adding UVs and Materials to the RenderCollection. Also implement getting Render Mesh materials from a ClothCollection into the RenderCollection, which enables material rendering for cloth in the construction view
    
-   Added new dataflow nodes for running a Geometry Script mesh processing blueprint from inside a dataflow graph
    
-   Added a cvar (p.Chaos.PreviewWorld.DebugDraw.Enabled) to allow enabling/disabling chaos debug draw on preview worlds
    
-   \[CableComponent\] Added new properties for controlling the behavior of teleporting cables:
    
    -   Reset After Teleport
        
    -   Teleport Distance Threshold
        
    -   Teleport Rotation Threshold
        
    -   Teleport After Reattach
        
-   Added connection type dependency system for Dataflow nodes to simplify logic when having inputs and outputs that depends on each other
    
-   Added support for variables for Dataflow assets and editor as well as overrides for assets using Dataflow
    
-   Added new versions of StaticMeshToCollection and GeometryCollectionTerminal Dataflow nodes to remove reference to UMaterial and only use UMaterialInterface ones instead (Older version of the nodes have been deprecated)
    
-   \[NetPhysics\] Implement per-actor settings for post-resim error correction in render interpolation via NetworkPhysicsSettingsComponent.
    
-   Add a new FPreviewSceneProfile to UDefaultEditorProfiles: "Grey Ambient", a low-contrast environment suitable for asset editor preview viewports
    
-   Dataflow Editor viewport clients:
    
    -   Move callback that responds to changes in the preview scene profile up to the common base class
        
    -   Respect the "Advanced Features" checkbox from the preview scene profile in this callback
        
    -   Remove duplicate BehaviorSet variables from the derived classes
        
-   New: \[Chaos Visual Debugger\] Refactored how physics bodies are represented under the hood by now using just ustructs instead of actors and made multiple performance improvements (now possible after that change). Part of this change included switching to the new data storage system in the editor, TEDS.
    
-   Added BoxProject UV Dataflow node
    
-   Add SetMaxNumRollingAverageStepTimes to the immediate physics API so that users of the immediate solver can control whether/how timesteps are smoothed
    
-   Added dataflow nodes:
    
    -   CollectionSelectionToMeshes
        
    -   AppendMeshesToCollection
        
-   Adding a UDataflowMesh type to Dataflow Engine. Currently it just holds a UDynamicMesh and a set of UMaterialInterfaces, but in the future we could look at making it a container for other mesh types (e.g. Static Mesh) as well.
    
    -   Update MeshWarpNode to use this mesh class
        
    -   Also adding render support and a few utility nodes (make, split, append)
        
-   \[Chaos\] Add MACD support between Spheres and Triangle Meshes
    
-   Exposed the 'allow merging leaf hulls' option to the 'generate convex hulls from children' dataflow node (matching how it's exposed to the 'generate hulls from leaves' node)
    
-   Added option for GenerateClusterConvexHullsFromLeafHulls dataflow node to also allow merging convex hulls on leaf nodes
    
-   Cloth Paint Tool: have the brush radius adapt to the size of the mesh being painted, not a hardcoded value
    
-   Make the Dataflow plugin dependency on MeshModelingToolsetExp Editor-only
    
-   New: \[Chaos Visual Debugger\] Added support to load and synchronize multiple CVD files in a single instance or connect to multiple live sessions. This allows us to record separate server and client instances from packaged builds and combine their visualization in a single CVD instance to debug networking issues. This feature was only available in Play In Editor sessions because both worlds run under the same instance in that case.
    
-   Dataflow node debug drawing:
    
    -   Added IDataflowDebugDrawInterface to abstract out drawing basic shapes
        
    -   Added FDataflowDebugDraw concrete class that uses UDebugDrawComponent and its SceneProxy to do the actual drawing
        
    -   Added a virtual DebugDraw function to FDataflowNode so that nodes can specify their own debug drawing
        
    -   Calling the new virtual function on any selected or pinned nodes from FDataflowConstructionViewportClient::Draw()
        
-   Dataflow: replace fixed color with per-vertex color in the Dataflow DefaultTwoSidedMaterial
    
-   FChaosClothAssetSimulationClothVertexFaceSpringConfigNode: make zero-volume tet culling optional in the Tetrahedralize approach
    
-   Cloth Remesh Dataflow Node: replace a single target percent with a range that a vertex weight map can interpolate between
    
-   VertexFaceSpringConfigNode: use tet mesh to find vertex-triangle pairs
    
-   Added transforms to Geometry collection root proxy data
    
-   Changed default behavior for new CollectionSelectionToMeshes dataflow nodes to filter the selection to leaves, as this is more commonly useful (especially for the pin-disconnected-so-select-all case)
    
-   Dataflow Editor: add a UV view mode for visualizing texture coordinates of UDataflowMeshes (can also be adopted by other data types in the future)
    
-   Added split options to the mesh->collection dataflow node, and added the option to add a root cluster bone above the mesh, instead of always adding it as a root. (In the split mesh case, always add a cluster bone.)
    
-   Improved Dataflow evaluation to allow for multiple terminal nodes
    
-   Added support for rendering UVs for Dataflow nodes rendering a collection
    
-   \[NetPhysics\] Post-resim error-correction in render interpolation to calculate snapping distance based on velocity instead of a set distance.
    
-   Added optional proximity filtering for dataflow convex hull merging nodes
    
-   Added display of variable overrides for selected Dataflow generated Geometry Collection in Fracture editorThis allow tuning and regeneration of assets in the Fracture Editor
    
-   Dataflow: add node for duplicating a UV layer in a DataflowMesh
    
-   Dataflow: UV Mesh transform and best-fit rigid transform nodes
    
-   Dataflow Mesh Resizing: adding a UV Unwrap Node that operates on UDataflowMesh
    
-   Added Utility Blueprint functions to Add and Connect Dataflow nodes as well as setting their properties
    
-   \[Chaos Visual Debugger\] Added more details to the Chaos Scene Debug Name to be able to see among other details, if the solver track we are visualizing belongs to a Play In Editor World, Game World or a Preview World.
    
-   Dataflow: new image/texture nodes for use in garment resizing:
    
    -   FMaterialInterfaceTextureOverrideDataflowNode: duplicates a material, finds a given texture and swaps a new texture in its place
        
    -   FDataflowTextureToImageNode: reads a CPU-available texture into a UDataflowImage
        
    -   FMeshResizingGrowTileRegionNode: finds a tile within a specified image region and duplicates it over the whole image
        
-   \[Chaos Visual Debugger\] Added new CVD stage scopes for Network Rewind & Resim, to be able to see how the state of a physics body was changed by the networked physics system during a network correction.
    
-   Added Destruction per frame cluster release controls to the Project settings
    
-   Dataflow:
    
    -   Modify TextureToImage to handle GPU textures
        
    -   Add an ImageToTexture node to create a transient UTexture from an image
        
    -   Modify MaterialTextureOverride to accept texture object as input
        
-   \[Chaos Visual Debugger\] Added an option in the settings section to enable scene outliner updates during playback. Currently this option is disabled by default (matching the existing behaviors in previous versions), because updating the scene outliner during playback has a significant performance impact, but in small scenes the impact is acceptable.
    
-   Added support for Dataflow for each loop subgraphs
    
-   Added GetArrayElement and GetArraySize generic Dataflow nodes
    
-   Added a Select Internal Faces Dataflow node for Geometry collection assets
    
-   Improved auto-focus logic in Dataflow Editor construction and simulation view
    
-   Exposed a project setting to optimize Geometry Collections for run-time memory.
    
    -   This option avoids creating unnecessary physics objects until the Geometry Collection breaks, saving on memory at the cost of creating more objects at the moment of the break
        
-   Added Utility Blueprint functions to override Dataflow variables on assets and regenerate assets
    
-   Changed Transform collection to expose Translate, Rotate and Scale parameters as input pins
    
-   Changed Dataflow action menu to filter nodes by asset type (This filter can be toggled via the action menu UI)
    
-   Added experimental asynchronous execution of Dataflow graphs (It can be toggled on from the Evaluation button options menu)
    
-   Added a generic (All Numeric types) version of Clamp math node in Dataflow
    
-   Added sphere covering output to the leaf convex hulls dataflow node
    
-   \[NetPhysics\] Options to trigger resimulation from desync in rotation, linear velocity and angular velocity, alongside the already implemented positional desync.
    
    -   Rename project setting bEnablePhysicsResimulation to bEnablePhysicsHistoryCapture
        
    -   Rename project setting ResimulationErrorThreshold to ResimulationErrorPositionThreshold
        
    -   New settings in Project Settings -> Physics -> Replication -> Physics Prediction -> Resimulation Replication Settings
        
-   Dataflow Editor: PDI rendering callbacks for Construction and Simulation viewports
    
    -   Implemented Cloth viewport visualizations for the Dataflow Editor using this system
        
    -   Fixed UDataflowContextObject having a stale Selected Collection member
        
-   Dataflow Editor: add Analytics events for starting/stopping the Dataflow Editor
    
-   Dataflow Editor: fix for meshes not rendering in 2D view mode.
    
    -   Added a 2-sided material for meshes in the Construction view
        
    -   Disabled the Advanced Preview Floor in orthographic view modes to avoid overly darkening the material.
        
-   Dataflow Editor: if there is a single mesh in the construction viewport after changing nodes, automatically select the mesh. This allows interactive tools to start when their corresponding node is single-clicked, rather than having to also click in the viewport. Also enables quickly switching tools when selecting different nodes
    
-   Added "Auto UV unwrap" and "Add UV channel" dataflow nodes
    
-   Dataflow Editor: add mesh stats visualization (just triangle and vertex count of current scene)
    
-   Dataflow Editor: add a LOD selection button to the simulation viewport
    
-   AChaosCacheManager: add a flag to show/hide the Billboard component. Set it hidden in the DataflowSimulationScene
    
-   \[NetPhysics\] Improvements to simulated proxies using the NetworkPhysicsComponentReduced end-to-end latency for networked inputs
    
    -   Resimulation Input Decay settings in the NetworkPhysicSettingsComponent
        
-   Chaos::Expose acceleration mode in angular and linear joint drive.
    
-   Dataflow Editor: add top toolbar buttons for adding nodes and launching interactive tools
    
-   Support for gyroscopic effects in Chaos, exposed as an option on the body. This makes tumbling motion more accurate, particularly for objects that have one dimension significantly larger or smaller than the others. There is a small performance cost associated with enabling this option.
    
-   Immediate physics solver provides access to the detailed solver settings
    
-   Added "Bake Texture From Collection" Dataflow node
    
-   Dataflow Editor: ignore non-alt left-mouse-drag in both viewports, similar to the Chaos Cloth Editor. We do this by adding a common base class that defines a ClickDragInputBehavior that is there to simply prevent the default drag operation from starting
    
-   Dataflow Editor / Cloth Selection Tool: if we are selecting Sim faces, allow switching between 2DSim and 3DSim view modes without stopping the tool
    
-   Changed the default 'generate method' for the "create leaf convex hulls" node to 'compute from geometry' rather than 'external.' Note: this should not change the setting on existing nodes.
    
-   Added a series of Material Interface related Dataflow nodes to replace the more restrictive Material based Nodes
    
-   Made Dataflow action menu to display nodes contextually to the pulled pin type and direction (When no pin is pulled the list remain unfiltered)
    
-   \[NetPhysics\] Predictive Interpolation replication mode to detect when a physics object has likely teleported and reposition the object instead of moving the object.
    
-   Made Dataflow action menu to choose node from contextual to the pulled pin type (Only compatible nodes will show in the list)
    
-   Chaos breaking and trailing events now report orientation of the corresponding piece/cluster
    
-   Deprecated OnInputTypeChanged and OnOutputTypeChanged API on the dataflow node class
    
-   Changed the double-click behavior on Dataflow nodes to check for CTRL key to the corresponding source file
    
-   Chaos Cloth Asset: save/load the value of the cvar controlling whether cloth assets should open in the cloth editor or the dataflow editor
    
-   Added Image based "Splitchannels" and "CombineChannels" Dataflow nodes
    
-   Dataflow Editor: add a DataflowEditorOptions config class to have user settings persist across editor sessions
    
    -   Enable persistent FOV settings via the config class (set default to 75)
        
    -   Also add an Options menu to the Construction viewport to set FOV
        
    -   Also save the Auto Exposure setting for both viewports
        
-   Add ability to set the entire simulation space settings in the immediate physics API
    
-   Cloth Editor: enable middle mouse button panning (really trucking) in the construction viewport in 2D mode. Toggling between right/middle/both can be done in the project settings window
    
-   Made the TinyGeo dataflow node separately calculate its proximity for merge candidates, rather than relying on a pre-computed proximity on the collection, to make it work more as-expected in the typical use case. Use the bUseCollectionProximityForConnections flag on the node to use the proximity from the collection instead.
    
-   Dataflow Editor: enable middle mouse button panning (really truck/pedestal) in the construction viewport in 2D mode. Toggling between right/middle/both can be done in the project settings window
    
-   Dataflow Editor: cache the value of the p.Dataflow.EnableGraphEval cvar to avoid calling FindConsoleVariable too often. Also set the node rendering to be more opaque when graph evaluation is paused.
    
-   Dataflow Editor: the Construction and Simulation viewports now each track their own currently active preview scene profile, rather than sharing an editor-wide global selected profile
    
    -   The details panel on the right hand side of the DF editor corresponds to the currently active profile in the simulation viewport
        
    -   Selected profiles for both viewports are saved/loaded using the DataflowEditorOptions class
        
    -   The defaults in DataflowEditorOptions are "Grey Wireframe" for the Construction viewport and "Grey Ambient" for the Simulation viewport, so these should be the profiles the user sees the first time they enter the Dataflow Editor
        
    -   Also updating the default construction material to a brighter white to look better in the dark Construction viewport
        
-   \[NetPhysics\] Reduce FRewindData memory footprint when running optimzed by only caching data in one phase per physics frame instead of up to three.
    
-   \[NetPhysics\] NetworkPhysicsComponent to network a dynamic number of redundant inputs per packet from autonomous proxy to server. The number is balanced by the server depending on input buffer integrity.
    
-   Cloth Weight Map Paint Tool: change the default ValueAtBrushQueryType to NearestVertexFast
    
-   Added dynamic mesh array as an optional input (vs static mesh) to the MeshCutter dataflow node
    
-   Dataflow Editor: when starting the DF Editor with a Cloth Asset, check that the Cloth has a Dataflow Assset. If it does not, start a simple asset editor (essentially just a details panel)
    
-   New: \[Chaos Visual Debugger\] Added a new button that will open a new (selection independent) details panel for a particle This is useful for when you want to compare the values of the state between two or more particles.
    
-   New: \[Chaos Visual Debugger\] Made it so tracks are automatically re-synced if the timeline sync mode is changed
    
    -   Also fixed an issue where if you manually scrub the timeline, the active track referenced was not updated. This only affected key shortcuts actions as they would keep acting on the old track.
        
-   Chaos:: Add scaling support into skeletal mesh for physics. Physics now support SetActorScale3D blueprint node with uniform scales.
    
-   Cloth Remesh Node: don't try remeshing sim mesh if the 2D sim mesh area is close to zero
    
-   Added support for sub-graphs for Dataflow
    
-   Added support for drag and dropping Unreal assets in a Dataflow graph (Supported assets will create a corresponding Dataflow node)
    
-   Cloth Remesh Node: add optional vertex weights to control mesh resolution
    
-   Improved Dataflow Editor default workflow to account for the newly added panels ( SubGraphs / Output Log ...)
    
-   Add SelectAll command to the Dataflow Editor
    
-   Added a new dataflow node to merge UV islands on geometry collections
    
-   Added in graph display of Dataflow node evaluation performance data. (It is off by default and can be toggled on via the Evaluation button options menu)
    
-   Dataflow Editor: remember the last-selected view mode for nodes with more than one view mode available
    
-   Dataflow Editor: add a mesh vertex normal visualization to the construction viewport
    
-   \[NetPhysics\] Physics replication and resim improvements
    
    -   Populate PhysicsReplicationCache at the end of the physics solve and mark that as the physics state for the next physics frame.
        
    -   Allow linking custom Input and State history in FRewindData to a specific particle, also register which particle(s) are requesting a resimulation and take those particles' custom input and state histories into account when finding a valid rewind frame.
        
-   \[Chaos Visual Debugger\] Implemented persistent layout support, so CVD's layout changes are maintained between sessions like it happens with other tools and the editor itself. The layout can be reset if needed from the settings section in CVD.
    
-   Added an option to Geometry Collection Assets to control the automatic crumbling of partial clusters when using the remove on sleep feature
    
-   Add access to immediate physics joint settings in the API
    
-   Improved UI for optional input on Dataflow nodes - inputs can now be added using a (+) button
    
-   Improved connection and reconnection logic for Dataflow generic types
    
-   Added a robust option to the dataflow 'Convex Hull to Mesh' node, which computes a correct convex hull from scratch instead of relying on the version in chaos's internal storage (which may have invalid topology due to aggressive simplification)
    
-   Added support for watching node output values in Dataflow graphs
    
-   Added newer convex decomposition settings to the dataflow convex hull nodes:
    
    -   For leaf convex hull, added decomposition settings based on the new, recommended subset
        
    -   For the older hull merging methods that already exposed decomposition options, added the option to choose the newer version of voxel search (with defaults left as they were, to not change behavior for existing graphs)
        
    -   Also improved support for convex decomposition of degenerate input meshes
        
-   Dataflow, UpdateClothFromDynamicMeshNode: enable setting cloth render mesh UVs from DynamicMesh UVs
    
-   \[NetPhysics\] Change physics replication mode from Resimulation to Predictive Interpolation if the received target state is outside of rewind history.
    
-   \[Chaos Visual Debugger\] Made meshes created to represent landscape collision, use Instanced Static Mesh components instead of Static Mesh Components. This improves rendering performance when you are loading multiple CVD files from different build types but with the same base content (like a server + multiple clients).
    
-   Added an Evaluation button to the Dataflow Editor that allows to choose between Automatic or Manual evaluation modes
    
-   Added a way to clear the Dataflow context cache (from the evaluation mode button options)
    
-   Added bounding box display for bone selection of Nanite-enabled Geometry Collection in the Fracture editor
    
-   Added Physical Material option to the Create Dialog Box when creating a Geometry Collection from the Fracture Editor
    
-   Improved the UI header part of the Dataflow Editor Collection spreadsheet to be slimmer
    
-   Renamed MeshCopyToPoints Dataflow node to ScatterMesh and make it output an array of meshes
    
-   Changed Mesh Transform Dataflow node to expose transform parameters as input pins
    
-   Lattice Deformer Tool: add Mesh Sculpt Layer Properties and inherit from IModelingToolExternalDynamicMeshUpdateAPI. Together this allows the lattice deformer tool to be used from the Sculpt Layers Modifier
    
-   Added Transform Points and Append Points nodes to Dataflow
    
-   \[Chaos Visual Debugger\] Updated the Generic Debug Draw trace system to allow users to trace data in specific solver stages or solver frames. Before this change you could already trace data debug draw from any thread, from anywhere that has access to the Chaos module, but the data would be only synced to game thread frames, not solver frames and stages.
    
-   \[Chaos Visual Debugger\] Added options to start recordings to multiple targets of specific types, like "All Servers" and "All Clients", at the same time. This allows you to start recording and visualizing, for example, 3 game clients builds in one single click. Similar to the existing workflow CVD has for Play In Editor sessions.
    
-   Added a SetDynamicState node to Dataflow ( for Geometry Collections )
    
-   \[Chaos Visual Debugger\] Added support to combine multiple loaded trace files into one, to make it easier to share later, or just load it again.
    
-   Added a 'Split Mesh Islands' dataflow node, with options for splitting a single mesh into an array of meshes
    
-   \[Chaos Visual Debugger\] Made Improvements to the Scene Query inspector.
    
    -   Now hits and the structures showing the visited shapes, show the particle name instead of the particle index
        
    -   Now the SQ Visit timeline control, auto selects the particle and collision shape automatically
        
    -   Made the Select Visited Shape button smaller and part of the timeline widget.
        
    -   Update the hit flags property in the hit data structure to show the human readable name instead of just an integer.
        
    -   Fixed an issue where the show collision button was being shown in the Geometry shape details panel.
        
    -   Added visibility to the Reject Reason in the recorded SQ Visit data.
        
-   Added root proxy data outputs to the following Dataflow nodes ( static mesh to collection, blueprint to collection, mesh to collection, sources to collection )
    
-   \[Chaos Visual Debugger\] Adding missing key-shortcuts from the normal level editor, that can be translated to similar actions in CVD, plus other actions that are CVD specific.
    
    -   CTRL + O Opens the browse file modal
        
    -   CTRL + SHIFT + S Opens the browse live sessions modal
        
    -   CTRL + Q Opens the scene query browser
        
    -   CTRL + SHIFT + C Combines all open sessions in a single file if possible.
        
    -   H Hides the selected particle
        
    -   CTRL + H Unhides any particle that was manually hidden
        
    -   ESCAPE Clears any active selection (Particle or Solver Data).
        
    -   CTRL + Space to Play/Pause
        
    -   SHIFT + Space to StopPeriod to go to Next Frame
        
    -   Comma to go to Previous Frame
        
    -   SHIFT + Comma to go to Previous Solver Stage
        
    -   SHIFT + Period to go to Next Solver Stage
        
    -   Lastly, CTRL + \[0-9\] to set a solver or game track as active. An active track is the track on which the playback key shortcuts will act.
        
-   Added rendering to Dataflow pruning geometry node
    
-   \[Chaos Visual Debugger\] Improved auto camera tracking controls for selected objects.
    
    -   Now we use the editor's camera orbit mode for the auto track object mode, instead of manually updating the view port focus box to achieve the same thing. This now allows you to smoothly change the view rotation of distance while auto-tracking during playback.
        
    -   Also implemented the key shortcuts to control the tracking distance with the scroll well and respect the camera speed settings.
        
    -   With these changes, CVD's auto tracking mode behaves like the existing editor's camera modes, and by using the built-in editor implementation.
        
-   New: \[Chaos Visual Debugger\] Added support to open files by dragging and drop them into CVD's viewport.
    
-   Added rendering support for many Dataflow nodes
    
-   Added support for setting up root proxies in Dataflow for Geometry Collection assets
    
-   Added a cluster point scatter dataflow node, matching the cluster fracture tool
    
-   Added a point filtering dataflow node, to filter points that are inside or outside a given mesh
    
-   Enable some p.Chaos cvars in Shipping so they can be used to tweak game-specific performance.
    
-   Physics Replication LOD (Experimental)
    
    -   Interface that allows for custom LOD solutions.
        
    -   A base implementation of an LOD solution, disabled by default. Transitions replicated physics objects between replicated timelines and replication modes (predictive interpolation to resimulation) based on distance from focal points / particles.
        
    -   Project Settings and CVars for settings (p.ReplicationLOD)
        
    -   API to register focal points / particles in the LOD via AActor, UPrimitiveComponent or directly via the LOD interface on both Game Thread and Physics Thread.
        
    -   Option to register autonomous proxy in LOD via the NetworkPhysicsSettingsComponent.
        
-   Delta Serialization support for NetworkPhysicsComponent.
    
    -   To use, in your custom implementation of FNetworkPhysicsData::NetSerialize (input or state), check if FNetworkPhysicsData::DeltaSourceData is valid, if so use it as the source for delta serialization.
        

**Bug Fix:**

-   Fixed issue where Geometry Collection initialization on the Physics thread would read Game Thread data with the risk of reading the wrong data and cause potential crashes later on
    
-   Fixed a few Chaos ISPC per-kernel variables not having or not using the preprocessor define for the default value.
    
-   Cloth Editor: Pass nullptr as DataflowEditor argument when constructing SDataflowGraphEditor. Fixes crash on ClothEditor startup.
    
-   Fixed the Dataflow SelectCluster node wrongly selecting leaves instead of clusters
    
    -   Deprecated the current version to maintain backward compatibility and created a new correct version of the node
        
-   Fixed Geometry Collection component removal logic preventing internal clusters from crumbling into smaller pieces
    
-   Dataflow Editor: fix for Skeletal Mesh being cleared from the Preview scene when changing Animations, and vice-versa. Removes the Skeleton property from UDataflowSkeletalContent
    
-   Fix the sign of twist calculated from FPBDJointUtilities::GetSwingTwistAngles
    
-   Chaos::Add velocity from rotation in destruction when a child is freed from its parent.
    
-   Cloth Editor and Dataflow Editor: fix for toolbar actions running in the wrong editor instance. We should register toolbar commands in the EditorToolkit, not the EditorModeToolkit
    
-   Dataflow Editor: fix for not being able to select a mesh in the construction viewport when there is no terminal node in the graph. This was caused by SetLastModifiedTimestamp being called with Invalid on every tick, which rebuilds the construction scene.
    
-   Cloth Editor: don't add toggle widgets to the nodes -- the toggle does nothing in the Cloth Editor
    
-   Fixed an issue where the random seed was not used in the fracture mode tools when using the "chance to cut" option.
    
-   Fixed issue causing part of a Geometry Collection to disappear shortly when using remove on break with cluster crumbling
    
-   Chaos::Fix the issue of particles not going into sleep from external SetObjectState(Sleeping) call in async mode.
    
-   \[Chaos\] Fixed broken collisions caused by attaching a component to a socket on a simulated component
    
-   Dataflow Editor: auto-focus the simulation viewport when editor starts. Also fix for attaching two different functions to a static FViewport delegate.
    
-   Fixed fix crash when using SetSimulatePhysics on a Geometry Collection component inside a blueprint construction script if the physics state of the component was not yet created
    
-   Fixed a bug where the CableComponent applied an incorrect teleport transformation to the cable points.
    
-   Disabled Chaos Debug Draw rendering in preview worlds. The old debug draw queue was excluding Preview worlds, but the new one doesn't. This caused that Chaos Debug draw, when enabled, it also rendered in any asset editor you might have open.
    
-   Made external collision for split geometry collection go to the root bone instead of being duplicated on every leaf
    
-   \[Chaos Visual Debugger\] Fixed an issue where joint (and other) constraints were disappearing in auto-generated solver stages during playback in certain conditions
    
-   Made dataflow fracture nodes convert selection to rigid/leaf nodes before fracturing
    
-   Fixed the Fracture Editor hierarchy outliner not refreshing when Color By Level option was changed
    
-   Dataflow Editor: add a cvar to toggle automatic graph evaluation in the editor. Modify the SDataflowGraphEditor to show a warning message in the editor panel when graph evaluation is paused
    
-   Fixed vertex Dataflow selection to face selection conversion crash
    
-   Fixed DataflowSelection::Initialize call in the case where the selection is not empty
    
-   Fixed issue where Geometry Collection transforms don't update properly if one of the removal features are used but one of them are disabled in the component options
    
-   \[Chaos\] Changed contacts to never be reused on the next step if a user applied a contact modifier to them.This prevents unintuitive behavior where it is ambiguous whether the contact state given to a contact modifier is modified or unmodified.
    
-   Fixed dataflow support for TArray arrays as inputs/outputs
    
-   Cloth Weight Paint Tool: fix "UnregisterComponent: Not registered. Aborting" warning in log when shutting down the tool
    
-   Cloth Weight Map Paint Tool: Fix GetCurrentWeightValueUnderBrush function -- it was just using the weight at the closest vertex rather than barycentric interpolation
    
-   \[NetPhysics\] Fix post resim error-correction in render interpolation getting skipped when Game Thread ticks slower than Physics Thread.
    
-   \[Chaos\] Fixed a bug where SetCollisionResponseToChannel did not properly update welded bodies.
    
-   Fixed out of bounds access in Geometry Collection component SetRootProxyLocalTransform method that could result in corrupted transforms
    
-   \[Chaos\]\[PhysicsProxyBase\] Fixing a NaN that will happen when ErrorX is zero because the ProjectOnto() call will divide by zero.
    
    -   \-- Code --
        
        -   PhysicsProxyBase: FProxyInterpolationError::DirectionalDecay()
            
    -   Adding an early exit if ErrorX is nearly zero.
        
-   \[Chaos Visual Debugger\] Fixed an issue where the pop up to automatically load a recording made to file, will fail to unload an existing loaded recording.
    
-   Dataflow Editor: when caching recently used View Mode, handle the case where a node does not specify any view mode
    
-   Fixed potential crash when querying querying mass and extents from Geometry Collection partial clusters
    
-   \[Chaos Visual Debugger\] Fixed an issue where changes to the data channels menu were not persisted after closing and re-opening the editor.
    
-   Dataflow Editor, Simulation Visualization: fix for 'Weight Map' pulldown being empty
    
-   Dataflow Editor preview profile controller: if we don't find a preview profile by name, don't then set the current profile index to -1. The name lookup can fail if the user creates a new profile but the editor quits unexpectedly before it is saved to disk.
    
-   \[Chaos Visual Debugger\] Fixed an issue that might trigger an ensure if you playback back and forth a recording that contains particles with no geometry, which is something possible with cluster unions
    
-   Ensure kinematic bodies get interpolated when rewinding physics in immediate physics.
    
-   Fixed a crash in Fracture editor when using fracture tools on a Geometry Collection component that has no Rest collection set
    
-   Fixed a case where the dataflow convex hull simplification node could mutate state that should be constant, therefore updating the cached result of a previous node.
    
-   Removed an incorrect condition in the dataflow lerp(a,b,t) node
    
-   Fixed issue with duplicating Dataflow generated assets
    
-   \[Chaos\] Fixed a bug where PhysicsConstraintComponent failed to reinitialize in PIE when the constraint was reregistered without calling InitializeComponent.
    
-   Fixed an issue causing the Dataflow terminal node for Geometry Collections to skip the generation of an empty asset
    
-   Fixed an issue where Dataflow reroute nodes would fail to post a cache entry in the context, causing evaluation problems
    
-   Chaos::Fix crash when there are several island groups with joint constraints.
    
-   Fixed a potential crash with the VoronoiFracture node
    
-   Fix crash in Dataflow Editor when the asset doesn't have a valid Dataflow asset
    
-   Cloth Editor: Enable ChaosClothAssetEditor plugin for Mac and Linux. This fixes being unable to create cloth assets on these platforms. Also fix Linux build errors.
    
-   Chaos::Fix instability issue in simd code of joint cached solver.
    
-   Chaos::Fix crash in dragging physics assets in ImmediatePhysics
    
-   \[Chaos\] Fixed a bug where UPhysicsConstraint::IsBroken would not return the correct value after a user broke the constraint manually with BreakConstraint.
    
-   Fixed crash when using Reset transform on a Chaos Cache Manager that has not Cache Collection assigned
    
-   Fixed crash in Chaos Cache Collection asset when editing an empty cache entry
    
-   \[Chaos\] Fixed a bug where IsAnyRigidBodyAwake returned true even when a dynamic Actor was not simulating physics
    
-   BP\_ClothPreview: replace the DefaultSceneRoot component with a USceneComponent. This suppresses the "empty Actor" icon billboard from appearing in the editor
    
-   \[Chaos Visual Debugger\] Fixed an issue where the incorrect meshes representing a landscape tile will be shown if the world is loaded and unloaded rapidly while scrubbing back and forth.
    
-   Fixed potential crash when querying mass and extents of a Geometry Collection cluster that does not have geometry
    
-   Dataflow Editor: Fix grid rendering in Simulation Viewport
    
-   Fixed geometry collection resize logic to correctly handle the case of a geometry with zero vertices or faces.
    
-   Chaos:: Fix particle jittering issue when involved in a free joint. Disable inertia conditioning on particle when it is involved in a free joint.
    
-   Chaos:: Correct COM and new inertia computation with COM nudge.
    
-   \[Chaos\] Removed outdated Physx Only property descriptions from iteration counts and locking constraints in BodyInstance.
    
-   Fixed issue where the wrong Geometry Collection component crumble notify flag was set when setting them through SetNotifyGlobalCrumblings blueprint function
    
-   Chaos::Fix pushing cube's different bahavior under different fps. Scale impulse applied in UCharacterMovementComponent::ApplyImpactPhysicsForces to be consistent with time scale.
    
-   Removed tick function on the Geometry Collection actor as it wasn't needed but was still impacting performance
    
-   Fixed fracture AutoUV crashing when run with an invalid target UV channel
    
-   Bug Fix: \[Chaos Visual Debugger\] Enabled unsafe type casting as errors in the ChaosVDModule, and fixed all the existing warnings.
    
-   Changed the Dataflow render pin widget from a toggle to a push pin (This also fix issues where pin would not be clickable depending on how much the graph was zoomed in or out)
    
-   Fixed a crash when copy/pasting a Dataflow comment that had a label that was the same as an existing node name
    
-   Fix for the immediate physics solver to mark constraints as dirty if bodies are changed from kinematic to dynamic.
    
-   Corrected tooltip that describes the meaning of the geometry collection bone 'size' stats: It is the cube root of bone volume, not the side length of the bounding cube.
    
-   Fixed crash caused by invalid proxies on teleporting objects.
    
-   Fixed Geometry Collection level 0 internal clusters failing to crumble when using Remove On Break feature
    
-   Fixed a bug where the teleport type did not apply to certain simulated skeletal meshes.
    
-   Fixed crash in the fracture Auto UV dataflow node when the selection input is out of sync with the collection
    
-   \[Chaos Visual Debugger\] Fixed an ensure in GLevelEditorModeTools during start up of the Chaos Visual Debugger standalone program.
    
-   Cloth Geometry Tools: fix bug in adding seams when appending to a cloth collection - also change a hard crash to a check if we end up with a DynamicMesh whose topology doesn't match the cloth collection
    
-   Fixed the Geometry Collection navigation mesh not updating properly for broken pieces
    
-   \[Chaos Visual Debugger\] Fix for an issue where changes to any settings (including all in the show menu) were not added to the undo buffer, and therefore they could not be undone with CTRL + Z.
    
    -   Also fixed an issue where if you change the color mode, the view port does not get automatically re-drawn.
        
    -   Same for the Generic Debug Draw Settings
        
-   Fixed the Fracture editor tool category not been localized properly
    
-   Fixed a crash on deleting a geometry collection while a fracture tool has an active noise preview
    
-   Temporary reversion of previous change to CCD flag code. The original change was producing unintended effects and will need to be evaluated before being restored.
    
-   \[NetPhysics\] Fix where physics replication would not iterate TickCount correctly resulting in incorrect target alignment.
    
-   Dataflow Editor: fix crash when changing selected nodes with the paint tool active. Calling ToolsContext->EndTool schedules closing the tool for the next tick, whereas calling ToolManager->PostActiveToolShutdownRequest requeste the tool close immediately.
    
-   Dataflow Editor: use FRenderCollection's vertex normals in the construction view rendering - Also update cloth 2D Sim mesh rendering to use a constant normal direction
    
-   \[Chaos\] Fixed SetOneWayInteraction not applying after toggling physics on a body
    
-   Dataflow Editor: fix normal rendering of DynamicMesh outputs
    
-   Fix Geometry Collection partial clusters not inheriting gravity and other physics settings from their original clusters
    
-   DataflowEditorMode: fix FName comparison operator
    
-   Cloth Paint Tool: fix gradient mode so that "low" vertices are selected with plain drag, and "high" vertices are selected with CTRL-drag. Also fix an issue where selected vertices don't change color when overwritten with a new selection.
    
-   \[Chaos\] Fixed a bug that prevented line traces from correctly getting UV data from physics meshes.
    
-   Dataflow Editor: changes to both viewport toolbars - remove options that do nothing/crash - remove drop-down in the sim viewport that has no items - add camera speed options to both viewports
    
-   \[Chaos\] Fixed AddForce not triggering OnComponentWake.
    
-   Fixed dynamic mesh to geometry collection conversion for the non-compact mesh case
    
-   \[Chaos\] Fixed a bug where a body with StartAwake=false could be woken up on init by their child bodies with auto weld.
    
-   Remove cloth collision dependency on transforms changed delegate
    
-   \[NetPhysics\] Fixed some resimulation crashes from doing static\_cast on an invalid pointer after a physics object is deleted and we rewind back to before the deletion.
    
-   SClothAnimationScrubPanel: guard against null pointer dereference
    
-   Fixed a crash when converting a Geometry Collection from a Skeletal Mesh made of multiple mesh islands
    
-   Fixed Geometry collection component collision transforms when sourced from proxy meshes
    
-   Made the collection attribute transform dataflow node use the attribute name/group params + also recompute bounding boxes if the vertices were moved
    
-   \[NetPhysics\] Fix post-resim error-correction render interpolation issues.Fix issue where ClusterUnions and GeometryCollections could stutter after a resim.Apply the rotational error-correction in local space, which solves issues with for example a wheel rotating and turning while also having an error-correction applied during render interpolation.
    
-   Fixed the selection by level Dataflow nodes so that they will create the required level attribute exists in the collection if it's missing
    
-   Cloth Editor: fix crash when changing Dataflow property. We were not passing in a null DataflowEditor when reinitializing the graph editor.
    
-   Fixed the dataflow mesh cutter node not using mesh normals and UVs
    
-   \[Chaos Visual Debugger\] Fixed an issue where initial empty frames were not properly excluded. This caused a situation where when you load a CVD file nothing was visible, because the data started in the next frame so you needed to either start playback or scrub manually to the next frame to see it.
    
    -   Note: There are still cases where this will still happen, as these frames might have data, like scene queries but be disabled. Further improvements are planned for future releases. We also added an option in the settings section of CVD to allow you to fully disable this "empty frame" trimming feature if needed.
        
-   Fixed the "append collections" dataflow node not updating transform indices correctly
    
-   Fix crashes on dataflow nodes processing invalid geometry collection selections
    
-   \[Chaos Visual Debugger\] Added missing debug names for particles created as a kinematic end point in DOF joint constraints.
    
-   Fixed crash on invalid auto-instance mesh access in geometry collection conversion
    
-   Added missing transforms to dataflow geometry collection proximity rendering
    
-   Set limits on the grid point scatter in dataflow to fix crash if the number of points requested is large
    
-   \[Chaos Visual Debugger\] Fixed an issue where if you undock a tab inside CVD, the title bar in all CVD windows starts flickering.
    
-   \[Chaos Visual Debugger\] Fixed an issue where the solver visibility button in the solver tracks widget can get stuck, impeding you from changing the visibility again.
    
-   Made fracture mesh conversion more robust to UV or normal overlays with unset triangles
    
-   Cloth Remesh Node: use the DynamicMesh UV layers to determine how many UV channels should be on each render vertex in the output ClothCollection (so that we don't accidentally add 4 channels when the input only has 1, for example)
    
-   \[Chaos Visual Debugger\] Fixed issues that caused the playback controls get soft locked if you start the playback of a recording in Network Tick timeline sync mode, but later in the recording that mode becomes incompatible. Now CVD will handle that and similar cases under the hood.
    
-   \[Chaos Visual Debugger\] Fixed an issue where the reset settings button was not working for some categories, like Generic Debug Draw
    
-   Cloth Render Node: populate all UV Channels for output
    
-   Fixed fracture mode stats not refreshing when hull count changes, by adding hull count to cached stats
    
-   Fixed Geometry collection being placed in a level and not properly initializing their physics material
    
-   Fixed Dataflow editor to support change of the corresponding Dataflow asset while the editor is opened
    
-   Fixed Chaos Field issue not properly gathering parent particle transforms above a single level of hierarchy and causing fields to believe they were in a different place
    
-   Fixed crash when calling Geometry Collection component SetLocalRestTransforms with a collection that has no bones
    
-   Chaos:: Fix wrong rotation axis when using simd for linear joint solver.
    
-   Fix Dataflow generated Geometry Collection not properly rendering when no material was passed to the terminal node
    
-   Fixed Geometry collection collision group not properly being set on partial clusters and causing collision to be missed
    
-   Fixed Geometry Collection rigid bodies not properly waking up when apply velocity on them through the corresponding component methods
    
-   \[Chaos Visual Debugger\] Fixed an issue where selecting a log line in the Recorded Log browser, would sometimes re-select another log line incorrectly.
    
-   \[Chaos Visual Debugger\] Fixed an issue where recorded Scene Queries were drawn at the wrong location when the Network Tick timeline sync mode was used. This was happening because that system was still using the Timestamp sync mode under the hood (therefore it was drawing the query from data from a previous or following frame).
    
-   Fixed crash caused by Geometry Collection component being garbage collected before the corresponding physics proxy updates one last time
    
-   Fixed Nanite enabled Geometry Collection rendering that would not update properly when driven by a static pose chaos cache in cooked games
    

**Deprecated:**

-   Deprecate UClothEditorContextObject. It has been replaced everywhere by UDataflowContextObject.
    

### Tools

#### BuildGraph

**New:**

-   Append the Horde job ID to the RetrieveArtifact query when the optional ScopeToJobId element has a value of TrueBug
    

**Bug Fix:**

-   AutomationException is thrown when RetrieveArtifact cannot find an artifact instead of InvalidOperationException.
    

#### UGS

**New:**

-   Added dark mode (and generic theming support).
    

### UI

**New:**

-   Blutility: Add BlueprintCallable FindChildWidgetName() function for Editor Utility Widget
    
-   Blutility: Add editor scripting functions for modifying Widgets in a Widget Blueprint's Widget Tree
    
-   Blutility: Add UEditorUtilityLibrary::AddSourceWidget to allow adding widgets to a widget blueprint from editor scripts
    

**Bug Fix:**

-   Console - Fix to prevent a gap showing when the console is open.
    

#### Slate

**New:**

-   SlateIM: Experimental immediate mode wrapper for Slate Intended for creating tools. Available in the editor, in cooked builds, and for programs without the engine. See SlateIM.h for the available API.
    

#### UMG

**New:**

-   Refactored widget animations to not use a player object anymore.
    
    -   This change removes the use of UUMGSequencePlayer except in places that require backwards compatibility. These player objects, and the IMovieScenePlayer interface, are getting deprecated in favor of more lightweight "runner" structs that can be easily packed in memory. A future optimization might even be to move all these runner structures into the UMG Sequence Tick Manager.
        
    -   As much care as possible has been taken for backwards compatibility. Almost everything should still work \_except\_ the rare case of calling GetUserTag or SetUserTag on the returned player object from a PlayAnimation BP node that is \*not\* done from \*inside\* the user widget itself. That is, such calls, if done in another Blueprint, wouldn't get automatically fixed up and result in BP compilation errors. It should only take a couple clicks to fix them manually.
        
    -   A special note about the virtual methods OnAnimationStartedPlaying and OnAnimationFinishedPlaying on the user widget class: these used to take the player object. In order to only create these legacy player objects when needed, these virtual methods aren't called unless the user widget's actual class hierarchy contains a native C++ class. When that happens, we have no way of knowing if that sub-class has overridden those two callbacks, so by precaution we do create a player object and call them.
        
    -   If these methods are, in fact, not overridden, the sub-class can override GetLegacyPlayerRequirement and declare that it doesn't need them called, nor a player object created just for that purpose. And if the methods have been overridden, that code should be upgraded to instead override the versions that take the runner structure.
        

### Virtual Production

**New:**

-   Remove meta-data for locks and scrubbing value delta for Vector, Rotator Controllers as it's not the desired behavior for most cases.
    
-   Changed Remote Control Controllers to be named numerically starting from 0001 by default, and to auto-populate its description if being created / bound to an entity (and there's no existing description for it).
    
-   Changed string controllers to by default support multi-line text.
    
-   The deserialization of UDP messages happened on the processor thread which can cause delays in processing UDP messages. There was a long standing TODO to move this into an async task. Moving this to an async task will allow the processor to continue processing inbound and outbound messages and let the serialization and handoff of the message to the transport handler occur asynchronously.
    
-   Added multi-selection support for controllers. This still keeps the single-selection support for behaviors, while allowing multi-controller deletion and other operations.
    
-   Added support to dragging multiple exposed properties into the controller area
    
-   Add experimental Naming Tokens plugin. 
    
    -   NamingTokens performs string processing by replacing tokens in a string with their resolved values. E.g., “string with {token}” becomes “string with tokenValue”.
        
    -   It supports the use of namespaces to organize and access tokens across different tools. E.g., “string with {yourNamespace:token}” becomes “string with tokenValue”, where the token is only evaluated against yourNamespace.
        
    -   Both tools and users can define namespaces and tokens, allowing a centralized and consistent method of creating and evaluating tokens.
        

**Bug Fix:**

-   Remote Control: Fix Editor only warnings to properly reflect packaged build.
    
-   Remote Control Protocol entities now unbind when an entity gets unexposed/deleted.
    
-   Fixed issue where the protocols kept running even after the Remote Control Preset window was closed.
    
-   Fixed issues with bindings not working after level reload
    
-   Fixed issue where dragging linear color exposed property into controller area would not create any controllers.
    
-   Fixed issue with re-applying Remote Control Signatures clearing the DMX Library
    
-   Fixed generate unique label to now properly find a suitable name for a duplicate controller rather than just appending "\_1"
    
-   Fixed issue where properties with custom reset to default not working as expected. An example would be the "Scale 3D" property for Scene Components.
    
-   Actor label rename now update the owner column in exposed entities.
    
-   Fixed issue where properties from different actors with the same label would get put in the same owner group.
    
-   Fixed exposed functions that become invalid causing RC Presets to corrupt / become invalid, or in the Motion Design case for levels to corrupt.
    
    -   An example of this would be exposed BP functions that get deleted. The previous code would not serialize anything on saving if the function was invalid, but on load it would always serialize the number of bytes for the arguments. This mismatch caused issues with serial mismatch causing fatal errors.
        
    -   This change does not fix existing damaged assets because on load it's impossible to know whether a function that is now invalid/nonexistent on load was valid or invalid at the time of save, which for the old saving code meant different serialization results.
        
    -   This change, however, fixes new assets such that the serial size remains consistent regardless of whether a function becomes invalid at any time.
        

**Deprecated:**

-   Deprecated active masks from entities as it had no actual use unless the override masks were all none/unset (unlikely, very specific). Override Masks should be used instead now.
    

#### DMX

**New:**

-   Pixel mapping assets can now be dropped onto the level to spawn a Pixel Mapping Actor
    
    -   Pixel Mapping Actors offer auto-activate and play in editor options
        
    -   Pixel Mapping Actors offer blueprint nodes to control them from blueprints:
        
        -   'Start Sending DMX'
            
        -   'Pause Sending DMX'
            
        -   'Stop Sending DMX'
            
        -   'Set Stop Mode'
            

**Bug Fix:**

-   DMX Control Console: Fix issues where DMX Control Console Actor did not send DMX in certain setups.
    
    -   DMX Control Console Actor now correctly sends DMX in Standalone.
        
    -   DMX Control Console Actor now correctly sends DMX in PIE after toggling send DMX in editor.
        
    -   DMX Control Console Actor now correctly sends DMX in editor when auto-activate and send DMX in editor is enabled.
        
-   Fix Load DMX Libraries Synchronous node does not return all DMX Libraries
    
-   Fix Control Console cannot use patches that were created in a DMX Library while the Control Console is not loaded.
    
-   Fix Control Console shows patches that were deleted while Control Console was not loaded
    
-   Fix projects using DMX components cannot be packaged. Illegal reference to private object: 'DMXComponent referenced by property (private object belongs to an external map).
    

#### Media IO

**Bug Fix:**

-   Fixed lens distortion race condition with render-thread destroyed uobjects in scene view extension method.
    

#### nDisplay

**New:**

-   Switchboard now supports separate engine and project Perforce workspaces.
    
-   Switchboard now adds -DisablePython to nDisplay launch command lines by default, which reduces GC time.
    
-   Support for output backbuffer tiling Pure tiled capture functionality. No tile configuration dialog or media configuration panel yet. Those will come over later in separate changes. The node backbuffer can be captured as MxN tiles
    
-   Support hiding actors from specific outer viewports.
    
-   Switchboard: Make settings dialog appear fast even with tens of devices. Tested with 50 devices, without this change it was taking about 12 seconds to load the settings dialog, now it takes less than 1 second to appear.
    
-   Allow ICVFX camera priority inversion per viewport. This is useful for dual camera ghost frame workflow such that only the overlap is effectively time multiplexed.
    
-   NDisplay Viewport freezing toolbar has been updated as part of the new editor toolbar migration. In addition to its original behavior as a status button that can be used to unfreeze all viewports at once, each individual stage in a level can now be frozen or unfrozen individually by using the new Performance drop down menu on the toolbar.
    
-   Base failover implementation (v1.5, P-node replacement).
    
    -   Supports any node loss (depends on the configuration).
        
    -   It has everything we need for the next step where we could use backup nodes for complete (rendering + media) replacement of the failed ones . 
        
    -   Improved the failover subsystem in order to support primary node loss.
        

**Bug Fix:**

-   Fix deleting the NDC from a level not updating the ICVFX panel.
    
-   Prevent being able to add a new viewport from the output mapping graph when no cluster node is present. The option to add a viewport is removed unless it is safe to do, fixing a crash and keeping the behavior the same as in the treeview.
    
-   Fixed issue where ICVFX components weren't properly being reselected in the ICVFX drawer when a property was changed
    
-   Fix issue where recording with TakeRecorder and MU could cause a crash when rejoining a session.
    
-   Fixed issue where color grading and white balance settings would reset to zero instead of desirable default values when editing the per viewport or per cluster properties in an nDisplay stage
    

#### Rendering

**New:**

-   OpenColorIO: Added a new UE emulation transform option in plugin config called "UE Tone Curve" to simulate the UE look without Expand Gamut.
    
-   OpenColorIO: Updated library to v2.4.1, now as a static library.
    
-   OpenColorIO: Exposed new default editor settings applied to level viewports when none was previously set, or if settings have been cleared.
    
-   Holdout Composite: Added translucent material support and automatically routed the Base Color output to Emissive to prevent black with Lit materials.
    
-   Holdout Composite: Added FXAA support on the separate composited render.
    
-   OpenColorIO: Full shader parameter refactor to support dynamic texture bindings, necessary for built-in ACES 2.0 support.
    
-   OpencolorIO: Added drag and drop support to .ocio config files.
    
-   OpenColorio: Added support for color & display-view tooltip descriptions.
    

**Bug Fix:**

-   Fixed animated Text3D holdout composite use cases by re-register primitives on tick.
    

#### Tools

**New:**

-   Added support for primitive components in Level Instances transactions when in a Multi-user session. This is only for editor-to-editor workflows in a non-World Partition level
    
-   \[Live Link Hub\] Added ILiveLinkRecordingSessionInfo interface for slate metadata, recording status and record start/end events.
    
-   \[Switchboard\] Added a Visual Studio Code workspace, with example configuration for debugging, automated testing, and linting/analysis. Note that Switchboard should first be launched using the standard workflow at least once to ensure any required dependencies have been installed.
    
-   Remote Control Behavior Nodes with editable properties now have a details panel in the behavior by default (this can be overridden by child behavior models). This allows external/blueprint behaviors to work with parameters that can be set from the Remote Control Preset.
    
-   Added bounce option in CineCameraRigRail
    
-   \[Take Recorder/PCap Workflow\] Added BlueprintReadOnly access to the RecordedObject property. This is so users can query the class of the recorded object and filter whether or not to record its properties.
    
-   Live Link take recording sources now no longer use the timecode on the source by default. Instead the default is to now use the engine's timecode.
    
-   \[Switchboard\] Added support for the SWITCHBOARD\_CONFIG\_DIR environment variable, which users can set to override the path used to save and load Switchboard configuration files.
    
    -   Additionally, if working with multiple engine branches, branch-specific variables named according to the \`BranchName\` field in \`Build.version\` can be used (e.g. SWITCHBOARD\_CONFIG\_DIR\_UE5\_MAIN).
        
-   \[Live Link Hub\] Users can specify the session to load at startup via the \`-SessionPath="C:\\...\\MySession.json"\` command line argument.
    
-   \[Switchboard\] Added Live Link Hub device, which supports launching the Live Link Hub application via SwitchboardListener.
    
    -   It behaves similarly to the Unreal device in many ways, including proper handling of Perforce sync, building from source, and automatic retrieval of log files on shutdown.
        
    -   If multiple Live Link Hub devices are present, the one operating in "Hub" mode can be toggled using a radio button selection mechanism, similar to the nDisplay primary node is selected (the rest are inferred to be operating in "Spoke" mode).
        
-   Change the default recording setting for Multi-user take records. Now users have to opt-in to recording rather than opt-out
    
-   \[Virtual Scouting\] Placement tool: -Add function to select the spawned actor if auto swapping to the grab tool
    
-   Animation: Add support for recording timecode when baking an animation sequence. This is intended to support motion capture workflows, where a livelink track is first recorded (which saves all keys at the original sample rate without a dependence on the Engine frame rate), then the driven actor can be added to the sequence (e.g. an animation blueprint), then right click to start the animation sequence baking process, make sure the "bake timecode" option is checked, then proceed to bake.
    
-   \[Live Link Hub\] Added support for extending session data save/load using the ULiveLinkHubSessionExtraData and ILiveLinkHubSessionExtraDataHandler classes.
    
-   Added support to expose properties within instanced structs.
    
-   Added support for ST maps in the Scene View Extension lens distortion method. When using a lens file that is configured to use ST maps, the SVE lens distortion will now correctly distort using those ST maps
    
-   Take Recorder: Support dynamic user tokens. Users can enter in tokens into specific fields in Take Recorder, auto generating new tokens in the top UI. These exist for the life cycle of the panel and allows users to define their own tokens to use within these fields.
    
-   New: \[Switchboard\] Improved file-based logging, capturing more detail, and making log file names readable at a glance.
    
-   Added a new experimental plugin, Cinematic Assembly Tools (CAT).
    
    -   This plugin adds a new asset type, the Cine Assembly, which is derived from Level Sequence.
        
    -   Each assembly opens in its default level and serves as a centralized container for cinematic pipeline metadata.
        
    -   Assemblies are generated based on Cine Assembly Schemas, which define the structure of subsequences, metadata, and folder organization to be created with the assembly.
        
-   LiveLinkHub - Improved default on the FileNameTemplate setting
    
-   \[LiveLink\] - Marked ELiveLinkSubjectStatus as Blueprintable so it can be used with convenient SwitchOn statements in BP.
    
-   TakeRecorder: Enhance the Take Recorder engine subsystem to support general business logic with a BP and cpp API, removing the requirement of using the Take Recorder panel.
    
-   \[Switchboard\] - Update to OSCSwitchboard editor utility object to use new Take Recorder Subsystem events in addition to keeping the legacy TakeRecorder BP delegate events.
    
-   TakeRecorder: Change default of AnimationTrackName to {actor}\_anim, solving an issue when loading into sequencer.
    
-   TakeRecorder: Fix subsequence asset name and track not being utilized in standard actor sources. Add Subsequence directory field, recognized by Naming Tokens, to be used when sub sequences are recorded.
    
-   Added Live Link Locator Role.
    
    -   Adds locators role primarily for optical motion capture markers.
        
    -   Provides the option to send unstructured data (changing number of markers per frame with no labels).
        
    -   Axis swap pre-processor to operate on this new type of data.
        
-   \[Live Link Hub\] Added support for Live Link Devices. Live Link Devices are designed to enable integrated monitoring and automation of external software and hardware in performance capture / stage workflows.
    

**Bug Fix:**

-   LiveLinkHub: Fix frame timing misalignment between goto frame and forward/reverse playback. Going to any frame will now take into account both the local track framerate for the initial conversion and the nearest recorded timestamp. This results in more correct and smoother animation between scrubbing and playback, especially in cases where the initial recorded frames have a > 0 timestamp.
    
-   LiveLinkHub: Fix live subjects with a remapper applied not resuming when exiting playback.
    
-   LiveLinkHub: Fix being able to play an empty recording. This prevents a possible freeze when looping and changing direction.
    
-   LiveLinkHub: An initial load with a mismatched frame index will now fail gracefully, rather than potentially freezing or crashing.
    
-   \[Switchboard\] Fixed an issue where code changes from irrelevant AdditionalPathsToSync might incorrectly impact the CompatibleVersion field in the Build.version file.
    
-   \[Switchboard\] The Unreal device build indicator now performs more robust checks to determine when a build might be required.
    
-   Fixed issue with unexpose button only unexposing one of the actors when multiple actors are selected and all have the property to unexpose exposed
    
-   Take Recorder: Include TransformOrigin while recording non-attached transforms
    
-   \[Virtual Scouting\] Modified controller mapping on index controller to prevent flying while scrubbing with sequencer tool. This matches behaviour on quest headset
    
-   LiveLinkHub: Fix scrollbars not showing up on client list and playback list.
    
-   \[Virtual Scouting\] Fix for scene capture color when taking a screenshot. Uses Final Color SRGB for the PNG export so color matches what is seen in the viewport and the viewfinder render target.
    
-   LiveLinkHub
    
    -   Fix remapper being applied twice to recordings. We now save the unmapped data to recordings and apply the remapper on playback.
        
    -   Optimize the number of times LLH sends static data, correcting issues with remappers being constantly reapplied.
        
    -   Fix an ensure that could be triggered if a remapper was compiling skinned assets on a different thread.
        
-   LiveLinkHub: Fix program freeze when trying to play an empty recording. Prevent saving over existing recordings to fix a crash on playback.
    
-   LiveLinkHub: Fix not being able to save and load frames with different sizes. Multiple static data recorded per track is now loaded properly. Note that changing static data per-frame is not officially supported. This data should remain constant for all frames.
    
-   \[Switchboard\] Fixed an issue where settings that only exist on individual devices may not save correctly when modified via the Settings dialog.
    
-   Fixed issues causing artifacts for Scene View Extension lens distortion when using TSR.
    
-   \[Switchboard\] Show a warning if the device source control workspace stream differs from the one in Switchboard. This is not usually intended, but can happen in environments that mix and match Unreal versions.
    
-   \[Switchboard\] Unhandled exceptions are now captured in logs and displayed in the UI.
    
-   \[Switchboard\] Changing the log pane verbosity dropdown no longer prevents lower verbosity messages from being captured in log files.
    
-   \[Performance Capture Core\]
    
    -   Remove BP write access on members that won't be reinitiated by post-edit changes when written to from BP.
        
    -   Blueprint ReadWrite members in the performer and retarget components now have dedicated UFunctions to set variables that require animation reinitialization
        
-   \[Switchboard\] Fixed a long-standing corner case with multiple local devices, ensuring the multi-user server executables are always built, regardless of which device is selected to build.
    
-   TakeRecorder: Fix crash when recording with a deleted (none) actor.
    
-   \[SwitchboardListener\] We no longer pass the '-dont\_restart\_as\_admin' option to PresentMon, which is now the default behavior, and was emitting a deprecation warning.
    

**Deprecated:**

-   VirtualProductionUtilities: Deprecate BP\_VPBookmarkActor
    
-   We have removed support for Editor.ReflectEditorLevelVisibilityWithGame for ICVFX workflows. Users can now set level visibility directly in the Level tool when in a Multi-user session
    
-   \[Legacy Virtual Scouting\] Removed all assets and Blueprints relating to Legacy Virtual Scouting.
    
-   \[Legacy Virtual Scouting\] Removed code used exclusively by the Virtual Scouting 1.0 tools which are now deprecated.
    

## 更新说明

### Animation

#### Character Customization

**Upgrade Notes:**

-   The new MutableClothing plugin needs to be enabled to have the same functionality as with old versions.
    

#### Control Rig

**API Change:**

-   OnGizmoInteractionStarted
    
-   OnGizmoInteractionEnded
    
-   OnGizmoInteractionPreUpdated
    
-   OnGizmoInteractionPostUpdated
    

#### Deformer Graph

**Upgrade Notes:**

-   This method is preferred over Skeletal Mesh Editor -> Asset Details -> LOD Info -> Build Half Edge Buffers for ease of management. Build Half Edge Buffers is now renamed to Force Build Half Edge Buffers.
    

#### ML Deformer

**Upgrade Notes:**

-   We advise moving Nearest Neighbor model assets to the Detail Pose model, as we are deprecating the NN model. Change your model type after opening the NN model asset, then set up missing properties.
    

#### Runtime

**Upgrade Notes:**

-   Use new AnimationData::Trim signature, old one has been deprecated
    

**Upgrade Notes:**

-   Swtich UAssetUserData::PostEditChangeOwner to new signature (old one has been deprecated)
    

#### Sequencer

**Upgrade Notes:**

-   UMovieSceneSequenceExtensions::AddSpawnableFromInstance and AddSpawnableFromClass have been deprecated. Please use ULevelSequenceEditorSubsystem::AddSpawnableFromInstance and AddSpawnableFromClass
    

### Editor

**API Change:**

-   Now it's possible to add PreviewShaderPlatform in DataDrivenPlatformInfo to create new shader platforms that can be used to preview how different features might work on shader platforms that are aren't runnable on the current platform on the editor. For example, previewing ES3.1 shader platform with distance fields supported.
    
-   To enable UMaterial and UMaterialInstance asset validators you should add DataValidation.DataValidationSettings configuration in editor settings and specify which shader platforms / feature level / quality levels you want to exercise during asset validation. A good idea is to cover all ranges of platforms that are supported, like mobile.
    

**Programming Upgrade Notes:**

-   Bespoke tools that had a dependency on the "ProjectLauncher" module in the tool's target.cs file will need to either change the dependency to "LegacyProjectLauncher", or include a dependency on the "ProjectLauncher" plugin.
    

#### UI

**API Change:**

-   It's a new setting so users might want to be notified of its existence
    

#### UX

**Upgrade Notes:**

-   Toggling visibility for entities in Scene Graph outliners now supports multiselect
    

### Foundation

#### Build

**API Change:**

-   Usage, inside a module's Build.cs:\`\`\`FPassPlugins.Add("\[Path to FPass-Plugin\]");\`\`\`
    
    -   Note: The FPass-Plugin must be compiled for the host compiler's architecture and support the target architecture.
        

#### Core

**API Change:**

-   In the editor case, we are gathering all actors from the (many) worlds and dynamic casting them into the proper type during iteration. This can be very wasteful when the actor type's count is comparatively small to the total actor type (i.e. in most cases). We now pre-filter the list of actors based on their presence in the list of objects of their class (which was already retrieved), which is cache-friendlier than dynamic casting.
    
-   Move FSetElement/KeyFuncs into a separate file so they can be used by other classes without depending on Set.h
    
-   Remove friend from FSetElementId
    
-   Disabled the loose file loading path for non-editor platforms unless "s.LooseFileLoadingEnabled" is enabled in the Engine.
    
    -   StreamingSettings or -loosefileloading is passed on commandline. This restores the previous performance characteristics for zenloader on 5.4 in runtime configs which avoided checking the filesystem for loose files to override cooked data in the iostore.
        
    -   "s.LooseFileLoadingEnabled" replaces the shortlived "s.AllowLoadingPackageFromFileSystemInShipping" as the former is more encompassing and the latter also poses a initialization timing issue since cvars are initialized too late to handle all potential loads during boot.
        
-   The functions can also be called in Visual Studio's watch window.
    
-   Add "-ZenDisableCache" to the command line of the client if you experience any issues with the caching
    
-   Add this to your game's Target.cs:GlobalDefinitions.Add("UE\_UOBJECT\_HASH\_USES\_ARRAYS=1");
    
-   Some invalid characters that were previously allowed have been restricted to prevent crashing during serialization.
    
    -   Other invalid characters are permitted for now, but will be phased out over time.The cvar CVarEnforceValidName can be enabled/disabled to test enforcement.
        
    -   This and future alterations to PropertyBag through the API will have a new result EPropertyBagAlterationResult.
        
-   GetAddressInfo will now try to get FQDN via getnameinfo if EAddressInfoFlags::FQDomainName is passed. It will return a first domain name that contains a dot (.)
    
-   Use UWorldPartitionRuntimeHash::GetStreamingPerformance that also flags if streaming should block (bOutShouldBlock) instead.
    
-   PropertyBag property names should be sanitized prior to being added or renamed using the SanitizePropertyName function as good practice.
    
-   \[CSVProfiler\] Added support for conditional scopes through CSV\_SCOPED\_TIMING\_STAT\_CONDITIONAL Macro.
    
-   Deprecated FPlatformSplash::SetSplashText overload that takes a const TCHAR\* - Use FText instead
    

### Framework

#### AI Debugging

**API Change:**

-   Added a variant of UE\_VLOG\_ARROW where the size of the arrow head can be specified
    
-   Added wire variants of UE\_VLOG\_CIRCLE
    
-   Added FarClippingDistance to FDebugRenderSceneProxy in order to be able to control, per-primitive component using such render proxies, the clipping distance of all debug renders made by a FDebugRenderSceneProxy
    

#### AI State Tree

**API Change:**

-   If you mirror the enum in your code, make sure the new values match yours.
    
-   The behavior is enabled from the cvar StateTree.Compiler.EnableBindingSelectionNodeToInstanceData
    
-   TStateTreeInstanceDataStructRef will be deprecated in 5.7 in favor of the weak context.
    
-   The state ticking order changed. Use StateTree.TickGlobalNodesWithHierarchy to help migrate to the new behavior.
    
    -   You can revert to the previous behavior with the cvar StateTree.GlobalTasksCompleteOwningFrame.
        

**Upgrade Notes:**

-   Behavior was wrongly introduced in 5.5. Rollback to previous behavior.
    

#### Audio

**Upgrade Notes:**

-   For existing subtitles attached to SoundWaves, they can be migrated to the new format using the Editor Asset Utility Action:
    
    1.  Select relevant SoundWaves and right click.
        
    2.  Highlight "Scripted Asset Actions" and select "Create Subtitle."
        
    3.  If the new data is satisfactory, the old data can be deleted with the "Remove Legacy Subtitles" asset action.
        
-   Subtitles displayed through DialogueWaves do not need an asset migration. The cvar "au.UseNewSubtitles" can be set to 1 to direct them to use the plugin's display system.
    

**Programming Upgrade Notes:**

-   If you have many nodes with use deprecated code paths, you can use UE\_METASOUND\_DISABLE\_5\_6\_NODE\_REGISTRATION\_DEPRECATION\_WARNINGS=1 to temporarily disable the deprecation warnings.
    

#### Gameplay

**API Change:**

-   You can still reenter it if desired, just set bShouldNextModeReenter to true.
    
-   Defaulted to old behavior. No upgrade required.
    

**API Change:**

-   It is preferable to use/override DoesAbilitySatisfyTagRequirements as AreAbilityTagsBlocked is not a strong enough indication if you can use an Ability or not.
    
-   You must opt-in to this feature by enabling CVar AbilitySystem.ReplicateCancelOnRemove.
    
-   CVar: s.DelayOnActorSpawnedUntilFinishedSpawning. Default is TRUE to use new (fixed) behavior.
    

#### Mass

**API Change:**

-   This is an optional simplified API. The existing API will continue to be supported.
    

#### Networking

**API Change:**

-   Example of configuring a class in DefaultEngine.ini to ensure on if it's no longer fully push based:
    
    -   \[/Script/IrisCore.ReplicationStateDescriptorConfig\]+EnsureFullyPushModelClassNames=(ClassName=StaticMeshComponent)
        
-   UReplicationSystem::GetDelegates() returns a reference to an instance of a class containing all public delegates. Currently there's OnConnectionAdded() and OnConnectionRemoved().
    
-   UNetConnection::GetConnectionId() and UNetConnection::GetParentConnectionId() have been deprecated. Use UNetConnection::GetConnectionHandle() instead to retrieve the relevant connection ID information.
    

### Level Design and Art Tools

#### Landscape

**API Change:**

-   Added debug names to renderer states, in order to help debugging
    
-   Removed unused and not-publicly exposed Affects function on FLandscapeLayerBrushTarget layers are now handled as bit arrays almost all the way through when using batched merge.
    
-   The FRenderMergeContext now inherits from FMergeContext, which is setup at the very beginning of the pipe (i.e. before preparing the merge render context).
    
    -   FMergeContext is immutable and contains all the target layer names/layer info objects and is passed along to all renderer states/render items, so that they can use it to declare their target layer usage, render groups, etc. as bit arrays, rather than TSet
        
    -   This makes masking / intersecting the render states trivial, which is where a good chunk of the the batched merge preparation time was spent
        
    -   Thanks to this, we now skip heightmap-only renderers and render items in weightmap merges (and vice versa), which also reduces preparation timeNote that RenderLayer and the "on batch rendered" callback relate to a given batch, which is only concerned by a subset of the target layers and allocate a 2D array render target whose slice count is the number of layers needed for that batch (in other words, the slice index doesn't correspond to a target layer index in the merge context).
        
    -   To make that more plain, those functions still deal with FNames for target layers, instead of a bit array of the layers in FMergeContext. If it proves too confusing, that could easily be changed
        
-   This change introduces a generic FRDGBuilderRecorder which is a "RDG-based render command recorder" that can be used in a similar fashion to standard render commands, except that the recorded commands are run on the render thread, using a single render command / FRDGBuilder.
    
    -   It has 2 modes :
        
        -   Immediate (issues render commands as soon as they're enqueued)
            
        -   Recording (records the commands until Flush is called, a render command is then issued and all recorded command, executed)
            
    -   RDG\_RENDER\_COMMAND\_RECORDER\_BREADCRUMB\_EVENT can be used to tag the recorded commands appropriately into single entry
        
    -   It can enqueue RDG-based commands or standard render commands
        
    -   RDG-based commands also support being passed a list of external textures with the RHIAccess they should have when executing the FRDGBuilder. This is to prevent the RDG from auto-transitioning to SRVMask at the end
        
    -   Landscape edit layer renderers can now return render flags. RenderMode\_Recorded tells the merge algorithm it supports FRDGBuilderRecorder while RenderMode\_Immediate requires all previous recorded commands to be flushed and will therefore enqueue one or several standard render commands.
        
    -   Currently only BP brushes (and a special case in landscape patches) requires this, which means a landscape with no such brush can run within a single FDGBuilder command
        
-   Split landscape edit layer batched merge code into several smaller files
    
-   Deprecate LandscapeProxy OnMaterialChanged event for new event in the Landscape subsystem
    
-   Details:
    
    -   All heightmap and weightmap renderers can now return their height/weight value (16 bits) as well as an alpha value (14 bits) and alpha flags (2 bits)
        
    -   Edit layer renderers can now implement one of the following functions :
        
        -   BlendLayer, called if ERenderFlags::BlendMode\_SeparateBlend is returned by GetRenderFlags. In this case, each RenderLayer is followed by a BlendLayer.
            
        -   CanGroupRenderLayerWith, called if ERenderFlags::RenderLayerGroup\_SupportsGrouping is returned by GetRenderFlags : indicates that the renderer's RenderLayer can be followed by another one (instead of RenderLayer/BlendLayer/RenderLayer/...)
            
        -   BeginRenderLayerGroup / EndRenderLayerGroup, also called if ERenderFlags::RenderLayerGroup\_SupportsGrouping is returned by GetRenderFlags : called at the beginning end of a series of RenderLayer calls (i.e. BeginRenderLayerGroup/RenderLayer/RenderLayer/.../ EndRenderLayerGroup/BlendLayer) : this allows to coalesce several successive renders
            
    -   RenderLayer now returns a value to indicate whether anything was actually rendered (avoids calling BlendLayer if nothing was actually rendered by a renderer)
        
    -   FMergeRenderContext now has a GenericBlendLayer method that can be used by any renderer (in a BlendLayer render step)
        
    -   UE::Landscape::EditLayers::EHeightmapBlendMode/EWeightmapBlendMode/FWeightmapPaintLayerInfo are for batched merge while EEditLayerHeightmapBlendMode/EEditLayerWeightmapBlendMode/FLandscapeEditLayerWeightmapPaintLayerInfo are now deprecated (only used by local merge)
        
    -   FMergeRenderContext now has a blackboard system where anyone at any point can add/remove blackboard items, in order to let successive renderers communicate information (unused at the moment, but the goal is to let render groups batch successive draws into a single one)
        
-   Refactored landscape events for heightmap streaming and landscape component data changes : they are now located on the subsystem.
    
    -   That simplifies the registration/unregistration process so that users don't have to monitor add/removal of actors, etc. The downside is that they will receive the event for any landscape actor change instead of just one.
        
    -   With the current use cases (PCG, water), this is not a problem since most systems want to watch changes coming from any landscape, not a particular one (and they can still check the originating landscape in the event params for this).
        
    -   The water zone actor is now responsible for reacting to landscape changes instead of the water subsystem. This has the advantage that water zones that we don't needlessly invalidate water zones that don't use bAutoIncludeLandscapesAsTerrain whenever landscape updates
        
    -   For backwards compatibility reasons, the option is set to true by default, although it's not the best option. This ensures that the water brush, in particular, is perfectly aligned when running with batched merge vs. global merge
        

-   Use defensive attitude towards unloaded landscape info (weak object ptr returning null, likely on unload), across minor landscape tools, like it was already done on most landscape tool brushes
    
-   Speculative crash fix in landscape ramp tool when the sprite texture resource isn't ready while drawing (let the AddSprite method handle the texture size, when the texture resource is invalid)
    
-   The code was incorrectly detecting, upon registration of the landscape proxy (for those that hadn't gone through PostLoad), that it went from non-edit layers to edit layers mode and, as a result, was copying the final heightmap/weightmap data to the default (first) edit layer
    

#### Procedural

**Upgrade Notes:**

-   Previously created data will have its surface sampler nodes with the legacy grid creation scheme, so nothing is needed.
    
-   This change could break the "Set Members In Struct" on PCG Tagged Data objects in blueprint.
    
-   New maps will not have their PCG landscape cache enabled by default, which means that in cooked builds/PIE generation at runtime will not work if relying on the landscape (from CPU) unless it is enabled. Errors are logged to help out understanding of this too.
    

Programming Upgrade Notes:

-   Existing code that relies on UPCGPointData should be updated to UPCGBasePointData to support this new point data format.
    
-   PCG specific code relying on the UPCGComponent::GetGeneratedGraphOutput() expecting that Point Data will be of type UPCGPointData. You can use this CVar pcg.Advanced.ConvertToPointDataInPostProcessGraph so that internally the new UPCGPointArrayData is still used but a conversion to UPCGPointData happens when storing the output in the component. This should only be necessary until your code is updated to support UPCGBasePointData which is the base class of both the old and the new Point Data
    

#### World Building

**Upgrade Notes:**

-   You just have to create a new node (don't copy or duplicate it) for the warning to go away.
    

### Mobile Rendering

#### Mobile Materials

**API Change:**

-   Mobile deferred uses octahedral encoding for normals which can't blend.
    

### Motion Design

**Upgrade Notes:**

-   Made additional adjustment to Motion Design default levels.
    
-   Removed Unnecessary Asset for Motion Design Template
    
-   Updated default Motion Design Template Levels
    

### Online

**Upgrade Notes:**

-   When searching for LAN sessions, if the user is hosting one, it will now be included in the search results. The hosted LAN session will be paused while the search is executing.
    

### Platform

**Upgrade Notes:**

-   Replace any module dependencies on "PlatformCryptoOpenSSL" with "PlatformCryptoContext".
    

#### Linux

**API Change:**

-   Add this to your game's Target.cs:MinArm64CpuTarget = Arm64TargetCpuType.Graviton2;For Graviton3, when compiling with LTO or PGO we have discovered codegen bugs on Clang 18.1.x that you can workaround by adding this code to Target.cs:GlobalDefinitions.Add("UE\_WORKAROUND\_CLANG\_SVE\_LTO\_BUGS=1");
    

#### Windows

**API Change:**

-   See WindowsProjectGenerator.cs for further details on how to set up and use the experimental remote debugging support.
    

#### XR

**API Change:**

-   This change includes numerous XR-related API changes and deprecations:
    
    -   IXRTrackingSystemOnBeginRendering\_RenderThread(FRHICommandListImmediate& RHICmdList, FSceneViewFamily& ViewFamily) has been deprecated. Use the overload OnBeginRendering\_RenderThread(FRDGBuilder& GraphBuilder, FSceneViewFamily& ViewFamily) instead.
        
    -   OnBeginRendering\_GameThread() has been deprecated. Use the overload OnBeginRendering\_GameThread(FSceneViewFamily& InViewFamily) instead.
        
    -   OnLateUpdateApplied\_RenderThread(FRHICommandListImmediate& RHICmdList, const FTransform& NewRelativeTransform) has been deprecated. Use the overload OnLateUpdateApplied\_RenderThread(FRDGBuilder& GraphBuilder, const FTransform& NewRelativeTransform) instead.
        
    -   IXRLoadingScreenShowLoadingScreen\_Compat() has been deprecated and will no longer function. Use IXRLoadingScreen::AddSplash instead.
        
    -   IStereoLayersUpdateSplashScreen() has been deprecated and will no longer function. Use IXRLoadingScreen::AddSplash instead.
        
    -   GetAllocatedTexture(uint32 LayerId, FTextureRHIRef &Texture, FTextureRHIRef &LeftTexture) has been deprecated. Implement GetDebugLayerTextures\_RenderThread instead.
        
    -   TStereoLayerManagerTStereoLayerManager and its methods CopyLayers, CopySortedLayers, and WithLayer have been deprecated. Use FSimpleLayerManager and its methods ForEachLayer and FindLayerDesc instead.
        
    -   The StereoLayerManager.h static helper functions GetLayerDescMember, SetLayerDescMember, and MarkLayerTextureForUpdate have been deprecated. Use FSimpleLayerManager methods instead.
        
    -   ISpectatorScreenControllerQueueDebugCanvasLayerID(int32 LayerID) has been deprecated and will no longer function. To add a layer to the debug canvas, create it with flag IStereoLayers::LAYER\_FLAG\_DEBUG instead.
        
    -   IStereoRenderingRenderTexture\_RenderThread(class FRHICommandListImmediate& RHICmdList, class FRHITexture\* BackBuffer, class FRHITexture\* SrcTexture, FVector2D WindowSize) has been deprecated. Use the overload RenderTexture\_RenderThread(class FRDGBuilder& GraphBuilder, FRDGTextureRef BackBuffer, FRDGTextureRef SrcTexture, FVector2f WindowSize) instead.
        
    -   IOpenXRExtensionPluginOnBeginRendering\_GameThread(XrSession InSession) has been deprecated. Use the overload OnBeginRendering\_GameThread(XrSession InSession, FSceneViewFamily& InViewFamily, TArrayView VisibleLayers) instead.
        
    -   OnBeginRendering\_RenderThread(XrSession InSession) has been deprecated. Use the overload OnBeginRendering\_RenderThread(XrSession InSession, FRDGBuilder& GraphBuilder) instead.
        
    -   OnSetupLayers\_RenderThread has been deprecated. Use the Layer IDs passed into OnBeginRendering\_GameThread instead, or use OnBeginRendering\_RenderThread for a callback at this time.
        
    -   UpdateCompositionLayers(XrSession InSession, TArray& Headers) has been deprecated. Use the overload UpdateCompositionLayers\_RHIThread(XrSession InSession, TArray& Headers) instead.
        
    -   OnEndProjectionLayer has been deprecated. Use OnEndProjectionLayer\_RHIThread instead.
        
    -   FDebugCanvasDrawerReleaseResources() has been deprecated as FDebugCanvasDrawer no longer directly manages rendering resources. Call FDebugCanvasDrawer::ReleaseInternalTexture() from the game thread instead.
        
    -   FHeadMountedDisplayBaseGetFullFlatEyeRect\_RenderThread(FTextureRHIRef EyeTexture) has been deprecated. Use the overload GetFullFlatEyeRect\_RenderThread(const FRHITextureDesc& EyeTexture) instead.
        
    -   CopyTexture\_RenderThread has been deprecated. Call AddXRCopyTexturePass, defined in XRCopyTexture.h, instead.
        
    -   FOpenXRHMDThe FOpenXRHMD field VisibleLayerIds\_RenderThread has been deprecated, and will be removed when OnSetupLayers\_RenderThread is removed.
        
    -   FDefaultSpectatorScreenControllerBeginRenderViewFamily() has been deprecated and will no longer function. Use the overload BeginRenderViewFamily(FSceneViewFamily& ViewFamily) instead.
        
    -   GetSpectatorScreenRenderDelegate\_RenderThread has been deprecated. Override RenderSpectatorScreen\_RenderThread instead.
        
    -   UpdateSpectatorScreenMode\_RenderThread has been deprecated. Override AddSpectatorModePass instead.
        
    -   RenderSpectatorScreen\_RenderThread(FRHICommandListImmediate& RHICmdList, FRHITexture\* BackBuffer, FTextureRHIRef SrcTexture, FVector2D WindowSize) and RenderSpectatorScreen\_RenderThread(FRHICommandListImmediate& RHICmdList, FRHITexture\* BackBuffer, FTextureRHIRef SrcTexture, FTextureRHIRef LayersTexture, FVector2D WindowSize) have been deprecated. Use the overload RenderSpectatorScreen\_RenderThread(class FRDGBuilder& GraphBuilder, FRDGTextureRef BackBuffer, FRDGTextureRef SrcTexture, FRDGTextureRef LayersTexture, FVector2f WindowSize) instead.
        
    -   The following have been deprecated, to adjust mode behavior instead override AddSpectatorModePass:
        
        -   RenderSpectatorModeSingleEyeLetterboxed
            
        -   RenderSpectatorModeUndistorted
            
        -   RenderSpectatorModeDistorted
            
        -   RenderSpectatorModeSingleEye
            
        -   RenderSpectatorModeTexture
            
        -   RenderSpectatorModeMirrorAndTexture
            
        -   RenderSpectatorModeSingleEyeCroppedToFill
            
    -   The following have been deprecated and will no longer function:
        
        -   SetSpectatorScreenTextureRenderCommand
            
        -   SetSpectatorScreenTexture\_RenderThread
            
        -   SetSpectatorScreenModeTexturePlusEyeLayoutRenderCommand
            
        -   SetSpectatorScreenModeTexturePlusEyeLayout\_RenderThread.
            
    -   GetFallbackRHITexture() has been deprecated. Use the overload GetFallbackRDGTexture(FRDGBuilder& GraphBuilder) instead.
        
    -   The fields DelegateSpectatorScreenMode\_RenderThread and DebugCanvasLayerIDs have been deprecated. Override AddSpectatorModePass and check for IStereoLayers::LAYER\_FLAG\_DEBUG instead, respectively.
        
    -   CopyEmulatedLayers(FRHICommandListImmediate& RHICmdList, FTextureRHIRef TargetTexture, const FIntRect SrcRect, const FIntRect DstRect) has been deprecated. Use the overload CopyEmulatedLayers(FRDGBuilder& GraphBuilder, FRDGTextureRef TargetTexture, const FIntRect SrcRect, const FIntRect DstRect) instead.
        
-   The GetLocalLightData and GetForwardLightData HLSL functions found in LightGridCommon.ush have been updated, and their "non-stereo" variants have been removed. GetLocalLightData and GetForwardLightData are now both used to index into the ForwardLightBuffer directly by light index, while GetLocalLightDataFromGrid and GetForwardLightDataFromGrid first retrieve a light index from the CulledLightDataGrid. For "non-stereo" rendering, pass a 0 for the EyeIndex.
    

### Platform Mobile

#### Android

**API Change:**

-   BSaveSymbols is now honored, instead of before being forced to true during the build process.
    
-   To support 16kb page size on upcoming Android OS versions the memory mapped files should expect 16kb page size alignment, in 5.6 FAndroidPlatformProperties::GetMemoryMappingAlignment was changed from 4kb to 16kb to accommodate this.
    
-   This may break getting symbols with tools like dump\_syms if they don't support compressed debug symbols.
    
-   If saving symbols is needed, set bSaveSymbols to true under /Script/AndroidRuntimeSettings.AndroidRuntimeSettings.
    

#### iOS, tvOS, and iPadOS

**API Change:**

-   Now UE page mappings will show in XCode Instruments as "Memory Tag 240", 241, 242, corresponding to different ways UE allocates pages from OS, see ApplePlatformMemory.cpp for more details.
    
    -   It's also possible to track all UE allocations in XCode Instruments by setting USE\_APPLE\_SUPPORT\_INSTRUMENTED\_ALLOCS define in non-shipping builds in ApplePlatformMemory.cpp. It has non-trivial runtime costs so only use it for debugging.
        

### Virtual Production

#### NDisplay

**Upgrade Notes:**

-   Upgraded nDisplay failover subsystem in order to support primary node loss.
    

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [新内容](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#what-s-new)
-   [渲染](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%B8%B2%E6%9F%93)
-   [Lumen硬件光线追踪优化](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#lumen%E7%A1%AC%E4%BB%B6%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA%E4%BC%98%E5%8C%96)
-   [RHI - 渲染器并行化](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#rhi-%E6%B8%B2%E6%9F%93%E5%99%A8%E5%B9%B6%E8%A1%8C%E5%8C%96)
-   [RHI - 无绑定资源](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#rhi-%E6%97%A0%E7%BB%91%E5%AE%9A%E8%B5%84%E6%BA%90)
-   [Niagara异类体积](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#niagara%E5%BC%82%E7%B1%BB%E4%BD%93%E7%A7%AF)
-   [虚拟阴影贴图优化](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E8%99%9A%E6%8B%9F%E9%98%B4%E5%BD%B1%E8%B4%B4%E5%9B%BE%E4%BC%98%E5%8C%96)
-   [Substrate材质（Beta测试版）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#substrate%E6%9D%90%E8%B4%A8%EF%BC%88beta%E6%B5%8B%E8%AF%95%E7%89%88%EF%BC%89)
-   [第一人称渲染（Beta测试版）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E7%AC%AC%E4%B8%80%E4%BA%BA%E7%A7%B0%E6%B8%B2%E6%9F%93%EF%BC%88beta%E6%B5%8B%E8%AF%95%E7%89%88%EF%BC%89)
-   [景深 - Petzval散景](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%99%AF%E6%B7%B1-petzval%E6%95%A3%E6%99%AF)
-   [GPU分析器2.0](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#gpu%E5%88%86%E6%9E%90%E5%99%A820)
-   [世界构建](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E4%B8%96%E7%95%8C%E6%9E%84%E5%BB%BA)
-   [快速几何体流送插件（试验性）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%BF%AB%E9%80%9F%E5%87%A0%E4%BD%95%E4%BD%93%E6%B5%81%E9%80%81%E6%8F%92%E4%BB%B6%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [流送性能（试验性）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%B5%81%E9%80%81%E6%80%A7%E8%83%BD%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [世界书签](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E4%B8%96%E7%95%8C%E4%B9%A6%E7%AD%BE)
-   [子世界分区HLOD](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%AD%90%E4%B8%96%E7%95%8C%E5%88%86%E5%8C%BAhlod)
-   [地形 - 分批合并](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%9C%B0%E5%BD%A2-%E5%88%86%E6%89%B9%E5%90%88%E5%B9%B6)
-   [地形 - 关卡实例和数据层支持](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%9C%B0%E5%BD%A2-%E5%85%B3%E5%8D%A1%E5%AE%9E%E4%BE%8B%E5%92%8C%E6%95%B0%E6%8D%AE%E5%B1%82%E6%94%AF%E6%8C%81)
-   [天穹（Celestial Vault）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%A4%A9%E7%A9%B9%EF%BC%88celestialvault%EF%BC%89)
-   [角色和动画](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#character-and-animation)
-   [Sequencer整理](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#sequencer%E6%95%B4%E7%90%86)
-   [过场动画的无缝Gameplay过渡（试验性）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E8%BF%87%E5%9C%BA%E5%8A%A8%E7%94%BB%E7%9A%84%E6%97%A0%E7%BC%9Dgameplay%E8%BF%87%E6%B8%A1%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [Sequencer中的Gameplay摄像机整合（试验性）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#sequencer%E4%B8%AD%E7%9A%84gameplay%E6%91%84%E5%83%8F%E6%9C%BA%E6%95%B4%E5%90%88%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [Sequencer的相对时间缩放（试验性）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#sequencer%E7%9A%84%E7%9B%B8%E5%AF%B9%E6%97%B6%E9%97%B4%E7%BC%A9%E6%94%BE%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [重定向操作堆栈](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E9%87%8D%E5%AE%9A%E5%90%91%E6%93%8D%E4%BD%9C%E5%A0%86%E6%A0%88)
-   [Tween工具](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#tween%E5%B7%A5%E5%85%B7)
-   [运动尾迹](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E8%BF%90%E5%8A%A8%E5%B0%BE%E8%BF%B9)
-   [Sequencer曲线](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#sequencer%E6%9B%B2%E7%BA%BF)
-   [动画修复和更新](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%8A%A8%E7%94%BB%E4%BF%AE%E5%A4%8D%E5%92%8C%E6%9B%B4%E6%96%B0)
-   [按比例缩放了重定向](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%8C%89%E6%AF%94%E4%BE%8B%E7%BC%A9%E6%94%BE%E4%BA%86%E9%87%8D%E5%AE%9A%E5%90%91)
-   [控制绑定的物理效果（试验性）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%8E%A7%E5%88%B6%E7%BB%91%E5%AE%9A%E7%9A%84%E7%89%A9%E7%90%86%E6%95%88%E6%9E%9C%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [塑造变形形状](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%A1%91%E9%80%A0%E5%8F%98%E5%BD%A2%E5%BD%A2%E7%8A%B6)
-   [几何体缓存](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%87%A0%E4%BD%95%E4%BD%93%E7%BC%93%E5%AD%98)
-   [绑定运动器（试验性）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E7%BB%91%E5%AE%9A%E8%BF%90%E5%8A%A8%E5%99%A8%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [Mutable自定义宏库和流送](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#mutable%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AE%8F%E5%BA%93%E5%92%8C%E6%B5%81%E9%80%81)
-   [MetaHuman](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#metahuman)
-   [MetaHuman Creator](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#metahumancreator)
-   [MetaHuman Animator](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#metahumananimator)
-   [MetaHuman捕捉](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#metahuman%E6%8D%95%E6%8D%89)
-   [Fab上的MetaHuman](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#fab%E4%B8%8A%E7%9A%84metahuman)
-   [Maya版MetaHuman](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#maya%E7%89%88metahuman)
-   [Houdini版MetaHuman](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#houdini%E7%89%88metahuman)
-   [编辑器和UI系统](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E7%BC%96%E8%BE%91%E5%99%A8%E5%92%8Cui%E7%B3%BB%E7%BB%9F)
-   [内容浏览器](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%86%85%E5%AE%B9%E6%B5%8F%E8%A7%88%E5%99%A8)
-   [视口工具栏导航](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E8%A7%86%E5%8F%A3%E5%B7%A5%E5%85%B7%E6%A0%8F%E5%AF%BC%E8%88%AA)
-   [开发者迭代](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%BC%80%E5%8F%91%E8%80%85%E8%BF%AD%E4%BB%A3)
-   [增量烘焙（试验性）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%A2%9E%E9%87%8F%E7%83%98%E7%84%99%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [UBA缓存服务器（试验性）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#uba%E7%BC%93%E5%AD%98%E6%9C%8D%E5%8A%A1%E5%99%A8%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [Zen服务器：烘焙输出存储](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#zen%E6%9C%8D%E5%8A%A1%E5%99%A8%EF%BC%9A%E7%83%98%E7%84%99%E8%BE%93%E5%87%BA%E5%AD%98%E5%82%A8)
-   [Zen服务器 - 流送至目标平台（Beta测试版）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#zen%E6%9C%8D%E5%8A%A1%E5%99%A8-%E6%B5%81%E9%80%81%E8%87%B3%E7%9B%AE%E6%A0%87%E5%B9%B3%E5%8F%B0%EF%BC%88beta%E6%B5%8B%E8%AF%95%E7%89%88%EF%BC%89)
-   [新版项目启动程序UI（Beta测试版）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%96%B0%E7%89%88%E9%A1%B9%E7%9B%AE%E5%90%AF%E5%8A%A8%E7%A8%8B%E5%BA%8Fui%EF%BC%88beta%E6%B5%8B%E8%AF%95%E7%89%88%EF%BC%89)
-   [Zen服务器：快照（Beta测试版）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#zen%E6%9C%8D%E5%8A%A1%E5%99%A8%EF%BC%9A%E5%BF%AB%E7%85%A7%EF%BC%88beta%E6%B5%8B%E8%AF%95%E7%89%88%EF%BC%89)
-   [macOS和Linux上的UBA着色器编译](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#macos%E5%92%8Clinux%E4%B8%8A%E7%9A%84uba%E7%9D%80%E8%89%B2%E5%99%A8%E7%BC%96%E8%AF%91)
-   [程序化内容生成（PCG）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E7%A8%8B%E5%BA%8F%E5%8C%96%E5%86%85%E5%AE%B9%E7%94%9F%E6%88%90%EF%BC%88pcg%EF%BC%89)
-   [GPU草和微散射](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#gpu%E8%8D%89%E5%92%8C%E5%BE%AE%E6%95%A3%E5%B0%84)
-   [GPU计算性能](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#gpu%E8%AE%A1%E7%AE%97%E6%80%A7%E8%83%BD)
-   [GPU分层生成](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#gpu%E5%88%86%E5%B1%82%E7%94%9F%E6%88%90)
-   [GPU数据接口](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#gpu%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3)
-   [纹理（读/写）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E7%BA%B9%E7%90%86%EF%BC%88%E8%AF%BB/%E5%86%99%EF%BC%89)
-   [静态网格体](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [运行时虚拟纹理（RVT）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E8%BF%90%E8%A1%8C%E6%97%B6%E8%99%9A%E6%8B%9F%E7%BA%B9%E7%90%86%EF%BC%88rvt%EF%BC%89)
-   [地形RVT和草地贴图](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%9C%B0%E5%BD%A2rvt%E5%92%8C%E8%8D%89%E5%9C%B0%E8%B4%B4%E5%9B%BE)
-   [点数据 - 数组结构](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E7%82%B9%E6%95%B0%E6%8D%AE-%E6%95%B0%E7%BB%84%E7%BB%93%E6%9E%84)
-   [执行效率](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%89%A7%E8%A1%8C%E6%95%88%E7%8E%87)
-   [群系核心V2插件（试验性）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E7%BE%A4%E7%B3%BB%E6%A0%B8%E5%BF%83v2%E6%8F%92%E4%BB%B6%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [元数据域](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%85%83%E6%95%B0%E6%8D%AE%E5%9F%9F)
-   [元数据域](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%85%83%E6%95%B0%E6%8D%AE%E5%9F%9F-2)
-   [样条线 - 属性和特性](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%A0%B7%E6%9D%A1%E7%BA%BF-%E5%B1%9E%E6%80%A7%E5%92%8C%E7%89%B9%E6%80%A7)
-   [图表参数UX](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%9B%BE%E8%A1%A8%E5%8F%82%E6%95%B0ux)
-   [内联常量](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%86%85%E8%81%94%E5%B8%B8%E9%87%8F)
-   [预览视口](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E9%A2%84%E8%A7%88%E8%A7%86%E5%8F%A3)
-   [调试工作流程](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E8%B0%83%E8%AF%95%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
-   [模板图表](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%A8%A1%E6%9D%BF%E5%9B%BE%E8%A1%A8)
-   [图表自定义](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%9B%BE%E8%A1%A8%E8%87%AA%E5%AE%9A%E4%B9%89)
-   [显式执行依赖项](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%98%BE%E5%BC%8F%E6%89%A7%E8%A1%8C%E4%BE%9D%E8%B5%96%E9%A1%B9)
-   [其他节点和运算符](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%85%B6%E4%BB%96%E8%8A%82%E7%82%B9%E5%92%8C%E8%BF%90%E7%AE%97%E7%AC%A6)
-   [实例化Actor交互操作（试验性）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%AE%9E%E4%BE%8B%E5%8C%96actor%E4%BA%A4%E4%BA%92%E6%93%8D%E4%BD%9C%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [虚拟制片](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E8%99%9A%E6%8B%9F%E5%88%B6%E7%89%87)
-   [动捕管理器](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%8A%A8%E6%8D%95%E7%AE%A1%E7%90%86%E5%99%A8)
-   [捕获管理器](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%8D%95%E8%8E%B7%E7%AE%A1%E7%90%86%E5%99%A8)
-   [用户可定义的命名标记](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E7%94%A8%E6%88%B7%E5%8F%AF%E5%AE%9A%E4%B9%89%E7%9A%84%E5%91%BD%E5%90%8D%E6%A0%87%E8%AE%B0)
-   [制片向导](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%88%B6%E7%89%87%E5%90%91%E5%AF%BC)
-   [使用过场动画汇编工具进行镜头管理](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E4%BD%BF%E7%94%A8%E8%BF%87%E5%9C%BA%E5%8A%A8%E7%94%BB%E6%B1%87%E7%BC%96%E5%B7%A5%E5%85%B7%E8%BF%9B%E8%A1%8C%E9%95%9C%E5%A4%B4%E7%AE%A1%E7%90%86)
-   [自定义镜头试拍录制器标记](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%95%9C%E5%A4%B4%E8%AF%95%E6%8B%8D%E5%BD%95%E5%88%B6%E5%99%A8%E6%A0%87%E8%AE%B0)
-   [镜头试拍录制器子系统](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E9%95%9C%E5%A4%B4%E8%AF%95%E6%8B%8D%E5%BD%95%E5%88%B6%E5%99%A8%E5%AD%90%E7%B3%BB%E7%BB%9F)
-   [Nvidia DLSS对nDisplay的支持](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#nvidiadlss%E5%AF%B9ndisplay%E7%9A%84%E6%94%AF%E6%8C%81)
-   [nDisplay主节点故障转移](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#ndisplay%E4%B8%BB%E8%8A%82%E7%82%B9%E6%95%85%E9%9A%9C%E8%BD%AC%E7%A7%BB)
-   [将虚拟摄像机录制为过场动画摄像机](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%B0%86%E8%99%9A%E6%8B%9F%E6%91%84%E5%83%8F%E6%9C%BA%E5%BD%95%E5%88%B6%E4%B8%BA%E8%BF%87%E5%9C%BA%E5%8A%A8%E7%94%BB%E6%91%84%E5%83%8F%E6%9C%BA)
-   [Live Link OpenTrackIO](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#livelinkopentrackio)
-   [动态设计](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#motion-design)
-   [克隆器和效果器](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%85%8B%E9%9A%86%E5%99%A8%E5%92%8C%E6%95%88%E6%9E%9C%E5%99%A8)
-   [PSD图层导入](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#psd%E5%9B%BE%E5%B1%82%E5%AF%BC%E5%85%A5)
-   [广播和现场活动的数据支持](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%B9%BF%E6%92%AD%E5%92%8C%E7%8E%B0%E5%9C%BA%E6%B4%BB%E5%8A%A8%E7%9A%84%E6%95%B0%E6%8D%AE%E6%94%AF%E6%8C%81)
-   [材质设计器媒体层](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%9D%90%E8%B4%A8%E8%AE%BE%E8%AE%A1%E5%99%A8%E5%AA%92%E4%BD%93%E5%B1%82)
-   [动态设计场景状态](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%8A%A8%E6%80%81%E8%AE%BE%E8%AE%A1%E5%9C%BA%E6%99%AF%E7%8A%B6%E6%80%81)
-   [模拟和视觉特效处理](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#simulation-and-vfx)
-   [Niagara LWC图块更新模式](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#niagaralwc%E5%9B%BE%E5%9D%97%E6%9B%B4%E6%96%B0%E6%A8%A1%E5%BC%8F)
-   [最优化Niagara系统编译](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%9C%80%E4%BC%98%E5%8C%96niagara%E7%B3%BB%E7%BB%9F%E7%BC%96%E8%AF%91)
-   [Chaos核心](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#chaos%E6%A0%B8%E5%BF%83)
-   [Chaos布料](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#chaos%E5%B8%83%E6%96%99)
-   [Chaos Flesh](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#chaosflesh)
-   [Chaos可视调试器](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#chaos%E5%8F%AF%E8%A7%86%E8%B0%83%E8%AF%95%E5%99%A8)
-   [Chaos数据流编辑器](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#chaos%E6%95%B0%E6%8D%AE%E6%B5%81%E7%BC%96%E8%BE%91%E5%99%A8)
-   [Chaos破坏系统](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#chaos%E7%A0%B4%E5%9D%8F%E7%B3%BB%E7%BB%9F)
-   [Chaos毛发](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#chaos%E6%AF%9B%E5%8F%91)
-   [平台](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#platform)
-   [Android模拟器集成](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#android%E6%A8%A1%E6%8B%9F%E5%99%A8%E9%9B%86%E6%88%90)
-   [针对60Hz的最优化设备描述](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E9%92%88%E5%AF%B960hz%E7%9A%84%E6%9C%80%E4%BC%98%E5%8C%96%E8%AE%BE%E5%A4%87%E6%8F%8F%E8%BF%B0)
-   [OpenXR 1.1](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#openxr11)
-   [Adreno快速遮蔽模式](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#adreno%E5%BF%AB%E9%80%9F%E9%81%AE%E8%94%BD%E6%A8%A1%E5%BC%8F)
-   [对ARCore Vulkan的支持](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%AF%B9arcorevulkan%E7%9A%84%E6%94%AF%E6%8C%81)
-   [编辑器内平台预览](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E7%BC%96%E8%BE%91%E5%99%A8%E5%86%85%E5%B9%B3%E5%8F%B0%E9%A2%84%E8%A7%88)
-   [移动渲染](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E7%A7%BB%E5%8A%A8%E6%B8%B2%E6%9F%93)
-   [OpenXR直通](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#openxr%E7%9B%B4%E9%80%9A)
-   [过场动画XR摄像机平滑](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E8%BF%87%E5%9C%BA%E5%8A%A8%E7%94%BBxr%E6%91%84%E5%83%8F%E6%9C%BA%E5%B9%B3%E6%BB%91)
-   [Insights资产内存分析（试验性）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#insights%E8%B5%84%E4%BA%A7%E5%86%85%E5%AD%98%E5%88%86%E6%9E%90%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [音频](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#audio)
-   [Audio Insights](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#audioinsights)
-   [Sequencer音频拖动](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#sequencer%E9%9F%B3%E9%A2%91%E6%8B%96%E5%8A%A8)
-   [不限声道类型（试验性）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E4%B8%8D%E9%99%90%E5%A3%B0%E9%81%93%E7%B1%BB%E5%9E%8B%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [高声道数量](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E9%AB%98%E5%A3%B0%E9%81%93%E6%95%B0%E9%87%8F)
-   [WASAPI后端实现](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#wasapi%E5%90%8E%E7%AB%AF%E5%AE%9E%E7%8E%B0)
-   [MetaSound节点配置](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#metasound%E8%8A%82%E7%82%B9%E9%85%8D%E7%BD%AE)
-   [音频字幕插件](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E9%9F%B3%E9%A2%91%E5%AD%97%E5%B9%95%E6%8F%92%E4%BB%B6)
-   [MetaSound预设编辑器](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#metasound%E9%A2%84%E8%AE%BE%E7%BC%96%E8%BE%91%E5%99%A8)
-   [音频波形编辑器](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E9%9F%B3%E9%A2%91%E6%B3%A2%E5%BD%A2%E7%BC%96%E8%BE%91%E5%99%A8)
-   [技术音频工具](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%8A%80%E6%9C%AF%E9%9F%B3%E9%A2%91%E5%B7%A5%E5%85%B7)
-   [建模](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#modeling)
-   [纹理工具（Beta测试版）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E7%BA%B9%E7%90%86%E5%B7%A5%E5%85%B7%EF%BC%88beta%E6%B5%8B%E8%AF%95%E7%89%88%EF%BC%89)
-   [几何体脚本](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%87%A0%E4%BD%95%E4%BD%93%E8%84%9A%E6%9C%AC)
-   [内容管线](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#content-pipeline)
-   [使用交换功能导入FBX关卡](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E4%BD%BF%E7%94%A8%E4%BA%A4%E6%8D%A2%E5%8A%9F%E8%83%BD%E5%AF%BC%E5%85%A5fbx%E5%85%B3%E5%8D%A1)
-   [交换工作流程的优化](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E4%BA%A4%E6%8D%A2%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B%E7%9A%84%E4%BC%98%E5%8C%96)
-   [使用交换功能自定义USD资产的导入（试验性）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E4%BD%BF%E7%94%A8%E4%BA%A4%E6%8D%A2%E5%8A%9F%E8%83%BD%E8%87%AA%E5%AE%9A%E4%B9%89usd%E8%B5%84%E4%BA%A7%E7%9A%84%E5%AF%BC%E5%85%A5%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [框架](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#framework)
-   [简化的批量处理器API](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E7%AE%80%E5%8C%96%E7%9A%84%E6%89%B9%E9%87%8F%E5%A4%84%E7%90%86%E5%99%A8api)
-   [移动器插件：AI集成、动画支持和性能优化](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E7%A7%BB%E5%8A%A8%E5%99%A8%E6%8F%92%E4%BB%B6%EF%BC%9Aai%E9%9B%86%E6%88%90%E3%80%81%E5%8A%A8%E7%94%BB%E6%94%AF%E6%8C%81%E5%92%8C%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)
-   [Mass调试器改造](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#mass%E8%B0%83%E8%AF%95%E5%99%A8%E6%94%B9%E9%80%A0)
-   [Mass实体编译器（试验性）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#mass%E5%AE%9E%E4%BD%93%E7%BC%96%E8%AF%91%E5%99%A8%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [Gameplay摄像机（试验性）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#gameplay%E6%91%84%E5%83%8F%E6%9C%BA%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [StateTree任务控制流程](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#statetree%E4%BB%BB%E5%8A%A1%E6%8E%A7%E5%88%B6%E6%B5%81%E7%A8%8B)
-   [Mass导航系统支持（试验性）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#mass%E5%AF%BC%E8%88%AA%E7%B3%BB%E7%BB%9F%E6%94%AF%E6%8C%81%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [StateTree：UX和工作流程优化](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#statetree%EF%BC%9Aux%E5%92%8C%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B%E4%BC%98%E5%8C%96)
-   [StateTree：委托和异步任务支持](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#statetree%EF%BC%9A%E5%A7%94%E6%89%98%E5%92%8C%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E6%94%AF%E6%8C%81)
-   [StateTree定时更新和性能](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#statetree%E5%AE%9A%E6%97%B6%E6%9B%B4%E6%96%B0%E5%92%8C%E6%80%A7%E8%83%BD)
-   [Iris网络系统](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#iris%E7%BD%91%E7%BB%9C%E7%B3%BB%E7%BB%9F)
-   [媒体](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#media)
-   [可停靠的媒体查看器](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%8F%AF%E5%81%9C%E9%9D%A0%E7%9A%84%E5%AA%92%E4%BD%93%E6%9F%A5%E7%9C%8B%E5%99%A8)
-   [Sequencer媒体播放、拖动和循环](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#sequencer%E5%AA%92%E4%BD%93%E6%92%AD%E6%94%BE%E3%80%81%E6%8B%96%E5%8A%A8%E5%92%8C%E5%BE%AA%E7%8E%AF)
-   [媒体IO优化](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%AA%92%E4%BD%93io%E4%BC%98%E5%8C%96)
-   [Electra Protron播放器](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#electraprotron%E6%92%AD%E6%94%BE%E5%99%A8)
-   [NDI输入插件](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#ndi%E8%BE%93%E5%85%A5%E6%8F%92%E4%BB%B6)
-   [制片渲染管线](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#production-rendering-pipeline)
-   [快速渲染](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%BF%AB%E9%80%9F%E6%B8%B2%E6%9F%93)
-   [高分辨率平铺和图表中的全景渲染](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E9%AB%98%E5%88%86%E8%BE%A8%E7%8E%87%E5%B9%B3%E9%93%BA%E5%92%8C%E5%9B%BE%E8%A1%A8%E4%B8%AD%E7%9A%84%E5%85%A8%E6%99%AF%E6%B8%B2%E6%9F%93)
-   [播放渲染输出](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%92%AD%E6%94%BE%E6%B8%B2%E6%9F%93%E8%BE%93%E5%87%BA)
-   [多部件EXR支持](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%A4%9A%E9%83%A8%E4%BB%B6exr%E6%94%AF%E6%8C%81)
-   [H.264影片支持](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#h264%E5%BD%B1%E7%89%87%E6%94%AF%E6%8C%81)
-   [影片渲染图表可用性](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%BD%B1%E7%89%87%E6%B8%B2%E6%9F%93%E5%9B%BE%E8%A1%A8%E5%8F%AF%E7%94%A8%E6%80%A7)
-   [模板变体](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%A8%A1%E6%9D%BF%E5%8F%98%E4%BD%93)
-   [第一人称（First Person）](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E7%AC%AC%E4%B8%80%E4%BA%BA%E7%A7%B0%EF%BC%88firstperson%EF%BC%89)
-   [恐怖游戏](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%81%90%E6%80%96%E6%B8%B8%E6%88%8F)
-   [射击游戏](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%B0%84%E5%87%BB%E6%B8%B8%E6%88%8F)
-   [第三人称](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E7%AC%AC%E4%B8%89%E4%BA%BA%E7%A7%B0)
-   [战斗](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%88%98%E6%96%97)
-   [横版过关游戏](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%A8%AA%E7%89%88%E8%BF%87%E5%85%B3%E6%B8%B8%E6%88%8F)
-   [平台跳跃游戏](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%B9%B3%E5%8F%B0%E8%B7%B3%E8%B7%83%E6%B8%B8%E6%88%8F)
-   [俯视角](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E4%BF%AF%E8%A7%86%E8%A7%92)
-   [策略](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E7%AD%96%E7%95%A5)
-   [双摇杆](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%8F%8C%E6%91%87%E6%9D%86)
-   [载具](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E8%BD%BD%E5%85%B7)
-   [越野](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E8%B6%8A%E9%87%8E)
-   [计时赛](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E8%AE%A1%E6%97%B6%E8%B5%9B)
-   [共享资源](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%85%B1%E4%BA%AB%E8%B5%84%E6%BA%90)
-   [关卡原型设计](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E5%85%B3%E5%8D%A1%E5%8E%9F%E5%9E%8B%E8%AE%BE%E8%AE%A1)
-   [角色](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E8%A7%92%E8%89%B2)
-   [输入](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E8%BE%93%E5%85%A5)
-   [武器](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#%E6%AD%A6%E5%99%A8)
-   [平台SDK升级](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#platform-sdk-upgrades)
-   [版本说明](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#release-notes)
-   [Animation](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#animation)
-   [Animating in Engine](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#animatinginengine)
-   [Character Customization](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#charactercustomization)
-   [Control Rig](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#controlrig)
-   [Deformer Graph](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#deformergraph)
-   [Gameplay](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#gameplay)
-   [IK & Retargeting](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#ik&retargeting)
-   [ML Deformer](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#mldeformer)
-   [Runtime](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#runtime)
-   [Sequencer](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#sequencer)
-   [Skeletal Editing](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#skeletalediting)
-   [Editor](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#editor)
-   [Datasmith](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#datasmith)
-   [Framework](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#framework)
-   [Interchange](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#interchange)
-   [Scripting](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#scripting)
-   [UI](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#ui)
-   [UX](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#ux)
-   [Foundation](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#foundation)
-   [Build](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#build)
-   [Compile Time Improvements](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#compiletimeimprovements)
-   [Core](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#core)
-   [Dev Tools](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#devtools)
-   [Horde](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#horde)
-   [Insights](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#insights)
-   [Unreal Build Accelerator](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#unrealbuildaccelerator)
-   [Framework](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#framework-2)
-   [AI](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#ai)
-   [AI Behavior Trees](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#aibehaviortrees)
-   [AI Debugging](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#aidebugging)
-   [AI EQS](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#aieqs)
-   [AI Navigation](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#ainavigation)
-   [AI Perception](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#aiperception)
-   [AI Smart Objects](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#aismartobjects)
-   [AI State Tree](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#aistatetree)
-   [API](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#api)
-   [Audio](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#audio)
-   [Blueprint](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#blueprint)
-   [Blueprint Compiler](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#blueprintcompiler)
-   [Blueprint Editor](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#blueprinteditor)
-   [Blueprint Runtime](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#blueprintruntime)
-   [Gameplay](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#gameplay-2)
-   [Mass](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#mass)
-   [Networking](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#networking)
-   [Learning Resources](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#learningresources)
-   [Sample Content](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#samplecontent)
-   [Level Design and Art Tools](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#leveldesignandarttools)
-   [Geometry Core](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#geometrycore)
-   [Geometry Script](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#geometryscript)
-   [Landscape](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#landscape)
-   [Modeling Tools](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#modelingtools)
-   [Procedural](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#procedural)
-   [Texturing Tools](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#texturingtools)
-   [UV Editor](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#uveditor)
-   [World Building](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#worldbuilding)
-   [Localization](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#localization)
-   [Media](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#media)
-   [MetaHuman](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#metahuman-2)
-   [Mobile Rendering](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#mobilerendering)
-   [Mobile Lighting](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#mobilelighting)
-   [Mobile Materials](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#mobilematerials)
-   [Motion Design](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#motiondesign)
-   [Movie Render Pipeline](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#movierenderpipeline)
-   [Online](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#online)
-   [Hotfix System](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#hotfixsystem)
-   [HTTP](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#http)
-   [Online Subsystem](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#onlinesubsystem)
-   [Websockets](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#websockets)
-   [XboxLive](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#xboxlive)
-   [Platform](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#platform)
-   [Desktop](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#desktop)
-   [Linux](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#linux)
-   [Mac](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#mac)
-   [Online](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#online-2)
-   [Windows](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#windows)
-   [XR](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#xr)
-   [Platform Mobile](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#platformmobile)
-   [Android](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#android)
-   [iOS, tvOS, and iPadOS](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#ios,tvos,andipados)
-   [Rendering](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#rendering)
-   [Architecture](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#architecture)
-   [Lighting](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#lighting)
-   [Lumen](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#lumen)
-   [Materials and Shaders](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#materialsandshaders)
-   [MegaLights](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#megalights)
-   [Nanite](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#nanite)
-   [Niagara](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#niagara)
-   [Path Tracer](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#pathtracer)
-   [Postprocessing](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#postprocessing)
-   [RHI](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#rhi)
-   [Substrate](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#substrate)
-   [UnrealLightmass](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#unreallightmass)
-   [Simulation](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#simulation)
-   [Physics](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#physics)
-   [Tools](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#tools)
-   [BuildGraph](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#buildgraph)
-   [UGS](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#ugs)
-   [UI](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#ui-2)
-   [Slate](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#slate)
-   [UMG](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#umg)
-   [Virtual Production](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#virtualproduction)
-   [DMX](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#dmx)
-   [Media IO](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#mediaio)
-   [nDisplay](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#ndisplay)
-   [Rendering](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#rendering-2)
-   [Tools](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#tools-2)
-   [更新说明](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#upgrade-notes)
-   [Animation](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#animation-2)
-   [Character Customization](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#charactercustomization-2)
-   [Control Rig](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#controlrig-2)
-   [Deformer Graph](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#deformergraph-2)
-   [ML Deformer](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#mldeformer-2)
-   [Runtime](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#runtime-2)
-   [Sequencer](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#sequencer-2)
-   [Editor](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#editor-2)
-   [UI](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#ui-3)
-   [UX](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#ux-2)
-   [Foundation](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#foundation-2)
-   [Build](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#build-2)
-   [Core](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#core-2)
-   [Framework](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#framework-3)
-   [AI Debugging](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#aidebugging-2)
-   [AI State Tree](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#aistatetree-2)
-   [Audio](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#audio-2)
-   [Gameplay](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#gameplay-3)
-   [Mass](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#mass-2)
-   [Networking](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#networking-2)
-   [Level Design and Art Tools](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#leveldesignandarttools-2)
-   [Landscape](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#landscape-2)
-   [Procedural](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#procedural-2)
-   [World Building](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#worldbuilding-2)
-   [Mobile Rendering](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#mobilerendering-2)
-   [Mobile Materials](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#mobilematerials-2)
-   [Motion Design](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#motiondesign-2)
-   [Online](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#online-3)
-   [Platform](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#platform-2)
-   [Linux](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#linux-2)
-   [Windows](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#windows-2)
-   [XR](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#xr-2)
-   [Platform Mobile](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#platformmobile-2)
-   [Android](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#android-2)
-   [iOS, tvOS, and iPadOS](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#ios,tvos,andipados-2)
-   [Virtual Production](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#virtualproduction-2)
-   [NDisplay](/documentation/zh-cn/unreal-engine/unreal-engine-5-6-release-notes#ndisplay-2)
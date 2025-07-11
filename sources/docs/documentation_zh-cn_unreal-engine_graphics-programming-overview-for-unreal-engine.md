# 虚幻引擎图形编程介绍 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:24:30.360Z

---

目录

![图形编程介绍](https://dev.epicgames.com/community/api/documentation/image/ababd2ed-41e4-439b-a3d2-7de2f8ca430d?resizing_type=fill&width=1920&height=335)

## 入门

虚幻引擎 中有许多渲染代码，因此要通过粗略的观察来迅速了解渲染状况是较为困难。阅读代码时，比较好的入手之处是"FDeferredShadingSceneRenderer::Render"，这是渲染线程中渲染新帧之处。此外，执行 profilegpu 命令并查看绘制事件也很有帮助。然后，您可以在 Visual Studio 中对绘制事件名称进行 **Find in Files** 操作，找出对应的 C++ 实现。

-   请参阅 [着色器开发](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine) 了解更多关于着色器使用的信息。
    
-   请参阅 [坐标空间](/documentation/zh-cn/unreal-engine/coordinate-system-and-spaces-in-unreal-engine) 查看 Unreal Engine 中使用的坐标空间术语的解释。
    

执行渲染时实用的控制台命令（使用 **?** 作为参数且当前状态不带参数时可获得帮助）：

控制台命令

描述

**stat unit**

显示整体帧长、游戏线程时长、渲染线程时长、GPU 时长。最长者为瓶颈。不过，CPU 时间包含空闲时间，所以只有在其为最长者且为独立时才会成为瓶颈。

**Ctrl+Shift+.** 或 **recompileshaders changed**

重新编译上次保存 .usf 文件后发生变化的着色器。这将在加载后自动进行。

**Ctrl+Shift+;** 或 **profilegpu**

测量渲染视图的 GPU 时间。可在弹出的 UI 或引擎日志中查看结果。

**Vis** 或 **VisualizeTexture**

可视化显示多种渲染目标的内容，并可保存为 bmp 文件。

**show x**

切换特定的显示标记。使用 show 来列出各种 showflag 及其当前状态。在编辑器中，使用视口 UI 作为替代。

**pause**

暂停游戏，但继续渲染。任何模拟渲染工作都将停止。

**slomo x**

变更游戏速度。此命令有助于在进行分析时减缓时间而不跳过模拟工作。例如 slomo .01

**debugcreateplayer 1**

用于测试分屏游戏。

**r.CompositionGraphDebug**

执行后可对某一帧的复合图形进行单帧转储（后期处理及光照）。

**r.DumpShaderDebugInfo**

设为 1 时会把所有被编译的着色器的调试信息转储到 GameName/Saved/ShaderDebugInfo 中。

**r.RenderTargetPoolTest**

清除 rendertarget 池返回的、带有特殊颜色的纹理，以便追踪颜色泄漏 bug。

**r.SetRes**

设置当前游戏视图的显示分辨率。在编辑器中不起作用。

**r.ViewportTest**

可用于测试不同视口矩形配置（仅在游戏中），因为使用 Matinee/Editor 时可能会出现这些情况。

执行渲染时实用的命令行：

命令行

描述

**\-d3ddebug**

启用 D3D11 调试层，可用于捕捉 API 错误。

**\-sm4**

强制功能层 SM4 使用 D3D11 RHI。

**\-opengl3** / -opengl4

在特定功能层强制使用 OpenGL RHI。

**\-dx11**

当前 Windows 的默认设置

**\-dx12**

实验性

**\-featureleveles2**

使用编辑器时忽略，此时必须使用 UI

**\-featureleveles31**

使用编辑器时忽略，此时必须在 Editor Preferences 中将其启用

**\-ddc=noshared**

防止使用网络（共享）派生数据缓存。可用于调试着色器缓存问题。

## 模块

渲染器代码存在于其自身的模块中。此模块将编译为非单块版本的一个 dll 文件。这可以使迭代更快，因为在渲染代码变更时无需重新链接整个应用程序。渲染器模块取决于引擎，因为其拥有许多向引擎的回调。然而当引擎需要调用渲染器中的某些代码时，这会通过某个接口来完成，通常为 IRendererModule 或 FSceneInterface。

## 场景代表

在 Unreal Engine 中，渲染器所见的场景由基本组件和 FScene 中存储的多种其他结构的列表定义。将维护一个基元的八叉树，用于加速空间查询。

#### 主要场景类

Unreal Engine 中拥有和游戏线程并行运行的 [渲染线程](/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine)。大多数将游戏线程与渲染线程连接在一起的类都会根据对相应状态拥有所有权的线程分为两个部分。

主要的类为：

类

描述

**UWorld**

包含多个可交互的 Actor 和组件的世界场景。关卡可以流送进入和退出世界场景，且程序中可以同时有多个世界场景处于激活状态。

**ULevel**

一同加载/卸载并保存在同一地图文件中的 Actor 和组件合集。

**USceneComponent**

需要添加到 FScene 中的任意对象的基础类，如光照、网格体、雾等。

**UPrimitiveComponent**

可渲染或进行物理交互的任意资源的基础类。也可以作为可视性剔除的粒度和渲染属性规范（投射阴影等）。与所有 UObjects 一样，游戏线程拥有所有变量和状态，渲染线程不应直接对其进行访问。

**ULightComponent**

代表光源。渲染器负责计算和添加其对场景的贡献。

**FScene**

UWorld 的渲染器版本。对象仅在其被添加到 FScene（注册组件时调用）后才会存在于渲染器中。渲染线程拥有 FScene 中的所有状态，游戏线程无法直接对其进行修改。

**FPrimitiveSceneProxy**

UPrimitiveComponent 的渲染器版本，为渲染线程映射 UPrimitiveComponent 状态。存在于引擎模块中，用于划分为子类以支持不同类型的基元（骨架、刚体、BSP 等）。实现某些非常重要的函数，如 GetViewRelevance、DrawDynamicElements 等。

**FPrimitiveSceneInfo**

内部渲染器状态（FRendererModule 实现专有），对应于 UPrimitiveComponent 和 FPrimitiveSceneProxy。存在于渲染器模块中，因此引擎看不到它。

**FSceneView**

单个视图到一个 FScene 的引擎代表。视图可以通过对 FSceneRenderer::Render 的不同调用的不同视图来渲染（多编辑器视口）或通过对 FSceneRenderer::Render 的同一调用中的多个视图来渲染（分屏游戏）。为每个帧构建新视图。

**FViewInfo**

视图的内部渲染器代表，存在于渲染器模块中。

**FSceneViewState**

ViewState 存储有关在多个帧中需要的某个视图的私有渲染器信息。在游戏中，每个 ULocalPlayer 只有一个视图状态。

**FSceneRenderer**

为每个帧创建的类，用于封装跨帧的临时对象。

下面按其所在的模块列出了各种主类。在尝试解决连接器问题时这些信息非常重要。

引擎模块

渲染器模块

UWorld

FScene

UPrimitiveComponent / FPrimitiveSceneProxy

FPrimitiveSceneInfo

FSceneView

FViewInfo

ULocalPlayer

FSceneViewState

ULightComponent / FLightSceneProxy

FLightSceneInfo

以及相同类（按哪个线程对其状态拥有所有权进行排列）。请务必随时了解您正在为其编写代码的状态的所有权属于哪个线程，[避免出现竞态条件](/documentation/zh-cn/unreal-engine/threaded-rendering-in-unreal-engine)

游戏线程

渲染线程

UWorld

FScene

UPrimitiveComponent

FPrimitiveSceneProxy / FPrimitiveSceneInfo

 

FSceneView / FViewInfo

ULocalPlayer

FSceneViewState

ULightComponent

FLightSceneProxy / FLightSceneInfo

#### 材质类

类

描述

**FMaterial**

连接用于渲染的材质的接口。可用于访问材质属性（如混合模式）。包含被渲染器用于检索个体着色器的着色器地图。

**FMaterialResource**

UMaterial 的 FMaterial 接口实现。

**FMaterialRenderProxy**

材质在渲染线程上的代表。可用于访问 FMaterial 接口和各个标量、向量和纹理参数。

**UMaterialInterface**

\[abstract\] 用于材质功能的游戏线程接口。用于检索用于渲染的 FMaterialRenderProxy 和用作来源的 UMaterial。

**UMaterial**

材质资源。授权为节点图形。计算用于着色、设置混合模式等的材质属性。

**UMaterialInstance**

\[abstract\] UMaterial 的实例。使用 UMaterial 中的节点图形，但提供不同参数（标量、向量、纹理、静态切换）。每个实例都有一个父项 UMaterialInterface。因此，材质实例的父项可能是 UMaterial 或另一个 UMaterialInstance。这会形成一个链，最终通往 UMaterial。

**UMaterialInstanceConstant**

只能在编辑器中修改的 UMaterialInstance。可以提供标量、向量、纹理和静态开关参数。

**UMaterialInstanceDynamic**

可以在运行时修改的 UMaterialInstance。可提供标量、向量和纹理参数。无法提供静态开关参数，且无法成为另一 UMaterialInstance 的父项。

#### 基元组件和代理

基元组件是可视性和相关性确定的基本单位。例如，遮蔽和视锥剔除都是按基元进行的。因此在设计系统时，考虑组件的大小十分重要。每个组件都有一个边界，用于多种操作，如剔除、阴影投射和光照影响确定。

组件只有在注册之后才会对场景（以及渲染器）可见。更改组件属性的游戏线程代码必须调用组件上的 **MarkRenderStateDirty()**，将更改传播到渲染线程。

#### FPrimitiveSceneProxy 和 FPrimitiveSceneInfo

FPrimitiveSceneProxy 是 UPrimitiveComponent 的渲染线程版本，用于根据组件类型划分子类。它存在于引擎模块中，并在渲染通道中调用函数。FPrimitiveSceneInfo 是基元组件状态，为渲染器模块私有。

#### 重要的 FPrimitiveSceneProxy 方法

函数

描述

GetViewRelevance

在帧的开始从 InitViews 调用，并返回填充的 FPrimitiveViewRelevance。

DrawDynamicElements

调用，以便在某代理相关的任何通道中绘制该代理。仅在代理表示自己拥有动态相关性时调用。

DrawStaticElements

调用以在基元与游戏线程相连时提交代理的 StaticMesh 元素。仅在代理表示自己拥有静态相关性时调用。

#### 场景渲染顺序

渲染器按照其希望将数据整合给渲染目标的顺序处理场景。例如，仅 Depth 的通道会比 Base 通道先渲染，先填充 Heirarchical Z (HiZ)，从而降低基础通道中的着色消耗。此顺序是按通道函数在 C++ 中调用的顺序静态决定的。

#### 相关性

FPrimitiveViewRelevance 是说明哪些特效（即通道）与基元相关的信息。基元可能有存在不同相关性的多个元素，因此 FPrimitiveViewRelevance 相当于一个所有元素的相关性的逻辑 OR。这表示基元可以同时存在不透明和透明相关性，或动态和静态相关性；它们并非相互排斥。

FPrimitiveViewRelevance 还会显示基元是否需要使用动态 (bDynamicRelevance) 和/或静态 (bStaticRelevance) 渲染路径。

#### 绘制规则

绘制规则包括通过通道特定的着色器渲染网格体的逻辑。它们使用 FVertexFactory 接口来抽取网格体类型，并使用 FMaterial 接口来抽取材质详情。在最底层，一条绘制规则会负责一组网格体材质着色器以及一个顶点工厂，将顶点工厂的缓冲区与渲染硬件接口 (RHI) 绑定，将网格体材质着色器与 RHI 绑定，设置适当的着色器参数，然后执行 RHI 绘制调用。

#### 绘制规则方法

函数

描述

Constructor

从给定的顶点工厂和材质着色器地图，并存储这些引用。

CreateBoundShaderState

为绘制规则创建 RHI 边界着色器状态。

Matches/Compare

提供排列绘制规则与静态绘制列表中的其他项目的方法。Matches 必须比较 DrawShared 依赖的所有因素。

DrawShared

设置在从 Matches 返回 True 的绘制规则之间一致的 RHI 状态。例如，大多数绘制规则会为材质和顶点工厂排序，因此着色器参数只依赖可以设置的材质，并且可以绑定特定于该顶点工厂的顶点缓冲区。应尽可能在此处设置状态，而非在 SetMeshRenderState 设置，因为 DrawShared 在静态渲染路径中调用较少。

SetMeshRenderState

设置特定于此网格体的 RHI 状态，或 DrawShared 中未设置的任何项目。这比 DrawShared 调用的次数多得多，因此此处性能非常重要。

DrawMesh

实际发出 RHI 绘制调用。

## 渲染路径

Unreal Engine 拥有动态路径（能够提供更多的控制，但转换较慢）和静态渲染路径（缓存尽可能靠近 RHI 级别的场景转换）。差异基本上是整体上的，因为它们都在最底层使用绘制规则。应确保各个渲染通道（绘制规则）在需要时能够同时处理两个渲染路径。

#### 动态渲染路径

动态渲染路径使用 TDynamicPrimitiveDrawer 并对每个要渲染的基元场景代理调用 DrawDynamicElements。需要使用动态路径来渲染的一组基元通过 FViewInfo::VisibleDynamicPrimitives 来跟踪。每个渲染通道都需要在此阵列上迭代，并调用各个基元上的 DrawDynamicElements。随后，代理的 DrawDynamicElements 需按需要组合出多个 FMeshElements，并将其随 DrawRichMesh 或 TDynamicPrimitiveDrawer::DrawMesh 提交。这样最终会创建一个新的临时绘制规则，调用 CreateBoundShaderState、DrawShared、SetMeshRenderState 以及 DrawMesh。

动态渲染路径能够提供很高的灵活性，因为每个代理都在 DrawDynamicElements 中有一个回调（它可在其中执行特定于该组件类型的逻辑）。它的插入消耗极小，但遍历消耗很大，因为不存在状态排序，且不使用缓存。

#### 静态渲染路径

静态渲染路径通过静态绘制列表实现。网格体在连接到场景时会插入到绘制列表中。在插入过程中，将调用代理上的 DrawStaticElements，以收取 FStaticMeshElements。随后将随 CreateBoundShaderState 的结果创建并存储一个绘制规则实例。新的绘制示例将根据其 Compare 和 Matches 函数排序，并插入到绘制列表中的适当位置（参见 TStaticMeshDrawList::AddMesh）。在 InitViews 中，包含静态绘制列表中的可见性数据的 bitarray 会初始化并传递到 TStaticMeshDrawList::DrawVisible（实际绘制绘制列表的地方）。DrawShared 只会对所有相互匹配的绘制规则调用一次，而 SetMeshRenderState 和 DrawMesh 会对每个 FStaticMeshElement（参见 TStaticMeshDrawList::DrawElement）调用。

静态渲染路径会将许多工作移动连接时间，这会大大加快渲染时的场景转换。在渲染线程上针对静态网格体时，静态绘制列表的渲染会快 3 倍，从而允许场景中出现多得多的静态网格体。由于静态绘制列表会在连接时间缓存数据，因此它们仅能缓存与视图无关的状态。很少重新连接但经常需要渲染的基元非常适合静态绘制列表。

静态渲染路径可能会暴露出 bug，因为它每个状态桶只调用 DrawShared 一次。这些 bug 可能会很难发现，因为它们取决于场景中网格体的渲染顺序和连接顺序。特别的视图模式（如仅光照、无光照等）会强制所有基元使用动态路径，因此如果在强制动态渲染路径时 bug 消失，则其很可能是由于某绘制规则的 DrawShared 和/或 Matches 函数的错误实现而出现的。

## 总体渲染顺序

下面将说明从 FDeferredShadingSceneRenderer::Render 开始渲染一个帧时的控制流程：

操作

描述

GSceneRenderTargets.Allocate

按需要重新分配全局场景渲染目标，使其对当前视图足够大。

InitViews

通过多种剔除方法为视图初始化基元可见性，设立此帧可见的动态阴影、按需要交叉阴影视锥与世界场景（对整个场景的阴影或预阴影）。

PrePass / Depth only pass

RenderPrePass / FDepthDrawingPolicy。渲染遮挡物，对景深缓冲区仅输出景深。该通道可以在多种模式下工作：禁用、仅遮蔽，或完全景深，具体取决于活动状态的功能的需要。该通道通常的用途是初始化 Hierarchical Z 以降低 Base 通道的着色消耗（Base 通道的像素着色器消耗非常大）。

Base pass

RenderBasePass / TBasePassDrawingPolicy。渲染不透明和遮盖的材质，向 GBuffer 输出材质属性。光照图贡献和天空光照也会在此计算并加入场景颜色。

Issue Occlusion Queries / BeginOcclusionTests

提出将用于下一帧的 InitViews 的延迟遮蔽查询。这会通过渲染所查询物体周围的相邻的框、有时还会将相邻的框组合在一起以减少绘制调用来完成。

Lighting

阴影图将对各个光照渲染，光照贡献会累加到场景颜色，并使用标准延迟和平铺延迟着色。光照也会在透明光照体积中累加。

Fog

雾和大气在延迟通道中对不透明表面进行逐个像素计算。

Translucency

透明度累加到屏外渲染目标，在其中它应用了逐个顶点的雾化，因而可以整合到场景中。光照透明度在一个通道中计算最终光照以正确融合。

Post Processing

多种后期处理效果均通过 GBuffers 应用。透明度将合成到场景中。

以上是相当简单概略的介绍。如需了解详情，请通读相关代码或输出的"profilegpu"日志。

## 渲染硬件接口 (RHI)

RHI 是平台特定的图形 API 之上的一个薄层。Unreal Engine 中的 RHI 抽象层尽可能低，这样大多数功能都能以与平台无关的代码写成，从而能够在支持所需功能层级的任何平台上运行。

功能集将量化到 ERHIFeatureLevel 中，降低复杂程度。如果平台无法支持某个功能层级所需的全部功能，则其必须降低层级，直至能够全部支持。

功能层级

描述

SM5

通常对应于 D3D11 Shader Model 5，但由于 OpenGL 4.3 限制，仅有 16 种纹理可以使用。支持曲面细分、计算着色器和立方体贴图阵列。支持延迟着色路径。

SM4

对应 D3D11 Shader Model 4，这与 SM5 基本相同，但没有曲面细分、计算着色器和立方体贴图阵列。支持延迟着色路径。不支持眼适应，因为其使用计算着色器。

ES3\_1

对应OpenGL ES3.1、Vulkan和Metal支持的功能。

#### 渲染状态分组

渲染状态根据其影响的流程部分而分组。例如，RHISetDepthState 可设置所有与景深缓冲相关的状态。

#### 渲染状态默认值

由于渲染状态数量众多，要在每次绘制之前对它们全部设置一遍是不现实的。为此，Unreal Engine 具有隐性设置的一组状态，它们被认为是设置为了默认值（因此在变更后必须恢复为默认值），另外还有一组少得多的状态需要显性设置。没有隐性默认值的状态有：

-   RHISetRenderTargets
-   RHISetBoundShaderState
-   RHISetDepthState
-   RHISetBlendState
-   RHISetRasterizerState
-   由 RHISetBoundShaderState 设置的着色器的任何依赖性

其他所有状态均视为已设置为其默认值（即相关 TStaticState 的定义，如默认的蜡纸模板状态由 `RHISetStencilState(TStaticStencilState<>::GetRHI())` 设置。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [入门](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#%E5%85%A5%E9%97%A8)
-   [模块](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#%E6%A8%A1%E5%9D%97)
-   [场景代表](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#%E5%9C%BA%E6%99%AF%E4%BB%A3%E8%A1%A8)
-   [主要场景类](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#%E4%B8%BB%E8%A6%81%E5%9C%BA%E6%99%AF%E7%B1%BB)
-   [材质类](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#%E6%9D%90%E8%B4%A8%E7%B1%BB)
-   [基元组件和代理](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#%E5%9F%BA%E5%85%83%E7%BB%84%E4%BB%B6%E5%92%8C%E4%BB%A3%E7%90%86)
-   [FPrimitiveSceneProxy 和 FPrimitiveSceneInfo](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#fprimitivesceneproxy%E5%92%8Cfprimitivesceneinfo)
-   [重要的 FPrimitiveSceneProxy 方法](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#%E9%87%8D%E8%A6%81%E7%9A%84fprimitivesceneproxy%E6%96%B9%E6%B3%95)
-   [场景渲染顺序](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#%E5%9C%BA%E6%99%AF%E6%B8%B2%E6%9F%93%E9%A1%BA%E5%BA%8F)
-   [相关性](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#%E7%9B%B8%E5%85%B3%E6%80%A7)
-   [绘制规则](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#%E7%BB%98%E5%88%B6%E8%A7%84%E5%88%99)
-   [绘制规则方法](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#%E7%BB%98%E5%88%B6%E8%A7%84%E5%88%99%E6%96%B9%E6%B3%95)
-   [渲染路径](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#%E6%B8%B2%E6%9F%93%E8%B7%AF%E5%BE%84)
-   [动态渲染路径](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#%E5%8A%A8%E6%80%81%E6%B8%B2%E6%9F%93%E8%B7%AF%E5%BE%84)
-   [静态渲染路径](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#%E9%9D%99%E6%80%81%E6%B8%B2%E6%9F%93%E8%B7%AF%E5%BE%84)
-   [总体渲染顺序](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#%E6%80%BB%E4%BD%93%E6%B8%B2%E6%9F%93%E9%A1%BA%E5%BA%8F)
-   [渲染硬件接口 (RHI)](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#%E6%B8%B2%E6%9F%93%E7%A1%AC%E4%BB%B6%E6%8E%A5%E5%8F%A3\(rhi\))
-   [渲染状态分组](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#%E6%B8%B2%E6%9F%93%E7%8A%B6%E6%80%81%E5%88%86%E7%BB%84)
-   [渲染状态默认值](/documentation/zh-cn/unreal-engine/graphics-programming-overview-for-unreal-engine#%E6%B8%B2%E6%9F%93%E7%8A%B6%E6%80%81%E9%BB%98%E8%AE%A4%E5%80%BC)
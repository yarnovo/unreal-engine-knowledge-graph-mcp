# 虚幻引擎中的光线追踪性能指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:16:31.349Z

---

目录

![光线追踪性能指南](https://dev.epicgames.com/community/api/documentation/image/e2a1baa3-eada-46a9-b4b0-d3a3f7e912e6?resizing_type=fill&width=1920&height=335)

对于需要维持实时性能预算的项目，必须设置框架预算来实现这种目标框架比例。通常情况下，应该是每秒30或60帧（FPS）。通过调整内容或工作流，可以在很多地方优化项目的性能。

本指南介绍了一些可以开始优化虚幻引擎光线追踪功能的地方，以及多种通过调试场景和调查问题来解决困难领域的方法。

## 光线追踪开销概览

硬件光线追踪使用分成两层的 **包围体层级（Bounding Volume Hierarchy）** （BVH）来加速光线遍历。**顶层加速结构（Top Level Acceleration Structure）** （TLAS）包含整个场景的所有网格体实例。这些实例引用的网格体是 **底层加速结构（Bottom Level Acceleration Structure）** （BLAS）。

下面的图表以可视化方式呈现了BVH实现光线遍历的方式。

![光线追踪加速结构的图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd21b62c-6864-48a8-8c67-c465cd3dacd6/ray-tracing-acceleration-structure-diagram.png)

光线追踪产生的开销主要有三个类别。

1.构建底层加速结构以便于动态地解构网格体，例如蒙皮网格体和毛发。 1.为场景和着色器绑定表（SBT）构建顶层加速结构。 1.每个使用光线追踪功能的光线遍历。

对于项目开发，可以使用控制台变量来测试特定几何体类型的光线追踪。这对于衡量光线追踪功能的开销或将其完全禁用非常有用。这些功能在 `r.RayTracing.Geometry.*` 下列出。

几何体类型

控制台变量

默认状态

静态网格体

`r.RayTracing.Geometry.StaticMeshes`

启用

骨骼网格体

`r.RayTracing.Geometry.SkeletalMeshes`

启用

实例化静态网格体

`r.RayTracing.Geometry.InstancedStaticMeshes`

启用

地形地貌

`r.RayTracing.Geometry.Landscape`

启用

几何体缓存

`r.RayTracing.Geometry.GeometryCache`

启用

几何体集合

`r.RayTracing.Geometry.GeometryCollection`

禁用

Niagara网格体

`r.RayTracing.Geometry.NiagaraMeshes`

启用

Niagara条带

`r.RayTracing.Geometry.NiagaraRibbons`

启用

Niagara Sprite

`r.RayTracing.Geometry.NiagaraSprites`

启用

流程性网格体

`r.RayTracing.Geometry.ProceduralMeshes`

启用

## 底层加速结构更新

虽然静态网格体的BLAS仅在加载时（或在控制台上烘焙时）构建一次，但动态地解构网格体时还必须重新构建每个帧，而这则可能产生极大的开销。BLAS重新构建是一种GPU操作，通常与要解构的三角形数量成正比。**使用大量的骨骼网格体和大量的三角形可能很快就造成沉重的GPU开销。（Using a large number of Skeletal Meshes with a large number of triangles can quickly become a major GPU cost.）**

BLAS重新构建开销可以在GPU分析器的以下区域中看到：

-   Scene > CommitRayTracingGeometryUpdates
-   Scene > CommitHairRayTracingGeometryUpdates
-   Scene > RayTracingGeometry

重新构建每个帧的三角形类型包括：

-   GPUSkinCache中的蒙皮网格体
-   重新构建地形以支持其持续变形的细节级别（LOD）。
-   Chaos破坏系统的几何体集合
-   毛发
-   流程性网格体
-   Niagara粒子系统

大量的多边形骨骼网格体通常都会导致较高的BLAS构建开销。骨骼网格体可以使用[骨骼网格体编辑器](/documentation/zh-cn/unreal-engine/skeletal-mesh-animation-system-in-unreal-engine)中的 **光线追踪最低LOD（Ray Tracing Min LOD）** 属性，从而阻止为光线追踪功能使用最高的LOD。

在通过D3D12运行项目时，使用控制台命令 `D3D12.DumpRayTracingGeometries` 来获取转储到日志的动态BLAS重新构建的所有内存分类列表。此列表可以用于优化项目。

### 静态网格体组件上的世界位置偏移

世界位置偏移（WPO）对于有效地支持光线追踪功能来说是一个挑战，因为它需要动态地重新构建BLAS，以及为每个实例动态地分配各自的内存。

默认情况下，虚幻引擎在构建光线追踪场景时会忽略WPO，这会产生自相交瑕疵。静态网格体组件可以选择将WPO与具有 **评估世界位置偏移（Evaluate World Position Offset）** 的光线追踪配合使用。但是，除非另行指定，否则这种方法仅适用于摄像机周围 50 米以内的距离。

使用以下参数来启用和调整支持的WPO与摄像机之间的距离。

-   `r.RayTracing.Geometry.StaticMeshes.WPO 1`
-   `r.RayTracing.Geometry.StaticMeshes.WPO.CullingRadius 5000.0f`

WPO所引起的动态BLAS构建将显示在GPU分析器的 `Scene > RayTracingGeometry > RayTracingDynamicGeometryUpdate` 下。

实例化组件（例如实例化的静态网格体组件）默认不支持WPO，因为其开销非常高。具有 **评估世界位置偏移（Evaluate World Position Offset）** 开关的组件默认情况下不启用此开关。打开磁开关可能会严重增加内存压力并延长渲染时间，因为此功能会使用单独的BLAS来转换单个网格体中的每个实例。

### 管理光线追踪内存开销

光线追踪会大大提升内存要求。每个对光线追踪可见的网格体，都需要分配一个光线追踪底层加速结构。通常，一个底层加速结构的内存需求会随三角形/顶点的数量线性缩放，但具体数值取决于平台。同样，所有可见网格体都会分配其BLAS，这会消耗巨量的内存。为了克服这一问题，你可以使用 **基于引用的常驻（Reference Based Residency）** 系统。它只会分配被TLAS直接引用的BLAS。这也可以为剩余的BLAS指定内存预算。不会被引用或超过预算的部分，都会被抛弃。

你可以使用控制台命令 `r.RayTracing.UseReferenceBasedResidency` 启用基于引用的常驻系统。其默认为禁用。将其设置为 **1** 以启用。

在支持内联光线追踪和光线追踪着色器的平台上，你可以使用平台特有的选项精细控制启用光线追踪的方法。你可以在项目设置的 **平台（Platforms）> \[目标平台\] > 光线追踪模式（Ray Tracing Mode）** 下找到该选项。它包含以下模式：

-   **禁用（Disabled）**：在平台上禁用一切光线追踪。
-   **内联（Inline）**：只启用内联光线追踪通道，如带表面缓存（Surface Cache）和重心/遍历（Barycentrics / Traversal）调试视图的Lumen硬件光线追踪（Lumen Hardware Ray Tracing）模式。在此模式中，光线追踪材质着色器和选择全局着色器不会被编译。这可以节省内存和CPU开销，因为不必为光线追踪着色器准备绑。
-   **完整（Full）**：此平台支持所有光线追踪功能。

## 顶层加速结构构建

顶层加速结构在每一帧上重建，并在渲染线程、RHI线程和GPU上产生开销。这些开销基本上与进入加速结构的网格体实例数量成正比。

通过统计命令 `Stat SceneRendering`，可以在 **光线追踪实例（Ray tracing instances）** 下找到要在每一帧上重建的实例数量。

![stat scenerendering中的光线追踪实例数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0416e47-9868-47cc-abe9-916238be1d2a/stat-scenerendering-1.png)

要衡量渲染线程的开销，请使用命令 `Stat SceneRendering` 并查找 **GatherRayTracingWorldInstances**。

![收集stat scenerendering中的光线追踪世界实例数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20fdeb92-fb68-4dc9-9970-843d03fb332e/stat-scenerendering-2.png)

要衡量RHI线程的开销，可以使用每个RHI的统计数据，例如 `Stat D3D12RayTracing`。

![衡量stat d3d12raytracing中rhi线程的开销](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6dedfcce-eb4f-4e2a-ba16-d8ad502b5ad1/stat-scenerendering-3.png)

可以使用统计命令 `Stat GPU` 来衡量GPU开销。查看 **RayTracingScene** 和 **RayTracing** 的条目以了解其开销。

![使用stat GPU衡量GPU开销](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93d449cc-de10-4090-b069-32ec8d56d583/stat-scenerendering-4.png)

为了在下一代主机上达到每秒30帧的目标，场景在剔除光线追踪场景后通常具有100,000个或更少的实例。在Windows上，实例数可能会明显不同。

### 剔除

启用了光线追踪的场景要求摄像机视图之外的object出现在场景中，尤其是对于高度反光的表面。这会增加渲染场景的开销。剔除不可见或需要帮助进行性能优化的object。

由于光线追踪需要保持object可见（即使不在视图中），因此控制台变量 `r.RayTracing.Culling` 提供了一些选项来帮助优化当前视图之外可见或超过该距离的object。

提供了以下选项：

-   **1** 按距离和方位角剔除摄像机后面的object（默认额光线追踪剔除方法）。
-   **2** 按距离和方位角剔除摄像机前面和后面的object。
-   **3** 按距离或方位角剔除摄像机前面和后面的object。

每个剔除选项都逐步剔除光线追踪场景中的更多object。

在设置成选项3时，由于TLAS在每个帧上重建，因此可以根据网格体实例与摄像机的距离或角度来剔除网格体实例。

此外，在使用以下控制台命令时，可以在命令中配置光线追踪剔除选项所使用的 **半径（Radius）** 和 **角度（Angle）** 。

-   `r.RayTracing.Culling.Radius` ：设置摄像机周围的距离，超过此距离的object将会被剔除。默认半径为10000（100米）。
-   `r.Raytracing.Culling.Angle` ：剔除投射角度小于5度的网格体。默认值为1。

对于开放的世界项目，例如城市示例，剔除 **半径（Radius）** 会增加到15000（150米），而剔除 **角度（Angle）** 会减少到0.5（2.5度），因为需要考虑到较大的区域中具有大量反光表面，因此需要使较远距离上的object可见。

剔除将会导致光线追踪场景覆盖范围变小，最好与[远场](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#farfield)配合使用，以提供远距离几何体的踪迹。

所标记的 **光线追踪组ID（Ray Tracing Group Id）** 大于0的网格体组件可以使用 `r.RayTracing.Culling.UserGroupIds 1` 将其作为聚合来剔除掉。如果你的场景是使用大量截然不同的部件构建而成，但你希望将其作为单个object来剔除，那么此方法可能很有用。

![光线追踪细节面板设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06d253db-074a-4093-9e2d-31efefc72d28/ray-tracing-details-settings.png)

光线追踪组ID可以在关卡中所选的Actor上找到。

## 光线遍历开销

光线查询是由使用[硬件光线追踪](/documentation/zh-cn/unreal-engine/hardware-ray-tracing-in-unreal-engine)的功能（例如光线追踪阴影、Lumen全局光照和Lumen反射）生成的。GPU使用能够遍历加速结构以找到击中点的专用硬件来解决这些光线查询。

GPU分析日志输出中的光线遍历开销示例如下：

2.36ms LumenReflections 1 draw 1 prims 0 verts 13 dispatches 4.1% 0.67ms ReflectionHardwareRayTracing \[default\] 1 draw 1 prims 0 verts 1 dispatch 1 groups

光线遍历的开销与光照功能发布的光线查询数量成正比，同时也与场景中的网格体重叠数量成正比。

当网格重叠时，光线必须分别遍历所有网格体以找到最近的击中点，因为光线追踪会用具有两个层次的加速结构。网格体重叠可能会导致场景构建中的光线遍历非常缓慢，因为需要同时穿过不同的资产（这也称为模型冲击）。

![重叠的网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0f5be08-0843-4217-b4c3-315644cd305e/overlapping-meshes-kit-bashed.png)

用于在虚幻引擎5"遗迹山谷"技术演示视频中铺设演示的完成了模型冲击的资产示例。

为了使场景兼容硬件光线追踪，网格体重叠 **必须** 保持在最低限度。

此外还有一些其他的原因导致光线遍历开销太高，第一个就是天空盒，因为天空盒与整个场景重叠，并且每一道光线都必须遍历天空盒（如果没有击中天空盒）。另一个就是草地，因为草地的边界非常大，具有非常复杂的几何形状。

在这些情况下（或任何其他类似的情况下），可以选择让这些光线追踪的路线跳过这些网格体。在世界中选择Actor，然后使用其细节面板来禁用 **光线追踪中可见（Visible in Ray Tracing）** 。

### 光线遍历调试可视化模式

以下调试模式当前仅在主机平台上可用。

有两种模式可以用于调查遍历开销过高的问题：性能和遍历。

要启用这些模式，需要使用以下命令：

```cpp
	show raytracingdebug 1
	r.RayTracing.DebugVisualizationMode [mode]

```

"\[Mode\]"将替换为你需要查看的可视化方法：`Performance` 或 `Traversal Node` 。例如，可以是 `r.RayTracing.DebugVisualizationMode Traversal Node` 。

### 性能调试可视化

**性能（Performance）** 调试可视化显示TraceRay调用的热图，从而显示BVH遍历和材质评估时间的综合（执行"最近击中/错失"着色器）。

![性能调试可视化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ebbecf2-a7f8-4bbd-885b-6195f667e962/vis-performance-debug.png)

光线追踪性能调试可视化。

可视化的颜色从紫色（无开销）变成黄色（高开销）。可以使用 `r.RayTracing.DebugTiming Scale` 来调整热图的规模，以满足项目的需求。

此模式在寻找有问题的object和材质以进行光线追踪时最有用。如果光线追踪开销太高，那么建议检查一下该模式下显示的内容看起来是否合理。

例如，主视图中可见的object在调试模式中也会出现，不会出现不必要的object，以及这些object的材质开销符合预期。如果没有发现明显的问题，那么很有可能速度变慢并不是由单个object导致的，而是各种不同的小问题共同导致的。

### 遍历调试可视化

**遍历（Traversal）** 调试可视化仅显示BVH遍历的热图——即需要多少次迭代才能找到击中点。对于不使用材质的Lumen通道或使用简单击中着色/内联的相似通道，开销最高的通常是BVH遍历。

热图的颜色从绿色（少量迭代）变成红色（大量迭代）。直接来说，发生的迭代越多，遍历速度越慢。对于典型场景，迭代次数在50到100之间。对于复杂场景（包括多个重叠的多边形网格体），将发生大约100到150次迭代。

任何超过建议数量的迭代都可能存在问题，例如，如果一个破裂的网格体发生1000多次迭代，就不正常了。遍历三角形调试可视化可以用于检查单个网格体三角形。

对于遍历调试，有三种模式可供选择：

遍历调试模式

命令名称

说明

可视化视图

**节点相交计数（Node Intersection Count）**

`Traversal Node`

用于调查场景遍历开销。例如，当TLAS中有很多实例重叠时。

这些是BLAS的平台专用内部呈现中的BVH节点。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93802302-12c8-4d3d-9197-c8054d027cf5/vis-traversal-node.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93802302-12c8-4d3d-9197-c8054d027cf5/vis-traversal-node.png)

**三角形相交计数（Triangle Intersection Count）**

`Traversal Triangle`

显示仅包含三角形的节点（叶节点）的击中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53a49c82-7bb5-48f0-8df2-e4e52035a70b/vis-traversal-triangle.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53a49c82-7bb5-48f0-8df2-e4e52035a70b/vis-traversal-triangle.png)

**总相交计数（Total Intersection Count）**

`Traversal All`

BVH节点击中和三角形节点击中的总和。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10191f63-65e6-41d6-a631-0f58733b2e1d/vis-traversal-all.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10191f63-65e6-41d6-a631-0f58733b2e1d/vis-traversal-all.png)

### 击中着色开销

当光线击中三角形时，将评估材质并使用材质对击中点进行着色。对于使用流程性纹理操作和很多虚拟材质的复杂材质，这可能是开销很高的流程。

**光线追踪质量切换（Ray Tracing Quality Switch）** 节点是可以在材质中使用的表达式，能够为光线击中着色操作提供更便宜的实现方式。

![光线追踪质量切换材质节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50542324-863a-4c62-ba57-d86f54cf74ff/material-ray-tracing-quality-switch-node.png)

节点可以替换整个材质逻辑部分，以降低光线追踪功能的总体开销。使用此节点将影响此材质的所有光线追踪效果。

一个简单的例子（请见下文）是一个包含逻辑的材料，它对光线追踪效果而言是很昂贵的。RayTracingQualitySwitch节点包含两种输入：Normal和RayTraced。

**Normal** 输入包含了材料所需的所有逻辑，是其在这个世界诸多表面上的显示方式。 **RayTraced** 输入应该在逻辑路径中减少增加光线追踪效果开销的复杂性，例如法线贴图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78f6d919-48bf-447d-8488-e1884acb369f/ray-tracing-quality-switch-example.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78f6d919-48bf-447d-8488-e1884acb369f/ray-tracing-quality-switch-example.png)

点击查看大图。

### 远场

光线追踪支持 **远场（Far Field）** 呈现，默认情况下可以将Lumen全局光照和反射扩展到距离摄像机一千米的位置。远场默认使用[世界分区生成的分层细节级别（HLOD）网格体](/documentation/zh-cn/unreal-engine/world-partition---hierarchical-level-of-detail-in-unreal-engine)。HLOD1网格体用于远场呈现。

目前，只有Lumen光照功能使用[光线追踪远场](/documentation/zh-cn/unreal-engine/lumen-technical-details-in-unreal-engine#farfield)，并且只有在使用命令 `r.LumenScene.FarFields 1` 为项目启用时使用。

在应该显示到远场的选定网格体上，切换 **光线追踪远场（Ray Tracing Far Field）** 设置。

![光线追踪远场设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4a78297-e70b-47d4-9a2b-60e321f56710/ray-tracing-far-field.png)

在编辑器中，可以使用光线追踪调试可视化模式来可视化远场：`FarField`。输入以下命令：

```cpp
	r.RayTracing.DebugVisualizationMode FarField
	Showflag.RayTracingDebug 1

```

在下面的可视化中，远场是使用世界分区生成的HLOD1网格体的染红几何体。距离摄像机更近的则是高细节几何体。

![远场可视化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c97c5791-1b81-4e9a-aef9-4a2c24236d4d/ray-tracing-far-field-visualization.png)

Lumen的光线追踪远场调试可视化。远场几何体染成了红色。

## 其它光线追踪调试可视化模式

**光线追踪调试（Ray Tracing Debug）** 可视化模式可以让你收集关于光线追踪场景的信息。

你可以从关卡视口的 **查看模式（View Modes）** 下拉菜单选择可视化模式，或者输入控制台指令 `r.RayTracing.DebugVisualizationMode` 之后指定可视化模式。

![Ray Tracing Debug Visualization Modes selected through the Level viewport.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8cf48d58-9c5b-494c-9741-0506535e24c5/ray-tracing-debug-visualization-modes-dropdown.png)

### Picker调试可视化模式

`Picker` 调试可视化模式会显示光线追踪几何体和光标之下的实例的相关信息。Picker模式可以在两种模式下运行：**三角形（Triangles）** 和 **实例（Instances）**。

你可以使用 `r.RayTracing.Debug.PickerDomain` 来切换模式，指令之后加上 **0** 表示三角形（默认），**1** 表示实例。

 

 

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5ebe444-8b7e-4045-9200-ba52af5e1738/debug-picker-domain-triangles.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5ebe444-8b7e-4045-9200-ba52af5e1738/debug-picker-domain-triangles.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5aba7a2-6cee-4f76-9f8b-1168a2aaaf36/debug-picker-domain-instances.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5aba7a2-6cee-4f76-9f8b-1168a2aaaf36/debug-picker-domain-instances.png)

三角形调试Picker模式

实例调试Picker模式

*点击查看大图。*

*点击查看大图。*

关于光线追踪几何体的信息和当前使用的Picker模式会显示在视口左侧。

![Debug Picker information displayed in the level viewport.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84574b2b-ef96-4336-9b76-b8d30c59dd75/debug-picker-domain-display-information.png)

### 动态实例调试可视化模式

`动态实例（Dynamic Instance）` 调试可视化模式会显示光线追踪场景中的动态实例。每一帧中，动态实例都会被重新构建并且显示出来，以颜色区分，**红色** 表示静态实例，**绿色** 表示动态实例。

![Ray Tracing Debug Visualization Dynamic Instances](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c3d699e-3c01-4f4d-bd5e-9bb8b40acaa6/debug-vis-dynamic-instances.png)

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [global illumination](https://dev.epicgames.com/community/search?query=global%20illumination)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [光线追踪开销概览](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine#%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA%E5%BC%80%E9%94%80%E6%A6%82%E8%A7%88)
-   [底层加速结构更新](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine#%E5%BA%95%E5%B1%82%E5%8A%A0%E9%80%9F%E7%BB%93%E6%9E%84%E6%9B%B4%E6%96%B0)
-   [静态网格体组件上的世界位置偏移](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%84%E4%BB%B6%E4%B8%8A%E7%9A%84%E4%B8%96%E7%95%8C%E4%BD%8D%E7%BD%AE%E5%81%8F%E7%A7%BB)
-   [管理光线追踪内存开销](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine#%E7%AE%A1%E7%90%86%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA%E5%86%85%E5%AD%98%E5%BC%80%E9%94%80)
-   [顶层加速结构构建](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine#%E9%A1%B6%E5%B1%82%E5%8A%A0%E9%80%9F%E7%BB%93%E6%9E%84%E6%9E%84%E5%BB%BA)
-   [剔除](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine#%E5%89%94%E9%99%A4)
-   [光线遍历开销](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine#%E5%85%89%E7%BA%BF%E9%81%8D%E5%8E%86%E5%BC%80%E9%94%80)
-   [光线遍历调试可视化模式](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine#%E5%85%89%E7%BA%BF%E9%81%8D%E5%8E%86%E8%B0%83%E8%AF%95%E5%8F%AF%E8%A7%86%E5%8C%96%E6%A8%A1%E5%BC%8F)
-   [性能调试可视化](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine#%E6%80%A7%E8%83%BD%E8%B0%83%E8%AF%95%E5%8F%AF%E8%A7%86%E5%8C%96)
-   [遍历调试可视化](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine#%E9%81%8D%E5%8E%86%E8%B0%83%E8%AF%95%E5%8F%AF%E8%A7%86%E5%8C%96)
-   [击中着色开销](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine#%E5%87%BB%E4%B8%AD%E7%9D%80%E8%89%B2%E5%BC%80%E9%94%80)
-   [远场](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine#%E8%BF%9C%E5%9C%BA)
-   [其它光线追踪调试可视化模式](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine#%E5%85%B6%E5%AE%83%E5%85%89%E7%BA%BF%E8%BF%BD%E8%B8%AA%E8%B0%83%E8%AF%95%E5%8F%AF%E8%A7%86%E5%8C%96%E6%A8%A1%E5%BC%8F)
-   [Picker调试可视化模式](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine#picker%E8%B0%83%E8%AF%95%E5%8F%AF%E8%A7%86%E5%8C%96%E6%A8%A1%E5%BC%8F)
-   [动态实例调试可视化模式](/documentation/zh-cn/unreal-engine/ray-tracing-performance-guide-in-unreal-engine#%E5%8A%A8%E6%80%81%E5%AE%9E%E4%BE%8B%E8%B0%83%E8%AF%95%E5%8F%AF%E8%A7%86%E5%8C%96%E6%A8%A1%E5%BC%8F)
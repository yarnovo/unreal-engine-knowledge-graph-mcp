# 虚幻引擎中的可视性与遮挡剔除 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:24:06.234Z

---

目录

![可视性和遮挡剔除](https://dev.epicgames.com/community/api/documentation/image/84dfbaf1-05a1-44b2-85c4-1c8a9e494403?resizing_type=fill&width=1920&height=335)

虚幻引擎提供了可视性和遮挡剔除方法。这些剔除方法用于优化游戏性能。每种方法都可以通过设置是否应绘制到屏幕上来减少关卡中的可见Actor数量。部分方法（如[视锥体](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#viewfrustum)和[硬件遮挡查询](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#hardwareocclusionqueries)）可以同时使用，或者更好地适应特定设备和平台（如用于虚拟现实的[轮询遮挡](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#roundrobinocclusionforvr)）。

## 剔除的工作原理

为了解虚幻引擎默认提供的未经任何设置的功能，我们将具体查看视图视锥剔除和硬件遮挡查询。

可视性和遮挡剔除方法的大体思路是减少任意给定时刻的可见对象数量，从而达到优化性能的目的。

例如，如果我们从摄像机位置能够看到的视野来看，只能看到少量对象（场景视图）。但是，我们知道这不是整个场景，因为这个场景是由许多对象构成的，只是这些对象从这个位置看不到（俯视场景视图）。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c09f2ead-4010-437e-9b1c-7e9bdbfa7bac/sceneview.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c09f2ead-4010-437e-9b1c-7e9bdbfa7bac/sceneview.png)

场景视图

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/390d5ba5-71fd-4154-9210-0461987b3759/topdownsceneview.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/390d5ba5-71fd-4154-9210-0461987b3759/topdownsceneview.png)

自顶向下场景视图

摄像机视野（视图视锥）外部的对象不可见，可以被剔除（红色轮廓的对象）。

![场景视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a33a247e-405b-46c7-b9b8-16c8b3607a87/sceneviewbase.png)

![场景视图 | 除去了视图视锥剔除对象](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06e0d5bf-a9e9-42b2-b5dc-c98a83a12011/sceneview_viewfrustumculled.png)

场景视图

场景视图 | 除去了视图视锥剔除对象

不再渲染摄像机视图视锥外部的被剔除对象，这样该视图中只会留下少量的被其他对象遮挡的对象，需要检查它们是否可见。因此，在这个阶段，会向GPU发送查询来测试每个对象的可视性状态。被另一个对象遮挡的对象会从视图中剔除（蓝色轮廓的对象）。

![场景视图 | 只有视图视锥中的对象](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2696c82c-f6a6-4958-be43-2926119580fa/sceneviewwithonlyoccludedobjects.png)

![被遮挡对象| 位于剔除视图视锥中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c37d713f-06a9-492c-9d19-762f828ef1e4/sceneview_occludedobjectsremoved.png)

场景视图 | 只有视图视锥中的对象

被遮挡对象| 位于剔除视图视锥中

视图视锥外部或被遮挡的所有对象现在都从视图中剔除。最终场景视图现在与我们已知在场景中从摄像机位置能够看到的对象相匹配。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bab41a41-da05-4c9a-8ef4-d1f24a76a970/vis_finalsceneview.png "Vis_FinalSceneView.png")

虚幻引擎提供了多种剔除方法，每种都有自己的优势和劣势，有些方法可供特定平台使用。

有关更多信息，请参阅下文的[剔除方法](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#cullingmethods)。

### 使用Actor边界测试可视性

关卡中放置的每个Actor都有一组使用箱体和球体形成的边界，在引擎中用于多种目的。每个边界都能专门用于测试是否可见。Actor的边界由两部分组成：球体和箱体。边界球体用于简单距离测试的快速碰撞检测，通常，尺寸比其包含的对象要大。另一方面，边界箱体更接近于对象形状，提供更准确的结果。

选择 **显示（Show）>高级（Advanced）>边界（Bounds）** 可以在关卡视口中显示Actor的边界。或者，在骨架网格体编辑器中，你可以选择 **角色（Character）>边界（Bounds）**，然后在静态网格体编辑器中，从主工具栏选择 **边界（Bounds）**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b3c3976-dac5-4e58-aa2a-96b9d9a6d741/actorbounds.png "ActorBounds.png")

显示了边界（球体和箱体）的Actor

每个静态网格体和骨架网格体都有其自己的边界箱体和球体，它们会在导入时、在视口中伸缩或旋转时自动缩放为几何结构的大小。

你可以使用以下方法编辑Actor的边界：

-   在关卡或蓝图中选中后，在 **细节（Details）** 面板中设置 **边界缩放（Bounds Scale）**。**边界缩放（Bounds Scale）** 统一地缩放Actor的边界，相当于原始比例值的乘数。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b24ac9f-56d0-43e5-93b9-ee469bbc3c78/peractorboundssettingsdetailspanel.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b24ac9f-56d0-43e5-93b9-ee469bbc3c78/peractorboundssettingsdetailspanel.png)
    
    点击查看大图。
    
-   打开静态网格体或骨架网格体编辑器，使用 **细节（Details）** 面板对 **正边界扩展（Positive Bounds Extension）** 和 **负边界扩展（Negative Bounds Extensions）** 应用非等分缩放。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd26a471-0e62-4603-b30c-c72f7a92a3c1/actoreditorboundsextension.png "ActorEditorBoundsExtension.png")

增大Actor边界会更快速地剔除Actor，因此可能会对性能和阴影质量造成潜在影响。

## 剔除方法

剔除方法用于跟踪关卡中每个Actor的可视性状态。场景数据根据项目所采用的方法进行剔除和测试。

以下剔除方法根据成本按照以下顺序应用：

-   [距离](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E8%B7%9D%E7%A6%BB)
-   [视图视锥](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E8%A7%86%E5%9B%BE%E8%A7%86%E9%94%A5)
-   [预计算可视性](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E9%A2%84%E8%AE%A1%E7%AE%97%E5%8F%AF%E8%A7%86%E6%80%A7)
-   [动态遮挡](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E5%8A%A8%E6%80%81%E9%81%AE%E6%8C%A1)

默认情况下，虚幻引擎对所有项目均使用视图视锥剔除和硬件遮挡查询（动态遮挡）。如果你的项目包含大量Actor，可能会影响GPU性能，尤其是场景视图中有大量Actor的情况。

### 距离

距离剔除方法（如按Actor设置和[剔除距离体积](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E5%89%94%E9%99%A4%E8%B7%9D%E7%A6%BB%E4%BD%93%E7%A7%AF)）根据Actor离摄像机的距离来渲染或不渲染Actor。

#### 按Actor距离

关卡中的每个Actor都有自己的绘制距离设置，可以使用 **细节（Details）** 面板进行设置。在这里，你可以设置应渲染该Actor的距离摄像机的最小和最大绘制距离（用虚幻单位）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/326c185f-95bf-4cdf-96cd-392363ee34bb/peractordistancecullingsettings.png "PerActorDistanceCullingSettings.png")

使用Actor的绘制距离设置进行以下设置：

-   应从摄像机看到Actor的 **最小绘制距离（Minimum Draw Distance）**。这是在不再渲染Actor之前能够接近Actor的最近距离。
-   应从摄像机看到Actor的 **最大绘制距离（Maximum Draw Distance）**。这是在不再渲染Actor之前能够远离Actor的最远距离。
-   你可以查看（但不能编辑）**当前最大绘制距离（Current Maximum Draw Distance）**。它显示[剔除距离体积](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E5%89%94%E9%99%A4%E8%B7%9D%E7%A6%BB%E4%BD%93%E7%A7%AF)（如果存在）设置的已存储剔除距离。

#### 剔除距离体积

**剔除距离体积（Cull Distance Volumes）** 使用一个距离和大小数组来设置进入体积后是否渲染Actor。该剔除方法是包含某种类型的建筑物或结构的大型户外关卡的理想选择，这些建筑物或结构拥有细节丰富的内部设计，需要剔除体积过小而在远距离处并不重要的对象。

有关更多信息，请参阅[剔除距离体积](/documentation/zh-cn/unreal-engine/cull-distance-volumes-in-unreal-engine)。

### 视图视锥

**视图视锥（View Frustum）** 剔除使用摄像机视野（FOV）的可见屏幕区域来剔除不在该空间的对象。该视图视锥是一个金字塔形状，包含一个近端和远端裁切平面，定义了应在该空间内可见的最近和最远对象。所有其他对象都被删除以节省处理时间。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44b645ce-90ac-4f5f-b857-5d5e13322536/viewfrustumdiagram.png "ViewFrustumDiagram.png")

1.  **近端裁切平面（Near Clipping Plane）** 是能够看到对象的最接近摄像机的点。
2.  **摄像机视锥（Camera Frustum）** 是近端和远端裁切平面之间的可视查看区域的金字塔形状表示。
3.  **远端裁切平面（Far Clipping Plane）** 是能够看到对象的离摄像机最远的点。

在关卡视口中编辑时，选择 **显示（Show）>高级（Advanced）** 并启用 **摄像机视锥（Camera Frustum）**，可以显示视图视锥。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/811c2ab0-6e5b-4e0d-af0b-bf0d96da6143/viewfrustumscenecamerafrustum.png "ViewFrustumSceneCameraFrustum.png")

启用摄像机视锥可视化。

有关更多信息，请参阅上文的[剔除的工作原理](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E5%89%94%E9%99%A4%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86)部分。

### 预计算可视性

**预计算可视性体积（Precomputed Visibility Volumes）** 在阴影投射表面上的单元格中存储不可以动Actor的可视性状态。该剔除方法生成离线可视性数据（在照明构建期间），最适用于中小型关卡。预计算可视性是低端硬件和移动设备的理想选择。对于这类硬件和设备，就性能成本而言，你可以节省更占用运行时内存的渲染线程成本，而就性能而言有更大的灵活性。

有关更多信息，请参阅[预计算可视性体积](/documentation/zh-cn/unreal-engine/precomputed-visibility-volumes-in-unreal-engine)。

### 动态遮挡

动态遮挡系统提供了几种剔除方法可供选择。每种方法跟踪关卡中位于摄像机视图视锥（或视野）内并被另一个Actor遮挡的Actor的可视性状态。查询将发出到GPU或CPU以检查每个Actor的可视性状态。使用启发法减少所需可视性检查次数，继而提高总体剔除效率和性能。

虚幻引擎在发出遮挡查询时使用场景深度缓冲。它支持更长的视图距离，因为它依赖于近似距离，而不是最大绘制距离（或远端裁切平面）。使用深度缓冲让可移动或不可以动Actor能够遮挡另一个Actor或被另一个Actor遮挡，包括在不透明或遮罩混合模式下使用材质的Actor。

#### 硬件遮挡查询

所采用的主要动态遮挡方法是 **硬件遮挡查询**，这种方法作为每个Actor一个查询的形式，每一帧向GPU发出一次可视性检查。Actor的可视性一帧后读取回来，有时这会产生负面作用，导致它们在摄像机快速移动时"弹出"。硬件遮挡成本取决于GPU上执行的查询数量。使用距离和预计算可视性方法减少GPU每帧执行的查询数量。

硬件遮挡查询默认是启用的，在支持它的任何平台上均有效，包括[iOS](/documentation/zh-cn/unreal-engine/ios-ipados-and-tvos-support-for-unreal-engine)上支持**ES 3.1**或更高版本和[Android](/documentation/zh-cn/unreal-engine/android-support-for-unreal-engine)上支持**Vulkan**的更高端移动设备。不支持硬件遮挡查询的设备可以禁用，方法是从 **项目设置（Project Settings）** 的 **渲染（Rendering）>剔除（Culling）**下面，取消选中 **遮挡剔除（Occlusion Culling）** 或在设备配置文件中设置以下控制台变量：

```cpp
      r.AllowOcclusionQueries=0

```

有关动态遮挡成本的更多信息，请参阅下文的[性能统计信息](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E6%80%A7%E8%83%BD%E7%BB%9F%E8%AE%A1%E4%BF%A1%E6%81%AF)。

##### 层级Z缓冲遮挡

**层级Z缓冲**（HZB）遮挡的工作方式与硬件遮挡查询类似，唯一不同的是它的剔除对象方式更保守，意味着结果会剔除更少的对象。它使用Mip映射版本的场景深度渲染目标以检查Actor的边界。此外，从较低MIP采样时也会需要更少的纹理存取。

要启用HZB遮挡，可以使用以下控制台命令：

```cpp
      r.HZBOcclusion=1
```

#### 面向VR的轮询遮挡

**轮询遮挡（Round Robin Occlusion）** 是一种动态遮挡查询方法，通过每帧交替双眼的视觉效果来提高立体渲染性能。遮挡数据会增加一帧延迟，导致周围渲染不准确，但优点是轮询遮挡省去了整帧查询。这种节省带来的好处对于绘制调用或可视性边界场景最有帮助。

在.ini配置文件或在运行时使用以下控制台变量来启用轮询遮挡：

```cpp
     vr.RoundRobinOcclusion=1
```

## 性能统计信息

无论游戏大小多大，一个最重要的开发阶段是性能优化。从场景剔除对象是优化性能的好方法。统计信息窗口使你可以查看关于可视性和遮挡剔除性能的各种统计数据。

例如，对于预计算可视性，你需要留意运行时加载剔除对象数据所用的内存。对于硬件遮挡查询，如果遇到性能问题，例如卡顿或迟滞，你需要检查任何给定帧期间发送到GPU的Primitive数量。

在控制台窗口中输入 **stat initviews** 可以调用统计信息窗口。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fca47d92-e02d-4a6f-a5a4-6acf6f7a3ae1/statinitviews.png "StatInitViews.png")

显示的统计信息拆分到两个部分：**循环计数器（Cycle Counters）** 和**计数器（Counters）**。循环计数器（Cycle Counters）统计信息侧重于处理Primitive所用的渲染循环数量，以毫秒（ms）计。这里你应重点关注 **视图可视性（View Visibility）**、**遮挡剔除（Occlusion Cull）**、**视图相关性（View Relevance）** 和 **视锥剔除（Frustum Cull）**。计数器（Counters）统计信息添加已经在当前视图中处理的所有Primitive。

在测试可视性和遮挡剔除时需要记住以下几点：

-   遮挡剔除在 **线框** 视图模式下是禁用的。
-   在视口中工作时，使用热键 **G** 来切换到游戏模式视图，以查看某些剔除方法，例如剔除距离体积或预计算可视性体积。
-   为获得最准确结果，在 **在编辑器中运行**（PIE）或 **独立游戏（Standalone Game）** 中使用Stat InitViews统计信息。在计算可视性和遮挡剔除结果时，将包含表示光源、摄像机和其他对象的Actor的几何结构。
-   留意 **可见静态网格体元素（Visible Static Mesh Elements）**，因为这是对渲染线程时间影响最大的一个因素，应该仔细观察并优化。

统计信息名称

描述

循环计数器（Cycle Counters）

 

**视图可视性（View Visibility）**

用于处理Actor可视性查询的帧时间量。

**遮挡剔除（Occlusion Cull）**

用于查询场景中是否存在被其他Actor遮挡且位于视图视锥中的Actor所用的帧时间量。

**视锥剔除（Frustum Cull）**

用于查询Actor边界是否在视图视锥内的帧时间量。

**解压遮挡（Decompress Occlusion）**

显示加载预计算可视性所用的帧时间量。

计数器（Counters）

 

**处理的Primitive（Processed Primitives）**

场景中被处理的Actor总数。

**视锥剔除Primitive（Frustum Culled Primitives）**

不在视图视锥FOV中时被剔除的Primitive数量。

**被遮挡的Primitive（Occluded Primitives）**

在视图视锥FOV中被其他Actor遮挡的Actor数量。

**遮挡查询（Occlusion Queries）**

根据视图视锥中可见的Actor数量，发送到GPU的场景遮挡查询数量。

**可见动态Primitive（Visible Dynamic Primitives）**

场景中将移动性设置为"可移动"（Movable）的动态Primitive数量，如粒子系统和植被实例。

**可见静态网格体Primitive（Visible Static Mesh Primitives）**

场景中移动性设置为"静态"（Static）的可见网格体数量。

## 调试剔除

下面是可以用于可视性和遮挡剔除的调试选项。

### 可视化被遮挡Actor

在编辑器中工作时，可以使用可视化命令检查Actor是否被遮挡。

```cpp
     r.VisualizeOccludedPrimitives 1

```

启用时，将围绕着任何被遮挡Actor绘制一个绿色边界框。

如果你的关卡中有大量Actor，在不隐藏部分关卡及其包含的Actor的情况下，该可视化可能并不是有效的调试方法。

![可视化的被遮挡Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d9fdc44-ebaa-45f3-ad84-907879280295/visoccludedactors1.png)

![隐藏几何结构 | 以显示被遮挡的Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/280a3093-63a8-4021-a2b4-8d01a1b5376a/visoccludedactors2.png)

可视化的被遮挡Actor

隐藏几何结构 | 以显示被遮挡的Actor

在该示例中，请注意，只有完全被墙壁和门挡住的Actor被遮挡了。右侧通过墙壁上的孔能够看到的Actor并没有完全被挡住。

### 冻结场景渲染

在编辑器中工作时，可以"冻结"关卡中Actor的渲染状态，这样可以在关卡视口中自由移动并检查遮挡结果。

从所需视图输入命令`FreezeRendering`，如以下示例所示。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8955d630-b975-48b3-8191-8b1f93edc42c/freezerendering.png "FreezeRendering.png")

输入后，在场景中自由移动以查看遮挡结果。画面移到墙壁后面后，会看到没有渲染完全被遮挡的对象，但仍会渲染没有被完全遮挡的Actor。

![普通场景视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4143f4d7-2abf-4588-840f-757c7d76f584/freezerenderingstate2.png)

![从原始摄像机视图 | 冻结渲染](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3d46d31-dd1e-4a98-a9af-6989d717da1d/freezerenderingstate1.png)

普通场景视图

从原始摄像机视图 | 冻结渲染

使用以下命令冻结其他类型Actor的渲染状态：

控制台命令

描述

**FreezeRendering**

根据摄像机视图，暂停/取消暂停关卡中被遮挡和可见Actor的当前渲染状态。

**Foliage.Freeze**

根据摄像机视图，暂停关卡中被遮挡和可见着色植被集群的当前渲染状态。

**Foliage.Unfreeze**

取消暂停关卡中被遮挡和可见着色植被集群的渲染状态。

**FX.FreezeParticleSimulation**

暂停/取消暂停关卡中任何CPU Sprite粒子模拟。

**FX.FreezeGPUSimulation**

暂停/取消暂停关卡中任何GPU Sprite粒子模拟。

### 使用游戏视图模式

在编辑器中工作时，你可以使用 **游戏视图（Game View）** 模式来了解游戏会有怎样的效果。通过这种视图模式，你可以在任何运行模式下（如编辑器中运行（PIE）模式或独立游戏）直观地看到游戏效果，同时仍可以在场景中四处移动并自由地编辑对象。

在编辑器中工作时，使用键盘快捷键 **G** 或使用视口下拉菜单，并选择 **游戏视图** 来启用游戏视图。

![编辑器视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/247f9921-ff73-49a3-8d7f-d94df1a6805b/gameview1.png)

![游戏视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f41c5a8c-edab-4e7b-9a3e-0cb7bd1b1135/gameview2.png)

编辑器视图

游戏视图

启用 **游戏视图（Game View）** 时，Actor图标会被隐藏（就像在游戏中一样），例如照明和粒子系统的Actor图标。如果使用[剔除距离体积](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E5%89%94%E9%99%A4%E8%B7%9D%E7%A6%BB%E4%BD%93%E7%A7%AF)或[预计算可视性体积](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E9%A2%84%E8%AE%A1%E7%AE%97%E5%8F%AF%E8%A7%86%E6%80%A7)（并且在单元格中），你会立即看到这些体积的剔除结果，具体取决于它们的的剔除强度。

-   [performance](https://dev.epicgames.com/community/search?query=performance)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [剔除的工作原理](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E5%89%94%E9%99%A4%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86)
-   [使用Actor边界测试可视性](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E4%BD%BF%E7%94%A8actor%E8%BE%B9%E7%95%8C%E6%B5%8B%E8%AF%95%E5%8F%AF%E8%A7%86%E6%80%A7)
-   [剔除方法](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E5%89%94%E9%99%A4%E6%96%B9%E6%B3%95)
-   [距离](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E8%B7%9D%E7%A6%BB)
-   [按Actor距离](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E6%8C%89actor%E8%B7%9D%E7%A6%BB)
-   [剔除距离体积](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E5%89%94%E9%99%A4%E8%B7%9D%E7%A6%BB%E4%BD%93%E7%A7%AF)
-   [视图视锥](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E8%A7%86%E5%9B%BE%E8%A7%86%E9%94%A5)
-   [预计算可视性](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E9%A2%84%E8%AE%A1%E7%AE%97%E5%8F%AF%E8%A7%86%E6%80%A7)
-   [动态遮挡](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E5%8A%A8%E6%80%81%E9%81%AE%E6%8C%A1)
-   [硬件遮挡查询](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E7%A1%AC%E4%BB%B6%E9%81%AE%E6%8C%A1%E6%9F%A5%E8%AF%A2)
-   [层级Z缓冲遮挡](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E5%B1%82%E7%BA%A7z%E7%BC%93%E5%86%B2%E9%81%AE%E6%8C%A1)
-   [面向VR的轮询遮挡](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E9%9D%A2%E5%90%91vr%E7%9A%84%E8%BD%AE%E8%AF%A2%E9%81%AE%E6%8C%A1)
-   [性能统计信息](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E6%80%A7%E8%83%BD%E7%BB%9F%E8%AE%A1%E4%BF%A1%E6%81%AF)
-   [调试剔除](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E8%B0%83%E8%AF%95%E5%89%94%E9%99%A4)
-   [可视化被遮挡Actor](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E5%8F%AF%E8%A7%86%E5%8C%96%E8%A2%AB%E9%81%AE%E6%8C%A1actor)
-   [冻结场景渲染](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E5%86%BB%E7%BB%93%E5%9C%BA%E6%99%AF%E6%B8%B2%E6%9F%93)
-   [使用游戏视图模式](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%B8%B8%E6%88%8F%E8%A7%86%E5%9B%BE%E6%A8%A1%E5%BC%8F)
# 虚幻引擎中的虚拟阴影贴图 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:16:56.607Z

---

目录

![虚拟阴影贴图](https://dev.epicgames.com/community/api/documentation/image/6f06bd10-9362-4148-9325-90d9043c2f20?resizing_type=fill&width=1920&height=335)

**虚拟阴影贴图（VSM）**是一种全新的阴影映射方法，可以提供稳定的高分辨率阴影，通过与虚幻引擎5的[Nanite虚拟几何体](designing-visuals-rendering-and-graphics\rendering-optimization\nanite)、[Lumen全局光照和反射](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)以及[世界分区](building-virtual-worlds/world-partition)功能结合使用，它能够处理电影级品质的资产，为大型开放世界提供动态光照。

## 虚拟阴影贴图的目标

虚拟阴影贴图的开发目标如下：

-   显著提升阴影分辨率，以便配合拥有高度细节内容的[Nanite](designing-visuals-rendering-and-graphics\rendering-optimization\nanite)几何体
    
-   以合理、可控的性能开销，获得真实的柔和阴影
    
-   提供一个简单解决方案，能够默认使用，并且只需少量的调整工作
    
-   用单一、统一的方法替代各种固定光源阴影技术
    

从概念上讲，虚拟阴影贴图只是分辨率非常高的阴影贴图。 在目前的实现中，它们的虚拟分辨率为16k x 16k像素。 裁剪图（Clipmap）用于进一步提高定向光源的分辨率。 为了在合理内存开销下保证高性能，VSM会将阴影贴图分成128x128个区块（或页，Page）。 系统会对深度缓冲进行分析，根据需要动态地分配并渲染页，来对屏幕上的像素进行着色。 页会在不同帧之间缓存（除非因为移动对象或光源而失效），从而进一步提升性能。

Nanite不支持许多固定光源相关的阴影技巧，例如预阴影和逐对象（或内嵌）阴影。 虽然固定光源阴影的某些偏动态部分（例如摄像机查看器附近的级联阴影贴图）可能可行，但并不支持具有传统阴影贴图的Nanite和固定光源。 如果你想在项目中使用Nanite，你必须使用可移动光源或使用虚拟阴影贴图。

## 启用虚拟阴影贴图

在项目设置（Project Settings）的**引擎（Engine）>渲染（Rendering）**的**阴影（Shadows）**分段中，你可以设置项目支持的**阴影贴图方法（Shadow Map Method）**，可以是**虚拟阴影贴图（Virtual Shadow Maps）**，也可以是旧版虚幻引擎中的传统**阴影贴图（Shadow Maps）**。

现有项目需要使用项目设置或控制台变量`r.Shadow.Virtual.Enable`来设置。 新项目默认使用虚拟阴影贴图。

[![](https://dev.epicgames.com/community/api/documentation/image/83b29fc4-886a-4121-8b3e-ac42250fd7ed?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/83b29fc4-886a-4121-8b3e-ac42250fd7ed?resizing_type=fit)

### 启用VSM后，现有阴影渲染方法会发生什么情况？

启用VSM后，它们将替换虚幻引擎中的各种现有阴影方法，包括：

-   固定预计算阴影，包括2D距离场和阴影因子"阴影贴图"
    
-   预阴影
    
-   逐对象/内嵌阴影
    
-   级联阴影贴图（CSM）
    
-   基于局部光源的可移动动态阴影
    

用于静态光源的全烘焙阴影（Fully baked shadows）仍会像以前一样运作（假设不使用Lumen）。 它们的贡献只体现在烘焙光照贴图中，不会参与运行时的光照计算。 固定光源会采纳来自烘焙光照贴图的间接漫反射信息，但启用VSM后，它们的直接光照与阴影会动态计算生成（与可移动光源相同）。

[距离场阴影](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/distance-field-soft-shadows-in-unreal-engine)不会被替换，可以与定向光源的虚拟阴影贴图配合使用。 距离场阴影替代超出可移动光源动态阴影距离的非Nanite几何体，该距离使用级联阴影贴图属性**动态阴影距离可移动光源（Dynamic Shadow Distance Movable Light）**在定向光源上设置。 使用距离场阴影非常有用，可以降低复杂场景中的运行时开销，例如有大量[非Nanite植被](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine)的场景。

无论距离如何，Nanite几何体始终渲染到虚拟阴影贴图，因为这是性能最高的选项，可提供最高质量。 你可以使用控制台变量 `r.Shadow.Virtual.UseFarShadowCulling 0`使非Nanite几何体的行为方式与Nanite相同。

局部光源（点光源和聚光光源）不受影响，为这些光源选择的距离场阴影仍将覆盖当前的阴影贴图方法。

由于VSM自身的高分辨率和高精度属性，不再需要通过屏幕空间接触阴影（Contact Shadow）功能（通过接触阴影长度（Contact Shadow Length）属性控制）来获得锐利的接触阴影效果。 在为某些对象（不会渲染进阴影贴图的对象）渲染低开销阴影时，它仍然有用，但其他情况下不推荐用它，因为它的精度要比VSM创建的阴影低。

光线追踪阴影的优先级仍然高于VSM，因为它们通常提供最高质量的解决方案。

## 基于阴影贴图光线追踪的柔和阴影

**阴影贴图光线追踪（Shadow Map Ray Tracing, SMRT）**是一种结合虚拟阴影贴图的采样算法，能生成更为真实的柔和阴影和接触硬阴影。 对象投射的远处阴影比近处阴影拥有更柔和的效果。 例如，下图中的网格体很高，其阴影会投射到很远的距离。 靠近底部的阴影比远处的阴影更清晰锐利。

[![](https://dev.epicgames.com/community/api/documentation/image/ee68e1d0-e8fd-4480-bdb6-6b096b429473?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ee68e1d0-e8fd-4480-bdb6-6b096b429473?resizing_type=fit)

示例使用了阴影贴图光线追踪后的点光源阴影效果，近处为接触硬阴影，远处为柔和阴影。

传统的百分比渐近筛选（Percentage-Closer Filtering，PCF）法会导致过度模糊，并降低高分辨率几何体和阴影的视觉影响。

![百分比渐近筛选均匀模糊， | 重要细节丢失](https://dev.epicgames.com/community/api/documentation/image/e12f2b80-a660-4c3c-b790-1dd5d9d54299?resizing_type=fit&width=1920&height=1080)

![阴影贴图光线追踪生成 | 带接触硬化的真实柔和阴影](https://dev.epicgames.com/community/api/documentation/image/2c9ee547-b046-4b9b-a336-1ae07204f3a0?resizing_type=fit&width=1920&height=1080)

百分比渐近筛选均匀模糊， | 重要细节丢失

阴影贴图光线追踪生成 | 带接触硬化的真实柔和阴影

SMRT算法的工作原理是向光源发射一定数量的光线，但它并不像传统的光线追踪一样计算与几何体的相交点，而是沿光线投射一定数量的取样，并针对虚拟阴影贴图进行测试，以实现柔和阴影和接触硬化效果。 阴影光线的分布是基于光源的，可使用局部光源的**源半径（Source Radius）**或定向光源的**源角度（Source Angle）**控制。

[![](https://dev.epicgames.com/community/api/documentation/image/de58fe4d-c4f5-4263-9ae4-f816011b2bff?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/de58fe4d-c4f5-4263-9ae4-f816011b2bff?resizing_type=fit)

[![](https://dev.epicgames.com/community/api/documentation/image/16adf910-e87c-4f94-922e-497be7a86c50?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/16adf910-e87c-4f94-922e-497be7a86c50?resizing_type=fit)

局部光源半径

定向光源角度

局部光源默认没有光源半径，相比之下，定向光源初始拥有低光源角度。 只要设置的值比较合适，SMRT就能生成带有接触硬化效果的实时柔和阴影。下图就展示了源半径为10的点光源阴影效果。

![源半径为0的点光源](https://dev.epicgames.com/community/api/documentation/image/f3f7d4b0-31eb-4d7f-8832-d18011852738?resizing_type=fit&width=1920&height=1080)

![源半径为10的点光源](https://dev.epicgames.com/community/api/documentation/image/fdafc1d0-8fb9-4c45-84f2-62f89ebf280c?resizing_type=fit&width=1920&height=1080)

源半径为0的点光源

源半径为10的点光源

### 控制半影品质

局部光源和定向光源照射下的半影的柔和度和品质可通过控制台变量来设置。 它们包含自身的可扩展性设置，通常适用于大多数场景。

半影中的噪点受所用光线数量的影响，当**阴影（Shadows）**的可伸缩性设置为**超高（Epic）**时，局部光源和定向光源默认使用8条光线。

你可以使用控制台变量`r.Shadow.Virtual.SMRT.RayCountLocal`和`r.Shadow.Virtual.SMRT.RayCountDirectional`来调整光线数量。 光线数量较少时，半影中显示可见噪点。 关联控制台变量设置为0时，则禁用SMRT并采用单一取样硬阴影。

![定向光源角度：5.0 | SMRT光线数量：1](https://dev.epicgames.com/community/api/documentation/image/2d711cb0-622e-4fce-9a00-7d100b87dfd3?resizing_type=fit&width=1920&height=1080)

![定向光源角度：5.0 | SMRT光线数量：7（默认值）](https://dev.epicgames.com/community/api/documentation/image/728b7941-957f-4f6c-898a-a72217fea3df?resizing_type=fit&width=1920&height=1080)

定向光源角度：5.0 | SMRT光线数量：1

定向光源角度：5.0 | SMRT光线数量：7（默认值）

此外，你可以为局部光源和定向光源设置每条光线路径的阴影取样数量，以控制最大柔和度。 阴影贴图取样数量越低，渲染开销越低，但是会限制光源阴影所能实现的半影柔和度。 要实现比**阴影（Shadow）**可伸缩性设置更精细的控制，控制台变量`r.Shadow.Virtual.SMRT.SamplesPerRayLocal`和`r.Shadow.Virtual.SMRT.SamplesPerRayDirectional`可以调整使用的样本数量。 取样数量在4和8之间时效果较好。

![图中的定向光源角度为5.0时，拖动滑块即可查看阴影贴图取样数量分别为0、2和8（默认值）时的效果。](https://dev.epicgames.com/community/api/documentation/image/393a82b7-0d09-4898-9264-8e9be564b26b?resizing_type=fit&width=1920&height=1080)![图中的定向光源角度为5.0时，拖动滑块即可查看阴影贴图取样数量分别为0、2和8（默认值）时的效果。](https://dev.epicgames.com/community/api/documentation/image/69c72705-621e-420b-913f-6129f445871e?resizing_type=fit&width=1920&height=1080)![图中的定向光源角度为5.0时，拖动滑块即可查看阴影贴图取样数量分别为0、2和8（默认值）时的效果。](https://dev.epicgames.com/community/api/documentation/image/cd88f85f-2514-4d14-a047-53d25fedff46?resizing_type=fit&width=1920&height=1080)

**图中的定向光源角度为5.0时，拖动滑块即可查看阴影贴图取样数量分别为0、2和8（默认值）时的效果。**

### 阴影贴图光线追踪的局限性

SMRT的品质在默认设置下通常很不错，但假如使用来自单一阴影贴图投射的数据（而非针对真实几何体进行测试），就可能存在一些固有的局限性。

### 半影大小限制

局部光源和定向光源的阴影半影会被限制，以避免取样偏离光线原点，与沿光线自身的理想测试相比，其会变得越来越"弯曲"。 使用合理的局部光源半径和定向光源角度值可避免出现过于极端的结果，从而限制光线以各种方式发散的范围。 太大的值可能会影响性能，并在摄像机接近它们时导致阴影半影出现视觉扭曲。

局部光源和定向光源可以使用控制台变量`r.Shadow.Virtual.SMRT.MaxRayAngleFromLight`和`r.Shadow.Virtual.SMRT.RayLengthScaleDirectional`来放宽或收紧限制范围。

### 非一致半影

由于虚拟阴影贴图仅保存首个深度层，Naive迭代会忽略与首个深度层背后的所有遮挡物的相交，因此在遮挡物重叠的位置可能发生多种光照泄漏瑕疵。 这类光照泄漏问题可以通过间隙填充方法（gap-filling heuristic）来解决；此算法是基于在遮挡点之前看到的深度，来推断首个遮挡物后面的深度。

这能够很好地解决光照泄漏问题，但会导致表面上与光线平行的半影缩小。 目前还没有直接的方法来抵消这种影响，只能将半影大小保持在合理范围内。

[![](https://dev.epicgames.com/community/api/documentation/image/bac34b7a-c109-4508-9d6e-d654ef399e18?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/bac34b7a-c109-4508-9d6e-d654ef399e18?resizing_type=fit)

非一致半影阴影的例子。

### 半影瑕疵

默认情况下，虚拟阴影贴图只能保证光线原点（接收者像素）周围的取样将被呈现。 当算法遍历光线时，它可能会遇到未映射的页（阴影数据不存在）。 我们使用了多种技巧来减少这种影响，包括稍微扩展页映射，并在迭代过程中进行各类回退（fallback）。 但即便如此，由于页缺失而产生的瑕疵也会偶尔发生，在屏幕边缘放大软半影时尤其如此。 这些瑕疵将表现为阴影区域的噪点类型的光泄漏。 和VSM的其他局限性一样，通过将阴影半影尺寸保持在合理范围内，避免将阴影放大到覆盖屏幕的大部分区域的程度，就能避免此类问题。

## 定向光源的裁剪图

单张虚拟阴影贴图无法提供足够的分辨率来覆盖大型区域。 定向光源使用裁剪图（Clipmap）结构来扩展摄像机周围的范围，每个裁剪图级别都有其单独的16K VSM。 每个裁剪图级别的分辨率相同，但覆盖半径是前一个的两倍。

[![定向光源裁剪图的可视化效果](https://dev.epicgames.com/community/api/documentation/image/7f88d97a-10bf-42ba-a66c-ab230b672152?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/7f88d97a-10bf-42ba-a66c-ab230b672152?resizing_type=fit)

[![虚拟阴影贴图页的可视化效果](https://dev.epicgames.com/community/api/documentation/image/9d64638a-b25d-4c18-8304-2c2e346176ca?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9d64638a-b25d-4c18-8304-2c2e346176ca?resizing_type=fit)

定向光源裁剪图的可视化效果

虚拟阴影贴图页的可视化效果

默认情况下，裁剪图的6级到22级是分配过的虚拟阴影贴图页表。 这意味着默认设置下，细节丰富的裁剪图覆盖了摄像机位置周围64厘米（2^6厘米）的范围；范围最广的裁剪图覆盖了40公里（2^22厘米）的范围。 假如虚拟裁剪图级别中没有内容，其开销将十分微小，因此这些默认设置能很好地覆盖摄像机附近拥有较高分辨率的大型场景。

使用控制台变量r.Shadow.Virtual.Clipmap.FirstLevel和`r.Shadow.Virtual.Clipmap.LastLevel`可调整第一级和最后一级。

分配到给定像素的分辨率是一个关于裁剪图原点（摄像机位置）距离的函数。 这可以按阴影可伸缩性使用控制台命令`r.Shadow.Virtual.ResolutionLodBiasDirectional`来设置。 假如值为0，则将根据摄像机的透视投射来选择所需的分辨率。 当阴影投射到的表面与光线方向几乎平行时，仍然可能出现投影锯齿（projective aliasing），即使在高分辨率下也是如此，但可以通过调整分辨率来部分减轻这种情况。 就像纹理中的Mip偏移一样，将该值降低-1会使阴影的分辨率加倍，但也会带来相应的性能变化。 Epic阴影可扩展性设置为默认值-1.5为许多场景提供了合理的平衡。

## 局部光源

聚光光源使用单个16k VSM和一个Mip链来处理阴影的细节等级，而非使用裁剪图。 类似地，点光源使用的立方体贴图中，每张面都是16k VSM。

与传统阴影贴图相比，局部光源显著提高了分辨率。 对于非常大的局部光源来说，虚拟分辨率有可能会耗尽。在这些情况下，应注意尽可能使用定向光源。

![被聚光源照亮的场景](https://dev.epicgames.com/community/api/documentation/image/a1647034-db9b-410e-926e-96f98ad80b7a?resizing_type=fit&width=1920&height=1080)

![聚光源的虚拟阴影贴图页](https://dev.epicgames.com/community/api/documentation/image/60bfb746-285d-41f2-82c0-679a83957cb3?resizing_type=fit&width=1920&height=1080)

被聚光源照亮的场景

聚光源的虚拟阴影贴图页

通过将屏幕像素的大小投射到阴影贴图空间中，挑选合适的MIP等级。 与定向光源一样，你可以利用阴影可伸缩性设置或使用控制台变量`r.Shadow.Virtual.ResolutionLodBiasLocal`来调整分辨率。

目前还无法针对单个光源的分辨率进行控制，但可能会在未来版本中添加。

## 移动光源

固定光源大部分会被缓存，因此可以使用比移动光源高得多的分辨率。 考虑到固定和移动光源之间存在这种差异，可移动光源应该采用不同于固定光源的LOD偏差。 当光源停止移动时，会逐渐过渡到原始偏差。 你可以使用以下伸缩性控制台变量，来控制移动光源的LOD偏差：

-   `r.Shadow.Virtual.ResolutionLodBiasLocalMoving`
    
-   `r.Shadow.Virtual.ResolutionLodBiasDirectionalMoving`
    

## 半透明表面

虚拟阴影贴图支持对带有Substrate和旧版路径的半透明表面的进行高质量的阴影滤波处理。 这是全局选择加入功能，你可以使用控制台变量`r.Shadow.Virtual.TranslucentQuality`启用。 此控制台变量可控制被照亮的半透明表面的阴影质量。 这应用于所有半透明表面，并会带来很大的性能影响。 `r.Shadow.Virtual.TranslucentQuality`的设置：

-   大于1的值：为被照亮的半透明表面使用高质量阴影。
    
-   0：（默认值）为被照亮的半透明表面使用常规质量阴影。
    

## 粗页

深度缓冲分析是用于识别哪些页需要渲染的主要方法。 不过，有些系统需要在更加任意的位置上对阴影进行取样，例如[体积雾](building-virtual-worlds\lighting-and-shadows\environmental-lighting\volumetric-fog)和正向渲染的半透明度。 大多数系统只需要低分辨率阴影数据（这些数据通过其他数据结构的筛选和模糊）。

为应对这类情况，我们会标记**粗页（Coarse Pages）**来确保整个域中至少有低分辨率阴影数据可用于取样。 局部光源会标记根MIP页，定向光源会以各种低细节等级标记一系列页，从而生成一些粗略的裁剪图。 某些场景下，粗页可能会产生性能问题。 对于非Nanite动态几何体而言尤其如此，因为它们能在大型空间区域上有效地渲染低分辨率阴影，这可能造成绘制调用（draw-call）瓶颈。

建议使用控制台变量`r.Shadow.Virtual.NonNanite.IncludeInCoarsePages 0`尝试禁止非Nanite对象渲染到粗页。

许多场景（尤其是主要由Nanite几何体组成的场景）不需要非Nanite对象将阴影投射到体积雾和类似物体上。 禁用此功能可以显著提高性能。

如果不需要，可以使用`r.Shadow.Virtual.MarkCoarsePagesLocal`关闭局部光源粗页。 可以使用`r.Shadow.Virtual.MarkCoarsePagesDirectional`关闭定向光源粗页，或者可以使用`r.Shadow.Virtual.FirstCoarseLevel`和`r.Shadow.Virtual.LastCoarseLevel`修改标记粗页的裁剪图级别范围。

在未来的版本中，我们将提供更好的解决方案，例如提前根据局部页标记其中一些效果，而不是使用目前过于保守的粗页。

## 可视化

使用**视图模式（View Modes）**下拉菜单并选择**虚拟阴影贴图（Virtual Shadow Map）**，即可从关卡视口访问虚拟阴影贴图的可视化选项。

[![关卡视口虚拟阴影贴图视图模式选项](https://dev.epicgames.com/community/api/documentation/image/e8c1d922-001a-4529-bb5f-99750ddb56e0?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e8c1d922-001a-4529-bb5f-99750ddb56e0?resizing_type=fit)

可视化选项包括：

可视化名称

说明

**阴影遮罩（Shadow Mask）**

着色使用的最终阴影遮罩。

**裁剪图/Mip级别（Clipmap/Mip Level）**

选择的裁剪图（用于定向光源）或Mip（用于局部光源）级别。

**虚拟页（Virtual Page）**

虚拟页地址的可视化。

**缓存页（Cached Page）**

缓存页为绿色，未缓存页为红色。 仅缓存静态页（动态未缓存）的页为蓝色。

默认情况下，虚拟阴影贴图可视化显示定向光源的结果。 在**大纲视图（Outliner）**中选择光源，即可查看该光源的可视化效果。

你还可以使用控制台启用可视化（发布版本除外），这对于分析和调试实时游戏很有用。 如果在编辑器中设置了其中任一项，它们将重载通过编辑器的用户界面进行的模式选择。

可视化名称

说明

`r.Shadow.Virtual.Visualize [mode]`

当通过关卡视口（Level Viewport）或控制台命令将视图模式可视化设置为虚拟阴影贴图（Virtual Shadow Map）时，此命令指定要显示的通道。 使用下面的名称代替"\[模式\]"来启用该可视化。 **Cache**和**vpage**是用于可视化的两个常用选择，**none**可禁用VSM可视化。

-   mask
    
-   mip
    
-   vpage
    
-   cache
    
-   raycount
    
-   clipmapvirtual
    

`ShowFlag.VisualizeVirtualShadowMap`

指定可视化模式时，启用虚拟阴影贴图可视化。

`r.Shadow.Virtual.Visualize.Layout`

选择虚拟阴影贴图可视化的布局。

-   **0**表示全屏
    
-   **1**表示缩略图
    
-   **2**表示分屏
    

`r.Shadow.Virtual.Visualize.DumpLightNames`

将带有虚拟阴影贴图的当前光源列表输出到控制台。

在某些构建/运行时配置中，光源的名称可能与它们在编辑器的名称不同。

`r.Shadow.Virtual.Visualize.LightName [light name]`

按名称指定光源，接受部分或全部匹配。

要使用此控制台变量清除选择的光源，请指定一个不匹配任何名称的光源名称。 可以使用双引号（"）将其重置回未指定光源。

启用可视化模式对虚拟阴影贴图的性能有较小但明显的影响。 请务必在进行性能分析之前禁用可视化。

## 缓存

复用上一帧的阴影贴图页是保证虚拟阴影贴图高效运作的关键，这点在复杂场景中尤其如此。 缓存会默认启用，但可以使用控制台变量`r.Shadow.Virtual.Cache 0`禁用，以便进行调试。 即使启用缓存，虚拟阴影贴图也会遵守Nanite剔除距离。

由于页仅针对屏幕上的像素进行渲染，因此因解除遮挡的移动而改变摄像机可视性，可以显示需要渲染的新页。 一般来说，只要摄像机运动比较顺畅，这种情况不会成为新页的主要来源。 另一方面，你应该注意物体附近的快速移动、大面积遮挡解除和摄像机镜头切换。

在大多数场景中，最大的工作来源来自因场景几何体变化而需要重新绘制的阴影贴图页。 缓存页失效的常见来源包括：

-   任何光源移动或旋转都会使该光源的所有缓存页失效
    
-   投射移动阴影的几何体，或者在场景中添加或删除的几何体，将使从光源角度与其边界框重叠的所有页失效。
    
-   这可能包括对象，比如基元组件上的蓝图设置属性，这些属性会触发渲染状态失效，尽管它实际上并没有移动。
    
-   使用可能修改网格体位置的材质的几何体，例如世界位置偏移（WPO）或像素深度偏移（PDO）
    

在有缓慢移动光源或改变昼夜时间的移动定向光源的情况下，VSM页实际上根本不会缓存。 在像昼夜时间改变这样的情况下，建议对变化进行略微的量化，以便允许缓存页在一定数量的帧内存在，因为方向上的微小差异不明显。

在未来的版本中，添加优先系统和每帧更新预算应该会改进缓存，以便更精细地控制渲染阴影的开销。 例如，在需要更新的页过多的情况下，允许暂时降低阴影分辨率。

### 管理缓存失效

减少缓存失效的最好方法是首先发现失效，然后找到并减少导致它们的原因。 [缓存页可视化](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#visualization)是一个很好的起点。

[![虚拟阴影贴图缓存页的可视化效果](https://dev.epicgames.com/community/api/documentation/image/3ca1d30d-85ef-4609-86bf-c1cbdf492c0b?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/3ca1d30d-85ef-4609-86bf-c1cbdf492c0b?resizing_type=fit)

缓存页可视化

在此可视化中，完全缓存的页以**绿色**显示。 新页或失效页以**红色**显示。 当你移动摄像机时，你应该会在屏幕边缘、裁剪图边界和不被遮挡的几何体附近看到红色小环。 使用静态摄像机，大多数新页将来自缓存失效。

如果启用了单独的静态缓存（见下文），部分缓存（仅静态部分有效）的页将以**蓝色**显示。

一旦发现问题区域，使用控制台变量`r.Shadow.Virtual.Cache.DrawInvalidatingBounds 1`打开导致失效的对象边界的可视化，通常也很有用。 检查这些对象和边界，以便确保它们确实是预期会使阴影失效的对象，并且它们的边界尽可能紧密。 由于失效对象可能在其边界内重叠的所有页都必须失效，即使是适度膨胀的边界与低光源角度相结合，也可能导致许多不必要的失效。

[![虚拟阴影贴图缓存页失效边界的视化效果](https://dev.epicgames.com/community/api/documentation/image/57a01921-c75a-43be-a6fe-aa2b9d604649?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/57a01921-c75a-43be-a6fe-aa2b9d604649?resizing_type=fit)

缓存页和失效边界可视化

可以跳过完全在Nanite对象阴影中的失效，但对于非Nanite对象则不然。 因此，确保投射大型阴影的对象（例如建筑物）使用[Nanite](designing-visuals-rendering-and-graphics\rendering-optimization\nanite)就显得尤为重要。

你可以使用控制台变量`r.Nanite.VSMInvalidateOnLODDelta`在Nanite LOD流送更改时触发虚拟阴影贴图失效。 群集若未流送到与计算出的Nanite LOD估算相匹配的LOD中，会触发VSM失效，其在流送完成时会被重新渲染。 此功能是试验性的。 我们不推荐发布带有试验性功能的项目，而且此功能随时可能更改。

在复杂的场景中，即使使用这些可视化，有时也很难查明导致失效的原因。 另一个可以提供帮助的工具是**仅绘制导致VSM失效的几何体（Draw only Geometry Causing VSM Invalidation）**可视化模式，该模式位于关卡视口的**显示（Show） > 可视化（Visualize）**分段下。

[![虚拟阴影贴图仅绘制导致VSM失效的几何体的可视化](https://dev.epicgames.com/community/api/documentation/image/d80d4454-2c08-4ce4-bb05-99423e6aab28?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/d80d4454-2c08-4ce4-bb05-99423e6aab28?resizing_type=fit)

启用后，不会导致缓存失效的几何体将隐藏。

由于实现细节，**仅绘制导致VSM失效的几何体（Draw Only Geometry Causing VSM Invalidation）**模式偶尔会显示与阴影投射无关的对象（例如粒子和视觉效果），这些对象经过单独的渲染通道并将绘制在顶层。

使用此可视化时，统计数据不可靠，因为以不同的方式渲染主场景，将影响哪些页会映射和失效。 最好从其他[可视化模式](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#visualization)开始，并使用此项仔细检查。

[场景捕获组件](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine)的一个已知问题可能导致整个缓存无效化。

你可以使用按图元的枚举类阴影缓存失效行为来覆盖引擎默认的阴影失效行为。 这在防止静态世界位置偏移（WPO）造成的失效时非常有用。 选项包括：

-   **自动（Auto）**：（默认值）基于世界位置偏移材质和变换更改失效。
    
-   **始终（Always）**：始终使阴影失效，可用于标记正在使用系统不知道的某种动画制作方法的图元。
    
-   **严格（Rigid）**：禁止原本会因世界位置偏移等生成的失效。
    
-   **静态（Static）**：除了**严格（Rigid）**行为之外，还抑制由于变换而产生的失效。 添加/删除仍会触发失效。 如果移动图元或为其制作动画，则视觉效果不明确。
    

### 非Nanite变形和植被

使用骨骼动画可以变形的几何体，或使用世界位置偏移或像素深度偏移的材质，始终会使每帧的缓存页失效。 根据定义，这些情况也必须是非Nanite的（开销更高），因此确保谨慎使用这些功能且控制好边界非常重要。

对某些情况而言（例如草值和植被），仅使用[接触阴影](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/contact-shadows-in-unreal-engine)就足以替代高分辨率阴影贴图。 如果前景中需要细节丰富的阴影，请考虑以下事项以帮助降低性能开销：

-   非Nanite对象仍然遵循常规的阴影CPU剔除设置，例如`r.Shadow.RadiusThreshold`。 使用这些来帮助控制将这些对象渲染到虚拟阴影贴图的开销。
    
-   在有大量植被的场景中，强烈建议使用`r.Shadow.Virtual.NonNanite.IncludeInCoarsePages 0`禁用粗页中的非Nanite对象。 或者，如果不需要，请考虑[完全禁用粗页](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine)。
    
-   使用网格体LOD在效果不再明显的距离处切换到不使用WPO/PDO的材质。 在某些情况下，可以为远处的这些对象关闭动态阴影投射，并完全依赖屏幕空间接触阴影。
    

对于定向光源，还有其他可用选项：

-   距离场阴影会替代超出**动态阴影距离可移动光源**距离范围的非Nanite几何体，而该距离由光源的级联阴影贴图（Cascaded Shadow Maps）分段设置。 为远处的非Nanite切换到距离场阴影，可以大大提高性能，因为此几何体没有Nanite提供的细粒度LOD缩放。
    

### 单独的静态缓存

该功能尚处于**试验**阶段。

许多场景包含大量从未移动的静态几何体，以及非常少量的动态（或可移动）几何体。 默认情况下，这意味着开销相对较低的动态几何体使页失效，然后导致开销高昂的静态几何体被重新渲染，仅为了更新动态部分。

为了更好地优化这些情况，可以使用`r.Shadow.Virtual.Cache.StaticSeparate 1`启用可选的**单独的静态缓存（Separate Static Caching）**模式。 此模式将物理页池的大小加倍，以便给定页中的静态几何体可以与动态几何体分开缓存。 即使动态几何体移动，也无需重新绘制静态几何体。 相反，缓存静态页能以较低的开销在顶层合成。 在[遗迹峡谷](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine)这样的示例项目案例中，由于静态地貌开销非常高，而动态元素开销相对较低，这样做可以带来显著的性能优化。

使用此模式时，准确设置场景中[Actor的移动性](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/actor-mobility-in-unreal-engine)很重要。 特别是，如果设置为静态移动（Static Mobility）的Actor发生移动，甚至使用具有世界位置偏移的材质或类似不受支持的材质，会使动态和静态缓存页都失效，从而导致纯粹的开销而没有任何收益。 相反，如果开销高的几何体中太多的部分设置为可移动（Movable Mobility），那么单独缓存它可能没有什么益处。

虚拟阴影贴图统计数据非常适合用来获得静态缓存工作情况的简要概述。 特别是，"失效"静态页的数量应该接近0。 查找频繁使静态缓存失效的实例并将它们切换到可移动（Movable），是确保静态缓存保持有效的重要方法。

Nanite包含一种高级可视化模式，可帮助确定世界中的对象移动性，这对于虚拟阴影贴图也很有用。

[![虚拟阴影贴图Nanite VSM静态可视化](https://dev.epicgames.com/community/api/documentation/image/e423890e-f611-49a0-8b87-e449ee2ddc1e?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e423890e-f611-49a0-8b87-e449ee2ddc1e?resizing_type=fit)

Nanite的高级虚拟阴影贴图静态可视化模式

可以通过以下两种方式之一启用此可视化模式：

-   使用`r.Nanite.Visualize.Advanced 1`启用Nanite的高级可视化选项，然后使用关卡视口（Level Viewport），选择 **视图模式（View Mode） > Nanite可视化（Nanite Visualization）**，并从可视化选项列表中选择**静态虚拟阴影贴图（Virtual Shadow Map Static）**。
    
    [![高级Nanite视图模式选项](https://dev.epicgames.com/community/api/documentation/image/62a6c052-0917-40a5-b07e-0622b55a2fa6?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/62a6c052-0917-40a5-b07e-0622b55a2fa6?resizing_type=fit)
    
    点击查看大图。
    
-   你也可以使用命令`r.Nanite.Visualize vsmstatic`启用静态虚拟阴影贴图可视化。
    

## GPU分析和优化

虚幻引擎提供了帮助检查项目性能的工具。[GPU分析器](https://docs.unrealengine.com/4.27/TestingAndOptimization/PerformanceAndProfiling/GPU)（或特定于平台的工具）非常适合用于对性能问题进行故障排除和调试。

VSM开销将出现在两个主要的性能桶中：阴影深度和阴影投射（在光源下）。 它们每个类别的代价彼此相对独立。

请注意，用于列出统计数据的命令（如stat gpu和相关计数器）提供的计时有可能不可靠，项目性能受CPU限制的情况下尤其如此。

### 阴影深度

**阴影深度（Shadow Depths）**类别是指将几何体渲染到阴影贴图中的开销。

[![GPU分析阴影深度](https://dev.epicgames.com/community/api/documentation/image/aef47955-c357-4848-9066-3656e9155f77?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/aef47955-c357-4848-9066-3656e9155f77?resizing_type=fit)

-   **RenderVirtualShadowMaps(Nanite)**包含所有与Nanite几何体渲染到VSM中相关的内容。 所有定向光源都在单个Nanite通道中渲染，所有局部光源都在第二个通道中渲染。
    
-   **RenderVirtualShadowMaps（非Nanite）**将处理非Nanite几何体的渲染。 每个可见光源都有一个单独的通道，各种对象和实例拥有单独的绘制调用，这点与传统阴影贴图渲染相同。
    
-   **图集（Atlas）**和**立方体贴图（Cubemap）**与其他类似通道（包括VSM通道）一样，都只渲染传统阴影贴图。 在虚拟阴影贴图的路径中，仍有少部分类型的几何体不受支持，它们遵循传统路径。 如果没有不受支持的几何体投射阴影，这些通道将不会运行或分配阴影贴图存储。 这些通道和相关的开销可以使用控制台变量`r.Shadow.Virtual.ForceOnlyVirtualShadowMaps 1`完全禁用，在这种情况下，所有不受支持的几何体类型都完全不会投射阴影。
    

VSM的阴影深度通道的开销与需要渲染多少阴影页，以及需要在其中渲染几何体的多大部分直接相关。 相比Nanite几何体，非Nanite几何体渲染到VSM中的开销要高得多。 因此，**建议为所有受支持的几何体启用Nanite，包括低多边形网格体**。唯一例外的情况是[Nanite虚拟几何体](designing-visuals-rendering-and-graphics\rendering-optimization\nanite)暂不支持的功能。

#### 了解正在绘制的页数

通过屏幕上显示的VSM页统计数据，用户可以了解使用的页数，以及如何解决潜在问题。

连续使用以下控制台变量来启用统计数据：

-   `r.ShaderPrintEnable 1`
    
-   `r.Shadow.Virtual.ShowStats 1`（或2，以仅显示页统计数据）
    

[![虚拟阴影贴图页统计数据](https://dev.epicgames.com/community/api/documentation/image/cc076436-cb9b-4657-a9a5-cc8bfe88728a?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/cc076436-cb9b-4657-a9a5-cc8bfe88728a?resizing_type=fit)

统计数据名称

说明

**物理页数（Physical Pages）**

虚拟阴影贴图可使用的最大物理页数。

**已分配（Allocated）**

当前视图请求的阴影贴图总页数。 这应该始终小于最大页数，否则可能会发生损坏。 （请参阅下文的[问题与限制](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine)小节。）

**已清除（Cleared）**

当前帧中清除的新页数。

**已缓存（Cached）**

已存在于虚拟阴影贴图页缓存中，且无需在当前帧中渲染的页数。 缓存页的开销极低，对性能几乎没有影响。 当启用单独的静态缓存时，缓存静态页和缓存动态页会进一步拆分。

**已失效（Invalidated）**

前一帧中本已缓存，但因动态几何体而失效的页数。 这些页需重新渲染，因为某个对象移动而覆盖了它们。 当使用单独的静态缓存时，静态页的失效次数在理想情况下应该为零或非常接近零。 如果大量静态页失效，则导致失效的Actor应该切换到可移动（Movable）。

**已合并（Merged）**

当启用单独的静态缓存时，这是动态页和静态页的合并页数（由于其中一个未缓存）。

总页数取决于影响屏幕上各像素的光源的平均数量。 你可以通过降低屏幕分辨率、阴影分辨率（使用控制台变量来控制分辨率LOD偏差）、光照范围、或阴影投射光源的数量来降低它们。

阴影深度中的性能降低通常与使用了大量页和发生大量动态失效有关（这会导致VSM的缓存不足）。 如需详细了解诊断和减少缓存失效，请参阅[缓存](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#caching)小节。

#### 提升非Nanite性能

除了改进缓存之外，还有许多方法可以提高非Nanite阴影渲染的性能。

考虑以下事项以提高非Nanite对象的性能：

-   在你的项目的几何体中尽可能多的部分上启用Nanite。
    
    -   Nanite几何体在虚拟阴影贴图中的渲染效率要高得多，无论多边形数量如何，都应该在每个适用的情况下作为首选。
        
    -   Nanite几何体可以遮挡非Nanite几何体并避免虚假缓存失效。 因此，唯一的非Nanite对象应该是Nanite本身不支持的对象，例如变形对象（蒙皮网格体），或使用世界位置偏移（WPO）和像素深度偏移（PDO）的材质。
        
-   非Nanite对象应具有完整的网格体LOD层级设置。
    
    -   非Nanite网格体具有LOD设置很重要，否则渲染到小页的开销会非常高。
        
    -   如果可以，建议在距离太远而使效果不明显时切换到非变形网格体（无WPO/PDO材质）。
        
-   CPU剔除控制台变量对于渲染到虚拟阴影贴图的非Nanite网格体仍然有用
    
    -   使用控制台变量`r.Shadow.RadiusThreshold`，调整渲染到虚拟阴影贴图中的非Nanite对象的CPU剔除值。 这有助于控制远处小型对象的开销。
        
-   使用[距离场阴影](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/distance-field-soft-shadows-in-unreal-engine)进行非Nanite对象的远距离阴影投射
    
    -   对于定向光源，在超出某个范围时通常需要切换到距离场阴影，与级联阴影贴图相同。 使用虚拟阴影贴图，仅非Nanite几何体将切换到使用距离场阴影，而Nanite几何体仍采用全细节阴影。
        
-   在粗页中禁用非Nanite几何体可以提高性能
    
    -   在粗页中禁用非Nanite几何体通常可以实现大幅的性能提升，因为非Nanite几何体在渲染到大页中时通常效率低下。
        

虚拟阴影贴图统计数据可帮助你深入了解非Nanite实例数量：

[![虚拟阴影贴图页统计数据](https://dev.epicgames.com/community/api/documentation/image/c2e8046e-1533-4b28-ac0f-368b1490bee8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/c2e8046e-1533-4b28-ac0f-368b1490bee8?resizing_type=fit)

统计数据名称

说明

**总数（Total）**

输入到GPU剔除的非Nanite实例总数。 为每个虚拟阴影贴图Mip/裁剪图级别单独剔除实例。 例如，单个静态网格体实例可以为其相交的每个点光源生成48个实例（8个Mip级别 \* 6个立方体贴图面），为每个定向光源生成17个实例（在默认配置中，有17个裁剪图级别），等等。

**绘制（Drawn）**

剔除后实际绘制到所有虚拟阴影贴图中的实例数。

**剔除的HZB（HZB Culled）**

由于光源角度被（Nanite几何体）遮挡而删除的实例数。

**剔除的页遮罩（Page Mask Culled）**

由于不重叠任何所需页而被删除的实例数。 例如，这可以表示在绘制到已缓存区域时丢弃的静态网格体。

**剔除的空矩形（Empty Rect Culled）**

由于不重叠任何所需页而被删除的实例数。 例如，这可以表示在绘制到已缓存区域时丢弃的静态网格体。

**剔除的视锥体（Frustum Culled）**

视锥体之外的实例数。

### 阴影投射

**阴影投射（Shadow Projection**）类别是使用阴影贴图光线追踪对阴影贴图取样产生的开销。 这些通道位于**光源（Lights） | DirectLighting | UnbatchedLights**下，通常每个相关光源都有一个VSM投射通道。 产生最高开销的通道一般都是**VirtualShadowMapProjection**中的主SMRT循环。 其余的开销应该相对较低。

如果投射通道被标记为**RayCount:Static**而不是**RayCount:Adaptive**，则表示正在采用慢速路径。

该小节中描述的VSM投射通道不同于下一小节中介绍的试验性单通道投射。

[![GPU分析阴影投射](https://dev.epicgames.com/community/api/documentation/image/ae1bbadd-0494-490e-8226-662ca3b36fc1?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ae1bbadd-0494-490e-8226-662ca3b36fc1?resizing_type=fit)

阴影投射完全取决于整个屏幕上获取的阴影贴图取样的总数，而性能并不取决于页数或缓存。

使用SMRT时，归根结底在于：

-   **逐像素平均光源数（Average lights per pixel）**
    
    -   照射到屏幕大部分的光源越多，渲染开销就越高。 对于那些只覆盖屏幕上的少量像素的光源，开销较低，不过仍有一些固定的逐光源开销。
        
    -   应注意避免屏幕上的大部分像素被几个大型光源占用。
        
-   **逐像素光线数（Rays per pixel）**
    
    -   阴影的可见柔和度会因为光线数量的调整而对性能产生影响。 在降低光线数量和取样数量前，请先尝试降低局部光源半径或定向光源角度。
        
-   **逐光线样本数（Samples per ray）**
    

这些设置由**阴影（Shadow）**可伸缩性设置项进行设置，但可以根据需要进一步调整。 有关更多细节，请参阅本页的阴影贴图光线追踪（Shadow Map Ray Tracing）小节。

通常，阴影投射开销远比阴影深度开销更易控制（权衡品质和噪点）。

#### 单通道投射

该功能还处于实验阶段。 本节中的控制台变量名称可能会更改。

虽然较小光源的开销较低，它们仍有一些固定通道开销。 通过开发单通道阴影投射解决方案，该问题已得到解决。在该方案中，对于场景中的大多数局部光源，可在一条通道中高效计算它们的阴影投射。 之后可使用群集着色（clustered shading）来一次性应用来自这些光源的阴影贡献。

你可以使用控制台变量`r.UseClusteredDeferredShading 1`和`r.Shadow.Virtual.OnePassProjection 1`来启用该路径。 对于拥有大量小型局部光源的场景而言，这可以大幅提升性能。

即使启用了单通道投射（One Pass Projection），某些光源功能的使用也会阻止光源的批处理：

-   纹理分析
    
-   光源函数
    
-   光照通道
    
-   矩形光源
    
-   定向光源（因为它们覆盖了整个屏幕，所以对这些进行批处理没有任何益处）
    

在下图中，左侧显示的是逐光源的阴影投射通道，而右侧是单通道投射。

[![GPU分析对比单通道投射](https://dev.epicgames.com/community/api/documentation/image/6e8066b2-f6ac-4aa5-8a6e-2dc2bfc5e8a0?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6e8066b2-f6ac-4aa5-8a6e-2dc2bfc5e8a0?resizing_type=fit)

*点击查看大图。*

在左侧的默认路径中，每个局部光源一个接一个地累加，每个光源有几个通道。 这对于覆盖小屏幕区域的小光源来说效率很低。

在右侧的新路径中，所有投射阴影的局部光源都在单个群集着色通道（**BatchedLights**）中一起批处理。 定向光源仍然在单独的通道中处理，它覆盖了整个屏幕，因此对它进行批处理没有益处。

每个局部光源仍然分别注入到半透明体积中。 与投射相比，这对性能而言不是问题，但将来也可能会进行批处理。

启用单通道投射（One Pass Projection）后，可以从默认值16开始调整`r.Shadow.Virtual.OnePassProjection.MaxLightsPerPixel`，从而限制逐像素完全筛选的投射阴影的光源数量。 这对于控制性能很有用，并且可以节省少量的临时图形内存。

如果投射阴影的光源多于给定像素（或实际中的群集延迟着色区块）中的最大值，则将使用开销更低的单个硬阴影查找对额外的光源进行阴影处理。 如果该值设置得太激进，这可能会导致视觉效果不连续，但通常比完全禁用超出数量的光源的阴影更易接受。

此通道仍在开发中，默认情况下未启用。 主要需要注意的是，如果局部光源同时具有虚拟阴影贴图和经典阴影贴图（由于场景中存在某种不受支持的几何体类型），单通道投射路径会忽略后者，从而导致这些阴影消失。

如果你已经使用了`r.Shadow.Virtual.ForceOnlyVirtualShadowMaps`，那么你应该就可以安全地同时启用单通道投射。 解决了当前的限制后，它可能会成为默认使用路径。

## 支持的平台

Virtual Shadow Maps目前支持PlayStation 5、Xbox Series S|X、以及符合以下显卡要求的PC（需要使用最新显卡驱动并支持DirectX 12）：

-   NVIDIA：Maxwell显卡或更新系列
    
-   AMD：GCN显卡或更新系列
    
-   支持所有高于1909.1350版本的Windows 10，以及支持[DirectX 12 Agility SDK](https://devblogs.microsoft.com/directx/gettingstarted-dx12agility)的Windows 11。
    
    -   Windows 10版本1909 — 修订版号应大于或等于.1350。
        
    -   Windows 10版本2004和20H2 — 修订版号应大于或等于.789。
        
    -   DirectX 12 (支持Shader Model 6.6 atomics) 或者Vulkan (VK\_KHR\_shader\_atomic\_int64)
        
-   Apple Silicon M2或更新系列。
    
-   安装NVIDIA GeForce 2080或更新系列的Linux。
    
-   最新的显卡驱动
    

如需了解Epic Games推荐硬件和软件规格的更多信息，请参阅[硬件和软件规格](understanding-the-basics\installing-unreal-engine\hardware-software-specifications)。

## 问题和局限性

虚拟阴影贴图仍在积极开发中。 目前，它们的使用存在一些已知的问题和局限性，这些情况当前针对的是高端台式机和次世代主机。

### 多光源性能

对于具有许多小局部光源的场景，性能仍在持续提升中。 目前，最佳策略是[启用单通道投射](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine)并小心地处理失效问题，以使尽可能多的页保持缓存。 多个局部光源在Nanite几何体中的表现要比非Nanite几何体好得多，因此在远处大幅剔除或禁用对非Nanite几何体的阴影投射会有很大帮助。 在某些情况下，你可能需要完全禁用对远处光源的动态阴影投射，并仅依赖屏幕空间的[接触阴影](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/contact-shadows-in-unreal-engine)。

将来，将提供更好的控制来进行算法和品质权衡，以及限制这些情况下的更新。

### 低多边形几何体

具有高曲率和平滑法线的低多边形几何体可能会出现瑕疵。 这就是"阴影明暗界限问题"。 该问题也出现在光线追踪和其他高精度可视性查询中。 问题源于真正的低多边形几何体和"平滑"着色法线之间的不匹配：在明暗界限附近的区域，其中一些面在几何上处于阴影中，但非几何着色法线略微面向光线。 通常使用基于法线的阴影查找偏差来处理此瑕疵。 使用虚拟阴影贴图时，这种特定瑕疵可能会更加明显，因为默认情况下它们设置为通过Nanite几何体提供细节丰富的阴影。

解决此问题的最佳方法是增加这些对象/区域中的多边形数量。 限制几何法线和着色法线之间的差异可以减少或消除这些瑕疵，而不会对其他地方的阴影质量产生负面影响。 使用Nanite添加更多多边形很简单，而且通常开销很低。 如果有问题的对象不能使用Nanite，添加更高的细节级别（LOD）通常也很有效，因为当对象靠近摄像机时，这些瑕疵大多可见。

如果无法添加更多几何体，可以使用`r.Shadow.Virtual.NormalBias`（默认值为0.5）调高虚拟阴影贴图的法线偏差。 请注意，仅当无法进行内容调整时才应考虑这一点，因为它会对整个场景的阴影质量产生负面影响，尤其是对于精细细节区域而言。

在下面的示例中，在摄像机附近的低多边形球体上可以看到瑕疵，背景中有细节丰富的几何体。 将多边形添加到球体可以改善瑕疵，而不会对背景中的细节地形产生负面影响。

![低多边形几何体 | 使用默认法线偏差（0.5）](https://dev.epicgames.com/community/api/documentation/image/39832986-d818-417e-8cbc-132e6f7f8e97?resizing_type=fit&width=1920&height=1080)

![较高的多边形几何体 | 使用默认法线偏差（0.5）](https://dev.epicgames.com/community/api/documentation/image/a4affc20-57cc-42a7-b7d7-e4df547115f0?resizing_type=fit&width=1920&height=1080)

低多边形几何体 | 使用默认法线偏差（0.5）

较高的多边形几何体 | 使用默认法线偏差（0.5）

调整偏差也可以改善瑕疵，但背景几何体中的精细细节明显丢失。

![低多边形几何体 | 使用默认法线偏差（0.5）](https://dev.epicgames.com/community/api/documentation/image/cba33478-f7d9-4a2a-a248-d5c987a623b3?resizing_type=fit&width=1920&height=1080)

![低多边形几何体 | 使用较高法线偏差（1.0）](https://dev.epicgames.com/community/api/documentation/image/a3289499-7a71-4219-bded-2f2e5b6a1dbe?resizing_type=fit&width=1920&height=1080)

低多边形几何体 | 使用默认法线偏差（0.5）

低多边形几何体 | 使用较高法线偏差（1.0）

### 虚拟现实

虚拟阴影贴图尚未完全支持虚拟现实。 右眼视角可能存在定向光源瑕疵。

### 分屏

分屏受到的测试极少，性能可能很差。

### 物理页池溢出

使用虚拟阴影贴图，场景中所有光源的所有阴影数据都存储在一个大型纹理池中。 默认池大小受**阴影（Shadow）**可伸缩性设置的影响，但在具有许多使用高分辨率阴影的光源的场景中，该大小可能需要进行调整。

或者，可能需要在低端硬件上进行调整，以节省显存。

你可以使用`r.Shadow.Virtual.MaxPhysicalPages`调整页池大小。 相继使用`r.ShaderPrintEnable 1`和`r.Shadow.Virtual.ShowStats 2`启用虚拟阴影贴图统计数据，即可显示有关当前页池使用情况的统计数据。

[![VSM物理页统计数据](https://dev.epicgames.com/community/api/documentation/image/ea6ef7a9-2e7d-471e-9e34-35fedc8c9258?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ea6ef7a9-2e7d-471e-9e34-35fedc8c9258?resizing_type=fit)

虚拟阴影贴图屏幕上统计数据的当前页池使用示例。

**页（Page）**的数量超过**最大页数（Max Pages）**将导致损坏，有时会在视觉上呈现为棋盘格图案，或者阴影损坏或丢失。 如果阴影页池溢出，则会在屏幕和日志中显示警告。

[![超出最大页数的瑕疵](https://dev.epicgames.com/community/api/documentation/image/f2e69770-62f9-43bd-9358-8bf82d85b64c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f2e69770-62f9-43bd-9358-8bf82d85b64c?resizing_type=fit)

超出页池中页数导致虚拟阴影贴图损坏的示例。

如果发生这种情况，请增加页池的大小，或降低阴影分辨率，或减少投射虚拟阴影贴图的光源的数量。

### 场景捕获

在一些情况下，场景捕获组件会导致整个虚拟阴影贴图缓存无效化。 具体症状经常体现为*失效（Invalidation）*在虚拟阴影贴图数据中变低，但是缓存的页数也变少（甚至变为零），同时缓存的页面会全部变成红色。

发生该情况，试着隐藏或移除场景中的场景捕获Actor来验证它们是否在导致这个问题。

目前，在发生该问题的时候只能停用场景捕获。

### 材质

仅支持简单的次表面材质。 尚未实现次表面轮廓和传输。 如果某个材质正在使用它们，则该材质将被遮蔽，就好像它不透明一样。

### 阴影分辨率

与传统阴影贴图相比，虚拟阴影贴图的分辨率显著提升，但浅光源角（或投影锯齿）和非常大的局部光源可能耗尽可用的虚拟分辨率。 根据几何体的表面，这可能会呈现为盒状阴影和偏差问题。

定向光源裁剪图不太容易耗尽分辨率，但非常窄的摄像机视野最终也会耗尽这些分辨率。

阴影贴图的投影锯齿并没有简单的解决方案。 即使使用虚拟阴影贴图，也必须注意避免最坏的情况，并平衡分辨率和性能。

### 贴图检查警告

虚拟阴影贴图会导致出现一些不准确的贴图检查警告：

-   启用虚拟阴影贴图时，**光照需要重建（Lighting need to be rebuilt）**的消息不会显示，即使不使用[Lumen全局光照和反射](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)功能，实际上也可能需要重建光照。 虽然启用了虚拟阴影贴图的固定直接光照是动态的，但仍然烘焙固定间接光照。
    
-   可以忽略关于**预阴影（preshadow）**的警告，因为它们在使用虚拟阴影贴图时不相关。
    

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [shadows](https://dev.epicgames.com/community/search?query=shadows)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [虚拟阴影贴图的目标](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#goals-of-virtual-shadow-maps)
-   [启用虚拟阴影贴图](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#enabling-virtual-shadow-maps)
-   [启用VSM后，现有阴影渲染方法会发生什么情况？](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#what-happens-with-existing-shadow-methods-when-vs-ms-are-enabled)
-   [基于阴影贴图光线追踪的柔和阴影](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#soft-shadows-with-shadow-map-ray-tracing)
-   [控制半影品质](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#controlling-penumbra-shadow-quality)
-   [阴影贴图光线追踪的局限性](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#limitations-of-shadow-map-ray-tracing)
-   [半影大小限制](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#penumbra-size-limits)
-   [非一致半影](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#inconsistent-penumbra)
-   [半影瑕疵](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#penumbra-artifacts)
-   [定向光源的裁剪图](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#clipmaps-for-directional-light)
-   [局部光源](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#local-lights)
-   [移动光源](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#moving-lights)
-   [半透明表面](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#translucent-surfaces)
-   [粗页](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#coarse-pages)
-   [可视化](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#visualization)
-   [缓存](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#caching)
-   [管理缓存失效](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#managing-cache-invalidations)
-   [非Nanite变形和植被](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#non-nanite-deformation-and-foliage)
-   [单独的静态缓存](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#separate-static-caching)
-   [GPU分析和优化](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#gpu-profiling-and-optimization)
-   [阴影深度](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#shadow-depths)
-   [了解正在绘制的页数](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#understanding-the-number-of-pages-being-drawn)
-   [提升非Nanite性能](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#improving-non-nanite-performance)
-   [阴影投射](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#shadow-projection)
-   [单通道投射](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#one-pass-projection)
-   [支持的平台](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#supported-platforms)
-   [问题和局限性](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#issues-and-limitations)
-   [多光源性能](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#multiple-lights-performance)
-   [低多边形几何体](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#low-poly-geometry)
-   [虚拟现实](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#virtual-reality)
-   [分屏](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#split-screen)
-   [物理页池溢出](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#overflow-of-physical-page-pool)
-   [场景捕获](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#scene-capture)
-   [材质](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#materials)
-   [阴影分辨率](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#shadow-resolution)
-   [贴图检查警告](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#map-check-warnings)

相关文档

[

Nanite虚拟几何体

![Nanite虚拟几何体](https://dev.epicgames.com/community/api/documentation/image/72dd265b-b718-4307-a524-aaa62a2d2d6c?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)
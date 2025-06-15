# 虚幻引擎中的Nanite虚拟化几何体 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:23:05.549Z

---

目录

![Nanite虚拟几何体](https://dev.epicgames.com/community/api/documentation/image/753be025-f95f-4bb0-baa7-350ed6ccb05e?resizing_type=fill&width=1920&height=335)

Nanite是虚幻引擎5的虚拟化几何体系统，它采用全新的内部网格体格式和渲染技术来渲染像素级别的细节以及海量对象。 它可以智能地仅处理你能够感受到的细节。 另外，Nanite采用高度压缩的数据格式，并且支持具有自动细节级别的细粒度流送。

[![Nanite场景示例](https://dev.epicgames.com/community/api/documentation/image/2f3293b9-0ff8-4be6-afeb-e4bf4250fec8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/2f3293b9-0ff8-4be6-afeb-e4bf4250fec8?resizing_type=fit)

## Nanite的优势

-   几何体形状的复杂度提高了数个数量级，三角形和对象的实时渲染数量达到了前所未有的高度
    
-   帧预算不再会因为多边形数量、绘制调用和网格体内存使用情况而受限
    
-   现在可以直接导入电影级品质的美术资源，例如ZBrush雕刻模型和摄影测量扫描数据
    
-   通过高模实现细节，而非将细节烘培到法线贴图纹理
    
-   自动处理细节级别（LOD），不再需要手动设置单个网格体的LOD
    
-   品质损失极少或没有损失，特别是在LOD发生过渡时
    

尽管Nanite带来了前所未有的变革，但在实际使用上，仍会存在一些限制。 例如，在考虑实例总数、单个网格体的三角形数量、材质复杂度、输出分辨率、项目性能等方面时，还是需要根据实际项目内容和硬件水平来仔细衡量。 与此同时，在虚幻引擎未来的版本中，Nanite将不断扩展功能并提升性能。

## Nanite网格体和传统静态网格体的不同之处

Nanite网格体是一种启用了Nanite的特殊静态网格体。 Nanite网格体本质上仍是三角形网格体，但对其数据进行了大量细节和压缩处理。 此外，Nanite使用了一种全新系统，能以极高效的方式来渲染这种数据格式。

要让静态网格体利用Nanite，只需一个标记来启用它即可。 编辑Nanite网格体的内容和传统网格体没太大不同，区别就在于相比使用传统方法渲染的几何体，Nanite能够渲染的三角形和实例要多出数个数量级。 将摄像机移到足够近的位置后，Nanite就会绘制出导入的原始源三角形。

Nanite网格体支持多重UV和顶点颜色。 材质可以被分配给网格体的不同分段，并且这些材质可以使用不同的着色模型和动态效果（在着色器中完成）。 材质指定可以动态切换，就像其他静态网格体一样。Nanite也无需任何烘焙材质的过程。

[虚拟纹理](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-texturing-in-unreal-engine)并非必须与Nanite一起使用，但强烈建议使用虚拟纹理。 虚拟纹理是正交虚幻引擎功能，它与纹理数据的关系类似于Nanite与网格体数据的关系。

使用Nanite前，你应该首先熟悉静态网格体的工作流程，但是目前还有很多内容尚不支持。 详情请参阅本页的[支持的功能](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)小节。

## Nanite如何工作？

Nanite可最大限度地与现有的引擎工作流程无缝集成，可使用前所未有的方法来存储和渲染网格体数据。

-   导入期间 — 分析网格体，并将其拆分成由三角形组构成的分层群集。
    
-   渲染期间 — 根据摄像机视图以不同LOD随时切换群集，并且可以在不破坏同一对象中相邻群集的情况下完美连接。 数据会根据需求流送，因此只有可见细节才会保存在内存中。 Nanite在自己的渲染通道中运行，该通道完全绕过了传统的绘制调用。 你可以使用可视化模式来检视Nanite管线。
    

由于Nanite需要从磁盘快速流送网格体数据。 建议使用固态硬盘（即SSD）来存储运行时数据。

## 应该将Nanite用于哪些类型的网格体？

一般来说，能启用时应该尽量启用Nanite。 启用了Nanite的静态网格体通常可以更快地渲染，占用的内存和磁盘空间会更少。

具体来说，如果网格体满足以下条件，则尤其适合使用Nanite：

-   包含很多三角形，或屏幕上的三角形非常小
    
-   场景中有很多实例
    
-   是其他Nanite几何体的主要遮挡物
    
-   使用[虚拟阴影贴图](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine)投射阴影
    

不过有一个例外，那就是天幕之类的对象：它的三角形在屏幕上显得很大，不会遮挡任何东西，并且场景中只有一个。 通常，这种例外很少见，并且让它们启用Nanite导致的性能损失很小，所以只要Nanite支持，就不必过度担心是否应该不开启Nanite。

目前Nanite不支持某些用例。 详情请参阅本页的[支持的功能](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)小节。

## 在网格体上启用Nanite支持

以下方法可在几何体上启用Nanite（前提是几何体支持）：

-   [导入时](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)
    
-   [使用单独的网格体编辑器](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)
    
-   [在内容浏览器中的批量选择](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)
    

将几何体转换为Nanite时，在每个网格体上都需要花费一些处理时间。 在大型项目上，如果有很多Nanite资产，使用共享的派生数据缓存（DDC）将非常有帮助。 如需更多信息，请参阅[共享DDC](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-derived-data-cache-in-unreal-engine)文档。

### 导入网格体

在导入要启用Nanite的网格体时，勾选**编译Nanite（Build Nanite）**复选框。

[![Nanite FBX导入选项](https://dev.epicgames.com/community/api/documentation/image/55fd7849-7aad-4885-8e6a-6d9bf7c0e44d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/55fd7849-7aad-4885-8e6a-6d9bf7c0e44d?resizing_type=fit)

假如不使用[Lightmass](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/global-illumination-in-unreal-engine)预计算光照，推荐禁用**生成光照贴图UV（Generate Lightmap UVs）**属性。

启用此属性后，高精度网格体会显著增加静态网格体数据的导入和编译时间。 此属性还将增加一个额外的UV通道，这对于非常密集的网格体而言将会产生大量的数据。 因此，如果你的项目不使用烘焙光照，则没有必要产生这两项开销。

### 在资产上启用Nanite

假如你的项目已经有了大量内容，并且你希望启用Nanite，那么有两种办法：一是使用内容浏览器批量启用资产，二是在每个资产的编辑器中单独启用。

#### 在网格体上批量启用Nanite

针对要启用Nanite来处理的批量静态资产或骨骼网格体资产，请用**内容浏览器**进行全选。 **右键点击**并通过上下文菜单选择**Nanite > 启用（Enable）**。

[![在内容浏览器中对资产批量启用Nanite](https://dev.epicgames.com/community/api/documentation/image/88abdcf1-2fc0-43d6-9b8c-29fd2edc696f?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/88abdcf1-2fc0-43d6-9b8c-29fd2edc696f?resizing_type=fit)

#### 对单个网格体启用Nanite

打开支持Nanite的任意网格体编辑器，例如静态网格体和[几何体集合](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/geometry-collections-user-guide)（Chaos物理驱动的破裂网格体），并通过**细节（Details）**面板启用Nanite。

在静态网格体编辑器（Static Mesh Editor）中，找到**Nanite设置（Nanite Settings）**并勾选**启用Nanite支持（Enable Nanite Support）**复选框。

[![在静态网格体编辑器中启用Nanite](https://dev.epicgames.com/community/api/documentation/image/3a7a9812-8a78-4fa9-be75-62aa79e2d13d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/3a7a9812-8a78-4fa9-be75-62aa79e2d13d?resizing_type=fit)

在几何体集合编辑器中，找到**Nanite**分段并勾选**启用Nanite（Enable Nanite）**复选框。

[![在几何体缓存上启用Nanite](https://dev.epicgames.com/community/api/documentation/image/6e0a426b-8a50-4424-adec-30acaba284f6?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6e0a426b-8a50-4424-adec-30acaba284f6?resizing_type=fit)

## 支持的Nanite功能

本小节介绍了如何在虚幻引擎项目中充分利用Nanite的功能，并详细说明了支持和不支持的内容以及可能的限制。

### 几何体

Nanite可以在静态网格体和[几何体集合](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/geometry-collections-user-guide)上启用。

启用了Nanite的网格体可以搭配以下组件类型使用：

-   静态网格体
    
-   骨骼网格体
    
-   实例化静态网格体
    
-   样条线网格体
    
-   分层实例化静态网格体
    
-   几何体集合
    
-   植被笔刷
    
-   地形草
    

Nanite对刚性网格体的变形支持有限。 Nanite支持这些网格体的动态平移、旋转和非均匀缩放，无论是动态还是静态的变形。 这意味着，Nanite网格体的位置无法简单地通过将一个4x3矩阵乘法统一应用于整个网格体来表达。

变形具有以下局限性：

-   （测试版）材质中的世界位置偏移（WPO）。
    
    -   使用WPO位移的Nanite网格体会被分解成较小的簇，每个簇都有独立的边界，可在GPU上被单独剔除。 你可以为WPO设限，以管理要剔除Nanite网格体中的多少簇。
        
    -   使用WPO的植被问题较少，因为植被充满了孔洞，无法真正遮挡到自身。
        

变形不支持且不限于以下几点：

-   变形目标
    

场景中存在的最大实例数量不超过1600万。这包括场景中的所有流送进来的实例，而不仅仅是启用了Nanite的那些。 只有流送进来的实例会被计算在内。

静态网格体启用Nanite时，不会保存静态网格体每个顶点切线的信息。 相反，切线空间会在像素着色器中隐式继承。 为了减少数据大小，目前没有存储切线数据。 使用这种方法的切线空间会有所不同，可能会导致边缘不连续。 但是，目前尚无事实证明这是一个重大问题。虚幻引擎未来版本将计划支持顶点切线。

### 材质

Nanite支持混合模式为**不透明（Opaque）**和**遮罩（Masked）**的材质。 当检测到不支持的材质类型时，启用Nanite的网格体会被分配一个默认材质，同时在**输出日志**中记录警告和额外信息。

其他材质功能说明：

-   启用了Nanite的网格体可以接收投影到其表面上的贴花，但不支持[网格体贴花](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-mesh-decals-in-unreal-engine)，后者要求材质使用**半透明（Translucent）**混合模式。
    
-   不支持**线框（Wireframe）**复选框。
    
-   支持**Vertex Interpolator**节点和**自定义UV**，但每个像素将求值三次。
    
-   **自定义**表达式节点，或者任何使用它们的节点（例如`ParallaxOcclusionMapping`材质函数），可能会导致Nanite出现瑕疵。 这点在意料之中，因为Nanite还没有分析性的衍生支持。
    

### 渲染

以下渲染功能尚不支持：

-   使用以下条件的视图相关对象筛选：
    
    -   最小屏幕半径
        
    -   距离剔除
        
-   前向渲染
    
-   虚拟现实中的立体渲染
    
-   分屏
    
-   多重采样抗锯齿（MSAA）
    
-   光照通道
    
-   针对Nanite网格体的光线追踪
    
    -   默认情况下，回退网格体适用于启用了Nanite的网格体。 降低静态网格体编辑器中的**回退相对误差（Fallback Relative Error）**参数值，以使用更多源网格体的三角形。
        
    -   （试验性）通过控制台变量`r.RayTracing.Nanite.Mode 1`启用对Nanite网格体的原生光线追踪的初始支持。 这样可以保留所有细节，而所用GPU内存比零误差回退网格体少得多。
        
-   某些可视化视图模式尚不支持显示Nanite网格体
    
    在查看细节十分丰富的几何体时，在静态网格体编辑器中使用某些可视化模式应该谨慎。 查看法线和UV可能会导致编辑器的性能出现问题。
    

### 支持的平台

Nanite目前支持PlayStation 5、Xbox Series S|X以及配备符合以下规格显卡的PC，要求使用支持Shader Model 6（SM6）和DirectX 12的最新驱动程序：

-   NVIDIA：Maxwell显卡或更新系列
    
-   AMD：GCN显卡或更新系列
    
-   支持所有高于1909.1350版本的Windows 10，以及支持[DirectX 12 Agility SDK](https://devblogs.microsoft.com/directx/gettingstarted-dx12agility)的Windows 11。
    
    -   Windows 10版本1909 — 修订版号应大于或等于.1350。
        
    -   Windows 10版本2004和20H2 — 修订版号应大于或等于.789。
        
    -   DirectX 12（带着色器模型6.6原子），或Vulkan（VK\_KHR\_shader\_atomic\_int64）
        
-   Apple Silicon M2或更新系列。
    
-   安装NVIDIA GeForce 2080或更新系列的Linux。
    
-   最新的显卡驱动
    

PlayStation 4和Xbox One也支持Nanite，但对这些平台的支持目前是实验性的。 如果希望在这些平台上发布拥有高保真度的内容，预计Nanite的性能可能无法完全满足要求。

如需了解Epic Games推荐硬件和软件规格的更多信息，请参阅[硬件和软件规格](understanding-the-basics\installing-unreal-engine\hardware-software-specifications)。

## Nanite回退网格体和精度设置

静态网格体和骨骼网格体中还有一些属性可控制Nanite呈现的精度，还可以控制从细节完整的网格体生成的回退网格体的精度。

这些设置可以在网格体编辑器**细节（Details）**面板的**Nanite设置（Nanite Settings）**分段下找到。

[![静态网格体编辑器Nanite设置](https://dev.epicgames.com/community/api/documentation/image/0224714a-206e-4000-a57e-b835950592e7?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/0224714a-206e-4000-a57e-b835950592e7?resizing_type=fit)

Nanite设置包括以下属性：

属性

说明

**启用Nanite支持（Enable Nanite Support）**

使该网格体能够与Nanite一起使用，并在无法使用Nanite的情况下生成回退网格体。

**保留区域（Preserve Area）**

若Nanite网格体会因简化而失去表面区域，则能够外扩开放边界边缘，将失去的区域重新分配给其余三角形。 这对植被最有用，因为树叶子往往会因简化的影响而变成不连贯的三角形和四边形。 此设置的效果是放大每一片树叶。 对于草叶之类的几何体条带，效果是将叶子加厚。 应在所有植被网格体上启用此设置，在其他网格体上均不应启用。

**显式切线（Explicit Tangents）**

为True时，原始模型切线将被储存并逐资产使用。 该设置意味着切线是被显式存储在磁盘上的，而不是在运行时隐式派生的。 切线精度（Tangent Precision）设置可对顶点切线提供额外的控制选项。 启用该设置将使存储文件大小增大约10%，但在隐式切线不够精确时比较好用。

**内插UV（Lerp UVs）**

是否要在简化时内插UV。 在可能的情况下，应始终启用此项。 对于真实的UV坐标，如果UV被用作法线纹理坐标并将内插到三角形的表面，这将允许在简化时计算新顶点的最低误差最优UV。 如果存储在UV中的数据不能被用于插值，则应禁用此项。 例如，UV中存储了索引。 内插索引毫无意义，且会损坏试图使用它的着色器。

如果禁用，当Nanite选择LOD进行渲染时，UV的错误将不再被考虑，因为由于任意顶点属性不可插值而造成的错误通常无法被推理。

**位置精度（Position Precision）**

选择生成Nanite网格体的顶点位置时此网格体应使用的精度。 **自动（Auto）**根据网格体大小确定适当的精度。 此精度可以被重载，以便提高精度或优化磁盘占用空间。

**法线精度（Normal Precision）**

选择生成Nanite网格体的顶点法线时此网格体应使用的精度。 **自动（Auto）**根据网格体大小确定适当的精度。 此精度可以被重载，以便提高精度或优化磁盘占用空间。

**最低驻留（根几何体）（Minimum Residency（Root Geometry））**

设置此网格体应始终保留在内存中的内存字节大小，并将其余部分流送进来。 值越高，需要的内存越多，但对于某些网格体，这可以减轻流送弹出问题的发生。

**保持三角形百分比（Keep Triangle Percent）**

从源网格体中保留的三角形的百分比。 减少此百分比可优化磁盘大小。

**优化相对误差（Trim Relative Error）**

设置允许为Nanite网格体移除的最大相对误差量。 源网格体中视觉影响小于此相对误差量的所有细节都将被移除。 相对误差没有单位大小，与网格体大小有关。 默认情况下，Nanite将存储所有原始源网格体的三角形。

**回退目标（Fallback Target）**

决定在生成回退网格体时该使用哪个目标系统。

**自动（Auto）：**根据项目设置自动创建一个回退网格体。 **回退三角形百分比（Fallback Triangle Percent）：**设置减少Nanite源网格体时保留的三角形百分比。 **回退相对误差（Fallback Relative Error）：**相对于网格体大小减少源网格体，直至达到指定的误差。 生成的回退网格体中视觉影响小于此相对误差量的所有细节将一律移除。

**源导入文件名（Source Import Filename）**

文件路径，用于导入高分辨率网格体与Nanite一起使用。 对于可受益于更精细几何体的系统，比如Nanite和虚幻引擎中的几何体建模，你可以使用网格体的高分辨率版本替代LOD0。

**位移UV通道（Displacement UV Channel）**

在对位移贴图进行采样时要使用的UV通道。

**位移贴图（Displacement Maps）**

添加并编辑位移贴图。

**最大边缘长度因子（Max Edge Length Factor）**

控制屏幕上的网格体每个顶点间允许的最大距离。 这可以防止过度简化要变形的网格体，比如使用世界位置偏移的动画，以及样条线网格体。 在默认情况下，此值应保持为0，除非确实需要解决因过度简化而导致的问题。

### 顶点精度

Nanite会对网格体顶点位置进行量化，以便最大化内存密度并最小化磁盘占用空间。 量化步长是2的幂，步长的大小可以通过**位置精度（Position Precision）**属性来选择，以匹配各个网格体的要求。 默认设置是**自动（Auto）**，根据网格体尺寸以及三角形密度挑选合适的精度。 你也可以通过选择精度大小手动重载，以便提升精度效果或优化磁盘占用空间。

[![针对位置精度的静态网格体编辑器Nanite设置](https://dev.epicgames.com/community/api/documentation/image/6a975381-8c93-4564-bbee-046c2cf8d776?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6a975381-8c93-4564-bbee-046c2cf8d776?resizing_type=fit)

量化（Qantinization）是一种有损压缩形式。 在处理模块化网格体或具有共享边界的网格体时，使用有损压缩特别具有挑战性。 特别是当这些边界需要完全对齐，以免几何体出现孔洞或裂缝时。

为了确保一致性，量化发生在以网格体原点为中心的非标准化对象坐标上。 这能确保当网格体使用相同的精度设置，而网格体中心之间的平移是该精度的倍数时，量化不会导致裂缝的出现。

### 优化数据

有时你需要减少Nanite存储的数据量，优化磁盘大小。 Nanite含有一些设置，能让你在生产过程中随时从存储的Nanite网格体中优化细节数据，这意味着你事先过度提升质量也不要紧，稍后相应调整即可。

要优化细节数据，你需要使用**保持三角形百分比（Keep Triangle Percent）**和**优化相对误差（Trim Relative Error）**属性。 你可以将它们视为在存储为Nanite网格体之前的预抽取选项。 在Nanite的案例中，网格体中的细节不需要统一。 最不重要的数据会首先删除，更类似于有损压缩。

使用**保持三角形百分比（Keep Triangle Percent）**以设置要从源网格体中保留的三角形百分比。

使用**优化相对误差（Trim Relative Error）**设置通过源网格体优化数据时允许的最大相对误差量。 凡是删除后导致的相对误差小于此数量的三角形，将一律删除。 你也可以这样认为，凡是视觉影响小于该值的细节，将一律优化。 相对误差没有单位大小，与网格体大小有关。

这两个属性的默认设置是默认不优化任何内容，Nanite会存储所有原始源网格体的三角形。

优化数据对于减小磁盘大小（即下载大小）很重要，但并不能提高性能。 有关此主题的更多信息，请参阅下面的数据大小小节。

### 回退网格体

虚幻引擎的很多子系统都需要访问以传统方式渲染的网格体提供的传统顶点缓冲。 为静态网格体启用Nanite之后，会为高精度的网格体再生成一个相对粗糙的版本（称之为回退网格体）。 回退网格体是在不支持Nanite渲染时使用的。 它还用于不适合使用细节丰富网格体的情况，例如需要复杂碰撞时，需要使用光照贴图进行烘焙光照，以及使用Lumen进行硬件光线跟踪反射时。

**回退三角形百分比（Fallback Triangle Percent）**属性表示原始源网格体中用于生成回退网格体的三角形百分比。 你可以指定0%到100%之间的三角形百分比，百分比越大，保留的原始网格体细节越多。

**回退相对误差（Fallback Relative Error）**设置从源网格体中删除细节时允许的最大相对误差量。 凡是删除后导致的相对误差小于此数量的三角形，将一律删除，首先删除视觉影响较小的细节。 相对误差没有单位大小，与网格体大小有关。

例如，如果你希望你的网格体完全不进行抽取，你将使用回退三角形百分比100和回退相对误差0。

下图将从原始源网格体创建的细节丰富的Nanite网格体，与生成的Nanite回退网格体的默认设置进行了比较。

![高模Nanite网格体](https://dev.epicgames.com/community/api/documentation/image/96d7477d-51a1-4fe8-90c6-2a0ffb87edf9?resizing_type=fit&width=1920&height=1080)

![Nanite生成的回退网格体 | 默认设置](https://dev.epicgames.com/community/api/documentation/image/c4d5e988-57b8-4623-b1ce-85a5f07ae1e5?resizing_type=fit&width=1920&height=1080)

高模Nanite网格体

Nanite生成的回退网格体 | 默认设置

使用回退相对误差指定从原始源网格体中保留多少原始细节，使用回退百分比设置使用多少细节。

在下面的比较中，回退网格体保持100%的回退三角形百分比，但调整回退相对误差，以便使用更多来自原始源网格体的三角形。 调整这些值时，你可以在视口中将Nanite三角形的Nanite细节用作更改其值的指示器。

![Nanite生成的回退网格体 | 默认设置](https://dev.epicgames.com/community/api/documentation/image/7b853db7-5937-4c75-b125-d23a5fc164bb?resizing_type=fit&width=1920&height=1080)

![Nanite生成的回退网格体 | 调整后的质量设置](https://dev.epicgames.com/community/api/documentation/image/651da27d-392e-4be4-a98e-e7be8514f7bd?resizing_type=fit&width=1920&height=1080)

Nanite生成的回退网格体 | 默认设置

Nanite生成的回退网格体 | 调整后的质量设置

#### 回退网格体可视化

在静态网格体编辑器中，你可以使用**显示（Show）**下拉菜单中的视口**Nanite回退（Nanite Fallback）**选项，在细节完整的Nanite网格体和Nanite回退网格体之间切换。 你也可以使用热键**Ctrl + N**在两个可视化选项之间快速切换。

[![静态网格体编辑器Nanite回退网格体切换](https://dev.epicgames.com/community/api/documentation/image/e9c2a080-8852-41eb-a0cf-08080ddacbe2?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e9c2a080-8852-41eb-a0cf-08080ddacbe2?resizing_type=fit)

#### 对启用了Nanite的网格体使用自定义回退网格体LOD

回退网格体在引擎的许多功能中都会用到，例如复杂的逐多边形碰撞、光线追踪、光源烘培等等。 它也可用于不支持Nanite的平台。 生成回退网格体时，启用了Nanite的网格体会始终使用源网格体的**LOD0**槽来自动生成回退网格体。 但是，有时需要使用手动指定的回退网格体或一系列传统LOD，而不是自动生成的网格体。

这种控制级别允许你在项目中使用Nanite，同时也可以直接控制你在光线追踪反射中看到的几何体或不支持Nanite的平台中的几何体。

按照以下步骤指定你自己的自定义回退网格体，或使用一系列LOD：

1.  将**回退三角形百分比（Fallback Triangle Percent）**设置为**0**，以便回退网格体尽可能小，因为在使用此方法时它将被忽略。
    
2.  使用此[传统LOD设置](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-levels-of-detail-in-blueprints-and-python-in-unreal-engine)流程将一个或多个LOD添加到网格体。
    
3.  使用**LOD导入（LOD Import）**下拉菜单，从**LOD设置（LOD Settings）**分段**导入LOD关卡1（Import LOD Level 1）**。
    
4.  将**LOD设置（LOD Settings）**分段下的**最小LOD（Minimum LOD）**设置为**1**。 这会使得Nanite生成的回退网格体被忽略。
    

复杂碰撞是一种特殊情况。 使用**通用设置（General Settings）**下的**用于碰撞的LOD（LOD for Collision）**属性，指定用于碰撞的LOD。 所有LOD都可用于碰撞，包括LOD0。

此特殊方法可能无法让Nanite项目自动兼容不支持Nanite的平台，应该针对你的项目进行测试和评估。

Nanite可以高效处理大量实例，但如果Nanite被禁用，那么可能会出现大量绘制调用，以至于传统渲染管线可能无法应对。 你可以使用`r.Nanite 0`来关闭和开启Nanite支持，从而测试它在项目中是否可行。

如需更多信息，请参阅此页面的[控制台变量和命令](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)小节。

## 性能以及内容相关的问题

大多数情况下，Nanite能很好地随屏幕分辨率的变化而变化。 能这样做是基于两项关键技术：精细的细节级别和遮挡剔除。 通常这意味着，无论场景中的源数据的几何复杂度如何，Nanite实际试图绘制到屏幕上的三角形的数量会始终与像素的数量成正比。

Nanite遵循的设计理念是，三角形的绘制数量超过像素数量就是一种浪费。

某些情况下，有些类型的内容会破坏Nanite采用的缩放技术，但这不意味着完全不应将Nanite用于这些内容，也不意味着它的渲染速度会慢于传统管线。 对于这类内容，这只是意味着基于像素缩放而非基于场景复杂度缩放不再适用于它们。 请使用虚幻引擎的[分析](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)功能来监控这类情况的发生。

### 聚合几何体

聚合几何体是指有许多不连接的部分，但在远处成为一个完整体积的几何体，如头发、树上的叶子和草。 这种类型的几何体突破了Nanite的细节和遮挡剔除技术的水平。 Nanite本质上是一种分层的细节结构，它依赖于能够将小三角简化为大三角，并在确定差异小于可感知的情况下选择较粗略的三角。 对于连续的表面来说，这个方法很好用，但对于从远处看更像部分不透明的云而不是实体表面的聚合几何体，就不太适用。 对于这种几何体，Nanite更有可能判定它不能像典型的实体表面那样积极地减少聚合几何体，从而导致在覆盖相同数量的像素时，绘制更多的三角。

另一个聚合几何体的优化方法是遮挡剔除（Occlusion Culling）。 虽然它非常精细，但其颗粒度并非细致到每一个像素。 布满孔洞的几何体—更糟糕的是，多层布满孔洞的几何体—会导致严重的过度绘制，因为在屏幕上的那个区域被挡住之前，需要建立许多深度层。 思考这个问题的一个方法是想象屏幕上一个8x8像素的区域，以及在每个像素被填充之前需要绘制多少深度层。 严重的过度绘制意味着对于相同的像素覆盖数量，Nanite试图绘制更多的三角，导致它的渲染速度变慢。

植被是导致遮挡剔除问题的最明显的情况，但即使如此，也并不意味着Nanite完全不能应用于植被类型的网格体。 详情请参阅下文的[使用Nanite的植被](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)小节。 对不同的用例进行试验是很好的方法，可以了解什么方法对你的项目最奏效。 使用分析工具可以确保Nanite在这些类型的网格体中发挥良好性能。

### 紧密堆叠的表面

由于各种实际存在的限制，传统网格体的遮挡剔除使得大规模的模型搭建（kitbashing）流程几乎不可能实现。 Nanite的高精细遮挡剔除可以实现使用这些类型的工作流，有助于减少开发流程中的麻烦。 正如上述"聚合几何体"小节中介绍的，导致过度绘制的一种情况是，可见表面与底部隐藏表面的距离过于接近。 如果某个几何体妥当地隐藏在可见表面之下，Nanite检测并剔除它的成本是相当低的，甚至可以认为没有开销。 然而，如果有一些相互堆叠的几何体，并且都位于最顶部的表面上，Nanite可能无法确定哪个位于上面或下面，导致两个几何体同时被绘制出来。

这种特殊情况的剔除结果通常最糟糕，因为Nanite不知道哪个表面在最上层，导致绘制出所有内容。 像这样的精度误差会随着屏幕尺寸和距离的变化而变化，所以，尽管10厘米的距离足够分开各个层，并且在近处看起来很好，但在更远的位置，距离差可能会小于一个像素，从而导致过度绘制。

![游戏视图](https://dev.epicgames.com/community/api/documentation/image/4160d500-d11a-44d7-a948-660203d1852f?resizing_type=fit&width=1920&height=1080)

![大量Nanite实例紧密堆叠在一起](https://dev.epicgames.com/community/api/documentation/image/995d36ec-adf7-45fd-b47e-8446bea3d870?resizing_type=fit&width=1920&height=1080)

游戏视图

大量Nanite实例紧密堆叠在一起

在下面的示例中，移动摄像机并俯视角色站立的区域，Nanite的**过度绘制（Overdraw）**视图会显示这些堆叠的表面是如何渲染的。 区域越亮，表明在该区域发生的过度绘制越多。

[![Nanite过度绘制视图](https://dev.epicgames.com/community/api/documentation/image/40051cec-e884-4d21-91a9-8daea38ad8e3?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/40051cec-e884-4d21-91a9-8daea38ad8e3?resizing_type=fit)

过度绘制视图能够最有效地发现过度绘制的问题。 尽管一定程度的过度绘制是可以接受的，但过量会导致Nanite的剔除和光栅化开销变大，并且Nanite的缩放功能也会更加容易受到场景复杂度的影响。

### 面片法线和硬边法线

有个值得注意的问题是，在导入细节丰富的网格体时，因为网格体有面片法线，两个不同多边形之间的法线不平滑。 此问题很常见，并且容易忽视，应该加以避免，因为网格体中顶点共享不足会导致渲染性能和数据大小的开销变得非常大。 理想情况下，一个网格体的顶点数量要少于三角形数量。 如果这个比例是2:1或更高，那就可能出现问题，尤其是当三角形数量较多时。 如果比例为3:1，意味着网格体完全是面状的，每个三角形都有单独的三个顶点，没有一个顶点是和其他三角形共享的。 大多数情况下，这是法线不一样导致的，因为法线不平滑。

考虑到这一点，顶点越多，意味着数据越多。 这也意味着顶点变换工作更多，而比率高于2:1时会陷入一些缓慢的渲染路径。 在硬表面建模中专门使用不会引起任何问题，没有不用的理由。 然而，若意外遇到100%面片极密集的网格体，开销要比预期的高得多。 另外，要注意在其他DCC软件包中生成的密集有机型表面的导入法线，其硬法线阈值在低模网格体上可能是合理的，但在Nanite中会增加不必要的开销。

以下面的两个网格体为例，左边的网格体有面片法线，右边的网格体有平滑法线。 对比使用Nanite的**三角形（Triangles）**视图的情况，Nanite在绘制时所用的三角形数量存在明显差异。 相比右边的平滑法线，左边的面片法线绘制的三角形要多得多。

 

 

[![](https://dev.epicgames.com/community/api/documentation/image/1d840351-da41-46a4-912d-48c4d2550ce8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1d840351-da41-46a4-912d-48c4d2550ce8?resizing_type=fit)

[![](https://dev.epicgames.com/community/api/documentation/image/3f6cf249-f9da-4820-ab27-e6ee1ba0dd7e?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/3f6cf249-f9da-4820-ab27-e6ee1ba0dd7e?resizing_type=fit)

使用面片法线（左）和平滑法线（右）且启用了Nanite的网格体

使用面片法线（左）和平滑法线（右）且启用了Nanite的网格体的Nanite三角形视图

点击图像查看大图。

点击图像查看大图。

### Nanite骨骼网格体

该Nanite功能目前还在实验阶段。

![](https://dev.epicgames.com/community/api/documentation/image/2026a8bc-9417-41eb-8c51-e0cb8238d98a?resizing_type=fit)

Nanite骨骼网格体支持：

-   新的骨骼网格体API，使骨骼网格体的渲染变得更简单。
    
-   一次绘制调用即可处理整个网格体。
    
-   来自虚拟阴影贴图的投影。
    
-   无几何体LOD。 Nanite骨骼网格体会使用动画LOD。
    
-   通过动画库进行实例化。
    

### 为植被使用Nanite

为植被使用Nanite的功能还在测试阶段，我们正在对此进行积极的研究和开发。 本小节提供了有关为植被几何体使用Nanite的指导。

对于树木这类具有默认Nanite设置的资产，你可能会发现，树冠往往会随着距离的增加而变得稀疏。 这是一种特定形式的[聚合几何体](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)，所有不连贯部分（叶子或草叶）的边界处都有开放边缘。 启用**保留区域（Preserve Area）**有助于在启用Nanite时防止出现这种稀疏化现象。 当Nanite通过减少三角形的数量来简化远处的几何体时，最终还是会开始彻底移除一部分不连贯的元素。 如果Nanite没有获得更多信息，就会产生稀疏化的结果，因为失去了大块表面区域。 保留区域（Preserve Area）将外扩开放边界边缘，将失去的区域重新分配给其余三角形。 扩张对称形状（比如树叶）与放大对称形状的效果相同。 如果是条带等非对称形状，例如草叶，效果是将其加厚。

建议为所有植被网格体使用**保留区域（Preserve Area）**，但*不*建议对非场景植被网格体使用该选项。

![无保留区域](https://dev.epicgames.com/community/api/documentation/image/90701447-b193-4ee8-bb5f-4e33f6d6f54f?resizing_type=fit&width=1920&height=1080)

![启用了保留区域](https://dev.epicgames.com/community/api/documentation/image/bc887437-f6b8-4345-ae7e-1c917a99112e?resizing_type=fit&width=1920&height=1080)

无保留区域

启用了保留区域

Nanite**簇（Cluster）**视图能更清晰地展示了保留区域（Preserve Area）设置对失去区域的重新分配。

![Nanite簇视图 | 无保留区域](https://dev.epicgames.com/community/api/documentation/image/916c26af-a92f-4013-8307-7657a5b8c8d6?resizing_type=fit&width=1920&height=1080)

![Nanite簇视图 | 启用保留区域](https://dev.epicgames.com/community/api/documentation/image/dfd53d55-97b1-40a7-9611-bc696e1ed470?resizing_type=fit&width=1920&height=1080)

Nanite簇视图 | 无保留区域

Nanite簇视图 | 启用保留区域

以下是在使用和创作植被资产时考虑使用Nanite的一些建议。 我们仍在通过自我试验和学习寻找最好的方法。 到目前为止，我们了解到，使用Nanite的植被应该采用不同以往的创作方式，但如果你能够发挥它的优势，就可以利用Nanite更快获得更高质量的结果。

-   使用**保留区域（Preserve Area）**（在静态网格体编辑器中启用）。
    
-   使用几何体替代遮罩卡片。
    
    -   与不透明（Opaque）材质相比，遮罩（Masked）材质的开销相当大。 完全不使用它们或许可以最快地获得结果。
        
    -   在采用传统卡片方法（用一张卡片表示许多元素）时，使用Nanite可能比不使用Nanite速度更慢。 不要指望在基于卡片的植被上启用Nanite总能获得性能提升。
        
    -   遮罩像素的开销几乎与绘制像素相同。
        
    -   事实证明，几何体植被在使用Nanite时比使用卡片方法速度更快，无论使用的是Nanite卡片还是非Nanite卡片。 此外，外观效果也更好。
        
        -   Fab上的[Megascans：Grass](https://www.fab.com/listings/50d9a417-73ed-4132-9421-6be3d4f7432e)包提供了很好的测试示例。 该包既提供了各元素彼此独立的遮罩和高精度几何体，也提供了用单张卡片表示许多元素的遮罩低精度卡片。
            
-   使用世界位置偏移（WPO）时，顶点越多意味着开销越大。 必须限制和监控WPO逻辑。
    
-   本文中的[聚合几何体](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)一节中说明的问题仍然存在。 茂密的森林（如上面的示例）的渲染速度将显著慢于同一场景下所有网格体替换为三角形数相同的固体形状的情形。
    

### 使用Nanite的最大世界位置偏移位移

在材质和材质实例中，你可以使用**最大世界位置偏移位移（Max World Position Offset Displacement）**来设置WPO允许的偏移量上限。 由于Nanite网格会被分割成更小的簇，且每个簇群都有自己单独的边界，并在GPU上被单独剔除，所以这将会特别有效。 限制WPO是管理这个问题的好方法。

你可以在材质的**细节（Details） > 世界位置偏移（World Position Offset）**类别下，或者在材质实例的**材质属性重载（Material Property Overrides）**下，找到**最大世界位置偏移位移（Max World Position Offset Displacement）**设置项。

[![最大世界位置偏移位移设置项](https://dev.epicgames.com/community/api/documentation/image/c9aea562-f9a1-4599-ba09-20b90108b1b0?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/c9aea562-f9a1-4599-ba09-20b90108b1b0?resizing_type=fit)

如需更多信息，请参阅[材质属性](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-material-properties)。

### Nanite静态位移贴图

该Nanite功能目前还在实验阶段。

静态网格体编辑器（Static Mesh Editor）有一个选项，可以通过使用离线自适应细分器（offline adaptive tessellator）为支持Nanite的网格体增加细节。 细分器使用已烘焙的位移图生成一个经优化的Nanite网格体。 这种纹理驱动的方法是非破坏性的，且允许你通过标量参数控制细分曲面和位移的数量。

[![使用和不使用Nanite静态位移贴图的示例](https://dev.epicgames.com/community/api/documentation/image/5b9204b2-6995-4bd1-ba92-b5a6102ad8e3?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/5b9204b2-6995-4bd1-ba92-b5a6102ad8e3?resizing_type=fit)

在Nanite设置下的细节（Details）面板中，按照以下步骤操作:

1.  将**优化相对误差（Trim Relative Error）**的值设置为非零值以控制细分曲面的数量。
    
    -   合适的默认值是0.04，而你应该保持它在0.02以上。 这个值针对的是对网格体进行曲面细分时的误差等级。 数值太小会简单地使用大量的三角，使编译时间爆炸式增长。
        
2.  添加**位移贴图（Displacement Maps）**。
    
3.  展开**索引（Index）**元素并添加一个用于位移的**纹理（Texture）**。
    
    -   如果你的网格体有多个材质插槽，则每个位移贴图的索引都会被映射到相应的材质插槽。 例如，材质插槽0会映射到位移贴图索引0，材质插槽1会映射到索引1，以此类推。
        
4.  设置**量级（Magnitude）**来控制位移的数量。
    
5.  单击**应用更改（Apply Changes）**。
    

### Nanite曲面细分

该Nanite功能目前还在实验阶段。

Nanite曲面细分是一种动态可编程位移，允许在运行时使用位移贴图或程序化材质修改Nanite网格体。 这和世界位置偏移（World Position Offset）不同，后者只能在原始网格体顶点上操作，而Nanite位移可以在运行时将一个网格体细分为更多三角形，以符合位移图的细节。 它只生产当前像素密度所需的三角形数量。

Nanite曲面细分的优点包括：

-   在编辑管线中使用包含更少细节的源网格体。
    
-   依靠材质驱动并制作动画的置换。
    
-   创建精细的Nanite地形。
    

 

 

[![使用Nanite曲面细分](https://dev.epicgames.com/community/api/documentation/image/6c6c2f9d-4624-4892-907a-89252c0857cf?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6c6c2f9d-4624-4892-907a-89252c0857cf?resizing_type=fit)

[![不使用Nanite曲面细分](https://dev.epicgames.com/community/api/documentation/image/aad8ff8b-903b-4493-a746-78c04293a038?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/aad8ff8b-903b-4493-a746-78c04293a038?resizing_type=fit)

使用Nanite曲面细分

不使用Nanite曲面细分

*点击查看大图。*

要启用Nanite曲面细分，你需要在**ConsoleVariables.ini**或项目的.ini配置文件中设置以下控制台变量：

`   // This is read-only and must be set in the config file for the project.  r.Nanite.AllowTessellation=1     // This can be dynamically toggled at runtime.  r.Nanite.Tessellation=1         `

// This is read-only and must be set in the config file for the project. r.Nanite.AllowTessellation=1 // This can be dynamically toggled at runtime. r.Nanite.Tessellation=1

复制完整片段(5行长度)

设置好这些变量后，你就可以按以下步骤，使用材质编辑器设置曲面细分了：

1.  选择主材质节点。
    
2.  转到**Nanite**设置下的**细节（Details）**面板，勾选**启用曲面细分（Enable Tessellation）**复选框。
    
3.  将一个纹理取样连接到主材质节点的**位移（Displacement）**输入。
    

[![](https://dev.epicgames.com/community/api/documentation/image/1f11a6c4-dcbd-4e45-92f0-edb900748a92?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1f11a6c4-dcbd-4e45-92f0-edb900748a92?resizing_type=fit)

位移输入值的范围在0-1之间。

在材质中使用曲面细分时，有两个设置可以配置：

-   **量级（Magnitude）：**即位移的高度，由位移引脚的0-1范围映射到的最小到最大值衡量。 它也规定了用于剔除的边界，因此请只将其设置为需要的大小。
    
    此值对性能有重大影响，也可能造成其他意料之外的效果。 如需更多信息，请参阅下文的"注意事项"小节。
    
-   **中心（Center）**：此值指定了在基础网格体没有变化时的位移值。 因此如果以中间灰度为中心，且你希望网格体内外位移相等，请使用0.5。 如果只想往外推，则将其设为0。
    

此外，针对材质，你可以通过细节面板启用**位移淡出（Displacement Fade）**，从而优化Nanite曲面细分。 它具有两个设置：

-   **起始淡出尺寸（Start Fade Size）（像素）**：当开始淡出位移时，屏幕上的最大位移量应达到的大小（以像素为单位）。 此数值应**大于**"结束淡出尺寸（End Fade Size）"的值。
    
-   **结束淡出尺寸（End Fade Size）（像素）：**当淡出过程完成时，屏幕上的最大位移量应达到的大小（以像素为单位），此时位移应被禁用。 此数值应**小于**"起始淡出尺寸（Start Fade Size）"的值。
    

**注意事项：**

-   只对Nanite网格体生效。 非Nanite网格体会忽略曲面细分和位移。在不支持Nanite的情况下同样如此。
    
-   与离线渲染器不同，位移不会改变着色。 你需要提供对应的法线贴图或从位移派生物派生法线。 为了保证质量和压缩，我们建议提供额外的法线贴图。
    
-   仅限标量位移。 目前不支持向量位移。
    
-   位移沿着未规格化的内插顶点法线移动。 目前没有选项能够控制位移在着色器中的朝向。 它始终沿着法线移动。
    
-   位移发生在本地空间内，且发生在任何类型的对象缩放之前。 这意味着材质中指定的位移量级是以网格缩放前的对象空间为单位的。 这通常都符合你的需求，但也可能出现例外。 比如，如果你想将立方体上平铺的砖块纹理放大成一堵墙。 未来，我们可能会添加全局空间的选项来解决这些问题。
    
-   只要为地形生成了Nanite，曲面细分和位移就能在地形上运行良好。 可是，地形生成的网格体天然就体积巨大，因此请务必为地形材质使用小得多的量级。 比如小64倍。 将来，使用上一条中提到的选项或许可以解决此问题。
    
-   务必让量级（Magnitude）的值尽可能小。 另一方面，0-1间的位移输出值都可以随意使用。 请不要将量级设置为100，然后缩小位置输出的值来进行补偿。 这是因为量级值还被用于剔除的边界配接。 如果量级很大，可能会对性能造成严重影响，尤其是对虚拟阴影贴图。
    
-   目前还无法实现无缝位移，比如虚幻引擎4中的硬件曲面细分。 这意味着UV的接缝、硬边缘法线或任何影响位移且不平滑的顶点属性都会造成缝隙。
    
-   曲面细分可以与世界位置偏移（WPO）结合使用。 在此情况下，WPO会在曲面细分前被应用到基础网格体顶点。 位移则和往常一样，在曲面细分后被应用到细分出的三角形。
    
-   曲面细分与像素深度偏移（Pixel Depth Offset）不兼容。 如果启用了曲面细分，PDO将被忽略。
    
-   曲面细分可以与不透明遮罩结合使用，但由于性能原因，遮罩将按照细分出的三角形比率完成，而不是逐像素进行。 这对于大部分用例都没有问题，但对抖色效果不佳，因为后者确实需要逐像素完成。
    
-   位移贴图的纹理压缩瑕疵可能会比较明显，并呈现锯齿状。 在大部分情况下，使用BC4的纹理压缩设置Alpha都能运行良好。 存储在带有默认/DXT5/BC3的RGBA alpha通道中应该会得到类似的结果。 有时可能会要求完全不压缩，但浮点可能过大。 只要将通道打包，尤其是将高度和法线打包，任何压缩格式都可能出现瑕疵。 当高度图还被用于其他目的时，这可能与以往的经验相反。
    
-   位移与基础网格体的平坦三角形成相对关系。 这意味着它不会从曲面（如PN三角形或Catmull-Clark细分曲面）上开始。 曲面细分本身并不能让表面平滑。
    

### Nanite样条线

样条线网格体被用于沿着样条线形状使网格体变形，如地形地貌上的道路和小径。 启用Nanite的网格体默认支持样条线，且可以被创建为[地形样条线](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-splines-in-unreal-engine)和[蓝图样条线](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blueprint-splines-in-unreal-engine)。

[![Nanite样条线示例](https://dev.epicgames.com/community/api/documentation/image/f9e70211-d284-413a-9a79-6519b0455d63?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f9e70211-d284-413a-9a79-6519b0455d63?resizing_type=fit)

*使用Nanite网格体（位于前景）和Nanite样条线的示例场景。 此场景展示了光照和Nanite三角形视图的效果。*

Nanite样条线网格体可能拥有潜在的视觉问题， 比如在使用启用了Nanite的静态网格体创建样条线网格体时。当摄像机远离该样条线网格体时，其分辨率可能会下降。 这是因为Nanite在为此生成较低的细节级别（LOD）时，不会考虑样条线网格体的变形。 因此，在相同的距离上，当未变形时不明显的简化可能在沿样条线曲线拉伸时变得明显。

可以通过静态网格体编辑器的细节面板中**Nanite设置（Nanite Settings）**下的**最大边缘长度因子（Max Edge Length Factor）**设置项来缓解此问题。 该参数可以强制Nanite让屏幕上的网格体的顶点之间维持想要的距离，防止渲染出的网格体低于某个顶点密度阈值，从而保留足够的细节，以解决此问题。

[![Nanite设置最大边缘长度因子](https://dev.epicgames.com/community/api/documentation/image/626dca7f-e004-4097-a997-d56ab1cddf7b?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/626dca7f-e004-4097-a997-d56ab1cddf7b?resizing_type=fit)

最大边缘长度因子默认为0。 这说明此网格体的边缘长度将不被考虑。 大于0的值表示屏幕空间内任意两个相连顶点间的期望距离。 确切地说，此距离被表示为期望的最小Nanite三角形边缘的倍数（由`r.Nanite.MaxPixelsPerEdge`配置）。

#### 从旧引擎版本升级到Nanite样条

对于使用虚幻引擎5.3或更早版本开发的项目，使用启用Nanite的静态网格体的样条线网格体组件原本会像渲染普通静态网格体一样渲染从Nanite网格体生成的回退网格体。 由于虚幻引擎5.4默认开启了使用Nanite渲染样条线，现在这些网格体将被当做Nanite网格体渲染，从而造成视觉上的差异。

如要保留之前的行为，即将Nanite的回退网格体当作样条线网格体渲染，可以将`r.SplineMesh.RenderNanite`设为**0**。

## 非Nanite和Nanite内容混用工作流程

以下小节重点介绍了你在某些启用了Nanite的项目中可以使用的工作流程，这类项目还需要在不复制资产的情况下支持非Nanite功能和平台。

### 导入Nanite的高分辨率网格体

通过**内容浏览器（Content Browser）**或**静态网格体编辑器（Static Mesh Editor）**，你可以导入高分辨率网格体，将其作为现有非Nanite静态网格体的Nanite表示。

在**内容浏览器（Content Browser）**中，你可以在静态网格体资产上点击右键，打开快捷菜单，选择**细节级别（Level of Detail）> 高分辨率（High Res）> 导入高分辨率（Import High Res）**，然后找到你要导入的文件。

[![在内容浏览器中点击右键，打开资产的导入高分辨率细节级别选项。](https://dev.epicgames.com/community/api/documentation/image/fc1d1872-4d69-4adb-9e04-b956ef12321e?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/fc1d1872-4d69-4adb-9e04-b956ef12321e?resizing_type=fit)

或者，你也可以使用**静态网格体编辑器（Static Mesh Editor）**，使用**细节（Details）**面板中的**Nanite**设置来导入高分辨率网格体。 点击**导入（Import）**并找到你要导入的文件。

[![静态网格体编辑器Nanite导入高分辨率网格体的选项。](https://dev.epicgames.com/community/api/documentation/image/04e82d39-3784-4d2e-8415-43d672a2c58d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/04e82d39-3784-4d2e-8415-43d672a2c58d?resizing_type=fit)

使用此工作流程时，预先存在的静态网格体及其细节级别（LOD）链会成为**回退网格体（Fallback Mesh）**，而不是让导入进程根据Nanite几何体自动生成回退网格体。

此工作流程会遵循场景中静态网格体Actor上的**禁止Nanite（Disallow Nanite）**设置，下文的[静态网格体组件选项](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)小节对其进行了详细说明。

### 材质工作流程

有两种方法可以改进使用和不使用Nanite的材质工作流程：一是在材质图表中使用节点中止逻辑路径，二是使用仅用于Nanite渲染的重载材质。

#### Nanite Pass Switch节点

**Nanite Pass Switch**节点让你能在使用Nanite渲染时定义材质图表中的特殊行为。

[![Nanite Pass Switch材质节点](https://dev.epicgames.com/community/api/documentation/image/ca43b160-0f9e-4d06-aad7-d08c0c3da472?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ca43b160-0f9e-4d06-aad7-d08c0c3da472?resizing_type=fit)

在渲染到非Nanite通道中时使用**默认（Default）**输入，以按正常方式处理材质。 为你要简化或专门渲染到Nanite通道的材质逻辑使用**Nanite**输入。 例如，在材质使用的功能不受Nanite支持的情况下，你可以为默认（Default）输入保留相同的逻辑，并为Nanite输入使用更适宜的逻辑。

#### Nanite重载材质

材质和材质实例上提供了**Nanite重载材质（Nanite Override Material）**的插槽。 当你设置重载材质时，所有指定了材质或材质实例并启用了Nanite的网格体，都将改用所引用的Nanite重载材质。 这意味着，你可以创建Nanite工作流程专用的材质，而不是使用Nanite Pass Switch节点直接在材质图表内管理逻辑。

[![材质实例中的Nanite重载材质插槽。](https://dev.epicgames.com/community/api/documentation/image/fa17175b-2570-4bd3-aeaa-010e04e923da?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/fa17175b-2570-4bd3-aeaa-010e04e923da?resizing_type=fit)

在材质实例中，Nanite重载材质（Nanite Override Material）插槽会强制使用默认值**无（None）**，这样一来，为父材质设置重载项就不会导致该材质的子实例自动继承该重载项。

在下例中，雕像的静态网格体资产（Static Mesh Asset）启用了Nanite，并应用了材质实例。 出于演示目的，材质实例的**Nanite重载材质（Nanite Override Material）**被设置了一些简单的颜色变化。 左侧的静态网格体Actor显示了Nanite重载材质（Nanite Override Material），因为网格体使用Nanite渲染。 右侧的静态网格体Actor显示了相同的材质，直到为Actor设置了**禁止Nanite（Disallow Nanite）**，即禁用Nanite重载材质（Nanite Override Material）以显示材质实例的非Nanite基础材质。

### 静态网格体组件选项：禁止Nanite

你可以使用单个场景Actor上的**禁止Nanite（Disallow Nanite）**设置，设定启用了Nanite的静态网格体应在何时使用其Nanite表示。 这意味着，你可以混用使用了相同静态网格体资产的Nanite和非Nanite Actor。

[![静态网格体组件的禁止Nanite设置。](https://dev.epicgames.com/community/api/documentation/image/c61e560f-db33-4e3d-8d52-a449a23aa2f8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/c61e560f-db33-4e3d-8d52-a449a23aa2f8?resizing_type=fit)

下例显示的是启用了Nanite的单个静态网格体资产，左侧是Nanite网格体表示，右侧启用了"禁止Nanite"（Disallow Nanite）。

[![启用了Nanite和禁止了Nanite的网格体的视图示例](https://dev.epicgames.com/community/api/documentation/image/ae3428d3-cfab-4cee-9b8f-82aee44b16a7?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ae3428d3-cfab-4cee-9b8f-82aee44b16a7?resizing_type=fit)

### 地形地貌

你可以在地形Actor上启用Nanite。 Nanite地形网格体会在后台重新编译，不会打断用户在编辑器内的工作流程。 Nanite地形不会提高地形分辨率，但可以让用户使用Nanite的运行时功能，如GPU剔除、自动化几何体流送和LOD。 它通常能提升运行时性能，对于开销较大的功能（如VSM）效果尤其显著。

如需了解如何为地形启用和使用Nanite，请参阅[在地形中使用Nanite](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-nanite-with-landscapes-in-unreal-engine)文档。

### 常见内容的性能

为了便于比较，我们以PlayStation 5的虚幻引擎5技术演示[Nanite地形中的Lumen](https://www.youtube.com/watch?v=qC5KtatMcUw)为例，记录了以下GPU耗时信息：

-   平均渲染分辨率为1400p，时序上采样到4K。
    
-   剔除和光栅化Nanite网格体的时间约为2.5毫秒（演示中几乎所有网格体都是Nanite网格体）
    
    -   几乎使用的所有几何体都是Nanite网格体
        
    -   几乎没有CPU开销，因为场景100%由GPU驱动
        
-   所有Nanite网格体材质的求值时间都约为2毫秒
    
    -   场景中每个材质都只产生一次绘制调用，因此CPU开销很小。
        

将这些GPU耗时叠加后大约是4.5毫秒，相当于虚幻4中深度预通道加上基础通道的时间。 这使得Nanite可用于那些以60 FPS为目标的游戏项目。

这类数据的前提是，项目不存在上文提及的各种性能不利因素。 海量的实例数量以及大量的独特材质也会导致开销变大，而这也是目前Nanite的重点开发领域之一。

## 数据大小

Nanite能够实现大量微观细节，这可能会让人认为几何体数据会大量增加，导致玩家的游戏包大小和下载数据增加。 然而，现实并没有那么可怕。 事实上，Nanite的网格体格式要比标准的静态网格体格式小得多，因为Nanite有专门的网格体编码格式。

例如，对虚幻引擎5示例《古代山谷》来说，平均而言，Nanite网格体的每个输入三角形会消耗14.4字节。 这意味着平均一个拥有100万三角形的Nanite网格体，在磁盘上需要约13.8兆字节（MB）。

将一个传统的低模网格体（带有法线贴图）和一个高模Nanite网格体相比较，你会看到以下效果：

 

 

**低模网格体**

-   三角形：**19,066**
    
-   顶点：**10,930**
    
-   LOD数量：**4**
    
-   Nanite：**禁用**
    

静态网格体压缩包大小：**1.34MB**

**Nanite网格体**

-   三角形：**1,545,338**
    
-   顶点：**793,330**
    
-   LOD数量：不适用
    
-   Nanite：**启用**
    

静态网格体压缩包大小：**19.64MB**

![低模静态网格体 | 带4K法线贴图](https://dev.epicgames.com/community/api/documentation/image/773e1aa6-0337-4f18-87a8-510fd62add42?resizing_type=fit&width=1920&height=1080)

![高模静态网格体 | 带4K法线贴图](https://dev.epicgames.com/community/api/documentation/image/39889a2d-09f9-453b-b550-fb9171b895af?resizing_type=fit&width=1920&height=1080)

低模静态网格体 | 带4K法线贴图

高模静态网格体 | 带4K法线贴图

不过压缩包的大小并不代表资产的全部大小。 项目中还有一些只有这个网格体会用到的特有纹理，也必须计算在内。 许多网格体使用的材质都有自己独特的纹理，包括各种法线、基础颜色、金属感、高光度、粗糙度和遮罩纹理。

这个资产只使用了两种纹理（基础颜色和法线），因此不像其他一些采用了各种独特纹理的资产那样耗费磁盘空间。 例如，注意Nanite网格体的大小（约150万个三角形）要小于4k法线贴图纹理的大小（19.64MB）。

纹理类型

纹理大小

磁盘上的大小

**基础颜色（BaseColor）**

4K x 4K

**8.2MB**

**法线（Normal）**

4K x 4K

**21.85MB**

这个网格体和它的纹理在压缩后的总包大小是：

-   低模网格体：**31.04MB**
    
-   高模网格体：**49.69MB**
    

由于Nanite网格体的细节已经非常丰富了，我们可以尝试用平铺细节法线贴图（与其他资产共享）来代替独特的法线贴图。 虽然在这种情况下，这会导致一些品质上的损失，但损失很小，无疑比低模网格体和高模网格体之间的品质差异小得多。 因此，相比一个采用4K法线贴图的低模网格体，一个由150万个三角形组成的Nanite网格体既可以看起来更美观，体积也可以更小。

启用了Nanite的网格体和纹理的压缩包总大小：**27.83MB**

![高模静态网格体 | 带4K法线贴图](https://dev.epicgames.com/community/api/documentation/image/f4e334ed-b729-423d-b3f2-556b1a13701d?resizing_type=fit&width=1920&height=1080)

![Nanite网格体 | 带4K细节法线贴图](https://dev.epicgames.com/community/api/documentation/image/98357a20-8ddf-4820-ad32-eb17bfce409b?resizing_type=fit&width=1920&height=1080)

高模静态网格体 | 带4K法线贴图

Nanite网格体 | 带4K细节法线贴图

在纹理分辨率和细节法线贴图方面可以做很多实验。这个比较是为了证明Nanite网格体的数据大小与美术师早已熟悉的数据大小没有太大区别。

最后，我们可以将Nanite压缩比作是使用高模的标准静态网格体格式，因为两者在LOD0时是相同的。

 

 

**高模静态网格体**

-   三角形：**1,545,338**
    
-   顶点：**793,330**
    
-   LOD数量：**4**
    
-   Nanite：**禁用**
    

静态网格体压缩包大小：**148.95MB**

**Nanite网格体**

-   三角形：**1,545,338**
    
-   顶点：**793,330**
    
-   LOD数量：不适用
    
-   Nanite：**启用**
    

静态网格体压缩包大小：**19.64MB**

对比前面的Nanite压缩包，其大小为**19.64MB**，比拥有4个LOD的标准静态网格体压缩包小**7.6倍**。

Nanite压缩和数据大小是我们关注的重点，在虚幻引擎的未来版本中会得到持续改进。

### 关于数据大小的通用建议

使用Nanite和[虚拟纹理](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-texturing-in-unreal-engine)系统，再配合高速固态硬盘，可以减少几何体和纹理的运行时预算问题。 目前最大的瓶颈是如何将此数据交付给用户。

在考虑内容交付方式时，即考虑是使用物理介质还是通过互联网下载时，磁盘上的数据大小是重要的因素，而且压缩技术能做的有限。 终端用户的平均互联网带宽、光介质容量、硬盘容量等，往往落后于硬盘带宽、访问延迟、GPU算力和软件技术（例如Nanite）的发展。 因此，将数据提供给客户面临挑战。

高效渲染细节丰富的网格体对于Nanite来说不是太大的问题。但在磁盘中如何保存数据，依然是一个需要改进的关键领域。

## 可视化模式

Nanite包含多种可视化模式来检查其在当前场景中的数据。

转到关卡视口中的**视图模式（View Modes**）下拉菜单，将鼠标悬停在**Nanite可视化（Nanite Visualization）**上，然后从选项中进行选择。

[![视口中的Nanite可视化菜单](https://dev.epicgames.com/community/api/documentation/image/8a3ba2cf-2de8-4538-b1b2-a21c6817b36d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/8a3ba2cf-2de8-4538-b1b2-a21c6817b36d?resizing_type=fit)

例如，**概览（Overview）**可视化选项会在图像中心显示渲染后的场景，并在屏幕上显示各个Nanite可视化视图以供参考。

[![Nanite概览可视化](https://dev.epicgames.com/community/api/documentation/image/460a360d-3cc2-486f-970a-f283f737140b?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/460a360d-3cc2-486f-970a-f283f737140b?resizing_type=fit)

以下Nanite可视化模式可供选择：

Nanite可视化

说明

**遮罩（Mask）**

将Nanite几何体体标记为绿色，非Nanite几何体标记为红色。

**三角形（Triangles）**

显示当前场景中的Nanite网格体的所有三角形。

**斑块（Patches）**

显示当前场景中Nanite网格体的所有斑块。

**簇（Clusters）**

显示当前场景视图中正在渲染的所有三角形分组（彩色表示）。

**图元（Primitives）**

将某个实例静态网格体（ISM）中所有实例的组件用同一种颜色显示。

**实例（Instances）**

将场景中的各个实例用不同颜色绘制。

**过度绘制（Overdraw）**

显示场景几何体上的过度绘制情况。 所有预估的像素，包括遮罩的像素都会被加入过度绘制视图。 紧密堆叠在一起的较小对象会比较大的对象产生更多的过度绘制。

**光照贴图UV（Lightmap UV）**

显示Nanite几何体上的材质复杂度。

**计算WPO（Evaluate WPO）**

启用了Nanite且使用世界位置偏移的几何体为绿色，反之则为红色。

**像素可编程（Pixel Programmable）**

**曲面细分（Tessellation）**

使用曲面细分和仅发生在曲面细分网格体上的细分次数对Nanite网格体进行可视化。

**光栅化分组（Raster Bins）**

显示代表几何体批次的分组。

**着色分组（Shading Bins）**

Nanite提供了一个**高级（Advanced）**可视化模式，在**Nanite可视化（Nanite Visualization）**菜单中包含了更多可视化选项。 这些额外的可视化功能对程序员调试或分析Nanite的各种底层内容非常有用。

此高级可视化模式可以通过控制台变量`r.Nanite.Visualize.Advanced 1`来启用。

## 控制台变量和命令

你可以使用以下统计数据和控制台变量对Nanite进行调试和配置。

在运行时，你可以使用控制台变量`r.Nanite 0`来在全局上启用或禁用Nanite渲染。 禁用Nanite能让你模拟那些不支持Nanite的平台。

### Nanite回退渲染模式

当Nanite遭到禁用或平台不支持时，Nanite还提供了回退网格体渲染模式。 你可以通过控制台变量`r.Nanite.ProxyRenderMode`来控制使用哪种模式。

-   默认模式为**0**。如果进行相应设置，就会回退为渲染回退网格体，或采用基于屏幕空间的LOD。 这包括在静态网格体编辑器属性中识别**最小LOD（Min LOD）**（见上文[回退网格体](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)小节）。
    
-   **1**禁用渲染任何启用了Nanite的网格体。
    
-   **2**与模式1类似，但允许在静态网格体编辑器中通过**显示（Show）>Nanite回退（Nanite Fallback）**可视化选项来渲染Nanite回退。
    

假如场景的实例数量非常大，远超过普通情况下的数量（即未启用Nanite时），则回退（Fallback）渲染模式1和2都很有用。 这些模式使你能够在不支持Nanite的平台上用编辑器打开该场景。

例如，在虚幻引擎5的示例项目《古代山谷》中，禁用Nanite会导致产生数以万计的常规绘制调用，导致在那些不支持Nanite的平台上甚至难以打开该贴图。

### Nanite统计数据命令

在控制台输入**NaniteStats**命令后，视口右上方会添加Nanite剔除统计数据的覆层。

[![Nanite屏上统计显示](https://dev.epicgames.com/community/api/documentation/image/0377345f-28d3-4ae8-8bc0-efe779877787?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/0377345f-28d3-4ae8-8bc0-efe779877787?resizing_type=fit)

命令参数可用于指定Nanite在屏幕上显示哪些统计信息。 当没有提供参数时，将使用主视图。

使用`NaniteStats List`以在调试输出中显示所有可用视图：

-   Primary
    
-   VirtualShadowMaps
    

当`ShadowAtlas`和`CubemapShadows`的其他统计信息可用时，你还可以看到其他的可用信息。 输入命令，后跟你要查看的统计信息列表名称，即可选择视图。 例如，你可以输入`NaniteStats VirtualShadowMaps`。

对于使用双通道遮挡剔除的视图，统计数据会为主通道（Main）和后通道（Post）划分单独的块。

### 调整Nanite流送池的大小

控制台变量`r.Nanite.Streaming.StreamingPoolSize`可用于指定使用多少内存来保存Nanite的流送数据。 使用较大的内存池可以减少在场景中移动时产生的IO和解压缩工作量，但代价是内存占用较大。

如果内存池不够大，无法容纳一个视图所需的所有数据，就会发生"缓存抖动（Cache thrash）"，导致即便是静态视图，流送也无法解决。

要可视化Nanite的流送数据，可以使用流送几何体（Streaming Geometry）显示标记，方法是依次点击**显示（Show）> Nanite > 流送几何体（Streaming Geometry）**。 一旦禁用该选项，Nanite网格体将只会在始终驻留在内存中的质量级别中被渲染。

### 设置单个通道的最大簇数

控制台变量`r.Nanite.MaxCandidateClusters`和`r.Nanite.MaxVisibleClusters`可以指定单个通道中的最大候选簇数量和可见簇数量。 它们的值可用于确定中间缓冲区的大小，它们的默认值已经用于常见的游戏渲染场景中。

目前没有动态调整这些缓冲区大小的机制，也无法在溢出时自动降低品质。如果这些数值过小，无法满足场景复杂度，就可能会导致渲染瑕疵，通常表现为几何体丢失或闪烁。 当出现此类瑕疵时，请使用`NaniteStats`来确定候选簇和可见簇的保守边界。 具体而言，请查看**ClustersSW**和**ClustersHW**的统计信息。 目前一个候选簇的内存开销是12字节，一个可见簇的内存开销是16字节。

这个控制台变量无法在运行时改变，必须在配置（.ini）文件中指定。

-   [performance](https://dev.epicgames.com/community/search?query=performance)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Nanite的优势](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#benefits-of-nanite)
-   [Nanite网格体和传统静态网格体的不同之处](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#differences-between-a-nanite-mesh-and-static-mesh)
-   [Nanite如何工作？](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#how-does-nanite-work)
-   [应该将Nanite用于哪些类型的网格体？](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#what-types-of-meshes-should-nanite-be-used-for)
-   [在网格体上启用Nanite支持](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#enabling-nanite-support-on-meshes)
-   [导入网格体](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#importing-a-mesh)
-   [在资产上启用Nanite](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#enabling-nanite-on-assets)
-   [在网格体上批量启用Nanite](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#enable-nanite-on-meshes-in-batches)
-   [对单个网格体启用Nanite](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#enable-nanite-on-individual-meshes)
-   [支持的Nanite功能](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#supported-features-of-nanite)
-   [几何体](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#geometry)
-   [材质](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#materials)
-   [渲染](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#rendering)
-   [支持的平台](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#supported-platforms)
-   [Nanite回退网格体和精度设置](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#nanite-fallback-mesh-and-precision-settings)
-   [顶点精度](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#vertex-precision)
-   [优化数据](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#trimming-data)
-   [回退网格体](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#fallback-mesh)
-   [回退网格体可视化](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#fallback-mesh-visualization)
-   [对启用了Nanite的网格体使用自定义回退网格体LOD](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#using-custom-fallback-mesh-lo-ds-for-nanite-enabled-meshes)
-   [性能以及内容相关的问题](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#working-with-nanite-enabled-content)
-   [聚合几何体](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#aggregate-geometry)
-   [紧密堆叠的表面](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#closely-stacked-surfaces)
-   [面片法线和硬边法线](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#faceted-and-hard-edge-normals)
-   [Nanite骨骼网格体](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#nanite-skeletal-mesh)
-   [为植被使用Nanite](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#foliage-using-nanite)
-   [使用Nanite的最大世界位置偏移位移](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#using-max-world-position-offset-displacement-with-nanite)
-   [Nanite静态位移贴图](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#nanite-static-displacement-mapping)
-   [Nanite曲面细分](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#nanite-tessellation)
-   [Nanite样条线](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#nanite-splines)
-   [从旧引擎版本升级到Nanite样条](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#upgrading-to-nanite-splines-from-a-previous-engine-version)
-   [非Nanite和Nanite内容混用工作流程](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#hybrid-non-nanite-and-nanite-content-workflows)
-   [导入Nanite的高分辨率网格体](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#importing-a-high-resolution-mesh-for-nanite)
-   [材质工作流程](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#material-workflows)
-   [Nanite Pass Switch节点](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#nanite-pass-switch-node)
-   [Nanite重载材质](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#nanite-override-material)
-   [静态网格体组件选项：禁止Nanite](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#static-mesh-component-option-disallow-nanite)
-   [地形地貌](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#landscape-terrain)
-   [常见内容的性能](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#performance-of-typical-content)
-   [数据大小](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#data-size)
-   [关于数据大小的通用建议](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#general-advice-on-data-size)
-   [可视化模式](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#visualization-modes)
-   [控制台变量和命令](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#console-variables-and-commands)
-   [Nanite回退渲染模式](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#nanite-fallback-rendering-modes)
-   [Nanite统计数据命令](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#nanite-stats-command)
-   [调整Nanite流送池的大小](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#resizing-the-nanite-streaming-pool-size)
-   [设置单个通道的最大簇数](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine#setting-maximum-clusters-in-a-single-pass)
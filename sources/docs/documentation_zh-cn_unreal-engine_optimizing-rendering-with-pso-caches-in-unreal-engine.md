# 在虚幻引擎中使用PSO缓存优化渲染 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/optimizing-rendering-with-pso-caches-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:38:36.604Z

---

目录

![PSO缓存](https://dev.epicgames.com/community/api/documentation/image/549b4afd-ff4a-46c9-b3a3-1c0bf6a403c4?resizing_type=fill&width=1920&height=335)

早期的图形API（如 **Direct3D 11**），在发出绘制调用之前，需要进行数十次单独调用，以便动态配置GPU参数。更多最新的图形API（如 **Direct3D 12（D3D12）** 、 **Vulkan** 和 **Metal** ）支持使用名为 **管线状态对象** **（PSO）** 的预配置GPU状态信息包，可以更快速地更改GPU状态。

尽管这样可大幅提升渲染效率，但按需生成新PSO可能需要100毫秒或更久，因为应用程序必须配置所有可能的参数。因此，为提升效率，必须在需要使用PSO之前提前很久生成PSO。

在具有高可编程性的实时渲染环境（**虚幻引擎（UE）**）中，所有包含大量内容的应用程序均具有很多可以变更的GPU状态参数，使提前手动配置PSO变得可行。为了解决这个复杂的问题，UE可以在运行时从应用程序构建中采集关于GPU状态的数据，然后使用此缓存数据，在使用PSO前提前很久生成新的PSO。这样可以将可能的GPU状态范围缩小至仅限应用程序中使用的那些。因运行应用程序而采集的PSO说明称为 **PSO缓存**。

在虚幻引擎中采集PSO的步骤：

1.  运行游戏。
    
2.  记录实际绘制的内容。
    
3.  在构建中包含此信息。
    

然后，对于后续运行，游戏可以先于渲染代码需要GPU状态前，创建必要的GPU状态。

本文档介绍了UE中的可用PSO类型和生成PSO缓存的详细过程。

## 术语和所支持的PSO类型

本文档普遍使用D3D12 API中使用的"管线状态对象"（PSO）一词来指代GPU状态。其他API使用略有不同的名称。例如，Vulkan使用 *管线* ，Metal使用 *管线状态* 。然而，从概念上讲，所有名称都相似。

术语 *PSO缓存* 是指包含在构建中的带有PSO描述的文件，因此游戏可以尽早创建这些状态。换言之，PSO缓存即为要尽早创建的PSO列表。

虚幻引擎支持两种类型的PSO：

-   **图形** **PSO**（Graphics PSO），代表应用程序图形管线的状态，包含多个可配置变量。
-   **计算** **PSO**（Compute PSO），通常采用 **计算着色器** 形式。

除了上述PSO类型之外，还有 **光线追踪PSO** ，但UE 5.0不支持对光线追踪数据进行PSO缓存。

## 生成PSO缓存

参考下述页面，了解如何生成PSO缓存：

[

![PSO预缓存](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9884dc1-ce48-4328-8f86-e23836217c4d/placeholder_topic.png)

PSO预缓存

使用PSO预缓存以自动收集和编译PSO。





](/documentation/zh-cn/unreal-engine/pso-precaching-for-unreal-engine)[

![创建捆绑的PSO缓存](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9dda195-d36e-4be6-8d0c-6ef2accd26f5/placeholder_topic.png)

创建捆绑的PSO缓存

手动创建PSO缓存并将其与你的游戏绑定。





](/documentation/zh-cn/unreal-engine/manually-creating-bundled-pso-caches-in-unreal-engine)

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [platforms](https://dev.epicgames.com/community/search?query=platforms)
-   [psos](https://dev.epicgames.com/community/search?query=psos)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [术语和所支持的PSO类型](/documentation/zh-cn/unreal-engine/optimizing-rendering-with-pso-caches-in-unreal-engine#%E6%9C%AF%E8%AF%AD%E5%92%8C%E6%89%80%E6%94%AF%E6%8C%81%E7%9A%84pso%E7%B1%BB%E5%9E%8B)
-   [生成PSO缓存](/documentation/zh-cn/unreal-engine/optimizing-rendering-with-pso-caches-in-unreal-engine#%E7%94%9F%E6%88%90pso%E7%BC%93%E5%AD%98)
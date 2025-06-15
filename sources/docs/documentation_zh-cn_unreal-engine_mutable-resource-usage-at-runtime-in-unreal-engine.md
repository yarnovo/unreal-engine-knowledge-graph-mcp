# 在虚幻引擎中Mutable在运行时的资源使用情况 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mutable-resource-usage-at-runtime-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:03:47.345Z

---

目录

![运行时资源使用情况](https://dev.epicgames.com/community/api/documentation/image/02c75642-7d72-467b-b782-8c9af313f08d?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

本节适用于在运行时使用Mutable的项目。如果你的项目使用的工作流程仅在虚幻编辑器中使用Mutable，则不会有额外的资源使用。

当在运行时使用Mutable从CustomizableObject创建资产时，Mutable作为一个插件，需要以下额外资源才能运行：

-   CPU时间：
    -   大部分CPU加载时间在工作线程中。这使用虚幻任务系统将工作拆分为多个任务。
    -   也有一小部分工作在游戏线程中进行。这些工作必须足够小，以避免卡顿。
-   内存：
    -   Mutable生成的最终资产是标准的虚幻引擎资源（纹理、骨骼网格体、动画蓝图等）。
    -   在编译这些资源时，Mutable需要"工作内存"来执行中间操作。
-   磁盘流送带宽：
    -   在角色持续构建过程中，Mutable会加载自身的数据。这会使用虚幻磁盘流送系统。

对于Mutable的CPU和内存使用情况，Unreal Insights中有相应的通道。这些通道默认为关闭，但在捕获时启用它们可以很好地了解运行时工作完成的情况。

## Mutable操作

所有Mutable操作（实例生成或更新）都是按顺序进行，绝不会同时出现两个操作。因此，所有操作都被视为异步操作，并且在操作完成时会有回调通知。

当CustomizableObjectInstance的参数发生更改时，显式调用会强制其进行更新。当Mutable完成更新操作时，将创建或替换引擎资源。

Mutable可以与虚幻引擎的纹理流送功能集成。在进行集成时，每当纹理流送系统请求新的纹理mipmap时，Mutable都会将工作排入队列。在正常的实例更新中，也会按顺序依次进行。

## 内存和缓存

Mutable使用的工作内存量直接取决于正在构建的可自定义对象。其上限的大致估算值约为未压缩格式下生成的最大纹理或最大网格体的内存的2倍。这取决于对纹理执行的操作、UV布局块的使用情况，或者可自定义对象编译设置。

Mutable确实会尝试将工作内存保持在一定限制内。该限制可以在每个平台的INI文件中指定，但某些项目可能希望针对不同的游戏内场景对其进行控制。例如，当玩家处于角色创建界面时，你可能希望为Mutable提供更多内存来缓存数据，从而加快实例更新速度。在这种情况下，可以直接使用 `UCustomizableObject::SetWorkingMemory` 方法或 `mutable.WorkingMemory` 控制台变量进行设置。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [working with content](https://dev.epicgames.com/community/search?query=working%20with%20content)
-   [skeletal mesh](https://dev.epicgames.com/community/search?query=skeletal%20mesh)
-   [mutable](https://dev.epicgames.com/community/search?query=mutable)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Mutable操作](/documentation/zh-cn/unreal-engine/mutable-resource-usage-at-runtime-in-unreal-engine#mutable%E6%93%8D%E4%BD%9C)
-   [内存和缓存](/documentation/zh-cn/unreal-engine/mutable-resource-usage-at-runtime-in-unreal-engine#%E5%86%85%E5%AD%98%E5%92%8C%E7%BC%93%E5%AD%98)
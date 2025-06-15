# 使用虚幻引擎进行多进程渲染 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/multi-process-rendering-with-unreal-engine
> 
> 生成时间: 2025-06-14T20:26:37.643Z

---

目录

![多进程渲染](https://dev.epicgames.com/community/api/documentation/image/31fce610-d246-4a0b-9270-f085feeab661?resizing_type=fill&width=1920&height=335)

## 什么是多进程渲染？

**多进程渲染（Multi-Process Rendering）** 是利用多个GPU的算力进行nDisplay渲染的方法。这种方法允许在所有GPU上同时渲染特定的视口。例如可以用主GPU渲染外视锥体，同时用次GPU渲染内视锥体。

在绝大多数情况下（取决于场景），多进程渲染比4.27版本中引入的多GPU渲染性能更高。多进程和多GPU使用的物理硬件配置相同，因此切换到多进程工作流程没有弊端。多进程也是使用多个NVIDIA [ADA Lovelace](https://en.wikipedia.org/wiki/Ada_Lovelace) GPU进行渲染的推荐方式，因为它们不支持多GPU（mGPU）配置所推荐的NVLink。

顾名思义，多进程渲染就是在每个渲染节点上启动两个虚幻引擎的实例（或称进程）。第一个节点是普通的nDisplay节点。也即 **屏幕内节点（onscreen node）** ，因为它会渲染到LED墙上，并且渲染时在Windows中可见。第二个节点会作为单独的Windows进程运行，属于无头实例，不直接可见，因此被称为 **屏幕外节点（offscreen node）** 。

在上方的视锥体示例中，屏幕外节点将用次GPU渲染内视锥体，并将其作为纹理共享给屏幕内节点。屏幕内节点会用主GPU进行渲染，将内视锥体与外视锥体合成，并显示到LED墙上。

多进程只会通过CPU/主板在GPU之间共享最终渲染的纹理。共享渲染纹理比多GPU更高效，后者需要巨大的带宽才能通过NVLink和SLI共享所有GPU内存。

两种方法的对比见下表：

![对比表格](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f11b3fc-8a8a-4f58-9c8f-ffedfd914064/table.png)

## 技术先决条件

-   至少两个 **GPU**
-   **必须禁用SLI** （关于SLI的配置，请参阅[Nvidia文档](https://www.nvidia.com/content/Control-Panel-Help/vLatest/zh-cn/index.htm)）
-   如果使用Nvidia Mosaic，请确保未将其设置为Premium Mosaic，因为这会启用SLI
-   **禁用Intel超线程/AMD同步多线程。**建议这样做以确保最佳性能。请注意，禁用这两项功能可能会影响你正在使用的其他软件的性能。着色器编译时间可能因此延长。
-   当前支持的NVIDIA驱动程序和控制面板设置，包括同步。如需相关信息，请参阅我们的[使用NVIDIA GPU进行nDisplay同步页面](/documentation/zh-cn/unreal-engine/synchronization-in-ndisplay-in-unreal-engine)。

## 必备知识

-   熟悉[ICVFX快速入门](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine)中的概念，包括如何创建新配置。

## 其他主题

[](/documentation/zh-cn/unreal-engine/getting-started-with-multi-process-rendering-in-unreal-engine)

[![多进程渲染快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4ba6a29-01b5-429d-8758-388cf8a13d79/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/getting-started-with-multi-process-rendering-in-unreal-engine)

[多进程渲染快速入门](/documentation/zh-cn/unreal-engine/getting-started-with-multi-process-rendering-in-unreal-engine)

[了解如何设置多进程渲染。](/documentation/zh-cn/unreal-engine/getting-started-with-multi-process-rendering-in-unreal-engine)

[

![从mGPU转换为多进程渲染](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95960a42-9fa9-4f82-b811-774e8623598c/placeholder_topic.png)

从mGPU转换为多进程渲染

转换现存的多GPU配置以供多进程渲染。





](/documentation/zh-cn/unreal-engine/converting-from-mgpu-to-multi-process-rendering-in-unreal-engine)

## 实用链接

-   [NVIDIA文件](https://nvidia.com/content/Control-Panel-Help/vLatest/zh-cn/index.htm)
-   [使用NVIDIA GPU进行nDisplay同步](/documentation/zh-cn/unreal-engine/synchronization-in-ndisplay-in-unreal-engine)
-   [ICVFX快速入门](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine)

-   [ndisplay](https://dev.epicgames.com/community/search?query=ndisplay)
-   [icvfx](https://dev.epicgames.com/community/search?query=icvfx)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)
-   [multi-process rendering](https://dev.epicgames.com/community/search?query=multi-process%20rendering)
-   [mgpu](https://dev.epicgames.com/community/search?query=mgpu)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [什么是多进程渲染？](/documentation/zh-cn/unreal-engine/multi-process-rendering-with-unreal-engine#%E4%BB%80%E4%B9%88%E6%98%AF%E5%A4%9A%E8%BF%9B%E7%A8%8B%E6%B8%B2%E6%9F%93%EF%BC%9F)
-   [技术先决条件](/documentation/zh-cn/unreal-engine/multi-process-rendering-with-unreal-engine#%E6%8A%80%E6%9C%AF%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [必备知识](/documentation/zh-cn/unreal-engine/multi-process-rendering-with-unreal-engine#%E5%BF%85%E5%A4%87%E7%9F%A5%E8%AF%86)
-   [其他主题](/documentation/zh-cn/unreal-engine/multi-process-rendering-with-unreal-engine#%E5%85%B6%E4%BB%96%E4%B8%BB%E9%A2%98)
-   [实用链接](/documentation/zh-cn/unreal-engine/multi-process-rendering-with-unreal-engine#%E5%AE%9E%E7%94%A8%E9%93%BE%E6%8E%A5)
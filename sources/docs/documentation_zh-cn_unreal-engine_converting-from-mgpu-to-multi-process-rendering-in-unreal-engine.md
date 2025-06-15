# 在虚幻引擎中从mGPU转换为多进程渲染。 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/converting-from-mgpu-to-multi-process-rendering-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:26:33.655Z

---

目录

![从mGPU转换为多进程渲染](https://dev.epicgames.com/community/api/documentation/image/4cbed4c9-cd81-4136-bdbc-c333c96b5d23?resizing_type=fill&width=1920&height=335)

## 转换mGPU配置

现存的nDisplay摄像机内视觉特效处理（ICVFX）用户可能已经用上了多GPU，并希望转换以供多进程渲染。要实现这一点，必须更改计算机和虚幻引擎中的某些设置。

下文小节将着重介绍如何将现存的nDisplay配置从多GPU转换为多进程。本章节将借用[快速入门](/documentation/zh-cn/unreal-engine/getting-started-with-multi-process-rendering-in-unreal-engine)页面的知识，逐步讲解实用示例。

### 设置

下方的NVIDIA控制面板设置专门针对将多GPU配置转换为多进程的场景。要访问NVIDIA控制面板，请右键点击计算机桌面，然后从上下文菜单中选择该面板。

-   **SLI：** 为mGPU而设置的机器会启用SLI。请前往标题为"设置SLI和PhysX配置（Set SLI and PhysX Configuration）"的分段，并 **禁用SLI** 。
-   **Mosaic：** 多GPU会使用最大GPU拓扑，而多线程要求最小GPU拓扑。如果你使用的是Mosaic，则需要在NVIDIA控制面板的"设置Mosaic（Set Up Mosaic）"分段更改此设置。如果未使用Mosaic则不适用此设置。

### 添加屏幕外节点

本示例中的nDisplay配置稍显复杂，多出了数个节点，以表现高级用户可能会使用的配置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2dc5227e-041c-42f3-88b8-790af3493048/conversion-1.png)

转到群集（Cluster）面板，选择每台机器的主机并 **+添加** 一个新的群集节点。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c901a473-9dc5-4ac0-9abc-3b03a5ce7df0/conversion-2.png)

在 **新增群集节点（Add New Cluster Node）** 窗口中调整下列设置项：

根据节点的现行命名规范，我将其命名为Node\_1\_OS，表示它在屏幕外。

**禁用** "添加视口（Adding a Viewport）"。

**启用（Enable）** "无头渲染（Headless Rendering）"。

保留IP地址，以匹配常规的屏幕内节点地址。

将 **图形适配器（Graphics Adapter）** 设为 **1** ，即次级GPU。

点击 **添加（Add）** 。

如需详细了解添加新群集节点（Add New Cluster Node）的设置项，请参阅[快速入门页面](/documentation/zh-cn/unreal-engine/getting-started-with-multi-process-rendering-in-unreal-engine)。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5bec20e-8711-421b-b10a-834b01cae497/conversion-3.png)

**我将继续对其他节点重复这一过程。**最后我们将得到Node\_2\_OS和Node\_3\_OS，且所有设置均与上文相同。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13da86c0-9cf7-4304-9055-1934b6ebed59/conversion-4.png)

### 摄像机设置

接下来需要设置ICVFX摄像机组件。我们在此项目中用到了两台摄像机，这意味着存在两个视锥体。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/139dba1b-6b96-4fa6-9f5b-814facadf475/conversion-5.png)

请打开第一台ICVFX摄像机的"细节（Details）"面板。相关初始步骤与"快速入门"小节里创建多进程渲染配置所用的步骤相同。

本例不使用一个节点，而是使用三个节点为项目接收信息。请使用下拉菜单将节点设置为 **Node\_1、Node\_2和Node\_3** 。

将媒体源（Media Source）设为 **共享媒体（Shared Media）** 。

我会将"唯一名称（Unique Name）"设为 **ICVFXCamA** 。

现在来设置 **输出群组（Output Group）** 。我们再添加三个节点，但这次将节点设为 **Node\_1\_OS、Node\_2\_OS以及Node\_3\_OS** 。

将媒体源（Media Source）设为 **共享媒体（Shared Media）** 。

将"唯一名称（Unique Name）"同样设为 **ICVFXCamA** 。建议用复制和粘贴的方法，因为名称对字符串敏感，即使略有不同也会导致错误。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e6e7b83-d5e4-48ab-94cb-8a3da273b532/conversion-6.png)

现在为第二台摄像机重复上述步骤，但请使用不同的唯一名称（Unique Name）。这一点非常重要 — 将其命名为 **ICVFXCamB** 。

**编译（Compile）** 并保存。

## Switchboard

在Switchboard中会有三个多进程节点和三个常规的nDisplay节点。由于每台机器都有一个常规nDisplay渲染节点和一个屏幕外渲染节点，因此需要启动以上所有六个节点。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1dad89e-0af7-40ae-bc8c-0dc27aa64a12/conversion-7.png)

至此，多GPU配置已转换完毕，随时可以用于多进程渲染！

-   [ndisplay](https://dev.epicgames.com/community/search?query=ndisplay)
-   [icvfx](https://dev.epicgames.com/community/search?query=icvfx)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)
-   [multi-process rendering](https://dev.epicgames.com/community/search?query=multi-process%20rendering)
-   [mgpu](https://dev.epicgames.com/community/search?query=mgpu)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [转换mGPU配置](/documentation/zh-cn/unreal-engine/converting-from-mgpu-to-multi-process-rendering-in-unreal-engine#%E8%BD%AC%E6%8D%A2mgpu%E9%85%8D%E7%BD%AE)
-   [设置](/documentation/zh-cn/unreal-engine/converting-from-mgpu-to-multi-process-rendering-in-unreal-engine#%E8%AE%BE%E7%BD%AE)
-   [添加屏幕外节点](/documentation/zh-cn/unreal-engine/converting-from-mgpu-to-multi-process-rendering-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%B1%8F%E5%B9%95%E5%A4%96%E8%8A%82%E7%82%B9)
-   [摄像机设置](/documentation/zh-cn/unreal-engine/converting-from-mgpu-to-multi-process-rendering-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA%E8%AE%BE%E7%BD%AE)
-   [Switchboard](/documentation/zh-cn/unreal-engine/converting-from-mgpu-to-multi-process-rendering-in-unreal-engine#switchboard)
# 虚幻引擎运行时中的电影渲染队列 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/movie-render-queue-in-runtime-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:11:04.032Z

---

目录

![运行时构建中的电影渲染队列](https://dev.epicgames.com/community/api/documentation/image/4eacee5c-6112-452e-bc58-39521f4ca17b?resizing_type=fill&width=1920&height=335)

除了使用 **电影渲染队列（Movie Render Queue）** 用户界面进行渲染外，你还可以在运行时分布式构建上使用 **蓝图（Blueprints）** 执行渲染。这可以实现在最终用户设备上创建渲染。

本文档概述了如何使用蓝图创建渲染，以及可用于配置各种设置的函数。

#### 先决条件

-   完成[](/documentation/404)页面中"影片渲染队列"一节的先决条件步骤。
-   了解如何在虚幻引擎中使用[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)。

## 电影管线子系统

你可以在蓝图中使用 **Movie Pipeline Runtime Subsystem** 节点访问电影渲染队列。该子系统具有一个 **队列（Queue）** ，其中包含一系列渲染 **作业** 。每个作业可以包含一个或多个 **镜头** ，并且每个作业还有各自的 **配置** ，其中包含用于渲染其镜头的[渲染设置](/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine)。要渲染视频，你需要生成一系列作业，将作业分配到队列，然后调用电影渲染队列子系统的 **执行器（Executor）** 来处理队列。

要添加此项，右键点击 **事件图表（Event Graph）** ，然后选择 **引擎子系统（Engine Subsystems）> 获取MoviePipelineQueueEngineSubsystem（Get MoviePipelineQueueEngineSubsystem）** 。

![获取电影管线队列引擎子系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c3985a8-5a82-4bfc-a351-012d73c998e3/basic1.png)

## 创建基本渲染

从 **Movie Pipeline Runtime Subsystem** 节点，使用蓝图成功进行渲染需要执行三个主要函数和步骤。

1.  **分配作业（Allocate Job）** ，该函数用于将 **关卡序列（Level Sequence）** 指定给渲染作业。
2.  **设置配置（Set Configuration）** ，用于指定[渲染配置](/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine)。
3.  **渲染作业（Render Job）** ，使用提供的序列和配置渲染作业。

### 分配作业

首先，从 **Movie Pipeline Runtime Subsystem** 节点拖出引线，然后选择 **电影渲染管线（Movie Render Pipeline）> 渲染（Rendering）> 分配作业（Allocate Job）** 。

![分配作业](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15cd3b29-d9be-454a-beda-decd95258883/basic2.png)

将 **Subsystem** 节点连接到 **目标（Target）** 引脚，然后将你想要渲染的关卡序列分配到 **序列中（In Sequence）** 引脚。

![分配序列以分配作业](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95042dcf-2b5e-4573-8995-9d360930a626/basic3.png)

### 设置配置

接下来，从 **Allocate Job** 节点的 **返回值（Return Value）** 引脚拖出引线，创建一个 **Set Configuration** 节点。

![设置配置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4947fdd2-6602-4beb-8d8b-9ce0a8b1838e/basic4.png)

假设你已将自定义渲染配置另存为[预设](/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine#%E9%A2%84%E8%AE%BE)，请在 **预设中（In Preset）** 引脚中指定它。

![指定渲染配置以设置配置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d76486b5-9e4d-47f0-92c5-48ba727927f7/basic5.png)

### 渲染作业

最后，从 **Movie Pipeline Runtime Subsystem** 节点拖出引线，创建一个 **渲染作业（Render Job）** 函数。它应该在设置配置之后执行，并且 **作业中（In Job）** 应该连接到 **Allocate Job** 。

![完全渲染逻辑](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b2862e7-bb43-4226-8956-d34a58053a4f/basic6.png)

执行这些函数时，会使用在 **Allocate Job** 中指定的序列和在 **Set Configuration** 中指定的渲染设置在本地计算机上执行渲染。

## 其他功能和设置

要进行更高级的渲染控制，你可以使用以下函数和工作流程。

### 自定义渲染配置

如果你要为作业编辑或新建渲染设置，可以在 Allocate Job 之后将 **Get Configuration** 和 **Find or Add Setting by Class** 节点相连。

![使用get configuration和find or add settings by class来自定义设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a1c3596-d522-4425-a830-37beb3ecc47a/additional1.png)

接下来，在 **类中（In Class）** 引脚中设置具体的\[导出格式\]animating-characters-and-objects/Sequencer/movie-render-pipeline/RenderSettings/OutputFormats)、[图像设置](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine)或[渲染通道](/documentation/404)。

![类设置菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3da4ba60-7a08-4f77-90f4-b7fe4c06cfc7/additional2.png)

选择设置后，你现在可以从 **Return Value（返回值）** 引脚拖出引线，以 **获取** 或 **设置** 与该设置类相关的属性变量。

![设置变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a58bc1b8-fab4-448f-94a4-e4d80944a2bd/additional3.png)

如果你要在不设置基础配置的情况下构建自定义渲染配置，则必须添加基础渲染通道和输出格式。通常，这意味着添加 **延迟通道（Deferred Pass）** 和 **PNG** 或 **JPG** 等输出。不同于编辑器，默认情况下不会添加这些设置。

### 取消作业

你还可以使用一些函数取消进行中的渲染作业。对于模拟结束时渲染仍在进行的情况，这可以起到重要的保护作用。如果没有这种保护，可能会导致编辑器进入软锁状态。

要取消所有渲染作业，请将 **Movie Pipeline Runtime Subsystem** 节点连接到 **Get Active Executor** ，再连接到 **Cancel All Jobs** 。

![获取激活执行器并取消](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcd3ca36-6584-418a-84a9-89253a3dbb52/additional4.png)

要将取消操作作为模拟结束时的保护措施加以实现，请创建一个 **End Play Event** ，将其连接到一个 **Is Valid** 检查，再将 **Is Valid** 连接到 **Cancel All Jobs** 。

![取消保护](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1fdeb2f-d401-494d-a01a-7493f5a77aef/additional5.png)

### 渲染完成事件

渲染完成事件可以通过绑定到Movie Pipeline Runtime Subsystem中的自定义事件来创建。方法是从子系统拖出引线，并选择 **在渲染完成时指定（Assign On Render Finished）** （以同时创建 **Bind** 和 **Custom Event** 节点），或选择 **将事件绑定到渲染完成时（Bind Event to On Render Finished）** （以仅创建 **Bind** 节点来连接到已存在的自定义事件）。

![渲染完成事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/351e03b2-4cc9-4c6d-8092-0ea3f697062f/additional6.png)

连接到自定义事件后，右键点击 **结果（Results）** 引脚并选择 **分割结构体引脚（Split Struct Pin）** 。渲染完成（Render Finish）事件将输出以下与该事件触发时发生的渲染相关的信息：

![渲染完成输出属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b9db899-c1cd-4d5c-93fc-fa9b720c5446/additional7.png)

名称

说明

**结果管线（Results Pipeline）**

生成此事件的内部UMoviePipeline对象。这是一个高级选项，仅用于跟踪。

**结果作业（Results Job）**

生成该事件的UMoviePipelineExecutorJob。这与前述 **分配作业（Allocate Job）** 结果相同，可用于跟踪。

**结果成功（Results Success）**

根据渲染成功与否输出 **true** 或 **false** 。

**结果镜头数据（Results Shot Data）**

其中包含渲染通道的列表和在磁盘上生成的文件的路径。可以在你希望加载这些图像以做进一步处理时使用此数据。

### 更改渲染UI

**调试控件（Debug Widget）** 是在渲染影片时同步显示其预览帧的UI控件。你可以使用 **Movie Pipeline Runtime Subsystem** 中的 **设置配置（Set Configuration）** ，将执行器设置为使用其他调试控件。

![渲染预览用户界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8179f98-f966-4952-be16-9f5aa66f1dde/additional8.png)

选择开发中的控件类（In Progress Widget Class）下拉菜单，选择要使用的控件。有以下选项可供选择：

-   **MovieRenderDebugWidget** ，它是基类，显示空白屏幕。
-   **UI\_MovieRenderPipelineScreenOverlay** ，它显示上文看到的默认渲染进度UI。
-   **UI\_MovieRenderPipelineScreenOverlayBlank** ，它显示空白屏幕。

![设置配置控件类](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9b7d629-c8d1-496b-926f-ac113d482855/additional9.png)

你可以创建 **控件蓝图（Widget Blueprint）** ，然后将其 **父类（Parent Class）** 设置为 **MovieRenderDebugWidget** ，从而创建你自己的自定义调试控件。然后，你可以选择这个自定义控件作为执行器的调试控件类。

![电影渲染调试控件类](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5203e789-be3e-471d-bb4f-1335286e2069/additional10.png)

## 限制

某些设置在运行时构建中不可用，因为它们依赖编辑器特有功能。这些设置包括：

-   FinalCut Pro XML输出格式
-   Object ID渲染通道
-   Wav输出（除非你的应用程序在启动时使用了 `-deterministicaudio` 和 `-audiomixer` ）。

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [movie render queue](https://dev.epicgames.com/community/search?query=movie%20render%20queue)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)
-   [render](https://dev.epicgames.com/community/search?query=render)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/movie-render-queue-in-runtime-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [电影管线子系统](/documentation/zh-cn/unreal-engine/movie-render-queue-in-runtime-in-unreal-engine#%E7%94%B5%E5%BD%B1%E7%AE%A1%E7%BA%BF%E5%AD%90%E7%B3%BB%E7%BB%9F)
-   [创建基本渲染](/documentation/zh-cn/unreal-engine/movie-render-queue-in-runtime-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%9F%BA%E6%9C%AC%E6%B8%B2%E6%9F%93)
-   [分配作业](/documentation/zh-cn/unreal-engine/movie-render-queue-in-runtime-in-unreal-engine#%E5%88%86%E9%85%8D%E4%BD%9C%E4%B8%9A)
-   [设置配置](/documentation/zh-cn/unreal-engine/movie-render-queue-in-runtime-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E9%85%8D%E7%BD%AE)
-   [渲染作业](/documentation/zh-cn/unreal-engine/movie-render-queue-in-runtime-in-unreal-engine#%E6%B8%B2%E6%9F%93%E4%BD%9C%E4%B8%9A)
-   [其他功能和设置](/documentation/zh-cn/unreal-engine/movie-render-queue-in-runtime-in-unreal-engine#%E5%85%B6%E4%BB%96%E5%8A%9F%E8%83%BD%E5%92%8C%E8%AE%BE%E7%BD%AE)
-   [自定义渲染配置](/documentation/zh-cn/unreal-engine/movie-render-queue-in-runtime-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B2%E6%9F%93%E9%85%8D%E7%BD%AE)
-   [取消作业](/documentation/zh-cn/unreal-engine/movie-render-queue-in-runtime-in-unreal-engine#%E5%8F%96%E6%B6%88%E4%BD%9C%E4%B8%9A)
-   [渲染完成事件](/documentation/zh-cn/unreal-engine/movie-render-queue-in-runtime-in-unreal-engine#%E6%B8%B2%E6%9F%93%E5%AE%8C%E6%88%90%E4%BA%8B%E4%BB%B6)
-   [更改渲染UI](/documentation/zh-cn/unreal-engine/movie-render-queue-in-runtime-in-unreal-engine#%E6%9B%B4%E6%94%B9%E6%B8%B2%E6%9F%93ui)
-   [限制](/documentation/zh-cn/unreal-engine/movie-render-queue-in-runtime-in-unreal-engine#%E9%99%90%E5%88%B6)
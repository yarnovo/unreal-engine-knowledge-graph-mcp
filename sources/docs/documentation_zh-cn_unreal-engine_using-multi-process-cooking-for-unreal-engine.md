# 在虚幻引擎中应用多进程烘焙 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-multi-process-cooking-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:41:37.718Z

---

目录

![多进程烘焙](https://dev.epicgames.com/community/api/documentation/image/5e57e17c-b34d-4dd0-b9ec-3a2f29564ec4?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**多进程烘焙** 利用可用的CPU核心和内存资源，缩短用于生成烘焙版本的时间。为此，多进程烘焙将烘焙分为以下部分：

-   多个 **worker** 子进程烘焙资产组。
-   一个 **director** 进程将资产集进行拆分，并分配给各个worker，然后整理worker的结果，并在必要时合并它们的输出。

本页面提供以下内容：

-   关于多进程烘焙当前局限性的信息。
-   关于如何设置多进程烘焙的指引。
-   关于如何最大限度地为您的项目带来利益的指南。

## 优点和局限性

多进程烘焙本质上是用内存换取并行性。多进程烘焙需要使用比单进程烘焙更多的RAM才能发挥作用。

对于有大量资产的项目，多进程烘焙可大幅缩短完成烘焙版本所需的时间。Epic Games进行了内部测试，即使用4个子进程烘焙大型项目，相比使用单进程烘焙处理相同项目，构建时间约缩短40%。

对于小型项目，如[Lyra](/documentation/zh-cn/unreal-engine/lyra-sample-game-in-unreal-engine)，多进程烘焙不大可能缩短构建时间，因为多个worker的处理或内存开销超过仅烘焙少量资产的收益。

### 系统资源瓶颈

多进程烘焙目前仅在运行director进程的同一台计算机上运行worker进程。共享机器资源对可以有效使用的进程数量施加了上限。

未来版本会进行多进程烘焙更新，以允许远程worker

两大瓶颈是：

-   你的计算机的RAM量。
-   可用于处理的核心数量。

当RAM耗尽时，director和worker进程会更频繁地启动垃圾回收。垃圾回收开销导致的烘焙速度减慢大于额外worker提升的速度。

当可用的核心数耗尽时，每个worker都以单线程运行。 Worker线程上正常发生的长时间运行异步任务会阻塞主线程，造成的烘焙速度减慢大于额外worker提升的速度。

### 调试

多进程复杂性的提升也会使得特定于系统的烘焙器错误调试变得更困难。来自每个worker的日志和构件会复制回director。这在Epic Games内部非常适用，特别是可以通过日志语句和构件进行诊断的错误。然而，对于需要连接调试器的问题，多进程会提升复杂性。

多进程烘焙为某些高级插件创作者带来了额外的负担。对于在烘焙进程中需要从多个包聚合数据的插件，现在需要使用 `IMPCollector` API在worker上编写tick函数，以将收集到的数据复制到director。

## 启用多进程烘焙

要想启用多进程烘焙，你可以使用你的项目配置文件或烘焙器启动参数将 **CookProcessCount** 变量设置为大于1的数字。

为获得最佳结果，请测试不同的CookProcessCount值。CookProcessCount的最优值视你的项目和计算机的可用资源而定。

### 在你的配置文件中启用多进程烘焙

要启用多进程烘焙，为项目 `*Editor.ini` 的 `[CookSettings]:CookProcessCount` 添加条目，并将其设置为大于1的整型。例如：

```cpp

	[CookSettings]

	CookProcessCount=4

```

### 通过启动参数启用多进程烘焙

要通过烘焙器启动参数启用多进程烘焙，使用 `-cookprocesscount=N` 设置CookProcessCount，其中 `N` 为你要使用的进程数。例如：

```cpp

	-cookprocesscount=4.

```

如果你使用UnrealAutomationTool（UAT）打包构建，可使用 `AdditionalCookerOptions` 将此参数通过AutomationTool传递到烘焙器进程：

```cpp

	-AdditionalCookerOptions="<YourOtherOptions> -cookprocesscount=4"

```

如果你使用 **项目启动程序（Project Launcher）** 从虚幻编辑器（Unreal Editor）启动自动化工具，项目启动程序设置中有一个 **AdditionalCookerOptions** 字段，可指定AdditionalCookerOptions参数。

## 配置和调整

多进程烘焙的主调整参数是所使用的进程数（CookProcessCount），在烘焙进程开始因开销变慢之前，项目应尽可能地提升此值。当开销开始上升时，你可以更改其他参数，这些参数可能影响瓶颈，并允许更多的worker。

### 烘焙器内存设置

烘焙器仅有一套可以控制内存使用的选项，选项可以指定烘焙器进行垃圾回收的点。参阅 `Engine\Config\BaseEngine.ini` 的 `[CookSettings]` 小节中的说明，并在你的计算机耗尽内存时尝试调整设置：

DefaultEditor.ini

```cpp

	[CookSettings]
	MemoryMinFreePhysical=
	MemoryMaxUsedPhysical=
	SoftGCStartNumerator=
	SoftGCDenominator=

```

## 故障排除

以下是多进程烘焙期间可能出现的一些潜在错误，附带建议操作：

-   **包%s仅可由当前已断开的CookWorker烘焙。无法烘焙该包。**
    
    当CookWorker崩溃时出现此错误。CookWorker崩溃应予以调试，同时应忽略此后续错误；该崩溃应记录为较早错误。
    
-   **收到来自%s的撤回结果消息；没有可用于撤回的包。**
    
    当一个CookWorker在其他CookWorker之前完成时，烘焙器会尝试将繁忙worker上的工作转移到该CookWorker。对于世界分区关卡，尚未实现此功能。烘焙器会继续尝试，但撤销反复失败，导致性能问题以及日志垃圾邮件。对于当前UE版本，此问题没有修复方案。计划的修复方案是修复世界分区用例，允许关卡的生成包拆分到多个CookWorker。
    
-   **%s在%.1f秒内未响应RetractionRequest消息。继续等待……**
    
    当报告的持续时长超过1000秒时，这通常表示CookWorker出现死锁。将CookWorker连接到调试器，查看是什么情况。
    

-   [build](https://dev.epicgames.com/community/search?query=build)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [cooking](https://dev.epicgames.com/community/search?query=cooking)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)
-   [cook](https://dev.epicgames.com/community/search?query=cook)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [优点和局限性](/documentation/zh-cn/unreal-engine/using-multi-process-cooking-for-unreal-engine#%E4%BC%98%E7%82%B9%E5%92%8C%E5%B1%80%E9%99%90%E6%80%A7)
-   [系统资源瓶颈](/documentation/zh-cn/unreal-engine/using-multi-process-cooking-for-unreal-engine#%E7%B3%BB%E7%BB%9F%E8%B5%84%E6%BA%90%E7%93%B6%E9%A2%88)
-   [调试](/documentation/zh-cn/unreal-engine/using-multi-process-cooking-for-unreal-engine#%E8%B0%83%E8%AF%95)
-   [启用多进程烘焙](/documentation/zh-cn/unreal-engine/using-multi-process-cooking-for-unreal-engine#%E5%90%AF%E7%94%A8%E5%A4%9A%E8%BF%9B%E7%A8%8B%E7%83%98%E7%84%99)
-   [在你的配置文件中启用多进程烘焙](/documentation/zh-cn/unreal-engine/using-multi-process-cooking-for-unreal-engine#%E5%9C%A8%E4%BD%A0%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E4%B8%AD%E5%90%AF%E7%94%A8%E5%A4%9A%E8%BF%9B%E7%A8%8B%E7%83%98%E7%84%99)
-   [通过启动参数启用多进程烘焙](/documentation/zh-cn/unreal-engine/using-multi-process-cooking-for-unreal-engine#%E9%80%9A%E8%BF%87%E5%90%AF%E5%8A%A8%E5%8F%82%E6%95%B0%E5%90%AF%E7%94%A8%E5%A4%9A%E8%BF%9B%E7%A8%8B%E7%83%98%E7%84%99)
-   [配置和调整](/documentation/zh-cn/unreal-engine/using-multi-process-cooking-for-unreal-engine#%E9%85%8D%E7%BD%AE%E5%92%8C%E8%B0%83%E6%95%B4)
-   [烘焙器内存设置](/documentation/zh-cn/unreal-engine/using-multi-process-cooking-for-unreal-engine#%E7%83%98%E7%84%99%E5%99%A8%E5%86%85%E5%AD%98%E8%AE%BE%E7%BD%AE)
-   [故障排除](/documentation/zh-cn/unreal-engine/using-multi-process-cooking-for-unreal-engine#%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4)
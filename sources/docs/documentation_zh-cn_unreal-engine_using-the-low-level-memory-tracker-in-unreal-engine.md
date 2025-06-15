# 在虚幻引擎中使用LLM跟踪器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-low-level-memory-tracker-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:39:12.047Z

---

目录

![低级内存跟踪器](https://dev.epicgames.com/community/api/documentation/image/2c01d316-c0f8-4ced-9fb8-1ea11d2345d7?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34c6b7ea-639b-4def-b3f7-60f5ecef3616/llm_00.png)

**低级内存跟踪器（Low-Level Memory Tracker）**（简称 **LLM**）是一种跟踪 **虚幻引擎（UE）** 项目中内存使用情况的工具。LLM使用范围标记系统来记录虚幻引擎和操作系统分配的所有内存。LLM支持虚幻引擎使用的所有平台。

## LLM跟踪器

LLM目前有两个跟踪器。每个跟踪器都有自己的分配映射和标记堆栈。默认跟踪器适用于引擎的所有分配。在这两个跟踪器中，它的级别较高并记录通过 `FMemory` 类函数 `Malloc` 进行的分配。该跟踪器可为 `stat LLM` 和 `stat LLMFULL` 控制台命令提供统计信息。平台跟踪器是较低级别的版本，它记录从OS进行的所有分配。例如，它会跟踪 `Binned2` 等函数进行的内部分配。因此，默认跟踪器统计信息是平台跟踪器统计信息的子集。

## LLM设置

要在项目中启用LLM，请使用以下命令行参数和控制台命令。

命令行参数

说明

`-LLM`

启用LLM

`-LLMCSV`

连续将所有值写入CSV文件。自动启用-LLM。

`-llmtagsets=Assets`

实验性功能。显示每个资产分配的内存总计。

`-llmtagsets=AssetClasses`

实验性功能。显示每个UObject类类型的总计。

控制台命令

说明

`stat LLM`

显示LLM摘要。所有较低级别的引擎统计信息都归入单个引擎统计信息。

`stat LLMFULL`

显示所有LLM统计信息。

`stat LLMPlatform`

显示从OS分配的所有内存的统计信息。

`stat LLMOverhead`

显示LLM内部使用的内存。

使用 `-LLMCSV` 命令行参数时，`.CSV` 文件将写入 `saved/profiling/llm/`。该文件将包含每个标记的列，以MB为单位显示当前值。每隔5秒写一个新行（默认情况下）。此频率可以使用 `LLM.LLMWriteInterval` 控制台变量更改。

## LLM标记

引擎（包括游戏代码）的每次内存分配都会被指定一个标记值，用于标识其所属的类别。也就是说，所有内存仅被跟踪一次，没有任何内存错过或被计算两次。所有类别的总计会累计到游戏所用的总内存。

这些标记使用标记范围宏进行应用。在该范围内应用的任何分配都会被分配指定标记。LLM维护有一个标记范围堆栈，并将顶部标记应用于分配。LLM统计信息可以在游戏中使用 `stat LLM` 或 `stat LLMFULL` 控制台命令进行查看。每个标记的当前总计将以MB为单位显示。LLM还会将统计信息值写入 `.CSV` 文件，以便分析这些值。引擎中当前存在以下标记类别：

标记名称

说明

**UObject**

该标记包括从 `UObject` 继承的任何类以及由该类序列化的任何内容，包括属性。**UObject** 囊括了所有未在任何其他类别中跟踪的引擎和游戏内存。请注意，此统计信息不包括单独跟踪的网格体或动画数据。它对应于放置在关卡中的对象数。

**EngineMisc**

任何其他类别中未跟踪的所有低级内存。

**TaskGraphTasksMisc**

从任务图中启动的任何没有自己类别的任务。该任务通常级别应较低。

**StaticMesh**

该标记是 `UStaticMesh` 类和相关属性，并不包括实际的网格体数据。

要添加新的标记，需要执行以下步骤：

1.  将值添加到 `LowLevelMemTracker.h` 中的 `ELLMTag` 列举类型。
2.  将相应的元素添加到 `LowLevelMemTracker.cpp` 中的 `ELLMTagNames` 数组中。
3.  使用 `LLM_SCOPE` 宏将标记范围添加到代码中。

如果范围是特定于平台的，则以相同的方式添加到特定于平台的LLM文件中的列举类型，例如，`[Console]LLM.cpp` 和 `[Console]LLM.h`。

## 标记集(实验性)

要使用标记集，请在 `LowLevelMemory.h` 中定义 `LLM_ALLOW_ASSETS_TAGS`。使用标记集时，每个分配还将存储资产名称或Object类名称。

使用标记集将增加内存占用和运行时性能耗用。

## 技术实现细节

LLM的作用原理是维护由指针索引的所有分配的映射。该映射当前包含每个分配的大小及其指定的标记。游戏一次可有多达400万个实时分配，因此内存开销必须尽可能少。当前实现中每个分配使用21个字节：

分配

大小

指针

8个字节

指针散列键

4个字节

大小

4个字节

标记

1个字节

散列图索引

4个字节

使用 `OnLowLevelAlloc` 函数跟踪分配时，标记堆栈顶部的标记将成为当前标记，并存储在分配映射中，以该指针作为其关键帧。为了避免争用，在单独的 `FLLMThreadState` 类实例中跟踪每个标记的帧增量。在帧结束时，这些增量将相加并发布到统计信息系统和 `.CSV` 文件。

LLM早已被初始化，也就是说它必须默认启用。如果未在命令行上启用LLM，它将自行关闭并清理所有内存，以确保没有占用内存。LLM完全在"测试"和"发行"构建中编译。

LLM可在没有统计信息系统的情况下运行（例如在"测试"配置中）。如果这样，屏幕上将无法显示统计信息，但统计信息仍将写入 `.CSV` 文件。LLM将需要通过修改 `LowLevelMemTracker.h` 中的 `ENABLE_LOW_LEVEL_MEM_TRACKER` 来启用。

标记使用范围宏进行应用。以下是两个主要的宏：

-   `LLM_SCOPE(Tag)`
-   `LLM_PLATFORM_SCOPE(Tag)`

这两个宏分别设置了默认跟踪器和平台跟踪器的当前范围。这些范围有平台相关版本，例如 `LLM_SCOPE_[Console](Tag)`，它使用特定于平台的标记列举类型。使用统计信息的范围宏（例如 `LLM_SCOPED_TAG_WITH_STAT`）目前被视为已弃用，不应被使用。

LLM内部使用的所有内存均由平台提供的 `LLMAlloc` 和 `LLMFree` 函数管理。LLM不以任何其他方式进行分配，因此它不会跟踪自己的内存使用情况（并导致无穷递归），这一点非常重要。

## 其他技术细节

以下部分介绍了使用LLM时应注意的各种注释和其他信息。

-   因为LLM占用的内存可能高达100MB甚至更多，所以强烈建议在控制台上以大内存模式运行。
-   测试配置中的LLM不会显示屏幕统计信息页面，但会写出 `.CSV` 文件。在发售时LLM完全禁用。
-   资产标记跟踪仍处于早期实验状态。

-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [mobile](https://dev.epicgames.com/community/search?query=mobile)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [LLM跟踪器](/documentation/zh-cn/unreal-engine/using-the-low-level-memory-tracker-in-unreal-engine#llm%E8%B7%9F%E8%B8%AA%E5%99%A8)
-   [LLM设置](/documentation/zh-cn/unreal-engine/using-the-low-level-memory-tracker-in-unreal-engine#llm%E8%AE%BE%E7%BD%AE)
-   [LLM标记](/documentation/zh-cn/unreal-engine/using-the-low-level-memory-tracker-in-unreal-engine#llm%E6%A0%87%E8%AE%B0)
-   [标记集(实验性)](/documentation/zh-cn/unreal-engine/using-the-low-level-memory-tracker-in-unreal-engine#%E6%A0%87%E8%AE%B0%E9%9B%86\(%E5%AE%9E%E9%AA%8C%E6%80%A7\))
-   [技术实现细节](/documentation/zh-cn/unreal-engine/using-the-low-level-memory-tracker-in-unreal-engine#%E6%8A%80%E6%9C%AF%E5%AE%9E%E7%8E%B0%E7%BB%86%E8%8A%82)
-   [其他技术细节](/documentation/zh-cn/unreal-engine/using-the-low-level-memory-tracker-in-unreal-engine#%E5%85%B6%E4%BB%96%E6%8A%80%E6%9C%AF%E7%BB%86%E8%8A%82)
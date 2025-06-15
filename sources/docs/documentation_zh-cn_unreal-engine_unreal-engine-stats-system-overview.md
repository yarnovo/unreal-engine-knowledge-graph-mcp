# 虚幻引擎统计数据系统概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview
> 
> 生成时间: 2025-06-14T20:40:06.478Z

---

目录

![统计数据系统概述](https://dev.epicgames.com/community/api/documentation/image/8721055c-cd8c-4a2e-86eb-a32ea703f24c?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [Stat命令](/documentation/zh-cn/unreal-engine/stat-commands-in-unreal-engine)

**统计数据系统** 可以收集和显示性能数据，从而用来优化游戏。

要获取关于统计命令的帮助，请在控制台中输入 `stat`，或参阅 `PrintStatsHelpToOutputDevice();` 方法。

## 类型

统计数据系统支持下列类型：

统计数据类型

说明

**循环计数器**

一种泛型循环计数器，用于统计数据对象生命周期中的循环次数。

**浮点/Dword计数器**

一种每帧都会清空的计数器。

**浮点/Dword累加器**

一种不会每帧清空的计数器，作为可重置的持久统计数据。

**内存**

一种特殊类型的计数器，针对内存跟踪进行优化。

## 分组统计数据

每个统计数据必须归入组中，通常对应显示指定的统计数据组。例如，**stat statsystem** 将显示统计数据相关数据。

要定义统计数据组，请使用下列方法之一：

方法

说明

`DECLARE_STATS_GROUP(GroupDesc, GroupId, GroupCat)`

声明默认启用的统计数据组。

`DECLARE_STATS_GROUP_VERBOSE(GroupDesc, GroupId, GroupCat)`

声明默认禁用的统计数据组。

`DECLARE_STATS_GROUP_MAYBE_COMPILED_OUT(GroupDesc, GroupId, GroupCat)`

声明默认禁用的统计数据组，编译器可将该组剥离。

其中：

-   `GroupDesc` 是该组的文本描述。
-   `GroupId` 是该组的 `独有` 标识
-   `GroupCat` 保留供将来使用
-   `CompileIn` 如设为true，编译器则可能将其剥离出来

根据作用域，可在源文件或标头文件中完成分组。

### 示例用法

```cpp
	DECLARE_STATS_GROUP(TEXT("Threading"), STATGROUP_Threading, STATCAT_Advanced);
	DECLARE_STATS_GROUP_VERBOSE(TEXT("Linker Load"), STATGROUP_LinkerLoad, STATCAT_Advanced);

```

## 声明和定义统计数据

现在可声明和定义统计数据，但在此之前请注意，统计数据可用在：

-   仅一个cpp文件
-   函数作用域
-   模块作用域
-   整个项目

### 用于单个文件

如作用域是单个文件，必须根据统计数据类型使用下列一种方法：

方法

说明

`DECLARE_CYCLE_STAT(CounterName, StatId, GroupId)`

声明循环计数器统计数据。

`DECLARE_SCOPE_CYCLE_COUNTER(CounterName, StatId, GroupId)`

声明循环计数器统计数据，同时使用它。此外，它仅限于一个函数作用域。

`QUICK_SCOPE_CYCLE_COUNTER(StatId)`

声明循环计数器统计数据，它将属于名为"Quick"的统计数据组。

`RETURN_QUICK_DECLARE_CYCLE_STAT(StatId, GroupId)`

返回循环计数器，有时由几个专门的类使用。

`DECLARE_FLOAT_COUNTER_STAT(CounterName, StatId, GroupId)`

声明浮点计数器，基于双倍类型（8字节）。

`DECLARE_DWORD_COUNTER_STAT(CounterName, StatId, GroupId)`

声明dword计数器，基于qword类型（8字节）。

`DECLARE_FLOAT_ACCUMULATOR_STAT(CounterName, StatId, GroupId)`

声明浮点累加器。

`DECLARE_DWORD_ACCUMULATOR_STAT(CounterName, StatId, GroupId)`

声明dword累加器。

`DECLARE_MEMORY_STAT(CounterName, StatId, GroupId)`

声明与dword累加器相同的内存计数器，但将使用内存特定单位显示。

`DECLARE_MEMORY_STAT_POOL(CounterName, StatId, GroupId, Pool)`

声明带有池的内存计数器。

### 用于多个文件

如想拥有可供整个项目（或范围较广的文件）访问的统计数据，需使用其外部版本。 这些方法与先前提到的方法相同，但名称末尾带有 `_EXTERN`：

`DECLARE_CYCLE_STAT_EXTERN(CounterName, StatId, GroupId, API)` `DECLARE_FLOAT_COUNTER_STAT_EXTERN(CounterName, StatId, GroupId, API)` `DECLARE_DWORD_COUNTER_STAT_EXTERN(CounterName, StatId, GroupId, API)` `DECLARE_FLOAT_ACCUMULATOR_STAT_EXTERN(CounterName, StatId, GroupId, API)` `DECLARE_DWORD_ACCUMULATOR_STAT_EXTERN(CounterName, StatId, GroupId, API)` `DECLARE_MEMORY_STAT_EXTERN(CounterName, StatId, GroupId, API)` `DECLARE_MEMORY_STAT_POOL_EXTERN(CounterName, StatId, GroupId, Pool, API)`

然后在源文件中，需使用下列项定义这些统计数据，这些项定义的以 `_EXTERN` 声明的统计数据：

其中：

-   `CounterName` 是统计数据的文本描述
-   `StatId` 是统计数据的 `独有` 标识
-   `GroupId` 是统计数据所属的组的标识， GroupId `来自` DECLARE\_STATS\_GROUP\*\`
-   `Pool` 是平台专属的内存池
-   `API` 是模块的 `*_API`，如该统计数据仅使用在该模块中，其可为空

## 示例

## 带有池的自定义内存统计数据

首先需添加新池到 `enum EMemoryCounterRegion`，它可以是全局的，也可以是平台专属的：

```cpp
	enum EMemoryCounterRegion
	{
		MCR_Invalid,		// 非内存
		MCR_Physical,		// 主系统内存
		MCR_GPU,			// GPU内存（显卡）
		MCR_GPUSystem,		// GPU直接访问的系统内存
		MCR_TexturePool,	// 预设置大小的纹理池
		MCR_MAX
	};

```

下面是允许在任何地方使用池的示例（见 `CORE_API`）。

池名称必须以 `MCR_` 开头。

### 标头文件范例

```cpp
	DECLARE_MEMORY_STAT_POOL_EXTERN(TEXT("Physical Memory Pool [Physical]"), MCR_Physical, STATGROUP_Memory, FPlatformMemory::MCR_Physical, CORE_API);
	DECLARE_MEMORY_STAT_POOL_EXTERN(TEXT("GPU Memory Pool [GPU]"), MCR_GPU,STATGROUP_Memory, FPlatformMemory::MCR_GPU, CORE_API);
	DECLARE_MEMORY_STAT_POOL_EXTERN(TEXT("Texture Memory Pool [Texture]"), MCR_TexturePool, STATGROUP_Memory, FPlatformMemory::MCR_TexturePool,CORE_API);

```

### 源文件范例

```cpp
	DEFINE_STAT(MCR_Physical);
	DEFINE_STAT(MCR_GPU);
	DEFINE_STAT(MCR_TexturePool);

	// 这是一个池，因此需要初始化——通常在F*PlatformMemory::Init()之中。
	SET_MEMORY_STAT(MCR_Physical, PhysicalPoolLimit);
	SET_MEMORY_STAT(MCR_GPU, GPUPoolLimit);
	SET_MEMORY_STAT(MCR_TexturePool, TexturePoolLimit);

	// 拥有池之后，即可为其设置内存统计数据。

	// 以下内容可在任意处访问。
	DECLARE_MEMORY_STAT_POOL_EXTERN(TEXT("Index buffer memory"), STAT_IndexBufferMemory, STATGROUP_RHI, FPlatformMemory::MCR_GPU, RHI_API);
	DECLARE_MEMORY_STAT_POOL_EXTERN(TEXT("Vertex buffer memory"), STAT_VertexBufferMemory, STATGROUP_RHI, FPlatformMemory::MCR_GPU, RHI_API);
	DECLARE_MEMORY_STAT_POOL_EXTERN(TEXT("Structured buffer memory"), STAT_StructuredBufferMemory,STATGROUP_RHI, FPlatformMemory::MCR_GPU, RHI_API);
	DECLARE_MEMORY_STAT_POOL_EXTERN(TEXT("Pixel buffer memory"), STAT_PixelBufferMemory, STATGROUP_RHI, FPlatformMemory::MCR_GPU, RHI_API);

	// 以下内容只能在其被定义的模块中访问。
	DECLARE_MEMORY_STAT_POOL_EXTERN(TEXT("Pool Memory Size"), STAT_TexturePoolSize, STATGROUP_Streaming, FPlatformMemory::MCR_TexturePool, );
	DECLARE_MEMORY_STAT_POOL_EXTERN(TEXT("Pool Memory Used"), STAT_TexturePoolAllocatedSize, STATGROUP_Streaming, FPlatformMemory::MCR_TexturePool, );

	// 最后，我们需要更新内存统计数据。

	// 以特定的值增加内存统计数据。
	INC_MEMORY_STAT_BY(STAT_PixelBufferMemory,NumBytes);
	// 以特定的值减少内存统计数据。
	DEC_MEMORY_STAT_BY(STAT_PixelBufferMemory,NumBytes);
	// 以特定的值设置内存统计数据。
	SET_MEMORY_STAT(STAT_PixelBufferMemory,NumBytes);

```

## 不带池的常规内存统计数据

```cpp
	DECLARE_MEMORY_STAT(TEXT("Total Physical"), STAT_TotalPhysical, STATGROUP_MemoryPlatform);
	DECLARE_MEMORY_STAT(TEXT("Total Virtual"), STAT_TotalVirtual, STATGROUP_MemoryPlatform);
	DECLARE_MEMORY_STAT(TEXT("Page Size"), STAT_PageSize, STATGROUP_MemoryPlatform);
	DECLARE_MEMORY_STAT(TEXT("Total Physical GB"), STAT_TotalPhysicalGB, STATGROUP_MemoryPlatform);

```

或者，如果愿意，可在标头文件中 `DECLARE_MEMORY_STAT_EXTERN`，然后在源文件中 `DEFINE_STAT`。

更新内存统计数据的方式与带有池的版本相同。

## 使用循环计数器的性能数据

首先需添加循环计数器：

```cpp
	DECLARE_CYCLE_STAT(TEXT("Broadcast"), STAT_StatsBroadcast, STATGROUP_StatSystem);
	DECLARE_CYCLE_STAT(TEXT("Condense"), STAT_StatsCondense, STATGROUP_StatSystem);

```

或在标头文件中 `DECLARE_CYCLE_STAT_EXTERN`，然后在源文件中 `DEFINE_STAT`。

现在可抓取性能数据：

```cpp
	Stats::Broadcast()
	{
		SCOPE_CYCLE_COUNTER(STAT_StatsBroadcast);
		// ...
		// 一串代码
		// ...
	}

```

有时候不想每次调用函数时都抓取统计数据，可以使用条件循环计数器——这不是很常见，但可能很有用：

```cpp
	Stats::Broadcast(bool bSomeCondition)
	{

		CONDITIONAL_SCOPE_CYCLE_COUNTER(STAT_StatsBroadcast,bSomeCondition);
		// ...
		// 一串代码
		// ...
	}

```

如要从一个函数抓取性能数据，可使用下列构造：

```cpp
	Stats::Broadcast(bool bSomeCondition)
	{
		DECLARE_SCOPE_CYCLE_COUNTER(TEXT("Broadcast"), STAT_StatsBroadcast, STATGROUP_StatSystem);
		// ...
		// 一串代码
		// ...
	}

```

也可进行下列操作：

```cpp
	Stats::Broadcast(bool bSomeCondition)
	{
		QUICK_SCOPE_CYCLE_COUNTER(TEXT("Stats::Broadcast"));
		// ...
		// 一串代码
		// ...
	}

```

这主要用于临时统计数据。

以上提到的所有循环计数器均用于生成层级，因此可获取关于性能数据的详细信息。但也可选择设置平循环计数器：

```cpp
	Stats::Broadcast(bool bSomeCondition)
	{
		const uint32 BroadcastBeginTime = FPlatformTime::Cycles();
		// ...
		// 一串代码
		// ...
		const uint32 BroadcastEndTime = FPlatformTime::Cycles();
		SET_CYCLE_COUNTER(STAT_StatsBroadcast, BroadcastEndTime-BroadcastBeginTime);
	}

```

## 使用GetStatId的性能数据

有几种在虚幻引擎中实现的任务使用不同的方法来获取性能数据。它们实现方法 `GetStatId()`，如没有 `GetStatId()`，代码将无法编译。

请参见以下示例：

```cpp
	class FParallelAnimationCompletionTask
	{
		// ...
		// 一串代码
		// ...
		FORCEINLINE TStatId GetStatId() const
		{
			RETURN_QUICK_DECLARE_CYCLE_STAT(FParallelAnimationCompletionTask, STATGROUP_TaskGraphTasks);
		}
		// ...
		// 一串代码
		// ...
	};

```

## 记录性能数据

如只想记录性能数据，我们提供有下列功能：

### 方法

下列方法会捕获时间（以秒为单位传递），并将增量时间添加到传入的变量：

`SCOPE_SECONDS_COUNTER(double& Seconds)`

#### 代码范例

```cpp
	Stats::Broadcast()
	{
		double ThisTime = 0;
		{
	       SCOPE_SECONDS_COUNTER(ThisTime);
	  		// ...
			// 一串代码
			// ...
		}
		UE_LOG(LogTemp, Log, TEXT("Stats::Broadcast %.2f"), ThisTime);
	}

```

### 工具类和方法

类

说明

`FScopeLogTime`

记录时间（以秒为单位传递）的工具类，将累加统计数据添加到传入的变量，并在析构函数中将性能数据打印到日志。

方法

说明

`SCOPE_LOG_TIME(Name, CumulativePtr)`

使用提供的名称打印性能数据并收集累加统计数据。

`SCOPE_LOG_TIME_IN_SECONDS(Name, CumulativePtr)`

与SCOPE\_LOG\_TIME功能相同，但以秒为单位打印。

`SCOPE_LOG_TIME_FUNC()`

它使用函数名称打印性能数据，而且不能嵌套。

`SCOPE_LOG_TIME_FUNC_WITH_GLOBAL(CumulativePtr)`

与SCOPE\_LOG\_TIME\_FUNC功能相同，但它收集累加统计数据。

#### 代码范例

```cpp
	double GMyBroadcastTime = 0.0;
	Stats::Broadcast()
	{
		SCOPE_LOG_TIME("Stats::Broadcast", &GMyBroadcastTime);
		SCOPE_LOG_TIME_IN_SECONDS("Stats::Broadcast (sec)", &GMyBroadcastTime);
		// ...
		// 一串代码
		// ...
	}

	Stats::Condense()
	{
		SCOPE_LOG_TIME_FUNC(); // 命名应为"Stats::Condense()"，在不同编辑器中可能有所不同
		SCOPE_LOG_TIME_FUNC_WITH_GLOBAL(&GMyBroadcastTime);
		// ...
		// 一串代码
		// ...
	}

```

## 使用浮点或DWORD计数器的泛型数据

需要做的首件事通常是添加计数器，如下所示：

```cpp
	DECLARE_FLOAT_COUNTER_STAT_EXTERN(STAT_FloatCounter,StatId,STATGROUP_TestGroup, CORE_API);
	DECLARE_DWORD_COUNTER_STAT_EXTERN(STAT_DwordCounter,StatId,STATGROUP_TestGroup, CORE_API);
	DECLARE_FLOAT_ACCUMULATOR_STAT_EXTERN(STAT_FloatAccumulator,StatId,STATGROUP_TestGroup, CORE_API);
	DECLARE_DWORD_ACCUMULATOR_STAT_EXTERN(STAT_DwordAccumulator,StatId,STATGROUP_TestGroup, CORE_API);

```

之后，更新和管理计数器可使用下列方法：

### 用于更新计数器的方法

方法

说明

`INC_DWORD_STAT(StatId)`

使dword统计数据加1。

`DEC_DWORD_STAT(StatId)`

使dword统计数据减1。

`INC_DWORD_STAT_BY(StatId, Amount)`

使dword统计数据增加指定值。

`DEC_DWORD_STAT_BY(StatId, Amount)`

使dword统计数据减少指定值。

`SET_DWORD_STAT(StatId, Value)`

将dword统计数据设为指定值。

`INC_FLOAT_STAT_BY(StatId, Amount)`

使浮点统计数据增加指定值。

`DEC_FLOAT_STAT_BY(StatId, Amount)`

使浮点统计数据减少指定值。

`SET_FLOAT_STAT(StatId, Value)`

将浮点统计数据设为指定值。

### 用于管理计数器的助手方法

方法

说明

`GET_STATID(StatId)`

返回统计数据的 `TStatId` 的实例。

此为高级方法。

`GET_STATDESCRIPTION(StatId)`

返回统计数据的描述。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [stats system](https://dev.epicgames.com/community/search?query=stats%20system)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [类型](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E7%B1%BB%E5%9E%8B)
-   [分组统计数据](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E5%88%86%E7%BB%84%E7%BB%9F%E8%AE%A1%E6%95%B0%E6%8D%AE)
-   [示例用法](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E7%A4%BA%E4%BE%8B%E7%94%A8%E6%B3%95)
-   [声明和定义统计数据](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E5%A3%B0%E6%98%8E%E5%92%8C%E5%AE%9A%E4%B9%89%E7%BB%9F%E8%AE%A1%E6%95%B0%E6%8D%AE)
-   [用于单个文件](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E7%94%A8%E4%BA%8E%E5%8D%95%E4%B8%AA%E6%96%87%E4%BB%B6)
-   [用于多个文件](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E7%94%A8%E4%BA%8E%E5%A4%9A%E4%B8%AA%E6%96%87%E4%BB%B6)
-   [示例](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E7%A4%BA%E4%BE%8B)
-   [带有池的自定义内存统计数据](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E5%B8%A6%E6%9C%89%E6%B1%A0%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E5%86%85%E5%AD%98%E7%BB%9F%E8%AE%A1%E6%95%B0%E6%8D%AE)
-   [标头文件范例](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E6%A0%87%E5%A4%B4%E6%96%87%E4%BB%B6%E8%8C%83%E4%BE%8B)
-   [源文件范例](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E6%BA%90%E6%96%87%E4%BB%B6%E8%8C%83%E4%BE%8B)
-   [不带池的常规内存统计数据](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E4%B8%8D%E5%B8%A6%E6%B1%A0%E7%9A%84%E5%B8%B8%E8%A7%84%E5%86%85%E5%AD%98%E7%BB%9F%E8%AE%A1%E6%95%B0%E6%8D%AE)
-   [使用循环计数器的性能数据](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E4%BD%BF%E7%94%A8%E5%BE%AA%E7%8E%AF%E8%AE%A1%E6%95%B0%E5%99%A8%E7%9A%84%E6%80%A7%E8%83%BD%E6%95%B0%E6%8D%AE)
-   [使用GetStatId的性能数据](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E4%BD%BF%E7%94%A8getstatid%E7%9A%84%E6%80%A7%E8%83%BD%E6%95%B0%E6%8D%AE)
-   [记录性能数据](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E8%AE%B0%E5%BD%95%E6%80%A7%E8%83%BD%E6%95%B0%E6%8D%AE)
-   [方法](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E6%96%B9%E6%B3%95)
-   [代码范例](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E4%BB%A3%E7%A0%81%E8%8C%83%E4%BE%8B)
-   [工具类和方法](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E5%B7%A5%E5%85%B7%E7%B1%BB%E5%92%8C%E6%96%B9%E6%B3%95)
-   [代码范例](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E4%BB%A3%E7%A0%81%E8%8C%83%E4%BE%8B-2)
-   [使用浮点或DWORD计数器的泛型数据](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E4%BD%BF%E7%94%A8%E6%B5%AE%E7%82%B9%E6%88%96dword%E8%AE%A1%E6%95%B0%E5%99%A8%E7%9A%84%E6%B3%9B%E5%9E%8B%E6%95%B0%E6%8D%AE)
-   [用于更新计数器的方法](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E7%94%A8%E4%BA%8E%E6%9B%B4%E6%96%B0%E8%AE%A1%E6%95%B0%E5%99%A8%E7%9A%84%E6%96%B9%E6%B3%95)
-   [用于管理计数器的助手方法](/documentation/zh-cn/unreal-engine/unreal-engine-stats-system-overview#%E7%94%A8%E4%BA%8E%E7%AE%A1%E7%90%86%E8%AE%A1%E6%95%B0%E5%99%A8%E7%9A%84%E5%8A%A9%E6%89%8B%E6%96%B9%E6%B3%95)

相关文档

[

Unreal Insights

![Unreal Insights](https://dev.epicgames.com/community/api/documentation/image/f3818740-1216-4fbb-bff6-249ed0ed43ef?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)
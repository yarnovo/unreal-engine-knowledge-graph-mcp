# 虚幻引擎5中的Trace | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5
> 
> 生成时间: 2025-06-14T20:39:37.623Z

---

目录

![Trace](https://dev.epicgames.com/community/api/documentation/image/2f979f12-bfea-4c29-8c8a-37336ffc4418?resizing_type=fill&width=1920&height=335)

**Trace** 是一种结构化的日志记录框架，用于追踪运行进程中的仪表测量事件模块 **Tracelog** 和 **TraceAnalysis** 是构成框架的重要模块。 **虚幻Trace服务器（Unreal Trace Server）** 作为单一服务器实例会在后台运行，可以由项目的多个实例或分支共享。这个经优化的程序对性能产生的影响微乎其微，并且不包含用户界面。

Trace服务器由位于 `Engine/Binaries/Win64` 目录下的单独服务器进程 `UnrealTraceServer.exe` 自动启动。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84347a66-16dd-4238-b5ac-a86b56698b50/diagram.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84347a66-16dd-4238-b5ac-a86b56698b50/diagram.png)

Trace服务器由两部分组成

-   **Trace记录器** 在端口1981监听传入的追踪连接并记录实时的追踪流。
-   **Trace存储** 会将记录的追踪数据作为文件存储在一个文件夹中。它会监测这个文件夹的变化并在Unreal Insights 的用户交互界面显示可用的追踪器列表。

以下是一个追踪文件夹的路径的例子：

```cpp
	C:/Users/<user>/AppData/Local/UnrealEngine/Common/UnrealTrace/Store/001/
```

## 虚幻Trace服务器

当你从虚幻Trace会话浏览器接入时，虚幻编辑器会自动启动 `UnrealTraceServer.exe`。虚幻Trace服务器作为单一服务器实例会在后台运行，可以由项目的多个实例或分支共享。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ebe756d-7714-458a-bac1-fd9ddd182b22/traceexe.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ebe756d-7714-458a-bac1-fd9ddd182b22/traceexe.png)

你可以使用系统的任务管理器来关闭虚幻Trace服务器。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8daf9c63-e5a1-4051-bc62-c761b479359a/taskmanager.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8daf9c63-e5a1-4051-bc62-c761b479359a/taskmanager.png)

系统任务管理器在进程选项卡中显示正在运行中的服务器追踪（Server Trace）。

虚幻Trace服务器在后台作为单独实例运行，无须终止便可启动新版本。它可以同时从多个来源接收与记录数据。

目前，我们针对运行虚幻追踪服务器的每台机器仅支持一个用户。如果多个用户同时登录，则追踪将存储在第一个用户的追踪目录中，因此无法供其他用户访问。

## Trace Insights控件

**Trace Insights控件** 提供了一种使用编辑器界面来控制和管理 **Trace数据** 的方法。你可以从编辑器的底部工具栏访问**Trace Insights控件**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd909859-0395-44c3-9c8a-e440219825aa/insightswidget.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd909859-0395-44c3-9c8a-e440219825aa/insightswidget.png)

### Trace数据

**Trace** 能够记录大量的数据。你可以使用Trace通道来选择记录哪种类型的数据。

##### 通道

**通道** 控制追踪时的数据率。每个事件类型都与一个或多个通道相关联。如果没有启用必要的通道，那么该事件将不会被发射到追踪流中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de9878c8-7a55-44b2-8175-0b1bc2466014/tracechannels.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de9878c8-7a55-44b2-8175-0b1bc2466014/tracechannels.png)

MemAlloc、MemTag和Module通道是灰色的，因为它们必须通过命令提示符运行。请参阅[使用命令提示符](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#fromthecommandprompt)

通道预设将通道组合在一起，提供基于场景的切入点。

通道

说明

**动画（Animation）**

动画Insights插件

**资产载入时间（AssetLoadTime）**

包含用于 `UObject::Serialize` 的CPU计时器名称

**资产元数据（AssetMetadata）**

用于内存分配的元数据形式的资产名称和类名称需要 **Metadata** 通道。用于 **Memalloc** 通道。

**音频（Audio）**

音频Insights插件。

**混音器（AudioMixer）**

混音器Insights插件。

**书签（Boormark）**

低频标记，标志重要的转变。书签提供了对关卡加载或引擎启动阶段等功能的简要概述。

**调用堆栈（Callstack）**

调用堆栈说明。使分配与调用堆栈相关联

**上下文切换（ContextSwitch）**

追踪上下文切换事件。在Windows系统上，应以管理员身份运行游戏/编辑器运行时间。

**烘焙（Cook）**

显示仅用于烘焙的CPU计时器名称。此设置需要启用CPU通道。烘焙将添加 `CookByTheBook` 和 `SaveCookedPackage` 两个Cpu计时事件。

**计数器（Counters）**

通用计数器。追踪浮动和整数值随时间变化的情况。计数器追踪API。此设置将启用CSV分析器追踪。

**Cpu**

Cpu计时器名称可以通过启用Insights控件的启用已命名事件（Stat Named Events）通道或使用 `-statnamedevents` 命令行参数来添加额外的计时器。

**文件（File）**

文件输入/输出追踪通道，可以打开、再打开、读、写、关闭事件。

**帧（Frame）**

游戏和渲染帧。

**Gpu**

Gpu计时器名称。基于GPU分析器的数据。

**载入时间（LoadTime）**

资产加载Insight追踪通道。只适用于从pak/iostore的运行时加载。 \[#INCLUDE:testing-and-optimizing-your-content/unreal-insights/trace-in-unreal-engine#LoadTimeChannelSettings\]

**日志（Log）**

日志信息。

**MemAlloc**

内存分配。使用模块和调用堆栈。

**MemTag**

内存标签统计。以常规速率追踪每个标签的内存使用快照。依靠LLM子系统进行追踪。@@意味着 "-llm"。在 `Init()` 后可用。

**消息传递(Messaging)**

UDP消息传递插件。

**元数据（Metadata）**

支持通用元数据范围。

**模块（Module）**

模块加载信息。

**网络（Net）**

网络追踪通道。 \[#INCLUDE:testing-and-optimizing-your-content/unreal-insights/trace-in-unreal-engine#NetworkingCommand\]

**Niagara**

Niagara插件。

**对象（Object）**

GameplayInsights/RewindDebugger插件。`UObject` 类别、世界、实例和事件。

**物理（Physics）**

Chaos视觉调试器。

**RDG**

RDG Insights插件。

**RHI指令**

用于RHI指令的Cpu/Gpu计时器名称。

**渲染指令**

用于在渲染线程中运行指令的Cpu/Gpu计时器名称。

**保存时间（SaveTime）**

仅用于打包保存的Cpu计时器名称。

**截图（Screenshot）**

捕获由 `Trace.Screenshot` 控制台命令或使用 `TRACE_SCREENSHOT()` API触发的屏幕截图。

**Slate**

Slate Insight插件

**堆栈采样**

基于Event Tracing for Windows(ETW)的堆栈采样事件追踪

**数据统计（Stats）**

数据统计计数器。基于数据统计系统。

**任务（Task）**

任务图追踪通道。

**可视化日志（VisualLogger）**

可视化日志开始记录到文件中。

你可以使用已添加到 `[Trace.ChannelPresets]` 类别中的配置文件来定义你自己的预置。请参阅[Trace开发者指南](/documentation/zh-cn/unreal-engine/developer-guide-to-tracing-in-unreal-engine)的文档。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31a92d22-de6a-4adb-9f10-0392e0e343a3/channels.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31a92d22-de6a-4adb-9f10-0392e0e343a3/channels.png)

在下面的图片中,书签、Cpu、框架、Gpu和日志通道已被启用。这些设置是默认启用的。

##### Trace截图

**Trace截图** 在该帧中拍摄你的项目视口的图片，并将其发送给追踪器。默认情况下，Trace截图在通道面板上是启用的。你可以用以下方式截取Trace截图：

-   点击Insights/Trace控件并点击 **Trace Screenshot** (**Ctrl+F9**)
-   使用控制台命令 `trace.screenshot`。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42af46c5-0d35-4459-8918-5a668aaad56c/mysavedscreenshot.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42af46c5-0d35-4459-8918-5a668aaad56c/mysavedscreenshot.png)

当使用Trace截图时，Timing Insights时间线显示一条垂直线，其中包含当前时间戳，名称为你截图的日期和时间。

##### Trace书签

**Trace书签** 使用给定的字符串名称发送一个 `TRACE_BOOKMARK()` 事件。当在编辑器中使用时，截图和书签事件都将根据当前的时间戳，根据日期和时间的格式生成名称。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cbe7d12f-b1b8-41d2-8faa-30151efb933f/tracebookmark.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cbe7d12f-b1b8-41d2-8faa-30151efb933f/tracebookmark.png)

书签和截图在Timing Insights窗口中是可见的，你可以在顶部工具栏中，**标尺追踪（ruler track）** 下方的 **标记追踪（markers track）** 中找到它们。书签在日志视图中是可用的。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a76ac83-5496-42b7-a988-343cf2caac7a/log.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a76ac83-5496-42b7-a988-343cf2caac7a/log.png)

##### 统计数据名称事件

**数据统计命名事件(Stat Named Events)** 提供额外的分析指标。它可以通过点击复选框启用或禁用。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4526a2e9-0ed8-4db1-b2b0-e1c5e0bfaf26/statnamedevents.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4526a2e9-0ed8-4db1-b2b0-e1c5e0bfaf26/statnamedevents.png)

#### Trace目标

你可以通过设置 **Trace目标** 来选择存储追踪数据的位置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3586401d-917d-4521-9c2d-64d43e22a133/tracedestination.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3586401d-917d-4521-9c2d-64d43e22a133/tracedestination.png)

##### Trace储存文件

目标文件

说明

**Trace库**

将Trace库设置为目标。当使用这种方法时，服务器将追踪数据写入其管理的追踪库目录中的一个文件中。

**文件**

将文件设置为目标。当使用这种方法时，追踪数据直接写入指定文件。

#### Tracing

##### 启动或停止Trace

**启动Trace**

启动一个追踪器，追踪选定的追踪目标。你可以通过点击 **开始追踪（Start Trace）** 按钮使用Trace Insights控件启动追踪器。 ![start-trace-button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1db3468-b01b-4bc3-9755-83702a5d486d/starttracebutton.png)

**停止Trace**

当一个Trace开始时，开始TraceUI图标将显示为红色。你可以通过点击 **停止追踪（Stop Trace）** 按钮停止追踪器进行记录。 ![stop-trace-button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40a82ea7-a0a9-48d1-92b3-76d307a86664/stoptracebutton.png)

##### 保存Trace快照

想要保存Insights控件中的 **Trace快照** ，你可以：

-   点击 **保存Trace快照(Save Trace Snapshot）** 按钮。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e734d7f-a7ca-49f4-8ce9-ab310dd90612/savesnapshotbutton.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e734d7f-a7ca-49f4-8ce9-ab310dd90612/savesnapshotbutton.png)

-   点击Trace下拉菜单，找到 **Tracing** > **保存Trace快照** 。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0fe7444b-0015-427f-8f5b-46345690d824/savetracesnapshot.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0fe7444b-0015-427f-8f5b-46345690d824/savetracesnapshot.png)

#### 选项

选项

说明

**在Trace开始时打开实时会话**

当启用时，开始追踪后，实时会话将自动在Unreal Insights中打开。

这个选项只在追踪库中进行追踪时适用。

**追踪后打开Insights**

当启用时，停止追踪或保存快照后，会话将自动在Unreal Insights中打开。

**追踪后在资源管理器中显示**

当启用时，停止追踪器或保存快照后，将自动打开包含记录会话的文件夹。

#### 位置

选项

说明

**打开追踪库目录**

保存在Trace服务器中追踪器的位置。

**打开分析目录**

打开当前项目的分析目录。这是存储文件追踪器的位置。

#### Insights

选项

说明

**Unreal Insights(会话浏览器)**

启动Unreal Insights会话浏览器（Session Browser）。

**打开实时会话**

打开当前的实时会话。这只有在对库进行追踪时才能实现。

**最近的追踪器**

打开记录在追踪库或文件中最近打开的追踪器。

## Trace状态

你可以通过使用这个命令检视 **连接** 、 **内存使用** 、 **重要事件缓存** 、 **已发送** 数据、**已启用** 和 **可用的** 追踪通道信息：

```cpp
	Trace.Status
```

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99cf4471-b409-43bf-bc2c-912298515ae9/tracestatus.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99cf4471-b409-43bf-bc2c-912298515ae9/tracestatus.png)

## 使用命令提示符运行Insights

1.找到 `Engine\Binaries\Win64` 文件夹，然后双击UnrealInsights.exe。

![unreal-insights-executable-in-binaries-folder](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97babd1e-3b72-444c-b14d-271cd3aafd1c/binaryexe.png)

1.从你的操作系统中启动 **命令提示符** ，然后运行你的项目。

```cpp
	cd C:\MyEngineInstallLocation\
	Samples\Games\Binaries\Win64\YourProject.exe
```

你可能需要改变文件目录路径使其符合你的本地安装路径。

## 尾部追踪

**尾部追踪（Tail Tracing）** 会追踪最近几秒内的事件（取决于缓冲区大小），因此所有设备都可以显示出一定的提前量。

缓冲区的默认大小为4MB，但是如果你希望改动或关闭它，可以在命令行中输入以下命令：

```cpp
	-tracetailmb=X
```

将 **X** 设置为 **0MB** 可以将其关闭，其他数字则会相应地更改缓冲区大小。

## 延迟连接

虚幻引擎的客户端会将**重要事件** 进行缓存，然后在连接过程中发送至延迟连接的机器，因此在您可以进行连接之前不会错过一次性的事件(重要事件)。

Insights可以指示远程运行的虚幻引擎实例从其本地UI实例连接到远程跟踪服务器，并且不需要涉及本地机器。

延迟连接可以在 **Unreal Insights** > **Connect**中启动，或者在**编辑器cmd控制台（Editor cmd console）** 输入以下任意命令：

```cpp
	"trace.send [ip]" / "trace.start [filename]"
	-trace.start [file] [channelSet] -tracehost=[ip]
		-tracefile = [filepath]
```

Unreal Insights有一个基于文件的缓存系统，使应用程序可以将额外的信息附加到追踪器中。这可以用来更快地检索以前的计算结果，或储存可能会丢失的数据，如符号。缓存被储存在追踪文件旁边的`.ucache`文件中。

## Trace用户指南

你可以使用不同的工作流程在Unreal Insights中执行追踪。 有关更多信息，请参阅[Trace用户指南指南](/documentation/zh-cn/unreal-engine/trace-quick-start-guide-in-unreal-engine)。

## Trace开发者指南用户指南

你可以在Unreal Insights中开发你自己的追踪器。有关更多信息，请参阅[Trace用户指南指南](/documentation/zh-cn/unreal-engine/developer-guide-to-tracing-in-unreal-engine)。

-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [insights](https://dev.epicgames.com/community/search?query=insights)
-   [profiling](https://dev.epicgames.com/community/search?query=profiling)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [虚幻Trace服务器](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#%E8%99%9A%E5%B9%BBtrace%E6%9C%8D%E5%8A%A1%E5%99%A8)
-   [Trace Insights控件](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#traceinsights%E6%8E%A7%E4%BB%B6)
-   [Trace数据](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#trace%E6%95%B0%E6%8D%AE)
-   [通道](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#%E9%80%9A%E9%81%93)
-   [Trace截图](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#trace%E6%88%AA%E5%9B%BE)
-   [Trace书签](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#trace%E4%B9%A6%E7%AD%BE)
-   [统计数据名称事件](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#%E7%BB%9F%E8%AE%A1%E6%95%B0%E6%8D%AE%E5%90%8D%E7%A7%B0%E4%BA%8B%E4%BB%B6)
-   [Trace目标](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#trace%E7%9B%AE%E6%A0%87)
-   [Trace储存文件](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#trace%E5%82%A8%E5%AD%98%E6%96%87%E4%BB%B6)
-   [Tracing](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#tracing)
-   [启动或停止Trace](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#%E5%90%AF%E5%8A%A8%E6%88%96%E5%81%9C%E6%AD%A2trace)
-   [保存Trace快照](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#%E4%BF%9D%E5%AD%98trace%E5%BF%AB%E7%85%A7)
-   [选项](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#%E9%80%89%E9%A1%B9)
-   [位置](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#%E4%BD%8D%E7%BD%AE)
-   [Insights](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#insights)
-   [Trace状态](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#trace%E7%8A%B6%E6%80%81)
-   [使用命令提示符运行Insights](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#%E4%BD%BF%E7%94%A8%E5%91%BD%E4%BB%A4%E6%8F%90%E7%A4%BA%E7%AC%A6%E8%BF%90%E8%A1%8Cinsights)
-   [尾部追踪](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#%E5%B0%BE%E9%83%A8%E8%BF%BD%E8%B8%AA)
-   [延迟连接](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#%E5%BB%B6%E8%BF%9F%E8%BF%9E%E6%8E%A5)
-   [Trace用户指南](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#trace%E7%94%A8%E6%88%B7%E6%8C%87%E5%8D%97)
-   [Trace开发者指南用户指南](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5#trace%E5%BC%80%E5%8F%91%E8%80%85%E6%8C%87%E5%8D%97%E7%94%A8%E6%88%B7%E6%8C%87%E5%8D%97)
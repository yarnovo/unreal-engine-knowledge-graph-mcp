# 虚幻引擎Trace快速入门指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/trace-quick-start-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:39:36.074Z

---

目录

![Unreal Insights Trace快速入门指南](https://dev.epicgames.com/community/api/documentation/image/b1cbe419-efae-4f3c-84a6-04618efdf84e?resizing_type=fill&width=1920&height=335)

## 设置Unreal Insights

构建 **Unreal Insights**的时候，有以下几种选项：

#### 方法1：从文件资源管理器启动Unreal Insights

检查你的引擎中是否已经内置了Unreal Insights。找到 `Engine\Binaries\Win64\UnrealInsights.exe`

![unreal-insights-executable-in-binaries-folder](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d2b9b95-0d84-4d1e-b660-840a91dc0b94/binaryexe.png)

#### 方法2：使用Visual Studio编译

在你的 **解决方案资源管理器（Solution Explorer）** 中 **程序（Program）** 目录下，你可以手动构建Unreal Insights。

![build-from-visual-studio](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e07aca27-633f-4925-848b-666acc486c78/visualbuild.png)

#### 方法3：使用命令提示符

找到 **开始（Start）** > **命令提示符（Command Prompt）**， 然后从命令目录构建设Unreal Insights。

```cpp
		cd C:\MyEngineInstallLocation\

		Engine\Build\BatchFiles\RunUBT.bat UnrealInsights Win64 Development

```

#### 方案4：用编辑器打开

要从 **虚幻编辑器** 中打开Unreal Insights，找到 **工具（Tools）** > **Unreal Insights** > **运行 Unreal Insights**。Insights将会试图自动编译。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14d6352b-c835-46fa-b820-5fbe3748b2ba/runinsightseditor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14d6352b-c835-46fa-b820-5fbe3748b2ba/runinsightseditor.png)

取决于虚幻引擎的版本和操作系统，为配置项目数据运行Trace时有多种工作流程可选。

## 默认追踪工作流程 (Win64, 二进制文件启动器)

#### 1\. 运行Unreal Insights:

找到 `Engine\Binaries\Win64` 文件夹并且双击UnrealInsights.exe。

![二进制文件文件夹中的Unreal Insights可执行文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5dd84888-78c0-4db9-a191-35c01fd51a5e/binaryexe.png)

#### 2\. Insights会话浏览器：

当你启动 **Unreal Insights会话浏览器（Unreal Insights Session Browser）**，可以看到当前没有可用的活跃会话。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec3a36b0-0521-41a8-b117-03e8b36aef87/insightssessionbrowser.png)

#### 3\. 运行你的游戏项目：

从操作系统启动 **命令提示符（Command Prompt）** 并且运行Lyra样板游戏。

```cpp
	cd C:\MyEngineInstallLocation\

	Samples\Games\Lyra\Binaries\Win64\LyraGame.exe

```

如果你从Epic Games商城下载了Lyra，可以从默认路径将其启动 `UnrealProjects\Lyra\Lyra.uproject` 。

#### 4\. 活跃Insights会话浏览器：

返回到Unreal Insights会话浏览器，能够看到现在有了一个新的会话，带有 "LIVE" 状态，说明其现在正在进行录制。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb0d0eaf-22ba-41fd-8cc5-6124c1d82577/livesession.png)

#### 5\. 检查Trace的状态：

在Lyra中，双击波浪键 (\`) 来打开控制台，然后输入指令

```cpp
	Trace.Status.
```

![查看Trace状态](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99664c1f-179c-43d2-901e-b4a1f4060026/tracestatus.png)

**Gpu**、**Bookmark**、**Frame**、**Cpu** 以及 **Log** 这些通道默认启用。

如果Unreal Insights在打开项目之前就已经在运行，那么它会自动连接到本地Trace服务器并启用默认的通道。

#### 6\. 打开你的Trace会话：

返回至Unreal Insights会话浏览器，然后双击你的 `.utrace` 文件来打开它，用于在一个新的虚幻 **计时Insights（Timing Insights）** 窗口中进行分析。

要打开一个Trace文件，可以将 `.utrace` 文件从文件资源管理器拖入Unreal Insights会话浏览器。除此以外，点击 **打开Trace（Open Trace）** 旁的 **箭头** 按钮，然后从下拉菜单中选择 **打开文件（Open File）**，这样可以从指定的文件夹打开.utrace文件。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a32e0bf0-1f49-47d9-89c6-8cb39189125d/opentrace.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a32e0bf0-1f49-47d9-89c6-8cb39189125d/opentrace.png)

打开Trace时会启动一个新的Unreal Insight实例。计时Insight是默认打开的组件，可以让你与Trace会话进行互动，以了解你的项目在不同任务上花费的时间。

参考[计时Insights](/documentation/zh-cn/unreal-engine/timing-insights-in-unreal-engine-5)文档来了解如何查看你的数据并进行分析。

### 追踪的高级控制

Unreal Insights提供几种Trace指令来让你控制数据如何配置。

-   `Trace.SnapshotFile <filename>`：将当前内存内跟踪缓冲区的快照写入一个文件。如果你已经在主动跟踪，它不会中断主动跟踪，而是为这个快照并行地记录第二个跟踪文件。
    
-   `Trace.Bookmark <name>`：使用给定的字符串名称发射一个Bookmark事件。被记录的Bookmark以竖线的形式出现在Timing Insights中。之前这只能通过API调用`TRACE_BOOKMARK()`实现。
    
-   `Trace.Screenshot <Name> <bIncludeUI>`:：如上文所述，你可以运行此控制台指令以生成竖线，并通过在Timing Insights中指定快照的true或者false来选择是否包含UI。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa18423d-97b3-479e-b23a-25833828d446/mysavedscreenshot.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa18423d-97b3-479e-b23a-25833828d446/mysavedscreenshot.png)

你可能需要看到CPU或者GPU配置数据这样的追踪通道，或者需要停用追踪通道。参考 [Trace](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5) 和[参考](/documentation/zh-cn/unreal-engine/unreal-insights-reference-in-unreal-engine-5)文档来了解Trace指令的更多信息。

## 延迟连接

一些情况下你可能会忘记在打开项目之前启动UnrealInsights.exe，或者你需要不从一开始就记录。通过以下步骤可以 **延迟连接（Late Connect）** 到Unreal Insights。

继续操作之前，检查 **Unreal Insights会话浏览器** 以确保没有正在运行的活跃会话。你可以输入以下控制台指令，停止连接：

```cpp
	Trace.Stop
```

1.  像通常一样构建、烘焙或者运行你的项目。
    
2.  打开Unreal Insights.
    
3.  点击 **连接（Connection）** 来打开连接选项卡。确认需要的连接设置，然后点击 **连接（Connect）**。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/194a9cb2-c022-4356-8134-4b7f57193dc0/lateconnection.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/194a9cb2-c022-4356-8134-4b7f57193dc0/lateconnection.png)

成功连接后，点击 **Trace存储（Trace Store）** 选项卡。一个新的活跃会话会出现在会话列表中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c88552f-01f3-439f-9395-9caff0a5a513/livelateconnect.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c88552f-01f3-439f-9395-9caff0a5a513/livelateconnect.png)

-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [insights](https://dev.epicgames.com/community/search?query=insights)
-   [profiling](https://dev.epicgames.com/community/search?query=profiling)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置Unreal Insights](/documentation/zh-cn/unreal-engine/trace-quick-start-guide-in-unreal-engine#%E8%AE%BE%E7%BD%AEunrealinsights)
-   [方法1：从文件资源管理器启动Unreal Insights](/documentation/zh-cn/unreal-engine/trace-quick-start-guide-in-unreal-engine#%E6%96%B9%E6%B3%951%EF%BC%9A%E4%BB%8E%E6%96%87%E4%BB%B6%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E5%99%A8%E5%90%AF%E5%8A%A8unrealinsights)
-   [方法2：使用Visual Studio编译](/documentation/zh-cn/unreal-engine/trace-quick-start-guide-in-unreal-engine#%E6%96%B9%E6%B3%952%EF%BC%9A%E4%BD%BF%E7%94%A8visualstudio%E7%BC%96%E8%AF%91)
-   [方法3：使用命令提示符](/documentation/zh-cn/unreal-engine/trace-quick-start-guide-in-unreal-engine#%E6%96%B9%E6%B3%953%EF%BC%9A%E4%BD%BF%E7%94%A8%E5%91%BD%E4%BB%A4%E6%8F%90%E7%A4%BA%E7%AC%A6)
-   [方案4：用编辑器打开](/documentation/zh-cn/unreal-engine/trace-quick-start-guide-in-unreal-engine#%E6%96%B9%E6%A1%884%EF%BC%9A%E7%94%A8%E7%BC%96%E8%BE%91%E5%99%A8%E6%89%93%E5%BC%80)
-   [默认追踪工作流程 (Win64, 二进制文件启动器)](/documentation/zh-cn/unreal-engine/trace-quick-start-guide-in-unreal-engine#%E9%BB%98%E8%AE%A4%E8%BF%BD%E8%B8%AA%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B\(win64,%E4%BA%8C%E8%BF%9B%E5%88%B6%E6%96%87%E4%BB%B6%E5%90%AF%E5%8A%A8%E5%99%A8\))
-   [1\. 运行Unreal Insights:](/documentation/zh-cn/unreal-engine/trace-quick-start-guide-in-unreal-engine#1%E8%BF%90%E8%A1%8Cunrealinsights:)
-   [2\. Insights会话浏览器：](/documentation/zh-cn/unreal-engine/trace-quick-start-guide-in-unreal-engine#2insights%E4%BC%9A%E8%AF%9D%E6%B5%8F%E8%A7%88%E5%99%A8%EF%BC%9A)
-   [3\. 运行你的游戏项目：](/documentation/zh-cn/unreal-engine/trace-quick-start-guide-in-unreal-engine#3%E8%BF%90%E8%A1%8C%E4%BD%A0%E7%9A%84%E6%B8%B8%E6%88%8F%E9%A1%B9%E7%9B%AE%EF%BC%9A)
-   [4\. 活跃Insights会话浏览器：](/documentation/zh-cn/unreal-engine/trace-quick-start-guide-in-unreal-engine#4%E6%B4%BB%E8%B7%83insights%E4%BC%9A%E8%AF%9D%E6%B5%8F%E8%A7%88%E5%99%A8%EF%BC%9A)
-   [5\. 检查Trace的状态：](/documentation/zh-cn/unreal-engine/trace-quick-start-guide-in-unreal-engine#5%E6%A3%80%E6%9F%A5trace%E7%9A%84%E7%8A%B6%E6%80%81%EF%BC%9A)
-   [6\. 打开你的Trace会话：](/documentation/zh-cn/unreal-engine/trace-quick-start-guide-in-unreal-engine#6%E6%89%93%E5%BC%80%E4%BD%A0%E7%9A%84trace%E4%BC%9A%E8%AF%9D%EF%BC%9A)
-   [追踪的高级控制](/documentation/zh-cn/unreal-engine/trace-quick-start-guide-in-unreal-engine#%E8%BF%BD%E8%B8%AA%E7%9A%84%E9%AB%98%E7%BA%A7%E6%8E%A7%E5%88%B6)
-   [延迟连接](/documentation/zh-cn/unreal-engine/trace-quick-start-guide-in-unreal-engine#%E5%BB%B6%E8%BF%9F%E8%BF%9E%E6%8E%A5)
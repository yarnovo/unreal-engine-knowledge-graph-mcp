# 虚幻引擎Slate Insights | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/slate-insights-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:40:01.922Z

---

目录

![Slate Insights概述](https://dev.epicgames.com/community/api/documentation/image/c164a02e-74f6-41cf-9f15-4c42f2845f37?resizing_type=fill&width=1920&height=335)

在为应用程序开发用户界面（UI）时，UI程序员可能会难以找到触发UI更新的更改源。**Slate Insights** 为开发人员提供了多种工具来识别特定Slate和UMG更新的根本原因，帮助他们提高UI性能。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31830c10-8571-450b-bb3d-04f5ea558864/slateframe.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31830c10-8571-450b-bb3d-04f5ea558864/slateframe.png)

Slate Insights中运行的Slate帧视图。

在使用Slate Insights插件时，开发人员可以使用 **Slate帧视图（Slate Frame View）** 来获取要逐帧绘制、作废或更新的控件列表。Slate Insights让开发人员可以调试和优化他们的UI。

## 设置

## 使用Slate Insights

要开始在编辑器中使用Slate Insights，可以从编辑器内部或从 `*.uproject` 文件启用插件。要从编辑器启用Slate Insights插件，请在 **编辑器（Editor）** > **插件（Plugins）** > **内置（Built-In）** > **Slate Insights** 中找到它。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af6e4899-f655-4d1f-b80d-fbe623034b0c/slateinsights.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af6e4899-f655-4d1f-b80d-fbe623034b0c/slateinsights.png)

此外，也可从项目的 `*.uproject` 文件启用插件。

```cpp
	{
		"FileVersion": 3,
		"EngineAssociation": "{2118FE05-4070-6D80-44FC-17A9E96EAE93}",
		"Category": "",
		"Description": "",
		"Plugins": [
			{
				"Name": "SlateInsights",
				"Enabled": true
			}
		]
	}
```

若从源编译编辑器，启用必要插件后需为项目编译并运行编辑器。

启用所需插件后，请重启编辑器，并按照下面的步骤追踪Slate Insights的数据。

1.  在编辑器中打开游戏项目，然后打开 **编辑器首选项（Editor Preferences）**。
    
2.  在 **关卡编辑器（Level Editor）** - **运行（Play）** > **在独立游戏中运行（Play in Standalone Game）** 下，将 `-trace=slate` 输入到 **其他启动参数（Additional Launch Parameters）** 文本框。
    
    在[Unreal Insights引用](/documentation/zh-cn/unreal-engine/unreal-insights-reference-in-unreal-engine-5)中学习更多命令行选项
    
3.  将项目的主动运行模式（Active Play Mode）设置为 **独立游戏（Standalone Game）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc5f94f1-8a88-4a0f-a821-ba7e1b4e1e61/standalonegame.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc5f94f1-8a88-4a0f-a821-ba7e1b4e1e61/standalonegame.png)
    
4.  如果尚未编译Unreal Insights，请在 `Engine\Source\Programs\UnrealInsights` 下面找到Unreal Insights项目，然后编译应用程序。
    
5.  运行 **UnrealInsights** 应用程序。在 `Engine\Binaries[Platform]` 下找到该应用程序。
    
6.  在Unreal Insights运行时，运行项目来记录应用程序的追踪数据。
    
    -   追踪将自动写入以下项目目录：`%appdata%/local/UnrealEngine/Common/UnrealTrace/Store/001` 。
    -   由于追踪会话的大小会随时间推移而增大，必须积极监控和管理 `*.utrace` 文件。
    
7.  在记录项目的追踪数据之后关闭独立应用程序。
    
8.  要在Unreal Insights中开始分析，请选择项目的追踪会话(1)，然后点击 **打开（Open）** (2)。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc5f06b8-1f88-4018-90df-59e01770c3b6/sessionbrowser.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc5f06b8-1f88-4018-90df-59e01770c3b6/sessionbrowser.png)
    
9.  要打开Slate Frame View（Slate帧视图）选项卡，请选择 **菜单（Menu）** > **Slate帧视图（Slate Frame View）**
    
    如需获取有关导航和使用Unreal Insights的一般信息，请阅读[Unreal Insights概述](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)。
    
10.  使用 **Slate帧视图（Slate Frame View）** 分析UI数据。
    

## Slate帧视图

利用Unreal Insights获取应用程序的追踪数据之后，打开 `*.utrace` 文件，开始使用 **Slate帧视图（Slate Frame View）** 分析UI状态。

![slate-frame-view-running-in-unreal-insights](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80533b53-b19b-42dc-a0ff-8a0bd5c84e08/slateframeview.png)

Slate帧视图具有两个报告区域：**无效（Invalidation）** 和 **更新（Update）**。每个区域都有自己的追踪标记集合。

### 无效追踪标记

Invalidation Trace Flags（无效追踪标记）区域报告 **控件（Widget）** 信息，包括相应的 **数量（Amount）** 以及控件无效的一个或多个 **原因（Reason）**。在展开控件以查看其无效原因时，Slate帧视图将会突出显示"LPUCRV"标记列表中的一个或多个标记，如下文所定义。

标记

定义

**L**

布局标记。True表示将会更改控件的所需大小。

**P**

绘制标记。True表示控件需要重新绘制，但不会影响其大小。

**U**

易变标记。True表示控件易变性发生了变化。

**C**

子顺序标记。True表示已添加或移除子项，暗示存在布局。

**R**

渲染转换标记。True表示控件渲染转换发生了变化。

**V**

可视性标记。True表示控件可视性发生了变化，暗示存在布局。

### 更新追踪标记

Update Trace Flags（更新追踪标记）区域报告 **控件（Widget）** 信息，包括相应的 **数量（Amount）** 以及控件更新的一个或多个 **原因（Reason）**。在展开控件以查看其更新原因时，Slate帧视图将会突出显示"UTPV"标记列表中的一个或多个标记，如下文所定义。

标记

定义

**U**

Tick标记。True表示控件已更新。

**T**

活跃定时器更新标记。True表示控件具有活跃定时器。

**P**

重新绘制标记。True表示控件受到污染，将会重新绘制。

**V**

易变标记。True表示控件易变，已重新绘制。

-   [performance](https://dev.epicgames.com/community/search?query=performance)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [profiling](https://dev.epicgames.com/community/search?query=profiling)
-   [slate insights](https://dev.epicgames.com/community/search?query=slate%20insights)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置](/documentation/zh-cn/unreal-engine/slate-insights-in-unreal-engine#%E8%AE%BE%E7%BD%AE)
-   [使用Slate Insights](/documentation/zh-cn/unreal-engine/slate-insights-in-unreal-engine#%E4%BD%BF%E7%94%A8slateinsights)
-   [Slate帧视图](/documentation/zh-cn/unreal-engine/slate-insights-in-unreal-engine#slate%E5%B8%A7%E8%A7%86%E5%9B%BE)
-   [无效追踪标记](/documentation/zh-cn/unreal-engine/slate-insights-in-unreal-engine#%E6%97%A0%E6%95%88%E8%BF%BD%E8%B8%AA%E6%A0%87%E8%AE%B0)
-   [更新追踪标记](/documentation/zh-cn/unreal-engine/slate-insights-in-unreal-engine#%E6%9B%B4%E6%96%B0%E8%BF%BD%E8%B8%AA%E6%A0%87%E8%AE%B0)
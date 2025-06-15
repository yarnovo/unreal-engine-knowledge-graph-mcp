# 调试虚幻引擎中的虚拟资产 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/debugging-virtual-assets-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:34:55.530Z

---

目录

![调试虚拟资产](https://dev.epicgames.com/community/api/documentation/image/946ce78c-fbec-4896-bff9-12be86a25980?resizing_type=fill&width=1920&height=335)

本页面介绍了如何查看有关项目中的 **虚拟资产（Virtual Assets）** 的信息和调试输出。

## 验证你的虚拟化数据包

要确定你的数据包是否已成功虚拟化，请将鼠标悬停在内容浏览器中的资产上，然后勾选 **有虚拟化数据（Has Virtualized Data）** 条目。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5f79584-fd75-498f-a764-90d68681658a/verifyvirtualasset.png)

你也可以查看资产的文件大小。如果 `.uasset` 文件比虚拟化之前显著变小，则批量数据已从 `.uasset` 分离，并已包含在 **Saved/VirtualizedPayloads** 目录中。

要调查数据包文件的内容，请右键点击 **内容浏览器（Content Browser）** 中的资产，点击 **复制文件路径（Copy File Path）** ，然后在控制台中输入以下命令：

```cpp
	DumpPackagePayloadInfo [文件路径]

```

将 `[file path]` 替换为你从内容浏览器复制的文件路径。

此控制台命令可以采用完整路径或数据包路径，并将在输出窗口中编写有效负载的摘要。 输出会显示本地存储的有效负载的列表，然后是虚拟化有效负载的列表。

DumpPackagePayloadInfo不会使用缓存的信息，例如资产注册表。相反，它会在你每次使用它时重新解析数据包的信息，这样它提供的信息应该始终是最新的。

## 使用统计数据面板监控虚拟资产

**统计数据面板（Statistics Panel）** 将显示有关虚拟资产在你的计算机上如何表现的信息。你可以在 **工具（Tool）** > **审核（Audit）** > **虚拟资产（Virtual Assets）** 中找到此面板。

![审核虚拟资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec586022-ef5d-4ce5-820b-54ea388ad349/auditvirtualassets.png)

虚拟资产统计数据面板。当前面板将显示两个不同后端的读取、写入和缓存统计数据：DDC后端和项目的源码控制。

"虚拟资产（Virtual Assets）"选项卡中的每行表示不同的后端，基于你的配置文件设置，这应该易于识别。虚幻引擎记录了以下内容的统计数据：

-   **读取（Read）**
    
    -   根据需要从后端提取有效负载。
-   **写入（Write）**
    
    -   在虚拟化时将有效负载推送到后端。
-   **缓存（Cache）**
    
    -   从更慢的后端（例如源码控制系统）提取有效负载时，它会推送到更快的后端，这样重复访问会更快。

## 调试命令参考

此分段提供了调试命令，用于调试 **虚幻引擎（Unreal Engine）** 中的 **虚拟资产（Virtual Asset）** 系统。它在适用的情况下为虚幻编辑器中的命令行和控制台窗口提供了命令。命令行中使用的大部分命令还可以在你的配置文件中使用。你还可以在[虚拟化图表](/documentation/zh-cn/unreal-engine/backend-graphs-for-virtual-assets-in-unreal-engine)中使用这些命令的命令行版本。

### 禁用虚拟资产系统

-   **命令行：** `-VADisable`
-   **控制台：** `VA.DisableVirtualization`

禁用虚拟化系统并改为挂载空实现。

这相当于将 `DefaultEngine.ini` 文件中的 `[Core.ContentVirtualization]` 分段中的 `SystemName` 设置为 `None` 。

禁用后，虚拟化系统接口中的所有方法都将返回其失败状态。

### 覆盖BackendGraph

-   **命令行：** -VABackendGraph=

更改虚拟化系统在初始化时使用的后端图表，就好像你在编辑 `DefaultEngine.ini`文件中的 `[Core.ContentVirtualization]` 分段的"BackendGraph"值

图表的名称必须匹配为你尝试运行的项目设置的现有图表。如果它不存在，则虚拟化系统会在启动时显示致命错误。

### 禁用特定后端

-   **命令行：** `-VAMissBackends=[后端名称]`
-   **控制台：** `VA.MissBackends`

完全禁止一个或多个后端提取有效负载。此命令可能采用以下任意输入：

**输入**

**结果**

**后端名称（Backend name）**

你想禁用的后端的名称。你可以提供多个后端名称，用 `+` 将其组合起来。例如， -VA-MissBackends=FastCache+SlowCache\` 会禁用列出的两个后端。

**全部（All）**

禁止所有后端提取。

**重置（Reset ）**

重置并启用所有后端。

**列出（List）**

列出当前禁用的后端。

### 模拟错误连接

-   **命令行：** \`-VAMissChance=\[失败的百分比几率\]
-   **控制台：** `VA.MissChance`

设置有效负载提取将自动失败的百分比几率，以模拟错误连接。例如， `-VA-MissChance=50` 将设置50%的失败几率。

### 使指定数量的有效负载提取失败

-   **控制台：** `VA.MissCount=[要错过的有效负载提取次数]`

自动错过后续 `X` 次有效负载提取，其中 `X` 是你使用此命令指定的数字。

`VA.MissCount` 没有命令行版本。

### 验证有效负载推送

-   **命令行：** `-VAValidatePushes`
-   **控制台：** `VA.ValidatePushes`

在每次推送后提取有效负载并与原始文件比较来验证有效负载。这相当于在 `DefaultEngine.ini` 文件中设置 `ValidateAfterPushOperation` 选项。

### 强制采用单线程模式

-   **命令行：** `-VASingleThreaded`
-   **控制台：** `VA.SingleThreaded`

强制系统以单线程模式工作，排除了作为潜在漏洞来源的多线程访问。这相当于在 `DefaultEngine.ini` 文件中设置 `ForceSingleThreaded` 选项。

## 日志记录

当虚拟化系统初始化时，会有详细日志显示启用的选项和设置。这包括在某个事项未正确设置并有可能造成严重数据故障时的致命日志消息。

默认情况下，日志记录会尽量减少，并且仅应该在恰当时显示警告和错误。但是，如果你启用 **详细日志记录** ，日志将显示在调试问题时很有用的额外信息。

要启用日志记录，请在命令行上使用以下命令：

```cpp
-LogCmds="LogVirtualization Verbose" 
-ini:Engine:[Core.Log]:LogVirtualization=Verbose"
```

-   [debugging](https://dev.epicgames.com/community/search?query=debugging)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [验证你的虚拟化数据包](/documentation/zh-cn/unreal-engine/debugging-virtual-assets-in-unreal-engine#%E9%AA%8C%E8%AF%81%E4%BD%A0%E7%9A%84%E8%99%9A%E6%8B%9F%E5%8C%96%E6%95%B0%E6%8D%AE%E5%8C%85)
-   [使用统计数据面板监控虚拟资产](/documentation/zh-cn/unreal-engine/debugging-virtual-assets-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%BB%9F%E8%AE%A1%E6%95%B0%E6%8D%AE%E9%9D%A2%E6%9D%BF%E7%9B%91%E6%8E%A7%E8%99%9A%E6%8B%9F%E8%B5%84%E4%BA%A7)
-   [调试命令参考](/documentation/zh-cn/unreal-engine/debugging-virtual-assets-in-unreal-engine#%E8%B0%83%E8%AF%95%E5%91%BD%E4%BB%A4%E5%8F%82%E8%80%83)
-   [禁用虚拟资产系统](/documentation/zh-cn/unreal-engine/debugging-virtual-assets-in-unreal-engine#%E7%A6%81%E7%94%A8%E8%99%9A%E6%8B%9F%E8%B5%84%E4%BA%A7%E7%B3%BB%E7%BB%9F)
-   [覆盖BackendGraph](/documentation/zh-cn/unreal-engine/debugging-virtual-assets-in-unreal-engine#%E8%A6%86%E7%9B%96backendgraph)
-   [禁用特定后端](/documentation/zh-cn/unreal-engine/debugging-virtual-assets-in-unreal-engine#%E7%A6%81%E7%94%A8%E7%89%B9%E5%AE%9A%E5%90%8E%E7%AB%AF)
-   [模拟错误连接](/documentation/zh-cn/unreal-engine/debugging-virtual-assets-in-unreal-engine#%E6%A8%A1%E6%8B%9F%E9%94%99%E8%AF%AF%E8%BF%9E%E6%8E%A5)
-   [使指定数量的有效负载提取失败](/documentation/zh-cn/unreal-engine/debugging-virtual-assets-in-unreal-engine#%E4%BD%BF%E6%8C%87%E5%AE%9A%E6%95%B0%E9%87%8F%E7%9A%84%E6%9C%89%E6%95%88%E8%B4%9F%E8%BD%BD%E6%8F%90%E5%8F%96%E5%A4%B1%E8%B4%A5)
-   [验证有效负载推送](/documentation/zh-cn/unreal-engine/debugging-virtual-assets-in-unreal-engine#%E9%AA%8C%E8%AF%81%E6%9C%89%E6%95%88%E8%B4%9F%E8%BD%BD%E6%8E%A8%E9%80%81)
-   [强制采用单线程模式](/documentation/zh-cn/unreal-engine/debugging-virtual-assets-in-unreal-engine#%E5%BC%BA%E5%88%B6%E9%87%87%E7%94%A8%E5%8D%95%E7%BA%BF%E7%A8%8B%E6%A8%A1%E5%BC%8F)
-   [日志记录](/documentation/zh-cn/unreal-engine/debugging-virtual-assets-in-unreal-engine#%E6%97%A5%E5%BF%97%E8%AE%B0%E5%BD%95)
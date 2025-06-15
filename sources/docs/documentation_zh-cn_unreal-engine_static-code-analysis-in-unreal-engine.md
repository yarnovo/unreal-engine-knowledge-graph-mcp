# 虚幻引擎中的静态代码分析 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/static-code-analysis-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:31:49.331Z

---

目录

![静态代码分析](https://dev.epicgames.com/community/api/documentation/image/18346380-9b40-4c8a-b1b1-075f7aaf3820?resizing_type=fill&width=1920&height=335)

**虚幻编译工具（UBT）** 支持运行多个不同的静态代码分析器。**静态代码分析器（Static Code Analyzer）** 使用各种算法和技术，在不执行代码的情况下检查源代码并发现漏洞。这意味着可以加快分析速度、更早发现内存泄漏和逻辑错误，以及减少技术债务。

## 通过UBT使用静态代码分析器

使用UBT从你的虚幻引擎根目录运行静态代码分析器的一般命令行语法如下：

```cpp
Engine\Build\BatchFiles\RunUBT.bat TARGET PLATFORM Development -StaticAnalyzer=ANALYZER
```

`TARGET` 、 `PLATFORM` 和 `ANALYZER` 是以上命令中的必备参数，必须将它们替换为你想要的值。

-   `TARGET` ：UBT支持的编译目标，更多信息请参阅有关[目标](/documentation/zh-cn/unreal-engine/unreal-engine-build-tool-target-reference)的文档。
-   `PLATFORM` ：虚幻引擎支持的平台。访问[通用平台支持](/documentation/404)页面，了解虚幻引擎的平台支持情况。
-   `ANALYZER` ：UBT分析指定平台上提供的目标时使用的静态代码分析器。请参阅下面的[支持的分析器](/documentation/zh-cn/unreal-engine/static-code-analysis-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84%E5%88%86%E6%9E%90%E5%99%A8)小节，查看可用的选项。

### 支持的分析器

分析器

说明

默认值（Default）

所选编译器的默认静态分析器（若有）。

VisualCpp

内置Visual C++静态分析器。仅支持基于Microsoft Visual C++（MSVC）的平台。

PVSStudio

PVS-Studio静态分析器。仅支持基于MSVC的平台。

PVS-Studio要求在安装的 `PVS-Studio.exe` 可执行文件旁放置许可证文件。有关PVS-Studio和获取许可证的更多信息，请访问[PVS-Studio](https://pvs-studio.com/)文档。

Clang

Clang静态分析器。这会强制编译器对基于MSVC的平台使用Clang。

对于UE5.3，Clang静态分析器需要你使用 `-DisableUnity` 标记编译。如果省略此标记，将不会报警。其结果就是，如果你使用 `-DisableUnity` 分析引擎，可能会出现与你的项目代码无关的额外警告，我们正在积极解决此问题。

减少警告的方法之一是使用命令行参数 `-Module=<PROJECT_MODULE>` 让Clang静态分析器专注于特定的模板。

### 示例

从你的虚幻引擎根目录中运行以下命令，从而使用默认静态代码分析器，并将虚幻编辑器作为Windows 64位平台上的目标：

```cpp
Engine\Build\BatchFiles\RunUBT.bat UnrealEditor Win64 Development -StaticAnalyzer=Default
```

从你的虚幻引擎根目录中运行以下命令，从而使用Visual C++静态代码分析器，并将Lyra初学者游戏作为Windows 64位平台上的目标：

```cpp
Engine\Build\BatchFiles\RunUBT.bat LyraGame Win64 Development -StaticAnalyzer=VisualCpp
```

### Clang分析器的命令行选项

选项

说明

`-StaticAnalyzerOutputType=html`

写出带有描述分析警告的导航的网页。这些HTML文件将写入所选平台和目标的 `Engine/Intermediate/Build` 目录内的相应文件夹。

`-StaticAnalyzerMode=shallow`

启用浅分析。这意味着分析完成得更快，但信息量小于标准分析。我们不建议将此模式用于一般用途。

`-StaticAnalyzerChecker=CHECKER`

提供你想要启用的静态分析器检查程序的列表，而不是默认列表。

`-StaticAnalyzerDisableChecker=CHECKER`

禁用静态分析器默认检查程序。此选项会覆盖默认禁用的检查程序，即 `deadcode.DeadStores` 和 `security.FloatLoopCounter` 。如果设置了 `-StaticAnalyzerChecker` ，则不使用此选项。

`-StaticAnalyzerAdditionalChecker=CHECKER`

启用额外的非默认静态分析器检查程序。如果设置了 `-StaticAnalyzerChecker` ，则不使用此选项。

有关Clang分析器检查程序的完整列表，请参阅Clang文档中的[可用检查程序](https://clang.llvm.org/docs/analyzer/checkers.html)。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [code analysis](https://dev.epicgames.com/community/search?query=code%20analysis)
-   [analyzer](https://dev.epicgames.com/community/search?query=analyzer)
-   [clang](https://dev.epicgames.com/community/search?query=clang)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [通过UBT使用静态代码分析器](/documentation/zh-cn/unreal-engine/static-code-analysis-in-unreal-engine#%E9%80%9A%E8%BF%87ubt%E4%BD%BF%E7%94%A8%E9%9D%99%E6%80%81%E4%BB%A3%E7%A0%81%E5%88%86%E6%9E%90%E5%99%A8)
-   [支持的分析器](/documentation/zh-cn/unreal-engine/static-code-analysis-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84%E5%88%86%E6%9E%90%E5%99%A8)
-   [示例](/documentation/zh-cn/unreal-engine/static-code-analysis-in-unreal-engine#%E7%A4%BA%E4%BE%8B)
-   [Clang分析器的命令行选项](/documentation/zh-cn/unreal-engine/static-code-analysis-in-unreal-engine#clang%E5%88%86%E6%9E%90%E5%99%A8%E7%9A%84%E5%91%BD%E4%BB%A4%E8%A1%8C%E9%80%89%E9%A1%B9)
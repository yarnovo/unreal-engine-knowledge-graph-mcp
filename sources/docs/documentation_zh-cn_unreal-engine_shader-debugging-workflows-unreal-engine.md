# 虚幻引擎中的着色器调试工作流程 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/shader-debugging-workflows-unreal-engine
> 
> 生成时间: 2025-06-14T19:24:57.594Z

---

目录

![着色器调试工作流程](https://dev.epicgames.com/community/api/documentation/image/973945fc-d6bb-40a2-8dd7-1d464e892d3b?resizing_type=fill&width=1920&height=335)

调试着色器的主要途径是启用控制台变量 `r.Shaders.Symbols` 。这将触发引擎准备着色器以按特定于平台的程序调试，例如[RenderDoc](/documentation/zh-cn/unreal-engine/using-renderdoc-with-unreal-engine)和PIX。

你可以逐个平台覆盖此控制台变量以及下面列出的其他变量。这样做很重要，可使额外的着色器编译保持可控。

## 着色器调试工作流程

下面说明了三个着色器调试工作流程示例。在每种情况下，你需要编辑你想在其中调试着色器的平台的 **配置文件** 。 例如，如果你要为Android调试着色器，就需要将控制台变量添加到 **AndroidEngine.ini** 文件。

### 示例：使用特定于平台的着色器调试器

你需要使用特定于平台的着色器调试器在该平台上烘焙的游戏中调试着色器。

将以下文本添加到你的 **\[平台\]Engine.ini** 文件：

```cpp
	[ShaderCompiler]
	r.Shaders.Symbols=1

```

使用编辑器或虚幻编译工具（UBT）为该平台烘焙你的游戏。在该平台上创建GPU捕获。如果系统要求提供着色器符号路径，指向文件夹 `Path/To/My/Project/Saved/ShaderSymbols/Platform` 。

### 示例：仅让构建机器将符号写入Zip文件

你始终需要为平台构建着色器符号，并仅让构建机器将它们写入 `.zip` 文件。

将以下文本添加到你的 **\[平台\]Engine.ini** 文件：

```cpp
	[ShaderCompiler]
	r.Shaders.GenerateSymbols=1

	[ShaderCompiler_BuildMachine]
	r.Shaders.WriteSymbols=1
	r.Shaders.WriteSymbols.Zip=1

```

现在构建机器将生成以下 `.zip` 文件：`Path/To/My/Project/Saved/ShaderSymbols/Platform/ShaderSymbols.zip` 。

### 示例：在本地调试着色器

你有一个图形程序员在使用与示例2相同的设置处理一个项目，并且需要在本地调试着色器。

在这种情况下，用户应当在本地编辑 **\[平台\]Engine.ini** 并添加以下内容：

```cpp
	[ShaderCompiler]
	r.Shaders.WriteSymbols=1

```

当这位程序员烘焙你的项目时，着色器会全部零散地写入 `Path/To/My/Project/Saved/ShaderSymbols/Platform` 。

## 控制台变量摘要

这些是可用于着色器调试的控制台变量。

控制台变量

说明

`r.Shaders.Symbols`

通过生成符号来启用着色器调试。如果平台需要外部符号，它们会被写入磁盘；否则，它们存储在运行时加载的着色器数据中。你可以逐个平台将其覆盖。

`r.Shaders.ExtraData`

生成着色器名称和其他逐个平台的额外着色器数据。你可以逐个平台覆盖此变量。

`r.Shaders.GenerateSymbols`

生成符号，但不将其写入磁盘。你可以逐个平台覆盖此变量。

`r.Shaders.WriteSymbols`

如果平台支持外部符号，则在它们已生成时将其写入磁盘。你可以逐个平台覆盖此变量。

`r.Shaders.SymbolPathOverride`

如果平台支持外部符号，你可以使用此控制台变量来覆盖它们所写入的位置。

`r.Shaders.WriteSymbols.Zip`

如果平台支持外部符号，并且它们需要写入磁盘，则将其写入单个 `.zip` 文件而不是各个单独的文件。

`r.Shaders.AllowUniqueSymbols`

如果平台支持外部符号，则从产生的着色器而不是其源文件生成符号文件名。我们不推荐启用此变量，因为它可能会显著增加你的符号的大小。

## 平台覆盖

你可以通过将特殊分段添加到 **\[平台\]Engine.ini** 文件，逐个平台覆盖着色器符号控制台变量。

例如，如果你需要在Android平台上覆盖着色器符号控制台变量，则将以下文本添加到你的 **AndroidEngine.ini** ：

```cpp
	[ShaderCompiler_BuildMachine]
	控制台变量放在这里。

```

## UE4以来的更改

在虚幻引擎5中，用于调试着色器的控制台变量已更改。下表高亮显示了旧的UE4控制台变量和UE5中使用的新名称。将项目迁移到UE5时，你需要更新使用这些控制台变量的配置文件，以继续使用生成的数据和调试着色器。

旧名称

新名称

说明

`r.Shaders.KeepDebugInfo`

`r.Shaders.Symbols`

通过生成符号并将其写入主机的磁盘来启用着色器调试，PC符号仍以内联方式存储。

*参见备注*

`r.Shaders.ExtraData`

生成着色器名称和其他"额外"着色器数据。

`r.Shaders.PrepareExportedDebugInfo`

`r.Shaders.GenerateSymbol`

生成符号，但不将其写入磁盘（备注：符号存储在DDC中）

`r.Shaders.ExportDebugInfo`

`r.Shaders.WriteSymbols`

如果符号已生成，则将其写入磁盘。

`r.Shaders.AllowUniqueDebugInfo`

`r.Shaders.AllowUniqueSymbols`

基于着色器源生成符号关联（默认情况下关闭）。

`r.Shaders.ExportDebugInfo.Zip`

`.Shaders.WriteSymbols.Zip`

启用将所有符号写入磁盘作为单个 `.zip` 文件的操作。

只需要符号时，`r.Shaders.KeepDebugInfo` 分割为 `r.Shaders.Symbols` 和 `r.Shaders.ExtraData` ，以删除对运行时着色器数据的更改。这尤其适合支持导出的调试信息的平台，因为这样你可以为发布版本生成符号而不更改最终着色器数据。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [着色器调试工作流程](/documentation/zh-cn/unreal-engine/shader-debugging-workflows-unreal-engine#%E7%9D%80%E8%89%B2%E5%99%A8%E8%B0%83%E8%AF%95%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
-   [示例：使用特定于平台的着色器调试器](/documentation/zh-cn/unreal-engine/shader-debugging-workflows-unreal-engine#%E7%A4%BA%E4%BE%8B%EF%BC%9A%E4%BD%BF%E7%94%A8%E7%89%B9%E5%AE%9A%E4%BA%8E%E5%B9%B3%E5%8F%B0%E7%9A%84%E7%9D%80%E8%89%B2%E5%99%A8%E8%B0%83%E8%AF%95%E5%99%A8)
-   [示例：仅让构建机器将符号写入Zip文件](/documentation/zh-cn/unreal-engine/shader-debugging-workflows-unreal-engine#%E7%A4%BA%E4%BE%8B%EF%BC%9A%E4%BB%85%E8%AE%A9%E6%9E%84%E5%BB%BA%E6%9C%BA%E5%99%A8%E5%B0%86%E7%AC%A6%E5%8F%B7%E5%86%99%E5%85%A5zip%E6%96%87%E4%BB%B6)
-   [示例：在本地调试着色器](/documentation/zh-cn/unreal-engine/shader-debugging-workflows-unreal-engine#%E7%A4%BA%E4%BE%8B%EF%BC%9A%E5%9C%A8%E6%9C%AC%E5%9C%B0%E8%B0%83%E8%AF%95%E7%9D%80%E8%89%B2%E5%99%A8)
-   [控制台变量摘要](/documentation/zh-cn/unreal-engine/shader-debugging-workflows-unreal-engine#%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F%E6%91%98%E8%A6%81)
-   [平台覆盖](/documentation/zh-cn/unreal-engine/shader-debugging-workflows-unreal-engine#%E5%B9%B3%E5%8F%B0%E8%A6%86%E7%9B%96)
-   [UE4以来的更改](/documentation/zh-cn/unreal-engine/shader-debugging-workflows-unreal-engine#ue4%E4%BB%A5%E6%9D%A5%E7%9A%84%E6%9B%B4%E6%94%B9)
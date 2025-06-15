# 如何在虚幻引擎中使用BuildGraph | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-use-buildgraph-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:32:50.009Z

---

目录

![BuildGraph功能的使用](https://dev.epicgames.com/community/api/documentation/image/4d9b05d6-6654-4311-8af2-5e69bd2075f4?resizing_type=fill&width=1920&height=335)

**\*BuildGraph** 是一种在虚幻引擎中创建可扩展的构建进程中使用的 **虚幻自动工具（Unreal Automation Tool）** 脚本。这些进程可以在本地运行，也可以在构建场中同时运行。

## 使用命令行运行

作为一个虚幻自动工具脚本，你可以根据使用的平台，通过 `RunUAT` 批处理文件或shell脚本直接在 `Engine\Build\BatchFiles` 目录下使用命令行运行BuildGraph。

### Windows系统

```cpp
./RunUAT.bat BuildGraph [ARGUMENTS]
```

### Linux系统和Mac系统

```cpp
./RunUAT.sh BuildGraph [ARGUMENTS]
```

## 示例脚本

引擎源中包含了一些BuildGraph XML文件的示例供你使用。这些文件在 `Engine/Build/Graph/Examples` 目录中。这些示例文件包含以下内容：

-   `AllExamples.xml`: 这个脚本是 `Properties.xml`、 `TagsAndFiles.xml` 和 `Building.xml`三个脚本的组合。
-   `BuildEditorAndTools.xml`: 这个脚本展示了如何编译美术师使用引擎所需的工具和编辑器二进制文件，将它们复制到一个临时目录中进行分发，并选择将它们提交给Perforce。
-   `Building.xml`: 这个脚本可以编译UnrealPak。
-   `BuildWorldPartitionHLODs.xml`: 这个脚本构建了世界分区的HLOD。
-   `Macros.xml`: 这个脚本是一个定义和使用宏的示例。
-   `Properties.xml`: 这个脚本是一个使用各种不同BuildGraph功能的示例。
-   `TagsAndFiles.xml`: 这个脚本是一个对文件进行操作和交互的示例。

BuildGraph使用的XML模式文件名为 `Schema.xsd`，位于 `Engine/Build/Graph` 目录中。

## 示例命令

### 所有可用的节点和选项

你可以通过执行以下内容查看BuildGraph脚本中的所有可用节点和选项：

```cpp
./RunUAT.bat BuildGraph -Script=Engine/Build/Graph/Examples/AllExamples.xml -ListOnly
```

### 控制流程

你可以通过执行 `Properties.xml` BuildGraph脚本来了解控制流程是如何运作的：

```cpp
./RunUAT.bat BuildGraph -Script=Engine/Build/Graph/Examples/Properties.xml -Target="Property Examples" -Clean
```

这个脚本执行被评估为 "真（true）"的条件，并输出其相应的信息。它还展示了几个控制流程语句的行为，这些语句包含在[BuildGraph脚本剖析](/documentation/zh-cn/unreal-engine/buildgraph-script-anatomy-for-unreal-engine)当中。

### 在虚幻引擎中创建安装构建版本

你可以使用提供的 `InstalledEngineBuild.xml` BuildGraph脚本，用以下命令创建用于Windows系统的UE安装构建版本：

```cpp
./RunUAT.bat BuildGraph -Script=Engine/Build/InstalledEngineBuild.xml -Target="Make Installed Build Win64" -set:HostPlatformOnly=true -Clean
```

这将创建一个安装引擎构建版本，你可以在 `<UNREAL_ENGINE_ROOT>/LocalBuilds/InstalledDDC/Engine/Binaries/Win64`中找到它。

## 命令行参数

BuildGraph支持使用 `-help` 命令，在命令行中显示帮助文本。要使用命令行查看可用的 `BuildGraph` 参数，请运行：

```cpp
./RunUAT.bat BuildGraph -help
```

### 自定义命令行选项

BuildGraph支持向你的BuildGraph脚本传递自定义命令行选项。要在你的XML脚本中定义一个自定义的选项，可以使用：

```cpp
<Option Name="NAME" Restrict="REGEX" DefaultValue="DEF_VAL" Description="DESCRIPTION"/>
```

一个选项的组成部分如下：

-   `Name`：要从命令行引用的选项名称。
-   `Restrict`：用于限制可接受的值的一个正则表达式。
-   `DefaultValue`：表示如果没有提供任何选项时的默认值。
-   `Description`：对这个选项的描述，包括它可能的方式。

然后你可以通过命令行将该选项传递给你的脚本：

```cpp
-Set:<OPTION_NAME>=<OPTION_VALUE>
```

#### 示例

下面是一个在XML脚本中定义选项的示例：

```cpp
<Option Name="MyBooleanOption" Restrict="true|false" DefaultValue="false" Description="A boolean option for my BuildGraph script."/>
```

而以下是如何使用命令行向你的脚本传递这个选项：

```cpp
-Set:MyBooleanOption=true
```

### 参考

该表包含了从命令行运行BuildGraph时可使用的命令行参数列表：

```cpp
./RunUAT.bat BuildGraph [ARGUMENTS]
```

**参数**

**说明**

`-Script=<FILE_NAME>`

描述图形的脚本的路径。

`-Target=<NAME>`

要建立的节点或输出标签的名称。

`-Schema`

在默认位置生成一个模式文件。

`-Schema=<FILE_NAME>`

生成一个描述有效脚本文件的模式，包括所有已知的任务。

`-ImportSchema=<FILE_NAME>`

使用现有的模式文件中导入。

`-Set:<PROPERTY>=<VALUE>`

为指定的 `VALUE` 设置一个已命名的 `PROPERTY`。

`-Branch=<VALUE>`

覆盖当前分支的自动检测。

`-Clean`

在运行前清理所有已完成的构建节点的缓存状态。

`-CleanNode=<NAME>[+<NAME>...]`

在运行前清理指定的节点。

`-Resume`

使用最后一个成功完成的节点恢复本地构建。

`-ListOnly`

显示预处理图的内容，但不执行它。

`-ShowDiagnostics`

当以`-ListOnly`运行时，使在解析图表时显示输入的诊断信息。

`-ShowDeps`

在输出图表中显示节点的依赖性。

`-ShowNotifications`

显示在输出中为每个节点发送的通知。

`-Trigger=<NAME>`

只执行特点触发器后面的节点。

`-SkipTrigger=<NAME>[+<NAME>...]`

跳过指定的触发器，包括在图表中它们后面的所有节点。

`-SkipTriggers`

跳过所有触发器。

`-TokenSignature=<NAME>`

指定识别当前作业的签名，以写入需要签名的模式的令牌中。如果不指定此参数，则忽略令牌。

`-SkipTargetsWithoutTokens`

排除无法获得令牌的目标，而非让其报错。

`-Preprocess=<FILE_NAME>`

将预处理后的图表写入给定文件。

`-Export=<FILE_NAME>`

输出一个包含预处理的构建图表的JSON文件，作为构建系统的一部分使用。

`-Export=<FILE_NAME>`

输出一个包含完整构建图表的JSON文件，供Horde使用。

`-PublicTasksOnly`

在模式中只包括内置任务，不包括任何其他UAT模块。

`-SharedStorageDir=<DIR_NAME>`

设置用于在构建场的代理之间传输构建产品的目录。

`-SingleNode=<NAME>`

只运行指定的节点。适用于使用 `-Export` 运行后的构建系统。

`-WriteToSharedStorage`

允许写入共享存储。如果没有设置，但指定了 `-SharedStorageDir`，构建产品将被读取，但不被写入。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [buildgraph](https://dev.epicgames.com/community/search?query=buildgraph)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用命令行运行](/documentation/zh-cn/unreal-engine/how-to-use-buildgraph-for-unreal-engine#%E4%BD%BF%E7%94%A8%E5%91%BD%E4%BB%A4%E8%A1%8C%E8%BF%90%E8%A1%8C)
-   [Windows系统](/documentation/zh-cn/unreal-engine/how-to-use-buildgraph-for-unreal-engine#windows%E7%B3%BB%E7%BB%9F)
-   [Linux系统和Mac系统](/documentation/zh-cn/unreal-engine/how-to-use-buildgraph-for-unreal-engine#linux%E7%B3%BB%E7%BB%9F%E5%92%8Cmac%E7%B3%BB%E7%BB%9F)
-   [示例脚本](/documentation/zh-cn/unreal-engine/how-to-use-buildgraph-for-unreal-engine#%E7%A4%BA%E4%BE%8B%E8%84%9A%E6%9C%AC)
-   [示例命令](/documentation/zh-cn/unreal-engine/how-to-use-buildgraph-for-unreal-engine#%E7%A4%BA%E4%BE%8B%E5%91%BD%E4%BB%A4)
-   [所有可用的节点和选项](/documentation/zh-cn/unreal-engine/how-to-use-buildgraph-for-unreal-engine#%E6%89%80%E6%9C%89%E5%8F%AF%E7%94%A8%E7%9A%84%E8%8A%82%E7%82%B9%E5%92%8C%E9%80%89%E9%A1%B9)
-   [控制流程](/documentation/zh-cn/unreal-engine/how-to-use-buildgraph-for-unreal-engine#%E6%8E%A7%E5%88%B6%E6%B5%81%E7%A8%8B)
-   [在虚幻引擎中创建安装构建版本](/documentation/zh-cn/unreal-engine/how-to-use-buildgraph-for-unreal-engine#%E5%9C%A8%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%B8%AD%E5%88%9B%E5%BB%BA%E5%AE%89%E8%A3%85%E6%9E%84%E5%BB%BA%E7%89%88%E6%9C%AC)
-   [命令行参数](/documentation/zh-cn/unreal-engine/how-to-use-buildgraph-for-unreal-engine#%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%8F%82%E6%95%B0)
-   [自定义命令行选项](/documentation/zh-cn/unreal-engine/how-to-use-buildgraph-for-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%91%BD%E4%BB%A4%E8%A1%8C%E9%80%89%E9%A1%B9)
-   [示例](/documentation/zh-cn/unreal-engine/how-to-use-buildgraph-for-unreal-engine#%E7%A4%BA%E4%BE%8B)
-   [参考](/documentation/zh-cn/unreal-engine/how-to-use-buildgraph-for-unreal-engine#%E5%8F%82%E8%80%83)
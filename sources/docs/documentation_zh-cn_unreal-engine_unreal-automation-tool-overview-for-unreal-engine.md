# 虚幻引擎自动化工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-automation-tool-overview-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:32:13.760Z

---

目录

![自动化工具](https://dev.epicgames.com/community/api/documentation/image/3bab4997-31b1-45df-92df-4ba91d86d3e5?resizing_type=fill&width=1920&height=335)

**AutomationTool** 是一个主机程序和一组实用程序库，通过它可以使用C#来编制与 **虚幻引擎（UE）** 相关的无人值守过程脚本。我们在内部使用AutomationTool执行各种任务，包括构建、转化和运行游戏，运行自动化测试，和编制其他操作的脚本以在我们的Build Farm上运行。

AutomationTool的源代码以及在它下面运行的各种脚本都可以在 `Engine/Source/Programs/AutomationTool` 下找到。

虽然我们出于好意提供此工具，但我们所能提供的支持级别有限。

## AutomationTool的工作原理

### 自动化项目

AutomationTool运行时会查找所有自动化项目（以Visual Studio C#项目的形式保存，带有 `.Automation.csproj` 扩展名），编译它们，然后使用反射法找到要执行的相应命令。这些命令作为从 `BuildCommand` 基础类衍生的类实现，通过类名标识。

要了解更多信息，请阅读如何[添加自动化项目](/documentation/zh-cn/unreal-engine/create-an-automation-project-in-unreal-engine)和如何[添加命令](/documentation/404)。

### 运行AutomationTool

你可以在Windows上通过Visual Studio调试程序运行命令，也可以从Windows、Mac和Linux上的命令行运行命令。

#### 通过调试程序运行命令

要通过Visual Studio中的调试程序运行AutomationTool：

1.  右键点击AutomationTool项目，然后从情境菜单中选择 **属性（Properties）**。
    
2.  选择 **调试（Debug）** 选项卡，然后在 启动选项 > 命令行参数：**（Start Options > Command line arguments:）** 字段中输入命令名称（我们在这个示例中使用 `SampleCommand`）。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/831400f7-4cb0-4b97-a900-169d9eed3e96/automationtool_cmdlinearg.png)
    
3.  在脚本中设置断点，然后按F5键（或点击Visual Studio工具栏中的 **启动（Start）** 按钮）。
    

#### 从命令行运行命令（Windows）

要从命令行运行AutomationTool：

1.  打开一个命令提示符窗口。
    
2.  将工作目录改到 `Engine/Build/BatchFiles`。
    
3.  在命令行中输入下列内容：`RunUAT.bat SampleCommand`
    

#### 从终端运行命令（Mac/Linux）

要从终端运行AutomationTool：

1.  打开终端。
    
2.  将工作目录改到 `Engine/Build/BatchFiles`。
    
3.  在命令行中输入下列内容：`./RunUAT.sh SampleCommand`
    

### 命令行语法

AutomationTool命令行的一般语法：

`RunUAT.bat Command1 [-Arg1 -Arg2...]Command2 [-Arg3 -Arg4…] ...`

这里的两条命令将会依次运行。`-Arg1` 和 `-Arg2` 会传递到 `Command1`，而 `-Arg3` 和 `-Arg4` 传递到 `Command2`。

全局选项：

选项

说明

`-Help`

显示AutomationTool的一般帮助和选项，或（如果在命令名称之后指定此选项）显示特定命令的帮助。

`-List`

显示所有可用AutomationTool命令的清单。

`-P4`

启用Perforce支持。

`-Submit`

允许自动化进程提交文件。

`-NoCompile`

禁止AutomationTool在启动时编译任何 `.Automation.csproj` 文件。

如果设置此选项，可使用下列环境变量来配置对于构建机器的Perforce支持。它们可以通过AutomationTool命令行按 `VARNAME=VALUE` 语法设置，也可以从当前会话继承。

环境变量

说明

`uebp_PORT`

Perforce服务器和端口（例如 `perforce:1666`）。

`uebp_CLIENT_ROOT`

到当前客户端的本地根目录的路径（例如 `D:\P4`）。

`uebp_CL`

同步到的当前变更列表。

`uebp_CodeCL`

同步到的当前代码变更列表。它可以在 `uebpCL` 指定的当前变更列表之前。

`uebp_USER`

Perforce用户。

`uebp_CLIENT`

用于访问Perforce的客户端的名称。

`uebp_BuildRoot_P4`

到当前分支或流送的根的路径（例如 `//UE4/Release-4.22`）。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [automationtool](https://dev.epicgames.com/community/search?query=automationtool)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [AutomationTool的工作原理](/documentation/zh-cn/unreal-engine/unreal-automation-tool-overview-for-unreal-engine#automationtool%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86)
-   [自动化项目](/documentation/zh-cn/unreal-engine/unreal-automation-tool-overview-for-unreal-engine#%E8%87%AA%E5%8A%A8%E5%8C%96%E9%A1%B9%E7%9B%AE)
-   [运行AutomationTool](/documentation/zh-cn/unreal-engine/unreal-automation-tool-overview-for-unreal-engine#%E8%BF%90%E8%A1%8Cautomationtool)
-   [通过调试程序运行命令](/documentation/zh-cn/unreal-engine/unreal-automation-tool-overview-for-unreal-engine#%E9%80%9A%E8%BF%87%E8%B0%83%E8%AF%95%E7%A8%8B%E5%BA%8F%E8%BF%90%E8%A1%8C%E5%91%BD%E4%BB%A4)
-   [从命令行运行命令（Windows）](/documentation/zh-cn/unreal-engine/unreal-automation-tool-overview-for-unreal-engine#%E4%BB%8E%E5%91%BD%E4%BB%A4%E8%A1%8C%E8%BF%90%E8%A1%8C%E5%91%BD%E4%BB%A4%EF%BC%88windows%EF%BC%89)
-   [从终端运行命令（Mac/Linux）](/documentation/zh-cn/unreal-engine/unreal-automation-tool-overview-for-unreal-engine#%E4%BB%8E%E7%BB%88%E7%AB%AF%E8%BF%90%E8%A1%8C%E5%91%BD%E4%BB%A4%EF%BC%88mac/linux%EF%BC%89)
-   [命令行语法](/documentation/zh-cn/unreal-engine/unreal-automation-tool-overview-for-unreal-engine#%E5%91%BD%E4%BB%A4%E8%A1%8C%E8%AF%AD%E6%B3%95)
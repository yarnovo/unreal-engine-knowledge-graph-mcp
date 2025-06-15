# 虚幻引擎的Linux开发快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/linux-development-quickstart-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:47:38.750Z

---

目录

![Linux开发快速入门](https://dev.epicgames.com/community/api/documentation/image/f2d8e896-73f9-400c-8da9-0863c1e8021c?resizing_type=fill&width=1920&height=335)

虚幻引擎（UE）支持使用从源代码创建的构建或预编译的**已安装构建**在Linux设备上开发。 本页面介绍了如何在Linux上设置虚幻引擎，包括你的开发环境和构建管线。 完成本教程之后，你即可开始使用Linux机器在虚幻引擎中开发应用程序。

## 1\. 推荐软件和硬件

虚幻引擎与各种Linux发行版和IDE兼容，只要它们满足以下最低要求即可：

运行引擎

 

**操作系统**

Rocky Linux 8 / Redhat Linux 8或更高版本

**Linux Kernel版本**

内核4.18或更高版本

**其他依赖项**

glibc 2.28或更高版本

如果虚幻编辑器或虚幻引擎游戏的安装程序启动时间过长，请检查你的`glibc`是否为2.35或更高版本，因为其早期版本对于`dlopen`的实现较慢。

我们建议你使用满足以下标准的系统，以便**虚幻编辑器**流畅执行：

**Recommended Operating System**

Ubuntu 22.04

**Processor**

Quad-core Intel or AMD, 2.5 GHz or faster

**Memory**

32 GB RAM

**Graphics Card**

GeForce 2080

**Graphics RAM**

8 GB or more

**RHI Version**

Vulkan: AMD (RADV minimum 24.2.8+, recommended 25.0.0+) and NVIDIA (570+)

相较于其他后端，Linux上使用的Vulkan渲染硬件接口（RHI）对于较低数量的VRAM不太友好。 我们强烈建议你使用带有较高数量VRAM的专用GPU。

要设置开发环境，我们推荐以下软件，因为我们对这些软件进行了极其频繁的测试：

使用引擎开发

 

**操作系统**

Ubuntu 22.04、Rocky Linux 8

**编译器**

clang 18.1.0

可选

**IDE**

Visual Studio Code、Rider

请参阅你的Linux发行版或IDE的文档，了解有关如何进行设置的更多信息。 虽然设置操作系统和硬件超出了本文档讨论的范围，但下面介绍了如何设置IDE以与虚幻引擎配合工作。

## 2\. 安装虚幻引擎

在Linux上设置虚幻引擎时，你可以选择安装预编译的版本，或者从源代码构建引擎。

### 2a. 下载已安装版本

要运行虚幻引擎，最简单的办法是使用已安装版本。 要下载并安装一个版本，请执行以下步骤：

Linux上的虚幻引擎支持预编译的安装版本以及源代码版本。 如需了解如何使用源代码版本，请参阅[从源代码编译虚幻引擎](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine)。

要使用预编译的版本，请执行以下步骤：

1.  打开[Linux版虚幻引擎](https://www.unrealengine.com/en-US/linux)页面。 系统将提示你创建或登录Epic Games账号。 若已有账号，请登录以访问该页面。 若没有账号，请点击**注册（Sign Up）**创建账号。
    
    [![登录或注册](https://dev.epicgames.com/community/api/documentation/image/f84d2d7c-1de7-438a-a558-78f06c8de89c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f84d2d7c-1de7-438a-a558-78f06c8de89c?resizing_type=fit)
    
    你可以使用电子邮箱注册Epic Games账号，也可以使用支持的社交媒体或游戏平台账号注册。
    
    [![选择如何登录](https://dev.epicgames.com/community/api/documentation/image/6143aba6-e441-481e-9f90-c5d8cf276dde?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6143aba6-e441-481e-9f90-c5d8cf276dde?resizing_type=fit)
    
2.  下载`.zip`文件，获取所需的虚幻引擎版本。
    
    [![下载虚幻引擎](https://dev.epicgames.com/community/api/documentation/image/2fcfd6f4-1d9b-4540-8747-807fea58b570?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/2fcfd6f4-1d9b-4540-8747-807fea58b570?resizing_type=fit)
    
3.  将`.zip`文件的内容解压到指定目录。
    
4.  在终端上运行`Engine/Binaries/Linux/UnrealEditor`，启动虚幻引擎。
    

### 2b. 从源代码构建虚幻引擎

要从源代码安装虚幻引擎，请参阅[下载虚幻引擎源代码](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine)。 编译引擎之后，从终端运行`Engine/Binaries/Linux/UnrealEditor`以启动虚幻编辑器。

## 3\. 设置新项目

请参阅[在虚幻引擎中创建新项目](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-a-new-project-in-unreal-engine)中的说明，了解如何设置新项目。 就本教程而言，你不需要特定模板或项目类型，但如果你要针对C++设置环境，则务必要启用**C++**。

## 4\. 设置开发环境（C++）

如果你计划开发C++项目，你需要设置Clang工具链和IDE，以便与虚幻引擎配合工作。 虽然我们不要求使用特定IDE，但我们推荐使用Visual Studio Code或Rider。 本小节提供了特定于Visual Studio Code的说明，因为它还为其他操作系统提供了通用开发环境。

1.  为你的设置安装自定义Clang工具链。 如需更多信息，请参阅[Linux开发要求](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/linux-development-requirements-for-unreal-engine?application_version=5.5)。
    
2.  找到你的虚幻引擎安装目录，打开`Build/BatchFiles/Linux`，然后运行`SetupToolchain.sh`。
    
3.  下载并安装VS Code，以及官方C/C++ 扩展包和C#扩展。 这些是读取虚幻引擎及其构建工具源代码的必要操作。
    
4.  打开虚幻编辑器，打开**编辑器偏好设置（Editor Preferences）**，将你的源代码编辑器设置为Visual Studio Code，或修改`BaseEngine.ini`以包含以下内容：
    
    `   [/Script/SourceCodeAccess.SourceCodeAccessSettings]           PreferredAccessor=VisualStudioCode         `
    
    \[/Script/SourceCodeAccess.SourceCodeAccessSettings\] PreferredAccessor=VisualStudioCode
    
    复制完整片段(2行长度)
    
5.  运行`GenerateProjectFiles.sh -vscode`，为你的引擎发行版（若选择源代码构建）或你的项目生成VS Code工作空间。 添加`-project=(path to your project)`以选择特定项目。
    

有关使用智能感知（IntelliSense）和其他有用工具配置VS Code的信息，请参阅[为虚幻引擎设置VS Code](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-visual-studio-code-for-unreal-engine)。

## 5\. 构建项目

现在你的环境已设置完毕，你应该运行项目的测试版本，确保工作流程可以全部正常运行。

### 5a. 在虚幻编辑器中构建项目

在虚幻编辑器中打开你的项目，然后点击**平台**下拉菜单并点击**Linux** \> **打包项目（Package Project）**。 如果你的系统已正确配置，虚幻引擎将构建、烘焙和打包你的项目。

### 5b. 通过命令行构建项目

要通过命令行编译项目，请使用RunUAT脚本的**BuildCookRun**命令，详见[构建操作](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/build-operations-cooking-packaging-deploying-and-running-projects-in-unreal-engine)指南。 下面是正常运行的BuildCookRun命令示例：

`[UE Root Directory]/RunUAT BuildCookRun -Build -Cook -Stage -Package -Run -Project=[ProjectName]`

\[UE Root Directory\]/RunUAT BuildCookRun -Build -Cook -Stage -Package -Run -Project=\[ProjectName\]

复制完整片段(1行长度)

你也可以使用Turnkey命令行启动相同进程。

`[UE Root Directory]/RunUAT Turnkey -command=ExecuteBuild -platform=Linux -Project=[ProjectName]`

\[UE Root Directory\]/RunUAT Turnkey -command=ExecuteBuild -platform=Linux -Project=\[ProjectName\]

复制完整片段(1行长度)

正常情况下，你需要从虚幻引擎源目录使用RunUAT。 要使此命令运行起来更简单，请定义`$UE_ROOT`环境变量。 这样就可以通过`$UE_ROOT/RunUAT BuildCookRun`之类的命令使用RunUAT，而不是将整个路径提供给RunUAT脚本。

-   [setup](https://dev.epicgames.com/community/search?query=setup)
-   [linux](https://dev.epicgames.com/community/search?query=linux)
-   [桌面](https://dev.epicgames.com/community/search?query=%E6%A1%8C%E9%9D%A2)
-   [平台交付](https://dev.epicgames.com/community/search?query=%E5%B9%B3%E5%8F%B0%E4%BA%A4%E4%BB%98)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1\. 推荐软件和硬件](/documentation/zh-cn/unreal-engine/linux-development-quickstart-for-unreal-engine#1-recommended-software-and-hardware)
-   [2\. 安装虚幻引擎](/documentation/zh-cn/unreal-engine/linux-development-quickstart-for-unreal-engine#2-install-unreal-engine)
-   [2a. 下载已安装版本](/documentation/zh-cn/unreal-engine/linux-development-quickstart-for-unreal-engine#2a-download-an-installed-build)
-   [2b. 从源代码构建虚幻引擎](/documentation/zh-cn/unreal-engine/linux-development-quickstart-for-unreal-engine#2b-build-unreal-engine-from-source)
-   [3\. 设置新项目](/documentation/zh-cn/unreal-engine/linux-development-quickstart-for-unreal-engine#3-setting-up-a-new-project)
-   [4\. 设置开发环境（C++）](/documentation/zh-cn/unreal-engine/linux-development-quickstart-for-unreal-engine#4-set-up-your-development-environment-c)
-   [5\. 构建项目](/documentation/zh-cn/unreal-engine/linux-development-quickstart-for-unreal-engine#5-build-a-project)
-   [5a. 在虚幻编辑器中构建项目](/documentation/zh-cn/unreal-engine/linux-development-quickstart-for-unreal-engine#5a-build-a-project-in-unreal-editor)
-   [5b. 通过命令行构建项目](/documentation/zh-cn/unreal-engine/linux-development-quickstart-for-unreal-engine#5b-build-a-project-through-the-command-line)
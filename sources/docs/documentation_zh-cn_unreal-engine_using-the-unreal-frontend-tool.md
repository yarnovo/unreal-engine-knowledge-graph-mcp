# 使用虚幻前端工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-unreal-frontend-tool
> 
> 生成时间: 2025-06-14T20:42:00.373Z

---

目录

![Unreal Frontend](https://dev.epicgames.com/community/api/documentation/image/f1654cc4-7b55-4b35-adb7-fbed1cf67118?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f7696ec-0ebb-4dcd-abd4-41dd3a2569a3/unrealfrontend.png)

**虚幻前端（UnrealFrontend）** (UFE) 是一个用来简化和加快游戏日常开发及测试任务的工具，它可以用来准备游戏的构建，将游戏部署到设备上，以及启动游戏。UFE旨在成为所有游戏开发、分析和测试任务的核心界面。

## 功能

虚幻前端工具（Unreal Frontend Tool，简称UFE）具有下列功能：

功能

描述

**启动器**

编译、烘焙、部署和启动你的游戏UFE允许你通过本地连接或网络上的任意点同时部署到运行不同目标平台的多个目标设备。你可以为每个设备启动多个实例（在支持平台上）和为每个实例配置不同的角色，以便大幅加快单人或多人跨平台游戏的测试工作流。

**会话**

对当前在网络上运行的活跃游戏会话进行远程监控和互动。利用新的 **会话浏览器** 可找到当前在网络上运行的游戏实例。会话控制台将显示每个游戏实例输出日志的实时反馈，利用其可在一台或多台目标设备上远程执行控制台命令。我们很快就会推出远程分享活跃会话的功能，届时将可以和其他开发者或美术师进行分享，无需当面交流意见。

**自动化**

自动测试代码和内容并验证其完整性。这是一项新功能，在旧版引擎中不可用。可编写游戏自定义C++类和内容的单位/功能/压力测试，还可创建验证常用工作流的自动测试，例如：验证正在正确加载所有地图和程序包。我们正将自动测试集成到编译系统，以便在持续集成过程中，自动运行测试并检测潜在问题。

**分析**

远程分析游戏性能并找出瓶颈。对于熟悉UE3中的旧版分析工具的用户，好消息是我们正将不同的此类工具集成到UFE的单用户体验中。

**设备管理**

管理开发工具包、移动设备和其他测试电脑。旧版UFE已提供简单的设备查找功能，在UE4中该功能将更加强大。目标设备必须通过物理方式或设备SDK连接到本地电脑的限制现已移除。使用者能够检测本地连接和网络连接设备，并将其与他人共享。Windows电脑和Mac电脑现在也可以用作目标设备进行部署、启动和自动化。

## 入门指南

虚幻前端可作为虚幻编辑器的选项卡或standalone应用程序进行使用。它们的功能相同，但对测试人员和程序员而言，轻量的standalone应用程序更加适用。美术师更青睐编辑器内置选项卡，因为他们的主要工作区便是虚幻编辑器。可以在 **窗口** 菜单访问虚幻编辑器选项卡：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24dfe368-fece-465b-a147-7e1a0a2ae11a/workspace_menu.png)

standalone应用程序位于/Engine/Binaries/Win64 and /Engine/Binaries/Mac目录下：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c72c7317-896c-4d72-ae21-53cfeac72c0f/explorer.png)

请注意，如正在使用引擎的源版本，须先从Visual Studio或XCode编译虚幻前端。

### 界面

虚幻前端用户界面包括下列组件：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00c7310c-d354-42b9-8404-290270096b20/unrealfrontend_ui.png)

1.  [设备浏览器](/documentation/zh-cn/unreal-engine/using-the-unreal-frontend-tool#%E8%AE%BE%E5%A4%87%E6%B5%8F%E8%A7%88%E5%99%A8)
2.  [启动器](/documentation/zh-cn/unreal-engine/using-the-unreal-frontend-tool#%E5%90%AF%E5%8A%A8%E5%99%A8)
3.  [会话浏览器](/documentation/zh-cn/unreal-engine/using-the-unreal-frontend-tool#%E4%BC%9A%E8%AF%9D%E6%B5%8F%E8%A7%88%E5%99%A8)
4.  [自动化](/documentation/zh-cn/unreal-engine/using-the-unreal-frontend-tool#%E8%87%AA%E5%8A%A8%E5%8C%96)
5.  [会话控制台](/documentation/zh-cn/unreal-engine/using-the-unreal-frontend-tool#%E4%BC%9A%E8%AF%9D%E6%8E%A7%E5%88%B6%E5%8F%B0)

## 启动器

利用启动器选项卡可以编译、烘焙、部署及启动游戏。最终将有多种完成方式，但在本文写成为止，仅支持下列设置：

-   编译：新建编译。
-   烘焙：即时烘焙（Windows或选择的主机平台）。
-   部署：文件服务器（本地Windows或主机平台），部署到设备（本地Windows）。
-   启动：使用默认任务（即每个设备的单个实例与全部使用相同设置）。

启动器上的所有设置都会组合到描述文件中，这样便能并行维持不同的设置分组，对每天要进行大量不同测试的测试人员而言，尤为实用。初次打开启动器时不会显示描述文件，需要进行新建：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5445b5a9-cb61-4e57-baff-c903e14c9339/profile_add.png)

创建描述文件后，将显示一些设置类型：

### 编译

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/daecef81-9405-456b-8b6c-bb15fe5de58c/launcher_build.png)

-   **游戏**：指定要编译的游戏项目。
-   **编译配置**：设置构建游戏时要使用的配置。

### 烘焙

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c67f3e0-a3f3-46cf-a0ab-f64d9787dc98/launcher_cook.png)

-   **烘焙平台**：指定游戏内容烘焙针对的平台。
    
    muqian 任何平台均不支持未烘焙的内容。
    
-   **烘焙语言**：指定游戏内容烘焙针对的语言。
-   **烘焙地图**：指定要烘焙的地图。
-   **仅烘焙修改后内容**：启用后，烘焙器将忽略所有未修改的内容。
-   **保存无版次的包**
-   **烘焙器编译配置**：设置配置以确定用于烘焙的二进制。
-   **额外烘焙器选项**

## 设备浏览器

**设备浏览器** 目前的功能非常有限，但最终可利用其管理和共享网络上所有目标设备（包括转移日志文件）。其将自动检测本地可用的设备，还提供一个界面，以便手动添加无法找到的设备。

目前对于设备所有权没有定论。我们将其实现到何种程度（包括在多个开发者间共享的设备锁）仍有待商榷。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/475870bf-b706-4c63-9788-3c67fb19f6fb/device_browser.png)

目前我们仅支持在本地能够发现的设备。截至撰写本文时，此类设备包括本地Windows电脑（Win32和Win64系统）和网络上选中的主机设备。

### 会话浏览器

在一台或多台设备上启动游戏时，启动器将新建会话，其由正在运行的所有游戏实例组成，可在 **会话浏览器** 中对此类实例进行追踪。其在UFE中起核心作用，因为当前所选的会话（或会话实例）将决定其他UFE选项卡的功能，比如"会话控制台"选项卡、"自动化"选项卡和即将到来的分析器（Profiler）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/278c50f6-4659-4bdf-aa55-1ca7e3484fce/session_browser.png)

像设备浏览器一样，会话浏览器的功能仍然有限。其目前由一个分割列表布局组成。顶端列表显示所有被发现的会话，底部列表显示作为所选会话一部分的游戏实例。会话不一定需要只由游戏组成，还可能包括辅助工具，比如内容烘焙器和文件服务器。

从虚幻编辑器中运行UFE时，当前会固定显示一个 *未命名会话*（其代表虚幻编辑器实例本身）。

### 会话控制台

**会话控制台** 是一个中心，收集来自会话浏览器当前选中的所有游戏实例的输出日志。显示的日志取决于当前在会话浏览器中选中的实例。随后可用搜索字符串或类型和冗余过滤器（4b）过滤日志消息列表（4a）。也可以向选中的游戏实例（4c）发送控制台命令。发送到多个实例的命令将由每个实例执行。最后，可将所有或选中的日志消息导出到一个文件（4d）中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78cd475c-6585-491c-a7bf-e46aa7b569c5/console.png)

截至撰写本文时，只有发现会话后的日志可用。我们很快将对此功能进行更改，以便用户获取运行UFE之前生成的日志。

## 自动化

通过 **自动化** 面板可防卫自动测试功能。会话中的每个实例（包括在编辑器内运行UFE时的本地虚幻编辑器实例）都能够在给定时间处执行代码和内容验证的，自动化单元/功能/压力测试。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0cb4f16-58a2-420e-b646-ce263ac8dc97/automation.png)

1.  **控制面板**
2.  **过滤面板**
3.  **测试列表**
4.  **结果**

在会话浏览器中选择一个或多个实例后，测试列表将显示这些实例可用的所有测试。选择一个或多个测试的复选框，即可选择实际要运行哪些测试，也可以使用过滤器面板对测试列表进行过滤。要执行所选测试，按下 **控制面板** 上的开始按钮即可。测试结果（包括错误消息）将在 **结果视图** 汇总。

可以在多个实例上并行运行自动化测试（选择多个实例）。我们目前正努力实现测试组，其将实现不同级别的并行化（多种加载平衡、冗余测试等）。请查阅自动化系统文档，了解关于新建测试的详细方法。

## 虚幻远程代理

**虚幻远程代理**（URA）是一个standalone程序，可在远程电脑（之后将支持Mac系统）的系统托盘中运行，使电脑和主机设备能够通过网络与其连接。旧版URA要求部署和启动游戏，目前已不受支持，并处于升级中。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [功能](/documentation/zh-cn/unreal-engine/using-the-unreal-frontend-tool#%E5%8A%9F%E8%83%BD)
-   [入门指南](/documentation/zh-cn/unreal-engine/using-the-unreal-frontend-tool#%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)
-   [界面](/documentation/zh-cn/unreal-engine/using-the-unreal-frontend-tool#%E7%95%8C%E9%9D%A2)
-   [启动器](/documentation/zh-cn/unreal-engine/using-the-unreal-frontend-tool#%E5%90%AF%E5%8A%A8%E5%99%A8)
-   [编译](/documentation/zh-cn/unreal-engine/using-the-unreal-frontend-tool#%E7%BC%96%E8%AF%91)
-   [烘焙](/documentation/zh-cn/unreal-engine/using-the-unreal-frontend-tool#%E7%83%98%E7%84%99)
-   [设备浏览器](/documentation/zh-cn/unreal-engine/using-the-unreal-frontend-tool#%E8%AE%BE%E5%A4%87%E6%B5%8F%E8%A7%88%E5%99%A8)
-   [会话浏览器](/documentation/zh-cn/unreal-engine/using-the-unreal-frontend-tool#%E4%BC%9A%E8%AF%9D%E6%B5%8F%E8%A7%88%E5%99%A8)
-   [会话控制台](/documentation/zh-cn/unreal-engine/using-the-unreal-frontend-tool#%E4%BC%9A%E8%AF%9D%E6%8E%A7%E5%88%B6%E5%8F%B0)
-   [自动化](/documentation/zh-cn/unreal-engine/using-the-unreal-frontend-tool#%E8%87%AA%E5%8A%A8%E5%8C%96)
-   [虚幻远程代理](/documentation/zh-cn/unreal-engine/using-the-unreal-frontend-tool#%E8%99%9A%E5%B9%BB%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%90%86)
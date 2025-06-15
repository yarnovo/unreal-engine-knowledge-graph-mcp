# 虚幻引擎UGS菜单参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-game-sync-menu-reference-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:33:53.820Z

---

目录

![UGS菜单参考](https://dev.epicgames.com/community/api/documentation/image/3d64158f-8091-4b00-b21d-ff39fd17024d?resizing_type=fill&width=1920&height=335)

此页面提供了 **UnrealGameSync（UGS）** 中可用的菜单和选项的参考。

![Unreal Game Sync主界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9d37982-403a-4501-a5f5-78b24bddb867/ugs-menu-main.png)

## 项目概述

提供了有关以下内容的信息：

-   打开的流送。
-   `.uproject`/`.uprojectdirs` 文件的本地路径。
-   最新同步状态。

选项

说明

**设置（Settings）**

更改用于打开项目的文件。

**立即同步（Sync Now）**

使用 **到…（To…）** 设置同步项目：

-   **最新更改（Latest Chang）**：同步到绝对最新更改，可能不稳定。
-   **最新良好更改（Latest Good Change）**：同步到组织中另一成员使用的最新更改（需要元数据服务器）。
-   **最新星标更改（Latest Starred Change）**：同步到某人使用 **变更列表（Changelist）** 区域中的 **添加星标（Add Star）** 上下文菜单选项标记的最新变更。

**虚幻编辑器（Unreal Editor）**

在编辑器中运行项目。 利用可用的 **预编译二进制文件(PCB)编辑器**。

**SDK Info**

查看流送中的SDK可用性。

**Perforce**

在 **Helix Visual Client (P4V)** 中打开流送。

**Visual Studio**

在 **Visual Studio** 中打开项目。

**Windows Explorer**

在 **Windows Explorer** 中打开项目。

**更多（More） -> 清理工作空间（Clean Workspace）**

清理 **Perforce** 工作空间

**显示日志（Show Log）**

显示 **日志（Log）** 分段中最新同步的日志。 同步操作失败或取消时可用。

## 变更列表

同步到特定变更列表，并查看关于每个变更列表的信息。

选项

说明

**类型（Type）**

代码更改、内容更改或者两种同时更改。

**变更（Change）**

Perforce中的变更列表号。

**时间（Time）**

识别何时提交了更改。

**作者（Author）**

识别是谁提交了更改。

**说明（Description）**

作者编写的变更列表的说明。

**CIS**

此更改后 **持续集成系统（CIS）** 的合并状态。需要元数据服务器。

**状态（Status）**

识别当前谁在使用变更列表的构建，以及他们的相关状态。需要元数据服务器。

### 右键点击上下文菜单

每个变更列表的选项不同，其中一些从项目概述区域复制。

![变更列表右键点击上下文菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8bef979c-74a1-4cc7-b3d2-09a1df6af89a/ugs-changelist-context-menu.png)

选项

说明

当前同步的变更列表

 

**启动编辑器（Launch Editor）**

如果之前已为给定变更列表构建编辑器，则可用

**构建（Build）**

构建变更列表。

**重建（Rebuild）**

重建变更列表。

**生成项目文件（Generate project files）**

生成项目文件。

**在Visual Studio中打开（Open in Visual Studio）**

在 **Visual Studio** 中打开变更列表。

一般选项

 

**同步（Sync）**

使用Perforce同步。

**同步（仅此变更）（Sync（Just this Change））**

不选取当前已同步变更列表和选定变更列表之间的变更。

**标记为合格（Mark as good）**

其他用户可见。需要元数据服务器。

**标记为不合格（Mark as bad）**

其他用户可见。需要元数据服务器。

**撤销审核（Withdraw review）**

取消 **标记为合格** 或 **标记为不合格**。需要元数据服务器。

**发表评论（Leave comment）**

发表其他UGS用户可见的评论。需要元数据服务器。

**开始调查（Start investigating）**

将变更列表标记为不合格，以及之后的所有其他变更列表，并展开调查。需要元数据服务器。

**添加星标（Add Star）**

将其他人可见的星标添加到构建，表示这是一个特殊构建或已审批构建。 需要元数据服务器。

**复制变更列表（Copy Changelist）**

将变更列表号复制到剪贴板。

**更多信息…（More Info…）**

在P4V中打开变更列表。

## 日志（Log）

当前同步操作的日志，包括Perforce操作和构建操作。 右键点击上下文菜单允许从日志中选择和复制。

## 筛选器菜单

![虚幻游戏同步筛选器菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75de91de-de0b-4ec5-9023-cc366bbe7dc3/ugs-filter.png)

选项

说明

**类型（Type）**

在代码和内容变更列表之间切换或两种类型同时显示（默认）。

**徽章（Badges）**

基于CIS徽章筛选。

**显示构建机器变更（Show Build Machine Changes）**

显示构建机器变更列表以及用户变更列表（默认关闭）。

## 同步后选项

![虚幻游戏同步同步后选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b0d9191-2273-440d-a334-3e8cd1b1d6de/ugs-after-sync.png)

选项

说明

**构建（Build）**

使用 **Unreal Build Tool (UBT)** 在从 **选项（Options）** 菜单中选择的 **编辑器编译配置（Editor Build Configuration）** 中自动编译项目。 默认为 **调试**。

**运行（Run）**

成功编译时自动运行编译步骤的输出。

**打开解决方案（Open Solution）**

生成项目文件后，在Visual Studio中自动打开解决方案。

## 选项菜单

![虚幻游戏同步选项菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ad8e629-bad7-4ef4-a66b-2c2134cd02ec/ugs-options.png)

选项

说明

**应用设置（Application Settings）**

请参阅[应用设置](/documentation/zh-cn/unreal-engine/unreal-game-sync-menu-reference-for-unreal-engine#%E5%BA%94%E7%94%A8%E8%AE%BE%E7%BD%AE)表。

**已计划同步（Scheduled Sync）**

设置要同步和编译哪些项目，变更列表类型是什么，以及何时进行：

![虚幻游戏同步已计划同步设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e27a5fc-3afe-404b-a04e-a4e98942aa9d/ugs-sched-sync.png)

这还可以用于关闭已计划同步。

**同步预编译二进制文件（Sync Precompiled Binaries）**

如果可用，自动同步PCB。

**自动解决冲突（Auto-Resolve Conflicts）**

自动解决Perforce冲突。

**同步筛选器…（Sync Filter…）**

打开同步筛选器选项对话框。 有关此对话框及其用法的更多信息，请参阅[UGS同步筛选器设置](/documentation/zh-cn/unreal-engine/unreal-game-sync-filters-for-unreal-engine)文档。

**编辑器编译配置（Editor Build Configuration）**

在 **调试**、**调试游戏** 或 **开发** 之间进行选择。

**自定义编译步骤…（Customize Build Steps…）**

请参阅[自定义编译步骤](/documentation/zh-cn/unreal-engine/unreal-game-sync-menu-reference-for-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BC%96%E8%AF%91%E6%AD%A5%E9%AA%A4)表

**编辑器命令行参数…（Editor Command Line Arguments…）**

![虚幻游戏同步命令行参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/136e6e34-a4ce-44b7-9d56-0dabb95b9164/ugs-command-args.png)

**命令行参数** 窗口允许编辑、添加和移除命令行参数，以及更改传递参数的顺序。 如果你发现自己在反复编辑命令行参数，可以在每次启动时强制弹出此对话框。

**选项卡名称（Tab Names）**

在 **流送**、**工作空间名称**、**工作空间根** 或 **项目文件** 之间进行选择。

**显示更改（Show Changes）**

在显示无审核更改与通过自动化流程显示更改之间独立切换。

**时区（Time Zone）**

选择 **本地** 或 **Perforce 服务器** 时间。

**诊断…（Diagnostics…）**

![虚幻游戏同步诊断窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48b373a0-2aa0-4c0c-a595-8e153301d59d/ugs-diagnostics.png)

打开UGS的 **诊断（Diagnostics）** 窗口。 点击此对话框中的 **查看日志（View logs）** 会将你转到UGS写入日志的位置。 这对于诊断UGS相关问题非常有用。

### 应用设置（Application Settings）

![虚幻游戏同步应用设置窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10851b75-cda7-40a8-a7c8-fde038cecdad/ugs-application-settings.png)

设置

说明

**启动和关闭（Startup and Shutdown）**

将应用配置为在启动时运行并在最小化时继续运行。

**默认Perforce设置（Default Perforce Settings）**

UGS将用于登录Perforce的凭证。

**更新（Updates）**

程序将在Perforce中查找以更新自身，以及查询是否可以使用应用的不稳定（测试）版本。

**集成（Integration）**

UGS与其他应用和工具集成的机制。

**自定义工具（Custom Tools）**

与UGS结合使用的工具。

**高级（Advanced）**

![虚幻游戏同步高级应用设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a7f01d0-b38f-4579-9b3a-a0a01b7fac43/ugs-advanced-app-settings.png)

选项

说明

**超时重试（Retries on timeout）**

超时后重试的次数。

**TCP缓冲区大小（TCP Buffer Size）**

TCP缓冲区的大小（以字节为单位）。

### 自定义编译步骤

**自定义编译步骤** 窗口允许你修改和添加新的编译步骤。

![虚幻游戏同步自定义编译步骤窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1b9b4ea-9c8f-462a-8e43-3897dd03315c/ugs-custom-build-steps.png)

选项

说明

*正常同步（Normal Sync）*

每次用户同步时运行步骤。

*已计划同步（Scheduled Sync）*

作为已计划（自动）同步的一部分运行步骤。

**显示为工具（Show as Tool）**

该步骤将作为用户可运行的工具显示在 **项目概述（Project Overview）** 的 **更多…（More…）** 选项中。

**新建步骤…（New Step…）**

请参阅[新建步骤](/documentation/zh-cn/unreal-engine/unreal-game-sync-menu-reference-for-unreal-engine#%E6%96%B0%E5%BB%BA%E6%AD%A5%E9%AA%A4)表。

#### 新建步骤

**新建步骤** 窗口显示了定义和执行新编译步骤任务所需的所有字段。

![虚幻游戏同步新建步骤窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b645ff9-de8c-4819-9c85-992289993db0/ugs-edit-build-step.png)

字段 / 选项

说明

**说明（Description）**

步骤的名称或简短说明。

**状态文本（Status Text）**

运行任务时显示的状态文本。

**近似时长（Approximate Duration）**

运行步骤将耗用的时间。

**编译（Compile）**

使用UBT和UBT的选定配置、平台和附加命令行参数构建目标。

**烘焙（Cook）**

给定指定配置文件，通过 **BuildCookRun** 烘焙。

**其他（Other）**

使用给定的命令行参数集从给定的工作目录运行泛型可执行文件。 你也可以使用日志窗口显示程序的输出。

**变量**

![虚幻游戏同步变量窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4949ab04-e2d0-4ada-a6f1-d13a856f9d34/ugs-variables.png)

**变量（Variables）** 窗口将打开任务的环境变量并允许编辑。

-   [unreal game sync](https://dev.epicgames.com/community/search?query=unreal%20game%20sync)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [项目概述](/documentation/zh-cn/unreal-engine/unreal-game-sync-menu-reference-for-unreal-engine#%E9%A1%B9%E7%9B%AE%E6%A6%82%E8%BF%B0)
-   [变更列表](/documentation/zh-cn/unreal-engine/unreal-game-sync-menu-reference-for-unreal-engine#%E5%8F%98%E6%9B%B4%E5%88%97%E8%A1%A8)
-   [右键点击上下文菜单](/documentation/zh-cn/unreal-engine/unreal-game-sync-menu-reference-for-unreal-engine#%E5%8F%B3%E9%94%AE%E7%82%B9%E5%87%BB%E4%B8%8A%E4%B8%8B%E6%96%87%E8%8F%9C%E5%8D%95)
-   [日志（Log）](/documentation/zh-cn/unreal-engine/unreal-game-sync-menu-reference-for-unreal-engine#%E6%97%A5%E5%BF%97%EF%BC%88log%EF%BC%89)
-   [筛选器菜单](/documentation/zh-cn/unreal-engine/unreal-game-sync-menu-reference-for-unreal-engine#%E7%AD%9B%E9%80%89%E5%99%A8%E8%8F%9C%E5%8D%95)
-   [同步后选项](/documentation/zh-cn/unreal-engine/unreal-game-sync-menu-reference-for-unreal-engine#%E5%90%8C%E6%AD%A5%E5%90%8E%E9%80%89%E9%A1%B9)
-   [选项菜单](/documentation/zh-cn/unreal-engine/unreal-game-sync-menu-reference-for-unreal-engine#%E9%80%89%E9%A1%B9%E8%8F%9C%E5%8D%95)
-   [应用设置（Application Settings）](/documentation/zh-cn/unreal-engine/unreal-game-sync-menu-reference-for-unreal-engine#%E5%BA%94%E7%94%A8%E8%AE%BE%E7%BD%AE%EF%BC%88applicationsettings%EF%BC%89)
-   [自定义编译步骤](/documentation/zh-cn/unreal-engine/unreal-game-sync-menu-reference-for-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BC%96%E8%AF%91%E6%AD%A5%E9%AA%A4)
-   [新建步骤](/documentation/zh-cn/unreal-engine/unreal-game-sync-menu-reference-for-unreal-engine#%E6%96%B0%E5%BB%BA%E6%AD%A5%E9%AA%A4)
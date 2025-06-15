# 虚幻引擎中的Unreal Swarm | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:15:24.374Z

---

目录

![Unreal Swarm](https://dev.epicgames.com/community/api/documentation/image/3cdde491-b177-4db8-bd18-46eaeda00eef?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/384c5f29-09a8-48cf-a425-8ee9f8a0f946/unrealswarm_overviewimage-2.png "UnrealSwarm_OverviewImage-2.png")

根据你的开发环境，渲染大型和开放世界场景可能会花费大量的时间，因为计算光照、阴影和几何体可能非常昂贵。有几种方法可以减少项目的构建时间，比如升级你的硬件以超出我们的[推荐规格](/documentation/404)，或者使用任务分配系统，这就是 **Unreal Swarm** 的用途，减少执行昂贵计算所需的时间，比如[高质量静态全局照明](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine)求解。

## 什么是Unreal Swarm?

Unreal Swarm是一种通用的应用程序和任务分配系统，由两种应用程序类型组成，一种是分配构建任务的协调程序，另一种是利用主机系统资产完成分配任务的代理程序。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e5904e5-fe05-4bab-9982-f76676576303/unrealswarm_scheme.png "UnrealSwarm_Scheme.png")

设置好Swarm之后，Swarm协调程序将管理网络上Swarm代理程序的作业和任务。

## 要求

在设置Unreal Swarm之前，你需要：

-   在网络中的至少一台Windows机器上安装虚幻引擎（UE）。该机器将被用于启动Swarm Coordinator。详情请参见[安装虚幻引擎](/documentation/404)文档。
-   在每一台将要充当Swarm Agent的Windows及其上安装运行虚幻引擎和编辑器所必须的先决条件。具体可按照以下任意方法操作：
    -   安装对应版本的DirectX End-User Runtimes，可点击[硬件与软件要求](/documentation/404)页面上的链接下载。
    -   按照[硬件与软件要求](/documentation/404)页面的描述，运行虚幻引擎自带的先决条件安装程序。
    -   安装Epic Games启动程序和虚幻引擎。

-   目前，Unreal Swarm只能在Windows系统上运行。 要用于启动轻量级构建的机器，以及所有要参与分布式计算的机器都必须运行虚幻引擎支持的Windows版本。
-   如果你想为计算开销较大的任务设置渲染农场，请确保与你的IT部门协调，在需要托管Swarm协调程序和代理程序的机器上设置适当的权限。

## 设置Swarm协调程序

如果你已经确定了想要使用的机器，并且安装了UE4；按照以下步骤设置Swarm协调程序：

1.  安装UE4后，导航到"\[UE4ROOT\]\\Engine\\Binaries\\DotNET"。
2.  在机器上创建一个新目录，该目录将任务分配到网络上的其他机器。为了便于说明，我们将新目录命名为"Swarm Coordinator"。
3.  现在，将以下文件从 `[UE4ROOT]\Engine\Binaries\DotNET` 文件夹移动（或复制）到新建目录：
    -   **AgentInterface.dll**
    -   **SwarmCommonUtils.dll**
    -   **SwarmCoordinator.exe**
    -   **SwarmCoordinator.exe.config**
    -   **SwarmCoordinatorInterface.dll**
    -   **SwarmInterface.dll**
    -   **UnrealControls.dll**
4.  最后，要验证可以在你的机器上运行该应用程序，请继续并双击 **Swarm协调程序** 可执行文件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f12ff64-9174-47cd-a3c8-8ed24e9f79c5/unrealswarm_coordsetup-1.png "UnrealSwarm_CoordSetup-1.png")

如果你已经部署了Swarm代理程序，那么Swarm协调程序将显示其 **代理程序对话框窗口（Agent Dialog Window）** (1)和 **重启选项区域（Restart Options Area）** (2)。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ffbe163-5c68-4458-bb7a-bca154fdc729/swarmcoordinator_uifinal.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ffbe163-5c68-4458-bb7a-bca154fdc729/swarmcoordinator_uifinal.png)

点击查看大图。

此时，你不需要对应用程序做任何事情，所以继续下一节，设置Swarm代理程序。

## 部署Swarm代理程序

现在你已经设置了Swarm协调程序，可以部署Swarm代理程序了。在确定你想要托管代理程序的机器之后，继续按照以下步骤操作：

1.  在你希望托管Swarm代理程序的每台机器上，创建一个新目录。为了便于说明，我们将新目录命名为"Swarm Agent"。
2.  将以下文件从"\[UE4ROOT\]\\Engine\\Binaries\\DotNET"文件夹直接移动（或复制）到新建目录：**SwarmAgent.exe**、**AgentInterface.dll**、**SwarmCommonUtils.dll**、**SwarmCoordinatorInterface.dll**、**SwarmInterface.dll** 和 **UnrealControls.dll**。
3.  要部署代理，双击 **Swarm代理程序** 可执行文件。
4.  启动Swarm代理程序后，**Swarm** 图标出现在 **Windows通知区域**。双击 **Swarm** 图标打开应用程序的主菜单。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8250c524-5e9d-47fc-b864-e947adbce606/unrealswarm_agentsetup_4-1.png "UnrealSwarm_AgentSetup_4-1.png")
5.  要配置Swarm代理程序，单击 **设置（Settings）** 选项卡。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3c11684-018d-48d7-9311-9870cae40dc6/unrealswarm_agentsetup_5-2.png "UnrealSwarm_AgentSetup_5-2.png")
    
    要启用 **开发人员设置（Developer Settings）**，将 **ShowDeveloperMenu** 标记（在 **设置（Settings）> 开发人员设置（Developer Settings）** 中）设置为 **True**。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/534014bf-cb1d-4604-8d45-a28389b233b9/swarmagent_developersettings-2.png "SwarmAgent_DeveloperSettings-2.png")
    
    当你更新代理程序的设置时，值得注意的是Swarm代理程序将设置写入到"SwarmAgent.Options.xml"（如果启用了开发人员设置（Developer Settings），则写入到"SwarmAgent.DeveloperOptions.xml"）。
    
6.  在 **分配设置（Distribution Settings）** 下拉菜单中，找到 **CoordinatorRemotingHost** 字段，输入主机的 **IPv4地址（IPv4 Address）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c2ab963-a27e-4bb0-a0ac-f6dfe7bd70ec/unrealswarm_agentsetup_6-2.png "UnrealSwarm_AgentSetup_6-2.png")
    
    如果你不知道计算机的 **IPv4地址（IPv4 Address）**，请从 **命令提示符（Command Prompt）** 运行"ipconfig"。
    
7.  如果不想在 **CoordinatorRemotingHost** 字段中输入系统的 **IPv4地址（IPv4 Address）**，可以输入协调程序的 **DNS名称（DNS Name）**。
8.  最后，继续并打开 **Swarm协调程序**，你将在其中找到关于已部署的Swarm代理程序的详细信息。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13dae053-06e7-46dc-a735-a1ebb250691b/unrealswarm_agentsetup_8-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13dae053-06e7-46dc-a735-a1ebb250691b/unrealswarm_agentsetup_8-2.png)
    
    点击查看大图。
    

### 设置代理程序组

设置代理程序组对于创建执行群集非常有用。例如，一组机器所属的组可能不属于渲染农场，而另一个群集的机器可能属于渲染农场。 

开始时，打开 **设置（Settings）> 分配设置（Distribution Settings）** 菜单。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71b5bce9-2cb4-4d7d-8150-8c3f51b3adc8/swarmagent_settings_distributionsettings.png "SwarmAgent_Settings_DistributionSettings.png")

要设置代理程序组，首先需要指定要将该代理程序部署到哪个组作业。例如，我们在 **AllowedRemoteAgentGroup** 设置中指定该代理程序将部署到"FarmGroup"作业。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d282398-f2f0-434d-b21c-1fa086b6cd0c/unrealswarm_farmgroup.png "UnrealSwarm_FarmGroup.png")

如果希望将此代理程序部署到"FarmGroup"作业，请确保 **AgentGroupName** 匹配 **AllowedRemoteAgentGroup**。在下面的示例中，我们将阻止将此代理程序部署到"FarmGroup"作业中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/985b398f-9d78-488c-ad86-3045fcfa8844/unrealswarm_nonfarmgroup.png "UnrealSwarm_NonFarmGroup.png")

如果你想更多地了解代理程序的 **分配设置（Distribution Settings）**，下表提供了一些有用的说明，包括可以为执行群集中的每个代理程序指定的其余属性。

**设置（Setting）**

**默认值（Default Value）**

**说明（Description）**

**AgentGroupName**

Default

这是此Swarm代理程序所属的代理程序组的名称。

**AllowedRemoteAgentGroup**

DefaultDeployed

这是此Swarm代理程序可以部署到的代理程序组作业的名称。

**AllowedRemoteAgentNames**

RENDER\*

远程机器使用的过滤字符串（' '、','或';'界定符）。

**AvoidLocalExecution**

False

将此标记设置为"True"意味着你希望能够从这个Swarm代理程序（不带本地执行）分配作业和任务。

设置此标记更像是一种建议（而非强制），因为它将线程优先级设置为"空闲（Idle）"，优先级低于Swarm上连接的其他代理程序。这是因为，如果没有其他可用的代理程序（或者Swarm找不到协调程序），你仍然可以在该代理程序上运行构建，而不是无限等待（或失败）。

**CoordinatorRemotingHost**

RENDER-01

这是托管Swarm协调程序的机器的名称。你可以在该字段中输入两个字符串之一，要么是协调程序的DNS名称，要么是其IPv4地址。

**EnableStandaloneMode**

False

将此标记设置为"True"将禁用用于传出和传入任务的分配系统。

### 管理Swarm缓存

在部署了Swarm代理程序之后，需要管理代理程序的Swarm缓存。通常，管理代理程序的Swarm缓存涉及更新代理程序的缓存设置、清除其缓存和验证其缓存。

若要更新代理程序的缓存设置，请导航到 **设置（Settings）> 缓存设置（Cache Settings）** 菜单。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c52a5e26-b533-41cf-898d-d9aea12dbcc4/swarmagent_settings_cachesettings.png "SwarmAgent_Settings_CacheSettings.png")

从这个菜单中，你将能够更新代理程序的 **缓存设置（Cache Settings）**（如下所述）。

**设置（Setting）**

**默认值（Default Value）**

**说明（Description）**

**CacheFolder**

\[磁盘上的文件夹\]/SwarmCache

这是缓存文件夹的位置，位于一个有大量空间的高速驱动器上。

**MaximumCacheSize**

10

以gb为单位，这是缓存文件夹的近似最大大小。

**MaximumJobsToKeep**

5

这是以前记录日志和输出数据的作业数量。

另外，如果你想清除主机的缓存（由 **Swarm代理程序** 用于完成其分配的任务），请在 **缓存（Cache）** 菜单中调用 **清除（Clean）** 命令。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b610f55d-4e9e-47ad-82fb-d362d7cd6aca/swarmagent_cachemenu_clean.png "SwarmAgent_CacheMenu_Clean.png")

最后，如果你想验证机器的缓存，请在 **缓存（Cache）** 菜单中调用 **验证（Validate）** 命令。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d94acad-30db-43fb-a64e-e5d95b46af13/swarmagent_cachemenu_validate.png "SwarmAgent_CacheMenu_Validate.png")

定期清理和验证Swarm缓存是一个很好的惯例，特别是在Unreal Lightmass崩溃并导致构建失败的情况下。

### 读取代理程序日志

单击 **日志（Log）** 选项卡将打开Swarm代理程序日志消息刷新到的日志（Log）窗口。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2957ab72-549d-4857-a4bc-78ed6c7e3bff/swarmagent_logwindow.png "SwarmAgent_LogWindow.png")

如果你想指定要刷新到 **日志（Log）** 窗口的输出量，请更新 **MaximumJobApplicationLogLines** 变量（可以在 **开发人员设置（Developer Settings）> 日志设置（Log Settings）** 菜单中找到），以便在作业应用程序截断进入 **日志（Log）** 窗口的内容之前更改作业应用程序的输出行数。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e359ca6-5b1f-4561-9bf5-5c2785c43f83/swarmagent_developersettings_logsettings.png "SwarmAgent_DeveloperSettings_LogSettings.png")

如果出于调试或维护目的需要定位 **AgentLog**\* 文本文件，请注意，在每个作业的开头和结尾处，代理程序活动都被记录到"\[磁盘上的文件夹\]\\SwarmCache\\Logs"中的文件。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8376ca10-f979-4d62-8e84-1007f881afb2/swarmagent_logwindowfiles.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8376ca10-f979-4d62-8e84-1007f881afb2/swarmagent_logwindowfiles.png)

点击查看大图。

通常，磁盘上文件的默认日志级别设置为 **ExtraVerbose**，而Swarm代理程序的日志（Log）窗口的默认日志级别设置为 **Informative（@@@）**。如果你希望更改 **日志（Log）** 输出的详细程度，请更新 **冗余（Verbosity）** 变量，该变量位于 **设置（Settings）> 日志设置（Log Settings）** 菜单中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c851319-f945-40ee-806a-1575fb32739f/swarmagent_settings_logsettings.png "SwarmAgent_Settings_LogSettings.png")

### 监视进度

如果你希望在代理程序处理分配给它的作业和任务时监视代理程序的进度，请打开Swarm状态（Swarm Status）窗口。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00c41629-3063-4e9e-a62d-9f50e41c756f/swarmagent_swarmstatusmenu.png "SwarmAgent_SwarmStatusMenu.png")

当代理程序运行时，你将看到每台机器的进度条，对于每一个进度条，都有一些区域反映应用程序是否正在初始化(1)、准备执行工作(2)（两者都不是分布式工作）或执行分布式工作(3)。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/121655a8-524d-4f28-82cb-a5ceb57ecab6/swarmagent_swarmstatuswindowexample.png "SwarmAgent_SwarmStatusWindowExample.png")

要获得有关作业进度的更多详细信息，请将鼠标光标悬停在进度条上。

最后，位于底部的分布式进度条告诉你已经完成的任务的百分比(4)与当前正在进行的任务的百分比(5)。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6015e337-c8d2-4213-9fa8-f98a0d309d0b/swarmagent_distributedprogress.png "SwarmAgent_DistributedProgress.png")

## 停止Swarm代理程序

要停止Swarm代理程序，单击 **文件（File）> 退出（Exit）** 关闭应用程序并终止其进程。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/388c9d6d-0d0b-45ba-a144-d8f47f3cc4b6/swarmagent_exitprocess.png "SwarmAgent_ExitProcess.png")

或者，右键单击 **Windows通知区域** 中的 **Swarm** 图标，选择退出（Exit）命令。

此时，Swarm协调程序和Swarm代理程序可以在最小的干预下运行。考虑到需要处理的光源、对象的数量和计算的质量，你会发现有了足够多的代理程序，Unreal Lightmass构建应该只需要几分钟，而不是几个小时。

根据你的开发环境（包括你正在处理的场景大小和复杂性），你可能希望更新本地机器上保留的内核数量，以提高构建性能。这可以通过调优 **LocalJobsDefaultProcessorCount** 变量来实现，该变量位于 **开发人员设置（Developer Settings）> 本地性能设置（Local Performance Settings）** 菜单中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f648ad88-e519-4009-9d05-043eadbb7969/swarmagent_developersettings_localperformancesettings-1.png "SwarmAgent_DeveloperSettings_LocalPerformanceSettings-1.png")

如果你对运行Unreal Swarm有一些一般性问题，请查看以下一组常见问题。

## 常见问题

-   [什么是Unreal Swarm?](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#what-is-unreal-swarm)
-   [使用要求](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#requirements)
-   [设置Swarm Coordinator](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#setting-up-swarm-coordinator)
-   [部署Swarm Agent](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#deploying-swarm-agents)
    -   [设置Agent Group](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#setting-up-agent-groups)
    -   [管理Swarm Cache](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#managing-swarm-cache)
    -   [阅读Agent日志](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#reading-agent-logs)
    -   [监测进程](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#monitoring-progress)
-   [停止Swarm Agent](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#stopping-swarm-agents)
-   [常见问题](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#frequently-asked-questions)
    -   [在使用Swarm Agent（s）和Coordinator时，有哪些方法可以降低构建时间？](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#what-are-some-ways-i-can-improve-build-times-when-using-swarm-agents-and-coordinator)
    -   [为什么我没有获得代理分配？](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#why-am-i-not-getting-agent-distribution)
    -   [在构建光照时，如何限制CPU的使用？](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#how-can-i-limit-cpu-usage-when-building-lighting)
    -   [启动Swarm Agent时，提示UnrealLightmass.exe出现Windows应用程序错误，这是什么意思？](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#when-trying-to-launch-swarm-agent-i-get-a-windows-application-error-for-unreallightmassexe-what-does-this-mean)
    -   [Swarm Agent和Coordinator是否支持Mac或Linux？](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#are-swarm-agent-and-coordinator-supported-for-mac-or-linux)
    -   [GPU可以用来构建光照吗？](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#can-my-gpu-be-used-to-build-lighting)
    -   [以下错误是什么意思？](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#what-do-the-following-errors-mean)

##### 在使用Swarm代理程序和协调程序时，有哪些方法可以改善构建时间？

-   在玩家可访问区域内添加[Lightmass重要体积](/documentation/zh-cn/unreal-engine/lightmass-basics-in-unreal-engine)：
    -   这个体积被用来聚焦于Lightmass为提升准确性和质量而花费时间的地方。相关想法是这些应该覆盖玩家能够到达的区域。该体积之外的区域将接收到较少的光子，因此质量较低。请注意，使用单一大体积来包围一个区域违背了它们在关键区域聚焦光子计算的用意。
-   调整[光照图](/documentation/zh-cn/unreal-engine/understanding-lightmapping-in-unreal-engine)分辨率：
    -   在场景中具有很高的光照图分辨率和大量光照贡献的单独静态网格体会增加构建时间，不仅对于场景如此，对于单个Actor也是如此。在可能的情况下，降低光照图的分辨率以获得高质量的结果，并使用统计数据（Statistics）窗口来了解为关卡构建单个Actor所花费的时间。为了得到一个好的结果，对于正在设置较高光照图分辨率的大（或复杂的）静态网格体，你可能想要考虑把它分成单独的小网格体或重做光照图UV（在可能的情况下），以对重要的部分进行更好的覆盖。
-   启用[植被工具](/documentation/zh-cn/unreal-engine/foliage-mode-in-unreal-engine)光照图分辨率：
    
    -   将植被绘制到关卡中时所用的实例化静态网格体会自动使用它引用的静态网格体光照图分辨率。当你有数百（甚至数千）个这样的图像绘制到你的关卡中时，这个分辨率对于系统来说就太高而导致无法处理了。它将使构建时间呈指数级增长，由于内存限制可能导致Lightmass崩溃，以及纹理内存消耗变得更高。
        
        建议启用 **光照图分辨率（Light Map Resolution）** 并使用默认值8，或者可能将其设置为更低的值4。这降低了所有实例的分辨率，但是可感知的质量损失是最小的，因为静态阴影只需要在远处显示，而动态阴影是在相机附近处理的。
        
        [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0c111bf-a222-4f97-82b7-1c912bf0213a/foliagetool_lmresolution.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0c111bf-a222-4f97-82b7-1c912bf0213a/foliagetool_lmresolution.png)
        
        点击查看大图。
        
-   减少场景Actor和（或）光源的数量：
    
    -   关卡中[阴影投射](/documentation/zh-cn/unreal-engine/shadowing-in-unreal-engine)Actor和（或）光源的数量意味着计算照明时必须考虑所有这些交互作用。减少光源是限制单个光源交互的Actor数量的一个主要方法。减小不需要影响大面积的光源影响半径可以减少计算次数，从而提高正在处理的光源构建的速度。
-   使用高于推荐的系统规格：
    
    -   Swarm代理程序是一个CPU密集型进程，需要大量计算。如果你只使用本地机器，那么良好的CPU和大量的RAM可以减少构建过程所需的时间。请记住，前面提到的其他因素也会影响构建处理时间。

##### 为什么我没有得到代理程序分配？

远程Swarm代理程序可能会因为一些不同的原因拒绝处理你的作业，其中最常见的原因是它们已经在忙着执行其他工作。另一种可能性是，它们认为自己当时太忙了，无法承担任务，这往往是由于机器在做一些资产密集型的事情，如编译或[烘焙内容](/documentation/zh-cn/unreal-engine/sharing-and-releasing-projects-for-unreal-engine)。在代理程序窗口的 **Swarm状态（Swarm Status）** 选项卡中，你应可以看到所有可能对构建有帮助的远程代理程序的完整列表。如果其中一个当前不可用，你将看到一根白色的条随着构建的其余部分滴答计时，如果你将鼠标移到该条上，你将看到"等待远程变为可用（Waiting for remote to become available）"。

另外，查看可用远程代理程序的更高级方法（即使你没有进行构建）是单击 **日志（Log）** 选项卡并从 **网络（Network）** 菜单中选择 **Ping远程代理程序（Ping Remote Agents）**。你将看到远程计算机及其当前状态的列表。

##### 构建照明时如何限制CPU的使用？

从 **Swarm > 开发人员设置（DeveloperSettings）** 选项卡中，你可以使用 **LocalJobDefaultProcessCount** 和 **RemoteJobDefaultProcessorCount** 来限制本地机器和远程机器在照明构建期间使用的CPU内核。

对于你的本地机器，你可能希望仅将它的贡献限制在几个核心上，以使它能够轻松地处理其他任务。默认情况下，有几个内核是空闲的，但是你可能会发现你需要更多的内核来处理本地的工作，而让分布式任务处理光源构建计算的更多工作。

##### 尝试启动Swarm代理程序时，出现UnrealLightmass.exe的Windows应用程序错误，这是什么意思？

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96946cb4-15ab-482b-8263-6da89bbafc08/unreallightmassexeerror.png "UnrealLightmassEXEError.png")

-   这种类型的错误意味着某些东西正在阻止应用程序在Windows中打开，而这并不是UE4的直接原因。下面是解决这个问题可以采取的一些步骤：
    -   确保安装了适当的和最新的Visual Studio依赖项。对于虚幻引擎4.9及之前的版本，你将需要 **VS2013** 依赖项，对于4.10及之后的版本，你将需要 **VS2015** 依赖项。
    -   如果这不能解决你的问题，请尝试使用一个免费的应用程序（例如，[Dependency Walker](http://www.dependencywalker.com)）来对可能阻止UnrealLightmass.exe加载的DLL问题进行故障排除。

##### Swarm代理程序和协调程序支持Mac或Linux吗？

**目前，Swarm代理程序和协调程序只支持** Windows**。对于** Mac **和** Linux**，光源构建仍然使用Swarm，但是用户无法访问。**

##### 我的GPU可以用来构建照明吗？

Swarm目前不支持照明数据的GPU计算。

##### 以下错误是什么意思？

-   Lightmass崩溃，"分配\[某个值\]内存耗尽"
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44d4e398-3f7d-4b30-9e2b-96f4d0995e3b/sa_ranoutofmemory.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44d4e398-3f7d-4b30-9e2b-96f4d0995e3b/sa_ranoutofmemory.png)
    
    点击查看大图。
    
-   在这种情况下，由于内存不足，Swarm代理程序无法处理Lightmass数据。当你不使用Swarm协调程序将构建分配到需要一台机器完成所有工作的多个代理程序时，这种情况最容易发生。在计算使用许多Actor和光源的大关卡，或当光照图分辨率太高时，Lightmass可能会耗尽内存。
    
    你可以通过增加本地机器上的RAM数量、添加用于分配的代理程序、在可能的情况下降低Actor的光照图分辨率，甚至添加Lightmass重要体积来将资产集中于玩家可以访问的关键区域的计算，从而减少出现此错误的机会。
    
-   Lightmass崩溃，`"Assertion Failed: (Index >=0)&(Index<ArrayNum))"`
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6fdf939-5aba-4ed9-871d-3722eb1bb04d/sa_arrayindexoutofbounds.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6fdf939-5aba-4ed9-871d-3722eb1bb04d/sa_arrayindexoutofbounds.png)
    
    点击查看大图。
    
-   当你收到这个错误时，你应该清理并验证Swarm缓存。
    
-   编辑器toast弹出窗口"光源构建失败。Swarm无法启动。"  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4884f859-e94a-4180-824d-e889f3cc5eb7/failedtokickoff.jpg)
    
    -   当你尝试从虚幻编辑器构建光照时，你可能会收到此消息。如果是这样，以下是一些常见的原因：
        
        -   确保你没有打开并运行Swarm代理程序的多个实例。你可以通过查看正在运行的任务处理或在 **Windows** 中查看 **Windows通知区域** 来检查这一点。
        -   关卡损坏和/或关卡中的Actor损坏
        -   对于防火墙和杀毒软件，没有设置 **SwarmAgent.exe** 的正确例外状况。
        -   引擎的安装或损坏问题。对于使用启动程序的用户，选择你的引擎版本下拉菜单并选择 **验证（Verify）**。
            
            ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0605973d-ec56-4148-951d-0c73b04d79f7/verifyengine.png)
        -   Unreal Lightmass的源构建问题。重新构建UnrealLightmass解决方案。
    -   如果Swarm仍然无法启动，它的端口可能被另一个系统进程使用。
        
        -   打开你的Swarm日志，并检查以下错误消息： 
        -   异常详细信息：System.Net.Sockets.SocketException (0x80004005): 由于目标机器主动拒绝连接，因此无法建立连接 123.456.7.89:8009
            
            你可能需要让你的IT部门参与解决端口分配问题，尤其是因为Swarm需要端口8008和8009才能正常工作。如果没有这些端口，它将无法启动任何代理程序或协调程序。这不是专门由UE4引起的问题。
            

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [global illumination](https://dev.epicgames.com/community/search?query=global%20illumination)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [什么是Unreal Swarm?](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#%E4%BB%80%E4%B9%88%E6%98%AFunrealswarm?)
-   [要求](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#%E8%A6%81%E6%B1%82)
-   [设置Swarm协调程序](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#%E8%AE%BE%E7%BD%AEswarm%E5%8D%8F%E8%B0%83%E7%A8%8B%E5%BA%8F)
-   [部署Swarm代理程序](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#%E9%83%A8%E7%BD%B2swarm%E4%BB%A3%E7%90%86%E7%A8%8B%E5%BA%8F)
-   [设置代理程序组](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E4%BB%A3%E7%90%86%E7%A8%8B%E5%BA%8F%E7%BB%84)
-   [管理Swarm缓存](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#%E7%AE%A1%E7%90%86swarm%E7%BC%93%E5%AD%98)
-   [读取代理程序日志](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#%E8%AF%BB%E5%8F%96%E4%BB%A3%E7%90%86%E7%A8%8B%E5%BA%8F%E6%97%A5%E5%BF%97)
-   [监视进度](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#%E7%9B%91%E8%A7%86%E8%BF%9B%E5%BA%A6)
-   [停止Swarm代理程序](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#%E5%81%9C%E6%AD%A2swarm%E4%BB%A3%E7%90%86%E7%A8%8B%E5%BA%8F)
-   [常见问题](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)
-   [在使用Swarm代理程序和协调程序时，有哪些方法可以改善构建时间？](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#%E5%9C%A8%E4%BD%BF%E7%94%A8swarm%E4%BB%A3%E7%90%86%E7%A8%8B%E5%BA%8F%E5%92%8C%E5%8D%8F%E8%B0%83%E7%A8%8B%E5%BA%8F%E6%97%B6%EF%BC%8C%E6%9C%89%E5%93%AA%E4%BA%9B%E6%96%B9%E6%B3%95%E5%8F%AF%E4%BB%A5%E6%94%B9%E5%96%84%E6%9E%84%E5%BB%BA%E6%97%B6%E9%97%B4%EF%BC%9F)
-   [为什么我没有得到代理程序分配？](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%88%91%E6%B2%A1%E6%9C%89%E5%BE%97%E5%88%B0%E4%BB%A3%E7%90%86%E7%A8%8B%E5%BA%8F%E5%88%86%E9%85%8D%EF%BC%9F)
-   [构建照明时如何限制CPU的使用？](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#%E6%9E%84%E5%BB%BA%E7%85%A7%E6%98%8E%E6%97%B6%E5%A6%82%E4%BD%95%E9%99%90%E5%88%B6cpu%E7%9A%84%E4%BD%BF%E7%94%A8%EF%BC%9F)
-   [尝试启动Swarm代理程序时，出现UnrealLightmass.exe的Windows应用程序错误，这是什么意思？](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#%E5%B0%9D%E8%AF%95%E5%90%AF%E5%8A%A8swarm%E4%BB%A3%E7%90%86%E7%A8%8B%E5%BA%8F%E6%97%B6%EF%BC%8C%E5%87%BA%E7%8E%B0unreallightmassexe%E7%9A%84windows%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E9%94%99%E8%AF%AF%EF%BC%8C%E8%BF%99%E6%98%AF%E4%BB%80%E4%B9%88%E6%84%8F%E6%80%9D%EF%BC%9F)
-   [Swarm代理程序和协调程序支持Mac或Linux吗？](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#swarm%E4%BB%A3%E7%90%86%E7%A8%8B%E5%BA%8F%E5%92%8C%E5%8D%8F%E8%B0%83%E7%A8%8B%E5%BA%8F%E6%94%AF%E6%8C%81mac%E6%88%96linux%E5%90%97%EF%BC%9F)
-   [我的GPU可以用来构建照明吗？](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#%E6%88%91%E7%9A%84gpu%E5%8F%AF%E4%BB%A5%E7%94%A8%E6%9D%A5%E6%9E%84%E5%BB%BA%E7%85%A7%E6%98%8E%E5%90%97%EF%BC%9F)
-   [以下错误是什么意思？](/documentation/zh-cn/unreal-engine/unreal-swarm-in-unreal-engine#%E4%BB%A5%E4%B8%8B%E9%94%99%E8%AF%AF%E6%98%AF%E4%BB%80%E4%B9%88%E6%84%8F%E6%80%9D%EF%BC%9F)
# 虚幻引擎UGS客户端设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-game-sync-client-setup-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:33:24.723Z

---

目录

![UGS客户端设置](https://dev.epicgames.com/community/api/documentation/image/4a3bd6da-4121-42a6-81b8-e4457991d70d?resizing_type=fill&width=1920&height=335)

本指南将回顾新用户设置 **UnrealGameSync（UGS）客户端** 的最简单方法，但如果你需要更详细的信息或需要使用其他方法，请查看[UGS快速入门](/documentation/zh-cn/unreal-engine/unreal-game-sync-quick-start-guide)指南。 本指南还假设你的团队已经设置了自己的Perforce服务器，添加了所有适用的资源和内容文件，在你将要使用UGS的机器上安装了适用的Perforc版本，并且已经将UGS分发到将使用它的用户。

如果你需要其他设置信息，请访问[UGS概述](/documentation/zh-cn/unreal-engine/unreal-game-sync-ugs-for-unreal-engine)。

1.  在安装UGS之前，请确认你已经[设置Perforce工作空间](/documentation/zh-cn/unreal-engine/using-perforce-as-source-control-for-unreal-engine#%E8%AE%BE%E7%BD%AEperforce%E5%B7%A5%E4%BD%9C%E7%A9%BA%E9%97%B4)，并指向需要同步项目的分支（stream）。工作空间的本地路径要尽可能简短。
    
    Perforce（P4）设置通常由其他具有版本控制系统经验和在 **虚幻引擎（UE）** 中使用Perforce经验的人员完成。如果你在Perforce中查看文件时遇到问题，并具有所有适用的权限，那么可能是因为你使用的Perforce版本已经过期，无法处理我们在Epic工具中使用的现代功能。2020.1已经确认可以与UGS搭配使用，甚至一些更高的版本也可以正常工作。
    
2.  运行的 **UGS安装程序**，该程序应该由你的工作室中的UGS负责人分发。在运行UGS时，确保你具有管理员权限。
    
3.  你将在UGS启动时看到此UI：
    
    ![虚幻游戏同步启动用户界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09a93610-7ed3-4847-a85e-b37231576336/ugs-cs-start-up.png)
    -   在 **服务器（Server）** 和 **用户（User）** 字段，输入你通过P4V连接时使用的Perforce连接设置。
        
    -   将 **存储路径（Depot Path）** 设置为你的UGS二进制文件在Perforce上的存储位置。
        
    -   在确认这些字段与Perforce凭证和UGS二进制文件的位置匹配之后，点击 **连接（Connect）**。
        
4.  在UGS成功连接到你的Perforce服务器后，你将看到 **入门（Getting Started）** 菜单。点击 **打开项目（Open Project）**。
    
    ![在虚幻游戏同步中打开项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cff3438b-38ae-471a-bf1a-ec9c851126f7/ugs-cs-open-project.png)
5.  在 **打开项目（Open Project)** 对话框后，点击 **浏览（Browse）**，并找到你在步骤1中设置的工作空间。
    
    在点击 **打开项目（Open Project）** 之后，就可以安全地按照[UGS快速入门](/documentation/zh-cn/unreal-engine/unreal-game-sync-quick-start-guide)指南中详细介绍的[工作空间](/documentation/zh-cn/unreal-engine/unreal-game-sync-quick-start-guide#2-%E6%89%93%E5%BC%80%E5%B7%A5%E4%BD%9C%E7%A9%BA%E9%97%B4%E6%96%87%E4%BB%B6)方法来打开项目。 如果你希望改为使用 **本地文件（Local File）** 方法，请参阅[UGS快速入门指南的本地文件部分](/documentation/zh-cn/unreal-engine/unreal-game-sync-quick-start-guide#1-%E6%89%93%E5%BC%80%E6%9C%AC%E5%9C%B0%E6%96%87%E4%BB%B6)。此处还使用更新的屏幕截图描述了这些步骤。
    
    ![点击名称字段旁边的浏览](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c71c7a40-fd01-4dd4-9ba3-6fbd64af6e66/ugs-cs-browse-1.png) ![选择工作空间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dde17881-a90f-40fc-9dbe-efa94a1acc9f/ugs-cs-browse-2.png)
    
    根据工作空间的设置方式，你可能需要在左下角取消选中"仅针对此计算机显示工作空间"（Only show workspaces for this computer）才能查看工作空间。
    
6.  现在，你已经选择了之前创建的工作空间，接下来点击 **路径（Path）** 字段旁边的 **浏览（Browse）**，然后选择 `.uprojectdirs` 文件（显示方法为在 **选择项目（Select Project）** 对话框中选择*\*显示*.uprojectdirs文件*\*（Show* .uprojectdirs files）），或在该流中的项目之一中选择 `.uproject` 文件。 对于本示例，我们将使用 `.uprojectidirs` 文件，但你也可以轻松选择 `.uproject` 文件。
    
    ![点击路径字段旁边的浏览](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45828ed0-556f-4be8-b1a4-63663dc9f513/ugs-cs-browse-path.png) ![选择项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd8965ff-3ec0-477a-8570-9c344ab7ada5/ugs-cs-projects.png)
    
    在此之后，将填充 **路径（Path）** 字段，你可以点击 **确定（Ok）** 继续。
    
    ![点击确定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/242cebfb-d7b2-4be2-b448-5ea71f5e2f03/ugs-cs-ok.png)
7.  在继续将所有内容同步到你的机器并构建/运行你的项目之前，查看[UGS同步筛选器设置](/documentation/zh-cn/unreal-engine/unreal-game-sync-filters-for-unreal-engine)文档，了解 **同步筛选器** 对你的工作流有什么帮助。
    
    同步筛选器有助于确保你不会同步任何多余的数据。 例如，如果同一个流中有多个大型项目，那么可以设置筛选器，以便仅同步需要处理的项目。过滤器的功能非常强大，但如果过度使用，可能会带来意外后果。 因此使用筛选器时应该谨慎，如果有任何疑问，请向你的团队中具有同步筛选器使用经验的人员咨询。
    
8.  打开项目之后，你将看到主菜单，每天的日常工作都应该通过这个菜单来执行。
    
    有关此菜单的完整概述，请参阅[UGS菜单概述](/documentation/zh-cn/unreal-engine/unreal-game-sync-menu-reference-for-unreal-engine)文档。
    
    双击 **变更列表（Changelists）** 区域中最顶部的变更列表，或点击 **项目概述（Project Overview）** 区域中的 **立即同步（Sync Now）**，可以同步到你的构建的最新变更列表。
    
    在 **变更列表（Changelists）** 区域中选择 **最新**：
    
    ![选择最新的变更列表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcffa7e1-6dc3-41e6-9a70-e16ada1f9339/ugs-cs-latest.png)
    
    点击 **立即同步（Sync Now）**：
    
    ![点击立即同步](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4ed6653-2375-4a1f-a9b1-10e4a38618b8/ugs-cs-sync-now.png)
    
    **目标...（To...）** 列出 **立即同步（Sync Now）** 所同步到的变更列表选项：**最新（Latest）**、**最新良好（Latest Good）** 和 **最新星标（Latest Starred）** 分别指的是绝对最新、最新批准和最新手动标记的版本。
    
9.  在完成项目同步之后，如果你使用预编译的二进制文件或已经构建了编辑器，应该能够使用 **项目概述（Project Overview）** 区域中的 **Visual Studio** 选项，在Visual Studio打开项目，或在该区域中使用 **虚幻编辑器"（Unreal Editor）** 选项打开项目的编辑器。
    
    如果在打开编辑器之前尚未构建项目，并且未使用预编译的[二进制文件](/documentation/zh-cn/unreal-engine/using-precompiled-binaries-in-unreal-game-sync-for-unreal-engine)，那么可能会收到提示，要求你构建项目。
    
    ![在Visual Studio或虚幻编辑器中打开项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbc24db4-e3f2-4785-9697-fa4ca8f403e7/ugs-cs-ue-or-vs.png)
    
    你可以使用窗口底部的 **同步后（After syncing）** 选项，让系统自动执行构建、打开、运行Visual Studio项目。
    
    ![同步后选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ba2899f-ed4c-4f6b-9e27-ab57fa5be912/ugs-cs-after-sync.png)
    

-   [unreal game sync](https://dev.epicgames.com/community/search?query=unreal%20game%20sync)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
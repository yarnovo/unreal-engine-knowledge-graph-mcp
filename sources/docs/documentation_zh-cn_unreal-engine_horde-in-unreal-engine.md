# 虚幻引擎中的Horde | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/horde-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:36:58.163Z

---

目录

![Horde](https://dev.epicgames.com/community/api/documentation/image/109e1b64-1c02-4aa4-b06b-3647a6a9972c?resizing_type=fill&width=1920&height=335)

**Horde** 是一组支持工作流程的服务。Epic Games在开发《堡垒之夜》、虚幻引擎和其他项目时使用了它。

## 功能

Horde提供以下功能，其中大部分可以独立启用或禁用：

-   **远程执行** ：该功能可将计算工作分摊到其他计算机，包括使用[虚幻构建加速器](/documentation/zh-cn/unreal-engine/horde-unreal-build-accelerator-and-remote-compilation-tutorial-for-unreal-engine)进行C++编译。
-   **构建自动化(CI/CD)** ：一种构建自动化系统，为使用大型Perforce仓库的团队设计。
-   **测试自动化** ：用于跨流和项目查询自动化结果的前端，与[自动化工具](/documentation/zh-cn/unreal-engine/unreal-automation-tool-for-unreal-engine)和[Gauntlet](/documentation/zh-cn/unreal-engine/gauntlet-automation-framework-in-unreal-engine)集成。
-   **Studio分析** ：从虚幻编辑器接收遥测并显示关键工作流程指标图表。
-   **UnrealGameSync元数据服务器** ：为使用[UnrealGameSync](/documentation/zh-cn/unreal-engine/unreal-game-sync-ugs-for-unreal-engine)的团队提供的各种功能，包括构建状态报告、评论聚合和众包构建健康功能。
-   **移动/主机设备管理器** ：一种用于分配和管理大量开发工具包和移动设备的系统。

## 目标与原理

### 一己之见

我们根据Epic Games长期以来的工作流程和最佳实践创建了Horde。它们不是唯一的方法，也不见得适合所有人。彻底的泛用化不是Horde的目标。我们相信系统和工具使用场景间的交互提供了为创作者创建丝滑工作流程的丰富机会。

### 易于部署

我们在构件Horde的过程中，已尽力减少了其运行所需的设置。尽管你可以实现非常复杂的、由多台计算机组成的分布式部署方法，但我们力求在我们支持的所有台式机平台上实现可在本地轻松运行和调试的方案，只需安装少量的依赖项即可。如果你没有设置过数据库，它将为你创建本地数据库，所有必须的服务都将根据服务器的生命周期自动启动和停止。

### 易于管理

对于像Horde这样的项目，我们控制着其源代码，同时又能将其用于高节奏的开发环境中，这让我们能够针对自身的易用性需求对其进行优化。我们与我们的运营团队保持着紧密沟通，并尽可能让他们的工作变得简单。因此，你可以将大部分配置数据存储在源代码中，并且我们提供了内置的分析和性能工具。

### 私密性强

我们不会用Horde托管你的数据，也不会从用户部署接收任何遥测数据。你可以将其托管在符合你IT政策的私有网络中，并将其与你自己的OpenID连接（OIDC）身份延供应商整合，以进行访问。

### 可伸缩

我们会分发所有Horde客户端和服务器功能的完整源代码。

## 开始使用Horde

在开始使用前，请先下载[Horde Windows MSI安装包](https://github.com/EpicGames/UnrealEngine/releases/download/5.5.0-release/UnrealHordeServer.msi)。

这需要访问EpicGames的GitHub库。如果你需要访问权限，请按[在GitHub上访问虚幻引擎源代码](https://www.unrealengine.com/ue-on-github)页面上的指示操作。

下载Horde后，我们建议你根据自身需求先浏览以下教程：

-   [安装Horde代理](/documentation/zh-cn/unreal-engine/horde-installation-tutorial-for-unreal-engine)
-   [使用虚幻构件加速器启用远程C++编译](/documentation/zh-cn/unreal-engine/horde-unreal-build-accelerator-and-remote-compilation-tutorial-for-unreal-engine)
-   [设置构建自动化](/documentation/zh-cn/unreal-engine/horde-build-automation-tutorial-for-unreal-engine)
-   [使用Gauntlet启用测试自动化](/documentation/zh-cn/unreal-engine/horde-test-automation-tutorial-for-unreal-engine)
-   [为团队获取遥测和分析数据](/documentation/zh-cn/unreal-engine/horde-analytics-tutorial-for-unreal-engine)
-   [在移动和主机设备上使用](/documentation/zh-cn/unreal-engine/horde-device-manager-tutorial-for-unreal-engine)
-   [安装UnrealGameSync并在团队内分发虚幻编辑器](/documentation/zh-cn/unreal-engine/horde-unrealgamesync-tutorial-for-unreal-engine)
-   [启用身份验证](/documentation/zh-cn/unreal-engine/horde-authentication-tutorial-for-unreal-engine)

## 主题目录

[

![Horde部署](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a27c028a-bb0f-4eac-bb13-d5d01f210975/placeholder_topic.png)

Horde部署

关于部署Horde以与虚幻引擎配合使用的概述。





](/documentation/zh-cn/unreal-engine/horde-deployment-for-unreal-engine)[

![Horde配置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f2a53cd-4a2b-4c86-9132-1e7de96bf3cc/placeholder_topic.png)

Horde配置

与虚幻引擎配合使用的Horde配置选项概述。





](/documentation/zh-cn/unreal-engine/horde-configuration-for-unreal-engine)[

![Horde内部机制](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d158760-8b98-4d7f-b8c8-b9a34a7e974f/placeholder_topic.png)

Horde内部机制

与虚幻引擎配合使用的Horde内部机制概述。





](/documentation/zh-cn/unreal-engine/horde-internals-for-unreal-engine)[

![Horde教程](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9039c95f-37f3-4bd4-8471-4478c6c3aab4/placeholder_topic.png)

Horde教程

配合虚幻引擎使用Horde的教程概览。





](/documentation/zh-cn/unreal-engine/horde-tutorials-for-unreal-engine)[

![Horde常见问题解答](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3d91607-2c2a-42e8-9ebc-b9f753523520/placeholder_topic.png)

Horde常见问题解答

Horde与虚幻引擎协同使用的常见问题解答。





](/documentation/zh-cn/unreal-engine/horde-frequently-asked-questions-for-unreal-engine)[

![Horde术语表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/576227cb-4a7a-485c-b4a6-1c116109f097/placeholder_topic.png)

Horde术语表

关于Horde与虚幻引擎配合使用的术语表。





](/documentation/zh-cn/unreal-engine/horde-glossary-for-unreal-engine)

-   [automation](https://dev.epicgames.com/community/search?query=automation)
-   [unrealgamesync](https://dev.epicgames.com/community/search?query=unrealgamesync)
-   [horde](https://dev.epicgames.com/community/search?query=horde)
-   [unreal build accelerator](https://dev.epicgames.com/community/search?query=unreal%20build%20accelerator)
-   [automation tool](https://dev.epicgames.com/community/search?query=automation%20tool)
-   [gauntlet](https://dev.epicgames.com/community/search?query=gauntlet)
-   [unreal build tool](https://dev.epicgames.com/community/search?query=unreal%20build%20tool)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [功能](/documentation/zh-cn/unreal-engine/horde-in-unreal-engine#%E5%8A%9F%E8%83%BD)
-   [目标与原理](/documentation/zh-cn/unreal-engine/horde-in-unreal-engine#%E7%9B%AE%E6%A0%87%E4%B8%8E%E5%8E%9F%E7%90%86)
-   [一己之见](/documentation/zh-cn/unreal-engine/horde-in-unreal-engine#%E4%B8%80%E5%B7%B1%E4%B9%8B%E8%A7%81)
-   [易于部署](/documentation/zh-cn/unreal-engine/horde-in-unreal-engine#%E6%98%93%E4%BA%8E%E9%83%A8%E7%BD%B2)
-   [易于管理](/documentation/zh-cn/unreal-engine/horde-in-unreal-engine#%E6%98%93%E4%BA%8E%E7%AE%A1%E7%90%86)
-   [私密性强](/documentation/zh-cn/unreal-engine/horde-in-unreal-engine#%E7%A7%81%E5%AF%86%E6%80%A7%E5%BC%BA)
-   [可伸缩](/documentation/zh-cn/unreal-engine/horde-in-unreal-engine#%E5%8F%AF%E4%BC%B8%E7%BC%A9)
-   [开始使用Horde](/documentation/zh-cn/unreal-engine/horde-in-unreal-engine#%E5%BC%80%E5%A7%8B%E4%BD%BF%E7%94%A8horde)
-   [主题目录](/documentation/zh-cn/unreal-engine/horde-in-unreal-engine#%E4%B8%BB%E9%A2%98%E7%9B%AE%E5%BD%95)
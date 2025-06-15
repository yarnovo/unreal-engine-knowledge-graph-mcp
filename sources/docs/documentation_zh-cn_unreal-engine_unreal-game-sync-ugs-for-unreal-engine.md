# 虚幻引擎UnrealGameSync (UGS) | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-game-sync-ugs-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:33:37.373Z

---

目录

![UnrealGameSync (UGS)](https://dev.epicgames.com/community/api/documentation/image/40eb933c-910e-4df7-8243-81371045224d?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/818720bd-1a80-4743-ab27-19cde24425c4/deployment_banner-1.png "Deployment_Banner-1.png")

当一个团队在开发 **虚幻引擎（UE）** 项目时，他们需要面对不断有代码和内容被开发出来并集成到项目中的情况。在协同开发环境中工作时，取得成功的关键往往在于他们就开发和集成过程中可能出现的问题进行有效合作和沟通的能力。

这正是同步工具可以发挥作用的地方。

## 什么是UnrealGameSync（UGS）？

从概念上讲，**UGS** 是一个可推动协同开发环境中的代码和内容集成的工具，它使工作时间和地点各不相同的团队成员能够在项目有更新时同步项目。从技术上讲，UGS提供了从 **Perforce** 同步UE项目的图形化前端，可使用微软的 [Visual Studio](https://www.visualstudio.com/) 编译器选择性地构建这些项目。

使用该工具时，**美工** 的工作流中通常包括使用UGS同步项目文件，解决合并冲突，同步编辑器二进制文件，更新版本文件以及选择性地运行虚幻项目。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c81c80c-3b61-4a15-81a6-3f0c93387013/artist_workflow.png "Artist_Workflow.png")

对于 **程序员**，他们的工作流中通常包括使用UGS同步项目文件，解决合并冲突，更新版本文件，生成项目文件，选择性地构建UE4以及选择性地运行虚幻项目。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b53725ef-2bf0-4a0b-b8ea-761791b28409/programmerworkflow.png "ProgrammerWorkflow.png")

解决合并冲突在默认情况下处于启用状态，但是，可以在 **选项（Options）** 快捷菜单中禁用该服务。另外，禁止UGS构建项目将阻止UGS运行它。

安装好UGS之后，任何团队的成员都将能够快速启动并迭代项目，没有使用其他同步工具通常会产生的开销。 

## 使用UGS将使哪些人员受益？

想要深入了解或为UE游戏项目贡献力量的任何人员，具体来讲，开发者、设计师和美工。一般来讲，所有团队成员都可放心提交包含资源和源代码的更改，因为UGS可以轻松同步代码和内容。

### 开发者

-   在变更列表（CL）被提交之后，开发者可以立即同步它，然后他们就可以在本地编译与CL对应的源代码。另外，他们可以为每个更改添加注释，并为其他开发者将构建版本标记为良好或者不良。
    
-   当工程师们致力于修复有问题的构建版本时，他们可以通过设置标记来告知其他团队成员他们正在进行修复。
    
-   开发者可以放心在本地构建版本中对内容进行更改，而无需提交没有版本号的资源，因为引擎版本文件（`Version.h` 和 `Build.version`）会更新到已同步的CL。
    
-   由于包含自定义构建步骤，UGS使开发者能够设置特定于项目的工具和实用程序。
    

请注意，构建系统结果和提交的CL列表（具有构建日志链接）可以一起显示。

### 创意人员

-   如果美工或设计师等创意人员不使用Visual Studio或者他们无需编译编辑器，他们可以获取项目的压缩编辑器构建版本，该版本由CIS编译。 
    
-   能够获取项目的压缩编辑器构建版本对于美工们来讲非常有用，因为同步后，压缩构建版本可以自动解压缩。
    

最后，需要特别提到的是，质量保证、生产或业务部门等其他部门也可以使用UGS来深入了解项目的状态或与开发者和创意人员协作。如果你不熟悉UGS，想快速上手使用它，请参阅 [UGS快速入门](/documentation/zh-cn/unreal-engine/unreal-game-sync-quick-start-guide) 指南。

## Unreal Game Sync文档

[

![UGS客户端设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39273964-9d1b-4b61-b193-a655c43d4993/placeholder_topic.png)

UGS客户端设置

如何设置虚幻游戏同步客户端





](/documentation/zh-cn/unreal-engine/unreal-game-sync-client-setup-for-unreal-engine)[

![UGS快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f085d46d-f1d7-460b-a1dc-f7fa057ce98b/placeholder_topic.png)

UGS快速入门

学习如何使用UnrealGameSync。





](/documentation/zh-cn/unreal-engine/unreal-game-sync-quick-start-guide)[

![UGS参考页面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50aca215-7ac5-4de3-9897-e8e26a1a2990/placeholder_topic.png)

UGS参考页面

本页面将讲解配置UGS并部署为工作室的方法。





](/documentation/zh-cn/unreal-engine/unreal-game-sync-reference-guide-for-unreal-engine)[

![UGS菜单参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef900121-ea91-4d93-8fae-5add9d16b4f8/placeholder_topic.png)

UGS菜单参考

虚幻游戏同步菜单中的所有选项





](/documentation/zh-cn/unreal-engine/unreal-game-sync-menu-reference-for-unreal-engine)[

![UGS预编译二进制文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00abbf3b-1fbb-4a9f-87eb-cbe44527cab8/placeholder_topic.png)

UGS预编译二进制文件

如何使用预编译二进制文件来优化项目的开发





](/documentation/zh-cn/unreal-engine/using-precompiled-binaries-in-unreal-game-sync-for-unreal-engine)[

![UGS故障排除](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0004f5b-563f-4f2b-99a5-99fabee503ca/placeholder_topic.png)

UGS故障排除

关于排查UGS常见问题的一些提示和程序





](/documentation/zh-cn/unreal-engine/unreal-game-sync-troubleshooting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [什么是UnrealGameSync（UGS）？](/documentation/zh-cn/unreal-engine/unreal-game-sync-ugs-for-unreal-engine#%E4%BB%80%E4%B9%88%E6%98%AFunrealgamesync%EF%BC%88ugs%EF%BC%89%EF%BC%9F)
-   [使用UGS将使哪些人员受益？](/documentation/zh-cn/unreal-engine/unreal-game-sync-ugs-for-unreal-engine#%E4%BD%BF%E7%94%A8ugs%E5%B0%86%E4%BD%BF%E5%93%AA%E4%BA%9B%E4%BA%BA%E5%91%98%E5%8F%97%E7%9B%8A%EF%BC%9F)
-   [开发者](/documentation/zh-cn/unreal-engine/unreal-game-sync-ugs-for-unreal-engine#%E5%BC%80%E5%8F%91%E8%80%85)
-   [创意人员](/documentation/zh-cn/unreal-engine/unreal-game-sync-ugs-for-unreal-engine#%E5%88%9B%E6%84%8F%E4%BA%BA%E5%91%98)
-   [Unreal Game Sync文档](/documentation/zh-cn/unreal-engine/unreal-game-sync-ugs-for-unreal-engine#unrealgamesync%E6%96%87%E6%A1%A3)
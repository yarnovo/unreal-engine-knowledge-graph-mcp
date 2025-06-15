# 虚幻引擎UGS快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-game-sync-quick-start-guide
> 
> 生成时间: 2025-06-14T20:33:30.206Z

---

目录

![UGS快速入门](https://dev.epicgames.com/community/api/documentation/image/3515c06d-5077-44ae-a006-0f95b899bcdd?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0ab4450-dd24-4ec9-8fc6-98c57d1dd1cb/ugs-quick-start-top-image.png "ugs-quick-start-top-image.png")

本指南将介绍使用 **UnrealGameSync（UGS）** 同步 **虚幻项目**（`.uproject`）的基本工作流程。学完本教程后，你将了解如何使用UGS打开虚幻项目，以及如何从应用程序主菜单的 **项目概览（Project Overview）** 和 **变更列表区域（Changelist Area）** 进行同步。

**必要设置：**在下列步骤中，我们假定你的团队已在你的计算机上分发并设置了UGS。

## 1 - 打开本地文件

下列步骤将展示如何使用UGS打开本地虚幻项目文件。

1.  要打开本地驱动器上的 `.uproject`，单击 **打开项目...（Open project...）** 链接。
    
    ![Unreal Game Sync start page](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96e855ba-5723-44b1-95be-863aba0130da/ugs-quick-start-step-1-1.png)
2.  当 **打开项目（Open Project）** 窗口打开时，UGS在默认情况下选中 **本地文件（Local File）** 单选按钮。要选择本地文件，单击 **浏览...（Browse...）** 按钮。
    
    ![Open Project window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1daff4b-c582-462e-a19f-0f0745bd2171/ugs-quick-start-step-1-2.png "ugs-quick-start-step-1-2.png")
3.  浏览至并选择 `.uproject` 文件，然后单击 **打开（Open）**。
    
    ![Open File Browser](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/439c60ec-2aaa-46e1-9b54-ae447f0f50ad/ugs-quick-start-step-1-3.png)
    
    我们使用 [Lyra示例游戏](/documentation/zh-cn/unreal-engine/lyra-sample-game-in-unreal-engine) 作为示例虚幻项目。
    
4.  要使用UGS打开虚幻项目，单击 **确定（Ok）** 按钮。
    
    ![Open Project window with local file selected](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/872c7a1b-4f48-45f9-995e-dff68fc9956a/ugs-quick-start-step-1-4.png "ugs-quick-start-step-1-4.png")

## 2 - 打开工作空间文件

下列步骤将展示如何使用UGS打开工作空间虚幻项目文件。

1.  要打开本地驱动器上的 `.uproject` 文件，单击 **打开项目...（Open project...）** 链接。
    
    ![Unreal Game Sync start page](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4fd773be-92e8-4cbb-a6c8-c8d0483d75c1/ugs-quick-start-step-2-1.png)
2.  当 **打开项目（Open Project）** 窗口打开时，UGS在默认情况下选中 **本地文件（Local File）** 单选按钮。请选择 **工作空间（Workspace）** 单选按钮，然后继续。
    
    ![Open Project window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22e78e04-efc0-4c6e-90fd-1cfad8d788cb/ugs-quick-start-step-2-2.png)
3.  需要填充的第一个字段是工作空间的名称。如果已有可将UGS指向的工作空间，单击 **名称:（Name:)** 字段旁的 **浏览...（Browse...）** 按钮。
    
    ![Open Project window with Workspace selected](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9b87936-09e3-4ef5-87ca-17a6373e07df/ugs-quick-start-step-2-3.png)
    
    如果需要创建新工作空间，单击 **新建...（New...）** 按钮来设置新工作空间。
    
    ![New Workspace Setup](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e87d4f42-f9ea-4f33-9c95-9800aeb59e47/ugs-quick-start-step-2-3-note.png)
    
4.  **选择工作空间（Select Workspace）** 菜单打开时，将显示工作空间列表，供你从中选择。请选择 **工作空间**（1）并单击 **确定（Ok）** 按钮 **（2）**。
    
    ![Select Workspace](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5ed381e-12c5-44df-b117-f5bbea85b3fc/ugs-quick-start-step-2-4.png "ugs-quick-start-step-2-4.png")
5.  现在，单击 **路径：（Path:）** 字段旁的 **浏览...（Browse...）** 按钮。
    
    ![Open Project window with Workspace field populated](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4bd033eb-4df1-4dd7-ac40-5d5505df5f99/ugs-quick-start-step-2-5.png "ugs-quick-start-step-2-5.png")
6.  在 **选择项目（Select Project）** 菜单打开后，展开工作空间树，选择 `.uproject` 文件 **(1)**，然后单击 **确定（Ok）** 按钮 **(2)**。
    
    ![Select Project menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/081b8714-ce33-478c-9799-e51203d57827/ugs-quick-start-step-2-6.png "ugs-quick-start-step-2-6.png")
    
    我们使用[Lyra示例游戏](/documentation/zh-cn/unreal-engine/lyra-sample-game-in-unreal-engine)作为示例虚幻项目。
    
7.  现在你已指定了 **工作空间（Workspace）****名称（Name）** 和 **路径（Path）**，接下来就可以单击 **确定（Ok）** 按钮，以使用UGS打开虚幻项目。
    
    ![Open Project window with both Workspace Name and Path selected](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e265187-3289-4915-b87d-17dd152deb7b/ugs-quick-start-step-2-7.png "ugs-quick-start-step-2-7.png")

## 3 - 从"变更列表区域（Changelist Area）"同步

现在你已使用UGS打开了一个项目，接下来需要使用UGS执行一个常见任务——从 **变更列表区域（Changelist Area）** 同步。

确保你已登录 **Perforce**，然后再继续执行下列步骤。

1.  现在你已使用UGS打开项目，在 **主菜单** 中找到 **变更列表区域（Changelist Area）**。
    
    ![Unreal Game Sync project tab](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fbf7f9f6-091f-45a2-95e7-dc410314bff1/ugs-quick-start-step-3-1.png "ugs-quick-start-step-3-1.png")
2.  找到你正在使用的变更，它旁边具有 **箭头图标**。
    
    ![Project tab with current change indicated by arrow icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/350926dd-cb56-4918-9dd2-b87a65759aa8/ugs-quick-start-step-3-2.png "ugs-quick-start-step-3-2.png")
3.  要更新提交到项目流中的另外一个变更，在 **变更列表区域（Changelist Area）** 中双击该变更。
    
    ![Project tab with another change selected](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66ec5c01-1dee-42de-9b52-4b7d51f09a42/ugs-quick-start-step-3-3.png "ugs-quick-start-step-3-3.png")

同步完成后，UGS会更新 **输出日志（Output Log）（3）**、**变更列表区域（Changelist Area）（2）** 和 **项目概览区域（Project Overview Area）（1）**，在下一步骤中，你将从它同步项目。

![Project tab with new sync finished](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17fc8136-feee-40a4-a924-b8c7643b996c/ugs-quick-start-step-3-4.png "ugs-quick-start-step-3-4.png")

## 4 - 从"项目概览区域（Project Overview Area）"同步

现在你已从 **变更列表区域（Changelist Area）** 执行过一次同步，使用UGS打开了一个项目，接下来你需要使用UGS执行另外一个常见任务——从 **项目概览区域（Project Overview Area）** 同步。

1.  首先，在 **主菜单** 中找到 **项目概览区域（Project Overview Area）**。
    
    ![Project tab with Project Overview Area highlighted](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/512d38ed-cb9e-41bf-b6fa-78dd88a74b68/ugs-quick-start-step-4-1.png "ugs-quick-start-step-4-1.png")
2.  单击 **立即同步 - 至...（Sync Now - To...）** 按钮链接旁的 **向下箭头** 按钮，打开快捷菜单。
    
    ![Project tab with Sync Now - To... button highlighted](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47776e26-9701-4f5a-89e1-8435563ea26e/ugs-quick-start-step-4-2.png "ugs-quick-start-step-4-2.png")
3.  现在，选择 **最新变更（Latest Change）** 选项。
    
    ![Project tab with Latest Change selected](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39113342-db33-4d74-9ac3-b1b3783bbbac/ugs-quick-start-step-4-3.png "ugs-quick-start-step-4-3.png")
    
    有关浏览UGS中内置的界面、选项和菜单的更多信息，请参阅 [UGS参考](/documentation/zh-cn/unreal-engine/unreal-game-sync-reference-guide-for-unreal-engine) 指南。
    

同步结束时，UGS将让你知道你已成功更新到最新 **变更**。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17e85769-12f2-44b3-b7a0-0418d1ffdab2/ugs-quick-start-step-4-end.png "ugs-quick-start-step-4-end.png")

现在你已学习完本指南，掌握了如何打开项目以及如何从 **变更列表（Changelist）** 和 **项目概览区域（Project Overview Area）** 用户界面同步项目。如果要继续进一步了解UGS，包括如何部署二进制版本的项目或如何查看界面上的所有菜单和选项，请参阅本指南的下一部分。

## 5 - 自己动手！

现在你已打开了项目，使用UGS执行了一些常见的同步方法，请尝试以下操作：

-   选中位于UGS主菜单底部的 **构建（Build）** 和 **运行（Run）** 复选框，以同步、构建并运行虚幻项目。
    
    ![Unreal Editor opened after selecting Build and Run](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4834d83-469a-4669-87a6-3ea455f59a8d/ugs-quick-start-step-5.png "ugs-quick-start-step-5.png")
-   如果作为开发者，你希望针对无需从源代码编译的创意人员利用预编译二进制文件功能，请通读 [UGS参考](/documentation/zh-cn/unreal-engine/unreal-game-sync-reference-guide-for-unreal-engine) 指南，进一步了解如何有关设置构建系统，从而定期向Perforce提交包含编辑器二进制文件的zip文件，以便UGS将它提取到创意人员的工作空间。
    

-   [unrealgamesync](https://dev.epicgames.com/community/search?query=unrealgamesync)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1 - 打开本地文件](/documentation/zh-cn/unreal-engine/unreal-game-sync-quick-start-guide#1-%E6%89%93%E5%BC%80%E6%9C%AC%E5%9C%B0%E6%96%87%E4%BB%B6)
-   [2 - 打开工作空间文件](/documentation/zh-cn/unreal-engine/unreal-game-sync-quick-start-guide#2-%E6%89%93%E5%BC%80%E5%B7%A5%E4%BD%9C%E7%A9%BA%E9%97%B4%E6%96%87%E4%BB%B6)
-   [3 - 从"变更列表区域（Changelist Area）"同步](/documentation/zh-cn/unreal-engine/unreal-game-sync-quick-start-guide#3-%E4%BB%8E%22%E5%8F%98%E6%9B%B4%E5%88%97%E8%A1%A8%E5%8C%BA%E5%9F%9F%EF%BC%88changelistarea%EF%BC%89%22%E5%90%8C%E6%AD%A5)
-   [4 - 从"项目概览区域（Project Overview Area）"同步](/documentation/zh-cn/unreal-engine/unreal-game-sync-quick-start-guide#4-%E4%BB%8E%22%E9%A1%B9%E7%9B%AE%E6%A6%82%E8%A7%88%E5%8C%BA%E5%9F%9F%EF%BC%88projectoverviewarea%EF%BC%89%22%E5%90%8C%E6%AD%A5)
-   [5 - 自己动手！](/documentation/zh-cn/unreal-engine/unreal-game-sync-quick-start-guide#5-%E8%87%AA%E5%B7%B1%E5%8A%A8%E6%89%8B%EF%BC%81)
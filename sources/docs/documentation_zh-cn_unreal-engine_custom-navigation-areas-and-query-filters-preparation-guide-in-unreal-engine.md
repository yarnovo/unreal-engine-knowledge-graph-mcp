# 虚幻引擎自定义导航区域和查询筛选器准备指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-preparation-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:43:06.046Z

---

目录

![自定义导航区域和查询筛选器准备指南](https://dev.epicgames.com/community/api/documentation/image/89cbe0cc-f290-45e4-aebb-12cbc48651af?resizing_type=fill&width=1920&height=335)

## 概述

本文档将帮助你了解创建关卡和AI代理的初始步骤，以便了解导航系统中的自定义区域和查询筛选器。

你还可以下载[完整示例项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/4b30780f-37c0-4348-9f88-c4c5ea654041/navsystemsample.zip)，其中包含本指南中涵盖的所有素材。

## 目的

-   创建新关卡，并通过在关卡中放置一个导航网格体Actor来设置导航。
    
-   将ThirdPersonCharacter蓝图修改为使用特定的查询筛选器导航到目的地。
    

## 1 - 必要设置

1.  在虚幻项目浏览器的 **新项目分类（New Project Categories）** 分段，选择 **游戏（Games）> 第三人称（Third Person）**，然后点击 **下一步（Next）**。
    
    ![Select the Games category and click Third Person](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91bdccb8-5316-4978-921f-86a842117164/create-project-a.png)
2.  选择 **蓝图（Blueprint）** 和 **不含初学者内容包（No Starter Content）** 选项，然后点击 **创建（Create）**。
    
    ![Select Blueprint and No Starter Content and click Create](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa21cbe4-8b67-42d3-9fcf-f48ac247304f/basic-create-settings-a.png)

### 阶段成果

你创建了一个新的第三人称项目，现在可以了解创建区域类和导航查询筛选器的信息。

## 2 - 创建测试关卡

1.  点击菜单栏上的 **文件（File）>新关卡（New Level）**。
    
    ![Click New Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07aabd0d-529f-4c51-a446-56ed3c5df37c/new-level-a.png)
2.  选择 **基础（Basic）** 关卡并点击 **创建**。
    
    ![Select the Basic Level and click Create](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93f499bf-a2f8-4560-bbf1-d17293af8f3a/select-level-template-a.png)
3.  在 **世界大纲视图（World Outliner）** 中选择 **地板（Floor）** 静态网格体Actor（Static Mesh Actor），在 **细节（Details）** 面板中，将 **缩放（Scale）** 设置为X=10，Y=10，Z=1。
    
    ![Select the Floor Static Mesh Actor in the World Outliner](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/266cb910-ce30-4eaa-adac-4cdadf1aaa15/create-floor-1.png) ![Set the Scale to X = 10, Y = 10, Z = 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67891bab-26f7-4dd3-ac72-ea4f87af61aa/create-floor-2.png)
4.  转到 **放置Actor（Place Actors）** 面板，搜索 **导航网格体边界体积（Nav Mesh Bounds Volume）**。将其拖入关卡，放置在地板网格体上。
    
    ![Drag a Nav Mesh Bounds Volume Actor to the Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8c2c287-79bb-461e-812e-4c765eb87345/custom-navmesh-drag-a.png)
5.  选择 **导航网格体边界体积（Nav Mesh Bounds Volume）** 之后，转到 **细节（Details）** 面板，将 **缩放（Scale）** 设置为X=5、Y=10和Z=1。
    
    ![Set the Scale to X = 5, Y = 10, Z = 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3965d5e1-d737-422f-bcb4-632737a27d04/custom-navmesh-scale-a.png)
6.  转到 **放置Actor（Place Actors）** 面板，然后转到 **形状（Shape）** 类别。将 **球体（Sphere）** Actor拖到关卡中。
    
    ![Drag a Sphere Actor into the Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e5d5fd7-979f-4d12-bbed-e6e48087a941/custom-sphere-drag-a.png)

### 阶段成果

在本小节中，你创建了新关卡并添加了导航网格体和球体Actor。你现在可以创建将走向球体目标的代理。

## 3 - 创建代理

在本小节中，你将创建导航到其目标Actor的代理。

1.  在 **内容侧滑菜单（Content Drawer）** 中，右键点击并选择 **新建文件夹（New Folder）**，以新建文件夹。将文件夹命名为 **NavigationSystem**。
    
2.  在 **内容侧滑菜单（Content Drawer）**，转到 **ThirdPersonBP > 蓝图（Blueprints）**，然后选择 **ThirdPersonCharacter** 蓝图。将其拖放到 **NavigationSystem** 文件夹，然后选择选项 **复制到此处（Copy Here）**。
    
    ![Drag the Third Person Character Blueprint to the Navigation System folder and select Copy Here](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/221ea4ff-c014-4eb7-af49-04cb1d3265dd/move-blueprint-a.png)
3.  找到 **NavigationSystem** 文件夹，并将该蓝图重命名为 **BP\_NPC\_CustomZone**。双击打开蓝图类，然后找到 **事件图表（Event Graph）**。选择所有输入节点并将其删除。
    
4.  右键点击 **事件图表（Event Graph）**，然后搜索并选择 **添加自定义事件（Add Custom Event）**。将事件命名为 **MoveNPC**。
    
    ![Right-click the Event Graph, then search for and select Add Custom Event. Name the event Move NPC](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c25ca7df-7045-4b85-9f8e-4da38e4b6e4b/custom-event-a.png)
5.  转到 **我的蓝图（My Blueprint）** 面板，然后点击 **变量（Variables）** 旁边的 **添加(+)（Add (+)）** 按钮创建新变量。将变量命名为 **Target**。
    
    ![Click the Add next to Variables to create a new variable and name it Target](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b401efef-61e0-4840-ba36-82f13ae6db10/custom-npc-target-1.png)
6.  转到 **细节（Details）** 面板，并点击 **变量类型（Variable Type）** 下拉菜单。搜索 **Actor** 并选择 **对象引用（Object Reference）**。启用 **可编辑实例（Instance Editable）** 复选框。
    
    ![Click the Variable Type dropdown and  select the Actor Object Reference](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9541182a-e02d-4e6f-b3c3-32c3f1fe31cf/custom-npc-target-2.png) ![Enable the Instance Editable checkbox](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2771e317-dbd6-4cee-98d2-46753c16f607/custom-npc-target-3.png)
7.  将 **Target** 变量拖动到 **事件图表（Event Graph）**，然后选择选项 **Set Active**。从 **Target** 节点拖出，然后搜索并选择 **Is Valid** 宏，如下所示。
    
    ![Drag from the Target node, then search for and select the Is Valid macro](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c757b41-0dcc-4044-bb47-4e6990c3c351/custom-npc-is-valid.png)
8.  右键点击 **事件图表（Event Graph）**，然后搜索并选择 **获取对自身的引用（Get a reference to self）**。
    
    ![Right-click the Event Graph, then search for and select Get reference to self](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09a11325-d8dd-497f-93da-6ac23d09d8d1/custom-npc-self-a.png)
9.  从 **Self** 节点拖出，然后搜索并选择 **获取AI控制器（Get AIController）**。
    
    ![Drag from the Self node, then search for and select Get AI Controller](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a92f3f6-3697-4c80-add0-907c7dae6424/custom-npc-ai-controller.png)
10.  从 **AI Controller** 节点拖出，然后搜索并选择 **移动至Actor（Move to Actor）**。
    
    ![Drag from the AI Controller node, then search for and select Move to Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b097aef-423f-4260-850f-54fcb61f136c/custom-npc-move-to-actor.png)
11.  将 **Is Valid** 节点的 **有效（Is Valid）** 引脚连接到 **Move to Actor** 节点。将 **Move to Actor** 节点的 **可接受半径（Acceptance Radius）** 设置为50。拖移 **目标（Target）** 变量并将其连接到 **Move to Actor** 节点的 **目标（Goal）** 引脚。
    
    ![Connect the Is Valid pin of the Is Valid node to the Move to Actor node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00ed3a38-2ea6-4e80-b14a-b48f832f531b/custom-npc-move-to-actor-2.png)
12.  右键点击 **Move to Actor** 节点的 **筛选器类（Filter Class）** 引脚，然后选择 **提升为变量（Promote to Variable）**。转到 **细节（Details）** 面板，并启用 **可编辑实例（Instance Editable）** 复选框。
    
    ![Right-click the Filter Class pin of the Move to Actor node and select Promote to Variable](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9718ae8b-c64a-4bbd-90a8-d610a0ed8cc4/custom-npc-filter-1.png) ![Enable the Instance Editable checkbox](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/972a8b16-f565-4381-8235-f07267460dd5/custom-npc-filter-2.png)
13.  右键点击 **事件图表（Event Graph）**，然后搜索并选择 **事件开始播放（Event Begin Play）**。从 **Event Begin Play** 节点拖移，然后搜索并选择 **MoveNPC**。
    
    ![Right-click the Event Graph, then search for and select Event Begin Play](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0087936c-9dda-4b92-920d-1ec00939e34e/custom-npc-begin-play.png) ![Drag from the Event Begin Play node and search for and select MoveNPC](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be5da8c3-fe9a-4bdd-9a8a-a8da2d133190/custom-npc-begin-play-2.png)
14.  **编译（Compile）** 并 **保存（Save）** 蓝图。最终的蓝图看起来应该类似于下图。
    
    ![This is the final Blueprint Setup](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b7d738d-fc53-40a5-ae95-fa03b06ba9d0/custom-npc-completed-a.png)
15.  将 **BP\_NPC\_CustomZone** 蓝图拖放到你的关卡中。找到 **细节（Details）** 面板，点击 **目标（Target）** 旁边的下拉菜单。搜索并选择 **球体（Sphere）**，如下所示。
    
    ![Drag the BP_NPC_CustomZone Blueprint into your Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8cc4afc-68a7-4ec2-ac59-b0e071955510/custom-npc-drag-1.png) ![Navigate to the Details panel and click the dropdown next to Target. Search for and select Sphere](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ea25842-eff0-459c-af71-82d74e01c413/custom-npc-drag-2.png)
16.  按下 **模拟（Simulate）**，并观察代理向球体移动的情况。
    
    ![Your Agent is now moving towards the Sphere](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8a8865d-a802-4931-a829-c097a8e07f8a/custom-npc-walk-1.gif)

### 阶段成果

在本小节中，你创建了一个导航到其目标并可以使用导航查询筛选器的代理。你现在可以了解关于添加[自定义导航区域和查询筛选器](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-quick-start-in-unreal-engine)的信息。

-   [ai](https://dev.epicgames.com/community/search?query=ai)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-preparation-guide-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [目的](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-preparation-guide-in-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [1 - 必要设置](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-preparation-guide-in-unreal-engine#1-%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [阶段成果](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-preparation-guide-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C)
-   [2 - 创建测试关卡](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-preparation-guide-in-unreal-engine#2-%E5%88%9B%E5%BB%BA%E6%B5%8B%E8%AF%95%E5%85%B3%E5%8D%A1)
-   [阶段成果](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-preparation-guide-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-2)
-   [3 - 创建代理](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-preparation-guide-in-unreal-engine#3-%E5%88%9B%E5%BB%BA%E4%BB%A3%E7%90%86)
-   [阶段成果](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-preparation-guide-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-3)
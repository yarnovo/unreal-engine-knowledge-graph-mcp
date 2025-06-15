# 使用虚幻引擎中的寻路调用程序 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-navigation-invokers-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:43:21.597Z

---

目录

![使用寻路调用程序](https://dev.epicgames.com/community/api/documentation/image/a65bfecd-e262-45b2-a7e6-6652a68d76ed?resizing_type=fill&width=1920&height=335)

## 概述

虚幻引擎的 **寻路系统** 允许代理使用 **寻路网格体** 寻路，以在关卡中寻路。除了寻路网格体的各种 **运行时生成** 方法之外，该系统还包含仅在特定目标周围本地构建寻路的方法。

**寻路调用程序（Navigation Invokers）** 是在运行时在代理周围生成寻路网格体的蓝图Actor组件。使用寻路调用程序，就无需在编辑器中构建寻路网格体，并且还可以限制在运行时生成的图块数。

寻路调用程序非常适合大型关卡，因为在编辑器中构建寻路网格体不切实际。

## 目标

在本指南中，你会学习将寻路调用程序用于代理，在游戏过程中生成寻路网格体。

## 任务

-   创建新的关卡，并配置寻路系统以使用寻路调用程序。
    
-   将ThirdPersonCharacter蓝图修改为使用寻路调用程序在关卡中四处游走。
    

## 1 - 必要设置

1.  在虚幻项目浏览器的 **新建项目类别（New Project Categories）** 分段中，选择 **游戏（Games）> 第三人称（Third Person）** 模板。
    
    ![Select the Games and ThirdPerson category and click Next](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd74a2f2-6028-427a-abe5-35caf4703de6/create-project-a.png)
2.  选择 **蓝图（Blueprint）** 和 **无初学者内容包（No Starter Content）** 选项，然后点击 **创建（Create）**。
    
    ![Select Blueprint and No Starter Content and click Create Project](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a1f3a7a-d7d8-4274-9151-c7e4afc2b8b5/basic-create-settings-a.png)

### 阶段成果

你已创建新的第三人称项目，现在可以开始学习寻路调用程序。

## 2 - 创建测试关卡

1.  点击菜单栏中的 **文件（File） > 新建关卡（New Level）**。
    
    ![Click New Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6431a5eb-1a9f-4568-be00-86d5915ab568/new-level-a.png)
2.  选择 **基础（Basic）** 关卡。
    
    ![Select the Basic Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f66c370d-54c8-40ba-b0ed-3f8b70005cae/select-level-template-a.png)
3.  在 **世界大纲视图（World Outliner）** 中，选择 **Floor** 静态网格体Actor，并转到 **细节（Details）** 面板。将 **缩放** 设置为X = 100、Y = 100、Z = 1。
    
    ![Select the Floor Static Mesh Actor in the Outliner](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f441409-8ce9-43fc-bd03-171ad46fd609/create-floor-1.png) ![Set the Scale to X = 100, Y = 100, Z = 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93b4b668-c1ca-408f-8106-4eb7d3175416/invokers-floor-scale-a.png)
4.  点击 **设置（Settings） > 项目设置（Project Settings）**，并转到 **寻路系统（Navigation System）** 类别。启用 **仅在寻路调用程序周围生成寻路（Generate Navigation Only Around Navigation Invokers）** 复选框。
    
    ![Click Project Settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7efc5811-5916-4b7b-bfbf-49caa1d4a23b/project-settings-a.png) ![Enable the Generate Navigation Only Around Navigation Invokers checkbox](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70199876-3474-4f82-828e-3ebb240d3b24/invokers-settings-1.png)
5.  转到 **寻路网格体（Navigation Mesh）** 类别，并向下滚动到 **运行时（Runtime）** 分段。点击 **运行时生成（Runtime Generation）** 下拉列表并选择 **动态（Dynamic）**。
    
    ![Click the Runtime Generation dropdown and select Dynamic](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/572fef9e-dc6a-4a0b-95e4-077aea8deb8c/invokers-settings-2.png)
6.  转到 **放置Actor（Place Actors）** 面板，搜索 **寻路网格体边界体积（Nav Mesh Bounds Volume）**。将其拖入关卡，放置在地板网格体上。将 **寻路网格体边界体积（Nav Mesh Bounds Volume）** 缩放为X = 500、Y = 500、Z = 10。
    
    ![Drag the Nav Mesh Bounds Volume to the Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d784387-c364-404d-8565-5bd5f93d048d/invokers-nav-mesh-drag.png) ![Set the Scale to X = 500, Y=500, Z = 10](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b268f0b9-83e7-45bf-b230-6593d721e768/invokers-nav-mesh-scale.png)

### 阶段成果

在本分段中，你创建了新的关卡，并配置了寻路系统以使用寻路调用程序。

## 3 - 创建代理

1.  在 **内容侧滑菜单（Content Drawer）** 中，右键点击并选择 **新建文件夹（New Folder）**，以新建文件夹。将文件夹命名为 **NavigationSystem**。
    
2.  在 **内容侧滑菜单** 中，找到 **ThirdPerson > 蓝图（Blueprints）**，然后选择 **BP\_ThirdPersonCharacter** 蓝图。将其拖到 **NavigationSystem** 文件夹中，并选择选项 **复制到此处（Copy Here）**。
    
    ![Drag the Third Person Character Blueprint to the Navigation System folder and select Copy Here](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5ae8df9-6d0e-4490-8c3b-db9397b7e676/move-blueprint-a.png)
3.  找到 **NavigationSystem** 文件夹并将蓝图重命名为 **BP\_NPC\_Invoker**。双击打开蓝图类，然后找到 **事件图表（Event Graph）**。选择所有输入节点并将其删除。
    
4.  右键点击 **事件图表（Event Graph）**，然后搜索并选择 **添加自定义事件（Add Custom Event）**。将事件命名为 **MoveNPC**。
    
    ![Right-click the Event Graph, then search for and select Add Custom Event. Name the event Move NPC](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bac20453-6bc3-401b-8439-084a39c56c40/custom-event-a.png)
5.  右键点击 **事件图表（Event Graph）**，然后搜索并选择 **获取Actor位置（Get Actor Location）**。
    
    ![Right-click the Event Graph, then search for and select Get Actor Location](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/232b453a-dfc5-450d-8838-3b34c329a086/get-actor-location-a.png)
6.  从 **GetActorLocation** 节点拖出，然后搜索并选择 **获取半径内的随机可达点（Get Random Reachable Point In Radius）**。将 **半径（Radius）** 设置为1000。
    
    ![Drag from the Get Actor Location node and search for and select Get Random Reachable Point In Radius](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf78de22-d752-4705-912c-eddbb896eebd/get-random-a.png)
7.  从 **GetRandomReachablePointInRadius** 节点的 **随机位置（Random Location）** 引脚拖出，然后选择 **提升到变量（Promote to Variable）**。
    
    ![Drag from the Random Location pin of the Get Random Reachable Point In Radius node and select Promote to variable](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7f88fad-3013-476d-ba95-44370d82f0f9/promote-variable-a.png)
8.  将 **MoveNPC** 节点连接到刚才创建的 **RandomLocation** 节点。
    
    ![Connect the Move NPC node to the Random Location node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cbbfcf99-67b1-46ab-b13a-d04ecca26acc/move-npc-a.png)
9.  右键点击 **事件图表（Event Graph）**，然后搜索并选择 **AI移动至（AI Move To）**。将 **RandomLocation** 节点连接到 **AI Move To** 节点。
    
    ![Right-click the Event Graph, then search for and select AI Move To](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/102e43e1-6133-46ca-b5c6-b973122848fd/ai-move-to.png)
10.  右键点击 **事件图表（Event Graph）**，然后搜索并选择 **获取对自身的引用（Get a reference to self）**。
    
    ![Right-click the Event Graph, then search for and select Get a reference to self](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/597789c2-fbd1-49bc-9b16-0debc6e7c6f8/reference-self-a.png)
11.  将 **Self** 节点连接到 **AI Move To** 节点的 **Pawn** 引脚。将 **Random Location** 节点的 **黄色** 引脚连接到 **AI Move To** 节点的 **目的地（Destination）** 引脚，如下所示。
    
    ![Connect the Self node to the Pawn pin of the AI Move To node. Connect the yellow pin of the Random Location node to the Destination pin of the AI Move To node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a875208b-b87e-438b-8ce6-d4cfcc23a978/blueprints-1.png)
12.  从 **AI Move To** 节点的 **成功时（On Success）** 引脚拖出，然后搜索并选择 **延迟（Delay）**。将节点 的 **时长（Duration）** 设置为4。从 **Delay** 节点的 **已完成（Completed）** 引脚拖出，然后搜索并选择 **MoveNPC**，如下所示。
    
    ![Drag from the On Success pin of the AI Move To node and add a Delay node. Set the Duration to 4. Drag from the Duration node and add a Move NPC node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4322b19d-2b12-48d0-9679-fe4b958a3d8c/blueprints-2.png)
13.  重复上述步骤，以将这些节点添加到 **AI Move To** 节点的 **失败时（On Fail）** 引脚。将 **Delay** 节点的 **时长（Duration）** 设置为0.1。
    
    ![Repeat the steps above to add these nodes to the On Fail pin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32c9dc5e-9bd5-4199-8d6c-31c50be1161a/blueprints-3.png)
14.  右键点击 **事件图表（Event Graph）**，然后搜索并选择 **事件开始播放（Event Begin Play）**。从 **Event Begin Play** 节点拖出，然后搜索并选择 **MoveNPC**。
    
    ![Right-click the Event Graph, then search for and select Event Begin Play](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ffb8db1-cec0-4e52-ab1d-a73566a69872/begin-play-a.png) ![Drag from the Event Begin Play node, then search for and select Move NPC](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2864385b-646f-438c-a9f8-725ae0c9b3b2/move-npc-a.png)
15.  转到 **组件（Components）** 选项卡，点击 **添加组件（Add Component）** 下拉列表，然后搜索并选择 **寻路调用程序（Navigation Invoker）**。
    
    ![Go to the Components tab, click the Add Component dropdown, then search for and select Navigation Invoker](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4dd2afb0-d620-4e33-b6d6-3c56a689dd35/invokers-npc-nav-invoker.png)
16.  选择 **寻路调用程序（Navigation Invoker）** 组件之后，转到 **细节（Details）** 面板，并查找 **寻路（Navigation）** 分段。此处，你可以更改 **图块生成半径（Tile Generation Radius）**（用于生成寻路网格体图块的Actor周围的半径）和 **图块移除半径（Tile Removal Radius）**（用于移除寻路网格体图块的Actor周围的半径）。对于本示例，分别将这些值设置为 **3000** 和 **5000**。
    
    ![Set the Tile Generation Radius to 3000 and the Tile Removal Radius to 5000](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d35e143c-1e02-4d09-9a5a-ad299f8f3a71/invokers-npc-nav-ivoker-2.png)
17.  **编译（Compile）** 并 **保存（Save）** 蓝图。
    
18.  将多个 **BP\_NPC\_Invoker** 蓝图拖到关卡中，并点击 **模拟（Simulate）** 以查看寻路在每个代理周围的生成情况。
    
    ![Drag several BP_NPC_Invoker Blueprints to your Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e41275c8-bedb-4894-95d0-be8122ce52e0/invokers-npc-drag-a.png)
    
    如果看不到寻路，请按键盘上的P键以可视化寻路网格体。
    
    ![Your Agents are now moving in the Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98551cf5-1eea-49de-98e5-fa69e8630763/invokers-agents-walking-a.gif)

### 阶段成果

在本小节中，你创建了一个在关卡中四处游走的代理，并使用"寻路调用程序"组件在代理自身周围构建了寻路网格体。

-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [navigation](https://dev.epicgames.com/community/search?query=navigation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/using-navigation-invokers-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [目标](/documentation/zh-cn/unreal-engine/using-navigation-invokers-in-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [任务](/documentation/zh-cn/unreal-engine/using-navigation-invokers-in-unreal-engine#%E4%BB%BB%E5%8A%A1)
-   [1 - 必要设置](/documentation/zh-cn/unreal-engine/using-navigation-invokers-in-unreal-engine#1-%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [阶段成果](/documentation/zh-cn/unreal-engine/using-navigation-invokers-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C)
-   [2 - 创建测试关卡](/documentation/zh-cn/unreal-engine/using-navigation-invokers-in-unreal-engine#2-%E5%88%9B%E5%BB%BA%E6%B5%8B%E8%AF%95%E5%85%B3%E5%8D%A1)
-   [阶段成果](/documentation/zh-cn/unreal-engine/using-navigation-invokers-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-2)
-   [3 - 创建代理](/documentation/zh-cn/unreal-engine/using-navigation-invokers-in-unreal-engine#3-%E5%88%9B%E5%BB%BA%E4%BB%A3%E7%90%86)
-   [阶段成果](/documentation/zh-cn/unreal-engine/using-navigation-invokers-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-3)
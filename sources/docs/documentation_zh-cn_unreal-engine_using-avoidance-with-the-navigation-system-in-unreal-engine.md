# 在虚幻引擎寻路系统中使用避障机制 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-avoidance-with-the-navigation-system-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:43:01.616Z

---

目录

![在寻路系统中使用避障机制](https://dev.epicgames.com/community/api/documentation/image/d9ebd34b-b61e-4248-88fe-0b5ae5311ec1?resizing_type=fill&width=1920&height=335)

## 概述

**虚幻引擎的** **寻路系统（Navigation System）** 可以借助 **寻路网格体（Navigation Mesh）** 让代理（Agent）在关卡中实现寻路。

寻路机制可以在静态对象周围生成路径，而避障算法主要用于处理移动障碍物。AI代理有两种方法来绕开移动障碍物，或在彼此间避障，分别是 **相对速度障碍物算法（Reciprocal Velocity Obstacles，即RVO）** 和 **群组绕行管理器（Detour Crowd Manager）**。

**相对速度障碍物算法** 系统会计算每个代理的速度向量，避免和附近的其他代理碰撞。该系统会查看附近的代理，并假定它们在计算的每一步内都以恒速移动。根据代理向目标移动的速度，会选择最佳的速度向量进行匹配。

虚幻引擎中的RVO系统进行了优化，减少所需的帧率要求。其他的优化项还有避免重复计算恒定路径，并提供优先级系统来解决可能的碰撞。RVO不使用寻路网格体进行避障，因此它无需寻路系统即可用于代理。该系统包含在角色类的 **角色移动（Character Movement）** 组件中。

**群组绕行管理器（Detour Crowd Manager）** 系统通过自适应RVO采样计算来解决代理之间的规避问题。它会计算一个粗略的速度采样，并且着重在代理的移动方向，相较于传统的RVO规避方式，显著提升规避性能。该系统还使用可见度和拓扑路径优化项，进一步提升碰撞规避。

群组绕行管理器系统可以高度配置特定示例模式选项、最大代理数和代理半径。该系统包括在 **群组绕行AI控制器（DetourCrowd AI Controller）** 类中，可以和任意Pawn类一起使用。

两种系统各自独立工作，在你的项目中只能使用其中一种。

### 进一步对比避障方式

方法

描述

局限性

相对速度障碍物算法

-   代理使用特定半径内的速度向量规避障碍物。
-   包含在角色类的角色移动（Character Movement）组件中。

-   相较于群组绕行管理器更难配置。
-   仅限于角色类中。
-   不使用寻路网格体进行规避，因此代理可能会任性地"出走"。

群组绕行管理器

-   代理通过路径优化和特定半径内的速度向量规避障碍物。
-   包含在群组绕行AI控制器（DetourCrowd AI Controller）类中。| 在项目设置中定义了固定的最大代理数量。

-   在项目设置中定义了固定的最大代理数量。

## 目标

在本指南中，你可以通过比较多个代理的交互行为，了解如何使用相对速度障碍物算法和群组绕行管理器这两种规避方式。

## 任务

-   调整第三人称角色蓝图（ThirdPersonCharacter Blueprint），以便导航至目标。
    
-   调整代理蓝图（Agent Blueprint），以便使用RVO规避。
    
-   调整代理蓝图，以便使用群组绕行规避。
    

## 1 - 所需设置

1.  在虚幻项目浏览器的 **新项目类型（New Project Categories）** 分段中，选择 **游戏（Games）> 第三人称（Third Person）** 模板。
    
    ![Select the Games category and click Next](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40f5d432-e5d3-446f-a3f8-cd0257fcddc6/create-project-a.png)
2.  选择 **蓝图（Blueprint）** 和 **不带初学者内容包（No Starter Content）** 并点击 **创建（Create）**。
    
    ![Select Blueprint and No Starter Content and click Create Project](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3dde442-4d05-4951-8f4b-72eb227399cf/basic-create-settings-a.png)

### 阶段成果

你创建了一个新的第三人称游戏项目，以便继续了解虚幻引擎中提供的避障方式。

## 2 - 创建测试关卡

1.  点击菜单栏上的 **文件>新建关卡（File > New Level）**。
    
    ![Click New Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3293e1e9-5be3-4ce9-a9ee-a15b9a5801bb/new-level-a.png)
2.  选择 **默认（Default）** 关卡。
    
    ![Select the Default Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aed40bf0-79ce-4b6e-b820-3d0ae5267489/select-level-template-a.png)
3.  在 **大纲视图（Outliner）** 中选择 **Floor** 静态网格体Actor，在下方的 **细节（Details）** 面板中，将 **缩放（Scale）** 设置为X = 10, Y = 10, Z = 1。
    
    ![Select the Floor Static Mesh Actor in the World Outliner](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6b40294-94e4-4fcf-8d44-31ddb47a4aff/create-floor-1.png) ![Set the Scale to X = 10, Y = 10, Z = 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/208a7d51-3f3e-4a30-b3be-af9deff0b76f/create-floor-2.png)
4.  来到 **放置Actor（Place Actors）** 面板，找到 **导航网格体边界体积（Nav Mesh Bounds Volume）**。将它拖拽到关卡中并放置在地面网格体（floor mesh）上。将 **导航网格体边界体积** 的缩放调整至X = 7, Y=10, Z = 1。
    
    ![Drag a Nav Mesh Bounds Volume Actor to the Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/daeae481-ef5d-4cbf-82e7-2a1ba3523730/custom-nav-mesh-drag.png) ![Scale the Nav Mesh Bounds Volume to X = 7, Y=10, Z = 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/782ff49d-c8a1-4c85-a63c-08d835dbe096/avoid-nav-mesh-scale.png)
5.  来到 **放置Actor（Place Actors）** 面板，从 **形状（Basic）** 分类中拖拽两个 **球体（Sphere）** Actor到关卡中。
    
    ![Drag two Sphere Actors into the Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7afb0edc-41f5-4d1b-8a5a-10859846f563/avoid-sphere-drag-a.png)

### 阶段成果

在这一部分中，你创建了一个新的关卡，并添加了寻路网格体。你还添加了两个球体Actor，它们将会作为代理的移动目标。

## 3 - 创建代理

1.  在 **内容侧滑菜单（Content Drawer）** 中，右键点击选择 **新建文件夹（New Folder）** 来创建一个新的文件夹，并将它命名为 **寻路系统（NavigationSystem）**。
    
2.  在 **内容侧滑菜单（Content Drawer）** 中，找到 **ThirdPerson > Blueprints** 并选择 **BP\_ThirdPersonCharacter** 蓝图。将其拖拽到 **寻路系统（NavigationSystem）** 文件夹中并选择 **复制到这里（Copy Here）**。
    
    ![Drag the Third Person Character Blueprint to the Avoidance folder and select Copy Here](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7eff5fa2-2b53-418f-89df-b58aca8620db/move-blueprint-a.png)
3.  打开 **寻路系统（NavigationSystem）** 文件夹，将蓝图重命名为**BP\_NPC\_NoAvoidance**。双击打开蓝图并找到 **事件图表（Event Graph）**。选择并删除所有输入节点。
    
4.  右击 **事件图表**，找到并选择 **添加自定义事件（Add Custom Event）**。将该事件命名为 **移动NPC（MoveNPC）**。
    
    ![Right-click the Event Graph, then search for and select Add Custom Event. Name the event Move NPC](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/539d60d2-9a5d-410d-ab05-80c354a732d8/custom-event-a.png)
5.  找到 **我的蓝图（My Blueprint）** 面板，点击 **变量（Variables）** 旁边的 **添加（Add）加号** 按钮创建一个新的变量。将该变量命名为 **目标（Target）**。
    
    ![Click the Add button next to Variables to create a new variable. Name the variable Target](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c942ccb-422e-4a71-a9f3-5f59834e1d1f/custom-npc-target-1.png)
6.  来到 **细节（Details）** 面板，点击 **变量类型（Variable Type）** 出现下拉菜单。搜索 **Actor** 并选择 **对象引用（Object Reference）**。勾选 **可编辑示例（Instance Editable）** 复选框。
    
    ![Set the Variable Type to Actor Object Reference](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06ff3975-d41f-4740-8a1c-62c93a785f3e/custom-npc-target-2.png) ![Enable the Instance Editable checkbox](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c564c3da-f6b3-475a-933d-8096e33013e5/custom-npc-target-3.png)
7.  将 **目标（Target）** 变量拖拽到 **事件图表（Event Graph）** 中并选择 **获取目标（Get Target）**。拖拽 **目标（Target）** 节点，然后搜索并选择 **是否有效（Is Valid）** 指令，如下图所示。
    
    ![Drag from the Target node, then search for and select the Is Valid macro](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97efcc8a-2d75-4668-8296-0827e0acaeb2/custom-npc-is-valid.png)
8.  右击 **事件图表（Event Graph）**，搜索并选择 **获得一个对自身的引用（Get reference to self）**。
    
    ![Right-click the Event Graph, then search for and select Get reference to self](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7053503f-e33a-438b-8a7a-794666dae22b/custom-npc-self-a.png)
9.  右击 **事件图表（Event Graph）**然后搜索并选择 **AI移动至（AI Move To）**。
    
    ![Right-click the Event Graph, then search for and select AI Move To](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1adc5288-c01e-408d-9340-ad8792db671d/avoid-npc-ai-move-to.png)
10.  将 **是否有效（Is Valid）** 节点的 **是否有效（Is Valid）** 引脚和 **AI移动至（AI Move To）** 节点连接起来。接着，将 **自身（Self）** 节点和 **AI移动至（AI Move To）** 节点的 **Pawn** 引脚连接起来。拖拽 **目标（Target）** 变量并和 **AI移动至（AI Move To）** 节点的 **目标Actor（Target Actor）** 引脚连接。
    
    ![Connect the Is Valid node to the AI Move To node. Connect the Target variable to the AI Move To node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09684e33-29e3-42dc-bdfb-64620768ba4a/avoid-npc-ai-move-to-2.png)
11.  右键点击 **事件图表（Event Graph）**，搜索并选择 **事件开始运行（Event Begin Play）**。从 **事件开始运行（Event Begin Play）** 节点拖拽，搜索并选择 **移动NPC（MoveNPC）**。
    
    ![Right click the Event Graph, then search for and select Event Begin Play](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/371f2971-1bce-4c6e-8437-5889ccb9ee6c/custom-npc-begin-play.png) ![Drag from the Event Begin Play node, then search for and select Move NPC](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83a5be76-2c93-4af5-8822-5899f943fc23/custom-npc-begin-play-2.png)
12.  **编译（Compile）** 并 **保存（save）** 蓝图。最终的蓝图效果如下所示。
    
    ![This is the final Blueprint setup](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fbcd4bf4-fb71-4918-815f-b14158d45b3f/custom-npc-completed-a.png)
13.  将 **BP\_NPC\_NoAvoidance** 蓝图拖拽到关卡中。在 **细节（Details）** 面板中，打开 **目标（Target），** 旁边的下拉菜单，搜索并选择代理前方的那个 **球体（Sphere）** Actor。
    
    ![Drag the BP_NPC_NoAvoidance Blueprint into your Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29ab0e2a-ba42-469f-afe9-bf1df0261000/avoid-npc-drag-1.png) ![Click the dropdown next to Target, then search for and select the Sphere Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/139d2451-4956-424b-bb07-10287f6f527f/avoid-npc-drag-2.png)
14.  复制 **BP\_NPC\_NoAvoidance** 蓝图，如下所示。
    
    ![Duplicate the BP_NPC_NoAvoidance Blueprint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2da13f35-73fb-483f-9180-59fb6cb04ea7/avoid-npc-drag-3.png)
15.  重复最后两个步骤，在关卡另一边创建一组代理，并将放置在它们前面的 **球体（sphere）** 作为目标。
    
16.  点击 **模拟（Simulate）** 查看代理如何寻路至目标。注意观察没有避障系统时是如何在关卡中心创建碰撞的。
    
    ![Click Simulate and watch as the Agents navigate toward their goals](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01c27283-390e-486f-809e-9973cbeaeeb5/avoid-npc-walk-no-avoidance.gif)

### 阶段目标

在这一部分中，你创建了一个没有使用避障系统寻路至目标的代理。

## 4 - 向代理添加相对速度障碍物算法

1.  在 **内容侧滑菜单（Content Drawer）** 中，右键点击 **BP\_NPC\_NoAvoidance** 蓝图并选择 **复制（Duplicate）**。将新蓝图命名为 **BP\_NPC\_RVO**。
    
    ![Duplicate the BP_NPC_NoAvoidance Blueprint and name it BP_NPC_RVO](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74bef287-e463-4eca-8992-216fe370dee5/avoid-npc-rvo-duplicate-a.png)
2.  双击 **BP\_NPC\_RVO** 蓝图并在蓝图编辑器中打开。选择 **角色移动（Character Movement）** 组件，并且在 **细节（Details）** 面板中，找到 **角色移动：避障（Character Movement: Avoidance）** 分段。
    
    ![Select the Character Movement component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ad7b90e-0523-4128-b9c3-c1a4c40981ac/avoid-npc-rvo-select-component.png) ![Go to the Avoidance section](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72e983e6-ab5d-4efa-b524-862c79bf1d73/avoid-npc-rvo-settings-1.png)
3.  勾选 **使用RVO避障（Use RVOAvoidance）** 复选框，将 **避障考虑半径（Avoidance Consideration Radius）** 调整为 **100**。
    
    ![Enable the Use RVOAvoidance checkbox and set Avoidance Consideration Radius to 100](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8768ff5-4f80-4a2f-b3b3-b93ee703ec53/avoid-npc-rvo-settings-2.png)
4.  **编译（Compile）** 并 **保存（save）** 该 **蓝图**。这样，你的代理就可以使用相对速度障碍物避障了。
    
5.  将多个 **BP\_NPC\_RVO** 蓝图拖拽到你的关卡中，并按照之前的步骤进行相同的配置。点击 **模拟（Simulate）** 查看结果。
    
    ![Drag several BP_NPC_RVO Blueprints to your Level and follow the same configuration as before](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/666c83e7-55e8-4f26-8eb6-a3542d78e402/avoid-npc-walk-rvo-a.gif)

### 阶段成果

在这一部分中，你学习了如何向代理应用相对速度障碍物避障（RVO）。

## 5 - 向代理应用群组绕行避障

1.  在 **内容侧滑菜单（Content Drawer）** 中，右键点击 **BP\_NPC\_NoAvoidance** 蓝图并选择 **复制（Duplicate）**。将新蓝图命名为 **BP\_NPC\_DetourCrowd**。
    
    ![Duplicate the BP_NPC_NoAvoidance Blueprint and name it BP_NPC_DetourCrowd](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4303625b-8d37-4406-b33f-3418a7a66829/avoid-npc-rvo-duplicate-a.png)
2.  双击打开 **BP\_NPC\_DetourCrowd** 。在 **细节（Details）** 面板中搜索 **AI控制器（AI Controller）**。
    
    ![Go to the Details panel and search for AI Controller](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67d90e71-b7bf-40de-a3d2-dd661851a278/avoid-npc-detour-controller-1.png)
3.  打开 **AI控制器类（AI Controller Class）** 旁边的下拉菜单，选择 **群组绕行AI控制器（DetourCrowdAIController）**。
    
    ![Click the dropdown next to AI Controller Class and select Detour Crowd AI Controller](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce9b9b67-b155-4ab9-ad97-7c7cf2ec1153/avoid-npc-detour-controller-2.png)
4.  **编译（Compile）** 并 **保存（save）** 蓝图。这样，你的代理就可以使用群组绕行避障了。
    
5.  将几个 **BP\_NPC\_DetourCrowd** 蓝图拖拽到你的关卡中，并按照之前的步骤进行相同的配置。点击 **模拟（Simulate）** 查看结果。
    
    ![Drag several BP_NPC_DetourCrowd Blueprints to your Level and follow the same configuration as before](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b82e25f-0847-4495-959a-032d93a02038/avoid-npc-walk-detour-a.gif)
6.  你可以在 **设置>项目设置（Settings > Project Settings）** 中找到 **群组管理器（Crowd Manager）** ，调整 **群组绕行管理器（Detour Crowd Manager）** 设置。
    
    ![Click Project Settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c92f302-17a0-4caa-bd3a-753e5a07001e/avoid-project-settings-1.png)
7.  在这一部分中，你可以调整 **群组绕行管理器（Detour Crowd Manager）** 系统中的一些设置，例如系统使用的 **最大代理数（Max Agents）** 以及用于避障计算的 **最大代理半径（Max Agent Radius）**。
    
    ![In this section you can adjust several settings for the Detour Crowd Manager system](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e84d280c-e614-453c-b727-d61b7de84814/avoid-project-settings-2.png)

## 阶段成果

在这一部分中，你学习了如何向代理应用群组绕行避障。

-   [ai](https://dev.epicgames.com/community/search?query=ai)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/using-avoidance-with-the-navigation-system-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [进一步对比避障方式](/documentation/zh-cn/unreal-engine/using-avoidance-with-the-navigation-system-in-unreal-engine#%E8%BF%9B%E4%B8%80%E6%AD%A5%E5%AF%B9%E6%AF%94%E9%81%BF%E9%9A%9C%E6%96%B9%E5%BC%8F)
-   [目标](/documentation/zh-cn/unreal-engine/using-avoidance-with-the-navigation-system-in-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [任务](/documentation/zh-cn/unreal-engine/using-avoidance-with-the-navigation-system-in-unreal-engine#%E4%BB%BB%E5%8A%A1)
-   [1 - 所需设置](/documentation/zh-cn/unreal-engine/using-avoidance-with-the-navigation-system-in-unreal-engine#1-%E6%89%80%E9%9C%80%E8%AE%BE%E7%BD%AE)
-   [阶段成果](/documentation/zh-cn/unreal-engine/using-avoidance-with-the-navigation-system-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C)
-   [2 - 创建测试关卡](/documentation/zh-cn/unreal-engine/using-avoidance-with-the-navigation-system-in-unreal-engine#2-%E5%88%9B%E5%BB%BA%E6%B5%8B%E8%AF%95%E5%85%B3%E5%8D%A1)
-   [阶段成果](/documentation/zh-cn/unreal-engine/using-avoidance-with-the-navigation-system-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-2)
-   [3 - 创建代理](/documentation/zh-cn/unreal-engine/using-avoidance-with-the-navigation-system-in-unreal-engine#3-%E5%88%9B%E5%BB%BA%E4%BB%A3%E7%90%86)
-   [阶段目标](/documentation/zh-cn/unreal-engine/using-avoidance-with-the-navigation-system-in-unreal-engine#%E9%98%B6%E6%AE%B5%E7%9B%AE%E6%A0%87)
-   [4 - 向代理添加相对速度障碍物算法](/documentation/zh-cn/unreal-engine/using-avoidance-with-the-navigation-system-in-unreal-engine#4-%E5%90%91%E4%BB%A3%E7%90%86%E6%B7%BB%E5%8A%A0%E7%9B%B8%E5%AF%B9%E9%80%9F%E5%BA%A6%E9%9A%9C%E7%A2%8D%E7%89%A9%E7%AE%97%E6%B3%95)
-   [阶段成果](/documentation/zh-cn/unreal-engine/using-avoidance-with-the-navigation-system-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-3)
-   [5 - 向代理应用群组绕行避障](/documentation/zh-cn/unreal-engine/using-avoidance-with-the-navigation-system-in-unreal-engine#5-%E5%90%91%E4%BB%A3%E7%90%86%E5%BA%94%E7%94%A8%E7%BE%A4%E7%BB%84%E7%BB%95%E8%A1%8C%E9%81%BF%E9%9A%9C)
-   [阶段成果](/documentation/zh-cn/unreal-engine/using-avoidance-with-the-navigation-system-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-4)
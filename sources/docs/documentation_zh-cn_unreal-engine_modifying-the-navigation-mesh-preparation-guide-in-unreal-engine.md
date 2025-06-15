# 关于修改虚幻引擎导航系统的准备指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/modifying-the-navigation-mesh-preparation-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:42:56.778Z

---

目录

![关于修改导航系统的准备指南](https://dev.epicgames.com/community/api/documentation/image/45c4ba7f-e6be-4823-8146-a80c6edc2321?resizing_type=fill&width=1920&height=335)

## 概述

本文档将指导你完成创建关卡和AI代理的初步步骤，以演示可以修改导航系统的不同方法。

或者，也可以下载[完整示例项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/d072fb01-ab85-449e-84df-8dc27bb9c375/navsystemsample.zip)，其中包含本指南所涵盖的所有资料。

## 目的

-   创建简单关卡，并通过在关卡中放入导航网格体边界体积Actor来添加导航。
    
-   将ThirdPersonCharacter蓝图修改为使用导航系统在关卡中四处游走。
    

## 1 - 必要设置

1.  在菜单的 **新建项目类别（New Project Categories）** 分段中，选择 **游戏（Games） > 第三人称（Third Person）** 模板。
    
    ![Select the Games category and select Games and the Third Person template](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/883b169d-71ff-44b8-b38d-aa0b79276ffb/create-project.png)
2.  选择 **第三人称（Third Person）** 模板，然后点击 **下一步（Next）**。
    
    ![Select Blueprint and No Starter Content and click Create ](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9dd603c-2cf7-44a1-a9f0-2e79c17bc0bb/basic-create-settings.png)

### 阶段成果

你已创建新的第三人称项目，现在可以开始使用导航网格体构建基本关卡。

## 2 - 创建测试关卡

1.  点击菜单栏上的 **文件（File）>新关卡（New Level）**。
    
    ![Create a new Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d756a48-a809-4132-a285-89d537feacd6/mod-new-level.png)
2.  选择 **基本（Basic）** 关卡并点击 **创建（Create）** 。
    
    ![Select the Basic Level and click Create](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be4e8b26-dba1-4099-a8d9-ade65593df78/mod-new-level-2.png)
3.  在 **大纲视图（Outliner）** 中，选择 **Floor** 静态网格体Actor，并从 **细节（Details）** 面板，将 **缩放（Scale）** 设置为X = 10、Y = 10、Z = 1。
    
    ![Select the Floor Static Mesh Actor in the World Outliner](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af5ded30-01c0-407b-b44c-9898a55472f3/mod-level-floor-selected.png) ![Set the Scale to X = 10, Y = 10, Z = 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f6ac487-6b7d-449b-b386-cbb54d0230ef/mod-level-floor-selected-2.png)
4.  在 **内容浏览器（Content Browser）** 中，转到 **关卡原型（LevelPrototyping） > 网格体（Meshes）**，并将 **TemplateFloor** 静态网格体拖到关卡中。
    
    ![Drag the Template Floor Static Mesh into the Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8f8ca51-5702-439f-b1c7-5ddea85b4c63/mod-level-drag-template-floor.png)
5.  转到 **放置Actor（Place Actors）** 面板，搜索 **导航网格体边界体积（Nav Mesh Bounds Volume）**。将其拖到关卡中，并放在地板网格体上方。
    
    ![Drag the Nav Mesh Bounds Volume to the Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/abefa310-cae4-4b12-a821-ec729fa17ff5/mod-level-nav-bounds-drag.png)
6.  选择 **导航网格体边界体积（Nav Mesh Bounds Volume）** 后，转到 **细节（Details）** 面板，将 **缩放（Scale）** 设置为X = 20、Y= 20、Z = 5，以覆盖整个地板区域。默认情况下，虚幻引擎将自动在导航边界内生成导航。Navmesh Actor **RecastNavMesh-Default** 应该也已添加到关卡中。按 **P** 键以在关卡中可视化导航网格体。
    
    如果未生成导航，请转到"项目设置（Project Settings） > 导航系统（Navigation System）"，并启用"自动创建导航数据（Auto Create Navigation Data）"复选框。
    
    ![Set the Scale to X = 20, Y = 20, Z = 5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/deac28e6-167b-4285-a78f-0852267afe26/mod-level-nav-bounds-scale.png) ![The Navigation Mesh now covers the entire floor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba6e22bf-237a-4b50-af39-d887b0fb6e0f/mod-level-nav-bounds-p.png)
7.  转到 **放置Actor（Place Actors）** 面板，在 **基本（Basic）** 类别下，将 **立方体（Cube）** 静态网格体 Actor拖到关卡中。
    
    ![Drag the Cube Static Mesh Actor into your Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20e791f6-ad20-42d7-8a87-2871c6dfc1b6/mod-level-cube-drag.png)
8.  选择 **立方体（Cube）** 之后，转到 **细节（Details）** 面板，将 **缩放（Scale）** 设置为X=1、Y=1、Z=5。
    
    ![Set the Scale to X = 1, Y = 1, Z = 5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25b2856f-772e-4538-8310-0db3bf6c9379/mod-level-cube-scale.png) ![The Cube is now rescaled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/804b243e-537c-47cc-a249-46ad23354208/mod-level-cube-scale-2.png)
9.  将另外三个 **立方体** 拖到关卡中，并按上述立方体的参数进行缩放。将其放在地板四周，创建四个支柱，如下所示。
    
    ![Drag three more Cubes into the level and scale them like the one above](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c172480d-1ff0-40ea-b027-89e3afb69bf3/mod-level-pillars.png)
10.  接下来，在中间添加一段楼梯和一个平台。在 **内容浏览器（Content Browser）** 中，转到 **第三人称（ThirdPerson） > 网格体（Meshes）**，并将 **Linear\_Stair\_StaticMesh** 拖到关卡中。
    
    ![Add a stair and a platform in the middle](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1f8f1b9-2ddc-47e2-b020-a6efe9f22294/mod-level-stairs-drag.png)
11.  选择楼梯之后，转到 **细节（Details）** 面板，将 **缩放（Scale）** 设置为X=1. 5、Y=1、Z=1. 3。
    
    ![Set the Scale to X = 1.5, Y = 1, Z = 1.3](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a281531-6aa3-45af-987c-ccfc0e27df65/mod-level-stairs-scale.png)
12.  选择楼梯之后，按住 **Alt** 键的同时拖动网格体以进行复制。
    
    ![Duplicate the stairs mesh](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6552d63d-3f75-41de-a28a-22e9fa258a7a/mod-level-stairs-duplicate.png)
13.  转到 **放置Actor（Place Actors）** 面板，在 **形状（Shapes）** 类别下，将 **立方体（Cube）** 静态网格体 Actor拖到关卡中。转到 **细节（Details）** 面板，将 **缩放（Scale）** 设置为X = 14、Y= 4、Z = 0.1。将Actor放在楼梯边缘以创建平台，如下所示。
    
    ![Drag a Cube Static Mesh Actor into your Level and set the scale to X = 14, Y = 4, Z = 0.1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04be306c-8a17-4e11-a107-c1ea9c8515bf/mod-level-bridge.png)
14.  转到 **放置Actor（Place Actors）** 面板，在 **基本（Basic）** 类别下，将 **球体（Sphere）** 静态网格体 Actor拖到关卡中。
    
    ![Drag a Sphere Static Mesh Actor into your Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48378306-1c30-4ea4-92d2-f393e82007fe/mod-level-goal-drag.png)
15.  选择 **球体** 之后，转到 **细节（Details）** 面板，并从 **碰撞（Collision）** 分段，将 **碰撞预设（Collision Presets）** 设置为 **无碰撞（No Collision）**。
    
    ![Set the Collision Presets to No Collision](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b5f5319-3538-493d-bf60-b0164fcae144/mod-level-goal-collision.png)
16.  最后，复制球体，并将其放在关卡中的四周，如下所示。
    
    ![Duplicate the spheres and place them around your Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ec00cec-51ef-4c8e-a2eb-14843bb15b5b/mod-level-goal-duplicate.png)

### 阶段成果

在本分段中，你创建了一个简单的关卡，并添加了一个导航网格体边界体积。你还添加了五个球体，用于充当代理的目标Actor。

## 3 - 创建代理

在本分段中，你将创建一个将在一系列目标Actor之间移动的AI代理。

1.  在 **内容浏览器（Content Drawer）** 中，右键点击并选择 **新建文件夹（New Folder）**，以新建文件夹。将文件夹命名为 **NavigationSystem**。
    
2.  在 **内容浏览器中**，转到 **ThirdPersonBP > 蓝图（Blueprints）**，然后选择 **ThirdPersonCharacter** 蓝图。将其拖到 **NavigationSystem** 文件夹中，并选择选项 **复制到此处（Copy Here）**。
    
    ![Copy the Third Person Character Blueprint to the Navigation System folder](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f82601f0-9476-490c-8bb9-d86491ff34c1/drag-blueprint.png)
3.  转到 **NavigationSystem** 文件夹并将蓝图重命名为 **BP\_NPC\_ModNavMesh**。双击蓝图在蓝图编辑器中将其打开，并转到 **事件图表（Event Graph）**。选择所有输入节点并将其删除。
    
4.  右键点击 **事件图表（Event Graph）**，然后搜索并选择 **添加自定义事件（Add Custom Event）**。将事件命名为 **MoveNPC**。
    
    ![Right click the Event Graph, then search for and select Add Custom Event. Name it Move NPC](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e4a15af-1a84-472d-b3f4-3cb34054c2b7/add-custom-event.png)
5.  转到 **我的蓝图（My Blueprint）** 面板，然后点击 **变量（Variables）** 旁边的 **加号(+)** 按钮创建新变量。将变量命名为 **TargetList**。
    
    ![Create a new variable and name it Target List](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5b22d64-e5ee-4f90-bd1d-91bad967bf18/mod-npc-target-list-create.png)
6.  转到 **细节（Details）** 面板并点击 **变量类型（Variable Type）** 旁边的下拉列表。搜索并选择 **Actor > 对象引用（Object Reference）**。
    
    ![Set the variable type to Actor Object Reference](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2387b8e-ae1e-41c0-8f24-54bb0bb28b14/mod-npc-target-list-actor.png)
7.  点击Actor选择旁边的 **蓝色球体** 图标，然后点击 **数组（Array）** 选项，如下所示。点击 **实例可编辑（Instance Editable）** 复选框将其启用。
    
    ![Click the blue sphere icon next to Actor selection and click the Array option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd8fa876-c863-4171-9f67-41db7a6e37a2/mod-npc-target-list-array.png) ![Click the Instance Editable checkbox to enable it](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb868d9d-4748-4a3d-88b1-8b09e9aa3ed2/mod-npc-target-list-public.png)
8.  将 **TargetList** 变量拖动到 **事件图表（Event Graph）**，然后选择选项 **Get TargetList**。
    
9.  从 **TargetList** 节点拖出，然后搜索并选择 **上一个索引（Last Index）**。
    
    ![Drag from the TargetList node, then search for and select Last Index](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f25b69c8-2002-4326-a05a-af8c21ca6783/mod-npc-target-list-last-index.png)
10.  从 **TargetList** 节点拖出，然后搜索并选择 **Get (a copy)**。
    
    ![Drag from the TargetList node and search for and select Get a copy](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9d6578d-b524-4b4a-8f66-1bfa26aeacc0/mod-npc-target-list-get-copy.png)
11.  从 **Get** 节点的 **绿色** 引脚拖出，然后搜索并选择 **区间内的随机整数（Random Integer in Range）**。将 **Last Index** 节点的 **绿色** 引脚连接到 **Random Integer in Range** 节点，如下所示。
    
    ![Drag from the green pin of the Get node, then search for and select Random Integer in Range](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55587de4-01e0-40e7-8c3d-3432e432a1cd/mod-npc-random-int.png) ![Connect the green pin of the Last Index node to the Max pin of the Random Integer in Range node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9bc38109-45e8-44aa-a69a-7055efe08c93/mod-npc-random-int-2.png)
12.  从 **Get** 节点拖出，然后搜索并选择 **提升到变量（Promote to variable）**。将变量命名为 **CurrentTarget**，并将其连接到 **MoveNPC** 节点。
    
    ![Drag from the Get node, then search for and select Promote to variable](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e4410db-680f-4e9d-9b53-62f1a07b4fb3/mod-npc-curr-target.png) ![Name the variable Current Target and connect it to the Move NPC node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a8e90dd-d99c-4e3a-a477-8d3754784863/mod-npc-curr-target-2.png)
13.  从 **CurrentTarget** 节点拖出，然后搜索并选择 **有效（Is Valid）**。将 **IsValid** 宏节点连接到 **Set CurrentTarget** 节点。
    
    ![Drag from the CurrentTarget node, then search for and select Is Valid](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5dbf6109-e479-4ef4-9662-5bcecf8ca6d3/mod-npc-is-valid.png) ![Connect the IsValid macro node to the Set CurrentTarget node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/527f89e3-e337-4644-b294-d8d6400b00f0/mod-npc-is-valid-2.png)
14.  将 **CurrentTarget** 变量拖动到 **事件图表（Event Graph）** 中，然后选择 **获取当前目标（Get Current Target）**。从 **CurrentTarget** 节点拖出，然后搜索并选择 **获取Actor位置（Get Actor Location）**。
    
    ![Drag from the CurrentTarget node, then search for and select Get Actor Location](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a23bec77-80ef-4884-828f-94272e37e12b/mod-npc-get-location.png)
15.  从 **GetActorLocation** 节点的 **返回值（Return Value）** 拖出，然后搜索并选择 **获取半径内的随机可达点（Get Random Reachable Point In Radius）**。将 **半径（Radius）** 设置为 **100**。
    
    ![Drag from the Return Value of the GetActorLocation node, then search for and select Get Random Reachable Point In Radius](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32b3ed57-889f-44ab-bc09-6a320963dc7f/mod-npc-get-random-point.png) ![Set the Radius value to 100](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/359c934f-efa3-424c-9041-782d3ad28132/mod-npc-get-random-point-2.png)
16.  从 **GetRandomReachablePointInRadius** 节点的 **随机位置（Random Location）** 引脚拖出，然后选择 **提升到变量（Promote to Variable）**。将变量命名为 **RandomLocation**。将 **RandomLocation** 节点连接到 **IsValid** 节点，如下所示。
    
    ![Drag from the Random Location pin of the GetRandomReachablePointInRadius node and select Promote to variable. Name the variable Random Location](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/241ba9e3-a4ee-4d85-a49d-bb615581818c/mod-npc-random-location.png) ![Connect the RandomLocation node to the IsValid node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd2f3a52-8e4e-4bdb-9b3c-ceeab567d041/mod-npc-random-location-2.png)
17.  从 **RandomLocation** 节点拖出，然后搜索并选择 *\*AO移动至（AI MoveTo）*。
    
    ![Drag from the Random Location node, then search for and select AI MoveTo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a0e4200-d9e6-4f46-b9cd-0247fbea080f/mod-npc-ai-move.png)
18.  从 **AI MoveTo** 节点的 **Pawn** 引脚拖出，然后搜索并选择 **获取对自身的引用（Get a reference to self）**。将 **RandomLocation** 节点的 **黄色** 引脚连接到 **AI MoveTo** 节点的 **目的地（Destination）** 引脚。最后，将 **AI MoveTo** 节点的 **接受半径（Acceptance Radius）** 设置为50，如下所示。
    
    ![Drag from the Pawn pin of the AI MoveTo node, then search for and select Get a reference to self](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3caf0fe7-aac3-4948-a104-3af25199e2ad/get-reference.png) ![Connect the yellow pin of the Random Location node to the Destination pin of the AI MoveTo node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a91daf0c-d1be-4c77-9e6a-15ed291d2254/mod-npc-ai-move-connected.png)
19.  从 **AI Move To** 节点的 **成功时（On Success）** 引脚拖出，然后搜索并选择 **延迟（Delay）**。将节点 的 **时长（Duration）** 设置为4。从 **Delay** 节点的 **已完成（Completed）** 引脚拖出，然后搜索并选择 **MoveNPC**，如下所示。
    
    ![Drag from the On Success pin of the AI Move To node, then search for and select Delay. Set the Duration to 4. Drag from the Delay node and add a Move NPC node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97114945-f5ba-4217-9f20-e5a13ee118af/mod-npc-delay-1.png)
20.  重复上述步骤，以将这些节点添加到 **AI Move To** 节点的 **失败时（On Fail）** 引脚。将 **Delay** 节点的 **时长（Duration）** 设置为0.1。
    
    ![Repeat the steps above to add the nodes to the On Fail pin of the AI Move To node. Set the Duration of the Delay node to 0.1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c39cea1-2a9f-4a8c-8ac8-8626821503a5/mod-npc-delay-2.png)
21.  右键点击 **事件图表（Event Graph）**，然后搜索并选择 **事件开始播放（Event Begin Play）**。从 **Event Begin Play** 节点拖出，然后搜索并选择 **MoveNPC**。
    
    ![Right-click the Event Graph, then search for and select Event Begin Play](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b25deb1e-12b7-424e-b576-1db269e9aecf/mod-moving-begin-1.png) ![Drag from the Event Begin Play node, then search for and select Move NPC](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98f0e35a-4c54-4471-8a52-fcf9f18b926d/mod-moving-begin-2.png)
22.  **编译（Compile）** 并 **保存（Save）** 蓝图。
    
23.  将 **BP\_NPC\_ModNavMesh** 蓝图拖到关卡中，并在 **细节（Details）** 面板下，找到 **目标列表（Target List）**，然后点击 **添加(+)** 按钮以添加新的目标Actor。
    
    ![Drag your BP_NPC_ModNavMesh Blueprint into your Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79356b51-1d07-43c6-a1da-0c18dc941b4f/mod-npc-drag.png) ![In the Details panel find the Target List and click the Add button to add a new target Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afe4a2b3-2a02-41d2-a4fa-55c8809b9710/mod-npc-targets-1.png)
24.  点击下拉列表，然后搜索并选择之前创建的 **球体（Sphere）**Actor。
    
    ![Click the dropdown, then search for and select the Sphere Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89ec763c-65d3-4468-81a5-55d1005092d8/mod-npc-targets-2.png)
25.  重复上一步，添加剩余四个 **球体（Sphere）**Actor。
    
    ![Repeat the step above to add the remaining four Sphere Actors](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90dc9f24-6c3d-4791-9c0a-64709adcd22e/mod-npc-targets-3.png)
26.  点击 **模拟（Simulate）**，查看代理如何在关卡中的目标之间游走。
    
    ![Click Simulate to see your Agent roam between goals in your Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de965784-82bf-40f6-b5e1-6508e039a3f6/mod-prep-demo.gif)

### 阶段成果

在本小节中，你创建了一个在一系列目标Actor之间游走的代理。现在，你可以继续学习[修改导航系统](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine)了。

-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [navigation](https://dev.epicgames.com/community/search?query=navigation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/modifying-the-navigation-mesh-preparation-guide-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [目的](/documentation/zh-cn/unreal-engine/modifying-the-navigation-mesh-preparation-guide-in-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [1 - 必要设置](/documentation/zh-cn/unreal-engine/modifying-the-navigation-mesh-preparation-guide-in-unreal-engine#1-%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [阶段成果](/documentation/zh-cn/unreal-engine/modifying-the-navigation-mesh-preparation-guide-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C)
-   [2 - 创建测试关卡](/documentation/zh-cn/unreal-engine/modifying-the-navigation-mesh-preparation-guide-in-unreal-engine#2-%E5%88%9B%E5%BB%BA%E6%B5%8B%E8%AF%95%E5%85%B3%E5%8D%A1)
-   [阶段成果](/documentation/zh-cn/unreal-engine/modifying-the-navigation-mesh-preparation-guide-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-2)
-   [3 - 创建代理](/documentation/zh-cn/unreal-engine/modifying-the-navigation-mesh-preparation-guide-in-unreal-engine#3-%E5%88%9B%E5%BB%BA%E4%BB%A3%E7%90%86)
-   [阶段成果](/documentation/zh-cn/unreal-engine/modifying-the-navigation-mesh-preparation-guide-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-3)
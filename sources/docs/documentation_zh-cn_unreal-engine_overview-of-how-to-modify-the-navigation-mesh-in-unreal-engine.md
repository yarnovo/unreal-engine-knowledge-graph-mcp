# 介绍如何修改虚幻引擎中的寻路系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:42:58.476Z

---

目录

![修改寻路系统](https://dev.epicgames.com/community/api/documentation/image/e60b90e2-b545-4743-9cf6-2b1be474a975?resizing_type=fill&width=1920&height=335)

## 概述

虚幻引擎的 **寻路系统（Navigation System）** 向人工智能代理提供了寻路功能。为了能够找到开始位置和目的地之间的路径，从世界的碰撞几何结构生成了寻路网格体。

默认设置将寻路网格体细分为图块，以允许重建寻路网格体的本地化部件。生成的网格体由一些多边形组成，每个多边形都指定了成本。确定最优路径时，寻路算法将尝试确定成本最低的路径前往目的地。

寻路系统包含各种组件以及用于修改寻路网格体生成方式的设置，包括多边形的成本。这进而影响代理在你的关卡中寻路的方式。

## 目标

在快速入门指南中，你将学习如何使用 **寻路修饰体积**、**寻路代理链接** 以及在运行时影响寻路的蓝图Actor来修改寻路网格体。

## 目的

-   使用寻路修饰体积改变特定区域中的寻路网格体成本
    
-   使用寻路代理链接在本来不可达的两个区域之间创建连接
    
-   使用智能代理链接以允许代理在平台之间朝着目标跳跃
    
-   创建移动的蓝图Actor以学习如何在运行时动态重新生成寻路网格体
    

## 1 - 必要设置

遵循 **修改寻路系统准备指南**，或下载[完整示例项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/5dacac58-c16e-4c95-be48-2f63fa8d7384/navsystemsample.zip)并打开 **LevelModNavigation\_0** 关卡（Level） ，然后继续到下一分段。

## 2 - 使用寻路修饰体积

**寻路修饰体积** 使用体积形状将寻路区域类应用于寻路网格体。这可以用于更改体积空间中的多边形的属性，以修改其遍历成本。

多边形属性由寻路修饰体积的相应 **区域类** 定义。此类确定对寻路网格体的影响。你可以使用内置类修改网格体，或创建自己的自定义实现。

现在，你将首先使用内置类修改关卡中的寻路网格体。

1.  转到 **放置Actor（Place Actors）** 面板，搜索 **寻路修饰体积（Nav Modifier Volume）**。将寻路修饰体积（Nav Modifier Volume）Actor拖到关卡中。注意，默认情况下，任何寻路网格体都不在体积内生成。
    
    ![Drag the Nav Modifier Volume Actor into your Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0150f179-73f3-4c37-b78f-16cf4bd9507a/mod-nav-mod-drag.png)
2.  **移动** 和 **缩放** 体积以覆盖如下所示的区域。注意，你现在会在关卡左侧移动体积，强迫代理到达底部 **球体**。此区域可以表示游戏中不允许代理跨越的任何障碍物。
    
    ![Move and scale the volume to cover the area as shown](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/64f8c726-0945-4db6-9b86-e895b5397c60/mod-nav-mod-null-1.png)
3.  重复上一步，并在地图另一侧创建另一个区域。缩放体积时，请在代理两侧保留活动空间。
    
    ![Repeat the step above and create another area on the opposite side of the map](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3a210b8-8ef1-4aef-b925-00deff6f906c/mod-nav-mod-null-2.png)
4.  将另一个 **寻路修饰体积（Nav Modifier Volume）** 拖到关卡中。浏览到 **细节（Details）** 面板并点击 **区域类** 旁边的 **下拉列表**。从列表中选择 **NavArea\_Obstacle** 类。此内置类在体积内将指定相较于默认值（绿色的 **NavArea\_Default** ）更高的成本。这样一来，代理会避开该区域，除非代理找不到成本更低的路径。
    
    ![Select the NavArea_Obstacle class from the list](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2e09b55-6434-4b3e-88ef-731dc37ebea3/mod-nav-mod-obs-1.png) ![The area inside the volume has a higher navigation cost compared to the default navigation mesh](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a027dae2-2ef8-4967-86d8-a1723b847c79/mod-nav-mod-obs-2.png)
5.  复制体积两次，以围绕球体构造以下形状。这将强迫代理绕着体积走来到达球体。
    
    ![Duplicate the volume twice](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/741efe58-1017-41cb-9e57-19d36833b1bb/mod-nav-mod-obs-3.png)
    
    如果使用另一个体积完全阻挡球体周围的区域，代理仍将到达目的地，因为这些体积表示有效路径。相反，如果将体积的区域类更改为NavArea\_Null，代理将无法到达目的地，因为代理找不到通往目标的合适路径。这是因为NavArea\_Null应用了无限成本，从而导致寻路网格体不在受影响的区域中生成。
    
6.  点击 **模拟（Simulate）**，并注意代理如何在球体之间移动。这演示了你的更改会如何影响寻路网格体的生成方式。
    
    ![Click Simulate and notice how your Agent moves between the spheres](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5709ed15-0d64-4946-b3b8-fac526ce2b77/mod-nav-mod-demo.gif)

### 阶段成果

在此分段中，你学习了如何使用 **寻路修饰体积（Nav Modifier Volumes）** 更改寻路网格体的生成方式。你还学习了虚幻引擎中可用的一些内置区域类。

### 可用寻路修饰体积区域类

区域类

说明

NavArea\_Default

默认情况下，将相同的寻路成本指定给体积内的区域和寻路网格体。

NavArea\_LowHeight

表示匹配遍历条件的区域，其中包含防止代理遍历的较低高度。寻路网格体不会在此体积内生成寻路数据。

NavArea\_Null

表示体积内的空白区域。寻路网格体不会在此体积内生成寻路数据。

NavArea\_Obstacle

将高寻路成本指定给体积内的区域。

## 3 - 使用寻路链接代理

**寻路链接代理** 能将寻路网格体中没有直接寻路路径的两个区域连接起来。在搜索路径的同时，寻路链接代理会用作额外连接，供代理用于到达目的地。

寻路链接代理常用于在使用不同寻路网格体的区域之间搭桥，并告知代理，在没有连续寻路路径可用时，代理可从平台降落或跳向目标。

**创建桥梁以连接两个区域**

1.  选择第一个 **寻路修饰体积（Nav Modifier Volume）**，并调整其大小，使其覆盖整个地板长度，如下所示。这将阻止代理到达关卡中的底部球体。
    
    ![Select the first Nav Modifier Volume and resize it so it covers the entire length of the floor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3455f585-b053-4206-bae2-6fd0f99bff37/mod-nav-link-nav-mod-resize.png)
2.  转到 **放置Actor（Place Actors）** 面板并将 **立方体** Actor拖到关卡中。将其缩放为X = 4、Y = 1、Z =0.2，并按如下所示进行放置。
    
    ![Drag a Cube Actor into the Level. Scale it to X = 4, Y = 1, Z =0.2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33c6ebab-1393-40d9-9abe-8f765abb898a/mod-nav-link-cube-1.png)
3.  复制 **立方体** 并将其移至关卡另一侧，如下所示。
    
    ![Duplicate the cube and move it to the other side of the Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7c445fd-432f-4889-85e6-354444a2c87b/mod-nav-link-cube-2.png)
    
    这些立方体Actor充当关卡中寻路链接代理的可视表示。你不需要将其与寻路链接代理一起使用。
    
4.  转到 **放置Actor（Place Actors）** 面板，并搜索 **寻路链接代理（Nav Link Proxy）**。将 **寻路链接代理** Actor拖到关卡中。
    
    ![Drag the Nav Link Proxy Actor into your Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3573257b-abf4-4b6a-b2db-5696b7adfe60/mod-nav-link-drag.png)
5.  选中 **寻路链接代理** 后，点击 **PointLinks\[0\].Left** 句柄并将其移动，使其放在网格体一侧。点击 **PointLinks\[0\].Right** 句柄并将其移动，使其放在网格体另一侧，如下所示。
    
    如果寻路链接代理未与寻路网格体表面连接，绿色箭头将消失。
    
    ![Click the PointLinks[0].Left handle and move it so it's placed on one side of the mesh and the PointLinks[0].Right handle on the opposite side](mod-nav-link-bridge-1.png)(convert:false)
    
    现在你已创建连接，代理将能够通过 **寻路链接代理** 寻路，尽管中间并未寻路数据。
    
6.  选中 **寻路链接代理** 后，转到 **细节（Details）** 面板，并展开 **指针链接（Point Links）**下标记为 **0** 的分段，以找到 **方向（Direction）** 下拉列表。可以选择让 **方向（Direction）** 为 **双向（Both Ways）**、**从左到右（Left to Right）** 或 **从右到左（Right to Left）**。对于本示例，选择 **从左到右（Left to Right）**。
    
    ![Click the Direction dropdown and select Left to Right](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04c04c6c-0b09-40a6-b357-c7319e451bd1/mod-nav-link-direction.png)
7.  复制 **寻路链接代理**，并将其移至关卡另一侧。对于本示例，将 **方向（Direction）** 设置为 **从右到左（Right to Left）**。
    
    ![Duplicate the Nav Link Proxy and move it to the other side of the level. Set the Direction to Right to Left](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67b81a03-5542-44fb-88cf-4a9dd217f5c3/mod-nav-link-bridge-2.png)
8.  点击 **模拟（Simulate）**，并注意代理现在可以通过从左侧进入并从右侧退出来到达 **球体**。
    
    ![Click Simulate and notice how your Agent can now reach the sphere by entering from the left side and exiting from the right side](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cd26718-8a28-4492-b4a6-77e99326f6f3/mod-nav-link-demo.gif)

### 阶段成果

你使用了 **寻路链接代理** 来连接 **寻路网格体** 中没有可行路径的两个区域。你还学习了，可以配置 **寻路链接代理** 以使用不同的方向，如 **双向（Both Ways）**、**从左到右（Left to Right）** 或 **从右到左（Right to Left）**。

### 使用寻路链接代理允许代理从平台落下

1.  将另一个 **寻路链接代理** 拖到关卡中，并将其放在升高平台的边缘，如下所示。
    
    ![Drag another Nav Link Proxy into your Level and place it at the end of the raised platform](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ebf52d7-cbdc-4de6-85dc-82bec24babd8/mod-nav-link-fall-1.png)
2.  选中 **PointLinks\[0\].Left** 并将其放在平台边缘，选中 **PointLinks\[0\].Right** 并将其放在底部，与地板重叠的地方。
    
    ![Select the PointLinks[0].Left and place it at the edge of the platform and select the PointLinks[0].Right and place it at the bottom](mod-nav-link-fall-2.png)(convert:false)
    
3.  找到 **细节（Details）** 面板，展开 **指针链接（Point Links）** 下标记为 **0** 的分段，并选择 **从左到右（Left to Right）** 作为 **方向（Direction）**。
    
    ![Set the Direction Left to Right](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0759ed6-0819-4704-af21-c488ce979a84/mod-nav-link-fall-3.png)
4.  点击 **模拟（Simulate）**，并注意代理现在能够从平台落下以到达目标。
    
    ![The Agent is now able to fall from the platform to reach its goal](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa20d6b0-9e26-4263-acf0-04adf6e7e887/mod-nav-link-demo-2.gif)

#### 阶段成果

在此分段中，你使用了 **寻路链接代理** 允许代理从平台落下以到达目标。

### 使用寻路链接代理允许代理跳到目标

在此分段中，你将学习如何使用 **寻路链接代理** 上的 **智能链接**，允许代理在不同平台之间跳跃。

1.  选择平台网格体，在按住 **Alt** 键的同时将其拖到一侧以进行复制。
    
    ![Select the platform mesh and drag it while holding the Alt key to the side to duplicate it](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa50072a-906a-4357-8925-e0733164977a/mod-smart-link-platform-1.png)
2.  调整新平台大小并将其移至更高的位置，如下所示。
    
    ![Resize the new platform and move it higher](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae47ac19-3c2b-4b8e-b6e9-f981d4fb2c08/mod-smart-link-platform-2.png)
3.  复制 **球体** Actor并将其放在平台之上。
    
    ![Duplicate a Sphere Actor and place it on top of the platform](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/825e3775-a6a2-4243-a90a-dac142abfb1c/mod-smart-link-platform-3.png)
4.  在 **内容侧滑菜单（Content Drawer）** 中，右键点击并在 **创建基本资产（Create Basic Asset）** 分段中选择 **蓝图类（Blueprint Class）**。
    
    ![Select Blueprint Class from the Create Basic Asset section](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c1d98e8-1579-4754-953f-d1cb5da51956/mod-smart-link-create-1.png)
5.  在 **选择父类（Pick Parent Class）** 窗口中，转到 **全部类（All Classes）** 分段，并展开箭头。搜索并选择 **寻路链接代理（Nav Link Proxy）**，然后点击 **选择（Select）**。将蓝图命名为 **BP\_NavProxyLink**。
    
    ![ Search for and select Nav Link Proxy and click Select](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e0698d8-cf33-4513-8ebf-f1018b3ad84f/mod-smart-link-create-2.png) ![Name the Blueprint BP_NavProxyLink](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14f0c2eb-61ca-4c97-88f8-d8292afc43ba/mod-smart-link-create-3.png)
6.  双击打开 **BP\_NavProxyLink** 。在 **事件图表（Event Graph）** 中右键点击，然后搜索并选择 **事件接收智能链接已到达（Event Receive Smart Link Reached）**。
    
    ![Inside the Event Graph, right-click then search for and select Event Receive Smart Link Reached](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/561dfe86-2b1d-4571-a34e-3931b7a800ef/mod-smart-link-blueprint-event.png)
7.  从 **Event Receive Smart Link Reached** 节点的 **代理（Agent）** 引脚拖出，然后搜索并选择 **投射到角色（Cast to Character）**。
    
    ![Drag from the Agent pin of the Event Receive Smart Link Reached node then search for and select Cast to Character](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5669903e-2e6f-43d2-95f5-015f2bd368b3/mod-smart-link-blueprint-cast.png)
8.  从 **Cast to Character** 节点的 **作为角色（As Character）** 引脚拖出，然后选择 **提升到变量（Promote to Variable）**。
    
    ![Drag from the As Character pin of the Cast to Character node and select Promote to variable](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07754a87-4ff1-4b5c-a49c-519d0d20e6ee/mod-smart-link-blueprint-character.png)
9.  从 **As Character** 节点的 **执行** 引脚拖出，然后搜索并选择 **建议发射物速度自定义弧（Suggest Projectile Velocity Custom Arc）**。
    
    ![Drag from the As Character node then search for and select Suggest Projectile Velocity Custom Arc](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f187951-66c0-4e6e-b9cf-60e2fdd49eee/mod-smart-link-blueprint-custom-arc.png)
10.  从 **As Character** 节点的 **蓝色** 引脚拖出，然后搜索并选择 **获取Actor位置（Get Actor Location）**。将 \*Get Actor Location **节点的** 返回数值（Return Value） **引脚连接到** SuggestProjectileVelocityCustomArc **节点的** 开始位置（Start Pos）\*\* 引脚。
    
    ![Drag from the As Character node then search for and select Get Actor Location. Connect the node to the Start Pos pin of the Suggest Projectile Velocity Custom Arc node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d914a4cf-4319-4088-8ef3-dee66f89f1b1/mod-smart-link-blueprint-start-pos.png)
11.  从 **Event Receive Smart Link Reached** 节点的 **目的地（Destination）** 引脚拖出，并将其连接到 **SuggestProjectileVelocityCustomArc** 节点的 **结束位置（End Pos）** 引脚。
    
    ![Drag from the Destination pin of the Event Receive Smart Link Reached node and connect it to the End Pos pin of the Suggest Projectile Velocity Custom Arc node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcffb334-db41-41f6-9d01-55f21b1f17ba/mod-smart-link-blueprint-end-pos.png)
12.  将 **作为角色（As Character）** 变量拖动到 **事件图表（Event Graph）** 中，然后选择 **作为角色获取（Get As Character）**。从该节点拖出，然后搜索并选择 **启动角色（Launch Character）**。启用 **XYOverride** 和 **ZOverride** 复选框。
    
    ![Drag from the As Character node then search for and select Launch Character](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/749766bf-4a7a-45d6-a0ca-f1458bd95ba2/mod-smart-link-blueprint-launch-character-1.png)
13.  从 **SuggestProjectileVelocityCustomArc** 节点拖出，然后搜索并选择 **延迟（Delay）**。将 **时长（Duration）** 设置为0.1。将 **Delay** 节点的 **已完成（Completed）** 引脚连接到 **Launch Character** 节点。
    
    ![Add a Delay node and set the Duration to 0.1. Connect the Delay node to the Launch Character node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa1ffd30-7bf8-45a3-b99b-8793e237bcd9/mod-smart-link-blueprint-delay.png)
14.  从 **SuggestProjectileVelocityCustomArc** 节点的 **向外启动速度（Out Launch Velocity）** 引脚拖出，然后搜索并选择 **向量 \* 浮点**。
    
    ![Drag from the Out Launch Velocity pin of the Suggest Projectile Velocity Custom Arc node then search for and select vector * float](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e37656b3-bff4-4ae7-8eb5-a4700fe37acf/mod-smart-link-blueprint-jump-boost-1.png)
15.  将 **Multiplication** 节点的 **黄色** 引脚连接到 **Launch Character** 节点的 **启动速度（Launch Velocity）** 引脚。右键点击 **Multiplication** 节点的 **绿色** 引脚，然后选择 **提升到变量（Promote to Variable）**。
    
    ![Right click the green pin of the Multiplication node and select Promote to variable](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/171425f9-ec29-4043-84fa-3f5f7a677c2a/mod-smart-link-blueprint-jump-boost-2.png)
16.  选择 **New Var 0** 节点后，转到 **细节（Details）** 面板，并将变量重命名为 **JumpBoost**。将默认值设置为 **1**。启用 **实例可编辑（Instance Editable）** 复选框，如下所示。
    
    ![Name the Variable Jump Boost and set the default value to 1. Enable the Instance Editable checkbox](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed90cad6-e802-4498-b4e5-61a8d455c5cc/mod-smart-link-blueprint-jump-boost-3.png)
17.  **编译（Compile）** 并 **保存（Save）** 蓝图。
    
    ![This is the complete Blueprint set up](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b89e69b-fab8-4ad8-9233-879edb3679ae/mod-smart-link-blueprint-final.png)
18.  选择关卡中的 **BP\_NPC\_ModNavMesh** 角色，并在 **细节（Details）** 面板下点击 **目标列表（Target List）**旁边的 **添加（+）** 按钮 ，以添加新条目。搜索并选择您上次添加到平台的 **球体（Sphere）**Actor。
    
    ![Search for and select the last Sphere Actor you added to the platform](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a66be93-0f56-4b1a-8362-ca52b5de2356/mod-npc-targets-2.png)
19.  将 **BP\_NavProxyLink** 蓝图Actor拖到平台上并调整连接，如下所示。
    
    ![Drag the BP_NavProxyLink Blueprint Actor onto the platform and adjust the connections](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75ac3225-5cd6-4391-bc43-17c4d3a4050c/mod-smart-link-blueprint-drag.png)
20.  选择 **BP\_NavProxyLink** 蓝图Actor后，转到 **细节（Details）** 面板，并点击 **将端点从简单链接复制到智能链接（Copy End Points from Simple Link to Smart Link）** 按钮。启用 **智能链接有意义（Smart Link Is Relevant）** 复选框
    
    ![click the Copy End Points from Simple Link to Smart Link button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ee524ea-dddd-4cb2-8ea2-895b389645cf/mod-smart-link-blueprint-drag-2.png)
21.  点击 **模拟（Simulate）**，并观看代理现在如何跳跃以到达上一个球体。
    
    ![Click Simulate and watch as your Agent can now jump to reach the last sphere](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21125b91-68ba-4bd1-900e-e54cd57e4a55/mod-nav-link-demo-3.gif)
    
    "寻路链接代理"只能连接相邻的"寻路网格体"图块。可以选择RecastNavMesh-Default Actor并启用"绘制图块边界"复选框，以可视化图块。
    

### 阶段成果

在本分段中，你学习了如何创建自定义 **寻路代理链接** 蓝图，以及如何将其用于让代理跳跃到平台。

## 4 - 在运行时生成寻路网格体

虚幻引擎随附了三种寻路网格体生成模式：

生成模式

说明

静态

寻路网格体离线生成，随关卡保存。寻路网格体在运行时加载，无法更改。

动态

寻路网格体离线生成，随关卡保存，或在运行时构建。在运行时，寻路网格体使用的寻路相关数据可以更新，并且会对受数据更改影响的图块执行生成操作。

限动态修饰

寻路网格体离线生成，随关卡保存。在运行时，只有寻路区域、寻路链接和动态对象之类的寻路修饰可以通过更改成本或阻挡区域来修改现有寻路网格体。在运行时不会生成新的寻路网格体表面。

此方法允许寻路网格体缓存碰撞数据，并且可以将受影响图块的处理成本降低多达50%。

高级用户应在仔细考虑此模式的优势和局限之后加以使用。

默认情况下，寻路网格体配置为 **静态**。但是，你可以将寻路网格体生成设置为某种动态模式，这样就可以在运行时更改。

### 使用运行时生成（限动态修饰）

1.  要更改 **运行时生成（Runtime Generation）** 设置，请转到菜单栏上的 **设置（Settings） > 项目设置（Project Settings）**。
    
    ![Click Project Settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02a75f18-83bd-4a4d-ac88-c6345f8788ed/mod-dyn-project-settings-1.png)
2.  转到 **寻路网格体（Navigation Mesh）** 设置，并在 **运行时（Runtime）** 分段下点击 **运行时生成（Runtime Generation）** 下拉列表。为本示例选择 **限动态修饰（Dynamic Modifiers Only）**。
    
    ![Click the Runtime Generation dropdown and select Dynamic Modifiers Only](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a3ebc8e-7a69-4187-92ed-11ef56b3b8ac/mod-dyn-project-settings-2.png)
3.  在 **内容侧滑菜单（Content Drawer）** 中，右键点击并在 **创建基本资产（Create Basic Asset）** 分段下选择 **蓝图类（Blueprint Class）**。
    
    ![Select Blueprint Class under the Create Basic Asset section](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6fc54810-f4fa-4437-a0cf-0c37a664b8d8/mod-smart-link-create-1.png)
4.  在 **常用类（Common Classes）** 分段下选择 **Actor** 类。将蓝图命名为 **BP\_RotatingActor**。
    
    ![Select the Actor class under the Common Classes section](mod-rot-create.png)(convert:false)
    
    ![Name the Blueprint BP_RotatingActor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60da1565-6d73-4c43-9638-88afe844b092/mod-rot-create-2.png)
5.  双击打开 **BP\_RotatingActor** 蓝图。点击 **添加（+Add）** 下拉列表，然后搜索并选择 **立方体（Cube）**。将立方体缩放为X = 4、Y = 1. 5、Z = 1。
    
    ![Click the Add Component dropdown, then search for and select Cube](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6dc6cbd4-1c1b-486c-8cdb-ebd9c98ffa8e/mod-rot-add-cube.png) ![Scale the Cube to X = 4, Y = 1.5, Z = 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/623cc4f6-54dd-4207-a13f-17e4338147b0/mod-rot-add-cube-2.png)
6.  点击 **添加组件（Add Component）** 下拉列表，然后搜索并选择 **旋转运动（Rotating Movement）**。
    
    ![Click the **Add Component** dropdown, then search for and select Rotating Movement](mod-rot-rotate.png)(convert:false)
    
7.  **编译（Compile）** 并 **保存（Save）** 蓝图。
    
8.  将 **BP\_RotatingActor** 蓝图Actor拖到关卡中，并点击 **模拟（Simulate）**。注意，寻路网格体并不会使用旋转网格体更新。这是因为仅当Actor有 **NavModifier** 组件时，**限动态修饰（Dynamic Modifier Only）** 运行时生成模式才能起作用。
    
    ![Drag the BP_RotatingActor Blueprint Actor into your Level and click Simulate](mod-rot-demo.gif)(convert:false)
    
9.  转到 **BP\_RotatingActor** 蓝图并点击 **添加组件（Add Component）** 下拉列表。搜索并选择 **寻路修饰（Nav Modifier）**。
    
    ![Click the Add Component dropdown and search for and select Nav Modifier](nav-modifier.png)(convert:false)
    
10.  **编译（Compile）** 并 **保存（Save）** 蓝图。点击 **模拟（Simulate）** 以查看有何不同。现在，你应该会看到随着网格体在关卡中旋转，寻路网格体会正确更新。
    
    注意，关卡中并没有生成任何新的寻路网格体（所生成的图块显示为红色）。寻路修饰只是更改了现有寻路网格体。
    
    ![You should now see the Navigation Mesh correctly updating as the mesh rotates in the Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/013b130b-27b9-49d3-b28a-ef2593ddc4ff/mod-rot-demo-2.gif)

### 阶段成果

在本分段中，你学习了如何使用运行时生成 **限动态修饰（Dynamic Modifiers Only）** 让寻路网格体在游戏过程中重新生成。你还使用带有NavModifier组件的简单旋转蓝图Actor测试了结果。

### 使用运行时生成（动态）

1.  在 **内容侧滑菜单（Content Drawer）** 中，右键点击并在 **创建基本资产（Create Basic Asset）** 分段中选择 **蓝图类（Blueprint Class）**。
    
    ![Select Blueprint Class from the Create Basic Asset section](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d59827a-f37d-4f83-be41-422d21ca6490/mod-smart-link-create-1.png)
2.  在 **常用类（Common Classes）** 分段下选择 **Actor** 类。将蓝图命名为 **BP\_MovingActor**。
    
    ![Select the Actor class under the Common Classes section](mod-rot-create.png)(convert:false)
    
    ![Name the Blueprint BP_MovingActor](mod-moving-create.png)(convert:false)
    
3.  双击打开 **BP\_MovingActor** 蓝图。点击 **+添加（+Add）** 下拉列表，然后搜索并选择 **球体（Sphere）**。将球体缩放为X = 2、Y = 2、Z = 2。
    
    ![Click the Add Component dropdown, then search for and select Sphere](mod-moving-sphere.png)(convert:false)
    
4.  在 **事件图表（Event Graph）** 中右键点击，然后搜索并选择 **添加自定义事件（Add Custom Event）**。将事件命名为 **MoveForward**。重复上述步骤，并创建另一个事件，命名为 **MoveBackwards**。
    
    ![In the Event Graph, right click, then search for and select Add Custom Event. Name the event Move Forward](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ed53f58-6332-4067-b48e-8e18616259c4/mod-moving-custom-event-1.png) ![Repeat these steps and create another event named Move Backwards](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/213a9283-6bc6-4fc8-9270-619dd5f0f779/mod-moving-custom-event-2.png)
5.  从 **MoveForward** 节点拖出，然后搜索并选择 **添加时间轴（Add Timeline）**。将时间轴命名为 **TM\_MoveObject**。将 **MoveBackwards** 节点连接到 **TM\_MoveObject** 节点的 **逆向（Reverse）** 引脚。
    
    ![Drag from the Move Forward node then search for and select Add Timeline](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f42d9d7b-16b3-45a0-9552-a068bd44e2c0/mod-moving-add-tm.png) ![Connect the Move Backwards node to the Reverse pin of the Timeline](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d47f7bf-80f3-4505-9b82-c164c4373e4b/mod-moving-add-tm-2.png)
6.  双击打开 **TM\_MoveObject** 节点。点击 **添加浮点轨道（Add Float Track）** 按钮，创建新的浮点轨道。将轨道命名为 **Alpha**。
    
    ![Click the Add Float Track button to create a new Float Track.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99efef54-7757-4fb1-bed5-03293e379af6/add-float-track-button.png)
    
    ![Name the track Alpha](mod-moving-tm-alpha.png)(convert:false)
    
7.  在图标内右键点击，并选择 **将关键帧添加到CurveFloat\_1（Add key to CurveFloat\_1）**。输入Time = **0** 和Value = **0**。
    
    ![Right click inside the graph and select Add key to CurveFloat_1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f3e514e-f7d3-4caa-8ff0-50a73aa5b2eb/mod-moving-tm-point-1.png) ![Enter Time = 0 and Value = 0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51355569-a0db-4dca-ac03-aaddf98ab8e8/mod-moving-tm-point-2.png)
8.  重复上一步，并输入Time = **5**、Value = **1**。
    
9.  将 **球体（Sphere）** 组件拖动到 **事件图表（Event Graph）** 中并创建节点。从 **Sphere** 节点拖出，然后搜索并选择 **设置相对位置（Set Relative Location）**。
    
    ![Drag from the Sphere node, then search for and select Set Relative Location](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24bc42d7-6522-438b-a4dd-5f665395a15e/mod-moving-relative-location.png)
10.  将 **TM\_MoveObject** 节点的 **更新（Update）** 引脚连接到 **SetRelativeLocation** 节点。右键点击 **SetRelativeLocation** 节点的 **新位置（New Location）** 引脚，然后选择 **分割结构体引脚（Split Struct Pin）**。
    
    ![Right click the New Location pin of the Set Relative Location node and select Split Struct Pin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94a59583-f7ff-4e24-9360-b0ca8703e617/mod-moving-set-location.png)
11.  从 **SetRelativeLocation** 节点的 **新位置X（New Location X）** 引脚拖出，然后搜索并选择 **插值（Lerp）**。将 **TM\_MoveObject** 节点的 **Alpha** 引脚连接到 **Lerp** 节点的 **Alpha** 引脚。
    
    ![Drag from the New Location X pin of the Set Relative Location node, then search for and select Lerp](mod-moving-lerp.png)(convert:false)
    
    ![Connect the Alpha pin of the TM_MoveObject node to the Alpha pin of the Lerp node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2a0f482-9965-4ebb-80af-9e425048d6e2/mod-moving-lerp-2.png)
12.  右键点击 **Lerp** 节点的 **B** 引脚，然后选择 **提升到变量（Promote to Variable）**。转到 **细节（Details）** 面板，并将变量命名为 **Distance**。选中 **实例可编辑（Instance Editable）** 复选框。
    
    ![Right click the B pin of the Lerp node and select Promote to Variable](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e5ea3e5-a8cc-4bc3-a292-ac5fabd67629/mod-moving-distance-1.png) ![Name the variable Distance. Select the Instance Editable checkbox](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/643f2a9b-f67d-4377-b006-63933ecb5036/mod-moving-distance-2.png)
13.  **编译（Compile）** 并 **保存（Save）** 蓝图。将 **距离（Distance）** 的默认值设置为 **1000**。
    
14.  从 **TM\_MoveObject** 时间轴的 **完成（Finished）** 引脚拖出，然后搜索并选择 **延迟（Delay）**。将 **时长（Duration）** 设置为 **1**。
    
    ![Drag from the Finished pin of the Timeline, then search for and select Delay. Set the Duration to 1](mod-moving-delay.png)(convert:false)
    
15.  从 **Delay** 节点的 **已完成（Completed）** 引脚拖出，然后搜索并选择 **分支（Branch）**。
    
    ![Drag from the Delay node and search for and select Branch](mod-moving-branch.png)(convert:false)
    
16.  右键点击 **Branch** 节点的 **条件（Condition）** 引脚，然后选择 **提升到变量（Promote to Variable）**。转到 **细节（Details）** 面板，并将变量重命名为 **Forward**。
    
    ![Right click the Condition pin of the Branch node and select Promote to Variable](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/105400f8-565a-4ad0-9511-67e6ebe871ee/mod-moving-branch-2.png) ![Rename the variable to Forward](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2cefef73-da03-4289-ae2a-bc518e73d7d1/mod-moving-branch-3.png)
17.  将 **Forward** 变量拖动到 **事件图表（Event Graph）**，然后选择 **Set Forward**。将 **Branch** 节点的 **True** 引脚连接到 **Set Forward** 节点。从 **Set Forward** 节点拖出，然后搜索并选择 **向后移动（Move Backwards）**。
    
    ![Connect the True pin of the Branch to the Set Forward node. Drag from the Set Forward node, then search for and select Move Backwards](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24cf3ade-6fff-4797-9ca7-a24d9063a57e/mod-moving-branch-4.png)
18.  将 **Forward** 变量拖动到 **事件图表（Event Graph）**，然后选择 **Set Forward**。将 **Branch** 节点的 **False** 引脚连接到 **Set Forward** 节点。**启用** **Set Forward** 节点的 **向前（Forward）** 复选框。从 **Set Forward** 节点拖出，然后搜索并选择 **向前移动（Move Forward）**。
    
    ![Connect the False pin of the Branch to the Set Forward node. Enable the Forward checkbox. Drag from the Set Forward node, then search for and select Move Forward](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3bd4eed-ccde-4d17-bce6-4d3dc0eb4c2b/mod-moving-branch-5.png)
19.  右键点击 **事件图表（Event Graph）**，然后搜索并选择 **事件开始播放（Event Begin Play）**。从 **Event Begin Play** 节点拖出，然后搜索并选择 **向前移动（Move Forward）**。
    
    ![Right click in the Event Graph, then search for and select Event Begin Play](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9ed7095-a914-46a3-9184-7b0dbb426809/mod-moving-begin-1.png) ![Drag from the Event Begin Play node, then search for and select Move Forward](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fced6cc5-9506-484a-83ba-5d686ec07355/mod-moving-begin-2.png)
20.  **编译（Compile）** 并 **保存（Save）** 蓝图。可以在下面看到已完成的蓝图。
    
    ![This is the complete Blueprint set up](mod-moving-completed.png)(convert:false)
    
21.  将 **BP\_MovingActor** 蓝图Actor拖到关卡中，并点击 **模拟（Simulate）**。注意，寻路网格体并不会随Actor的运动而更新。
    
    ![Drag the BP_MovingActor Blueprint Actor into your Level and click Simulate](mod-moving-demo.gif)(convert:false)
    
22.  点击 **设置（Settings） > 项目设置（Project Settings）**，并转到 **寻路网格体（Navigation Mesh）** 设置。
    
    ![Click Project Settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cac1dccd-0594-49df-9b23-4f727d1a4edb/mod-dyn-project-settings-1.png)
23.  在 **运行时（Runtime）** 分段下，点击 **运行时生成（Runtime Generation）** 下拉列表并选择 **动态（Dynamic）**。
    
    ![Click the Runtime Generation dropdown and select Dynamic](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67b83773-53c8-4fd4-a406-d616de60aa43/mod-dyn-project-settings-3.png)

25.返回关卡并点击 **模拟（Simulate）**。现在你应该会看到寻路网格体正确更新。

本小节中的示例会强制寻路网格体发生固定运行时生成，导致大量计算量。这些示例不代表最佳做法，主要用于演示用途。

![The Navigation Mesh updates correctly with the moving Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5bd0360-3d96-4b1b-a136-c1eb66e7f047/mod-moving-demo-2.gif) ![The Navigation Mesh updates correctly with the rotating Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56dfec62-3a7a-47c9-be74-9bc822ababcf/mod-moving-demo-3.gif) ![Final set up for the Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eacaea47-550f-4b1c-a4e9-3231be60c8c0/mod-moving-demo-4.gif)

### 阶段成果

在本小节中，你学习了如何使用 **动态（Dynamic）** 运行时生成设置让寻路网格体在游戏过程中重新生成。你还通过创建蓝图在关卡中移动球体网格体并强制持续重新生成寻路网格体，从而测试了结果。

-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [navigation](https://dev.epicgames.com/community/search?query=navigation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [目标](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [目的](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [1 - 必要设置](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine#1-%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [2 - 使用寻路修饰体积](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine#2-%E4%BD%BF%E7%94%A8%E5%AF%BB%E8%B7%AF%E4%BF%AE%E9%A5%B0%E4%BD%93%E7%A7%AF)
-   [阶段成果](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C)
-   [可用寻路修饰体积区域类](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine#%E5%8F%AF%E7%94%A8%E5%AF%BB%E8%B7%AF%E4%BF%AE%E9%A5%B0%E4%BD%93%E7%A7%AF%E5%8C%BA%E5%9F%9F%E7%B1%BB)
-   [3 - 使用寻路链接代理](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine#3-%E4%BD%BF%E7%94%A8%E5%AF%BB%E8%B7%AF%E9%93%BE%E6%8E%A5%E4%BB%A3%E7%90%86)
-   [阶段成果](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-2)
-   [使用寻路链接代理允许代理从平台落下](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%AF%BB%E8%B7%AF%E9%93%BE%E6%8E%A5%E4%BB%A3%E7%90%86%E5%85%81%E8%AE%B8%E4%BB%A3%E7%90%86%E4%BB%8E%E5%B9%B3%E5%8F%B0%E8%90%BD%E4%B8%8B)
-   [阶段成果](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-3)
-   [使用寻路链接代理允许代理跳到目标](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%AF%BB%E8%B7%AF%E9%93%BE%E6%8E%A5%E4%BB%A3%E7%90%86%E5%85%81%E8%AE%B8%E4%BB%A3%E7%90%86%E8%B7%B3%E5%88%B0%E7%9B%AE%E6%A0%87)
-   [阶段成果](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-4)
-   [4 - 在运行时生成寻路网格体](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine#4-%E5%9C%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E7%94%9F%E6%88%90%E5%AF%BB%E8%B7%AF%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [使用运行时生成（限动态修饰）](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E7%94%9F%E6%88%90%EF%BC%88%E9%99%90%E5%8A%A8%E6%80%81%E4%BF%AE%E9%A5%B0%EF%BC%89)
-   [阶段成果](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-5)
-   [使用运行时生成（动态）](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E7%94%9F%E6%88%90%EF%BC%88%E5%8A%A8%E6%80%81%EF%BC%89)
-   [阶段成果](/documentation/zh-cn/unreal-engine/overview-of-how-to-modify-the-navigation-mesh-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-6)
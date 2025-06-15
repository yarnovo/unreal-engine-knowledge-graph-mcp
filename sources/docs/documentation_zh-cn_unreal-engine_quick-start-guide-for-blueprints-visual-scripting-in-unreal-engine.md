# 虚幻引擎蓝图可视化脚本快速入门指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/quick-start-guide-for-blueprints-visual-scripting-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:34:12.588Z

---

目录

![蓝图快速入门指南](https://dev.epicgames.com/community/api/documentation/image/c21bf540-2740-4a09-a7fa-1efb43e7b57c?resizing_type=fill&width=1920&height=335)

该快速入门指南将带领你在关卡中使用不同的组件构建一个角色，然后将其转换为一个蓝图类，你可以将弹射行为添加到其中，这样你的角色就可以在关卡中四处飞翔！将其制作为一个蓝图类还意味着，你可以在你的世界场景中创建任意数量的弹跳平台，只需从 **内容浏览器** 拖动到该关卡即可。

## 1 - 必要的项目设置

1.  在虚幻项目浏览器的"新建项目"选项卡中，使用游戏模板和以下设置[创建新项目](/documentation/zh-cn/unreal-engine/creating-a-new-project-in-unreal-engine)
    -   横板过关游戏
    -   蓝图
    -   含初学者内容包
2.  根据你的游戏设置，选择最合适的可扩展性和质量设置。
    
    如果你不确定哪些设置适合你，你可以在[项目设置](/documentation/zh-cn/unreal-engine/creating-a-new-project-in-unreal-engine)部分中找到更多信息。
    
3.  给你的项目起一个名字，然后点击 **创建项目（Create Project）** 按钮来创建它。

你现在应该会看到一个横版过关关卡，以便你继续添加内容。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93c44fa6-681e-4d42-b9eb-12e7496d92dc/bpqs_1_finalresult.png "BPQS_1_FinalResult.png")

## 2 - 构建你的弹跳平台

你将在关卡编辑器中构建弹跳平台，然后将其转换为蓝图类，以便将游戏行为添加到其中。

1.  首先，在视口中移动，直到看到该关卡的顶部平台。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88c6ad76-a525-4f93-b6f3-f687f5fa4073/topplatforms.png)
    
    我们将使用空Actor创建容器来容纳弹跳平台的所有部分。你将需要两个部分（或组件），一个用于表示弹跳平台的形状，另一个是角色重叠时的触发器。
    
2.  在主工具栏中，点击 **模式（Modes）** 按钮，在下来菜单中点击 **选择（Select）** 来显示"放置Actor"面板。
    
3.  在 **放置Actor（Place Actors）** 面板中，单击 **基础（Basic）**，然后查找 **空Actor（Empty Actor）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa9f9e29-8ba8-42ca-ab3b-171b498ba9f8/emptyactor.png)
4.  将它拖动到关卡中，这样它就位于顶部的一个平台上了。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/965e3b68-a37d-45bd-9613-c104498371f0/bpqs_2_step3.png "BPQS_2_Step3.png")
5.  现在你已经在关卡中选择了Actor，它的属性在 **细节（Details）** 面板中可见。在 **细节（Details）** 面板顶部，你可以重命名它。继续并在框中单击以输入一个新名称，例如"LaunchPad"。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73e4c6c1-df85-4be3-bbe5-a7d1c6586e77/namelaunchpad.png)
6.  在 **细节（Details）** 面板中，单击 **添加组件（Add Component）** 按钮，然后在 **常见（Common）** 下选择 **立方体（Cube）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c9b1e4f-6f3b-4601-82c5-87d8697a5ff3/bpqs_2_step5.png "BPQS_2_Step5.png")
7.  单击并拖动新添加的 **立方体（Cube）** 至 **DefaultSceneRoot**，使 **立方体（Cube）** 成为新的根节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12d4ddf1-edc5-43fc-9ad9-e07b94f66545/bpqs_2_step6.png "BPQS_2_Step6.png")
8.  选择 **立方体（Cube）** 组件后，将 **比例（Scale）** 更改为 (X: 1.0, Y: 1.0, Z: 0.1)
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a569078e-b563-487d-a9d3-098444076738/bpqs_2_step7.png "BPQS_2_Step7.png")
9.  现在，我们将添加一个盒体碰撞组件，每当有东西与它重叠时，就会触发一个事件。在 **细节（Details）** 面板中，单击 **添加组件（Add Component）** 按钮，然后在 **碰撞（Collision）** 下选择 **盒体碰撞（Box Collision）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01145d29-3412-4124-9dc4-3ec3bc60d74d/bpqs_2_step8.png "BPQS_2_Step8.png")
10.  将 **盒体碰撞（Box Collision）** 比例更改为( X: 1.25, Y: 1.25, Z: 9.75)，位置更改为( X: 0, Y: 0, Z: 200)，让盒体盖住并延伸到弹射板的上方。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45c1604f-566e-40e8-8432-b6f9b7d2b1f8/bpqs_2_step9.png "BPQS_2_Step9.png")

任何时候需要更改Actor的属性时，例如要放大整个弹跳平台，你可以点击 **细节（Details）** 面板中 **添加组件（Add Components）** 按钮下的 **LaunchPad（实例）（LaunchPad (Instance)）**。

现在你已经有了你想要的Actor，我们将把它转换为蓝图类。你可以在 **蓝图编辑器（Blueprint Editor）** 中添加更多组件，就像你在关卡中所做的那样去调整它们。

## 3 - 将你的Actor转换为蓝图类

在蓝图中进行更改意味着每次创建一个新的弹跳平台时，它都具有你在 **蓝图编辑器（Blueprint Editor）** 中创建的外观和感觉。虽然你可以在关卡中复制LaunchPad Actor，但是你对特定弹跳平台所做的任何更改都只会影响该副本。

1.  在 **细节（Details）** 面板中，单击 **蓝图/添加脚本（Blueprint/Add Script）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3463f6a-89fc-4c06-a78d-a3d66b479c1f/bpbutton.png)
2.  接着会弹出 **从选项创建蓝图（Create Blueprint from Selection）** 对话框。接下来我们要编辑蓝图的默认路径。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1657d79-cb87-4d59-81b2-c32c7955853a/createbpfromselection.png "CreateBPFromSelection.png")
3.  将路径从 **Game/SideScrollerBP** 改为 **Game/SideScrollerBP/Blueprints**。
    
4.  现在，你可以重命名你的蓝图，或者让它继续使用默认名称 **LaunchPad\_Blueprint**。
    
5.  点击 **创建蓝图（Create Blueprint）**。
    

你的蓝图现在可以在 **内容浏览器（Content Browser）** 中看到。现在，你可以从 **内容浏览器（Content Browser）** 拖放到该关卡，创建大量平台网格体和触发器的副本，但其上还没有任何行为。在下一步中，你将开始在蓝图中设置图表节点，以便在角色穿过弹跳平台时弹射角色。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd17f3cd-4990-448f-8d0e-0d3250e907c3/bpqs_3_finalresult.png "BPQS_3_FinalResult.png")

## 4 - 创建你的起始点

要开始向蓝图类添加行为，需要在蓝图编辑器中打开它。

1.  双击 **内容浏览器（Content Browser）** 中的蓝图类。
    
2.  **蓝图编辑器（Blueprint Editor）** 将打开，你可在视口中看到你的 **立方体（Cube）** 和 **盒体（Box）** 组件。此时，如果你调整 **盒体（Box）** 组件的位置，它将应用于你从这个蓝图类创建的所有弹跳平台。就像在LaunchPad Actor上处理组件一样，你可以在 **组件（Components）** 列表中选择 **盒体（Box）** 组件并调整位置。尝试把位置设为 (X: 0, Y: 0, Z: 350)。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba931b38-aa2d-4c61-bd28-2f4532170638/bpqs_4_step2.png "BPQS_4_Step2.png")
3.  停靠在 **视口（Viewport）** 选项卡旁边的是 **构造脚本（Construction Script）** 选项卡和 **事件图表（Event Graph）** 选项卡。由于你将创建游戏行为，你应该从 **事件图表（Event Graph）** 开始。现在单击该选项卡。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4a4e3f4-c183-4af8-9ba3-b3b6cb2f139c/eventgraphstart.png)
    
    事件是蓝图图表执行的起始点，并且可以与许多不同的游戏进程场景相关联。最常用事件的选择将立即可见，被视为半透明的事件节点。虽然肯定对你的许多蓝图图表有用，但我们将制作一个我们自己的事件。
    
4.  我们想要一个当任何东西与我们的 **盒体（Box）** 组件重叠时将执行的事件。首先，在 **组件（Components）** 选项卡中选择 **盒体（Box）** 组件。
    
5.  右键单击图表中的某个空白位置，打开快捷菜单以便在图表中添加节点。
    
    要在图表中四处移动，请右键单击并拖动图表。此时，你可以将图表拖到左侧，将预先放置的事件节点移出屏幕左侧，并创建更多的空白空间来创建弹跳平台逻辑。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9fd09c80-16a4-4606-a19e-b4801f6abb1c/rightclickcontext.png)
6.  我们正在为该组件添加一个事件，因此要展开 **为盒体添加事件（Add Event for Box）** 下拉菜单，然后展开 **碰撞（Collision）**。你也可以使用搜索框，使用"组件开始重叠（Component Begin Overlap）"来过滤菜单。
    
7.  选择 **在组件开始重叠时（On Component Begin Overlap）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c22c334f-34b0-4c7e-8117-6c6ee7082aa0/bpqs_4_step7.png "BPQS_4_Step7.png")

你的图表现在有一个 **OnComponentBeginOverlap** 节点。当某些内容与弹跳平台的盒体组件重叠时，连接到此事件的任何节点都将执行。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2fea8f4-04e3-49e6-8248-e9c4bde76ddc/eventnode.png)

在本指南的下一步中，你将开始将节点连接到该节点的输出引脚，并了解更多关于在蓝图中使用节点的内容。

## 5 - 测试重叠Actor

现在，任何内容与盒体触发器重叠时，**OnComponentBeginOverlap** 事件都将执行。但是，如果重叠的内容是我们的化身或Pawn，那么我们只想实际执行我们的弹射行为。把它想成是这样的问题："与盒体触发器重叠的Actor是不是与我们的Pawn相同的那个Actor？"

我们将通过处理来自 **OnComponentBeginOverlap** 事件的其他Actor输出来实现这一点。

1.  单击 **OnComponentBeginOverlap** 事件上的 **其他Actor（Other Actor）** 引脚，并拖动到图表上的一个空白点中，释放以打开快捷菜单。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a666ce7-67ee-4809-a456-27dae3360e97/otheractorcontext.png)
    
    快捷菜单是自适应性的，通过当前使用的引脚进行过滤，只显示兼容的节点。
    
2.  在搜索框中键入"="，以过滤可用节点，然后选择 **等于（对象）（Equal (Object)）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88abf038-8b6c-4113-90ef-d00478ed02ef/bpqs_5_step2.png "BPQS_5_Step2.png")
    
    我们可以将 **横版过关角色（Side Scroller Character）** 设置为 **Equals** 节点的另一个输入，但是如果我们更改了正在使用的角色，就需要重新打开该蓝图并手动更新它。所以，让我们来获得一个对当前使用的Pawn的引用。
    
3.  **右键单击** 图表空白位置，打开快捷菜单。
4.  在菜单搜索框中键入 **玩家Pawn（Player Pawn）**，然后（在 **游戏（Game）** 下）选择 **获取玩家Pawn（Get Player Pawn）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93211736-cf67-4529-b93b-4ddb5c4c45a8/getplayerpawnmenu.png)
5.  将 **获取玩家Pawn（Get Player Pawn）** 上的 **返回值（Return Value）** 输出连接到 **Equals** 节点上的第二个输入。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96a7602b-dfc6-4466-950e-0bc95117f93b/bpqs_5_step5.png "BPQS_5_Step5.png")
    
    现在我们有了一个节点，它将告诉我们另一个Actor是不是我们的玩家控制的Pawn，我们将使用该答案来更改我们图表的执行流程。也就是说，当执行流程离开On Component Begin Overlap节点时，我们将引导执行流程。为此，我们想要使用Flow Control节点，特别是 **Branch** 节点。
    
6.  拖出 **OnComponentBeginOverlap** 节点上的执行引脚，并在图表的空白部分中释放。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60c57114-1e10-424d-90bf-84ff9b070b2f/bpqs_5_step6.png "BPQS_5_Step6.png")
7.  在搜索中键入"Branch"，然后从快捷菜单中选择 **分支（Branch）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9bf30d56-a0f3-420d-903f-51cccc5a3b7a/bpqs_5_step7.png "BPQS_5_Step7.png")
8.  将 **Equals** 节点的输出引脚连接到 **Condition** 节点的输入布尔引脚。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/857ee9a2-cc33-4207-b101-d987a4222792/bpqs_5_step8.png "BPQS_5_Step8.png")

现在，你可以根据重叠的Actor是否是你的Pawn来设置要执行的不同行为了。下一步中我们就会这么做，并且如果 **Equals** 比较的结果是 **True**，就设置蓝图节点来启动我们的角色。

## 6 - 让你的角色跳起来

我们的弹跳平台将使用一个名为 **Launch Character** 的函数来工作。**Launch Character** 函数将指定的速度添加到角色的当前速度，允许你将其扔向任何你想要的方向。不过它只对角色有效，所以我们需要确保我们的Pawn（化身）是一个角色（类人化身）。

我们通过转换做到这一点。转换试图将你的输入转换为不同的类型，以便你可以访问仅允许用于该特定类型的特定功能。如果你的输入基于该类型，则会成功。

除了以后添加的任何其他特殊行为之外，你可以在关卡中放置的所有内容都是Actor。这意味着你可以获得关卡中的任何内容的引用，并将其转换为 **Actor**，然后就会成功。然而，关卡中并不是所有东西都是游戏中代表你的Pawn，所以将一些东西转换为 **Pawn** 可能成功也可能失败。

1.  拖出 **Get Player Pawn** 节点的 **返回值（Return Value）** 引脚。
    
2.  在搜索框中键入"Cast"，然后在快捷菜单中选择 **转换为角色（Cast to Character）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/037b2862-a772-497a-9b50-ba405d5bdfb7/casttocharactermenu.png)
3.  拖出 **Cast to Character** 节点的 **As Character** 引脚。
    
4.  在搜索框中键入"Launch"，然后在快捷菜单中选择 **弹射角色（Launch Character）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87405979-35b3-4f39-b530-aa11b12ee18c/bpqs_6_step4.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87405979-35b3-4f39-b530-aa11b12ee18c/bpqs_6_step4.png)
    
    单击图像以查看完整尺寸。
    
    注意，用于成功转换的输出执行引脚自动连接到 **弹射角色（Launch Character）** 的输入执行引脚。
    
5.  在 **Launch Character** 节点的Z字段中键入 **3000**。
    
6.  最后，将 **Branch** 节点的 **True** 执行引脚连接到 **Cast to Character** 节点的输入执行引脚，这样 **转换为角色（Cast to Character）** 和 **弹射角色（Launch Character）** 仅在重叠的Actor是我们的Pawn时发生。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ddd0b7c-fd3d-4e31-8b00-5879a42c551d/bpqs_6_step6.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ddd0b7c-fd3d-4e31-8b00-5879a42c551d/bpqs_6_step6.png)
    
    单击图像以查看完整尺寸。
    
    此时，使用工具栏按钮 **编译（Compile）** 和 **保存（Save）** 蓝图，然后关闭蓝图编辑器。
    
7.  从 **内容浏览器（Content Browser）** 中拖曳几个弹跳平台到你的关卡。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/894efaef-c7ab-43c9-8950-ced8b237e90f/bpqs_6_step7.png "BPQS_6_Step7.png")
8.  单击工具栏中的 **运行（Play）**，然后在关卡中奔跑（使用WASD）和跳跃（使用空格键）。降落在其中一个平台上，观看你在空中飞翔！
    

## 7 - 放手尝试！

使用你在本快速入门指南的课程中所学到的知识，尝试执行以下操作：

1.  使用[音频组件](/documentation/404)在角色被弹射出去时播放声音。
    
2.  创建[变量](/documentation/zh-cn/unreal-engine/blueprint-variables-in-unreal-engine)来存储你的弹射速度，并公开它，以便你可以在关卡的每个副本上设置它。
    
3.  将[粒子系统组件](/documentation/zh-cn/unreal-engine/rendering-components-in-unreal-engine)添加到你的蓝图，并使用 **初学者内容包（Starter Content）** 中的[粒子系统](/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine)之一。
    
4.  添加一个[箭头组件](/documentation/zh-cn/unreal-engine/basic-components-in-unreal-engine)并使用其旋转来定义弹射角色的方向。
    
5.  使用[时间轴](/documentation/zh-cn/unreal-engine/timelines-in-unreal-engine)将一些动画添加到盒体网格体来表示它正在弹射角色。
    

有关蓝图可视化脚本的更多信息，请参阅[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)页面。

关于这一快速入门所涉及的具体内容：

1.  有关可创建的不同类型蓝图类的快速概述，请参阅：[蓝图入门](/documentation/zh-cn/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine)
    
2.  有关蓝图类的更多信息，请参阅：[蓝图类](/documentation/zh-cn/unreal-engine/blueprint-class-assets-in-unreal-engine)
    
3.  有关创建和使用蓝图类的更多简短教程，请参阅：[蓝图教程](/documentation/zh-cn/unreal-engine/blueprint-workflows-in-unreal-engine)
    
4.  有关蓝图编辑器的更多信息，请参阅：[蓝图编辑器](/documentation/zh-cn/unreal-engine/user-interface-reference-for-the-blueprints-visual-scripting-editor-in-unreal-engine)
    

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1 - 必要的项目设置](/documentation/zh-cn/unreal-engine/quick-start-guide-for-blueprints-visual-scripting-in-unreal-engine#1-%E5%BF%85%E8%A6%81%E7%9A%84%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [2 - 构建你的弹跳平台](/documentation/zh-cn/unreal-engine/quick-start-guide-for-blueprints-visual-scripting-in-unreal-engine#2-%E6%9E%84%E5%BB%BA%E4%BD%A0%E7%9A%84%E5%BC%B9%E8%B7%B3%E5%B9%B3%E5%8F%B0)
-   [3 - 将你的Actor转换为蓝图类](/documentation/zh-cn/unreal-engine/quick-start-guide-for-blueprints-visual-scripting-in-unreal-engine#3-%E5%B0%86%E4%BD%A0%E7%9A%84actor%E8%BD%AC%E6%8D%A2%E4%B8%BA%E8%93%9D%E5%9B%BE%E7%B1%BB)
-   [4 - 创建你的起始点](/documentation/zh-cn/unreal-engine/quick-start-guide-for-blueprints-visual-scripting-in-unreal-engine#4-%E5%88%9B%E5%BB%BA%E4%BD%A0%E7%9A%84%E8%B5%B7%E5%A7%8B%E7%82%B9)
-   [5 - 测试重叠Actor](/documentation/zh-cn/unreal-engine/quick-start-guide-for-blueprints-visual-scripting-in-unreal-engine#5-%E6%B5%8B%E8%AF%95%E9%87%8D%E5%8F%A0actor)
-   [6 - 让你的角色跳起来](/documentation/zh-cn/unreal-engine/quick-start-guide-for-blueprints-visual-scripting-in-unreal-engine#6-%E8%AE%A9%E4%BD%A0%E7%9A%84%E8%A7%92%E8%89%B2%E8%B7%B3%E8%B5%B7%E6%9D%A5)
-   [7 - 放手尝试！](/documentation/zh-cn/unreal-engine/quick-start-guide-for-blueprints-visual-scripting-in-unreal-engine#7-%E6%94%BE%E6%89%8B%E5%B0%9D%E8%AF%95%EF%BC%81)
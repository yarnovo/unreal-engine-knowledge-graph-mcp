# Gameplay摄像机系统快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/gameplay-camera-system-quick-start
> 
> 生成时间: 2025-06-14T19:45:52.774Z

---

目录

![Gameplay摄像机系统快速入门](https://dev.epicgames.com/community/api/documentation/image/0ef48d3a-4f8d-4914-b672-7b89d56ce9c6?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

本篇快速入门指南将教你如何使用 **Gameplay摄像机系统** 创建三种不同的摄像机绑定。这些摄像机绑定将复制虚幻引擎自带模板中的以下摄像机设置：

-   第三人称
-   第一人称
-   俯视角

如需详细了解本系统，请参阅[Gameplay摄像机系统概览](/documentation/zh-cn/unreal-engine/gameplay-camera-system-overview)文档。

## 必要设置

1.  新建项目并选择 **游戏（Games）** 类别和 **第三人称（Third Person）** 模板。
    
    -   输入项目的 **位置（Location）** 和 **名称（Name）** 。
    -   点击 **创建（Create）** 。
    
    ![创建新项目并选择第三人称模版](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1f33d03-269b-416a-bcc5-7596f61c39dd/gameplay-cameras-quickstart-1.png)
2.  点击 **设置（Settings）> 插件（Plugins）** 打开 **插件（Plugins）** 窗口。
    
    -   搜索并 **启用** **Gameplay摄像机（Gameplay Cameras）** 插件。如有必要，请重启编辑器。
    
    ![点击设置 - 插件以打开插件窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02040532-eb63-4384-b946-e6515cca5b99/gameplay-cameras-quickstart-2.png) ![搜索并开启Gameplay摄像机插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f4df843-3d79-42db-a661-1fc38d5de78c/gameplay-cameras-quickstart-3.png)
3.  在编辑器中，点击 **文件（File）> 新关卡（New Level）** 。
    
    -   选择 **基础（Basic）** 模板并点击 **创建（Create）** 。
    
    ![选择基础模板并点击创建](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cad56bbc-3e55-48ec-9239-49ea28d1cec3/gameplay-cameras-quickstart-4.png)

### 阶段成果

在本节中，你新建了项目并进行了设置，以便使用Gameplay摄像机系统为玩家创建多套摄像机设置。

## 创建摄像机资产

**摄像机资产（Camera Asset）** 包含一个或多个 **摄像机绑定（Camera Rigs）** 、 **过渡（Transitions）** 和 **摄像机指示器（Camera Director）** 的信息，用于确定游戏过程中的活动摄像机绑定。

要创建摄像机资产，请按照以下步骤操作：

1.  右键点击 **内容浏览器（Content Browser）** ，选择 **Gameplay > 摄像机资产（Camera Asset）** 。
    
    ![右键点击内容浏览器，选择Gameplay - 摄像机资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54b006f9-7306-4c21-b341-f5f0b7216ace/gameplay-cameras-quickstart-5.png)
2.  在 **选择摄像机指示器类型（Pick Camera Director Type）** 窗口中，选择 **蓝图摄像机指示器（Blueprint Camera Director）** 并点击 **选择（Select）** 。
    
    ![选择蓝图摄像机指示器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a0fa90e-888a-4ab2-ae59-1077822f021a/gameplay-cameras-quickstart-6.png)
3.  将资产命名为 **CA\_PlayerCameras** 。
    

### 第一人称摄像机绑定

1.  打开 **CA\_PlayerCameras** 并点击工具栏中的 **绑定（Rigs）** 以查看可用的摄像机绑定。
    
2.  将默认绑定重命名为 **FirstPerson** 。
    
    ![打开CA_PlayerCameras，点击绑定并将默认绑定重命名为FirstPerson](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/438fd2ff-fbaf-4a17-b926-157893e041a9/gameplay-cameras-quickstart-7.png)
3.  点击 **工具箱（Toolbox）** 面板以查看可用节点。
    
    ![点击工具箱面板以查看可用节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f22c28f-7954-46b7-a050-3429bb272f82/gameplay-cameras-quickstart-8.png)
4.  添加 **Sequence** 节点和 **Boom Arm** 节点，如下所示。
    
5.  选择 **Boom Arm** 节点，转到 **细节（Details）** 面板并将 **吊臂偏移（Boom Offset）** 的X、Y和Z分别设为 **50** 、 **0** 和 **50** 。
    
    ![添加Sequence和Boom Arm节点，设吊臂偏移为50、0、50](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f4dbf10-d142-4234-9703-a36141dee60c/gameplay-cameras-quickstart-9.png)
6.  添加 **Field of View** 节点，转到 **细节（Details）** 面板，将 **视野（Field of View）** 设为 **100** 。
    
    ![添加Field of View节点并设为100](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2573e6b4-04c6-4ed0-9f16-6a9f46dcb76f/gameplay-cameras-quickstart-10.png)

### 第三人称摄像机绑定

1.  创建新的 **摄像机绑定（Camera Rig）** ，将其命名为 **ThirdPerson** 。
    
    ![创建新的摄像机绑定，命名为ThirdPerson](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df52991b-2bfb-4d8a-a332-f1f2f970521d/gameplay-cameras-quickstart-11.png)
2.  添加 **Sequence** 节点和 **Boom Arm** 节点，如下所示。
    
3.  选择 **Boom Arm** 节点，转到 **细节（Details）** 面板并将 **吊臂偏移（Boom Offset）** 的X、Y和Z分别设为 **\-500** 、 **0** 和 **50** 。
    
    ![添加Sequence和Boom Arm节点，设吊臂偏移为-500、0、50](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7f8703b-0025-4882-9544-235a5fccf57a/gameplay-cameras-quickstart-12.png)
4.  拖出 **输入插槽（Input Slot）** 引脚并选择 **输入轴绑定2D（Input Axis Binding 2D）** 。这将把InputSlot公开给蓝图，供你之后修改。
    
    ![拖移输入插槽引脚并选择输入轴绑定2D](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/609f17a4-10ff-452d-bd3e-6d122a363f8c/gameplay-cameras-quickstart-13.png)
5.  转到 **细节（Details）** 面板并添加 **IA\_Look** 轴动作。
    -   **勾选** **Y轴最小限制（Clamp Y Min）** 和 **最大限制（Max）** 复选框，分别为 **最小值（Min Value）** 和 **最大值（Max Value）** 输入 **\-80** 和 **10** 。
    -   **勾选** **反转Y轴（Revert Axis Y）** 复选框。
        
        ![添加IA_Look轴动作，为Clamp Y Min输入-80，Max输入10，勾选反转Y轴](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9bdde56a-731a-4cf1-8935-d23c346d3c3a/gameplay-cameras-quickstart-14.png)
6.  拖出 **BoomOffset** 引脚并点击 **摄像机绑定参数（Camera Rig Parameter）** ，将此变量公开给蓝图。
    
    ![拖出BoomOffset引脚并点击摄像机绑定参数，将此变量公开给蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47c3f631-8cac-4c7c-90c9-ed5c51eaeae5/gameplay-cameras-quickstart-35.png)
7.  添加 **Field of View** 节点和 **Dampen Position** 节点。选择 **Dampen Position** 节点，转到 **细节（Details）** 面板并为 **前向阻尼系数（Forward Damping Factor）** 输入 **5** 。
    
    ![添加Field of View节点和Dampen Position节点，设前向阻尼系数为5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63a4c821-e0bd-4fa5-98b0-96bbc8b7ea6a/gameplay-cameras-quickstart-15.png)
8.  添加 **Occlusion Material** 节点，转到 **细节（Details）** 面板，从 **遮蔽透明度材质（Occlusion Transparency Material）** 下拉菜单中选择一项材质。下面示例中显示了使用的半透明材质。
    
    ![添加Occlusion Material节点，从遮蔽透明度材质下拉菜单中选择一项材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d983f2e-10d9-4aff-9965-9bae19765462/gameplay-cameras-quickstart-16.png) ![此示例使用的半透明材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d93784c9-bc16-4a05-81cd-aec953f60b3e/gameplay-cameras-quickstart-17.png)

### 俯视角摄像机绑定

1.  创建新的 **摄像机绑定（Camera Rig）** ，将其命名为 **TopDown** 。
    
    ![创建新摄像机绑定，命名为TopDown](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ad8ef5e-0bfb-4db2-9543-7e2d28c4e21e/gameplay-cameras-quickstart-18.png)
2.  添加 **Sequence** 节点和 **Boom Arm** 节点，如下所示。 选择 **Boom Arm** 节点，转到 **细节（Details）** 面板并将 **吊臂偏移（Boom Offset）** 的X、Y和Z分别设为 **\-1000** 、 **0** 和 **0** 。
    
    ![添加Sequence和Boom Arm节点，设吊臂偏移为-1000、0、0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74e5277d-8e01-4d23-8511-1efae637ac5b/gameplay-cameras-quickstart-19.png)
3.  添加 **Field of View** 节点和 **Dampen Position** 节点。选择 **Dampen Position** 节点，转到 **细节（Details）** 面板并为 **前向阻尼系数（Forward Damping Factor）** 输入 **5** 。
    
    ![添加Field of View节点和Dampen Position节点，设前向阻尼系数为5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a793c56-a077-4c56-a983-adbc348304c9/gameplay-cameras-quickstart-21.png)
4.  添加 **Occlusion Material** 节点，转到 **细节（Details）** 面板，从 **遮蔽透明度材质（Occlusion Transparency Material）** 下拉菜单中选择一项材质。使用与 **第三人称摄像机绑定** 相同的材料。
    
    ![添加Occlusion Material节点，从遮蔽透明度材质下拉菜单中选择一项材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cdc15a0-463b-499f-b96c-23c21e5337fd/gameplay-cameras-quickstart-22.png)

### 摄像机指示器

1.  点击 **指示器（Director）** 按钮，前往 **指示器（Director）** 选项卡。
    
2.  点击 **+** 以创建新的 **指示器蓝图（Director Blueprint）** 。
    
    ![点击指示器按钮，点击+以创建新的指示器蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ce801cf-930e-4b15-802e-a57ff62fca65/gameplay-cameras-quickstart-32.png)
3.  选择 **目标文件夹** ，输入名称 **CDE\_PlayerCameras** 并点击 **保存（Save）** 。
    
    ![选择目标文件夹，输入CDE_PlayerCameras并点击保存](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d48b82d-d01d-41ac-bfba-e816d9a08359/gameplay-cameras-quickstart-33.png)
4.  点击 **编译（Build）** 。
    
    ![点击编译](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3915e8d3-dff6-421d-9d6b-1c444f726027/gameplay-cameras-quickstart-34.png)

### 阶段成果

在本节中，你创建了供玩家角色蓝图使用的三个摄像机绑定。

## 创建摄像机过渡

在本节中，你将为上一节创建的摄像机绑定创建过渡效果。

按照以下步骤操作，创建摄像机绑定的过渡：

1.  打开 **第一人称摄像机绑定（First Person Camera Rig）** 并点击 **过渡（Transitions）** 。
    
    -   拖出 **退出过渡0（Exit Transitions 0）** 引脚并选择 **退出过渡（Exit Transition）** 。
    -   拖出 **Camera Rig Transition** 节点的 **混合（Blend）** 引脚并选择 **平滑混合（Smooth Blend）** 。
    
    ![打开第一人称摄像机绑定并点击过渡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49066b9b-f560-4962-b5be-1e198b42281a/gameplay-cameras-quickstart-45.png) ![拖出退出过渡0引脚并选择退出过渡，拖出混合引脚并选择平滑混合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a51d119-01f5-4650-baf0-0cf025c6e848/gameplay-cameras-quickstart-46.png)
2.  为 **第三人称（Third Person）** 摄像机绑定和 **俯视角（Top Down）** 摄像机绑定重复以上步骤。
    
    ![为第三人称摄像机绑定重复以上步骤](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec3b8474-94e6-4421-9a29-3c1c04b50589/gameplay-cameras-quickstart-47.png) ![为俯视角摄像机绑定重复以上步骤](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6ae989d-f7fe-4dfd-8e8b-4bdc661d307a/gameplay-cameras-quickstart-48.png)

### 阶段成果

在本节中，你为摄像机绑定创建了过渡效果。

在下一节中，你将修改玩家蓝图，使其能够在游戏过程中使用摄像机绑定。

## 为玩家添加Gameplay摄像机组件

要为玩家蓝图添加 **Gameplay摄像机组件** ，请按照以下步骤操作：

1.  在 **内容浏览器（Content Browser）** 中，转至 **第三人称（ThirdPerson）> 蓝图（Blueprints）** 并双击 **BP\_ThirdPersonCharacter** 以打开蓝图。
    
    ![打开BP_ThirdPersonCharacter蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dea1cc54-54d7-4feb-90e9-f0750ec63c6d/gameplay-cameras-quickstart-23.png)
2.  转到 **组件（Components）** 窗口，删除 **CameraBoom** 和 **FollowCamera** 组件。
    
    ![删除CameraBoom和FollowCamera组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07177e85-4b3a-4f80-82f1-7ddbd2f488b8/gameplay-cameras-quickstart-24.png)
3.  点击 **+添加（+Add）** 并选择 **GameplayCamera** 以添加该组件。
    
    -   转到 **细节（Details）** 面板并向下滚动到 **摄像机（Camera）**分段，为其下拉菜单添加 **CA\_PlayerCameras** 。
    -   转到 **激活（Activation）** 分段并 **勾选** **自动激活（Auto Activate）** 复选框。然后选择 **为玩家自动激活（Auto Activate for Player）** 下拉菜单中的 **玩家0（Player 0）** 。
    
    ![点击+添加，搜索并选择GameplayCamera以添加组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12c8e9bc-8438-4e4d-b598-580edb9378d0/gameplay-cameras-quickstart-25.png) ![添加CA_PlayerCameras到摄像机下拉菜单，勾选自动激活，选择为玩家自动激活下拉菜单的玩家0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/542e7218-97c6-4d50-b058-fbf7c6e20a80/gameplay-cameras-quickstart-26.png)
4.  转到 **事件图表（Event Graph）** 并添加键盘按键 **1** 、 **2** 、**3** 作为 **三个输入事件** 。
    
    -   创建新的 **整型变量** ，将其命名为 **ActiveCameraRig** 。
    -   将该变量拖入 **事件图表** ，选择 **设置活动摄像机绑定（Set Active Camera Rig）** 并将其连接到第一个键盘事件。
    -   为另外两个事件重复上述步骤，并将其值设为 **0** 、 **1** 和 **2** ，如下所示。
    
    ![转到事件图表并添加三个输入事件，即键盘按键1、2、3，然后选择设置活动摄像机绑定并连接到键盘事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2b3eac0-82ad-4652-92b7-7abda21cd001/gameplay-cameras-quickstart-27.png)
    
    该变量的值稍后将被用于确定游戏过程中要激活哪个摄像机绑定。
    
5.  在 **事件图表（Event Graph）** 中添加 **鼠标滚轮上滚（Mouse Wheel Up）** 和 **鼠标滚轮下滚（Mouse Wheel Down）** 为输入事件。
    
    -   创建名为 **BoomLength** 的浮点变量，将其 **默认值** 设为 **\-500** 。
    -   创建名为 **BoomZoomStep** 的浮点变量，将其 **默认值** 设为 **25** 。
    
    ![在事件图表中添加鼠标滚轮上滚和鼠标滚轮下滚输入事件，创建名为BoomLength和BoomZoomStep的浮点变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/825cf894-d215-4fb0-a94e-4fa606de9142/gameplay-cameras-quickstart-28.png)
6.  将 **BoomLength** 和 **BoomZoomStep** 节点添加至 **事件图表（Event Graph）** ，如下所示。
    
    -   在 **鼠标滚轮上滚（Mouse Wheel Up）** 上，为 **吊臂长度（Boom Length）** **添加** **吊臂缩放步长（Boom Zoom Step）** 。
    -   相反地，在 **鼠标滚轮下滚（Mouse Wheel Down）** 上，为 **吊臂长度（Boom Length）** **删减** **吊臂缩放步长（Boom Zoom Step）** 。
    
    如此一来，当鼠标滚轮上滚时，会拉近摄像机；下滚时则拉远摄像机。
    
    ![添加或删减BoomZoomStep以设置BoomLength](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/134cbd31-a713-42ae-8b15-9e3a202438b7/gameplay-cameras-quickstart-29.png)
7.  将 **GameplayCamera组件（GameplayCamera component）** 拖到 **事件图表（Event Graph）** 以创建节点。
    
    -   从 **GameplayCamera** 节点拖出引线，然后搜索并选择 **Get Initial Variable Table** 。
    
    ![将GameplayCamera组件拖入事件图表，然后从GameplayCamera节点拖出引线并选择Get Initial Variable Table](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/714e0f40-9a8f-436b-91c2-3768fbd504ed/gameplay-cameras-quickstart-30.png)
8.  拖出 **Get Initial Variable Table** 节点的 **返回值（Return Value）** 引脚，搜索并选择 **Set Camera Rig Parameters** 。
    
    -   选择 **CA\_PlayerCameras** 并点击 **ThirdPerson** 绑定。
    -   连接 **Set BoomLength** 节点和 **Set Camera Rig Parameters** 节点。
    
    ![拖移Get Initial Variable Table节点，搜索并选择Set Camera Rig Parameters，然后选择CA_PlayerCameras并点击ThirdPerson绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ab8c5d7-7e12-4b8e-ab88-682c5c87648d/gameplay-cameras-quickstart-31.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c1ab3be-45ec-456b-b711-616a84b68bed/gameplay-cameras-quickstart-36.png)
9.  右键点击 **吊臂偏移（Boom Offset）** 引脚，选择 **Split Struct Pin** ，将 **吊臂长度（Boom Length）** 变量连接至 **X轴吊臂偏移（Boom Offset X）** 引脚。
    
    ![连接Set BoomLength节点和Camera Rig Parameters节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc7a128b-5f89-4735-946a-b93b10284634/gameplay-cameras-quickstart-37.png)
10.  为 **鼠标滚轮下滚（Mouse Wheel Down）** 输入事件重复上述步骤。最终的蓝图代码见下方。
    
    ![为鼠标滚轮下滚输入事件重复上述步骤](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3744fa8f-dbb6-4289-9c42-c1a1943b9203/gameplay-cameras-quickstart-38.png)

### 阶段成果

在本节中，你为玩家蓝图添加了Gameplay摄像机组件。你还添加了脚本，可以在不同的摄影机绑定之间切换，并拉远和拉近第三人称摄影机绑定。

在下一节中，你将配置摄像机指示器蓝图，使其能够在玩家按下1-3键的同时切换不同的摄像机绑定。

## 配置摄像机指示器

在本节中，你将修改摄像机指示器求值器蓝图（Camera Director Evaluator Blueprint），让玩家能够在游戏过程中切换摄像机绑定。

请按照以下步骤配置摄像机指示器：

1.  打开 **CDE\_PlayerCameras** 并右键点击 **事件图表（Event Graph）** 。
    
    -   搜索并选择 **Find Evaluation Context Owner Actor** 。 \*点击下拉菜单并选择 **BP\_ThirdPersonCharacter** 。
    
    ![索并选择Find Evaluation Context Owner Actor，点击下拉菜单并选择BP_ThirdPersonCharacter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3c4ce0a-dea4-4e31-9f25-9f503213f87f/gameplay-cameras-quickstart-39.png)
2.  拖出 **Find Evaluation Context Owner Actor** 节点的 **返回值（Return Value）** 引脚，搜索并选择 **Get Active Camera Rig** 。
    
    -   从 **Active Camera Rig** 节点拖出引线，搜索并选择 **Switch on Int** 。
    -   点击三次 **添加引脚 +（Add Pin +）** 以添加引脚 **0** 、 **1** 和 **2** 。
    
    ![从Find Evaluation Context Owner Actor节点拖出引线，选择Active Camera Rig](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c950af9-c11f-4b7d-b3ab-379f2f5ef98e/gameplay-cameras-quickstart-40.png) ![从Active Camera Rig节点拖出引线，选择Switch on Int](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/196026ff-54c4-4386-ab2f-1306d099a599/gameplay-cameras-quickstart-41.png)
3.  拖出 **Switch on Int** 节点的 **0** 引脚，搜索并选择 **Activate Camera Rig** 。
    
    -   点击 **摄像机绑定（Camera Rig）** 下拉菜单，选择 **ThirdPerson** 。
    
    ![拖出Switch on Int节点的0引脚，搜索并选择Activate Camera Rig，点击摄像机绑定下拉菜单并选择ThirdPerson](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2aac2d6-387a-4917-acda-07a64bd8384e/gameplay-cameras-quickstart-42.png)
4.  添加另外两个 **Activate Camera Rig** 节点，连接 **Switch on Int** 节点的 **1** 和 **2** 引脚。
    
    -   将 **摄像机绑定（Camera Rig）** 下拉菜单设为 **FirstPerson** 和 **TopDown** ，如下图所示。
    
    ![添加另外两个Activate Camera Rig节点，连接Switch on Int节点的1、2引脚，将摄像机绑定下拉菜单设为FirstPerson和TopDown](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82f37af2-da31-40bf-91a4-5eb7fb879ab8/gameplay-cameras-quickstart-43.png)
5.  从 **Find Evaluation Context Owner Actor** 节点拖出引线，搜索并选择 **Get Controller** 。
    
    -   从 **Get Controller** 节点拖出引线，搜索并选择 **Set Control Rotation** 。
    -   右键点击 **Set Control Rotation** 节点的 **旋转（Rotation）** 引脚，然后选择 **Split Struct Pin** 。
    -   将 **新Y轴旋转（俯仰）（New Rotation Y (Pitch)）** 设为 **\-50** 。
    -   连接 **Activate Camera Rig** 节点和 **Set Control Rotation** 节点，如下所示。
    
    ![从Find Evaluation Context Owner Actor节点拖出引线，选择Get Controller，从Get Controller节拖出引线，选择Set Control Rotation](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6bcd7bb8-36a6-4313-8b59-5410955c78c9/gameplay-cameras-quickstart-44.png)
6.  按下 **运行（Play）** 以测试Gameplay摄像机系统。按下 **按键1 - 3** 以切换不同的 **摄像机绑定** ，并在使用 **第三人称** 摄像机绑定时，通过 **鼠标滚轮** 来拉远或拉近摄像机。
    

### 阶段成果

在本节中，你将学习了如何配置摄像机指示器，从而在Gameplay中切换不同的摄像机绑定。

## 6 - 自行尝试！

现在你已经学会了如何使用Gameplay摄像机系统，可以自行尝试创建具有不同行为的摄像机绑定。

-   [experimental](https://dev.epicgames.com/community/search?query=experimental)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [必要设置](/documentation/zh-cn/unreal-engine/gameplay-camera-system-quick-start#%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [阶段成果](/documentation/zh-cn/unreal-engine/gameplay-camera-system-quick-start#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C)
-   [创建摄像机资产](/documentation/zh-cn/unreal-engine/gameplay-camera-system-quick-start#%E5%88%9B%E5%BB%BA%E6%91%84%E5%83%8F%E6%9C%BA%E8%B5%84%E4%BA%A7)
-   [第一人称摄像机绑定](/documentation/zh-cn/unreal-engine/gameplay-camera-system-quick-start#%E7%AC%AC%E4%B8%80%E4%BA%BA%E7%A7%B0%E6%91%84%E5%83%8F%E6%9C%BA%E7%BB%91%E5%AE%9A)
-   [第三人称摄像机绑定](/documentation/zh-cn/unreal-engine/gameplay-camera-system-quick-start#%E7%AC%AC%E4%B8%89%E4%BA%BA%E7%A7%B0%E6%91%84%E5%83%8F%E6%9C%BA%E7%BB%91%E5%AE%9A)
-   [俯视角摄像机绑定](/documentation/zh-cn/unreal-engine/gameplay-camera-system-quick-start#%E4%BF%AF%E8%A7%86%E8%A7%92%E6%91%84%E5%83%8F%E6%9C%BA%E7%BB%91%E5%AE%9A)
-   [摄像机指示器](/documentation/zh-cn/unreal-engine/gameplay-camera-system-quick-start#%E6%91%84%E5%83%8F%E6%9C%BA%E6%8C%87%E7%A4%BA%E5%99%A8)
-   [阶段成果](/documentation/zh-cn/unreal-engine/gameplay-camera-system-quick-start#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-2)
-   [创建摄像机过渡](/documentation/zh-cn/unreal-engine/gameplay-camera-system-quick-start#%E5%88%9B%E5%BB%BA%E6%91%84%E5%83%8F%E6%9C%BA%E8%BF%87%E6%B8%A1)
-   [阶段成果](/documentation/zh-cn/unreal-engine/gameplay-camera-system-quick-start#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-3)
-   [为玩家添加Gameplay摄像机组件](/documentation/zh-cn/unreal-engine/gameplay-camera-system-quick-start#%E4%B8%BA%E7%8E%A9%E5%AE%B6%E6%B7%BB%E5%8A%A0gameplay%E6%91%84%E5%83%8F%E6%9C%BA%E7%BB%84%E4%BB%B6)
-   [阶段成果](/documentation/zh-cn/unreal-engine/gameplay-camera-system-quick-start#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-4)
-   [配置摄像机指示器](/documentation/zh-cn/unreal-engine/gameplay-camera-system-quick-start#%E9%85%8D%E7%BD%AE%E6%91%84%E5%83%8F%E6%9C%BA%E6%8C%87%E7%A4%BA%E5%99%A8)
-   [阶段成果](/documentation/zh-cn/unreal-engine/gameplay-camera-system-quick-start#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-5)
-   [6 - 自行尝试！](/documentation/zh-cn/unreal-engine/gameplay-camera-system-quick-start#6-%E8%87%AA%E8%A1%8C%E5%B0%9D%E8%AF%95%EF%BC%81)
# 在虚幻引擎中创建创建瞄准偏移 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-an-aim-offset-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:09:16.472Z

---

目录

![创建瞄准偏移](https://dev.epicgames.com/community/api/documentation/image/15672d12-92cf-4d81-8699-7b19721e9a5e?resizing_type=fill&width=1920&height=335)

本指南中，我们将创建一个[瞄准偏移](/documentation/zh-cn/unreal-engine/creating-an-aim-offset-in-unreal-engine)，这是一种资源，其中存储了一系列可混合的姿势，用于帮助角色瞄准武器。我们将一个动画序列细分成瞄准偏移的可用姿势，获取玩家的鼠标倾斜/偏转位置，并用它来确定使用哪个混合姿势，这样角色就可以在鼠标的位置上移动和瞄准（有一些限制），如下面的例子所示。

完成以下步骤将得到与上述类似的角色：

## 1 - 创建瞄准姿势

在本步骤中，我们更新默认可操作角色，并创建瞄准偏移所需的所有姿势。

在本指南中，我们使用 **蓝图第三人称模板（Blueprint Third Person Template）** 项目，并将 **动画初学者包（Animation Starter Pack）** 添加到项目中：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c59f96e-2bb8-41bf-b842-403ff1080dc4/animationassetpack.png)

你可以从Epic启动程序的 **虚幻商城（Marketplace）** 免费下载动画初学者包。

### 步骤

1.  在 **内容浏览器** 的 **Content/ThirdPersonBP/Blueprints** 文件夹下，打开 **第三人称游戏模式（ThirdPersonGameMode）**。
    
2.  在 **默认Pawn类（Default Pawn Class）** 下，单击下拉菜单并选择 **Ue4ASP\_Character**，然后单击 **保存（Save）** 并关闭蓝图。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0ab61d1-41f0-496a-8775-5aa3791259d9/animations1.png)
    
    我们将默认可操作角色更改为使用动画初学者包随附的角色。
    
3.  在 **内容浏览器** 中，打开 **Content/AnimStarterPack** 文件夹，然后单击 **新增（Add New）** 并创建一个名为 **AimPoses** 的文件夹。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcbf7c9f-df7f-4f3c-b57d-bff67b4102bb/aimoffset1.png)
4.  将 **Aim\_Space\_Hip** 资源拖动到 **AimPoses** 文件夹上，并选择 **复制（Copy）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00b33aab-794b-4867-affc-23b5300400e4/aimoffset2.png)
    
    这是一个动画序列，包含一系列瞄准武器的动作，我们将把这些动作分解成各个姿势。
    
5.  在 **AimPoses** 文件夹中，选中 **Aim\_Space\_Hip**，按 **Ctrl+W** 复制并将其命名为 **Aim\_Center**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4baad8af-6df8-4143-b3c8-8eca4a272ee5/aimoffset3.png)
6.  打开 **Aim\_Center** 资源，单击播放功能按钮中的 **暂停（Pause）** 按钮，然后单击 **ToFront** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32cda1ad-e87d-4041-ac19-47bff9e0e864/aimoffset4.png)
7.  **右键单击** 时间轴中的擦除条，然后选择 \*\*删除第1帧到第87帧（Remove from frame 1 to frame 87
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2465a945-4a4e-4bb9-a505-02cca9b80bfe/aimoffset5.png)
    
    现在我们有了一个单帧，其中包含一个可在瞄准偏移中使用的姿势。
    
8.  在 **AimPoses** 文件夹中，选中 **Aim\_Space\_Hip**，按 **Ctrl+W** 复制并将其命名为 **Aim\_Center\_Down**。
    
9.  打开 **Aim\_Center\_Down**，确保它在第 **0** 帧上，然后单击 **ToNext** 按钮转到第 **20** 帧。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45114114-9ed5-4025-b90b-f4826fc62f7a/aimoffset9.png)
    
    角色现在将在视口中向下瞄准，这就是用来向下瞄准的姿势。
    
10.  **右键单击** 时间轴中的擦除条，然后选择 **删除第0帧到第20帧（Remove frame 0 to frame 20）** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a051dbeb-5af4-4c1d-8d24-ba64040b3a51/aimoffset10.png)
    
    根据在擦除条上 **右键单击** 的位置，帧范围可能差一两帧，只要确保角色向下瞄准就好。
    
11.  再次 **右键单击** 时间轴中的擦除条，然后选择 **删除第1帧到第68帧（Remove from frame 1 to frame 68）** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93b178cb-12a6-4ccf-b78a-5a2af658a5b9/aimoffset11.png)
12.  在 **AimPoses** 文件夹中，选中 **Aim\_Space\_Hip**，按 **Ctrl+W** 复制并将其命名为 **Aim\_Center\_Up**。
    
13.  打开 **Aim\_Center\_Up**，确保它在第 **0** 帧上，然后单击 **ToNext** 按钮转到第 **10** 帧。
    
14.  **右键单击** 时间轴中的擦除条，然后选择 **删除第0帧到第10帧（Remove frame 0 to frame 10）** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89c4517e-d045-4de4-a425-a6fdf8b8b8a4/aimoffset14.png)
15.  再次 **右键单击** 时间轴中的擦除条，然后选择 **删除第1帧到第78帧（Remove from frame 1 to frame 78）** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72aaebe5-3b06-4191-9c9b-e9c2110f3fae/aimoffset15.png)
16.  每次都 **复制（Duplicate）** **Aim\_Space\_Hip** 资源，并基于下表创建剩余的各个姿势。
    
    动画名称
    
    起始关键帧
    
    删除第1帧
    
    删除第2帧
    
    **Aim\_Left\_Center**
    
    30
    
    0 - 30
    
    1 - 57
    
    **Aim\_Left\_Up**
    
    40
    
    0 - 40
    
    1 - 48
    
    **Aim\_Left\_Down**
    
    50
    
    0 - 50
    
    1 - 37
    
    **Aim\_Right\_Center**
    
    60
    
    0 - 60
    
    1 - 27
    
    **Aim\_Right\_Up**
    
    70
    
    0 - 70
    
    1 - 17
    
    **Aim\_Right\_Down**
    
    80
    
    0 - 80
    
    1 - 8
    
    对于每个动画，确保从建议的 **起始关键帧（Start At Keyframe）** 帧开始，然后 **右键单击** 擦除条并 **删除第1帧（Remove Frames 1）**，再次 **右键单击** 擦除条并 **删除第2帧（Remove Frames 2）**。每个动画都应是个单独的帧，角色瞄准其对应名称的方向。创建各个动画后，你的 **AimPoses** 文件夹中每个瞄准方向都有几种姿势。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/176e6d88-bf55-4d75-8806-4d8a4286a62b/aimoffset17.png)
17.  在 **内容浏览器** 中，按住 **Shift** 并选择各个瞄准姿势。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0465fa7f-2d78-4787-9053-c7a721aef88c/aimoffset18.png)
18.  **右键单击** 并在 **资源操作（Asset Actions）** 下选择 **通过属性矩阵批量编辑（Bulk Edit via Property Matrix）** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e1ff279-04cf-47bf-9c98-5828afb257cf/aimoffset19.png)
19.  在 **属性矩阵（Property Matrix）** 中，在 **附加设置（Additive Settings）** 下，将 **附加动画类型（Additive Anim Type）** 更改为 **模型空间（Mesh Space）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/355f4d7c-d888-41f6-baf4-2ccc28794b34/aimoffset20.png)
    
    为了使动画与瞄准偏移兼容，必须将其附加动画类型设置为 **模型空间（Mesh Space）**。
    
20.  将 **基础姿势类型（Base Pose Type）** 更改为 **选定动画帧（Selected animation frame）**，然后在 **基础姿势动画（Base Pose Animation）** 下，单击选取资源图标并选择 **Idle\_Rifle\_Hip**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a7284a7-96ae-4635-93a0-684c91d55604/add_01.png)
    
    该基础姿势类型将定义如何计算累加delta。
    
21.  一旦完成此操作，返回 **内容浏览器** 并单击 **全部保存（Save All）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46547603-48d8-44b9-a12e-609f9d3d78bb/aimoffset22.png)

创建各个姿势资源后，下一步我们将利用这些姿势创建瞄准偏移。

## 2 - 创建瞄准偏移

在这一步中，我们将使用各个瞄准姿势创建瞄准偏移，该偏移会混合在各个姿势之间。

### 步骤

1.  在 **Content/AnimStarterPack/UE4\_Mannequin/Mesh** 文件夹中，**右键单击** **UE4\_Mannequin** 并选择 **创建瞄准偏移（Create Aim Offset）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5af91bec-ed8d-4d92-a89c-091af052be7d/aimoffset23.png)
    
    这将基于该骨架创建瞄准偏移资源。
    
2.  在瞄准偏移（Aim Offset）窗口（中央窗口）的 **参数（Parameters）** 下，输入如下所示的参数。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/716376fa-ed8a-44d4-baf8-9dfb3f2fda60/aimoffset26.png)
    
    将 **X轴标签（X Axis Label）** 设置为 **Yaw**，将 **Y轴标签（Y Axis Label）** 设置为 **Pitch**，然后将两个轴范围都设置为 **\-90到90（-90 to 90）**，并单击 **应用参数更改（Apply Parameter Changes）**。
    
    瞄准偏移的工作原理非常类似于[混合空间](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine)，可用于基于参数混合我们的姿势。
    
3.  在 **资源浏览器** 中搜索 **Aim**，然后将 **Aim\_Center** 动画拖动到图表中心位置上，如下所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/701ee241-af00-4369-bd59-6e9c33c1739a/aimoffset27.png)
4.  将 **Aim\_Center\_Up** 拖动到位置 **1**，将 **Aim\_Center\_Down** 拖动到位置 **2**，如下所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b9457d2-c0f3-4958-b299-3eb01a5c1521/aimoffset28.png)
    
    你可以选择取消选中 **启用提示文本显示（Enable Tooltip Display）** 选项以关闭网格中的工具提示。
    
5.  将 **Aim\_Left\_Center** 拖动到位置 **1**，将 **Aim\_Right\_Center** 拖动到位置 **2**，如下所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/783e3e6d-4dd9-4fcb-b450-fdf0eb0945e5/aimoffset29.png)
6.  添加 **Aim\_Left\_Up** (1)、**Aim\_Right\_Up** (2)、**Aim\_Left\_Down** (3)和 **Aim\_Right\_Down** (4)姿势以完成瞄准偏移。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a96747c1-6965-4eb7-adfb-97a1eec21a9a/aimoffset30.png)
7.  在 **资源详情（Asset Details）** 面板中，将 **附加设置（Additive Settings）** 下的 **预览基础姿势（Preview Base Pose）** 选项设置为 **Idle\_Rifle\_Hip**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcacdf44-27d4-4237-8c46-56200061635c/add01.png)
    
    你可以通过在网格中移动鼠标来预览混合的姿势，视口网格体会根据你的鼠标位置更新它的姿势。
    

瞄准偏移现已创建，下一步我们将把它挂在我们的 **动画蓝图** 中使用，这样游戏进程就可以驱动混合。

## 3 - 实现瞄准偏移

在这一步中，我们将瞄准偏移添加到动画蓝图，并将其挂到我们现有的动画图表上。

### 步骤

1.  在 **Content/AnimStarterPack** 文件夹中，打开 **UE4ASP\_HeroTPP\_AnimBlueprint** 并 **双击** **我的蓝图（MyBlueprint）** 面板中的 **动画图表（AnimGraph）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7851d81-907e-4367-8d96-b3659fcc7441/step3_01.png)
2.  从 **资源浏览器（Asset Browser）** 选项卡中，拖入瞄准偏移资源。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d41f1b23-8241-4f7c-82f2-fc53637c2e84/step3_02.png)
3.  按如下所示连接瞄准偏移，然后 **右键单击** **Yaw** 和 **Pitch** 引脚，并 **提升为变量（Promote to Variable）**，然后将它们命名为 **Aim Yaw** 和 **Aim Pitch**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f49038c3-db51-4e06-93ca-4ba4fa8efdd2/step3_03.png)
    
    每当玩家用鼠标瞄准并驱动瞄准偏移的姿势时，就会使用这两个变量。
    
4.  在 **我的蓝图（MyBlueprint）** 面板，跳到 **事件图表（EventGraph）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14f596a0-20ed-4a6c-91cf-81e9eb0e9415/step3_04.png)
5.  在 **事件图表（EventGraph）** 中，找到脚本移动（Movement）部分的 **Sequence** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de31889e-a5c0-434f-af22-a9bfeb2d2699/step3_05.png)
    
    单击 **Sequence** 节点上的 **添加引脚（Add pin）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1841fdb3-f4af-4cbe-8886-f9d16ec14c97/step3_05b.png)
6.  从 **我的蓝图（MyBlueprint）** 面板，按住 **Alt** 并拖入 **Aim Yaw** 和 **Aim Pitch**，以连接到 **Sequence** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20ce2efa-7a8a-4712-9e6f-e9d8833f13ce/step3_06.png)
7.  从 **Cast To Ue4ASP\_Character** 节点拖出一根引线，并添加 **Get Control Rotation** 和 **Get Actor Rotation** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d95e7286-d5b5-4f2e-9fa4-d5fd4c4b96c6/step3_07.png)
8.  从 **Get Control Rotation** 节点拖出一根引线，并添加 **Delta(Rotator)** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5168c0bb-1648-4f45-8da9-183120ac2717/step3_08.png)
9.  将 **Get Actor Rotation** 连接到 **Delta(Rotator) B Pin**，然后从 **Return Value** 拖出一根引线，添加一个 **RInterp To** 节点（并将连接从当前（Current）切换到目标（Target））。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0fe41a83-abc3-49ca-b080-de85f7209d3b/step3_09.png)
    
    可按住 **Ctrl** 并 **单击** **当前（Current）** 引脚，以将其连接拖动到 **目标（Target）** 引脚。
    
10.  从 **RInterp To** 节点的 **当前（Current）** 引脚拖出一根引线，并选择 **Make Rotator**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e070c3fa-c12c-438f-9c85-445b654a4249/step3_10.png)
11.  从 **我的蓝图（MyBlueprint）** 面板中，按住 **Ctrl** 并拖入 **Aim Pitch** 和 **Aim Yaw** 变量，然后将它们连接到 **Make Rotator** 节点的 **Pitch** 和 **Yaw**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12eacf77-c83e-48a3-8c91-4018773ac3d7/step3_11.png)
12.  在 **移动（Movement）** 脚本的开头，找到 **Event Blueprint Update Animation** 节点并将 **Delta Time X** 提升为名为 **Time** 的变量，然后按如下方式连接。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9323952-d67d-4d58-bcde-e2f25e234436/step3_12.png)
13.  返回 **RInterp To** 节点，连接新 **Time** 变量，并将 **Interp Speed** 设置为 **15**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5139ec73-ee8d-4a2e-b915-dee902d63c22/step3_13.png)
    
    我们将使用角色的旋转和玩家输入的旋转来创建一个新的旋转器，它将限制角色在某个方向上可以旋转的程度。
    
14.  从 **RInterp To** 节点拖出一根引线，添加一个 **Break Rotator** 以及 **Pitch** 和 **Yaw** 的 **夹角（Clamp Angle）**，并将最小/最大角度分别设置为 **\-90** 和 **90**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a54eb1c0-f138-4000-a747-4b5bd21a44e9/step3_14.png)
15.  将 **夹角（Clamp Angle）** 从 **Pitch** 连接到 **Aim Pitch**，并从 **Yaw** 连接到 **Aim Yaw**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/854ed6fc-17c5-455d-b20d-13dc13f8e2d2/step3_15.png)
    
    现在，计算角色旋转和玩家当前控制器旋转时要考虑到驱动瞄准偏移的Aim Yaw和Aim Pitch值，且这两个值被夹紧以防止角色在某个方向旋转过多。如不夹紧角度，角色的腿朝向前方的同时，角色的身体可能转一圈并朝向相反方向，这是我们需要避免出现的情况。
    

我们即将完成设置，下一步，我们将把所有的东西统合起来，测试角色的瞄准能力。

## 4 - 完成

在最后一节中，我们将更新角色蓝图，以更改控制器旋转的处理方式，并在测试前修复一些小问题。

### 步骤

1.  在 **Content/AnimStarterPack** 文件夹中，打开 **Ue4ASP\_Character** 蓝图。
    
2.  在 **组件（Components）** 窗口中单击 **Ue4ASP\_Character**，然后在 **详情（Details）** 中取消选中 **使用控制器旋转Yaw（Use Controller Rotation Yaw）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c21cbe40-3035-43d9-ba3f-b6cc5aba6dd0/step4_04.png)
    
    这将防止角色自动转向控制器的偏转位置。
    
3.  在 **组件（Components）** 窗口中单击 **胶囊体组件（CapsuleComponent）**，然后在 **详情（Details）** 面板中选中 **在游戏中隐藏（Hidden in Game）** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19804a82-bfe7-41e6-a024-a8273316c759/hidecapsule.png)
    
    这将在游戏进程中隐藏调试碰撞显示。
    
4.  单击 **我的蓝图（MyBlueprint）** 中的 **事件图表（EventGraph）**，然后找到 **蹲伏（Crouching）** 部分，将 **InputAction Crouch** 节点替换为 **C** 按键事件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/282bf906-4832-4fb9-b722-9d7e5c0f93ce/step4_05.png)
    
    这将删除窗口左上角编译按钮上的黄色预警信号，因为项目默认情况下没有蹲伏动作映射，我们将使用 **C** 按钮蹲伏（可以使用任何你想要的按键事件）。
    
5.  **编译（Compile）** 并 **保存（Save）**，然后关闭蓝图。
    
6.  从关卡中移除 **第三人称角色（ThirdPersonCharacter）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d7550dd-c7c1-42d1-b97b-a6fde92610b3/deletecharacter.png)
    
    这可确保我们使用分配到游戏模式的角色，而不是放置在关卡中的角色。
    
7.  单击 **运行（Play）** 按钮在编辑器中运行。
    

### 最终结果

在编辑器中运行时，角色现在将会在静止状态下瞄准，并对鼠标的移动做出反应，指向鼠标的方向。有一些限制，用于防止当鼠标在角色背后时角色转身面朝后方，以及当角色慢跑时，移动鼠标会使角色躯干转向鼠标所指向的方向。

我们可以更进一步，允许角色瞄准一个方向并在该方向上播放射击动画，并且（或）允许角色在朝某个方向移动时或蹲伏（通过在现有动画上[叠加动画](/documentation/zh-cn/unreal-engine/using-layered-animations-in-unreal-engine)来实现）时播放射击动画。或者以[骨架网格体套接字](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine)为例，看看在角色可以瞄准的情况下，如何将武器附加到角色的手中。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [blend space](https://dev.epicgames.com/community/search?query=blend%20space)
-   [aim offset](https://dev.epicgames.com/community/search?query=aim%20offset)
-   [blending](https://dev.epicgames.com/community/search?query=blending)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1 - 创建瞄准姿势](/documentation/zh-cn/unreal-engine/creating-an-aim-offset-in-unreal-engine#1-%E5%88%9B%E5%BB%BA%E7%9E%84%E5%87%86%E5%A7%BF%E5%8A%BF)
-   [步骤](/documentation/zh-cn/unreal-engine/creating-an-aim-offset-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [2 - 创建瞄准偏移](/documentation/zh-cn/unreal-engine/creating-an-aim-offset-in-unreal-engine#2-%E5%88%9B%E5%BB%BA%E7%9E%84%E5%87%86%E5%81%8F%E7%A7%BB)
-   [步骤](/documentation/zh-cn/unreal-engine/creating-an-aim-offset-in-unreal-engine#%E6%AD%A5%E9%AA%A4-2)
-   [3 - 实现瞄准偏移](/documentation/zh-cn/unreal-engine/creating-an-aim-offset-in-unreal-engine#3-%E5%AE%9E%E7%8E%B0%E7%9E%84%E5%87%86%E5%81%8F%E7%A7%BB)
-   [步骤](/documentation/zh-cn/unreal-engine/creating-an-aim-offset-in-unreal-engine#%E6%AD%A5%E9%AA%A4-3)
-   [4 - 完成](/documentation/zh-cn/unreal-engine/creating-an-aim-offset-in-unreal-engine#4-%E5%AE%8C%E6%88%90)
-   [步骤](/documentation/zh-cn/unreal-engine/creating-an-aim-offset-in-unreal-engine#%E6%AD%A5%E9%AA%A4-4)
-   [最终结果](/documentation/zh-cn/unreal-engine/creating-an-aim-offset-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
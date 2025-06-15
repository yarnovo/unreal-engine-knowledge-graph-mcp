# StateTree快速入门指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/statetree-quick-start-guide
> 
> 生成时间: 2025-06-14T19:43:57.557Z

---

目录

![StateTree快速入门指南](https://dev.epicgames.com/community/api/documentation/image/4b511522-44bb-4563-9628-22f997d01215?resizing_type=fill&width=1920&height=335)

## 概述

**StateTree** 是一种通用分层状态机，组合了行为树中的 **选择器（Selectors）** 与状态机中的 **状态（States）** 和 **过渡（Transitions）** 。用户可以创建非常高效、保持灵活且井然有序的逻辑。

你可以阅读[状态树概述](/documentation/zh-cn/unreal-engine/overview-of-state-tree-in-unreal-engine)文档，详细了解状态树。

## 目标

在本指南中，你将使用状态树创建玩家可以射击和销毁的移动目标。

## 目的

-   为目标Actor创建玩家可以射击和销毁的 **蓝图** 。
    
-   创建包含逻辑从而可移动和销毁目标Actor的状态树。
    
-   创建状态树任务并在状态树中使用。
    
-   创建状态树求值器并在状态树中使用。
    

## 1 - 必要设置

1.  创建新项目，然后选择 **游戏（Games）** 类别和 **第一人称（First Person）** 模板。输入项目的位置和名称。点击 **创建（Create）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/517c935e-8742-43f5-aa06-f64f9af73ee0/statetree-quickstart-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/517c935e-8742-43f5-aa06-f64f9af73ee0/statetree-quickstart-1.png)
    
    点击查看大图。
    
2.  点击 **设置（Settings）> 插件（Plugins）** 打开 **插件（Plugins）** 窗口。
    
    ![打开插件窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84122e8e-5720-4dde-a5a3-ce1086e05886/statetree-quickstart-2.png)
3.  搜索并 **启用** **GameplayStateTree** 和 **StateTree** 插件。重启虚幻引擎编辑器。
    
    ![打开插件窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a272c8a4-ade0-4d3f-8c6d-d109adfc9e61/statetree-quickstart-3.png)

### 阶段成果

在本分段中，你创建了新项目并启用了状态树插件。你现在可以创建将在目标Actor中使用的状态树。

## 2 - 创建状态树

在本分段中，你将创建一个将由目标Actor使用的状态树。该状态树旨在用作目标Actor的组件，因此你会将 **状态树组件模式（State Tree Component Schema）** 用于该示例。

1.  在 **内容浏览器（Content Browser）** 中，右键点击并选择 **人工智能（Artificial Intelligence）> StateTree** 。
    
    ![在内容浏览器中，右键点击并选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c983c18-714f-4010-9282-6261ea39ebd8/statetree-quickstart-4.png) StateTree"" loading="lazy" />
2.  选择 **StateTreeComponentSchema** 类并点击 **选择（Select）** 。
    
    ![选择StateTreeComponentSchema类并点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8fab8ec-5a17-47af-93c5-f3fabd0a0b9a/statetree-quickstart-5.png)
3.  将状态命名为 **Tree ST\_ShootingTarget** 。
    
    ![将状态命名为Tree ST ShootingTarget](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/145ff0e9-783d-4fc6-a774-7dae9d93400f/statetree-quickstart-6.png)

### 阶段成果

在本分段中，你创建了一个将由目标Actor使用的带有组件模式的状态树。

## 3 - 创建射击目标蓝图

在本分段中，你将为目标Actor创建蓝图，该蓝图将移动并受到来自玩家的伤害。

1.  在 **内容浏览器（Content Browser）** 中，右键点击并在 **创建基本资产（Create Basic Asset）** 分段中，选择 **蓝图类（Blueprint Class）** 。
    
    1.  在 **选择父类（Pick Parent Class）** 窗口中，点击 **Actor** 按钮创建新的Actor蓝图。
        
    2.  将蓝图命名为 **BP\_ShootingTarget** 。
        
    
    ![从](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/30833c21-0d6f-4d16-acac-25ec9c52521f/statetree-quickstart-7.png) ![点击Actor按钮创建新Actor蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26bbeb96-5081-4ee9-9461-b31478067dd1/statetree-quickstart-8.png) ![将蓝图命名为BP_ShootingTarget](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/520827ed-93b4-4c42-9db5-42a7af5b96fa/statetree-quickstart-9.png)
2.  打开 **BP\_ShootingTarget** 并转至 **组件（Components）** 窗口。点击 **+添加（Add）** 并选择 **静态网格体（Static Mesh）** 。
    
    1.  转到 **细节（Details）** 面板，然后向下滚动到 **静态网格体（Static Mesh）** 分段。
        
    2.  点击 **静态网格体（Static Mesh）** 下拉菜单并选择 **1M\_Cube** 。
        
    
    ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/baf34a02-8a32-4286-8ad6-4e3e84d3c36e/statetree-quickstart-10.png) ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50f8e6ad-7afe-46e5-9038-3ef780ff3821/statetree-quickstart-11.png)
3.  将 **静态网格体（Static Mesh）** 的 **缩放（Scale）** 设置为 **X = 0.2** 、 **Y = 2.0** 、 **Z = 2.0** 。
    
    ![将静态网格体的缩放设置为X = 0.2、Y = 2.0、Z = 2.0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6536bcbc-f4b4-456a-a942-6a7b494a9f04/statetree-quickstart-11a.png)
4.  在 **组件（Components）** 窗口中，点击 **+添加（Add）** ，并选择 **StateTree** 。
    
    1.  转到 **细节（Details）** 面板，然后向下滚动到 **AI** 分段。
        
    2.  点击 **状态树（State Tree）** 下拉菜单并选择 **ST\_ShootingTarget** 。
        
    
    ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1cdaed5-aab1-47fe-97cf-bccfc451a008/statetree-quickstart-12.png) ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25e7df35-be02-4737-ab4e-bd8bc5bcd8af/statetree-quickstart-13.png)
    
    如果状态树未显示在下拉菜单中，说明选错了模式。必须选择 **StateTreeComponentSchema** 才能在状态树组件中使用。
    
5.  右键点击 **静态网格体（Static Mesh）** 组件并选择 **添加事件（Add Event）> 添加OnComponentHit（Add OnComponentHit）** 。
    
    ![右键点击静态网格体组件并选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ecb84b5e-1d0c-4656-8d79-922fccab16de/statetree-quickstart-14.png)
6.  创建新的变量，然后将其命名为 **HitCount** 。
    
    1.  转到 **细节（Details）** 面板，将 **变量类型（Variable Type）** 设置为 **整型（Integer）** 。
    
    ![创建新的变量，然后将其命名为HitCount](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8faef5d-203e-4541-8c3c-a58736d4d769/statetree-quickstart-15.png) ![将变量类型设置为整型](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93d3dd2b-ee42-4f50-a178-cff7abf4ceae/statetree-quickstart-16.png)
7.  将 **HitCount** 变量拖动到 **事件图表（Event Graph）** ，然后选择 **Get HitCount** 。
    
    1.  从 **HitCount** 节点拖出，然后搜索并选择 **Increment Int** 。
        
    2.  将 **On Component Hit** 节点连接到 **Increment Int** 节点。
        
    
    ![将On Component Hit节点连接到Increment Int节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f66bbfd8-676b-4bb1-aa51-ad9196fabfb8/statetree-quickstart-17.png)

### 阶段成果

在本分段中，你创建了玩家将在Gameplay期间射击的射击Actor蓝图。你现在可以创建状态树的静止和死亡状态。

## 4 - 创建静止和死亡状态

1.  返回 **ST\_ShootingTarget** 并在 **模式（Schema）** 分段下点击 **上下文Actor类（Context Actor Class）** 下拉菜单。选择 **BP\_ShootingTarget** 。
    
    ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4fc59d8-0ef4-44a8-905a-36330c1737ee/statetree-quickstart-18.png)
2.  点击 **\+ 添加状态（Add State）** 创建新状态并将其命名为 **静止（Idle）** 。
    
    ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72415736-7f0a-4b8e-9cac-79d037817430/statetree-quickstart-19.png)
3.  转到 **细节（Details）** 面板，然后向下滚动到 **过渡（Transitions）** 分段。
    
    1.  展开 **转至状态（Go to State）** 分段并点击 **过渡至（Transition To）** 下拉菜单。选择 **根（Root）** 。这会将状态树设置为在该状态完成时过渡回根状态。
    
    ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/277c9c9d-cb4e-4738-8d98-3413717a910d/statetree-quickstart-20.png) ![静止状态现在显示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0283747-4916-4f17-b495-267d3251d65c/statetree-quickstart-21.png)
4.  创建另一个状态并将其命名为 **死亡（Dead）** 。
    
    ![创建另一个状态并将其命名为](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5175e78-e14a-4fd9-b14b-c4dae1b62634/statetree-quickstart-22.png)
5.  选择 **静止（Idle）** 状态并添加另一个 **过渡（Transition）** 。
    
    1.  点击 **触发器（Trigger）** 下拉菜单并选择 **更新时（On Tick）** 。
        
    2.  点击 **过渡至（Transition To）** 下拉菜单并选择 **死亡（Dead）** 。
        
    
    ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aabf4725-11ee-44db-9050-6fca2251c0ec/statetree-quickstart-23.png)
6.  点击 **加号图标** 添加新 **条件（Condition）** 。点击下拉菜单并选择 **整型比较（Integer Compare）** 。
    
    1.  展开结构并点击 **左绑定（Left Bind）** 下拉菜单，然后选择 **Actor > 击中计数（Hit Count）** 。这会将 **BP\_ShootingTarget** 中的 **击中计数（Hit Count）** 值绑定到StateTree条件。
        
    2.  输入 **5** 作为 **右（Right）** 整型的值。
        
    
    ![点击加号图标添加新条件。点击下拉菜单并选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36455d63-2e84-4627-98cf-5d8a583ac292/statetree-quickstart-24.png) ![展开结构并点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe1852ae-3540-4c97-b760-29df5847608d/statetree-quickstart-25.png) 击中计数"" loading="lazy" /> ![输入5作为右整型的值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bde865b7-3132-4879-a818-796905ad45b8/statetree-quickstart-26.png)

### 阶段成果

在本分段中，你将静止和死亡状态添加到状态树。你现在可以创建将处理死亡状态的状态树任务。

## 5 - 创建新状态树任务

在本分段中，你将创建新 **状态树任务（State Tree Task）** ，用于在执行 **死亡（Dead）** 状态时销毁Actor。

1.  在 **内容浏览器（Content Browser）** 中，右键点击并选择 **蓝图类（Blueprint Class）** 。
    
    1.  在 **选择父类（Pick Parent Class）** 窗口中，展开 **全部类（All Classes）** 下拉菜单，搜索并选择 **StateTreeTaskBlueprintBase** 。
        
    2.  点击 **选择（Select）** ，创建资产。
        
    3.  将蓝图类命名为 **STT\_Destroy** 。
        
    
    ![从](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9dadc9cc-7a7e-4b64-8508-f16f6b1c0b46/statetree-quickstart-7.png) ![展开](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf01b5ac-552a-4da7-8665-a66b29892dd4/statetree-quickstart-27.png) ![将蓝图类命名为STT Destroy](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c1e243d-e1eb-4796-84be-00b92b2c56c1/statetree-quickstart-28.png)
2.  在 **内容浏览器（Content Browser）** 中双击打开 **STT\_Destroy** 。转到 **函数（Functions）** 分段，然后点击 **覆盖（Override）** 下拉菜单。选择 **ExitState** 。
    
    ![转到](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52e599e1-afab-430c-a6cc-2b4ecba81fa5/statetree-quickstart-29.png)
3.  创建新的变量，然后将其命名为 **Actor** 。将其类型设置为 **Actor对象引用（Actor Object Reference）** 。
    
    1.  转到 **细节（Details）** 面板，将其 **类别（Category）** 设置为 **上下文（Context）** 。
        
    2.  将 **Actor** 变量拖动到 **事件图表（Event Graph）** ，然后选择 **Get Actor** 。
        
    3.  从 **Actor** 节点拖出，然后搜索并选择 **Destroy Actor** 。
        
    4.  将 **Event ExitState** 节点连接到 **Destroy Actor** 节点。
        
    
    ![创建新的变量，然后将其命名为Actor将其类型设置为Actor对象引用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8d0d9b3-5b99-4d64-a34c-66d8c5782294/statetree-quickstart-30.png) ![转到细节面板，将其类别设置为上下文](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b3e18b3-f2b8-4ec6-a207-cc93ea2a0931/statetree-quickstart-31.png) ![将Event ExitState 节点连接到Destroy Actor节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b0e4f88-a0f4-47fb-b130-afaa20caf4a6/statetree-quickstart-32.png)

### 阶段成果

在本分段中，你将创建新状态树任务，用于在执行死亡状态后运行。该任务会销毁Actor。

## 6 - 完成死亡状态

1.  返回 **ST\_ShootingTarget** 并选择 **死亡（Dead）** 状态。添加新 **任务（Task）** 并从下拉菜单选择 **调试文本任务（Debug Text Task）** 。
    
    1.  在 **文本（Text）** 字段中输入 **'Actor已销毁（Actor Destroyed）'** 。
        
    2.  输入 **文本颜色（Text Color）** 和 **字体比例（Font Scale）** 。
        
    
    ![添加新任务并从下拉菜单选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87c8cdc8-0f07-4aa9-b085-8de95df45c70/statetree-quickstart-33.png)
2.  添加另一个 **任务（Task）** 并从下拉菜单选择 **延迟任务（Delay Task）** 。
    
    1.  为 **时长（Duration）** 输入 **2.0** 。
    
    ![添加另一个任务并从下拉菜单选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27944614-0430-462e-a3b4-fc5b4d7f5871/statetree-quickstart-34.png)
3.  添加第三个 **任务（Task）** 并从下拉菜单选择 **STT\_Destroy** 。这将销毁Actor。
    
    ![添加第三个任务并从下拉菜单选择STT_Destroy](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/787f7c73-9e59-43b7-8001-851185a657b7/statetree-quickstart-35.png)
4.  创建新的 **过渡（Transition）** 并将 **触发器（Trigger）** 设置为 **在状态完成时（On State Completed）** 。
    
    1.  将 **过渡至（Transition To）** 下拉菜单设置为 **树已成功（Tree Succeeded）** 。
    
    ![创建新的过渡并将触发器设置为](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f595bedd-1156-4f9c-8ccf-8864167febd6/statetree-quickstart-36.png)
5.  将 **BP\_ShootingTarget** 拖入你的关卡中并按 **播放（Play）** 。射击蓝图并确认状态树可正常运行。
    
    ![将BP_ShootingTarget拖入你的关卡中并按](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5b57856-c237-44dc-9709-420073d97010/statetree-quickstart-37.png) ![玩家射击并销毁射击目标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a62846a-6ed9-4368-9e1a-5ff02856e011/statetree-quickstart-38.gif)

### 阶段成果

在本分段中，你完成了死亡状态并测试了射击Actor蓝图是否可以受到伤害并被销毁。

## 7 - 添加样条线路径

在本分段中，你将创建带有样条线组件的Actor。该样条线将由射击目标蓝图用于在关卡中移动。

1.  在 **内容浏览器（Content Browser）** 中，右键点击并在 **创建基本资产（Create Basic Asset）** 分段中，选择 **蓝图类（Blueprint Class）** 。
    
    1.  在 **选择父类（Pick Parent Class）** 窗口中，点击 **Actor** 按钮创建新的Actor蓝图。
        
    2.  将蓝图命名为 **BP\_SplineActor** 。
        
    
    ![从](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33dde82f-f3c3-48dd-9f41-08f32d888360/statetree-quickstart-7.png) ![点击Actor按钮创建新Actor蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33c57ae3-eee2-441e-bd69-eb2391f66959/statetree-quickstart-8.png) ![将蓝图命名为BP_ShootingTarget](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4ede8a7-1f01-44f1-a314-1381664e140d/statetree-quickstart-38.png)
2.  打开 **BP\_SplineActor** 并转至 **组件（Components）** 窗口。点击 **+添加（Add）** 并选择 **样条线（Spline）** 。
    
    1.**编译（Compile）** 并 **保存（Save）** 蓝图。
    
    ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f0b3c42-4ed3-4660-a5c0-dc5dae712a0c/statetree-quickstart-39.png)

### 阶段成果

在本分段中，你创建了有样条线组件的泛型蓝图Actor。该样条线将用于在关卡中为射击Actor创建移动路径。

## 8 - 添加状态树求值器

现在你将创建 **状态树求值器（State Tree Evaluator）** ，用于搜索关卡中的所有样条线Actor并返回最接近状态树的Actor。

1.  在 **内容浏览器（Content Browser）** 中，右键点击并在 **创建基本资产（Create Basic Asset）** 分段中，选择 **蓝图类（Blueprint Class）** 。
    
    1.  在 **选择父类（Pick Parent Class）** 窗口中，展开 **全部类（All Classes）** 下拉菜单，搜索并选择 **StateTreeEvaluatorBlueprintBase** 。
        
    2.  点击 **选择（Select）** ，创建资产。
        
    3.  将蓝图类命名为 **STE\_GetSpline** 。
        
    
    ![从](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a9656cb-e08b-45e7-bbe1-8acfe7829484/statetree-quickstart-7.png) ![在](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7851f9cf-4a59-4bf6-8a69-1814620eeecf/statetree-quickstart-40.png) ![将蓝图类命名为STE_GetSpline](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d5b3c40-9c51-427d-ad25-e51fdfe292bd/statetree-quickstart-41.png)
2.  打开 **STE\_GetSpline** 并转至 **我的蓝图（My Blueprint）** 面板的 **函数（Functions）** 分段。
    
    1.  点击 **覆盖（Override）** 下拉菜单并选择 **TreeStart** 。
    
    ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5977f8ef-7f24-4e07-8860-a86f08e50f0b/statetree-quickstart-42.png)
3.  从 **Event TreeStart** 节点拖出，然后搜索并选择 **Get All Actors of Class** 。
    
    1.  点击 **Actor类（Actor Class）** 下拉菜单并选择 **BP\_SplineActor** 。
    
    ![从Event TreeStart节点拖出，然后搜索并选择Get All Actors of Class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40042f59-4e9f-4831-a693-1464cf16188a/statetree-quickstart-43.png)
4.  创建新的变量，然后将其命名为 **Actor** 。
    
    1.  转到 **细节（Details）** 面板，将 **变量类型（Variable Type）** 设置为 **Actor对象引用（Actor Object Reference）** 。
        
    2.  点击 **类别（Category）** 下拉菜单并输入 '**Context**' 。
        
    
    ![创建新的变量，然后将其命名为Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9208591b-5c70-45b7-b544-cc41f0f468b6/statetree-quickstart-44.png) ![将变量类型设置为Actor对象引用，点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81860a21-6cce-42fd-aad9-9acbd720429c/statetree-quickstart-45.png)
5.  从 **Get All Actors from Class** 节点的 **输出Actor（Out Actors）** 引脚拖出，搜索并选择 **Find Nearest Actor** 。
    
    1.  将 **Actor** 变量拖动到 **事件图表（Event Graph）** ，然后选择 **Get Actor** 。
        
    2.  从 **Actor** 节点拖出，然后搜索并选择 **Get Actor Location** 。
        
    3.  将 **Get Actor Location** 节点的 **返回值（Return Value）** 连接到 **Find Nearest Actor** 节点的 **源（Origin）** 引脚。
        
    
    ![从Get All Actors from Class节点的输出Actor引脚拖出，搜索并选择Find Nearest Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4544646-637c-4305-ba80-296ef016a5a4/statetree-quickstart-46.png)
6.  从 **Find Nearest Actor** 节点的 **返回值（Return Value）** 引脚拖出，搜索并选择 **Cast to BP\_SplineActor** 。
    
    1.  右键点击 **Cast to BP\_SplineActor** 节点的 **作为BP样条线Actor（As BP Spline Actor）** 引脚，然后选择 **提升到变量（Promote to Variable）** 。
        
    2.  将此变量命名为 **SplineActor** 并输入 '**Output**' 作为其 **类别（Category）** 。
        
    3.  **编译（Compile）** 并 **保存（Save）** 蓝图。
        
    
    ![从Find Nearest Actor节点的返回值引脚拖出，搜索并选择Cast to BP_SplineActor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e492391-388b-4acf-b793-825673f62260/statetree-quickstart-47.png) ![将此变量命名为SplineActor并输入'Output'作为其类别](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f167fdcd-5045-429d-99d4-380a35a818f3/statetree-quickstart-48.png)
7.  返回 **ST\_ShootingTarget** ，在 **StateTree** 窗口下，点击 **求值器（Evaluators）** 旁边的 **加号** 。
    
    1.  点击下拉菜单并选择 **STE\_GetSpline** 。
    
    ![点击下拉菜单并选择STE_GetSpline](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c13a7ee4-9e81-42d1-81a6-1819928dcd9f/statetree-quickstart-49.png)

### 阶段成果

在本分段中，你创建了一个状态树求值器，它将在状态树开始执行时执行。该求值器会检查关卡中的所有样条线Actor并返回最接近射击Actor的Actor。

## 9 - 添加状态树任务以沿样条线移动

在本分段中，你将创建新 **状态树任务（State Tree Task）** ，用于沿 **BP\_SplineActor** 的样条线移动Actor。

1.  在 **内容浏览器（Content Browser）** 中，右键点击并选择 **蓝图类（Blueprint Class）** 。
    
    1.  在 **选择父类（Pick Parent Class）** 窗口中，展开 **全部类（All Classes）** 下拉菜单，搜索并选择 **StateTreeTaskBlueprintBase** 。
        
    2.  点击 **选择（Select）** ，创建资产。
        
    3.  将蓝图类命名为 **STT\_MoveAlongSpline** 。
        
    
    ![从](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2cc869bb-e4eb-4a78-8370-f27219c97941/statetree-quickstart-7.png) ![在](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d53785db-ac93-4c8c-a7b5-7e7a5f231aa2/statetree-quickstart-27.png) ![将蓝图类命名为STT_MoveAlongSpline](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d00d951-b08b-4aba-a425-abdf39e5496c/statetree-quickstart-50.png)
2.  打开 **STT\_MoveAlongSpline** 并转至 **我的蓝图（My Blueprint）** 面板的 **函数（Functions）** 分段。点击 **覆盖（Override）** 下拉菜单并选择 **Tick** 。
    
    ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6698c08e-cf0f-4e08-9dc6-c8d585497c9f/statetree-quickstart-51.png)
3.  创建新的变量，然后将其命名为 **Actor** 。
    
    1.  转到 **细节（Details）** 面板，将 **变量类型（Variable Type）** 设置为 **Actor对象引用（Actor Object Reference）** 。
        
    2.  点击"类别（Category）"下拉菜单并输入 '**Context**' 。
        
    
    ![创建新的变量，然后将其命名为Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01d9ab8b-e457-439d-8bf8-677c5e9b73c1/statetree-quickstart-44.png) ![将变量类型设置为Actor对象引用，点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f999f35-ed6d-469f-acdc-cd5bf99269df/statetree-quickstart-45.png)
4.  创建新的变量，然后将其命名为 **SplineActor** 。
    
    1.  转到 **细节（Details）** 面板，将 **变量类型（Variable Type）** 设置为 **BP\_SplineActor** 。
        
    2.  输入 '**Input**' 作为 **类别（Category）** 。
        
    
    ![创建新的变量，然后将其命名为SplineActor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54c80a33-93d4-4036-84e1-314fa86d7398/statetree-quickstart-52.png) ![将变量类型设置为B SplineActor并输入'Input'作为类别](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0afb51d8-954e-45cf-9b0d-4be8eb455b58/statetree-quickstart-53.png)
5.  将 **Actor** 变量拖动到 **事件图表（Event Graph）** ，然后选择 **Get Actor** 。
    
    1.  从 **Actor** 节点拖出，然后搜索并选择 **Set Actor Location** 。
        
    2.  将 **Tick** 节点连接到 **Set Actor Location** 节点。
        
    
    ![从Actor节点拖出，然后搜索并选择Set Actors Location](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e89798a2-cd51-4647-bb7f-f7442996089f/statetree-quickstart-54.png)
6.  将 **SplineActor** 拖动到 **事件图表（Event Graph）** ，然后选择 **Get Spline Actor** 。
    
    1.  从 **SplineActor** 节点拖出，然后搜索并选择 **Spline** 。
        
    2.  从 **Spline** 节点拖出，然后搜索并选择 **Get Location at Distance Along Spline** 。
        
    3.  将 **Get Location** at **Distance Along Spline** 节点的 **返回值（Return Value）** 连接到 **Set Actor Location** 节点的 **新位置（New Location）** 引脚。
        
    4.  右键点击 **Get Location at Distance Along Spline** 节点的 **距离（Distance）** 引脚，然后选择 **提升到变量（Promote to Variable）** 。
        
    
    ![将Get Location at Distance Along Spline节点的返回值连接到Set Actor Location节点的新位置引脚](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f190f7b-87ce-4a05-879d-9e864548b955/statetree-quickstart-55.png)
7.  从 **Set Actor Location** 节点拖出，然后搜索并选择 **Branch** 。
    
    1.  将 **Distance** 变量拖动到 **事件图表（Event Graph）** ，然后选择 **Get Distance** 。
        
    2.  从 **Distance** 节点拖出，然后搜索并选择 **Less** 。
        
    3.  将 **Less** 节点连接到 **Branch** 节点的 **条件（Condition）** 引脚。
        
    
    ![将Less节点连接到Branch节点的条件引脚](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/843899a5-19ac-4981-8f7e-0742a94b8b15/statetree-quickstart-56.png)
8.  将 **SplineActor** 拖动到 **事件图表（Event Graph）** ，然后选择 **Get Spline Actor** 。
    
    1.  从 **SplineActor** 节点拖出，然后搜索并选择 **Spline** 。
        
    2.  从 **Spline** 节点拖出，然后搜索并选择 **Get Spline Length** 。
        
    3.  将 **Get Spline Length** 节点的 **返回值（Return Value）** 连接到 **Less** 节点的下方引脚。
        
    
    ![将Get Spline Length节点的返回值连接到Less节点的下方引脚](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cbd46f32-9935-4db3-9d2f-d84bd04b6d1d/statetree-quickstart-57.png)
9.  将 **Distance** 变量拖动到 **事件图表（Event Graph）** ，然后选择 **Get Distance** 。
    
    1.  从 **Distance** 节点拖出，然后搜索并选择 **Add** 。
        
    2.  创建类型为 **浮点** 的新变量，然后将其命名为 **MovementSpeed** 。
        
    3.  将 **MovementSpeed** 连接到 **Add** 节点的下方引脚。
        
    4.  将 **Distance** 变量拖动到 **事件图表（Event Graph）** ，然后选择 **Set Distance** 。
        
    5.  将 **Add** 节点连接到 **Set Distance** 节点。
        
    6.  将 **Branch** 节点的 **True** 引脚连接到 **Set Distance** 节点，如下所示。
        
    
    ![将Branch节点的True引脚连接到Set Distance节点，如下所示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1590708d-6293-4264-8dee-ad48db074c38/statetree-quickstart-58.png)
10.  选择 **MovementSpeed** 变量，将其 **默认（Default）** 值设置为 **5.0** 。
    
    ![选择MovementSpeed变量，将其默认值设置为5.0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79320794-89bb-48ca-9f22-905320557065/statetree-quickstart-58a.png)
11.  将 **Distance** 变量拖动到 **事件图表（Event Graph）** ，然后选择 **Set Distance** 。
    
    1.  将 **Branch** 节点的 **False** 引脚连接到 **Set Distance** 节点。
        
    2.  将两个 **Set Distance** 节点都连接到带有 **返回值（Return Value）** **正在运行（Running）** 的 **返回节点（Return Node）** 。
        
    
    ![将Branch节点的False引脚连接到Set Distance节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d6fdcf3-ab0e-4ee2-b2c4-cd3316d66744/statetree-quickstart-59.png) ![将两个Set Distance节点都连接到带有返回值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03bdc99c-1ab0-4052-a359-e58a2e0d9d2d/statetree-quickstart-60.png)

### 阶段成果

在本分段中，你创建了一个状态树任务，它沿使用样条线Actor蓝图创建的样条线移动射击Actor蓝图。

## 10 - 完成状态树

1.  返回 **ST\_ShootingTarget** 并点击 **+添加状态（Add State）** 。将新状态命名为 **MoveAlongSpline** 。
    
    1.  点击 **MoveAlongSpline** 状态并将其拖入 **静止（Idle）** 状态中作为其子状态。
    
    ![返回ST_ShootingTarget并点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d9e7479-4769-437f-a19c-94461d970982/statetree-quickstart-61.png) ![点击MoveAlongSpline状态并将其拖入静止状态中作为其子状态](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d89db7e8-cb63-4484-b3de-e32cb6d38cdd/statetree-quickstart-62.png)
2.  转至 **细节（Details）** 面板并点击 **+** 按钮添加新 **任务（Task）** 。
    
    1.  点击 **下拉菜单** 并选择 **STT\_MoveAlongSpline** 。
        
    2.  点击 **样条线Actor（Spline Actor）** 旁边的 **绑定（Bind）** 下拉菜单并选择 **STE获取样条线（STE Get Spline）> 样条线Actor（Spline Actor）** 。
        
    
    ![点击下拉菜单并选择STT_MoveAlongSpline](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/527643a9-e135-46f9-a395-ef276dc0ad89/statetree-quickstart-63.png) ![点击样条线Actor旁边的绑定下拉菜单并选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c57762b-0932-457f-a369-90b854a80f69/statetree-quickstart-64.png) 样条线Actor"" loading="lazy" /> ![样条线Actor现在绑定到STE获取样条线中的样条线Actor变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45b3ca0d-4459-4a3c-ada0-d8c12badc6de/statetree-quickstart-65.png)
3.  将 **BP\_SplineActor** 拖入关卡中。
    
    ![将B SplineActor拖入关卡中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5afcab9-bac1-465d-ac96-69045134af6c/statetree-quickstart-66.png)
4.  选择 **BP\_SplineActor** 的 **样条线（Spline）** 组件。**按住Alt并拖动** 以创建新的样条线点并创建闭合形状。
    
    1.  选择 **样条线Actor（Spline Actor）** 蓝图的 **样条线（Spline）** 组件并向下滚动到 **样条线（Spline）** 分段。**启用** **闭环（Closed Loop）** 复选框，使样条线成为闭合形状。
    
    ![选择BP_SplineActor的样条线组件。按住Alt并拖动以创建新的样条线点并创建闭合形状](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/756e6fc7-84ef-4c84-88d2-068c0647a1ba/statetree-quickstart-67.gif) ![启用闭环复选框，使样条线成为闭合形状](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba0acce0-8a18-4c34-8d5f-5d4be7d4e058/statetree-quickstart-68.png)
5.  按 **播放（Play）** 并向目标射击。
    
    ![按](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44fe11ed-2019-4b19-8e6b-26b9af161859/statetree-quickstart-69.gif)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [ai](https://dev.epicgames.com/community/search?query=ai)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#%E6%A6%82%E8%BF%B0)
-   [目标](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#%E7%9B%AE%E6%A0%87)
-   [目的](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#%E7%9B%AE%E7%9A%84)
-   [1 - 必要设置](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#1-%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [阶段成果](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C)
-   [2 - 创建状态树](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#2-%E5%88%9B%E5%BB%BA%E7%8A%B6%E6%80%81%E6%A0%91)
-   [阶段成果](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-2)
-   [3 - 创建射击目标蓝图](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#3-%E5%88%9B%E5%BB%BA%E5%B0%84%E5%87%BB%E7%9B%AE%E6%A0%87%E8%93%9D%E5%9B%BE)
-   [阶段成果](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-3)
-   [4 - 创建静止和死亡状态](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#4-%E5%88%9B%E5%BB%BA%E9%9D%99%E6%AD%A2%E5%92%8C%E6%AD%BB%E4%BA%A1%E7%8A%B6%E6%80%81)
-   [阶段成果](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-4)
-   [5 - 创建新状态树任务](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#5-%E5%88%9B%E5%BB%BA%E6%96%B0%E7%8A%B6%E6%80%81%E6%A0%91%E4%BB%BB%E5%8A%A1)
-   [阶段成果](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-5)
-   [6 - 完成死亡状态](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#6-%E5%AE%8C%E6%88%90%E6%AD%BB%E4%BA%A1%E7%8A%B6%E6%80%81)
-   [阶段成果](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-6)
-   [7 - 添加样条线路径](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#7-%E6%B7%BB%E5%8A%A0%E6%A0%B7%E6%9D%A1%E7%BA%BF%E8%B7%AF%E5%BE%84)
-   [阶段成果](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-7)
-   [8 - 添加状态树求值器](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#8-%E6%B7%BB%E5%8A%A0%E7%8A%B6%E6%80%81%E6%A0%91%E6%B1%82%E5%80%BC%E5%99%A8)
-   [阶段成果](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-8)
-   [9 - 添加状态树任务以沿样条线移动](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#9-%E6%B7%BB%E5%8A%A0%E7%8A%B6%E6%80%81%E6%A0%91%E4%BB%BB%E5%8A%A1%E4%BB%A5%E6%B2%BF%E6%A0%B7%E6%9D%A1%E7%BA%BF%E7%A7%BB%E5%8A%A8)
-   [阶段成果](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-9)
-   [10 - 完成状态树](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide#10-%E5%AE%8C%E6%88%90%E7%8A%B6%E6%80%81%E6%A0%91)
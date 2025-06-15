# 外部StateTree快速入门指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/external-statetree-quickstart-guide
> 
> 生成时间: 2025-06-14T19:44:19.463Z

---

目录

![外部StateTree快速入门指南](https://dev.epicgames.com/community/api/documentation/image/ed1f5f3e-2593-430c-bc28-562d5f99a87a?resizing_type=fill&width=1920&height=335)

## 介绍

虚幻引擎5.4引入了在一个StateTree中链接另一个StateTree资产的功能。这样，在项目中编译和复用StateTree时，就可以采用更加模块化的方法。

现在你可以创建带有特定功能的状态树并根据需要复用。

本指南将逐步介绍如何创建简单的状态树，并将其链接到[StateTree快速入门指南](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide)中创建的状态树。

## 目标

在本指南中，你将创建一个状态树，它使移动目标在被击中时旋转。你要将此状态树作为外部资产添加到另一个处理目标移动的状态树。

## 目的

-   创建新的Hit Reaction StateTree和使移动目标在被击中时旋转的StateTree任务
-   将Hit Reaction StateTree作为外部资产添加到ShootingTarget StateStree，并对其进行配置
-   修改BP\_ShootingTarget和STT\_MoveAlongSpline以适应此新功能

## 1 - 先决条件

本指南将使用[StateTree快速入门指南](/documentation/zh-cn/unreal-engine/statetree-quick-start-guide)中创建的StateTree来演示如何使用外部StateTree。请先完成该快速入门指南的学习，以便按本文档中的示例操作。

学习完快速入门指南后，按 **运行（Play）** 以验证行为。

![移动目标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bad84d0-5b5a-476a-8953-f27792db2a33/state-tree-pre-req.gif)

## 2 - 创建StateTree任务以使目标旋转

在本章节中，你将创建一个使移动目标旋转的StateTree任务。

1.  右键点击 **内容浏览器（Content Browser）** ，在 **创建基本资产（Create Basic Asset）** 分段中点击 **蓝图类（Blueprint Class）** 。
    
    -   在 **选取父类（Pick Parent Class）** 窗口中，展开 **所有类（All Classes）** 并搜索 **StateTree Task Blueprint Base**。选择它并点击 **选择（Select）**。
    -   将资产命名为 **STT\_RotateTarget** 。
    
    ![创建新蓝图类](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/889fe9d3-f656-43c6-aebe-5ced6a121c8a/state-tree-external-3.png) ![选择StateTree任务蓝图基类](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f605be8-afc7-4bec-a8b6-60b9c7ba02f3/state-tree-external-4.png)
2.  双击打开 **STT\_RotateTarget** 。创建新的变量，然后将其命名为 **ContextActor** 。
    
    ![创建新的变量，然后将其命名为ContextActor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6c81d7b-dc96-4a87-ae2f-921355b9f42f/state-tree-external-5.png)
3.  转到 **细节（Details）** 面板，点击 **变量类型（Variable Type）** 下拉菜单，并选择 **Actor对象引用（Actor Object Reference）**。
    
    -   点击 **类别（Category）** 文本框并输入 **Context** 。这会自动将变量绑定到StateTree中的Context Actor。
    -   **编译** 并 **保存** 蓝图。
    
    ![将变量类型设置为Actor对象引用，将类别设置为Context](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29fee949-cd82-43b2-892f-817c4affcc37/state-tree-external-6.png)
4.  转到 **函数（Functions）** 分段，然后点击 **重载（Override）** 下拉菜单。点击 **EnterState** 以在 **事件图表（Event Graph）** 中创建 **EventEnterState** 节点。重复此过程并点击 **ExitState** 。
    
    ![重载Enter State和Exit State事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd1c9701-9bc6-4aa4-ac6b-22df7a2ffa8f/state-tree-external-7.png) ![在事件图表中创建两个节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83231899-83c4-4513-b7ce-482aa402b3b8/state-tree-external-8.png)
5.  将 **Context Actor** 拖动到事件图表中，然后选择 **Get ContextActor** 。
    
    -   从 **ContextActor** 拖出引线，然后搜索并选择 **Add Actor Component By Class** 。
    -   点击 **类（Class）** 下拉菜单，然后搜索并选择 **Rotating Movement Component** 。
    
    ![将旋转移动组件添加到Context Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1850bb2e-f78f-4912-95cb-53e9bd180881/state-tree-external-9.png)
6.  右键点击 **Add Rotating Movement Component** 节点的 **返回值（Return Value）** 引脚，然后点击 **提升到变量（Promote to Variable）** 。
    
    -   将变量命名为 **RotatingMovementComp** 。
    -   从 **RotatingMovementComp** 引脚拖出引线，然后搜索并选择 **Set Rotation Rate** ，并且输入 **720** 作为 **Z** 值。
    
    ![为旋转组件创建变量并将其命名为Rotating Movement Comp。将旋转速率设置为具有Z值720](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1ab6655-14ae-4f20-b758-b1baf73a65c1/state-tree-external-10.png)
7.  将 **RotatingMovementComp** 拖入 **事件图表（Event Graph）** ，并选择 **Get RotatingMovementComp** 。
    
    -   从 **RotatingMovementComp** 拖出引线，然后搜索并选择 **Is Valid** 。 *将 **EventEnterState** 节点连接到 **Is Valid** 节点。* 将 **Is Valid** 节点的 **无效（Is Not Valid）** 引脚连接到 **Add Rotating Movement Component** 节点。
    
    ![检查旋转移动组件是否有效。如果无效，连接到之前的节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f30589ed-05ed-4335-8ea4-2b08b96ff881/state-tree-external-11.png)
8.  将 **RotatingMovementComp** 拖入 **事件图表（Event Graph）** ，并选择 **Get RotatingMovementComp** 。
    
    -   从 **RotatingMovementComp** 拖出引线，然后搜索并选择 **Set Component Tick Enabled** 。
    -   勾选 **启用（Enabled）** 引脚，将其设置为 **True** 。
    
    ![在旋转移动组件上启用更新](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41df5ff8-81c7-4394-bdd2-7d5901c5197b/state-tree-external-12.png)
9.  将 **RotatingMovementComp** 拖入 **事件图表（Event Graph）** ，并选择 **Get RotatingMovementComp** 。
    
    -   从 **RotatingMovementComp** 拖出引线，然后搜索并选择 **Set Component Tick Enabled** 。
    -   确保将 **启用（Enabled）** 引脚设置为 **False** （未勾选）。 \*将 **EventExitState** 节点连接到 **SetComponentTickEnabled** 节点。
    
    ![在旋转移动组件上禁用更新](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ec968d9-3fdf-487c-8fc7-b36970e4a2ac/state-tree-external-13.png)
10.  验证你的蓝图图表是否类似于以下示例。
    
    ![验证你的蓝图代码是否类似于此内容](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81aad343-4139-4e57-8162-06b59ecdb0ad/state-tree-external-14.png)

### 阶段成果

在本小节中，你创建了一个StateTree任务，它将 **旋转Actor组件（Rotating Actor component）** 添加到目标Actor并旋转它。

## 3 - 创建StateTree以使目标旋转

在本小节中，你将创建一个StateTree，它使移动目标在被击中时旋转。此StateTree将被链接到你根据StateTree快速入门指南创建的 **ST\_ShootingTarget** StateTree。

1.  右键点击内容浏览器，然后点击"人工智能（Artificial Intelligence）> StateTree"。点击StateTree组件，将资产命名为ST\_Reaction。
    
    ![创建新状态树](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c605de4-8b28-4a5d-8a47-f9f08259acaa/state-tree-external-1.png) ![点击状态树组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4558e82-4359-46e0-8f6d-69ac8a7bb651/state-tree-external-2.png)
2.  双击打开 **ST\_Reaction** 。展开 **模式（Schema）** 分段，点击 **Context Actor类（Context Actor Class）** 下拉菜单。搜索并选择 **BP\_ShootingTarget** 。
    
    ![将Context Actor类设置为BP_ShootingTarget](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6fda22bb-4793-4e64-8160-360b4e182263/state-tree-external-15.png)
3.  点击 **+添加状态（Add State）** 创建新状态。将状态命名为 **Reaction** 。
    
    ![添加新状态并将其命名为Reaction](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38fb54dc-c45e-4250-9978-dc13a29ab8c4/state-tree-external-16.png)
4.  添加 **延迟任务（Delay Task）** 并输入 **0.5** 作为其 **时长（Duration）** 。然后添加新任务并从下拉菜单选择 **STT旋转目标（STT Rotate Target）** 。
    
    ![添加延迟和STT旋转目标任务](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f615e1fc-1f0c-4c62-8a41-88b9655ae7bc/state-tree-external-17.png)
5.  创建 **过渡（Transition）** ，将 **触发器（Trigger）** 设置为 **状态完成时（On State Completed）** ，并将 **过渡到（Transition To）** 设置为 **树成功（Tree Succeeded）** 。
    
    ![将过渡设置为树成功](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/455033f7-a40e-4c17-94b2-2567e5dae461/state-tree-external-18.png)
6.  **编译** 并 **保存** StateTree。
    

### 阶段成果

在此小节中，你创建了运行 **STT\_RotateTarget** 任务的 **ST\_Reaction** StateTree。此任务将在执行StateTree时旋转目标。

## 4 - 添加外部StateTree

在此小节中，你会将 **ST\_Reaction** 作为外部（链接的）StateTree添加到 **ST\_ShootingTarget** 。

1.  打开 **ST\_ShootingTarget** 并点击 **+添加状态（Add State）** 创建新状态。将状态命名为 **Hit Reaction** 。
    
    ![添加新状态并将其命名为Hit Reaction](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2996115-6cfd-4328-8c88-b259d9055c62/state-tree-external-19.png)
2.  选择 **击中反应（Hit Reaction）** 状态，然后转到 **细节（Details）** 面板。点击 **类型（Type）** 下拉菜单，然后选择 **链接的资产（Linked Asset）** 。点击 **链接的资产（Linked Asset）** 下拉菜单，然后选择 **ST\_Reaction** 。
    
    ![将ST_Reaction添加为链接的资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5305ff56-c79e-4435-9a03-a99a907c8a04/state-tree-external-20.png)
3.  添加 **进入条件（Enter Condition）** ，点击 **If** 下拉菜单并选择 **整型比较（Integer Compare）** 。
    
    -   点击 **运算符（Operator）** 下拉菜单，然后选择 **小于（Less）** 。
    -   将 **右（Right）** 值设置为 **5** 。
    -   点击 **左（Left）** 下拉菜单，然后选择 **Actor > 击中数量（Hit Count）** 。
    
    ![添加一个进入条件来比较击中数量是否小于5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20d62b4e-6b4c-4897-aacf-39498a20a2fc/state-tree-external-21.png)
4.  添加新 **过渡（Transition）** 并将 **触发器（Trigger）** 设置为 **状态完成时（On State Completed）** 。将 **过渡到（Transition To）** 设置为 **闲置（Idle）** 。
    
    ![添加在状态完成并过渡到闲置状态时触发的过渡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6282c0fc-3959-448c-a8f9-804de35ac7bd/state-tree-external-22.png)
5.  选择 **MoveAlongSpline** 状态并创建新的 **过渡（Transition）** 。
    
    -   点击 **触发器（Trigger）** 下拉菜单，然后选择 **发生事件时（On Event）** 。
    -   点击 **事件标签（Event Tag）** 下拉菜单，然后选择 **管理Gameplay标签（Manage Gameplay Tags）** 。
    
    ![添加在发生事件时触发的新过渡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/877e596b-b598-4bb5-8480-fe39786930a3/state-tree-external-23.png)
6.  点击 **+** 按钮以添加称为 **StateTree** 的新条目。在它下面添加另一个条目，将其命名为 **HitReaction**，如下所示。
    
    ![添加Gameplay标签状态树 - HitReaction](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc99bee0-4971-48a6-b286-c19c90a39344/state-tree-external-24.png)
7.  点击 **事件标签（Event Tag）** 下拉菜单，然后选择 **StateTree > 击中反应（Hit Reaction）**。将 **过渡到（Transition To）** 设置为 **击中反应（Hit Reaction）**。
    
    ![将事件标签设置为StateTree.HitReaction并过渡到击中反应状态](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dee44a51-3df0-4978-822a-9de48fcd0ffa/state-tree-external-25.png)

### 阶段成果

在此小节中，你通过将 **ST\_Reaction** 添加为 **Hit Reaction** 状态中的外部StateTree，修改了 **ST\_ShootingTarget**。你还将 **MoveAlongSpline** 状态修改为在调用Gameplay事件时过渡到 *\*击中反应（Hit Reaction）*。

## 5 - 修改BP\_ShootingTarget

在此小节中，你将修改 **ShootingTarget** 蓝图，使其将击中反应事件发送到StateTree，并导致目标旋转。

1.  在 **内容浏览器（Content Browser）** 中，双击打开 **BP\_ShootingTarget**。创建新的浮点变量，然后将其命名为 *\*DistanceTraveled*。
    
    ![创建新的浮点变量，然后将其命名为DistanceTraveled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15ee0a2c-d503-4fcb-9276-d56ca8061993/state-tree-external-30.png)
2.  将 **StateTree** 组件拖入 **事件图表（Event Graph）** 中。
    
    -   从 **StateTree** 引用拖出引线，然后搜索并选择 **Send State Tree Event**。
    -   将 **++** 节点连接到 **Send State Tree Event** 节点。
    
    ![添加Send State Tree Event节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09c79fb8-d132-43fa-b1bb-3ea27adc0d54/state-tree-external-26.png)
3.  从 **Send State Tree Event** 节点中的 **事件（Event）** 引脚拖出引线，然后搜索并选择 **Make StateTree Event**。
    
    ![从事件引脚拖出引线，然后搜索并选择Make StateTree Event](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74bfb3dd-1aa2-449b-a65c-140cc3d94f70/state-tree-external-27.png)
4.  点击 **标签（Tag）** 下拉菜单，然后选择 **StateTree > 击中反应（Hit Reaction）** 。
    
    ![点击标签下拉菜单并选择StateTree > 击中反应](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a8c53ca-f39d-4030-bf4e-389385c83ccb/state-tree-external-28.png)
5.  从 **OnComponentHit** 节点的 **击中组件（Hit Component）** 引脚拖出引线，然后搜索并选择 **Get Display Name**。
    
    -   从 **Get Display Name** 节点的 **返回值（Return Value）** 引脚拖出引线，并将其连接到 **Make StateTree Event** 节点的 **原点（Origin）** 引脚。
    
    ![将击中组件连接到Make StateTree Event节点的原点引脚](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68d97af3-54be-4281-a571-9468e336ebff/state-tree-external-29.png)
6.  **编译** 并 **保存** 蓝图。

### 阶段成果

在此小节中，你修改了 **ShootingTarget** 蓝图，以便它在被击中时发送StateTree **击中反应（Hit Reaction）** 事件。

## 6 - 修改STT\_MoveAlongSpline

在此小节中，你将修改 **STT\_MoveAlongSpline** 以使用 **BP\_ShootingTarget** 中的 **DistanceTraveled** 变量，而不是本地距离变量来计算其沿样条线的位置。

1.  在 **内容浏览器（Content Browser）** 中，双击打开 **STT\_MoveAlongSpline** 。点击函数旁边的 **重载（Override）** 下拉菜单，然后选择 **EnterState**，在**事件图表（Event Graph）** 中创建 **Event EnterState** 节点。
    
    ![重载Enter State事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6deeddb7-37d1-4b3e-aac9-a7e6a75883fb/state-tree-external-31.png)
2.  将 **Actor** 变量拖入 **事件图表（Event Graph）** ，然后选择 **Get Actor**。
    
    -   从 **Actor** 拖出引线，然后搜索并选择 **Cast to BP\_ShootingTarget**。
    -   右键点击 **Cast to BP\_ShootingTarget** 节点中的 **作为BP\_ShootingTarget（As BP\_ShootingTarget）** 引脚，然后选择 **提升到变量（Promote to Variable）**。
    -   将 **Event EnterState** 节点连接到 **Cast to BP\_ShootingTarget** 节点。
    
    ![从Actor拖出引线，然后搜索并选择Cast to BP_ShootingTarget。将此项保存变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36f45198-ec45-4adc-b8cb-51e69b0eb0ed/state-tree-external-32.png)
3.  将 **AsBPShootingTarget** 拖入 **事件图表（Event Graph）** ，并选择 **Get AsBPShootingTarget**。
    
    -   从 **AsBPShootingTarget** 拖出引线，然后搜索并选择 **Get Distance Traveled**。
    -   将 **DistanceTraveled** 连接到 **Get Location at Distance Along Spline** 节点的 **距离（Distance）** 引脚。这会替换与距离的当前连接。
    
    ![将DistanceTraveled连接到Get Location at Distance Along Spline节点的距离引脚](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15161b1a-f05a-4147-bf53-fdae41800635/state-tree-external-33.png)
4.  将 **AsBPShootingTarget** 拖入 **事件图表（Event Graph）** ，并选择 **Get AsBPShootingTarget**。
    
    -   从 **AsBPShootingTarget** 拖出引线，然后搜索并选择 **Get Distance Traveled**。
    -   将 **DistanceTraveled** 连接到 **Less Than** 节点，替换与距离的连接。
    
    ![将DistanceTraveled连接到Less Than节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19f6c4cf-a0cb-4835-a8b7-49b9ac35e07f/state-tree-external-34.png)
5.  将 **AsBPShootingTarget** 拖入 **事件图表（Event Graph）** ，并选择 **Get AsBPShootingTarget**。
    
    -   从 **AsBPShootingTarget** 拖出引线，然后搜索并选择 **Get Distance Traveled**。
    -   将 **DistanceTraveled** 连接到 **+** 节点，替换与距离的连接。
    -   将 **AsBPShootingTarget** 拖入 **事件图表（Event Graph）** ，并选择 **Get AsBPShootingTarget**。从节点拖出引线，然后搜索并选择 **Set DistanceTraveled**。
    -   替换连接到 **Branch** 节点的 **True** 引脚的 **Set Distance** 节点。
    
    ![将DistanceTraveled连接到+节点并将Set Distance节点替换为Set Distance Traveled节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8accf88a-1689-47f7-a5ef-3af07e8af2df/state-tree-external-35.png)
6.  将 **AsBPShootingTarget** 拖入 **事件图表（Event Graph）** ，并选择 **Get AsBPShootingTarget**。
    
    -   从节点拖出引线，然后搜索并选择 **Set DistanceTraveled**。
    -   替换连接到 **Branch** 节点的 **True** 引脚的 **Set Distance** 节点。
    
    ![将Set Distance节点替换为Set Distance Traveled节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9a0a42c-ad5a-4047-81ce-d358992dacbf/state-tree-external-36.png)
7.  **编译** 并 **保存** 蓝图。

### 阶段成果

在此小节中，你修改了 **STT\_MoveAlongSpline** 以使用 **BP\_ShootingTarget** 中的 **DistanceTraveled** 变量，而不是本地距离变量。

## 7 - 测试结果

按 **运行（Play）** 并朝目标射击。你应该会看到目标在被击中时旋转，并在0.5秒后继续移动。

![现在目标在被击中时会旋转](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a39f1afb-e9ae-4ef3-9fe1-11e7baae09a2/state-tree-external-final.gif)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [介绍](/documentation/zh-cn/unreal-engine/external-statetree-quickstart-guide#%E4%BB%8B%E7%BB%8D)
-   [目标](/documentation/zh-cn/unreal-engine/external-statetree-quickstart-guide#%E7%9B%AE%E6%A0%87)
-   [目的](/documentation/zh-cn/unreal-engine/external-statetree-quickstart-guide#%E7%9B%AE%E7%9A%84)
-   [1 - 先决条件](/documentation/zh-cn/unreal-engine/external-statetree-quickstart-guide#1-%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [2 - 创建StateTree任务以使目标旋转](/documentation/zh-cn/unreal-engine/external-statetree-quickstart-guide#2-%E5%88%9B%E5%BB%BAstatetree%E4%BB%BB%E5%8A%A1%E4%BB%A5%E4%BD%BF%E7%9B%AE%E6%A0%87%E6%97%8B%E8%BD%AC)
-   [阶段成果](/documentation/zh-cn/unreal-engine/external-statetree-quickstart-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C)
-   [3 - 创建StateTree以使目标旋转](/documentation/zh-cn/unreal-engine/external-statetree-quickstart-guide#3-%E5%88%9B%E5%BB%BAstatetree%E4%BB%A5%E4%BD%BF%E7%9B%AE%E6%A0%87%E6%97%8B%E8%BD%AC)
-   [阶段成果](/documentation/zh-cn/unreal-engine/external-statetree-quickstart-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-2)
-   [4 - 添加外部StateTree](/documentation/zh-cn/unreal-engine/external-statetree-quickstart-guide#4-%E6%B7%BB%E5%8A%A0%E5%A4%96%E9%83%A8statetree)
-   [阶段成果](/documentation/zh-cn/unreal-engine/external-statetree-quickstart-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-3)
-   [5 - 修改BP\_ShootingTarget](/documentation/zh-cn/unreal-engine/external-statetree-quickstart-guide#5-%E4%BF%AE%E6%94%B9bp-shootingtarget)
-   [阶段成果](/documentation/zh-cn/unreal-engine/external-statetree-quickstart-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-4)
-   [6 - 修改STT\_MoveAlongSpline](/documentation/zh-cn/unreal-engine/external-statetree-quickstart-guide#6-%E4%BF%AE%E6%94%B9stt-movealongspline)
-   [阶段成果](/documentation/zh-cn/unreal-engine/external-statetree-quickstart-guide#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-5)
-   [7 - 测试结果](/documentation/zh-cn/unreal-engine/external-statetree-quickstart-guide#7-%E6%B5%8B%E8%AF%95%E7%BB%93%E6%9E%9C)
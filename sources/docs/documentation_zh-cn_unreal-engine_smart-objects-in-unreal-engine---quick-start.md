# 虚幻引擎智能对象快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---quick-start
> 
> 生成时间: 2025-06-14T19:43:55.777Z

---

目录

![智能对象快速入门](https://dev.epicgames.com/community/api/documentation/image/e25486e1-d81c-4c5d-ae13-08ac8b1b3300?resizing_type=fill&width=1920&height=335)

## 概述

**智能对象（Smart Objects）** 是一种放置在关卡中，并且供AI代理和玩家交互的对象。这些对象自带了交互所需的所有信息。

简要来说，智能对象表示关卡中的一组活动，可通过预留系统使用。该系统跟踪关卡中的所有智能对象，并允许AI代理"预留"一个智能对象，这样，在该智能对象再次可用之前，其他代理不能使用它。

## 目标

在本快速入门指南中，你将了解如何通过AI代理创建和使用智能对象。

## 目标

-   创建AI代理在访问智能对象时可以使用的AI游戏行为和行为定义。
    
-   创建一个智能对象来持有行为定义播放动画蒙太奇。
    
-   使用行为树和行为树任务创建简单的AI行为。
    
-   创建可以在关卡中搜索和使用智能对象的AI代理。
    

## 1 - 必要设置

1.  基于 **第三人称（Third Person）** 模板新建 **蓝图（Blueprint）** 项目。
    
2.  在主菜单中，转到 **设置（Settings）> 插件（Plugins）**，打开 **插件（Plugins）** 窗口。
    
    ![Open the Plugins window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e037bdda-3b3f-4b3f-b4c9-fbcf48ccaa70/so-qs-plugins-1.png)
3.  找到 **游戏（Gameplay）** 分段，启用 **智能对象（Smart Objects）**、**AI行为（AI Behaviors）** 和 **Gameplay行为智能对象（Gameplay Behavior Smart Objects）** 插件。如果出现提示，请重新启动编辑器。
    
    ![Enable the Smart Objects plugin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17756dff-504c-40c1-aff9-bf8b96d6930a/so-qs-plugins-2.png) ![Enable the AI Behaviors plugin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b8f3c91-65de-4024-adad-04ac443eb38b/so-qs-plugins-3.png) ![Enable the Gameplay Behavior Smart Objects plugin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/379f7bc2-69b3-4dbd-8e50-f5ed37d96c8e/so-qs-plugins-4.png)

### 阶段成果

在本节中，你创建了一个新项目并启用了智能对象和AI行为插件。你现在已经准备好为AI代理创建AI游戏行为。

## 2 - 创建AI游戏行为

在本节中，你将创建游戏行为和游戏配置蓝图，用于定义代理在访问智能对象插槽时将执行的操作。

1.  在 **内容浏览器（Content Browser）** 中，右键单击并从 **创建基本资产（Create Basic Asset）** 分段中选择 **蓝图类（Blueprint Class）**。
    
    ![Create a new Blueprint Class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d4c267f-1d4e-4757-93f0-c7cdb0a0aa38/so-qs-createbp.png)
2.  在 **选取父类（Pick Parent Class）** 窗口中，展开 **所有类（All Classes）** 分段，然后搜索并选择 **游戏行为（Gameplay Behavior）**。单击 **选择（Select）** 并将新资产命名为 **BP\_SO\_Behavior\_PlayMontage**。
    
    ![Select the Gameplay Behavior class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d30df693-1391-46ea-9ece-c5ba2401d84f/so-qs-createbehavior-1.png)
3.  创建一个新的蓝图类，然后搜索并选择 **游戏行为配置（Gameplay Behavior Config）**。单击 **选择（Select）** 并将新资产命名为 **BP\_SO\_BehaviorConfig**。
    
    ![Select the Gameplay Behavior Config class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/edaf2e79-66d1-4c0d-8422-e25d9d497cc1/so-qs-createbehavior-2.png)
4.  在 **内容浏览器（Content Browser）** 中，双击 **BP\_SO\_BehaviorConfig** 将其打开。转到 **细节（Details）** 面板，然后单击 **行为类（Behavior Class）** 下拉框。选择 **BP\_SO\_Behavior\_PlayMontage**。编译并保存蓝图。
    
    ![Add the BP_SO_Behavior_PlayMontage to the Behavior Class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a8fd341-017a-476f-a088-6fad35361ea2/so-qs-createbehavior-3.png)
5.  在 **内容浏览器（Content Browser）** 中，双击 **BP\_SO\_Behavior\_PlayMontage** 将其打开。单击 **函数（Functions）** 旁边的 **重写（Override）** 下拉框，然后选择 **OnTriggeredCharacter**。
    
    ![Override the OnTriggeredCharacter function](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b56a14ff-a1ac-4ff5-a887-cdb9d7240736/so-qs-createbehavior-4.png)
6.  右键单击 **Event OnTriggeredCharacter** 节点的 **游戏对象（Avatar）** 引脚，然后选择 **提升为变量（Promote to Variable）**。
    
    ![Right-click the Avatar pin of the Event OnTriggeredCharacter node and select Promote to Variable](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8445fb70-4a68-4152-8af4-d130429ef61d/so-qs-createbehavior-5.png)
7.  将 **游戏对象（Avatar）** 变量拖到 **事件图表（Event Graph）** 并选择 **获取游戏对象（Get Avatar）**。从 **游戏对象（Avatar）** 节点拖动，然后搜索并选择 **按类获取组件（Get Component by Class）**。
    
    ![Search for and select Get Component by Class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ada2979-8a2c-4525-b73f-1ce5941cbaa5/so-qs-createbehavior-6.png)
8.  单击 **组件类（Component Class）** 下拉框，然后搜索并选择 **骨骼网格体组件（Skeletal Mesh Component）**。
    
    ![Add the Skeletal Mesh component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85ab41d1-815a-4aa4-8760-175f7241872b/so-qs-createbehavior-7.png)
9.  右键单击 **事件图表（Event Graph）**，然后搜索并选择 **播放蒙太奇（Play Montage）**。
    
    1.  将 **按类获取组件（Get Component by Class）** 节点的 **返回值（Return Value）** 引脚连接到 **播放蒙太奇（Play Montage）** 节点的 **在骨骼网格体中（In Skeletal Mesh Component）** 引脚。
        
    2.  将 **设置游戏对象（Set Avatar）** 节点连接到 **播放蒙太奇（Play Montage）** 节点。
        
    
    ![Add a Play Montage node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4dcfec2e-d7ce-44f6-9a45-0acc0b24f6af/so-qs-createbehavior-8.png) ![Connect the Play Montage node to the Set Avatar node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9899f8e-51bd-450c-a25f-54b9ebf67102/so-qs-createbehavior-9.png)
10.  单击 **播放蒙太奇（Play Montage）** 节点上的 **蒙太奇播放（Montage to Play）** 下拉框。从列表中选择动画蒙太奇。
    
    ![Select an animation montage to play](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce0b3889-306f-4a33-8099-6ac6503fbbac/so-qs-createbehavior-10.png)
    
    如果没有可用的动画，可以从[Fab](https://www.fab.com/)获得免费的动画资产包，例如\[动画初学者内容包\]\](https://www.fab.com/listings/98ff449d-79db-4f54-9303-75486c4fb9d9)。你也可以将任意动画序列转换成动画蒙太奇，方法是右键点击要转换的序列并选择 **创建（Create）> 创建蒙太奇（Create AnimMontage）**。
    
11.  将 **游戏对象（Avatar）** 变量拖到 **事件图表（Event Graph）** 并选择 **获取游戏对象（Get Avatar）**。从 **游戏对象（Avatar）** 节点拖动，然后搜索并选择 **结束行为（End Behavior）**。
    
    ![Add the End Behavior node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/951317ee-3d79-4c5b-a5eb-001742fc0ca6/so-qs-createbehavior-11.png)
12.  将 **完成时（On Completed）** 和 **中断时（On Interrupted）** 引脚从 **播放蒙太奇（Play Montage）** 节点连接到 **结束行为（End Behavior）** 节点。
    
    ![Connect On Completed and On Interrupted to the End Behavior node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24293db9-0577-4fd6-b9a9-ad97c430b96f/so-qs-createbehavior-12.png)
13.  编译并保存蓝图。
    
    此示例使用 **播放蒙太奇（Play Montage）** 节点，而不是 **播放动画蒙太奇（Play Anim Montage）** 节点，从而使用 **完成时（On Completed）** 和 **中断时（On Interrupted）** 引脚来结束行为。这可确保智能对象保持占用状态，直到动画播放完毕。
    

### 阶段成果

在本节中，你创建了游戏行为和游戏配置蓝图，代理访问智能对象插槽之后，将使用它们来播放动画蒙太奇。你现在可以创建智能对象将使用的行为定义。

## 3 - 创建智能对象定义数据资产

在本节中，你将创建智能对象定义数据资产，它将定义智能对象的每个插槽的行为。

1.  在 **内容浏览器（Content Browser）** 中，右键单击并选择 **杂项（Miscellaneous）>数据资产（Data Asset）**。
    
    1.  在 **为数据资产实例选择类（Pick Class for Data Asset Instance）** 窗口中，搜索并选择 **智能对象定义（Smart Object Definition）**。
        
    2.  单击 **选择（Select）** 创建资产并将其命名为 **SO\_Definition\_PlayMontage**。
        
    
    ![Select Miscellaneous - Data Asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79c7f895-2b2b-4e03-a21a-81931574e2e2/so-qs-createdefinition-1.png) ![Select the Smart Object Definition](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23ad706a-6a22-4993-b234-c51f86a79736/so-qs-createdefinition-2.png)
2.  在 **内容浏览器（Content Browser）** 中，双击 **SO\_Definition\_PlayMontage** 将其打开。向下滚动到 **智能对象（Smart Object）** 分段，然后单击 **插槽（Slots）** 旁边的 **添加（+）"（Add (+)）"** 按钮以添加新插槽。这是AI代理在执行该行为时将使用的插槽。
    
    ![单击 **插槽（Slots）** 旁边的添加（+）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37f1797d-e1dc-4762-9672-9b2a8dd636e7/so-qs-createdefinition-3.png)
3.  单击 **默认行为定义（Default Behavior Definitions）** 旁边的 **添加（+）"（Add (+)）"** 按钮，然后为 **索引0（Index 0）** 选择 **Gameplay行为智能对象定义（Gameplay Behavior Smart Object Behavior Definition）**。单击 **游戏行为配置（Gameplay Behavior Config）** 下拉框并选择 **BP\_SO\_BehaviorConfig**。
    
    ![Add a new Default Behavior Definition](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5671872-5cd6-4e95-b6c0-bd66ec54968d/so-qs-createdefinition-4.png)
4.  保存并关闭蓝图。
    

### 阶段成果

在本节中，你创建了定义智能对象的每个插槽及其默认行为定义的智能对象定义数据资产。

## 4 - 创建一个智能对象

在本节中，你将创建一个智能对象，该对象可以被关卡中的代理找到和使用。

1.  在 **内容浏览器（Content Browser）** 中，右键单击并从 **创建基本资产（Create Basic Asset）** 分段中选择 **蓝图类（Blueprint Class）**。
    
    ![Create a new Blueprint Class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be3096f3-49a5-416d-91b5-2ea08485676e/so-qs-createbp.png)
2.  在 **选取父类（Pick Parent Class）** 窗口中，单击 **Actor** 类按钮以创建资产。将新资产命名为 **BP\_SO\_RunBT**。
    
    ![Select the Actor class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1292aaea-8d13-43d0-835c-97cf089bdc39/so-qs-createobject-1.png)
3.  在 **内容浏览器（Content Browser）** 中，双击 **BP\_SO\_RunBT** 将其打开。转到 **组件（Components）** 窗口，然后单击 + **添加（Add）** 按钮。搜索并选择 **智能对象（Smart Object）**。
    
    ![Select the SOComponent component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a730febe-a219-40f3-84f0-67050db877d8/so-qs-createobject-2.png)
4.  选择 **SmartObject** 组件后，转到 **细节（Details）** 面板并向下滚动到 **智能对象（Smart Object）** 分段。单击 **定义资产（Definition Asset）** 下拉框并选择 **SO\_Definition\_PlayMontage**。
    
    ![Add the Definition Asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d8f8e12-b456-44be-a553-08c0f5c2d159/so-qs-createobject-3.png)
5.  编译并保存蓝图。
    

### 阶段成果

在本节中，你创建了一个智能对象并添加了定义其插槽默认行为的行为定义。

## 5 - 为AI代理创建行为树

在本节中，你将为AI代理创建必要的行为，以便在关卡中搜索和使用智能对象。你将使用一个简单的行为树和两个自定义行为树任务来完成这个任务。

### 创建行为树和黑板

1.  在 **内容浏览器（Content Browser）** 中，右键单击并选择 **AI > 黑板（Blackboard）**。将黑板命名为 **BB\_SO\_Agent**。
    
    ![Create a Blackboard](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20eee3ac-1412-410b-99b7-6b9025b46d1f/so-qs-createbt-1.png)
2.  双击 **BB\_SO\_Agent** 将其打开。单击 **新关键帧（New Key）** 下拉框并选择 **SO声明句柄（SO Claim Handle）**。将关键帧命名为 **ClaimHandle**。保存并关闭黑板。
    
    ![Add a SmartObject Claim Handle](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca4e3af0-80c7-4642-afd1-0e1e80613096/so-qs-createbt-2.png)
3.  在 **内容浏览器（Content Browser）** 中，右键单击并选择 **AI > 行为树（Behavior Tree）**。将行为树命名为 **BT\_SO\_Agent**。
    
    ![Create a Behavior Tree](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe36fc84-616d-46b7-b17b-87118ebcc746/so-qs-createbt-3.png)

### 创建行为树任务

**寻找智能对象**

1.  在 **内容浏览器（Content Browser）** 中，右键单击并从 **创建基本资产（Create Basic Asset）** 分段中选择 **蓝图类（Blueprint Class）**。
    
    ![Create a new Blueprint Class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce9eeb86-f9ff-43e4-9660-08e08efb5b06/so-qs-createbp.png)
2.  在 **所有类（All Classes）** 分段，搜索并选择 **BT任务蓝图基类（BT Task Blueprint Base）**，然后单击 **选择（Select）**。将蓝图命名为 **BTT\_FindSmartObject**。
    
    ![Search for and select BT Task Blueprint Base, then click Select](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3876dc6b-c6a9-4524-9ace-bc90d592c376/so-qs-createbt-4.png)
3.  在 **内容浏览器（Content Browser）** 中，右键单击 **BTT\_FindSmartObject** 并选择 **复制（Duplicate）**。将新蓝图命名为 **BTT\_UseSmartObject**。
    
    ![Duplicate BTT_FindSmartObject](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/739fee43-9cba-4cbb-aff4-326c5472d7ed/so-qs-createbt-5.png)
4.  在 **内容浏览器（Content Browser）** 中，双击 **BTT\_FindSmartObject** 将其打开。在 **事件图表（Event Graph）** 中右键单击，然后搜索并选择 **事件接收执行AI（Event Receive Execute AI）**。
    
    ![Add the Event Receive Execute AI node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f28d45a-b8d9-410b-9f19-e3845251a1d4/so-qs-createbt-6.png)
5.  从 **事件接收执行AI（Event Receive Execute AI）** 节点的 **所有者控制器（Owner Controller）** 引脚拖动，然后搜索并选择 **获取黑板（Get Blackboard）**。
    
    1.  右键单击 **获取黑板（Get Blackboard）** 节点的 **返回值（Return Value）** 引脚，然后选择 **提升为变量（Promote to Variable）**。将变量命名为 **Blackboard**。
        
    2.  将 **事件接收执行AI（Event Receive Execute AI）** 节点连接到 **设置黑板（Set Blackboard）** 节点。
        
    
    ![Add the Get Blackboard node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/770de8eb-4a76-4b69-b3c6-2e74de96a399/so-qs-createbt-7.png) ![Connect the Set Blackboard node to the Event Receive Execute AI node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9bd8b72f-dc53-4d59-bb34-4d920c3dc89b/so-qs-createbt-8.png)
6.  从 **事件接收执行AI（Event Receive Execute AI）** 节点的 **控制Pawn（Controlled Pawn）** 引脚拖动，然后搜索并选择 **获取Actor位置（Get Actor Location）**。
    
    1.  从 **获取Actor位置（Get Actor Location）** 节点的 **返回值（Return Value）** 拖动，然后搜索并选择 **减（Subtract）**。
        
    2.  从 **获取Actor位置（Get Actor Location）** 节点的 **返回值（Return Value）** 拖动，然后搜索并选择 **加（Add）**。
        
    3.  将这两个节点的 **X**、**Y** 和 **Z** 值都设置为 **2000**。这会在代理周围创建一个4000x4000单位或40x40米的搜索框。
        
    
    ![Add the Get Actor Location node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/144ecc3d-b939-4c8c-882d-9356c6afb834/so-qs-createbt-9.png) ![Add Subtract and Add nodes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7aa9e001-1d53-47f0-9e88-be25f48535bc/so-qs-createbt-10.png)
7.  在 **事件图表（Event Graph）** 中右键单击，然后搜索并选择 **创建盒体（Make Box）**。
    
    1.  将 **减（Subtract）** 节点连接到 **创建盒体（Make Box）** 节点的 **最小（Min）** 引脚。
        
    2.  将 **加（Add）** 节点连接到 **创建盒体（Make Box）** 节点的 **最大（Max）** 引脚。
        
    
    ![Add a Make Box node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a925a18a-b39a-4703-8f92-77c4f8f82633/so-qs-createbt-11.png) ![Connect the Make Box node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ebf56ce-3582-4c7b-89a7-c05a98021aea/so-qs-createbt-12.png)
8.  在 **事件图表（Event Graph）** 中右键单击，然后搜索并选择 **获取智能对象子系统（Get Smart Object Subsystem）**。
    
    1.  从 **智能对象子系统（Smart Object Subsystem）** 节点拖动，然后搜索并选择 **查找智能对象（Find Smart Objects）**。
        
    2.  从 **查找智能对象（Find Smart Objects）** 节点的 **请求（Request）** 引脚拖动，并选择 **创建智能对象请求（Make SmartObjectRequest）**。
        
    
    ![Add a Get Smart Object Subsystem node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f91f8211-48bb-4789-8070-f43cd7a48329/so-qs-createbt-13.png) ![Add a Find Smart Objects node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71feb573-8fc8-4deb-880b-4198fc7dc083/so-qs-createbt-14.png) ![Select Make SmartObjectRequest](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffbf5116-d44f-4ea1-877e-a619513ed1f1/so-qs-createbt-15.png)
9.  将 **创建盒体（Make Box）** 节点的 **返回值（Return Value）** 引脚连接到 **创建智能对象请求（Make SmartObjectRequest）** 节点的 **查询盒体（Query Box）** 引脚。
    
    1.  从 **创建智能对象请求（Make SmartObjectRequest）** 节点的 **过滤器（Filter）** 引脚拖动，并选择 **创建智能对象请求过滤器（Make SmartObjectRequestFilter）**。
        
    2.  从 **行为定义类（Behavior Definition Classes）** 拖出引脚并搜索，然后选择 **创建数组（Make Array）**。
        
    3.  点击 **创建数组（Make Array）** 的下拉菜单并选择 **Gameplay行为智能对象行为定义（GameplayBehaviorSmartObjectBehaviorDefinition）**。
        
    4.  将 **设置黑板（Set Blackboard）** 节点连接到 **查找智能对象（Find Smart Objects）** 节点。
        
    
    ![Connect the Return Value pin of the Make Box node to the Query Box pin of the Make SmartObjectRequest node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4829d2b-439e-48b3-bea3-16dcfd4e3550/so-qs-createbt-16.png) ![Select GameplayBehaviorSmartObjectBehaviorDefinition from the dropdown](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/512dcb20-b976-4a93-9dd2-21f49b7b6f5f/so-qs-createbt-17.png)
10.  这是蓝图目前的样子。
    
    ![The Blueprint so far](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38e3a911-99d8-4064-8936-4379a6a232ae/so-qs-createbt-18.png)
11.  右键单击 **查找智能对象（Find Smart Objects）** 节点的 **输出结果（Out Results）** 引脚，然后选择 **提升为变量（Promote to Variable）**。将 **输出结果（Out Results）** 节点连接到 **黑板（Blackboard）** 节点。
    
    1.  从 **输出结果（Out Results）** 节点的引脚拖动，然后搜索并选择 **是有效索引（Is Valid Index）**。
        
    2.  从 **是有效索引（Is Valid Index）** 节点拖动，然后搜索并选择 **分支（Branch）**。将 **输出结果（Out Results）** 节点连接到 **分支（Branch）** 节点。
        
    
    ![Right-click the Out Results pin of the Find Smart Objects node and select Promote to Variable](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47d7f4cb-9491-4a78-a094-c625dfcbec23/so-qs-createbt-19.png) ![Select Is Valid Index](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/615e5f0b-c3c6-480a-ac89-cb9909d7a1d1/so-qs-createbt-20.png) ![Select Is Valid Index](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/379704b8-cdda-4a3e-bac4-993d3cc9909c/so-qs-createbt-21.png)
12.  从 **分支（Branch）** 节点的 **False** 引脚拖动，然后搜索并选择 **完成执行（Finish Execute）**。如果附近没有符合搜索条件的智能对象，**输出结果（Out Results）** 将无效。
    
    ![Drag from the False pin of the Branch node, then search for and select Finish Execute](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9396470-fed4-4ee4-9481-5a75de25d2a8/so-qs-createbt-22.png)
13.  在 **事件图表（Event Graph）** 中创建一个 **智能对象子系统（Smart Object Subsystem）** 节点。从该节点拖动，然后搜索并选择 **声明（Claim）**。
    
    1.  将 **分支（Branch）** 节点的 **True** 引脚连接到 **声明（Claim）** 节点。
        
    2.  将 **输出结果（Out Results）** 变量拖到 **事件图表（Event Graph）** 并选择 **获取输出结果（Get Out Results）**。从该节点拖动，然后搜索并选择 **随机数组项（Random Array Item）**。
        
    3.  从 **随机（Random）** 节点拖动并将其连接到 **声明（Claim）** 节点的 **请求结果（Request Results）** 引脚。
        
    
    ![Add a Claim node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a828429-305e-4efc-b23a-dfeb3d427baa/so-qs-createbt-23.png) ![Drag from the node, then search for and select Random Array Item](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d51f8e4a-f3a8-4f11-a577-c6f3d6a275e3/so-qs-createbt-24.png) ![Drag from the Random node and connect it to the Request Results pin of the Claim node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53f43d0d-6f80-4b30-9065-b5b6ee921c1c/so-qs-createbt-25.png)
14.  右键单击 **声明（Claim）** 节点的 **返回值（Return Value）** 引脚，然后选择 **提升为变量（Promote to Variable）**。将变量命名为 **ClaimHandle**。
    
    1.  从 **声明句柄（Claim Handle）** 节点引脚拖动，然后搜索并选择 **是有效智能对象声明句柄（Is Valid Smart Object Claim Handle）**。
        
    2.  从 **是有效智能对象声明句柄（Is Valid Smart Object Claim Handle）** 节点的 **返回值（Return Value）** 拖动，然后搜索并选择 **分支（Branch）**。
        
    
    ![右键单击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f979eb07-7bf5-4d2a-b62d-58b0c9e9148f/so-qs-createbt-26.png) ![Drag from the Claim Handle node pin, then search for and select Is Valid Smart Object Claim Handle](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69c588cf-f951-4f71-bd77-dde4aa92d20f/so-qs-createbt-27.png) ![Drag from the Return Value of the Is Valid Smart Object Claim Handle node, then search for and select Branch](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f1a3a33-7536-488c-aff4-de7ba5e7268e/so-qs-createbt-28.png)
15.  从 **分支（Branch）** 节点的 **False** 引脚拖动，然后搜索并选择 **完成执行（Finish Execute）**。
    
    ![Drag from the False pin of the Branch node, then search for and select Finish Execute](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b22ef168-b7a6-4538-81f8-c3d78fc064cd/so-qs-createbt-22.png)
16.  将 **Blackboard** 变量拖到 **事件图表（Event Graph）** 并选择 **获取黑板（Get Blackboard）**。
    
    1.  从 **黑板（Blackboard）** 节点拖动，然后搜索并选择 **将值设置为SOClaim句柄（Set Value as SOClaim Handle）**。
        
    2.  将 **分支（Branch）** 节点的 **True** 引脚连接到 **将值设置为SOClaim句柄（Set Value as SOClaim Handle）** 节点。
        
    3.  右键单击 **将值设置为SOClaim句柄（Set Value as SOClaim Handle）** 节点的 **关键帧名称（Key Name）** 引脚，然后选择 **提升为变量（Promote to Variable）**。
        
    4.  选择 **关键帧名称（Key Name）** 变量后，转到 **细节（Details）** 面板并启用 **实例可编辑（Instance Editable）** 复选框。将 **默认值（Default Value）** 设置为 **ClaimHandle**。
        
    
    ![Drag from the Blackboard node, then search for and select Set Value as SOClaim Handle](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7703906e-652b-4222-8a29-a7fd343881dc/so-qs-createbt-29.png) ![Right-click the Key Name pin of the Set Value as SOClaim Handle node and select Promote to Variable](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0e07b91-5292-4bef-a38d-c4a42a7e5e00/so-qs-createbt-30.png) ![启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44563ff4-cd3f-4d4c-8825-f981c56d5439/so-qs-createbt-31.png)
17.  拖动 **ClaimHandle** 变量并将其连接到 **将值设置为SOClaim句柄（Set Value as SOClaim Handle）** 节点的 **值（Value）** 引脚。
    
    ![Drag the ClaimHandle variable and connect it to the Value pin of the Set Value as SOClaim Handle node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9d42b66-0cc2-4b51-86a9-3555b4ee4fa9/so-qs-createbt-32.png)
18.  从 **将值设置为SOClaim句柄（Set Value as SOClaim Handle）** 节点拖动，然后搜索并选择 **完成执行（Finish Execute）**。启用节点上的 **成功（Success）** 复选框。
    
    ![Add a Finish Execute node and enable the Success checkbox](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cdebdce-5970-4ea7-8f73-1a7c7160ca75/so-qs-createbt-33.png)
19.  编译并保存蓝图。
    

**使用智能对象**

1.  在 **内容浏览器（Content Browser）** 中，双击 **BTT\_UseSmartObject** 将其打开。在 **事件图表（Event Graph）** 中右键单击并搜索，然后选择 **事件接收执行AI（Event Receive Execute AI）**。
    
    ![Add the Event Receive Execute AI node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e6fcc69-d9a4-4400-b4a7-06e488694b9b/so-qs-createbt-6.png)
2.  从 **事件接收执行AI（Event Receive Execute AI）** 节点的 **所有者控制器（Owner Controller）** 引脚拖动，然后搜索并选择 **获取黑板（Get Blackboard）**。
    
    ![Drag from the Owner Controller pin of the Event Receive Execute AI node, then search for and select Get Blackboard](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbe9243f-b867-43b4-92ec-60b1aad96ae8/so-qs-createbt-34.png)
3.  从 **获取黑板（Get Blackboard）** 节点的 **返回值（Return Value）** 引脚拖动，然后搜索并选择 **获取SOClaim句柄形式的值（Get Value as SOClaim Handle）**。
    
    ![Drag from the Return Value pin of the Get Blackboard node, then search for and select Get Value as SOClaim Handle](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4eabf343-50df-489e-b4bb-5d9f01f51760/so-qs-createbt-35.png)
4.  右键单击 **获取SOClaim句柄形式的值（Get Value as SOClaim Handle）** 节点的 **关键帧名称（Key Name）** 引脚，然后选择 **提升为变量（Promote to Variable）**。
    
    1.  选择 **关键帧名称（Key Name）** 变量后，转到 **细节（Details）** 面板并启用 **实例可编辑（Instance Editable）** 复选框。将 **默认值（Default Value）** 设置为 **ClaimHandle**。
    
    ![启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4b57e46-554b-4057-bd8a-4d6cdcfcbd5f/so-qs-createbt-31.png)
5.  从 **获取SOClaim句柄形式的值（Get Value as SOClaim Handle）** 节点的 **返回值（Return Value）** 引脚拖动，然后搜索并选择 **使用声明的Gameplay行为智能对象（Use Claimed Gameplay Behavior Smart Object）**。
    
    1.  将 **获取SOClaim句柄形式的值（Get Value as SOClaim Handle）** 节点连接到 **使用声明的智能对象（Use Claimed Smart Object）** 节点。
        
    2.  从 **事件接收执行AI（Event Receive Execute AI）** 节点的 **所有者控制器（Owner Controller）** 引脚拖动并连接到 **使用声明的智能对象（Use Claimed Smart Object）** 节点的 **控制器（Controller）** 引脚。
        
    
    ![Drag from the Return Value pin of the Get Value as SOClaim Handle node, then search for and select Use Claimed Smart Object](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76407fb4-f853-4235-a82c-56155406fd3e/so-qs-createbt-36.png) ![Drag from the Owner Controller pin of the Event Receive Execute AI node and connect it to the Controller pin of the Use Claimed Smart Object node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dba10bc9-bb57-4fff-a2e8-35c772e8ef79/so-qs-createbt-37.png)
6.  从 **使用声明的智能对象（Use Claimed Smart Object）** 节点 **On Succeeded** 引脚拖出，然后搜索并选择 **完成执行（Finish Execute）**。启用节点上的 **成功（Success）** 复选框。
    
    ![Drag from the On Finished pin of the Use Claimed Smart Object node, then search for and select Finish Execute](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb58d2e8-f1a7-49d9-8d52-db3070c51cec/so-qs-createbt-38.png)
7.  编译并保存蓝图。
    

**创建行为树**

1.  在 **内容浏览器（Content Browser）** 中，双击 **BT\_SO\_Agent** 将其打开。从 **根（Root）** 节点拖动并选择 **选择器（Selector）**。
    
    ![Drag from the Root node and select Selector](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9eb2004d-36e2-415c-b4c9-8fdabfc9d65a/so-qs-createbt-39.png)
2.  从 **选择器（Selector）** 节点拖动并选择 **序列（Sequence）**。
    
    1.  从"选择器（Selector）"节点拖动并选择 **等待（Wait）**。如果初始搜索不成功，该节点将让代理等待5秒再搜索新智能对象。
        
    2.  确保 **序列（Sequence）** 节点位于 **等待（Wait）** 节点的左侧。这确保序列首先在行为树中执行。
        
    
    ![Drag from the Selector node and select Sequence](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/303e2b07-a098-4542-b702-f81f18e46646/so-qs-createbt-40.png)
3.  从 **序列（Sequence）** 节点拖动并选择 **BTT\_FindSmartObjects**。
    
    ![Drag from the Sequence node and select BTT_FindSmartObjects](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c746be1-0754-4aed-bbab-488fc2048b88/so-qs-createbt-41.png)
4.  从 **序列（Sequence）** 节点拖动并选择 **BTT\_UseSmartObjects**。
    
    ![Drag from the Sequence node and select BTT_UseSmartObjects](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d5408de-1dcc-4d58-825d-3a7990ea08e7/so-qs-createbt-42.png)
5.  从 **序列（Sequence）** 节点拖动并选择 **等待（Wait）**。选择节点后，将 **等待时间（Wait Time）** 设置为 **2.0**，将 **随机偏差（Random Deviation）** 设置为 **0.5**。该节点将让代理等待1.5至2.5秒，然后再搜索新的智能对象。
    
    ![Drag from the Sequence node and select Wait](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a796f2c8-5e29-450e-b006-c1785814839f/so-qs-createbt-43.png) ![Final Behavior Tree](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e962b76c-a0c8-4698-b38c-8b34b8a77c40/so-qs-createbt-44.png)
6.  保存并关闭行为树。
    

**阶段成果**

在本节中，你创建了允许代理在关卡中查找和使用智能对象的行为树和行为树任务。

## 6 - 创建AI代理

在本节中，你将创建在关卡中搜索智能对象的AI代理。

1.  在 **内容浏览器（Content Browser）** 中，双击 **BP\_ThirdPersonCharacter** 蓝图将其打开。
    
    ![Double-click the ThirdPersonCharacter Blueprint to open it](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/666021f9-2936-4d82-a12c-b44a33fb9e59/so-qs-createagent-1.png)
2.  选择 **Event Graph（事件图表）** 中的所有节点并将其删除。右键单击 **事件图表（Event Graph）**，然后搜索并选择 **拥有的事件（Event Possessed）**。
    
    ![Right-click in the Event Graph and search for then select Event Possessed](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/425982de-edb3-4d01-8c12-a551ee38c1cd/so-qs-createagent-2.png)
3.  从 **拥有的事件（Event Possessed）** 节点的 **新控制器（New Controller）** 引脚拖动，然后搜索并选择 **转换为AI控制器（Cast to AI Controller）**。将 **拥有的事件（Event Possessed）** 节点连接到 **转换为AI控制器（Cast to AI Controller）** 节点。
    
    ![Drag from the New Controller pin of the Event Possessed node, then search for and select Cast to AI Controller](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/633cb5a7-733f-424e-a67a-e7f654642d6e/so-qs-createagent-3.png)
4.  从 **转换为AI控制器（Cast to AI Controller）** 节点的 **作为AI控制器（As AIController）** 引脚拖动，然后搜索并选择 **运行行为树（Run Behavior Tree）**。单击 **BTAsset** 下拉框并选择 **BT\_SO\_Agent**。
    
    ![Drag from the As AIController pin of the Cast to AIController node, then search for and select Run Behavior Tree](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ccc1e085-e59b-4de8-86d5-28eb2ca4d0ee/so-qs-createagent-4.png)
5.  编译并保存蓝图。
    

**阶段成果**

在本节中，你创建了在关卡中搜索智能对象的AI代理蓝图。你还修改了动画蓝图以确保动画蒙太奇可以正确播放。

## 7 - 测试智能对象

现在，将测试代理以确保它可以查找和使用关卡中的智能对象。

1.  在主工具栏中，单击 **添加内容 (****+****) > 体积（Volumes） > NavMeshBoundsVolume**，将新的 **导航网格体（Navigation Mesh）** Actor添加到关卡。将网格体缩放至可以覆盖关卡，以便代理可以导航到其目的地。
    
    ![Add a NavMeshBoundsVolume to your Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b367ef5-c8db-4de3-9b83-c51c41d68efd/so-qs-testsos-0.png)
2.  将多个 **BP\_SO\_RunBT** 蓝图拖到关卡中。
    
    ![Drag several BP_SO_RunBT** **Blueprints to your level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd29c429-f6a8-4aeb-8b6d-c82cf45a20f4/so-qs-testsos-1.png)
3.  将 **ThirdPersonCharacter** 蓝图拖到关卡中。
    
    ![Drag the ThirdPersonCharacter** **Blueprint to your Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d8c1e8c-de24-4093-8e4e-79d649cd2921/so-qs-testsos-2.png)
4.  按 **模拟（Simulate）** 可以查看代理在关卡中查找和使用智能对象。
    
    ![Press Simulate to see the Agent find and use Smart Objects in the Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd3536bb-fc16-4636-99bc-22627b8fb643/so-qs-testsos-demo.gif)

**阶段成果**

在本节中，你确认了代理可以在关卡中查找和使用智能对象。

-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [smart objects](https://dev.epicgames.com/community/search?query=smart%20objects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---quick-start#%E6%A6%82%E8%BF%B0)
-   [目标](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---quick-start#%E7%9B%AE%E6%A0%87)
-   [目标](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---quick-start#%E7%9B%AE%E6%A0%87-2)
-   [1 - 必要设置](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---quick-start#1-%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [阶段成果](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---quick-start#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C)
-   [2 - 创建AI游戏行为](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---quick-start#2-%E5%88%9B%E5%BB%BAai%E6%B8%B8%E6%88%8F%E8%A1%8C%E4%B8%BA)
-   [阶段成果](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---quick-start#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-2)
-   [3 - 创建智能对象定义数据资产](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---quick-start#3-%E5%88%9B%E5%BB%BA%E6%99%BA%E8%83%BD%E5%AF%B9%E8%B1%A1%E5%AE%9A%E4%B9%89%E6%95%B0%E6%8D%AE%E8%B5%84%E4%BA%A7)
-   [阶段成果](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---quick-start#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-3)
-   [4 - 创建一个智能对象](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---quick-start#4-%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E6%99%BA%E8%83%BD%E5%AF%B9%E8%B1%A1)
-   [阶段成果](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---quick-start#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-4)
-   [5 - 为AI代理创建行为树](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---quick-start#5-%E4%B8%BAai%E4%BB%A3%E7%90%86%E5%88%9B%E5%BB%BA%E8%A1%8C%E4%B8%BA%E6%A0%91)
-   [创建行为树和黑板](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---quick-start#%E5%88%9B%E5%BB%BA%E8%A1%8C%E4%B8%BA%E6%A0%91%E5%92%8C%E9%BB%91%E6%9D%BF)
-   [创建行为树任务](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---quick-start#%E5%88%9B%E5%BB%BA%E8%A1%8C%E4%B8%BA%E6%A0%91%E4%BB%BB%E5%8A%A1)
-   [6 - 创建AI代理](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---quick-start#6-%E5%88%9B%E5%BB%BAai%E4%BB%A3%E7%90%86)
-   [7 - 测试智能对象](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---quick-start#7-%E6%B5%8B%E8%AF%95%E6%99%BA%E8%83%BD%E5%AF%B9%E8%B1%A1)
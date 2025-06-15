# 破坏系统数据流快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dataflow-for-destruction-quickstart
> 
> 生成时间: 2025-06-14T19:52:10.221Z

---

目录

![破坏系统数据流快速入门](https://dev.epicgames.com/community/api/documentation/image/874d445b-0f47-4876-8c0f-9b17cbd84e42?resizing_type=fill&width=1920&height=335)

本篇快速入门指南将指导你如何使用虚幻引擎的[数据流图表系统](/documentation/zh-cn/unreal-engine/dataflow-overview)破坏静态网格体并将其销毁，而不是使用编辑器破裂（Fracture）模式的传统工作流程。

阅读本指南前，请先阅读[破坏系统快速入门](/documentation/zh-cn/unreal-engine/destruction-quick-start)文档，了解如何用传统的工作流程破坏静态网格体。本指南遵循的步骤与之相同，但使用的是数据流，而非破裂模式。

## 1 - 必要设置

1.  新建项目并选择 **游戏（Games）** 类别和 **第一人称（First Person）** 模板。输入你的项目名称，点击 **创建（Create）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32aaef92-9159-4813-a2b7-08b4977f615c/destruction-setup-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32aaef92-9159-4813-a2b7-08b4977f615c/destruction-setup-1.png)
    
    点击查看大图。
    
2.  在编辑器中，点击 **文件（File）> 新关卡（New Level）** 。选择 **基础（Basic）** 模板并点击 **创建（Create）** 。保存关卡。
    
    ![新建关卡并使用基本模板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ce92844-a550-499e-babd-df48913a8109/destruction-setup-4.png)

### 阶段成果

在此分段中，你创建了新项目，并进行了设置，因此你可以添加一个静态网格体，并可按照本指南的下一分段使其破裂。

## 2 - 创建几何体集合

在本分段中，你将利用静态网格体Actor创建几何体集合。

1.  将静态网格体添加到关卡中，以用于创建破裂的网格体。在此示例中，我将使用Fab中提供的[内容示例](https://www.fab.com/listings/0281d63e-71f7-4e07-a344-5fa721ac4d35)项目中包含的 **Chaos图元盒体** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/181562ae-3986-4de0-99ba-50b834542e65/dataflow-destruction-quickstart-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/181562ae-3986-4de0-99ba-50b834542e65/dataflow-destruction-quickstart-1.png)
    
    点击查看大图。
    
2.  点击 **模式（Mode）** 下拉菜单，然后选择 **破裂（Fracture）** 。
    
    ![点击模式下拉菜单，选择破裂](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bacf06bf-6e52-496d-a3a5-e5d27cb3c124/dataflow-destruction-quickstart-2.png)
3.  转至 **生成（Generate）** 分段并点击 **新建（New）** ，创建新的 **几何体集合（Geometry Collection）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ea01e03-c877-4421-9b21-954effb168dc/dataflow-destruction-quickstart-3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ea01e03-c877-4421-9b21-954effb168dc/dataflow-destruction-quickstart-3.png)
    
    点击查看大图。
    
4.  此时将打开 **选择路径（Select Path）** 窗口。
    
    -   (1) 选择用于保存几何体集合的 **目录位置** 。
    -   (2) 输入资产的 **名称** 。
    -   (3) 点击 **数据流（Dataflow）** 下拉菜单。
    
    ![输入目录位置和资产名称，点击数据流下拉菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dae9ed5f-6c5a-4f59-ae62-2312fb0eff60/dataflow-destruction-quickstart-4.png)
5.  点击 **创建新资产（Create New Asset）** 下的 **DataFlowAsset** 。
    
    ![点击创建新资产下的DataFlowAsset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2c557a8-3132-4e19-836b-6cb128eeee09/dataflow-destruction-quickstart-5.png)
    
    -   (1) 选择用于保存资产的目录位置。
    -   (2) 输入资产名称。
    -   (3) 点击保存（Save）。
    
    ![选择目录位置和资产名称并点击保存](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0824e704-c032-444e-8828-840f4cb4b1c6/dataflow-destruction-quickstart-6.png)
6.  点击 **创建几何体集合（Create Geometry Collection）** 以创建 **几何体集合（Geometry Collection）** 和一个 **数据流（Dataflow）** 资产。
    
    ![点击创建几何体集合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/845d5de5-207e-4be7-a77d-1de2f692434e/dataflow-destruction-quickstart-7.png) ![创建了几何体集合和数据流资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7dc4e930-e8e1-435a-80a3-d0528f598837/dataflow-destruction-quickstart-8.png)
7.  点击 **选择模式（Selection Mode）> 选择（Selection）** 返回编辑器的 **选择（Selection）** 模式。 \*在 **内容浏览器（Content Browser）** 中双击打开 **几何体集合（Geometry Collection）** 。
    
    -   **几何体集合（Geometry Collection）** 窗口将显示 **数据流图表（Dataflow Graph）** 面板，你可以在其中输入数据流节点，使几何体集合破裂。
    
    ![点击选择模式 - 选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b3507b6-a536-4101-a3be-60464c6ded65/dataflow-destruction-quickstart-9.png)
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf6db09c-f6bb-4cbe-8f1a-5f87d3405935/dataflow-destruction-quickstart-10.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf6db09c-f6bb-4cbe-8f1a-5f87d3405935/dataflow-destruction-quickstart-10.png)
    
    点击查看大图。
    

### 阶段成果

在本分段中，你学习了如何利用与集合相关联的数据流资产创建几何体集合。

在下一分段中，你将学习如何通过创建数据流节点图表使几何体集合破裂。

## 3 - 使几何体集合破裂

1.  右键点击 **数据流（Dataflow）** 图表，搜索并选择 **Static Mesh To Collection** 。
    
    -   选择节点后，转到 **资产细节（Asset Details）** 面板并向下滚动到 **资产（Asset）** 分段。
    -   点击 **静态网格体（Static Mesh）** 下拉菜单，并选择要转化为几何体集合的静态网格体。
    
    ![右键点击数据流图表，搜索并选择Static Mesh To Collection。选择静态网格体资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a15eb200-a545-4dbe-8dd7-eca9a8835e7a/dataflow-destruction-quickstart-11.png)
2.  从 **Static Mesh to Collection** 节点拖出 **集合（Collection）** 引脚，然后搜索并选择 **Bounding Box** 。
    
    ![添加Bounding Box节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1dec60c1-8ba8-4abb-82a4-1c30a8b0445c/dataflow-destruction-quickstart-12.png)
3.  从 **Bounding Box** 节点拖出 **边界盒体（Bounding Box）** 引脚，然后搜索并选择 **Uniform Scatter Points** 。
    
    -   转到 **散布（Scatter）** 分段并为 **最小（Min）** 和 **最大点数（Max Number of Points）** 输入 **10**。
    
    ![添加Uniform Scatter Points节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f832ab72-b3d8-4135-a7b3-9b95d91e8ad9/dataflow-destruction-quickstart-13.png)
4.  从 **Static Mesh to Collection** 节点拖出 **集合（Collection）** 引脚，然后搜索并选择 **Voronoi Fracture** 。
    
    -   将 **Uniform Scatter Points** 节点的 **点（Points）** 引脚连接到 **Voronoi Fracture** 节点的 **点（Points）** 引脚。
    
    ![搜索并选择Voronoi Fracture](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b74e4d5a-439e-4ccb-8d80-cca97e6d4e29/dataflow-destruction-quickstart-14.png)
5.  从 **Bounding Box** 节点拖出 **边界盒体（Bounding Box）** 引脚，然后搜索并选择 **Uniform Scatter Points** 。
    
    -   转到 **散布（Scatter）** 分段并为 **最小（Min）** 和 **最大点数（Max Number of Points）** 输入 **25**。
    -   输入一个 **随机种子（Random Seed）** 数字。
    
    ![添加Uniform Scatter Points节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/537dd84c-7eef-4279-843e-c9e5d55bc0a7/dataflow-destruction-quickstart-15.png)
6.  从 **Voronoi Fracture** 节点拖出 **集合（Collection）** 引脚，然后搜索并选择 **Voronoi Fracture** 。
    
    -   将 **Uniform Scatter Point** 节点的 **点（Points）** 引脚连接到 **Voronoi Fracture** 节点的 **点（Points）** 引脚。
    
    ![搜索并选择Voronoi Fracture](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b64a368e-56b2-4e68-903c-3f18ef0b01be/dataflow-destruction-quickstart-16.png)
7.  从 **Voronoi Fracture** 节点拖出 **集合（Collection）** 引脚，然后搜索并选择 **Auto Cluster** 。 将 **Voronoi Fracture** 节点的 **变换选择（Transform Selection）** 引脚连接到 **Auto Cluster** 节点的 **变换选择（Transform Selection）** 引脚。
    
    ![添加Auto Cluster节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf45a09b-9e99-4f02-bccf-a62ade412334/dataflow-destruction-quickstart-17.png)
8.  从 **Auto Cluster** 节点拖出 **集合（Collection）** 引脚，然后搜索并选择 **Geometry Collection Terminal** 。
    
    -   将 **Static Mesh** 节点的 **材质实例（Material Instance）** 引脚和 **实例化网格体（Instanced Meshes）** 引脚连接至 **Geometry Collection Terminal** 节点的 **材质实例（Material Instances）** 引脚和 **实例化网格体（Instanced Meshes）** 引脚。
    
    ![添加Geometry Collection Terminal节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28c218d8-3405-419b-ad9d-02ec58e5c310/dataflow-destruction-quickstart-18.png)
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9a22ae5-094d-4a77-8ef5-56e0f4cd9dfa/dataflow-destruction-quickstart-19.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9a22ae5-094d-4a77-8ef5-56e0f4cd9dfa/dataflow-destruction-quickstart-19.png)
    
    点击查看大图。
    
9.  转到 **伤害（Damage）** 分段并展开 **伤害阈值（Damage Threshold）** 数组。
    
    -   将 **5000** 、 **500** 和 **50** 输入到 **伤害量（Damage Amounts）** 。
    
    ![将5000、500和50输入到伤害量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/219bd68e-7235-45e3-880c-b2f7bb70bc7b/dataflow-destruction-quickstart-20.png)
10.  从 **Content Browser** 拖出 **几何体集合（Geometry Collection）** 到关卡中，并将其移动到地面之上。
    
    -   点击 **播放模式（Play Mode）** 选项按钮，并选择 **模拟（Simulate）** 或 **所选视口（Selected Viewport）** 查看结果。
    
    ![点击模拟](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b926b426-78cb-4f66-bd90-b33af4a8933a/dataflow-destruction-quickstart-21.png)
11.  下方为几何体集合触地时的破裂效果展示。
    
    ![几何体集合触地时破裂](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03e22c47-7221-45fc-a3d5-68298b0b2e94/dataflow-destruction-quickstart-drop.gif)

### 阶段成果

在此分段中，你学习了如何通过创建数据流节点图表使几何体集合破裂。

在下一分段中，你将学习如何射击几何体集合来销毁它。

## 4 - 射击以销毁几何体集合

在本分段中，你将使用模板随附的 **第一人称步枪（First Person Rifle）** 蓝图，射击并销毁你创建的几何体集合。

你将修改发射物蓝图，以对几何体集合施加外部张力并触发破裂。

1.  在 **内容浏览器（Content Browser）** 中，转至 **第一人称（FirstPerson）> 蓝图（Blueprints）** 并将 **BP\_Pickup\_Rifle** 拖入关卡。在游戏过程中，你可以拾取步枪并使用鼠标左键射击。
    
    ![将BP_Pickup_Rifle拖入关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49f74437-8f6d-4f10-b11e-142569c11394/dataflow-destruction-quickstart-22.png)
2.  在同一个文件夹中，双击打开 **BP\_FirstPersonProjectile** 。在 **事件图表（Event Graph）** 中，选择除Event Hit外的所有节点并将它们 **删除** 。
    
    ![打开BP_FirstPersonProjectile蓝图并删除Event Hit外的所有节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4b22ddb-6fb8-498b-8e95-eeb28a31acd1/dataflow-destruction-quickstart-23.png)
3.  从 **Event Hit** 节点拖出 **其他组件（Other Comp）** 引脚，然后搜索并选择 **Cast to Geometry Collection Component** 。
    
    ![添加Cast to Geometry Collection Component节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6af2495f-8cfb-49ad-ac54-ed62442d19e6/dataflow-destruction-quickstart-24.png)
4.  从 **Geometry Collection Component** 节点拖出 **作为几何体集合机组件（As Geometry Collection Component）** 引脚，然后搜索并选择 **Apply External Strain** 。
    
    ![添加Apply External Strain节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc6cedef-1517-4aa8-9554-7cded35ccbb6/dataflow-destruction-quickstart-25.png)
5.  从 **Event Hit** 节点拖出 **Hit** 引脚，然后搜索并选择 **Break Hit** 。
    
    -   将 **Break Hit Result** 节点的 **位置（Location）** 引脚和 **命中项目（Hit Item）** 引脚连接至 **Apply External Strain** 节点的 **位置（Location）** 引脚和 **项目索引（Item Index）** 引脚。
    -   将 **半径（Radius）** 设为 **100** ，将 **传播深度（Propagation Depth）** 和 **传播系数（Propagation Factor）** 设为 **1** ，并将 **张力（Strain）** 设为 **50000** 。
    
    ![拆分命中结果并将位置和命中项目连接到Apply External Strain节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7cc7d22-2d47-435e-b4bb-30c05f18c0ae/dataflow-destruction-quickstart-26.png)
6.  从 **Apply External Strain** 节点拖出，然后搜索并选择 **Apply Linear Velocity** 。
    
    -   将 **Break Hit Result** 节点的 **命中项目（Hit Item）** 引脚连接至 **Apply Linear Velocity** 节点的 **项目索引（Item Index）** 引脚。
    
    ![添加Apply Linear Velocity节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/657cbb2b-548c-412c-857d-228d37020ee7/dataflow-destruction-quickstart-27.png)
7.  右键点击 **事件图表（Event Graph）** 然后搜索并选择 **Get Actor Forward Vector** 。
    
    -   从 **Get Actor Forward Vector** 节点拖出 **返回值（Return Value）** 引脚，然后搜索并选择 **Multiply** 。
    -   将 **Multiply** 节点连接到 **Apply Linear Velocity** 节点的 **线性速度（Linear Velocity）** 引脚。
    
    ![添加Get Actor Forward Vector节点和Multiply节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cca4716f-7b08-48aa-aa56-c49ce57a518f/dataflow-destruction-quickstart-28.png)
8.  创建 **浮点（Float）** 变量，然后将其命名为 **Linear Velocity** 。将它的 **默认值** 设置为 **500** 。
    
    ![创建浮点变量，命名为Linear Velocity并设值为500](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c3b7424-cdb3-49be-9d57-529bf01472b4/dataflow-destruction-quickstart-29.png)
9.  将 **Linear Velocity** 变量连接到 **Multiply** 节点。
    
    -   **编译（Compile）** 并 **保存（Save）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f49d4f4c-dcfb-4e28-b788-1e826e37746f/dataflow-destruction-quickstart-30.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f49d4f4c-dcfb-4e28-b788-1e826e37746f/dataflow-destruction-quickstart-30.png)
    
    点击查看大图。
    
10.  按下 **播放（Play）** 按钮，移动至步枪旁以拾取它。使用鼠标左键朝几何体集合中射击发射物并销毁它
    
    ![发射物在命中几何体集合时施加外部张力，并使其破裂](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa995b69-d797-448a-885b-a419e9dc4582/dataflow-destruction-quickstart-shoot.gif)

### 阶段成果

在本分段中，你学习了如何在发射物命中几何体集合时向其施加外部张力。

## 5 - 修改数据流图表

### 使另一个静态几何体破裂

你可以快速变更数据流使用的静态几何体，以查看其他网格体以相同方式破碎时的效果。

选择 **Static Mesh to Collection** 节点并更改 **资产（Asset）** 分段的 **静态网格体（Static Mesh）** 。

### 更改点模式

你可以将"Uniform Scatter Points"节点替换为其他模式，从而更改破裂节点使用的散布点模式。

### 更改破裂模式

你还可以替换数据流图表中使用的破裂节点，从而尝试不同的破裂模式。

### 阶段成果

在此分段中，你学习了如何通过更改数据流图表中的静态网格体、点模式或破裂模式来快速修改破裂的几何体集合。

## 5 - 自行尝试！

你已经学会了如何使用数据流生成和销毁几何体集合，请尝试使用不同的节点和参数，看看结果会如何变化。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1 - 必要设置](/documentation/zh-cn/unreal-engine/dataflow-for-destruction-quickstart#1-%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [阶段成果](/documentation/zh-cn/unreal-engine/dataflow-for-destruction-quickstart#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C)
-   [2 - 创建几何体集合](/documentation/zh-cn/unreal-engine/dataflow-for-destruction-quickstart#2-%E5%88%9B%E5%BB%BA%E5%87%A0%E4%BD%95%E4%BD%93%E9%9B%86%E5%90%88)
-   [阶段成果](/documentation/zh-cn/unreal-engine/dataflow-for-destruction-quickstart#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-2)
-   [3 - 使几何体集合破裂](/documentation/zh-cn/unreal-engine/dataflow-for-destruction-quickstart#3-%E4%BD%BF%E5%87%A0%E4%BD%95%E4%BD%93%E9%9B%86%E5%90%88%E7%A0%B4%E8%A3%82)
-   [阶段成果](/documentation/zh-cn/unreal-engine/dataflow-for-destruction-quickstart#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-3)
-   [4 - 射击以销毁几何体集合](/documentation/zh-cn/unreal-engine/dataflow-for-destruction-quickstart#4-%E5%B0%84%E5%87%BB%E4%BB%A5%E9%94%80%E6%AF%81%E5%87%A0%E4%BD%95%E4%BD%93%E9%9B%86%E5%90%88)
-   [阶段成果](/documentation/zh-cn/unreal-engine/dataflow-for-destruction-quickstart#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-4)
-   [5 - 修改数据流图表](/documentation/zh-cn/unreal-engine/dataflow-for-destruction-quickstart#5-%E4%BF%AE%E6%94%B9%E6%95%B0%E6%8D%AE%E6%B5%81%E5%9B%BE%E8%A1%A8)
-   [使另一个静态几何体破裂](/documentation/zh-cn/unreal-engine/dataflow-for-destruction-quickstart#%E4%BD%BF%E5%8F%A6%E4%B8%80%E4%B8%AA%E9%9D%99%E6%80%81%E5%87%A0%E4%BD%95%E4%BD%93%E7%A0%B4%E8%A3%82)
-   [更改点模式](/documentation/zh-cn/unreal-engine/dataflow-for-destruction-quickstart#%E6%9B%B4%E6%94%B9%E7%82%B9%E6%A8%A1%E5%BC%8F)
-   [更改破裂模式](/documentation/zh-cn/unreal-engine/dataflow-for-destruction-quickstart#%E6%9B%B4%E6%94%B9%E7%A0%B4%E8%A3%82%E6%A8%A1%E5%BC%8F)
-   [阶段成果](/documentation/zh-cn/unreal-engine/dataflow-for-destruction-quickstart#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-5)
-   [5 - 自行尝试！](/documentation/zh-cn/unreal-engine/dataflow-for-destruction-quickstart#5-%E8%87%AA%E8%A1%8C%E5%B0%9D%E8%AF%95%EF%BC%81)
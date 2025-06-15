# 自定义寻路区域和查询筛选器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-quick-start-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:43:02.284Z

---

目录

![自定义寻路区域和查询筛选器概述](https://dev.epicgames.com/community/api/documentation/image/e60ec797-6878-44f8-8e42-0f11b9391b90?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [自定义导航区域和查询筛选器准备指南](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-preparation-guide-in-unreal-engine)

## 概述

虚幻引擎的 **寻路系统** 允许代理使用 **寻路网格体** 来计算路径并在关卡中走动。

代理会比较寻路多边形的成本，确定到达目的地的最佳路线。如果多边形成本相等，则选择最短路径（通常是直线）。

你可以使用 **寻路修饰体积（Navigation Modifier Volumes）** 和 **寻路查询筛选器（Navigation Query Filters）** 来控制寻路三角形的成本。

寻路修饰体积会使用 **区域类（Area Classes）** 来确定体积内寻路的 **默认成本（Default Cost）** 乘数。区域类还定义了 **固定区域进入成本（Fixed Area Entering Cost）**，这是代理进入该区域时采用的初始成本。你可以根据需要创建任意数量的区域类来影响代理如何寻路关卡。

**寻路查询筛选器（Navigation Query Filters）** 包含有关一个或多个区域类的信息，如有需要，可以重载成本值。你可以根据需要创建任意数量的查询筛选器来进一步自定义代理如何寻路关卡。

## 目标

在本快速入门指南中，你将学习如何创建和使用自己的寻路区域和查询筛选器，从而影响不同的代理如何遍历同一寻路网格体以达到它们的目标。

## 目的

-   创建三个自定义区域类以便与寻路修饰体积一起使用。
    
-   创建供代理使用的两个寻路查询筛选器。
    

## 1 - 创建自定义区域类

1.  转到 **放置Actor（Place Actors）** 面板，搜索 **寻路修饰体积（Nav Modifier Volume）**。将 **寻路修饰体积（Nav Modifier Volume）** Actor 拖放到关卡中，放于地板网格体上。转到 **细节（Details）** 面板，将 **缩放（Scale）** 设置为 X = 2、Y= 6、Z = 1。
    
    ![Drag the Nav Modifier Volume Actor into your Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21b00d64-cd6a-4b4f-93ea-d930fd8d8763/custom-nav-mod-drag-1.png) ![Set the Scale to X = 2, Y = 6, Z = 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ede48489-294a-451a-b0e9-16aad72016d8/custom-nav-mod-drag-2.png)
2.  在 **内容侧滑菜单（Content Drawer）** 中，右键点击并在 **创建基本资产（Create Basic Asset）** 分段下选择 **蓝图类（Blueprint Class）**。
    
    ![Select Blueprint Class under the Create Basic Asset section](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9345b7c8-ab77-4e28-b13f-dccff833d5d2/blueprint-class-a.png)
3.  在 **选择父类（Pick Parent Class）** 窗口中，转到 **全部类（All Classes）** 分段，并展开箭头。搜索并选择 **寻路区域（Nav Area）。**点击 **选择（Select）** 并将蓝图命名为 **BP\_Area\_Neutral**。
    
    ![Go to the All Classes section and expand the arrow. Select Nav Area](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/492a0015-3237-43d1-9cb8-afcb5115be6b/custom-nav-area-create-1.png) ![Name the Blueprint BP_Area_Neutral](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38da9f57-6617-4972-987d-43badfe7eba2/custom-nav-area-create-2.png)
4.  重复前两个步骤两次，并将这些蓝图命名为 **BP\_Area\_Lane1** 和 **BP\_Area\_Lane2**。
    
5.  双击打开 **BP\_Area\_Lane1** 蓝图。你可以在体积内寻路时修改 **默认成本（Default Cost）** 乘数和 **固定区域进入成本（Fixed Area Entering Cost）**。对于此示例，保留默认值设置。
    
6.  点击 **绘制颜色（Draw Color）** 栏，并选择 **蓝** 色。**编译（Compile）** 并 **保存（Save）**。
    
    ![Click the Draw Color bar and select a blue color](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d4a22d7-d96e-4dc1-b5ec-8e730e314446/custom-nav-area-blue.png)
7.  对 **BP\_Area\_Lane2** 蓝图重复上一步，并将其 **绘制颜色（Draw Color）** 更改为 **红色**。
    
8.  在关卡中选择 **寻路修饰体积（Nav Modifier Volume）**，然后在 **细节（Details）** 面板中，点击 **区域类（Area Class）** 下拉菜单并选择 **BP\_Area\_Neutral**。
    
    ![Select BP_Area_Neutral from the dropdown](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a18e37cc-103d-4400-8d83-88c32ce89c74/custom-nav-mod-neutral.png) ![Notice how the area changes color in the Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/822f244d-84bd-4014-8819-32aa334b9756/custom-nav-mod-neutral-2.png)
9.  复制 **寻路修饰体积（Nav Modifier Volume）** 并按照上述步骤将 **区域类（Area Class）** 更改为 **BP\_Area\_Lane1**。将体积移到一侧以创建如下所示的通道。
    
    ![Duplicate the Nav Modifier Volume and follow the steps above to change the Area Class to BP_Area_Lane 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0cc1e848-b261-45c2-b4f3-9905787a0d4e/custom-nav-mod-lane-1.png)
10.  重复上一步以复制 **寻路修饰体积（Nav Modifier Volume）** 并将 **区域类（Area Class）** 设置为 **BP\_Area\_Lane2**。将体积移到一侧以创建如下所示的通道。
    
    ![Duplicate the Nav Modifier Volume and follow the steps above to change the Area Class to BP_Area_Lane 2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0dcf72cc-ee97-4640-ad21-1ee3ae231956/custom-nav-mod-lane-2.png)
11.  你现在可以试着更改每个 **区域类（Area Class）** 的值，以便影响代理到达目标点的路径。在下面的示例中，**BP\_Area\_Neutral** 和 **BP\_Area\_Lane1** 的 **默认成本（Default Cost）** 均设为4。
    
    ![In this example the Default Cost of BP_Area_Neutral and BP_Area_Lane 1 are both set to 4](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e83b1d25-2339-45bb-9eff-c9078729f4d9/custom-npc-walk-2.gif)
12.  在此示例中，**BP\_Area\_Neutral** 和 **BP\_Area\_Lane2** 的 **默认成本（Default Cost）** 均设为4。
    
    ![In this example the Default Cost of BP_Area_Neutral and BP_Area_Lane 2 are both set to 4](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e67537c3-2bfd-45f9-a794-774b68492b29/custom-npc-walk-3.gif)

### 阶段成果

在本节中，你创建了三个自定义 **区域类** 并将它们放置在了关卡中。你还更改了这些 **区域类** 的 **默认成本** 值，以便影响代理朝向其目标的寻路。

## 2 - 创建寻路查询筛选器

1.  在 **内容侧滑菜单（Content Drawer）** 中，右键点击并在 **创建基本资产（Create Basic Asset）** 分段下选择 **蓝图类（Blueprint Class）**。
    
    ![Select Blueprint Class under the Create Basic Asset section](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb392c02-3632-4198-9e18-bd6c2b8dcc82/blueprint-class-a.png)
2.  在 **选择父类（Pick Parent Class）** 窗口中，转到 **全部类（All Classes）** 分段，并展开箭头。搜索并选择 **寻路查询筛选器（Navigation Query Filter）**。**点击** 选择（Select） **并将蓝图命名为** BP\_QueryFilter1\*\*。
    
    ![Search for and select Navigation Query Filter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e18315d8-0938-4e2c-8df6-b49f82200d65/custom-filter-create-1.png) ![Name the Blueprint BP_QueryFilter 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58e3180e-4c39-4391-b768-680e8d8fccbc/custom-filter-create-2.png)
3.  双击打开 **BP\_QueryFilter1** 蓝图。点击 **区域（Areas）** 分段旁边的 **添加(+)（Add (+)）** 按钮将其展开。
    
    ![Click on the Add button next to the Areas section to expand it](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ede4109-d0e0-49f9-a373-50717e248200/custom-filter-filter-1a.png)
4.  点击 **区域类（Areas Class）** 旁边的下拉菜单，搜索并选择 **BP\_Area\_Neutral**。启用 **移动成本重载（Travel Cost Override）** 复选框，并输入100。
    
    ![Click the dropdown next to Area Class and search for and select BP_Area_Neutral](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d2f720f-9048-4262-b4fb-3b4a3c091194/custom-filter-filter-1b.png) ![Enable the Travel Cost Override checkbox and enter 100](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f4c3e6d-9cd7-472a-8f48-6afa15981ce7/custom-filter-filter-1c.png)
5.  重复上一步，将 **BP\_Area\_Lane1** 和 **BP\_Area\_Lane2** 添加到列表。对于 **BP\_Area\_Lane2**，启用 **移动成本重载（Travel Cost Override）** 复选框，并输入100。
    
    ![Repeat the previous step to add BP_Area_Lane 1 and BP_Area_Lane 2 to the list](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a9c8faf-411d-43d0-947c-d1cb66b7928c/custom-filter-filter-1d.png)
6.  在 **内容侧滑菜单（Content Drawer）** 中，右键点击 **BP\_QueryFilter1** 蓝图，并选择 **复制（Duplicate）**。
    
7.  双击打开 **BP\_QueryFilter2** 蓝图。对于区域类 **BP\_Area\_Lane1**，启用 **移动成本重载（Travel Cost Override）** 复选框，并将值设为100。对于区域类 **BP\_Area\_Lane2**，禁用 **移动成本重载（Travel Cost Override）** 复选框。
    
    ![Enable Travel Cost Override for BP_Area_Lane 1 and disable Travel Cost Override for BP_Area_Lane2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/423c03db-6564-4344-8ffa-62f4209bcd4e/custom-filter-filter-2.png)
8.  **编译（Compile）** 并 **保存（Save）** 蓝图。
    
9.  在关卡中选择 **BP\_NPC** 蓝图，然后在 **细节（Details）** 面板上，点击 **筛选器类（Filter Class）** 下拉菜单并选择 **BP\_QueryFilter1**。
    
    ![Click the Filter Class dropdown, then search for and select BP_QueryFilter 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a46b218-c715-43f5-bf1e-72f572827593/custom-npc-add-filter-1.png)
10.  点击 **模拟（Simulate）**，并观察代理现在如何使用 **寻路查询筛选器（Navigation Query Filter）** 来确定到达目的地的最佳路线。由于 **BP\_QueryFilter1** 将 **BP\_Area\_Lane1** 视为最便宜的路线，因此代理使用它到达球体。
    
    ![Since BP_QueryFilter 1 has the BP_Area_Lane 1 as the cheapest route, the Agent uses it to reach the Sphere](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd2aaa5a-c2a4-450f-88a2-139e0d8a9435/custom-npc-walk-3.gif)
11.  选择 **BP\_NPC** 蓝图，并将 **筛选器类（Filter Class）** 更改为 **BP\_QueryFilter2**。点击 **模拟（Simulate）**，并观察代理现在如何使用 **BP\_Area\_Lane2** 区域到达其目的地。
    
    ![The Agent now uses BP_Area_Lane 2  area to reach its destination](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a46bdfe0-226c-4848-a1bf-eabbf83521dd/custom-npc-walk-2.gif)

### 阶段成果

在本小节中，你创建了两个 **寻路查询筛选器**，并添加了前三个 **区域类**。你还更改了与 **区域类** 关联的成本值，以便在使用不同的 **寻路查询筛选器** 时修改代理的寻路。

-   [ai](https://dev.epicgames.com/community/search?query=ai)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-quick-start-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [目标](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-quick-start-in-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [目的](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-quick-start-in-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [1 - 创建自定义区域类](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-quick-start-in-unreal-engine#1-%E5%88%9B%E5%BB%BA%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8C%BA%E5%9F%9F%E7%B1%BB)
-   [阶段成果](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-quick-start-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C)
-   [2 - 创建寻路查询筛选器](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-quick-start-in-unreal-engine#2-%E5%88%9B%E5%BB%BA%E5%AF%BB%E8%B7%AF%E6%9F%A5%E8%AF%A2%E7%AD%9B%E9%80%89%E5%99%A8)
-   [阶段成果](/documentation/zh-cn/unreal-engine/custom-navigation-areas-and-query-filters-quick-start-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-2)
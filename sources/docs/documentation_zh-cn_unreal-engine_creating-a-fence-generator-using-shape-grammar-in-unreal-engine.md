# 在虚幻引擎中使用形状语法创建栅栏生成器。 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-a-fence-generator-using-shape-grammar-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:17:57.323Z

---

目录

![使用形状语法创建栅栏生成器](https://dev.epicgames.com/community/api/documentation/image/29688cb5-90bf-4869-8072-d4ef1d4720ac?resizing_type=fill&width=1920&height=335)

[形状语法](/documentation/zh-cn/unreal-engine/using-shape-grammar-with-pcg-in-unreal-engine)在虚幻引擎的[程序化内容生成框架](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview)中的常见用途就是构建系统。在本示例中，你将创建一个栅栏生成器。它可以使用语法沿样条线生成数个静态网格体，并在样条线控制点变动时随之修改网格体。

此示例使用Fab商城中的免费[私人栅栏包（含破损分段）](https://www.fab.com/listings/71f4143b-a429-4c8b-9ae6-8e03609cbaf4)资产包。但此示例可以使用你选择的任意静态网格体来创建。

## 先决条件

本操作指南所使用的术语和概念已在以下文档中有所讨论：

-   [程序化内容生成概述](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview)
-   [将形状语法用于PCG](/documentation/zh-cn/unreal-engine/using-shape-grammar-with-pcg-in-unreal-engine)

## 项目设置

1.  在虚幻引擎中[新建项目](/documentation/zh-cn/unreal-engine/creating-a-new-project-in-unreal-engine)。
2.  使用基础（Basic）关卡模板[新建关卡](/documentation/zh-cn/unreal-engine/working-with-levels-in-unreal-engine)。保存关卡。
3.  打开 **编辑（Edit） > 插件（Plugins）** 并确认激活了以下插件：
    1.  **Procedural Content Generation Framework (PCG)**
    2.  **Procedural Content Generation Framework (PCG) Geometry Script Interop**

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9f80588-abd3-4f87-8de7-0b6f769e45af/plugins.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9f80588-abd3-4f87-8de7-0b6f769e45af/plugins.png)

## 创建样条线

将PCG图表连接到一个PCG组件和一个样条线，它们包含在一个新的蓝图类中。创建蓝图类的步骤如下：

1.  在 **内容侧滑菜单** 或 **内容浏览器** 中点击右键，选择 **蓝图类（Blueprint Class**） 以创建一个新蓝图类。
2.  将新蓝图类命名为 **FenceSpline**。
3.  在 **组件（Components）** 选项卡中添加一个工具 **样条线** 和一个 **PCG** 组件。
4.  保存蓝图类。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0f2c923-4183-4142-81da-ed79cecc399e/spline-bp-class.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0f2c923-4183-4142-81da-ed79cecc399e/spline-bp-class.png)

## PCG图表资产

**PCG图表** 是栅栏生成器的基础，包含了用于沿样条线生成栅栏分段的指令。新建PCG图表资产的步骤如下：

1.  在 **内容侧滑菜单** 或 **内容浏览器** 中点击右键，找到 **PCG** 并选择 **PCG图表**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5958c66a-e491-4daa-8261-3c95a9639d2c/create-graph.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5958c66a-e491-4daa-8261-3c95a9639d2c/create-graph.png)
    
2.  将新资产命名为 **PCG\_FenceGen** 并按下 **回车键**。
3.  双击 **PCG\_FenceGen** 打开PCG图表编辑器。

## 创建PCG语法

语法以字符串的形式存储在图表参数中。由于将值存储在参数中，因此它可以通过 **参数重载（Parameter Overrides）** 来自定义关卡中每个栅栏生成器的实例。之后，**语法（Grammar）** 属性会被添加到样条线数据，并传递给 **Subdivide Spline** 节点，从而沿着样条线分配控制点。

1.  在 **PCG图表编辑器** 窗口中，将一个 **Get Spline Data** 添加到图表。
2.  点击屏幕上方的按钮，打开 **图表设置（Graph Settings）** 以新建一个 **参数（Parameter）**。将新参数命名为 **Grammar** 并将其类型改为 **字符串（String）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f53f3700-8397-4b8a-85b0-49a8ae8d9640/create-grammar-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f53f3700-8397-4b8a-85b0-49a8ae8d9640/create-grammar-1.png)
    
3.  将 **Grammar** 的初始值设置为 `A*`。这会让图表放置一个初始静态网格体，然后使用静态网格体填充样条线的剩余部分，直至填满所有空间。
4.  拖出 **Get Spline Data** 节点的输出引脚，创建一个 **Add Attribute** 节点。在细节面板中，将 **输出目标（Output Target）** 改为 `Grammar`。
5.  为 **Grammar** 参数创建隔一个"Get"节点，并将其连接到 **Add Attribute** 节点的 **Attributes** 输入。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2f7d591-688e-4e40-9c17-0b162c2ccabd/create-grammar-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2f7d591-688e-4e40-9c17-0b162c2ccabd/create-grammar-2.png)
    
6.  勾选 **接受不完整细分（Accept Incomplete Subdivision）** 复选框。
7.  勾选 **以语法为属性（Grammar as Attribute）** 复选框并将 **语法属性（Grammar Attribute）** 设为 `Grammar`。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b2ba7e7-e048-4866-a5c6-2cc4e433a409/create-grammar-3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b2ba7e7-e048-4866-a5c6-2cc4e433a409/create-grammar-3.png)
    

## 为语法分配网格体

你需要为语法中的每个符号都分配一个静态网格体，以便生成。这要用到两个参数：**模块信息（Module Info）** 和 **网格体信息（Mesh Info）**。模块信息包含一组符号。网格体信息包含一组静态网格体。此信息在稍后会以属性集的形式被传递到 **Subdivide Spline** 节点。

1.  选中 **Subdivide Spline** 节点，勾选 **以模块信息为输入（Module Info as Input）**。这会为属性添加一个输入，它被用于将模块信息分配给语法符号。
2.  在图表设置中新建一个参数，将其命名为Module Info。将其类型改为 **PCG细分子模块（PCG Subdivision Submodule）** 并点击类型旁的下拉菜单，选择 **数组（Array）**。它将保存我们的符号信息。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c436625-afeb-4042-845e-3c997aab9217/assign-grammar-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c436625-afeb-4042-845e-3c997aab9217/assign-grammar-1.png)
    
3.  点击 **+** 按钮，添加一个新的数组元素。再点击 **索引\[0\]（Index \[0\]）** 旁的箭头打开此条目。
4.  将 **符号（Symbol）** 值设置为 `A` 并勾选 **可缩放（Scalable）** 复选框。
5.  在图表设置中新建一个参数，将其命名为 **Mesh Info**。将其类型改为**静态网格体（Static Mesh）** 并点击类型旁的下拉菜单，选择 **数组（Array）**。它将保存我们的静态网格体信息。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d668ae3-524e-4135-bcbd-61fdde97216d/assign-grammar-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d668ae3-524e-4135-bcbd-61fdde97216d/assign-grammar-2.png)
    
6.  点击 **+** 按钮，在Mesh Info中添加一个新的数组元素。
7.  打开 **索引\[0\]（Index \[0\]）** 旁的下拉菜单，选择 **Fence\_17\_DE** 静态网格体。

## 创建提取信息子图表

细分过程会为每个模块分配一个尺寸，并在边界中心放置一个枢轴点。如果网格体在之后发生变化，或其枢轴点没有位于网格体中心，这就会造成问题。此子图表会直接从所选网格体的边界上提取尺寸信息，并调整其枢轴点，使其位于网格体中心。

### 设置Input节点

1.  在 **内容侧滑菜单** 或 **内容浏览器** 中新建一个 **PCG图表** 并将其命名为 **PCG\_ExtractInfo**。
2.  点击 **Input** 节点，在细节面板中打开 **引脚（Pins）** 选项。**打开索引\[0\]（Open Index \[0\]）** 并将 **标记（Label）** 改为 `Mesh Info`。
3.  将 **允许的类型（Allowed Types）** 选项改为 **点或参数（Point or Param）**。
4.  将 **引脚状态（Pin Status）** 选项改为 **普通（Normal）**。
5.  将 **说明文本（Tooltip）** 改为 `要提取信息的网格体列表（List of meshes to extract info from）`。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9067c60-a741-4c0d-983b-61543e39dd0b/subgraph-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9067c60-a741-4c0d-983b-61543e39dd0b/subgraph-1.png)
    

### 提取网格体边界

1.  打开 **图表设置**，新建一个参数，将其命名为 **Mesh Attribute Name**，并将类型改为 **名称（Name）**。将其初始值设置为 `Mesh`。
2.  拖出 **Input** 节点的输出引脚，创建一个 **Attribute Rename** 节点。
3.  在细节面板中，将 **New Attribute Name** 设置为 `Mesh`。
4.  创建一个 **Get Mesh Attribute Name** 节点，将其连接到 **Attribute Rename** 节点的 **Attribute to Rename** 输入。
5.  从 **Attribute Rename** 节点拖出引线，新建一个 **Bounds From Mesh** 节点。
6.  点击新节点，将网格体属性（Mesh Attribute）值设置为 `Mesh`。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6b45918-65cf-432d-b4ba-56a689cb2846/subgraph-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6b45918-65cf-432d-b4ba-56a689cb2846/subgraph-2.png)
    
7.  拖出 **Attribute Rename** 的输出引脚，将其连接到 **Bounds From Mesh** 节点的 **Attribute** 输入。图表会自动创建一个筛选器来创建恰当的输入。
8.  按住 **ALT** 键并点击新筛选器节点的输出引脚，断开其连接。
9.  从断开的筛选器节点拖出引线，创建一个 **Attribute Set To Point** 节点。将该节点的输出连接到 **Bounds From Mesh** 的输入。这可以让图表同时支持点和属性集数据类型。
10.  点击"Bounds From Mesh"节点，将 **网格体属性（Mesh Attribute）** 选项设为 `Mesh`。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bc7a748-a7e1-47f9-ba29-3819aa0a375a/subgraph-3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bc7a748-a7e1-47f9-ba29-3819aa0a375a/subgraph-3.png)
    

### 调整枢轴点

1.  静态网格体上的枢轴点需要调整，才能在样条线上正确显示。首先，从 **Bounds From Mesh** 拖出引线，创建 **Multiply** 节点。
2.  点击新节点，将 **Input Source 1** 的值设置为 `$Extents.X`。这会从边界数据中提取X的范围。
3.  从 **In B** 输入拖出引线，创建 **Create Attribute** 节点。将 **Double Value** 改为 `2.0`。
4.  再次点击 **Multiply** 节点，将 **Output Target** 值更改为 `Size`。这将输出X值乘2后的结果，并将其存储在名为Size的属性中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e288454b-a704-4d6b-810e-87bb677cf971/subgraph-4.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e288454b-a704-4d6b-810e-87bb677cf971/subgraph-4.png)
    
5.  从 **Multiply** 节点拖出引线，创建 **Copy Attributes** 节点。再从 **Multiply** 的输出拖出引线，将其连接到新节点的 **Source** 输入。此节点会从边界数据中提取X的范围，并将其存储在属性中以备在将来有需求时帮助进行缩放。
6.  点击 **Copy Attributes**，将 **Input Source** 设为 `$Extents.Z`。
7.  将 **Output Target** 设为 `ExtentsZ`。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/405b0c7a-1fab-4527-a08a-54db08612104/subgraph-5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/405b0c7a-1fab-4527-a08a-54db08612104/subgraph-5.png)
    
8.  从 **Copy Attributes** 的输出拖出引线，再创建一个 **Multiply** 节点。此节点将帮助把枢轴点移动到网格体的中心。
9.  从 **In B** 输入拖出引线，创建 **Create Attribute** 节点，将 **Double Value** 改为 `-1.0`。
10.  再次点击 **Multiply** 节点。在细节面板中将 **Input Source 1** 的值设为 `$LocalCenter`。
11.  将 **Output Target** 的值设为 `PivotOffset`。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f255c72d-ad07-40dc-80d3-22316f612ff9/subgraph-6.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f255c72d-ad07-40dc-80d3-22316f612ff9/subgraph-6.png)
    

### 设置Output节点

1.  点击 **Output** 节点，将其放在图表的末端。
2.  在细节面板中打开 **引脚（Pins）** 选项。**打开索引\[0\]（Open Index \[0\]）** 并将 **允许的类型（Allowed Types）** 改为 **属性集（Attribute Set）**。
3.  将 **引脚状态（Pin Status）** 选项改为 **普通（Normal）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71174628-24a5-4853-980f-c16c2cf8936f/subgraph-7.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71174628-24a5-4853-980f-c16c2cf8936f/subgraph-7.png)
    
4.  从 **Multiply** 节点的输出拖出引线，新建一个 **Point to Attribute Set** 节点。
5.  将新节点的输出连接到 **Output** 节点的 **Out** 引脚。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dac948a7-52ed-40d7-b251-aab2b4ee4e42/subgraph-8.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dac948a7-52ed-40d7-b251-aab2b4ee4e42/subgraph-8.png)
    
6.  保存完成的图表。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95133076-d61d-461c-af39-23833408ad5d/subgraph-done.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95133076-d61d-461c-af39-23833408ad5d/subgraph-done.png)
    
7.  回到 **PCG\_FenceGen** 图表编辑器窗口。将你的 **PCG\_ExtractInfo** 图表资产从 **内容侧滑菜单** 或 **内容浏览器** 拖放到视口中，并选择 **创建PCG\_ExtractInfo子图表节点**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b8c1ecb-7c73-4524-86d3-f0863fefc41d/subgraph-add.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b8c1ecb-7c73-4524-86d3-f0863fefc41d/subgraph-add.png)
    

## 应用模块和网格体信息

1.  返回 **PCG\_FenceGen** 图表，创建一个 **Add Attribute** 节点，并将其放在 **Subdivide Spline** 节点附近。
2.  创建一个 **Get Module Info** 节点，将其连接到 **Add Attribute** 节点的 **In**。
3.  创建一个 **Get Mesh Info** 节点，将其连接到 **Add Attribute** 的 **Attributes** 输入。
4.  将 **Add Attribute** 的 **Out** 连接到 **PCG\_ExtractInfo** 子图表节点的 **Mesh Info** 输入。
5.  将子图表节点的输出连接到 **Subdivide Spline** 节点的 **Modules Info** 输入。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b2f058b-c143-4f62-9bdc-2bc09295da3f/spawn-meshes-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b2f058b-c143-4f62-9bdc-2bc09295da3f/spawn-meshes-1.png)
    
6.  从 **Subdivide Spline** 节点的输出拖出引线，创建一个 **Match and Set Attributes** 节点。将子图表节点的输出连接到其 **Match Data** 输入。此节点会接收来自 **Subdivide Spline** 的点数据和语法，并将其与来自那些参数的 **模块信息（Module Info）** 和**网格体信息（Mesh Info）** 进行对比。
7.  点击"Match and Set Attributes" 节点并对以下选项进行设置：
    
    1.  点击 **匹配属性（Match Attributes）** 旁的复选框。
    2.  将 **输入属性（Input Attribute）** 和 **匹配属性（Match Attributes）** 的值设为 `Symbol`。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0725acd-d85d-4270-a3fb-04a865d29cc3/spawn-meshes-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0725acd-d85d-4270-a3fb-04a865d29cc3/spawn-meshes-2.png)
    

## 应用枢轴偏移变换

1.  从 **Match and Set Attribute** 节点的输出拖出引线，创建一个 **Multiply** 节点。此节点会使用来自 **PCG\_ExtractInfo** 子图表的数据缩放每一个网格体的枢轴。
2.  从 **Match and Set Attribute** 节点的输出拖出引线，将其连接到 **Multiply** 节点的 **In B** 输入。
3.  点击 **Multiply** 节点，将 **Input Source 1** 的值设为 `PivotOffset`，**Input Source 2** 的值设为 `$Scale`。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56804d43-965d-48e2-acf7-b911b3824c8d/spawn-meshes-3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56804d43-965d-48e2-acf7-b911b3824c8d/spawn-meshes-3.png)
    
4.  从 **Multiply** 节点拖出引线，创建一个 **Vector: Transform Direction** 节点。此节点会旋转枢轴，以匹配样条线上的点。
5.  从 **Multiply** 节点的输出拖出引线，连接到 **Vector: Transform Direction** 节点的 **Transform** 输入。
6.  点击新节点，将 **操作（Operation）** 设为 **变换方向（Transform Direction）**。
7.  将 **Input Source 1** 值设为 `PivotOffset`，**Input Source 2** 值设为 `$Transform`。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f55f98f2-bd7f-47b6-874b-1469c93a686e/spawn-meshes-4.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f55f98f2-bd7f-47b6-874b-1469c93a686e/spawn-meshes-4.png)
    
8.  从 **Vector: Transform Direction** 节点拖出引线，新建一个 **Add** 节点。此节点会将最终枢轴偏移加到网格体枢轴的位置上。
9.  从 **Vector: Transform Direction** 的输出拖出引线，连接到 **Add** 节点的 **In B** 输入。
10.  将 **Input Source 1** 值设为 `$Position`，**Input Source 2** 值设为 `PivotOffset`.
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3d7a06b-f2d0-416a-b57d-147b51683369/spawn-meshes-5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3d7a06b-f2d0-416a-b57d-147b51683369/spawn-meshes-5.png)
    

## 生成静态网格体

1.  从 **Add** 节点的输出拖出引线，新建一个 **Static Mesh Spawner** 节点。此节点将沿样条线生成静态网格体。
2.  在细节面板中，将 **网格体选择器类型（Mesh Selector Type）** 设为 **PCGMeshSelectorByAttribute**。
3.  将 **属性名称（Attribute Name）** 值设为 `Mesh`。
4.  保存图表。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d840955a-a39a-4c6b-bd60-2ad349526406/spawn-meshes-6.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d840955a-a39a-4c6b-bd60-2ad349526406/spawn-meshes-6.png)
    
5.  点击关卡中的 **FenceSpline** Actor。在细节面中，选择 **PCG** 组件并使用下拉菜单将 **图表（Graph）** 选项设为 **PCG\_FenceGen**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f3de2a4-dccf-4353-a921-57e00a6a0a16/spawn-meshes-done.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f3de2a4-dccf-4353-a921-57e00a6a0a16/spawn-meshes-done.png)
    

## 结果

你应该会看到一系列栅栏静态网格体按着样条线的长度方向生成出来。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8f0506b-88f6-4a02-be37-4d30e239bda5/example.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8f0506b-88f6-4a02-be37-4d30e239bda5/example.png)

你还可以为语法添加符号，在模块信息（Modules Info）中定义它们，并在网格体信息（Meshes Info）中为它们分配静态网格体，从而提升静态网格体的多样性。这可以在图表中进行，也可以使用 **参数重载（Parameter Overrides）** 在实例上逐个进行。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/508aac0b-3111-4c0e-bfad-46c0743e07e7/parameter-overrides.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/508aac0b-3111-4c0e-bfad-46c0743e07e7/parameter-overrides.png)

在下面的示例中，栅栏行还具有以下特征：

-   柱子使用符号 `P`。
-   门使用符号 `G`。
-   带大破损的分段使用符号 `BL`。
-   带小破损的分段使用符号 `BS`。

其语法也随之更新为：`{[A,P]:2,[BL,P]:1,[BS,P]:1}*,[G,P], {[A,P]:2,[BL,P]:1,[BS,P]:1}*`。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d564bbbe-5567-44d3-b1a6-2368835bcb76/updated-example.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d564bbbe-5567-44d3-b1a6-2368835bcb76/updated-example.png)

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [procedural generation](https://dev.epicgames.com/community/search?query=procedural%20generation)
-   [grammar](https://dev.epicgames.com/community/search?query=grammar)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/creating-a-fence-generator-using-shape-grammar-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [项目设置](/documentation/zh-cn/unreal-engine/creating-a-fence-generator-using-shape-grammar-in-unreal-engine#%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [创建样条线](/documentation/zh-cn/unreal-engine/creating-a-fence-generator-using-shape-grammar-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%A0%B7%E6%9D%A1%E7%BA%BF)
-   [PCG图表资产](/documentation/zh-cn/unreal-engine/creating-a-fence-generator-using-shape-grammar-in-unreal-engine#pcg%E5%9B%BE%E8%A1%A8%E8%B5%84%E4%BA%A7)
-   [创建PCG语法](/documentation/zh-cn/unreal-engine/creating-a-fence-generator-using-shape-grammar-in-unreal-engine#%E5%88%9B%E5%BB%BApcg%E8%AF%AD%E6%B3%95)
-   [为语法分配网格体](/documentation/zh-cn/unreal-engine/creating-a-fence-generator-using-shape-grammar-in-unreal-engine#%E4%B8%BA%E8%AF%AD%E6%B3%95%E5%88%86%E9%85%8D%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [创建提取信息子图表](/documentation/zh-cn/unreal-engine/creating-a-fence-generator-using-shape-grammar-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%8F%90%E5%8F%96%E4%BF%A1%E6%81%AF%E5%AD%90%E5%9B%BE%E8%A1%A8)
-   [设置Input节点](/documentation/zh-cn/unreal-engine/creating-a-fence-generator-using-shape-grammar-in-unreal-engine#%E8%AE%BE%E7%BD%AEinput%E8%8A%82%E7%82%B9)
-   [提取网格体边界](/documentation/zh-cn/unreal-engine/creating-a-fence-generator-using-shape-grammar-in-unreal-engine#%E6%8F%90%E5%8F%96%E7%BD%91%E6%A0%BC%E4%BD%93%E8%BE%B9%E7%95%8C)
-   [调整枢轴点](/documentation/zh-cn/unreal-engine/creating-a-fence-generator-using-shape-grammar-in-unreal-engine#%E8%B0%83%E6%95%B4%E6%9E%A2%E8%BD%B4%E7%82%B9)
-   [设置Output节点](/documentation/zh-cn/unreal-engine/creating-a-fence-generator-using-shape-grammar-in-unreal-engine#%E8%AE%BE%E7%BD%AEoutput%E8%8A%82%E7%82%B9)
-   [应用模块和网格体信息](/documentation/zh-cn/unreal-engine/creating-a-fence-generator-using-shape-grammar-in-unreal-engine#%E5%BA%94%E7%94%A8%E6%A8%A1%E5%9D%97%E5%92%8C%E7%BD%91%E6%A0%BC%E4%BD%93%E4%BF%A1%E6%81%AF)
-   [应用枢轴偏移变换](/documentation/zh-cn/unreal-engine/creating-a-fence-generator-using-shape-grammar-in-unreal-engine#%E5%BA%94%E7%94%A8%E6%9E%A2%E8%BD%B4%E5%81%8F%E7%A7%BB%E5%8F%98%E6%8D%A2)
-   [生成静态网格体](/documentation/zh-cn/unreal-engine/creating-a-fence-generator-using-shape-grammar-in-unreal-engine#%E7%94%9F%E6%88%90%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [结果](/documentation/zh-cn/unreal-engine/creating-a-fence-generator-using-shape-grammar-in-unreal-engine#%E7%BB%93%E6%9E%9C)
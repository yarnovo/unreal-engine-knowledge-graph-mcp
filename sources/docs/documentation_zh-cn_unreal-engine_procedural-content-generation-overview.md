# 程序化内容生成概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/procedural-content-generation-overview
> 
> 生成时间: 2025-06-14T19:17:36.053Z

---

目录

![程序化内容生成概述](https://dev.epicgames.com/community/api/documentation/image/e4f39eee-62dc-4867-9fec-3edc6f22f8da?resizing_type=fill&width=1920&height=335)

**程序化内容生成框架（PCG）**是用于在虚幻引擎中创建你自己的程序化内容和工具的工具集。 借助PCG，技术美术师、设计师和程序员能够构建任意复杂度的快速迭代式工具和内容，从资产工具（如建筑物或群系生成等）到整个世界，不一而足。

[![高级PCG森林](https://dev.epicgames.com/community/api/documentation/image/0dc1090e-f209-4662-a1da-1f9184f6fa9c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/0dc1090e-f209-4662-a1da-1f9184f6fa9c?resizing_type=fit)

高级PCG森林

## 重要概念和术语

-   **点（Points）**：3D空间中的坐标点，由PCG图表生成，常用于生成网格体。 点包含变换、边界、颜色、密度、陡度和种子等信息。 可以为它们分配由用户自定义的属性值。
    
-   **点密度（Point Density）**：各种图表节点使用的值。 在调试视图中表示为每个点上的梯度，代表该点存在于该位置的概率。 例如密度0为黑色，密度1为白色。
    

## 必要设置

程序化内容生成框架要求你在项目中启用**程序化内容生成框架（Procedural Content Generation Framework）**插件。 如需详细了解如何启用插件，请参阅[使用插件](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)。

要在静态网格体上对点取样，需要用到**程序化内容生成框架几何体脚本交互（Procedural Content Generation Framework Geometry Script Interop）**插件。

## 程序化节点图表

程序化节点图表是程序化内容生成框架的核心部分。

[![PCG图表编辑器](https://dev.epicgames.com/community/api/documentation/image/5db23eb4-4165-4ef5-a746-8e6019a0e364?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/5db23eb4-4165-4ef5-a746-8e6019a0e364?resizing_type=fit)

点击查看大图。

和材质编辑器类似，空间数据被传入关卡中的PCG组件中的图表，然后生成点。 然后，点会经过一系列节点的筛选和修改，并输出实时更新的结果。 生成的点可用于生成各种资产。

### 创建PCG图表资产

要创建PCG图表资产，请执行下面的步骤：

1.  右键点击**内容侧滑菜单（Content Drawer）**或**内容浏览器（Content Browser）**，找到**创建的高级资产（Create Advanced Asset）> PCG**，并选择**PCG图表（PCG Graph）**。
    
2.  选择新资产的名称，然后按**Enter**键。
    

### PCG图表模版

创建PCG图表后，你可以将图表标记为模板。当你创建新图表时，就可以在上下文菜单中选择该模板。 与[Niagara模板](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine)类似，你可以使用PCG图表模板加快工作流程，而不是用空白图表从头开始。

#### 将PCG图表设为模版

要将PCG图表定义为模板，请打开该图表并执行以下步骤：

1.  在工具栏中，点击**图表设置（Graph Settings）**按钮，从而在细节面板中填充图表的设置。
    
2.  找到细节面板的"资产信息（Asset Info）"分段，并启用"Is Template"属性。
    

[![Is Template属性](https://dev.epicgames.com/community/api/documentation/image/964cf9a6-7b52-4b36-9f42-76c94d829e55?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/964cf9a6-7b52-4b36-9f42-76c94d829e55?resizing_type=fit)

Is Template属性

这时你的图表就被定义为了模板图表。

#### 使用模版新建图表

在创建新图表并选择了资产名称和位置之后，你现在就可以在**从模板创建图表（Create Graph From Template）**窗口中选择一个图表模板。 选择要使用的图表模板，然后点击**从模板初始化（Initialize From Template）**按钮，即可使用该模板创建一个新图表。

[![从资产选择菜单选择模版](https://dev.epicgames.com/community/api/documentation/image/ede619a3-92d8-4b30-a088-12069760338f?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ede619a3-92d8-4b30-a088-12069760338f?resizing_type=fit)

从资产选择菜单选择模版

若要在创建新PCG图表时禁用模板提示，请在菜单栏中找到**编辑（Edit）** > **编辑器偏好设置（Editor Preferences）**。 然后使用搜索栏或找到**PCG编辑器**的属性分段，并禁用**新图表**属性的**显示模板选取器（Show Template Picker）**选项。

[![禁用模版提示属性](https://dev.epicgames.com/community/api/documentation/image/19575057-a209-41a0-a939-6e1b29beb1ee?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/19575057-a209-41a0-a939-6e1b29beb1ee?resizing_type=fit)

禁用模版提示属性

禁用此属性后，当你新建PCG图表时，**从模板创建图表（Create Graph From Template）**窗口将不再出现。

### 编辑PCG图表

在PCG图表编辑器中，你可以配置并编辑PCG图表资产。 该编辑器的操作方式与蓝图或材质编辑器相似。 它还包含一些只有PCG才有的工具和面板。

[![PCG图表示意图](https://dev.epicgames.com/community/api/documentation/image/a78988c8-5986-4bc1-9fdf-1568508699de?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/a78988c8-5986-4bc1-9fdf-1568508699de?resizing_type=fit)

PCG图表示意图

编号

说明

**1**

工具栏

**2**

节点控制板

**3**

视口

**4**

细节面板

**5**

调试树

**6**

特性列表

你可以像使用蓝图那样将节点添加到图表中，方法是从节点控制板将其拖入视口中，或通过右键菜单添加。

当PCG图表被指定到PCG组件并且已用于生成内容时，对该图表所做的更改会在编辑器视口中实时更新。

### PCG节点

PCG图表由一系列PCG节点构成，每个节点执行对最终结果有贡献的操作。

[![PCG节点控制板](https://dev.epicgames.com/community/api/documentation/image/a3a280ba-3141-4e70-8f53-a293b09c75f2?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/a3a280ba-3141-4e70-8f53-a293b09c75f2?resizing_type=fit)

点击查看大图。

  

这些节点划分为以下类别：

类别

说明

**蓝图（Blueprint）**

包含与蓝图相关的节点。 这包括用于执行从**PCGBlueprintElement**派生的用户蓝图的通用节点。

**控制流程（Control Flow）**

包含负责控制图表中逻辑流程的节点。

**调试（Debug）**

包含帮助调试的节点。

**密度（Density）**

包含影响点密度的节点。

**筛选器（Filter）**

包含基于条件或按点筛选数据的节点。

**通用（Generic）**

包含影响数据的节点（空间数据除外）。

**层级化生成（Hierarchical Generation）**

包含负责控制[层级化生成](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-pcg-generation-modes-in-unreal-engine?application_version=5.5)模式的节点。

**输入输出（Input Output）**

包含负责加载[Alembic](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/alembic-file-importer-in-unreal-engine)及其他外部数据的节点。

**IO**

包含能控制与外部数据交互的节点。

**元数据（Metadata）**

包含与属性交互的节点，无论是点上还是属性集上的属性。

**参数（Param）**

包含能控制如何从Actor或蓝图变量检索参数的节点。

**点运算（Point Ops）**

包含影响点以及点属性的节点。

**取样器（Sampler）**

包含从空间数据源（例如体积、表面和网格体）生成点的节点。

**空间（Spatial）**

包含能在数据之间创建空间关系、更改其内部空间数据或检索数据的节点。

**生成器（Spawner）**

包含在给定点位置创建新数据或放置Actor的节点。

**子图表（Subgraph）**

包含能处理子图表用法的节点。

你可以像使用蓝图那样添加**注释（Comments）**和**重路由节点（Reroute Nodes）**，使图表更易于辨识。

### 属性和元数据

属性类似于变量，存储由其名称和类型定义的数据。 属性分为两类：

-   **静态特性**：固定且始终存在的特性。 这类特性以`$`开头，如`$Position`。
    
-   **动态特性**：在运行时创建的特性，并作为图表数据**元数据**的一部分存储。
    

### 属性选择器

某些PCG图标节点可以通过属性选择在静态和动态属性建提供互操作性。

[![PCG特性选择器](https://dev.epicgames.com/community/api/documentation/image/827f1687-9567-4ee2-8275-d6f9d06f6d2b?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/827f1687-9567-4ee2-8275-d6f9d06f6d2b?resizing_type=fit)

点击查看大图。

  

属性选择器提供了一份属性列表，可以于所选的节点配合使用。 属性选择器使用以下命名规则：

-   以$开头的名称为静态特性，反之则是动态特性。
    
-   `@Last`表示被前一个节点操作过的最后一个动态特性。
    

例如，Math节点被用于在静态和动态属性上执行数学运算：

[![PCG数学节点](https://dev.epicgames.com/community/api/documentation/image/9be5250a-9a56-4808-a793-20e4b7514ad3?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9be5250a-9a56-4808-a793-20e4b7514ad3?resizing_type=fit)

*点击查看大图。*

属性选择器的名称字段也被用于从组件中提取数据：

[![PCG数学示例](https://dev.epicgames.com/community/api/documentation/image/b06a65aa-1e27-414f-bfd2-2c4761372e44?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/b06a65aa-1e27-414f-bfd2-2c4761372e44?resizing_type=fit)

点击查看大图。

上图中的`$Position.ZYX`提供了$Position组件的反转。 下表列出了能够以这种方式操作的组件及其类型：

组件（Component）

类型

**向量（Vectors）**

X、Y、Z、W、x、y、z、w

双精度浮点。 不能与RGBA混合。

R、G、B、A、r、g、b、a

双精度浮点。 不能与XYZW混合。

长度，尺寸（Length, Size）

双精度浮点。 返回向量长度。

**变换（Transforms）**

位置，方位（Location, Position）

Vector3

缩放，缩放3D（Scale, Scale3D）

Vector3

旋转

四元数

**旋转体（Rotators）**

俯仰、偏航、滚转（Pitch, Yaw, Roll）

双精度浮点

向前、向右、向上（Forward, Right, Up）

Vector3

**四元数（Quaternions）**

支持向量提取器（Support Vector extractor）

向量

支持旋转器提取器（Support Rotator extractor）

旋转器

### C++设置重载

有些设置在C++属性元数据中被标记为PCG\_Overridable。 对于蓝图节点，那些可见且实例可编辑的变量是可以被重载的。

被重载后，自动添加到节点的引脚属于高级引脚。 引脚分为两类：

-   **全局重载**：可接受任意数量的特性，并重载所有与设置名称完全匹配的特性的所有设置。
    
-   **单独重载**：可接受任意数量的特性，并在发现某个特性与设置名称完全匹配时（如只有一个特性，则无视名称）重载其指定设置。
    

属性类型必须匹配，但某些属性类型可以转换。

要了解确切的属性名称或类型，请查看重载引脚上的提示信息：

[![PCG设置项重载](https://dev.epicgames.com/community/api/documentation/image/5078894b-b3d6-45f5-82f4-0bf0f94cb35e?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/5078894b-b3d6-45f5-82f4-0bf0f94cb35e?resizing_type=fit)

点击查看大图。

### 图表参数

与材质编辑器中的参数类似，PCG图表参数是由用户创建的可重载值，这有助于为各类情况创建可自定义的图表。 创建新参数的方法是：

[![PCG图表参数](https://dev.epicgames.com/community/api/documentation/image/020392af-805f-41ed-bdab-ce2fcea0cc7d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/020392af-805f-41ed-bdab-ce2fcea0cc7d?resizing_type=fit)

点击查看大图。

1.  打开PCG图标设置。
    
2.  点击属性（Parameters）字段旁的 + 按钮。 这样即可创建新参数。
    
3.  点击下拉箭头以转到新参数。 将其重命名并选择类型。
    

在PCG图表中修改参数值的方法如下：

[![PCG图表参数细节重载](https://dev.epicgames.com/community/api/documentation/image/0dccb4d9-6c03-422c-b9c6-560e87ac41ec?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/0dccb4d9-6c03-422c-b9c6-560e87ac41ec?resizing_type=fit)

点击查看大图。

你可以在图表参数中修改值，也可以在PCG资产的细节面板中修改值。

在PCG图表示例上修改参数值的方法如下：

[![PCG图表参数重载](https://dev.epicgames.com/community/api/documentation/image/a21f9673-0f96-4c09-8b68-481ce30d4261?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/a21f9673-0f96-4c09-8b68-481ce30d4261?resizing_type=fit)

点击查看大图。

在内容浏览器中打开资产，修改其值，或在PCG资产的细节面板中修改。

### 图表实例

PCG图表实例的工作原理类似于材质实例，利用图表参数帮助你以实例或PCG子图表的形式复用现偶的图表：

[![PCG创建实例图表](https://dev.epicgames.com/community/api/documentation/image/91322e3e-2691-49b4-a348-5071bd8340e4?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/91322e3e-2691-49b4-a348-5071bd8340e4?resizing_type=fit)

点击查看大图。

创建PCG图表实例的方法是：

1.  选择关卡中的一个PCG资产。
    
2.  在细节面板中选择PCG组件。
    
3.  点击**保存实例（Save Instance）**按钮以新建一个实例。
    
4.  为新图表实例命名并按下**Enter**键。
    

在将实例作为PCG子图表使用时，可以使用子图表节点上的重载引脚重载参数。

[![PCG子图表重载](https://dev.epicgames.com/community/api/documentation/image/2159d04f-b68c-4c15-a5b3-02709945213d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/2159d04f-b68c-4c15-a5b3-02709945213d?resizing_type=fit)

*点击查看大图。*

## PCG组件

程序化节点图表可以通过PCG组件对你的关卡取样。 此组件可保存程序化节点图表的实例，并在编辑器中以及在运行时管理程序化内容的生成。 PCG组件添加为Actor的组件，或用作PCG体积的一部分，这是一种基本体积，适合用于快速设置程序化内容。

[![PCG组件](https://dev.epicgames.com/community/api/documentation/image/0930f463-ca17-41a0-a91e-b5611a257da0?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/0930f463-ca17-41a0-a91e-b5611a257da0?resizing_type=fit)

点击查看大图。

要将PCG图表连接到PCG组件，请执行下面的步骤：

1.  在编辑器视口或**大纲视图（Outliner）**中，选择你想连接的**PCG体积（PCG Volume）**或**蓝图类（Blueprint Class）**。
    
2.  在**细节（Details）**面板中，点击**PCG组件（PCG Component）**。
    
    [![PCG组件](https://dev.epicgames.com/community/api/documentation/image/5e8d1642-a21b-4ffc-ae7c-09c0641ee968?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/5e8d1642-a21b-4ffc-ae7c-09c0641ee968?resizing_type=fit)
    
    点击查看大图。
    
3.  点击**图表（Graph）**下拉菜单，并选择你想使用的PCG节点图表。
    
    [![添加PCG图表](https://dev.epicgames.com/community/api/documentation/image/d38e5a01-c122-4e07-9033-243f8ca40cf2?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/d38e5a01-c122-4e07-9033-243f8ca40cf2?resizing_type=fit)
    
    添加PCG图表
    
4.  点击**生成（Generate）**按钮以查看结果。
    
    [![点击"生成"按钮](https://dev.epicgames.com/community/api/documentation/image/9b09344b-8b6a-4751-94fb-c05ff3756873?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9b09344b-8b6a-4751-94fb-c05ff3756873?resizing_type=fit)
    
    点击"生成"按钮
    

## World Partition Support

When PCG assets are assigned to a [World Partition - Data Layer](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/world-partition---data-layers-in-unreal-engine) and an [HLOD Layer](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/world-partition---hierarchical-level-of-detail-in-unreal-engine), the PCG graph generates the actors and assigns them to the same data layer and the same HLOD layer.

For more information about using PCG with World Partition, see Using PCG with World Partition.

## 在PCG中调试

调试是PCG工作流程中的基本部分。

每个节点都有各种调试选项，可用于直观地显示PCG图表每个步骤中的点数据：

-   调试渲染
    
-   启用/禁用节点
    
-   检查
    

在节点的**细节（Details）**面板中选中**调试（Debug）**复选框或按**D**键，即可开关各节点的调试渲染。

[![PCG调试](https://dev.epicgames.com/community/api/documentation/image/b06c0737-cf9a-420d-9712-5c16f6cf826e?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/b06c0737-cf9a-420d-9712-5c16f6cf826e?resizing_type=fit)

PCG调试

在节点的**细节（Details）**面板中选中**启用（Enabled）**复选框或按**E**键，即可打开和关闭各个节点。

[![PCG节点禁用](https://dev.epicgames.com/community/api/documentation/image/1d6ad651-0245-4b9a-ba9e-f67257d1b1d7?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1d6ad651-0245-4b9a-ba9e-f67257d1b1d7?resizing_type=fit)

点击查看大图。

你还可以检查节点，以此在**特性（Attributes）**列表中显示某个节点所生成的所有点。

[![PCG特性列表](https://dev.epicgames.com/community/api/documentation/image/ead36f31-e32e-4b48-9b2e-f9f30d832360?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ead36f31-e32e-4b48-9b2e-f9f30d832360?resizing_type=fit)

点击查看大图。

1.  从调试树（Debug Tree）选择PCG组件。
    
2.  右键点击要检查的节点。
    
3.  选择检查（Inspect）。 你也可以按A键。
    

## 创建简单森林体积

程序化生成工具的常见用例是开放世界环境中的群系生成。

[![PCG森林体积](https://dev.epicgames.com/community/api/documentation/image/3eb894b3-0bd9-45f4-96c4-a22d3bc9c1fb?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/3eb894b3-0bd9-45f4-96c4-a22d3bc9c1fb?resizing_type=fit)

PCG森林体积

要创建基本森林群系生成器，请执行下面的步骤。

此示例使用的材质和静态网格体来自使用Fab下载的[Megascans树木资产包：欧洲鹅耳枥](https://www.fab.com/listings/c6f917b6-ffcb-4b86-9d9f-5274ba7f6a8e)集合。

### 创建关卡

1.  在虚幻引擎中[新建项目](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-a-new-project-in-unreal-engine)。
    
2.  使用**基本（Basic）**关卡模板[创建新关卡](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/working-with-levels-in-unreal-engine)。 保存关卡。
    
3.  删除**地板（Floor）**静态网格体，然后使用地形模式为关卡[添加新地形](building-virtual-worlds/landscape-outdoor-terrain/creating-landscapes)。
    
4.  使用[塑造（Sculpt）](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-sculpt-mode-in-unreal-engine)工具为地形添加一些变化。
    
    [![PCG关卡地形](https://dev.epicgames.com/community/api/documentation/image/47eea90c-0711-407a-b0b5-7b1e757580e0?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/47eea90c-0711-407a-b0b5-7b1e757580e0?resizing_type=fit)
    
    PCG关卡地形
    

### 创建PCG体积

1.  返回**选择（Selection）**模式并启用**放置Actor（Place Actors）**窗口（如果目前不可见）。
    
2.  使用**搜索类（Search Classes）**框查找**PCG体积（PCG Volume）**并添加一个到你的关卡。
    
    [![PCG新体积](https://dev.epicgames.com/community/api/documentation/image/1a28e598-5d2f-4ce3-b9ca-822a4c24dc10?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1a28e598-5d2f-4ce3-b9ca-822a4c24dc10?resizing_type=fit)
    
    PCG新体积
    
3.  将PCG体积缩放为X=8.0, Y=8.0, Z=8.0
    

[![PCG缩放体积](https://dev.epicgames.com/community/api/documentation/image/1f9f55ec-f2a1-40b5-b571-939a4bc5c2c8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1f9f55ec-f2a1-40b5-b571-939a4bc5c2c8?resizing_type=fit)

PCG缩放体积

### 创建PCG图表资产

1.  右键点击**内容侧滑菜单（Content Drawer）**或**内容浏览器（Content Browser）**，找到**创建的高级资产（Create Advanced Asset）> PCG**，并选择**PCG图表（PCG Graph）**。
    
2.  将新资产命名为**PCG\_ForestGen**并按**Enter**键。
    
3.  双击**PCG\_ForestGen**打开PCG图表编辑器。
    

### 连接PCG组件

1.  在编辑器视口或**大纲视图（Outliner）**中，选择**PCG体积（PCG Volume）**。
    
2.  在**细节（Details）**面板中，点击**PCG组件（PCG Component）**。
    
3.  点击**图表（Graph）**下拉菜单并从列表选择**PCG\_ForestGen**。
    
    [![PCG连接森林图表](https://dev.epicgames.com/community/api/documentation/image/cfb21166-91df-461c-8d1e-15b954ec7bbc?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/cfb21166-91df-461c-8d1e-15b954ec7bbc?resizing_type=fit)
    
    PCG连接森林图表
    

### 创建点

1.  在PCG图表编辑器窗口中，将**Get Landscape Data**节点添加到图表。
    
2.  从Get Landscape Data节点的输出拖移并添加**Surface Sampler**节点。
    
    [![PCG表面采样器](https://dev.epicgames.com/community/api/documentation/image/6d898532-92f3-4da0-99b2-f35b1901cddc?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6d898532-92f3-4da0-99b2-f35b1901cddc?resizing_type=fit)
    
    PCG表面采样器
    
3.  选择Surface Sampler并按**D**键切换调试渲染。
    
4.  返回编辑器窗口，选择PCG体积，然后点击细节面板中的**生成（Generate）**按钮。
    

[![地形上的PCG点](https://dev.epicgames.com/community/api/documentation/image/67dde118-8e85-4454-b9fa-a27da1210f7a?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/67dde118-8e85-4454-b9fa-a27da1210f7a?resizing_type=fit)

地形上的PCG点

现在你可以在编辑器视口中看到正在生成的点。 这些点符合地形的形状。

### 添加变化

1.  在PCG图表编辑器中，选择Surface Sampler。
    
2.  在细节面板中调整**每平方米点数（Points Per Square Meter）**、**点范围（Points Extents）**和**松散度（Looseness）**属性，从而添加更多点。
    
    1.  将**每平方米点数（Points Per Square Meter）**调整为**0.15**，从而将更多点添加到空间。
        
    2.  **点范围（Points Extents）**属性会控制各点的边界大小。 将**X**、**Y**和**Z**的值更改为**50**。
        
    3.  松散度属性将确定生成的点贴近网格形状的程度。 将**松散度（Looseness）**的值保留为**1.0**。
        
        [![PCG图表点调整](https://dev.epicgames.com/community/api/documentation/image/9975717a-e4d6-4a92-ab2b-e1ddb8f1c159?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9975717a-e4d6-4a92-ab2b-e1ddb8f1c159?resizing_type=fit)
        
        PCG图表点调整
        
3.  接下来，添加**Transform Points**节点。 此节点将向你的点添加定义范围内的额外移动、旋转和缩放变化。 将Surface Sampler节点的**输出（Output）**引脚连接到Transform Points节点的**输入（Input）**引脚。
    
    [![PCG图表Transform Points](https://dev.epicgames.com/community/api/documentation/image/2cda746f-f03a-464f-be82-b62c5bffa65c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/2cda746f-f03a-464f-be82-b62c5bffa65c?resizing_type=fit)
    
    PCG图表Transform Points
    
4.  在Surface Sampler节点上禁用调试渲染，并在Transform Points节点上启用它。
    
5.  要添加一些旋转变化，请将**最大旋转（Max Rotation）**的**Z**值更改为**360**。 这样所有点都会获得0到360度之间的随机旋转。
    
    [![PCG图表变换旋转](https://dev.epicgames.com/community/api/documentation/image/9e33d2df-0d50-4de3-87c1-a378ab3745f9?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9e33d2df-0d50-4de3-87c1-a378ab3745f9?resizing_type=fit)
    
    PCG图表变换旋转
    
6.  PCG图表会生成点并将其旋转以符合地形的法线方向。 选中**绝对旋转（Absolute Rotation）**的复选框即可禁用此额外旋转。
    
7.  要添加一些大小变化，请将**X**、**Y**和**Z**的**缩放最小值（Scale Min）**设置为**0.5**。 将**X**、**Y**和**Z**的**缩放最大值（Scale Max）**更改为**1.2**。
    
    [![PCG图表变换旋转设置](https://dev.epicgames.com/community/api/documentation/image/7bb642a1-6be5-4553-92e6-0efd7cdf0a24?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/7bb642a1-6be5-4553-92e6-0efd7cdf0a24?resizing_type=fit)
    
    PCG图表变换旋转设置
    

最终结果是有不少变化的一组点。

[![PCG图表变换缩放](https://dev.epicgames.com/community/api/documentation/image/24fca45c-c2ae-4045-a3d5-d58ad25488f9?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/24fca45c-c2ae-4045-a3d5-d58ad25488f9?resizing_type=fit)

PCG图表变换缩放

### 生成静态网格体

1.  在PCG图表编辑器中，将**Static Mesh Spawner**节点添加到图表视口。 将Transform Points节点的**输出（Output）**引脚连接到Static Mesh Spawner的**输入（Input）**引脚。
    
    [![PCG图表完成](https://dev.epicgames.com/community/api/documentation/image/9cba96b8-c34b-495f-94e0-6d3f68fbfd07?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9cba96b8-c34b-495f-94e0-6d3f68fbfd07?resizing_type=fit)
    
    PCG图表完成
    
2.  选择Static Mesh Spawner。
    
3.  在**细节（Details）**面板中，找到**网格体条目（Mesh Entries）**选项并点击**+**按钮，添加要生成的静态网格体。
    
4.  点击**网格体条目（Mesh Entries）**旁边的下拉箭头以打开数组。
    
5.  点击**Index \[0\]**旁边的下拉箭头。
    
6.  点击**描述符（Descriptor）**旁边的下拉箭头。
    
7.  点击**静态网格体（Static Mesh）**的下拉菜单并选择你想生成的树。 此示例使用**SM\_EuropeanHornbeam\_Forest\_01**。
    
    [![PCG图表生成树](https://dev.epicgames.com/community/api/documentation/image/3b0f8b6b-4dcb-46a8-a7ca-f3a6c33c1587?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/3b0f8b6b-4dcb-46a8-a7ca-f3a6c33c1587?resizing_type=fit)
    
    PCG图表生成树
    

你可以将权重属性用于数组中的每个网格体条目，添加更多静态网格体并平衡多样性。 虚幻引擎添加了所有静态网格体条目的权重值，并将该数字除以每个单独的权重以确定每个条目生成的概率。

[![PCG图表生成三棵树](https://dev.epicgames.com/community/api/documentation/image/a320801b-45ef-4de1-871b-294f7a225669?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/a320801b-45ef-4de1-871b-294f7a225669?resizing_type=fit)

PCG图表生成三棵树

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [procedural generation](https://dev.epicgames.com/community/search?query=procedural%20generation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [重要概念和术语](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#important-concepts-and-terms)
-   [必要设置](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#required-setup)
-   [程序化节点图表](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#the-procedural-node-graph)
-   [创建PCG图表资产](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#create-the-pcg-graph-asset)
-   [PCG图表模版](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#pcg%E5%9B%BE%E8%A1%A8%E6%A8%A1%E7%89%88)
-   [将PCG图表设为模版](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#%E5%B0%86pcg%E5%9B%BE%E8%A1%A8%E8%AE%BE%E4%B8%BA%E6%A8%A1%E7%89%88)
-   [使用模版新建图表](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#%E4%BD%BF%E7%94%A8%E6%A8%A1%E7%89%88%E6%96%B0%E5%BB%BA%E5%9B%BE%E8%A1%A8)
-   [编辑PCG图表](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#editing-the-pcg-graph)
-   [PCG节点](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#pcg-nodes)
-   [属性和元数据](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#attributes-and-metadata)
-   [属性选择器](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#attribute-selector)
-   [C++设置重载](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#c-settings-overrides)
-   [图表参数](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#graph-parameters)
-   [图表实例](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#graph-instances)
-   [PCG组件](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#pcg-component)
-   [World Partition Support](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#data-layer-support)
-   [在PCG中调试](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#debugging-in-pcg)
-   [创建简单森林体积](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#create-a-simple-forest-volume)
-   [创建关卡](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#create-the-level)
-   [创建PCG体积](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#create-the-pcg-volume)
-   [创建PCG图表资产](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#create-the-pcg-graph-asset)
-   [连接PCG组件](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#connect-the-pcg-component)
-   [创建点](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#create-the-points)
-   [添加变化](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#add-variation)
-   [生成静态网格体](/documentation/zh-cn/unreal-engine/procedural-content-generation-overview#spawn-the-static-meshes)
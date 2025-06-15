# 虚幻引擎中的数据驱动Gameplay元素 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/data-driven-gameplay-elements-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:44:49.309Z

---

目录

![数据驱动的Gameplay元素](https://dev.epicgames.com/community/api/documentation/image/283f4c27-f452-45dc-b655-ebf9c7e0abb9?resizing_type=fill&width=1920&height=335)

**基于数据驱动的游戏逻辑（Data Driven Gameplay）** 有助于减少开发人员的工作量，让开发者可以直观查看数据的创建和使用流程。这点特别适用于那些生命周期较长、需要不断根据玩家反馈调整和平衡数据的游戏。

在基于数据驱动的游戏逻辑流程中，你可以通过一个界面来查看和调整数据的创建和变化。你可以把数据放在 **Microsoft Excel** 或其他可维护的电子表格中，然后导入游戏，并使之自动生效。

**数据表（DataTables）** 和 **曲线表（CurveTables）** 可以通过Excel文档导入到 **虚幻引擎**。这些Excel文件的类型是 `.xlsm`（启用宏的Excel文件），有基于宏的导出按钮，能够便捷地将数据导出为中间数据格式，即逗号分隔值（`.csv`）。

这些文件存放在一个地方，这让数据更容易找到和修改。你可以通过 **右键点击** > **另存为** 来下载一个 `.xlsm` 文件示例：

[Sample .xlsm file](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/32142ada-7662-4cee-bc49-425aa6443faf/example.xlsm)

## 数据表

数据表是一种表格，包含各种杂七杂八但彼此相关的数据，并以某种特定方式整理归纳。表中的数据字段可以是任何有效的 `UObject` 属性，包括资产引用。在设计师将CSV文件导入到数据表之前，程序员必须创建行容器，告诉引擎如何解释数据。

这些表格由列名组成，这些列名与基于给定代码的 `UStruct` 及其变量具有1:1映射关系，这些变量必须继承自 `FTableRowBase` 才能被导入程序识别。

第一列名为名称（Name），这一列中的名称可供游戏访问各行。随后的列具有变量名称作为标题，下面在同一列中，是该行/列交点的数据。鉴于这种格式，单个行直接与继承自 `FTableRowBase` 的结构具有1:1的映射关系。

我们创建了以下CSV文档，展示了一个游戏数据示例，其中角色可以获得经验值以进行"升级"：

```cpp
	/** 用于定义数据表的结构体 */
	USTRUCT(BlueprintType)
	struct FLevelUpData : public FTableRowBase
	{
		GENERATED_USTRUCT_BODY()

	public:

		FLevelUpData()
		: XPtoLvl(0)
		, AdditionalHP(0)
		{}

		/ ** "Name"一列中的字段表示当前的经验等级 * /

		/ ** 升级到下一级所需的经验值 * /
		UPROPERTY(EditAnywhere, BlueprintReadWrite, Category=LevelUp)
		int32 XPtoLvl;

		/ ** 升级后获得生命值加成 * /
		UPROPERTY(EditAnywhere, BlueprintReadWrite, Category=LevelUp)
		int32 AdditionalHP;

		/ ** 升级成就图标 * /
		UPROPERTY(EditAnywhere, BlueprintReadWrite, Category=LevelUp)
		TSoftObjectPtr<UTexture> AchievementIcon;
	};
```

**CSV表格：**

```cpp
	Name,XPtoLvl,AdditionalHP,AchievementIcon
	1,0,0,"Texture2d'/Game/Textures/AchievementIcon1'"
	2,1000,9,"Texture2d'/Game/Textures/AchievementIcon2'"
	3,1000,10,"Texture2D'/Game/Textures/AchievementIcon3'"
	4,1500,12,"Texture2D'/Game/Textures/AchievementIcon4'"
	5,2000,14,"Texture2D'/Game/Textures/AchievementIcon5'"
```

此处的双引号对于能否正确导入属性很重要。如果不使用双引号，此处导入的内容会变为 `Texture2d` 。

### 数据表导入过程

按照以下步骤导入CSV文件：

1.  使用 `.csv` 扩展名从Excel或其他电子表格软件保存你的文件。
    
2.  打开虚幻编辑器，并点击 **内容浏览器（Content Browser）** 中的 **导入（Import）** 。
    
3.  找到并选择你想导入为DataTable的CSV文件。你可以选择以下 **导入为（Import As）** 选项：
    
    -   **数据表（DataTable）**
    -   **曲线表（CurveTable）**
    -   **浮点曲线（Float Curve）**
    -   **向量曲线（Vector Curve）**
    -   **线性颜色曲线（Linear Color Curve）**
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58decab4-f087-45ad-922a-341d74f5110a/importas.png)
4.  你可以在下拉菜单中选择 **数据表行类型（DataTable Row Type）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16e29a2b-dd2f-4576-a63f-b7e385453c2a/datarowtype.png)
5.  有更多 **导入选项（Import Options）** 可供使用：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab6cfcae-67ae-4f0a-b514-67560311b3a4/importoptions.png)

  

导入选项

说明

**忽略额外字段（Ignore Extra fields）**

设置为true可忽略导入数据中的额外字段，如果设置为false，将对此发出警告

**忽略缺失字段（Ignore Missing Fields）**

设置为true可忽略本该出现但实际缺失的字段，如果设置为false，将对此发出警告

**导入密钥字段（Import Key Field）**

导入数据中要用作密钥的显式字段。如果为空，将对 `.JSON` 使用Name，并对 `.CSV` 使用找到的字段

1.  这将在 **内容浏览器（Content Browser）** 的当前目录中创建DataTable对象。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0116e812-da64-40ec-93b2-af0cde6b26be/datatableobject.png)
2.  你可以 **双击** 对象以在编辑器中查看DataTable的内容。你可以 **右键点击** 对象并从菜单中选择 **重新导入（Reimport）** 来更新该对象。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e0b32c3-2b3d-4933-a783-9c2a2f553da5/datatableview.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e0b32c3-2b3d-4933-a783-9c2a2f553da5/datatableview.png)
    
    The original file path is used when reimporting the object.
    

## 数据曲线

**数据曲线** 的工作方式类似于DataTable，但仅支持浮点类型。与DataTable一样，第一列名为"名称（Name）"，这一列中的名称可供游戏访问各行。

第一列之后的每个列标题将存储用于绘制曲线的X轴变量。此标题下的数据是给定行的Y轴值。采用这种格式，单个行对应一条曲线，代码可以访问这条曲线并在其中内插数据。

下面是不同等级下的伤害数据：

 

0

1

2

3

Melee\_Damage

15

20

25

30

Melee\_KnockBack

1

2

4

8

Melee\_KnockBackAngle

10

45

60

65

Melee\_StunTime

0

1

5

7

## 曲线表

**曲线表（Curve Tables）** 很适合用于定义二维数字数据。你可以在曲线数据表编辑器中编辑简单曲线和富曲线。

创建曲线表时，你可以打开编辑器，编辑表或曲线视图中的曲线，无需返回你创建它们时所用的外部程序。

你可以在内容浏览器中找到 **杂项（Miscellaneous）** 分段，创建曲线表。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33fb7fed-0a10-4249-a2eb-6c65de90bed7/curvetablecreation.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33fb7fed-0a10-4249-a2eb-6c65de90bed7/curvetablecreation.png)

### 曲线表导入过程

以下是导入CSV文件的步骤：

1.  在Excel或其他电子表格软件中，将你的文件保存为 `.csv` 格式。
    
2.  打开虚幻编辑器，并点击 **内容浏览器（Content Browser）** 中的 **导入（Import）** 。
    
3.  选择你想导入为DataTable的CSV文件。你可以 **导入为（Import As）** 以下类型：
    
    -   **数据表（DataTable）**
    -   **曲线表（CurveTable）**
    -   **浮点曲线（Float Curve）**
    -   **向量曲线（Vector Curve）**
    -   **线性颜色曲线（Linear Color Curve）**
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9dd89dbc-7fce-4a77-a453-40036c280c4c/importas.png)
4.  从下拉列表选择 **曲线表类型（Curve Table Type）** 。选择之后，系统将提示你在 **常量（Constant）** 、 **线性（Linear）** 、 **三次方（Cubic）** 之间选择你的插值类型。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ba34747-7ec4-47d3-a385-cba66603cea7/interpolationtype.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ba34747-7ec4-47d3-a385-cba66603cea7/interpolationtype.png)
    
    插值类型
    
    说明
    
    **常量（Constant）**
    
    Y中的值将不会在X中的数据点之间内插。它们将限制为X的之前已知值。
    
    **线性（Linear）**
    
    Y中的值将在X中的数据点之间线性内插。
    
    **三次（Cubic）**
    
    Y中的值将在X中的数据点之间三次内插。
    
5.  这将在 **内容浏览器（Content Browser）** 的当前目录中创建曲线表对象。
    
    ![曲线表内容浏览器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f662f868-1506-4290-b475-65c6c88d7505/curvetablecontentbrowser.png)
6.  你可以双击曲线表打开曲线表编辑器。
    
    ![曲线表编辑器视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c9b036c-7873-4356-bd73-ce00b15e214e/viewcurvetable.png)
7.  要以图表格式查看曲线表数据，请点击图表按钮。
    
    ![曲线表图表视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d97bf7d-3d08-4bd3-92f9-124a5e4149fe/curvegraphview.png)
8.  **曲线表视图（Curve Table View）** 允许显示多条曲线。
    
    ![多曲线显示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b5b4423-01c7-4258-8aed-14ce99a2ac09/multicurvedisplay.png)
9.  你可以右键点击曲线来 **重命名（Rename）** 和 **删除（Delete）** 曲线。
    
    ![重命名曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48dea167-ada0-40e8-92dd-bc415776f3ec/renaming-curves.gif)

## 数据连接

要使用这些表格中的数据，您必须放置一个Blueprint-exposed变量，可以是 **FDataTableRowHandle** 或 **FCurveTableRowHandle**， 具体取决于您想使用数据表还是曲线表。

从内容提供者的视角来看，这将公开一个具有两个子字段的数据字段：

  

子字段

说明

DataTable/CurveTable

用于保存数据的表格的引用。

RowName

第一列中的不同数据行的名称/标题。

### 数据用法（仅限C++程序员）

连接数据之后，使用数据非常简单。句柄结构提供了辅助函数 `FindRow()` 和 `GetCurve()` ，可用于检索填充了数据的结构体或曲线。

对于 `FCurveTableRowHandle` ，将返回 `FRichCurve` 指针。而 `FDataTableRowHandle` 则 允许你指定模板函数调用中的结构。该结构可以是最终结构 或继承层级中的任意父结构。

最后需要注意，返回的所有结构和曲线在缓存时都不应超出函数的本地范围。若表格通过重新导入而刷新，这可以保证数据更改 立即生效，不会访问无效的指针。

在上面的DataTable示例中，引用的资产是延迟加载的资产（`TSoftObjectPtr` 会处理此情况）。 如果资产字段类型设置为UTexture，每次加载DataTable时都会加载所有资产。

[

![数据注册表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a25a7cc-3d0d-4b35-9c21-04a175a6694d/placeholder_topic.png)

数据注册表

使用数据注册表可以存储、合并、读取和管理不同来源的数据。





](/documentation/zh-cn/unreal-engine/data-registries-in-unreal-engine)

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [gameplay framework](https://dev.epicgames.com/community/search?query=gameplay%20framework)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [数据表](/documentation/zh-cn/unreal-engine/data-driven-gameplay-elements-in-unreal-engine#%E6%95%B0%E6%8D%AE%E8%A1%A8)
-   [数据表导入过程](/documentation/zh-cn/unreal-engine/data-driven-gameplay-elements-in-unreal-engine#%E6%95%B0%E6%8D%AE%E8%A1%A8%E5%AF%BC%E5%85%A5%E8%BF%87%E7%A8%8B)
-   [数据曲线](/documentation/zh-cn/unreal-engine/data-driven-gameplay-elements-in-unreal-engine#%E6%95%B0%E6%8D%AE%E6%9B%B2%E7%BA%BF)
-   [曲线表](/documentation/zh-cn/unreal-engine/data-driven-gameplay-elements-in-unreal-engine#%E6%9B%B2%E7%BA%BF%E8%A1%A8)
-   [曲线表导入过程](/documentation/zh-cn/unreal-engine/data-driven-gameplay-elements-in-unreal-engine#%E6%9B%B2%E7%BA%BF%E8%A1%A8%E5%AF%BC%E5%85%A5%E8%BF%87%E7%A8%8B)
-   [数据连接](/documentation/zh-cn/unreal-engine/data-driven-gameplay-elements-in-unreal-engine#%E6%95%B0%E6%8D%AE%E8%BF%9E%E6%8E%A5)
-   [数据用法（仅限C++程序员）](/documentation/zh-cn/unreal-engine/data-driven-gameplay-elements-in-unreal-engine#%E6%95%B0%E6%8D%AE%E7%94%A8%E6%B3%95%EF%BC%88%E4%BB%85%E9%99%90c++%E7%A8%8B%E5%BA%8F%E5%91%98%EF%BC%89)
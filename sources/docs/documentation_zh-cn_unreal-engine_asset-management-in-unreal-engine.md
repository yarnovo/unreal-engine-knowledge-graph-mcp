# 虚幻引擎资产管理 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/asset-management-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:30:47.305Z

---

目录

![资产管理](https://dev.epicgames.com/community/api/documentation/image/1acbf1ed-46db-4ffb-ad15-569ab3528dc6?resizing_type=fill&width=1920&height=335)

**虚幻引擎** 会自动处理 [资产](/documentation/zh-cn/unreal-engine/assets-and-content-packs-in-unreal-engine)加载与卸载，开发者无需编写系统代码告知引擎具体所需的资产。然而，某些情况下开发者可能需要更精确地掌控资产发现、加载与审核的时机与方法。在这些情况下，**资产管理器（Asset Manager）** 便能大显身手。 资产管理器是存在于编辑器和打包游戏中的独特全局对象，可根据不同项目进行覆盖和自定义。它提供了一个管理资产的框架，可将内容划分为数据块，对应项目的上下文，而同时保证虚幻引擎[松散打包架构](/documentation/zh-cn/unreal-engine/asset-metadata-in-unreal-engine) 的优势。 资产管理器提供了一套工具，协助审核硬盘和内存使用，提供所需信息，以优化资产组织，在部署游戏时进行 [烘焙和数据块划分](/documentation/zh-cn/unreal-engine/cooking-content-and-creating-chunks-in-unreal-engine)。主资产ID包含两部分： 主资产类型，用于标识一组资产，以及该主资产的名称，默认值等同于该资产在 **内容浏览器** 中的显示名称。

## 主资产和次要资产

从概念上来说，虚幻引擎 4 的资产管理系统将所有资产分为两类：**主资产** 和 **次资产**。资产管理器通过主资产的 [**主资产 ID**](/documentation/en-us/unreal-engine/API/Runtime/CoreUObject/UObject/FPrimaryAssetId) 即可直接对其进行操作，调用 `GetPrimaryAssetId` 即可获得此 ID。为将特定 `UObject` 类构成的资产指定为主资产，覆盖 `GetPrimaryAssetId` 即可返回一个有效的 `FPrimaryAssetId` 结构。次资产不由资产管理器直接处理，但其被主资产引用或使用后引擎便会自动进行加载。默认只有 `UWorld` 资产（关卡）为主资产；所有其他资产均为次资产。 为了将次资产设为主资产，必须覆盖其类的 `GetPrimaryAssetId` 函数，返回一个有效的 `FPrimaryAssetId` 结构。主资产ID分为两个部分，一个唯一的主资产类型，用来标识一组资产，以及该主资产的名称（默认是其在 **内容浏览器** 中的名称）。

## 蓝图类资产和数据资产

资产管理器负责处理两种不同类型资产。蓝图类以及非蓝图类资产，例如关卡和数据资产（`UDataAsset` 类的资产实例）。每个主要资产类型都与某个基类相关，并在下文描述的配置中指定它是否存储蓝图类。

### 蓝图类

如需新建一个蓝图主要资产，找到 **内容浏览器** 并[新建一个蓝图类](/documentation/zh-cn/unreal-engine/creating-blueprint-classes-in-unreal-engine)，并且该类继承自某个重写 `GetPrimaryAssetId` 函数的类。基类可以是主要数据资产（Primary Data Asset）或 主要数据资产的子类，或者基类可以是某个重写了 `GetPrimaryAssetId` 的Actor子类。如需访问蓝图的主要资产，请用C++代码调用 `GetPrimaryAssetObjectClass`，或使用蓝图资产管理器函数（名称包含"Class"字样）。用了这个类后，你可以像使用蓝图类一样用它来生成新的实例，或者你可以使用 Get Defaults 函数，向与蓝图相关联的类默认对象访问只读数据。

对于永远不需要实例化的蓝图类，你可以将数据保存在一个[仅数据蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-editor-user-interace-for-data-only-blueprints-in-unreal-engine)中，且该蓝图继承自 `UPrimaryDataAsset`。你还可以从基类派生子类，包括基于蓝图的子类。例如，你可以创建一个基类，比如 `UMyShape`，在C++中扩展 `UPrimaryDataAsset`，然后创建名为 `BP_MyRectangle` 的基于蓝图的子类（父类为 `UMyShape`），创建一个基于蓝图的子类（名为 `BP_MySquare`，父类 `BP_MyRectangle`）。默认设置下，你上一个创建的类的主资产ID（PrimaryAssetId）应该是 `MyShape:BP_MySquare`。

## 非蓝图资产

假如主要资产类型不需要存储蓝图数据，你可以使用非蓝图资产。非蓝图资产在代码中的访问更简单，而且更节省内存。如需在编辑器中新建一个非蓝图主资产，请在"高级"内容浏览器窗口中新建一个数据资产，或使用自定义用户界面来创建新关卡等。以这种方式创建资产与创建蓝图类不一样；你创建的资产是类的实例，而非类本身。要访问类，请用 `GetPrimaryAssetObject` 这类C++函数加载它们，或者用蓝图函数（名称中没有Class）。一旦加载后，你就可以直接访问它们并读取数据。

因为这些资产是实例而不是类，所以你无法从它们继承类或其他资产。如果你要这样做，例如，如果你想创建一个子资产，继承其父类的值（除了那些显式覆盖的值），你应该使用蓝图类来代替。

## 资产管理器和可流送管理器

[资产管理器](/documentation/en-us/unreal-engine/API/Runtime/Engine/Engine/UAssetManager) 对象是一个单例，负责管理主资产的发现与加载。引擎中所包含的基础资产管理器类拥有基础的管理功能，但也可进行延展，满足项目特定的需求。[**可流送管理器**](/documentation/en-us/unreal-engine/API/Runtime/Engine/Engine/FStreamableManager) 结构涵盖在资产管理器中，执行实际的异步对象加载，并使用 **可流送句柄** 将对象保存在内存中，直到不再需要后进行卸载。与单件的资产管理器不同，引擎不同区域中有多个可流送管理器，用途皆有所不同。

## 资产包

**资产包（Asset Bundle）** 是与主资产相关特定资产的命名列表。用"AssetBundles"元标签对 `UObject` 的 `TSoftObjectPtr` 或 `FStringAssetReference` 成员的 `UPROPERTY` 代码段进行标记即可创建资产包。标签的数值将显示保存次资产的束的命名。举例而言，以下保存在 `MeshPtr` 成员变量中的静态网格体资产在 UObject 被保存时将被添加到名为"TestBundle"的资产包。

```cpp
	/** 模型 */
	UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = Display, AssetRegistrySearchable, meta = (AssetBundles = "TestBundle"))
	TSoftObjectPtr<UStaticMesh> MeshPtr;

```

使用资产包的第二种方式是用项目的资产管理器类在运行时将其注册。在此情况下，程序员需要编写代码填入 `FAssetBudleData` 结构，然后将结构传至资产管理器的 `AddDynamicAsset` 函数，并使主资产 ID 与束中的次资产关联起来。

### 从硬盘注册并加载主资产

多数主资产均在 **Content Browser** 中，并作为资产文件保存在硬盘上，以便美术师或设计师进行编辑。程序员创建可以此法使用的类的最简单方式是从 `UPrimaryDataAsset` 继承，它是 `UDataAsset` 的子类，拥有加载和保存内置资产包数据的功能。如需要不同的基类，如 `APawn`，可以试着参考 `UPrimaryDataAsset` ，因为它包含让资产包工作的所有必备元素。以下是如何在某款游戏中指定某个区域的类型；在生成游戏大地图界面中的视觉效果时，区域类型负责告诉游戏使用何种美术资产：

```cpp
	/** 用户能够从地图画面中进行选择的区域 */
	UCLASS(Blueprintable)
	class MYGAME_API UMyGameZoneTheme : public UPrimaryDataAsset
	{
		GENERATED_BODY()

		/** 区域名称 */
		UPROPERTY(EditDefaultsOnly, Category=Zone)
		FText ZoneName;

		/** 进入此区域时将进行加载的地图 */
		UPROPERTY(EditDefaultsOnly, Category=Zone)
		TSoftObjectPtr<UWorld> LevelToLoad;

		/** 用于在地图上展示此其余的蓝图类 */
		UPROPERTY(EditDefaultsOnly, Category=Visual, meta=(AssetBundles = "Menu"))
		TSoftClassPtr<class AGameMapTile> MapTileClass;
	};

```

此类继承自 `UPrimaryDataAsset`，因此其拥有 `GetPrimaryAssetId` 的可用版本，其使用资产的短命名和原生类。举例而言，以命名"Forest"保存的 `UFortZoneTheme` 的主材质 ID 名称为"FortZoneTheme:Forest"。`UFortZoneTheme` 资产保存在编辑器中时，`PrimaryDataAsset` 的 `AssetBundleData` 成员将被更新，将其作为次资产包含。

注册并加载主资产需要以下操作：

1.  \*\*如果项目拥有自定义资产管理器类，则需要让引擎知悉。假如你的项目需要特殊功能，你只需要重载默认的资产管理器类 `UAssetManager`。假如你的项目需要特殊功能，可以跳过此步骤。要覆盖设置，只需修改项目的 `DefaultEngine.ini` 文件，并设置 `[/Script/Engine.Engine]` 代码段下的 `AssetManagerClassName` 变量。最终的数值应为以下格式：
    
    ```cpp
         [/Script/Engine.Engine]
         AssetManagerClassName=/Script/Module.UClassName
    ```
    
    其中"Module"代表项目的模块名，"UClassName"则代表希望使用的 `UClass` 名。在 我们的示例中，项目的模块名为"MyGame"，希望使用的类则名为 `UFortAssetManager`（意味着其 `UClass` 命名为 `FortAssetManager`），因此第二行应为：
    
    ```cpp
         AssetManagerClassName=/Script/FortniteGame.FortAssetManager
    ```
    
2.  **用资产管理器注册主资产。方法可以是用** Project Settings\*\* 菜单进行配置，或通过编程使资产管理器类在启动过程中注册主资产。
    
    通过 **Project Settings**（在 **Game / Asset Manager** 部分下）进行配置如下图所示：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/151e7b01-3282-4369-81be-2721f0313021/assetmanager.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/151e7b01-3282-4369-81be-2721f0313021/assetmanager.png)
    
    可对扫描主资产的路径进行配置。
    
    设置
    
    效果
    
    Primary Asset Types to Scan
    
    列出要寻找和注册的主资产类型，以及在何处进行寻找，并对其执行何种操作。
    
    Directories to Exclude
    
    不进行主资产显式扫描的目录。这可用于排除测试资产。
    
    Primary Asset Rules
    
    列出特定的规则覆盖（Rules Overrides），其将说明资产的处理方式。查看 [烘焙和数据块划分](/documentation/zh-cn/unreal-engine/cooking-content-and-creating-chunks-in-unreal-engine) 中的详细内容。
    
    Only Cook Production Assets
    
    如勾选此项，被指定为 DevelopmentCook 的资产在烘焙过程中将出现错误。可用于确保最终发布的版本中不含测试资产。
    
    Primary Asset ID Redirects
    
    资产管理器查找 ID 出现在列表中的主资产的数据时，其 ID 将被提供的其他 ID 所替换。
    
    Primary Asset Type Redirects
    
    资产管理器查找主资产的数据时，将使用列表中提供的类型名称，而非其原生类型。
    
    Primary Asset Name Redirects
    
    资产管理器查找主资产的数据时将使用列表中提供的资产名称，而非其原生名称。
    
    -   如希望直接在代码中注册主资产，则覆盖资产管理器类中的 `StartInitialLoading` 函数并从该处调用 `ScanPathsForPrimaryAssets`。因此，推荐你将所有同类型的主资产放入相同的子文件夹中。这将使资产查找和注册更为迅速。

1.  **加载资产。** 使用资产管理器函数 `LoadPrimaryAssets`、`LoadPrimaryAsset` 和 `LoadPrimaryAssetsWithType` 可用于在适当的时间开始加载主资产。之后资产可通过 `UnloadPrimaryAssets`、`UnloadPrimaryAsset` 和 `UnloadPrimaryAssetsWithType` 进行卸载。使用这些加载函数时，你可以指定一个资产包列表。以此法进行加载将使资产管理器按以上描述的方式加载这些资产包应用的次资产。

### 注册并加载动态创建的主资产

主资产包也可在运行时动态注册和加载。有两个资产管理器函数可用于理解此操作：

-   `ExtractSoftObjectPaths` 检查给定的 `UScriptStruct` 的全部 `UPROPERTY` 成员，并识别资产引用（然后这些引用将被保存在一个资产名阵列中）。此阵列可在创建资产包时使用。 `ExtractSoftObjectPaths` 参数：

参数

目的

`Struct`

搜索资产引用的 UStruct。

`StructValue`

结构体的void指针。

`FoundAssetReferences`

用于返回结构体中找到的资产引用的阵列。

`PropertiesToSkip`

返回阵列中所排除的属性名阵列。

-   `RecursivelyExpandBundleData` 将找到对主资产的全部引用，并递归扩展找到其全部资产包依赖性。因此，这意味着上方 ZoneTheme 所引用的 TheaterMapTileClass 将被添加到 AssetBundleData。 然后它将注册命名的动态资产并开始加载。 `RecursivelyExpandBundleData` 参数：

参数

目的

`BundleData`

包含资产引用的束数据。它们将被递归扩展，可用于加载一套相关资产。

举例而言，在 MyGame 项目中，在其自定义资产管理器类中使用以下代码，基于游戏中下载的"剧院"数据构造和加载资产：

```cpp
	// 从剧院 ID 构建命名
	UMyGameAssetManager& AssetManager = UMyGameAssetManager::Get();
	FPrimaryAssetId WorldMapAssetId = FPrimaryAssetId(UMyGameAssetManager::WorldMapInfoType, FName(*WorldMapData.UniqueId));

	TArray<FSoftObjectPath> AssetReferences;
	AssetManager.ExtractSoftObjectPaths(FMyGameWorldMapData::StaticStruct(), &WorldMapData, AssetReferences);

	FAssetBundleData GameDataBundles;
	GameDataBundles.AddBundleAssets(UMyGameAssetManager::LoadStateMenu, AssetReferences);

	// 递归延展引用，获得区域中的图块蓝图
	AssetManager.RecursivelyExpandBundleData(GameDataBundles);

	// 注册动态资产
	AssetManager.AddDynamicAsset(WorldMapAssetId, FSoftObjectPath(), GameDataBundles);

	// 开始预加载
	AssetManager.LoadPrimaryAsset(WorldMapAssetId, AssetManager.GetDefaultBundleState());
```

-   [assets](https://dev.epicgames.com/community/search?query=assets)
-   [asset management](https://dev.epicgames.com/community/search?query=asset%20management)
-   [data pipeline](https://dev.epicgames.com/community/search?query=data%20pipeline)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [主资产和次要资产](/documentation/zh-cn/unreal-engine/asset-management-in-unreal-engine#%E4%B8%BB%E8%B5%84%E4%BA%A7%E5%92%8C%E6%AC%A1%E8%A6%81%E8%B5%84%E4%BA%A7)
-   [蓝图类资产和数据资产](/documentation/zh-cn/unreal-engine/asset-management-in-unreal-engine#%E8%93%9D%E5%9B%BE%E7%B1%BB%E8%B5%84%E4%BA%A7%E5%92%8C%E6%95%B0%E6%8D%AE%E8%B5%84%E4%BA%A7)
-   [蓝图类](/documentation/zh-cn/unreal-engine/asset-management-in-unreal-engine#%E8%93%9D%E5%9B%BE%E7%B1%BB)
-   [非蓝图资产](/documentation/zh-cn/unreal-engine/asset-management-in-unreal-engine#%E9%9D%9E%E8%93%9D%E5%9B%BE%E8%B5%84%E4%BA%A7)
-   [资产管理器和可流送管理器](/documentation/zh-cn/unreal-engine/asset-management-in-unreal-engine#%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%99%A8%E5%92%8C%E5%8F%AF%E6%B5%81%E9%80%81%E7%AE%A1%E7%90%86%E5%99%A8)
-   [资产包](/documentation/zh-cn/unreal-engine/asset-management-in-unreal-engine#%E8%B5%84%E4%BA%A7%E5%8C%85)
-   [从硬盘注册并加载主资产](/documentation/zh-cn/unreal-engine/asset-management-in-unreal-engine#%E4%BB%8E%E7%A1%AC%E7%9B%98%E6%B3%A8%E5%86%8C%E5%B9%B6%E5%8A%A0%E8%BD%BD%E4%B8%BB%E8%B5%84%E4%BA%A7)
-   [注册并加载动态创建的主资产](/documentation/zh-cn/unreal-engine/asset-management-in-unreal-engine#%E6%B3%A8%E5%86%8C%E5%B9%B6%E5%8A%A0%E8%BD%BD%E5%8A%A8%E6%80%81%E5%88%9B%E5%BB%BA%E7%9A%84%E4%B8%BB%E8%B5%84%E4%BA%A7)

相关文档

[

资产和内容包

![资产和内容包](https://dev.epicgames.com/community/api/documentation/image/dee26cb2-859c-4e1d-9475-f52cb15c81ee?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/assets-and-content-packs-in-unreal-engine)
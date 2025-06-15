# 虚幻引擎资产注册表 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/asset-registry-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:39:48.000Z

---

目录

![资产注册表](https://dev.epicgames.com/community/api/documentation/image/d796c4c6-b72c-4997-8eed-8b199745eb14?resizing_type=fill&width=1920&height=335)

**资产注册表** 是一个编辑器子系统，它在编辑器加载时异步收集有关未加载的资产的信息。 该信息存储在内存中，这样，编辑器无需加载它们就可以创建资产列表。 该信息是权威信息，当资产在内存中被更改或文件在磁盘上被更改时，它会自动更新。 此系统主要由 **内容浏览器** 使用，但是也可能会在编辑器代码的任意位置被使用。

## 获取资产列表

要按类建立资产列表，只需加载资产注册表（Asset Registry）模块然后调用 `Module.Get().GetAssetsByClass()` 即可

```cpp
	FAssetRegistryModule& AssetRegistryModule = FModuleManager::LoadModuleChecked<FAssetRegistryModule>("AssetRegistry");
	TArray<FAssetData> AssetData;
	const UClass* Class = UStaticMesh::StaticClass();
	AssetRegistryModule.Get().GetAssetsByClass(Class->GetFName(), AssetData);
```

以上代码将返回一系列 `FAssetData` 对象，它们描述已加载或未加载的资产。 `FAssetData` 对象容纳有关资产的信息，这些信息在资产被加载前就可以确定。

下面是其成员列表和说明：

成员

说明

`FName ObjectPath`

资产的对象路径，形式是 `Package.GroupNames.AssetName`。

`FName PackageName`

包含该资产的包的名称。

`FName PackagePath`

包含该资产的包的路径。

`FName GroupNames`

包含该资产的组名称的列表（使用"`.`"分隔）。如果无组，则为 `NAME_None`。

`FName AssetName`

无包或组的资产的名称。

`FName AssetClass`

资产的类的名称。

`TMap<FName, FString> TagsAndValues`

标记为 `AssetRegistrySearchable` 的属性的值映射。请参阅[标记和值](/documentation/zh-cn/unreal-engine/asset-registry-in-unreal-engine#tagsandvalues)以了解更多信息。

你也可以通过调用下列任意一个函数，使用其他条件建立列表：

函数

说明

`GetAssetsByPackageName()`

返回来自特定包的资产的列表。

`GetAssetsByPath()`

返回特定路径中的资产的列表。

`GetAssetByObjectPath()`

返回具有特定对象路径的资产的列表。

`GetAssetsByTagValues()`

返回具有特定标记和值组合的资产的列表。

`GetAllAssets()`

返回所有资产的列表。此过程可能较慢。

如果需要使用多个条件建立资产列表，可以使用 `GetAssets()` 并提供 `FARFilter` 结构体，如[创建过滤器](/documentation/zh-cn/unreal-engine/asset-registry-in-unreal-engine#creatingafilter)部分中所述。

## 将FAssetData转换为UObject\*

`FAssetData` 对象具有一个名称为 `GetAsset()` 的函数，它将返回 `FAssetData` 表示的 `UObject*` 。如果需要，它将加载资产然后返回它。

如果仅希望检查资产是否已加载，可使用 `IsAssetLoaded()`。

## 创建过滤器

调用 `GetAssets()` 时可提供 `FARFilter`，以创建采用多个条件过滤后的 资产列表。过滤器由多个组件组成：

-   包名称（PackageName）
-   包路径（PackagePath）
-   集合（Collection）
-   类（Class）
-   标记/值（Tags/Value）对

一个组件可能具有多个元素。要通过过滤器，资产必须满足 **所有** 组件。 要满足组件，资产必须与其中的 **任意** 元素匹配。

例如，存在一个路径为/Game/Meshes/BeachBall的静态网格体资产：

-   如果过滤器仅包含包路径 `/Game/Meshes`，资产将通过过滤。仅存在一个具有一个元素的组件。
-   如果过滤器包含包路径 `/Game/Meshes` 和 `UParticleSystem` **及** `UStaticMesh` 类，资产将通过过滤。存在两个组件，第一个组件具有一个元素，第二个组件具有两个元素。
-   如果过滤器包含包路径 `/Game/Meshes` 并且 **仅** 包含 `UParticleSystem` 类，资产将无法通过过滤。存在两个组件，每个组件各具有一个元素。
-   如果过滤器包含包路径 `/Game/NotMeshes` 和 `UStaticMesh` 类，资产将无法通过过滤。该过滤器也使用两个组件，每个组件各具有一个元素。

使用具有两个组件（类和包路径）的过滤器的一个示例：

```cpp
	FAssetRegistryModule& AssetRegistryModule = FModuleManager::LoadModuleChecked<FAssetRegistryModule>("AssetRegistry");
	TArray<FAssetData> AssetData;
	FARFilter Filter;
	Filter.Classes.Add(UStaticMesh::StaticClass());
	Filter.PackagePaths.Add("/Game/Meshes");
	AssetRegistryModule.Get().GetAssets(Filter, AssetData);
```

## 标记和值

从资产注册表返回的 `FAssetData` 对象包含名称和称作 `TagsAndValues` 的值映射。 它们是 `FAssetData` 表示的资产的属性名称和关联值。 此信息是在资产被保存时收集的，存储在包含资产的 `UAsset` 文件的标头中。 资产注册表读取此标头并相应地填充 `TagsAndValues` 映射。 资产注册表仅收集使用 `AssetRegistrySearchable` `UPROPERTY()` 标记标记的属性。

例如（来自 `UTexture`）：

```cpp
	/** 对此纹理采样时使用的纹理过滤模式。*/
	UPROPERTY(Category=Texture, AssetRegistrySearchable)
	TEnumAsByte<enum TextureFilter> Filter;
```

将此标记添加到 `UTexture` 的"过滤器（Filter）"属性后，之后保存的所有 `UTexture` 的 `FAssetData` 的 `TagsAndValues` 映射中此时都将具有一个键是 `Filter`、值是枚举值的字符串表示（例如，`"TF_Linear"`）的条目。

要使资产注册表能够发现资产的属性，必须重新保存资产。

如果你希望资产注册表能够搜索本身不是UProperty的信息， 资产的类可以实现虚函数GetAssetRegistryTags()，以手动将键/值 对添加到TagsAndValues映射。GetAssetRegistryTags继承自UObject。

## 异步数据收集

资产注册表异步读取 `UAsset` 文件，因此在你请求资产列表时， 列表可能并非包含所有资产的完整列表。如果编辑器代码需要完整列表，资产注册表可提供 委托回调，涵盖资产被发现/创建、重命名或删除等情况。也存在适用于 资产注册表已完成初始搜索的情况的委托，它对于很多系统都非常有用。

注册这些委托的方法是，加载"资产注册表（Asset Registry）"模块，然后使用 `IAssetRegistry` 中提供的函数：

```cpp
	/** 注册/取消注册适用于资产被添加到注册表中的情况的回调*/
	virtual FAssetAddedEvent& OnAssetAdded() = 0;

	/** 注册/取消注册适用于资产被从注册表中删除的情况的回调*/
	virtual FAssetRemovedEvent& OnAssetRemoved() = 0;

	/** 注册/取消注册适用于资产在注册表中被重命名的情况的回调*/
	virtual FAssetRenamedEvent& OnAssetRenamed() = 0;

	/** 注册/取消注册适用于资产注册表加载完文件的情况的回调*/
	virtual FFilesLoadedEvent& OnFilesLoaded() = 0;

	/** 注册/取消注册更新后台文件加载进度的回调*/
	virtual FFileLoadProgressUpdatedEvent& OnFileLoadProgressUpdated() = 0;

	/** 如果资产注册表当前正在加载文件，尚无法返回有关所有资产的信息时返回True*/
	virtual bool IsLoadingAssets() = 0;
```

例如：

```cpp
	void FMyClass::FMyClass()
	{
		// 加载资产注册表模块，以侦听更新
		FAssetRegistryModule& AssetRegistryModule = FModuleManager::LoadModuleChecked<FAssetRegistryModule>("AssetRegistry");
		AssetRegistryModule.Get().OnAssetAdded().AddRaw( this, &FMyClass::OnAssetAdded );
	}

	FMyClass::~FMyClass()
	{
		// 加载资产注册表模块，以将委托取消注册
		FAssetRegistryModule& AssetRegistryModule = FModuleManager::LoadModuleChecked<FAssetRegistryModule>("AssetRegistry");
		AssetRegistryModule.Get().OnAssetAdded().RemoveAll( this );
	}

	void FMyClass::OnAssetAdded(const FAssetData& AssetData)
	{
		// 资产注册表发现某个资产。
		// 这意味着该资产刚被创建或刚在磁盘上被发现。
		// 确保此函数中的代码速度较快，否则它将拖慢收集过程。
	}
```

可在commandlet中使用资产注册表，但是这样会同步收集信息。`LoadModule()` 调用将被阻止，直至收集完成。

如果代码期望资产被异步发现，并且具有[Slate UI](/documentation/zh-cn/unreal-engine/slate-user-interface-programming-framework-for-unreal-engine)前端，它应包含 `SAssetDiscoveryIndicator` 控件，以将进度传达给用户。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [获取资产列表](/documentation/zh-cn/unreal-engine/asset-registry-in-unreal-engine#%E8%8E%B7%E5%8F%96%E8%B5%84%E4%BA%A7%E5%88%97%E8%A1%A8)
-   [将FAssetData转换为UObject\*](/documentation/zh-cn/unreal-engine/asset-registry-in-unreal-engine#%E5%B0%86fassetdata%E8%BD%AC%E6%8D%A2%E4%B8%BAuobject*)
-   [创建过滤器](/documentation/zh-cn/unreal-engine/asset-registry-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%BF%87%E6%BB%A4%E5%99%A8)
-   [标记和值](/documentation/zh-cn/unreal-engine/asset-registry-in-unreal-engine#%E6%A0%87%E8%AE%B0%E5%92%8C%E5%80%BC)
-   [异步数据收集](/documentation/zh-cn/unreal-engine/asset-registry-in-unreal-engine#%E5%BC%82%E6%AD%A5%E6%95%B0%E6%8D%AE%E6%94%B6%E9%9B%86)
# 虚幻引擎中的资产引用 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/referencing-assets-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:39:53.879Z

---

目录

![引用资产](https://dev.epicgames.com/community/api/documentation/image/b4fc2f0f-9aa7-4b69-90fb-c1ae5d7cec23?resizing_type=fill&width=1920&height=335)

**虚幻引擎（UE）** 提供了许多种机制来控制引用资源的方式并通过扩展将其装入内存。这些引用分为两种方式：硬性引用，即对象 A 引用对象 B，并导致对象 B 在对象 A 加载时加载；软性引用，即对象 A 通过间接机制（例如字符串形式的对象路径）来引用对象 B。下面的前两个小节阐述硬性引用，而其余小节探讨软性引用。

## 直接属性引用

这是最常见的资源引用情况，并通过 UPROPERTY 宏公开。您的游戏类会公开一个 UPROPERTY，后者允许设计人员通过蓝图继承对原型指定特定资源，或通过放在环境中的实例来指定该资源。例如，以下代码来自 **StrategyGame** 示例中包含的 `AStrategyBuilding`，它允许设计人员选择建造某种类型的建筑时播放的声音。

```cpp
	/** construction start sound stinger */

	UPROPERTY(EditDefaultsOnly, Category=Building)

	USoundCue* ConstructionStartStinger;
```

此属性只能作为对象默认属性的一部分进行设置（由 EditDefaultsOnly 关键字控制）。设计人员创建扩展 AStrategyBuilding 的新蓝图类。然后，可以为该蓝图保存设计人员所需要的声音。每当设计人员所创建的该蓝图加载时，还将自动加载该 UPROPERTY 中引用的声音。

## 构造时引用

您将会遇到的第二类硬性引用是程序员知道需要为给定属性加载的确切资源，并在对象的构造中设置该属性。这项任务是使用特殊类 `ConstructorHelpers` 完成的，这个类在构造阶段查找某个对象的对象和类。以下 HUD 片段同样来自 StrategyGame 示例，它在其渲染过程中指派要使用的资源。

```cpp
	/** gray health bar texture */

	UPROPERTY()

	class UTexture2D* BarFillTexture;

	AStrategyHUD::AStrategyHUD(const FObjectInitializer& ObjectInitializer) :
		Super(ObjectInitializer)
	{
		static ConstructorHelpers::FObjectFinder<UTexture2D> BarFillObj(TEXT("/Game/UI/HUD/BarFill"));

		...

		BarFillTexture = BarFillObj.Object;

		...

	}
```

在以上构造函数中，`ConstructorHelpers` 类将尝试在内存中查找该资源，如果找不到，则进行加载。请注意，使用资源的完整路径来指定要加载的内容。如果该资源不存在或者由于出错而无法加载，那么该属性将设置为 `nullptr`。发生这种情况时，尝试访问纹理的代码将崩溃。最好进行声明，指出资源已正确加载（如果后续代码假设引用有效）。

UPROPERTY 的声明与前面的硬性引用示例相同。它们的工作方式相同，只不过是最初的设置方式有所差别。有关硬性引用的一个注意事项是，当对象加载并实例化时，还将加载以硬性方式引用的资源。您必须仔细地进行考虑，否则内存使用量会因为同时加载许多资源而迅速增加。如果您希望推迟该加载或确定要在运行时加载的内容，那么下列各节可以帮助您完成这些任务。

## 间接属性引用

控制何时加载资源的一种简单方法是使用 `TSoftObjectPtr`。对于设计人员，间接属性引用的工作方式就像直接属性引用一样。但是，属性以字符串形式与模版代码存储在一起以便安全地检查资源是否已加载，而不是进行直接指针引用。使用 `IsPending()` 方法可检查资源是否已准备好可供访问。请注意，使用 TSoftObjectPtr 要求在您想要使用资源时手动加载该资源。您可使用模板化 `LoadObject<>()` 方法、`StaticLoadObject()` 或 `FStreamingManager` 来加载对象（有关更多信息，请参阅 [异步资产加载](/documentation/zh-cn/unreal-engine/asynchronous-asset-loading-in-unreal-engine) for more information)）。前两个方法以同步方式加载资源，这可能会导致帧速率突增，因此，仅当您知道不会影响游戏时，才应使用这些方法。

```cpp
	UPROPERTY(EditDefaultsOnly, BlueprintReadWrite, Category=Building)
	TSoftObjectPtr<UStaticMesh> BaseMesh;

	UStaticMesh* GetLazyLoadedMesh()
	{
		if (BaseMesh.IsPending())
		{
			const FSoftObjectPath& AssetRef = BaseMesh.ToStringReference();
			BaseMesh = Cast< UStaticMesh>(Streamable.SynchronousLoad(AssetRef));
		}
		return BaseMesh.Get();
	}
```

以上代码使用 `UStaticMesh` 的 `TSoftObjectPtr` 将网格的加载推迟到运行时进行。将检查资源，以确定对象是否已加载。如果尚未加载，那么将使用 `FStreamingManager` 执行同步加载。否则，将返回 `TSoftObjectPtr` 内的 `UStaticMesh` 指针给调用者。

如果您希望推迟加载 Uclass，请使用与 `TSoftObjectPtr` 相同的方法，并替换类特定版本 `TSoftClassPtr` 模版类型。其工作方式与引用特定的资源相同，但改为引用资源的 Uclass，而不是引用接口。

## 查找/加载对象

到目前为止，这些示例全都基于 UPROPERTY。但是，如果您希望在运行时构建字符串并使用该字符串来引用对象，情况将会如何？您可使用两个选项。如果您仅在 UObject 已加载或已创建时才使用它，那么正确的选择是使用 `FindObject<>()`。如果您希望对象未加载时将其加载，那么正确的选择是使用 `LoadObject<>()`。请注意，`LoadObject<>()` 在内部执行的操作与 `FindObject` 相同，因此您不必先尝试查找对象再进行加载。以下是各个函数的一些用法示例。

```cpp
	AFunctionalTest* TestToRun = FindObject<AFunctionalTest>(TestsOuter, *TestName);
	GridTexture = LoadObject<UTexture2D>(NULL, TEXT("/Engine/EngineMaterials/DefaultWhiteGrid.DefaultWhiteGrid"), NULL, LOAD_None, NULL);
```

加载 UClass 时，可以使用 `LoadObject` 的一种特殊形式。这无非是加载类的一种较简单方法，它会自动验证类型。以下代码片段对此作了说明。

```cpp
	DefaultPreviewPawnClass = LoadClass<APawn>(NULL, *PreviewPawnName, NULL, LOAD_None, NULL);
```

等同于：

```cpp
	DefaultPreviewPawnClass = LoadObject<UClass>(NULL, *PreviewPawnName, NULL, LOAD_None, NULL);

	if (!DefaultPreviewPawnClass->IsChildOf(APawn::StaticClass()))
	{
		DefaultPreviewPawnClass = nullptr;
	}
```

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [直接属性引用](/documentation/zh-cn/unreal-engine/referencing-assets-in-unreal-engine#%E7%9B%B4%E6%8E%A5%E5%B1%9E%E6%80%A7%E5%BC%95%E7%94%A8)
-   [构造时引用](/documentation/zh-cn/unreal-engine/referencing-assets-in-unreal-engine#%E6%9E%84%E9%80%A0%E6%97%B6%E5%BC%95%E7%94%A8)
-   [间接属性引用](/documentation/zh-cn/unreal-engine/referencing-assets-in-unreal-engine#%E9%97%B4%E6%8E%A5%E5%B1%9E%E6%80%A7%E5%BC%95%E7%94%A8)
-   [查找/加载对象](/documentation/zh-cn/unreal-engine/referencing-assets-in-unreal-engine#%E6%9F%A5%E6%89%BE/%E5%8A%A0%E8%BD%BD%E5%AF%B9%E8%B1%A1)
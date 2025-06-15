# 在虚幻引擎的细节面板自定义中重新排列和隐藏属性 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/reordering-and-hiding-properties-in-details-panel-customizations-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:36:23.072Z

---

目录

![重新排列和隐藏属性](https://dev.epicgames.com/community/api/documentation/image/f2887b38-7a44-449d-a9cb-ff623a1cfc11?resizing_type=fill&width=1920&height=335)

细节面板自定义可以更改属性在细节面板中显示的顺序，以及显示或隐藏通常不可见的属性。本页面介绍了如何显示、隐藏和重新排列属性和类别。

## 先决条件

本页面使用[细节面板自定义快速入门](/documentation/zh-cn/unreal-engine/details-panel-quickstart-guide-for-unreal-engine)教程作为示例基础，并提及以下内容：

-   FCustomDataProperty – 由以下内容组成的自定义结构体：
    -   TSoftObjectPtr CustomTexture
    -   FName CustomName
    -   FString CustomString
    -   Int32 CustomInt
-   ACustomActor – 一个添加了以下属性的简单Actor：
    -   TSoftObjectPtr CustomMesh
    -   float CustomFloat
    -   bool CustomBool
    -   FCustomDataProperty CustomData
-   FCustomDataPropertyCustomization – 用于FCustomDataProperty的属性类型自定义。
    
-   FCustomClassDetailsCustomization – 用于ACustomActor的细节自定义。

如果你想根据用户所做的更改显示或隐藏细节，请参阅[刷新细节面板](/documentation/zh-cn/unreal-engine/refreshing-custom-details-panels-in-unreal-engine)。

## 属性

### 重新排列属性

要想重新排列属性，你可以更改你调用 **AddProperty** 的顺序。[细节面板自定义快速入门](/documentation/zh-cn/unreal-engine/details-panel-quickstart-guide-for-unreal-engine)中的类细节自定义包含重新排列属性的示例。`ACustomActor` 的原始属性声明如下：

CustomActorClass.h

```cpp
	UPROPERTY(EditAnywhere)
	TSoftObjectPtr<UStaticMesh> CustomMesh;

	UPROPERTY(EditAnywhere)
	float CustomFloat;

	UPROPERTY(EditAnywhere)
	bool CustomBool;

	UPROPERTY(EditAnywhere)
	FCustomDataProperty CustomData;
```

通常，CustomMesh和CustomFloat会首先显示在细节面板中。然而，`FCustomClassDetailsCustomization::CustomizeDetails` 函数会按如下方式将二者添加到细节面板中：

CustomActorClassCustomization.h

```cpp
	CustomCategory.AddProperty(GET_MEMBER_NAME_CHECKED(ACustomActor, CustomData));
	CustomCategory.AddProperty(GET_MEMBER_NAME_CHECKED(ACustomActor, CustomBool));
	CustomCategory.AddProperty(GET_MEMBER_NAME_CHECKED(ACustomActor, CustomMesh));
	CustomCategory.AddProperty(GET_MEMBER_NAME_CHECKED(ACustomActor, CustomFloat));
```

这导致首先显示CustomData和CustomBool。同样，任何其他自定义 **Slate** 元素将按照你添加它们的顺序显示。

如果你未在 **细节自定义（Details Customization）** 中添加属性，则采用Actor的默认顺序和默认类别。参阅下面的 **隐藏属性** 小节，了解如何避免显示属性。

### 隐藏属性

使用 `IDetailCategoryBuilder::HideProperty` 可以选择性地隐藏通常由于其UPROPERTY说明符而显示的属性。

CustomClassDetailsCustomization.cpp

```cpp
	DetailBuilder.HideProperty(FCustomDataProperty::StaticStruct()->GetFName());
```

## 类别

### 重新排列类别

使用 `IDetailCategoryBuilder::SortCategories` 可以设置自定义类别显示的顺序。

`IDetailCategoryBuilder::SortCategories` 将获取带有签名 `void FunctionName (const TMap<FName, IDetailCategoryBuilder*>&)` 的委托。用于此委托的函数必须是静态函数。[TMap](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMap)是你的自定义类添加的所有类别的映射。从中获取类别后，你可以使用 `IDetailCategoryBuilder::SetSortOrder` 更改类别的显示顺序。`IDetailCategoryBuilder::SetSortOrder` 始终从低到高排序。

CustomClassDetailsCustomization.h

```cpp
	static void SortCustomDetailsCategories(const TMap<FName, IDetailCategoryBuilder*>& AllCategoryMap);
```

CustomClassDetailsCustomization.cpp

```cpp
	//具有两个类别名称的自定义细节。

	void FCustomClassDetailsCustomization::CustomizeDetails(IDetailLayoutBuilder& DetailBuilder)
	{
		IDetailCategoryBuilder& CustomCategory = DetailBuilder.EditCategory(FName("Custom Settings"));
		IDetailCategoryBuilder& DataCategory = DetailBuilder.EditCategory(FName("Data"));
		CustomCategory.AddProperty(GET_MEMBER_NAME_CHECKED(ACustomActor, CustomBool));
		CustomCategory.AddProperty(GET_MEMBER_NAME_CHECKED(ACustomActor, CustomMesh));
		DataCategory.AddProperty(GET_MEMBER_NAME_CHECKED(ACustomActor, CustomData));
		DataCategory.AddProperty(GET_MEMBER_NAME_CHECKED(ACustomActor, CustomFloat));
		DetailBuilder.SortCategories(&SortCustomDetailsCategories);
	}

	//对详细类别进行排序

	void FCustomClassDetailsCustomization::SortCustomDetailsCategories(const TMap<FName, IDetailCategoryBuilder*>& AllCategoryMap)
	{
		(*AllCategoryMap.Find(FName("Custom Settings")))->SetSortOrder(1);
		(*AllCategoryMap.Find(FName("Data")))->SetSortOrder(0);
	}
```

### 隐藏类别

使用 `IDetailCategoryBuilder::HideCategory` 可以隐藏整个类别。你可以使用通过UPROPERTY说明符定义的类别或作为细节自定义的一部分定义的类别。提供类别的 `FName`。

CustomClassDetailsCustomization.cpp

```cpp
	void FCustomClassDetailsCustomization::CustomizeDetails(IDetailLayoutBuilder& DetailBuilder)
	{
		FName CustomCategoryName = FName("Custom Settings");
		IDetailCategoryBuilder& CustomCategory = DetailBuilder.EditCategory(CustomCategoryName);
		DetailBuilder.HideCategory(CustomCategoryName);
	}
```

### 高级类别

使用 `IDetailCategoryBuilder::SetShowAdvanced` 可以指定仅在你展开 **细节面板（Details Panel）** 的 **高级（Advanced）** 分段时显示的类别。

CustomClassDetailsCustomization.cpp

```cpp

	void FCustomClassDetailsCustomization::CustomizeDetails(IDetailLayoutBuilder& DetailBuilder)
	{
		FName CustomCategoryName = FName("Custom Settings");
		IDetailCategoryBuilder& CustomCategory = DetailBuilder.EditCategory(CustomCategoryName);
		CustomCategory.SetShowAdvanced(true);
	}

```

-   [customizations](https://dev.epicgames.com/community/search?query=customizations)
-   [slate](https://dev.epicgames.com/community/search?query=slate)
-   [tools programming](https://dev.epicgames.com/community/search?query=tools%20programming)
-   [details panel](https://dev.epicgames.com/community/search?query=details%20panel)
-   [details categories](https://dev.epicgames.com/community/search?query=details%20categories)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/reordering-and-hiding-properties-in-details-panel-customizations-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [属性](/documentation/zh-cn/unreal-engine/reordering-and-hiding-properties-in-details-panel-customizations-in-unreal-engine#%E5%B1%9E%E6%80%A7)
-   [重新排列属性](/documentation/zh-cn/unreal-engine/reordering-and-hiding-properties-in-details-panel-customizations-in-unreal-engine#%E9%87%8D%E6%96%B0%E6%8E%92%E5%88%97%E5%B1%9E%E6%80%A7)
-   [隐藏属性](/documentation/zh-cn/unreal-engine/reordering-and-hiding-properties-in-details-panel-customizations-in-unreal-engine#%E9%9A%90%E8%97%8F%E5%B1%9E%E6%80%A7)
-   [类别](/documentation/zh-cn/unreal-engine/reordering-and-hiding-properties-in-details-panel-customizations-in-unreal-engine#%E7%B1%BB%E5%88%AB)
-   [重新排列类别](/documentation/zh-cn/unreal-engine/reordering-and-hiding-properties-in-details-panel-customizations-in-unreal-engine#%E9%87%8D%E6%96%B0%E6%8E%92%E5%88%97%E7%B1%BB%E5%88%AB)
-   [隐藏类别](/documentation/zh-cn/unreal-engine/reordering-and-hiding-properties-in-details-panel-customizations-in-unreal-engine#%E9%9A%90%E8%97%8F%E7%B1%BB%E5%88%AB)
-   [高级类别](/documentation/zh-cn/unreal-engine/reordering-and-hiding-properties-in-details-panel-customizations-in-unreal-engine#%E9%AB%98%E7%BA%A7%E7%B1%BB%E5%88%AB)
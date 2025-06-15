# 虚幻引擎蓝图函数库 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blueprint-function-libraries-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:35:07.827Z

---

目录

![蓝图函数库](https://dev.epicgames.com/community/api/documentation/image/1458545b-83e7-4396-a36c-6abdf44e2a4f?resizing_type=fill&width=1920&height=335)

在开发过程中，你通常会发现需要通过函数集简化项目开发。这些函数通常无状态，可在多种游戏性代码之间重复使用。通过蓝图进行编译时通常也会需要这些函数。之前的章节讲述了如何将游戏对象的函数和属性对蓝图公开。然而，如果需要公开共享效用函数，则不需要将它们和一种特定的游戏性对象类型捆绑在一起。对于这类情况，我们使用 **蓝图函数库**。

蓝图函数库是一个静态函数的合集，提供不与特定游戏性对象绑定的效用功能。这些库可群组化为逻辑函数集（如 AI 蓝图库），或包含提供多种不同功能区域（如系统蓝图库）访问的函数。

创建蓝图函数库与使用 UFUNCTION() 宏对蓝图公开函数十分相似。所有蓝图类均继承自 UBlueprintFunctionLibrary，而非派生自 Actor 或 UObject。它们只应包含静态方法。以下代码是分析蓝图库的一个片段，展示如何设置库类。

```cpp
	UCLASS()
	class UAnalyticsBlueprintLibrary :
		public UBlueprintFunctionLibrary
	{
		GENERATED_UCLASS_BODY()
		/** 在不指定自定义属性的情况下开始分析会话 */
		UFUNCTION(BlueprintCallable, Category="Analytics")
		static bool StartSession();
```

正如上例所示，蓝图函数库为 UObject 非直接派生，因此需要标准 UCLASS() 和 GENERATED\_UCLASS\_BODY() 宏。它还将在可从蓝图进行调用的函数上添加 UFUNCTION() 宏。蓝图函数库中的函数可被设计为 BlueprintCallable 或 BlueprintPure，取决于调用是否存在副作用。

See `Engine/Plugins/Runtime/Analytics/AnalyticsBlueprintLibrary` for the full source code.

以下是 `StartSession()` 函数的实现细节：

```cpp
	bool UAnalyticsBlueprintLibrary::StartSession()
	{
		TSharedPtr<IAnalyticsProvider> Provider = FAnalytics::Get().GetDefaultConfiguredProvider();
		if (Provider.IsValid())
		{
			return Provider->StartSession();
		}
		else
		{
			UE_LOG(LogAnalyticsBPLib, Warning, TEXT("StartSession: Failed to get the default analytics provider. Double check your [Analytics] configuration in your INI"));
		}
		return false;
	}
```

注意：以上实现与非 UObject 派生的单例对象存在互动。这种方法可将第三方库函数对蓝图公开，或与 UObject 不支持的 C++ 类进行互动。以下代码是蓝图函数库法的一个范例，可执行一些常规操作，为受控 actor 寻找 AIController：

```cpp
	AAIController* UAIBlueprintHelperLibrary::GetAIController(AActor* ControlledActor)
	{
		APawn* AsPawn = Cast<APawn>(ControlledActor);
		if (AsPawn != nullptr)
		{
			return Cast<AAIController>(AsPawn->GetController());
		}
		return Cast<AAIController>(ControlledActor);
	}
```

此函数提取多个蓝图节点的内容，使其变为单个节点。你也可以在蓝图中为其生成一个函数。如经常调用，C++ 版本将达到更佳的性能。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [c++](https://dev.epicgames.com/community/search?query=c++)
-   [blueprint function libraries](https://dev.epicgames.com/community/search?query=blueprint%20function%20libraries)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
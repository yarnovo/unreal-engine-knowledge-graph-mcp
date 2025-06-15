# 虚幻引擎编程子系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/programming-subsystems-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:40:20.048Z

---

目录

![编程子系统](https://dev.epicgames.com/community/api/documentation/image/e759d019-c8b9-4bfc-985a-27c8f18552b8?resizing_type=fill&width=1920&height=335)

**虚幻引擎（UE）** 中的子系统是生命周期受控的自动实例化类。这些类提供了易用的扩展点，程序员可直接获得蓝图和Python公开，同时避免繁复的引擎类修改或覆盖。

当前支持的子系统生命周期包括：

子系统

继承自

**引擎**

`UEngineSubsystem` 类

**编辑器**

`UEditorSubsystem` 类

**游戏实例**

`UGameInstanceSubsystem` 类

**本地玩家**

`ULocalPlayerSubsystem` 类

举例而言，如果创建了一个派生自此基类的类：

```cpp
	class UMyGamesSubsystem : public UGameInstanceSubsystem
```

将出现以下结果：

1.  创建 `UGameInstance` 之后，还会创建一个名为 `UMyGamesSubsystem` 的实例。
2.  `UGameInstance` 初始化时，将在子系统上调用 `Initialize()`。
3.  `UGameInstance` 关闭时，将在子系统上调用 `Deinitialize()`。
4.  此时将放弃对子系统的引用，如果不再有对子系统的引用，则其将被垃圾回收。

## 使用子系统的原因

使用编程子系统有以下几个原因：

-   子系统可节省编程时间。
-   子系统使您无需覆盖引擎类。
-   子系统使您无需再已经很复杂的类上添加更多API。
-   子系统使您能通过用户友好的类型化节点来访问蓝图。
-   子系统允许访问Python脚本来编写编辑器脚本或编写测试代码。
-   子系统在代码库中提供模块化和一致性。

子系统在创建插件时尤为实用。您不需要代码相关的说明即可让插件工作。用户只需将插件添加到游戏中，就可以确切了解插件将在何时被实例化和初始化。因此，您可以专注于UE4中提供的API和功能的使用方式。

## 用蓝图访问子系统

子系统将自动公开到蓝图，智能节点理解情境，且不需要强制转换。您可以使用标准的 `UFUNCTION()` 标记和规则来控制蓝图可以使用哪些API。

右键点击蓝图图表来显示快捷菜单并搜索"子系统"，将出现类似于下图的内容。这里有每个主要类型的类目，以及每个特定子系统的单个条目。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a7ce09a-b61e-4b4d-80c7-2f5e3493b625/subsystems_01.png)

如果从上添加节点，将得到如下结果。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8901bc9-f0d0-40d6-b8e2-0f558e436732/subsystems_02.png)

## 用Python访问子系统

如果正在使用Python，则可以用内置访问器来访问子系统，如下方示例所示。

```cpp
	my_engine_subsystem = unreal.get_engine_subsystem(unreal.MyEngineSubsystem)
	my_editor_subsystem = unreal.get_editor_subsystem(unreal.MyEditorSubsystem)
```

Python当前是一个实验性功能。

## 子系统生命周期细节

### 引擎子系统

```cpp
	class UMyEngineSubsystem : public UEngineSubsystem { ... };
```

当引擎子系统的模块加载时，子系统将在模块的 `Startup()` 函数返回后执行 `Initialize()`，子系统将在模块的 `Shutdown()` 函数返回后执行 `Deinitialize()`。

这些子系统通过GEngine访问，如下所示。

```cpp
	UMyEngineSubsystem* MySubsystem = GEngine->GetEngineSubsystem<UMyEngineSubsystem>();
```

### 编辑器子系统

```cpp
	class UMyEditorSubsystem : public UEditorSubsystem { ... };
```

当编辑器子系统的模块加载时，子系统将在模块的 `Startup()` 函数返回后执行 `Initialize()`，子系统将在模块的 `Shutdown()` 函数返回后执行 `Deinitialize()`。

这些子系统可通过GEEditor访问，如下所示。

```cpp
	UMyEditorSubsystem* MySubsystem = GEditor->GetEditorSubsystem<UMyEditorSubsystem>();
```

### GameInstance子系统

```cpp
	class UMyGameSubsystem : public UGameInstanceSubsystem { ... };
```

这些子系统可通过UGameInstance访问，如下所示。

```cpp
	UGameInstance* GameInstance = ...;
	UMyGameSubsystem* MySubsystem = GameInstance->GetSubsystem<UMyGameSubsystem>();
```

### LocalPlayer子系统

```cpp
	class UMyPlayerSubsystem : public ULocalPlayerSubsystem { ... };

```

这些子系统可通过ULocalPlayer访问，如下所示。

```cpp
	ULocalPlayer* LocalPlayer = ...;
	UMyPlayerSubsystem * MySubsystem = LocalPlayer->GetSubsystem<UMyPlayerSubsystem>();
```

## 子系统范例

在以下示例中，我们希望为游戏添加一个统计数据系统，以跟踪收集资源的数量。

我们可以从 `UGameInstance` 派生，并创建 `UMyGamesGameInstance`，然后为其添加 `IncrementResourceStat()` 函数。然而我们知道，团队最终希望添加其他统计数据以及统计数据聚合器和统计数据的保存/加载等。因此，您决定将所有这些内容放入类中，例如 `UMyGamesStatsSubsystem`。

同样，我们可以创建 `UMyGamesGameInstance` 并添加 `UMyGamesStatsSubsystem` 类型的成员。然后我们可以向它添加一个存取器，并连接Initialize和Deinitialize函数。然而这会存在几个问题。

-   不存在 `UGameInstance` 的游戏特定导数。
-   `UMyGamesGameInstance` 存在，但是它已拥有大量函数，添加更多函数并不理想。

在一个足够复杂的游戏中，从 `UGameInstance` 进行派生有很多好处。然而当您拥有子系统时，便不需要使用它。最重要的是，较之于使用其他方法，使用子系统需要编写的代码更少。

因此，我们最终使用的代码将显示在下例中。

```cpp
	UCLASS()
	class UMyGamesStatsSubsystem : public UGameInstanceSubsystem
	{
		GENERATED_BODY()
	public:
		// Begin USubsystem
		virtual void Initialize(FSubsystemCollectionBase& Collection) override;
		virtual void Deinitialize() override;
		// End USubsystem

		void IncrementResourceStat();
	private:
		// All my variables
	};
```

-   [subsystems](https://dev.epicgames.com/community/search?query=subsystems)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用子系统的原因](/documentation/zh-cn/unreal-engine/programming-subsystems-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%AD%90%E7%B3%BB%E7%BB%9F%E7%9A%84%E5%8E%9F%E5%9B%A0)
-   [用蓝图访问子系统](/documentation/zh-cn/unreal-engine/programming-subsystems-in-unreal-engine#%E7%94%A8%E8%93%9D%E5%9B%BE%E8%AE%BF%E9%97%AE%E5%AD%90%E7%B3%BB%E7%BB%9F)
-   [用Python访问子系统](/documentation/zh-cn/unreal-engine/programming-subsystems-in-unreal-engine#%E7%94%A8python%E8%AE%BF%E9%97%AE%E5%AD%90%E7%B3%BB%E7%BB%9F)
-   [子系统生命周期细节](/documentation/zh-cn/unreal-engine/programming-subsystems-in-unreal-engine#%E5%AD%90%E7%B3%BB%E7%BB%9F%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E7%BB%86%E8%8A%82)
-   [引擎子系统](/documentation/zh-cn/unreal-engine/programming-subsystems-in-unreal-engine#%E5%BC%95%E6%93%8E%E5%AD%90%E7%B3%BB%E7%BB%9F)
-   [编辑器子系统](/documentation/zh-cn/unreal-engine/programming-subsystems-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%99%A8%E5%AD%90%E7%B3%BB%E7%BB%9F)
-   [GameInstance子系统](/documentation/zh-cn/unreal-engine/programming-subsystems-in-unreal-engine#gameinstance%E5%AD%90%E7%B3%BB%E7%BB%9F)
-   [LocalPlayer子系统](/documentation/zh-cn/unreal-engine/programming-subsystems-in-unreal-engine#localplayer%E5%AD%90%E7%B3%BB%E7%BB%9F)
-   [子系统范例](/documentation/zh-cn/unreal-engine/programming-subsystems-in-unreal-engine#%E5%AD%90%E7%B3%BB%E7%BB%9F%E8%8C%83%E4%BE%8B)
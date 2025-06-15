# 虚幻引擎中的接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:41:26.715Z

---

目录

![虚幻接口](https://dev.epicgames.com/community/api/documentation/image/d3a77097-6971-45fe-a70e-8b10e02e41a7?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [虚幻引擎反射系统](/documentation/zh-cn/unreal-engine/reflection-system-in-unreal-engine)

当某个类继承自一个 **虚幻接口（Unreal Interface）** 类时，该接口可确保新类实现一组共用的函数。这在某个功能可能被大量复杂且差异显著的类共享的情况下非常有用。

例如，假如你的游戏有这样一个系统，当玩家角色进入一个触发器体积时，可以根据情况激活陷阱、警告敌人，或奖励玩家点数。你可以通过在陷阱、敌人和奖励点数上实现 `ReactToTrigger` 函数来实现这一点。尽管所有这些激活的对象都实现了 `ReactToTrigger`，但它们在其他方面的差异可能很大。比如：

-   陷阱派生自 `AActor`。
-   敌人派生自 `APawn` 或 `ACharacter`。
-   奖励点数派生自 `UDataAsset`。

这些类需要共享功能，但除了基础的 `UObject`，并没有共同的父项。在这种情况下，虚幻接口可以强制所有这些对象实现必要的功能。

## 在C++中声明接口

在C++中声明接口类似于声明普通的虚幻类，但存在一些重大区别：

-   接口类使用 `UINTERFACE` 宏而不是 `UCLASS` 宏。
-   接口类继承自 `UInterface` 而不是 `UObject`。

`UINTERFACE` 类不是实际的接口，而是一个为反射系统提供可见性的空白类。

### C++类向导

要从虚幻编辑器新建一个虚幻接口类，请使用以下信息，并按照[C++类向导](/documentation/zh-cn/unreal-engine/using-the-cplusplus-class-wizard-in-unreal-engine)一文中的步骤操作：

-   **类**：虚幻接口（Unreal Interface）

### C++接口声明示例

下面是一个名为 `ReactToTriggerInterface` 的C++接口声明示例：

ReactToTriggerInterface.h

```cpp
#pragma once

#include "CoreMinimal.h"
#include "UObject/Interface.h"
#include "ReactToTriggerInterface.generated.h"

/*
此类无需修改。
用于反射系统可见性的空白类。
使用UINTERFACE宏。
继承自UInterface。
*/
UINTERFACE(MinimalAPI, Blueprintable)
class UReactToTriggerInterface : public UInterface
{
	GENERATED_BODY()
};

/* 实际接口声明。 */
class IReactToTriggerInterface
{
	GENERATED_BODY()

	// 将接口函数添加到此类。此类将被继承以实现此接口。
public:
	// 在此处添加接口函数声明
};
```

如此示例所示，实际的接口与空白类同名，但前缀 `U` 被替换成了 `I`。带 `U` 前缀的类无需构造函数或其他任何函数。带 `I` 前缀的类包含所有接口函数，会被要实现接口的类继承。

如果你希望想让蓝图实现此接口，需要 `Blueprintable` 说明符。

### 接口说明符

使用接口说明符向[虚幻反射系统](/documentation/zh-cn/unreal-engine/reflection-system-in-unreal-engine)公开你的类。下表列出了相关的接口说明符：

**接口说明符**

含义

`Blueprintable`

公开此接口，使其可以[由蓝图实现](/documentation/zh-cn/unreal-engine/implementing-blueprint-interfaces-in-unreal-engine)。如果接口包含除了 `BlueprintImplementableEvent` 和 `BlueprintNativeEvent` 之外的任何函数，则不能被公开给蓝图。请使用 `NotBlueprintable` 或 `meta=(CannotImplementInterfaceInBlueprint)` 说明接口不能在蓝图中安全实现。

"BlueprintType"

将该类公开为可用于蓝图中的变量的类型。

"DependsOn=(ClassName1, ClassName2, ...)"

编译系统将在编译该类前，编译所有带此说明符的类。`ClassName` 必须在同一个（或上一个）包中指定一个类。你可以使用以逗号分隔的单个 `DependsOn` 行来指定多个依赖项类，也可以使用单个"DependsOn"行为每个类指定。

"MinimalAPI"

仅导致该类的类型信息被导出以供其他模块使用。你可以向该类转换，但不能调用该类的函数（内联方法除外）。对于不需要其所有函数在其他模块中均可供访问的类，通过不导出这些类的所有内容，这可以缩短编译时间。

## 在C++中实现接口

要在一个新的类中使用你的接口，需要：

-   包含你的接口头文件。
-   集成你带 `I` 前缀的接口类。

以下示例为上文中提到的陷阱：

Trap.h

```cpp
#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "ReactToTriggerInterface.h"
#include "Trap.generated.h"

UCLASS(Blueprintable, Category="MyGame")
class ATrap : public AActor, public IReactToTriggerInterface
{
	GENERATED_BODY()

public:
	// 在此添加接口函数重载
};
```

## 声明接口函数

有几种方法可以在接口中声明函数，由环境决定能够实现或调用哪种方法。所有方法都必须在带 `I` 前缀的类中为你的接口声明，而且它们必须是公开的，以便对外部的类可见。

### 仅限C++的接口函数

可以在接口的头文件中声明一个不带 `UFUNCTION` 说明的虚拟C++函数。这些函数必须为虚拟的，以便在实现接口的类中覆盖它们。

#### 接口类

下面展示了 `ReactToTriggerInterface` 类应该是什么样子的：

ReactToTriggerInterface.h

```cpp
#pragma once

#include "ReactToTriggerInterface.generated.h"

/*
用于反射系统可见性的空白类。
使用UINTERFACE宏。
继承自UInterface。
*/
UINTERFACE(MinimalAPI, Blueprintable)
class UReactToTriggerInterface : public UInterface
{
	GENERATED_BODY()
};

/* 实际接口声明。 */
class IReactToTriggerInterface
{
	GENERATED_BODY()

public:
	virtual bool ReactToTrigger();
};
```

你可以在头文件本身或接口的 `.cpp` 文件中提供默认实现。

ReactToTriggerInterface.cpp

```cpp
#include "ReactToTriggerInterface.h"

bool IReactToTriggerInterface::ReactToTrigger()
{
	return false;
}
```

#### 派生的类

在派生的类中实现接口时，你可以创建并实现一个特定于该类的重载。下面的示例展示了如果 `ATrap` Actor实现了 `IReactToTriggerInterface` 的情况：

Trap.h

```cpp
#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "ReactToTriggerInterface.h"
#include "Trap.generated.h"

UCLASS(Blueprintable, Category="MyGame")
class ATrap : public AActor, public IReactToTriggerInterface
{
	GENERATED_BODY()

public:
	virtual bool ReactToTrigger() override;
};
```

Trap.cpp

```cpp
#include "Trap.h"

bool ATrap::ReactToTrigger()
{
	return false;
}
```

用这种方法声明的C++接口函数对蓝图不可见，不能在Blueprintable接口中使用。

### 蓝图可调用接口函数

要创建蓝图可调用的接口函数，你必须：

-   在带 `BlueprintCallable` 说明符的函数声明中指定一个 `UFUNCTION` 宏。
-   使用 `BlueprintImplementableEvent` 或 `BlueprintNativeEvent` 说明符。

蓝图可调用的接口函数不能是虚拟的。

带 `BlueprintCallable` 说明符的函数可以在C++或蓝图中调用，方法是使用指向实现接口的对象的引用。

如果你的蓝图可调用函数没有返回值，虚幻引擎会将你的函数视作蓝图中的一个事件。

#### 蓝图可实现事件

带 `BlueprintImplementableEvent` 说明符的函数不能在C++中重载，但可以在任何实现或继承了接口的蓝图中重载。下面是一个 `BlueprintImplementableEvent` 的C++接口声明示例：

ReactToTriggerInterface.h

```cpp
#pragma once

#include "ReactToTriggerInterface.generated.h"

/*
用于反射系统可见性的空白类。
使用UINTERFACE宏。
继承自UInterface。
*/
UINTERFACE(MinimalAPI, Blueprintable)
class UReactToTriggerInterface : public UInterface
{
	GENERATED_BODY()
};

/* 实际的接口声明。 */
class IReactToTriggerInterface
{
	GENERATED_BODY()

public:
	/* 只能在蓝图中实现的React To Trigger函数版本。 */
	UFUNCTION(BlueprintCallable, BlueprintImplementableEvent, Category=Trigger Reaction)
	bool ReactToTrigger();
};
```

#### 蓝图原生事件

带 `BlueprintNativeEvent` 说明符的函数可以在C++或蓝图中实现。下面是一个 `BlueprintNativeEvent` 的C++接口声明示例：

ReactToTriggerInterface.h

```cpp
#pragma once

#include "ReactToTriggerInterface.generated.h"

/*
用于反射系统可见性的空白类。
使用UINTERFACE宏。
继承自UInterface。
*/
UINTERFACE(MinimalAPI, Blueprintable)
class UReactToTriggerInterface : public UInterface
{
	GENERATED_BODY()
};

/* 实际的接口声明。 */
class IReactToTriggerInterface
{
	GENERATED_BODY()

public:
	/* 可以在C++或蓝图中实现的React To Trigger函数版本。 */
	UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category=Trigger Reaction)
	bool ReactToTrigger();
};
```

##### 在C++中重载蓝图原生事件

要在C++中实现 `BlueprintNativeEvent`，需要在另外创建一个与 `BlueprintNativeEvent` 同名的函数，并在名称后加上 `_Implementation` 后缀。下面以 `ATrap` 为例展示了该函数应该是什么样子：

Trap.h

```cpp
#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "ReactToTriggerInterface.h"
#include "Trap.generated.h"

UCLASS(Blueprintable, Category="MyGame")
class ATrap : public AActor, public IReactToTriggerInterface
{
	GENERATED_BODY()

public:
	virtual bool ReactToTrigger() override;
	
	// 蓝图原生事件重载
	bool ReactToTrigger_Implementation() override;
};
```

Trap.cpp

```cpp
#include "Trap.h"

bool ATrap::ReactToTrigger()
{
	return false;
}

// 蓝图原生事件重载实现
bool ATrap::ReactToTrigger_Implementation() 
{
	return false;
}
```

##### 在蓝图中重载蓝图原生事件

`BlueprintNativeEvent` 说明符还允许在蓝图中重载实现。要在蓝图中实现 `BlueprintNativeEvent`，请参阅[实现蓝图接口](/documentation/zh-cn/unreal-engine/implementing-blueprint-interfaces-in-unreal-engine)一文。

#### 从C++调用蓝图事件

要在C++中从 `Blueprintable` 接口安全调用的 `BlueprintImplementableEvent` 或 `BlueprintNativeEvent`，必须使用特殊的静态 `Execute_` 函数封装器。以下示例调用同时适用于在C++和蓝图中实现的接口：

```cpp
// OriginalObject is an object that implements the IReactToTriggerInterface
bool bReacted = IReactToTriggerInterface::Execute_ReactToTrigger(OriginalObject);
```

## 接口函数类型

接口函数分为三种不同的类型：

-   基（Base）
-   实现（Implementation）
-   实现（Execute）

下表介绍了每种类型的用途：

**类型**

**定义位置**

**目的**

**用法**

基函数

基础接口类（`MyInterface.h`）

函数定义可在子类中实现。

只在接口和实现仅在C++中定义时使用。

实现封装器

实现接口的C++类（`MyInterfaceActor.h`, `MyInterfaceActor.cpp`）

在C++中实现接口功能。

只调用C++实现，不调用任何蓝图重载。

执行封装器

由虚幻引擎反射系统自动创建（`MyInterface.generated.h`、`MyInterface.gen.cpp`）

在C++和蓝图中定义的实现间实现通信。

调用包括C++和蓝图重载在内的所有函数实现。

请参考以下示例：

-   `MyFunction` 是一个 `BlueprintNativeEvent` 接口函数，在 `MyInterface.h`中定义。
-   `MyInterfaceActor` 实现了 `MyInterface`。
-   `MyFunction_Implementation` 在 `MyInterfaceActor.cpp`中定义。
-   多个C++和蓝图生成的Actor继承了 `MyInterfaceActor`。

要从所有继承了 `MyInterfaceActor` 的蓝图和C++对象安全调用 `MyFunction`，你可以使用以下代码：

```cpp
TArray<AActor*> OutActors;
UGameplayStatics::GetAllActorsOfClass(GetWorld(), AMyInterfaceActor::StaticClass(), OutActors);

// OutActors包含所有实现或继承了AMyInterfaceActor的BP和C++ Actor
for (AActor* CurrentActor : OutActors)
{
	// 每个CurrentActor调用本身的MyFunction实现
	UE_LOG(LogTemp, Log, TEXT("%s : %s"), *CurrentActor->GetName(), *IMyInterface::Execute_MyFunction(Cast<AMyInterfaceActor>(CurrentActor)));
}
```

## 确定类是否实现了接口

为了兼容实现了你接口的C++和蓝图类，请使用以下任一函数确定类是否实现了接口：

```cpp
bool bIsImplemented;

/* bIsImplemented is true if OriginalObject implements UReactToTriggerInterface */
bIsImplemented = OriginalObject->GetClass()->ImplementsInterface(UReactToTriggerInterface::StaticClass());

/* bIsImplemented is true if OriginalObject implements UReactToTriggerInterface */
bIsImplemented = OriginalObject->Implements<UReactToTriggerInterface>();

/* ReactingObject is non-null if OriginalObject implements UReactToTriggerInterface in C++ */
IReactToTriggerInterface* ReactingObject = Cast<IReactToTriggerInterface>(OriginalObject);
```

模板化的 `Cast<>` 方法只在接口在C++类中实现时才有效。在蓝图中实现的接口不存在于对象的C++版本中，因此 `Cast<>` 会返回空值。`TScriptInterface<>` 也可以在C++代码中使用，以便安全地复制接口指针以及实现它的 `UObject`。

## 转换到其他虚幻类型

虚幻引擎的转换系统支持从一个接口转换到另一个接口，或者在适当的情况下，从一个接口转换到一个虚幻类型。下面是可用于转换接口的一些方法的示例：

```cpp
/* 如果接口被实现，则ReactingObject不为空 */
IReactToTriggerInterface* ReactingObject = Cast<IReactToTriggerInterface>(OriginalObject);

/* 如果ReactingObject不为空，且其实现了ISomeOtherInterface，则DifferentInterface不为空 */
ISomeOtherInterface* DifferentInterface = Cast<ISomeOtherInterface>(ReactingObject);

/* 如果ReactingObject不为空，且OriginalObject是一个AActor或AActor派生的类，则ReactingActor不为空 */
AActor* ReactingActor = Cast<AActor>(ReactingObject);
```

## 安全地存储对象和接口指针

要存储对实现了特定接口的对象的引用，可以使用 `TScriptInterface`。如果你有一个实现了接口的对象，可以按以下方法初始化 `TScriptInterface`：

```cpp
UMyObject* MyObjectPtr;
TScriptInterface<IMyInterface> MyScriptInterface;

if (MyObjectPtr->Implements<UMyInterface>())
{
	MyScriptInterface = TScriptInterface<IMyInterface>(MyObjectPtr);
}

// MyScriptInterface持有对MyObjectPtr和MyInterfacePtr的引用
```

要获取指向原始对象的指针，请使用 `GetObject`：

```cpp
UMyObject* MyRetrievedObjectPtr = MyScriptInterface.GetObject();
```

要获取指向原始对象实现的接口的指针，请使用 `GetInterface`：

```cpp
IMyInterface* MyRetrievedInterfacePtr = MyScriptInterface.GetInterface();
```

关于 `TScriptInterface` 的更多详情，请参阅[`TScriptInterface`](/documentation/en-us/unreal-engine/API/Runtime/CoreUObject/UObject/TScriptInterface)及其关联的[`FScriptInterface`](/documentation/en-us/unreal-engine/API/Runtime/CoreUObject/UObject/FScriptInterface)API页面。

## 蓝图可实现接口

如果你想让蓝图实现此接口，则必须使用 `Blueprintable` 元数据说明符。所有接口函数（不是静态函数）必须是 `BlueprintNativeEvent` 或 `BlueprintImplementableEvent`。如果蓝图实现一个在C++中声明的接口，其工作原理类似于蓝图接口资产。这意味着该蓝图类的实例其实不包含接口的C++版本，因此不能与 `Cast<>` 配合使用。在C++中，只有`Execute_` 静态封装器函数才能正常工作。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [c++](https://dev.epicgames.com/community/search?query=c++)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)
-   [interfaces](https://dev.epicgames.com/community/search?query=interfaces)
-   [blueprintnativeevent](https://dev.epicgames.com/community/search?query=blueprintnativeevent)
-   [blueprintimplementableevent](https://dev.epicgames.com/community/search?query=blueprintimplementableevent)
-   [tscriptinterface](https://dev.epicgames.com/community/search?query=tscriptinterface)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [在C++中声明接口](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#%E5%9C%A8c++%E4%B8%AD%E5%A3%B0%E6%98%8E%E6%8E%A5%E5%8F%A3)
-   [C++类向导](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#c++%E7%B1%BB%E5%90%91%E5%AF%BC)
-   [C++接口声明示例](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#c++%E6%8E%A5%E5%8F%A3%E5%A3%B0%E6%98%8E%E7%A4%BA%E4%BE%8B)
-   [接口说明符](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#%E6%8E%A5%E5%8F%A3%E8%AF%B4%E6%98%8E%E7%AC%A6)
-   [在C++中实现接口](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#%E5%9C%A8c++%E4%B8%AD%E5%AE%9E%E7%8E%B0%E6%8E%A5%E5%8F%A3)
-   [声明接口函数](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#%E5%A3%B0%E6%98%8E%E6%8E%A5%E5%8F%A3%E5%87%BD%E6%95%B0)
-   [仅限C++的接口函数](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#%E4%BB%85%E9%99%90c++%E7%9A%84%E6%8E%A5%E5%8F%A3%E5%87%BD%E6%95%B0)
-   [接口类](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#%E6%8E%A5%E5%8F%A3%E7%B1%BB)
-   [派生的类](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#%E6%B4%BE%E7%94%9F%E7%9A%84%E7%B1%BB)
-   [蓝图可调用接口函数](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#%E8%93%9D%E5%9B%BE%E5%8F%AF%E8%B0%83%E7%94%A8%E6%8E%A5%E5%8F%A3%E5%87%BD%E6%95%B0)
-   [蓝图可实现事件](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#%E8%93%9D%E5%9B%BE%E5%8F%AF%E5%AE%9E%E7%8E%B0%E4%BA%8B%E4%BB%B6)
-   [蓝图原生事件](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#%E8%93%9D%E5%9B%BE%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6)
-   [在C++中重载蓝图原生事件](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#%E5%9C%A8c++%E4%B8%AD%E9%87%8D%E8%BD%BD%E8%93%9D%E5%9B%BE%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6)
-   [在蓝图中重载蓝图原生事件](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#%E5%9C%A8%E8%93%9D%E5%9B%BE%E4%B8%AD%E9%87%8D%E8%BD%BD%E8%93%9D%E5%9B%BE%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6)
-   [从C++调用蓝图事件](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#%E4%BB%8Ec++%E8%B0%83%E7%94%A8%E8%93%9D%E5%9B%BE%E4%BA%8B%E4%BB%B6)
-   [接口函数类型](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#%E6%8E%A5%E5%8F%A3%E5%87%BD%E6%95%B0%E7%B1%BB%E5%9E%8B)
-   [确定类是否实现了接口](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#%E7%A1%AE%E5%AE%9A%E7%B1%BB%E6%98%AF%E5%90%A6%E5%AE%9E%E7%8E%B0%E4%BA%86%E6%8E%A5%E5%8F%A3)
-   [转换到其他虚幻类型](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#%E8%BD%AC%E6%8D%A2%E5%88%B0%E5%85%B6%E4%BB%96%E8%99%9A%E5%B9%BB%E7%B1%BB%E5%9E%8B)
-   [安全地存储对象和接口指针](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#%E5%AE%89%E5%85%A8%E5%9C%B0%E5%AD%98%E5%82%A8%E5%AF%B9%E8%B1%A1%E5%92%8C%E6%8E%A5%E5%8F%A3%E6%8C%87%E9%92%88)
-   [蓝图可实现接口](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine#%E8%93%9D%E5%9B%BE%E5%8F%AF%E5%AE%9E%E7%8E%B0%E6%8E%A5%E5%8F%A3)
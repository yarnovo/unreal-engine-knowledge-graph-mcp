# Objects in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/objects-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:40:47.189Z

---

目录

![对象](https://dev.epicgames.com/community/api/documentation/image/7cacbe40-bafd-4d79-80c8-fb04fc0220cd?resizing_type=fill&width=1920&height=335)

虚幻引擎包含一个用于处理游戏对象的强大系统。虚幻引擎中所有对象的基类都是 `UObject`。而 `UCLASS` 宏的作用是标记 `UObject` 的子类， 以便 **UObject** 处理系统可以识别它们。

## UCLASS 宏

**UCLASS** 宏为 `UObject` 提供了一个 `UCLASS` 引用，用于描述它在虚幻引擎中的类型。每个 UCLASS 都保留一个称作 **类默认对象（Class Default Object）** 的对象，简称CDO。CDO 本质上是一个默认"模板"对象，由类构建函数生成，之后就不再修改。

你可以为指定对象获取其 UCLASS 和 CDO，虽然它们通常都是只读类型。 使用 `GetClass()` 函数即可随时访问对象实例的 UCLASS。

`UCLASS` 包含定义类的一套属性和函数。这些是本地代码可用的普通 C++ 函数和变量，但被虚幻引擎特有的元数据所标记，它们在对象系统中的行为也因此受到控制。 如需了解标记语法的更多细节，请查阅[编程参考](/documentation/zh-cn/unreal-engine/programming-with-cpp-in-unreal-engine)。

UObject 类还可包括仅限本地的属性，这些属性没有用 UFUNCTION 或者 UPROPERTY 说明符标记用于反射。然而，只有用\[说明符\]((programming-and-scripting/programming-language-implementation/unreal-engine-reflection-system/Properties#属性说明符)宏标记过的函数和属性会列举在它们对应的 UCLASS 中。

## 属性和函数类型

UObjects 可拥有成员变量（称作属性）或任意类型的函数。然而，为便于虚幻引擎识别并操控这些变量或函数，它们必须以特殊的宏进行标记，并符合一定类型的标准。如需了解这些标准的细节，请查阅 [属性](/documentation/zh-cn/unreal-engine/unreal-engine-uproperties)和[UFunction](/documentation/zh-cn/unreal-engine/ufunctions-in-unreal-engine)参考页面。

## UObject 创建

UObjects 不支持构造器参数。所有的C++ UObject都会在引擎启动的时候初始化，然后引擎会调用其默认构造器。如果没有默认的构造器，那么 UObject 将不会编译。

UObject 构造器应该轻量化，仅用于设置默认的数值和子对象，构造时不应该调用其它功能和函数。对于 [Actor](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine)和[Actor组件](/documentation/zh-cn/unreal-engine/components-in-unreal-engine)，初始化功能应该输入 `BeginPlay()` 方法。

UObject 应该仅在运行时使用 NewObject 构建，或者将 CreateDefaultSubobject 用于构造器。

方法

描述

[`NewObject<class>`](/documentation/en-us/unreal-engine/API/Runtime/CoreUObject/UObject/NewObject)

使用所有可用创建选项的可选参数创建一个新实例。提供极高的灵活性，包括带自动生成命名的简单使用案例。

`CreateDefaultSubobject<class>`

创建一个组件或者子对象，可以提供创建子类和返回父类的方法。

创建默认子对象时，由于它们在引擎启动时构造，UObject 的类构造器应该仅适用于本地数据或者本地加载的静态资产。

UObjects 永远都不应使用 `new` 运算符。所有的 UObjects 都由虚幻引擎管理内存和垃圾回收。如果通过 new 或者 delete 手动管理内存，可能会导致内存出错。

## UObjects 提供的功能

此系统的使用不为强制要求，甚至有时不适合使用，但却存在以下益处：

-   垃圾回收
-   引用更新

-   反射
-   序列化
-   默认属性变化自动更新
-   自动属性初始化
-   自动编辑器整合
-   运行时类型信息可用
-   网络复制

大部分这些益处适用于 [UStruct](/documentation/zh-cn/unreal-engine/structs-in-unreal-engine)，它有着和 UObject 一样的反射和序列化能力。UStruct 被当作数值类型处理并且不会垃圾回收。更多关于这些系统的细节，请参考 [虚幻Object处理](/documentation/zh-cn/unreal-engine/unreal-object-handling-in-unreal-engine) 文档。

## 虚幻头文件工具

为利用 UObject 派生类型所提供的功能，需要在头文件上为这些类型执行一个预处理步骤，以核对需要的信息。 该预处理步骤由 UnrealHeaderTool（简称 UHT）执行。UObject 派生的类型需要遵守特定的结构。

## 头文件格式

UObject 在源（.cpp）文件中的实现与其他 C++ 类相似，其在头（.h）文件中的定义必须遵守特定的基础结构，以便在虚幻引擎 4 中正常使用。使用编辑器的"New C++ Class"命令是设置格式正确头文件的最简单方法。UObject 派生类的基础头文件可能看起来与此相似，假定 UObject 派生物被称为 UMyObject，其创建时所在的项目被称为 MyProject：

```cpp
	#pragma once

	#include 'Object.h'
	#include 'MyObject.generated.h'
	
	UCLASS()
	class MYPROJECT_API UMyObject : public UObject
	{
		GENERATED_BODY()

	};
```

虚幻引擎特定的部分如下：

```cpp
	#include "MyObject.generated.h"
```

此行预计为此文件中最后一个 `#include` 指令。如此头文件需要了解其他类，可将它们在文件中的任意位置提前声明，或包括在 MyObject.generated.h 上。

```cpp
	UCLASS()
```

`UCLASS` 宏使虚幻引擎能识别 `UMyObject`。此宏支持大量参数[类说明符](/documentation/zh-cn/unreal-engine/class-specifiers)，参数决定类功能的开或关。

```cpp
	class MYPROJECT_API UMyObject : public UObject
```

如 MyProject 希望将 UMyObject 类公开到其他模块，则需要指定 `MYPROJECT_API`。这对游戏项目将包括的模块或插件十分实用。这些模块和插件将故意使类公开，在多个项目间提供可携的自含式功能。

```cpp
	GENERATED_BODY()
```

`GENERATED_BODY` 宏不获取参数，但会对类进行设置，以支持引擎要求的基础结构。所有 `UCLASS` 和 `USTRUCT` 均有此要求。

虚幻头文件工具支持最下C++集。当使用自定义 `#ifdefs` 宏包裹 UCLASS 的部分时，UHT 会忽略不包含 `WITH_EDITOR` 或者 `WITHEDITORONLY_DATA` 宏的宏。

## 更新对象

Ticking 代表虚幻引擎中对象的更新方式。所有Actors均可在每帧被 tick，便于您执行必要的更新计算或操作。

Actor 和 Actor组件在注册时会自动调用它们的 Tick 函数，然而，`UObjects` 不具有嵌入的更新能力。在必须的时候，可以使用 inherits 类说明符从 `FTickableGameObject` 继承即可添加此能力。 这样即可实现 `Tick()` 函数，引擎每帧都将调用此函数。

大部分游戏内对象都是[Actors](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine)，可以按用户设置的最短间隔tick，而不是每帧tick。

## 销毁对象

对象不被引用后，垃圾回收系统将自动进行对象销毁。这意味着没有任何 `UPROPERTY` 指针、引擎容器、`TStrongObjectPtr` 或类实例会拥有任何对它的强引用。

注意，无论对象是否被垃圾回收，[弱指针](/documentation/zh-cn/unreal-engine/weak-pointers-in-unreal-engine)对其都没有影响。

垃圾回收器运行时，寻找到的未引用对象将被从内存中移除。此外，函数`MarkPendingKill()` 可在对象上直接调用。此函数将把指向对象的所有指针设为 `NULL`，并从全局搜索中移除对象。对象将在下一次垃圾回收过程中被完全删除。

[智能指针](/documentation/zh-cn/unreal-engine/smart-pointers-in-unreal-engine)不适用于 UObject。

-   `Object->MarkPendingKill()` 被 `Obj->MarkAsGarbage()` 所替代。这个新的函数现在仅用于追踪旧对象。如果 `gc.PendingKillEnabled=true` ，那么所有标记为 `PendingKill` 的对象会被垃圾回收器自动清空并销毁。
    
-   强引用会将 UObject 保留。如果你不想让这些引用保留 UObject，那么这些引用应该转换来使用弱指针，或者变为一个普通指针由程序员手动清除（如果对性能有较高要求的话）。
    

你可以用弱指针替换强指针，并且在游戏运作时作为垃圾回收取消引用，因为垃圾回收仅在帧之间运行。

-   `IsValid()` 用于检查它是 null 还是垃圾，但是大部分情况下 IsValid 可以被更正规的编程规则替换，比如在调用 `OnDestroy` 事件时将指针清除至 Actor。
    
-   如果禁用了 `PendingKill()`， `MarkGarbage()` 将会提醒对象的所有者该对象将要被销毁，但是对象本身直到所有对它的引用都解除之后才会被垃圾回收。
    
-   对于 Actor，即使 Actor 被调用了 `Destroy()`，并且被从关卡中移除，它还是会等到所有对它的引用都解除之后才会被垃圾回收。
    
-   对于证书持有者的主要区别在于，对花费较大的对象进行垃圾回收的函数 `MarkPendingKill()` 不再起效。
    
-   已有的用于 nullptr 的检查应该被 `IsValid()` 调用所替代，除非你进行手动清除，因为指针不再会被垃圾回收器通过 `MarkPendingKill()` 自动清除。
    

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [UCLASS 宏](/documentation/zh-cn/unreal-engine/objects-in-unreal-engine#uclass%E5%AE%8F)
-   [属性和函数类型](/documentation/zh-cn/unreal-engine/objects-in-unreal-engine#%E5%B1%9E%E6%80%A7%E5%92%8C%E5%87%BD%E6%95%B0%E7%B1%BB%E5%9E%8B)
-   [UObject 创建](/documentation/zh-cn/unreal-engine/objects-in-unreal-engine#uobject%E5%88%9B%E5%BB%BA)
-   [UObjects 提供的功能](/documentation/zh-cn/unreal-engine/objects-in-unreal-engine#uobjects%E6%8F%90%E4%BE%9B%E7%9A%84%E5%8A%9F%E8%83%BD)
-   [虚幻头文件工具](/documentation/zh-cn/unreal-engine/objects-in-unreal-engine#%E8%99%9A%E5%B9%BB%E5%A4%B4%E6%96%87%E4%BB%B6%E5%B7%A5%E5%85%B7)
-   [头文件格式](/documentation/zh-cn/unreal-engine/objects-in-unreal-engine#%E5%A4%B4%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F)
-   [更新对象](/documentation/zh-cn/unreal-engine/objects-in-unreal-engine#%E6%9B%B4%E6%96%B0%E5%AF%B9%E8%B1%A1)
-   [销毁对象](/documentation/zh-cn/unreal-engine/objects-in-unreal-engine#%E9%94%80%E6%AF%81%E5%AF%B9%E8%B1%A1)
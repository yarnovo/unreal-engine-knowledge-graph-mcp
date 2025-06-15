# 在虚幻引擎中创建对象 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-objects-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:40:49.959Z

---

目录

![UObject实例创建](https://dev.epicgames.com/community/api/documentation/image/5d19b458-011f-4280-93c1-9eb67b3a46b0?resizing_type=fill&width=1920&height=335)

## NewObject

`NewObject()` 是最简单的UObject工厂方法。它接受一个可选的外部对象和类，并用自动生成的名称创建一个新实例。

```cpp
	template< class T >
	T* NewObject
	(
		UObject* Outer=(UObject*)GetTransientPackage(),
		UClass* Class=T::StaticClass()
	)
```

参数

说明

`Outer`

可选。一个要设置为待创建对象的外部 `UObject` 。

`Class`

可选。一个用于指定待创建对象类的 `UClass` 。

**返回值**

指向指定类的生成实例指针。

## NewNamedObject

通过允许为新实例指定一个名称以及[对象标记](/documentation/zh-cn/unreal-engine/creating-objects-in-unreal-engine#%E5%AF%B9%E8%B1%A1%E6%A0%87%E8%AE%B0)和一个要指定为参数的模板对象， `NewNamedObject()` 在 `NewObject()` 上展开。

```cpp
	template< class TClass >
	TClass* NewNamedObject
	(
		UObject* Outer,
		FName Name,
		EObjectFlags Flags = RF_NoFlags,
		UObject const* Template=NULL
	)
```

参数

说明

`Outer`

一个要设置为待创建对象的外部的 `UObject` 。

`Name`

一个要设置为新对象的 `名称（Name）` 的 `FName` 。

`Flags`

可选。描述新对象的 `FObjectFlags` 枚举值。

`Template`

可选。创建新对象时用作模板的 `UObject` 。

**返回值**

指向指定类的生成实例指针。

## ConstructObject

为了获得完全的灵活性，可以使用 `ConstructObject()` 函数创建 `UObjects` 的新实例。此函数调用 `StaticConstructObject()` ，它分配对象，执行 `ClassConstructor` ，并执行任何初始化，如加载配置属性，加载本地化属性和实例化组件。

```cpp
	template< class T >
	T* ConstructObject
	(
		UClass* Class,
		UObject* Outer = (UObject*)GetTransientPackage(),
		FName Name=NAME_None,
		EObjectFlags SetFlags=RF_NoFlags,
		UObject const* Template=NULL,
		bool bCopyTransientsFromClassDefaults=false,
		struct FObjectInstancingGraph* InstanceGraph=NULL
	)
```

参数

说明

`Class`

一个用于指定待创建对象的类的 `UClass` 。

`Outer`

可选。一个要设置为待创建对象的外部 `UObject` 。

`Name`

可选。一个要设置为新对象的 `名称（Name）` 的 `FName` 。

`SetFlags`

可选。描述新对象的 `EObjectFlags` 枚举值。

`Template`

可选。创建新对象时用作模板的 `UObject` 。

`bCopyTransientsFromClassDefaults`

可选。一个 `布尔值` ，它决定是否从类默认对象（而不是传入的原型指针）复制瞬态属性。如果 `true` ，使用类默认对象的瞬态。

`FObjectInstancingGraph`

可选。 `FObjectInstancingGraph` 结构体，包含实例化对象和组件到其模板的映射。用于实例化新对象所拥有的组件。

**返回值**

指向指定类的生成实例指针。

## 对象标记

`EObjectFlags` 枚举用于快速而简洁地描述对象。有各种各样的标志来描述对象的类型、垃圾收集如何处理它、对象在其生命周期中所处的阶段等等。还有特殊的全掩码或无掩码和预定义的标记组。

标记

值

说明

**Object Type**

 

 

RF\_Public

`0x00000001`

对象在包含它的包外部是可见的。

RF\_Standalone

`0x00000002`

即使没有被任何东西引用，对象也会被保留以供编辑。

RF\_Native

`0x00000004`

对象是本地对象。这仅用于 `UClass` 对象。

RF\_Transactional

`0x00000008`

对象是事务对象。

RF\_ClassDefaultObject

`0x00000010`

对象是其类的默认对象，即该类的新实例在创建时使用的默认模板。

RF\_ArchetypeObject

`0x00000020`

对象是另一个对象的模板。它被视为一个类默认对象。

RF\_Transient

`0x00000040`

对象不保存到磁盘。

**垃圾回收**

 

 

RF\_RootSet

`0x00000080`

即使对象没有被任何东西引用，它也不是被回收的垃圾。

RF\_IsLazyReferenced

`0x00000100`

对象由一个延迟指针引用，删除时需要额外的清理。

RF\_Unreachable

`0x00000200`

对象图表上不能访问该对象。

RF\_TagGarbageTemp

`0x00000400`

对象被标记为供使用垃圾回收的各种实用程序所使用。此标记不由垃圾回收器本身解释。

**对象生命周期**

 

 

RF\_NeedLoad

`0x00000800`

对象需要加载。

RF\_AsyncLoading

`0x00001000`

对象是异步加载的。

RF\_NeedPostLoad

`0x00002000`

对象需要后加载。

RF\_NeedPostLoadSubobjects

`0x00004000`

对象仍然需要实例化子对象并修复序列化的组件引用

*RF\_PendingKill*

`0x00008000`

对象正在等待销毁。基于游戏进程目的将对象标记为无效，但仍然是有效的对象。

RF\_BeginDestroyed

`0x00010000`

对象已经调用了 `BeginDestroy()` 。

RF\_FinishDestroyed

`0x00020000`

对象已经调用了 `FinishDestroy()` 。

**特殊遮罩**

 

 

RF\_AllFlags

`0x0003ffff`

对象具有所有标记。主要用于错误检查。

RF\_NoFlags

`0x00000000`

对象不具有标记。用于避免类型转换。

**预定义的组**

 

 

RF\_Load

`RF_Public | RF_Standalone | RF_Native | RF_Transactional | RF_ClassDefaultObject | RF_ArchetypeObject`

从虚幻文件加载的标记。

RF\_PropagateToSubobjects

`RF_Public | RF_ArchetypeObject | RF_Transactional`

子对象从其超对象继承的标记。

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [NewObject](/documentation/zh-cn/unreal-engine/creating-objects-in-unreal-engine#newobject)
-   [NewNamedObject](/documentation/zh-cn/unreal-engine/creating-objects-in-unreal-engine#newnamedobject)
-   [ConstructObject](/documentation/zh-cn/unreal-engine/creating-objects-in-unreal-engine#constructobject)
-   [对象标记](/documentation/zh-cn/unreal-engine/creating-objects-in-unreal-engine#%E5%AF%B9%E8%B1%A1%E6%A0%87%E8%AE%B0)
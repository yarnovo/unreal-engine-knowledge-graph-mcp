# Spawning Actors in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/spawning-actors-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:46:54.978Z

---

目录

![生成 Actors](https://dev.epicgames.com/community/api/documentation/image/04f39e5f-5d1f-452a-9558-7ae463fe1d34?resizing_type=fill&width=1920&height=335)

## SpawnActor 方法

创建一个新的 **Actor** 示例的过程称为 **生成** 。生成 Actors 的过程是使用 `UWorld::SpawnActor()` 函数完成的。该函数创建指定类的一个新实例 并返回到那个新创建的 *Actor* 的指针。`UWorld::SpawnActor()` 仅用于创建在继承于 Actor 的类的实例。

```cpp
	AActor* UWorld::SpawnActor
	(
		UClass*			Class,
		FName			InName,
		FVector const*	Location,
		FRotator const*	Rotation,
		AActor*			Template,
		bool			bNoCollisionFail,
		bool			bRemoteOwned,
		AActor*			Owner,
		APawn*			Instigator,
		bool			bNoFail,
		ULevel*			OverrideLevel,
		bool			bDeferConstruction
	)

```

参数

描述

`Class`

一个 `UClass` ，指出了要生成的 Actor 的类。

`InName`

（可选）`FName` ，用作为新生成的 Actor 的 `名称` 。如果没有指定值，那么则将使用 *\[Class\]\_\[Number\]* 的形式自动生成所产生的 Actor 的名称。

`Location`

（可选）一个 `FVector` ，提供了生成的 Actor 的初始位置。

`Rotation`

（可选）一个 `FVector` ，提供了生成的 Actor 的初始旋转度。

`Template`

（可选）一个 `AActor` ，用作为生成新 Actor 时使用的模板。所生成的 Actor 将使用模板 Actor 的属性值进行初始化。如果没有指定模板 Actor ，那么将使用类默认对象(CDO)来初始化所生成的 Actor 。

`bNoCollisionFail`

（可选）一个 `bool` 值，决定生成 Actor 时是否执行碰撞测试。如果为 `true` ，那么无论根组件或模板 Actor 的碰撞设置为什么，在生成 Actor 时都不执行碰撞测试。

`bRemoteOwned`

（可选）`布尔值` 。

`Owner`

（可选）拥有所生成的 Actor 的 `AActor` 。

`Instigator`

（可选）`APawn` ，导致所生成的 Actor 施加伤害的挑衅者。

`bNoFail`

（可选）一个布尔值，决定了如果某些条件不满足，生成Actor是否失败。如果为 `true` ，那么生成过程将会失败，因为所生成的类是 `bStatic=true` ，或者因为模板 Actor 和正在生成的 Actor 的类不一样。

`OverrideLevel`

（可选）在其中生成 Actor 的 `ULevel` ，也就是 Actor 的外部容器。如果没有指定关卡，那么则使用使用 `Owner` 的 `Outer（外部容器）` 。如果没有指定 `Owner` ，则使用永久性关卡。

`bDeferConstruction`

（可选）一个布尔值，决定是否运行构建脚本。如果为 `true` ，那么将不会在生成的 Actor 上运行构建脚本。仅当正在从 [蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine) 中生成 Actor 时适用。

**返回值**

 

生成的 Actor 是以 `AActor` 指针的形式呈现。返回值必须类型转换为 `Class` 参数指定的衍生类型。

 

### 用法

```cpp
	AKAsset* SpawnedActor1 = (AKAsset*) GetWorld()->SpawnActor(AKAsset::StaticClass(), NAME_None, &Location);
```

## 生成函数的模板

为了使得生成 Actors 的过程更加方便，我们提供了几个常用的函数模板。这些函数使得创建 Actor 变得更加简单，因为它们仅需要 少量的参数，并允许指定返回的 Actor 的类型。

### 生成T实例, 返回T指针

这个函数模板在相同的位置处、以相同的旋转度生成该模板类 `T` 的实例，作为执行生成操作的 Actor 的根组件，并返回 到和那个模板类一样类型的实例的指针，也就是 `T*` 。您可以指定拥有者 Actor 、挑衅的 Pawn ，及指定如果生成的 Actor 会侵占或碰撞 另一个世界中已经存在的 Actor 生成操作是否失败。

```cpp
	/** Spawns and returns class T, respects default rotation and translation of root component. */
	template< class T >
	T* SpawnActor
	(
		AActor* Owner=NULL,
		APawn* Instigator=NULL,
		bool bNoCollisionFail=false
	)
	{
		return (T*)(GetWorld()->SpawnActor(T::StaticClass(), NAME_None, NULL, NULL, NULL, bNoCollisionFail, false, Owner, Instigator));
	}
```

#### 用法

```cpp
	MyHUD = SpawnActor<AHUD>(this, Instigator);
```

### 使用变换生成T实例，返回T指针

该函数模板在指定 `位置` 处使用指定的 `旋转度`生成模板类 `T` 的实例，并返回和那个模板类类型一样的实例的指针， 也就是 `T*` 。除了位置和旋转度外，还可以指定拥有者 Actor 、挑衅的 Pawn ，及指定如果生成的 Actor 会侵占或碰撞 另一个世界中已经存在的 Actor 生成操作是否失败。

```cpp
	/** Spawns and returns class T, forcibly sets world position. */
	template< class T >
	T* SpawnActor
	(
		FVector const& Location,
		FRotator const& Rotation,
		AActor* Owner=NULL,
		APawn* Instigator=NULL,
		bool bNoCollisionFail=false
	)
	{
		return (T*)(GetWorld()->SpawnActor(T::StaticClass(), NAME_None, &Location, &Rotation, NULL, bNoCollisionFail, false, Owner, Instigator));
	}
```

#### 用法

```cpp
	Controller = SpawnActor<AController>(GetLocation(), GetRotation(), NULL, Instigator, true);
```

### 生成类实例, 返回T 指针

这个函数模板在相同的位置处、以相同的旋转度生成指定 `Class（类）` 的实例，作为执行生成操作的 Actor 的根组件，并返回 到和那个模板类一样类型的实例的指针，也就是 `T*` 。这要求指定的 `Class（类）` 必须是模板类 `T` 的子类。除了类外，您还可以指定 拥有者 Actor 、挑衅的 Pawn ，及指定如果生成的 Actor 会侵占或碰撞另一个世界中已经存在的 Actor 生成操作 是否失败。

```cpp
	/** Spawns given class and returns class T pointer, respects default rotation and translation of root component. */
	template< class T >
	T* SpawnActor
	(
		UClass* Class,
		AActor* Owner=NULL,
		APawn* Instigator=NULL,
		bool bNoCollisionFail=false
	)
	{
		return (Class != NULL) ? Cast<T>(GetWorld()->SpawnActor(Class, NAME_None, NULL, NULL, NULL, bNoCollisionFail, false, Owner, Instigator)) : NULL;
	}
```

#### 用法

```cpp
	MyHUD = SpawnActor<AHUD>(NewHUDClass, this, Instigator);
```

### 使用变换生成类实例，返回T指针

该函数模板在指定 `位置` 处使用指定的 `旋转度`生成指定类 `类` 的实例，并返回和那个模板类类型一样的实例的指针， 也就是 `T*` 。这要求指定的 `Class（类）` 必须是模板类 `T` 的子类。除了类、位置及旋转度外，还可以指定拥有者 Actor 、挑衅的的 Pawn ， 及指定如果生成的 Actor 会侵占或碰撞另一个世界中已经存在的 Actor 生成操作

```cpp
	/** Spawns given class and returns class T pointer, forcibly sets world position. */
	template< class T >
	T* SpawnActor
	(
		UClass* Class,
		FVector const& Location,
		FRotator const& Rotation,
		AActor* Owner=NULL,
		APawn* Instigator=NULL,
		bool bNoCollisionFail=false
	)
	{
		return (Class != NULL) ? Cast<T>(GetWorld()->SpawnActor(Class, NAME_None, &Location, &Rotation, NULL, bNoCollisionFail, false, Owner, Instigator)) : NULL;
	}
```

#### 用法

```cpp
	APawn* ResultPawn = SpawnActor<APawn>(DefaultPawnClass, StartLocation, StartRotation, NULL, Instigator);
```

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [SpawnActor 方法](/documentation/zh-cn/unreal-engine/spawning-actors-in-unreal-engine#spawnactor%E6%96%B9%E6%B3%95)
-   [用法](/documentation/zh-cn/unreal-engine/spawning-actors-in-unreal-engine#%E7%94%A8%E6%B3%95)
-   [生成函数的模板](/documentation/zh-cn/unreal-engine/spawning-actors-in-unreal-engine#%E7%94%9F%E6%88%90%E5%87%BD%E6%95%B0%E7%9A%84%E6%A8%A1%E6%9D%BF)
-   [生成T实例, 返回T指针](/documentation/zh-cn/unreal-engine/spawning-actors-in-unreal-engine#%E7%94%9F%E6%88%90t%E5%AE%9E%E4%BE%8B,%E8%BF%94%E5%9B%9Et%E6%8C%87%E9%92%88)
-   [用法](/documentation/zh-cn/unreal-engine/spawning-actors-in-unreal-engine#%E7%94%A8%E6%B3%95-2)
-   [使用变换生成T实例，返回T指针](/documentation/zh-cn/unreal-engine/spawning-actors-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%8F%98%E6%8D%A2%E7%94%9F%E6%88%90t%E5%AE%9E%E4%BE%8B%EF%BC%8C%E8%BF%94%E5%9B%9Et%E6%8C%87%E9%92%88)
-   [用法](/documentation/zh-cn/unreal-engine/spawning-actors-in-unreal-engine#%E7%94%A8%E6%B3%95-3)
-   [生成类实例, 返回T 指针](/documentation/zh-cn/unreal-engine/spawning-actors-in-unreal-engine#%E7%94%9F%E6%88%90%E7%B1%BB%E5%AE%9E%E4%BE%8B,%E8%BF%94%E5%9B%9Et%E6%8C%87%E9%92%88)
-   [用法](/documentation/zh-cn/unreal-engine/spawning-actors-in-unreal-engine#%E7%94%A8%E6%B3%95-4)
-   [使用变换生成类实例，返回T指针](/documentation/zh-cn/unreal-engine/spawning-actors-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%8F%98%E6%8D%A2%E7%94%9F%E6%88%90%E7%B1%BB%E5%AE%9E%E4%BE%8B%EF%BC%8C%E8%BF%94%E5%9B%9Et%E6%8C%87%E9%92%88)
-   [用法](/documentation/zh-cn/unreal-engine/spawning-actors-in-unreal-engine#%E7%94%A8%E6%B3%95-5)
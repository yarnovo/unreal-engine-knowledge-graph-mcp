# Weak Pointers in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/weak-pointers-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:41:30.412Z

---

目录

![弱指针](https://dev.epicgames.com/community/api/documentation/image/b825e503-7fd9-40e5-97ab-9dc6cdea8037?resizing_type=fill&width=1920&height=335)

**弱指针** 存储对象的弱引用。与 **共享指针** 或 **共享引用** 不同，弱指针不会阻止其引用的对象被销毁。

在访问弱指针引用的对象前，应使用 `Pin` 函数生成共享指针。此操作确保使用该对象时其将继续存在。如只需要确定弱指针是否引用对象，可将其与 `nullptr` 比较，或在之上调用 `IsValid`。

弱指针的使用有助于授予意图——弱指针表明对引用对象的观察，而无需所有权，同时不控制其生命周期。

## 声明、初始化和分配

可创建空白弱指针，或在共享引用、共享指针或其他弱指针中进行。

```cpp
	//分配新的数据对象，并创建对其的强引用。
	TSharedRef<FMyObjectType> ObjectOwner = MakeShared<FMyObjectType>();
	//创建指向新数据对象的弱指针。
	TWeakPtr<FMyObjectType> ObjectObserver(ObjectOwner);

```

弱指针不会阻止对象被销毁。在范例中，无论 `ObjectOwner` 是否在范围内，重置 `ObjectOwner` 都将销毁对象：

```cpp
	//假设ObjectOwner是其对象的唯一拥有者，ObjectOwner停止引用该对象时，该对象将被销毁。
	ObjectOwner.Reset();
	//ObjectOwner引用空对象，因此Pin()生成的共享指针将也将为空。被视为布尔时，空白共享指针的值为false。
	if (ObjectObserver.Pin())
	{
		//只当ObjectOwner非对象的唯一拥有者时，此代码才会运行。
		check(false);
	}

```

与共享指针相同，弱指针是否引用有效对象，均可进行安全复制：

```cpp
	TWeakPtr<FMyObjectType> AnotherObjectObserver = ObjectObserver;

```

使用完弱指针后，可进行重置。

```cpp
	//可通过将弱指针设为nullptr进行重置。
	ObjectObserver = nullptr;
	//也可使用重置函数。
	AnotherObjectObserver.Reset();

```

### 转换为共享指针

`Pin` 函数将创建指向弱指针对象的共享指针。只要共享指针在范围内且引用对象，则该对象将持续有效。此外，共享指针（包括由 `Pin` 函数返回的指针）可在条件句中作为 `布尔` 类型进行求值，其中 `true` 表示有效对象。以下代码模式检查弱指针是否引用有效对象。如是，至少在共享指针（由 `Pin` 函数创建）超出范围或被显式清除前，将保证其持续有效。

```cpp
	//获取弱指针中的共享指针，并检查其是否引用有效对象。
	if (TSharedPtr<FMyObjectType> LockedObserver = ObjectObserver.Pin())
	{
		//共享指针仅在此范围内有效。
		//该对象已被验证为存在，而共享指针阻止其被删除。
		LockedObserver->SomeFunction();
	}

```

## 取消引用和访问

要访问弱指针的对象，首需使用 `Pin` 函数，将其提升为共享指针。然后可通过共享指针或弱指针上的 `Get` 函数进行访问。此方法可确保使用该对象时，其将持续有效。

## 打破引用循环

两个或多个对象使用智能指针保持彼此间的强引用时，将出现引用循环。在此类情况下，对象间会相互保护以免被删除。各对象固定被另一对象引用，因此对象无法在另一对象存在时被删除。如外部对象未对引用循环中对象进行引用，其实际上将出现泄漏。弱指针不会保留自身引用的对象，因此其可中断此类引用循环。要在未拥有对象时对其进行引用，并延长其寿命时，可使用软指针。

## 使用警告

如不想保证数据对象会持续存在时，弱指针将非常有用，但该属性可能会变得异常危险。在以下情况中请谨慎使用弱指针：

-   \*\*在[Set](/documentation/zh-cn/unreal-engine/set-containers-in-unreal-engine)或[Map](/documentation/zh-cn/unreal-engine/map-containers-in-unreal-engine)中用作键。弱指针可能会在未通知容器的情况下随时无效，因此共享指针或共享引用更适用于充当键。可安全地将弱指针用作数值。
    
-   虽然弱指针提供 `IsValid` 函数，但是检查 `IsValid` 无法保证对象在任何时间长度内均可持续有效。线程安全共享指针可能会因另一线程上的活动而随时无效，因此使用线程安全共享指针应尤其注意。`Pin` 返回的共享指针将使对象在代码将其清除或其超出范围前保持活跃状态，因此 `Pin` 函数是用于检查的首选方法，此类检查会导致取消引用或访问存储对象。
    

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [声明、初始化和分配](/documentation/zh-cn/unreal-engine/weak-pointers-in-unreal-engine#%E5%A3%B0%E6%98%8E%E3%80%81%E5%88%9D%E5%A7%8B%E5%8C%96%E5%92%8C%E5%88%86%E9%85%8D)
-   [转换为共享指针](/documentation/zh-cn/unreal-engine/weak-pointers-in-unreal-engine#%E8%BD%AC%E6%8D%A2%E4%B8%BA%E5%85%B1%E4%BA%AB%E6%8C%87%E9%92%88)
-   [取消引用和访问](/documentation/zh-cn/unreal-engine/weak-pointers-in-unreal-engine#%E5%8F%96%E6%B6%88%E5%BC%95%E7%94%A8%E5%92%8C%E8%AE%BF%E9%97%AE)
-   [打破引用循环](/documentation/zh-cn/unreal-engine/weak-pointers-in-unreal-engine#%E6%89%93%E7%A0%B4%E5%BC%95%E7%94%A8%E5%BE%AA%E7%8E%AF)
-   [使用警告](/documentation/zh-cn/unreal-engine/weak-pointers-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%AD%A6%E5%91%8A)
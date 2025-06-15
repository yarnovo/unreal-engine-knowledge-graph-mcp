# Shared References in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/shared-references-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:41:33.913Z

---

目录

![共享引用](https://dev.epicgames.com/community/api/documentation/image/0419f09f-2d40-49aa-9165-a299ea98ebf7?resizing_type=fill&width=1920&height=335)

**共享引用** 是一类强大且不可为空的 **智能指针**，其被用于引擎的 `Uobject` 系统外的数据对象。此意味无法重置共享引用、向其指定空对象，或创建空白引用。因此共享引用固定包含有效对象，甚至未拥有 `IsValid` 方法。在共享引用和 **[共享指针](/documentation/zh-cn/unreal-engine/shared-pointers-in-unreal-engine)** 间选择时，除非需要空白或可为空的对象，否则共享引用为优先选项。如需可能空白或可为空的引用，则应使用共享指针。

与标准的C++引用不同，可在创建后将共享引用重新指定到另一对象。

## 声明和初始化

共享引用不可为空，因此初始化需要数据对象。在无有效对象的情况下尝试创建的共享引用将不会编译，并尝试将共享引用初始化为空指针变量。

```cpp
	//创建新节点的共享引用
	TSharedRef<FMyObjectType> NewReference = MakeShared<FMyObjectType>();

```

在无有效对象的情况下尝试创建的共享引用将不会编译：

```cpp
	//以下两者均不会编译：
	TSharedRef<FMyObjectType> UnassignedReference;
	TSharedRef<FMyObjectType> NullAssignedReference = nullptr;
	//以下会编译，但如NullObject实际为空则断言。
	TSharedRef<FMyObjectType> NullAssignedReference = NullObject;

```

## 共享指针和共享引用间的转换

共享指针和共享引用间的转换十分常见。共享引用会隐式转换为共享指针，并为新共享指针引用有效对象提供额外保证。使用普通语法处理转换：

```cpp
	TSharedPtr<FMyObjectType> MySharedPointer = MySharedReference;

```

如共享指针引用非空对象，即可使用 `共享指针` 函数 `ToSharedRef`，在共享指针中创建共享引用。尝试在空共享指针中创建共享引用，将导致程序断言。

```cpp
	//在取消引用前，确保共享指针为有效，避免潜在断言。
	If (MySharedPointer.IsValid())
	{
		MySharedReference = MySharedPointer.ToSharedRef();
	}

```

## 比较

可测试共享引用彼此是否相等。在此情况下，相等表示引用相同对象。

```cpp
	TSharedRef<FMyObjectType> ReferenceA, ReferenceB;
	if (ReferenceA == ReferenceB)
	{
		// ...
	}
```

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [声明和初始化](/documentation/zh-cn/unreal-engine/shared-references-in-unreal-engine#%E5%A3%B0%E6%98%8E%E5%92%8C%E5%88%9D%E5%A7%8B%E5%8C%96)
-   [共享指针和共享引用间的转换](/documentation/zh-cn/unreal-engine/shared-references-in-unreal-engine#%E5%85%B1%E4%BA%AB%E6%8C%87%E9%92%88%E5%92%8C%E5%85%B1%E4%BA%AB%E5%BC%95%E7%94%A8%E9%97%B4%E7%9A%84%E8%BD%AC%E6%8D%A2)
-   [比较](/documentation/zh-cn/unreal-engine/shared-references-in-unreal-engine#%E6%AF%94%E8%BE%83)
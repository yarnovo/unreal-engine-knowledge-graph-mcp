# Shared Pointers in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/shared-pointers-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:41:26.876Z

---

目录

![共享指针](https://dev.epicgames.com/community/api/documentation/image/ea6b055d-9d0b-41ec-9ae7-039dc912b755?resizing_type=fill&width=1920&height=335)

**共享指针（Shared Pointers）** 是指既健壮、又能为空指针的智能指针。共享指针沿袭了普通智能指针的所有优点，它能避免出现内存泄漏、悬挂指针，还能避免指针指向未初始化的内存。但它们还有一些其他特点，例如：

-   **共享所有权（Shared Ownership）：** 引用计数支持多个共享指针，以确保它们引用的数据对象永远不被删除，前提是它们中的任意一个仍指向数据对象。
    
-   **自动失效（Automatic Invalidation）：** 你可安全引用易变对象，无需担心出现悬挂指针。
    
-   **弱引用：** [弱指针](/documentation/zh-cn/unreal-engine/weak-pointers-in-unreal-engine)可中断引用循环。
    
-   **意向指示（Indication of Intent）：** 区分拥有者（参见[共享引用](/documentation/zh-cn/unreal-engine/shared-references-in-unreal-engine)）和观察者，并提供不可为空的引用。
    

共享指针有一些值得注意的基本特性，包括：

-   语法非常健壮
    
-   非侵入式（但能反射）
    
-   线程安全（视情况而定）
    
-   性能佳，占用内存少
    

共享指针类似于[共享引用](/documentation/zh-cn/unreal-engine/shared-references-in-unreal-engine)，主要区别在于共享引用不可为空，因此会始终引用有效对象。在共享引用和共享指针之间进行选择时，除非需要空对象或可为空的对象，否则建议你优先选择共享引用。

## 声明和初始化

因为共享指针可为空，所以无论有无数据对象，都可以对它们进行初始化。以下是创建共享指针的一些示例：

```cpp
	// 创建一个空白的共享指针
	TSharedPtr<FMyObjectType> EmptyPointer;
	// 为新对象创建一个共享指针
	TSharedPtr<FMyObjectType> NewPointer(new FMyObjectType());
	// 从共享引用创建一个共享指针
	TSharedRef<FMyObjectType> NewReference(new FMyObjectType());
	TSharedPtr<FMyObjectType> PointerFromReference = NewReference;
	// 创建一个线程安全的共享指针
	TSharedPtr<FMyObjectType, ESPMode::ThreadSafe> NewThreadsafePointer = MakeShared<FMyObjectType, ESPMode::ThreadSafe>(MyArgs);

```

在第二个示例中，`NodePtr` 实际上拥有新的 `FMyObjectType` 对象，因为没有其他共享指针引用该对象。如果 `NodePtr` 超出范围，并且没有其他共享指针或共享引用指向该对象，那么该对象将被销毁。

复制共享指针时，系统将向它引用的对象添加一个引用。

```cpp
	// 增加任意对象ExistingSharedPointer引用的引用数。
	TSharedPtr<FMyObjectType> AnotherPointer = ExistingSharedPointer;

```

对象将持续存在，直到不再有共享指针（或共享引用）引用它为止。

你可以使用 `Reset` 函数、或分配一个空指针来重设共享指针，如下所示：

```cpp
	PointerOne.Reset();
	PointerTwo = nullptr;
	// PointerOne和PointerTwo现在都引用nullptr。

```

你可以使用 `MoveTemp`（或 `MoveTempIfPossible`）函数将一个共享指针的内容转移到另一个共享指针，将原始的共享指针保留为空：

```cpp
	// 将PointerOne的内容移至PointerTwo。在此之后，PointerOne将引用nullptr。
	PointerTwo = MoveTemp(PointerOne);
	// 将PointerTwo的内容移至PointerOne。在此之后，PointerTwo将引用nullptr。
	PointerOne = MoveTempIfPossible(PointerTwo);

```

`MoveTemp` 和 `MoveTempIfPossible` 的唯一不同之处在于 `MoveTemp` 包含静态断言，强制其只能在非常量左值（lvalue）上执行。

### 在共享指针与共享引用之间进行转换

在共享指针与共享引用之间进行转换是一种常见的做法。共享引用隐式地转换为共享指针，并提供新的共享指针将引用有效对象的额外保证。转换由普通语法处理：

```cpp
	TSharedPtr<FMyObjectType> MySharedPointer = MySharedReference;

```

只要共享指针引用了一个非空对象，你就可以使用 `Shared Pointer` 函数 `ToSharedRef` 从此共享指针创建一个共享引用。试图从空共享指针创建共享引用将导致程序断言。

```cpp
	// 在解引用之前，请确保共享指针有效，以避免可能出现的断言。
	if (MySharedPointer.IsValid())
	{
		MySharedReference = MySharedPointer.ToSharedRef();
	}

```

## 对比

你可以测试共享指针彼此间的相等性。在此情境中，相等被定义为两个共享指针引用同一对象。

```cpp
	TSharedPtr<FTreeNode> NodeA, NodeB;
	if (NodeA == NodeB)
	{
		// ...
	}

```

`IsValid` 函数和 `bool` 运算符有助于判断共享指针是否引用了有效对象。你还可以调用 `Get`，查看它是否返回有效的（非空）对象指针。

```cpp
	if (Node.IsValid())
	{
		// ...
	}
	if (Node)
	{
		// ...
	}
	if (Node.Get() != nullptr)
	{
		// ...
	}

```

## 解引用和访问

你可以像使用普通C++指针那样解引用，调用方法和访问成员。你也可以像使用其他C++指针那样，通过调用 `IsValid` 函数或使用重载的 `bool` 运算符，在取消引用之前执行空检查。

```cpp
	// 在解引用前，检查节点是否引用了一个有效对象。
	if (Node)
	{
		// 以下三行代码中的任意一行都能解引用节点，并且对它的对象调用ListChildren：
		Node->ListChildren();
		Node.Get()->ListChildren();
		(*Node).ListChildren();
	}

```

## 自定义删除器

共享指针和共享引用支持对它们引用的对象使用自定义删除器。如需运行自定义删除代码，请提供lambda函数，作为创建智能指针时使用的参数，就像这样：

```cpp
	void DestroyMyObjectType(FMyObjectType* ObjectAboutToBeDeleted)
	{
		// 此处添加删除代码。
	}
	// 这些函数使用自定义删除器创建指南指针。
	TSharedRef<FMyObjectType> NewReference(new FMyObjectType(), [](FMyObjectType* Obj){ DestroyMyObjectType(Obj); });

	TSharedPtr<FMyObjectType> NewPointer(new FMyObjectType(), [](FMyObjectType* Obj){ DestroyMyObjectType(Obj); });
```

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [声明和初始化](/documentation/zh-cn/unreal-engine/shared-pointers-in-unreal-engine#%E5%A3%B0%E6%98%8E%E5%92%8C%E5%88%9D%E5%A7%8B%E5%8C%96)
-   [在共享指针与共享引用之间进行转换](/documentation/zh-cn/unreal-engine/shared-pointers-in-unreal-engine#%E5%9C%A8%E5%85%B1%E4%BA%AB%E6%8C%87%E9%92%88%E4%B8%8E%E5%85%B1%E4%BA%AB%E5%BC%95%E7%94%A8%E4%B9%8B%E9%97%B4%E8%BF%9B%E8%A1%8C%E8%BD%AC%E6%8D%A2)
-   [对比](/documentation/zh-cn/unreal-engine/shared-pointers-in-unreal-engine#%E5%AF%B9%E6%AF%94)
-   [解引用和访问](/documentation/zh-cn/unreal-engine/shared-pointers-in-unreal-engine#%E8%A7%A3%E5%BC%95%E7%94%A8%E5%92%8C%E8%AE%BF%E9%97%AE)
-   [自定义删除器](/documentation/zh-cn/unreal-engine/shared-pointers-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%88%A0%E9%99%A4%E5%99%A8)
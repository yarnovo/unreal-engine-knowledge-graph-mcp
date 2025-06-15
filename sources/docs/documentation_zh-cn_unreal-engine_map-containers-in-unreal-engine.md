# 虚幻引擎中的映射容器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/map-containers-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:41:51.829Z

---

目录

![TMap](https://dev.epicgames.com/community/api/documentation/image/0e981956-87e6-4be9-a156-b0ae43ca9e9c?resizing_type=fill&width=1920&height=335)

继[TArray](/documentation/zh-cn/unreal-engine/array-containers-in-unreal-engine)之后，**虚幻引擎** 中最常用的容器是[TMap](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMap)。**TMap** 与[TSet](/documentation/zh-cn/unreal-engine/set-containers-in-unreal-engine)类似，它们的结构均基于对键进行哈希运算。但与[TSet](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TSet)不同的是，TMap将数据存储为键值对（`TPair<KeyType, ValueType>`），只将键用于存储和获取。

## 虚幻引擎中的映射类型

虚幻引擎中的映射有两种类型：

-   [TMap](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMap)
-   [TMultiMap](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMultiMap)

## TMap概述

-   在TMap中，键值对被视为映射的元素类型，相当于每一对都是个体对象。在本文中，元素就意味着键值对，而各个组件就被称作元素的键或元素的值。
-   元素类型是 `TPair<KeyType, ElementType>`，但很少需要直接引用TPair类型。
-   TMap键是唯一的。
-   和TArray一样，TMap也是同质容器，就是说它所有元素的类型都应完全相同。
-   TMap是值类型，支持通常的复制、赋值和析构函数运算，以及它的元素的强所有权。在映射被销毁时，它的元素都会被销毁。键和值也必须为值类型。
-   TMap是一种哈希容器，这意味着键类型必须支持[GetTypeHash](/documentation/en-us/unreal-engine/API/Runtime/Core/GenericPlatform/GetTypeHash)函数，并提供 `operator==` 来比较各个键是否等值。

### TMultiMap概述

-   支持存储多个相同的键。
-   在使用匹配现有键值对的键向TMap添加新键值对时，新的键值对将替换掉旧的。
-   在TMultiMap中，容器可以同时存储新旧键值对。

TMap可使用任选分配器来控制内存分配行为。但不同于TArra\`，这些是集合分配器，而不是[FHeapAllocator](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/FHeapAllocator)和[TInlineAllocator](/documentation/en-us/unreal-engine/API/Runtime/TraceLog/TInlineAllocator)之类的标准虚幻分配器。**集合分配器**（[TSetAllocator](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TSetAllocator)）定义映射应使用的哈希桶数量，以及应使用哪个标准UE分配器来存储哈希值和元素。

`KeyFuncs` 是最后一个TMap模板参数，该参数告知映射如何从元素类型获取键，如何比较两个键是否相等，以及如何对键进行哈希计算。这些参数有默认值，它们只会返回对键的引用，使用 `operator==` 确定相等性，并调用非成员[GetTypeHash](/documentation/en-us/unreal-engine/API/Runtime/Core/GenericPlatform/GetTypeHash)函数进行哈希计算。如果你的键类型支持这些函数，可使用它作为映射键，不需要提供自定义 `KeyFuncs`。

与TArray不同的是，内存中TMap元素的相对排序既不可靠也不稳定，对这些元素进行迭代很可能会使它们返回的顺序和它们添加的顺序有所不同。这些元素不太可能在内存中连续排列。

映射的支持数据结构是基础数组，这种数组可有效支持元素之间的空位。当元素从映射中被移除时，稀疏数组中就会出现空位。将新的元素添加到数组可填补这些空位。但是，即便TMap不会打乱元素来填补空位，指向映射元素的指针仍然可能失效，因为如果存储器被填满，又添加了新的元素，整个存储可能会重新分配。

## 创建和填充映射

`TMap` 的创建方法如下：

```cpp
TMap<int32, FString> FruitMap;
```

`FruitMap` 现在是一个字符串的空TMap，该字符串由整数键标识。我们既没有指定分配器，也没有指定 `KeyFuncs`，所以映射将执行标准的堆分配，使用 `operator==` 对 `int32` 类型的键进行对比，并使用[`GetTypeHash`](/documentation/en-us/unreal-engine/API/Runtime/Core/GenericPlatform/GetTypeHash)进行哈希运算。此时没有分配任何内存。

### Add

填充映射的标准方法是调用带一个键和值的[`Add`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/Add)函数：

```cpp
FruitMap.Add(5, TEXT("Banana"));
FruitMap.Add(2, TEXT("Grapefruit"));
FruitMap.Add(7, TEXT("Pineapple"));
// FruitMap == [
// 	{ Key: 5, Value: "Banana"     },
// 	{ Key: 2, Value: "Grapefruit" },
// 	{ Key: 7, Value: "Pineapple"  }
// ]
```

此处的元素按插入顺序排列，但并不能保证它们在内存中的实际顺序。如果是新的映射，可能会保留插入排序，但插入和删除的次数越多，新元素不出现在末尾的可能性就越大。

这不是 `TMultiMap`，所以各个键都必定是唯一。如果尝试添加重复键，将发生以下情况：

```cpp
FruitMap.Add(2, TEXT("Pear"));
// FruitMap == [
// 	{ Key: 5, Value: "Banana"    },
// 	{ Key: 2, Value: "Pear"      },
// 	{ Key: 7, Value: "Pineapple" }
// ]
```

映射仍然包含3个元素，但之前键值为2的Grapefruit已被Pear替代。

[`Add`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/Add)函数可接受不带值的键。调用此重载后的 `Add` 时，值将被默认构建：

```cpp
FruitMap.Add(4);
// FruitMap == [
// 	{ Key: 5, Value: "Banana"    },
// 	{ Key: 2, Value: "Pear"      },
// 	{ Key: 7, Value: "Pineapple" },
// 	{ Key: 4, Value: ""          }
// ]
```

### Emplace

和TArray一样，还可使用[`Emplace`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/Emplace)代替 `Add`，防止插入映射时创建临时文件：

```cpp
FruitMap.Emplace(3, TEXT("Orange"));
// FruitMap == [
// 	{ Key: 5, Value: "Banana"    },
// 	{ Key: 2, Value: "Pear"      },
// 	{ Key: 7, Value: "Pineapple" },
// 	{ Key: 4, Value: ""          },
// 	{ Key: 3, Value: "Orange"    }
// ]
```

此处直接将键和值传递给了各自的构造函数。这对 `int32` 键实际上没有影响，但避免了为该值创建临时 `FString`。与TArray不同的是，只能通过单一参数构造函数将元素安放到映射中。

### Append

也可使用[`Append`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMap/Append)函数合并映射，将一个映射的所有元素移至另一个映射：

```cpp
TMap<int32, FString> FruitMap2;
FruitMap2.Emplace(4, TEXT("Kiwi"));
FruitMap2.Emplace(9, TEXT("Melon"));
FruitMap2.Emplace(5, TEXT("Mango"));
FruitMap.Append(FruitMap2);
// FruitMap == [
// 	{ Key: 5, Value: "Mango"     },
// 	{ Key: 2, Value: "Pear"      },
// 	{ Key: 7, Value: "Pineapple" },
// 	{ Key: 4, Value: "Kiwi"      },
// 	{ Key: 3, Value: "Orange"    },
// 	{ Key: 9, Value: "Melon"     }
// ]
// FruitMap2 is now empty.
```

在上面的示例中，生成的映射和使用 `Add` 或 `Emplace` 逐个添加 `FruitMap2` 的元素相同，在该过程完成时会清空 `FruitMap2`。这意味着如果 `FruitMap2` 中任何元素的键与 `FruitMap` 中原有元素的键相同，就会取代该元素。

如果用[`UPROPERTY`](/documentation/zh-cn/unreal-engine/unreal-engine-uproperties)宏和一个可编辑的关键词（`EditAnywhere`、`EditDefaultsOnly` 或 `EditInstanceOnly`）标记TMap，即可[在编辑器中添加和编辑元素](/documentation/zh-cn/unreal-engine/level-editor-details-panel-in-unreal-engine)。

```cpp
UPROPERTY(EditAnywhere, Category = MapsAndSets)
TMap<int32, FString> FruitMap;
```

## 迭代

TMaps的迭代类似于TArrays。可使用C++的设置范围功能，注意元素类型是TPair：

```cpp
for (auto& Elem : FruitMap)
{
		FPlatformMisc::LocalPrint(
			*FString::Printf(
				TEXT("(%d, \"%s\")\n"),
				Elem.Key,
				*Elem.Value
			)
		);
}

// Output:
// (5, "Mango")
// (2, "Pear")
// (7, "Pineapple")
// (4, "Kiwi")
// (3, "Orange")
// (9, "Melon")
```

你可以用[`CreateIterator`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/CreateIterator)和[`CreateConstIterator`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/CreateConstIterator)函数来创建迭代器。

**函数**

**说明**

`CreateIterator`

返回拥有读写访问权限的迭代器。

`CreateConstIterator`

返回拥有只读访问权限的迭代器。

无论哪种情况，均可用这些迭代器的 `Key` 和 `Value` 来检查元素。使用迭代器显示 `FruitMap` 示例映射将产生如下结果：

```cpp
for (auto It = FruitMap.CreateConstIterator(); It; ++It)
{
		FPlatformMisc::LocalPrint(
			*FString::Printf(
				TEXT("(%d, \"%s\")\n"),
				It.Key(),   // same as It->Key
				*It.Value() // same as *It->Value
			)
		);
}
```

## 获取值

如果你知道自己的映射包含特定的键，可以使用 operator\[\]\`，以键为索引查找对应的值。使用非常量映射会返回非常量引用，而常量映射会返回常量引用。

在使用 `operator[]` 前，你必须确认映射是否包含指定的键。如果映射中不包含该键，则会引发异常。

```cpp
FString Val7 = FruitMap[7];
// Val7 == "Pineapple"
FString Val8 = FruitMap[8];
// Assert!
```

## 查询

调用[`Num`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/Num)函数即可确认TMap中保存的元素数量：

```cpp
int32 Count = FruitMap.Num();
// Count == 6
```

要确定映射是否包含特定键，可调用 `Contains` 函数：

```cpp
bool bHas7 = FruitMap.Contains(7);
bool bHas8 = FruitMap.Contains(8);
// bHas7 == true
// bHas8 == false
```

如果不确定映射中是否包含某个键，可使用[`Contains`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/Contains)函数进行检查，然后再使用 `operator[]`。但这并非理想的方法，因为同一键需要进行两次查找才能获取成功。

使用[`Find`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/Find)函数查找一次即可完成这些行为。如果映射包含该键，`Find` 将返回指向元素数值的指针。如果映射不包含该键，则返回null。在常量映射上调用 `Find` 将返回常量指针。

```cpp
FString* Ptr7 = FruitMap.Find(7);
FString* Ptr8 = FruitMap.Find(8);
// *Ptr7 == "Pineapple"
//  Ptr8 == nullptr
```

或为了确保查询的结果有效，可使用[`FindOrAdd`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/FindOrAdd)或[`FindRef`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/FindRef)。

**函数**

**说明**

`FindOrAdd`

`FindOrAdd` 将返回对与给定键关联的值的引用。如果映射中不存在该键，`FindOrAdd` 将返回新创建的元素（使用给定键和默认构建值），该元素也会被添加到映射。

`FindOrAdd`仅适用于非常量映射。

`FindRef`

不要被名称迷惑，`FindRef` 它会返回与给定键关联的值副本；若映射中未找到给定键，则返回默认构建值。`FindRef` 不会创建新元素，因此既可用于常量映射，也可用于非常量映射。

即使在映射中找不到键，`FindOrAdd` 和 `FindRef` 也会成功运行，因此无需执行常规的安全规程（如提前检查 `Contains` 或对返回值进行空白检查）就可安全地调用。

```cpp
FString& Ref7 = FruitMap.FindOrAdd(7);
// Ref7     == "Pineapple"
// FruitMap == [
// 	{ Key: 5, Value: "Mango"     },
// 	{ Key: 2, Value: "Pear"      },
// 	{ Key: 7, Value: "Pineapple" },
// 	{ Key: 4, Value: "Kiwi"      },
// 	{ Key: 3, Value: "Orange"    },
// 	{ Key: 9, Value: "Melon"     }
// ]

FString& Ref8 = FruitMap.FindOrAdd(8);
// Ref8     == ""
// FruitMap == [
// 	{ Key: 5, Value: "Mango"     },
// 	{ Key: 2, Value: "Pear"      },
// 	{ Key: 7, Value: "Pineapple" },
// 	{ Key: 4, Value: "Kiwi"      },
// 	{ Key: 3, Value: "Orange"    },
// 	{ Key: 9, Value: "Melon"     },
// 	{ Key: 8, Value: ""          }
// ]

FString Val7 = FruitMap.FindRef(7);
FString Val6 = FruitMap.FindRef(6);
// Val7     == "Pineapple"
// Val6     == ""
// FruitMap == [
// 	{ Key: 5, Value: "Mango"     },
// 	{ Key: 2, Value: "Pear"      },
// 	{ Key: 7, Value: "Pineapple" },
// 	{ Key: 4, Value: "Kiwi"      },
// 	{ Key: 3, Value: "Orange"    },
// 	{ Key: 9, Value: "Melon"     },
// 	{ Key: 8, Value: ""          }
// ]
```

和示例中初始化 `Ref8` 时一样，`FindOrAdd` 可向映射添加新条目，因此之前获得的指针或引用可能会无效。如果映射的后端存储需要扩展以容纳新元素，会执行分配内存和移动现有数据的添加操作，从而导致这一结果。以上示例中，在调用 `FindOrAdd(8)` 之后，`Ref7` 可能会紧随 `Ref8` 失效。

[`FindKey`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/FindKey)函数执行逆向查找，这意味着提供的值与键匹配，并返回指向与所提供值配对的第一个键的指针。搜索映射中不存在的值将返回空指针。

```cpp
const int32* KeyMangoPtr   = FruitMap.FindKey(TEXT("Mango"));
const int32* KeyKumquatPtr = FruitMap.FindKey(TEXT("Kumquat"));
// *KeyMangoPtr   == 5
//  KeyKumquatPtr == nullptr
```

按值查找比按键查找慢（线性时间）。这是因为映射是根据键而不是值进行哈希。此外，如果映射有多个具有相同值的键，`FindKey` 可返回其中任一键。

[`GenerateKeyArray`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/GenerateKeyArray)和[`GenerateValueArray`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/GenerateValueArray)分别使用所有键和值的副本来填充[`TArray`](/documentation/en-us/unreal-engine/API/Runtime/TraceLog/TArray)。在这两种情况下，都会在填充前清空所传递的数组，因此产生的元素数量始终等于映射中的元素数量。

```cpp
TArray<int32>   FruitKeys;
TArray<FString> FruitValues;
FruitKeys.Add(999);
FruitKeys.Add(123);
FruitMap.GenerateKeyArray  (FruitKeys);
FruitMap.GenerateValueArray(FruitValues);
// FruitKeys   == [ 5,2,7,4,3,9,8 ]
// FruitValues == [ "Mango","Pear","Pineapple","Kiwi","Orange",
//                  "Melon","" ]
```

## 移除

你可以使用[`Remove`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/Remove)函数从映射中移除元素，并提供要移除元素的键。返回值是被移除元素的数量。如果映射不包含与键匹配的元素，则返回值可为零。

```cpp
FruitMap.Remove(8);
// FruitMap == [
// 	{ Key: 5, Value: "Mango"     },
// 	{ Key: 2, Value: "Pear"      },
// 	{ Key: 7, Value: "Pineapple" },
// 	{ Key: 4, Value: "Kiwi"      },
// 	{ Key: 3, Value: "Orange"    },
// 	{ Key: 9, Value: "Melon"     }
// ]
```

移除元素将在数据结构（在Visual Studio的观察窗口中可视化映射时可看到）中留下空位，但为保证清晰度，此处省略。

[`FindAndRemoveChecked`](/documentation/404)函数可用于从映射移除元素并返回其值。名称的"已检查"部分表示若键不存在，映射将调用检查。

```cpp
FString Removed7 = FruitMap.FindAndRemoveChecked(7);
// Removed7 == "Pineapple"
// FruitMap == [
// 	{ Key: 5, Value: "Mango"  },
// 	{ Key: 2, Value: "Pear"   },
// 	{ Key: 4, Value: "Kiwi"   },
// 	{ Key: 3, Value: "Orange" },
// 	{ Key: 9, Value: "Melon"  }
// ]

FString Removed8 = FruitMap.FindAndRemoveChecked(8);
// Assert!
```

[`RemoveAndCopyValue`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMap/RemoveAndCopyValue)函数的作用与 `Remove` 相似，不同点是会将已移除元素的值复制到引用参数。如果映射中不存在指定的键，则输出参数将保持不变，函数将返回 `false`。

```cpp
FString Removed;
bool bFound2 = FruitMap.RemoveAndCopyValue(2, Removed);
// bFound2  == true
// Removed  == "Pear"
// FruitMap == [
// 	{ Key: 5, Value: "Mango"  },
// 	{ Key: 4, Value: "Kiwi"   },
// 	{ Key: 3, Value: "Orange" },
// 	{ Key: 9, Value: "Melon"  }
// ]

bool bFound8 = FruitMap.RemoveAndCopyValue(8, Removed);
// bFound8  == false
// Removed  == "Pear", i.e. unchanged
// FruitMap == [
// 	{ Key: 5, Value: "Mango"  },
// 	{ Key: 4, Value: "Kiwi"   },
// 	{ Key: 3, Value: "Orange" },
// 	{ Key: 9, Value: "Melon"  }
// ]
```

最后，使用[`Empty`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/Empty)或[`Reset`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/Reset)函数可将映射中的所有元素移除。

```cpp
TMap<int32, FString> FruitMapCopy = FruitMap;
// FruitMapCopy == [
// 	{ Key: 5, Value: "Mango"  },
// 	{ Key: 4, Value: "Kiwi"   },
// 	{ Key: 3, Value: "Orange" },
// 	{ Key: 9, Value: "Melon"  }
// ]

FruitMapCopy.Empty();		// You can also use Reset() here.
// FruitMapCopy == []
```

`Empty` 可采用参数指示映射中保留的slack量，而 `Reset` 则是尽可能多地留出slack量。

## 排序

你可以按键或值来对TMap进行排序。排序后，迭代映射会以排序的顺序显示元素，但下次修改映射时，排序可能会发生变化。排序是不稳定的，因此等值元素在 `TMultiMap` 中可能以任何顺序出现。

使用[`KeySort`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TSortableMapBase/KeySort) 或[`ValueSort`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TSortableMapBase/ValueSort)函数可分别按键和值进行排序。两个函数均使用二元谓词来进行排序：

```cpp
FruitMap.KeySort([](int32 A, int32 B) {
		return A > B; // sort keys in reverse
});
// FruitMap == [
// 	{ Key: 9, Value: "Melon"  },
// 	{ Key: 5, Value: "Mango"  },
// 	{ Key: 4, Value: "Kiwi"   },
// 	{ Key: 3, Value: "Orange" }
// ]

FruitMap.ValueSort([](const FString& A, const FString& B) {
		return A.Len() < B.Len(); // sort strings by length
});
// FruitMap == [
// 	{ Key: 4, Value: "Kiwi"   },
// 	{ Key: 5, Value: "Mango"  },
// 	{ Key: 9, Value: "Melon"  },
// 	{ Key: 3, Value: "Orange" }
// ]
```

## 运算符

和TArray一样，TMap是常规值类型，可通过标准复制构造函数或赋值运算符进行复制。因为映射严格拥有其元素，复制映射的操作是深层的，所以新的映射将拥有其自己的元素副本。

```cpp
TMap<int32, FString> NewMap = FruitMap;
NewMap[5] = "Apple";
NewMap.Remove(3);
// FruitMap == [
// 	{ Key: 4, Value: "Kiwi"   },
// 	{ Key: 5, Value: "Mango"  },
// 	{ Key: 9, Value: "Melon"  },
// 	{ Key: 3, Value: "Orange" }
// ]
// NewMap == [
// 	{ Key: 4, Value: "Kiwi"  },
// 	{ Key: 5, Value: "Apple" },
// 	{ Key: 9, Value: "Melon" }
// ]
```

TMap支持移动语义，使用 `MoveTemp` 函数可调用这些语义。在移动后，源映射必定为空：

```cpp
FruitMap = MoveTemp(NewMap);
// FruitMap == [
// 	{ Key: 4, Value: "Kiwi"  },
// 	{ Key: 5, Value: "Apple" },
// 	{ Key: 9, Value: "Melon" }
// ]
// NewMap == []
```

## Slack

Slack是不包含元素的已分配内存。调用[`Reserve`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/Reserve)可分配内存，无需添加元素；通过非零slack参数调用[`Reset`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/Reset)或[`Empty`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/Empty)可移除元素，无需将其使用的内存取消分配。Slack优化了将新元素添加到映射的过程，因为可以使用预先分配的内存，而不必分配新内存。它在移除元素时也十分实用，因为系统不需要将内存取消分配。在清空希望用相同或更少的元素立即重新填充的映射时，此方法尤其有效。

TMap不像TArray中的[`Max`](/documentation/404)函数那样可以检查预分配元素的数量。

在下列代码中，`Reserve` 函数为映射分配了最多可包含10个元素的空间。

```cpp
FruitMap.Reserve(10);
for (int32 i = 0; i < 10; ++i)
{
		FruitMap.Add(i, FString::Printf(TEXT("Fruit%d"), i));
}
// FruitMap == [
// 	{ Key: 9, Value: "Fruit9" },
// 	{ Key: 8, Value: "Fruit8" },
// 	...
// 	{ Key: 1, Value: "Fruit1" },
// 	{ Key: 0, Value: "Fruit0" }
// ]
```

使用 `Collapse` 和[`Shrink`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/Shrink)函数可移除TMap中的全部slack。`Shrink` 将从容器的末端移除所有slack，但这会在中间或开始处留下空白元素。

```cpp
for (int32 i = 0; i < 10; i += 2)
{
		FruitMap.Remove(i);
}
// FruitMap == [
// 	{ Key: 9, Value: "Fruit9" },
// 	<invalid>,
// 	{ Key: 7, Value: "Fruit7" },
// 	<invalid>,
// 	{ Key: 5, Value: "Fruit5" },
// 	<invalid>,
// 	{ Key: 3, Value: "Fruit3" },
// 	<invalid>,
// 	{ Key: 1, Value: "Fruit1" },
// 	<invalid>
// ]

FruitMap.Shrink();
// FruitMap == [
// 	{ Key: 9, Value: "Fruit9" },
// 	<invalid>,
// 	{ Key: 7, Value: "Fruit7" },
// 	<invalid>,
// 	{ Key: 5, Value: "Fruit5" },
// 	<invalid>,
// 	{ Key: 3, Value: "Fruit3" },
// 	<invalid>,
// 	{ Key: 1, Value: "Fruit1" }
// ]
```

在上述代码中，`Shrink` 只删除了一个无效元素，因为末端只有一个空元素。要移除所有slack，首先应使用[`Compact`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/Compact)函数，将空白空间组合在一起，为调用 `Shrink` 做好准备。

```cpp
FruitMap.Compact();
// FruitMap == [
// 	{ Key: 9, Value: "Fruit9" },
// 	{ Key: 7, Value: "Fruit7" },
// 	{ Key: 5, Value: "Fruit5" },
// 	{ Key: 3, Value: "Fruit3" },
// 	{ Key: 1, Value: "Fruit1" },
// 	<invalid>,
// 	<invalid>,
// 	<invalid>,
// 	<invalid>
// ]

FruitMap.Shrink();
// FruitMap == [
// 	{ Key: 9, Value: "Fruit9" },
// 	{ Key: 7, Value: "Fruit7" },
// 	{ Key: 5, Value: "Fruit5" },
// 	{ Key: 3, Value: "Fruit3" },
// 	{ Key: 1, Value: "Fruit1" }
// ]
```

## KeyFuncs

只要类型具有 `operator==` 和非成员[`GetTypeHash`](/documentation/en-us/unreal-engine/API/Runtime/Core/GenericPlatform/GetTypeHash)重载，就可用作TMap的键类型，不需要任何更改。但是，你可能需要将类型用作键，而不重载这些函数。在这些情况下，可对[`KeyFuncs`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/DefaultKeyFuncs)进行自定义。为键类型创建KeyFuncs，必须定义两个typedef和三个静态函数，如下所示：

**类型定义**

**说明**

`KeyInitType`

用于传递键的类型。

`ElementInitType`

用于传递元素的类型。

**函数**

**说明**

`KeyInitType GetSetKey(ElementInitType Element)`

返回元素的键。

`bool Matches(KeyInitType A, KeyInitType B)`

如果 `A` 和 `B` 等值将返回 `true`，否则返回 `false`。

`uint32 GetKeyHash(KeyInitType Key)`

返回 `Key` 的哈希值。

`KeyInitType` 和 `ElementInitType` 是键类型和值类型的常规传递约定的typedef。它们通常为浅显类型的一个值，和非浅显类型的一个常量引用。请记住，映射的元素类型是 `TPair`。

下列代码片段展示了一个自定义 `KeyFuncs`：

MyCustomKeyFuncs.cpp

```cpp
struct FMyStruct
{
		// String which identifies our key
		FString UniqueID;

		// Some state which doesn't affect struct identity
		float SomeFloat;

		explicit FMyStruct(float InFloat)
			: UniqueID (FGuid::NewGuid().ToString())
			, SomeFloat(InFloat)
		{

		}
};

template <typename ValueType>
struct TMyStructMapKeyFuncs :
		BaseKeyFuncs<
			TPair<FMyStruct, ValueType>,
			FString
		>
{

private:
		typedef BaseKeyFuncs<
			TPair<FMyStruct, ValueType>,
			FString
		> Super;

public:
		typedef typename Super::ElementInitType ElementInitType;
		typedef typename Super::KeyInitType     KeyInitType;

		static KeyInitType GetSetKey(ElementInitType Element)
		{
			return Element.Key.UniqueID;
		}

		static bool Matches(KeyInitType A, KeyInitType B)
		{
			return A.Compare(B, ESearchCase::CaseSensitive) == 0;
		}

		static uint32 GetKeyHash(KeyInitType Key)
		{
			return FCrc::StrCrc32(*Key);
		}
};
```

`FMyStruct` 具有唯一标识符，以及一些与身份无关的其他数据。`GetTypeHash` 和 `operator==` 不适用于此，因为 `operator==` 为实现通用目的不应忽略任何类型的数据，但同时又需要如此才能与 `GetTypeHash` 的行为保持一致，后者只关注 \`*UniqueID* 字段。

要为 `FMyStruct` 创建自定义 `KeyFuncs`，请按以下步骤操作：

1.  继承 `BaseKeyFuncs`，因为它定义了某些有用的类型，包括 `KeyInitType` 和 `ElementInitType`。
    -   `BaseKeyFuncs` 使用两个模板参数：
        1.  映射的元素类型。
            -   和所有映射一样，元素类型是 `TPair`，使用 `FMyStruct` 作为其 `KeyType`，`TMyStructMapKeyFuncs` 的模板参数作为其 `ValueType`。将备用 `KeyFuncs` 用作模板，可为每个映射指定 `ValueType`，因此每次要在 `FMyStruct` 上创建键控TMap时不必定义新的 `KeyFuncs`。
        2.  我们的键类型。
            -   第二个 `BaseKeyFuncs` 参数是键类型，不要与元素存储的键区（TPair的 `KeyType`）混淆。因为此映射应使用 `UniqueID`（来自 `FMyStruct`）作为键，所以此处使用 `FString`。
2.  定义三个必需的 `KeyFuncs` 静态函数。
    -   第一个是[`GetSetKey`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/DefaultKeyFuncs/GetSetKey)，该函数返回给定元素类型的键。由于元素类型是 `TPair`，而键是 `UniqueID`，所以该函数可直接返回 `UniqueID`。
    -   第二个静态函数是[`Matches`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/DefaultKeyFuncs/Matches)，该函数接受两个元素的键（由 `GetSetKey` 获取），然后比较它们是否相等。在 `FString` 中，标准的等效测试（`operator==`）不区分大小写；要替换为区分大小写的搜索，请用相应的大小写对比选项使用 `Compare()` 函数。
    -   第三个静态函数是 `GetKeyHash`，它接受提取的键并返回其哈希值。由于 `Matches` 函数区分大小写，`GetKeyHash` 也必须区分大小写。区分大小写的[`FCrc`](/documentation/en-us/unreal-engine/API/Runtime/Core/Misc/FCrc)函数将计算键字符串的哈希值。
3.  现在结构已满足TMap要求的行为，可创建它的实例。
    
    ```cpp
             TMap<
                 FMyStruct,
                 int32,
                 FDefaultSetAllocator,
                 TMyStructMapKeyFuncs<int32>
             > MyMapToInt32;
    		
             // Add some elements
             MyMapToInt32.Add(FMyStruct(3.14f), 5);
             MyMapToInt32.Add(FMyStruct(1.23f), 2);
             // MyMapToInt32 == [
             // 	{
             // 		Key: {
             // 			UniqueID:  "D06AABBA466CAA4EB62D2F97936274E4",
             // 			SomeFloat: 3.14f
             // 		},
             // 		Value: 5
             //	},
             // 	{
             // 		Key: {
             // 			UniqueID:  "0661218447650259FD4E33AD6C9C5DCB",
             // 			SomeFloat: 1.23f
             // 		},
             // 		Value: 5
             //	}
             // ]
    ```
    
    本示例指定了默认的集合分配器。因为 `KeyFuncs` 参数处于最后，所以这个 `TMap` 类型需要该参数。
    

在自行设置KeyFuncs时，要注意 `TMap` 假设两个项目使用[`Matches`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/DefaultKeyFuncs/Matches)比较的结果相等，则它们会从 `GetKeyHash` 返回相同的值。此外，如果对现有映射元素的键进行的修改将会改变来自这两个函数中任一个的结果，那么系统会将这种修改视作未定义的行为，因为这会使映射的内部哈希失效。这些规则也适用于使用默认 `KeyFuncs` 时 `operator==` 和 `GetKeyHash` 的重载。

## 其他

[`CountBytes`](/documentation/404)和[`GetAllocatedSize`](/documentation/404)函数用于估计内部数组的当前内存使用情况。`CountBytes` 接受 `Farchive` 参数，而 `GetAllocatedSize` 则不会。这些函数常用于统计报告。

[`Dump`](/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TMapBase/Dump)函数接受 `FOutputDevice`，并写出关于映射内容的实现信息。此函数常用于调试。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [虚幻引擎中的映射类型](/documentation/zh-cn/unreal-engine/map-containers-in-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%B8%AD%E7%9A%84%E6%98%A0%E5%B0%84%E7%B1%BB%E5%9E%8B)
-   [TMap概述](/documentation/zh-cn/unreal-engine/map-containers-in-unreal-engine#tmap%E6%A6%82%E8%BF%B0)
-   [TMultiMap概述](/documentation/zh-cn/unreal-engine/map-containers-in-unreal-engine#tmultimap%E6%A6%82%E8%BF%B0)
-   [创建和填充映射](/documentation/zh-cn/unreal-engine/map-containers-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E5%A1%AB%E5%85%85%E6%98%A0%E5%B0%84)
-   [Add](/documentation/zh-cn/unreal-engine/map-containers-in-unreal-engine#add)
-   [Emplace](/documentation/zh-cn/unreal-engine/map-containers-in-unreal-engine#emplace)
-   [Append](/documentation/zh-cn/unreal-engine/map-containers-in-unreal-engine#append)
-   [迭代](/documentation/zh-cn/unreal-engine/map-containers-in-unreal-engine#%E8%BF%AD%E4%BB%A3)
-   [获取值](/documentation/zh-cn/unreal-engine/map-containers-in-unreal-engine#%E8%8E%B7%E5%8F%96%E5%80%BC)
-   [查询](/documentation/zh-cn/unreal-engine/map-containers-in-unreal-engine#%E6%9F%A5%E8%AF%A2)
-   [移除](/documentation/zh-cn/unreal-engine/map-containers-in-unreal-engine#%E7%A7%BB%E9%99%A4)
-   [排序](/documentation/zh-cn/unreal-engine/map-containers-in-unreal-engine#%E6%8E%92%E5%BA%8F)
-   [运算符](/documentation/zh-cn/unreal-engine/map-containers-in-unreal-engine#%E8%BF%90%E7%AE%97%E7%AC%A6)
-   [Slack](/documentation/zh-cn/unreal-engine/map-containers-in-unreal-engine#slack)
-   [KeyFuncs](/documentation/zh-cn/unreal-engine/map-containers-in-unreal-engine#keyfuncs)
-   [其他](/documentation/zh-cn/unreal-engine/map-containers-in-unreal-engine#%E5%85%B6%E4%BB%96)
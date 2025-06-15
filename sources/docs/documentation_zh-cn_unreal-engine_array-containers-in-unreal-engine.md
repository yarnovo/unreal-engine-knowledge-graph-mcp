# Array Containers in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/array-containers-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:41:34.237Z

---

目录

![TArray：虚幻引擎中的数组](https://dev.epicgames.com/community/api/documentation/image/5561279b-456b-4ad4-a581-445f26dd7dd0?resizing_type=fill&width=1920&height=335)

虚幻引擎中最简单的容器类是 `TArray`。`TArray` 负责同类型其他对象（称为"元素"）序列的所有权和组织。由于 `TArray` 是一个序列，其元素的排序定义明确，其函数用于确定性地操纵此类对象及其顺序。

## TArray

`TArray` 是虚幻引擎中最常用的容器类。其速度快、内存消耗小、安全性高。`TArray` 类型由两大属性定义：元素类型和可选分配器。

元素类型是存储在数组中的对象类型。`TArray` 被称为同质容器。换言之，其所有元素均完全为相同类型。单个 `TArray` 中不能存储不同类型的元素。

分配器常被省略，默认为最常用的分配器。其定义对象在内存中的排列方式；以及数组如何进行扩展，以容纳更多的元素。若默认行为不符合要求，可选取多种不同的分配器，或自行编写。此部分将稍后讨论。

`Tarray` 为数值类型。意味其与其他内置类型（如 `int32` 或 `浮点`）的处理方式相同。其设计时未考虑扩展问题，因此建议在实际操作中勿使用 `新建（new）` 和 `删除（delete）` 创建或销毁 `TArray` 实例。元素也为数值类型，为容器所拥有。`TArray` 被销毁时其中的元素也将被销毁。若在另一TArray中创建TArray变量，其元素将复制到新变量中，且不会共享状态。

## 创建和填充数组

如要创建数组，将其以此定义：

```cpp
	TArray<int32> IntArray;
```

此操作会创建用于存储整数序列的空白数组。元素类型是可根据普通C++值规则进行复制和销毁的数值类型，例如 `int32`、`FString`、`TSharedPtr` 等。由于无指定分配器，因此 `TArray` 将采用基于堆的默认分配器。此时尚未分配内存。

有多种填充 `Tarray` 的方法。一种方式是使用 `Init` 函数，将大量元素副本填入数组。

```cpp
	IntArray.Init(10, 5);
	// IntArray == [10,10,10,10,10]
```

`Add` 和 `Emplace` 函数用于在数组末尾新建对象：

```cpp
	TArray<FString> StrArr;
	StrArr.Add    (TEXT("Hello"));
	StrArr.Emplace(TEXT("World"));
	// StrArr == ["Hello","World"]
```

新元素添加到数组时，数组的分配器将根据需要分配内存。当前数组大小超出时，默认分配器将添加足够的内存，用于存储多个新元素。`Add` 和 `Emplace` 函数的多数效果相同，细微区别在于：

-   `Add`（或 `Push`）将元素类型的实例复制（或移动）到数组中。
-   `Emplace` 使用给定参数构建元素类型的新实例。

因此在 `TArray<FString>` 中，`Add` 将用字符串文字创建临时 `FString`，然后将该临时 `FString` 的内容移至容器内的新 `FString` 中；而 `Emplace` 将用字符串文字直接新建 `FString`。最终结果相同，但 `Emplace` 可避免创建临时文件。对于 `FString` 等非浅显数值类型而言，临时文件通常有害无益。

总体而言，`Emplace` 优于 `Add`，因此其可避免在调用点创建无需临时变量，并将此类变量复制或移动到容器中。根据经验，可将 `Add` 用于浅显类型，将 `Emplace` 用于其他类型。`Emplace` 的效率始终高于 `Add`，但 `Add` 的可读性可能更好。

利用 `Append` 可一次性添加其他 `TArray` 中的多个元素，或者指向常规C数组的指针及该数组的大小：

```cpp
	FString Arr[] = { TEXT("of"), TEXT("Tomorrow") };
	StrArr.Append(Arr, ARRAY_COUNT(Arr));
	// StrArr == ["Hello","World","of","Tomorrow"]
```

仅在尚不存在等值元素时，`AddUnique` 才会向容器添加新元素。使用以下元素类型的运算符检查等值性：`operator==`:

```cpp
	StrArr.AddUnique(TEXT("!"));
	// StrArr == ["Hello","World","of","Tomorrow","!"]

	StrArr.AddUnique(TEXT("!"));
	// StrArr is unchanged as "!" is already an element
```

与 `Add`、`Emplace` 和 `Append` 相同，`Insert` 将在给定索引处添加单个元素或元素数组的副本：

```cpp
	StrArr.Insert(TEXT("Brave"), 1);
	// StrArr == ["Hello","Brave","World","of","Tomorrow","!"]
```

`SetNum` 函数可直接设置数组元素的数量。如新数量大于当前数量，则使用元素类型的默认构造函数新建元素：

```cpp
	StrArr.SetNum(8);
	// StrArr == ["Hello","Brave","World","of","Tomorrow","!","",""]
```

如新数量小于当前数量，`SetNum` 将移除元素。移除元素的更多相关详情将稍后讨论：

```cpp
	StrArr.SetNum(6);
	// StrArr == ["Hello","Brave","World","of","Tomorrow","!"]
```

## 迭代

有多种方法可迭代数组的元素，建议使用C++的范围（ranged-for）功能：

```cpp
	FString JoinedStr;
	for (auto& Str : StrArr)
	{
		JoinedStr += Str;
		JoinedStr += TEXT(" ");
	}
	// JoinedStr == "Hello Brave World of Tomorrow ! "
```

同时也可使用基于索引的常规迭代：

```cpp
	for (int32 Index = 0; Index != StrArr.Num(); ++Index)
	{
		JoinedStr += StrArr[Index];
		JoinedStr += TEXT(" ");
	}
```

最后，还可通过数组迭代器类型控制迭代。函数 `CreateIterator` 和 `CreateConstIterator` 可分别用于元素的读写和只读访问：

```cpp
	for (auto It = StrArr.CreateConstIterator(); It; ++It)
	{
		JoinedStr += *It;
		JoinedStr += TEXT(" ");
	}
```

## 排序

调用 `Sort` 函数即可对数组进行排序：

```cpp
	StrArr.Sort();
	// StrArr == ["!","Brave","Hello","of","Tomorrow","World"]
```

在此，数值按元素类型的 `operator<` 排序。在FString中，此为忽略大小写的词典编纂比较。二元谓词也在实现后提供不同的排序语义，例如：

```cpp
	StrArr.Sort([](const FString& A, const FString& B) {
		return A.Len() < B.Len();
	});
	// StrArr == ["!","of","Hello","Brave","World","Tomorrow"]
```

字符串现在按长度排序。注意：与之前相比，数组中三个长度相同的字符串"Hello"、"Brave"和"World"的相对排序发生了变化。这是因为 `Sort` 不稳定，等值元素（因为断言只比较长度，所以此处字符串为等值）的相对排序无法保证。`Sort` 作为quicksort实现。

`HeapSort` 函数，无论是否使用二元谓词，均可用于执行堆排序。使用HeapSort函数与否，取决于特定数据与Sort函数相比时的排序效率。与 `Sort` 一样，`HeapSort` 也不稳定。若在上述范例中使用 `HeapSort` 而非 `Sort`，结果将如下所示（此例中结果相同）：

```cpp
	StrArr.HeapSort([](const FString& A, const FString& B) {
		return A.Len() < B.Len();
	});
	// StrArr == ["!","of","Hello","Brave","World","Tomorrow"]
```

最后，`StableSort` 用于在排序后保证等值元素的相对顺序。若在上述范例中调用 `StableSort` 而非 `Sort` 或 `HeapSort`，结果将如下所示：

```cpp
	StrArr.StableSort([](const FString& A, const FString& B) {
		return A.Len() < B.Len();
	});
	// StrArr == ["!","of","Brave","Hello","World","Tomorrow"]
```

即：在进行词典编纂排序后，"Brave"、"Hello"和"World"的相对排序不会改变。`StableSort` 作为归并排序实现。

## 查询

使用 `Num` 函数可查询数组保存的元素数量：

```cpp
	int32 Count = StrArr.Num();
	// Count == 6
```

如需直接访问数组内存（如确定C类API的互操作性），可使用 `GetData` 函数将指针返回到数组中的元素。仅在数组存在且未执行更改数组的操作时，此指针方有效。仅 `StrPtr` 的首个 `Num` 指数才可被解除引用：

```cpp
	FString* StrPtr = StrArr.GetData();
	// StrPtr[0] == "!"
	// StrPtr[1] == "of"
	// ...
	// StrPtr[5] == "Tomorrow"
	// StrPtr[6] - undefined behavior
```

如容器为常量，则返回的指针也为常量。

可针对元素大小对容器进行询问：

```cpp
	uint32 ElementSize = StrArr.GetTypeSize();
	// ElementSize == sizeof(FString)
```

要获取元素，可使用索引 operator\[\]\` 将从零开始的索引传递给要获取的元素：

```cpp
	FString Elem1 = StrArr[1];
	// Elem1 == "of"
```

传递小于0或大于等于Num()的无效索引将导致运行时错误。使用 `IsValidIndex` 函数询问容器，可确定特定索引是否有效：

```cpp
	bool bValidM1 = StrArr.IsValidIndex(-1);
	bool bValid0  = StrArr.IsValidIndex(0);
	bool bValid5  = StrArr.IsValidIndex(5);
	bool bValid6  = StrArr.IsValidIndex(6);
	// bValidM1 == false
	// bValid0  == true
	// bValid5  == true
	// bValid6  == false
```

operator\[\]\` 将返回引用。因此其还可用于改变数组中的元素（假定数组不为常量）。

```cpp
	StrArr[3] = StrArr[3].ToUpper();
	// StrArr == ["!","of","Brave","HELLO","World","Tomorrow"]
```

与GetData函数相同：如数组为常量，operator\[\] `将返回常量引用。还可使用` Last `函数从数组末端反向索引。索引默认为零。`Top `函数是` Last\` 的同义词，唯一区别是其不接受索引：

```cpp
	FString ElemEnd  = StrArr.Last();
	FString ElemEnd0 = StrArr.Last(0);
	FString ElemEnd1 = StrArr.Last(1);
	FString ElemTop  = StrArr.Top();
	// ElemEnd  == "Tomorrow"
	// ElemEnd0 == "Tomorrow"
	// ElemEnd1 == "World"
	// ElemTop  == "Tomorrow"
```

可询问数组是否包含特定元素：

```cpp
	bool bHello   = StrArr.Contains(TEXT("Hello"));
	bool bGoodbye = StrArr.Contains(TEXT("Goodbye"));
	// bHello   == true
	// bGoodbye == false
```

或询问数组是否包含与特定谓词匹配的元素：

```cpp
	bool bLen5 = StrArr.ContainsByPredicate([](const FString& Str){
		return Str.Len() == 5;
	});
	bool bLen6 = StrArr.ContainsByPredicate([](const FString& Str){
		return Str.Len() == 6;
	});
	// bLen5 == true
	// bLen6 == false
```

使用 `Find` 函数族可查找元素。可使用Find确定元素是否存在并返回其索引：

```cpp
	int32 Index;
	if (StrArr.Find(TEXT("Hello"), Index))
	{
		// Index == 3
	}
```

此操作会将 `Index` 设为找到的首个元素的索引。如存在重复元素而希望找到最末元素的索引，则使用 `FindLast` 函数：

```cpp
	int32 IndexLast;
	if (StrArr.FindLast(TEXT("Hello"), IndexLast))
	{
		// IndexLast == 3, because there aren't any duplicates
	}
```

两个函数均会返回布尔，指出是否已找到元素，同时在找到元素索引时将其写入变量。

`Find` 和 `FindLast` 也可直接返回元素索引。如不将索引作为显式参数传递，这两个函数便会执行此操作。此将比上述函数更简洁，使用的函数则取决于特定需求或风格。

如未找到元素，将返回特殊 `INDEX_NONE` 值：

```cpp
	int32 Index2     = StrArr.Find(TEXT("Hello"));
	int32 IndexLast2 = StrArr.FindLast(TEXT("Hello"));
	int32 IndexNone  = StrArr.Find(TEXT("None"));
	// Index2     == 3
	// IndexLast2 == 3
	// IndexNone  == INDEX_NONE
```

`IndexOfByKey` 的工作方式类似，不同元素可与任意对象比较。开始搜索前，使用 `Find` 函数会将参数实际转换为元素类型（此本例中为 `FString`）。使用 `IndexOfByKey`，可直接对不"键"，因此即使键类型无法直接转换为元素类型，也可进行搜索。

`IndexOfByKey` 适用于存在 `operator==(ElementType, KeyType)` 的键类型。`IndexOfByKey` 将返回找到的首个元素的索引；如未找到元素，则返回 `INDEX_NONE`：

```cpp
	int32 Index = StrArr.IndexOfByKey(TEXT("Hello"));
	// Index == 3
```

`IndexOfByPredicate` 函数用于查找与特定谓词匹配的首个元素的索引；如未找到，同样返回特殊 `INDEX_NONE` 值：

```cpp
	int32 Index = StrArr.IndexOfByPredicate([](const FString& Str){
		return Str.Contains(TEXT("r"));
	});
	// Index == 2
```

可将指针返回指向找到的元素，而不返回指数。`FindByKey` 与 `IndexOfByKey` 相似，将元素和任意对象进行对比，但返回指向所找到元素的指针。如未找到元素，则返回`nullptr`。

```cpp
	auto* OfPtr  = StrArr.FindByKey(TEXT("of")));
	auto* ThePtr = StrArr.FindByKey(TEXT("the")));
	// OfPtr  == &StrArr[1]
	// ThePtr == nullptr
```

`FindByPredicate` 的使用方式和 `IndexOfByPredicate` 相似，不同点是返回指针而非索引：

```cpp
	auto* Len5Ptr = StrArr.FindByPredicate([](const FString& Str){
		return Str.Len() == 5;
	});
	auto* Len6Ptr = StrArr.FindByPredicate([](const FString& Str){
		return Str.Len() == 6;
	});
	// Len5Ptr == &StrArr[2]
	// Len6Ptr == nullptr
```

最后，使用 `FilterByPredicate` 函数可获取与特定谓词匹配的元素数组：

```cpp
	auto Filter = StrArray.FilterByPredicate([](const FString& Str){
		return !Str.IsEmpty() && Str[0] < TEXT('M');
	});
```

## 移除

`Remove` 函数族用于移除数组中的元素。`Remove` 函数将根据元素类型的 `operator==` 函数移除所有与提供元素等值的元素。例如：

```cpp
	TArray<int32> ValArr;
	int32 Temp[] = { 10, 20, 30, 5, 10, 15, 20, 25, 30 };
	ValArr.Append(Temp, ARRAY_COUNT(Temp));
	// ValArr == [10,20,30,5,10,15,20,25,30]

	ValArr.Remove(20);
	// ValArr == [10,30,5,10,15,25,30]
```

`RemoveSingle` 也可用于擦除数组中的首个匹配元素。以下情况尤为实用——此函数在数组中可能存在重复，而只希望擦除一个时；或作为优化，数组只能包含一个匹配元素时：

```cpp
	ValArr.RemoveSingle(30);
	// ValArr == [10,5,10,15,25,30]
```

`RemoveAt` 函数也可用于按照从零开始的索引移除元素。可使用 `IsValidIndex` 确定数组中的元素是否使用计划提供的索引，将无效索引传递给此函数会导致运行时错误：

```cpp
	ValArr.RemoveAt(2); // Removes the element at index 2
	// ValArr == [10,5,15,25,30]

	ValArr.RemoveAt(99); // This will cause a runtime error as
	                       // there is no element at index 99
```

`RemoveAll` 也可用于函数移除与谓词匹配的元素。例如，移除为3倍数的所有数值：

```cpp
	ValArr.RemoveAll([](int32 Val) {
		return Val % 3 == 0;
	});
	// ValArr == [10,5,25]
```

在所有这些情况中，由于数组中不能出现空位，因此移除元素时其后的元素将被下移到更低指数中。

移动过程存在开销。如不需要剩余元素排序，可使用 `RemoveSwap`、`RemoveAtSwap` 和 `RemoveAllSwap` 函数减少此开销。此类函数的工作方式与其非交换变种相似，不同之处在于其不保证剩余元素的排序，因此可更快地完成任务：

```cpp
	TArray<int32> ValArr2;
	for (int32 i = 0; i != 10; ++i)
		ValArr2.Add(i % 5);
	// ValArr2 == [0,1,2,3,4,0,1,2,3,4]

	ValArr2.RemoveSwap(2);
	// ValArr2 == [0,1,4,3,4,0,1,3]

	ValArr2.RemoveAtSwap(1);
	// ValArr2 == [0,3,4,3,4,0,1]

	ValArr2.RemoveAllSwap([](int32 Val) {
		return Val % 3 == 0;
	});
	// ValArr2 == [1,4,4]
```

最后，可使用 `Empty` 函数移除数组中所有元素：

```cpp
	ValArr2.Empty();
	// ValArr2 == []
```

## 运算符

数组是常规数值类型，可使用标准复制构造函数或赋值运算符进行复制。由于数组严格拥有其元素，复制数组的操作是深层的，因此新数组将拥有其自身的元素副本：

```cpp
	TArray<int32> ValArr3;
	ValArr3.Add(1);
	ValArr3.Add(2);
	ValArr3.Add(3);

	auto ValArr4 = ValArr3;
	// ValArr4 == [1,2,3];
	ValArr4[0] = 5;
	// ValArr3 == [1,2,3];
	// ValArr4 == [5,2,3];
```

作为 `Append` 函数的替代，可使用 `operator+=` 对数组进行串联：

```cpp
	ValArr4 += ValArr3;
	// ValArr4 == [5,2,3,1,2,3]
```

`TArray` 还支持移动语义，使用 `MoveTemp` 函数可调用这些语义。移动后，源数组必定为空：

```cpp
	ValArr3 = MoveTemp(ValArr4);
	// ValArr3 == [5,2,3,1,2,3]
	// ValArr4 == []
```

使用 `operator==` 和 `operator!=` 可对数组进行比较。元素的排序很重要：只有元素的顺序和数量相同时，两个数组才被视为相同。元素通过其自身的 `operator==` 进行比较：

```cpp
	TArray<FString> FlavorArr1;
	FlavorArr1.Emplace(TEXT("Chocolate"));
	FlavorArr1.Emplace(TEXT("Vanilla"));
	// FlavorArr1 == ["Chocolate","Vanilla"]

	auto FlavorArr2 = Str1Array;
	// FlavorArr2 == ["Chocolate","Vanilla"]

	bool bComparison1 = FlavorArr1 == FlavorArr2;
	// bComparison1 == true

	for (auto& Str : FlavorArr2)
	{
		Str = Str.ToUpper();
	}
	// FlavorArr2 == ["CHOCOLATE","VANILLA"]

	bool bComparison2 = FlavorArr1 == FlavorArr2;
	// bComparison2 == true, because FString comparison ignores case

	Exchange(FlavorArr2[0], FlavorArr2[1]);
	// FlavorArr2 == ["VANILLA","CHOCOLATE"]

	bool bComparison3 = FlavorArr1 == FlavorArr2;
	// bComparison3 == false, because the order has changed
```

## 堆

`TArray` 拥有支持二叉堆数据结构的函数。堆是一种二叉树，其中父节点的排序等于或高于其子节点。作为数组实现时，树的根节点位于元素0，索引N处节点的左右子节点的指数分别为2N+1和2N+2。子节点彼此间不存在特定排序。

调用 `Heapify` 函数可将现有数组转换为堆。此会重载为是否接受谓词，无谓词的版本将使用元素类型的 `operator<` 确定排序：

```cpp
	TArray<int32> HeapArr;
	for (int32 Val = 10; Val != 0; --Val)
	{
		HeapArr.Add(Val);
	}
	// HeapArr == [10,9,8,7,6,5,4,3,2,1]
	HeapArr.Heapify();
	// HeapArr == [1,2,4,3,6,5,8,10,7,9]
```

下图为树的展示：

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84c61f9b-11cf-4c72-ac35-72e817f774b3/image_0.png)

树中的节点按堆化数组中元素的排序从左至右、从上至下读取。注意：数组在转换为堆后无需排序。排序数组也是有效堆，但堆结构的定义较为宽松，同一组元素可存在多个有效堆。

通过HeapPush函数可将新元素添加到堆，对其他节点进行重新排序，以对堆进行维护：

```cpp
	HeapArr.HeapPush(4);
	// HeapArr == [1,2,4,3,4,5,8,10,7,9,6]
```

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/220ed2d4-2dcf-402f-b6e7-a3f7abc71874/image_1.png)

`HeapPop` 和 `HeapPopDiscard` 函数用于移除堆的顶部节点。这两个函数的区别在于前者引用元素的类型来返回顶部元素的副本，而后者只是简单地移除顶部节点，不进行任何形式的返回。两个函数得出的数组变更一致，重新正确排序其他元素可对堆进行维护：

```cpp
	int32 TopNode;
	HeapArr.HeapPop(TopNode);
	// TopNode == 1
	// HeapArr == [2,3,4,6,4,5,8,10,7,9]
```

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7427acc-d7d2-4309-81d1-040176a674e3/image_2.png)

`HeapRemoveAt` 将删除数组中给定索引处的元素，然后重新排列元素，对堆进行维护：

```cpp
	HeapArr.HeapRemoveAt(1);
	// HeapArr == [2,4,4,6,9,5,8,10,7]
```

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c37d7fa-4f00-4de1-90aa-9271fe0fbd68/image_3.png)

仅在结构已是有效堆时（如在 `Heapify` 调用、其他堆操作或手动将数组操作到堆中之后），才应调用 `HeapPush`、`HeapPop`、`HeapPopDiscard` 和 `HeapRemoveAt`。

此类函数（包括 `Heapify`）都可选择使用二元谓词决定堆中节点元素的排序。堆操作默认使用元素类型的 `operator<` 确定排序。如使用自定义谓词，须在所有堆操作中使用相同谓词。

最后，可使用 `HeapTop` 检查堆的顶部节点，无需变更数组：

```cpp
	int32 Top = HeapArr.HeapTop();
	// Top == 2
```

## Slack

可调整数组的大小，因此使用的内存量不同。为避免每次添加元素时重新分配内存，分配器提供的内存通常会超过必要内存，使之后调用 `Add` 时不会因重新分配内存而降低性能。同样，删除元素通常不会释放内存.此操作会使数组拥有Slack元素，也就是当前未使用的有效预分配元素储存槽。数组中存储的元素量与数组使用分配内存可存储的元素数量间的差值即为数组中的Slack量。

由于默认构建的数组不分配内存，Slack初始为零。使用 `GetSlack` 函数可找出数组中的Slack量。通过 `Max` 函数可获取容器重新分配前数组可保存的最大元素数量。`GetSlack` 等同 `Max` 和 `Num` 间的差值：

```cpp
	TArray<int32> SlackArray;
	// SlackArray.GetSlack() == 0
	// SlackArray.Num()      == 0
	// SlackArray.Max()      == 0

	SlackArray.Add(1);
	// SlackArray.GetSlack() == 3
	// SlackArray.Num()      == 1
	// SlackArray.Max()      == 4

	SlackArray.Add(2);
	SlackArray.Add(3);
	SlackArray.Add(4);
	SlackArray.Add(5);
	// SlackArray.GetSlack() == 17
	// SlackArray.Num()      == 5
	// SlackArray.Max()      == 22
```

分配器确定重新分配后容器中的Slack量。因此，用户不应认为Slack是常量。

虽然无需管理Slack，但可管理Slack对数组进行优化，以满足需求。例如，如需要向数组添加大约100个新元素，则可在添加前确保拥有可至少存储100个新元素的Slack，以便添加新元素时无需分配内存。上文所述的 `Empty` 函数接受可选Slack参数：

```cpp
	SlackArray.Empty();
	// SlackArray.GetSlack() == 0
	// SlackArray.Num()      == 0
	// SlackArray.Max()      == 0
	SlackArray.Empty(3);
	// SlackArray.GetSlack() == 3
	// SlackArray.Num()      == 0
	// SlackArray.Max()      == 3
	SlackArray.Add(1);
	SlackArray.Add(2);
	SlackArray.Add(3);
	// SlackArray.GetSlack() == 0
	// SlackArray.Num()      == 3
	// SlackArray.Max()      == 3
```

`Reset` 函数与Empty函数类似，不同之处是若当前内存分配已提供请求的Slack，该函数将不释放内存。但若请求的Slack较大，其将分配更多内存：

```cpp
	SlackArray.Reset(0);
	// SlackArray.GetSlack() == 3
	// SlackArray.Num()      == 0
	// SlackArray.Max()      == 3
	SlackArray.Reset(10);
	// SlackArray.GetSlack() == 10
	// SlackArray.Num()      == 0
	// SlackArray.Max()      == 10
```

最后，使用 `Shrink` 函数可移除所有Slack。此才做将把内存分配调整为保存当前元素所需的最小内存。`Shrink` 不会对数组中的元素产生影响。

```cpp
	SlackArray.Add(5);
	SlackArray.Add(10);
	SlackArray.Add(15);
	SlackArray.Add(20);
	// SlackArray.GetSlack() == 6
	// SlackArray.Num()      == 4
	// SlackArray.Max()      == 10
	SlackArray.Shrink();
	// SlackArray.GetSlack() == 0
	// SlackArray.Num()      == 4
	// SlackArray.Max()      == 4
```

## 原始内存

本质上而言，`TArray` 只是分配内存周围的包装器。直接修改分配的字节和自行创建元素即可将其用作包装器，此操作十分实用。`Tarray` 将尽量利用其拥有的信息进行执行，但有时需降低一个等级。

利用以下函数可在较低级别快速访问 `TArray` 及其数据，但若利用不当，可能会导致容器无效和未知行为。在调用此类函数后（但在调用其他常规函数前），可决定是否将容器返回有效状态。

`AddUninitialized` 和 `InsertUninitialized` 函数可将未初始化的空间添加到数组。两者工作方式分别与 `Add` 和 `Insert` 函数相同，只是不调用元素类型的构造函数。若要避免调用构造函数，建议使用此类函数。类似以下范例的情况中建议使用此类函数，其中计划用 `Memcpy` 调用完全覆盖结构体：

```cpp
	int32 SrcInts[] = { 2, 3, 5, 7 };
	TArray<int32> UninitInts;
	UninitInts.AddUninitialized(4);
	FMemory::Memcpy(UninitInts.GetData(), SrcInts, 4*sizeof(int32));
	// UninitInts == [2,3,5,7]
```

也可使用此功能保留计划自行构建对象所需内存：

```cpp
	TArray<FString> UninitStrs;
	UninitStrs.Emplace(TEXT("A"));
	UninitStrs.Emplace(TEXT("D"));
	UninitStrs.InsertUninitialized(1, 2);
	new ((void*)(UninitStrs.GetData() + 1)) FString(TEXT("B"));
	new ((void*)(UninitStrs.GetData() + 2)) FString(TEXT("C"));
	// UninitStrs == ["A","B","C","D"]
```

`AddZeroed` 和 `InsertZeroed` 的工作方式相似，不同点是会将添加/插入的空间字节清零：

```cpp
	struct S
	{
		S(int32 InInt, void* InPtr, float InFlt)
			: Int(InInt)
			, Ptr(InPtr)
			, Flt(InFlt)
		{
		}
		int32 Int;
		void* Ptr;
		float Flt;
	};
	TArray<S> SArr;
	SArr.AddZeroed();
	// SArr == [{ Int: 0, Ptr: nullptr, Flt: 0.0f }]
```

`SetNumUninitialized` 和 `SetNumZeroed` 函数的工作方式与 `SetNum` 类似，不同之处在于新数量大于当前数量时，将保留新元素的空间为未初始化或按位归零。与 `AddUninitialized` 和 `InsertUninitialized` 函数相同，必要时需将新元素正确构建到新空间中：

```cpp
	SArr.SetNumUninitialized(3);
	new ((void*)(SArr.GetData() + 1)) S(5, (void*)0x12345678, 3.14);
	new ((void*)(SArr.GetData() + 2)) S(2, (void*)0x87654321, 2.72);
	// SArr == [
	//   { Int: 0, Ptr: nullptr,    Flt: 0.0f  },
	//   { Int: 5, Ptr: 0x12345678, Flt: 3.14f },
	//   { Int: 2, Ptr: 0x87654321, Flt: 2.72f }
	// ]

	SArr.SetNumZeroed(5);
	// SArr == [
	//   { Int: 0, Ptr: nullptr,    Flt: 0.0f  },
	//   { Int: 5, Ptr: 0x12345678, Flt: 3.14f },
	//   { Int: 2, Ptr: 0x87654321, Flt: 2.72f },
	//   { Int: 0, Ptr: nullptr,    Flt: 0.0f  },
	//   { Int: 0, Ptr: nullptr,    Flt: 0.0f  }
	// ]
```

应谨慎使用"Uninitialized"和"Zeroed"函数族。如函数类型包含要构建的成员或未处于有效按位清零状态的成员，可导致数组元素无效和未知行为。此类函数适用于固定的数组类型，例如FMatrix和FVector。

## 其他

`BulkSerialize` 函数是序列化函数，可用作替代 \`operator<<，将数组作为原始字节块进行序列化，而非执行逐元素序列化。如使用内置类型或纯数据结构体等浅显元素，可改善性能。

`CountBytes` 和 `GetAllocatedSize` 函数用于估算数组当前内存占用量。`CountBytes` 接受 `FArchive`，可直接调用 `GetAllocatedSize`。此类函数常用于统计报告。

`Swap` 和 `SwapMemory` 函数均接受两个指数并交换此类指数上的元素值。这两个函数相同，不同点是 `Swap` 会对指数执行额外的错误检查，并断言索引是否超出范围。

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [TArray](/documentation/zh-cn/unreal-engine/array-containers-in-unreal-engine#tarray)
-   [创建和填充数组](/documentation/zh-cn/unreal-engine/array-containers-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E5%A1%AB%E5%85%85%E6%95%B0%E7%BB%84)
-   [迭代](/documentation/zh-cn/unreal-engine/array-containers-in-unreal-engine#%E8%BF%AD%E4%BB%A3)
-   [排序](/documentation/zh-cn/unreal-engine/array-containers-in-unreal-engine#%E6%8E%92%E5%BA%8F)
-   [查询](/documentation/zh-cn/unreal-engine/array-containers-in-unreal-engine#%E6%9F%A5%E8%AF%A2)
-   [移除](/documentation/zh-cn/unreal-engine/array-containers-in-unreal-engine#%E7%A7%BB%E9%99%A4)
-   [运算符](/documentation/zh-cn/unreal-engine/array-containers-in-unreal-engine#%E8%BF%90%E7%AE%97%E7%AC%A6)
-   [堆](/documentation/zh-cn/unreal-engine/array-containers-in-unreal-engine#%E5%A0%86)
-   [Slack](/documentation/zh-cn/unreal-engine/array-containers-in-unreal-engine#slack)
-   [原始内存](/documentation/zh-cn/unreal-engine/array-containers-in-unreal-engine#%E5%8E%9F%E5%A7%8B%E5%86%85%E5%AD%98)
-   [其他](/documentation/zh-cn/unreal-engine/array-containers-in-unreal-engine#%E5%85%B6%E4%BB%96)
# 虚幻引擎中的结构体 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/structs-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:41:06.341Z

---

目录

![结构体](https://dev.epicgames.com/community/api/documentation/image/db4cc926-c003-4df2-951e-00def01c6278?resizing_type=fill&width=1920&height=335)

**结构体（Struct）** 是一种数据结构，帮助你组织和操作相关属性。在虚幻引擎中，结构体会被引擎的反射系统识别为 `UStruct`，但不属于 [UObject](/documentation/zh-cn/unreal-engine/objects-in-unreal-engine)生态圈,且不能在[UClasses](/documentation/en-us/unreal-engine/API/Runtime/CoreUObject/UObject/UClass)的内部使用。

-   在相同的数据布局下， `UStruct` 比 `UObject` 能更快创建。
    
-   UStruct支持[UProperty](/documentation/zh-cn/unreal-engine/unreal-engine-uproperties), 但它不由垃圾回收系统管理，不能提供[UFunction](/documentation/zh-cn/unreal-engine/ufunctions-in-unreal-engine)。
    

## 实现UStruct

要把一个结构体变成 `UStruct`，请遵循以下步骤：

1.  打开你要定义结构体的 **header (.h)** 文件。
    
2.  要定义你的C++结构体，请将 `USTRUCT` 宏放在结构体定义的上方。
    
3.  将 `GENERATED_BODY()` 宏作为定义的第一行。
    

其结果应该与下面的的例子一致：

```cpp
	USTRUCT([Specifier, Specifier, ...])
	struct FStructName
	{
		GENERATED_BODY()
	};
```

你可以用`UPROPERTY`来标记结构体的相关变量，使它们在虚幻反射系统（ Unreal Reflection System）和蓝图脚本（Blueprint Scripting）中可见。参见\[UProperty Specifiers\]列表(programming-and-scripting/programming-language-implementation/unreal-engine-reflection-system/Properties/Specifiers)，了解该属性在引擎和编辑器的各种[模块](/documentation/zh-cn/unreal-engine/unreal-engine-modules)中如何表现。

## 结构体说明符

**结构体说明符** 提供元数据，控制你的结构在引擎和编辑器中各方面的表现。

结构体说明符

效果

`Atomic`

表示该结构体应始终被序列化为一个单元。将不会为该类创建自动生成的代码。标头仅用于解析元数据。

`BlueprintType`

将此结构体作为一种类型公开，可用于蓝图中的变量。

`NoExport`

将不会为该类创建自动生成的代码。标头仅用于解析元数据。

## 最佳做法与技巧

下面是一些使用 `UStruct` 时需要记住的有用提示：

1.  `UStruct` 可以使用虚幻引擎的[智能指针](/documentation/zh-cn/unreal-engine/smart-pointers-in-unreal-engine)和垃圾回收系统来防止垃圾回收删除 `UObjects`。
    
2.  结构体最好用于简单数据类型。对于你的项目中更复杂的交互，也许可以使用 `UObject` 或 `AActor` 子类来代替。
    
3.  `UStructs` **不可以** 用于复制。但是 `UProperty` 变量 **可以** 用于复制。
    
4.  虚幻引擎可以自动为结构体创建Make和Break函数。
    
    1.  Make函数出现在任何带有 `BlueprintType` 标签的 `Ustruct` 中。
    2.  如果在UStruct中至少有一个 `BlueprintReadOnly` 或 `BlueprintReadWrite` 属性，Break函数就会出现。
    3.  Break函数创建的纯节点为每个标记为 `BlueprintReadOnly` 或 `BlueprintReadWrite` 的资产提供一个输出引脚。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [ustruct](https://dev.epicgames.com/community/search?query=ustruct)
-   [structs](https://dev.epicgames.com/community/search?query=structs)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [实现UStruct](/documentation/zh-cn/unreal-engine/structs-in-unreal-engine#%E5%AE%9E%E7%8E%B0ustruct)
-   [结构体说明符](/documentation/zh-cn/unreal-engine/structs-in-unreal-engine#%E7%BB%93%E6%9E%84%E4%BD%93%E8%AF%B4%E6%98%8E%E7%AC%A6)
-   [最佳做法与技巧](/documentation/zh-cn/unreal-engine/structs-in-unreal-engine#%E6%9C%80%E4%BD%B3%E5%81%9A%E6%B3%95%E4%B8%8E%E6%8A%80%E5%B7%A7)
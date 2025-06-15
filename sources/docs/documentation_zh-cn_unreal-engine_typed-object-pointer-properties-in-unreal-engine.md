# Typed Object Pointer Properties in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/typed-object-pointer-properties-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:40:51.481Z

---

目录

![TSubclassOf](https://dev.epicgames.com/community/api/documentation/image/fb46f57c-d380-4faf-ab59-99f3abf903c5?resizing_type=fill&width=1920&height=335)

**TSubclassOf** 是提供 UClass 类型安全性的模板类。例如您在创建一个投射物类，允许设计者指定伤害类型。您可只创建一个 UClass 类型的 UPROPERTY，让设计者指定派生自 UDamageType 的类；或者您可使用 TSubclassOf 模板强制要求此选择。以下示例代码展示了不同之处：

```cpp
	/** type of damage */
	UPROPERTY(EditDefaultsOnly, Category=Damage)
	UClass* DamageType;
```

Vs.

```cpp
	/** type of damage */
	UPROPERTY(EditDefaultsOnly, Category=Damage)
	TSubclassOf<UDamageType> DamageType;
```

在第二个声明中，模板类告知编辑器的属性窗口只列出派生自 UDamageType 的类（作为属性选择）。在第一个声明中可选择任意 UClass。下图对此进行了说明。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e99fddff-0049-4e44-acc8-db8a5021ba49/image_0.png)

策略游戏投射物蓝图的范例

除 UPROPERTY 安全外，您还能获得 C++ 层级上的类型安全。如尝试进行不兼容 TSubclassOf 类型的相互指定，将出现编译错误。尝试指定泛型 UClass 时，它将执行一个运行时检查，以确定它可执行指定。如运行时检查失败，结果数值为 nullptr。

```cpp
	UClass* ClassA = UDamageType::StaticClass();

	TSubclassOf<UDamageType> ClassB;

	ClassB = ClassA; // Performs a runtime check

	TSubclassOf<UDamageType_Lava> ClassC;

	ClassB = ClassC; // Performs a compile time check
```

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
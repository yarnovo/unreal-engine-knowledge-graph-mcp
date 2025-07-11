# 在虚幻引擎蓝图中暴露游戏逻辑内容 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/exposing-gameplay-elements-to-blueprints-visual-scripting-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:35:18.010Z

---

目录

![向蓝图公开游戏逻辑内容](https://dev.epicgames.com/community/api/documentation/image/7ad85bc6-e739-40b8-a7f3-f4c7d3aad9c9?resizing_type=fill&width=1920&height=335)

作为一名程序员，使用蓝图可以使代码非常灵活，从而为您提供许多好处。例如， 游戏进程设计人员可能希望在游戏中实现一种新型武器。作为程序员， 您现在编写武器代码的方式与传统方式几乎完全相同，而不同之处仅在于您公开了一些重要的功能， 比如射速和Fire()函数。在游戏测试后，设计师确定他们需要改变枪支的射速 以呈曲线射击。设计师可以简单地进入蓝图并直接更改射速， 而不是对射速重新编码并重新编译游戏， 从而节省设计师和程序员的时间。

有关在项目中优化C++/蓝图发布版的详细信息，或在创建向蓝图公开的API时要记住的技巧， 请参阅[将C++暴露给蓝图](/documentation/zh-cn/unreal-engine/exposing-cplusplus-to-blueprints-visual-scripting-in-unreal-engine)。

## 使类可蓝图化

为了创建从某一个类扩展而来的蓝图，必须将该类定义为 **可蓝图化（Blueprintable）**； 这涉及到在类定义之前的 **UCLASS()** 宏中添加此关键字。此关键字使蓝图系统能够感知该类， 以便它显示在 **新建蓝图（New Blueprint）** 对话框的类列表中， 并且可以选择它作为所创建的蓝图的父类。

可蓝图化类最简单的声明形式如下所示：

```cpp
	UCLASS(Blueprintable)
	class AMyBlueprintableClass : AActor
	{
		GENERATED_BODY()
	}
```

关键字

说明

**可蓝图化（Blueprintable）**

将该类公开为可接受的用于创建蓝图的基类。默认值为不可蓝图化（NotBlueprintable），但以其他方式继承时除外。这是由子类继承的。

**蓝图类型（BlueprintType）**

将该类公开为可用于蓝图中的变量的类型。

**不可蓝图化（NotBlueprintable）**

指定此类不是用于创建蓝图的可接受基类。否定指定了可蓝图化关键字的父类的效果。

## 可读和可写属性

为了将C++类中定义的变量公开给从该类扩展而来的蓝图，必须使用变量定义之前的 **UPROPERTY()** 宏 中列出的下列关键字之一来定义该变量。 这些关键字使蓝图系统能够感知该变量，以便在 **我的蓝图（My Blueprint）** 面板中显示该变量， 并且可以设置或访问该变量的值。

```cpp
	//Character's Health
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Character")
	float health;

```

关键字

说明

**BlueprintReadOnly**

此属性可以由蓝图读取，但不能修改。

**BlueprintReadWrite**

此属性可以通过蓝图读取或写入。

**多播委托关键字**

 

**BlueprintAssignable**

应公开属性以在蓝图中分配。

**BlueprintCallable**

应公开属性以在蓝图图表中调用。

## 可执行和可覆盖函数

为了从蓝图调用本地函数，必须使用函数定义前面的 **UFUNCTION()** 宏 中列出的下列关键字之一来定义该函数。这些关键字使蓝图系统能够感知该函数， 以便在上下文菜单或控制板中显示该函数，并可将其添加到图中并执行 - 或者， 在发生事件的情况下，可以覆盖和执行这些函数。

BlueprintCallable函数最简单的声明形式如下所示：

```cpp
	//Fire a Weapon
	UFUNCTION(BlueprintCallable, Category="Weapon")
	void Fire();

```

在创建函数签名时，请注意，通过引用传递某一参数将使该参数成为蓝图节点上的输出引脚。若要使参数通过引用传递并仍然显示为输入， 请使用"UPARAM()"宏。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2395ffb1-7e16-4eb2-b03c-081a9ff80b47/uparam.png)

```cpp
	UFUNCTION(BlueprintCallable, Category = "Example Nodes")
	static void HandleTargets(UPARAM(ref) TArray<FVector>& InputLocations, TArray<FVector>& OutputLocations);

```

您还可以使用"UPARAM()"来更改引脚的显示名称。例如，KismetMathLibrary中的MakeRotator函数使用"UPARAM()"和"DisplayName"关键字来更改绕Z轴的旋转、绕X轴的旋转、绕Y轴的旋转参数在蓝图中的显示方式。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8f7194c-97e8-4f86-a662-727ff02aafe0/uparam2.png)

```cpp
	/** 根据采用度数的旋转值制作一个旋转体{绕Z轴的旋转、绕X轴的旋转、绕Y轴的旋转} */
	UFUNCTION(BlueprintPure, Category="Math|Rotator", meta=(Keywords="construct build rotation rotate rotator makerotator", NativeMakeFunc))
	static FRotator MakeRotator(
	UPARAM(DisplayName="X (Roll)") float Roll,
	UPARAM(DisplayName="Y (Pitch)") float Pitch,
	UPARAM(DisplayName="Z (Yaw)") float Yaw);
```

关键字

说明

**Blueprint到Native通信**

 

**BlueprintCallable**

这是一种可以从执行本地代码的蓝图中调用的本地函数，这些代码将更改它所调用的对象的某些内容或一些其他全局状态。这意味着，必须"调度"此函数，或者明确地告诉它相对于其他节点执行的顺序。我们用白色的执行行来执行此操作。所有蓝图可调用函数将按照它们在白色执行行上出现的顺序调用。

**BlueprintPure**

这是一种可以从执行本地代码的蓝图中调用的本地函数，这些代码不会更改它所调用的对象的任何内容或任何其他全局状态。这意味着调用这个节点不会改变任何东西，它只需要输入，然后告诉您输出。它们是诸如数学节点（+、-、\*等）、或者变量获取器或者任何永远都不会改变任何内容的项目之类的东西。它们不需要调度，也没有白色的执行行的连接。它们由编译器根据哪个BlueprintCallable节点需要这些节点生成的数据而自动计算出来。

**Native到蓝图通信**

 

**BlueprintImplementableEvent**

这是我们允许本地函数调用蓝图的主要方式。它们就像您在蓝图本身中实现的虚拟函数。如果不存在实现，则该函数调用将被忽略。必须注意的是，如果BlueprintImplementableEvent没有返回值或输出参数，那么它将显示为一个事件，可以通过**右键单击**并在蓝图的事件图表中选择它来使用。如果它有返回值或任何输出参数，它将在 **我的蓝图（My Blueprints）** 选项卡中列出，然后可以通过 **右键单击** 并选择实施函数来覆盖。请注意，BlueprintImplementableEvents没有函数的本地实现。

**BlueprintNativeEvent**

除了如果蓝图没有覆盖此函数，则调用此函数的本地默认实现之外，此函数与上述函数别无二致。如果您想要某种默认行为（而蓝图没有实现它），但又希望蓝图能够在需要时覆盖功能，那么此函数将大有帮助。这些函数的使用成本更高，所以我们只将它们用在需要功能的地方。当您覆盖BlueprintNativeEvent时，如果需要，您仍然可以调用本地实现，方法是在事件或函数条目节点上 **右键单击**，并选择"将调用添加到父项（Add call to parent）"。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使类可蓝图化](/documentation/zh-cn/unreal-engine/exposing-gameplay-elements-to-blueprints-visual-scripting-in-unreal-engine#%E4%BD%BF%E7%B1%BB%E5%8F%AF%E8%93%9D%E5%9B%BE%E5%8C%96)
-   [可读和可写属性](/documentation/zh-cn/unreal-engine/exposing-gameplay-elements-to-blueprints-visual-scripting-in-unreal-engine#%E5%8F%AF%E8%AF%BB%E5%92%8C%E5%8F%AF%E5%86%99%E5%B1%9E%E6%80%A7)
-   [可执行和可覆盖函数](/documentation/zh-cn/unreal-engine/exposing-gameplay-elements-to-blueprints-visual-scripting-in-unreal-engine#%E5%8F%AF%E6%89%A7%E8%A1%8C%E5%92%8C%E5%8F%AF%E8%A6%86%E7%9B%96%E5%87%BD%E6%95%B0)
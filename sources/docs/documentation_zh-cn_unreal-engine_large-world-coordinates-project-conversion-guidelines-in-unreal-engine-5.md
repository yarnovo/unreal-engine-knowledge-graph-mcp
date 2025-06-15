# 虚幻引擎5中的大型世界坐标项目转换指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5
> 
> 生成时间: 2025-06-14T19:52:49.499Z

---

目录

![大型世界坐标项目转换指南](https://dev.epicgames.com/community/api/documentation/image/87467260-3224-4417-a726-a5207e78ca82?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**大型世界坐标**（**LWC**）在设计之初就是要确保能无缝整合你的现有项目。你可以将项目导入 **虚幻引擎5** ，然后按照本指南进行转换，不过可能会出现一些问题。在源代码中，变体类型有一个声明类型别名，默认为double类型，与原来 **虚幻引擎4**（UE4）中的名称匹配。你现有的代码将自动重新编译以支持double。

## 修改的别名类型

为了将来实现兼容性，我们建议你尽量使用FVector别名，仅在必要时使用显式的FVector3f或FVector3d类型。

下表显示了已转换为变体的以下类型：

默认（Double变量别名）

浮点变体

Double变体

FVector

FVector3f

FVector3d

FVector2D

FVector2f

FVector2d

FVector4

FVector4f

FVector4d

FMatrix（FScaleMatrix、FQuatRotationTranslationMatrix等。)

FMatrix44f

FMatrix44d

FPlane

FPlane4f

FPlane4d

FQuat

FQuat4f

FQuat4d

FRotator

FRotator3f

FRotator3d

FTransform

FTransform3f

FTransform3d

FBox

FBox3f

FBox3d

FBox2D

FBox2f

FBox2d

FSphere

FSphere3f

FSphere3d

FBoxSphereBounds

FBoxSphereBounds3f

FBoxSphereBounds3d

FCapsuleShape

FCapsuleShape3f

FCapsuleShape3d

FDualQuat

FDualQuat4f

FDualQuat4d

FRay

FRay3f

FRay3d

为了将来保持兼容性，除非绝对必要，否则我们不建议使用变体类型。相反，你应该使用上表中列出的原始版本，并且仅在需要确保特定类型的情况下，使用显式float和double类型。

如果要在不同变体之间进行类型转换，则你必须显式执行此操作。例如：

```cpp
		FVector Vec(1.0, 2.0, 3.0);

		FVector3f AsFloat = FVector3f(Vec);

		FVector3f AsFloat = Vec; 	// 将无法编译。

```

## FMath对Double的支持

FMath已扩展为支持Double。这包括对新类型的标准数学运算的支持。

这包括来自位于UnrealMathSSE.h/UnrealMathNeon.h directory目录中VectorRegister的向量化支持，该目录添加了VectorRegister4f和VectorRegister4d类型。

## 测试大型世界

由于UE5中的大型世界处于测试状态，默认的 `WORLD_MAX` 大小已保留为UE4的 `WORLD_MAX` 大小（21公里），并且仍然启用对世界边界的引擎检查。你有两种选择来测试大型世界的场景大小：

找到WorldSettings类并将你的 `bEnableLargeWorlds` 布尔值设置为 `true` ，即可禁用边界检查：

```cpp
		AWorldSettings::bEnableLargeWorlds = true

```

这将使 `WORLD_MAX` 的值保持在21公里左右，并为虚幻引擎5.0初始版本中的实验提供更高的稳定性。

你也可以设置 `UE_USE_UE4_WORLD_MAX` 的全局值，以便实现更大的世界边界：

```cpp
	UE_USE_UE4_WORLD_MAX=0

```

这会将 `WORLD_MAX` 值设置为大约8800万公里。

此值可能会在未来发布虚幻引擎版本之前发生变化，并且可能会出现稳定性问题，在虚幻引擎5的整个开发过程中，这些问题将不断优化。

# 代码编译错误

你将在下面找到几类编译错误及解决方案建议。

## 变体类型的前向声明

在编写前向声明语句时，你应该使用宏UE\_DECLARE\_LWC\_TYPE。

例如，并非：

```cpp
	struct FVector;

```

FVector应该声明为：

```cpp
	UE_DECLARE_LWC_TYPE (Vector, 3);

```

请参阅 `Engine/Source/Runtime/Core/Public/CoreFwd.h` ，以了解每种类型正确使用 `UE_DECLARE_LWC_TYPE` 的示例。

所有包含generated.h或CoreMinimal.h的文件都不需要前向声明变体类型。

### 错误：C2027/C2371

如果你的项目生成FVector或其他变体类型的C2027/C2371错误，则最可能的原因是，你将该类型的前向声明用作了代码中的结构体。

## 警告："参数导致函数解析不明确"（Warnings: "Arguments cause function resolution ambiguity"）

如果你正在调用包含混合变体类型、浮点或常量参数的多参数FMath函数，你可能会看到上述类似警告。

**切勿忽略函数解析不明确警告** ，因为这可能表明你的程序中出现了潜在精度损失。

你可以通过传递显式模板参数、转换不匹配的类型或修改常量以匹配所需类型来纠正精度错误。

例如：

```cpp
		FMath::Max(MyVector.X, double(MyFloat));

```

## 在Float和Double变体类型之间转换需要进行显式类型转换

在代码中的float和double变体类型之间进行转换，需要进行显式转换，以便避免意外的精度或性能问题。

例如，在将FVector3f传递给需要FVector4的函数时，你可能需要考虑此行为。FVector3f应该转换为FVector3，这使得从FVector到FVector4的隐式类型转换能够完成转换。

显式类型转换适用于内部系统中的类似类型。例如，Chaos FVec3转换到FVector3f。

## 着色器参数

GPU不支持double参数。因此，原生代码中的SHADER\_PARAMETER声明中不再支持FVector、FVector2D、FVector4和FMatrix，需要切换到相应类型的浮点变体。

## 运行时检查故障

你可能会遇到运行时检查故障，例如：

TArray::BulkSerialize中的元素数组大小不同于预期

这些可能是因为，对结构体进行批量序列化时，有一个类型自动转换为了double变体类型。这可以通过添加基于存档版本的bForcePerElementSerialization参数来解决。

```cpp
	MyArray.BulkSerialize(Ar, Ar.UEVer() < EUnrealEngineObjectUE5Version::LARGE_WORLD_COORDINATES);

```

我们建议你确保你的存档是最新版本。

# 精度问题

将LWC类型组件转换为double类型，可能会在转换后的UE4项目中引发精度问题，尤其是你在编写代码时期望这些组件为float的情况。我们建议你在升级后就这些问题审核你的代码。

## 启用不安全的类型转换警告

你将在下面找到几种可用于使你的项目接收不安全类型转换警告的方法。

### 按模块

你可以将以下内容添加到项目的build.cs文件中：

```cpp
	UnsafeTypeCastWarningLevel = WarningLevel.Warning;

```

虽然这可能会在大型代码库中产生大量警告，但对于检测和修复可能导致精度损失的情况，它非常有用。

目前一些引擎头文件会产生不安全的类型转换警告。这些问题将在未来的版本中修复。

### 按单个文件或代码块

以下宏可启用不安全类型转换警告的切换：

宏

说明

PRAGMA\_FORCE\_UNSAFE\_TYPECAST\_WARNINGS

无论模块设置如何，不安全的类型转换都会在此之后产生错误。

PRAGMA\_DISABLE\_UNSAFE\_TYPECAST\_WARNINGS

无论模块设置如何，不安全的类型转换都将被忽略。

PRAGMA\_RESTORE\_UNSAFE\_TYPECAST\_WARNINGS

强制/禁用（FORCE/DISABLE）块的结束标记。行为恢复为模块设置。如果未正确关闭块，CheckBalancedMacros自动化脚本将失败。

## 确保在存储类型组件的副本时无精度损失。

可以直接访问类型组件的代码可能需要进行一些重构，以便避免精度损失。精度错误可能导致无效的代码执行，例如：

```cpp
	const float X = MyVector.X;

	// MyVector.X可能比我们现在预期的更精确。
	//SMALL_NUMBER == 1e-8 (0.00000001)
	// Double到float的转换可能会引发低至6位有效数字的精度误差。

	if(FMath::Abs(X - OtherVector.X) > SMALL_NUMBER)
	{
	 // 如果MyVector.X和OtherVector.X相同，我们预计不会进入这一步。
	}

```

对于 `MyVector.X` 的精确double值，`X` 和 `OtherVector.X` 增量之间的差异可能足以导致代码遵循此路径。

对于计划扩展超过10.5公里边界的旧UE4浮点限制的项目，当你远离原点时，将变得越来越危险：

```cpp
	float X = MyVector.X;

	X += 0.5f;

	MyVector.X = X;	// 精度损失。

```

如果你打算在转换后的项目中使用大型世界坐标，那么你需要就这些精度错误审核你的代码库。

LWC类型会将FReal别名公开给它们的底层组件类型（float或double）。使用FReal代替基本类型将确保你避免精度问题，即使这些类型将来会发生变化，例如：

```cpp
	FVector::FReal ReallyADoubleNow = FMath::Cos(MyVector.X);

```

一种改进方法是，在整个代码库将float类型更新为double类型：

```cpp
	double ReallyADoubleNow = FMath::Cos(MyVector.X);

```

可以直接访问类型组件的代码可能需要重构，以便避免精度损失。

打算保持在浮点边界内（距原点约10.5公里）的转换后UE4项目可能会出现精度损失，但可能不会对你的项目产生负面影响。

## 变体类型的批量序列化

默认情况下，转换后的项目会禁用默认核心类型（FVector）数组的批量序列化。引擎需要将每个向量分量加载为float，然后将其转换为double。当受影响的资产重新保存时，它会作为double编写，批量序列化将再次起作用。 如果你正在对包含变体类型的结构体进行批量序列化操作，那么你需要将其转换为使用float变体，或者在 `BulkSerialize` 调用/禁用 `TCanBulkSerialize` 支持中强制逐实例序列化。

## 减少核心类型的内存占用

序列化核心类型（标有属性说明符）将自动识别double和float之间的切换，使你能够通过随时切换到float变体来追溯回收浪费的内存。

## 蓝图

在UE5中，所有蓝图中的浮点类型都改由一种修改后的浮点类型表示，该浮点类型能够以单精度或双精度运行。这意味着你的蓝图将自动支持LWC场景大小。由于移除了蓝图中的显式float/double支持，导入的UE4蓝图项目中的所有float或double类型都会升级为新类型。

### 源代码接口

源代码现在可以暴露float和double类型。 **虚幻标头工具（Unreal Header Tool** （**UHT**）会根据情况，将代码中所有蓝图可访问浮点类型解译为单精度（C++ float）或双精度（C++ double）子类型的蓝图浮点，从而自动转换为蓝图节点支持的浮点值。 我们建议在使用浮点术语时谨慎小心。

在蓝图中，float可以指单精度或双精度浮点。但是，在C++中，你需要明确说明你要表达的意思。 术语"float"专指单精度浮点，而"double"指双精度浮点。虚幻标头工具（Unreal Header Tool）会将这两种类型都识别为对属性或函数参数有效。如果类型是"float"或"double"，蓝图会将其中任何一个视为单数"Float"类型，但会指明浮点是单精度还是双精度。

![单浮点精度节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/275a801a-6eb4-42a2-94f1-c85d7ee3e33e/floatsingleprecision.png)

从蓝图用户的角度来看，单精度或双精度类型没有区别，这些引脚无需显式类型转换节点即可连接。不过，这类情况下，虚幻引擎可能会执行"缩小"或"扩大"转换。蓝图编译器会自动分析蓝图图表，以便查找合适的浮点转换。如果检测到可转换内容，编译器会自动将类型转换操作插入到底层代码中。这也适用于容器。

开发人员无需对老版本的蓝图内容进行特殊修复，即可使用大型世界坐标。默认情况下，虚幻引擎会自动将float引脚转换为使用双精度。如有引脚用于原生C++代码中的单精度浮点，则它会确保这些引脚继续表示单精度浮点。这包括原生C++属性、函数参数以及绑定到原生C++委托的所有蓝图函数的参数。

### 用于暴露浮点值的UFUNCTION属性说明符

凡是标有UFUNCTION属性说明符，且包含浮点数据值的方法，都存在引发不精确性的风险，因为蓝图浮点值会被转换为精度较低的浮点。所以务必要审核所有现有UFUNCTION属性。这有助于确定是否有必要将参数或返回值切换为double类型，以便避免将来出现精度问题。你随时可以在float和double类型之间切换。

这适用于你可能在代码中构造或公开的所有K2节点。

# 插件 - 面向发布插件作者的指南

在转换现有插件以便支持大型世界时，我们建议你谨慎行事，以避免插件精度损失。我们建议参考精度问题（Precision Issues）小节中列出的通用指南来更新你的插件核心类型组件。

## 完整世界空间插件

某些插件的内容可能需要转换到完整世界空间。这可以通过将基础类型转换为double来实现，尽管当你将插件升级到UE5时，引擎会完成大部分转换，但你最好检查并确保代码没有将结果存储为float，从而导致精度丢失。

例如：在UE4中用于表示世界坐标的FVector，在UE5中已升级为双精度类型，但是，如果你的插件会在组件层面访问核心类型，则可能需要对你的代码进行一些重构，以便保持精度。

## 仅限世界空间原点的插件

某些插件只在其局部浮点比例空间内运行，然后借助引擎在世界空间原点渲染结果。在这种情况下，你可能需要了解如何将插件内部使用的核心类型转换为float变体，以便回收double丢失的内存。

## 同时支持UE4和UE5

如果某个插件同时针对这两个引擎版本，则需要以源代码方式发布（方便编译），或作编译成两种单独的二进制文件并发布。UE4不支持核心类型变体，因此你需要确保与UE5兼容的代码仅使用默认核心类型（在UE4中编译为float，在UE5中编译为double），或为插件的UE4和UE5版本提供单独的源代码。

为了确保使用核心类型组件进行中间计算时精度正确，你可以使用自动c++声明或double来处理。

# LWC渲染概述

本次将新的HLSL类型与大型世界坐标一起引入，可以在LargeWorldCoordinates.ush文件中找到。有关如何将着色器代码转换为UE5的更多信息，请参阅[LWC渲染文档](/documentation/zh-cn/unreal-engine/large-world-coordinates-rendering-in-unreal-engine-5)。

-   [beta](https://dev.epicgames.com/community/search?query=beta)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [修改的别名类型](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E4%BF%AE%E6%94%B9%E7%9A%84%E5%88%AB%E5%90%8D%E7%B1%BB%E5%9E%8B)
-   [FMath对Double的支持](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#fmath%E5%AF%B9double%E7%9A%84%E6%94%AF%E6%8C%81)
-   [测试大型世界](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E6%B5%8B%E8%AF%95%E5%A4%A7%E5%9E%8B%E4%B8%96%E7%95%8C)
-   [代码编译错误](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E4%BB%A3%E7%A0%81%E7%BC%96%E8%AF%91%E9%94%99%E8%AF%AF)
-   [变体类型的前向声明](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E5%8F%98%E4%BD%93%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%89%8D%E5%90%91%E5%A3%B0%E6%98%8E)
-   [错误：C2027/C2371](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E9%94%99%E8%AF%AF%EF%BC%9Ac2027/c2371)
-   [警告："参数导致函数解析不明确"（Warnings: "Arguments cause function resolution ambiguity"）](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E8%AD%A6%E5%91%8A%EF%BC%9A%22%E5%8F%82%E6%95%B0%E5%AF%BC%E8%87%B4%E5%87%BD%E6%95%B0%E8%A7%A3%E6%9E%90%E4%B8%8D%E6%98%8E%E7%A1%AE%22%EF%BC%88warnings:%22argumentscausefunctionresolutionambiguity%22%EF%BC%89)
-   [在Float和Double变体类型之间转换需要进行显式类型转换](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E5%9C%A8float%E5%92%8Cdouble%E5%8F%98%E4%BD%93%E7%B1%BB%E5%9E%8B%E4%B9%8B%E9%97%B4%E8%BD%AC%E6%8D%A2%E9%9C%80%E8%A6%81%E8%BF%9B%E8%A1%8C%E6%98%BE%E5%BC%8F%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2)
-   [着色器参数](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E7%9D%80%E8%89%B2%E5%99%A8%E5%8F%82%E6%95%B0)
-   [运行时检查故障](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E8%BF%90%E8%A1%8C%E6%97%B6%E6%A3%80%E6%9F%A5%E6%95%85%E9%9A%9C)
-   [精度问题](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E7%B2%BE%E5%BA%A6%E9%97%AE%E9%A2%98)
-   [启用不安全的类型转换警告](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E5%90%AF%E7%94%A8%E4%B8%8D%E5%AE%89%E5%85%A8%E7%9A%84%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2%E8%AD%A6%E5%91%8A)
-   [按模块](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E6%8C%89%E6%A8%A1%E5%9D%97)
-   [按单个文件或代码块](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E6%8C%89%E5%8D%95%E4%B8%AA%E6%96%87%E4%BB%B6%E6%88%96%E4%BB%A3%E7%A0%81%E5%9D%97)
-   [确保在存储类型组件的副本时无精度损失。](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E7%A1%AE%E4%BF%9D%E5%9C%A8%E5%AD%98%E5%82%A8%E7%B1%BB%E5%9E%8B%E7%BB%84%E4%BB%B6%E7%9A%84%E5%89%AF%E6%9C%AC%E6%97%B6%E6%97%A0%E7%B2%BE%E5%BA%A6%E6%8D%9F%E5%A4%B1%E3%80%82)
-   [变体类型的批量序列化](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E5%8F%98%E4%BD%93%E7%B1%BB%E5%9E%8B%E7%9A%84%E6%89%B9%E9%87%8F%E5%BA%8F%E5%88%97%E5%8C%96)
-   [减少核心类型的内存占用](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E5%87%8F%E5%B0%91%E6%A0%B8%E5%BF%83%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%86%85%E5%AD%98%E5%8D%A0%E7%94%A8)
-   [蓝图](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E8%93%9D%E5%9B%BE)
-   [源代码接口](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E6%BA%90%E4%BB%A3%E7%A0%81%E6%8E%A5%E5%8F%A3)
-   [用于暴露浮点值的UFUNCTION属性说明符](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E7%94%A8%E4%BA%8E%E6%9A%B4%E9%9C%B2%E6%B5%AE%E7%82%B9%E5%80%BC%E7%9A%84ufunction%E5%B1%9E%E6%80%A7%E8%AF%B4%E6%98%8E%E7%AC%A6)
-   [插件 - 面向发布插件作者的指南](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E6%8F%92%E4%BB%B6-%E9%9D%A2%E5%90%91%E5%8F%91%E5%B8%83%E6%8F%92%E4%BB%B6%E4%BD%9C%E8%80%85%E7%9A%84%E6%8C%87%E5%8D%97)
-   [完整世界空间插件](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E5%AE%8C%E6%95%B4%E4%B8%96%E7%95%8C%E7%A9%BA%E9%97%B4%E6%8F%92%E4%BB%B6)
-   [仅限世界空间原点的插件](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E4%BB%85%E9%99%90%E4%B8%96%E7%95%8C%E7%A9%BA%E9%97%B4%E5%8E%9F%E7%82%B9%E7%9A%84%E6%8F%92%E4%BB%B6)
-   [同时支持UE4和UE5](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#%E5%90%8C%E6%97%B6%E6%94%AF%E6%8C%81ue4%E5%92%8Cue5)
-   [LWC渲染概述](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5#lwc%E6%B8%B2%E6%9F%93%E6%A6%82%E8%BF%B0)
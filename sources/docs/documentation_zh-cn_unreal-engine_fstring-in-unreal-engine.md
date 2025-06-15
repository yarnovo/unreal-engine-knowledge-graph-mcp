# 虚幻引擎中的FString | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:40:12.792Z

---

目录

![FString](https://dev.epicgames.com/community/api/documentation/image/64b99846-9975-47c7-b7c0-7bd69678d34a?resizing_type=fill&width=1920&height=335)

与 `FName` 和 `FText` 不同，`FString` 可以与搜索、修改并且与其他字符串比较。不过，这些操作会导致 `FString` 的开销比不可变字符串类更大。这是因为 `FString` 对象保存自己的字符数组，而 `FName` 和 `FText` 对象保存共享字符数组的指针，并且可以完全根据索引值建立相等性。

## 创建 FString

使用以下语法声明 `FString` 变量：

```cpp
	FString TestHUDString = FString(TEXT("This is my test FString."));
```

## 转换

### 字符串变量

#### 从FString

从

到

范例

FString

FName

`TestHUDName = FName(*TestHUDString);`

FString -> FName不可靠。因为FName不区分大小写，所以转换存在损耗。

FString

FText

`TestHUDText = FText::FromString(TestHUDString);`

FString -> FText在一些情况下有效，但需注意——FString内容不会从FText的"自动本地化"中受益。

#### 到 FString

从

到

范例

FName

FString

`TestHUDName = TestHUDText.ToString();`

FText -> FString不可靠，因为这种转换对于某些语言来说可能存在损耗。

FText

FString

`TestHUDString = TestHUDText.ToString();`

FText -> FString不可靠，因为这种转换对于某些语言来说可能存在损耗。

### 数字和其他变量

#### 到FString

变量类型

从字符串转换

字符串格式

float

`FString::SanitizeFloat(FloatVariable);`

 

int

`FString::FromInt(IntVariable);`

 

bool

`InBool ? TEXT("true") : TEXT("false");`

either 'true' or 'false'

FVector

`VectorVariable.ToString();`

'X= Y= Z='

FVector2D

`Vector2DVariable.ToString();`

'X= Y='

FRotator

`RotatorVariable.ToString();`

'P= Y= R='

FLinearColor

`LinearColorVariable.ToString();`

'(R=,G=,B=,A=)'

UObject

`(InObj != NULL) ? InObj->GetName() : FString(TEXT("None"));`

UObject's FName

对于其他数值转换，可使用带合适参数的 **FString::Printf()** 函数。

#### 从FString

从 FString 到 int 和浮点型数字变量，以及到布尔型变量之间也存在转换。

变量类型

从字符串转换

注解

bool

`TestHUDString.ToBool();`

 

int

`FCString::Atoi(*TestHUDString);`

 

float

`FCString::Atof(*TestHUDString);`

 

## 对比

重载的 == 运算符可用于两个 FString 的对比，或把 FString 比作一个 TCHAR\*s 阵列。此外还有 **FString::Equals()** 法， 用 FString 进行测试，用 **ESearchCase** 枚举进行对比，确定是否作为参数忽略大小写。如希望对比忽略大小写，使用 **ESearchCase::IgnoreCase**； 如不忽略，则使用 **ESearchCase::CaseSensitive**。

```cpp
	TestHUDString.Equals(TEXT("Test"), ESearchCase::CaseSensitive);
```

## 搜索

在 FString 中搜索时有两种搜索类型。第一种是 **FString::Contains()**，找到子字符串后返回 true，否则返回 *false*。 FString::Contains() 可搜索 FString 或 TCHAR\*s 子字符串。ESearchCase 枚举可用于指定搜索是否忽略大小写。此外，`ESearchDir` 枚举可用于指定搜索的方向。 默认设置为忽略大小写，从开始执行搜索。

```cpp
	TestHUDString.Contains(TEXT("Test"), ESearchCase::CaseSensitive, ESearchDir::FromEnd);

```

第二种是 `FString::Find()`，返回找到的第一个子字符串实例的索引。`FString::Find()` 可对 `FString` 或 `TCHAR*`s 子字符串进行搜索。 和 `FString::Contains()` 一样，可对大小写敏感度和搜索方向进行指定，默认设置为忽略大小写并从字符串开头开始搜素。也可在索引中任选一个索引开始搜索。 如 `FString::Find()` 未找到子字符串，它将返回 -1。

```cpp
	TestHUDString.Find(TEXT("test"), ESearchCase::CaseSensitive, ESearchDir::FromEnd, 10);
```

## 构建 FString

可通过两种方法用子字符串或其他变量类型构建字符串。首先，串联只接受 FString 作为参数。在串联其他类型的变量时需要将其转换为 FString。 第二，`Printf` 可接受数字输入（如 int 和浮点），在输入被添加到字符串时还可对其格式进行设置。

### 串联

有两个运算符用于串联字符串：

运算符

描述

用法

`+=`

将提供的字符串附加到 FString 对象。

`StringResult += AddedString;`

`+`

新建一个 FString 对象并附加提供的字符串。

 

### Printf

用 **FString::Printf** 构建的 FString 可被存入 FStrings，并与 [UE\_LOG 调试信息](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#debugmessaging) 一同显示到屏幕上。 格式参数拥有和 C++ printf 函数相同的说明符，如下例所示。

```cpp
	FString AShooterHUD::GetTimeString(float TimeSeconds)
	{
	// only minutes and seconds are relevant
	const int32 TotalSeconds = FMath::Max(0, FMath::TruncToInt(TimeSeconds) % 3600);
	const int32 NumMinutes = TotalSeconds / 60;
	const int32 NumSeconds = TotalSeconds % 60;

	const FString TimeDesc = FString::Printf(TEXT("%02d:%02d"), NumMinutes, NumSeconds);
	return TimeDesc;
	}

```

使用 %s 参数包含 FStrings 时，必须使用 `*` 运算符返回 %s 参数所需的 TCHAR\*。

## 操作字符串

可通过许多函数操作字符串。在此会提到部分函数，如需了解可用 FString 函数的完整列表，请查看 UnrealString.h 或 FString 上的 API 文档。 复制字符串分段的函数：Left、Right 和 Mid。可在找到的子字符串的位置将一个字符串分为两个字符串。 使用 `Split` 法即可完成此操作。拆分字符串的另一个方法是 **ParseIntoArray**，可将一个字符串拆分为字符串阵列，由指定的分隔符隔开。 使用 **ToUpper** 和 **ToLower** 即可完成大小写转换，将字符串转换为大写或小写。

## HUD 中的 FStrings

### Canvas

如需在 HUD 中显示 FString，使用 [Canvas](/documentation/zh-cn/unreal-engine/user-interfaces-and-huds-in-unreal-engine#canvas) 调用 **FCanvas::DrawText()** 函数：

```cpp
	Canvas->DrawText(BigFont, TestHUDString, 110.0f,110.0f);

```

必须在 HUD 类的 **DrawHUD()** 函数中调用 **DrawText()** 函数，或在以 DrawHUD() 开始的函数链中调用。

## 调试信息

FString 可被打印到 **视口** 和 **输出日志**，以便进行调试。

### 打印到视口

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50707fdd-7514-4b8b-84c3-180b8bfa7fa6/debugtoscreen.png)

使用 **UEngine::AddOnScreenDebugMessage()** 将调试信息打印到 **视口**。此函数接受以下四个参数（按照顺序）：

参数名

参数类型

描述

Key

int

防止相同信息多次添加的唯一键。使用 -1 作为键，使调试信息短时出现。

TimeToDisplay

float

信息显示时长，按秒计。

DisplayColor

FColor

文本显示的颜色。

DebugMessage

FString

显示的信息（FString）。

**范例：**

```cpp
	GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Blue, TestHUDString);

```

### 打印到输出日志

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33ffa4db-3b88-4486-8297-e82fc7c7dcdc/debugtolog.png)

**UE\_LOG** 使用 printf 标记进行参数化。

```cpp
	UE_LOG(LogClass, Log, TEXT("This is a testing statement.%s"), *TestHUDString);

```

-   LogClass 为日志类别。可使用现有的类别（在 OutputDevices.h 中用 DECLARE\_LOG\_CATEGORY\_EXTERN 宏设置）或使用 DEFINE\_LOG\_CATEGORY\_STATIC 自行定义。
-   Log 为使用的冗余度。冗余度在 **ELogVerbosity** 枚举中被定义。有效值为 Fatal、Error、Warning、Display、Log、Verbose 或 VeryVerbose。
-   下一个参数即为希望输出的文本，包括对参数的标记。

此范例使用一个 %s 参数，因此 `*` 运算符用于返回 %s 参数所需的 TCHAR\*。

使用 UE\_LOG 打印的信息位于 **Output Log** 中（虚幻编辑器中 **Window > Output Log**）。

## 转换宏编码

FString 类构建在 TCHARs 的 TArray 之上。有多个宏可用于将应用字符串（TCHAR\*）转换至 ANSI 或 UNICODE 字符集，反之亦然。 宏定义的存储路径为：Engine\\Source\\Runtime\\Core\\Public\\Containers\\StringConv.h。

如字符串相对较小，分配将在叠列上作为转换符类的部分完成；否则堆将被用于分配临时缓冲区。使用堆之前的尺寸为一个模板参数， 因此可将这调整到应用程序中。这在循环中是安全的操作，因为类的作用域将从叠列分配弹出。

常用转换宏有：

-   TCHAR\_TO\_ANSI - 将引擎字符串（TCHAR\*）转换为 ANSI 字符串。
    
-   ANSI\_TO\_TCHAR - 将 ANSI 字符串转换为引擎字符串（TCHAR\*）。
    

这些宏声明的对象的生命周期非常短。它们将被用作函数的参数。无法将一个变量指定到转换后的字符串内容， 因为对象将处于作用域之外，字符串将被释放。

传入的参数必须是一个固有字符串，因为参数被类型转换为指针。如传入的是 TCHAR 而非 TCHAR\*，编译后运行时将出现崩溃。

用法：**SomeApi(TCHAR\_TO\_ANSI(SomeUnicodeString));**

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [strings](https://dev.epicgames.com/community/search?query=strings)
-   [fname](https://dev.epicgames.com/community/search?query=fname)
-   [ftext](https://dev.epicgames.com/community/search?query=ftext)
-   [fstring](https://dev.epicgames.com/community/search?query=fstring)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建 FString](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#%E5%88%9B%E5%BB%BAfstring)
-   [转换](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#%E8%BD%AC%E6%8D%A2)
-   [字符串变量](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%8F%98%E9%87%8F)
-   [从FString](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#%E4%BB%8Efstring)
-   [到 FString](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#%E5%88%B0fstring)
-   [数字和其他变量](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#%E6%95%B0%E5%AD%97%E5%92%8C%E5%85%B6%E4%BB%96%E5%8F%98%E9%87%8F)
-   [到FString](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#%E5%88%B0fstring-2)
-   [从FString](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#%E4%BB%8Efstring-2)
-   [对比](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#%E5%AF%B9%E6%AF%94)
-   [搜索](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#%E6%90%9C%E7%B4%A2)
-   [构建 FString](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#%E6%9E%84%E5%BB%BAfstring)
-   [串联](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#%E4%B8%B2%E8%81%94)
-   [Printf](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#printf)
-   [操作字符串](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#%E6%93%8D%E4%BD%9C%E5%AD%97%E7%AC%A6%E4%B8%B2)
-   [HUD 中的 FStrings](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#hud%E4%B8%AD%E7%9A%84fstrings)
-   [Canvas](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#canvas)
-   [调试信息](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#%E8%B0%83%E8%AF%95%E4%BF%A1%E6%81%AF)
-   [打印到视口](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#%E6%89%93%E5%8D%B0%E5%88%B0%E8%A7%86%E5%8F%A3)
-   [打印到输出日志](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#%E6%89%93%E5%8D%B0%E5%88%B0%E8%BE%93%E5%87%BA%E6%97%A5%E5%BF%97)
-   [转换宏编码](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine#%E8%BD%AC%E6%8D%A2%E5%AE%8F%E7%BC%96%E7%A0%81)
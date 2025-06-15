# 虚幻引擎中的字符串处理 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/string-handling-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:40:14.988Z

---

目录

![字符串处理](https://dev.epicgames.com/community/api/documentation/image/4cf0e5bb-972c-494c-8280-83669ea145ba?resizing_type=fill&width=1920&height=335)

### FName

FName是一种用于高效字符串处理的轻量级类型。具体而言，虚幻引擎会维护一个全局的唯一字符串表，而FName存储着一个实例编号以及指向给定字符串的索引引用，以便快速查找和访问。

此外，FName子系统使用哈希表格提供快速的字符串到FName转换。

FNames在表示对象名称、标识符和其他常被用于比较的字符串时尤其有用。当你在 **内容浏览器** 中命名了一个新资产、在动态材质实例（Dynamic Material Instance）中修改了一个参数、或访问了骨架网格体中的某个骨骼时，会使用 **FNames**。

FNames不区分大小写、不可变，且无法被操作。

-   [FName参考指南](/documentation/zh-cn/unreal-engine/fname-in-unreal-engine)

### FText

在 **虚幻引擎** 中，[文本本地化](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine)的主要组件是 `FText` 类。此类通过提供下列功能支持文本本地化，因此面向用户的所有文本都应使用此类：

-   [创建本地化的文本文字。](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#textliterals)
    
-   [设置文本格式](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#textformatting)（根据占位符模式生成文本）。
    
-   [根据数字生成文本。](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#numericaltextgeneration)
    
-   [根据日期时间生成文本。](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#chronological)
    
-   [生成衍生文本](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#transformative)，如将文本设为大写或小写。
    

`Ftext` 同时具有 `AsCultureInvariant` 函数（或 `INVTEXT` 宏），可创建非本地化的（即"语言不变"）文本。这在进行如将玩家名从外部API转换为可在用户界面显示的文本等操作时，十分有用。

可使用 `FText::GetEmpty()` 或仅使用 `FText()`,创建空白 `FText`。

-   [FText参考指南](/documentation/zh-cn/unreal-engine/ftext-in-unreal-engine)

### FString

与 `FName` 和 `FText` 不同，`FString` 可以与搜索、修改并且与其他字符串比较。不过，这些操作会导致 `FString` 的开销比不可变字符串类更大。这是因为 `FString` 对象保存自己的字符数组，而 `FName` 和 `FText` 对象保存共享字符数组的指针，并且可以完全根据索引值建立相等性。

-   [FString参考指南](/documentation/zh-cn/unreal-engine/fstring-in-unreal-engine)

### Printf

`FString` 函数 `Printf` 可以像C++中的 `printf` 函数那样，使用格式化参数创建 `FString` 对象。类似的，`UE_LOG` 宏会打印一个 `printf` 格式化字符串到屏幕上，或者打印到日志输入和日志文件中，具体取决于当前正在运行的UE4构建类型。

注意，在使用这些字符串和转换前，你需要包含必要的头文件。你可以在各个字符串的API参考文档中，找到需要包含的头文件名单。

## 转换

从

到

范例

FName

FString

`TestHUDString = TestHUDName.ToString();`

FName

FText

`TestHUDText = FText::FromName(TestHUDName);`

FName -> FText 在一些情况下有效，但需注意 — FNames 内容不会从 FText 的"自动本地化"中受益。

FString

FName

`TestHUDName = FName(*TestHUDString);`

FString -> FName 不可靠。因为 FName 不区分大小写，所以转换存在损耗。

FString

FText

`TestHUDText = FText::FromString(TestHUDString);`

FString -> FText 在一些情况下有效，但需注意 — FString 内容不会从 FText 的"自动本地化"中受益。

FText

FString

`TestHUDString = TestHUDText.ToString();`

FText -> FString 不可靠。它在一些语言的转换中存在潜在损耗。

FText

FName

FText 到 FName 的转换不存在。但可先转换到 FString，再转换到 FName。

FText -> FString -> FName 不可靠。因为 FName 不区分大小写，所以转换存在损耗。

FString

int32

`int32 TestInt = FCString::Atoi(*MyFString);`

FString

float

`float TestFloat = FCString::Atof(*MyFString);`

int32

FString

`FString TestString = FString::FromInt(MyInt);`

float

FString

`FString TestString = FString::SanitizeFloat(MyFloat);`

## 编码

总体而言，设置字符串变量文字时应使用 **TEXT()** 宏。如未指定 TEXT() 宏，将使用 ANSI 对文字进行编码，会导致支持字符高度受限。 传入 FString 的 ANSI 文字需要完成到 TCHAR 的转换（本地万国码编码），以便更高效地使用 TEXT()。

如需编码的更多信息，请查阅 [字符编码](/documentation/zh-cn/unreal-engine/character-encoding-in-unreal-engine) 文档。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [strings](https://dev.epicgames.com/community/search?query=strings)
-   [fname](https://dev.epicgames.com/community/search?query=fname)
-   [ftext](https://dev.epicgames.com/community/search?query=ftext)
-   [fstring](https://dev.epicgames.com/community/search?query=fstring)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [FName](/documentation/zh-cn/unreal-engine/string-handling-in-unreal-engine#fname)
-   [FText](/documentation/zh-cn/unreal-engine/string-handling-in-unreal-engine#ftext)
-   [FString](/documentation/zh-cn/unreal-engine/string-handling-in-unreal-engine#fstring)
-   [Printf](/documentation/zh-cn/unreal-engine/string-handling-in-unreal-engine#printf)
-   [转换](/documentation/zh-cn/unreal-engine/string-handling-in-unreal-engine#%E8%BD%AC%E6%8D%A2)
-   [编码](/documentation/zh-cn/unreal-engine/string-handling-in-unreal-engine#%E7%BC%96%E7%A0%81)
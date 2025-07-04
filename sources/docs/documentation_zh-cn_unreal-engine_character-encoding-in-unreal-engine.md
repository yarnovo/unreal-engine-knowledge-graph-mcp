# 虚幻引擎字符编码 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/character-encoding-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:40:12.348Z

---

目录

![字符编码](https://dev.epicgames.com/community/api/documentation/image/a6cbcb34-7930-4a2e-9eff-cf92540fc9ba?resizing_type=fill&width=1920&height=335)

本文概括介绍了 **虚幻引擎** 使用的字符编码。

知识点预览：[每一个软件开发者都必须了解的关于Unicode和字符集的基本知识（没有任何借口！）](http://www.joelonsoftware.com/articles/Unicode.html)

## 文本格式

有几种格式可以用来表示文本和字符串。了解这些格式及其各自的优劣有助于决定在项目中使用哪种格式。

以下并非格式的技术定义，而是适用于本页的相对简单的说法。

$ **ASCII**：介于32-126（含端点）之间的字符以及 0、9、10和13。（P4类型文本）（检入时通过P4触发器验证） $ **ANSI**：ASCII和当前代码页（如，Western European high ASCII）需要以二进制形式存储在P4服务器上。 $ **UTF-8**：由单字节组成的字符串，可以使用特殊字符序列来获取非ANSI字符。（ASCII超集）（P4类型Unicode） $ **UTF-16**： 由每个字符最多2个字节的字符和[BOM](http://en.wikipedia.org/wiki/Byte-order_mark)构成的字符串。（但astral字符可以达到4个字节）（P4类型UTF-16）（检入时通过P4触发器验证）

### 二进制

**优点**

**缺点**

不定义内部格式；无论什么格式都可以加载所有文件。

不能合并。要求所有此类文件都进行排他检出。

 

不定义内部格式，每个文件都可以采用不同格式。

 

P4存储每个版本的完整内容，可能会不必要地使库大小膨胀。

### 文本

**优点**

**缺点**

可合并。不需要排他检出。

限制性极强；仅允许ASCII字符。

### UTF-8

**优点**

**缺点**

仅访问我们将需要的所有字符。

亚洲语言有不同的内存描述文件。

使用较少内存。

我们的Perforce服务器上未启用P4类型Unicode。

属于ASCII超集；纯ASCII字符串是完全有效的UTF-8字符串。

字符串运算更加复杂；必须解析字符串才能完成像长度计算一样简单的运算。

游戏检测到字符串是ASCII时仍能工作，并原样输出。

在亚洲区域，除了ASCII，MSDev对其他字符集的处理不太理想。因此我们才在检入期间将文本验证为ASCII。

如果我们有启用了Unicode的服务器，则文件将是可以合并的，并且不需要排他检出。

 

可以通过解析检测字符串是否是UTF-8（有或没有BOM）。

 

### UTF-16

**优点**

**缺点**

仅访问我们将需要的所有字符。

使用较多内存。

简单。内存占用是字符数的两倍（对于我们是用的字符，全部位于[基本多文种平面](http://en.wikipedia.org/wiki/Mapping_of_Unicode_character_planes)中）。

如果不包含BOM，则难以检测到这种格式。

简单。字符串运算可以拆分/合并，而不必解析字符串。

游戏检测到字符串是ASCII时无效，并原样输出（现在在检入时通过UTF-16验证器检测）。

与游戏中使用的格式相同，不翻译，不解析，也不需要内存运算。

在亚洲区域，除了ASCII，MSDev对其他字符集的处理不太理想。因此我们才在检入期间将文本验证为ASCII。

可合并。不需要排他检出。

 

C#在内部使用UTF-16。

 

## UE内部字符串表示

虚幻引擎（UE）中的所有字符串都作为FStrings或TCHAR数组以[UTF-16](http://en.wikipedia.org/wiki/UTF-16/UCS-2)格式存储在内存中。大多数代码假设2个字节等于一个代码点，因此只支持基本多文种平面（BMP），这样虚幻内部编码可以更准确地描述为UCS-2。字符串以适合于当前平台的字节次序存储。

当向/从磁盘序列化到程序包，或在联网期间序列化时，TCHAR字符小于0xff的字符串均存储为一串8位字节，否则存储为双字节UTF-16字符串。序列化代码可以根据需要处理任何字节次序转换。

## UE加载的文本文件

当虚幻引擎加载外部文本文件（例如，运行时读取 `.INT` 文件）时，几乎总是使用UnMisc.cpp中的 `appLoadFileToString()` 函数来完成这个过程。主要操作由 `appBufferToString()` 函数完成。

该函数识别UTF-16文件中的Unicode字节顺序标记（BOM），如果存在，则按任一字节次序作为UTF-16加载文件。

BOM不存在时作何处理则取决于平台。

在Windows上，使用默认的Windows MBCS编码（如[Windows-1252](http://en.wikipedia.org/wiki/Windows-1252)表示美国英语和西欧，CP949表示韩语，CP932表示日语）尝试将文本转换为，并使用MultiByteToWideChar(CP\_ACP, MB\_ERR\_INVALID\_CHARS...)。这种处理方式是在2009年7月QA构建时添加的。

如果在非Windows平台上这种转换失败，则读取每个字节并填补到16位，形成 `TCHAR` 数组。

请注意，对于使用 `appLoadFileToString()` 加载的UTF-8编码文本文件，没有可以用于检测或解码的代码。

## 虚幻引擎使用的文本文件

引擎生成的大部分文本文件将使用 `appSaveStringToFile()` 保存。

所有TCHAR字符都可以用单字节表示的字符串将存储为一串8位字节，否则存储为UTF-16，除非传递了值为true的bAlwaysSaveAsAnsi，在这种情况下，字符串将先转换为默认的Windows编码。该操作当前仅对着色器文件执行，以解决着色器编译器在处理UTF-16文件时存在的问题。

## 建议用于虚幻引擎使用的文本文件的编码

### INT和INI文件

按任一字节次序的UTF-16。针对亚洲语言的默认MBCS编码（如CP932）在Windows上有效，但这些文件需要在PS3和Xbox360上加载，因此转换代码仅在Windows上运行。

### 源代码

一般而言，我们不建议在C++源代码中使用字符串文字，这类数据可以存储在INT文件中。

#### C++源代码

UTF-8或默认Windows编码。MSVC、Xbox360编译器和gcc应该可以顺利处理UTF-8编码的源文件。在Latin-1编码的文件中，如果有高位字符，例如版权、商标或度数符号，则应当尽可能避免在源代码中使用这类文件，因为这种编码在多语言环境系统上会被破坏。第三方软件中有一些这种情况是无法避免的（如版权声明），因此对于MSVC，我们禁止了警告4819，否则在亚洲版本Windows上编译时会发生问题。

## 用Perforce存储UTF-16文本文件

-   不要使用"文本"
    
    -   如果UTF-x文件被检入并存储为文本，将在同步后损坏。
-   如果使用"二进制"，则将文件标记为排他检出
    
    -   可以检入ASCII、UTF-8、UTF-16，这在引擎中可以正常工作。
    -   但是，二进制文件不能合并，因此如果文件不标记为排他检出，更改会重复出现。
-   如果使用"UTF-16"，则确保没有人检入非UTF-16文件
-   "Unicode"类型是UTF-8，在这里对我们没有用处。

## 转换例程

我们有一些宏可以将字符串转换为各种编码或从各种编码转换字符串。这些宏使用局部范围内声明的类实例，在堆栈上分配空间，因此保留指向这些宏的指针非常重要！它们仅用于将字符串传递给函数调用。

-   TCHAR\_TO\_ANSI(str)
-   TCHAR\_TO\_OEM(str)
-   ANSI\_TO\_TCHAR(str)
-   TCHAR\_TO\_UTF8(str)
-   UTF8\_TO\_TCHAR(str)

以下是UnStringConv.h中的助手类：

-   `typedef TStringConversion<TCHAR,ANSICHAR,FANSIToTCHAR_Convert> FANSIToTCHAR;`
-   `typedef TStringConversion<ANSICHAR,TCHAR,FTCHARToANSI_Convert> FTCHARToANSI;`
-   `typedef TStringConversion<ANSICHAR,TCHAR,FTCHARToOEM_Convert> FTCHARToOEM;`
-   `typedef TStringConversion<ANSICHAR,TCHAR,FTCHARToUTF8_Convert> FTCHARToUTF8;`
-   `typedef TStringConversion<TCHAR,ANSICHAR,FUTF8ToTCHAR_Convert> FUTF8ToTCHAR;`

使用TCHAR\_TO\_ANSI时还必须注意的是，不要假设字节数将等于TCHAR字符串长度。多字节字符集可能要求每个TCHAR字符占多个字节。如果您需要知道所产生字符串的字节长度，可以使用助手类，而不是宏。例如：

```cpp
	FString String;
	...
	FTCHARToANSI Convert(*String);
	Ar->Serialize((ANSICHAR*)Convert.Get(), Convert.Length());  // FTCHARToANSI::Length() 返回已编码字符串的字节数，排除空终止符。

```

这些宏声明的对象拥有很短的生命周期。它们的主要用途是作为函数的参数，并且很适合用于这类情形。请不要把变量赋值给转换后的字符串内容，因为对象回超出范围，字符串会被释放。假如你的代码继续访问指向已释放内存的指针，那么就会导致报错。

## Unicode中的ToUpper()和ToLower()

UE4目前只能处理ANSI（ASCII | 代码页1252 | | 西欧）。

此文章似乎提到了适用于所有语言的最差做法[](http://en.wikipedia.org/wiki/ISO/IEC_8859)

-   ISO/IEC 8859-1适用于英语、法语、德语、意大利语、葡萄牙语和两种西班牙语
-   ISO/IEC 8859-2适用于波兰语、捷克语和匈牙利语
-   ISO/IEC 8859-5适用于俄语

[unicode.org](https://unicode.org/Public/MAPPINGS/ISO8859/)中的映射包含上述语言的转换规则。"大写字母"和"小写字母"信息应该在相应unicode字符中进行交叉引用以获得所需结果。

## 特定于东亚编码的C++源代码说明

UTF-8和默认的Windows编码都可能会使C++编译器出现问题，如下所示：

**默认Windows编码**

在运行单字节字符代码页（如CP437美国英语）的Windows上，如果C++源代码包含东亚双字节字符编码，如 CP932（日语）、CP936（简体中文）或CP950（繁体中文），则编译源代码时务必小心。

这些东亚字符编码系统使用0x81-0xFE表示第一个字节，使用0x40-0xFE表示第二个字节。第二个字节中的0x5C值将解译为ASCII/latin-1中的反斜杠，这在C++中有特殊的含义。（将字符串文字中的序列进行转义，如果在行末使用则保持不断行）。 在单字节代码页Windows上编译这种源代码时，编译器不会考虑东亚双字节字符编码，这可能导致编译错误，甚至在EXE中产生错误。

单行注释： 如果东亚注释末尾有0x5c，则会导致难以找到因为缺失行而引起的错误。

```cpp
		// EastAsianCharacterCommentThatContains0x5cInTheEndOfComment0x5c'\'
		important_function(); /*这一行会作为注释的一部分与上一行连接起来*/
```

在字符串文字内部： 这可能会导致字符串损坏或被识别的0x5c转义序列错误。

```cpp
		printf("EastAsianCharacterThatContains0x5c'\'AndIfContains0x5cInTheEndOfString0x5c'\'");
		function();
		printf("Compiler recognizes left double quotation mark in this line as the end of string literal that continued from first line, and expected this message is C++ code.");
```

如果0x5c后面的字符不指定转义序列，编译器会将转义序列字符集转换为一个指定的字符。 （如果不指定，则结果是定义的实现，但MSVC会移除0x5c，并发出警告"未识别的字符转移序列"。） 在上述情况中，字符串结尾有一个0x5c反斜杠，下一个字符是双引号，因此转义序列"转换为字符串数据中的双引号，编译器继续产生字符串数据，直到遇到下一个双引号或文件结束，并引起错误。

危险字符示例： CP932（日语Shift-JIS）"?"是0x955C，因此许多CP932字符都有0x5C。 CP936（简体中文GBK）"?"是0x815C，因此许多CP936字符都有0x5C。 CP950（繁体中文Big5）"?"是0xA55C，因此许多CP950字符都有0x5C。 CP949（韩语EUC-KR）没问题，因为EUC-KR不使用0x5C表示第二个字节。

**没有BOM的UTF-8**（某些文本编辑器将BOM描述为签名）

在东亚代码页CP949（韩语）、CP932（日语）、CP936（简体中文）或CP950（繁体中文）Windows上，如果C++源代码将东亚字符存储为UTF-8，则编译该代码时务必小心。

UTF-8字符编码使用三个字节来表示东亚字符：0xE0-0xEF表示第一个字节，0x80-0xBF表示第二个字节，0x80-0xBF表示第三个字节。如果没有BOM，东亚Windows默认编码会将三个UTF-8编码字节和后面的一个字节识别为两个双字节东亚编码字符，第一个和第二个字节作为一对，表示第一个东亚字符，第三个和随后字节作为一对，形成第二个东亚字符。 如果三个UTF-8编码字节后面的字符在字符串文字或注释中有特殊含义，则可能会发生问题。

示例：在内嵌注释中： 如果注释文本包含奇数个东亚字符，而下一个字符标记注释结束，则可能会导致与缺失代码有关的难以找到的错误。

```cpp
		/*OddNumberOfEastAsianCharacterComment*/
		important_function();
		/*normal comment*/
```

东亚代码页Windows上的编译器将UTF-8编码的东亚字符注释的最后一个字节和星号\*识别为一个东亚字符，下一个字符仍被视为注释的一部分。在上述示例中，编译器移除了important\_function()，因为它似乎是注释的一部分。 这种行为是非常危险的，难以找到缺失的代码。

在单行注释中： 在东亚注释末尾使用反斜杠""会导致一些没有缺失行但却难以找到的错误。

```cpp
		// OddNumberOfEastAsianCharacterComment\
		description(); /* coder intended this line as comment, by using backslash at the end of above line */
```

这是非常少见的情况，因为程序员不会故意在注释末尾使用反斜杠""。

在字符串文字内部： 如果字符串文字内包含奇数个UTF-8编码的东亚字符，并且以下字符有特殊含义，会导致字符串遭到破坏、错误或警告。

```cpp
		printf("OddNumberOfEastAsiaCharacterString");
		printf("OddNumberOfEastAsiaCharacterString%d",0);
		printf("OddNumberOfEastAsiaCharacterString\n");
```

东亚代码页Windows上的C++编译器将UTF-8编码的东亚字符串的最后一个字节和下一个字符识别为一个东亚字符。如果运气好，会看到编译器警告"C4819"（如果未禁用）或错误，提醒您发生了问题。如果运气不好，字符串会遭到破坏。

**总结**

您可以对C++源代码使用UTF-8或默认Windows编码，但请注意上述问题。再次强调，我们不建议在C++源代码内部使用字符串文字。如果在C++源代码中使用东亚字符编码，请确保使用东亚作为默认代码页。 另一种好方法是使用带有BOM的UTF-8（某些文本编辑器将BOM描述为Unicode签名）。

我们在2010年2月18日用UTF-8和UTF-16测试了一些编译器。

面向PC和Xbox 360的MSVC和面向PS3的gcc或slc能够编译UTF-8编码的源代码（无论是否有BOM）。 但UTF-16（小端字节/大端字节）仅受MSVC支持。

Perforce能够处理UTF-16和UTF-8，但p4 diff将UTF-8文件中的BOM显示为可见字符。

外部参考：[Windows支持的代码页](https://docs.microsoft.com/en-us/windows/win32/intl/code-pages)

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [strings](https://dev.epicgames.com/community/search?query=strings)
-   [fname](https://dev.epicgames.com/community/search?query=fname)
-   [ftext](https://dev.epicgames.com/community/search?query=ftext)
-   [fstring](https://dev.epicgames.com/community/search?query=fstring)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [文本格式](/documentation/zh-cn/unreal-engine/character-encoding-in-unreal-engine#%E6%96%87%E6%9C%AC%E6%A0%BC%E5%BC%8F)
-   [二进制](/documentation/zh-cn/unreal-engine/character-encoding-in-unreal-engine#%E4%BA%8C%E8%BF%9B%E5%88%B6)
-   [文本](/documentation/zh-cn/unreal-engine/character-encoding-in-unreal-engine#%E6%96%87%E6%9C%AC)
-   [UTF-8](/documentation/zh-cn/unreal-engine/character-encoding-in-unreal-engine#utf-8)
-   [UTF-16](/documentation/zh-cn/unreal-engine/character-encoding-in-unreal-engine#utf-16)
-   [UE内部字符串表示](/documentation/zh-cn/unreal-engine/character-encoding-in-unreal-engine#ue%E5%86%85%E9%83%A8%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A1%A8%E7%A4%BA)
-   [UE加载的文本文件](/documentation/zh-cn/unreal-engine/character-encoding-in-unreal-engine#ue%E5%8A%A0%E8%BD%BD%E7%9A%84%E6%96%87%E6%9C%AC%E6%96%87%E4%BB%B6)
-   [虚幻引擎使用的文本文件](/documentation/zh-cn/unreal-engine/character-encoding-in-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%BD%BF%E7%94%A8%E7%9A%84%E6%96%87%E6%9C%AC%E6%96%87%E4%BB%B6)
-   [建议用于虚幻引擎使用的文本文件的编码](/documentation/zh-cn/unreal-engine/character-encoding-in-unreal-engine#%E5%BB%BA%E8%AE%AE%E7%94%A8%E4%BA%8E%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%BD%BF%E7%94%A8%E7%9A%84%E6%96%87%E6%9C%AC%E6%96%87%E4%BB%B6%E7%9A%84%E7%BC%96%E7%A0%81)
-   [INT和INI文件](/documentation/zh-cn/unreal-engine/character-encoding-in-unreal-engine#int%E5%92%8Cini%E6%96%87%E4%BB%B6)
-   [源代码](/documentation/zh-cn/unreal-engine/character-encoding-in-unreal-engine#%E6%BA%90%E4%BB%A3%E7%A0%81)
-   [C++源代码](/documentation/zh-cn/unreal-engine/character-encoding-in-unreal-engine#c++%E6%BA%90%E4%BB%A3%E7%A0%81)
-   [用Perforce存储UTF-16文本文件](/documentation/zh-cn/unreal-engine/character-encoding-in-unreal-engine#%E7%94%A8perforce%E5%AD%98%E5%82%A8utf-16%E6%96%87%E6%9C%AC%E6%96%87%E4%BB%B6)
-   [转换例程](/documentation/zh-cn/unreal-engine/character-encoding-in-unreal-engine#%E8%BD%AC%E6%8D%A2%E4%BE%8B%E7%A8%8B)
-   [Unicode中的ToUpper()和ToLower()](/documentation/zh-cn/unreal-engine/character-encoding-in-unreal-engine#unicode%E4%B8%AD%E7%9A%84toupper\(\)%E5%92%8Ctolower\(\))
-   [特定于东亚编码的C++源代码说明](/documentation/zh-cn/unreal-engine/character-encoding-in-unreal-engine#%E7%89%B9%E5%AE%9A%E4%BA%8E%E4%B8%9C%E4%BA%9A%E7%BC%96%E7%A0%81%E7%9A%84c++%E6%BA%90%E4%BB%A3%E7%A0%81%E8%AF%B4%E6%98%8E)
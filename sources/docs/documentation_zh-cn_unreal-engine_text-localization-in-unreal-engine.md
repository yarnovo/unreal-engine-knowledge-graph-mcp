# 虚幻引擎中的文本本地化 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:11:07.444Z

---

目录

![文本本地化](https://dev.epicgames.com/community/api/documentation/image/46ef67f1-b833-45db-9886-e0c9b55ea958?resizing_type=fill&width=1920&height=335)

**虚幻引擎** 中的文本是本地化的主要组件。它是一个专用的字符串，用C++中的\[`FText`\]类型表示。当您需要本地化面向用户的文本时，应该使用这种方法。

在内部，`FText` 被作为[`TSharedRef`](https://api.unrealengine.com/INT/API/Runtime/Core/Templates/TSharedRef/index.html)实现到[`ITextData`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/ITextData/index.html)。这使得复制成本非常低廉，而且[`FTextSnapshot`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FTextSnapshot/index.html)工具提供了一种有效的方法来检测缓存的FText值是否确实发生了更改。

在 `FText` 实例中保存的数据因 `FText` 的创建方式而异。这种差异由内部"文本历史记录"（`FTextHistory`）处理。文本历史记录支持文本的正确文化重建，并构成以下几个方面的关键组成部分：

-   实时文化切换。
    
-   通过网络发送`FText`。
    
-   创建文化不变源。
    

将`FText`转换为[`FString`](https://api.unrealengine.com/INT/API/Runtime/Core/Containers/FString/index.html)通常是一种有损操作，因为它会丢失文本历史记录。只有当您不再需要本地化数据时才应该这样做。例如，如果有一个处理字符串的低级别API，则由一个监视文本更改（如\[`STextBlock`\](https://api.unrealengine.com/INT/API/Runtime/Slate/Widgets/Text/STextBlock/index.html）的高级别API管理。当将数据传递到只接受字符串的外部API时，也可以使用这种转换。

如果需要不可本地化的文本（例如将播放器名称从外部API转换为可以在UI中显示的内容），可以使用[`FText::AsCultureInvariant`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/AsCultureInvariant/2/index.html)，它生成一个没有本地化数据（且不能本地化）的`FText`实例。`INVTEXT`宏可以对文字字符串执行同样的操作。

## 文本文字值

可本地化文本由三个组件组成：一个 **命名空间**；一个 **密钥**（形成其标识）；和一个 **源字符串**（这是被翻译内容的基础，并对`陈旧的`翻译进行验证）。在UE4中创建可本地化文本的最常见方法是使用文本文字值。

### 使用C++创建文本文字值

可以使用宏的LOCTEXT系列使用C++创建文本文字值。

**文本文字值宏**

宏

说明

**NSLOCTEXT**

通过定义命名空间、密钥和源字符串创建本地化的文本片段。

**LOCTEXT**

通过定义密钥和源字符串创建本地化的文本片段，并使用`LOCTEXT_NAMESPACE`定义命名空间。

**示例：**

```cpp
	// 定义要与LOCTEXT一起使用的命名空间
	// 这只在单个文件中有效，并且必须在文件结束前取消定义
	#define LOCTEXT_NAMESPACE "MyNamespace"
	// 创建文本文字值
	constFTextHelloWorld= NSLOCTEXT("MyOtherNamespace","HelloWorld","Hello World!")
	constFTextGoodbyeWorld= LOCTEXT("GoodbyeWorld","Goodbye World!")
	// 在文件结束前取消定义命名空间
	#undef LOCTEXT_NAMESPACE
```

### 在INI文件中创建文本文字值

文本文字值可以在INI文件中使用[`NSLOCTEXT`](https://api.unrealengine.com/INT/API/Runtime/Engine/NSLOCTEXT/129/index.html) 宏语法创建。

### 在资源中创建文本文字值

文本文字值可以使用`FText`属性创建。将自动为您生成密钥，但是您可以使用文本字段旁边的高级组合为文本定义自定义命名空间或密钥。也可以使用默认命名空间或密钥。

## 文本格式化

文本格式化提供了一种将文本组合起来，以更便于进行本地化的方法，它使用可本地化的格式模式来组合文本，该模式注入实际文本来替换格式占位符。

格式占位符包含在一对花括号中，可以是数字（用于基于索引的格式化）或字符串（用于基于名称的格式化）。例如：

\` 您还剩 {0} 点生命值。 \` \` 您还剩 {CurrentHealth} 点生命值。 \`

格式占位符还可以指定一个函数（称为`参数修饰符`）在其参数数据上运行。它们被指定为一个管道，后面跟着函数名和参数。例如：

`"{NumCats} {NumCats}|plural(one=cat,other=cats)"`

**反引号(\`)** 字符可用于换码大括号和直线符，从而避免将它们视为格式化标记。也可用于对自身进行换码，生成文字 \`字符。

**范例**： 以下表格假设 `Res` 是一个整数，其值为 10。

输入

格式化文本结果

```cpp
	Result `{ {Res} }
```

```cpp
	Result { 10 }
```

```cpp
	Result \`\`{Res}\`\`  
```

```cpp
	Result \`10\`
```

### 使用C++进行文本格式化

使用C++进行文本格式化由[`FText::Format`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/Format/1/index.html)系列函数处理。每个函数都接受一个[`FTextFormat`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FTextFormat/index.html)模式，该模式将隐式地从一个`FText`实例构造，后面跟着其他参数，详见下表定义。

参数

格式化类型

说明

**FText::Format**

一般文本格式化。

要么接受基于索引的参数（使用[`FFormatOrderedArguments`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FFormatOrderedArguments/index.html)或可变参数），要么接受基于名称的参数（使用[`FFormatNamedArguments`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FFormatNamedArguments/index.html)）。

[**FText::FormatOrdered**](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/FormatOrdered/index.html)

基于可变索引的格式化。

接受可用于构造[`FFormatArgumentValue`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FFormatArgumentValue/index.html)的任何参数。

**[FText::FormatNamed](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/FormatNamed/index.html)**

基于可变名称的格式化。

接受连续名称（任何可用于构造`FString`的名称），然后对参数赋值（任何可用于构造`FFormatArgumentValue`的值）。

您应该考虑将经常使用的格式模式预编译为`FTextFormat`，以提高格式化性能。如果活动文化发生更改，则编译后的模式将自动重新编译。

### 蓝图中的文本格式化

蓝图中的文本格式化由 **Format Text** 节点处理。此节点可以接受文本格式模式，也可以将该模式链接到另一个文本引脚。

-   当指定文字格式模式时，将自动生成格式参数引脚。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4a274e7-535d-4744-9091-c15a64ef551f/textformat-blueprints-01.png)
    
-   当格式模式链接到另一个文本引脚时，必须使用节点的详情（Details）面板手动指定格式的参数。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9957f85e-6d41-4a42-99cd-c96f20c52f76/textformat-blueprints-02.png)
    

### 参数修饰符

参数修饰符提供了一种在参数被添加到格式化字符串之前对其进行预处理的方法。参数修饰符是可扩展的。您可以通过实现[`ITextFormatArgumentModifier`](http://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/ITextFormatArgumentModifier/index.html)接口来创建参数修饰符，并为给定的关键字注册一个工厂函数（请参阅[`FTextFormatter::RegisterTextArgumentModifier`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FTextFormatter/RegisterTextArgumentModifier/index.html)）。

UE在默认情况下提供了一些参数修饰符：有多个修饰符，用于复数、性别和韩语后置词。

#### 复数形式

复数形式允许您基于文本格式的给定数值变量使用不同的文本。复数形式可以是基数形式（例如`有1只猫`或`有4只猫`），也可以是序数形式（例如`你第一个完成了！`或`你第二个完成了！`）。复数形式被指定为键值对，并支持以下任何关键字（由CLDR数据为您的文化定义）：0、1、2、一些、很多和其他。值是可选的引用字符串，也可以包含格式标记。

**基数格式示例：**

```cpp
	"There {NumCats}|plural(one=is,other=are) {NumCats} {NumCats}|plural(one=cat,other=cats)"

```

**序数格式示例：**

```cpp
	"You came {Place}{Place}|ordinal(one=st,two=nd,few=rd,other=th)!"

```

#### 性别形式

性别形式允许您根据文本格式的给定[`ETextGender`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/ETextGender/index.html)值使用不同的文本，比如`Le guerrier est fort`或`La guerrière est forte`。性别形式被指定为一个值列表，其顺序为\[阳性、阴性、中性\]，中性是可选的。值是可选的引用字符串，也可能包含格式标记。

**格式示例：**

```cpp
	"{Gender}|gender(Le,La) {Gender}|gender(guerrier,guerrière) est {Gender}|gender(fort,forte)"

```

#### 韩语后置词

韩语后置词帮助您遵循韩语的语法规则，并根据插入的值以辅音还是元音结尾来插入正确的字形，如`사람은`或`사자는`。韩语后置词被指定为一个值列表，其顺序为\[辅音、元音\]。值是可选的引用字符串。

**格式示例：**

```cpp
	"{Arg}|hpp(은,는)"

```

### 文本格式化最佳实践

-   当注入一个影响句子的数字时，使用复数形式的参数修饰符处理这些差异，而不是用代码分支。当您使用复数形式时，该句子将被正确地翻译为不使用源语言复数规则的语言。
    
-   当插入一个人称代词时，要确保您包括了这个人的性别参数。这对于具有性别语法规则的语言非常重要，因为它能让翻译人员根据性别转换译文（请参阅[性别形式](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E6%80%A7%E5%88%AB%E5%BD%A2%E5%BC%8F)）。
    
-   避免为对象注入名词（如`桌子`、`门`或`椅子`），或做好可本地化的准备。这些名词在一种语言中可能有某种性别，在另一种语言中可能有另一种性别。这使得格式模式字符串不可能在没有依据文化的元数据的情况下精确本地化。理想情况下，您应该包括完整的句子而不仅仅是名词。这可以确保译文准确。
    
    UE未来版本可能包含一个函数，可以让翻译人员使用元数据来标记表示名词的文本，这样稍后他们可以以格式模式进行分支，以生成准确的翻译。
    
-   避免串联部分句子。这可能会导致问题，因为每个子句或部分都有可能翻译正确，但整体的翻译可能不正确。最好把文本改写成完整的句子，这样才能保证翻译正确。
    

## 文本生成

文本生成使用国际化数据来生成不依赖于直接本地化的正确文化文本。文本生成有三种类型：数值型、时间型和变换型。

### 数值型文本生成

数值型生成用于将数值类型转换为便于人类阅读的文本表示形式。这方面的确切规则是特定于文化的，如果需要更具体的控制，还可以在每一代的基础上进行调整。

例如，依照默认生成规则，浮点数`1234.5`将生成为英语格式的`1,234.5`，法语格式的`1 234,5`，和阿拉伯语格式的`١٬٢٣٤٫٥`。

#### 使用C++进行数值型生成

使用C++进行数值型生成由以下函数处理。

函数

说明

**[FText::AsNumber](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/AsNumber/1/index.html)**

将UE支持的任何数值类型转换为用户友好的文本表示形式（`1234.5`变为`1,234.5`)。

**[FText::AsPercent](http://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/AsPercent/1/index.html)**

将浮点数或双精度浮点数转换为百分比文本表示形式（`0.2`变为20%）。

**[FText::AsMemory](http://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/AsMemory/index.html)**

将值（以字节为单位）转换为用户友好的内存表示形式（`1234`变成`1.2 KiB`）。

**[FText::AsCurrencyBase](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/AsCurrencyBase/index.html)**

将采用基本表示形式的货币值转换为用户友好的货币表示形式（`USD``123450`转换为`$1,234.50`）。

表中的大多数函数都使用一个可选的`[FNumberFormattingOptions](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FNumberFormattingOptions/index.html)`来控制输出（默认值来自活动区域设置），以及一个可选的文化（默认值是活动区域设置）。

#### 蓝图中的数值型生成

蓝图中的数值型生成由以下节点处理。

节点

说明

**ToText (byte), ToText (integer), ToText (float)**

将支持的数值类型转换为用户友好的文本表示形式（`1234.5`变成`1,234.5`）。

**AsPercent**

将浮点数或双精度浮点数转换为百分比文本表示形式（`0.2`变为20%）。

**AsCurrency**

将采用基本表示形式的货币值转换为用户友好的货币表示形式（`USD``123450`转换为`$1,234.50`）。

表中的大多数节点都使用高级参数来控制输出。

### 时间型

时间型生成用于将日期和时间类型转换为便于人类阅读的文本表示形式。这方面的确切规则是特定于文化的，如果需要更具体的控制，还可以在每一代的基础上对日期/时间样式进行调整。

按照默认生成规则，表示1998年5月22日的日期将生成英语（美国）格式的`May 22, 1998`，英语（英国）格式的`22 May 1998`，法语格式的`22 mai 1998`和阿拉伯语格式的`٢٢‏/٠٥‏/١٩٩٨`。

#### 使用C++进行时间型生成

使用C++进行时间型生成由以下函数处理。

函数

说明

**[FText::AsDate](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/AsDate/index.html)**

将FDateTime值转换为用户友好的日期表示形式。

**[FText::AsTime](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/AsTime/index.html)**

将FDateTime值转换为用户友好的时间表示形式。

**[FText::AsDateTime](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/AsDateTime/index.html)**

将FDateTime值转换为用户友好的日期和时间表示形式。

**[FText::AsTimespan](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/AsTimespan/index.html)**

将FTimespan值转换为用户友好的时间增量表示形式（采用小时、分钟和秒）。

上面的大多数方法都使用EDateTimeStyle来控制输出（默认值取自活动区域设置，但可以设置为`短（short）`、`中（medium）`、`长（long）`或`全部（full）`）。

时间型生成在默认情况下预期会得到一个基于UTC的时间（它将转换为本地时区）。如果给定时间不是基于UTC（例如如果已使用本地时间），则您应将`[FText::GetInvariantTimeZone()](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/GetInvariantTimeZone/index.html)`作为时区参数传递。

#### 蓝图中的时间型生成

蓝图中的时间型生成由以下节点处理。

节点

说明

**AsDate**

将基于非UTC的`DateTime`值转换为用户友好的原始日期表示形式（无需调整到本地时区）。

**AsDate (from UTC)**

将基于UTC的`DateTime`值转换为用户友好的日期表示形式（调整到本地时区）。

**AsTime**

将基于非UTC的`DateTime`值转换为用户友好的原始时间表示形式（无需调整到本地时区）。

**AsTime (from UTC)**

将基于UTC的`DateTime`值转换为用户友好的时间表示形式（调整到本地时区）。

**AsDateTime**

将基于非UTC的`DateTime`值转换为用户友好的原始日期和时间表示形式（无需调整到本地时区）。

**AsDateTime (from UTC)**

将基于UTC的`DateTime`值转换为用户友好的日期和时间表示形式（调整到本地时区）。

**AsTimespan**

将`Timespan`值转换为用户友好的时间增量表示形式（采用小时、分钟和秒）。

### 变换型

变换型生成用于将文本转换为自身的不同表示形式。例如，您可以将小写文本转换为大写文本，或者将大写文本转换为小写文本。

#### 使用C++进行变换型生成

使用C++进行变换型生成由以下函数处理。

函数

说明

**[FText::ToLower](http://api.unrealengine.com/INT/API/Runtime/Core/Containers/FString/ToLower/)**

以符合unicode标准的方式将FText实例转换为其小写形式。

**[FText::ToUpper](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/ToUpper/index.html)**

以符合unicode标准的方式将FText实例转换为其大写形式。

#### 蓝图中的变换型生成

蓝图中的变换型生成由以下节点处理。

节点

说明

**Text to Lower**

以符合unicode标准的方式将`文本（Text）`实例转换为其小写形式。

**Text to Upper**

以符合unicode标准的方式将`文本（Text）`实例转换为其大写形式。

## 字符串表

字符串表提供了一种方法，可以将已本地化的文本集中到一个（或多个）已知位置，然后以一种稳健的方式从其他资源或代码引用字符串表中的条目，从而方便地重用已本地化的文本。

字符串表可以在C++中定义，可以使用CSV文件加载，也可以作为资源创建。详情请参阅[字符串表](/documentation/zh-cn/unreal-engine/using-string-tables-for-text-in-unreal-engine)页面。

## 文本值编组

文本值可以无损地编组为字符串（使用 [`FTextStringHelper`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FTextStringHelper/index.html)或是[`ImportText`](https://api.unrealengine.com/INT/API/Runtime/CoreUObject/UObject/UScriptStruct/ImportText/index.html)和[`UTextProperty`](https://api.unrealengine.com/INT/API/Runtime/CoreUObject/UObject/UTextProperty/index.html)的`ExportText`函数）。

支持以下格式：

文本文字值

说明

[`NSLOCTEXT`](https://api.unrealengine.com/INT/API/Runtime/Engine/NSLOCTEXT/129/index.html)\*\*

指定命名空间、密钥和源字符串的文本文字值。

`LOCTEXT`

指定密钥和源字符串的文本文字值。

`LOCTABLE`

字符串表引用。

`INVTEXT`

文化不变文本片段（请参阅[`FText::AsCultureInvariant`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/AsCultureInvariant/2/index.html)）。

`LOCGEN_NUMBER`

从数字生成的文字片段（请参阅[`FText::AsNumber`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/AsNumber/1/index.html)）。

`LOCGEN_NUMBER_GROUPED`

在启用分组的情况下从数字生成的文本片段（请参阅`FText::AsNumber`和[`FNumberFormattingOptions::DefaultWithGrouping`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FNumberFormattingOptions/DefaultWithGroup-/index.html)）。

`LOCGEN_NUMBER_UNGROUPED`

在禁用分组的情况下从数字生成的文本片段（请参阅`FText::AsNumber`和[`FNumberFormattingOptions::DefaultNoGrouping`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FNumberFormattingOptions/DefaultNoGrouping/index.html)）。

`LOCGEN_NUMBER_CUSTOM`

使用自定义格式化选项从数字生成的文本片段（请参阅`FText::AsNumber`和[`FNumberFormattingOptions`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FNumberFormattingOptions/index.html)）。

`LOCGEN_PERCENT`

以百分比的形式从数字生成的文本片段（请参阅[`FText::AsPercent`](http://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/AsPercent/1/index.html)）。

`LOCGEN_PERCENT_GROUPED`

在启用分组的情况下以百分比的形式从数字生成的文本片段（请参阅`FText::AsPercent`和`FNumberFormattingOptions::DefaultWithGrouping`）。

`LOCGEN_PERCENT_UNGROUPED`

在禁用分组的情况下以百分比的形式从数字生成的文本片段（请参阅`FText::AsPercent`和`FNumberFormattingOptions::DefaultNoGrouping`）。

`LOCGEN_PERCENT_CUSTOM`

使用自定义格式化选项以百分比的形式从数字生成的文本片段（请参阅`FText::AsPercent`和`FNumberFormattingOptions`）。

`LOCGEN_CURRENCY`

以货币的形式从数字生成的文本片段（请参阅[`FText::AsCurrencyBase`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/AsCurrencyBase/index.html)）。

`LOCGEN_DATE_UTC`

从UTC日期生成的文本片段，并调整到指定时区或本地时区（请参阅[`FText::AsDate`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/AsDate/index.html)）。

`LOCGEN_DATE_LOCAL`

从非UTC日期生成的文本片段，无需时区调整（请参阅`FText::AsDate`）。

`LOCGEN_TIME_UTC`

从UTC时间生成的文本片段，并调整到指定时区或本地时区（请参阅[`FText::AsTime`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/AsTime/index.html)）。

`LOCGEN_TIME_LOCAL`

从非UTC时间生成的文本片段，无需时区调整（请参阅`FText::AsTime`）。

`LOCGEN_DATETIME_UTC`

从UTC日期和时间生成的文本片段，并调整到指定时区或本地时区（请参阅`FText::AsDateTime`）。

`LOCGEN_DATETIME_LOCAL`

从非UTC日期和时间生成的文本片段，无需时区调整（请参阅`FText::AsDateTime`）。

`LOCGEN_TOLOWER`

以符合unicode标准的方式转换为小写的文本片段（请参阅`FText::ToLower`）。

`LOCGEN_TOUPPER`

以符合unicode标准的方式转换为大写的文本片段（请参阅`FText::ToUpper`）。

`LOCGEN_FORMAT_ORDERED`

使用基于索引的参数从格式化模式生成的文本片段（请参阅[`FText::FormatOrdered`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/FormatOrdered/index.html)）。

`LOCGEN_FORMAT_NAMED`

使用基于名称的参数从格式化模式生成的文本片段（请参阅[`FText::FormatNamed`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/FormatNamed/index.html)）。

`原始`字符串也可以导入，但是每次导入都会生成一个新的密钥。这将为本地化生成不稳定的密钥。

## 数据表

导致本地化密钥不稳定的一个常见原因是以迭代方式将原始字符串从CSV文件导入数据表，因为这将导致在每次导入之后生成一个新密钥。有一个办法可以解决这个问题，那就是覆盖行结构体上的`OnPostDataImport`函数，并调用`FText::ChangeKey`来分配新密钥，从而在导入后为导入的文本分配一个确定性的密钥。

通常，我们使用数据表名作为命名空间，行名和属性名的组合作为密钥。例如：

```cpp
	voidFMyTableRow::OnPostDataImport(constUDataTable*InDataTable,constFNameInRowName,TArray&OutCollectedImportProblems)
	{
	#if WITH_EDITOR
		MyTextProperty = FText::ChangeKey(
		InDataTable->GetName(),
		FString::Printf(TEXT("%s_%s"),*InRowName.ToString(), GET_MEMBER_NAME_STRING_CHECKED(FMyTableRow,MyTextProperty)),
		MyTextProperty
		);
	#endif// WITH_EDITOR
	}

```

自4.22版本起，确定性密钥已经应用于已导入到数据表中的所有原始字符串，但是如果需要自定义密钥创建行为，仍然可以覆盖`OnPostDataImport`。

## Polyglot数据

Polyglot数据允许在运行时添加新的本地化数据，或者与外部系统连接，或者允许在不构建新的`LocRes`文件的情况下热修复本地化。

Polyglot数据包括：命名空间和密钥（其标识）；一个原生字符串；文本的类别（如游戏、引擎、编辑器），以控制何时使用polyglot数据；一个可选的本地语言（如果未设置，则返回该类别的本地语言）；以及一系列的依据文化的翻译。

如果希望使用polyglot数据覆盖现有翻译，则必须确保polyglot数据的命名空间、密钥和原生字符串与要替换的源文本匹配。

### 使用C++的Polyglot数据

使用C++的Polyglot数据由[`FPolyglotTextData`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FPolyglotTextData/index.html)类型表示，可以直接使用（用[`FPolyglotTextData::GetText`](http://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FPolyglotTextData/GetText/index.html)以将polyglot解析为文本实例），或可传递到[`FTextLocalizationManager::RegisterPolyglotTextData`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FTextLocalizationManager/RegisterPolyglot-/index.html)（以修补现有的文本条目）。

### 蓝图中的Polyglot数据

蓝图中的Polyglot数据由 **Polyglot文本** 数据类型表示，可以与 **Polyglot Data to Text** 函数一起使用，将Polyglot数据解析为文本实例。

## 已本地化的文本源

已本地化的文本源是UE4文本本地化管理器发现和处理本地化文本数据的主要方法。UE4默认提供其中两个源：`FLocalizationResourceTextSource`（托管`LocRes`支持）和`FPolyglotTextSource`（托管polyglot数据支持）。

已本地化的文本源可以提供与外部系统连接的方法，并且可以通过创建和注册派生自[`ILocalizedTextSource`](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/ILocalizedTextSource/index.html)的类型，在每个项目的基础上添加这些源。

-   [localization](https://dev.epicgames.com/community/search?query=localization)
-   [text formatting](https://dev.epicgames.com/community/search?query=text%20formatting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [文本文字值](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E6%96%87%E6%9C%AC%E6%96%87%E5%AD%97%E5%80%BC)
-   [使用C++创建文本文字值](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E4%BD%BF%E7%94%A8c++%E5%88%9B%E5%BB%BA%E6%96%87%E6%9C%AC%E6%96%87%E5%AD%97%E5%80%BC)
-   [在INI文件中创建文本文字值](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E5%9C%A8ini%E6%96%87%E4%BB%B6%E4%B8%AD%E5%88%9B%E5%BB%BA%E6%96%87%E6%9C%AC%E6%96%87%E5%AD%97%E5%80%BC)
-   [在资源中创建文本文字值](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E5%9C%A8%E8%B5%84%E6%BA%90%E4%B8%AD%E5%88%9B%E5%BB%BA%E6%96%87%E6%9C%AC%E6%96%87%E5%AD%97%E5%80%BC)
-   [文本格式化](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E6%96%87%E6%9C%AC%E6%A0%BC%E5%BC%8F%E5%8C%96)
-   [使用C++进行文本格式化](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E4%BD%BF%E7%94%A8c++%E8%BF%9B%E8%A1%8C%E6%96%87%E6%9C%AC%E6%A0%BC%E5%BC%8F%E5%8C%96)
-   [蓝图中的文本格式化](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E8%93%9D%E5%9B%BE%E4%B8%AD%E7%9A%84%E6%96%87%E6%9C%AC%E6%A0%BC%E5%BC%8F%E5%8C%96)
-   [参数修饰符](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E5%8F%82%E6%95%B0%E4%BF%AE%E9%A5%B0%E7%AC%A6)
-   [复数形式](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E5%A4%8D%E6%95%B0%E5%BD%A2%E5%BC%8F)
-   [性别形式](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E6%80%A7%E5%88%AB%E5%BD%A2%E5%BC%8F)
-   [韩语后置词](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E9%9F%A9%E8%AF%AD%E5%90%8E%E7%BD%AE%E8%AF%8D)
-   [文本格式化最佳实践](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E6%96%87%E6%9C%AC%E6%A0%BC%E5%BC%8F%E5%8C%96%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)
-   [文本生成](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E6%96%87%E6%9C%AC%E7%94%9F%E6%88%90)
-   [数值型文本生成](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E6%95%B0%E5%80%BC%E5%9E%8B%E6%96%87%E6%9C%AC%E7%94%9F%E6%88%90)
-   [使用C++进行数值型生成](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E4%BD%BF%E7%94%A8c++%E8%BF%9B%E8%A1%8C%E6%95%B0%E5%80%BC%E5%9E%8B%E7%94%9F%E6%88%90)
-   [蓝图中的数值型生成](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E8%93%9D%E5%9B%BE%E4%B8%AD%E7%9A%84%E6%95%B0%E5%80%BC%E5%9E%8B%E7%94%9F%E6%88%90)
-   [时间型](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E6%97%B6%E9%97%B4%E5%9E%8B)
-   [使用C++进行时间型生成](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E4%BD%BF%E7%94%A8c++%E8%BF%9B%E8%A1%8C%E6%97%B6%E9%97%B4%E5%9E%8B%E7%94%9F%E6%88%90)
-   [蓝图中的时间型生成](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E8%93%9D%E5%9B%BE%E4%B8%AD%E7%9A%84%E6%97%B6%E9%97%B4%E5%9E%8B%E7%94%9F%E6%88%90)
-   [变换型](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E5%8F%98%E6%8D%A2%E5%9E%8B)
-   [使用C++进行变换型生成](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E4%BD%BF%E7%94%A8c++%E8%BF%9B%E8%A1%8C%E5%8F%98%E6%8D%A2%E5%9E%8B%E7%94%9F%E6%88%90)
-   [蓝图中的变换型生成](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E8%93%9D%E5%9B%BE%E4%B8%AD%E7%9A%84%E5%8F%98%E6%8D%A2%E5%9E%8B%E7%94%9F%E6%88%90)
-   [字符串表](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A1%A8)
-   [文本值编组](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E6%96%87%E6%9C%AC%E5%80%BC%E7%BC%96%E7%BB%84)
-   [数据表](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E6%95%B0%E6%8D%AE%E8%A1%A8)
-   [Polyglot数据](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#polyglot%E6%95%B0%E6%8D%AE)
-   [使用C++的Polyglot数据](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E4%BD%BF%E7%94%A8c++%E7%9A%84polyglot%E6%95%B0%E6%8D%AE)
-   [蓝图中的Polyglot数据](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E8%93%9D%E5%9B%BE%E4%B8%AD%E7%9A%84polyglot%E6%95%B0%E6%8D%AE)
-   [已本地化的文本源](/documentation/zh-cn/unreal-engine/text-localization-in-unreal-engine#%E5%B7%B2%E6%9C%AC%E5%9C%B0%E5%8C%96%E7%9A%84%E6%96%87%E6%9C%AC%E6%BA%90)

相关文档

[

字符串处理

![字符串处理](https://dev.epicgames.com/community/api/documentation/image/76c23973-3875-4ab7-a2ca-7c0b937593a3?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/string-handling-in-unreal-engine)
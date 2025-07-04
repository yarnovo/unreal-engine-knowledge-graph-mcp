# 虚幻引擎本地化概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/localization-overview-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:11:04.792Z

---

目录

![本地化概述](https://dev.epicgames.com/community/api/documentation/image/07030b08-9537-497d-8b3b-283fa070182d?resizing_type=fill&width=1920&height=335)

## 本地化和国际化

本地化和国际化（L10N和I18N）是在"本地化"大概念下往往会结合使用的两个概念。但是，这两者是有区别的，虚幻引擎(UE)对两者的处理方式不同。UE4中的本地化系统以我们的"文本"类型为中心，而我们的国际化支持使用[International Components for Unicode](http://site.icu-project.org/)(ICU)库。

虽然它们是独立的，但在UE中，如果没有适当的国际化支持，就无法在运行时进行本地化。

## ICU和国际化支持

**ICU** 是一个成熟而稳健的国际化库，UE使用ICU处理任何涉及特定语言的数据或处理，包括以下操作：

-   获取平台/OS的当前语言。
    
-   处理文化的优先备份。
    
-   处理文化正确的数字（包括百分比和货币）、日期和时间（包括时区数据）格式化。
    
-   处理文化正确的数字复数（在文本格式化期间）。
    
-   处理符合Unicode的文本转换（例如ToUpper、ToLower）。
    
-   处理符合Unicode的文本比较和排序。
    
-   处理符合Unicode的[边界分析](https://unicode-org.github.io/icu/userguide/boundaryanalysis/)（字符、词语和换行符）。
    
-   处理符合Unicode的双向(BiDi)文本检测。
    

ICU需要使用的特定文化的数据存储在ICU本身之外，UE提供了一些粗略的数据集，你可以使用这些数据集将你的项目大小最小化：

-   英语(~1.77MB)
    
-   EFIGS - 英语、法语、意大利语、德语和西班牙语(~2.38MB)
    

EFIGSCJK - 英语、法语、意大利语、德语、西班牙语、中文、日语和韩语(~5.99MB)

-   CJK - 中文、日语和韩语(~5.16MB)
    
-   所有语言(~15.3MB)
    

你选择哪一种文化取决于你本地化项目的区域，这些选项可以在 **项目设置（Project Settings）** 中设置。详情请参阅[打包本地化数据](/documentation/zh-cn/unreal-engine/localization-overview-for-unreal-engine#%E6%89%93%E5%8C%85%E6%9C%AC%E5%9C%B0%E5%8C%96%E6%95%B0%E6%8D%AE)。

## 文化

UE中的文化包含特定区域的国际化信息。文化名称由三个连字符隔开的部分组成（一个[IETF语言标签](https://en.wikipedia.org/wiki/IETF_language_tag)：

-   一个2字母[ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)语言代码（如"zh"）
    
-   一个可选的4字母[ISO 15924](https://en.wikipedia.org/wiki/ISO_15924)脚本代码（如"Hans"）
    
-   一个可选的2字母[ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1)国家代码（如"CN"）。
    

当UE查找特定文化的本地化数据时，它将从最特定到最不特定的顺序进行处理。例如：

-   zh-Hans-CN的处理顺序是"zh-Hans-CN"，接着是"zh-CN"，然后是"zh-Hans"，再然后是"zh"。
    
-   en-GB的处理顺序是"en-GB"，然后是"en"。
    

为了实现对特定文化的最广泛覆盖，请使用最不特定的有效文化代码。通常这只是语言代码，但你应该注意需要考虑的区域语言差异。

在大多数情况下，这些区域差异仅限于特定的国家代码，这使得差异很容易解决。然而，还有一些情况更复杂，如下所示。

### 中文

中文有简体和繁体之分，分别用"Hans"和"Hant"ISO-15924脚本表示。简体本地化使用"zh-Hans"，繁体本地化使用"zh-Hant"。

### 西班牙语

西班牙语有两种：欧洲西班牙语和拉丁美洲西班牙语。但是，没有方便的脚本代码可以用来区分两者。对于拉丁美洲西班牙语，有一个IETF语言标签("es-419")，但大多数平台不提供该标签，而是提供一个实际的国家代码("es-MX")。

为了解决这一问题，欧洲西班牙语使用"es"，拉丁美洲西班牙语使用"es-419"。然后，使用UE的[文化重映射](/documentation/zh-cn/unreal-engine/managing-the-active-culture-at-runtime#%E6%96%87%E5%8C%96%E9%87%8D%E6%98%A0%E5%B0%84)功能将拉丁美洲西班牙语国家映射到"es-419"。

这可以通过在"DefaultGame"文件中添加以下内容来实现：

```cpp
	[Internationalization]
	+CultureMappings="es-AR;es-419"
	+CultureMappings="es-BO;es-419"
	+CultureMappings="es-CL;es-419"
	+CultureMappings="es-CO;es-419"
	+CultureMappings="es-CR;es-419"
	+CultureMappings="es-CU;es-419"
	+CultureMappings="es-DO;es-419"
	+CultureMappings="es-EC;es-419"
	+CultureMappings="es-GT;es-419"
	+CultureMappings="es-HN;es-419"
	+CultureMappings="es-MX;es-419"
	+CultureMappings="es-NI;es-419"
	+CultureMappings="es-PA;es-419"
	+CultureMappings="es-PE;es-419"
	+CultureMappings="es-PR;es-419"
	+CultureMappings="es-PY;es-419"
	+CultureMappings="es-SV;es-419"
	+CultureMappings="es-US;es-419"
	+CultureMappings="es-UY;es-419"
	+CultureMappings="es-VE;es-419"

```

## 本地化目标

**本地化目标（Localization Targets）** 是本地化数据的指定自含式模块。本地化目标具有以下特性：

-   它们从一组指定的源中收集文本；
    
-   它们存储在一个清单文件中；
    
-   它们被翻译成特定文化的存档文件；
    
-   它们被编译成特定文化的本地化资源文件，系统显示编译后的特定文化的资源文件。
    

为了简单起见，一个项目可以有一个本地化目标，也可以有多个本地化目标，以便将项目的本地化数据分成多个部分。虚幻编辑器有一个与UE的其他部分分开来的本地化目标，因此编辑器可以进行本地化，而无需与游戏一起发布本地化数据。通常，游戏会为基础项目的所有本地化数据提供一个本地化目标，并为任何扩展提供额外的本地化目标。

## 本地化管道

UE本地化管道是围绕"在源文本中编写"的本地化方法建模的。这意味着，如果需要在UI中显示"Hello World!"的文本，只需在文本属性中输入"Hello World!"（或者使用C++中的"NSLOCTEXT"或"LOCTEXT"宏），本地化收集程序将负责采集文本，以便对其进行本地化。

"在源文本中编写"的方法是非常动态的，这种方法允许开发人员在开发过程中避免过多地考虑本地化。然而，对于希望严格控制项目中使用的文本的团队来说，这也可能会令人沮丧。为了解决这一问题，UE4支持\[字符串表(working-with-content/Localization/StringTables)，允许使用"编写一次并引用"的方法进行本地化（尽管在内部，管道只是将字符串表视为另一个"author-at-source"源)。

有一个用于解决缺乏本地字符串表的旧方法（不再支持），就是用一个带ID的"假"原生语言（最有可能是"es-US-POSIX")作为源文本，然后使用UE在4.14版本之前提供的字符串合并函数将这些ID转化为各种语言。你可以在旧的支持问题中找到对该方法引用，但不应该再使用它。使用该方法的项目应该迁移到字符串表。

本地化管道本身处理本地化目标，本地化目标由两部分组成：配置（存储在"Config/Localization/"中）和数据（存储在"Content/Localization/{TargetName}/"中)。

如果我们假设本地化目标使用英语("en")和法语("fr")，那么它在Content/Localization/"文件夹中的布局将如下所示：

```cpp
	{TargetName}/
	{TargetName}.manifest
	{TargetName}.locmeta
	en/
		{TargetName}.archive
		{TargetName}.po
		{TargetName}.locres
	fr/
		{TargetName}.archive
		{TargetName}.po
		{TargetName}.locres

```

以上所有文件和文件夹都是由本地化管道的各个部分生成的。

文件夹

说明

**{TargetName}.manifest**

-   清单是自定义JSON文件，存储本地化管道从源代码和资源中收集的所有文本。
    
-   每次运行本地化收集步骤时都会重新生成清单，不应该手动编辑。
    

**{TargetName}.archive**

-   存档是自定义JSON文件，用于存储收集到清单中的文本的每种文化翻译。
    
-   每次运行本地化收集或导入步骤以移除旧源的条目时，都会对存档进行整理。
    
-   存档可以手动编辑，但我们强烈建议你不要手动编辑。我们推荐的工作流程是编辑导出的PO文件，然后再重新导入。
    

**{TargetName}.po**

-   PO（[可移植对象](https://www.gnu.org/software/gettext/manual/html_node/PO-Files.html)）文件包含要翻译的每种文化文本及其当前翻译。
    
-   PO文件由本地化导出文本步骤生成，并通过本地化导入文本步骤重新导入到存档中。
    
-   PO是一种常见格式，可以手动在本地编辑，可以通过[Poedit](https://poedit.net/)等翻译工具在本地编辑，还可以通过[OneSky](https://www.oneskyapp.com/)或[XLOC](http://www.xloc.com/)等工具协作在本地编辑。
    

**{TargetName}.locres**

-   LocRes是自定义二进制文件，它存储编译后的每种文化的翻译，以便在运行时使用。
    
-   每次运行本地化编译步骤时都会重新生成LocRes文件，并将其暂存到打包构建中。
    
-   LocRes是你的项目将在运行时（包括在编辑器中）从中加载本地化数据的唯一文件，因此必须对源数据的任何编辑或更改（例如导入PO文件）必须进行编译，之后方能生效。
    

**{TargetName}.locmeta**

-   LocMeta是自定义二进制文件，它存储编译后的目标元数据（当前仅存储目标的原生语言），以便在运行时使用。
    
-   每次编译本地化数据时都会重新生成LocMeta文件，并将其暂存到打包构建中。
    

本地化目标还会指定一种"原生"语言，应该将其设置为编写内容（通常称为"源文本"或"源数据"）所使用的文化。

原生文化可以像任何其他文化一样包含"翻译"，尽管原生文化翻译的存在只是为了方便复制编辑源文本，而不直接编辑源代码或资源。

外国语言使用原生语言文本作为翻译的源文本，如果更改了原生语言文本，外国语言会变成"旧"状态（本地化编译步骤中有一个设置允许使用旧翻译）。

有关优化本地化管道的更多信息，请参阅[管道优化](/documentation/zh-cn/unreal-engine/pipeline-optimization-for-localization-in-unreal-engine)。

## PO文件格式

虚幻的P0文件使用以下默认格式（具体取决于P0导出中的折叠模式）。

-   使用 **相同的文本标识和源文本（Identical Text Identity and Source Text）** 折叠模式：
    -   `msgctxt` 包含条目（entry）的虚幻标识。
    -   `msgid` 包含源字符串。
    -   `msgstr` 包含翻译。
-   使用 **相同的命名空间和源文本（Identical Namespace and Source Text）** 折叠模式：
    -   `msgctxt` 包含条目（entry）的命名空间。
    -   `msgid` 包含源文本。
    -   `msgstr` 包含翻译。

如果你使用Crowdin来管理翻译，我们还提供了一种替代格式，可以产生更好的效果。不过请注意，这种格式无法检测从PO文件导入的陈旧的翻译（因为我们不再留有翻译的来源）。

使用"相同名称空间和源文本（Identical Namespace and Source Text）"折叠模式时，该模式产生的输出结果相同，但对"相同文本标识和源文本"折叠模式来说，它产生的结果如下：

-   `msgctxt` 未使用。
-   `msgid` 包含条目的虚幻标识。
-   `msgstr` 包含源字符串（对应原生文化），或者翻译（对应国外文化）。
-   `X-Crowdin-SourceKey` 标头属性指定 `msgstr` 作为原生文化的源文本。

## 打包本地化数据

若要为你的项目打包正确的本地化和国际化数据，需要在你的 **项目设置（Project Settings）** 的高级 **打包（Packaging）** 部分中调整一些设置。

你需要验证的两个设置是：

-   **要打包的本地化（Localizations to Package）** - 使用该设置，你可以选择要为哪些文化暂存本地化数据。你可以使用 **显示本地化文本（Show Localized）** 选项来过滤列表，以仅显示你有"LocRes"文件的文化。
    
-   **国际化支持（Internationalization Support）** - 使用该设置，你可以选择要暂存的ICU国际化数据集。该选项必须与要暂存的本地化数据一致。
    

-   [overview](https://dev.epicgames.com/community/search?query=overview)
-   [localization](https://dev.epicgames.com/community/search?query=localization)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [本地化和国际化](/documentation/zh-cn/unreal-engine/localization-overview-for-unreal-engine#%E6%9C%AC%E5%9C%B0%E5%8C%96%E5%92%8C%E5%9B%BD%E9%99%85%E5%8C%96)
-   [ICU和国际化支持](/documentation/zh-cn/unreal-engine/localization-overview-for-unreal-engine#icu%E5%92%8C%E5%9B%BD%E9%99%85%E5%8C%96%E6%94%AF%E6%8C%81)
-   [文化](/documentation/zh-cn/unreal-engine/localization-overview-for-unreal-engine#%E6%96%87%E5%8C%96)
-   [中文](/documentation/zh-cn/unreal-engine/localization-overview-for-unreal-engine#%E4%B8%AD%E6%96%87)
-   [西班牙语](/documentation/zh-cn/unreal-engine/localization-overview-for-unreal-engine#%E8%A5%BF%E7%8F%AD%E7%89%99%E8%AF%AD)
-   [本地化目标](/documentation/zh-cn/unreal-engine/localization-overview-for-unreal-engine#%E6%9C%AC%E5%9C%B0%E5%8C%96%E7%9B%AE%E6%A0%87)
-   [本地化管道](/documentation/zh-cn/unreal-engine/localization-overview-for-unreal-engine#%E6%9C%AC%E5%9C%B0%E5%8C%96%E7%AE%A1%E9%81%93)
-   [PO文件格式](/documentation/zh-cn/unreal-engine/localization-overview-for-unreal-engine#po%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F)
-   [打包本地化数据](/documentation/zh-cn/unreal-engine/localization-overview-for-unreal-engine#%E6%89%93%E5%8C%85%E6%9C%AC%E5%9C%B0%E5%8C%96%E6%95%B0%E6%8D%AE)
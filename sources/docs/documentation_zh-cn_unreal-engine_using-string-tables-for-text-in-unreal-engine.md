# 将字符串表用于虚幻引擎中的文本 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-string-tables-for-text-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:11:05.567Z

---

目录

![字符串表](https://dev.epicgames.com/community/api/documentation/image/46708f5c-734e-4e31-bbb5-a3166ced12cb?resizing_type=fill&width=1920&height=335)

**字符串表（String Tables）** 提供了一种方法将已本地化的文本集中到一个（或多个）已知位置，然后稳健地从其他资源或代码引用字符串表中的条目，从而能够轻松地重复使用已本地化的文本。

## 创建字符串表

字符串表可以在C++中定义，可以使用CSV文件加载，也可以作为资源创建。

### 在C++中创建字符串表

可以使用宏的LOCTABLE族系在C++中创建字符串表。

宏

说明

`LOCTABLE_NEW`

创建一个空白字符串表实例。

`LOCTABLE_FROMFILE_X`

创建一个字符串表实例，并从给定的CSV文件填充。当使用\_ENGINE变量时，文件相对于引擎内容目录，当使用\_GAME变量时，文件相对于项目内容目录。

`LOCTABLE_SETSTRING`

在字符串表中设置一个条目。

`LOCTABLE_SETMETA`

为字符串表中的一个条目设置可选元数据。

**示例：**

```cpp
    // 仅使用C++创建和填充字符串表
    LOCTABLE_NEW("CodeStringTable","CodeStringTable");
    LOCTABLE_SETSTRING("CodeStringTable","HelloWorld","Hello World!");
    LOCTABLE_SETMETA("CodeStringTable","HelloWorld","Comment","This is a comment about hello world");
    LOCTABLE_SETSTRING("CodeStringTable","GoodbyeWorld","Goodbye World!");
    LOCTABLE_SETMETA("CodeStringTable","GoodbyeWorld","Comment","This is a comment about goodbye world");
```

### 使用CSV创建字符串表

CSV中定义的字符串表可以使用LOCTABLE\_FROMFILE\_X宏加载，也可以从字符串表资源导入/导出。

**示例**：

```cpp
    // 从CSV文件创建并填充字符串表
    LOCTABLE_FROMFILE_GAME("CSVStringTable","CSVStringTable","StringTableCSV/TestStrings.csv");
```

用于字符串表的CSV格式有两个强制列，即"Key"和"SourceString"，任何额外的列都被解析为字符串表条目的元数据。

```cpp
    Key,SourceString,Comment
    "HelloWorld","Hello World!","This is a comment about hello world"
    "GoodbyeWorld","Goodbye World!","This is a comment about goodbye world"
```

CSV文件中的引号使用两组引号("")转义，而不是C风格转义(\\")，但字符串中的其他控制字符（包括制表符和换行符）应该使用C风格转义进行转义。

使用LOCTABLE\_FROMFILE\_X宏加载的CSV字符串表将被检测是否发生更改，如果在磁盘上发生了更改，将自动重新导入（仅用于编辑器编译）。

CSV字符串表不会自动暂存。建议你将CSV字符串表放置在一个已知文件夹中，然后将它们添加到项目的 **打包（Packaging）** 设置中的 **Additional Non-Asset Directories to Package**。

### 创建字符串表资源

字符串表可以使用内容浏览器（**添加（Add）> 杂项（Miscellaneous）> 字符串表（String Table）** 创建，并可以通过字符串表编辑器进行管理。字符串表编辑器目前不能编辑元数据，但从CSV文件导入的所有元数据都将保存。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d23cba0f-ff6d-4232-afdd-c7125c8a59f5/stringtables-01.png)

字符串表资源是二进制的，因此如果发生合并冲突，将无法解析。我们建议比使用C++或CSV时更为精细地保留字符串表资源，以最小化冲突域。

## 引用字符串表

你可以在C++、INI文件或资源中引用字符串表。

### 在C++中引用字符串表

在C++中，可以使用"LOCTABLE"宏或静态["FText::FromStringTable"](https://api.unrealengine.com/INT/API/Runtime/Core/Internationalization/FText/FromStringTable/index.html)函数引用字符串表。基础逻辑是相同的，虽然宏更容易输入，但只处理文字值，而函数可以同时处理文字参数和变量参数。

### 在INI文件中引用字符串表

在INI文件中，可以使用"LOCTABLE"宏语法引用字符串表。

### 引用字符串表资源

可以使用"FText"属性引用字符串表。  
![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48b90dd5-6878-4d9b-a87a-42afcbe51dde/stringtables-02.png)

单击文本属性旁边的白色箭头，将该属性实例链接到字符串表条目，而不是内联定义已本地化的文本。  
![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94cc93d7-e7ba-405a-a6e8-3c232627f132/stringtables-03.png)

## 重定向字符串表

我们建议尽量避免重命名或移动字符串表。但是，如果需要重命名或移动字符串表，有一种方法可以重定向整个表和各个键。你可以在INI文件中实现这一点，也可以通过重定向字符串表资源来实现。

### 在INI文件中重定向字符串表

可以使用INI文件重定向字符串表。以下示例将重定向整个字符串表指向另一个字符串表：

```cpp
    [Core.StringTable]
    +StringTableRedirects=(OldStringTable="Foo",NewStringTable="Bar")
```

如果想要将一个字符串表中的一个条目重定向到另一个字符串表中的一个条目，请使用以下示例：

```cpp
    [Core.StringTable]
    +StringTableRedirects=(StringTable="Foo",OldKey="Bar",NewKey="Baz")
```

### 重定向字符串表资源

移动或重命名字符串表资源将留下一个资源重定向器。它与任何其他资源重定向器一样进行处理和跟进。

-   [localization](https://dev.epicgames.com/community/search?query=localization)
-   [textlocalization](https://dev.epicgames.com/community/search?query=textlocalization)
-   [string tables](https://dev.epicgames.com/community/search?query=string%20tables)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建字符串表](/documentation/zh-cn/unreal-engine/using-string-tables-for-text-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A1%A8)
-   [在C++中创建字符串表](/documentation/zh-cn/unreal-engine/using-string-tables-for-text-in-unreal-engine#%E5%9C%A8c++%E4%B8%AD%E5%88%9B%E5%BB%BA%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A1%A8)
-   [使用CSV创建字符串表](/documentation/zh-cn/unreal-engine/using-string-tables-for-text-in-unreal-engine#%E4%BD%BF%E7%94%A8csv%E5%88%9B%E5%BB%BA%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A1%A8)
-   [创建字符串表资源](/documentation/zh-cn/unreal-engine/using-string-tables-for-text-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A1%A8%E8%B5%84%E6%BA%90)
-   [引用字符串表](/documentation/zh-cn/unreal-engine/using-string-tables-for-text-in-unreal-engine#%E5%BC%95%E7%94%A8%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A1%A8)
-   [在C++中引用字符串表](/documentation/zh-cn/unreal-engine/using-string-tables-for-text-in-unreal-engine#%E5%9C%A8c++%E4%B8%AD%E5%BC%95%E7%94%A8%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A1%A8)
-   [在INI文件中引用字符串表](/documentation/zh-cn/unreal-engine/using-string-tables-for-text-in-unreal-engine#%E5%9C%A8ini%E6%96%87%E4%BB%B6%E4%B8%AD%E5%BC%95%E7%94%A8%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A1%A8)
-   [引用字符串表资源](/documentation/zh-cn/unreal-engine/using-string-tables-for-text-in-unreal-engine#%E5%BC%95%E7%94%A8%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A1%A8%E8%B5%84%E6%BA%90)
-   [重定向字符串表](/documentation/zh-cn/unreal-engine/using-string-tables-for-text-in-unreal-engine#%E9%87%8D%E5%AE%9A%E5%90%91%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A1%A8)
-   [在INI文件中重定向字符串表](/documentation/zh-cn/unreal-engine/using-string-tables-for-text-in-unreal-engine#%E5%9C%A8ini%E6%96%87%E4%BB%B6%E4%B8%AD%E9%87%8D%E5%AE%9A%E5%90%91%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A1%A8)
-   [重定向字符串表资源](/documentation/zh-cn/unreal-engine/using-string-tables-for-text-in-unreal-engine#%E9%87%8D%E5%AE%9A%E5%90%91%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A1%A8%E8%B5%84%E6%BA%90)
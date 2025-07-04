# 虚幻引擎交叉编译器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cross-compiler-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:24:37.139Z

---

目录

![HLSL 交叉编译器](https://dev.epicgames.com/community/api/documentation/image/d8290651-f149-4d0b-8bb1-c32edae18484?resizing_type=fill&width=1920&height=335)

这个库将 **高级着色语言 (HLSL)** 着色器源代码编译成高级中间表示法，执行独立于设备的优化，并生成 **OpenGL 着色语言 (GLSL)** 兼容源代码。这个库在很大程度上基于 Mesa 的 GLSL 编译器。前端已进行大量重新编写，以解析 HLSL 并根据 HLSL **抽象语法树 (AST)** 生成 Mesa IR。这个库利用 Mesa 的 IR 优化来简化代码，并根据 Mesa IR 最终生成 GLSL 源代码。GLSL 生成是以 GLSL 优化器中的工作为基础。

除了生成 GLSL 代码以外，这个编译器还将全局一致变量打包成数组以便轻松高效地进行设置，提供一种反射机制以通知高级代码需要哪些一致变量，并提供映射信息以使高级代码在运行时可通过索引而非名称来绑定资源。

UnrealBuildTool 不会检测对外部库（例如 HLSLCC）进行的更改。 当您重新构建 HLSLCC 库时，请在 OpenGLShaders.cpp 中添加一个空格，以便强制重新链接该模块。

主库入口点是 HLSLCrossCompile。此函数使用所请求的选项执行根据源 HLSL 生成 GLSL 代码所需执行的所有步骤。每个阶段的摘要如下所示：

操作

说明

预处理

代码通过类似于 C 的预处理器运行。此阶段是可选的，您可使用 NoPreprocess 标志省略此阶段。虚幻引擎会在编译前使用 MCPP 执行预处理，从而跳过此步骤。

解析

解析 HLSL 源代码以生成抽象语法树。此工作在 **\_mesa\_hlsl\_parse** 函数中完成。词法分析器和解析器分别由 flex 和 bison 生成。有关更多信息，请参阅关于解析的小节。

编译

将 AST 编译为 Mesa 中间表示法。此过程在 **\_mesa\_ast\_to\_hir** 函数中发生。在此阶段，编译器执行隐式转换、函数重载解析、生成内部函数的指令等功能。将生成 GLSL 主入口点。请参阅"生成 GLSL 主入口点"。此阶段会将输入及输出变量的全局声明添加到 IR，计算 HLSL 入口点的输入，调用 HLSL 入口点，并将输出写入全局输出变量。

优化

对 IR 执行多遍优化，包括直接插入函数、消除无用代码、传播常量、消除公共的子表达式，等等。有关详细信息，请参阅"优化 IR"，尤其是参阅 **do\_optimization\_pass**。

一致变量打包

将全局一致变量打包成数组并保留映射信息，以便引擎可将参数与一致变量数组的相关部分绑定。有关详细信息，请参阅"打包一致变量"。

最终优化

打包一致变量之后，将对 IR 运行第二遍优化，以简化打包一致变量时生成的代码。

生成 GLSL

最后，将经过优化的 IR 转换为 GLSL 源代码。从 IR 到 GLSL 的转换相对简单。除了生成所有构造及一致变量缓冲区的定义以及源代码本身以外，还会在文件开头的注释中写入一个映射表。虚幻引擎将解析这个映射表，以便绑定参数。有关详细信息，请参阅"生成 GLSL"，尤其是参阅 **ir\_gen\_glsl\_visitor** 类。

## 解析

HLSL 解析器分为两部分：词法分析器和解析器。词法分析器通过使正则表达式与相应的标记匹配，将 HLSL 输入标记化。源文件是 hlsl\_lexer.ll，并由 flex 处理以生成 C 代码。每一行都以一个正则表达式开头，后跟以 C 代码编写的语句。该正则表达式匹配时，将执行相应的 C 代码。状态存储在许多以 "yy" 为前缀的全局变量中。

解析器将规则与标记化输入匹配，以解释语言的语法并构建 AST。源文件是 hlsl\_parser.yy，并由 bison 处理以生成 C 代码。对 bison 所使用的语法进行全面说明超出了本文档的范畴，但通过检视 HLSL 解析器可了解一些基本信息。通常，您将规则定义为与某个以递归方式求值的标记序列匹配。规则匹配时，将执行一些相应的 C 代码，这使您能够构建自己的 AST。C 代码块中的语法如下所示：

-   $$ = 解析此规则的结果，这通常是抽象语法树中的节点
-   $1、$2，等等 = 当前规则所匹配的子规则的输出

对词法分析器或解析器进行更改后，必须使用 flex 和 bison 重新生成 C 代码。GenerateParsers 批处理文件可处理此任务，但您必须根据系统上 flex 和 bison 的安装位置来设置目录。README 文件中包含的信息说明了使用的版本，以及可以从什么位置下载用于 Windows 的二进制文件。

## 编译

在编译期间，将遍历 AST 并使用 AST 来生成 IR 指令。您应掌握的一个重要概念是，IR 是非常低级别的操作序列。因此，它不会执行隐式转换或任何具有隐式转换性质的操作：所有操作都必须显式地执行。

下面是一些有趣的常用函数：

-   **apply\_type\_conversion** - 此函数将一种类型的值转换为另一种类型（如果有可能的话）。是执行隐式转换还是显式转换由参数控制。
    
-   **arithmetic\_result\_type** 等- 这组函数确定对输入值应用操作的结果类型。
    
-   **validate\_assignment** - 确定某个 rvalue 是否可赋予特定类型的 lvalue。必要时，将应用允许的隐式转换。
    
-   **do\_assignment** - 将 rvalue 赋予 lvalue（如果可使用 validate\_assignment 完成）。
    
-   **ast\_expression::hir** - 将 AST 中的表达式节点转换为一组 IR 指令。
    
-   **process\_initializer** - 将初始化表达式应用于变量。
    
-   **ast\_struct\_specifier::hir** - 构建聚集类型，以表示所声明的结构。
    

**ast\_cbuffer\_declaration::hir** - 构建常量缓冲区布局的构造，并将其存储为一致变量块。

**process\_mul** - 这是用于处理 HLSL 内部乘法的特殊代码。

-   **match\_function\_by\_name** - 根据输入参数的名称和列表来查找函数特征符。
    
-   **rank\_parameter\_lists** - 对两个参数列表进行比较，并指定数字排名以指示这两个列表的匹配程度。这是一个辅助函数，用于执行重载解析：排名最低的特征符将胜出，如果有任何特征符的排名与排名最低的特征符相同，那么将函数调用声明为具有歧义。排名为零表示精确匹配。
    
-   **gen\_texture\_op** - 处理内置 HLSL 纹理和取样对象的方法调用。
    
-   **\_mesa\_glsl\_initialize\_functions** - 生成 HLSL 内部函数的内置函数。大部分函数（例如 sin 和 cos）会生成 IR 代码以执行操作，但某些函数（例如 transpose 和 determinant）会保留函数调用以推迟操作，使其由驱动程序的 GLSL 编译器执行。
    

## 扩展编译器

下面是一些有关实现某些类型的功能的提示：

**新表达式**

-   向 ir\_expression\_operation 枚举添加一个条目。
-   在 ir\_expression 构造函数中，处理您的新表达式，以根据输入操作数的类型来设置表达式的类型化结果。
-   如果有可能，请向 ir\_expression::constant\_expression\_value 添加一个处理程序，以便在编译时对常量表达式进行求值。
-   向 ir\_validate::visit\_leave(ir\_expression \*ir) 添加一个处理程序，以验证该表达式的正确性。
-   向 GLSLExpressionTable 添加一个条目，以将该表达式映射到 GLSL 表达式。
-   修改词法分析器，使其识别该表达式的标记（如果适用的话）。
-   修改解析器以使其识别该标记，并创建适当的 ast\_expression 节点（如果适用的话）。

**内部函数**

-   向 \_mesa\_glsl\_initialize\_functions 添加内置函数定义。
-   在大部分情况下，内部函数将直接映射到单个表达式。如果是这样，您只需添加新的 ir\_expression 并使用 make\_intrinsic\_genType 来生成内部函数。

**类型**

-   添加 glsl\_type，以在 IR 中表示您的类型。您可将其添加到 \_mesa\_glsl\_initialize\_types，或添加到其中一个内置类型表，例如 glsl\_type::builtin\_core\_types。对于模板化类型，请参阅 glsl\_type::get\_sampler\_instance 作为示例。
-   修改词法分析器以使其识别必要的标记，并修改解析器以使其与您的标记匹配。请参阅 Texture2DArray 作为示例。
-   修改解析器以使其识别该标记，并创建必要的类型说明符。texture\_type\_specifier\_nonarray 是一个不错的示例。
-   修改 ast\_type\_specifier::hir，以执行创建用户定义类型所需的任何处理。请参阅结构的处理作为示例。
-   修改 ast\_type\_specifier::glsl\_type 以返回适当的 glsl\_type。
-   如果类型包含方法，请修改 \_mesa\_ast\_field\_selection\_to\_hir 以处理这些方法。请参阅 gen\_texture\_op 作为示例。

**属性、标志和限定符**

-   将属性/标志/限定符添加到任何需要它们的 IR 和/或 AST 节点。
-   修改词法分析器，使其识别必要的标记。
-   修改解析器，以根据需要添加语法规则。例如，如果您要添加对 \[loop\] 属性的支持，请修改 iteration\_statement 规则以接受其前面的可选属性。操作如下：将 iteration\_statement 更改为 base\_iteration\_statement，并添加

**iteration\_statement**：

```cpp
	iteration_attr base_iteration_statement
	{
		// result is the iteration statement
		$$ = $2;
		// apply attribute
		$$->attr = $1;
	}
	base_iteration_statement
	{
		// pass thru if no attribute
		$$ = $1;
	}
```

最后，在编译器中任何需要了解该属性的位置进行修改。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [解析](/documentation/zh-cn/unreal-engine/cross-compiler-in-unreal-engine#%E8%A7%A3%E6%9E%90)
-   [编译](/documentation/zh-cn/unreal-engine/cross-compiler-in-unreal-engine#%E7%BC%96%E8%AF%91)
-   [扩展编译器](/documentation/zh-cn/unreal-engine/cross-compiler-in-unreal-engine#%E6%89%A9%E5%B1%95%E7%BC%96%E8%AF%91%E5%99%A8)
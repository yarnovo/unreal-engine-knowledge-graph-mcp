# 虚幻引擎中模块API的说明符 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/module-api-specifiers-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:39:49.938Z

---

目录

![模块API的说明符](https://dev.epicgames.com/community/api/documentation/image/a17ac4db-bdb0-4972-b3eb-bf3b8a4817a0?resizing_type=fill&width=1920&height=335)

对这些修饰最简单的理解是它们为模块的DLL文件标记函数，类或者数据为可公开访问类型。如果在Engine模块中将一个函数加上 `ENGINE_API` 的标记，那么任何引入Engine模块的模块都可以直接访问该函数。

这些仅在当引擎以模块化的方式编译时才起效（面向桌面平台的DLL文件）。和模块化模式相对的另一种模式我们称做单片（Monolithic）模式，它将所有的代码放到同一个单独的可执行文件中。这个编译方式由UnrealBuildTool和/或平台及编译配置控制。

根据 UBT 编译代码的方式的不同，实际的 API 宏相当于以下某个类型：

-   `__declspec( dllexport )`，当以 "模块" 模式编译模块代码时。
-   `__declspec( dllimport )`，当引入一个模块的公开模块头信息时。
-   空，当以单片模式（Monolithic Mode）编译时。

API 的宏仅对那些会被静态引入到其他模块的模块才有实际意义。比如 Core 模块就是个很好的例子 -- UE4 中几乎每个模块都会它们的 \*.Build.cs 文件中都指定依赖 Core 为该模块的导入项。

很多模块是永远不需要被静态的导入（比如 SceneOutliner 模块）。我们将这些模块作为动态加载模块。动态加载的模块很棒，因为可以在启动时进行查找（有点像插件），并通常可以在运行时即时地重新加载。

API 宏主要用在较旧的代码中，以便使得较新的模块能够从旧代码的 DLL 文件中访问所需的功能。而在略新的一些代码中，就很少用 API 宏的形式，取而代之的是设置良好的接口层在 DLL 之间提供所需要的功能。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
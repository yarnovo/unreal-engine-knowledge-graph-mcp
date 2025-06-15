# 在虚幻引擎中用C++编程 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/programming-with-cplusplus-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:38:21.808Z

---

目录

![用C++编程](https://dev.epicgames.com/community/api/documentation/image/37406685-8ab4-4abb-954b-e5a864d10b60?resizing_type=fill&width=1920&height=335)

虚幻引擎为C++程序员提供了一个健壮的框架，帮助他们实现版本。

本文假定你拥有一定的C++经验。

文本介绍了一些强大的功能，你可以用它们加快你的开发流程，它们分别是：

-   在C++中创建新的[Gameplay类](/documentation/zh-cn/unreal-engine/gameplay-classes-in-unreal-engine)，在用[Visual Studio](/documentation/404)或XCode进行编译后，所有的改变都将反映在[虚幻编辑器](/documentation/zh-cn/unreal-engine/unreal-editor-interface)中。在虚幻引擎中创建类与创建标准C++类、函数和变量相似。这些都是用[标准C++语法](/documentation/zh-cn/unreal-engine/epic-cplusplus-coding-standard-for-unreal-engine)定义的。
    
-   使用[虚幻反射系统](/documentation/zh-cn/unreal-engine/reflection-system-in-unreal-engine)，用[元数据属性说明符](/documentation/zh-cn/unreal-engine/metadata-specifiers-in-unreal-engine)的宏封装你的类，它提供编辑器功能。每个类都定义了一个新的Object或Actor的模板。
    
-   [虚幻引擎中的容器](/documentation/zh-cn/unreal-engine/containers-in-unreal-engine)提供关于类和数据结构的集合信息。
    
-   使用[Gameplay Architecture](/documentation/zh-cn/unreal-engine/programming-with-cpp-in-unreal-engine) 在虚幻引擎中构建你的项目。Gameplay框架提供了一个由Object和Actor构成的结构。这些类包含模板变量和函数，你可以在创建和设计互动体验时使用。
    
-   创建[委托](/documentation/zh-cn/unreal-engine/delegates-and-lambda-functions-in-unreal-engine))能够一种通用的、类型安全的方式调用C++对象上的成员函数。你可以动态地将一个委托绑定到一个任意对象的成员函数上，并在未来的某个时间调用该对象的函数，即使调用者不知道该对象的类型。
    

## 章节目录

[

![虚幻引擎反射系统](images/static/document_list/empty_thumbnail.svg)

虚幻引擎反射系统

为开发用于虚幻引擎的Objects的程序员提供的信息。





](/documentation/zh-cn/unreal-engine/reflection-system-in-unreal-engine)[

![代码规范](images/static/document_list/empty_thumbnail.svg)

代码规范

通过遵守既定标准和最佳实践，编写可维护的代码。





](/documentation/zh-cn/unreal-engine/epic-cplusplus-coding-standard-for-unreal-engine)[

![虚幻引擎中的容器](images/static/document_list/empty_thumbnail.svg)

虚幻引擎中的容器

关于虚幻引擎中各种类和数据结构的信息。





](/documentation/zh-cn/unreal-engine/containers-in-unreal-engine)[

![游戏性架构](images/static/document_list/empty_thumbnail.svg)

游戏性架构

创建和实现游戏性类的参考。





](/documentation/zh-cn/unreal-engine/programming-with-cpp-in-unreal-engine)[

![委托](images/static/document_list/empty_thumbnail.svg)

委托

在C++对象上引用和执行成员函数的数据类型。





](/documentation/zh-cn/unreal-engine/delegates-and-lambda-functions-in-unreal-engine)

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [章节目录](/documentation/zh-cn/unreal-engine/programming-with-cplusplus-in-unreal-engine#%E7%AB%A0%E8%8A%82%E7%9B%AE%E5%BD%95)
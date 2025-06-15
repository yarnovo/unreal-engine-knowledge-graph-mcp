# Programming with CPP in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/programming-with-cpp-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:45:24.730Z

---

目录

![游戏性架构](https://dev.epicgames.com/community/api/documentation/image/67ae642b-9746-4e6a-b911-418338e18ca2?resizing_type=fill&width=1920&height=335)

使用 C++ 代码进行游戏性元素编程时，每个模块会包含许多 C++ 类。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11cc037b-f074-456a-b2da-fcc9f6ad50ae/projectmoduleclassorg.png)

每个类定义新 Actor 或对象的模板。类头文件中声明了类、类[函数](/documentation/zh-cn/unreal-engine/ufunctions-in-unreal-engine)和类[属性](/documentation/zh-cn/unreal-engine/unreal-engine-uproperties)。 类还包括[结构体](/documentation/zh-cn/unreal-engine/structs-in-unreal-engine)这种有助于进行相关属性组织和操作的数据结构。结构也可被自行定义。 通过[接口](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine)可以使不同的类应用额外的游戏性行为。

在虚幻引擎中进行编程时，可使用标准 C++ 类、函数和变量。可使用标准 C++ 语法对它们进行定义。 然而，`UCLASS()`、`UFUNCTION()` 和 `UPROPERTY()` 宏可使虚幻引擎识别新的类、函数和变量。例如，以 `UPROPERTY()` 宏作为声明序言的变量可被引擎执行垃圾回收， 也可在虚幻编辑器中显示和编辑。此外还有 `UINTERFACE()` 和 `USTRUCT()` 宏， 以及用于指定 [类](/documentation/zh-cn/unreal-engine/class-specifiers)、[函数](/documentation/404)、[属性](/documentation/404)、 接口或结构体在虚幻引擎和虚幻编辑器中行为的每个宏关键词。

除以上的宏外还有一个 UPARAM() 宏，主要用于将 C++ 代码公开到蓝图。在 [向蓝图公开游戏逻辑内容](/documentation/zh-cn/unreal-engine/exposing-gameplay-elements-to-blueprints-visual-scripting-in-unreal-engine) 文档中可查看 UPARAM() 的使用范例。

## Gameplay编程参考目录

[](/documentation/zh-cn/unreal-engine/gameplay-classes-in-unreal-engine)

[![游戏性类](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11152b94-3d5f-4f07-8219-2e38ded64363/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/gameplay-classes-in-unreal-engine)

[游戏性类](/documentation/zh-cn/unreal-engine/gameplay-classes-in-unreal-engine)

[创建和实现游戏性类的参考。](/documentation/zh-cn/unreal-engine/gameplay-classes-in-unreal-engine)

[

![UFunction](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/255a86b0-2fad-41df-9b28-06e34b3b8bd1/ufunctionherotopic.png)

UFunction

创建和实现游戏性类函数的概述。





](/documentation/zh-cn/unreal-engine/ufunctions-in-unreal-engine)[

![属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/792427b3-84f1-4c07-8d85-0c850a365db2/placeholder_topic.png)

属性

关于为Gameplay类创建和实现属性的参考。





](/documentation/zh-cn/unreal-engine/unreal-engine-uproperties)[

![结构体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44cf185b-ac1c-4b0f-849d-65bdfe409e64/structtopic.png)

结构体

创建和实现游戏性类结构体的参考。





](/documentation/zh-cn/unreal-engine/structs-in-unreal-engine)[

![虚幻接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5160f76-54dd-46a5-8284-35d2ec7233c3/placeholder_topic.png)

虚幻接口

在C++和蓝图中为虚幻引擎创建和实现接口。





](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine)

-   [gameplay](https://dev.epicgames.com/community/search?query=gameplay)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [framework](https://dev.epicgames.com/community/search?query=framework)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Gameplay编程参考目录](/documentation/zh-cn/unreal-engine/programming-with-cpp-in-unreal-engine#gameplay%E7%BC%96%E7%A8%8B%E5%8F%82%E8%80%83%E7%9B%AE%E5%BD%95)
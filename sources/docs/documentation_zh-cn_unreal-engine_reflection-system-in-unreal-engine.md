# 虚幻引擎中的反射系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/reflection-system-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:40:46.506Z

---

目录

![虚幻引擎反射系统](https://dev.epicgames.com/community/api/documentation/image/e0e12a90-41a2-4912-a338-1de8483021c0?resizing_type=fill&width=1920&height=335)

**虚幻引擎反射系统** 使用宏为提供引擎和编辑器各种功，封装你的类。在使用 **虚幻引擎（**UE**）** 时，可以使用标准的C++类、函数和变量。

-   虚幻中对象的基类是 [UObject](/documentation/zh-cn/unreal-engine/objects-in-unreal-engine)。每个类都新定义了一个用于[Actor](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine)或对象（Object）的模板。
    
-   你可以使用 `UCLASS` 宏来标记从 `Uobject` 派生的类，以便[UObject处理系统](/documentation/zh-cn/unreal-engine/unreal-object-handling-in-unreal-engine)可以注意到这些类。
    
-   [TSubclassOf](/documentation/zh-cn/unreal-engine/typed-object-pointer-properties-in-unreal-engine)是模板类，提供 `Uclass` 类型保险。 它在分配从特定类型派生出来的类时很有效。例如，你可以把这个变量公开给蓝图，设计者可以为玩家角色指定生成的武器类别。
    
-   类可以包含[结构体](/documentation/zh-cn/unreal-engine/structs-in-unreal-engine)。结构体是帮助组织和操控其相关相关属性的数据结构。结构体可以使用 `USTRUCT()` 宏来单独定义。
    
-   [虚幻智能指针库](/documentation/zh-cn/unreal-engine/smart-pointers-in-unreal-engine)为C++11智能指针的自定义实现，旨在减轻内存分配和追踪的负担。该实现包括行业标准[共享指针](/documentation/zh-cn/unreal-engine/shared-pointers-in-unreal-engine)，[弱指针](/documentation/zh-cn/unreal-engine/weak-pointers-in-unreal-engine)，**唯一指针（Unique Pointers）**，和[共享引用](/documentation/zh-cn/unreal-engine/shared-references-in-unreal-engine)，此类引用的行为与不可为空的共享指针相同。
    
-   [接口](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine) 提供可以在多个或不同的类中实现函数和额外的游戏行为。 你的玩家角色可以与世界中的各种Actor互动。 每个这些互动都能引起对一个事件的不同反应。
    
-   [Metadata说明符](/documentation/zh-cn/unreal-engine/metadata-specifiers-in-unreal-engine)控制类、接口、结构体、列举、函数，或属性与引擎和编辑器各方面的交互方式。每一种类型的数据结构或成员都有自己的元数据说明符列表。
    
-   [UFUNCTION](/documentation/zh-cn/unreal-engine/ufunctions-in-unreal-engine)，以及[UPROPERTY](/documentation/zh-cn/unreal-engine/unreal-engine-uproperties)宏使UE注意到新的类、函数和变量。这些宏由引擎进行垃圾收集。 在说明宏时, 你可以在虚幻编辑器中编辑和显示它们。
    

## 章节目录

[

![对象](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc5cd19f-fd0e-43c1-8f85-b5ba655cfe90/placeholder_topic.png)

对象

介绍引擎中的基本游戏性元素、Actor和对象。





](/documentation/zh-cn/unreal-engine/objects-in-unreal-engine)[

![属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/792427b3-84f1-4c07-8d85-0c850a365db2/placeholder_topic.png)

属性

关于为Gameplay类创建和实现属性的参考。





](/documentation/zh-cn/unreal-engine/unreal-engine-uproperties)[

![结构体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44cf185b-ac1c-4b0f-849d-65bdfe409e64/structtopic.png)

结构体

创建和实现游戏性类结构体的参考。





](/documentation/zh-cn/unreal-engine/structs-in-unreal-engine)[

![TSubclassOf](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/904bcbcb-f188-4290-96ee-fb30dba4686e/placeholder_topic.png)

TSubclassOf

使用TSubclassOf模板类提供类型安全性。





](/documentation/zh-cn/unreal-engine/typed-object-pointer-properties-in-unreal-engine)[

![虚幻接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5160f76-54dd-46a5-8284-35d2ec7233c3/placeholder_topic.png)

虚幻接口

在C++和蓝图中为虚幻引擎创建和实现接口。





](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine)[

![元数据说明符](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e86c0a2e-94b6-47c7-8e15-6e30e16ef42d/placeholder_topic.png)

元数据说明符

声明UClasses、UFunctions、UProperties、UEnums和UInterfaces时使用的元数据关键词，说明其与虚幻引擎和关卡编辑器诸多方面的互动方式。





](/documentation/zh-cn/unreal-engine/metadata-specifiers-in-unreal-engine)[

![UFunction](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/255a86b0-2fad-41df-9b28-06e34b3b8bd1/ufunctionherotopic.png)

UFunction

创建和实现游戏性类函数的概述。





](/documentation/zh-cn/unreal-engine/ufunctions-in-unreal-engine)[

![虚幻智能指针库](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c5b927f-88d2-4729-85fb-10cf37d62ebd/placeholder_topic.png)

虚幻智能指针库

共享指针的自定义实现，包括弱指针和不可为空的共享引用。





](/documentation/zh-cn/unreal-engine/smart-pointers-in-unreal-engine)

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [章节目录](/documentation/zh-cn/unreal-engine/reflection-system-in-unreal-engine#%E7%AB%A0%E8%8A%82%E7%9B%AE%E5%BD%95)
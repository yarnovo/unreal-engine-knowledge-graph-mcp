# 虚幻引擎远程控制C++ API | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/remote-control-cplusplus-api-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:35:54.497Z

---

目录

![远程控制C++ API](https://dev.epicgames.com/community/api/documentation/image/6692e589-a26a-4a32-93ae-895062380c69?resizing_type=fill&width=1920&height=335)

借助远程控制C++ API，你可以访问远程控制插件的不同部分。你可以用虚幻引擎编写自定义的集成内容以及远程控制适配器，还可以使用自定义传输来访问远程控制实体。

本文将介绍远程控制C++ API，并提供了包含更多详情的虚幻引擎C++ API参考链接。

## 工作流程

1.  你可以在虚幻引擎项目中设置服务器，以在虚幻引擎和你的C++应用程序之间发送和接收数据。例如，你可以使用[](/documentation/404)和[](/documentation/404)。
    
2.  创建外部C++应用程序，以便在虚幻引擎项目中从服务器接收数据以及向服务器发送数据。
    
3.  在虚幻引擎项目中创建解析器和管理器，以处理接收的数据和调用远程控制函数。
    

## API

远程控制C++ API的核心功能由以下类构成：

-   [](/documentation/404): 访问可以在[模块](/documentation/zh-cn/unreal-engine/module-properties-in-unreal-engine)范围内使用的功能，例如获取或解析远程控制预设。
    
-   [](/documentation/404): 包括对以下各项的访问权限：
    
    -   包含暴露函数、属性和Actor的目标。
        
    -   使用了唯一ID和标签的getter，用于被暴露的实体（例如属性、函数和Actor），以便你可以通过编辑器、游戏模式、模拟和程序包访问实体。
        
    -   属性更改侦听器。
        
    -   指定何时公开或不公开实体。
        
-   [](/documentation/404): 访问暴露的对象、属性、函数和Actor及其元数据（metadata）。
    
-   [](/documentation/404): 表示暴露给远程控制的属性，同时包含对 `FProperty` 和 `RemoteControlPropertyHandle` 的访问权限，以获取和设置暴露属性的数值。
    
-   [](/documentation/404): 访问 `UFunction` 指针和函数参数，以便使用 `UObject->ProcessEvent(UFunction*, ArgumentsMemory)` 来调用特定对象上的函数。
    
-   [](/documentation/404): 访问被暴露的Actor的指针。
    
-   [](/documentation/404): 访问getter和setter，以修改被暴露的属性的数值，并访问复杂类型的子属性。
    

如果是简单的属性类型，可以直接获取和设置数值。简单的属性类型包括整型、浮点数、双精度浮点数、字符串、向量和旋转度。

如果是复杂类型，例如TArray、TMap、TSet和结构体，你不能直接获取和设置属性值，而是必须访问子属性句柄（child property handle）；如果子属性是简单的属性类型，你就可以获取和设置其数值。

-   [DisplayClusterRemoteControlInterceptor](/documentation/404): 使用此项来设置所有可通过nDisplay复制的属性值。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [工作流程](/documentation/zh-cn/unreal-engine/remote-control-cplusplus-api-for-unreal-engine#%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
-   [API](/documentation/zh-cn/unreal-engine/remote-control-cplusplus-api-for-unreal-engine#api)
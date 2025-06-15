# 虚幻引擎Gauntlet自动化框架概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:41:11.511Z

---

目录

![Gauntlet自动化框架概述](https://dev.epicgames.com/community/api/documentation/image/0b142a07-0e7f-40e1-a713-d38906d03b54?resizing_type=fill&width=1920&height=335)

**Gauntlet** 是在 **虚幻引擎** 中运行项目会话，以执行测试并验证结果的框架。它是专门为在各种平台上运行虚幻会话而设计的，但不仅限于此。虚幻 **会话** 是虚幻引擎中执行游戏所需的所有进程。例如，多人游戏可能需要四个客户端和一个服务器。

Gauntlet不需要任何特定的游戏端自动化代码或测试框架——您的游戏如何执行测试完全取决于您自己。不过，Gauntlet插件提供了一个有用的 `TestController` 类来帮助操纵和监控游戏实例。它非常适合需要执行多个步骤的冒烟测试，但它完全是可选的。

**Gauntlet提供以下功能**

-   实现与平台无关的编译、设备和测试，它们作为底层单元，提供配置和组合所需的功能操作。
    
-   为游戏提供可以启动复杂配置（例如5v5客户端和服务器）的高级类。
    
-   提供效用函数来解析来自设备的日志文件、崩溃以及访问/保存的数据。
    

**Gauntlet具有以下特点**

-   无需特定的虚幻端代码。其目的是，在虚幻中，操作执行使用任何最合理的内容。可以是各种内容，例如虚幻自动化框架，或者仅仅是游戏解释的一些命令行参数。
    
-   不会创建编译。您需要为Gauntlet提供网络或本地转化的编译。
    

## 架构

Gauntlet提供了三级功能。较早的层级可以（而且确实是）被单独用于编写设备交互、非虚幻单元测试等的脚本，而较晚的层级抽象化用户可配置的简单选项背后的大量复杂性。

### 第1级

-   接口（设备、编译、应用程序），它们抽象化设备、编译、安装和进程的概念。
    -   ITargetDevice
        
    -   IBuildSource
        
    -   IBuild
        
    -   IAppInstall
        
    -   IAppInstance
        
-   框架，支持连续、并行和基于依赖性执行用户创建的测试。
    -   TestExecutor
        
    -   ITestNode
        

### 第2级

-   设备和应用实例实现，它们适用于虚幻支持的所有平台（PC、Mac、PS4、Xbox One、Switch、iOS、Android）。
    -   TargetDeviceWindows
        
    -   TargetDeviceMac
        
    -   TargetDevicePS4
        
    -   TargetDeviceXboxOne
        
    -   TargetDeviceSwitch
        
    -   TargetDeviceIOS
        
    -   TargetDeviceAndroid
        
-   多个类，它们支持在虚幻会话中配置和启动一个或多个存在的"角色"（例如，四个客户端，一个服务器）
    -   UnrealAppConfig
        
    -   UnrealSessionRole
        
    -   UnrealSession
        
    -   UnrealSessionInstance
        

### 第3级

-   多个类，它们在虚幻会话上下文中实现ITestNode和IBuildSource
    -   UnrealBuildSource
        
    -   UnrealTestConfiguration
        
    -   UnrealTestContext
        
    -   UnrealTestNode
        
-   RunUnreal - 一个继承自UAT的BuildCommand类，它在构建测试列表并执行这些列表之前配置一些参数。

### Gauntlet核心接口

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75905620-5376-4aa5-9471-e089ad08f7d7/gauntlet_overview_interfaces.png)

### 核心类

#### TestExecutor

TestExecutor类处理一组测试的创建、排队和监控。如果TestNode支持并行执行多个测试，则可以并行执行多个测试。需要注意的一个示例是虚幻服务器的端口使用。对于第一个测试，可以使用默认端口，但当并行执行多个测试时，服务器和客户端都必须使用唯一的端口。

#### ITestNode

ITestNode是一个接口类，它描述了所有测试节点必须实现的API。

#### 虚幻测试节点

虚幻测试节点主要通过配置一个UnrealSession对象并调用它的相关函数来实现ITestNode。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [automation](https://dev.epicgames.com/community/search?query=automation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [架构](/documentation/zh-cn/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine#%E6%9E%B6%E6%9E%84)
-   [第1级](/documentation/zh-cn/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine#%E7%AC%AC1%E7%BA%A7)
-   [第2级](/documentation/zh-cn/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine#%E7%AC%AC2%E7%BA%A7)
-   [第3级](/documentation/zh-cn/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine#%E7%AC%AC3%E7%BA%A7)
-   [Gauntlet核心接口](/documentation/zh-cn/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine#gauntlet%E6%A0%B8%E5%BF%83%E6%8E%A5%E5%8F%A3)
-   [核心类](/documentation/zh-cn/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine#%E6%A0%B8%E5%BF%83%E7%B1%BB)
-   [TestExecutor](/documentation/zh-cn/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine#testexecutor)
-   [ITestNode](/documentation/zh-cn/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine#itestnode)
-   [虚幻测试节点](/documentation/zh-cn/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine#%E8%99%9A%E5%B9%BB%E6%B5%8B%E8%AF%95%E8%8A%82%E7%82%B9)
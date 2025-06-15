# 虚幻引擎中的Iris简介 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:57:23.037Z

---

目录

![Iris简介](https://dev.epicgames.com/community/api/documentation/image/c7318d3a-cc8e-4a63-9eca-7d5a810f672e?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

**Iris** 是一种用于可以自愿采用的复制系统，可与虚幻引擎现有的复制系统一起使用。该系统基于Epic的 **Fortnite Battle Royale** 经验而构建，支持每个服务器实例最多100个玩家。Iris可提供强大的多玩家体验，给游戏带来以下好处：

-   规模更大、互动性更好的世界。
-   更多的玩家人数。
-   更低的服务器开销。

当前的游戏代码仅需极低程度的改动就能适用。选择加入Iris需要游戏代码使用新的引擎API。但是，C++和蓝图中的现有 **复制属性** 和 **远程程序调用（RPC）** 定义在稍作修改后可兼容。本文档为你提供了：

-   [Iris复制系统的概述](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [Iris的设计，包括多项重要概念。](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E8%AE%BE%E8%AE%A1)
-   [Iris操作的流程。](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#iris%E6%93%8D%E4%BD%9C%E7%9A%84%E6%B5%81%E7%A8%8B)
-   [如何开始在你的项目中使用Iris。](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%9C%A8%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%BD%BF%E7%94%A8iris)

## 概述

联网游戏使用 **复制系统（Replication System）** 在多台计算机之间传达游戏状态的变化。虚幻引擎在传统上使用服务器-客户端模型，其中包含：

1.  托管游戏的 **服务器** 。服务器的游戏版本被视为 **权威** ，意味着其游戏实例是真正的游戏实例。
2.  玩家控制的连接到游戏的 **客户端** 。

复制系统将控制客户端上的游戏状态更改如何传达给服务器，以及服务器上积累的更改如何传达回客户端。Iris预期客户端会执行大部分工作，在做出更改时通知复制系统。这样Iris可以对现有复制系统进行多项性能优化。

#### 性能优化

Iris通过以下方式实现复制性能优化：

-   去除了反面模式的约束，提高了可扩展性。
-   通过分离复制和游戏线程数据，启用了并发。
-   为多个对象和连接共享工作负载，提高了效率。

## 设计

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7826871-e238-418e-af76-8a24e47e492e/iris-design.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7826871-e238-418e-af76-8a24e47e492e/iris-design.png)

点击查看大图。此图中的重要术语在以下两个分段中定义：Iris的主要组件和重要概念。

**Iris复制系统（Iris Replication System）** 是 **虚幻引擎（Unreal Engine (UE)）** 中用于Iris的主要接口。Iris的核心目标是尽量减少Gameplay系统与复制系统之间的依赖性。为此，Iris会以量化格式保留所有复制的状态数据的完整副本。这样会尽量减少昂贵操作的数量，并可以在各个连接之间共享工作，轻松地并行完成更多工作。

### Iris的主要组件

#### 复制系统

复制系统是Iris的内部系统的接口层，仅公开必要的API功能。复制系统执行以下功能：

-   维护游戏的所有联网状态数据的副本。
-   按连接跟踪复制的Actor的状态。
-   筛选哪些Actor复制到哪些连接。
-   排定复制的优先顺序。
-   序列化数据以进行传输。

##### 复制系统组件

复制系统的主要组件在下表中进行说明：

**组件**

**说明**

复制状态

包含需要复制的数据的结构体。复制系统将维护游戏的所有联网状态数据的副本。

优先级安排

排定复制Actor和对象的优先顺序。

筛选

筛选允许哪些Actor复制到哪些连接。

网络序列化器

序列化数据以通过网络连接进行传输。

数据流

通过网络连接实现数据复制的接口。

#### 复制网桥

**复制网桥（Replication Bridge）** 控制Gameplay代码和复制系统之间的通信。复制网桥：

-   开始和结束Actor或对象的复制。
-   构建复制的数据的描述符和协议。
-   在复制系统中添加和删除Actor或对象。

### 重要概念

#### 网络对象

复制的Actor和对象在Iris内部表示为网络对象。**网络对象（Net Object）** 包含：

-   [复制协议](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%A4%8D%E5%88%B6%E5%8D%8F%E8%AE%AE)。
-   [复制实例协议](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%A4%8D%E5%88%B6%E5%AE%9E%E4%BE%8B%E5%8D%8F%E8%AE%AE)。
-   用于存储量化数据的缓冲区。

#### 复制状态

**复制状态（Replication State）** 在复制系统和Gameplay代码之间传达状态数据。复制状态的最基本形式是包含要复制的数据的结构体。复制状态可以显式构造，也可以是从基于现有属性的反射数据构建的抽象表示。

#### 复制状态描述符

**复制状态描述符（Replication State Descriptor）** 描述了复制状态中复制数据所需的所有方面。其中包括：

-   内存布局
-   条件
-   筛选
-   优先级安排
-   序列化

每种复制状态类型都有复制状态描述符。相同类型的复制状态使用相同的复制状态描述符。

#### 复制协议

**复制协议（Replication Protocol）** 描述了复制的对象中内部复制系统操作所需的所有方面。这包括构成复制对象总状态的所有复制状态描述符的列表。复制协议按对象类型使用，并在相同类型的所有实例之间共享。

#### 复制片段

**复制片段（Replication Fragment）** 是负责在Gameplay代码和复制系统之间来回传递复制状态的Iris组件。

#### 复制实例协议

**复制实例协议（Replication Instance Protocol）** 包含与操作的Gameplay代码交互所需的数据，这些操作包括从源对象获取数据，将收到的状态数据推送到接收端的目标对象，等等。复制实例协议表示为复制片段的列表。复制实例协议特定于实例。

#### 网络句柄

所有API函数都在网络句柄上操作。**网络句柄（Net Handle）** 是用于将复制的Actor或对象与复制系统使用的内部网络对象表示关联的唯一标识符。网络句柄由复制系统生成，并在Actor上调用 `BeginReplication` 时返回。

## Iris操作的流程

此分段描述了Iris的操作流程，开始于注册要复制的对象，结束于应用接收端新收到的状态数据。

### 注册

向Iris注册要复制的对象同时需要来自游戏代码和Iris的操作。

#### 游戏代码

-   向复制系统注册对象。
-   通过标头属性显式或隐式声明复制状态和复制状态描述符。

#### Iris

-   使用对象及其组件定义的所有复制状态，构造复制协议和复制实例协议。
-   使用之前构造的复制协议和复制实例协议，创建对应于新注册的对象的网络对象。
-   为复制的对象分配唯一的网络句柄，以便Iris的API函数可以与此复制的对象交互。

### 发送者

发送端包含两个阶段：

1.  [发送前更新](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%8F%91%E9%80%81%E5%89%8D%E6%9B%B4%E6%96%B0)
2.  [发送更新](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%8F%91%E9%80%81%E6%9B%B4%E6%96%B0)

#### 发送前更新

发送前更新包含Iris为准备将数据发送到接收端而执行的多个步骤。在发送前更新中，Iris：

-   轮询所有复制的对象以了解状态更改（如果在旧版模式下运行）。
-   使用相应的网络序列化器量化所有脏状态数据。
-   更新所有网络对象的筛选状态和优先级安排。

#### 发送更新

发送更新包括通过更新所有Iris数据流来创建和填充数据包。

##### 网络令牌数据流

网络令牌数据流使用相应的网络序列化器序列化所有新令牌。

##### 复制数据流

对于从复制数据流读取的数据，Iris：

-   将带有脏状态的对象安排为基于对象和安排优先级发送。
-   基于优先级和依赖性为对象排序。
-   使用相应的网络序列化器序列化所有新数据。

在此阶段，Iris会将数据发送到相应的连接。

### 接收者

接收者开始接收数据包之后，接收者会向发送者通知所有收到的数据包。对于每个收到的数据包，相应的数据流会处理数据包中包含的数据：

#### 网络令牌数据流

网络令牌数据流会在服务器与客户端之间同步对象路径，以便可以使用更小的表示来复制它们。

#### 复制数据流

对于从复制数据流读取的数据，Iris：

-   反序列化并读取收到的状态数据。
-   立即实例化新对象，因为它们是构建复制协议所需的。
-   将数据推送到游戏，以便新状态可以应用于相应的复制对象并反映在Gameplay中。

## 在你的项目中使用Iris

虚幻引擎默认使用Iris编译，但现有复制系统仍用作默认复制系统。要在你的项目中启用Iris，请确保启用了Iris插件，方法是将下面的代码块添加到你的 `.uproject` 文件的 `Plugins` 分段：

```cpp
{
	"Name": "Iris",
	"Enabled": true
},
```

调用 `SetupIrisSupport` 以快速轻松地将Iris的必需依赖性添加到你的模块的 `.Build.cs` 文件中。将以下代码添加到你的模块的 `.Build.cs` 文件，以在你的模块中包含Iris：

```cpp
SetupIrisSupport(Target);
```

### 在运行时启用或禁用Iris

在运行时可以使用命令行参数启用或禁用Iris：

-   `-UseIrisReplication=1` ：启用Iris
-   `-UseIrisReplication=0` ：禁用Iris

在其 `IrisNetDriverConfigs` 条目中启用了Iris的网络驱动程序将使用Iris进行复制。

### 禁止使用Iris编译虚幻引擎

如果你想完全禁止使用Iris编译虚幻引擎，请在你的 `.Build.cs` 文件中设置 `bUseIris = false` 。

-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [networking](https://dev.epicgames.com/community/search?query=networking)
-   [replication](https://dev.epicgames.com/community/search?query=replication)
-   [iris](https://dev.epicgames.com/community/search?query=iris)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [性能优化](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)
-   [设计](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E8%AE%BE%E8%AE%A1)
-   [Iris的主要组件](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#iris%E7%9A%84%E4%B8%BB%E8%A6%81%E7%BB%84%E4%BB%B6)
-   [复制系统](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%A4%8D%E5%88%B6%E7%B3%BB%E7%BB%9F)
-   [复制系统组件](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%A4%8D%E5%88%B6%E7%B3%BB%E7%BB%9F%E7%BB%84%E4%BB%B6)
-   [复制网桥](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%A4%8D%E5%88%B6%E7%BD%91%E6%A1%A5)
-   [重要概念](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E9%87%8D%E8%A6%81%E6%A6%82%E5%BF%B5)
-   [网络对象](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E7%BD%91%E7%BB%9C%E5%AF%B9%E8%B1%A1)
-   [复制状态](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%A4%8D%E5%88%B6%E7%8A%B6%E6%80%81)
-   [复制状态描述符](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%A4%8D%E5%88%B6%E7%8A%B6%E6%80%81%E6%8F%8F%E8%BF%B0%E7%AC%A6)
-   [复制协议](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%A4%8D%E5%88%B6%E5%8D%8F%E8%AE%AE)
-   [复制片段](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%A4%8D%E5%88%B6%E7%89%87%E6%AE%B5)
-   [复制实例协议](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%A4%8D%E5%88%B6%E5%AE%9E%E4%BE%8B%E5%8D%8F%E8%AE%AE)
-   [网络句柄](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E7%BD%91%E7%BB%9C%E5%8F%A5%E6%9F%84)
-   [Iris操作的流程](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#iris%E6%93%8D%E4%BD%9C%E7%9A%84%E6%B5%81%E7%A8%8B)
-   [注册](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E6%B3%A8%E5%86%8C)
-   [游戏代码](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E6%B8%B8%E6%88%8F%E4%BB%A3%E7%A0%81)
-   [Iris](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#iris)
-   [发送者](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%8F%91%E9%80%81%E8%80%85)
-   [发送前更新](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%8F%91%E9%80%81%E5%89%8D%E6%9B%B4%E6%96%B0)
-   [发送更新](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%8F%91%E9%80%81%E6%9B%B4%E6%96%B0)
-   [网络令牌数据流](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E7%BD%91%E7%BB%9C%E4%BB%A4%E7%89%8C%E6%95%B0%E6%8D%AE%E6%B5%81)
-   [复制数据流](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%A4%8D%E5%88%B6%E6%95%B0%E6%8D%AE%E6%B5%81)
-   [接收者](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E6%8E%A5%E6%94%B6%E8%80%85)
-   [网络令牌数据流](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E7%BD%91%E7%BB%9C%E4%BB%A4%E7%89%8C%E6%95%B0%E6%8D%AE%E6%B5%81-2)
-   [复制数据流](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%A4%8D%E5%88%B6%E6%95%B0%E6%8D%AE%E6%B5%81-2)
-   [在你的项目中使用Iris](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%9C%A8%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%BD%BF%E7%94%A8iris)
-   [在运行时启用或禁用Iris](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E5%9C%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E5%90%AF%E7%94%A8%E6%88%96%E7%A6%81%E7%94%A8iris)
-   [禁止使用Iris编译虚幻引擎](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine#%E7%A6%81%E6%AD%A2%E4%BD%BF%E7%94%A8iris%E7%BC%96%E8%AF%91%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E)
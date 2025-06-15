# 虚幻引擎中的远程程序调用 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:56:59.767Z

---

目录

![远程程序调用](https://dev.epicgames.com/community/api/documentation/image/7b6905e5-fa9b-4d78-ac9d-33e739fcd6c6?resizing_type=fill&width=1920&height=335)

**远程程序调用(RPC)** 是在一台或多台连接的机器上远程执行本地调用的函数。RPC可帮助客户端和服务器通过网络连接相互调用函数。RPC是单向函数调用，因此无法指定返回值。RPC的主要用例是执行不可靠的Gameplay事件，具有瞬时或装饰性质。可能包括以下事件：

-   播放声音
-   生成粒子
-   执行动画

RPC是一种重要机制，它补充了使用 `Replicated` 或 `ReplicatedUsing` 说明符的复制属性。要调用RPC，必须从Actor或Actor组件调用RPC，并设置要复制的Actor或相关Actor组件。

要先了解所有权对RPC的影响，这一点很重要，因为Actor所有权决定了RPC远程执行的位置。如需详细了解Actor所有权，请参阅[Actor所有者和所属连接](/documentation/zh-cn/unreal-engine/actor-owner-and-owning-connection-in-unreal-engine)文档。

## RPC类型

如下表所示，RPC有四种不同的类型：

**元数据说明符**

**说明**

`Client`

在此Actor的所属客户端连接上执行RPC。

`Server`

在服务器上执行RPC。

必须从拥有此Actor的客户端调用。

`Remote`

在连接的远程端执行RPC。

连接的远程端可以是服务器也可以是客户端，但必须在客户端拥有的Actor上调用RPC。该RPC的行为既像 `Client` 又像 `Server` RPC，但绝不会在连接的本地端执行，仅在远程端执行。

`NetMulticast`

在服务器上以及与Actor相关的所有当前连接的客户端上执行RPC。

`NetMulticast` RPC设计用于从服务器调用，但也可从客户端调用。从客户端调用的 `NetMulticast` RPC仅在本地执行。

## RPC结构

所有RPC均由两个部分组成：

-   头文件中定义的基函数。
    
    DerivedActor.h
    
    ```cpp
          UFUNCTION(Client)
          void ClientRPC();
    ```
    
-   源文件中包含基函数实现的实现函数。
    
    DerivedActor.cpp
    
    ```cpp
          #include "DerivedActor.h"
    
          void ClientRPC_Implementation()
          {	
    			
          }
    ```
    

虚幻引擎的反射系统和复制系统可管理较低层次的细节，但需要你定义和实现这些部分。以下各节将说明如何声明和实现RPC。

## 创建RPC

要为Actor创建RPC，请执行以下步骤：

1.  从[RPC类型](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#rpc%E7%B1%BB%E5%9E%8B)分段选择一个函数元数据说明符：
    
    DerivedActor.h
    
    ```cpp
         #pragma once
    
         #include "DerivedActor.generated.h"
    
         UCLASS()
         class ADerivedActor : public AActor
         {
             GENERATED_BODY()
    
         public:
    
             // 客户端RPC函数
             UFUNCTION(Client)
             void ClientRPC();
    
             // 服务器RPC函数
             UFUNCTION(Server)
             void ServerRPC();
    
             // 组播RPC函数
             UFUNCTION(NetMulticast)
             void MulticastRPC();
         }
    ```
    
    在RPC函数的名称前加上RPC类型，这是一种惯例：
    
    -   客户端RPC函数加上 `Client`。
    -   服务器RPC函数加上 `Server`。
    -   网络组播RPC函数加上 `Multicast`。
    
    在多人会话期间，这有助于一眼就确定该函数调用针对哪些机器。
    
2.  确保 `AActor` 派生的类被设置为在派生的Actor的构造函数内复制：
    
    DerivedActor.cpp
    
    ```cpp
         ADerivedActor::ADerivedActor(const class FPostConstructInitializeProperties & PCIP) : Super(PCIP)
         {
             bReplicates = true;
         }
    ```
    
3.  实现RPC的 `_Implementation` 函数：
    
    DerivedActor.cpp
    
    ```cpp
         #include "DerivedActor.h"
    
         void ADerivedActor::ClientRPC_Implementation()
         {
             // 将在每台执行该函数的机器上打印该日志。
             UE_LOG(LogTemp, Log, TEXT("ClientRPC executed."))
         }
    
         void ADerivedActor::ServerRPC_Implementation()
         {	
             // 仅在ServerRPC_Validate返回true时才执行该函数。
             // 将在每台执行该函数的机器上打印该日志。
             UE_LOG(LogTemp, Log, TEXT("ServerRPC executed."))
         }
    
         void ADerivedActor::MulticastRPC_Implementation()
         {
             // 将在每台执行该函数的机器上打印该日志。
             UE_LOG(LogTemp, Log, TEXT("MulticastRPC executed."))	
         }
    ```
    

## 执行RPC

要执行RPC，调用RPC函数的标准版本：

```cpp
	// 从客户端调用以在服务器上运行
	ADerivedClientActor* MyDerivedClientActor;
	MyDerivedClientActor->ServerRPC();

	// 从服务器调用以在客户端上运行
	ADerivedServerActor* MyDerivedServerActor;
	MyDerivedServerActor->ClientRPC();

	// 从服务器调用以在服务器和所有相关客户端上运行
	ADerviedServerActor* MyDerivedServerActor;
	MyDerievedServerActor->MulticastRPC();
```

## 单播与组播

`Client` 、 `Server` 和 `Remote` RPC为单播RPC。之所以叫 *单播（Unicast）* RPC，是因为它们在单台机器上执行。`NetMulticast` 是 *组播* RPC，因为它在多台机器上执行。

## RPC执行矩阵

下表介绍了在哪台机器上执行RPC（这取决于RPC类型）、从哪台机器调用它，以及调用RPC的Actor的所属连接。请阅读下表各列：

在 \[*执行机器*\] 上执行从 \[*调用机器*\] 调用的 \[*RPC类型*\]，调用机器相关Actor的所属连接为 \[*所属连接*\]。

例如，服务器RPC表的第一行为：

-   在 *服务器* 上执行从 *服务器* 调用的 *服务器RPC*，服务器相关Actor的所属连接为 *客户端* 。

客户端RPC表的最后一行为：

-   在 *调用客户端* 上执行从 *客户端* 调用的 *客户端RPC*，客户端相关Actor的所属连接为 *无* 。

### 服务器RPC

**调用机器**

**所属连接**

**执行机器**

服务器

客户端

服务器

服务器

服务器

服务器

服务器

无

服务器

客户端

调用客户端

服务器

客户端

不同客户端

已丢弃

客户端

服务器

已丢弃

客户端

无

已丢弃

### 客户端RPC

**调用机器**

**所属连接**

**执行机器**

服务器

所属客户端

所属客户端

服务器

服务器

服务器

服务器

无

服务器

客户端

调用客户端

调用客户端

客户端

不同客户端

调用客户端

客户端

服务器

调用客户端

客户端

无

调用客户端

### 远程RPC

**调用机器**

**所属连接**

**执行机器**

服务器

所属客户端

所属客户端

服务器

服务器

已丢弃

服务器

无

已丢弃

客户端

调用客户端

服务器

客户端

不同客户端

已丢弃

客户端

服务器

已丢弃

客户端

无

已丢弃

### 网络组播RPC

**调用机器**

**所属连接**

**执行机器**

服务器

客户端

服务器和所有与调用Actor相关的客户端

服务器

服务器

服务器和所有与调用Actor相关的客户端

服务器

无

服务器和所有与调用Actor相关的客户端

客户端

调用客户端

调用客户端

客户端

不同客户端

调用客户端

客户端

服务器

调用客户端

客户端

无

调用客户端

## 可靠性

虚幻引擎中的RPC被标记为可靠或不可靠：

**元数据说明符**

**说明**

**执行顺序**

`Reliable`

将重新发送该RPC，直到它被接收方确认。在确认该RPC之前，将暂停所有后续RPC执行。

保证有序。

`Reliable`

如果数据包被丢弃，则不执行该RPC。

不保证有序。

RPC默认不可靠。可靠RPC需要额外带宽，因此要谨慎使用。

如需详细了解虚幻引擎中复制的执行顺序保证，请参阅[复制的对象执行顺序](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine)文档。

### 指定RPC可靠性

要指定RPC的可靠性，需为RPC添加相应的元数据说明符：

DerivedActor.h

```cpp
	#pragma once

	#include "DerivedActor.generated.h"

	UCLASS()
	class ADerivedActor : public AActor
	{
		GENERATED_BODY()

	public:	

		// 客户端默认不可靠RPC函数
		UFUNCTION(Client)
		void ClientDefaultUnreliableRPC();

		// 客户端不可靠RPC函数
		UFUNCTION(Client, Unreliable)
		void ClientUnreliableRPC();

		// 客户端可靠RPC函数
		UFUNCTION(Client, Reliable)
		void ClientReliableRPC();
	}
```

## 发送策略

你可以为RPC指定影响RPC排序的显式发送策略。指定 `ERemoteFunctionSendPolicy` 即可实现这一点：

**值**

**说明**

`Default`

RPC立即在[束](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#%E6%9D%9F)中序列化，同时束在帧结束时的下一次网络更新中被发送。

`ForceSend`

如果在 `NetDriver::PostTickDispatch` 中触发RPC，RPC立即在束中序列化，并通过网络发送。如果RPC在tick的其余期间触发，将根据 `Default` 行为发送RPC。这是一种特殊的RPC优化，适用于以下情况：

-   仅受到复制图表和Iris的支持
-   可用于在 `NetWorldTickTime` 中调用的RPC，其中处理传入的数据包并执行从远程连接发送的RPC。

这种优化会在帧的开始而不是结束时发送数据，从而减少重要Gameplay事件的延迟。这样可以减少延迟，但代价是需要使用更多的CPU和额外带宽。

`ForceQueue`

如果有带宽剩余，RPC在网络更新结束时在束中被序列化。

要在项目中为RPC指定发送策略，请参阅[`UNetDriver::ProcessRemoteFunctionForChannel`](/documentation/en-us/unreal-engine/API/Runtime/Engine/Engine/UNetDriver/ProcessRemoteFunctionForChannel)。如需详细了解远程机器上RPC执行顺序的保证，请参阅[复制的对象执行顺序](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine)文档。

(#束) 在虚幻引擎网络中，网络数据包由多个束组成。*束* 是特定复制对象（比如Actor）的属性更改和RPC的集合。

## 服务器RPC验证

服务器RPC验证会实现 *信任和验证* 网络策略。服务器将信任客户端与其通信的信息，但会始终验证该信息是否遵循服务器上游戏所定义的规则和约束。

你可以使用 `WithValidation` `UFUNCTION` 元数据标记服务器RPC，并定义相应的服务器RPC验证函数。验证函数的名称与RPC函数相同，但在函数名称的结尾附加了 `_Validate` 。返回类型是一个布尔值，它使用与其关联的RPC函数相同的参数。验证函数将帮助服务器根据所定义的验证逻辑来确定是否应运行RPC。当客户端进行调用以执行服务器RPC时，首先会在服务器上调用验证函数。

根据验证函数的输出，会出现以下情况：

-   如果输入通过了验证，则调用实现。
-   如果输入没有通过验证，则调用客户端将断开与服务器的连接。

### 添加验证实现

要为RPC添加验证函数，请执行以下步骤：

1.  执行步骤来[声明服务器RPC](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#%E5%A3%B0%E6%98%8Erpc)，并添加 `WithValidation` 元数据说明符：
    
    DerivedActor.h
    
    ```cpp
         #pragma once
    
         #include "DerivedActor.generated.h"
    
         UCLASS()
         class ADerivedActor : public AActor
         {
             GENERATED_BODY()
    
         public:
    
             UPROPERTY(Replicated)
             int32 Health;
             int32 MAXHEALTH = 100;
    
             // 服务器不可靠RPC函数
             UFUNCTION(Server, Unreliable, WithValidation)
             void ServerUnreliableRPC(int32 RecoverHealth); 
         }
    ```
    
2.  实现验证函数：
    
    DerivedActor.h
    
    ```cpp
         #include "DerivedActor.h"
    
         // RPC验证实现
         bool ServerUnreliableRPC_Validate(int32 RecoverHealth)
         {
             if (Health + RecoverHealth > MAXHEALTH)
             {
                 return false;
             }
         return true;
         }
    
         // RPC实现
         void ServerUnreliableRPC_Implementation(int32 RecoverHealth)
         {
             Health += RecoverHealth;
         }
    ```
    

如果服务器RPC未通过验证，则调用客户端会断开连接。

## 蓝图中的RPC

C++中的RPC存在RPC类型、可靠性选项和执行逻辑，蓝图中的RPC也同样存在这些内容。

### 创建蓝图RPC

你还可以使用复制的蓝图事件在蓝图中创建RPC。要创建复制的蓝图事件，请执行以下步骤：

1.  创建一个蓝图Actor或Actor派生的类。
    
2.  确保在蓝图的 **细节面板（Details Panel）** 中将蓝图设为 **复制（Replicate）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2fd7382-ec67-4b5e-8ae5-038e97d4d380/set-replicate.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2fd7382-ec67-4b5e-8ae5-038e97d4d380/set-replicate.png)
    
    点击查看大图。
    
3.  打开蓝图的 **事件图表（Event Graph）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51b42ab9-98e3-4111-902a-2891b5ffd62b/event-graph.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51b42ab9-98e3-4111-902a-2891b5ffd62b/event-graph.png)
    
    点击查看大图。
    
4.  右键点击并选择 **添加事件（Add Event）> 添加自定义事件…（Add Custom Event…）**
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6dfca15d-edee-4ba7-bbf9-e0517c232d4c/add-custom-event.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6dfca15d-edee-4ba7-bbf9-e0517c232d4c/add-custom-event.png)
    
    点击查看大图。
    
5.  点击 **CustomEvent** 节点以弹出 **细节面板（Details Panel）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a89dc287-a6ff-47e1-9e32-c6576737fed9/details-panel.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a89dc287-a6ff-47e1-9e32-c6576737fed9/details-panel.png)
    
    点击查看大图。
    
6.  你可以在 **细节面板（Details Panel）> 图表（Graph）> 复制（Replicates）** 下选择事件是否复制、事件使用哪种类型的复制、事件是可靠还是不可靠。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0620bf16-ea13-447f-8a00-ad97841b70a6/set-rpc-replicate.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0620bf16-ea13-447f-8a00-ad97841b70a6/set-rpc-replicate.png)
    
    点击查看大图。
    
7.  一旦选择了所需设置，就可以在蓝图的事件图表中定义RPC功能。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b3e93a3-81a8-4f6c-b1b5-fb9a9d38d979/implement-rpc.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b3e93a3-81a8-4f6c-b1b5-fb9a9d38d979/implement-rpc.png)
    
    点击查看大图。
    

### 执行蓝图RPC

你可以像执行其他蓝图事件一样执行蓝图RPC，但C++中定义的RPC的规则同样适用。只能从具有有效所有者和所属连接的复制Actor或Actor组件执行RPC。

当前不向蓝图公开 `Remote` RPC。

-   [gameplay](https://dev.epicgames.com/community/search?query=gameplay)
-   [actors](https://dev.epicgames.com/community/search?query=actors)
-   [network](https://dev.epicgames.com/community/search?query=network)
-   [rpc](https://dev.epicgames.com/community/search?query=rpc)
-   [actor replication](https://dev.epicgames.com/community/search?query=actor%20replication)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [RPC类型](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#rpc%E7%B1%BB%E5%9E%8B)
-   [RPC结构](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#rpc%E7%BB%93%E6%9E%84)
-   [创建RPC](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#%E5%88%9B%E5%BB%BArpc)
-   [执行RPC](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#%E6%89%A7%E8%A1%8Crpc)
-   [单播与组播](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#%E5%8D%95%E6%92%AD%E4%B8%8E%E7%BB%84%E6%92%AD)
-   [RPC执行矩阵](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#rpc%E6%89%A7%E8%A1%8C%E7%9F%A9%E9%98%B5)
-   [服务器RPC](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#%E6%9C%8D%E5%8A%A1%E5%99%A8rpc)
-   [客户端RPC](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#%E5%AE%A2%E6%88%B7%E7%AB%AFrpc)
-   [远程RPC](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#%E8%BF%9C%E7%A8%8Brpc)
-   [网络组播RPC](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#%E7%BD%91%E7%BB%9C%E7%BB%84%E6%92%ADrpc)
-   [可靠性](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#%E5%8F%AF%E9%9D%A0%E6%80%A7)
-   [指定RPC可靠性](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#%E6%8C%87%E5%AE%9Arpc%E5%8F%AF%E9%9D%A0%E6%80%A7)
-   [发送策略](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#%E5%8F%91%E9%80%81%E7%AD%96%E7%95%A5)
-   [服务器RPC验证](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#%E6%9C%8D%E5%8A%A1%E5%99%A8rpc%E9%AA%8C%E8%AF%81)
-   [添加验证实现](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E9%AA%8C%E8%AF%81%E5%AE%9E%E7%8E%B0)
-   [蓝图中的RPC](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#%E8%93%9D%E5%9B%BE%E4%B8%AD%E7%9A%84rpc)
-   [创建蓝图RPC](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%93%9D%E5%9B%BErpc)
-   [执行蓝图RPC](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine#%E6%89%A7%E8%A1%8C%E8%93%9D%E5%9B%BErpc)

相关文档

[

基础组件

![基础组件](https://dev.epicgames.com/community/api/documentation/image/4266964e-20f0-4d0d-b4fc-42fe581a86df?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/basic-components-in-unreal-engine)
# 虚幻引擎中复制对象的执行顺序 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:56:57.717Z

---

目录

![复制对象的执行顺序](https://dev.epicgames.com/community/api/documentation/image/18bb01ea-4298-4ddf-ac48-16d9729be92d?resizing_type=fill&width=1920&height=335)

虚幻引擎（UE）的网络复制采用了可靠和不可靠的通信方法在服务器和所连接客户端之间传输信息。*可靠* 通信会持续发送，停止所有其他网络通信，直到接收端机器确认。*不可靠* 通信在发送后不会在当前网络tick期间重新发送，即使接收端机器不确认收到信息。

涉及Actor属性和远程过程调用（RPC）的复制时，必须理解如何保证这种通信的相对顺序，以及如何在游戏代码中处理这一点。本页面将介绍虚幻引擎复制系统会做出的保证以及不会做出的保证，这两者同样重要。

## Actor属性

Actor属性的更新方式为不可靠通信，且为一次性发送。你可以把Actor属性更新看作是在所有其他RPC之后但在排队RPC之前发送的单个不可靠RPC。如需详细了解排队RPC，请参阅本页的[强制队列](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine#%E5%BC%BA%E5%88%B6%E9%98%9F%E5%88%97)小节。

### 复制的使用顺序

不同复制变量的OnRep (RepNotify)回调之间没有确定的顺序。客户端的调用顺序与标记为dirty的变量或其在内存中的声明位置无关。如果你需要在多个变量之间建立可靠的顺序，我们建议将它们一起存储在一个结构体中。

如果Actor的属性复制顺序对游戏很重要，你可能需要实现OnRep来跟踪每帧的属性更新。在收到复制值并调用其OnRep后，你可以在[`UObject::PostRepNotifies`](/documentation/en-us/unreal-engine/API/Runtime/CoreUObject/UObject/UObject/PostRepNotifies)函数中处理相关变更。你可能还需要将某些接收到的值保存在各自的OnRep中，直到这些值可用。

## 远程过程调用

虚幻引擎中的复制系统将尽可能可靠地执行RPC，以便编译Gameplay系统时无需担心网络副作用。

### 跨Actor顺序

目前还没有机制可以保留RPC在多个Actor之间的原始调用顺序，并将其在远程机器上重新应用。下面举例说明发送端机器上的RPC调用顺序：

```cpp
    AActor* MyActor;
    AActor* OtherActor;

    // Valid MyActor pointer
    MyActor->ClientRPC1();
    OtherActor->ClientRPC2();
    MyActor->ClientRPC3();
```

在本例中，RPC在接收端机器上的执行顺序 *并不* 确定，RPC在接收端机器上可以按任意顺序执行：

```cpp
    RPC1 --> RPC2 --> RPC3
    RPC1 --> RPC3 --> RPC2
    RPC2 --> RPC1 --> RPC3
    RPC2 --> RPC3 --> RPC1
    RPC3 --> RPC1 --> RPC2
    RPC3 --> RPC2 --> RPC1
```

### Actor内部顺序

复制系统确实能在同一Actor上保证对可靠RPC的调用顺序。它们在接收端机器上的执行顺序与它们在发送端机器上的调用顺序相同。如果发送端机器上的调用顺序是：

```cpp
    AActor* MyActor;

    // Valid MyActor pointer
    MyActor->ClientReliableRPC1();
    MyActor->ClientReliableRPC2();
    MyActor->ClientReliableRPC3();
```

那么接收端机器将始终按此顺序执行RPC：

```cpp
    RPC1 --> RPC2 --> RPC3
```

### Actor和子对象之间的顺序

对于在Actor及其子对象上调用的所有RPC，将遵守接收端机器上的RPC执行顺序。例如，如果发送端机器发送：

```cpp
    AActor* MyActor;

    // Valid MyActor pointer
    MyActor->RPC1();
    MyActor->SubObject1->RPC2();
    MyActor->SubObject2->RPC3();
    MyActor->RPC4();
```

那么接收端机器上的执行顺序是：

```cpp
    RPC1 --> RPC2 --> RPC3 --> RPC4
```

### 不可靠排序与可靠排序

不可靠RPC和可靠RPC之间的RPC执行顺序看起来可以保留，但其实是无法保证的。当未发生数据包丢失或数据包重新排序时，在接收端机器上，不可靠调用和可靠调用之间的执行顺序与发送端机器中的顺序相同。下面举例说明发送端机器上的RPC调用顺序：

```cpp
    AActor* MyActor;

    // Valid MyActor pointers
    MyActor->ClientReliableRPC1();
    MyActor->ClientUnicastUnreliableRPC2();
    MyActor->ClientReliableRPC3();
```

如果未发生数据包丢失或重新排序，接收端机器将按此顺序执行RPC：

```cpp
    RPC1 --> RPC2 --> RPC3
```

如果 `RPC1` 位于被丢弃的或重新排序的单个数据包中，那么接收端机器将按如下顺序执行：

```cpp
    RPC2 --> RPC1 --> RPC3
```

如果 `RPC2` 位于被丢弃的单个数据包中，那么接收端机器将按如下顺序执行：

```cpp
    RPC1 --> RPC3
```

在后一种情况下，`RPC2` 会被丢弃，而且由于它不可靠，因此它不会在接收端机器上执行。

不可靠的 `RPC2` 在 `RPC3` 之后执行的情况应该永远也不会出现。如果包含 `RPC2` 的数据包被重新排序并晚于 `RPC3` 到达，那么它会在接收时被忽略。

### 组播排序与单播排序

组播RPC的排序更为复杂，因为虚幻引擎的复制系统有时不会保留组播RPC和单播RPC之间的调用顺序。

#### 组播可靠

可靠组播和其他可靠单播RPC之间的调用顺序会被保留。例如，如果发送端机器按此顺序调用以下函数：

```cpp
    MyActor->MulticastReliableRPC1();
    MyActor->UnicastReliableRPC2();
    MyActor->UnicastReliableRPC3();
    MyActor->MulticastReliableRPC4();
```

那么接收端机器将按此顺序执行RPC：

```cpp
    RPC1 --> RPC2 --> RPC3 --> RPC4
```

记住，不可靠的 `RPC3` 的排序不是确定的，它可能被提前执行或根本不执行。

#### 组播不可靠

不可靠组播从不保存其与其他单播和可靠组播之间的调用顺序。例如，如果发送端机器以如下顺序调用下列RPC：

```cpp
    MyActor->MulticastUnreliableRPC1();
    MyActor->UnicastReliableRPC2();
    MyActor->MulticastUnreliableRPC3();
    MyActor->UnicastUnreliableRPC4();
```

那么接收端机器将按此顺序执行RPC：

```cpp
    RPC2 --> RPC4 --> RPC1 --> RPC3
```

由于 `RPC1` 和 `RPC3` 是不可靠的组播RPC，因此它们会排队并最后被序列化。这意味着首先被执行的是单播，在最后才执行不可靠的组播。被丢弃的不可靠单播RPC的管理规则在这里也适用。

如果 `RPC2` 位于被丢弃的或重新排序的单个数据包中，那么接收端机器将按如下顺序执行RPC：

```cpp
    RPC1 --> RPC3 --> RPC2 --> RPC4
```

### RPC发送策略

你可以为RPC指定影响RPC排序的显式发送策略。指定 `ERemoteFunctionSendPolicy` 即可实现这一点。如需详细了解RPC发送策略，请参阅[RPC](/documentation/zh-cn/unreal-engine/remote-procedure-calls-in-unreal-engine)文档。

#### 强制发送

使用 `ERemoteFunctionSendPolicy::ForceSend` 策略的RPC会改变不可靠组播RPC的顺序，并阻止其排队。见下方示例：

```cpp
    MyActor->ForceSendMulticastUnreliableRPC1();
    MyActor->UnicastReliableRPC2();
    MyActor->MulticastUnreliableRPC3();
    MyActor->UnicastUnreliableRPC4();
```

客户端将按如下顺序执行RPC：

```cpp
    RPC1 --> RPC2 --> RPC4 --> RPC3
```

#### 强制队列

使用 `ERemoteFunctionSendPolicy::ForceQueue` 策略的RPC不遵守调用顺序，但针对其他 `ForceQueue` RPC和不可靠组播时除外。见下方示例：

```cpp
    MyActor->ForceQueueRPC1();
    MyActor->UnicastReliableRPC2();
    MyActor->MulticastUnreliableRPC3();
    MyActor->UnicastUnreliableRPC4();
```

客户端将按如下顺序执行RPC：

```cpp
    RPC2 --> RPC4 --> RPC1 --> RPC3
```

## RPC与Actor属性之间的顺序

了解RPC执行之间的顺序以及何时应用复制属性的更新也很重要。这种情况适用以下规则：

-   RPC将最先被执行。
-   属性将跟着被更新。
-   属性更新将以单个不可靠数据块的形式发送。

成批负载的构造规则如下：

-   非排队的RPC被序列化。
-   复制的属性数据被序列化。
-   排队的RPC被序列化。

从RPC内部写入的复制变量可能会丢失，并立即被未处理的属性更新覆盖。

这条规则的一种例外情况是不可靠的组播RPC，因为它们会在调用站点排队并且总是最后才被序列化。这意味着它们总是在应用了属性更新 *之后* 才执行。

见下方示例：

```cpp
    MyActor->ReliableRPC1();
    MyActor->bReplicatedVar1 = true
    MyActor->MulticastUnreliableRPC2();
    MyActor->bReplicatedVar2 = true;
    MyActor->ReliableRPC3();
```

远程机器将按以下顺序执行：

```cpp
    RPC1 --> RPC3 --> Var1 && Var2 --> RPC2
```

属性更新与RPC混合的另一个例子如下：

```cpp
    MyActor->ReliableRPC1();
    MyActor->bReplicatedVar1 = true
    MyActor->MulticastUnreliableRPC2();
    MyActor->bReplicatedVar2 = true;
    MyActor->ReliableRPC3();
```

假设属性更新被放弃，那么接收端机器会按以下顺序执行RPC和属性更新：

```cpp
    RPC1 --> RPC3 --> RPC2
    // 下次更新后
    Var1 && Var2
```

另一种情况是只丢弃可靠的RPC1，这时接收端机器的执行顺序如下：

```cpp
    Var1 && Var2 --> RPC2 --> RPC1 --> RPC3
```

## 使用不可靠RPC测试Gameplay代码

如果你正在创建或依赖的代码是使用不可靠RPC复制的，最好强制丢弃它们，看看系统的反应如何。如需详细了解如何通过模拟较差网络状况来实现这一目标，请参阅[使用网络模拟](/documentation/zh-cn/unreal-engine/using-network-emulation-in-unreal-engine)文档。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [networking](https://dev.epicgames.com/community/search?query=networking)
-   [rpc](https://dev.epicgames.com/community/search?query=rpc)
-   [properties](https://dev.epicgames.com/community/search?query=properties)
-   [repnotify](https://dev.epicgames.com/community/search?query=repnotify)
-   [onrep](https://dev.epicgames.com/community/search?query=onrep)
-   [order](https://dev.epicgames.com/community/search?query=order)
-   [guarantee](https://dev.epicgames.com/community/search?query=guarantee)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Actor属性](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine#actor%E5%B1%9E%E6%80%A7)
-   [复制的使用顺序](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine#%E5%A4%8D%E5%88%B6%E7%9A%84%E4%BD%BF%E7%94%A8%E9%A1%BA%E5%BA%8F)
-   [远程过程调用](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine#%E8%BF%9C%E7%A8%8B%E8%BF%87%E7%A8%8B%E8%B0%83%E7%94%A8)
-   [跨Actor顺序](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine#%E8%B7%A8actor%E9%A1%BA%E5%BA%8F)
-   [Actor内部顺序](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine#actor%E5%86%85%E9%83%A8%E9%A1%BA%E5%BA%8F)
-   [Actor和子对象之间的顺序](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine#actor%E5%92%8C%E5%AD%90%E5%AF%B9%E8%B1%A1%E4%B9%8B%E9%97%B4%E7%9A%84%E9%A1%BA%E5%BA%8F)
-   [不可靠排序与可靠排序](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine#%E4%B8%8D%E5%8F%AF%E9%9D%A0%E6%8E%92%E5%BA%8F%E4%B8%8E%E5%8F%AF%E9%9D%A0%E6%8E%92%E5%BA%8F)
-   [组播排序与单播排序](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine#%E7%BB%84%E6%92%AD%E6%8E%92%E5%BA%8F%E4%B8%8E%E5%8D%95%E6%92%AD%E6%8E%92%E5%BA%8F)
-   [组播可靠](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine#%E7%BB%84%E6%92%AD%E5%8F%AF%E9%9D%A0)
-   [组播不可靠](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine#%E7%BB%84%E6%92%AD%E4%B8%8D%E5%8F%AF%E9%9D%A0)
-   [RPC发送策略](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine#rpc%E5%8F%91%E9%80%81%E7%AD%96%E7%95%A5)
-   [强制发送](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine#%E5%BC%BA%E5%88%B6%E5%8F%91%E9%80%81)
-   [强制队列](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine#%E5%BC%BA%E5%88%B6%E9%98%9F%E5%88%97)
-   [RPC与Actor属性之间的顺序](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine#rpc%E4%B8%8Eactor%E5%B1%9E%E6%80%A7%E4%B9%8B%E9%97%B4%E7%9A%84%E9%A1%BA%E5%BA%8F)
-   [使用不可靠RPC测试Gameplay代码](/documentation/zh-cn/unreal-engine/replicated-object-execution-order-in-unreal-engine#%E4%BD%BF%E7%94%A8%E4%B8%8D%E5%8F%AF%E9%9D%A0rpc%E6%B5%8B%E8%AF%95gameplay%E4%BB%A3%E7%A0%81)

相关文档

[

Actor复制流程详解

![Actor复制流程详解](https://dev.epicgames.com/community/api/documentation/image/a4ab9d12-a4be-4603-af67-06eaaedf8fec?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/detailed-actor-replication-flow-in-unreal-engine)

[

复制子对象

![复制子对象](https://dev.epicgames.com/community/api/documentation/image/5d0ac9fb-0aea-47e2-914d-ce139f5057a9?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/replicating-uobjects-in-unreal-engine)
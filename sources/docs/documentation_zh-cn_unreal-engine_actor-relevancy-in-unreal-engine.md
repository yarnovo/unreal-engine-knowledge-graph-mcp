# 虚幻引擎中的Actor相关性 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/actor-relevancy-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:56:52.655Z

---

目录

![Actor相关性](https://dev.epicgames.com/community/api/documentation/image/fc45b1db-65a7-4460-a45c-44bafc5e1533?resizing_type=fill&width=1920&height=335)

虚幻引擎关卡可能非常庞大。在特定时刻某个玩家只能看到关卡中的一小部分Actor。场景中的其他大多数Actor都不会被看到和听到，对玩家也不会产生显著的影响。被服务器认为能够对客户端产生重大影响的Actor组会被视为与该客户端的 **相关**。这组相关Actor按客户端确定，用网络术语来说，即按网络连接确定。虚幻引擎只会将与客户端相关的Actor复制到该客户端。

以下图像对比展示了使用 *基于距离* 的相关性的人为示例。主Actor（在帧的中间）被设置为与周围300厘米（3米）之内的已复制Actor保持相关。在前一张图像中，次Actor在300厘米之内，因此相关。这意味着次Actor会被复制到主Actor的网络连接并且可见。在后一张图像中，次Actor移动到距离主Actor超过300厘米的地方，因此该Actor与主Actor不再相关，不会再被复制到主Actor的网络连接，因此不可见。

![Actor相关](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21248a88-aa93-49f5-b746-fc872b3a6618/actor-relevant.png)

![Actor不相关](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81148e78-b9cd-4cc8-920f-c43f1e240200/actor-not-relevant.png)

Actor相关

Actor不相关

当动态生成的已复制Actor不再相关时，会在客户端上被销毁。所以次Actor在此情况下不再对主Actor可见。

## 获取Actor的相关性

网络驱动程序通过调用[`AActor::IsNetRelevantFor`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/IsNetRelevantFor)，确定Actor是否与特定网络连接相关。这由网络驱动程序自动处理。

### 将Actor设为相关

你可以在 `AActor` 派生的类中调用[`AActor::ForceNetRelevant`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/ForceNetRelevant)，将任意Actor强制设为相关。

### 重载Actor相关性

你可以自定义Actor相关性，方法是在 `AActor` 派生的类中重载虚函数 `AActor::IsNetRelevantFor` 。

重载 `AActor::IsNetRelevantFor` 时请谨慎。如果你不熟悉虚幻引擎的复制系统，这可能带来意外后果。

## 如何确定相关性

虚函数 `AActor::IsNetRelevantFor` 实现了多个测试，用于确定与网络连接相关的一组Actor。

### 参数

`AActor::IsNetRelevantFor` 使用三个参数来确定调用Actor对象是否相关：

**参数**

**说明**

`RealViewer`

客户端网络对象，控制需要检查相关性的当前Actor。这通常是玩家手柄。

`ViewTarget`

`RealViewer` 当前查看或控制的Actor。这通常是Pawn。

`SrcLocation`

控制网络对象的源位置。这在启用基于距离的相关性时使用。

### 相关性逻辑

对于给定的Actor和网络连接，会执行以下测试：

-   如果以下条件至少有一个成立，则当前Actor与此网络连接相关：
    -   当前Actor始终相关。
    -   当前Actor由当前网络连接的Pawn拥有。
    -   当前Actor由当前网络连接的玩家手柄拥有。
    -   当前Actor是当前网络连接的Pawn。
    -   当前网络连接的Pawn是某个操作（例如声音或伤害）的发起者。
-   如果以下条件成立，则复制系统使用当前Actor的所有者的相关性来确定它与此网络连接是否相关：
    -   当前Actor有所有者。
    -   当前Actor被设置为使用其所有者的网络相关性。
-   如果以下条件成立，则当前Actor与此网络连接不相关：
    -   当前Actor仅与其所有者相关。
    -   当前Actor没有所有者。
    -   当前Actor的所有者不相关。
-   如果以下条件成立，则系统使用当前Actor的基本相关性来确定它与此网络连接是否相关：
    -   当前Actor被附加到了另一个Actor的骨架。
-   如果以下条件成立，则当前Actor与此网络连接不相关：
    
    -   当前Actor已被隐藏。
    -   当前Actor没有根组件，或根组件未启用碰撞。
    
    如果当前Actor没有根组件，则 `AActor::IsNetRelevantFor` 会记录警告，并询问该Actor是否应该始终相关。
    
-   如果以下条件成立，则当前Actor与此网络连接相关：
    -   游戏网络管理器（[`AGameNetworkManager`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AGameNetworkManager)）被设置为使用基于距离的相关性。
    -   当前Actor在相关性距离内。

此相关性逻辑适用于 `AActor` 基类。`AActor` 派生的其他类可能包含不同的网络相关性逻辑。例如，`APawn` 和 `APlayerController` 类会重载 `AActor::IsNetRelevantFor` 。因此，它们有不同的相关性条件。请参阅 `Pawn.cpp` 和 `PlayerController.cpp` ，了解更多信息。

## 自定义相关性设置

你可以在虚幻编辑器细节面板的复制分段中或在C++中为 `AActor` 派生的类定制网络相关性设置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae0903df-2b22-42e0-b00a-9db9361e3542/details-options.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae0903df-2b22-42e0-b00a-9db9361e3542/details-options.png)

## 相关性参考

下表提供了可在 `AActor` 类中找到的，与Actor相关性有关的函数和属性。

### 函数

**名称**

**说明**

[`ForceNetRelevant`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/ForceNetRelevant)

如果此Actor在默认情况下不相关，则将其强制设为网络相关。

[`IsNetRelevantFor`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/IsNetRelevantFor)

检查此Actor与特定网络连接是否相关。

[`IsRelevancyOwnerFor`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/IsRelevancyOwnerFor)

在检查被标记为 `bOnlyRelevantToOwner` 的Actor的网络相关性时，检查此Actor是否为所有者。

[`IsReplayRelevantFor`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/IsRelevancyOwnerFor)

检查此Actor与录制的重播是否相关。

[`IsWithinNetRelevancyDistance`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/IsWithinNetRelevancyDistance)

检查给定源位置与此Actor的位置之间的距离的平方是否在 `NetCullDistanceSquared` 之内。

### 属性

**名称**

**说明**

[`bAlwaysRelevant`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor)

始终与网络复制相关。会重载 `bOnlyRelevantToOwner` 。

[`bNetUseOwnerRelevancy`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor)

如果此Actor有有效的所有者，调用该所有者的 `IsNetRelevantFor` 和 `GetNetPriority` 。

[`bOnlyRelevantToOwner`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/bOnlyRelevantToOwner)

如果为true，此则Actor仅与其所有者相关。

[`bRelevantForNetworkReplays`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor)

如果为true，此Actor会被复制到网络重播。默认为true。

[`NetCullDistanceSquared`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor)

此Actor与客户端视口相关并将复制的最大距离的平方。

[`Owner`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor)

此Actor的所有者。用于 `bNetUseOwnerRelevancy` 和 `bOnlyRelevantToOwner` 的复制。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [networking](https://dev.epicgames.com/community/search?query=networking)
-   [relevancy](https://dev.epicgames.com/community/search?query=relevancy)
-   [isnetrelevantfor](https://dev.epicgames.com/community/search?query=isnetrelevantfor)
-   [netculldistance](https://dev.epicgames.com/community/search?query=netculldistance)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [获取Actor的相关性](/documentation/zh-cn/unreal-engine/actor-relevancy-in-unreal-engine#%E8%8E%B7%E5%8F%96actor%E7%9A%84%E7%9B%B8%E5%85%B3%E6%80%A7)
-   [将Actor设为相关](/documentation/zh-cn/unreal-engine/actor-relevancy-in-unreal-engine#%E5%B0%86actor%E8%AE%BE%E4%B8%BA%E7%9B%B8%E5%85%B3)
-   [重载Actor相关性](/documentation/zh-cn/unreal-engine/actor-relevancy-in-unreal-engine#%E9%87%8D%E8%BD%BDactor%E7%9B%B8%E5%85%B3%E6%80%A7)
-   [如何确定相关性](/documentation/zh-cn/unreal-engine/actor-relevancy-in-unreal-engine#%E5%A6%82%E4%BD%95%E7%A1%AE%E5%AE%9A%E7%9B%B8%E5%85%B3%E6%80%A7)
-   [参数](/documentation/zh-cn/unreal-engine/actor-relevancy-in-unreal-engine#%E5%8F%82%E6%95%B0)
-   [相关性逻辑](/documentation/zh-cn/unreal-engine/actor-relevancy-in-unreal-engine#%E7%9B%B8%E5%85%B3%E6%80%A7%E9%80%BB%E8%BE%91)
-   [自定义相关性设置](/documentation/zh-cn/unreal-engine/actor-relevancy-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%9B%B8%E5%85%B3%E6%80%A7%E8%AE%BE%E7%BD%AE)
-   [相关性参考](/documentation/zh-cn/unreal-engine/actor-relevancy-in-unreal-engine#%E7%9B%B8%E5%85%B3%E6%80%A7%E5%8F%82%E8%80%83)
-   [函数](/documentation/zh-cn/unreal-engine/actor-relevancy-in-unreal-engine#%E5%87%BD%E6%95%B0)
-   [属性](/documentation/zh-cn/unreal-engine/actor-relevancy-in-unreal-engine#%E5%B1%9E%E6%80%A7)
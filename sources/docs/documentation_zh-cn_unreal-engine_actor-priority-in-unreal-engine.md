# 虚幻引擎中的Actor优先级 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/actor-priority-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:56:48.146Z

---

目录

![Actor优先级](https://dev.epicgames.com/community/api/documentation/image/29672e06-06ce-4e8c-b3a2-c561f0464fc0?resizing_type=fill&width=1920&height=335)

虚幻引擎无法保证在网络更新期间所有Actor都会被复制。这是因为网络资源有限。网络连接的带宽是其中的主要限制因素。网络连接的 *带宽* 是该网络连接的最大数据传输容量。超出容量后，网络连接会进入 *饱和* 状态。网络连接饱和之后，虚幻引擎的复制系统会使用一种负载均衡技术，为所有Actor分配一个数字 **优先级** 。此优先级会根据每个Actor对于Gameplay的重要程度以及可用的网络带宽资源，给予合理的带宽份额。Actor的相对优先级越高，就表示越有必要复制，因此会获得更多带宽进行复制。

## 获取Actor的优先级

每个Actor都有一个浮点[`AActor::NetPriority`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor)属性。`NetPriority` 越高，就表示这个Actor比其他Actor拥有更多带宽。例如， `NetPriority == 2.0` 的Actor会获得比 `NetPriority == 1.0` 的Actor更多的资源。就优先级而言，唯一重要的是比率；提升所有Actor的网络优先级并不能提高虚幻引擎的网络性能。

作为基线，下面是一些常见虚幻引擎类使用的初始值：

**类**

**优先级**

`AActor`

`1.0`

`APawn`

`3.0`

`APlayerController`

`3.0`

`NetPriority` 是用于低带宽或饱和网络连接的基线。[`AActor::GetNetPriority`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/GetNetPriority)根据多个因素确定Actor的当前优先级，包括基本 `NetPriority` 、与观看者的距离以及距离上次复制的时间。

### 检索Actor的当前优先级

网络驱动程序通过调用 `GetNetPriority` ，确定Actor复制到特定网络连接的当前优先级。这由网络驱动程序自动处理。

### 重载Actor相关性

你可以自定义Actor优先级，方法是重载 `AActor` 派生的类中的虚函数 `GetNetPriority` ，并使用 `NetPriority` 更改基本网络优先级。

重载Actor的 `GetNetPriority` 时一定要谨慎。如果你不熟悉虚幻引擎的复制系统，这可能带来意外后果。

## 如何确定优先级

Actor的当前网络优先级基于其上次复制的时间以及其他各种因素进行计算，以获取浮点优先级。

### 参数

Actor网络优先级基于以下输入参数确定：

**参数**

**说明**

`ViewPos`

观看者的位置。

`ViewDir`

观看者面向的方向。

`Viewer`

要确定其网络优先级的客户端所拥有的网络对象。这通常是玩家手柄。

`ViewTarget`

`Viewer` 当前查看或控制的Actor。这通常是Pawn。

`InChannel`

正在复制此Actor的通道。

`Time`

自上次复制此Actor以来的时间。

`bLowBandwidth`

观看者的带宽很低时为true。

### 优先级逻辑

`AActor::GetNetPriority` 的大部分工作是为了基于与观看者间的距离、观看者的视线以及自上次复制当前Actor以来的时间，计算常量 `AActor::NetPriority` 的乘法因子。

网络优先级按如下逻辑确定：

-   如果以下两个条件都成立，则当前Actor使用其所有者的网络优先级。
    -   当前Actor有所有者。
    -   当前Actor被设置为使用其所有者的网络相关性。
-   如果以下条件至少有一个成立，则当前Actor的网络优先级将提高。
    -   当前Actor是当前网络连接的Pawn。
    -   当前网络连接的Pawn是某个操作的发起者。
-   如果以上两点均不成立，则执行基于距离的计算，以确定当前Actor的网络优先级：
    -   如果当前Actor在观看者前方，则优先级与设定距离成反比降低。
        -   如果当前Actor与观看者之间的距离大于 `CLOSEPROXIMITY` ，但小于 `NEARSIGHTTHRESHOLD` ，则优先级会乘以 `0.2` 。
        -   如果当前Actor与观看者之间的距离大于 `NEARSIGHTTHRESHOLD` ，则优先级会乘以 `0.4` 。
    -   如果当前Actor与观看者之间的距离小于 `FARSIGHTTHRESHOLD` ，并且观看者正在看当前Actor，则优先级会乘以 `2.0` 。
    -   如果当前Actor与观看者之间的距离大于 `MEDSIGHTTHRESHOLD` ，则优先级会乘以 `0.4` 。

距离和视觉阈值常量有以下值：

**常量**

**值**

`CLOSEPROXIMITY`

`500`

`NEARSIGHTTHRESHOLD`

`2000`

`MEDSIGHTTHRESHOLD`

`3162`

`FARSIGHTTHRESHOLD`

`8000`

这些常量定义可在 `NetworkingDistanceConstants.h` 中找到。

## 优先级参考

### 函数

**名称**

**说明**

[`GetNetPriority`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/GetNetPriority)

用于在决定要复制哪些Actor时对Actor划分优先级。

[`GetReplayPriority`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor/GetReplayPriority)

类似于 `GetNetPriority`。用于在录制重播时对Actor划分优先级。

### 属性

**名称**

**说明**

[`bNetUseOwnerRelevancy`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor)

如果此Actor有有效的所有者，调用该所有者的 `IsNetRelevantFor` 和 `GetNetPriority` 。

[`NetPriority`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/AActor)

在低带宽或饱和情况下检查复制时，此Actor的优先级。优先级越高意味着它越有可能被复制。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [networking](https://dev.epicgames.com/community/search?query=networking)
-   [priority](https://dev.epicgames.com/community/search?query=priority)
-   [netpriority](https://dev.epicgames.com/community/search?query=netpriority)
-   [getnetpriority](https://dev.epicgames.com/community/search?query=getnetpriority)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [获取Actor的优先级](/documentation/zh-cn/unreal-engine/actor-priority-in-unreal-engine#%E8%8E%B7%E5%8F%96actor%E7%9A%84%E4%BC%98%E5%85%88%E7%BA%A7)
-   [检索Actor的当前优先级](/documentation/zh-cn/unreal-engine/actor-priority-in-unreal-engine#%E6%A3%80%E7%B4%A2actor%E7%9A%84%E5%BD%93%E5%89%8D%E4%BC%98%E5%85%88%E7%BA%A7)
-   [重载Actor相关性](/documentation/zh-cn/unreal-engine/actor-priority-in-unreal-engine#%E9%87%8D%E8%BD%BDactor%E7%9B%B8%E5%85%B3%E6%80%A7)
-   [如何确定优先级](/documentation/zh-cn/unreal-engine/actor-priority-in-unreal-engine#%E5%A6%82%E4%BD%95%E7%A1%AE%E5%AE%9A%E4%BC%98%E5%85%88%E7%BA%A7)
-   [参数](/documentation/zh-cn/unreal-engine/actor-priority-in-unreal-engine#%E5%8F%82%E6%95%B0)
-   [优先级逻辑](/documentation/zh-cn/unreal-engine/actor-priority-in-unreal-engine#%E4%BC%98%E5%85%88%E7%BA%A7%E9%80%BB%E8%BE%91)
-   [优先级参考](/documentation/zh-cn/unreal-engine/actor-priority-in-unreal-engine#%E4%BC%98%E5%85%88%E7%BA%A7%E5%8F%82%E8%80%83)
-   [函数](/documentation/zh-cn/unreal-engine/actor-priority-in-unreal-engine#%E5%87%BD%E6%95%B0)
-   [属性](/documentation/zh-cn/unreal-engine/actor-priority-in-unreal-engine#%E5%B1%9E%E6%80%A7)

相关文档

[

Actor网络休眠

![Actor网络休眠](https://dev.epicgames.com/community/api/documentation/image/7d2f5867-0ce9-481c-88ec-301e68441477?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/actor-network-dormancy-in-unreal-engine)
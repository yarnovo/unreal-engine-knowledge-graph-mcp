# 联网物理概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/networked-physics-overview
> 
> 生成时间: 2025-06-14T19:49:54.062Z

---

目录

![联网物理概述](https://dev.epicgames.com/community/api/documentation/image/32b38b68-14ba-4db9-b7b2-2ef98ae3c0ed?resizing_type=fill&width=1920&height=335)

![联网物理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6041d5f-6c40-474e-b727-91eb7715712d/networked-physics-4.gif)

## 概述

游戏中的联网或复制是指通过互联网连接在多台设备之间传递Gameplay信息的能力。虚幻引擎具有健壮的网络框架，可帮助开发者简化多人游戏的创建。

**联网物理** 是网络框架的一部分，使物理驱动型模拟能够在多人游戏环境中运行。在虚幻引擎中，物理复制是指具有复制的移动效果且能模拟物理的Actor。在Gameplay过程中，这些模拟在本地客户端（玩家的设备）内运行。

传统联网物理面临的最大难题是，各模拟对象相互碰撞时该如何交互。对象的移速越快，网络延迟越高（网速越慢），复制这类交互就越难。因为存在这些难题，游戏中实际可模拟的对象受到了限制。

如需详细了解虚幻引擎的网络功能，请参阅文档的[网络和多人游戏](/documentation/zh-cn/unreal-engine/networking-and-multiplayer-in-unreal-engine)小节。

## 默认复制模式

**默认（Default）** 复制模式是虚幻引擎的旧版物理复制模式。此模式在 **复制其移动** 并且其 **根组件** 被设置为 **模拟物理** 的Actor上激活。

此模式通过改变每个对象在客户端上的速度来复制模拟，以匹配对象当时在服务器上的速度。客户端需要半个往返时间（RTT）来接收来自服务器授权对象的数据。为了将对象复制到服务器上的当前位置，我们按半个往返时间对接收到的状态数据进行前向预测。

这种复制形式考虑了以下两个因素：

-   对象在客户端的位置与在服务器上的预测位置之间的位置偏移。
-   对象在服务器上的速度。

然后用对象的位置偏移除以所需校正时间。这会产生一个速度（距离/时间），该速度会增加到对象的服务器速度上。这会导致在所需的校正时间内校正对象的位置。

默认复制模式不能很好地处理交互，因为对象的速度、位置或旋转的局部改变会被对象在服务器的速度覆盖。尽管存在本地交互，但这会导致对象在客户端的位置被校正。

## 预测性插值模式

**预测性插值（Predictive Interpolation）** 复制模式是为服务器授权Actor设计的。工作原理是改变每个对象在客户端上的速度，以匹配当时对象在服务器上的速度，类似于默认模式。然而，此模式旨在更好地处理客户端上的交互和局部物理改变，条件是该操作按预测的方式完成（预计在服务器和客户端上统一应用）。

此模式在计算对象的最终速度时，除了考虑对象的服务器速度外，还考虑了对象的本地（客户端）速度。此外，此模式还根据往返时间（RTT）（延迟）和当前发送速率时间间隔（客户端从服务器接收数据的时间间隔）处理校正。

最终结果是物理模拟允许客户端将预测力施加到对象上，然后服务器将相同力的结果发送回客户端。 例如，客户端还可以通过推动对象来与对象进行交互。

务必注意，延迟高越和/或速度越高，物理复制的质量就越差。但是，这可以通过复制设置来平衡，以更好地适配你的项目。

## 重新模拟模式

**重新模拟（Resimulation）** 复制模式是专为服务器授权Pawn和Actor设计的。

重新模拟在客户端上完全前向预测。这意味着客户端比服务器快半个往返时间（RTT）。

该模式旨在使物理Pawn成为可能，并通过允许完全的客户端物理预测来更准确地处理多人游戏中的交互。客户端比服务器快半个往返时间（RTT），并且比从服务器收到的确认数据快一个完整的RTT。这要求物理模拟在每次物理函数更新时缓存物理状态的历史记录，至少持续一个RTT的时间量，而这会消耗CPU和内存。

当客户端从服务器接收状态信息时，客户端会将其与历史记录中相应物理帧的缓存物理状态进行比较。如果状态信息的差异足够大，就会触发物理重新模拟。

重新模拟的过程如下：将物理模拟倒回到缓存历史状态，根据传入服务器状态校正错误，然后再次模拟物理直到当前物理更新函数。

在重新模拟结束时，对象的状态可能与重新模拟之前不同，这可能会导致对象位置发生跳变。在这种情况下，该模式将对象的渲染从其当前状态内插到新状态。

重新模拟可用于Actor和Pawn，同时其他Actor运行预测性插值。目标是妥当地处理运行两种不同复制模式的Actor之间的交互。与通过重新模拟复制的Actor相比，通过预测性插值复制的Actor性能更高且消耗的网络资源更少。

物理Pawn的工作原理是让玩家输入通过物理力来驱动Pawn的移动。这些输入被 **网络物理（Network Physics）** 组件在重新模拟期间应用。

网络物理组件负责处理网络、历史缓存、输入的重新模拟以及Pawn和Actor的自定义状态。网络物理组件是一个低层级系统，需要通过C++手动实现。

## 联网物理设置

你可以在 **项目设置（Project Settings）** 的 **物理（Physics）** 类别下修改多个联网物理设置。

你还可以将 **网络物理设置（Network Physics Settings）** 组件添加到使用联网物理复制模式的Actor，以重载其物理复制设置。

此外，你还可以通过 **控制台命令** 进一步配置联网物理设置，方法是在控制台中输入 **np2.PredictiveInterpolation** ，查看 **预测性插值** 的所有选项，或者输入 **np2.Resim** 和 **p.Resim** ，查看 **重新模拟** 的所有选项。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/networked-physics-overview#%E6%A6%82%E8%BF%B0)
-   [默认复制模式](/documentation/zh-cn/unreal-engine/networked-physics-overview#%E9%BB%98%E8%AE%A4%E5%A4%8D%E5%88%B6%E6%A8%A1%E5%BC%8F)
-   [预测性插值模式](/documentation/zh-cn/unreal-engine/networked-physics-overview#%E9%A2%84%E6%B5%8B%E6%80%A7%E6%8F%92%E5%80%BC%E6%A8%A1%E5%BC%8F)
-   [重新模拟模式](/documentation/zh-cn/unreal-engine/networked-physics-overview#%E9%87%8D%E6%96%B0%E6%A8%A1%E6%8B%9F%E6%A8%A1%E5%BC%8F)
-   [联网物理设置](/documentation/zh-cn/unreal-engine/networked-physics-overview#%E8%81%94%E7%BD%91%E7%89%A9%E7%90%86%E8%AE%BE%E7%BD%AE)
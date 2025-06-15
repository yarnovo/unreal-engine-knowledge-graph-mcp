# 虚幻引擎中基于物理的动画 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/physics-driven-animation-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:10:05.764Z

---

目录

![基于物理的动画](https://dev.epicgames.com/community/api/documentation/image/5ae817cb-f830-4c50-bd3b-6b077ed71517?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16c5dda8-2817-4cce-acfc-20efeac3009f/physicsblend.png)

本文介绍了如何给你的角色及骨架网格物体应用物理驱动的动画。该理念是，你可以随同你的关键帧动画混入模拟结果，从而使得需要呈现"布娃娃"效果的角色产生自然模拟的感觉。

在[内容示例](/documentation/zh-cn/unreal-engine/content-examples-sample-project-for-unreal-engine)项目的 PhysicalAnimation.umap 地图中可以看到这个概念的应用示例。在该地图中，我们有一系列应用了动画的骨架网格物体。在每骨架网格物体中，我们也可以通过某种形式进行交互，及查看处理现有运动的物理动画。

需要注意的是，在骨架网格物体上以任何形式应用物理都需要那个网格物体设置Physics Asset（物理资源），并应用该物理资源。请参照相关文档获得关于[物理资源工具(PhAT)](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine)的内容。

为了实现总体的简单性，在这个示例中我们使用了骨架网格物体。同样的技术也可以应用到角色或Pawn上，只需在动画蓝图的事件图表中简单地应用 **Set All Bodies Simulate Physics** 和 **Set All Bodies Below Physics Blend Weight** 节点即可，而不是像我们在该示例中那样在蓝图Actor的图表中进行操作。

## 设置

给角色应用物理有很多种方法，我们的示例仅显示了几种可能性。在我们的方法中，你需要的两个主要工具是 **Set All Bodies Simulate Physics** 和 **Set All Bodies Below Physics Blend Weight** 节点，一般将它们放置在你的角色动画蓝图图表中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5342682-f149-47b4-89ed-2d51a1adb662/physicsweghtnodes.png)

### Set All Bodies Below Simulate Physics（设置之下所有刚体模拟物理）

**Set All Bodies Below Simulate Physics（设置之下所有刚体模拟物理）** 节点的作用是递归地激活骨架网格物体上的物理资源刚体，从给定骨骼开始模拟物理，并递归地沿着骨骼链向下移动。比如，如果你让左锁骨开始模拟，那么在骨架层次结构中位于其下面的所有骨骼也会开始模拟，最终产生一条柔软的或者是类似于布娃娃效果的手臂。简单地说，你可以把这个节点看成一个用于启动或暂停从特定节点开始模拟物理的开关。

### Set All Bodies Below Physics Blend Weight（设置之下所有刚体的物理混合权重）

该节点简单地控制物理资源对动画骨架网格物体影响的程度。值为1.0，则使用物理驱动给定骨骼及该骨骼下的所有骨骼。值为0.0，则骨架网格物体返回到其初始关键帧动画。通常，你要在每次更新时驱动该节点，以便你可以平滑地改变Physics Blend Weight(物理混合权重)的值。

## 基于碰撞的反应的概述

基于碰撞的物理反应是角色模拟的常用情形，比如，当角色被射弹击中时。从高的层次来讲，这要求你：

-   获得碰撞到的骨骼的名称。这可以通过速效武器的踪迹来完成，或者在射弹类的适当地方完成。
-   将那个骨骼名称传递到角色的动画蓝图中，以供事件图表使用, 一般通过 **Set All Bodies Below Simulate Physics** 节点完成。这激活了模拟系统。
-   通过 **Set All Below Physics Blend Weight** 节点控制物理混合权重属性。一般，你会想快速地使它增加到1.0，然后在下降回到0.0，以便物理反应混入然后再混出。这一般在动画蓝图的事件图表中完成。
-   一旦反应完成且物理混合权重返回为0，那么你应该再次使用 **Set All Bodies Below Simulate Physics** 节点来禁用该模拟。

你可以在Content Examples项目的PhysicalAnimation.umap关卡的Example 1.2中看到关于该技术的示例。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [physics](https://dev.epicgames.com/community/search?query=physics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置](/documentation/zh-cn/unreal-engine/physics-driven-animation-in-unreal-engine#%E8%AE%BE%E7%BD%AE)
-   [Set All Bodies Below Simulate Physics（设置之下所有刚体模拟物理）](/documentation/zh-cn/unreal-engine/physics-driven-animation-in-unreal-engine#setallbodiesbelowsimulatephysics%EF%BC%88%E8%AE%BE%E7%BD%AE%E4%B9%8B%E4%B8%8B%E6%89%80%E6%9C%89%E5%88%9A%E4%BD%93%E6%A8%A1%E6%8B%9F%E7%89%A9%E7%90%86%EF%BC%89)
-   [Set All Bodies Below Physics Blend Weight（设置之下所有刚体的物理混合权重）](/documentation/zh-cn/unreal-engine/physics-driven-animation-in-unreal-engine#setallbodiesbelowphysicsblendweight%EF%BC%88%E8%AE%BE%E7%BD%AE%E4%B9%8B%E4%B8%8B%E6%89%80%E6%9C%89%E5%88%9A%E4%BD%93%E7%9A%84%E7%89%A9%E7%90%86%E6%B7%B7%E5%90%88%E6%9D%83%E9%87%8D%EF%BC%89)
-   [基于碰撞的反应的概述](/documentation/zh-cn/unreal-engine/physics-driven-animation-in-unreal-engine#%E5%9F%BA%E4%BA%8E%E7%A2%B0%E6%92%9E%E7%9A%84%E5%8F%8D%E5%BA%94%E7%9A%84%E6%A6%82%E8%BF%B0)

相关文档

[

人工智能

![人工智能](https://dev.epicgames.com/community/api/documentation/image/1a4dc47b-52b9-4e06-b61d-512591255b60?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/artificial-intelligence-in-unreal-engine)
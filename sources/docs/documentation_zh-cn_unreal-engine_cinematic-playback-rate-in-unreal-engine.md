# 虚幻引擎中的过场动画播放速率 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cinematic-playback-rate-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:12:06.413Z

---

目录

![时间膨胀轨道](https://dev.epicgames.com/community/api/documentation/image/e225978d-46fb-4a81-963c-0949ea2da765?resizing_type=fill&width=1920&height=335)

**时间膨胀轨道（Time Dilation Track）** 可以让你加快或放慢过场动画的播放速度。你还可以用它添加关键帧，为序列添加时间扭曲效果。

本文将介绍如何创建、使用和理解时间膨胀轨道。

#### 先决条件

-   创建并打开一个关卡序列资产。
    
-   Sequencer中有一个带动画的Actor，以便预览时间膨胀（Time Dilation）效果。
    

## 创建

要创建时间膨胀轨道，请点击 **添加轨道（+）** 并选择 **时间膨胀轨道（Time Dilation Track）**。

![Time Dilation](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc29b60c-ffd5-47ba-9eee-1d28cb1cae32/createtd1.png)

新建的时间膨胀轨道的值为 **1.0**，这是游戏模拟的默认速度。

![Time Dilation](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/edf8069f-db17-4194-a495-05b9e063daee/tddefault.png)

## 用法

你可以在播放序列时修改轨道的值，预览不同的播放速率。

![time dilation warp](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/299448e5-0481-4110-b1d5-aef8da4587a2/tdaffecttime1.gif)

你也可以在时间膨胀轨道上设置关键帧，从而为序列创建时间扭曲效果。

选择轨道并按下 **回车键** 即可添加起始关键帧，然后沿着时间轴拖动时间标记（Time Marker），并修改时间膨胀（Time Dilation）值。这将自动创建一个使用该设置值的关键帧。

![time dilation warp](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4fee2858-762b-4c63-a653-20436c94d4b0/tdaffecttime2.gif)

## 时间膨胀效果

时间膨胀轨道不仅仅影响过场动画中包含的轨道。它也会放慢关卡中所有模拟的全局时间尺度。这意味着关卡中的所有材质、例子或其他动态对象的模拟速度都会受到时间膨胀效果（Time Dilation）的影响，无论序列中的轨道是否引用了它们。

下面的示例展示了时间膨胀轨道对 **粒子模拟速度** 以及背景云层的 **平移纹理** 的影响。这些资产并未被序列中的任何轨道直接引用。

![time dilation world level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab1e9a7e-564c-4b83-b998-d296519c5cbe/tdaffectworld.gif)

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [play rate](https://dev.epicgames.com/community/search?query=play%20rate)
-   [time warp](https://dev.epicgames.com/community/search?query=time%20warp)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/cinematic-playback-rate-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [创建](/documentation/zh-cn/unreal-engine/cinematic-playback-rate-in-unreal-engine#%E5%88%9B%E5%BB%BA)
-   [用法](/documentation/zh-cn/unreal-engine/cinematic-playback-rate-in-unreal-engine#%E7%94%A8%E6%B3%95)
-   [时间膨胀效果](/documentation/zh-cn/unreal-engine/cinematic-playback-rate-in-unreal-engine#%E6%97%B6%E9%97%B4%E8%86%A8%E8%83%80%E6%95%88%E6%9E%9C)
# 如何在虚幻引擎中创建摄像机动画 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-animate-cinematic-cameras-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:10:37.084Z

---

目录

![创建摄像机动画](https://dev.epicgames.com/community/api/documentation/image/ef7dcbce-5d03-490e-a980-75415d2799d0?resizing_type=fill&width=1920&height=335)

本页面将提供在Sequencer中创建摄像机动画的入门概述，适合刚接触过场动画和虚幻引擎的新手。

#### 先决条件

-   你已通读 **[Sequencer基础](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)** 页面，并且已经在关卡中创建和打开 **关卡序列**。
    
-   你对 [视口导航和功能按钮](/documentation/zh-cn/unreal-engine/viewport-controls-in-unreal-engine)有了基本的了解。
    

## 创建摄像机

首先在你的序列中创建一个 [Cine Camera Actor](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine)。 执行此操作的最快方法是，点击Sequencer工具栏中的 **创建新摄像机（Create New Camera）** 按钮。这将为此序列创建一个摄像机Actor作为[可生成物](/documentation/zh-cn/unreal-engine/spawn-temporary-actors-in-unreal-engine-cinematics)，并自动将视口的视角更新为摄像机Actor的视角（称为 **导航**)。

![create camera sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6edf2478-0198-4c37-88d2-55cbb52463ac/createcamera.png)

为确保你可以正确导航摄像机，请确保勾选摄像机上的 **锁定Cine Camera（Lock Cine Camera）** 选项。

![enable camera](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db60260b-1a89-4b0d-8e45-bb859f5a4b4f/cameraenable.png)

## 创建变换关键帧

然后，你可以开始设置摄像机动画。 从视口中，将你的摄像机与初始位置和你要使用的框架对齐。然后，找到摄像机的 [变换轨道（Transform track）](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#transformtrack)，选择它，然后按 **Enter** 键。这将设置摄像机的初始变换[关键帧](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine)。

![创建摄像机关键帧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb024ade-3f23-4159-a75d-3fa18b5ac9ba/setfirstkey.gif)

接下来，沿着时间轴拖动播放头标识，移到序列中靠后的某个位置。

![Sequencer擦除](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61c65051-8e83-4ac9-a8f2-acf6c2a16f68/timeadjust.png)

最后，在视口中将摄像机移动到新位置。完成后，返回 **变换轨道（Transform track）**，选择它，然后按 **Enter** 键放置另一个变换关键帧。

![创建摄像机关键帧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/297ace73-c96e-4bca-aecd-bd99ceb20e18/setsecondkey.gif)

## 预览成果

你现在可以点击Sequencer中的 **播放（Play）** 按钮预览摄像机动画。你还可以通过向序列添加更多关键帧来进一步优化摄像机动画。

![运行Sequencer摄像机](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8714b51c-3a8f-42b0-afae-7bc8daca94dd/play.gif)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [camera](https://dev.epicgames.com/community/search?query=camera)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/how-to-animate-cinematic-cameras-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [创建摄像机](/documentation/zh-cn/unreal-engine/how-to-animate-cinematic-cameras-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%91%84%E5%83%8F%E6%9C%BA)
-   [创建变换关键帧](/documentation/zh-cn/unreal-engine/how-to-animate-cinematic-cameras-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%8F%98%E6%8D%A2%E5%85%B3%E9%94%AE%E5%B8%A7)
-   [预览成果](/documentation/zh-cn/unreal-engine/how-to-animate-cinematic-cameras-in-unreal-engine#%E9%A2%84%E8%A7%88%E6%88%90%E6%9E%9C)
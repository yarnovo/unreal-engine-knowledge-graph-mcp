# 如何在虚幻引擎中制作光源动画 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-animate-lights-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:10:39.783Z

---

目录

![制作光源动画](https://dev.epicgames.com/community/api/documentation/image/8bf79c3e-679a-4b67-beb7-3512ddd4a341?resizing_type=fill&width=1920&height=335)

本文介绍了如何在Sequencer中制作光源动画，旨在面向刚接触过场动画和虚幻引擎的用户。

#### 先决条件

-   你已通读 [Sequencer基础](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine) 页面，并且已经在关卡中创建和打开 **关卡序列（Level Sequence）**。
-   [光源](/documentation/zh-cn/unreal-engine/light-types-and-their-mobility-in-unreal-engine)已放入你的关卡。

## 将光源添加到Sequencer

首先将光源添加到你的序列。为此，请点击 **添加轨道（Add Track (+)）** 按钮，并选择 **Actor到Sequencer（Actor to Sequencer） > 添加"光源"（Add 'Light'）**。任意类型的光源Actor都可以添加为Sequencer中的轨道

![将光源添加到sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b97b443f-b27f-4b91-8977-758b42bd2cba/addlight.png)

每次将光源添加到Sequencer时，系统会将其中一些常用轨道[自动添加](/documentation/zh-cn/unreal-engine/cinematic-actor-tracks-in-unreal-engine#automatictrackcreation)到序列中。在此示例中，**强度（Intensity）** 和 **光源颜色（Light Color）** 轨道已自动添加到序列中。

## 制作强度动画

要制作光源强度动画，请选择光源的 **强度（Intensity）** 轨道并按 **Enter** 键。这将使用当前强度值设置关键帧。

![制作光源强度动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17dafd4b-c640-40b2-961d-6dff700048f9/intensity1.gif)

接下来，拖动播放头，移到序列中靠后的某个位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a88dbd11-0e42-4e03-9385-ae3c0be77e40/scrublater.png)

最后，调整 **强度（Intensity）** 轨道，设置新的光照强度值。具体做法可以是，拖动该轨道来更新值，或者选择文本框后直接输入值。采用上述任一方法，都会按播放头的当前时间创建新的关键帧。此时，可以沿序列拖动播放头或者播放序列以预览动画。

![制作光源强度动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/471aefb1-7efc-4c60-97ed-d10cbc83dc56/intensity2.gif)

## 制作颜色动画

要更改光源的颜色，请选择 **光源颜色（Light Color）** 轨道并按 **Enter** 键。这将按当前颜色值设置关键帧。双击关键帧打开取色器工具，然后选择颜色值，并点击 **确定（OK）** 以确认更改。

![制作光源颜色动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6919eeca-0eab-4bd7-ba68-7ac4c808914c/color1.gif)

接下来，拖动播放头标识，移到序列中靠后的某个位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/031b3989-db2b-4856-8dcb-7723d169e3e5/scrublater2.png)

选择 **光源颜色（Light Color）** 轨道并按 **Enter** 以放置另一个关键帧，从而设置新的颜色关键帧。双击该关键帧，从取色器工具选择颜色。此时，可以沿序列拖动播放头或者播放序列以预览颜色动画。

![制作光源颜色动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c348c138-a856-4b9f-b8ab-dbb1bd12ffec/color2.gif)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [lights](https://dev.epicgames.com/community/search?query=lights)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/how-to-animate-lights-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [将光源添加到Sequencer](/documentation/zh-cn/unreal-engine/how-to-animate-lights-in-unreal-engine#%E5%B0%86%E5%85%89%E6%BA%90%E6%B7%BB%E5%8A%A0%E5%88%B0sequencer)
-   [制作强度动画](/documentation/zh-cn/unreal-engine/how-to-animate-lights-in-unreal-engine#%E5%88%B6%E4%BD%9C%E5%BC%BA%E5%BA%A6%E5%8A%A8%E7%94%BB)
-   [制作颜色动画](/documentation/zh-cn/unreal-engine/how-to-animate-lights-in-unreal-engine#%E5%88%B6%E4%BD%9C%E9%A2%9C%E8%89%B2%E5%8A%A8%E7%94%BB)

相关文档

[

为场景设置光照

![为场景设置光照](https://dev.epicgames.com/community/api/documentation/image/efa8f2d1-22c0-4c0f-b235-1330c6d5a663?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/lighting-the-environment-in-unreal-engine)
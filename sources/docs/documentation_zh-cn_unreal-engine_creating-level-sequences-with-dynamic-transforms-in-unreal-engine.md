# 在虚幻引擎中使用动态变换创建关卡序列 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-level-sequences-with-dynamic-transforms-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:14:00.534Z

---

目录

![使用动态变换创建关卡序列](https://dev.epicgames.com/community/api/documentation/image/450eeb96-0b83-40b7-8740-75dbfc22b915?resizing_type=fill&width=1920&height=335)

如果你的项目需要过场动画，或其他在多个位置发生的 **关卡序列（Level Sequence）** 内容，使用Sequencer的 **变换原点（Transform Origin）** 功能在运行时动态更改动画的位置或许比较合适。默认情况下，所有Sequencer变换都相对于世界原点(0, 0, 0)发生。但是，通过使用变换原点，你可以相对于任何变换进行变换，甚至相对于Actor的变换进行变换。

本文档说明了如何将变换原点绑定到Actor以更改Sequencer内容位置。

#### 先决条件

-   你需要熟悉如何使用Sequencer创建内容。请参阅以下页面，了解更多信息：
    
    -   [创建摄像机动画](/documentation/zh-cn/unreal-engine/how-to-animate-cinematic-cameras-in-unreal-engine)
    -   [将动画应用到角色](/documentation/zh-cn/unreal-engine/how-to-add-cinematic-animation-to-a-character-in-unreal-engine)

## 关卡Sequencer设置

首先在关卡中创建[关卡序列Actor](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)。将其选中，然后在 **细节（Details）** 面板中执行以下操作：

1.  启用 **重载实例数据（Override Instance Data）** 。
2.  将 **关卡序列Actor（Level Sequence Actor）** 指定为 **变换原点Actor（Transform Origin Actor）** 。

![指定变换原点Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b39425b-eb70-4193-9dc4-1ba7bbceb60f/setup1.png)

你可以根据场景的情况将任意的Actor指定为变换原点Actor。例如，如果你的场景是角色要与桌子之类的对象交互，那么最好将桌子指定为变换原点Actor。

根据你的用例，你可能需要先指定变换原点Actor，然后再在虚幻引擎中创建Sequencer内容。如果你先创建内容，然后指定了一个具有非零位置的变换原点Actor，你的内容将相对于该Actor移动。换言之，在指定变换原点Actor时，你的当前Sequencer变换不会进行补偿。

## 内容设置

接下来，[在序列中创建内容](/documentation/zh-cn/unreal-engine/creating-level-sequences-with-dynamic-transforms-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)，将你的Sequencer内容与变换原点Actor对齐。在此示例中，Mannequin角色走向了关卡序列Actor的位置。

![创建与变换原点Actor对齐的过场动画内容](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad9a0f09-71b0-4507-8781-47656c9cdfb2/content1.gif)

现在你可以移动变换原点Actor，并看到你的动画在播放时同样更改了位置。

![移动变换原点Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b706d380-0b50-45d8-8ab5-99bd5f93c477/content2.gif)

## 结果

更改变换原点Actor的位置会影响序列中的所有变换和动画。这样就可以动态更改场景的发生位置。

![动态场景位置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53c6fc96-fff0-4ab1-99f8-10bd0a6b5213/content3.gif)

[根序列](/documentation/zh-cn/unreal-engine/sequences-shots-and-takes-in-unreal-engine)中的所有对象还会收到变换原点偏移。

## 带动画的变换原点

如果原点Actor带动画，变换原点还会正确地调整Sequencer内容。在此示例中，船舶Actor呗设置为变换原点Actor，导致序列中的角色和其他所有变换的Actor在运行时期间跟随船舶的动画移动。

![带动画的变换原点Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b753355-7f18-4173-b1a4-a8d9dde6a386/boat.gif)

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/creating-level-sequences-with-dynamic-transforms-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [关卡Sequencer设置](/documentation/zh-cn/unreal-engine/creating-level-sequences-with-dynamic-transforms-in-unreal-engine#%E5%85%B3%E5%8D%A1sequencer%E8%AE%BE%E7%BD%AE)
-   [内容设置](/documentation/zh-cn/unreal-engine/creating-level-sequences-with-dynamic-transforms-in-unreal-engine#%E5%86%85%E5%AE%B9%E8%AE%BE%E7%BD%AE)
-   [结果](/documentation/zh-cn/unreal-engine/creating-level-sequences-with-dynamic-transforms-in-unreal-engine#%E7%BB%93%E6%9E%9C)
-   [带动画的变换原点](/documentation/zh-cn/unreal-engine/creating-level-sequences-with-dynamic-transforms-in-unreal-engine#%E5%B8%A6%E5%8A%A8%E7%94%BB%E7%9A%84%E5%8F%98%E6%8D%A2%E5%8E%9F%E7%82%B9)
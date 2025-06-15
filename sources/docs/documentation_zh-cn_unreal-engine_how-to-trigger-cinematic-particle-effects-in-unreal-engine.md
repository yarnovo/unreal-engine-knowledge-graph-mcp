# 如何在虚幻引擎中触发过场动画粒子效果 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-trigger-cinematic-particle-effects-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:10:37.297Z

---

目录

![启用粒子](https://dev.epicgames.com/community/api/documentation/image/37a11617-a0fc-42a7-82b3-9c70f75f8e61?resizing_type=fill&width=1920&height=335)

本页面提供在Sequencer中触发效果的入门概述，适合刚接触过场动画和虚幻的新手。

#### 先决条件

-   你已通读[Sequencer基础](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)页面，并且已经在关卡中创建和打开 **关卡序列** 。
-   你的项目包含[Niagara系统](/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine)。下方示例使用的效果来自[Stack O Bot项目](https://www.fab.com/listings/b4dfff49-0e7d-4c4b-a6c5-8a0315831c9c)。

## 将效果添加到Sequencer

首先将效果添加到你的关卡。为此，请打开[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)，找到 **Niagara系统（Niagara System）** 资产，将其拖入你的关卡。

![将粒子添加到关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dca5dfc5-1012-4fa6-b37e-011bc51f7fd5/addeffect.png)

你最好在粒子的 **细节（Details）面板** 中禁用 **自动激活（Auto Activate）** 属性，以防止干扰你在Sequencer中想要采用的粒子控制方式。

![禁用自动激活](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19d79ba3-97b1-4af0-9bef-6fac17f09843/autoactivate.png)

接下来，在打开你的序列并选择了Niagara系统的情况下，点击 **添加轨道（+）（Add Track (+)）** 按钮，然后选择 **Actor到Sequencer（Actor to Sequencer）> 添加"Niagara系统"（Add 'Niagara System'）** 。这会将引用该效果的轨道添加到你的序列中。

![将粒子添加到Sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d216e6cf-2e09-4118-babb-15d70714fa34/addeffect2.png)

添加轨道后，请执行以下操作：

1.  在Niagara轨道上，点击 **添加轨道（+）（Add Track (+)）** 并选择 **NiagaraComponent0** 。
2.  在NiagaraComponent0轨道上，点击 **添加轨道（+）（Add Track (+)）** 并选择 **FX系统开关轨道（FX System Toggle Track）** 。

![添加组件和添加FX系统轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85da1d46-7494-4bde-8805-dd3b11c87a0f/addeffect3.png)

## 激活效果

现在，你的效果已添加到Sequencer，根据效果是旨在[持续存在](/documentation/zh-cn/unreal-engine/how-to-trigger-cinematic-particle-effects-in-unreal-engine#%E6%8C%81%E7%BB%AD%E6%95%88%E6%9E%9C)还是特别[触发](/documentation/zh-cn/unreal-engine/how-to-trigger-cinematic-particle-effects-in-unreal-engine#%E8%A7%A6%E5%8F%91%E6%95%88%E6%9E%9C)，有两种主要的触发方式。

### 持续效果

对于无限循环的效果，你需要创建 **激活（Activate）** 和 **停用（Deactivate）** 关键帧。

首先，选择FX系统轨道，确保下拉菜单设置为 **激活（Activate）** ，然后按下 **Enter** 。这会在粒子系统轨道上设置一个 **激活（Activate）** 关键帧，用于在此时启用该效果。

![创建激活关键帧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bac08ced-ce6c-42d4-8fd1-165a4fba246e/activate1.gif)

接下来，拖动播放头，将其移到序列中靠后的某个位置。然后，点击FX系统轨道上的下拉菜单并选择 **停用（Deactivate）** 。这会设置 **停用（Deactivate）** 关键帧，用于在此时禁用该效果。

![创建停用关键帧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd884212-28cc-46f3-bd49-3fd4400e10cc/deactivate.gif)

现在，当你播放序列时，应该会看到粒子在对应的关键帧激活与停用。

![播放效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2670bdf-a2c2-4581-ad08-c6230e4c47f2/regionplay.gif)

### 触发效果

若效果仅需播放一次，不需无限循环，你可以使用 **触发（Trigger）** 关键帧。

首先，点击FX系统轨道上的下拉菜单，选择 **触发（Trigger）** 。这会将关键帧的类型更改为触发（Trigger），它没有启用/禁用状态。

![设置触发模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc5f34d7-34b0-4640-9749-3bfc62cdad4c/triggerstate.png)

接下来，选择 **FX系统（FX System）** 轨道并按下 **Enter** 以放置关键帧。现在你应该会看到效果播放。

![创建触发关键帧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26ff4659-1cd1-42e8-9b4c-2abdf58ebd38/trigger1.gif)

你可以酌情为粒子系统设置任意数量的 **触发（Trigger）** 关键帧。它们都将在播放序列时通过对应的关键帧触发。

![多个触发关键帧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba8ee89f-2dc3-4719-9c08-9b290ff04165/trigger2.gif)

## 为参数制作动画

如果你的Niagara系统包含[用户公开的参数](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine#%E5%8F%82%E6%95%B0%E5%92%8C%E5%8F%82%E6%95%B0%E7%B1%BB%E5%9E%8B)，你也可以在Sequencer中为它们制作动画。

要访问参数，请点击NiagaraComponent0上的 **添加轨道（+）（Add Track (+)）** ，然后选择 **参数轨道（Parameter Track）** 。这会为参数添加兼容的[属性轨道](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine)。

![添加niagara参数轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a15525ac-6605-4763-81e2-574ce41b8fa0/param1.png)

接下来，选择参数轨道（Parameter Track）并按下Enter以创建关键帧，然后将播放头移动到其他位置并更改轨道上的属性数值，以便为该数值设置新的关键帧。你现在可以播放该序列以查看参数动画。

![为niagara参数制作动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21ce78d3-74cc-4b97-9495-be194a4bd31e/param2.gif)

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/how-to-trigger-cinematic-particle-effects-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [将效果添加到Sequencer](/documentation/zh-cn/unreal-engine/how-to-trigger-cinematic-particle-effects-in-unreal-engine#%E5%B0%86%E6%95%88%E6%9E%9C%E6%B7%BB%E5%8A%A0%E5%88%B0sequencer)
-   [激活效果](/documentation/zh-cn/unreal-engine/how-to-trigger-cinematic-particle-effects-in-unreal-engine#%E6%BF%80%E6%B4%BB%E6%95%88%E6%9E%9C)
-   [持续效果](/documentation/zh-cn/unreal-engine/how-to-trigger-cinematic-particle-effects-in-unreal-engine#%E6%8C%81%E7%BB%AD%E6%95%88%E6%9E%9C)
-   [触发效果](/documentation/zh-cn/unreal-engine/how-to-trigger-cinematic-particle-effects-in-unreal-engine#%E8%A7%A6%E5%8F%91%E6%95%88%E6%9E%9C)
-   [为参数制作动画](/documentation/zh-cn/unreal-engine/how-to-trigger-cinematic-particle-effects-in-unreal-engine#%E4%B8%BA%E5%8F%82%E6%95%B0%E5%88%B6%E4%BD%9C%E5%8A%A8%E7%94%BB)

相关文档

[

创建视觉效果

![创建视觉效果](https://dev.epicgames.com/community/api/documentation/image/19dab511-9b5c-4eb2-b8bd-199fb41c7e81?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine)
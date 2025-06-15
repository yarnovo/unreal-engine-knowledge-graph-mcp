# 如何在虚幻引擎中将动画应用到角色 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-add-cinematic-animation-to-a-character-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:10:34.237Z

---

目录

![将动画应用到角色](https://dev.epicgames.com/community/api/documentation/image/a1d000fd-9c0e-4699-a416-0a960dc6d9f9?resizing_type=fill&width=1920&height=335)

本文从初学者角度介绍了如何在Sequencer中制作骨骼网格体动画，适合刚接触Sequencer和虚幻引擎的新手。

#### 先决条件

-   你已通读 [Sequencer基础](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine) 页面，并且已经在关卡中创建和打开 **关卡序列**。
-   你的项目包含一个[骨骼网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)和[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)。如果没有，你可以使用[第三人称模板](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine)模板创建一个项目，其中已经包含了骨骼网格体和动画。

## 添加角色到Sequencer

首先，为你的关卡添加一个角色。在[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)中找到资产并将其拖到你的关卡中。

![添加骨骼网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9453da4b-6b7f-4b68-85a7-48a244b64477/addchar1.png)

然后，打开序列并选择角色，点击 **添加轨道+（Add Track+）** 按钮并选择 **Actor到Sequencer（Actor to Sequencer）>添加'SKM\_Manny2'（Add 'SK\_Mannequin'）**。这样会将引用该角色的轨道添加到你的序列中。

![角色添加Sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9151ad86-5f1c-4af8-9647-8fe79d0e17db/addchar2.png)

当骨骼网格体轨道添加到序列时，系统会[自动](/documentation/zh-cn/unreal-engine/cinematic-actor-tracks-in-unreal-engine#automatictrackcreation)为此Actor添加合适的轨道。在此示例中，[动画](/documentation/zh-cn/unreal-engine/cinematic-animation-track-in-unreal-engine)和[变换](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine)轨道就是自动创建的。

## 将动画应用到角色

点击动画轨道上的 **添加动画+（Add Animation+）** 按钮。这将列出与你的角色骨架兼容的所有可用动画。选择其中一个动画，将其添加到你的序列中。

![添加动画Sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66689feb-c2bb-47f9-bdcc-40328aed02f3/addanim.png)

添加动画后，点击 **播放** 可预览序列。如果动画需要继续超过当前端点，可以拖动剪辑片段的边缘来扩展它。

![播放角色动画Sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cd495fa-f159-4e57-8b91-b999a7a1879e/play.gif)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [character](https://dev.epicgames.com/community/search?query=character)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/how-to-add-cinematic-animation-to-a-character-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [添加角色到Sequencer](/documentation/zh-cn/unreal-engine/how-to-add-cinematic-animation-to-a-character-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E8%A7%92%E8%89%B2%E5%88%B0sequencer)
-   [将动画应用到角色](/documentation/zh-cn/unreal-engine/how-to-add-cinematic-animation-to-a-character-in-unreal-engine#%E5%B0%86%E5%8A%A8%E7%94%BB%E5%BA%94%E7%94%A8%E5%88%B0%E8%A7%92%E8%89%B2)
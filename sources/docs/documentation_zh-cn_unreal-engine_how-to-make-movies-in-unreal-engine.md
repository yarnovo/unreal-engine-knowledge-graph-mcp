# 如何在虚幻引擎中创建动画 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:10:10.509Z

---

目录

![Sequencer基础](https://dev.epicgames.com/community/api/documentation/image/fb01696f-e610-49e1-b9df-4f85063b0352?resizing_type=fill&width=1920&height=335)

本文介绍了在虚幻引擎中用 **Sequencer** 创建过场动画和时间触发器的基础知识。

## 什么是Sequencer?

Sequencer是虚幻引擎的过场动画编辑器，允许用户为动画角色、摄像机、各种属性以及其他Actor制作动画。它提供了一个非线性的编辑环境，允许你按时间轴创建、修改轨道和关键帧。

关于Sequencer的概述及其主要功能，请参阅[Sequencer概述](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)。

![What is Sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97597671-45c7-4afe-9088-4ec48cb554c6/whatis.gif)

## 如何创建序列和打开Sequencer

使用Sequencer时，需要你先创建 **关卡序列资产（Level Sequence Asset）**。这些资产保存在[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)中，供 **关卡序列Actor（level sequence actor）** 引用，从而将Sequencer的数据绑定到关卡中。

![Level Sequence Asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71495b59-eb51-46ec-9648-e0f0d8d37a4d/sequenceasset.png)

你可以使用以下任一方法创建关卡序列T：

-   点击[主工具栏](/documentation/zh-cn/unreal-engine/unreal-editor-interface)中的过场动画图表，选择 **添加关卡序列（Add Level Sequence）**。
-   在内容浏览器中点击右键空白区域，选择 **过场动画（Cinematics） > 关卡序列（Level Sequence）**.

![Create Sequence](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a02f9ac-8993-401b-ba94-77796304b383/createseq.png)

点击项目中的任意关卡序列即可打开Sequencer。**Sequencer编辑器** 会在虚幻编辑器窗口底部打开。

![Sequence Open](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c7952bd-a077-47be-9b14-95909aefa69b/seqopen.png)

## 如何用Sequencer创建内容？

以下指南将介绍Sequencer中的常见操作。

[

![创建摄像机动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f5de74f-0824-4527-b04a-814246017ec0/placeholder_topic.png)

创建摄像机动画

关于如何在Sequencer中创建摄像机动画的入门探索。





](/documentation/zh-cn/unreal-engine/how-to-animate-cinematic-cameras-in-unreal-engine)[

![将动画应用到角色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59dc5111-53e4-4913-9d7a-01affe62a758/placeholder_topic.png)

将动画应用到角色

关于如何在Sequencer中添加角色动画的入门探索。





](/documentation/zh-cn/unreal-engine/how-to-add-cinematic-animation-to-a-character-in-unreal-engine)[

![制作光源动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c14482f-b589-4344-b4b2-9e7a14fdfc9a/placeholder_topic.png)

制作光源动画

关于如何在Sequencer中制作光源动画的入门探索。





](/documentation/zh-cn/unreal-engine/how-to-animate-lights-in-unreal-engine)[

![启用粒子](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d47d45b9-a601-433a-b344-3b8083265b71/topicimage.png)

启用粒子

关于如何在Sequencer中启用不同类型的粒子的入门探索。





](/documentation/zh-cn/unreal-engine/how-to-trigger-cinematic-particle-effects-in-unreal-engine)

-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [keyframe animation](https://dev.epicgames.com/community/search?query=keyframe%20animation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [什么是Sequencer?](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine#%E4%BB%80%E4%B9%88%E6%98%AFsequencer?)
-   [如何创建序列和打开Sequencer](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine#%E5%A6%82%E4%BD%95%E5%88%9B%E5%BB%BA%E5%BA%8F%E5%88%97%E5%92%8C%E6%89%93%E5%BC%80sequencer)
-   [如何用Sequencer创建内容？](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine#%E5%A6%82%E4%BD%95%E7%94%A8sequencer%E5%88%9B%E5%BB%BA%E5%86%85%E5%AE%B9%EF%BC%9F)
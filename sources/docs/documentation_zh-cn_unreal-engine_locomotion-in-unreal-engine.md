# 虚幻引擎中的移动 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/locomotion-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:05:59.604Z

---

目录

![移动](https://dev.epicgames.com/community/api/documentation/image/66c7f85c-d681-4ba4-b5c9-894fe463d66f?resizing_type=fill&width=1920&height=335)

在 **虚幻引擎** 中，角色 **移动（Locomotion）** 建立在[角色对象](/documentation/zh-cn/unreal-engine/setting-up-a-character-in-unreal-engine)、[移动](/documentation/zh-cn/unreal-engine/movement-components-in-unreal-engine)和[动画](/documentation/zh-cn/unreal-engine/animation-assets-and-features-in-unreal-engine)播放的基础之上。此基础受到移动工具的支持，你可以使用这些工具将角色移动行为与反应和动态动画同步。

本文档简要介绍了虚幻引擎中的角色移动工具。

## 根骨骼运动

启用 **根骨骼运动** 后，角色的移动可以使用根骨骼中的运动数据通过动画序列来驱动。启用 **根骨骼运动** 的动画将在关卡中打造更逼真、更现实的移动行为和互动。

![启用根骨骼运动的动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cae5e32f-7d4e-476d-a7b8-cc7a02310ce5/recursiverootmotion.gif)

阅读以下文档，了解如何使用根骨骼运动通过动画播放来驱动角色的移动。

[](/documentation/zh-cn/unreal-engine/root-motion-in-unreal-engine)

[![根运动](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f240c01-92f4-4f32-8166-d9d35dec417f/topicimage.png)](/documentation/zh-cn/unreal-engine/root-motion-in-unreal-engine)

[根运动](/documentation/zh-cn/unreal-engine/root-motion-in-unreal-engine)

[介绍虚幻引擎中的根运动。](/documentation/zh-cn/unreal-engine/root-motion-in-unreal-engine)

## 姿势扭曲

你可以启用 **姿势扭曲（Pose Warping）** ，以使用[根骨骼运动](/documentation/zh-cn/unreal-engine/locomotion-in-unreal-engine#%E6%A0%B9%E9%AA%A8%E9%AA%BC%E8%BF%90%E5%8A%A8)动态调整角色的动画姿势来契合角色移动。使用姿势扭曲时，你可以使用更少的单独动画来达到与之前相同程度的动画移动覆盖。这可减少项目对动画指示型Gameplay的依赖性，并允许动画和Gameplay调整在开发期间同步演化。

![姿势扭曲演示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39f09e95-db4c-4cee-be57-e6e0f39b4952/posewarpdemo.gif)

阅读以下文档，了解姿势扭曲和示例实现。

[](/documentation/zh-cn/unreal-engine/pose-warping-in-unreal-engine)

[![姿势扭曲](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1c8c08a-365a-4c01-9a90-e8441dc2f39b/topicimage.png)](/documentation/zh-cn/unreal-engine/pose-warping-in-unreal-engine)

[姿势扭曲](/documentation/zh-cn/unreal-engine/pose-warping-in-unreal-engine)

[姿势扭曲会动态扭曲角色的动画姿势以契合胶囊体移动。](/documentation/zh-cn/unreal-engine/pose-warping-in-unreal-engine)

## 运动扭曲

使用 **运动扭曲** 时，你可以动态扭曲角色动画的窗口，以契合[根骨骼运动](/documentation/zh-cn/unreal-engine/locomotion-in-unreal-engine#%E6%A0%B9%E9%AA%A8%E9%AA%BC%E8%BF%90%E5%8A%A8)或契合已分配的 **扭曲目标** 。通过该功能，你可以减少对手动创建和微调动画来适应特定对象互动的依赖，你可以应用逻辑以调整基础动画，从而适应预先建立的条件。

![用于扭曲目标的运动扭曲动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4c85f38-4275-485c-b9a3-24a7e0529de4/motionwarpingresult.gif)

在以下文档中，你可以进一步阅读运动扭曲并了解示例工作流程。

[](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine)

[![运动扭曲](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ed30c73-cb67-46d1-870a-1212b256223d/topicimage.png)](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine)

[运动扭曲](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine)

[深入探讨虚幻引擎中动画的运动扭曲。](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine)

## 距离匹配

使用 **距离匹配** 时，你可以使用到目标或从目标出发的距离计算值来驱动动画序列。距离匹配可以使动画播放契合角色速度，从而减少在改变角色行为时手动调整动画的必要。

![距离匹配动画姿势选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dcaa3c4f-7039-494f-864d-a70f86bfd963/lyradistancematchingdemo.gif)

阅读以下文档，了解距离匹配并查看示例工作流程。

[](/documentation/zh-cn/unreal-engine/distance-matching-in-unreal-engine)

[![距离匹配](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/864f4215-aebb-47a3-bc08-b324d01e5218/topicimage.png)](/documentation/zh-cn/unreal-engine/distance-matching-in-unreal-engine)

[距离匹配](/documentation/zh-cn/unreal-engine/distance-matching-in-unreal-engine)

[通过一个示例工作流程实现，深入探讨虚幻引擎中的距离匹配。](/documentation/zh-cn/unreal-engine/distance-matching-in-unreal-engine)

-   [animation](https://dev.epicgames.com/community/search?query=animation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [根骨骼运动](/documentation/zh-cn/unreal-engine/locomotion-in-unreal-engine#%E6%A0%B9%E9%AA%A8%E9%AA%BC%E8%BF%90%E5%8A%A8)
-   [姿势扭曲](/documentation/zh-cn/unreal-engine/locomotion-in-unreal-engine#%E5%A7%BF%E5%8A%BF%E6%89%AD%E6%9B%B2)
-   [运动扭曲](/documentation/zh-cn/unreal-engine/locomotion-in-unreal-engine#%E8%BF%90%E5%8A%A8%E6%89%AD%E6%9B%B2)
-   [距离匹配](/documentation/zh-cn/unreal-engine/locomotion-in-unreal-engine#%E8%B7%9D%E7%A6%BB%E5%8C%B9%E9%85%8D)
# 虚幻引擎中关于类的创建的基础知识 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/class-creation-basics-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:46:18.972Z

---

目录

![类创建基础知识](https://dev.epicgames.com/community/api/documentation/image/fda3fd4f-8e87-4381-a9c9-c7a7db93f3cb?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a05b792-7d58-402e-8f6e-9ab44331481e/lightswitchactor.png)

这些示例展示了如何仅使用蓝图、仅使用C++代码以及同时使用C++代码和蓝图创建新类。目标是分别使用这三种工作流程创建具有相同属性和行为的新LightSwitch类，然后将每个新类的一个实例添加到关卡中，这样关卡中就具有三个新LightSwitch Actor。

LightSwitch类直接基于Actor类，因为这些类的主要要求是它们可被放置在关卡中。它们各自包含一个PointLightComponent（根组件）和一个SphereComponent（PointLightComponent的子项）。每个LightSwitch类都还包含一个名称为DesiredIntensity的变量，用于设置PointLightComponent的强度。最后，这些类的默认行为是当玩家进入或离开SphereComponent时，PointLightComponent的可视性会切换。

## 示例

[](/documentation/zh-cn/unreal-engine/blueprints-only-example)

[![仅使用蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f6897fa-ba76-441b-b3e2-1e79fb4bf5c2/bp_only_topic.png)](/documentation/zh-cn/unreal-engine/blueprints-only-example)

[仅使用蓝图](/documentation/zh-cn/unreal-engine/blueprints-only-example)

[适用于刚开始使用虚幻引擎的Gameplay程序员的入门级信息。](/documentation/zh-cn/unreal-engine/blueprints-only-example)

[

![仅使用C++的示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac6f111e-a1bd-44d4-b948-08bde00939c5/code_only_topic.png)

仅使用C++的示例

为使用虚幻引擎的游戏开发入门人员提供的入门信息。





](/documentation/zh-cn/unreal-engine/cpp-only-example)[

![C++和蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a455e55-51a4-48e7-ad18-210ef9cceaa4/both_topic.png)

C++和蓝图

向初识虚幻引擎的游戏程序员讲解相关信息。





](/documentation/zh-cn/unreal-engine/cpp-and-blueprints-example)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [示例](/documentation/zh-cn/unreal-engine/class-creation-basics-in-unreal-engine#%E7%A4%BA%E4%BE%8B)
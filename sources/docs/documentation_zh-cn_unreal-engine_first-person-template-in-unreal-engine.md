# 虚幻引擎中的第一人称模板 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/first-person-template-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:52:47.833Z

---

目录

![第一人称模板](https://dev.epicgames.com/community/api/documentation/image/ecdfc400-0aa4-4a6e-8566-e77b761acad0?resizing_type=fill&width=1920&height=335)

当你创建新项目时，**虚幻引擎（Unreal Engine）** 会向你提供模板列表，供你选择。这些模板包含一些可立即使用的资产，例如关卡几何体、你可以控制的角色以及简单的角色动画。许多教程将其中一款模板用作起始点。

在 **第一人称** 游戏中，玩家从他们扮演角色的视点来查看游戏。一些第一人称游戏会显示角色模型的某部分，例如角色的手臂或武器。这与[第三人称游戏](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine)不同，在后者中，你可以从角色背后略上方的位置看到角色动作。

虚幻引擎5的 **第一人称** 模板包含以下内容：

-   一个玩家可以控制的第一人称角色，可以移动和射击。
-   一把可以发射子弹并被捡起的枪。
-   一个带有基本几何体（斜坡、平台等）的关卡。
-   会对角色及子弹的撞击做出反应的立方体。

## 创建第一人称项目

启动虚幻引擎5会打开 **项目浏览器（Project Browser）** 窗口，你可以在其中选择打开现有的虚幻项目，或创建新项目。要创建第一人称项目，请选择左侧的 **游戏（Games）** 类别，然后选择 **第一人称（First Person）** 模板。

![在虚幻引擎5中创建新的第一人称项目。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31aa6a00-0aa1-44a7-9f28-c58092c11e2d/create-new-project.png)

在虚幻引擎5中创建新的第一人称项目。

你可以为第一人称项目配置几个附加设置。有关这些内容的概述，请参阅[新建项目](/documentation/zh-cn/unreal-engine/creating-a-new-project-in-unreal-engine)页面。

如果你想要一些现成的对象来填充你的关卡，请在配置项目设置（Project Settings）时，选择 **带初学者内容包（With Starter Content）** 选项。在你熟悉虚幻引擎中的功能按钮和工作流程的过程中，这些选项非常有帮助。

完成这些步骤后，你应该拥有一个基本关卡，并带有一个可以控制的第一人称角色。你可以通过鼠标和键盘控制人物。

试试你的新关卡吧！在主工具栏（Main Toolbar）中，点击 **运行（Play）**，然后尝试四处移动，并射击一些立方体。

使用WASD键来移动角色，移动鼠标来观察四周。走到枪面前并捡起，然后点击鼠标左键来发射子弹。

## 模板内容

第一人称模板包含了创建第一人称射击游戏或者任何第一人称体验所需的所有基本元素。以下小节将会详细介绍这些元素并且指出如何在 **内容浏览器（Content Browser）** 中找到它们。

### 蓝图

第一人称模板包含以下蓝图：

-   玩家角色蓝图
    
-   步枪蓝图
    
-   步枪子弹蓝图
    
-   游戏模式蓝图
    

这些蓝图位于 `Content/FirstPerson/Blueprints` 文件夹中。

每个蓝图的 **事件图表（Event Graph）** 都包含注释和标注，可以帮助用户学习不同节点组的功能和背后的实现逻辑。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb426bc3-1786-40e1-8223-00e25e290c48/bp_rifle-blueprint.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb426bc3-1786-40e1-8223-00e25e290c48/bp_rifle-blueprint.png)

这里可以看到 BP\_Rifle 蓝图中的开发者注释。点击查看大图。

### 第一人称角色

用于玩家角色的资产位于 `Content/FirstPersonArms` 文件夹。这里可以找到骨骼网格体、材质、纹理以及角色使用的动画。

### 步枪和子弹

`Content/FPWeapon` 文件夹包含了步枪和子弹使用的资产。步枪使用骨骼网格体 (**SK\_FPGun**)。子弹随着鼠标左键点击生成，并且向关卡中撞击的任何启用物理的Actor施加物理冲击。你可以在 `Content/FirstPerson/Blueprints` 文件夹里的 **BP\_FirstPersonProjectile** 蓝图中看到该逻辑如何实现。

### 关卡

组成关卡几何体的资产 (静态网格体、材质和纹理) 位于 `Content/LevelPrototyping` 文件夹。

## 改进你的项目

现在你有了一个可游玩的关卡，就可以向其中导入内容并且进行调整来让你的游戏更加有趣。

向关卡中添加内容最简单的方法是将其从 **内容浏览器（Content Browser）** 中拖入。如果你在创建项目时选择包含了 **初学者内容（starter content）** ，你应该已经有了一些可以拖入关卡的额外内容。

更多关于如何充实关卡的详细教程，可以参考[关卡设计师快速入门](/documentation/zh-cn/unreal-engine/level-designer-quick-start-in-unreal-engine)。

## 接下来呢？

你已经了解创建第一人称体验的基础知识，以下是你可以尝试的其他一些内容：

-   为你的枪[导入和配置](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine)不同的模型，或选择完全不同的武器。你可以从[Fab](https://www.fab.com)下载预制资产，或创建自己的资产。
    
-   试着用[Quixel Bridge](/documentation/zh-cn/unreal-engine/quixel-bridge-plugin-for-unreal-engine)中的免费资产丰富你的关卡。你可以用它们来搭建各种室内外场景，并且素材库中的资产会不断丰富。
    
-   使用[后期处理](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)为你的游戏添加一些特别的视觉效果，例如运动模糊或晕影。
    
-   使用[虚幻运动图形（UMG）](/documentation/zh-cn/unreal-engine/umg-editor-reference-for-unreal-engine)创建游戏内平视显示器（HUD），显示玩家生命值和弹药数量等信息。
    
-   使用[行为树](/documentation/zh-cn/unreal-engine/behavior-trees-in-unreal-engine)添加AI角色。你可以将其设置为追逐、逃跑、帮助或伤害玩家。
    

-   [templates](https://dev.epicgames.com/community/search?query=templates)
-   [first person](https://dev.epicgames.com/community/search?query=first%20person)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建第一人称项目](/documentation/zh-cn/unreal-engine/first-person-template-in-unreal-engine#%E5%88%9B%E5%BB%BA%E7%AC%AC%E4%B8%80%E4%BA%BA%E7%A7%B0%E9%A1%B9%E7%9B%AE)
-   [模板内容](/documentation/zh-cn/unreal-engine/first-person-template-in-unreal-engine#%E6%A8%A1%E6%9D%BF%E5%86%85%E5%AE%B9)
-   [蓝图](/documentation/zh-cn/unreal-engine/first-person-template-in-unreal-engine#%E8%93%9D%E5%9B%BE)
-   [第一人称角色](/documentation/zh-cn/unreal-engine/first-person-template-in-unreal-engine#%E7%AC%AC%E4%B8%80%E4%BA%BA%E7%A7%B0%E8%A7%92%E8%89%B2)
-   [步枪和子弹](/documentation/zh-cn/unreal-engine/first-person-template-in-unreal-engine#%E6%AD%A5%E6%9E%AA%E5%92%8C%E5%AD%90%E5%BC%B9)
-   [关卡](/documentation/zh-cn/unreal-engine/first-person-template-in-unreal-engine#%E5%85%B3%E5%8D%A1)
-   [改进你的项目](/documentation/zh-cn/unreal-engine/first-person-template-in-unreal-engine#%E6%94%B9%E8%BF%9B%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE)
-   [接下来呢？](/documentation/zh-cn/unreal-engine/first-person-template-in-unreal-engine#%E6%8E%A5%E4%B8%8B%E6%9D%A5%E5%91%A2%EF%BC%9F)

相关文档

[

运行和模拟

![运行和模拟](https://dev.epicgames.com/community/api/documentation/image/1b10ee72-f9fc-4135-8030-366605b4187a?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/playing-and-simulating-in-unreal-engine)

[

静态网格体Actor

![静态网格体Actor](https://dev.epicgames.com/community/api/documentation/image/1f2f01df-58da-49ba-9596-1380aab3b9d2?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/static-mesh-actors-in-unreal-engine)

[

骨骼网格体Actor

![骨骼网格体Actor](https://dev.epicgames.com/community/api/documentation/image/6aa43e29-f3b2-4b7a-95bc-39fd627d5ab6?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/skeletal-mesh-actors-in-unreal-engine)
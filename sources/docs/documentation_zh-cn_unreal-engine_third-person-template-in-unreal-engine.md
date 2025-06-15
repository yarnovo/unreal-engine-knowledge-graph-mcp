# 虚幻引擎中的第三人称模板 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:52:51.128Z

---

目录

![第三人称模板](https://dev.epicgames.com/community/api/documentation/image/226cb376-5f39-4c2b-b817-92da59bf59bc?resizing_type=fill&width=1920&height=335)

当你创建新项目时，**虚幻引擎（Unreal Engine）** 会向你提供模板列表，供你选择。这些模板包含一些可立即使用的资产，例如关卡几何体、你可以控制的角色以及简单的角色动画。许多教程将其中一款模板用作起始点。

在 **第三人称** 游戏中，玩家从位于固定距离以外、稍高于其角色的摄像机查看游戏世界。在虚幻引擎中，你可以控制摄像机距离和位置，并根据需要进行调整。

虚幻引擎5中的 **第三人称** 模板包含以下元素：

-   可操作的第三人称角色，可以移动和跳跃。
-   角色的额外网格体。
-   带有基本几何体（斜坡、平台等）的关卡。
-   会对角色的撞击做出反应的启用物理的立方体。

模板还包括经过重新设计的人体模特。

## 创建第三人称项目

启动虚幻引擎5会打开 **项目浏览器（Project Browser）** 窗口，你可以在其中选择打开现有的虚幻项目，或创建新项目。要创建第三人称项目，请选择左侧的 **游戏（Games）** 类别，然后选择 **第三人称（Third Person）** 模板。

![在虚幻引擎5中创建新的第三人称项目。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eaf88c2f-12ae-4c84-b725-57e752f82981/create-new-project.png)

在虚幻引擎5中创建新的第三人称项目。

你可以为第三人称项目配置几个额外的设置。有关这些内容的概述，请参阅[新建项目](/documentation/zh-cn/unreal-engine/creating-a-new-project-in-unreal-engine)页面。

如果你想使用一些可立即使用的对象来填充关卡，请选择 **使用初学者内容包（With Starter Content）** 选项。在你熟悉虚幻引擎中的功能按钮和工作流程的过程中，这些选项非常有帮助。

执行这些步骤后，你应该有一个基本关卡，其中有一个你可以控制的第三人称角色。

何不试试你的新关卡？在主工具栏中，点击 **运行（Play）**。 使用WASD键移动角色，按下空格键跳起，移动鼠标查看周围环境。

## 模板内容

第三人称模板包含了简易第三人称体验的所有元素。可以以此为起点制作一个传统的角色扮演游戏（RPG）、第三人称射击游戏或者其它任何应用。以下部分详细介绍模板元素以及如何在 **内容浏览器（Content Browser）** 中找到它们。

### 第三人称角色

玩家角色使用的资产位于 `Content/Characters` 文件夹。默认情况下，第三人称模板初始带有一个女性的虚幻引擎5人体模特。该文件夹还有玩家角色的额外骨骼网格体，包括新的虚幻引擎5和旧版本虚幻引擎的人体模特的风格。

![虚幻引擎5人体模特](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a91f9d9-ed04-44dd-96e3-5596654a6608/ue5-mannequins.png)

虚幻引擎5人体模特

虚幻引擎5中新的人体模特叫做Manny和Quinn。

虚幻引擎5的人体模特还带有可以调整的 **多层次细节（Level of Detail (LOD)）** 设置。LOD可以帮助针对不同平台优化你的应用。例如，针对移动平台（安卓、iOS）的应用应该使用细节较少的角色模型。这样会改善你的应用在这些平台上的性能。控制人体模特LOD的数据资产位于 `Content/Characters/Mannequins/Meshes` 文件夹。

### 动画

UE5人体模特的动画位于 `Content/Characters/Mannequins/Animations` 文件夹。针对两个人体模特有两组动画。

动画蓝图使用了虚幻引擎5全新的[IK Rig](/documentation/zh-cn/unreal-engine/unreal-engine-ik-rig)系统。与以往的版本不同，IK Rig可以用于动态修改基于姿势的解算器参数。以下截图便是一个例子：Quinn的脚部位置会根据她所处的地形动态调整。

![IK Rig动态姿势解算器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6634fc75-38ef-4a15-9df4-777ba8a3e779/ue5-mannequin-ik-rig.png)

要了解如何实现，可以查看 `Content/Mannequins/Rigs` 文件夹中的 **CR\_Mannequin\_BasicFootIK** rig。

同样位于 `Rigs` 文件夹中，**CR\_Mannequin\_Body** Control Rig资产可以用于直接在编辑器中轻易地为人体模特调整姿势和添加动画。要了解如何使用Control Rig调整姿势和添加动画，参考虚幻引擎5文档的[Control Rig](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine)分段。

### 关卡

组成关卡几何体的资产（静态网格体、材质和纹理）位于 `Content/LevelPrototyping` 文件夹中。

## 改进你的项目

现在你有了一个可游玩的关卡，就可以向其中导入内容并且进行调整来让你的游戏更加有趣。

### 角色

你可以通过修改 **静态网格体（Static Mesh）** 来改变角色的外观。举个例子，我们来改变默认的人体模特网格体。请执行以下步骤：

1.  在 **内容浏览器（Content Browser）** 中，找到 `Content/ThirdPerson/Blueprints` 然后双击 **BP\_ThirdPersonCharacter** 蓝图来在蓝图编辑器中将其打开。
    
    ![打开第三人称角色蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fbb8269-cd28-4202-936a-33b4da0007c0/open-third-person-character-bp.png)
2.  在蓝图编辑器中的 **组件（Components）** 面板，点击 **网格体（Mesh(CharacterMesh)）** 组件来将其选中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d064d25-1de5-4024-9a96-7f13d128db9d/select-character-mesh.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d064d25-1de5-4024-9a96-7f13d128db9d/select-character-mesh.png)
    
    点击查看大图。
    
3.  选中 **网格体（Mesh(CharacterMesh)）** 组件后，找到蓝图编辑器右侧的 **详情（Details）** 面板。然后，在 **网格体（Mesh）** 部分，点击 **骨骼网格体（Skeletal Mesh）** 参数旁的下拉菜单并从中选择 `SKM_Manny` 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6303cd3-65e5-4bdd-9829-8c7beca0f9f3/change-character-mesh.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6303cd3-65e5-4bdd-9829-8c7beca0f9f3/change-character-mesh.png)
    
    点击查看大图。
    
4.  仍然在 **详情（Details）** 面板中，找到 **动画（Animation）** 部分，设置以下选项：
    
    -   **动画模式（Animation Mode）**: 使用动画蓝图
    -   **动画类（Anim Class）**: ABP\_Manny
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a3237ba-cbe4-442c-b685-cc5464bf7026/change-animation-bp.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a3237ba-cbe4-442c-b685-cc5464bf7026/change-animation-bp.png)
    
    点击查看大图。
    
5.  **编译（Compile）** 并 **保存（Save）** 蓝图。
    
    ![编译并保存蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f68ebf9-1570-4761-895d-0e61136c0324/compile-save-blueprint.png)
6.  点击 **视口（Viewport）** 选项卡来确认网格体是否已经更新。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba9617e5-1c23-4ce3-9c28-3937809e1379/viewport-confirmation.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba9617e5-1c23-4ce3-9c28-3937809e1379/viewport-confirmation.png)
    
    点击查看大图。
    

你的角色已经可以跑和跳，而你还可以添加其他类型的 **角色运动**，如行走或蹲伏。有关详细的教程，请参阅[设置角色动作](/documentation/zh-cn/unreal-engine/setting-up-character-movement)。

### 关卡

你的关卡已经有一些简单的几何体，如楼梯和平台。在里面添加更多内容的最简单方法是从 **内容浏览器（Content Browser）** 进行拖放。

如果你在创建项目时选择包括 **初学者内容包（starter content）**，你应该已经可以将一些东西拖放到关卡中。

有关如何填充关卡的更深入说明，请参阅[关卡设计师快速入门](/documentation/zh-cn/unreal-engine/level-designer-quick-start-in-unreal-engine)。

## 接下来呢？

现在你已掌握了创建第三人称体验的基础知识，可以尝试下面的其他一些内容：

-   为你的玩家角色[导入和配置](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine)不同的模型。你可以从[Fab](https://www.fab.com)下载预制角色，或[使用MetaHuman](https://docs.metahuman.unrealengine.com/zh-CN/retargeting-animations-to-a-metahuman-at-runtime/)。
    
-   试着用[Quixel Bridge](/documentation/zh-cn/unreal-engine/quixel-bridge-plugin-for-unreal-engine)中的免费资产丰富你的关卡。你可以用它们来搭建各种室内外场景，并且素材库中的资产会不断丰富。
    
-   使用[后期处理](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)将一些花式视觉效果添加到你的游戏中，例如动作模糊或渐晕。
    
-   使用[UMG](/documentation/zh-cn/unreal-engine/umg-editor-reference-for-unreal-engine)创建游戏内的抬头显示器(HUD)，以显示玩家生命值和武器数量等信息。
    
-   使用[行为树](/documentation/zh-cn/unreal-engine/behavior-trees-in-unreal-engine)添加AI角色。你可以将其设置为追逐、逃跑、帮助或伤害玩家。
    

-   [templates](https://dev.epicgames.com/community/search?query=templates)
-   [third person](https://dev.epicgames.com/community/search?query=third%20person)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建第三人称项目](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine#%E5%88%9B%E5%BB%BA%E7%AC%AC%E4%B8%89%E4%BA%BA%E7%A7%B0%E9%A1%B9%E7%9B%AE)
-   [模板内容](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine#%E6%A8%A1%E6%9D%BF%E5%86%85%E5%AE%B9)
-   [第三人称角色](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine#%E7%AC%AC%E4%B8%89%E4%BA%BA%E7%A7%B0%E8%A7%92%E8%89%B2)
-   [动画](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine#%E5%8A%A8%E7%94%BB)
-   [关卡](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine#%E5%85%B3%E5%8D%A1)
-   [改进你的项目](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine#%E6%94%B9%E8%BF%9B%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE)
-   [角色](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine#%E8%A7%92%E8%89%B2)
-   [关卡](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine#%E5%85%B3%E5%8D%A1-2)
-   [接下来呢？](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine#%E6%8E%A5%E4%B8%8B%E6%9D%A5%E5%91%A2%EF%BC%9F)

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
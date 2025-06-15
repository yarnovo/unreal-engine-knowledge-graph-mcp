# 在虚幻引擎中结合模拟父项使用运动学形体 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-kinematic-bodies-with-simulated-parents-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:51:15.456Z

---

目录

![结合模拟父项使用运动学形体](https://dev.epicgames.com/community/api/documentation/image/82265ad9-7295-4312-aa9e-ba696a7f092c?resizing_type=fill&width=1920&height=335)

[物理资产编辑器](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine) 提供了多种对物理形体进行模拟的方式，运动学物理形体结合模拟父项也是其中之一。 这使用户能够对由动画数据驱动的子形体进行定义，而这些形体的父项则由物理模拟数据所驱动。 这种技术十分实用于这类情况：设置角色吊在边缘或沿边缘攀行，对滚落的岩石或其他废墟作出反应，生成基于物理的反应动作。

在此指南中，我们使用带模拟父项的运动学形体生成角色悬吊在边缘的效果，而身体的其他部分则由物理进行模拟。

![We use kinematic bodies with simulated parents to generate the effect of a character hanging from a ledge while the rest of the body is simulated with physics](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7675467c-6c3f-4a96-ab37-cbd0450dd09e/end-result-image.png)

## 步骤

在此指南中，我们使用的是启用了 **Starter Content** 的 **Blueprint Third Person 模板** 项目。

1.  在项目的 **Content/Mannequin/Character/Mesh** 文件夹中，打开 **SK\_Mannequin\_PhysicsAsset**。
    
    ![Open the SKMannequinPhysicsAsset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3dcb2d5-3ed9-4cbf-b7a0-ce9979227d60/kinematic-how-to-01.png)
2.  在 **骨架树（Skeleton Tree）** 窗口中，按住 **Ctrl** 并同时选中 **hand\_l** 和 **hand\_r** 刚体，然后在 **细节（Details）** 面板中，将 **物理类型（Physics Type）** 改为 **运动学（Kinematic）**。
    
    ![Change the Physics Type to Kinematic](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/920d9943-543d-4098-9cb7-0534b97c8667/kinematic-how-to-03.png)
    
    通过将这些骨骼设为 Kinematic 后，它们将不再模拟物理，而是跟随动画数据。
    
    另一种方法是 **右键点击** 层级列表中的骨骼，并在右键菜单中展开 **Physics Type**，然后将 将 **物理类型（Physics Type）** 改为 **运动学（Kinematic）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd1d67c3-e20e-48df-86d2-768486fe57a0/kinematic-how-to-04.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd1d67c3-e20e-48df-86d2-768486fe57a0/kinematic-how-to-04.png)
    
    此选项可用于设置当前骨骼下子形体的 **Physics Type** 属性。
    
3.  点击视口中的空白位置取消选择所有骨骼，然后在 **Details** 面板中将 **Physics Update Mode** 改为 **Component Transform is Kinematic**。
    
    ![Change the Physics Update Mode to Component Transform is Kinematic](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ea527a8-d81d-4390-90c3-198ad21603e8/kinematic-how-to-05.png)
    
    此选项决定根形体的模拟是更新组件变形，或是动态学。
    
4.  在工具栏中，打开 **箭头图标（arrow icon）** 的下拉菜单，然后选择 **模拟（Simulate）**。
    
    ![Select Simulate](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ed267d5-2917-4997-8d30-a872a6c0aa59/kinematic-how-to-06.png)
    
    视口中的角色将呈蜷曲状，体现出用手臂悬吊的动作。
    
    ![The character in the viewport will slump over and appear to be hanging by their hands](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c419505d-0b3d-4515-8679-8b9c2f4b7524/kinematic-how-to-07.png)
5.  点击工具栏中的 **Animation** 选项图标，然后选择 **ThirdPersonJump\_Loop** 动画。
    
    ![Select the ThirdPersonJumpLoop animation](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b10370b3-ee6e-4bf9-9321-08e73c24d108/kinematic-how-to-08.png)
    
    角色双手将跟随 ThirdPersonJump\_Loop 运动中包含的动画数据来移动（因为它们已被设为运动学）。
    
    ![The hands will follow the animation data contained within the ThirdPersonJumpLoop motion](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/987dfffb-163b-4d2d-a1b6-6782e5a0457d/kinematic-how-to-09.png)
6.  在主编辑器窗口中将 **SK\_Mannequin\_PhysicsAsset** 拖入关卡，然后在 **Details** 面板中将 **Physics Transform Update Mode** 设为 **Component Transform is Kinematic**。
    
    ![Set Physics Transform Update Mode to Component Transform is Kinematic](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86ca1e8f-ea07-4d8e-a8ad-52245b49745f/kinematic-how-to-10.png)
7.  选择 **SkeletalMeshComponent**，然后将 **Animation Mode** 改为 **Use Animation Asset**、**Anim to Play** 改为 **ThirdPersonJump\_Loop**。
    
    ![Change Animation Mode to Use Animation Asset and Anim to Play to ThirdPersonJumpLoop](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a12181f7-f147-44d4-94ca-3423894fd5ed/kinematic-how-to-11.png)
8.  在工具栏中点击 **Play** 按钮即可在编辑器中进行游戏。
    

## 最终结果

以下视频中可以看到，我们在墙边缘放置了一个角色，操纵另一个角色撞向悬吊的角色时它会对物理形成响应，而双手则较为固定。

上方视频中使用的动画效果并不理想，以下视频中我们将相同的概念应用到了角色悬吊和攀行墙沿的动画上。

手臂和头部设为 Kinematic（金色框表示），而其他身体部位仍为模拟。

![The arms and head are set to Kinematic while the rest is being simulated](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b2388ec-708c-4fd9-b037-25a11df75691/example-setup.png)

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [kinematic](https://dev.epicgames.com/community/search?query=kinematic)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/using-kinematic-bodies-with-simulated-parents-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/using-kinematic-bodies-with-simulated-parents-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
# 物理约束组件的用户指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/physics-constraint-component-user-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:51:45.533Z

---

目录

![物理约束组件的用户指南](https://dev.epicgames.com/community/api/documentation/image/6d145a11-0c8d-4321-9987-bd53b5f6ab3d?resizing_type=fill&width=1920&height=335)

## 概述

物理约束组件（Physics Constraint Components）的使用方法和 **[物理约束 Actors](/documentation/zh-cn/unreal-engine/constraints-user-guide-in-unreal-engine)** 相同，不同之处是其在蓝图中使用，可在 C++ 中进行创建。物理约束组件结合了蓝图的灵活和 C++ 的强大，你可利用它对项目中的任意物理形体设置约束。

该文档讲述物理约束组件在蓝图中的基础创建。

理解该文档的前提是用户对 **蓝图** 和 **蓝图编辑器** 已有所了解。

## 用法

1.  创建用于约束的组件。便于展示，此例中使用两个引用静态网格体 `Shape_Cube` 的 **StaticMesh** 组件。
    
    ![Two StaticMesh Components referencing the StaticMesh ShapeCube will be used](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b34c3f76-b746-4f8c-b873-a3004e7c169e/physics-constraint-blueprint-cubes.png)
    
    你需要放置需要进行约束的组件。该指南中使用的是图中的这两个方块。
    
2.  为两个静态网格体组件中较低的组件启用 **模拟物理（Simulate Physics）**
    
    ![Enable Simulate Physics](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a448362f-fa39-42ec-852c-70d0920d457d/simulate-physics.png)
3.  点击 **添加组件（Add Component）**，找到 **物理约束（Physics Constraint）**。
    
    ![Click Add Component to find Physics Constraint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14eeb515-a728-4b20-b0f6-9a7e0f04dde0/physics-constraint-blueprint-add-constraint.png)
4.  将物理约束组件放置在约束连接点上。
    
    ![Position the Physics Constraint Component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95282a62-a966-48da-81f7-27fb8c28c585/physics-constraint-blueprint-location.png)
5.  你必须在物理约束组件的 **细节** 面板中，手动输入需要约束的静态网格体组件的名称。在 **Component Name 1** 的 **Component Name** 属性中输入需要约束的组件名。
    
    ![Type in the component name you wish to constrain in the Component Name 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1525aea-b469-4708-aaee-bb0d8ee2bc91/physics-constraint-blueprint-component-1.png)
6.  在 **Component Name 2** 的 **Component Name** 属性中输入需要约束的组件名。
    
    ![Type in the component name you wish to constrain in the Component Name 2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85684a09-0aac-43e6-a810-b6fc34ca7553/physics-constraint-blueprint-red-blue-2.png)
7.  选择物理约束组件，将其位置移到StableMesh组件的底部。这将把锚点设置在立方体的底部。
    
    ![Select the Physics Constraint component and move its location to the bottom of the StableMesh component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4217caae-e1cf-40f9-a576-cc4d4091e963/physics-constraint-blueprint-components.png)
    
    想了解物理约束组件上所有属性的影响吗？请查阅 **[%making-interactive-experiences/Physics/physics-constraints/ConstraintsReference:title%](/documentation/zh-cn/unreal-engine/physics-constraint-reference-in-unreal-engine)** 中的详细内容。
    
8.  如有必要，旋转物理约束组件，定义线和角的限度。
    
    ![Rotate the Physics Constraint Component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c14cf26-2b9b-4e53-86db-59f50c1f123b/physics-constraint-blueprint-rotated.png)
9.  将 **蓝图 Actor** 放置在关卡中的所需位置。
    
    ![Place the Blueprint Actor in a level and position it where you need it](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e020577-6063-4ffe-96f1-bac017696660/physics-constraint-blueprint-into-world.png)
10.  选择 **蓝图Actor**，进入 **细节** 面板。选择层级结构中的 **ConstrainedMesh** 组件，按照图片移动它。在这个示例中，**位置** 设置为 **X=-300**、**Z=100**。这将使约束网格在你按下**模拟**后摆动。
    
    ![Select Blueprint Actor and go to the Details panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a0a8aff-e162-448b-9ea1-c5356a5371a0/blueprint-actor-details.png)
11.  使用 **Simulate in Editor** 或 **Play in Editor** 进行测试。
    
    ![physics-constraint-blueprint-simulate](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e031213-7624-4ca3-a230-6e3220f58712/physics-constraint-blueprint-simulate.gif)

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [constraints](https://dev.epicgames.com/community/search?query=constraints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/physics-constraint-component-user-guide-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [用法](/documentation/zh-cn/unreal-engine/physics-constraint-component-user-guide-in-unreal-engine#%E7%94%A8%E6%B3%95)
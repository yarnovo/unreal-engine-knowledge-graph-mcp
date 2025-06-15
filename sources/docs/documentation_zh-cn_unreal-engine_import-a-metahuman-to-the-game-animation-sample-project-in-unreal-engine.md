# 将MetaHuman导入到虚幻引擎中的游戏动画示例项目 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/import-a-metahuman-to-the-game-animation-sample-project-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:49:02.176Z

---

目录

[游戏动画示例项目](/documentation/zh-cn/unreal-engine/game-animation-sample-project-in-unreal-engine)是一个示例项目，下载该项目后可访问一套动作捕获动画，以及了解如何在虚幻引擎中使用运动匹配。该项目包含一个示例MetaHuman，其中附带所有MetaHuman体型的预览网格体，你可以在游戏工具控件中启用它，以观察使用MetaHuman角色时系统是如何工作的。该示例项目是使用MetaHuman作为玩家角色并使用高保真动画系统的典型示例。

此外，建议你尝试导入和实现你自己的MetaHuman角色，观察系统如何为你自己的角色运行。你可以使用以下文档，了解如何在游戏动画示例项目中导入和实现你自己的MetaHuman角色。

#### 先决条件

-   你已下载并使用游戏动画示例项目模板创建了一个新项目。有关首次设置游戏动画示例项目的详情，请参阅[游戏动画示例项目](/documentation/zh-cn/unreal-engine/game-animation-sample-project-in-unreal-engine)文档。
    
-   你有一个想要在游戏动画示例项目中实现的MetaHuman角色。有关创建MetaHuman并将其添加到虚幻引擎项目的详情，请参阅以下文档。
    

%metahuman-creator:topic%

%downloading-and-exporting-metahumans:topic%

## 实现你的MetaHuman

1.  在内容浏览器中找到 `Content/Blueprints/RetargetedCharacters` 。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3904b19-1776-4364-84d6-c3459733dcca/image_0.png)

1.  找到 `CBP_SandboxCharacter_Metahuman_Kellan` 角色蓝图，右键单击以复制此资产，然后在上下文菜单中找到复制（Duplicate）选项。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db08b640-3c64-4edf-8b16-59f8b412b854/image_1.png)

1.  打开新复制的角色蓝图。
    
2.  在蓝图编辑器的组件面板中，选择 **身体（Body）** 骨骼网格体组件及其所有子组件和 **LODSync** 组件，然后使用删除键或右键单击所选组件然后从上下文菜单中选择 **删除（Delete）** 将其删除。
    

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4a9c79e-731f-4ae2-9664-6ef6fb548a24/image_2.png)

1.  打开你想要在游戏动画示例项目中作为玩家添加的MetaHuman蓝图。本例使用Danielle工作流程。
    
2.  再次选择身体，包括子组件和LODSync组件，右键单击所选组件，然后从上下文菜单中选择 **复制（Copy）** 。
    

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b197853-64fa-406b-a459-a8b969ad437a/image_3.png)

1.  选中并右键单击现有网格体组件，然后在上下文菜单中选择 **粘贴（Paste）** 选项，即可返回到角色蓝图并将组件粘贴到现有网格体组件上。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfc36d6a-2be2-4795-839f-543fa3b8771d/image_4.png)

1.  在 **组件（Components）** 面板中选择身体并将其拖至网格体，即可将身体网格体组件重设为蓝图网格体组件的子级。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ea2e5c4-0cec-4a2c-a562-37462299c6a9/image_5.png)

1.  选择身体组件以打开其 **细节（Details）** 面板，然后找到 **动画类（Anim Class）** 属性并选择 `ABP_GenericRetarget AnimBP` 动画蓝图。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c08db3ff-2b23-4921-9b7a-e608d0e352d4/image_6.png)

1.  此外，你需要向身体网格组件添加标签，让Retarget AnimBP知道新的身体类型。在 **细节（Details）** 面板中，找到组件标签（Component tags）属性，并使用 (**+**) **添加（Add）** 在数组中添加新元素。然后，使用数组的文本字段输入以下标签：

`RTG_UEFN_to_Metahuman_nrw`

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bced2bb-c376-4086-adac-6e12876f37f7/image_7.png)

1.  在蓝图编辑器中，打开 **视口（Viewport）** 面板。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/182fde87-0929-4842-810a-fd25d28b81b9/image_8.png)

1.  选择身体组件并向下变换网格体，将MetaHumans网格体与胶囊体组件对齐，使其双脚与胶囊体的按钮匹配，旋转MetaHuman，使其面向朝前的箭头。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7d90eb1-d4a9-4a92-910c-018cfb6cac35/image_9.png)

1.  接下来，你需要修复构造脚本。在 **我的蓝图（My Blueprint）** 面板中选择构造脚本，打开构造脚本，然后将每个组件拖至图形中，重新添加双脚（Feet）、双腿（Legs）和躯干（Torso）get引用变量，以便每个Enable Master Pose节点都有一个定义。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c06821de-8183-4912-88b4-d987e0177393/image_10.png)

1.  然后，在 **我的蓝图（My Blueprint）** 面板中打开 `EnableMasterPose` 函数，以重新绑定身体引用变量。将 **身体（Body）** 网格体组件拖至图形中，然后将其输出引脚连接到现有 **Set Leader Pose Component** 节点的 **Ne****w Leader Bone Component** 引脚。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19491fe5-e3e9-4698-a21e-52a4ceaed9e5/image_11.png)

1.  在设置和连接你的骨骼网格体引用变量后， **保存（Save）** 和 **编译（Compile）** 你的角色蓝图。

## 将你的角色添加到游戏动画控件

1.  打开游戏动画控件资产，你可以在 **内容（Content）** > **控件（Widgets）** 文件夹中找到它。
    
2.  在控件编辑器的 **设计器（Designer）** 面板中，复制其中一个角色图块，并将其粘贴到右边最后一个角色图块旁边。
    

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f78234f-a0be-4b5c-b8e6-d07312c4f5f0/image_12.png)

1.  选择你的新图块以打开其 **细节（Details）** 面板，然后在对象（Object）属性中，选择你使用资产选择菜单创建的 **角色蓝图（Character Blueprint）** 。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49b3f768-8482-4161-a3ac-bb82c78c74fc/image_13.png)

1.  最后， **保存（Save）** 和 **编译（Compile）** 游戏动画控件。

现在，你可以使用PIE播放项目，同时使用游戏动画控件中的新按钮，以使用项目的动画系统将玩家转换为新的MetaHuman角色。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [motion matching](https://dev.epicgames.com/community/search?query=motion%20matching)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/import-a-metahuman-to-the-game-animation-sample-project-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [实现你的MetaHuman](/documentation/zh-cn/unreal-engine/import-a-metahuman-to-the-game-animation-sample-project-in-unreal-engine#%E5%AE%9E%E7%8E%B0%E4%BD%A0%E7%9A%84metahuman)
-   [将你的角色添加到游戏动画控件](/documentation/zh-cn/unreal-engine/import-a-metahuman-to-the-game-animation-sample-project-in-unreal-engine#%E5%B0%86%E4%BD%A0%E7%9A%84%E8%A7%92%E8%89%B2%E6%B7%BB%E5%8A%A0%E5%88%B0%E6%B8%B8%E6%88%8F%E5%8A%A8%E7%94%BB%E6%8E%A7%E4%BB%B6)
# 虚幻引擎中的骨骼网格体资产 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:01:41.191Z

---

目录

![骨骼网格体](https://dev.epicgames.com/community/api/documentation/image/f86040b9-f271-45b9-8f33-8099601f8c15?resizing_type=fill&width=1920&height=335)

在 **虚幻引擎** 中创建角色时需要用到多种独特的资产，这些资产旨在渲染可视化的几何体、播放动画以及构建可实时控制角色行为的逻辑。 虚幻引擎中角色的基础资产是 **骨骼网格体** 资产，这种资产包含角色的一个可视化网格体（即角色的几何模型渲染结果），以及角色的一个包含骨骼数据（用于为角色制作动画）的[骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)。

![ImageAltText](skin.png)(convert:false)

骨骼网格体资产是在外部 **数字内容创作**（**DCC**）软件中创建的，并导出为 `.fbx` 文件。 然后将FBX文件[导入到虚幻引擎](/documentation/zh-cn/unreal-engine/importing-skeletal-meshes-using-fbx-in-unreal-engine)项目中。 将角色导入虚幻引擎后，可以在[骨骼网格体编辑器（Skeletal Mesh Editors）](/documentation/zh-cn/unreal-engine/animation-editors-in-unreal-engine)中查看和编辑骨骼网格体资产的组件，例如角色[网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-editor-in-unreal-engine)、[骨架](/documentation/zh-cn/unreal-engine/skeleton-editor-in-unreal-engine)、[物理资产](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine)和[动画序列](/documentation/zh-cn/unreal-engine/animation-sequence-editor-in-unreal-engine)属性。

如需详细了解如何将角色FBX文件导入虚幻引擎中，请参阅以下文档：

[](/documentation/zh-cn/unreal-engine/importing-skeletal-meshes-using-fbx-in-unreal-engine)

[![使用FBX方法导入骨骼网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/630157ea-11f1-45a1-9a36-09877c75472a/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/importing-skeletal-meshes-using-fbx-in-unreal-engine)

[使用FBX方法导入骨骼网格体](/documentation/zh-cn/unreal-engine/importing-skeletal-meshes-using-fbx-in-unreal-engine)

[学习导入骨骼网格体。](/documentation/zh-cn/unreal-engine/importing-skeletal-meshes-using-fbx-in-unreal-engine)

作为骨骼网格体资产导入到虚幻引擎中的FBX文件将包含角色的模型和骨架。 角色的骨架将以称为[骨架资产](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)的额外资产形式导入，可以在[骨架编辑器](/documentation/zh-cn/unreal-engine/skeleton-editor-in-unreal-engine)中查看和编辑该资产。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c977acd5-3eca-4327-bec3-57e322590d8b/ghost.png)

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2e6676a-4c7a-40ca-8115-79f383a68c0c/bones.png)

ImageAltText

ImageAltText

FBX文件还可以包含角色的动画，并与角色模型一起作为[动画序列资产](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)导入。 可以使用[动画序列编辑器（Animation Sequence Editor）](/documentation/zh-cn/unreal-engine/animation-sequence-editor-in-unreal-engine)查看和编辑动画序列。 在运行时可以使用[角色](/documentation/zh-cn/unreal-engine/characters-in-unreal-engine)和[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)在角色上动态播放动画序列资产，也可以使用[Sequencer](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)在创作的过场动画中使用这些资产。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f98e88c0-c255-48b1-8947-a39f2da6b1ab/uncompressedanimation.gif)

导入角色的骨骼网格体资产及其随附的骨架资产和动画序列后，可以将骨骼网格体资产直接添加到关卡中。 为了控制骨骼网格体资产（作为角色或其他不可操作角色和对象），必须创建角色蓝图并将骨骼网格体添加为[网格体组件](/documentation/zh-cn/unreal-engine/anatomy-of-a-blueprint-in-unreal-engine#%E7%BB%84%E4%BB%B6)，以便构建游戏和动画逻辑来管理其行为并组装其部件。

## 创建角色蓝图

根据角色和项目需求，可以通过多种方式构建角色蓝图，在这里可以按照构建简单角色蓝图的示例工作流程，将动画应用于关卡中的角色。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c970ef5-2a47-44b1-9dbf-bd1d99afe50f/characterbp.png)

要创建角色蓝图，请在 **内容浏览器（Content Browser）** 中导航，并使用 **（+）添加** **（(+) Add）** 按钮选择 **蓝图类（Blueprint Class）**。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c55b56b-807c-4cb4-bb4e-59b5100d0642/createblueprint.png)

然后选择"角色（Character）"类选项并选择"创建（Create）"。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4865cb3-8fd5-4b29-9eda-c08d795e3cbe/createcharacterbp.png)

在 **内容浏览器（Content Browser）** 中，指定角色蓝图资产的 **名称（Name）** 并 **打开（Open）** 该资产。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0708f739-5140-41ba-9c5c-4e77978e0264/bpasset.png)

在蓝图的 **组件（Components）** 面板中，选择 **网格体（Mesh）** 组件，然后在 **细节（Details）** 面板中导航到 **骨骼网格体（Skeletal Mesh）** 属性。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a1c7145-fd99-4204-a0c0-10e4d47e3185/selectmesh.png)

使用下拉菜单选择 **骨骼网格体** 资产。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc6c510c-a536-494f-a260-a622e77427c2/assignmesh.png)

在 **视口（Viewport）** 面板中放置骨骼网格体，使其与 **箭头（Arrow）** 和 **胶囊体（Capsule）** 组件对齐。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82edb36c-1b94-4243-8df6-5422d63fe683/repositionmesh.gif)

保存并编译蓝图后，可以将角色蓝图添加到关卡中。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50f9ab2a-cd98-4f83-956d-6c13a5926e9f/addbp.gif)

你可以使用角色蓝图的 **事件图表（Event Graph）** 和函数创建Gameplay功能选项和行为。

如需详细了解如何在虚幻引擎中设置角色，请参阅以下文档：

[](/documentation/zh-cn/unreal-engine/setting-up-a-character-in-unreal-engine)

[![设置角色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c639ee6-3951-483d-99c3-acd60d715d05/ue5_1-setting-up-a-character-topic.png)](/documentation/zh-cn/unreal-engine/setting-up-a-character-in-unreal-engine)

[设置角色](/documentation/zh-cn/unreal-engine/setting-up-a-character-in-unreal-engine)

[关于如何在虚幻引擎中设置基本角色或骨架网格体的高级概述。](/documentation/zh-cn/unreal-engine/setting-up-a-character-in-unreal-engine)

### 模块化角色

某些角色是使用多个骨骼网格体构建的，这些网格体表示角色的各个部件，并在关卡中组装形成网格体。 在创建可能改变服装或外观的角色时，或者创建的角色具有依赖于Gameplay场景或玩家成就的动态元素时，这种情况很常见。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0cd68fe7-7a08-4e96-a1a9-2d5fd74ded45/components.png)

如需详细了解如何在虚幻引擎中创建模块化角色，请参阅以下文档：

[](/documentation/zh-cn/unreal-engine/working-with-modular-characters-in-unreal-engine)

[![使用模块化角色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e722d3db-b13e-481e-9f11-589d543fb276/topicimage.png)](/documentation/zh-cn/unreal-engine/working-with-modular-characters-in-unreal-engine)

[使用模块化角色](/documentation/zh-cn/unreal-engine/working-with-modular-characters-in-unreal-engine)

[通过组合多个骨骼网格体组件来创建角色。](/documentation/zh-cn/unreal-engine/working-with-modular-characters-in-unreal-engine)

## 为骨骼网格体制作动画

动画序列可以在骨骼网格体的骨架资产上播放。 要播放动画，可以将角色蓝图的"网格体（Mesh）"组件的 **动画模式（Animation Mode）** 属性指定给 **使用动画资产（Use Animation Asset）**，然后在 **要播放的动画（Anim to Play）** 属性的下拉菜单中选择一个动画序列资产。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e39d7dd8-5633-4aff-92c4-9feb59353284/assignanim.gif)

保存并编译蓝图后，此动画将在关卡中的角色蓝图上播放。

### 动画蓝图

使用[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)可以创建动画逻辑（例如[混合空间](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine)）以便在关卡中的角色模型上播放动画序列。

要为骨骼网格体创建动画蓝图，请打开内容浏览器，选择 **添加（+）** **（Add (+)）** > **动画（Animation）** > **动画蓝图（Animation Blueprint）**，然后选择随骨骼网格体导入的骨架资产。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef2478b6-d433-4522-9268-3e80632d3057/createabp.png)

现在可以访问[动画图表（Anim Graph）](/documentation/zh-cn/unreal-engine/animation-workflow-guides-and-examples-in-unreal-engine)，该图表可以根据蓝图逻辑来动态选择动画序列以便在角色上播放。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4352391b-ad73-4a7e-a8e6-664f4825a1c2/animgraph2.gif)

### 为兼容的骨骼网格体制作动画

当多个骨骼网格体资产共享相同或非常相似的骨架结构时，可以将这些资产链接起来。 当骨架使用相同的命名规范共享类似结构时，可以手动设置骨架兼容性。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a927e092-ce9f-4f51-b6b1-04da91a9d8df/compat3.gif)

如需详细了解骨架兼容性和如何跨多个网格体共享动画，请参阅["骨架资产"文档的"共享骨架"小节](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine#%E5%85%B1%E4%BA%AB%E9%AA%A8%E6%9E%B6)。

### 非骨架动画

除了动画序列之外，还可以使用变形器动画技术为骨骼网格体资产的网格体制作动画。 变形器会对网格体的几何体而不是骨骼进行变换，从而创建更复杂的动画，例如面部表情、皮肤、布料或肌肉运动。

如需详细了解如何使用变形器为骨骼网格体制作动画，请参阅以下文档：

[](/documentation/zh-cn/unreal-engine/morph-target-previewer)

[![变形目标预览器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/933080a0-bf7f-4b34-b343-0991f51efa1b/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/morph-target-previewer)

[变形目标预览器](/documentation/zh-cn/unreal-engine/morph-target-previewer)

[动画编辑器中可用编辑模式的用户指南。](/documentation/zh-cn/unreal-engine/morph-target-previewer)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [skeletal mesh](https://dev.epicgames.com/community/search?query=skeletal%20mesh)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建角色蓝图](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%A7%92%E8%89%B2%E8%93%9D%E5%9B%BE)
-   [模块化角色](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine#%E6%A8%A1%E5%9D%97%E5%8C%96%E8%A7%92%E8%89%B2)
-   [为骨骼网格体制作动画](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine#%E4%B8%BA%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93%E5%88%B6%E4%BD%9C%E5%8A%A8%E7%94%BB)
-   [动画蓝图](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine#%E5%8A%A8%E7%94%BB%E8%93%9D%E5%9B%BE)
-   [为兼容的骨骼网格体制作动画](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine#%E4%B8%BA%E5%85%BC%E5%AE%B9%E7%9A%84%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93%E5%88%B6%E4%BD%9C%E5%8A%A8%E7%94%BB)
-   [非骨架动画](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine#%E9%9D%9E%E9%AA%A8%E6%9E%B6%E5%8A%A8%E7%94%BB)
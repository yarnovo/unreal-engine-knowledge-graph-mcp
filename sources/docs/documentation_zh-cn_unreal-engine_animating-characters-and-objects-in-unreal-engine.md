# 虚幻引擎中的物体和角色动画制作 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animating-characters-and-objects-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:02:35.505Z

---

目录

![物体和角色动画制作](https://dev.epicgames.com/community/api/documentation/image/072cb9e2-89a6-44bf-81b4-5b815770c917?resizing_type=fill&width=1920&height=335)

**虚幻引擎** 提供了一套强大的动画工具和编辑器，以便你为角色和物体创建运行时动画系统，渲染电影动画内容，并在引擎中直接新建动画内容。

## 骨架网格体动画

借助[骨架网格体动画](/documentation/zh-cn/unreal-engine/skeletal-mesh-animation-system-in-unreal-engine)，你可以在虚幻引擎中为角色和物体创建强大的动画系统。当你把某个带蒙皮的网格体对象导入为[骨架网格体资产](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)后，你就可以使用[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine) 可视化脚本编辑器来管理其资产，并建立逻辑来执行动态的动画内容。

关于在虚幻引擎中使用 **骨骼动画系统** 对角色和物体进行动画制作的更多信息，请参阅以下文档：

[](/documentation/zh-cn/unreal-engine/skeletal-mesh-animation-system-in-unreal-engine)

[![骨架网格体动画系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13e95464-1264-4428-8b1b-b6543401b11f/topicimage.png)](/documentation/zh-cn/unreal-engine/skeletal-mesh-animation-system-in-unreal-engine)

[骨架网格体动画系统](/documentation/zh-cn/unreal-engine/skeletal-mesh-animation-system-in-unreal-engine)

[虚幻引擎中的动画和角色控制系统。](/documentation/zh-cn/unreal-engine/skeletal-mesh-animation-system-in-unreal-engine)

## Sequencer

你可以使用[Sequencer](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)为游戏电影或传统的动画电影制作创建和编辑阶段性的动画内容，同时使用虚幻引擎的动画和世界渲染工具。当使用Sequencer创建电影内容时，你可以建立自定义的角色套件，使用[Control Rig](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine)在你的场景中直接对角色进行动画制作，同时对其他角色、物体、镜头和特效进行动画制作。

关于在虚幻引擎中使用 **Sequencer** 来创建电影动画的更多信息，请参阅以下文档：

[](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)

[![过场动画和Sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f2fcb4b-49e6-408c-941c-04a75a6cc99f/topicimage.png)](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)

[过场动画和Sequencer](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)

[Sequencer 是虚幻引擎的多轨道编辑器，用于实时创建和预览动画序列。](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)

## Control Rig

使用骨架网格体动画系统，导入的角色可以运行在外部数字内容创建(DCC)软件中创建的动画。但是，使用[Control Rig](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine)，你可以为角色和物体建立动态的动画套装，使你可以在虚幻引擎中编辑现有的动画或创建新的动画。使用[Control Rig蓝图表](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine)，你可以创建动态套件，可以将骨骼变换应用于网格体骨架。然后，这些动画可以在Sequencer中播放，甚至可以作为独立的资产烘焙，可以在运行时动画系统中使用。

关于在虚幻引擎中使用 **Control Rig** 来创建动画角色的更多信息，请参阅以下文档：

[](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine)

[![控制绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b98d8120-c639-4b73-b159-e32cc2ecc96d/topicimage.png)](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine)

[控制绑定](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine)

[使用控制绑定实时操纵和动画化角色。](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine)

## Paper 2D

使用虚幻引擎的2D动画工具集，[Paper 2D](/documentation/zh-cn/unreal-engine/paper-2d-overview-in-unreal-engine)，你可以创建传统的2D角色或关卡，充分利用虚幻引擎的世界渲染的全部功能来创建动态的高保真2D和2D/3D混合项目。Paper 2D包含一套工具和编辑器，你可以在虚幻引擎的现代光线、世界和物理模拟的框架内使用并编辑2D纹理。

关于在虚幻引擎中使用 **Paper 2D** 创建传统2D和现代混合风格项目的更多信息，请参阅以下文档：[](/documentation/zh-cn/unreal-engine/paper-2d-overview-in-unreal-engine)

[![虚幻引擎](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8163343c-1802-43ce-a4e2-868026b5a568/paper2d_topic.png)](/documentation/zh-cn/unreal-engine/paper-2d-overview-in-unreal-engine)

[虚幻引擎](/documentation/zh-cn/unreal-engine/paper-2d-overview-in-unreal-engine)

[Paper 2D是一种基于Sprite的系统，用于在虚幻引擎中开发2D或2D/3D结合的游戏。](/documentation/zh-cn/unreal-engine/paper-2d-overview-in-unreal-engine)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [骨架网格体动画](/documentation/zh-cn/unreal-engine/animating-characters-and-objects-in-unreal-engine#%E9%AA%A8%E6%9E%B6%E7%BD%91%E6%A0%BC%E4%BD%93%E5%8A%A8%E7%94%BB)
-   [Sequencer](/documentation/zh-cn/unreal-engine/animating-characters-and-objects-in-unreal-engine#sequencer)
-   [Control Rig](/documentation/zh-cn/unreal-engine/animating-characters-and-objects-in-unreal-engine#controlrig)
-   [Paper 2D](/documentation/zh-cn/unreal-engine/animating-characters-and-objects-in-unreal-engine#paper2d)
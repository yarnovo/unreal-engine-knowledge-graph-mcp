# 虚幻引擎中的控制绑定 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:15:03.758Z

---

目录

![控制绑定](https://dev.epicgames.com/community/api/documentation/image/c4345483-593b-4478-907a-94563a151ce5?resizing_type=fill&width=1920&height=335)

虚幻引擎提供了一套动画工具，供你直接在引擎中操纵和动画化角色，称为控制绑定（Control Rig）。使用控制绑定，你无需在外部工具中进行操纵和制作动画，而是直接在虚幻编辑器中制作动画。使用此系统，你可以在角色上创建和操纵自定义功能按钮，在 **[Sequencer](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)** 中制作动画，并使用各种其他动画工具来帮助你完成动画制作过程。

此页面包含文档链接，涵盖虚幻引擎的控制绑定工具，以及它们工作流程的实际示例。

## 开始

如果你才开始学习在虚幻引擎中制作动画，本页面将简短概述如何创建基本控制绑定，并为其制作动画。

[](/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine)

[![控制绑定快速入门指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49371f06-190f-47e2-b231-226bf76d39d7/topicimage.png)](/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine)

[控制绑定快速入门指南](/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine)

[了解虚幻引擎中控制绑定的基础知识。](/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine)

## 创建绑定

**控制绑定** 是你将用于创建绑定的主要资产。这些页面介绍了它的用法和主要功能。

[](/documentation/zh-cn/unreal-engine/rigging-with-control-rig-in-unreal-engine)

[![使用控制绑定制作动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea8bb55f-07fc-4738-8697-8f8573c9c1f7/topicimage.png)](/documentation/zh-cn/unreal-engine/rigging-with-control-rig-in-unreal-engine)

[使用控制绑定制作动画](/documentation/zh-cn/unreal-engine/rigging-with-control-rig-in-unreal-engine)

[本文通过新建一个控制绑定资产来介绍其中的各种功能。](/documentation/zh-cn/unreal-engine/rigging-with-control-rig-in-unreal-engine)

[

![控制绑定编辑器](images/static/document_list/empty_thumbnail.svg)

控制绑定编辑器

学习控制绑定编辑器中的各种工具和区域。





](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine)[

![模块化控制绑定](images/static/document_list/empty_thumbnail.svg)

模块化控制绑定

在虚幻引擎中使用模块化绑定工具快速绑定角色。





](/documentation/zh-cn/unreal-engine/modular-control-rigs-in-unreal-engine)[

![控制点、骨骼和Null](images/static/document_list/empty_thumbnail.svg)

控制点、骨骼和Null

了解构成控制绑定的主要绑定元素。





](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine)[

![解算方向](images/static/document_list/empty_thumbnail.svg)

解算方向

了解控制绑定中的不同解算方向以及它们启用的功能。





](/documentation/zh-cn/unreal-engine/control-rig-forwards-solve-and-backwards-solve-in-unreal-engine)[

![全身IK](images/static/document_list/empty_thumbnail.svg)

全身IK

为你的角色创建全身IK。





](/documentation/zh-cn/unreal-engine/control-rig-full-body-ik-in-unreal-engine)[

![样条线操控](images/static/document_list/empty_thumbnail.svg)

样条线操控

利用控制绑定中的样条线，在比较长的关节链上实现更简单的程序动画。





](/documentation/zh-cn/unreal-engine/control-rig-spline-rigging-in-unreal-engine)[

![姿势缓存](images/static/document_list/empty_thumbnail.svg)

姿势缓存

文档主题的一句话概述。





](/documentation/zh-cn/unreal-engine/control-rig-pose-caching-in-unreal-engine)[

![控制点形状和控制点形状库](images/static/document_list/empty_thumbnail.svg)

控制点形状和控制点形状库

使用控制点形状库中的不同控制点形状，自定义你的控制点。





](/documentation/zh-cn/unreal-engine/control-shapes-and-control-shape-library-in-unreal-engine)[

![控制绑定组件](images/static/document_list/empty_thumbnail.svg)

控制绑定组件

在虚幻引擎蓝图中使用控制绑定组件。





](/documentation/zh-cn/unreal-engine/control-rig-in-blueprints-in-unreal-engine)[

![Control Rig函数库](images/static/document_list/empty_thumbnail.svg)

Control Rig函数库

构造和引用公有Control Rig函数以加速操控工作流程。





](/documentation/zh-cn/unreal-engine/control-rig-function-libraries-in-unreal-engine)[

![控制绑定中的Python脚本](images/static/document_list/empty_thumbnail.svg)

控制绑定中的Python脚本

使用Python脚本，扩展并自定义控制绑定的功能。





](/documentation/zh-cn/unreal-engine/control-rig-python-scripting-in-unreal-engine)[

![控制绑定调试](images/static/document_list/empty_thumbnail.svg)

控制绑定调试

使用控制绑定调试工具查找并修复控制绑定图表中的问题。





](/documentation/zh-cn/unreal-engine/control-rig-debugging-in-unreal-engine)

## 创建动画

创建控制绑定后，你可以在Sequencer和虚幻引擎的其他区域为其制作动画。这些页面提供了此过程的概述。

[](/documentation/zh-cn/unreal-engine/animating-with-control-rig-in-unreal-engine)

[![使用控制绑定实现动画效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f74a9ace-faf3-462c-a49e-856583c95268/topicimage.png)](/documentation/zh-cn/unreal-engine/animating-with-control-rig-in-unreal-engine)

[使用控制绑定实现动画效果](/documentation/zh-cn/unreal-engine/animating-with-control-rig-in-unreal-engine)

[介绍如何借助各种工具和流程实现控制绑定动画。](/documentation/zh-cn/unreal-engine/animating-with-control-rig-in-unreal-engine)

[

![虚幻引擎中的动画编辑器模式](images/static/document_list/empty_thumbnail.svg)

虚幻引擎中的动画编辑器模式

在虚幻引擎中启用动画模式，为动画师提供更加易用的环境和工具。





](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine)[

![在动画蓝图中使用控制绑定](images/static/document_list/empty_thumbnail.svg)

在动画蓝图中使用控制绑定

通过在动画蓝图中使用控制绑定来制作程序化效果。





](/documentation/zh-cn/unreal-engine/control-rig-in-animation-blueprints-in-unreal-engine)[

![FK控制绑定](images/static/document_list/empty_thumbnail.svg)

FK控制绑定

使用FK控制绑定快速编辑动画，无需使用任何控制绑定资产。





](/documentation/zh-cn/unreal-engine/fk-control-rig-in-unreal-engine)[

![约束](images/static/document_list/empty_thumbnail.svg)

约束

使用各种约束将对象的位置、方向或缩放附加到其他对象。





](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine)[

![空间切换](images/static/document_list/empty_thumbnail.svg)

空间切换

在利用控制绑定实现动画时，动态地重新确定控制点的关联





](/documentation/zh-cn/unreal-engine/re-parent-control-rig-controls-in-real-time-in-unreal-engine)[

![控制绑定动画Python脚本编写](images/static/document_list/empty_thumbnail.svg)

控制绑定动画Python脚本编写

使用Python脚本驱动和扩展控制绑定动画制作。





](/documentation/zh-cn/unreal-engine/python-scripting-for-animating-with-control-rig-in-unreal-engine)

-   [control rig](https://dev.epicgames.com/community/search?query=control%20rig)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [开始](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine#%E5%BC%80%E5%A7%8B)
-   [创建绑定](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine#%E5%88%9B%E5%BB%BA%E7%BB%91%E5%AE%9A)
-   [创建动画](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%8A%A8%E7%94%BB)
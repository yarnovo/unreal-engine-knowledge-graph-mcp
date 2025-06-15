# 使用虚幻引擎中的控制绑定制作动画 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/rigging-with-control-rig-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:15:06.476Z

---

目录

![使用控制绑定制作动画](https://dev.epicgames.com/community/api/documentation/image/4634f59d-1e86-48ad-b2ea-b4eec418815a?resizing_type=fill&width=1920&height=335)

在虚幻引擎中为角色制作动画时，你必须首先创建控制点。控制绑定（Control Rig）提供了各种功能和工具，能为各种形状和大小的角色创建绑定。

本页提供了关于创建控制绑定的概述，以及钻机的主要功能。

## 创建控制绑定资产

在[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)中打开 **控制绑定资产** 后，你会看到 **控制绑定编辑器**。该资产可以通过以下方式创建。

第一种方法是右键点击骨骼网格体资产，选择 **创建 > 控制绑定**。这将在同一目录下创建一个后缀为 `_CtrlRig` 的控制绑定资产。双击资产打开它。

![create control rig](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46b2e847-c8d5-47a5-8156-5aa652e8ddee/createcontrolrig.png)

第二种方法是手动创建一个控制绑定。你可以点击内容浏览器，选择 **动画 > 控制绑定** 来完成。然后在弹出窗口中，选择 **控制绑定（Control Rig）** 并点击 **创建（Create）**。双击资产打开它。

![create control rig](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b647163-ce16-41cf-95bd-d1f60a93d824/createcontrolrig2.png)

如果以这种方式创建控制绑定，你需要在打开后手动将骨架网格体指定给你的控制绑定资产。方法是点击 **绑定层级（Rig Hierarchy）** 标签中的 **导入层级（Import Hierarchy）** ，然后指定你的骨架网格体。

![import hierarchy](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2eba8e1-f4f6-418b-bb95-af413c67d609/importhierarchy.png)

请参考[控制绑定编辑器](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine)页面，了解更多关于控制绑定编辑器的界面和功能。

## 绑定功能

以下功能有助于你在虚幻引擎Control Rig中完成绑定。

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

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [control rig](https://dev.epicgames.com/community/search?query=control%20rig)
-   [rigging](https://dev.epicgames.com/community/search?query=rigging)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建控制绑定资产](/documentation/zh-cn/unreal-engine/rigging-with-control-rig-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%8E%A7%E5%88%B6%E7%BB%91%E5%AE%9A%E8%B5%84%E4%BA%A7)
-   [绑定功能](/documentation/zh-cn/unreal-engine/rigging-with-control-rig-in-unreal-engine#%E7%BB%91%E5%AE%9A%E5%8A%9F%E8%83%BD)
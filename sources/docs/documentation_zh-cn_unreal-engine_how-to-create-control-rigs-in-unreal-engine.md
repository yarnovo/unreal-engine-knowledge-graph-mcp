# 如何在虚幻引擎中创建控制绑定 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:15:05.774Z

---

目录

![控制绑定快速入门指南](https://dev.epicgames.com/community/api/documentation/image/34ac2913-f634-4fa3-bb48-aabbe909b1d6?resizing_type=fill&width=1920&height=335)

本文将带你了解控制绑定，并且展示虚幻引擎中如何创建并给绑定添加动画。

## 什么是控制绑定？

控制绑定是虚幻引擎在引擎中直接为角色添加动画的解决方案。

**控制绑定编辑器（Control Rig Editor）** 可以创建自定义控制点，通道，以及角色的其它操作器。创建一个绑定之后，你可以在虚幻引擎的其它区域为这些控制点添加动画，比如 **[Sequencer](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)**。

![控制绑定编辑器概览](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e991fed-bf49-4265-a994-f976313a7d38/controlrigoverview.png)

控制绑定需要先创建 **控制绑定资产**，在 **内容浏览器（Content Browser）** 中创建并储存。

![内容浏览器控制绑定资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f2f7ab9-8bf8-479d-bae6-4a02a85ccef6/contentbrowser.png)

## 如何创建并打开一个控制绑定？

创建新控制绑定资产的主要方式是在内容浏览器中右键点击一个 **[骨架网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)** 然后选择 **创建（Create） > 控制绑定（Control Rig）**。这样就会在同一目录下创建一个控制绑定资产，带有 "\_CtrlRig" 后缀。

![创建控制绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43633d97-8f1e-48a4-8c3e-b930a24ea999/createcontrolrig.png)

下一步，双击控制绑定资产来打开 **控制绑定编辑器（Control Rig Editor）**。

![打开控制绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09c783e0-c9df-45a2-816f-a625b9020f78/opencr.png)

## 如何使用控制绑定？

最简单的一种控制点类型为 **FK控制点（FK Control）**。该指南讲述如何创建这种控制点并且在 **Sequencer** 中为其添加动画。

### 创建控制点

在控制绑定编辑器中，选择 **绑定层级（Rig Hierarchy）** 选项卡来查看角色中的骨架层级。找到你要添加动画的骨骼，右键点击，然后选择 **新（New）> 新控制点（New Control）**。

![创建新控制点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93c4e480-0770-491a-9f0d-fa0c17d06bed/newcontrol.png)

这样会在该骨骼同一位置和同一方向上创建一个控制点。控制点会和骨骼有一样的名称，并带有后缀"\_ctrl"。

![创建新控制点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f77024ae-cb86-4b0b-a8ba-3adb333fd15f/newcontrol2.png)

尽管你可以将控制点嵌套在骨架层级内，通常建议将其取出并且在骨架旁边构建一个控制绑定层级。选中控制点并且按下 **Shift+P** 来解除控制点和骨架的嵌套关系。

![解除控制点嵌套](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/656719f1-cc8d-4356-9edb-b3e464037b13/shiftp.gif)

### 编辑控制点形状

为了更好地在视口中查看并选择控制点，你可以改变 **控制点形状（Control Shape）**。找到 **细节（Details）** 面板，打开 **控制点形状（Control Shape）** 属性类别。在这里你可以使用 **形状（Shape）** 属性设置新形状，也可以用 **变换（Transform）** 属性自定义大小和位置偏移。

在这个示例中，形状设置为 **Circle\_Thick**，Y轴旋转为 **90**，所有缩放轴都设为 **3.0**。

![改变控制点形状](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/baae581e-204c-4f91-8bfc-32ccc3bab52d/controlshape.png)

### 用控制点驱动骨骼

接下来，在 **绑定图表（Rig Graph）**中引用控制点和骨骼。将控制点从 **绑定层级（Rig Hierarchy）** 面板中拖进图表，然后选择 **获取控制点（Get Control）**。

![图表获取控制点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c68c8bd0-c8c3-4f29-98f0-78eebb600e8f/getcontrol.gif)

对想要控制的骨骼进行同样的操作。 将骨骼从 **绑定层级（Rig Hierarchy）** 面板中拖进图表，然后选择 **设置骨骼（Set Bone）**。

![图表设置骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/308d1f53-b3d5-44de-9e77-741000ed2ff9/setbone.gif)

将 **变换（Transform）** 输出数据引脚从 **获取变换-控制点（（Get Transform - Control）** 节点连接至 **设置变换-骨骼（Set Transform - Bone）** 节点的 **变换（Transform）** 输入数据引脚，然后将 **执行（Execute）** 输出引脚从 **正向解算（Forward Solve）** 节点连接至 **设置变换-骨骼（Set Transform - Bone）** 节点的输入执行引脚。

![控制点设置骨骼变换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d19c117b-c23c-4e57-9342-0dff66d53911/connectpins.png)

你可以在视口中操作控制点并且看到控制点驱动骨骼。

![测试控制点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/678b54af-f781-422d-94b2-2b2de1fba091/viewporttest.gif)

点击 **编译（Compile）** 来将控制点重置到默认位置。

### 在Sequencer在中为控制点添加动画

现在你的控制点已经可以正常操作角色的骨骼，你可以开始在 **[Sequencer](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)** 中添加动画。

从 **内容浏览器（Content Browser）** 中将 **控制绑定资产（Control Rig Asset）** 拖入关卡视口。随后，Sequencer会启动，同时带着加入至**[轨道](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine)**的角色

![将控制绑定添加至关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b098a9a4-4669-4498-a2c0-47aeabd6bcd1/animate1.gif)

展开 **控制绑定（Control Rig）** 轨道来找到你创建的控制点。你可以在这里将其选中，也可以在视口中选中。

![Sequencer中的控制绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9da5d38-661c-4295-b4a4-64887d0cca54/animate2.png)

在视口中选中控制点后，按下 **S** 键来为选中的控制点在 [**播放头（Playhead）**](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#playhead) 创建一个变换 **关键帧（Keyframe）**。然后，将 **播放头（Playhead）** 拖至序列中另外的位置，操作你的控制点，然后再次按下 **S** 键来设置另一个 **关键帧（Keyframe）**。

![控制绑定关键帧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cefb9760-6530-4506-9f07-0255fddcd61a/animate3.gif)

现在当你播放序列时，你可以看到控制点和角色在两个关键帧之间运动。

![控制绑定关键帧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/754937e8-9244-4b9b-8826-6aa5245ebe87/animate4.gif)

-   [control rig](https://dev.epicgames.com/community/search?query=control%20rig)
-   [controls](https://dev.epicgames.com/community/search?query=controls)
-   [ring](https://dev.epicgames.com/community/search?query=ring)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [什么是控制绑定？](/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine#%E4%BB%80%E4%B9%88%E6%98%AF%E6%8E%A7%E5%88%B6%E7%BB%91%E5%AE%9A%EF%BC%9F)
-   [如何创建并打开一个控制绑定？](/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine#%E5%A6%82%E4%BD%95%E5%88%9B%E5%BB%BA%E5%B9%B6%E6%89%93%E5%BC%80%E4%B8%80%E4%B8%AA%E6%8E%A7%E5%88%B6%E7%BB%91%E5%AE%9A%EF%BC%9F)
-   [如何使用控制绑定？](/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E6%8E%A7%E5%88%B6%E7%BB%91%E5%AE%9A%EF%BC%9F)
-   [创建控制点](/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%8E%A7%E5%88%B6%E7%82%B9)
-   [编辑控制点形状](/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine#%E7%BC%96%E8%BE%91%E6%8E%A7%E5%88%B6%E7%82%B9%E5%BD%A2%E7%8A%B6)
-   [用控制点驱动骨骼](/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine#%E7%94%A8%E6%8E%A7%E5%88%B6%E7%82%B9%E9%A9%B1%E5%8A%A8%E9%AA%A8%E9%AA%BC)
-   [在Sequencer在中为控制点添加动画](/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine#%E5%9C%A8sequencer%E5%9C%A8%E4%B8%AD%E4%B8%BA%E6%8E%A7%E5%88%B6%E7%82%B9%E6%B7%BB%E5%8A%A0%E5%8A%A8%E7%94%BB)
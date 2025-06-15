# 在虚幻引擎中使用控制绑定实现动画效果 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animating-with-control-rig-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:15:46.546Z

---

目录

![使用控制绑定实现动画效果](https://dev.epicgames.com/community/api/documentation/image/35cdce3a-fb9b-4125-bbc2-b4a59cfc7e92?resizing_type=fill&width=1920&height=335)

在完成[绑定控制绑定](/documentation/zh-cn/unreal-engine/rigging-with-control-rig-in-unreal-engine)后，你可以通过各种方式对其进行动画处理，例如直接在[Sequencer](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)中进行，或者使用[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)以更程序化的方式进行。

本文档提供了关于这些动画方法及其工具和功能的概述。

#### 先决条件

-   你已经创建了 **控制绑定资产（Control Rig Asset）** 。有关如何执行此操作的信息，请参阅[控制绑定快速入门指南](/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine)页面。

## 在Sequencer中进行动画处理

**控制绑定** 可以在[Sequencer](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)中进行交互和动画处理。你可以向序列添加支持控制绑定的新角色，或向当前存在的角色添加控制绑定。

将控制绑定资产从内容浏览器拖动到关卡中，开始对控制绑定进行动画处理。这将打开新的Sequencer，并向其添加带有控制绑定轨道的骨架网格体。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c890c10-c8bb-4fc7-ae0f-e8f8bb6b8fc1/image_0.gif)

如果你的Sequencer已经包含 **骨架网格体Actor（Skeletal Mesh Actor）**，并且你希望向其添加控制绑定，则点击 **骨架网格体轨道（Skeletal Mesh Track）** 上的 **添加(+)轨道（Add (+) Track）** 按钮，然后选择 **控制绑定（Control Rig） > 控制绑定类（Control Rig Classes）**，从骨架网格体可用的控制绑定类列表中选择。 。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d21374c-c7b1-48f0-ac2b-2391ede83881/image_1.png)

展开 **控制绑定轨道（Control Rig Track）** 将显示可以对其进行动画处理的控制点的列表。在此处选择控制点还会在 **视口（Viewport）** 中将其选中，反过来在视口中选择控制点也会选择轨道。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e77126af-54f3-41ea-91b4-ad00cf66b704/image_2.png)

控制点可以像Sequencer中的大部分对象一样[设为关键帧](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine)。此外，在选中控制点的情况下按 **S 键** 会在当前播放头时间在所选控制点上创建变换关键帧。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f10ee3de-d82b-421a-a782-3243a3914d8f/image_3.gif)

### 多个控制绑定

Sequencer支持同时对多个控制绑定进行显示和动画。所有控制绑定及其控制点都会显示在视口和[动画大纲视图（Anim Outliner）](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine#animoutliner)中。你还可以通过点击 **眼睛** 图标来显示或隐藏控制绑定，以更改它们的可见性。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e418d9e-c91f-4090-8d11-a226bb24743f/image_4.gif)

### 分层的控制绑定轨道

在Sequencer中使用控制绑定时，你可能希望将其他动画或绑定分层，以便创建更动态的动画系统或工作流程。要将一个控制绑定轨道设置为分层的控制绑定（Layered Control Rig）轨道，请点击 **骨架网格体（Skeletal Mesh）轨道旁边的（**+**）**添加轨道 **按钮，然后找到** 控制绑定（Control Rig） **>** 分层（Layered）\*\* 并勾选此复选框。

要让一个控制绑定按照分层的控制绑定运作，它必须有一个可运行的 **后向解算（Backwards Solve）** 图标。关于为控制绑定设置后向解算图图表的更多详情，请参阅控制绑定解算方向文档的[后向解算](/documentation/zh-cn/unreal-engine/control-rig-forwards-solve-and-backwards-solve-in-unreal-engine#%E5%90%8E%E5%90%91%E8%A7%A3%E7%AE%97)一节。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de2b8a92-815a-42b0-b7cf-9c4677b297da/image_5.png)

你也可以通过 **右键点击** Sequencer时间轴的大纲视图中的轨道，并在快捷菜单中启用 **转为分层（Convert To Layered）** 属性来将其设为分层轨道。分层控制绑定轨道的默认值为 `100`。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1fbb3b03-9877-427a-a810-494f47dcc773/image_6.png)

现在，动画轨道将通过控制绑定的后向解算图表运行，无需将动画序列烘焙到控制绑定，动画序列就将与控制绑定分层。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb5b15e4-610d-4c04-9d95-17b194ef0185/image_7.gif)

你也可以使用多个控制绑定轨道，对你的角色姿势进行模块化编辑。在Sequencer时间轴中创建并设置分层的控制绑定轨道后，你可以设置 **控制绑定** 的分层顺序，从而设置不同轨道对最终姿势的影响行为。要编辑分层控制绑定轨道的顺序，请在Sequencer时间轴的大纲视图中 **右键点击** 轨道，设置 **顺序（Order）** 属性的值。顺序从 `100` 开始，对轨道进行降序求值，顺序值最高的轨道排在最前面。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6192de9a-7b0f-4474-87a9-d436a157f5f0/image_8.png)

未启用分层的Sequencer轨道也可以与分层的控制绑定轨道一起使用，同样受顺序属性影响。但如果一个未被标记为"分层"的控制绑定轨道的顺序值低于分层轨道，它可能会破坏分层轨道生成的姿势。在组合使用分层和不分层的控制绑定轨道时，务必认真权衡它们的顺序。建议将分层控制绑定的改动添加到动画序列轨道或不分层的控制绑定轨道的上方，以保留它们对姿势的改动。

错误的顺序

正确的顺序

本图中的不分层控制绑定轨道（橙色）的顺序值为 `100`，被排在末尾，因此破坏了两个顺序值分别为 `200` 和 `300` 的分层控制绑定轨道（黄色）生成的姿势。

本图中的不分层控制绑定轨道（橙色）的顺序值为 `300`，被排在最上面，意味着顺序值为 `100` 和 `200` 的分层控制绑定轨道（黄色）将被叠加在它的上面。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/355e5281-65a3-4422-beee-3d73d5cdf6a2/image_9.png)

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/349f37de-d8df-40b7-a57e-e0050818dd0d/image_10.png)

你可以调整分层控制绑定轨道的权重值，或为其设置关键帧，方法是在Sequencer时间轴中 **右键点击** 轨道，并开启/关闭 **权重（Weight）** 属性。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1357c79d-1ae4-49fe-a26b-4adc598b330e/image_11.gif)

在处理多个分层控制绑定轨道时，你可以将所有选中的控制绑定轨道上选定的关键帧值恢复为默认值，方法是使用快捷键 **Ctrl**+**G**，或使用 **Ctrl**+**Shift**+**G** 将所选控制绑定轨道的所有关键帧恢复为默认值。

你还可以使用快捷键 \*Ctrl**+**I**将所有选中的关键帧设为零，或使用** Ctrl**+**Shift**+**I\*\* 将所选控制绑定的所有关键帧值设为零。

## 动画功能

虚幻引擎还提供了以下动画功能，帮你制作控制绑定动画。

[

![虚幻引擎中的动画编辑器模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7ea7da5-b813-44f0-b9c0-68e9da46a43f/placeholder_topic.png)

虚幻引擎中的动画编辑器模式

在虚幻引擎中启用动画模式，为动画师提供更加易用的环境和工具。





](/documentation/zh-cn/unreal-engine/animation-editor-mode-in-unreal-engine)[

![在动画蓝图中使用控制绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2796b7b8-671f-4d84-acf0-b189712889f5/placeholder_topic.png)

在动画蓝图中使用控制绑定

通过在动画蓝图中使用控制绑定来制作程序化效果。





](/documentation/zh-cn/unreal-engine/control-rig-in-animation-blueprints-in-unreal-engine)[

![FK控制绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb4ab204-6daa-4c06-92f8-f1e6b38ce14e/topicimage.png)

FK控制绑定

使用FK控制绑定快速编辑动画，无需使用任何控制绑定资产。





](/documentation/zh-cn/unreal-engine/fk-control-rig-in-unreal-engine)[

![约束](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c94fa875-27fe-4ecc-8a3f-5a0af7906b8f/topicimage.png)

约束

使用各种约束将对象的位置、方向或缩放附加到其他对象。





](/documentation/zh-cn/unreal-engine/animation-constraint-tools-in-unreal-engine)[

![空间切换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/705188ac-6605-4c6d-a947-6d118a224ad4/placeholder_topic.png)

空间切换

在利用控制绑定实现动画时，动态地重新确定控制点的关联





](/documentation/zh-cn/unreal-engine/re-parent-control-rig-controls-in-real-time-in-unreal-engine)[

![控制绑定动画Python脚本编写](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0571dd0-8024-4d52-8298-62e51c9240e0/placeholder_topic.png)

控制绑定动画Python脚本编写

使用Python脚本驱动和扩展控制绑定动画制作。





](/documentation/zh-cn/unreal-engine/python-scripting-for-animating-with-control-rig-in-unreal-engine)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [control rig](https://dev.epicgames.com/community/search?query=control%20rig)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/animating-with-control-rig-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [在Sequencer中进行动画处理](/documentation/zh-cn/unreal-engine/animating-with-control-rig-in-unreal-engine#%E5%9C%A8sequencer%E4%B8%AD%E8%BF%9B%E8%A1%8C%E5%8A%A8%E7%94%BB%E5%A4%84%E7%90%86)
-   [多个控制绑定](/documentation/zh-cn/unreal-engine/animating-with-control-rig-in-unreal-engine#%E5%A4%9A%E4%B8%AA%E6%8E%A7%E5%88%B6%E7%BB%91%E5%AE%9A)
-   [分层的控制绑定轨道](/documentation/zh-cn/unreal-engine/animating-with-control-rig-in-unreal-engine#%E5%88%86%E5%B1%82%E7%9A%84%E6%8E%A7%E5%88%B6%E7%BB%91%E5%AE%9A%E8%BD%A8%E9%81%93)
-   [动画功能](/documentation/zh-cn/unreal-engine/animating-with-control-rig-in-unreal-engine#%E5%8A%A8%E7%94%BB%E5%8A%9F%E8%83%BD)
# 在虚幻引擎中将Gameplay动画与过场动画混合 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blend-gameplay-animation-to-cinematic-animation-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:14:05.187Z

---

目录

![混合Gameplay和Sequencer动画](https://dev.epicgames.com/community/api/documentation/image/fe64a8cc-3716-466b-a219-7d2e36528130?resizing_type=fill&width=1920&height=335)

创建过场动画序列时，你可能希望将Gameplay动画与关卡序列中的动画进行相互混合。通常，这样做是为了创建进出过场动画的无缝过渡，包括混合玩家动画和玩家摄像机。

本文档介绍可用于在Sequencer和Gameplay之间混合玩家动画和摄像机动画的工作流程和注意事项。

#### 先决条件

-   在项目中有一个可控制的玩家角色。本文将以[第三人称模板](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine)为例。
-   已经创建过场动画序列，并已准备好将其混合到Gameplay。
-   已熟悉如何在Sequencer中[引用玩家](/documentation/zh-cn/unreal-engine/how-to-reference-the-player-in-unreal-engine-cinematics)。

## 动画蓝图设置

通常，在Sequencer中设置角色动画时，"动画模式（Animation Mode）"属性会自动更改为 **使用自定义模式（Use Custom Mode）**。自定义模式是一种特定于Sequencer的特殊[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)，与在Gameplay中用于设置玩家动画的模式不同。若要在Sequencer与Gameplay之间混合角色，*不能* 使用 **自定义模式**，而必须改用角色在Gameplay中所用的同一动画蓝图。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8eedaf1f-8a60-4fdf-a98a-13147ba960c7/animbp1.png)

为了确保这一点，可以[在序列中引用玩家角色蓝图](/documentation/zh-cn/unreal-engine/how-to-reference-the-player-in-unreal-engine-cinematics)，这样应该会将"动画模式（Animation Mode）"设置为Gameplay动画蓝图。如果没有，则可以通过选择角色、导航到 **细节（Details）** 面板并执行以下操作来手动设置此属性：

-   将 **动画模式（Animation Mode）** 设置为 **使用动画蓝图（Use Animation Blueprint）**。
-   将 **动画类（Anim Class）** 设置为Gameplay中使用的 **动画蓝图**。对于第三方模板，设置为 **ABP\_Manny\_C**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc28a789-c44b-45c6-a43b-460d7cebee28/animbp2.png)

显式设置动画蓝图后，Sequencer不会覆盖此属性以使用自定义模式。

### 插槽设置

使用动画蓝图在Sequencer中设置角色动画时，必须确保动画蓝图包含[插槽](/documentation/zh-cn/unreal-engine/animation-slots-in-unreal-engine)，这些插槽提供了一种将动画注入[动画图表（Anim Graph）](/documentation/zh-cn/unreal-engine/graphing-in-animation-blueprints-in-unreal-engine)的方法。虽然插槽主要用于播放[蒙太奇](/documentation/zh-cn/unreal-engine/animation-montage-in-unreal-engine)的动画，但也可以用于播放Sequencer的动画。

要创建新插槽，请打开要混合的角色的动画蓝图，然后执行以下操作：

1.  单击 **窗口（Window）** 并启用 **动画插槽管理器（Anim Slot Manager）**（如果尚未启用）。
2.  在"动画插槽管理器（Anim Slot Manager）"中，单击 **添加插槽（Add Slot）**。
3.  输入新插槽的名称并按 **Enter**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28641000-57a3-417f-9837-e6fe67d34c8e/animbp3.png)

插槽存储在[骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)上，因此在创建或更改插槽时，也是在编辑骨架。在进行任何插槽更改时，单击"动画插槽管理器（Anim Slot Manager）"中的 **保存（Save）** 将保存骨架。

接下来，在动画图表中引用插槽。

1.  在图表中单击鼠标右键，然后添加一个 **插槽"DefaultSlot"** 节点。
2.  选择该节点，然后在 **细节（Details）** 面板中将 **插槽名称（Slot Name）** 设置为先前创建的插槽的名称。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87e4984b-fc6e-470b-91a4-6e9d4647f9d0/animbp4.png)

除了创建插槽之外，还要考虑该插槽在动画图表中的插入 *位置*。对于大多数简单混合，最好将插槽放置为 **输出姿势（Output Pose）** 之前的最终节点，但是在某些情况下，建议放置在动画图表逻辑链中较前面的位置以便利用程序化效果。

以下示例将插槽节点连接在动画蓝图逻辑与"输出姿势（Output Pose）"之间。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d496739d-4a45-4a2d-b6b0-e756aacdfa2e/animbp5.png)

## 混合到空闲姿势

最常见的无缝混合之一是将过场动画混合到Gameplay，使玩家角色以默认的空闲运动姿势结束。如[先决条件](/documentation/zh-cn/unreal-engine/blend-gameplay-animation-to-cinematic-animation-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)中所述，本指南假定已存在动画和Sequencer内容。这包括：

-   [角色动画](/documentation/zh-cn/unreal-engine/how-to-add-cinematic-animation-to-a-character-in-unreal-engine)，其中的角色在组件根坐标处结束并与Gameplay空闲姿势匹配。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2244b182-40de-47e9-8196-681868eee2cb/blendidle1.gif)
    
-   [摄像机动画](/documentation/zh-cn/unreal-engine/how-to-animate-cinematic-cameras-in-unreal-engine)，以Gameplay摄像机的大致位置结束。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31ff84c7-79ac-4046-93c1-ec64d6bc2c9d/blendidle2.gif)
    

### Sequencer中的角色设置

要使玩家角色正确混合，请在Sequencer中执行以下操作：

1.  右键单击[动画](/documentation/zh-cn/unreal-engine/cinematic-animation-track-in-unreal-engine)分段，导航到 **属性（Properties）** 菜单，然后将 **插槽名称（Slot Name）** 设置为先前创建的插槽的名称。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e25af91-2916-425c-be5d-043d9afd2f46/blendidle3.png)
    
2.  拖动动画分段的右上角以便在动画结束处创建混出区域。尽管此动画的结束姿势可能与Gameplay姿势匹配，但这仍然有助于确保角色在Sequencer动画结束时不会"弹出"。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3d2bf81-d62b-41a2-899f-8ef6c7e3f871/blendidle4.gif)
    
3.  右键单击角色的变换分段，导航到 **属性（Properties）** 菜单，然后将 **结束时（When Finished）** 设置为 **保持状态（Keep State）**。这是确保角色在Sequencer完成时保持在同一位置所必需的设置。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44961bbf-fc31-43ea-8add-ae6bdecda9f3/blendidle5.png)
    

### Sequencer中的摄像机设置

要使过场动画摄像机正确混合到Gameplay摄影机，请在Sequencer中执行以下操作：

1.  右键单击[镜头切换轨道](/documentation/zh-cn/unreal-engine/cinematic-camera-cut-track-in-unreal-engine)并启用 **可以混合（Can Blend）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9fd1bc3-c93e-4897-aa8d-94f1d46ceaa1/blendidle6.png)
    
2.  与动画分段的混合类似，拖动镜头切换分段的右上角即可在摄像机动画结束处创建混出区域。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e96efe1-d9da-4f28-ac76-c953de10ebd2/blendidle7.gif)
    
3.  选择 **电影摄像机Actor（Cine Camera Actor）**，然后在 **细节（Details）** 面板中禁用 **约束宽高比（Constrain Aspect Ratio）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b82b7582-467e-44c8-b06b-20640e366b7b/blendidle7a.png)
    

如果Gameplay摄像机使用不同的轴约束，可能还需要选择 **关卡序列Actor（Level Sequence Actor）** 并禁用 **覆盖宽高比轴约束（Override Aspect Ratio Axis Constraint）**，以防止视野突然变化。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93bc032f-6bb4-437a-b1c4-290032421888/blendidle7b.png)

### 混合空闲状态结果

在运行时播放此序列时，应该会看到角色从Sequencer混合到Gameplay。再次强调，本指南假定你已熟悉如何在Sequencer中[引用玩家](/documentation/zh-cn/unreal-engine/how-to-reference-the-player-in-unreal-engine-cinematics)。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d54fc889-adc5-47e2-9cc6-696dbcb0aea0/blendidle8.gif)

## 其他注意事项

要提高Sequencer混合质量，请考虑项目中的以下因素：

### 不平坦的地貌

在平坦表面上混合角色动画通常需要简单的混合逻辑并在动画图表中放置插槽。但是，如果Gameplay动画蓝图包含将IK脚放置在不平坦表面上的逻辑，则可能需要重新考虑混合插槽在动画图表中的放置位置。否则，在过场动画混出时，角色可能会对这种地貌表现出明显的调整行为。

例如，在第三人称模板中，人体模型使用Control Rig节点中的IK逻辑针对不平坦的表面进行程序化调整。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6bb3997e-5595-474c-83ff-0e570925a0b2/terrain1.png)

如果混合发生在不平坦的表面上，则可能需要移动或新建一个在动画图表中IK调整节点之前执行的插槽。后续进行IK调整时，会考虑该插槽中的动画。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82beeadb-4c41-4574-9dd8-5d95df88fbec/terrain2.png)

如果Sequencer中的动画使用该插槽，应该会在播放动画时看到相应的程序化调整。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5e830cc-5317-426b-8037-098dd043c8a0/terrain3.gif)

### 抑制和恢复输入

在大多数混合过程中，可能希望抑制控制器输入，以防止在播放混合序列时控制器和Sequencer之间发生冲突。实现此目标的主要方法是选择 **关卡序列Actor（Level Sequence Actor）**，然后在 **细节（Details）** 面板中启用以下选项：

-   **禁用移动输入（Disable Movement Input）**，此选项会禁用角色的Gameplay移动。
-   **禁用查看输入（Disable Look at Input）**，此选项会禁用角色的Gameplay摄像机控制。

这将抑制序列持续时间内的所有输入。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f313b12d-fe4d-4544-9738-f8d0d946bced/input1.png)

如果需要精确控制何时可以限制和释放玩家输入，还可以使用 **设置过场动画模式（Set Cinematic Mode）** 功能手动控制输入。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52cc8607-0001-4712-bbf9-58027ab671b7/input2.png)

例如，为了进行更细致的输入管理，你可能希望在混合序列结束之前释放对玩家的控制。为此，可执行以下操作：

1.  右键单击角色的变换[分段](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine#%E5%88%86%E6%AE%B5)，导航到 **属性（Properties）** 菜单，然后解锁 **分段范围结束（Section Range End）**。接着，将变换分段的结束时间拖动到要释放控制的位置。这是必要的，因为变换分段在序列播放过程中会不断进行评估，将角色保持在原位。提前结束会使其不再进行评估。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67a6a7aa-3584-4ed8-8fb1-c35d37235976/input3.gif)
    
2.  使用以下逻辑在变换分段结束时创建[事件跟踪](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine)关键帧：
    
    -   事件执行 **设置过场动画模式（Set Cinematic Mode）**。
    -   **目标（Target）** 连接到 **获取玩家控制器（Get Player Controller）**，后者再连接到 **获取玩家状态（Get Player State）**。
    -   禁用 **处于过场动画模式（In Cinematic Mode）**。
    -   同时启用 **影响移动（Affects Movement）** 和 **影响转弯（Affects Turning）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f000d573-86d7-4be2-a370-a509f4263b61/input4.png)
    

现在，当播放过场动画时，玩家控制应该会在序列结束之前恢复。这有时可以为玩家提供更流畅、更自然的Gameplay体验。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff1f4105-1cba-4fe2-b97b-d5b65bbb8e27/input5.gif)

### Gameplay摄像机方向

对于可自由移动以控制摄像机的游戏（例如第三人称模板中使用的摄像机），在混出时，Gameplay摄像机有时可能不会朝向所需的方向。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/391dbdd4-414b-4e3e-8729-82f8b8444b47/cameraface1.gif)

可以使用 **获取玩家控制器（Get Player Controller）** 和 **设置控制旋转（Set Control Rotation）** 手动设置Gameplay摄像机的方向。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4955575-6954-4498-b931-0c1dd8508dd7/cameraface2.png)

右键单击 **新旋转（New Rotation）** 引脚并选择 **拆分结构体引脚（Split Struct Pin）** 以查看所有可用的旋转轴并在节点上设置旋转值。对于此示例，创建以下逻辑：

-   在序列开始播放后执行 **设置控制旋转（Set Control Rotation）**。
-   将 **新旋转Y（New Rotation Y）** 设置为 **\-15**，以使摄像机略微向下俯视。
-   将 **新旋转Z（New Rotation Z）** 设置为 **\-45**，以横向旋转摄像机并面向所需方向。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ed6f779-9d7c-49c8-ae02-256c2e6d5a2f/cameraface3.png)

现在，当播放过场动画时，摄像机朝向所需方向混出。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c76f47f-da3e-40c4-a26a-5ada85537908/cameraface4.gif)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/blend-gameplay-animation-to-cinematic-animation-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [动画蓝图设置](/documentation/zh-cn/unreal-engine/blend-gameplay-animation-to-cinematic-animation-in-unreal-engine#%E5%8A%A8%E7%94%BB%E8%93%9D%E5%9B%BE%E8%AE%BE%E7%BD%AE)
-   [插槽设置](/documentation/zh-cn/unreal-engine/blend-gameplay-animation-to-cinematic-animation-in-unreal-engine#%E6%8F%92%E6%A7%BD%E8%AE%BE%E7%BD%AE)
-   [混合到空闲姿势](/documentation/zh-cn/unreal-engine/blend-gameplay-animation-to-cinematic-animation-in-unreal-engine#%E6%B7%B7%E5%90%88%E5%88%B0%E7%A9%BA%E9%97%B2%E5%A7%BF%E5%8A%BF)
-   [Sequencer中的角色设置](/documentation/zh-cn/unreal-engine/blend-gameplay-animation-to-cinematic-animation-in-unreal-engine#sequencer%E4%B8%AD%E7%9A%84%E8%A7%92%E8%89%B2%E8%AE%BE%E7%BD%AE)
-   [Sequencer中的摄像机设置](/documentation/zh-cn/unreal-engine/blend-gameplay-animation-to-cinematic-animation-in-unreal-engine#sequencer%E4%B8%AD%E7%9A%84%E6%91%84%E5%83%8F%E6%9C%BA%E8%AE%BE%E7%BD%AE)
-   [混合空闲状态结果](/documentation/zh-cn/unreal-engine/blend-gameplay-animation-to-cinematic-animation-in-unreal-engine#%E6%B7%B7%E5%90%88%E7%A9%BA%E9%97%B2%E7%8A%B6%E6%80%81%E7%BB%93%E6%9E%9C)
-   [其他注意事项](/documentation/zh-cn/unreal-engine/blend-gameplay-animation-to-cinematic-animation-in-unreal-engine#%E5%85%B6%E4%BB%96%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
-   [不平坦的地貌](/documentation/zh-cn/unreal-engine/blend-gameplay-animation-to-cinematic-animation-in-unreal-engine#%E4%B8%8D%E5%B9%B3%E5%9D%A6%E7%9A%84%E5%9C%B0%E8%B2%8C)
-   [抑制和恢复输入](/documentation/zh-cn/unreal-engine/blend-gameplay-animation-to-cinematic-animation-in-unreal-engine#%E6%8A%91%E5%88%B6%E5%92%8C%E6%81%A2%E5%A4%8D%E8%BE%93%E5%85%A5)
-   [Gameplay摄像机方向](/documentation/zh-cn/unreal-engine/blend-gameplay-animation-to-cinematic-animation-in-unreal-engine#gameplay%E6%91%84%E5%83%8F%E6%9C%BA%E6%96%B9%E5%90%91)
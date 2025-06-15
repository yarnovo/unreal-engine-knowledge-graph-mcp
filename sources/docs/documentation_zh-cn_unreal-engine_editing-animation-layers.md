# 编辑动画层 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/editing-animation-layers
> 
> 生成时间: 2025-06-14T20:10:04.150Z

---

目录

![编辑动画层](https://dev.epicgames.com/community/api/documentation/image/adc4e420-b1c7-4014-895c-78a7e9d82b11?resizing_type=fill&width=1920&height=335)

动画层编辑功能允许你在虚幻引擎中修改任何现有的[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)，作为 **附加层轨迹（Additive Layer Tracks）** 的一部分。 借助动画层编辑功能，你可以使用现有动画并进行调整，制作该动画的不同副镜头，也可以基于原动画创建一段独立的、有自身动作的新动画。

本页将说明如何使用动画层编辑工具对一段闲散动画稍加修改，将其变成填弹动画。

在本指南中，我们创建了一个新项目（使用 **蓝图第一人称（Blueprint First Person）** 模板并启用了 **初学者内容包**）。

## 步骤

1.  在 **Content/FirstPerson/Animation** 文件夹中，复制 **FirstPerson\_Idle** 动画并将其命名为 **FirstPerson\_Reload**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc2dd4a3-c321-4280-9c47-06b938a391dc/layeranimation_01.png)
2.  在 **FirstPerson\_Reload** 中，在第0帧处暂停动画，在 **骨架树（Skeleton Tree）** 中单击 **upperarm\_l** 骨骼，然后单击 **关键帧（Key）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95501f75-860d-4c03-a35b-5653fd547bfc/layeranimation_02.png)
    
    此操作会将upperarm\_l的当前位置的 **变换（Transform）**、**旋转（Rotation）** 和 **缩放（Scale）** 关键帧添加到 **附加层轨迹（Additive Layer Tracks）** 部分。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c85b9909-0fcf-4182-b8b1-6813e40b6f59/layeranimation_03.png)
3.  将时间轴向前移动到第 **15** 帧。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07b6e0ae-fc55-4026-a150-4db7415e8d79/layeranimation_04.png)
4.  将 **upperarm\_l** 骨骼旋转 **\-70** 度，然后按 **关键帧（Key）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04a7c5cf-78b3-448a-b6a4-d1cf0878813d/layeranimation_05.png)
    
    此操作会为动画第15帧处的骨骼旋转添加一个关键帧。
    
5.  将时间轴向前移动到第 **20** 帧，将 **upperarm\_l** 骨骼旋转 **70** 度至其默认位置，然后按 **关键帧（Key）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/64a44b81-5311-4549-946c-140270abbd1c/layeranimation_06.png)
    
    在这20帧动画期间，手臂将先向下移动，然后向上移动到其默认位置。
    
6.  **右键单击** 时间轴标记并 **删除第20帧到第92帧**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e23b531-9472-41a0-af22-784c06db51e0/layeranimation_07.png)
    
    此操作将删除该动画剩余的帧，仅保留填弹动作。
    
7.  在 **内容浏览器** 中，**右键单击** **FirstPerson\_Reload** 动画并选择 **创建动画蒙太奇（Create AnimMontage）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/570850d5-05e6-4551-ad91-b9843dceafed/layeranimation_08.png)
    
    当玩家在游戏进程中按下指定的键时，我们将使用此动画蒙太奇来播放新的填弹动画。
    
8.  打开新的动画蒙太奇，然后更改插槽（改为使用 **DefaultGroup.Arms** 插槽）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/defb7274-b514-4a76-9c0a-bb5e4f6ce5a5/layeranimation_09.png)
    
    如下所示，指定给模板角色的动画蓝图已设置为使用[插槽节点](/documentation/zh-cn/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine#slot)来播放指定给"Arms"插槽的任何动画蒙太奇。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79b044df-b301-47e0-beff-7b46a92aa8c2/layeranimation_13.png)
    
    我们当前使用此插槽来处理武器开火动画播放，我们也会将它用于填弹动作。
    
9.  在 **Content/FirstPersonBP/Blueprints** 文件夹中，打开 **FirstPersonCharacter** 蓝图。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a67f5baa-51f6-49dc-a44d-53de552b97c9/layeranimation_10.png)
    
    此为指定给该模板的角色蓝图，它也是可操作角色。
    
10.  找到 **生成发射物（Spawn Projectile）** 脚本，按下 **Ctrl** 键的同时选中 **Mesh2P**、**Get Anim Instance** 和 **Montage Play** 节点，如下所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/30456be8-a197-4c5f-adab-879db1fcb0df/layeranimation_11.png)
    
    这些节点使动画实例能够指定给骨架网格体并且发出播放动画蒙太奇（在此示例中为武器开火蒙太奇）的信号。 当玩家按下我们指定的键时，我们将使用相同的脚本但是会改为调用填弹动画蒙太奇。
    
11.  **右键单击** 并复制选中的节点，然后将它们粘贴在图中的空白区域。
    
12.  **右键单击** 并添加一个 **R** 按键事件，按如下所示将它与复制的节点相连接（将 **要播放的蒙太奇（Montage to Play）** 设置为填弹蒙太奇）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9860772d-00a4-49c5-b931-c236118852cc/layeranimation_12.png)
13.  **编译（Compile）** 并 **在编辑器中播放（Play）**。
    

## 最终结果

在编辑器中播放时，如果按下 **R** 键，屏幕上角色的手将会先向下移动然后回到枪上（模拟填弹动作）。

你可以继续修改此动画，方法是移动到时间轴上的某一帧，选择你要修改的骨骼并为其设置关键帧，然后将时间轴向前移动一些，将骨骼移动到新位置并再次设置关键帧。随着时间轴推进，骨骼将沿着创建的曲线从第一个关键帧移动到第二个关键帧。你可以根据需要修改任意数量的骨骼来获得比我们的示例更精确的动画，但设置关键帧的过程是相同的。

### 常见问题

**如果导出动画会怎样？**

-   导出的动画将是可用动画的任意一个经过烘焙的版本。如果你应用所有曲线，它将带着曲线导出。

**如果重新导入动画会怎样？**

-   如果重新导入动画，它将覆盖源数据并应用曲线。如果你不需要曲线，可以将它们移除。

**我可以临时禁用或移除轨迹吗？**

-   可以，你可以在位于轨迹窗口右上角的 **轨迹选项（Track Options）** 菜单中进行这两种操作。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2298e41e-9737-461e-ab25-eaf53ad68d24/animedit25.png)

**有没有办法查看我编辑过的动画与源动画的差异？**

-   在 **显示（Show）** 菜单选项中，你可以启用 **源动画（Source Animation）** 和（或） **烘焙后动画（Baked Animation）**，以使它们在视口中显示。可以查看以白色骨架显示的源动画和以蓝色骨架显示的烘焙后动画，如下图所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52779ba0-c3a2-46a8-b0f9-083f0e6c85af/le_sourcebakedanim.png)
    
    不过请确保你已在 **显示（Show）-> 骨骼层级（Bone Hiearchy）** 菜单中启用了 **骨骼（Bones）** 显示。
    

**动画层编辑功能可用来创建根运动吗？**

-   是的。选择根骨骼并为其设置关键帧，然后将时间轴向前推进，移动根骨骼并重新设置关键帧。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5732d472-afe3-49ec-86fe-3c129cca8087/le_thirdpersonanim.png)
    
    在上面我们启用了源动画和烘焙后动画预览，其中白色骨架是源动画。
    

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animation blueprint](https://dev.epicgames.com/community/search?query=animation%20blueprint)
-   [animation montage](https://dev.epicgames.com/community/search?query=animation%20montage)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/editing-animation-layers#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/editing-animation-layers#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [常见问题](/documentation/zh-cn/unreal-engine/editing-animation-layers#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)
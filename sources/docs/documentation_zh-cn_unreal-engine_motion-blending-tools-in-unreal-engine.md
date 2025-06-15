# 虚幻引擎中的运动混合工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/motion-blending-tools-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:11:41.326Z

---

目录

![运动混合](https://dev.epicgames.com/community/api/documentation/image/fde61e9a-3075-4192-ad9e-4e53a58e7091?resizing_type=fill&width=1920&height=335)

当你在 **Sequencer** [动画轨道](/documentation/zh-cn/unreal-engine/cinematic-animation-track-in-unreal-engine)中对角色动画片段之间进行转换时，你可以使用 **运动混合（Motion Blending）** 工具来进一步提高混合质量。使用运动混合工具，你可以在动画片段之间动态地过其运动和世界位置。这在处理包含世界位移数据的动画时特别有用。

此处，一个角色从步行动画过渡到了跑步动画。在没有任何混合的情况下，过渡过程是一个僵硬的切换。使用简单的混合但不使用运动混合,动画仍然将角色的位置重置到动画的原点，但角色的网格体过渡十分平滑。通过用运动混合的方式来混合动画，世界的位置被保留了下来，动画的过渡也很流畅。

说明

示例

**无混合（No Blending)**

![no blending demo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b99ffa7-24db-4f32-b14b-befa7eacebfb/noblending.gif)

**无匹配的运动混合（Motion Blending with No Matching）**

![motion blending with no matching](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca0728c4-70db-4767-be01-5598d0589750/withblending.gif)

**有匹配的运动混合（Motion Blending with Matching）**

![motion blending with matching](WithmotionBlending.gif)(convert:false)

片段匹配（Clip Matching）会引用角色骨架中的一个骨骼，并将该骨骼的位置和运动与相邻片段中包含位移数据的骨骼（如根部或骨盆骨骼）相匹配。通过将选定的骨骼与相邻片段的位移相匹配，它会自动计算并设置一个偏移量以过渡到下一个动画，同时保留角色的位置。随后，偏移数据将被存储在Sequencer资产的动画部分。

## 使用运动混合

本节包含关于如何使用Sequencer中的运动混合工具混合动画的信息。

#### 先决条件

-   你的项目至少包含两个动画序列，这些动画序列包含一个带有世界位移数据的骨骼，如根骨骼或非根骨骼。

### 运动混合设置

要在Sequencer中使用运动混合来混合动画，首先在Sequencer编辑器中把你的动画添加到一个动画轨道上，确保它们按顺序播放或重叠播放。

![blending clips in sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d898ac0-7c3d-4747-8230-cc03689f0185/addsequences.png)

将你的播放头放到到第二个动画部分的开头，以设置计算动画偏移的时间。然后，右击第二个动画片段，找到 **在上个剪辑片段中匹配此骨骼**，在角色的骨架中选择一个与你要过渡的动画相关的骨骼，从而将第一个动画的最后位置与第二个动画混合。在这个工作流程的示例中，`l_foot` 骨骼被用于混合行走和运行动画。

![set up motion bleeding demo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b94989d8-1192-47b8-96a6-94e4abf32a13/setmbdemo.gif)

当你回放时，你的动画片断现在会将动画动作和世界位移位置融合在一起。

![motion blending demo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e22f3196-9e63-46af-b00f-0e2ff52e1842/motionblendingdemo.gif)

## 运动混合属性

运动混合具有以下属性：

属性

说明

**在上个剪辑片段中匹配此骨骼（Match With This Bone In Previous Clip）**

选择一块骨骼，在播放头的时间位置上，将所选动画片段的动作和位置与 **上个** 片段相匹配。

使用这个属性得到的结果是，动画的运动从上一个片段的位置继续。

![motion blending demo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd2c70b9-e769-4215-8196-be8d61fb1ae7/motionblendingdemo.gif)

**在下个剪辑片段中匹配此骨骼（Match With This Bone In Next Clip）**

选择一块骨骼，在播放头的时间位置上，将所选动画片段的动作和位置与 **下个** 片段相匹配。

使用这个属性会使动画的运动以原点为中心播放。

![match next clip demo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce7f0da2-7b08-4ec1-9b53-96a51cc4eece/matchnext.gif)

**匹配X和Y轴平移（Match X and Y Translation）**

当启用时，所选骨骼将与 **X** 和 **Y** 轴的平移匹配。这对地面运动很有帮助，可以方便保留角色的运动方向。

![motion blending x and y translation demo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c20d592-7437-434a-9138-b0135b3ea75e/motionblendingdemo.gif)

**匹配Z轴高度（Match Z Height）**

当启用时，所选骨骼将与动画的 **Z** 轴高度一致。这对影响角色在世界空间中的高度的动画很有帮助。

![motion blending height translation demo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/caafc79c-eece-4814-979e-41736ccc3b2c/matchheight.gif)

**匹配偏转旋转度（Match Yaw Rotation）**

当启用时，所选骨骼将与 **偏转**（**Z**）旋转度相匹配。

![motion blending yaw rotation demo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1fc91adf-f478-4b4d-ad98-4a4214208a46/yawrotation.gif)

**匹配俯仰旋转度（Match Pitch Rotation）**

当启用时，所选骨骼将与 **俯仰**（**Y**）旋转度相匹配。

![motion blending pitch rotation demo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/069d1552-d67f-4a3b-aaf3-733fe11777bd/pitchrotation.gif)

**匹配翻滚旋转度（Match Roll Rotation）**

当启用时，所选骨骼将与 **翻滚**（**X**）旋转度相匹配。

![motion blending roll rotation demo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b84d9923-5156-4060-ac43-42a992140ddf/rollrotation.gif)

**显示根运动足迹（Show Root Motion Trail）**

要查看整个动画轨道的根运动轨迹的调试渲染，请右击动画轨道并启用 **显示根运动足迹** 属性。根运动足迹将被渲染成一条黑白相间的条纹线，追踪每个动画片段的根部骨骼平移。

![show root motion trail property](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/feda182a-2812-4c20-bbc9-6ca062889db9/showroottrail.png)

### 根运动偏移设置

你可以在你的关卡序列中的每个动画片段上手动分配根运动偏移，如平移和旋转，以改变混合的结果。添加根运动足迹只能影响片段，而不是动画本身，并且只能应用与片段的任何运动混合之外。位置和旋转偏移也以动画片段的开始时间为重点，可以完美添加到剪辑的片断中。

要为一个动画片断设置根运动偏移，在Sequencer编辑器中右键单击该片断，并选择 **属性（Properties）** >**根运动（Root Motions）**。

![root motion offset properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9536282f-2f71-48b4-b803-4546c0caa3b2/rootmotionoffset.png)

根运动偏移具有以下属性：

属性

说明

**起始位置偏移（Start Location Offset）**

设置 **X**、**Y** 和 **Z** 值，以设置在应用匹配偏移之前应用于根骨骼的位置（平移）偏移。

**起始旋转偏移（Start Rotation Offset）**

设置 **翻滚**（**X**）、**俯仰**（**Y**）和 **旋转**（**Z**）值，以设置在应用匹配偏移之前应用于根骨骼的旋转偏移。

**匹配的位置偏移（Matched Location Offset）**

参考 **X**、**Y** 和 **Z** 值，这些值设置了由匹配的偏移量作为基础值添加到根骨骼的位置（平移）偏移。

**匹配的旋转偏移（Matched Rotation Offset）**

参考 **翻滚**（**X**）、**俯仰**（**Y**）和 **旋转**（**Z**）的值，这些值设置了由匹配的偏移量作为基础值添加到根骨骼上的旋转偏移。

你也可以在视口中通过在角色的根骨骼位置选择角色的一个变换小工具（Transform Gizmo）来编辑开始位置偏移和开始旋转偏移属性。

![root motion offset handles in viewport](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a0c4eee-5ba0-4c16-a9c7-1bdce1c24fa6/handles.png)

选择小工具后，你可以使用变换工具编辑偏移的位置和旋转。

![transform tool for root motion offsets in viewport](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/237d5a2e-a120-4175-a90c-0cdd7a7a2a12/manipulation.gif)

### 调试设置

使用这些调试工具观察并调试在Sequencer编辑器中创建电影片时的运动混合行为：

属性

说明

**显示骨架（Show Skeleton）**

要查看一个动画片断的骨架和根运动位移的调试图，请右击该动画片断并从上下文菜单中启用 **显示骨架** 属性。每个动画片段都会将角色的骨架渲染成不同的颜色，以区分动画。此外，每个动画的世界位移将被渲染成动画原点和包含世界位移数据的骨骼之间的一条红线。

![show skeleton property](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac6a8b1b-d7e1-4736-b987-277232b6be0e/showskeleton.png)

**颜色着色（Color Tint）**

你可以通过在Sequencer编辑器中右击该片段，然后选择属性，使用颜色着色属性设置一个颜色值，来手动设置每个动画片段的颜色。

![set section color property](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2b8be0a-0534-42f7-abf6-4a164d785e2a/setcolors.png)

颜色着色后的动画片断将在Sequencer编辑器中和视口中的骨架渲染上进行颜色编码。

![section colors sync with skeleton drawing](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cb189cd-9ab8-49d7-9e6b-8ef9e6d30b0e/colorcoded.png)

## 使用无根骨骼混合动作

如果你的动画不在 "根 "骨骼中存储角色位移，或者你的根骨骼是静止的的，例如使用运动捕捉数据创建的动画，你仍然可以使用根的首个子骨骼（通常标记为 "骨盆"），来混合动画的世界位移位置。在你的动画片断上启用运动混合后，右击动画轨道，启用 **混合根的首个子项（Blend First Child of Root）** 属性。

![blend first child of root property](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/427012f2-6529-4a71-abe5-1f28d9d99917/firstchild.png)

**混合根的首个子项** 属性不使用根骨骼，而使用角色骨架中的第一个动画子骨骼来混合动画的运动。

不应用混合根的首个子项

应用混合根的首个子项

![without first child of root property](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b35439b-a07c-4008-96ab-02dc81aa0da0/withoutfirstchildofroot.gif)

![with first child of root property](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b05224ca-a0ba-478b-8130-ecb0e85ddd9b/withfirstchildofroot.gif)

将有根运动的动画和无根运动的动画混合可能无法产生最佳效果。

## Control Rig集成

要进一步编辑Sequencer中动画之间的混合，例如对角色的四肢、脚部放置或位置进行微小的编辑和调整，你可以使用[Additive FK Control Rig](/documentation/zh-cn/unreal-engine/fk-control-rig-in-unreal-engine#additivefk)来手动键入角色的动画，而不覆盖运动混合的效果。

关于在虚幻引擎中动画制作的更多信息，请参阅以下文档：

[](/documentation/zh-cn/unreal-engine/animating-with-control-rig-in-unreal-engine)

[![使用控制绑定实现动画效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f74a9ace-faf3-462c-a49e-856583c95268/topicimage.png)](/documentation/zh-cn/unreal-engine/animating-with-control-rig-in-unreal-engine)

[使用控制绑定实现动画效果](/documentation/zh-cn/unreal-engine/animating-with-control-rig-in-unreal-engine)

[介绍如何借助各种工具和流程实现控制绑定动画。](/documentation/zh-cn/unreal-engine/animating-with-control-rig-in-unreal-engine)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [blending](https://dev.epicgames.com/community/search?query=blending)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用运动混合](/documentation/zh-cn/unreal-engine/motion-blending-tools-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%BF%90%E5%8A%A8%E6%B7%B7%E5%90%88)
-   [先决条件](/documentation/zh-cn/unreal-engine/motion-blending-tools-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [运动混合设置](/documentation/zh-cn/unreal-engine/motion-blending-tools-in-unreal-engine#%E8%BF%90%E5%8A%A8%E6%B7%B7%E5%90%88%E8%AE%BE%E7%BD%AE)
-   [运动混合属性](/documentation/zh-cn/unreal-engine/motion-blending-tools-in-unreal-engine#%E8%BF%90%E5%8A%A8%E6%B7%B7%E5%90%88%E5%B1%9E%E6%80%A7)
-   [根运动偏移设置](/documentation/zh-cn/unreal-engine/motion-blending-tools-in-unreal-engine#%E6%A0%B9%E8%BF%90%E5%8A%A8%E5%81%8F%E7%A7%BB%E8%AE%BE%E7%BD%AE)
-   [调试设置](/documentation/zh-cn/unreal-engine/motion-blending-tools-in-unreal-engine#%E8%B0%83%E8%AF%95%E8%AE%BE%E7%BD%AE)
-   [使用无根骨骼混合动作](/documentation/zh-cn/unreal-engine/motion-blending-tools-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%97%A0%E6%A0%B9%E9%AA%A8%E9%AA%BC%E6%B7%B7%E5%90%88%E5%8A%A8%E4%BD%9C)
-   [Control Rig集成](/documentation/zh-cn/unreal-engine/motion-blending-tools-in-unreal-engine#controlrig%E9%9B%86%E6%88%90)
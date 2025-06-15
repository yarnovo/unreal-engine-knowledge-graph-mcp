# 虚幻引擎中的面部动画共享 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/facial-animation-sharing-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:09:43.225Z

---

目录

![面部动画共享](https://dev.epicgames.com/community/api/documentation/image/1c9eb2f6-1da7-4a66-b1cc-f045eb3e8615?resizing_type=fill&width=1920&height=335)

![FacialAnimationSharing.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe28d9e1-e94c-4370-938a-a7534aaae077/facialanimsharingbanner.png "FacialAnimationSharing.png")

如果您的项目中有多个类似的角色并共享同一个骨架资源，则可能需要考虑使用曲线驱动动画来制作面部表情。这样，您就可以共享这些动画曲线，并通过姿势资源驱动它们以产生您所需的面部表情，甚至在多个骨架网格体之间共享它们。 

但必须注意的一点是，动画不得包含任何骨骼变形数据。任何骨骼变形数据，哪怕只有一个网格体的参照姿势，也无法对其他网格体发挥作用，因此如果想要在不同网格体之间共享曲线，必须移除骨骼变形（仅保留曲线），并从每个网格体自己的参照姿势入手。这样您就可以在不同面部之间共享面部曲线。

以下是一个示例工作流程，您的工作流程可能根据资源和所需结果而有所不同。

## 创建和使用主骨架

首先需要导入基础骨架网格体，并创建将被视为主骨架的骨架资源（这是想要共享面部表情的每个其他骨架网格体将会使用的资源）。您导入的任何其他网格体应当拥有相同的骨骼层级和命名约定，以便共享骨骼资源。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31a469ad-f082-45ad-85b4-05566cc724af/masterskeleton_01.png "MasterSkeleton_01.png")

请参阅[骨骼资源](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)文档页面以了解关于骨骼的更多信息。

## 创建姿势资源

接下来需要在DCC内部，烘焙姿势到FBX序列，并将该FBX导入到虚幻引擎中。这样将产生一个动画序列，其中包含处于最小/最大混合值的每一个曲线。 

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50052822-c559-4344-8b6b-ec34c4408c9c/createposeasset.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50052822-c559-4344-8b6b-ec34c4408c9c/createposeasset.png)

单击查看大图。

在上图中，导入的动画序列包含所有曲线以及给定帧处的最大值。

导入了包含所有曲线数据的序列后，可以从该动画序列创建[姿势资源](/documentation/zh-cn/unreal-engine/animation-pose-assets-in-unreal-engine)，继而用来将动画曲线数据转换为角色的实际面部动画。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c935d4d-415e-4795-90da-d719aee4b100/animationsequence_02.png "AnimationSequence_02.png")

您可以右键单击动画序列，并用快捷菜单根据它创建姿势资源。

在姿势资源内部，需要手动输入每个名称，或者复制粘贴剪贴板中存储的数据来定义姿势名称。 

以下是58帧动画序列中识别的所有姿势列表，这个序列包含了我们导入的所有姿势： 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65064a79-7e28-4986-9647-bd2019b4c736/facial_poses.png "Facial_Poses.png")

然后，我们可以将它们作为姿势资源中的姿势名称应用： 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/682c6696-480c-443b-a8bd-cf010da3c96b/poseassetblank.png)

然后您将会在随着骨架资源一起存储的 **动画曲线（Anim Curves）** 窗口中看到这些曲线。 

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7456c88d-757a-4a43-8093-31e4198490c4/masterskeletonimage.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7456c88d-757a-4a43-8093-31e4198490c4/masterskeletonimage.png)

单击查看大图。

每一个使用主骨架的角色都会访问这些曲线，并用每个曲线中表示的不同值驱动自己的面部表情，同时姿势资源将所有曲线数据转换为角色采用的实际动画姿势。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7644f5d3-6651-4e56-b0d5-d08af00d0189/animationsequence_03.png "AnimationSequence_03.png")

*在上面，我们将jaw\_open\_pose的默认值从0更改为1，这样让角色张开了嘴。*

在姿势资源中输入您的姿势名称时，通常最好从 **动画曲线（Anim Curves）** 窗口中删除不使用的曲线，以尽量减少要显示的不使用的曲线数量。

在下面的姿势资源中，我们可以看到所有的姿势名称，同时它们也会出现在动画曲线（Anim Curves）窗口中：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97b1d063-3cd4-4a79-a6cd-4d17d533a608/poserename1-1.png "PoseRename1-1.png")

当我们将 **Pose\_0** 更改为 **l\_eye** 时，**Pose\_0** 保持为动画曲线（Anim Curves）中的一条曲线，单击右键并选择 **删除曲线（Delete Curve）** 可以将它删除。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37ead396-8b48-428a-ae7e-fc2d1c1595cd/poserename2.png)

## 建立父/子动画蓝图

有了姿势资源后，需要为该角色创建 **动画蓝图** 来利用曲线驱动的动画，最后创建 **姿势资源（Pose Asset）** 节点（分配姿势资源）来正确地将曲线数据转换为角色可以使用的姿势。 

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46b95b73-98f0-4f0b-afed-494c94170baa/parentchild_01.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46b95b73-98f0-4f0b-afed-494c94170baa/parentchild_01.png)

单击查看大图。

如果将曲线驱动的动画直接插入到最终动画姿势，动画姿势就不会知道如何将曲线转换为姿势数据。这时就轮到姿势资源发挥作用了，它负责拦截动画，正确地将曲线转换为角色可以使用的实际姿势数据。 

当您有其他角色时，如果从该主动画蓝图为它们创建并分配子动画蓝图，可以使用每个角色的特有姿势资源数据覆盖此姿势资源。这样就可以实现角色的特定差量，确保比如尖叫等效果能够在各种比例上都看起来正确。 

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa85fee6-460b-451e-9be4-29a5c0de0a4d/parentchild_02.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa85fee6-460b-451e-9be4-29a5c0de0a4d/parentchild_02.png)

单击查看大图。

以上图中我们有另一个角色在使用基于主蓝图的子动画蓝图。

在子动画蓝图中，我们覆盖了姿势资源以使用特定于该角色的资源，让我们可以使用差量来驱动特定于该角色的面部姿势，并且显示的动画来自于父代。

## 引入动画

开始为角色引入面部动画时，除了曲线驱动的面部动画之外，通常需要一些由角色骨骼驱动的肢体动画。为了共享肢体动画，而不是通过曲线驱动面部动画，您需要从面部动画移除任何骨骼轨道，仅留下曲线，或者使用动画修饰符来移除指定的骨骼轨道，并驱动面部曲线。 

具体的工作原理是怎样的呢？例如，我们以下面的动画序列为例： 

![BringInAnimation_01.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0c9b853-06ce-4556-b469-1a7a82b52d92/bringinanimation_01-resize885x625.png "BringInAnimation_01.png")

我们的动画序列包含所有曲线和这些曲线的键值，它们表示不同的面部姿势。但问题是曲线也是基于任何骨骼驱动的动画播放的，这样就会导致双重变形和不正确的结果。在这种情况下，您需要移除这些骨骼变形，仅留下曲线。 

您可以从"资源（Asset）"菜单中的动画下面移除所有骨骼轨道： 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69c066fe-e859-4912-9cab-1b9eb40ac539/bringinanimation_04.png "BringInAnimation_04.png")

您还可以使用动画修饰符移除特定骨骼，但前提是您只想共享肢体动画，而不是面部的驱动曲线。通常，您需要有骨骼驱动的肢体动画，而不是曲线驱动的面部表情，此时我们可以选择使用动画修饰符。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e316e5e-988b-4c4c-befc-01029e0d31ee/bringinanimation_02.png "BringInAnimation_02.png")

这里，动画序列和指定的要移除的骨骼轨道（包括其子代）在应用修饰符后就完成了。

您可以将[父类](/documentation/zh-cn/unreal-engine/creating-blueprint-classes-in-unreal-engine)设置为动画修饰符来创建蓝图，从而创建动画修饰符。

在您导入的任何动画上，可以前往动画修饰符部分，应用您创建的动画修饰符来移除骨骼变形。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28e60e6d-1bb9-44f7-a372-eca7656d8478/bringinanimation_03.png "BringInAnimation_03.png")

添加动画修饰符后，可以单击以应用修饰符。

对于仅保留曲线，您可以通过动画蓝图中的姿势资源运行动画，这样就会获得可以共享的曲线驱动姿势。在下文，我们将曲线驱动动画直接连接到最终动画姿势，但是没有使用这个姿势，因为它不知道如何处理曲线。然后我们将它连接到姿势资源以驱动这些曲线，让角色执行面部表情。 

每个角色都使用子动画蓝图和它们分配到的姿势资源，因此现在可以使用相对差量来共享面部表情。由于我们没有骨骼变形，动画完全是由曲线驱动的，因此我们看不到双重变形，可以将它与任何其他骨骼驱动的动画数据（例如全身动画）相混合。 

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [pose asset](https://dev.epicgames.com/community/search?query=pose%20asset)
-   [facial animation](https://dev.epicgames.com/community/search?query=facial%20animation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建和使用主骨架](/documentation/zh-cn/unreal-engine/facial-animation-sharing-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E4%BD%BF%E7%94%A8%E4%B8%BB%E9%AA%A8%E6%9E%B6)
-   [创建姿势资源](/documentation/zh-cn/unreal-engine/facial-animation-sharing-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%A7%BF%E5%8A%BF%E8%B5%84%E6%BA%90)
-   [建立父/子动画蓝图](/documentation/zh-cn/unreal-engine/facial-animation-sharing-in-unreal-engine#%E5%BB%BA%E7%AB%8B%E7%88%B6/%E5%AD%90%E5%8A%A8%E7%94%BB%E8%93%9D%E5%9B%BE)
-   [引入动画](/documentation/zh-cn/unreal-engine/facial-animation-sharing-in-unreal-engine#%E5%BC%95%E5%85%A5%E5%8A%A8%E7%94%BB)
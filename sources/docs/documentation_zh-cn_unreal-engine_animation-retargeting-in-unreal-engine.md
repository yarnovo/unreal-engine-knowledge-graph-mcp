# 虚幻引擎动画重定位 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-retargeting-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:05:08.332Z

---

目录

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04ba5e61-30bb-4149-8256-c3c72588e91c/retargetingheader.png)

**动画重定位** 是一种允许在共用相同[骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)资源但比例差异很大的角色之间复用动画的功能。通过重定位，可以防止生成动画的骨架在使用来自不同外形的角色的动画时丢失比例或产生不必要的变形。 通过动画重定位，还可以在使用 **不同骨架** 资源的角色之间共享动画，前提是他们使用相似的骨骼层级，并使用名为 **绑定（Rig）** 的共享资源在骨架之间传递动画数据。

## 为何使用重定位？

假设您有多个角色，您希望在基本角色、矮壮角色和高瘦角色之间共享动画。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72bb7d2f-0271-4235-ba52-34fa2082f4e6/basecharacter.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/201937e0-05e7-49d7-8e97-a399bbdb441c/shortstocky.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72872ad9-886b-4bdb-804d-1a91afd3b22e/tallskinny.png)

基本角色

矮壮角色

高瘦角色

### 重定位前的结果

在应用重定位前，您就可以在任何共用相同骨架资源的骨骼网格之间使用动画。但是，如果角色身材比例如上图所示有差异，就会得到一些很难看的结果。请注意矮个角色是如何被不必要地拉长的，高个角色又是如何被压短的，这都是系统为了使其符合基本角色的骨骼比例而进行的更改。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f42e10d2-715d-4156-90ec-8f580fa49805/basecharacterrunning.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6257aa66-8c2b-4a33-921b-68ebf6b55ed4/shortstockyrunning.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68fa21d7-4daa-4a8a-8f23-d30316aa2001/tallskinnyrunning.png)

基本角色

矮壮角色

高瘦角色

### 重定位后的结果

对角色应用重定位以后，系统就不再考虑它们的比例差异，动画会在每个角色身上正常播放。 您也可以转到 **视口（Viewport）** 选项中的 **显示（Show）>非重定位动画（Non-Retargeted Animation）** 来查看原骨架（以米黄色显示）和当前骨架（白色）的差异。请注意，在基本角色身上，米黄色的非重定位骨骼与骨架是完美重合的。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f86f6a0-75cc-41c0-9bc2-516428d9cf65/basecharacterrunningretargetedbones.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2fae788a-3b57-4594-8c8d-e5a6c0846aa8/shortstockyrunningretargetedbones.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5ffc375-29f2-4569-880d-a16da3dee682/tallskinnyrunningretargetedbones.png)

基本角色

矮壮角色

高瘦角色

## 重定位的原理是怎样的？

动画绑定到[骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)资源。骨架资产其实就是一个骨骼名称和层次结构数据的列表，但它也存储了来自用于定义骨架资产的原始骨骼网格的初始比例。此数据是以骨骼平移数据的形式存储的。特别要注意的是，重定位系统只会重定位骨骼的平移分量。骨骼的旋转始终来自动画数据。

因为使用了原始骨骼网格定义骨架资产的比例，所以使用该骨架资产但有不同比例的其他任何骨骼网格（例如比原始网格短得多的网格）都需要经过重定位才能正确工作。如果不经过这一步，具有不同比例的骨骼网格会尝试使用原始网格的平移数据，导致我们在本文开头看到的各种错误。

为了解决这个问题，**骨架编辑器** 中的骨架树提供了几个设置，用于更改处理骨骼之间平移重定位的方式。有 3 种不同设置可用于骨骼平移重定位：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb2a1499-06fe-40ab-aefe-97ceb8e1f2f9/retargetingsettings.png)

-   **Animation（动画）**——骨骼平移来自动画数据，不做改变。
-   **Skeleton（骨架）**——骨骼平移来自目标骨架的绑定姿势。
-   **比例动画（AnimationScaled）**——骨骼平移来自动画数据，但按骨架的比例调整。这是目标骨架（播放动画的骨架）与源骨架（制作动画的骨架）的骨骼长度之比。

此外，对于动画重定位，使用重定位动画和非重定位动画没有显著的性能差异。使用动画重定位的好处是增加独特角色的数量，又不必创建全新的一套匹配动画，重新做动画可能会严重占用您的动画存储预算。

### 不同骨架的重定位动画

在为不共享相同骨架资源的角色处理动画重定位时，需要指定一个特殊的资源，名为 **绑定（Rig）**，它负责处理骨架之间传递的动画数据。 与各个角色关联的骨架资源通过共享的 **绑定（Rig）** 资源通信，以正确地将变换数据从一个源传递到其预定目标。

**绑定（Rig）** 可以在 **骨架编辑器** 中的[重定位管理器](/documentation/zh-cn/unreal-engine/animation-retargeting-in-unreal-engine#%E4%BD%BF%E7%94%A8%E9%87%8D%E5%AE%9A%E4%BD%8D%E6%BA%90%E7%AE%A1%E7%90%86%E5%99%A8)中指定，同一个绑定需要指定给两个骨架资源。

请参阅[使用重定向动画](/documentation/zh-cn/unreal-engine/using-retargeted-animations-in-unreal-engine)以了解逐步指南。

## 重定位如何处理最终效果器？

高个角色会跑得更快吗？它们能拿住相同的道具吗？——这些都是使用重定位时可能出现的问题。简而言之，这里没有自动完成的工作，要由用户来决定如何实施。

关于保持比例，有一种方法是创建单独的一串骨骼，跟随原始动画中的手部运动，称为"手IK骨骼"。然后重定位身体和手臂，但不重定位"手IK骨骼"，使其在重定位后保持原样。这样您就可以让不同比例的角色操作相同的道具（例如，给步枪装弹）。

通过单独设置一串骨骼可以在您需要时方便地在 FK 和 IK 之间平滑切换（例如您希望在装填武器弹药时打开"手IK"，在从口袋里取弹夹时关闭"手IK"）。

这个系统非常灵活，可以根据您的需要定制。也许您只希望左手是IK，而右手使用其FK位置和IK旋转。有时可以这样处理脚部，有时不需要这样处理。当角色踩踏非常精确的道具时，您会希望打开IK；当角色只是四处奔跑时，您会希望使用FK，以免产生罗圈腿的角色（或相反）。

## 设置重定位

如上文重定位工作原理中所述，首先需要为骨架中的骨骼设置 **骨骼平移重定位** 模式。

通常您需要对两足生物使用这些设置：

-   根骨骼、IK骨骼、武器骨骼和任何一种将使用动画模式的标记。
-   骨盆将使用比例动画，以确保其在正确的高度，同时仍能动作。
    -   您希望平移和重定位动画的其他任何骨骼也应该使用比例动画。
-   所有其他骨骼都应使用骨架。它们将使用来自目标骨架的静态平移。

这意味着快速工作流程应该是：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16de762d-8587-4a94-9155-c92077856a79/recursivelyset.png)

1.  **右键单击** 根骨骼，并 **递归地设置平移重定位骨架**，以便所有骨骼都设置为"骨架"（Skeleton）。
2.  找到骨盆或与之相当的骨骼，将其设置为 **比例动画（AnimationScaled）**。
3.  找到根骨骼，所有IK骨骼、所有武器骨骼或其他标记式的骨骼，将它们设置为使用 **动画（Animation）**。

如果要重定位共享相同骨架资源的角色的动画，这些动画现在将受到动画重定位的影响。 如果要重定位不共享相同骨架资源的角色的动画，则需要执行一些额外步骤，确保正确重定位动画。 请参阅[使用重定向动画](/documentation/zh-cn/unreal-engine/using-retargeted-animations-in-unreal-engine)来获取更多信息。

## 使用重定位源管理器

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0b7f01b-1c73-44cb-862f-b83900f31cf2/baseposemanager.png)

在动画重定位中使用的另一个工具是 **重定位管理器**，它可以让您：

-   **管理重定位源（Manage Retarget Source）** 资源——如果每个骨架有不同比例的网格体则十分有用，您可以使用该设置来指示某个特定动画是否来自于另一个来源。
-   **设置绑定（Set up Rig）**——将动画重定位到使用相同绑定的不同骨架。
-   **管理重定位基本姿势（Manage Retarget Base Pose）**——重定位资源到其他骨架时可以使用，允许更改目标的基本姿势，以使其与源基本姿势一致，并提供更准确的重定位动画。

请参阅 [重定向管理器](/documentation/zh-cn/unreal-engine/retarget-manager-in-unreal-engine) 页面来获取更多信息。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animation features](https://dev.epicgames.com/community/search?query=animation%20features)
-   [animation retargeting](https://dev.epicgames.com/community/search?query=animation%20retargeting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [为何使用重定位？](/documentation/zh-cn/unreal-engine/animation-retargeting-in-unreal-engine#%E4%B8%BA%E4%BD%95%E4%BD%BF%E7%94%A8%E9%87%8D%E5%AE%9A%E4%BD%8D%EF%BC%9F)
-   [重定位前的结果](/documentation/zh-cn/unreal-engine/animation-retargeting-in-unreal-engine#%E9%87%8D%E5%AE%9A%E4%BD%8D%E5%89%8D%E7%9A%84%E7%BB%93%E6%9E%9C)
-   [重定位后的结果](/documentation/zh-cn/unreal-engine/animation-retargeting-in-unreal-engine#%E9%87%8D%E5%AE%9A%E4%BD%8D%E5%90%8E%E7%9A%84%E7%BB%93%E6%9E%9C)
-   [重定位的原理是怎样的？](/documentation/zh-cn/unreal-engine/animation-retargeting-in-unreal-engine#%E9%87%8D%E5%AE%9A%E4%BD%8D%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E6%80%8E%E6%A0%B7%E7%9A%84%EF%BC%9F)
-   [不同骨架的重定位动画](/documentation/zh-cn/unreal-engine/animation-retargeting-in-unreal-engine#%E4%B8%8D%E5%90%8C%E9%AA%A8%E6%9E%B6%E7%9A%84%E9%87%8D%E5%AE%9A%E4%BD%8D%E5%8A%A8%E7%94%BB)
-   [重定位如何处理最终效果器？](/documentation/zh-cn/unreal-engine/animation-retargeting-in-unreal-engine#%E9%87%8D%E5%AE%9A%E4%BD%8D%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E6%9C%80%E7%BB%88%E6%95%88%E6%9E%9C%E5%99%A8%EF%BC%9F)
-   [设置重定位](/documentation/zh-cn/unreal-engine/animation-retargeting-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E9%87%8D%E5%AE%9A%E4%BD%8D)
-   [使用重定位源管理器](/documentation/zh-cn/unreal-engine/animation-retargeting-in-unreal-engine#%E4%BD%BF%E7%94%A8%E9%87%8D%E5%AE%9A%E4%BD%8D%E6%BA%90%E7%AE%A1%E7%90%86%E5%99%A8)
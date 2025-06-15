# 虚幻引擎中的混合遮罩和混合描述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blend-masks-and-blend-profiles-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:05:29.493Z

---

目录

![混合遮罩和混合描述](https://dev.epicgames.com/community/api/documentation/image/57657228-579b-4421-a14e-e93658f778ac?resizing_type=fill&width=1920&height=335)

在创建复杂的动画逻辑时，有时会需要对动画混合施加更为细致的控制，而不是同时混合所有骨骼。**混合遮罩（Blend Masks）** 可以用于将骨骼排除在混合之外，而 **混合描述（Blend Profiles）** 用于控制不同骨骼的混合速度。这些额外的混合控制可以改进游戏动画的真实性和兼容性。

该页面介绍如何创建并使用混合遮罩和混合描述。

#### 先决条件

-   你的项目需要包含一个[骨骼网格体Actor](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)和[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine).
    
-   你对于如何创建并使用[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)有基本的了解。
    

## 混合遮罩

**混合遮罩（Blend Masks）** 可以添加至骨骼，用于定义权重的影响，从而部分或者完全阻止动画在特定的骨骼上播放。你可以在[每个骨骼的分层混合](/documentation/zh-cn/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine#layeredblendperbone)上使用这个预设的定义来在特定骨骼上播放动画。

一个常见的混合遮罩的用例为排除下半身的骨骼，只让上半身的骨骼播放动画，忽视全身的状态。这对于武器相关的动画非常有用，可以让上半身在不考虑整个身体的状态下完成重装填、装备和射击等动作。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c23558da-1137-469b-863c-2d5b99c7144a/blendmaskon.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7948df4-b6c5-4f2e-ab94-c82cafd1f096/blendmaskoff.gif)

使用混合遮罩

不使用混合遮罩

### 创建混合遮罩

你可以在骨骼网格体的[骨骼树](/documentation/zh-cn/unreal-engine/blend-masks-and-blend-profiles-in-unreal-engine#headername)中创建混合遮罩。在骨骼树中点击 **选项（Options）** 下拉菜单然后选择 **添加混合遮罩（Add Blend Mask）**。将其命名然后按下 **回车（Enter）**。

![添加混合遮罩](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29f61c07-eeaa-468e-8971-91ea347ff3da/blendmask1.png)

创建好后，一个 **混合列（Blend column）** 会出现在骨骼树中，显示所有的混合遮罩。如果有多个混合遮罩，你可以在**选项（Options）** 菜单中选择切换。

![混合遮罩视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c21a4e3-15c0-4e8d-8205-7d0c32597c0c/blendmask2.png)

要删除当前查看的混合遮罩，点击骨骼树中的 **选项（Options）** 下拉菜单并选择清除。

![删除混合遮罩](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2275d7a-7408-4448-bf1d-66397fabd24f/blendmask3.png)

混合遮罩和混合描述都保存在[骨骼](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)资产中。因此，创建或编辑混合遮罩便是对骨骼资产进行编辑。

### 编辑混合遮罩数值

混合列显示混合遮罩中每块骨骼的当前数值。每块骨骼都可以分配一个 **0 - 1** 之间的数值。**0** 意味着动画不会在该骨骼上播放，而 **1** 代表动画完全播放。

你可以通过在数值上拖动来启用滑块控制，也可以选中并直接输入数值。

![编辑混合遮罩](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/acee1b21-26ea-4417-a7f7-40ebe9a5d79b/blendmask4.gif)

你可以将所有子级骨骼设为同样的数值，右键点击母级骨骼然后选择 **归递地将混合范围设为（Recursively Set Blend Scales）**，这样就可以将该混合数值应用到多个骨骼。

![归递地设置混合范围](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fedf90d-d6ff-4b4f-9a02-0f1966293d51/blendmask5.gif)

如果你找不到编辑混合遮罩数值的列，你可能需要右键点击顶部标签然后启用 **混合描述（Blend Profile）**。

![混合描述列](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b730369e-3c28-4abc-9314-572c31589f7c/blendmask8.png)

### 使用混合遮罩

创建并设置好混合遮罩后，就可以在[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)中使用了。请将你的混合遮罩设置在动画图表的[每个骨骼的分层混合](/documentation/zh-cn/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine#layeredblendperbone) 节点上。

在你的动画蓝图动画图表中，右键点击并创建一个 **每个骨骼的分层混合（Layered blend per bone）** 节点，然后在 **细节（Details）** 面板中设置以下属性：

-   **混合模式（Blend Mode）** 设为 **混合遮罩（Blend Mask）**.
-   **混合遮罩（Blend Masks）** 设为你的混合遮罩。

![每个骨骼的分层混合节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d76abdb-2f8e-451d-b5fd-d0e5e67276df/blendmask6.png)

连接你的输入源基础和混合姿势，就可以看到混合遮罩正在运作。在这个示例中，我们使用了上半身混合遮罩。

![混合遮罩最终效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f58b3c9-4a53-45fc-8104-dac82fe34873/blendmask7.gif)

虽然同样的结果也可以通过在每个骨骼的分层混合节点上用默认的 **分支过滤（Branch Filter）** 混合模式来实现，混合遮罩可以让你更容易地在骨骼上重新使用这些遮罩值。

## 混合描述

**混合描述（Blend Profiles）** 可以添加至骨骼，用于定义每个骨骼的混合速度，从而让一些骨骼比其它的骨骼更快混合。混合描述可以在混合时使用以下方法：

-   [按布尔混合姿势](/documentation/zh-cn/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine#blendposesbybool).
-   [按整型混合姿势](/documentation/zh-cn/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine#blendposesbyint).
-   [按枚举混合姿势](/documentation/zh-cn/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine#blendposesbyenum).
-   [状态机过渡](/documentation/zh-cn/unreal-engine/transition-rules-in-unreal-engine).
-   [动画蒙太奇](/documentation/zh-cn/unreal-engine/animation-montage-in-unreal-engine).

混合描述的一个用例为让下半身比上半身更快混合，在静止和运动状态间过渡时非常有用。这样可以让角色在停止运动时，脚部看起来更加稳健地立在地面上，而从静止开始运动时，下半身的动作比上半身更早，看起来更加自然。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa960280-ba27-4545-aa67-a58d7a2531bd/blendprofileon.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57ac7e62-a0de-4192-b26d-7c726ab63257/blendprofileoff.gif)

使用混合描述（腿部更快混合)

不使用混合描述

与混合遮罩一样，混合描述也在骨骼树中[创建](/documentation/zh-cn/unreal-engine/blend-masks-and-blend-profiles-in-unreal-engine#creatingblendmasks)、管理和[编辑](/documentation/zh-cn/unreal-engine/blend-masks-and-blend-profiles-in-unreal-engine#editingblendmaskvalues)。点击骨骼树的 **选项（Options）** 下拉菜单然后选择 **添加时间混合描述（Add Time Blend Profile）** 或者 **添加权重混合描述（Add Weight Blend Profile）**。

![创建混合描述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/633ede7e-a947-466b-9a69-6dae8cb5ca92/blendprofile1.png)

由于混合遮罩和混合描述的数值占据骨骼树中的同一列并且位于选项菜单的同一区域中，你应该确保它们命名明确以避免混淆。

![混合名称](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/980fc3cf-6f07-450c-b1aa-bc791f49a11b/blendnames.png)

### 时间混合描述

**时间混合描述（Time Blend Profiles）** 在混合时使用归一化的 (0 - 1) 因数乘以基本的混合值。数值 **1.0** 意味着以正常速度混合，数值越小混合越快。数值 **0.0** 代表瞬间混合。

举个例子，如果如下进行设置：

-   骨盆和所有上半身骨骼设为 **1.0**。
-   腿和所有下半身骨骼设为 **0.5**。

这会导致腿部根据该混合描述的基本混合时间，以两倍的速度进行混合。如果将其在 **以布尔混合姿势（Blend Poses by bool）** 节点上使用，基本混合时间设为 **2.0** 秒，那么腿部只需要 **1.0** 秒来完成混合。其余所有设为 **1.0** 的骨骼仍然需要基础的 **2.0** 秒。

![时间混合描述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d165c9ab-26bc-44fe-ba9d-50531be1131a/timeblend1.png)

### 权重混合描述

**权重混合描述（Weight Blend Profiles）** 在混合时相对基本混合值使用权重因子。数值 **1.0** 将会以正常速度混合，数值越大，混合速度越快。

举个例子，如果如下进行设置：

-   骨盆和所有上半身骨骼设为 **1.0**。
-   腿和所有下半身骨骼设为 **2.0**。

这会导致腿部根据该混合描述的基本混合时间，以两倍的速度进行混合。数值 **2.0** 意味着 **两倍** 速度，**3.0** 则为 **三倍** 速度。

![权重混合描述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a05ebbfe-2435-40c5-b79c-95a1b77cda3f/weightblendprofile1.png)

### 使用混合描述

创建并设置好混合描述后，可以用以下方式将其应用：

1.  使用 **动画蓝图动画图表（Animation Blueprint Anim Graph）** 的[混合姿势](/documentation/zh-cn/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine#blendposesbyint)节点，选择节点并在 **细节（Details）** 面板找到 **混合配置（Blend Profile）** 属性。
    
    ![混合描述混合姿势节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e3b3ee5-9db6-457f-8a41-0d0641cfdd31/usingblendprofile1.png)
    
2.  使用[状态机过渡规则](/documentation/zh-cn/unreal-engine/transition-rules-in-unreal-engine)，选择 **过渡规则（transition rule）** 并在 **细节（Details）** 面板中找到 **混合配置（Blend Profile）** 属性。
    
    ![混合描述状态机](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7194615-4a72-4ae8-9ff7-4a186ae82358/usingblendprofile2.png)
    
3.  在[动画蒙太奇](/documentation/zh-cn/unreal-engine/animation-montage-in-unreal-engine)编辑器中，可以使用 **资产详情（Asset Details）** 面板中的 **混入描述（Blend Profile In）** 和 **混出描述（Blend Profile Out）** 属性来为蒙太奇的混合设置不同的混合描述。
    
    ![混合描述蒙太奇](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e7acf61-52b8-4bd7-939e-0604b929fa3f/usingblendprofile3.png)
    

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/blend-masks-and-blend-profiles-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [混合遮罩](/documentation/zh-cn/unreal-engine/blend-masks-and-blend-profiles-in-unreal-engine#%E6%B7%B7%E5%90%88%E9%81%AE%E7%BD%A9)
-   [创建混合遮罩](/documentation/zh-cn/unreal-engine/blend-masks-and-blend-profiles-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%B7%B7%E5%90%88%E9%81%AE%E7%BD%A9)
-   [编辑混合遮罩数值](/documentation/zh-cn/unreal-engine/blend-masks-and-blend-profiles-in-unreal-engine#%E7%BC%96%E8%BE%91%E6%B7%B7%E5%90%88%E9%81%AE%E7%BD%A9%E6%95%B0%E5%80%BC)
-   [使用混合遮罩](/documentation/zh-cn/unreal-engine/blend-masks-and-blend-profiles-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%B7%B7%E5%90%88%E9%81%AE%E7%BD%A9)
-   [混合描述](/documentation/zh-cn/unreal-engine/blend-masks-and-blend-profiles-in-unreal-engine#%E6%B7%B7%E5%90%88%E6%8F%8F%E8%BF%B0)
-   [时间混合描述](/documentation/zh-cn/unreal-engine/blend-masks-and-blend-profiles-in-unreal-engine#%E6%97%B6%E9%97%B4%E6%B7%B7%E5%90%88%E6%8F%8F%E8%BF%B0)
-   [权重混合描述](/documentation/zh-cn/unreal-engine/blend-masks-and-blend-profiles-in-unreal-engine#%E6%9D%83%E9%87%8D%E6%B7%B7%E5%90%88%E6%8F%8F%E8%BF%B0)
-   [使用混合描述](/documentation/zh-cn/unreal-engine/blend-masks-and-blend-profiles-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%B7%B7%E5%90%88%E6%8F%8F%E8%BF%B0)
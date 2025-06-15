# 虚幻引擎中的运动扭曲 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:06:34.226Z

---

目录

![运动扭曲](https://dev.epicgames.com/community/api/documentation/image/b950b21c-f667-42f1-89d1-85d7d321f57d?resizing_type=fill&width=1920&height=335)

**运动扭曲** 是一种可以动态调整角色的根骨骼运动以对齐目标的功能。本文档介绍如何在角色蓝图中创建运动扭曲逻辑，在动画蒙太奇中分配运动扭曲窗口，并链接到指定位置。

#### 先决条件

-   必须启用 **运动扭曲（Motion Warping）** 插件。如需详细了解插件及其安装方法，请参阅：[使用插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)。

![运动扭曲插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9499be2-00ff-4522-b7a6-7a2e53aa1eec/plugin.png)

-   运动扭曲利用了[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)和[动画蒙太奇](/documentation/zh-cn/unreal-engine/animation-montage-in-unreal-engine)工作流程。因此，你需要了解这些功能。
    
-   你的项目中有[角色蓝图](/documentation/zh-cn/unreal-engine/setting-up-a-character-in-unreal-engine)、[输入功能按钮](/documentation/zh-cn/unreal-engine/input-in-unreal-engine)和[动画](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)，可用于创建Gameplay示例。
    

## 运动扭曲概述

运动扭曲的整体功能可分为两大区域：

1.  **动画蒙太奇（Animation Montage）** ，你可以在其中创建具备动画通知状态的运动扭曲窗口。

![动画蒙太奇概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/787790a9-44e1-403a-b2a5-c2d9476d86df/motionwarpoverview.png)

1.  **蓝图逻辑（Blueprint Logic）** ，你可以在其中设置逻辑来分配扭曲目标并播放蒙太奇。

![蓝图概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d824a77-739a-4d1e-af91-a88c9a0e7f3e/blueprintconcept.png)

## 动画蒙太奇

动态蒙太奇可供你指定运动扭曲区域，自定义其行为，并对其命名。

### 创建

要新建一个运动扭曲区域，右键点击一个 **通知（Notifies）** 轨道，选择 **添加通知状态...（Add Notify State...）> 运动扭曲（Motion Warping）** 。

![创建运动扭曲通知状态](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/660b6c1f-cf04-498e-b664-960fd043eb14/createwarp.png)

这些是带有开始和结束时间的可自定义区域，你可以将其对齐到动画中最适合应用扭曲的区域。

比如，在这个覆盖蒙太奇中，当角色把手放在障碍物上时，你可能需要确保起始扭曲区域覆盖整个区域。

![运动扭曲序列](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5936b35-6d3b-4190-b898-4e9d741eb9e5/motionwarpingsequence.gif)

### 细节

**动画通知** 的 **细节（Details）** 面板包含运动扭曲正常运行所需的属性和设置。选择你的运动扭曲分段以显示这些细节。

![运动扭曲细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac41c82f-de93-41ad-ad6e-9b65f17a53f7/motionwarpdetails.png)

细节名称

说明

**根骨骼运动修饰符（Root Motion Modifier）**

要指定的运动扭曲类型。

**缩放（Scale）** ：一种运动扭曲，可均匀地改变动画的比例。 **倾斜扭曲（Skew Warp）** ：扭曲游戏对象的根骨骼运动，使其匹配关卡中扭曲窗口末尾的动画位置和旋转。

**扭曲目标名称（Warp Target Name）**

用于查找此扭曲目标的名称。关联到 **Add or Update Warp Target Point** 蓝图节点。

**扭曲点动画提供程序（Warp Point Anim Provider）**

为 **扭曲点（Warp Point）** 选择所需的提供程序。

**无（None）** ：此处没有声明扭曲点提供程序。 **静态（Static）** ：用户定义的参数变换所定义的扭曲点，可以通过扭曲通知本身来声明。 **骨骼（Bone）** ：扭曲点由骨骼定义。

**扭曲点动画变换（Warp Point Anim Transform）**

变换动画扭曲点。仅当 **扭曲点动画提供程序（Warp Point Anim Provider）** 设置为 **静态（Static）** 时才相关。

**扭曲点动画骨骼名称（Warp Point Anim Bone Name）**

声明要用作扭曲点目标的骨骼名称。仅当 **扭曲点动画提供程序（Warp Point Anim Provider）** 设置为 **骨骼（Bone）** 时才相关。

**扭曲平移（Warp Translation）**

是否扭曲根骨骼运动的平移组件。

**忽略Z轴（Ignore ZAxis）**

是否扭曲平移的Z组件。

**扭曲旋转（Warp Rotation）**

是否扭曲根骨骼运动的旋转组件。

**旋转类型（Rotation Type）**

是否应扭曲旋转以匹配扭曲目标的旋转或面向扭曲目标。

**默认（Default）** ：角色旋转以匹配扭曲目标的旋转。 **面向（Facing）** ：角色旋转以面向扭曲目标。

**扭曲旋转时间乘数（Warp Rotation Time Multiplier）**

修改旋转的扭曲速度。比如，如果运动扭曲（Motion Warping）窗口持续存在2秒，且此属性的值为0.5，则将在1秒后达到最终旋转。

**通知颜色（Notify Color）**

设置运动扭曲通知关键帧的颜色。

## 蓝图

蓝图用于添加你的运动扭曲组件，触发扭曲，并指定扭曲目标。

### 运动扭曲组件

你必须将运动扭曲组件添加到蓝图才能启用运动扭曲行为。方法为点击 **组件（Components）** 面板中的 ***(+) 添加（*(+) Add）** ，并在 **移动（Movement）** 类别下找到 **运动扭曲（Motion Warping）** 。点击即可添加。

![运动扭曲组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55f80528-4665-41a4-9cb8-38b6c214af29/motionwarpingcomponent.png)

现在将该组件从组件（Components）面板拖放到 **事件图表（Event Graph）** ，即可在你的蓝图图表中引用该组件。

![运动扭曲蓝图实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4db6fdd4-1eec-4a3c-8382-a78383a5c4b6/motionwarpinstance.png)

### 节点

从运动扭曲引用拖移链接后，你可以浏览与之相关的函数和事件。它们位于运动扭曲类别中。

![运动扭曲中的新节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a7ae95b-980a-4d5a-be99-141b334ec1d3/newnode.png)

你可以在蓝图中使用以下运动扭曲节点：

节点名称

节点图像

说明

**Add or Update WarpTarget**

![add or update warp target节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31f48099-ef41-4568-b6fd-3d422271ed64/addorupdatewarptargetnode.png)

此节点用于将蒙太奇资产中定义的扭曲目标名称链接到位置。右键点击 **扭曲目标（Warp Target）** 引脚并选择 **分割结构体引脚（Split Struct Pin）** ，可将该引脚分割成单独的 **平移（Translation）** 引脚和 **旋转（Rotation）** 引脚。

反过来，可以使用 **Remove Warp Target** 节点来解除 **扭曲目标名称（Warp Target Name）** 的链接。

**Add Root Motion Modifier Skew Warp**

![add root motion modifier skew warp](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c7a307b-3f44-4ec8-b690-662268e2980c/addrootmotionmodifierskewwarp.png)

你可以使用此节点通过蓝图生成新运动扭曲窗口，而不是在蒙太奇资产中添加 **倾斜扭曲动画通知（Skew Warp Anim Notifies）** 。

你也可在此处分配此运动扭曲窗口的设置，例如 **开始时间（Start Time）** 、 **结束时间（End Time）** 和 **扭曲目标名称（Warp Target Name）** 。

此处还提供了 **Add Root Motion Modifier for Scale** 节点，以及用于禁用所有根骨骼运动修饰符的节点。

## 运动扭曲示例

本小节介绍了如何设置角色扭曲到击打目标的简单运动扭曲示例。

#### 禁用扭曲

![禁用扭曲](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16f538c7-59a3-406c-8e46-ec9fc3b787b4/motionwarpingdisabled.gif)

开始之前，确保你打算使用的动画启用了根骨骼运动。具体做法是打开动画资产并启用 **EnableRootMotion** 。

![启用根骨骼运动窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5d14a17-89ff-4b6a-b4aa-f3980d1a1b78/rootmotion.png)

### 设置目标位置

第一步是创建并放置一个你要扭曲到的目标。此示例使用了圆柱体。

在 **放置Actor（Place Actors）** 面板中，点击 **所有类（All Classes）** 并找到 **目标点（Target Point）** 。将其拖放到关卡中以添加目标点。确保它对齐并旋转到你所需的扭曲点。

![添加运动扭曲目标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5e248d2-eff7-4777-a2c7-d1229fbd7cd3/addtarget.png)

### 设置动画蒙太奇

接下来，创建动画蒙太奇资产。要想从现有动画派生此类资产，有一个简单的方法，那就是是右键点击你的动画资产，并选择 **创建（Create）** > **创建动画蒙太奇（Create AnimMontage）** 。创建蒙太奇之后，打开资产。

![创建动画蒙太奇](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d5757de-1f81-4fe3-b3a7-858133cede2c/createmontage.png)

现在蒙太奇已打开，你可以在序列中推移以预览你的动画。下一步是在通知轨道下添加运动扭曲窗口。具体做法是，右键点击轨道区域并选择 **添加通知状态...（Add Notify State...）** > **运动扭曲（Motion Warping）** 。

![运动扭曲通知状态](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/197b5aca-6d40-41af-8fad-56328bac1fbc/createwarp.png)

现在已创建运动扭曲窗口，你可以使用其中的控点设置开始和结束范围。

设置此运动扭曲窗口的范围，让它在动画开头附近开始，在角色攻击的那一刻结束。你还可以在移动 **通知** 关键帧时按住 **Shift** 键预览那个时刻的当前动画。

![运动扭曲通知](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc4e331b-1481-4069-a520-1e248b935037/motionwarpnotify.gif)

接下来，选择运动扭曲关键帧，并找到 **细节（Details）** 面板。你将在此处设置此关键帧的一些属性。

-   将 **根骨骼运动修饰符配置（Root Motion Modifier Config）** 设置为 **倾斜（Skew）****扭曲（Warp）** 。此操作用于指定扭曲类型。
    
-   为 **扭曲目标名称（Warp Target Name）** 设置名称。此操作用于用名称标识此扭曲。
    

![设置细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b599ec70-4dc8-4b32-9df0-e04cb4483a50/setdetails.png)

### 获取目标位置

现在打开你的角色蓝图资产。在事件图表中，创建映射到所需输入操作的 **Input Action** 节点。具体做法是，右键点击图表，并从 **输入（Input）> 操作事件（Action Events）** 中选择你的输入事件。

在本示例中，有一个用于打击的输入操作事件（Input Action Event for Punch）。

![获取输入](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/240899cf-78a0-4ceb-9a0a-2a64af536a09/input.png)

接下来，你需要获取你早先放在此示例中的目标点的位置。你有几种办法可以选择，但对于本示例，请创建 **Get All Actors Of Class** 节点。将 **Actor类（Actor Class）** 设置为 **目标点（Target Point）** 。最后，将Input Action节点中的 **按下（Pressed）** 输出引脚挂接到Get All Actors of Class函数的输入执行引脚。

![获取actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1a4c354-43ca-4979-ab45-8fd01cef6983/getactors.png)

最后，添加 **Get**（副本）节点以连接到输出Actor（Out Actors）数组数据引脚。你还要创建 **Get Actor Location** 函数，并将其输入 **目标数据（Target data）** 引脚连接到 **Get** 节点的输出数据引脚。

![获取位置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6226880f-332d-48b5-8b40-df8d96984ee2/getlocation.png)

### 扭曲目标

现在你要创建逻辑来获取目标点的位置。

首先，将运动扭曲组件添加到角色蓝图。具体做法是，点击组件（Components）面板中的 ***(+) 添加（*(+) Add）** ，在移动（Movement）类别下找到运动扭曲（Motion Warping）。点击它以添加组件。

![添加运动扭曲组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a68e32d-f498-4760-a248-3a4fe5827ddf/motionwarpingcomponent.png)

接下来，从组件（Components）面板将运动扭曲组件（Motion Warping Component）拖放到事件图表中。

![运动扭曲实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b5742ba-fd61-4fac-8d13-71c2e04cdffb/motionwarpinstance.png)

从运动扭曲（Motion Warping）引用引脚拖移，以添加 **Add or Update Warp Target from Transform** 节点。创建后，将其输入事件引脚连接到 **Get All Actors Of Class** 节点。你还要确保将扭曲目标名称分配到 **名称（Name）** 引脚。此名称必须匹配你早先在蒙太奇中定义的扭曲目标名称。

![同步点逻辑](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3f5a9b3-87fc-4c71-a14c-aae706eab07d/syncpointlogic.png)

你还需要将 **Add or Update Warp Target from Transform** 节点链接到目标位置。右键点击扭曲目标（Warp Target）引脚，选择 **分割结构体引脚（Split Struct Pin）** 将其转换为双位置/旋转引脚结构。然后将 **Get Actor Location** 的 **返回值（Return Value）** 引脚连接到 **Get Actor Location** 的返回值（Return Value）引脚。

连接Get Actor Location节点的 **返回值（Return Value）** （由黄色引脚指示的向量值）和Add or Update Warp Target from Transform节点的目标变换（Target Transform）引脚（由橙色引脚表示的变换值）时，将创建转换节点。如果存在不同值类型，但它们在转换后可兼容，则虚幻引擎会在连接引脚时自动创建转换节点。

![同步点位置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03488626-1ea9-4c9a-a0a1-773e5be2f79a/synclocation.png)

### 播放蒙太奇

现在，你可以在事件图表中引用 **骨骼网格体（Skeletal Mesh）** 组件，并在其上播放蒙太奇。将 **骨骼网格体（Skeletal Mesh）** 组件拖放到事件图表中。

右键点击图表并选择 **动画（Animation）> 蒙太奇（Montage）> 播放蒙太奇（Play Montage）** 以添加 **Play Montage** 节点。然后将你的蒙太奇资产分配到 **要播放的蒙太奇（Montage to Play）** 引脚。

![播放蒙太奇](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2fecafb-00de-493a-b57c-8b40902186da/playmontage.png)

### 结果

现在你运行关卡时，应该能够看到角色在播放其打击动画时扭曲到相应的点。

![运动扭曲已启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/239e0a22-8965-4393-a923-22b693d90999/motionwarpingresult.gif)

你可以在下面看到本页用于将运动扭曲实现到简单扭曲目标位置的角色蓝图逻辑大图。

![蓝图概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c6db140-5b3c-44d6-9181-f02f527d8ebe/fullblueprint.png)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [运动扭曲概述](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine#%E8%BF%90%E5%8A%A8%E6%89%AD%E6%9B%B2%E6%A6%82%E8%BF%B0)
-   [动画蒙太奇](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine#%E5%8A%A8%E7%94%BB%E8%92%99%E5%A4%AA%E5%A5%87)
-   [创建](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine#%E5%88%9B%E5%BB%BA)
-   [细节](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine#%E7%BB%86%E8%8A%82)
-   [蓝图](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine#%E8%93%9D%E5%9B%BE)
-   [运动扭曲组件](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine#%E8%BF%90%E5%8A%A8%E6%89%AD%E6%9B%B2%E7%BB%84%E4%BB%B6)
-   [节点](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine#%E8%8A%82%E7%82%B9)
-   [运动扭曲示例](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine#%E8%BF%90%E5%8A%A8%E6%89%AD%E6%9B%B2%E7%A4%BA%E4%BE%8B)
-   [禁用扭曲](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine#%E7%A6%81%E7%94%A8%E6%89%AD%E6%9B%B2)
-   [设置目标位置](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E7%9B%AE%E6%A0%87%E4%BD%8D%E7%BD%AE)
-   [设置动画蒙太奇](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%8A%A8%E7%94%BB%E8%92%99%E5%A4%AA%E5%A5%87)
-   [获取目标位置](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine#%E8%8E%B7%E5%8F%96%E7%9B%AE%E6%A0%87%E4%BD%8D%E7%BD%AE)
-   [扭曲目标](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine#%E6%89%AD%E6%9B%B2%E7%9B%AE%E6%A0%87)
-   [播放蒙太奇](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine#%E6%92%AD%E6%94%BE%E8%92%99%E5%A4%AA%E5%A5%87)
-   [结果](/documentation/zh-cn/unreal-engine/motion-warping-in-unreal-engine#%E7%BB%93%E6%9E%9C)
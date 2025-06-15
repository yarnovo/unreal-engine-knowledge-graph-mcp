# 虚幻引擎中的动画合成 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-composites-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:06:34.781Z

---

目录

![动画合成](https://dev.epicgames.com/community/api/documentation/image/6cbb676a-0ee0-48c7-a445-d3957f247bd3?resizing_type=fill&width=1920&height=335)

使用 **动画合成（Animation Composites，简称合成）** 你可以将多个[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine) 合并为一个资产并且可以作为一个序列来播放。请注意，合成只能将动画合并用于播放但不能提供其他任何功能，比如混合。想要功能更全面更高级的资产类型，参阅[动画蒙太奇](/documentation/zh-cn/unreal-engine/animation-montage-in-unreal-engine)。

![动画合成多序列播放示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bad657c4-7761-41ee-a6f4-9a07cf45ac41/compositedemo.gif)

和动画序列类似，动画合成也可以使用[动画通知](/documentation/zh-cn/unreal-engine/animation-notifies-in-unreal-engine) 和 [动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)。

## 创建动画合成

你可以在内容浏览器中创建一个新的动画合成， **右键点击** (或选择 **添加新按钮**) 然后选择 **动画（Animation）** **\> 动画合成（Animation Composite）** 。

![在内容浏览器中创建新动画合成](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5001e5e8-494c-4b53-baa4-2e1f7176c8b4/createcomposite.png)

创建新的动画合成之后，需要选择要关联新动画合成的[骨骼](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)

你也可以从已有的[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)创建动画合成，在内容浏览器中 **右键点击** 序列然后选择 **创建（Create）> 创建动画合成（Create AnimComposite）**。

从动画序列创建动画合成时，默认情况下已有的动画通知或动画曲线都不会被复制。你可以手动复制这些资产，选中它们，使用快捷键 **CTRL** + **C** ，在新的动画合成资产中选择动画通知轨道，然后按下快捷键**CTRL** + **V**。

![将动画通知从源动画复制到新的动画合成](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54f9517a-a0d9-4ea4-83d1-e4f8c3fe2988/copynotifies.gif)

现在这个动画合成可以使用了，并且用淡绿色将其与动画序列区分开。

## 编辑动画合成

**双击** 动画合成会打开[动画序列编辑器](/documentation/zh-cn/unreal-engine/animation-sequence-editor-in-unreal-engine) ，相关的属性和功能会显示在编辑器中。

在 **时间轴（Timeline）** 上，你可以从 **资产浏览器（Asset Browser）**中将序列添加至动画合成轨道上。

![从资产浏览器中将动画序列添加至动画合成](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ce768cb-5dd8-4c23-b379-0b1b499418b1/addsequences.png)

你可以通过拖动来更改序列在合成中的顺序。序列在其他序列前后会自动吸附。

你可以移除一个序列，选中它并 **右键点击** ，选择 **删除片段（Delete Segment）**。你也可以选择 **打开资产（Open Asset）** 在对应的资产编辑器中将其打开，

## 使用动画合成

合成后，动画合成可以像动画序列一样在 **动画蓝图（Animation Blueprint）** 的 **动画图表（AnimGraph** 中使用。

![在动画蓝图的动画图表中是哟个动画合成](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26403c5e-0788-4c4f-a9b5-8d364bd43450/animbp.png)

你也可以在资产浏览器中用与单个动画序列相同的方式将一个动画合成添加至另一个动画合成，或者添加至一个[动画蒙太奇](/documentation/zh-cn/unreal-engine/animation-montage-in-unreal-engine)。

## 动画资产细节

在动画序列编辑器中打开动画合成的时候， **资产细节（Asset Details）** 面板上有几个特有的属性。动画合成的属性如下所示。

![highlighted asset details panel in the animation sequence editor when working with animation composites](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/463a31cb-4428-408b-8e6b-f5fef1f03170/assetdetails.png)

属性

描述

**预览基本姿势（Preview Base Pose）**

这里你可以为一个 **叠加混合空间（Additive BlendSpace）** 分配和引用基本姿势。更多混合空间的相关信息，参阅[混合空间](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine)。

**序列长度（Sequence Length）**

选中动画序列的播放时长（以秒为单位），默认播放速度因子为1.0。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animation assets](https://dev.epicgames.com/community/search?query=animation%20assets)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建动画合成](/documentation/zh-cn/unreal-engine/animation-composites-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%8A%A8%E7%94%BB%E5%90%88%E6%88%90)
-   [编辑动画合成](/documentation/zh-cn/unreal-engine/animation-composites-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%8A%A8%E7%94%BB%E5%90%88%E6%88%90)
-   [使用动画合成](/documentation/zh-cn/unreal-engine/animation-composites-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%8A%A8%E7%94%BB%E5%90%88%E6%88%90)
-   [动画资产细节](/documentation/zh-cn/unreal-engine/animation-composites-in-unreal-engine#%E5%8A%A8%E7%94%BB%E8%B5%84%E4%BA%A7%E7%BB%86%E8%8A%82)
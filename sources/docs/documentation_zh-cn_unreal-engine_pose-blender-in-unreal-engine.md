# 虚幻引擎中的姿势混合器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/pose-blender-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:06:37.718Z

---

目录

![姿势混合器](https://dev.epicgames.com/community/api/documentation/image/7a1b5fe8-b16d-4967-ae48-eaf62708d100?resizing_type=fill&width=1920&height=335)

创建[动画姿势资产](/documentation/zh-cn/unreal-engine/animation-pose-assets-in-unreal-engine)之后，你可以用[姿势混合器](/documentation/zh-cn/unreal-engine/pose-blender-in-unreal-engine#poseblender)和[Pose by Name](/documentation/zh-cn/unreal-engine/pose-blender-in-unreal-engine#posebyname)[动画蓝图节点](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)，使用姿势资产为角色制作动画。

## 姿势混合器

**姿势混合器（Pose Blender）** 节点是一种[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)节点，可通过将 **姿势资产** 拖入 **AnimGraph** 来自动创建。

![pose blender node animation blueprint node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/933bd757-19c1-4b62-9d1f-73eaeeb27346/posenode.png)

姿势混合器节点用于在运行时在[骨架网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)上播放相关联的 **姿势资产**。

如果没有任何方法来驱动包含的**动画曲线**，姿势混合器节点将不会显示**输出姿势**。你需要使用动画蓝图节点来驱动姿势节点的曲线数据，才能生产输出姿势。

![source pose was visible but ignored no pose output without animation curve driving method](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cb00132-2e66-4b85-8871-3c8dbf173322/error.png)

这是一个[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)示例，其中包含编写好的动画曲线，可驱动姿势资产曲线，从而生成面部动画。

![animation curves in animation sequence asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c41dc31b-dc0d-4a77-8003-cf267a95b40c/animcurve.png)

![pose blender demo using animation sequence curves to drive anim curve](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e9ec6df-1f47-4f48-b8a6-7cb8ed3bf0ad/poseassetdemo.gif)

动画序列曲线

使用动画序列曲线和姿势混合器节点播放姿势资产

虽然动画序列播放器（animation sequence players）之类的节点可以驱动姿势资产中的动画曲线，你也可以使用[曲线资产](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)来驱动这些曲线。你可以在 **姿势混合器** 节点的 **细节** 面板中，找到 **自定义曲线（Custom Curve）** 属性，设置一条自定义曲线，根据设置驱动姿势。

![custom curve property in the pose blender nodes detail panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0e809bf-f8fc-41c5-91ac-15581e0712e8/customcurve.png)

## 按名称播放姿势

在处理包含多个被保存为特定动画曲线的[骨架网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)姿势的姿势资产时，你可以使用按名称播放姿势（Pose by Name）[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)节点，使用姿势名称选择性地播放姿势。

![pose by name animation blueprint node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62a6e124-58d7-4c05-b697-6242b8f68467/posebynamenode.png)

要创建"按名称播放姿势"节点，请在AnimGraph中点击右键，在快捷菜单中选择 **创建按名称播放姿势节点（Create Pose by Name Node）** 。

![convert a pose blender node to a pose by name animation blueprint node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95a29cad-202b-472f-b4bd-faaacff3f84e/convert.png)

这个"按名称播放姿势"节点输出了姿势资产中的一个姿势。该资产由一个奔跑动画生成。该动画中的每一帧都被分配了各自的动画曲线， `Frame 25` 为所需动画的名称。

![pose by name animation blueprint node demo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35cde2be-c84f-4eba-8ad9-d72c84103248/posebynamedemo.png)

在使用"按名称播放姿势"节点时，你可以使用 **Alpha属性（Alpha Property）** 控制特定姿势的权重。在下图中，我们用一个简单的波动值来调整Alpha值，以驱动姿势的权重。

![aniamtion blueprint driving pose alpha](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/675a92e6-090a-413b-a364-3e38b93d8e0d/poseweight.png)

![alpha value demo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa6818ca-f626-4e08-bdf6-ead9467f8e10/alphademo.gif)

动画蓝图

结果

如果你使用了姿势资产启用了 **叠加（Additive）** 模式，你需要使用 **应用叠加（Apply Additive）** 节点才能正确显示想要的姿势。

![apply additive node when pose asset is additive](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c18ed1b6-43be-4e8a-873c-5511d1fd1794/additive.png)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animation blending](https://dev.epicgames.com/community/search?query=animation%20blending)
-   [animation blueprint](https://dev.epicgames.com/community/search?query=animation%20blueprint)
-   [pose assets](https://dev.epicgames.com/community/search?query=pose%20assets)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [姿势混合器](/documentation/zh-cn/unreal-engine/pose-blender-in-unreal-engine#%E5%A7%BF%E5%8A%BF%E6%B7%B7%E5%90%88%E5%99%A8)
-   [按名称播放姿势](/documentation/zh-cn/unreal-engine/pose-blender-in-unreal-engine#%E6%8C%89%E5%90%8D%E7%A7%B0%E6%92%AD%E6%94%BE%E5%A7%BF%E5%8A%BF)
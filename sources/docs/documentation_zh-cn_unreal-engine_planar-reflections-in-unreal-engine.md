# 虚幻引擎中的平面反射 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/planar-reflections-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:16:51.062Z

---

目录

![平面反射](https://dev.epicgames.com/community/api/documentation/image/2dcf2ef8-317d-4fce-92c8-813361565cf0?resizing_type=fill&width=1920&height=335)

Unreal Engine 支持实时平面反射，它比屏幕空间反射（SSR）更加精确，但渲染开销较高。渲染开销较高的原因来自平面反射的工作原理。因为平面反射实际上将从反射方向再次对关卡进行渲染。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86472c8c-8b1d-4f3d-863c-f9bf96db006a/plan-refl-banner.png)

### 屏幕空间反射VS平面反射

在渲染方面，屏幕空间反射（SSR）比平面反射更为高效，但可靠性较差。下图将SSR的缺陷和平面反射进行了对比。

![屏幕空间反射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d70e2be-1ea8-4632-98c4-859e809f223b/01-plan-refl-scene-disabled.png)

![平面反射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fdfd0fdf-123a-4341-a074-696def122ae6/02-plan-refl-scene-enabled.png)

屏幕空间反射

平面反射

-   **屏幕空间反射：** 左图展示了屏幕空间反射的局限性。注意图像边缘出现了大量"泄露"，或者说面向摄像机视角的池塘部分上的反射开始淡出。出现此现象的原因是SSR无法反射画面外的物体。
    
-   **平面反射：** 右图为相同的关卡，启用的是平面反射。注意图像中，甚至池塘的两侧和边缘均未出现"泄露"，反射保持了连贯和精准。原因是平面反射能够无视摄像机视角，反射画面外的物体。
    

### 启用平面反射

执行下列操作即可在项目中启用并使用平面反射：

1.  在主工具栏中前往 **编辑（Edit）> 项目设置（Project Settings）**，然后前往项目设置菜单下的 **渲染（Rendering）> 优化（Optimizations）** 部分。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3288e7b-f76e-499a-a995-e1d80761cbdb/04-plan-refl-rendering-reflection-section.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3288e7b-f76e-499a-a995-e1d80761cbdb/04-plan-refl-rendering-reflection-section.png)
    
2.  点击 **支持平面反射的全局裁剪平面（Support global clip plane for Planar Reflections）** 旁边的勾选框，在弹出提示后重启UE4编辑器。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9bb0ba8e-9b1a-4b90-90c9-ec3819e7e92b/05-plan-refl-enable-support-planar-reflection.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9bb0ba8e-9b1a-4b90-90c9-ec3819e7e92b/05-plan-refl-enable-support-planar-reflection.png)
    
    启用平面反射后如未重启UE4编辑器，可能导致平面反射无法使用。
    
3.  重启UE4编辑器后，前往 **放置Actor（Place Actors）** 面板，在 **视觉效果（Visual Effects）** 选项卡中选择一个 **平面反射Actor** 并将其拖入关卡。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba8391bb-529c-483a-9012-6fd2f28e151a/07-plan-refl-add-planar-reflection.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba8391bb-529c-483a-9012-6fd2f28e151a/07-plan-refl-add-planar-reflection.png)
    
4.  将平面反射Actor放进关卡后，即可使用 **G** 键隐藏或取消隐藏 Actor。可使用 **移动**、**旋转** 和 **缩放** 工具更佳地放置平面反射Actor并设置大小，满足关卡需求。
    

平面反射Actor被添加到关卡后，附近的反射材质将自动受到影响。放置在关卡中的静态网格体的法线用于反射的失真，模拟波纹效果。

### 平面反射Actor的属性

平面反射Actor有多个属性，当调整这些属性时，会大大影响反射的显示效果。下表概述了这些属性以及它们将如何改变平面反射的显示效果。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea0bb2e3-bc81-48f3-8e1b-462c96112993/08-plan-refl-planar-refl-properties.png)

属性

说明

**法线扭曲强度（Normal Distortion Strength）**

扭曲平面反射时控制法线强度。

**预过滤粗糙度（Prefilter Roughness）**

预过滤平面反射纹理所使用的粗糙度值。此属性适用于隐藏低分辨率。值越大，GPU开销越高。

**平面淡化开始距离（Distance from Plane Fadeout Start）**

从反射平面接收处于此距离的像素时将开始淡化平面发射。

**平面淡化结束距离（Distance from Plane Fadeout End）**

从反射平面接收处于此距离的像素时将完全淡化平面发射。

**平面淡化开始角度（Angle from Plane Fade Start）**

从反射平面接收法线处于此角度的像素时将开始淡化平面发射。

**平面淡化结束角度（Angle from Plane Fade End）**

从反射平面接收法线处于此角度的像素时将完全淡化平面发射。

**显示预览平面（Show Preview Plane）**

在编辑器中工作时切换反射平面的可见性。此属性不会影响平面反射。

高级属性

 

**预过滤粗糙度距离（Prefilter Roughness Distance）**

将达到预过滤粗糙度值的距离。

**屏幕百分比（Screen Percentage）**

下采样百分比，可用于减少GPU渲染平面反射的时间。此属性直接影响平面反射所产生的反射的质量。

**额外视野（Extra FOV）**

渲染至反射纹理时使用的额外视野(FOV)。法线扭曲引起反射纹理外读取时，此属性十分实用。较大的值将增加渲染线程和GPU开销，因为更多对象和三角形将被渲染到平面反射中。

**渲染两面场景（Render Scene Two-Sided）**

是否将场景渲染为两面，适用于隐藏法线扭曲会在被反射平面裁切的对象"下方"读取的瑕疵。启用此设置后，网格体的背面将显示在裁切区域中，而非可能为明亮天空的背景中。如启用此属性，则必须将水平面添加到 **隐藏Actor（Hidden Actors）**，因为水平面现在不会阻挡反射。

**LOD距离因子（LOD Distance Factor）**

缩放细节层级（LOD）使用的距离。设为大于1的值会导致场景采集使用低于主视图的LOD，以加速场景采集传递。

### 平面反射Actor的场景采集属性

平面反射Actor还有多个属性，使用这些属性，您可以控制采集的实时反射性能开销。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40beb23f-ce86-4e56-8f78-f63a60e8301f/09-plan-refl-scene-capture-properties.png)

属性

说明

**基元渲染模式（Primitive Render Mode）**

控制被渲染到场景采集中的Primitive。

-   **渲染场景Primitive（旧版）（Render Scene Primtive (Legacy)）** - 渲染场景中的所有Primitive。
    
-   **渲染场景Primitive（Render Scene Primtives）** - 渲染场景中的所有Primitive，但添加到 **隐藏Actor（Hidden Actors）** 列表中的Primitive除外。
    
-   **使用ShowOnly列表（Use ShowOnly List）** - 仅渲染 **仅显示Actor（Show Only Actors）** 列表中列出的Actor。
    

**隐藏Actor（Hidden Actors）**

关卡中要在场景采集中隐藏的选定Actor列表。

**仅显示Actor（Show Only Actors）**

当使用 **使用ShowOnly列表（Use ShowOnly List）** 的 **Primitive渲染模式（Primitive Render Mode）** 时，将被此场景采集渲染的可用Actor列表。

**采集每一帧（Capture Every Frame）**

是否每帧更新采集的内容。如禁用，组件只在加载时渲染一次，然后只在移动时再次渲染。

**运动中采集（Capture on Movement）**

是否更新运动中的采集内容。如果您要从蓝图手动采集，则将其禁用。

**始终保留渲染状态（Always Persist Rendering State）**

是否保留渲染状态，即便禁用 **采集每一帧（Capture Every Frame）** 也是如此。这可计算动态模糊和临时抗锯齿（TAA）的速度。

**最大视图距离覆盖（Max View Distance Override）**

设置当值大于0时，场景采集中渲染的Primitive的最大渲染距离（单位：厘米）。如发射平面处于一个封闭区域（如走廊或房间）中，则可使用此选项来剔除反射的远景物体。

**采集排序优先级（Capture Sort Priority）**

设置帧中的采集优先级，对GPU上的场景采集进行排序，解决多个采集组件之间的相互依赖性。优先级最高则最先进行。

**分析事件名称（Profiling Event Name）**

设置分析GPU时分析事件的名称。当在关卡中使用了多个平面反射时，了解正在使用哪个平面反射很有用。

高级属性

 

**通用显示标志（General Show Flags）**

通用功能显示标志，用于将一些功能和Actor从正在渲染切换到场景采集。例如，抗锯齿、雾、静态网格体、骨架网格体等。

**高级显示标志（Advanced Show Flags）**

通用高级功能显示标志，用于将一些功能和Actor从正在渲染切换到场景采集。例如，植物、实例化静态网格体、Paper 2D Sprties等。

**后期处理显示标志（Post Processing Show Flags）**

切换显示标志，用于将泛光、眼部适应和动态模糊从正在渲染切换到场景采集。

**光源类型显示标志（Light Types Show Flags）**

切换显示标志，用于将天空光照从正在渲染切换到场景采集。

**光照组件显示标志（Lighting Components Show Flags）**

切换显示标志，用于将环境遮挡和动态阴影从正在渲染切换到场景采集。

**光照功能显示标志（Lighting Features Show Flags）**

切换通用显示标志，用于将光照功能从正在渲染切换都场景采集。例如，距离场环境遮挡（DFAO）、光照函数、屏幕空间反射。

**隐藏显示标志（Hidden Show Flags）**

切换显示标志，用于将光照和后期处理从正在渲染切换为场景采集。

## 平面反射的限制

虽然平面反射提供了一些非常逼真的反射，但此功能确实存在下面列出的一些限制。

-   平面反射会导致整个场景被渲染两次，所以要把一半的帧时间花在渲染线程和GPU上！
    
-   限制世界场景中放置的平面反射数量。很多时候，一个还是太多。
    
-   适当地调整它的大小，使其能够在不可见的情况下被剔除。
    
-   渲染平面反射角色的开销直接来自当前在关卡中进行渲染的内容。当启用此功能时，因为这些开销不随着屏幕百分比（Screen Percentage）缩放，所以存在大量三角形和绘制调用的场景将遭受最多的性能问题。
    

## 平面反射性能

在项目中启用平面反射可实现相当精确的反射，但该功能会对项目性能产生直接影响。以下部分将说明在针对高端 PC 的项目和针对移动设备的项目中启用平面反射后的性能影响。

此处使用UE4启动程序中的"风筝和无尽之剑草地"项目4.12版本展示平面反射的性能影响。

### 平面反射性能和风筝Demo

由于风筝Demo地形地貌的大小和多变的高度，添加并缩放单个平面反射Actor包含整个关卡无法执行，可能导致性能极差。需要策略性地对平面反射Actor进行放置和缩放，使其适应关卡中需要反射的区域。下图中可以看到在风筝Demo中平面反射在水面上形成的视觉效果。

![平面反射关闭](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c85468e-b5ff-4a20-9ea8-5d0d5491c2c3/10-plan-refl-ssr-reflections.png)

![平面反射开启](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05072746-a4f4-4eab-a75c-9a0d25c81aab/11-plan-refl-pr-reflections.png)

平面反射关闭

平面反射开启

平面反射对关卡的视觉效果提升十分大，但对性能的影响也极大。在下方左图 **平面反射关闭** 中可以看到，整个关卡的渲染时间为31 ms。在下方右图 **平面反射开启** 中可以看到，整个关卡的渲染时间为29.19 ms。此外，平面反射的渲染时间为23.07 ms。因此带平面反射场景的整体渲染时间为52 ms左右。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dde0fdb4-3562-4c23-b1c2-9e0778163983/12-plan-refl-gpu-profile-pr-off-0.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6703a8bf-eaa1-41aa-85c2-481aebb10ba4/13-plan-refl-gpu-profile-pr-on-0.png)

平面反射关闭

平面反射开启

点击查看全图

点击查看全图

平面反射消耗31 ms进行渲染的原因是风筝Demo中使用了全动态光影。使用静态/预计算光影的关卡再次进行平面反射渲染时效率更高。

### 平面反射性能和无尽之剑地牢

基于无尽之剑精灵遗迹地图的规模和布局，只需要一个平面反射，将其缩放匹配关卡中放置的水面静态网格体即可。在下图中可看到精灵遗迹地图水面添加平面反射后的效果。

![平面反射关闭](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d15d7f9-7f0a-4c3b-8365-9fab011bf70a/14-plan-refl-ssr-reflections-1.png)

![平面反射开启](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43e3d3b9-cac0-4cbb-96d5-82a6213f13b6/15-plan-refl-pr-reflections-1.png)

平面反射关闭

平面反射开启

添加平面反射后，水面效果更加逼真；较之于风筝Demo，性能影响也较小。在下方左图"平面反射关闭"中可看到，不带平面反射场景的渲染时间约为11 ms。在下方右图"平面反射开启"中可看到，平面反射的渲染时间约为1.67 ms，关卡整体渲染时间约为13 ms。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58c9cdee-b8b3-415f-8c8a-e1420cc04da7/16-plan-refl-gpu-profile-pr-off-1.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9fd2220-9f12-460c-b982-d8ea057016ec/17-plan-refl-gpu-profile-pr-on-1.png)

平面反射关闭

平面反射开启

点击查看全图

点击查看全图

精灵遗迹地图中的平面反射渲染时间为1.67 ms，而风筝Demo中的渲染时间为23.07 ms。造成此差异的原因是静态网格体和材质的构建方式。精灵遗迹地图及其内容针对移动设备设计，每个资源使用的三角形和材质指令数量均有严格限制。因此在该地图中启用平面反射时开销较低，因为这里使用的资源复杂度和规模均低于风筝Demo。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [reflections](https://dev.epicgames.com/community/search?query=reflections)
-   [planar reflections](https://dev.epicgames.com/community/search?query=planar%20reflections)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [屏幕空间反射VS平面反射](/documentation/zh-cn/unreal-engine/planar-reflections-in-unreal-engine#%E5%B1%8F%E5%B9%95%E7%A9%BA%E9%97%B4%E5%8F%8D%E5%B0%84vs%E5%B9%B3%E9%9D%A2%E5%8F%8D%E5%B0%84)
-   [启用平面反射](/documentation/zh-cn/unreal-engine/planar-reflections-in-unreal-engine#%E5%90%AF%E7%94%A8%E5%B9%B3%E9%9D%A2%E5%8F%8D%E5%B0%84)
-   [平面反射Actor的属性](/documentation/zh-cn/unreal-engine/planar-reflections-in-unreal-engine#%E5%B9%B3%E9%9D%A2%E5%8F%8D%E5%B0%84actor%E7%9A%84%E5%B1%9E%E6%80%A7)
-   [平面反射Actor的场景采集属性](/documentation/zh-cn/unreal-engine/planar-reflections-in-unreal-engine#%E5%B9%B3%E9%9D%A2%E5%8F%8D%E5%B0%84actor%E7%9A%84%E5%9C%BA%E6%99%AF%E9%87%87%E9%9B%86%E5%B1%9E%E6%80%A7)
-   [平面反射的限制](/documentation/zh-cn/unreal-engine/planar-reflections-in-unreal-engine#%E5%B9%B3%E9%9D%A2%E5%8F%8D%E5%B0%84%E7%9A%84%E9%99%90%E5%88%B6)
-   [平面反射性能](/documentation/zh-cn/unreal-engine/planar-reflections-in-unreal-engine#%E5%B9%B3%E9%9D%A2%E5%8F%8D%E5%B0%84%E6%80%A7%E8%83%BD)
-   [平面反射性能和风筝Demo](/documentation/zh-cn/unreal-engine/planar-reflections-in-unreal-engine#%E5%B9%B3%E9%9D%A2%E5%8F%8D%E5%B0%84%E6%80%A7%E8%83%BD%E5%92%8C%E9%A3%8E%E7%AD%9Ddemo)
-   [平面反射性能和无尽之剑地牢](/documentation/zh-cn/unreal-engine/planar-reflections-in-unreal-engine#%E5%B9%B3%E9%9D%A2%E5%8F%8D%E5%B0%84%E6%80%A7%E8%83%BD%E5%92%8C%E6%97%A0%E5%B0%BD%E4%B9%8B%E5%89%91%E5%9C%B0%E7%89%A2)
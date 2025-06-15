# 虚幻引擎XR最佳实践 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:22:56.234Z

---

目录

![XR最佳实践](https://dev.epicgames.com/community/api/documentation/image/21b86b8e-2aa1-4390-b203-37e690780e77?resizing_type=fill&width=1920&height=335)

虚拟现实（VR）是一种沉浸式的新媒介，在这类平台上编辑内容并向用户展示时，需要考虑到独特的因素。考量因素包括了用户舒适度、内容优化，以及平台局限。本页面可作为开发VR项目时相关主题的参考。

## VR项目设置

VR项目可以是蓝图或者C++项目。

在创建针对特定VR平台的新项目时，请在 **游戏（Games）** 类别下选择 **虚拟现实应用（VR Template）**。VR模板提供了在虚幻引擎5中开发VR项目所需要的初始内容。

如果你不想使用VR模板，你可以用以下设置，新建一个空白C++或蓝图项目。

-   质量预设：可缩放
-   光线追踪：禁用
-   初学者内容：禁用

![image alt text](ProjectSettings.png)(convert:false)

这些设置会创建一个虚幻引擎项目，并启用最少的渲染功能。这样可以确保项目一开始就有良好的帧率，你只要添加需要的渲染功能即可。

在创建项目后，设置以下项目设置，以改善应用的性能：

-   进入 **编辑 > 项目设置 > 描述**，并启用 **以VR启动**。
-   在 **编辑 > 项目设置 > 渲染 >前向渲染器** 中，启用[前向着色](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine)。
-   在 **编辑 > 项目设置 > 渲染 > 默认设置** 中，将 **抗锯齿方法** 设置为[多重采样抗锯齿](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine#%E5%90%AF%E7%94%A8%E5%A4%9A%E9%87%8D%E9%87%87%E6%A0%B7%E6%8A%97%E9%94%AF%E9%BD%BF)(MSAA)。
-   在 **编辑 > 项目设置 > 渲染（Rendering）> VR** 中，启用[实例化立体](https://docs.unrealengine.com/5.0/zh-CN/vr-performance-testing-in-unreal-engine)。 \*　对于移动设备VR体验，在 **编辑 > 项目设置 > 渲染 > VR（Edit > Project Settings > Rendering > VR）** 中启用[移动多视图](/documentation/zh-cn/unreal-engine/vr-performance-testing-in-unreal-engine)。
    -   将移动HDR（Mobile HDR）设置为False

## VR .ini设置

请查看[可延展性参考](/documentation/zh-cn/unreal-engine/scalability-reference-for-unreal-engine)，了解延展应用的图形、改善性能或质量的解释与例子。以下表格描述了部分主机变量，以及VR项目的推荐值。

**控制台变量**

**推荐值**

**说明**

**vr.PixelDensity**

1

**1** 是HMD目前使用的理想分辨率。较低的值会导致运行速度更快，但也会造成欠采样（更为模糊）。超过 **1** 时运行速度较慢，同时会超采样（更为清晰）。

**r.SeparateTranslucency**

0

由于填充帧限制，对移动VR体验来说开销较大。建议禁用该功能。

**r.HZBOcclusion**

0

更多详情可见[可视性和遮挡剔除](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine)的层级Z缓冲遮挡部分。

以下.ini设置摘自虚幻引擎4支持的VR演示[《Showdown》](https://www.unrealengine.com/marketplace/en-US/product/showdown-demo)。你可以使用这些设置作为起点，将它们复制到项目的 **Config/DefaultEngine.ini** 文件中的 **SystemSettings** 下。

```cpp
	[SystemSettings]

	vr.PixelDensity=1
	r.SeparateTranslucency=0
	r.HZBOcclusion=0
	r.MotionBlurQuality=0
	r.PostProcessAAQuality=3
	r.BloomQuality=1
	r.EyeAdaptationQuality=0
	r.AmbientOcclusionLevels=0
	r.SSR.Quality=1
	r.DepthOfFieldQuality=0
	r.SceneColorFormat=2
	r.TranslucencyVolumeBlur=0
	r.TranslucencyLightingVolumeDim=4
	r.MaxAnisotropy=8
	r.LensFlareQuality=0
	r.SceneColorFringeQuality=0
	r.FastBlurThreshold=0
	r.SSR.MaxRoughness=0.1
	r.rhicmdbypass=0
	sg.EffectsQuality=2
	sg.PostProcessQuality=0

```

## VR帧率优化

大部分VR应用都会执行自己的流程来控制VR帧率。因此，你需要在虚幻引擎4中禁用多个会影响VR应用的一般项目设置。

请跟随以下步骤，禁用虚幻引擎的一般帧率设置：

1.  在编辑器主菜单中，选择 编辑 > 项目设置，打开项目设置窗口。
    
2.  在项目设置窗口中，在引擎部分中选择一般设置。
    
3.  在帧率部分下：
    

-   禁用平滑帧率。
    
-   禁用使用固定帧率。
    
-   将自定义时间步设置为None。
    

![image alt text](FrameRate.png)(convert:false)

## VR世界场景缩放

为了在VR平台上保障最佳的用户体验，确保世界场景缩放的正确是最重要的方式之一。错误的缩放可能导致用户遭遇各类感官问题，甚至可能引发晕眩。在VR中，物体距离玩家摄像机0.75米至3.5米时观看效果最佳。在虚幻引擎4中，1个虚幻单位（UU）等于1厘米（CM）。这意味着在虚幻引擎中放置物体时，它们在距离玩家摄像机（使用VR时）75至350虚幻单位时观看效果最佳。

**距离**

**虚幻单位距离**

1 厘米

1 虚幻单位

1 米

100 虚幻单位

1 千米

100,000 虚幻单位

你可以在 **世界场景设置** 中找到 **世界到米** 变量，用它调整世界的缩放。这个数字的升降会使用户感觉自己在世界场景中相应地变大或缩小。假设你使用1虚幻单位=1厘米来构建内容，将 **世界到米** 设置为 **10** 会使世界看起来非常广阔，将其设置为 **1000** 则会使世界变得非常狭小。

![image alt text](WorldScale.png)(convert:false)

## VR与模拟晕眩症

晕眩是一种在沉浸式体验中影响用户的晕动症。下表介绍的最佳实践能够限制用户在VR中体验到的不适感。

-   **保持帧率：** 低帧率可能导致晕眩。尽可能地优化项目，就能改善用户的体验。下表罗列了XR平台的推荐帧率。

**HMD设备**

**目标帧率**

Oculus Rift S

90

Oculus Quest 1

72

Oculus Quest 2

视情况：72/80/90/120

HTC Vive

90

HTC Vive Pro

90

Valve Index

最低90，最高144

HP Reverb

90

Windows Mixed Reality VR

90

PSVR

视情况：60/120、90/90和120/120

\*

-   **用户测试：** 让不同的用户进行测试，监控他们在VR应用中体验到的不适感，以避免出现晕眩。
    
-   **让用户控制摄像机：** 电影摄像机和其他使玩家无法控制摄像机移动的设计是沉浸式体验不适感的罪魁祸首。应当尽量避免使用头部摇动和摄像机抖动等摄像机效果，如果用户无法控制它们，就可能产生不适感。
    
-   **视野（FOV）必须和设备匹配：** FOV值是通过设备的SDK和内部配置设置的，并且与头显和镜头的物理几何体匹配。因此，FOV无法在虚幻引擎中更改，用户也不得修改。如果FOV值经过了更改，那么在你转动头部时，世界场景就会产生扭曲，并引起不适感。
    
-   **使用较暗的光照和颜色，并避免产生拖尾** 在设计VR元素时，你使用的光照与颜色应当比平常更为暗淡。在VR中，强烈鲜明的光照会导致用户更快出现晕眩。使用偏冷的色调和昏暗的光照，就能避免用户产生不适感，还能避免屏幕中的亮色和暗色区域之间产生拖尾。
    
-   **移动速度不应该变化：** 用户一开始就应当是全速移动，而不是逐渐加快至全速。
    
-   **避免使用会大幅影响用户所见内容的后期处理效果：** 避免使用景深和动态模糊等后期处理效果，以免用户产生不适感。
    
-   应避免动态模糊和景深等视觉效果。
    
-   考虑角色高度、宽度、速度和摄像机位置等因素，需要针对VR角色对它们进行轻微修改。
    

## VR摄像机设置

虚幻引擎4中的VR摄像机设置完全取决于VR体验是否为坐式或站式：

-   **坐式体验：** 你需要人工抬高角色站立时的摄像机原点，将 **视线水平** 设置为Pawn碰撞胶囊体 **圆柱体高度** 负值的一半。

![image alt text](VR_Seated_Experience.png)(convert:false)

-   **站式体验：** 确保摄像机原点设置为 **0**，相对于通常摆放在地面上的Pawn根部。在Pawn底部的场景组件上附加一个摄像机组件，使其位于地面水平。

![image alt text](VR_Standing_Experience.png)(convert:false)

![image alt text](TrackingOrigin.png)(convert:false)

## VR内容注意事项

在创建VR内容时，你需要注意的是，用户可以从多个角度观看内容。请注意下列事项：

-   **比例（Scale）：** VR场景中的物体比例应尽可能地模拟真实情况。物体过大或过小可能会导致用户产生困惑，或者产生[晕眩](/documentation/zh-cn/unreal-engine/xr-best-practices-in-unreal-engine#vr%E4%B8%8E%E6%A8%A1%E6%8B%9F%E6%99%95%E7%9C%A9%E7%97%87)。
    
-   **多边形面缺失：** 在非沉浸式体验中，物体上玩家无法看到的多边形面通常会被移除。然而，在VR体验中，玩家可以更自由地环顾四周，如果缺失多边形，可能会导致用户看到不该看到的对象。
    
-   **光照类型：** 在VR项目中始终要使用[静态光源](/documentation/zh-cn/unreal-engine/static-light-mobility-in-unreal-engine)和光照贴图，这是渲染开销最低的方案。如果你需要使用动态光照，一定要尽量少用动态光源，并且确保它们不会相互接触。
    
-   **VR和VFX：** 部分VFX效果，例如使用SubUV纹理来模拟火焰或烟雾，在VR中的观看效果不佳。你依然需要使用静态网格体来模拟爆炸和烟迹等效果，不能使用2D粒子。近场效果和距离摄像机很近的效果在VR中表现良好，但必须使用静态网格体粒子组成。
    
-   **VR和透明度：** 在3D图形中，渲染透明度的开销极其昂贵，因为一般来说，透明效果每帧都需要重新计算一下，以检查是否有所变化。由于要重新评估，在VR中渲染透明度的开销变得过于昂贵，得不偿失。不过为了避免这个问题，你可以使用 **DitherTemporalAA** 材质函数。该材质函数可以让材质看似使用了透明效果，还能避免自排序等常见的透明度问题。 ![image alt text](VR_Dither_Trans_AA.png)(convert:false) *点击查看大图。*
    
    -   **尽可能以假乱真：** 以取巧的方式模拟出动态阴影或动态光照等开销高昂的渲染效果，这样可以尽可能节省性能。在[Showdown](https://www.unrealengine.com/marketplace/en-US/product/showdown-demo)中，让角色逐帧投射动态阴影的开销过于昂贵，因此项目中取消了动态阴影。然而，这也让角色在移动时如同在漂浮一般。为了解决该问题，我们使用了仿制的模糊阴影，它们能根据角色与场景中物体的距离，动态地调节位置和强度。这样角色在靠近地面（或其他物体）时就仿佛投下了阴影。
-   ![image alt text](VR_Fake_Shadow_Material.png)(convert:false) *点击查看大图。*
    

## 已知局限

下表列出了可能因HMD设计而无法在VR中获得预期效果的功能，以及可能的解决方案。

-   **屏幕空间反射（SSR）：** 虽然SSR能够在VR中生效，但其产生的反射可能与真实世界中的反射不匹配。除了SSR之外，你还可以使用反射探头，它们的开销较低，也较不容易出现反射匹配的问题。
    
-   **屏幕空间全局光照：** 屏幕空间技术可以在HMD中的两只眼睛之间产生显示差异。这些差异可能会导致用户不适。请参阅[光照类型](/documentation/zh-cn/unreal-engine/xr-best-practices-in-unreal-engine)，了解VR中建议改用的光照类型。
    
-   **光线追踪：** 目前使用光线追踪的VR应用程序无法保持所需的分辨率和帧速率来获得舒适的VR体验。
    

### 法线贴图问题

在VR中查看对象上的法线贴图时，应该会注意到它们未能达到以前该有的效果。这是因为法线贴图不会考虑双目显示问题或运动视差。因此，使用VR设备查看时，法线贴图通常看起来很扁平。但是，这并不意味着不应该或不需要使用法线贴图；只是意味着需要更加仔细评估是否可以更好地从几何体产生法线贴图中的数据。下面将介绍一种可以用来代替法线贴图的技术。

-   **视差贴图：** 视差贴图会考虑法线贴图中所没有的深度线索，从而将法线贴图提升到一个新的水平。视差贴图着色器可以更好地显示深度信息，使对象看起来比实际具有更多细节。这是因为无论从哪个角度看，视差贴图都会自行校正，从观察者的视点显示正确的深度信息。视差贴图的最佳用途是用于鹅卵石小径和具有精细细节的表面等。

-   [best practices](https://dev.epicgames.com/community/search?query=best%20practices)
-   [virtual reality](https://dev.epicgames.com/community/search?query=virtual%20reality)
-   [vr](https://dev.epicgames.com/community/search?query=vr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [VR项目设置](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine#vr%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [VR .ini设置](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine#vrini%E8%AE%BE%E7%BD%AE)
-   [VR帧率优化](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine#vr%E5%B8%A7%E7%8E%87%E4%BC%98%E5%8C%96)
-   [VR世界场景缩放](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine#vr%E4%B8%96%E7%95%8C%E5%9C%BA%E6%99%AF%E7%BC%A9%E6%94%BE)
-   [VR与模拟晕眩症](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine#vr%E4%B8%8E%E6%A8%A1%E6%8B%9F%E6%99%95%E7%9C%A9%E7%97%87)
-   [VR摄像机设置](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine#vr%E6%91%84%E5%83%8F%E6%9C%BA%E8%AE%BE%E7%BD%AE)
-   [VR内容注意事项](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine#vr%E5%86%85%E5%AE%B9%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
-   [已知局限](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine#%E5%B7%B2%E7%9F%A5%E5%B1%80%E9%99%90)
-   [法线贴图问题](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine#%E6%B3%95%E7%BA%BF%E8%B4%B4%E5%9B%BE%E9%97%AE%E9%A2%98)
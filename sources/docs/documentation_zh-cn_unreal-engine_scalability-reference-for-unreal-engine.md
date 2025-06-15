# 虚幻引擎可延展参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/scalability-reference-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:23:30.408Z

---

目录

![可延展参考](https://dev.epicgames.com/community/api/documentation/image/fab3dc91-4a1f-4bda-808d-f99e59d5abc2?resizing_type=fill&width=1920&height=335)

可延展性设置允许您调节各种功能的质量，以便游戏在不同平台和硬件上保持最佳性能。

## 可延展性设置

要在编辑器中访问可延展性设置，可使用工具栏中的 **设置（Settings）** 菜单。**引擎可延展性设置（Engine Scalability Settings）** 包含BaseScalability.ini文件中定义的最常用设置的快捷方式，而 **材质质量级别（Material Quality Level）** 设置全局材质质量设置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/480da333-0ef3-4aa8-a6d7-32f6b12c3554/scaler_viewqual.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/480da333-0ef3-4aa8-a6d7-32f6b12c3554/scaler_viewqual.png)

## 分辨率缩放

虚幻引擎4可以较低分辨率渲染场景，然后将图像延展到目标分辨率。由于2D用户界面通常成本不高，而且较低分辨率对其影响较大，因此虚幻引擎4不对UI应用此方法。放大采样通道虽然会引起较小成本，但通常值得使用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b404e95-4d50-49a4-bd2f-08af7b0520ea/sc_00007.png)

左：50%无AA，中间：50%有AA，右：100%（无分辨率缩放）有AA

拥有较柔和的输入图像有助于放大采样步骤。这意味着，该延展性选项得益于另一个延展性选项：抗锯齿质量。

该设置可以通过 **r.ScreenPercentage** 控制台变量访问。它使用10-100中的值，-1也等同于100%。

## 视图距离

对象可以根据与查看者的距离而剔除。默认情况下，所有对象都不会随距离而剔除（所需最大绘制距离为0）。除了设计者指定的值之外，还有一个全局可延展性设置，其作用类似于乘数（**r.ViewDistanceScale**）。下图您可以看到一些草对象（所需最大绘制距离为1000）：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1eecb5ef-8e78-4d41-8c85-72891ab70941/sc_00006.png)

左： r.ViewDistanceScale 0.4，中间：r.ViewDistanceScale 0.7，右：r.ViewDistanceScale 1.0（默认值）

## 抗锯齿

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0e718a7-b744-4dc5-b58f-d955dab0ef9e/scaler_aa_small.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0e718a7-b744-4dc5-b58f-d955dab0ef9e/scaler_aa_small.png)

从左开始：r.PostProcessAAQuality 0到6。前3个等于 视图（View）->可延展性选项（Scalability Options）->AA 设置中的 低（Low）、中（Medium）、高（High）、Epic 设置。

使用 **r.PostProcessAAQuality** 控制台命令调节抗锯齿质量级别将会调节您所用的抗锯齿方法（FXAA或临时AA）的质量。对于任一抗锯齿方法，**r.PostProcessAAQuality** 的值为0都将禁用这种效果。对于FXAA，值为2、4和6的效果可以在上图中看到，锯齿边缘的平滑度越来越好。大于6的值没有效果。

对于临时AA，需要权衡效果的填充速度和质量（使用的值越大，质量越好）。对临时AA使用 *r.PostProcessAAQuality* 2能够快速填充，但这种效果引起的颤抖会更加明显。而 *r.PostProcessAAQuality* 4填充速度较慢，但颤抖效果消失。

## 后期处理——sg.PostProcessQuality

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed9cc251-a007-4a17-a138-6b5d10dca269/sc_postprocesscomp.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed9cc251-a007-4a17-a138-6b5d10dca269/sc_postprocesscomp.png)

sg.PostProcessQuality 左侧设置为0，依次向右递增到3。

**视图（View）** -> **引擎可延展性设置（Engine Scalability Settings）** -> **后期处理（Post Processing）** 选项根据\[UE\_InstallPath\]/Engine/Config文件夹中BaseScalaiblity.ini文件中的设置，调节后期处理效果的质量。**低（Low）** 设置等于 *sg.PostProcessQuality* 0，**Epic** 等于 *sg.PostProcessQuality* 3。

sg.PostProcessQuality 0

sg.PostProcessQuality 1

```cpp
	r.MotionBlurQuality=0
	r.BlurGBuffer=0
	r.AmbientOcclusionLevels=0
	r.AmbientOcclusionRadiusScale=1.7
	r.DepthOfFieldQuality=0
	r.RenderTargetPoolMin=300
	r.LensFlareQuality=0
	r.SceneColorFringeQuality=0
	r.EyeAdaptationQuality=0
	r.BloomQuality=4
	r.FastBlurThreshold=0
	r.Upscale.Quality=1
	r.Tonemapper.GrainQuantization=0
```

```cpp
	r.MotionBlurQuality=3
	r.BlurGBuffer=0
	r.AmbientOcclusionLevels=1
	r.AmbientOcclusionRadiusScale=1.7
	r.DepthOfFieldQuality=1
	r.RenderTargetPoolMin=350
	r.LensFlareQuality=0
	r.SceneColorFringeQuality=0
	r.EyeAdaptationQuality=0
	r.BloomQuality=4
	r.FastBlurThreshold=2
	r.Upscale.Quality=2
	r.Tonemapper.GrainQuantization=0
```

sg.PostProcessQuality 2

sg.PostProcessQuality 3

```cpp
	r.MotionBlurQuality=3
	r.BlurGBuffer=-1
	r.AmbientOcclusionLevels=2
	r.AmbientOcclusionRadiusScale=1.5
	r.DepthOfFieldQuality=2
	r.RenderTargetPoolMin=400
	r.LensFlareQuality=2
	r.SceneColorFringeQuality=1
	r.EyeAdaptationQuality=2
	r.BloomQuality=5
	r.FastBlurThreshold=3
	r.Upscale.Quality=2
	r.Tonemapper.GrainQuantization=1
```

```cpp
	r.MotionBlurQuality=4
	r.BlurGBuffer=-1
	r.AmbientOcclusionLevels=3
	r.AmbientOcclusionRadiusScale=1.0
	r.DepthOfFieldQuality=2
	r.RenderTargetPoolMin=400
	r.LensFlareQuality=2
	r.SceneColorFringeQuality=1
	r.EyeAdaptationQuality=2
	r.BloomQuality=5
	r.FastBlurThreshold=7
	r.Upscale.Quality=3
	r.Tonemapper.GrainQuantization=1
```

## 阴影——sg.ShadowQuality

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c5ad2eb-52d0-40ba-9f76-72ffee65ca60/sc_shadowquallevels.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c5ad2eb-52d0-40ba-9f76-72ffee65ca60/sc_shadowquallevels.png)

sg.ShadowQuality左侧设置为0，依次向右递增到3。

**视图（View）**\->**引擎可延展性设置（Engine Scalability Settings）**\->**阴影（Shadows）** 选项根据\[UE\_InstallPath\]/Engine/Config文件夹中 BaseScalability.ini 文件中的设置，调节动态阴影的质量。**低（Low）** 设置等于 *sg.ShadowQuality* 0，**Epic** 等于 *sg.ShadowQuality* 3。

sg.ShadowQuality 0

sg.ShadowQuality 1

```cpp
	r.LightFunctionQuality=0
	r.ShadowQuality=0
	r.Shadow.CSM.MaxCascades=1
	r.Shadow.MaxResolution=512
	r.Shadow.RadiusThreshold=0.06
	r.Shadow.DistanceScale=0.6
	r.Shadow.CSM.TransitionScale=0
```

```cpp
	r.LightFunctionQuality=1
	r.ShadowQuality=2
	r.Shadow.CSM.MaxCascades=1
	r.Shadow.MaxResolution=1024
	r.Shadow.RadiusThreshold=0.05
	r.Shadow.DistanceScale=0.7
	r.Shadow.CSM.TransitionScale=0.25
```

sg.ShadowQuality 2

sg.ShadowQuality 3

```cpp
	r.LightFunctionQuality=1
	r.ShadowQuality=5
	r.Shadow.CSM.MaxCascades=2
	r.Shadow.MaxResolution=1024
	r.Shadow.RadiusThreshold=0.04
	r.Shadow.DistanceScale=0.85
	r.Shadow.CSM.TransitionScale=0.8
```

```cpp
	r.LightFunctionQuality=1
	r.ShadowQuality=5
	r.Shadow.CSM.MaxCascades=4
	r.Shadow.MaxResolution=1024
	r.Shadow.RadiusThreshold=0.03
	r.Shadow.DistanceScale=1.0
	r.Shadow.CSM.TransitionScale=1.0
```

## 纹理——sg.TextureQuality

主流渲染引擎需要更多GPU内存（纹理、网格体、GBuffer、深度缓冲、阴影贴图）。其中一些根据屏幕分辨率缩放（例如GBuffer），另一些有特定的质量设置（例如，阴影贴图）。使用大量GPU内存的另一个因素是所用的纹理（通常压缩并流送）。您可以指示流送系统在管理上更主动一些（缩小池大小、剔除不用的纹理），或者在mip等级计算中拥有更少或更多细节。这样会影响图像质量、您能够注意到的纹理流送瑕疵数量以及游戏的运行流畅度（更新需要高成本内存传输）。结果不尽相同，具体取决于介质（例如，更快/更慢的硬盘/SSD）。从DVD/蓝光流送会大幅增加延迟，因此应当尽量避免。

纹理质量也会影响纹理筛选模式（r.MaxAnisotropy）。限制非匀质样本数量会减小纹理带宽，但不会节省纹理内存。

sg.TextureQuality 0

sg.TextureQuality 1

```cpp
	r.Streaming.MipBias=2.5
	r.MaxAnisotropy=0
	r.Streaming.PoolSize=200
```

```cpp
	r.Streaming.MipBias=1
	r.MaxAnisotropy=2
	r.Streaming.PoolSize=400
```

sg.TextureQuality 2

sg.TextureQuality 3

```cpp
	r.Streaming.MipBias=0
	r.MaxAnisotropy=4
	r.Streaming.PoolSize=700
```

```cpp
	r.Streaming.MipBias=0
	r.MaxAnisotropy=8
	r.Streaming.PoolSize=1000
```

该功能的效果主要取决于游戏和硬件。如果没有很多纹理，甚至加载和使用全分辨率mip贴图也不会使用虚幻引擎4专门为纹理分配的所有内存池，则您实际上不会看到高和低设置的差别（除了对非匀质（Anisotropy）设置的更改）。

## 效果——sg.EffectsQuality

**视图（View）**\->**引擎可延展性设置（Engine Scalability Settings）**\->**效果（Effects）** 选项根据\[UE\_InstallPath\]/Engine/Config文件夹中 BaseScalability.ini 文件中的设置，调节许多不同效果类型的质量。**低（Low）** 设置等于sg.EffectsQuality 0，**Epic** 等于sg.EffectsQuality 3。

sg.EffectsQuality 0

sg.EffectsQuality 1

```cpp
	r.TranslucencyLightingVolumeDim=24
	r.RefractionQuality=0
	r.SSR=0
	r.SceneColorFormat=3
	r.DetailMode=0
	r.TranslucencyVolumeBlur=0
	r.MaterialQualityLevel=0
```

```cpp
	r.TranslucencyLightingVolumeDim=32
	r.RefractionQuality=0
	r.SSR=0
	r.SceneColorFormat=3
	r.DetailMode=1
	r.TranslucencyVolumeBlur=0
	r.MaterialQualityLevel=1
```

sg.EffectsQuality 2

sg.EffectsQuality 3

```cpp
	r.TranslucencyLightingVolumeDim=48
	r.RefractionQuality=2
	r.SSR=0
	r.SceneColorFormat=3
	r.DetailMode=1
	r.TranslucencyVolumeBlur=1
	r.MaterialQualityLevel=1
```

```cpp
	r.TranslucencyLightingVolumeDim=64
	r.RefractionQuality=2
	r.SSR.Quality=1
	r.SceneColorFormat=4
	r.DetailMode=2
	r.TranslucencyVolumeBlur=1
	r.MaterialQualityLevel=1
```

## 细节模式

每个放置的Actor在 **渲染（Rendering）** 类别中都有一个 **细节模式（Detail Mode）** 属性。本质上该设置定义的是Actor渲染的最低细节层次。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/969fa2b0-66dc-4459-b70c-2dff0752423b/sc_00008.png)

该可延展性模式可以从控制台更改：

```cpp
	r.DetailMode 1

```

*r.DetailMode* 0表示低细节模式，*r.DetailMode* 1表示中等细节模式，*r.DetailMode* 2表示高细节模式。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b51821b7-3741-4dee-9bc4-dd4b95dd03ab/sc_00005.png)

使用该命令禁用贴花、细节对象、照明或单个粒子效果十分方便。确保仅在对Gameplay没有影响的对象上使用该命令，否则会遇到网络Gameplay、保存游戏或一致性方面的问题。

## 材质质量级别

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/854c1bb6-2cda-4fde-ace4-66d4266f75a5/scaler_viewmatqual.png)

材质可以使用 **质量开关（Quality Switch）** 材质表达式节点来禁用对最终效果影响较小的高成本材质部分。要查看该表达式效果，需要切换到 **低质量（Low Quality）** 模式。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37706bfc-b76d-445d-8d61-44a0b1736e8c/sc_switchnode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37706bfc-b76d-445d-8d61-44a0b1736e8c/sc_switchnode.png)

将 **材质质量级别（Material Quality Level）** 设置为低还是高，将决定针对该材质要评估哪些表达式（低或高引脚）。如果高和/或低没有输入，则默认引脚将替代高或低。设置为高时，该材质包含2个合理的高成本柏林噪点运算：

该示例仅显示了 **材质开关节点**。**噪点** 节点成本极高，因此也非常适合于这个示例，但应尽量少用，因为有一些成本更低的方法可以达到相同效果。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33794334-c152-41a4-a051-e7d1d7a80be8/sc_closeup.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33794334-c152-41a4-a051-e7d1d7a80be8/sc_closeup.png)

左：材质质量级别 设置为低。右：材质质量级别 设置为高

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38bfd676-57c1-4534-9781-6021831aab3b/sc_mirrorcomplexity.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38bfd676-57c1-4534-9781-6021831aab3b/sc_mirrorcomplexity.png)

左：材质质量级别 设置为低。右：材质质量级别 设置为高 着色器复杂性（Shader Complexity） 模式显示了高质量材质比其他着色器成本更高，绿色越深表示着色器成本越高。

使用质量开关会导致编译更多着色器（着色器Permutation）。

该功能不适用于距离LOD，因为无法同时有两个质量级别。该功能可以用于降低：

-   着色器计算（例如，禁用模糊层）。
    -   使用 **着色器复杂性**（在编辑器中按 **Alt+8**）模式和指令数来验证优化。
-   纹理查找（例如，没有细节凹凸贴图）。
-   内存带宽（例如，使用更少纹理）。
    -   您将需要分析实际硬件来验证这一点。

大多数材质编辑器输出仅影响像素着色器。场景位置偏移和所有曲面细分输出影响其他着色器类型。像素着色器仅在占据大部分屏幕时才会引起高昂的成本（例如，天空盒），其他着色器仅在对象未被剔除时才会有所影响（在视图内部，不透明对象后面没有隐藏对象）。

## 骨架网格体LOD偏差

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ba55520-625b-4e0a-97e2-b072e9826141/sc_skeletal.png)

骨架网格体可以有静态细节层次模型。通过控制台变量 **r.SkeletalMeshLODBias**，可以全局让LOD层次有偏差。根据第一或第二个LOD的质量，可能最好在可延展性设置中启用该选项。这里您可以在距离相关LOD顶部看到可延展性设置的效果。

## 草地和植被可延展性

**视图（View）**\->**引擎可延展性设置（Engine Scalability Settings）**\->**植被（Foliage）** 选项根据\[UE\_InstallPath\]/Engine/Config文件夹中 BaseScalability.ini 文件中的设置，调节一次渲染的植被网格体数量。**低（Low）** 设置等于FoliageQuality 0，**Epic** 等于FoliageQuality 3。

为使植被静态网格体使用可延展性设置，必须启用 **启用密度延展（Enable Density Scaling）** 选项。您可以在[植被实例化网格体](/documentation/zh-cn/unreal-engine/foliage-mode-in-unreal-engine)文档中阅读有关如何设置的更多信息。

FoliageQuality 0

FoliageQuality 1

```cpp
	[FoliageQuality@0]
	foliage.DensityScale=0
	grass.DensityScale=0
```

```cpp
	[FoliageQuality@1]
	foliage.DensityScale=0.4
	grass.DensityScale=0.4
```

FoliageQuality 2

FoliageQuality 3

```cpp
	[FoliageQuality@2]
	foliage.DensityScale=0.8
	grass.DensityScale=0.8
```

```cpp
	[FoliageQuality@3]
	foliage.DensityScale=1.0
	grass.DensityScale=1.0
```

## 自定义可延展性设置

您可以自定义Unreal Engine项目中使用的任意可延展性设置。在以下示例中，我们将通过完成以下操作，添加和更改植被的可延展性设置：

1.  转至项目的 **Config** 文件夹，创建新的 **.INI** 文件，命名为 **DefaultScalability.ini**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33cced6b-7c33-4a4e-b233-c51a2e3d54bd/fgc_config_location.png)
2.  打开新建的 **DefaultScalability.ini** 文件，并添加下列代码。
    
    ```cpp
             [FoliageQuality@0]
             foliage.DensityScale=.25
             grass.DensityScale=.25
    		
             [FoliageQuality@1]
             foliage.DensityScale=0.50
             grass.DensityScale=0.50
    		
             [FoliageQuality@2]
             foliage.DensityScale=0.75
             grass.DensityScale=0.75
    		
             [FoliageQuality@3]
             foliage.DensityScale=1.0
             grass.DensityScale=1.0
    		
    ```
    
3.  保存文件，现在，当 **植被** 的可延展性设置更改时，所产生的植被和地形草地静态网格体数量也会根据选择的设置而减少或增加。
    

-   [scalability](https://dev.epicgames.com/community/search?query=scalability)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [可延展性设置](/documentation/zh-cn/unreal-engine/scalability-reference-for-unreal-engine#%E5%8F%AF%E5%BB%B6%E5%B1%95%E6%80%A7%E8%AE%BE%E7%BD%AE)
-   [分辨率缩放](/documentation/zh-cn/unreal-engine/scalability-reference-for-unreal-engine#%E5%88%86%E8%BE%A8%E7%8E%87%E7%BC%A9%E6%94%BE)
-   [视图距离](/documentation/zh-cn/unreal-engine/scalability-reference-for-unreal-engine#%E8%A7%86%E5%9B%BE%E8%B7%9D%E7%A6%BB)
-   [抗锯齿](/documentation/zh-cn/unreal-engine/scalability-reference-for-unreal-engine#%E6%8A%97%E9%94%AF%E9%BD%BF)
-   [后期处理——sg.PostProcessQuality](/documentation/zh-cn/unreal-engine/scalability-reference-for-unreal-engine#%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E2%80%94%E2%80%94sgpostprocessquality)
-   [阴影——sg.ShadowQuality](/documentation/zh-cn/unreal-engine/scalability-reference-for-unreal-engine#%E9%98%B4%E5%BD%B1%E2%80%94%E2%80%94sgshadowquality)
-   [纹理——sg.TextureQuality](/documentation/zh-cn/unreal-engine/scalability-reference-for-unreal-engine#%E7%BA%B9%E7%90%86%E2%80%94%E2%80%94sgtexturequality)
-   [效果——sg.EffectsQuality](/documentation/zh-cn/unreal-engine/scalability-reference-for-unreal-engine#%E6%95%88%E6%9E%9C%E2%80%94%E2%80%94sgeffectsquality)
-   [细节模式](/documentation/zh-cn/unreal-engine/scalability-reference-for-unreal-engine#%E7%BB%86%E8%8A%82%E6%A8%A1%E5%BC%8F)
-   [材质质量级别](/documentation/zh-cn/unreal-engine/scalability-reference-for-unreal-engine#%E6%9D%90%E8%B4%A8%E8%B4%A8%E9%87%8F%E7%BA%A7%E5%88%AB)
-   [骨架网格体LOD偏差](/documentation/zh-cn/unreal-engine/scalability-reference-for-unreal-engine#%E9%AA%A8%E6%9E%B6%E7%BD%91%E6%A0%BC%E4%BD%93lod%E5%81%8F%E5%B7%AE)
-   [草地和植被可延展性](/documentation/zh-cn/unreal-engine/scalability-reference-for-unreal-engine#%E8%8D%89%E5%9C%B0%E5%92%8C%E6%A4%8D%E8%A2%AB%E5%8F%AF%E5%BB%B6%E5%B1%95%E6%80%A7)
-   [自定义可延展性设置](/documentation/zh-cn/unreal-engine/scalability-reference-for-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8F%AF%E5%BB%B6%E5%B1%95%E6%80%A7%E8%AE%BE%E7%BD%AE)
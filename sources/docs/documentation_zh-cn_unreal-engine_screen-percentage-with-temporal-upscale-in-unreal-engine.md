# 虚幻引擎中的屏幕百分比与时序上采样 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:23:31.590Z

---

目录

![屏幕百分比与时序上采样](https://dev.epicgames.com/community/api/documentation/image/2c013ffb-780a-495e-a57f-33683eb2bb38?resizing_type=fill&width=1920&height=335)

**屏幕百分比** 是一种分辨率调节技术，用于渲染分辨率低于或高于实际显示图像的图像。通过调节屏幕百分比，你的游戏可以在性能和图像分辨率之间保持平衡。

在虚幻引擎4（UE4）4.19版之前，你只需要更改屏幕百分比，但现在它分成了渲染管道中的两类缩放：主要和次要空间放大。

-   **主要空间放大（Primary Spatial Upscaling）** 就是以前使用的屏幕百分比功能。它的基本理念是以较低的分辨率渲染画面，然后先放大，再绘制用户界面（UI）。
-   **次要空间放大（Secondary Spatial Upscaling）** 执行第二次也是最终的空间放大传递，与主要放大传递无关。

## 主要屏幕百分比

**主要空间放大**（即主要屏幕百分比）的工作方式是按屏幕百分比渲染屏幕分辨率，然后进行缩放以适应你的当前屏幕分辨率。如果使用较低的屏幕百分比（或较低的分辨率），然后放大，就称为上采样。或者，在屏幕百分比增大之后（按较高的分辨率渲染），会缩小到当前屏幕的分辨率，这称为 **超级取样**。这一切都发生在绘制用户界面（UI）之前，可能对性能产生影响。

关于屏幕分辨率如何对组成屏幕上所渲染图像的所有缓冲区渲染目标起作用并使其组成一个GPU帧的概念，可以作如下说明：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ed3ff9a-7930-49c7-9d32-5dd33f414f77/noupscaling.png "NoUpscaling.png")

对于每个GPU帧，所有渲染目标在管道中自始至终使用其全分辨率。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3d740a2-aeb2-4940-a0e0-5d859284e5e2/spatialupscale.png "SpatialUpscale.png")

在使用空间放大的情况下，在UI之前绘制的一切都根据所用的屏幕百分比使用或高或低的分辨率。屏幕百分比已经降低（从UI之前变窄的渲染目标可以看出），为渲染目标产生了降低分辨率的图像。空间缩放发生在UI之前，将图像缩放至将要输出的屏幕分辨率。例如，如果当前分辨率设置为1920x1080，并且使用83%的屏幕分辨率，那么渲染目标的大小将调整为近似的1600x900分辨率，然后重新放大到1920x1080。

### 空间放大质量

在放大渲染目标时，可以使用以下控制台变量定义放大质量：

```cpp
	r.Upscale.Quality

```

它控制屏幕百分比和全屏窗口模式缩放3D渲染的质量。

上采样质量数值

上采样结果

**0**

最接近的过滤

**1**

简单双线

**2**

定向模糊，带有非锐化遮罩上采样

**3**

5-tap Catmull-Rom双立方插值，近似Lanczos 2（默认）

**4**

13-tap Lanczos 3

**5**

36-tap高斯过滤非锐化遮罩（成本非常高，但很适合极端上采样）

或者，你可以使用下列控制台变量来控制如何处理色调映射器传递：

```cpp
	r.Tonemapper.MergeWithUpscale.Mode

```

色调映射器集成了一个简单的颜色空间空间放大，可以因为性能原因而使用值 **1** 来启用它。但是，如果材质后期处理在色调映射器之后插入，那么色调映射器就不会执行放大。它将重新使用主要空间放大，就像被禁用了一样。

## 时序抗锯齿上采样

除了主要空间放大外，主要屏幕分辨率还支持第二种放大技术：时序上采样。在时序抗锯齿上采样（TAAU）中，不是先使用时序抗锯齿（TAA）执行临时集成，然后再执行主要空间放大，实际上这两者是同时发生的。它们也可以收敛为比仅使用空间放大时更锐利的图像，不过这样做的成本也会比较高，因为要在较高的分辨率下运行更多后期处理。动态分辨率还可以隐藏主要屏幕百分比更改，从而更频繁地进行更改，尽可能接近地匹配GPU预算。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf225a8e-69e7-4940-afef-07e0599a3603/spatialandtemporalupsample.png "SpatialAndTemporalUpsample.png")

TAAU在管道中发生得比较早，这导致在其后的传递会以较高的分辨率渲染，因此以较高的成本产生更为锐利的图像。

应该注意的是，在使用时序上采样时，不同的后期处理顺序不会因为增加TAAU而改变，因为它只是取代了TAA。真正的差别是，在TAAU之前进行的所有处理都将先使用较低的分辨率，然后上采样到TAAU传递之后的分辨率。在4.19版之前，是假定后期处理中的分辨率始终不变。

在主要屏幕百分比降低后，到干净的全分辨率输出的收敛会改变。因此，一些原有的TAA瑕疵会变得更明显。例如在非常细的几何体上，锯齿可能成为问题，增加在降低主要屏幕百分比时丢失此几何体细节的概率。

### 启用时序上采样

要使用时序抗锯齿上采样，你需要进入"项目设置（Project Setting）"中找到 **时序上采样（Temporal Upsampling）**，更简单的办法是使用下列控制台变量：

```cpp
	r.TemporalAA.Upsampling 1

```

如果使用空间放大的主要屏幕百分比较低，在降低分辨率时，可能丢失重要细节。例如，对于铁链栅栏或者车头的格栅，当使用时序抗锯齿时，可能在较远的距离比较难以看清细节。如果启用TAAU，就可以在仍然使用降低的屏幕百分比的情况下减少这一问题。

![屏幕百分比：70 | 时序上采样：禁用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c32f246-a49b-4404-ae69-9b8238ddf163/temporalupsample_before1-1.jpg)

![屏幕百分比：70 | 时序上采样：启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9836863a-1e1e-4311-913e-55a6c2b62438/temporalupsample_after1-1.jpg)

屏幕百分比：70 | 时序上采样：禁用

屏幕百分比：70 | 时序上采样：启用

在这个对比案例中，主要屏幕百分比已经设置为 **70**，摄像机移动到了足够远的距离，可以有效地看到TAA如何影响高频几何体和材质。时序上采样使我们能够看到这些细节，即便使用了较低的分辨率，也会尽可能维持这些细节。

### 其他示例

在这第一组对比中，一边是仅仅降低了屏幕百分比的默认场景，另一边是使用同样的屏幕百分比但启动了时序上采样的场景。从这些屏幕截图上也许只能看出微小的差异，但是在更大的屏幕上，具有密集几何体或高频纹理的区域可以重新获得一些丢失的细节，例如屋顶上的栏杆或树上的叶子（包括近景和远景）。

![屏幕百分比：70 | 时序上采样：禁用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9678466-2670-48cb-82f8-fb9512946fa4/shot3a-1.jpg)

![屏幕百分比：70 | 时序上采样：启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a6fde75-f961-44ba-b7db-f277ff40e03d/shot2a-2.jpg)

屏幕百分比：70 | 时序上采样：禁用

屏幕百分比：70 | 时序上采样：启用

在这个示例中，可以将不使用任何时序上采样的默认屏幕百分比100与使用时序上采样的较低屏幕百分比对比。虽然丢失了一些高光和材质细节，但是尽管屏幕百分比已经降低，时序上采样还是很好地保持了几何体细节。

![屏幕百分比：70 | 时序上采样：启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d64f5db-0a42-4fa5-8586-8c3d8c6816e7/shot2a-5.jpg)

![屏幕百分比：100 | 时序上采样：禁用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0f9b1c3-6b6b-43a1-83e5-5ea4518ac388/shot1a-1.jpg)

屏幕百分比：70 | 时序上采样：启用

屏幕百分比：100 | 时序上采样：禁用

### Automatic View Texture Mip Bias

因为屏幕百分比会导致几何体以较低的像素密度渲染，所以时序上采样需要更多来自 **表面** 和 **延迟贴花** 材质域的纹理信息才能保持输出锐利度不变。为此，在默认情况下可以使用纹理取样表达式 **Automatic View Mip Bias**。

纹理取样表达式可使用 **Automatic View Mip Bias** 来切换是否应该通过逐视图的Mip偏差对纹理进行取样，从而使时序抗锯齿具有更锐利的输出。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19f78d5f-9030-4413-8695-de51f1e003be/automaticviewmipbias.png "AutomaticViewMipBias.png")

对于高频纹理（例如下面的示例），自动Mip偏差在较低的屏幕百分比下可能问题较多。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16e51ee7-c15c-4761-9c68-08c4d1202a1b/hftexture.png "HFtexture.png")

在这种情况下，可以使用Mip偏差输入来补偿，或者选择不使用 **Automatic View Mip Bias**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07233ebc-b910-4afd-8e19-6fa462de2998/automaticviewmipbiasunchecked.png "AutomaticViewMipBiasUnchecked.png")

**Automatic View Mip Bias** 仅发生在启用TAAU的情况下。常规抗锯齿方法（TAA、MSAA和FXAA）将无法使用此选项。

### 实现抗锯齿质量的着色器性能Permutation

和TAA一样，临时放大采样附带用于实现后期处理质量3和4的更快着色器Permutation。着色器Permutation换来的是一定的质量，能够在主机平台上发布60Hz运行的作品。质量设置与设置后期处理质量时已经使用的设置相似。此外还应牢记，TAAU需要比TAA更多的工作，因为它是在较高的分辨率下运行，并且在TAAU传递之后还有后期处理。

可以使用下列控制台变量调节后期处理质量：

```cpp
	r.PostProcessAAQuality

```

值得注意的是，时序上采样之后的后期处理是在全分辨率下运行的，所以禁用TAA将使它们在较低的分辨率下运行，这是因为它们将在最后进行空间放大，从而加快后期处理的速度。请使用命令`profileGPU`来调查每次传递中GPU性能的明细，使用的是什么传递，以及大部分预算用在哪里。

下表说明了使用这些范围中的主要屏幕百分比值设置时你可以期待的结果：

屏幕范围

百分比

备注

50%

71%

这是提高性能的最快方法，因为它在内存中使用较小的本地数据存储（LDS）块。如果目标是在台式机和游戏机上时序上采样到4K，这是理想的选择。

71%

100%

对于台式机和游戏机上的普通DPI（每英寸点数）渲染是理想选择。

100%

200%

如果要使[动态分辨率](/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine)在不被用于渲染目标的GPU内存限制的前提下具有超过100%的理论可能，那么这是理想选择。

### 材质改进

对于材质使用场景纹理表达式对场景取样的方式做了一些改进。现在它已简化，因此视图大小始终等于所使用的渲染目标的大小。在实现视图尺寸中准确的像素定位的Screen Position表达式上增加了一个新的输出。还列出了一些在TAAU之后使用材质后期处理时要考虑的附加事项。

#### 视图大小和渲染目标大小

现在视图大小将始终等于材质中的渲染目标大小。在UE4的4.19版之前，对场景纹理取样时，材质必须处理不同于视口UV的复杂场景纹理UV。例如，Screen Position表达式会输出这两种数值，而View Property也会公开不一定等于视图大小的渲染目标大小。这是因为渲染器实际上是在可能更大的渲染目标中渲染视口。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/209ff8dc-970b-4719-9cfe-850f5d9833bb/viewportvsrendertargetresolution-1.jpg)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/209ff8dc-970b-4719-9cfe-850f5d9833bb/viewportvsrendertargetresolution-1.jpg)

点击查看大图。

这种复杂性现已消除，材质的行为将始终以渲染目标大小等于视图大小的情况为准。Screen Position表达式现在将始终返回视口UV，而Scene Texture表达式会将视口UV作为输入。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0579119-b345-4dad-9c58-3364fc1e8ace/screenposviewportuvmat.png "ScreenPosViewportUVMat.png")

关于Screen Position如何返回用于Scene Texture表达式的 ViewportUV 大小的示例设置。

#### Screen Position高精度像素位置输出

Screen Position表达式现在包含用于像素位置的第二个输出，它是视口UV乘以传递大小的结果。View Property的视图大小将始终返回TAAU之前的分辨率，即使在[TAAU之后运行的材质后期处理](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#postprocessmaterialaftertemporalupsample)中也不例外。

像素位置用于给材质提供视图大小中最准确的像素位置，这对于与TAA同步的自定义像素抖动之类的效果有关键意义。以下是关于如何计算视口UV的示例：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4108ee61-7f90-4787-a938-c7b8c720408a/viewportuv-1.png "ViewportUV-1.png")

#### 时序上采样之后的材质后期处理

创建材质后期处理之后，你可以选择要使用的可混合位置。**色调映射之后** 和 **替换色调映射器** 位置在管道中位于TAAU之后，这意味着它们实际上是在全分辨率下运行的，而且不同于视图大小。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc21e276-2e70-4234-bca1-f96e2217f576/blendablelocation.png "BlendableLocation.png")

View Property表达式的视图大小和渲染目标大小将仍然返回TAAU之前的视图分辨率，尽管它是发生在TAAU之后。要了解TAAU之后的视图大小和纹素UV大小是多少，使用PostProcessInput0的Scene Texture表达式可以使用 **Size** 和 **InvSize** 的输出。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3dd78de6-ab05-4f22-beb0-37d845bfdda1/viewproperty.png "ViewProperty.png")

可以像这样根据像素位置重新计算视口UV：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ce8eecd-c95c-4eda-9924-53ffb4af31ea/screenposfrompixelpos.png "ScreenPosFromPixelPos.png")

既然Scene Texture表达式只接受视口UV，就可以在执行UV视口转换的同时在任意场景纹理中取样，而且不可能出错。

## 次要空间放大

除了[主要空间放大](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#primaryscreenpercentage)外，还有 **次要空间放大（Secondary Spatial Upscale）**，它发生在[TAAU](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#temporalanti-aliasingupsample)传递之后。对于高DPI的显示器这可能产生问题，因为GPU可能无法适应在较高分辨率下渲染的场景复杂度。为此，渲染器支持使用驱动第二和最终放大传递的次要屏幕百分比。此传递与主要屏幕百分比无关。

请注意，与主要空间放大不同的是，次要空间放大是静态的，无法在游戏中动态更改。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/929b5f99-3a17-48b7-aff3-bdc938814e5d/primaryandsecondaryscreenpercentageupscale.png "PrimaryAndSecondaryScreenPercentageUpscale.png")

你可以在配置（.ini）文件中使用下列控制台变量设置次要屏幕百分比：

```cpp
	r.SecondaryScreenPercentage.GameViewport

```

如果我们知道后台缓冲区分辨率是1080p，要把目标定为较低的900p分辨率，可以为次要屏幕百分比输入相应的百分比。

```cpp
	目标分辨率 / 当前设置的分辨率 * 100 = 次要屏幕百分比
	900 / 1080 * 100 = 0.8333 * 100 = 83.33

```

例如，假设我们的目标是让《堡垒之夜：大逃杀》在Xbox One上以60hz运行，可以使用83.33的数值，并作如下设置：

```cpp
	[XboxOne_60 DeviceProfile]
	DeviceType=XboxOne
	BaseProfileName=XboxOne
	+CVars=r.SecondaryScreenPercentage.GameViewport=83.33

```

向配置文件添加次要屏幕百分比将覆盖编辑器和它所针对的所有平台设置。你还要记住，应使用控制台变量`r.SetRes`控制后台缓冲区分辨率。最好让该分辨率保持为1080p或4k，这样UI就可始终以目标平台的原生分辨率渲染。

### DPI编辑器视口缩放

在编辑器中工作时，所有视口都按除以操作系统（OS）DPI比例的次要屏幕百分比渲染。次要屏幕百分比是使用下列公式确定的：

```cpp
	SecondaryScreenPercentage = 100 / 操作系统DPI比例

```

对于高DPI的显示器会调节场景比例（或质量），确保非常大的渲染目标也能保持一致的性能。这还能防止分配可能对系统的GPU而言显得过大的中间渲染目标，避免造成编辑器崩溃和工作成果丢失。在默认情况下，编辑器会针对高DPI显示器调整场景比例，以确保在非常高的像素密度下保持一致的性能。但也可以在编辑器首选项中启用设置 **禁用基于DPI的视口编辑器缩放（Disable DPI Based Editor Viewport Scaling）** 来自定义此功能。该设置允许将次要屏幕百分比默认设置为100，对所有编辑器视口都按全分辨率渲染。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0cdf287-7200-4bac-99cf-b371616b37f8/dpieditorviewportscaling.png "DPIEditorViewportScaling.png")

更改此选项只会影响编辑器，游戏构建版本的次要屏幕百分比在默认情况下将等于100%。

## VR像素密度

在虚幻引擎4.19之前，我们使用屏幕百分比控制台变量来确定头戴式显示器（HMD）屏幕应该以多大的分辨率来渲染VR项目。这往往是一个"魔法"数字，需要根据用于显示项目的HMD来调节（和记忆）。

现在，屏幕分辨率是由像素密度控制的。这样就不需要使用屏幕百分比的"魔法"数字，方便了针对多种HMD进行开发。在默认情况下，将会按HMD的推荐分辨率来渲染眼视图，避免HMD合成器执行任何通常会导致模糊的放大处理。你可以使用下列控制台变量来指定高于或低于屏幕的推荐分辨率的像素密度：

vr.PixelDensity

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb0ede05-bc2a-463e-8135-def787048481/vrpixeldensity.png "VRPixelDensity.png")

在这个示意图中，你可以看到使用了HMD的理想分辨率，而VR像素密度使你可以调节任意数字，根据需要提高或降低理想的HMD分辨率。这一改变允许独立控制主要屏幕百分比到临时放大再到视图分辨率，然后在此管道中传递到HMD合成器。

要了解更多信息，请在此处阅读关于[VR像素密度](https://www.unrealengine.com/en-US/blog/significant-changes-coming-to-vr-resolution-settings-in-4-19)的内容。

-   [performance](https://dev.epicgames.com/community/search?query=performance)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [主要屏幕百分比](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#%E4%B8%BB%E8%A6%81%E5%B1%8F%E5%B9%95%E7%99%BE%E5%88%86%E6%AF%94)
-   [空间放大质量](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#%E7%A9%BA%E9%97%B4%E6%94%BE%E5%A4%A7%E8%B4%A8%E9%87%8F)
-   [时序抗锯齿上采样](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#%E6%97%B6%E5%BA%8F%E6%8A%97%E9%94%AF%E9%BD%BF%E4%B8%8A%E9%87%87%E6%A0%B7)
-   [启用时序上采样](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#%E5%90%AF%E7%94%A8%E6%97%B6%E5%BA%8F%E4%B8%8A%E9%87%87%E6%A0%B7)
-   [其他示例](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#%E5%85%B6%E4%BB%96%E7%A4%BA%E4%BE%8B)
-   [Automatic View Texture Mip Bias](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#automaticviewtexturemipbias)
-   [实现抗锯齿质量的着色器性能Permutation](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#%E5%AE%9E%E7%8E%B0%E6%8A%97%E9%94%AF%E9%BD%BF%E8%B4%A8%E9%87%8F%E7%9A%84%E7%9D%80%E8%89%B2%E5%99%A8%E6%80%A7%E8%83%BDpermutation)
-   [材质改进](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#%E6%9D%90%E8%B4%A8%E6%94%B9%E8%BF%9B)
-   [视图大小和渲染目标大小](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#%E8%A7%86%E5%9B%BE%E5%A4%A7%E5%B0%8F%E5%92%8C%E6%B8%B2%E6%9F%93%E7%9B%AE%E6%A0%87%E5%A4%A7%E5%B0%8F)
-   [Screen Position高精度像素位置输出](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#screenposition%E9%AB%98%E7%B2%BE%E5%BA%A6%E5%83%8F%E7%B4%A0%E4%BD%8D%E7%BD%AE%E8%BE%93%E5%87%BA)
-   [时序上采样之后的材质后期处理](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#%E6%97%B6%E5%BA%8F%E4%B8%8A%E9%87%87%E6%A0%B7%E4%B9%8B%E5%90%8E%E7%9A%84%E6%9D%90%E8%B4%A8%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86)
-   [次要空间放大](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#%E6%AC%A1%E8%A6%81%E7%A9%BA%E9%97%B4%E6%94%BE%E5%A4%A7)
-   [DPI编辑器视口缩放](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#dpi%E7%BC%96%E8%BE%91%E5%99%A8%E8%A7%86%E5%8F%A3%E7%BC%A9%E6%94%BE)
-   [VR像素密度](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#vr%E5%83%8F%E7%B4%A0%E5%AF%86%E5%BA%A6)
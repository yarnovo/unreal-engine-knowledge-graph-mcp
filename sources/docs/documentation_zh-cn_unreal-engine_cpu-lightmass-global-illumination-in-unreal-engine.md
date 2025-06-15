# 虚幻引擎中的CPU Lightmass全局光照 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:14:59.159Z

---

目录

![CPU Lightmass全局光照](https://dev.epicgames.com/community/api/documentation/image/3517572f-9608-44af-9f50-37a9647be47a?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d10aeb1b-73b8-43b2-bb8e-5d5755f5e241/lightmass-global-illum-banner.png)

**全局光照（Lightmass）** 创建具有复杂光交互作用的光照图，例如区域阴影和漫反射。它用于预计算具有固定和静态运动性的光源的光照贡献部分。

编辑器和全局光照之间的通信由 **Swarm Agent** 处理，它管理本地的光照构建，也可以将光照构建分发到远程机器。默认情况下以最小化方式打开的Swarm Agent还会跟踪光照构建进度，并让你了解哪些机器为你工作，它们在做什么，以及每个机器使用了多少线程。

下图是Swarm Agent的一个示例图像（靠近底部的条形图显示了构建的完成程度）。

![Example of the Swarm Agent](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e418b768-6ff3-46c1-8126-327026b35334/01-lightmass-global-illum-swarm-agent.png)

## 静态和固定光源的特性

### 漫反射

**漫反射（Diffuse Interreflection）** 是目前为止视觉上最重要的全局光照效果。在默认情况下，光源以全局光照反射，而材质的基本颜色（BaseColor）项控制有多少光（和什么颜色）向各个方向反射。这种效果有时被称为渗色。漫反射是入射光在各个方向上均匀反射，即不受观测方向或位置的影响。

这里是一个由全局光照创建的场景，只有一个方向的光，且仅显示直接光照。光源无法直接照射的区域是黑色的。这是没有全局光照的结果。

![The scene with the single Directional Light and only direct lighting](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9038eee3-b24e-4f5f-979a-df8791ecfb48/02-lightmass-global-illum-direct-light-only.png)

这是第一个漫反射全局光照反射的样子。注意左边椅子后面的阴影，这叫做间接阴影，因为它是间接光的阴影。漫反射的亮度和颜色取决于入射光和与之相互作用的材质的漫反射项。每次反射都比前一次更暗，因为一些光被表面吸收而不是被反射。柱子底座比其他表面得到更多的间接光，因为它们更接近直射光下的区域。

![The scene with the first diffuse illumination bounce](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d503bdf4-4ca0-411c-af7f-987b230d1918/03-lightmass-global-illum-bounce.png)

这是第二次漫反射。光线变得更弱，分布更均匀。

![The scene with the second diffuse illumination bounce](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93d76919-9371-45b3-be42-df0ada02cbc9/04-lightmass-global-illum-second-bounce.png)

这是四种漫反射相结合的场景。比起手动放置补光灯，模拟全局光照可以创建更细致和现实的光照。尤其是补光灯无法实现间接阴影。

![The scene with four diffuse bounces combined](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb11ff60-a7c9-49c4-a19c-6eb276e931e9/05-lightmass-global-illum-four-bounces.png)

反射光照获取基础材质的漫反射颜色，如下所示。这就是渗色这个术语的由来。渗色最明显的是高度饱和的颜色。你可以通过在基元（Primitive）、材质（Material）或关卡（Level）上提升\_DiffuseBoost\_来夸大效果。

![Diffuse bounce T](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee188210-b0c8-43ae-a28a-9e223edf8bbf/06-lightmass-global-illum-diffuse-bounce-t.png)

![Diffuse bounce L](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25e16b57-33fb-448e-90db-79b37d633ffb/07-lightmass-global-illum-diffuse-bounce-l.png)

 

 

### 角色光照

全局光照在[**全局光照重要体积（Lightmass Importance Volume）**](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7%E9%87%8D%E8%A6%81%E4%BD%93%E7%A7%AF)内以较低的分辨率将样本放置在一个统一的三维网格体中，并以较高的分辨率将样本放置在角色可能行走的向上表面上。每个光照示例捕获来自各个方向的间接光照，但不包括直接光照。

第一幅图像是放置在地板上方的光照样本调试可视化，第二幅图像是光照模式下的相同场景。请注意红色挂毯上面的样本如何获取红色反射光。这些样本被可视化为单一颜色，但它们确实捕获了来自各个方向的光线。

![Debug visualization of lighting samples placed above the floor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a84a7ff3-a40e-4774-a8ca-1699780cca94/08-lightmass-global-illum-char-lighting.png)

![Debug visualization of lighting samples placed above the floor in Lit mode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/170f3d88-351f-4c4e-bbf2-71eec02f96fa/09-lightmass-global-illum-char-lighting-lit.png)

 

 

然后间接光照缓存使用这些光照样本内插可移动对象的间接光照。间接光照影响光源环境阴影的颜色，而不是方向。使用 **显示（Show）> 可视化（Visualize）> 体积光照样本（Volume Lighting Samples）** 在你的视口中预览它们。

![Enabling Volume Lightning Samples in the Viewport](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df0b336c-d17a-4318-b067-6216c29cc81d/10-lightmass-global-illum-enable-volume-samples.png)

有关更多信息，请参阅[间接光照缓存（Indirect Lighting Cache）](/documentation/zh-cn/unreal-engine/indirect-lighting-cache-in-unreal-engine)文档。

#### 限制

*体积样本放置的默认设置将导致在大型贴图中出现大量样本。这将导致间接光照缓存插值时间非常大。使用静态光源等级缩放（Static Lighting Level Scale）减少大贴图中的样本计数。* 全局光照重要体积外的可移动对象将采用黑色间接光照。

### 环境遮挡

全局光照会自动计算出详细的间接阴影，但是为了艺术目的夸大间接阴影或者增强场景的接近感是很有用的。

**环境遮挡（Ambient occlusion）** 是你从一个均匀明亮的上半球得到的间接阴影，就像阴天。全局光照支持计算环境遮挡，将其应用于直接和间接光照，然后将其烘焙成光照图。默认情况下，环境遮挡是启用的，可以通过取消选中世界场景设置（World Settings）下的全局光照（Lightmass）的全局光照设置（Lightmass Settings）中的 **使用环境遮挡（Use Ambient Occlusion）** 复选框来禁用。

第一幅图是一个有间接光照但没有环境遮挡的场景。第二幅图是有环境遮挡的相同场景，且环境遮挡应用于直接和间接光照，注意对象聚集的地方变暗。

![Scene with indirect lighting and No Ambient Occlusion](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ea85c8b-e634-4dc9-b228-e5c246c66c91/11-lightmass-global-illum-no-ambient.png) | ![Scene with indirect lighting and Ambient Occlusion](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c48aafd6-7bff-4271-86d0-fc5ce0220897/12-lightmass-global-illum-with-ambient.png) |

无环境遮挡

环境遮挡

#### 环境遮挡设置

属性

说明

**可视化环境遮挡（Visualize Ambient Occlusion）**

在构建光照时，仅使用遮挡因子覆盖光照图。这有助于准确地了解遮挡因子是什么，并比较不同设置的效果。

**最大遮挡距离（Max Occlusion Distance）**

一个对象对另一个对象造成遮挡的最大距离。

**完全遮挡样本比例（Fully Occluded Samples Fraction）**

为了达到完全遮挡，必须遮挡的样本的比例。请注意，还有一个逐基元FullyOccludedSamplesFraction，它允许控制一个对象对其他对象造成的遮挡量。

**遮挡指数（Occlusion Exponent）**

指数越高，对比度越高。

![Default AO settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7963a47-3a33-434a-83b1-886556975590/13-lightmass-global-illum-default.png)

![MaxOcclusionDistance of 5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b173454-53d0-48d9-a88d-d378378ab034/14-lightmass-global-illum-max-occ-5.png)

![Fully Occluded Samples Fraction of 0.8](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68ff00ff-cdf6-45ff-9df8-a39280530a21/15-lightmass-global-illum-fully-occ.png)

![Occlusion Exponent of 2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bac85758-8d6f-4f85-956c-f21130da0453/16-lightmass-global-illum-occ-exp-2.png)

默认AO设置（最大遮挡距离（MaxOcclusionDistance）为200，完全遮挡样本比例（FullyOccludedSamplesFraction）为1.0，遮挡指数（OcclusionExponent）为1.0）。

最大遮挡距离（MaxOcclusionDistance）为5。去除低频遮挡，只留下角落遮挡。

完全遮挡样本比例（FullyOccludedSamplesFraction）为0.8。所有范围内的遮挡都变暗了，任何80%遮挡或以上的区域都饱和成黑色。

遮挡指数为2。遮挡造成的阴影从中等过渡到饱和黑色要快得多，遮挡被推到角落里。

当间接光照反射次数大于0时，在光照构建时间范围内，环境遮挡几乎是没有的。

#### 限制

*环境遮挡需要相当高的光照图分辨率才能良好显示，因为它在角落变化很快。* 预览质量构建在预览环境遮挡方面做得不是很好，因为AO需要非常密集的光照样本（就像间接阴影）。

### 遮罩阴影

全局光照在计算阴影时考虑了BLEND\_Masked材质的不透明度遮罩。在编辑器视口中被剪切的部分材质也不会引起任何投影，这允许从树和叶子进行更详细的投影。

![Masked shadows](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dfd35a7e-4fc5-4df8-b69d-de1fcd52e3fd/17-lightmass-global-illum-masked.png)

![Masked shadows L](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12147ab4-508f-4f7c-9405-e2f0efa7deb5/18-lightmass-global-illum-masked-l.png)

 

 

## 仅适用于固定光源的特性

### 环境法线天空遮挡

当启用具有固定移动性的[天空光照（Sky Light）](/documentation/zh-cn/unreal-engine/sky-lights-in-unreal-engine)具有固定移动能力时，全局光照以环境法线的形式产生定向遮挡。

### 距离场阴影贴图

全局光照计算[固定光源（Stationary Lights）](/documentation/zh-cn/unreal-engine/stationary-light-mobility-in-unreal-engine)的距离场阴影贴图。距离场阴影贴图即使在较低的分辨率下也能很好地保持其曲线形状；然而，它们不支持区域阴影或半透明阴影。

## 仅适用于静态光源的特性

### 区域光源和阴影

采用全局光照时，所有具有静态移动性的光源在默认情况下都是区域光源。点光源和聚光灯光源使用的形状是一个球体，其半径是由全局光照设置（Lightmass Settings）下的光源半径（Light Source Radius）设置的。定向光源使用一个圆盘，位于场景的边缘。光源的大小是控制阴影柔度的两个因素之一，因为较大的光源会产生较柔和的阴影。另一个因素是从接收位置到阴影投射物的距离。随着距离的增加，阴影变得柔和，就像在现实生活中一样。

第一幅图像是一个静态定向光源，只有静态光照，半影大小在任何地方都是相同的。在第二幅图像中，全局光照计算的区域阴影的清晰度由光源大小和遮挡物距离控制。注意柱子阴影在接近地面的地方如何变得更加清晰。

![Scene with the Static Directional Light with only static lighting](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50844145-6e6f-445a-978b-58a6a30ee659/19-lightmass-global-illum-only-static.png)

![Sharpness of shadows is controlled by the light source size and occluder distance](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b75023b2-536b-4cf2-b553-c82af24ececf/20-lightmass-global-illum-size-occluder.png)

 

 

点光源和聚光灯光源的半径用黄色线框表示，影响半径用蓝绿色线框表示。在大多数情况下，你需要确保光源不与任何投射阴影的几何体相交，否则光线将在该几何体的两侧发出。

![The light source areas](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43e45dc9-ddad-4d29-a6a6-c50244845d54/21-lightmass-global-illum-area-light.png)

### 半透明阴影

光在通过应用到静态阴影投射网格体的半透明材质之后，将失去一些能量，导致半透明的阴影。

![Translucent shadow example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3c90025-356a-4075-8dfc-ce95b499da14/22-lightmass-global-illum-translucent-t.png)

#### 半透明阴影颜色

穿过材质的光称为透射光，每个颜色通道的透射光量在0到1之间。值为0表示完全不透明，1意味着入射光可以不受影响的穿过。由于透射光没有材质输入，所以目前是由以下其他材质输入得出的：

-   光照材质
    -   BLEND\_Translucent和BLEND\_Additive：透射光 = Lerp（白色（White）、基本颜色（BaseColor）、不透明度（Opacity））
    -   BLEND\_Modulate：透射光 = 基本颜色（BaseColor）
-   无光照材质
    -   BLEND\_Translucent和BLEND\_Additive：透射光 = Lerp（白色（White）、自发光（Emissive）、不透明度（Opacity））
    -   BLEND\_Modulate：透射光 = 自发光（Emissive）

这意味着在不透明度为0时，该材质不会过滤掉入射光，也不会有半透明的阴影。在不透明度为1时，入射光将被材质的自发光或基本颜色（取决于是否被点亮）过滤。请注意，间接光照有时会洗掉半透明的阴影，使它们比半透明材料的自发光或漫反射更不饱和。

#### 半透明阴影清晰度

有几个因素控制半透明阴影清晰度。

第一幅图像中使用大光源（光源角度为5的定向光源），第二幅图像中使用小光源（光源角度为0）。

![Using of the large light source](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2841677f-c5fe-43a7-9642-40f6d71a007e/23-lightmass-global-illum-large-source.png)

![Using of the small light source](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ccfa2f4-4e74-45e6-8798-c2300022b497/24-lightmass-global-illum-small-source.png)

 

 

第一幅图像中使用了一个小光源，但是光照图的分辨率太低，无法捕捉到清晰的半透明阴影。第二幅图像中，材质导出的分辨率过低（由材质编辑器中的导出分辨率比例（Export Resolution Scale）控制），无法捕捉到清晰的阴影。

![Small light source with a low resolution](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a28dcbe9-f2c8-41a7-9e1a-fce43c271c42/25-lightmass-global-illum-resolution-low.png)

![Material was exported of a resolution controlled by Export Resolution Scale feature](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e78b102-c569-42d2-8a02-5d69042f53d3/26-lightmass-global-illum-resolution-export.png)

 

 

间接光源也受到半透明材质的影响。该图像中的窗口根据光线的透射情况对入射光进行过滤，然后光线会在场景中来回反射，且颜色会发生变化。

![The window filters incoming light based on its Transmission](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/343c37f0-d5bc-4de5-9532-b6cd93912898/27-lightmass-global-illum-trans-shadow-indir-light.png)

#### 限制

***半透明材质（Translucent Materials）** 目前不散射光，所以它们不会在其周围的对象上渗色。* 第一个漫反射目前不受半透明阴影的影响。这意味着，通过半透明材质的第一反射间接光源不会被该材质的 **透射（Transmission）** 过滤。 \* 目前不支持折射（透射光的焦散）。

## 使用全局光照获取最佳质量

### 使灯光显眼

#### 漫反射纹理

渲染期间，光照像素颜色被确定为基本颜色 \* 光照，所以基本颜色直接影响光照的可见度。高对比度或暗漫反射纹理使光照很难被注意到，而低对比度中距离漫反射纹理让光照的细节表现出来。

比较第一幅图像中使用中等漫反射纹理构建的场景和第二幅图像中同样使用全局光照但带有噪点的黑色漫反射纹理构建的场景光照清晰度。第二幅图像中，只有最频繁的变化才会在场景中被注意到，比如阴影过渡。

![Scene build with mid-range diffuse textures](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53d57524-31d9-4067-abd3-ba95263fc17c/28-lightmass-global-illum-mid-tone-diffuse.png) | ![Scene build with dark diffuse textures](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/686367c9-421b-42ef-bf80-f5fba669f0ee/29-lightmass-global-illum-dark-tone-diffuse.png) |

 

 

**无光照（Unlit）** 视图模式可用于查看漫反射项。第一幅图像中的场景在无光照视图模式下看起来更加平坦和单调，这意味着所有的工作都是由光照完成的，最终像素颜色的变化主要是由于光照的不同。（为了获得良好的光照，在无光照视图模式下，你的场景应看起来单调乏味。）将光照和宏观特征烘焙到漫反射纹理中将抵消光照。

![Using Unlit view mode for mid tone Diffuse term](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/acbd703a-1f95-4e5f-becc-8497d89cda06/30-lightmass-global-illum-mid-tone-diffuse-unlit.png) | ![Using Unlit view mode for dark tone Diffuse term](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8417c8a-5f57-40da-aad6-ea8c53d06248/31-lightmass-global-illum-dark-tone-diffuse-unlit.png) |

 

 

在无光照图像的几个部分上使用编辑器的颜色选择器，我们可以看到第一幅图像中场景的漫反射值约为0.5，而第二幅图像中场景的漫反射值约为0.08。在Photoshop中查看这些无光照图像的直方图可以很好地了解漫反射纹理的分布。

Photoshop向你展示了伽马空间中的颜色值，因此186(.73)的值（而不是127(.5)的值）实际上介于黑色和白色之间。\*第一幅图像显示了直方图的样子，以便获得显著的光照。

![Histogram](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5175dca-958c-46b5-ba90-850729af507f/32-lightmass-global-illum-histogram-spo.png) ![Histogram](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c24f66d-f493-449b-8328-62e6e808fa32/33-lightmass-global-illum-histogram-ut.png)

#### 光照设置

*避免环境光照！像环境立方体贴图这样的环境光照会在你的关卡中添加一个恒定的环境项，从而减少间接光照区域的对比度。  
*设置光源，使直接光照区域和间接光照区域之间有鲜明对比。对比度会让你更容易找到阴影过渡的位置，也会让你的关卡更有深度感。 \* 设置光源，使明亮区域不是太亮，黑暗区域不全黑，而仍然有值得注意的细节。检查最终目标显示器上的黑暗区域是很重要的。

### 改善光照质量

#### 光照图分辨率

使用高分辨率的纹理光照图是获得清晰、高质量光照的最好方法。使用高光照图分辨率的缺点是占用更多纹理内存和增加构建时间，所以需要做一个权衡。理想情况下，场景中的大部分光照图分辨率应该分配在高视觉影响区域和有高频阴影的地方。

#### 全局光照解算器质量

**全局光照解算器（Lightmass Solver）** 设置是根据"光照构建选项（Lighting Build Options）"对话框中请求的构建质量自动设置的。生产应该提供足够好的质量，即在应用漫反射纹理时，穿帮不是很明显。

## 获取最佳光照构建时间

有几种方法可以缩短全局光照构建时间：

*只有高频率（快速变化）光照区域才有高分辨率的光照图。减少笔刷表面和静态网格体的光照图分辨率，这些表面和网格体不在直接光照范围内，或不受到清晰间接阴影的影响。这将在最明显的区域给你高分辨率的阴影。* 对玩家来说永远不可见的表面应该设置尽可能低的光照图分辨率。 *使用[全局光照重要体积](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7%E9%87%8D%E8%A6%81%E4%BD%93%E7%A7%AF)来包含最重要的区域（仅在可玩区域附近）。* 优化整个贴图的光照图分辨率，使网格体的构建时间更加均匀。无论有多少台机器在进行分布式构建，光照构建的速度都不能快于最慢的单个对象。避免大的连续网格体包围关卡的一大部分和使用高光照图分辨率。如果将它们分解成更模块化的部件，特别是在具有许多核心的机器上，那么构建时间将会更短。 \* 有很多自遮挡的网格体需要更长的时间来构建，例如，有许多层相互平行的地毯比平坦的地板需要更长的时间来构建。

**光照构建信息（Lighting Build Info）** 对话框是改善光照构建时间的一个非常重要的工具。首先，在你想要查看统计数据的关卡中构建光照。然后，打开 **构建（Build）> 光照信息（Lighting Info）> 光照StaticMesh信息（Lighting StaticMesh Info）** 下的对话框。将下拉列表更改为 **光照构建信息（Lighting Build Info）**。这将显示网格体的排序列表，以及它们计算光照的时间。

![Lightning Static Mesh Statistic window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ba006a9-db87-4ada-8137-6765ac93ac79/34-lightmass-global-illum-statics-window.png)

## 全局光照设置

### 全局光照重要体积

许多贴图在编辑器中已经网格化到网格的边缘，但是需要高质量光照的实际可玩区域要小得多。全局光照取决于关卡的大小发射光子，因此这些背景网格体将大大增加需要发射的光子数量，而光照构建时间也将增加。全局光照重要体积控制全局光照发射光子的区域，允许你将其集中在需要清晰间接光照的区域。在重要体积之外的区域在较低的质量下只能得到一次间接光照的反射。

第一幅图像中显示了多玩家地图的系统占用线框视图。需要高质量光照的实际可玩区域是中心的绿色小团。

第二幅图像中显示了多玩家地图可玩区域的近景，并正确选择了设置 **全局光照重要体积（Lightmass Importance Volume）**。全局光照重要体积将该区域的半径从80,000单位减少到10,000单位，光照面积小了64x倍。

![An overhead wireframe view of a multiplayer map](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6461921-b3e1-4411-855f-64302307dea8/35-lightmass-global-illum-jacinto-import-far.png) | ![A close-up of the playable area of the multiplayer map](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b86d090-49d5-4684-bfd4-eb30fe0e50cf/36-lightmass-global-illum-jacinto-import-near.png) |

 

 

要将一个全局光照重要体积添加到某个关卡中，你可以从 **放置Actor（Place Actors）** 菜单的 **体积（Volume）** 选项卡中将这个 **全局光照重要体积（Lightmass Importance Volume）** 对象拖动到关卡中，然后将其缩放到所需的大小。

![Adding a Lightmass Importance Volume to a level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70dfa662-c1ef-43f2-a003-ab37837ad626/37-lightmass-global-illum-add-lightmass-volume.png)

你还可以通过单击 **Actor** 下的 **细节（Details）** 面板中的 **转换Actor（Convert Actor）** 下拉框，将画笔转换为全局光照重要体积。

![Convert a Bush into a Lightmass Importance Volume](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70cc1e35-ab39-4168-8da7-2ee52b1472f1/38-lightmass-global-illum-convert-brush-actor.png)

单击该下拉框后，将出现一个菜单，你可以在其中选择要替换画笔的Actor类型。

![The drop down box of convert settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b85a8c32-8d31-4dc2-9dd7-55dcb7c95fa6/39-lightmass-global-illum-convert-dropdown.png)

如果你放置多个全局光照重要体积，那么大多数光照工作将通过包含所有这些体积的边界框来完成。但是，体积光照样本仅放置在较小的体块中。

### 世界场景设置

可在 **全局光照（Lightmass）** 部分下的 **世界场景设置（World Settings）** 面板中调整全局光照设置。

![Lightmass settings in the **World Settings** panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34323171-4c61-458b-b36f-2785986adf54/40-lightmass-global-illum-world-settings-lightmass.png)

可在编辑器右边的主 **工具栏（Toolbar）** 中点击 **设置（Settings）** 图标来访问 **世界场景设置（World Settings）**。

![Enabling the **World Settings** panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be9dd37a-1eb4-48d2-af4c-d557231cac70/41-lightmass-global-illum-world-settings.png)

属性

说明

**静态光源等级缩放（Static Lighting Level Scale）**

关卡的比例相对于引擎的比例，1虚幻单位 == 1cm。这可用于确定在光照中计算多少细节，较小的比例将大大增加构建时间。对于巨型关卡，可以使用2或4左右的较大比例来减少构建时间。

**间接光照反射次数（Num Indirect Lighting Bounces）**

允许光从光源反射到物体表面的次数。**0** 为仅直接光照，**1** 为一次反射，以此类推。反射 **1** 次计算时间最长，其次是反射 **2** 次。连续的反射几乎是不受约束的，但也不会增加太多的光，因为光在每次反射后都会衰减。

**间接光照质量（Indirect Lighting Quality）**

缩放全局光照GI解算器使用的样本计数。设置越高，会导致构建时间大量增加，但解算器穿帮（噪点、斑点）变少。请注意，这不会影响由于使用光照图（纹理接缝、压缩假影、纹索形状）而产生的穿帮。

**间接光照平滑度（Indirect Lighting Smoothness）**

数值越高，间接光照越平滑，可以隐藏解算器噪点，但也会丢失清晰的间接阴影和环境遮挡。在增大 **间接光照质量（Indirect Lighting Quality）** 以获取最高质量时，把这个值降低一些是有用的（0.66或0.75）。

**环境颜色（Environment Color）**

错过这个场景的光线会被染上的颜色。环境可以可视化为一个围绕着关卡的球体，向各个方向发射这种颜色的光。

**环境强度（Environment Intensity）**

缩放环境颜色以允许HDR环境颜色。

**漫射增强（Diffuse Boost）**

缩放场景中所有材质的漫反射效果。增加漫射增强（DiffuseBoost）是增加场景中间接光照强度的有效方法。在应用漫射增强（DiffuseBoost）之后，漫反射项的亮度被限制为1.0，以保持材质的能量守恒（这意味着光在每次反射时必须减少，而不是增加）。如果提高 **漫射增强（Diffuse Boost）** 未导致更明亮的间接光照，漫射项正被限制，光的 **间接光照缩放（Indirect Lighting Scale）** 应该用于增加间接光照。

**体积光照方法（Volume Lighting Method）**

用于在Lightmass重要体积（Lightmass Importance Volumeechnique）内部所有位置提供预计算光照的方法。

**使用环境遮挡（Use Ambient Occlusion）**

使静态环境遮挡可以通过全局光照计算并内置到你的光照图中。

**生成环境遮挡材质遮罩（Generate Ambient Occlusion Material Mask）**

允许生产纹理以存储有Lightmass计算的AO。这可以通过 **Precomputed AO Mask** 材质节点访问，对于混合环境资产上的材质层费用有用。如果你只想使用预计算的AO遮罩，请务必将 **直接光照遮挡比例（Direct Illumination Occlusion Fraction）** 和 **间接光照遮挡比例（Indirect Illumination Occlusion Fraction）** 设置为 **0** ！

**可视化材质漫反射（Visualize Material Diffuse）**

仅用导出到Lightmass的材质漫反射覆盖法线直接和间接光照。这在验证导出的材质漫反射与实际漫反射匹配时非常有用。

**可视化环境遮挡（Visualize Ambient Occlusion）**

仅用AO项覆盖法线直接和间接光照。这在调整环境遮挡设置时很有用，因为它隔离了遮挡项。

**压缩光照贴图（Compress Lightmaps）**

允许压缩光照贴图纹理。禁用光照贴图压缩可以减少瑕疵，但会使内存和硬盘占用量提升4倍。请谨慎禁用此项。

**体积光照贴图细节单元格大小（Volumetric Lightmap Detail Cell Size）**

一个体积光照贴图体素在最高密度（用于几何体四周）下的大小，使用世界空间单位。该设置对构建时间和内存占用影响巨大，需谨慎使用。将 **细节单元格大小（Detail Cell Size）** 减半将使内存提升8倍。

**体积光照贴图最大砖块内存量（Volumetric Lightmap Maximum Brick Memory Mb）**

M用于体积光照贴图砖块数据的最大内存量。搞密度的砖块将被丢弃，直至达到此限制，距离几何体最远的砖块将被首先丢弃。

**体积光照贴图球面谐波平滑（Volumetric Lightmap Spherical Harmonic Smoothing）**

控制在球面谐波去环过程中对体积光照贴图样本做多少平滑处理。每当高度定向的光照被存储在球面谐波中，就会产生环形瑕疵，表现为在对面产生不符合预期的黑色区域。平滑处理可以减少这类瑕疵。只有当出现环形瑕疵时，才会应用平滑。**0** = 不平滑处理，**1** = 强平滑处理（光照的方向性不强）。

**体积光样本位置缩放（Volume Light Sample Placement Scale）**

缩放体积光样本放置的距离。体积光样本由Lightmass计算，被用于可移动组件上的全局光照（GI）。使用较大的缩放值会减少样本的内存使用量，并缩短阶段光照缓存（Indirect Lighting Cache）的更新时间，但光照区域之间的过渡会不那么准确。

**直接光照遮挡率（Direct Illumination Occlusion Fraction）**

多少AO应用于直接光照。

**间接光照遮挡率（Indirect Illumination Occlusion Fraction）**

多少AO应用于间接光照。

**遮挡指数（Occlusion Exponent）**

指数越高，对比度越高。

**完全遮挡样本比例（Fully Occluded Samples Fraction）**

为了达到完全遮挡，必须遮挡的样本的比例。

**最大遮挡距离（Max Occlusion Distance）**

一个对象对另一个对象造成遮挡的最大距离。

**强制不使用预计算光照（Force No Precomputed Lighting）**

这将使Lightmass无法生成光源和阴影贴图，强制关卡仅使用动态光照。

**打包光源和阴影贴图纹理大小（Packed Light and Shadow Map Texture Size）**

打包的光源和阴影贴图的最大纹理大小。

### 光源设置

下面是可以在 **全局光照（Lightmass）** 部分的光源属性中进行调整的全局光照（Lightmass）设置。

![Lightmass settings for the Lights](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a75b5cef-be6c-4f97-9e5a-9a4a496ed171/42-lightmass-global-illum-light-settings.png)

属性

说明

**光源角度（Light Source Angle）**

对于 **仅定向光源（Directional Lights Only）**，确定光的自发光面相对于接收器的延伸角度，影响半影大小。

**间接光照饱和度（Indirect Lighting Saturation）**

0将导致间接光照完全不饱和，1将保持不变。

**阴影指数（Shadow Exponent）**

控制阴影半影的衰减，或区域从完全光照到完全阴影的变化速度。

**为固定光源使用区域阴影（Use Area Shadows for Stationary Light）**

是否为固定光源预计算阴影贴图使用区域阴影。区域阴影距离投射阴影的对象越远，其阴影就越柔和，但需要更高的光照贴图分辨率，才能达到与锐利阴影相同的质量。

### 基元组件设置

下面是可以在从 **放置Actor（Place Actors）** 菜单的 **几何体（Geometry）** 选项卡中添加的 **画笔（Brush）** 上进行调整的全局光照（Lightmass）设置。这些选项可以在 **画笔（Brush）** 的 **细节（Details）** 面板下找到。

![Lightmass settings for the Primitives](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da0ae6bf-45f7-4a22-80cb-9f37702abd9b/43-lightmass-global-illum-primitive-settings.png)

属性

说明

**使用双面光照（Use Two Sided Lighting）**

如果选中此项，该对象将被照亮，就好像它接受来自其多边形两侧的光照。

**仅间接阴影（Shadow Indirect Only）**

如果选中此项，则此对象只会对间接光照产生阴影。这对于草非常有用，因为渲染的几何体只是实际几何体的表示，并不一定会投射出精确形状的阴影。它对草也很有用，因为产生阴影的频率太高，无法存储在预计算的光照图中。

**为静态光照使用自发光（Use Emissive for Static Lighting）**

如果此项为true，则允许为静态光照使用自发光。

**使用顶点法线进行半球形采集（Use Vertex Normal for Hemisphere Gather）**

我们通常使用三角形法线进行半球形采集，以防止因美术师微调顶点法线而造成错误的自投影。但对于顶点法线被设置为匹配下方地形的植被，需要按顶点法线的法相进行采集。

**自发光增强（Emissive Boost）**

缩放应用到此对象的所有材质的自发光效果。

**漫反射增强（Diffuse Boost）**

缩放应用到此对象的所有材质的漫反射效果。

**完全遮挡样本比例（Fully Occluded Samples Fraction）**

为了实现对其他对象的完全遮挡，从此对象中采集的AO样本必须被遮挡的比例。这允许控制一个对象对其他对象造成多少遮挡。

### 基本材质设置

下面是可以在 **细节（Details）** 面板下的基本节点（Base Node）的材质（Material）中进行调整的全局光照（Lightmass）设置。

有关材质编辑器的更多信息，请参阅 [材质编辑器用户指南](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-user-guide)。

![Lightmass settings for the Materials](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/642d2734-08da-4bec-b18f-a53342e858fa/44-lightmass-global-illum-material-settings.png)

属性

说明

**漫射增强（Diffuse Boost）**

缩放此材质对静态光照的漫反射效果。

**导出分辨率缩放（Export Resolution Scale）**

缩放导出此材质属性时的分辨率。当需要细节时，这对于提高材质分辨率非常有用。

**像在遮罩状态一样下投射阴影（Cast Shadow as Masked）**

对于半透明材质，将该材质视为已被遮罩的材质，以用于阴影投射。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [global illumination](https://dev.epicgames.com/community/search?query=global%20illumination)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [静态和固定光源的特性](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E9%9D%99%E6%80%81%E5%92%8C%E5%9B%BA%E5%AE%9A%E5%85%89%E6%BA%90%E7%9A%84%E7%89%B9%E6%80%A7)
-   [漫反射](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E6%BC%AB%E5%8F%8D%E5%B0%84)
-   [角色光照](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E8%A7%92%E8%89%B2%E5%85%89%E7%85%A7)
-   [限制](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E9%99%90%E5%88%B6)
-   [环境遮挡](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E7%8E%AF%E5%A2%83%E9%81%AE%E6%8C%A1)
-   [环境遮挡设置](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E7%8E%AF%E5%A2%83%E9%81%AE%E6%8C%A1%E8%AE%BE%E7%BD%AE)
-   [限制](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E9%99%90%E5%88%B6-2)
-   [遮罩阴影](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E9%81%AE%E7%BD%A9%E9%98%B4%E5%BD%B1)
-   [仅适用于固定光源的特性](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E4%BB%85%E9%80%82%E7%94%A8%E4%BA%8E%E5%9B%BA%E5%AE%9A%E5%85%89%E6%BA%90%E7%9A%84%E7%89%B9%E6%80%A7)
-   [环境法线天空遮挡](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E7%8E%AF%E5%A2%83%E6%B3%95%E7%BA%BF%E5%A4%A9%E7%A9%BA%E9%81%AE%E6%8C%A1)
-   [距离场阴影贴图](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E8%B7%9D%E7%A6%BB%E5%9C%BA%E9%98%B4%E5%BD%B1%E8%B4%B4%E5%9B%BE)
-   [仅适用于静态光源的特性](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E4%BB%85%E9%80%82%E7%94%A8%E4%BA%8E%E9%9D%99%E6%80%81%E5%85%89%E6%BA%90%E7%9A%84%E7%89%B9%E6%80%A7)
-   [区域光源和阴影](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E5%8C%BA%E5%9F%9F%E5%85%89%E6%BA%90%E5%92%8C%E9%98%B4%E5%BD%B1)
-   [半透明阴影](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E5%8D%8A%E9%80%8F%E6%98%8E%E9%98%B4%E5%BD%B1)
-   [半透明阴影颜色](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E5%8D%8A%E9%80%8F%E6%98%8E%E9%98%B4%E5%BD%B1%E9%A2%9C%E8%89%B2)
-   [半透明阴影清晰度](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E5%8D%8A%E9%80%8F%E6%98%8E%E9%98%B4%E5%BD%B1%E6%B8%85%E6%99%B0%E5%BA%A6)
-   [限制](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E9%99%90%E5%88%B6-3)
-   [使用全局光照获取最佳质量](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7%E8%8E%B7%E5%8F%96%E6%9C%80%E4%BD%B3%E8%B4%A8%E9%87%8F)
-   [使灯光显眼](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E4%BD%BF%E7%81%AF%E5%85%89%E6%98%BE%E7%9C%BC)
-   [漫反射纹理](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E6%BC%AB%E5%8F%8D%E5%B0%84%E7%BA%B9%E7%90%86)
-   [光照设置](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E5%85%89%E7%85%A7%E8%AE%BE%E7%BD%AE)
-   [改善光照质量](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E6%94%B9%E5%96%84%E5%85%89%E7%85%A7%E8%B4%A8%E9%87%8F)
-   [光照图分辨率](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E5%85%89%E7%85%A7%E5%9B%BE%E5%88%86%E8%BE%A8%E7%8E%87)
-   [全局光照解算器质量](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7%E8%A7%A3%E7%AE%97%E5%99%A8%E8%B4%A8%E9%87%8F)
-   [获取最佳光照构建时间](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E8%8E%B7%E5%8F%96%E6%9C%80%E4%BD%B3%E5%85%89%E7%85%A7%E6%9E%84%E5%BB%BA%E6%97%B6%E9%97%B4)
-   [全局光照设置](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7%E8%AE%BE%E7%BD%AE)
-   [全局光照重要体积](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7%E9%87%8D%E8%A6%81%E4%BD%93%E7%A7%AF)
-   [世界场景设置](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E4%B8%96%E7%95%8C%E5%9C%BA%E6%99%AF%E8%AE%BE%E7%BD%AE)
-   [光源设置](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E5%85%89%E6%BA%90%E8%AE%BE%E7%BD%AE)
-   [基元组件设置](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E5%9F%BA%E5%85%83%E7%BB%84%E4%BB%B6%E8%AE%BE%E7%BD%AE)
-   [基本材质设置](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine#%E5%9F%BA%E6%9C%AC%E6%9D%90%E8%B4%A8%E8%AE%BE%E7%BD%AE)
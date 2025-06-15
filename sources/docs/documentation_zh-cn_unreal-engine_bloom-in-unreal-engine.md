# 虚幻引擎中的泛光 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/bloom-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:21:57.236Z

---

目录

![泛光](https://dev.epicgames.com/community/api/documentation/image/264ac662-9cfe-4e76-94f9-8fba1b46d2b7?resizing_type=fill&width=1920&height=335)

**泛光（Bloom）** 是一种现实世界中的光现象，通过它能够以较为适度的渲染性能成本极大地增加渲染图像的真实感。用肉眼观察黑暗背景下非常明亮的物体时会看到泛光效果。亮度更高的物体还会造成其他效果（条纹、镜头光斑），但这些效果不在经典的泛光效果范畴内。我们的显示器（电视、TFT屏等）通常不支持HDR（高动态范围），因此实际上无法渲染太亮的物体。于是我们模拟了当光线射到胶片（胶片次表面散射）或摄像机前（乳白色玻璃滤光片）时眼睛中出现的效果（视网膜的次表面散射）。这种效果不一定符合实际情况，但它可以帮助表现对象的相对亮度，或者给屏幕上显示的LDR（低动态范围）图像添加真实感。

![泛光效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd33a03f-d7a6-45ad-9c9b-d0a2b620ff4b/bloom.png)

泛光可以用一个高斯模糊来实现。为了提高质量，我们将多个不同半径的高斯模糊组合起来。为了获得更好的性能，我们在大大降低的分辨率下 进行很宽范围的模糊。在UE 3中，高斯模糊的分辨率为1/4、1/8和1/16。而现在我们可以使用多种模糊，分辨率从1/2（Blur1）到1/32（Blur5）。

通过改变模糊效果的组合方式，我们可以进行更多的控制，取得更高的质量。为了获得最佳的性能，应该使用高分辨率模糊（小值）来实现较窄的模糊，而主要使用低分辨率模糊 （大值）实现较宽的模糊。

属性

说明

**强度（Intensity）**

线性调节整个泛光效果的颜色。可用于：随着时间的推移淡入或淡出，变暗。详见[下方示例](/documentation/zh-cn/unreal-engine/bloom-in-unreal-engine#%E5%BC%BA%E5%BA%A6)

**阈值（Threshold）**

定义了单一颜色需要多少亮度单位才能产生泛光。除了阈值之外，还有一个线性部分（1个单位宽度），其中的颜色仅部分地影响泛光。如果希望场景中的所有颜色都参与泛光效果，需要使用数值-1。可用于：对某些不真实的HDR内容、梦序进行调整。详见[下方示例](/documentation/zh-cn/unreal-engine/bloom-in-unreal-engine#%E9%98%88%E5%80%BC)

**#1#2#3#4#5着色（1#2#3#4#5 Tint）**

修改每个泛光的亮度和颜色。如果你使用黑色，尽管不会使得渲染速度加快，但也是可以的。

**#1#2#3#4#5尺寸（1#2#3#4#5 Size）**

以屏幕宽度的百分比表示的尺寸。它受一些数字的限制。如果你需要较大的数字，请使用下一个更低分辨率（较大数字）的模糊。\[详见[下方示例](/documentation/zh-cn/unreal-engine/bloom-in-unreal-engine#%E5%A4%A7%E5%B0%8F)

#### 强度

 

 

 

![泛光强度 - 0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2c310d3-bbc3-481f-ab82-52194be351bc/bloom_intensity_0_small.png)

![Bloom Intensity - 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b17fdfd-0e19-45ef-bf29-6cbe40095d12/bloom_intensity_1_small.png)

![泛光强度 - 5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e46a575-b9e7-4771-a90f-e5feb7f18c95/bloom_intensity_5_small.png)

0.0

1.0

5.0

#### 阈值

![阈值 - 0.0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a67ca8a5-312d-4a1a-9a00-3d8af9550c5f/bloom_threshold_0_small.png)

![阈值 - 10.0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df36a98c-c428-49df-ae21-a6e1ac3d69df/bloom_threshold_10_small.png)

阈值 - 0.0

阈值 - 10.0

#### 大小

 

 

 

 

 

![泛光色调 1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a935d11-2901-48eb-ba57-a47867664696/bloom_tint_1_small.png)

![泛光色调 2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4642d483-97bd-43e2-a0da-3fbdccd5140a/bloom_tint_2_small.png)

![泛光色调 3](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c05dc1a3-d66e-4046-99b9-c89ffe2131c0/bloom_tint_3_small.png)

![泛光色调 4](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5233e50-0a50-4213-930b-3238604a7a87/bloom_tint_4_small.png)

![泛光色调 5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0f052dd-2e31-42cf-b8a0-8602605317fc/bloom_tint_5_small.png)

#1

#2

#3

#4

#5

## 泛光卷积

使用泛光 **卷积（Convolution）** 效果可以添加自定义泛光内核形状，其纹理能够展现逼真的泛光效果。 它利用内核图像对源图像进行卷积运算，以此来模拟摄像机或人眼中光线的散射和衍射。

![泛光卷积：Enabled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5a9cb17-f653-4155-8acd-389630bf2c1b/fftbloom_enabled.png)

![泛光卷积：Disabled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36fc9278-3fae-44fd-9f5f-f13bd2ca316c/fftbloom_disabled.png)

泛光卷积：Enabled

泛光卷积：Disabled

在这个例子中，泛光技术产生了连续反应，例如星爆效果、扩散发光区域。

内核表示光学设备对视野中间的单点源的响应。源中的每个像素按照内核图像的指示 将其部分亮度贡献给相邻像素。源像素越亮，生成的泛光越明显。究其根本而言，这种能量守恒散射可以转化为卷积运算公式， 并通过使用快速傅里叶变换（FFT）加速。

泛光卷积专门用于游戏内过场动画、离线过场动画，或在高端硬件中使用，但 ***标准* 泛光** 可用于大多数游戏应用程序。 就利弊而言，\_标准\_泛光在性能方面具有明显优势，但它并不稳妥（它会导致图像整体变得更亮）， 并且无法赶上泛光卷积的视觉复杂性。

要启用"泛光卷积（Bloom Convolution）"，请在"后期处理体积（Post Process Volume）"的 **镜头（Lens）** 部分中，使用 **方法（Method）** 旁边的选择框选择 **卷积（Convolution）**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5e92cdc-0a17-4b9f-ac6c-3dc2c6b7a40c/convolution-bloom-settings.png)

属性

说明

**卷积内核（Convolution Kernel）**

用于选择定义内核的纹理。

高级属性

 

**卷积缩放（Convolution Scale）**

表示以视口为单位的卷积内核图像的相对大小。默认值为1。主要用于减少泛光的大小。

**卷积中心（Convolution Center）**

在UV坐标中，默认为（1/2、1/2）。理想情况下，卷积内核图像精确地对较亮光源进行居中响应，但实际通常需要进行一些微调。如果出现偏移，将使泛光图像完全偏移。

**卷积增强（Convolution Boost）**

在应用卷积泛光过滤器之前，增强所选像素的强度。这包括最小值、最大值和乘数。按乘数使高于最小值的亮度增量放大。默认情况下，此增强处于禁用状态，应谨慎使用。

**卷积缓冲（Convolution Buffer）**

它是一个使用屏幕大小的一部分的隐式缓冲区，以确保泛光效果不会环绕图像。随着此值的增加，性能会变差。

### 内核图像最佳实践

基于图像的卷积之所以能产生额外的真实感，是因为它能够使用视觉上很有趣的非对称内核图像。当 创建内核并将其设置用于泛光卷积时，需要注意一些事项。

-   所有内核图像都应在GPU上，并以全分辨率提供。否则，如果使用低分辨率版本的内核， 质量将显著降低。为此，请在纹理编辑器中为内核图像设置以下属性：
    
     
    
     
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b23674f-a80c-4731-a80a-a8b4a9a91906/convolution-bloom-texture-properties.png)
    
    -   Mip生成设置（Mip Gen Settings）：**无Mip贴图**
    -   从不流送：**已启用**
    
-   泛光是一种整体的图像滤镜，因此使用泛光卷积可以使图像中最显眼的部分明显比其余部分更亮（可以很好地与.exr格式兼容）。 如果不使用泛光卷积，滤镜会在屏幕上生成强烈的模糊效果。
-   系统要求最显眼的点位于内核图像的中心，但可以使用 **卷积中心** 功能按钮进行调整。
-   如果泛光内核结构良好，它将填充大部分内核图像。如果在Photoshop中查看默认内核图像，你会看到从中心辐射的径向线延伸到 相当大的图像范围。
    
    ![未调整的内核图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0ba6e53-dcd4-480b-a0e1-f79b183f5062/kernelimage1.png)
    
    ![为演示调整过的内核图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c28fe61-fe42-408c-bfbc-980a34bb4d91/kernelimage2.png)
    
    未调整的内核图像
    
    为演示调整过的内核图像
    
-   如果要大幅改变卷积行为，应该使用泛光卷积高级属性来微调内核图像。

## 泛光尘土蒙版

**泛光尘土蒙版（Bloom Dirt Mask）** 效果使用纹理来增亮某些已定义屏幕区域的泛光。它可以用于创建战地摄像机图像、更令人印象深刻的HDR效果或摄像机 瑕疵图像。

![Dirt Mask Enabled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec120678-66ce-40ba-a16e-3403c070b6e1/dirtmaskenabled.png)

![Dirt Mask Disabled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2cad8be7-9988-464e-a41b-d5710efc7bd1/dirtmaskdisabled.png)

Dirt Mask Enabled

Dirt Mask Disabled

要启用泛光尘土蒙版，请在"后期处理体积（Post Process Volume）"的 **镜头（Lens）** 部分中启用 **尘土蒙版纹理（Dirt Mask Texture）** 选项。使用纹理（Texture）选择将纹理应用于尘土蒙版。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ca0eccd-5ce4-4d43-917f-bc8da8291cad/dirt-mask-properties.png)

属性

说明

**尘土蒙版纹理（Dirt Mask Texture）**

使用选取框指定要用于尘土蒙版的Texture2D。请注意，此属性不能与其他后处理体积混合。

**尘土蒙版强度（Dirt Mask Intensity）**

线性调整泛光尘土蒙版效果的颜色。此属性用于调整尘土蒙版的亮度。

**尘土蒙版着色颜色（Dirt Mask Tint Color）**

用于使尘土蒙版纹理更暗或着色。它可以用于调整尘土蒙版的亮度和颜色。

### 尘土蒙版图像最佳实践

在创建尘土蒙版纹理并将其设置用于泛光尘土蒙版时，需要注意一些事项。

-   纹理应全部在GPU上，并以全分辨率提供。为此，请在纹理编辑器中设置以下属性：
    
     
    
     
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/636134e2-77c8-4639-8fa9-bd1f3ebad023/dirt-mask-texture-properties.png)
    
    -   Mip生成设置（Mip Gen Settings）：**无Mip贴图**
    -   从不流送：**已启用**
    
-   此"后期处理"属性不能与关卡中的其他"后期处理体积"混合。
-   构建尘土蒙版纹理时，请注意以下几点：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78bb8498-cde5-43cf-9fe8-cb1f3fc2fd03/dirtmasktextureexample.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78bb8498-cde5-43cf-9fe8-cb1f3fc2fd03/dirtmasktextureexample.png)
    
    在载具游戏中使用尘土蒙版纹理的示例。
    
    -   建议使用的图片尺寸不等于2的整数幂。这避免了进行Mip创建和流式传输，而这些能够进行自动设置。但是，如果使用等于2的整数幂的纹理尺寸，你需要在"纹理编辑器"属性中对这些进行设置。
    -   你可以使用低分辨率纹理，因为低分辨率纹理通常足以呈现摄像机上的尘土或划痕，而它们反正都会失焦和模糊。如果出现压缩失真，请尝试使用更高分辨率的图像。
    -   你可以使用Photoshop（或类似图像编辑软件）中的镜头模糊（Lens Blur）功能来创建纹理。
    -   在纹理中使用色差（彩色条纹）可以帮助改善尘土蒙版的外观。

## 培训视频

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [post process](https://dev.epicgames.com/community/search?query=post%20process)
-   [bloom](https://dev.epicgames.com/community/search?query=bloom)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [强度](/documentation/zh-cn/unreal-engine/bloom-in-unreal-engine#%E5%BC%BA%E5%BA%A6)
-   [阈值](/documentation/zh-cn/unreal-engine/bloom-in-unreal-engine#%E9%98%88%E5%80%BC)
-   [大小](/documentation/zh-cn/unreal-engine/bloom-in-unreal-engine#%E5%A4%A7%E5%B0%8F)
-   [泛光卷积](/documentation/zh-cn/unreal-engine/bloom-in-unreal-engine#%E6%B3%9B%E5%85%89%E5%8D%B7%E7%A7%AF)
-   [内核图像最佳实践](/documentation/zh-cn/unreal-engine/bloom-in-unreal-engine#%E5%86%85%E6%A0%B8%E5%9B%BE%E5%83%8F%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)
-   [泛光尘土蒙版](/documentation/zh-cn/unreal-engine/bloom-in-unreal-engine#%E6%B3%9B%E5%85%89%E5%B0%98%E5%9C%9F%E8%92%99%E7%89%88)
-   [尘土蒙版图像最佳实践](/documentation/zh-cn/unreal-engine/bloom-in-unreal-engine#%E5%B0%98%E5%9C%9F%E8%92%99%E7%89%88%E5%9B%BE%E5%83%8F%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)
-   [培训视频](/documentation/zh-cn/unreal-engine/bloom-in-unreal-engine#%E5%9F%B9%E8%AE%AD%E8%A7%86%E9%A2%91)
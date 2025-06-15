# 虚幻引擎中的体积云材质 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/volumetric-cloud-material-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:14:24.072Z

---

目录

![体积云材质](https://dev.epicgames.com/community/api/documentation/image/a4d68410-67e8-44e9-9aa3-69dfa3a719f9?resizing_type=fill&width=1920&height=335)

[体积云](/documentation/zh-cn/unreal-engine/volumetric-cloud-component-in-unreal-engine)组件由体积材质驱动。这种体积云材质包含的参数已被命名了类别，这些参数能够简单、清晰、易懂地定义你想要的云类型和形状，并能让它们拥有风暴云的外观。

## 体积云材质的推荐工作流程

如需渲染带有体积云组件的云，需要用到的材质位于 `Engine/EngineSky/VolumetricClouds` 目录下的Engine Content文件夹中。材质名为 `m_SimpleVolumetricCloud_Inst` ，派生自 `m_SimpleVolumetricClouds` 。

一旦更改Engine Content文件夹中的内容，就会直接影响引用该材质的项目和组件。因此，强烈建议在项目的Content文件夹中创建该材质的材质实例。这样你就可以在不覆盖默认使用的原有材质的情况下，制作各种变体，以支持不同的云类型和形状。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4bc11a07-fd82-4292-a3d3-eeb91cf6969d/vcm-scene.png)

空白游戏模板中体积云着色器的默认外观和位置。

## 云材质实例的设置

打开体积云材质实例或用原始材质创建自己的体积云材质实例时，你会发现参数是按类别分组的，这些类别定义了不同云的外观、形状和效果。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cf9746b-92e9-4249-9448-f875bcbda707/vcm-materialinstanceparameters.png)

材质实例中的体积云参数组。

### 云布局

**云布局（Cloud Layouts）** 参数可分为纹理和云类型。纹理定义了云材质的形状、位置和遮罩，以及用于控制不同类型云的参数。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3db56c6f-5aff-4d86-b685-23d7f332c7a8/vcm-cloudlayout.gif)

体积云着色器布局参数。

云类型参数使用颜色通道来对应不同类型的云形态。云有四种类型，分别与云纹理的红色、绿色、蓝色和alpha通道相对应。这些云类型分别是：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d7a67dd-9e80-4a7d-b83c-9e756cc6d041/example-strato.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d7a67dd-9e80-4a7d-b83c-9e756cc6d041/example-strato.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7b7c512-94f3-4d28-ad7f-c8734bb2f521/example-alto.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7b7c512-94f3-4d28-ad7f-c8734bb2f521/example-alto.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63039f16-63a7-4500-8590-b1a20b595f60/example-cirro.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63039f16-63a7-4500-8590-b1a20b595f60/example-cirro.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e7df246-3212-4f8f-a546-f3ebea73f2e5/example-nimbo-half.gif)

层积云（Stratocumulus）

高层云（Altostratus）

卷层云（Cirrostratus）

雨层云（Nimbostratus）（风暴）

云类型分段的设置项如下：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c3e188c-100b-4a74-abf6-59a3c4aa7b6b/vcm-cloudlayout-parameters.png)

属性

说明

云类型纹理

 

**Layout\_CloudHeightProfile**

此纹理描述云层的形状随高度发生变化。此纹理的各通道分别描述不同云类型的剖面形状和相对高度，其中R（红色）为层积云，G（绿色）为高层云，B（蓝色）为卷层云，A（alpha）为雨层云。

**Layout\_CloudGlobalPattern**

此纹理定义各种云的世界位置，其中各通道分别描述一种云类型。通道代表的信息如下：R（红色）为层积云，G（绿色）为高层云，B（蓝色）为卷层云，A（alpha）为雨层云。

**Layout\_GlobalCloudMask**

此纹理用于在遮罩区域的全局图案纹理（Layout\_CloudGlobalPattern）中添加云或移除云。此纹理的各通道分别适用于不同的云类型，其中R（红色）为层积云，G（绿色）为高层云，B（蓝色）为卷层云，A（alpha）为雨层云。

云类型参数

 

**Layout\_CloudType**

这些参数分别控制不同云类型的可见性，其中R（红色）为层积云，G（绿色）为高层云，B（蓝色）为卷层云，A（alpha）为雨层云。

**Layout\_CloudGlobalScale**

这些参数控制布局区域纹理（Layout\_GlobalCloudMask和Layout\_CloudGlobalPattern）的重复距离。单位为公里（km）。

**Layout\_CloudPerTypeScale**

这些参数控制各种云类型的云全局图案（Layout\_CloudGlobalPattern）纹理的比例，其中R（红色）为层积云，G（绿色）为高层云，B（蓝色）为卷层云，A（alpha）为雨层云。

**Layout\_GlobalTexturePlacement**

此向量控制布局区域纹理（Layout\_GlobalCloudMask和Layout\_GlobalCloudPattern）的偏移和旋转（绕世界Z轴）。

**Layout\_WindControls**

该向量可控制各世界轴（x、y 或z）上的风力强度，各个值可以是正数，也可以是负数。可使用Aplpha通道统一增大或减小风的强度。

**Layout\_CloudTypeMask**

这些参数指定全局云遮罩（Layout\_GlobalCloudMask）纹理对各种云类型的影响强度，其中R（红色）表示层积云，G（绿色）表示高层云，B（蓝色）表示卷层云。MaskContribution（或alpha通道）将设置整体的效果强度。

**Layout\_GlobalCoverage**

这些参数决定将应用的总体云量，正值增加云量，负值减少云量。

### 云形状

**云形状（Cloud Shape）** 参数非常实用，可使用噪点体积纹理定义通用云的形状和颜色。本分段包括三个独立的噪声取样器，每个取样器各有其功能按钮。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b598ebce-88ec-491f-9b94-f3ac95c4fca4/vcm-cloudshape.gif)

体积云着色器形状参数。

云形状分段的设置项如下：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f828478d-3920-4bd3-8a14-e10460639e82/vcm-cloudshape-parameters.png)

属性

说明

**Noise\_Texture3D**

此纹理用于分解云朵的形状，以便创作云的通用形态。纹理的各颜色通道分别描述不同的噪点模式，而各噪点的影响程度由噪点功能按钮决定。此纹理不使用alpha通道。

**UseNoise3**

此开关让你能使用第三个Noise\_Texture3D样本，从而以额外的一层细节级别（或不同的拆分方法）来分解云形状。这将带来Noise3\_Coordinates和Noise3\_MultiChannel参数。

**Noise\_Bias**

这组参数中的每个参数都要从各自的NoiseTexture样本中减去，而NoiseTexture样本的值可以是正值，也可以是负值。这决定了噪点纹理如何在不增加噪点整体对比度的情况下扩张或侵蚀云布局。

**Noise\_Bias**

这组参数中的每个参数都要与对应的偏置噪点纹理样本结果相乘，而噪点纹理样本的值可以是正值，也可以是负值。这将增加或减少噪点的对比度，从而增加噪点对云布局影响的显性强度。

**Noise1\_Coordinates**

此参数既控制噪点纹理绿色通道的比例，也控制风速对噪点样本的影响强度。Noise1控制云的主要拆分噪点。

**Noise2\_Coordinates**

此参数既控制噪点纹理红色通道的比例，也控制风速对噪点样本的影响强度。Noise2控制Noise1的失真量和比例。

**Noise3\_Coordinates**

若启用UseNoise3，此参数既控制噪点纹理蓝色通道的比例，也控制风速对噪点样本的影响强度。Noise3作为额外的细节级别被添加到Noise1中。Noise3包含一个附加功能按钮（多通道(Multichannel)），可利用任意噪点纹理通道的组合对现有噪点进行调制。

**Noise2\_MultiChannel**

若启用UseNoise3，此参数控制各通道对整体云噪点的乘数影响，以及乘数影响的总大小（使用alpha通道）。即云噪点将乘以由下列公式决定的系数。MultiChannel A *(Noise R + MultiChannel R + Noise G* MultiChannel G + Noise B \* MultiChannel B)。

**Cloud\_AlbedoColor**

当云不被视为风暴云时的颜色。此参数的环境光遮蔽（alpha通道）决定了材质的光源遮蔽强度（以及因此显示的阴影密度）。

**Cloud\_GlobalDensity**

该参数控制整体的云材质密度，数值越高，云材质越不透明，数值越低，云材质越模糊。

### 风暴

**风暴（Storm）** 参数是必要设置，可使云系统在形态和颜色上有类似风暴的外观。要启用此分段的设置。你必须使用材质中的雨层云。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b967bf5e-a8ab-4a27-b95d-23d7668eb12a/vcm-storm.gif)

体积云着色器风暴参数。

风暴分段的设置项如下：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58da0263-0a12-4a52-9313-400b4e8ebb6e/vcm-storm-parameters.png)

属性

说明

**Storm\_Clouds**

此值控制从普通云到风暴云的各种混合强度，具有反射率、遮蔽、失真和可选的闪电效果等额外功能按钮。

**Storm\_LightningTexScale**

此值控制闪电纹理的相对比例。该纹理决定了材质中闪电闪光的位置。

**Storm\_LightningAnim**

这些参数控制材质中闪电的动画。光照闪烁能为闪光添加第二重动画效果。动态闪电动画可以确定闪电闪光的频率，数值越高，闪光发生的频率越高。动态光照（Dynamic Lighting）设置为0时，则使用手动闪电。这可以让你独立于时间来决定闪光的状态（这在渲染静态图像或手动更新序列中的时间时非常有用）。

**Storm\_LightningClouds**

这些参数控制闪电对云的效果。

-   **源强度（Source Power）** 控制雷击核心的强度。
-   **填充散射（Fill Scatter）** 控制闪电云中的散射距离。
-   **填充散射强度（Fill Scatter Intensity）** 控制光线在云中散射的亮度。
-   **第二Mip等级（Second Mip Level）** 控制第二个闪电纹理样本细节的锐度（数值越高越锐利）。

**Storm\_LightningColor**

这些参数控制闪雷电闪光的颜色（RGB值）和亮度（alpha值）。

**Storm\_LightningMask**

下列参数控制材质中闪电纹理的遮罩效果。

-   **闪电遮罩偏置（Lightning Mask Bias）** 决定在云布局纹理中，alpha通道闪电出现的位置。
-   **光照遮罩强度（Lighting Mask Strength）** 与偏置结果相乘，以补偿过于不透明或过于透明的雷电遮罩。
-   **云纹理权重（Cloud Texture Weight）** 决定噪点纹理结果对光照遮罩的影响，数值越大，纹理的影响越大。

**Storm\_AlbedoColor**

当云被视为风暴云时，设置云的颜色。alpha通道决定了阴影密度的乘法系数，数值越低，阴影越暗。

### 多重散射

**多重散射（Multiscatter）** 参数是一组参数，控制光源在云材质中的散射方式。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa3aadd7-4a08-4398-865b-8512c9faa10b/vcm-multiscatter.gif)

体积云多重散射参数。

多重散射分段的设置项如下：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52ca9fc8-19bf-4023-a6a1-023996aa12ea/vcm-multiscatter-parameters.png)

属性

说明

**Phase\_Controls**

云散射使用两个相位函数的组合来决定光在材质中的反弹情况。

-   **相位A（Phase A）** 和 **相位B（Phase B）** 决定光线在云中散射的方向性。正值向前散射，远离光源。负值向后散射，朝向光源。值的范围为-1到1。
-   **相位混合（Phase Blend）** 决定各相位的贡献强度，0表示完全是相位A，1表示完全是相位B。

**Multiscatter\_Controls**

这些参数控制云材质中多重散射的近似值。下列所有值的有效范围均为0到1。

-   **强度（Intensity）** 控制效果的整体强度。
-   **遮蔽（Occlusion）** 决定光线的衰减程度。
-   **偏心率（Eccentricity）** 决定散射的均匀程度。

## 附加提示

## 从虚幻引擎5.4及更旧版本转换到5.5及更新版本的升级说明

在虚幻引擎5.5中，默认分配给体积云组件并与各种插件（如太阳位置计算器等）一起使用的体积云材质已使用一种新材质进行了更新。由于该材质完全取代了原有材质，因此所有使用了该材质的模板项目和项目，在虚幻引擎5.5或更高版本的引擎中打开时都会自动更新。

预计在更新后部分项目的视觉效果可能会有所变化，或难以定位此资源。如果你的项目依赖原有材质，最简单的解决方案就是将原有材质迁移到当前版本的引擎中。

#### 迁移和重定向材质

按照[迁移资产](/documentation/zh-cn/unreal-engine/migrating-assets-in-unreal-engine)的步骤，即可将原有材质从虚幻引擎5.4迁移到更高版本的引擎。

至于诸如[太阳位置计算器](/documentation/zh-cn/unreal-engine/geographically-accurate-sun-positioning-tool-in-unreal-engine)之类的插件，只需将材质重定向到Engine Content文件夹中的位置即可。文件夹的位置如下：**Engine > Content > EngineSky > VolumetricClouds** 。

#### Engine Content中的原有体积云纹理

保存体积云材质的Engine Content文件夹同时也包含制作该材质所需的所有资产。你可以在此文件夹中找到与更新后的体积云材质兼容的新纹理和资产。你还可以找到原有的纹理和体积纹理，以便从虚幻引擎5.4迁移时将它们与原始材质一起重复使用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32077cfd-5d9e-477e-ac56-3c97f5d6cdac/vcm-enginecontent.png)

-   [environment](https://dev.epicgames.com/community/search?query=environment)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [clouds](https://dev.epicgames.com/community/search?query=clouds)
-   [material](https://dev.epicgames.com/community/search?query=material)
-   [volumetrics](https://dev.epicgames.com/community/search?query=volumetrics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [体积云材质的推荐工作流程](/documentation/zh-cn/unreal-engine/volumetric-cloud-material-in-unreal-engine#%E4%BD%93%E7%A7%AF%E4%BA%91%E6%9D%90%E8%B4%A8%E7%9A%84%E6%8E%A8%E8%8D%90%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
-   [云材质实例的设置](/documentation/zh-cn/unreal-engine/volumetric-cloud-material-in-unreal-engine#%E4%BA%91%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B%E7%9A%84%E8%AE%BE%E7%BD%AE)
-   [云布局](/documentation/zh-cn/unreal-engine/volumetric-cloud-material-in-unreal-engine#%E4%BA%91%E5%B8%83%E5%B1%80)
-   [云形状](/documentation/zh-cn/unreal-engine/volumetric-cloud-material-in-unreal-engine#%E4%BA%91%E5%BD%A2%E7%8A%B6)
-   [风暴](/documentation/zh-cn/unreal-engine/volumetric-cloud-material-in-unreal-engine#%E9%A3%8E%E6%9A%B4)
-   [多重散射](/documentation/zh-cn/unreal-engine/volumetric-cloud-material-in-unreal-engine#%E5%A4%9A%E9%87%8D%E6%95%A3%E5%B0%84)
-   [附加提示](/documentation/zh-cn/unreal-engine/volumetric-cloud-material-in-unreal-engine#%E9%99%84%E5%8A%A0%E6%8F%90%E7%A4%BA)
-   [从虚幻引擎5.4及更旧版本转换到5.5及更新版本的升级说明](/documentation/zh-cn/unreal-engine/volumetric-cloud-material-in-unreal-engine#%E4%BB%8E%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E54%E5%8F%8A%E6%9B%B4%E6%97%A7%E7%89%88%E6%9C%AC%E8%BD%AC%E6%8D%A2%E5%88%B055%E5%8F%8A%E6%9B%B4%E6%96%B0%E7%89%88%E6%9C%AC%E7%9A%84%E5%8D%87%E7%BA%A7%E8%AF%B4%E6%98%8E)
-   [迁移和重定向材质](/documentation/zh-cn/unreal-engine/volumetric-cloud-material-in-unreal-engine#%E8%BF%81%E7%A7%BB%E5%92%8C%E9%87%8D%E5%AE%9A%E5%90%91%E6%9D%90%E8%B4%A8)
-   [Engine Content中的原有体积云纹理](/documentation/zh-cn/unreal-engine/volumetric-cloud-material-in-unreal-engine#enginecontent%E4%B8%AD%E7%9A%84%E5%8E%9F%E6%9C%89%E4%BD%93%E7%A7%AF%E4%BA%91%E7%BA%B9%E7%90%86)
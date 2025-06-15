# 虚幻引擎中的基于物理的材 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:25:31.265Z

---

目录

![基于物理的材质](https://dev.epicgames.com/community/api/documentation/image/0ab3870b-e30b-45af-a6d2-2d54782830dc?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/217066da-7bb2-4915-bd4e-f57ee14e3bad/physmatheader.png)

本文档旨在提供在虚幻引擎的 **基于物理的材质** 系统中工作的指南和最佳实践。 它假定你对虚幻引擎中的材质创建过程有一定程度的了解。 如果你对虚幻引擎中的材质完全陌生，最好首先查看[基本材质概念](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts)页面。

此页面仅关注与基于物理的着色工作流程直接相关的材质属性。 有关主材质节点上所有输入的完整详细讲解，请参阅[材质输入](/documentation/zh-cn/unreal-engine/material-inputs-in-unreal-engine)页面。

## 基于物理是什么意思？

**基于物理的渲染（Physically based rendering）** (PBR)意味着表面接近光线在真实世界的表现方式，而不是我们直观以为的应有方式。 相较于完全依赖美术师直觉来设置参数的着色工作流程，遵守PBR原则的材质更准确，并且通常看起来更自然。

基于物理的材质在所有光照环境中都能有同等程度的良好表现。 此外，材质值的复杂程度和相互依赖程度可以降低，这样材质创建工作流程对于用户更加友好。 这些优点甚至适用于非真实感渲染，正如Pixar [\[4\]](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#smits)和Disney [\[3\]](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#burley)的电影中所展现的那样。

要对虚幻引擎的基于物理的材质和着色模型进行一番深入的技术考察，请参阅此SIGGRAPH演示[2](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#karis)。

## PBR材质属性

这些是与虚幻材质的基于物理的方面直接相关的材质属性。

-   [基础颜色](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#%E5%9F%BA%E7%A1%80%E9%A2%9C%E8%89%B2)
-   [粗糙度](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#%E7%B2%97%E7%B3%99%E5%BA%A6)
-   [金属感](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#%E9%87%91%E5%B1%9E%E6%84%9F)
-   [高光度](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#%E9%AB%98%E5%85%89%E5%BA%A6)

所有这些输入都设计为接受0到1之间的值。对于基础颜色，这意味着RGB值在0到1之间的颜色或纹理取样。

基于物理的值可以根据真实世界材质进行测量。下面给出了一些示例。

### 基础颜色

基础颜色定义了材质的总体颜色。 "基础颜色"输入接受 **Vector3 (RGB)** 值，其中每个通道自动限制在0到1之间。

![基础颜色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05117033-0c8e-4ac6-a817-e1691913749c/base-color.png)

如果取自真实世界，这是使用极化筛选器（极化会删除对齐时非金属的高光度）拍照时的颜色。

**为非金属测量的基础颜色值（仅限强度）：**

材质

基础颜色强度

木炭

0.02

新沥青

0.02

旧沥青

0.08

裸土

0.13

青草

0.21

沙漠沙

0.36

新混凝土

0.51

海洋冰

0.56

新雪

0.81

**为金属测量的基础颜色：**

材质

基础颜色(R, G, B)

铁

(0.560, 0.570, 0.580)

银

(0.972, 0.960, 0.915)

铝

(0.913, 0.921, 0.925)

金

(1.000, 0.766, 0.336)

铜

(0.955, 0.637, 0.538)

铬

(0.550, 0.556, 0.554)

镍

(0.660, 0.609, 0.526)

钛

(0.542, 0.497, 0.449)

钴

(0.662, 0.655, 0.634)

铂

(0.672, 0.637, 0.585)

### 粗糙度

"粗糙度"输入控制了材质表面有多粗糙或光滑。 在材质中，这表现为反射在材质上看起来有多尖锐或模糊。

粗糙材质会沿比光滑材质更多的方向反射光线，这样产生的是漫反射，有时很细微。光滑表面会更均匀地反射光线，这样产生的是清晰、集中的反射或镜面高光。

-   粗糙度为0（光滑）会产生镜面反射。
-   粗糙度为1（粗糙）会产生漫反射或无光泽的表面。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/abc55d88-1a8c-4b04-8ae7-4b9f57019d59/roughness_nonmetal.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5dba92ca-e7ef-4a76-b209-2e7113000957/roughness_metal.png)

0到1之间的粗糙度值。顶部为非金属，底部为金属。

                    ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ceb304b-d5af-43c4-aa85-29ead88511f7/roughness-slider-00.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc6701ae-7f2d-474b-91f8-0c09457f5e9e/roughness-slider-01.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a581f9b9-7dcf-4dd3-93cb-a08cd6dc8dc3/roughness-slider-02.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1807e6fd-2096-47fa-81ce-9955035bc0ee/roughness-slider-03.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13e478f8-0510-432f-8148-5c661d1baa88/roughness-slider-04.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2849f87-c885-4bf3-a234-7a012fc46668/roughness-slider-05.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a49afce-83a7-415c-b84d-9ad91f286532/roughness-slider-06.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c07dcfd9-70ce-4210-8598-c1b8fd03c6cf/roughness-slider-07.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e3ae29d-cf9d-4c65-b392-e0f8ba1ee860/roughness-slider-08.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a99b9fc2-6719-486d-b0ff-027b4071db14/roughness-slider-09.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0d33f8e-2bb0-4138-ba19-177940e131fb/roughness-slider-10.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59e3ab20-ea54-40c7-9664-614b41aa4d65/roughness-slider-11.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72b604c5-8b1e-4ec0-8309-0653e1b13531/roughness-slider-12.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa109c5f-5a05-45e7-af44-d34411cd3941/roughness-slider-13.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3a16a50-39f3-4eeb-9cec-f1f13a1817ca/roughness-slider-14.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06170c8a-5ed5-4b59-99df-001a035278dc/roughness-slider-15.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0f810fc-4528-4855-8a71-f0d9f8af98b6/roughness-slider-16.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/390df380-d666-4186-b47e-7d8905652cf1/roughness-slider-17.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9dc60d0-483d-4f49-9b50-4cd8ce75db31/roughness-slider-18.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c76d516-c7c5-43b7-9458-e53f89e5c160/roughness-slider-19.png) ![0到1之间的粗糙度值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39dbaeee-1dd2-483c-bfe5-b4472177f806/roughness-slider-20.png)

**0到1之间的粗糙度值。**

#### 映射粗糙度

粗糙度经常在使用灰阶纹理的对象上映射，以向表面添加物理变体。 粗糙度贴图上的深色区域在材质上看起来像镜子，而浅色区域则比较粗糙，看起来反射度较低。

下面的视频显示了粗糙度值从0增加到1的过程，其中perlin纹理控制着 **浅色（粗糙）** 和 **深色（光滑）** 值的分布。在值为0时，材质预览完全像镜子。在值为1时，材质完全无光泽。 中间值更有意思，因为表面的一些部分看起来光滑，一些部分看起来粗糙。

粗糙度贴图经常用于向塑料和金属等材质添加凌乱、污迹或其他瑕疵。

#### 粗糙度与高光度

请务必理解粗糙度与高光度之间的相互影响，尤其是当你在采用PBR工作流程之前在虚幻引擎中工作时。

**高光度（Specularity）** 指的是表面反射的[高光（specular light）](https://en.wikipedia.org/wiki/Specular_reflection)量。 此值是材质类型所固有的，通常默认值0.5是准确的。"高光度"输入 **不用于反射/高光度贴图** 或添加表面变体。 这些应该在"粗糙度"贴图中进行处理。

### 金属感

"金属感"输入接受0到1之间的值，并定义你的材质是作为金属还是非金属表现。

在大多数情况下，你应该将"金属感"视为虚幻引擎中的二进制属性。 对于纯表面（例如纯金属、纯岩石、纯塑料，等等），你应该将"金属感"设置为 **0或1**，而不是中间值。创建被腐蚀、有灰尘或生锈的金属之类的混合表面时，你可能发现你需要0到1之间的某个值。

-   **非金属** 的"金属感"值为0。这是默认值。
-   **金属** 的"金属感"值为1。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/504b8378-66a9-4ffd-bafd-784f72e529fc/metallic.png)

0到1的"金属感"值。

你可能起初不愿意将材质设置为完全的金属感。除非你有充足理由，否则尽量不要使用小数值。

此示例展示了当"粗糙度"相对较低的材质上"金属感"从0增加到1时，表面如何变化。

          ![0到1的金属感值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8eea5bdb-8f25-460c-ba69-106ecd0dd107/metallic-slider-00.png) ![0到1的金属感值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77c65df7-1953-475e-ab30-60230e8753f4/metallic-slider-01.png) ![0到1的金属感值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8572899-61d2-45f6-9ee3-8d4de53cd04a/metallic-slider-02.png) ![0到1的金属感值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/667c13a8-f028-4699-a69c-3ef4d9342e7b/metallic-slider-03.png) ![0到1的金属感值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69cb15fc-4bb3-43da-82d9-32a1504581a4/metallic-slider-04.png) ![0到1的金属感值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a0e679c-93da-458d-9973-023061108504/metallic-slider-05.png) ![0到1的金属感值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a88b3b21-72f6-4f65-8847-0e0eda04b6b1/metallic-slider-06.png) ![0到1的金属感值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95f3f43d-6b40-4a8a-9a61-0911c5d2b763/metallic-slider-07.png) ![0到1的金属感值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e6ac8ce-22ad-47a1-8f40-c20248563e76/metallic-slider-08.png) ![0到1的金属感值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2016154-f218-4b39-93c9-6a61c291f5ab/metallic-slider-09.png) ![0到1的金属感值。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd8caf69-88ca-4052-9ac0-473bda8d9e82/metallic-slider-10.png)

**0到1的金属感值。**

#### 映射金属感

相同材质中往往金属和非金属都有。 假设一个金属面板，其中油漆涂层覆盖了部分或全部金属。

油漆是非金属，因此在油漆覆盖的所有区域中，"金属感"值应该为0。 在面板中看得到金属的所有地方，"金属感"值应该为1。

这应该使用传递到"金属感"输入的黑白遮罩进行处理。 油漆没有与金属混合，而是位于其上方。 你的"金属感"贴图不应包含中间灰阶值，只能包含黑色和白色。 你还可以使用材质层实现类似结果。

### 高光度

"高光度"输入接受0到1之间的值，并控制表面反射多少高光。

-   "高光度"值为0表示完全不反射。
-   "高光度"值为1表示完全反射。

虚幻引擎使用 **默认高光度0.5** ，这表示大约4%的高光度反射。 对于绝大多数材质，此值是准确的。

对于漫反射程度很高的材质，你可能倾向于将此值设置为0。别这样做！所有材质多有高光度，请参阅此帖子以了解示例[\[5\]](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#hable)。制作漫反射程度很高的材质的正确方法是使用很高的"粗糙度"值。

### 空腔贴图

修改"高光度"的一个原因是添加微型遮蔽区或小尺度阴影，比如从法线贴图中表示的裂口添加。这些有时被称为空腔。 小尺度的几何体（尤其是仅存在于高精度多边形中并烘焙到法线贴图中的细节）不会被渲染器的实时阴影选取。

要捕获此阴影，你可以生成空腔贴图，它通常是追踪距离非常短的AO贴图。这会乘以输出之前的最终"基础颜色"，并乘以0.5（"高光度"默认值）作为"高光度"输出。

确切地说，就是：基础颜色=空腔*旧基础颜色，高光度=空腔*0.5。

在高级用途中，这一步可以用于控制折射率(IOR)。我们发现这对于99%的材质都不是必需的。下面是基于测量的IOR的"高光度"值。

**测量的"高光度"值：**

材质

高光度

玻璃

0.5

塑料

0.5

石英

0.570

冰

0.224

水

0.255

奶

0.277

皮肤

0.35

          ![0到1的高光度值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f4ebffa-3845-4eca-a2bc-bc4690b6c252/spec-slider-00.png) ![0到1的高光度值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc9010c9-8529-4978-ae36-6787902e478b/spec-slider-01.png) ![0到1的高光度值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28a23c03-9404-4a72-9f3c-0173fa57afca/spec-slider-02.png) ![0到1的高光度值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef807a4c-d200-4d8b-830b-14fc171aeb21/spec-slider-03.png) ![0到1的高光度值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/527128d4-79da-480c-9e6b-cbd439686995/spec-slider-04.png) ![0到1的高光度值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eba31359-0893-406d-81b9-f1f483014f14/spec-slider-05.png) ![0到1的高光度值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5bcb4407-ae2a-49a2-86e2-6214c261481f/spec-slider-06.png) ![0到1的高光度值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4ee7faa-402d-44b9-8f03-7e54d538a969/spec-slider-07.png) ![0到1的高光度值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a931889-7cca-4470-af1b-7717f6d18aa5/spec-slider-08.png) ![0到1的高光度值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0eb6fb7f-2c10-4f2d-827d-5f14cb4e0b34/spec-slider-09.png) ![0到1的高光度值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b260f783-b702-4e0c-afe3-96cade3d800a/spec-slider-10.png)

**0到1的高光度值**![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f546ff4-2595-4170-9f2a-486976f6febe/measured_materials.png)

测量的材质示例。顶部：木炭、新混凝土、旧沥青。底部：铜、铁、金、铝、银、镍、钛

## 参考

**1**. Lagarde，[馈送基于物理的着色模型（Feeding a physically based shading model）](http://seblagarde.wordpress.com/2011/08/17/feeding-a-physical-based-lighting-mode/)

**2**. Karis，[虚幻引擎4中的真实着色（Real Shading in Unreal Engine 4）](https://de45xmedrsdbp.cloudfront.net/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf)

**3**. Burley，[Disney的基于物理的着色（Physically-Based Shading at Disney）](http://blog.selfshadow.com/publications/s2012-shading-course/burley/s2012_pbs_disney_brdf_slides_v2.pdf)

**4**. Smits，[WALL-E和Up的反射模型设计（Reflection Model Design for WALL-E and Up）](http://blog.selfshadow.com/publications/s2012-shading-course/smits/s2012_pbs_pixar_model_slides_v2.pdf)

**5**. Hable，[一切都闪闪发光（Everything is Shiny）](http://filmicworlds.com/blog/everything-is-shiny/)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)
-   [pbr](https://dev.epicgames.com/community/search?query=pbr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [基于物理是什么意思？](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#%E5%9F%BA%E4%BA%8E%E7%89%A9%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88%E6%84%8F%E6%80%9D%EF%BC%9F)
-   [PBR材质属性](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#pbr%E6%9D%90%E8%B4%A8%E5%B1%9E%E6%80%A7)
-   [基础颜色](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#%E5%9F%BA%E7%A1%80%E9%A2%9C%E8%89%B2)
-   [粗糙度](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#%E7%B2%97%E7%B3%99%E5%BA%A6)
-   [映射粗糙度](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#%E6%98%A0%E5%B0%84%E7%B2%97%E7%B3%99%E5%BA%A6)
-   [粗糙度与高光度](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#%E7%B2%97%E7%B3%99%E5%BA%A6%E4%B8%8E%E9%AB%98%E5%85%89%E5%BA%A6)
-   [金属感](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#%E9%87%91%E5%B1%9E%E6%84%9F)
-   [映射金属感](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#%E6%98%A0%E5%B0%84%E9%87%91%E5%B1%9E%E6%84%9F)
-   [高光度](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#%E9%AB%98%E5%85%89%E5%BA%A6)
-   [空腔贴图](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#%E7%A9%BA%E8%85%94%E8%B4%B4%E5%9B%BE)
-   [参考](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#%E5%8F%82%E8%80%83)
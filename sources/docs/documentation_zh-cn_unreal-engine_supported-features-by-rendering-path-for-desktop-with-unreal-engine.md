# 虚幻引擎桌面平台渲染路径支持的功能 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine
> 
> 生成时间: 2025-06-14T19:29:47.260Z

---

目录

![渲染路径支持的功能：桌面和桌面XR](https://dev.epicgames.com/community/api/documentation/image/605551a7-92b8-4192-8e21-8010ebb6a209?resizing_type=fill&width=1920&height=335)

本文列举了虚幻引擎5的各项功能及其支持的渲染路径种类。

本文旨在提供大致指示，介绍虚幻引擎5中不同渲染路径支持的功能。即使表格中的某些功能显示为支持某个渲染路径，但实际上，它有可能并不完全支持。建议尽可能参考各功能的相关文档。这些功能包括Lumen、Nanite、虚拟阴影贴图和光线追踪等。

## UE5常见渲染功能快速参考

下表用于快速参考虚幻引擎5最新的一些功能以及它们支持的渲染路径。

部分虚幻引擎5功能需要带Shader Model 6功能的DirectX才能运作，如[Nanite](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)和[虚拟阴影贴图](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine)。更多特定需求，请参见[硬件和软件规格](/documentation/404)一文。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**Lumen全局光照：软件光线追踪**

是

是

否

是

否

**Lumen全局光照：硬件光线追踪**

是

否

否

是

否

**Nanite虚拟化几何体**

是

否

否

是

否

**虚拟阴影贴图**

是

否

否

是

否

**时序超级分辨率**

是

是

否

是

是

**路径追踪**

是

否

否

否

否

## 后期处理

后期处理可以让美术师通过放置的体积控制场景的整体观感和氛围。每个体积包含光照和渲染功能，可以影响场景的外观，比如全局光照和反射的类型、颜色分级以及其它的光照效果。

参考[后期处理效果](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)文档来更好地了解关于后期处理选项的信息。

### 镜头

**镜头（Lens）** 分类下包含的属性可以影响由摄像机镜头创建的场景的外观。比如镜头光晕、景深、曝光以及其它类似的效果。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**移动景深属性**

否

否

否

否

否

**移动景深：高质量高斯**

否

否

否

否

否

**辉光：标准**

是

是

是

是

是

**辉光：卷积**

是

是

是

是

是

**曝光**

是

是

是

是

是

**色差属性**

是

是

是

是

是

**污渍蒙版属性**

是

是

是

是

是

**摄像机属性**

是

是

是

是

是

**本地曝光**

是

是

是

是

是

**镜头光晕属性**

是

是

是

是

是

**图像效果：晕影**

是

是

是

是

是

**景深属性**

是

是

是

是

是

### 颜色分级

**颜色分级（Color Grading）** 类别下能够将颜色样式和颜色调色板应用到渲染的场景顶部而不直接对场景做出变更。可以根据艺术美感来调整色温、饱和度和对比度等。颜色分级还可以用于调整高光、中和色甚至是阴影，而不会对场景内容造成影响。

参考[颜色分级](/documentation/zh-cn/unreal-engine/color-grading-and-the-filmic-tonemapper-in-unreal-engine)来了解更多。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**颜色分级属性**

是

是

是

是

是

### 胶片

**胶片（Film）** 类别下可以将场景颜色映射来匹配专业色彩编译系统（ACES）的标准。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**胶片属性**

是

是

是

是

是

### 后期处理全局光照

**全局光照（Global Illumination）** 类别包含的属性主要用于选择用于后期处理体积的全局光照的类型。

要了解全局光照功能的支持信息，请参考该页面的[常见引擎功能](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#generalenginefeatures)部分。

### 后期处理反射

**反射（Reflections）** 类别包含的属性主要用于选择用于后期处理体积的反射类型。

要了解反射功能的支持信息，请参考该页面的[常见引擎功能](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#generalenginefeatures)。

### 渲染功能

**渲染功能（Rendering Features）** 类别包含的功能用于后期处理体积，比如控制动态模糊，屏幕空间反射以及环境光遮蔽。它还为诸如[硬件光线追踪和路径追踪](/documentation/zh-cn/unreal-engine/ray-tracing-and-path-tracing-features-in-unreal-engine)这样的功能提供了可配置的设置。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**后期处理材质属性**

是

是

是

是

是

**环境立方体贴图属性**

是

是

否

是

否

**环境遮蔽属性**

是

是

是

是

是

**全局光照属性**

是

是

是

是

是

**反射属性**

是

是

是

是

是

**动态模糊属性**

是

是

是

\-

\-

**半透明类型：栅格**

是

是

是

是

是

**半透明类型：光线追踪**

是

否

否

否

否

**光线追踪半透明属性**

是

否

否

否

否

**路径追踪属性**

是

否

否

否

否

对于有额外要求的光线追踪和路径追踪功能，请参考[硬件光线追踪和路径追踪](/documentation/zh-cn/unreal-engine/ray-tracing-and-path-tracing-features-in-unreal-engine)来查看完整的细节。

### 胶片噪点

**胶片噪点（Film Grain）** 类别包含的属性可以给场景添加类似胶片的外观。是否使用胶片颗粒完全取决于个人选择，可以给你的项目添加一种真实的影视效果。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**胶片属性**

是

是

是

是

是

## 常见引擎功能

以下列举了虚幻引擎各种渲染路径中支持的功能。

### 抗锯齿

**抗锯齿（Anti-Aliasing）** 技术用于平顺或者移除渲染的图像中锯齿状的边缘。有多种抗锯齿技术可以选择，其中一些更适用于特定的硬件或者平台。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**时序超级分辨率**

是

是

是

是

是

**快速近似抗锯齿 (FXAA)**

是

否

是

否

是

**多重采样抗锯齿 (MSAA)**

否

否

是

否

否

**时间性抗锯齿 (TAA)**

是

是

是

是

是

### 系统和工具功能

以下虚幻引擎5的常见功能能够与引擎的其它部分共同运作，比如材质和光照。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**Nanite虚拟化几何体**

是

否

否

否

否

**硬件光线追踪功能**

是

否

否

是

否

**路径追踪**

是

否

否

否

否

**纹理流送**

是

是

是

是

是

**虚拟纹理: 流送**

是

是

是

是

是

**虚拟纹理: 运行时**

是

是

是

是

是

**网格体贴花**

是

是

是

是

是

**网格体距离字段**

是

是

是

是

是

**水系统**

是

是

是

是

是

**毛发和毛皮Groom**

是

是

是

是

是

### 细节层级

**细节层级（Level of Detail）** （or LOD）是一种优化，通过降低特定距离上物体的几何细节度来改善性能。这还包括基于材质的过渡，能够减少切换不同细节层级时产生的视觉上的突然变化。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**细节层级**

是

是

是

是

是

**分级细节层级**

是

是

是

是

是

**抖动LOD过渡**

是

是

是

是

是

### 可见度和遮蔽剔除

不同的 **可见度和遮蔽剔除（Visibility and Occlusion Culling）** 方法用于减少场景中渲染的物体数量，以此来改善性能。根据不同的方法，剔除会以不同的形式执行：尺寸、距离以及从玩家摄像机的可见度。一些方法仅适用于或者更适合特定的平台。一些剔除方法可以与其它方法搭配使用。

参见[可见度和遮蔽剔除](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine)来了解详细信息。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**剔除距离体积**

是

是

是

是

是

**提前计算可见度体积**

是

是

是

是

是

**硬件（GPU）遮蔽索引**

是

是

是

是

是

## 光照功能

以下光照功能在虚幻引擎的渲染路径中支持。

要更好地了解虚幻引擎的光照功能，请参见[光照环境](/documentation/zh-cn/unreal-engine/lighting-the-environment-in-unreal-engine).

### 环境光照和效果

大型世界的光照要求各个功能之间无缝协作来达到统一的体验。这些包括创建大气、云、雾并且完全支持来自太阳和月亮的光照。

参考[环境光照](/documentation/zh-cn/unreal-engine/environmental-light-with-fog-clouds-sky-and-atmosphere-in-unreal-engine)来了解更多。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**天空大气**

是

是

是

是

是

**体积云**

是

是

是

是

是

**指数型高度雾**

是

是

是

是

是

**体积雾**

是

是

是

是

是

### 全局光照

**全局光照** 模拟光照与几何体和材质表面的交互，以此来向场景中添加看起来更加准确的光照。虚幻引擎提供提前计算和动态全局光照两种方式。参考[全局光照](/documentation/zh-cn/unreal-engine/global-illumination-in-unreal-engine)来了解更多。

参考[全局光照](/documentation/zh-cn/unreal-engine/global-illumination-in-unreal-engine)来了解更多。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**Lumen全局光照: 软件光线追踪**

是

是

否

否

否

**Lumen全局光照: 硬件光线追踪**

是

否

否

否

否

**提前计算全局光照Lightmass**

是

是

是

是

是

**屏幕空间全局光照**

是

是

否

是

否

**光线追踪全局光照（已弃用）**

是

否

否

是

否

一些硬件光线追踪的功能已经弃用并且可能在之后的引擎版本中移除。Lumen全局光照将会替代这些功能。

### 阴影

**阴影（Shadows）** 能够让世界中的物体看起来立于地面上，并且提供深度和空间感。虚幻引擎提供了不同的方法来在你的项目中为物体添加阴影，其中一些阴影方法更适用于特定的平台和硬件。

参考[阴影](/documentation/zh-cn/unreal-engine/shadowing-in-unreal-engine)来了解更多。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**独立硬件光线追踪阴影**

是

否

否

是

否

**虚拟阴影贴图**

是

否

否

是

否

**模块化阴影**

是

是

是

是

是

**胶囊体阴影**

是

是

否

是

否

**接触阴影**

是

是

否

是

否

**提前计算半透明阴影**

是

是

是

是

是

**动态半透明阴影**

是

是

否

是

否

### 反射

**反射（Reflections）** 是另一种让世界中的物体看起来更加真实的方式。反射由物体表面的光滑粗糙程度决定。材质越光滑，就越能够反射照射在其上的光线。

虚幻引擎为材质提供不同方式的反射，包括提前计算静态反射和全动态反射。并不是所有的反射系统都互相排斥，有些可以与其它反射共同使用。

参考[反射环境](/documentation/zh-cn/unreal-engine/reflections-environment-in-unreal-engine)来了解更多。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**反射捕获（盒型/球型）**

是

是

是

是

是

**场景捕获立方体贴图**

是

是

是

是

是

**场景捕获2D**

是

是

是

是

是

**平面反射**

是

是

是

是

是

**屏幕空间反射**

是

是

否

是

否

**独立硬件光线追踪反射（已弃用）**

是

否

否

否

否

**高精度法线**

是

是

是

是

是

**反射捕获分辨率**

是

是

是

是

是

**HDR立方体贴图**

是

是

是

是

是

一些硬件光线追踪的功能已经弃用并且可能在之后的引擎版本中移除。Lumen全局光照将会替代这些功能。

## 光照类型和移动性功能

考虑在项目中如何使用光照时，需要考虑所需要的不同光照类型，以及它们需要全动态、半动态还是静态。决定使用的光照类型时，同样还需要考虑光线是否需要动态变化，这将会对你的项目外观、光线物体之间的互动以及性能产生影响。

参考[光照类型及其移动性](/documentation/zh-cn/unreal-engine/light-types-and-their-mobility-in-unreal-engine)来更好地了解使用不同类型光照和它们移动性的影响。

### 静态光照

这一小节包含使用提前计算 **静态** 光照移动性时所支持的光源类型和它们的常用功能。

要了解更多细节，请参见[静态光照移动性](/documentation/zh-cn/unreal-engine/static-light-mobility-in-unreal-engine)。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

静态移动性：光源类型

 

 

 

 

 

**定向光源**

是

是

是

是

是

**天空光源**

是

是

是

是

是

**点光源**

是

是

是

是

是

**聚光源**

是

是

是

是

是

**矩形光源**

是

是

是

是

是

静态移动性：常见光照功能

 

 

 

 

 

**间接光照强度**

是

是

是

是

是

**光照通道**

是

是

是

是

是

**光照输送**

是

是

否

是

否

**光照函数**

是

是

否

是

否

静态移动性：定向光源功能

 

 

 

 

 

**源角度**

是

是

是

是

是

**光源轴**

是

是

否

是

否

**模块化阴影**

否

否

否

否

否

静态移动性：天空光源功能

 

 

 

 

 

**SLS捕获场景**

是

是

是

是

是

**SLS指定立方体贴图**

是

是

是

是

是

**指定立方体贴图分辨率**

是

是

是

是

是

静态移动性：点、聚、矩形光源功能

 

 

 

 

 

**IES纹理**

是

是

是

是

是

**矩形光源：源纹理**

是

是

是

是

是

### 固定光照

这一小节包含使用 **固定（Stationary）** 光照移动性时所支持的光源类型和它们的常用功能。

要了解更多细节，请参见[固定光照移动性](/documentation/zh-cn/unreal-engine/stationary-light-mobility-in-unreal-engine)。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

固定移动性：光照类型s

 

 

 

 

 

**定向光源**

是

是

是

是

是

**天空光源**

是

是

是

是

是

**点光源**

是

是

是

是

是

**聚光源**

是

是

是

是

是

**矩形光源**

是

是

是

是

是

固定移动性： 常见 光照功能

 

 

 

 

 

**间接光照强度**

是

是

是

是

是

**光照通道**

是

是

是

是

是

**光照输送**

是

是

否

是

否

**光照函数**

是

是

否

是

否

固定移动性： 定向光源功能

 

 

 

 

 

**源角度**

是

是

是

是

是

**级联阴影贴图**

是

是

是

是

是

**光源轴**

是

是

否

是

否

**模块化阴影**

否

否

否

否

否

固定移动性： 天空光源功能

 

 

 

 

 

**SLS捕获场景**

是

是

是

是

是

**SLS 指定立方体贴图**

是

是

是

是

是

**指定立方体贴图分辨率**

是

是

是

是

是

固定移动性： Point, Spot, 矩形光源功能

 

 

 

 

 

**IES纹理**

是

是

是

是

是

**矩形光源: 源纹理**

是

是

是

是

是

### 可移动光照

这一小节包含使用 **可移动（Movable）** 光照移动性时所支持的光源类型和它们的常用功能。

要了解更多细节，请参见[可移动光照移动性](/documentation/zh-cn/unreal-engine/movable-light-mobility-in-unreal-engine)。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

可移动移动性：光照类型s

 

 

 

 

 

**定向光源**

是

是

是

是

是

**天空光源**

是

是

是

是

是

**点光源**

是

是

是

是

是

**聚光源**

是

是

是

是

是

**矩形光源**

是

是

是

是

是

可移动移动性： 常见 光照功能

 

 

 

 

 

**间接光照强度**

是

是

是

是

是

**光照通道**

是

是

是

是

是

**光照输送**

是

是

否

是

否

**光照函数**

是

是

否

是

否

可移动移动性： 定向光源功能

 

 

 

 

 

**源角度**

是

是

否

是

否

**级联阴影贴图**

是

是

是

是

是

**光源轴**

是

是

否

是

否

**模块化阴影**

否

否

否

否

否

**距离场阴影**

是

是

是

是

是

可移动移动性： 天空光源功能

 

 

 

 

 

**SLS捕获场景**

是

是

是

是

是

**SLS指定立方体贴图**

是

是

是

是

是

**指定立方体贴图分辨率**

是

是

是

是

是

可移动移动性： Point, Spot, 矩形光源功能

 

 

 

 

 

**IES纹理**

是

是

是

是

是

**矩形光源：源纹理**

是

是

否

是

否

## 材质和纹理

材质和纹理应用到表面上来控制表面的视觉效果以及其在通常情况下如何与光照互动。在项目中可以使用各种不同的材质和纹理类型。

参考[材质](/documentation/zh-cn/unreal-engine/unreal-engine-materials)和[纹理](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine)来了解更多。

### 材质域

**材质域（Material Domain）** 用于定义在项目中使用的材质。

参见[材质属性](/documentation/zh-cn/unreal-engine/unreal-engine-material-properties)来了解更多。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**表面**

是

是

是

是

是

**延迟贴花**

是

是

是

是

是

**光照函数**

是

是

否

是

否

**体积**

是

是

是

是

是

**后期处理**

是

是

是

是

是

**用户界面**

是

是

是

是

是

### 材质混合模式

**混合模式（Blend Mode）** 可以描述当前材质的输出如何混合至背景中已经绘制的内容。这样能够控制引擎在渲染时如何将该材质与帧缓冲（目标颜色）中的内容合并。

参见[材质属性](/documentation/zh-cn/unreal-engine/unreal-engine-material-properties)来了解更多。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**不透明**

是

是

是

是

是

**蒙版**

是

是

是

是

是

**半透明**

是

是

是

是

是

**叠加**

是

是

是

是

是

**调节**

是

是

是

是

是

**Alpha复合（提前乘数Alpha）**

是

是

是

是

是

**Alpha保持**

是

是

是

是

是

### 材质着色模型

**着色模型（Shading Model）** 用于决定材质输入如何合成来形成最终颜色。

参考[着色模型](/documentation/zh-cn/unreal-engine/shading-models-in-unreal-engine)来了解更多。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**无光照**

是

是

是

是

是

**默认光照**

是

是

是

是

是

**次表面**

是

是

是

是

是

**预集成皮肤**

是

是

是

是

是

**透明图层**

是

是

是

是

是

**次表面轮廓**

是

是

是

是

是

**双面植被**

是

是

是

是

是

**毛发**

是

是

是

是

是

**布料**

是

是

是

是

是

**眼睛**

是

是

是

是

是

**单层水**

是

是

是

是

是

**薄半透明**

是

是

是

是

是

**从材质表达式**

是

是

是

是

是

### 材质输入

**材质输入（Material Inputs）** 是数据通过主材质节点送进输入，以此来定义表面属性和它们如何与光照互动。可用的输入类型取决于材质设置域、混合模式以及着色模型。

参考[材质输入](/documentation/zh-cn/unreal-engine/material-inputs-in-unreal-engine)来了解更多。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**底色**

是

是

是

是

是

**金属感**

是

是

是

是

是

**高光度**

是

是

是

是

是

**粗糙度**

是

是

是

是

是

**各向异性**

是

是

是

是

是

**自发光颜色**

是

是

是

是

是

**不透明度**

是

是

是

是

是

**法线**

是

是

是

是

是

**切线**

是

是

是

是

是

**世界位置偏移**

是

是

是

是

是

**布料**

是

是

是

是

是

**模糊颜色**

是

是

是

是

是

**虹膜蒙版**

是

是

是

是

是

**虹膜距离**

是

是

是

是

是

**次表面颜色**

是

是

是

是

是

**自定义数据0 – 7**

是

是

是

是

是

**环境遮蔽**

是

是

是

是

是

**折射**

是

是

是

是

是

**像素深度偏移**

是

是

是

是

是

**着色模型**

是

是

是

是

是

**透明图层**

是

是

是

是

是

**透明图层粗糙度**

是

是

是

是

是

**背光（用于毛发）**

是

是

是

是

是

### 纹理

**纹理** 是一种图片资产，主要用于[材质](/documentation/zh-cn/unreal-engine/unreal-engine-materials)，但是也可以在一些情况下直接应用到组件上。对于材质，纹理映射到材质应用的表面上。纹理可以在材质中用于各种计算，比如底色、法线贴图和蒙版。

参考[纹理](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine)来更好地了解如何使用。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**默认（DXT 1/5, DX11上BC ⅓）**

是

是

是

是

是

**法线贴图（DXT 5, DX11上BC5）**

是

是

是

是

是

**遮罩（无sRGB）**

是

是

是

是

是

**灰度 （R8, RGB8, sRGB）**

是

是

是

是

是

**置换贴图（8/16位）**

是

是

是

是

是

**矢量置换贴图（RGBA8）**

是

是

是

是

是

**HDR（RGB, 无sRGB）**

是

是

是

是

是

**用户界面2D（RGBA）**

是

是

是

是

是

**Alpha（无sRGB, DX11上BC4）**

是

是

是

是

是

**距离字段字体（R8）**

是

是

是

是

是

**HDR压缩（RGB, BC6H, DX11）**

是

是

是

是

是

**BC7 （DX11, 可选A）**

是

是

是

是

是

**半浮点（R16F）**

是

是

是

是

是

### 贴花

**贴花（Decals）** 是一种[材质](/documentation/zh-cn/unreal-engine/unreal-engine-materials)，投射到关卡中的表面上。贴花甚至可用应用到一些几何体上作为放置的网格体贴花。

属性

桌面延迟 (SM5/SM6: DirectX 12, macOS, Vulkan Desktop)

桌面延迟 (SM5: DirectX 11, macOS Metal, Vulkan Desktop)

桌面前向

桌面XR延迟

桌面XR前向

**网格体贴花**

是

是

是

是

是

**材质贴花响应（DBuffer）：颜色法线粗糙度**

是

是

是

是

是

**材质贴花响应（DBuffer）：颜色**

是

是

是

是

是

**材质贴花响应（DBuffer）：颜色法线**

是

是

是

是

是

**材质贴花响应（DBuffer）：颜色粗糙度**

是

是

是

是

是

**材质贴花响应（DBuffer）：法线**

是

是

是

是

是

**材质贴花响应（DBuffer）：法线粗糙度**

是

是

是

是

是

**材质贴花响应（DBuffer）：粗糙度**

是

是

是

是

是

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [platforms](https://dev.epicgames.com/community/search?query=platforms)
-   [xr](https://dev.epicgames.com/community/search?query=xr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [UE5常见渲染功能快速参考](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#ue5%E5%B8%B8%E8%A7%81%E6%B8%B2%E6%9F%93%E5%8A%9F%E8%83%BD%E5%BF%AB%E9%80%9F%E5%8F%82%E8%80%83)
-   [后期处理](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86)
-   [镜头](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E9%95%9C%E5%A4%B4)
-   [颜色分级](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E9%A2%9C%E8%89%B2%E5%88%86%E7%BA%A7)
-   [胶片](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E8%83%B6%E7%89%87)
-   [后期处理全局光照](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7)
-   [后期处理反射](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E5%8F%8D%E5%B0%84)
-   [渲染功能](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E6%B8%B2%E6%9F%93%E5%8A%9F%E8%83%BD)
-   [胶片噪点](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E8%83%B6%E7%89%87%E5%99%AA%E7%82%B9)
-   [常见引擎功能](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E5%B8%B8%E8%A7%81%E5%BC%95%E6%93%8E%E5%8A%9F%E8%83%BD)
-   [抗锯齿](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E6%8A%97%E9%94%AF%E9%BD%BF)
-   [系统和工具功能](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E7%B3%BB%E7%BB%9F%E5%92%8C%E5%B7%A5%E5%85%B7%E5%8A%9F%E8%83%BD)
-   [细节层级](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E7%BB%86%E8%8A%82%E5%B1%82%E7%BA%A7)
-   [可见度和遮蔽剔除](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E5%8F%AF%E8%A7%81%E5%BA%A6%E5%92%8C%E9%81%AE%E8%94%BD%E5%89%94%E9%99%A4)
-   [光照功能](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E5%85%89%E7%85%A7%E5%8A%9F%E8%83%BD)
-   [环境光照和效果](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E7%8E%AF%E5%A2%83%E5%85%89%E7%85%A7%E5%92%8C%E6%95%88%E6%9E%9C)
-   [全局光照](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7)
-   [阴影](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E9%98%B4%E5%BD%B1)
-   [反射](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E5%8F%8D%E5%B0%84)
-   [光照类型和移动性功能](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E5%85%89%E7%85%A7%E7%B1%BB%E5%9E%8B%E5%92%8C%E7%A7%BB%E5%8A%A8%E6%80%A7%E5%8A%9F%E8%83%BD)
-   [静态光照](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E9%9D%99%E6%80%81%E5%85%89%E7%85%A7)
-   [固定光照](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E5%9B%BA%E5%AE%9A%E5%85%89%E7%85%A7)
-   [可移动光照](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E5%8F%AF%E7%A7%BB%E5%8A%A8%E5%85%89%E7%85%A7)
-   [材质和纹理](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E6%9D%90%E8%B4%A8%E5%92%8C%E7%BA%B9%E7%90%86)
-   [材质域](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E6%9D%90%E8%B4%A8%E5%9F%9F)
-   [材质混合模式](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E6%9D%90%E8%B4%A8%E6%B7%B7%E5%90%88%E6%A8%A1%E5%BC%8F)
-   [材质着色模型](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E6%9D%90%E8%B4%A8%E7%9D%80%E8%89%B2%E6%A8%A1%E5%9E%8B)
-   [材质输入](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E6%9D%90%E8%B4%A8%E8%BE%93%E5%85%A5)
-   [纹理](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E7%BA%B9%E7%90%86)
-   [贴花](/documentation/zh-cn/unreal-engine/supported-features-by-rendering-path-for-desktop-with-unreal-engine#%E8%B4%B4%E8%8A%B1)
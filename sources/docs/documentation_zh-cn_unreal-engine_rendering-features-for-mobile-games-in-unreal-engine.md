# 虚幻引擎移动端渲染功能 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/rendering-features-for-mobile-games-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:59:08.724Z

---

目录

![移动端渲染功能](https://dev.epicgames.com/community/api/documentation/image/5711f7f9-b2cb-4f1a-9b35-192807032278?resizing_type=fill&width=1920&height=335)

与桌面级硬件和主机平台相比，许多移动设备都存在很大的硬件限制，特别是在图形功能的兼容性方面。为了解决这个问题，**虚幻引擎** 为移动设备提供了一个备用的渲染路径。该渲染路径在处理虚幻的许多渲染功能时（例如阴影和纹理），使用了简化的或面向性能的模型，并且删除了许多不支持的后期处理效果。本节中的指南提供了关于移动渲染器的配置选项和功能的详细信息。

以下链接包含关于移动渲染的专题。

[

![渲染和着色模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/30a13e07-e972-4ee6-8918-517b8af4fbaf/placeholder_topic.png)

渲染和着色模式

关于移动前向、延迟和桌面渲染路径的信息。





](/documentation/zh-cn/unreal-engine/mobile-rendering-and-shading-modes-for-unreal-engine)[

![功能级别和渲染模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c89a6770-4b8b-4dce-9bcf-4d6a98176809/placeholder_topic.png)

功能级别和渲染模式

本指南介绍移动渲染器的模式和功能级别





](/documentation/zh-cn/unreal-engine/mobile-feature-levels-and-rendering-modes-in-unreal-engine)[

![移动端Lumen](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9439234-e9c5-4571-8254-e819514b3cc9/placeholder_topic.png)

移动端Lumen

在移动设备上使用Lumen的兼容性信息和说明。





](/documentation/zh-cn/unreal-engine/using-lumen-global-illumination-on-mobile-in-unreal-engine)[

![移动平台FSR](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02372e40-5fdd-4f09-8c53-d5c77852e7c0/placeholder_topic.png)

移动平台FSR

了解如何在移动设备上使用FSR来提高渲染性能。





](/documentation/zh-cn/unreal-engine/using-mobile-fsr-for-unreal-engine)[

![移动延迟着色模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e25b17e5-a27a-4b61-9cc5-53a07d42b990/placeholder_topic.png)

移动延迟着色模式

在移动端游戏中使用延迟着色以实现更高效的动态光照和更高质量的画面。





](/documentation/zh-cn/unreal-engine/using-the-mobile-deferred-shading-mode-in-unreal-engine)[

![移动端桌面渲染器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7576cb3-7ff6-453e-beee-5e172317374a/placeholder_topic.png)

移动端桌面渲染器

移动设备桌面渲染器的概述。





](/documentation/zh-cn/unreal-engine/using-the-desktop-renderer-on-mobile-in-unreal-engine)

## 功能级别

移动端的基本 **功能级别** 如下：

功能级别

说明

OpenGL ES 3.2

Android设备的默认功能级别。你可以在 **项目设置（Project Settings）** > **平台（Platforms）** > **Android材质质量 - ES32（Android Material Quality - ES32）** 中为此功能级别配置材质设置。

Android Vulkan

某些Android设备可用的高端渲染器。关于在项目中使用Vulkan，以及哪些GPU支持它的详情，请参阅我们的相关指南：[Android Vulkan移动渲染器](/documentation/zh-cn/unreal-engine/using-the-android-vulkan-mobile-renderer-in-unreal-engine)。

Metal 2.0

iOS设备的功能级别。你可以你可以在 **项目设置（Project Settings）** > **平台（Platforms）** > **iOS材质质量（iOS Material Quality）** 中为此功能级别配置材质设置。

## 支持的渲染功能

下表中的每一列都列出了该功能是否受支持。可能的值如下：

值

说明

是

本列中的硬件支持此功能。

否

本列中的硬件不支持此功能。

是\*

此功能受到支持，但可能需要满足一些先决条件或额外设置。

### 后期处理体积

功能

移动前向（Open GL ES 3.2、Metal、Vulkan、Switch）

移动延迟（Metal、Vulkan、Switch）

移动前向，禁用HDR（头戴式移动XR）

Lens

 

 

 

移动景深属性

**是**

**是**

否

移动景深 - 高质量高斯景深

**是**

**是**

否

泛光 - 标准

**是**

**是**

否

泛光 - 卷积

否

否

否

色差属性

**是**

**是**

否

脏遮罩属性

**是**

**是**

否

摄像机属性

否

否

否

镜头光晕属性

**是**

**是**

否

图像效果属性

**是**

**是**

否

过场动画景深属性

否

否

否

曝光

 

 

 

计量模式 - 自动曝光柱状图

**是**

**是**

否

计量模式 - 自动曝光基本

**是**

**是**

否

计量模式 - 手动

**是**

**是**

**是**

局部曝光

否

否

否

色彩分级

 

 

 

色彩分级属性

**是**

**是**

否

胶片

 

 

 

胶片属性

**是**

**是**

否

渲染功能

 

 

 

后期处理材质属性

**是**

**是**

否

环境立方体贴图属性

否

否

否

环境光遮蔽属性

**是**

**是**

否

全局光照属性

否

否

否

反射属性

否

否

否

动态模糊属性

否

否

否

半透明类型：光栅化

**是**

**是**

**是**

半透明类型：光线追踪

否

否

否

光线追踪半透明属性

否

否

否

光线追踪属性

否

否

否

胶片颗粒

 

 

 

胶片颗粒属性

否

否

否

### 通用渲染功能

功能

移动前向（Open GL ES 3.2、Metal、Vulkan、Switch）

移动延迟（Metal、Vulkan、Switch）

移动前向，禁用HDR（头戴式移动XR）

抗锯齿

 

 

 

时序超级分辨率（TSG）

否

否

否

快速近似抗锯齿（Fast Approximation Anti-Aliasing，FXAA）

**是**

**是**

否

多重取样抗锯齿（Multi-Sample Anti-Aliasing，MSAA）

**是**

否

**是**

时序抗锯齿（Temporal Anti-Aliasing，TAA）

**是**

**是**

否

系统/工具功能

 

 

 

Nanite虚拟化几何体

否

否

否

硬件光线追踪功能

否

否

否

路径追踪器

否

否

否

纹理流送

**是**

**是**

**是**

虚拟纹理：流送

**是**

**是**

**是**

虚拟纹理：运行时

**是**

**是**

**是**

网格体距离场

**是 \***

**是**

否

水体系统

**是**

**是**

**是**

毛发Grooms

**是**

**是**

**是**

细节级别（Level of Detail，LOD）

 

 

 

细节级别（LOD）

**是**

**是**

**是**

分层细节级别（Hierarchical Level of Detail，HLOD）

**是**

**是**

**是**

颤抖消退

**是**

**是**

**是**

可视性和遮挡剔除

 

 

 

剔除距离体积

**是**

**是**

**是**

预计算可视性体积

**是**

**是**

**是**

硬件(GPU)遮挡查询

**是**

**是**

**是**

### 光照功能

功能

移动前向（Open GL ES 3.2、Metal、Vulkan、Switch）

移动延迟（Metal、Vulkan、Switch）

移动前向，禁用HDR（头戴式移动XR）

大气与雾

 

 

 

天空大气

**是**

**是**

**是**

体积云

否

否

否

指数高度雾

**是**

**是**

**是**

体积雾

否

否

否

光照和阴影投射

 

 

 

动态光照

**是**

**是**

**是**

预计算/烘焙光照

**是**

**是**

**是**

基于图像的光照

**是**

**是**

**是**

独立光线追踪阴影

否

否

否

虚拟阴影贴图

否

否

否

调制阴影

**是**

**是**

**是**

胶囊体阴影

**是**

**是**

**是**

接触阴影

否

否

否

预计算半透明阴影

否

否

否

动态半透明阴影

否

否

否

点光源阴影

**是**

**是**

**是**

全局光照

 

 

 

Lumen GI和反射：软件光线追踪

否

否

否

Lumen GI和反射：硬件光线追踪

否

否

否

预计算/烘焙全局光照

**是**

**是**

**是**

屏幕空间全局光照

否

否

否

独立光线追踪的全局光照（废弃）

否

否

否

反射

 

 

 

反射捕获（盒体/球体）

**是**

**是**

**是**

场景捕获立方体贴图

**是**

**是**

**是**

场景捕获2D

**是**

**是**

**是**

平面反射

**是**

**是**

**是**

屏幕空间反射

**是**

**是**

**是**

独立硬件光线追踪反射（废弃）

否

否

否

高精度法线

否

否

否

反射捕获分辨率

**是**

**是**

**是**

HDR立方体贴图

**是**

**是**

**是**

直接高光度

**是**

**是**

**是**

GGX高光度

**是**

**是**

**是**

### 光源类型和移动性功能

功能

移动前向（Open GL ES 3.2、Metal、Vulkan、Switch）

移动延迟（Metal、Vulkan、Switch）

移动前向，禁用HDR（头戴式移动XR）

静态移动性 - 光源类型

 

 

 

定向光源

任意类型的1个定向光源

任意类型的1个定向光源

任意类型的1个定向光源

天空光照

**是**

**是**

**是**

点光源

**是**

**是**

**是**

聚光源

**是**

**是**

**是**

矩形光源

**是**

**是**

**是**

静态移动性 - 通用功能

 

 

 

间接光照强度

**是**

**是**

**是**

光照通道

**是**

**是**

**是**

光透射

否

否

否

光源函数

否

**是**

否

静态移动性 - 定向光源功能

 

 

 

源角度

**是**

**是**

**是**

光束

**是**

**是**

否

调制的阴影

否

否

否

静态移动性 - 天空光照功能

 

 

 

SLS捕获的场景

**是**

**是**

**是**

SLS指定的立方体贴图

**是**

**是**

**是**

指定的立方体贴图分辨率

**是**

**是**

**是**

静态移动性 - 点/聚光/矩形光源功能

 

 

 

IES纹理

**是**

**是**

**是**

矩形光源 - 源纹理

否

否

否

静止移动性 - 光源类型

 

 

 

定向光源

任意类型的1个定向光源

任意类型的1个定向光源

任意类型的1个定向光源

天空光照

**是**

**是**

**是**

点光源

**是**

**是**

**是**

聚光光源

**是**

**是**

**是**

矩形光源

否

否

否

\\（移动端）静止移动性 - 动态阴影投射

 

 

 

定向光源

**是**

**是**

**是**

天空光照

否

否

否

点光源

否

否

否

聚光源

**是**

**是**

否

矩形光源

否

否

否

静止移动性 - 通用功能

 

 

 

间接光照强度

**是**

**是**

**是**

光照通道

**是**

**是**

**是**

光透射

否

否

否

光源函数

否

**是**

否

静止移动性 - 定向光源功能

 

 

 

光源角度

否

否

否

级联阴影贴图

**是**

**是**

**是**

光束

**是**

**是**

**是**

调制的阴影

**是**

**是**

**是**

静止移动性 - 天空光照功能

 

 

 

SLS捕获的场景

**是**

**是**

**是**

SLS指定的立方体贴图

**是**

**是**

\*是\*\*

指定的立方体贴图分辨率

**是**

**是**

**是**

静止移动性 - 点/聚光/矩形光源功能

 

 

 

IES纹理

**是**

**是**

**是**

矩形光源 - 源纹理

否

否

否

可移动移动性 - 光源类型

 

 

 

定向光源

任意类型的1个定向光源

任意类型的1个定向光源

任意类型的1个定向光源

天空光照

**是**

**是**

**是**

点光源

**是**

**是**

**是**

聚光光源

**是**

**是**

**是**

矩形光源

否

否

否

\\（移动端）可移动移动性 - 动态阴影投射

 

 

 

定向光源

**是**

**是**

**是**

天空光照

否

否

否

点光源

否

否

否

聚光光源

**是**

**是**

**是**

矩形光源

否

否

否

可移动移动性 - 通用功能

 

 

 

间接光照强度

否

否

否

光照通道

**是**

**是**

**是**

光透射

否

否

否

光源函数

否

**是**

否

可移动移动性 - 定向光源功能

 

 

 

光源角度

否

否

否

级联阴影贴图

**是**

**是**

**是**

光束

**是**

**是**

**是**

调制的阴影

否

否

否

距离场阴影

**是**

**是**

**是**

可移动移动性 - 天空光照功能

 

 

 

SLS捕获的场景

**是**

**是**

**是**

SLS指定的立方体贴图

**是**

**是**

**是**

指定的立方体贴图分辨率

**是**

**是**

**是**

可移动移动性 - 点/聚光/矩形光源功能

 

 

 

IES纹理

否

**是**

否

矩形光源 - 源纹理

否

否

否

### 材质功能

功能

移动前向（Open GL ES 3.2、Metal、Vulkan、Switch）

移动延迟（Metal、Vulkan、Switch）

移动前向，禁用HDR（头戴式移动XR）

材质输入

 

 

 

表面

**是**

**是**

**是**

延迟贴花

**是**

**是**

否

光源函数

否

**是**

否

体积

否

否

否

后期处理

**是**

**是**

否

用户界面

**是**

**是**

**是**

材质混合模式

 

 

 

不透明

**是**

**是**

**是**

蒙版

**是**

**是**

**是**

半透明

**是**

**是**

**是**

叠加

**是**

**是**

**是**

调制

**是**

**是**

**是**

Alpha合成（预乘Alpha）

**是**

**是**

**是**

Alpha Holdout

**是**

**是**

**是**

着色模型

 

 

 

无光照

**是**

**是**

**是**

默认光照

**是**

**是 \***

**是**

次表面

**是**

**是 \***

**是**

预集成皮肤

**是**

**是 \***

**是**

透明涂层

**是**

**是 \***

**是**

次表面轮廓

**是**

**是 \***

**是**

双面植被

否

否

否

毛发

否

否

否

布料

否

否

否

眼睛

否

否

否

单层水

**是**

**是**

**是**

薄半透明

否

否

否

从材质表达式

**是**

**是**

**是**

材质输入

 

 

 

基础颜色

**是**

**是**

**是**

金属感

**是**

**是**

**是**

高光度

**是**

**是**

**是**

粗糙度

**是**

**是**

**是**

各向异性

否

否

否

自发光颜色

**是**

**是**

**是**

不透明度

**是**

**是**

**是**

不透明蒙版

**是**

**是**

**是**

法线

**是**

**是**

**是**

切线

否

否

否

世界位置偏移

**是**

**是**

**是**

布料

否

否

否

绒毛颜色

否

否

否

虹膜遮罩

否

否

否

虹膜距离

否

否

否

次表面颜色

**是**

**是**

**是**

自定义数据 0-7

**是**

**是**

**是**

环境光遮蔽

**是**

**是**

**是**

折射

**是**

**是**

否

像素深度偏移

**是**

**是**

**是**

着色模型

**是**

**是**

**是**

透明涂层

**是**

**是**

**是**

背光（针对毛发）

否

否

否

贴花

 

 

 

贴花响应（DBuffer）：颜色、法线、粗糙度

否

**是**

**是**

贴花响应（DBuffer）：颜色

否

**是**

否

贴花响应（DBuffer）：颜色、法线

否

**是**

**是**

贴花响应（DBuffer）：颜色、粗糙度

否

**是**

**是**

贴花响应（DBuffer）：法线

否

**是**

**是**

贴花响应（DBuffer）：法线、粗糙度

否

**是**

**是**

贴花响应（DBuffer）：粗糙度

否

**是**

**是**

Mesh Decals

**是**

**是**

**是**

### 纹理

功能

移动前向（Open GL ES 3.2、Metal、Vulkan、Switch）

移动延迟（Metal、Vulkan、Switch）

移动前向，禁用HDR（头戴式移动XR）

压缩设置

 

 

 

默认值（DXT1/5，DX11上的BC1/3）

**是**

**是**

**是**

法线贴图（DXT 5，DX11上的BC5）

**是**

**是**

**是**

遮罩（无sRGB）

**是**

**是**

**是**

灰阶(R8, RGB8, sRGB)

**是**

**是**

**是**

置换贴图（8/16位）

**是**

**是**

**是**

向量置换贴图（RGBA8）

**是**

**是**

**是**

HDR（RGB，无sRGB）

**是**

**是**

**是**

用户界面2D(RGBA)

**是**

**是**

**是**

Alpha（无sRGB，DX11上的BC4）

**是**

**是**

**是**

距离场字体(R8)

**是**

**是**

**是**

HDR压缩(RGB, BC6H, DX11)

否

否

否

BC7（DX11，可选的A）

**是**

**是**

**是**

半浮点（R16F）

**是**

**是**

**是**

\### 粒子效果

功能

移动前向（Open GL ES 3.2、Metal、Vulkan、Switch）

移动延迟（Metal、Vulkan、Switch）

移动前向，禁用HDR（头戴式移动XR）

Niagara粒子系统

 

 

 

CPU粒子

**是**

**是**

**是**

CPU粒子碰撞

**是**

**是**

**是**

GPU粒子

**是**

**是**

**是**

GPU深度碰撞

否

否

否

网格体粒子

**是**

**是**

**是**

光束发射器

**是**

**是**

**是**

条带发射器

**是**

**是**

**是**

动画尾迹

**是**

**是**

**是**

矢量场

**是**

**是**

**是**

粒子光源

否

**是**

否

GPU距离场碰撞

否

否

否

GPU光线追踪碰撞（试验性）

否

否

否

流体模拟

否

否

否

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [功能级别](/documentation/zh-cn/unreal-engine/rendering-features-for-mobile-games-in-unreal-engine#%E5%8A%9F%E8%83%BD%E7%BA%A7%E5%88%AB)
-   [支持的渲染功能](/documentation/zh-cn/unreal-engine/rendering-features-for-mobile-games-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84%E6%B8%B2%E6%9F%93%E5%8A%9F%E8%83%BD)
-   [后期处理体积](/documentation/zh-cn/unreal-engine/rendering-features-for-mobile-games-in-unreal-engine#%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E4%BD%93%E7%A7%AF)
-   [通用渲染功能](/documentation/zh-cn/unreal-engine/rendering-features-for-mobile-games-in-unreal-engine#%E9%80%9A%E7%94%A8%E6%B8%B2%E6%9F%93%E5%8A%9F%E8%83%BD)
-   [光照功能](/documentation/zh-cn/unreal-engine/rendering-features-for-mobile-games-in-unreal-engine#%E5%85%89%E7%85%A7%E5%8A%9F%E8%83%BD)
-   [光源类型和移动性功能](/documentation/zh-cn/unreal-engine/rendering-features-for-mobile-games-in-unreal-engine#%E5%85%89%E6%BA%90%E7%B1%BB%E5%9E%8B%E5%92%8C%E7%A7%BB%E5%8A%A8%E6%80%A7%E5%8A%9F%E8%83%BD)
-   [材质功能](/documentation/zh-cn/unreal-engine/rendering-features-for-mobile-games-in-unreal-engine#%E6%9D%90%E8%B4%A8%E5%8A%9F%E8%83%BD)
-   [纹理](/documentation/zh-cn/unreal-engine/rendering-features-for-mobile-games-in-unreal-engine#%E7%BA%B9%E7%90%86)
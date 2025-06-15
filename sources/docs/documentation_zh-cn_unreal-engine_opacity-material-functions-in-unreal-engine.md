# 虚幻引擎不透明度材质函数 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/opacity-material-functions-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:26:52.154Z

---

目录

![不透明度材质函数](https://dev.epicgames.com/community/api/documentation/image/c995a8a0-bea3-4ce3-8166-34a06812772a?resizing_type=fill&width=1920&height=335)

不透明度材质函数用于加速处理复杂的不透明度计算。

## SoftOpacity

**SoftOpacity（软不透明度）**函数接收一个不透明度值，然后对其运行各种计算，从而产生一种柔和的感觉。它应用菲涅耳效果、基于深度的阿尔法以及像素深度。最终的结果会导致对象随着摄像机接近而逐渐消失。

项目

说明

输入

 

**消退距离深度（标量）（DepthFadeDistance (Scalar)）**

对象完全消失时的深度。仅当使用了 *输出使用深度偏离（OutputUsesDepthBias）*输出时才有效。

**输入不透明度（标量）（OpacityIn (Scalar)）**

这是传入不透明度值。

**消退距离（标量）（FadeDistance (Scalar)）**

距离表面多近时开始淡出。

输出

 

**输出使用深度偏离（OutputUsesDepthBias）**

此输出会导致对象在其距离达到 *消退距离深度（DepthFadeDistance）*输入所设置的值时完全淡出，成为完全透明的状态。

**输出无深度偏离（OutputNoDepthBias）**

此输出会导致对象在其到达摄像机时完全淡出，这表示没有偏移。此输出比 *输出使用深度偏离（OutputUsesDepthBias）* 少 12 条指令。

![软不透明度](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14ea3ff4-893e-4b95-89dd-80313e603b00/soft-opacity.png)

在此示例中，圆柱体的边缘更加透明，因为这里的网格体曲线更远离摄像机。这是材质函数中的菲涅尔效果造成的。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [SoftOpacity](/documentation/zh-cn/unreal-engine/opacity-material-functions-in-unreal-engine#softopacity)
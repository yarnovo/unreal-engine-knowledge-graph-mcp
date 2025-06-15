# 虚幻引擎反射材质函数 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/reflections-material-functions-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:27:09.845Z

---

目录

![反射材质函数](https://dev.epicgames.com/community/api/documentation/image/f0ce0705-f641-4156-8f14-13d852043364?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41c684c1-f42e-4dfb-92ea-99f4293b9c64/reflectionheader.png)

此示例展示了虚幻引擎的实时反射功能。该场景为一座地铁站，不但四处漏水，还有肮脏的瓷砖、损坏的管道以及其他陈旧的环境细节。在此文档中，我们将简单介绍用于处理此类反射的函数。

## ViewAlignedReflection

此函数接收球形反射纹理并使其与视图一致。通过输入定制反射矢量，可以按一定的偏移来执行计算。

输入

说明

**反射矢量（矢量 3）（ReflectionVector (Vector 3)）**

接收需要与视图一致的现有反射矢量。

**反射纹理（纹理对象）（ReflectionTexture (TextureObject)）**

接收现有的反射纹理，这必须是球形纹理。

输出

 

**纹理（Texture）**

输出所产生的基于视图的反射纹理。

**UV（UVs）**

输出反射纹理的 UV 坐标，以便可以在其他位置重新应用这些纹理。

![View Aligned Reflection](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/585b6ff1-2032-4a97-a2f6-3a62c23a57d2/view-aligned-reflection.png)

## WorldAlignedReflection

此函数接收基于球体的传入反射纹理并使其与全局坐标一致。通过输入定制反射矢量，可以按一定的偏移来执行计算。

输入

说明

**反射矢量（矢量 3）（ReflectionVector (Vector 3)）**

接收需要与视图一致的现有反射矢量。

**反射纹理（纹理对象）（ReflectionTexture (TextureObject)）**

接收现有的反射纹理，这必须是球形纹理。

输出

 

**全局反射（WorldReflection）**

输出基于全局的反射纹理。

**阴影全局反射（WorldReflectionShadowed）**

输出对比度更高的纹理版本，此版本可在阴影区域中应用。

![WorldAlignedReflection](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f696d9a3-d9a5-495d-83ea-e723e776eeba/worldalignedreflection_demo.png)

## CustomReflectionVector

此函数使用法线贴图来生成一个反射矢量，该反射矢量独立于默认反射矢量以及基本着色器上的法线输入。

输入

说明

**法线（矢量 3）（Normal (Vector3)）**

接收法线贴图，以用作定制反射矢量的基础。

![Custom Reflection Vector](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/378eada9-c835-450b-b79e-cdf5397f4189/custom-reflection-vector.png)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [ViewAlignedReflection](/documentation/zh-cn/unreal-engine/reflections-material-functions-in-unreal-engine#viewalignedreflection)
-   [WorldAlignedReflection](/documentation/zh-cn/unreal-engine/reflections-material-functions-in-unreal-engine#worldalignedreflection)
-   [CustomReflectionVector](/documentation/zh-cn/unreal-engine/reflections-material-functions-in-unreal-engine#customreflectionvector)
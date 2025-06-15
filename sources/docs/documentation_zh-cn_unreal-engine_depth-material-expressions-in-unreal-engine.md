# 虚幻引擎深度材质表达式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/depth-material-expressions-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:27:58.574Z

---

目录

![深度材质表达式](https://dev.epicgames.com/community/api/documentation/image/cf5ff651-f6ff-4b87-a5ae-37a94048d749?resizing_type=fill&width=1920&height=335)

## DepthFade

**DepthFade（深度消退）** 材质表达式用来隐藏半透明对象与不透明对象相交时出现的不美观接缝。

属性

说明

**消退距离（Fade Distance）**

这是应该发生消退的全局空间距离。未连接 FadeDistance（FadeDistance）输入时，将使用此距离。

输入

 

**不透明（Opacity）**

接收深度消退前对象的现有不透明度。

**FadeDistance（消退距离）**

这是应该发生消退的全局空间距离。

在下面的对比图中，一个半透明球体与一个不透明球体（绿色）相交。请注意在使用了DepthFade时，过渡会变得更平滑。

![深度消退前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8efdf2c-2f40-4521-af8e-9e5d87d980d4/depth-fade-slider-01.png)

![深度消退后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55b3b9c3-4ee2-4dc9-b9b1-8231c5b864c8/depth-fade-slider-02.png)

深度消退前

深度消退后

本示例的材质网络如下图所示。

![Depth Fade Material Graph](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e524c90-188f-43bb-94f4-76ba8bf17c85/depth-fade-graph.png)

## PixelDepth

**PixelDepth（像素深度）**材质表达式输出当前所渲染像素的深度，即该像素与摄像机之间的距离。

![Pixel Depth Example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb3805a7-7e8a-4629-9893-f7a8ef21d739/pixeldepthexample.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6d76694-1236-4735-ae50-5d3fe8eccf72/pixel-depth-graph.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6d76694-1236-4735-ae50-5d3fe8eccf72/pixel-depth-graph.png)

结果

节点图表（点击可查看大图）

在此示例中，已将材质网络应用于地板。请注意当地板后退 2048 个以上单位时，线性插值在两种颜色之间是如何进行混合的。使用了 Power（幂）表达式来加强这两种颜色之间的对比，并产生更有意义的视觉效果。

## SceneDepth

**SceneDepth（场景深度）**材质表达式输出现有的场景深度。这类似于 [PixelDepth（像素深度）](/documentation/zh-cn/unreal-engine/depth-material-expressions-in-unreal-engine#pixeldepth)，但是 PixelDepth（像素深度）只能在当前所绘制像素处进行深度取样，而 SceneDepth（场景深度）可以在 **任何位置** 进行深度取样。

只有半透明材质可以利用 SceneDepth（场景深度）。

输入

说明

**UVs**

接收 UV 纹理坐标，用来确定对"纹理"进行取样的深度。

![Scene Depth Example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94ad3dc6-934f-4e43-b0f9-c3e0221eafa2/scene-depth-example.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1231a1b2-4104-4439-8c98-a7ead3e88a6e/scene-depth-graph.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1231a1b2-4104-4439-8c98-a7ead3e88a6e/scene-depth-graph.png)

结果

节点网络（点击可查看大图）

在本示例中，我们已将材质网络应用于一个半透明球体。请注意，SceneDepth（场景深度）节点将读取该球体背后的像素，而不是读取球体表面的像素。

产生的规范化深度是 0.0 到 1.0 范围内的线性深度。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [DepthFade](/documentation/zh-cn/unreal-engine/depth-material-expressions-in-unreal-engine#depthfade)
-   [PixelDepth](/documentation/zh-cn/unreal-engine/depth-material-expressions-in-unreal-engine#pixeldepth)
-   [SceneDepth](/documentation/zh-cn/unreal-engine/depth-material-expressions-in-unreal-engine#scenedepth)
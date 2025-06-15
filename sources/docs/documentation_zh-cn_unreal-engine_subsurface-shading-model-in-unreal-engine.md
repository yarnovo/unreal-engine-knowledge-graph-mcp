# 虚幻引擎次表面着色模型 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/subsurface-shading-model-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:25:58.257Z

---

目录

![次表面着色模型](https://dev.epicgames.com/community/api/documentation/image/6cb5b5d3-fc81-4896-825b-20393ef917e0?resizing_type=fill&width=1920&height=335)

材质具有一种新的次表面明暗处理模型（***MLM\_Subsurface***），后者适用于以蜡或翡翠为代表的一类材质，它们表现为不透明，但光线会在其内部散射，使得部分光线从表面的对面穿透出来。

![Jade Material](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/948fdee0-c2ff-4a40-bba9-f32c977b0745/jade_statue.jpg) ![Ice Material](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/017d1c8a-30c4-4a11-900e-2abcca654501/ice_mounds.jpg)

次表面散射（SSS）通常用来为人类或其他生物创建逼真的皮肤；但是，此明暗处理模型的效果的质量欠佳，而且成本低于通常用于皮肤渲染的模型。

## 技术细节

次表面光线的两个成分分别是环绕型的`N dot H`和光线反向散射，后者在光线投射于SSS对象的另一面时显示。这两者都由指数阴影贴图所产生的半透明自身阴影屏蔽。

## 材质输入通道

"次表面颜色"（SubsurfaceColor）输入通道用于定义材质内影响SSS照明的颜色。

当材质使用次表面散射和 *MLM\_Subsurface* 明暗处理模型时，材质的"不透明"（Opacity）通道的含义略有不同。因为这些类型的表面完全不透明，所以"不透明"（Opacity）在这种情况下用于控制材质散射光线时的密度以及：

-   法线纹理影响次表面光线的程度，材质越不透明，法线纹理的影响越大。
-   光线穿过材质后因自身阴影而可传播多远，不透明度越低，光线传播得越远。
-   阴影在材质上的柔和度，不透明度越低，阴影就越柔和，但柔和程度受限制。

对于任何次表面材质，务必将不透明度设置为合理的值，例如0.1。默认的不透明度为1，这不会产生非常令人信服的次表面类型效果。

## 局限性

另外，当前实现具有一些局限性：

-   尚不支持点光源阴影。
-   层叠阴影贴图会产生接缝。
-   SSS材质在足够接近阴影投射对象时，仍可接收到穿透完全不透明材质的泄露光线。
-   低不透明度所产生的柔和阴影在所支持的柔和度方面受限制，并且会产生锯齿。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [技术细节](/documentation/zh-cn/unreal-engine/subsurface-shading-model-in-unreal-engine#%E6%8A%80%E6%9C%AF%E7%BB%86%E8%8A%82)
-   [材质输入通道](/documentation/zh-cn/unreal-engine/subsurface-shading-model-in-unreal-engine#%E6%9D%90%E8%B4%A8%E8%BE%93%E5%85%A5%E9%80%9A%E9%81%93)
-   [局限性](/documentation/zh-cn/unreal-engine/subsurface-shading-model-in-unreal-engine#%E5%B1%80%E9%99%90%E6%80%A7)
# 虚幻引擎环境法线贴图 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/bent-normal-maps-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:29:20.278Z

---

目录

![环境法线贴图](https://dev.epicgames.com/community/api/documentation/image/6807d350-4313-48c0-868a-a8e4f65af92c?resizing_type=fill&width=1920&height=335)

![非环境法线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad79dfd5-d003-4836-9af6-0858500e0e2a/no_bentnormal_00.png)

![环境法线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25e6ee8a-8ded-4b6d-928f-71fed4e3405a/bentnormal_00.png)

非环境法线

环境法线

在材质中使用环境法线有助于改善它们对照明和着色的反应。在本文档中，您将了解到开始在虚幻引擎项目中使用环境法线所需的所有信息。

## 使用环境法线的好处

以下是使用环境法线的好处：

-   环境法线的最大影响之一是有助于减少照明构建之后发生的漏光。
-   环境法线也可与环境光遮蔽（AO）结合使用，以改善漫射间接照明。原理是使漫射间接照明更接近于全局光照（GI），具体方法是将环境法线代替法线用于间接照明。

![使用AO漫射间接照明](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f96e6da4-2e2a-46a1-8641-d44643248de3/bentnormalaolighting.png)

![使用环境法线漫射间接照明](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe31f561-3d87-45a5-be0c-8945b6d768e2/bentnormallighting.png)

使用AO漫射间接照明

使用环境法线漫射间接照明

## 环境法线创建

为了获得最高质量的环境法线贴图，并且符合虚幻引擎与环境法线贴图计算方式有关的假设，请确保在创建环境法线贴图时遵循以下说明：

-   创建环境法线贴图时使用 **余弦分布**。
    
-   与生成标准法线贴图或AO贴图的方式相似，可以使用[Substance Designer 6](https://www.allegorithmic.com/blog/substance-designer-6-unleashed-now-scan-processing-and-new-nodes)来生成环境法线贴图。
    
-   生成环境法线时，请确保将角色置于T姿势。
    
-   环境法线和AO应使用相同的 **距离** 设置。
    
-   环境法线应与法线贴图位于相同的空间中。请参阅以下图表获取更多信息：
    
    场景空间类型
    
    法线贴图类型
    
    环境法线类型
    
    场景
    
    场景
    
    场景
    
    切线
    
    切线
    
    切线
    

## 在虚幻引擎中使用环境法线

在材质中使用环境法线贴图的流程与设置和使用法线贴图的过程非常相似。只需向材质图中添加 **环境法线（Bent Normal）** 自定义输出节点然后将环境法线贴图连接到输入，如下图所示。此外，请确保有AO贴图输入到 **环境光遮蔽（Ambient Occlusion）** 输入中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8a9d244-285f-41b0-8a65-53babf0a1279/bent-normal-graph.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8a9d244-285f-41b0-8a65-53babf0a1279/bent-normal-graph.png)

单击查看大图。

## 反射遮蔽

也可通过不那么传统的强大方式将环境法线贴图用于反射遮蔽/高光度遮蔽。环境光遮蔽（AO）贴图遮挡漫射间接照明，反射遮蔽的概念与它相似，但是应用于高光度间接照明。反射遮蔽的工作原理是让高光叶片和可见锥体相交，可见锥体就是作为圆锥轴的环境法线和作为圆锥角的AO量所形成的半球体未被遮挡部分的圆锥体。这样可以显著减少高光度漏光，尤其是屏幕空间反射（SSR）数据不可用的时候。

也支持用于计算遮蔽的多次反射近似值。这意味着我们可以使用多次反射产生的近似值来取代仅为第一次反射投射阴影的AO或反射遮蔽。借助多次反射近似值，较亮的材质不会变得过暗，有色材质的饱和度将会更高。

![AO](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc1724ce-e485-48a8-8854-80327ccec9ea/reflectionbnao.png)

![环境法线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0772be3-23b6-4f66-8961-3297aed9c1c9/reflectionbn.png)

AO

环境法线

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用环境法线的好处](/documentation/zh-cn/unreal-engine/bent-normal-maps-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%8E%AF%E5%A2%83%E6%B3%95%E7%BA%BF%E7%9A%84%E5%A5%BD%E5%A4%84)
-   [环境法线创建](/documentation/zh-cn/unreal-engine/bent-normal-maps-in-unreal-engine#%E7%8E%AF%E5%A2%83%E6%B3%95%E7%BA%BF%E5%88%9B%E5%BB%BA)
-   [在虚幻引擎中使用环境法线](/documentation/zh-cn/unreal-engine/bent-normal-maps-in-unreal-engine#%E5%9C%A8%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%8E%AF%E5%A2%83%E6%B3%95%E7%BA%BF)
-   [反射遮蔽](/documentation/zh-cn/unreal-engine/bent-normal-maps-in-unreal-engine#%E5%8F%8D%E5%B0%84%E9%81%AE%E8%94%BD)
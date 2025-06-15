# 虚幻引擎中的Lightmass门户 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lightmass-portals-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:14:56.424Z

---

目录

![Lightmass门户](https://dev.epicgames.com/community/api/documentation/image/4454e525-a037-42b8-a6e3-7db2770465eb?resizing_type=fill&width=1920&height=335)

![Banner image](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e815bebc-10f4-401e-ab70-9583a663df72/lightmass-portals-banner.png)

在收集光线时，Lightmass可以使用来自光子映射技术的光子追溯到聚光源、点光源和定向光源。 这意味着它可以找到这些类型的光源来自哪个小窗户，并以高品质解析射入的光线。 但是，天空光照和自发光网格体不能有效地支持光子发射，所以Lightmass只能强行查找微小的重要光照特性。 这导致了室内角落的污迹失真（splotchy artifact）现象。为了帮助Lightmass更好地理解光线的来源，可以在重要的光照区域周围放置 **Lightmass门户** Actors。 以下文档将介绍如何在虚幻引擎 项目中设置并使用Lightmass门户。

## 工作方式

概括起来，Lightmass门户是按下列方式工作的：

-   使用[天空光照](/documentation/zh-cn/unreal-engine/sky-lights-in-unreal-engine)、HDR影像或设置为启用[将自发光用于静态照明（Use Emissive for Static Lighting）](/documentation/zh-cn/unreal-engine/using-the-emissive-material-input-in-unreal-engine#usingemissivematerialstolighttheworld)选项的静态网格体对场景照明时，Lightmass门户用处最大。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e502e3f-a64e-4242-b162-56dd36db6a68/01-lightmass-portals-skylight-setup.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e502e3f-a64e-4242-b162-56dd36db6a68/01-lightmass-portals-skylight-setup.png)
    
    点击查看大图。
    
-   Lightmass门户放置在关卡中，并调整比例以适应对最终光照有重要意义的任何开放区域。
    
    ![Example of the scene with Lightmass Portals](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6227645d-9781-4aa6-9abc-926d08380d93/02-lightmass-portals-example-scene.png)
-   当Lightmass构建光源时，Lightmass门户会告诉Lightmass，应该有更多光线来自此区域，从而产生更高质量的光照和阴影。
    
    ![不使用门户](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/916f697b-4261-40dd-bcd8-2eeb7dbd4732/03-lightmass-portals-result-without.png)
    
    ![使用门户](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77483ce4-65e7-4ce2-a2ca-bd963ce6036a/04-lightmass-portals-result-with.png)
    
    不使用门户
    
    使用门户
    

## 步骤

要在项目中使用Lightmass门户，需要执行下列操作。

1.  在 **放置Actor（Place Actors）** 面板中搜索 **Lightmass门户（Lightmass Portal）**，找到以后，将 **Lightmass门户Actor** 拖入 **关卡**中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/798fc974-0d65-4217-9870-947f5d25fabb/05-lightmass-portals-adding-actor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/798fc974-0d65-4217-9870-947f5d25fabb/05-lightmass-portals-adding-actor.png)
    
    点击查看大图。
    
2.  使用 **移动（Move）**、**旋转（Rotate）** 和 **缩放（Scale）** 工具放置和缩放Lightmass门户，使它的大小与你希望聚焦更多光线的开口或区域大致相同或略小一点。
    
    ![Adjusting position and scaleof the Lightmass Portal Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4deb3445-88ce-48b8-9d77-5d0164c4d7d8/06-lightmass-portals-adjusting-actor.png)
3.  点击 **主** 菜单面板中的 **构建（Build）**，选择 **构建（Build）**，将 **光照质量（Lighting Quality）** 改为 **产品级（Production）**。
    
    ![Enable production lighting quality](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2cc2711-dc2c-4a9a-a006-84a6451e2335/07-lightmass-portals-lighting-quality.png)
4.  完成所有设置后，点击 **主** 菜单面板中的 **构建（Build）** 并选择 **构建所有关卡（Build All Levels）**， 开始Lightmass光照构建。
    
    ![Build the Lightmass lighting](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/342ca62e-debc-4db2-972b-45e7a706b672/08-lightmass-portals-build.png)

## 最终结果

完成Lightmass构建之后，就会得到与下列图像类似的效果。

![不使用门户](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/141b439e-f6e2-474d-84a1-0916db33afad/09-lightmass-portals-off.png)

![使用门户](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76de0d83-585f-4f2d-add3-38dfb8b06cfe/10-lightmass-portals-on.png)

不使用门户

使用门户

如果细看 **不使用门户** 的图像，你会注意到与 **使用门户** 的图像相比，该图像中有许多噪点，特别是在比较暗的区域。

## 已知问题与限制

-   Lightmass门户是通过强制Lightmass向门户发射光线来工作的。因此，应该只将Lightmass门户用于小型关卡，而且只用于对场景很关键的光照。如果不遵循这一原则，（且添加了太多Lightmass门户）就可能大大增加Lightmass构建次数。
    
-   只可将Lightmass门户用在非常小的关卡中，因为Lightmass门户不会被任何物体遮挡。如果将它们用在大型的开放世界场景类关卡中，就会不必要地延长光源烘焙时间。
    
-   如果将静态网格体用于自发光的光线投射体，且结果存在大量噪点，一定要在应该发射该静态网格体光线的区域周围放置Lightmass门户。
    

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [global illumination](https://dev.epicgames.com/community/search?query=global%20illumination)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [工作方式](/documentation/zh-cn/unreal-engine/lightmass-portals-in-unreal-engine#%E5%B7%A5%E4%BD%9C%E6%96%B9%E5%BC%8F)
-   [步骤](/documentation/zh-cn/unreal-engine/lightmass-portals-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/lightmass-portals-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [已知问题与限制](/documentation/zh-cn/unreal-engine/lightmass-portals-in-unreal-engine#%E5%B7%B2%E7%9F%A5%E9%97%AE%E9%A2%98%E4%B8%8E%E9%99%90%E5%88%B6)
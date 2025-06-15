# 虚幻引擎中的Paper 2D Sprite材质 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/paper-2d-sprite-material-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:16:50.051Z

---

目录

**Sprite材质（Sprite Materials）** 是可分配的[材质](/documentation/zh-cn/unreal-engine/unreal-engine-materials)资产，会影响关卡中的Sprite外观，例如锐化像素、平滑边缘以及半透明程度。

![选择sprite材质属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b1bd66f-8244-42d3-b3cd-c8c684193e72/material.png)

材质还可能影响Sprite与环境光照交互的方式，甚至可能自己发光。

![sprite材质渲染比较](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e723cd00-eb91-4874-b450-863d1b24b52d/emit.png)

## Sprite材质参考

你可以在此处参考Paper2D插件随附的材质列表，你可以在虚幻引擎中处理Sprite时使用这些材质。

材质

示例图像

说明

**DefaultLitSpriteMaterial**

![默认光照sprite材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86ec981b-2b1d-4dda-ad72-a83e01b98c3c/defaultlit.png)

此材质使用 **默认Sprite纹理设置（Default Sprite Texture Settings）** 作为材质设置。使用此材质还会使Sprite的外观受关卡中的光源影响。

**DefaultSpriteMaterial**

![默认sprite材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/307c82ae-5e19-4079-9354-3e8e76394142/defaultsprite.png)

此材质会将 **默认Sprite纹理设置（Default Sprite Texture Settings）** 用作材质设置。使用此材质还会使Sprite的外观不受关卡中的光源影响。

引擎内容中有两个DefaultSpriteMaterial，一个是为Paper 2D系统设计的，另一个是为[Niagara粒子系统](/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine)设计的。你可以将鼠标悬停在材质上来区别这两者，并确保 **路径（Path）** 列出 `/Paper2d` 文件路径。

**MaskedLitSpriteMaterial**

![遮罩光照sprite材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db08992e-f64a-4ac6-9990-744c9f0efc46/maskedlit.png)

此材质将在背景和关卡中 **遮罩** Sprite，在Sprite和背景之间造成生硬的边界。使用遮罩材质时，不能使用梯度透明度值。使用此材质还会使Sprite的外观受关卡中的光源影响。

**MaskedUnlitSpriteMaterial**

![遮罩无光照sprite材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5ac44b5-8d4c-4173-a7f8-12bce67cf4fb/maskedunlit.png)

此材质将在背景和关卡 **遮罩** Sprite，在Sprite和背景之间造成生硬的边界。使用遮罩材质时，不能使用梯度透明度值。使用此材质还会使Sprite的外观不受关卡中的光源影响。

**OpaqueLitSpriteMaterial**

![不透明光照sprite材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2918d7f0-49a7-442c-9714-ab1e41228f3f/opaquelit.png)

此材质将实心层用于整个Sprite对象。此材质不允许Sprite的像素中出现透明度或透明度梯度。如果Sprite包含透明背景，此材质会在背景中填充纯黑色。使用此材质会使Sprite的外观受关卡中的光源影响。

**OpaqueUnlitSpriteMaterial**

![不透明无光照sprite材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56c54fac-4bf5-4938-b0a5-1b3884662971/opaqueunlit.png)

此材质将实心层用于整个Sprite对象。此材质不允许Sprite的像素中出现透明度或透明度梯度。如果Sprite包含透明背景，此材质会在背景中填充纯黑色。使用此材质会使Sprite的外观不受关卡中的光源影响。

**TranslucentLitSpriteMaterial**

![半透明光照sprite材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/520e2648-950d-487c-96e3-bd50ce5b2548/translucentlit.png)

此材质将允许Sprite上出现透明度和透明度梯度。此材质有助于创建可透视的材质，例如窗户或水。使用此材质还会使Sprite的外观受关卡中的光源影响。

透明材质的性能占用程度最高，因此在项目中务必少用这些材质。

**TranlucentUnlitSpriteMaterial**

![半透明无光照sprite材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16ab02f0-10a2-4724-bdca-af4efe72c1eb/translucentunlit.png)

使用此材质将允许Sprite上出现透明度和透明度梯度。此材质有助于创建可透视的材质，例如窗户或水。此材质的性能占用程度最高，因此务必少用此模式。使用此材质会使Sprite的外观不受关卡中的光源影响。

透明材质的性能占用程度最高，因此在项目中务必少用这些材质。

## 自定义Sprite材质

你可以编辑现有的Sprite材质资产，或创建自定义材质资产，以用于在项目中渲染Sprite。

如需详细了解如何创建材质资产，请参阅[材质编辑器指南](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-user-guide)文档。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [paper2d](https://dev.epicgames.com/community/search?query=paper2d)
-   [sprites](https://dev.epicgames.com/community/search?query=sprites)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Sprite材质参考](/documentation/zh-cn/unreal-engine/paper-2d-sprite-material-in-unreal-engine#sprite%E6%9D%90%E8%B4%A8%E5%8F%82%E8%80%83)
-   [自定义Sprite材质](/documentation/zh-cn/unreal-engine/paper-2d-sprite-material-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89sprite%E6%9D%90%E8%B4%A8)

相关文档

[

材质

![材质](https://dev.epicgames.com/community/api/documentation/image/cdeef2f5-00ad-4403-bbd3-ee8f0b14330e?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-materials)
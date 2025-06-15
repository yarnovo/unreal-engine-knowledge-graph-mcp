# 虚幻引擎Lightmass基础知识 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lightmass-basics-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:14:58.818Z

---

目录

![Lightmass基础知识](https://dev.epicgames.com/community/api/documentation/image/82b12760-c469-41a4-bacf-b8919c146a66?resizing_type=fill&width=1920&height=335)

![Banner Image](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd4d45a5-d639-4c93-a0aa-c2ded7a9fa04/lightmass-basics-banner.png)

**全局光照（Lightmass）** 创建具有复杂光交互作用的光照图，例如区域阴影和漫反射。它用于预计算具有固定和静态运动性的光源的光照贡献部分。

## Lightmass重要体积

许多贴图在编辑器中已经网格化到网格的边缘，但是需要高质量光照的实际可玩区域要小得多。全局光照取决于关卡的大小发射光子，因此这些背景网格体将大大增加需要发射的光子数量，而光照构建时间也将增加。全局光照重要体积控制全局光照发射光子的区域，允许你将其集中在需要清晰间接光照的区域。在重要体积之外的区域在较低的质量下只能得到一次间接光照的反射。

![Example of the Lightmas Importance Volume](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8541125-e728-44c9-be05-baeb8a4e854b/01-lightmass-basics-importance-volume.png)

要将一个全局光照重要体积添加到某个关卡中，你可以从 **放置Actor（Place Actors）** 菜单的 **体积（Volume）** 选项卡中将这个 **全局光照重要体积（Lightmass Importance Volume）** 对象拖动到关卡中，然后将其缩放到所需的大小。

![Adding a Lightmass Importance Volume to a level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70dfa662-c1ef-43f2-a003-ab37837ad626/37-lightmass-global-illum-add-lightmass-volume.png)

你还可以通过单击 **Actor** 下的 **细节（Details）** 面板中的 **转换Actor（Convert Actor）** 下拉框，将画笔转换为全局光照重要体积。

![Convert a Bush into a Lightmass Importance Volume](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70cc1e35-ab39-4168-8da7-2ee52b1472f1/38-lightmass-global-illum-convert-brush-actor.png)

单击该下拉框后，将出现一个菜单，你可以在其中选择要替换画笔的Actor类型。

![The drop down box of convert settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b85a8c32-8d31-4dc2-9dd7-55dcb7c95fa6/39-lightmass-global-illum-convert-dropdown.png)

如果你放置多个全局光照重要体积，那么大多数光照工作将通过包含所有这些体积的边界框来完成。但是，体积光照样本仅放置在较小的体块中。

## 构建

1.  点击 **主** 菜单面板上的 **构建 Build** 并选择 **仅构建光照（Build Lighting Only）**，你也可以选择 **构建所有关卡（Build All Levels）** 。
    
    ![Select Build Lighting Only option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f323a40f-6024-4f79-bb11-d7efddc539cc/02-lightmass-basics-build-options.png)
2.  类似于这样的一个对话框将会出现在屏幕的右下角
    
    ![Lighting Build process in progress](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe2b4a74-7849-40ec-af8d-29019d66409d/03-lightmass-basics-build-progress.png)
3.  当构建完成时，点击 **保留 Keep** 。
    
    ![Lighting Build process completed](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0ff003c-6d24-475a-8bd9-2828d5a8fe3a/04-lightmass-basics-build-completed.png)

就这么简单。根据光源数量、质量模式、关卡大小、Lightmass 重要体积所包含的部分、Swarm 客户端是否有其他计算机可用，这个过程可能会花费几分钟或者更长的时间。

## 画质模式

![Lighting quality build modes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37e03a00-e150-4c5e-8644-33e24a625343/05-lightmass-basics-quality-modes.png)

这些预置模式是时间花费和获得画质之间的平衡。**预览级（Preview）** 将会快速地进行渲染，并提供大部分直接光照烘培后的一般效果，而 **产品级（Production）** 的渲染较慢，但是可以提供更加真实的效果，并且可以校正各种光照渗透错误。

-   **产品级（Production）** - 看上去非常棒，需要花费一些时间
-   **高级（High）** - 看上去很好，需要一些时间
-   **中级（Medium）** - 看上去较好，需要稍微长一点的时间进行计算
-   **预览级（Preview）** - 只是可以接受，但渲染速度很快

这些仅是预置，还有很多设置可以调整，以便在你的游戏中获得满意的光照，请参照 [Lightmass](/documentation/zh-cn/unreal-engine/cpu-lightmass-global-illumination-in-unreal-engine) 文档获得关于如何调整 **Lightmass** 设置的更多信息。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [global illumination](https://dev.epicgames.com/community/search?query=global%20illumination)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Lightmass重要体积](/documentation/zh-cn/unreal-engine/lightmass-basics-in-unreal-engine#lightmass%E9%87%8D%E8%A6%81%E4%BD%93%E7%A7%AF)
-   [构建](/documentation/zh-cn/unreal-engine/lightmass-basics-in-unreal-engine#%E6%9E%84%E5%BB%BA)
-   [画质模式](/documentation/zh-cn/unreal-engine/lightmass-basics-in-unreal-engine#%E7%94%BB%E8%B4%A8%E6%A8%A1%E5%BC%8F)
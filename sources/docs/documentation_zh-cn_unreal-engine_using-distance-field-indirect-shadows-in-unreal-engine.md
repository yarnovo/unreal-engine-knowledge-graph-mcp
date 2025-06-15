# 在虚幻引擎中使用距离场间接阴影 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-distance-field-indirect-shadows-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:16:29.040Z

---

目录

![使用距离场间接阴影](https://dev.epicgames.com/community/api/documentation/image/0b92317d-65cf-4ce1-8406-f0888bf0c2ac?resizing_type=fill&width=1920&height=335)

如果游戏针对间接光照区域使用预计算照明，混合可移动对象可能会非常具有挑战性，因为它们不会拥有柔和区域阴影。有时需要模拟这种类型的效果，以使用复杂材质设置乃至贴花将动态对象与场景的其他部分混合起来。**距离场间接阴影（Distance Field Indirect Shadows）**（DFIS）使你能够为用于间接光照区域中的区域阴影的单个静态网格体生成[网格体距离场](/documentation/zh-cn/unreal-engine/mesh-distance-fields-in-unreal-engine)。在这些区域中，传统的阴影贴图方法表现不佳。

距离场间接阴影（Distance Field Indirect Shadowing）的工作原理与用于骨架网格体的[胶囊体阴影](/documentation/zh-cn/unreal-engine/capsule-shadows-in-unreal-engine)的相似，都是使用在照明构建过程中生成的预计算照明样本。这些照明样本使用[体积光照贴图](/documentation/zh-cn/unreal-engine/volumetric-lightmaps-in-unreal-engine)来确定间接照明的方向性和强度。

在本指南中，你将学习如何为单个网格体启用距离场，然后将这类网格体在关卡中用于使用静态间接照明照亮的区域，从而得到类似于该视频中的效果：

![Final result example animation](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e8a990e-6113-4253-bdd0-663045c1aab9/using-dfis-animation.gif)

## 步骤

与其他[网格体距离场（Mesh Distance Field）](/documentation/zh-cn/unreal-engine/mesh-distance-fields-in-unreal-engine)功能不同，DFIS不要求为整个项目启用 **生成网格体距离场（Generate Mesh Distance Fields）**。它可以在网格体级别启用，如以下步骤所述。

1.  在 **内容浏览器（Content Browser）** 中，首先选择任意 **静态网格体（Static Mesh）** 资源，然后双击以打开"静态网格体编辑器（Static Mesh Editor）"。
    
    ![Open Static Mesh asset in the Static Mesh Editor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db484991-2105-4832-8e1b-a5c8a4021fca/01-using-dfis-open-static-asset.png)
2.  在"静态网格体编辑器（Static Mesh Editor）"中，导航至 **细节（Details）** 面板。在 **静态网格体设置（Static Mesh Settings）** 部分中，将 **生成网格体距离场（Generate Mesh Distance Fields）** 设置为启用。启用它后，可以 **保存** 并 **关闭**"静态网格体编辑器（Static Mesh Editor）"。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2d8fe1a-432b-4dc1-afc7-d0366596dce4/02-using-dfis-enable-generating-mdf.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2d8fe1a-432b-4dc1-afc7-d0366596dce4/02-using-dfis-enable-generating-mdf.png)
    
    点击查看全图
    
3.  从 **内容浏览器（Content Browser）** 中，选择 **SM\_MatPreviewMesh\_01** 网格体并将它拖动到关卡 **视口** 中。
    
    ![Drag Static Mesh asset into the Level Viewport](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58b1da63-760f-49b0-9f97-6ebb21430716/03-using-dfis-drag-to-viewport.png)
4.  在关卡中选中该Actor之后，转至 **细节（Details）** 面板并将其 **可移动性（Mobility）** 设置为 **可移动（Movable）**。
    
    ![Set Mobility of the Static Mesh asset to Movable](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c3d5949-3566-41de-a2b8-02b756e781ab/04-using-dfis-setting-mobility-option.png)
5.  然后，在 **照明（Lighting）** 选项卡下面，启用 **距离场间接阴影（Distance Field Indirect Shadow）**。
    
    ![Enable Distance Field Indirect Shadow of the Static Mesh asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e4b0c55-01ef-4cb8-87a8-0a79c73233b7/05-using-dfis-enable-dfis.png)
6.  如果场景尚未进行光照构建，点击 **主** 菜单中的 **构建** 并选择 **仅构建光照（Build Lighting Only）** 来为场景构建光照。
    
    ![Build lighting for the scene](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c57c72f-2189-4e6f-8af7-2dc925cca3bf/06-using-dfis-build-lighting-only.png)

## 最终结果

在有很多反射光照的间接光照区域中，应该可以看到可移动静态网格体能在间接光照区域中投射柔和阴影，而之前并没有阴影投射。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5be7a6b4-73b0-4859-bb0b-f071be731aa5/07-using-dfis-final-result.png)

请记住，在采用直接光照的区域或采用通明光照的区域，间接阴影基本上不存在。

## 其他设置

使用[距离场参考](/documentation/zh-cn/unreal-engine/mesh-distance-fields-properties-in-unreal-engine#actor%E7%BB%84%E4%BB%B6)来了解特定于静态网格体Actor的距离场间接阴影（Distance Field Indirect Shadows）设置。

-   [static mesh](https://dev.epicgames.com/community/search?query=static%20mesh)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [shadows](https://dev.epicgames.com/community/search?query=shadows)
-   [distance fields](https://dev.epicgames.com/community/search?query=distance%20fields)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/using-distance-field-indirect-shadows-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/using-distance-field-indirect-shadows-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [其他设置](/documentation/zh-cn/unreal-engine/using-distance-field-indirect-shadows-in-unreal-engine#%E5%85%B6%E4%BB%96%E8%AE%BE%E7%BD%AE)
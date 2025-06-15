# 虚幻引擎OpenXR立体图层快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/openxr-stereo-layers-quick-start-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:44:03.433Z

---

目录

![OpenXR立体图层快速入门](https://dev.epicgames.com/community/api/documentation/image/1fe38b81-e2c3-4944-9110-d605ac23d3da?resizing_type=fill&width=1920&height=335)

本文介绍了OpenXR项目中立体图层的入门知识。

本文中的步骤和图片均出自[VR模板](/documentation/zh-cn/unreal-engine/vr-template-in-unreal-engine)项目。这些步骤适用于基于OpenXR的所有项目。

要在为项目中的Pawn添加OpenXR立体图层，请按以下步骤操作：

1.  在 **内容侧滑菜单（Content Drawer）** 中，找到 **内容（Content）>VRTemplate>蓝图（Blueprints）** ，双击 **VRPawn** 资产，以便在 **蓝图编辑器（Blueprint Editor）** 中打开它。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b45a9a86-caa0-4e7c-8ebf-72c4fe2463ee/01-select-vr-pawn_ue5.png)
2.  在蓝图编辑器的 **组件（Components）** 面板中，点击 **添加组件（Add Component）** 按钮并搜索 **Stereo Layer** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d832df2-ae63-4195-99a3-16a6dc021a42/02-add-stereo-layer_ue5.png)
3.  将新的 **立体图层（Stereo Layer）** 组件拖到 **摄像机（Camera）** 组件上，使其成为摄像机的子Actor。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/abe107ff-9bb1-4340-81d8-16b53e92e03c/03-stereo-layer_ue5.png)
4.  从组件（Components）列表中选择立体图层组件（Stereo Layer Component），打开其 **细节（Details）** 面板。在 **变换（Transform）** 分段下，将 **位置（Location）** 的 **X** 值设置为 **100** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81991450-1c0b-46d2-ad05-283660946d33/04-change-location_ue5.png)
5.  切换到蓝图编辑器（Blueprint Editor）的 **视口（Viewport）** 选项卡，查看立体图层相对于Pawn摄像机的位置。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88e7fa32-a18c-4713-b66f-f111444df57e/05-select-viewport_ue5.png)
6.  在 **细节（Details）** 面板中 **立体图层（Stereo Layer）** 分段下：
    
    -   将纹理添加到 **纹理（Texture）** 参数。在此示例中，使用的是 **T\_Grid** 纹理。
        
    -   将 **立体图层形状（Stereo Layer Shape）** 设置为 **四边形图层（Quad Layer）** 。
        
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7290fa8-c69b-48c0-b112-461062cb1af9/06-add-texture_ue5.png)
7.  **编译（Compile）** 蓝图并关闭蓝图编辑器。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e941456-2693-4e20-8e00-575a331d2ac0/07-select-compile-button_ue5.png)
8.  点击 **在VR中运行（Play in VR）** ，在头显上启动你的项目，并验证纹理是否显示在你面前并且固定在屏幕画面上。
    
    ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0580646-778e-4d6a-809f-716b85c64935/image_12.gif)

要更改立体图层的显示位置，请更改立体图层类型参数。有关可用选项的细节，请参阅[OpenXR立体图层概述](/documentation/zh-cn/unreal-engine/openxr-stero-layers-overview-in-unreal-engine)。

-   [xr](https://dev.epicgames.com/community/search?query=xr)
-   [vr](https://dev.epicgames.com/community/search?query=vr)
-   [openxr](https://dev.epicgames.com/community/search?query=openxr)
-   [stereo layers](https://dev.epicgames.com/community/search?query=stereo%20layers)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
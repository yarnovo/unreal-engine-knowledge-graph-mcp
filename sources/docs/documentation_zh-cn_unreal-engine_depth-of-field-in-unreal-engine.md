# 虚幻引擎景深 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/depth-of-field-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:22:02.394Z

---

目录

![景深](https://dev.epicgames.com/community/api/documentation/image/74645719-8a16-4eb4-80d3-e1c1f9a99ce9?resizing_type=fill&width=1920&height=335)

与真实世界的摄像机类似，**景深**（DOF）基于距离对焦点前后的场景应用模糊处理。这种效果可以用来基于景深将观者的注意力吸引到特定的拍摄物体上，同时增加美学观感，使渲染看起来更像照片或影片。

## 景深类型

在虚幻引擎中，您可以使用几种方法来执行景深效果。这些方法被分为两大类：

-   **影片：** 此方法向景深效果提供了一种影视的观感。对此方法进行调整可以与摄影和影片摄影中常见的摄像机选项更加一致。该选项对于个人电脑和主机平台来说非常适合。
    
-   **移动：** 该方法提供了移动平台可以接受的最优化、低开销的DOF选项。
    

从以下方法中选择，了解它们的更多功能：

[](/documentation/zh-cn/unreal-engine/cinematic-depth-of-field-in-unreal-engine)

[![过场动画景深](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c0e980d-c73c-4857-bc3e-08a75a94ec69/dof_cine_topic.png)](/documentation/zh-cn/unreal-engine/cinematic-depth-of-field-in-unreal-engine)

[过场动画景深](/documentation/zh-cn/unreal-engine/cinematic-depth-of-field-in-unreal-engine)

[介绍如何在桌面电脑和主机平台项目中使用景深效果。](/documentation/zh-cn/unreal-engine/cinematic-depth-of-field-in-unreal-engine)

[

![移动平台景深方法](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/641bec64-3218-4a1b-8c67-dd2ba7436643/placeholder_topic.png)

移动平台景深方法

介绍如何在移动平台上使用景深方法。





](/documentation/zh-cn/unreal-engine/mobile-depth-of-field-in-unreal-engine)

## 景深实现

景深分为三层（或三个区域）：近景、远景、对焦区域。每一层都单独处理，然后组合在一起来获得最终的图像效果。近景层和远景层的物体总是完全模糊的。它们与非模糊的场景相融合，以获得最终的效果。

![Depth Of Field Implementation](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/706a1468-32f7-47c7-ad6a-0930ad2cf539/ue5_1-depth-of-field-layer-implementation-1.png)

-   对 **焦区域** 内的物体（黑色）使用非模糊场景层。这一层可以很窄，就像这里，它只聚焦于角色，也可以很宽，涵盖场景中的更多前景和后景。
    
-   在对焦区域与近景区域或远景区域之间的过渡区域之外，**近景**（绿色）或 **远景**（蓝色）物体被完全混合到模糊层中，这意味着它们处于失焦状态。
    
-   过渡区域内的物体，例如汽车左侧区域，根据其在对焦区域的过渡区域内的位置，在非模糊场景层（近景、远景）与模糊层之间线性混合。
    

### 可视化景深

这些层，包括过渡区域，可以使用关卡视口中 **显示（Show）** \\> **可视化（Visualize）** 下的 **景深层（Depth of Field Layers）** 显示标签来可视化。

![Scene](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3ebb711-29ba-40fb-8f34-e0d28732b105/ue5_1-1-depth-of-field-visualization-scene-view.png)

![Layer Visualization](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14b0edba-8dbd-4b97-b451-c637324101a7/ue5_1-1-depth-of-field-visualization.png)

Scene

Layer Visualization

可视化 **景深层（Depth of Field Layers）** 还包括与正在使用的DOF方法相关的有用信息，例如当前设置的值，或者当在场景中来回移动鼠标时，鼠标光标旁边显示从摄像机到Actor的距离。

![Visualizing Depth Of Field](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b344e22d-47d0-4544-9ca3-407d1b80a041/ue5_1-depth-of-field-visualization-stats.png)

### 在虚幻编辑器中使用景深

在虚幻编辑器中，有几种不同的方法来使用景深：放置[后期处理体积](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)，使用[摄像机Actor](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine)或[影片摄像机Actor](/documentation/zh-cn/unreal-engine/cinematic-depth-of-field-in-unreal-engine#postprocessvolumeandcameraactor)。每种方法都可以经由[后期处理体积和摄像机](/documentation/zh-cn/unreal-engine/cinematic-depth-of-field-in-unreal-engine#%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E4%BD%93%E7%A7%AF%E5%92%8C%E6%91%84%E5%83%8F%E6%9C%BAactor)访问DOF属性。对于[影视级摄像机](/documentation/zh-cn/unreal-engine/cinematic-depth-of-field-in-unreal-engine#cinematiccamera)，摄像机和镜头还有一些额外的行业标准设置。

可以在 **镜头（Lens）** 选项卡下的 **摄像机（Camera）** 和 **景深（Depth of Field）** 部分访问使用的大多数设置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba94b04d-4ce4-424e-8389-98158ca6054a/ue5_1-depth-of-field-properties.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba94b04d-4ce4-424e-8389-98158ca6054a/ue5_1-depth-of-field-properties.png)

单击图像以查看完整尺寸。

使用[影片摄像机Actor](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine)时，可以在 **当前摄像机设置（Current Camera Settings）** 下的 **镜头设置（Lens Settings）** 部分中找到影响景深的替换属性。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73a48f88-5e27-41df-a3f3-92df8f0d81cd/ue5_1-depth-of-field-properties-cine-camera-actor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73a48f88-5e27-41df-a3f3-92df8f0d81cd/ue5_1-depth-of-field-properties-cine-camera-actor.png)

单击图像以查看完整尺寸。

如果您正在使用摄像机或影片摄像机Actor，您可以在关卡视口中使用Actor控制来控制它们，方法是选择 **视角（Perspective）**，并从场景中 **已放置摄像机（Placed Cameras）** 中选择。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5668b07a-a807-4e84-83bb-d44b39c9865d/ue5_1-depth-of-field-pilot-camera.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5668b07a-a807-4e84-83bb-d44b39c9865d/ue5_1-depth-of-field-pilot-camera.png)

单击图像以查看完整尺寸。

关卡视口将定位于摄像机的视图，同时表明您正在控制和查看摄像机所看到的内容。

![Level Viewport](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e441970-5cba-432b-b3b5-549dc0087f18/ue5_1-depth-of-field-pilot-camera-status.png)

摄像机或后期处理体积（如果摄像机位于其中）中发生更改的任何属性将立即在视口中生效。 

要获得与上面镜头类似的效果，关键是使用小 **孔径（F制光圈）（Aperture (f-stop)）** 来获得大散景形状，将摄像机或视口移向距离物体更近的位置，并降低 **视野（Field of View）** (FOV)。然后，调整 **对焦距离（Focus Distance）**，使对焦平面前后的部分场景内容失焦。

### 使用过程动画摄像机的调试对焦平面

当使用[影片摄像机](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine)时，启用 **绘制调试对焦平面（Draw Debug Focus Plane）** 以查看焦点在关卡中所放置的位置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80ca44bf-60cf-49c2-99f8-9bdc9e3f73f4/ue5_1-properties-cine-camera-actor-draw-focus-plane.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80ca44bf-60cf-49c2-99f8-9bdc9e3f73f4/ue5_1-properties-cine-camera-actor-draw-focus-plane.png)

单击图像以查看完整尺寸。

当启用时，将在摄像机中当前设置的 **手动对焦距离（Manual Focus Distance）** 处绘制对焦平面。在这种情况下，角色是焦点，一切清晰、聚焦。在对焦平面前后的任何物体都将失焦。

![Draw Debug Focus Plane: Disabled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83ccc012-532a-4f8e-971d-e0369dd283b6/ue5_1-debug-focus-plane-disabled.png)

![Draw Debug Focus Plane: Enabled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/396e6c8c-65cb-4a80-b4e0-95dd44fe4ef9/ue5_1-debug-focus-plane-enabled.png)

Draw Debug Focus Plane: Disabled

Draw Debug Focus Plane: Enabled

使用 **调试对焦平面颜色** 自定义正在绘制的对焦平面RGBA颜色值。在可能难以看到正在绘制的对焦平面的场景中，此功能非常有用。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [post process](https://dev.epicgames.com/community/search?query=post%20process)
-   [depth of field](https://dev.epicgames.com/community/search?query=depth%20of%20field)
-   [dof](https://dev.epicgames.com/community/search?query=dof)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [景深类型](/documentation/zh-cn/unreal-engine/depth-of-field-in-unreal-engine#%E6%99%AF%E6%B7%B1%E7%B1%BB%E5%9E%8B)
-   [景深实现](/documentation/zh-cn/unreal-engine/depth-of-field-in-unreal-engine#%E6%99%AF%E6%B7%B1%E5%AE%9E%E7%8E%B0)
-   [可视化景深](/documentation/zh-cn/unreal-engine/depth-of-field-in-unreal-engine#%E5%8F%AF%E8%A7%86%E5%8C%96%E6%99%AF%E6%B7%B1)
-   [在虚幻编辑器中使用景深](/documentation/zh-cn/unreal-engine/depth-of-field-in-unreal-engine#%E5%9C%A8%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%99%AF%E6%B7%B1)
-   [使用过程动画摄像机的调试对焦平面](/documentation/zh-cn/unreal-engine/depth-of-field-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%BF%87%E7%A8%8B%E5%8A%A8%E7%94%BB%E6%91%84%E5%83%8F%E6%9C%BA%E7%9A%84%E8%B0%83%E8%AF%95%E5%AF%B9%E7%84%A6%E5%B9%B3%E9%9D%A2)
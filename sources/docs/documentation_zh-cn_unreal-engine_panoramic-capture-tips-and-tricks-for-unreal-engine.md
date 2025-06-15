# 虚幻引擎全景采集提示和技巧 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/panoramic-capture-tips-and-tricks-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:30:41.749Z

---

目录

![全景采集提示和技巧](https://dev.epicgames.com/community/api/documentation/image/d233326f-3681-415c-a92f-8f7c8d9bea80?resizing_type=fill&width=1920&height=335)

学习使用此**Deprecated**功能，但在发布产品中需要谨慎使用。

Epic Games不再支持或维护全景采集插件。它只在你希望自行创建解决方案时作为参考存在。该插件可能无法正常工作。

在以下部分中，我们将了解使用全景采集插件时最常见的错误和问题，以及解决和回避方法。

## 采集速度缓慢

立体图像的默认采集分辨率为6K，这需要消耗大量的资源。为了减少图像采集对资源的影响，可以降低为 **SP.StepCaptureWidth** 指定的值，以减少图像采集的大小。这只需在 **BP\_Capture** 蓝图中将 **SP.StepCaptureWidth** 的值从6144（6k）改为1024（1K）即可。

## 图像失真

因为立体图像创建的方式，图像的顶部和底部会出现一些失真/挤压。可在下图中看到这种失真/挤压的范例。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a88d187-e8fa-4b59-a387-e10ac210c369/tp_image_distortion.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a88d187-e8fa-4b59-a387-e10ac210c369/tp_image_distortion.png)

点击查看全图。

虽然无法消除失真，但可执行一些操作使其降至最低。以下的数个技巧可处理这个失真/挤压问题。

-   可如下图所示添加一个小的梯度，使图像底部和/或顶部淡出为黑色，隐藏失真/挤压问题。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58a6d48e-df09-4e8f-8d05-b0b5ba3674ac/tp_image_distortion_fix.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58a6d48e-df09-4e8f-8d05-b0b5ba3674ac/tp_image_distortion_fix.png)
    
    点击查看全图。
    
-   要小心过于靠近摄像机的对象，它会导致发散，使用户难以聚焦于 3D 图像。虽然在一些情况下图像发散无法避免，但可以通过摄像机的放置来减轻此效果。以下视频说明了如何在图像中拥有不同程度的发散。
    
    因为滑翔机顶部十分靠近进行采集的摄像机，用户上抬摄像机时将难以使图像上部处于焦距之中。然而下垂摄像机时则不会存在焦距的问题，因为地面离摄像机足够远，不存在发散的问题。
    

## 无法使用的部分效果

在屏幕空间中创建的效果，或正对摄像机的效果无法和全景采集工具共用。这意味着应该禁用以下类型的效果，使图像中不会出现错误。

-   光束
-   基于屏幕的失真效果
-   正对摄像机的网格体或粒子
-   晕光

请注意：未列于此处的其他效果也可能无法采集。如出现相似的穿帮，将尝试禁用效果并重新采集图像，确认穿帮是否消失。

下图说明尝试采集拥有基于屏幕效果的内容或正对摄像机的内容时会出现的情况。查看图像中标出的区域，您会发现远处的云中出现了硬线条。采集工具进行场景采集的方式是在水平和垂直轴上对图像进行一系列的聚焦，这是出现此线的原因。正对摄像机的效果并不知晓摄像机已经移动，也不会随之更新朝向，因此图像中才会出现穿帮。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ae41ac2-668e-4788-8d9b-1d2f7a51e554/tp_screen_based_effects_not_working.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ae41ac2-668e-4788-8d9b-1d2f7a51e554/tp_screen_based_effects_not_working.png)

点击查看全图。

-   [cinematics](https://dev.epicgames.com/community/search?query=cinematics)
-   [plugins](https://dev.epicgames.com/community/search?query=plugins)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [virtual reality](https://dev.epicgames.com/community/search?query=virtual%20reality)
-   [vr](https://dev.epicgames.com/community/search?query=vr)
-   [deprecated](https://dev.epicgames.com/community/search?query=deprecated)
-   [gearvr](https://dev.epicgames.com/community/search?query=gearvr)
-   [steamvr](https://dev.epicgames.com/community/search?query=steamvr)
-   [google vr](https://dev.epicgames.com/community/search?query=google%20vr)
-   [oculus rift](https://dev.epicgames.com/community/search?query=oculus%20rift)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [采集速度缓慢](/documentation/zh-cn/unreal-engine/panoramic-capture-tips-and-tricks-for-unreal-engine#%E9%87%87%E9%9B%86%E9%80%9F%E5%BA%A6%E7%BC%93%E6%85%A2)
-   [图像失真](/documentation/zh-cn/unreal-engine/panoramic-capture-tips-and-tricks-for-unreal-engine#%E5%9B%BE%E5%83%8F%E5%A4%B1%E7%9C%9F)
-   [无法使用的部分效果](/documentation/zh-cn/unreal-engine/panoramic-capture-tips-and-tricks-for-unreal-engine#%E6%97%A0%E6%B3%95%E4%BD%BF%E7%94%A8%E7%9A%84%E9%83%A8%E5%88%86%E6%95%88%E6%9E%9C)
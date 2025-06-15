# 虚幻引擎移动端功能级别和渲染模式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mobile-feature-levels-and-rendering-modes-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:59:14.109Z

---

目录

![功能级别和渲染模式](https://dev.epicgames.com/community/api/documentation/image/761d50ae-01fd-448e-92c0-5522fc58399d?resizing_type=fill&width=1920&height=335)

本文已经 **废弃**，将在未来的更新中被移除。请查看以下文档：

-   关于移动端功能级别的信息，请查看[移动端渲染功能](/documentation/zh-cn/unreal-engine/rendering-features-for-mobile-games-in-unreal-engine)的首页。
-   关于移动端前向和延迟着色模式的信息，请查看[移动着色模式](/documentation/zh-cn/unreal-engine/mobile-rendering-and-shading-modes-for-unreal-engine)一文。
-   关于移动端延迟着色模式的详情，请参阅[移动延迟着色](/documentation/zh-cn/unreal-engine/using-the-mobile-deferred-shading-mode-in-unreal-engine)一文。
-   关于台式机渲染器的信息，请参阅[移动平台上的台式机渲染器](/documentation/zh-cn/unreal-engine/using-the-desktop-renderer-on-mobile-in-unreal-engine)一文。

本文中的一些功能是实验性或测试性功能。在项目中使用这些功能时要谨慎，并且避免在即将发布的项目中使用实验性功能。

**虚拟引擎（Unreal Engine）** 的移动渲染器提供单独的渲染路径， 它独立于桌面和主机渲染器，针对各种移动设备进行优化，例如移动电话和平板电脑。此渲染器可以通过多种方式进行配置，以符合特定设备和应用程序的需求。此页面提供了参考，介绍这些选项的位置以及如何配置这些选项。

## 功能级别

移动渲染器的基本 **功能级别（Feature Levels）** 如下所示：

功能级别

说明

OpenGL ES 3.2

Android设备的默认功能级别。你可以在 **项目设置（Project Settings）** > **平台（Platforms）** > **Android材质质量 - ES31（Android Material Quality - ES31）** 中配置此功能级别的材质设置。

Android Vulkan

一种可用于某些特定Android设备的高端渲染器。如需有关如何在你的项目中使用Vulkan以及哪些GPU支持Vulkan的信息，请参见我们在[Android Vulkan移动渲染器](/documentation/zh-cn/unreal-engine/using-the-android-vulkan-mobile-renderer-in-unreal-engine)上的指南。

Metal 2.0

用于iOS设备的功能级别。你可以在 **项目设置（Project Settings）** > **平台（Platforms）** > **iOS材质质量 （iOSMaterial Quality）** 中配置此功能级别的材质设置。

对高级移动渲染功能的支持会因应用程序所用功能级别而异。如需更多信息，请参考[移动渲染功能](/documentation/zh-cn/unreal-engine/rendering-features-for-mobile-games-in-unreal-engine)部分中各个功能的相关文档。

## 移动端HDR

**移动高清渲染（HDR）** 用于实现各种高端后期处理和渲染功能。

## 使用延迟着色（实验版）

**延迟着色（Deferred shading）** 为高质量反射、多个动态光线、光照贴花和其他高级照明功能提供支持，这些功能在移动设备的默认前向渲染模式中通常不可用。

![移动前向反射（旧）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0cc4e16d-2c6d-414f-9c9f-c33f00fa9a7c/mobilerenderingold.png)

![移动延迟反射（新）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dcd18f75-7790-408b-8000-9bb98e96f815/mobilerenderingnew.png)

移动前向反射（旧）

移动延迟反射（新）

要启用延迟着色，请将以下CVar添加到你的 `DefaultEngine.ini`：

DefaultEngine.ini

```cpp
	r.Mobile.ShadingPath=1

```

## 在移动设备上使用桌面渲染器（对于Android为实验版，对于iOS为测试版）

虚幻现在为iOS设备和使用Vulkan的Android设备提供前向和延迟桌面渲染。此功能目前对于Vulkan为实验版，对于iOS为试用版。

-   iOS实施在功能就绪情况方面被视为试用版。
-   Android Vulkan实施被视为实验版。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04c82c51-6cf3-4ccb-80d8-816df719ed0b/ipadusingdefferedrender.png)

使用桌面前向渲染器在iPad Pro上运行的Infiltrator演示。

要为iOS启用桌面渲染器，请打开你的项目设置，然后导航至 **平台（Platforms）** > **iOS** > **渲染（Rendering）** 并启用 **Metal桌面渲染器（Metal Desktop Renderer）**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65b34a35-e7f0-4250-a1dc-d658c5830ef4/enablerenderingdesktop.png)

要为Android Vulkan启用桌面渲染器，请导航至 **平台（Platforms）** > **Android** > **编译（Build）** 并启用 **支持Vulkan桌面\[实验版\]（Support Vulkan Desktop \[Experimental\]）**。

你还需要将 `r.Android.DisableVulkanSM5Support` 设置为 *0*，以允许使用SM5。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ddc3392-6bbd-4b76-906d-14d865e3e6bd/supportvulkan.png)

必须重启虚幻编辑器，以使更改生效。随后即可采用与在桌面应用程序中相同的方式来配置前向和延迟渲染功能。

如需这些渲染选项的更多信息，请参考[前向着色渲染器指南](/documentation/zh-cn/unreal-engine/forward-shading-renderer-in-unreal-engine)。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [renderer](https://dev.epicgames.com/community/search?query=renderer)
-   [mobile renderer](https://dev.epicgames.com/community/search?query=mobile%20renderer)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [功能级别](/documentation/zh-cn/unreal-engine/mobile-feature-levels-and-rendering-modes-in-unreal-engine#%E5%8A%9F%E8%83%BD%E7%BA%A7%E5%88%AB)
-   [移动端HDR](/documentation/zh-cn/unreal-engine/mobile-feature-levels-and-rendering-modes-in-unreal-engine#%E7%A7%BB%E5%8A%A8%E7%AB%AFhdr)
-   [使用延迟着色（实验版）](/documentation/zh-cn/unreal-engine/mobile-feature-levels-and-rendering-modes-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%BB%B6%E8%BF%9F%E7%9D%80%E8%89%B2%EF%BC%88%E5%AE%9E%E9%AA%8C%E7%89%88%EF%BC%89)
-   [在移动设备上使用桌面渲染器（对于Android为实验版，对于iOS为测试版）](/documentation/zh-cn/unreal-engine/mobile-feature-levels-and-rendering-modes-in-unreal-engine#%E5%9C%A8%E7%A7%BB%E5%8A%A8%E8%AE%BE%E5%A4%87%E4%B8%8A%E4%BD%BF%E7%94%A8%E6%A1%8C%E9%9D%A2%E6%B8%B2%E6%9F%93%E5%99%A8%EF%BC%88%E5%AF%B9%E4%BA%8Eandroid%E4%B8%BA%E5%AE%9E%E9%AA%8C%E7%89%88%EF%BC%8C%E5%AF%B9%E4%BA%8Eios%E4%B8%BA%E6%B5%8B%E8%AF%95%E7%89%88%EF%BC%89)
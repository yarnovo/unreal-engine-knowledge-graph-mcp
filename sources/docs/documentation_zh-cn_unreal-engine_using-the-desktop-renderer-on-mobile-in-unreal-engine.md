# 在虚幻引擎中使用移动端桌面渲染器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-desktop-renderer-on-mobile-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:59:33.420Z

---

目录

![移动端桌面渲染器](https://dev.epicgames.com/community/api/documentation/image/bd716d9c-632e-4b26-ab6f-1f6702a9245c?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

虚幻引擎（UE）为iOS设备和使用Vulkan的Android设备提供前向和延迟桌面渲染器支持。这将使用与PC和主机平台相同的渲染路径。

在功能就绪方面，桌面渲染器的iOS实现方案被视为测试版。Android Vulkan实现方案被视为试验版。

## 如何在移动端启用桌面渲染器

以下小节介绍了如何在iOS和Android上启用桌面渲染器。

### iOS/tvOS/iPadOS

要为iOS启用桌面渲染器，请按照以下步骤操作：

1.  打开你的 **项目设置（Project Settings）** 。
    
2.  找到 **平台（Platforms）**\> **iOS** \> **渲染（Rendering）** 。
    
3.  启用 **Metal桌面渲染器（Metal Desktop Renderer）** 。
    

### Android Vulkan

要为Android Vulkan启用桌面渲染器，请按照以下步骤操作：

1.  打开你的 **项目设置（Project Settings）** 。
    
2.  找到 **平台（Platforms）** > **Android** \> **构建（Build）** 。
    
3.  启用 **支持Vulkan桌面（Support Vulkan Desktop）\[试验性\]** 。
    
4.  将 `r.Android.DisableVulkanSupport` 设置为0，以确保启用Android Vulkan。
    
5.  将 `r.Android.DisableVulkanSM5Support` 设置为 `0`，以允许使用着色器模型5 (SM5)。
    

### 完成设置并配置桌面渲染器

必须重启虚幻编辑器，以使更改生效。随后即可采用与在桌面应用程序中相同的方式来配置前向和延迟渲染功能。

## 设备兼容性

桌面渲染器仅适用于可使用着色器模型5（SM5）的移动设备。

## 优势

此桌面渲染器提供与台式机和游戏主机一致的高保真渲染。

## 缺点

与移动前向和移动延迟着色路径相比，桌面渲染器的资源开销较高，并且大多数移动硬件的设置方式无法支持高效运行桌面渲染器。

## 何时使用桌面渲染器

对于iOS设备，该桌面渲染器被视为测试版，对于Android Vulkan，被视为试验版。我们不建议将其用于已发布项目，但如果你决定试用该功能，欢迎你提供反馈。

-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [mobile rendering](https://dev.epicgames.com/community/search?query=mobile%20rendering)
-   [desktop renderer](https://dev.epicgames.com/community/search?query=desktop%20renderer)
-   [desktop renderer on mobile](https://dev.epicgames.com/community/search?query=desktop%20renderer%20on%20mobile)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [如何在移动端启用桌面渲染器](/documentation/zh-cn/unreal-engine/using-the-desktop-renderer-on-mobile-in-unreal-engine#%E5%A6%82%E4%BD%95%E5%9C%A8%E7%A7%BB%E5%8A%A8%E7%AB%AF%E5%90%AF%E7%94%A8%E6%A1%8C%E9%9D%A2%E6%B8%B2%E6%9F%93%E5%99%A8)
-   [iOS/tvOS/iPadOS](/documentation/zh-cn/unreal-engine/using-the-desktop-renderer-on-mobile-in-unreal-engine#ios/tvos/ipados)
-   [Android Vulkan](/documentation/zh-cn/unreal-engine/using-the-desktop-renderer-on-mobile-in-unreal-engine#androidvulkan)
-   [完成设置并配置桌面渲染器](/documentation/zh-cn/unreal-engine/using-the-desktop-renderer-on-mobile-in-unreal-engine#%E5%AE%8C%E6%88%90%E8%AE%BE%E7%BD%AE%E5%B9%B6%E9%85%8D%E7%BD%AE%E6%A1%8C%E9%9D%A2%E6%B8%B2%E6%9F%93%E5%99%A8)
-   [设备兼容性](/documentation/zh-cn/unreal-engine/using-the-desktop-renderer-on-mobile-in-unreal-engine#%E8%AE%BE%E5%A4%87%E5%85%BC%E5%AE%B9%E6%80%A7)
-   [优势](/documentation/zh-cn/unreal-engine/using-the-desktop-renderer-on-mobile-in-unreal-engine#%E4%BC%98%E5%8A%BF)
-   [缺点](/documentation/zh-cn/unreal-engine/using-the-desktop-renderer-on-mobile-in-unreal-engine#%E7%BC%BA%E7%82%B9)
-   [何时使用桌面渲染器](/documentation/zh-cn/unreal-engine/using-the-desktop-renderer-on-mobile-in-unreal-engine#%E4%BD%95%E6%97%B6%E4%BD%BF%E7%94%A8%E6%A1%8C%E9%9D%A2%E6%B8%B2%E6%9F%93%E5%99%A8)
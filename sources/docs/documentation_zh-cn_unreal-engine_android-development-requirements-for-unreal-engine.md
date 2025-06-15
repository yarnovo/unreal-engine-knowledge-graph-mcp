# 虚幻引擎Android开发要求 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/android-development-requirements-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:00:40.345Z

---

目录

![Android开发要求](https://dev.epicgames.com/community/api/documentation/image/2a4f2adb-a487-48e6-b620-379f6c5c473c?resizing_type=fill&width=1920&height=335)

本页包含了为Android设备开发虚幻引擎项目所需的软件开发工具包(SDK)要求，以及当前版本UE的兼容硬件。

## 当前SDK信息

自2024年8月31日起，Google Play商店要求应用程序针对Android 14进行适配，这需要API级别34。 要在Google Play商店发布新应用程序，你必须更新到UE 5.4.4或更高版本以支持目标SDK 34。 使用旧版虚幻引擎编译的应用程序将无法再成功提交。   
  
如需更多信息，请参阅[Google Play关于目标API级别要求的Android文档](https://developer.android.com/google/play/requirements/target-sdk)。

-   当前UE版本：5.6
    
-   Android Studio版本：Koala 2024.1.2 2024年8月29日
    
-   Android SDK：
    
    -   推荐版本：SDK 34
        
    -   用于编译的最低版本：SDK 34
        
    -   用于在设备上发布的默认目标SDK版本：34
        
    -   最低安装SDK级别：26
        
        不同商城对于目标SDK最低版本的要求是不同的，可能与上文有所不同。
        
-   NDK版本：  r25b
    
-   编译工具：34.0.0
    
-   Java运行时： OpenJDK 21.0.3 2024-04-16
    
-   [AGDE调试](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/debugging-unreal-engine-projects-for-android-in-visual-studio-with-the-agde-plugin)需要AGDE v23.2.91+。
    

## 当前兼容设备

UE支持满足以下硬件规格的Android设备。

-   Android 8或更高版本
    
-   64位Arm CPU
    
-   UE 5.6支持4KB和16KB页面大小
    
-   兼容的GPU
    
    -   Mali T8xx、G68、G71、G72、G76、G77、G78或G7xx系列
        
    -   Adreno 5xx、6xx或7xx系列
        
    -   PowerVR GM9xxx系列
        
    -   三星Xclipse 9xx系列
        
-   兼容的图形API
    
    -   OpenGL ES 3.2
        
    -   Vulkan 1.1（需要Android 10或更高版本的设备，以及兼容的驱动程序）
        

## 版本历史记录

UE版本

Android Studio版本

最低Android SDK版本

Android NDK版本

说明

5.6

  

Koala 2024.1.2 2024年8月29日

推荐版本：SDK 34

最低版本：SDK 34

NDK r25b

Supports 16kb memory page size.

5.5

Koala 2024.1.2 2024年8月29日

推荐版本：SDK 34

最低版本：SDK 34

NDK r25b

5.3-5.4

Flamingo 2022.2.1 Patch 2 2023年5月24日

推荐版本：SDK 33

最低版本：SDK 30

NDK r25b

5.1-5.2

Android Studio 4.0

推荐版本：SDK 32

最低版本：SDK 30

NDK r25b

虽然在系统中编译最低需要SDK 30，但是对于要发布项目的目标设备最低可以使用SDK 26。

5.0

Android Studio 4.0

SDK 23

NDK r21e

使用Android文件服务器（AFS）所需的最低SDK版本是26。

-   [specifications](https://dev.epicgames.com/community/search?query=specifications)
-   [android](https://dev.epicgames.com/community/search?query=android)
-   [compatibility](https://dev.epicgames.com/community/search?query=compatibility)
-   [sdk](https://dev.epicgames.com/community/search?query=sdk)
-   [平台交付](https://dev.epicgames.com/community/search?query=%E5%B9%B3%E5%8F%B0%E4%BA%A4%E4%BB%98)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [当前SDK信息](/documentation/zh-cn/unreal-engine/android-development-requirements-for-unreal-engine#current-sdk-information)
-   [当前兼容设备](/documentation/zh-cn/unreal-engine/android-development-requirements-for-unreal-engine#current-compatible-devices)
-   [版本历史记录](/documentation/zh-cn/unreal-engine/android-development-requirements-for-unreal-engine#%E7%89%88%E6%9C%AC%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95)
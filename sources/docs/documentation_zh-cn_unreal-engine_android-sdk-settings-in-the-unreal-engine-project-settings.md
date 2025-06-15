# 虚幻引擎项目设置中的Android SDK设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/android-sdk-settings-in-the-unreal-engine-project-settings
> 
> 生成时间: 2025-06-14T18:55:51.379Z

---

目录

![Android SDK](https://dev.epicgames.com/community/api/documentation/image/de53439f-0867-4bc7-9ffb-34d2b4d2b054?resizing_type=fill&width=1920&height=335)

## Android SDK

### SDK配置

**设置**

**说明**

**Android SDK的位置（Location of Android SDK）**

Android SDK的磁盘上位置（如果此字段为空白，则回退到 `ANDROID_HOME` 环境变量）。

该目录通常包含 `android-sdk-` 。

**Android NDK的位置（Location of Android NDK）**

Android NDK的磁盘上位置（如果此字段为空白，则回退到 `NDKROOT` 环境变量）。

该目录通常包含 `android-ndk-` 。

**JAVA的位置（Location of JAVA）**

Java的磁盘上位置（如果此字段留空，则回退到 `JAVA_HOME` 环境变量）。

该目录通常包含 `jdk` 。

**SDK API级别（SDK API Level）**

定义使用哪个SDK来打包和编译Java。

你可以使用：

-   具体版本。
-   `latest` 以表示磁盘上的最新版本。
-   `matchndk` 以匹配NDK API级别。

**NDK API级别（NDK API Level）**

定义使用哪个NDK来编译（具体版本，或 `latest` 以表示磁盘上的最新版本）。

若选择 `android-21` 或更高版本，将导致应用不会在5.0之前版本的设备上运行。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [basics](https://dev.epicgames.com/community/search?query=basics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Android SDK](/documentation/zh-cn/unreal-engine/android-sdk-settings-in-the-unreal-engine-project-settings#androidsdk)
-   [SDK配置](/documentation/zh-cn/unreal-engine/android-sdk-settings-in-the-unreal-engine-project-settings#sdk%E9%85%8D%E7%BD%AE)
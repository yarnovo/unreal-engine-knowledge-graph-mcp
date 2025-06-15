# 虚幻引擎MacOS开发要求 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/macos-development-requirements-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:47:32.451Z

---

目录

![MacOS开发要求](https://dev.epicgames.com/community/api/documentation/image/57816ba6-ecf6-4404-ac98-8e6f59940101?resizing_type=fill&width=1920&height=335)

本文介绍了在MacOS上开发虚幻引擎（UE）项目所需的软件开发工具包（SDK）要求。

## 推荐硬件

**Recommended Operating System**

Latest macOS Sonoma 14

**Recommended Processor**

Apple Silicon M3

**Minimum Processor**

M1 or M2 depending on rendering features

**Recommended Memory**

32 GB or more

**Minimum Memory**

16 GB

**Video Card**

Metal 1.2 Compatible Graphics Card

## 最低软件要求

运行引擎或编辑器的最低要求如下。

Running the Engine

 

**Minimum Operating System**

Sonoma 14.0

程序员使用该引擎开发的要求如下。

Developing with the Engine

 

**Recommended Xcode Version**

15.4 or newer

**Minimum Xcode Version**

Xcode 15.2

Although Xcode is preferred for macOS development, Unreal Engine also supports VS Code and Rider.

## UE5渲染功能要求

UE5 Feature

System Requirements

**Lumen Global Illumination and Reflections with Software Ray Tracing**

Apple computers with an Intel and AMD Based GPU and/or Apple Silicon M1+.

To learn more see, [Lumen Technical Details](building-virtual-worlds/lighting-and-shadows/global-illumination/lumen/TechOverview).

**Lumen Global Illumination and Reflections with Hardware Ray Tracing and MegaLights**

Not currently supported.

To learn more see, [Lumen Technical Details](building-virtual-worlds/lighting-and-shadows/global-illumination/lumen/TechOverview).

**Nanite Virtualized Geometry and Virtual Shadow Maps**

Apple Silicon M2+ (beta support).

To learn more see, [Nanite Virtualized Geometry](designing-visuals-rendering-and-graphics/rendering-optimization/nanite).

**Temporal Super Resolution**

Apple computers with an Intel and AMD Based GPU and/or Apple Silicon M1+.

To learn more see, [Temporal Super Resolution](https://dev.epicgames.com/documentation/en-us/unreal-engine/temporal-super-resolution-in-unreal-engine).

There are some runtime costs to be aware of. To learn more see the [Anti-aliasing Performance](https://www.unrealengine.com/en-US/tech-blog/unreal-engine-5-2-brings-native-support-for-apple-silicon-and-other-developments-for-macos) section of our tech blog.

## 版本历史记录

UE版本

最低macOS版本

推荐macOS版本

最低Xcode版本

推荐Xcode版本

说明

5.6 

Sonoma 14.0

最新的macOS 14 Sonoma

Xcode 15.2

15.4或更高版本

5.5

Ventura 13.5

最新版macOS 13 Ventura

Xcode 15.2

15.4或更高版本

5.4

macOS 13 Ventura

最新版macOS 13 Ventura

Xcode 14.1

最新版Xcode 14

5.2 - 5.3

macOS 12.5 Monterey

最新版macOS 13 Ventura

Xcode 14.1

最新版Xcode 14

虚幻编辑器及通用二进制文件通过Epic Games启动程序分发到macOS上。 通用二进制文件需要使用代码插件才能被视为与macOS兼容。

MacOS要求现已更新，以与iOS要求保持一致。

5.1

macOS 12 Monterey

最新版macOS 13 Ventura

Xcode 13.4.1

最新版Xcode 14

对于macOS目标，编辑器和项目构建都已实现对Apple Silicon的原生支持。 编辑器对Apple Silicon的支持还在实验阶段。 某些第三方SDK和插件尚未包含ARM64切片，可能存在兼容问题。

5.0

macOS Catalina 10.15.7

最新版macOS Monterey

Xcode 12.4

最新版Xcode 13

初步添加了macOS目标对Apple Silicon的原生支持。 某些SDK尚不包含ARM64切片（例如 Steam，Vivox）。

-   [specifications](https://dev.epicgames.com/community/search?query=specifications)
-   [macos](https://dev.epicgames.com/community/search?query=macos)
-   [compatibility](https://dev.epicgames.com/community/search?query=compatibility)
-   [sdk](https://dev.epicgames.com/community/search?query=sdk)
-   [平台交付](https://dev.epicgames.com/community/search?query=%E5%B9%B3%E5%8F%B0%E4%BA%A4%E4%BB%98)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [推荐硬件](/documentation/zh-cn/unreal-engine/macos-development-requirements-for-unreal-engine#recommended-hardware)
-   [最低软件要求](/documentation/zh-cn/unreal-engine/macos-development-requirements-for-unreal-engine#minimum-software-requirements)
-   [UE5渲染功能要求](/documentation/zh-cn/unreal-engine/macos-development-requirements-for-unreal-engine#requirements-for-ue5-rendering-features)
-   [版本历史记录](/documentation/zh-cn/unreal-engine/macos-development-requirements-for-unreal-engine#version-history)
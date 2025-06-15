# 虚幻引擎中的整合NVIDIA的SLI交替帧渲染技术，对通过SLI使用多PUC的游戏提供支持。 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/nvidia-sli-alternative-frame-rendering-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:25:27.439Z

---

目录

![NVIDIA SLI交替帧渲染](https://dev.epicgames.com/community/api/documentation/image/0bf24245-08f4-47d3-b19e-6602d17eb69c?resizing_type=fill&width=1920&height=335)

虚幻引擎为在NVIDIA SLI配置上运行的打包游戏提供NVIDIA的 **交替帧渲染（Alternate Frame Rendering）**（AFR）支持。交替帧渲染的工作原理是在连接的GPU之间交替渲染帧。一帧由GPU1渲染，下一帧则由GPU2 渲染，然后重复此过程。通过这种方法，在单个显示器上使用多个GPU就能提升图像质量和性能。

有意愿使用交替帧渲染的项目需要直接和NVIDIA合作，测试游戏并使其在必要时自动切换使用此功能。

如需了解更多详情，请参阅NVIDIA文档[SLI 模式，特别说明交替帧渲染](https://docs.nvidia.com/gameworks/content/technologies/desktop/sli.htm)。

## 强制启用交替帧渲染

NVIDIA控制面板允许手动添加一些支持ARF强制启用SLI渲染模式的应用程序。如需将应用程序添加到NVIDIA控制面板，请按以下步骤操作：

1.  从任务托盘中打开 **NVIDIA控制面板**，然后找到 **管理3D设置（Manage 3D Settings）**。
2.  点击 **项目设置（Program Settings）** 标签，然后在 **选择程序并自定义（Select a program to cumstomize）** 下拉菜单中选择要添加的程序。
3.  在 **SLI渲染模式（SLI Rendering Mode）** 的选项旁选择 **强制交替帧渲染（Force Alternate Frame Rendering）**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6130af55-e907-4164-88be-afc385167276/afrsetting.jpg)

此功能并不能保证能改善应用程序的质量或性能，因此尤其不推荐结合虚幻引擎编辑器使用。如果想要为开发中或已发布的项目使用此功能，请直接与NVIDIA联系，使用其提供的驱动设置此功能。

-   [plugins](https://dev.epicgames.com/community/search?query=plugins)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [nvidia](https://dev.epicgames.com/community/search?query=nvidia)
-   [third-party](https://dev.epicgames.com/community/search?query=third-party)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [强制启用交替帧渲染](/documentation/zh-cn/unreal-engine/nvidia-sli-alternative-frame-rendering-in-unreal-engine#%E5%BC%BA%E5%88%B6%E5%90%AF%E7%94%A8%E4%BA%A4%E6%9B%BF%E5%B8%A7%E6%B8%B2%E6%9F%93)
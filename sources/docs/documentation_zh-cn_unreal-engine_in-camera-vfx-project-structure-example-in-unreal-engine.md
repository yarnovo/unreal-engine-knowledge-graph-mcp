# 虚幻编辑器中的摄像机视觉特效处理项目结构示例 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/in-camera-vfx-project-structure-example-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:25:42.446Z

---

目录

![ICVFX项目结构示例](https://dev.epicgames.com/community/api/documentation/image/355a39f7-11f1-48bd-9362-9112ad90f1a3?resizing_type=fill&width=1920&height=335)

**摄像机视觉特效处理制片结构示例（In-Camera VFX Production Structure Example）** 旨在为虚拟制片项目提供干净的示例组织结构。你可以复制该结构，并根据你的项目要求酌情修改。所述结构基于[摄像机视觉特效处理制片测试](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine)的结构，进行了扩展，以涵盖更多常见用例。

### 内容浏览器文件夹

在 **内容浏览器（Content Browser）** 的 **内容（Content）** 文件夹中，创建以项目名称命名的文件夹，用于专门保存项目的内容。根据需要创建名为Common的文件夹，它将包含与其他项目共享的内容。

不要将创建项目时由UE创建的项目（Project）文件夹（整个项目的根文件夹）与你在内容浏览器中使用项目名称创建的文件夹相混淆。我们建议改动一下名称，以免混淆。

![内容浏览器中推荐的项目结构顶级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/831b2fb1-de11-4692-894b-092848debb07/cb_content_top.png)

**Content/(Project Name)/[Assets](/documentation/zh-cn/unreal-engine/assets-folder-structure-in-unreal-engine)**

用于创建角色、环境和视觉效果的所有资产。此处不包含关卡资产。

**Content/(Project Name)/[Envs](/documentation/zh-cn/unreal-engine/envs-folder-structure-in-unreal-engine)**

包含所有关卡、快照和子关卡。不包含舞台Actor。

**Content/(Project Name)/[Media](/documentation/zh-cn/unreal-engine/media-folder-structure-in-unreal-engine)**

媒体框架内容，例如EXR和电影渲染队列输出及配置文件。

**Content/(Project Name)/[Sequences](/documentation/zh-cn/unreal-engine/sequences-folder-structure-in-unreal-engine)**

所有序列、编辑、动画和相关快照。

**Content/(Project Name)/[Stages](/documentation/zh-cn/unreal-engine/stages-folder-structure)**

特定于舞台的文件，如动作捕获布局、绿色屏幕舞台和LED舞台，例如描述LED体积拓扑的nDisplay配置。

**Content/(Project Name)/[StageLevels](/documentation/zh-cn/unreal-engine/stage-levels-folder-structure-in-unreal-engine)**

拥有环境和舞台Actor的所有关卡资产。

**Content/(Project Name)/[Tools](/documentation/zh-cn/unreal-engine/tools-folder-structure-in-unreal-engine)**

自定义蓝图，包括工具和控件、功能按钮、关卡快照筛选器和预设以及远程控制预设。还包括相关的蓝图Actor，如结构、枚举等。

我们推荐为你的资产使用井然有序的命名规范，以便在内容浏览器中轻松查找。请参阅[推荐的资产命名规范](/documentation/zh-cn/unreal-engine/recommended-asset-naming-conventions-in-unreal-engine-projects)，了解最佳实践示例。

请参阅各个页面，详细了解每个文件夹中推荐的项目结构。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9ddf151-2bf4-4da3-ad4d-301e42d5eba6/top-level-chart.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9ddf151-2bf4-4da3-ad4d-301e42d5eba6/top-level-chart.png)

该图在内容浏览器中显示项目的推荐顶级文件夹结构。

-   [content browser](https://dev.epicgames.com/community/search?query=content%20browser)
-   [icvfx](https://dev.epicgames.com/community/search?query=icvfx)
-   [virtual sets](https://dev.epicgames.com/community/search?query=virtual%20sets)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [内容浏览器文件夹](/documentation/zh-cn/unreal-engine/in-camera-vfx-project-structure-example-in-unreal-engine#%E5%86%85%E5%AE%B9%E6%B5%8F%E8%A7%88%E5%99%A8%E6%96%87%E4%BB%B6%E5%A4%B9)
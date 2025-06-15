# 虚幻编译工具参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-build-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:31:43.408Z

---

目录

![虚幻编译工具](https://dev.epicgames.com/community/api/documentation/image/5d58786d-c195-4538-90d7-6ce08f9d210c?resizing_type=fill&width=1920&height=335)

**虚幻编译工具（UBT）** 是一个自定义工具，负责管理通过各种编译配置来编译 **虚幻引擎（UE）** 源代码的过程。请阅读 `BuildConfiguration.cs`，了解诸多用户可配置的编译选项。

## 模块化架构

虚幻引擎被划分为多个模块。每个模块都拥有控制其编译方式的.build.cs文件，包括定义模块相依性的选项、额外的库、包含路径等。这些模块被默认编译为DLL文件，并通过单一可执行文件进行加载。可选择在BuildConfiguration.cs文件中编译一个单块可执行文件。

需要注意的是，开发环境任意项目文件（如Visual Studio的 `.sln` 或 `.vcproj` 文件）的编译进程均为独立进行。这些文件有助于进行编辑，因此提供了一个工具来动态生成它们（基于项目目录树内容）。使用保存在 `[Unreal Engine Root Directory]` 目录下的 `GenerateProject.bat` 文件即可运行此工具。

**注意：** 不时运行 `GenerateProject.bat` 将使代码编辑器与硬盘上正在添加（删除）的文件保持同步更新。

## 主题

[

![目标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0967819a-7553-49f6-89de-1b2bf87c7807/placeholder_topic.png)

目标

UBT目标概述，包括属性说明。





](/documentation/zh-cn/unreal-engine/unreal-engine-build-tool-target-reference)[

![模块属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50bdc5f8-7e6b-4a81-b583-919b7430657b/placeholder_topic.png)

模块属性

虚幻编译工具模块概述，包括属性说明。





](/documentation/zh-cn/unreal-engine/module-properties-in-unreal-engine)[

![编译配置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ed5384c-7742-4894-9cc6-eed7e22b4ada/topic_buildconfigprops.png)

编译配置

配置引擎的编译方式。





](/documentation/zh-cn/unreal-engine/build-configuration-for-unreal-engine)[

![IWYU](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c79a970-cb85-4754-abab-1b82c1349650/topic_iwyu.png)

IWYU

虚幻引擎更新基本代码的概览。此基本代码使用





](/documentation/zh-cn/unreal-engine/include-what-you-use-iwyu-for-unreal-engine-programming)[

![IDE的项目文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31e5ad16-5445-497f-8565-0d0e3136fa02/topic_prjfilegen.png)

IDE的项目文件

关于自动为当前工作区中的游戏和模块生成项目文件的的指南。





](/documentation/zh-cn/unreal-engine/how-to-generate-unreal-engine-project-files-for-your-ide)[

![二进制文件版本划分](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6649150-ab80-4773-83ba-c0071432efd8/placeholder_topic.png)

二进制文件版本划分

虚幻引擎BuildID系统的参考，其可缓解由过期DLL文件造成的潜在错误。





](/documentation/zh-cn/unreal-engine/how-to-version-binaries-in-unreal-engine)[

![第三方库](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9127f743-c088-481b-9fec-752d26b0b969/placeholder_topic.png)

第三方库

将第三方库集成到虚幻引擎中





](/documentation/zh-cn/unreal-engine/integrating-third-party-libraries-into-unreal-engine)[

![静态代码分析](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a40fe41-bd3b-4e6a-b747-65eb9668befb/placeholder_topic.png)

静态代码分析

虚幻编译工具支持运行各种静态代码分析器。





](/documentation/zh-cn/unreal-engine/static-code-analysis-in-unreal-engine)[

![使用Clang构建Microsoft平台](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27dfdf2b-4ce8-4aff-86b0-724267f26531/placeholder_topic.png)

使用Clang构建Microsoft平台

通过构建配置、命令行参数或引擎配置指定Clang选项。





](/documentation/zh-cn/unreal-engine/use-clang-to-build-microsoft-platforms-in-unreal-engine)

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [模块化架构](/documentation/zh-cn/unreal-engine/unreal-build-tool-in-unreal-engine#%E6%A8%A1%E5%9D%97%E5%8C%96%E6%9E%B6%E6%9E%84)
-   [主题](/documentation/zh-cn/unreal-engine/unreal-build-tool-in-unreal-engine#%E4%B8%BB%E9%A2%98)
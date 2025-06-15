# 使用虚幻Turnkey自动化管理平台和SDK。 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/automating-platform-and-sdk-management-with-unreal-turnkey
> 
> 生成时间: 2025-06-14T20:30:48.536Z

---

目录

![虚幻Turnkey](https://dev.epicgames.com/community/api/documentation/image/9660fbed-1f3e-4638-9263-6f7dd2dc565a?resizing_type=fill&width=1920&height=335)

**Turnkey** 是在 **虚幻引擎5** 中引入的系统，可以自动执行设置平台支持时需要执行的大部分步骤，包括查找用于安装SDK和显示开发工具包的源文件。

你的组织设置Turnkey的文件源仓库之后，个体团队成员就可以使用一键式流程为任何目标平台设置自己的系统。本页面上列出的指南将展示如何为Turnkey托管SDK，以及如何使用Turnkey将其下载和安装到虚幻引擎的个体实例上。

## 概述

Turnkey是AutomationTool脚本，可以通过 `RunUAT.bat` 进行访问，配备了大量可以用于和SDK交互的工具。它会访问你为组织设置的仓库，然后自动从该仓库下载文件和设置SDK。

在运行Turnkey来安装SDK时，它会执行以下流程：

-   Turnkey启动，并使用 `TurnkeyManifest.xml` 提供的信息来扫描SDK。
-   Turnkey根据用户的输入选择一个平台。
-   版本系统告知Turnkey哪些版本的SDK对于当前的虚幻引擎版本有效。
-   从提供的所有有效SDK中选择最合适的SDK。
    -   Turnkey使用一系列特定于平台的规则来将版本号转换成整数，然后选择有效SDK范围中的最大数字。这些规则是在 `*PlatformSDK.cs` 文件中指定的。
-   Turnkey将SDK文件下载到用户的机器。
    -   如果SDK文件包含在 `.zip` 或 `.7z` 文件中，则会自动解压到一个临时位置。
-   版本系统将安装下载的SDK。

这样一来，即使存在大量可用的SDK版本，可以快速设置你的虚幻引擎项目，并且无论何时更新可用的SDK都可以简化维护。

## 设置Turnkey

要使用Turnkey，你需要在文件源仓库中托管SDK，然后使用必要的信息来设置 `TurnkeyManifest.xml` 和 `TurnkeyStudioSettings.xml` 文件，以便于Turnkey发现。

下面列出的页面提供了有关如何设置每个组件的说明，以及如何设置目录结构以便Turnkey的自动化流程能够识别你的SDK版本。

[

![为你的组织配置Turnkey](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e4b57e2-5daf-4548-bb8a-3f4a088bedfc/settingupturnkeyforyourorganizationtopicimage.png)

为你的组织配置Turnkey

介绍如何编写Turnkey清单以及为你的组织配置副本提供方的信息。





](/documentation/zh-cn/unreal-engine/setting-up-turnkey-for-your-organization-in-unreal-engine)[

![设置适用于虚幻Turnkey的Google Drive](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/901bc7b8-500a-44b1-b305-252b30f87831/settingupgoogledriveforunrealturnkeytopicimage.png)

设置适用于虚幻Turnkey的Google Drive

如何设置Google Drive API和托管SDK以便用于虚幻Turnkey





](/documentation/zh-cn/unreal-engine/setting-up-google-drive-for-turnkey-for-unreal-engine)

## 用途

为你的组织设置Turnkey之后，用户可以直接在虚幻引擎中与其进行交互，或在命令行界面中使用 `RunUAT.bat` 与其交互。下面列出的页面包含了每种方式的用法信息。

[

![在虚幻编辑器中管理平台](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/410d40da-a7bf-4481-bfe2-2dac696111e7/managingplatformsinunrealenginetopicimage.png)

在虚幻编辑器中管理平台

使用虚幻编辑器中的全新





](/documentation/zh-cn/unreal-engine/using-the-platforms-dropdown-in-unreal-editor)[

![使用Turnkey命令行](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3286409a-3428-4ff0-be9e-a67b51f29b22/usingtheturnkeycommandlinetopicimage.png)

使用Turnkey命令行

本文介绍了如何在命令行界面中使用RunUAT.bat来运行Turnkey





](/documentation/zh-cn/unreal-engine/using-the-turnkey-commandline-for-unreal-engine)

-   [platforms](https://dev.epicgames.com/community/search?query=platforms)
-   [turnkey](https://dev.epicgames.com/community/search?query=turnkey)
-   [platform sdks](https://dev.epicgames.com/community/search?query=platform%20sdks)
-   [sdks](https://dev.epicgames.com/community/search?query=sdks)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/automating-platform-and-sdk-management-with-unreal-turnkey#%E6%A6%82%E8%BF%B0)
-   [设置Turnkey](/documentation/zh-cn/unreal-engine/automating-platform-and-sdk-management-with-unreal-turnkey#%E8%AE%BE%E7%BD%AEturnkey)
-   [用途](/documentation/zh-cn/unreal-engine/automating-platform-and-sdk-management-with-unreal-turnkey#%E7%94%A8%E9%80%94)
# 虚幻引擎AutoSDK系统参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-autosdk-system-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:42:04.252Z

---

目录

![AutoSDK参考](https://dev.epicgames.com/community/api/documentation/image/6924ea8c-8c2b-49f7-a94d-20547f15de29?resizing_type=fill&width=1920&height=335)

**AutoSDK** 系统提供的机制可以分发目标平台SDK，并根据需要对其进行配置，以便引擎使用。此系统专为编译机设计，可为SDK要求不同的多个分支提供服务，无需手动管理安装包，开发者无需完整安装SDK也可以进行使用。通常情况下，默认只提供基本的工具集（例如编译器或部署软件）。

[虚幻编译工具](/documentation/zh-cn/unreal-engine/unreal-build-tool-in-unreal-engine)、[自动化工具](/documentation/zh-cn/unreal-engine/unreal-automation-tool-for-unreal-engine)和虚幻编辑器都能与AutoSDK无缝对接，而SDK之间的切换由虚幻编译工具（UBT）负责处理（其由其他工具调用）。

针对各个引擎版本，虚幻编译工具都有一个尝试使用的首选SDK版本。此版本通常由派生自UBT源代码中 `UEBuildPlatform` 的类来定义。

## 设置

出于法律原因，Epic无法分发SDK，该目录树便是构建SDK的模板。我们建议您从AutoSDK空文件夹开始操作，并在添加特定SDK版本时从此处复制文件。

请勿将AutoSDK系统配置为使用此文件夹。这只是一个模板，如果不添加其他文件，系统将无法运行。

为便于在一台机器的多个分支上共用，应将AutoSDK文件夹单独提交给游戏或引擎代码的源码管理。

想使用AutoSDK的开发者都可以将其同步，并设置 `UE_SDKS_ROOT` 环境变量指向其本地机上包含AutoSDK的UBT路径。

## 布局

AutoSDK目录结构的较为宽松，通常由每个平台自行决定，但是目录结构将遵循此通用模式。

目录结构

定义

`/HostPlatform/`

可以使用SDK的主机平台。

`/HostPlatform/TargetPlatform/`

包含"HostPlatform""TargetPlatform"SDK的目录（例如"/HostWin64/Android/"）。

`/HostPlatform/TargetPlatform/1.0/`

包含"HostPlatform""TargetPlatform" 1.0 SDK的目录。

`/HostPlatform/TargetPlatform/1.0/Setup.bat`

设置此SDK时运行的可选批处理文件。在Mac/Linux上，该文件为"setup.sh"。

`/HostPlatform/TargetPlatform/1.0/Unsetup.bat`

移除此SDK时运行的可选批处理文件。在Mac/Linux上，该文件为"unsetup.sh"。

运行时，Setup.bat将把名为 `OutputEnvVars.txt` 的文本文件输出到同一目录，其中包含以 `NAME=VALUE` 形式设置的环境变量列表，以及用于修改 `PATH` 环境变量的特殊指令，例如 `ADDPATH=Foo` 和 `STRIPPATH=Foo`。

此目录中包含Epic为支持SDK版本编写的设置脚本。

## 平台

如需了解为每个平台添加SDK的更多信息，请查阅HostPlatform/TargetPlatform子文件夹中的README.md文件。

-   [autosdk](https://dev.epicgames.com/community/search?query=autosdk)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置](/documentation/zh-cn/unreal-engine/using-the-autosdk-system-in-unreal-engine#%E8%AE%BE%E7%BD%AE)
-   [布局](/documentation/zh-cn/unreal-engine/using-the-autosdk-system-in-unreal-engine#%E5%B8%83%E5%B1%80)
-   [平台](/documentation/zh-cn/unreal-engine/using-the-autosdk-system-in-unreal-engine#%E5%B9%B3%E5%8F%B0)
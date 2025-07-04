# 虚幻引擎二进制文件版本划分 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-version-binaries-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:31:48.450Z

---

目录

![二进制文件版本划分](https://dev.epicgames.com/community/api/documentation/image/fd93ebec-5024-4037-9258-0bd2454ff787?resizing_type=fill&width=1920&height=335)

虚幻引擎的 **BuildID** 系统可缓解由过期DLL文件造成的潜在错误。此系统不但可以预防崩溃或失效的库链接，还能防止由陈旧二进制文件引起的疑难bug。工作原理是只加载与可执行文件自身同时进行编译的DLL文件。编译ID通常在运行时自动生成，每次编译引擎时均会生成一个全新的唯一值。然而可以手动指定值将其覆盖。

## 自动生成的编译ID

在编译时，每个包含至少一个已编译DLL文件的输出目录都会接收一个扩展名为 `.modules` 的JSON文件，如 `UnrealEditor.modules`。此文件将列出目录中的每个模块和该模块关联的DLL文件，以及编译自身的GUID。每次引擎编译时，它都会生成一个新的GUID，以便识别来自其他编译会话的DLL文件，且引擎可以忽略它们。使用源码管理维护二进制编译时，必须一同签入可执行文件、所有DLL及其关联的 `.modules` 文件，以确保编译ID相匹配。

## 手动指定的编译ID

可以将您的编译ID强制设为特定值。您可以在 `Build/Build.version` JSON文件中添加一个 `BuildId` 条目（作为字符串变量）来实现，但不建议如此操作，因为它将移除阻止使用不兼容模块的检查。如果将强制编译ID与可在多个项目之间共享的插件一同使用，那么运行过期代码将十分容易。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [versioning](https://dev.epicgames.com/community/search?query=versioning)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [自动生成的编译ID](/documentation/zh-cn/unreal-engine/how-to-version-binaries-in-unreal-engine#%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%E7%9A%84%E7%BC%96%E8%AF%91id)
-   [手动指定的编译ID](/documentation/zh-cn/unreal-engine/how-to-version-binaries-in-unreal-engine#%E6%89%8B%E5%8A%A8%E6%8C%87%E5%AE%9A%E7%9A%84%E7%BC%96%E8%AF%91id)
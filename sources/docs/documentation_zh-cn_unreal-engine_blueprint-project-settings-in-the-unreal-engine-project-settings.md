# 虚幻引擎项目设置中的蓝图项目设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blueprint-project-settings-in-the-unreal-engine-project-settings
> 
> 生成时间: 2025-06-14T18:55:06.610Z

---

目录

![蓝图](https://dev.epicgames.com/community/api/documentation/image/36101da0-97cd-4949-a008-ae5cdaa44591?resizing_type=fill&width=1920&height=335)

## 蓝图项目设置

### 蓝图

**分段**

**说明**

**强制所有依赖性重新编译（废弃）（Force All Dependencies to Recompile (deprecated)）**

为没有发生函数签名更改的个别蓝图禁用更快的编译。

此设置已弃用，不应该使用。你无法强制所有依赖性在没有检测到更改时编译。

**编译器消息在编辑器之外禁用（Compiler Messages Disabled Except in Editor）**

在当前项目的完整交互式编辑器会话之外已禁止的编译器消息列表。这适合用于将警告设为静默，这里的警告是指在项目创建后添加到引擎，且内容作者发现后会处理的警告。

**编译器消息完全禁用（Compiler Messages Disabled Entirely）**

已完全禁止的编译器消息列表。你应该仅在使用的蓝图无法更新并且发出的警告不严重时才禁止编译器消息。

### Actor

**分段**

**说明**

**验证已卸载的软Actor引用（Validate Unloaded Soft Actor References）**

如果启用，编辑器将在删除或重命名Actor时加载程序包以查找Actor的软引用。这在大型项目中可能很慢。

禁用此选项可提高性能，但请注意，这样做更容易破坏使用软Actor引用的蓝图和序列。

### 试验性

**分段**

**说明**

**在树状图中启用子Actor扩展（Enable Child Actor Expansion in Tree View）**

启用在组件树状图中扩展子Actor组件的选项。

**默认子Actor树状图模式（Default Child Actor Tree View Mode）**

要用于蓝图Actor的组件树层级中子Actor组件的默认视图模式。

你可以从以下选项中选择：

-   **仅组件（Component Only）** ：仅将外层组件显示为单个组件节点。
-   **带子Actor的组件（Component with Child Actor）** ：将附加到外层组件的子Actor层级包含为根节点。
-   **仅子Actor（Child Actor Only）** ：仅显示为子Actor层级（不将外层组件节点显示为根节点）。

**总是要包含的命名空间（Namespaces to Always Include）**

总是要在所有项目用户的蓝图中公开的名称空间列表。

此设置需要在 **编辑器偏好设置（Editor Preferences）** 中启用蓝图名称空间。

### 播放

**分段**

**说明**

**要允许在编辑器中运行期间重新编译的基类（Base Classes to Allow Recompiling During Play in Editor）**

从其中一个基类派生的蓝图都可以在编辑器中运行（PIE）期间重新编译。此设置同时作为编辑器偏好设置和项目设置，从其中任一面板启用时都会生效。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [basics](https://dev.epicgames.com/community/search?query=basics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [蓝图项目设置](/documentation/zh-cn/unreal-engine/blueprint-project-settings-in-the-unreal-engine-project-settings#%E8%93%9D%E5%9B%BE%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [蓝图](/documentation/zh-cn/unreal-engine/blueprint-project-settings-in-the-unreal-engine-project-settings#%E8%93%9D%E5%9B%BE)
-   [Actor](/documentation/zh-cn/unreal-engine/blueprint-project-settings-in-the-unreal-engine-project-settings#actor)
-   [试验性](/documentation/zh-cn/unreal-engine/blueprint-project-settings-in-the-unreal-engine-project-settings#%E8%AF%95%E9%AA%8C%E6%80%A7)
-   [播放](/documentation/zh-cn/unreal-engine/blueprint-project-settings-in-the-unreal-engine-project-settings#%E6%92%AD%E6%94%BE)
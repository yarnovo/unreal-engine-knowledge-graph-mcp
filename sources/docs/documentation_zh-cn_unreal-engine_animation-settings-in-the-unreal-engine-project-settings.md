# 虚幻引擎项目设置中的动画设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-settings-in-the-unreal-engine-project-settings
> 
> 生成时间: 2025-06-14T18:53:27.120Z

---

目录

## 动画

### 压缩

**分段**

**说明**

**压缩Commandlet版本（Compress Commandlet Version）**

重新压缩Commandlet的压缩版本。

如果你想触发所有动画的完整重新压缩，请增加该值。否则，将只重新压缩新导入的动画。

**关键帧结束效果器匹配名称数组（Key End Effectors Match Name Array）**

除了带插槽的骨骼之外，要以更高精度处理的骨骼名称的列表。

**强制重新压缩（Force Recompression）**

如果启用，该设置将强制重新压缩每个动画。

请在检入项目之前禁用该设置，否则引擎将在每次打开项目时重新压缩所有动画，对该项目的所有用户带来负面性能影响。

### 性能

**分段**

**说明**

**启用性能日志（Enable Performance Log）**

如果为true，重新压缩将记录性能信息。

**剥离专用服务器上的动画数据（Strip Animation Data on Dedicated Server）**

如果为true，将从专用服务器烘焙数据中剥离动画轨道数据。

**在骨骼网格体初始化时更新动画（Tick Animation on Skeletal Mesh Init）**

启用该属性时，将在骨骼网格体初始化时更新动画，该行为叫做零更新。

此属性默认为禁用状态。

4.19之前所有的虚幻引擎版本都会默认在骨骼网格体初始化期间零更新动画。

### 自定义属性

**分段**

**说明**

**骨骼时间码自定义属性名称设置（Bone Timecode Custom Attribute Name Settings）**

标识骨自定义属性的名称，这些属性表示时间码和子帧的单个组件，并带有镜头试拍名称。

这些将包括在要导入的骨骼自定义属性名称的列表中。

**骨骼自定义属性名称（Bone Custom Attributes Names）**

要直接导入到对应骨骼上的自定义属性的列表。

含义字段用于根据上下文定义属性名称并为其工具定制。

**带自定义属性的骨骼名称（Bone Names With Custom Attributes）**

将所有自定义属性都直接导入到骨骼上的骨骼名称的列表。

**属性混合模式（Attribute Blend Modes）**

特定于自定义属性的混合类型（按名称）。

你可以从以下选项中选择：

-   **覆盖（Override）**
-   **混合（Blend）**

**默认属性混合模式（Default Attribute Blend Mode）**

默认自定义属性混合类型。

**变换属性名称（Transform Attribute Names）**

将FBX节点变换曲线导入为属性时要匹配的名称（可以使用 `?` 和 `*` 通配符）。

### 镜像

**分段**

**说明**

**镜像查找替换表达式（Mirror Find Replace Expressions）**

查找和替换用于镜像的表达式。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [basics](https://dev.epicgames.com/community/search?query=basics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [动画](/documentation/zh-cn/unreal-engine/animation-settings-in-the-unreal-engine-project-settings#%E5%8A%A8%E7%94%BB)
-   [压缩](/documentation/zh-cn/unreal-engine/animation-settings-in-the-unreal-engine-project-settings#%E5%8E%8B%E7%BC%A9)
-   [性能](/documentation/zh-cn/unreal-engine/animation-settings-in-the-unreal-engine-project-settings#%E6%80%A7%E8%83%BD)
-   [自定义属性](/documentation/zh-cn/unreal-engine/animation-settings-in-the-unreal-engine-project-settings#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7)
-   [镜像](/documentation/zh-cn/unreal-engine/animation-settings-in-the-unreal-engine-project-settings#%E9%95%9C%E5%83%8F)
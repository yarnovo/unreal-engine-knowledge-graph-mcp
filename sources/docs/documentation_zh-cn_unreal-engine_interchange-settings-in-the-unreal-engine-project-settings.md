# 虚幻引擎项目设置中的交换设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/interchange-settings-in-the-unreal-engine-project-settings
> 
> 生成时间: 2025-06-14T18:54:14.572Z

---

目录

## 交换

交换是一种新的导入系统，可以将资产直接导入到关卡中。目前该系统还在开发中，将在虚幻引擎的后续版本中优化。

### 交换

**分段**

**说明**

**管线堆栈（Pipeline Stack）**

使用交换进行导入时想要使用的所有可用管线堆栈。

所选的管线堆栈将按从上到下顺序执行所有管线。

点击并拖动管线左侧的把手可以对管线进行排序。

**默认管线堆栈（Default Pipeline Stack）**

这将在导入资产时告知交换系统选择的是哪个管线。

**管线配置对话框类（Pipeline Configuration Dialog Class）**

这将在你需要配置管线时告知交换系统应该弹出哪个管线。

你可以从以下选项中选择：

-   **无（None）**
-   **InterchangePipelineConfigurationBase**
-   **InterchangePipelineConfigurationGeneric**

**显示管线堆栈配置对话框（Show Pipeline Stacks Configuration Dialog）**

如果启用，每当交换系统必须选择要导入或重新导入的管线时，都将显示管线堆栈配置对话框。

如果禁用，交换系统将使用 `DefaultPipelineStack` 。

### 交换（试验性）

**分段**

**说明**

**在导入到关卡时使用交换（Use Interchange when Importing Into Level）**

如果启用，将在向关卡导入资产时使用交换系统。

**默认场景管线堆栈（Default Scene Pipeline Stack）**

这将在导入场景时告知交换系统应该选择哪个管线。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [basics](https://dev.epicgames.com/community/search?query=basics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [交换](/documentation/zh-cn/unreal-engine/interchange-settings-in-the-unreal-engine-project-settings#%E4%BA%A4%E6%8D%A2)
-   [交换](/documentation/zh-cn/unreal-engine/interchange-settings-in-the-unreal-engine-project-settings#%E4%BA%A4%E6%8D%A2-2)
-   [交换（试验性）](/documentation/zh-cn/unreal-engine/interchange-settings-in-the-unreal-engine-project-settings#%E4%BA%A4%E6%8D%A2%EF%BC%88%E8%AF%95%E9%AA%8C%E6%80%A7%EF%BC%89)
# 使用Datasmith将3ds Max内容导入虚幻引擎 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-datasmith-with-3ds-max-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:05:07.789Z

---

目录

![3ds Max](https://dev.epicgames.com/community/api/documentation/image/e848332d-6041-48cd-a3a3-7df1f6432cfa?resizing_type=fill&width=1920&height=335)

本页面简单介绍了Datasmith 3ds Max导出器插件，及其安装方法。

![V-Ray in 3ds Max](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8325d51-9aac-4c48-9596-ca45a89cb8b1/max_datasmith_compare_vray.png)

![Unreal Engine](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1deae20b-074a-456f-a815-71e21a371d4a/max_datasmith_compare_unreal.png)

V-Ray in 3ds Max

Unreal Engine

图片由Litrix提供。

## 3ds Max工作流程

使用Datasmith将3ds Max内容导入 **虚幻引擎** 的方法如下：

-   **导出 `.udatasmith` 文件**：将3ds Max内容导出为 `.udatasmith` 文件，并将这些文件导入虚幻引擎。 更多详情请参阅[从3ds Max导出Datasmith文件](/documentation/zh-cn/unreal-engine/exporting-datasmith-files-from-3ds-max-to-unreal-engine)。
-   **设置Direct Link**：在3ds Max实例与虚幻引擎（或其他基于虚幻引擎的应用程序）实例间建立实时连接，然后自动或按需将3ds Max内容推送到虚幻引擎。 更多详情请参阅[使用Direct Link同步3ds Max和虚幻引擎](/documentation/zh-cn/unreal-engine/using-direct-link-to-synchronize-3ds-max-and-unreal-engine)。

关于Datasmith如何为虚幻引擎转换3ds Max内容，详见[Datasmith如何转换3ds Max内容](/documentation/zh-cn/unreal-engine/how-datasmith-translates-3ds-max-content-for-unreal-engine)。

## 为3ds Max安装Datasmith导出器插件

在同步或导出3ds Max内容前，你必须从[Datasmith 导出器插件页面](https://www.unrealengine.com/en-US/datasmith/plugins)下载 **Datasmith 3ds Max导出器插件** 并进行安装。

要查看插件支持哪些版本的Autodesk 3ds Max，请查看[Datasmith支持的软件和文件类型](/documentation/zh-cn/unreal-engine/datasmith-supported-software-and-file-types) 。

### 预安装检查表

在安装Datasmith 3ds Max导出器插件前，你需要：

-   关闭所有运行中的3ds Max实例。
-   下载与你要使用的虚幻引擎版本匹配的导出器插件安装程序。
-   卸载之前安装过的所有旧版Datasmith 3ds Max导出器插件。

### 安装或移除插件

下载安装程序后，将其打开，按屏幕提示操作。

如果你要卸载Datasmith 3ds Max导出器插件，可以在 **控制面板** 中操作，和其他Windows应用程序一样。

## 为Datasmith配置虚幻引擎项目

要将 `.udatasmith` 文件导入虚幻引擎，或将3ds Max场景同步到虚幻引擎，你的项目必须启用Datasmith导入器插件。如果你不启用该插件，将无法再虚幻引擎中看到Datasmith选项。

如果你的项目使用的是建筑业模版，将默认启用Datasmith导入器插件。

### 启用Datasmith导入器插件

1.  在虚幻引擎中打开插件窗口：在主菜单中选择 **编辑（Edit）> 插件（Plugins）**。
2.  在左边窗格中选择 **内置（BUILT-IN）> 导入器（Importer）** 类别。
3.  在右边窗格中，启用 **Datasmith导入器（Datasmith Importer）** 插件。

-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [enterprise](https://dev.epicgames.com/community/search?query=enterprise)
-   [3ds max](https://dev.epicgames.com/community/search?query=3ds%20max)
-   [interop](https://dev.epicgames.com/community/search?query=interop)
-   [unreal studio](https://dev.epicgames.com/community/search?query=unreal%20studio)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [3ds Max工作流程](/documentation/zh-cn/unreal-engine/using-datasmith-with-3ds-max-in-unreal-engine#3dsmax%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
-   [为3ds Max安装Datasmith导出器插件](/documentation/zh-cn/unreal-engine/using-datasmith-with-3ds-max-in-unreal-engine#%E4%B8%BA3dsmax%E5%AE%89%E8%A3%85datasmith%E5%AF%BC%E5%87%BA%E5%99%A8%E6%8F%92%E4%BB%B6)
-   [预安装检查表](/documentation/zh-cn/unreal-engine/using-datasmith-with-3ds-max-in-unreal-engine#%E9%A2%84%E5%AE%89%E8%A3%85%E6%A3%80%E6%9F%A5%E8%A1%A8)
-   [安装或移除插件](/documentation/zh-cn/unreal-engine/using-datasmith-with-3ds-max-in-unreal-engine#%E5%AE%89%E8%A3%85%E6%88%96%E7%A7%BB%E9%99%A4%E6%8F%92%E4%BB%B6)
-   [为Datasmith配置虚幻引擎项目](/documentation/zh-cn/unreal-engine/using-datasmith-with-3ds-max-in-unreal-engine#%E4%B8%BAdatasmith%E9%85%8D%E7%BD%AE%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E9%A1%B9%E7%9B%AE)
-   [启用Datasmith导入器插件](/documentation/zh-cn/unreal-engine/using-datasmith-with-3ds-max-in-unreal-engine#%E5%90%AF%E7%94%A8datasmith%E5%AF%BC%E5%85%A5%E5%99%A8%E6%8F%92%E4%BB%B6)
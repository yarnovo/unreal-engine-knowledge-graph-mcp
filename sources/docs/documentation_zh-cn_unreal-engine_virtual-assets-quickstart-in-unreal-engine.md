# 虚幻引擎中的虚拟资产快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-assets-quickstart-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:34:59.117Z

---

目录

![虚拟资产快速入门指南](https://dev.epicgames.com/community/api/documentation/image/8271f92b-e23d-46ba-9036-337131fa91f4?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [派生数据缓存(DDC)](/documentation/zh-cn/unreal-engine/using-derived-data-cache-in-unreal-engine)

本指南介绍如何虚拟化小的示例或测试项目。

## 1\. 必要设置

本指南不需要特定平台或模板项目，你可以采用任意虚幻引擎项目。但是，你的项目必须设置为使用 **Perforce** 作为源码控制，并且你需要设置 **编辑器内检入工作流程** 。如需详细了解Perforce设置，请参阅[使用Perforce版本控制软件](/documentation/zh-cn/unreal-engine/using-perforce-as-source-control-for-unreal-engine)和[虚幻编辑器中的版本控制](/documentation/zh-cn/unreal-engine/using-source-control-in-the-unreal-editor)。

你还需要为项目设置 **共享派生数据缓存（DDC）** ，作为快速缓存存储。如需更多信息，请参阅[派生数据缓存(DDC)](/documentation/zh-cn/unreal-engine/using-derived-data-cache-in-unreal-engine)。

## 2\. 配置文件设置

打开项目的 `DefaultEngine.ini` 文件并添加以下文本：

```cpp

	[Core.ContentVirtualization]
	SystemName=Default

	[Core.VirtualizationModule]
	BackendGraph=VABackendGraph_Example

	[VABackendGraph_Example]
	PersistentStorageHierarchy=(Entry=SourceControlCache)
	CacheStorageHierarchy=(Entry=DDCCache)
	SourceControlCache=(Type=p4SourceControl, DepotRoot="...")
	DDCCache=(Type=DDCBackend)
```

这将为所有当前支持的资产启用虚拟化。这些设置有以下影响：

-   **VABackendGraph\_Filesystem** 定义了后端图表。
    
-   **SourceControlCache** 会将你的Perforce源码控制系统定义为虚拟化有效负载的后端，并提供别名以供引用。请将DepotRoot值更改为你的项目的根目录。
    
-   **DDCCache** 会将你的共享DDC定义为虚拟化有效负载的后端，并提供别名以供引用。
    
-   **CacheStorageHierarchy** 将DDCCache设置为你的快速缓存存储后端。如果你的项目可在此处找到批量数据有效负载，它将偏向于从此源提取该数据。
    
-   **PersistentStorageHierarchy** 会将SourceControlCache设置为持久存储后端。这是在其他所有后端都失败的情况下，你的项目保证能够找到批量数据有效负载的位置。
    

请参阅[后端图表](/documentation/zh-cn/unreal-engine/backend-graphs-for-virtual-assets-in-unreal-engine)页面，详细了解如何为项目定义后端。

## 3\. 虚拟化数据包

启用虚拟资产后，你从项目中的编辑器提交的所有数据包都应该在提交时虚拟化。这可适用于所有编辑器提交方法。

**虚幻虚拟化工具（Unreal Virtualization Tool）** 还可以提交变更列表。虚幻虚拟化工具的源代码位于 `Engine\Source\Programs\UnrealVirtualizationTool\` 中。要使用它，请编译该工具，然后使用以下参数在命令行中运行它：

```cpp

	-ClientSpecName=[WorkspaceName] -Mode=Changelist -Changelist=[Changelist]
```

**命令**

**说明**

ClientSpecName

要从中提交的工作空间的名称。

Changelist

要虚拟化并提交的变更列表。

正常情况下，如果不提交资产，就不应该将其虚拟化。但是，利用此工具，可以将 `-NoSubmit` 添加到命令行。变更列表中的数据包将虚拟化，但变更列表本身不会提交。

## 4\. 验证你的虚拟化数据包

要确定你的数据包是否已成功虚拟化，请将鼠标悬停在内容浏览器中的资产上，然后选中 **有虚拟化数据（Has Virtualized Data）** 条目。

![将鼠标光标悬停在资产上，验证它是否已虚拟化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c44ffa7-2be1-42a7-bc4e-762ab62a8598/verifyvirtualasset.png)

你也可以查看资产的文件大小。如果 `.uasset` 文件比虚拟化之前显著变小，则批量数据已从 `.uasset` 分离，并已包含在 **Saved/VirtualizedPayloads** 目录中。

要调查数据包文件的内容，请右键点击 **内容浏览器（Content Browser）** 中的资产，点击 **复制文件路径（Copy File Path）** ，然后在控制台中输入以下命令：

```cpp
	DumpPackagePayloadInfo [文件路径]

```

将 `[file path]` 替换为你从内容浏览器复制的文件路径。

此控制台命令可以采用完整路径或数据包路径，并将在输出窗口中编写有效负载的摘要。 输出会显示本地存储的有效负载的列表，然后是虚拟化有效负载的列表。`DumpPackagePayloadInfo` 不会使用缓存的信息，例如资产注册表。相反，它会在你每次使用它时重新解析数据包的信息，这样它提供的信息应该始终是最新的。

## 为你的项目配置虚拟资产

现在你有了虚拟资产的基本实现，可以进行配置，满足你的项目的需要。以下页面更详细地介绍了你可以自定义设置的各种方式：

-   [虚拟资产概述](/documentation/zh-cn/unreal-engine/overview-of-virtual-assets-in-unreal-engine)包含有关如何在项目中配置和部署虚拟资产支持的指南。
    
-   [虚拟资产的后端图表](/documentation/zh-cn/unreal-engine/backend-graphs-for-virtual-assets-in-unreal-engine)提供有关如何设置虚拟化图表的信息。
    
-   [调试虚拟资产](/documentation/zh-cn/unreal-engine/debugging-virtual-assets-in-unreal-engine)介绍了如何输出有关虚拟资产的信息以供故障排除和调试。
    

-   [asset management](https://dev.epicgames.com/community/search?query=asset%20management)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1\. 必要设置](/documentation/zh-cn/unreal-engine/virtual-assets-quickstart-in-unreal-engine#1%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [2\. 配置文件设置](/documentation/zh-cn/unreal-engine/virtual-assets-quickstart-in-unreal-engine#2%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E8%AE%BE%E7%BD%AE)
-   [3\. 虚拟化数据包](/documentation/zh-cn/unreal-engine/virtual-assets-quickstart-in-unreal-engine#3%E8%99%9A%E6%8B%9F%E5%8C%96%E6%95%B0%E6%8D%AE%E5%8C%85)
-   [4\. 验证你的虚拟化数据包](/documentation/zh-cn/unreal-engine/virtual-assets-quickstart-in-unreal-engine#4%E9%AA%8C%E8%AF%81%E4%BD%A0%E7%9A%84%E8%99%9A%E6%8B%9F%E5%8C%96%E6%95%B0%E6%8D%AE%E5%8C%85)
-   [为你的项目配置虚拟资产](/documentation/zh-cn/unreal-engine/virtual-assets-quickstart-in-unreal-engine#%E4%B8%BA%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE%E9%85%8D%E7%BD%AE%E8%99%9A%E6%8B%9F%E8%B5%84%E4%BA%A7)
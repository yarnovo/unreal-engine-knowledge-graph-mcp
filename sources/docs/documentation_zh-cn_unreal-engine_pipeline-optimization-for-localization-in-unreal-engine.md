# Pipeline Optimization for Localization in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/pipeline-optimization-for-localization-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:11:10.750Z

---

目录

![管线优化](https://dev.epicgames.com/community/api/documentation/image/2f3d4bd8-e089-4366-882f-1acefeded276?resizing_type=fill&width=1920&height=335)

## 收集资产

资产收集是使用最多资源的本地化管线的一部分。这是因为本地化通常必须加载资产（及其依赖项）来提取其中包含的本地化文本值。为了最大限度减少收集期间实际需要加载的资产数量，**虚幻引擎(UE)** 在资产文件的标头中添加了一个"收集缓存"（在您保存时生成），这意味着只需要加载资产标头就可以收集文本。

转到 **内容浏览器** 中的 **资产本地化（Asset Localization）** 菜单并选择 **显示本地化缓存（Show Localization Cache）** 即可查看资产的当前缓存。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cbe0838d-5e86-4713-bb0a-f96236cfcf8e/pipelineopt-01.png)

由于使用字节码，某些类型的资产（例如蓝图或具有非空白关卡蓝图的关卡）无法生成收集缓存。这是因为UE从字节码中收集文本值，但字节码太不稳定，无法在保存时可靠缓存。

在资产收集期间，由于字节码而未缓存的资产总数将打印到日志中。如果您发现您的资产收集花费了大部分时间从包含字节码的资产中收集，那么您可以考虑将这些资产中的文本移动到 **字符串表** 中，以便引用这些条目。

在资产收集期间，只加载包含传递"FText::ShouldGatherForLocalization"的序列化文本值的资产。文化不变文本、空白文本、只包含空格的文本以及字符串表引用都无法通过此检查。这就是为什么使用字符串表可以提高资产收集性能。

## 验证资产缓存

有一些工具可用于帮助报告或修复项目中资产上陈旧和丢失的收集缓存。这些工具需要一段时间来运行，因为它们需要将所有资产加载到内存中。但是，如果您有大量未缓存的资产，他们可以大幅降低未来的开销。这些工具在正常的本地化Commandlet中作为额外参数运行。

**示例：**

```cpp
	-run=GatherText-config=Config/Localization/Game_Gather.ini
	-ReportStaleGatherCache

```

如果要从低于4.20的虚幻引擎版本升级项目，至少应该运行"ReportStaleGatherCache"来验证缓存是最新缓存，因为陈旧的缓存可能会导致本地化问题。

这些选项未在 **本地化控制板** 中公开。相反，您必须使用控制板为本地化目标生成的收集INI文件，并手动运行本地化Commandlet。

参数

说明

`ReportStaleGatherCache`

为本地化目标生成一个"StaleGatherCacheReport.txt"文件及清单。该文件包含所有包含陈旧收集缓存的资产的列表。

`FixStaleGatherCache`

尝试通过重新保存所有包含陈旧收集缓存的资产来自动修复。

`FixMissingGatherCache`

对于太旧而无法拥有收集缓存的资产，它尝试通过重新保存丢失收集缓存的资产来自动修复。

-   [localization](https://dev.epicgames.com/community/search?query=localization)
-   [pipeline optimization](https://dev.epicgames.com/community/search?query=pipeline%20optimization)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [收集资产](/documentation/zh-cn/unreal-engine/pipeline-optimization-for-localization-in-unreal-engine#%E6%94%B6%E9%9B%86%E8%B5%84%E4%BA%A7)
-   [验证资产缓存](/documentation/zh-cn/unreal-engine/pipeline-optimization-for-localization-in-unreal-engine#%E9%AA%8C%E8%AF%81%E8%B5%84%E4%BA%A7%E7%BC%93%E5%AD%98)
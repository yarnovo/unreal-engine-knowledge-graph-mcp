# 虚幻引擎BuildGraph 脚本类型 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/buildgraph-script-types-reference-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:32:15.931Z

---

目录

![BuildGraph 脚本类型](https://dev.epicgames.com/community/api/documentation/image/26e07bc9-1f7d-48e9-b828-94a4b3566f09?resizing_type=fill&width=1920&height=335)

下表包含 **BuildGraph** 属性所容纳的有效数据类型：

**类型**

**描述**

**字符串（String）**

一个任意字符串。

**字符串列表（String List）**

由分号隔开的任意字符串列表。

**布尔（Boolean）**

常量 `true` 或 `false`。

**整数（Integer）**

一个整数常量。

**正则表达式（Regex）**

一个正则表达式，使用 [C#](https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference)语法。

**命名（Name）**

一个命名实体。除 `^ < > :" / \ \| ?* ;` 之外的任意可打印字符。允许单空格（除命名的开头和结尾）。

**命名列表（Name List）**

由分号间隔的辨识符列表。

**标记（Tag）**

为文件列表赋予的标签，以 # 字符开头（如 `#My Files`）。

**标记列表（Tag List）**

由分号间隔的标记列表。（如 `#My Files;#Other Files`）。

**目标（Target）**

一个节点名、聚合名、代理名，或标记名。说明需要执行的节点序列。注意它应用到 [UnrealBuildTool](/documentation/zh-cn/unreal-engine/unreal-build-tool-in-unreal-engine) （代表被构建的单个项目）后将重叠 `Target` 的含义。

**目标列表（Target List）**

由分号隔开的目标名列表。

**文件规范（File Spec）**

一套文件和标记名，由分号间隔。引用文件（即 `Engine/.../_.bat`）时允许 `"..."`、`"_"` 和 `"?"` 之类的通配符。除非另有指定，相对路径相对于工作根目录进行解决。

**文件名（File Reference）**

指向文件的路径。除非另有指定，相对路径被解决为工作根目录。

**目录名（Directory Reference）**

指向目录的路径。除非另有指定，相对路径相对于工作根目录进行解决。

**Unreal目标配置（Unreal Target Configuration）**

编译目标时采用的配置。可用配置： `Debug`, `DebugGame`, `Development`, `Test` 或 `Shipping`。

**Unreal目标平台（Unreal Target Platform）**

虚幻引擎支持的平台。支持平台可以在[共享和发布项目](/documentation/404)中查看。请参考相关平台的文档。

**条件（Condition）**

一个 [条件表达式](/documentation/zh-cn/unreal-engine/buildgraph-script-conditions-reference-for-unreal-engine)。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [buildgraph](https://dev.epicgames.com/community/search?query=buildgraph)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
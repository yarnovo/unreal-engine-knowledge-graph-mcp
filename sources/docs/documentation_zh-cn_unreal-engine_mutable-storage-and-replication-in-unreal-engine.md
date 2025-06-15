# 虚幻引擎中的Mutable存储和复制 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mutable-storage-and-replication-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:04:11.334Z

---

目录

![存储和复制](https://dev.epicgames.com/community/api/documentation/image/56b14b84-0233-4e56-b508-ffb3144785ba?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

正如[Mutable概述](/documentation/zh-cn/unreal-engine/mutable-overview-in-unreal-engine)中所述，可自定义对象资产包含生成对象所有可能组合的全部数据。一个组合由一个可自定义对象实例资产表示，该资产仅包含对一个可自定义对象的引用以及该对象所公开的各个参数的值。

此数据有两种用例：

-   **持久存储** ：例如，当在编辑器中为固定NPC创建一个实例时，或者在游戏中当玩家自定义其角色后游戏希望将其进行保存以便在另一个会话中使用，将在磁盘中进行存储。
-   **临时使用** ：例如，如果你想通过网络将其从客户端传输到服务器，或者传输到其他客户端。

每种情况的要求略有不同。

## 持久存储

在这种情况下，即使可自定义对象在不同会话之间发生了更改（如扩展、修补或更新），你也需要确保实例参数有效。因此，你需要让此数据尽可能具备可移植性。

如果可自定义对象发生更改，可能会出现以下几种情况：

-   添加了新参数。在这种情况下，如果实例中没有该参数，它将被设置为可自定义对象中的默认值，而该默认值应设置为合理的值。
-   删除了参数。不会造成问题，只是要删除一些无用的数据。
-   参数名称发生更改。可自定义对象参数有一个UID，可用于在这种情况下调整数据。
-   枚举参数的值发生更改。这与参数更改类似，因为每个可能的值都有UID，可用于匹配新对象。

大多数项目会选择实现它们自己的数据结构和存储方式来实现这一描述，并且通过游戏代码将数据提供给可自定义对象实例，但对于编辑器内创建，可自定义对象实例资产会以这种方式处理参数。

## 临时使用

在这种情况下，你希望数据量尽可能小。如果可自定义对象不会发生更改，你可以使用 **紧凑描述符（Compact Descriptor）** 。这假设参数的数量及其顺序不会发生更改。此外，默认参数值不会进行序列化。

这一点很重要，因为它允许描述在某些情况下缩小100倍以上。如果你有100名玩家，并且他们每个人都可以找到彼此，则即使不考虑游戏内实例的更改，也会发生10,000次潜在的数据传输。如果描述是1KB而不是100KB，则你可以在每场游戏中节省大量带宽。

`void FCustomizableObjectInstanceDescriptor::SaveDescriptor(FArchive& Ar, bool bUseCompactDescriptor)`

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [working with content](https://dev.epicgames.com/community/search?query=working%20with%20content)
-   [skeletal mesh](https://dev.epicgames.com/community/search?query=skeletal%20mesh)
-   [mutable](https://dev.epicgames.com/community/search?query=mutable)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [持久存储](/documentation/zh-cn/unreal-engine/mutable-storage-and-replication-in-unreal-engine#%E6%8C%81%E4%B9%85%E5%AD%98%E5%82%A8)
-   [临时使用](/documentation/zh-cn/unreal-engine/mutable-storage-and-replication-in-unreal-engine#%E4%B8%B4%E6%97%B6%E4%BD%BF%E7%94%A8)
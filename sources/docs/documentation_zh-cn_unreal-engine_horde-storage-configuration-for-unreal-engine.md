# 面向虚幻引擎的Horde存储配置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/horde-storage-configuration-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:37:44.291Z

---

目录

![Horde存储配置](https://dev.epicgames.com/community/api/documentation/image/9dd0ca54-4491-4d7b-86f5-1a2b57602fb3?resizing_type=fill&width=1920&height=335)

## 简介

许多功能在服务器端中使用了Horde的存储系统。在很多方面，存储层的功能类似于一个不可变的内容可寻址存储系统（即通过内容的哈希值存储和检索项目），不过，其磁盘上的表现形式是将数据打包成更大的数据包，这些数据包使用唯一标识符，存储在更为常见的基于位置的存储后端中。

该系统的一个重要特征是具备对大量数据结构进行推理分析的能力，也就是说，存储系统中的各个节点（即任意数据块）具有不可变的特性，同时这些节点还可以有零个或多个指向其他节点的外部引用。这些树状数据结构可以一次遍历一个节点，同时底层存储系统可以高效地检索和存储各个节点。

所有这类数据结构的进入点都是一个ref，它是一个用户定义的名称，用于保存对树的根节点的引用。所有未被ref直接或间接引用的节点都将进行垃圾回收处理。

这种设计旨在通过将较大的数据块拆分成较小的数据块来支持大范围的负载大小，同时在缓存和客户端数据增量补丁方面具有优势。这样，让ref指向一个4kb负载就变得合理了，因为它指向的是一个被拆分为128KB数据块的多GB负载。

## 命名空间和后端

存储被划分为多个互不重叠的命名空间，每个命名空间都可以配置为使用不同的后端。通常情况下，对存储中内容的访问权限在命名空间级别进行控制，不过，一些更高级别的系统（例如日志和构件）会在底层存储命名空间之上公开自定义端点，这些端点提供自己的权限模型，无需直接访问底层的命名空间。

命名空间和后端通过[globals.json](/documentation/zh-cn/unreal-engine/horde-schema-for-unreal-engine#globals)文件的 `Storage` 部分进行配置。

### 命名空间

命名空间为逻辑存储分区配置权限和垃圾回收策略。它们还会指定一个用于存储实际数据的[后端](/documentation/zh-cn/unreal-engine/horde-storage-configuration-for-unreal-engine#%E5%90%8E%E7%AB%AF)。

通过将 `Prefix` 属性设置为在任何存储的文件添加前缀，多个命名空间可以使用同一个的存储后端。

命名空间的设置在[globals.json](/documentation/zh-cn/unreal-engine/horde-schema-for-unreal-engine#namespaceconfig)模式中有说明。

### 后端

Horde支持多种存储后端，还支持本地磁盘缓存和内存缓存：

-   本地磁盘
-   网络共享
-   AWS S3 Object Store
-   Azure Blob Store

后端的设置在[globals.json](/documentation/zh-cn/unreal-engine/horde-schema-for-unreal-engine#backendconfig)模式中有说明。

### 常见命名空间

Horde中的某些子系统使用常见命名空间名称，并且你可以根据自身需求进行配置。这些名称在 `StorageConfig.cs` 中定义，目前包括以下内容：

名称

说明

`horde-artifacts`

存储CI系统中作业步骤生成的构件

`horde-perforce`

CI系统使用的复制的Perforce数据

`horde-logs`

CI系统中的步骤生成的日志

`horde-tools`

可从Horde操作面板下载的独立工具

## 参考

-   [术语表](/documentation/zh-cn/unreal-engine/horde-glossary-for-unreal-engine)

-   [horde](https://dev.epicgames.com/community/search?query=horde)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [简介](/documentation/zh-cn/unreal-engine/horde-storage-configuration-for-unreal-engine#%E7%AE%80%E4%BB%8B)
-   [命名空间和后端](/documentation/zh-cn/unreal-engine/horde-storage-configuration-for-unreal-engine#%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4%E5%92%8C%E5%90%8E%E7%AB%AF)
-   [命名空间](/documentation/zh-cn/unreal-engine/horde-storage-configuration-for-unreal-engine#%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4)
-   [后端](/documentation/zh-cn/unreal-engine/horde-storage-configuration-for-unreal-engine#%E5%90%8E%E7%AB%AF)
-   [常见命名空间](/documentation/zh-cn/unreal-engine/horde-storage-configuration-for-unreal-engine#%E5%B8%B8%E8%A7%81%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4)
-   [参考](/documentation/zh-cn/unreal-engine/horde-storage-configuration-for-unreal-engine#%E5%8F%82%E8%80%83)
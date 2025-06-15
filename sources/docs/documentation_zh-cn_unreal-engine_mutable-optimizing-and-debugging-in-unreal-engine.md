# 虚幻引擎中的Mutable优化和调试。 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mutable-optimizing-and-debugging-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:03:47.423Z

---

目录

![Mutable优化和调试](https://dev.epicgames.com/community/api/documentation/image/5ccd8ea8-725b-4b9a-9f3e-c33a78a437df?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**Mutable** 是一个面向虚幻引擎的工具集，用于在编辑器中或在运行时生成动态骨骼网格体、材质和纹理。它旨在帮助美术师和设计人员创建角色自定义系统，但也可以生成各种动态内容，例如动物、道具以及其他骨骼网格体资产。

本节包含使用Mutable对骨骼网格体内容进行调试和优化的最佳实践方法以及参考指南。

[

![运行时资源使用情况](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5944a2e0-ebc5-4a0c-a696-900adeceb8d8/topic-image.png)

运行时资源使用情况

关于Mutable在运行时如何使用系统资源的指南。





](/documentation/zh-cn/unreal-engine/mutable-resource-usage-at-runtime-in-unreal-engine)[

![打包Mutable项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c037a51-aff8-4f28-b1a3-8f7a5314f57a/topic-image.png)

打包Mutable项目

关于Mutable如何打包虚幻引擎项目的概述。





](/documentation/zh-cn/unreal-engine/packaging-mutable-projects-in-unreal-engine)[

![使用可自定义状态](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a39a9d64-6758-41d6-8284-6bcc811d4934/topic-image.png)

使用可自定义状态

使用可自定义状态优化Mutable内容的概述。





](/documentation/zh-cn/unreal-engine/using-customizable-states-in-mutable-with-unreal-engine)[

![使用细节级别](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab823035-9aa3-4a45-ae2c-0812d0a8dc7d/topic-image.png)

使用细节级别

Mutable的细节级别(LOD)工具概述。





](/documentation/zh-cn/unreal-engine/using-levels-of-detail-in-mutable-in-unreal-engine)[

![Mutable纹理流送](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a96e06a4-9797-41c7-b98f-0708af84450e/topic-image.png)

Mutable纹理流送

Mutable的纹理流送概述。





](/documentation/zh-cn/unreal-engine/mutable-texture-streaming-in-unreal-engine)[

![存储和复制](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0bf4aae-88d4-427e-a057-e24739537a92/topic-image.png)

存储和复制

Mutable如何存储和复制网格体数据的概述。





](/documentation/zh-cn/unreal-engine/mutable-storage-and-replication-in-unreal-engine)

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [working with content](https://dev.epicgames.com/community/search?query=working%20with%20content)
-   [skeletal mesh](https://dev.epicgames.com/community/search?query=skeletal%20mesh)
-   [mutable](https://dev.epicgames.com/community/search?query=mutable)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
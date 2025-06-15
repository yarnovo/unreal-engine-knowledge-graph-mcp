# 虚幻引擎中的Mutable开发指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mutable-development-guides-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:03:08.412Z

---

目录

![Mutable开发指南](https://dev.epicgames.com/community/api/documentation/image/d6e7476f-3f79-4f6e-b23d-c274b53a55f9?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**Mutable** 是一个面向虚幻引擎的工具集，用于在编辑器中或在运行时生成动态骨骼网格体、材质和纹理。它旨在帮助美术师和设计人员创建角色自定义系统，但也可以生成各种动态内容，例如动物、道具以及其他骨骼网格体资产。

本节包含使用Mutable创建骨骼网格体内容的最佳实践方法以及参考指南。

[

![纹理布局](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88b0c1e9-8ff4-4037-bed1-55dba8c657c6/topic-image.png)

纹理布局

了解在虚幻引擎中如何搭配Mutable插件使用不同的纹理布局。





](/documentation/zh-cn/unreal-engine/texture-layouts)[

![使用多个UV通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcceb898-d608-4be2-be9a-5bb8e8cbe62a/topic-image.png)

使用多个UV通道

了解在虚幻引擎中使用Mutable插件时如何使用多个UV通道。





](/documentation/zh-cn/unreal-engine/working-with-multiple-uv-channels-with-mutable-in-unreal-engine)[

![烘焙实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b33162e7-c788-48ae-8e9c-f95621c5209f/topic-image.png)

烘焙实例

关于使用Mutable烘焙骨骼网格体实例的指南。





](/documentation/zh-cn/unreal-engine/baking-instances-using-mutable-in-unreal-engine)[

![群体和人群](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b7e79da-bbc3-402f-a9bf-f8dce19c05f3/topic-image.png)

群体和人群

如何使用Mutable创建多样化群体和人群的概述。





](/documentation/zh-cn/unreal-engine/populations-and-crowds)[

![实时变形](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a38e192e-b479-410c-9c5f-b34fe9d14f1c/topic-image.png)

实时变形

了解如何搭配使用实时变形目标和Mutable插件。





](/documentation/zh-cn/unreal-engine/mutable-real-time-morphs-in-unreal-engine)[

![物理和布料](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad2cae68-8922-40bc-9e9b-4b997edf8b18/topic-image.png)

物理和布料

了解如何通过Mutable插件使用物理资产和布料资产。





](/documentation/zh-cn/unreal-engine/mutable-physics-and-clothing-in-unreal-engine)[

![使用Groom和Mutable](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2b4d41d-c197-4a44-ad27-942bcdd4dc3c/topic-image.png)

使用Groom和Mutable

关于搭配使用Groom和Mutable的指南





](/documentation/zh-cn/unreal-engine/using-grooms-with-mutable-in-unreal-engine)[

![使用Mutable和MetaHuman](images/static/document_list/empty_thumbnail.svg)

使用Mutable和MetaHuman

如何搭配使用Metahuman和Mutable角色。





](/documentation/zh-cn/unreal-engine/using-mutable-and-metahumans-in-unreal-engine)[

![使用UI元数据](images/static/document_list/empty_thumbnail.svg)

使用UI元数据

如何搭配使用UI元数据和Mutable角色。





](/documentation/zh-cn/unreal-engine/using-ui-metadata-in-unreal-engine)[

![从C++使用Mutable](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d832ef68-8fd1-448a-92d2-1e6498bcf47b/topic-image.png)

从C++使用Mutable

如何从C++使用Mutable角色。





](/documentation/zh-cn/unreal-engine/using-mutable-from-cplusplus-in-unreal-engine)[

![从蓝图使用Mutable](images/static/document_list/empty_thumbnail.svg)

从蓝图使用Mutable

如何从蓝图使用Mutable角色。





](/documentation/zh-cn/unreal-engine/using-mutable-from-blueprint-in-unreal-engine)

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [working with content](https://dev.epicgames.com/community/search?query=working%20with%20content)
-   [skeletal mesh](https://dev.epicgames.com/community/search?query=skeletal%20mesh)
-   [mutable](https://dev.epicgames.com/community/search?query=mutable)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
# 虚幻引擎材质导入参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/importing-materials-reference-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:59:51.539Z

---

目录

![材质导入参考](https://dev.epicgames.com/community/api/documentation/image/3c57f5b1-fad9-4f68-b40d-2e8a074b641a?resizing_type=fill&width=1920&height=335)

此参考指南中使用的参考图片来自 **3DS Max** 和 **Maya**。此参考指南只介绍3DS Max和Maya，但实际上您也可以使用其他3D建模程序。

虚幻引擎FBX导入管线使用 **FBX 2020.2**。在导出时使用其他版本可能会导致不兼容。

选择3D美术工具

Autodesk Maya Autodesk 3ds Max

## 支持的材质

虚幻引擎的FBX流程支持以下材质：

*表面* 各向异性 *Blinn* Lambert *Phong* Phone E

*标准* 多/子对象

虚幻引擎的FBX流程只支持基础材质。不常见的贴图（纹理）类型将不会被导入。

## 材质命名

虚幻引擎对材质的命名与其来源的应用程序相关。

就Maya而言，虚幻编辑器中的材质名由Maya中应用到网格体的着色引擎命名转换而来。

![mat_name_maya.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9df5f2e-7c4d-426b-b659-a2e7269fb600/mat_name_maya.jpg)

就3dsMax而言，虚幻编辑器中的材质名由3dsMax中应用到网格体的材质命名直接转换而来。

![mat_name_max.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90680f3d-42e5-442c-8da6-4d014a913a95/mat_name_max.jpg)

## 材质排序

如需要对材质进行排序，可使用 **\*\_skin##** 命名规则指定导入材质的排序。

例如，对材质进行相应的命名即可形成排序：

-   `M_ExampleMesh_skin00`
-   `M_ExampleMesh_skin01`

## 导入带多个材质的网格体

虚幻引擎的FBX流程可导入带多个材质的网格体。

就网格体上使用多种材质而言，Maya非常简单明了。您只需选择想要对其应用材质的网格体表面，然后应用材质即可。

![mat_mult_maya.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53efb01b-f77f-4bb9-984c-ad26e2299ee5/mat_mult_maya.jpg) ![mat_mult_maya_result.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c47307af-fe81-46be-9c2c-3d69519cd097/mat_mult_maya_result.jpg)

针对Maya中应用于网格体的每个材质，都将在虚幻编辑器中创建一个材质，导入的网格体对于其中每种材质都有对应的材质插槽。应用于网格体后，材质仅影响网格体的对应多边形，就像Maya中一样。

在3dsMax中，多个材质通过使用 **Multi/Sub-Object** 材质进行处理。网格体的每个面有一个\_Material ID\_，Multi/Sub-Object材质中的每个Standard材质应用于对应的\_Material ID\_。

![mat_multi_max.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7e20a69-ecf9-4cdb-ab69-ea00c249e950/mat_multi_max.jpg) ![mat_multi_max_result.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3fc6ab1-7f15-4a3a-bdbb-934661e2a475/mat_multi_max_result.jpg)

针对Multi/Sub-Object材质中的每个Standard材质，都将在虚幻编辑器中创建一个材质，导入的网格体对于其中每种材质都有对应的材质插槽。应用于网格体后，材质仅影响网格体的对应多边形，就像3dsMax中一样。

## 导入纹理

如材质的纹理在3D程序中被指定为漫反射或法线贴图，只要 **导入纹理** 设置已启用，这些纹理都将被导入虚幻引擎。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [import](https://dev.epicgames.com/community/search?query=import)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [支持的材质](/documentation/zh-cn/unreal-engine/importing-materials-reference-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84%E6%9D%90%E8%B4%A8)
-   [材质命名](/documentation/zh-cn/unreal-engine/importing-materials-reference-in-unreal-engine#%E6%9D%90%E8%B4%A8%E5%91%BD%E5%90%8D)
-   [材质排序](/documentation/zh-cn/unreal-engine/importing-materials-reference-in-unreal-engine#%E6%9D%90%E8%B4%A8%E6%8E%92%E5%BA%8F)
-   [导入带多个材质的网格体](/documentation/zh-cn/unreal-engine/importing-materials-reference-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%B8%A6%E5%A4%9A%E4%B8%AA%E6%9D%90%E8%B4%A8%E7%9A%84%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [导入纹理](/documentation/zh-cn/unreal-engine/importing-materials-reference-in-unreal-engine#%E5%AF%BC%E5%85%A5%E7%BA%B9%E7%90%86)
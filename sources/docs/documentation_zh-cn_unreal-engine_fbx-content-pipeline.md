# FBX内容管线 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fbx-content-pipeline
> 
> 生成时间: 2025-06-14T18:59:27.015Z

---

目录

![FBX内容管线](https://dev.epicgames.com/community/api/documentation/image/ef2e40ab-f747-4122-9cd3-8c96e15cfeb1?resizing_type=fill&width=1920&height=335)

虚幻引擎支持以多种文件格式将内容导入项目。

FBX是一种灵活的文件格式，归Autodesk所有，可以提供数字内容创建（DCC）应用程序之间的互操作性。某些应用程序（例如Autodesk Motionbuilder）本身支持该格式。而Autodesk Maya、Autodesk 3ds Max和Blender等其他软件使用FBX插件支持该格式。

与其他导入方法相比，虚幻FBX导入通道的优点是：

-   对静态网格体、骨骼网格体、动画和变形目标使用单一文件格式。
-   在一次导入操作中导入多个LOD和Morph/Blendshape。
-   导入材质和纹理资产，并自动将它们应用到静态网格体。

虚幻引擎FBX导入通道使用 **FBX 2020.2** 。在导出期间使用不同的版本可能会导致不兼容。

[

![FBX动画流程](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0fa1a5ec-d911-44ad-8320-d31b05913b2f/placeholder_topic.png)

FBX动画流程

使用FBX内容通道设置、导出和导入骨架网格体的动画。





](/documentation/zh-cn/unreal-engine/fbx-animation-pipeline-in-unreal-engine)[

![FBX资源元数据管线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b27c522f-cbec-43e5-8d53-120d96950638/placeholder_topic.png)

FBX资源元数据管线

描述如何通过FBX将定制的用户自定义属性导入虚幻引擎，以及如何使用蓝图和Python在虚幻编辑器中使用它们。





](/documentation/zh-cn/unreal-engine/fbx-asset-metadata-pipeline-in-unreal-engine)[

![FBX导入选项参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c6bff4d-0dc5-4058-8790-04adff60871b/placeholder_topic.png)

FBX导入选项参考

FBX导入选项对话框中可用选项的说明。





](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine)[

![FBX材质管道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3d146db-3ebe-49bd-92ff-4f6c6edb2a42/placeholder_topic.png)

FBX材质管道

有关使用FBX内容管道传输基本材质和纹理与网格体的指南。





](/documentation/zh-cn/unreal-engine/fbx-material-pipeline-in-unreal-engine)[

![FBX变换目标管线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72906fd1-26f5-4fc9-ae94-6c25096bc33d/placeholder_topic.png)

FBX变换目标管线

使用FBX内容通道为骨架网格体创建和导入变换目标。





](/documentation/zh-cn/unreal-engine/fbx-morph-target-pipeline-in-unreal-engine)[

![FBX场景导入](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e736822a-7028-4bf1-8780-921b7031fae4/placeholder_topic.png)

FBX场景导入

使用Import Into Level（导入至关卡）将完整FBX场景导入虚幻引擎4。





](/documentation/zh-cn/unreal-engine/fbx-scene-import-in-unreal-engine)[

![骨架网格体管道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c9366a0-9949-44e3-a3a9-9951e6c50ad0/placeholder_topic.png)

骨架网格体管道

使用FBX内容通道设置、导出和导入骨架网格体。





](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine)[

![FBX静态网格体管线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2947ea0-d06e-479b-b373-f7dfac48ef1c/topic-image.png)

FBX静态网格体管线

使用FBX内容流程设置、导出和导入静态网格体。





](/documentation/zh-cn/unreal-engine/fbx-static-mesh-pipeline-in-unreal-engine)[

![FBX 导入错误](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/295c59c5-c353-473c-9866-bb178034639a/placeholder_topic.png)

FBX 导入错误





](/documentation/zh-cn/unreal-engine/fbx-import-errors-in-unreal-engine)

-   [static meshes](https://dev.epicgames.com/community/search?query=static%20meshes)
-   [working with content](https://dev.epicgames.com/community/search?query=working%20with%20content)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
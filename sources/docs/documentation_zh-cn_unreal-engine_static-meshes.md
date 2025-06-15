# 静态网格体 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/static-meshes
> 
> 生成时间: 2025-06-14T19:01:41.892Z

---

目录

![静态网格体](https://dev.epicgames.com/community/api/documentation/image/7d81f638-4c4a-4c02-bb66-fe6eab42bd33?resizing_type=fill&width=1920&height=335)

静态网格体资产是虚幻引擎中的一种基本单位，用于在关卡中创建场景几何体。这些3D模型在外部建模程序（如3dsMax、Maya、Blender等）中创建，并通过内容浏览器导入到虚幻编辑器中。使用虚幻引擎制作的关卡中，绝大部分内容都是由静态网格体组成；这些内容通常以静态网格体Actor的形式存在。

由于静态网格体被缓存在显存中，所以它们可以平移、旋转和缩放，并且可以比其他类型的几何体更加复杂。

[

![创建并使用 LOD](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93cc8c24-39e8-43fc-8da4-44ab573f120f/topic-image.png)

创建并使用 LOD

如何创建并使用 LOD。





](/documentation/zh-cn/unreal-engine/creating-and-using-lods-in-unreal-engine)[

![导入静态网格体模型](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09cc74f8-aaf2-4d46-bed1-cda58893d953/topic-image.png)

导入静态网格体模型

如何将静态网格模型导入 UE4。





](/documentation/zh-cn/unreal-engine/importing-static-meshes-in-unreal-engine)[

![理解虚幻引擎中的光照贴图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de010fa6-24c9-42ed-b7f2-728a27b1bc67/placeholder_topic.png)

理解虚幻引擎中的光照贴图

关于为静态网格体设置光照贴图UV的技巧和指南。





](/documentation/zh-cn/unreal-engine/understanding-lightmapping-in-unreal-engine)[

![代理几何工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ec74f3b-39f4-450a-a957-cfc81f33f0d6/placeholder_topic.png)

代理几何工具

代理几何工具集是一种提高您的虚幻引擎4(UE4)项目性能，同时保持您项目的视觉质量不受影响的工具。





](/documentation/zh-cn/unreal-engine/proxy-geometry-tool-in-unreal-engine)[

![为静态网格体设置碰撞体积](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/714a9585-26fd-4be2-9bf7-a33500f25611/topic-image.png)

为静态网格体设置碰撞体积

如何设置碰撞





](/documentation/zh-cn/unreal-engine/setting-up-collisions-with-static-meshes-in-unreal-engine)[

![设置静态网格体的材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9c9901f-8ff6-4bf2-a5fe-1f59d14cbccf/topic-image.png)

设置静态网格体的材质

如何在静态网格体编辑器中为网格体设置材质。





](/documentation/zh-cn/unreal-engine/using-materials-with-static-meshes-in-unreal-engine)[

![根据平台设置LOD](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6655457-e759-44a0-a168-2a1530667c63/topic-image.png)

根据平台设置LOD

讲解如何根据平台设置LOD。





](/documentation/zh-cn/unreal-engine/setting-up-per-platform-lods)[

![为静态网格体自动生成LOD](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f699580-7187-4569-b42d-d41ab71fad34/topic-image.png)

为静态网格体自动生成LOD

如何在UE5中使用自动LOD生成系统。





](/documentation/zh-cn/unreal-engine/static-mesh-automatic-lod-generation-in-unreal-engine)[

![静态网格体编辑器UI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dada01ce-2c2e-4b9c-9bc8-2e874af446e8/topic-image.png)

静态网格体编辑器UI

用于预览外观、碰撞和UV以及设置和操作静态网格体资产的属性的工具。





](/documentation/zh-cn/unreal-engine/static-mesh-editor-ui-in-unreal-engine)[

![静态网格体变形目标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c78dad2b-9aa4-4d94-9d32-784a2cc351a5/placeholder_topic.png)

静态网格体变形目标

使用变形目标和场景位置偏移使静态网格体变形。





](/documentation/zh-cn/unreal-engine/static-mesh-morph-targets-in-unreal-engine)[

![为静态网格物体设置插槽并使用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a3a6e86-cfcf-4416-a3c1-034fb1612c44/topic-image.png)

为静态网格物体设置插槽并使用

如何设置和使用 Socket





](/documentation/zh-cn/unreal-engine/using-sockets-with-static-meshes-in-unreal-engine)[

![将UV通道用于静态网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58f8da8e-335a-48d7-a57d-0275216f3c6e/topic-image.png)

将UV通道用于静态网格体

UV通道对于渲染静态网格体的作用，以及如何在虚幻编辑器中使用。





](/documentation/zh-cn/unreal-engine/using-uv-channels-with-static-meshes-in-unreal-engine)[

![Instanced Static Mesh Component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2dfee0b1-a292-4bdd-a8f2-473e3e36d583/topic.png)

Instanced Static Mesh Component

Learn to optimize a project through instancing with the instanced static mesh component.





](/documentation/en-us/unreal-engine/instanced-static-mesh-component-in-unreal-engine)[

![为不同平台优化LOD屏幕大小](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6757ca87-2c45-454c-b511-791396ab6c27/topic-image.png)

为不同平台优化LOD屏幕大小

如何为不同平台优化LOD屏幕大小。





](/documentation/zh-cn/unreal-engine/optimizing-lod-screen-size-per-platform-in-unreal-engine)

-   [static meshes](https://dev.epicgames.com/community/search?query=static%20meshes)
-   [working with content](https://dev.epicgames.com/community/search?query=working%20with%20content)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
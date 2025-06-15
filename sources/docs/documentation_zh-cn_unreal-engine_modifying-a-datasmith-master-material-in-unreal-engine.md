# 修改虚幻引擎中的Datasmith主材质 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/modifying-a-datasmith-master-material-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:04:43.554Z

---

目录

![修改Datasmith主材质](https://dev.epicgames.com/community/api/documentation/image/81f4d252-4335-4c5d-99dd-0b090ca91f98?resizing_type=fill&width=1920&height=335)

正如[Datasmith概述](/documentation/zh-cn/unreal-engine/datasmith-plugins-overview)和[Datasmith导入流程](/documentation/zh-cn/unreal-engine/datasmith-import-process-in-unreal-engine)中介绍的，Datasmith会在你的项目中创建材质实例，每个材质实例都对应原始场景中检测到的一种表面。这些材质实例各自都会公开一个预设的属性列表，你可以在虚幻引擎项目中自由地修改这些属性。

但是，如果你想要修改作为你的任何Datasmith材质实例基础的主材质，一定要创建原主材质的副本，将该副本保存在项目内容中，对副本进行修改，然后设置材质实例指向副本主材质。

本页面的以下说明提供了进行此操作的逐步指导。

-   Datasmith使用的预设父材质资源——例如 **Datasmith\_Color**、**SketchUpMaster** 和 **RevitMaster** 材质——都包含在Datasmith插件内容中。如果你对这些父材质进行任何更改，就是在为所有项目更改它们，而不仅仅是针对你的当前项目。而且你的更改不会保存在项目中，所以如果你需要将项目分发给其他人，或者升级到新版本的虚幻引擎，你就会丢失这些更改。一定要在项目的content文件夹中制作一个副本。
    
-   即使你是在项目的content文件夹中处理Datasmith创建的父材质——通常是针对从3ds Max或Rhino导入的自定义材质创建的父材质——你也应该始终按照这些程序创建原父材质的副本，而不应直接修改原父材质。对父材质图的更改不会保留，因为Datasmith会覆盖它们，所以在你下一次重新导入Datasmith场景资源时就会丢失你的更改。
    

## 步骤

要复制并修改Datasmith创建的任何材质实例的父材质：

1.  双击你要修改父材质的材质实例。这会在材质实例编辑器中打开该材质实例。
    
2.  在 **细节（Detail）** 面板中，找到 **常规（General）> 父代（Parent）** 设置。这可以让你找到提供此材质实例所基于的材质图的父材质。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56d7db5c-5bce-40fc-8311-8bb440099832/material-instance-parent-setting.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56d7db5c-5bce-40fc-8311-8bb440099832/material-instance-parent-setting.png)
    
    点击查看大图
    
3.  双击该 **父代** 的缩略图。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/abdce190-04db-4950-ad20-4da7fb293182/material-instance-parent-thumbnail.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/abdce190-04db-4950-ad20-4da7fb293182/material-instance-parent-thumbnail.png)
    
    点击查看大图
    
    这会在材质编辑器中打开父材质，你可以在其中看到它的材质图。
    
    你也可以使用工具栏中的 **层级（Hierarchy）** 按钮选择并打开父材质。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1fdbabff-b9f3-46c2-aaaa-58c37e514730/material-instance-hierarchy.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1fdbabff-b9f3-46c2-aaaa-58c37e514730/material-instance-hierarchy.png)
    
    点击查看大图
    
4.  在父材质编辑器的主菜单中，选择 **文件（File）> 另存为（Save As）**，在项目的content文件夹的任何位置保存父材质的副本。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6cc5d2cf-350b-43cd-99c1-179045068b24/material-parent-saveas.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6cc5d2cf-350b-43cd-99c1-179045068b24/material-parent-saveas.png)
    
    点击查看大图
    
5.  回到你的材质实例，更改 **常规（General）> 父代（Parent）** 设置，使其指向你新创建的主材质。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09e9e17b-168e-470a-9705-9a57c9b3179e/material-instance-change-parent.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09e9e17b-168e-470a-9705-9a57c9b3179e/material-instance-change-parent.png)
    
    点击查看大图
    
6.  **保存（Save）** 该材质实例。
    

## 最终结果

你已经创建了一个新的父材质，它是从Datasmith分配的默认父材质复制的，而且你已经将这个新的父材质分配给了你的材质实例。现在，你对复制的主材质中的图表和设置进行的任何更改都会立即应用到材质实例。而且在你下一次重新导入Datasmith场景资源时，将不会丢失你在复制的父材质中做过的任何更改。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/modifying-a-datasmith-master-material-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/modifying-a-datasmith-master-material-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)

相关文档

[

材质实例编辑器用户界面

![材质实例编辑器用户界面](https://dev.epicgames.com/community/api/documentation/image/45f14f92-be4d-4438-ab64-0051a45a21a7?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui)
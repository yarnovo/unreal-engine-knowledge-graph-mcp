# 从Revit将Datasmith内容导出到虚幻引擎 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/exporting-datasmith-content-from-revit-to-unreal-engine
> 
> 生成时间: 2025-06-14T19:06:02.497Z

---

目录

![从Revit导出Datasmith内容](https://dev.epicgames.com/community/api/documentation/image/26210f38-d343-41ac-95c6-c947efe41d48?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

安装Revit的Datasmith Exporter插件后，**插件（Add-Ins）** 条带中便有可用的新选项，用于将选定的3D视图导出到一个 *.udatasmith* 文件。

![Datasmith ribbon in Revit](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e589aaee-003a-46a9-b588-3faf29aed8e3/datasmith-ribbon-revit.png)

在Revit中执行以下步骤，导出场景使用此文件类型。

1.  在 **项目浏览器** 中选择需要导出的3D视图。
    
    ![Select a 3D View](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c14ce2fc-bca2-497d-9d91-0eca3a05e66d/revit-select-3d-view.png "Select a 3D View")
    
    Datasmith Exporter插件使用为当前3D视图定义的可视性设置来确定场景的哪些部分需要导出。欲知详情，请参见[Revit](/documentation/zh-cn/unreal-engine/using-datasmith-with-revit-in-unreal-engine)。
    
2.  打开 **Datasmith** 条带，然后点击 **导出3D视图（Export 3D View）**。
    
    ![Export 3D View button on the Datasmith toolbar](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2f655f9-7d31-4ee6-8b26-4c3ec9cb7939/revit-toolbar.png "Export 3D View button on the Datasmith toolbar")
3.  在 **将3D视图导出到Unreal Datasmith（Export 3D View to Unreal Datasmith）** 窗口中，浏览到要保存 .udatasmith 文件的位置，然后使用 **文件名框** 来为新文件命名。
    
    ![Set the location and file name](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a6b6d0b-b4ea-4cfa-a4bb-9419c580166a/revit-ds-export-location.png "Set the location and file name")
4.  点击 **保存**。
    

### 最终结果

现在便已准备好将新的 *.udatasmith* 文件导入到虚幻编辑器中。请参阅[将Datasmith内容导入到虚幻引擎中](/documentation/zh-cn/unreal-engine/importing-datasmith-content-into-unreal-engine)和[](/documentation/404)部分。

新的 *.udatasmith* 文件拥有一个命名相同的文件夹，但带有后缀 *\_Assets*。如果将 *.udatasmith* 文件移动到一个新位置，则必须将此文件夹移动到相同位置。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [revit](https://dev.epicgames.com/community/search?query=revit)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [最终结果](/documentation/zh-cn/unreal-engine/exporting-datasmith-content-from-revit-to-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
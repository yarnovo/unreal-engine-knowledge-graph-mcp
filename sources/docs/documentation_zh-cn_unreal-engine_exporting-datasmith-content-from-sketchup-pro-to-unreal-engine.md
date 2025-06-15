# 从SketchUp Pro将Datasmith内容导出到虚幻引擎 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/exporting-datasmith-content-from-sketchup-pro-to-unreal-engine
> 
> 生成时间: 2025-06-14T19:06:06.952Z

---

目录

![从SketchUp Pro导出Datasmith内容](https://dev.epicgames.com/community/api/documentation/image/b3e874f5-c076-4460-a8e8-f9a51aa1763c?resizing_type=fill&width=1920&height=335)

安装好SketchUp Datasmith导出器插件之后，导出场景时，就会出现一个新的文件类型—— *.UDATASMITH*。

为SketchUp安装完Datasmith插件后，会出现一个新的工具栏。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90b87a47-ff30-41cc-b6e2-2753d7f6ae06/datasmith-toolbar-sketchup.png)

安装好SketchUp Datasmith导出器插件之后，保存或导出场景时，就会出现一个新的文件类型—— **Unreal Datasmith** （`.udatasmith`）。

请在SketchUp中执行以下步骤来使用该新文件类型导出场景。

1.  在SketchUp的 **文件（File）** 菜单中，选择 **导出（Export） > 3D模型（3D Model）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f4f278c-e507-45c0-8bac-987bd2053ff7/datasmith-toolbar-export.png)
2.  在 **导出模型（Export Model）** 窗口中，从 **保存类型（Save as type）** 下拉列表中选择 **Unreal Datasmith**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b60d9458-adcd-478d-bad6-92605dc453cc/sketchup_export_model.png)
3.  浏览至要保存新文件的位置，设置其文件名，然后单击 **导出（Export）**。
    

### 最终结果

现在你可以尝试将新的 *.udatasmith* 文件导入到虚幻编辑器中。请参阅[将Datasmith内容导入到虚幻引擎中](/documentation/zh-cn/unreal-engine/importing-datasmith-content-into-unreal-engine)。

除了新的 `.udatasmith` 文件以外，你还将看到名称与.udatasmith文件相同，但后缀为 `_Assets` 的文件夹。如果将 `.udatasmith` 文件移到新位置，请确保也将该文件夹移到相同的位置。

-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [enterprise](https://dev.epicgames.com/community/search?query=enterprise)
-   [sketchup](https://dev.epicgames.com/community/search?query=sketchup)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [最终结果](/documentation/zh-cn/unreal-engine/exporting-datasmith-content-from-sketchup-pro-to-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
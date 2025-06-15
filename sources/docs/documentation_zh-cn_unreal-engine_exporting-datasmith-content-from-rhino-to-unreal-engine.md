# 从Rhino中将Datasmith内容导出到虚幻引擎 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/exporting-datasmith-content-from-rhino-to-unreal-engine
> 
> 生成时间: 2025-06-14T19:06:06.417Z

---

目录

![从Rhino中导出Datasmith内容](https://dev.epicgames.com/community/api/documentation/image/9ddad4e1-e6a4-4372-922d-c5d2529931d0?resizing_type=fill&width=1920&height=335)

安装好用于Rhino的Datasmith导出器插件后，在保存或导出场景时，选项中将出现 **虚幻Datasmith**（`.udatasmith`） 文件类型。

![新的Rhino导出选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1090e61a-49a5-4a24-a7c8-7f6795dad514/rhinoexportoption.png "新的Rhino导出选项")

请在Rhino中按照下述步骤使用此新文件类型导出场景。

从Rhino的文件（File）菜单中，选择以下选项中的一项：

![Rhino导出菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f620933-0c2c-4781-a634-3e8e1657f7b0/rhinoexportmenu.png "Rhino导出菜单")

-   **另存为（Save As）**：生成 *\*.udatasmith* file 文件，其中包含所有可见元素。
    
-   **导出选中项...**: 生成 *\*.udatasmith* file 文件，其中包含所有被选中的元素。不包含任何选定元素的层不会被导出。
    
-   **导出并设定原点...**: 生成 *\*.udatasmith* file 文件，其中包含所有可见元素。导出场景并设定位置偏移。
    

在 **导出（Export）** 窗口中，从 **保存类型（Save As type）** 下拉列表中选择 **虚幻Datasmith（\*.udatasmith）** 选项。

![Rhino导出文件类型](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/813777bf-35de-4ff9-8102-806e3adaa748/rhinoexportfiletype.png "Rhino导出文件类型")

浏览到希望保存导出文件的位置，设置 **文件名**，然后点击 **保存（Save）**。

或者，点击Datasmith工具栏中的 **导出3D视图** 按钮。这会创建一个包含所有可视元素的 `.udatasmith` 文件。

![Datasmith toolbar Export 3D View button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd4ce8ce-0ac1-4616-b88e-5d8088cca840/datasmith-export-3d-view.png)

关于Datasmith工具栏的更多详情，请参阅[使用Datasmith工具栏](/documentation/zh-cn/unreal-engine/using-datasmith-with-rhino-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%A0%8F)。

## 最终结果

现在你应该可以试着将 `.udatasmith` 文件导入虚幻引擎了。参阅[将Datasmith内容导入到虚幻引擎中](/documentation/zh-cn/unreal-engine/importing-datasmith-content-into-unreal-engine)。在导入过程中，如果需要对数据进行清理、合并或其他修改操作，请参阅[Dataprep导入自定义](/documentation/zh-cn/unreal-engine/dataprep-import-customization-in-unreal-engine)。

-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [enterprise](https://dev.epicgames.com/community/search?query=enterprise)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [最终结果](/documentation/zh-cn/unreal-engine/exporting-datasmith-content-from-rhino-to-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
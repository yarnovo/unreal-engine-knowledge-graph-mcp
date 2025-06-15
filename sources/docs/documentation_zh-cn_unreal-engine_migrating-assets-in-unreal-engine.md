# 在虚幻引擎中迁移资产 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/migrating-assets-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:57:23.507Z

---

目录

![迁移资产](https://dev.epicgames.com/community/api/documentation/image/f6a7a25e-db42-4305-b4dd-8856d290acdf?resizing_type=fill&width=1920&height=335)

如果想在多个项目中使用相同的资产，可以使用 **迁移工具** 复制资产及其引用和依赖项。例如，如果迁移材质，任何定义该材质的纹理资产都将自动与材质一起复制。当需要合并或派生项目，或者从测试环境过渡到生产项目时，此方法非常有用。

要使用迁移工具，请按照以下步骤操作：

1.  从 **内容浏览器（Content Browser）** 中选择要迁移的资产。
    
    -   要选择多项资产，请按住 **Ctrl键** 并 **左键单击** 想选择的每项资产。
    -   如果想要选择一系列资产，请 **左键单击** 第一项，然后按住 **Shift键** 并 **左键单击** 最后一项。这样将选中第一项和最后一项之间的所有资产。
    
    ![Selecting Assets to migrate from the Content Browser](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7aa72a97-54f8-477f-bcba-28fdf72eb410/select-assets-to-migrate.png)
    
    在本例中，我们选择了四种材质资产。
    
2.  **右键单击** 任意一项选择的资产。在出现的上下文菜单中，选择 **资产操作（Asset Actions）>迁移（Migrate）**。
    
    这样将打开 **资产报告（Asset Report）** 窗口，其中显示即将在迁移过程中复制的所有资产。
    
    ![Asset Report window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f24e31d9-66e7-46e6-8c2f-905404097279/asset-report.png)
    
    如果不想迁移此列表中的某项资产，请取消选择该资产旁边的复选框。需要注意的是，这样可能会破坏尝试迁移的其他资产（例如，如果一种材质的某个纹理缺失，则该材质将无法正确显示）。
    
3.  单击 **确定（OK）** 确认你希望迁移资产。这样将打开一个文件浏览器窗口，你可以在其中选择要接受资产迁移的项目（也称为目标项目）。
    
    ![Selecting a destination folder](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7b337af-e6a8-4b21-8286-7930bf844a7b/select-destination.png)
    
    选择目标项目中的 `Content` 文件夹，然后单击 **选择文件夹（Select Folder）** 按钮。
    
4.  在确认迁移后，将显示一个进度条，用来跟踪迁移进度。
    
    如果目标项目的 `Content` 文件夹中包含与要迁移的资产同名的资产，你将看到以下警告消息：
    
    ![An asset already exists at (location), would you like to overwrite it?](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46c67578-7cee-49d7-a40f-e5f7beb39c63/asset-migration-warning.png)
    
    单击 **是（Yes）** 覆盖该资产，单击 **否（No）** 跳过该资产并继续迁移其他资产。你还可以通过单击 **全部选是（Yes All）** 或 **全部选否（No All）**，将此处的选择应用于所有资产。
    
5.  迁移完成后，你将看到一个对话框，确认已迁移所有资产。在此对话框中单击 **显示消息日志（Show Message Log）** 可查看已迁移资产的完整列表。
    
    ![A list of migrated Assets](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/726a6428-297d-43d2-9ef5-58370e241107/migration-log.png)

## 资产迁移故障排除

如果尝试将资产迁移到虚幻引擎项目的 `Content` 文件夹之外的位置，你将收到以下消息：

"\[文件路径\]不是游戏的Content文件夹。迁移的内容只有放在Content文件夹中才能正常使用。是否仍要将内容放在此处？"（"\[file path\] does not appear to be a game Content folder. Migrated content will only work properly if placed in a Content folder. Would you like to place your content here anyway?"）

如果你希望立即在目标项目中使用已迁移的内容，请单击 **否（No）** 并选择该项目的 `Content` 文件夹。

如果资产在迁移后未正确显示，请确认它的所有依赖项也已一同迁移。检查该资产在原始项目中是否正确显示，然后重新尝试迁移并确保在 **资产报告（Asset Report）** 窗口中选择该资产的所有依赖项。

-   [](https://dev.epicgames.com/community/search)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [资产迁移故障排除](/documentation/zh-cn/unreal-engine/migrating-assets-in-unreal-engine#%E8%B5%84%E4%BA%A7%E8%BF%81%E7%A7%BB%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4)
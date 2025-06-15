# 虚幻引擎美术师快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/artist-quick-start-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:59:24.590Z

---

目录

![美术师快速入门](https://dev.epicgames.com/community/api/documentation/image/03dbbfa0-35ae-40ee-b877-3363c8574ab9?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [新建项目](/documentation/zh-cn/unreal-engine/creating-a-new-project-in-unreal-engine)

选择操作系统：

Windows macOS Linux

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d88dd87-9027-43c0-b66f-eb44f7d67c7c/01-materials-header-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d88dd87-9027-43c0-b66f-eb44f7d67c7c/01-materials-header-1.png)

点击查看大图。

本快速入门指南展示如何将资产添加到 **虚幻引擎（UE5）** 游戏中。在学习完本指南后，你将会了解如何使用 **项目浏览器（Project Browser）** 创建新项目，以及如何通过浏览 **内容浏览器（Content Browser）** 查找和添加内容。你还会学习如何查找 **FBX内容通道（FBX Content Pipeline）** 相关信息，以及如何在将 **材质（Materials）** 应用到 **静态网格物体Actor（Static Mesh Actor）** 之前，使用 **材质编辑器（Material Editor）** 修改 **材质（Materials）**。

## 1\. 必要的项目设置

1.  从启动器打开 **虚幻引擎（Unreal Engine）**。
    
2.  点击 **游戏（Game）** > **空白（Blank）** 模板并使用以下设置新建项目：
    -   选择 **C++**
    -   选择 **含初学者内容包（With Starter Content）**
3.  我们需要输入一个项目名称，这里我们输入"Artist\_QuickStart"。
    
4.  现在点击 **创建项目（Create Project）** ，项目此时会开始创建。

**虚幻编辑器（Unreal Editor）** 现在会打开我们的新项目。**Visual Studio** 会同时打开并加载项目创建的解决方案文件。

## 2\. 创建文件夹

保持项目内容有条不紊始终是一种良好的做法。你首先要学习的是如何创建一个文件夹来存储导入的内容。

在开始之前：请从以下链接下载快速入门资产（Quick Start Assets）。

-   [示例资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/17d87a86-f211-4561-9256-9229fd506f31/quickstartsampleassets.zip)

1.  将下载的资产解压缩到计算机上的某个位置。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ccc36dc1-b545-4434-bcbb-0f3f290a80be/02-extracted-content.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ccc36dc1-b545-4434-bcbb-0f3f290a80be/02-extracted-content.png)
    
    点击查看大图。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1f10d94-d52b-4040-a3a0-d24a5cf36164/extractedcontent_mac.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1f10d94-d52b-4040-a3a0-d24a5cf36164/extractedcontent_mac.png)
    
    点击查看大图。
    
2.  从编辑器内的 **内容浏览器（Content Browser）** 中，单击 **新增（Add New）** 按钮。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/261e194a-6eb7-4553-b61b-660d851bc466/03-add-new-button.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/261e194a-6eb7-4553-b61b-660d851bc466/03-add-new-button.png)
    
    点击查看大图。
    
3.  选择 **新建文件夹（New Folder）**，创建一个新文件夹。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/efea56ab-0a66-4360-a55a-6cfc0386781f/04-new-folder-selection.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/efea56ab-0a66-4360-a55a-6cfc0386781f/04-new-folder-selection.png)
    
    点击查看大图。
    
4.  将该文件夹命名为 **QuickStartContent**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1df57c71-6a26-459f-ba69-d96a6c40cfb5/05-name-quick-start-content-folder.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1df57c71-6a26-459f-ba69-d96a6c40cfb5/05-name-quick-start-content-folder.png)
    
    点击查看大图。
    
5.  双击该 **QuickStartContent** 文件夹。
    

*命名规范很重要！命名文件夹和文件时请遵循这些规范。*

## 3\. 导入网格体

将内容添加到UE5项目的方法有几种；但我们将着重介绍内容浏览器的 **导入（Import）** 功能。

1.  在 **QuickStartContent** 文件夹中单击内容浏览器的 **导入（Import）** 按钮打开文件对话框。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e49f6067-6e95-40e4-b4a4-0dfbfb97c0dc/06-content-browser-import-button.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e49f6067-6e95-40e4-b4a4-0dfbfb97c0dc/06-content-browser-import-button.png)
    
    点击查看大图。
    
2.  找到并选择 **Basic\_Asset1** 和 **Basic\_Asset2** FBX网格体文件。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/584eb24e-1530-41af-82ae-134ecc3ed5a3/07-import-mesh-dialog-box.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/584eb24e-1530-41af-82ae-134ecc3ed5a3/07-import-mesh-dialog-box.png)
    
    点击查看大图。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b5f1db2-6f0c-49c3-bbf6-5eab3a804671/importmeshdialogbox_mac.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b5f1db2-6f0c-49c3-bbf6-5eab3a804671/importmeshdialogbox_mac.png)
    
    点击查看大图。
    
3.  单击 **打开（Open）** 开始将FBX网格体文件导入到你的项目中。
    
4.  编辑器中将显示 **FBX导入选项（FBX Import Options）** 对话框。单击 **导入（Import）** 或 **全部导入（Import All）** 会将你的网格体添加到项目。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2b6752c-5cc8-4fb3-a8cb-4e0c053b9654/08-fbx-import-options-dialog-box.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2b6752c-5cc8-4fb3-a8cb-4e0c053b9654/08-fbx-import-options-dialog-box.png)
    
    点击查看大图。
    
5.  单击 **全部保存（Save All）** 按钮保存已导入的网格体。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af9c3bef-c448-4046-b12d-b0119cda8e71/09-save-all-meshes-button.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af9c3bef-c448-4046-b12d-b0119cda8e71/09-save-all-meshes-button.png)
    
    点击查看大图。
    
6.  将显示 **保存内容（Save Content）** 对话框。单击 **保存选中项（Save Selected）** 保存导入的资产。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c07855f1-60f0-44d1-9713-6fb5a2a8fcc2/10-save-selected-dialog-box.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c07855f1-60f0-44d1-9713-6fb5a2a8fcc2/10-save-selected-dialog-box.png)
    
    点击查看大图。
    
7.  导航到 **QuickStartContent** 文件夹，验证UE5创建了对应的 **.uasset文件（.uasset files）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2400f70-1278-4c0a-8c82-6101922de7c6/11-quick-start-content-folder.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2400f70-1278-4c0a-8c82-6101922de7c6/11-quick-start-content-folder.png)
    
    点击查看大图。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d571adee-f674-49e5-8642-935572365497/quickstartcontentfolder_mac.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d571adee-f674-49e5-8642-935572365497/quickstartcontentfolder_mac.png)
    
    点击查看大图。
    

*整理你的资产，以便轻松找到它们。*

## 4\. 导入纹理

1.  在编辑器中导航到 **QuickStartContent** 文件夹，单击内容浏览器的 **导入（Import）** 按钮打开文件对话框。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b54e114-64e6-4068-bafc-a2b26a7f708a/12-content-browser-import-button.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b54e114-64e6-4068-bafc-a2b26a7f708a/12-content-browser-import-button.png)
    
    点击查看大图。
    
2.  找到并选择 **T\_Rock\_04\_D** 和 **T\_Rock\_04\_n** Targa (TGA)图像文件。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b61b0178-75f1-4925-afb1-0a48295def4c/13-import-texture-dialog-box.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b61b0178-75f1-4925-afb1-0a48295def4c/13-import-texture-dialog-box.png)
    
    点击查看大图。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc07701e-20e7-4498-8927-0dd13d1cd4c0/importtexturedialogbox_mac.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc07701e-20e7-4498-8927-0dd13d1cd4c0/importtexturedialogbox_mac.png)
    
    点击查看大图。
    
3.  单击 **打开（Open）** 开始将TGA图像文件导入项目。
    
4.  虚幻编辑器的右下角将出现一个确认框。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16265263-430c-4059-aed6-76861a5c2d1b/14-texture-normal-confirmation.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16265263-430c-4059-aed6-76861a5c2d1b/14-texture-normal-confirmation.png)
    
    点击查看大图。
    
5.  单击 **确定（OK）** 接受 **T\_Rock\_04\_n.TGA** 法线贴图的设置。
    
6.  单击 **全部保存（Save All）** 按钮保存导入的图像。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b559378-bba0-424d-9563-1cef8409f346/15-save-all-textures.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b559378-bba0-424d-9563-1cef8409f346/15-save-all-textures.png)
    
    点击查看大图。
    
7.  将显示 **保存内容（Save Content）** 对话框。
    
8.  单击 **保存选中项（Save Selected）** 保存导入的资产。
    
9.  导航到 **QuickStartContent** 文件夹，验证UE5创建了对应的 **.uasset文件（.uasset files）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/379c7bbf-085b-4cd1-ac4f-a1466c5cb2a3/16-quick-start-content-folder-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/379c7bbf-085b-4cd1-ac4f-a1466c5cb2a3/16-quick-start-content-folder-2.png)
    
    点击查看大图。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a217cf19-50cf-432c-9ee5-e1ef758a5644/quickstartcontentfolder2_mac.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a217cf19-50cf-432c-9ee5-e1ef758a5644/quickstartcontentfolder2_mac.png)
    
    点击查看大图。
    

*虚幻商城（可从 **Epic启动器（Epic Launcher）** 访问）是搜索和分享内容的好去处。*

## 5\. 准备网格体以供导入

如果你有自己的网格体需要导入，请参阅此部分。

UE5 FBX导入通道使用 **FBX 2018**。在导出过程中使用不同的版本可能会导致不兼容。

选择3D美术工具

Autodesk Maya Autodesk 3ds Max

1.  在视口中选择要导出的网格体。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb9421d2-c157-465e-af8d-b8a4cf2db435/17-maya-export-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb9421d2-c157-465e-af8d-b8a4cf2db435/17-maya-export-1.png)
    
    点击查看大图。
    
2.  在 **文件（File）** 菜单中，选择 **导出当前选择（Export Selection）**（如果需要无视选择导出场景中的所有内容，则选择 **全部导出（Export All）**）。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/631b3425-2508-4c21-b821-de77038f0577/18-maya-export-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/631b3425-2508-4c21-b821-de77038f0577/18-maya-export-2.png)
    
    点击查看大图。
    
3.  在 **导出（Export）** 对话框中：
    
    -   选择UE5项目中的 **内容（Content）** 文件夹（1）
    -   为文件输入一个名称并将其设为FBX导出（2）
    -   设置导出选项（3）
    -   单击 **全部导出（Export All）**（4）
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90fab015-af5b-4394-9489-888e2b515ada/19-maya-export-3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90fab015-af5b-4394-9489-888e2b515ada/19-maya-export-3.png)
    
    点击查看大图。
    
    *上述几何体类型中的设置是将 **静态网格体（Static Meshes）** 导出到虚幻引擎5的最基础要求。*
    
    *你可以使用默认的导入选项。请参阅[FBX导入选项参考](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine)，了解各个选项的详情。*
    
4.  你的资产现在已经导入，你可以将其从 **内容浏览器（Content Browser）** 拖放到你的关卡中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/521c6d0a-014f-4784-8b9e-687d7137b413/20-max-export-7.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/521c6d0a-014f-4784-8b9e-687d7137b413/20-max-export-7.png)
    
    点击查看大图。
    
    *上例中（作为导入选项的一部分）导入了 **材质（Materials）** 和 **纹理（Textures）**。*
    

1.  在视口中选择要导出的网格体。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03bcb566-70f1-49ce-b83b-ca12709a0cf1/max_export_1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03bcb566-70f1-49ce-b83b-ca12709a0cf1/max_export_1.png)
    
    点击查看大图。
    
2.  在 **文件（File）** 菜单中，选择 **导出选定项（Export Selected）**（如果需要无视选择导出场景中的所有内容，则选择 **导出（Export）**）。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/439513cc-a838-44a1-8269-79ef986b6234/max_export_2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/439513cc-a838-44a1-8269-79ef986b6234/max_export_2.png)
    
    点击查看大图。
    
3.  选择UE5项目中的 **内容（Content）** 文件夹（1）和FBX文件的名称（2），然后单击![Save Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5196db32-0f49-47e3-aa56-33679217429f/max_save_button.jpg "Save Button")按钮。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ab1bf3b-32d6-4791-a544-93861f6aaaa1/20-max-export-3-autodesk.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ab1bf3b-32d6-4791-a544-93861f6aaaa1/20-max-export-3-autodesk.png)
    
    点击查看大图。
    
4.  在 **FBX导出（FBX Export）** 对话框中设置选项，然后单击![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d0eb5a1-5d6d-4a34-9a71-e1c21d042a31/max_ok_button.jpg)按钮创建包含网格体的FBX文件。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f89f2903-264e-4b3a-b3e7-663a8993a02a/22-max-export-4-autodesk.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f89f2903-264e-4b3a-b3e7-663a8993a02a/22-max-export-4-autodesk.png)
    
    点击查看大图。
    
    *上述几何体类型中的设置是将 **静态网格体（Static Meshes）** 导出到虚幻引擎4的最基础要求。*
    
5.  *你可以保留默认的导入选项。请参阅[FBX导入选项参考](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine)，了解各个选项的详情。*
    
6.  你的资产现在已经导入，你可以将其从 **内容浏览器（Content Browser）** 拖放到你的关卡中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4644978a-a83a-4115-8903-9fa47ddea83b/20-max-export-7.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4644978a-a83a-4115-8903-9fa47ddea83b/20-max-export-7.png)
    
    点击查看大图。
    
    *上例中（作为导入选项的一部分）导入了 **材质（Materials）** 和 **纹理（Textures）**。*
    

非常好！你已学会如何准备网格体以供导入UE4。

✓ [*如要了解有关FBX内容通道的更多信息，请单击此处。*](/documentation/zh-cn/unreal-engine/fbx-content-pipeline)

*简洁的建模能提高游戏性能。*

## 6\. 创建材质

**材质（Materials）** 是应用于网格体的资产，有助于场景的视觉美感。 有数种方法可以为你的UE5项目创建和编辑材质；不过我们将重点介绍如何使用 **材质编辑器（Material Editor）**。

1.  导航至你的 **内容浏览器（Content Browser）**，单击 **新增（Add New）** 并选择 **材质（Material）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32aef5eb-ca9f-48b8-a119-3a3cda1b9cb6/21-new-create-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32aef5eb-ca9f-48b8-a119-3a3cda1b9cb6/21-new-create-material.png)
    
    点击查看大图。
    
2.  将你的材质命名为 **Rock**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/103238f6-9ae2-42e6-a4d7-15431afc10e8/22-material-naming.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/103238f6-9ae2-42e6-a4d7-15431afc10e8/22-material-naming.png)
    
    点击查看大图。
    
3.  你的 **Rock材质** 现在即可使用。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87c1fc6d-9e35-4292-9fce-e40504285102/23-new-rock-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87c1fc6d-9e35-4292-9fce-e40504285102/23-new-rock-material.png)
    
    点击查看大图。
    
4.  双击 **"岩石"材质** 将打开[材质编辑器](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-user-guide)。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a35db16-7e00-437d-ace1-0263eb4668b4/24-material-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a35db16-7e00-437d-ace1-0263eb4668b4/24-material-editor.png)
    
    点击查看大图。
    
    如果想要了解有关处理材质节点的更多信息，请阅读我们的[材质-教程](/documentation/zh-cn/unreal-engine/unreal-engine-materials-tutorials)文档。
    

*请使用2的幂调整纹理大小。*

## 7\. 编辑材质

现在，你应该已经创建了一个新材质并打开了 **材质编辑器（Material Editor）**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bfc70f6-a3a8-4d81-b860-aa0575f8c0d4/25-material-editor-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bfc70f6-a3a8-4d81-b860-aa0575f8c0d4/25-material-editor-1.png)

点击查看大图。

你可以在[材质编辑器](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-user-guide)中定义材质的颜色、光泽、透明度等。现在你即可编辑你创建的 **Rock材质**。

1.  在 **材质图表（Material Graph）** 的中心选择 **主材质节点（Main Material Node）**。**材质编辑器（Material Editor）** 将在你选择节点时为你突出显示该节点。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bceb306d-b19b-486d-98a7-a4952b7915c6/26-new-main-node.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bceb306d-b19b-486d-98a7-a4952b7915c6/26-new-main-node.png)
    
    点击查看大图。
    
    *它是图表中唯一的节点（以你的材料命名）。*
    
2.  在 **详细信息（Details）** 面板中，将 **着色模型（Shading Model）** 从 **默认光照（Default Lit）** 更改为 **次表面（Subsurface）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42da28da-ae6c-4daa-b298-fe92cac6a6dd/27-select-subsurface.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42da28da-ae6c-4daa-b298-fe92cac6a6dd/27-select-subsurface.png)
    
    点击查看大图。
    
3.  **次表面着色模型（Subsurface Shading Model）** 在 **主材质节点（Main Material Node）** 中启用两个引脚：**不透明度（Opacity）** 和 **次表面颜色（Subsurface Color）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e32e1ba9-d405-4c99-b4ab-ea8270c197e8/28-new-more-pins.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e32e1ba9-d405-4c99-b4ab-ea8270c197e8/28-new-more-pins.png)
    
    点击查看大图。
    
4.  把你的纹理放到图表中了。按住 **T** 键并在编辑器的图表区域内单击鼠标左键。**纹理样本节点（Texture Sample Node）** 应显示在图表中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b62e311-239f-41b6-b6de-3d387358e02c/29-texture-sample.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b62e311-239f-41b6-b6de-3d387358e02c/29-texture-sample.png)
    
    点击查看大图。
    
5.  你至少需要2个纹理。重复步骤4，直至你的图表如下图所示。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03be5a16-5de6-4e15-96a6-fee4b404d6ba/30-new-texture-sample-nodes.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03be5a16-5de6-4e15-96a6-fee4b404d6ba/30-new-texture-sample-nodes.png)
    
    点击查看大图。
    
6.  选择其中一个 **纹理样本节点（Texture Sample Nodes）** 并在 **详细信息面板（Details Panel）** 下找到 **材质表达式纹理基础（Material Expression Texture Base）** 类别。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/477b31ea-59e1-47ad-9b6c-19e25cb6733a/31-mat-expression-texture-base.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/477b31ea-59e1-47ad-9b6c-19e25cb6733a/31-mat-expression-texture-base.png)
    
    点击查看大图。
    
    在纹理属性下，单击标签为 **无** 的下拉菜单，并选择名为 **T\_Rock\_04\_D** 的颜色纹理。
    
    *你还可以通过在搜索字段中输入 **T\_Rock\_04\_D** 来使用搜索字段查找纹理资产。*
    
7.  对其他 **纹理样本节点（Texture Sample Node）** 重复步骤6，确保选择名为 **T\_Rock\_04\_n** 的法线图纹理。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7cc43db9-1bce-4236-a672-08a154ea453b/32-new-both-textures-selected.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7cc43db9-1bce-4236-a672-08a154ea453b/32-new-both-textures-selected.png)
    
    点击查看大图。
    
    *材质图表应该类似于上图。*
    
8.  将 **T\_Rock\_04\_D** 纹理样本的 **颜色引脚（白色）** 连接到岩石材料的 **基础颜色引脚**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1cfc7ea4-fbab-4583-954f-be0849dfcde9/33-new-connect-color-pin.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1cfc7ea4-fbab-4583-954f-be0849dfcde9/33-new-connect-color-pin.png)
    
    点击查看大图。
    
    *新连接的 **白色引脚** 包含纹理的颜色通道。*
    
9.  将 **T\_Rock\_04\_n** 纹理样本的 **法线引脚（白色）** 连接到岩石材质的 **法线引脚**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b9825a8-c7c2-4f7f-ae7a-cdfd357db4eb/34-new-connect-normal-pin.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b9825a8-c7c2-4f7f-ae7a-cdfd357db4eb/34-new-connect-normal-pin.png)
    
    点击查看大图。
    
    *新连接的 **白色引脚** 包含纹理的法线贴图的信息。*
    
10.  **预览（Preview）** 应类似于下图。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e198d154-cf2b-4b1b-827a-1857383489bb/35-new-preview-dn.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e198d154-cf2b-4b1b-827a-1857383489bb/35-new-preview-dn.png)
    
    点击查看大图。
    
11.  按住 **1** 键并在 **图表面板（Graph Panel）** 中左键单击以创建三个（**3**）**常量（Constant）** 节点。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34dd1334-f667-4e1f-b913-fb5ceb88f218/36-constants.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34dd1334-f667-4e1f-b913-fb5ceb88f218/36-constants.png)
    
    点击查看大图。
    
    ***常量节点** 是可修改的标量浮点变量。*
    
12.  按住 **3** 键，在图表面板中左键单击以创建一个（**1**）**Constant3Vector**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f71513d-fe3e-4763-a44f-c87d2ed89eb0/37-constant-3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f71513d-fe3e-4763-a44f-c87d2ed89eb0/37-constant-3.png)
    
    点击查看大图。
    
    ***Constant3Vector** 节点是与颜色对应的可修改向量，没有alpha通道。*
    
    如果想要了解有关处理常量表达式的更多信息，请阅读我们的[常量表达式](/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine)文档。
    
13.  你的节点应该进行安排，以便轻松进行连接，避免导线交叉或相互滑动。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01092914-392a-47a6-b809-497bce58e612/38-new-mat-constants-added.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01092914-392a-47a6-b809-497bce58e612/38-new-mat-constants-added.png)
    
    点击查看大图。
    
14.  将所有 **常量（Constant）** 和 **Constant3Vector** 节点连接到 **Rock材质主节点** 中的对应引脚。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2564dc2b-a00b-413a-bbcc-b41a595bf36f/39-new-all-nodes-connected-no-val.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2564dc2b-a00b-413a-bbcc-b41a595bf36f/39-new-all-nodes-connected-no-val.png)
    
    点击查看大图。
    
15.  通过更新 **详细信息（Details）** 面板中的 **值（Value）** 参数，更改每个 **常量（Constant）** 和 **Constant3Vector** 的值。
    
    -   **高光值（Specular Value）** = 0.0
    -   **粗糙度值（Roughness Value）** = 0.8
    -   **不透明度值（Opacity Value）** = 0.95
    -   **次表面颜色（Subsurface Color）** = 红色（1,0,0）
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c164b7c6-b158-43c7-b0af-5baabd0727be/40-new-all-connected-all-adjusted.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c164b7c6-b158-43c7-b0af-5baabd0727be/40-new-all-connected-all-adjusted.png)
    
    点击查看大图。
    
16.  **预览（Preview）** 应类似于下图。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66102ffd-7331-42f0-b363-be708602c89a/41-new-preview-all.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66102ffd-7331-42f0-b363-be708602c89a/41-new-preview-all.png)
    
    点击查看大图。
    
    请确保在退出 **材质编辑器（Material Editor）** 之前保存你的材质。
    

你就快大功告成了！你刚刚使用 **材质编辑器（Material Editor）** 编辑了 **Rock材质**。

*要找到所有材质编辑器键盘快捷键的列表，转到 **编辑菜单（Edit Menu）> 编辑器首选项（Editor Preferences）> 键盘快捷键（Keyboard Shortcuts）>"材质编辑器"和"材质编辑器生成的节点）"** 类别。*

## 8\. 将材质应用于静态网格体Actor

现在，你已经准备好将一切组合在一起！

这一步的目标是将我们的 **材质（Material）** 应用到我们导入的静态网格体中。具体来说，你将学习如何：

-   [设置Actor的默认材质](/documentation/zh-cn/unreal-engine/artist-quick-start-in-unreal-engine#%E8%AE%BE%E7%BD%AEactor%E7%9A%84%E9%BB%98%E8%AE%A4%E6%9D%90%E8%B4%A8)
-   [更改Actor使用的材质](/documentation/zh-cn/unreal-engine/artist-quick-start-in-unreal-engine#%E6%9B%B4%E6%94%B9actor%E4%BD%BF%E7%94%A8%E7%9A%84%E6%9D%90%E8%B4%A8)

### 设置Actor的默认材质

本节将向你展示如何设置 **静态网格体Actor的** 默认材质。每当你在关卡中放置一个 **Actor** 时，都将使用默认材质。

1.  在 **内容浏览器（Content Browser）** 中，双击你在本指南中早先导入的资产。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47a9bd3f-bdc2-4ea8-9e7d-30f9bb1774bc/42-new-browser-conten-asset.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47a9bd3f-bdc2-4ea8-9e7d-30f9bb1774bc/42-new-browser-conten-asset.png)
    
    点击查看大图。
    
    [静态网格体编辑器](/documentation/zh-cn/unreal-engine/static-mesh-editor-ui-in-unreal-engine)将加载你的资产以供编辑。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4213a147-e35e-4de7-aac2-e2aa3b7ba092/43-static-mesh-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4213a147-e35e-4de7-aac2-e2aa3b7ba092/43-static-mesh-editor.png)
    
    点击查看大图。
    
2.  在 **详细信息（Details）** 面板的 **LOD0** 下，单击材质的下拉菜单。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ad39869-3349-4aa0-8e74-f9707d247b80/44-lod-0.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ad39869-3349-4aa0-8e74-f9707d247b80/44-lod-0.png)
    
    点击查看大图。
    
3.  选择你早先创建的 **Rock材质**。该材质将出现在选择窗口中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a003adc-0b8e-489e-bf68-4ebeb5e6b58b/45-select-rock-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a003adc-0b8e-489e-bf68-4ebeb5e6b58b/45-select-rock-material.png)
    
    点击查看大图。
    
    你的 **预览窗格（Preview Pane）** 将更新以反映新应用的材质。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4cf2d1c-9ff9-4085-b250-7c406c32c6a2/46-new-default-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4cf2d1c-9ff9-4085-b250-7c406c32c6a2/46-new-default-material.png)
    
    点击查看大图。
    
4.  先单击 **保存（Save）** 按钮，然后关闭 **材质编辑器（Material Editor）**。
    
5.  在 **内容浏览器（Content Browser）** 中，将新制作的 **静态网格体Actor（Static Mesh Actor）** 拖动到关卡中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4725f28-ef60-4d83-add2-353b8e7a21da/47-new-material-in-level.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4725f28-ef60-4d83-add2-353b8e7a21da/47-new-material-in-level.png)
    
    点击查看大图。
    
    *当你将该资产放到关卡中时，将使用指定的 **材质**。*
    

### 更改Actor使用的材质

当我们将 **静态网格体** 对象放入关卡时，便创建了一个对象实例（[Actor](/documentation/zh-cn/unreal-engine/actors-and-geometry-in-unreal-engine)）。对于该 **Actor** 的每个实例，我们都可指定其 **材质（Material）**。

以下介绍如何更改静态网格体Actor的材质。

1.  选择你的 **静态网格体Actor（Static Mesh Actor）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d78fe093-b201-4e29-b146-6cba463a81f5/48-new-statis-mesh-selected.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d78fe093-b201-4e29-b146-6cba463a81f5/48-new-statis-mesh-selected.png)
    
    点击查看大图。
    
2.  在 **详细信息（Details）** 面板中，找到 **材质（Materials）** 部分，并单击 **材质（Materials）** 下拉菜单。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c6f01b3-954c-49c7-a505-6060e0c75aaf/49-material-drop-down.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c6f01b3-954c-49c7-a505-6060e0c75aaf/49-material-drop-down.png)
    
    点击查看大图。
    
3.  在弹出菜单中，选择不同的材质。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85cd96c4-0b76-4129-9684-e52d7c79d967/50-select-tutorial-asset-mat.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85cd96c4-0b76-4129-9684-e52d7c79d967/50-select-tutorial-asset-mat.png)
    
    点击查看大图。
    
4.  或者，将新材质拖放到 **静态网格体Actor（Static Mesh Actor）** 上。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86da561a-44ec-43ae-be34-d7e3e8a5e5e7/51-new-material-drop.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86da561a-44ec-43ae-be34-d7e3e8a5e5e7/51-new-material-drop.png)
    
    点击查看大图。
    

你刚刚通过以下方式将材质应用到你的静态网格体Actor：

-   设置Actor的默认材质
-   更改Actor使用的材质

现在，我们即将学完《美术师快速入门指南》。到目前为止，你应该掌握了以下操作所需的技能：

✓ 设置项目 ✓ 创建材质 ✓ 编辑材质 ✓ 将材质应用于静态网格体Actor

你准备好独立地做一些练习了吗？

## 9\. 看你的了！

利用所学知识，创建一个与以下图表类似的新 **材质**：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb0b731a-3df8-477a-9774-5917d82ebab2/52-plastic-material-network.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb0b731a-3df8-477a-9774-5917d82ebab2/52-plastic-material-network.png)

点击查看大图。

Main Material节点设置模拟塑料材质。

将 **Basic\_Asset1** 添加到关卡，对其应用材质，并应用"砖块"法线贴图纹理更新材质。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef9148f7-adcd-4181-8f2c-d056fee65eca/53-normal-map-added.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef9148f7-adcd-4181-8f2c-d056fee65eca/53-normal-map-added.png)

点击查看大图。

有关导入不同类型内容的更多信息，请参阅：

-   有关FBX通道（常规）的信息：[FBX内容通道](/documentation/zh-cn/unreal-engine/fbx-content-pipeline)。
-   有关FBX骨架网格体通道的信息：[FBX骨架网格体通道](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine)。
-   有关FBX动画通道的信息：[FBX动画通道](/documentation/zh-cn/unreal-engine/fbx-animation-pipeline-in-unreal-engine)。
-   有关FBX变换目标通道的信息：[FBX变换目标通道](/documentation/zh-cn/unreal-engine/fbx-morph-target-pipeline-in-unreal-engine)。
-   有关FBX材质通道的信息：[FBX材质通道](/documentation/zh-cn/unreal-engine/fbx-material-pipeline-in-unreal-engine)。
-   有关导入音频的信息：[音频文件](/documentation/404)。

有关本快速入门指南包含的详细内容，请参阅：

-   有关支持的图像类型的信息：[纹理导入指南](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine)。
-   有关材质的信息：[材质](/documentation/zh-cn/unreal-engine/unreal-engine-materials)。
-   有关内容浏览器的信息：[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)。
-   有关静态网格体编辑器的信息：[静态网格体编辑器UI](/documentation/zh-cn/unreal-engine/static-mesh-editor-ui-in-unreal-engine)。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [static meshes](https://dev.epicgames.com/community/search?query=static%20meshes)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1\. 必要的项目设置](/documentation/zh-cn/unreal-engine/artist-quick-start-in-unreal-engine#1%E5%BF%85%E8%A6%81%E7%9A%84%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [2\. 创建文件夹](/documentation/zh-cn/unreal-engine/artist-quick-start-in-unreal-engine#2%E5%88%9B%E5%BB%BA%E6%96%87%E4%BB%B6%E5%A4%B9)
-   [3\. 导入网格体](/documentation/zh-cn/unreal-engine/artist-quick-start-in-unreal-engine#3%E5%AF%BC%E5%85%A5%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [4\. 导入纹理](/documentation/zh-cn/unreal-engine/artist-quick-start-in-unreal-engine#4%E5%AF%BC%E5%85%A5%E7%BA%B9%E7%90%86)
-   [5\. 准备网格体以供导入](/documentation/zh-cn/unreal-engine/artist-quick-start-in-unreal-engine#5%E5%87%86%E5%A4%87%E7%BD%91%E6%A0%BC%E4%BD%93%E4%BB%A5%E4%BE%9B%E5%AF%BC%E5%85%A5)
-   [6\. 创建材质](/documentation/zh-cn/unreal-engine/artist-quick-start-in-unreal-engine#6%E5%88%9B%E5%BB%BA%E6%9D%90%E8%B4%A8)
-   [7\. 编辑材质](/documentation/zh-cn/unreal-engine/artist-quick-start-in-unreal-engine#7%E7%BC%96%E8%BE%91%E6%9D%90%E8%B4%A8)
-   [8\. 将材质应用于静态网格体Actor](/documentation/zh-cn/unreal-engine/artist-quick-start-in-unreal-engine#8%E5%B0%86%E6%9D%90%E8%B4%A8%E5%BA%94%E7%94%A8%E4%BA%8E%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93actor)
-   [设置Actor的默认材质](/documentation/zh-cn/unreal-engine/artist-quick-start-in-unreal-engine#%E8%AE%BE%E7%BD%AEactor%E7%9A%84%E9%BB%98%E8%AE%A4%E6%9D%90%E8%B4%A8)
-   [更改Actor使用的材质](/documentation/zh-cn/unreal-engine/artist-quick-start-in-unreal-engine#%E6%9B%B4%E6%94%B9actor%E4%BD%BF%E7%94%A8%E7%9A%84%E6%9D%90%E8%B4%A8)
-   [9\. 看你的了！](/documentation/zh-cn/unreal-engine/artist-quick-start-in-unreal-engine#9%E7%9C%8B%E4%BD%A0%E7%9A%84%E4%BA%86%EF%BC%81)
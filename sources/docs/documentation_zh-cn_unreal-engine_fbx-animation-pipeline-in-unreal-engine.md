# 虚幻引擎中的FBX动画流程 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fbx-animation-pipeline-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:59:24.793Z

---

目录

![FBX动画流程](https://dev.epicgames.com/community/api/documentation/image/6bf34c4d-e553-4f1d-92ad-03e19a7c0685?resizing_type=fill&width=1920&height=335)

FBX导入通道支持动画，使用者可通过简单工作流从3D软件将 *骨架网格体* 动画导入虚幻引擎以便在游戏中使用，当前单个文件中只能导入/导出每个 *骨架网格体* 的单一动画。

此页面是使用FBX内容通道将动画导入虚幻引擎的技术概览。

虚幻引擎FBX导入管线使用 **FBX 2020.2**。在导出时，使用不同的版本可能会导致不兼容。

此页面包含Autodesk Maya和Autodesk 3ds Max二者的信息。请在下方选择您偏好的内容创建工具，之后页面便只会显示与选中工具相关的内容。

选择3D美术工具

Autodesk Maya Autodesk 3ds Max

## 命名

使用FBX格式将动画导入虚幻引擎时，AnimationSequence将被设为与文件相同的命名。随骨架网格体导入动画时，创建的AnimationSequence将从动画序列中的根骨骼获取命名。导入进程完毕后，可通过 **内容浏览器** 进行重命名。

## 创建动画

动画可以特定于一个 *骨架网格体*，也可以重复用于多个骨架网格体（前提是每个 *骨架网格体* 使用的骨架相同）。使用FBX内容通道创建动画并将其导入虚幻引擎实际上只需要一个带动画的骨架。是否将网格体绑定到骨架则完全取决于使用者，绑定后创建动画将更为简单，因为使用者可以清楚地看到网格体在动画中的变形。而在导出时则只需要骨架。

## 从3D应用程序导出动画

动画必须单个导出；单个文件包含每个 *骨架网格体* 的一个动画。下方的步骤将说明单个动画如何将其自身导出到一个文件。绑定到此骨架的网格体已隐藏，因为动画自行导出时并不一定需要它们。

1.  在视口中选择要导出的关节。
    
    ![maya_export_1.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1454103d-6ebd-4917-b38e-5726d472f03f/maya_export_1.jpg)
2.  在 **文件（File）** 菜单中选择 **导出选项（Export Selection）**（如果需要无视选择导出场景中的所有内容，则选择 **导出所有（Export All）**）
    
    ![maya_export_2.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3568401-6a9e-4632-b395-6bb35f3d2e0b/maya_export_2.jpg)
3.  选择动画导出的FBX文件的所在路径和命名，并在 **FBX导出（FBX Export）** 对话中设置正确选项。为便于导出动画，必须启用 **动画（Animations）** 勾选框。
    
    ![maya_export_3.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d86028a-89a7-42d7-a24c-fcf857a39358/maya_export_3.jpg)
4.  点击![maya_export_button.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c611b8b-c973-42e8-9584-b3d70dd0df43/maya_export_button.jpg)按钮创建包含网格体的FBX文件。
    

1.  在视口中选择要导出的动画所相关的骨骼。
    
    ![max_export_1.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75f6c03a-5ede-419a-94b7-ee536a6083a6/max_export_1.jpg)
2.  在 **文件（File）** 菜单中选择 **导出选中项（Export Selected）**（如果需要无视选择导出场景中的所有内容，则选择 **导出所有（Export All）**）
    
    ![max_export_2.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a289ae27-9d3a-4fa7-976c-e57461110474/max_export_2.jpg)
3.  选择将动画导出的FBX文件的保存路径和命名，并点击![max_save_button.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6db5926-b13c-42be-aaea-d39554dc0690/max_save_button.jpg)按钮。
    
    ![max_export_3.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bfe1333-8a72-4649-953a-0cbe4e666b9b/max_export_3.jpg)
4.  在 **FBX导出（FBX Export）** 对话中设置正确选项。为便于导出动画，必须启用 **动画（Animations）** 勾选框。
    
    ![max_export_4.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56b1d8dd-30b2-4a08-8982-f901a283b7f8/max_export_4.jpg)
5.  点击![max_ok_button.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/731d2b67-9542-47c2-943a-df0d519ebe02/max_ok_button.jpg)按钮创建包含网格体的FBX文件。
    

## 导入动画

FBX动画导入通道可一次性导入 *骨架网格体* 和动画，或单独导入网格体/动画。

**含动画的骨架网格体**

1.  点击 **内容浏览器** 中的![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34c77af8-b8ff-4c1c-85d0-ac71034c0b91/import_button.png)按钮。在打开的文件浏览器中找到并选中需要导入的FBX文件。**注意：**可能需要在下拉菜单中选择![import_fbxformat.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb53ec9c-3d43-492e-9e54-43b350306329/import_fbxformat.jpg)，过滤掉不需要的文件。
    
    ![import_file.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f42ae18-e03a-4946-9b8f-b5b7feb70ab5/import_file.jpg)
    
    导入资源的导入路径取决于导入时 **内容浏览器** 的当前位置。在执行导入前必须导航至正确的文件夹。导入完成后也可将导入的资源拖入一个新文件夹。
    
2.  在 **FBX导入选项** 对话中选择正确的设置。导入网格体的命名将遵循默认的命名规则。请参见[**FBX导入对话**](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine)，了解到所有设置的完整详情。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ad4616f-7e33-424c-834b-af4bbad68988/skeletalmeshfbxoptions.png)
3.  点击![button_import.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4681390-0655-4111-a5d7-d4e94575f522/button_import.png)按钮来导入网格体和LOD。如进程成功，结果网格体、动画（AnimationSequence）、材质和纹理将显示在 **内容浏览器** 中。现在即可看到用于保存动画的AnimationSequence，其命名默认为骨架根骨骼的命名。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/257cb4e0-ea0f-401a-8656-fb473ebe2044/importedcharacter.png)

**单个动画**

要导入动画，首先需要一个可以将动画导入的AnimationSequence。可通过 **内容浏览器** 进行创建，或直接在AnimationSequence编辑器中创建。

虚幻引擎支持同时导入一个FBX文件中包含的多个动画；但3ds Max和Maya之类的DCC工具当前并不支持将多个动画保存到单个文件中。如果从支持的软件（如Motion Builder）中进行导出，虚幻引擎将导入该文件中的所有动画。

1.  点击 **内容浏览器** 中的![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/add8e136-2a80-4382-957b-c4321d9c6f86/import_button.png)按钮。在打开的文件浏览器中找到并选中需要导入的FBX文件。**注意：** 可能需要在下拉菜单中选择![import_fbxformat.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31ad3a38-e265-4e20-bb43-4f368d63c391/import_fbxformat.jpg)，过滤掉不需要的文件。
    
    ![import_file.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de7da572-f4bb-4d7a-83ae-3202227d2de5/import_file.jpg)
    
    导入资源的导入路径取决于导入时 **内容浏览器** 的当前位置。在执行导入前必须导航至正确的文件夹。导入完成后也可将导入的资源拖入一个新文件夹。
    
2.  在 **FBX导入选项** 对话中选择正确的设置。导入网格体的命名将遵循默认的命名规则。请参见[**FBX导入对话**](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine)，了解到所有设置的完整详情。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4bc8d13-5c4f-4a47-9404-e3dd1a9c230e/animationimportoptions.png)
    
    导入动画时，必须指定一个现有的骨架！
    
3.  点击![button_import.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0323344d-e682-4e01-a3d9-fe241ebd992e/button_import.png)按钮来导入网格体和LOD。如进程成功，结果网格体、动画（AnimationSequence）、材质和纹理将显示在 **内容浏览器** 中。现在即可看到用于保存动画的AnimationSequence，其命名默认为骨架根骨骼的命名。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd9b252b-a0bd-4602-b6f3-ef9d47ab8956/animsequenceimported.png)

虚幻编辑器支持非等分缩放动画。导入动画时，如果存在缩放，其无需额外设置便可直接导入。出于内存原因，引擎不会保存所有动画的缩放，只会保存不为1的缩放。

请参见[**骨架网格体动画（Skeletal Mesh Animation）**](/documentation/zh-cn/unreal-engine/skeletal-mesh-animation-system-in-unreal-engine)页面，了解更多内容和视频参考。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [命名](/documentation/zh-cn/unreal-engine/fbx-animation-pipeline-in-unreal-engine#%E5%91%BD%E5%90%8D)
-   [创建动画](/documentation/zh-cn/unreal-engine/fbx-animation-pipeline-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%8A%A8%E7%94%BB)
-   [从3D应用程序导出动画](/documentation/zh-cn/unreal-engine/fbx-animation-pipeline-in-unreal-engine#%E4%BB%8E3d%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E5%AF%BC%E5%87%BA%E5%8A%A8%E7%94%BB)
-   [导入动画](/documentation/zh-cn/unreal-engine/fbx-animation-pipeline-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%8A%A8%E7%94%BB)
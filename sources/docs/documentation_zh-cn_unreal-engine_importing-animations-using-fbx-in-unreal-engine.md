# 使用虚幻引擎中的FBX导入动画 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/importing-animations-using-fbx-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:59:20.569Z

---

目录

![如何导入动画](https://dev.epicgames.com/community/api/documentation/image/a62c1d0b-c051-48da-b6ce-964e63c5e3ca?resizing_type=fill&width=1920&height=335)

我们可从外部 3D 建模程序（如 **3DS Max**、**Maya** 或 **Blender**）导入动画到虚幻引擎。我们在此使用 3DS Max 和 Maya 进行演示，实际上您可将动画从任何带保存功能的 3D 建模程序中导入虚幻引擎。

开始之前：请确保你可以有可供使用的3D建模程序。

## 目标

此指南的要点是为您展示如何从外部 3D 建模程序导入动画。

## 目的

完成此指南的阅读后，您将了解：

-   如何从外部 3D 建模程序导入动画。
-   如何将动画从外部 3D 建模程序导入到虚幻编辑器。

虚幻引擎FBX导入管线使用 **FBX 2020.2**。在导出时使用不同版本可能会导致不兼容。

选择3D美术工具

Autodesk Maya Autodesk 3ds Max

## 导出动画

动画必须被单个导出，单个文件中只能包含一个骨骼网格体的一个动画。

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

在虚幻引擎的 FBX 动画导入流程中，带或不带骨骼网格体的动画均可导入。

### 导入带骨骼网格体的动画

1.  在 **内容浏览器** 中点击 **Import** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82122eb6-9f15-41b8-9bab-c9bf739b5238/importbutton_ui.png)
2.  找到并选择需要导入的 FBX 文件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfcb8eae-e6ca-4c6b-9cb3-ed9ab5d8fe75/importdialogbox.png)
3.  点击 **Open** 开始导入 FBX 文件到项目。
    
4.  在 **FBX Import Options** 对话中进行适当设置。
    
    导入不共享现有骨骼的网格体时，默认设置便已足够。导入 LOD 时，导入网格体的命名将遵循默认 [命名规则](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine#%E5%91%BD%E5%90%8D%E8%A7%84%E8%8C%83)。在 [FBX 导入对话](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine) 文档中可查阅全部设置的更多信息。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e2192cf-15f7-451f-92cf-3758e5833e5b/fbximportoptions.png)
    
    在FBX导入器中，有两个导入按钮供使用。第一个是"导入（Import）"按钮，允许我们将当前选定的FBX文件按照指定设置导入。第二个是"全部导入（Import All）"按钮，允许将当前选中的所有FBX文件按照指定设置导入。
    
    有关 FBX 导入器中可用的设置的更多信息，请访问 \[FBX 导入选项参考\]（working-with-content/fbx-content-pipeline/fbx-import-options-reference）页面。
    
5.  点击 **Import** 或 **Import All** 添加网格体到项目。
    
6.  如导入成功，导入的骨骼网格体和动画将出现在 **内容浏览器** 中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69478344-f7cf-4de2-b122-9990f8b77321/importedanimations.png)
    
    为保存导入动画而创建的动画序列默认以骨骼的根骨骼命名。
    

### 导入不带骨骼网格体的动画

虚幻引擎允许将多个动画导入单个 FBX 文件中；然而许多 DCC 工具（如 3ds Max 和 Maya）不支持在单个文件中保存多个动画。如从支持的程序中（如 Motion Builder）导出，虚幻引擎将导入导出文件中包含的所有动画。

开始这部分的学习前，需要一个用于导入动画的 **动画序列**。动画序列可通过 **内容浏览器** 或直接在 **动画序列编辑器** 中进行创建。

1.  在编辑器中点击 **Import** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c302ccf4-c5ae-4d5f-acbd-6093996d66e1/importbutton_ui.png)
2.  找到并 **选择** 需要导入的 FBX 文件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c028c28a-32f0-47c1-a81d-932c82e9fa94/importdialogbox.png)
3.  点击 **Open** 开始导入 FBX 文件到项目。
    
4.  在 **FBX Import Options** 对话中进行适当设置。
    
    导入不共享现有骨骼的网格体时，默认设置便已足够。导入 LOD 时，导入网格体的命名将遵循默认命名规范。在[FBX导入对话框](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine)文档中可查阅全部设置的更多信息。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa1260d1-574f-470e-840f-7e0afe0ab90d/animationimportoptions.jpg)
    
    单个导入动画时，必须指定一个现有骨骼。
    
5.  如导入成功，导入的骨骼网格体和动画将出现在 **内容浏览器** 中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9bd1aca9-6228-43df-beb9-9a4cb7daea24/importedanimations.png)
    
    为保存导入动画而创建的动画序列默认以骨骼的根骨骼命名。
    

这便是该指南的全部内容，您已从中学习到：

✓ 如何从外部 3D 建模程序导入动画。 ✓ 如何将动画从外部 3D 建模程序导入到虚幻编辑器。

-   [import](https://dev.epicgames.com/community/search?query=import)
-   [animation](https://dev.epicgames.com/community/search?query=animation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [目标](/documentation/zh-cn/unreal-engine/importing-animations-using-fbx-in-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [目的](/documentation/zh-cn/unreal-engine/importing-animations-using-fbx-in-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [导出动画](/documentation/zh-cn/unreal-engine/importing-animations-using-fbx-in-unreal-engine#%E5%AF%BC%E5%87%BA%E5%8A%A8%E7%94%BB)
-   [导入动画](/documentation/zh-cn/unreal-engine/importing-animations-using-fbx-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%8A%A8%E7%94%BB)
-   [导入带骨骼网格体的动画](/documentation/zh-cn/unreal-engine/importing-animations-using-fbx-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%B8%A6%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93%E7%9A%84%E5%8A%A8%E7%94%BB)
-   [导入不带骨骼网格体的动画](/documentation/zh-cn/unreal-engine/importing-animations-using-fbx-in-unreal-engine#%E5%AF%BC%E5%85%A5%E4%B8%8D%E5%B8%A6%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93%E7%9A%84%E5%8A%A8%E7%94%BB)
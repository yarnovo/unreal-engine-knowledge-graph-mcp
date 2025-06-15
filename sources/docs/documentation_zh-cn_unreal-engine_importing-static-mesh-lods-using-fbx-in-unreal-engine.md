# 在虚幻引擎中使用FBX方法导入静态网格体LOD | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/importing-static-mesh-lods-using-fbx-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:00:18.538Z

---

目录

![使用FBX方法导入静态网格体LOD](https://dev.epicgames.com/community/api/documentation/image/e4dc6793-2ff9-4b1b-a9b4-5076a3ea84a0?resizing_type=fill&width=1920&height=335)

可从外部 3D 建模程序（如 **3DS Max**、**Maya** 或 **Blender**）将静态网格体细节级别（LOD）导入到 **虚幻引擎** 。我们在此使用 3DS Max 和 Maya 进行演示，实际上您可将静态网格体 LOD 从任何带保存功能的 3D 建模程序中导入虚幻引擎。

### 先决条件

-   拥有一种3D建模应用程序的访问权限。
-   拥有创建了LOD的模型。

### 目的

完成此指南的阅读后，您将了解：

-   如何从外部 3D 建模程序设置静态网格体 LOD。
-   如何从外部 3D 建模程序导出静态网格体 LOD。
-   如何将静态网格体 LOD 从外部 3D 建模程序导入虚幻编辑器。

虚幻引擎FBX导入管线使用 **FBX 2020.2**。在导出时使用其他版本可能会导致不兼容。

选择3D美术工具

Autodesk Maya Autodesk 3ds Max

## 设置静态网格体 LOD

1\. 按照从基础LOD到最后一个LOD的顺序，选择所有网格体。选择顺序非常重要，这可以确保以正确的复杂度顺序添加LOD。然后在 *编辑（Edit* 菜单下选择 *细节级别（Level of Detail）* > 群组（Group）命令。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ad12508-325a-4a99-90e6-5c5f13fa24ad/maya-group-lods.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ad12508-325a-4a99-90e6-5c5f13fa24ad/maya-group-lods.png)

点击查看大图

1\. 现在，所有网格体都被划入了LOD群组下。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b8e74ec-f804-4a94-8269-a88e1bd59e38/maya-outliner-lod-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b8e74ec-f804-4a94-8269-a88e1bd59e38/maya-outliner-lod-group.png)

点击查看大图

1\. 选择所有LOD网格体（顺序不重要），然后选择 *群组（Group）* 菜单下的 *群组（Group）* 命令。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b1ba524-f5fb-481f-87e7-bd8ec6aed054/3ds-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b1ba524-f5fb-481f-87e7-bd8ec6aed054/3ds-group.png)

点击查看大图

1\. 在打开的对话框中输入新群组名称，然后点击![3ds LOD Ok Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/807b9f2b-5e5b-4a44-a10c-25af7194520d/max_lod_ok_button.jpg)按钮创建群组。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6a652f2-2fe6-42d1-8488-0f01d07204d6/3ds-group-name.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6a652f2-2fe6-42d1-8488-0f01d07204d6/3ds-group-name.png)

点击查看大图

1\. 点击![3ds Max Utility Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6678b564-f174-4b5e-b45d-f22a73ea457f/3ds-utilities-button.png)按钮，浏览 *工具（Utilities）* 面板，然后选择 *细节级别（Level of Detail）* 工具。**注意**：你可能需要点击![max_utility_more_button.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63adc0d2-f8f5-41b9-ba99-f9fd9cb694a4/max_utility_more_button.jpg)并在列表中选择它。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9998384f-d1ce-4776-acc6-a7db85b9a629/3ds-utilities-level-of-detail.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9998384f-d1ce-4776-acc6-a7db85b9a629/3ds-utilities-level-of-detail.png)

点击查看大图

1\. 选中群组后，点击![max_lod_create_button.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e75f6edd-6b21-4e31-b561-c8c1fde0483e/max_lod_create_button.jpg)按钮新建LOD集，并将所选群组中的网格体添加到该集。系统会根据网格体的复杂度对其自动排序。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ce7f8ba-a628-4f42-ac81-5a3c9cf77f15/3ds-lods-list.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ce7f8ba-a628-4f42-ac81-5a3c9cf77f15/3ds-lods-list.png)

点击查看大图

## 导出静态网格体 LOD

1.  在Maya中选择LOD群组以及所有碰撞几何体。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2ac62e8-2557-425f-85e4-a15d760888d0/maya-lod-group-selection.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2ac62e8-2557-425f-85e4-a15d760888d0/maya-lod-group-selection.png)
    
    点击查看大图。
    
2.  前往文件菜单并选择导出选择（Export Selection）。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f555dbf1-94ad-446b-a126-8a2f06b07796/maya-export-selection.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f555dbf1-94ad-446b-a126-8a2f06b07796/maya-export-selection.png)
    
    点击查看大图
    
3.  选择网格体的保存路径。确认为其命名，选择FBX作为文件格式，并在FBX导出器属性中启用导出动画。要想导出LOD，就必须启用导出动画。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1574f1da-cee1-42f7-88f3-40b65215952f/maya-save-fbx-export.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1574f1da-cee1-42f7-88f3-40b65215952f/maya-save-fbx-export.png)
    
    点击查看大图
    
    1.  在3ds Max中选择包含LOD集和所有碰撞几何体的网格体群组。
        
        [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69ef913d-f365-4cd7-91c9-fbb172e8da40/3ds-lod-group-export.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69ef913d-f365-4cd7-91c9-fbb172e8da40/3ds-lod-group-export.png)
        
        点击查看大图
        
    2.  前往文件菜单，选择 *导出（Export）* > *导出选择（Export Selected）*。
        
        [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bafd5ee-1cbc-4a5a-95a0-da7eed123729/3ds-export-selection.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bafd5ee-1cbc-4a5a-95a0-da7eed123729/3ds-export-selection.png)
        
        点击查看大图
        
    3.  选择网格体的保存路径。确认为其命名，选择FBX作为文件格式，然后保存。
        
        [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47aa2b58-045a-46bf-a5ad-946d3970dbb5/3ds-save.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47aa2b58-045a-46bf-a5ad-946d3970dbb5/3ds-save.png)
        
        点击查看大图
        
    4.  在FBX导出窗口中，启用"动画（Animation）"属性下的"动画"选项。要导出LOD必须启用此项。
        
        [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e265b3b8-d220-47c1-a8e0-2e3582583e4b/3ds-animation-checked.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e265b3b8-d220-47c1-a8e0-2e3582583e4b/3ds-animation-checked.png)
        
        点击查看大图
        
        ## 导入静态网格体 LOD
        
        导入静态网格体LOD的方法不止一种。其中之一是使用 *内容浏览器*（如下图所示）。另一种方法是使用 *静态网格体编辑器* 中的 *细节* 面板。如需了解如何用静态网格体编辑器导入LOD，请参阅[C创建与使用LOD](/documentation/zh-cn/unreal-engine/creating-and-using-lods-in-unreal-engine)一文。
        
        1.  在 **内容浏览器** 中点击 **Import** 按钮。
            
            [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f53fb226-2c03-4182-b5a6-324ec439b98c/05-import-button-ui.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f53fb226-2c03-4182-b5a6-324ec439b98c/05-import-button-ui.png)
            
            点击查看大图。
            
        2.  找到并选择需要导入的 FBX 文件。
            
            [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26819ec5-545d-49ad-9bb7-f10e51823866/import-fbx.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26819ec5-545d-49ad-9bb7-f10e51823866/import-fbx.png)
            
            点击查看大图。
            
        3.  点击 **打开（Open）** 开始导入网格体文件到项目。
            
        4.  在 **FBX导入选项（FBX Import Options）** 对话框中，选择合适的设置，确保 **网格体（Mesh）** > **高级（Advanced）** 下的 **导入LOD（Import LODs）** 选项已启用。
            
            [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/082ab46a-e568-4cae-8046-c25961fbbbb9/07-import-fbx-options.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/082ab46a-e568-4cae-8046-c25961fbbbb9/07-import-fbx-options.png)
            
            点击查看大图。
            
        
        在FBX导入器中，有两个导入按钮供我们使用。第一个是"导入（Import）"按钮，允许将当前选定的FBX文件按照指定设置导入。第二个是"全部导入（Import All）"，允许将当前选中的所有FBX文件按照指定设置导入。
        
        有关FBX导入器设置的更多信息，请参阅[FBX导入选项参考](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine)一文。
        
        1.  点击 **Import** 或 **Import All** 将网格体导入项目。
            
            [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c1b5819-00b2-49cd-b1ee-8044a1787eea/fbx-import-options.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c1b5819-00b2-49cd-b1ee-8044a1787eea/fbx-import-options.png)
            
            点击查看大图。
            
            导入 LOD 时，导入网格体的命名将遵循默认 [命名规则](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine#namingconventions)。在 [FBX 导入对话](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine) 文档中可查阅全部设置的更多信息。
            
        2.  导入的网格体以及其应用的纹理和材质将显示在 **内容浏览器** 中。
            
            [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eba7ba3f-129a-439b-85d3-edac5e75e9c8/lod-static-mesh-in-content-browser.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eba7ba3f-129a-439b-85d3-edac5e75e9c8/lod-static-mesh-in-content-browser.png)
            
            点击查看大图。
            
        3.  双击静态网格体打开 **静态网格体编辑器**。在 **静态网格体编辑器** 中查看导入的网格体时，使用 **Auto LOD** 下拉菜单循环选择网格体 LOD。
            
            ![循环切换LODs](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20725f8c-8ccc-41b2-9c01-f90ed5c7d885/cycle-lods.gif)
        
        这便是该指南的全部内容，您已从中学习到：
        
        ✓ 如何从外部 3D 建模程序设置静态网格体 LOD。  
        ✓ 如何从外部 3D 建模程序导出静态网格体 LOD。  
        ✓ 如何将静态网格体 LOD 从外部 3D 建模程序导入虚幻编辑器。
        
    

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [static mesh](https://dev.epicgames.com/community/search?query=static%20mesh)
-   [fbx static mesh pipeline](https://dev.epicgames.com/community/search?query=fbx%20static%20mesh%20pipeline)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/importing-static-mesh-lods-using-fbx-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [目的](/documentation/zh-cn/unreal-engine/importing-static-mesh-lods-using-fbx-in-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [设置静态网格体 LOD](/documentation/zh-cn/unreal-engine/importing-static-mesh-lods-using-fbx-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93lod)
-   [导出静态网格体 LOD](/documentation/zh-cn/unreal-engine/importing-static-mesh-lods-using-fbx-in-unreal-engine#%E5%AF%BC%E5%87%BA%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93lod)
-   [导入静态网格体 LOD](/documentation/zh-cn/unreal-engine/importing-static-mesh-lods-using-fbx-in-unreal-engine#%E5%AF%BC%E5%85%A5%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93lod)

相关文档

[

FBX导入选项参考

![FBX导入选项参考](https://dev.epicgames.com/community/api/documentation/image/8c6bff4d-0dc5-4058-8790-04adff60871b?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine)

[

FBX静态网格体管线

![FBX静态网格体管线](https://dev.epicgames.com/community/api/documentation/image/a2947ea0-d06e-479b-b373-f7dfac48ef1c?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/fbx-static-mesh-pipeline-in-unreal-engine)
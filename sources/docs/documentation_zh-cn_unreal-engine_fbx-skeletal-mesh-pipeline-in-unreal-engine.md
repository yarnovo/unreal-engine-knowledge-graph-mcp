# 虚幻引擎骨架网格体管道 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:59:54.490Z

---

目录

![骨架网格体管道](https://dev.epicgames.com/community/api/documentation/image/9610050a-515f-4c66-b543-ca35a798cca4?resizing_type=fill&width=1920&height=335)

FBX 导入管道支持 *骨架网格体（Skeletal Mesh）*。这提供了一种简化的处理流程来将有动画的网格体从 3D应用程序中导入到虚幻引擎内，以便在游戏中使用。除了导入网格体外，如果需要，动画和变形目标都可以使用FBX格式 在同一文件中传输。同时，还可以 导入3D应用程序中给这些网格体应用的材质所使用的纹理（仅限漫射和法线贴图）， 并且自动创建材质，将其应用于导入的网格体。

以下是使用FBX导入骨架网格体所支持的功能：

-   [材质（包括纹理）](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E6%9D%90%E8%B4%A8)
-   [动画](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E5%8A%A8%E7%94%BB)
-   [变形目标](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#morphtargets)
-   多个UV集合
-   平滑组
-   [顶点颜色](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#vertexcolors)
-   [LOD](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#meshlods)

目前，对于每个 *骨架网格体*，只能将单个动画导入单个文件。但是，在一个文件中可以传输 一个 *骨架网格体* 的多个变形目标。

本文是使用FBX内容通道将骨架网格体导入到虚幻的技术性概述。

虚幻引擎FBX导入管线使用 **FBX 2020.2**。在导出时使用其他版本可能会导致不兼容。

在下文中任何指示使用 **导入资源（Import Asset）** 按钮的地方，只需在操作系统文件浏览器中单击并拖拽FBX文件即可。

此页面包含有关Autodesk Maya和Autodesk 3ds Max的信息。如果你在下面选择你的首选内容创建工具，则只会显示与该工具相关的信息：

选择3D美术工具

Autodesk Maya Autodesk 3ds Max

## 一般设置

### 单一网格体和由多部分构成的网格体

*骨架网格体* 可以由一个连续网格体构成，也可以或几个独立的网格物体构成， 所有网格体都对同一个骨架进行皮肤处理。

![multipart.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39676e78-84a0-4039-b549-61e0d2d444e0/multipart.png)

使用多个网格体时，每个构成部分的LOD可以不同，并且每个部分可以单独导出， 以便在模块化的角色系统中使用。这种创建 *骨架网格体* 的方式不会使性能降低。 每个构成部分导入到虚幻编辑器之后，它们会组合到一起。

### 绑定

绑定是指将网格体绑定到骨骼/关节的骨架层级。这使得底下骨架的骨骼/关节可以影响网格体的顶点，当骨骼或关节移动时会使得网格体发生变形。

#### 骨架

在Maya中，一般使用 *关节工具* 为 *骨架网格体* 创建骨架。同样，也有 无数关于在Maya中如何使用这个工具及创建绑定的教程。Maya帮助文档也是获得关于这个主题信息 的很好资源。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a22e31c4-8a2b-42f7-a973-30cf36c8cb6f/maya_rig.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a22e31c4-8a2b-42f7-a973-30cf36c8cb6f/maya_rig.png)

如何在3dsMax中创建骨架层级，完全由你自己决定。你可以使用标准的 *骨骼工具*，因为 它们非常好用，也可以创建自己的对象层级，以便完全自定义几何体和功能按钮。 要剥一只猫的皮，不止一种方法而已（请原谅我使用这个双关语）。很多教程都展示了如何 为游戏角色创建动画绑定。你还可以参考3dsMax帮助文档了解关于工具原理的完成细节。

![max_rig.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/edf0a609-bdd0-4a46-91f0-6c2447d0e38f/max_rig.png)

#### 绑定

Maya使用 *平滑绑定（Smooth Bind）* 命令将网格体绑定到骨架。无论 *骨架网格体* 是由一个完整网格体还是由多个网格体部分构成，过程都是相同的。

1.  选择要绑定的网格体。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/398778f0-eaeb-4848-98bf-df0d06f47f4c/maya_skin_1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/398778f0-eaeb-4848-98bf-df0d06f47f4c/maya_skin_1.png)
    
2.  按住 **Shift** + 键并选择骨架的根关节。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a892c118-f698-4318-ab9e-d1e7006df867/maya_skin_2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a892c118-f698-4318-ab9e-d1e7006df867/maya_skin_2.png)
    
3.  从 *皮肤（Skin） > 绑定皮肤（Bind Skin）* 菜单选择 *平滑绑定（Smooth Bind）*。
    
    ![maya_skin_3.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/235b80fa-6211-40ad-b29c-770f017a1632/maya_skin_3.jpg)
4.  现在，你可以为每个关节调整网格体的顶点的权重，从而决定哪些顶点受到哪些骨骼的影响及影响的程度。这可以使用 *描画皮肤权重工具（Paint Skin Weights Tool）* 或者其他你喜欢的方法来完成。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a98e6e7-71a3-43a3-a62e-14ba28828594/maya_skin_4.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a98e6e7-71a3-43a3-a62e-14ba28828594/maya_skin_4.png)
    

在3dsMax中，必须使用 *皮肤* 修饰符将网格体绑定到骨架。无论 *骨架网格体* 是由一个完整网格体还是由多个网格体部分构成，过程都是相同的。

1.  选择要绑定的网格体。
    
    ![max_skin_1.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ca3f4af-cdec-4b2e-bf77-3938374e1b93/max_skin_1.png)
2.  从 *修饰符列表* 中添加 *皮肤* 修饰符。
    
    ![max_skin_2.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af8a5898-636b-416c-add6-135a59be5cec/max_skin_2.jpg)
3.  在 *皮肤* 修饰符的参数中，单击![skin_add_button.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe3b1e59-567f-4029-a4fe-a89f3774b19e/skin_add_button.jpg)按钮来添加影响网格体的骨骼。此时将显示 **选择骨骼（Select Bones）** 窗口。
    
    ![max_skin_3.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcd8a82f-2499-46c2-bbe4-a5bf2415eac0/max_skin_3.jpg)
4.  在 **选择骨骼（Select Bones）** 窗口中选择骨骼，然后单击 **选择（Select）** 按钮来添加骨骼。
    
    ![max_skin_4.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be656193-1b52-423d-9e24-db449b3bb2ce/max_skin_4.jpg)
5.  现在，修饰符的 *骨骼（Bones）* 列表将显示骨骼。
    
    ![max_skin_5.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/beb30b63-f8aa-49bd-b65b-d12e1c0d5d27/max_skin_5.jpg)
6.  现在，你可以为每个骨骼调整网格体的顶点的权重，从而决定哪些顶点受到哪些骨骼的影响及影响的程度。这可以使用包络完成，只需直接输入顶点的权重，也可以使用你喜欢的任何方式。
    
    ![max_skin_6.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3718355-286e-4b6a-907f-cabdc73a1997/max_skin_6.png)

### 支点

虚幻引擎中，网格体的支点决定了执行任何变换（平移、 旋转、缩放）时所围绕的点。

![pivot.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9fdfe7ea-169f-427a-a1e0-8400fbbf9163/pivot.png)

*骨架网格体* 的支点始终位于骨架的根骨骼/关节处。换句话说， 骨架的根位于场景中的哪个位置并没有关系。从3D建模应用程序导出时， 它就像在原点（0,0,0）一样。

![pivot_root.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0627822-86e4-4ca7-83e1-a6a439bde8c9/pivot_root.png)

### 三角剖分

图形硬件只处理三角形，因此虚幻引擎中的网格体必须进行三角剖分。

![tris.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71b84458-a063-4bae-9114-b10b96e63e88/tris.jpg)

要可靠地对网格体进行三角剖分，可以通过好几种方法来完成。

-   仅使用三角形对网格体建模——这是最好的方法，因为可以最大限度地控制最终结果。
-   在3D应用程序中对网格体进行三角剖分——这是也是较好的方法，可以在导出之前进行整理和修改。
-   让导入器对网格体进行三角剖分——这个方法一般，它不允许进行清除整理但对于简单网格体来说是有效的。
-   让FBX导入器对网格体进行三角剖分——这个方法也还可以，它不允许进行清除整理但对于简单网格体来说是有效的。

**注意：**当选中"分割不匹配的三角形（Split Non-Matching Triangles）"时，允许FBX导出器对网格体进行三角剖分将导致完全的 随机化平滑处理。将经过FBX三角剖分的网格体导回到Maya中并重新导入将会呈现正确的平滑效果。

在任何情况下，最好都在3D应用程序中手动对网格体进行三角剖分，这样可以控制边的方向和放置 位置。自动执行三角剖分可能会导致不合意的效果。

![tris_bad.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bbfebd6-70fe-4d98-814f-e445969b5f1d/tris_bad.jpg)

### 创建法线贴图

在大部分建模应用程序中可以通过创建低分辨率的渲染网格体和高分辨率的细节网格体来直接地为网格体创建法线贴图。

![SideBySide.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d88e520d-1caf-4efe-b3ac-f250d2eaa7d2/sidebyside.jpg)

高分辨率细节网格体的几何体用于生成法线贴图的法线。Epic内部处理流程中引入了XNormal，因此在虚幻引擎4中渲染时通常会生成好得多的法线。关于此流程的细节，请参阅[纹理](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine)。

### 材质

应用于使用外部应用程序建模的网格体的材质将会随着网格体一同导出，然后导入到 虚幻编辑器中。这大大简化了处理流程，因为你不需要再单独地在虚幻编辑器中导入纹理，也不需要 创建及应用材质等。使用FBX通道时，导入过程可以处理所有这些操作。

这些材质也需要以特定的方式进行设置，尤其是当网格体有多个材质或者网格体上的材质的顺序非常重要时 （也就是，对于角色模型来说，材质0应该是躯干，材质1应该 是头部）。

关于设置材质进行导出的完整细节，请参阅[**FBX材质通道**](/documentation/zh-cn/unreal-engine/fbx-material-pipeline-in-unreal-engine)页面。

### 顶点颜色

*骨架网格体* 的顶点颜色（仅限一组）可以通过FBX通道转换。不需要特殊设置。

![vertex_color.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ded4749-3626-489c-9ef4-c2c9b44bb832/vertex_color.jpg)

## 从3D应用程序中导出网格体

*骨架网格体* 可以独立导出，或者也可以把多个网格体导出到一个单独的FBX文件中。导入过程将会把多个 *骨架网格体* 分割为目标包中的多个资源。

1.  在视口中选中要导出的网格体和关节。
    
    ![meshAndJointsSel.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f6ffbd4-8b76-46ef-ba7f-9d5889a67e04/meshandjointssel.png)
2.  在 *文件（File）* 菜单中选择 *导出选中项（Export Selection）*（或者如果你不管选中项是什么，都想导出场景中的所有资源，那就选择 *导出所有（Export All）*）。
    
    ![maya_export_2.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a019aca-7c93-4e62-afc0-e008122ef28b/maya_export_2.jpg)
3.  选择用于导入网格物体的FBX文件的位置和名称，并在 **FBX导出（FBX Export）** 对话框中设置适当的选项，然后单击![maya_export_button.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31b959e5-8668-4c92-8c56-5265bcfaf650/maya_export_button.jpg)按钮，创建包含网格体的FBX文件。
    
    ![maya_export_3.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f510492-f848-4050-a82f-fe01538fae2f/maya_export_3.jpg)

1.  在视口中选中要导出的网格体和骨骼。
    
    ![max_export_1.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc0c30de-dd68-4667-9f85-0397016ba9f3/max_export_1.png)
2.  在 *文件（File）* 菜单中选择 *导出选中项（Export Selected）*（或者如果你不管选中项是什么，都想导出场景中的所有资源，那就选择 *导出所有（Export All）*）。
    
    ![max_export_2.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b59db3e8-5e1b-47ce-924b-658e1bddfecd/max_export_2.jpg)
3.  选择用于导入网格体的FBX文件的位置和名称，并单击![max_save_button.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58cf2e42-8f2f-4e5e-9d6d-6bcbaa324bfe/max_save_button.jpg)按钮。
    
    ![max_export_3.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2593fafa-d425-4acf-b6d8-c73b77d31712/max_export_3.jpg)
4.  在 **FBX导出（FBX Export）** 对话框中设置适当的选项，然后单击![max_ok_button.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5e1125b-07aa-4c6d-885b-2900e5171993/max_ok_button.jpg)按钮，创建包含网格体的FBX文件。
    
    ![max_export_4.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e633301e-3fc1-49bf-82d6-8e8ddf0edba9/max_export_4.jpg)

## 导入网格体

1.  单击 **内容浏览器** 中的![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/152ba224-9a25-4322-a3c3-88dc4d34950a/import_button.png)按钮**\*\*。在打开的文件浏览器中导航到想导入到的FBX文件并选中它。**注意：\*\* 你可以在下拉菜单中选择![import_fbxformat.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2192a4b4-94da-41e5-95aa-a66a7b8cac42/import_fbxformat.jpg)来过滤不需要的文件。
    
    ![import_file.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ee4e33c-400b-469d-ba0b-c3f6daa9b382/import_file.jpg)
    
    所导入的资源的路径是由导入时 **内容浏览器** 的当前位置所决定的。请确保在执行导入之前导航到相应的文件夹。你也可以在导入后将导入的资源拖拽到一个新文件夹中。
    
2.  在 **FBX导入选项（FBX Import Options）** 对话框中选择适当的设置。如果导入不共享现有骨架的网格体，默认设置应该足够满足需求。关于这些设置的完整信息，请参阅[**FBX导入对话框**](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine)部分。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/beb10f50-9d59-428d-bda7-cc7d15e93efd/skeletalmeshfbxoptions.png)
    
    如果要导入的 *骨架网格体* 共享一个现有骨架，请单击 **选择骨架（Select Skeleton）** 下拉菜单，然后从列表中选择骨架资源。
    
    ![FBX骨架网格体骨架浏览器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70d7d6ab-6326-438f-8a69-d4999ae555cb/import_settings_skeletonbrowser.png)
3.  单击 ![导入按钮（Import Button）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e54dd5a7-9884-4ae0-b7bd-50ece2362087/button_import.png)按钮来导入网格体。如果导入成功，**内容浏览器** 将显示生成的网格体（如果启用了相关选项，还会显示材质和贴图）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f59e323a-a8cd-4f9e-b56d-43dc4cd4a45a/importedcharacter.png)
    
    通过在Persona中查看所导入的网格体，可以判断导入是否成功。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1a22d8f-7395-4ddb-8c4e-2e2daa2f3587/characterinpersona.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1a22d8f-7395-4ddb-8c4e-2e2daa2f3587/characterinpersona.png)
    

## 骨架网格体LOD

在游戏中使用 *骨架网格体* 的细节层级（LOD），可以通过使网格体远离摄像机 来限制其影响。一般来说，这意味着每个细节层级将具有较少的三角形、简化的骨骼、或者 可能会应用更简单的材质。

可以使用FBX通道来导入/导出这些LOD网格体。

### LOD设置

通常，为了处理LOD，我们会创建各种复杂程度的模型，包括从具有完整细节的基本网格体到具有最低细节级别的 LOD网格体。所有这些模型应该与同一支点对齐并占用相同的空间，并且应该对 同一骨架上进行皮肤处理。你也可以在3D应用程序中使用多个独立网格体来创建 *骨架网格体*。 每个部分都可以具有与其他网格体不同的LOD。这意味着，某些部分可以具有属于不同LOD的简化版本， 而其他部分则继续使用具有较高细节的版本。你可以为每个LOD网格体分配完全不同的材质， 包括不同的材质数量。也就是说，基础网格体可以使用多个材质来呈现聚焦时所需的足够细节， 而低细节网格体则不那么明显，因此可以使用单一材质。

1.  从基础LOD到最低级LOD的顺序，依次选择所有网格体（基础和LOD）。按顺序选择非常重要，这样就可以按照复杂性以正确的顺序添加它们。然后从 *编辑（Edit）* 菜单中选择 *细节层级（Level of Detail） > 分组（Group）* 命令。
    
    ![maya_lod_group.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49ca68c6-13e5-4d90-b0b9-304cc4ca8533/maya_lod_group.jpg)
2.  现在所有的网格体都应该分组到了LOD组下。
    
    ![maya_lod_contents.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/724392ae-5329-4ef8-82d5-6cd202afb30d/maya_lod_contents.jpg)

1.  选中所有网格物体（基础网格物体和LOD——顺序不重要），然后从 *分组（Group）* 菜单中选择 *分组（Group）* 命令。
    
    ![max_lod_group.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f18c91d-4141-486d-8a25-c71e27f1f3c3/max_lod_group.jpg)
2.  在打开的对话框中输入新组的名称，单击![max_lod_ok_button.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/163887e3-3585-4127-a45f-6c3db3a529ac/max_lod_ok_button.jpg)按钮来创建组。
    
    ![max_lod_group_name.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ddaaf54d-1c1f-450f-bd5c-1f9776eae0de/max_lod_group_name.jpg)
3.  单击![max_utilities_button.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c791d415-be18-4c44-a472-c776778968f4/max_utilities_button.jpg)按钮来查看 *实用程序（Utilities）* 面板，然后选择 *细节层级（Level of Detail）* 实用程序。**注意：**你可能需要单击![max_utility_more_button.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b538175-9c1a-4ea1-9461-df4075bd397a/max_utility_more_button.jpg)，从列表中将其选中。
    
    ![max_lod_utility.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53bbc155-8ea7-4575-9d38-bfddef17cb77/max_lod_utility.jpg)
4.  选择组后，单击![max_lod_create_button.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af2bc71e-df6c-4e8f-bfc6-b35c13ddb401/max_lod_create_button.jpg)按钮来创建一套新LOD，并将所选组中的网格体添加到其中。这些网格体将根据复杂程度自动排序。
    
    ![max_lod_contents.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/846cfdc4-cbbd-4d67-a86f-63e8a11c09aa/max_lod_contents.jpg)

#### 多个构成部分的LOD

设置由多个部分组成的 *骨架网格体* 的LOD基本上和设置一个完整网格体的LOD一样， 只是会为具有LOD的每个独立部分创建一个LOD组。单独的LOD组设置过程 与上述相同。

### 导出LOD

要导出 *骨架网格体* LOD：

1.  选择LOD组和要导出的关节。
    
    ![meshAndJointsSel.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5208faf5-f561-4550-839e-a1743d26eb58/meshandjointssel.png)
2.  遵循导出基础网格体的步骤进行操作（见上文[导出网格体](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#exportmesh)部分）。
    

1.  选择组成LOD集的网格体组和要导出的骨骼。
    
    ![max_export_1.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51ad7f5f-28f6-4262-af33-8ad734262465/max_export_1.png)
2.  遵循导出基础网格体的步骤进行操作（见上文[导出网格体](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#exportmesh)部分）。
    

### 导入LOD

在 **Persona** 中 **网格体细节（Mesh Details）** 面板上的 **LOD设置（LOD Settings）** 中可以轻松导入 **骨架网格体** LOD。

1.  在 **Persona** 中打开要应用LOD的 **骨架网格体**，并跳转到 **网格体（Mesh）** 选项卡。
2.  在 **网格体细节（Mesh Details）** 面板上向下滚动窗口，找到 **LOD设置（LOD Settings）** 部分，然后单击 **LOD导入（LOD Import）** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcea07d5-d9b5-48b9-bd26-e48409999a19/lod_import.png)
3.  在打开的文件浏览器中导航到想导入到的FBX文件并选中它。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/30c8d6cb-1211-48af-ba69-9fd4214faa09/importfilebrowser.png)
4.  导入的LOD将添加到 **网格体细节（Mesh Details）** 面板中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9bf472a2-b5a3-4af8-8912-21bd8cb3b36c/lod_added.png)

1.  每个LOD下的 **画面尺寸（Screen Size）** 设置指示何时使用该LOD。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ecc133f-0793-4f30-bcf3-7b8b4122f471/lods_set.png)
    
    **注意：**数值越小，在越远处使用该LOD；数值越大，在越近处使用该LOD。 在上图中，当距离该 **骨架网格体** 较近时使用LOD0，而当距离较远时则使用LOD1。
    
2.  导入或添加LOD时，也可以调整该LOD的 **缩减设置（Reduction Settings）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/444a113a-ddea-43e9-9a0f-a2638f8e33f1/lod_reductionsettings.png)

## 从虚幻编辑器导出到FBX

先前导入到虚幻编辑器中的 *骨架网格体* 可以再次从 **内容浏览器** 导出到FBX文件。

转化包中的资源不能导出，因为该导出过程需要已经转化的源码数据。

1.  在 **内容浏览器** 中选择要导出的 *骨架网格体*。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25f24997-a7ff-40e1-871b-0a201ac22a63/selectskeletalmesh.png)
2.  **右击** 该 *骨架网格体*，选择 **资源操作（Asset Actions）** > **导出（Export）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13d86d58-4b05-4822-a3a6-9f281cb74df6/exportmenu.png)
3.  在弹出的文件浏览器中选择要导出的文件的位置和名称。**注意：** 确保选择 *FBX File (\*.FBX)* 作为文件类型。
    
    ![export_file.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f12922d8-7337-47ad-86c1-af2828d83f0c/export_file.jpg)

## 物理资源

关于使用物理资源工具（PhAT）的完整信息，请参阅[**物理资源工具**](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine)用户文档。

## 动画

关于使用FBX内容通道来创建及导入动画的完整细节，请参阅[**FBX动画通道**](/documentation/zh-cn/unreal-engine/fbx-animation-pipeline-in-unreal-engine)页面。

## 变形目标

关于使用FBX内容通道来创建及导入变形目标的完整细节，请参阅[**FBX变形目标通道**](/documentation/zh-cn/unreal-engine/fbx-morph-target-pipeline-in-unreal-engine)页面。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [一般设置](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E4%B8%80%E8%88%AC%E8%AE%BE%E7%BD%AE)
-   [单一网格体和由多部分构成的网格体](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E5%8D%95%E4%B8%80%E7%BD%91%E6%A0%BC%E4%BD%93%E5%92%8C%E7%94%B1%E5%A4%9A%E9%83%A8%E5%88%86%E6%9E%84%E6%88%90%E7%9A%84%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [绑定](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E7%BB%91%E5%AE%9A)
-   [骨架](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E9%AA%A8%E6%9E%B6)
-   [绑定](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E7%BB%91%E5%AE%9A-2)
-   [支点](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E6%94%AF%E7%82%B9)
-   [三角剖分](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E4%B8%89%E8%A7%92%E5%89%96%E5%88%86)
-   [创建法线贴图](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%B3%95%E7%BA%BF%E8%B4%B4%E5%9B%BE)
-   [材质](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E6%9D%90%E8%B4%A8)
-   [顶点颜色](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E9%A1%B6%E7%82%B9%E9%A2%9C%E8%89%B2)
-   [从3D应用程序中导出网格体](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E4%BB%8E3d%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E4%B8%AD%E5%AF%BC%E5%87%BA%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [导入网格体](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E5%AF%BC%E5%85%A5%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [骨架网格体LOD](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E9%AA%A8%E6%9E%B6%E7%BD%91%E6%A0%BC%E4%BD%93lod)
-   [LOD设置](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#lod%E8%AE%BE%E7%BD%AE)
-   [多个构成部分的LOD](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E5%A4%9A%E4%B8%AA%E6%9E%84%E6%88%90%E9%83%A8%E5%88%86%E7%9A%84lod)
-   [导出LOD](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E5%AF%BC%E5%87%BAlod)
-   [导入LOD](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E5%AF%BC%E5%85%A5lod)
-   [从虚幻编辑器导出到FBX](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E4%BB%8E%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E5%AF%BC%E5%87%BA%E5%88%B0fbx)
-   [物理资源](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E7%89%A9%E7%90%86%E8%B5%84%E6%BA%90)
-   [动画](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E5%8A%A8%E7%94%BB)
-   [变形目标](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E5%8F%98%E5%BD%A2%E7%9B%AE%E6%A0%87)
# 虚幻引擎中的FBX变换目标管线 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fbx-morph-target-pipeline-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:59:52.466Z

---

目录

![FBX变换目标管线](https://dev.epicgames.com/community/api/documentation/image/a093dcae-3622-4062-9790-d338b58a5a7f?resizing_type=fill&width=1920&height=335)

**变换目标（Morph Target）** 是特定网格体的顶点位置的快照，该网格体在某种程度上已经变形。例如，您可以使用一个角色模型，对其面部进行重塑以创建一个面部表情，然后将编辑后的版本保存为变换目标。在Unreal中，您可以混合变换目标以使角色面部做出该表情。变换目标可以通过FBX导入到Unreal中，并封装在动画序列中。

这使得将复杂的变换目标动画导入到Unreal变得非常容易，因为您可以用任意数量的变换目标驱动单个动画。例如，您可以在您的动画包中使用变换目标以使角色活动起来并说出一些对话。这个动画可以使用任意数量的变换目标来捕捉面部的完整运动。但是，当导入时，结果看起来只是一个动画序列。您仍然可以通过[**曲线**](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)访问每个变换目标的动画数据。

FBX导入通道中的变换目标支持提供了一种简单的方法，可以将骨架网格体的变换目标从三维应用程序放入Unreal中，以供在游戏中使用。通道允许在一个文件中导入任意数量骨架网格体的任意数量变换目标。

本页面是对使用FBX内容通道将变换目标导入虚幻引擎的技术概述。

虚幻引擎FBX导入管线使用 **FBX 2020.2**。在导出时使用其他版本可能会导致不兼容。

本页面包含了有关于Autodesk Maya和Autodesk 3ds Max的信息，请在下面选择您首选的内容创建工具，以及仅与将显示之所选工具相关的信息：

选择3D美术工具

Autodesk Maya Autodesk 3ds Max

## 命名

当使用FBX格式将变换目标导入Unreal时，各变换目标将根据三维应用程序中的混合形状或变换的名称命名。

\* 该名称将是添加到blendshape节点名称中的blendshape的名称，即"\[BlendShapeNode\]\_\[BlendShape\]"。

\* 该名称将是变换器修饰符中信道的名称。

## 设置变换目标

在Maya中设置要导出到FBX的变换目标需要使用混合形状。下面的步骤简要说明了为导出设置变换目标所需的步骤。有关更详细的信息，请参阅应用程序的帮助文件。

1.  从基本网格体开始。
    
    ![maya_setup_1.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0edf002-7adb-4301-9276-2ae9db8e393a/maya_setup_1.png)
2.  复制需要修改以创建目标姿势的网格体。在本例中，该网格体为头部。创建目标姿势。本例的目标姿势是角色眨眼。
    
    ![maya_setup_2.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bb38317-63ea-4ee1-bb63-88c901bd64c5/maya_setup_2.png)
3.  选择目标网格体，然后按这个顺序选择基本网格体。
    
    ![maya_setup_3.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6271e2f-b9d0-4523-a012-208897771c4c/maya_setup_3.png)
4.  在已设置的 **动画（Animation）** 菜单的 **创建变形器（Create Deformers）** 菜单中，选择 **混合形状（Blend Shape）**。必要时，可在完成此步骤后删除目标网格体。
    
    ![maya_setup_4.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ad4140e-312d-4696-b430-0d8bdc44caa9/maya_setup_4.jpg)
5.  混合形状节点此时在基本网格体的属性中可见。这些是将在Unreal中使用的名称。您可以在此处更改blendshape节点和blendshape的名称。
    
    ![maya_setup_5.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4da3140a-130c-4002-884f-4477869dd79b/maya_setup_5.png)
6.  将blendshape的权重调整到高达1.0会导致基本网格体向目标姿势内插。
    
    ![maya_setup_6.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf94c835-955c-4d50-8af2-5f3e2cd18608/maya_setup_6.png)

在3dsMax中设置要导出到FBX的变换目标需要使用变换器修饰符。下面的步骤简要说明了为导出设置变换目标所需的步骤。有关更详细的信息，请参阅应用程序的帮助文件。

1.  从基本网格体开始。
    
    ![max_setup_1.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbe61f30-eb93-48d4-8bcb-819928943bcd/max_setup_1.jpg)
2.  复制需要修改以创建目标姿势的网格体。在本例中，该网格体为头部。创建目标姿势。本例的目标姿势是角色眨眼。
    
    ![max_setup_2.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69131a4f-02a6-47e5-b23e-3cf36e4e56c7/max_setup_2.jpg)
3.  将 **变换器（Morpher）** 修饰符添加到基本网格体。它需要放置在堆栈中的 **皮肤（Skin）** 修饰符之前。
    
    ![max_setup_3.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2f3422b-8a82-4f2a-ba68-6f0db8cc4dcc/max_setup_3.jpg)
4.  选择要填充的变换信道后，按下 **变换器（Morpher）** 修饰符属性转出中的![max_pick_button.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1672e48c-7fdc-4b3a-94e9-7fbc03e8cb9f/max_pick_button.jpg)或 **右键单击** 该信道并选择\_从场景中选取对象（Pick Object From Scene）\_。
    
    ![max_setup_4.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d3b68e1-bdde-4cd4-a17a-7382b6cf9027/max_setup_4.jpg)
5.  在视口中，单击目标网格体。
    
    ![max_setup_5.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd4a3ef8-3733-4516-ae9f-fc808e5f5b0b/max_setup_5.jpg)
6.  变换信道现已填充，并显示目标网格体的名称。这是提供给Unreal中变换目标的名称。您可以在 **变换器（Morpher）** 修饰符的转出的 **信道参数（Channel Parameters）** 部分中更改它。
    
    ![max_setup_6.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a53ae99f-1b7e-42e4-88bd-a9786c72f5fd/max_setup_6.jpg)
7.  将信道的权重调整到高达100.0会导致基本网格体向目标姿势内插。
    
    ![max_setup_7.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/729f5636-abeb-4386-b581-ddb04479f96c/max_setup_7.jpg)

## 导出变换目标

1.  在视口中选择要导出的基本网格体和关节。
    
    ![maya_export_1.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f664637d-f44b-4602-aa8e-6b0bf37d0998/maya_export_1.png)
2.  在\_文件（File）*菜单中，选择\_导出选择（Export Selection）*（或者如果您想要导出场景中的一切（无论选择了什么），请选择\_全部导出（Export All）\_）。
    
    ![maya_export_2.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f37068e4-c4c1-4f02-bf21-c20f04e4d7d4/maya_export_2.jpg)
3.  选择要将变换目标导出至的FBX文件的位置和名称，并在 **FBX导出（FBX Export）** 对话框中设置合适的选项。为了导出变换目标，必须启用 **动画（Animations）** 复选框和所有 **变形模型（Deformed Models）** 选项。
    
    ![maya_export_3.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0dc40dc1-6b8f-4b8a-a654-93c475d87e0f/maya_export_3.jpg)
4.  单击![maya_export_button.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25f0a09d-6087-4034-a7f0-a093084d7de5/maya_export_button.jpg)按钮以创建包含变换目标的FBX文件。
    

1.  在视口中选择要导出的基本网格体和骨骼。
    
    ![max_export_1.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f52a535-41fe-4838-9a82-8319eb8a66dd/max_export_1.jpg)
2.  在\_文件（File）*菜单中，选择\_导出选定项（Export Selected）*（或者如果您想要导出场景中的一切（无论选择了什么），请选择\_全部导出（Export All）\_）。
    
    ![max_export_2.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ca36857-c254-415e-b330-9c67205a5b89/max_export_2.jpg)
3.  选择要将变换目标导出至的FBX文件的位置和名称，然后单击![max_save_button.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3417681-01cc-4454-b567-aa0c846b9ae8/max_save_button.jpg)按钮。
    
    ![max_export_3.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc434690-3260-41ec-90a1-7d5ebc2a1d88/max_export_3.jpg)
4.  在 **FBX导出（FBX Export）** 对话框中设置合适的选项。为了导出变换目标，必须启用 **动画（Animations）** 复选框和所有 **变形（Deformations）** 选项。
    
    ![max_export_4.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2440a0df-1d18-4a73-bd9a-4e3a91c9eaac/max_export_4.jpg)
5.  单击![max_ok_button.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4135573c-ed35-49d2-ab8f-42d4adfdf459/max_ok_button.jpg)按钮以创建包含变换目标的FBX文件。
    

## 导入变换目标

FBX变换目标导入通道允许同时导入\_SkeletalMesh\_和变换目标。如果您将变换目标导入并添加到已经应用了变换目标的现有骨架中，则现有骨架将被覆盖。

**带变换目标的骨架网格体（Skeletal Mesh with Morph Targets）**

1.  单击 **内容浏览器（Content Browser）** 中的 **导入（Import）** 按钮。导航到并选择要在打开的文件浏览器中导入的FBX文件。**注意：** 您可能需要在下拉菜单中选择![import_fbxformat.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f8d1e2c-d1bf-4238-bfbb-64279a79a627/import_fbxformat.jpg)以过滤不需要的文件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38326fc0-9f40-4254-bedd-6c5ac3d8b7e6/import_file.jpg)
2.  在 **导入（Import）** 对话框中选择合适的设置。确保启用了\_导入变换目标（Import Morph Targets）\_。**注意：**导入的网格体的名称将遵循默认的[**命名规格**](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine#%E5%91%BD%E5%90%8D%E8%A7%84%E8%8C%83)。有关所有设置的完整详情，请参阅[**FBX导入对话框**](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine)部分。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d07870c3-24e5-4390-a222-37862985be91/importmorphtargets.png)
3.  单击 **确定（OK）** 按钮以导入网格体和LOD。如果此过程成功，最终生成的网格体、变换目标(MorphTargetSet)、材质和纹理将显示在 **内容浏览器（Content Browser）** 中。您可以看到，为保存变换目标而创建的MorphTargetSet在默认情况下是以骨架的根骨骼命名的。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/733e0e58-363f-4f7c-9d6e-715004549528/importedcharacter.png)
    
    通过查看Persona中导入的网格体并使用 **变换目标预览器（Morph Target Previewer）** 选项卡，您可以调整导入的变换目标的强度，并看到它正在按预期工作。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/027169b8-c375-4c89-8707-f46cf955acd6/infskelmesh_morph1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/027169b8-c375-4c89-8707-f46cf955acd6/infskelmesh_morph1.png)

**变换目标（Morph Targets）** 的效果通常很微妙，但无论怎样强调它给动画师提供的控制和它给角色增加的可信度也不为过。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [命名](/documentation/zh-cn/unreal-engine/fbx-morph-target-pipeline-in-unreal-engine#%E5%91%BD%E5%90%8D)
-   [设置变换目标](/documentation/zh-cn/unreal-engine/fbx-morph-target-pipeline-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%8F%98%E6%8D%A2%E7%9B%AE%E6%A0%87)
-   [导出变换目标](/documentation/zh-cn/unreal-engine/fbx-morph-target-pipeline-in-unreal-engine#%E5%AF%BC%E5%87%BA%E5%8F%98%E6%8D%A2%E7%9B%AE%E6%A0%87)
-   [导入变换目标](/documentation/zh-cn/unreal-engine/fbx-morph-target-pipeline-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%8F%98%E6%8D%A2%E7%9B%AE%E6%A0%87)
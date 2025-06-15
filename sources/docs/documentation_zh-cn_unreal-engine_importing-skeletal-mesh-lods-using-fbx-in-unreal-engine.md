# 在虚幻引擎中使用FBX导入骨骼网格体LOD | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/importing-skeletal-mesh-lods-using-fbx-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:59:56.515Z

---

目录

![使用FBX导入骨骼网格体LOD](https://dev.epicgames.com/community/api/documentation/image/99465c69-5345-4519-81c6-57dd78f1e0cf?resizing_type=fill&width=1920&height=335)

选择操作系统：

Windows macOS Linux

可从外部 3D 建模程序（如 **3DS Max**、**Maya** 或 **Blender**）将骨骼网格体细节级别（LOD）导入虚幻引擎。我们在此使用 3DS Max 和 Maya 进行演示，实际上您可将骨骼网格体 LOD 从任何带保存功能的 3D 建模程序中导入虚幻引擎。

在开始前，请确保你有可供使用的3D建模应用程序。

## 目标

此指南的要点是为您展示如何从外部 3D 建模程序导入骨骼网格体 LOD。

## 目的

完成此指南的阅读后，您将了解：

-   如何从外部 3D 建模程序设置骨骼网格体 LOD。
-   如何从外部 3D 建模程序导出骨骼网格体 LOD。
-   如何将骨骼网格体 LOD 从外部 3D 建模程序导入虚幻编辑器。

虚幻引擎FBX导入管线使用 **FBX 2020.2**。在导出时使用其他版本可能会导致不兼容。

选择3D美术工具

Autodesk Maya Autodesk 3ds Max

## 设置骨骼网格体 LOD

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

**多部位骨骼网格体** LOD 的设置和全网格体 LOD 的设置几乎相同，唯一的不同是包含 LOD 的每个部位均会创建 LOD 群组。这些 LOD 群组的设置过程与上述过程相同。

## 导出骨骼网格体 LOD

1.  选择要导出的LOD群组和关节。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fac7334a-d421-4572-a880-44bb60f6fabe/log_joint_selection.png)
    
    按照与基本网格体相同的导出步骤操作（具体请参见[从3D应用程序中导出网格体](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E4%BB%8E3d%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E4%B8%AD%E5%AF%BC%E5%87%BA%E7%BD%91%E6%A0%BC%E4%BD%93)部分）。
    
2.  选择包含要导出的LOD集以及骨骼的网格体群组。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5384387-c68f-4d6d-98af-7309f4fd7012/lod_meshset_bones_selection.png)
    
    按照与基本网格体相同的导出步骤操作（具体请参见[从3D应用程序中导出网格体](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine#%E4%BB%8E3d%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E4%B8%AD%E5%AF%BC%E5%87%BA%E7%BD%91%E6%A0%BC%E4%BD%93)部分）。
    

## 导入骨骼网格体 LOD

可通过 **Persona** 中 **LOD Settings** 下的 **Mesh Details** 面板导入 **骨骼网格体 LOD**。

Persona 是 UE4 中的动画编辑工具集。在 [动画编辑器](/documentation/zh-cn/unreal-engine/animation-editors-in-unreal-engine) 中可查看更多内容。

1.  如需将 **LOD** 应用至骨骼网格体，双击 **内容浏览器** 中的动画资源即可打开 **Persona**（操作示意图如下）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3dcfc1ba-eb5e-455f-9123-e85531a37179/openingpersona.png)
2.  在 **Mesh Details** 面板中向下滚动，找到 **LOD Settings** 部分并点击 **LOD Import** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb6eabc1-0c55-43e3-a217-ce9f8848f28b/lod_import.png)
3.  在文件浏览器中找到并选择需要导入的 FBX 文件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26993cfe-fa58-459c-83a9-231927349736/importlod1_windows.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02c60c11-a67f-4577-b176-968ae0684521/importlod1_mac.png)
4.  导入的 LOD 现在已添加到 **Mesh Details** 面板。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c48c3f5-170d-4102-b4cd-f13b1647f6b4/lod_added.png)
5.  每个 LOD 下的 **Display Factor** 设置说明 LOD 何时使用。下图中，玩家位置靠近 **骨骼网格体** 时使用 LOD0，玩家位置远离 **骨骼网格体** 时使用 LOD1。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4be50d7-ff97-4334-b6d9-5f1c452580f9/lods_set.png)
    
    玩家位置远离 **骨骼网格体** 时，使用较小的 **Display Factor** 数值告知虚幻引擎使用 LOD。玩家位置靠近 **骨骼网格体** 时，使用较大的 **Display Factor** 数值告知虚幻引擎使用 LOD。
    

这便是该教程的全部内容，您已从中学习到：

✓ 如何从外部 3D 建模程序设置骨骼网格体 LOD。  
✓ 如何从外部 3D 建模程序导出骨骼网格体 LOD。  
✓ 如何将骨骼网格体 LOD 从外部 3D 建模程序导入虚幻编辑器。

-   [import](https://dev.epicgames.com/community/search?query=import)
-   [skeletal mesh](https://dev.epicgames.com/community/search?query=skeletal%20mesh)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [目标](/documentation/zh-cn/unreal-engine/importing-skeletal-mesh-lods-using-fbx-in-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [目的](/documentation/zh-cn/unreal-engine/importing-skeletal-mesh-lods-using-fbx-in-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [设置骨骼网格体 LOD](/documentation/zh-cn/unreal-engine/importing-skeletal-mesh-lods-using-fbx-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93lod)
-   [导出骨骼网格体 LOD](/documentation/zh-cn/unreal-engine/importing-skeletal-mesh-lods-using-fbx-in-unreal-engine#%E5%AF%BC%E5%87%BA%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93lod)
-   [导入骨骼网格体 LOD](/documentation/zh-cn/unreal-engine/importing-skeletal-mesh-lods-using-fbx-in-unreal-engine#%E5%AF%BC%E5%85%A5%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93lod)

相关文档

[

FBX导入选项参考

![FBX导入选项参考](https://dev.epicgames.com/community/api/documentation/image/8c6bff4d-0dc5-4058-8790-04adff60871b?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine)

[

骨架网格体管道

![骨架网格体管道](https://dev.epicgames.com/community/api/documentation/image/5c9366a0-9949-44e3-a3a9-9951e6c50ad0?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine)
# 在虚幻引擎中使用FBX方法导入静态网格体 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/importing-static-meshes-using-fbx-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:00:21.126Z

---

目录

![使用FBX方法导入静态网格体](https://dev.epicgames.com/community/api/documentation/image/cb97facc-233e-4721-b08c-db6abe5ff43d?resizing_type=fill&width=1920&height=335)

选择操作系统：

Windows macOS Linux

可从外部 3D 建模程序（如 **3DS Max**、**Maya** 或 **Blender**）将静态网格体导入到虚幻引擎。我们在此使用 3DS Max 和 Maya 进行演示，实际上您可将 **静态网格体** 从任何带保存功能的 3D 建模程序中导入虚幻引擎。

在开始之前，请确保你有可供使用的3D建模应用程序。

## 目标

此指南的要点是为您展示如何从外部 3D 建模程序导入静态网格体。

## 目的

完成此指南的阅读后，您将了解：

-   如何将静态网格体从外部 3D 建模程序导入虚幻编辑器。
-   如何验证静态网格体已正常导入。

虚幻引擎FBX导入管线使用 **FBX 2020.2**。在导出时使用其他版本可能会导致不兼容。

选择3D美术工具

Autodesk Maya Autodesk 3ds Max

## 从外部 3D 建模程序导入静态网格体

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

## 验证导入的静态网格体

双击导入的网格体在 **静态网格体编辑器** 中进行查看。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0313486d-6bb9-4fd5-8c3a-7179531c0493/05-verify-static-mesh.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0313486d-6bb9-4fd5-8c3a-7179531c0493/05-verify-static-mesh.png)

点击查看大图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8055257-4b71-4a56-bfbb-26d424a7203d/verifystaticmesh_mac.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8055257-4b71-4a56-bfbb-26d424a7203d/verifystaticmesh_mac.png)

点击查看大图。

*在 **静态网格体编辑器** 中查看导入的网格体，验证资源是否导入正常。*

这便是该指南的全部内容，您已从中学习到：

✓ 如何将静态网格体从外部 3D 建模程序导入虚幻编辑器。  
✓ 如何验证静态网格体已正常导入。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [fbx static mesh pipeline](https://dev.epicgames.com/community/search?query=fbx%20static%20mesh%20pipeline)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [目标](/documentation/zh-cn/unreal-engine/importing-static-meshes-using-fbx-in-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [目的](/documentation/zh-cn/unreal-engine/importing-static-meshes-using-fbx-in-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [从外部 3D 建模程序导入静态网格体](/documentation/zh-cn/unreal-engine/importing-static-meshes-using-fbx-in-unreal-engine#%E4%BB%8E%E5%A4%96%E9%83%A83d%E5%BB%BA%E6%A8%A1%E7%A8%8B%E5%BA%8F%E5%AF%BC%E5%85%A5%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [验证导入的静态网格体](/documentation/zh-cn/unreal-engine/importing-static-meshes-using-fbx-in-unreal-engine#%E9%AA%8C%E8%AF%81%E5%AF%BC%E5%85%A5%E7%9A%84%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)

相关文档

[

FBX导入选项参考

![FBX导入选项参考](https://dev.epicgames.com/community/api/documentation/image/8c6bff4d-0dc5-4058-8790-04adff60871b?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine)

[

FBX静态网格体管线

![FBX静态网格体管线](https://dev.epicgames.com/community/api/documentation/image/a2947ea0-d06e-479b-b373-f7dfac48ef1c?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/fbx-static-mesh-pipeline-in-unreal-engine)
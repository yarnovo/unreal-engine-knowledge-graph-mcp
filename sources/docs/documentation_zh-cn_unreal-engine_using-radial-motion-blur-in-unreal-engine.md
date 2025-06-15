# 在虚幻引擎中使用径向动态模糊 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-radial-motion-blur-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:29:12.652Z

---

目录

![径向动态模糊](https://dev.epicgames.com/community/api/documentation/image/1c44e694-f431-45c0-86c8-8fcfb1868d9c?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [内容浏览器界面](/documentation/zh-cn/unreal-engine/content-browser-interface-in-unreal-engine)
-   [迁移资产](/documentation/zh-cn/unreal-engine/migrating-assets-in-unreal-engine)
-   [预览和应用材质](/documentation/zh-cn/unreal-engine/previewing-and-applying-your-materials-in-unreal-engine)
-   [实例化材质](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)
-   [材质实例编辑器用户界面](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c545df7b-9ac8-49ed-973a-9c2930a4b0aa/perbonemotionblurtopicimage-1.png "PerBoneMotionBlurTopicImage-1.png")

虚幻引擎(UE)支持的标准 **动态模糊** 假设对象表面上的点在帧间保持直线移动，然后利用其在上一帧所处位置的信息来应用模糊效果。

此设置适用于从一个位置将对象移至另一位置。但在应用于单帧内旋转180度的对象时，例如飞速旋转的汽车车轮，此方法会产生视觉误差。在本例中，动态模糊朝向于车轮一侧的点，然后假设其以直线运动至车轮另一侧，而非圆周运动。

为了协助解决此问题，我们开发了特殊 **径向动态模糊** 材质，并在免费的虚幻引擎 **内容示例（Content Examples）** 项目中发布。你可以使用该材质应用径向而非线性动态模糊，让对象仿佛在快速旋转。在下列范例图像中，可以看到在旋转对象上使用标准动态模糊的结果（左侧）与使用径向动态模糊材质的结果（右侧）的对比。

![Motion Blur comparison](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4ae002a-79ef-43a6-a6d5-533c24871451/motionblurerror.png "MotionBlurError.png")

本教程将对在项目中设置径向动态模糊材质的过程进行讲解。

## 必要设置

本教程需要使用 **内容示例** 项目中的资源。若尚无此样本项目，请在Epic Games启动程序的 **学习（Learn）** 选项卡下载并安装。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f41e3cfb-d046-4774-9c67-e6185a1275dd/launcher-feature-samples.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f41e3cfb-d046-4774-9c67-e6185a1275dd/launcher-feature-samples.png)

点击查看全图。

在内容示例项目中，你可以在 **Materials\_Advanced** 地图中找到径向动态模糊的工作示例。

鉴于其复杂性，本教程不再赘述从头构建基础 **M\_RadialMotionBlur** 材质的过程。如果你想要查看基础材质图表，可以在内容浏览器的 **Content > Example Content > Materials > Materials** 文件夹中找到该材质资产。

![Radial Motion Blur base Material location](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0f92893-9994-48ba-9037-2f675ac6c3fd/radial-blur-base-material.png)

出于教学演示的目的我们将使用内容浏览器中的以下资产重新构建径向动态模糊示例：

-   **SM\_Wheel** - 静态网格体
-   **SM\_Wheel\_Blur** - 静态网格体
-   **MI\_RadialMotionBlur** - 材质实例

要在你自己的项目中使用径向动态模糊材质，你可以在 **内容浏览器** 中右键点击 **MI\_RadialMotionBlur** 材质实例，并在快捷菜单中选择 **资产操作（Asset Actions）** > **迁移（Migrate）**。

![Migrate Assets tool](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a211650a-d794-4626-94b6-f81aab55fe37/migrating-assets.png)

迁移资源工具将自动在迁移中包括MI\_RadialMotionBlur和基础径向运动模糊（RadialMotionBlur）材质。欲了解本主题更多信息，参见[迁移资源](/documentation/zh-cn/unreal-engine/migrating-assets-in-unreal-engine)相关指南。

## 步骤

1.  确保关闭虚幻编辑器。在项目文件夹中，找到 **Config** 文件夹并找到 **DefaultEngine.ini**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd9b4914-1d86-445e-9af0-6527843d9035/default-engine-location.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd9b4914-1d86-445e-9af0-6527843d9035/default-engine-location.png)
    
    点击查看大图。
    
2.  用文本编辑器打开 **DefaultEngine.ini**，然后在 **\[/Script/Engine.RendererSettings\]** 段添加 **r.CustomDepth=3**。
    
    ![Custom Depth 3](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2741e708-67ed-4497-956c-3d7799f1b477/custom-depth-three.png)
3.  径向动态模糊需要两个 **静态网格体**：要应用径向动态模糊的网格体，以及将其覆盖的"虚拟"网格体。虚拟网格体不仅要覆盖将被模糊的对象，还要完全覆盖其旋转时掠过的空间，其应尽量紧密包裹掠过的空间，而不与原始对象的几何体相交。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ebc35fa-7d00-4f4c-985b-bd57b09a5e2f/perbonemotionblur_blurobject.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ebc35fa-7d00-4f4c-985b-bd57b09a5e2f/perbonemotionblur_blurobject.png)
    
    点击查看大图。
    
    在上述示例图像中，要应用模糊效果的网格体应用了标准材质，而"仿真"网格体是一个环绕它的凸包，用黄色线框显示。注意，它与静态网格体紧密贴合，但不穿透静态网格体。可以决定使用自己的网格体，但出于本指南的目的，将使用资源 **SM\_Wheel** 和 **SM\_Wheel\_Blur**，可在 **Content > ExampleContent > Materials > Meshes** 下的内容示例项目中找到它们。
    
    ![SM_Wheel Static Mesh location](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62c4814d-8301-44ce-80e9-49f444f9c983/sm-wheel-content-browser.png)
4.  将 **SM\_Wheel** 拖入场景来新建 **StaticMeshActor**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65935655-c2a5-4a28-af17-418bcdb1e7c5/drag-wheel-into-scene.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65935655-c2a5-4a28-af17-418bcdb1e7c5/drag-wheel-into-scene.png)
    
    点击查看全图。
    
5.  在此 StaticMeshActor 的 **细节面板（Details Panel）** 中，点击 **从所选项创建蓝图（Create Blueprint from Selection）** 按钮，基于此Actor新建蓝图。将蓝图命名为 **BP\_StaticMesh\_MotionBlur**，并保存到 **Blueprints** 文件夹。此静态网格体将被转换为新的蓝图Actor类型，同时自动打开 **蓝图编辑器**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9206985b-00a3-48e0-a02f-b1c82afc0606/create-blueprint-from-selection.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9206985b-00a3-48e0-a02f-b1c82afc0606/create-blueprint-from-selection.png)
    
    点击查看全图。
    
6.  在 **蓝图编辑器** 中，找到 **组件面板（Components Panel）** 并选择网格体的 **静态网格体组件（StaticMeshComponent）**。然后，在 **细节面板（Details Panel）** 中，展开 **渲染（Rendering）** 下的 **高级（Advanced）** 分段。将 **渲染自定义深度通道（Render Custom Depth Pass）** 设为True，然后将 **自定义深度模具值（Custom Depth Stencil Value）** 设为5。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1c8bbda-f6c7-41e3-832c-980be67ff54f/blueprint-editor-render-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1c8bbda-f6c7-41e3-832c-980be67ff54f/blueprint-editor-render-settings.png)
    
    点击查看全图。
    
7.  在 **组件面板（Components Panel）** 中，点击 **添加组件（Add Component）** 按钮。在下拉列表中选择 **静态网格体（Static Mesh）** 以添加新的静态网格体组件（StaticMeshComponent）作为基础网格体的子级。将此网格体重命名为"**MotionBlur Mesh**"。
    
    ![Add Static Mesh component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ae7d5ce-167e-45dd-a998-bf619dc211f6/add-static-mesh-component.png)
8.  在 **细节面板（Details Panel）** 中，将动态模糊（MotionBlur）网格体的静态网格体设为 **SM\_Wheel\_Blur**。将其延X轴旋转 **90°** 以适应基础网格体。在材质（Materials）分段中确保其已应用 **MI\_RadialMotionBlur** 材质实例。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3153304a-019c-4a47-bea0-b513ab3e62c0/sm-wheel-blur-mesh.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3153304a-019c-4a47-bea0-b513ab3e62c0/sm-wheel-blur-mesh.png)
    
    点击查看大图。
    

## 结果

应用 **MI\_RadialMotionBlur** 材质实例后，基础网格体现会仿佛在快速旋转。下图中展示的是普通静态网格体（左侧），与之相对的是一个将径向运动模糊（RadialMotionBlur）应用于虚拟网格体（围绕基础网格体）的网格体（右侧）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7478163f-74cb-4518-8680-cd6ea101cfe6/motionblur_finalresult.png)

注意：无需旋转基础网格体或Actor即可获得此效果。相反，径向运动模糊材质自身将创造对象在旋转的假象。你可以使用 **MI\_RadialMotionBlur** 材质实例中的 **角度（Angle）** 和 **边缘半径（RimRadius）** 参数来调整此效果的表现。

![Radial Blur aterial Instance](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/695a87f6-c904-4a18-9d65-da08f718c90c/radial-blur-material-instance.png)

在以下两个图像序列中，展示了调整 **角度（Angle）** 和 **边缘半径（RimRadius）** 材质输入值后，径向模糊的视觉效果所受到的影响。

          ![该角度（Angle）参数用于控制径向模糊的强度。参数越高，对象旋转得越快。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7614e63b-eeec-4227-ad73-aee37bc65ab6/perbonemb_001.png) ![该角度（Angle）参数用于控制径向模糊的强度。参数越高，对象旋转得越快。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/daff2ca6-7974-4e34-a5b4-79f5ccd05f81/perbonemb_002.png) ![该角度（Angle）参数用于控制径向模糊的强度。参数越高，对象旋转得越快。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b7dfd34-fa8a-463c-a522-bc8f8571943b/perbonemb_003.png) ![该角度（Angle）参数用于控制径向模糊的强度。参数越高，对象旋转得越快。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ad63ae0-d5b5-45e1-94eb-38e7e76e04cd/perbonemb_004.png) ![该角度（Angle）参数用于控制径向模糊的强度。参数越高，对象旋转得越快。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c50f479-2c9d-494f-a4b3-b24d516ca66e/perbonemb_005.png) ![该角度（Angle）参数用于控制径向模糊的强度。参数越高，对象旋转得越快。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1e1bfb4-357b-4570-ad0c-6ee8e363d498/perbonemb_006.png) ![该角度（Angle）参数用于控制径向模糊的强度。参数越高，对象旋转得越快。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcba7d8f-1f12-4163-a04a-e3af2fb75e74/perbonemb_007.png) ![该角度（Angle）参数用于控制径向模糊的强度。参数越高，对象旋转得越快。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/faddffad-60e1-42d8-a966-805484d84f97/perbonemb_008.png) ![该角度（Angle）参数用于控制径向模糊的强度。参数越高，对象旋转得越快。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7ee9772-8438-4738-98d8-eb84ea4607ff/perbonemb_009.png) ![该角度（Angle）参数用于控制径向模糊的强度。参数越高，对象旋转得越快。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91dc33de-81cf-4634-9222-678b9876b0f3/radialblur_10-2.png) ![该角度（Angle）参数用于控制径向模糊的强度。参数越高，对象旋转得越快。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60ced590-56fb-44ca-8b1f-a6491962d129/radialblur_11-2.png)

该角度（Angle）参数用于控制径向模糊的强度。参数越高，对象旋转得越快。    ![边缘半径参数用于限制径向模糊的对象。应对边缘半径进行设置，以匹配用于径向模糊的网格体半径。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05c7f40b-7a89-42ab-9983-38a15f860205/rimradius_0.png) ![边缘半径参数用于限制径向模糊的对象。应对边缘半径进行设置，以匹配用于径向模糊的网格体半径。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a14e30e-5af4-4a26-9615-7cb2a42a060f/rimradius_20.png) ![边缘半径参数用于限制径向模糊的对象。应对边缘半径进行设置，以匹配用于径向模糊的网格体半径。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4dffd86-7792-40d4-9a78-053ddb8ccce0/rimradius_25.png) ![边缘半径参数用于限制径向模糊的对象。应对边缘半径进行设置，以匹配用于径向模糊的网格体半径。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3547d846-2e82-4bec-9099-1c946b0bfc1d/rimradius_30.png) ![边缘半径参数用于限制径向模糊的对象。应对边缘半径进行设置，以匹配用于径向模糊的网格体半径。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5d62f43-9af2-4d60-9762-f7971e077ce0/rimradius_42.png)

边缘半径参数用于限制径向模糊的对象。应对边缘半径进行设置，以匹配用于径向模糊的网格体半径。

可复用此新建Actor类型来创建使用径向动态模糊效果的所有对象。变更同时用于基础网格体和虚拟网格体的静态网格体，并确保虚拟网格体使用了RadialMotionBlur材质的材质实例。记住，虚拟网格体在旋转时需要尽量与基础网格体掠过的区域紧密相匹。

![Radial Motion Blur on multiple shapes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/306e46c9-3b56-4272-a432-32b302834bc7/motionblur_othershapes.png)

最后，若要让不同对象使用不同设置，可基于 **径向运动模糊** 材质新建材质实例，并对其进行相应设置。欲了解创建材质实例方式的更多信息，参见[创建和使用材质实例](/documentation/zh-cn/unreal-engine/creating-and-using-material-instances-in-unreal-engine)相关指南。

-   [materials](https://dev.epicgames.com/community/search?query=materials)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [必要设置](/documentation/zh-cn/unreal-engine/using-radial-motion-blur-in-unreal-engine#%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [步骤](/documentation/zh-cn/unreal-engine/using-radial-motion-blur-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [结果](/documentation/zh-cn/unreal-engine/using-radial-motion-blur-in-unreal-engine#%E7%BB%93%E6%9E%9C)
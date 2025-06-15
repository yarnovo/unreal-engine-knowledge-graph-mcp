# 在虚幻引擎中预览和应用材质 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/previewing-and-applying-your-materials-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:26:14.705Z

---

目录

![预览和应用材质](https://dev.epicgames.com/community/api/documentation/image/4df1703b-c6bd-49de-9bdd-739a3d8c2db8?resizing_type=fill&width=1920&height=335)

在材质创建流程中，预览和应用材质很重要，因为它允许你查看材质图表改动后的结果。只有经常预览和应用材质，你才能获得准确的材质效果。本指南将介绍如何在材质编辑器中预览你的材质，然后演示如何将材质添加到虚幻引擎的网格体中。

## 预览和应用材质

预览材质的最简单方法是使用材质编辑器的 **视口** 窗口。视口提供了许多选项来调整材质的预览效果。下图详细介绍了视口的构成部分。

![Material Editor Viewport breakdown](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1791b4d-f487-4b0a-8e75-041f0d0bafac/material-editor-viewport-ue5.png)

编号

属性

描述

1

视口选项

包含一个可以开启实时预览效果的开关。还包含视口统计数据、布局选项、以及FOV设置。

2

视口类型

在透视和正交模式中切换。

3

视图模式

从不同视图模式中选择并更改曝光设置。

4

视口显示标志

显示或隐藏背景、网格和视口统计数据。

5

预览网格体

这是一个预览网格体，你可以用它来查看材质在不同物体上的效果。

6

预览网格体选项

在五个不同的预览网格体中选择：圆柱体、球体、平面、立方体或自定义网格体。

在材质编辑器中，如果你忘记了属性的功能，可以将鼠标光标悬停在图标上，这样就能看到有关各属性的简短功能说明。

在材质编辑器中创建材质时，如果启用了 **实时功能**，那么视口会实时更新，以显示你的更改。实时功能默认启用，你可以在 **视口选项** 菜单中开关此选项。

![Realtime Preview](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/56d78241-4f81-489a-a85e-d048b328f0fe/toggle-realtime.png)

试着调整[主材质节点](/documentation/zh-cn/unreal-engine/using-the-main-material-node-in-unreal-engine)相关的材质表达式的数值，观察视口中的变化。

对材质网络进行任何更改后，可能要经过一小段时间才能正确渲染这些更改。材质越复杂，更新预览窗口就需要越多的时间。如果你觉得确实需要加快更新速度，那么应考虑将材质转换为[材质实例](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)。

### 预览场景设置

**预览场景设置** 面板使你能够在各种不同环境和光照条件下快速预览材质。这能使你更好地了解材质在条件变化时将如何和光线互动。

在菜单栏中点击 **窗口>预览场景设置**，启用该面板。

![Enable the Preview Scene Settings panel.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f30b862b-af9e-4e93-8b74-a0a964b7e420/open-preview-scene-settings.png)

**预览场景设置** 位于材质编辑器左下角，细节选项卡旁边。

![Preview Scene Settings interface options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/adf67482-ae30-4d4f-8df2-575971dd6d7a/preview-scene-settings-tab.png)

预览场景设置包含用于改变视口光照的颜色、方向和强度选项。你还可以改变背景，添加基本的后期处理效果。

这让你能在截然不同的光照条件下查看材质，而无需改变关卡中的内容。

![默认视口设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59b9023c-2219-4d56-926c-3e8859f28449/preview-scene-settings-compare-01.png)

![修改后的预览场景设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d60615ec-6c3f-48dd-bac9-5d82b8e1e917/preview-scene-settings-compare-02.png)

默认视口设置

修改后的预览场景设置

### 在材质图表中预览某个特定节点

有时，你可能希望查看材质图中特定节点的效果。例如，如果你创建了一个使用[菲涅尔材质表达式](/documentation/zh-cn/unreal-engine/using-fresnel-in-your-unreal-engine-materials)的材质，你可能想预览这个节点，以便微调菲涅尔效果的衰减程度。

**右键单击** 材质表达式，在菜单中选择 **开始预览节点**，在视口中预览该节点。

![Start previewing a Material Expression node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73b6b18f-5e86-4b0c-94c4-af32ed631d6a/start-previewing-node.png)

菲涅尔节点会变成蓝色，表示它当前正在被预览。在预览视窗中，你可以清楚地看到菲涅尔效果的轮廓，并且不会受到其他效果（如纹理或反射）的视觉干扰。

![Fresnel node preview](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4db78e9-5eb0-465e-a226-dd026c63e495/node-preview-fresnel.png)

要停止预览节点，**右键单击** 它并选择 **停止预览节点**。

![Stop previewing Material node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6dcdcf1-5fea-4b46-abd9-c3d83331ba81/stop-previewing-node.png)

### 在自定义网格体上预览材质

材质编辑器视口提供了四种内置的预览网格选项：圆柱体、球体、平面和立方体。你也可以用自定义网格体预览材质。

1.  在内容浏览器中选择一个 **静态网格体**。
    
    ![Select Static Mesh](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6fb1143c-3713-4447-b007-8504140c7a7e/stairs-static-mesh.png)
2.  点击材质编辑器视口右下角的茶壶图标，用选定的静态网格体作为预览对象。
    
    ![Custom Material Editor preview mesh](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/225a40f1-579f-4cdf-92a2-d0f50a9bc493/custom-mesh-preview.png)

## 如何应用你的材质

### 编译和保存

修改材质网络后，材质编辑器的视口预览效果会不断更新。不过，在将材质应用到物体上并在关卡中查看前，你需要 **编译** 材质。要编译材质，请点击材质编辑器工具栏左边的 **应用** 或 **保存** 按钮。

![Material Editor Toolbar](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7acdf6d-5e9c-4682-8f6d-da94aec2088c/save-and-apply.png)

这会更新材质，使之包含你刚才预览的改动效果。然后你可以把它添加到一个网格体上，并在关卡中查看效果。

在虚幻引擎中，有两种主要方法将材质添加到物体上：

### 拖放

在 **内容浏览器** 中选择一个材质，然后将其直接拖到关卡对象上。

1.  左键单击材质，在内容浏览器中将其拖到一个物体上。鼠标移到在一个对象上后释放鼠标左键，应用材质。
    
    ![Apply a material by drag-and-drop](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6110065a-549f-43ef-9b3a-088fe6865d9e/drag-onto-actor.png)
2.  新的材质已经添加到对象上。
    
    ![New material applied to mesh](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49f88765-fa66-452b-8e94-c214228ca73b/apply-mat-result.png)

### 在细节面板中应用材质

你也可以点击 **使用内容浏览器中的选定资产（Use selected asset from Content Browser）** 按钮，在对象的 **细节** 面板中应用材质，如下所示：

1.  在内容浏览器中选择一个材质。
    
    ![Select Material in Content Browser](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51325412-87f1-4264-a4d5-cf30383e7646/select-material-content-browser.png)
2.  在视口中选择一个Actor。
    
    ![Select Actor in viewport](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0cab429d-c2b1-408a-811e-e605570c2a1d/select-actor.png)
3.  点击对象的 **细节** 面板的材质部分的 **使用内容浏览器中的选定资产（Use Selected Asset from Content Browser）** 按钮。
    
    ![Use Selected Asset from Content Browser](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46e50de0-9eed-4350-a4cf-ce03577d1085/assign-material-from-details-panel.png)
4.  新材质会被应用到该对象上。
    
    ![New Material on mesh](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88a048f5-bba2-4653-8ff2-4f07b3069f77/new-material-applied.png)

## 预览关卡中的材质参数

下面的功能需要你使用Scalar或Vector参数，这些参数可以动态更新而不需要重新编译材质。阅读关于[材质实例](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)的文档来了解参数化。

你可以在材质编辑器中调整材质的 **标量** 或 **矢量** 参数，然后立即在所有 3D 视口中看到结果。

这对于用于实现图层的[材质函数](/documentation/zh-cn/unreal-engine/unreal-engine-material-functions-overview)特别有用，因为你可以即时查看针对场景中所有使用该函数的材质调整图层的结果，而不必等待材质重新编译。

要在关卡中预览参数，使用标量或矢量参数创建一个参数化材质，并将其应用于你的场景中的一个材质。

1.  首先，确保要预览的材质应用于关卡中的某个对象。
    
2.  在材质内部，请确保正在使用 **标量** 或 **矢量参数** 作为要更改的属性的输入。 此类预览不适用于 **常量** 材质表达式节点，你必须使用 **参数** 节点，或将你要调整的材质表达式节点转换为 **参数** 节点。 重要的是，要转换以进行预览的材质表达式输入必须具有唯一的名称，否则无法转换。
    
3.  要在关卡视口中实时查看发生的更改，请调整材质中标量或矢量参数的值。 然后，你所作的调整将在关卡视口中实时显示。
    

## 总结

如你所见，在虚幻引擎中，你可以通过许多不同方法来预览和应用材质。你可以根据工作流程，选择最合适的方法来预览和应用材质。 请记住，完成预览时，务必按 **应用（Apply）**和 **保存（Save）**按钮，否则有丢失/看不到你的工作成果的风险。注意，当你完成材质编辑后，你必须点击工具栏中的 **应用** 和 **保存** 来重新编译材质，否则可能会丢失当前内容。

![Save and Apply Material](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96d59101-ffbd-42c2-8b11-4c767faf4da3/save-and-apply.png)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [预览和应用材质](/documentation/zh-cn/unreal-engine/previewing-and-applying-your-materials-in-unreal-engine#%E9%A2%84%E8%A7%88%E5%92%8C%E5%BA%94%E7%94%A8%E6%9D%90%E8%B4%A8)
-   [预览场景设置](/documentation/zh-cn/unreal-engine/previewing-and-applying-your-materials-in-unreal-engine#%E9%A2%84%E8%A7%88%E5%9C%BA%E6%99%AF%E8%AE%BE%E7%BD%AE)
-   [在材质图表中预览某个特定节点](/documentation/zh-cn/unreal-engine/previewing-and-applying-your-materials-in-unreal-engine#%E5%9C%A8%E6%9D%90%E8%B4%A8%E5%9B%BE%E8%A1%A8%E4%B8%AD%E9%A2%84%E8%A7%88%E6%9F%90%E4%B8%AA%E7%89%B9%E5%AE%9A%E8%8A%82%E7%82%B9)
-   [在自定义网格体上预览材质](/documentation/zh-cn/unreal-engine/previewing-and-applying-your-materials-in-unreal-engine#%E5%9C%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BD%91%E6%A0%BC%E4%BD%93%E4%B8%8A%E9%A2%84%E8%A7%88%E6%9D%90%E8%B4%A8)
-   [如何应用你的材质](/documentation/zh-cn/unreal-engine/previewing-and-applying-your-materials-in-unreal-engine#%E5%A6%82%E4%BD%95%E5%BA%94%E7%94%A8%E4%BD%A0%E7%9A%84%E6%9D%90%E8%B4%A8)
-   [编译和保存](/documentation/zh-cn/unreal-engine/previewing-and-applying-your-materials-in-unreal-engine#%E7%BC%96%E8%AF%91%E5%92%8C%E4%BF%9D%E5%AD%98)
-   [拖放](/documentation/zh-cn/unreal-engine/previewing-and-applying-your-materials-in-unreal-engine#%E6%8B%96%E6%94%BE)
-   [在细节面板中应用材质](/documentation/zh-cn/unreal-engine/previewing-and-applying-your-materials-in-unreal-engine#%E5%9C%A8%E7%BB%86%E8%8A%82%E9%9D%A2%E6%9D%BF%E4%B8%AD%E5%BA%94%E7%94%A8%E6%9D%90%E8%B4%A8)
-   [预览关卡中的材质参数](/documentation/zh-cn/unreal-engine/previewing-and-applying-your-materials-in-unreal-engine#%E9%A2%84%E8%A7%88%E5%85%B3%E5%8D%A1%E4%B8%AD%E7%9A%84%E6%9D%90%E8%B4%A8%E5%8F%82%E6%95%B0)
-   [总结](/documentation/zh-cn/unreal-engine/previewing-and-applying-your-materials-in-unreal-engine#%E6%80%BB%E7%BB%93)

相关文档

[

材质编辑器指南

![材质编辑器指南](https://dev.epicgames.com/community/api/documentation/image/14556df3-8b8e-4517-8ed0-d76a90f5fdfe?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-user-guide)

[

材质输入

![材质输入](https://dev.epicgames.com/community/api/documentation/image/e597ee6d-9089-48c5-948f-900cae75b677?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/material-inputs-in-unreal-engine)

[

材质编辑器UI

![材质编辑器UI](https://dev.epicgames.com/community/api/documentation/image/4c4d4a6a-52c0-432a-bd48-7a029cd60652?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-ui)

[

材质属性

![材质属性](https://dev.epicgames.com/community/api/documentation/image/1dd04efc-be01-4b5d-b4c8-f876754895b1?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-material-properties)

[

材质基本概念

![材质基本概念](https://dev.epicgames.com/community/api/documentation/image/fbac30c8-a779-4090-bf78-ba9029431fd8?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts)
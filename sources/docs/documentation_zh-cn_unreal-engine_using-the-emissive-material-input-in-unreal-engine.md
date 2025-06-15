# 在虚幻引擎中使用自发光材质输入 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-emissive-material-input-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:28:55.960Z

---

目录

![使用自发光材质输入](https://dev.epicgames.com/community/api/documentation/image/336bda6e-d2c9-4903-8fc5-9247fa5d3a1d?resizing_type=fill&width=1920&height=335)

在项目开发过程中，你可能需要用到自发光材质或发光材质。在虚幻引擎中，Self-Illuminated和Emissive材质均称为自发光材质。在接下来的教程中，你将学习如何使用 **自发光颜色（Emissive Color）** 输入来创建材质，以及如何创建可将光线实际投射到正在创建的世界中的自发光材质。

## 自发光光照

在虚幻引擎中，借助自发光材质，美术师能够以成本很低但有效的方式来创建表面发光或投射光的视觉效果，而无需使用虚幻的任何标准光源类型。根据你的设置，自发光材质可以充当真正的光源（此时会将光照投射到周围的环境中），也可以仅自发光而不向场景中发射光。

通过在[主材质节点（Main Material Node）](/documentation/zh-cn/unreal-engine/using-the-main-material-node-in-unreal-engine)上的 **自发光颜色（Emissive Color）** 输入中输入大于1.0的值即可创建自发光材质。 这样就会将材质推入HDR范围，从而产生[泛光效果](/documentation/zh-cn/unreal-engine/bloom-in-unreal-engine)。

## 光照和无光照自发光材质

自发光材质会自发光，这意味着可以将这种材质用于 **光照（Lit）** 和 **无光照（Unlit）着色模型**。创建完全自发光的材质时，可以使用无光照着色模型，因为它会生成一个渲染成本更低的着色器。 如果需要材质在某种程度上接收场景中的光照，则可以使用默认光照着色模型（Default Lit Shading Model）。

![Shading Model drop-down in Details Panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9dd847d2-9017-4395-a394-8fce7e153d95/shading-model.png)

-   **何时使用无光照着色模型**：如果自发光材质不需要与关卡中的光照交互，则应使用无光照着色模型。例如，自发光材质仅用于模拟光源（如发光板或灯泡表面积）时。
    
-   **何时使用默认光照着色模型**：如果希望自发光材质使用主材质节点上的任何其他着色器输入，则应使用光照着色模型。 例如，使用纹理遮罩确保只有部分材质自发光时。如果要为配备光源的枪支创建材质，则应使用默认光照着色模型，这样法线贴图（Normal Map）、基础颜色（Base Color）和其他着色器输入仍然有效。 如果希望自发光材质照亮周围的对象，必须使用默认光照着色模型。
    

## 创建完全自发光材质

本小节说明如何创建仅用于模拟光源的完全自发光材质。 这种材质将有两个参数可控制光源的颜色和亮度。

1.  在内容浏览器（Content Browser）中 **单击右键**，然后从上下文菜单的 **创建基本资产（Create Basic Asset）** 分段中选择 **材质（Material）**。 将新材质重命名为 **EmissiveLightSource**。
    
    ![Create new Material](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c81c869d-8794-4631-850a-2e7c909b2d51/create-material.png)
2.  将以下节点添加到你的材质图表中。
    
    -   **向量参数（Vector Parameter）**
    -   **标量参数（Scalar Parameter）**
    -   **乘法（Multiply）**
    
    将"向量参数（Vector Parameter）"重命名为 **自发光颜色（Emissive Color）**，将"标量参数（Scalar Parameter）"重命名为 **自发光强度（Emissive Strength）**。完成后，你的图表应如下图所示。
    
    ![Emissive parameters in graph](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afd180d8-5971-4bb4-8174-aa1daccaa1ed/fully-emissive-nodes.png)
3.  如下图所示连接节点，并将"乘法（Multiply）"输出连接到 **自发光颜色（Emissive Color）** 输入。在"细节（Details）"面板中选择每个参数并设置默认值。 在下面的示例中，**自发光颜色（Emissive Color）** 设置为红色，**自发光强度（Emissive Strength）** 设置为6。
    
    ![Simple emissive Material](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ff8637c-b9aa-42eb-9750-73ded3d5cea6/simple-emissive-material.png)
4.  单击工具栏中的 **保存（Save）** 以编译材质并保存资产。关闭材质编辑器。
    
    ![Compile and Save Material](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54cece66-b3d7-4a0e-a0b7-34dee6489dd3/compile-save.png)
5.  在内容浏览器（Content Browser）中，**右键单击** EmissiveLightSource材质，然后选择 **创建材质实例（Create Material Instance）**。
    
    ![Create Material Instance](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d967c71-cd48-41e7-8fed-44583bd6f367/create-material-instance.png)
6.  双击 **EmissiveLightSource\_Inst** 资产以在材质实例编辑器中打开该资产。 通过选中参数名称旁边的复选框来启用这两个参数。启用后，即可实时覆盖 **Emissive Color（自发光颜色）** 和 **Emissive Strength（自发光强度）** 值。
    

## 创建带遮罩的自发光材质

此示例说明如何创建材质以使用纹理遮罩定义材质的自发光部分。 由于这种材质只是部分自发光，因此需要使用默认光照着色模型。

本教程采用虚幻引擎初学者内容包中的资产。此处介绍的技术适用于任何纹理，但如果你想重建该示例，请确保在你的项目中包含 **初学者内容包**。 如果在创建项目时没有包含初学者内容包，请阅读[迁移资产](/documentation/zh-cn/unreal-engine/migrating-assets-in-unreal-engine)页面，了解如何将内容迁移到你的当前项目。

1.  创建一个新材质并在材质编辑器中将其打开。 此材质应使用 **默认光照（Default Lit）** 着色模型。
    
    ![Default Lit Shading Model](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc554bf4-2d5d-4e1f-b6c2-f2ec3bcb838a/default-lit-shading-model.png)
2.  将以下材质表达式添加到你的图表中。
    
    -   **向量参数（Vector Parameter）** x 2
    -   **标量参数（Scalar Parameter）** x 2
    -   **纹理样本（Texture Sample）** - T\_Tech\_Panel\_M
    -   **纹理样本（Texture Sample）** - T\_Tech\_Panel\_N
    -   **乘法（Multiply）** x 4
    -   **加法（Add）** x 1
    
    这些参数将用于控制自发光强度和颜色，如前面的示例所示。将两个"向量参数（Vector Parameter）"分别重命名为 **自发光颜色1（Emissive Color 1）** 和 **自发光颜色2（Emissive Color 2）**。 将两个"标量参数（Scalar Parameter）"分别重命名为 **自发光强度1（Emissive Power 1）** 和 **自发光强度2（Emissive Power 2）**。将默认值更改为你选择的颜色和强度。
    
    ![Masked Emissive Material required nodes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ccaffc1-8e88-4525-b8f0-e1d654addf90/masked-emissive-material-nodes.png)
3.  **T\_Tech\_Panel\_M** 纹理在其每个通道中包含四个不同的图像遮罩。 此材质将使用 **红色** 和 **蓝色** 通道在材质上创建两个不同的自发光部分。
    
    ![Emissive Mask textures](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2e348a2-7929-44a3-8b73-53a7a2a1bca3/mask-textures.png)
    
    如下图所示连接节点。 此逻辑之所以有效，是因为纹理遮罩包含纯黑白值。 当颜色参数与纹理遮罩中的值相乘时，遮罩中的任何黑色像素都将输出自发光值 **0**。 只有遮罩的白色部分会自发光，如下面的预览所示。 可以独立更改材质实例中两个自发光区域的颜色和强度。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b51edd2-b4af-4276-aa25-e20706d3f098/masked-emissive-graph.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b51edd2-b4af-4276-aa25-e20706d3f098/masked-emissive-graph.png)
    
    点击图片以查看大图。
    
4.  单击工具栏中的 **保存（Save）** 以编译材质并保存资产。关闭材质编辑器。
    
    ![Compile and Save Material](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0873ae98-6e67-401e-bd67-bd18e08d56e9/compile-save.png)
5.  在内容浏览器（Content Browser）中，**右键单击** **EmissiveMaterialMasked** 资产，然后选择 **创建材质实例（Create Material Instance）**。
    
    ![Create Material Instance](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4000a4d0-2d70-4d52-b772-16b1f0d3425b/create-material-instance-02.png)
6.  双击 **EmissiveMaterialMasked\_Inst** 资产以在材质实例编辑器中打开该资产。 选中所有四个参数旁边的复选框以在材质实例中覆盖这四个参数。 启用后，可以单独控制两个发光区域的外观，包括将 **自发光强度（Emissive Power）** 参数设置为 **0** 以开启或关闭这两个自发光区域。
    

## 创建测试贴图

在其余示例中，下面显示的简单测试贴图用于演示自发光在虚幻环境中的传播方式。

![Emissive demo scene](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36bb3f8e-6d6f-4357-a49a-2c3fe966ec2c/demo-scene-setup.png)

请按照以下步骤创建类似的测试贴图。 此场景中的所有资产均来自虚幻初学者内容包。

1.  按以下方式创建一个新关卡：转到 **文件（File）** > **新建关卡（New Level）**，然后在"新建关卡（New Level）"对话框中选择 **时间（Time of Day）** 选项。
    
    ![Create Time of Day level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4807b7e-65bb-4d82-bdec-990791f0b90e/new-level.png)
    
    还可以通过按键盘上的 **CRTL + N** 来创建新关卡。
    
2.  此处的演示场景是使用下列资产创建的。
    
    -   **Wall\_500x500** - 五个实例排列成一个房间的形状，如下图所示。
    -   **M\_Brick\_Clay\_New** - 应用于所有五个Wall实例的材质。
    -   **Shape\_sphere** - 放置在测试房间中央。
    
    ![Emissive test scene setup](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f66831d7-4c81-4bde-bd9b-2b24a7fdf682/demo-scene-assets.png)
3.  创建完毕后，按键盘上的 **CTRL + S** 保存贴图。
    

## 自发光材质与流明

启用流明全局光照（Lumen Global Illumination）后，自发光材质的光线会自动在场景中传播，不会产生额外的性能成本。 这是一种强大且高度动态的光照方法，但在使用非常小或非常亮的自发光光源时应谨慎，因为这两种光源都会导致噪点瑕疵。

在新建的虚幻引擎5项目中会默认启用流明全局光照。 如果要将较旧的UE4项目转换为UE5，则需要手动启用流明。 要了解如何启用流明，请[点击此处](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)。

下面的视频展示了自发光材质如何在启用流明的场景中投射光照。需要注意自发光光源的大小如何改变光照的表观亮度和衰减距离。

## 自发光材质与静态光照

使用静态光照（Static Lighting）时，自发光材质可以将光投射到关卡中，但默认不启用此功能。 如果在场景中没有其他光照的情况下创建CPU Lightmass版本，则自发光材质的自发光部分为可见状态，但该材质不会照亮其周围的任何对象。

![Emissive with static lighting disabled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/402651b1-18eb-4fee-a253-c63379046904/emissive-static-01.png)

要使此材质将光线投射到场景中，必须在"细节（Details）"面板中启用一项设置。 选择应用该自发光材质的静态网格体。 在此例中为立方体。

在"细节（Details）"面板中搜索"自发光（emissive）"，然后在 **Lightmass设置（Lightmass Settings）** 下选中相应复选框以启用 **将自发光用于静态光照（Use Emissive for Static Lighting）**。

![Use Emissive for Static Lighting](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f60d5c7-bee0-48e4-bc28-25e194286794/use-emissive-for-static.png)

还有一项 **自发光增强（Emissive Boost）** 设置。 如果创建一个Lightmass版本，但自发光太暗，则可以输入一个大于 **1** 的值来增强自发光。 另一种增加亮度的方法是增加材质实例中的 **自发光强度（Emissive Power）** 参数。

下面的幻灯片显示了当"将自发光用于静态光照（Use Emissive for Static Lighting）"选项开启并增加到2时，静态光照如何变化。

  ![(1)"将自发光用于静态光照（Use Emissive for Static Lighting）"选项关闭，(2)"将自发光用于静态光照（Use Emissive for Static Lighting）"选项启用，(3)"Emissive Boost（自发光增强）"设置为2。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78aae097-c635-491b-8e92-7ea7a69a1988/emissive-static-01.png) ![(1)"将自发光用于静态光照（Use Emissive for Static Lighting）"选项关闭，(2)"将自发光用于静态光照（Use Emissive for Static Lighting）"选项启用，(3)"Emissive Boost（自发光增强）"设置为2。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aef313ad-2620-4770-a55c-5e6c024a5f54/emissive-static-02.png) ![(1)"将自发光用于静态光照（Use Emissive for Static Lighting）"选项关闭，(2)"将自发光用于静态光照（Use Emissive for Static Lighting）"选项启用，(3)"Emissive Boost（自发光增强）"设置为2。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2d11e93-d8c9-44d4-8e6c-450a4090e09a/emissive-static-03.png)

(1)"将自发光用于静态光照（Use Emissive for Static Lighting）"选项关闭，(2)"将自发光用于静态光照（Use Emissive for Static Lighting）"选项启用，(3)"Emissive Boost（自发光增强）"设置为2。

### 自发光和GPU Lightmass

使用GPU Lightmass来烘焙光照时，不需要使用 **将自发光用于静态光照（Use Emissive for Static Lighting）** 设置。 自发光材质的光线会自动传播到GPU Lightmass结果中。 如果需要在GPU Lightmass烘焙中增加或减少自发光的亮度，可以修改材质或材质实例中的亮度值。

## 自发光影响和泛光

增加自发光材质的亮度时，从材质自发光部分生成的后期处理泛光（Bloom）效果也将变得越来越亮。 有时可能希望增加材质中的自发光值，但不希望图像中的泛光效果过强。

为此，可在 **后期处理体积（Post Process Volume）** 中控制泛光效果不受自发光强度影响。这样便可以在提高或降低自发光亮度时将泛光效果保持在合理程度。

![Post Process Bloom settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9bd15bdf-5c40-4f14-add5-bb2e071cd63c/bloom-settings.png)

如果将自发光值设置得很高以便让自发光材质将更多静态光投射到世界中，调整此值将有助于进行补偿。

在下面的视频中，其中一个"自发光强度（Emissive Power）"值增加到100，泛光效果变得强烈。 一种补偿方法是选择"后期处理体积（Post Process Volume）"，搜索"泛光（bloom）"，减小该值，从而获得视觉上更友好的结果。 另一种方法是将"Bloom（泛光）"设置更改为 **卷积（Convolution）** 以模拟摄像机的星爆效果。

## 间接光照的多次反弹

启用 **将自发光用于静态光照（Use Emissive for Static Lighting）** 后，可以使用间接光照的多次反弹进行平滑并改善光照效果。 在 **世界设置（World Settings）\* 面板中，展开** Lightmass设置（Lightmass Settings） **并提高** 天空光照反弹次数（Num Sky Lighting Bounces nces）@@@\*\* 的值。

![Lightmass Sky Lighting Bounces](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74f8a2e6-fa3f-4385-a17b-a8847d4bf9f5/sky-lighting-bounces.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36b738ee-ebe5-4a10-8080-21f02d863112/emissivemultibounce.png)

此场景示例中的自发光静态光照提供间接光照的多次反弹。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)
-   [material inputs](https://dev.epicgames.com/community/search?query=material%20inputs)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [自发光光照](/documentation/zh-cn/unreal-engine/using-the-emissive-material-input-in-unreal-engine#%E8%87%AA%E5%8F%91%E5%85%89%E5%85%89%E7%85%A7)
-   [光照和无光照自发光材质](/documentation/zh-cn/unreal-engine/using-the-emissive-material-input-in-unreal-engine#%E5%85%89%E7%85%A7%E5%92%8C%E6%97%A0%E5%85%89%E7%85%A7%E8%87%AA%E5%8F%91%E5%85%89%E6%9D%90%E8%B4%A8)
-   [创建完全自发光材质](/documentation/zh-cn/unreal-engine/using-the-emissive-material-input-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%AE%8C%E5%85%A8%E8%87%AA%E5%8F%91%E5%85%89%E6%9D%90%E8%B4%A8)
-   [创建带遮罩的自发光材质](/documentation/zh-cn/unreal-engine/using-the-emissive-material-input-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%B8%A6%E9%81%AE%E7%BD%A9%E7%9A%84%E8%87%AA%E5%8F%91%E5%85%89%E6%9D%90%E8%B4%A8)
-   [创建测试贴图](/documentation/zh-cn/unreal-engine/using-the-emissive-material-input-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%B5%8B%E8%AF%95%E8%B4%B4%E5%9B%BE)
-   [自发光材质与流明](/documentation/zh-cn/unreal-engine/using-the-emissive-material-input-in-unreal-engine#%E8%87%AA%E5%8F%91%E5%85%89%E6%9D%90%E8%B4%A8%E4%B8%8E%E6%B5%81%E6%98%8E)
-   [自发光材质与静态光照](/documentation/zh-cn/unreal-engine/using-the-emissive-material-input-in-unreal-engine#%E8%87%AA%E5%8F%91%E5%85%89%E6%9D%90%E8%B4%A8%E4%B8%8E%E9%9D%99%E6%80%81%E5%85%89%E7%85%A7)
-   [自发光和GPU Lightmass](/documentation/zh-cn/unreal-engine/using-the-emissive-material-input-in-unreal-engine#%E8%87%AA%E5%8F%91%E5%85%89%E5%92%8Cgpulightmass)
-   [自发光影响和泛光](/documentation/zh-cn/unreal-engine/using-the-emissive-material-input-in-unreal-engine#%E8%87%AA%E5%8F%91%E5%85%89%E5%BD%B1%E5%93%8D%E5%92%8C%E6%B3%9B%E5%85%89)
-   [间接光照的多次反弹](/documentation/zh-cn/unreal-engine/using-the-emissive-material-input-in-unreal-engine#%E9%97%B4%E6%8E%A5%E5%85%89%E7%85%A7%E7%9A%84%E5%A4%9A%E6%AC%A1%E5%8F%8D%E5%BC%B9)

相关文档

[

材质输入

![材质输入](https://dev.epicgames.com/community/api/documentation/image/e597ee6d-9089-48c5-948f-900cae75b677?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/material-inputs-in-unreal-engine)

[

着色模型

![着色模型](https://dev.epicgames.com/community/api/documentation/image/972751d5-8218-451b-b730-56ea4eb81097?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/shading-models-in-unreal-engine)

[

泛光

![泛光](https://dev.epicgames.com/community/api/documentation/image/8554892a-9d2c-4595-a737-4deddcc6a4a3?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/bloom-in-unreal-engine)
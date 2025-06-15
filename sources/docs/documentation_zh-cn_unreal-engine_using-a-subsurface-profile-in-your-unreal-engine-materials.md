# 在虚幻引擎材质中使用次表面轮廓 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-a-subsurface-profile-in-your-unreal-engine-materials
> 
> 生成时间: 2025-06-14T19:29:16.385Z

---

目录

![在材质中使用次表面轮廓](https://dev.epicgames.com/community/api/documentation/image/8b9fdce6-a649-47f4-9db3-71b9bf206d67?resizing_type=fill&width=1920&height=335)

渲染逼真人体皮肤的能力，对于任何现代电子游戏引擎来说都不可或缺。为了满足此需求，虚幻引擎现在提供了一种专门用于皮肤或蜡状表面的明暗处理方法，称为 **次表面轮廓**。 次表面轮廓明暗处理模型有与 **次表面** 明暗处理模型类似的属性，其关键区别在于渲染方式有所不同。 次表面轮廓使用基于屏幕空间的渲染方法，因为这有助于更好地显示人体皮肤上的微妙次表面效果，而反向散射是仅在少数情况（例如，耳朵）下才会出现的次级效果。 以下文档将阐述什么是次表面轮廓以及如何在工作中使用它们。

## 使材质能够使用次表面轮廓

你可通过下列步骤使材质能够使用次表面轮廓。

1.  首先，在 **内容浏览器** 中 **右键单击**，然后从 **创建基本资源（Create Basic Asset）** 列表中选择"材质（Material）"，创建新材质。 创建之后，务必对该材质进行命名。在本例中，该材质将命名为 **M\_Subsurface\_Profile**。 完成后，你的 **内容浏览器** 应该如下所示。
    
    ![Create a new Material](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bc8b7fa-95ca-45f5-9e82-88561e06205a/create-new-material.png)
2.  在 **内容浏览器（Content Browser）** 中 **双击** 该材质，在"材质编辑器（Material Editor）"中打开该材质。
    
3.  现在打开材质后，我们需要在"细节（Details）"面板中将材质的 **着色模型（Shading Model）** 从 **默认光照（Default Lit）** 更改为 **次表面轮廓（Subsurface Profile）**。
    
    ![Enable Subsurface Profile Shading Model](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b621627-1ede-4918-a06b-14468f3217f5/enable-subsurface-profile.png)
4.  现在，你可以通过在 **细节（Details）** 面板的 **次表面轮廓（Subsurface Profile）** 部分中输入，指定一个 **次表面轮廓**。
    
    ![Assign a Subsurface Profile](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fac31425-24ce-4eac-bf98-cdbd23e907d1/select-subsurface-profile.png)
5.  现在，此材质已准备好与次表面轮廓配合使用。
    

## 创建次表面轮廓

以下是创建次表面轮廓的步骤。

1.  首先在 **内容浏览器（Content Browser）** 中 **单击右键**，打开 **材质（Materials）** 上下文菜单，然后选择 **次表面轮廓（Subsurface Profile）** 选项。
    
    ![Create subsurface profile](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b11b3b9b-509f-436a-9eb4-6dd4dd61eaff/create-subsurface-profile.png)
2.  选择并创建次表面轮廓之后，可以对其进行命名。 在此示例中，我们将这个次表面轮廓命名为 **SSP\_00**。 完成后，结果如下图所示。
    
    ![Subsurface Profile Asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d731099-c588-41c5-8803-66ab8527711f/ssp-asset.png)

## 创建使用次表面轮廓的材质

材质和次表面轮廓现已创建完毕，你可以开始在其中填充数据。 在下列步骤中，我们将创建可以使用次表面轮廓的材质和材质实例。

1.  在"材质编辑器（Material Editor）"中打开 **M\_Subsurface\_Profile** 材质（如果尚未打开）。
    
2.  打开材质后，可以布置一些材质表达式节点。在本教程中，我们将使用下列节点。
    
    -   **矢量参数（Vector Parameter）** x 1
    -   **标量参数（Scalar Parameter）** x 2
    
    ![Required Nodes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d022431d-a2c2-4935-a5e6-d105c0bb3e56/required-nodes.png)
3.  现在我们已将材质表达式参数节点添加到图表中，接下来需要为它们命名并填写其默认值。在本例中，我们将为节点提供以下名称和默认值。

属性名称

值

**BaseColor**

R：1.0 G：1.0 B：1.0

**Roughness**

0.35

**SubsurfaceAmount**

0.5

将每个节点连接到主材质节点（Main Material Node）上的相应输入。 填写完所有内容后，着色器图应如下所示。

![Parameter Default Values](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8cf058a8-a647-4f88-bdf7-34f940cbfadc/parameter-default-values.png)

1.  现在一切准备就绪，接下来可为材质添加次表面轮廓。 为此，请先在 **细节（Details）** 面板的 **材质（Material）** 分段中找到 **次表面轮廓（Subsurface Profile）** 输入。 使用下拉菜单选择之前创建的 **SSP\_00** 资产，或从"内容浏览器（Content Browser）"直接将该资产拖到输入上。
    
    ![Select Subsurface Profile](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae16a8d9-fd88-462e-a93d-636acb6f13c3/apply-subsurface-profile.png)
    
    如果你未提供次表面轮廓，那么系统将会使用默认的次表面轮廓。使用的默认次表面轮廓是白种人皮肤的近似表示。
    
2.  次表面轮廓已应用，材质表达式已链接至主材质节点，你现在可以编译着色器并准备好根据此材质建立材质实例。 完成材质后，它应该如下所示。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/824c2d56-6657-46af-a90a-935dc8eea80b/ssp-material-graph.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/824c2d56-6657-46af-a90a-935dc8eea80b/ssp-material-graph.png)
    

## 在材质实例中使用次表面轮廓

1.  材质现已创建并通过编译，你现在可以建立一些材质实例，以便更快地微调参数。 要根据材质来建立材质实例，请先在 **内容浏览器** 中找到该材质，然后 **右键单击** 该材质并选择 **创建材质实例（Create Material Instance）** 选项。 完成后，你的 **内容浏览器** 应该如下所示。
    
    ![Create Material Instance](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22e09c4c-55e4-4545-8f4a-ee82cf3dcaf4/create-material-instance.png)
2.  材质实例现已创建完毕，请在 **内容浏览器** 中使用 **鼠标左键** **双击** 将其打开。打开后，你应该会看到类似下图的内容。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbf9d6dd-84b1-41c8-8943-8c5c419b05c7/ssp-material-instance-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbf9d6dd-84b1-41c8-8943-8c5c419b05c7/ssp-material-instance-editor.png)
    
3.  要更改材质实例中的次表面轮廓，可通过选中相应复选框来启用 **次表面轮廓（Subsurface Profile）** 覆盖，然后使用下拉菜单选择其他次表面轮廓资产。单击输入后，应该会看到可供选择的次表面轮廓。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32329d0b-4ad1-4c89-9d09-42608784e20c/override-ssp-material-instance-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32329d0b-4ad1-4c89-9d09-42608784e20c/override-ssp-material-instance-editor.png)
    
    如果已在父材质中提供了次表面轮廓，无需在材质实例中覆盖该次表面轮廓。仅当需要使用的次表面轮廓与已在使用的次表面轮廓不同时，才需要进行覆盖。
    

## 应用次表面轮廓材质

1.  材质实例现已创建完毕，我们可以开始测试新材质。为此，我们首先需要创建新的空白关卡以便在其中工作，方法如下：打开主菜单，然后从 **文件（File）** 选项中选择 **新建关卡（New Level）**。当系统提示选择关卡类型时，请选择 **空白关卡（Empty Level）**。
    
    ![Create empty level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b095add7-5233-4745-a721-a2563718a737/empty-level.png)
2.  为了测试材质，我们将使用来自"初学者内容包（Starter Content）"的静态网格体，从前面用 **点光源（Point Light）** 照亮，从后面用非常亮的 **聚光源（Spot Light）** 照亮。 这种强烈的背光将有助于展示次表面轮廓材质如何透射和散射光线。 光照配置应如下图所示。
    
    ![Lighting Configuration](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4957e367-335e-4976-a561-e4dcec3a4d00/lighting-configuration.png)
3.  在"内容浏览器（Content Browser）"中的 **StarterContent** > **Props** 下找到 **SM\_Statue** 资产，并将其添加到你的关卡中。 我们示例中的位置和旋转设置如下所示。
    
    属性名称
    
    值
    
    位置（Location）：
    
    X：0，Y：0，Z：0
    
    旋转（Rotation）：
    
    X：0，Y：0，Z：-23
    
4.  打开 **放置Actor（Place Actors）** 菜单，然后将一个 **点光源（Point Light）** 和一个 **聚光源（Spot Light）** 添加到你的关卡中。
    
    ![Add lights to level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3de0fa3-d984-48d8-843e-d7a928d8c90d/add-point-and-spot.png)
5.  选择点光源，然后在"细节（Details）"面板中为其配置以下设置。
    
    属性名称
    
    值
    
    位置（Location）：
    
    X：380，Y：0，Z：80
    
    强度（Intensity）：
    
    8.0 cd
    
    ![Point Light Details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1aea3ca4-534c-40ca-af28-a570857ef665/point-light-details.png)
6.  选择聚光源，然后在"细节（Details）"面板中为其配置以下设置。
    
    属性名称
    
    值
    
    位置（Location）：
    
    X：-650，Y：100，Z：-75
    
    旋转（Rotation）：
    
    X：0，Y：20，Z：0
    
    强度（Intensity）：
    
    1500 cd
    
    ![Spot Light Details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/244359bf-c375-4f9e-b0fe-33a87324dfdc/spot-light-details.png)
7.  将 **M\_Subsurface\_Profile\_Inst** 材质实例应用于雕像（Statue），方法是将该实例从"内容浏览器（Content Browser）"拖到关卡中的静态网格体上，或拖到"细节（Details）"面板中雕像的两个材质元素上， 确保将其拖到雕塑的两个部分上。
    
    ![Statue details panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b797596a-1e16-47f3-9052-acc397aa9827/apply-material-to-statue.png)
8.  次表面轮廓的效果在高光的边缘上最为明显，聚光源在此处落入阴影中。 沿着这个轮廓，可看到有粉红色的次表面颜色进入，与雕像的薰衣草基础颜色和强烈的白色高光形成鲜明对比。
    

## 调整次表面轮廓

1.  将材质实例应用于雕像后，可调整次表面轮廓设置。为此，请双击"内容浏览器（Content Browser）"中的 **SSP\_00** 资产以打开次表面轮廓。 应该会看到如下所示的内容。
    
    ![Subsurface Profile editor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ac89b63-d33c-4b62-a0ad-b0ea2112b245/subsurface-profile-editor.png)
    
    可通过在编辑器中更改值或颜色来调整 **次表面轮廓** 的属性。
    
    -   **表面反射率（Surface Albedo）**：应尽可能与相应父材质的基础颜色匹配。
        
    -   **平均自由路径颜色（Mean Free Path Color）**：控制红色、绿色和蓝色通道的光线穿透表面的距离，并确定光线散射在表面下方的区域的颜色。 较亮的值允许更多的透射，黑色相当于关闭次表面散射。
        
    -   **平均自由路径距离（Mean Free Path Distance）**：以世界/虚幻单位（cm）为单位的距离，用于缩放光线穿透表面的距离。减小此值会使次表面区域更紧密/更锐利，增加此值会使次表面区域更大更模糊。
        
2.  请记住，你可以实时调整次表面轮廓的参数，如下所示。
    

## 提示与技巧

次表面轮廓的渲染方式决定了你需要了解一些提示与技巧，才能充分地加以利用。

### 散射半径

将次表面轮廓的 **平均自由路径距离（Mean Free Path Distance）** 设置为非常大的数字将导致渲染错误，如下图所示。

![Scatter Radius example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a0a9504-7819-43f2-bbdb-cd81fdec78b3/ssp_big_small_scatter_radius.png)

在左侧图像中，"平均自由路径距离（Mean Free Path Distance）"设置为50。 请注意，这看起来就像是在表面渲染了多幅图像一样。 现在看看右侧的图像。在此图像中，"平均自由路径距离（Mean Free Path Distance）"设置为5.0。 请注意，图像看上去更加柔和更加自然。这就是我们尝试实现的效果类型。

### 将材质实例与次表面轮廓相结合

将材质实例与次表面轮廓结合使用是一种相当不错的方法，这样就可以 对结果进行最大程度的控制，其原因如下。

-   材质实例允许你实时地调整值，这样就可以更迅速地看到结果。
-   你可使用 **不透明（Opacity）** 输入来限制次表面对表面的影响。但是，建议你保持此值设置为1，并在次表面轮廓内调整参数。仅当你发现单单调整次表面轮廓无法实现所需的结果时，才应调整此值。
-   每个取色器的 **值（Value）** 滑块都控制次表面效果的影响范围。这个值设置得越接近白色，效果越显著。这个值设置得越接近黑色，效果就越不明显。

-   [materials](https://dev.epicgames.com/community/search?query=materials)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使材质能够使用次表面轮廓](/documentation/zh-cn/unreal-engine/using-a-subsurface-profile-in-your-unreal-engine-materials#%E4%BD%BF%E6%9D%90%E8%B4%A8%E8%83%BD%E5%A4%9F%E4%BD%BF%E7%94%A8%E6%AC%A1%E8%A1%A8%E9%9D%A2%E8%BD%AE%E5%BB%93)
-   [创建次表面轮廓](/documentation/zh-cn/unreal-engine/using-a-subsurface-profile-in-your-unreal-engine-materials#%E5%88%9B%E5%BB%BA%E6%AC%A1%E8%A1%A8%E9%9D%A2%E8%BD%AE%E5%BB%93)
-   [创建使用次表面轮廓的材质](/documentation/zh-cn/unreal-engine/using-a-subsurface-profile-in-your-unreal-engine-materials#%E5%88%9B%E5%BB%BA%E4%BD%BF%E7%94%A8%E6%AC%A1%E8%A1%A8%E9%9D%A2%E8%BD%AE%E5%BB%93%E7%9A%84%E6%9D%90%E8%B4%A8)
-   [在材质实例中使用次表面轮廓](/documentation/zh-cn/unreal-engine/using-a-subsurface-profile-in-your-unreal-engine-materials#%E5%9C%A8%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%AC%A1%E8%A1%A8%E9%9D%A2%E8%BD%AE%E5%BB%93)
-   [应用次表面轮廓材质](/documentation/zh-cn/unreal-engine/using-a-subsurface-profile-in-your-unreal-engine-materials#%E5%BA%94%E7%94%A8%E6%AC%A1%E8%A1%A8%E9%9D%A2%E8%BD%AE%E5%BB%93%E6%9D%90%E8%B4%A8)
-   [调整次表面轮廓](/documentation/zh-cn/unreal-engine/using-a-subsurface-profile-in-your-unreal-engine-materials#%E8%B0%83%E6%95%B4%E6%AC%A1%E8%A1%A8%E9%9D%A2%E8%BD%AE%E5%BB%93)
-   [提示与技巧](/documentation/zh-cn/unreal-engine/using-a-subsurface-profile-in-your-unreal-engine-materials#%E6%8F%90%E7%A4%BA%E4%B8%8E%E6%8A%80%E5%B7%A7)
-   [散射半径](/documentation/zh-cn/unreal-engine/using-a-subsurface-profile-in-your-unreal-engine-materials#%E6%95%A3%E5%B0%84%E5%8D%8A%E5%BE%84)
-   [将材质实例与次表面轮廓相结合](/documentation/zh-cn/unreal-engine/using-a-subsurface-profile-in-your-unreal-engine-materials#%E5%B0%86%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B%E4%B8%8E%E6%AC%A1%E8%A1%A8%E9%9D%A2%E8%BD%AE%E5%BB%93%E7%9B%B8%E7%BB%93%E5%90%88)

相关文档

[

次表面轮廓明暗处理模型

![次表面轮廓明暗处理模型](https://dev.epicgames.com/community/api/documentation/image/28199f0e-22f6-4948-9218-baf0d72df6d0?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/subsurface-profile-shading-model-in-unreal-engine)

[

次表面着色模型

![次表面着色模型](https://dev.epicgames.com/community/api/documentation/image/5eb50231-cddc-4cc1-bf4f-4ae5b9f2b222?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/subsurface-shading-model-in-unreal-engine)
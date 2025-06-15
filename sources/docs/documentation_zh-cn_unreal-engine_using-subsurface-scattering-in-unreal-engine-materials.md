# 在虚幻引擎材质中使用次表面散射 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-subsurface-scattering-in-unreal-engine-materials
> 
> 生成时间: 2025-06-14T19:29:21.842Z

---

目录

![在材质中使用次表面散射](https://dev.epicgames.com/community/api/documentation/image/8d24c742-aa43-4f12-940f-823cc6530da7?resizing_type=fill&width=1920&height=335)

"次表面散射"术语用来描述光线穿过透明/半透明表面时发生散射的照明现象。

虚幻引擎（UE）提供了称为[次表面](/documentation/zh-cn/unreal-engine/subsurface-shading-model-in-unreal-engine)的特殊[着色模型](/documentation/zh-cn/unreal-engine/shading-models-in-unreal-engine)，专门用于需要此类互动的材质，例如皮肤或蜡状物。

以下教程将阐述在材质中使用次表面散射所需了解的所有内容。

## 启用次表面着色模型

使材质能够使用次表面着色模型的步骤如下所示。

1.  首先，通过在 **内容浏览器** 中 **右键单击**，然后从 **创建基本资源（Create Basic Asset）**列表中选择"材质"（Material），创建新材质。给材质一个描述性的名称，如 **M\_Subsurface\_Scattering**。 完成后，你的 **内容浏览器** 应该如下所示。
    
    ![Create Material asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e40da122-2048-4b80-872f-1b4c2a227657/create-new-material.png)
2.  在内容浏览器中 **双击** 资产，将材质打开。
3.  在材质编辑器的细节面板中，将其 **着色模型（Shading Model）**从 **默认点亮（Default Lit）**更改为 **次表面（Subsurface）**。
    
    ![Enable Subsurface Shading Model](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0382cf82-48ce-4783-8e85-bb6bb23268ab/subsurface-shading-model.png)
4.  此材质现在已可用作次表面材质。

## 设置次表面材质

继续使用上文中启用了次表面散射的材质，让我们设置一个基本材质，以便查看关卡内作用中的次表面散射。

1.  我们需要布置一些材质表达式节点，以便有一些可处理的内容。 在本示例中，我们将添加下列节点。
    
    -   **矢量参数（Vector Parameter）**x 2
    -   **标量参数（Scalar Parameter）**x 2
    
    ![Required nodes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ddc5369-80bd-4a3b-988a-cf410bed1a28/required-nodes.png)
    
    我们使用参数材质节点而非一般材质节点的原因是，这样可以根据此材质来建立材质实例，从而方便在编辑器内进行微调。
    
2.  在开始连接节点之前，我们首先需要对其命名，并为其设置默认值。这些节点的名称及默认值如下所示。
    
    ![Node setup](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c57bd14-36a9-46ef-9a8d-df7899c28b8c/node-setup.png)
    
    属性名称
    
    值
    
    **Base\_Color**
    
    r:1.0, g:1.0, b:1.0
    
    **Roughness**
    
    0.35
    
    **Opacity**
    
    0.5
    
    **Subsurface\_Color**
    
    r:1.0, b:0, g:0
    
3.  将所有4个参数表达式重命名并设置其默认值，然后将它们连接到对应主材质节点上对应的输入，如上所示。
    
4.  将所有节点连接完毕后，请务必按 **应用（Apply）**按钮以编译材质，并将其 **保存（Save）**。编译完成后，结果如下图所示。
    
    ![Save Material Asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f6171c2-7577-4980-a1ab-10fb25257d79/save-and-apply.png)
5.  编译材质完成后，你可以关闭材质编辑器窗口。接着，在 **内容浏览器** 内，选中该材质，**右键单击**，然后从菜单中选择 **创建材质实例（Create Material Instance）**选项。
    
    ![Create Material Instance](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f41e0684-0f7e-414c-a299-92dc4c1a1be2/create-material-instance.png)

## 测试次表面材质

材质实例创建完毕后，你就在关卡中测试材质了。

1.  为此，你首先需要创建新的空白关卡以便在其中工作，具体方法是：打开主菜单，然后从 **文件（File）**选项中选择 **新建关卡（New Level）**。当系统提示你选择关卡类型时，请选择 **空关卡（Empty Level）**。
    
    ![Create Empty Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/730e740b-eefc-4fdb-bd09-e3fcd25e9704/new-level-dialog.png)
2.  为了测试材质，我们要使用初学者内容包中的静态网格体，在其前方使用 **点光源（Point Light）**照明，并在其后方使用一个非常明亮的 **聚光源（Spot Light）**。这种强烈的逆光有助于展示次表面材质如何传播和散射光线。光照配置应该如下图所示。
    
    ![Lighting Configuration](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36ea0ddb-2f23-4cff-a6ea-64432d0682b3/lighting-configuration.png)
3.  在内容浏览器的 **StarterContent** > **Props** 中找到 **SM\_Statue** 资产，将其添加到关卡。本示例中的位置和旋转设置如下所示：
    
    属性名称
    
    值
    
    位置（Location）：
    
    X:0, Y: 0, Z:0
    
    位置（Location）：
    
    X:0, Y: 0, Z:-23
    
4.  将 **M\_Subsurface\_Scatterin\_Inst** 材质实例从内容浏览器拖动到关卡中的静态网格体上，将材质实例应用到雕像。或将其拖动到细节面板中雕像的两个材质元素（Material Elements）上。
    
    ![Statue details panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a757d7ee-ac3d-44ba-b796-545f37ce6540/sm-statue-setup.png)
5.  打开 **放置Actor（Place Actors）** 菜单，将一个 **点光源（Point Light）** 和一个 **聚光源（Spot Light）** 添加到关卡。
    
    ![Add lights to level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b73ea8b0-18f3-4d9b-b176-0e90a9dc2646/add-point-and-spot.png)
6.  选中点光源，在细节面板中配置设置如下：
    
    属性名称
    
    值
    
    位置（Location）：
    
    X:380, Y: 0, Z:80
    
    强度（Intensity）：
    
    8.0 cd
    
    ![Point Light Details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c18b797-966b-4a6c-93dc-984ed2ec674a/point-light-details.png)
7.  选中聚光源，在细节面板中配置设置如下：
    
    属性名称
    
    值
    
    位置（Location）：
    
    X:-650, Y: 100, Z:-75
    
    旋转（Rotation）：
    
    X:0, Y:20, Z:0
    
    强度（Intensity）：
    
    1500 cd
    
    ![Spot Light Details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a6c8ff7-ca26-41e8-b214-0da70ce1041b/spot-light-details.png)

## 使用次表面材质

次表面材质现已应用完毕，你可以开始调整材质实例的设置。

在下列各节中，我们将回顾如何控制次表面材质的外观，以及如何调整材质实例中的各种选项以获得我们所需的结果。

### "不透明"（Opacity）控制

在次表面材质的当前设置中，"不透明"（Opacity）输入控制着我们要让对象散射的光线量。

设置 0 将允许所有光线散射，而设置 1 不允许任何光线散射。 以下示例显示了被雕像散射的光线，其中，左图的"不透明"（Opacity）值设置为 0，而右图设置为0.35、0.65和1.0。 请注意，随着数值从 0 增大到 1，我们可以看到穿过对象的光线量变得越来越少。

![Subsurface Opacity comparison](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46a6fabe-402d-4c2e-bd16-dfeeaeb21bab/sss-opacity-comparison.png)

虽然"不透明"（Opacity）确实有助于消除大量散射光，但是你可能会注意到，仍存在一些次表面散射。要完全消除该效果，你还必须调整"次表面颜色"（Subsurface Color）的 **值（Value）**（下面的"次表面颜色值"一节提供了这方面的更多信息。）

### 次表面颜色值

虽然你可通过"不透明"（Opacity）输入来调整次表面散射量，但也可以使用 **取色器** 中的 **值（Value）**滑块进行此调整。

例如，将"不透明"（Opacity）设置为值 1.0 并将"次表面颜色值"（Subsurface Colors Value）从白色调整为黑色将有效地关闭次表面散射，如以下示例所示。

  ![次表面颜色值为0、0.5和1.0。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c29c0014-4ad3-4cc9-bfff-ac641bb362ba/subsurface-value-01.png) ![次表面颜色值为0、0.5和1.0。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6da7c5ff-1113-4dc6-b33b-66d26e280d5d/subsurface-value-02.png) ![次表面颜色值为0、0.5和1.0。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/040c51e2-4a12-44f2-9746-ed69681b8575/subsurface-value-03.png)

**次表面颜色值为0、0.5和1.0。**

以下是以实时方式调整值的示例。请注意，随着颜色值从红色调整为黑色，次表面散射影响量也会受影响。

## 使用纹理作为次表面影响蒙版

你可使用纹理作为蒙版，以进一步控制接收或不接收次表面散射的区域。 为此，你只需将所要使用的纹理作为蒙版连接到材质的 **不透明（Opacity）**通道。 在以下示例中，我们不仅使用蒙版纹理，还使用标量值来控制蒙版强度，以便进一步控制所发生的次表面散射量。

![Masked Subsurface graph](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eda0e780-5e0b-4e50-8f1c-a6ab2362a711/subsurface-masked-graph.png)

蒙版纹理根据从黑色到白色的值来工作。接近黑色的值将允许次表面效果穿透，而接近白色的值不允许次表面效果穿透。

下图为使用蒙版纹理时以上材质在关卡中的显示效果。 请注意立方体上的黑色斑点。 这些黑色斑点是在蒙版纹理中使用纯白色值的结果。

![Masked Subsurface example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/302d6a91-f582-428e-be42-a85f0320181d/masked-subsurface-scattering.png)

-   [materials](https://dev.epicgames.com/community/search?query=materials)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用次表面着色模型](/documentation/zh-cn/unreal-engine/using-subsurface-scattering-in-unreal-engine-materials#%E5%90%AF%E7%94%A8%E6%AC%A1%E8%A1%A8%E9%9D%A2%E7%9D%80%E8%89%B2%E6%A8%A1%E5%9E%8B)
-   [设置次表面材质](/documentation/zh-cn/unreal-engine/using-subsurface-scattering-in-unreal-engine-materials#%E8%AE%BE%E7%BD%AE%E6%AC%A1%E8%A1%A8%E9%9D%A2%E6%9D%90%E8%B4%A8)
-   [测试次表面材质](/documentation/zh-cn/unreal-engine/using-subsurface-scattering-in-unreal-engine-materials#%E6%B5%8B%E8%AF%95%E6%AC%A1%E8%A1%A8%E9%9D%A2%E6%9D%90%E8%B4%A8)
-   [使用次表面材质](/documentation/zh-cn/unreal-engine/using-subsurface-scattering-in-unreal-engine-materials#%E4%BD%BF%E7%94%A8%E6%AC%A1%E8%A1%A8%E9%9D%A2%E6%9D%90%E8%B4%A8)
-   ["不透明"（Opacity）控制](/documentation/zh-cn/unreal-engine/using-subsurface-scattering-in-unreal-engine-materials#%22%E4%B8%8D%E9%80%8F%E6%98%8E%22%EF%BC%88opacity%EF%BC%89%E6%8E%A7%E5%88%B6)
-   [次表面颜色值](/documentation/zh-cn/unreal-engine/using-subsurface-scattering-in-unreal-engine-materials#%E6%AC%A1%E8%A1%A8%E9%9D%A2%E9%A2%9C%E8%89%B2%E5%80%BC)
-   [使用纹理作为次表面影响蒙版](/documentation/zh-cn/unreal-engine/using-subsurface-scattering-in-unreal-engine-materials#%E4%BD%BF%E7%94%A8%E7%BA%B9%E7%90%86%E4%BD%9C%E4%B8%BA%E6%AC%A1%E8%A1%A8%E9%9D%A2%E5%BD%B1%E5%93%8D%E8%92%99%E7%89%88)

相关文档

[

次表面轮廓明暗处理模型

![次表面轮廓明暗处理模型](https://dev.epicgames.com/community/api/documentation/image/28199f0e-22f6-4948-9218-baf0d72df6d0?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/subsurface-profile-shading-model-in-unreal-engine)

[

次表面着色模型

![次表面着色模型](https://dev.epicgames.com/community/api/documentation/image/5eb50231-cddc-4cc1-bf4f-4ae5b9f2b222?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/subsurface-shading-model-in-unreal-engine)

[

内容示例

![内容示例](https://dev.epicgames.com/community/api/documentation/image/87759153-fcb5-4532-8861-ff747c395c30?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/content-examples-sample-project-for-unreal-engine)
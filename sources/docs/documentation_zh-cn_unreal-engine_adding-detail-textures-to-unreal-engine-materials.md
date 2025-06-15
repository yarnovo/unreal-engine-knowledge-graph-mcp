# 在虚幻引擎材质中添加细节纹理 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/adding-detail-textures-to-unreal-engine-materials
> 
> 生成时间: 2025-06-14T19:28:54.206Z

---

目录

![添加细节纹理](https://dev.epicgames.com/community/api/documentation/image/f4da5c24-a0ea-4372-a568-1854ef6d9195?resizing_type=fill&width=1920&height=335)

近距离观看材质时，你会发现材质纹理会出现分解和像素化的现象。为了优化性能，纹理通常会缩放其分辨率，让它在中等距离外看起来还不错，但可能经不住细看。

要解决此问题，你可以使用所谓的 **细节纹理（detail texture）** 来防止材质在细看时出现像素化瑕疵。

## 细节纹理化

**细节纹理化（Detail texturing）** 技术在对象的原始漫反射和法线纹理上叠加高度重复的漫反射和法线纹理，从而产生纹理包含更多细节的视觉效果。 此技术可以改善材质的近距离外观，让人感觉细节级别有所提高。

此处有一个实际使用细节纹理技术的示例。

![Brick Material with and without detail texture](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9b681b2-8837-4979-b093-905283ac61e8/dt_with_without.png)

在左侧（标签1），材质使用一个细节纹理为表面添加了额外的高频细节。在右侧（标签2），材质未使用细节纹理。请注意，左侧的图像比右侧的图像看起来更清晰、包含更多细节。

## 细节纹理化节点明细

如果在 **控制板** 或上下文菜单中搜索"细节纹理（detail texturing）"，则会找到 **细节纹理（Detail Texturing）** 材质函数。虽然这不是可以将细节纹理应用于材质的唯一方法，但从工作流程的视角来看，这种方法是最快的，因为所有逻辑都包含在[材质函数](/documentation/zh-cn/unreal-engine/material-functions-in-unreal-engine)中。只需提供纹理输入即可。

![Detail Texturing Material Function node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/516741a9-2e8a-42ce-8691-2698469801ea/detail-texturing-material-function.png)

属性

说明

**缩放（Scale(S)）**

设置细节纹理的缩放。数值越大，产生的平铺就越多；数值越小，产生的平铺就越少。

**漫射（Diffuse(V3)）**

这是漫射纹理的输入。

**细节漫射（DetailDiffuse(T2d)）**

这是漫射细节纹理的输入。此输入只能接受纹理对象。

**漫射强度（DiffuseIntensity(S)）**

控制细节漫射纹理的强度。

**法线（Normal(V3)）**

这是法线贴图纹理的输入。

**细节法线（DetailNormal(T2D)）**

这是法线贴图细节纹理的输入。此输入只能接受纹理对象。

**法线强度（NormalIntensity(S)）**

控制细节法线贴图纹理的强度。

### 将纹理采样转换为纹理对象

为了让"细节纹理化"材质函数正确工作，必须将你要用作细节纹理的纹理从常规纹理转换为纹理对象。要将纹理转换为纹理对象。请按照以下步骤执行此操作。

1.  找到要用作细节纹理的纹理采样。
    
    ![Regular texture sample](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f04deff-6592-42c1-96fb-aebbf9fc5f54/texture-sample.png)
2.  右键单击纹理采样节点，然后从上下文菜单中选择 **转换为纹理对象（Convert To Texture Object）**。
    
    ![Convert Texture Sample to Texture Object](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57870d54-af03-4a3e-a6f3-57af7c6e1558/convert-to-texture-object.png)
3.  纹理采样会转换为纹理对象。
    
    ![Texture Object node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02f64b3a-8d71-4f2a-9580-921a0719920b/texture-object.png)

## 如何在材质中使用细节纹理化功能

有两种方法可以配置材质来使用细节纹理，这两种方法如下文所述。这两种方法的主要区别在于是使用预制的"细节纹理（Detail Texturing）"材质函数，还是在材质图表中手动创建细节纹理逻辑。这两种方法并没有好坏之分，因为它们最终会产生相同的结果。选用哪种方法取决于具体材质和项目的需求。

如果你的项目包含 **起步内容**，那么你可找到下列各节中使用的所有内容。虽然此处展示的技巧适用于任何纹理，但如果你想采用这些技巧，请确保项目包含 **起步内容**。

创建一个用于测试的新材质。在 **内容浏览器（Content Browser）** 中进行 **右键单击**，然后从上下文菜单的"创建基本资产（Create Basic Asset）"分段中选择 **材质（Material）**。为材质指定一个描述性名称，如 **DetailTexturing**。

![Create new Material](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98fba131-4bf1-40ce-a327-96e928c4f3d2/create-material.png)

### 使用"细节纹理化"材质函数

1.  在 **内容浏览器（Content Browser）** 中 **双击** 相应的资产以打开材质。随即将打开"材质编辑器（Material Editor）"。
    
2.  在初学者内容包中找到以下四个纹理。将这些纹理从"内容浏览器（Content Browser）"拖到材质图表中。
    
    -   **T\_Brick\_Clay\_Old\_D**
    -   **T\_Brick\_Clay\_Old\_N**
    -   **T\_Ground\_Gravel\_D**
    -   **T\_Ground\_Moss\_N**
    
    完成之后，你的材质图应该类似于下图：
    
    ![Four texture sample nodes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/554caa24-22e3-4df5-86a2-9eb196e59b33/detail-texturing-texture-samples.png)
3.  在材质图表中 **右键单击**，然后从上下文菜单中搜索"细节纹理（Detail Texturing）"。单击"杂项（Misc）"类目下的 **DetailTexturing**，为图表添加该材质函数。
    
    ![Material Editor right-click search menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33686042-6e93-4a81-ab74-ee78c4f2adb6/right-click-search.png)
4.  材质图表中将创建 **DetailTexturing** 材质函数。
    
    ![DetailTexturing Material Function in graph](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dffb5b27-8366-4c1e-b43e-c56be85ff3d1/detail-texturing-node-added.png)
5.  此示例将使用 **T\_GroundGravel\_D** 和 **T\_Ground\_Moss\_N** 作为细节纹理。为了将细节纹理连接到材质函数，必须将细节纹理转换为纹理对象。右键单击 **T\_GroundGravel\_D** 和 **T\_Ground\_Moss\_N** 并将它们转换为纹理对象。
    
    ![Detail textures converted to texture objects](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad25d596-a36f-4b2f-8f73-4d747362db9e/detail-texture-objects.png)
6.  如下所示，连接所有节点。两个砖块纹理应该连接到 **漫反射（Diffuse）** 和 **法线（Normal）** 输入，两个纹理对象应该连接到 **DetailDiffuse** 和 **DetailNormal** 引脚。将"漫反射（Diffuse）"输出传递到主材质节点（Main Material Node）上的"基础颜色（Base Color）"输入中，将"法线（Normal）"输出传递到主材质节点上的"法线（Normal）"输入中。
    
    ![Material Function wired](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c07f84a9-2a93-435f-af9c-118e0953785b/material-function-wired.png)
7.  还需要其他值来控制纹理的缩放和强度。对于这些输入，可以使用 **常量** 材质表达式或 **标量参数**。此示例使用名为 **缩放（Scale）**、**漫反射强度（Diffuse Intensity）** 和 **法线强度（Normal Intensity）** 的三个标量参数。所有这三个节点的默认值都设置为 **1**。
    
    ![Three scalar parameters](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bfe8976-d1a2-4dc6-9fc7-aafa509e2b52/scalar-parameters.png)
8.  将标量参数连接到相应的输入。完成后，材质图表应如图所示。
    
    ![Final Material graph](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98069e27-c9aa-4f9c-8c51-88d4e5d1fc05/final-graph-with-function.png)
9.  通过调整标量参数中的值，可以修改细节纹理的外观。此处的一个示例说明了将"缩放（Scale）"的值分别设置为1、5以及最后设置为10时产生的结果。细节纹理在网格体上平铺的次数越多，意味着纹理本身看起来更小或更精细。
    
    ![Detail tiling at different scales](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0c06ac4-4e66-4f0a-b73c-7a8799dd3a89/dt_different_scale_settings.png)

### 手动设置细节纹理

如果由于某种原因无法使用 **细节纹理（Detail Texturing）** 材质函数，可以使用材质表达式节点并根据以下说明在材质图表中构建此功能。

1.  在 **内容浏览器（Content Browser）** 中复制第一个材质：右键单击相应的缩略图，然后从上下文菜单中选择 **复制（Duplicate）**。将这个新材质重命名为 **DetailTexturing\_02**，然后双击该材质在"材质编辑器（Material Editor）"中将其打开。
    
    ![Create another Material](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9988ef1-0d4f-4206-ad6b-f3a447c9d1cd/duplicate-material.png)
2.  仅保留四个纹理，删除其他所有内容。还需要将两个纹理对象转换回纹理采样。右键单击每个纹理对象节点，然后从上下文菜单中选择 **转换为纹理采样（Convert to Texture Sample）**。
    
    ![Convert to texture sample](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dfb2878f-ab26-4020-ad0c-f0f6aec0cd43/convert-to-texture-sample.png)
3.  为了手动创建细节纹理，需要以下材质表达式节点。为了找到以下各项，可以在 **控制板** 中进行搜索或使用 **右键单击** 上下文菜单中的搜索栏。
    
    -   **纹理坐标（Texture Coordinate）** x 1
    -   **限制（Clamp）** x 1
    -   **标量参数（Scalar Parameter）** x 2
    -   **加法（Add）** x 2
    -   **乘法（Multiply）** x 3
    
    完成上述操作后，材质图应该如下所示。
    
    ![All required Material expression nodes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d76add0-82e9-4136-a5f0-16796257dd29/all-required-nodes.png)
4.  将所有节点添加到图表后，即可如图所示开始连接它们。The image below shows the correct configuration for the Base Color portion of the graph.完成上述操作后，材质图应该如下所示。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/968e3a6c-dc86-4b92-a3ac-36fa9ef0febe/base-color-section.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/968e3a6c-dc86-4b92-a3ac-36fa9ef0febe/base-color-section.png)
    
    点击图片以查看大图。
    
5.  在"基础颜色（Base Color）"分段中创建的用于控制纹理缩放的逻辑可以重复用于法线贴图。如下所示连接节点。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e78d1f7-c0b1-4c56-a498-252ca51d2fb1/normal-map-section.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e78d1f7-c0b1-4c56-a498-252ca51d2fb1/normal-map-section.png)
    
    点击图片以查看大图。
    
6.  现在，"底色"（Base Color）和法线贴图（Normal map）都已彼此连接，你可以编译、保存和使用此材质了。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44279894-6555-4d8e-9c49-34d77ec11bf2/final-material-setup.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44279894-6555-4d8e-9c49-34d77ec11bf2/final-material-setup.png)
    
    点击图片以查看大图。
    

## 细节纹理化提示与技巧

本小节介绍了一些在材质中使用细节纹理化的提示与技巧。

### 基于距离的细节纹理化

在处理大表面（例如地貌）时可能会注意到，即使纹理无缝平铺，也会出现明显的重复，这会削弱纹理的外观效果，尤其是在远处观看时。

要解决此问题，可以修改先前创建的细节材质，使其在摄像机靠近时显示一个纹理，而在摄像机远离时显示另一个纹理。这种方法通常称为基于距离的纹理混合。为了实现这一点，可以按照以下说明操作。

1.  首先复制 **DetailTexturing\_02** 材质并将其重命名为 **DistanceFade**。打开这个材质。
    
2.  可以删除原始材质的大部分节点连接，但不要删除这四个纹理。还应该保留下面标有 **缩放控制（Scale Controls）** 字样的分段。搜索以下材质表达式并将其添加到图表中。
    
    -   全局位置（World\_Position）x 1
    -   摄像机位置 WS（Camera\_Position\_WS）x 1
    -   距离（Distance）x 1
    -   除法（Divide）x 1
    -   幂（Power）x 1
    -   限制（Clamp）x 1
    -   常量（Constant）x 2
    
    完成后，材质图表应如图所示。
    
    ![Distance fade nodes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/691339da-7419-4de9-910d-07a67143a9ec/distance-fade-nodes.png)
3.  将两个 **常量** 材质表达式中的值更改为 **512** 和 **4**，然后按照下图所示的配置连接节点。插入到 **除法** 材质表达式中的第一个 **常量**（在示例图像中设置为512）决定了进行纹理混合的距离。下面显示的材质图表提供了基于距离进行纹理混合所需的所有逻辑。
    
    ![Distance fade Material logic](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa81fd02-5f71-4146-a417-ed91fd8c701b/distance-fade-logic.png)
4.  现在可以将距离消退逻辑连接到图表的其余部分。首先在图表中添加两个 **线性插值（Lerp）**。Lerp节点上的Alpha输入将驱动两个纹理之间的过渡。如下所示完成材质的连接。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d0f4aa4-fc65-4c36-b137-a4e3d174f4fe/depth-fade-material-graph.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d0f4aa4-fc65-4c36-b137-a4e3d174f4fe/depth-fade-material-graph.png)
    
5.  要预览效果，请在材质预览视口中按住 **鼠标右键**，并上下移动鼠标以进行放大和缩小。当摄像机距离球体512个单位时，材质将从砖块转换到砾石。如果看不到这一变化，可以调整插入到"除法（Divide）"节点中的 **常量** 的值。将该值从512减小到更小的值将加快这一转换的速度。
    

## 结论

细节纹理技术的功能非常强大，可以使用高度重复的细节纹理来补充基础纹理，从而改善材质的外观。请注意，细节纹理技术只能帮助将像素化问题隐藏于某个点，因此，如果让玩家的摄像机将对象放大到不合理的程度，可能会抵消细节纹理带来的好处。另外还要注意，添加细节纹理可能会为材质添加两个或更多额外的纹理查找，因此可能会带来性能或内存问题，尤其是在移动平台上。

-   [materials](https://dev.epicgames.com/community/search?query=materials)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [细节纹理化](/documentation/zh-cn/unreal-engine/adding-detail-textures-to-unreal-engine-materials#%E7%BB%86%E8%8A%82%E7%BA%B9%E7%90%86%E5%8C%96)
-   [细节纹理化节点明细](/documentation/zh-cn/unreal-engine/adding-detail-textures-to-unreal-engine-materials#%E7%BB%86%E8%8A%82%E7%BA%B9%E7%90%86%E5%8C%96%E8%8A%82%E7%82%B9%E6%98%8E%E7%BB%86)
-   [将纹理采样转换为纹理对象](/documentation/zh-cn/unreal-engine/adding-detail-textures-to-unreal-engine-materials#%E5%B0%86%E7%BA%B9%E7%90%86%E9%87%87%E6%A0%B7%E8%BD%AC%E6%8D%A2%E4%B8%BA%E7%BA%B9%E7%90%86%E5%AF%B9%E8%B1%A1)
-   [如何在材质中使用细节纹理化功能](/documentation/zh-cn/unreal-engine/adding-detail-textures-to-unreal-engine-materials#%E5%A6%82%E4%BD%95%E5%9C%A8%E6%9D%90%E8%B4%A8%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%BB%86%E8%8A%82%E7%BA%B9%E7%90%86%E5%8C%96%E5%8A%9F%E8%83%BD)
-   [使用"细节纹理化"材质函数](/documentation/zh-cn/unreal-engine/adding-detail-textures-to-unreal-engine-materials#%E4%BD%BF%E7%94%A8%22%E7%BB%86%E8%8A%82%E7%BA%B9%E7%90%86%E5%8C%96%22%E6%9D%90%E8%B4%A8%E5%87%BD%E6%95%B0)
-   [手动设置细节纹理](/documentation/zh-cn/unreal-engine/adding-detail-textures-to-unreal-engine-materials#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE%E7%BB%86%E8%8A%82%E7%BA%B9%E7%90%86)
-   [细节纹理化提示与技巧](/documentation/zh-cn/unreal-engine/adding-detail-textures-to-unreal-engine-materials#%E7%BB%86%E8%8A%82%E7%BA%B9%E7%90%86%E5%8C%96%E6%8F%90%E7%A4%BA%E4%B8%8E%E6%8A%80%E5%B7%A7)
-   [基于距离的细节纹理化](/documentation/zh-cn/unreal-engine/adding-detail-textures-to-unreal-engine-materials#%E5%9F%BA%E4%BA%8E%E8%B7%9D%E7%A6%BB%E7%9A%84%E7%BB%86%E8%8A%82%E7%BA%B9%E7%90%86%E5%8C%96)
-   [结论](/documentation/zh-cn/unreal-engine/adding-detail-textures-to-unreal-engine-materials#%E7%BB%93%E8%AE%BA)

相关文档

[

坐标材质表达式

![坐标材质表达式](https://dev.epicgames.com/community/api/documentation/image/a9f9bdf4-7f1f-4731-bcdb-45c966fc3376?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine)

[

自定义UV

![自定义UV](https://dev.epicgames.com/community/api/documentation/image/0b43002b-7c1e-4cf4-8b48-cd9c5682f312?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/customized-uvs-in-unreal-engine-materials)

[

纹理材质函数

![纹理材质函数](https://dev.epicgames.com/community/api/documentation/image/15dccfcd-5eba-4c3c-9dd5-2847312d0845?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/texturing-material-functions-in-unreal-engine)

[

纹理材质表达式

![纹理材质表达式](https://dev.epicgames.com/community/api/documentation/image/594faf1d-9d21-4eb9-913c-9439b55a620b?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/texture-material-expressions-in-unreal-engine)
# 在虚幻引擎材质中使用菲涅尔 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-fresnel-in-your-unreal-engine-materials
> 
> 生成时间: 2025-06-14T19:28:48.619Z

---

目录

![在材质中使用菲涅尔](https://dev.epicgames.com/community/api/documentation/image/5f8db03e-08f0-48db-b8ed-386d71620d2d?resizing_type=fill&width=1920&height=335)

在创建电影或过场动画时，你常常需要想办法更好地突显角色或场景的轮廓。这时你需要用到一种光照技术，称为边沿光照或边缘光照，它的原理是通过添加额外光源来帮助区分角色轮廓与背景。虽然这能够很好地适用于电影，但将额外光源添加到3D场景会增加额外的复杂度，使其很快变得难以管理。

虚幻引擎在材质层面提供了相应的解决方案。 美术师可以使用 **菲涅尔（Fresnel）** 在角色或道具的材质中模拟边沿光照，更好地控制效果的外观体验。 菲涅尔是一种固有属性，在许多材质中自然存在，其中包括玻璃、水以及一些类型的织物和油漆。本教程中的技术将帮助你更准确地模拟这些材质。

## 菲涅尔

**菲涅尔（Fresnel）** 这一术语用于说明你看到的光线如何根据视角的变化以不同的强度反射。例如，你站在水池边，低头看脚下的水，你会发现水面的反射不是特别强烈。随着你抬起头，使你的视线与水池中的水面平行，你会开始发现水面越来越波光粼粼。水和玻璃都表现出很强的菲涅尔倾向，即视线垂直于表面时，它们看起来相对透明，视线未垂直于表面时，它们会反射更多光线。

 ![请注意，从正面看时，相框中的玻璃是透明的，从侧面看时，玻璃的反光会更明显。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45fd9f6a-a16e-474c-9e22-61f40b678bbf/fresnel-glass-01.png) ![请注意，从正面看时，相框中的玻璃是透明的，从侧面看时，玻璃的反光会更明显。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3bdf5f18-b2e0-4277-b424-9dfdc9fc4cba/fresnel-glass-02.png)

**请注意，从正面看时，相框中的玻璃是透明的，从侧面看时，玻璃的反光会更明显。**

在虚幻引擎中，**菲涅尔材质表达式** 会根据表面法线与摄像机方向的[点积](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#%E7%82%B9%E7%A7%AF)计算衰减。当表面法线径直指向摄像机时，会输出值0，意味着应该不会发生菲涅尔效果。当表面法线与摄像机垂直时，会输出值1，意味着应该发生完整的菲涅尔效果。结果会限制在\[0, 1\]范围内，这样就不会在中心看到负值颜色。下图演示了此概念。

![菲涅尔视角示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae2a6c30-0b70-4403-81a5-0b5a8415ba12/fn_caculation_example.png)

在球体中间（标记为0），没有菲涅尔效果。这是因为摄像机径直指向表面法线。朝向球体边缘（标记为1），表面法线趋于与摄像机垂直，菲涅尔效果也越来越明显。 这会造成球体边缘被照亮的感觉。

## 菲涅尔节点细目

在控制板或上下文菜单中搜索"菲涅尔（Fresnel）"时，你会发现 **工具（Utility）** 下有一个菲涅尔材质表达式，**向量操作（Vector Ops）** 下有一个材质函数。虽然这两个节点的用途相同，但设置它们的设置方式有所不同。

![菲涅尔搜索控制板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/332bea68-b32e-417b-87a3-f308a32290d9/fresnel-search.png)

### 菲涅尔材质表达式

**工具（Utility）** 下的 **菲涅尔** 材质表达式是本教程中使用的选项，并且在这两个选项中更易于配置。强烈推荐你使用此版本入手，并仅在更好地理解该节点运作方式之后才使用菲涅尔材质函数。

![菲涅尔材质表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12544e47-9c63-4331-8a44-5441833aad2e/fresnel-utility-node.png)

属性

说明

**ExponentIn**

此输入将控制菲涅尔效果的衰减。

**BaseReflectFractionIn**

这指定了视线垂直于表面时的高光度反射率。将其设置为值1实际上会禁用菲涅尔。

**法线（Normal）**

你可以输入法线贴图来更改菲涅尔效果的渲染方式。法线贴图必须从切线空间变换为世界空间（参见下文）。

有三种方法可调整菲涅尔材质表达式中的值。

-   在材质图表中选择节点时，你可以在 **细节（Details）** 面板中输入值。
    
    ![菲涅尔细节面板属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70b15ff4-fbe6-4fa0-b07c-fb6464d7d727/fresnel-details-panel.png)
-   你还可以将常量或标量参数连接到输入。
    
    ![菲涅尔输入值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73baf251-8547-454d-b7ef-5c4636519fdb/fresnel-input-values.png)
-   你可以将法线贴图拖到 **法线（Normal）** 输入来更改菲涅尔效果的外观。如果你使用法线贴图纹理，必须通过 **TransformVector** 表达式传递它，然后再将其连接到法线输入。这会将法线贴图从切线空间变换为世界空间。如果不进行此变换，法线贴图可能无法按你所需的方式影响菲涅尔。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23a0c07e-17e8-4fea-b26c-c686cdcc8aed/fresnel-with-normal.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23a0c07e-17e8-4fea-b26c-c686cdcc8aed/fresnel-with-normal.png)
    
    点击查看大图。
    

### 菲涅尔材质函数

**向量操作（Vector Ops）** 类别中的 **Fresnel\_Function** 材质函数是高度可自定义的菲涅尔版本，用于提供对菲涅尔效果的多个不同方面的控制。这个新增加的功能有其缺点，因为设置出错可能导致菲涅尔效果的渲染存在瑕疵或错误。

你应该仅在 **工具（Utility）** 下的菲涅尔材质表达式不能产生你所需的结果时使用此材质函数。

![菲涅尔材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f086745c-431d-4cd0-8935-fffe459408e8/fn_fresnel_node_vo.png)

属性

说明

**法线向量（V3）（Normal Vector (V3)）**

你可以在此处输入法线来修改菲涅尔效果的渲染。为获得准确的结果，你必须通过变换节点（切线空间到世界空间）来传递法线贴图。

**摄像机向量（V3）（Camera Vector(V3)）**

手动更改用于确定摄像机和表面法线之间点积的摄像机向量。

**反转菲涅尔（B）（Invert Fresnel(B)）**

反转菲涅尔的效果。如果你希望菲涅尔仅在中心或边缘应用，这会很有用。

**能力（S）（Power(S)）**

输入标量以控制菲涅尔效果的范围（或衰减）。输入的数字越大，受影响的区域越小。输入的数字越小，那么菲涅尔节点影响的表面区域越大。

**使用低开销对比度（B）（Use Cheap Contrast(B)）**

启用此属性后，菲涅尔节点会使用开销更低的方法来计算亮色与暗色之间的对比度。

**低开销对比度暗色（S）（Cheap Contrast Dark (S)）**

此属性将控制菲涅尔的昏暗程度。这仅在启用 **使用低开销对比度（Use Cheap Contrast）** 时有效果。

**低开销对比度亮色（S）（Cheap Contrast Bright (S)）**

此属性将控制菲涅尔效果的明亮程度。这仅在启用 **使用低开销对比度（Use Cheap Contrast）** 时有效果。

**限制菲涅尔点积（B）（Clamp Fresnel Dot Product (B)）**

将菲涅尔点积的结果限制在0到1之间。 此属性默认为true，但你可以使用设置为false的 **静态布尔（Static Bool）** 将其覆盖。

## 如何在材质中使用菲涅尔

使用以下步骤可创建要使用菲涅尔的材质。

1.  在 **内容浏览器（Content Browser）** 中 **右键点击** 并从上下文菜单中的创建基本资产（Create Basic Asset）分段选择 **材质（Material）** 。 创建材质后，将其命名为 **FresnelMaterial** 。
    
    ![创建FresnelMaterial](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe5a96c1-51ad-4ddc-b3f1-1306b4d8f478/create-material.png)
2.  在 **内容浏览器（Content Browser）** 中 **双击** 缩略图，打开新材质。
    
    ![打开新材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73c69a0b-7c4e-481a-b257-bbf075412663/double-click-open.png)
3.  展开 **控制板（Palette）** 或在材质图表中 **右键点击** 以显示上下文菜单。搜索以下材质表达式节点并将其添加到图表中。
    
    节点名称
    
    数量
    
    **向量参数节点（Vector Parameter Node）**
    
    2
    
    **标量参数节点（Scalar Parameter Node）**
    
    2
    
    **菲涅尔节点（Fresnel Node）**
    
    1
    
    完成后，材质图表应如下所示。
    
    ![将所有节点添加到材质图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8fdb25b-1a87-4599-bf15-e98c66acb976/add-all-nodes.png)
    
    搜索菲涅尔材质表达式时，你会发现有两个不同的菲涅尔节点可供选择。 本教程使用 **工具（Utility）** 类别中的菲涅尔材质表达式。
    
4.  重命名所有标量和向量参数节点，并在细节（Details）面板中设置其默认值。
    
    名称
    
    默认值
    
    **菲涅尔颜色（Fresnel Color）**
    
    1.0, 0.0, 0.0, 0.0
    
    **基础颜色（Base Color）**
    
    0.5, 0.5, 0.5, 0
    
    **菲涅尔衰减（Fresnel Falloff）**
    
    8
    
    **粗糙度（Roughness）**
    
    0.5
    
    ![重命名参数节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1404995e-56e5-4b5e-bb4b-fcab5c62780b/rename-parameter-nodes.png)
5.  将 **Multiply** 节点添加到图表，然后使用下图作为指南来连接所有材质表达式。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/015255bf-4910-4ee8-903f-bd19fe914538/fresnel-mat-wired.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/015255bf-4910-4ee8-903f-bd19fe914538/fresnel-mat-wired.png)
    
    点击查看大图。
    
6.  点击工具栏中的 **应用（Apply）** 来编译材质，然后点击 **保存（Save）** 。
    
    ![应用并保存材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/372e9566-2f81-48fe-9bf2-654036321e63/save-and-apply.png)
7.  编译并保存材质后，关闭材质编辑器并在内容浏览器中找到 **FresnelMaterial** 资产。 **右键点击** 缩略图并选择上下文菜单中的 **创建材质实例（Create Material Instance）** 。
    
    ![创建材质实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/896a4e2c-d3f1-49b2-b959-4ecf1cb73a95/create-instance.png)
8.  **双击** 实例，在材质实例编辑器中打开。选中每个参数名称旁边的复选框，启用你想覆盖的参数。启用参数后，你可以修改值来更改菲涅尔效果的颜色和外观。
    

请记住，在 **菲涅尔衰减（Fresnel Falloff）** 中输入较大的数字会将菲涅尔效果愈加推向边缘，而输入较小的数字则会使效果更靠近中心。下面是 **菲涅尔衰减（Fresnel Falloff）** 值从0增加到10的效果展示。请注意，随着数字增加，蓝色会逐渐推向球体边缘。

![菲涅尔衰减示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd69c099-5868-4fbc-8bea-9f8bdf291476/fn_different_fresnel_exp_values.png)

## 菲涅尔和法线贴图

由于菲涅尔会根据脸部的表面法线计算，所以你可以使用法线贴图来影响菲涅尔效果在材质中的分布。菲涅尔节点的运用原理是检查表面法线是否与摄像机垂直。如果与摄像机垂直，则菲涅尔效果可见。在光滑的球体上，这意味着菲涅尔效果仅在边缘发生。

但是，引入法线贴图时，表面法线会被修改，可能使网格体的轮廓中出现起伏和轮廓线。 这意味着菲涅尔效果可以高亮或突显在表面法线光滑时不可见的细节。

如需直观了解其运作原理，可以参考下面的两张图片。左图（1）显示了菲涅尔节点在使用扁平表面法线时的输出情况。菲涅尔效果仅在球体边缘可见。 右图（2）输入了法线贴图，显著改变了网格体的表面法线。 现在，菲涅尔效果沿法线贴图中定义的轮廓线可见。

![表面法线上的菲涅尔效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9a60ef5-ca6c-4040-8f19-861d77fb8109/fresnel-effect-surface-normal.png)

下图显示了不同的法线贴图对菲涅尔的影响。

![菲涅尔和法线贴图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6223b5ae-ff53-4f35-a7b0-53b6a83c71ab/fresnel-with-normal-maps.png)

上述比较中使用的材质是之前创建的相同材质，但进行了以下修改。

-   材质的 **混合模式（Blend Mode）** 从 **不透明（Opaque）** 更改为 **半透明（Translucent）** 。
-   在细节（Details）面板中，**半透明光照模式（Translucency Lighting Mode）** 从 **体积无方向（Volumetric Non Directional）** 更改为 **表面半透明体积（Surface Translucency Volume）** 。
-   插入到 **自发光颜色（Emissive Color）** 输入的Multiply输出也插入到 **不透明度（Opacity）** 输入。
-   新的2D纹理取样器已添加并插入到 **法线（Normal）** 输入。初学者内容包中的 **Tech\_Hex\_Tile\_N** 用作法线纹理。
-   新的标量参数已添加并乘以纹理坐标表达式，在法线贴图上实现了一些基本的均匀倾斜。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4b4a2c0-998e-424e-8386-9f2bc4f67b9f/fresnel-material-graph-with-normal-map.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4b4a2c0-998e-424e-8386-9f2bc4f67b9f/fresnel-material-graph-with-normal-map.png)

你还可以将法线贴图传递到菲涅尔节点上的 **法线（Normal）** 输入。 如果你希望菲涅尔效果的法线不同于底层材质的法线，这尤其有用。例如，你可以使用菲涅尔节点在材质上显示诸如能量护盾之类的效果，但仍使该材质在护盾未激活时看起来正常。

要使用上述材质实现这种情况，请对材质做出以下修改。

1.  添加初学者内容包中的 **T\_Brick\_Clay\_New\_D** 纹理，并将其插入到 **基础颜色（Base Color）** 和 **粗糙度（Roughness）** 。
    
2.  更改法线输入，使其使用 **T\_Brick\_Clay\_New\_N** ，你还可以在初学者内容包中找到它。
    
3.  搜索 **变换（Transform）** 材质表达式节点并将其添加到材质图表中。确保它设置为从 **切线空间到世界空间** 进行变换。
    
4.  将旧的法线贴图纹理节点连接到变换（Transform）节点的输入，并将其输出连接到菲涅尔（Fresnel）节点上的法线（Normal）输入。
    

完成后，材质看起来应该类似于以下图表。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20c60913-4646-4bc0-be6d-e060791c072c/graph-without-intensity-control.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20c60913-4646-4bc0-be6d-e060791c072c/graph-without-intensity-control.png)

现在，菲涅尔节点中的表面法线完全不同于砖块纹理中的表面法线。 菲涅尔效果就像砖块上有一个半透明层。如果你认为效果太强烈，可以进一步添加Multiply节点和标量参数（Scalar Parameter）来控制菲涅尔效果的强度。下面是在材质中实现强度控制的方式。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e4248ba-67f9-493c-8ebb-268a55767770/graph-with-intensity-control.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e4248ba-67f9-493c-8ebb-268a55767770/graph-with-intensity-control.png)

通过调整 **菲涅尔强度（Fresnel Intensity）** 参数，你可以控制表面上菲涅尔效果的强度。将值设置为 **0** 会关闭效果，设置为其他值会逐渐提高菲涅尔效果的可视性，如下所示。

![菲涅尔强度演示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59d493fd-d36e-446d-8fc0-cd798d68b02e/fn_effect_amount.png)

## 输入混合

菲涅尔节点是一种多功能工具，用于在 **Lerp** 节点中的两个不同输入之间进行alpha混合。

在下图中，**Alpha** 输入中的菲涅尔节点将控制Lerp上的输入A和B中红色和绿色之间的过渡。

![使用菲涅尔的插值混合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ff50fa7-d533-478b-94da-99024b6b86b6/fresnel-lerp.png)

通过相同的逻辑，你可以使用菲涅尔控制网格体上不同 **粗糙度（Roughness）** 值的位置。在下图中，菲涅尔用于在边缘处的粗糙度值0.1与朝向球体中心处的0.9之间过渡。这会造成球体在边缘附近反射性更强的错觉，类似于玻璃的表现方式。

![粗糙度的菲涅尔混合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87e6eba1-6e09-4443-b588-7b2898349889/fresnel-lerp-roughness.png)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [菲涅尔](/documentation/zh-cn/unreal-engine/using-fresnel-in-your-unreal-engine-materials#%E8%8F%B2%E6%B6%85%E5%B0%94)
-   [菲涅尔节点细目](/documentation/zh-cn/unreal-engine/using-fresnel-in-your-unreal-engine-materials#%E8%8F%B2%E6%B6%85%E5%B0%94%E8%8A%82%E7%82%B9%E7%BB%86%E7%9B%AE)
-   [菲涅尔材质表达式](/documentation/zh-cn/unreal-engine/using-fresnel-in-your-unreal-engine-materials#%E8%8F%B2%E6%B6%85%E5%B0%94%E6%9D%90%E8%B4%A8%E8%A1%A8%E8%BE%BE%E5%BC%8F)
-   [菲涅尔材质函数](/documentation/zh-cn/unreal-engine/using-fresnel-in-your-unreal-engine-materials#%E8%8F%B2%E6%B6%85%E5%B0%94%E6%9D%90%E8%B4%A8%E5%87%BD%E6%95%B0)
-   [如何在材质中使用菲涅尔](/documentation/zh-cn/unreal-engine/using-fresnel-in-your-unreal-engine-materials#%E5%A6%82%E4%BD%95%E5%9C%A8%E6%9D%90%E8%B4%A8%E4%B8%AD%E4%BD%BF%E7%94%A8%E8%8F%B2%E6%B6%85%E5%B0%94)
-   [菲涅尔和法线贴图](/documentation/zh-cn/unreal-engine/using-fresnel-in-your-unreal-engine-materials#%E8%8F%B2%E6%B6%85%E5%B0%94%E5%92%8C%E6%B3%95%E7%BA%BF%E8%B4%B4%E5%9B%BE)
-   [输入混合](/documentation/zh-cn/unreal-engine/using-fresnel-in-your-unreal-engine-materials#%E8%BE%93%E5%85%A5%E6%B7%B7%E5%90%88)

相关文档

[

向量运算材质函数

![向量运算材质函数](https://dev.epicgames.com/community/api/documentation/image/c89a038c-03a7-4e8b-b3ec-9f749d45903b?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/vector-ops-material-functions-in-unreal-engine)

[

材质编辑器UI

![材质编辑器UI](https://dev.epicgames.com/community/api/documentation/image/4c4d4a6a-52c0-432a-bd48-7a029cd60652?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-ui)
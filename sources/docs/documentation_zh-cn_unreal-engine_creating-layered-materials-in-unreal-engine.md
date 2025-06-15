# 在虚幻引擎中创建分层材质 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-layered-materials-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:27:46.516Z

---

目录

![创建分层材质](https://dev.epicgames.com/community/api/documentation/image/6df550f7-fb21-46ff-be46-9103379fd61e?resizing_type=fill&width=1920&height=335)

本文介绍了一个简单 **分层材质（Layered Material）** 的过程，这个材质由两层材质构成：铬和雪。在最终实现的分层材质中，我们用了一个基于世界对齐的混合，自动将雪放置在网格体的朝上部分上，从而有效地在两种材质之间切换。混合函数始终会检查上表面，这意味着即使在你旋转对象时，雪材质仍会保持在上面，如下图所示：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d01dff3-e83d-4a4b-a09a-1017a7c2f45b/layered-example-sculpture.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d01dff3-e83d-4a4b-a09a-1017a7c2f45b/layered-example-sculpture.png)

一般来说，在创建分层材质时，常见做法是先分别创建材质来表示每个材质层，然后将这些节点网络复制/粘贴到新的材质函数中。为了节省时间，本教程默认材质函数中已经有了材质层。

## 简单的铬

铬纹理

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31e3b146-ecd7-40d1-b5a2-b5796d81f086/t_examplelayers_metal01_bc.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4291a931-3e40-4dd7-b412-8ef30e993b82/t_examplelayers_metal01_n.png)

T\_ExampleLayers\_Metal\_1\_BC.png

T\_ExampleLayers\_Metal01\_N.png

（点击右键保存图片）

（点击右键保存图片）

材质的底层是一种简单的铬材质，表面带有一些细微瑕疵，用来让材质更真实。为了展示编辑效果，该材质包含多个输入，以便微调总体外观。

1.  在 **内容浏览器（Content Browser）** 中点击右键，点击 **材质（Materials）** 并选择上下文菜单中的 **材质函数（Material Function）** 。
    
    ![创建材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e29a7fc8-b366-4cb1-8158-c6e40a679236/create-material-function.png)
2.  将材质函数命名为 **Layer\_Chrome** 。
    
    ![重命名函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d29e12fe-3948-4429-bb4d-18471661e872/function-layer-chrome.png)
3.  **双击** 材质函数，在材质编辑器中打开。
    
    ![编辑器中的新材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff450bd9-bb7a-4d35-bf06-45f7e95353e5/new-material-function.png)
4.  **右键点击** 材质图表，然后搜索并选择上下文菜单中的 **创建材质属性（Make Material Attributes）** 。
    
    ![从上下文菜单添加](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07a026ce-629b-4c32-83a9-fd9f491541ed/add-make-material-attributes.png)
5.  将 **Make Material Attributes** 节点连接到 **Output Result** 节点。
    
    ![连接](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39bd3900-5c88-46f8-867a-03c415537178/chrome-make-attributes.png)

### 铬材质网络

下图是铬材质层的材质图表，图下方则是步骤的详细说明，便于你复制。其中用到了两张纹理：用来保存基础颜色和粗糙度的 **T\_ExampleLayers\_Metal\_1\_BC.png** ，以及保存法线的 **T\_ExampleLayers\_Metal01\_N.png** ，两者都可在本文开始处下载。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/129cbdcf-6fa8-4ae4-8ea4-0dc81bc311ae/chrome-material-network.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/129cbdcf-6fa8-4ae4-8ea4-0dc81bc311ae/chrome-material-network.png)

点击查看大图。

请参阅以下备注，其中解释了材质图表中的四个注释块。

1.  **基础颜色（Base Color）** - 对于基础颜色，线性插值(LERP)用于在基础铬颜色与非常深的灰色值(0.3)之间混合。 对于基础颜色，创建 **Function Input** 节点并将其命名为 **Tint** 。确保输入类型在"细节（Details）"面板中设置为 **Vector3** ，这样你可以向函数输入颜色来更改铬的色调。 **T\_ExampleLayers\_Metal\_1\_BC** 纹理的红色通道用于驱动两个值之间的插值。
    
    ![输入类型向量3](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/704cdfcd-150c-4dca-8787-161c27c6f2be/input-type-chrome.png)
2.  **金属感（Metallic）** - 由于这是金属材质，因此将值1传递到"金属感（Metallic）"输入。
3.  **粗糙度（Roughness）** - 一般来说，铬材质的粗糙度应该非常低，但一些细微的变化可以给材质的总体外观带来深度。在本例中，铬纹理的红色通道用于在值0.2和0.4之间执行LERP。 这意味着，纹理贴图上深色区域的粗糙度略高于浅色区域。
4.  **可自定义法线（Customizable Normal）** - 此网络将直接接收切线空间法线贴图，并分隔绿色和红色通道，它们控制贴图的大部分细节。每个通道会乘以从另一个函数输入提供的值。此输入设置为标量类型，名为 **法线乘数（Normal Multiplier）** ，默认值为1.0。使用 **AppendVector节点** ，结果会附加到一起，然后附加到法线贴图的蓝色通道。结果是，用户能够更改法线乘数值，从而调整法线高度。

确保在完成后编译并保存[材质函数](/documentation/zh-cn/unreal-engine/unreal-engine-material-functions-overview)。

## 简单的雪

雪纹理

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe540ec1-3e48-4ca4-b337-9943447568df/t_cave_ice_tiling_d.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49ffdada-4386-4e84-a8ba-57a9ad53bd5f/t_cave_ice_noise_n.png)

T\_Cave\_Ice\_Tiling\_D.png

T\_Cave\_Ice\_Noise\_N.png

（点击右键保存图片）

（点击右键保存图片）

下载上述两个纹理并将其导入虚幻引擎中。执行下面的步骤，为雪层创建第二个材质函数。

1.  在 **内容浏览器（Content Browser）** 中右键点击，点击 **材质（Materials）** 并选择上下文菜单中的 **材质函数（Material Function）** 。
    
    ![创建材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/317d5033-6eff-48fc-8d8f-2b18e50585d7/create-material-function.png)
2.  将材质函数命名为 **Layer\_Snow** 。
    
    ![重命名函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/151fcfd0-c632-4752-a98d-1829ea668f75/snow-layer-function.png)
3.  **双击** 材质函数，在材质编辑器中打开。
    
    ![新建材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a636563-7c6f-4a38-ba2c-2b2312fbe22b/new-function-snow.png)
4.  **右键点击** 材质图表，然后搜索并选择上下文菜单中的 **创建材质属性（Make Material Attributes）** ，接着将其添加到图表中。
    
    ![从上下文菜单添加](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98d3a202-6eaa-4ef8-bb3e-2193f45bd554/add-make-material-attributes.png)
5.  将 **Make Material Attributes** 节点连接到 **Output Pose** 节点。
    
    ![连接](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76c1db80-4a67-4cd8-8c0c-c831bdfce10d/chrome-make-attributes.png)

### 雪材质层的节点网络

下面是雪材质图表的详细说明。它用到了 **T\_Cave\_Ice\_Tiling\_D.png** 和 **T\_Cave\_Ice\_Noise\_N.png** 纹理，两者都可在本页面顶部下载。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/286b73c5-9ad0-484c-9617-8d5d84248f4b/snow-material-network.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/286b73c5-9ad0-484c-9617-8d5d84248f4b/snow-material-network.png)

1.  **基础颜色（Base Color）** - 这是网络中唯一比较复杂的部分，因为它使用了 **FuzzyShading** 材质函数。该函数在材质接收光线时能防止纹理变得太暗。这类似于光线通过纤维状表面的情形。它非常适合丝绒、苔藓或者本例中的雪。对比度从基础颜色纹理(T\_Cave\_Ice\_Tiling\_D.png)中移除了一些，方法是对其进行0.3次方运算。
    
    接下来，将结果插入到FuzzyShading材质函数，该函数可以在材质编辑器控制板中的"函数（Functions）"选项卡中找到。将 **核心暗度（Core Darkness）** 设置为0，将 **幂（Power）** 设置为1，并将 **边缘亮度（EdgeBrightness）** 设置为0.5。最后，将整个事物乘以非常淡的蓝色(R=0.8, G=0.9, B=0.95)，使其呈现冰冷的色调。
    
2.  **金属感（Metallic）** - 这个材质是非金属表面，因此"金属感（Metallic）"设置为0。
3.  **粗糙度（Roughness）** - 光线恰到好处地照到雪上时，雪应该有一点闪耀，因此T\_Cave\_Ice\_Tiling\_D.png纹理的红色通道用于驱动0.6到0.3之间的插值。
    
4.  **法线（Normal）** - 法线贴图的效果有点太强了。 有一种方式可以减轻切线空间法线贴图的效果，那就是将蓝色通道的强度加倍。将法线贴图乘以值为(1,1,2)的Constant3向量即可。

完成后请保存结果！

## 分层材质

现在你可以创建一种材质，然后将两个层函数混合在一起。 此示例的配置方式是，雪始终显示在表面上方。该材质还包含一些参数，以便可在材质实例中自定义。

1.  在 **内容浏览器（Content Browser）** 中，点击 **新增（Add New）** 按钮，并从上下文菜单选择材质。
    
    ![创建新材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ddba812-2ea5-409d-bc62-aef5046dbdfe/create-material.png)
2.  将新材质命名为 **Mat\_SnowyChrome** 。
    
    ![重命名材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c25d3c1-4c6d-4110-b8cd-6783ad0b19bf/rename-material.png)
3.  **双击** 材质，在材质编辑器中打开。
    
    ![在材质编辑器中打开材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ebf4a551-f503-47fa-936e-eb7ef85e5604/open-new-material.png)
4.  将 **Layer\_Chrome** 和 **Layer\_Snow** 材质函数从 **内容浏览器（Content Browser）** 拖入材质图表中。
    
    ![将层拖入材质图表中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fba39d66-ffb6-4309-91aa-6007f683bd7a/drag-from-content-browser.png)
5.  点击材质图表的背景，在"细节（Details）"面板中显示基础材质属性。 选中 **使用材质属性（Use Material Attributes）** 框以将其启用。
    
    ![启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e3e2fa7-86e6-417b-90af-acb3f845acd5/use-material-attributes.png)
6.  从控制板添加 **MatLayerBlend\_Simple** 材质函数，以及 **WorldAlignedBlend** 函数。MatLayerBlend\_Simple将执行从铬到雪的过渡，而World\_Aligned\_Blend将基于表面的朝向来驱动层混合。
    

### 分层材质网络

下面是Mat\_SnowyChrome材质网络的细目，以及每个带注释区域的描述。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df13931d-4e45-42ac-94ba-7afe6b3f947b/layer-blend-graph.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df13931d-4e45-42ac-94ba-7afe6b3f947b/layer-blend-graph.png)

1.  **铬设置（Chrome Setup）** - 有两个参数连接到Layer\_Chrome材质函数。第一个是名为 **铬法线（Chrome Normal）** 的标量参数，用于驱动 **NormalMultiplier** 输入。第二个是名为 **铬色调（ChromeTint）** 的向量参数，用于驱动 **色调（Tint）** 输入。你可以使用这些参数改变法线贴图的强度，并在以后对材质实例化时更改铬的色调。
    
2.  **雪设置（Snow Setup）** - 不需要更多节点。Layer\_Snow材质函数将直接插入到混合节点。
    
3.  **世界对齐的混合设置（World Aligned Blend Setup）** - WorldAlignedBlend节点将控制材质混合的位置和锐度。 将 **混合锐度（Blend Sharpness）** 值设置为10。 然后创建名为 **BlendBias** 的标量参数并将其连接到 **混合别名（Blend Bias）** 输入。这样一来，你可以在发生混合的网格体上调整垂直位置。
    
4.  **MatLayerBlend** - 该节点包含用于驱动混合的逻辑。在本例中，基础材质是Layer\_Chrome，顶层材质是Layer\_Snow。WorldAlignedBlend将插入到Alpha输入以驱动过渡。
    

完成后请保存材质！

## 实例化分层材质

由于该材质包含两个参数，你现在可以创建一个材质实例，然后设置材质层的不同部分。

1.  如果你在项目中添加了初学者内容包，你会看到一套桌椅，并可以将新材质应用于这套桌椅。如果没有，可以用你自己的资产。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87641960-3109-408f-8cf9-12d952e12796/defaultlevel.png)
2.  右键点击 **Mat\_SnowyChrome** 材质，然后选择上下文菜单中的 **创建材质实例（Create Material Instance）**。默认名称应该是可以的。
    
    ![创建材质实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8c39c01-50a6-412c-837e-e68c8fcf2130/create-material-instance.png)
3.  将材质实例资产从 **内容浏览器（Content Browser）** 拖到场景中的某个对象上。
    
    ![从内容浏览器应用材质实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ef3a9ab-7ace-42c7-97bc-571d44290b35/apply-material-from-browser.png)
4.  **双击** 材质实例，在材质实例编辑器中打开。你可以覆盖铬的色调、铬的法线贴图的深度，以及其上方落了多少雪。
    

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [简单的铬](/documentation/zh-cn/unreal-engine/creating-layered-materials-in-unreal-engine#%E7%AE%80%E5%8D%95%E7%9A%84%E9%93%AC)
-   [铬材质网络](/documentation/zh-cn/unreal-engine/creating-layered-materials-in-unreal-engine#%E9%93%AC%E6%9D%90%E8%B4%A8%E7%BD%91%E7%BB%9C)
-   [简单的雪](/documentation/zh-cn/unreal-engine/creating-layered-materials-in-unreal-engine#%E7%AE%80%E5%8D%95%E7%9A%84%E9%9B%AA)
-   [雪材质层的节点网络](/documentation/zh-cn/unreal-engine/creating-layered-materials-in-unreal-engine#%E9%9B%AA%E6%9D%90%E8%B4%A8%E5%B1%82%E7%9A%84%E8%8A%82%E7%82%B9%E7%BD%91%E7%BB%9C)
-   [分层材质](/documentation/zh-cn/unreal-engine/creating-layered-materials-in-unreal-engine#%E5%88%86%E5%B1%82%E6%9D%90%E8%B4%A8)
-   [分层材质网络](/documentation/zh-cn/unreal-engine/creating-layered-materials-in-unreal-engine#%E5%88%86%E5%B1%82%E6%9D%90%E8%B4%A8%E7%BD%91%E7%BB%9C)
-   [实例化分层材质](/documentation/zh-cn/unreal-engine/creating-layered-materials-in-unreal-engine#%E5%AE%9E%E4%BE%8B%E5%8C%96%E5%88%86%E5%B1%82%E6%9D%90%E8%B4%A8)
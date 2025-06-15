# 虚幻引擎顶点动画工具 - 时间轴网格 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/vertex-animation-tool---timeline-meshes-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:07:15.271Z

---

目录

![顶点动画工具 - 时间轴网格](https://dev.epicgames.com/community/api/documentation/image/907392e8-857b-4b22-9de4-e55e5f757789?resizing_type=fill&width=1920&height=335)

在下文中我们将讲述如何使用 3Ds Max 动画时间轴配合顶点动画工具创建存储任意给定 3D 网格的顶点位置的 2D 纹理。

## 3DS Max 用于时间轴动画网格的内容创建和设置

1.  首先在 **标准基本体（Standard Primitives）**中，在全局的 0,0,0 位置使用下列选项创建一个 **茶壶（Teapot）**。
    
    -   **半径（Radius）：**70.0
    -   **分段（Segments）：**5
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc99aeb2-992b-45f9-980b-22cbc5060047/vat_teapot_setup_00.png)
2.  然后从修改器列表将 **弯曲（Bend）**修改器应用到茶壶，再将 **方向（Direction）**设置为 **90**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d86f02b-56cf-481a-9bf5-6eee9c75010c/vat_teapot_bendmod_00.png)
3.  现在启用 **自动键（Auto Key）**，然后将 **时间滑块** 移动到 **10**，将 **弯曲修改器（Bend Modifier）**上的 **角度（Angle）**设置为 **\-50**，再将 **时间滑块** 移动到 **25**，将弯曲 **角度（Angle）**设置为 **50**。最后将 **时间滑块** 移动到 **35**，再将弯曲 **角度（Angle）**设置为 **0**。完成所有这些操作后，务必关闭 **自动键（Auto Key）**，以确保不会意外添加任何多余的键。
    
4.  现在茶壶已弯曲，打开顶点动画工具（如果尚未打开的话），将 **动画选项（Animation Options）**设置为 **动画网格（Animated Meshes）**，**动画结束（Anim End）**设置为 **35**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e46fb25b-4f43-4b15-85be-8a2a19973e2d/vat_tool_settings_setup.png)
5.  现在已经设置了正确的工具选项，按 **处理动画网格（Process Animated Meshes）**按钮开始纹理创建过程。 该过程进行到一半左右时将显示一个 Windows 对话框，询问存储所生成纹理的位置。 在此示例中，我们在桌面上放了一个名为 **Vertex\_Anims** 的文件夹，纹理保存到该文件夹。 完成后，桌面上的文件夹中应该有两个纹理文件。 一个是 **.EXR** 纹理，包含顶点位置数据；一个是 **.BMP** 纹理，包含茶壶法线信息。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3580d16d-55c8-4a93-bb85-2db3fa9db407/vat_output_textures.png)
6.  现在纹理已经创建，回到 3Ds Max，选择名称中添加了"**\_MorphExport**"的茶壶网格，将它以 .FBX 文件的形式导出到导出纹理的同一文件夹。将该网格命名为"**SM\_Teapot\_Bend\_00**"，在 FBX 选项中确保启用 **平滑组（Smoothing Groups）**，让所有其他设置保留默认值。
    

## 虚幻引擎内容设置

将所有内容从 3Ds Max 导出后，就该导入并设置这些内容，使其在虚幻引擎中能正确工作。请记住，**务必** 严格按照下文的说明完成下面列出的每一个步骤，否则内容有可能在虚幻引擎中无法正确工作。

### 纹理导入和设置

如果您不熟悉虚幻引擎纹理导入过程，请阅读 **[纹理](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine)** 文档了解更多信息。

首先需要完成的操作是将从 3Ds Max 导出的两个纹理导入虚幻引擎中。 为此，在 Windows 资源管理器中从这两个纹理的导出位置选中它们，将它们拖动到内容浏览器中，松开鼠标左键以触发导入过程。 进行此操作时，系统将显示一条警告消息，说明非 2 的幂的纹理将无法与流式或 Mip 贴图配合工作。 按 **是（Yes）**按钮忽略提示，继续执行导入过程。

导入每个纹理后，需要对它们进行非常具体的设置，以确保它们正确工作。 第一个要设置的纹理是包含顶点位置数据的 .EXR 纹理。 在内容浏览器中用 **鼠标左键** **双击** 此纹理将其打开，确保设置/启用下列选项。

-   确保"Mip 生成设置"（Mip Gen Settings）设置为 **无 Mip 贴图（No Mip Maps）**。
-   将"纹理组"（Texture Group）设置为 **UI**。
-   确保禁用 **SRGB**。
-   将"压缩设置"（Compression Settings）设置为 **TC\_HDR**。
-   将过滤器设置为 **最近（Nearest）**.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffa49f46-3cff-4659-b7c4-1861f0c2889d/vat_exr_texture_setup.png)

然后打开法线贴图纹理，确保设置/启用下列选项。

-   确保"Mip 生成设置"（Mip Gen Settings）设置为 **无 Mip 贴图（No Mip Maps）**。
-   将"纹理组"（Texture Group）设置为 **UI**。
-   确保禁用 **SRGB**。
-   将"压缩设置"（Compression Settings）设置为 **TC 矢量位移贴图（TC\_Vector Displacement Map）**。
-   将过滤器设置为 **最近（Nearest）**.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ddde3ddd-97f2-4f7f-80ea-2afdec311b49/vat_normal_texture_setup.png)

现在已经正确设置了纹理，务必在内容浏览器中按 **全部保存（Save All）**按钮保存所做的所有更改。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4438beb8-fcb6-412b-9a84-20dab1a55ab8/vat_save_all.png)

### 静态网格导入和设置

现在已经导入并设置了纹理，应该导入并设置茶壶静态网格了。 用与导入纹理相同的方式导入茶壶静态网格，在 Windows 资源管理器中先选择茶壶静态纹理，然后将其拖动到内容浏览器中，松开鼠标左键触发导入过程。 进行此操作时将显示下列对话框。在此对话框中确保设置/启用下列选项。

如果你不熟悉如何将静态网格导入虚幻引擎中，请查看 **[直接导入资产](/documentation/zh-cn/unreal-engine/importing-assets-directly-into-unreal-engine)** 文档了解更多相关信息。

-   禁用 **自动生成碰撞（Auto Generate Collision）**选项。
-   禁用 **移除退化（Remove Degenerates）**选项。
-   禁用 **生成光照贴图 UV（Generate Lightmap UVs）**选项。
-   启用 **组合网格（Combine Meshes）**选项。
-   禁用 **导入材质（Import Materials）**和 **导入纹理（Import Textures）**选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf795545-a070-426c-b608-b1eff21697c4/vat_sm_import_options.png)

设置完所有这些选项后，按"导入"（Import）按钮开始导入过程。 导入静态网格后，打开静态网格，确保启用/禁用下列选项。

-   启用 **使用全精度 UV（Use Full Precision UVs）**选项。
-   将 **距离场分辨率比例（Distance Field Resolution Scale）**设置为 0.0。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6b80c4d-1807-4dc3-ba78-784054613c1e/vat_sm_setup_options.png)

现在已经正确设置了静态网格，务必在静态网格编辑器中按 **应用更改（Apply Changes）**按钮，然后在内容浏览器中按 **全部保存（Save All）**按钮，以保存截至此时所做的所有更改。

### 虚幻引擎材质设置和使用

现在已经导入并正确设置了所有需要的内容，应该创建可使用内容的材质了。

如果您不熟悉材质在虚幻引擎中是如何工作的，请参阅 **[材质](/documentation/zh-cn/unreal-engine/unreal-engine-materials)** 文档了解更多信息。

1.  首先，用鼠标 **右键单击**，在 **创建基本资产（Create Basic Asset）**部分下选择 **材质（Material）**选项，创建一个新 **材质**。将该材质命名为 **MAT\_Vertex\_Animation**。
    
2.  然后打开 **MAT\_Vertex\_Animation** 材质，找到在上一步中导入内容浏览器的两个纹理。同时选中这两个 **纹理**，然后将它们从内容浏览器 **拖放** 到材质图中。
    
3.  然后选择 **主材质节点（Main Material Node）**，在 **细节面板（Details Panel）**中找到 **定制 UV 数目（Num Customized Uvs）**。找到 **定制 UV 数目（Num Customized Uvs）**输入后，输入值 **4**。现在您应该看到主材质节点上有 4 个新的定制 UV 输入，编号从 0 到 3。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/959908dc-73ca-4fa4-b809-f9150a9b90da/vat_cus_uvs.png)
4.  接下来，还是在主材质节点细节面板中，**取消选中** **切线空间法线（Tangent Space Normal）**选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ab7e514-c2c8-42ff-8b3c-d781e187beef/vat_uncheck_tan_normals.png)
5.  然后按住键盘上的 **1** 键，用 **鼠标左键** 在材质图中单击以放置一个常量参数节点。将常量的值设置为 **0.5**，然后将输出连接到主材质节点中的 **底色（BaseColor）**输入。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/250cd794-506d-436d-bbe6-43a6c4efe3eb/vat_add_const.png)
6.  现在该添加强化效果的材质函数了。为此，用鼠标在材质图中 **右键单击**，然后在显示的菜单中输入 **MS** 以显示 Maxscript 材质函数。然后用鼠标单击 **MS\_VertexAnimationTools\_MorphTargets** 材质函数，将其添加到材质图。
    
7.  现在已经将需要的所有纹理和材质函数添加到材质图，我们可以开始连接各项了，不过首先要同时选中两个纹理样本，在其中一个纹理上 **右键单击** 并选择 **转换为纹理对象（Convert To Texture Object）**选项，将它们转换为 **纹理对象**。
    
8.  下一步，将法线纹理对象的输出连接到 **变形法线 (T2d)（Morph Normal (T2d)）**输入。然后将 .EXR 纹理对象连接到 **变形纹理 (T2d)（Morph Texture (T2d)）** 输入。最后将 **MS\_VertexAnimationTools\_MorphTargets** 材质函数的输出连接到主材质节点上的相关输入。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1765367-fd1d-4b22-974b-61cfc07766a6/vat_wired_up.png)
9.  现在按住键盘上的 **1** 键，用 **鼠标左键** 在材质图中单击，再放置一个常量参数节点。添加该常量节点后，将其值设置为 51，将它连接到 **MS\_VertexAnimationTools\_MorphTargets** 材质函数上的 **变形目标数（Number of Morph Targets）**输入。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1445297-d2be-4f5f-8b2f-567b904e7976/vat_num_morph_targets.png)
    
    用于 **变形目标数（Number of Morph Targets）** 输入的数字来自 .EXR 和法线纹理的 Y 值。一定要使用来自纹理的数字，因为使用其他任何数字都会导致效果在虚幻引擎中与在 3Ds Max 中不同。
    
10.  所有各项连接完毕后，按 **应用（Apply）**按钮编译材质，然后按 **保存（Save）**按钮保存工作，完成后关闭材质图编辑器。
    
11.  在 **内容浏览器** 中选择导入的茶壶网格，将它从内容浏览器拖动到关卡中。然后当茶壶网格位于关卡中时，选择已经创建的材质 **MAT\_Vertex\_Animation**，将它从内容浏览器拖动到关卡中放置的茶壶网格上，以应用到茶壶网格。
    

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [tool](https://dev.epicgames.com/community/search?query=tool)
-   [deformer](https://dev.epicgames.com/community/search?query=deformer)
-   [3ds](https://dev.epicgames.com/community/search?query=3ds)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [3DS Max 用于时间轴动画网格的内容创建和设置](/documentation/zh-cn/unreal-engine/vertex-animation-tool---timeline-meshes-in-unreal-engine#3dsmax%E7%94%A8%E4%BA%8E%E6%97%B6%E9%97%B4%E8%BD%B4%E5%8A%A8%E7%94%BB%E7%BD%91%E6%A0%BC%E7%9A%84%E5%86%85%E5%AE%B9%E5%88%9B%E5%BB%BA%E5%92%8C%E8%AE%BE%E7%BD%AE)
-   [虚幻引擎内容设置](/documentation/zh-cn/unreal-engine/vertex-animation-tool---timeline-meshes-in-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E5%86%85%E5%AE%B9%E8%AE%BE%E7%BD%AE)
-   [纹理导入和设置](/documentation/zh-cn/unreal-engine/vertex-animation-tool---timeline-meshes-in-unreal-engine#%E7%BA%B9%E7%90%86%E5%AF%BC%E5%85%A5%E5%92%8C%E8%AE%BE%E7%BD%AE)
-   [静态网格导入和设置](/documentation/zh-cn/unreal-engine/vertex-animation-tool---timeline-meshes-in-unreal-engine#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E5%AF%BC%E5%85%A5%E5%92%8C%E8%AE%BE%E7%BD%AE)
-   [虚幻引擎材质设置和使用](/documentation/zh-cn/unreal-engine/vertex-animation-tool---timeline-meshes-in-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E6%9D%90%E8%B4%A8%E8%AE%BE%E7%BD%AE%E5%92%8C%E4%BD%BF%E7%94%A8)
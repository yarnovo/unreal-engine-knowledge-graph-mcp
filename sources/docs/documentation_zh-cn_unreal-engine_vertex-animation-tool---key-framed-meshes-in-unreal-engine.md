# Vertex Animation Tool - Key Framed Meshes in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/vertex-animation-tool---key-framed-meshes-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:07:05.382Z

---

目录

![顶点动画工具 - 关键帧网格](https://dev.epicgames.com/community/api/documentation/image/7826c1c6-f2a5-4a99-b414-0a41bb202211?resizing_type=fill&width=1920&height=335)

您也可以将顶点动画工具用于不使用 3Ds Max 中的动画时间轴的网格。 一般来说，使用此方法的网格动画是从其他 3D 软件包（例如 Maya 或 Blender）逐帧导出的。 在本文中我们将介绍如何使用此方法，以及您需要了解的所有设置差异。

## 3Ds Max 内容创建

请注意，虽然我们在这个示例中使用了 3Ds Max，但在 3Ds Max 中创建内容和设置的方法与在其他 3D 软件包（例如 Maya 或 Blender）中设置内容的方法并无不同。

1.  首先在 3Ds Max 中创建一个新场景，然后用下列设置创建一个茶壶，将它放在全局的 0,0,0 位置。
    -   **半径（Radius）：**70.0
    -   **分段（Segments）：**5
2.  然后从 **修改器列表** 将一个 **融化修改器** 添加到茶壶网格。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/086caa88-c71d-4a80-b3f7-eed8cb86961e/vat_kfm_teapot_melt.png)
3.  现在按住 **Shift** 键，用鼠标沿 X 轴移动茶壶，生成一个网格副本。 调整茶壶副本的位置，使融化修改器的橙色边界框不与网格相交。 当茶壶副本就位时，放开鼠标和 shift 键，系统将显示克隆选项。 确保将 **对象（Object）**设置为 **副本（Copy）**，然后将 **副本数（Number of Copies）**设置为 **4**，按 **确定（Ok）**按钮创建副本。
    
4.  然后选择第二个茶壶网格，将融化修改器中的 **融化量（Melt Amount）**设置为 **25**。 然后选择一排中的下一个茶壶，将融化修改器中的 **融化量（Melt Amount）**设置为 **50**，再将下一个设置为 **75**，最后一个茶壶的 **融化量（Melt Amount）**设置为 **100**。
    
5.  现在所有的茶壶都设置了一定的变形，选择所有茶壶，然后在 3Ds Max 视口中用鼠标 **右键单击**，选择 **转换为：（Convert To:）**\> **转换为可编辑多边形（Convert to Editable Poly）**。
    
    您必须将要用于此工具的所有网格转换为可编辑多边形。此工具 **不能** 处理其他任何网格类型。
    
6.  现在茶壶网格都已转换为可编辑多边形，选择所有网格并将它们移动到全局中的 0,0,0 位置。 在茶壶网格位于全局中心后，取消选择茶壶网格，然后按将要播放动画的顺序选择它们。 在此示例中，我们要先选择 Teapot001，然后选择 Teapot002，以此类推，直到选中全部五个网格。
    
    序列描画器工具要求您按动画中播放的顺序选择网格。如果不这么做，将导致在虚幻引擎中播放的动画与其应该替换的骨骼驱动动画不同步。
    
7.  现在茶壶已处于全局中心，并已按动画播放顺序选择，应该运行 **序列描画器** 脚本了。 为此，您只需在工具的 **序列描画器（Sequence Painter）**部分按 **描画选择序列（Paint Selection Sequence）**按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07e6813c-f721-41df-be9b-d5fe4aeb1b73/vat_kfm_paint_seq.png)
    
    完成 **描画选择序列** 所用的时间取决于网格的顶点数，一般是很快的。
    
8.  现在位置数据已经保存到茶壶的 UV，应该导出茶壶网格，以便在虚幻引擎中使用了。在导出茶壶网格时，使用您会用于其他任何静态网格的相同设置，并确保启用 **平滑组（Smoothing Groups）**。在此示例中，我们给茶壶网格指定了名称 **SM\_Teapot\_PSS.FBX**。

## 虚幻引擎设置

从 3Ds Max 导出茶壶网格后，现在该导入茶壶网格并设置，使其在虚幻引擎中也能产生相同的效果。

1.  首先将茶壶网格 **SM\_Teapot\_PSS.FBX** 从其导出位置拖动到 **内容浏览器** 中，确保启用/禁用下列选项。
    
    -   禁用 **自动生成碰撞（Auto Generate Collision）**选项。
    -   禁用 **移除退化（Remove Degenerates）**选项。
    -   禁用 **生成光照贴图 UV（Generate Lightmap UVs）**选项。
    -   启用 **组合网格（Combine Meshes）**选项。
    -   禁用 **导入材质（Import Materials）**和 **导入纹理（Import Textures）**选项。
        
        ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/500fad76-bde9-42dd-b632-c3c3b8154927/vat_sm_import_options.png)
2.  导入茶壶网格后，请在内容浏览器中使用 **鼠标左键双击** 该网格，以将其打开。 打开网格后，启用 **使用全精度 UV（Use Full Precision UVs）**选项，将 **距离场分辨率比例（Distance Field Resolution Scale）**设置为 **0.0**，然后按 **应用更改（Apply Changes）**按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01c528e1-e504-412d-addc-0030bdc7d6b5/vat_kfm_ue4_setup.png)
3.  现在已正确设置茶壶网格，在内容浏览器中创建一个新 **材质**，将其命名为 **MAT\_Sequance\_Painter**，然后打开该材质。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74646396-e5e3-4752-8dc9-2e98d4b94907/vat_kfm_create_material.png)
4.  打开材质后，按住键盘上的 **1** 键，用鼠标 **左键单击** 材质图内部，以放置两个 **常量参数** 节点。 设置其中一个常量参数节点的值，将它连接到主材质节点上的 **底色（Base Color）**输入。然后将另一个常量参数节点的值设置为 5。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7d7f720-8c36-4dd0-b91d-6e3c3fffe093/vat_kfm_set_values.png)
5.  接下来，使用鼠标在材质图中 **右键单击** 以显示搜索菜单，然后使用 MS 作为搜索词搜索 **MS\_SequencePainter\_SequenceFlipbook** 材质函数。 找到 MS\_SequencePainter\_SequenceFlipbook 材质函数后，用鼠标左键单击它，将其添加到材质图。
    
6.  现在已添加了正确的材质函数，将 **MS\_SequencePainter\_SequenceFlipbook** 的输出连接到主材质节点的"全局位置偏移"（World Position Offset）输入，然后将其他标量参数连接到 MS\_SequencePainter\_SequenceFlipbook 材质函数节点的 **帧数（Number Of Frames）**输入。
    
7.  现在所有各项已连接完毕，按 **应用（Apply）**按钮编译材质，然后按 **保存（Save）**按钮。 完成后，您可关闭材质图编辑器。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e818bfd4-75db-4e68-833a-35d3a4b546df/vat_compile_save.png)
8.  创建、编译并保存材质后，将茶壶网格从内容浏览器拖动到关卡中，然后将刚刚为其创建的 **材质** 从内容浏览器拖动到关卡中的网格上。 完成后，你就会看到网格"播放"动画。
    

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [tool](https://dev.epicgames.com/community/search?query=tool)
-   [deformer](https://dev.epicgames.com/community/search?query=deformer)
-   [3ds](https://dev.epicgames.com/community/search?query=3ds)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [3Ds Max 内容创建](/documentation/zh-cn/unreal-engine/vertex-animation-tool---key-framed-meshes-in-unreal-engine#3dsmax%E5%86%85%E5%AE%B9%E5%88%9B%E5%BB%BA)
-   [虚幻引擎设置](/documentation/zh-cn/unreal-engine/vertex-animation-tool---key-framed-meshes-in-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E8%AE%BE%E7%BD%AE)
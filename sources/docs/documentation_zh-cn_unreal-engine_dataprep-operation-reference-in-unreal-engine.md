# 虚幻引擎Dataprep操作参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:05:10.916Z

---

目录

![Visual Dataprep操作参考](https://dev.epicgames.com/community/api/documentation/image/5d9e5227-b5e7-4ace-92cb-017921dd76c9?resizing_type=fill&width=1920&height=335)

本页介绍可在Visual Dataprep系统中修改资产和场景元素的各个 **操作（Operations）** 块。

每种类型的 **操作块（Operations block）** 都封装了虚幻编辑器可对3D数据执行的一种特定修改。Visual Dataprep系统在Dataprep图表中执行各项作业时，会对所有匹配 **Select By** 块所设定条件的资产或Actor执行该项作业中已定义的各个操作。更多背景信息请参见[Dataprep概览](/documentation/zh-cn/unreal-engine/dataprep-overview-in-unreal-engine)。

## On Actor

**On Actor** 操作仅应用于与相关步骤所设的 **Select By** 条件匹配的Actor。这表示仅可看到Dataprep预览UI右侧 **大纲视图预览（Outliner Preview）** 面板中列示的项目。若 **Select By** 条件匹配其他场景元素，比如Dataprep预览UI左侧 **内容浏览器预览（Content Browser Preview）** 面板中列示的纹理、材质和静态网格体资产，则 **On Actor** 操作对这些元素无效。

### 添加标签

此操作会将你指定的标签数组添加给所有些符合此步骤中 **选择依据（Select By）** 条件的Actor或组件。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6873e5be-2e34-4778-a120-64e5d18af824/add-tags.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6873e5be-2e34-4778-a120-64e5d18af824/add-tags.png)

点击查看大图

完成该块后，在 **大纲视图预览（Outliner Preview）** 中选择Actor，在 **细节（Details）** 面板中查找，可找到标签列表。在 **Actor** 类别下，展开高级选项，然后查找 **标签（Tags）** 设置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02a58af8-d7d5-41f1-8328-4e3f88e1ce1e/dataprep-added-actor-tags.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02a58af8-d7d5-41f1-8328-4e3f88e1ce1e/dataprep-added-actor-tags.png)

点击查看大图

### 添加到层

此操作将所有符合这一步骤设置的 **Select By** 条件的静态网格体Actor添加到你指定的层中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/153618e2-10fd-472f-a203-9739308b3a38/addtolayer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/153618e2-10fd-472f-a203-9739308b3a38/addtolayer.png)

点击查看大图

### 紧凑场景图

对于每个与此步骤所设的 **Select By** 条件匹配的静态网格体Actor，若该Actor在场景中无任何视觉效果，或其在场景层级中的所有后代在场景中都无任何视觉效果，则此操作会删除该Actor。效果是汰除场景层级中的不必要元素，而不影响场景中的视觉对象。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2edb931-888e-4613-9191-a70ff84bb058/compactscenegraph.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2edb931-888e-4613-9191-a70ff84bb058/compactscenegraph.png)

点击查看大图

### 创建代理网格体

此操作会收集所有符合此步骤所设 **Select By** 条件的静态网格体Actor和组件，并使用[代理几何体工具](/documentation/zh-cn/unreal-engine/proxy-geometry-tool-in-unreal-engine)将几何体合并到新网格体中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c48c37e-cf5d-4d29-93a6-e108581b09c2/createproxymesh.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c48c37e-cf5d-4d29-93a6-e108581b09c2/createproxymesh.png)

点击查看大图

设置

说明

**新Actor标签（New Actor Label）**

指定根据合并几何体创建的新Actor的名称。

**质量（Quality）**

已生成的代理模型的几何体质量水平。值越小，详细程度越低，但渲染效率会变高。值越大，详细程度越高，越贴近原始几何体，但渲染效率会降低。

### 合并

此操作会找出所有符合 **Select By** 条件的静态网格体Actor和组件并获取它们的几何体，然后将这些几何体合并到一个新的网格体中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f64a1afb-0a81-4b62-812c-0458a2b207a4/merge.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f64a1afb-0a81-4b62-812c-0458a2b207a4/merge.png)

点击查看大图

设置

说明

**新Actor标签（New Actor Label）**

指定根据合并几何体创建的新Actor的名称。

**以零为枢轴点（Pivot Point at Zero）**

若要合并网格体，以将其枢轴点设为世界原点，可启用此设置。若禁用，枢轴将位于第一个合并的组件上。

### 随机偏移变换

此操作会对所有符合此步骤中设置的 **选择依据（Select By）** 条件的Actor的3D位置、旋转或缩放应用随机偏移效果。若场景中存在一些临时放置的元素，则可使用此操作将这些元素分散开来，或为元素设定不同的大小和旋转度。

举例而言，室外建筑场景可能包含一些临时放置的对象，用于表示树木或灌木丛等建筑配景对象。在Dataprep图表中，你可能需要将全部这类临时对象替换为已经导入到项目中的其他自定义3D资产。但这样可能生成一排外观完全相同的树木，会显得不够真实。通过对树木的位置、旋转度和缩放应用随机偏移，可快速创建更多样化和逼真的结果，而无需手动调整对象。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67a11fd5-8629-45a3-9a4c-ab46fcdba07d/random-offset-transform.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67a11fd5-8629-45a3-9a4c-ab46fcdba07d/random-offset-transform.png)

点击查看大图

设置

说明

**变换类型（Transform Type）**

每个 **随机偏移变换（Random Offset Transform）** 块只能将偏移应用于下述其中一种属性：

-   **位置（Location）**，用于调整对象在3D空间中的位置。
-   **旋转（Rotation）**，用于调整对象的朝向。
-   **缩放（Scale）**，用于调整对象的大小。

**参考系（Reference Frame）**

确定使用哪个参考系解释 **最小值（Min）** 和 **最大值（Max）** 设置中的轴：

-   **全局（Global）** 使用世界空间来解释 **最小值（Min）** 和 **最大值（Max）**，偏移效果相对的是全局空间中的3D轴。
-   **相对（Relative）** 使用局部空间来解释 **最小值（Min）** 和 **最大值（Max）**，偏移效果相对的是对象自身的枢轴点。

**最小值（Min）** 和 **最大值（Max）**

沿3D空间的三个轴分别设置随机偏移范围。针对此块处理的每个Actor，其将生成一个处于 **最小值（Min）** 和 **最大值（Max）** 之间的随机数字。

### 设置网格体

对于所有符合此 **Select By** 条件的静态网格体Actor或组件，此操作会将该Actor或组件引用的静态网格体资产更改为你在设置中指定的其他静态网格体资产。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afa82aba-bcc8-40c6-8240-5cecca07443c/setmesh.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afa82aba-bcc8-40c6-8240-5cecca07443c/setmesh.png)

点击查看大图

设置

说明

**静态网格体（Static Mesh）**

要让Actor实例化的静态网格体资产，用以替代现有静态网格体。可以使用Dataprep编辑器的 **内容浏览器预览（Content Browser Preview）** 面板中的任何静态网格体替代，也可以使用项目中现存的任何静态网格体资产。

此操作对尚未引用静态网格体资产的Actor无效。例如，若场景层级中有一个不含静态网格体的空Actor，则将无法使用此操作向该Actor添加新静态网格体。

### 设置元数据

此操作会找到所有符合此步骤中的 **选择依据（Select By）** 条件的Actor和组件，然后为其Datasmith元数据添加一个键值对数组。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1a06de2-f4f7-4ce6-b490-dd07fc99f1fc/set-metadata.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1a06de2-f4f7-4ce6-b490-dd07fc99f1fc/set-metadata.png)

点击查看大图

执行完该块后，你可以在 **世界大纲视图预览（World Outliner Preview）** 中选中Actor或组件，然后在 **资产用户数据（Asset User Data）** 类别的 **细节（Details）** 面板中找到元数据列表。

欲知更多信息，请参见[使用Datasmith元数据](/documentation/zh-cn/unreal-engine/using-datasmith-metadata-in-unreal-engine)。

### 设置移动性

对于每个与此步骤所设的 **Select By** 条件匹配的Actor或组件，此操作会设置该Actor的 **移动性（Mobility）** 的值。

**移动性（Mobility）** 设置对光源Actor的影响与对静态网格体Actor的影响略有不同。欲了解详细解释，参见[Actor移动性](/documentation/zh-cn/unreal-engine/actor-mobility-in-unreal-engine)。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b93d18bf-b09a-429d-9851-51b0a1990f4a/setmobility.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b93d18bf-b09a-429d-9851-51b0a1990f4a/setmobility.png)

点击查看大图

设置

说明

**移动性类型（Mobility Type）**

要为Actor的 **移动性（Mobility）** 设置的值。

在 **详细信息（Details）** 面板中找到 **移动性（Mobility）** 设置：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/893ab563-0586-47ef-bb2f-722538703842/actormobility.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/893ab563-0586-47ef-bb2f-722538703842/actormobility.png)

点击查看大图

### 在位置处生成Actor

针对每个符合此步骤所设的 **选择依据（Select By）** 条件的Actor，此操作会在相同的3D坐标处生成新Actor。新生成的Actor是你在 **选定资产（Selected Asset）** 设置中指定的资产的实例。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd187377-8e89-41d7-b07b-af2472b9568a/spawn-actors-at-location.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd187377-8e89-41d7-b07b-af2472b9568a/spawn-actors-at-location.png)

点击查看大图

设置

说明

**选定资产（Selected Asset）**

要生成新实例的项目中的资产。

## On Asset

**On Asset** 操作仅应用于那些符合你在相关步骤中所设置的 **选择依据（Select By）** 条件的资产。这表示仅可看到Dataprep预览UI左侧的 **内容浏览器预览（Content Browser Preview）** 面板中列出的项目。若 **选择依据（Select By）** 条件匹配其他场景元素，比如Dataprep预览UI右侧的 **大纲视图预览（Outliner Preview）** 面板中列出的Actor，则 **On Asset** 操作对这些元素无效。

### 输出到文件夹

此操作会找到所有符合你在此步骤中所设的 **选择依据（Select By）** 条件的资产，然后将其移动到拥有指定名称的子文件夹中。提交Dataprep图表的结果后，你可以使用此块来自定义导入资产在项目内容浏览器中的组织方式。

执行Dataprep图表时，**输出到文件夹（Output to Folder）** 块的结果不会显示在Dataprep编辑器的 **内容浏览器预览（Content Browser Preview）** 面板中。提交Dataprep图表后，仅能在项目的 **内容浏览器（Content Browser）** 中看到结果。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7ee3f08-a6f9-4cd2-88b6-a27e6c709e1d/output-to-folder.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7ee3f08-a6f9-4cd2-88b6-a27e6c709e1d/output-to-folder.png)

点击查看大图

设置

说明

**文件夹名称（Folder Name）**

提交Dataprep图表时，要放置所选资产的子文件夹的名称。

你可在Dataprep图表中使用任意数量的 **输出到文件夹（Output to Folder）** 块。若不同的块使用了相同的 **文件夹名称（Folder Name）** 设置，则由这些块处理的资产会被收集到同一个文件夹中。这样就能将不同操作中由不同过滤器产生的资产重定向到内容浏览器（Content Browser）中的同一文件夹中。通过将多个 **输出到文件夹（Output to Folder）** 块与不同的过滤器配对使用，你就能按照你的想法，在 **内容浏览器（Content Browser）** 中以任意方式组织资产。

举例而言，在这个例子中，在Dataprep编辑器右上角的设置面板中，设置的主文件夹为 **/Content/Motorbike**。此图表中的第一个操作将获取三角形少于1000个的所有静态网格体资产，并将其移动到名为 **LowPoly** 的子文件夹中。第二个操作将获取三角形多于1000个的所有其他静态网格体，并将其移至名为 **HighPoly** 的子文件夹中。最后两个操作将获取所有材质和所有材质实例，并将其移动到名为 **表面（Surfaces）** 的子文件夹中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e96b885f-1480-4b52-9db6-c73f79e93fa9/path-example-graph.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e96b885f-1480-4b52-9db6-c73f79e93fa9/path-example-graph.png)

点击查看大图

提交Dataprep图表后，内容浏览器（Content Browser）将出现以下目录结构：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/429a0ede-5695-4f6d-8078-9c49f98d2cee/path-example-result.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/429a0ede-5695-4f6d-8078-9c49f98d2cee/path-example-result.png)

点击查看大图

那些在Datasmith默认导入过程中创建的 **几何体（Geometries）** 和 **材质（Materials）** 子文件夹仍会被创建，但在这种情况下，这些子文件夹将是空的。所有资产均已重新分配到新的 **HighPoly**、**LowPoly** 和 **Surfaces** 子文件夹中。

### 替换资产引用

此块将识别传入对象列表中的 *第一个* 资产。然后，尝试将输入列表中 *其他* 资产的所有引用替换为第一个资产的引用。

举例而言，假设输入列表中的第一个对象是名为 **椅子** 的静态网格体资产。该块将浏览输入列表中的所有其他对象，以查找其他静态网格体资产，例如 **桌子**、**长凳** 和 **梳妆台**。然后，将在导入场景中找到的所有 **桌子**、**长凳** 和 **梳妆台** 引用替换为 **椅子** 引用，*并* 完全删除 **桌子**、**长凳** 和 **梳妆台** 资产。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38563fa5-6d71-417e-9ed3-35d7763746f6/replace-asset-references.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38563fa5-6d71-417e-9ed3-35d7763746f6/replace-asset-references.png)

点击查看大图

### 设置最大纹理尺寸

默认情况下，Datasmith会将导入纹理的尺寸缩放为2的幂。此方法设置的数值会限制纹理在游戏中的最大尺寸，但不会影响纹理导入时的尺寸。

**最大纹理尺寸（Max Texture Size）** 的效果类似任何其他纹理上的 **最大纹理尺寸（Max Texture Size）**，它会将你输入的数值近似为2的幂。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a375fd3-2e2f-4fc0-b60f-8da2d6aad68d/set-max-texture-size.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a375fd3-2e2f-4fc0-b60f-8da2d6aad68d/set-max-texture-size.png)

点击查看大图

## On Mesh

**On Mesh** 操作仅应用于静态网格体资产。

-   若 **Select By** 条件与 **内容浏览器预览（Content Browser Preview）** 面板中 **几何体（Geometries）** 文件夹下列示的任何静态网格体资产匹配，此操作将应用于这些资产。
-   若 **Select By** 条件与 **大纲视图预览（Outliner Preview）** 中任何引用静态网格体资产的Actor匹配，此操作还将应用于这些静态网格体资产。
-   若 **Select By** 条件与任何其他类型的场景元素匹配，比如Actor、纹理或材质，则 **On Mesh** 操作对这些元素无效。

### 烘焙变换

对于与你为此步骤设置的 **Select By** 条件匹配的每个静态网格体Actor，此操作可通过将静态网格体Actor的变换直接烘焙到其引用的网格体来创建新网格体，并用此新网格体替换静态网格体Actor。此操作提供几个选项：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d4d194e-ea8e-4ee5-8a88-1f7c332dd02c/baketransform.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d4d194e-ea8e-4ee5-8a88-1f7c332dd02c/baketransform.png)

点击查看大图

设置（Setting）

说明（Description）

**烘焙旋转（Bake Rotation）**

将当前旋转作为操作的一部分烘焙。默认启用。

**烘焙缩放（Bake Scale）**

确定操作如何处理烘焙缩放，并包括以下选项：

-   **烘焙全部缩放（Bake Full Scale）**：烘焙所有缩放信息，以便网格体在所有轴上的缩放为1
-   **烘焙非均匀缩放（Bake Non Uniform Scale）**：烘焙非均匀缩放信息，以便网格体具有均匀缩放。
-   **不烘焙缩放（Do Not Bake Scale）**：不会作为操作的一部分烘焙缩放。

**重定位中心点（Recenter Pivot）**

转译新网格体的几何形状，以便将静态网格体Actor平移放在中心位置。

### 翻转面

此操作会找到所有符合此步骤中 **选择依据（Select By）** 条件的静态网格体，并翻转网格体中所有三角形的朝向。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5fb0291-9324-4970-8ba8-277adc280023/flip-faces.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5fb0291-9324-4970-8ba8-277adc280023/flip-faces.png)

点击查看大图

该块有助于翻转在源应用程序中创建的网格体的朝向。这些应用程序在后向三角形可视性的规定上通常有所不同。但请注意，该操作并不具有选择性： *所有* 三角形的朝向都将翻转。如果静态网格体中的三角形在朝向上有些不一致，有些可见，有些不可见，则你可能还需做一些其他更改，例如在静态网格体编辑器中手动翻转面，或使用已启用 **双面（Two Sided）** 选项的材质。

### 生成展开的UV

对于任何与此步骤所设的 **Select By** 条件匹配的静态网格体，此操作将网格体几何体展开成2D UV贴图并将该贴图保存到静态网格体资产的指定UV通道中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/798fed40-4e67-4722-8c28-f6aaf72c1aef/generateunwrappeduvs.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/798fed40-4e67-4722-8c28-f6aaf72c1aef/generateunwrappeduvs.png)

点击查看大图

设置

说明

**通道选择（Channel Selection）**

确定生成的UV贴图保存到哪个UV通道。**第一个空通道（First Empty Channel）** 将展开的UV保存在第一个空UV通道。**指定通道（Specify Channel）** 将展开的UV保存在 **UV通道（UV Channel）** 设置所标识的通道内。

**UV通道（UV Channel）**

**通道选择（Channel Selection）** 设为 **指定通道（Specify Channel）** 时，使用此设置确定展开的UV保存到的UV通道的索引。

**角度阈值（Angle Threshold）**

确定两个相邻面在展开之后仍保持连接时的最大角度。增大此值会减少单独UV"岛状区"的数量，使更多相邻三角形保持连接，并减少会导致纹理贴图断开的接缝数量。但由于三角形可能需要在2D空间中更积极地调整大小，以保持与相邻三角形的连接，因此这也会导致展开的纹理更加失真。

### 重新网格化

对于每个与你为此步骤所设的 **选择依据（Select By）** 条件匹配的静态网格体，此操作使用各向同性重新网格化，以便达到与你指定的目标值匹配的三角形数。此操作提供几个选项：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a313d3d3-359b-4c45-85da-09206a3c2fd7/remesh.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a313d3d3-359b-4c45-85da-09206a3c2fd7/remesh.png)

点击查看大图

设置

说明

**目标三角形数量（Target Triangle Count）**

指定新网格体的目标三角形数量。

**平滑率（Smoothing Rate）**

在重新网格化过程中应用指定数量的顶点平滑。范围为0至1。

**丢弃属性（Discard Attributes）**

如果设置为True，则丢弃现有的UV和法线。

**重新网格化类型（Remesh Type）**

确定重新网格化过程中应用多少通道：

-   **标准（Standard）**：在整个网格体上应用一个通道，然后仅重新网格化已更改边缘。
-   **完整通道（Full Pass）**：在整个网格体上应用多个完整通道。这将启用重新网格化迭代选项，你可以指定工具制作的增量通道数量。
-   **法线流（Normal Flow）**：在整个网格体上应用一个通道，然后仅重新网格化已更改边缘。使用法线流将三角形与原始输入网格体对齐。

**网格体边界（Mesh Boundary）**

确定如何保留开放网格体的边界边缘：

-   **固定（Fixed）**：不会分离或折叠边界边缘。
-   **调整（Refine）**：根据需要分离和/或折叠边界边缘。
-   **自由（Free）**：边界边缘是分离的，但不会折叠。

**组边界（Group Boundary）**

确定如何保留多边形组的边界边缘：

-   **固定（Fixed）**：不会分离或折叠边界边缘。
-   **调整（Refine）**：根据需要分离和/或折叠边界边缘。
-   **自由（Free）**：边界边缘是分离的，但不会折叠。

**材质边界（Material Boundary）**

确定如何保留材质区域的边界边缘：

-   **固定（Fixed）**：不会分离或折叠边界边缘。
-   **调整（Refine）**：根据需要分离和/或折叠边界边缘。
-   **自由（Free）**：边界边缘是分离的，但不会折叠。

### 设置凸包碰撞

对于每个与此步骤所设的 **Select By** 条件匹配的静态网格体，此操作将静态网格体的碰撞替换为由多个体积或 *凸包* 组成的新凸包分解。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/257e2333-706e-4434-b655-893c4ac5df3e/setconvexcollision.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/257e2333-706e-4434-b655-893c4ac5df3e/setconvexcollision.png)

点击查看大图

设置

说明

**凸包数量（Hull Count）**

要创建的凸包体积的最大数量。

**凸包最大顶点数（Max Hull Verts）**

任何已生成的凸包顶点最大数量。

**凸包精确度（Hull Precision）**

生成碰撞体积时要使用的体素数量。

### 设置LOD组

对于每个与此步骤所设的 **Select By** 条件匹配的静态网格体，此操作将该静态网格体的现有LOD替换为指定组的设置所设的新LOD。

这些LOD组与在静态网格体编辑器UI中启用自动LOD生成时可设置的LOD组相同。详情请查件[设置自动LOD生成](/documentation/zh-cn/unreal-engine/static-mesh-automatic-lod-generation-in-unreal-engine#%E4%BD%BF%E7%94%A8lod%E7%BB%84)。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb0a6482-1e89-4a84-8bdd-563ba87b6132/setlodgroup.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb0a6482-1e89-4a84-8bdd-563ba87b6132/setlodgroup.png)

点击查看大图

设置

说明

**LOGGroupName**

LOD组的名称，该组定义此静态网格体要使用的设置。

### 设置LOD

对于每个与此步骤所设的 **Select By** 条件匹配的静态网格体，此操作将该静态网格体的现有LOD替换为指定降低设置所设的新LOD。

这些降低设置与在静态网格体编辑器UI中启用自动LOD生成时可设置的降低设置相同。详情参见[设置自动LOD生成](/documentation/zh-cn/unreal-engine/static-mesh-automatic-lod-generation-in-unreal-engine#%E6%89%8B%E5%8A%A8%E5%88%9B%E5%BB%BAlod)。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffa7d5b6-a7b3-4e56-87b1-8a52dabea588/setlods.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffa7d5b6-a7b3-4e56-87b1-8a52dabea588/setlods.png)

点击查看大图

设置

说明

**自动调整屏幕大小（Auto Screen Size）**

启用后，自动计算LOD切换时的屏幕大小。

**降低设置（Reduction Settings）**

一组降低设置，定义要创建的详细层级的数量，以及每个详细层级应包含的三角形百分比。

### 设置简单碰撞

对于每个与此步骤所设的 **Select By** 条件匹配的静态网格体，此操作将该静态网格体的现有碰撞替换为指定形状的简单碰撞体积。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a47e247c-81c4-40db-a3ed-bee695ed0c40/setsimplecollision.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a47e247c-81c4-40db-a3ed-bee695ed0c40/setsimplecollision.png)

点击查看大图

设置

说明

**形状类型（Shape Type）**

定义静态网格体要设置的碰撞体积的形状。

### 设置静态光照

对于每个与此步骤所设的 **Select By** 条件匹配的静态网格体，此操作设置各个选项，以控制静态网格体与烘焙照明的交互方式。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd730963-ee6b-4cbb-b2a1-2baa8e6a399f/setupstaticlighting.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd730963-ee6b-4cbb-b2a1-2baa8e6a399f/setupstaticlighting.png)

点击查看大图

设置

说明

**启用光照贴图UV生成（Enable Lightmap UV Generation）**

启用后，操作生成静态网格体的光照贴图UV。

**分辨率理想比率（Resolution Ideal Ratio）**

静态网格几何体比例与用于静态网格体的光照贴图分辨率之间的比率。此值越低，光照贴图分辨率越高；这会提高烘焙照明的质量，但会增加内存需求。

### 简化网格体

对于每个与此步骤所设的 **选择依据（Select By）** 条件匹配的静态网格体，此操作将静态网格体简化为其原始三角形数量的设定百分比。此操作提供几个选项：

设置（Setting）

说明（Description）

**目标百分比（Target Percentage）**

原始三角形数的目标百分比

**丢弃属性（Discard Attributes）**

如果设置为True，则丢弃现有的UV和法线。

**网格体边界（Mesh Boundary）**

确定如何保留开放网格体的边界边缘：

-   **固定（Fixed）**：不会分离或折叠边界边缘。
-   **调整（Refine）**：根据需要分离和/或折叠边界边缘。
-   **自由（Free）**：边界边缘是分离的，但不会折叠。

**组边界（Group Boundary）**

确定如何保留多边形组的边界边缘：

-   **固定（Fixed）**：不会分离或折叠边界边缘。
-   **调整（Refine）**：根据需要分离和/或折叠边界边缘。
-   **自由（Free）**：边界边缘是分离的，但不会折叠。

**材质边界（Material Boundary）**

确定如何保留材质区域的边界边缘：

-   **固定（Fixed）**：不会分离或折叠边界边缘。
-   **调整（Refine）**：根据需要分离和/或折叠边界边缘。
-   **自由（Free）**：边界边缘是分离的，但不会折叠。

### 焊接边缘

对于每个与此步骤所设的 **Select By** 条件匹配的静态网格体，此操作在指定的公差范围内结合顶点对。如果启用了 **仅当唯一（If Only Unique）**，则此操作仅合并成对的等效边缘。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa922b52-7fc7-4181-bba9-829bef72566b/weldedges.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa922b52-7fc7-4181-bba9-829bef72566b/weldedges.png)

点击查看大图

### 设置碰撞复杂度

对于所有符合此 **Select By** 条件的静态网格体，该方法会将网格体的碰撞复杂度设置为你指定的数值。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e188f196-92d5-4eb7-98d1-462854a4a8a9/set-collision-complexity.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e188f196-92d5-4eb7-98d1-462854a4a8a9/set-collision-complexity.png)

点击查看大图

你可以从以下四个选项中选择：

-   项目默认值，由项目设置定义
-   简单和复杂（Simple and Complex）
-   使用简单碰撞作为复杂（Use Simple Collision as Complex）
-   使用复杂碰撞作为简单（Use Complex Collision as Simple）

### 平面剪切

该方法要求你启用 **Dataprep几何体运算（Dataprep Geometry Operations）** 插件。

对于所有符合 **Select By** 条件的静态网格体，该方法都会裁剪或移除它的一些几何体，比如执行盒体化操作。

涉及实例化几何体时，可能会出现两种情况：

-   如果裁剪了全部几何体，则不会实例化。
-   如果裁剪了部分几何体，会为切割网格体此前的实例单独生成一个Actor。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79432f58-e233-40f9-b38c-10083b191de8/plane-cut.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79432f58-e233-40f9-b38c-10083b191de8/plane-cut.png)

点击查看大图

此运算可以使用本地和世界坐标系：

-   对于静态网格体来说，此运算会在本地参考坐标系中裁剪。
-   对于静态网格体Actor来说，此运算会在世界坐标系中裁剪。

例如，考虑以下场景：

设置

描述

**平面原点（Plane Origin）**

定义要切割的平面的原点，采用本地坐标（静态网格体）或世界坐标系（静态网格体Actor）。

**平面朝向（Plane Orientation）**

以欧拉角定义平面旋转，用度数表示。默认要切割的平面是XY平面。

**保留的边（Side(s) To Keep）**

选择要保持切割平面的哪一面。正面、反面、或两面都保留。

**两边间距（Spacing Between Halves）**

如果你选择保留两边，此选项定义了两边的间距。

**填补空隙（Fill Holes）**

启用该选项后可以生成几何体来填充切割部分。

**导出切割内容（Export Separated）**

启用该选项后可以将切割的网格体保存为单独资产。

## On Object

**On Object** 操作应用于与 **Select By** 条件匹配的所有类型的场景元素。

### 删除对象

此操作删除所有与此步骤所设的 **Select By** 条件匹配的对象。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b25af084-a144-4a02-a101-3f4041e0e04d/deleteobjects.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b25af084-a144-4a02-a101-3f4041e0e04d/deleteobjects.png)

点击查看大图

### 删除未使用的资产

此操作删除所有与此步骤所设的 **Select By** 条件匹配的资产，以及所有未被其他资产或Actor引用的资产。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/419f2f1b-705c-47ba-ae1b-7810550b0337/deleteunusedassets.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/419f2f1b-705c-47ba-ae1b-7810550b0337/deleteunusedassets.png)

点击查看大图

### 设置材质

对于所有符合此 **Select By** 条件的静态网格体、静态网格体Actor或组件，此操作将所有现有材质替换为指定材质。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a49ffc4-1c98-4a6b-a227-0a01ad8c6ff0/setmaterial.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a49ffc4-1c98-4a6b-a227-0a01ad8c6ff0/setmaterial.png)

点击查看大图

设置

说明

**材质（Material）**

要用作所有现有材质替代品的材质。

### 替代材质

对于每个与此步骤所设的 **Select By** 条件匹配的静态网格体或静态网格体Actor，此操作将所有匹配条件的材质替换为指定替代材质。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5dcc7710-3b42-4eea-958f-575d7bd93ebe/substitutematerial.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5dcc7710-3b42-4eea-958f-575d7bd93ebe/substitutematerial.png)

点击查看大图

设置

说明

**材质搜索（Material Search）**

要替换的材质的名称或部分名称。

**字符串匹配（String Match）**

定义要在 **Material Search** 字符串上执行的匹配类型。这些选项的作用与 **Select By** 块中使用字符串过滤器相同。详情参见[Visual Dataprep选择参考](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#selectbystring)。

**材质替代（Material Substitute）**

要作用代替品的材质，用于替代满足上述条件的材质。

### 按表格替代材质

对于每个与此步骤所设的 **Select By** 条件匹配的静态网格体、静态网格体Actor或组件，此操作会根据数据表资产中提供的替代品表替换材质。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88046fe9-7d49-4dde-adba-684cb758ef64/substitutematerialbytable.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88046fe9-7d49-4dde-adba-684cb758ef64/substitutematerialbytable.png)

点击查看大图

设置

说明

**材质数据表（Material Data Table）**

确定材质及其替代材质的数据表资产。

**材质数据表（Material Data Table）** 设置中提供的数据表必须使用 **MaterialSubstitutionDataTable** 的行结构。此行格式需要在创建数据表资产时在 **选择行结构（Pick Row Structure）** 对话框中设置。例如：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e1e6532-da2a-48c9-9a6c-6836e8a7d4c6/substitutematerialbytablerowstructure.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e1e6532-da2a-48c9-9a6c-6836e8a7d4c6/substitutematerialbytablerowstructure.png)

点击查看大图

在此行结构下，数据表中的每一行都会定义一种材质替换操作，会在每一个静态网格体Actor或资产上执行。

-   行中的第一个值，**行名称（Row Name）**，表示替代品名称。可自由设置此值。
-   第二个值，**搜索字符串（Search String）**，是要在此操作中被替换的材质的名称或部分名称。
-   第三个值，**字符串匹配（String Match）**，表示要在静态网格体资产和Actor中的材质与在该行第二个值中设置的搜索字符串之间比较的字符串类型。凡 **Substitute Material** 操作接受的值均可使用：**Exact Match**、**Contains** 或 **Matches Wildcard**。这些选项的作用与 **Select By** 块中使用字符串过滤器相同。详情参见[Visual Dataprep选择参考](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#selectbystring)。
-   第四个值，**材质替代品（Material Replacement）**，是材质资产替代品的全名，用于替换所有与搜索字符串匹配的材质。
    
    在 **内容浏览器** 中右键单击材质，从上下文菜单中选择 **复制引用（Copy Reference）**，即可获取此值。
    

例如：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2382a855-b129-4007-b116-1cc00b53950c/material-substitution-table.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2382a855-b129-4007-b116-1cc00b53950c/material-substitution-table.png)

点击查看大图

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [enterprise](https://dev.epicgames.com/community/search?query=enterprise)
-   [manufacturing](https://dev.epicgames.com/community/search?query=manufacturing)
-   [dataprep](https://dev.epicgames.com/community/search?query=dataprep)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [On Actor](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#onactor)
-   [添加标签](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E6%A0%87%E7%AD%BE)
-   [添加到层](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%88%B0%E5%B1%82)
-   [紧凑场景图](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E7%B4%A7%E5%87%91%E5%9C%BA%E6%99%AF%E5%9B%BE)
-   [创建代理网格体](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E5%88%9B%E5%BB%BA%E4%BB%A3%E7%90%86%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [合并](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E5%90%88%E5%B9%B6)
-   [随机偏移变换](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E9%9A%8F%E6%9C%BA%E5%81%8F%E7%A7%BB%E5%8F%98%E6%8D%A2)
-   [设置网格体](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [设置元数据](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%85%83%E6%95%B0%E6%8D%AE)
-   [设置移动性](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E7%A7%BB%E5%8A%A8%E6%80%A7)
-   [在位置处生成Actor](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E5%9C%A8%E4%BD%8D%E7%BD%AE%E5%A4%84%E7%94%9F%E6%88%90actor)
-   [On Asset](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#onasset)
-   [输出到文件夹](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E8%BE%93%E5%87%BA%E5%88%B0%E6%96%87%E4%BB%B6%E5%A4%B9)
-   [替换资产引用](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E6%9B%BF%E6%8D%A2%E8%B5%84%E4%BA%A7%E5%BC%95%E7%94%A8)
-   [设置最大纹理尺寸](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E6%9C%80%E5%A4%A7%E7%BA%B9%E7%90%86%E5%B0%BA%E5%AF%B8)
-   [On Mesh](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#onmesh)
-   [烘焙变换](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E7%83%98%E7%84%99%E5%8F%98%E6%8D%A2)
-   [翻转面](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E7%BF%BB%E8%BD%AC%E9%9D%A2)
-   [生成展开的UV](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E7%94%9F%E6%88%90%E5%B1%95%E5%BC%80%E7%9A%84uv)
-   [重新网格化](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E9%87%8D%E6%96%B0%E7%BD%91%E6%A0%BC%E5%8C%96)
-   [设置凸包碰撞](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%87%B8%E5%8C%85%E7%A2%B0%E6%92%9E)
-   [设置LOD组](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E8%AE%BE%E7%BD%AElod%E7%BB%84)
-   [设置LOD](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E8%AE%BE%E7%BD%AElod)
-   [设置简单碰撞](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E7%AE%80%E5%8D%95%E7%A2%B0%E6%92%9E)
-   [设置静态光照](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E9%9D%99%E6%80%81%E5%85%89%E7%85%A7)
-   [简化网格体](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E7%AE%80%E5%8C%96%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [焊接边缘](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E7%84%8A%E6%8E%A5%E8%BE%B9%E7%BC%98)
-   [设置碰撞复杂度](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E7%A2%B0%E6%92%9E%E5%A4%8D%E6%9D%82%E5%BA%A6)
-   [平面剪切](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E5%B9%B3%E9%9D%A2%E5%89%AA%E5%88%87)
-   [On Object](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#onobject)
-   [删除对象](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E5%88%A0%E9%99%A4%E5%AF%B9%E8%B1%A1)
-   [删除未使用的资产](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E5%88%A0%E9%99%A4%E6%9C%AA%E4%BD%BF%E7%94%A8%E7%9A%84%E8%B5%84%E4%BA%A7)
-   [设置材质](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E6%9D%90%E8%B4%A8)
-   [替代材质](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E6%9B%BF%E4%BB%A3%E6%9D%90%E8%B4%A8)
-   [按表格替代材质](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine#%E6%8C%89%E8%A1%A8%E6%A0%BC%E6%9B%BF%E4%BB%A3%E6%9D%90%E8%B4%A8)
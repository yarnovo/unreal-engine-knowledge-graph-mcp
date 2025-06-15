# 虚幻引擎中的替代物烘焙器插件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:21:26.983Z

---

目录

![替代物烘焙器插件](https://dev.epicgames.com/community/api/documentation/image/937bf47a-3de0-4462-9225-7461821212bb?resizing_type=fill&width=1920&height=335)

替代物烘焙器插件可为复杂几何体烘焙出简化表示，以在远距离渲染中用作细节级别（LOD）网格体。 替代物烘焙器主要可以用来生成三种替代物：

-   **实心球替代物（Full Sphere Impostor）**，可捕获并渲染对象四周所有角度的视图。
    
-   **上半球替代物（Upper Hemisphere Impostor）**，仅可捕获和渲染地貌上方的视图。 对于通常位于地貌上且在极远处无法从下方观察到的对象，此选项可以为其提供更好的质量。 因为无需渲染未使用的视图，从而节省了处理资源。
    
-   **传统公告板LOD（Traditional Billboards LOD）**使用较旧的技术，捕获固定水平角度周围的图像，并从上方捕获表示顶视图的单张图像。 这些图像会被分别放置于对应的Sprite卡片上，且随视角发生变化。 朝向远处的卡片会使用抖动效果淡出。
    

前两种替代物以相同的技术为基础。 该工具会捕获对象周围指定数量的视图。 在渲染过程中，替代物材质会找到与当前摄像机视图最接近的三个捕获帧，并在它们之间进行混合，从而生成更贴近实际视图的表示。 这三个帧会被渲染到单个Sprite平面上。

公告板使用既定固定视角的Sprite平面，在某些角度下看起来并不完全准确，而替代物始终从观察者的视角渲染单一的混合Sprite帧，相比之下可为3D几何体提供更平滑且更逼真的模拟效果。 下方视频演示了这种差异。

*左：替代物；右：公告板。*

在《堡垒之夜：空降行动》（FNBR）中，当禁用[Nanite](designing-visuals-rendering-and-graphics\rendering-optimization\nanite)时，我们对所有树木使用了上半球替代物。这优化了从远处眺望岛上树木时的视觉质量。

## 对比替代物和公告板

替代物和公告板之间的区别在于，替代物使用了包含8个三角形和9个顶点的Sprite卡片，而公告板则使用了8张卡片，总共包含72个三角形和81个顶点。 这意味着公告板表示的顶点和三角形数量是替代物表示的八倍。

替代物的渲染速度通常比公告板快得多，因为替代物包含的顶点更少，但是由于要混合最近的三个帧，替代物的像素着色器开销更高——移动端的替代物渲染会回退到单帧采样。 公告板的遮罩材质仍然存在更严重的过度绘制现象。 使用公告板的主要优点在于可以在纹理中获得更高的分辨率，因为公告板仅（以3x3的网格）捕获了九个视图。

至于远距离植被，替代物的XY帧分布值为12。 《堡垒之夜：空降行动》中的大多数资产都采取了这种做法。 这样的结果就是12帧乘12帧，总共使用144帧。

### 启用替代物烘焙器插件

开始之前，请为项目启用虚幻引擎的**ImposterBaker**插件。 从**编辑（Edit）**菜单打开**插件（Plugins）**浏览器即可执行此操作。 该插件位于**内置（BUILT-IN） > 网格体（Mesh）**类别下。

[![](https://dev.epicgames.com/community/api/documentation/image/205ca7ee-9666-451e-8cd9-ad2d4568f440?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/205ca7ee-9666-451e-8cd9-ad2d4568f440?resizing_type=fit)

## 替代物烘焙器插件在虚幻引擎5.5及更高版本中的变更

替代物烘焙器功能更新，更易于使用，同时涵盖更多用例。 优化项包括：

-   替代物烘焙器现在可以使用GBuffer进行渲染，而无需在材质资产上放置材质开关。
    
-   替代物烘焙器现在可以渲染出材质使用的所有颜色贴图和标量贴图，并按任意指定组合对标量贴图进行通道打包。
    
-   替代物烘焙器现包含一款完整的资产编辑器，负责渲染和调整数值，而这些数值可以作为'预设（Presets）'被自动保存到数据资产中。
    
-   现在你只需一次点击即可将纹理和网格体数据直接自动保存到源资产中。
    
-   替代物烘焙器现包含一款批量渲染器，可以按指定的预设为多个网格体渲染替代物，并将其全部另存。
    
-   现在你可以直接通过替代物编辑器或生成的材质实例，在**无视差（No Parallax）**、**单凹凸贴图偏移视差（Single BumpOffset Parallax）**和**完整迭代视差（Full Iteration Parallax）**之间切换。
    

## 使用替代物编辑器

以下小节介绍了替代物烘焙器编辑器的各个分段。

### 替代物编辑器控件

替代物编辑器控件让你可以完全掌控替代物的自定义和创建。

[![](https://dev.epicgames.com/community/api/documentation/image/92acdee7-ac5f-477a-9f94-f57dac97a972?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/92acdee7-ac5f-477a-9f94-f57dac97a972?resizing_type=fit)

### 预设控件

你可以使用**预设（Preset）**控件一次生成和保存多个替代物。

[![](https://dev.epicgames.com/community/api/documentation/image/d642f594-354b-4db1-8a10-a9db4767ca75?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/d642f594-354b-4db1-8a10-a9db4767ca75?resizing_type=fit)

要使用这些控件，请在内容浏览器中右键点击任意**静态网格体（Static Mesh）**资产，选择**脚本化资产操作（Scripted Asset Actions） > 替代物烘焙器（Impostor Baker）**选项。

[![](https://dev.epicgames.com/community/api/documentation/image/45823ee1-302f-4920-92e8-2bd8d195bf94?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/45823ee1-302f-4920-92e8-2bd8d195bf94?resizing_type=fit)

### 预设数据资产

**预设数据资产（Preset DataAsset）**包含了打开替代物编辑器时会被初始化的所有默认值。 通过保持设置一致，可以在重复渲染多个替代物时节省时间（各设置项的说明见下文）。

[![](https://dev.epicgames.com/community/api/documentation/image/c3bfe2c1-a3c7-4dc0-903d-7dc97e2818f7?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/c3bfe2c1-a3c7-4dc0-903d-7dc97e2818f7?resizing_type=fit)

使用上方的按钮即可更改当前的**设置预设（Settings Preset）**，具体如下：

-   **加载设置（Load Settings）：**将数据资产的设置应用到替代物编辑器。
    
-   **应用到数据资产（Apply to DataAsset）：**将替代物编辑器的当前设置应用到数据资产。
    
-   **新建数据资产（New DataAsset）：**按**资产保存（Asset Saving）**中指定的路径创建一个新的数据资产。
    

通过项目的`DefaultEditor.ini`文件（位于`\(项目根目录)\config\DefaultEditor.ini`），你可以指定启动替代物编辑器或预设渲染器时默认使用的数据资产。 请在`.ini`文件中包含以下信息：

`   [/ImpostorBaker/BP/EUW_Impostor_Editor.EUW_Impostor_Editor_C]  DefaultSettingsAssetPath=/Game/ImpostorPresets     [/ImpostorBaker/BP/EUW_Generate_Impostor_using_Preset.EUW_Generate_Impostor_using_Preset_C]  DefaultSettingsAssetPath=/Game/ImpostorPresets         `

\[/ImpostorBaker/BP/EUW\_Impostor\_Editor.EUW\_Impostor\_Editor\_C\] DefaultSettingsAssetPath=/Game/ImpostorPresets \[/ImpostorBaker/BP/EUW\_Generate\_Impostor\_using\_Preset.EUW\_Generate\_Impostor\_using\_Preset\_C\] DefaultSettingsAssetPath=/Game/ImpostorPresets

复制完整片段(5行长度)

然后更改**DefaultSettingsAssetPath**，使其指向你在项目中创建的数据资产（或随插件安装的默认项）。

### 烘焙设置

**烘焙设置（Bake Settings）**分段包含了影响替代物生成的主要设置。

[![](https://dev.epicgames.com/community/api/documentation/image/f6769ca3-aae4-4c7a-83ab-8388df11ba1e?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f6769ca3-aae4-4c7a-83ab-8388df11ba1e?resizing_type=fit)

烘焙设置

说明

**静态网格体（Static Mesh）**

决定为哪个静态网格体资产生成替代物。

**FramesXY**

决定各轴上会生成的子帧数量。 例如，若数值为16，则将创建16x16=256个子帧。

**待渲染颜色贴图（Color Maps to Render）**

决定了替代物烘焙器将为替代物渲染哪些全色贴图。 大多数替代物都只需要基础颜色和法线。 颜色贴图输出选项的完整列表如下：

-   基础颜色（BaseColor）
    
-   法线（Normal）
    
-   自发光（Emissive）
    
-   次表面（Subsurface）
    
-   切线（Tangent）
    
-   自定义光照（CustomLighting）
    
-   光照（Lit）
    

[![](https://dev.epicgames.com/community/api/documentation/image/6c5630d3-a63c-4b1d-b067-3ddbd3eaa4a7?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6c5630d3-a63c-4b1d-b067-3ddbd3eaa4a7?resizing_type=fit)

**通道打包遮罩（Channel Packed Masks）**

支持自定义标量贴图的渲染，并将结果打包，整合到单个纹理的不同颜色通道中。 选项如下：

-   高光度（Specular）
    
-   粗糙度（Roughness）
    
-   金属感（Metallic）
    
-   不透明度（Opacity）
    
-   不透明遮罩（Opacity Mask）
    
-   深度、各向异性（Depth, Anisotropy）
    
-   透明涂层（Clear Coat）
    
-   透明涂层粗糙度（Clear Coat Roughness）
    
-   无（None，通道留空）
    
-   如果Alpha通道被指定为空（None），则生成的纹理将没有Alpha，并使用DXT1压缩，而非DXT5。
    

[![](https://dev.epicgames.com/community/api/documentation/image/316dddb7-f8ea-438a-981d-79283a58d874?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/316dddb7-f8ea-438a-981d-79283a58d874?resizing_type=fit)

**替代物类型（Impostor Type）**

决定待渲染替代物的类型。 选项如下：

-   **实心球替代物（Full Sphere Impostor）：**捕获并渲染对象四周所有角度的视图。
    
-   **上半球替代物（Upper Hemisphere Impostor）：**仅捕捉和渲染地貌上方的视图。
    
-   **传统公告板（Traditional Billboards）：**使用较旧的技术，捕捉固定水平角度周围的图像，并从上方捕获表示顶视图的单张图像。
    

**分辨率（Resolution）**

最终纹理所使用的纹理分辨率。

Epic Games项目（如《堡垒之夜：空降行动》）使用2048分辨率。

### 材质设置

**材质设置（Material Settings）**分段包括了替代物所用材质的设置，以及应用于最终材质的各种设置。

[![](https://dev.epicgames.com/community/api/documentation/image/e1a314a6-89bf-4e48-9182-c063d6f72e61?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e1a314a6-89bf-4e48-9182-c063d6f72e61?resizing_type=fit)

材质设置

说明

**半球材质（Hemisphere Material）**

决定替代物所用父材质的类型。 通常无需进行更改。 此项设置会根据[烘焙](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine)设置中所指定的替代物类型显示各类型的正确默认值。

**共享模型重载（Sharing Model Override）**

让你可以将当前的共享模型更改为任何可用的着色模型。

**视差模式（Parallax Mode）**

可在三种模式之间切换：

-   无视差（No Parallax）
    
-   单样本视差（Single Sample Parallax）：与凹凸贴图偏移类似，据此可以在无需添加额外三角形的前提下为材质增添深度感。
    
-   迭代视差（Iterative Parallax）：开销最大的选项，但十分适合作为对照，调整设置以排除其他差异。
    

**恒定高光度（Constant Specular）**

当通道打包遮罩数组中不存在被渲染的高光度贴图时，设置用于高光度的值。 此选项在渲染高光度贴图时隐藏。

**恒定粗糙度（Constant Roughness）**

当通道打包遮罩数组中不存在被渲染的粗糙度贴图时，设置用于粗糙度的值。 此选项在渲染粗糙度贴图时隐藏。

**恒定不透明度（Constant Opacity）**

当通道打包遮罩数组中不存在被渲染的不透明度贴图时，设置用于不透明度的值。 此选项在渲染不透明度贴图时隐藏。

**次表面颜色（Subsurface Color）**

当不存在被渲染的次表面颜色贴图时，设置用于次表面颜色的值。 此颜色将与基础颜色相乘，并使用距离场Alpha（见基础颜色Alpha的不透明度遮罩）进行遮罩。 此选项在渲染次表面颜色贴图时隐藏。

**最小散射遮罩（Scatter Mask Min）**

设置使散射生效的最小值，让距离场Alpha可以被用作此替代物的次表面散射遮罩。 这还有一个好处，就是能弥补原本会因为散射而缺失的某些自投影效果。

**散射遮罩长度（Scatter Mask Length）**

设置使用距离场Alpha所创建的散射遮罩的边缘渐变宽度值。 这还有一个好处，就是能弥补原本会因为散射而缺失的某些自投影效果。

**遮罩偏移（Mask Offset）**

此值会改变使用距离场Alpha创建的遮罩的偏移量，使其增大或缩小。

### 公告板设置

仅当**替代物类型（Impostor Type）**（见[烘焙设置（Bake settings）](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine))为**传统公告板（Traditional Billboards）**时，**公告板设置（Billboard Settings）**才会显示。 替代物类型提供了一些专门调整公告板的设置项。

[![](https://dev.epicgames.com/community/api/documentation/image/dd605ab2-4484-4ff7-a83e-d7135408eaaa?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/dd605ab2-4484-4ff7-a83e-d7135408eaaa?resizing_type=fit)

公告板设置

说明

**使XY在网格体枢轴点上居中（Center XY On Mesh Pivot）**

默认情况下，此设置被禁用。 禁用后，将使用围绕其边界中心旋转的摄像机来捕获静态网格体。 这通常可以确保对象会位于捕获帧之内。 在某些情况下，尤其是对于树木而言，边界的实际中心可能并不会正好位于枢轴点，而枢轴点通常是树干所在的位置。 这可能会导致一种伪影：当摄像机围绕最终的公告板旋转时，你会短暂地看到略微偏移的树干所呈现的重影。 启用此设置会强制以XY位置的网格体枢轴点为中心进行捕获，从而纠正此伪影现象。 如果在枢轴不靠近中心的网格上使用这个设置，可能会导致问题。

[![](https://dev.epicgames.com/community/api/documentation/image/acd7c65f-4d6f-4f5f-842a-619fcb0fe2c1?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/acd7c65f-4d6f-4f5f-842a-619fcb0fe2c1?resizing_type=fit)

左：禁用，右：启用

**参考平面顶部（Reference Plane Top）**

移动上朝向卡片的参考平面。 值的标准化范围为0-1，其中0.5代表网格体的中点。 修改此设置时，请将顶部卡片放置在静态网格体的最宽部分。 以下方松树为例，顶部卡片被向下推了一些，从而去除了部分伪影。

![](https://dev.epicgames.com/community/api/documentation/image/39eeafd2-0091-49bb-a96d-4e40ee69ea61?resizing_type=fit)

将参考平面顶部值从0.5更改为0.35的前后对比。

**参考平面边（Reference Plane Sides）**

此设置的功能与参考平面顶部（Reference Plane Top）类似，但会让侧边平面沿着其各自的法线移动。 通常无需调整此设置，除非要捕捉一个几乎占据全部空间的密集对象，并且启用了视差选项。

**使用Sprite顶点着色器（Use Sprite Vertex Shader）**

此设置仅应在启用视差选项的情况下启用。 此设置会导致UV偏移超出几何体的边界，从而出现穿模。 下方示例演示了一个极端情况，可以看到网格体底部周围出现了穿模。 请谨慎使用此设置，因为其效果会加剧遮罩的过度绘制。

![](https://dev.epicgames.com/community/api/documentation/image/0f80ee55-ee6f-4d73-8494-334c153fae2d?resizing_type=fit)

Sprite顶点着色器设置效果的演示。

还有其他的公告板材质实例值，它们负责控制未向蓝图公开的额外设置，但这些设置在更高级的情况下仍然可以进行调整。 主要类别包括**抖动（Dithering）**设置（定义了抖动过渡的程度）和**顶点着色器（Vertex Shader）**设置（定义了当卡片背对摄像机时，对卡片进行移除的阈值）。

### 资产保存设置

**资产保存设置（Asset Saving Settings）**定义了资产的保存位置。

[![](https://dev.epicgames.com/community/api/documentation/image/5944233b-bef3-4242-8389-366517ba033d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/5944233b-bef3-4242-8389-366517ba033d?resizing_type=fit)

资产保存设置

说明

**新资产路径（New Asset Path）**

纹理和材质的文件夹位置。 默认情况下，该路径与静态网格体是相对的。 若使用相对路径，你可以在路径的开头使用`../`向上移动一个文件夹级别（或使用`../../`向上移动两个文件夹级别，依此类推）。

**新资产纹理前缀（New Asset Texture Prefix）**

即新纹理资产名称的前缀。

**新资产MIC前缀（New Asset MIC Prefix）**

即新[材质实例常量](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)资产名称的前缀。

**使用相对路径（Use Relative Path）**

设置相对于源网格体的路径。 当此设置为False时，路径应以`/Game/`开头，从而将资产放置在项目内容文件夹中，或以插件的名称开头（例如， \`/ImpostorBaker/\` 会将资产放置在此插件所在的文件夹中）。 如果使用的路径无效，引擎会发出警告。

静态网格体资产的名称将始终附加到指定的前缀，后跟各贴图的名称。 例如，如果一个静态网格体名为`S_Tree_01`，则根据上图所示的值，生成的基础颜色将是`T_Impostor_S_Tree_01_BaseColor`。

### 高级设置

**高级（Advanced）**设置内所包含的值通常不需要进行编辑。

[![](https://dev.epicgames.com/community/api/documentation/image/edcb578e-e856-452b-b692-e114ed0752a7?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/edcb578e-e856-452b-b692-e114ed0752a7?resizing_type=fit)

高级设置

说明

**使用GBuffer进行捕获（Capture Using GBuffer）**

启用后，将使用GBuffer捕获替代物数据。 这适用于所有不透明材质和遮罩材质，但不适用于半透明材质。 如果源网格体包含任何半透明材质，则替代物编辑器将在视口中使用红色文本发出警告。

此插件的先前版本要求你首先将材质函数"Impostor Capture Switch"放入每个材质中。 现在不必了，但在某些情况下可能仍然有可取性。 举例说明，在《堡垒之夜：空降行动》中，我们会利用此函数来修改材质以去除某些基于世界的着色效果，从而使得替代物材质能够在生成后接受动态着色。

**正交（Orthographic）**

为True时，将使用正交渲染完成捕获。 此设置几乎从不需要更改。 几乎从来没有必要进行透视渲染，因为具有视差的材质稍后会重新创建准确的透视。 但是，某些材质效果（例如菲涅尔效果）无法通过正交渲染正确进行捕获，因此，针对这些情况可以禁用此设置。

**摄像机距离（Camera Distance）**

**仅在禁用正交（Orthographic）时使用。**设置捕获的距离。

**场景捕获分辨率（Scene Capture Resolution）**

捕获各子帧所用的分辨率。 此设置的值会自动四舍五入为最接近的2的幂，因为该过程在某些时候要求场景捕获纹理的Mip贴图链（具体而言，在最后生成Sprite几何体的裁剪图时需要这么做）。 将此值设置为最终纹理中各子帧分辨率的至少两倍，从而确保结果属于超级采样。 例如，如果最终纹理分辨率为4096，具有16个XY帧，则各子帧将为256x256。 默认场景捕获的分辨率为512，意味着子帧将以200%的屏幕百分比渲染，从而产生更好的抗锯齿效果。

**在预览场景中显示地板（Show Floor In Preview Scenes）**

控制是否在视口中显示地板网格体。 对结果没有影响。

**替代物投射阴影（Impostor Casts Shadows）**

控制替代物是否在预览视口中投射阴影。 这不会影响捕获过程或最终创建的资产。

**着色器调试模式（Shader Debug Mode）**

切换材质上的调试覆层，显示所有捕获帧的网格，并通过此网格为摄像机和阳光精确定位摄像机光线的位置（通过查看抖动阴影）。 这时也会显示包含3个最近视图帧的当前"三角形"，并且会根据其位置的混合权重进行着色。

[![](https://dev.epicgames.com/community/api/documentation/image/cf8d2818-b850-42c3-a6c1-7a2b4251847f?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/cf8d2818-b850-42c3-a6c1-7a2b4251847f?resizing_type=fit)

**显示调试值（Show Debug Values）**

显示名为**调试（Debug）**的新细节设置类别，包括替代物编辑器内部的各种调试信息（例如当前使用的材质实例动态、边界和枢轴点的各种统计数据等等）。 仅适用于问题的调试。

**显示渲染目标（Show Render Targets）**

显示名为**渲染目标（Render Targets）**的新细节设置类别，包括不同贴图和场景捕获Mip的渲染目标的全部数组。 可能会对检查有所帮助。

**手动S RGB限位框（Manual S RGB Retainer Box）**

由于一个漏洞，替代物编辑器目前渲染的FPreviewScene缺失伽马曲线。 此复选框提供了一种解决方法，即使用UMG限位控件来应用sRGB曲线。默认启用。

### 预览模式

你可以通过多种方式控制视口来预览替代物。 默认情况下，视口会根据可配置的**按距离切换（Swap by Distance）**值在源网格体和渲染的替代物之间切换，但你也可以将其设置为**并排（Side-by-Side）**显示，或者强制**仅替代物（Impostor Only）**：

[![](https://dev.epicgames.com/community/api/documentation/image/6b0159ca-280d-4df4-86e5-e53b15349d9a?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6b0159ca-280d-4df4-86e5-e53b15349d9a?resizing_type=fit)

并排视图与视图模式设置结合使用将非常有用，你可以借此模式查找并显示源网格体和替代物之间的差异。 当你尝试得到近似的恒定高光或粗糙度值，而不是捕获这些值时，这种视图将尤其适用。

下方的视口示例图同时显示了替代物和原始源网格体法线：

[![](https://dev.epicgames.com/community/api/documentation/image/eabacc81-bfd1-4a6a-9f8b-f09610cf31f7?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/eabacc81-bfd1-4a6a-9f8b-f09610cf31f7?resizing_type=fit)

按住L键然后点击并拖动鼠标即可旋转阳光。 按住左键并拖动鼠标即可让摄像机环绕运动，按住右键并拖动鼠标或使用鼠标滚轮即可前后移动摄像机：

![](https://dev.epicgames.com/community/api/documentation/image/4ec1d91e-beea-49ba-9b90-da1191708d89?resizing_type=fit)

旋转太阳并操纵摄像机。

## 父材质

你可以在内容浏览器的**Engine/Plugins/ImposterBaker Content/Materials/Parents**目录下找到替代物的基础父材质。 打开名为**M\_Imposter**的文件即可进行检查。

替代物行为的核心（包括通道打包遮罩组）都被组装到了此处的一个函数中：

[![](https://dev.epicgames.com/community/api/documentation/image/1ac18f21-7fda-4447-84a4-bf58517a47b3?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1ac18f21-7fda-4447-84a4-bf58517a47b3?resizing_type=fit)

传入恒定高光度值的分段就在上图所示函数的右侧，如下所示。 此函数还负责处理被距离场Alpha遮罩的内置次表面散射：

[![](https://dev.epicgames.com/community/api/documentation/image/40a326a2-fc56-452d-a6ab-e30dea6415c0?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/40a326a2-fc56-452d-a6ab-e30dea6415c0?resizing_type=fit)

### 可选颜色贴图

可渲染的其他可选颜色贴图（自发光、次表面、切线等）已经由此函数连接到了材质。 此工具会自动翻转静态开关，以便在渲染时启用正确的贴图：

[![](https://dev.epicgames.com/community/api/documentation/image/aa407643-85d8-4110-8512-6705027e0394?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/aa407643-85d8-4110-8512-6705027e0394?resizing_type=fit)

使用下方所示函数（该函数位于上图所述函数下方的材质中，且处于断连状态）为材质添加其他颜色贴图，例如光照纹理（当前未连接到任何地方），或者添加除随附的通道打包纹理所含的四种贴图之外的其他标量贴图：

[![](https://dev.epicgames.com/community/api/documentation/image/02426d08-c596-4307-8de8-d1b593825736?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/02426d08-c596-4307-8de8-d1b593825736?resizing_type=fit)

### 标量贴图

可渲染的其他标量贴图（如粗糙度、高光度、透明涂层等）已经使用此材质函数进行了连接，该函数也会自动翻转静态开关，从而让任何被渲染的纹理及其相应的颜色通道被启用。

[![](https://dev.epicgames.com/community/api/documentation/image/847fab27-8d73-44f5-912c-de1ffc855fcf?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/847fab27-8d73-44f5-912c-de1ffc855fcf?resizing_type=fit)

传统公告板的父材质位于内容浏览器的**Engine/Plugins/ImposterBaker Content/Materials**目录中。 打开名为**M\_Billboard\_01\_Inst**的文件。 `/Script/Engine.Material/ImpostorBaker/Materials/Parents/M_Billboard_01_Inst`

它的设置与上文的替代物材质完全相同；你可以参考这些图像来理解传统公告板材质的布局。 材质函数的命名方式相同，但名称中包含`_Billboard`。 其逻辑本质上也是类似的，只是函数内部细节有所不同。

### 不使用GBuffer进行渲染

针对半透明效果的捕获，或在捕获期间需要禁用某些功能的特殊情况，你需要禁用**使用GBuffer进行捕获（Capture using GBuffer）**，并将材质函数**ImpostorCaptureSwitch**放置在网格体所使用的图表的末尾：

[![](https://dev.epicgames.com/community/api/documentation/image/8b2da759-bda3-40ce-8f5c-9ea41dc6b19a?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/8b2da759-bda3-40ce-8f5c-9ea41dc6b19a?resizing_type=fit)

如果禁用**使用GBuffer进行捕获（Capture Using GBuffer）**但排除了**ImposterCaptureSwitch**材质函数，则被捕获的替代物将出现渲染错误和许多瑕疵。 这是因为材质会将基础颜色和光照视为深度，然后对输出应用视差，从而产生大量渲染错误。

要理解该问题的严重性，请参考开发者的直接引述，如下所示：

*"如果取消勾选使用GBuffer进行捕获（Capture using GBuffer），但不在材质中包含上述函数，则被捕获的替代物基本上会看起来像一个见者落泪的蒸汽球，因为材质会将基础颜色和光照视为深度，并应用视差，将其渲染成一片破碎的虚无混沌。*

*今天可怜的替代物患上了严重的替代物综合症；它的设置没有一点意义。"*

## 使用预设生成多个替代物

你可以多选静态网格体并生成复数替代物，方法是右键点击，在快捷菜单中选择**脚本化资产操作（Scripted Asset Actions） > 替代物烘焙器（Impostor Baker） > 使用预设生成替代物（Generate Impostor Using Preset）** 。

设置了设置预设（Settings Preset），并决定了如果静态网格体在最后的LOD处已存在替代物时要采取什么操作后，请点击**生成并保存替代物（Generate and Save Impostors）**。

[![](https://dev.epicgames.com/community/api/documentation/image/b4e3b48e-ef44-4374-9120-fb446f8857f0?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/b4e3b48e-ef44-4374-9120-fb446f8857f0?resizing_type=fit)

如果设置为**当前对话（Present Dialogue）**，则当检测到已有的替代物时，此过程将暂停。 此过程将一直保持暂停，直到你在弹出的对话框中做出选择并选择要采取的操作（无论是替换最后的LOD、添加新LOD，还是完全跳过此步骤）。 这种情况也可能在替代物编辑器内发生。

[![](https://dev.epicgames.com/community/api/documentation/image/02a4c1b3-9bce-4483-b038-922349c1ef8c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/02a4c1b3-9bce-4483-b038-922349c1ef8c?resizing_type=fit)

## 完全迭代视差模式

只要替代物能捕获原始网格体所使用的所有通道的数据，**完全迭代视差（Full Iterative Parallax）**模式就能生成与原始网格体几乎一致的渲染。 此模式会从邻近帧中为像素逐个选择最佳光线结果，从而基本上借助相邻帧绕过转角进行追踪。 此选项即**深度衍生权重（Depth Derived Weights）**。

下方是使用颜色校准器对比单视差和迭代视差效果的示例，同时将高光度、粗糙度、透明涂层和金属感贴图捕获到了单个通道打包纹理中。 这是一项非常严格的测试，会放大混合的瑕疵。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [level of detail](https://dev.epicgames.com/community/search?query=level%20of%20detail)
-   [sprites](https://dev.epicgames.com/community/search?query=sprites)
-   [impostors](https://dev.epicgames.com/community/search?query=impostors)
-   [billboards](https://dev.epicgames.com/community/search?query=billboards)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [对比替代物和公告板](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#comparing-imposters-to-billboards)
-   [启用替代物烘焙器插件](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#enabling-the-imposter-baker-plugin)
-   [替代物烘焙器插件在虚幻引擎5.5及更高版本中的变更](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#changes-to-the-impostor-baker-plugin-in-unreal-engine-5-5-and-later-versions)
-   [使用替代物编辑器](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#using-the-impostor-editor)
-   [替代物编辑器控件](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#impostor-editor-widget)
-   [预设控件](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#preset-widget)
-   [预设数据资产](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#preset-data-asset)
-   [烘焙设置](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#bake-settings)
-   [材质设置](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#material-settings)
-   [公告板设置](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#billboard-settings)
-   [资产保存设置](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#asset-saving-settings)
-   [高级设置](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#advanced-settings)
-   [预览模式](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#preview-modes)
-   [父材质](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#parent-materials)
-   [可选颜色贴图](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#optional-color-maps)
-   [标量贴图](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#scalar-maps)
-   [不使用GBuffer进行渲染](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#rendering-without-g-buffer)
-   [使用预设生成多个替代物](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#generating-multiple-impostors-using-the-presets)
-   [完全迭代视差模式](/documentation/zh-cn/unreal-engine/impostor-baker-plugin-in-unreal-engine#full-iterative-parallax-mode)
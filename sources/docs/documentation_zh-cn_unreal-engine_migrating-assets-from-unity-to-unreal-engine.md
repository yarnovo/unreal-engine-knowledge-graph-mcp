# 将资产从Unity迁移至虚幻引擎 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine
> 
> 生成时间: 2025-06-14T18:51:12.710Z

---

目录

![将资产从Unity迁移至虚幻引擎](https://dev.epicgames.com/community/api/documentation/image/2b898cb7-d434-45a6-93e7-9982747571e7?resizing_type=fill&width=1920&height=335)

# 导入和转换资产

**虚幻引擎5** 项目包含各种资产，这些资产构成了最终的游戏。其中一些资产类型是虚幻引擎特有的，例如蓝图类，而另一些则是可以导入到引擎中的通用文件格式。

本文档将介绍可导入虚幻引擎的资产类型、导入方法以及其他信息的链接。

## 常见资产类型

虚幻引擎5支持以下资产类型：

虚幻资产类型

Unity等效类型

支持的格式

[静态网格体](/documentation/zh-cn/unreal-engine/importing-static-meshes-in-unreal-engine)

网格体

.fbx、.obj

[骨骼网格体](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine)

蒙皮网格体

.fbx、.obj、.usd

[动画序列](/documentation/zh-cn/unreal-engine/fbx-animation-pipeline-in-unreal-engine)

动画、Mecanim

.fbx、.obj、.abc

[纹理](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine)

纹理

.bmp、.float、.jpeg、.jpg、.pcx、.png、.psd、.tga, .dds (立方体贴图或2D)、.exr (HDR)、.tif (TIFF)、.tiff (TIFF)

[音频文件](/documentation/zh-cn/unreal-engine/importing-audio-files)

音频文件

.wav、.ogg、.flac、.aif、.opus、.mp3

[视频文件](/documentation/zh-cn/unreal-engine/media-framework-technical-reference-for-unreal-engine)

视频剪辑片段

.mov、.mp4、.wmv

[字体](/documentation/zh-cn/unreal-engine/importing-fonts-in-unreal-engine)

字体资产

.ttf、.otf

[glTF文件](/documentation/zh-cn/unreal-engine/importing-gltf-files-into-unreal-engine)

glTF文件

.gltf (JSON)、.glb

[SpeedTree模型](https://docs.speedtree.com/doku.php?id=ue4_introduction)

SpeedTree

.srt

## 将资产导入虚幻引擎前的注意事项

### 虚幻引擎坐标系

虚幻引擎使用[笛卡尔坐标系](https://zh.wikipedia.org/wiki/%E7%AC%9B%E5%8D%A1%E5%B0%94%E5%9D%90%E6%A0%87%E7%B3%BB)表示三维[欧几里得空间](https://zh.wikipedia.org/wiki/%E6%AC%A7%E5%87%A0%E9%87%8C%E5%BE%97%E7%A9%BA%E9%97%B4)中的位置。虚幻编辑器中的坐标系为左手坐标系，使用 **X轴** 表示 **前/后** 方向， **Y轴** 表示 **右/左** 方向， **Z轴** 表示 **上/下** 方向。

![虚幻引擎的坐标轴](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa8dc1f2-88c6-43e8-9b4f-b25f2addc8d3/coordinate-axes.gif)

Unity也使用左手坐标系。不过，Unity使用 **X轴** 表示 **右/左** ， **Y轴** 表示 **上/下** ， **Z轴** 表示 **前/后** 。

这就阻碍了将资产直接从Unity导入虚幻引擎，因为资产的方向可能不对。要解决这个问题，你可以在数字内容创建 (DCC) 文件包（如Maya或Blender）中更改资产的方向，或直接在虚幻引擎的 **导入对话框** 中更改。

请参阅[坐标空间术语](/documentation/zh-cn/unreal-engine/coordinate-system-and-spaces-in-unreal-engine)文档，了解有关虚幻引擎坐标系的更多信息。

### 虚幻引擎中的测量单位

虚幻引擎使用[公制](https://zh.wikipedia.org/wiki/%E5%85%AC%E5%88%B6)来测量对象的大小和距离。具体来说，虚幻引擎在内部使用 **虚幻单位（UU）** 进行测量。**一虚幻单位** 等于 **1厘米** 。

在外部数字内容创建 (DCC) 文件包中创建网格体时，可按此指定正确的换算比例。

Unity内部也使用公制， **一Unity单位** 等于 **1米（100厘米）** 。这将影响从Unity直接导入虚幻引擎的对象的比例。

如需详细了解虚幻引擎测量单位，请参阅[测量单位](/documentation/zh-cn/unreal-engine/units-of-measurement-in-unreal-engine)文档。

### FBX内容管线

虚幻引擎支持以多种文件格式将内容导入项目。**Autodesk FBX** 是最流行的资产格式之一。

FBX格式支持许多数字内容创建 (DCC) 文件包之间的互操作，并具有以下优点：

-   对静态网格体、骨骼网格体、动画和变形目标使用单一文件格式。
    
-   在一次导入操作中导入多个LOD和Morph/Blendshape。
    
-   导入材质和纹理资产，并自动将它们应用到静态网格体。
    

虚幻引擎的FBX管线使用 **FBX 2020.2** ，因此我们建议使用该版本，避免导入资产时出现不兼容问题。

如需详细了解FBX管线，请参阅[FBX内容管线](/documentation/zh-cn/unreal-engine/fbx-content-pipeline)文档。

## 版本信息

本文撰写时，所用的截图和术语源自以下虚幻引擎和Unity引擎版本：

-   虚幻引擎5.4.3
    
-   Unity 6 (6000.0.2f1)
    

## 准备从Unity导出资产

从Unity中导出资产前，请按以下步骤 **启用** **FBX导出器（FBX Exporter）** 软件包：

1.  在Unity中，点击 **窗口（Window）> 文件包管理器（Package Manager）** 打开 **文件包管理器** 窗口。
    
    ![点击窗口 - 文件包管理器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08c63e3e-800c-441a-8821-4be2a369277e/unity-import-1.png)
2.  点击左侧的 **Unity注册表（Unity Registry）** 类别，搜索 **FBX导出器（FBX Exporter）** 。点击 **安装（Install）** 安装软件包。
    
    ![搜索FBX导出器并安装软件包](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17430f6e-ec36-4663-99e4-9b2e9a563568/unity-import-2.png)
3.  安装软件包后，关闭 **文件包管理器（Package Manager）** 窗口。
    

现在，你可以在 **层级（Hierarchy）** 窗口中 **右键点击** 一个预制体，然后选择 **导出为FBX（Export to FBX）** ，将其导出为.fbx文件。

你也可以打开Unity项目的 **源文件夹** ，直接复制某些文件，例如纹理文件。

## 网格体/静态网格体

![Unity内的静态网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94a0cc84-2cb4-485a-af6f-01d88209fed2/unity-import-5.png)

**静态网格体** 是几何形状不会改变的三维网格体。要将静态网格体导入虚幻引擎，你可以使用 .**fbx** 格式或 .**obj** 格式。推荐使用 .fbx格式。如需详细了解虚幻引擎中的静态网格体，请参阅[静态网格体](/documentation/zh-cn/unreal-engine/static-meshes)文档。

本示例将演示如何将虚幻引擎 **材质球** 静态网格体从Unity导出到虚幻引擎。

此预制体拥有一个网格体和三种材质。但你的网格预制体可在其层级中包含多个网格体。

![虚幻引擎材质球静态网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aae2cf04-a13b-48e5-985d-176a9516943d/unity-import-6.png) ![此预制体拥有一个网格体和三种材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37684804-0428-49f3-a6c2-75fb6f6ec44a/unity-import-7.png)

### 从Unity导出静态网格体

要从Unity中导出 **静态网格体** ，请执行以下步骤：

1.  右键点击 **层级（Hierarchy）** 窗口中的预制体，然后在菜单中选择 **导出FBX…（Export FBX…）** 。
    
    ![右键点击层级窗口中的预制体，选择导出FBX](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c4b7da9-3810-4439-ab8b-778dc9be64da/unity-import-8.png)
2.  在 **导出选项（Export Options）** 窗口中，填写 **导出名称（Export Name）** 和 **导出路径（Export Path）** 。
    
    1.  在 **选项（Options）** 类别中，选择 **ASCII导出格式（ASCII Export Format）** 。
    2.  点击 **包含（Include）** 下拉菜单，选择 **仅模型（Model(s) Only）** 。
    3.  如果你的网格体有细节级别（LOD），请选择相应的级别。
    4.  如果你想导出带有相应纹理的网格体材质，请 **勾选** **嵌入纹理（Embed Textures）** 复选框。
    5.  点击 **导出（Export）** 导出你的静态网格体。
    
    ![为静态网格体选择正确的导出选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98f3ff97-b19a-453c-8e08-53ddbb636364/unity-import-9.png)
3.  前往 **导出路径（Export Path）** 文件夹，找到静态网格体的.fbx文件。这就是你要导入到虚幻引擎中的文件。
    
    ![前往导出路径文件夹，找到静态网格体的.fbx文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f092dc2-e3fe-447f-b41e-014ce98d0422/unity-import-10.png)

### 将静态网格体导入虚幻引擎

要将 **静态网格体** 导入虚幻引擎，请执行以下步骤：

1.  打开 **虚幻引擎** 并点击 **内容浏览器（Content Browser）** 中的 **导入（Import）** 按钮。
    
    ![点击内容浏览器中的导入按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0f7f6eb-0985-4997-9589-f71a448e851a/unity-import-11.png)
2.  前往 **导出路径文件夹** ，并 **选择网格体** 的.fbx文件，点击 **打开（Open）** 。
    
    或者，在Unity中使用 **在资源管理器中显示（Show in Explorer）** 后，你可以将文件从文件资源管理器窗口直接 **拖动** 到虚幻引擎的 **内容浏览器（Content Browser）** 中以导入该文件。
    
3.  **FBX导入选项（FBX Import Options）** 窗口将打开，展示静态网格体的 **导入设置** 。
    
    1.  向下滚动到窗口底部的 **Fbx文件信息（Fbx File Information）** 分段，查看资产细节。注意， **创建程序（Creator Application）** 为 **Unity FBX Exporter 5.1.1** ，而 **文件轴方向（File Axis Direction）** 为 **Y轴向上（Y-UP）** 。
        
        ![向下滚动到Fbx文件信息分段，查看资产细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0895f596-cee2-46f5-a72b-2849b00453a7/unity-import-13.png)
    2.  向上滚动到 **网格体（Mesh）** 分段，然后 **勾选** **生成缺失的碰撞（Generate Missing Collision）** 复选框。
        
        ![勾选生成缺失的碰撞复选框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3df1249b-d310-4212-b17e-eec970545dfb/unity-import-14.png)
    3.  如果要将多个网格体合并成一个，请展开 **高级（Advanced）** 分段，勾选 **合并网格（Combine Meshes）** 复选框。如果你的网格体有LOD，你也可以 **勾选** **导入网格体LOD（Import Mesh LODs）** 。
        
        ![如有需要，勾选组合网格体和导入网格体LOD](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8710a316-0392-46ad-8083-2e9e2a9c36d2/unity-import-15.png)
    4.  向下滚动到 **杂项（Miscellaneous ）** 分段，然后 **勾选** **转换场景（Convert Scene）** 和 **强制前向X轴（Force Front X Axis）** 复选框。
        
        ![勾选转换场景和强制前向X轴复选框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e91354c-dc87-4ac4-ad48-7bf9b29f7e6a/unity-import-16.png)
    5.  向下滚动到 **材质（Material）** 分段，点击 **材质导入方式（Material Import Method）** 下拉菜单，选择 **创建新材质（Create New Materials）** 。这将自动为静态网格体创建新材质。
        
        ![点击材质导入方式下拉菜单，选择创建新材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ecf1025-72e6-4341-ae8b-22248f6d4f06/unity-import-17.png)
    
    如需详细了解FBX导入器的可用设置，请参阅FBX导入选项参考页面。
    
4.  点击 **导入全部（Import All）** 将静态网格体导入到虚幻引擎中。
    
    ![点击导入全部](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0a48e46-fefd-48a6-892c-f19e648a27d8/unity-import-18.png)
5.  **静态网格** 资产以及 **材质** 和 **纹理** 现已被导入到虚幻引擎中。
    
    ![静态网格资产现已被导入到虚幻引擎中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15c020bd-0cdf-4a55-a523-588215bca48f/unity-import-19.png)
6.  将 **静态网格体** 资产从 **内容浏览器（Content Browser）** 拖到关卡中，即可看到最终效果。
    
    ![将静态网格体资产拖入关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/080af8c7-a4c7-42ff-9f60-ae9e93b2f90b/unity-import-20.png)

如需详细了解静态网格体FBX管线，请参阅[FBX静态网格体管线](/documentation/zh-cn/unreal-engine/fbx-static-mesh-pipeline-in-unreal-engine)文档。

## 蒙皮网格体/骨骼网格体

![Unity内的骨骼网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/817feb2b-e478-4339-9cc8-53db0076c918/unity-import-21.png)

我们在虚幻引擎中创建角色时会用到很多独特的资产，这些资产用于渲染视觉几何体、播放动画、构建实时控制角色行为的逻辑。

虚幻引擎中角色的基础资产是 **骨骼网格体** 资产，其中包含角色的 **视觉效果网格体** ，即角色的几何模型渲染，还包含带骨骼数据的角色 **[骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)** ，骨骼数据用于制作角色的动画。

如需详细了解虚幻引擎中的骨骼网格体，请参阅[骨骼网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)文档。

本示例将演示如何将虚幻引擎的 **Quinn** 角色从Unity中导出到虚幻引擎。

该预制体有一个 **根** 组件，其中包含用于IK处理的多个变换，以及一个有蒙皮网格体渲染器和两种材质的 **骨骼网格体组件** 。

![Quinn角色预制体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/495ff294-8c7a-49f4-8411-be942b382c79/unity-import-22.png) ![有蒙皮网格体渲染器和两种材质的骨骼网格体组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb2a1553-ca09-47e4-80c0-a629862cd7b0/unity-import-23.png)

### 从Unity导出骨骼网格体

要从Unity中导出 **骨骼网格体** ，请执行以下步骤：

1.  右键点击 **层级（Hierarchy）** 窗口中的预制体，然后在菜单中选择 **导出FBX...（Export FBX…）** 。
    
    ![右键点击层级窗口中的预制体，选择导出FBX](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/039c613c-1ff9-45d1-8ee6-1c08a9bc4efc/unity-import-24.png)
2.  在 **导出选项（Export Options）** 窗口中，填写 **导出名称（Export Name）** 和 **导出路径（Export Path）** 。
    
    1.  在 **选项（Options）** 类别中，选择 **ASCII导出格式（ASCII Export Format）** ，然后点击 **包含（Include）** 下拉菜单，选择 **模型+动画（Model(s) + Animations）** 。这样就能包括分配给骨骼网格体的所有动画。
    2.  如果你的网格体有细节级别（LOD），请选择相应的级别。
    3.  **勾选** **带动画的蒙皮网格体（Animated Skinned Mesh）** 复选框。
    4.  如果你想导出带有相应纹理的网格体材质，请 **勾选** **嵌入纹理（Embed Textures）** 复选框。
    5.  点击 **导出（Export）** 导出你的静态网格体。
    
    ![为骨骼网格体输入正确的导出选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9796864-2f49-447b-91d3-837ba9e2e73e/unity-import-25.png)
3.  前往 **导出路径（Export Path）** 文件夹，找到骨骼网格体的.fbx文件。这就是你要导入到虚幻引擎中的文件。
    
    ![前往导出路径文件夹，找到骨骼网格体的.fbx文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8086b11a-8691-498b-996f-25aaef36d7c8/unity-import-26.png)

### 将骨骼网格体导入虚幻引擎

要将 **骨骼网格体** 导入虚幻引擎，请执行以下步骤：

1.  打开 **虚幻引擎** 并点击 **内容浏览器（Content Browser）** 中的 **导入（Import）** 按钮。
    
    ![点击内容浏览器中的导入按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/045d962b-d987-46f8-9755-58cd2975f833/unity-import-27.png)
2.  前往 **导出路径文件夹** ，并选择 **骨骼网格体** 的.fbx文件，点击 **打开（Open）** 。
    
    或者，在Unity中使用 **在资源管理器中显示（Show in Explorer）** 后，你可以将文件从文件资源管理器窗口直接 **拖动** 到虚幻引擎的 **内容浏览器（Content Browser）** 中以导入该文件。
    
3.  **FBX导入选项（FBX Import Options）** 窗口将打开，展示静态网格体的 **导入设置** 。
    1.  向下滚动到窗口底部的 **Fbx文件信息（Fbx File Information）** 分段，查看资产细节。注意， **创建程序（Creator Application）** 为 **Unity FBX Exporter 5.1.1** ，而 **文件轴方向（File Axis Direction）** 为 **Y轴向上（Y-UP）** 。
        
        ![下滚到Fbx文件信息分段，查看资产细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/120e50c9-0140-4b85-8c5a-f29dd86c7dd2/unity-import-29.png)
    2.  向上滚动到 **网格体（Mesh）** 分段，然后勾选 **骨骼网格体（Skeletal Mesh）** 和 **导入网格体（Import Mesh）** 的复选框。点击 **导入内容类型（Import Content Type）** 下拉菜单，选择 **几何体和蒙皮加权（Geometry and Skinning Weights）** 。
        
        ![勾选骨骼网格体和导入网格体复选框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/639d0fa3-f0de-45e6-b3c5-f71bbb5ba3c3/unity-import-30.png)
        
        如果你的虚幻引擎项目已经有骨架资产，而且与你正在导入的角色骨架兼容，你可以选择在 **骨架（Skeleton）** 下拉菜单中选择兼容的骨架。但是，除非骨架资产完全相同，否则你应该选择将骨架作为各自的资产导入，然后将不同的骨架资产定义为兼容。如需更多信息，请参阅[可兼容的骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine#compatibleskeletons)文档。
        
    3.  如果你的骨骼网格体在被导出时带有动画，请向下滚动到 **动画（Animation）** 分段， **勾选** **导入动画（Import Animations）** 复选框。本例中的骨骼网格体不包含任何动画。
        
        ![如果骨骼网格体有动画，勾选导入动画复选框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a63e48e3-75fb-4c7e-a674-4074f67c9ebb/unity-import-31.png)
    4.  向下滚动到 **材质（Material）** 分段，点击 **材质导入方式（Material Import Method）** 下拉菜单，选择 **创建新材质（Create New Materials）** 。这将自动为骨骼网格体创建新材质。
        
        ![点击材质导入方式下拉菜单，选择创建新材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49613b8d-b465-418e-9623-6c946c464f7f/unity-import-17.png)
        
        如需详细了解FBX导入器的可用设置，请参阅FBX导入选项参考页面。|
        
4.  点击 **导入全部（Import All）** 将骨骼网格体导入虚幻引擎。
    
    ![点击导入全部](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95b47c46-ce1a-4641-b402-14f8afc377f2/unity-import-32.png)
5.  **骨骼网格体** 资产以及 **材质** 和 **纹理** 现已被导入到虚幻引擎中。此外，也根据骨骼网格体创建了 **骨架** 和 **物理资产** 。
    
    ![骨骼网格体资产现已被导入到虚幻引擎中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8a0709b-4b99-47c1-8da2-a5098d2659c2/unity-import-33.png)
6.  将 **骨骼网格体** 资产从 **内容浏览器（Content Browser）** 拖到关卡中，即可看到最终效果。
    
    ![将骨骼网格体资产拖入关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5bdbe3a0-14a7-4c2a-b973-c37249630b49/unity-import-34.png)

如需详细了解骨骼网格体FBX管线，请参阅[骨架网格体管线](/documentation/zh-cn/unreal-engine/fbx-skeletal-mesh-pipeline-in-unreal-engine)文档。

## 动画

![虚幻引擎内的角色动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db32c800-2890-4e83-8bfb-80ef0051d13f/ue5-animation.gif)

你可以使用虚幻引擎强大的 **动画工具** 和 **编辑器** 套件，直接在引擎中创建 **角色** 和 **对象运行时动画系统** 、 **渲染的过场动画内容** 以及编写 **新的动画内容** 。

我们在虚幻引擎中使用[骨架网格体动画系统](/documentation/zh-cn/unreal-engine/skeletal-mesh-animation-system-in-unreal-engine)制作角色 **动画** 。动画应用于 **骨骼网格体** ，并由 **动画资产** （如[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)）驱动。

虚幻引擎提供了多种动画工具，可配合骨骼网格体使用，进一步增强动画效果。

如需详细了解骨骼网格体动画系统，以及虚幻引擎中的动画[编辑器](/documentation/zh-cn/unreal-engine/animation-editors-in-unreal-engine)、[动画资产和功能](/documentation/zh-cn/unreal-engine/animation-assets-and-features-in-unreal-engine)套件，请参阅[动画角色和对象](/documentation/zh-cn/unreal-engine/skeletal-mesh-animation-system-in-unreal-engine)文档。

### 从Unity导出动画剪辑片段

你可以使用 **FBX导出器（FBX Exporter）** 软件包，将Unity中的 **动画剪辑片段（Animation Clips）** 导出为.fbx文件。导出的文件随后可作为 **动画序列** 导入到虚幻引擎中，供你在项目中使用。

![Unity内的骨骼网格体动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52d2d167-cc93-4a40-8818-dd73262aebe4/unity-import-anim-02.gif)

要从Unity中导出动画剪辑片段，请执行以下步骤：

1.  在Unity项目中找到 **层级（Hierarchy）** 面板，选择含要导出的动画剪辑片段的角色预制体。
    
2.  **右键点击** 该预制体，选择 **导出为FBX...（Export to FBX…）** 。
    
    ![在Unitiy内导出动画剪辑片段](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75da09f2-3de8-41c9-9650-505d87e3c49d/unity-import-anim-03.png)
3.  设置 **导出名称（Export Name）** 和 **导出路径（Export Path）** 等属性，为你的导出文件命名，决定其在计算机上的保存位置。
    
    ![导出名称和导出路径属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/baa95756-8000-4483-891a-376d2e80120e/unity-import-anim-04.png)
4.  将 **导出格式（Export Format）** 属性设置为 **ASCII** ，然后选择将 **包含（Include）** 属性设置为 **模型+动画（Model(s) + Animation）** 。你也可以选择使用 **LOD级别（LOD Level）** 属性决定是否包含角色的所有细节级别模型（LOD），并为 **对象位置（Object(s) Position）** 属性设置自定义的变换值。
    
    ![选项设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99731e68-6fbc-4060-95f2-fa48286bf51e/unity-import-anim-05.png)
    
    将 **包含（Include）** 属性设置为 **模型+动画（Model(s) + Animation）** 即可导出动画剪辑片段、你的角色模型和骨架层级，并将全部内容存储在单一的.fbx文件中。这将方便你将资产导入到虚幻引擎中，因为所有资产都将保存在一起。
    
5.  **勾选** **带动画的蒙皮网格体（Animated Skinned Mesh）** 复选框，然后点击 **导出（Export）** 按钮将资产导出。
    
    ![勾选带动画的蒙皮网格体复选框并点击导出](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e916bc8c-f6cc-423e-a541-936f23c81129/unity-import-anim-06.png)

### 将动画导入虚幻引擎

要将动画从Unity导入到虚幻引擎，请执行以下步骤：

1.在虚幻引擎的 **内容浏览器（Content Browser）** 中，点击 **导入（Import）** 按钮。

![虚幻引擎内容浏览器导入按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da082e5b-cc31-40d4-8e3d-acd0afdc154c/unity-import-anim-07.png)

1.  在计算机上找到导出Unity动画剪辑片段的保存位置，选择文件，然后点击 **打开（Open）** 按钮。
    
    或者，在Unity中使用 **在资源管理器中显示（Show in Explorer）** 后，你可以将文件从文件资源管理器窗口直接 **拖动** 到虚幻引擎的 **内容浏览器（Content Browser）** 中以导入该文件。
    
2.  在 **FBX导入选项（FBX Import Options）** 窗口，设置如下属性：
    
    1.  **启用** **骨骼网格体（Skeletal Mesh）** 属性。
    2.  如果你想导入动画剪辑片段，并使用动画序列资产生成新的骨骼网格体资产，请 **启用** **导入网格体（Import Mesh）** 属性。如果你只想将动画作为动画序列导入，请 **禁用** 此属性。在本示例中，我们只导入动画，并不想同时导入网格体，因为先前已经导入了骨骼网格体。
        
        ![在FBX导入选项窗口设置正确选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e18114fa-27e9-44e9-bf04-93ef55c38941/unity-import-anim-08.png)
        
        如果你要导入网格体，还需 **勾选** **导入动画（Import Animations）** 复选框。
        
        ![导入动画属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48ce91b6-16ba-4e18-900c-595a6ba25017/unity-import-anim-09.png)
        
    3.  如果你要导入新角色，并希望在导入过程中生成新骨架资产，请不要定义 **骨架（Skeleton）** 属性。如果要导入动画并且希望将其用于项目中的现有角色骨骼，请从资产选择下拉菜单中选择骨骼资产。在本例中，动画将用于Quinn的骨架网格体，因此属性被定义为使用 **SK\_Mannequin** 资产。
        
        ![虚幻引擎骨架属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/980533b1-8715-4c2c-87c7-8215ec3d398d/unity-import-anim-10.png)
        
        如果你的虚幻引擎项目已经有骨架资产，且已与你正在导入的角色骨架兼容，你也可以选择使用兼容骨架定义该 **骨架（Skeleton）** 属性。但是，除非骨架资产完全相同，否则你应该选择将骨架作为各自的资产导入，然后将不同的骨架资产定义为兼容。如需更多信息，请参阅[可兼容的骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine#compatibleskeletons)文档。
        
    4.  定义好FBX导入选项（FBX Import Option）窗口属性后，点击 **Import（导入）** 来导入资产。
        
        使用FBX导入选项窗口导入骨骼网格体和动画资产时， **导入全部（Import All）** 或 **导入（Import）** 按钮均可用来启动导入过程。**导入全部（Import All）** 将导入.fbx文件中包含的所有相关网格体、骨架、材质和纹理资产。该选项适用于导入角色的所有元素。如果你是为已经导入的角色导入额外的相关动画，请选择 **导入（Import）** 选项，从而只导入单个动画资产。
        

导入完成后，你可以在资产编辑器中访问动画序列，或者将资产拖入关卡并[在编辑器中运行项目](/documentation/zh-cn/unreal-engine/playing-and-simulating-in-unreal-engine)。

![虚幻引擎中的动画效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69d953dd-aea7-4d8f-adb6-c9779c8d54ca/unity-import-anim-11.gif)

### 骨骼网格体导入的故障排除

从其他数字内容创建 (DCC) 文件包或游戏引擎导入骨骼网格体角色和对象到虚幻引擎中时，你可能会遇到一些问题。例如，由于不同程序及各自的坐标系之间存在差异，在导入对象后，比例或旋转角度可能不对。

虚幻引擎的FBX Import Settings（FBX导入设置）菜单可以纠正导入过程中的一些问题，但如果你的对象未能正确导入，请参考以下小节，了解如何纠正导入错误。

#### 比例

虚幻引擎坐标系采用固定的比例尺，1个虚幻单位等于1厘米。其他程序可能有不同的比例尺，因此在两个程序之间迁移文件时，角色或对象可能比设计之初更大或更小。如果从Unity（使用米为单位）迁移文件，将资产导入到虚幻引擎中后，你的角色和对象可能会显得更小。

![导入比例错误](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab5af67b-67ee-41a2-a12d-7d95fdb80392/unity-import-anim-13.png)

要解决这一问题，请在骨骼网格体编辑器中找到 **资产细节（Asset Details）** 面板，然后使用 **导入统一比例（Import Uniform Scale）** 属性为网格体设置一个新值。设置该值后，点击编辑器工具栏上的 **重新导入基础网格体（Reimport Base Mesh）** 按钮。

![修复导入比例的错误](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1abdbafb-1fa1-4109-92c7-5a8c50957d2b/unity-import-anim-14.png)

#### 旋转

角色的骨架、骨骼网格体或动画资产在视口中的旋转角度可能不正确，要解决这个问题，请在相关编辑器中打开该资产。

![导入旋转的错误](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0041f20e-814b-45cf-8c65-a100fe46ebe8/unity-import-anim-15.png)

使用 **资产细节（Asset Details）** 面板为 **导入旋转（Import Rotation）** 属性值设置一个值，然后点击资产编辑器 **工具栏** 中的 **重新导入基础网格体（Reimport Base Mesh）** 按钮。如此一来，你的资产应该会在虚幻引擎中按正确角度旋转。

![修复导入旋转的错误](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fea78e37-cf58-41f4-ad82-ff7124cbd402/unity-import-anim-16.png)

由于Unity的坐标系和虚幻引擎的坐标系存在差异，在 **X轴** 上使用 **90.0** 的值应该可以纠正骨骼网格体或动画序列资产的所有旋转问题。

#### 转换场景属性

在资产的 **资产细节（Asset Details）** 面板中，你可以 **启用** **转换场景（Convert Scene）** 、**强制前向轴（Force Front Axis）** 和 **转换场景单位（Convert Scene Unit）** 等属性，以便在运行过程中纠正破损或不规则的网格体。启用以上任何一项属性后，点击资产编辑器工具栏中的 **重新导入基础网格体（Reimport Base Mesh）** 按钮，即可应用更改。

![转换场景属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19b985e2-9cb0-4168-84fd-59352f66c754/unity-import-anim-17.png)

#### 同时编辑多个资产

将资产导入到虚幻引擎中时，有可能需要对多个资产的某个设置进行相同的修正，例如导入旋转或导入比例。你可以用批量编辑同时为多个资产应用相同的设置或属性值，而不必单独编辑每个资产。

要同时编辑多个资产，请执行以下步骤：

1.  **按住Shift键并点击** ，在 **内容浏览器（Content Browser）** 中选择要编辑的各个资产。
    
2.  **右键点击** 选中的资产，然后在快捷菜单中选择 **资产操作（Asset Actions）** > **在属性矩阵中编辑选中项（Edit Selection in Property Matrix）** 选项。
    
    ![批量编辑设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1b71bfb-1e05-439b-aea5-d2859f5c57a3/unity-import-anim-12.png)
3.  现可在 **资产细节（Asset Details）** 面板中访问各资产属性，你可以搜索或前往特定属性，将设置一次性应用到所有资产。
    

### 动画蓝图

导入骨骼网格体角色及其动画序列资产后，你可以使用 **动画蓝图** 在运行时驱动动画的播放和逻辑。可以使用这些图表选择要播放的动画、混合不同的动画合、将动画分层。如需详细了解如何在项目中使用动画蓝图驱动动画，请参阅[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)文档。

![动画蓝图图表概览](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19e8a5cf-5839-41a3-abc0-80af4be7b852/unity-import-anim-18.png)

## 纹理

![一个带有材质的立方体，使用了Unity中的砖块纹理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d211d51c-dfde-4be4-9d70-255c50049fc0/unity-import-35.png)

**纹理** 是图像资产，主要用于材质或应用于对象。纹理也可直接用于其他用途，如抬头显示（HUD）等。

虚幻引擎使用[纹理流送](/documentation/zh-cn/unreal-engine/texture-streaming-overview-for-unreal-engine)渲染纹理，优化将纹理加载到场景的过程。纹理流送系统使用纹理 **mipmap** ，即预先计算好的、同一纹理在不同分辨率下的图像序列。

如需详细了解虚幻引擎中的纹理，请参阅[纹理](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine)文档。

### 从Unity导出纹理

Unity会将纹理文件以原始格式保存在项目目录中，因此无需从Unity导出纹理。你可以直接从项目目录复制文件。

要在Unity项目目录中找到纹理文件，请执行以下步骤：

1.  **右键单击** **项目（Project）** 窗口中的纹理文件，然后点击 **在资源管理器中显示（Show in Explorer）** 。
    
2.  现在你能看到项目目录中的文件。你可以直接从此处复制文件，或在虚幻引擎中使用此文件夹位置查找文件。
    
    ![现在你能在项目目录中看到文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea939103-b27d-43f6-aabe-ea3eeee08f6e/unity-import-37.png)

### 将纹理导入虚幻引擎

要将 **纹理** 导入到虚幻引擎中，请执行以下步骤：

1.  打开 **虚幻引擎** 并点击 **内容浏览器（Content Browser）** 中的 **导入（Import）** 按钮。
    
    ![点击内容浏览器中的导入按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ecaeae8-51d9-4ceb-bca7-38193ccdbd23/unity-import-38.png)
2.  找到纹理所在的 **Unity项目文件夹** ， **选择纹理** 文件，然后点击 **打开（Open）** 。
    
    ![选择纹理文件并点击打开](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cdbe4ef3-2caf-4260-a0ec-46bfa05418ba/unity-import-39.png)
    
    或者，在Unity中使用 **在资源管理器中显示（Show in Explorer）** 后，你可以将文件从文件资源管理器窗口直接 **拖动** 到虚幻引擎的 **内容浏览器（Content Browser）** 中以导入该文件。
    
3.  **纹理** 现已被导入到虚幻引擎中。
    
    ![纹理现已被导入到虚幻引擎中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9deec344-a5a8-427c-a668-74e9b97017df/unity-import-40.png)

要了解如何在材质中使用纹理，请参阅下文的 **着色器/材质** 小节。

## 着色器/材质

![一个立方体，带有Unity中的砖块材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6739e028-14da-402a-bb41-4d7e877d875f/unity-import-41.png)

虚幻引擎中的 **材质（Materials）** 定义了场景中对象的表面属性。从广义上来讲，你可以将材质视为涂在网格体上并控制其视觉外观的"涂料"。

从更偏技术性的角度来讲，材质确切告知渲染引擎一个表面应该如何与场景中的光线交互。材质定义了表面的每个方面，包括颜色、反射性、崎岖度、透明度，等等。执行这些计算时使用了从各种 **图像（纹理）** 和基于节点的 **材质表达式** 以及材质本身固有的各种[属性设置](/documentation/zh-cn/unreal-engine/unreal-engine-material-properties)输入到材质的数据。

如需详细了解虚幻引擎中的材质，请参阅[材质](/documentation/zh-cn/unreal-engine/unreal-engine-materials)文档。

### 从Unity导出材质

Unity用 **着色器图表（Shader Graph）** 直观地构建着色器。Unity也有 **材质** ，这些材质可引用着色器图表资产并直接应用于GameObject。

虚幻引擎的材质则在内部转换为着色器，并使用[材质编辑器](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-user-guide)编译，该编辑器也使用基于节点的方法来编译材质。

无法直接从Unity导出着色器图表资产并在虚幻引擎中转换为材质图表。但你可以将所有相关 **纹理** 从Unity导出到虚幻引擎，然后在虚幻引擎的材质编辑器中重新编译着色器图表节点网络。

下方示例展示了 **光照着色器图表** ，它包含一个应用于 **基础颜色** 的纹理和另一个作为 **法线贴图** 的纹理。

![使用2个纹理的光照着色器图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4480cd6b-bb7e-4cd2-83d5-6564d1d4e443/unity-import-42.png)

请按照本文档 **纹理** 部分所述的步骤，从Unity导出这两个纹理。

### 将材质导入虚幻引擎

由于无法直接从Unity导入材质，你需要在虚幻引擎的材质编辑器中重新编译上图所示的着色器图表。

请执行以下步骤来编译材质：

1.  请按照本指南的 **纹理** 小节所述的步骤，将这些纹理导入到虚幻引擎中。
    
    ![纹理现已被导入到虚幻引擎中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b09922e-f30e-437b-a7fc-118a9ccaf0fd/unity-import-40.png)
2.  在 **内容浏览器（Content Browser）** 中，右键点击并选择 **材质（Material）** 以新建材质。将资产命名为 **M\_Bricks** 。
    
    ![创建新材质并命名为M_Bricks](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc7106c7-9e24-4dbb-a7b3-96578c3564a2/unity-import-43.png) ![材质资产已创建](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e1ed122-2295-4a72-a1f4-e11165c972ed/unity-import-44.png)
3.  双击 **M\_Bricks** 打开材质编辑器。
    
    ![双击M_Bricks打开材质编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9e20014-627f-4d20-9f66-f4c21f97004f/unity-import-45.png)
4.  在 **内容浏览器（Content Browser）** 中选择 **纹理** ，将纹理拖入 **材质编辑器（Material Editor）** ，创建两个 **Texture Sample节点** 。
    
    ![选择纹理并拖入材质编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc54633d-2ce3-40b6-853c-3c9496227a3a/unity-import-46.png)
5.  将引用 **漫反射** 纹理的 **Texture Sample** 节点连接到材质节点的 **基础颜色（Base Color）** 引脚。然后将引用 **法线贴图** 纹理的 **Texture Sample** 节点连接到材质节点的 **法线（Normal）** 引脚。
    
    ![将Texture Sample节点连接至材质节点的基础颜色和法线引脚](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53d2f124-c608-471a-bf51-57cf89137389/unity-import-47.png)
6.  在材质节点上，将 **高光度（Specular）** 设为 **0.2** ，将 **粗糙度（Roughness）** 设为 **0.8** 。点击 **保存（Save）** 按钮以编译并保存材质。
    
    ![在材质节点上，将高光设为0.2，将粗糙度设为0.8](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fecbab7c-030d-4cd4-b7b2-906a880437fc/unity-import-48.png)
7.  在视口中，点击 **添加 +（Add +）> 形状（Shapes）> 立方体（Cube）** ，为关卡添加一个立方体静态网格体。
    
    ![视口内点击添加 + - 形状 - 立方体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4871d715-df9c-4f88-bb82-51b85c2e6b83/unity-import-49.png) ![在关卡内加入立方体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/943132b7-e396-4fae-b391-8b4a81bd299c/unity-import-50.png)
8.  在 **内容浏览器（Content Browser）** 中选择 **M\_Bricks** ， **将其拖动** 到关卡中的 **立方体** 静态网格体上以应用该材质。
    
    ![选择M_Bricks并拖到立方体静态网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70141cb6-a1c5-414e-9c83-cf0aa1024915/unity-import-51.png)

如需详细了解材质FBX管线，请参阅[FBX材质管线](/documentation/zh-cn/unreal-engine/fbx-material-pipeline-in-unreal-engine)文档。

## 粒子效果

![虚幻引擎内的Niagara视觉效果系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93f6dacc-a414-4eb2-af6d-ed5b91619e46/ue-vfx.gif)

Unity的视觉效果图表用于创建GPU粒子模拟。该系统使用基于节点的接口来创建效果，并能在Gameplay中模拟大量粒子。

**Niagara视觉效果处理系统** 是虚幻引擎的次世代视觉特效处理系统。Niagara为用户提供全面掌控。它可对每个轴进行编程和定制，并提供先进的工具用于调试、可视化和性能测量。

Niagara **系统** 包含一个或多个 **发射器** ，可组合创建复杂的效果。发射器可独立生成 **CPU** 或 **GPU粒子** ，并可将粒子渲染为 **Sprite** 、 **网格体** 、 **贴花** 、 **光源** 和 **条带** 。此外，Niagara系统还具有 **继承性** ，这意味着你可以创建一个主Niagara系统，并从中派生出多个子系统。

高级用户可以在系统中直接创建 **自定义模块** ，从而完全控制发射器的行为。Niagara还提供 **预制模板** ，包括一整套[流体模拟](/documentation/zh-cn/unreal-engine/niagara-fluids-in-unreal-engine)示例，包括 **2D** 和 **3D气体** 、 **液体** 和 **浅水** 。

Niagara粒子可通过网格体距离场、碰撞和NeighborGrid3D模块与环境互动，该模块可实现复杂的粒子BOID行为，如群集。

Niagara支持虚幻引擎中其他系统的输入数据，例如物理、动画和蓝图代码。它也支持外部来源的输入数据。

Unity视觉效果图表不能直接导出和导入到虚幻引擎中，因此你必须在Niagara中重新创建效果。许多效果使用的材质和纹理是可以导出的。如需了解如何从Unity导出纹理，请参阅本文档的 **纹理** 小节。

如需详细了解Niagara，请参阅[创建视觉效果](/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine)文档。

## 音频

Unity的音频系统可以导入并在3D空间中播放各种音频文件格式。该系统还可以在运行时应用许多可选效果，例如混响。

**虚幻音频引擎** 是一款健壮的音频引擎，能在虚幻引擎支持的所有平台上支持多种功能。

该音频引擎附带一个多平台的[音频混成器](/documentation/zh-cn/unreal-engine/audio-mixer-overview-in-unreal-engine)，可进行音频数字信号处理（DSP）、程序化合成、可自定义的子混合图表以及灵活的C++ API。

各种次世代功能，如[MetaSounds](/documentation/zh-cn/unreal-engine/metasounds-in-unreal-engine)、[音频调制](/documentation/zh-cn/unreal-engine/audio-modulation-in-unreal-engine)、[音频分析](/documentation/zh-cn/unreal-engine/audio-analysis-and-visualization-in-unreal-engine)以及支持自定义交互式和[程序化音乐系统](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds)的功能，意味着无需使用FMOD或Wwise等音频中间件，即可为游戏创建丰富的交互式音频。

如需详细了解虚幻引擎中的音频，请参阅[虚幻引擎5中的音频系统](/documentation/zh-cn/unreal-engine/audio-in-unreal-engine-5)文档。

### 从Unity导出音频文件

Unity会将音频文件以原始格式保存在项目目录中，因此无需从Unity导出音频文件。你可以直接从项目目录中复制文件。

要在Unity项目目录中找到音频文件，请执行以下步骤：

1.  右键单击 **项目（Project）** 窗口中的音频文件，然后点击 **在资源管理器中显示（Show in Explorer）** 。
    
2.  现在你能看到项目目录中的音频文件。你可以直接从此处复制文件，或在虚幻引擎中使用此文件夹位置查找文件。
    
    ![现在你能在项目目录中看到音频文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59b3d27c-9975-4eed-89c0-91d8589de536/unity-import-53.png)

### 将音频文件导入虚幻引擎

要将 **音频文件** 导入到虚幻引擎中，请执行以下步骤：

1.  打开 **虚幻引擎** 并点击 **内容浏览器（Content Browser）** 中的 **导入（Import）** 按钮。
    
    ![点击内容浏览器中的导入按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ad5f77d-c431-4703-9235-0d4d49b005db/unity-import-54.png)
2.  找到音频文件所在的 **Unity项目文件夹** ， **选择音频** 文件，然后点击 **打开（Open）** 。
    
    或者，在Unity中使用 **在资源管理器中显示（Show in Explorer）** 后，你可以将文件从文件资源管理器窗口直接 **拖动** 到虚幻引擎的 **内容浏览器（Content Browser）** 中以导入该文件。
    
3.  **音频文件** 现已被导入到虚幻引擎中。
    
    ![**音频文件** 现已被导入到虚幻引擎中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/214d7aa1-3caf-4cf8-a5d1-ad054ac54293/unity-import-56.png)
4.  右键点击 **内容浏览器（Content Browser）** 中的 **音频文件** ，然后点击 **创建Cue（Create Cue）** 来创建Sound Cue资产。这是虚幻引擎用于在游戏中播放声音的标准音频资产。
    
    ![已在内容浏览器中创建Sound Cue](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28d82322-4ab7-4c3d-9b0a-1af8eb08004f/unity-import-58.png)

如需详细了解Sound Cue，请参阅[Sound Cue](/documentation/zh-cn/unreal-engine/sound-cues-in-unreal-engine)文档。我们还推荐你了解[MetaSounds](/documentation/zh-cn/unreal-engine/metasounds-in-unreal-engine)，因为与Sound Cue相比，它提供了更多高级功能。

## 视频

![UE5揭晓](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80d8fd9c-99a1-474b-b826-419a02f11b1e/ue5-revealed.gif)

Unity的视频播放器组件可将视频文件附到GameObject上，并提供多个在场景中播放视频文件的选项。

虚幻引擎则附带功能齐全的[媒体框架](/documentation/zh-cn/unreal-engine/media-framework-technical-reference-for-unreal-engine)，提供了类似的功能。该框架支持多种视频文件格式，具有播放优化功能，并支持Windows和Android设备上的音频/视频采集硬件。

如需详细了解在虚幻引擎内播放视频文件，请参阅[播放视频文件](/documentation/zh-cn/unreal-engine/play-a-video-file-in-unreal-engine)文档。

### 从Unity导出视频文件

Unity会将视频文件以原始格式保存在项目目录中，因此无需从Unity导出视频。你可以直接从项目目录中复制文件。

要在Unity项目目录中找到视频文件，请执行以下步骤：

1.  **右键单击** **项目（Project）** 窗口中的视频文件，然后点击 **在资源管理器中显示（Show in Explorer）** 。
    
2.  现在你能看到项目目录中的文件。你可以直接从此处复制文件，或在虚幻引擎中使用此文件夹位置查找文件。
    
    ![现在你能在项目目录中看到视频文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1e68caf-64a0-4e6e-8d12-37349847a077/unity-import-60.png)

### 将视频文件导入虚幻引擎

要将 **视频文件** 导入到虚幻引擎中，请执行以下步骤：

1.  打开 **虚幻引擎** 并点击 **内容浏览器（Content Browser）** 中的 **导入（Import）** 按钮。
    
    ![点击内容浏览器中的导入按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9762f80a-f43a-412f-9f32-62542b57176e/unity-import-61.png)
2.  找到视频所在的 **Unity项目文件夹** ， **选择视频** 文件，然后点击 **打开（Open）** 。
    
    或者，在Unity中使用 **在资源管理器中显示（Show in Explorer）** 后，你可以将文件从文件资源管理器窗口直接 **拖动** 到虚幻引擎的 **内容浏览器（Content Browser）** 中以导入该文件。
    
3.  **视频文件** 现已被导入到虚幻引擎中。**内容浏览器** 中会自动创建一个 **媒体板Actor** ，将其拖入关卡中即可直接播放视频文件。
    
    ![**视频文件** 现已被导入到虚幻引擎中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42ccaf02-9ac6-4e2e-8925-ff6b9b7c9270/unity-import-63.png)
4.  选择 **内容浏览器（Content Browser）** 中的 **视频文件** ，将其拖入关卡。
    
    ![选择视频文件并将其拖入关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad34dcb2-357b-45f1-932e-f953666bd902/unity-import-64.png)
5.  选择 **媒体板Actor** 后，转到 **细节（Details）** 面板并向下滚动到 **控制（Control）** 分段。
    
    1.  **勾选** **打开时播放（Play on Open）** 、 **自动播放（Auto Play）** 和 **启用音频（Enable Audio）** 复选框。
    2.  如果需要，请 **勾选** **循环（Loop）** 复选框，从而让视频无限循环。
    
    ![选中媒体板Actor后，转到细节面板进行设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0b936f2-2929-4288-a1c6-388f865401c0/unity-import-65.png)
6.  你还可以向下滚动到 **几何形状（Geometry）** 分段，调整用于显示视频的 **几何形状** （平面、球体或自定义）、 **长宽比（Aspect Ratio）** 和 **黑边长宽比（Letterbox Aspect Ratio）** 。在本例中，我们将 **勾选** **自动长宽比（Auto Aspect Ratio）** 复选框，因此播放时的形状将符合视频文件的原始长宽比。
    
    ![向下滚动到几何形状分段，调整所用的几何形状和长宽比](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1cd021ee-f11f-4179-adfa-c1ceeaaa4cce/unity-import-66.png)
7.  点击 **模拟（Simulate）** 查看视频在关卡内的播放情况。
    
    ![点击模拟查看视频在关卡内的播放情况](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f10f67bd-62a5-4739-9e4c-791f26c1a3cc/unity-import-67.png) ![视频在关卡内播放](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbe5595b-a432-43f9-83e7-34264dda6d52/ue-echo.gif)

如需详细了解 **媒体板Actor** ，请参阅[媒体板Actor](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine)文档。

## 摄像机功能按钮和过场动画序列

![在Sequencer中创建的过场动画序列](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7da48fe5-d070-4261-9cf3-09e0896105f2/ue-sequencer.gif)

Unity配备了多种工具来创建过场动画内容。Timeline工具用于在编辑器中创建过场动画序列，而Cinemachine是一套用于控制摄像机的工具。

开发者可以搭配使用这些工具，从而创建运行时的动态过场动画序列。

**Sequencer** 是虚幻引擎的多轨编辑器，用于实时创建和预览过场动画序列。

该编辑器附带一系列强大的过场动画工具，你可以使用这些工具创建动画和过场动画序列。你可以操纵摄像机来创建关卡飞越漫游视图，对光源进行动画处理，移动对象，对角色进行动画处理，渲染输出序列等等。

在Timeline和Cinemachine中创建的摄像机动画和行为不能直接从Unity导出到虚幻引擎中。对这种用例，你必须使用Sequencer重新创建对应的行为。

关于Sequencer的更多信息，请参阅[过场动画和Sequencer](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)文档。

## 代码和可视化脚本

![Unity和Unreal的代码对比](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf3275da-896f-476b-ba30-4da8c961ca5f/ue-coding.png)

Unity的默认编程语言是C#，而虚幻引擎则使用[C++](/documentation/zh-cn/unreal-engine/programming-with-cplusplus-in-unreal-engine)作为原生编程语言。Unity使用Bolt可视化脚本，它类似于虚幻引擎的[蓝图可视化脚本](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)语言。

Unity C#脚本和Bolt脚本文件不能直接从Unity中导出并导入到虚幻引擎中。你必须使用C++或蓝图来编译功能。

如需了解常见的虚幻引擎编程模式和最佳实践，请参阅[在虚幻引擎中创建Gameplay](https://stage.edc-dev.net/documentation/en-us/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers)文档。

## 2D资产

![Sprite paper 2D资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8582c56-4093-4a16-b363-6440f5df4d85/unity-import-paper2d-01.gif)

**Paper 2D** 是一种基于Sprite的系统，用于在虚幻引擎中开发2D和2D/3D结合的游戏。Paper 2D系统使用映射到平面游戏对象的纹理文件来表示虚幻引擎项目中的2D角色、对象和背景。

如需详细了解Paper 2D和在虚幻引擎中创建2D项目，请参阅[Paper 2D](/documentation/zh-cn/unreal-engine/paper-2d-overview-in-unreal-engine)文档。

### 从Unity导出2D资产

要从Unity导出2D资产，请执行以下步骤：

1.  **右键点击** **项目（Project）** 窗口中的资产，选择 **在资源管理器中显示（Show in Explorer）** ，在计算机上打开资产的位置。
    
    ![从Unity导出Sprite](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89898b65-673b-4806-8681-8512e4f610ab/unity-import-paper2d-02.png)
2.  现在你能看到项目目录中的文件。你可以直接从此处复制文件，或在虚幻引擎中使用此文件夹位置查找文件。
    
    ![文件资源管理器中的Unity资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52b04981-de71-4500-9ca4-58e2b9293574/unity-import-paper2d-05.png)

### 将2D资产导入虚幻引擎

要将 **2D资产** 导入到虚幻引擎中，请执行以下步骤：

1.  打开 **虚幻引擎** 并点击 **内容浏览器（Content Browser）** 中的 **导入（Import）** 按钮。
    
    ![虚幻引擎内容浏览器中的导入按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22b1ec37-2e2d-4ce3-b05d-2959f6cc2dd2/unity-import-paper2d-06.png)
2.  找到2D文件所在的 **Unity项目文件夹** ，选择该2D文件，然后点击 **打开（Open）** 将资产导入。
    
    或者，在Unity中使用 **在资源管理器中显示（Show in Explorer）** 后，你可以将文件从文件资源管理器窗口直接 **拖动** 到虚幻引擎的 **内容浏览器（Content Browser）** 中以导入该文件。
    
    ![将Sprite导入虚幻引擎](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df6e84bf-3dfd-458f-a61c-12bc86135b14/unity-import-paper2d-03.png)
    
3.  2D资产现已被导入到虚幻引擎中
    
    ![导入到虚幻引擎内容浏览器的Sprite](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb8c30dc-1a17-4192-a63e-4abc303d4249/unity-import-paper2d-07.png)
4.  现在文件已导入，你可以使用Paper 2D将其用于创建2D资产或动画。
    

如需了解如何导入资产、创建Sprite和图像序列视图动画，请参阅[Paper 2D](/documentation/404)文档。

## SpeedTree资产

![SpeedTree植被](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1f6449f-529d-4c14-a7b3-9eef26f53eb2/unity-speedtree.png)

SpeedTree是一套专门为实时和线性内容创建植被的产品。该产品中包括树建模器和预设资产，可供购买并直接导入到虚幻引擎中。

如需详细了解在虚幻引擎中使用SpeedTree的方法，请参阅SpeedTree文档的[将SpeedTree用于虚幻引擎的简介](https://docs.speedtree.com/doku.php?id=ue4_introduction)。

-   [unity](https://dev.epicgames.com/community/search?query=unity)
-   [unreal editor](https://dev.epicgames.com/community/search?query=unreal%20editor)
-   [unity to unreal](https://dev.epicgames.com/community/search?query=unity%20to%20unreal)
-   [unity editor to unreal editor](https://dev.epicgames.com/community/search?query=unity%20editor%20to%20unreal%20editor)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [导入和转换资产](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E5%AF%BC%E5%85%A5%E5%92%8C%E8%BD%AC%E6%8D%A2%E8%B5%84%E4%BA%A7)
-   [常见资产类型](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E5%B8%B8%E8%A7%81%E8%B5%84%E4%BA%A7%E7%B1%BB%E5%9E%8B)
-   [将资产导入虚幻引擎前的注意事项](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E5%B0%86%E8%B5%84%E4%BA%A7%E5%AF%BC%E5%85%A5%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E5%89%8D%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
-   [虚幻引擎坐标系](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E5%9D%90%E6%A0%87%E7%B3%BB)
-   [虚幻引擎中的测量单位](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%B8%AD%E7%9A%84%E6%B5%8B%E9%87%8F%E5%8D%95%E4%BD%8D)
-   [FBX内容管线](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#fbx%E5%86%85%E5%AE%B9%E7%AE%A1%E7%BA%BF)
-   [版本信息](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E7%89%88%E6%9C%AC%E4%BF%A1%E6%81%AF)
-   [准备从Unity导出资产](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E5%87%86%E5%A4%87%E4%BB%8Eunity%E5%AF%BC%E5%87%BA%E8%B5%84%E4%BA%A7)
-   [网格体/静态网格体](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93/%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [从Unity导出静态网格体](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E4%BB%8Eunity%E5%AF%BC%E5%87%BA%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [将静态网格体导入虚幻引擎](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E5%B0%86%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E5%AF%BC%E5%85%A5%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E)
-   [蒙皮网格体/骨骼网格体](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E8%92%99%E7%9A%AE%E7%BD%91%E6%A0%BC%E4%BD%93/%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [从Unity导出骨骼网格体](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E4%BB%8Eunity%E5%AF%BC%E5%87%BA%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [将骨骼网格体导入虚幻引擎](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E5%B0%86%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93%E5%AF%BC%E5%85%A5%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E)
-   [动画](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E5%8A%A8%E7%94%BB)
-   [从Unity导出动画剪辑片段](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E4%BB%8Eunity%E5%AF%BC%E5%87%BA%E5%8A%A8%E7%94%BB%E5%89%AA%E8%BE%91%E7%89%87%E6%AE%B5)
-   [将动画导入虚幻引擎](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E5%B0%86%E5%8A%A8%E7%94%BB%E5%AF%BC%E5%85%A5%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E)
-   [骨骼网格体导入的故障排除](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93%E5%AF%BC%E5%85%A5%E7%9A%84%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4)
-   [比例](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E6%AF%94%E4%BE%8B)
-   [旋转](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E6%97%8B%E8%BD%AC)
-   [转换场景属性](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E8%BD%AC%E6%8D%A2%E5%9C%BA%E6%99%AF%E5%B1%9E%E6%80%A7)
-   [同时编辑多个资产](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E5%90%8C%E6%97%B6%E7%BC%96%E8%BE%91%E5%A4%9A%E4%B8%AA%E8%B5%84%E4%BA%A7)
-   [动画蓝图](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E5%8A%A8%E7%94%BB%E8%93%9D%E5%9B%BE)
-   [纹理](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E7%BA%B9%E7%90%86)
-   [从Unity导出纹理](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E4%BB%8Eunity%E5%AF%BC%E5%87%BA%E7%BA%B9%E7%90%86)
-   [将纹理导入虚幻引擎](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E5%B0%86%E7%BA%B9%E7%90%86%E5%AF%BC%E5%85%A5%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E)
-   [着色器/材质](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E7%9D%80%E8%89%B2%E5%99%A8/%E6%9D%90%E8%B4%A8)
-   [从Unity导出材质](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E4%BB%8Eunity%E5%AF%BC%E5%87%BA%E6%9D%90%E8%B4%A8)
-   [将材质导入虚幻引擎](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E5%B0%86%E6%9D%90%E8%B4%A8%E5%AF%BC%E5%85%A5%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E)
-   [粒子效果](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E7%B2%92%E5%AD%90%E6%95%88%E6%9E%9C)
-   [音频](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E9%9F%B3%E9%A2%91)
-   [从Unity导出音频文件](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E4%BB%8Eunity%E5%AF%BC%E5%87%BA%E9%9F%B3%E9%A2%91%E6%96%87%E4%BB%B6)
-   [将音频文件导入虚幻引擎](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E5%B0%86%E9%9F%B3%E9%A2%91%E6%96%87%E4%BB%B6%E5%AF%BC%E5%85%A5%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E)
-   [视频](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E8%A7%86%E9%A2%91)
-   [从Unity导出视频文件](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E4%BB%8Eunity%E5%AF%BC%E5%87%BA%E8%A7%86%E9%A2%91%E6%96%87%E4%BB%B6)
-   [将视频文件导入虚幻引擎](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E5%B0%86%E8%A7%86%E9%A2%91%E6%96%87%E4%BB%B6%E5%AF%BC%E5%85%A5%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E)
-   [摄像机功能按钮和过场动画序列](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE%E5%92%8C%E8%BF%87%E5%9C%BA%E5%8A%A8%E7%94%BB%E5%BA%8F%E5%88%97)
-   [代码和可视化脚本](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E4%BB%A3%E7%A0%81%E5%92%8C%E5%8F%AF%E8%A7%86%E5%8C%96%E8%84%9A%E6%9C%AC)
-   [2D资产](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#2d%E8%B5%84%E4%BA%A7)
-   [从Unity导出2D资产](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E4%BB%8Eunity%E5%AF%BC%E5%87%BA2d%E8%B5%84%E4%BA%A7)
-   [将2D资产导入虚幻引擎](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#%E5%B0%862d%E8%B5%84%E4%BA%A7%E5%AF%BC%E5%85%A5%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E)
-   [SpeedTree资产](/documentation/zh-cn/unreal-engine/migrating-assets-from-unity-to-unreal-engine#speedtree%E8%B5%84%E4%BA%A7)
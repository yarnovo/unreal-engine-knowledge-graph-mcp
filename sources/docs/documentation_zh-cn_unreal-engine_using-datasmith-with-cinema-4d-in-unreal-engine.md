# 在虚幻引擎中使用Datasmith和Cinema 4D | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-datasmith-with-cinema-4d-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:05:38.733Z

---

目录

![使用Datasmith和Cinema 4D](https://dev.epicgames.com/community/api/documentation/image/91c10a7f-b0ee-4c22-a0e6-b9ca41bbd7f6?resizing_type=fill&width=1920&height=335)

本页详述Datasmith如何将场景从Maxon Cinema 4D导入虚幻编辑器。此流程遵循[Datasmith概述](/documentation/zh-cn/unreal-engine/datasmith-plugins-overview)和[关于Datasmith导入流程](/documentation/zh-cn/unreal-engine/datasmith-import-process-in-unreal-engine)所述的基本流程，但添加了Cinema 4D专属的一些特殊转换行为。若计划使用Datasmith将场景从Cinema 4D导入虚幻编辑器，阅读本页有助于了解场景转译的方式，以及如何在虚幻编辑器中处理结果。

![Cinema 4D](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7336883f-631c-4d67-af8d-eb43dd7a8827/c4d-ue4-comparison-c4d.png)

![虚幻引擎](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70271b00-cbe4-45d1-a5d8-d98c5ec69858/c4d-ue4-comparison-ue4.png)

Cinema 4D

虚幻引擎

***鸣谢：**本页使用的教室场景由[Turbosquid](https://www.turbosquid.com/)用户[scripter](https://www.turbosquid.com/Search/Artists/scripter)友情提供。*

## Cinema 4D工作流程

Datasmith使用Cinema 4D的 **直接** 工作流程。这意味着，要利用Datasmith将Cinema 4D内容导入虚幻编辑器，须执行以下操作：

1.  在Cinema 4D中，将你的场景保存到 `.c4d` 文件中。从Cinema 4D的主菜单中，执行以下操作之一：
    -   如果使用的是较新版本的Cinema 4D，请选择 **文件（File）> 针对Cineware保存项目（Save Project for Cineware）** 选项。
    -   如果使用的是较旧版本，则可能需要选择 **文件（File）> 针对Melange保存项目（Save Project for Melange）** 选项。
2.  在虚幻引擎中，为你的项目启用 **Datasmith C4D导入器（Datasmith C4D Importer）** 插件。要了解如何启用插件，请参阅[使用插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)。
    
3.  在虚幻引擎中，使用Datasmith导入选项将 `.c4d` 文件导入你的项目中。有关说明，请参阅[将Datasmith内容导入到虚幻引擎中](/documentation/zh-cn/unreal-engine/importing-datasmith-content-into-unreal-engine)。

在R22之前的Cinema 4D版本中，可将Cinema 4D配置为在保存 `.c4d` 文件时自动包含Datasmith所需的信息。

1.  从主菜单选择 **编辑（Edit）> 偏好设置（Preferences）**。
    
2.  在 **偏好设置（Preferences）** 对话框的 **文件（Files）** 选项卡上，启用以下选项：
    
    -   **针对Melange保存多边形（Save Polygons for Melange）**。
    -   **针对Melange保存动画（Save Animations For Melange）**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a55ee447-1bee-459a-9c64-457a229fe0ad/c4d-files-preferences.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a55ee447-1bee-459a-9c64-457a229fe0ad/c4d-files-preferences.png)

启用这些选项会增加保存的文件占用的磁盘空间。如果不希望文件变大，或者经常使用的Cinema 4D场景无需导入到虚幻引擎中，可能更建议仅在需要时才使用 **文件（File）> 针对Melange保存项目（Save Project for Melange）** 选项。

## 几何体

Datasmith为Cinema 4D场景中每个可见的几何对象创建一个静态网格体资产。

在Cinema 4D的"属性（Properties）"面板中看到的对象名称是Datasmith指定给虚幻引擎中相应静态网格体资产的名称。

要影响Datasmith创建的静态网格体资产和Actor的粒度，可在导出场景之前合并Cinema 4D中的对象。

例如，可执行以下操作：

-   利用Cinema 4D中的 **Connect Objects** 命令将两个对象合并成一个对象。详情请参阅[Cinema 4D文档](https://help.maxon.net/c4d/en-us/#html/5666.html)。
    
-   为了获得更大的灵活性，可使用Cinema 4D中的 **连接对象（Connect Object）** 将接近距离小于给定阈值的对象合成为单个网格体。在本例中，Datasmith导入器为合成的网格体生成单个静态网格体资产，但相连的部分在Cinema 4D中仍为独立的对象。请参阅Cinema 4D文档中的[连接对象](https://help.maxon.net/c4d/en-us/#html/OCONNECTOR.html)。
    

### 对象可视性

若不想将对象导入虚幻引擎，可在Cinema 4D中隐藏，然后再保存 `.c4d` 文件。Datasmith导入器不会将隐藏对象的几何体导入静态网格体资源，也不会将其纳入Datasmith场景层级。

可利用Cinema 4D中的 **对象（Objects）** 面板逐个隐藏对象。另外，也可将要忽略的对象放入其自身的层，然后使用 **层（Layers）** 面板隐藏此层中的所有对象。

### 生成器和变形器

针对Melange保存Cinema 4D场景时，场景中的每个生成器被"烘焙"成单个三角形网格体，表示对象总共过程化生成的几何体。同样，每个变形器也将基于其最终状态被烘焙成单个三角形网格体。Datasmith将每个三角形网格体作为单个静态网格体资源导入。

### 实例、复制器和数组

在Cinema 4D场景中，若使用实例、复制器或排列将单个对象的副本放在场景中的多个不同位置，Datasmith会尊重您的意愿，在内容浏览器中从此对象的几何体创建单个静态网格体资源。然后，它会将此静态网格体资源的多个实例放入Datasmith场景。

### 法线朝向

与大多数实时渲染器一样，虚幻引擎也会自动剔除背对摄像头的三角形，从而最大程度提高性能。然而，Cinema 4D可以使用[背面剔除](https://help.maxon.net/c4d/en-us/#html/45030.html)来渲染几何体，也可以不使用。根据Cinema 4D设置，您可能不习惯考虑表面的朝向。若场景包含单面几何体，且面的表面法线偏离典型观看方向，那么在虚幻引擎中从特定角度观看时，此几何体似乎已消失。

例如，下图显示了一本书籍，其中一个表面法线朝内。场景导入虚幻引擎后，开始时封面似乎已消失。在这种情况下，翻转表面的法线方向可使表面按预期显示。

![Cinema 4D中的书籍](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee554811-adf1-4171-befd-3928b64ba101/backface-compare-c4d.png)

![虚幻引擎中的书籍](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1724d5a4-26bd-40a7-b2a6-611ff8314e10/backface-compare-ue4.png)

Cinema 4D中的书籍

虚幻引擎中的书籍

在Cinema 4D中确认表面朝向预期方向即可避免此类问题。有几种方法可以做到这一点。例如：

-   可以为视口启用 **选项（Options）> 背面剔除（Backface Culling）** 设置。这将隐藏法线偏离摄像机的所有面，就像在虚幻引擎中一样隐藏。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb7feea0-ea83-477d-9004-21089f59c82c/backface-culling.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb7feea0-ea83-477d-9004-21089f59c82c/backface-culling.png)
    
-   处于多边形模式时，所选面朝向您时将黄色高亮显示，但背对您时将蓝色高亮显示。
    
    ![背面为蓝色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84e9b4ec-711a-456a-9313-593500986c3e/backface-facingcolor.png "Back faces are blue")
-   可将视口配置为将顶点法线显示为从每个面中心延伸的白线。选择 **选项（Options）> 配置（Configure）** 并前往 **属性（Attributes）** 面板。确保启用 **多边形法线（Polygon Normals）** 设置，并禁用 **仅显示选定（Selected Only）** 选项，以显示在多边形模式下选中模型的所有面的法线。
    
    ![在所有表面上显示顶点法线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14c79f48-a5c9-4fde-9960-fc7f5d2b11d2/viewport-attributes.png "Show vertex normals on all surfaces")

在Cinema 4D中发现有反向法线的面时，可以用 **Reverse Normals** 命令翻转。参阅[Cinema 4D文档](https://help.maxon.net/c4d/en-us/#html/5670.html)。

欲了解完整讨论和更多可能的解决方案，请参阅[关于Datasmith导入流程](/documentation/zh-cn/unreal-engine/datasmith-import-process-in-unreal-engine)。

## 光源

Datasmith将Cinema 4D中的大多数光源类型转换为虚幻引擎中同等的光源类型。此转换保留了光源最重要的自发光属性，包括场景中的放置、颜色、光度强度、锥角、IES描述文件等。

下表介绍了Datasmith将Cinema 4D光源类型映射到虚幻引擎光源类型的方式：

Cinema 4D

虚幻引擎

点光源、IES光源

[点光源](/documentation/zh-cn/unreal-engine/point-lights-in-unreal-engine)

聚光源、目标光源

[聚光源](/documentation/zh-cn/unreal-engine/spot-lights-in-unreal-engine)

区域光源、PBR光源

[DatasmithAreaLight蓝图](/documentation/zh-cn/unreal-engine/datasmith-import-process-in-unreal-engine#area,plane,andvolumelights)

太阳光源、无限光源

[定向光源](/documentation/zh-cn/unreal-engine/directional-lights-in-unreal-engine)

## 摄像机

针对Cinema 4D场景中的各个摄像机，Datasmith将在Datasmith场景中创建一个CineCamera Actor。此摄像机的放置位置与旋转状态与Cinema 4D中对应的摄像机相同，并保留一些与摄像机物理特性相关的可选设置，包括焦距。

## 场景层级

当Datasmith将一个Cinema 4D场景导入虚幻引擎时，会创建一个与Cinema 4D中的对象层级高度匹配的Actor层级。Datasmith尽可能保留接近的对象名称和层级关系，但可能无法确保完全匹配。

可能的差异包括：

-   **对象排序**：在虚幻编辑器中，**大纲视图（Outliner）** 按字母顺序排列各层级的Actor。Actor的出现顺序可能与Cinema 4D中的对应对象不同，但不会影响它们的层级关系。
    
-   **对象名称**：Datasmith创建的Actor名称只能包含字母数字字符、连字符和下划线。如果Cinema 4D对象的名称包含任何其他字符，Datasmith会自动将其转换为下划线。
    
-   **烘焙程序化元素**：在导入过程中，Datasmith会烘焙Cinema 4D场景的程序化功能，并将这些功能替换为用于复制其效果的静态Actor集。这可能会影响虚幻引擎中的最终层级。请参阅下一小节以了解相关细节。
    

### Datasmith如何烘焙Cinema 4D程序化功能

Datasmith会将Cinema 4D场景中的各个程序化对象（例如，生成器、克隆器或数组）作为与原始Cinema 4D对象同名的单个父Actor导入虚幻引擎。

在每个父Actor下，Datasmith会创建静态网格体Actor来模拟程序化几何体的效果。这些静态网格体Actor与其父Actor具有相同的名称，但带有数字后缀。

如果在Cinema 4D中广泛使用了程序化功能，当Datasmith将你的场景导入虚幻引擎时，会产生复杂的场景层级。但是，在虚幻引擎中可将各个Actor作为单独的实例进行访问。

## 层

导入Cinema 4D场景时，Datasmith会导入每个至少包含一个对象的已命名层， 不会导入空层，即Cinema 4D场景中不含对象的层。Datasmith会将其在虚幻引擎中创建的关卡Actor指定给Cinema 4D场景中对应对象所属的同一层。

要查看导入的层，请使用"层（Layers）"面板（请参阅[层面板](/documentation/zh-cn/unreal-engine/layers-panel-in-unreal-engine)）

## Cinema 4D材质

Datasmith在虚幻引擎项目中为Cinema 4D场景中的各个标准材质和物理材质创建一个新的材质资源。

此类材质资源旨在遵循在Cinema 4D中设置的表面显示方式，同时公开有助于利用虚幻物理渲染器的属性。

要修改材质，请执行以下操作：

1.  在 **内容浏览器** 中双击该材质。或在关卡中选择使用该材质的Actor，并在 **细节（Details）** 面板中双击该材质。
    
2.  随即将打开如下所示的材质实例编辑器，可在其中使用 **细节（Details）** 面板中的设置来修改从Cinema 4D导入的属性。还可以修改虚幻渲染器公开的其他内置参数。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/658ea097-7277-4900-8e43-5e9f6796dc18/material-instance-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/658ea097-7277-4900-8e43-5e9f6796dc18/material-instance-editor.png)
    

有关如何使用材质实例编辑器的更多信息，请参阅[材质实例编辑器用户界面](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui)。

使用材质通道

编辑从Cinema 4D导入的材质时，**细节（Details）** 面板顶部将列出Datasmith在导入流程中处理的不同类型的Cinema 4D通道。若习惯使用Cinema 4D中的材质，那么您应该十分熟悉这些通道的效果和设置。

![材质通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab04749e-88cc-490d-a3d9-4ed9003cd43f/material-channels.png "Material channels")

在顶部 **00全局（00 Global）** 部分激活通道时，**细节（Details）** 面板还包含一个下面的部分，可在其中配置该通道专属的设置。这些设置将公开可以为Cinema 4D中对应通道设置的最重要属性。

例如，上图中激活的通道会导致显示更多分段。你可以在下图中看到这些分段：**颜色（Color）** (1)、**反射率（Reflectance）** (2)、**高光度（Specular）** (3)和 **法线（Normal）** (4)。

![Settings for enabled channels](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4bb4e03a-f319-4e1e-aee8-edf0de98fc0a/material-channels-settings.png "Settings for enabled channels")

此规则唯一的例外是反射颜色通道。激活 **Use\_ReflectionColor** 设置时，将向 **01\_Color** 组添加新的 **反射颜色（Reflection Color）** 和 **反射颜色强度（Reflection Color Strength）** 设置。

![反射颜色设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e0b1aa1-fefe-4dde-be6e-b62875e45e17/material-reflectioncolor.png "Reflection Color settings")

**反射率** 通道中设置的值会影响虚幻引擎中的多个材质输出通道，包括[粗糙度](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#roughness)、[金属感](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#metallic)和[高光度](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine#specular)通道。由于关系较复杂，Datasmith仅转换Cinema 4D中的一层反射率通道。

### 控制纹理UV

**细节（Details）** 面板底部有一些设置，用于控制材质中所有通道的UV映射。更改这些设置，材质就会用不同方法将纹理贴图应用于着色的静态网格体几何体。此处设置的值应用于 *所有* 使用纹理贴图的通道。这些设置的效果类似于Cinema 4d中的[纹理标签](https://help.maxon.net/c4d/en-us/#html/TTEXTURE-ID_TAGPROPERTIES.html)的偏移和平铺设置。

![影响纹理贴图所有通道的整体UV设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/abb7d6a6-c464-40ab-9b4b-f48f096390cb/material-globaluv.png "Global UV settings that affect all channels with texture maps")

若通道的设置中拥有纹理贴图，则其还拥有自身的可选UV包裹控制。例如，**04\_Normal** 通道接受法线贴图纹理，因此它还提供一个设置，用于激活一组仅应用于法线贴图纹理的次要UV控制：

![使用逐通道UV设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62088b2f-8d28-40d7-8b33-15daf1a76e3e/material-channeluv.png "Use per-channel UV settings")

启用此选项时将向通道设置添加一组新的UV映射控制：

![已启用逐通道UV设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2cc2797-587e-4804-81e6-3956ee6cd299/material-channeluv-activated.png "Per-channel UV settings enabled")

若 *同时* 自定义 **UV** 组中的一般UV设置 *和* 特定通道的设置，则会叠加效果。

### 父材质

Datasmith创建的每个材质资源都是[材质实例](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)。此材质实例的父项始终是Datasmith插件中内置的 **C4DMaster** 材质。可打开此父材质，查看材质实例中公开的各个属性在材质图表中的连线方式。还可修改父材质，从而公开其他属性，或更改着色计算时考虑现有属性的方式。参阅[修改Datasmith主材质](/documentation/404)。

### 材质导入限制

Datasmith从Cinema 4D到虚幻引擎的材质转换流程存在一些限制：不支持过程纹理（如噪音）、基于节点的材质（Cinema 4D R20中加入）或第三方渲染器。

此类情况下，若虚幻引擎中的结果需要与Cinema 4D中的内容密切匹配，最好的方法是将材质烘焙成位图纹理，并创建新材质将已烘焙位图应用到对象。参阅[Cinema 4D文档](https://help.maxon.net/c4d/en-us/#html/TBAKETEXTURE.html)。

## 动画

若Cinema 4D场景所含元素的3D变换会随着时间推移生成相应动画（包括关键帧动画[MoGraph](https://help.maxon.net/c4d/en-us/#html/7439.html?highlight=mograph)或[Dynamics](https://help.maxon.net/c4d/en-us/#html/42854.html)），Datasmith自动将此类动画变换导入新的关卡序列资源。可使用 **Sequencer** 工具在虚幻编辑器中播放动画，并使用蓝图在运行时管理交互式播放。

如需获得重要详情，了解如何使用Datasmith生成的关卡序列，请参阅[关于导入流程](/documentation/zh-cn/unreal-engine/datasmith-import-process-in-unreal-engine#animations)的"动画"部分。

## 用户数据

在Cinema 4D中，可通过在 **属性（Attributes）** 面板中选择 **用户数据（User Data）> 管理用户数据（Manage User Data）** 将用户数据添加到场景中的对象。有关在Cinema 4D中添加用户数据的更多信息，请参阅[Cinema 4D文档](https://help.maxon.net/c4d/en-us/#html/5826.html)。

![User Data set on an object in Cinema 4D](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1fcf2656-e0f7-4aa1-aaa0-ac9a45ea704c/c4d-userdata.png "User Data set on an object in Cinema 4D")

Datasmith从Cinema 4D对象导入用户数据，并将其作为Datasmith元数据存储在相应的关卡Actor上。可使用蓝图或Python在虚幻编辑器中访问这些元数据，也可在运行时使用蓝图在引擎中访问这些元数据。有关更多信息，请参阅[在蓝图和Python中访问元数据](/documentation/zh-cn/unreal-engine/using-datasmith-metadata-in-unreal-engine#%E5%9C%A8%E8%93%9D%E5%9B%BE%E5%92%8Cpython%E4%B8%AD%E8%AE%BF%E9%97%AE%E5%85%83%E6%95%B0%E6%8D%AE)。

在进行数据转换时有一些重要的注意事项：

-   在Cinema 4D中，可将用户数据组织成分层的组，但虚幻引擎中的Datasmith元数据始终显示为键和值的平面列表。如果用户数据中包含任何组，Datasmith会执行以下操作：
    
    -   将层级展平。
    -   将所有组中的所有元数据键放入单个平面列表中。
    -   丢弃组名称。
-   无论在Cinema 4D中为用户数据设置哪种数据类型，存储在Datasmith元数据中的值始终为字符串。在任何可能的情况下，Datasmith都会将原始数据值转换为字符串，你可以解析该字符串来提取相关信息。但是，某些Cinema 4D数据类型不受支持，例如梯度、其他场景对象的链接、优先级值、样条线等。
    
-   元数据键名称只能包含字母数字字符、连字符和下划线。如果Cinema 4D中用户数据的名称包含任何其他字符，Datasmith会自动将其转换为下划线。
    

-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [enterprise](https://dev.epicgames.com/community/search?query=enterprise)
-   [interop](https://dev.epicgames.com/community/search?query=interop)
-   [cinema 4d](https://dev.epicgames.com/community/search?query=cinema%204d)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Cinema 4D工作流程](/documentation/zh-cn/unreal-engine/using-datasmith-with-cinema-4d-in-unreal-engine#cinema4d%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
-   [几何体](/documentation/zh-cn/unreal-engine/using-datasmith-with-cinema-4d-in-unreal-engine#%E5%87%A0%E4%BD%95%E4%BD%93)
-   [对象可视性](/documentation/zh-cn/unreal-engine/using-datasmith-with-cinema-4d-in-unreal-engine#%E5%AF%B9%E8%B1%A1%E5%8F%AF%E8%A7%86%E6%80%A7)
-   [生成器和变形器](/documentation/zh-cn/unreal-engine/using-datasmith-with-cinema-4d-in-unreal-engine#%E7%94%9F%E6%88%90%E5%99%A8%E5%92%8C%E5%8F%98%E5%BD%A2%E5%99%A8)
-   [实例、复制器和数组](/documentation/zh-cn/unreal-engine/using-datasmith-with-cinema-4d-in-unreal-engine#%E5%AE%9E%E4%BE%8B%E3%80%81%E5%A4%8D%E5%88%B6%E5%99%A8%E5%92%8C%E6%95%B0%E7%BB%84)
-   [法线朝向](/documentation/zh-cn/unreal-engine/using-datasmith-with-cinema-4d-in-unreal-engine#%E6%B3%95%E7%BA%BF%E6%9C%9D%E5%90%91)
-   [光源](/documentation/zh-cn/unreal-engine/using-datasmith-with-cinema-4d-in-unreal-engine#%E5%85%89%E6%BA%90)
-   [摄像机](/documentation/zh-cn/unreal-engine/using-datasmith-with-cinema-4d-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA)
-   [场景层级](/documentation/zh-cn/unreal-engine/using-datasmith-with-cinema-4d-in-unreal-engine#%E5%9C%BA%E6%99%AF%E5%B1%82%E7%BA%A7)
-   [Datasmith如何烘焙Cinema 4D程序化功能](/documentation/zh-cn/unreal-engine/using-datasmith-with-cinema-4d-in-unreal-engine#datasmith%E5%A6%82%E4%BD%95%E7%83%98%E7%84%99cinema4d%E7%A8%8B%E5%BA%8F%E5%8C%96%E5%8A%9F%E8%83%BD)
-   [层](/documentation/zh-cn/unreal-engine/using-datasmith-with-cinema-4d-in-unreal-engine#%E5%B1%82)
-   [Cinema 4D材质](/documentation/zh-cn/unreal-engine/using-datasmith-with-cinema-4d-in-unreal-engine#cinema4d%E6%9D%90%E8%B4%A8)
-   [控制纹理UV](/documentation/zh-cn/unreal-engine/using-datasmith-with-cinema-4d-in-unreal-engine#%E6%8E%A7%E5%88%B6%E7%BA%B9%E7%90%86uv)
-   [父材质](/documentation/zh-cn/unreal-engine/using-datasmith-with-cinema-4d-in-unreal-engine#%E7%88%B6%E6%9D%90%E8%B4%A8)
-   [材质导入限制](/documentation/zh-cn/unreal-engine/using-datasmith-with-cinema-4d-in-unreal-engine#%E6%9D%90%E8%B4%A8%E5%AF%BC%E5%85%A5%E9%99%90%E5%88%B6)
-   [动画](/documentation/zh-cn/unreal-engine/using-datasmith-with-cinema-4d-in-unreal-engine#%E5%8A%A8%E7%94%BB)
-   [用户数据](/documentation/zh-cn/unreal-engine/using-datasmith-with-cinema-4d-in-unreal-engine#%E7%94%A8%E6%88%B7%E6%95%B0%E6%8D%AE)
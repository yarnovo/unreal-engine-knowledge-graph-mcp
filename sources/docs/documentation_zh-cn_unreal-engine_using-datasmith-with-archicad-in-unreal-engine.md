# 将Datasmith与Archicad结合使用 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-datasmith-with-archicad-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:05:38.456Z

---

目录

![将Datasmith与Archicad结合使用](https://dev.epicgames.com/community/api/documentation/image/a045ad4d-a7e5-4005-a882-99b085f8a149?resizing_type=fill&width=1920&height=335)

本页面介绍 **Datasmith** 如何将场景从 **Graphisoft Archicad** 导入 **虚幻引擎**。它遵循[Datasmith概述](/documentation/zh-cn/unreal-engine/datasmith-plugins-overview)和[关于Datasmith导入过程](/documentation/zh-cn/unreal-engine/datasmith-import-process-in-unreal-engine)中概述的基本流程，但它提供了有关Direct Link工作流和Direct专用转译行为的更多详细信息。如果你打算使用Datasmith将场景从Archicad导入到虚幻引擎，阅读此页面可以帮助你了解场景如何转译，以及你如何在虚幻编辑器中使用导入场景。

## Archicad工作流

### Datasmith DirectLink

使用DirectLink工作流，你可以在Archicad和虚幻引擎或Twinmotion之间设置Datasmith DirectLink。此链接会更新你的虚幻引擎关卡或Twinmotion模型，从而无需在你每次进行更改时从Archicad场景重新导出 `*.udatasmith` 文件。

### 导出工作流

使用导出工作流，可以从Archicad导出 `.udatasmith` 文件，以便在虚幻引擎或Twinmotion中使用。请参阅[从Archicad导出Datasmith内容](/documentation/zh-cn/unreal-engine/exporting-datasmith-content-from-archicad-to-unreal-engine)，详细了解如何从Archicad导出Datasmith内容。

请参阅[将Datasmith内容导入到虚幻引擎中](/documentation/zh-cn/unreal-engine/importing-datasmith-content-into-unreal-engine)，详细了解如何将 `.udatasmith` 文件导入虚幻引擎。

## 使用Datasmith工具栏

Datasmith插件将Datasmith工具栏选项添加到 **Windows > 控制板（Palettes）** 菜单。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c69d42f-1745-40ca-9650-ed3b3656bedc/image_0.png)

Datasmith DirectLink工具栏。

操作

按钮

说明

与Direct Link同步（Synchronize with Direct Link）

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a8ae487-0f57-45b7-b8b5-24ffa9e121ca/sync-icon.png)

通过Direct Link连接将选定模型推送到虚幻引擎或Twinmotion。

管理连接（Manage Connections）

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84737380-71d1-4c9f-8fb2-7929acbb59a2/connect-icon.png)

启动连接状态对话框。

导出到Datasmith文件（Export to Datasmith File）

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ba7836d-39bf-42c5-9acd-dc9ab8d98cf9/export-icon.png)

启动现有的 `.udatasmith` 导出程序，用于将 `.udatasmith` 文件保存到磁盘。

显示消息（Show Messages）

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3de6f496-41db-4c02-a495-1ef4b347707b/messages-icon.png)

启动消息和日志记录窗口。这对于报告错误、丢失纹理和其他信息很有用。

## 几何体、图层和场景层级

Archicad的对象在导入虚幻引擎时，会转换成包含多个嵌套静态网格体组件的单个Actor。

![World Outliner showing the hierarchy of an imported Archicad file.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61c5ee1f-41c9-4854-b8f7-491600764a7d/image_1.png)

正在显示已导入Archicad文件层级的世界大纲视图。

世界大纲视图中的每个Actor都代表Archicad中的一个层级，可在虚幻编辑器的层级面板中找到。

![Layers represented by Actors in the World Outliner are also represented as layers in the Layer panel.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26424139-3046-45ac-a257-9c80d120aa5a/image_2.png)

世界大纲视图中以Actor表示的层级也会在层级面板中显示。

对象的枢轴点会导入虚幻引擎，并且保留其在Archicad中的原始位置。但是，在某些情况下，由于Archicad SDK存在限制，可能无法正确定义枢轴点位置，从而导致不匹配，如下所示：

![Notice that the pivot point for the chair is different in the Editor than in Archicad.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/669d75eb-4904-48f0-b53d-1c09698dd45d/image_3.png)

注意，编辑器中椅子的枢轴点与其在Archicad中的位置不同。

## HotLinks模块

虚幻引擎会保留包含3D元素的Archicad HotLink外部引用，方法是将它们作为带有嵌套静态网格体的Actor导入关卡。

## 材质

虚幻引擎使用基于物理的渲染（PBR）图表在Datasmith场景中构建材质，其中主材质由Datasmith导入器实时构建。在将Archicad材质导入虚幻引擎时，此过程会保留它们的外观。

![The export plugin retains the look of Materials from Archicad when importing into Unreal Engine.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2b494ee-b25c-4040-9769-533976a50b02/image_4.png)

导入到虚幻引擎时，导出插件会保留材质在Archicad中的外观。

Archicad中有两种类型的材质：

-   从表面属性派生的标准材质。
    
-   从GDL对象派生的材质。
    

### 标准Archicad材质

Archicad中的材质会导出为PBR材质；在导入到虚幻引擎时会保留以下属性：

-   基础颜色
    
-   纹理透明度
    
-   UV尺寸等
    

![Properties highlighted in green are considered by the Datasmith exporter.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/347ea427-432c-47b0-9913-2575a0a8c3ee/image_5.png)

Datasmith导出程序会处理所有以绿色高亮显示的属性。

### GDL和双面材质

Archicad中的所有建筑对象都会被视为闭合类对象，并使用单面材质导出。

较薄的对象（例如GDL和Morph对象）会使用双面材质导出。出现这类情况时，材质名称会添加 `_DS` 作为后缀，确保其在虚幻引擎中有别于单面材质。

![The highlighted material is double sided and the name contains the _DS suffix.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33193a0d-642a-4950-94f0-9c9144d7683f/image_6.png)

高亮显示的是双面材质，名称包含 \_DS 后缀。

## 光源

Datasmith导出程序支持基本的光源类型及其参数。区域光源会作为点光源导入到虚幻引擎中。不支持环境光源和平行光源。

![A variety of light types imported from Archicad into Unreal Engine.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/beb5c316-6023-47f2-901a-196eb47b212c/image_7.png)

从Archicad导入虚幻引擎的各种光源类型。

Archicad光源类型

虚幻引擎光源类

支持的参数

不支持的参数

**通用光源（General Light）**

点光源（Point Light）

-   强度
-   颜色
-   衰减距离
-   绝对光源强度

-   阴影投射参数（不透明度和质量）

**点光源（Point Light）**

点光源（Point Light）

-   强度
-   颜色
-   衰减距离
-   绝对光源强度
-   在内角和外角之间淡出

-   阴影投射参数（不透明度和质量）
-   聚光灯几何体（仅限圆形）

**IES光源（IES Light）**

带IES分析的点光源（Point Light with IES profile）

-   强度
-   颜色
-   衰减距离
-   绝对光源强度
-   IES形状
-   IES强度

-   阴影投射参数（不透明度和质量）
-   使用光度学文件中的给定区域形状和大小
-   IES光照质量/粒状光照

**区域光源（Area Light）**

Datasmith区域光源（Datasmith Area Light）

-   强度
-   颜色
-   衰减距离
-   绝对光源强度
-   尺寸长度/宽度

-   阴影投射参数（不透明度和质量）
-   使用光度学文件中的给定区域形状和大小
-   IES光照质量/粒状光照

**平行光源（Parallel Light）**

不支持（Not Supported）

不支持（Not Supported）

不支持（Not Supported）

**太阳（Sun Object）**

不支持（Not Supported）

不支持（Not Supported）

不支持（Not Supported）

**窗口光源（Window Light）**

不支持（Not Supported）

不支持（Not Supported）

不支持（Not Supported）

## 摄像机

导出时Archicad中的当前视点作为名为"当前视图（Current View）"的摄像机Actor导入虚幻引擎。支持以下摄像机属性：

-   变换（Transform）
    
-   传感器宽度和高度（Sensor Width and Height）
    
-   焦距最小值和最大值（Focal Length Min and Max）
    
-   FStop最小值和最大值（FStop Min and Max）
    
-   对焦距离（Focus Distance）
    
-   当前焦距（Current Focal Length）
    
-   当前光圈（Current Aperture）
    

![Archicad camera settings retained during the import into Unreal Engine.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ddd6262-ef7a-4fab-920d-8c308ac5270f/image_8.png)

Archicad摄像机设置在导入虚幻引擎期间保留。

虚幻引擎还支持路径摄像机。它们使用Archicad中的路径名作为场景Actor下的摄像机Actor导入。

![Path Cameras in Archicad.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49a34231-cd17-43b4-8ac4-a8e929a93dd5/image_9.png) ![Camera Actors in the World Outliner.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc07f50b-e20b-41a0-a5c4-2ee00df313b6/image_10.png)

支持路径摄像机并作为摄像机Actor导入到世界大纲视图中。

## Metadata和分类

在以下情况下，Archicad中的大多数属性会作为元数据导出到虚幻引擎：

-   元素名称键ID值与元素名称相同。例如，门的ID值为"Wooden\_Door"。
    
-   键值使用特定的分类，包括：
    
    -   键值使用后缀为"\_ID"的分类系统。
        
    -   键值使用后缀为"\_Name"的分类系统。这通常为空。
        
    -   键值使用后缀为"\_Description"的分类系统。这通常为空。
        
-   类别键值包含前缀"CAT\_Xyz"
    
-   IFCProperties键值包含前缀"IFC\_Xyz"
    
-   IFCAttributes键值包含前缀"IFC\_Attribute\_Xyz"
    

不会导出未定义的元数据。

例如，你要从Archicad导出门：

![Properties of a wooden door in Archicad.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/091c1ea6-7349-4db5-8821-4bf165698ca7/image_11.png)

Archicad中木门的属性。

它将导出为：

```cpp

<MetaData name="MetaData_95D3E85A-69DE-4E5D-993D-74480D3FBDBA" reference="Actor.95D3E85A-69DE-4E5D-993D-74480D3FBDBA">
	<KeyValueProperty name="ID" type="String" val="Porte_Bois"/>
	<KeyValueProperty name="ARCHICAD_Classification_ID" type="String" val="Door"/>
	<KeyValueProperty name="CAT_Position" type="String" val="Interior"/>
	<KeyValueProperty name="CAT_Renovation_Status" type="String" val="Existing"/>
	<KeyValueProperty name="CAT_Show_On_Renovation_Filter" type="String" val="All Relevant Filters"/>
	<KeyValueProperty name="CAT_Structural_Function" type="String" val="Non-Load-Bearing Element"/>
	<KeyValueProperty name="IFC_ProductionYear" type="String" val="2021"/>
	<KeyValueProperty name="IFC_AcousticRating" type="String" val="patate"/>
	<KeyValueProperty name="IFC_FireRating" type="String" val="radis"/>
	<KeyValueProperty name="IFC_IsExternal" type="String" val="False"/>
	<KeyValueProperty name="IFC_FireResistanceRating" type="String" val="pastop"/>
	<KeyValueProperty name="IFC_IsCombustible" type="String" val="False"/>
	<KeyValueProperty name="IFC_SerialNumber" type="String" val="serialnumber"/>
	<KeyValueProperty name="IFC_Renovation_Status" type="String" val="Existing"/>
	<KeyValueProperty name="IFC_Attribute_GlobalId" type="String" val="2Lq_XQQTvENPazT4WDFxsw"/>
	<KeyValueProperty name="IFC_Attribute_Name" type="String" val="TestCustomName"/>
	<KeyValueProperty name="IFC_Attribute_Tag" type="String" val="95D3E85A-69DE-4E5D-993D-74480D3FBDBA"/>
	<KeyValueProperty name="IFC_Attribute_OverallHeight" type="String" val="210.00"/>
	<KeyValueProperty name="IFC_Attribute_OverallWidth" type="String" val="90.00"/>
</MetaData>

```

你可以使用分类管理器在Archicad中添加和编辑分类：

![The Classification Manager within Archicad is used to add additional Classifications.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2f02c2c-2023-44a2-bc01-a6f5a48dffd8/image_12.png)

Archicad中的分类管理器用于添加额外的分类。

点击 **Windows** 菜单中的 *\*分类管理器（Classification Manager）* 选项可以找到此菜单。

## Actor标签

Archicad的技术数据可以借助编辑器中的Actor标签导入虚幻引擎。然后可以使用存储在Actor标签中的数据通过Visual Dataprep、Python脚本等执行各种操作。

目前Datasmith插件可导出：

-   ID
    
-   类型
    
-   LibPart（Main、Rev、Name）
    

![Tag values are imported  into Unreal as Actor Tags.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/589a2a04-8a84-44f6-a2df-d03db9d1a1c5/image_13.png)

标签值作为Actor标签导入到虚幻引擎中。

-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [archicad](https://dev.epicgames.com/community/search?query=archicad)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Archicad工作流](/documentation/zh-cn/unreal-engine/using-datasmith-with-archicad-in-unreal-engine#archicad%E5%B7%A5%E4%BD%9C%E6%B5%81)
-   [Datasmith DirectLink](/documentation/zh-cn/unreal-engine/using-datasmith-with-archicad-in-unreal-engine#datasmithdirectlink)
-   [导出工作流](/documentation/zh-cn/unreal-engine/using-datasmith-with-archicad-in-unreal-engine#%E5%AF%BC%E5%87%BA%E5%B7%A5%E4%BD%9C%E6%B5%81)
-   [使用Datasmith工具栏](/documentation/zh-cn/unreal-engine/using-datasmith-with-archicad-in-unreal-engine#%E4%BD%BF%E7%94%A8datasmith%E5%B7%A5%E5%85%B7%E6%A0%8F)
-   [几何体、图层和场景层级](/documentation/zh-cn/unreal-engine/using-datasmith-with-archicad-in-unreal-engine#%E5%87%A0%E4%BD%95%E4%BD%93%E3%80%81%E5%9B%BE%E5%B1%82%E5%92%8C%E5%9C%BA%E6%99%AF%E5%B1%82%E7%BA%A7)
-   [HotLinks模块](/documentation/zh-cn/unreal-engine/using-datasmith-with-archicad-in-unreal-engine#hotlinks%E6%A8%A1%E5%9D%97)
-   [材质](/documentation/zh-cn/unreal-engine/using-datasmith-with-archicad-in-unreal-engine#%E6%9D%90%E8%B4%A8)
-   [标准Archicad材质](/documentation/zh-cn/unreal-engine/using-datasmith-with-archicad-in-unreal-engine#%E6%A0%87%E5%87%86archicad%E6%9D%90%E8%B4%A8)
-   [GDL和双面材质](/documentation/zh-cn/unreal-engine/using-datasmith-with-archicad-in-unreal-engine#gdl%E5%92%8C%E5%8F%8C%E9%9D%A2%E6%9D%90%E8%B4%A8)
-   [光源](/documentation/zh-cn/unreal-engine/using-datasmith-with-archicad-in-unreal-engine#%E5%85%89%E6%BA%90)
-   [摄像机](/documentation/zh-cn/unreal-engine/using-datasmith-with-archicad-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA)
-   [Metadata和分类](/documentation/zh-cn/unreal-engine/using-datasmith-with-archicad-in-unreal-engine#metadata%E5%92%8C%E5%88%86%E7%B1%BB)
-   [Actor标签](/documentation/zh-cn/unreal-engine/using-datasmith-with-archicad-in-unreal-engine#actor%E6%A0%87%E7%AD%BE)
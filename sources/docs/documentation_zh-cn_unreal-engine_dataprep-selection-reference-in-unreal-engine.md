# 虚幻引擎Dataprep选项参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:05:07.093Z

---

目录

![Dataprep选择参考](https://dev.epicgames.com/community/api/documentation/image/b46ec722-86ad-43ac-ac2f-2ae17dd8c710?resizing_type=fill&width=1920&height=335)

本页将介绍Visual Dataprep系统中各个 **Select By** 方法块的作用；它们将帮助你确定哪些场景元素需要执行操作。

不同类型的 **Select By** 块提供不同的条件组（可设置）。Visual Dataprep系统执行Dataprep图表中的各项作业时，首先会假定该作业中定义的所有操作都应该用于场景中已导入的所有Actor和资源。但若作业包含本页中所述的任何 **Select By** 块，则Visual Dataprep系统会检查这些场景元素，看是否与 **Select By** 块中设置的条件匹配。对于为当前操作应用了作业的场景元素，若场景元素不满足条件，Visual Dataprep系统会从场景元素列表中删除该元素。更多背景信息请参见[Dataprep导入自定义](/documentation/zh-cn/unreal-engine/dataprep-import-customization-in-unreal-engine)。

如欲了解可对按 **Select By** 条件标识的场景元素执行的操作，参见[Dataprep操作参考](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine)。

## 按条件选择

场景元素的既定条件为true时，才可使用 **按条件选择（Select By Condition）** 块选择该元素。

### Is Class Of

仅在导入虚幻引擎中的场景元素的类与 **类（Class）** 设置中指定的类名称匹配时，才可使用 **Is Class Of** 块选择该元素。

此过滤器可以选择资产、Actor和组件。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f503849-d08c-46f0-86f3-bc5de9b183ee/is-class-of.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f503849-d08c-46f0-86f3-bc5de9b183ee/is-class-of.png)

点击查看大图

设置

说明

**类（Class）**

场景元素在可供该块选择之前必须匹配的类。

**应包括子类（Should Include Child Class）**

若某场景元素的虚幻引擎类派生自 **类（Class）** 设置中设定的类，确定此块是否应将该场景元素视为匹配成功。

-   默认启用，此块将接受上述场景元素。
-   若禁用，则此块仅接受与 **类（Class）** 设置完全匹配的场景元素。

例如，假设将 **类（Class）** 设置设为 **Actor**，且场景元素被视为拥有类 **StaticMeshActor**。在这种情况下，**StaticMeshActor** 派生自 **Actor** 基类，因此 **Is Class Of** 块将仅在已启用 **应包括子类（Should Include Child Class）** 设置后才会选择该场景元素。

### 包壳/选择隐藏项

此过滤器要求你启用 **Dataprep几何体操作** 插件。

在选中一组Actor后，你可以用 **包壳/选择隐藏项（Jacketing / Select Hidden）** 过滤器来选中这些Actor内部的元素。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dce20dec-5785-4459-9f0d-96813a5a15bc/jacketing.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dce20dec-5785-4459-9f0d-96813a5a15bc/jacketing.png)

点击查看大图

设置

描述

**精度（Accuracy）**

定义体素网格的精度。Datasmith会使用这些体素网格来确定哪些元素位于Actor的边框内（外）。

**合并距离（Merge Distance）**

设置遮挡体积（遮挡测试判定的要填充的内容）中的间隙的最大尺寸。

## 按浮点选择

场景元素的某些数值属性为 **小于（Less Than）**、**大于（Greater Than）** 或 **约等于（Is Nearly Equal）** 给定阈值时，**按浮点选择（Select By Float）** 块才会选择这些场景元素。

若两个数字之差小于 `0.0001`，则 **Select By Float** 块会将这两个数字视为 **约等于（Is Nearly Equal）**。

### 边界体积

仅在场景元素在3D空间中有实际范围（从而有边界框），且该边界框的总体积满足设置中指定的比较时，才可使用 **边界体积（Bounding Volume）** 块选择该场景元素。

此过滤器可以选择资产、Actor和组件。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57f5e300-564b-4636-a987-691ef27b92e3/bounding-volume.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57f5e300-564b-4636-a987-691ef27b92e3/bounding-volume.png)

点击查看大图

设置

说明

**下拉菜单（Dropdown Menu）**

要在对象的包围体与指定体积之间执行的数学比较的类型：**小于（Less Than）**、**大于（Greater Than）** 或 **约等于（Is Nearly Equal）**。

**浮点值（Float Value）**

要与对象的包围体进行比较的体积，单位为立方厘米。

例如，假设某静态网格体的包围体为100厘米 x 100厘米。其边界框体积为100x100，即10000立方厘米。因此，若将静态网格体设为 **小于** 任何大于10000的数字，或 **大于** 任何小于10000的数字，此块将选择该静态网格体。

## 按整数选择

只有在场景元素的某些数值属性为 **小于（Less Than）**、**大于（Greater Than）** 或 **约等于（Is Nearly Equal）** 给定阈值时，**按整数选择（Select By Integer）** 块才会选择这些场景元素。

### 三角形数量

使用 **三角形数量（Triangle Count）** 块，只选择三角形数量满足设置中指定对比的静态网格体Actor和静态网格体资产。

此过滤器可以选择资产、Actor和组件。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a8c7598-376b-4b2b-b9a9-7675947c29e5/by-triangle-count.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a8c7598-376b-4b2b-b9a9-7675947c29e5/by-triangle-count.png)

点击查看大图

设置

说明

**下拉菜单（Dropdown Menu）**

要在网格体中三角形数量和指定数量之间执行的数学对比的类型：**小于（Less Than）**、**大于（Greater Than）** 或 **约等于（Is Nearly Equal）**。

**整数值（Integer Value）**

要与对象的三角形数量进行对比的数量。

举例而言，如果将块的条件设置为 **小于** 任何大于2000的数字，或 **大于** 任何小于2000的数字，那么如果静态网格体Actor或资产拥有2000个三角形，则此块将选择该对象。

### 顶点数量

使用 **顶点数量（Vertex Count）** 块，只选择顶点数量满足设置中指定对比的静态网格体Actor和静态网格体资产。

此过滤器可以选择资产、Actor和组件。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd154d44-4802-40b8-ba2c-6ae321283887/by-vertex-count.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd154d44-4802-40b8-ba2c-6ae321283887/by-vertex-count.png)

点击查看大图

设置

说明

**下拉菜单（Dropdown Menu）**

要在网格体中顶点数量和指定数量之间执行的数学对比的类型：**小于（Less Than）**、**大于（Greater Than）** 或 **约等于（Is Nearly Equal）**。

**整数值（Integer Value）**

要与对象的顶点数量进行对比的数量。

举例而言，如果将块的条件设置为 **小于** 任何大于5000的数字，或 **大于** 任何小于5000的数字，那么如果静态网格体Actor或资产拥有5000个顶点，则此块将选择该对象。

## 按字符串选择

场景元素的给定字符串属性与指定字符串模式匹配时，**按字符串选择（Select By String）** 块才会选择这些场景元素。

所有的字符串条件都能接受单个字符串或字符串数组。切换时，请点击 **切换成单个字符串/切换成字符串数组（Switch to Single / Switch to Array）** 按钮。如果是字符串数组，过滤器会返回所有 **至少符合一个** 数组中元素的对象（Actor、资产和/或组件，取决于过滤器限制）。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/070b8d12-9669-4a7c-a45f-bf0024e8b3f9/string-filters.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/070b8d12-9669-4a7c-a45f-bf0024e8b3f9/string-filters.png)

点击查看大图

这些块提供三种字符串比较：

设置

说明

**包含（Contains）**

若提供的字符串完全在相关场景元素的字符串属性值内，则此比较成功。此类比较不可使用通配符；`*` 和 `?` 字符按字面意思处理。

**匹配通配符（Matches Wildcard）**

当提供的字符串全长与相关场景元素的字符串属性全长匹配时，此比较成功。可使用以下通配符：

-   此模式中，星号(`*`)可表示字符串属性中任意数量的字符。
-   此模式中，问号(`?`)可表示字符串属性中的零个或一个字符。

此模式必须匹配字符串全长。若要提供可能位于待比较字符串属性值的任意位置的部分字符串，用星号(`*`)做字符串模式的开头和结尾。例如，若字符串属性值为 `MyActorName`，则模式 `A*tor` 不匹配，而 `*A*tor*` 可匹配。

**完全匹配（Exact Match）**

仅当提供的字符串完全匹配相关场景元素的字符串属性值，此比较才成功。长度必须相同，且必须包含同一组字符，字符顺序也完全相同。

### Actor标签

仅当指定字符串与指派给 **世界大纲视图预览（World Outliner Preview）** 中的Actor的名称匹配时，才可使用 **Actor标签（Actor Label）** 块在Dataprep预览场景中选择这些Actor，也即 **世界大纲视图预览（World Outliner Preview）** 面板中显示的任何项目。

此过滤器可以选择资产和Actor。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f820b06b-bbdb-4d1f-a5bd-a66203579596/actor-label.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f820b06b-bbdb-4d1f-a5bd-a66203579596/actor-label.png)

点击查看大图

设置

说明

**下拉菜单（Dropdown Menu）**

要在Actor的标签与提供的字符串之间比较的字符串类型。详见上文[Select By String](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#selectbystring)。

**Actor Label（字符串）框（Actor Label (String) Box）**

要针对Actor的标签进行测试的字符串模式。

### Metadata值

仅当Actor拥有Datasmith元数据及在设置中指定的 **键（Key）**，且该Datasmith元数据键值与设置中提供的字符串值匹配时，才可使用 **Metadata值（Metadata Value）** 块在Dataprep预览场景中选择Actor，也即 **大纲视图预览（Outliner Preview）** 面板中所示的任何项目。

此过滤器可以选择资产、Actor和组件。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da785582-5e23-486c-bd96-3efbd848ca2b/metadata-value.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da785582-5e23-486c-bd96-3efbd848ca2b/metadata-value.png)

点击查看大图

设置

说明

**下拉菜单（Dropdown Menu）**

要在Actor的Datasmith元数据值与提供的字符串之间比较的字符串类型。详见上文[Select By String](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#selectbystring)。

元数据（字符串）框（Metadata (String) Box）

要针对Actor的Datasmith元数据值进行测试的字符串模式。

**键盘框（Key Box）**

要在Actor的Datasmith元数据中查找的键值。

例如，假设有一个Actor，导入后分配了以下一组Datasmith元数据：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6af18390-18c8-4ca9-b006-520633b92a2c/datasmithuserdata-metadatakey.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6af18390-18c8-4ca9-b006-520633b92a2c/datasmithuserdata-metadatakey.png)

点击查看大图

若将 **键（Key）** 值设为 **Category**，可选择此Actor，方法是选择 **Contains** 操作并将第三列中的字符串模式设为 `Floor` 或 `Floors`。

欲了解Datasmith元数据的更多详情，参见[使用Datasmith元数据](/documentation/zh-cn/unreal-engine/using-datasmith-metadata-in-unreal-engine)。

### Object Name

仅当指定字符串与指派给 **内容浏览器预览（Content Browser Preview）** 中的资源的名称匹配时，才可使用 **Object Name** 块选择这些资源，也即 **内容浏览器预览（Content Browser Preview）** 面板中列示的静态网格体、纹理、材质和动画。

此过滤器可以选择资产、Actor和组件。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43a1b965-6d06-4394-8455-408568a76a29/object-name.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43a1b965-6d06-4394-8455-408568a76a29/object-name.png)

点击查看大图

设置

说明

**下拉菜单（Dropdown Menu）**

要在场景元素的名称与提供的字符串之间比较的字符串类型。详见上文[Select By String](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#selectbystring)。

**Object Name（字符串）框（Object Name (String) Box）**

要针对对象名称进行测试的字符串模式。

### Actor层

借助 **Actor层（Actor Layer）** 块，你可以在Dataprep预览场景的Actor中，也就是在 **大纲视图预览（Outliner Preview）** 面板中的项目中，选出符合你指定的层的Actor。

此过滤器只能选择Actor。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61c1ce71-8952-4656-8eee-5f52c2988ea2/layer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61c1ce71-8952-4656-8eee-5f52c2988ea2/layer.png)

点击查看大图

设置

说明

**下拉菜单（Dropdown Menu）**

选择使用哪种字符串类型来比较Actor的层与你提供的字符串。详见上文[按字符串选择（Select By String）](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#selectbystring)。

**Actor Label（字符串）框（Actor Label (String) Box）**

用来和Actor的图层名称进行比较的字符串内容。

### 标签值

当场景元素拥有 **标签值（Tag）** 设置中指定的Actor标签时，你可以用 **标签值（Tag Value）** 块来选中该场景元素。

此过滤器可以选择资产、Actor和组件。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b991de4-a891-4383-97a0-c3f8f4042cee/has-actor-tag.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b991de4-a891-4383-97a0-c3f8f4042cee/has-actor-tag.png)

点击查看大图

设置

说明

**下拉菜单（Dropdown Menu）**

要在Actor的标签与提供的字符串之间比较的字符串类型。详见上文[Select By String](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#selectbystring)。

**标签（字符串）框（Tag (String) Box）**

要查找的标签名称。

仅选择标签与此值完全匹配的Actor。

例如，若Actor导入时拥有以下一组标签：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21b91a9e-9de9-431a-86c4-739be3d1ec77/tags-list.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21b91a9e-9de9-431a-86c4-739be3d1ec77/tags-list.png)

点击查看大图

若要在 **Actor Tag** 块中选择此Actor，可将 **键（Key）** 设置设为 `Max.superclassof: GeometryClass`、`Max.classof: EditablePolyMesh`、`Max.handle: 407` 或上述列表中所示的任何其他值。

欲了解Datasmith导入的Actor标签的更多详情，参见[关于Datasmith导入流程](/documentation/zh-cn/unreal-engine/datasmith-import-process-in-unreal-engine#metadata)。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [enterprise](https://dev.epicgames.com/community/search?query=enterprise)
-   [manufacturing](https://dev.epicgames.com/community/search?query=manufacturing)
-   [dataprep](https://dev.epicgames.com/community/search?query=dataprep)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [按条件选择](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#%E6%8C%89%E6%9D%A1%E4%BB%B6%E9%80%89%E6%8B%A9)
-   [Is Class Of](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#isclassof)
-   [包壳/选择隐藏项](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#%E5%8C%85%E5%A3%B3/%E9%80%89%E6%8B%A9%E9%9A%90%E8%97%8F%E9%A1%B9)
-   [按浮点选择](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#%E6%8C%89%E6%B5%AE%E7%82%B9%E9%80%89%E6%8B%A9)
-   [边界体积](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#%E8%BE%B9%E7%95%8C%E4%BD%93%E7%A7%AF)
-   [按整数选择](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#%E6%8C%89%E6%95%B4%E6%95%B0%E9%80%89%E6%8B%A9)
-   [三角形数量](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#%E4%B8%89%E8%A7%92%E5%BD%A2%E6%95%B0%E9%87%8F)
-   [顶点数量](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#%E9%A1%B6%E7%82%B9%E6%95%B0%E9%87%8F)
-   [按字符串选择](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#%E6%8C%89%E5%AD%97%E7%AC%A6%E4%B8%B2%E9%80%89%E6%8B%A9)
-   [Actor标签](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#actor%E6%A0%87%E7%AD%BE)
-   [Metadata值](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#metadata%E5%80%BC)
-   [Object Name](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#objectname)
-   [Actor层](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#actor%E5%B1%82)
-   [标签值](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine#%E6%A0%87%E7%AD%BE%E5%80%BC)
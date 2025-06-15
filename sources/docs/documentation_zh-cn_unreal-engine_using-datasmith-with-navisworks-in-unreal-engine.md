# 使用Datasmith将Navisworks内容导入虚幻引擎 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-datasmith-with-navisworks-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:05:42.147Z

---

目录

![Navisworks](https://dev.epicgames.com/community/api/documentation/image/ad98423b-bb1e-4f2b-8e0b-317809469800?resizing_type=fill&width=1920&height=335)

本页面将介绍 **Datasmith** 如何将Autodesk **Navisworks** 中的场景导入 **虚幻引擎（UE）**。导入过程遵循[Datasmith概述](/documentation/zh-cn/unreal-engine/datasmith-plugins-overview)和[关于Datasmith导入流程](/documentation/zh-cn/unreal-engine/datasmith-import-process-in-unreal-engine)文档中所述的基本流程，但增加了与Navisworks相关的一些特殊转换操作。若你计划使用Datasmith将场景从Navisworks导入UE，阅读本页有助于你了解场景转换方式以及你该如何在虚幻编辑器中处理导出结果。

## Navisworks工作流

与Revit或3ds Max Datasmith导出器类似，Navisworks导出器同样采用导出工作流。这意味着，要利用Datasmith将内容导入编辑器，你须执行以下操作：

1.  安装适用于Navisworks的Datasmith导出器。请参阅下文的 **安装说明** 小节。
    
2.  使用通过插件添加到工具栏的 **Datasmith导出（Datasmith Export）** 按钮，导出Navisworks中的内容。请参阅[从Navisworks中导出Datasmith内容](/documentation/zh-cn/unreal-engine/exporting-datasmith-content-from-navisworks-to-unreal-engine)。
    
3.  使用虚幻编辑器工具栏中的Datasmith导入器导入 `.udatasmith` 文件。请参阅[将Datasmith内容导入到虚幻引擎中](/documentation/zh-cn/unreal-engine/importing-datasmith-content-into-unreal-engine)。
    

## 安装说明

在导出Navisworks内容，你必须在[Datasmith导出插件](https://www.unrealengine.com/en-US/datasmith/plugins)页面上下载并安装 **Datasmith Exporter for Navisworks** 插件。

如需查看该插件支持的Navisworks版本，请参阅[Datasmith支持的软件和文件类型](/documentation/zh-cn/unreal-engine/datasmith-supported-software-and-file-types)。

我们鼓励你与他人（包含你的组织的内部或外部人员）分享Datasmith Exporter插件的下载链接。但请注意，你无权直接分发Datasmith Exporter插件本身。

安装Datasmith Exporter for Navisworks插件，请确保：

-   Navisworks未运行。
    
-   你下载的导出插件的安装程序符合你要用的虚幻引擎版本。
    
-   你已经将之前安装过的所有Datasmith Exporter for Navisworks插件卸载。
    

下载完安装程序后，双击打开它，然后按照以下步骤操作。

如果你需要卸载Datasmith Exporter for Navisworks插件，你可以在 **控制面板** 中卸载。

## 将几何体转换为静态网格体

用于Navisworks的Datasmith导出器使用类似于Revit和3ds Max导出器的过程，以保留文件中包含的几何体、材质和元数据：

-   为了保持性能，Datasmith以用户定义关卡合并层级中的对象，以便创建更大的网格体，并使三角形数量保持在一百万以下。
-   合并网格体后，导出器将在 **内容浏览器** 中为剩余的每个网格体创建新的 **静态网格体** 资产。导出器将保留Navisworks **属性（Properties）** 面板中设置的每个网格体的 **名称**，并将它们放在 **几何体（Geometries）** 文件夹中。
-   导出器将使用空白Actor对象在世界大纲视图中保留Navisworks中的层级关系。
-   场景围绕用户定义的原点进行组建。

## 合并层级中的对象

由于Navisworks场景包含来自多个源的大量数据，因此有必要在导出过程中进行合并资产数量操作。Datasmith通过在用户定义的层级深度上合并对象流程来完成此操作：

![Navisworks Datasmith导出对话框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1525222-a6ed-468a-bfc0-e19d93410eb4/datasmithnavismerge.png "Navisworks Datasmith导出对话框")

在下方示例中，我们可以看到，将值设置为2时，Datasmith如何将对象从底部合并2个关卡：

![How Datasmith merges the Navisworks hierarchy](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9138acb-d3db-4df8-bea3-59103b9b0a3f/datasmithnavishierarchy.png "How Datasmith merges the Navisworks hierarchy")

如果节点子树中包含的三角形在100万个以上，则Datasmith会将对象合并到生成的网格体三角形不超过100万的关卡。

## 设置原点

Autodesk Navisworks使用双精度坐标系，可支持位置距离原点很远的模型。这点与虚幻引擎不兼容，可能导致不能精确导入。因此，在使用Navisworks中的Datasmith导出器时，用户可以指定场景的原点。指定的点将成为虚幻引擎中的原点（0,0,0）：

![在Navisworks中选择原点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3992c5fd-cc21-470f-aa80-07edfed89dbd/datasmithnavisorigin.gif "在Navisworks中选择原点")

## Navisworks元数据

Datasmith将存储在Navisworks中对象上的元数据导入为 **选项卡**：

![存储为选项卡的Navisworks元数据](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06a9ee58-8d3a-4a3b-b50b-07ad93b1ed31/datasmithnavismetadata.png "存储为选项卡的Navisworks元数据")

数据以选项卡名称开头，格式如下：

\_\[TabName\]\_\[PropertyName\] = \[Value\]\_

因此，在上图中，生成数据将为：

\_MyTab\_MyStringProperty = "MyStringValue"

MyTab\_MyBooleanProperty = "Yes"

MyTab\_MyFloatProperty = "0.000"

MyTab\_MyIntegerProperty = "0"\_

## Navisworks材质

对于Navisworks场景中的每种表面材质，Datasmith都将在虚幻引擎中使用相同名称创建 **材质** 资产。这类资产放在 **材质（Material）** 文件夹中，位于Datasmith场景资产旁。

-   放在材质文件夹中的每个资产都是公开了Navisworks中所设置属性的材质实例。你可以更改此类公开参数，以便修改材质应用到表面时的外观。Datasmith会将这些材质分配给它在导入过程中创建的静态网格体。
-   Datasmith还会创建一组位于 **材质/主（Materials/Master）** 文件夹中的主材质，一个用于半透明材质，另一个用于不透明材质。其中每个主材质都是 **材质（Materials）** 文件夹中至少一个材质实例的父级。材质图定义了各个表面在虚幻引擎中如何显示，如果希望更深入地控制材质图，可以编辑这些材质，向子材质实例公开一些额外参数，或追踪渲染期间这些参数的处理方式。

更改主材质也会自动更改继承自此材质的所有材质实例。一个经常使用功能的好办法是：在修改材质前，先复制主材质，然后更改材质副本，最后通过将材质副本设为父材质来更新特定材质实例。相关细节，请参阅[修改Datasmith主材质](/documentation/zh-cn/unreal-engine/modifying-a-datasmith-master-material-in-unreal-engine)。

-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [enterprise](https://dev.epicgames.com/community/search?query=enterprise)
-   [unreal studio](https://dev.epicgames.com/community/search?query=unreal%20studio)
-   [navisworks](https://dev.epicgames.com/community/search?query=navisworks)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Navisworks工作流](/documentation/zh-cn/unreal-engine/using-datasmith-with-navisworks-in-unreal-engine#navisworks%E5%B7%A5%E4%BD%9C%E6%B5%81)
-   [安装说明](/documentation/zh-cn/unreal-engine/using-datasmith-with-navisworks-in-unreal-engine#%E5%AE%89%E8%A3%85%E8%AF%B4%E6%98%8E)
-   [将几何体转换为静态网格体](/documentation/zh-cn/unreal-engine/using-datasmith-with-navisworks-in-unreal-engine#%E5%B0%86%E5%87%A0%E4%BD%95%E4%BD%93%E8%BD%AC%E6%8D%A2%E4%B8%BA%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [合并层级中的对象](/documentation/zh-cn/unreal-engine/using-datasmith-with-navisworks-in-unreal-engine#%E5%90%88%E5%B9%B6%E5%B1%82%E7%BA%A7%E4%B8%AD%E7%9A%84%E5%AF%B9%E8%B1%A1)
-   [设置原点](/documentation/zh-cn/unreal-engine/using-datasmith-with-navisworks-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%8E%9F%E7%82%B9)
-   [Navisworks元数据](/documentation/zh-cn/unreal-engine/using-datasmith-with-navisworks-in-unreal-engine#navisworks%E5%85%83%E6%95%B0%E6%8D%AE)
-   [Navisworks材质](/documentation/zh-cn/unreal-engine/using-datasmith-with-navisworks-in-unreal-engine#navisworks%E6%9D%90%E8%B4%A8)

相关文档

[

Datasmith导入流程

![Datasmith导入流程](https://dev.epicgames.com/community/api/documentation/image/70c6d5d3-5baf-4f19-864b-78101dc6d7f2?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/datasmith-import-process-in-unreal-engine)
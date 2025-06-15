# 使用Dynamo批量导出Revit视图至Datasmith场景 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/batch-exporting-revit-views-with-dynamo-to-a-datasmith-scene
> 
> 生成时间: 2025-06-14T19:06:09.900Z

---

目录

![使用Dynamo批量导出Revit视图](https://dev.epicgames.com/community/api/documentation/image/19218040-79b8-4b89-867f-60e9b49b565b?resizing_type=fill&width=1920&height=335)

与 **虚幻引擎** 的蓝图脚本系统类似，Dynamo for Revit是一种可视化的编程语言，可以访问Revit API，并用于轻松地自动执行许多重复性任务。除了从加载项工具栏访问外，Datasmith的Autodesk Revit导出器还使用Dynamo来将Revit 3D视图自动导出为 `.udatasmith` 文件，以便在虚幻引擎中使用。

## 安装插件

首先请下载并安装Epic Games提供的[Datasmith的Autodesk Revit导出器](https://www.unrealengine.com/en-US/datasmith/plugins)插件。这会更新已安装的插件版本，并为Dynamo视觉效果脚本语言添加一些其他钩子（hook）。

该插件要求你的Dynamo版本为2.0或更高版本。点击Dynamo UI中的 **帮助（Help）** 菜单，并选择 **关于（About）** 选项可查看版本。

安装插件后，启动Dynamo界面：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aacf73aa-4763-4b11-88d9-2b92ed5c0961/rb_dynamolaunch.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aacf73aa-4763-4b11-88d9-2b92ed5c0961/rb_dynamolaunch.png)

接下来，你需要导入DatasmithDynamoNode.dll文件。在Dynamo UI中，点击 文件（File） 菜单，然后选择 导入库（Import Library） 选项。你将在以下位置之一找到该库：

**Revit版本**

**位置**

**2018.3**

C:\\ProgramData\\Autodesk\\Revit\\Addins\\2018\\DatasmithRevit2018\\DatasmithDynamoNode.dll

**2019**

C:\\ProgramData\\Autodesk\\Revit\\Addins\\2019\\DatasmithRevit2019\\DatasmithDynamoNode.dll

**2020**

C:\\ProgramData\\Autodesk\\Revit\\Addins\\2020\\DatasmithRevit2020\\DatasmithDynamoNode.dll

要确认该库是否安装成功，你可以在Dynamo库的加载项分段中查看是否有 **DatasmithDynamoNode** 条目。

## 工作原理

导入库将安装Datasmith Dynamo节点，该节点旨在从Revit文档中获取数据，并以特定的曲面细分级别导出请求视图：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69116096-e9f0-4a50-933b-6e25032faf51/rb_dynamonode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69116096-e9f0-4a50-933b-6e25032faf51/rb_dynamonode.png)

**数量**

**说明**

**1**

当前Revit文档

**2**

输出路径

**3**

基于ID的视图列表

**4**

曲面细分等级（整数值1-15，默认值8）

将当前的Revit文件用作文档，该节点将在3D视图中输出 `.udatasmith` 文件和对象文件夹，作为准备供Datasmith使用的 `.udsmesh` 文件。

为了演示Datasmith Dynamo节点的用法，该插件包含一个Dynamo示例脚本文件，该文件显示了如何使用该节点创建批处理导出器：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ada1bba5-30ae-4d01-b6dc-59274c512b8e/rb_batchlogic2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ada1bba5-30ae-4d01-b6dc-59274c512b8e/rb_batchlogic2.png)

该脚本执行以下步骤：

1.  该脚本使用Get 3D Views节点，查找当前Revit文档中的所有3D视图，并将它们添加到列表中。
2.  然后它会过滤列表，查找添加到视图名称的前缀（使用Prefix\_ViewName格式）或提供特定名称的视图。在该示例中，前缀默认设置为Datasmith，而实例参数名称默认设置为DatasmithExport。
3.  接下来，脚本会查看两个布尔值，以便确定你要导出所有视图，还是仅导出在筛选列表中找到的视图。
4.  最后，将选定的视图导出到选定的文件夹，其中包含由网格体曲面细分数量定义的详细信息。

为了避免依赖Dynamo API，此版本的批处理导出器需要使用python节点获取有关当前文档的信息：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13f5e05a-b8b4-4e17-b8d5-f474500c7ada/rb_python2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13f5e05a-b8b4-4e17-b8d5-f474500c7ada/rb_python2.png)

同样，获取3D视图并提取给定视图的ElementID依赖于python节点：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9dd5880e-8731-42fb-a8c2-bf996125725f/rb_python1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9dd5880e-8731-42fb-a8c2-bf996125725f/rb_python1.png)

## 使用批量导出器

所提供的Dynamo示例可以执行并用作基本的批处理导出器：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ca69bda-8dc9-4735-b1be-5bae87ac7590/rb_dynamoplayer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ca69bda-8dc9-4735-b1be-5bae87ac7590/rb_dynamoplayer.png)

**属性**

**说明**

**导出至（Export To）：**

允许你浏览文件夹并指定你想要放置Datasmith文件的位置。

**网格体曲面细分量（Mesh Tessellation Amount）：**

指定由Revit API定义的导出过程中使用的曲面细分等级。默认为等级8。这将产生与Revit FBX导出器相同的网格体分辨率。

曲面细分等级8

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aea36fdd-b334-4976-864a-2bb08f234c22/rb_tessimage8.png)

曲面细分等级2

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe74571b-ed4c-40b8-8087-f6d5f95760f2/rb_tessimage2.png)

**导出所有3D视图（Export All 3D Views）：**

如果启用，这将导出当前Revit文档中找到的每个3D视图。如果关闭，这将在当前Revit文档中找到使用自定义名称或前缀的3D视图，并为Datasmith导出这些视图。

**按视图名称前缀/按视图实例参数（By View Name Prefix / By View Instance Parameter）：**

仅导出与指定给视图实例的前缀名称或项目参数匹配的视图。

-   如果为TRUE：按参数过滤。
-   如果为FALSE：按视图名称前缀过滤。

**查看实例参数名称（View Instance Parameter Name）：**

定义将要导出的视图名称。

**导出3D视图前缀（Export 3D Views Prefixed With）：**

定义将要导出的视图名称前缀。

-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [revit](https://dev.epicgames.com/community/search?query=revit)
-   [export](https://dev.epicgames.com/community/search?query=export)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [安装插件](/documentation/zh-cn/unreal-engine/batch-exporting-revit-views-with-dynamo-to-a-datasmith-scene#%E5%AE%89%E8%A3%85%E6%8F%92%E4%BB%B6)
-   [工作原理](/documentation/zh-cn/unreal-engine/batch-exporting-revit-views-with-dynamo-to-a-datasmith-scene#%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86)
-   [使用批量导出器](/documentation/zh-cn/unreal-engine/batch-exporting-revit-views-with-dynamo-to-a-datasmith-scene#%E4%BD%BF%E7%94%A8%E6%89%B9%E9%87%8F%E5%AF%BC%E5%87%BA%E5%99%A8)
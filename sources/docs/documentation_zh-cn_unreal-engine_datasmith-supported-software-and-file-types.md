# Datasmith支持的软件和文件类型 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/datasmith-supported-software-and-file-types
> 
> 生成时间: 2025-06-14T19:06:36.336Z

---

目录

![Datasmith支持的软件和文件类型](https://dev.epicgames.com/community/api/documentation/image/746f27af-c708-42b7-a3e5-6dd4428bf437?resizing_type=fill&width=1920&height=335)

下文列出了Datasmith当前支持的软件应用和文件格式。

对于下面列出的每一种类型的软件或文件格式， **状态** 列使用下列图标来表示其完成度：

图例

含义

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/027c26a4-c110-4b76-ba56-219e66cc59ad/checkpoint_checked.png "Production-ready")

可供制作。

![测试或实验性功能](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b02bb74a-129c-49fc-b744-9e965f924fc0/checkpoint.png "Beta or Experimental")

测试或实验性功能，与客户共享用于测试和反馈。期待改变，我们可以根据自己的判断废弃功能。

对于每一种类型的软件或文件格式， **工作流程类型（Workflow Type）** 表明如何从设计软件中打包信息：

-   **直接导出（Direct）** 意味着虚幻中的Datasmith导入插件会直接读取应用程序的文件格式。
    
-   **导出（Export）** 意味着在Datasmith将内容导入到Unreal之前，你需要使用已经内置到应用程序中的导出器将应用程序中的内容导出为特定的文件格式。
    
-   **导出插件（Export Plugin）** 意味着你需要在应用程序中安装一个新插件，以便将设计数据导出为Datasmith导入到虚幻引擎中的格式。
    

**导入插件（Importer Plugin）** 一列指明了你需要在UE中启用哪种Datasmith导入插件，才能导入对应的文件类型。有关该流程的详情，请参阅[导入Datasmith内容](/documentation/zh-cn/unreal-engine/importing-datasmith-content-into-unreal-engine)。

你可以访问[Datasmith导出插件](https://www.unrealengine.com/zh-CN/datasmith/plugins)来获取所有相关插件。

## 支持的应用

应用

支持程度

版本

工作流程类型

导入插件

**3D ACIS**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be4ca693-80f6-4fdb-98a0-05f8b967c6a6/checkpoint_checked.png "Production-ready")

最高2023

直接

**CAD**

**3DEXCITE DELTAGEN**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20571117-ac66-4d6d-863f-2a6c845ecd84/checkpoint_checked.png "Production-ready")

2017–2023

导出（仅FBX）

**FBX**

**ArcGIS CityEngine**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49eca62f-8055-47de-86d4-be69ebfd7bc0/checkpoint_checked.png "Production-ready")

\--

导出插件

**Datasmith**

**Autodesk 3ds Max**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20f9101a-8d42-49fc-ae8e-4624122d32b3/checkpoint_checked.png "Production-ready")

2016–2024

导出插件

**Datasmith**

**Autodesk Alias**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d97f0f1-f747-4320-8535-96f059fce602/checkpoint_checked.png "Production-ready")

最高2023

直接

**CAD**

**Autodesk AutoCAD**

![测试或实验性功能](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fde26fc9-b1b7-4122-986c-cb47a50ff840/checkpoint.png "Beta or Experimental")

\--

直接

**CAD**

**Autodesk Inventor**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03a1c549-37e2-4d01-8993-539b80642c17/checkpoint_checked.png "Production-ready")

最高2024

直接

**CAD**

**Autodesk Revit**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/732c6087-18c3-4c86-adfa-479e05e0366c/checkpoint_checked.png "Production-ready")

2016.3–2023\*

导出插件

**Datasmith**

**Autodesk Navisworks**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5778ed92-cbdb-4be4-8890-e3af530a614a/checkpoint_checked.png "Production-ready")

2019–2023

导出插件

**Datasmith**

**Autodesk VRED**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74fb145e-f2bc-4f7a-81c8-6713a3d7d246/checkpoint_checked.png "Production-ready")

VRED Professional 2018–2023

导出插件

**FBX**

**Dassault Systèmes CATIA V5**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/708e7b44-0c3a-4216-8e99-9d376cbfbc06/checkpoint_checked.png "Production-ready")

最高V5\_6 R2023

直接

**CAD**

**Dassault Systèmes SOLIDWORKS**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8c96346-f41d-4123-9298-0cffc1d31609/checkpoint_checked.png "Production-ready")

最高2023

导出插件

**CAD**

**Dassault Systèmes SOLIDWORKS**

![测试或实验性功能](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e69976dd-44ad-474f-953b-b21303893b40/checkpoint.png "Beta or Experimental")

2020–2023

直接

**Datasmith**

**Graphisoft Archicad**

![测试或实验性功能](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77213406-96d5-42b6-9ad2-44fa2d03bad9/checkpoint.png "Beta or Experimental")

23-26

导出插件

**Datasmith**

**Maxon Cinema 4D**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07d69858-e516-4725-8f65-bdfbe3c336e3/checkpoint_checked.png "Production-ready")

\--

直接

**C4D**

**McNeel Rhinoceros**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dcc5caf2-e1ea-4e8b-8501-b23586a6bd27/checkpoint_checked.png "Production-ready")

最高7

导出插件

**Datasmith**

**McNeel Rhinoceros**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a89ff00-1431-46b1-8ab1-3dfaede66135/checkpoint_checked.png "Production-ready")

最高6

直接（`.3dm` 文件）

**Datasmith**

**PTC Creo (Pro/ENGINEER)**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2ce3b1e-97c7-4ce9-bd55-e0055e4f8a18/checkpoint_checked.png "Production-ready")

Pro/Engineer 19.0至Creo 10.0

直接

**CAD**

**Siemens NX**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da034141-c8a7-42e2-bfde-fbbd41f63f90/checkpoint_checked.png "Production-ready")

V11–V18、NX–NX12、NX1847–NX2212

直接

**CAD**

**Trimble SketchUp Pro**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/291dd19d-4788-4f7d-901a-6d279da80d19/checkpoint_checked.png "Production-ready")

2019–2023

导出插件、DirectLink

**Datasmith**

\* 从虚幻引擎5.3开始，Revit导出插件的新版本将由Autodesk管理，并直接在Revit 2024+中提供。UE仍然支持此插件，你可以在下载页面获取旧版本插件。

## 支持的文件格式和标准

文件格式或标准名称

支持程度

版本

流程类型

导入插件

**3DXML**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/369fc865-166e-436a-bf58-3365ea717cdb/checkpoint_checked.png "Production-ready")

最高V5-6 R2019 (R29)

直接

**CAD**

**工业基础类标准（IFC）**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18f02ea0-9457-4748-8ef8-56c118ed94bc/checkpoint_checked.png "Production-ready")

IFC2x 2、3和4版本

直接

**CAD**

**初始图形交换规范（IGES）**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26a5de49-42e6-4ecf-a419-5f02c5f0fd64/checkpoint_checked.png "Production-ready")

5.1、5.2、5.3

直接

**CAD**

**JT Open**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08465783-5761-4681-88dd-ff53a9f4874d/checkpoint_checked.png "Production-ready")

最高10.6

直接

**CAD**

**Parasolid (x\_t)**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6ca44d6-75c5-4cd0-a485-0147ea6aae32/checkpoint_checked.png "Production-ready")

最高35.1

直接

**CAD**

**Siemens PLM XML**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31d81263-5d97-4905-b4a4-44351f69bfa9/checkpoint_checked.png "Production-ready")

7.0.3和更高版本（兼容TeamCenter 11或更高版本）

Direct

**CAD**

**STEP**

![可供制作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8945558a-2e71-4999-af13-006aec8ac046/checkpoint_checked.png "Production-ready")

AP203、AP214、AP242

直接

**CAD**

### MacOS导出插件

大多数 **导出插件（Export Plugins）** 以及虚幻编辑器中的所有的Datasmith导入器目前都只能在微软的Windows平台上使用。从虚幻引擎4.27开始，我们还支持在macOS上从以下应用中导出内容：

应用

支持版本

Trimble SketchUp Pro

2019-2023

Graphisoft Archicad

23-26

McNeel Rhinoceros

6、7

## 虚幻引擎直接导出支持的格式

虚幻引擎为导入和导出FBX文件提供内置支持。

这些基于FBX的工作流程经过优化，以支持游戏需求，而游戏需求往往侧重于处理单个对象。相比之下，Datasmith带来了整个场景，可能包含数千个对象，每个对象都有来自广泛来源的材质、枢轴、比例、层级和元数据。但是，如果FBX导入管道适合你的需要，你应该可以随意使用它。例如，你可以使用它来导入额外的场景布置，你将使用这些场景布置来在虚幻关卡中增强Datasmith内容。

有关详情，你可以阅读我们的[FBX内容管线](/documentation/zh-cn/unreal-engine/fbx-content-pipeline)。

## 向后兼容性

我们可能会不时地需要更改Datasmith文件格式和导入器插件的行为，以添加新的功能。因此我们不保证所有版本的虚幻引擎与所有版本的Datasmith导出插件之间的向后兼容性。虽然它可能可以将一个使用旧版本的导出插件生成的 `.udatasmith` 文件导入到一个新版本的虚幻引擎，但是我们不建议依赖于它。 

始终使用与虚幻引擎版本和导出文件需要使用的Datasmith插件版本相匹配的导出插件版本。为了最大限度地利用Datasmith，并确保你从最新补丁和功能中获益，我们建议始终使用最新版本的导出插件和虚幻引擎。

-   [reference](https://dev.epicgames.com/community/search?query=reference)
-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [enterprise](https://dev.epicgames.com/community/search?query=enterprise)
-   [manufacturing](https://dev.epicgames.com/community/search?query=manufacturing)
-   [simulation](https://dev.epicgames.com/community/search?query=simulation)
-   [architecture](https://dev.epicgames.com/community/search?query=architecture)
-   [supported software](https://dev.epicgames.com/community/search?query=supported%20software)
-   [file types](https://dev.epicgames.com/community/search?query=file%20types)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [支持的应用](/documentation/zh-cn/unreal-engine/datasmith-supported-software-and-file-types#%E6%94%AF%E6%8C%81%E7%9A%84%E5%BA%94%E7%94%A8)
-   [支持的文件格式和标准](/documentation/zh-cn/unreal-engine/datasmith-supported-software-and-file-types#%E6%94%AF%E6%8C%81%E7%9A%84%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F%E5%92%8C%E6%A0%87%E5%87%86)
-   [MacOS导出插件](/documentation/zh-cn/unreal-engine/datasmith-supported-software-and-file-types#macos%E5%AF%BC%E5%87%BA%E6%8F%92%E4%BB%B6)
-   [虚幻引擎直接导出支持的格式](/documentation/zh-cn/unreal-engine/datasmith-supported-software-and-file-types#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E7%9B%B4%E6%8E%A5%E5%AF%BC%E5%87%BA%E6%94%AF%E6%8C%81%E7%9A%84%E6%A0%BC%E5%BC%8F)
-   [向后兼容性](/documentation/zh-cn/unreal-engine/datasmith-supported-software-and-file-types#%E5%90%91%E5%90%8E%E5%85%BC%E5%AE%B9%E6%80%A7)
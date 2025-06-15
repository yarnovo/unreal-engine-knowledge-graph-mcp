# Datasmith导出SDK指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines
> 
> 生成时间: 2025-06-14T19:06:38.983Z

---

目录

![Datasmith导出SDK指南](https://dev.epicgames.com/community/api/documentation/image/56f0f39f-4042-46ca-9220-bd2c86b248b7?resizing_type=fill&width=1920&height=335)

## 本指南的目标受众

本指南面向希望使用Datasmith框架将场景从第三方设计应用程序导出到虚幻引擎的3D应用程序开发人员。

本指南设立了以下前提：

-   你是一名有经验的C++程序员。
-   你熟悉3D应用程序的开发。
-   你正在开发将模型从第三方3D应用程序导出到虚幻引擎或Twinmotion的功能。
-   你不熟悉虚幻引擎的工作原理，但愿意了解它的相关信息。

## 你将学习的内容

本页面概述使用Datasmith SDK将3D模型从其他设计应用程序导出到虚幻引擎的一系列准则和最佳实践。概括地说，它概述了以下内容：

-   Datasmith的设计理念。
-   虚幻引擎中的数据模型和结构。
-   Datasmith导出器的UX准则，为导出过程的每个主要环节提供了单独的核对清单。
-   适用于不同场景的API调用和代码示例。

## 下载包及先决条件

本小节包含以下内容：

-   所需下载包及获得途径的列表。
-   入门所需Datasmith和虚幻引擎知识的概述，以及深入学习的资源链接。

## 下载虚幻引擎和Datasmith SDK

如果你从[虚幻引擎GitHub仓库](https://github.com/EpicGames/UnrealEngine)下载并构建虚幻引擎，则会附带Datasmith SDK。

如需从GitHub下载虚幻引擎源代码，你必须首先按照[本指南](https://www.unrealengine.com/zh-CN/ue-on-github)概述的步骤申请对该仓库的访问权限。如果你未被授予访问权限，将收到404错误。

下载虚幻引擎源代码后，可在以下位置找到Datasmith SDK：

`\Engine\Source\Programs\Enterprise\Datasmith\DatasmithSDK\`

`Documentation` 文件夹包含一个示例项目，以及有关如何配置开发环境的说明。

如果你从[Epic Games启动程序](https://www.unrealengine.com/zh-CN/download/ue_non_games)下载并安装虚幻引擎，则必须从虚幻引擎GitHub仓库中的[此文件夹](https://github.com/EpicGames/UnrealEngine/tree/release/Engine/Source/Programs/Enterprise/Datasmith/DatasmithSDK)单独下载Datasmith SDK。

Epic Games已为Revit、SketchUp和3ds Max等几款设计应用程序开发了Datasmith导出插件。你可以参考这些插件来完成自己的开发工作。

你可以在Epic Games GitHub仓库的以下位置访问这些Datasmith导出插件的源代码：

`\Engine\Source\Programs\Enterprise\Datasmith\`

### 了解Datasmith

Datasmith是一个工具和插件的集合，用于将在各种设计应用程序中创建的预构建场景引入虚幻引擎。其设计宗旨是克服其他泛型文件格式（如FBX或OBJ）的局限性。

Datasmith能够：

-   处理大型网格体。
    
-   存储虚幻引擎使用的数据，如：
    
    -   细节级别
        
    -   碰撞
        
    -   光源
        
    -   对象层级
        
    -   元数据
        

重新设置纹理文件的格式（数量为2的乘方，转换为Unreal处理的格式）。

如需了解有关Datasmith特性和功能的更多信息，请参阅[Datasmith概述](/documentation/zh-cn/unreal-engine/datasmith-plugins-overview)页面。

导出数据分两步进行：

1.  解析设计应用程序，并使用 **DatasmithCore** API构建一个 **DatasmithScene** 。
    
2.  使用 **DatasmithExporter** API将场景导出到磁盘。
    

如需了解如何使用这些API，请参阅以下文档：

-   [DatasmithCore](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore)
    
-   [DatasmithExporter](/documentation/en-us/unreal-engine/API/Developer/DatasmithExporter)
    

### 虚幻引擎数据模型

在你开始编写Datasmith导出器之前，请先熟悉虚幻引擎如何存储和组织信息。

虚幻引擎通过项目进行工作。一个虚幻项目至少包含一个[关卡](/documentation/zh-cn/unreal-engine/level-editor-in-unreal-engine)，其中包含一个或多个[Actor](/documentation/zh-cn/unreal-engine/actors-and-geometry-in-unreal-engine)。Actor具有位置、旋转和缩放。它们可以存在于不同的层、可显示或隐藏、包含动画等。

每个Actor都有一个或多个[组件](/documentation/zh-cn/unreal-engine/basic-components-in-unreal-engine)，组件可以是：

-   几何资产，如[静态网格体](/documentation/zh-cn/unreal-engine/static-mesh-actors-in-unreal-engine)。
    
-   [光源](/documentation/zh-cn/unreal-engine/point-lights-in-unreal-engine)。
    
-   [摄像机](/documentation/zh-cn/unreal-engine/camera-actors-in-unreal-engine)等。
    

静态网格体参考[主材质或材质实例](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)。材质资产会依次引用纹理资产。

单个静态网格体可被多个Actor引用。这种情况称作几何体实例化。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05ee0dda-d09e-44a9-8cd3-c0a39256baca/ue-data-structure.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05ee0dda-d09e-44a9-8cd3-c0a39256baca/ue-data-structure.png)

此图说明了虚幻引擎中Actor、组件和各种类型资产之间的关系。点击查看大图。

## Datasmith设计原则

作为插件开发人员，无论数据从哪个软件导出，你都应该努力确保用户获得一致的体验。因此，理解并遵守下面概述的Datasmith设计原则非常重要。这些原则是我们（Datasmith开发人员团队）在自行开发插件时使用的原则。

### Datasmith插件类型

所有Datasmith插件都使用以下两种方案之一：

-   导出器/导入器组合。例如，3ds Max、Revit和Sketchup使用：
    
    -   软件端的Datasmith导出器插件。
        
    -   虚幻引擎端的Datasmith文件导入器插件。
        
-   直接导入器。例如，虚幻引擎可以导入Rhino、Solidworks和Cinema4D的某些原生文件格式。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a266673-26a4-4e21-b7ff-14386470b317/datasmith-import.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a266673-26a4-4e21-b7ff-14386470b317/datasmith-import.png)

此图说明了可供选择的各种Datasmith导入工作流程。点击查看大图。

选择使用哪种工作流程取决于具体情况。

### 导出和导入逻辑

要在不同应用程序之间交换数据，难点之一是了解该在哪个环节设置部分逻辑。当我们将数据从一个应用程序转译到另一个应用程序时，可以自问以下问题：

-   我们应该导出所有内容还是提供选项来排除某些实体？
    
-   我们导出时是否应排除小对象？我们如何定义"小"？
    
-   我们导出时是否应减少多边形计数？我们是否应该降低纹理分辨率？
    
-   我们应在什么环节重新缩放实体以匹配单位和比例？等等。
    

一般来说，我们的方法是以粒度方式（即逐个对象）导出所有内容，并在数据稍后导入到虚幻引擎或Twinmotion时处理对象合并、多边形简化和其他数据准备操作。

虽然没有严格的规则，但我们的一般方法是，最好在Datasmith导出器中公开最少数量的选项（或根本不予公开），并在导入过程中让虚幻引擎用户做出大部分决定。

采用这种方法时，由虚幻或Twinmotion用户决定其数据的粒度或优化程度。虚幻引擎的[Dataprep](/documentation/zh-cn/unreal-engine/dataprep-import-customization-in-unreal-engine)工具非常适合用于做出这些决定。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e276e643-048e-48a3-87a2-1c9a77bac5fc/datasmith-operations.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e276e643-048e-48a3-87a2-1c9a77bac5fc/datasmith-operations.png)

Datasmith导出/导入过程中内部操作和用户选择操作之间的划分示例。点击查看大图。

### 在源发生变化后重新导入数据

Datasmith可将来自各种源应用程序的设计数据导入虚幻引擎，通常用于围绕该数据构建实时可视化和体验。通常，当你在虚幻引擎中处理这些可视化和体验的构建工作时，你的工作纳入的场景或设计数据需要做出更改，以满足新的要求或纳入利益相关者的反馈。

为了避免艰难而又成本高昂的返工，你需要能够纳入这些上游更改，而又不会丢失你在虚幻编辑器中已完成的所有工作。为此，Datasmith提供了一个[重新导入工作流程](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine)，可保留你在虚幻项目内做出的所有更改。

从Datasmith SDK的视角来看，重新导入数据意味着两个条件：

1.  实体必须具有持久的唯一标识符。依赖于对象名称并非适当的策略，因为可能存在多个对象同名的情况。
    
2.  实体保存时使用的哈希数值必须允许以可能达到的最高性能重新导入数据。
    
    创建Datasmith实体时，将根据对象的数据生成唯一编号。例如，为了快速确定两个网格体是否完全相同，你可以使用耗时的算法面对面地比较它们，也可以根据顶点、面和UV的数量计算数值。就判断两个网格体是否完全相同而言，比较这两个数值将是快得多的方法。
    

本页面再靠后一些的部分描述了相关示例。

### 环境和照明

尽管你可能很想将虚幻视为渲染引擎，并期望导出的模型包含其所有环境设置（摄像机、环境、背景等），我们发现，这些艺术决策一般最好由虚幻引擎或Twinmotion用户在数据已导入引擎后做出。

最重要的方面是导入模型元素（几何体、材质、光源、元数据）。将数据导入虚幻引擎或Twinmotion后，用户可以更改材质、调整照明并执行其他艺术任务。

## Datasmith导出器UX准则

如果你成功到达此阶段，你很可能已经编译了虚幻，并使用一个小应用程序创建了你的第一个Datasmith文件。祝贺你！

现在是时候审视UX考虑因素了，即应为最终用户采用怎样的数据组织方式。

### 导出器UI

正如我们在上面的"Datasmith设计原则"小节中所述，我们希望在导出到Datasmith时提供最少量的选项。以下是一些示例：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f43de339-8d2d-474a-8790-32a8dc19772f/export-3d-view-revit.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f43de339-8d2d-474a-8790-32a8dc19772f/export-3d-view-revit.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e14b9a1f-3cf8-43c7-8e14-ade3c4d84ec9/datasmith-export-options.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e14b9a1f-3cf8-43c7-8e14-ade3c4d84ec9/datasmith-export-options.png)

Revit中的Datasmith导出器

虚幻引擎中的导出选项对话框

#### 准则

-   通过依靠应用程序的查看和过滤能力支持WYSIWYG（所见即所得）导出。例如，Revit仅会导出激活的视图中可见的内容，而SketchUp仅会导出屏幕上可见的内容。没有理由创造一个全新的UX来选择和过滤要导出的实体。
    
-   导出时不支持选项。
    
-   如果你必须公开选项，请让尽可能简化选项。请参考上面的3ds Max导出器作为示例。
    

#### 应避免的情况

与数据准备和优化相关的选项，如几何体细节、对象类型过滤、UV通道等。这些应是由虚幻引擎用户在虚幻引擎中做出的决定。

### 进度信息和错误消息

Datasmith导出器将收集所有与在虚幻引擎中转移和重建场景相关的实体。可能会出现某些实体无法导出的情况。如果一个或多个实体无法导出，你应该通知用户。

此外，一些项目非常庞大，这可能使导出耗时较长。用户应该能够看到进度信息。

以下是一些示例。点击下方图像可查看大图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2aa7e526-0125-4d8a-81ab-5ab696348c32/3dsmax-progress.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2aa7e526-0125-4d8a-81ab-5ab696348c32/3dsmax-progress.png)

3ds Max中的进度信息。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e18b211d-5e7b-47f9-9bac-71ee1d21cdc3/revit-export-warnings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e18b211d-5e7b-47f9-9bac-71ee1d21cdc3/revit-export-warnings.png)

Revit Datasmith导出器中的输出警告。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0d328e0-42ba-4253-9915-f20bd41b6a39/3dsmax-export-warnings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0d328e0-42ba-4253-9915-f20bd41b6a39/3dsmax-export-warnings.png)

3ds Max Datasmith导出器中的输出警告。

#### 准则

-   导出过程中需要向用户显示进度信息。
    
-   用户需要能够取消Datasmith导出过程。
    
-   应显示错误消息日志，告知用户有关不支持的对象、缺少的纹理和其他问题的信息。
    

#### 实用项

某些用户经常需要进行批处理和脚本编写。例如，使用SketchUp、3ds Max或Revit时，用户可以使用原生应用程序脚本编写语言批量导出到Datasmith。

#### 应避免的情况

请勿实现连续模式对话框（确定（OK）/取消（Cancel）窗口），每次出现错误或警告时，这些对话框都会中断导出过程。

#### 有用的API调用

-   [DatasmithExporter](/documentation/en-us/unreal-engine/API/Developer/DatasmithExporter)
    
-   [IDatasmithProgressManager](/documentation/en-us/unreal-engine/API/Developer/DatasmithExporter/IDatasmithProgressManager)
    
-   [FDatasmithLogger](/documentation/en-us/unreal-engine/API/Developer/DatasmithExporter/FDatasmithLogger)
    

#### 代码示例

如需查看实现方案示例，请参考虚幻引擎仓库中的以下文件：

`/Engine/Source/Programs/Enterprise/Datasmith/DatasmithSketchUpRubyExporter/Private/DatasmithSketchUpExporter.cpp`

### 导出的文件和文件夹结构

Datasmith"文件"由两部分组成：

-   使用XML数据结构的 `.udatasmith` 文件。
    
-   包含与 `.udatasmith` 文件关联的所有资产的"sidecar文件夹"（关联文件夹）。
    

![.udatasmith文件的sidecar文件夹示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42f53880-fbbf-4cee-a2eb-7ae525c7a8d2/sidecar-folder.png)

导出文件及其关联文件夹示例。

#### 必备项

-   一个 `[filename].udatasmith` 文件和一个关联的\[filename\]\_Assets文件夹。
    
-   所有相关资产都存储在\[filename\]\_Assets文件夹中。
    
-   在 `.udatasmith` 文件的XML结构中使用相对路径引用资产。
    

#### 应避免的情况

-   不要通过绝对路径引用资产。
    
-   不要额外创建包含资产的文件夹和子文件夹。以下是一个不正确导出的示例：
    
    ![不正确的文件结构](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b6a18ea-f7d2-4ed0-be40-1059d6ed130a/incorrect-file-structure.png)
    
    请注意，Textures 文件夹位于Datasmith项目文件之外。这是不正确的。
    

### Datasmith文件的头文件

我们（Epic Games）使用头文件信息来了解数据的来源。我们的遥测只收集有关导入的文件类型和来源的统计数据。

下面是Datasmith文件的头文件示例：

```cpp

    <DatasmithUnrealScene>
    	<Version>0.24</Version>
    	<SDKVersion>4.25</SDKVersion>
    	<Host>Revit</Host>
    	<Application Vendor="Autodesk Inc." ProductName="Revit" ProductVersion="2018"/>
    	<User ID="1e8adca84ffe2d4d625d54b63fba876d" OS="Windows 10（发行版1709）"/>

```

#### 必备项

必须像上例那样正确设置Datasmith信息。

#### 有用的API调用

-   [IDatasmithScene::SetHost](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithScene/SetHost)
    
-   [IDatasmithScene::SetProductName](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithScene/SetProductName)
    
-   [IDatasmithScene::SetProductVersion](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithScene/SetProductVersion)
    

#### 代码示例

如需查看实现方案示例，请参考虚幻引擎仓库中的以下文件：

`/Engine/Source/Programs/Enterprise/Datasmith/DatasmithSketchUpRubyExporter/Private/DatasmithSketchUpExporter.cpp`

### 静态网格体资产

静态网格体资产([IDatasmithMeshElement](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithMeshElement))将定义实际的几何体，但在被Actor([IDatasmithMeshActorElement](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithMeshActorElement))引用之前，它们不会出现在虚幻或Twinmotion视口中。此外，场景中的多个 `IDatasmithMeshActorElement` 可以指向同一静态网格体资产。

静态网格体资产容纳以下各项的数据：

-   面、顶点、法线和平滑遮罩
    
-   UV
    
-   碰撞
    
-   细节级别
    
-   顶点颜色
    
-   材质ID和指定等
    

以下是 `.udatasmith` 文件中某个静态网格体资产的数据结构示例：

```cpp

    <StaticMesh name="c96130816d3eee95f82a6c00e553f491" label="Walls_Basic_Wall_Exterior_-_Insulation_on_Masonry">
      <file path="rac_advanced_sample_project-3DView-{3D}_Assets/c96130816d3eee95f82a6c00e553f491.udsmesh"/>
      <Size a="5922000.0" x="855.299927" y="30.300011" z="1139.999878"/>
      <LightmapCoordinateIndex value="-1"/>
      <LightmapUV value="-1"/>
      <Hash value="c0e8334d671cf30ef8ff8a67aa4da25b"/>
      <Material id="9" name="e72f7720bfd15817d3789377231c9646"/>
      <Material id="10" name="5d261e4bd619e79ebea1cfcc1d1a8d8e"/>
      <Material id="11" name="13b3765549b7832c6bc26e8922497ced"/>
    </StaticMesh>

```

#### 必备项

-   静态网格体 **名称** 必须唯一，并且在连续导出的间隔不得更改。这是跟踪实体以便进行后续重新导入的必备条件。3D应用程序通常提供非常适合此目的的GUID。
    
-   静态网格体 **标签** 必须经过清理、可由用户读取并能体现该对象可能是什么。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9fe37897-c7a7-4ff9-b084-6c2e451697f3/unique-names-mesh-assets.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9fe37897-c7a7-4ff9-b084-6c2e451697f3/unique-names-mesh-assets.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a8bd961-2dbd-4514-a891-ea275f71869a/user-facing-labels.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a8bd961-2dbd-4514-a891-ea275f71869a/user-facing-labels.png)

网格体资产的唯一名称

虚幻引擎中的用户可读标签

-   静态网格体资产（`IDatasmithMeshElement`）必须在适用情况下（它们必须已实例化）在所有Actor之中复用。
    
-   虚幻引擎使用[左手Z轴朝上](https://www.evl.uic.edu/ralph/508S98/coordinates.html)坐标，并以厘米为单位测量尺寸，因此：
    
    -   转换必须在导出器端进行。
        
    -   UV纹理坐标必须垂直翻转（在Y轴上），因此我们不会在材质平铺中使用负比例来抵消图像在虚幻引擎中的翻转。
        
    -   比例转换和坐标变换必须烘焙到静态网格体中，而不是应用于Actor变换。
        
        ![烘焙到场景几何体中的比例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5283667-3e92-4483-bd92-eb2d8917f2ac/scale-baked-in-geometry-1.png)
        
        ![烘焙到场景几何体中的比例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbad5482-5a24-464a-a7c1-ea4e8598fe51/scale-baked-in-geometry-2.png)
        
        比例在几何体中烘焙，这会导致Actor变换被设置为比例1.0（而不是2.54或0.333）
        
    -   网格体枢轴点必须在网格体中计算，以免它们的坐标最终都变成0, 0, 0。
        
        ![正确对齐的网格体枢轴点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23b4d1bf-e0fb-40f1-b244-fbf3630d464c/mesh-pivots-1.png)
        
        ![未正确对齐的网格体枢轴点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e122b841-5c0a-4b1a-8fd6-5c63b52c52ca/mesh-pivots-2.png)
        
        左：网格体枢轴点与对象对齐（正确）。右：枢轴点位于0, 0, 0（不正确）
        
    -   必须焊接三角形，以使平滑遮罩和遮光工作正常。
        
        ![几何体上的平滑、法线等设置正确](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7aa99b6a-2ca7-4842-a814-64c6d0d17b00/welded-triangles-1.png)
        
        ![几何体上的平滑、法线等设置正确](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec36fef8-d0cc-42f3-af61-c7d398fecb14/welded-triangles-2.png)
        
        几何体上的平滑、法线等设置正确。
        

#### 实用项

-   指定其他LOD。
    
-   指定碰撞网格体。
    
-   指定光照图UV通道（解包）。
    

#### 应避免的情况

-   不能保证在所有导出中具有唯一性且可重复的静态网格体名称。不要使用用户指定的对象名称。
    
-   不要存储会在Actor变换内重新缩放的单位。
    
-   不要将枢轴点保持在0, 0, 0。
    
-   不要导出应焊接在一起的数千个静态网格体Actor。例如，*盒体* 通常是具有6个面的单个网格体，而不是各有一面的6个单独网格体。
    

#### 有用的API调用

-   [IDatasmithMeshElement](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithMeshElement)
    
-   [FDatasmithMesh](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/FDatasmithMesh)
    
-   [FDatasmithUtils::SanitizeObjectName](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/FDatasmithUtils/SanitizeObjectName)
    

#### 代码示例

如需查看实现方案示例，请参考虚幻引擎仓库中的以下文件：

`/Engine/Source/Programs/Enterprise/Datasmith/DatasmithSketchUpRubyExporter/Private/DatasmithSketchUpExporter.cpp`

### 静态网格体Actor

静态网格体Actor([IDatasmithMeshActorElements](/documentation/404))不定义实际几何体。它们指向静态网格体资产([IDatasmithMeshElement](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithMeshElement))。请注意，可能有数个 `IDatasmithMeshActorElements` 引用同一静态网格体。

以下是 `.udatasmith` 文件中某个静态网格体Actor的数据结构示例。

```cpp

    <ActorMesh name="1" label="Teapot001" layer="0">
	    <mesh name="1"/>
	    <Transform tx="16.825752" ty="-18.789846" tz="0.0" sx="1.0" sy="1.0" sz="1.0" qx="0.0" qy="0.0" qz="0.0" qw="1.0" qhex="0000008000000000000000800000803F"/>
	    <tag value="Max.superclassof: GeometryClass" />
	    <tag value="Max.classof: Teapot" />
	    <tag value="Max.handle: 1" />
	    <tag value="Max.isGroupHead: false" />
	    <tag value="Max.isGroupMember: false" />
	    <tag value="Max.parent.handle: 0" />
    </ActorMesh>

    <ActorMesh name="2" label="Teapot002" layer="0">
	    <mesh name="1"/>
	    <Transform tx="16.825752" ty="35.718727" tz="0.0" sx="1.0" sy="1.0" sz="1.0" qx="0.0" qy="0.0" qz="0.0" qw="1.0" qhex="0000008000000000000000800000803F"/>
	    <tag value="Max.superclassof: GeometryClass" />
	    <tag value="Max.classof: Teapot" />
	    <tag value="Max.handle: 2" />
	    <tag value="Max.isGroupHead: false" />
	    <tag value="Max.isGroupMember: false" />
	    <tag value="Max.parent.handle: 0" />
    </ActorMesh>

```

![两个引用从3ds Max导入的同一静态网格体资产（实例化）的静态网格体Actor。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6e60fa4-867a-439b-b8c0-d09cce62953e/static-mesh-actor-instancing.png)

两个引用从3ds Max导入的同一静态网格体资产（实例化）的静态网格体Actor。

#### 必备项

-   网格体Actor **名称** 必须唯一，并且在连续导出的间隔不得更改。这是跟踪实体以便进行后续重新导入的必备条件。
    
-   网格体Actor **标签** 必须经过清理（即，它们不得包含无效字符）且用户可读。
    
-   静态网格体资产（`IDatasmithMeshElement`）必须在适用情况下（它们必须已实例化）在所有Actor之中复用。
    
-   比例和坐标转换以及坐标变换必须烘焙到静态网格体中，而不是应用于Actor变换。
    

#### 实用项

-   层规格。
    
-   支持标签和元数据。
    

#### 有用的API调用

-   [FDatasmithSceneFactory::CreateActor](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/FDatasmithSceneFactory/CreateActor)
    
-   [FDatasmithSceneFactory::CreateMeshActor](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/FDatasmithSceneFactory/CreateMeshActor)
    
-   [IDatasmithActorElement](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithActorElement)
    
-   [IDatasmithMeshActorElement](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithMeshActorElement)
    
-   [FDatasmithUtils::SanitizeObjectName](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/FDatasmithUtils/SanitizeObjectName)
    

#### 代码示例

如需查看实现方案示例，请参考虚幻引擎仓库中的以下文件：

`/Engine/Source/Programs/Enterprise/Datasmith/DatasmithSketchUpRubyExporter/Private/DatasmithSketchUpComponent.cpp`

#### 空Actor

空Actor是没有附加组件或静态网格体的Actor。它们适用于容纳元数据或充当表示层级组成部分的一种方法。对于你应该如何或何时使用它们，并无严格的规则。下面的准则涵盖了一些常见的使用示例。

#### 准则

可使用空Actor：

-   表示空对象（例如，3ds Max辅助对象）。
    
-   表示自定义原点（例如，Revit工地位置）。
    
-   表示其他可提高层级可读性的元素（例如，Rhino中的图层、Rhino中的图块原点或Revit中的标高）。
    
-   表示自身不含几何体的复合对象（例如Revit幕墙）的头部。
    

#### 示例

![转译为空Actor的3ds Max辅助对象](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe50c945-f927-4443-b4a8-babbe31ff7c8/3dsm-helper-objects-empty-actors.png)

转译为空Actor的3ds Max辅助对象。

![用于表示Revit中不可见元素的空Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/055b0476-5f41-4895-9741-af8a67f0a73c/revit-invisible-elements-empty-actors.png)

用于表示Revit中不可见元素的空Actor

#### 有用的API调用

-   [FDatasmithSceneFactory::CreateActor](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/FDatasmithSceneFactory/CreateActor)
    
-   [FDatasmithSceneFactory::CreateMeshActor](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/FDatasmithSceneFactory/CreateMeshActor)
    
-   [IDatasmithActorElement](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithActorElement)
    
-   [IDatasmithMeshActorElement](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithMeshActorElement)
    
-   [FDatasmithUtils::SanitizeObjectName](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/FDatasmithUtils/SanitizeObjectName)
    

#### 代码示例

如需查看实现方案示例，请参考虚幻引擎仓库中的以下文件：

`/Engine/Source/Programs/Enterprise/Datasmith/DatasmithSketchUpRubyExporter/Private/DatasmithSketchUpComponent.cpp`

### Actor层级

与许多其他3D应用程序一样，虚幻引擎也支持父/子层级。

下面是 `.udatasmith` 文件中的父/子关系示例。

```cpp

    <ActorMesh name="3" label="Box001" layer="0">
		    <mesh name="3"/>
		    <Transform .../>
		    <children visible="true"  selector="false" selection="-1">
			    <ActorMesh name="5" label="Box002" layer="0">
				    <mesh name="5"/>
				    <Transform ..."/>
				    <children visible="true"  selector="false" selection="-1">

```

#### 准则

-   使用Actor层级来反映应用程序的数据模型。
    
    ![原样转译到虚幻引擎中的3ds Max层级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a605519-fac6-4155-bf57-96ad2999b2c9/3dsm-helper-objects-empty-actors.png)
    
    原样转译到虚幻引擎中的3ds Max层级。
    
-   如有必要，请插入更多空Actor来存储与你的应用程序数据模型相关的信息（例如，Revit标高将以额外的父Actor形式导出）。
    
    ![添加到层级的Revit标高成为确定最终用户方位的有用方法](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c76caa6d-f464-4295-8b7b-8258f357b8ee/empty-actors-hierarchy.png)
    
    添加到层级的Revit标高成为确定最终用户方位的有用方法。
    

#### 应避免的情况

为确保你的层级便于最终用户浏览，请仅在必要时使用空Actor作为静态网格体Actor的父项。空Actor过多会使层级变得混乱，更难在Twinmotion和虚幻引擎中读取和使用它们。

![过多空Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa122ed7-6024-4c5f-afcd-8689156f6918/too-many-empty-actors.png)

![仅在必要时使用空Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7760cbf7-fd31-47f6-86a1-06d4bc9c7d8f/empty-actors-when-necessary.png)

过多空Actor。

仅在必要时使用空Actor。

#### 有用的API调用

-   [IDatasmithActorElement::AddChild](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithActorElement/AddChild)

#### 代码示例

如需查看实现方案示例，请参考虚幻引擎仓库中的以下文件：

`/Engine/Source/Programs/Enterprise/Datasmith/DatasmithSketchUpRubyExporter/Private/DatasmithSketchUpComponent.cpp`

### 作为组件的Actor

在Revit或Archicad等应用程序中，对象通常包含数个子元素。例如，幕墙通常使用嵌板和竖梃构建，栏杆通常使用横杆和护栏构建：

![Revit中的幕墙和栏杆](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25a6b1c5-cd9c-4d11-941f-e89d31d598b5/revit-cutrain-walls-railings.png)

在Revit中，幕墙和栏杆是包含子元件（嵌板、竖梃、护栏、扶手）的特殊对象。

虽然可以将每个元素作为单独的静态网格体Actor导出，但这最终会造成导出的对象过多，并且虚幻引擎中的世界大纲视图会变得过于拥挤，如下所示。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca828f38-6499-4f06-9009-88a1eeca8594/too-many-actors.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca828f38-6499-4f06-9009-88a1eeca8594/too-many-actors.png)

以每个嵌板和竖梃一个静态网格体Actor的形式导出幕墙=世界大纲视图中存在大量Actor！点击查看大图。

如果适用，请考虑以Actor组件形式导出子元素。例如，可以使用以下Actor和组件层级导出幕墙对象：

-   幕墙对象 → 空Actor。
    
    -   嵌板 → 静态网格体Actor组件
        
    -   嵌板 → 静态网格体Actor组件
        
    -   竖梃 → 静态网格体Actor组件
        
    -   竖梃 → 静态网格体Actor组件
        

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53fff819-f9e6-492f-b2b1-3c36e8a061a5/actors-and-components-export.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53fff819-f9e6-492f-b2b1-3c36e8a061a5/actors-and-components-export.png)

以空Actor形式导出幕墙，以静态网格体Actor组件形式导出每个嵌板和竖梃显著减少了世界视图层级中的混乱。点击查看大图。

在 `.udatasmith` 文件中，层级内容与如下所示类似：

```cpp

    <Actor name="..." label="Walls_Curtain_Wall_Exterior_Curtain_Wall" layer="Walls">
	    <Transform .../>
	    <children visible="true"  selector="false" selection="-1">
		    <ActorMesh name="..." label="Curtain_Panels" layer="Curtain Panels" component="true">
			    <mesh name="..."/>
			    <Transform .../>
		    </ActorMesh>
		    <ActorMesh name="..." label="Curtain_Panels" layer="Curtain Panels" component="true">
			    <mesh name=">
			    <Transform .../>
		    </ActorMesh>
		    <ActorMesh name="label="Curtain_Panels" layer="Curtain Panels" component="true">
			    <mesh name="..."/>
			    <Transform .../>
		    </ActorMesh>

```

#### 准则

-   使用静态网格体Actor组件表示子对象，如幕墙嵌板、护栏或类似的复合对象。
    
-   你必须同时设置层级([IDatasmithActorElement::AddChild](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithActorElement/AddChild))和组件标记([IDatasmithActorElement::SetIsAComponent](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithActorElement/SetIsAComponent))，才能使其正常工作。
    

#### 有用的API调用

-   [IDatasmithActorElement::AddChild](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithActorElement/AddChild)
    
-   [IDatasmithActorElement::SetIsAComponent](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithActorElement/SetIsAComponent)
    

#### 代码示例

如需查看实现方案示例，请参考虚幻引擎仓库中的以下文件：

`/Engine/Source/Programs/Enterprise/Datasmith/DatasmithSketchUpRubyExporter/Private/DatasmithSketchUpComponent.cpp`

### Actor层

与许多其他3D应用程序一样，虚幻引擎也支持层的概念。层是一个Actor属性，表示Actor在场景的视觉层级中的位置。

下例显示的是层在 `.udatasmith` 文件中的一种可行用法。

```cpp

    <ActorMesh name="2" label="Sphere001" layer="Layer002">
    ...
    </ActorMesh>
    <ActorMesh name="3" label="Box001" layer="Layer004">
    ...
    </ActorMesh>

```

#### 准则

-   如果你的源应用程序使用层，则应将其转译为虚幻引擎中的层。
    
-   如果你的源应用程序不使用层，请考虑是否有其他数据可以转译为虚幻引擎层。例如，Revit不使用层，而是按类别对实体进行分类。
    
    ![在派生自Revit类别的层上导入的Revit实体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/245c7c8a-4f28-4a2b-aa8b-be102267d4d9/revit-layers.png)
    
    在派生自Revit类别的层上导入的Revit实体。
    

#### 限制

-   层名称必须唯一。
    
-   虚幻引擎不支持嵌套层。
    

![3ds Max中的嵌套层](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99600506-05a1-45c0-800f-6f8584ed811c/nested-layers-3dsmax.png)

![在虚幻引擎中导入的相同层](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ce1575e-1d17-42c2-adff-d0c6264d3e26/flat-layers-ue.png)

3ds Max中的嵌套层。

在虚幻引擎中导入的相同层。观察平面层层级。

#### 有用的API调用

-   [IDatasmithActorElement::SetLayer](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithActorElement/SetLayer)

#### 代码示例

如需查看实现方案示例，请参考虚幻引擎仓库中的以下文件：

`/Engine/Source/Programs/Enterprise/Datasmith/DatasmithMaxExporter/Private/DatasmithMaxSceneExporter.cpp`

### Actor标签

虚幻引擎支持用户定义的Actor标签。Datasmith使用Actor标签来容纳描述源应用程序中数据组织方式的技术信息。然后，虚幻引擎用户可以使用这些Actor标签来执行脚本编写操作（例如使用Python、蓝图工具或Visual Dataprep）。

以下是从3ds Max导出的 `.udatasmith` 文件中静态网格体Actor上标签的使用示例：

```cpp

    <ActorMesh ...>
	    <mesh name="a8f655367fcc240a8c9eb8d847d58463"/>
	    <Transform .../>
	    <tag value="Revit.Element.Id.186551" />
	    <tag value="Revit.Element.UniqueId.07ae6064-8e02-489e-896d-f7554545ebb2-0002d8b7" />
	    <tag value="Revit.DB.FamilyInstance.Mirrored.True" />
	    <tag value="Revit.DB.FamilyInstance.HandFlipped.False" />
	    <tag value="Revit.DB.FamilyInstance.FaceFlipped.True" />
	    <tag value="Revit.Host.Id.156316" />
	    <tag value="Revit.Host.UniqueId.9e597f98-694d-4ada-b8ef-0e7459e0b930-0002629c" />
    </ActorMesh>
    <ActorMesh name="1" label="Teapot001" layer="0">
	    <mesh name="1"/>
	    <Transform .../>
	    <tag value="Max.superclassof: GeometryClass" />
	    <tag value="Max.classof: Teapot" />
	    <tag value="Max.handle: 1" />
	    <tag value="Max.isGroupHead: false" />
	    <tag value="Max.isGroupMember: false" />
	    <tag value="Max.parent.handle: 0" />
    </ActorMesh>

```

虽然并无严格的规则规定Actor的标签中应放入什么内容，但我们采用的方法使用标签来容纳源应用程序特有的信息。

例如，对于3ds Max，我们决定了使用标签来容纳有关对象类型（在3ds Max中）、对象是否属于某个组等方面的信息。

对于Revit，我们采用了类似的方法，即存储描述Revit实体内部结构的信息。

![来自Revit的Actor组件上的Actor标签](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18a0d53a-80fa-4d28-a5f5-39027b4a6310/revit-actor-tags.png)

![来自3ds Max的Actor标签](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/165a54b7-4696-4277-8707-d33adfa7d285/3dsmax-actor-tags.png)

来自Revit的Actor组件上的Actor标签。

在虚幻引擎中导入的相同层。观察平面层层级。

#### 准则

-   在标签前添加导入操作的源应用程序的名称（例如：Revit.TagName或Max.TagName）。

\*使用标签来表示有关源应用程序中数据组织方式的技术信息。如需存储其他用户定义的数据，请改用元数据。

#### 有用的API调用

-   [IDatasmithActorElement::AddTag](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithActorElement/AddTag)
    
-   [IDatasmithActorElement::SetIsAComponent](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithActorElement/SetIsAComponent)
    

#### 代码示例

如需查看实现方案示例，请参考虚幻引擎仓库中的以下文件：

`/Engine/Source/Programs/Enterprise/Datasmith/DatasmithSketchUpRubyExporter/Private/DatasmithSketchUpComponent.cpp`

### 元数据

Datasmith携带可用于存储实体上的BIM信息（或其他自定义数据）的键/值对。

![转译到虚幻引擎中的3ds Max元数据](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da4e00ff-5112-4ab6-aaa1-1818694e1bde/3dsmax-metadata-into-ue.png)

转译到虚幻引擎（右）中的3ds Max元数据（左）。

#### 限制

-   键/值对只能携带字符串。这意味着浮点、单位等将需要包含（"烘焙"）到字符串中（例如，"10 mm"）。
    
-   不支持层级属性，因此你需要使用下划线（\_）分隔符展平层级。请参考下面的Revit示例，其中通过连接文本字符串来处理 **元素（Element）** 和 **类型（Type）** 属性，以保持内容的分组状态。
    

![使用来自Revit的元数据的模拟展平层级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d732408-d92d-4081-8bd7-97876946a99d/simulated-flattened-hierarchy-revit.png)

使用来自Revit的元数据的模拟展平层级。

#### 有用的API调用

-   [IDatasmithMetaDataElement](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithMetaDataElement)
    
-   [IDatasmithMetaDataElement::SetAssociatedElement](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithMetaDataElement/SetAssociatedElement)
    
-   [FDatasmithSceneFactory::CreateKeyValueProperty](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/FDatasmithSceneFactory/CreateKeyValueProperty)
    

#### 代码示例

如需查看实现方案示例，请参考虚幻引擎仓库中的以下文件：

`/Engine/Source/Programs/Enterprise/Datasmith/DatasmithMaxExporter/Private/DatasmithMaxSceneExporter.cpp`

### 摄像机Actor

Datasmith可以在虚幻引擎中创建摄像机，但根据具体用例，你不一定希望从3D应用程序中导出摄像机。有时，用户会显式地设置摄像机（例如，3ds Max物理摄像机）。在其他时候，摄像机派生自其他应用程序概念（例如，Revit中的视图或SketchUp中的书签）。

在虚幻引擎摄像机方面需要考虑的一个要素是，它们具有基于物理的特性，你需要在导出时设置这些特性，如：

-   传感器宽度
    
-   长宽比
    
-   曝光数值
    
-   白点
    
-   景深等等。
    

下面是一个使用标签和特性在 `.udatasmith` 文件中实现摄像机的示例。

```cpp

    <Camera name="1856" label="PhysCamera001" layer="0">
		    <LookAt Actor="1857"/>
		    <Transform tx="706.201538" ty="468.560883" tz="0.0" sx="1.0" sy="1.0" sz="1.0" qx="0.0"     qy="0.0" qz="-0.758784" qw="0.651344" qhex="0000000000000000A33F42BF79BE263F"/>
		    <SensorWidth value="36.0"/>
		    <SensorAspectRatio value="1.333333"/>
		    <DepthOfField enabled="0"/>
		    <FocusDistance value="850.27594"/>
		    <FStop value="8.0"/>
		    <FocalLength value="40.0"/>
		    <LookAtRollAllowed enabled="0"/>
		    <Post>
			    <CameraISO value="5999.997559"/>
			    <ShutterSpeed value="59.999973"/>
			    <FStop value="8.0"/>
		    </Post>
		    <tag value="Max.superclassof: camera" />
		    <tag value="Max.classof: Physical" />
		    <tag value="Max.handle: 1856" />
		    <tag value="Max.isGroupHead: false" />
		    <tag value="Max.isGroupMember: false" />
		    <tag value="Max.parent.handle: 0" />
		    <tag value="Max.Target.handle: 1857" />
    </Camera>

```

![虚幻引擎CineCameraActor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12a09b7c-83f5-43c8-bd10-5476b10ea433/cinecamera-actor-ue.png)

虚幻引擎CineCameraActor。

#### 准则

景深、曝光和其他由后期处理设置定义的摄影效果也是可选效果。这些效果要求源应用程序中的照明和摄像机之间关系密切，而这在你自己的Datasmith导出上下文中可能并未定义。

#### 限制

-   虚幻引擎摄像机不支持倾斜摄像机（2点视角）。例如，Revit可以有将移动摄像机视角的"裁剪"视图，但Datasmith（乃至虚幻引擎）不支持这种类型的摄像机变换。

#### 有用的API调用

-   [IDatasmithActorElement](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithActorElement)
    
-   [IDatasmithCameraActorElement](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithCameraActorElement)
    
-   [IDatasmithCameraActorElement::SetPostProcess](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithCameraActorElement/SetPostProcess)
    
-   [IDatasmithPostProcessElement](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithPostProcessElement)
    

#### 代码示例

如需查看实现方案示例，请参考虚幻引擎仓库中的以下文件：

-   `/Engine/Source/Programs/Enterprise/Datasmith/DatasmithMaxExporter/Private/DatasmithMaxCameraExporter.cpp`
    
-   `/Engine/Source/Programs/Enterprise/Datasmith/DatasmithSketchUpRubyExporter/Private/DatasmithSketchUpCamera.cpp`
    

### 纹理资产

在虚幻引擎中，纹理不仅仅表示颜色信息。为了得到取样并正确影响照明和着色，你必须指定纹理的预期用途（texturemode）。可能的用途包括：

-   漫反射
    
-   高光度
    
-   法线
    
-   NormalGreenInv
    
-   置换
    
-   其他
    
-   凹凸图
    
-   Ies
    

我们还需要指定它的颜色空间（通常是Gamma校正或sRGB），因为这会直接影响光源如何处理材质（sRGB和RGB曲线）。

下面是一个在 `.udatasmith` 文件中实现纹理资产的示例：

```cpp

    <Texture name="sitework_planting_gravel_mixed_0" texturemode="0" texturefilter="3" textureaddressx="0" textureaddressy="0" rgbcurve="-1.000000" srgb="0" file="rac_advanced_sample_project-3DView-{3D}_Assets/sitework.planting.gravel.mixed.png">

		    <Hash value="b10e41741cfee286a5fcf3b288de78f5"/>

    </Texture>

```

#### 准则

-   你必须根据纹理的预期用途正确设置颜色空间（Gamma/sRGB）：
    
    -   sRGB颜色空间通常用于反射率纹理。
        
    -   线性颜色空间通常用于法线图、高度图或凹凸图。
        
-   纹理的名称（不是文件名）必须[经过清理](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/FDatasmithUtils/SanitizeName)（即，不得包含无效字符）。
    
-   你必须将纹理与其余资产放入同一文件夹。
    
    ![纹理应导出到与其他资产相同的文件夹中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e785e143-c183-484b-b968-674d7db39e09/textures-in-same-folder.png)
    
    纹理应导出到与其他资产相同的文件夹中。
    

#### 应避免的情况

-   不要使用绝对路径。
    
-   不要将纹理放入与其余资产不同的文件夹。
    
-   导出时，你不需要变换纹理。Datasmith导入器将处理变换。
    
    -   不需要使用DatasmithCore API将纹理转换为.uasset文件。
        
    -   不需要重新设置纹理格式、调整纹理大小或将纹理转换为不同的格式。
        

![纹理文件放置不正确](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/952716f4-6b12-49d9-adcd-c3a9b2564609/incorrect-texture-placement.png)

此图像显示的是 错误 使用 \`\`.uasset\` 文件表示纹理。

#### 有用的API调用

-   [IDatasmithTextureElement](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithTextureElement)
    
-   [EDatasmithTextureFilter](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/EDatasmithTextureFilter)
    
-   [EDatasmithTextureMode](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/EDatasmithTextureMode)
    
-   [IDatasmithTextureElement::SetRGBCurve](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithTextureElement/SetRGBCurve)
    
-   [FDatasmithUtils::SanitizeName](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/FDatasmithUtils/SanitizeName)
    

#### 代码示例

如需查看实现方案示例，请参考虚幻引擎仓库中的以下文件：

`/Engine/Source/Programs/Enterprise/Datasmith/DatasmithSketchUpRubyExporter/Private/DatasmithSketchUpMaterial.cpp`

### 材质

#### 简单PBR导出

以下示例演示了如何将纹理导出到Datasmith文件，以创建包含反射率图和高度图的基本PBR材质。

##### Rhino中的原始材质

此示例使用了Rhino中的以下材质：

![Rhino中的一种材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b87894f-7051-4042-83db-727722572fdf/rhino-material.png)

该材质的设置如下：

![Albedo map](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0cffb11-48ed-4ce7-b1d3-fb62c18033e1/rhino-material-albedo-map.png)

![Height map](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/30559670-77cf-41d2-9e60-f3ae52ceb070/rhino-material-height-map.png)

反射率图

高度图

##### 生成的Datasmith文件

生成的Datasmith文件将如下所示：

```cpp

    <Texture name="c02622dee4b6e6e08265ed1a8ed947e3" label="ColorChecker_sRGB_from_Lab_D50" **texturemode="0"** texturefilter="3" textureaddressx="0" textureaddressy="0" rgbcurve="1.000000" **srgb="1"** file="rhino_diffuse_and_bump_Assets/ColorChecker_sRGB_from_Lab_D50.bmp">
		    <Hash value="2eac7dc7c873963f39791a4c7e9a6f74"/>
    </Texture>
    <Texture name="82c22916309f2f098d35b2856b2caf5c" label="Heightmap_normal" **texturemode="6"** texturefilter="3" textureaddressx="0" textureaddressy="0" rgbcurve="1.000000" **srgb="0"** file="rhino_diffuse_and_bump_Assets/Heightmap.png">
		    <Hash value="cafca7197e3f5a46480b09f329f9eabd"/>
    </Texture>

    <UEPbrMaterial name="90589c47f06eb971d548591f23c285af" label="Custom">
    		<Expressions>
			    <Texture Name="Diffuse_Map" PathName="c02622dee4b6e6e08265ed1a8ed947e3">
			    </Texture>
			    <Texture Name="Bump_Map" PathName="82c22916309f2f098d35b2856b2caf5c">
			    </Texture>
		    </Expressions>
		    <Input Name="BaseColor" expression="0" OutputIndex="0"/>
		    <Input Name="Normal" expression="1" OutputIndex="0"/>
		    <OpacityMaskClipValue value="0.3333"/>
    </UEPbrMaterial>

```

可以注意到，上面的两个纹理的 `texturemode` 和 `srgb` 具有不同的数值：

-   第一个纹理： `texturemode="0"` ， \`srgb="1"
-   第二个纹理： `texturemode="6"` ， \`srgb="0"

##### 已导入到虚幻编辑器

在虚幻引擎中，已导入材质的PBR图的外观如下所示：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/196a0b55-cd15-494b-9e61-8665e9f9fe86/ue-material-pbr-graph.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/196a0b55-cd15-494b-9e61-8665e9f9fe86/ue-material-pbr-graph.png)

点击查看大图。

请注意，反射率图设置为 `SRGB=1` ，取样器类型设置为 `Color` 。 这是由Datasmith导入器自动设置的，并且是将导出的反射率图进行以下设置的结果：

`texturemode="0" srgb="1"`

高度图在Rhino中为灰度图，它已经被Datasmith导入器转换为法线图，这是对纹理进行以下设置的结果：

`texturemode="6" srgb="0"`

##### 有用的API调用

-   [IDatasmithUEPbrMaterialElement](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithUEPbrMaterialElement)
-   [IDatasmithTextureElement](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/IDatasmithTextureElement):
    
    -   SetSRGB - [EDatasmithColorSpace](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/EDatasmithColorSpace)
        
    -   SetTextureMode - [EDatasmithTextureMode](/documentation/en-us/unreal-engine/API/Runtime/DatasmithCore/EDatasmithTextureMode)
        

-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [本指南的目标受众](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E6%9C%AC%E6%8C%87%E5%8D%97%E7%9A%84%E7%9B%AE%E6%A0%87%E5%8F%97%E4%BC%97)
-   [你将学习的内容](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E4%BD%A0%E5%B0%86%E5%AD%A6%E4%B9%A0%E7%9A%84%E5%86%85%E5%AE%B9)
-   [下载包及先决条件](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E4%B8%8B%E8%BD%BD%E5%8C%85%E5%8F%8A%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [下载虚幻引擎和Datasmith SDK](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E4%B8%8B%E8%BD%BD%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E5%92%8Cdatasmithsdk)
-   [了解Datasmith](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E4%BA%86%E8%A7%A3datasmith)
-   [虚幻引擎数据模型](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E6%95%B0%E6%8D%AE%E6%A8%A1%E5%9E%8B)
-   [Datasmith设计原则](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#datasmith%E8%AE%BE%E8%AE%A1%E5%8E%9F%E5%88%99)
-   [Datasmith插件类型](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#datasmith%E6%8F%92%E4%BB%B6%E7%B1%BB%E5%9E%8B)
-   [导出和导入逻辑](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%AF%BC%E5%87%BA%E5%92%8C%E5%AF%BC%E5%85%A5%E9%80%BB%E8%BE%91)
-   [在源发生变化后重新导入数据](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%9C%A8%E6%BA%90%E5%8F%91%E7%94%9F%E5%8F%98%E5%8C%96%E5%90%8E%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5%E6%95%B0%E6%8D%AE)
-   [环境和照明](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E7%8E%AF%E5%A2%83%E5%92%8C%E7%85%A7%E6%98%8E)
-   [Datasmith导出器UX准则](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#datasmith%E5%AF%BC%E5%87%BA%E5%99%A8ux%E5%87%86%E5%88%99)
-   [导出器UI](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%AF%BC%E5%87%BA%E5%99%A8ui)
-   [准则](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%87%86%E5%88%99)
-   [应避免的情况](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%BA%94%E9%81%BF%E5%85%8D%E7%9A%84%E6%83%85%E5%86%B5)
-   [进度信息和错误消息](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E8%BF%9B%E5%BA%A6%E4%BF%A1%E6%81%AF%E5%92%8C%E9%94%99%E8%AF%AF%E6%B6%88%E6%81%AF)
-   [准则](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%87%86%E5%88%99-2)
-   [实用项](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%AE%9E%E7%94%A8%E9%A1%B9)
-   [应避免的情况](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%BA%94%E9%81%BF%E5%85%8D%E7%9A%84%E6%83%85%E5%86%B5-2)
-   [有用的API调用](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E6%9C%89%E7%94%A8%E7%9A%84api%E8%B0%83%E7%94%A8)
-   [代码示例](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B)
-   [导出的文件和文件夹结构](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%AF%BC%E5%87%BA%E7%9A%84%E6%96%87%E4%BB%B6%E5%92%8C%E6%96%87%E4%BB%B6%E5%A4%B9%E7%BB%93%E6%9E%84)
-   [必备项](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%BF%85%E5%A4%87%E9%A1%B9)
-   [应避免的情况](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%BA%94%E9%81%BF%E5%85%8D%E7%9A%84%E6%83%85%E5%86%B5-3)
-   [Datasmith文件的头文件](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#datasmith%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%B4%E6%96%87%E4%BB%B6)
-   [必备项](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%BF%85%E5%A4%87%E9%A1%B9-2)
-   [有用的API调用](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E6%9C%89%E7%94%A8%E7%9A%84api%E8%B0%83%E7%94%A8-2)
-   [代码示例](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B-2)
-   [静态网格体资产](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E8%B5%84%E4%BA%A7)
-   [必备项](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%BF%85%E5%A4%87%E9%A1%B9-3)
-   [实用项](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%AE%9E%E7%94%A8%E9%A1%B9-2)
-   [应避免的情况](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%BA%94%E9%81%BF%E5%85%8D%E7%9A%84%E6%83%85%E5%86%B5-4)
-   [有用的API调用](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E6%9C%89%E7%94%A8%E7%9A%84api%E8%B0%83%E7%94%A8-3)
-   [代码示例](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B-3)
-   [静态网格体Actor](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93actor)
-   [必备项](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%BF%85%E5%A4%87%E9%A1%B9-4)
-   [实用项](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%AE%9E%E7%94%A8%E9%A1%B9-3)
-   [有用的API调用](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E6%9C%89%E7%94%A8%E7%9A%84api%E8%B0%83%E7%94%A8-4)
-   [代码示例](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B-4)
-   [空Actor](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E7%A9%BAactor)
-   [准则](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%87%86%E5%88%99-3)
-   [示例](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E7%A4%BA%E4%BE%8B)
-   [有用的API调用](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E6%9C%89%E7%94%A8%E7%9A%84api%E8%B0%83%E7%94%A8-5)
-   [代码示例](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B-5)
-   [Actor层级](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#actor%E5%B1%82%E7%BA%A7)
-   [准则](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%87%86%E5%88%99-4)
-   [应避免的情况](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%BA%94%E9%81%BF%E5%85%8D%E7%9A%84%E6%83%85%E5%86%B5-5)
-   [有用的API调用](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E6%9C%89%E7%94%A8%E7%9A%84api%E8%B0%83%E7%94%A8-6)
-   [代码示例](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B-6)
-   [作为组件的Actor](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E4%BD%9C%E4%B8%BA%E7%BB%84%E4%BB%B6%E7%9A%84actor)
-   [准则](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%87%86%E5%88%99-5)
-   [有用的API调用](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E6%9C%89%E7%94%A8%E7%9A%84api%E8%B0%83%E7%94%A8-7)
-   [代码示例](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B-7)
-   [Actor层](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#actor%E5%B1%82)
-   [准则](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%87%86%E5%88%99-6)
-   [限制](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E9%99%90%E5%88%B6)
-   [有用的API调用](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E6%9C%89%E7%94%A8%E7%9A%84api%E8%B0%83%E7%94%A8-8)
-   [代码示例](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B-8)
-   [Actor标签](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#actor%E6%A0%87%E7%AD%BE)
-   [准则](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%87%86%E5%88%99-7)
-   [有用的API调用](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E6%9C%89%E7%94%A8%E7%9A%84api%E8%B0%83%E7%94%A8-9)
-   [代码示例](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B-9)
-   [元数据](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%85%83%E6%95%B0%E6%8D%AE)
-   [限制](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E9%99%90%E5%88%B6-2)
-   [有用的API调用](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E6%9C%89%E7%94%A8%E7%9A%84api%E8%B0%83%E7%94%A8-10)
-   [代码示例](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B-10)
-   [摄像机Actor](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E6%91%84%E5%83%8F%E6%9C%BAactor)
-   [准则](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%87%86%E5%88%99-8)
-   [限制](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E9%99%90%E5%88%B6-3)
-   [有用的API调用](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E6%9C%89%E7%94%A8%E7%9A%84api%E8%B0%83%E7%94%A8-11)
-   [代码示例](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B-11)
-   [纹理资产](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E7%BA%B9%E7%90%86%E8%B5%84%E4%BA%A7)
-   [准则](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%87%86%E5%88%99-9)
-   [应避免的情况](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%BA%94%E9%81%BF%E5%85%8D%E7%9A%84%E6%83%85%E5%86%B5-6)
-   [有用的API调用](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E6%9C%89%E7%94%A8%E7%9A%84api%E8%B0%83%E7%94%A8-12)
-   [代码示例](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B-12)
-   [材质](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E6%9D%90%E8%B4%A8)
-   [简单PBR导出](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E7%AE%80%E5%8D%95pbr%E5%AF%BC%E5%87%BA)
-   [Rhino中的原始材质](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#rhino%E4%B8%AD%E7%9A%84%E5%8E%9F%E5%A7%8B%E6%9D%90%E8%B4%A8)
-   [生成的Datasmith文件](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E7%94%9F%E6%88%90%E7%9A%84datasmith%E6%96%87%E4%BB%B6)
-   [已导入到虚幻编辑器](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E5%B7%B2%E5%AF%BC%E5%85%A5%E5%88%B0%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8)
-   [有用的API调用](/documentation/zh-cn/unreal-engine/datasmith-export-sdk-guidelines#%E6%9C%89%E7%94%A8%E7%9A%84api%E8%B0%83%E7%94%A8-13)
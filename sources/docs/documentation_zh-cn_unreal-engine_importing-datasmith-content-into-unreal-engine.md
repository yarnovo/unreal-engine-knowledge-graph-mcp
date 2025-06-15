# 将Datasmith内容导入到虚幻引擎中 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/importing-datasmith-content-into-unreal-engine
> 
> 生成时间: 2025-06-14T19:04:43.719Z

---

目录

![将Datasmith内容导入到虚幻引擎中](https://dev.epicgames.com/community/api/documentation/image/ff5382c5-b74d-45cb-a59e-b1c20c3b49ec?resizing_type=fill&width=1920&height=335)

本页将介绍如何使用Datasmith将内容从支持的3D设计应用程序或文件格式导入到虚幻引擎中。

## 先决条件

在用Datasmith导入内容之前，必须启用某些虚幻引擎插件或安装其他软件。

### Datasmith插件

要使用Datasmith将内容导入到虚幻引擎中，你的项目必须已启用 **Datasmith导入器（Datasmith Importer）** 。如果你不启用该插件，在虚幻引擎中就看不到Datasmith导入选项。某些受支持的文件格式需要其他插件。

-   有关支持的应用程序、文件格式和插件要求的列表，请参阅[Datasmith支持的软件和文件类型](/documentation/zh-cn/unreal-engine/datasmith-supported-software-and-file-types)。
-   要了解如何在虚幻引擎中启用插件，参阅[自定义虚幻引擎](/documentation/zh-cn/unreal-engine/customizing-unreal-engine)。

若从 **建筑（Architecture）** 或 **汽车（Automotive）、产品设计（Product Design）和制造（Manufacturing）** 类别中的一个模板启动了项目，部分或全部Datasmith插件会默认启用。

### 其他软件

要导入某些支持的文件格式，你必须安装其他软件。以下文件格式有特定的软件要求：

文件格式

要求

`.wire`

安装与 `.wire` 文件兼容的Autodesk Alias AutoStudio版本。

## 将Datasmith内容导入到虚幻引擎中

1.  在虚幻引擎编辑器中，打开你要向其导入Datasmith内容的项目。
    
2.  若要将内容导入项目的现有关卡中，立即打开该关卡。否则，创建新关卡，或使用默认关卡。
    
3.  在主工具栏中，打开"创建（Create）"菜单并选择 **Datasmith > 文件导入（File Import）** 。界面上将打开文件导入对话框。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f14ac41-044d-4689-99c7-e19797add462/datasmith-import-menu.png "The Datasmith import option in the Create menu")
4.  选择你要导入的文件，并点击 **打开（Open）** 。将打开文件对话框。
    

1.在项目中选择一个位置来存储所导入的内容，然后点击 **确定（OK）** 。界面上将打开 **Datasmith导入选项（Datasmith Import Options）** 对话框。

若要为Datasmith内容创建新的顶级文件夹，请右键点击文件对话框中的空白区域。要创建现有文件夹的子文件夹，请右键点击该文件夹。

1.在 **Datasmith导入选项（Datasmith Import Options）** 对话框中，选择你要从源文件中导入的内容类型，并按需设置其他导入选项。

![设置导入选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41ae6dfc-eaef-401c-b6da-fa9aa7b5daa3/unrealdsimportoptions-1.png "设置导入选项")

对于不同的文件类型， **Datasmith导入选项（Datasmith Import Options）** 对话框将显示不同的导入选项。有关导入选项的更多信息，参阅[Datasmith导入选项](/documentation/zh-cn/unreal-engine/datasmith-import-options-in-unreal-engine)。

1.  完成导入选项设置后，点击 **导入（Import）** 。Datasmith会进行以下操作：
    
    -   读取导入的文件。
    -   在你的项目中创建新资产。
    -   将Datasmith Scene场景置于当前关卡中。
    
    有关导入流程的更多信息，参阅[Datasmith概述](/documentation/zh-cn/unreal-engine/datasmith-plugins-overview)。
    

## 自定义导入流程

你可以通过以下方式自定义Datasmith导入流程：

-   使用蓝图视觉效果脚本或Python脚本自动化导入。如需了解详情，请参阅[自定义Datasmith导入流程](/documentation/zh-cn/unreal-engine/customizing-the-datasmith-import-process-in-unreal-engine)。
-   使用Dataprep在导入时对数据执行其他操作。你可以保存并复用Dataprep导入方案，以便创建定制化的资产导入流程。如需了解详情，请参阅[Dataprep导入自定义](/documentation/zh-cn/unreal-engine/dataprep-import-customization-in-unreal-engine)。

-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/importing-datasmith-content-into-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [Datasmith插件](/documentation/zh-cn/unreal-engine/importing-datasmith-content-into-unreal-engine#datasmith%E6%8F%92%E4%BB%B6)
-   [其他软件](/documentation/zh-cn/unreal-engine/importing-datasmith-content-into-unreal-engine#%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6)
-   [将Datasmith内容导入到虚幻引擎中](/documentation/zh-cn/unreal-engine/importing-datasmith-content-into-unreal-engine#%E5%B0%86datasmith%E5%86%85%E5%AE%B9%E5%AF%BC%E5%85%A5%E5%88%B0%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%B8%AD)
-   [自定义导入流程](/documentation/zh-cn/unreal-engine/importing-datasmith-content-into-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AF%BC%E5%85%A5%E6%B5%81%E7%A8%8B)

相关文档

[

Datasmith导入选项

![Datasmith导入选项](https://dev.epicgames.com/community/api/documentation/image/9b1d211a-7f35-42c5-8d17-808252532037?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/datasmith-import-options-in-unreal-engine)

[

自定义Datasmith导入流程

![自定义Datasmith导入流程](https://dev.epicgames.com/community/api/documentation/image/83e43619-41e2-4d8f-9197-8678f3f28aeb?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/customizing-the-datasmith-import-process-in-unreal-engine)

[

Dataprep导入自定义

![Dataprep导入自定义](https://dev.epicgames.com/community/api/documentation/image/7a23c71a-a9fc-4ebb-8920-1879af58ab16?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/dataprep-import-customization-in-unreal-engine)
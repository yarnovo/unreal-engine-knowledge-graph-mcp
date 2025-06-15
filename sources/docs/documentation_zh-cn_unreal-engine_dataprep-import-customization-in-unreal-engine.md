# 虚幻引擎中的Dataprep导入自定义 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dataprep-import-customization-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:04:43.992Z

---

目录

![Dataprep导入自定义](https://dev.epicgames.com/community/api/documentation/image/3a91d81f-4b4b-4867-bc5c-8e4ba8736ac7?resizing_type=fill&width=1920&height=335)

Datasmith将场景导入虚幻引擎时，会尽量保留源应用程序中创建的几何体、材质和场景层级。但若为了实时渲染之外的用途而在专用应用程序中构建3D模型，则场景在导入虚幻这类实时渲染引擎时就可能会出现各种问题。例如，当你在Rhino中创建的模型主要用于制作或挤压物理部件时，或者在Revit或IFC应用中创建的场景主要用于记录建筑工程时，或者在Cinema 4D中使用程序化生成的元素创建场景时，你就可能遇到这种情况。

你大可导入原始场景数据，然后在导入之后利用虚幻编辑器提供的工具调整资源和Actor。但此法有一些限制。例如，若要重新导入场景以找出源应用程序中所做的更改，或以相同设置重新导入不同场景时，可能需要重复这些步骤。

Visual Dataprep系统能够创建可重复使用的导入"方式"，从而可在虚幻引擎项目中创建最终资源和Actor之前，整理、清理、合并和修改场景元素。方式只需创建一次，以后每次导入场景都可重复使用。即便是导入不同的源文件，也可以重复使用同一种方式，甚至可以跨不同项目重复使用。从而可按照需要有效地创建自己的标准化资源导入方式集。

利用Visual Dataprep系统，即可将此类一般数据制备任务构建到导入流程中：

-   将源场景中使用的材质替换为专为实时可视化制作的高质量材质。
-   识别并清除场景中不必要的几何体。
-   合并几何体，减少场景中单独对象的数量。
-   创建细节层级，更高效地渲染复杂几何体。
-   为需要碰撞网格体以提供运行时体验的对象（例如地板和墙壁）创建碰撞。

开始使用Visual Dataprep时，你会发现可以使用其他一些操作制作可重复使用的dataprep方式，用于实时场景。

## 入门

[

![Dataprep概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6fb4bc3-62d6-4002-bd24-c32bac3588ff/topic-image.png)

Dataprep概述

介绍Dataprep系统的原理及其使用方法。





](/documentation/zh-cn/unreal-engine/dataprep-overview-in-unreal-engine)

## 教程

[

![使用Dataprep实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33c88d32-dfdc-4811-9634-5b5aae97b9f4/topic-image.png)

使用Dataprep实例

介绍如何创建父类Dataprep预案，并将有限的自定义参数公开给Dataprep实例。





](/documentation/zh-cn/unreal-engine/working-with-dataprep-instances-in-unreal-engine)[

![创建自定义Dataprep块](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91e7f43f-9bf8-4568-8252-e09796dc9265/5-0-custom-dataprep-blocks-topic-image.png)

创建自定义Dataprep块

如何在蓝图中为Dataprep系统创建自定义过滤器和操作。





](/documentation/zh-cn/unreal-engine/creating-custom-dataprep-blocks-in-unreal-engine)

## 参考

[

![Dataprep选择参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50c88258-f506-41f0-9cd3-57ef05d2c633/topic-image.png)

Dataprep选择参考

详细介绍Dataprep中过滤和选择场景元素的方法。





](/documentation/zh-cn/unreal-engine/dataprep-selection-reference-in-unreal-engine)[

![Visual Dataprep操作参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a04c4181-e998-4a24-bf7e-a7e4e4e55461/topic-image.png)

Visual Dataprep操作参考

介绍如何对Visual Dataprep系统中的选定场景元素执行各种操作。





](/documentation/zh-cn/unreal-engine/dataprep-operation-reference-in-unreal-engine)[

![Dataprep选项变换参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9291c4a-4812-4393-a65d-fec1118bae2f/topic-image.png)

Dataprep选项变换参考

详细介绍如何在Dataprep系统中对需要修改的对象进行变换。





](/documentation/zh-cn/unreal-engine/dataprep-selection-transform-reference-in-unreal-engine)

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [manufacturing](https://dev.epicgames.com/community/search?query=manufacturing)
-   [dataprep](https://dev.epicgames.com/community/search?query=dataprep)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [入门](/documentation/zh-cn/unreal-engine/dataprep-import-customization-in-unreal-engine#%E5%85%A5%E9%97%A8)
-   [教程](/documentation/zh-cn/unreal-engine/dataprep-import-customization-in-unreal-engine#%E6%95%99%E7%A8%8B)
-   [参考](/documentation/zh-cn/unreal-engine/dataprep-import-customization-in-unreal-engine#%E5%8F%82%E8%80%83)
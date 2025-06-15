# 虚幻引擎中的枢轴点绘制器工具1.0 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/pivot-painter-tool-1.0-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:21:26.877Z

---

目录

![枢轴点绘制器工具1.0](https://dev.epicgames.com/community/api/documentation/image/cd89fbad-cfb3-4132-8980-97320ef21a79?resizing_type=fill&width=1920&height=335)

最新版的[枢轴点绘制器工具](/documentation/zh-cn/unreal-engine/pivot-painter-tool-2.0-in-unreal-engine)可以在此处找到。2.0版提供简化的管道来创建交互式植被。

**枢轴点绘制器工具（Pivot Painter Tool）** 是一种MAXScript，可将模型枢轴点和旋转信息存储在模型的顶点数据中。这些信息随后即可在虚幻引擎的着色器系统内引用，以创建交互效果。

示例视频中显示的动作使用顶点着色器实时生成。每棵草都围绕根部旋转和弯曲。树的树枝和叶子形成一个层次结构，围绕着它们各自的枢轴点生成动画，同时继承父项的动作。子对象的旋转同样会被存储，这样将确保对风力作出逼真的动态反应。

添加枢轴点绘制器的材质函数后，创建这些着色器变得愈加简单。示例内容通过展示如何生成诸如以上所示的动画，也大有帮助。现在，检索子对象枢轴点已经十分简单，只需在3ds Max中使用枢轴点绘制器脚本处理网格体，导入文件，然后使用可用的枢轴点绘制器函数创建材质。材质函数包含双级层级和单级层级的枢轴点。

以这种方式创建动作有其优势。使用此技术处理的模型在内存方面仅比标准静态网格体大18%。其动画比骨架动画便宜得多，因为前者是动态计算的，而且不需要存储。顶点着色器指令计数通常比像素指令计数对性能的影响更小，这是因为与模型上顶点的数量少于屏幕上像素的数量。

在可实现功能方面，以下链接中的示例着色器只是冰山一角。对可用信息进行实验可能会吸引用户探索其他可能的用途。如果给予访问子对象级别信息，玩家互动、有趣的风源、非植被相关动作和其他效果都是可能的。

## 安装

您可以在以下位置找到 **枢轴点绘制器（Pivot Painter）** 脚本。

```cpp
	[UERootDirectory]/Engine/Extras/3dsMaxScripts/PivotPainter.ms

```

此视频介绍如何安装脚本，以及如何创建键盘快捷方式和菜单来打开枢轴点绘制器工具。

## 准备工具

此视频将介绍脚本的"准备工具（Prep Tools）"部分，以及有关整个过程的工作流程提示和信息。准备工具（Prep Tools）部分包含将模型元素作为单独的对象分离的选项，以及一些有助于轻松创建新枢轴点的工具。

**准备工具（Prep Tools）** 用于将给定的模型元素分离成一系列的新模型，并将它们的枢轴点移至理想的位置。这些工具并非必须使用。提供它们只是为了带来便利。如果正在处理的模型已经分离，它的枢轴点位于它应该旋转的点，且模型X轴向下面对模型的长度，则模型适合进入下一步。

**示例：**一茬草应该分离成单独的一棵棵草。一棵给定的草在被风吹动时应围绕根部旋转。因此，它的枢轴点应位于草模型的根部，枢轴点的X轴应该向下指向模型的长度，在大多数情况下草是向上的。

## 层次绘制器

此视频介绍脚本的"层次绘制器（Hierarchy Painter）"部分。该工具的这一部分用于存储父子关系（例如树枝与叶片之间的关系），以及网格体中的模型枢轴点和旋转信息。

如果模型需要层级，应仅使用脚本的"层级绘制器（Hierarchy Painter）"部分来处理模型。有叶子的树是一个很好的用例，但草则不然。应使用"按对象绘制器（Per Object Painter）"部分来绘制草。

此外，分支/父项枢轴点需要定位在"父枢轴点最大距离（Max dist for parent piv）"规定的框内。例如：如果在绘制模型时"父枢轴点最大距离"设置为4096，则分支/父项对象枢轴点可以位于X轴、Y轴正负2048之内以及Z轴0至4096之内的任何位置。此外，如果在模型处理期间"父枢轴点最大距离"设置为4096以外的任何值，则在虚幻引擎的模型着色器中也应使用相同的数值。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/619fdbfe-3a2c-4284-ba05-69e79171e1c7/pivotpainter_hierarchydata.png)

## 按对象绘制器（Per Object Painter）

此视频介绍了脚本的"按对象绘制器"部分的选项。此部分还讨论了一些可能的用途，以及关于如何在模型上存储数据的一些信息。

## 3ds Max示例文件

该文件包含视频教程中使用的树的副本。

-   [https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/d962af8b-f55c-4191-9e0d-04b2d9939f4e/tree.max](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/d962af8b-f55c-4191-9e0d-04b2d9939f4e/tree.max)（**单击右键**，然后选择 **另存为** 以下载）

## 要求

-   3ds Max - 脚本已经使用3ds Max 2010和2012版本进行了测试。
-   枢轴点绘制器的材质函数。可以使用脚本而不使用函数，但这些函数可以使数据更容易使用。

## 其他注意事项

您应只使用脚本的"层级绘制器（Hierarchy Painter）"或"按对象绘制器（Per Object Painter）"部分来处理模型，而不能同时使用这两个部分。如果您使用了"层次绘制器"来绘制模型，则在对象材质中应使用"PivotPainter HierarchyData"。如果您使用了脚本的"按对象绘制器"部分，则应使用"PivotPainter\_PerObjectData"来解码枢轴点信息。

如果已绘制且在导出时未进行缩放/更改，3ds Max的场景单位应设置为厘米。必须在3DS Max与虚幻引擎之间保持比例不变。否则会产生不良后果。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [artist tool](https://dev.epicgames.com/community/search?query=artist%20tool)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [安装](/documentation/zh-cn/unreal-engine/pivot-painter-tool-1.0-in-unreal-engine#%E5%AE%89%E8%A3%85)
-   [准备工具](/documentation/zh-cn/unreal-engine/pivot-painter-tool-1.0-in-unreal-engine#%E5%87%86%E5%A4%87%E5%B7%A5%E5%85%B7)
-   [层次绘制器](/documentation/zh-cn/unreal-engine/pivot-painter-tool-1.0-in-unreal-engine#%E5%B1%82%E6%AC%A1%E7%BB%98%E5%88%B6%E5%99%A8)
-   [按对象绘制器（Per Object Painter）](/documentation/zh-cn/unreal-engine/pivot-painter-tool-1.0-in-unreal-engine#%E6%8C%89%E5%AF%B9%E8%B1%A1%E7%BB%98%E5%88%B6%E5%99%A8%EF%BC%88perobjectpainter%EF%BC%89)
-   [3ds Max示例文件](/documentation/zh-cn/unreal-engine/pivot-painter-tool-1.0-in-unreal-engine#3dsmax%E7%A4%BA%E4%BE%8B%E6%96%87%E4%BB%B6)
-   [要求](/documentation/zh-cn/unreal-engine/pivot-painter-tool-1.0-in-unreal-engine#%E8%A6%81%E6%B1%82)
-   [其他注意事项](/documentation/zh-cn/unreal-engine/pivot-painter-tool-1.0-in-unreal-engine#%E5%85%B6%E4%BB%96%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
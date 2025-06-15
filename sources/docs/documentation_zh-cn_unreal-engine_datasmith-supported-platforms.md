# Datasmith支持的平台 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/datasmith-supported-platforms
> 
> 生成时间: 2025-06-14T19:06:34.592Z

---

目录

![Datasmith支持的平台](https://dev.epicgames.com/community/api/documentation/image/e2c13ffa-1cfb-4463-b597-20fa93e51fbc?resizing_type=fill&width=1920&height=335)

本页面介绍当你通过Epic Games启动程序下载虚幻引擎时，以及当你根据其源代码分发自行编译该引擎时，Datasmith的哪些功能可在哪些不同的平台上使用。

## 平台支持的文件格式

不同的Datasmith导入器内部使用的一些组件仅在选定的虚幻引擎平台上工作。

源格式

64位Windows

Mac OS X

Linux

**.udatasmith文件**

%支持%

%支持%

%支持%

**CAD文件格式**

%支持%

%支持%

%支持%

**Alias .wire**

%支持%

%不支持%

%不支持%

**Rhino**

%支持%

%不支持%

%不支持%

**Cinema 4D**

%支持%

%支持%

%不支持%

**AxF**

%支持%

%不支持%

%不支持%

**MDL**

%支持%

%支持%

%支持%

**IFC**

%支持%

%不支持%

%支持%

**Deltagen和VRED**

%支持%

%支持%

%支持%

## 根据源代码重新编译虚幻引擎

Datasmith导入器内部使用的一些组件不能作为虚幻引擎源代码的一部分进行再分发。因此，你无法借助对这些组件所提供功能的支持自行重新编译虚幻引擎。

当你根据虚幻引擎的源代码分发自行对其进行重新编译时，Datasmith导入插件支持以下格式：

源格式

可否重新编译？

**.udatasmith文件**

%支持%

**CAD文件格式**

%不支持%

**Alias .wire**

%不支持%

**Rhino**

%不支持%

**Cinema 4D**

%不支持%

**AxF**

%不支持%

**MDL**

%不支持%

**IFC**

%不支持%

**Deltagen和VRED**

%支持%

如果你从第三方下载并安装所需的软件开发工具包，则可以使用上面列出的一些不受支持的功能编译虚幻引擎。

UE现在默认支持gITF。

## Datasmith导出插件

[Datasmith导出插件](https://www.unrealengine.com/zh-CN/datasmith)下载页面上Datasmith导出插件的预编译版本支持以下平台：

源应用程序

64位Windows

Mac OS X

**SketchUp Pro**

%支持%

%支持%

**3ds Max**

%支持%

不适用 \*

**Revit**

%支持%\*\*

不适用 \*

**Navisworks**

%支持%

不适用 \*

**Rhino**

%支持%

%支持%

**Archicad**

%支持%

%支持%

**Solidworks**

%支持%

不适用 \*

\* 在macOS上不可用。

\*\* 从虚幻引擎5.3开始，将由Autodesk管理Revit导出插件的版本更新，并直接内置在Revit 2024+中。虚幻引擎仍然支持该插件，你可以从下载页面获取旧版本插件。

当你根据虚幻引擎的源代码分发自行重新编译虚幻引擎时，可以重新编译Windows版Datasmith导出器插件。但你需要从[Trimble](https://extensions.sketchup.com/en/developer_center/sketchup_sdk)或[Autodesk](https://www.autodesk.com.cn/developer-network/overview)下载并安装适用于你的源应用程序的SDK。

-   [reference](https://dev.epicgames.com/community/search?query=reference)
-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [enterprise](https://dev.epicgames.com/community/search?query=enterprise)
-   [manufacturing](https://dev.epicgames.com/community/search?query=manufacturing)
-   [simulation](https://dev.epicgames.com/community/search?query=simulation)
-   [architecture](https://dev.epicgames.com/community/search?query=architecture)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [平台支持的文件格式](/documentation/zh-cn/unreal-engine/datasmith-supported-platforms#%E5%B9%B3%E5%8F%B0%E6%94%AF%E6%8C%81%E7%9A%84%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F)
-   [根据源代码重新编译虚幻引擎](/documentation/zh-cn/unreal-engine/datasmith-supported-platforms#%E6%A0%B9%E6%8D%AE%E6%BA%90%E4%BB%A3%E7%A0%81%E9%87%8D%E6%96%B0%E7%BC%96%E8%AF%91%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E)
-   [Datasmith导出插件](/documentation/zh-cn/unreal-engine/datasmith-supported-platforms#datasmith%E5%AF%BC%E5%87%BA%E6%8F%92%E4%BB%B6)
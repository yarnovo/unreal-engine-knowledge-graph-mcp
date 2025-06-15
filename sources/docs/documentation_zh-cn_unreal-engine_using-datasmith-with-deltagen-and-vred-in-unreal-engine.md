# 结合使用Datasmith与Deltagen/VRED | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-datasmith-with-deltagen-and-vred-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:05:40.703Z

---

目录

![结合使用Datasmith与Deltagen/VRED](https://dev.epicgames.com/community/api/documentation/image/ee628078-083b-4ac8-a694-329c8f22f3a9?resizing_type=fill&width=1920&height=335)

此页面介绍了Datasmith如何将3DExcite Deltagen和Autodesk VRED中的场景导入虚幻编辑器。它遵循[Datasmith概述](/documentation/zh-cn/unreal-engine/datasmith-plugins-overview)和[关于Datasmith导入流程](/documentation/zh-cn/unreal-engine/datasmith-import-process-in-unreal-engine)中描述的基本流程，但加入了一些专为Deltagen和VRED设计的转换行为。如果您计划用Datasmith将Deltagen或VRED中的场景导入虚幻编辑器，阅读此页面可以帮助您理解自己的场景是如何被转换的，以及您该如何操作虚幻编辑器里的结果。

## 工作流

### Deltagen

Datasmith使用适用于Deltagen的 **导出** 工作流。这意味着要使用Datasmith将Deltagen内容导入到虚幻中，你需要：

1.  使用Deltagen中内置的导出功能将Deltagen场景导出为 *.fbx* 文件。
    
2.  如尚未安装，需要为项目启用 **导入器（Importers） > Datasmith FBX导入器（Datasmith FBX Importer）** 插件。
    
3.  使用虚幻编辑器的工具栏上的Datasmith **Deltagen** Fbx导入 *.fbx* 文件。请参阅[将Datasmith内容导入虚幻引擎4](/documentation/zh-cn/unreal-engine/importing-datasmith-content-into-unreal-engine)。
    

### VRED

Datasmith对VRED使用 **导出插件** 工作流。这意味着要使用Datasmith将VRED内容导入到虚幻中，你需要：

1.  安装用于VRED的插件脚本，并使用它将VRED场景导出为 *.fbx* 文件。请参阅[从VRED导出Datasmith内容](/documentation/404)。
    
2.  如尚未安装，需要为项目启用 **导入器（Importers） > Datasmith FBX导入器（Datasmith FBX Importer）** 插件。
    
3.  使用虚幻编辑器的工具栏上的Datasmith **VRED** Fbx导入程序将导出的 *.fbx* 文件导入。请参阅[将Datasmith内容导入虚幻引擎4](/documentation/zh-cn/unreal-engine/importing-datasmith-content-into-unreal-engine)。
    

关于其他类型的Datasmith工作流程，请参阅[Datasmith支持软件及文件类型](/documentation/zh-cn/unreal-engine/datasmith-supported-software-and-file-types)。

## 变体

适用于Deltagen和VRED的Datasmith FBX导入程序将你在Deltagen或VRED场景中定义的变体和变体集导入到一个新的 **LevelVariantSets** 资源中。该资源创建在 **内容浏览器** 中。它还会将该资源的一个实例放入关卡。

双击该资源将打开变体管理器界面。在虚幻编辑器中工作时，您可以用该界面在不同变体和变体集间切换。您也可以在运行时使用由 **LevelVariantSets**  Actor提供的专用蓝图函数集来切换变体。您还可以进一步自定义变体，让每个变体影响关卡中的更多对象，或在每次被激活时触发自定义蓝图函数。

你可以决定运行虚幻项目的玩家在运行时应该如何选择这些变体，并编写触发相应的蓝图函数的Gameplay代码。例如，你可能想要创建UI或一组菜单来供玩家选择变体，或将切换变体作为对玩家按下特定键或进行了其他输入的反应。Datasmith导入程序和变体管理器不会创建这类UI或菜单，它们仅提供你按照项目需求自行创建它们所需的所有工具。

关于变体管理器的更多信息及使用方法，请参阅[使用场景变体](/documentation/zh-cn/unreal-engine/working-with-scene-variants-in-unreal-engine)。

## 动画

如果Deltagen或VRED场景中包含任何动画场景元素，Datasmith FBX导入程序会将这些动画作为 **关卡序列** 导入虚幻。你可以用虚幻编辑器中的 **Sequencer** 工具来操作和编辑动画，在运行时使用蓝图控制和播放项目里的动画，并使用[Sequencer文档](/documentation/zh-cn/unreal-engine/real-time-compositing-with-sequencer-in-unreal-engine)中提到的其他所有功能。

关于编辑Datasmith导入的Sequencer动画的重要信息，请参阅[关于Datasmith导入流程](/documentation/zh-cn/unreal-engine/datasmith-import-process-in-unreal-engine#%E5%8A%A8%E7%94%BB)中的动画部分。

## 仅限VRED Professional

Datasmith目前只支持VRED Professional，不支持VRED Design。

-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [enterprise](https://dev.epicgames.com/community/search?query=enterprise)
-   [overview](https://dev.epicgames.com/community/search?query=overview)
-   [interop](https://dev.epicgames.com/community/search?query=interop)
-   [deltagen](https://dev.epicgames.com/community/search?query=deltagen)
-   [vred](https://dev.epicgames.com/community/search?query=vred)
-   [landing page](https://dev.epicgames.com/community/search?query=landing%20page)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [工作流](/documentation/zh-cn/unreal-engine/using-datasmith-with-deltagen-and-vred-in-unreal-engine#%E5%B7%A5%E4%BD%9C%E6%B5%81)
-   [Deltagen](/documentation/zh-cn/unreal-engine/using-datasmith-with-deltagen-and-vred-in-unreal-engine#deltagen)
-   [VRED](/documentation/zh-cn/unreal-engine/using-datasmith-with-deltagen-and-vred-in-unreal-engine#vred)
-   [变体](/documentation/zh-cn/unreal-engine/using-datasmith-with-deltagen-and-vred-in-unreal-engine#%E5%8F%98%E4%BD%93)
-   [动画](/documentation/zh-cn/unreal-engine/using-datasmith-with-deltagen-and-vred-in-unreal-engine#%E5%8A%A8%E7%94%BB)
-   [仅限VRED Professional](/documentation/zh-cn/unreal-engine/using-datasmith-with-deltagen-and-vred-in-unreal-engine#%E4%BB%85%E9%99%90vredprofessional)
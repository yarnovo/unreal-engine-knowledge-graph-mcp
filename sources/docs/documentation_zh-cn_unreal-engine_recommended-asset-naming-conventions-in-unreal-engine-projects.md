# 虚幻引擎项目中推荐的资产命名规范。 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/recommended-asset-naming-conventions-in-unreal-engine-projects
> 
> 生成时间: 2025-06-14T20:32:54.146Z

---

目录

![推荐的资产命名规范](https://dev.epicgames.com/community/api/documentation/image/500bae64-e582-424c-8c3b-4149421e2b56?resizing_type=fill&width=1920&height=335)

在开发阶段中，随着 **虚幻引擎(UE)（Unreal Engine (UE)）** 项目日益复杂，**内容浏览器（Content Browser）** 中的 **资产（Assets）** 列表会不断扩充。这会导致资产出现各种变体版本，也会导致资产名称因过于相似而造成混淆。比如，你有一个文件夹名为"Soldier"，这个文件夹中有蓝图、纹理和模型，它们的名称中都带"Soldier"一词，但在简单列表中，很难区别它们。

在开发大型项目时，我们建议你在早期阶段为各类资产建立通用的命名规范。这样方便你和团队成员寻找文件，防止出现冲突或混淆。下述命名规范介绍了Epic Games如何对示例项目中的资产命名，以[ICVFX制片测试](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine)为例：

```cpp
		[AssetTypePrefix]_[AssetName]_[Descriptor]_[OptionalVariantLetterOrNumber]

```

-   `AssetTypePrefix` 将表明资产的类型，详情请参阅下表。
    
-   `AssetName` 是资产的名称。
    
-   `Descriptor` 将提供资产的更多上下文，表明其用法。例如，纹理是正常贴图还是不透明度贴图。
    
-   `OptionalVariantLetterOrNumber` 是可选的，用于区分资产的多个版本或变体。
    

请考虑在你的项目中使用此命名规范，以便团队成员有多种途径来搜索内容浏览器中的资产。

此命名规范仅是一种建议，旨在便于组织你的项目。你的项目要求应始终优先，而且有可能你的项目用不到所有的资产类型。

## 推荐的资产前缀

此表未列出所有可能性，因为随着新功能出现，新资产类型也会出现。如果你要使用的资产类型未列出，可以参考以下表格为其指定命名规范。

资产

前缀

通用

 

[HDRI](/documentation/zh-cn/unreal-engine/hdri-backdrop-visualization-tool-in-unreal-engine)

HDR\_

[材质](/documentation/zh-cn/unreal-engine/unreal-engine-materials)

M\_

[材质实例](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)

MI\_

[物理资产](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine)

PHYS\_

[物理材质](/documentation/zh-cn/unreal-engine/physical-materials-in-unreal-engine)

PM\_

[后期处理材质](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine)

PPM\_

[骨骼网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)

SK\_

[静态网格体](/documentation/zh-cn/unreal-engine/static-meshes)

SM\_

[纹理](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine)

T\_

[OCIO配置文件](/documentation/zh-cn/unreal-engine/color-management-with-opencolorio-in-unreal-engine)

OCIO\_

[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)

 

Actor组件

AC\_

动画蓝图

ABP\_

蓝图接口

BI\_

蓝图

BP\_

曲线表

CT\_

数据表

DT\_

枚举

E\_

结构

F\_

控件蓝图

WBP\_

[粒子效果](/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine)

 

Niagara发射器

FXE\_

Niagara系统

FXS\_

Niagara函数

FXF\_

[骨骼网格体动画](/documentation/zh-cn/unreal-engine/skeletal-mesh-animation-system-in-unreal-engine)

 

绑定

Rig\_

骨架

SKEL\_

蒙太奇

AM\_

动画序列

AS\_

混合空间

BS\_

[ICVFX](/documentation/zh-cn/unreal-engine/in-camera-vfx-in-unreal-engine)

 

NDisplay配置

NDC\_

[动画](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)

 

关卡序列

LS\_

Sequencer编辑

EDIT\_

[媒体](/documentation/zh-cn/unreal-engine/media-framework-in-unreal-engine)

 

媒体源

MS\_

媒体输出

MO\_

媒体播放器

MP\_

媒体配置文件

MPR\_

其他

 

[关卡快照](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine)

SNAP\_

[远程控制预设](/documentation/zh-cn/unreal-engine/remote-control-for-unreal-engine)

RCP\_

-   [asset](https://dev.epicgames.com/community/search?query=asset)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [推荐的资产前缀](/documentation/zh-cn/unreal-engine/recommended-asset-naming-conventions-in-unreal-engine-projects#%E6%8E%A8%E8%8D%90%E7%9A%84%E8%B5%84%E4%BA%A7%E5%89%8D%E7%BC%80)

相关文档

[

内容浏览器

![内容浏览器](https://dev.epicgames.com/community/api/documentation/image/133ace36-135f-4673-9d72-c841fdb16066?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)
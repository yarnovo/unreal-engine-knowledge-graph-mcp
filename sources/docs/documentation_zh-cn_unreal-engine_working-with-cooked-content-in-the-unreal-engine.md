# 在编辑器中使用已烘焙内容 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/working-with-cooked-content-in-the-unreal-engine
> 
> 生成时间: 2025-06-14T20:42:00.325Z

---

目录

![在编辑器中使用已烘焙内容](https://dev.epicgames.com/community/api/documentation/image/3c8bd811-1076-4cdf-a1a4-2237fab5ba8c?resizing_type=fill&width=1920&height=335)

你可以在 **项目（Project）** 中使用 **已烘焙内容**，但在 **虚幻编辑器（Unreal Editor）** 中使用已烘焙内容时，还有额外的要求和限制。

本文档目前仅适用于Windows平台的内容。

## 需要的配置

将以下选项添加到你的项目的 `DefaultEngine.ini` 文件：

```cpp
		[/Script/UnrealEd.CookerSettings]
		cook.AllowCookedDataInEditorBuilds=True
		s.AllowUnversionedContentInEditor=1

```

第一个选项对应于 **项目设置（Project Settings）** 中的 **允许在编辑器中使用烘焙内容（Allow Cooked Content in the Editor）** 选项，而第二个选项目前只能通过配置文件设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68797354-efaf-4dad-a740-a982b3137122/allow-cooked-content-setting.png)

## 烘焙内容以在编辑器中使用

当你设置配置选项 `s.AllowUnversionedContentInEditor=1` 时，无需执行进一步的操作，就能使用已烘焙内容。

你可以在以下文件夹中找到你的项目中的已烘焙内容：

```cpp
		Saved\Cooked\WindowsNoEditor\(ProjectName)\Content\

```

不同于未烘焙内容，已烘焙内容针对每个资产将包含多个文件。通常，一个资产将分割为单独的文件，包括 `.uasset`，还可能包括 `.uexp` 和 `.ubulk` 文件。所有这些文件都需要复制到项目的内容文件夹中，才能让烘焙内容正常工作。

## 编辑器中已烘焙内容的行为

在对资产进行版本控制和烘焙之后，就可以将其放入内容文件夹，而这些资产将按照预期显示在 **内容浏览器（Content Browser）** 中。

已烘焙资产将是只读的，并且无法为这些资产打开编辑器。例如，你无法在 **材质编辑器（Material editor）** 中查看已烘焙 **材质（Material）**，也无法在 **静态网格体编辑器（Static Mesh editor）** 中打开已烘焙网格体。

在已烘焙内容引用其他内容时，请特别小心。要保留引用，你必须维护已烘焙内容原始所在的相同文件夹结构，并且一旦烘焙，已烘焙资产就无法移动或重命名。在某些情况下，编辑器无法正确处理额外的 `.uexp`/`.ubulk` 文件。例如，通过内容浏览器删除已烘焙资产时，可能无法删除其 `.uexp`/`.ubulk` 文件。

目前没有受支持资产类型的穷举列表，以下列表也并不暗示其中列为可正常运作的类型是官方支持的。

以下资产类型进行了定期测试，在烘焙后应该可以正常运作：

-   纹理
-   材质
-   静态网格体
-   声波
-   级联粒子
-   动画序列
-   骨骼网格体
-   关卡序列
-   AnimBPs
-   BP\_Enums

以下资产存在已知问题：

-   Niagara
-   蓝图

未列出的一切类型，不一定能正常运作。如果使用其他资产类型，请谨慎操作。

-   [cooking](https://dev.epicgames.com/community/search?query=cooking)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [需要的配置](/documentation/zh-cn/unreal-engine/working-with-cooked-content-in-the-unreal-engine#%E9%9C%80%E8%A6%81%E7%9A%84%E9%85%8D%E7%BD%AE)
-   [烘焙内容以在编辑器中使用](/documentation/zh-cn/unreal-engine/working-with-cooked-content-in-the-unreal-engine#%E7%83%98%E7%84%99%E5%86%85%E5%AE%B9%E4%BB%A5%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E4%BD%BF%E7%94%A8)
-   [编辑器中已烘焙内容的行为](/documentation/zh-cn/unreal-engine/working-with-cooked-content-in-the-unreal-engine#%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E5%B7%B2%E7%83%98%E7%84%99%E5%86%85%E5%AE%B9%E7%9A%84%E8%A1%8C%E4%B8%BA)
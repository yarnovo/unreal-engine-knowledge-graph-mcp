# 虚幻引擎5中的大世界坐标 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/large-world-coordinates-in-unreal-engine-5
> 
> 生成时间: 2025-06-14T19:52:46.150Z

---

目录

![大世界坐标](https://dev.epicgames.com/community/api/documentation/image/653b8851-0a0c-4bf7-9482-bd74ba2262d8?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**大世界坐标** （ **LWC** ）在 **虚幻引擎5** （ **UE5** ）中引入了对双精度数据变量的支持，并对所有引擎系统进行了更改，以便提高其浮点精度。这些系统包括 **建筑可视化（Architectural Visualization）** 、 **模拟仿真（Simulation）** 、 **渲染（Rendering）** （ **Niagara** 和 **HLSL** 代码），以及部分拥有巨大世界场景的项目。

在 **虚幻引擎4** （ **UE4** ）中，32位浮点精度类型限制了世界场景的大小。LWC支持将核心数据类型升级为64位双精度浮点，极大地提升了项目的规模。这些新变化使你能够构建巨大的场景，并大大提高Actor放置精度和方向精度。在UE5中开始新项目后，即可使用大世界坐标。

## 将你的项目升级到虚幻引擎5

将你的UE4项目升级到UE5时，我们通常建议你参考[迁移指南](/documentation/zh-cn/unreal-engine/unreal-engine-5-migration-guide)进行操作，因为某些特殊情况下，你的代码会出现精度丢失。对于不使用大世界坐标的项目，这可能并不重要。但是，对于计划使用双精度类型来增加其世界场景范围的项目，我们建议你还要参考[大世界坐标转换指南](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5)。

## 试验大型世界

由于UE5的大世界坐标系统仍处于beta阶段，默认的 `WORLD_MAX` 大小仍然和UE4的 `WORLD_MAX` 大小一样为21km，并且引擎还会启用检查世界边界。有两种方法来试着调整你的大型世界的大小：

你可以禁用边界检查，找到你的WorldSettings类并将 `bEnableLargeWorlds` 布尔值设置为true：

```cpp
	AWorldSettings::bEnableLargeWorlds = true

```

这会将 `WORLD_MAX` 的数值大致保持在21km，并且为在初始版本的虚幻引擎5.0中进行试验提供更好的稳定性。

另外 ，你还可以设置全局数值UE\_USE\_UE4\_WORLD\_MAX来使用更大的世界边界：

```cpp
	UE_USE_UE4_WORLD_MAX=0

```

这会将 `WORLD_MAX` 数值设为大约88,000,000km。

此数值在新版本虚幻引擎发布之前可能会改变，并可能导致稳定性问题，这些问题会在虚幻引擎5的开发工作中不断优化。

### 蓝图

在蓝图中，浮点现在会根据情况，以单精度或双精度的子类型显示。这种新数据类型支持float和double奇偶校验。所有现有的蓝图和蓝图类型（**UMG**、**Control Rig**、**动画蓝图（Animation Blueprints）**）都已隐式转换为使用其中一种精度类型，无需你手动更新项目。

### 源代码接口

源代码现在可以公开float和double类型。**Unreal Header Tool** （ **UHT** ）会根据情况，将代码中所有蓝图可访问浮点类型解译为单精度（C++ float）或双精度（C++ double）蓝图浮点，从而自动转换为任意一种精度的浮点值（只要蓝图节点支持）。

### 用于暴露浮点值的UFUNCTION属性说明符

凡是标有UFUNCTION属性说明符，且包含浮点数据值的方法，都存在引发不精确性的风险，因为蓝图浮点值会被转换为精度较低的浮点。所以务必要审核所有现有UFUNCTION属性。这有助于确定是否有必要将参数或返回值切换为double类型，以便避免将来出现精度问题。你随时可以在float和double类型之间切换。

这适用于你在代码中构造或暴露的所有K2节点。

## 渲染

在虚幻引擎中，你可以使用各种坐标空间和变换来描述对象如何放置在场景中。**世界空间**（你的关卡/世界的坐标）和 **本地空间**（相对于特定对象）的更多信息，请参阅[坐标空间术语](/documentation/zh-cn/unreal-engine/coordinate-system-and-spaces-in-unreal-engine)文档。

每个可以放置在项目世界中的对象都有三坐标轴、方向和原点。有关更多信息，请参阅[变换Actor](/documentation/zh-cn/unreal-engine/transforming-actors-in-unreal-engine)。

### 着色器

本次引入大世界坐标时还引入了全新的HLSL类型，可以在 `LargeWorldCoordinates.ush` 文件中找到。有关如何将着色器代码转换为UE5的更多信息，请参阅[LWC渲染文档](/documentation/zh-cn/unreal-engine/large-world-coordinates-rendering-in-unreal-engine-5)。

### Niagara

在Niagara中，实现方法与引擎的主要实现方法有所不同。为了保持粒子效果的性能，数据会存储为一组float，而不是double。世界大到一定程度时，将划分为网格单元。然后，第一个浮点将定义该网格单元中的Niagara系统，第二个将表示系统所在的网格单元。

为了容纳这些附加信息，有一种名为位置（Position）的新数据类型，可以用于存储Particles.Position引用的向量。 有关更多信息，请参阅[Niagara中的大世界坐标](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-niagara-for-unreal-engine)文档。

## Chaos

[Chaos破坏系统物理](/documentation/404)使用double类型继续完整运行。引擎在两个方向隐式进行类型转换，例如：

```cpp
		FVector3f -> Chaos::FVec3!

		但是，唯一的显式类型转换来自：

		Chaos::FVec3 -> FVector3f
		//这将捕获来自降级到float的精度损失

```

随着虚幻引擎5进一步发布新版本，FVector类型转换将继续隐式地将你的float升级为double。如果你要将double转换为float，则需要显式执行转换。有关更多信息，请参阅[大世界坐标转换指南](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5)。

[

![大型世界坐标项目转换指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/677ff0d9-c3dd-47da-bc0b-2c0b46f9c1c1/placeholder_topic.png)

大型世界坐标项目转换指南

本文档将指导你以最小的精度损失将UE4项目转换为UE5。





](/documentation/zh-cn/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5)[

![大型世界坐标渲染介绍。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af3d01ae-874f-4dff-8508-c18a78800820/placeholder_topic.png)

大型世界坐标渲染介绍。

介绍大型世界坐标渲染。





](/documentation/zh-cn/unreal-engine/large-world-coordinates-rendering-in-unreal-engine-5)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [将你的项目升级到虚幻引擎5](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-unreal-engine-5#%E5%B0%86%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE%E5%8D%87%E7%BA%A7%E5%88%B0%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E5)
-   [试验大型世界](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-unreal-engine-5#%E8%AF%95%E9%AA%8C%E5%A4%A7%E5%9E%8B%E4%B8%96%E7%95%8C)
-   [蓝图](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-unreal-engine-5#%E8%93%9D%E5%9B%BE)
-   [源代码接口](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-unreal-engine-5#%E6%BA%90%E4%BB%A3%E7%A0%81%E6%8E%A5%E5%8F%A3)
-   [用于暴露浮点值的UFUNCTION属性说明符](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-unreal-engine-5#%E7%94%A8%E4%BA%8E%E6%9A%B4%E9%9C%B2%E6%B5%AE%E7%82%B9%E5%80%BC%E7%9A%84ufunction%E5%B1%9E%E6%80%A7%E8%AF%B4%E6%98%8E%E7%AC%A6)
-   [渲染](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-unreal-engine-5#%E6%B8%B2%E6%9F%93)
-   [着色器](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-unreal-engine-5#%E7%9D%80%E8%89%B2%E5%99%A8)
-   [Niagara](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-unreal-engine-5#niagara)
-   [Chaos](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-unreal-engine-5#chaos)
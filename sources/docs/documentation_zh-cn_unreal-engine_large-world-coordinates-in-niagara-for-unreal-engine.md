# 虚幻引擎Niagara中的大型世界坐标 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/large-world-coordinates-in-niagara-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:30:13.944Z

---

目录

![Niagara中的大型世界坐标](https://dev.epicgames.com/community/api/documentation/image/a9292c7f-15ad-4b48-9070-2b0b75391903?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**大型世界坐标** 现已在虚幻引擎中实现。要理解它在主引擎中的实现，请参阅此[大型世界坐标](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-unreal-engine-5)页面。简而言之，数据类型FVector现在是 `double` 而不是 `float` 。

Niagara实现与主引擎的实现不同。因为需要高效执行计算，无论是在CPU还是GPU上，都存在限制，导致无法处理double。Niagara中改用了一种存储位置数据的新方法。

世界大到一定程度时，将划分为图块网格。想象一下空间中的位置，它在图块单元中有自己的相对位置，还有该图块在世界中的位置。请参见下图，了解其外观的概念呈现。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f925ee31-00e9-4117-a069-685bbe4dc874/world-and-tile-position.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f925ee31-00e9-4117-a069-685bbe4dc874/world-and-tile-position.png)

点击查看大图。

之前，Niagara位置与向量可互换使用，定义为从世界原点出发的方向和距离。现在，要让信息有意义，需要额外数据才能根据所在图块定位发射器。

在UE5中，要保存相对于原点的位置以及系统所在图块的信息，我们需要新的数据格式。这样一来，我们可以区分其他类型的向量和带有这些额外数据的位置。

## UE4和UE5中的位置数据

UE4和UE5之间的主要差异是粒子位置数据的存储方式，即 `Particles.Position` 。

 

**UE4**

**UE5**

**Particles.Position类型**

向量

位置

**本地空间发射器（Local space emitter）**

`Particles.Position` 将随Niagara系统在游戏中的原点发生变化

`Particles.Position` 将随Niagara系统在游戏中的原点发生变化（无变化）

**世界空间发射器（World space emitter）**

`Particles.Position` 将随游戏的原点(0,0,0)发生变化

激活后，`Particles.Position` 将随系统的位置发生变化。对于小型坐标，这仍是游戏的原点。对于较大型坐标，这可能是任意数字。

## 如何在Niagara中启用或禁用大型世界坐标

### 项目中的大型世界坐标

默认情况下，新项目中会开启大型世界坐标。你在UE5中打开项目时，系统会自动转换项目。

如果你的项目不够大，因而不需要大型世界坐标支持，你可以在 **编辑（Edit） > 项目设置（Project Settings）** 中将其彻底关闭。在 **插件（Plugins） > Niagara** 下，找到设置 **系统支持大型世界坐标（System Support Large World Coordinates）** ，然后为你的项目禁用此项。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6a16e7a-20ad-4be1-89ca-b881f1856c91/niagara-plugin-lwc-support.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6a16e7a-20ad-4be1-89ca-b881f1856c91/niagara-plugin-lwc-support.png)

点击查看大图。

### 系统中的大型世界坐标

你可能需要为项目开启大型世界坐标，但为特定个别系统将其禁用。在这种情况下，你可以在Niagara编辑器中编辑Niagara系统。在 **系统属性（System Properties）** 中的 **渲染（Rendering）** 分段下，你可以禁用 **支持大型世界坐标（Support Large World Coordinates）**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec483e35-baa5-4adf-8367-810ac1023819/disable-lwc-support.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec483e35-baa5-4adf-8367-810ac1023819/disable-lwc-support.png)

点击查看大图。

## 如何在Niagara中测试大型世界坐标

当你首次将项目文件从UE4更新到UE5时，或者在你开始测试系统时，你可能需要验证Niagara系统在大型世界坐标中的行为是否恰当。要测试Niagara系统在大型世界坐标中是否正常运行，你需要将该系统移到第一个图块之外。如下所述，你有多种方法可以做到这一点。

### 将效果移到非常远的地方

你可以将效果移到离原点非常远的地方，然后播放效果并验证行为。要进行这种测试而不更改引擎代码本身，这是唯一的办法。例如，你可以将系统移到离原点3000000个单位的地方，这会将其放在原始图块之外的某个图块中。

### 更改图块大小的常量

你还可以在常量定义中更改大型世界坐标的图块大小。在 `Engine/Source/Runtime/Core/Private/Misc/LargeWorldRenderPosition.cpp` 中，将 `UE_LWC_RENDER_TILE_SIZE` 更改为非常小的值，例如10个单位。现在，当你将效果放在关卡中时，只要它离原点超过10个单位，就会出现在新的图块中。

## 更新现有项目

### HLSL中的Particles.Position

如果你在HLSL中为项目编写了自定义脚本，就需要更新这些脚本才能处理大型世界坐标。在之前的版本中，你可能使用了HLSL来直接将 `Particles.Position` 设置为固定值。这并不适用于大型世界坐标。

你可以改为针对该资产禁用大型世界坐标支持，或将世界空间向量转换为位置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cbcfb5f2-b28b-4bd1-896a-88a9f90ddc31/convert-vector-position.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cbcfb5f2-b28b-4bd1-896a-88a9f90ddc31/convert-vector-position.png)

点击查看大图。

如果你需要知道自己位于哪个图块中，此信息存储在 `Engine.Owner.LWCTile` 中。

### 自定义模块

使用 **Niagara脚本编辑器（Niagara Script Editor）** 或 **暂存区（Scratch Pad）** ，你可以创建自己的自定义模块。如果你已经在之前版本中创建了自定义模块，它们在使用大型世界坐标转换为项目时可能并不能隐式适用。

其原因在于位置数据与法线向量之间存在差异，前者包含图块信息，而后者不包含。`Particles.Position` 等核心参数会自动转换为 `position` 类型，但连接到它们的自定义向量输入则不会。

在以下示例中，**盒体原点（Box Origin）** 将 `Particles.Position` 用作默认绑定。但是，它本身不是 `position` 类型。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea36922a-0835-4bfc-aac7-e8ad2f43dd70/niagara-custom-module-lwc.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea36922a-0835-4bfc-aac7-e8ad2f43dd70/niagara-custom-module-lwc.png)

点击查看大图。

为了维持向后兼容性，将保留现有连接，并且位置类型会转换为法线向量类型。

#### 更改现有向量输入的类型

在Niagara脚本中，如果你有现有模块，可能需要将某些参数更新为 `position` 类型。要将现有向量输入或输出的类型更改为位置类型，请执行以下操作：

1.  在 **Niagara脚本编辑器（Niagara Script Editor）** 中打开模块脚本。
    
2.  在 **参数（Parameter）** 选项卡中，右键点击你想更改其类型的参数。
    
3.  从上下文菜单选择 **更改类型（Change Type）> 位置（Position）** 。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/074fadfb-19b2-41f0-8ab8-07c969f15017/change-type-position.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/074fadfb-19b2-41f0-8ab8-07c969f15017/change-type-position.png)

点击查看大图。

如果将参数更改为位置类型，并且它连接到其他类型的参数，它将创建孤立的引脚连接。这样一来，你可以决定后续怎么做：是将其他参数类型也改掉，还是转换数据的类型。

你只能更改此脚本拥有的参数。如果你从外部继承参数，你会看到该参数呈锁定状态，无法更改类型。

#### 在节点图表中转换向量和位置

如果你在节点图表中将 `vector` 和 `position` 连接起来，系统会添加转换节点 **Position -> Vector** 或 **Vector -> Position** 。但是，请注意，这样做，在复制值的时候不会考虑在原点图块之外发生的大型世界变换。这可能导致丢失关键信息。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2aebe83f-e629-4d99-bc3f-d2bf5cf77cd7/position-vector-convert-node.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2aebe83f-e629-4d99-bc3f-d2bf5cf77cd7/position-vector-convert-node.png)

点击查看大图。

如果你想将位置类型转换为世界空间向量，可以使用函数 **Position to Vector**。反过来，要将世界空间向量转换为位置，你可以使用 **Vector to Position**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1fd98769-f346-40d6-b4a2-eafadda8ae4a/conversion-functions.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1fd98769-f346-40d6-b4a2-eafadda8ae4a/conversion-functions.png)

点击查看大图。

每当你从位置转换为向量或反向转换时，都有可能会丢失数据。这可能导致精度损失，或在位于原点文件之外时发生一些不可预测的行为。为了安全起见，从头到尾你都应当使用不经转换的位置。理想情况下，转换为世界空间的操作应当仅在数据接口或渲染器中发生。

### 导出粒子数据接口

你可以使用 **导出粒子（Export Particle）** 数据接口将位置数据发送到蓝图。如果你之前已经在这样使用，你需要为大型世界坐标更新蓝图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/520af5b0-a733-41c5-a846-8b644a629053/update-export-particle-data-blueprint.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/520af5b0-a733-41c5-a846-8b644a629053/update-export-particle-data-blueprint.png)

点击查看大图。

在 **Receive Particle Data** 事件节点中有一个名为 **模拟位置偏移（Simulation Position Offset）** 的参数。它将存储你所在图块的偏移数据。你可以在脚本末尾将其添加到模拟位置，以从模拟空间转换回世界空间。

### 动态材质参数

位置数据包含有关图块偏移的额外信息，这些信息无法直接链接到不包含这些信息的向量。如果你的项目设置为通过使用动态输入绑定渲染器中的材质来将位置数据导出到该材质，则不适用于大型世界坐标。要修复这种情况，你可以将位置数据转化为世界空间向量。

![Converting position data exported to a Material.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e13c67a-9167-4539-bdaf-669f73e9fccb/convert-material-export-data.png)

对于大型坐标，你所在图块的额外偏移信息将丢失，因此会导致大型坐标溢出。

如果你仍有材质绑定可使用，可以将其链接到 `Engine.Owner.LWCTile` 以再次添加回此偏移信息。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf5ca267-26b6-4d3d-9487-1da9741a6469/link-material-binding.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf5ca267-26b6-4d3d-9487-1da9741a6469/link-material-binding.png)

点击查看大图。

在材质本身中，你还可以使用 **ConvertNiagaraPositionToWorldspace** 材质函数将图块偏移添加到模拟位置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43f15ca3-ed23-44d3-8850-6afb8da9667b/convert-niagara-worldspace-node.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43f15ca3-ed23-44d3-8850-6afb8da9667b/convert-niagara-worldspace-node.png)

点击查看大图。

### 自定义数据接口

如果你创建了自定义数据接口，而且接口中包含用来处理世界空间位置的函数，则你需要更新这些函数。

根据需要，将现有函数替换为将 `FNiagaraPosition` 类型而不是 `FVector` ，以用于其输入和输出。你可以覆盖 `UNiagaraDataInterface::UpgradeFunctionCall` 以升级现有函数用法。

要变换模拟位置，你可以从系统实例获取辅助对象。

```cpp

		FNiagaraLWCConverter LWCConverter = SystemInstance->GetLWCConverter();

```

对于GPU数据接口函数，你可以从提供给着色器上下文的 `FNiagaraDataInterfaceArgs` 获取系统的大型世界坐标图块。如果你需要查看其示例，可以检查摄像机数据接口之类的现有用法。

### 自定义渲染器

读取位置数据的自定义渲染器也需要更新。类似于数据接口，你可以从系统实例获取转换符。唯一的区别是，你还需要知道你所渲染的是否为 **本地空间发射器** ：

```cpp

		FNiagaraLWCConverter LwcConverter = SystemInstance->GetLWCConverter(bIsLocalSpaceEmitter);

```

接着，你读取的粒子位置可以使用以下代码变换为世界空间：

```cpp

		FVector WSPos = LwcConverter.ConvertSimulationPositionToWorld(SimPos);

```

请检查现有Niagara渲染器，了解已经实现这种情况的例子。

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [UE4和UE5中的位置数据](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-niagara-for-unreal-engine#ue4%E5%92%8Cue5%E4%B8%AD%E7%9A%84%E4%BD%8D%E7%BD%AE%E6%95%B0%E6%8D%AE)
-   [如何在Niagara中启用或禁用大型世界坐标](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-niagara-for-unreal-engine#%E5%A6%82%E4%BD%95%E5%9C%A8niagara%E4%B8%AD%E5%90%AF%E7%94%A8%E6%88%96%E7%A6%81%E7%94%A8%E5%A4%A7%E5%9E%8B%E4%B8%96%E7%95%8C%E5%9D%90%E6%A0%87)
-   [项目中的大型世界坐标](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-niagara-for-unreal-engine#%E9%A1%B9%E7%9B%AE%E4%B8%AD%E7%9A%84%E5%A4%A7%E5%9E%8B%E4%B8%96%E7%95%8C%E5%9D%90%E6%A0%87)
-   [系统中的大型世界坐标](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-niagara-for-unreal-engine#%E7%B3%BB%E7%BB%9F%E4%B8%AD%E7%9A%84%E5%A4%A7%E5%9E%8B%E4%B8%96%E7%95%8C%E5%9D%90%E6%A0%87)
-   [如何在Niagara中测试大型世界坐标](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-niagara-for-unreal-engine#%E5%A6%82%E4%BD%95%E5%9C%A8niagara%E4%B8%AD%E6%B5%8B%E8%AF%95%E5%A4%A7%E5%9E%8B%E4%B8%96%E7%95%8C%E5%9D%90%E6%A0%87)
-   [将效果移到非常远的地方](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-niagara-for-unreal-engine#%E5%B0%86%E6%95%88%E6%9E%9C%E7%A7%BB%E5%88%B0%E9%9D%9E%E5%B8%B8%E8%BF%9C%E7%9A%84%E5%9C%B0%E6%96%B9)
-   [更改图块大小的常量](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-niagara-for-unreal-engine#%E6%9B%B4%E6%94%B9%E5%9B%BE%E5%9D%97%E5%A4%A7%E5%B0%8F%E7%9A%84%E5%B8%B8%E9%87%8F)
-   [更新现有项目](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-niagara-for-unreal-engine#%E6%9B%B4%E6%96%B0%E7%8E%B0%E6%9C%89%E9%A1%B9%E7%9B%AE)
-   [HLSL中的Particles.Position](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-niagara-for-unreal-engine#hlsl%E4%B8%AD%E7%9A%84particlesposition)
-   [自定义模块](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-niagara-for-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%A8%A1%E5%9D%97)
-   [更改现有向量输入的类型](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-niagara-for-unreal-engine#%E6%9B%B4%E6%94%B9%E7%8E%B0%E6%9C%89%E5%90%91%E9%87%8F%E8%BE%93%E5%85%A5%E7%9A%84%E7%B1%BB%E5%9E%8B)
-   [在节点图表中转换向量和位置](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-niagara-for-unreal-engine#%E5%9C%A8%E8%8A%82%E7%82%B9%E5%9B%BE%E8%A1%A8%E4%B8%AD%E8%BD%AC%E6%8D%A2%E5%90%91%E9%87%8F%E5%92%8C%E4%BD%8D%E7%BD%AE)
-   [导出粒子数据接口](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-niagara-for-unreal-engine#%E5%AF%BC%E5%87%BA%E7%B2%92%E5%AD%90%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3)
-   [动态材质参数](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-niagara-for-unreal-engine#%E5%8A%A8%E6%80%81%E6%9D%90%E8%B4%A8%E5%8F%82%E6%95%B0)
-   [自定义数据接口](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-niagara-for-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3)
-   [自定义渲染器](/documentation/zh-cn/unreal-engine/large-world-coordinates-in-niagara-for-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B2%E6%9F%93%E5%99%A8)
# 虚幻引擎中固定光源的移动性 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/stationary-light-mobility-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:16:02.325Z

---

目录

![固定光源的移动性](https://dev.epicgames.com/community/api/documentation/image/64a42d19-bdd4-46b5-8f66-4871b510dd16?resizing_type=fill&width=1920&height=335)

将移动性（Mobility）设置为 **固定（Stationary）** 的光源基本都是位置固定的光源，但其在其他方面可以调整，例如光源的亮度和颜色。这是它们与[静态光源](/documentation/zh-cn/unreal-engine/static-light-mobility-in-unreal-engine)的主要区别，后者在运行时无法改变。

在引擎提供的三种光源移动性中，固定光源拥有最高品质、中等可变性和中等性能成本。

固定光源使用动态和静态光照来实现其结果，间接光照和投影存储在关卡的光照贴图中。直接阴影存储在阴影贴图中。这些光源将使用距离场阴影，这意味着即使在光照对象上的光照贴图分辨率相当低的情况下，它们的阴影也可以保持清晰。

## 固定直接光照

固定光源将使用动态直接光照和静态间接光照来实现效果。间接光照和投影存储在光照贴图中，而直接投影存储在阴影贴图中。因为固定光源使用延迟着色来进行动态渲染，所以它们的亮度和颜色能够在运行时改变，并且还以相同的方式支持[光源函数](/documentation/zh-cn/unreal-engine/using-light-functions-in-unreal-engine)和[IES描述文件](/documentation/zh-cn/unreal-engine/using-ies-light-profiles-in-unreal-engine)。

固定光源也有高品质的分析高光，比如[可移动光源](/documentation/zh-cn/unreal-engine/movable-light-mobility-in-unreal-engine)。

![固定定向光源|带有可移动对象](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/868fcb59-995c-40b0-adea-e0e5a44c84b0/stationary-light-with-movable-objects.png)

![静态定向光源|带有可移动对象](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06b0c3e8-f90e-45c7-9255-5d4490cce0a5/static-light-with-movable-objects.png)

固定定向光源|带有可移动对象

静态定向光源|带有可移动对象

## 固定光源投影

仅四个或更少的固定光源可以在关卡中相互重叠或重叠单个几何体，这意味着在某些情况下，你可以在关卡的某些部分重叠的固定光源将更少。投影不会影响重叠测试，因此定向光源通常需要一个来自它所在的整个关卡的通道，即使该区域可能位于地下或被其他几何体遮挡。达到通道限制后，只能使用动态（或全场景阴影），这会带来相当高的性能成本。

当限制关卡中始终最多有四个固定光源重叠时，光源图标将变为一个，并且有问题的光源上方带有 **红色X**，直到解决重叠限制。系统提供 **固定光源重叠（Stationary Light Overlap）** 可视化模式，以红色突出显示有问题的光源，直到解决重叠限制。

从关卡编辑器（Level Editor） **视图模式（View Mode）> 优化视图模式（Optimization Viewmodes）** 下拉选择中，启用 **固定光源重叠（Stationary Light Overlap）** 可视化。

![关卡编辑器菜单固定光源重叠可视化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f20576d3-93a3-4bfd-8904-be0e15f9d215/stationary-light-overlap-visualization-menu.png)

### 不透明材质上的固定间接光照

[Lightmass](/documentation/zh-cn/unreal-engine/global-illumination-in-unreal-engine)在光照构建过程中为静态物体上的固定光源生成距离场阴影贴图。即使在较低分辨率下，距离场阴影贴图也能提供准确的阴影过渡，并且运行时成本非常低。例如，光照贴图需要在移动性设置为静态（Static）并具有来自静态或固定光源的间接光照的所有网格体上唯一展开的UV。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c088e77c-0d1d-4516-b63f-7861f20cc3fb/distancefieldshadows.png)

静态网格体Actor在不透明表面的准确投影。

要想显示来自固定或静态光源的阴影，就必须构建光照，否则将使用动态阴影。

### 半透明材质上的固定间接光照

由于Lightmass会从关卡中的静态几何体预计算阴影深度贴图，因此半透明材质会使用固定光源以低成本接收投影。该阴影深度在运行时应用于半透明材质。这种投影形式相当粗糙，只能捕捉以米为单位的投影。

![无阴影半透明](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/203779e5-60e2-42bb-8ca1-e944271264bb/1originalcropped.png)

![半透明接收静态投影|来自定向光源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cafb253c-c1e2-4356-9766-4f837efec9df/1shadowedcropped.png)

无阴影半透明

半透明接收静态投影|来自定向光源

静态阴影深度贴图的分辨率由 `BaseLightmass.ini` 配置文件中的 `StaticShadowDepthMapTransitionSampleDistanceX` 和 `StaticShadowDepthMapTransitionSampleDistanceY` 控制。它的默认值是100，即每米一个纹素。

### 固定光源动态投影

动态对象（例如将其移动性设置为可移动的静态网格体和骨骼网格体）必须从阴影贴图集成到世界中，这是通过每个对象的阴影实现的。每个可移动对象将从给定的固定光源创建两个动态阴影：处理 *到可移动对象* 静态世界的阴影，以及处理 *投射到世界* 的可移动对象的阴影。

使用此设置，固定光源的唯一投影成本来自它影响的可移动对象。这也意味着成本可能有高有低，这取决于有多少可移动对象。随着足够多的可移动对象受到影响，使用将移动性（Mobility）设置为可移动（Movable）的光源实际上更有效。

在下面的示例场景中，球体的移动性（Mobility）设置为 **可移动（Movable）**，场景几何体的其余部分设置为

在下面的示例场景中，固定定向光源用于照亮场景。球体的移动性（Mobility）设置为 **可移动（Movable）**，场景的其余部分设置为 **静态（Static）**。已经为场景构建光照。通过接收后面物体的阴影并投射与地面上的阴影融合的自身阴影，每个可移动球体的每个对象阴影视锥体与场景无缝集成。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e17571b3-b591-4e1f-bc8a-7737f7c222a1/dynamicobjectshadowfrustums.png)

可移动组件使用的每个对象阴影会将阴影贴图应用于物体的边界，因此物体的边界必须准确。对于骨骼网格体，这意味着它们应该有物理资产。对于粒子系统，固定边界框必须足够大，可以包含它生成的所有粒子。

#### 固定定向光源动态投影

定向固定光源的特殊之处在于，可通过 **级联阴影贴图（Cascaded Shadow Maps）** 支持整个场景阴影，同时支持预计算的静态投影。这在具有大量动画植被的场景中非常有用，在这些场景中，你希望玩家的周围出现移动的阴影，但又不想因为宽广的视野范围内有多层级联阴影贴图而产生更高的成本。

定向固定光源将使用级联阴影贴图在指定范围内使用 **动态阴影距离固定光源（Dynamic Shadow Distance Stationary Light）** 在玩家附近制造直接投影。超出此距离的所有阴影都会淡化为存储在光照贴图中的预计算静态阴影。默认情况下，所有定向固定光源都从值0开始，这意味着不会出现动态投影。

如果场景中有很多可移动对象，但你希望使用较小的动态阴影距离，为了节省性能成本，请启用 **为可移动对象插入阴影（Inset Shadows for Movable Objects）**。该功能允许可移动对象即使在级联阴影贴图范围之外也有阴影，并且如果场景中有许多可移动对象，则可显着降低投影成本。

### 固定光源间接投影

当为关卡构建光照时，固定光源会将其间接光照存储在光照贴图中，就像静态光源一样。要想修改间接光照，就必须将光照作废再重建，但改变光的 **强度（Intensity）** 和 **光颜色（Light Color）** 除外。但是，这不会影响烘焙阴影的强度或颜色。

**后期处理体积（Post Process Volume）** 确实可以使用 **全局光照（Global Illumination）** 类别属性 **间接光照颜色（Indirect Lighting Color）** 和 **间接光照强度（Indirect Lighting Intensity）** 更改间接阴影强度和颜色。

#### 对固定光源使用区域阴影

是否对固定光源预计算阴影贴图使用区域阴影。 区域阴影离阴影投射器越远就越柔和，但需要更高的光照贴图分辨率才能在阴影清晰的地方达到相同的品质。

默认情况下，静态光源在构建光照时会自动使用区域阴影——接近表面的清晰硬投影与彼此分开的较远表面的较柔和阴影相接触。对于固定光源，属性 **对固定光源使用区域阴影（Use Area Shadows for Stationary Lights）** 将为场景中受此光源影响的所有静态几何体启用软区域投影。

该属性在光源的 **细节（Details）** 面板中 **Lightmass** 分段下的固定光源（Stationary Lights）上启用。

![默认固定阴影|面向静态几何体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2011b83-2b32-4246-956e-10c77e19433e/uniformpenumbrasharp.png)

![启用区域阴影|面向静态几何体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ddfd267-473f-4b0c-8ba8-ee222b7d16be/areashadows.png)

默认固定阴影|面向静态几何体

启用区域阴影|面向静态几何体

**对固定光源使用区域阴影（Use Area Shadows for Stationary Lights）** 仅适用于固定光源，并且需要更高的光照贴图分辨率才能实现良好的效果。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [mobility](https://dev.epicgames.com/community/search?query=mobility)
-   [light type](https://dev.epicgames.com/community/search?query=light%20type)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [固定直接光照](/documentation/zh-cn/unreal-engine/stationary-light-mobility-in-unreal-engine#%E5%9B%BA%E5%AE%9A%E7%9B%B4%E6%8E%A5%E5%85%89%E7%85%A7)
-   [固定光源投影](/documentation/zh-cn/unreal-engine/stationary-light-mobility-in-unreal-engine#%E5%9B%BA%E5%AE%9A%E5%85%89%E6%BA%90%E6%8A%95%E5%BD%B1)
-   [不透明材质上的固定间接光照](/documentation/zh-cn/unreal-engine/stationary-light-mobility-in-unreal-engine#%E4%B8%8D%E9%80%8F%E6%98%8E%E6%9D%90%E8%B4%A8%E4%B8%8A%E7%9A%84%E5%9B%BA%E5%AE%9A%E9%97%B4%E6%8E%A5%E5%85%89%E7%85%A7)
-   [半透明材质上的固定间接光照](/documentation/zh-cn/unreal-engine/stationary-light-mobility-in-unreal-engine#%E5%8D%8A%E9%80%8F%E6%98%8E%E6%9D%90%E8%B4%A8%E4%B8%8A%E7%9A%84%E5%9B%BA%E5%AE%9A%E9%97%B4%E6%8E%A5%E5%85%89%E7%85%A7)
-   [固定光源动态投影](/documentation/zh-cn/unreal-engine/stationary-light-mobility-in-unreal-engine#%E5%9B%BA%E5%AE%9A%E5%85%89%E6%BA%90%E5%8A%A8%E6%80%81%E6%8A%95%E5%BD%B1)
-   [固定定向光源动态投影](/documentation/zh-cn/unreal-engine/stationary-light-mobility-in-unreal-engine#%E5%9B%BA%E5%AE%9A%E5%AE%9A%E5%90%91%E5%85%89%E6%BA%90%E5%8A%A8%E6%80%81%E6%8A%95%E5%BD%B1)
-   [固定光源间接投影](/documentation/zh-cn/unreal-engine/stationary-light-mobility-in-unreal-engine#%E5%9B%BA%E5%AE%9A%E5%85%89%E6%BA%90%E9%97%B4%E6%8E%A5%E6%8A%95%E5%BD%B1)
-   [对固定光源使用区域阴影](/documentation/zh-cn/unreal-engine/stationary-light-mobility-in-unreal-engine#%E5%AF%B9%E5%9B%BA%E5%AE%9A%E5%85%89%E6%BA%90%E4%BD%BF%E7%94%A8%E5%8C%BA%E5%9F%9F%E9%98%B4%E5%BD%B1)
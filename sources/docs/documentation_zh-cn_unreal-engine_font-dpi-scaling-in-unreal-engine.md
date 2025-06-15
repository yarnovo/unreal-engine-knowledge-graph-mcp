# 虚幻引擎中的字体DPI缩放 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/font-dpi-scaling-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:18:50.246Z

---

目录

![字体DPI缩放](https://dev.epicgames.com/community/api/documentation/image/9ae90152-58c2-45aa-80d9-7050026346c5?resizing_type=fill&width=1920&height=335)

![字母](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7dc5223d-6522-47ce-8de2-5440cb1638cc/font-size-demonstration.png)

**UMG** 使用全局 **字体分辨率（Font Resolution）** 值计算文本中字符的大小，该值用DPI（每英寸点数）表示：

```cpp
	像素大小 = (字体点大小 * 屏幕分辨率) / (字体分辨率(DPI))
```

例如，以72 DPI显示的12点字体将为12/72英寸。在 **虚幻引擎（UE）** 中，你可以设置字体分辨率，自定义如何解译字体大小。这样你可以按照团队最习惯的标准或外部应用程序最常用的标准开发用户界面。本页面提供以下内容：

-   关于如何配置项目DPI的指引。
    
-   关于如何处理字体缩放的技术信息。
    
-   管理字体大小的最佳实践。
    

为了解释字体点大小和DPI之间的关系，我们对上述计算进行了简化。实际的像素大小计算基于更多因素，如缩放。可以通过字体分辨率根据团队偏好改变字体大小的解译方式，但屏幕显示像素大小的最终计算包括至虚幻引擎原生96 DPI的转换。有关更多信息，请参阅"字体分辨率"和"字体大小"。

## 配置全局字体分辨率（DPI）

在 **项目设置（Project Settings）** > **引擎（Engine）** > **用户界面（User Interface）** 中，你可以全局更改虚幻引擎中的字体DPI。字体分辨率的设置位于 **UMG字体（UMG Fonts）** 分段。

![字体分辨率设置位于项目设置/引擎/用户界面的UMG字体分段。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e3aa42f-686d-49f1-b032-f1e92ed85c2d/font-resolution-location.png)

通过 **字体分辨率（Font Resolution）** 设置，你可以更改用于计算项目中所有字体大小的DPI。通过 **使用自定义DPI（Use Custom DPI）** 设置，你可以设置除默认值以外的值。

### 配置标准DPI

未选中 **使用自定义DPI（Use Custom DPI）** 时，使用 **字体分辨率（Font Resolution）** 下拉菜单可选择96 DPI（虚幻引擎）或72 DPI（默认）。

![字体分辨率下拉菜单显示选项96 DPI和72 DPI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b6be358-8376-460a-9a84-ff6634556a07/type-dropdown.png)

**96 DPI（虚幻引擎）** 为旧版设置，因为以前的UE版本使用96 DPI计算字体大小。在当前的UE版本中，96 DPI用作默认设置，以便处理较旧的项目。

**72 DPI（默认）** 是用于计算用户界面字体大小的Web设计行业标准。我们推荐新项目采用此设置，因为热门UI设计软件（如Figma）使用72 DPI。在未来的虚幻引擎版本中，这将成为默认值。在未来的虚幻UE版本中，这将成为默认DPI。

### 配置自定义DPI

勾选 **使用自定义DPI（Use Custom DPI）** 时，字体分辨率（Font Resolution）下拉菜单替换为整型值滑块。使用该滑块可将字体分辨率设置为介于1至1000之间的整型DPI。

![字体分辨率字段现在是可在1至1000之间取任意值的整型字段。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ddf21a35-fa46-44e6-b42b-191eb1ea1ef9/custom-dpi.png)

在计算文本大小时，使用非标准字体分辨率可能会产生舍入误差。有关更多信息，请参阅下面的"字体分辨率和字体大小"小节。

## 字体分辨率和字体大小

字体分辨率（Font Resolution）设置仅会更改UMG解译字体大小的方式，而非用于计算字体大小的实际内部DPI。无论你的字体分辨率设置如何，虚幻引擎都会将字体大小转换为适合96 DPI的值，然后在内部使用96 DPI计算字符的最终显示。因此，计算屏幕显示大小的实际公式如下：

```cpp
	像素大小 = (字体点大小 * 屏幕分辨率) / (字体分辨率(DPI/96))
```

例如，如果你将字体分辨率设置为72 DPI，并将文本元素设置为12点字体，UE会将文本的字体大小值转换为16，然后以96 DPI显示文本。结果为适用于72 DPI应用程序中12点字体的预期文本大小。

即使你更改全局字体分辨率，此转换也可以在整个项目过程中保持文本元素的屏幕显示大小，并确保向后兼容尚未采用72 DPI标准的旧项目。这也便于使用小数字体大小，例如12.5或12.2点字体。

此方法可能产生舍入误差，从而导致字体大小不符预期。我们建议你尽早确定团队的首选DPI。

## 字体大小最佳实践

管理项目中的文本时，你应尽量少用大小不同的字体。

为优化文本显示，UE会创建仅包含项目所使用字形的字体图集资产，对资产进行光栅化并按需将它们添加到字体图集中。例如，如果你的项目中唯一的字符串是以Roboto 12字体显示的"Scaling"一词，则只有该字符串中的7个字母才会占用字体图集中的空间。

然而，UE会为项目所使用的每种不同大小的每种不同字体创建字形图集。换言之，如果你以Roboto 12、Roboto 18、Roboto 72、Arial 18、Arial 24和Arial 36显示"Scaling"，UE会创建六个字体图集，每个图集都包含"Scaling"一词所需的字形，而不是对每种大小重复使用相同字形。此外，如果你对包含文本的控件应用缩放，UE的文本引擎会在应用变换后以最接近的尺寸对控件进行光栅化。换言之，如果你将整个屏幕按50%的比例缩小，最初设置为使用Roboto 12的字符串实际上会以6的大小进行光栅化，添加另一个图集供UE管理。这些图集中的任何一个都可以在任何给定时间加载到内存中，具体取决于UI的构建和显示方式。

因此，最大限度地减少你在整个项目中使用的不同尺寸的数量，可以确保项目的字体资产出现不必要的膨胀，还有助于在整个项目中加强字体标准化。在设计UI时，越多地应用单一尺寸，字形的重用就越容易，需要加载的图集就越少。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [font](https://dev.epicgames.com/community/search?query=font)
-   [font resolution](https://dev.epicgames.com/community/search?query=font%20resolution)
-   [font dpi](https://dev.epicgames.com/community/search?query=font%20dpi)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [配置全局字体分辨率（DPI）](/documentation/zh-cn/unreal-engine/font-dpi-scaling-in-unreal-engine#%E9%85%8D%E7%BD%AE%E5%85%A8%E5%B1%80%E5%AD%97%E4%BD%93%E5%88%86%E8%BE%A8%E7%8E%87%EF%BC%88dpi%EF%BC%89)
-   [配置标准DPI](/documentation/zh-cn/unreal-engine/font-dpi-scaling-in-unreal-engine#%E9%85%8D%E7%BD%AE%E6%A0%87%E5%87%86dpi)
-   [配置自定义DPI](/documentation/zh-cn/unreal-engine/font-dpi-scaling-in-unreal-engine#%E9%85%8D%E7%BD%AE%E8%87%AA%E5%AE%9A%E4%B9%89dpi)
-   [字体分辨率和字体大小](/documentation/zh-cn/unreal-engine/font-dpi-scaling-in-unreal-engine#%E5%AD%97%E4%BD%93%E5%88%86%E8%BE%A8%E7%8E%87%E5%92%8C%E5%AD%97%E4%BD%93%E5%A4%A7%E5%B0%8F)
-   [字体大小最佳实践](/documentation/zh-cn/unreal-engine/font-dpi-scaling-in-unreal-engine#%E5%AD%97%E4%BD%93%E5%A4%A7%E5%B0%8F%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)
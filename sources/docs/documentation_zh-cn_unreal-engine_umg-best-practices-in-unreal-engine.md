# 虚幻引擎 UMG 最佳实践 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/umg-best-practices-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:17:47.160Z

---

目录

![UMG 最佳实践](https://dev.epicgames.com/community/api/documentation/image/ba4fcfe3-f189-4455-bf52-5cb427edaa24?resizing_type=fill&width=1920&height=335)

使用 **虚幻示意图形（UMG）** 进行实验并创建 UI 元素时，以最高效的方式进行操作无疑是您的目标。 虽然这较大程度上取决于您项目的规模，但您在设置 UI 时也需要考虑到本页中提及的要点。

例如，创建的简单 UI 画面包含少量变化频率较高的变量时，则需要考虑使用 [属性绑定](/documentation/zh-cn/unreal-engine/property-binding-for-umg-in-unreal-engine) 来驱动这些变更。 然而，如果 UI 画面更为复杂，数个属性将在特定时间发生变更，则使用 [基于事件的](/documentation/zh-cn/unreal-engine/driving-ui-updates-with-events-in-unreal-engine) 逻辑执行这些变更为佳，而无需在每帧进行检查确认是否应该形成变更。

注意：使用 UMG 创建内容时，不存在"正确"或"错误"的答案。根据您所处的具体情况使用效果最佳的方法即可。 如此说来，您在创建内容时可先参考此页面中讲述的内容，然后再决定是否应用到实际操作中。

## 目标分辨率和比例

在 UMG 中创建内容时，需牢记目标分辨率，然后基于此分辨率创建所有控件。 例如目标分辨率为 1080x1920，则使用此分辨率设置在 UMG 中制作每个控件蓝图。可在 **ScreenSize** 下拉菜单中设置工作屏幕尺寸。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58d710a7-c9cd-452d-b87d-1d162f1e9a31/screensizeoption.png)

可预览在其他屏幕尺寸上的效果，但不要在不同屏幕尺寸上构建画面，因为这会导致内容之间的比例不一致。 谈到比例，在 UMG 中创建内容时，尝试以 [DPI 缩放](/documentation/zh-cn/unreal-engine/dpi-scaling-in-unreal-engine) 1.0 进行创建。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a3df43a-d86f-4dd5-865a-ec5e03f4825b/onescale.png)

可在图表下部的 Designer 标签上查看当前屏幕尺寸和比例。

这不但能确保创建的内容大小一致，将统一的比例应用到所有控件蓝图时还更便于缩放到更大/更小的屏幕尺寸。 与在不同屏幕尺寸下工作相似，如在针对不同屏幕尺寸缩放控件蓝图时将一个控件蓝图指定为一个比例、另一个指定为不同比例，缩放效果可能和预期不符。

## 创建 UMG 的美术效果

在创建 UMG 美术资源前，创建目标分辨率和比例十分重要。 如创建资源时未确定分辨率或比例，一些纹理则会出现过大或过小的情况。 无论怎样都需要使纹理与 UI 符合，可能使纹理出现拉伸或扭曲，出现非期望的效果。

就纹理而言，需要将导入纹理内置填充量控制到最小。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74ba72ce-3f1d-4b45-a8b2-75f84e955d43/mainmenubackground.png)

上图纹理周边的填充较多，要获得窗口框架的真实尺寸较为困难。

在 UI 画面中使用上图的纹理时，如需要尝试调整它的比例匹配不同屏幕尺寸，比例需基于纹理尺寸而非窗口框架。 如需在物体周围添加填充，最好使用 UMG 中的填充选项在物体周围形成空间，以便执行缩放时物体的比例显示正确。

此图像的另一个问题是美术资源创建的方式。该纹理并非一整块美术资源，可分离成单独的块（木质框架可从边角上分离，并与背景分离）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db4c0103-a5bf-4e3c-b362-2ca688ad0df0/backgroundcallouts.png)

木板的边角应为其自身的纹理，而这样的瑕疵使得纹理的平铺较为困难。

理想状态下，边角和木板应为其自身纹理，以便将其平铺使背景图像变为需要的大小，而无需拉伸图像。 在 UMG 中，可将纹理 **Draw As** 选项设为不同设置，这时便可使用支持平铺的 **Border** 模式。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10146e26-6a26-46d3-a0ff-c7ff7b980160/bordertile.png)

可在 [移动端渲染功能](/documentation/zh-cn/unreal-engine/rendering-features-for-mobile-games-in-unreal-engine) 中查阅移动设备纹理创建的更多内容。

## 提示和技巧

此部分讲述使用 UMG 或使用 UMG 资源时的提示和技巧。

### 格式技巧

使用如垂直框或横向框的面板时，需要确定是否对 [槽](/documentation/zh-cn/unreal-engine/umg-slots-in-unreal-engine) 尺寸使用 **填充（Fill）** 或 **自动（Auto）**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9dccf25-f0dd-4bf5-b608-5c68348e87ed/auto1.png)

上图中，屏幕顶部的几个按钮已被设为 Auto，只使用需要进行排列的空间量。

为槽尺寸选择 **Auto** 时，代表着控件需要特定量的空间以进行展示。Auto 将查看设为 auto 的每个控件子项，并决定每个子项的大小。 在数个空间需要在缩放框中进行缩放时，如设为 auto，缩放框则可查看每个子项并确定它们的缩放量，使其完全匹配。

正如其名，**Fill** 将尝试尽可能多地填充空间。 在下图中，我们已经上下排的按钮设为 Auto，而中间包含主菜单按钮的 **垂直框** 则设为 **Fill**。 照此设置后，垂直框将根据屏幕尺寸上下推动上下排的按钮。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3820ffc2-6027-4434-b2df-7c1f7a319a6a/auto2.png)

### 使用渲染变形

使用 **渲染变形（Render Transforms）** 影响特定控件的平移、缩放或其他设置时需谨慎。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75f85982-7712-43a6-9a75-e9f635c70acd/rendertransforms.png)

上图中，Render Transforms 下的 Scale 经过调整并由动画驱动，实现脉动效果。

渲染变形适用于临时变形（如控件动画），但执行永久变形效果不佳。 例如：需要放大控件尺寸时，使用 **缩放框** 包住控件即可，不必通过渲染变形调整比例。 缩放框执行布局缩放。而渲染变形（未作为布局部分进行计算）不会进行布局缩放，因此在针对不同分辨率进行缩放时无法正常进行，可能导致控件的不当缩放。

### 右键快捷菜单

在控件蓝图的 **Designer** 标签上，可 **右键单击** 层级中的控件，用另一控件将其包裹或替代。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cedcc45-24bf-468a-97ba-69d5eb5abbc7/rightclickhierarchy.png)

这样操作后即可简单快捷地切进和切出控件，而无需重新对资源设置父项子项。

也可在 **Details** 面板中 **右键单击** 属性进行复制/粘贴。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd0af183-92e7-4553-9e87-7f1bf04f8823/copyproptery.png)

在复制/粘贴按钮风格之类的资源时十分实用。

### Ctrl 拖动锚和控件

使用画布画板时，可长按 **Ctrl** 拖动锚（或从预设锚中进行选择），将锚和控件同时拖动到所需的位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/424666fb-16bd-4265-9418-a20575795586/anchordragging.png)

Ctrl 拖动锚/控件时，锚将自动放置到控件的左上方。

### 设计师预览背景

可在控件蓝图的 **Designer** 标签中设置预览图片，用作图表中的背景。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ccf2539-0af5-493d-9bea-96ad8579d73e/setpreviewbackground.png)

使用预览背景可确保将控件调整到正确的尺寸。

如要执行此操作，在 **层级** 中选中 **Root**，然后在 **Details** 下指定材质使用。

### 用户控件/重复使用内容

创建带有内容的控件蓝图时，其会被视为 **用户控件**。这些用户控件将显示在 **User Created** 部分下 **Designer** 标签的 **Palette** 窗口中，可像其他控件一样被拖放到图表中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a6fe2d4-5844-46b4-bedc-79354f3c23e6/userwidgets.png)

上图中，一个确认画面用户控件被添加到不同菜单画面中。

请在构建画面和内容时善加利用。如项目中部分功能使用频率较高，将其设为自身的控件（可放入任意其他控件）支持功能，无需在每次需要时植入每个区域。

### 优化

制作 UI 画面时可进行以下优化：

-   尽量为美术资源使用 **纹理**，尽量不使用 **材质**。
-   尽量使用 [事件驱动 UI](/documentation/zh-cn/unreal-engine/driving-ui-updates-with-events-in-unreal-engine) 更新，尽量不使用绑定或 Tick 事件。
-   使用 [无效化方框](/documentation/zh-cn/unreal-engine/using-the-invalidation-box-for-umg-in-unreal-engine) 缓存不常变化的控件。
-   使用 **控件反射器**（**Ctrl+Shift+W**）获取关于控件的信息和数据。

-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [目标分辨率和比例](/documentation/zh-cn/unreal-engine/umg-best-practices-in-unreal-engine#%E7%9B%AE%E6%A0%87%E5%88%86%E8%BE%A8%E7%8E%87%E5%92%8C%E6%AF%94%E4%BE%8B)
-   [创建 UMG 的美术效果](/documentation/zh-cn/unreal-engine/umg-best-practices-in-unreal-engine#%E5%88%9B%E5%BB%BAumg%E7%9A%84%E7%BE%8E%E6%9C%AF%E6%95%88%E6%9E%9C)
-   [提示和技巧](/documentation/zh-cn/unreal-engine/umg-best-practices-in-unreal-engine#%E6%8F%90%E7%A4%BA%E5%92%8C%E6%8A%80%E5%B7%A7)
-   [格式技巧](/documentation/zh-cn/unreal-engine/umg-best-practices-in-unreal-engine#%E6%A0%BC%E5%BC%8F%E6%8A%80%E5%B7%A7)
-   [使用渲染变形](/documentation/zh-cn/unreal-engine/umg-best-practices-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%B8%B2%E6%9F%93%E5%8F%98%E5%BD%A2)
-   [右键快捷菜单](/documentation/zh-cn/unreal-engine/umg-best-practices-in-unreal-engine#%E5%8F%B3%E9%94%AE%E5%BF%AB%E6%8D%B7%E8%8F%9C%E5%8D%95)
-   [Ctrl 拖动锚和控件](/documentation/zh-cn/unreal-engine/umg-best-practices-in-unreal-engine#ctrl%E6%8B%96%E5%8A%A8%E9%94%9A%E5%92%8C%E6%8E%A7%E4%BB%B6)
-   [设计师预览背景](/documentation/zh-cn/unreal-engine/umg-best-practices-in-unreal-engine#%E8%AE%BE%E8%AE%A1%E5%B8%88%E9%A2%84%E8%A7%88%E8%83%8C%E6%99%AF)
-   [用户控件/重复使用内容](/documentation/zh-cn/unreal-engine/umg-best-practices-in-unreal-engine#%E7%94%A8%E6%88%B7%E6%8E%A7%E4%BB%B6/%E9%87%8D%E5%A4%8D%E4%BD%BF%E7%94%A8%E5%86%85%E5%AE%B9)
-   [优化](/documentation/zh-cn/unreal-engine/umg-best-practices-in-unreal-engine#%E4%BC%98%E5%8C%96)
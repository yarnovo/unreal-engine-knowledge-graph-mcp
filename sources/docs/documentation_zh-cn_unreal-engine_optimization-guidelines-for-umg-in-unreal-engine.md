# 虚幻引擎中UMG的优化准则 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/optimization-guidelines-for-umg-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:19:28.103Z

---

目录

![优化准则](https://dev.epicgames.com/community/api/documentation/image/266b8b4d-6003-4427-b975-e00bf8e67e95?resizing_type=fill&width=1920&height=335)

在实时模拟和游戏中，相比用户界面（UI），渲染和Gameplay对于CPU、GPU和纹理内存的占用的需求明显更高。因此，分配给UI的性能预算通常少于其他系统，并且往往会在资源有限的设备上感受到这类预算约束。这便突显出尽可能高效地利用资源和尽可能减少UI资源消耗的重要性。

虽然你的UI需求取决于项目细节和目标平台，但在 **虚幻引擎（Unreal Engine）** 中使用 **Slate** 和 **UMG** 构建UI时，有一些优化准则可供你遵循。本页面概括介绍了这些最佳做法，其中包括：

-   优化功能，可降低你的性能占用。
-   有关CPU开销最大的控件的准则。
-   有关构建你的UMG布局时应予避免情况的信息。
-   UMG中不同动画方法CPU开销的概括介绍。

有关优化和分析的一般信息，请参阅以下页面：

-   [测试和优化你的内容](/documentation/zh-cn/unreal-engine/testing-and-optimizing-your-content)
-   [Unreal Insights](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)
-   [Unreal Slate Insights](/documentation/zh-cn/unreal-engine/slate-insights-in-unreal-engine)

## 无效

**无效（Invalidation）** 会缓存Slate控件的信息，然后监控它们是否发生令其绘制、布局或层级信息失效的变化。只要控件未发生变化，Slate就会退回到使用缓存信息，而不会重新绘制控件。当有变化令这些信息失效时，Slate会重新计算信息，并重新绘制控件。

虚幻引擎（Unreal Engine）支持采用以下这几种方法将无效（Invalidation）纳入你的UI：

-   无效框（Invalidation Box）缓存其子控件的信息。
-   全局无效（Global Invalidation）将整个 `Swindow` 视为一个无效框（Invalidation Box），因此会对你的整个UI应用无效（Invalidation）。
-   限位面板（Retainer Panel）将其子控件展平，形成单一纹理后再绘制它们，并提供用于配置它们的帧率或延迟渲染的选项。

无效（Invalidation）对不常变化的控件组最有效，能够将原本要以消耗内存为代价逐帧重新绘制控件的CPU负载有效地释放掉。应将逐帧变化的控件标记为 **易变（Volatile）**，以防止它们不必要地缓存信息，因为它们无论如何都会重新绘制每一帧。

有关这些系统的更多信息、系统实现方法的细节以及系统的局限性，请参阅[Slate和UMG中的无效（Invalidation）](/documentation/zh-cn/unreal-engine/invalidation-in-slate-and-umg-for-unreal-engine)。

## 编程和脚本编写

以下是在UMG环境内进行编程的最佳做法。

### 少用On-Tick或On-Paint逻辑

你应该尽可能避免在UI中使用On Tick或On Paint运行逻辑。事件分发器和委托可以帮助你创建响应特定事件的逻辑，不必依赖更新（Tick）。

### 使用事件驱动更新来替代绑定属性

当你将属性绑定到UI中的字段时，字段会逐帧轮询属性。例如，如果你将文本字段的文本值与整数绑定，每次更新时该进度条都会将整数的值赋值给该字段。这样做效率很低，所以你应该避免使用绑定属性。

![控件细节面板中的属性绑定示例。你应该避免执行此操作。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8dc0450a-3e78-46bc-af2f-3089b7a59c56/donotdothis.png)

切勿使用原始属性绑定。

相反，你应该将项目设置为在你的UI中调用函数和事件来更新这些字段。例如，不要将血条绑定到生命值（Health）属性上，而应在UI的蓝图脚本中调用一个 `OnHealthChanged` 事件来更改UI中的必要字段。

![在UI中使用事件更新生命值的示例。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ff41f74-0761-46b1-95b0-b0fba5fd96e1/eventdrivenexample.png)

一个用事件更新UI的示例。

虽然进行这些设置比较耗时，但可以确保UI只在值发生变化的那一帧发生变化，而不是逐帧发生变化。

## 加载和构造

以下是在运行时构造和生成控件的最佳做法。

### 尽可能减少未用控件

系统会加载并构造一个控件内的所有子项，无论子项是否可见。即使你的UI不渲染它们，它们也会占用内存，并有加载和构造时间需求。

你的UI设计师在初级阶段就应定期检查是否存在未用的控件，并将它们移除后再提交工作。定期清理将有助于保持条理性以及性能。

### 将复杂控件拆分成可以在运行时加载的片段

对一个大型系统来说，一个特别复杂的控件可能需要远超过1000个子项来处理它的所有功能，但只需要同时显示其中的几百个。在这些情况下，如果你要将整个控件作为一个大组件进行加载，就会有数以百计不活动的子项占据空间而得不到利用。根据这些子控件的专用化程度，用户可能花费数小时都看不到它们。

在这些情况下，你应该将自己的控件拆分成以下几类：

-   始终可见的控件。
    
-   必须尽快显示的控件。
    
-   可以承受在显示时略有延迟的控件。
    

凡是有快速响应时间需求的控件都应在后台加载，不显示时也要如此处理。例如，竞技射击游戏中的物品栏屏幕使用得非常频繁，由于其对玩家发挥着关键作用，应该响应迅速，因此最好将其保持在加载但不可见的状态。

凡是长时间不出现也没有快速响应需求的控件，都应该在运行时异步加载，并在消除时销毁。对于具有多样化功能的复杂控件，则可能需要一直保持基本控件的加载状态，但要根据模式或功能需求异步加载不同的子控件集。这可以节省大量内存并减少CPU对初始化的影响。

## 布局和定位

以下是在构建你的UI布局时提高控件效率的准则。

### 减少使用画布面板

**画布面板（Canvas Panel）** 是一个功能强大的容器控件，它可以使用坐标平面和每个控件的锚点来定位其他控件。如此一来，将控件精确定位在所需位置和保持控件与屏幕边角、边缘或中心的相对位置都变得轻而易举。

但画布面板的性能要求也较高。Slate中的绘制调用按控件的层ID分组。垂直框（Vertical Box）或水平框（Horizontal Box）等其他容器控件会将其子控件的层ID合并，从而减少绘制调用的数量。但画布面板会递增其子控件的ID，以便它们可以在必要时相互叠加渲染。这会造成画布面板使用多个绘制调用，并因此在CPU占用率上高于其他替代方案。

覆层面板也会递增其层ID，因此也会使用多个绘制调用。由于它们的使用范围比较有限，因此不太可能产生与画布面板相同的影响，但在使用覆层面板时也要牢记这一点。

使用一个画布面板来设置HUD或菜单系统的根控件布局应该不成问题，因为在这些情况下，你最可能的需求是详细定位或复杂的Z轴排序。但你应该避免使用画布面板来设置文本框、自定义按钮或其他模板化元素等个体自定义控件的布局。这会导致在你的UI的许多元素中深入嵌套多层画布面板，极其耗费资源。此外，若在多层中过度使用画布面板，会使人难以分辨你的UI中哪一层负责最终布局的决定性部分。

根据经验，如果你的控件由单一元素组成，则肯定不需要画布面板。即使是对于完整菜单和HUD，你通常也可以将 **覆层（Overlay）** 和 **尺寸框（Size Box）** 与 **水平框（Horizontal Box）**、**垂直框（Vertical Box）** 和 **网格框（Grid Box）** 结合使用来处理布局，从而完全避免使用画布面板。

### 尽可能使用隔离控件来替代尺寸框

尺寸框利用多次传递来计算其尺寸并自我渲染。如果你需要让内容在宽度和高度上占据一定的尺寸，**隔离控件（Spacer）** 的资源占用明显较低。

### 避免合并缩放框和尺寸框

如果你将 **缩放框（Scale Box）** 和尺寸框（Size Box）合并，它们会试图相互更新，陷入循环，导致每一帧都在两种尺寸之间快速切换。与其依赖其中任何一种，你不如尝试让布局的功能适应内容的原生尺寸。

### 少用富文本控件

**富文本控件** 提供可靠的文本格式设置，但由于添加了多种额外功能，与标准文本框相比资源占用率很高。如果你希望文本风格独特或具有表现力，但又不需要富文本的全部功能，应该选择或创建一种能够在默认情况下体现所需风格化感觉的字体，并退却到使用标准文本控件。

## 动画开销

可以通过几种方法在运行时为控件制作动画。处理无效（Invalidation）时，其中一些方法可能导致控件的布局失效，这会造成系统对层级的整个分支进行重新更新。下表列出了这些动画方法和它们在UMG中的相对CPU开销：

**开销**

**示例**

**无CPU开销/资源占用最低**

纯材质型动画。

**低CPU开销**

不需要Sequencer的蓝图脚本化动画。

**高CPU开销**

用UMG的动画编辑器制作的Sequencer动画。

**资源占用最高的CPU开销**

引发布局变化的动画。

纯材质型动画不产生CPU开销，因为这些动画由GPU处理。这些动画较适合用作循环动画，如发光效果、滚动背景或其他可以用材质变化来表现的效果。如果可以将动画纳入到材质中，你应该优先采用这种方法。

UMG的动画编辑器是Sequencer的实现。凡是改变非变换属性（如颜色）的Sequencer动画，都需要重新绘制控件，但不会使布局失效。凡是引起渲染变换变化的动画，都会导致布局失效，进而需要在动画改变控件时逐帧重新计算布局。你应该避免这种情况，或者将所有需要这种动画的控件标记为易变（Volatile）。

蓝图脚本化动画和Sequencer动画的运行开销大致相当，但Sequencer动画必须先初始化一个动画对象，并解析动画所负责的属性路径，才能开始制作动画。这意味着Sequencer动画会产生启动开销，而蓝图脚本化动画则不会。因此，当你处理动画伤害数字等常用的简短动画时，应该避免使用Sequencer，而是依靠蓝图脚本化Tween。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [user interface](https://dev.epicgames.com/community/search?query=user%20interface)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [umg](https://dev.epicgames.com/community/search?query=umg)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [无效](/documentation/zh-cn/unreal-engine/optimization-guidelines-for-umg-in-unreal-engine#%E6%97%A0%E6%95%88)
-   [编程和脚本编写](/documentation/zh-cn/unreal-engine/optimization-guidelines-for-umg-in-unreal-engine#%E7%BC%96%E7%A8%8B%E5%92%8C%E8%84%9A%E6%9C%AC%E7%BC%96%E5%86%99)
-   [少用On-Tick或On-Paint逻辑](/documentation/zh-cn/unreal-engine/optimization-guidelines-for-umg-in-unreal-engine#%E5%B0%91%E7%94%A8on-tick%E6%88%96on-paint%E9%80%BB%E8%BE%91)
-   [使用事件驱动更新来替代绑定属性](/documentation/zh-cn/unreal-engine/optimization-guidelines-for-umg-in-unreal-engine#%E4%BD%BF%E7%94%A8%E4%BA%8B%E4%BB%B6%E9%A9%B1%E5%8A%A8%E6%9B%B4%E6%96%B0%E6%9D%A5%E6%9B%BF%E4%BB%A3%E7%BB%91%E5%AE%9A%E5%B1%9E%E6%80%A7)
-   [加载和构造](/documentation/zh-cn/unreal-engine/optimization-guidelines-for-umg-in-unreal-engine#%E5%8A%A0%E8%BD%BD%E5%92%8C%E6%9E%84%E9%80%A0)
-   [尽可能减少未用控件](/documentation/zh-cn/unreal-engine/optimization-guidelines-for-umg-in-unreal-engine#%E5%B0%BD%E5%8F%AF%E8%83%BD%E5%87%8F%E5%B0%91%E6%9C%AA%E7%94%A8%E6%8E%A7%E4%BB%B6)
-   [将复杂控件拆分成可以在运行时加载的片段](/documentation/zh-cn/unreal-engine/optimization-guidelines-for-umg-in-unreal-engine#%E5%B0%86%E5%A4%8D%E6%9D%82%E6%8E%A7%E4%BB%B6%E6%8B%86%E5%88%86%E6%88%90%E5%8F%AF%E4%BB%A5%E5%9C%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E5%8A%A0%E8%BD%BD%E7%9A%84%E7%89%87%E6%AE%B5)
-   [布局和定位](/documentation/zh-cn/unreal-engine/optimization-guidelines-for-umg-in-unreal-engine#%E5%B8%83%E5%B1%80%E5%92%8C%E5%AE%9A%E4%BD%8D)
-   [减少使用画布面板](/documentation/zh-cn/unreal-engine/optimization-guidelines-for-umg-in-unreal-engine#%E5%87%8F%E5%B0%91%E4%BD%BF%E7%94%A8%E7%94%BB%E5%B8%83%E9%9D%A2%E6%9D%BF)
-   [尽可能使用隔离控件来替代尺寸框](/documentation/zh-cn/unreal-engine/optimization-guidelines-for-umg-in-unreal-engine#%E5%B0%BD%E5%8F%AF%E8%83%BD%E4%BD%BF%E7%94%A8%E9%9A%94%E7%A6%BB%E6%8E%A7%E4%BB%B6%E6%9D%A5%E6%9B%BF%E4%BB%A3%E5%B0%BA%E5%AF%B8%E6%A1%86)
-   [避免合并缩放框和尺寸框](/documentation/zh-cn/unreal-engine/optimization-guidelines-for-umg-in-unreal-engine#%E9%81%BF%E5%85%8D%E5%90%88%E5%B9%B6%E7%BC%A9%E6%94%BE%E6%A1%86%E5%92%8C%E5%B0%BA%E5%AF%B8%E6%A1%86)
-   [少用富文本控件](/documentation/zh-cn/unreal-engine/optimization-guidelines-for-umg-in-unreal-engine#%E5%B0%91%E7%94%A8%E5%AF%8C%E6%96%87%E6%9C%AC%E6%8E%A7%E4%BB%B6)
-   [动画开销](/documentation/zh-cn/unreal-engine/optimization-guidelines-for-umg-in-unreal-engine#%E5%8A%A8%E7%94%BB%E5%BC%80%E9%94%80)

相关文档

[

测试并优化你的内容

![测试并优化你的内容](https://dev.epicgames.com/community/api/documentation/image/08e147b7-4ad0-4a64-9a37-0d05286faa85?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/testing-and-optimizing-your-content)

[

Unreal Insights

![Unreal Insights](https://dev.epicgames.com/community/api/documentation/image/f3818740-1216-4fbb-bff6-249ed0ed43ef?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)

[

Slate Insights概述

![Slate Insights概述](https://dev.epicgames.com/community/api/documentation/image/4fedd149-bfbf-41f4-bc45-c87314d3add6?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/slate-insights-in-unreal-engine)

[

UI无效化

![UI无效化](https://dev.epicgames.com/community/api/documentation/image/7bce77e7-baf2-4d74-a601-d121cce3c64d?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/invalidation-in-slate-and-umg-for-unreal-engine)
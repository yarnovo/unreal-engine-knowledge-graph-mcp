# 理解虚幻引擎Slate 架构 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:18:22.964Z

---

目录

![Slate 架构](https://dev.epicgames.com/community/api/documentation/image/807a118d-1cbf-4060-9e04-beb6b9d3623b?resizing_type=fill&width=1920&height=335)

## 如何阅读此页

本页探讨了 **Slate** 的核心设计理念。探讨内容未按特定顺序排序。 本文没有死板的框架，也没有空洞的大道理；有的只是在 UI 完善过程中收集到的 点点滴滴。

对 Slate 的了解愈发深入后，重读此页会获得更多启发。

## 初衷

Slate 的初衷来自对现有可用 UI 解决方案的审视。 部分结论如下：

-   在多数工具包中从控件构建 UI 已非难处。而难处在于：
    -   UI 设计和迭代。
    -   控制数据流：通常视为控件（视图）和基层数据（模型）之间的绑定。
    -   学习描述 UI 的其他语言。
-   IMGUI：直接模式图形用户界面
    -   优点：
        -   程序员喜欢 UI 描述"接近"代码，易于获取数据。
        -   失效不会成为问题，直接轮询数据即可。
        -   易于程序化构建界面。
    -   缺点：
        -   添加动画和设计较难。
        -   UI 描述为命令式代码，因此无法将其设为数据驱动。
-   所需的 Slate 特性：
    -   易于访问模型的代码和数据。
    -   支持程序化 UI 生成。
    -   UI 描述不易出错。
    -   支持动画和设计。

## 核心原则

设计旨在尽量提高开发效率。程序员的时间很宝贵；CPU 快速且开销较低。

-   防止不透明缓存和重复状态。以往，UI 缓存状态并要求显式失效。Slate 使用以下方法（按优先到非优先排列）：
    1.  轮询
    2.  透明缓存
    3.  带粗粒度失效的不透明缓存
-   UI 结构变化时优先轮询到通知。（需要通知时，优先粗粒度通知到细粒度通知。）
-   放置反馈循环。举例而言，所有布局均从程序员设置计算，不会依赖于之前的布局状态。
    -   UI 状态成为模型是唯一的例外。例如滚动条可见 UI 状态。
    -   操作目的是针对正确性和程序完整性，而非性能。
-   为需要大量一次性操作的凌乱 ad-hoc 式 UI 做好计划。理解使用情况后，将它们归纳到一个较好的系统中。

## 轮询数据流和委托

UI 可见并操纵模型。Slate 使用委托作为控件（需要读写模型数据的控件）的可变导管。Slate 控件在需要显示时读取模型的数据。 用户执行操作时，Slate 控件调用写委托修改数据。

考虑使用 **STextBlock**，它显示文本的 Slate 控件。 必须告知 STextBlock 在何处获取数据进行显示。 数据可被静态设置。然而可使用委托（用户指定的一个函数）更灵活地完成。 为此，STextBlock 使用一个名为 **Text** 的委托。

![Diagram showing relationship between float data and STextBlock](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb013691-c022-450a-b5ec-df3b1054aaa3/stextblock.png)

STextBlock 将帧率作为字符串读取。

考虑到上例中文本为一个字符串，而帧率很可能被存储为一个 `浮点` 或一个 `整数`。使用委托后，即可灵活地在数值读取时执行转换。 这会马上出现性能问题，下方的 [性能注意事项](/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine#%E6%80%A7%E8%83%BD%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9) 部分会说明解决方法。

**SEditableText** 是负责输入和输出的 Slate 控件。和 STextBlock 一样，它使用 Text 委托显示数据。 用户在可编辑的文本框中输入文本，按下 Enter 键后 SEditableText 便会调用 **OnTextChanged** 委托。 前提是程序员已将适用于验证输入和改变模型数据的功能附加到 OnTextChanged。

![Diagram showing two-way relationship between SEditableText and text data](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/abcc1dcb-8925-4785-93a7-5e764d7b83db/seditabletext.png)

SEditable text 读取物体名称。用户按下 Enter 键后，新文本会被发送到 OnTextChanged 进行验证并指定到物体名（如符合）。

下一帧中，SEditableText 将读取模型的数据。在上例中，`物体名` 将由 OnTextChanged 委托进行改变，并通过 Text 委托读取显示。

### 属性和参数

委托并非万能。取决于使用情况，Slate 控件的参数可能需要是常量值或函数。 我们通过 **TAttribute< T >** 类封装此概念。属性可被设为常量或委托。

## 性能注意事项

完成 [轮询数据流和委托](/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine#%E8%BD%AE%E8%AF%A2%E6%95%B0%E6%8D%AE%E6%B5%81%E5%92%8C%E5%A7%94%E6%89%98) 部分的阅读后，你可能会对性能有所担忧。

注意以下几种情况：

-   UI 复杂度受限于活动控件的数量。
-   滚动内容可随时进行虚拟化，可尽量避免活动控件出屏。
    -   大量控件出屏容易使 Slate 性能受限。
-   假定：大屏幕用户的机器性能强劲，可处理大量控件。

## 失效 vs 轮询

有时轮询非性能，或功能不正常。非浅显值无法作为简单浅显值的组合进行表达时这种情况尤为常见。 在模型结构变化较大时通常需要使其失效。然后即可废弃现有 UI 并重新创建。 然而执行此操作会出现状态丢失，因此只能在必要时使用。

原则上，失效预留给低频、粗粒度事件。

将在图表上显示节点的蓝图编辑器作为范例考虑。 请求一个更新后，所有 **Graph** 面板控件将被清除和重新创建。 因其简单且易于维护，在细粒度失效中更为可取。

## 子槽

所有 Slate 控件均在子槽中存储子项。（并非存储子控件的纯阵列。） 子槽固定存储有效控件。它们默认存储 **SNullWidget**，这是不带显示和交互的控件。 每类控件均可声明满足其自身特定需求的子槽类型。 **SVerticalSlot** 排列其子项的方式与 **Scanvas** 截然不同，与 SUniformGridPanel 相差甚远。 槽使每种面板要求一套影响子项排列的子项设置。

## 控件类型

控件有三种类型。

-   **叶控件** - 不带子槽的控件。如显示一块文本的 STextBlock。其原生便了解如何绘制文本。
-   **面板** - 子槽数量为动态的控件。如垂直排列任意数量子项，形成一些布局规则的 **SVerticalBox**。
-   **合成控件** - 子槽显式命名、数量固定的控件。如拥有一个名为 Content 的槽（包含按钮中所有控件）的 **SButton**。

## 布局

Slate 布局在两个通道中完成。分解为两个通道是一种优化，但遗憾的是并非为透明。

1.  通道 1：**Cache Desired Size** - 相关函数为 **SWidget::CacheDesiredSize** 和 **SWidget::ComputeDesiredSize**
2.  通道 2：**ArrangeChildren** - 相关函数为 **SWidget::ArrangeChildren**

详细说明：

#### 通道 1：Cache Desired Size

此通道的作用是明确每个控件需要占据的控件。 将要求不含子项的控件（即叶控件）基于其本质属性计算和缓存其所需的大小。 组合其他控件的控件（即合成控件和面板）使用特殊逻辑决定其所需的大小（作为其子项大小的函数）。 注意：只要求每种控件实现 **ComputeDesiredSize()**；缓存和遍历逻辑由 Slate 实现。 Slate 将确保 ComputeDesiredSize() 在控件上被调用时其子项已计算并缓存其所需的大小。 因此这是一个自下而上的通道。

在下例中查看排列两个子项的水平框 — 一块文本和一张图片。

![Diagram showing a horizontal box that arranges two children](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3086dddf-703d-4661-ac50-9a359a9bba95/cachesize.png)

一个水平框排列两个子项 — 一个文本段和一张图片。

STextBlock 控件将通过测量显示的字符串来计算其所需的大小。 Simage 控件将基于其显示的图片数据确定大小。假定文本段中的文本需要 14 个 slate 空间单位， 图片需要 8 个单位。水平面板水平排列控件， 因此需要 22（14 + 8）个空间单位。

#### 通道 2：ArrangeChildren

ArrangeChildren 是自上而下的通道。Slate 从顶层窗口开始并要求每个窗口基于程序员所提供的约束对子项进行排列。 为每个已知子项分配空间后，Slate 便会递归，排列子项的子项。 递归将持续进行，直到所有子项均已排列。

![Diagram showing a horizontal panel arranging two children](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/30c8028b-f90a-4d3e-92e5-1caf55581329/arrangechildren.png)

一个水平面板排列两个子项，一个文本段和一张图片。

在上例中，面板的父项为其分配了 25 个单位。 第一个槽说明面板希望使用子项的所需大小，获得了 14 个空间单位的分配。 第二个槽说明面板希望填充可用的宽度，获得了 11 个空间单位的分配。 注意：在实际的 SHorizontalBox 控件中，其槽中 Simage 的对齐由 **Halign** 属性掌管， 可为向左对齐、居中对齐、向右对齐、或填充。

在操作中，Slate 不会执行完整的 ArrangeChildren 通道。而此功能用于实现其他功能。 主要用于命中检测和绘制。

## 绘制 Slate：OnPaint

在绘制通道中，Slate 在所有可见控件上迭代并生成一个绘制元素列表。这些元素将被渲染系统所消耗。 此列表每帧重新生成。

从顶层窗口开始，沿层级向下递归，将每个控件的绘制元素附加到绘制列表。 绘制中控件通常会执行两个操作：输出实际的绘制元素，或辨明子控件应所处的位置，并要求子控件对其自身进行绘制。 因此，我们可将简化的整体 **OnPaint** 函数视为：

```cpp
.	// 排列的子项是控件和它分配到的几何空间
.	struct ArrangedChild
.	{
.		Widget;
.		Geometry;
.	};
.	
.	OutputElements OnPaint( AllottedGeometry )
.	{
.		// 为所有子项给定分配的几何空间
.		Array<ArrangedChild> ArrangedChildren = ArrangeChildrenGiven( AllottedGeometry );
.	
.		// 绘制子项
.		for each ( Child in ArrangedChildren )
.		{
.			OutputElements.Append( Child.Widget.OnPaint( Child.Geometry ) );
.		}
.	
.		// 绘制边界
.		OutputElements.Append( DrawBorder() );
.	}
```

## SWidget 剖析

定义 Slate 中 SWidget 行为的关键函数为：

-   ComputeDesiredSize() - 负责所需的大小。
-   ArrangeChildren() - 负责父项分配区域中的子项排列。
-   OnPaint() - 负责外观。
-   Event handlers - 它们的形式为 OnSomething。Slate 将在特定时机在控件上调用这些函数。

## 合成

合成的概念是 — 任意槽均可包含任意控件内容。 这可为 Slate 用户带来较大的灵活度。必要时， 合成可在核心 Slate 控件中随时使用。

如需要控件将字符串参数用作标签，可以考虑是否使用 SWidget 会更好。

特定的使用情况通常要求控件包含特定类型的子项，此时不再遵循合成的要求。 它们不可成为 slate 核心中的控件， 但应成为域特定的控件（无法在此域之外再使用）。

## 声明式语法

我们需要直接从代码访问 Slate。 经验是我们需要声明式语言来描述 UI， 但也希望它在编译时被检查，以便绑定到 C++ 函数。

解决方案是构建一个声明式 UI 描述语言（作为 C++ 子集）。

基本代码中有大量范例。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [slate](https://dev.epicgames.com/community/search?query=slate)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [如何阅读此页](/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine#%E5%A6%82%E4%BD%95%E9%98%85%E8%AF%BB%E6%AD%A4%E9%A1%B5)
-   [初衷](/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine#%E5%88%9D%E8%A1%B7)
-   [核心原则](/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine#%E6%A0%B8%E5%BF%83%E5%8E%9F%E5%88%99)
-   [轮询数据流和委托](/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine#%E8%BD%AE%E8%AF%A2%E6%95%B0%E6%8D%AE%E6%B5%81%E5%92%8C%E5%A7%94%E6%89%98)
-   [属性和参数](/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine#%E5%B1%9E%E6%80%A7%E5%92%8C%E5%8F%82%E6%95%B0)
-   [性能注意事项](/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine#%E6%80%A7%E8%83%BD%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
-   [失效 vs 轮询](/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine#%E5%A4%B1%E6%95%88vs%E8%BD%AE%E8%AF%A2)
-   [子槽](/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine#%E5%AD%90%E6%A7%BD)
-   [控件类型](/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine#%E6%8E%A7%E4%BB%B6%E7%B1%BB%E5%9E%8B)
-   [布局](/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine#%E5%B8%83%E5%B1%80)
-   [通道 1：Cache Desired Size](/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine#%E9%80%9A%E9%81%931%EF%BC%9Acachedesiredsize)
-   [通道 2：ArrangeChildren](/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine#%E9%80%9A%E9%81%932%EF%BC%9Aarrangechildren)
-   [绘制 Slate：OnPaint](/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine#%E7%BB%98%E5%88%B6slate%EF%BC%9Aonpaint)
-   [SWidget 剖析](/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine#swidget%E5%89%96%E6%9E%90)
-   [合成](/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine#%E5%90%88%E6%88%90)
-   [声明式语法](/documentation/zh-cn/unreal-engine/understanding-the-slate-ui-architecture-in-unreal-engine#%E5%A3%B0%E6%98%8E%E5%BC%8F%E8%AF%AD%E6%B3%95)
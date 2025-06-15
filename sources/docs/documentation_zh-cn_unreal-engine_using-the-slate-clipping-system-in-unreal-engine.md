# 使用虚幻引擎Slate 裁剪系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-slate-clipping-system-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:18:26.467Z

---

目录

![Slate裁剪系统](https://dev.epicgames.com/community/api/documentation/image/71fcbfd0-6214-4fbc-9c1c-1b081ddb1ae2?resizing_type=fill&width=1920&height=335)

**虚幻引擎（UE）** 的 Slate 裁剪系统可将图像或文本限制到画面的一个区域中。其实现方式是围绕创建的物体和面板创建一个裁剪矩形（或称裁剪 rect）。编辑器和 UMG UI 设计器工具均使用该系统。用户可根据需求利用 Slate 在编辑器中移动面板并调整其大小，裁剪系统则将文字和图像限制在裁剪矩形区域中。结合 UMG 可实现更佳的渲染变形，对 UI 进行适当的裁剪。

## 裁剪系统重制

虚幻引擎 4.17 版本对裁剪系统进行了极大修改，比旧版本更灵活。这也创造了给更多可能，使 [UMG](/documentation/zh-cn/unreal-engine/specialized-blueprint-visual-scripting-node-groups-in-unreal-engine) 之类的工具系统能够添加更多渲染效果，用于项目的 UI 中。旧版本中的裁剪系统功能有限，布局空间仅为轴对齐，会导致难以渲染变形（常围绕边缘），如下例所示：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bc669f1-977f-46b6-beee-21a3e3a24ccf/oldclippingissue1.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb23efa5-6ed1-46ec-b24d-0e1d78b4768c/oldclippingissue2.png)

在上图中，控件已旋转，但裁剪 rect（白点）却并未旋转。这样一来，即使图像位于 Canvas 面板边界中，也无法被渲染。

以下列表说明了裁剪系统 1.0 和 2.0 版本之间的区别：

Clipping 1.0（4.16 及更旧版本）

Clipping 2.0（4.17 及更新版本）

-   轴对齐裁剪 - 只在布局空间中发挥作用
-   每个控件均被裁剪
-   所有裁剪均在像素着色器中完成（要求每个顶点六个浮点）
-   允许对多个裁剪 rect 进行批处理，因为这些 rect 是批数据的一部分
-   渲染变形较为"特殊"，因为它们允许在父项所提供的裁剪 rect 之外进行渲染，而布局 rect 被裁剪掉后会存在不良后果

-   任意四边形的裁剪
    
    -   使用 Scissor Rects 进行裁剪的轴对齐裁剪区，可避免不必要的像素着色器运算
    -   复杂的裁剪区使用模板缓存将裁剪区的任意堆叠组成模板缓存，然后用于裁剪绘制调用
-   只有少数几个控件会（默认）进行裁剪，主要是滚动面板和可编辑文本域
    
    -   渲染变形不再"特殊"，只要变形不进行裁剪，便允许用户在另一个控件之外进行渲染。
-   Slate 无法对裁剪区进行批处理。这使得 Slate 顶点格式中不要求 6 个浮点，不再需要在像素着色器中进行裁剪
    

新系统支持在控件的渲染空间中进行裁剪，不需要轴对齐；使用系统时不再需要担心裁剪问题（左图），而是会直接裁剪掉最外侧的控件。新版本中，应用到内部控件的变形将在边缘被正确裁剪（右图）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9ae2387-e737-4a2c-8802-9534f16bf21e/clippingold.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94524bd4-5357-4384-ab97-2f6ec9edfe2e/clippingnew.png)

4.16 与更旧版本中的裁剪和变形。

在 4.17 与更新版本中应用到边缘上的裁剪，以及子项的变形。

多数情况下你都无需担心控件裁剪状态的变化。以游戏 UI 为例，你无需调整 UMG 中的控件，而多数情况下都需要对其进行修改，如滚动面板或编辑器，在这些区域中用户无法控制文本长度，需要对其进行裁剪，调整窗口或面板某个部分的大小。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46f628d2-336d-45ca-8c5a-c279b63b4c24/clippingexamples.png)

此处的几个例子说明了不同裁剪设置的效果：

-   左图 - 按键或文本上未启用裁剪。
-   中图 - 文本上已启用裁剪。
-   右图 - 按键上已启用裁剪。

请参考裁剪应用到不同对象上时的变化。因为系统裁剪到边界，所以填补之类的因素此处无需考虑。如果按键启用裁剪（右图），那么内容将在切断发生之前向边缘移动。如果文本负责处理裁剪（中图），那么文本将基于按键内容填补之类进行裁剪，缩减文本填入的空间。

除简单的轴对齐裁剪外，系统还支持相互堆叠的任意裁剪四边形。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/590308bf-7bac-4874-aaa1-9e218b37ffec/transformclipping.png)

举一个较为极端的例子，组合多个任意矩形是使用 3D 变形和投射的先决条件，因为被投射裁剪的控件需要在投射空间中执行裁剪。

## 从 4.16 及更旧版本转换到 4.17 及更新版本的指南

4.17 版本中对 Slate 裁剪系统进行的修改会破坏对旧版本的兼容性，因此你需要根据以下部分的说明来更新项目，避免出现转换问题，同时了解在项目中对控件进行调试的新方法。

### 启用控件裁剪

对于所有 UMG 控件而言，用户可以调整所选控件 **Details** 面板中的 **Clipping** 属性。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/030b9dfe-ec85-40b1-afd1-9508ff95ba7c/umgclippingproperty.png)

你可在此了解关于 [用 UMG UI 设计器进行裁剪](/documentation/zh-cn/unreal-engine/clipping-for-umg-widgets-in-unreal-engine) 的更多内容。

如需在代码中启用裁剪，需要将 `EWidgetClipping` 的裁剪属性设为以下其中一个状态：

-   Inherit
-   ClipToBounds
-   ClipToBoundsWithoutIntersecting
-   ClipToBoundsAlways
-   OnDemand

请参考以下代码范例：

```cpp
	SNew( SBorder )
	.Clipping(EWidgetClipping::ClipToBounds)
	[
		...
	]
```

### 弃用的 API

以下 API 在 4.16 之后的版本中弃用。如果你的项目曾使用这些 API，则需要考虑现在是否仍然需要它们。 并非每个控件都执行裁剪，因此你也许不再需要那些用于移动裁剪区的代码。

-   `FSlateDrawElement::Make___(...)` - 无需再将裁剪 rect 传入每个绘制调用，因此只需要移除函数调用即可自动使用新版本。
-   `SScissorRectBox` - 这已不再需要，因为每个轴对齐的裁剪 rect 现在均是 scissor rect。使其最直接的子控件启用裁剪，将这些内容删除并替换之前进行的任务。

### 自定义裁剪

在一些情况下你可能需要在控件内部进行裁剪。举例而言，`SProgressBar` 可能需要基于进度条的进度对任意位置的进度条绘制进行裁剪。添加裁剪需要在 `OnPaint` 中执行以下操作：

```cpp
	OutDrawElements.PushClip(FSlateClippingZone(AllottedGeometry));

	//TODO 在此进行绘制，否则将调用子控件绘制。

	OutDrawElements.PopClip();
```

`FSlateClippingZone` 是窗口空间中的任意裁剪区域，可使用数种方法开启，对已有代码进行直接转换。

如果还需要自定义裁剪影响 Hit Testing，则需要进行以下设置，将裁剪区推到 Hit Test Grid 上：

```cpp
	OutDrawElements.PushClip(FSlateClippingZone(AllottedGeometry));
	Args.GetGrid().PushClip(FSlateClippingZone(GetCachedGeometry()));

	//TODO 在此进行绘制，否则将调用子控件绘制。

	OutDrawElements.PopClip();
	Args.GetGrid().PopClip();
```

命中测试网格的裁剪 rect 使用缓存的几何体，而并非 AllotedGeometry。在 `OnPaint` 中，`AllotedGeometry` 处于窗口空间中，而 Hit Test Grid 处于桌面空间中，因此必须使用 Tick 中获得的几何体。

### 包裹裁剪状态

在一些情况下，拥有裁剪状态的控件不负责进行裁剪。例如 `SScrollBox` 能让用户公开修改和其他控件相似的裁剪状态，然而当 `SScrollBox` 构造后，它会把 `bClippingProxy` 设为 `true`。因此 Slate 渲染此控件时将忽略其裁剪状态。

在内部，`SScrollBox` 告知另一个嵌套控件其需要进行裁剪或执行被告知的裁剪状态。此外，用户修改裁剪状态时，`SScrollBox` 将覆盖名为 `OnClippingChanged` 的 `SWidget` 函数，使其了解合适将新的裁剪状态镜像到嵌套私有控件上。

## 剔除修改

虽然裁剪在渲染空间中执行，引擎仍然使用简单的边界框执行剔除。然而该框是基于渲染变形裁剪区的边界框。此外，裁剪和剔除可能随时间出现更多细微差别。如果你有一个自定义面板，执行 `MyClippingRect.IntersectionWith` 识别并剔除无法被绘制的控件，则需要使用 `SWidget` 函数 `IsChildWidgetCulled`。请参考下例：

```cpp
	for (int32 ChildIndex = 0; ChildIndex < ArrangedChildren.Num(); ++ChildIndex)
	{
		FArrangedWidget& CurWidget = ArrangedChildren[ChildIndex];

		if (!IsChildWidgetCulled(MyCullingRect, CurWidget))
		{
			// 绘制此控件。
		}
	}
```

将 `MyClippingRect` 纳入 OnPaint 调用之处都需要被重命名为 `MyCullingRect`。

虽然裁剪系统有所修改，但 Slate 的剔除方法仍未改变。你需要注意，如果下例中的父控件（蓝色）在裁剪区（绿色）外被剔除，则子控件（黄色）也将被剔除。即使其拥有变形，能够在父项边界外进行整体渲染，也同样如此。裁剪属性 **Clip to Bounds - Without Intersecting** 启用时情况也是如此，因为标记只会被直接的父控件所勾选。

![裁剪区域之外的控件。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4562ca0c-3de8-4b9f-860b-a8545199d4ba/slate_cullinged.png)

![裁剪区域之外的控件被裁剪。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/223dd8b1-0ac2-4d66-aa9f-198b4d99f284/slate_cullinged2.png)

裁剪区域之外的控件。

裁剪区域之外的控件被裁剪。

## 调试裁剪

**Widget Reflector** 在编辑器中显示所选控件的裁剪状态。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a6d65ce-2f65-4ab3-b8d1-104b238fd638/widgetreflector.png)

使用 Widget Reflector 选中一个文本块，说明裁剪状态被设为 On Demand。

打开 **Widget Reflector** 的方法是：前往 File 菜单，选择 **Window** > **Developer Tools** > **Widget Reflector**。

以下控制台变量可用于调试编辑器中任意控件的裁剪和剔除状态：

控制台变量

描述

**Slate.ShowClipping**

启用后，这将显示所有轴对齐裁剪 rect（Scissor Rects）的黄色轮廓，以及全部模板裁剪四边形的红色轮廓。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d7c6923-353f-4507-95f8-dc7566732c7e/showclipping.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d7c6923-353f-4507-95f8-dc7566732c7e/showclipping.png)

点击图片查看全图。

**Slate.DebugCulling**

启用后，这将有助于你更好地理解剔除在面板中的工作原理，以及其未能正常工作的原因。它在 GPU 上禁用裁剪，但一切均照常进行，因此你能够看到所有内容在裁剪区边界外渲染，并确定它们是否根据需求被剔除。

**Slate.EnableDrawEvents**

启用后，绘制事件将被启用。对 RenderDoc 或相似内容进行调试时便更容易理解批处理或裁剪状态转换。使用调试版本时此变量默认启用。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [slate](https://dev.epicgames.com/community/search?query=slate)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [裁剪系统重制](/documentation/zh-cn/unreal-engine/using-the-slate-clipping-system-in-unreal-engine#%E8%A3%81%E5%89%AA%E7%B3%BB%E7%BB%9F%E9%87%8D%E5%88%B6)
-   [从 4.16 及更旧版本转换到 4.17 及更新版本的指南](/documentation/zh-cn/unreal-engine/using-the-slate-clipping-system-in-unreal-engine#%E4%BB%8E416%E5%8F%8A%E6%9B%B4%E6%97%A7%E7%89%88%E6%9C%AC%E8%BD%AC%E6%8D%A2%E5%88%B0417%E5%8F%8A%E6%9B%B4%E6%96%B0%E7%89%88%E6%9C%AC%E7%9A%84%E6%8C%87%E5%8D%97)
-   [启用控件裁剪](/documentation/zh-cn/unreal-engine/using-the-slate-clipping-system-in-unreal-engine#%E5%90%AF%E7%94%A8%E6%8E%A7%E4%BB%B6%E8%A3%81%E5%89%AA)
-   [弃用的 API](/documentation/zh-cn/unreal-engine/using-the-slate-clipping-system-in-unreal-engine#%E5%BC%83%E7%94%A8%E7%9A%84api)
-   [自定义裁剪](/documentation/zh-cn/unreal-engine/using-the-slate-clipping-system-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A3%81%E5%89%AA)
-   [包裹裁剪状态](/documentation/zh-cn/unreal-engine/using-the-slate-clipping-system-in-unreal-engine#%E5%8C%85%E8%A3%B9%E8%A3%81%E5%89%AA%E7%8A%B6%E6%80%81)
-   [剔除修改](/documentation/zh-cn/unreal-engine/using-the-slate-clipping-system-in-unreal-engine#%E5%89%94%E9%99%A4%E4%BF%AE%E6%94%B9)
-   [调试裁剪](/documentation/zh-cn/unreal-engine/using-the-slate-clipping-system-in-unreal-engine#%E8%B0%83%E8%AF%95%E8%A3%81%E5%89%AA)
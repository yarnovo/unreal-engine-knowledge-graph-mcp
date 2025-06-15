# 虚幻引擎Slate概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/slate-overview-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:18:24.766Z

---

目录

![Slate概述](https://dev.epicgames.com/community/api/documentation/image/774c845f-b479-4aec-93d4-2280261e749d?resizing_type=fill&width=1920&height=335)

![Unreal Editor is built with the Slate UI framework](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f822e07-0d93-41eb-b1c7-3eead0b8cfa7/editor.png)

**Slate** 是完全自定义、与平台无关的用户界面框架，旨在让工具和应用程序（比如虚幻编辑器）的用户界面或游戏中用户界面的构建过程变得有趣、高效。它将声明性语法与轻松设计、布局和风格组件的功能相结合，允许在UI上轻松实现创建和迭代。

Slate UI解决方案使得为工具和应用程序组合图形用户界面和快速迭代这些界面变得极其简单。

## 声明性语法

Slate的声明性语法使得程序员可以访问构建UI，而无需添加间接层。提供了一组完整的宏来简化声明和创建新控件的过程。

```cpp
	SLATE_BEGIN_ARGS( SSubMenuButton )
		: _ShouldAppearHovered( false )
		{}
		/** 将显示在按钮上的标签 */
		SLATE_ATTRIBUTE( FString, Label )
		/** 单击按钮时调用 */
		SLATE_EVENT( FOnClicked, OnClicked )
		/** 将放置在按钮上的内容 */
		SLATE_NAMED_SLOT( FArguments, FSimpleSlot, Content )
		/** 在悬停状态下是否应显示按钮 */
		SLATE_ATTRIBUTE( bool, ShouldAppearHovered )
	SLATE_END_ARGS()
```

## 合成

Slate的合成框架使得快速重新排列UI元素以进行原型和迭代变得简单。

下面是正在合成的UI的一部分的示例：

```cpp
	// 为静态网格体添加一个新的部分
	ContextualEditingWidget->AddSlot()
	.Padding( 2.0f )
	[
		SNew( SDetailSection )
		.SectionName("StaticMeshSection")
		.SectionTitle( LOCTEXT("StaticMeshSection", "Static Mesh").ToString() )
		.Content()
		[
			SNew( SVerticalBox )
			+ SVerticalBox::Slot()
			.Padding( 3.0f, 1.0f )
			[
				SNew( SHorizontalBox )
				+ SHorizontalBox::Slot()
				.Padding( 2.0f )
				[
					SNew( SComboButton )
					.ButtonContent()
					[
						SNew( STextBlock )
						.Text( LOCTEXT("BlockingVolumeMenu", "Create Blocking Volume") )
						.Font( FontInfo )
					]
					.MenuContent()
					[
						BlockingVolumeBuilder.MakeWidget()
					]
				]
			]

		]
	];

```

上面的合成创建以下UI元素：

![Rendered UI](Slate_composition.png)

## 风格

可以创建风格并将它们应用于控件的各个部分。这使得迭代UI中组件的外观以及共享和重复使用风格变得很容易。

```cpp
	// 工具栏
	{
		Set( "ToolBar.Background", FSlateBoxBrush( TEXT("Common/GroupBorder"), FMargin(4.0f/16.0f) ) );

		Set( "ToolBarButton.Normal", FSlateNoResource() );		// 注意：有意透明的背景
		Set( "ToolBarButton.Pressed", FSlateBoxBrush( TEXT("Old/MenuItemButton_Pressed"), 4.0f/32.0f ) );
		Set( "ToolBarButton.Hovered", FSlateBoxBrush( TEXT("Old/MenuItemButton_Hovered"), 4.0f/32.0f ) );

		// 工具栏按钮有时为切换按钮，因此它们需要用到"勾选"状态的风格。
		Set( "ToolBarButton.Checked", FSlateBoxBrush( TEXT("Old/MenuItemButton_Pressed"),  4.0f/32.0f, FLinearColor( 0.3f, 0.3f, 0.3f ) ) );
		Set( "ToolBarButton.Checked_Hovered", FSlateBoxBrush( TEXT("Old/MenuItemButton_Hovered"),  4.0f/32.0f ) );
		Set( "ToolBarButton.Checked_Pressed", FSlateBoxBrush( TEXT("Old/MenuItemButton_Pressed"),  4.0f/32.0f, FLinearColor( 0.5f, 0.5f, 0.5f ) ) );

		// 工具栏按钮标签字体
		Set( "ToolBarButton.LabelFont", FSlateFontInfo( TEXT("Roboto-Regular"), 8 ) );
	}

```

合成中使用的风格：

```cpp
	SNew( SBorder )
	.BorderImage( FEditorStyle::GetBrush( "ToolBar.Background" ) )
	.Content()
	[
		SNew(SHorizontalBox)

		// 编译按钮（虚拟为多框按钮）
		+SHorizontalBox::Slot()
		[
			SNew(SButton)
			.Style(TEXT("ToolBarButton"))
			.OnClicked( InKismet2.ToSharedRef(), &FKismet::Compile_OnClicked )
			.IsEnabled( InKismet2.ToSharedRef(), &FKismet::InEditingMode )
			.Content()
			[
				SNew(SVerticalBox)
				+SVerticalBox::Slot()
				.Padding( 1.0f )
				.HAlign(HAlign_Center)
				[
					SNew(SImage)
					.Image(this, &SBlueprintEditorToolbar::GetStatusImage)
					.ToolTipText(this, &SBlueprintEditorToolbar::GetStatusTooltip)
				]
				+SVerticalBox::Slot()
				.Padding( 1.0f )
				.HAlign(HAlign_Center)
				[
					SNew(STextBlock)
					.Text(LOCTEXT("CompileButton", "Compile"))
					.Font( FEditorStyle::GetFontStyle( FName( "ToolBarButton.LabelFont" ) ) )
					.ToolTipText(LOCTEXT("CompileButton_Tooltip", "Recompile the blueprint"))
				]
			]
		]
	]

```

## 输入

Slate支持接受鼠标输入和键盘输入。它提供了一个灵活的键绑定系统，可以将任何键组合绑定到任何命令，包括动态修改这些绑定的能力。

## 输出

Slate使用目标未知的渲染基元，使得它可以在任何平台上运行。它目前针对的是虚幻引擎4 (UE4)渲染硬件接口(RHI)，因此它可以在运行UE4的任何平台上运行。

## 布局基元

布局基元使得构建静态和动态布局变得很简单。

```cpp
	FString DefaultLayout =
					TEXT( "	{" )
					TEXT( "		\"type\": \"tabstack\"," )
					TEXT( "		\"sizecoeff\": 1," )
					TEXT( "		\"children\":" )
					TEXT( "		[" )
					TEXT( "			{" )
					TEXT( "				\"type\": \"tab\"," )
					TEXT( "				\"content\": \"Widget Inspector Tab\"" )
					TEXT( "			}," )
					TEXT( "			{" )
					TEXT( "				\"type\": \"tab\"," )
					TEXT( "				\"content\": \"Plugin Manager Tab\"" )
					TEXT( "			}," )
					TEXT( "			{" )
					TEXT( "				\"type\": \"tab\"," )
					TEXT( "				\"content\": \"Debug Tools\"" )
					TEXT( "			}" )
					TEXT( "		]" )
					TEXT( "	}" );

```

上面的布局创建以下UI：

![UI Layout](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62462554-121b-4bf0-be34-38d717a8f9e9/slate_layout.png)

## 用户驱动型布局

Slate的停靠框架通过允许将它的选项卡式窗格重新排列和停靠到几乎任何您能想象到的布局中，将权力交到用户手中。自定义环境的能力允许用户以他们想要的方式使用他们想要使用的工具。

浮动选项卡：

![Docking](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/323f8e63-358b-4e38-93c6-b796ca72b3d2/docking_before.png)

将选项卡拖动到停靠目标：

![Drag to Docking Area](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09e35911-abdc-4824-be93-9e7cd4be7f4f/docking_place.png)

已停靠的选项卡：

![Docked](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f93f046-22a0-4f44-aebe-8de36e1d09df/docking_after.png)

## 开发者工具

**Slate控件反射器（Slate Widget Reflector）** 提供一种调试和分析UI和相关代码的方法。这有助于追踪错误和不良行为，以及分析和优化用户接口。

![Widget Inspector](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7d2f3cd-f7f4-432e-be6a-a8903e13978a/widget_inspector.png)

## 引擎访问权限

Slate UI系统向程序员提供引擎和编辑器的直接访问权限，使得更容易实现新的功能和工具，以适应任何开发团队的工作流程和任何项目的需求。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [slate](https://dev.epicgames.com/community/search?query=slate)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [声明性语法](/documentation/zh-cn/unreal-engine/slate-overview-for-unreal-engine#%E5%A3%B0%E6%98%8E%E6%80%A7%E8%AF%AD%E6%B3%95)
-   [合成](/documentation/zh-cn/unreal-engine/slate-overview-for-unreal-engine#%E5%90%88%E6%88%90)
-   [风格](/documentation/zh-cn/unreal-engine/slate-overview-for-unreal-engine#%E9%A3%8E%E6%A0%BC)
-   [输入](/documentation/zh-cn/unreal-engine/slate-overview-for-unreal-engine#%E8%BE%93%E5%85%A5)
-   [输出](/documentation/zh-cn/unreal-engine/slate-overview-for-unreal-engine#%E8%BE%93%E5%87%BA)
-   [布局基元](/documentation/zh-cn/unreal-engine/slate-overview-for-unreal-engine#%E5%B8%83%E5%B1%80%E5%9F%BA%E5%85%83)
-   [用户驱动型布局](/documentation/zh-cn/unreal-engine/slate-overview-for-unreal-engine#%E7%94%A8%E6%88%B7%E9%A9%B1%E5%8A%A8%E5%9E%8B%E5%B8%83%E5%B1%80)
-   [开发者工具](/documentation/zh-cn/unreal-engine/slate-overview-for-unreal-engine#%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7)
-   [引擎访问权限](/documentation/zh-cn/unreal-engine/slate-overview-for-unreal-engine#%E5%BC%95%E6%93%8E%E8%AE%BF%E9%97%AE%E6%9D%83%E9%99%90)
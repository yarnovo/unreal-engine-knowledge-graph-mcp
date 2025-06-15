# 虚幻引擎的Slate编辑器窗口快速入门指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/slate-editor-window-quickstart-guide-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:36:24.859Z

---

目录

![Slate编辑器窗口快速入门指南](https://dev.epicgames.com/community/api/documentation/image/d38ca20d-c001-4b33-8e70-b278be8fc86d?resizing_type=fill&width=1920&height=335)

本文详细介绍了如何使用虚幻引擎的UI框架 **Slate** 来创建一个简单的编辑器窗口，并使其能够响应用户的输入。此页面没有提供关于Slate如何与其他系统交互的完整指南，而是重点介绍了Slate的语法、其UI布局原理，以及如何让其UI响应事件。

## 1\. 项目设置

文中创建了一个名为 **SlateQuickstartGame** 的新项目，其设置如下：

-   模板类型：第三人称项目
-   C++项目

你还可以使用现有项目学习本指南。此项目不依赖于特定目标平台，因为它重点关注编辑器功能。

## 2.创建窗口插件

要快速开始使用新的编辑器窗口，请打开 **编辑（Edit）** > **插件（Plugins）** 窗口，然后点击 **\+ 添加（+ Add）** 按钮创建新插件。选择 **编辑器独立窗口（Editor Standalone Window）** 作为插件类型，并将其命名为 **SlateQuickstartWindow** 。点击 **创建插件（Create Plugin）** 以完成。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76aeb79b-4780-4a83-87cd-7f2a6f2d5ba0/create_plugin.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76aeb79b-4780-4a83-87cd-7f2a6f2d5ba0/create_plugin.png)

点击查看大图。

这会使用支持基本编辑器窗口所需的C++类自动创建插件模块。关闭编辑器并重新编译你的项目，然后重新打开项目。你可以在 **窗口（Window）** 下拉菜单中找到你的新编辑器窗口。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef53a1ef-4708-4a58-82cf-01c68b87be36/custom_editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef53a1ef-4708-4a58-82cf-01c68b87be36/custom_editor.png)

点击查看大图。

初始查看此窗口时，它将显示占位符文本，但不会显示交互式元素。

### 理解窗口的代码

继续构建菜单之前，你应该查看 `SlateQuickstartWindowModule.cpp` 中的代码，快速预览如何使用Slate的声明语法。Slate代码包含在OnSpawnPluginTab函数中。初始查看时，该函数的内容如下所示：

```cpp
TSharedRef<SDockTab> FSlateQuickstartWindowModule::OnSpawnPluginTab(const FSpawnTabArgs& SpawnTabArgs)

{
		FText WidgetText = FText::Format(

			LOCTEXT("WindowWidgetText", "Add code to {0} in {1} to override this window's contents"),
			FText::FromString(TEXT("FSlateQuickstartWindowModule::OnSpawnPluginTab")),
			FText::FromString(TEXT("SlateQuickstartWindow.cpp"))

			);

		return SNew(SDockTab)
		.TabRole(ETabRole::NomadTab)
		[
			// 将你的选项卡内容放在此处！

			SNew(SBox)
			.HAlign(HAlign_Center)
			.VAlign(VAlign_Center)
			[
				SNew(STextBlock)
				.Text(WidgetText)
			]
		];

}
```

此函数将执行以下步骤：

1.  使用 `FText::Format` 构建名为 `WidgetText` 的字符串，以组合多个字符串。
2.  使用SNew函数定义新的 `SDockTab` 。这表示可停靠的窗口。
3.  使用可以包含内容的 `SBox` 元素填充 `SDockTab` 。此盒体有 `HAlign` 和 `VAlign` 参数，用于将其对齐到窗口的中心。
4.  将新的 `STextBlock` 添加到 `SBox` 并将其文本设置为值 `WidgetText` 。
5.  返回包含所有这些UI元素的 `SDockTab` 。

要理解其工作原理，你可以想一想你会如何在UMG中创建类似的用户界面。要在UMG中重新创建此界面，你需要将盒体控件拖动到舞台作为根UI元素，然后将文本控件放在其中并将其对齐效果更改为居中。舞台和层级将类似下图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b973177-41be-47bf-bade-b0fe5090f96c/widget_hierarchy_umg.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b973177-41be-47bf-bade-b0fe5090f96c/widget_hierarchy_umg.png)

点击查看大图。

就 `SlateQuickstartWindow` 而言，视口舞台将替换为 `SDockTab` 控件。当你查看代码时，方括号定义了哪些元素会嵌套在给定控件中，而句点设置了你会在"细节（Details）"面板中看到的参数值。

有关Slate的声明语法的更多信息，请参阅[Slate概述](/documentation/zh-cn/unreal-engine/slate-overview-for-unreal-engine)。

## 3\. 为菜单创建Slate控件

你可以直接将Slate控件添加到插件向导生成的 `FSlateQuickstartWindowModule` 类。但是，如果你这样做，你在处理控件的回调时将遇到一些限制。因此，你应该创建专用的Slate控件来保存菜单的内容，然后将该控件添加到 `FSlateQuickstartWindowModule` 类。

1.  在内容侧滑菜单中，点击 **C++类（C++ Classes）** 文件夹，然后右键点击，并点击 **新建C++类（New C++ Class）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c878a3e9-3d9f-402a-8d25-f2d91042f668/new_class.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c878a3e9-3d9f-402a-8d25-f2d91042f668/new_class.png)
    
    点击查看大图。
    
2.  在 **添加C++类（Add C++ Class）** 窗口中，选择 **Slate控件（Slate Widget）** ，然后点击 **下一步（Next）** 。
    
3.  更改你的新C++类的设置，如下所示：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51050a9a-7c28-4412-835e-94e879ee078e/class_settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51050a9a-7c28-4412-835e-94e879ee078e/class_settings.png)
    
    点击查看大图。
    
    -   **类类型（Class Type）：** 公共
        
    -   **名称（Name）：** QuickStartWindowMenu
        
    -   **模块（Module）：** SlateQuickstartWindow（编辑器）
        
    
    点击 **创建类（Create Class）** 以完成。
    

确保将模块下拉菜单设置为 `SlateQuickstartWindow` 模块，然后点击"创建类（Create Class）"。这会将该类添加到插件的代码。如果不这样做，向导会将其放入游戏的代码中，你的Slate控件将对插件不可见。

向导会在插件的Source文件夹中创建名为 `SQuickStartWindowMenu` 的新C++类，然后重新生成你的项目的Visual Studio解决方案。

## 4\. 使用控件填充你的菜单

要将Slate控件添加到你的菜单，请打开 `SQuickStartWindowMenu.cpp` 并将其添加到Construct函数。初始查看该函数时，其内容如下所示：

```cpp
	void SQuickStartWindowMenu::Construct(const FArguments& InArgs)
	{
		/*
		ChildSlot
		[
			// 填充控件
		];
		*/
	}
```

执行以下步骤来填充窗口：

1.  删除 `Construct` 函数中注释掉的代码。
    
2.  在 `Construct` 函数中，使用SNew函数添加新的SVerticalBox。接着添加两个 `+SVerticalBox::Slot()` 元素。为两个插槽提供 `.AutoHeight()` 属性。
    
    ```cpp
             SNew(SVerticalBox)
             +SVerticalBox::Slot()
             .AutoHeight()
             [
             ]
             +SVerticalBox::Slot()
             .AutoHeight()
             [
             ]
    ```
    
3.  在第一个垂直盒体插槽中，添加带两个插槽的 `SHorizontalBox` 。为两个插槽提供 `.VAlign(VAlign_Top)` 属性。
    
    ```cpp
             +SVerticalBox::Slot()
             [
                 SNew(SHorizontalBox)
                 +SHorizontalBox::Slot()
                 .VAlign(VAlign_Top)
                 [
                 ]
                 +SHorizontalBox::Slot()
                 .VAlign(VAlign_Top)
                 [
                 ]
             ]
    ```
    

这会将水平盒体嵌套在垂直盒体中，从而实际上将这第一个插槽划分为两栏。

1.  在第一个水平插槽中，添加新的 `STextBlock` 控件。将 `.Text` 设置为 `FText::FromString("Test Button")` 。
    
    ```cpp
             +SHorizontalBox::Slot()
             .VAlign(VAlign_Top)
             [
                 SNew(STextBlock)
                 .Text(FText::FromString("Test Button"))
             ]
    ```
    

每当显示面向用户的文本时，你都应该使用 `FText` 而不是 `FString` 或其他文本显示方法，因为前者支持本地化。有关更多信息，请参阅[文本本地化](/documentation/zh-cn/unreal-engine/localizing-content-in-unreal-engine)。

1.  在第二个水平插槽中，添加新的 `SButton` 控件。将其 `.Text` 设置为 `FText::FromString("Press Me")` 。
    
    ```cpp
             +SHorizontalBox::Slot()
             .VAlign(VAlign_Top)
             [
                 SNew(SButton)
                 .Text(FText::FromString("Press Me"))
    		
             ]
    ```
    
2.  在第二个垂直盒体插槽中，再创建带有两个插槽的水平盒体。为第一个水平插槽提供内容为 `"Test Checkbox"` 的 `STextBlock` 控件，然后将一个 `SCheckBox` 控件添加到第二个水平插槽。
    
    ```cpp
             +SVerticalBox::Slot()
             .AutoHeight()
             [
                 SNew(SHorizontalBox)
                 +SHorizontalBox::Slot()
                 .VAlign(VAlign_Top)
                 [
                     SNew(STextBlock)
                     .Text(FText::FromString("Test Checkbox"))
                 ]
                 +SHorizontalBox::Slot()
                 .VAlign(VAlign_Top)
                 [
                     SNew(SCheckBox)
                 ]
             ]
    ```
    
3.  Slate窗口的完整定义内容现在应该如下所示：
    
    ```cpp
             return SNew(SDockTab)
             .TabRole(ETabRole::NomadTab)
             [
                 SNew(SVerticalBox)
                 +SVerticalBox::Slot()
                 .AutoHeight()
                 [
                     SNew(SHorizontalBox)
                     +SHorizontalBox::Slot()
                     .VAlign(VAlign_Top)
                     [
                         SNew(STextBlock)
                         .Text(FText::FromString("Test Button"))
                     ]
                     +SHorizontalBox::Slot()
                     .VAlign(VAlign_Top)
                     [
                         SNew(SButton)
                         .Text(FText::FromString("Press Me"))
                     ]
                 ]
                 +SVerticalBox::Slot()
                 .AutoHeight()
                 [
                     SNew(SHorizontalBox)
                     +SHorizontalBox::Slot()
                     .VAlign(VAlign_Top)
                     [
                         SNew(STextBlock)
                         .Text(FText::FromString("Test Checkbox"))
                     ]
                     + SHorizontalBox::Slot()
                     .VAlign(VAlign_Top)
                     [
                         SNew(SCheckBox)
                     ]
                 ]
             ];
    ```
    
4.  保存并编译你的代码，然后在虚幻编辑器中打开你的项目并打开你的窗口。
    
    实时编码处于活动状态并你的项目在虚幻编辑器中打开时，无法编译Slate窗口。确保关闭虚幻编辑器，然后尝试编译你的代码。
    
    你打开窗口时，它应如下所示：
    
    ![测试窗口的预览](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1324420-da73-45e3-a912-c57e82ceaddd/test_window_preview.png)
    
    该按钮和复选框都尚不能执行任何操作，但你将在下一小节中向其添加功能。
    

## 5\. 将事件绑定到交互式控件

交互式Slate控件将使用事件来响应点击或切换等交互。在本小节中，你将创建多个委托，为之前小节的复选框和按钮驱动交互。

1.  打开 `SQuickStartWindowMenu.h` 并声明以下函数和变量：
    
    ```cpp
                 public: 
                 FReply OnTestButtonClicked();
                 void OnTestCheckboxStateChanged(ECheckBoxState NewState);
                 ECheckBoxState IsTestBoxChecked() const;
    		
                 protected:
                 bool bIsTestBoxChecked;
    ```
    
    这些函数将包含在你点击测试按钮和测试复选框时运行的逻辑。该复选框将使用 `IsTestBoxChecked` 函数来确定它应该显示什么状态，并且 `bIsTestBoxChecked` 将缓存该状态。
    
2.  在 `SQuickStartWindowMenu.cpp` 中，为复选框的函数提供以下实现：
    
    ```cpp
                 void SQuickStartWindowMenu::OnTestCheckboxStateChanged(ECheckBoxState NewState)
                 {
                     bIsTestBoxChecked = NewState == ECheckBoxState::Checked ? true : false;
                 }
    		
                 ECheckBoxState SQuickStartWindowMenu::IsTestBoxChecked() const
                 {
                     return bIsTestBoxChecked ? ECheckBoxState::Checked : ECheckBoxState::Unchecked;
                 }
    ```
    
    这些代码为复选框的当前状态提供了getter和setter。`OnTestCheckboxStateChanged` 函数将设置 `bIsTestBoxChecked` 的值，具体取决于用户将复选框的状态更改为什么。与此同时，`IsTestBoxChecked` 函数将读取该变量并将其转换回 `ECheckBoxState` 。
    
3.  将 `.OnCheckStateChanged` 参数添加到 `SCheckBox` 控件，并提供对 `FSlateQuickstartModule::OnTestCheckboxStateChanged` 函数的引用。然后，添加 `IsChecked` 参数，并提供对 `SQuickStartWindowMenu::IsTestBoxChecked` 函数的引用。
    
    ```cpp
                 +SHorizontalBox::Slot()
                 .VAlign(VAlign_Top)
                 [
                     SNew(SCheckBox)
                     .OnCheckStateChanged(FOnCheckStateChanged::CreateSP(this, &SQuickStartWindowMenu::OnTestCheckboxStateChanged))
                     .IsChecked(FIsChecked::CreateSP(this, &SQuickStartWindowMenu::IsTestBoxChecked))
                 ]
    ```
    
    现在，你有一种机制来跟踪用户何时选中和取消选中 `SCheckBox` 控件。
    
4.  为 `OnTestButtonClicked` 函数提供以下实现：
    
    ```cpp
                 FReply SQuickStartWindowMenu::OnTestButtonClicked()
                 {
                     UE_LOG(LogTemp, Warning, TEXT("Hello, world! The checkbox is %s."), (bIsTestBoxChecked ? TEXT("checked") : TEXT("unchecked")));
                     return FReply::Handled();
                 }
    ```
    
    此函数会将一条简短消息输出到输出日志，说明复选框是否已选中。
    
5.  将 `.OnClicked` 参数添加到 `Sbutton` ，然后提供对 `SQuickStartWindowMenu::OnTestButtonClicked` 函数的引用。
    
    ```cpp
                 +SHorizontalBox::Slot()
                 .VAlign(VAlign_Top)
                 [
                     SNew(SButton)
                     .Text(FText::FromString("Press Me"))
                     .OnClicked(FOnClicked::CreateSP(this, &SQuickStartWindowMenu::OnTestButtonClicked))
                 ]
    ```
    

## 6\. 将你的菜单添加到窗口

最后，你需要将你创建的Slate控件添加到菜单选项卡的代码。

1.  打开 `SlateQuickstartWindowModule.cpp` 并删除SDockTab的内容。其代码内容现在应该如下所示：
    
    ```cpp
             return SNew(SDockTab)
             .TabRole(ETabRole::NomadTab)
             [
    		
             ];
    ```
    
2.  在 `SDockTab` 中添加你的 `SQuickStartWindowMenu` 控件。
    
    ```cpp
             return SNew(SDockTab)
             .TabRole(ETabRole::NomadTab)
             [
                 SNew(SQuickStartWindowMenu)
             ];
    ```
    

保存并编译你的代码，然后打开虚幻编辑器并测试你的窗口。

## 最终效果

点击测试按钮时，你的控制台日志应该会打印消息"你好，世界！复选框已取消选中。（Hello, world! The checkbox is unchecked.）"如果你选中该复选框，它应该会打印消息"你好，世界！复选框已选中。（Hello, world! The checkbox is checked.）"以上就是Slate窗口的基本初步示例，你可以进行扩展，创建自定义的编辑器窗口。

## 自行尝试

有关不同Slate控件及多种委托绑定方式的示例，请参阅 `STestSuite.cpp` 。它位于引擎安装目录中的 `Source\Runtime\AppFramework\Private\Widgets\Testing` 下。你可以尝试使用这些控件，创建不同的布局和交互式元素。你还可以尝试使用Slate UI元素与项目中的资产或数据或者关卡编辑器中的世界交互。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [editor](https://dev.epicgames.com/community/search?query=editor)
-   [slate](https://dev.epicgames.com/community/search?query=slate)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1\. 项目设置](/documentation/zh-cn/unreal-engine/slate-editor-window-quickstart-guide-for-unreal-engine#1%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [2.创建窗口插件](/documentation/zh-cn/unreal-engine/slate-editor-window-quickstart-guide-for-unreal-engine#2%E5%88%9B%E5%BB%BA%E7%AA%97%E5%8F%A3%E6%8F%92%E4%BB%B6)
-   [理解窗口的代码](/documentation/zh-cn/unreal-engine/slate-editor-window-quickstart-guide-for-unreal-engine#%E7%90%86%E8%A7%A3%E7%AA%97%E5%8F%A3%E7%9A%84%E4%BB%A3%E7%A0%81)
-   [3\. 为菜单创建Slate控件](/documentation/zh-cn/unreal-engine/slate-editor-window-quickstart-guide-for-unreal-engine#3%E4%B8%BA%E8%8F%9C%E5%8D%95%E5%88%9B%E5%BB%BAslate%E6%8E%A7%E4%BB%B6)
-   [4\. 使用控件填充你的菜单](/documentation/zh-cn/unreal-engine/slate-editor-window-quickstart-guide-for-unreal-engine#4%E4%BD%BF%E7%94%A8%E6%8E%A7%E4%BB%B6%E5%A1%AB%E5%85%85%E4%BD%A0%E7%9A%84%E8%8F%9C%E5%8D%95)
-   [5\. 将事件绑定到交互式控件](/documentation/zh-cn/unreal-engine/slate-editor-window-quickstart-guide-for-unreal-engine#5%E5%B0%86%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E4%BA%A4%E4%BA%92%E5%BC%8F%E6%8E%A7%E4%BB%B6)
-   [6\. 将你的菜单添加到窗口](/documentation/zh-cn/unreal-engine/slate-editor-window-quickstart-guide-for-unreal-engine#6%E5%B0%86%E4%BD%A0%E7%9A%84%E8%8F%9C%E5%8D%95%E6%B7%BB%E5%8A%A0%E5%88%B0%E7%AA%97%E5%8F%A3)
-   [最终效果](/documentation/zh-cn/unreal-engine/slate-editor-window-quickstart-guide-for-unreal-engine#%E6%9C%80%E7%BB%88%E6%95%88%E6%9E%9C)
-   [自行尝试](/documentation/zh-cn/unreal-engine/slate-editor-window-quickstart-guide-for-unreal-engine#%E8%87%AA%E8%A1%8C%E5%B0%9D%E8%AF%95)
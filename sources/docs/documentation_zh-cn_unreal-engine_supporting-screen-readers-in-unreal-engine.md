# 虚幻引擎中的屏幕朗读器支持 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/supporting-screen-readers-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:19:21.252Z

---

目录

![屏幕朗读器支持](https://dev.epicgames.com/community/api/documentation/image/fcaf457f-d46a-404f-909a-6ef2bc02b332?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

UE现在支持Windows版第三方屏幕朗读器或iOS版VoiceOver。这能方便残疾人访问游戏UI，有助于遵循CVAA标准。 NVDA和JAWS之类的屏幕朗读器可以向用户朗读软件应用程序的UI。这是一个十分重要的功能，能帮助视力残疾者使用和浏览软件应用程序。

现在，UE中加入了一些API，允许使用第三方屏幕朗读器来朗读UI文本。它支持多种常用的UMG控件，例如文本块、可编辑的文本框、滑条、按钮和复选框。 借助这种内置功能，无需实现定制文本转语音技术即可轻松支持屏幕朗读器。

## 启用屏幕朗读器支持

要启用屏幕朗读器支持，转至项目或引擎的 **控制台变量** 配置文件。打开文件后，添加变量 `Accessibility.Enable=1`。

## 使用UMG中的访问

要使用屏幕朗读器访问UMG控件，请前往任意控件的 **细节（Details）** 面板。将看到 **访问（Accessibility）** 部分。访问设置是默认启用的。如果需要调整默认设置，请勾选 **覆盖可访问默认值（Override Accessible Defaults）** 选项。 勾选后就能调整 **是否能访问子项（Can Children Be Accessible）**、**访问行为（Accessible Behavior）** 和 **访问摘要行为（Accessible Summary Behavior）** 选项了。

其中 **是否能访问子项（Can Children Be Accessible）** 指定子控件是否继承访问行为设置。

在 **访问行为（Accessible Behavior）** 中可以指定希望屏幕朗读器API朗读控件文本的方式。可以在下列选项中选择：

-   **自动（Auto）**：自动朗读指定给控件的文本。
-   **摘要（Summary）**：屏幕朗读器串联所有子控件的文本。
-   **自定义（Custom）**：屏幕朗读器使用开发者预编码的自定义文本。
-   **提示文本（Tool Tip）**：屏幕朗读器仅阅读 **提示文本**。
-   **不访问（Not Accessible）**：忽略屏幕朗读器API。

如在"访问行为（Accessible Behaviors）"中选择"摘要（Summary）"，**访问摘要行为（Accessible Summary Behavior）** 会显示串联父控件和所有后续子控件的文本时将朗读哪些文本。

![Representation of the Accessibility options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4652bd8-dff6-4d05-a788-1fa8bac36a4d/ue5_1-accessibility-options.png)

## 自定义控件支持（C++）

创建针对自定义Slate控件的新C++类即可添加附加支持。要向新的控件添加专门支持，必须覆盖 `SWidget::CreateAccessibleWidget()` 并返回新 `FSlateAccessibleWidget` 的实例。在FSlateAccessibleButton下的文件SlateAccessibleWidgets.h中可找到相应范例。此范例显示屏幕朗读器如何帮助用户点击按钮。

如 `bCompileWithAccessibilitySupport` 设为false，可从Slate和平台层编译出屏幕朗读器代码。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)
-   [accessibility](https://dev.epicgames.com/community/search?query=accessibility)
-   [screen reader](https://dev.epicgames.com/community/search?query=screen%20reader)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用屏幕朗读器支持](/documentation/zh-cn/unreal-engine/supporting-screen-readers-in-unreal-engine#%E5%90%AF%E7%94%A8%E5%B1%8F%E5%B9%95%E6%9C%97%E8%AF%BB%E5%99%A8%E6%94%AF%E6%8C%81)
-   [使用UMG中的访问](/documentation/zh-cn/unreal-engine/supporting-screen-readers-in-unreal-engine#%E4%BD%BF%E7%94%A8umg%E4%B8%AD%E7%9A%84%E8%AE%BF%E9%97%AE)
-   [自定义控件支持（C++）](/documentation/zh-cn/unreal-engine/supporting-screen-readers-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8E%A7%E4%BB%B6%E6%94%AF%E6%8C%81%EF%BC%88c++%EF%BC%89)
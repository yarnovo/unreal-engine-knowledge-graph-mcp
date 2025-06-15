# 虚幻引擎的视觉障碍辅助功能介绍 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blind-accessibility-features-overview-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:19:18.468Z

---

目录

![视觉障碍辅助功能介绍](https://dev.epicgames.com/community/api/documentation/image/c6099e2d-e9a2-4519-b6e8-df9205585780?resizing_type=fill&width=1920&height=335)

对于存在视觉缺陷的用户来说，可视化界面反而会成为一种障碍。你可以采用多种手段来帮助他们克服这种障碍，比如增加界面的大小，或者加强颜色对比度。但对于完全失明的用户来说，有一种办法不可或缺： **文本转语音（text-to-speech）** 功能。

"文本转语音"功能会将可视化信息以合成语音的方式告知用户，内容包括可视化界面中的文本，以及可视化界面的类型、状态等。

这项功最早应用于传统行业，然后在游戏行业中迅速普及。对于盲人、视力障碍者（希望节省眼力的用户）来说很有帮助。对于某些认知障碍的用户来说也是如此。而且它还有助于满足CVAA的某些规定。

CVAA是一项关于无障碍的立法措施，适用于所有在美国销售的具有语音、文字和/或视频聊天功能的游戏。

如需了解更多关于CVAA的法律要求，请参阅IGDA游戏无障碍小组（IGDA-GASIG）网站上的[揭秘CVAA](https://igda-gasig.org/what-and-why/demystifying-cvaa/)页面。

**虚幻引擎5** 提供三个插件来帮助开发者达到CVAA对于有视觉障碍的用户的要求。以下为插件名：

-   文字转语音（Text To Speech）
    
-   屏幕阅读器（Screen Reader）
    
-   Slate屏幕阅读器（Slate Screen Reader）
    

## 文字转语音插件

文字转语音 (TTS) 是一种软件技术，用于以数码合成的发音来提供语音输出。TTS的一个例子是带有语音播报导航功能的GPS设备。另一个例子是手机上的智能助理，可以对你的指令提供语音回馈。

虚幻引擎的 **文字转语音** 插件提供了基本的功能，支持为视觉障碍用户阅读出项目中的文本。比如，你可以使用该插件来读出文本、视觉元素的类型（例如"音量、滑条、30%），或者读出在网络游戏聊天框中收到的信息。

目前，TTS插件仅在全平台上支持英语。我们计划在未来添加其它的语言。

## 屏幕阅读器插件

屏幕阅读器是一种辅助技术，可以帮助视觉障碍用户与软件应用进行互动。它可以使用不依赖视觉的方式（文字转语言或Braille）传递屏幕上的信息，比如文字或图片。它还为视觉障碍用户提供与界面互动的途径。比如，视觉障碍用户可以不使用鼠标，而是键盘上的特定按键组合来改变屏幕上的聚焦物体。

屏幕阅读器可以模拟对于视觉障碍者比较困难的行为，比如右键点击一个UI元素或者在UI元素边界内滚动鼠标滚轮。

虚幻引擎的 **屏幕阅读器** 插件使用文字转语音功能并且进行扩展，以此来提供更丰富的功能。它提供了一个基础的框架，可以用于实现你自己的自定义解决方案。

该插件的功能包括：

-   请求用TTS将文字转语音。
    
-   将一系列辅助功能的宣讲排入队列用TTS转为语音。
    
-   请求将启用辅助功能的UI元素内容转为语音。
    

启用该插件时，文字转语音插件会自动启用。

如果你使用[Slate](/documentation/zh-cn/unreal-engine/slate-overview-for-unreal-engine)来实现你的UI，请考虑使用Slate屏幕阅读器。

## Slate屏幕阅读器插件

**Slate屏幕阅读器** 插件基于屏幕阅读器的基础框架构建。你可以将该插件作为实现自定义UI解决方案或者使用Slate实现UI的样本。

该插件的目的是将辅助功能 "即插即用"。启用该插件时，所有当前受支持的带辅助功能的Slate和UMG UI元素都可以在用户聚焦的时候语音输出。

该插件启用时，文字转语音和屏幕阅读器插件会自动启用。

该插件目前支持以下几种控件：

-   按钮（Button）
    
-   复选框（Check box）
    
-   组合框（Combo box）
    
-   超链接（Hyperlink）
    
-   图片（Image）
    
-   布局（Layout）
    
-   滚动条（Scroll bar）
    
-   滑块（Slider）
    
-   文本（Text）
    
-   可编辑文本（Text (editable)）
    
-   窗口（Window）
    
-   列表（List）
    
-   列表物品（List item）
    
-   未知（Unknown）
    

## 选择使用哪个插件

使用以下信息来判断为你的项目使用正确的辅助功能插件。

-   如果你使用的是不需要复杂用户互动的简易UI，可以考虑将 **文字转语音** 插件作为一种轻量的解决方案来为视觉障碍用户提供辅助。
    
-   如果你用Slate来实现UI，请使用 **Slate 屏幕阅读器** 插件。
    
-   如果你使用了Slate以外的其它UI解决方案，你可能需要应用你自己的自定义屏幕阅读器。使用 **屏幕阅读器** 作为基础框架。
    

你可以参考Slate屏幕阅读器作为实现自定义屏幕阅读器开发的样板。

## 启用插件

你可以从主菜单中启用全部三个插件（**编辑（Edit） > 插件（Plugins）**）。如果你需要了解如何启用插件，请参考[使用插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)页面。

启用 **屏幕阅读器** 和 **Slate屏幕阅读器** 插件之前，你需要为你的项目和虚幻引擎安装启用辅助功能。

该操作的步骤相同，但是需要编辑的配置文件会有所不同，取决于你要对一个项目启用辅助功能还是要为全部UE启用：

-   仅项目：打开 `Config\DefaultEngine.ini` 文件。
    
-   全部UE：前往 `C:\Program Files\Epic Games\UE_[Version]\Engine\Config` 文件夹，然后打开 `BaseEditorSettings.ini` 或者 `BaseEngine.ini`。
    

将这一行加入你打开的 `.ini` 文件：

`Accessibility.Enable=1`

保存并关闭文件。如果虚幻引擎正在运行，你可能需要重启来使其生效。

-   [accessibility](https://dev.epicgames.com/community/search?query=accessibility)
-   [experimnetal](https://dev.epicgames.com/community/search?query=experimnetal)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [文字转语音插件](/documentation/zh-cn/unreal-engine/blind-accessibility-features-overview-in-unreal-engine#%E6%96%87%E5%AD%97%E8%BD%AC%E8%AF%AD%E9%9F%B3%E6%8F%92%E4%BB%B6)
-   [屏幕阅读器插件](/documentation/zh-cn/unreal-engine/blind-accessibility-features-overview-in-unreal-engine#%E5%B1%8F%E5%B9%95%E9%98%85%E8%AF%BB%E5%99%A8%E6%8F%92%E4%BB%B6)
-   [Slate屏幕阅读器插件](/documentation/zh-cn/unreal-engine/blind-accessibility-features-overview-in-unreal-engine#slate%E5%B1%8F%E5%B9%95%E9%98%85%E8%AF%BB%E5%99%A8%E6%8F%92%E4%BB%B6)
-   [选择使用哪个插件](/documentation/zh-cn/unreal-engine/blind-accessibility-features-overview-in-unreal-engine#%E9%80%89%E6%8B%A9%E4%BD%BF%E7%94%A8%E5%93%AA%E4%B8%AA%E6%8F%92%E4%BB%B6)
-   [启用插件](/documentation/zh-cn/unreal-engine/blind-accessibility-features-overview-in-unreal-engine#%E5%90%AF%E7%94%A8%E6%8F%92%E4%BB%B6)
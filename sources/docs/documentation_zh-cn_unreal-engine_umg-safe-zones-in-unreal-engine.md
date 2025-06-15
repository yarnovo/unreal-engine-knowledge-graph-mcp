# 虚幻引擎UMG安全区 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/umg-safe-zones-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:18:18.678Z

---

目录

![UMG安全区](https://dev.epicgames.com/community/api/documentation/image/983ada73-9d0f-4aec-b5bd-a6f1d36806e4?resizing_type=fill&width=1920&height=335)

**安全区（Safe Zone）** 控件是开发能在许多不同设备上运行的游戏用户界面（UI）必不可少的组成部分。安全区的用途是避免在技术上能够使用但玩家看不到的地方显示UI，例如电视显示屏的边缘或iPhoneX上的黑色凹槽和主页栏下方的区域。UMG设计器让您可以测试您的UI和所应用的安全区控件在设备上的分辨率（或旋转）效果。

当您将 **安全区** 控件添加到 **设计器** 时，该控件将缩放 **层级（Hierarchy）** 面板中作为其子代的任何其他控件。这些子控件将在出现"不安全"区域时缩放和调整。

![没有安全区控件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50a64d05-5e71-482c-9683-0e7f7696a819/withoutsafezone_opt-1.png)

![有安全区控件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82950c03-2ae6-4d50-a078-eae020652fb8/withsafezone_opt.png)

没有安全区控件

有安全区控件

在该示例中，1080p显示屏包含0.9（红色）的 **统一安全区（Uniform Safe Zone）**，用于测试和除错目的。当安全区控件有了子代控件后，子代控件就会根据安全区范围进行缩放。这样可防止被视为"不安全"的屏幕边缘处裁剪控件。正如示例中的"My Menu"标题文本所示。

## 设置和测试安全区分辨率

在UMG（或对于[在编辑器中播放（Play-in-Editor）](/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine)设置）中，所选屏幕大小现在与[设备配置文件](/documentation/zh-cn/unreal-engine/setting-up-device-profiles-in-unreal-engine)有关，配置文件还会考虑[移动内容缩放系数](/documentation/zh-cn/unreal-engine/performance-guidelines-for-mobile-devices-in-unreal-engine#%E7%A7%BB%E5%8A%A8%E5%86%85%E5%AE%B9%E7%BC%A9%E6%94%BE%E7%B3%BB%E6%95%B0)，这意味着最终分辨率和DPI缩放将根据所选设备而变。

要测试设备的屏幕分辨率，请使用UMG **设计器（Designer）** 视口，选择 **屏幕大小（Screen Size）** 下拉菜单，并从所列设备中进行选择。

![ScreenSizeSelection.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa7db74f-47dc-441b-8114-832a7d324c70/screensizeselection_opt.png)

如果设备支持屏幕转向，例如手机或平板电脑，请使用 **纵向/横向（Portrait/Landscape）** 按钮在两种查看模式之间切换。如果所选设备不支持转向，该选项显示为灰色。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7aa2357-66ed-4c55-a02b-de7ef6ab8b2c/orientationbutton.png)

以下是两种查看模式的示例：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cab80da8-ccf7-4b7e-ae9e-4858e4b0c6be/iphonex_portraitandlandscape.png)

左：横向，右：纵向

当选择设备时，相关信息和标记为"不安全"的区域将显示在 **设计器（Designer）** 图形中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/679cd1bc-041f-46d8-a5da-72d197814699/devicedetails.png)

标记为"不安全"的区域 设备详细信息：移动内容缩放系数、设备名称或统一安全区域和屏幕大小 DPI缩放

对于非统一安全区域，可以使用 **翻转（Flip）** 按钮来模拟横向模式的设备旋转。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77113962-1e5e-428f-a802-c14af6a6bb7a/deviceflipbutton.png)

该选项仅可在部分设备上使用，且仅用于横向查看模式。

当从列表中预览电视和显示器效果时，如果设置的[除错标题安全区](/documentation/zh-cn/unreal-engine/setting-up-tv-safe-zone-debugging-in-unreal-engine)小于1，则 **统一安全区** 将显示该大小。除错安全区由画布控件周围的红色区域表示。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b126d66-597a-4054-8dc4-88875f62185c/uniformsafezone.png)

UMG中的 **除错安全区** 模式默认为启用状态，这样就会呈现红色的"不安全"区域。

对于某些设备，现在设计器（Designer）图形中会显示一些自定义"不安全"区域。它们用于表示特定于硬件或软件且占据屏幕实际使用面积的设备区域，例如iPhoneX屏幕上表示黑色凹槽和主页栏的部分。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11249c73-fbe2-4f54-b7aa-1f9a3abdc1a3/iphonexunsafezones.png)

在该iPhoneX示例中，安全区控件是控件层级中包含菜单和按钮的部分的子代。当区域为"不安全"区域时，封装的控件将缩放以避开这些区域（参见以上示例）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03b90252-07df-43d9-9984-8b3db1e4f721/safezonehierarchypanel.png)

## 在PIE和单机游戏中测试UI

在编辑器中测试UI时，您可以根据常用设备屏幕尺寸来设置屏幕大小，适用于将PIE与 **新编辑器窗口（New Editor Window）** 配合使用或使用 **单机游戏（Standalone Game）** 而不将内容部署到设备的情况。使用 **编辑器首选项（Editor Preferences）**，在 **关卡（Level）>播放（Play）>游戏视口设置（Game Viewport Settings）** 下面设置设备以选择常用设备分辨率。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b6b6b4e-3325-4f4b-b00c-eab9d2303a7f/piesettings.png)

使用 **横向/纵向（Landscape/Portrait Orientation）** 按钮以在应使用的方向之间切换。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e78e0d2a-bae5-4d78-ab27-218fa9d142f1/piesettings_swaporientation.png)

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置和测试安全区分辨率](/documentation/zh-cn/unreal-engine/umg-safe-zones-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%92%8C%E6%B5%8B%E8%AF%95%E5%AE%89%E5%85%A8%E5%8C%BA%E5%88%86%E8%BE%A8%E7%8E%87)
-   [在PIE和单机游戏中测试UI](/documentation/zh-cn/unreal-engine/umg-safe-zones-in-unreal-engine#%E5%9C%A8pie%E5%92%8C%E5%8D%95%E6%9C%BA%E6%B8%B8%E6%88%8F%E4%B8%AD%E6%B5%8B%E8%AF%95ui)
# 虚幻引擎中CommonUI的输入调试和故障排除 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/input-debugging-and-troubleshooting-for-commonui-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:20:20.059Z

---

目录

![输入调试和故障排除](https://dev.epicgames.com/community/api/documentation/image/24501d34-95dd-4536-bc05-e3cab2e4699a?resizing_type=fill&width=1920&height=335)

使用断点调试时，可能会触发窗口焦点更改，进而可能影响你的应用程序的控件焦点。这样一来就很难调试输入，因为断点可能会导致你的UI进入的状态不是你打算调试的状态。要解决此限制，请尝试使用 **条件断点** 。

## 带有击中计数的条件断点

要创建条件断点，最简单方法是将 **击中计数** 添加到你的断点，这样断点会在几次点击之后触发。

![使用Visual Studio中的击中计数条件的条件断点示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f823f68d-7a05-463d-bece-680bd1abd6ea/conditionalbreakpoints.png)

使用Visual Studio中的击中计数条件的条件断点示例。

添加击中计数后，确保你的相关控件是在最后一次点击时点击的。

请参阅你的IDE的文档，详细了解如何设置击中计数等条件。

## 带有控件反射器的条件断点

你可以使用[控件反射器](/documentation/zh-cn/unreal-engine/using-the-slate-widget-reflector-in-unreal-engine)获取特定控件的条件断点。为此，请在找到控件后点击 **\[CBP\]** 。这会将断点限制为仅针对该控件激活。例如，你可以向 `SButton::OnMouseButtonDown` 添加仅针对特定按钮触发的断点。

![控件反射器中的[CBP]按钮](ClickCBP.png)

## CommonUI输入故障排除常见问题解答

下面是使用CommonUI的开发人员经常遇到的一些问题或疑问：

### 如何解决影响UI的更新/游戏暂停？

CommonUI当前适用于 **LocalPlayerSubsystems** 。如果游戏暂停，这些子系统不会更新。如果子系统不更新，则CommonUI（包括CommonBoundActionBar）将无法正常运行。为解决这个问题，在与UI的所需功能或性能不相抵触的情况下，我们推荐将相关Actor和控件设置为 **暂停时可更新** 。必要时可派生自定义子类来执行此操作。

### 为什么我会在关键帧处理程序方法中获得模拟输入？

在UE5中， *InputKey* 和 *InputAxis* 行为会在 **PlayerController** 级别合并到一起。这样做是为了更轻松地执行伪输入注入并捆绑输入参数，以便未来更轻松地更新。

如果你有UE 5.0之前的代码，模拟输入现在可能会触发关键帧处理程序回调，反之亦然。CommonUI应该得到正确保护，防止这种情况造成显著影响。但是，如果你要在输入管线早期调试，你可能会注意到这种交叉触发的一些情况。例如，由于 `FCommonAnalogCursor` 是输入处理器，它会与输入管线的更早部分交互。由于此交互，你可能会在 `FCommonAnalogCursor::HandleKeyDownEvent` 中看到交叉触发。

### 为什么我会在输入模式为菜单时获得游戏输入？

按照 `UCommonUIActionRouterBase::CanProcessNormalGameInput` ，如果游戏视口有鼠标捕获，UE5在菜单模式中允许游戏输入。这有助于支持处于菜单中时操控世界中的预览物品和角色。如果你不想要此行为，请在所需输入配置中禁用视口鼠标捕获。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [debugging](https://dev.epicgames.com/community/search?query=debugging)
-   [input](https://dev.epicgames.com/community/search?query=input)
-   [commonui](https://dev.epicgames.com/community/search?query=commonui)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [带有击中计数的条件断点](/documentation/zh-cn/unreal-engine/input-debugging-and-troubleshooting-for-commonui-in-unreal-engine#%E5%B8%A6%E6%9C%89%E5%87%BB%E4%B8%AD%E8%AE%A1%E6%95%B0%E7%9A%84%E6%9D%A1%E4%BB%B6%E6%96%AD%E7%82%B9)
-   [带有控件反射器的条件断点](/documentation/zh-cn/unreal-engine/input-debugging-and-troubleshooting-for-commonui-in-unreal-engine#%E5%B8%A6%E6%9C%89%E6%8E%A7%E4%BB%B6%E5%8F%8D%E5%B0%84%E5%99%A8%E7%9A%84%E6%9D%A1%E4%BB%B6%E6%96%AD%E7%82%B9)
-   [CommonUI输入故障排除常见问题解答](/documentation/zh-cn/unreal-engine/input-debugging-and-troubleshooting-for-commonui-in-unreal-engine#commonui%E8%BE%93%E5%85%A5%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94)
-   [如何解决影响UI的更新/游戏暂停？](/documentation/zh-cn/unreal-engine/input-debugging-and-troubleshooting-for-commonui-in-unreal-engine#%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E5%BD%B1%E5%93%8Dui%E7%9A%84%E6%9B%B4%E6%96%B0/%E6%B8%B8%E6%88%8F%E6%9A%82%E5%81%9C%EF%BC%9F)
-   [为什么我会在关键帧处理程序方法中获得模拟输入？](/documentation/zh-cn/unreal-engine/input-debugging-and-troubleshooting-for-commonui-in-unreal-engine#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%88%91%E4%BC%9A%E5%9C%A8%E5%85%B3%E9%94%AE%E5%B8%A7%E5%A4%84%E7%90%86%E7%A8%8B%E5%BA%8F%E6%96%B9%E6%B3%95%E4%B8%AD%E8%8E%B7%E5%BE%97%E6%A8%A1%E6%8B%9F%E8%BE%93%E5%85%A5%EF%BC%9F)
-   [为什么我会在输入模式为菜单时获得游戏输入？](/documentation/zh-cn/unreal-engine/input-debugging-and-troubleshooting-for-commonui-in-unreal-engine#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%88%91%E4%BC%9A%E5%9C%A8%E8%BE%93%E5%85%A5%E6%A8%A1%E5%BC%8F%E4%B8%BA%E8%8F%9C%E5%8D%95%E6%97%B6%E8%8E%B7%E5%BE%97%E6%B8%B8%E6%88%8F%E8%BE%93%E5%85%A5%EF%BC%9F)
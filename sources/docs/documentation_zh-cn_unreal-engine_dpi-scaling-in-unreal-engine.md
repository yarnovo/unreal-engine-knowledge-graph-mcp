# 虚幻引擎中的DPI缩放规则 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dpi-scaling-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:17:50.397Z

---

目录

![DPI 缩放](https://dev.epicgames.com/community/api/documentation/image/9c6734bd-e1b4-42d4-8e78-0d7e5be3413b?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bdf3eaa4-099c-4929-bae8-1745a672ddb2/dpiscaling.png)

**UMG** 支持与分辨率无关的 UI 进行自动缩放。在 **用户界面** 部分下的 **项目设置** 菜单中，提供了应用于每个项目的默认 DPI 缩放规则，这些规则您可以根据具体需求自行配置。你可以通过输入框调整 **应用比例（Application Scale）**，你可以选择 **DPI比例规则**，以及调整 **DPI曲线**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28c9cb12-e494-42e9-8fb1-beaf3fc00d69/projectsettings.png)

关于 **DPI 缩放规则**，您可以将其设为以下四个选项中的一个：

-   **最短边**：该选项将基于窗口的最短边来评估缩放曲线（最常用的设置）。
-   **最长边**：基于窗口的最长边来评估缩放曲线。
-   **水平**：基于窗口的 X 轴来评估缩放曲线。
-   **垂直**：基于窗口的 Y 轴来评估缩放曲线。

你可以右键单击DPI曲线图，选择 **添加键** 选项，在曲线上添加点。之后，你可以通过输入框来设置分辨率及其相应的缩放值。此外，对于曲线，还可通过展开 **DPI 曲线** 选项，提供外部的 **浮点曲线**，或根据当前应用的设置来创建浮点曲线。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc141e3c-2808-4e29-8a6c-4cfd5920a128/externalcurve.png)

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
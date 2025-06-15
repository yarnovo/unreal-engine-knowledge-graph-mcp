# 在虚幻引擎UMG中使用命名槽 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-named-slot-widgets-for-ui-templates-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:20:21.385Z

---

目录

![命名槽](https://dev.epicgames.com/community/api/documentation/image/49c6b0af-597b-4d5a-ab7e-6e0a54702a90?resizing_type=fill&width=1920&height=335)

## 描述

此控件用于为用户控件显示可使用任何其他控件来填充的外部槽，对创建自定义控件功能而言，此控件非常有用。

## 使用示例

下图中，我们创建了名为 ButtonTemplate 的 **控件蓝图**，并将 **画布面板** 替换成 **水平框**。在水平框中，我们放置一个 **按钮** 和 **文本** 控件，而我们希望让其他人在按钮旁边的空间中放上他们需要的任何控件，或我们稍后从其他控件蓝图中进行填充。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d6e6565-762c-4ff6-9a71-ed47990442b6/namedslot1.png)

我们还可以通过向水平框添加 **命名槽** 控件来实现这一目的。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df1d5669-fb4f-4394-9058-075a7353ad8a/namedslot2.png)

在我们的示例中，为清晰起见，我们更新了命名槽的名称，将其设为 **填充** 并调整预览的尺寸。并且，为了获得相同的尺寸，从 **填充尺寸** 下拉菜单中选择 **自定义** 并将 **宽度** 更改为 400，将 **高度** 更改为 50。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5743a57e-f773-4e89-ab15-3db0c42c13c0/namedslot3.png)

我们还更新了按钮上的文本。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da6effa4-3e48-4800-ac43-f00d888f458a/namedslot4.png)

我们 **编译** 并 **保存**，关闭 ButtonTemplate，然后创建新的控件蓝图。

在新控件蓝图的 **用户创建** 下，将我们的按钮模板用户控件拖动到画布面板上。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72784922-29b7-4e4f-945a-2359a88c1efd/namedslot5.png)

然后可以将控件添加到命名槽，但是我们不能将它们拖动到命名槽中的图形上。我们需要使用 **层级** 来为命名槽创建新的根控件。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94d28964-8d81-460e-8472-277ecdd64c40/namedslot7.png)

我们现在可以按照我们的想法为添加到命名槽的控件设置样式。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b8d0469-42a3-4def-934f-341681401827/namedslot8.png)

为了将控件拖放到图形上，我们需要使用容器来容纳控件（例如画布版面）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ba48534-6af4-4da1-b13b-98efcc803117/namedslot9.png)

上图中，我们已经创建了另一个 ButtonTemplate 控件，该控件使用画布面板，并且我们现在可以将控件拖动到它上面。

您向命名槽添加了多个控件，因此能够设置出填充有各种控件的模板。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70a70c11-8e8e-43b0-a8c5-0bc459275253/namedslot10.png)

-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [描述](/documentation/zh-cn/unreal-engine/using-named-slot-widgets-for-ui-templates-in-unreal-engine#%E6%8F%8F%E8%BF%B0)
-   [使用示例](/documentation/zh-cn/unreal-engine/using-named-slot-widgets-for-ui-templates-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%A4%BA%E4%BE%8B)
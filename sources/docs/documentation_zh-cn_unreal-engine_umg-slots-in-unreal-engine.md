# 虚幻引擎UMG插槽 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/umg-slots-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:17:19.127Z

---

目录

![UMG插槽](https://dev.epicgames.com/community/api/documentation/image/4960ac3a-c120-4615-9e0c-5c8ede6535f6?resizing_type=fill&width=1920&height=335)

**插槽（Slots）** 就是将各个控件绑定在一起的隐形粘合剂。更明确地说，在平板中，你必须首先创建一个插槽，然后 选择要在这个插槽中放置哪些控件。但在 UMG 中，当向面板控件添加子控件时，面板控件会自动使用正确类型的插槽。

此外，每个插槽都各不相同。例如，如果你将某个控件放在网格上，那么你可能希望能够设置诸如"行"和"列"之类的设置。但放置在画布上的控件则没有这些属性。这就是插槽的意义所在。**网格插槽** 只能理解"行"和"列"，而 **画布插槽** 则完全理解如何通过锚来对内容进行布局。

## 访问插槽

按照惯例，所有与插槽相关的属性都位于 **细节** 面板中的 **布局** 类别下。你还会发现，控件所用的插槽类型会显示在括号中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a201fa3-babc-4b37-9c8c-0bd6bd2eaf62/slotlayout.png)

### 设置布局属性

运行时，要修改"布局"下的属性，你可以访问蓝图或 C++ 控件的插槽成员，然后将其 **转换（Cast）** 成正确的 **插槽类型**。如此一来，你将能够修改属性，下图给出了具体示例。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/742c4eb7-d21f-436e-96ab-db0431c2fc8d/slotcast.png)

上图中，已将标题为 **GameTitleBox** 的 **垂直框** 放在了 **CanvasPanel** 画布面板上。通过获取与垂直框相关联的插槽并 **投射** 到 **CanvasPanelSlot** 类型，我们就可以设置在玩家点击"StartButton"时框的显示位置。

目前在蓝图中，只显示了 SETTER 节点。如果需要获取布局中的属性，可能要创建变量来存储属性，并在 **Event Construct** 节点上，通过变量 **设置** 你的布局属性，以便能够建立布局的引用并在稍后进行访问。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [访问插槽](/documentation/zh-cn/unreal-engine/umg-slots-in-unreal-engine#%E8%AE%BF%E9%97%AE%E6%8F%92%E6%A7%BD)
-   [设置布局属性](/documentation/zh-cn/unreal-engine/umg-slots-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%B8%83%E5%B1%80%E5%B1%9E%E6%80%A7)
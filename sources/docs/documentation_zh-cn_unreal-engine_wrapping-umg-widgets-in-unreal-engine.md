# 虚幻引擎UMG自动换行控件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/wrapping-umg-widgets-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:20:23.685Z

---

目录

![自动换行框](https://dev.epicgames.com/community/api/documentation/image/9fbc5d09-6025-4429-9639-413f8df46480?resizing_type=fill&width=1920&height=335)

你可以将 **自动换行框（Wrap Box）** 控件添加到UI布局，用其来排列子控件。它会将子控件从左到右排列，超出其宽度时会将其余子控件放到下一行。

本文介绍了在UI布局中使用和调整自动换行框控件的基本信息，并在下文中给出了一个在 **虚幻动态图形UI设计器（Unreal Motion Graphics UI Designer）**（UMG）中使用和调整自动换行框控件的示例。

## 细节

在放入 **自动换行框** 的控件的 **细节** 面板中，提供了一些设置，用于调整控件的运作方式，以下针对这些设置进行介绍。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae1f3a14-1a0c-4d8e-8758-c70cb653778e/wrapboxslotdetails.png)

选项

说明

**填充（Padding）**

这是槽与其中所含内容之间的填充区域。

**填充空白空间（Fill Empty Space）**

确定槽是否应当填充某行上的剩余空间。

**当小于设定值时填充跨度（Fill Span when Less Than）**

该设置表示如果自动换行框中的可用空间总值降到指定阈值之下，则槽将尝试填充整行。将阈值设为 0 表示不会进行填充。

**水平对齐（Horizontal Alignment）**

水平对齐对象。

**垂直对齐（Vertical Alignment）**

垂直对齐对象。

**强制换行（Force New Line）**

将当前槽设置为新一行的开头。

## 使用示例

当你想要根据容器的宽度来排布容器中的项目，使这些项目对齐且等间隔放置并自动确定其中内容的格式时，使用自动换行框非常有用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60a3f444-8b7c-4643-a923-ad7c2a9bc899/wrapbox_hierarchy.png)

下图展示了创建的类似"商店"界面的布局，其中向玩家展示了若干物品。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/182d72d0-93f0-4354-9eba-ac2c649f7b40/wrapbox1.png)

上图中的白色图像代表不同的物品，玩家只需点击某样物品然后点击购买按钮，就可以购买物品。在我们的示例中，我们希望被购买后将物品从商店中移除，或在"出售"按钮被按下后向商店中添加物品（当然你可能需要弹出菜单来选择要出售的物品，但我们这里仅仅是传达这种概念）。

例如，"购买"并移除物品会使窗口自动更新：

而"出售"并添加物品亦是如此（达到窗口最大宽度时会自动换行）：

它还可以用来在调整窗口大小时保持其中的内容排列整齐。

虽然自动换行框只会通过检查宽度来判断何时排列其中的控件，但你还可以将该控件与滚动框结合使用，滚动框会在窗口中的控件数量超出范围时添加滚动条，从而使用户可向下滚动，查看其余的控件。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [细节](/documentation/zh-cn/unreal-engine/wrapping-umg-widgets-in-unreal-engine#%E7%BB%86%E8%8A%82)
-   [使用示例](/documentation/zh-cn/unreal-engine/wrapping-umg-widgets-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%A4%BA%E4%BE%8B)
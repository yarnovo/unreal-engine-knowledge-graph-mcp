# 虚幻引擎UMG事件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/umg-events-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:18:17.683Z

---

目录

![UMG事件](https://dev.epicgames.com/community/api/documentation/image/07182ac6-b98e-439d-9481-2c731d378266?resizing_type=fill&width=1920&height=335)

下面列出了几种可以在 **UMG** 中调用 **事件** 的方法。

## 可绑定事件

**可绑定事件** 是 UMG 用于模仿目前平板正在使用的行为的方式，平板需要一个处理程序来判断事件是否已处理。可以在 **事件** 部分下的 **细节** 面板中，将 **控件蓝图** 中的功能绑定到事件（由下图中的黄色箭头表示）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e66e5bb-2ad3-4c11-9ec1-d4e0b3ce3502/eventbinding.png)

一些控件通过处理 **交互** 来协助 **事件**（由上图中的黄框表示）。对于上面的示例，除了按钮控件的 **OnClicked** 事件，也可以通过设置 **单击方式** 或 **触控方式** 来指定单击事件的处理方式。也可以通过 **可聚焦** 选项指定按钮是否仅可以使用鼠标点击，不可用键盘选择。

### 多播事件

**多播事件** 是事件在 **蓝图** 中的标准处理方式。

要使用 **多播事件**，请单击 **我的蓝图** 选项卡中的 **控件** (1)，然后 **右键单击** **事件图表** (2)，这会在 **控件事件** 部分下面显示出可用事件，可以在其中选择想要分配的事件 (3)。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/031a2c54-777f-49b8-9636-c67f3bc4cadb/sliderevent.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/031a2c54-777f-49b8-9636-c67f3bc4cadb/sliderevent.png)

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [可绑定事件](/documentation/zh-cn/unreal-engine/umg-events-in-unreal-engine#%E5%8F%AF%E7%BB%91%E5%AE%9A%E4%BA%8B%E4%BB%B6)
-   [多播事件](/documentation/zh-cn/unreal-engine/umg-events-in-unreal-engine#%E5%A4%9A%E6%92%AD%E4%BA%8B%E4%BB%B6)
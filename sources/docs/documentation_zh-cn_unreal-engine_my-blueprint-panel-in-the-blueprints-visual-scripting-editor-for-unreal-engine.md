# 虚幻引擎蓝图可视化脚本编辑器中"我的蓝图"面板 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/my-blueprint-panel-in-the-blueprints-visual-scripting-editor-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:38:22.163Z

---

目录

![蓝图编辑器"我的蓝图"面板](https://dev.epicgames.com/community/api/documentation/image/b87cdadf-7aa2-4cd7-a95f-a463f9ec680f?resizing_type=fill&width=1920&height=335)

**我的蓝图（My Blueprint）** 选项卡显示了蓝图中图表、脚本、函数、宏等内容的树状列表。本质上其是蓝图的轮廓，以便让使用者更加便捷地查看蓝图现有元素或创建新元素。

不同类型的蓝图将在 **我的蓝图（My Blueprint）** 选项卡树状列表中显示不同的项目类型。

![My Blueprint Pane](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4637647e-4f53-4136-b2e6-0b2ef3400168/myblueprintpane.png)

例如：法线蓝图固定显示 **ConstructionScript** 和 **EventGraph**。此外，蓝图中创建的函数都将被显示。关卡蓝图仅会显示 **EventGraph** 和其中创建的函数。接口仅会显示其中创建的函数。宏蓝图显示其中创建的宏函数。

## 创建按钮

**我的蓝图（My Blueprint）** 选项卡拥有新建变量、函数、宏、事件图和时间调度器的快捷按钮（每个标头末尾的![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b21370f-6e89-4f84-ab73-726476e2568d/plus_button.png)图标）。

**按钮**

**名称**

**描述**

![新建变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ba7d9c7-5465-401a-a091-74bfe3e37923/myblueprint_variable.png)

**新建变量**

点击后将新建变量。该变量的属性将即刻显示在 **细节（Details）** 选项卡中。在其中可修改变量命名、类型和其他属性。

![新建函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6957b1a0-5be7-4fe8-a233-7fa2a60a4461/myblueprint_function.png)

**新建函数**

新建函数，然后立即聚焦于 **细节（Details）** 选项卡的命名域进行命名。同时会打开新图表视图，在其中可定义函数的节点网络。

![新建宏](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac84df72-c37f-4a05-9846-56c6fcc30145/myblueprint_macro.png)

**新建宏**

新建宏，然后即刻聚焦于 **细节（Details）** 选项卡的命名域进行命名。同时会打开新图表视图，可在其中定义宏的节点网络。

![新建事件图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0639482c-0fb7-4a07-8fdf-8b2287498148/myblueprint_eventgraph.png)

**新建事件图表**

新建函数，然后即刻聚焦于 **细节（Details）** 选项卡的命名域进行命名。新的图表将显示，并在自身中拥有一个已定义的节点网络。

![新建事件调度器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6f6dd91-4a69-4e44-9c54-0775d11eb44a/myblueprint_eventdispatcher.png)

**新建事件调度器**

新建事件调度器，然后即刻聚焦于 **细节（Details）** 选项卡的命名域进行命名。

在 **我的蓝图（My Blueprint）** 选项卡中 **点击右键** 同样可以访问以上按钮。**右键** 菜单还包含了新建列举资源的选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b871ae5-e15f-493a-b8ec-866fd28cd79c/myblueprint_rightclick.png)

最后，还可使用 **我的蓝图（My Blueprint）** 面板顶部的 **新增（Add New）**按钮

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66c9884d-56a2-4012-8120-77cbfec8c13c/addnew.png)

## "我的蓝图"分段

**我的蓝图（My Blueprint）** 选项卡分为以下6个部分：**新增（Add New）**、图表（Graphs）、函数（Functions）、宏（Macros）、变量（Variables），和事件调度器部分。

![My Blueprint Pane](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eebf5e85-318b-48c6-9cca-038a875fd780/myblueprintpane.png)

下方5个部分中可将蓝图元素组织到相应分组。而顶端部分提供新建图表、变量等快捷方式，同时还可在其中搜索整个 **我的蓝图（My Blueprint）** 面板。

## 在"我的蓝图"中搜索

**我的蓝图（My Blueprint）** 选项卡含有用于搜索蓝图下属图表的文本框。此文本框的操作方式与用于添加新节点的操作菜单相同，但仅限于在 **我的蓝图（My Blueprint）** 中搜索对象。使用者可基于命名、注释和其他数据进行搜索。举例而言，若一个节点为 **SetActorHidden**，只需在文本框输入对应文本，浏览器即可显示图表中所有 **SetActorHidden** 节点。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建按钮](/documentation/zh-cn/unreal-engine/my-blueprint-panel-in-the-blueprints-visual-scripting-editor-for-unreal-engine#%E5%88%9B%E5%BB%BA%E6%8C%89%E9%92%AE)
-   ["我的蓝图"分段](/documentation/zh-cn/unreal-engine/my-blueprint-panel-in-the-blueprints-visual-scripting-editor-for-unreal-engine#%22%E6%88%91%E7%9A%84%E8%93%9D%E5%9B%BE%22%E5%88%86%E6%AE%B5)
-   [在"我的蓝图"中搜索](/documentation/zh-cn/unreal-engine/my-blueprint-panel-in-the-blueprints-visual-scripting-editor-for-unreal-engine#%E5%9C%A8%22%E6%88%91%E7%9A%84%E8%93%9D%E5%9B%BE%22%E4%B8%AD%E6%90%9C%E7%B4%A2)
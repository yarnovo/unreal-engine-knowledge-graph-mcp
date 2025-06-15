# 在虚幻引擎中放置节点 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/placing-nodes-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:34:43.836Z

---

目录

![放置节点](https://dev.epicgames.com/community/api/documentation/image/e8b459fd-22f9-40c1-a171-56e022f7fc2d?resizing_type=fill&width=1920&height=335)

在本页中您将学习到如何在蓝图中的图表上放置节点。

## 拖放

第一种方法是 **拖放**，从 **MyBlueprint** 窗口将节点拖放到图表上。举例而言，在下图中可将 **PlayerHealth** 变量拖入几个变量中并放置在图表上，以便在脚本中使用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac956d1d-47ef-46d2-9fc0-e3431950f127/addingnodes1.png)

**单击左键** 将一个变量拖进图表窗口后出现两个选项，**Get** 和 **Set**。选择 Get 将创建一个 **Getter** 节点，获取变量或变量值；而选择 Set 将创建一个 **Setter** 节点，对变量值进行设置。根据节点的类型，可能出现只有 Get 一个选项的情况。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca2939dd-aa31-41be-a01e-88f35eb8e704/addingnodes2.png)

在上图中，上方节点是 Getter，下方节点是 Setter。举例而言，Getter 可用作游戏元素的条件（如获取玩家体力值，确认数值是否高于特定范围，如否，判定玩家死亡）。借用相同例子从另一方面来说，Setter 可用于增加玩家的体力值：为玩家体力值变量设置数值。

同理可将创建好的 **函数** 和 **宏** 拖入图表。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0064d18e-4c72-49b3-b4ce-7beef551ab2a/addingnodes7.png)

-   如需了解详细内容，请参阅 [函数](/documentation/zh-cn/unreal-engine/functions-in-unreal-engine) 或 [宏](/documentation/zh-cn/unreal-engine/macros-in-unreal-engine)。

按下图所示拖入一个 **Event Dispatcher** 后，一些特殊上下文操作将变为可用状态。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd80ee42-8ac7-4296-b20f-9ae021b6197d/addingnodes6.png)

快捷菜单在拖入 Event Dispatcher 时出现，可从中选择需要执行的操作。

查看 [事件分发器](/documentation/zh-cn/unreal-engine/event-dispatchers-in-unreal-engine) 中的详细内容。

## 快捷菜单搜索

多数情况下，可在蓝图图表中 **单击右键** 访问 **快捷菜单** 放置节点。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55a34b33-bd1e-4e97-aa69-a1fce7e5e328/rightclick1.png)

从上图菜单中展开任意类目（或子类目），然后选择需要的节点添加至图表中。

窗口右上角有一个名为 **Context Sensitive** 的选项。它为默认开启，禁用此选项后将基于当前上下文自动筛选菜单中显示的选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2569edeb-311d-4052-997a-5bd9fed5d867/rightclick2.png)

如下图所示，**Context Sensitive** 选项开启时 **单击右键** 并搜索 **Animation**，便会出现筛选列表。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11dae491-cd2d-4fdd-8dce-e28de6aee409/rightclick3.png)

然而，如取消勾选 **Context Sensitive** 并搜索 **Animation**，便会出现所有与 animation 相关的内容。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ac34ac5-37f6-4196-b2dc-c3964def199c/rightclick4.png)

图表中 **单击右键** 呼出快捷菜单，也可拖动现有节点访问快捷菜单。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6bd3600-ec9b-4fed-a12c-85fa2341e40f/rightclick5.png)

在上图中有一个 **Character Movement** 组件引用，拖动其输出引脚可添加连接上下文的节点。如下例所示，这些节点和被拖动的节点为相关。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fda258e6-9ca5-4a07-8839-05754962e1fd/rightclick6.png)

在上图中，搜索 **Set Max Walk**，然后从菜单中选择 **Set Max Walk Speed** 对角色的最高步行速度进行设置。

## 快捷键

也可使用 **快捷键** 替代（和使用）节点，提升工作效率。

查看 [蓝图编辑器速查表](/documentation/zh-cn/unreal-engine/blueprint-editor-cheat-sheet-in-unreal-engine) 中的详细内容。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [拖放](/documentation/zh-cn/unreal-engine/placing-nodes-in-unreal-engine#%E6%8B%96%E6%94%BE)
-   [快捷菜单搜索](/documentation/zh-cn/unreal-engine/placing-nodes-in-unreal-engine#%E5%BF%AB%E6%8D%B7%E8%8F%9C%E5%8D%95%E6%90%9C%E7%B4%A2)
-   [快捷键](/documentation/zh-cn/unreal-engine/placing-nodes-in-unreal-engine#%E5%BF%AB%E6%8D%B7%E9%94%AE)
# 虚幻引擎蓝图最佳实践 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blueprint-best-practices-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:34:14.062Z

---

目录

![蓝图最佳实践](https://dev.epicgames.com/community/api/documentation/image/2209252f-b48b-4681-8da0-e1301786f0c0?resizing_type=fill&width=1920&height=335)

通过 **蓝图** 可执行许多操作。从制作小游戏或程序化内容工具，到设计新功能原型，再到调试和改进程序员制作的内容，均可通过蓝图可视化脚本系统完成。

然而，如果在蓝图中完成部分特定操作，将对性能产生较大影响。如果蓝图在每个 tick 都执行大量操作和复杂的数学计算，则需要考虑使用本地 C++ 代码。蓝图最适合创建事件驱动的功能，如处理伤害接收、控制，或其他非每帧调用的操作。

如需了解蓝图编码的更多内容，或蓝图编译的技术细节，请查阅 [蓝图技术指南](/documentation/zh-cn/unreal-engine/technical-guide-for-blueprints-visual-scripting-in-unreal-engine)。

即使您的功能非常适合于蓝图，在实际的蓝图设置过程中仍然会面临一些决定，这些决定将使过程更加顺畅。此指南将讲述部分常见决定，以及对蓝图使用者的提示和技巧。

## 关卡蓝图 vs. 蓝图类

使用过 UE3 Kismet 的使用者不会关卡蓝图感到陌生，因为可在关卡中直接选择物体并进行操作。它们适合于创建一次性原型和熟悉蓝图系统，但只限定于它们使用中的关卡。这意味着关卡蓝图非常利于对关卡限定的功能，或其中的 Actor 进行设置。在一些范例中，触碰到特定开关时将启动过场，或在消灭所有敌人后打开一扇特定的门。

总之，蓝图类是在项目中实现可重用行为的最佳方式。创建蓝图类后，可将其添加到任意关卡，还可随意添加任意数量的副本到关卡中，无需四处复制脚本。

如您从关卡蓝图开始，然后决定将行为移入蓝图类，此过程将会非常简单。当您从关卡蓝图复制在 Actor 上进行操作的函数（如在一盏灯上调用 Set Brightness），并基于灯光 Actor 的关闭将它们复制到蓝图类中时，函数将更新到适当的范围中。

**扩展阅读：**

-   [关卡蓝图](/documentation/zh-cn/unreal-engine/level-blueprint-in-unreal-engine)
-   [蓝图类](/documentation/zh-cn/unreal-engine/blueprint-class-assets-in-unreal-engine)

## 类变量 vs. 本地变量

在蓝图中进行工作时，可使用 [蓝图编辑器"我的蓝图"面板](/documentation/zh-cn/unreal-engine/my-blueprint-panel-in-the-blueprints-visual-scripting-editor-for-unreal-engine) 标签添加 [变量](/documentation/zh-cn/unreal-engine/blueprint-variables-in-unreal-engine)。在函数中可看到 **本地变量** **My Blueprint** 标签下的额外部分。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58e53b0d-4e48-4d86-a54f-70936edc3374/variableslocal.png)

本地变量拥有适用范围，意味着它们只会出现在定义的范围中。因此，函数中的本地变量仅限该函数可见，其他函数不可见，事件图表也不可见。这有助于减少仅在函数上下文中相关的内容出现的混乱。在函数中使用时，可将本地变量视为"便笺纸"。它们可帮助函数执行操作，函数完成之后即被废弃。

需要从蓝图中多处进行访问的内容即为类变量。因此，诸如对网格体或其他组件的引用，或需要公开以便从其他蓝图访问的变量等均为类变量。使用之后您便会对其留下深刻印象。

## 函数 vs. 宏

**函数** 和 **宏** 两者在外部完成相同目标：它们发送输入到节点，事件发生，然后进行输出。它们以两种不同方式进行，但也存在一些共性：

-   两者均有用于编辑节点功能的中心区域（宏拥有宏图表，函数拥有函数图表）。中央区域发生变化后，调用函数或宏的每个节点均会更新。
-   两者均可重复使用。
-   两者均可使用本地变量。宏使用没有特定的命名，只保存数值的"匿名"本地变量。
-   两者均适用于封装重复使用和清晰性功能。

在更高级的使用情况中将了解到一些主要不同点。

-   放置节点调用函数时，函数将被实际调用。意味着可以函数为目标（如"在另一个对象上调用函数"），而函数则形成蓝图之间的通信。
-   宏接受来自宏图表的节点，并用所有这些节点的副本实际替换宏节点。根本而言，蓝图被编译时，宏将复制所有图表节点，并将它们粘贴到宏节点所在之处。

因它们在后台工作的方式，意味着可进行的操作中存在一些不同：

-   宏可对其范围设定的类（新建宏蓝图时选择的类，或定义本地宏的类）使用任意节点。这意味着放入宏的节点拥有更强的通用性。
-   函数和宏之间最大的差异之一是隐藏节点可放置在宏中，但不可放置在函数中。
-   可覆写子蓝图中的函数功能。例如一个汽车蓝图拥有一个"PlayerInteractedWithMe"函数。在此函数中可按响汽车喇叭。现在假设汽车蓝图拥有两个子项，一个是警车，一个是消防车。可在警车中覆写此函数，使其播放警笛声并开启灯光。也可在消防车中覆写此函数，使其喷水。宏无法实现此类覆写功能。
-   因为宏只在编译时复制粘贴到图表中，一个宏上可存在多条进出的执行引线。无法对函数执行此操作。

总之，如果需要在各处重复使用一些功能，最好使用宏。但如果需要调整蓝图子项中的行为，或需要从另一个蓝图直接进行访问，则最好使用函数！

**扩展阅读：**

-   [函数](/documentation/zh-cn/unreal-engine/functions-in-unreal-engine)
-   [宏](/documentation/zh-cn/unreal-engine/macros-in-unreal-engine)

## 蓝图通信类型

两个蓝图之间存在几种不同通信方法。最常见的使用情况是直接蓝图通信，有时需要实现的功能意味着您将使用事件分配器或蓝图接口替代。如需了解每种通信类型的概览、使用情况范例，以及上手教程，请查阅[蓝图通信用法](/documentation/zh-cn/unreal-engine/blueprint-communication-usage-in-unreal-engine)。

## 常规提示

### 在蓝图编辑器中工作

在蓝图编辑器中工作时，可通过几种技巧寻找到需要使用的节点，以及已创建的节点和注释。

-   在现有蓝图中寻找内容时（无论是变量、函数或注释)，可使用蓝图编辑器中的 **Search** 按钮。如取消勾选 **Find in Current Blueprint Only** 框，可对所有蓝图进行搜索（甚至未加载的蓝图），便于针对应用内容之处进行追踪。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9056b38-9b92-444d-b699-97375b124438/searchresults.png)
-   快捷菜单中只显示可连接到拖出引脚的节点（如从一盏灯拖出时，将显示与灯相关的函数）。尝试寻找在变量或组件上可用的所有潜在功能时，只需通过快捷菜单浏览查找即可。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c957701-b73c-44d9-9c6e-2ddac4bc28ec/contextmenu.png)
-   无论是在快捷菜单还是调色板中，搜索条均十分实用。函数上拥有许多关键词标记，即时您不知道函数的名称，也可轻松找到！
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b203bbda-ee97-4830-a8bb-19289907bb00/search_rotate.png)

### 设置图表

每个人的图表设置偏好均不相同，以下提示可助您对内容进行组织，易于使用。

-   从最初便保持整齐！在编写代码之后再进行清理便会复杂许多。
-   如在一个图表中使用相同节点集超过两次，可考虑将其设为函数或宏以便重复使用。
-   通过节点上下文进行堆栈可使内容在空间上更加紧凑。例如，您拥有一个灯光的引用，然后访问器点光源组件， 即可将这两个节点相互进行堆栈，将它们视作单个块。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2052bf72-f8aa-4587-a0c7-a0e27811ebd6/stackednodes.png)
-   多使用 [注释](/documentation/zh-cn/unreal-engine/comments-in-unreal-engine)！此外还可变更注释框的颜色，以便识别图表的部分。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [关卡蓝图 vs. 蓝图类](/documentation/zh-cn/unreal-engine/blueprint-best-practices-in-unreal-engine#%E5%85%B3%E5%8D%A1%E8%93%9D%E5%9B%BEvs%E8%93%9D%E5%9B%BE%E7%B1%BB)
-   [类变量 vs. 本地变量](/documentation/zh-cn/unreal-engine/blueprint-best-practices-in-unreal-engine#%E7%B1%BB%E5%8F%98%E9%87%8Fvs%E6%9C%AC%E5%9C%B0%E5%8F%98%E9%87%8F)
-   [函数 vs. 宏](/documentation/zh-cn/unreal-engine/blueprint-best-practices-in-unreal-engine#%E5%87%BD%E6%95%B0vs%E5%AE%8F)
-   [蓝图通信类型](/documentation/zh-cn/unreal-engine/blueprint-best-practices-in-unreal-engine#%E8%93%9D%E5%9B%BE%E9%80%9A%E4%BF%A1%E7%B1%BB%E5%9E%8B)
-   [常规提示](/documentation/zh-cn/unreal-engine/blueprint-best-practices-in-unreal-engine#%E5%B8%B8%E8%A7%84%E6%8F%90%E7%A4%BA)
-   [在蓝图编辑器中工作](/documentation/zh-cn/unreal-engine/blueprint-best-practices-in-unreal-engine#%E5%9C%A8%E8%93%9D%E5%9B%BE%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E5%B7%A5%E4%BD%9C)
-   [设置图表](/documentation/zh-cn/unreal-engine/blueprint-best-practices-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%9B%BE%E8%A1%A8)
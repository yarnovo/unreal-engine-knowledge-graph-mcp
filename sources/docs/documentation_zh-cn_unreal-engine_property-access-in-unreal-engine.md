# 虚幻引擎中的属性访问 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/property-access-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:03:34.964Z

---

目录

![属性访问](https://dev.epicgames.com/community/api/documentation/image/e44e411e-40a7-4cca-b0a8-0cde2e8dca63?resizing_type=fill&width=1920&height=335)

使用 **属性访问（Property Access）** ，你可以在动画蓝图中的任何地方访问仅在 **游戏线程（Game Thread）** 上可访问的组件和变量。使用属性访问调用组件或变量会拍摄其数据的快照，你可以使用快照驱动[动画图表](/documentation/zh-cn/unreal-engine/graphing-in-animation-blueprints-in-unreal-engine#%E5%8A%A8%E7%94%BB%E5%9B%BE%E8%A1%A8)、[动画节点函数](/documentation/zh-cn/unreal-engine/graphing-in-animation-blueprints-in-unreal-engine#%E5%8A%A8%E7%94%BB%E8%8A%82%E7%82%B9%E5%87%BD%E6%95%B0)、[蓝图线程安全函数](/documentation/zh-cn/unreal-engine/graphing-in-animation-blueprints-in-unreal-engine#%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E6%9B%B4%E6%96%B0%E5%8A%A8%E7%94%BB)或事件图表中的函数逻辑。使用属性访问可减少项目必须在 **游戏线程（Game Thread）** 上求值的工作量，还可减少你必须执行的手动蓝图脚本数量，从而提高游戏和工作流程性能。

你可以使用以下文档详细了解如何使用属性访问节点、引脚和函数来优化项目的动画系统。

## 概述

创建[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)中的逻辑时，你通常会使用[事件图表](/documentation/zh-cn/unreal-engine/graphing-in-animation-blueprints-in-unreal-engine)设置变量并与其他蓝图和组件交互。事件图表总是在项目的 **游戏线程（Game Thread）** 上求值。

要提高动画系统的性能，你可以使用 **属性访问函数** 在动画图表更新所在的相同 **工作** **线程** 上运行 **事件图表** 函数。例如，你可以使用属性访问来直接访问角色的速度，而无需投射到角色蓝图并创建函数节点以提取速度向量。

不使用属性访问

使用属性访问

![事件图表上的传统投射和变量设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fde4b6e-6e29-4c05-ab70-1fc1a513a98a/traditional.png)

![property access](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb6bc7b1-5a2c-4591-97f5-7d565bc5f6e2/propertyaccess.png)

## 属性访问函数

属性访问的运作方式是对函数图表求值，以拍摄游戏线程变量或组件的数据的快照，并转换该数据以[兼容线程安全](/documentation/zh-cn/unreal-engine/graphing-in-animation-blueprints-in-unreal-engine#%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E6%9B%B4%E6%96%B0%E5%8A%A8%E7%94%BB)。创建属性访问节点时，或在动画蓝图节点引脚上调用属性访问函数时，你可以从访问项目的基础组件和变量的若干预生成函数中选择。

这些函数可提供变量和组件，例如角色的速度、移动方向或移动组件引用，你可以使用它们来驱动AnimGraph中的动画姿势选择或混合。

![属性访问节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee0f6ce0-f684-4a3b-b520-a79f624e7f4b/propertyaccessnode.png)

如需详细了解如何绑定属性访问节点和引脚，请参阅[属性访问绑定](/documentation/zh-cn/unreal-engine/property-access-in-unreal-engine#%E5%B1%9E%E6%80%A7%E8%AE%BF%E9%97%AE%E7%BB%91%E5%AE%9A)小节。

### 自定义属性访问函数

你还可以创建自定义属性访问函数，以便输出更具体或独特的值。要创建自定义属性访问函数，请首先在 **我的蓝图（My Blueprint）** 面板中选择 **添加（Add）** （ **+** ），以便添加新函数至该图表。

![添加函数按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/826fd722-2d2b-42d9-a4ec-e03a5cacac54/addfunction.png)

创建返回节点，并将其连接到函数节点。

![添加返回节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d494656c-393b-4e7c-8c95-e8ea1c94937c/addreturnnode.png)

选择 **返回节点（Return Node）** 并启用 **细节（Details）** 面板中的 **纯（Pure）** 属性。

![启用纯属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/477c42b9-27e3-4491-a257-80c784dd9749/markpure.png)

使用 **添加（Add）** （ **+** ）添加新输出值，并将输出命名为 `ReturnValue` 。

输出必须严格命名为 `ReturnValue` 。其他名称将导致无法从属性访问节点或引脚绑定中访问属性访问函数。

![创建函数输出](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8107ec2-e2e5-49a2-9561-e1656ab8b762/createoutput.png)

现在你可以构建逻辑来设置返回节点的输出引脚，后者会成为绑定到你的函数的属性访问节点或引脚的输出。

现在你可以使用"绑定（Bind）"下拉菜单选择属性访问函数，将该函数绑定到属性访问节点或引脚。属性访问函数根据输出的数据类型进行颜色编码。

![属性节点函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5eff2e02-8007-4a4e-88fc-3077221a7866/pafunction2.png)

为了优化性能，我们推荐你为属性访问函数启用线程安全属性。将函数启用为线程安全后，你还需要使用属性访问来做出所有变量和组件引用。将自定义属性访问函数设为线程安全，就可以显著提高动画系统的性能。

## 属性访问绑定

你可以使用现有动画蓝图节点上的属性访问[节点](/documentation/zh-cn/unreal-engine/property-access-in-unreal-engine#%E4%BD%9C%E4%B8%BA%E8%8A%82%E7%82%B9)或[引脚](/documentation/zh-cn/unreal-engine/property-access-in-unreal-engine#%E4%BD%9C%E4%B8%BA%E5%BC%95%E8%84%9A)绑定，在动画蓝图中的任意地方访问默认和自定义属性访问函数。

### 作为节点

你可以在动画蓝图中的任意地方创建属性访问节点。要创建属性访问节点，请右键点击 **AnimGraph** ，然后从 **变量（Variables）** 类别中选择 **属性访问（Property Access）** 。

![创建属性访问节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c5747ef-f932-4fe8-8ecc-bd30ac7f7875/propertyaccess1.png)

创建属性访问节点后，你需要将其绑定到 **函数** ，以引用你想访问的组件或变量。你还可以绑定满足必要要求的自定义属性访问函数图表。要将函数绑定到属性访问节点，请从 **绑定（Bind）** 下拉菜单选择函数。

函数按层级整理，父组件函数包含对应于其子属性的子函数。例如，你可以浏览到父函数之外，隔离它包含的更具体的属性。在此示例中，创建了从 **TryGetPawnOwner** 到 **GetActorLocation** ，再到特定轴浮点值（ **X** 、 **Y** 或 **Z** ）的Get属性路径。

![绑定属性访问节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f4b568a-80b9-4776-a902-1c9a18156a82/propertyaccess2.png)

绑定属性访问节点后，你可以使用该节点访问图表中的组件或变量，以驱动节点的逻辑。

![属性访问示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b516e959-2659-43d5-a0b8-7bcd2aee53b3/propertyaccess3.png)

## 作为引脚

你还可以将属性访问函数直接绑定到一些AnimNode引脚。要将属性访问函数绑定到AnimNode引脚，请在图表中选择节点，然后在节点的细节面板中找到输入引脚绑定设置。从"引脚（Pin）"下拉菜单中选择 **函数（Function）** ，以动态驱动引脚值。

![作为引脚的属性访问函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e3dc828-12ea-4a02-8145-9177080a1cc8/propertyaccess3.png)

## 属性访问设置

属性访问上下文菜单包含以下选择和属性：

![属性访问上下文菜单设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4882d8a-b37c-449d-b352-3c3904dfb807/pasettings.png)

名称

说明

**调用站点（Call Site）**

**调用站点（Call Site）** 将控制在哪个线程上执行绑定的属性访问函数。你可以选择以下选项：

-   **自动（Automatic）** ：基于上下文和线程安全自动确定绑定的属性访问函数的 **调用站点** 。在大多数情况下，你应该将此项保留为选择内容。
-   **线程安全（Thread Safe）** ：对 **工作线程** 上绑定的属性访问函数求值。
-   **游戏线程（Game Thread）** （ **事件图表前（Pre-Event Graph）** ）：在对 **事件图表** 求值之前，对 **游戏线程** 上绑定的属性访问函数求值。
-   **游戏线程（Game Thread）** （ **事件图表后（Post-Event Graph）** ）：在对 **事件图表** 求值之后，对 **游戏线程** 上绑定的属性访问函数求值。
-   **工作线程（Worker Thread）** （ **事件图表前（Pre-Event Graph）** ）：在对事件图表求值之前，对下一个可用 **工作线程** 上绑定的属性访问函数求值。
-   **工作线程（Worker Thread）** （ **事件图表后（Post-Event Graph）** ）： 在对 **事件图表** 求值之后，对下一个可用 **工作线程** 上绑定的属性访问函数求值。

**函数（Functions）**

选择要绑定到节点或引脚的属性访问函数。

**属性（Properties）**

选择动画蓝图中包含的变量或组件引用，以便可以绑定到属性访问节点或引脚。

## 其他资源

如需详细了解如何使用蓝图线程安全函数和属性访问来优化动画系统，请参阅[动画优化](/documentation/zh-cn/unreal-engine/animation-optimization-in-unreal-engine)文档。

[](/documentation/zh-cn/unreal-engine/animation-optimization-in-unreal-engine)

[![动画优化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7570a0d-7223-4bf9-9291-f93e82df2314/topicimage.png)](/documentation/zh-cn/unreal-engine/animation-optimization-in-unreal-engine)

[动画优化](/documentation/zh-cn/unreal-engine/animation-optimization-in-unreal-engine)

[使用各种方法和技术优化动画蓝图的性能和稳定性。](/documentation/zh-cn/unreal-engine/animation-optimization-in-unreal-engine)

如需了解使用蓝图线程安全函数和属性访问来获取动画变量的工作流程示例，请参阅[如何获取动画变量](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine)文档。

[](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine)

[![如何获取动画变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a722105c-4ed9-46db-a8cb-4d4d0878b485/topicimage.png)](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine)

[如何获取动画变量](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine)

[如何获取并使用动画变量，以便在动画蓝图事件图表和线程安全型函数中设置角色动画。](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine)

如需了解优化虚幻引擎项目以使用线程安全函数的工作流程示例，请参阅[调整Lyra的动画系统](https://www.unrealengine.com/zh-CN/tech-blog/adapting-lyra-animation-to-your-ue5-game)博客文章。

-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [animation blueprints](https://dev.epicgames.com/community/search?query=animation%20blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/property-access-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [属性访问函数](/documentation/zh-cn/unreal-engine/property-access-in-unreal-engine#%E5%B1%9E%E6%80%A7%E8%AE%BF%E9%97%AE%E5%87%BD%E6%95%B0)
-   [自定义属性访问函数](/documentation/zh-cn/unreal-engine/property-access-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E8%AE%BF%E9%97%AE%E5%87%BD%E6%95%B0)
-   [属性访问绑定](/documentation/zh-cn/unreal-engine/property-access-in-unreal-engine#%E5%B1%9E%E6%80%A7%E8%AE%BF%E9%97%AE%E7%BB%91%E5%AE%9A)
-   [作为节点](/documentation/zh-cn/unreal-engine/property-access-in-unreal-engine#%E4%BD%9C%E4%B8%BA%E8%8A%82%E7%82%B9)
-   [作为引脚](/documentation/zh-cn/unreal-engine/property-access-in-unreal-engine#%E4%BD%9C%E4%B8%BA%E5%BC%95%E8%84%9A)
-   [属性访问设置](/documentation/zh-cn/unreal-engine/property-access-in-unreal-engine#%E5%B1%9E%E6%80%A7%E8%AE%BF%E9%97%AE%E8%AE%BE%E7%BD%AE)
-   [其他资源](/documentation/zh-cn/unreal-engine/property-access-in-unreal-engine#%E5%85%B6%E4%BB%96%E8%B5%84%E6%BA%90)
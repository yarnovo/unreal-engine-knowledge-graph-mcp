# 虚幻引擎中的动画蓝图事件节点 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-blueprint-event-nodes-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:03:38.974Z

---

目录

![动画蓝图事件节点](https://dev.epicgames.com/community/api/documentation/image/39d7541c-659e-4996-bb96-34fd0ac05369?resizing_type=fill&width=1920&height=335)

在动画蓝图的 **事件图表（EventGraph）** 中, 事件节点可用作动画蓝图逻辑的起始或激活点。本文将介绍各类可用于在虚幻引擎中创建动画逻辑的动画事件节点。

![动画蓝图事件图表事件节点概览示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a55b75fe-11c9-486e-ace5-3562e9af2e19/overview.png)

在事件图表中，事件节点为红色，并且由节点右上角的 **箭头图标** 来表示。

![箭头图标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73b575a4-ce77-4e4a-b704-cedde9ee5b3b/arrowicon.png)

在事件图表中右键点击，然后从菜单的 **添加事件（Add Event）** 部分可以选择节点来添加。

![在动画蓝图事件图表中添加事件节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e93b5d3d-53ef-434e-b576-8383b869b4a2/addeventnode.png)

一个动画蓝图的事件图表只能包含一个同一种类型的事件节点。但是可以同时在同一个节点上连接多个函数。

事件图表事件节点不包含输入引脚，因为它们是一连串动画逻辑的起点。事件节点的输出执行引脚会在事件节点激活的时候初始化按序连接的节点。每个类型的事件节点都由一组参数来激活。

![输出引脚](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/054df30b-5b28-43d6-bd9a-06695ac1978f/outputpin.png)

你可以选用以下动画事件节点类型之一作为一连串逻辑的起始点。

## 动画时间节点类型

你可以选用以下动画事件节点类型之一和指定的参数作为一连串逻辑的起始点。

节点类型

图片

描述

**蓝图开始播放（Blueprint Begin Play）**

![event blueprint begin play event node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18a6595f-2acc-44ac-99ca-d2aef1bb5f2b/beginplay.png)

**事件蓝图开始播放（Event Blueprint Begin Play）** 事件节点会在其所属的组件被[播放](/documentation/zh-cn/unreal-engine/playing-and-simulating-in-unreal-engine)函数激活时激活其连接的任何逻辑。该节点连接的逻辑中，其所属的对象会比动画函数初始化都更先激活。把光标悬浮在节点上方，你可以参考节点所属的组件或者目标。

**蓝图初始化动画（Blueprint Initialize Animation）**

![event blueprint initialize animation event node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6331aa87-e91c-4aef-aad3-597cbbcd6e4e/bpinit.png)

**蓝图初始化动画（Blueprint Initialize Animation）** 事件节点会在当前动画蓝图在运行时第一次构建时激活其连接的节点来执行初始化。使用该节点可以连接在动画蓝图开始时激活一次的逻辑。

**蓝图链接初始化的动画分层（Blueprint Linked Animation Layers Initialized）**

![event blueprint linked animation layers initialized event node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba6d4c51-3d44-4d72-8eac-398b4522965e/linkedaniminit.png)

**蓝图链接初始化的动画分层（Blueprint Linked Animation Layers Initialized）** 事件节点会在所有动画分层完成初始化时激活连接的节点。你可以使用该节点来运行一次逻辑，会在所有动画分层完成初始化时激活。

**蓝图后期运算动画（Blueprint Post Evaluate Animation）**

![event blueprint post evaluate animation event node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/459f8858-e44d-4751-991d-2bf9834670fa/postevaluate.png)

**蓝图后期运算动画（Blueprint Post Evaluate Animation）** 事件节点会在动画蓝图完成运算后激活连接的节点。可以用该节点来激活蓝图完成运算后运行的逻辑。

**蓝图更新动画（Blueprint Update Animation）**

![event blueprint update animation event node loop update every frame](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b6a7f47-1e4b-400a-bbb6-e5972fefcb38/updateanim.png)

**蓝图更新动画（Blueprint Update Animation）** 事件节点每帧运行，可以让动画蓝图给任何需要的数值进行运算和更新。该事件节点是事件图表 **更新循环（update loop）** 的起始点。从上一次更新所用的时间可以从 **DeltaTimeX** 输出引脚获取，这样可以进行以时间为准的插值或者区间更新。

## 高级动画事件节点类型

你可以在动画蓝图事件图表中使用以下事件节点来按照项目特定的参数、玩家输入和自定义参数开始动画逻辑。

节点类型

图片

描述

**输入（Input）**

![input keypress event node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d7fa4ca-fa3a-483e-aa1a-0c42b9fda5c1/keypress.png)

**输入（Input）** 事件节点会在收到指定的[玩家输入](/documentation/zh-cn/unreal-engine/input-in-unreal-engine)时激活连接的逻辑，取决于逻辑连接的输出引脚，该输入可以是按下或释放。可以通过该节点来创建由用户输入控制的动画逻辑，并包含指定的输入函数，比如按键、鼠标移动或者触摸控制。

**输入动作（Input Action）**

![input action event node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9dc53ff5-923b-494a-9151-5790c1d0ed39/action.png)

**输入动作（Input Action）** 事件节点可以在玩家在运行时进行定义好的[输入动作](/documentation/zh-cn/unreal-engine/input-in-unreal-engine)时激活连接的逻辑。可以通过该节点来创建由用户与项目中特定系统的互动来控制的动画逻辑。这些系统可以在项目设置中定义。

**动画通知（Anim Notify）**

![anim notify event node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78987158-8ec2-454d-bee4-02e63546507f/notify.png)

**动画通知（Anim Notify）** 事件节点可以在连接的[动画通知](/documentation/zh-cn/unreal-engine/animation-notifies-in-unreal-engine)在动画中被激活时激活动画逻辑。这些节点由你项目中的 **动画通知（Anim Noties）** 控制，并且会在通知在动画序列、合成或蒙太奇中触发时激活所连接的动画逻辑。你可以用该事件节点创建连接到动画播放的动画逻辑。

**自定义事件（Custom Event）**

![custom event node in animbp eventgraph](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a691bd0d-d499-4880-a4e1-1a9cba9c0bbc/customevent.png)

**自定义事件（Custom Event）** 节点可以用于构建和定义激活项目中动画逻辑的自定义参数。参考[](/documentation/404)文档来获取更多关于蓝图和蓝图节点的信息。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [animation features](https://dev.epicgames.com/community/search?query=animation%20features)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [动画时间节点类型](/documentation/zh-cn/unreal-engine/animation-blueprint-event-nodes-in-unreal-engine#%E5%8A%A8%E7%94%BB%E6%97%B6%E9%97%B4%E8%8A%82%E7%82%B9%E7%B1%BB%E5%9E%8B)
-   [高级动画事件节点类型](/documentation/zh-cn/unreal-engine/animation-blueprint-event-nodes-in-unreal-engine#%E9%AB%98%E7%BA%A7%E5%8A%A8%E7%94%BB%E4%BA%8B%E4%BB%B6%E8%8A%82%E7%82%B9%E7%B1%BB%E5%9E%8B)

相关文档

[

蓝图可视化脚本

![蓝图可视化脚本](https://dev.epicgames.com/community/api/documentation/image/a7cce2f7-f09a-4340-b3f4-2a5d4823bc46?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)
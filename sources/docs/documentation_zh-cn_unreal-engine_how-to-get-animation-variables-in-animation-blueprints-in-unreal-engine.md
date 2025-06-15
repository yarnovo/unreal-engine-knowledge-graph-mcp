# 如何获取虚幻引擎动画蓝图中的动画变量 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:09:38.436Z

---

目录

![如何获取动画变量](https://dev.epicgames.com/community/api/documentation/image/44fd9e45-7b95-423c-802c-86b2c27935da?resizing_type=fill&width=1920&height=335)

为 **虚幻引擎（Unreal Engine）** 中的角色开发[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)时，你可以通过动态运动和移动 **变量** 来控制动画行为。

本文将介绍如何设置动画蓝图的 **EventGraph** 逻辑，以便在项目中计算这些变量。此外，本文还将介绍如何在 **线程安全** 的 [蓝图函数](/documentation/zh-cn/unreal-engine/graphing-in-animation-blueprints-in-unreal-engine#cpu%E7%BA%BF%E7%A8%8B%E4%BD%BF%E7%94%A8%E5%92%8C%E6%80%A7%E8%83%BD)中计算这些变量，并通过[属性访问（property access）](/documentation/zh-cn/unreal-engine/graphing-in-animation-blueprints-in-unreal-engine#%E5%B1%9E%E6%80%A7%E8%AE%BF%E9%97%AE)节点提高项目性能和稳定性。

#### 先决条件

-   一个带有[移动组件](/documentation/zh-cn/unreal-engine/movement-components-in-unreal-engine)的可操控的第三人称角色。

如有必要，你可以使用[第三人称模板项目](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine)中的角色。

## 角色对象引用

大部分动画变量可以在 **EventGraph** 中，通过角色的[移动组件](/documentation/zh-cn/unreal-engine/movement-components-in-unreal-engine)计算。为了使角色的移动组件计算动画变量，你必须先创建一个引用变量。

首先，在角色的动画蓝图中的 **EventGraph** 中，创建 **Event Blueprint Initialization Animation** 节点。

![event blueprint initialize animation动画蓝图事件图表节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dba30f98-e1db-4e40-a4a4-ffac9323d3ff/ebia.png)

从 **Event Initialization** 节点创建 **Cast** 节点，用于将动画蓝图转换为角色的蓝图。

在工作流程示例中，角色的蓝图是第三人称模板项目中的 `BP_ThirdPersonCharacter`。

然后，创建 **Get Owning Actor** 节点，并将其 **返回值（Return Value）** 输出引脚连接到 **Cast** 节点的 **对象（Object）** 输入引脚。

![类型转换为第三人称角色蓝图的cast事件图表动画蓝图节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f94977b-c3e6-418e-9fc5-54de0ae56503/cast.png)

接下来，**右键点击** Cast节点的 **作为角色（As Character）** 输出引脚，并从上下文菜单选择 **提升为变量（Promote to Variable）** 选项，以创建角色对象引用变量。

连接逻辑之后，可以在蓝图的 **EventGraph** 和 **AnimGraph** 中访问 **角色对象** 引用变量。

![设置角色引用变量，类型转换为第三人称蓝图动画蓝图节点事件图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0084cb5c-88e5-4417-8a31-92c7caf872f6/thirdpbp.png)

## 移动组件引用

为了将角色的 **移动组件（Movement Component）** 与 **角色对象（Character Object）** 分离，需要 **Get Character Movement** 节点。从 **Set Character** 变量节点的 **角色（Character）** 输出引脚，创建 **Get Character Movement** 节点。

![从character reference节点创建get character movement节点来获取角色移动](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ab1f528-699b-43ce-8851-9b3ea678a8fd/getcharmovement.png)

接下来，**右键点击** 变量的 **角色移动（Character Movement）** 输出引脚，并从上下文菜单选择"提升为变量（promote to variable）"，以创建移动组件引用变量。

![在事件图表中设置角色移动组件引用变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76a33308-330b-4a77-aba7-0c39e15d8181/charmovement.png)

连接逻辑之后，可以在蓝图的 **EventGraph** 和 **AnimGraph** 中访问 **角色移动组件** 引用变量。

![完全角色引用和移动组件引用动画蓝图事件图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf961bdc-290b-4f32-a3cd-c5b0346300ec/fullcharbp.png)

## 速度

在计算需要方向或速度的动画时，使用角色的速度值会很有用。

要在 **EventGraph** 中创建速度变量，请首先创建 **Event Blueprint Update Animation** 节点。

接下来，将 **移动组件（Movement Component）** 引用变量添加到 **EventGraph** 。然后，你可以使用 **Get Velocity** 节点计算表示移动组件的移动方向和大小的矢量值。

![根据移动组件引用变量创建get velocity节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3dd75220-800a-47b6-8432-ebd57daa1ca7/getvelocity.png)

接下来，**右键点击** **Get Velocity** 节点的 **速度（Velocity）** 输出，并从上下文菜单选择 **提升为变量（Promote to Variable）** 选项，以创建速度变量。

连接逻辑之后，可以在蓝图的 **EventGraph** 和 **AnimGraph** 中访问 **速度（Velocity）** 变量。

![事件图表中的完全速度引用变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2119b57b-6a9b-4cee-9245-52dbd4035ff0/velocity.png)

这里，**Print String** 节点会使用角色速度的更新 **X** 、 **Y** 和 **Z** 值每帧发送调试消息。

![速度打印字符串演示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/679ba1ed-4b0b-46d8-8896-bb89af79509a/velocityegdemo.gif)

### 线程安全

首先在角色的动画蓝图中创建新的线程安全型函数。

然后，**右键点击** 图表以创建 **property access** 节点。

从 **property access** 节点的下拉菜单，选择函数 **Try Get Pawn Owner > Get Movement Component > Velocity** 。然后右键点击矢量输出引脚并选择"提升为变量（promote to variable）"，以创建速度变量。

![速度获取property access上下文菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a25fc2cf-6e17-4698-8671-4f028dac9353/pa.png)

连接逻辑之后，可以在蓝图的 **EventGraph** 和 **AnimGraph** 中访问 **速度（Velocity）** 变量。

![速度线程安全型图表完全函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/674b270e-1629-4ea4-95d4-e76dc1c73aab/velocityts.png)

为了在项目运行时期间更新此函数，请将线程安全型Velocity函数添加到 **蓝图线程安全更新动画（Blueprint Thread Safe Update Animation）** 图表。

![将velocity线程安全型函数添加到蓝图线程安全更新函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a71975a-6c2c-4310-9d9b-b6d1e0be000e/bptsfvelocity.png)

角色的动画蓝图现在会通过线程安全的方式计算角色的速度。

## 角色速度

根据角色的速度选择动画（例如奔跑或行走状态）时，使用角色移动速度变量可能很有用。

你可以根据速度变量创建 **Vector Length XY** 节点，将角色的速度与移动组件速度分离。

接下来，**右键点击** **Vector Length XY** 节点的 **返回值（Return Value）** 输出引脚，从上下文菜单选择 **提升为变量（Promote to Variable）** 。

![创建vectory xy节点以从变量函数分离速度](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99f339e3-9809-4f1e-977b-ade265b79ae5/speed.png)

连接逻辑之后，可以在蓝图的 **EventGraph** 和 **AnimGraph** 中访问 **速度（Speed）** 变量。

这里，**Print String** 节点会使用角色速度的更新值每帧发送调试消息。

![print string调试显示角色速度演示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ea93d05-ebbb-4ec6-b1bc-7a3cb6dc60b7/speedegdemo.gif)

### 线程安全

首先在角色的动画蓝图中创建新的线程安全型函数。

接下来，创建 **property access** 节点并从下拉菜单选择 **Try Get Pawn Owner > Movement Component > Velocity** 函数。

从 **property access** 节点的输出，创建 **Vector Length XY** 节点以提取前向和横向运动（ **X** 和 **Y** 轴）。

![用于获取角色速度的线程安全型函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c95c769a-9f0d-49cc-ad74-082ce440a833/groundspeedts.png)

为了在项目运行时期间更新此函数，请将线程安全型Speed函数添加到 **蓝图线程安全更新动画（Blueprint Thread Safe Update Animation）** 图表。

![将线程安全型speed函数添加到蓝图线程安全更新函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7962e455-f3a7-476a-a6a3-74531804d16e/bptsfspeed.png)

角色的动画蓝图现在会通过线程安全的方式计算角色的速度。

## 移动阈值

要控制角色的移动何时应该触发动画播放，你可以创建"移动阈值（Movement Threshold）"变量，以在角色的速度达到设定大小时允许移动。

根据 **EventGraph** 中角色的速度变量，创建 **Greater Than or Equal To (>=)** 节点并将值设置为较低的数字。

该数字可以是非常小的值，例如 `0.1` 。

**右键点击** **Greater Than or Equal To (>=)** 节点的布尔值输出引脚，并从上下文菜单选择 **提升为变量（Promote to Variable）** 。

![添加greater than or equal to节点以设置将允许动画更新的最小移动](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce51b0b5-0eba-4ee6-ac5b-9ba4eaea0ddc/greaterthan.png)

连接逻辑之后，可以在动画蓝图的 **EventGraph** 和 **AnimGraph** 中访问 **移动阈值（Movement Threshold）** 变量。

这里，**Print String** 节点会使用角色的移动阈值变量的更新状态每帧发送调试消息。

![should move调试文本演示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42cab4e2-2199-4129-8dd5-85e906761e45/shouldmoveegdemo.gif)

### 线程安全

首先在角色的动画蓝图中创建新的线程安全型函数。

在线程安全型图表中创建 **property access** 节点，并将该节点设置为 **Try Get Pawn Owner > Movement Component > Velocity** 。通过 **Vector Length XY** 函数节点提取前向和横向移动。

然后通过 **Greater Than or Equal To (>=)** 节点，设置移动动画不应该发生的速度阈值。

该数字可以是非常小的值，例如 `0.1`。

**右键点击** **Greater Than or Equal To (>=)** 节点的布尔值输出引脚，并从上下文菜单选择 **提升为变量（Promote to Variable）** 。

![Should Move线程安全型函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/597a0d4c-0c66-4656-85bb-89b9fbe63005/shouldmovets.png)

为了在项目运行时期间更新此函数，请将线程安全型Should Move函数添加到 **蓝图线程安全更新动画（Blueprint Thread Safe Update Animation）** 图表。

![将should move线程安全型函数添加到蓝图线程安全更新函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/415d2809-ab87-4089-8162-882eeb33fa89/bptsfshouldmove.png)

角色的动画蓝图现在会在线程安全型函数中计算角色的移动阈值变量。

## 跳跃和坠落

你可以使用"跳跃和坠落（Jumping and Falling）"变量来决定何时在角色的 **AnimGraph** 中播放跳跃和着地动画。

首先在动画蓝图的 **EventGraph** 中创建 **移动组件（Movement Component）** 变量。

现在你可以根据 **movement component** 引用变量节点创建 **IsFalling** 函数节点。

**右键点击** **Is Falling** 节点的 **返回值（Return Value）** 输出引脚，并从上下文菜单选择 **提升为变量（Promote to Variable）选项** 。

![添加greater than or equal to节点以决定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd0032a0-13be-497f-a2c7-a001292b5531/image_19.png)

连接逻辑之后，可以在动画蓝图的 **EventGraph** 和 **AnimGraph** 中访问 **跳跃和坠落（Jumping and Falling）** 变量。

这里，**Print String** 节点会使用角色的跳跃和坠落变量的更新状态每帧发送调试消息。

!\[[should move调试文本演示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef562466-9144-4844-9cd3-758d6408ff0f/isfalling.gif)

### 线程安全

首先在角色的动画蓝图中创建新的线程安全型函数。

创建 **property access** 节点，并将该节点设置为 **Try Get Pawn Owner > Get Movement Component > IsFalling** 。

**右键点击** property access节点的输出引脚并从上下文菜单选择 **提升为变量（Promote to Variable）** 选项。

![蓝图线程安全型函数is falling](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f27efbc9-1364-4d0d-85ec-367e79e330a8/isfallingts.png)

为了在项目运行时期间更新此函数，请将线程安全型Is Falling函数添加到 **蓝图线程安全更新动画（Blueprint Thread Safe Update Animation）** 图表。

![将线程安全型is falling函数添加到蓝图线程安全更新函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e12f9fe-7f52-4c70-9b3e-1b832e6d3105/bptsfshouldmove.png)

角色的动画蓝图现在会在线程安全型函数中计算角色的跳跃和坠落状态变量。

## EventGraph引用

这里你可以在示例工作流程中使用的 **EventGraph** 中引用完全 **事件蓝图更新动画（Event Blueprint Update Animation）** 逻辑。

![事件图表上的完整更新函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/396b8069-b9b1-43d2-88d1-4694b542f634/fulleventgraph.png)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [variables](https://dev.epicgames.com/community/search?query=variables)
-   [how-to](https://dev.epicgames.com/community/search?query=how-to)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [角色对象引用](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine#%E8%A7%92%E8%89%B2%E5%AF%B9%E8%B1%A1%E5%BC%95%E7%94%A8)
-   [移动组件引用](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine#%E7%A7%BB%E5%8A%A8%E7%BB%84%E4%BB%B6%E5%BC%95%E7%94%A8)
-   [速度](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine#%E9%80%9F%E5%BA%A6)
-   [线程安全](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine#%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8)
-   [角色速度](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine#%E8%A7%92%E8%89%B2%E9%80%9F%E5%BA%A6)
-   [线程安全](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine#%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8-2)
-   [移动阈值](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine#%E7%A7%BB%E5%8A%A8%E9%98%88%E5%80%BC)
-   [线程安全](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine#%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8-3)
-   [跳跃和坠落](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine#%E8%B7%B3%E8%B7%83%E5%92%8C%E5%9D%A0%E8%90%BD)
-   [线程安全](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine#%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8-4)
-   [EventGraph引用](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine#eventgraph%E5%BC%95%E7%94%A8)
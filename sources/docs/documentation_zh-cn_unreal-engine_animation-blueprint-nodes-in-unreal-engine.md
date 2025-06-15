# 虚幻引擎中的动画蓝图节点 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-blueprint-nodes-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:03:38.710Z

---

目录

![动画节点参考](https://dev.epicgames.com/community/api/documentation/image/b34b522b-cb9c-4998-b4da-a2457e6af221?resizing_type=fill&width=1920&height=335)

[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine) (**AnimBP**) 是一种特殊的[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)，可以控制物体的动画行为。动画蓝图包含两个图表，[事件图表](/documentation/zh-cn/unreal-engine/graphing-in-animation-blueprints-in-unreal-engine#%E4%BA%8B%E4%BB%B6%E5%9B%BE%E8%A1%A8)用于控制动画的逻辑和交互，[动画图表](/documentation/zh-cn/unreal-engine/graphing-in-animation-blueprints-in-unreal-engine#%E5%8A%A8%E7%94%BB%E5%9B%BE%E8%A1%A8)用于控制物体的动画姿势。动画蓝图中的所有图表都使用[节点](/documentation/zh-cn/unreal-engine/nodes-in-unreal-engine)来进行操作。这些节点按照它们在动画蓝图中的作用分为几种不同的类型。

## 动画节点结构

动画图表和事件图表中的动画蓝图节点包含 **输入** 和 **输出** 引脚，用于传递信息。

![输入和输出引脚](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77d845cf-43ac-4759-abbc-86adc70fffde/inputandoutputpins.png)

此外，动画蓝图还有属性引脚（比如数据值或变量），可以通过动画蓝图中的动画图表和事件图表中的关联函数进行修改。

![属性引脚](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01d3b5e8-9e8c-4506-a975-d3a1236fd7be/propertypins.png)

在动画蓝图中选中节点，**细节（Details）** 面板中也会显示节点属性。

![动画蓝图节点细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1fbf4d0f-3348-47c7-a7e9-49acffd70aca/detailspanel.png)

## 事件图表节点

事件图表用于处理输入的数据，然后数据会用于在动画图表中驱动姿势数据，比如触发播放、启用或停用动画函数以及更新动画数据。

![事件图表动画蓝图示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f78c782-212b-4137-8813-057a98ddb32f/eventgraphex.png)

在 **动画事件（Animation Events）** 文档中，你可以查看 **事件图表（EventGraph）** 动画蓝图节点的功能和属性。

[](/documentation/zh-cn/unreal-engine/animation-blueprint-event-nodes-in-unreal-engine)

[![动画蓝图事件节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19d42b78-2fcd-43c7-bdd3-d9321519719b/topicimage.png)](/documentation/zh-cn/unreal-engine/animation-blueprint-event-nodes-in-unreal-engine)

[动画蓝图事件节点](/documentation/zh-cn/unreal-engine/animation-blueprint-event-nodes-in-unreal-engine)

[介绍动画蓝图事件节点，用于初始化和更新来自动画蓝图事件图表的动画和动画逻辑。](/documentation/zh-cn/unreal-engine/animation-blueprint-event-nodes-in-unreal-engine)

## 动画图表节点

**动画图表（AnimGraph）** 节点使用来自 **事件图表（EventGraph）** 的数据，以此决定物体每一帧的动画姿势。

![动画图表动画蓝图示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/504d6b1e-362e-4010-9cfa-c10a40011ea4/animgraphex.png)

以下是各个主要动画图表节点的参考文档。

[](/documentation/zh-cn/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine)

[![混合节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e01faf4e-137c-4fb7-aab7-15ec7ff1d09a/topicimage.png)](/documentation/zh-cn/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine)

[混合节点](/documentation/zh-cn/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine)

[根据特定条件，将多个动画混合在一起的动画节点。](/documentation/zh-cn/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine)

[

![骨骼控制](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce8b03e8-06d7-4814-a5ad-d330b6c7c319/topicimage.png)

骨骼控制

用于直接操控目标骨架的骨骼并对其应用解算器的动画节点。





](/documentation/zh-cn/unreal-engine/animation-blueprint-skeletal-controls-in-unreal-engine)[

![空间转换节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b1dc153-683f-4455-9b63-a0f477156877/topicimage.png)

空间转换节点

在本地和组件空间之间转换姿势的动画节点。





](/documentation/zh-cn/unreal-engine/animation-blueprint-component-space-conversion-in-unreal-engine)[

![FABRIK动画蓝图节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/748be41e-9d17-4c7d-8d76-b02f4a9d438b/topicimage.png)

FABRIK动画蓝图节点

介绍FABRIK动画节点。





](/documentation/zh-cn/unreal-engine/fabrik-animation-blueprint-in-unreal-engine)

## 动画节点姿势观看

使用动画蓝图时，你可以在特定动画蓝图节点上开启 **姿势观看（Pose Watching）**，从而在 **视口（Viewport）** 中查看用不同颜色表示的姿势调试图像。

![动画蓝图姿势观看示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3d827c0-6978-4ef0-bbc7-fb41ed13a7f9/posewatch.png)

要启用这个功能，**右键单击** 包含姿势数据的节点，并选择 **切换姿势观看（Toggle Pose Watch）**。

![动画蓝图姿势观看示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/feb468ec-c5e7-4775-aec4-23bc2a98a37e/toggleposewatch.png)

你还可以同时使用多个活跃的姿势观看节点，可以比较蓝图中不同时刻的姿势，以找出当前姿势引入错误的确切时刻。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fed04e80-4569-4802-bac6-cb60f31d897d/posewatch.png)

单击节点左上角的图标可以隐藏观看的姿势。要改变观看姿势的颜色，在 **菜单栏（Menu Bar）中找到** 窗口（Window） > 姿势观看管理器（Pose Watch Manager）\*\* 并且选择要改变的姿势旁边的颜色选项。

![动画蓝图姿势观看管理器示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9b628b7-a44a-4177-8d05-99163898552e/posewatchmanager.png)

你可以在取色器窗口中停用姿势观看，或者在动画节点上重新选择 **切换姿势观看（Toggle Pose Watch）** 来停用姿势观看。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [animation features](https://dev.epicgames.com/community/search?query=animation%20features)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [动画节点结构](/documentation/zh-cn/unreal-engine/animation-blueprint-nodes-in-unreal-engine#%E5%8A%A8%E7%94%BB%E8%8A%82%E7%82%B9%E7%BB%93%E6%9E%84)
-   [事件图表节点](/documentation/zh-cn/unreal-engine/animation-blueprint-nodes-in-unreal-engine#%E4%BA%8B%E4%BB%B6%E5%9B%BE%E8%A1%A8%E8%8A%82%E7%82%B9)
-   [动画图表节点](/documentation/zh-cn/unreal-engine/animation-blueprint-nodes-in-unreal-engine#%E5%8A%A8%E7%94%BB%E5%9B%BE%E8%A1%A8%E8%8A%82%E7%82%B9)
-   [动画节点姿势观看](/documentation/zh-cn/unreal-engine/animation-blueprint-nodes-in-unreal-engine#%E5%8A%A8%E7%94%BB%E8%8A%82%E7%82%B9%E5%A7%BF%E5%8A%BF%E8%A7%82%E7%9C%8B)

相关文档

[

蓝图可视化脚本

![蓝图可视化脚本](https://dev.epicgames.com/community/api/documentation/image/a7cce2f7-f09a-4340-b3f4-2a5d4823bc46?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)
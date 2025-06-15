# 虚幻引擎中的动画蓝图Trail Controller | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-blueprint-trail-controller-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:04:39.007Z

---

目录

![Trail Controller](https://dev.epicgames.com/community/api/documentation/image/9676f444-f595-46af-8dd5-2aa4d819877b?resizing_type=fill&width=1920&height=335)

你可以使用 **Trail Controller** [动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)节点来定义骨骼链，并根据父骨的延迟动作信息制作动画。

![trail controller骨骼控制点动画蓝图节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65896904-9e21-44db-a67c-9e20cc664328/trailcontroller.png)

你可以使用Trail Controller节点，让角色的带骨骼附件（例如尾巴、披风或配饰）创建逼真的尾随动画。

![trail controller骨骼控制点动画蓝图节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0c14aae-3eb3-4687-9301-6b8371261469/taildemo.gif)

通过将骨骼定义为 **尾迹骨骼（Trail Bone）** ，你可以从 **尾迹骨骼（Trail Bone）** 中选择链中有多少骨骼将受Trail Controller节点影响。然后，你可以在变换上对 **拉伸（Stretch）** 、 **旋转（Rotation）** 甚至是 **刨刀限制（Planer Limits）** 设置约束。

## 属性参考

![trail controller骨骼控制点动画蓝图节点细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5faf323f-435e-44c6-83ce-569b58c0a085/details.png)

下面你可以参考Trail Controller节点的一系列尾迹属性。

属性

说明

**尾迹骨骼（Trail Bone）**

设置链结构末尾的骨骼以尾随父骨骼运动。

**链长度（Chain Length）**

从尾迹骨骼中设置链中受影响的骨骼数量。

**链骨骼轴（Chain Bone Axis）**

设置轴（**X** 、 **Y** 或 **Z**）以调整链上各个点彼此之间的朝向。

**反转链骨骼轴（Invert Chain Bone Axis）**

设置比例alpha以应用 **关系速度比例输入处理器（Relation Speed Scale Input Processor）** 属性。值为0时将禁用效果，而值为1时则会完全启用效果。大于1的值将用作乘数。

**尾迹放松速度（Trail Relaxation Speed）**

此处你可以使用 **尾迹放松速度图表** 来设置一个曲线，定义变换返回动画姿势时的行为。

![trail controller尾迹放松速度比例图表细节属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89b95ce9-3514-4e71-9a06-0b58a7561dc5/graph.png)

你可以使用属性设置中的图表编辑器来编辑图表的开始点和结束点，从而控制链的行为如何返回动画姿势。你也可以右键点击图表，在图表上添加新的点来操控曲线位置。

图表的X轴在0到1的范围内，并且映射到关节链。0表示链中的最后一个关节，1表示最靠近 **尾迹骨骼（Trail Bone）** 的关节。

图表的Y轴将控制延迟的运动传递到链中下一个关节的速度。值小于或等于0时，将阻止关节继续传递延迟的运动。值越大，延迟的运动传递得越快。Y轴用作绝对值来防止帧依赖性。默认范围是5到10，这样可更快从根关节返回到底部关节。

### 限制属性

![trail controller骨骼控制点动画蓝图节点细节面板限制属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c87b2cf2-7cb7-45e5-9e0b-e3d9ea567e92/otherprops.png)

下面你可以参考Trail Controller节点的一系列限制、速度和旋转属性

属性

说明

**限制拉伸（Limit Stretch）**

启用对结构拉伸的约束。该约束可以在 **拉伸限制（Stretch Limits）** 属性中设置。

**限制旋转（Limit Rotation）**

在链中的每个点上启用旋转约束和偏移。可以使用 **旋转限制（Rotation Limits）** 属性中的 **索引（Indexes）** 对链中的每个点设置旋转约束。

**使用刨刀限制（Use Planer limit）**

启用刨刀约束以剔除超过了所设定平面的运动。这些平面可以在 **刨刀限制（Planer limit）** 属性中添加和设置。

**最长增量时间（Max Delta Time）**

要避免拉伸链所导致的卡顿，你可以使用此属性限制增量时间的长度。例如，如果你需要播放30 fps尾迹动画，请将此属性设置为0.03333f（即1/30）。

**旋转限制（Rotation Limits）**

沿链中的各个点设置每个关节处的旋转限制。最高的 **索引** 编号表示 **尾迹骨骼（Trail Bone）** ， **索引0** 表示链中离 **尾迹骨骼（Trail Bone）** 最远的骨骼。

**下限（Limit Min）** ：在 **X** 、 **Y** 和 **Z** 轴上设置旋转的范围下限。 **上限（Limit Max）** ： 在 **X** 、 **Y** 和 **Z** 轴上设置旋转的范围上限。

**旋转偏移（Rotation Offsets）**

设置每个关节的 **X** 、 **Y** 和 **Z** 轴沿链的旋转偏移，以度数为单位。最高的 **索引** 编号表示 **尾迹骨骼（Trail Bone）** ， **索引0** 表示链中离 **尾迹骨骼（Trail Bone）** 最远的骨骼。

**刨刀限制（Planer Limits）**

添加并设置刨刀限制，以约束链的运动，防止跨越平面。使用 **添加（Add (+)）** 添加刨刀限制后，你可以调整以下属性来设置刨刀限制：

**驱动骨骼（Driving Bone）** ：从角色的[骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)选择将成为参考点的骨骼，以设置 **平面变换（Plane Transform）** 属性。 **平面变换（Plane Transform）** ：设置刨刀属性 **位置（Location）** 、 **旋转（Rotation）** 和 **比例（Scale）** 以限制链相对于 **驱动骨骼（Driving Bone）** 的运动。

**拉伸限制（Stretch Limits）**

选择链结构可以从参考姿势拉伸多远。值为0时将禁用拉伸，值大于0时将按该值增加可能的拉伸量。

**Actor空间伪速度（Actor Space Fake Vel）**

启用该属性时，将在Actor空间中应用模拟速度。禁用该属性时，将在世界空间中应用模拟速度。

**伪速度（Fake Velocity）**

此处你可以设置将应用于 **基础关节（Base Joint）** 的模拟速度向量。

**基础关节（Base Joint）**

此处你可以从角色的[骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)选择一个骨骼，用作基础骨骼，以接收模拟的速度向量，将运动应用于链。

**调整父骨骼与子骨骼的方向（Reorient Parent to Child）**

启用该属性时，子骨骼可随意旋转并保留结构完整性。

**最后一个骨骼旋转动画Alpha混合（Last Bone Rotation Anim Alpha Blend）**

该属性将控制结构的父关节与动画姿势之间的混合。值为0时，最后一个关节将复制之前关节的alpha。值为1时，将使用动画姿势。

### 调试属性

![trail controller骨骼控制点动画蓝图节点细节面板调试属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6637cf0-6024-4597-8874-60fbd7cf6f46/debug.png)

下面你可以参考Trail Controller节点的一系列调试属性。

属性

说明

**启用调试（Enable Debug）**

在预览视口中启用调试绘制。

**显示基础运动（Show Base Motion）**

沿结构的基本变换路径（**X** 、 **Y** 和 **Z** 轴）绘制红线。该线条上将绘制一个点，用来指示关节在应用运动之前的位置。

**显示尾迹位置（Show Trail Location）**

绘制线条的颜色编码分段，以在链中每个关节之间划分链的不同片段。

**显示限制（Show Limit）**

绘制刨刀限制。

**调试生命周期（Debug Life Time）**

该值将确定调试功能在视口中保持绘制的时长，以秒为单位。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [skeletal control](https://dev.epicgames.com/community/search?query=skeletal%20control)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [属性参考](/documentation/zh-cn/unreal-engine/animation-blueprint-trail-controller-in-unreal-engine#%E5%B1%9E%E6%80%A7%E5%8F%82%E8%80%83)
-   [限制属性](/documentation/zh-cn/unreal-engine/animation-blueprint-trail-controller-in-unreal-engine#%E9%99%90%E5%88%B6%E5%B1%9E%E6%80%A7)
-   [调试属性](/documentation/zh-cn/unreal-engine/animation-blueprint-trail-controller-in-unreal-engine#%E8%B0%83%E8%AF%95%E5%B1%9E%E6%80%A7)
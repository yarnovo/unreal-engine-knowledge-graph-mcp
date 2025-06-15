# 虚幻引擎动画姿势快照 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-pose-snapshot-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:10:07.639Z

---

目录

![动画姿势快照](https://dev.epicgames.com/community/api/documentation/image/81bed8b1-1283-4e43-927d-7b0e385e70db?resizing_type=fill&width=1920&height=335)

设置骨架网格体的动画时，有时需要应用物理并让物理控制网格体（如角色进入布娃娃状态）。 应用物理后，借助 **动画姿势快照（Animation Pose Snapshot）** 功能，你可以在[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine) 中采集骨架网格体动作（保存所有骨骼变换数据）。 然后你可以在[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine) 中获得获取该信息，并使用保存的动作作为混合源（如下方的视频范例所示）。

在上方的视频中，用户按下键时角色便进入布娃娃状态。用户使用 [角色蓝图](/documentation/zh-cn/unreal-engine/blueprint-class-assets-in-unreal-engine) 中的 **Pose Snapshot** 节点保存骨架网格体的动作。 用户按下另一个键时，角色从该快照混入并播放一个"起身"[动画蒙太奇](/documentation/zh-cn/unreal-engine/animation-montage-in-unreal-engine)，然后继续常规运动状态。 这样用户便能将角色的最终动作视为物理结果，并从该动作顺畅地混入角色起身的动画。

## 保存姿势快照

为类在运行时在 **角色蓝图** 中保存骨架网格体的动作，你需要获取骨架网格体组件和其 **动画实例**。 设置妥当后，即可调用 **Save Pose Snapshot** 节点并输入所需的 **快照名称**。 你可以在 **快照名称（Snapshot Name）** 字段中手动输入名称，或创建一个变量保存命名。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be813f09-cafc-4946-bf16-0e9067a91a64/posesnapshotblueprint.png)

你提供的 **快照名称（Snapshot Name）** 必须是你在 **动画蓝图** 中尝试获取姿势快照（Pose Snapshot）时所用的名称。 此外，当你在调用 Save Pose Snapshot 时，快照会在当前LOD级别下截取。例如，如果你在LOD1级别下获取快照，然后再LOD0级别下使用，那么所有未出现在LOD1中的骨骼都将使用网格体的引用姿势。

## 获取姿势快照

获取姿势快照的方法是：在 **动画蓝图** 的 **AnimGraph** 中点击右键并添加 **Pose Snapshot** 节点，然后输入 **快照命名**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0cd22464-1406-4665-ab20-1e00ddeacbfd/posesnapshotanimbpnode.png)

下图是角色从布娃娃动作起身的使用情况范例。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/478744f9-7581-4f1f-807c-1f6d83f59838/posesnapshotanimbp.png)

上图中，我们拥有一个名为 **Default** 的 [状态机](/documentation/zh-cn/unreal-engine/state-machines-in-unreal-engine) 驱动角色运动，并使用 **MySlot** 节点（调用时播放角色起身动画）中的 AnimMontage。 我们使用 [Blend Poses by bool](/documentation/zh-cn/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine#blendposesbybool) 节点决定角色是否已停止移动，如为 **True** 则切换至姿势快照。 如为 **False**，则从姿势快照混入槽中的 AnimMontage，然后通过普通的默认状态机继续。

## Snapshot Pose 函数

使用姿势快照功能的另一种方法是在蓝图中调用 **Snapshot Pose** 函数将快照保存到 **Pose Snapshot** 变量。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c23c1147-f160-49ce-94ab-23f050ccb340/snapshotpose.png)

使用 Snapshot Pose 时，如上所示需要提供一个变量以便保存快照。

在 AnimGraph 中添加 **Pose Snapshot** 节点后，在 **细节** 面板中将 **模式（Mode）** 设为 **Snapshot Pin** 并勾选 **(As pin) Snapshot** 选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2035e752-1678-423f-b25e-a78d080e4f61/posesnapshotdetails.png)

这将在节点上（可将所需的快照变量传入此节点）公开一个 Pose Snapshot 输入引脚。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7359ad7-5f4a-478c-bc92-01166de007b9/snapshotposeanimgraph.png)

## 其他资源

此功能在以下视频教程中也有讲述：

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [animation blending](https://dev.epicgames.com/community/search?query=animation%20blending)
-   [animation blueprint](https://dev.epicgames.com/community/search?query=animation%20blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [保存姿势快照](/documentation/zh-cn/unreal-engine/animation-pose-snapshot-in-unreal-engine#%E4%BF%9D%E5%AD%98%E5%A7%BF%E5%8A%BF%E5%BF%AB%E7%85%A7)
-   [获取姿势快照](/documentation/zh-cn/unreal-engine/animation-pose-snapshot-in-unreal-engine#%E8%8E%B7%E5%8F%96%E5%A7%BF%E5%8A%BF%E5%BF%AB%E7%85%A7)
-   [Snapshot Pose 函数](/documentation/zh-cn/unreal-engine/animation-pose-snapshot-in-unreal-engine#snapshotpose%E5%87%BD%E6%95%B0)
-   [其他资源](/documentation/zh-cn/unreal-engine/animation-pose-snapshot-in-unreal-engine#%E5%85%B6%E4%BB%96%E8%B5%84%E6%BA%90)

相关文档

[

蓝图可视化脚本

![蓝图可视化脚本](https://dev.epicgames.com/community/api/documentation/image/a7cce2f7-f09a-4340-b3f4-2a5d4823bc46?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)
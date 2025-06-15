# 虚幻引擎中的动画蓝图手部IK重定向 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-blueprint-hand-ik-retargeting-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:04:07.191Z

---

目录

![手部IK重定向](https://dev.epicgames.com/community/api/documentation/image/c15681c1-23dd-4a24-89d8-bc0ed41226aa?resizing_type=fill&width=1920&height=335)

在你需要将动画用于不同比例的角色时，你可以使用 **Hand IK Retargeting** [动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)节点，重定向IK骨骼链，修正FK手部位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52932688-1050-4412-8a80-5fe45ae54bfd/handikretargeting.png)

这里是同一个动画在男性和女性角色身上播放的效果。可以看到，女性角色扭转时，为了使手部与武器保持连接，其右臂会有一定的过度拉伸。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dcd868a1-847e-48be-b72b-0821c64dda5e/handikdisabled.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc709267-111b-4d41-8990-5091bab982b8/handikdisabledquinn.gif)

禁用Hand IK Retargeting节点的男性角色

禁用Hand IK Retargeting节点的女性角色

你可以使用Hand IK Retargeting节点的 **手部FK权重（Hand FKWeight）** 属性来转变所设FK骨骼的优先级权重，更正过度拉伸。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dcfc68a8-3f55-4f9c-9f14-034688c78756/handikenabledquinn.gif)

启用Hand IK Retargeting节点的女性角色

在示例中，角色的手臂附加到了武器上，其中同时用到了[两个骨骼IK](/documentation/zh-cn/unreal-engine/animation-blueprint-two-bone-ik-in-unreal-engine)节点。接着，Hand IK Retargeting节点用于更正角色左臂的过度拉伸。为实现此效果，手部FK权重（Hand FKWeight）设置为值0。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3756a00-7cf6-4554-b5aa-bd670112e98a/graph.png)

## 属性参考

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27865fcb-9365-49b4-b8b4-ff7b578cecb8/details.png)

你可以在此处参考Hand IK Retargeting节点的属性列表。

属性

说明

**右手FK（Right Hand FK）**

从角色骨架选择角色右手骨骼，以设置为 **右手FK（Right Hand FK）** 。

**左手FK（Left Hand FK）**

从角色骨架选择角色左手骨骼，以设置为 **左手FK（Left Hand FK）** 。

**右手IK（Right Hand IK）**

从角色骨架选择右手IK骨骼，以设置为 **右手IK（Right Hand IK）** 。

**左手IK（Left Hand IK）**

从角色骨架选择左手IK骨骼，以设置为 **左手IK（Left Hand IK）** 。

**要移动的IK骨骼（IKBones to Move）**

你可以在此处选择要移动的其他骨骼。你可以使用 **添加（Add (+)）** 添加骨骼，并从下拉菜单中角色的骨架选择骨骼。

要移动的其他骨骼可能是武器骨骼，或者用于对象交互的其他骨骼。

**手部FK权重（Hand FKWeight）**

你可以在此处设置权重来偏好右手或左手，更正关节弹出和拉伸。例如，值为0时将偏好左手，值为1时将偏好右手，值为0.5时两手权重相等。默认情况下，此属性显示为 **AnimGraph** 中Hand IK Retargeting节点上的引脚。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [skeletal control](https://dev.epicgames.com/community/search?query=skeletal%20control)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [属性参考](/documentation/zh-cn/unreal-engine/animation-blueprint-hand-ik-retargeting-in-unreal-engine#%E5%B1%9E%E6%80%A7%E5%8F%82%E8%80%83)
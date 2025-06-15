# 如何在虚幻引擎过场动画中引用玩家 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-reference-the-player-in-unreal-engine-cinematics
> 
> 生成时间: 2025-06-14T20:14:08.642Z

---

目录

![在Sequencer中引用玩家](https://dev.epicgames.com/community/api/documentation/image/12f8cc35-cf40-42b9-b135-555555cf5b20?resizing_type=fill&width=1920&height=335)

在Sequencer中创建过场动画内容时，你可能会不清楚要怎样像你在场景中[添加其他对象或Actor](/documentation/zh-cn/unreal-engine/cinematic-actor-tracks-in-unreal-engine)那样添加玩家角色并对其制作动画。本文档介绍了推荐的工作流程，用于将玩家角色作为代理引用，然后在运行时将其绑定到实际玩家。

#### 先决条件

-   你的项目中有可控制的玩家角色。就本文档而言，[第三人称模板](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine)用作示例。
-   你熟悉如何[在Sequencer中制作骨骼网格体的动画](/documentation/zh-cn/unreal-engine/how-to-add-cinematic-animation-to-a-character-in-unreal-engine)。
-   你熟悉[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)的用法。

## 引用代理玩家

虽然PlayerStart Actor是玩家的生成点，但这个Actor在Sequencer中没什么用或不合适，因为它不包含所生成的玩家网格体或对象。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/617551e9-c17e-4790-82a1-b1b49314bd51/proxy1.png)

因此，你应该改为创建要用于制作动画的代理（替代）Actor。一种做法是创建玩家 **角色蓝图（Character Blueprint）** 的[可生成](/documentation/zh-cn/unreal-engine/spawn-temporary-actors-in-unreal-engine-cinematics)引用。为此，在 **内容浏览器（Content Browser）** 中找到角色蓝图资产并将其拖入Sequencer中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2836f6c-f05c-4f99-9918-8e63079fd3af/proxy2.gif)

这会基于序列中的玩家角色蓝图创建可生成的Actor。它是仅限Sequencer的临时角色，不会使用代理引用污染你的关卡，这很有用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b372bf76-4518-49d1-a0aa-3ec4858925c3/proxy3.png)

现在你可以在过场动画序列中的此代理角色上制作动画并创建内容。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3ba3f3e-2f01-4d99-abde-ffdeb9dacca8/proxy4.gif)

## 将代理重新绑定到实际玩家

内容准备就绪后，在序列播放之前，代理角色必须替换为实际玩家。

### 创建玩家标签

为了更轻松地查找要替换的代理角色，请将[标签](/documentation/zh-cn/unreal-engine/cinematic-tags-and-groups-in-unreal-engine)分配到角色轨道。为此，请右键点击轨道，选择 **标签（Tags）** ，然后在 **添加标签（Add Tag）** 菜单中输入标签名称，并按 **Enter** 键。这会在角色轨道上创建标签。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1aab66a0-6037-4f4a-b1f0-ba56177b536a/rebind1.png)

### 蓝图设置

接下来，在 **关卡工具栏（Level Toolbar）** 中点击 **关卡蓝图（Level Blueprint）** 并选择 **打开关卡蓝图（Open Level Blueprint）** 以打开关卡蓝图。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bee2d09b-4605-4078-abe1-1d722338b884/rebind2.png)

在关卡中选择 **关卡序列Actor（Level Sequence Actor）** ，然后右键点击 **事件图表（Event Graph）** 并选择 **创建关卡序列的引用（Create a Reference to Level Sequence）** ，从而在蓝图中引用你的序列。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/067a2542-3127-4dee-bfbd-ac8e4558a059/rebind3.png)

创建以下逻辑：

1.  创建 **Get Player Pawn** 节点，它会在运行时期间获取当前实际玩家。这是替换你的代理角色的Actor。
2.  拖移关卡序列引用并创建 **Set Binding by Tag** 节点，这用于按标签名称更改轨道上的对象或Actor的绑定。在此节点上，执行以下操作：
    
    -   将你的 **关卡序列（Level Sequence）** 引用连接到 **目标（Target）** 。
    -   将 **绑定标签（Binding Tag）** 设置为你之前在代理角色轨道上创建的标签名称。
    -   将 **Get Player Pawn** 连接到 **Actors** 。
    -   确保 **允许从资产绑定（Allow Bindings from Asset）** 已 **禁用** 。如果 **启用** ，代理Actor会保留，不会被覆盖，导致玩家Pawn和代理Actor都绑定到该轨道。
    
3.  绑定后， **播放（Play）** 序列。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c551cdd-61d3-4f4b-840c-1dd14d987bcc/rebind4.png)

## 结果

执行此逻辑时，你应该会看到玩家在过场动画序列中正确地运行动画。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/961aa4b7-ecfb-421b-a4b0-162ad5bb7f00/results.gif)

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [proxy player](https://dev.epicgames.com/community/search?query=proxy%20player)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/how-to-reference-the-player-in-unreal-engine-cinematics#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [引用代理玩家](/documentation/zh-cn/unreal-engine/how-to-reference-the-player-in-unreal-engine-cinematics#%E5%BC%95%E7%94%A8%E4%BB%A3%E7%90%86%E7%8E%A9%E5%AE%B6)
-   [将代理重新绑定到实际玩家](/documentation/zh-cn/unreal-engine/how-to-reference-the-player-in-unreal-engine-cinematics#%E5%B0%86%E4%BB%A3%E7%90%86%E9%87%8D%E6%96%B0%E7%BB%91%E5%AE%9A%E5%88%B0%E5%AE%9E%E9%99%85%E7%8E%A9%E5%AE%B6)
-   [创建玩家标签](/documentation/zh-cn/unreal-engine/how-to-reference-the-player-in-unreal-engine-cinematics#%E5%88%9B%E5%BB%BA%E7%8E%A9%E5%AE%B6%E6%A0%87%E7%AD%BE)
-   [蓝图设置](/documentation/zh-cn/unreal-engine/how-to-reference-the-player-in-unreal-engine-cinematics#%E8%93%9D%E5%9B%BE%E8%AE%BE%E7%BD%AE)
-   [结果](/documentation/zh-cn/unreal-engine/how-to-reference-the-player-in-unreal-engine-cinematics#%E7%BB%93%E6%9E%9C)
# 在虚幻引擎中设置 SteamVR Chaperone | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/set-up-the-steamvr-chaperone-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:45:29.462Z

---

目录

![设置 SteamVR Chaperone](https://dev.epicgames.com/community/api/documentation/image/19acbb6f-d474-4f9a-b7bb-15fe87d13e47?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [运动控制器组件设置](/documentation/zh-cn/unreal-engine/motion-controller-component-setup-in-unreal-engine)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/991f31f3-afc9-4702-8a84-480aa0d0d290/svrchaperone_hero_image.png)

SteamVR Chaperone 组件用于向用户显示 VR 互动区域的软硬边界。以下指南将说明如何把 SteamVR Chaperone 添加到 UE4 VR Pawn。

在 UE4 中禁用 Chaperone 系统 **不** 明智，也不可取。然而，您可以调整用户靠近边界时 UE4 作出的响应。

## SteamVR Chaperone 设置

执行以下操作即可将 SteamVR Chaperone 系统添加到 UE4 玩家 pawn：

1.  打开项目玩家 Pawn 蓝图，确保 **Components** 标签已显示。
    
2.  点击 **Add Component** 按钮，从显示的列表中搜索 **Steam VRChaperone** 组件，找到后点击将其添加到组件列表。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7156180f-15fc-487e-80c4-f64725c8c07c/svrchaperone_00.png)
3.  完成后，玩家 pawn 应与下图相似。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1bffdc10-d2fa-4b51-90ed-d01804324765/svrchaperone_01.png)

## 最终效果

现在即可在 VR 中运行项目并戴上 Vive 头戴显示器，靠近 VR 交互区的边界时，便会出现以下视频中的内容。

## UE4 项目下载

可使用以下链接下载用于创建此例的 UE4 项目。

-   [**SteamVR Chaperone 设置项目**](https://epicgames.box.com/s/f9aw7n5wpjc0nnzjtiom78hticmdl3w1)

-   [basics](https://dev.epicgames.com/community/search?query=basics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [SteamVR Chaperone 设置](/documentation/zh-cn/unreal-engine/set-up-the-steamvr-chaperone-in-unreal-engine#steamvrchaperone%E8%AE%BE%E7%BD%AE)
-   [最终效果](/documentation/zh-cn/unreal-engine/set-up-the-steamvr-chaperone-in-unreal-engine#%E6%9C%80%E7%BB%88%E6%95%88%E6%9E%9C)
-   [UE4 项目下载](/documentation/zh-cn/unreal-engine/set-up-the-steamvr-chaperone-in-unreal-engine#ue4%E9%A1%B9%E7%9B%AE%E4%B8%8B%E8%BD%BD)
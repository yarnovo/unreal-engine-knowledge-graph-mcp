# 在虚幻引擎中设置 Oculus Rift Guardian 系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/set-up-the-oculus-rift-guardian-system-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:45:53.934Z

---

目录

![设置 Oculus Rift Guardian 系统](https://dev.epicgames.com/community/api/documentation/image/29a79076-30d9-43a6-974c-d66bd8edb518?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [运动控制器组件设置](/documentation/zh-cn/unreal-engine/motion-controller-component-setup-in-unreal-engine)

Skill\_family: Tutorial Level 1 Version: 5.0 Parent: sharing-and-releasing-projects/xr-development/supported-xr-platforms/developing-for-oculus/OculusHowTo Order: 4 tags: Basics topic-image:HTGuardian\_System\_Topic\_Image.png prereq:sharing-and-releasing-projects/xr-development/supported-xr-platforms/developing-for-steamvr/HowTo/StandingCamera prereq:sharing-and-releasing-projects/xr-development/making-interactive-xr-experiences/set-up-motion-controllers

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ac9e31c-45c6-4b39-8aa8-6d75b1257d8d/htguardian_system_hero_image.png)

Oculus Guardian 系统用于显示 VR 交互区域的边界。追踪设备靠近边界时，Oculus Runtime 将自动进行可视提示，告知用户。以下教程将说明如何把 Oculus Guardian 系统添加到 UE4 项目的玩家 Pawn。

需要设置 Guardian 系统使用 Oculus 应用程序才能使其正常使用。如需了解详细操作方法，请查看官方 [Oculus Guardian 系统](https://developer.oculus.com/documentation/pcsdk/latest/concepts/dg-guardian-system/) 设置页面。

在 UE 中禁用 Guardian 系统 **不** 明智，也不可取。然而，您可以调整用户靠近边界时 UE 作出的响应。

## 步骤

执行以下操作即可将 Oculus Rift Guardian 系统添加到 UE 玩家 pawn：

1.  打开项目玩家 Pawn 蓝图，确保 **Components** 标签已显示。
    
2.  点击 **Add Component** 按钮，然后从显示的列表中搜索 **OculusRiftBoundy** 组件。找到组件后，点击将其添加至组件列表。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aef7774c-aa55-4c0d-9415-5c53b5839a83/htguardian_system_00.png)
3.  完成后，玩家 pawn 应与下图相似。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c3fc17e-2236-4ef6-8ca4-89495141b989/htguardian_system_01.png)

## 最终结果

现在即可在 VR 中运行项目并戴上 Rift 头戴显示器，靠近 VR 交互区的边界时，便会出现以下视频中的内容。

## UE 项目下载

可使用以下链接下载用于创建此例的 UE 项目。

-   [**Oculus Rift Guardian 系统设置项目**](https://epicgames.box.com/s/s4vvkb2i0ohtice8vtqude6i8ih7hy8i)

-   [basics](https://dev.epicgames.com/community/search?query=basics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/set-up-the-oculus-rift-guardian-system-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/set-up-the-oculus-rift-guardian-system-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [UE 项目下载](/documentation/zh-cn/unreal-engine/set-up-the-oculus-rift-guardian-system-in-unreal-engine#ue%E9%A1%B9%E7%9B%AE%E4%B8%8B%E8%BD%BD)
# 在虚幻引擎中修改 Oculus Rift Guardian 系统的颜色 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/change-the-oculus-rift-guardian-system-color-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:45:52.695Z

---

目录

![修改 Oculus Rift Guardian 系统的颜色](https://dev.epicgames.com/community/api/documentation/image/34ffc5bb-1f56-4108-a0d0-4242551b5299?resizing_type=fill&width=1920&height=335)

Skill\_family: Tutorial Level 2 Version: 5.0 Parent: sharing-and-releasing-projects/xr-development/supported-xr-platforms/developing-for-oculus/OculusHowTo Order: 2 tags: Oculus topic-image:sharing-and-releasing-projects/xr-development/supported-xr-platforms/developing-for-oculus/OculusHowTo/GuardianSystem\\HTGuardian\_System\_Topic\_Image.png prereq:sharing-and-releasing-projects/xr-development/supported-xr-platforms/developing-for-steamvr/HowTo/StandingCamera prereq:sharing-and-releasing-projects/xr-development\\MotionController prereq:sharing-and-releasing-projects/xr-development/supported-xr-platforms/developing-for-oculus/OculusHowTo/GuardianSystem

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/487821bc-409e-4c02-9c0b-5b6dfd3a1d72/htguardian_system_07.png)

Oculus Guardian 系统用于显示 VR 交互区域的边界。追踪设备靠近边界时，Oculus Runtime 将自动进行可视提示，告知用户。以下教程将说明如何修改用于显示 VR 互动区的 Oculus Guardian 系统的颜色。

需要设置 Guardian 系统使用 Oculus 应用程序才能使其正常使用。如需了解详细操作方法，请查看官方 [Oculus Guardian 系统](https://developer.oculus.com/documentation/pcsdk/latest/concepts/dg-guardian-system/) 设置页面。

在 UE 中禁用 Guardian 系统 **不** 明智，也不可取。然而，您可以调整用户靠近边界时 UE 作出的响应。

## 步骤

必须为 Pawn 添加 **OculusRiftBoundary**，否则以下操作将无法实现。如果您不熟悉这些操作，请参考 [设置 Guardian 系统](/documentation/zh-cn/unreal-engine/set-up-the-oculus-rift-guardian-system-in-unreal-engine) 页面。

1.  创建一个名为 **Oculus Rift Boundary Color** 的新 **变量**，并将其类型设为 **Linear Color**、颜色设为 **Red**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4ea5b1e-c232-45a4-93f1-3d0aac8c86ab/htguardian_system_04.png)
2.  在 **事件图表** 中添加一个 **Event Begin Play** 和 **Set Tracking Origin** 节点。将 Set Tracking Origin 节点的 **Origin** 设为 **Floor Level**，然后将 Event Begin Play 连接到 Set Tracking Origin 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0af36902-e72d-48dd-873b-74b736c3e57e/htguardian_system_02.png)
3.  右键点击事件图表，从菜单中搜寻 **Set Outer Boundary Color**，点击将其添加到图表。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2fa69f8b-0954-4699-8897-515d84c03b53/htguardian_system_03.png)
4.  将 **Oculus Rift Boundary Color** 变量和 **Oculus Rift Boundary** 组件拖入事件图表。将 Oculus Rift Boundary Color 变量连接到 Set Boundary Color 节点上的 **In Boundary Color**，然后将 Oculus Rift Boundary 连接到 **Target** 输入。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e20ccee-b005-422a-8ecf-f4e66957be97/htguardian_system_05.png)
5.  将 Set Tracking Origin 节点的输出连接到 Set Outer Boundary Color 节点的输入，操作完成后事件图表应与下图类似。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79870344-46cd-45a6-8f9d-4ff06b65a2b1/htguardian_system_06.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79870344-46cd-45a6-8f9d-4ff06b65a2b1/htguardian_system_06.png)
    
    点击查看全图。
    

## 最终结果

现在即可戴上头戴显示器，运行关卡。边界显示的颜色便是您在Oculus Rift Boundary Color变量设置的颜色。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4876be2f-625e-4b8e-b38c-4992d47f4740/htguardian_system_07.png)

## UE项目下载

可使用以下链接下载用于创建此例的UE项目。

-   [**Oculus Rift Guardian 系统范例项目**](https://epicgames.box.com/s/s4vvkb2i0ohtice8vtqude6i8ih7hy8i)

-   [oculus](https://dev.epicgames.com/community/search?query=oculus)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/change-the-oculus-rift-guardian-system-color-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/change-the-oculus-rift-guardian-system-color-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [UE项目下载](/documentation/zh-cn/unreal-engine/change-the-oculus-rift-guardian-system-color-in-unreal-engine#ue%E9%A1%B9%E7%9B%AE%E4%B8%8B%E8%BD%BD)
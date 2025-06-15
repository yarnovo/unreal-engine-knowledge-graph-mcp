# 旧版虚拟堪景介绍 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-scouting-legacy-overview
> 
> 生成时间: 2025-06-14T19:20:52.671Z

---

目录

![旧版虚拟堪景介绍](https://dev.epicgames.com/community/api/documentation/image/ce2992ac-2769-4bda-b199-dc26fd46b5cf?resizing_type=fill&width=1920&height=335)

本文中提到的旧版虚拟堪景工具将在未来的引擎版本中废弃。我们建议改用[新版虚拟堪景工具](/documentation/zh-cn/unreal-engine/virtual-scouting-in-unreal-engine)。 未使用的VREditor代码和模块将在未来的引擎版本中彻底废弃。

**虚拟堪景（Virtual Scouting）** 工具可以让电影制作人使用新方法在虚拟制作环境中导航和交互，帮助他们做出更有创意的决策。导演和摄影师可以轻松地找到位置、合成镜头、设置场景调度以及准确地展示电影拍摄位置。美工和场景设计师在构建位置时可以在 **虚拟现实(VR)（virtual reality (VR)）** 中体验位置，使用测量和交互工具来检查距离和修改世界。可以从虚拟世界中捕获图像，然后整个制作团队可以使用这些图像来跟踪VR会话期间作出的决策。

下面的项目亮点视频展示了在电影制作中使用实时虚拟制作工具的一些优势，以及虚拟堪景的一些功能。

**虚拟制片工具（Virtual Production Utilities）** 插件随附了一套专门为电影制作人量身定制的功能按钮。本文档介绍了这些工具以及使用方法。你也可以使用 **蓝图（Blueprints）** 动态定制虚拟堪景功能按钮来满足特定的需求，不必修改底层 C++ 代码和重新构建引擎。

虚拟堪景与HTC Vive、HTC Vive Pro、Oculus Rift和Oculus Rift S VR HMDs兼容。

## 菜单

虚拟堪景有一个菜单专门为支持虚拟制作场景而设计。在菜单中依次点击 **导航（Navigation）**、**Viewfinder**、其他实用工具，即可轻松访问此功能。

你可以使用动作控制器上的 **菜单（Menu）** 按钮 **打开** 或 **关闭** 虚拟堪景菜单。菜单按钮位于HTC Vive动作控制器的触控板上方，映射到右侧Oculus Touch控制器上的A按钮和左侧Oculus Touch控制器上的X按钮。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc0ea5cf-e9f5-42ee-8b2f-e1d4c60cc3c7/image_2.png)

### 虚拟堪景设置

在VR中，你可以通过在面板中访问虚拟堪景工具来修改其中的一些设置。 在虚拟堪景菜单面板中，导航至右上角，选择设置（Settings）按钮。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b78acc5e-3f6c-4e41-b937-17b9413da1b9/image_6.png)

设置（Settings）面板将在菜单前面打开。下表介绍了你可以在虚拟堪景工具上更改的设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63db233a-3776-4c62-bb6c-188abedc1d56/image_7.png)

**设置选项（Settings Option）**

**说明（Description）**

**抓握惯性（Grip Inertia）**

启用此选项后，你在使用抓握（Grip）按钮导航时可以滑动着停止。行经的距离基于你随着抓握导航移动的速度。

**变形小工具（Transform Gizmo）**

启用此选项后，在 VR 中选择对象之后，将显示三维移动、旋转和缩放小工具。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d9e78ab-24ba-4d5a-b923-88e293e37080/image_8.png)

**帮助系统（Help System）**

启用此选项后，你可以在HMD前面举起动作控制器，以查看控制器按钮的工具提示。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f99c6d1a-5e55-433e-89e1-aa8e1c588519/image_9.png)

**单位比例（Unit Scale）**

用于在 **公制（Metric）** 和 **英制（Imperial）** 单位之间进行切换的开关按钮。

**实时编辑（Live Editing）**

启用此选项后，在与不同Sequencer帧上的对象交互时将会创建关键帧。这些关键帧可以在可视的覆层中编辑。如需更多详细信息，请参见 [使用Sequencer进行实时编辑](/documentation/zh-cn/unreal-engine/vr-editing-legacy-tools#%E4%BD%BF%E7%94%A8sequencer%E8%BF%9B%E8%A1%8C%E5%AE%9E%E6%97%B6%E7%BC%96%E8%BE%91)部分。

**退出VR模式（Exit VR Mode）**

选择此选项将为你打开UE4标准编辑器窗口。这与 **Alt+V** 键盘快捷方式作用相同。

**飞行导航速度（Flight Nav Speed）**

一个滑块，用于指定在使用导航工具时移动的速度。

**抓握导航速度（Grip Nav Speed）**

一个滑块，用于指定在使用抓握按钮进行导航时移动的速度。

## 导航

在虚拟堪景模式下，你可以使用导航工具在场景中飞翔。在VR模式下切换到虚拟堪景时，导航是默认工具。有两种方式可以切换到导航工具：

-   在虚拟堪景菜单中选择导航（Navigation）选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55bef0b7-e0fc-4659-a77e-ec0416d2efc3/image_16.png)
-   按住动作控制器上的菜单按钮两秒钟。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7772c090-6a85-405c-9351-b3779022199b/01.png)
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcc23761-a72b-4993-8e08-dfbe021a3562/oculus_nav.png)
    
    Vive
    
    Oculus Touch
    

要使用Vive动作控制器在场景中移动，请将动作控制器朝向你要飞翔的方向，然后按动作控制器上的触发器。要使用Oculus Touch控制器飞翔，朝你要移动的方向移动摇杆即可。你在Vive动作控制器上按触发器越用力或在Oculus Touch控制器上按摇杆越用力，飞翔速度越快。你可以在虚拟堪景设置中调整最快速度。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/efa1d398-a60d-4e5a-ab22-aca595b67d4c/image_6_cropped.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/142b54eb-ec0b-4963-bcc3-aa7b5a82851e/vrscout2.png)

*更改导航飞行最快速度*

 

### 抓握功能按钮

上述在场景中导航的方法需要选择导航工具。即使在使用其他VR工具时，也可以通过按住动作控制器上的抓握按钮在场景中导航。将一个抓握按钮按下，手朝你自己移动，就像你在拉着自己前行，然后松开按钮。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/047dc958-c8e8-4622-b40c-8ce23865cd86/vivegripnav.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f33ccf6-403a-470b-a184-c99a74f5cad6/oculusgripnav.png)

Vive

Oculus Touch

**关闭世界运动选项（Turn off World Movement Options）**

在虚拟堪景模式中，默认情况下使用动作控制器上的抓握按钮打开彩色抓握，即世界运动抓握。此抓握会自动使你周围的关卡变暗。你可以通过禁用抓握和后期处理设置来关闭此功能。

1.  导航至 **Edit（编辑） > Editor（编辑器）** 首选项。
2.  选择 **VR模式（VR Mode）**。
3.  在VR模式设置页面上，修改 **世界运动（World Movement）** 设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9191123-9bd0-4705-ab39-7fa57788c5b5/image_10.png)

传送 除了能够在场景中飞翔着导航，还可以进行传送，直接跳跃到场景中的另一个位置。

1.  要使用传送功能，需要将拇指放在Vive动作控制器触控板的底部，或者按住Oculus Touch控制器上的B或Y按钮。
2.  一旦有绿色定位器显示在场景中为你指示传送目的地，就可以操控动作控制器来移动定位器在场景中的位置。
3.  按下Vive触控板的顶部或松开Touch的B或Y按钮，出现在场景中的这个定位器就可以将你传送到定位器的位置。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4aae122e-53a6-4c7f-9498-6a12b014f84f/02.png)
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a87b37a-2cd3-4af4-9480-f8773e68f523/oculusport.png)
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dccc829a-1337-4041-842b-b29069963e7c/image_17_cropped.png)
    
    Vive
    
    Oculus Touch
    
     
    

## 书签

你可以利用书签工具在场景中放置一个位置标记，随后随时可以返回该位置，其他人也可以传送到该位置。要切换到书签工具，请在虚拟堪景菜单中选择书签（Bookmark）选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8bf80b5d-937d-4974-8621-427eb9ce2986/image_38.png)

配备书签工具之后，按动作控制器上的触发器即可在场景中放置位置标记。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a71d9ad-cf05-4bff-b0ed-f305a727f93f/image_39.png)

要查看场景中已存在的位置标记，打开虚拟堪景菜单，在右侧面板中选择书签（Bookmarks）选项卡。在列表中选择标记即可将你传送到场景中的该位置标记。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b57ff8c1-b7d8-43d0-a08f-a7d5b6dd2159/image_40.png)

## 世界场景比例

你可以在关卡中更改世界场景比例，让你自己变得更大或更小。你的世界场景比例范围为0.1到60。在缩放你自己的时候，虚拟控制器的背面将会显示你的缩放幅度读数。

下面的步骤介绍如何按住抓握按钮来改变你在场景中的虚拟比例。

-   将你自己放大：
    
    1.  开始时，双手要在身前分开。
    2.  按住两个控制器上的抓握按钮。
    3.  在身前将两只手放在一起，然后松开抓握按钮。
    
-   将你自己缩小：
    
    1.  开始时，双手在身前紧靠在一起。
    2.  按住两个控制器上的抓握按钮。
    3.  水平移动两只手，使双手分开，然后松开抓握按钮。
    

你可以点击抓握按钮两次，将世界场景比例重置为1.0。传送到场景中的任意位置都会将你的比例重置为1.0。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e04422a8-8a9c-4617-92f9-0bf0f8d070e2/vive_resetscale.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40e4520a-0cdf-4e71-81de-66a8d247a832/rightrifts_resetscale.png)

Vive

Oculus Touch

-   [virtual scouting](https://dev.epicgames.com/community/search?query=virtual%20scouting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [菜单](/documentation/zh-cn/unreal-engine/virtual-scouting-legacy-overview#%E8%8F%9C%E5%8D%95)
-   [虚拟堪景设置](/documentation/zh-cn/unreal-engine/virtual-scouting-legacy-overview#%E8%99%9A%E6%8B%9F%E5%A0%AA%E6%99%AF%E8%AE%BE%E7%BD%AE)
-   [导航](/documentation/zh-cn/unreal-engine/virtual-scouting-legacy-overview#%E5%AF%BC%E8%88%AA)
-   [抓握功能按钮](/documentation/zh-cn/unreal-engine/virtual-scouting-legacy-overview#%E6%8A%93%E6%8F%A1%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [书签](/documentation/zh-cn/unreal-engine/virtual-scouting-legacy-overview#%E4%B9%A6%E7%AD%BE)
-   [世界场景比例](/documentation/zh-cn/unreal-engine/virtual-scouting-legacy-overview#%E4%B8%96%E7%95%8C%E5%9C%BA%E6%99%AF%E6%AF%94%E4%BE%8B)
# 虚幻引擎VR模板 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/vr-template-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:43:35.772Z

---

目录

![VR模板](https://dev.epicgames.com/community/api/documentation/image/be944e0f-12e1-40d5-8561-570c2929f0b2?resizing_type=fill&width=1920&height=335)

**VR模板** 旨在作为 **虚幻引擎** 中所有虚拟现实（VR）项目的起点。该模板封装了传送逻辑、VR观察视角蓝图，以及常见的输入操作逻辑，例如抓取物品和将物品附着到手上。

![用户使用运动控制器在VR中堆叠立方体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a89c38a8-c67a-4eb1-b216-02e942e333c5/image_2.gif)

本页面将介绍VR模板的入门知识以及如何使用该模板来打造自己的VR体验。

## 支持的设备

VR模板与以下设备兼容：

-   Oculus Mobile
    
    -   Quest 1
        
    -   Quest 2
        
-   Oculus PC
    
    -   Rift S
        
    -   Quest with Oculus Link
        
-   Steam VR
    
    -   Valve Index
        
    -   HTC Vive
        
-   Windows Mixed Reality
    

你需要先设置你的设备，使其能够在虚幻引擎中进行开发，然后才能使用VR模板。请参阅[XR开发](/documentation/zh-cn/unreal-engine/developing-for-xr-experiences-in-unreal-engine)中的文档，了解如何正确设置你的设备。

## OpenXR

VR模板将使用[OpenXR](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)框架，这是多家公司的VR和AR开发标准。借助虚幻引擎中的OpenXR插件，模板的逻辑可在多个平台和设备上运行，无需平台专有的检查或调用。

虚幻引擎中的OpenXR插件支持扩展插件。你可以在虚幻商城找到扩展插件或创建自己的扩展插件，以便将默认情况下当前不在引擎中的功能添加到OpenXR。

## Pawn、游戏模式和玩家出生点

以下对象将决定VR模板的体验的规则及其设置方式。

UE对象

VR模板中的对象名称

位置

说明

[Pawn](/documentation/zh-cn/unreal-engine/player-controllers-in-unreal-engine)

VRPawn

内容（Content） > VRTemplate > 蓝图（Blueprints）

在虚幻引擎中，Pawn是用户的物理呈现，将定义用户如何与虚拟世界交互。在VR模板中，Pawn包含来自运动控制器的输入事件的逻辑。

[游戏模式](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine)

VRGameMode

内容（Content） > VRTemplate > 蓝图（Blueprints）

游戏模式对象将定义体验规则，例如使用哪个Pawn对象。游戏模式在 **地图和模式（Maps & Modes）** 分段的 **项目设置（Project Settings）** 中设置。

[玩家出生点](/documentation/zh-cn/unreal-engine/player-start-actor-in-unreal-engine)

玩家出生点（Player Start）

世界大纲视图（World Outliner）

玩家出生点Actor将定义Pawn在虚拟世界中的生成位置。对于VR体验，玩家出生点的原点是虚拟世界中的跟踪原点。由于VR模板专为VR中的站立体验而设计，因此玩家出生点位于底层关卡。

## 输入

VR模板中的输入基于虚幻引擎中的[操作和轴映射输入系统](/documentation/zh-cn/unreal-engine/input-in-unreal-engine)。请参阅[使用OpenXR输入](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine)，详细了解如何使用OpenXR设置输入。

![输入操作和轴映射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b12d07f1-b2ed-4aa0-b9e8-f0dcf6afc007/image_3.png)

## 运动

VR体验中的运动称为 *移位*。在VR模板中，有两种类型的移位：**传送（Teleport）** 和 **快速转动（Snap Turn）**。在蓝图编辑器中，打开 **VRPawn** 可查看两者的实现方式。

### 传送

传送到关卡中的不同位置：

1.  将右侧运动控制器的拇指杆或触控板朝你想要移动的方向移动。传送可视化工具会在关卡中显示你将移动到的位置。
    
2.  松开拇指杆或触控板，传送到选中的位置。
    

![用户用他们的运动控制器移动传送指示器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09c53472-42dc-4605-8a9d-abc98a055993/image_4.gif)

### 快速转动

要在不移动你的头部的情况下旋转你的虚拟角色，请沿你想要转动的方向移动左侧运动控制器拇指杆或触控板。

![用户执行快速转动以便在不移动的情况下旋转视角](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c1ee9eb-8369-4250-bd09-1a2218396d47/image_5.gif)

### 设置允许的移动区域

关卡使用[导航网格体](/documentation/zh-cn/unreal-engine/content-examples-sample-project-for-unreal-engine)标记允许用户移动的位置。参见 **NavModifierVolume** 资产 **NavModifier\_NoTeleport**，这是如何实现此操作的示例。资产的 **区域类（Area Class）** 参数设置为 **NavArea\_Null**，这会阻止用户移动到该体积。

![传送指示器在非传送区时消失](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf6a2c2d-f958-4031-9673-e117498450ea/image_6.gif)

传送查看器在 NavModifier\_NoTeleport 体积时消失。

按下键盘上的P键可切换可导航区域的可视化。

![关卡中可导航区域的可视化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4de5c8b-9d7b-4932-949d-d4f2cec612ac/image_7.png)

## 抓取

VR模板展示了几种不同的方式拾取对象并将对象附着你的手上。

要抓取关卡中的对象：

-   伸向可抓取的对象，然后按住运动控制器上的 **握紧（Grip）** 按钮。
    
-   这会在你的运动控制器的GripLocation位置周围创建[球体追踪](/documentation/zh-cn/unreal-engine/traces-in-unreal-engine---overview)。如果球体中有带有 **GrabComponent** 的 Actor，它就会附着在按下 **握紧（Grip）** 按钮的手上。
    
-   释放同一运动控制器上的 **握紧（Grip）** 按钮，将对象从你的手上分离。
    

如需为Actor启用抓取功能，请将GrabComponent蓝图添加到Actor中，并在细节面板中选择"抓取（Grab）"类型。在BeginPlay上，组件父节点的碰撞配置设置为PhysicsActor，这是用于VRPawn中的球体追踪的追踪通道。

你可以打开GrabComponent蓝图类，查看VR模板中抓取功能的实现方式。

### 抓取类型

你可以在对象的 **GrabComponent** 中设置抓取类型，以便定义对象如何附着在你的手上。

**GrabType Enum** 资产中定义了以下抓取类型：

-   **自由（Free）**：Actor保持在相对于运动控制器抓取它所在处的位置和方向。以小立方体为例。
    
    ![用户使用运动控制器抓取和旋转立方体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7404ef20-b031-4756-a9f8-86c94af21e6e/image_8.gif)
-   **对齐（Snap）**：Actor具有相对于运动控制器的特定位置和方向。以手枪为例。
    
    ![用户拿起与运动控制器对齐的手枪](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0d2e6ca-1d74-434d-8024-b94df24907e0/image_9.gif)
-   **自定义（Custom）：** 借助此选项，你可以使用 **OnGrabbed** 和 **OnDropped** 事件为抓取操作添加自己的逻辑。你还可以利用其他公开的变量，例如 **bIsHeld** 布尔变量，这是一个标记，用于指定对象当前是否由用户持有。你可以创建其他类型的自定义抓取动作，包括双手抓取、转盘、控制杆和其他复杂行为，例如握住时不与几何体重叠的Actor。
    

你可以在对象的GrabComponent中设置OnGrabHaptic效果变量，定义抓取对象时的触觉效果。触觉效果的示例包括运动控制器振动。

GrabComponent中使用的重要函数抽象为使用蓝图接口资产VRInteraction BPI的通用接口。借助此蓝图接口资产，VRPawn可以简化逻辑，避免对每种类型的对象进行多次检查。有关蓝图接口及其优势的更多信息，请参阅[蓝图接口](/documentation/zh-cn/unreal-engine/blueprint-interface-in-unreal-engine)。

## 菜单

按运动控制器上的菜单按钮可打开VR模板的菜单。该菜单使用虚幻示意图形（UMG）构建。请参阅[UMG UI设计器](/documentation/zh-cn/unreal-engine/umg-editor-reference-for-unreal-engine)，详细了解如何此工具的用法。

![用户通过两个选项与VR菜单交互：重启和现实世界](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a787401-34fc-43b4-9ecb-48eaab34c523/image_10.gif)

在 **内容浏览器（Content Browser）** 中，**内容（Content）> VR模板（VRTemplate）> 蓝图（Blueprints）> 控件菜单（WidgetMenu）** 是用于设计和创建菜单逻辑的UMG资产，**菜单** 蓝图定义了控制器如何与控件交互。

## VR旁观者

通过[旁观者屏幕模式](/documentation/zh-cn/unreal-engine/virtual-reality-spectator-screen-in-unreal-engine)，别人可以在有人使用头戴式显示器（HMD）的情况下观看VR体验。VR模板使用了 **VR旁观者** 蓝图实现旁观者屏幕模式示例。

有两种方法可以在VR模板中启用旁观者模式：

-   在会话期间按 **选项卡（Tab）** 可切换旁观者模式。
    
-   将 **VRSpectator bSpectatorEnabled** 设置为 **true**。
    

VR观众（VR Spectator）与移动VR设备（例如Oculus Quest）不兼容。

你可以通过鼠标和键盘或游戏手柄使用以下输入控制VR观众，从而在虚拟世界中使用HMD查看用户：

操作

鼠标&键盘输入

手柄输入

**切换VR旁观者（Toggle VRSpectator）**

Tab键

底部面按钮

**向前移动（Move Forward）**

W

左摇杆上

**向后移动（Move Backward）**

S

左摇杆下

**向左移动（Move Left）**

A

左摇杆左

**向右移动（Move Right）**

D

左摇杆右

**向上移动（Move Up）**

E或空格键

右侧肩按钮

**向下移动（Move Down）**

Q

左侧肩按钮

**俯仰（Pitch）**

向前或向后移动鼠标

右摇杆Y轴

**偏转（Yaw）**

向左或向右移动鼠标

右摇杆X轴

**更改视野（FOV）**

移动鼠标滚轮

右侧扳机键 / 左侧扳机键

**重置视野（Reset FOV）**

点击鼠标中键

N/A

**切换淡入淡出（Toggle Fade In and Out）**

F

顶部面按钮

**重置旋转（Reset Rotation）**

R

N/A

可以使用VR旁观者作为在同一台PC上实现多人游戏体验的起始点。

-   [template](https://dev.epicgames.com/community/search?query=template)
-   [xr](https://dev.epicgames.com/community/search?query=xr)
-   [vr](https://dev.epicgames.com/community/search?query=vr)
-   [openxr](https://dev.epicgames.com/community/search?query=openxr)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [支持的设备](/documentation/zh-cn/unreal-engine/vr-template-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84%E8%AE%BE%E5%A4%87)
-   [OpenXR](/documentation/zh-cn/unreal-engine/vr-template-in-unreal-engine#openxr)
-   [Pawn、游戏模式和玩家出生点](/documentation/zh-cn/unreal-engine/vr-template-in-unreal-engine#pawn%E3%80%81%E6%B8%B8%E6%88%8F%E6%A8%A1%E5%BC%8F%E5%92%8C%E7%8E%A9%E5%AE%B6%E5%87%BA%E7%94%9F%E7%82%B9)
-   [输入](/documentation/zh-cn/unreal-engine/vr-template-in-unreal-engine#%E8%BE%93%E5%85%A5)
-   [运动](/documentation/zh-cn/unreal-engine/vr-template-in-unreal-engine#%E8%BF%90%E5%8A%A8)
-   [传送](/documentation/zh-cn/unreal-engine/vr-template-in-unreal-engine#%E4%BC%A0%E9%80%81)
-   [快速转动](/documentation/zh-cn/unreal-engine/vr-template-in-unreal-engine#%E5%BF%AB%E9%80%9F%E8%BD%AC%E5%8A%A8)
-   [设置允许的移动区域](/documentation/zh-cn/unreal-engine/vr-template-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%85%81%E8%AE%B8%E7%9A%84%E7%A7%BB%E5%8A%A8%E5%8C%BA%E5%9F%9F)
-   [抓取](/documentation/zh-cn/unreal-engine/vr-template-in-unreal-engine#%E6%8A%93%E5%8F%96)
-   [抓取类型](/documentation/zh-cn/unreal-engine/vr-template-in-unreal-engine#%E6%8A%93%E5%8F%96%E7%B1%BB%E5%9E%8B)
-   [菜单](/documentation/zh-cn/unreal-engine/vr-template-in-unreal-engine#%E8%8F%9C%E5%8D%95)
-   [VR旁观者](/documentation/zh-cn/unreal-engine/vr-template-in-unreal-engine#vr%E6%97%81%E8%A7%82%E8%80%85)

相关文档

[

XR开发

![XR开发](https://dev.epicgames.com/community/api/documentation/image/8c090dc1-7d23-4944-b940-e739e2d37a23?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/developing-for-xr-experiences-in-unreal-engine)

[

使用OpenXR进行头戴式体验开发

![使用OpenXR进行头戴式体验开发](https://dev.epicgames.com/community/api/documentation/image/c709b1d5-6c44-499f-83d4-c69963f59568?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)

[

制作交互式XR体验

![制作交互式XR体验](https://dev.epicgames.com/community/api/documentation/image/f5ab45fa-0ac9-4371-a1fc-605ae6be23f5?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/making-interactive-xr-experiences-in-unreal-engine)
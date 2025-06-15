# 虚幻引擎动画蓝图覆盖 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-blueprint-override-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:09:38.594Z

---

目录

![动画蓝图覆盖](https://dev.epicgames.com/community/api/documentation/image/2d5aa28b-c9b0-4e99-8256-5d618690ff91?resizing_type=fill&width=1920&height=335)

## 概述

在设置角色并为角色设置动画时，有时你会希望让一个角色在执行一个动作时执行一段动画，让另一个角色在进行同样的动作时执行另一段动画。通过使用子[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine) 中的 **资产重载编辑器（Asset Override Editor）**，你就可重载在序列播放器节点（Sequence Player Node）中使用的预先设置的动画资产，从而快速创建动画蓝图的变体，供每个角色使用。

注意，唯一应该通过"子动画蓝图（Child Anim Blueprint）"更改的功能是动画序列。不支持更改其他属性（例如骨架）或者引入动画层。

#### 前置要求

-   本指南中，我们讲使用 **蓝图第三人称** 模板并加入了 **无尽之剑：战士** 和 **动画初学者包** 中的资产，它们都可以通过虚幻商城免费下载。
-   我们还执行了一些 [动画重定位](/documentation/zh-cn/unreal-engine/using-retargeted-animations-in-unreal-engine)，重定位了动画初学者包附带的动画蓝图和动画，用于无尽之剑的角色。

## 步骤

1.  **右键单击** 你要覆盖动画的 **动画蓝图**，并选择 **创建子蓝图类（Create Child Blueprint Class）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd451d7b-b36d-4abf-be9c-932c1f921c80/01_createchild.png)
2.  打开子动画蓝图，在 **文件（File）**菜单中单击 **窗口（Window）**，选择 **资产覆盖编辑器（Asset Override Editor）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08b8a5cf-56ab-4e3c-af0a-52aef8462aef/02_openeditor.png)
3.  **资产覆盖编辑器** 将打开，显示可以覆盖的动画。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75598a6f-30b0-4d9e-bd27-f99dcbc2226a/03_assetoverrideeditor.png)
    
    可以单击每个资产旁边的箭头来展开/折叠资产显示。
    
4.  在 **资产（Asset）**列中，单击下拉窗口并指定要使用的新资产（将在被调用时覆盖现有资产）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5300bc49-1224-439f-ba5d-25789654d4b8/04_selectassettooverride.png)
    
    单击眼球图标可以通过在主图面板中的只读形式预览父图中的节点上下文。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0beca685-7c19-4eac-a9d6-a655705f71f1/05_jumptonode.png)
5.  单击 **编译（Compile）**后可以查看你的更改。这就行了！
    

## 最终结果

下面是一个示例，其中角色在父动画蓝图中的默认运动（被指定为慢跑）已被覆盖，因此该角色执行的是行走。

此功能的主要用例是：你有一个角色在按下某个按钮时会执行某种攻击，而你希望另一个角色具有相同的常规运动，但在按下攻击按钮时会执行不同的动作。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animation blueprint](https://dev.epicgames.com/community/search?query=animation%20blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/animation-blueprint-override-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [前置要求](/documentation/zh-cn/unreal-engine/animation-blueprint-override-in-unreal-engine#%E5%89%8D%E7%BD%AE%E8%A6%81%E6%B1%82)
-   [步骤](/documentation/zh-cn/unreal-engine/animation-blueprint-override-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/animation-blueprint-override-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
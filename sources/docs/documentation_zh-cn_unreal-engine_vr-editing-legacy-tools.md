# 旧版VR编辑工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/vr-editing-legacy-tools
> 
> 生成时间: 2025-06-14T19:21:05.388Z

---

目录

![旧版VR编辑工具](https://dev.epicgames.com/community/api/documentation/image/5feccae1-87c6-477a-a47e-2e9e35d39bec?resizing_type=fill&width=1920&height=335)

本文中提到的旧版虚拟堪景工具将在未来的引擎版本中废弃。我们建议改用[新版虚拟堪景工具](/documentation/zh-cn/unreal-engine/virtual-scouting-in-unreal-engine)。 未使用的VREditor代码和模块将在未来的引擎版本中彻底废弃。

## 交互

利用 **交互（Interaction）** 工具可以变换和操控场景中的对象。在"交互"模式下时，一条光线始终从你的虚拟控制器出现，指示你在场景中指向的位置。将此指针指向场景中的对象，通过在场景中平移、缩放或旋转该对象与其进行交互。有两种方式可以切换到交互工具：

-   在虚拟探查（Virtual Scouting）菜单中选择 **交互（Interact）** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0e34801-2622-4d31-8b68-8a7802fd3804/image_19.png)
-   在你的一个动作控制器上双击菜单按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd67129c-8598-4de6-9281-13a2f8c1ca76/03.png)
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81468461-836a-4151-b76a-835026bbd6a7/rightrifts_fastinteract.png)
    
    Vive
    
    Oculus Touch
    

要选择一个对象，可将指针指向该对象，然后按下再放开动作控制器上的触发器。

-   选择对象之后，它在场景中高亮显示。
-   选择对象之后，按住触发器并围绕指针末端移动。
-   向上或向下滚动Vive动作控制器的触控板，沿着指针光线将对象分别向靠近或远离你的方向移动。
-   你还可以通过按住对象碰撞层内部的虚拟控制器来选择对象。当你的虚拟控制器仍然在对象的碰撞层内部时，按住触发器以抓取对象并在场景中移动。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e818319-af7d-4bdb-9f31-1e5420b3c1e6/badger_interact_selectiongold.png)

### 变换小工具

交互工具拥有通过缩放、旋转和平移对象来变换对象的能力。

#### 结合使用变换小工具Vive控制器

Vive动作控制器的触控板分成四个部分：

-   在按住对象的同时按一下触控板的顶部，以飞过场景。
-   就像导航工具一样，使用Vive动作控制器触控板的底部进行传送。
-   触控板的右侧通过标准变换小工具进行循环，即平移、旋转和缩放。这些变换可以沿着所有三个轴进行，并可将运动限制到两个轴的组合上。
-   触控板的左侧在选定的小工具和通用小工具之间切换。
    -   平移、旋转和缩放是单独的小工具，可以沿着所有三个轴进行，并可将运动限制到两个轴的组合上。
    -   通用小工具将平移、旋转和缩放合并到一个小工具中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf6baa4f-8f96-46c7-9801-aba7028edf47/04.png)

#### 结合使用变换小工具与Oculus Touch控制器

Oculus Touch控制器的使用方式如下：

-   向你要飞行的方向移动Oculus Touch控制器上的准星。
-   就像导航工具一样，你可以在Oculus Touch控制器上按B或Y按钮进行传送。
-   点击Oculus Touch控制器的准星，可以在标准变换小工具和通用小工具之间切换。
    -   平移、旋转和缩放是单独的小工具，可以沿着所有三个轴进行，并可将运动限制到两个轴的组合上。
    -   通用小工具将平移、旋转和缩放合并到一个小工具中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21385097-5a52-4356-beef-dd9741733198/rightrift_interact.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1129d43c-0846-4ab8-be77-45685727f724/badger_interact_universalgizmo.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c636b1be-2199-4160-9582-da79ea481ee4/badger_interact_standardgizmo.png)

通用变换小工具

标准变换小工具

### 对象上下文菜单

在选择一个对象之后，你可以打开上下文菜单快速执行一系列操作。要打开上下文菜单，按动作控制器上的 **菜单（Menu）** 按钮。对于大部分对象，上下文菜单按钮默认为以下两个选项。摄像机和光源具有其他选项。如需更多信息，请参见[VR摄像机和光照工具](/documentation/zh-cn/unreal-engine/vr-camera-and-light-legacy-tools)的 **Viewfinder** 工具部分中的 **摄像机上下文菜单（Camera Context Menu）** 和 **Gaffer** 工具部分中的 **光照上下文菜单（Light Context Menu）**。

-   **删除（Delete）**：从场景中移除选定对象。
-   **复制（Duplicate）**：制作场景中选定对象的副本。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d29e616-3ff2-4a5e-8a46-a17638d14400/image_22.png)

要使用小工具，你必须在虚拟探查（Virtual Scouting）菜单中启用变换小工具（Transform Gizmo）选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dffa695f-5762-4836-9755-2b01e9f6d619/image_21.png)

## 标记

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f5ea9ea-4fe6-4285-9ab1-1ddc1fb582ee/image_41.png)

利用 **标记（Marker）** 工具，你可以在场景中生成彩色条带，以在场景中做标记。这些标记对于多用户虚拟探查会话中的其他用户同样可见。要切换到标记工具，需要打开虚拟探查（Virtual Scouting）菜单并选择标记（Marker）选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb21f4b1-3f91-4e58-9789-0bd31ad0b163/image_42.png)

-   在配备标记工具之后，按动作控制器上的触发器，即可利用虚拟控制器的尖端在场景中绘制三维条带。
-   要更改标记的颜色，请将拇指放在Vive动作控制器的触控板上或移动Oculus Touch控制器的准星，在色轮中选择颜色。
-   点击Vive动作控制器的触控板或Oculus Touch控制器的准星即可选择白色圆圈指向的颜色。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aac4fc69-9dcb-4433-95cb-ea310666af5b/image_43.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f9eeeca-ae54-4471-b70c-d825bb7aa1fa/05.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98de91b5-e8d3-4b58-ac00-3a3204057e9b/rightriftsmarker.png)

Vive

Oculus Touch

你可以擦除使用标记工具作出的标记。

-   在色轮中间选择橡皮擦图标，将标记切换成橡皮擦。
-   要删除某个标记，将虚拟控制器的尖端移动到该标记上，然后按动作控制器上的触发器。
-   此外还可以使用虚拟探查（Virtual Scouting）菜单中的 **撤消（Undo）** 选项或使用撤消手势删除标记。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65409249-f63c-4447-8193-1891a8c8e6b5/image_44.png)

## 测量

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27759d03-bdaf-4294-9e16-462b4ec0d2e0/measure_metric.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d839fc5a-d145-4bd8-9c25-d68a36668455/measure_imperial.png)

采用度量单位的测量工具示例

采用英制单位的测量工具示例

利用 **测量（Measure）** 工具，你可以测量场景中对象之间或特定位置之间的距离，采用公制单位或英制单位。要切换到测量工具，需要打开虚拟探查（Virtual Scouting）菜单并选择测量（Measure）选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7827463-932e-496b-82a7-49609e8e45ed/image_46.png)

配备测量工具之后，虚拟控制器中会投射出一道指针光线。

-   当存在可以测量其距离的对象时，光线末端会显示一个金色的小正方体。按动作控制器上的触发器，追踪蓝色光线进入另一个对象。
-   放开触发器即可测量蓝色光线的长度。将显示一个抬头显示屏(HUD)，其中包含两点之间的测量结果。
-   要在HUD中切换测量单位，请在虚拟探查（Virtual Scouting）菜单中打开设置（Settings）面板，在公制和英制单位刻度之间进行切换。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59600e6b-c9ca-4326-8eea-9be44ef16e5b/image_47.png)

除了测量对象之间的距离，你还可以放置自定义标记，以在场景中的不同位置之间进行测量。放置多个标记将会显示相邻标记之间的距离，以及端到端的总距离。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8cca3cb-e605-4e73-985c-b5d82a6bf212/image_49.png)

-   要在场景中放置这些标记，请在激活测量工具的情况下，使用Vive动作控制器触控板的顶部或Oculus Touch控制器上的B或Y按钮。
-   要移除现有标记，请将虚拟控制器朝着标记移动，直到与标记接触。然后，点击Vive动作控制器触控板的下半部分，或向下拉Oculus Touch控制器的准星。
-   当你从测量工具中切换出去时，标记也会消失。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd0bc215-7fb5-4a06-bc46-e5bcadc1b1d5/06.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1993f50-9f9d-41c1-815e-86e1ccdbbc71/rightrift_flag.png)

Vive

Oculus Touch

## 多用户编辑

作为一个工作流概念，虚拟探查大量使用 **多用户编辑器（Multi-User Editor）**，以便制作队伍中的所有关键成员都可以共同探索场景。 除非另有说明，所有工具的更改都会反映给多用户会话中的所有用户。

当有多个用户在会话中时，他们的名称会显示在菜单的左侧部分。通过在列表中选择另一个用户，你可以传送到该用户的位置。

并非所有用户都必须在虚拟现实中才能参与。当某位美术师从桌面工作，执行在VR中很难执行，但在电脑前就可以顺利完成的复杂操作时，使用会话是最好的方法。

如需多用户编辑的更多信息，请参见[多用户编辑](/documentation/zh-cn/unreal-engine/multi-user-editing-in-unreal-engine)。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9a86996-82c3-42dd-a4c4-e9ebbc2f36cc/multiuser.jpg)

**指针（Pointer）**

在多用户探查会话中，你可以从虚拟控制器创建对其他用户可见的指针光线，以便将他们的注意力指引到场景的特定部分上。要使用指针功能，请激活导航工具，按Vive动作控制器触控板的顶部或按Oculus Touch控制器上的触发器。

### 火焰

要向你所在多用户探查会话中的其他用户显示你在关卡中的位置，将两个控制器都举过你头顶，直到它们靠在一起。你的虚拟控制器尖端将会显示红色火焰。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c82eb21-bec2-4a77-ab8e-a5f352aac858/_mg_0292_cropped.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b35dae4f-5228-437f-9777-09cc77bf5f7f/badger_beacon_example.png)

 

 

## Sequencer

使用 **Sequencer** 工具，你可以播放场景中的序列。要激活工具，请打开虚拟探查（Virtual Scouting）菜单，在菜单底部选择序列（Sequence）面板。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b2f3809-14ce-432c-a7b6-623aefbb9478/image_62.png)

你必须已向关卡添加了序列，并且Sequencer窗口/选项卡必须在UE4中打开，才能让此工具正常工作。如需有关向关卡添加序列的更多信息，请参见[Sequencer概览](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)。

-   要擦除序列时间轴，按住动作控制器上的触发器，向你的左侧或右侧移动动作控制器。
-   要显示或暂停序列，按Oculus Touch控制器上的B或Y按钮，或按在Vive控制器触控板的中心。
-   你可以慢慢向前或向后跟踪播放头。
    -   使用Vive动作控制器，在触控板上顺时针或逆时针滑动你的拇指。
    -   使用Oculus Touch控制器，向左或向右移动准星。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25baa769-24cb-4dcb-9a54-0b450be9cbc0/07.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46aac503-191b-4605-89c9-19b00f2b11bb/rightrift_sequencer.png)

Vive

Oculus Touch

### 使用Sequencer进行实时编辑

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d1d818e-db4b-4039-a76b-c343a8d0487a/image_65.png)

**实时编辑（Live Editing）** 让你能够在VR中实时制作对象的动画和设置对象的关键帧。这要求你的关卡具有与其关联的序列，以便在该序列中保存额外的关键帧。

必须在虚拟探查设置中启用实时编辑才能使用该功能。

要在你的场景中设置关键帧并持续操控对象，你需要在序列中的不同帧上更改对象的位置、旋转或缩放。将序列移动到你要使用交互工具修改和编辑对象的帧编号。擦除序列后，可以在播放时看到你对对象进行的编辑。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/422b62e7-4f26-4ee6-812c-31ae8fdbfa06/image_64.png)

Sequencer工具对于此工作流非常重要。

**编辑：关闭对齐（Editing: Turn Off Snapping）**

在VR中直接与对象交互时，禁用对齐功能可以提供更好的体验，因为移动将更流畅。你可以按照以下步骤禁用这些设置。

1.  导航至Edit（编辑） > Editor Preferences（编辑器首选项）。
2.  选择Viewports（视口）部分。
3.  禁用Grid Snapping（网格对齐）、Rotation Snapping（旋转对齐）和Scale Snapping（缩放对齐）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6006ff48-7189-40f4-84f9-812d3a3f62eb/image_10.png)

-   [virtual scouting](https://dev.epicgames.com/community/search?query=virtual%20scouting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [交互](/documentation/zh-cn/unreal-engine/vr-editing-legacy-tools#%E4%BA%A4%E4%BA%92)
-   [变换小工具](/documentation/zh-cn/unreal-engine/vr-editing-legacy-tools#%E5%8F%98%E6%8D%A2%E5%B0%8F%E5%B7%A5%E5%85%B7)
-   [结合使用变换小工具Vive控制器](/documentation/zh-cn/unreal-engine/vr-editing-legacy-tools#%E7%BB%93%E5%90%88%E4%BD%BF%E7%94%A8%E5%8F%98%E6%8D%A2%E5%B0%8F%E5%B7%A5%E5%85%B7vive%E6%8E%A7%E5%88%B6%E5%99%A8)
-   [结合使用变换小工具与Oculus Touch控制器](/documentation/zh-cn/unreal-engine/vr-editing-legacy-tools#%E7%BB%93%E5%90%88%E4%BD%BF%E7%94%A8%E5%8F%98%E6%8D%A2%E5%B0%8F%E5%B7%A5%E5%85%B7%E4%B8%8Eoculustouch%E6%8E%A7%E5%88%B6%E5%99%A8)
-   [对象上下文菜单](/documentation/zh-cn/unreal-engine/vr-editing-legacy-tools#%E5%AF%B9%E8%B1%A1%E4%B8%8A%E4%B8%8B%E6%96%87%E8%8F%9C%E5%8D%95)
-   [标记](/documentation/zh-cn/unreal-engine/vr-editing-legacy-tools#%E6%A0%87%E8%AE%B0)
-   [测量](/documentation/zh-cn/unreal-engine/vr-editing-legacy-tools#%E6%B5%8B%E9%87%8F)
-   [多用户编辑](/documentation/zh-cn/unreal-engine/vr-editing-legacy-tools#%E5%A4%9A%E7%94%A8%E6%88%B7%E7%BC%96%E8%BE%91)
-   [火焰](/documentation/zh-cn/unreal-engine/vr-editing-legacy-tools#%E7%81%AB%E7%84%B0)
-   [Sequencer](/documentation/zh-cn/unreal-engine/vr-editing-legacy-tools#sequencer)
-   [使用Sequencer进行实时编辑](/documentation/zh-cn/unreal-engine/vr-editing-legacy-tools#%E4%BD%BF%E7%94%A8sequencer%E8%BF%9B%E8%A1%8C%E5%AE%9E%E6%97%B6%E7%BC%96%E8%BE%91)
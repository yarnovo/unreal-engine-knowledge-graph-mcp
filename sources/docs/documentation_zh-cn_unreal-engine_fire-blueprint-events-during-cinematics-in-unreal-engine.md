# 通过Sequencer调用事件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fire-blueprint-events-during-cinematics-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:14:12.274Z

---

目录

![通过Sequencer调用事件](https://dev.epicgames.com/community/api/documentation/image/40fb11d9-314d-45e3-a09a-703b505d6c07?resizing_type=fill&width=1920&height=335)

通过 **Sequencer** 播放过场动画时，可能需要触发 **事件** 来启动部分脚本功能。 有时，需将过场动画中某点处的门打开或产生粒子效果，并以某种方式影响玩家。利用 **事件轨迹**，可将过场动画中要调用事件的指定帧设为关键帧。

无需访问蓝图，即可通过Sequencer轨迹添加事件。可向对象添加多个事件，也可向单个事件添加多个对象绑定。 若打开蓝图，还可向一个事件添加多个参数。欲了解详情，参阅[事件轨迹概览](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine)。

本指南将使用多个事件轨迹在屏幕上打印文本，以表明角色死亡。同时，禁用玩家移动并在角色上模拟物理效果。

本指南将使用 **蓝图第三人称模板（Blueprint Third Person Template）** 项目。

## 设置角色

首先需设置第三人称角色。

1.  在主工具栏中，点击 **过场动画（Cinematics）** 按钮，然后选择 **添加关卡序列（Add Level Sequence）**，进行任意命名和保存位置。
    
2.  在关卡序列的 **细节（Details）** 面板中，启用 **自动运行（Auto Play）** 选项。
    
3.  在关卡中选择 **ThirdPersonCharacter**，然后通过 **+轨迹（+ Track）** 按钮将其添加到Sequencer中。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f3a2b61-61fb-4622-a93f-6456af9d2c50/neweventtrack_03.png "NewEventTrack_03.png")
    
4.  右键点击关卡中的 **ThirdPersonCharacter**，然后选择 **编辑ThirdPersonCharacter**。
    
5.  右键点击 **事件图表（Event Graph）**，搜索并添加 **自定义事件**。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/105198fe-a343-45f0-b129-42cfda4b8393/neweventtrack_05.png "NewEventTrack_05.png")
    
6.  调用自定义事件 **KillPlayerText**，并将 **Print String** 节点与自定义文本连接，以作为字符串。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6deec838-08f3-4dd2-8098-48a67fc8fef7/killplayer_text.png)
7.  选择KillPlayerText节点，然后在 **细节（Details）** 面板上前往 **输入（Inputs）**。选择 **+添加参数（+Add Parameter）** 将新函数添加到此节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/078c278a-b1a8-4d72-87b6-551253f245dd/add_parameter.png)
8.  在下拉菜单中选择 **字符串（String）** 参数，并将此参数命名更新为 **In String**。然后，将自定义事件中的In String输入连接到Print String。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff633472-871d-472a-98e4-517d41f0a6e5/string_parameter.png)

## 添加事件轨迹

设置角色后可添加事件，以便禁用角色并打印角色蓝图中的文本。

1.  在 **Sequencer** 中，点击 **ThirdPersonCharacter** 轨迹上的 **+轨迹（+ Track）** 按钮，并选择 **事件（Event）**。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d92f9f33-2147-4308-bf08-766472e370c0/neweventtrack_07.png "NewEventTrack_07.png")
    
2.  将时间轴移至帧 **149**，然后向事件轨迹添加关键帧。
    
3.  右键点击新的关键帧，然后在 **属性（Properties）** 下选择 **解除绑定（Unbound）** 下拉菜单，添加 **创建快速绑定（Create a Quick Binding）**。
    
4.  在快速绑定中，搜索 **将所有形体设为模拟物理效果 (Set All Bodies to Simulate Physics)**。确保勾选负载（Payload）下的 **新模拟（New Simulate）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/887f34b8-7490-400e-8b4f-36ab82e6d346/simulate_binding.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/627bd610-34d8-46f9-8753-68cd33767a3a/payload1.png)
5.  添加第二个事件轨迹，并添加 **禁用移动（Disable Movement）** 的快速绑定。
    
6.  添加第三个事件轨迹，并添加快速绑定以调用之前设置的 **Kill Player Text**。在 **负载（Payload）** 下的 **In String** 文本框中输入 **GAME OVER!**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da56f008-d02d-4c8b-9d35-780eb5ba3a54/payload_string1.png)
7.  **按住ALT并拖动** 字符串关键帧至时间轴上的其他三个位置。以 **3** 更新第一个关键帧的字符串文本，以 **2** 更新第二个关键帧的字符串文本，以 **1** 更新第三个关键帧的字符串文本。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a384ea6-108f-4fe9-946a-dc3d0f367eae/payload_string2.png)
    
    实际上，我们正在倒数到GAME OVER!字符串文本。
    
8.  在任意关键帧的 **事件属性（Event Properties）** 中双击 **放大镜** 图标打开 **序列导演蓝图（Sequence Director Blueprint）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8f4b003-e138-41c7-ac7a-7d78a9200cf8/openbp.png)
    
    同时可双击事件关键帧或导航到 **常规选项（General Options）> 打开导演蓝图（Open Director Blueprint）** 来打开蓝图。
    
9.  向 **将所有形体设为模拟物理（Set All Bodies Simulate Physics）** 添加 **SetCollisionEnabled** 节点，并将类型设为 **启动碰撞（Collision Enabled）**。将目标引脚连接到 **Mesh** 引脚。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71aa66bd-3ed4-4db4-872c-587f1d9c901c/eventbp.png)
    
    此设置将导致角色与物体发生碰撞，而非穿过物体。尽管无需访问蓝图即可创建事件，但的确需要将蓝图添加到事件上，例如本例中的情况。
    
10.  按下 **运行（Play）** 即可在视口中运行，角色将于150秒标记处死亡，并在视口左上角打印文本。
    

若左上角出现 **鼠标控制（Mouse Control）** 标签，将无法轻易看清文本。前往 *编辑器首选项（Editor Preferences）* > *关卡编辑器（Level Editor）* > *运行（Play）*，取消勾选 **显示鼠标控制标签（Show Mouse Control Label）** 即可关闭。

## 最终结果

在编辑器中运行片刻，窗口左上角将显示文本，同时角色会掉落地面并不可移动。

在Sequencer中向对象添加事件轨迹将创建对象绑定，可在其中调用绑定对象的事件、函数或访问属性。事件轨迹还可用于执行关卡蓝图、UI控件蓝图中的脚本，或通过蓝图接口与多个蓝图通信。

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [event track](https://dev.epicgames.com/community/search?query=event%20track)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置角色](/documentation/zh-cn/unreal-engine/fire-blueprint-events-during-cinematics-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E8%A7%92%E8%89%B2)
-   [添加事件轨迹](/documentation/zh-cn/unreal-engine/fire-blueprint-events-during-cinematics-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E4%BA%8B%E4%BB%B6%E8%BD%A8%E8%BF%B9)
-   [最终结果](/documentation/zh-cn/unreal-engine/fire-blueprint-events-during-cinematics-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
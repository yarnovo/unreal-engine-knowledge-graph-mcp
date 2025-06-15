# 虚幻引擎Lyra示例之旅 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:50:09.926Z

---

目录

![Lyra之旅](https://dev.epicgames.com/community/api/documentation/image/67f418c5-0549-434d-b7ab-1bc981821c9e?resizing_type=fill&width=1920&height=335)

## Lyra简介

启动Lyra时，你首先看到的是主菜单。

![主菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c80c4e79-d8e6-4b08-be8b-747f02c0309b/mainmenu.gif)

主菜单选项

说明

**玩游戏（Play Game）**

启动Lyra的主 **游戏菜单（Play Menu）**，其中包含 **快速游戏（Quickplay）**、**启动游戏（Start a Game）** 和 **浏览（Browse）** 选项。

**选项（Options）**

用于游戏语言、视频和音频设置、键绑定和输入以及无障碍选项。

**制作人员（Credits）**

包含游戏制作人员UI模板的例子。

**退出Lyra（Quit Lyra）**

退出游戏。

## Lyra主游戏菜单

从初始主菜单点击玩游戏（Play Game）时，将显示主游戏菜单（Play Menu）。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b8643fa-ba78-4437-96d1-bf6276feaa49/maingameselect.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b8643fa-ba78-4437-96d1-bf6276feaa49/maingameselect.png)

### 快速游戏

**快速游戏（QuickPlay）** 菜单可加入任意游戏类型的现有会话，或启动其他人可以加入的新在线游戏。

### 启动游戏

**启动游戏（Start a Game）** 将创建与其他玩家或机器人之间的任意类型的新会话。在线（Online）或本地（local）可用。 选择启动游戏时，你将有机会从可用选项中选择游戏模式。

游戏模式

说明

**控制（Control）**

与队友一起保护控制点，以提高得分并获胜。

**淘汰（Elimination）**

在这个经典的正面交锋团队竞赛中寻找并淘汰足够的敌人以获胜。

**爆炸（Exploder）**

在这个自上而下的派对游戏中摧毁路障，收集强化道具，避免被炸死。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/021f07e3-77e9-4693-b85a-1b0eb6a268bf/mapselect.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/021f07e3-77e9-4693-b85a-1b0eb6a268bf/mapselect.png)

### 浏览

**浏览（Browse）** 菜单会在线以及在你的本地网络上搜索活动的游戏会话。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0ae2b8c-f5d4-4eaf-9345-87c7999db03d/browsesession.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0ae2b8c-f5d4-4eaf-9345-87c7999db03d/browsesession.png)

## 选项

选项（Options）菜单包含游戏语言、视频和音频设置、键绑定和输入以及无障碍选项的设置。

### 菜单选项

#### 显示

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13524a08-831d-4ad0-9624-c5a472ee4055/browsesession.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13524a08-831d-4ad0-9624-c5a472ee4055/browsesession.png)

**窗口模式（Window Mode）**

 

提供用于显示游戏的模式或屏幕设置的模板。

-   **全屏（Full Screen）** ：全屏将在整个屏幕中显示游戏，并隐藏操作系统界面。这样一来，你可能无法与其他窗口交互，但项目的运行性能会更好。
-   **窗口化全屏（Windowed FullScreen）** ：窗口化全屏将以全屏分辨率显示游戏，同时允许在操作系统界面上与其他窗口或应用程序交互。
-   **窗口化（Windowed）** ：窗口化模式允许你拖动窗口边缘来最大化或最小化窗口屏幕，并与其他窗口或应用程序交互。

**分辨率（Resolution）**

 

控制你的屏幕大小的尺寸上显示的像素数量。支持的屏幕尺寸包括：

-   **1280 x 720**
-   **1600 x 900**
-   **1920 x 1080**
-   **2560 x 1440**
-   **3840 x 2160**

根据你的当前窗口模式，结果将如下：

-   **全屏（Fullscreen）** ：分辨率决定了GPU输出分辨率。
    
    根据你的显卡和显示器屏幕大小，这可能会导致你的屏幕上出现黑条渲染显示内容。
    
-   **窗口化（Windowed）** ：分辨率决定了窗口的大小。
-   **窗口化全屏（Windowed Fullscreen）** ：分辨率未激活。

**性能统计数据（Performance Stats）**

配置性能统计数据的显示。

 

 

**客户端FPS（Client FPS）**

显示客户端帧率。可用的显示选项有：

-   **无（None）**
-   **纯文本（Text Only）**
-   **纯图表（Graph Only）**
-   **文本和图表（Text and Graph）**

 

**服务器FPS（Server FPS）**

显示服务器帧率。可用的显示选项有：

-   **无（None）**
-   **纯文本（Text Only）**
-   **纯图表（Graph Only）**
-   **文本和图表（Text and Graph）**

 

**帧时（Frame Time）**

总帧时。

 

**空闲时间（Idle Time）**

以空闲状态等待帧节奏所花费的时间长度。可用的显示选项有：

-   **无（None）**
-   **纯文本（Text Only）**
-   **纯图表（Graph Only）**
-   **文本和图表（Text and Graph）**

 

**CPU游戏时间（CPU Game Time）**

主游戏线程上花费的时间长度。可用的显示选项有：

-   **无（None）**
-   **纯文本（Text Only）**
-   **纯图表（Graph Only）**
-   **文本和图表（Text and Graph）**

 

**CPU渲染时间（CPU Render Time）**

渲染线程上花费的时间长度。可用的显示选项有：

-   **无（None）**
-   **纯文本（Text Only）**
-   **纯图表（Graph Only）**
-   **文本和图表（Text and Graph）**

 

**CPU RHI时间（CPU RHI Time）**

渲染硬件接口线程上花费的时间长度。可用的显示选项有：

-   **无（None）**
-   **纯文本（Text Only）**
-   **纯图表（Graph Only）**
-   **文本和图表（Text and Graph）**

 

**GPU渲染时间（GPU Render Time）**

GPU上花费的时间长度。可用的显示选项有：

-   **无（None）**
-   **纯文本（Text Only）**
-   **纯图表（Graph Only）**
-   **文本和图表（Text and Graph）**

**网络（Network）**

 

 

 

**Ping**

你与服务器的连接的往返延迟。可用的显示选项有：

-   **无（None）**
-   **纯文本（Text Only）**
-   **纯图表（Graph Only）**
-   **文本和图表（Text and Graph）**

 

**传入数据包丢失率（Incoming Packet Loss）**

传入数据包的丢失百分比。可用的显示选项有：

-   **无（None）**
-   **纯文本（Text Only）**
-   **纯图表（Graph Only）**
-   **文本和图表（Text and Graph）**

 

**传出数据包丢失率（Outgoing Packet Loss）**

传出数据包的丢失百分比。可用的显示选项有：

-   **无（None）**
-   **纯文本（Text Only）**
-   **纯图表（Graph Only）**
-   **文本和图表（Text and Graph）**

 

**传入数据包速率（Incoming Packet Rate）**

传入数据包的速率（每秒）。可用的显示选项有：

-   **无（None）**
-   **纯文本（Text Only）**
-   **纯图表（Graph Only）**
-   **文本和图表（Text and Graph）**

 

**传出数据包速率（Outgoing Packet Rate）**

传出数据包的速率（每秒）。可用的显示选项有：

-   **无（None）**
-   **纯文本（Text Only）**
-   **纯图表（Graph Only）**
-   **文本和图表（Text and Graph）**

 

**传入数据包大小（Incoming Packet Size）**

上一秒接收的数据包的平均大小（以字节为单位）。可用的显示选项有：

-   **无（None）**
-   **纯文本（Text Only）**
-   **纯图表（Graph Only）**
-   **文本和图表（Text and Graph）**

 

**传出数据包大小（Outgoing Packet Size）**

上一秒发送的数据包的平均大小（以字节为单位）。可用的显示选项有：

-   **无（None）**
-   **纯文本（Text Only）**
-   **纯图表（Graph Only）**
-   **文本和图表（Text and Graph）**

#### 图形

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b6f0ec4-a18b-4984-a030-5cf2d7073ecb/graphics.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b6f0ec4-a18b-4984-a030-5cf2d7073ecb/graphics.png)

**色盲模式（Color Blind Mode）**

切换显示内容以使用以下选项在色盲模式中渲染：

-   **绿色盲（Deuteranope）**
-   **红色盲（Protanope）**
-   **蓝色盲（Tritanope）**

虚幻将显示以下图像，辅助你找到首选的色彩校正。![色盲](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/654ab8f0-ec15-4018-830b-08f63de35d25/colorblind.png)

**色盲强度（Color Blind Strength）**

使用提供的图像来测试0-10范围内的不同色彩校正强度。

**亮度（Brightness）**

在值0到100%之间调整亮度。

#### 图形质量

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/787c2aac-9896-4134-97b2-cfaca68db646/graphicsquality.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/787c2aac-9896-4134-97b2-cfaca68db646/graphicsquality.png)

**自动设置质量（Auto-Set Quality）**

自动设置质量会基于硬件的基准自动配置图形质量选项。

**质量预设（Quality Presets）**

质量预设为你提供了以下可调整的视频质量选项：

-   **低（Low）**
-   **中（Medium）**
-   **高（High）**
-   **史诗（Epic）**

**3D分辨率（3D Resolution）**

3D分辨率决定了游戏中渲染的对象的分辨率，这可使用滑块控制，范围在0-100%之间。

3D分辨率不会影响主菜单UI的分辨率。

。

**视野距离（View Distance）**

视野距离决定了剔除多远的对象以提高性能。提供了以下选项：

-   **近（Near）**
-   **中（Medium）**
-   **远（Far）**
-   **史诗（Epic）**

**阴影（Shadows）**

阴影决定了动态阴影的分辨率和视野距离。阴影可改进视觉效果质量和深度感知，但可能会降低性能。提供了以下选项：

-   **关闭（Off）**
-   **中（Medium）**
-   **高（High）**
-   **史诗（Epic）**

**抗锯齿（Anti-Aliasing）**

抗锯齿可减少几何体边缘上的锯齿状瑕疵。增加此设置会让边缘显得更平滑，但可能会降低性能。提供了以下选项：

-   **关闭（Off）**
-   **中（Medium）**
-   **高（High）**
-   **史诗（Epic）**

**纹理（Textures）**

纹理决定了游戏中纹理的分辨率质量。增加此设置会使对象的细节更丰富，但可能会降低性能。提供了以下选项：

-   **低（Low）**
-   **中（Medium）**
-   **高（High）**
-   **史诗（Epic）**

**效果（Effects）**

效果决定了游戏中视觉效果和光照的质量。增加此设置会提高视觉效果的质量，但可能会降低性能。提供了以下选项：

-   **低（Low）**
-   **中（Medium）**
-   **高（High）**
-   **史诗（Epic）**

**全局光照（Global Illumination）**

全局光照可控制动态计算的间接光照反射、天空阴影和环境光遮蔽的质量。将其设置为高（High）或更高级别将使用准确的光线追踪方法来解算光照，但可能导致性能下降。提供了以下选项：

-   **低（Low）**
-   **中（Medium）**
-   **高（High）**
-   **史诗（Epic）**

**反射（Reflections）**

反射决定了反射的分辨率和准确性。将其设置为高（High）或更高级别将使用准确的光线追踪方法来解算反射，但可能导致性能下降。提供了以下选项：

-   **低（Low）**
-   **中（Medium）**
-   **高（High）**
-   **史诗（Epic）**

**后期处理（Post Processing）**

后期处理包括动态模糊、景深和泛光。增加此设置将改进后期处理效果的质量，但可能导致性能下降。提供了以下后期处理菜单选项：

-   **低（Low）**
-   **中（Medium）**
-   **高（High）**
-   **史诗（Epic）**

#### 高级图形

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/788fecfe-8fef-4586-9c35-487b38995a0e/advancedgraphics.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/788fecfe-8fef-4586-9c35-487b38995a0e/advancedgraphics.png)

**垂直同步（Vertical Sync）**

垂直同步会始终渲染并呈现完整帧，从而消除屏幕撕裂。禁用垂直同步可实现更高的帧率和更好的输入响应，但可能会导致水平屏幕撕裂。垂直同步可使用以下选项切换：

-   **关闭（Off）**
-   **打开（On）**

**帧率限制（Frame Rate Limit）** （ **电池供电（On Battery）** ）

设置通过电池供电来运行时的帧率限制。将其设置得更低可获得更一致的帧率，设置得更高可在更快的机器上获得最佳体验。你可能需要禁用VSync才能实现高帧率。

-   **30 FPS**
-   **40 FPS**
-   **120 FPS**
-   **144 FPS**
-   **160 FPS**
-   **165 FPS**
-   **180 FPS**
-   **200 FPS**
-   **240 FPS**
-   **360 FPS**
-   **无限制（Unlimited）**

**帧率限制（Frame Rate Limit）** （ **菜单（Menu）** ）

位于菜单中时的帧率限制。将其设置得更低可获得更一致的帧率，设置得更高可在更快的机器上获得最佳体验。你可能需要禁用VSync才能实现高帧率。

-   **30 FPS**
-   **40 FPS**
-   **120 FPS**
-   **144 FPS**
-   **160 FPS**
-   **165 FPS**
-   **180 FPS**
-   **200 FPS**
-   **240 FPS**
-   **360 FPS**
-   **无限制（Unlimited）**

**帧率限制（Frame Rate Limit）** （ **背景（Background）** ）

位于背景时的帧率限制。将其设置得更低可获得更一致的帧率，设置得更高可在更快的机器上获得最佳体验。你可能需要禁用Vsync才能实现高帧率。

-   **30 FPS**
-   **40 FPS**
-   **120 FPS**
-   **144 FPS**
-   **160 FPS**
-   **165 FPS**
-   **180 FPS**
-   **200 FPS**
-   **240 FPS**
-   **360 FPS**
-   **无限制（Unlimited）**

**帧率限制（Frame Rate Limit）**

帧率限制设置了允许的最高帧率。将其设置得更低可获得更一致的帧率，设置得更高可在更快的机器上获得最佳体验。你可能需要禁用Vsync才能实现高帧率。

-   **30 FPS**
-   **40 FPS**
-   **120 FPS**
-   **144 FPS**
-   **160 FPS**
-   **165 FPS**
-   **180 FPS**
-   **200 FPS**
-   **240 FPS**
-   **360 FPS**
-   **无限制（Unlimited）**

#### 音量

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7198dc11-d845-49e8-b878-be8d6a54ba8e/volume.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7198dc11-d845-49e8-b878-be8d6a54ba8e/volume.png)

**总体（Overall）**

调整 **音乐（Music）** 、 **音效（Sound Effects）** 、 **对话（Dialogue）** 和 **语音聊天（Voice chat）** 的总体音量。这可使用滑块控制，范围在0-100%之间。

**音乐（Music）**

调整音乐的音量。这可使用滑块控制，范围在0-100%之间。

**音效（Sound Effects）**

调整音效的音量。这可使用滑块控制，范围在0-100%之间。

**对话（Dialogue）**

调整游戏角色的对话和画外音的音量。这可使用滑块控制，范围在0-100%之间。

**语音聊天（Voice chat）**

调整语音聊天的音量。这可使用滑块控制，范围在0-100%之间。

#### 声音

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4bcd33e3-805c-4237-94c1-d695a471164e/sound.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4bcd33e3-805c-4237-94c1-d695a471164e/sound.png)

**字幕（Subtitles）**

配置字幕的视觉外观。点击 **选项（Options）** 可访问子设置的完整列表。

将字幕切换为 **打开（ON）** 或 **关闭（OFF）** 。

 

**性能统计数据（Performance Stats）**

配置性能统计数据的显示。

 

**文本大小（Text Size）**

通过以下选项调整字幕文本的大小：

-   **特小（Extra Small）**
-   **小（Small）**
-   **中（Medium）**
-   **大（Large）**
-   **特大（Extra Large）**

 

**文本颜色（Text Color）**

为字幕文本选择不同的颜色。

-   **白色（White）**
-   **黄色（Yellow）**

 

**文本边框（Text Border）**

为文本选择不同的边框。

-   **无（None）**
-   **轮廓（Outline）**
-   **阴影（DropShadow）**

 

**背景不透明度（Background Opacity）**

为字幕选择不同的背景或宽屏模式 清除

-   **低（Low）**
-   **中（Medium）**
-   **高（High）**
-   **实心（Solid）**

**音频输出设备（Audio Output Device）**

更改游戏音频的音频输出设备。下面的选项将显示目前可用于你的操作系统的音频输出设备。\* 默认值

更改此设置不会影响语音聊天

 

**后台音频（Background Audio）**

游戏位于后台时打开/关闭游戏音频。如果打开，当最小化游戏时或焦点位于其他窗口时，游戏音频将继续播放。可用的选项包括：

-   **关闭（Off）**
-   **所有声音（All Sounds）**

 

**3D耳机（3D Headphones）**

启用双耳音频。提供3D音频空间化，这样你可以更精准地听出声音的位置，包括你上方、下方和背后的位置。推荐仅用于立体声耳机。可用的选项包括：

-   **关闭（Off）**
-   **打开（On）**

 

**高度动态范围音频（High Dynamic Range Audio）**

启用高度动态范围音频。更改运行时处理链以增加音频混缩的动态范围。适合剧院或更富电影特质的体验。可用的选项包括：

-   **关闭（Off）**
-   **打开（On）**

 

#### 灵敏度

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/658ea271-b932-4708-b40d-ba98525656bb/sensitivity.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/658ea271-b932-4708-b40d-ba98525656bb/sensitivity.png)

**X轴灵敏度（X-Axis Sensitivity）**

设置鼠标的 **水平（Horizontal）** （ **x** ）轴的灵敏度。 使用更高的设置，在通过鼠标向左和向右看时，摄像机会移动得更快。

**Y轴灵敏度（Y-Axis Sensitivity）**

设置鼠标的 **垂直（Vertical）** （ **y** ）轴的灵敏度。 使用更高的设置，在通过鼠标向上和向下看时，摄像机会移动得更快。

**定位灵敏度（Targeting Sensitivity）**

设置用于在定位时降低鼠标灵敏度的修饰符。如果设置为100%，定位时不会变慢。如果是更低的设置，定位时会更慢。

**反转垂直轴（Invert Vertical Axis）**

启用垂直视轴的反转。可切换的选项有：

-   **关闭（Off）**
-   **打开（On）**

**反转水平轴（Invert Horizontal Axis）**

启用水平视轴的反转。可切换的选项有：

-   **关闭（Off）**
-   **打开（On）**

#### 默认键盘和鼠标

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3721f4fd-564e-4231-85a2-61c206c1b6cf/defaultkeyboardandmouse.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3721f4fd-564e-4231-85a2-61c206c1b6cf/defaultkeyboardandmouse.png)

**前移（Move Forward）**

前移的键绑定。

 

**后移（Move Backwards）**

后移的键绑定。

 

**左移（Move Left）**

左移的键绑定。

 

**右移（Move Right）**

右移的键绑定。

 

**发射武器（Fire Weapon）**

发射武器的键绑定。

 

**跳跃（Jump）**

跳跃的键绑定。

 

**蹲伏（Crouch）**

蹲伏的键绑定。

 

**给武器换弹药（Reload Weapon）**

给武器换弹药的键绑定。

 

**猛冲（Dash）**

猛冲的键绑定。

 

**自动运行（Auto-Run）**

自动运行的键绑定

 

**发射武器（Fire Weapon）** （ **自动（Auto）** ）

发射武器（自动）的键绑定

 

#### 射击键盘和鼠标

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6dc020f1-fed2-454d-95d3-03f0cac42d67/keyboardandmouse.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6dc020f1-fed2-454d-95d3-03f0cac42d67/keyboardandmouse.png)

**显示记分牌（Show Scoreboard）**

显示记分牌的键绑定。

**瞄准射击（Aim Down Sight）**

瞄准射击的键绑定。

**扔手榴弹（Throw Grenade）**

扔手榴弹的键绑定。

**表现神态（Emote）**

表现神态的键绑定。

**快速插槽1（Quick Slot 1）**

快速插槽1的键绑定。

**快速插槽2（Quick Slot 2）**

快速插槽2的键绑定。

**快速插槽3（Quick Slot 3）**

快速插槽3的键绑定。

**近战（Melee）**

近战的键绑定。

**快速插槽向后循环（Quickslot Cycle Backward）**

快速插槽向后循环的键绑定。

**快速插槽向前循环（Quickslot Cycle Forward）**

快速插槽向前循环的键绑定

#### 游戏手柄

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9902de8-3553-4e90-868b-ddd42392401d/gamepadsensitivity.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9902de8-3553-4e90-868b-ddd42392401d/gamepadsensitivity.png)

**手柄硬件（Controller Hardware）**

切换你所使用的手柄类型。可选择的选项包括：

-   **Xbox手柄**
-   **Dual Sense**

**振动（Vibration）**

打开或关闭手柄振动。

-   **关闭（Off）**
-   **打开（On）**

**反转垂直轴（Invert Vertical Axis）**

启用垂直视轴的反转。

-   **关闭（Off）**
-   **打开（On）**

**反转水平轴（Invert Horizontal Axis）**

启用水平视轴的反转。

-   **关闭（Off）**
-   **打开（On）**

#### 灵敏度

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/328e6986-06d8-4a6f-9c0d-1bb080a6f5ab/sensitivity.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/328e6986-06d8-4a6f-9c0d-1bb080a6f5ab/sensitivity.png)

**视角灵敏度（Look Sensitivity）**

你的视野旋转的速度。

-   **1**（**缓慢（Slow）**）
-   **2**（**缓慢+（Slow+）**）
-   **3**（**缓慢++（Slow++）**）
-   **4**（**正常（Normal）**）
-   **5**（**正常+（Normal+）**）
-   **6**（**正常++（Normal++）**）
-   **7**（**快速（Fast）**）
-   **8**（**快速+（Fast+）**）
-   **9**（**快速++（Fast++）**）
-   **10**（**疯狂（Insane）**）

**瞄准灵敏度（Aim Sensitivity）** （ **ADS** ）

瞄准射击（ADS）时你的视野旋转的速度。

-   **1**（**缓慢（Slow）**）
-   **2**（**缓慢+（Slow+）**）
-   **3**（**缓慢++（Slow++）**）
-   **4**（**正常（Normal）**）
-   **5**（**正常+（Normal+）**）
-   **6**（**正常++（Normal++）**）
-   **7**（**快速（Fast）**）
-   **8**（**快速+（Fast+）**）
-   **9**（**快速++（Fast++）**）
-   **10**（**疯狂（Insane）**）

#### 手柄死区

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a708d36b-87ea-49b5-a624-b979626f2582/controllerdeadzone.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a708d36b-87ea-49b5-a624-b979626f2582/controllerdeadzone.png)

**左摇杆死区（Left Stick DeadZone）**

增加或减少左摇杆周围我们将忽略其中的输入的区域。将该值设置得太低可能会导致即使你的手指离开摇杆后，角色仍继续移动。

**右摇杆死区（Right Stick DeadZone）**

增加或减少右摇杆周围我们将忽略其中的输入的区域。将该值设置得太低可能会导致即使你的手指离开摇杆后，角色仍继续移动。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [lyra](https://dev.epicgames.com/community/search?query=lyra)
-   [shootercore](https://dev.epicgames.com/community/search?query=shootercore)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Lyra简介](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#lyra%E7%AE%80%E4%BB%8B)
-   [Lyra主游戏菜单](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#lyra%E4%B8%BB%E6%B8%B8%E6%88%8F%E8%8F%9C%E5%8D%95)
-   [快速游戏](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#%E5%BF%AB%E9%80%9F%E6%B8%B8%E6%88%8F)
-   [启动游戏](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#%E5%90%AF%E5%8A%A8%E6%B8%B8%E6%88%8F)
-   [浏览](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#%E6%B5%8F%E8%A7%88)
-   [选项](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#%E9%80%89%E9%A1%B9)
-   [菜单选项](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#%E8%8F%9C%E5%8D%95%E9%80%89%E9%A1%B9)
-   [显示](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#%E6%98%BE%E7%A4%BA)
-   [图形](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#%E5%9B%BE%E5%BD%A2)
-   [图形质量](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#%E5%9B%BE%E5%BD%A2%E8%B4%A8%E9%87%8F)
-   [高级图形](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#%E9%AB%98%E7%BA%A7%E5%9B%BE%E5%BD%A2)
-   [音量](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#%E9%9F%B3%E9%87%8F)
-   [声音](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#%E5%A3%B0%E9%9F%B3)
-   [灵敏度](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#%E7%81%B5%E6%95%8F%E5%BA%A6)
-   [默认键盘和鼠标](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#%E9%BB%98%E8%AE%A4%E9%94%AE%E7%9B%98%E5%92%8C%E9%BC%A0%E6%A0%87)
-   [射击键盘和鼠标](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#%E5%B0%84%E5%87%BB%E9%94%AE%E7%9B%98%E5%92%8C%E9%BC%A0%E6%A0%87)
-   [游戏手柄](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#%E6%B8%B8%E6%88%8F%E6%89%8B%E6%9F%84)
-   [灵敏度](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#%E7%81%B5%E6%95%8F%E5%BA%A6-2)
-   [手柄死区](/documentation/zh-cn/unreal-engine/tour-of-lyra-in-unreal-engine#%E6%89%8B%E6%9F%84%E6%AD%BB%E5%8C%BA)
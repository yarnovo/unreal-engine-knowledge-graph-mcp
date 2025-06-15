# 虚幻引擎中的动画Rewind调试器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-rewind-debugger-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:08:50.529Z

---

目录

![Rewind调试器](https://dev.epicgames.com/community/api/documentation/image/f51f1b4b-1e43-43a9-bd09-7523cd5b4a6a?resizing_type=fill&width=1920&height=335)

通过 **Rewind调试器（Rewind Debugger）** ，你可以在运行时期间录制项目的片段，并倒回模拟来观察有关动画行为和互动的信息。Rewind调试器以 [Animation Insights](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine) 为基础构建，提供了全新的视觉接口来调试 **虚幻引擎** 中的动画内容。

#### 先决条件

-   启用 **Animation Insights** [插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)。在 **菜单栏** 中找到 **编辑（Edit）> 插件（Plugins）** 并找到 **动画（Animation）** 分段中的 **Animation Insights** ，或使用 **搜索栏** 。启用插件并重启编辑器。

![animation insights插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d864221-0fd2-4526-9940-415b1d2b34ee/animationinsightsplugin.png)

## 概述

在虚幻引擎中创建项目时，可能很难在运行时期间调试项目。通过Rewind调试器，你可以在运行时期间录制项目的片段，然后在录制内容中向后推移，在功能更齐备、更稳定的工作环境中调试动画内容。Rewind调试器提供了有关动画变量、阈值、触发器、通知等的信息。在录制的片段中推移时，会在Rewind调试器 **细节（Details）** 面板中填充带有上下文的信息。

![demonstration of the rewind debugger](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/64291874-c0f1-4ef5-8fa6-705709d96e69/debugdemo.gif)

动画数据以视觉方式表示，在选择目标对象后，在 **Rewind调试器时间轴** 轨道上填充。Rewind调试器轨道可以包含关于[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine),[序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine) playback,[动画变量](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine),[通知](/documentation/zh-cn/unreal-engine/animation-notifies-in-unreal-engine)甚至更多信息。

![animation data tracks in the rewind debugger timeline](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89f27dc8-6d37-49a7-aaed-b1633333aeba/tracks.png)

要打开Rewind调试器（Rewind Debugger）窗口，在 **菜单栏** 中找到 **工具（Tools）** > **调试（Debug）** > **Rewind调试器** 。

![open the rewind debugger by navigating to the menu bar and then tools and then debug and then select rewind debugger](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/413eb9ad-1be7-4a9e-8db6-fc5c7512d864/menubarrewinddebuggerdetails.png)

在从Rewind调试器时间轴中选择一个轨道后，你可以在 **Rewind调试器细节** 面板中查看更精确的动画数据。要打开Rewind调试器细节（Rewind Debugger Details）面板，在 **菜单栏** 中找到 **工具** > **调试** > **Rewind调试器细节**。

![open the rewind debugger details panel by navigating to the menu bar and then tools and then debug and then select rewind debugger details panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfb4ff45-4046-49bc-9994-917cedd7a28f/menubarrewinddebuggerdetails.png)

## Rewind调试器接口

Rewind调试器窗口填充了独特的接口，供你在导航录制的动画时使用。

![rewind debugger window overview with highlighted regions](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b04a7dba-0a80-427c-abf3-c5d93c6f9da9/overview.png)

功能

图像

说明

**1.项目模拟功能按钮（Project Simulation Controls）**

![项目模拟功能按钮播放暂停停止弹出](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13402218-a116-4204-a791-ef027b5ca8bb/simulationcontrols.png)

使用播放、暂停和停止等功能控制项目的模拟。如需了解更多信息，请参阅[虚幻编辑器接口](/documentation/zh-cn/unreal-engine/unreal-editor-interface#main%20toolbar)文档。

**2.Rewind调试器菜单（Rewind Debugger Menu）**

![包含可用数据选项卡的摄像机模式和视图选项的Rewind调试器菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e5ab941-9620-4c49-8461-73da36895316/hamburgermenu.png)

让你控制摄像机行为并切换哪些选项卡可见。**摄像机模式（Camera Modes）** 如下所示： **禁用（Disabled）** 将禁用摄像机移动，使摄像机不绑缚游戏对象。

**跟随目标Actor（Follow Target Actor）** 会将摄像机锁定到预定位置中的所选对象。你可以将摄像机定位到关卡中的任意位置，并且摄像机将沿与所选对象相同的轨道移动。

该选项不会追踪所选对象，而是根据与角色相同的移动数据来移动摄像机。

-   **重播录制的摄像机（Replay Recorded Camera）** 将摄像机锁定到它在模拟中占用的位置，跟随相同的移动（如有）。

确保你在尝试更改摄像机控制模式之前，先弹出项目模拟功能按钮（Project Simulation Controls）中的播放器功能按钮。

**3.对象大纲视图（Object Outliner）**

![高亮显示滴管工具的Rewind调试器对象大纲视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15c6cec3-3eb6-463d-91aa-9e05558f5de2/objectoutline.png)

录制之后，在此处选择主题以填充Rewind调试器的细节（Details）面板。你可以在视口窗口中手动选择主题，也可以使用 **滴管（Dropper）** 工具并在视口窗口中选择主题。

选择对象之后，对象大纲视图将列出所选对象以及所有子对象和组件，包括在运行时期间创建或销毁的子对象和组件，以及所有附加的控制器。

对象大纲包括以下工具，你可以用来协助选择要调试的游戏对象，以及筛选它们连接的组件。

1.  **滴管工具（Dropper Tool）**: 你可以使用滴管工具在视口中手动选择一个游戏对象进行调试。
2.  **过滤器菜单（Filter Menu）**: 你可以使用过滤菜单，过滤对象大纲的组件和选定游戏对象的子对象列表。

有些游戏对象是由多个组件组成的，例如[移动组件](/documentation/zh-cn/unreal-engine/movement-components-in-unreal-engine),[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)等等。每一个这些组件都作为子对象列在对象大纲中，且在Rewind调试器时间轴中包含相关的轨道，必须单独选择才能在 **Rewind调试器细节** 面板中看到它们各自的数据。

**4.播放功能按钮（Playback Controls）**

![高亮显示录制的Rewind调试器播放功能按钮播放暂停前进后退](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a85a10d-69b2-40a7-bdc1-1d82d545b3c3/playbackcontrols.png)

让你控制项目模拟的录制片段的播放。你还会在这里发现录制按钮，用于在模拟项目时开始和停止录制过程。

**5.倒回时间轴（Rewind Timeline）**

![高亮显示红色播放头的Rewind调试器时间轴](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f73fb423-f3e0-4828-8348-e9d7db3299bb/timeline2.png)

让你在项目模拟的录制片段中手动推移。

**6.细节（Details）面板和[数据选项卡](/documentation/zh-cn/unreal-engine/animation-rewind-debugger-in-unreal-engine#%E6%95%B0%E6%8D%AE%E9%80%89%E9%A1%B9%E5%8D%A1)**

![高亮显示数据选项卡和视图选项的Rewind调试器细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6dddf38c-281f-4f0c-a5dc-68dc59659414/details2.png)

细节（Details）面板根据所选主题和打开的数据选项卡显示所有可用数据。显示的信息可能包括变量值、布尔值状态，等等。

根据你在对象大纲视图中选择的主题，系统会在Rewind调试器细节面板顶部自动填充不同的选项卡。

要打开Rewind调试器细节面板，在 **菜单栏** 中找到 **工具** > **调试** > **Rewind调试器细节**。

## 使用Rewind调试器

1.  要使用Rewind调试器，首先点击项目模拟功能按钮（Project Simulation Controls）中的 **绿色播放按钮** ，启动游戏模拟。
    
2.  然后点击Rewind调试器播放功能按钮中的 **录制** 以开始录制项目模拟。
    
    要将光标从模拟断开连接而不停止或暂停模拟，请使用热键 **Shift + F1** 。
    
3.  当你录制了足够数量的项目模拟时，使用项目模拟功能按钮（Project Simulation Controls）暂停模拟并弹出摄像机。
    
    ![in the simulation controls pause and then eject the game controller](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1f93ee9-a11f-4c57-8cc7-6d0993d695e1/pausetheneject.png)
    
4.  再次点击 **录制** 以停止录制。

录制的游戏部分现在可以准备使用。你可以通过从**对象大纲** 中选择一个游戏对象，或在视口中使用 **滴管** 工具选择你的游戏对象，然后开始调试游戏对象。

在选择了一个游戏对象后，**Rewind调试器时间轴** 会在上下文中填充与游戏对象的组件和子对象有关的动画数据轨道。你可以用播放头或播放控制拖动Rewind调试器时间轴来查看录制的动画数据如何更新视口中的游戏对象。

要快速读取时间轴中的动画数据值，可以将鼠标悬停在时间轴轨道上，查看录制片段的时间位置上读取的动画轨道当前值。

![hover your cursor over animation data tracks for a quick readout of animation data values](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae3c8069-01d9-442f-861e-3f5d99ea6594/debugtimelinedatademo.gif)

在Rewind调试器（Rewind Debugger）菜单中，你还可以选择不同的摄像机模式以在调试时获取不同的主题视图。例如，通过 **禁用（Disabled）** 选项，你可以分离摄像机并随意放置它，从任意角度观察你的动画主题来辅助工作流程。

![playback scrubbing from a different camera angle](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24f57f07-a80e-4927-9a99-4a4c962d43bd/playbackscrubbing.gif)

在Rewind调试器的对象大纲视图中选择对象后，Rewind调试器的细节（Details）面板将使用与该对象和录制中的当前时刻相关的选项卡和信息填充上下文。你可以使用播放头或播放功能按钮在Rewind调试器时间轴中推移，查看信息如何随着实时录制的模拟及其行为而动态更新和变化。

![pilot actor viewport option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8b2cf98-3a60-4361-8be2-41838d3c005c/eject.png)

在对你的游戏对象或动画系统进行编辑后，你可以使用项目模拟功能按钮中的控制器图标重新连接游戏控制器，然后恢复游戏，继续进行调试。当游戏模拟重新开始时，除非手动停止，Rewind调试器仍会继续录制游戏过程。

### 追踪文件

当用Rewind调试器录制游戏片段时，[追踪文件](/documentation/zh-cn/unreal-engine/trace-in-unreal-engine-5)将同时被录制并存储在你的本地机器中。您可以访问属性和设置来管理您的追踪文件，比如暂停追踪文件录制，开始新的追踪文件录制，以及在Unreal Insights中打开最近的追踪文件录制。

![trace file settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/671a2732-860f-4c48-a75f-0ec11cfe23cd/tracesettings.png)

追踪文件将被录制并永久储存，所以管理你的追踪文件，偶尔删除旧文件十分重要。你可以通过选择底栏中的追踪图标，并选择到打开追踪存储目录 **Open Trace Store Directory** 来访问你保存追踪文件的位置进行管理。

![open trace file directory](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39b7da4d-0c7d-4a1a-8389-8a7d420b22ee/opentracefiles.png)

你也可以按照文件路径轨迹来访问追踪文件：

```cpp
"Drive":\Users\"User Name"\AppData\Local\UnrealEngine\Common\UnrealTrace\Store\001
```

## 动画蓝图

获取录制的项目模拟片段之后，你可以在对象大纲视图中 **双击** 动画蓝图组件，在新建窗口中打开并连接[动画蓝图编辑器](/documentation/zh-cn/unreal-engine/animation-blueprint-editor-in-unreal-engine)。在拖动录制片段时，动画蓝图编辑器显示所选动画蓝图的录制状态，与游戏对象的录制时刻相对应。

![attached animation blueprint demo simultaneous debugging](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd06db93-a34c-4f3e-a709-16020e0deb80/debugbpdemo.gif)

有了这个功能，你可以观察动画蓝图是如何在录制的游戏片段的任意时刻生成输出姿势(Output pose)的。你可以观察[动画蓝图节点](/documentation/zh-cn/unreal-engine/animation-blueprint-nodes-in-unreal-engine)，[变量](/documentation/zh-cn/unreal-engine/how-to-get-animation-variables-in-animation-blueprints-in-unreal-engine)，[状态机](/documentation/zh-cn/unreal-engine/state-machines-in-unreal-engine)的位置等等。

### 姿势查看

在动画蓝图中，你可以在 **动画蓝图节点** 上启用[姿势查看（Pose Watch）](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#posewatch)来查看每个节点在录制游戏过程中对 **输出动画姿势** 的影响。这对于了解在游戏录制过程中每个节点对于对象的动画有什么影响非常有用。

![use pose watch animation blueprint nodes with rewind debugger](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18974964-a484-4b32-9d96-124d777ea72d/posewatchdemo.gif)

[动画蓝图节点](/documentation/zh-cn/unreal-engine/animation-blueprint-nodes-in-unreal-engine)必须[启用姿势查看](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#posewatch),然后Rewind调试器才能录制游戏过程。然后可以在使用录制的游戏片段时切换姿势查看。

## 倒回调试设置

你可以访问在虚幻引擎的[项目设置](/documentation/zh-cn/unreal-engine/unreal-editor-preferences)，参考 **Rewind调试器设置**。通过点击菜单中的 **编辑 >项目设置** ，打开项目设置。Rewind调试器设置部分位列在 **插件** 类别下。

![rewind debugger settings in unreal engine project settings under plugins](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45036e09-5c96-4080-997e-ff8491af428d/rewinddebuggersettings.png)

设置

说明

**摄像机模式（Camera Mode）**

**在PIE中自动录制** (**在编辑器中播放**)

当 **启用** 时，只要Rewind调试器已启动，游戏模拟开始时Rewind调试器将自动录制游戏过程。当 **禁用** 时，游戏录制将需要手动启动。

**显示空的Object轨道**

当 **\*启用** 时，空的动画数据轨道在Rewind调试器时间轴中仍然可见。当 **禁用** 时，所有空的轨道都会被隐藏。

## 拓展

Rewind调试器的用途超出了与Animation Insights插件打包的版本。团队可以建立并在Rewind调试器中添加自定义的轨道，以显示其项目的特定组件或游戏元素。

在 **姿势搜索插件（Pose Search plugin）** 中可以看到一个例子，说明如何修改Rewind调试器，使其适配项目的具体需要，该插件具有独特的调试工具，专门用于处理姿势搜索动画。

![pose search plug in experimental](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da6d34fa-4e6a-41a2-8d7d-7e338c0fd16a/psplug.png)

安装了这两个插件后，当选定的角色使用姿势搜索节点时，会在Rewind调试器中添加一个自定义的姿势搜索轨道，其中包含用于协助调试的姿势搜索动画扩展数据。

![custom pose search node data tracks in the rewind debugger timeline](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/971ec6f9-b2c2-4922-94a8-5ae970a65f00/posesearch.png)

你可以尝试使用姿势搜索（Pose Searching）功能，但它目前是实验性的，我们不建议用它来发行项目。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/animation-rewind-debugger-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [概述](/documentation/zh-cn/unreal-engine/animation-rewind-debugger-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [Rewind调试器接口](/documentation/zh-cn/unreal-engine/animation-rewind-debugger-in-unreal-engine#rewind%E8%B0%83%E8%AF%95%E5%99%A8%E6%8E%A5%E5%8F%A3)
-   [使用Rewind调试器](/documentation/zh-cn/unreal-engine/animation-rewind-debugger-in-unreal-engine#%E4%BD%BF%E7%94%A8rewind%E8%B0%83%E8%AF%95%E5%99%A8)
-   [追踪文件](/documentation/zh-cn/unreal-engine/animation-rewind-debugger-in-unreal-engine#%E8%BF%BD%E8%B8%AA%E6%96%87%E4%BB%B6)
-   [动画蓝图](/documentation/zh-cn/unreal-engine/animation-rewind-debugger-in-unreal-engine#%E5%8A%A8%E7%94%BB%E8%93%9D%E5%9B%BE)
-   [姿势查看](/documentation/zh-cn/unreal-engine/animation-rewind-debugger-in-unreal-engine#%E5%A7%BF%E5%8A%BF%E6%9F%A5%E7%9C%8B)
-   [倒回调试设置](/documentation/zh-cn/unreal-engine/animation-rewind-debugger-in-unreal-engine#%E5%80%92%E5%9B%9E%E8%B0%83%E8%AF%95%E8%AE%BE%E7%BD%AE)
-   [拓展](/documentation/zh-cn/unreal-engine/animation-rewind-debugger-in-unreal-engine#%E6%8B%93%E5%B1%95)
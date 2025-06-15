# 虚幻引擎中的Animation Insights | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:08:52.807Z

---

目录

![Animation Insights](https://dev.epicgames.com/community/api/documentation/image/d83c7002-ccd1-4a0e-9190-91e72838aef2?resizing_type=fill&width=1920&height=335)

**Animation Insights** 是 **虚幻引擎** 中的一款[插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)，旨在通过展示跟踪数据来实时剖析和观察项目的游戏和动画系统性能。通过在**PIE**（**Play in Editor**）模拟过程中记录跟踪信息，你可以查找导致项目为何实现既定帧率的性能瓶颈，从而寻找优化机会。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1b1f7cc-d892-4ad4-b9cb-6e30eb76a6fd/insights.png)

Animation Insights插件包含一张性能图表，可用于观察游戏和动画系统的性能、动画状态和实时的行为更新（例如随时间变化的变量和混合值）。通过跟踪你的项目数据，Animation Insights将跟踪数据值的变化，并将这些信息绘制成彩色编码的轨道，你可以用它来调试和优化你的项目。

你可以为以下数据类型开启追踪记录，从而观察项目数据的变化：

-   动画 **姿势（Poses）**、[曲线（Curves）](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)，**混合权重（Blend Weights）**，[蒙太奇（Montages）](/documentation/zh-cn/unreal-engine/animation-montage-in-unreal-engine)，[动画通知（Anim Notifies）](/documentation/zh-cn/unreal-engine/animation-notifies-in-unreal-engine)以及基于演示效果的[动画图表（Anim Graph）](/documentation/zh-cn/unreal-engine/graphing-in-animation-blueprints-in-unreal-engine)视图（该视图使用实时更新取代了 `showdebug动画` 系统）。

借助[跟踪数据过滤](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine#tracedatafiltering)功能，你可以在所有写入的记录数据中，筛选出特定类型的跟踪数据。你也可以使用[来源过滤](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine#tracesourcefiltering)，选择只查看某一个游戏对象相关的追踪数据。

#### 使用条件

-   你需要启用以下[插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)。在 **菜单栏** 中找到 **编辑（Edit）** > 插件（**Plugins）** ，找到在 **Insights** 分段下列出的 **Animation Insights**，**Insights数据源过滤器** 和 **Trace Data过滤** 插件，或使用 **搜索栏** 直接搜索。启用插件并重启编辑器。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44b8b7a0-3207-4235-8a43-c8f204343eef/plugins.png)

## 使用Animation Insights

安装插件后，打开 **Animation Insights** 和 **Trace Data过滤** 面板。在 **菜单栏** 中找到 **工具** > **性能分析** 并同时选择 **Animation Insights** 和 **Trace Data Filtering** 选项。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8df0d9b-8300-4880-9c8d-3a55a4030234/openpanels.png)

你可以启用 **Trace Data Filtering** 面板中的 **Trace Channel Filters**，它会在 **Animation Insights** 面板的图表中实时填充相应的数据。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54e3fe32-13d1-44b9-a241-3681dc88b771/toggletrace.png)

Animation Insights会将此类数据储保存在计算机应用数据的 `.utrace` 文件中，你可以使用[Unreal Insights Application](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)访问这些跟踪文件。你可以在 **菜单栏** 中点击 **工具** > **启动Unreal Insights**，在编辑器中启动它。

请确保只有在需要调式或优化性能时才启用动画跟踪功能，否则生成的 .utrace 文件可能会占用大量存储空间。

### 跟踪数据过滤

打开跟踪数据过滤（Trace Data Filtering）面板后，你可以单独显示或隐藏某个跟踪通道（Trace Channel）的状态，实时记录或忽略特定的数据类型。无论你是否运行编辑器，这些数据都会被跟踪并记录在Animation Insights面板中，并被渲染成图表，让你了解一段时间内的数据变化。

启用多少通道？将它们启用多久？这些选择很重要。通道过滤会对你的项目性能开销产生影响，并且会影响你保存的 `.utrace` 文件的大小，从而决定你能节省多少计算机磁盘空间。

在选中了需要的跟踪通道后，你可以点击 **过滤器预设（Filter Preset）** 下拉菜单，选择 **保存用户预设（Save User Preset）** ，将你选中的跟踪通道组合保存为一组过滤器预设。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0783b05-5e7e-4b29-bd0d-88d1ad265cb6/createpreset.png)

在设置完 **预设（Preset）** 后，你可以在跟踪通道列表标题中点击 **预设按钮（Preset Buttons）** ，快速启用某个预设。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71716678-b3a2-4ec7-8b45-551ed808390e/presettoggles.png)

默认情况下，系统预置了一个 **动画（Animation）** 过滤器，它会打开与项目中动画数据关系最大的跟踪通道。动画预设过滤器包含 **对象（Object）**、**动画（Animation）** 和 **帧（Frame）** 跟踪。你可以选择 **过滤器预设** 下拉菜单，点击 **动画** 来启用动画预设过滤器。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac5a738d-b9b9-47f4-b853-404e2455fa2f/animpreset.png)

有关跟踪数据调试和优化的更多信息，请参阅文档[Unreal Insights](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)。

[](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)

[![Unreal Insights](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3818740-1216-4fbb-bff6-249ed0ed43ef/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)

[Unreal Insights](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)

[使用Unreal Insights对你的项目进行解析。](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)

### 过滤跟踪来源

你可以使用跟踪源过滤（Trace Source filtering）来选择让哪些游戏对象输出跟踪数据。在调试或分析某个大型项目时，这可能会特别有用，因为某个关卡可能会有大量 **Actor** 和 **组件**。通过过滤跟踪来源，你可以选择只记录哪些Actor和组件的数据，组织你的输出信息，限制性能开销，并减少数据记录量以节省你的计算机磁盘空间。

打开 **跟踪源过滤** 窗口， 选择Animation Insights面板工具栏中的 **源过滤（Source Filter）**。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9f4de86-7b1c-494d-97a2-bcf13110206c/opensourcefilter.png)

### 类过滤器

在"跟踪来源过滤（Trace Source Filtering）"面板的 **类过滤器** （Class Filters）分段中，你可以基于项目中的 **蓝图类** 创建过滤器，从而只记录被过滤出的类的数据。要新建类过滤器，请在类过滤器分段中点击（**+**） **添加过滤器**。然后，选择你想记录哪些蓝图或游戏对象的数据。新建的过滤器现在会出现在类过滤器分段中。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/045d9836-6f14-47dd-8f6a-64b41a02ab66/createclassfilter.png)

创建完过滤器后，你还可以左键点击过滤器，选择 **包含派生类（Include derived classes）**，从而记录所有从基类游戏对象或蓝图类派生出的游戏对象的跟踪数据。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1af43231-e376-4e0d-8282-4586bb270918/includederivedclasses.png)

你也可以选择 **移除过滤器（Remove Filter）** 来删除过滤器。

### 用户过滤器

你还能创建自定义过滤器蓝图（filter blueprints）来记录跟踪数据。在 **用户过滤器** （User Filters）分段，选择（**+**）**添加过滤器**，并在项目文件中选择蓝图保存位置。为新蓝图起一个 **名字**，并选择 **保存**。这将创建一个新的蓝图，用来建立自定义的数据跟踪收集逻辑。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/780ea610-c67d-4733-ade2-db8e8cfa5942/createuserfilter.png)

创建自定义源过滤器蓝图后，在 **跟踪来源过滤器** 面板的 **用户过滤器** 分段，你可以 **右键点击** 过滤器，调出一个上下文菜单，定义过滤器如何用于记录跟踪数据。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af29bdcc-89da-48c5-ad9c-8345a4816371/filtercontextmenu.png)

下表列出了上下文菜单中的选项及其使用说明：

选项

说明

**打开过滤器蓝图（Open Filter Blueprint）**

打开 **蓝图编辑器** 中的自定义过滤器蓝图。

**已启用的过滤器（Filter Enabled）**

在筛选项目中的记录跟踪数据时，切换过滤器的功能。

**移除过滤器（）Remove Filter**

**删除** 当前从 **跟踪源过滤器** 面板上选择的自定义源过滤器。

**和（AND）**

将自定义过滤器设置为在任何其他 **用户过滤器** 的 **补充** 下运行。

**或（OR）**

将自定义过滤器设置为 **代替** 其他现有的 **用户过滤器** 运行。

**非（NOT）**

将过滤器设置为 **排除** 使用自定义过滤器跟踪的对象的跟踪记录。

### 世界过滤器

你可以使用 **世界过滤器（ World Filter）** 分段，在项目的不同关卡中设置跟踪背景。你让跟踪只在项目的 **PIE**（**Play in Editor**）模拟期间、实际游戏操作期间，或者编辑器环境中发生。你可以使用与 **世界类型过滤** （Filter By World Type）属性相邻的按钮来切换在不同背景下跟踪。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c323d7a-2803-4244-8ce1-f9926330e0ac/worldfilters.png)

你还可以让跟踪在多人游戏联网项目的网络操作中发生。借助 **世界网络模式过滤（Filter by World Net Mode）** 属性，你可以为项目的 **客户端**、**服务器** 和 **独立运行版本（Standalone）** 等不同状态来启用跟踪记录。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dadc0df5-9038-4de8-b948-33e75a082676/networldfilters.png)

关于虚幻引擎中的跟踪记录世界过滤器的更多信息，请查阅文件[通道过滤](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine#memoryinsightswindow)。

## 使用Animation Insights

Animation Insights扩展了之前的的 `showdebug` 动画功能，可以显示内部动画运行时数据。可视化和信息分析能力使用户能够定位并识别潜在的动画错误来源或性能问题。

默认情况下， `showdebug` 的动画功能很有限，因为 `showdebug` 动画系统只能向屏幕输出文本日志。借助Animation Insights，用户可以将包含异常动画行为的一段范围内的帧记录下来，然后在回顾日志数据时，同时回放记录下的这段动画或游戏内容。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/929e0183-2c3b-4cb4-8f8b-55248db81db8/showdebugdemo.gif)

在启用跟踪源过滤器数组后，你可以运行你的项目来记录动画数据随时间的变化。数据被编成"轨迹"（Tracks），在Animation Insights面板的时间线上水平分层。每个轨道显示一组独特的数据，只有在启用相应的跟踪源过滤器时才会出现。

你可以使用Animation Insights工具栏菜单中的"所有轨道（All Tracks）"按钮来单独设置各个轨道的可视性。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c9b6ca4-3437-45d6-9451-121446a3f22a/alltracks.png)

### 轨道检查

你可以使用Animation Insights图表，直观查看各轨道中的数据在某段时间内的变化。轨道也可以通过调整视察方式来显示数值型数据。每个轨道都包含不同的数据，因此每个轨道的视察方式都与该轨道所监控的数据类型有关。你可以右键点击每个轨道左侧的轨道标题，选择上下文菜单中的扩展选项，来扩展轨道中包含的数据。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfffe3bc-a421-4c80-acd4-22dbe9a628dd/contextmenutracks.gif)

当你选中某一个扩展选项后，如 **查看属性（View Properties）** 或 **查看此图表（View this Graph）**，会打开一个辅助面板，其中会包含轨道数据，显示内容与Animation Insights中时间线播放头（游标）的当前位置有关。

### 轨道种类

每个Animation Insights数据轨道都包含与之所包含的数据类型相关的背景数据，以及相关的数据扩展选项和属性。

下表列出了一些常见的Animation Insights轨道，并介绍了它们包含的数据：

轨道名称

说明

**通知（Notifies）**

**通知轨道** 显示被追踪角色的动画中包含的 **动画通知** 和 **同步标记** 的存在和状态。轨道的最上层显示每一帧的事件，如动画更新，通知事件，如音频队列和效果，以及同步标记。其他层显示活动的通知状态。你可以 **右击** 轨道，选择 **查看属性** （View Properties）来显示当前帧上激活的通知。

**曲线（Curves）**

**曲线轨道** 显示所有在当前帧中处于激活状态的动画曲线。你可以 **右击** 轨道，选择 **查看属性** 来查看在所选帧上激活的曲线值的扩展日志。

**姿势（Pose）**

**姿势轨道** 显示或隐藏所选帧的激活的actor姿势。你可以 **右键单击** 轨道，以启用所选帧期间的 **姿势** 或 **骨架** 的调试图。

**图表（Graph）**

**图表轨道** 显示追踪图表的更新时间，在相应的时间间隔内用竖条表示。你可以 **右击** 轨道，选择 **调试此图表** ，打开 **动画蓝图调试器** （Animation Blueprint debugger）面板，并将其连接到轨道上。在动画蓝图调试器打开的情况下，你可以擦除时间线，查看图表在相应时间点的数据更新。动画蓝图调试器（Animation Blueprint Debugger）面板包括姿势链接重量（pose link weight）、状态机状态（state machine state）、资产播放器位置（asset player position）和混合空间样本数据（blendspace sample data）。选择 **查看此图** ，可以看到动画图的示意图树状视图。

**蒙太奇（Montage）**

**蒙太奇轨道** 显示动画 **蒙太奇资产** 的信息，包括 **混合权重** 以及 **分段** 状态和过渡数据。

**混合权重（Blend Weights）**

**混合权重轨道** 显示在某一帧中活动的所有资产及其有效的混合权重。你可以 **右击** 轨道，转到该图在所选的帧上对应的动画蓝图中的节点。你还可以查看其他轨道数据，如回放时间或混合空间坐标。

### Animation Insights快捷键说明

下文列出了你在使用Animation Insights面板时可供使用的热键和快捷键，方便你观察动画调试数据。

输入快捷键

功能

**Ctrl** + **左键**

擦除图表标题栏中的**时间标尺（Time Ruler）**，以控制当前时间，允许在示意视图中评估数值，在视口中对姿势进行动画处理，以及随时间更新的更多内容。

**G**

切换 **图表** 的可见性。

**V**

自动隐藏当前视口中没有计时事件的所有轨道。

**I**

切换 **I/O** (**文件输入**) **概述** and **活动轨道** 的可见性。

**L**

切换 **资产加载轨道** 的可见性。

**Y**

切换 **GPU轨道** 的可见性。

**U**

切换**CPU线程** (以及所有CPU线程组) **轨道** 的可见性。

**R**

切换 *\*帧轨道* 的可见性。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用条件](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%9D%A1%E4%BB%B6)
-   [使用Animation Insights](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine#%E4%BD%BF%E7%94%A8animationinsights)
-   [跟踪数据过滤](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine#%E8%B7%9F%E8%B8%AA%E6%95%B0%E6%8D%AE%E8%BF%87%E6%BB%A4)
-   [过滤跟踪来源](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine#%E8%BF%87%E6%BB%A4%E8%B7%9F%E8%B8%AA%E6%9D%A5%E6%BA%90)
-   [类过滤器](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine#%E7%B1%BB%E8%BF%87%E6%BB%A4%E5%99%A8)
-   [用户过滤器](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine#%E7%94%A8%E6%88%B7%E8%BF%87%E6%BB%A4%E5%99%A8)
-   [世界过滤器](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine#%E4%B8%96%E7%95%8C%E8%BF%87%E6%BB%A4%E5%99%A8)
-   [使用Animation Insights](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine#%E4%BD%BF%E7%94%A8animationinsights-2)
-   [轨道检查](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine#%E8%BD%A8%E9%81%93%E6%A3%80%E6%9F%A5)
-   [轨道种类](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine#%E8%BD%A8%E9%81%93%E7%A7%8D%E7%B1%BB)
-   [Animation Insights快捷键说明](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine#animationinsights%E5%BF%AB%E6%8D%B7%E9%94%AE%E8%AF%B4%E6%98%8E)
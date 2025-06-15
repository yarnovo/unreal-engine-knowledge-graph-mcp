# 虚幻引擎中的动态分辨率 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:22:57.772Z

---

目录

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b44f13c-ad10-4d3a-b4e6-cc78f34267e9/dynamicres_fn1.png "DynamicRes_FN1.png")

**动态分辨率** 可根据先前画面的GPU工作负载调节主要屏幕百分比。分辨率是基于启发法（按需要）调节的，例如，如果在屏幕上有太多Object，或者有成本高昂的效果突然进入画面，GPU渲染时间将会延长，此时为了维持目标帧率就会降低屏幕分辨率。

## 启用动态分辨率

### 在运行时启用动态分辨率

动态分辨率可以通过在 **Game User Settings** 节点上获取一个布尔数值来启用。你可以在使用蓝图或C++时设置它。

在 **蓝图** 中，你可以使用 **Game User Settings** 节点选择此功能来启用动态分辨率，如下图：

![The Game User Settings node in Blueprint provides access to Dynamic Resolution settings.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b7c045e-62d5-4ea5-ba39-778cea0be368/dynamicresblueprint.png)

在 **C++** 中，你可以在 *UGameUserSettings* 设置如下布尔值：

```cpp
	GEngine->GetDynamicResolutionStatus()->SetEnabled(true);

```

将 *SetEnabled* 设置为 **false** 可将其禁用。

在实际启用或禁用动态分辨率时，游戏线程逻辑掌握最终程序控制权限，所以如果你是用蓝图在运行时启动它，这会优先于代码设置。要将游戏用户设置恢复到初始状态，请使用以下命令行：

```cpp
	GEngine->GameUserSettings->ApplyNonResolutionSettings();
```

### 使用运算模式控制动态分辨率

你可以使用 **运算模式（Operation Mode）** 设置如何在游戏中覆盖和使用动态分辨率，设置在游戏中覆盖它和使用它的方式。为了控制这种模式，在项目所对应平台（Xbox One、PlayStation 4等）的平台配置描述（或设备描述）中，你可以使用下列控制台命令：

```cpp
	r.DynamicRes.OperationMode

```

使用下列数值之一来设置运算模式如何针对项目的平台工作：

-   **1** 是根据游戏用户设置状态（在C++或蓝图中设置）启用动态分辨率。
-   **2** 是无论游戏用户设置状态如何都启用动态分辨率。

启用动态分辨率后，下列控制台变量会设置屏幕百分比的最大值和最小值，以及在降低分辨率之前任何给定帧的最大预算。如果你不设置，这些变量都有默认值：

控制台变量

默认值

描述

**r.DynamicRes.MinScreenPercentage**

50

设置要使用的最小屏幕百分比。

**r.DynamicRes.MaxScreenPercentage**

100

设置用于分配渲染目标的最大主要屏幕百分比。

**r.DynamicRes.FrameTimeBudget**

33.3

设置帧预算（以毫秒为单位）。

你可以使用Unreal Engine中的"设备描述（Device Profiles）"窗口设置和管理配置文件。可以通过"文件（File）"菜单选择 **编辑（Edit）> Developer Tools（开发者工具）> Device Profiles（设备描述）** 来访问此窗口。

### 暂停和恢复动态分辨率

有时你可能需要为项目启用动态分辨率，但你又不想对主大厅之类的区域启用。动态分辨率可以随运作模式暂停和恢复。下列控制台变量可用于设置动态分辨率的运算模式：

```cpp
	r.DynamicRes.OperationMode

```

数值

描述

**0**

禁用（默认）

**1**

根据GameUserSettings中使用的设置启用。

**2**

无论GameUserSettings中的设置如何都会启用。

下表概括了当启用或禁用特定运算模式时可用的不同状态，以及GameUserSettings所受的影响：

 

Game User Settings = False

 

Game User Settings = True

 

 

**暂停**

**不暂停**

**暂停**

**不暂停**

**OperationMode=0**

否

否

否

否

**OperationMode=1**

否

否

否

是

**OperationMode=2**

否

是

否

是

在 **C++** 中，你可以使用下列函数控制和检查动态分辨率的状态：

操作

C++函数

**暂停**

GEngine->PauseDynamicResolution();

**恢复**

GEngine->ResumeDynamicResolution();

**检查状态（禁用/启用或暂停）**

GEngine->GetDynamicResolutionStatus();

在蓝图中，此表中用于 **暂停** 和 **恢复** 的C++函数所提供的功能可以通过启用或禁用节点 **将动态分辨率设置为启用（Set Dynamic Resolution Enabled）** 来实现。要检查状态，请使用节点 **已启用动态分辨率（Is Dynamic Resolution Enabled）**。

## 统计动态分辨率的相关数据

你可以启用几个统计屏幕来调试与动态和分辨率有关的性能。可以使用反引号（**\`**） 键打开控制台，然后输入下列命令之一来启用它们：

-   **Stat Unit** 用于查看总体帧时间，以及游戏线程、渲染线程和GPU时间。
-   **Stat UnitGraph** 用于查看使用Stat Unit的数据制作的图。
-   **Stat Raw** 使用Stat UnitGraph输出未经过滤的数据。

### Stat Unit

调用 **Stat Unit** 时，你可以通过参考 **DynRes** 行来即时了解你的场景是否启用了动态分辨率。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f61bc35e-2d13-4bc5-b44c-099f8b2c5bc3/dynresoff.png "DynResOFF.png")

如果已启用，**DynRes** 标签将会显示 [主屏幕百分比](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine) 和 [次级屏幕百分比](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#secondaryspatialupscale) ：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f832f7f3-199f-4b4e-83f8-4d1bea3081c1/dynreson.png "DynResON.png")

此处显示X轴和Y轴的主要屏幕百分比，以免你忘记它是在两条轴上缩放的。GPU绘制的像素数实际上与 **屏幕百分比x屏幕百分比** 成正比。

例如1920x1080或1280x720。

### Stat UnitGraph和Stat Raw

如果调用 **Stat UnitGraph**，将会绘制一张图来显示动态分辨率功能选择的[主要屏幕百分比](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine)。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a31f0851-a46b-4551-a12e-fd1c9556a12b/statunitgraph.png "StatUnitGraph.png")

1.  时间（过滤后的时间或原始时间）
2.  目标帧时阈值
3.  动态分辨率最大屏幕百分比
4.  动态主要屏幕百分比曲线

UnitGraph可以显示动态分辨率功能选择的主要屏幕百分比。但是，该曲线也与GPU使用屏幕百分比x屏幕百分比绘制的像素数成正比。

此外，你可以使用 **Stat Raw** 在经过滤和未过滤数据之间切换，获取UnitGraph中未经过滤（原始）的时间。该图的时间标签将会发生变化，以表明其显示的是原始时间。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a342402c-11b3-4b5e-95e4-777852096248/rawtimings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a342402c-11b3-4b5e-95e4-777852096248/rawtimings.png)

原始时间

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32ae0d08-6f39-4a77-a815-728151e67f02/filteredtimings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32ae0d08-6f39-4a77-a815-728151e67f02/filteredtimings.png)

过滤后的时间

使用控制台窗口在过滤后和未过滤的时间之间切换。要切换 **Stat Raw**，必须先输入 **Stat UnitGraph**。

## 动态分辨率巡航

在虚幻引擎中，动态分辨率功能的实现与以前其他引擎中同类功能有所不同，因为我们允许分辨率根据需要在一个给定的范围内变化，而不是限制为单一的分辨率（1080p、900p、720p）。在这张示例图中，此模型演示了控制台变量所控制的对象。它演示了当一切都运行顺利、没有超过给定帧的预算时，动态分辨率是如何在给定范围（3）中自动调节的。可以把这个范围想象为飞机的巡航高度，飞机在这一高度范围可以自由机动，以实现到达目的地的理想速度。和飞机一样，分辨率也可以根据需要上下调节，从而在分辨率和充足的性能之间保持良好的平衡。

这个模型是用于演示的，没有考虑在给定场景中发生的所有情况。例如，它没有体现GPU不与CPU同步会是什么情况，甚至也没有体现启发法正确估算出分辨率应该变化多少的情况。它的目的是清晰地演示"理想"情况，从而展现动态分辨率控制态变量的运算方式。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/414d3726-7813-4afb-9d6a-e014d39b6e68/framegpugraph.png "FrameGPUGraph.png")

参考号

控制台变量

描述

**1**

r.DynamicRes.FrameTimeBudget

以毫秒（ms）计的帧时间预算。

**2**

r.DynamicRes.TargetedGPUHeadRoom

在超出预算前可供GPU增加的余量（按帧预算的百分比计）。这很可能要取决于发布平台或根据启用的渲染功能而定。例如，动态模糊需要另外留出成本余量用于摄像机的快速旋转运动。

**3**

r.DynamicRes.ChangePercentageThreshold

为了实际调整分配大小，在屏幕百分比中需要的最小变化。如果不想经常在非常相近的分辨率大小之间变换，可以利用此变量。如果它的数值过小，分辨率最终可能还是会经常改变，而如果它过大，可能会增加超出GPU预算的风险。

**4**

r.DynamicRes.MinResolutionChangePeriod

在允许进行任何分辨率更改之前，必须达到的最小帧数。此命令有多种用途。这包括提高启发法在给定主要屏幕百分比下排除测量噪点模拟GPU消耗的可靠性，避免可能在逐帧偏移抖动之间发生的[时序上采样](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#temporalanti-aliasingupsample)的输入样本偏移干扰，以及更改可能造成抗锯齿发散的分辨率。

如果你的瓶颈是在CPU而非GPU，还可以使用下列控制台变量调节用于动态分辨率的启发法历史记录和要使用的屏幕百分比：

控制台变量

描述

**r.DynamicRes.HistorySize**

启发法帧历史记录中的帧数。如果历史记录过短，可能包含过多噪点，影响可靠性；而如果历史记录过长，调节延迟可能会非常严重。

**r.DynamicRes.CPUBoundScreenPercentage**

当你遇到CPU瓶颈时应该瞄准的主要屏幕百分比。如果平台上的CPU和GPU共享相同的内存带宽，可以用它设置较低的屏幕百分比来降低分辨率。

### 超预算应急

如果你发现动态分辨率会非常迅速地超出预算，例如在镜头切换时或者成本高昂的视觉效果出现时，那就说明使用的启发法实际上无法预测这种情况何时会发生。在这类情况确实发生时，可以使用某种"应急"按钮快速降低分辨率，从而减少超出预算的帧数。如果启发法发现有N（一定数量）个连续帧的可用GPU时间超出预算，它将会立即调整分辨率来应对这些超预算时间。它还会自动执行历史记录重置，使得先前成本较低的帧时间不会影响启发法对成本较高的帧的判断。

请使用下列控制台命令来控制在启用"应急"开关降低分辨率之前可以出现的超GPU预算的连续帧数：

```cpp
	r.DynamicRes.MaxConsecutiveOverbudgetGPUFrameCount

```

在此图中，画面中突然发生跳跃，因此有两个以上的连续帧超过了设定的33.3毫秒的预算。系统激活了应急开关来快速降低分辨率，使得后续帧不再超出预算。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72bb425c-c2ab-4722-bbc7-1afaf569dbd6/overbudgetpanicgraph.png "OverBudgetPanicGraph.png")

1.  超出预算的最大连续GPU帧数。
2.  从检测到GPU导致分辨率变化为止未与渲染线程同步的帧延迟。
3.  发生紧急情况检测，引发帧率下降。
4.  一定数量的帧发生分辨率更改。

在下列截图（取自Epic Games Launcher的 **学习（Learn）** 选项卡中提供的Infiltrator演示）中，使用了 **Stat Raw** 命令明确标识当发生镜头切换或者屏幕上出现高成本的视觉效果时的场景行为：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e89b4a1f-ba24-428d-9ad9-553a62a4f9c5/overbudgetpanicexample.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e89b4a1f-ba24-428d-9ad9-553a62a4f9c5/overbudgetpanicexample.png)

单击查看大图。

1.  在镜头切换之后，画面的渲染成本显著提高，至少有若干帧是如此。
2.  动态分辨率有应急反应能力，可以快速降低分辨率进行补偿，然后再慢慢将分辨率提高到正常水平。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f39e91b1-768b-4436-af29-feef87704374/viewportspvalue.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f39e91b1-768b-4436-af29-feef87704374/viewportspvalue.png)

单击查看大图。

1.  发生了渲染成本较高的视觉效果，导致相当数量的帧超出分配的帧预算。
2.  动态分辨率迅速作出反应，降低了分辨率，然后又缓慢将分辨率提高到正常水平。

## 测试使用不同的主要屏幕百分比的内容

如果你的项目启用了动态分辨率，你需要对它进行测试，确保在使用降低的主要屏幕百分比时图像与预期差异不大。在分辨率降低时，有些细节可能会丢失，你的资源可能不会保持你所希望的外观。正因如此，所有的编辑器视口都可以使用滑块设置屏幕百分比以便测试。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40e19e33-eba0-46f8-a918-fa843cbb2647/screenpercentageviewportslider.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40e19e33-eba0-46f8-a918-fa843cbb2647/screenpercentageviewportslider.png)

单击查看大图。

使用滑块对视口应用更高或更低的屏幕百分比，然后相应检查关卡内容。特别是美工，应该使用该滑块在将用于项目的高低范围屏幕百分比下检查他们的内容。

![编辑器屏幕百分比：| 100（默认）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84b5bc63-386b-41fe-84fd-ab72fbd506f0/screenpercentage100.jpg)

![编辑器屏幕百分比：| 50](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87e21eb1-f393-4f29-86a5-2acc7e0677aa/screenpercentage50.jpg)

编辑器屏幕百分比：| 100（默认）

编辑器屏幕百分比：| 50

在调节屏幕百分比滑块时，视口（右下）将显示所有高于100的屏幕百分比值。这样设计的目的是提醒用户视口屏幕百分比值已经更改为非默认值，因为使用了高于正常水平的分辨率，可能导致性能问题。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/038681b3-92e7-4a1a-ab85-da6f94cf10fc/editor_screenpercentageindicator.png "Editor_ScreenPercentageIndicator.png")

高于默认值的屏幕百分比值可能造成编辑器的响应迟缓或性能下降。如果发生这种情况，可尝试将该数值设置为默认值100。

## 支持动态分辨率的平台

支持以下平台

-   微软的Xbox One、Xbox Series S和Xbox Series X
-   PlayStation 4 和 PlayStation 5 （不包括PSVR）
-   Nintendo Switch

未来引擎版本将逐渐支持其他平台。

针对不在此白名单中的平台启用动态分辨率支持是很危险的，可能造成意外后果。这类后果包括GPU时间错误，这可能使分辨率不必要地下降，或者分辨率提高过多，发生丢帧。这最终可能毁掉Gameplay体验。默认情况下，引擎不允许你在此白名单中的平台上使用动态分辨率。

## 在C++中替换动态分辨率启发法

引擎提供的渲染线程启发法完整地自包含在 **DynamicResolution.cpp** 中。它的架构设置使你可以在游戏代码中用插件将启发法完全替换掉。

例如，如果你希望Gameplay代码提示后续帧将发生的情况，因而需要在项目中替换掉默认启发法，可以重写整套启发法来达成这一目的。通过实现`IDynamicResolutionState`和`ISceneViewFamilyScreenPercentage`，你可以替换默认的动态分辨率状态，如下例所示：

```cpp
	GEngine->ChangeDynamicResolutionStateNextFrame(new FMyGameSpecificDynamicResolutionState());

```

此时渲染器将使用 **ResolutionFraction** 来避免在屏幕百分比计算中每次都除以100。它的名称是 **fraction（分数）** 而不是"scale（比例）"，这是因为放大比例的操作是由TAA放大取样完成的，或者空间放大比例实际是由1除以分辨率分数来表示的，就像这样：

```cpp
	分辨率分数 = 屏幕百分比/100 = 1/放大系数
```

## 动态分辨率的局限性

以下是动态分辨率在当前的一些局限性：

-   它的设计不支持配合多场景的"在编辑器中运行"功能使用。
-   如果启用了TAAU，它将会与VR一起工作。多重取样抗锯齿（MSAA）支持将在今后的发行版中提供。
-   API与移动渲染器完全兼容。但是，我们还没有采取措施使视图大小保持不等于主要屏幕百分比上限所设置的渲染目标缓冲区大小。
-   高斯景深（DoF）和[距离场环境光遮蔽](/documentation/zh-cn/unreal-engine/distance-field-ambient-occlusion-in-unreal-engine)（DFAO）在分辨率更改时会有问题。

## 常见问题及解答

下面是关于动态分辨率的一些常见问题：

**可以替换用于动态分辨率的启发法吗？**

可以，它采用了模块化设计，可以在C++中插入。虚幻引擎不仅保有一种启发法，而且它的架构允许创建独立的自定义启发法，后者可具备能够由Gameplay代码或Sequencer触发的自定义游戏线程事件。

**动态分辨率可以使用任意的次要屏幕百分比吗？**

是的。可以使用控制台变量 **r.SecondaryScreenPercentage.GameViewport.** 来实现这一点

有关更多信息，请参见[屏幕百分比与时序上采样](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine)页面。

**可以控制次要屏幕百分比的动态分辨率吗？**

这是不可能的，它的设计就是这样。你不会希望更改时空抗锯齿历史记录的大小，这就是为什么你不需要动态地更改次要屏幕百分比。

**为什么动态分辨率忽略了FPostProcessSettings中用于ScreenPercentage的函数？**

这是先前的机制的一部分，在这种机制下，可以在设置中将后期处理体积的屏幕百分比配置为手动调高或调低。如果使用动态分辨率，就再也不需要设置了，因为它会根据GPU工作负载自动处理。

**为什么在编辑器中动态分辨率没有可选的显示标志？**

因为它是全局发生的，由游戏线程来判断。屏幕百分比显示标志只会切换[主要屏幕百分比](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#primaryscreenpercentage)的显示。

**为什么在编辑器视口中不支持动态分辨率？**

当前仅对Xbox One、PlayStation 4和Nintendo Switch支持动态分辨率，它们不使用PIE。等到它在平台上提供的时候（Vulkan，D3D12），你就可以在编辑器中将它与PIE配合使用了。

**可以在材质中访问主要和次要屏幕百分比吗？**

不可以。材质的渲染应该独立于分辨率。

-   [performance](https://dev.epicgames.com/community/search?query=performance)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用动态分辨率](/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine#%E5%90%AF%E7%94%A8%E5%8A%A8%E6%80%81%E5%88%86%E8%BE%A8%E7%8E%87)
-   [在运行时启用动态分辨率](/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine#%E5%9C%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E5%90%AF%E7%94%A8%E5%8A%A8%E6%80%81%E5%88%86%E8%BE%A8%E7%8E%87)
-   [使用运算模式控制动态分辨率](/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%BF%90%E7%AE%97%E6%A8%A1%E5%BC%8F%E6%8E%A7%E5%88%B6%E5%8A%A8%E6%80%81%E5%88%86%E8%BE%A8%E7%8E%87)
-   [暂停和恢复动态分辨率](/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine#%E6%9A%82%E5%81%9C%E5%92%8C%E6%81%A2%E5%A4%8D%E5%8A%A8%E6%80%81%E5%88%86%E8%BE%A8%E7%8E%87)
-   [统计动态分辨率的相关数据](/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine#%E7%BB%9F%E8%AE%A1%E5%8A%A8%E6%80%81%E5%88%86%E8%BE%A8%E7%8E%87%E7%9A%84%E7%9B%B8%E5%85%B3%E6%95%B0%E6%8D%AE)
-   [Stat Unit](/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine#statunit)
-   [Stat UnitGraph和Stat Raw](/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine#statunitgraph%E5%92%8Cstatraw)
-   [动态分辨率巡航](/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine#%E5%8A%A8%E6%80%81%E5%88%86%E8%BE%A8%E7%8E%87%E5%B7%A1%E8%88%AA)
-   [超预算应急](/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine#%E8%B6%85%E9%A2%84%E7%AE%97%E5%BA%94%E6%80%A5)
-   [测试使用不同的主要屏幕百分比的内容](/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine#%E6%B5%8B%E8%AF%95%E4%BD%BF%E7%94%A8%E4%B8%8D%E5%90%8C%E7%9A%84%E4%B8%BB%E8%A6%81%E5%B1%8F%E5%B9%95%E7%99%BE%E5%88%86%E6%AF%94%E7%9A%84%E5%86%85%E5%AE%B9)
-   [支持动态分辨率的平台](/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine#%E6%94%AF%E6%8C%81%E5%8A%A8%E6%80%81%E5%88%86%E8%BE%A8%E7%8E%87%E7%9A%84%E5%B9%B3%E5%8F%B0)
-   [在C++中替换动态分辨率启发法](/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine#%E5%9C%A8c++%E4%B8%AD%E6%9B%BF%E6%8D%A2%E5%8A%A8%E6%80%81%E5%88%86%E8%BE%A8%E7%8E%87%E5%90%AF%E5%8F%91%E6%B3%95)
-   [动态分辨率的局限性](/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine#%E5%8A%A8%E6%80%81%E5%88%86%E8%BE%A8%E7%8E%87%E7%9A%84%E5%B1%80%E9%99%90%E6%80%A7)
-   [常见问题及解答](/documentation/zh-cn/unreal-engine/dynamic-resolution-in-unreal-engine#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E5%8F%8A%E8%A7%A3%E7%AD%94)
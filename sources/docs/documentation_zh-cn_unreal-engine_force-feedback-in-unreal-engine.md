# 虚幻引擎中的力反馈 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/force-feedback-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:46:21.660Z

---

目录

![力反馈](https://dev.epicgames.com/community/api/documentation/image/649fccd3-6a8b-46f2-a7ac-05a09075123a?resizing_type=fill&width=1920&height=335)

力反馈是游戏中常用的设备的振动，可将游戏中发生的力传达给玩家。此功能称为游戏手柄或控制器的"隆隆声"或控制器振动。例如，你可以使用力反馈模拟游戏中发生爆炸时的冲击波。这可为玩家的沉浸式体验带来额外的维度。

iOS和Android等许多常见平台以及主机的输入控制器都支持力反馈。

对特定反馈功能的支持情况取决于平台。请参阅你的平台开发文档，了解完整细节。

## 力反馈效果剖析

**力反馈效果（Force Feedback Effect）** 资产包含用于定义特定力反馈效果的属性。设计师可以利用这些属性根据许多不同的情况自定义力反馈。

![力反馈细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb4f417f-bf46-45b3-b8b3-33c3509f2f95/feedbackanatomy.png)

### 通道细节

力反馈效果可以有多个通道。每个 **通道** 可以播放不同的效果。例如，一个通道可以在控制器右侧播放较大、较长的振动，而第二个通道可以在左侧播放较小、较短的爆发。

每个通道都有以下属性，用于控制通道效果的播放方式：

通道名称

说明

**影响左侧大（Affects Left Large）**

如果为true，将使用左侧大电机播放效果。

**影响左侧小（Affects Left Small）**

如果为true，将使用左侧小电机播放效果。

**影响右侧大（Affects Right Large）**

如果为true，将使用右侧大电机播放效果。

**影响右侧小（Affects Right Small）**

如果为true，将使用右侧小电机播放效果。

**曲线（Curve）**

控制效果随时间变化的强度。这定义了振动的模式。值高于0.0会导致振动，值低于0.0不会导致振动。

#### 力反馈曲线

每个通道的效果模式由一条曲线控制。要从内部曲线编辑器向曲线添加关键帧，你可以

-   右键点击并选择"添加关键帧"。
-   双击曲线的图表打开内部曲线编辑器。

![内部曲线编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8337fd70-0df2-4593-9c50-6e4ba40cc193/curveeditor.png)

如需了解曲线、关键帧以及如何创建外部曲线资产和使用曲线编辑器，请参阅[曲线编辑器](/documentation/zh-cn/unreal-engine/animation-curve-editor-in-unreal-engine)和[关键帧和曲线](/documentation/zh-cn/unreal-engine/keys-and-curves-in-unreal-engine)页面。

### 按设备覆盖

在虚幻引擎中使用力反馈资产时，每个平台对其振动电机或反馈系统功能都有不同的实现方案。力反馈资产使用 **按设备覆盖（Per Device Overrides）** 支持多个平台。

按设备覆盖是一个抽象层，可用于为每个平台设置不同的反馈设置。例如，你可以将强烈的振动应用于Xbox控制器，而将更细腻的振动应用于PlayStation控制器。

要修改这些设置，请点击你的力反馈效果，然后找到 **细节（Details）** > **按设备覆盖（Per Device Overrides）** 。

![按设备覆盖](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c156dac-b54a-4a8b-8c62-10fe3de12ff8/perdeviceoverrides.png)

### 设备属性

**设备属性（Device Properties）** 表示输入设备的不同物理属性，例如其光源颜色显示或触觉扳机阻力。

设备属性类型

说明

**基于音频的振动（Audio Based Vibration）**

向输入设备的扬声器播放声音。在支持它的平台上，此声音会以振动的形式播放，其左右音频声道分别表示控制器的左侧和右侧。

此功能为试验性功能，并且仅适用于PS5 DualSense控制器。要使用此功能，你需要将以下内容添加到你的配置。

```cpp
	[SonyController]
	VibrationMode=Advanced
```

**设备颜色（曲线）（Device Color (Curve)）**

使用曲线更改输入设备的光源随时间变化的颜色。

此属性有特定于平台的实现方案，可能在每个平台中的表现有所不同。

**设备颜色（静态）（Device Color (Static)）**

将输入设备的颜色设置为静态颜色。这不会在属性完成求值后重置设备颜色。你可以将其视为一次性效果，一旦启用，设备属性颜色就会固定。

此属性有特定于平台的实现方案，可能在每个平台中的表现有所不同。

**扳机反馈（Trigger Feedback）**

设置简单扳机反馈。

此属性有特定于平台的实现方案，可能在每个平台中的表现有所不同。

**扳机阻力（Trigger Resistance）**

在按下扳机时为其提供开始值和结束值之间的线性阻力。

此属性有特定于平台的实现方案，可能在每个平台中的表现有所不同。

**扳机振动（Trigger Vibration）**

设置扳机振动。

此属性有特定于平台的实现方案，可能在每个平台中的表现有所不同。

请参阅[设备属性](/documentation/zh-cn/unreal-engine/device-properties-in-unreal-engine)，获取更多文档。

### 时长

力反馈效果的时长基于所有通道的曲线中最后一个关键帧的位置自动计算。例如，如果有3个通道，每个通道中的最后一个关键帧分别设置为值 `1.25` 、 `1.5` 和 `1.75` ，则总体效果的时长是 `1.75`

## 创建力反馈效果资产

力反馈效果资产是使用 **内容浏览器（Content Browser）** 创建的：

1.  在 **内容浏览器（Content Browser）** 中，点击 **添加（Add）** 并选择 **输入（Input）> 力反馈效果（Force Feedback Effect）** 。打开你刚才创建的资产。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8746948-094d-445f-b9c3-4dd3067d6574/createforcefeedbackeffect.png)
2.  默认情况下，资产有一个通道，但你可以添加通道。对于每个通道，选择你希望该通道影响的四个输出的组合。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/deca39a5-7f04-489c-a453-203520e87879/ffchannels.png)
3.  按住 **Shift** 键并在曲线上点击 **鼠标左键** 可添加一个或多个关键帧。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf0a0ee2-b60c-4800-95af-11478c6046c3/curve.png)
4.  在曲线编辑器中直接输入值或进行拖动来操控关键帧。
    
    要调整关键帧之间的曲线，请右键点击曲线片段以更改其曲线功能，然后调整切线。
    

## 播放力反馈

### 在编辑器中预览

你可以将鼠标悬停在力反馈效果的图标上，然后点击中间显示的"播放（play）"按钮，在编辑器中预览力反馈效果。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32c518de-a860-41f3-8318-7be0f8bfde40/previewforcefeedbackeffect.png)

### 直接到玩家

力反馈在 `PlayerController` 基类中实现。你需要访问本地玩家控制器，才能在目标设备或控制器上播放力反馈。

### 在蓝图中播放力反馈

1.  使用 **Get Player Controller** 节点或保存的引用来获取对玩家控制器的引用。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7f9e749-8f06-4314-87b9-1b535eae75de/effect_controller.png)
2.  拖移引用的输出引脚，然后在上下文菜单中输入 `Play Force Feedback` 并选择 **Client Play Force Feedback** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06286226-e530-4458-8883-e702219867c7/effect_play.png)
    
    如果在服务器上调用，力反馈将复制到所属客户端。
    
3.  指定要直接在节点上使用的力反馈效果，或使用连接的变量指定。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4661b59-8441-4020-bf14-88dcf5ed3621/effect_select.png)
4.  如果你希望效果循环，请选中 **循环（Looping）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f79fffa-2024-4b3a-86fa-391a83b69017/effect_looping.png)
5.  （可选）在"标签（Tag）"字段中设置效果的唯一名称。此功能允许你停止效果；如果同名效果已经在播放，它会停止，而改为播放新效果。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a6bfd71-7d07-4662-8c82-1b3526b669d8/effect_tag.png)

### 在C++中播放力反馈

你可以在本地玩家控制器上调用[`ClientPlayForceFeedback`](/documentation/en-us/unreal-engine/API/Runtime/Engine/GameFramework/APlayerController/ClientPlayForceFeedback)。

```cpp
	void ClientPlayForceFeedback
	(
		class UForceFeedbackEffect * ForceFeedbackEffect,
		FForceFeedbackParameters Params
	)
```

然后，你可以使用力反馈效果，指定效果是否应该循环，并（可选）选择效果的名称。 如果提供了名称，并且在原始效果结束之前播放同名的另一个力反馈效果，则原始效果会立即停止，改为播放新效果。

#### 在世界位置

你可以将[力反馈组件](/documentation/en-us/unreal-engine/API/Runtime/Engine/Components/UForceFeedbackComponent)放置在所需源效果的世界位置中。这会播放力反馈效果，它基于与观察它的玩家的距离改变强度。

力反馈组件会在命令时播放力反馈效果，但在世界中还有物理位置。就像声音或光源一样，玩家体验到的力的强度会根据数据定义的衰减设置，随着玩家与源的距离而改变。

力反馈组件可以从源代码或蓝图附加到任意Actor，也可以在Gameplay期间动态添加。你还可以使用以下工具函数：

-   `UGameplayStatics::SpawnForceFeedbackAtLocation` ： 在给定世界位置生成
-   `UGameplayStatics::SpawnForceFeedbackAttached` ： 附加到特定已有组件

这些函数会返回生成的力反馈组件，以便你可以继续操控它。但是，如果组件在完成效果播放后没有用处，请在效果结束时使用"音频销毁（Auto Destroy）"布尔选项删除该组件。

-   [gameplay](https://dev.epicgames.com/community/search?query=gameplay)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [力反馈效果剖析](/documentation/zh-cn/unreal-engine/force-feedback-in-unreal-engine#%E5%8A%9B%E5%8F%8D%E9%A6%88%E6%95%88%E6%9E%9C%E5%89%96%E6%9E%90)
-   [通道细节](/documentation/zh-cn/unreal-engine/force-feedback-in-unreal-engine#%E9%80%9A%E9%81%93%E7%BB%86%E8%8A%82)
-   [力反馈曲线](/documentation/zh-cn/unreal-engine/force-feedback-in-unreal-engine#%E5%8A%9B%E5%8F%8D%E9%A6%88%E6%9B%B2%E7%BA%BF)
-   [按设备覆盖](/documentation/zh-cn/unreal-engine/force-feedback-in-unreal-engine#%E6%8C%89%E8%AE%BE%E5%A4%87%E8%A6%86%E7%9B%96)
-   [设备属性](/documentation/zh-cn/unreal-engine/force-feedback-in-unreal-engine#%E8%AE%BE%E5%A4%87%E5%B1%9E%E6%80%A7)
-   [时长](/documentation/zh-cn/unreal-engine/force-feedback-in-unreal-engine#%E6%97%B6%E9%95%BF)
-   [创建力反馈效果资产](/documentation/zh-cn/unreal-engine/force-feedback-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%8A%9B%E5%8F%8D%E9%A6%88%E6%95%88%E6%9E%9C%E8%B5%84%E4%BA%A7)
-   [播放力反馈](/documentation/zh-cn/unreal-engine/force-feedback-in-unreal-engine#%E6%92%AD%E6%94%BE%E5%8A%9B%E5%8F%8D%E9%A6%88)
-   [在编辑器中预览](/documentation/zh-cn/unreal-engine/force-feedback-in-unreal-engine#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E9%A2%84%E8%A7%88)
-   [直接到玩家](/documentation/zh-cn/unreal-engine/force-feedback-in-unreal-engine#%E7%9B%B4%E6%8E%A5%E5%88%B0%E7%8E%A9%E5%AE%B6)
-   [在蓝图中播放力反馈](/documentation/zh-cn/unreal-engine/force-feedback-in-unreal-engine#%E5%9C%A8%E8%93%9D%E5%9B%BE%E4%B8%AD%E6%92%AD%E6%94%BE%E5%8A%9B%E5%8F%8D%E9%A6%88)
-   [在C++中播放力反馈](/documentation/zh-cn/unreal-engine/force-feedback-in-unreal-engine#%E5%9C%A8c++%E4%B8%AD%E6%92%AD%E6%94%BE%E5%8A%9B%E5%8F%8D%E9%A6%88)
-   [在世界位置](/documentation/zh-cn/unreal-engine/force-feedback-in-unreal-engine#%E5%9C%A8%E4%B8%96%E7%95%8C%E4%BD%8D%E7%BD%AE)

相关文档

[

工具和编辑器

![工具和编辑器](https://dev.epicgames.com/community/api/documentation/image/11c1b49f-f7d8-44f3-b101-d0bb5a2d4a45?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/tools-and-editors-in-unreal-engine)
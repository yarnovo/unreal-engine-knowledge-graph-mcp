# 虚幻引擎中可自定义的Sequencer轨道 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/customizable-sequencer-track-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:12:11.556Z

---

目录

![可自定义的Sequencer轨道](https://dev.epicgames.com/community/api/documentation/image/33f95bb3-a746-4984-ad00-db41c7929da7?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

通过使用蓝图和子类，你可以创建自定义类型的Sequencer轨道。这样，无需C++代码你就能扩展Sequencer轨道的功能。这在设计或实现项目新轨道时非常有用。

该文档介绍了自定义Sequencer轨道功能、如何创建新的轨道类型，以及用来与普通Sequencer对象通信的函数。

#### 先决条件

-   可自定义Sequencer轨道功能是一种[插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)，使用前必须先启用。在虚幻引擎的主菜单中，前往 **编辑（Edit） > 插件（Plugins）**，在**运行时（Runtime）** 部分找到 **可自定义Sequencer轨道（Customizable Sequencer Tracks）**，之后点击复选框来将其启用，然后重启虚幻引擎。
    
    ![可自定义Sequencer轨道插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18b9ca60-8e69-4942-9cd5-4cf871d5bfac/plugin.png)
    
-   你应该熟悉如何创建并使用[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)。

## 创建新轨道

新建自定义Sequencer轨道需要先创建继承自以下蓝图的三个不同蓝图类：

-   `SequencerSectionBP`
-   `SequencerTrackBP`
-   `SequencerTrackInstanceBP`

要完成这步，在 **内容浏览器（Content Browser）** 中，点击 **添加 (+) > 蓝图类（Blueprint Class）**，然后在 **所有类（All Classes）** 部分中找到这三个类。每个都创建一个新的子级蓝图类。

![创建轨道类](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5cee406b-722d-4b3e-b09c-ac12aa1024d8/create1.png)

接下来，你需要将不同的类进行关联来让它们互相沟通。要完成这步，打开继承自 `SequencerTrackBP` 的新蓝图，并在 **细节（Details）** 面板的 **类默认（Class Defaults）** 部分设置以下属性：

-   将 **默认分区类型（Default Section Type）** 设为继承自 `SequencerSectionBP` 的新蓝图。
-   将 **轨道实例类型（Track Instance Type）** 设为继承自 `SequencerTrackInstanceBP` 的新蓝图。

![设置轨道属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9df0398-2f3b-4226-86f2-dfcaae182f0e/create2.png)

编译并保存蓝图后，现在可以从Sequencer的主 **添加轨道（Add Track） (+)** 菜单添加一个主要轨道。

![将自定义轨道添加至Sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b58f3da9-9036-4c04-acbc-242d48946879/create3.png)

## 创建轨道逻辑

虽然现在你可以在Sequencer中创建你的新轨道，但是其分区中不包含逻辑，所以在创建轨道时什么都不会发生。要开始为你的轨道创建逻辑，打开继承自 `SequencerTrackInstanceBP` 的蓝图。在其函数部分中，你可以覆盖事件来将其添加到事件图表，从中可以创建蓝图逻辑。

![覆盖函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/285692da-2e07-46ad-8c17-9304a33dab74/logic1.png)

### 分区事件

以下分区事件可以在 `SequencerTrackInstanceBP` 的事件图表中覆盖。

名称

图片

描述

**OnBeginUpdateInputs**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5bd0ac41-0020-4f92-8b2e-af7cc10a9f2d/event1.png)

该事件在分区将要开始或结束时执行。它首先执行，但是在 **OnInitialize** 之后。

**OnEndUpdateInputs**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee33023d-8d16-422c-85b6-630ebfd7d5c2/event2.png)

该事件在分区完成开始或结束时执行。它在 **OnBeginUpdateInputs** 和 **OnInputAdded/Removed**之后执行。

**OnDestroyed**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/881385b9-8135-48fd-8b76-a67eeb287480/event3.png)

该事件在分区结束并且没有其它分区在播放的时候执行。它最后执行。

**OnInitialize**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b75a34f-fcc6-4d84-97af-abd92a364cda/event4.png)

该事件在分区开始并且没有其它分区在播放的时候执行。它最先执行。

**OnInputAdded**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2fd7169e-cf38-43e5-8850-29c498460860/event5.png)

该事件在分区开始的时候执行。它在 **OnBeginUpdateInputs** 之后执行。

**OnInputRemoved**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f368ac02-d9c0-4a90-bb2e-23a9bd0dd90c/event6.png)

该事件在分区结束的时候执行。它在 **OnBeginUpdateInputs** 之后执行。

**OnUpdate**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8290104-fdb4-4b34-87b5-9482805aa8bd/event7.png)

该事件每帧持续执行，只要任意一个分区处于激活状态。最开始激活一个分区的时候，它在 **OnEndUpdateInputs** 之后执行。

举个例子，下图展示了有多个分区的情况下所有单个事件的整体执行顺序：

![执行顺序](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a6df477-54dd-404c-908f-0f172494b0f4/event8.png)

自定义Sequencer轨道只使用[分区](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine#sections)，不使用关键帧。

### 分区函数

在 `SequencerTrackInstanceBP` 子蓝图中构建逻辑时，你可以使用以下函数来获取分区或者其对象的信息：

名称

图片

描述

Get Animated Object

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d134225-5a10-438a-923c-30b16e27f801/function1.png)

如果[轨道类型](/documentation/zh-cn/unreal-engine/customizable-sequencer-track-in-unreal-engine#sequencertrackbp) 设为 **对象轨道（Object Track）**，获取该轨道父级的对象或者Actor。该函数应该与一个 **Cast** 函数配对来获取一个可用的返回对象的蓝图引用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6eea26f2-bab4-4cb2-a361-ea22370f7493/function5.png)

Get Input

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fca6325d-4412-4724-87b1-0110f84d67fc/function2.png)

根据序数获取当前正在播放的分区（如果有多个分区正在播放）。默认的返回引脚是一个结构体，必须打破才能访问实际的分区对象。你可以使用 **Break SequencerTrackInstanceInput**，或者通过右键点击引脚并选择 **分离结构体引脚（Split Struct Pin）**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/691b8d75-5c07-4a86-973e-495c1e30ea31/function6.png)

Get Inputs

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3de3cc2-b66b-44ea-8e13-ebb8f21af4b8/function3.png)

返回一个数组，包含当前播放的分区。

Get Num Inputs

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/975ea78f-911c-4e12-9092-9bef5270e8c3/function4.png)

获取当前播放的分区的数量。

## 类的概览

这一小节介绍三个组成自定义轨道的蓝图类以及其属性。

### SequencerSectionBP

SequencerSectionBP 是一个临时类，在运行时构建。你也可以用它来设置默认的分区属性，可以在Sequencer中覆盖到分区属性。要访问并修改这些属性，前往 **细节（Details）** 面板的 **类默认（Class Defaults）** 部分。

![sequencer分区类属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afd80ca2-1918-48b7-87f6-68d44fce2262/classes1.png)

名称

描述

**Timecode Source**

分区使用的默认时间码信息，如果使用了时间码的话。你还可以指定差值帧来控制偏离信息。

**Is Active**

设置分区是否默认[激活](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine#mute)。

**Is Locked**

设置分区是否默认[锁定](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine#lock)。

**Pre / Post Roll Frames**

指定默认应用到分区起始和结束部分的额外空间，可以将分区的第一帧和最后一帧保持指定的时间。

### SequencerTrackBP

该类用于为轨道设置通用的属性和规则，比如名称、类型和支持的分区。要访问并改变这些属性，前往 **细节（Details）** 面板的 **类默认（Class Defaults）** 部分。

![sequencer track properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dfe5c542-7728-43db-8a9d-1e3e91075278/classes2.png)

名称

描述

**支持多行（Supports Multiple Rows）**

启用后，会允许轨道包括多个子轨道（行）。这样可以使用该轨道将数据堆层。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f248e5d-6baa-4d0b-a568-a5a01a027b29/classes3.png)

**支持混合（Supports Blending）**

启用后，会允许分区之间互相混合。

**轨道类型（Track Type）**

设置在什么情况下该轨道可以添加到并存续于Sequencer。可以选择：

-   **主要轨道（Master Track）**，会将轨道添加至Sequencer的主要添加轨道（+）菜单。这会将轨道变为顶部等级的Sequencer轨道。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0a15290-f61d-44dd-9399-b8882c63f0e9/classes4.png)
    
-   **对象轨道（Object Track）**，会将轨道添加至另一个轨道的添加（+）菜单。父级轨道取决于 **支持的对象类型（Supported Object Type）** 中定义的对象类。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ceea7c4a-1ad2-44ae-b2dd-b121490f12f8/classes5.png)
    

**支持的对象类型（Supported Object Type）**

如果 **轨道类型（Track Type）** 设为 **对象轨道（Object Track）**，该属性可以指定该轨道可以添加至哪个类型的对象之下。

**默认分区类型（Default Section Type）**

指定作为必须的轨道设置中，继承的基础 `SequencerSectionBP` 类。

**支持的分区（Supported Sections）**

一个数组，可以向其中添加额外的 `SequencerSectionBP` 类来从轨道的 **添加分区（Add Section）（+）** 菜单进行添加。你可以使用各种 **Get Input** 函数创建逻辑来区分这些分区。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef179229-f376-4c1d-8d5d-13fa1585fd4d/classes6.png)

**轨道实例类型（Track Instance Type）**

指定作为必须的轨道设置中，继承的基础 `SequencerTrackInstanceBP` 类。

**图标（Icon）**

显示预览轨道的图标。展开该属性会i西安市以下图标属性：

-   **图片（Image）**：使用作图标的纹理或材质。
-   **图片尺寸（Image Size）**：图片的大小和X/Y尺寸。
-   **着色（Tint）**：图片的颜色。启用 **继承（Inherit）** 后会禁用着色并使用父级控件颜色。
-   **绘制为（Draw As）**：可以选择绘制图标的不同方式：**箱型（Box）**、 **边框（Border）**、 **图片（Image）**、 或者 **圆角箱型（Rounded Box）**。
-   **平铺（Tiling）**：启用以 **水平（horizontal）**、 **垂直（vertical）**、 或者 **两者都（both）** 将图片平铺。
-   **预览（Preview）**：用于预览图标最终样式和尺寸的区域。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3546ec86-0b39-427b-a991-eb99341c9231/classes7.png)

**显示名称（Display Name）**

轨道的默认名称。可以通过普通的轨道重命名操作来覆盖。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb4adefc-a5a6-4fe9-bf68-28b406d9dabe/classes8.png)

**轨道行显示名称（Track Row Display Names）**

一个数字，启用 **支持多行（Supports Multiple Rows）** 后可以指定行名称。如果添加了多于一个数组元素，那么添加分区行会直接添加所有命名的行。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/658fc621-7207-4de7-a72a-5a618fc8ddcf/classes9.png)

**颜色（Color）**

为轨道及其分区设置默认颜色。确保颜色的alpha值不为0，否则颜色会变透明并显示为默认的灰色。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6dcd878e-dfd0-4b77-ac12-b9d4c7072b95/classes10.png)

**显示垂直帧（Show Vertical Frames）**

启用后，会导致时间轴中分区起始和结束位置显示垂直的分割线。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f53ac6a-8035-41ad-a2d3-f35794c6db45/classes11.png)

### SequencerTrackInstanceBP

该类通过[覆盖事件](/documentation/zh-cn/unreal-engine/customizable-sequencer-track-in-unreal-engine#sectionevents) 和 [创建函数](/documentation/zh-cn/unreal-engine/customizable-sequencer-track-in-unreal-engine#sectionfunctions)在 **事件图表（Event Graph）** 中为轨道创建主要逻辑和行为。

![轨道实例类](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/144a257a-c760-41ae-8731-b122611e0269/classes12.png)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/customizable-sequencer-track-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [创建新轨道](/documentation/zh-cn/unreal-engine/customizable-sequencer-track-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%96%B0%E8%BD%A8%E9%81%93)
-   [创建轨道逻辑](/documentation/zh-cn/unreal-engine/customizable-sequencer-track-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%BD%A8%E9%81%93%E9%80%BB%E8%BE%91)
-   [分区事件](/documentation/zh-cn/unreal-engine/customizable-sequencer-track-in-unreal-engine#%E5%88%86%E5%8C%BA%E4%BA%8B%E4%BB%B6)
-   [分区函数](/documentation/zh-cn/unreal-engine/customizable-sequencer-track-in-unreal-engine#%E5%88%86%E5%8C%BA%E5%87%BD%E6%95%B0)
-   [类的概览](/documentation/zh-cn/unreal-engine/customizable-sequencer-track-in-unreal-engine#%E7%B1%BB%E7%9A%84%E6%A6%82%E8%A7%88)
-   [SequencerSectionBP](/documentation/zh-cn/unreal-engine/customizable-sequencer-track-in-unreal-engine#sequencersectionbp)
-   [SequencerTrackBP](/documentation/zh-cn/unreal-engine/customizable-sequencer-track-in-unreal-engine#sequencertrackbp)
-   [SequencerTrackInstanceBP](/documentation/zh-cn/unreal-engine/customizable-sequencer-track-in-unreal-engine#sequencertrackinstancebp)
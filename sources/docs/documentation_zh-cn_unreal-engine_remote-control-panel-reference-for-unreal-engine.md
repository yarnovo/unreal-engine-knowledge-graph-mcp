# 虚幻引擎远程控制面板参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:35:50.690Z

---

目录

![远程控制面板参考](https://dev.epicgames.com/community/api/documentation/image/6d7dce84-ecb0-4823-9680-857b0cd74ee0?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

本文将简要介绍远程控制面板中包含的界面元素和选项。你将学习如何整理远程控制面板、连接外部设备以及对元素重命名，以便在远程控制API中更轻松地进行引用。

## 远程控制面板界面

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37874007-b98f-48b7-b9fc-ca219ae7db2e/rm-con-p.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37874007-b98f-48b7-b9fc-ca219ae7db2e/rm-con-p.png)

点击查看大图

1.  [菜单](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine#%E8%8F%9C%E5%8D%95)
    
2.  [公开的属性](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine#%E5%85%AC%E5%BC%80%E7%9A%84%E5%B1%9E%E6%80%A7)
    
3.  [远程控制实体](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine#%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6%E5%AE%9E%E4%BD%93)
    
4.  [DMX、MIDI和OSC专用远程控制插件](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine#%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6%E6%8F%92%E4%BB%B6)
    
5.  [协议日志](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine#%E5%8D%8F%E8%AE%AE%E6%97%A5%E5%BF%97)
    

## 菜单

下表介绍了菜单中显示的每个元素，按照从左到右的顺序进行介绍。

![菜单元素](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bfee2a31-9a61-481a-bad3-8910e7b8f498/menu-elements.png)

UI元素

说明

**创建组（Create Group）**

创建多个组以将相似的属性和函数整理在一起。

**公开（Expose）**

将其他项添加到你希望公开功能而不仅仅是属性的面板。以下选项可用于公开到远程控制API：

-   蓝图库函数
-   子系统函数
-   Actor函数
-   Actor
-   按类划分的Actor

**打开Web应用程序（Open Web App）**

在你的浏览器中启动[远程控制Web应用程序](/documentation/zh-cn/unreal-engine/remote-control-web-application-for-unreal-engine)。

**编辑模式（Edit Mode）**

启用之后，你可以从编辑器公开属性、将函数添加到预设，以及修改属性和函数的组和位置。

**启用日志（Enable Log）**

显示协议日志。如需更多信息，请参见[协议日志部分](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine#protocollog)。

**\*远程控制预设名称（Remote Control Preset Name）**

显示当前打开的远程控制预设资产的名称。

## 公开的属性

下表介绍了针对每个公开的属性显示的各个元素，按照从左到右的顺序进行介绍。

![公开的属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbc3c687-4c21-4325-84d2-675decd87794/exposed-properties.png)

操作

说明

**展开（Expand）**

（可选）显示数据值的额外信息（如果存在）。

**移动（Move）**

将元素拖放到面板中，重新排列属性、函数和组。

**重命名（Rename）**

更改属性、函数或组的名称，使其在函数调用中的引用更加清楚和简单。

**数据值（Data Values）**

在编辑器中匹配属性的数据格式。

**重置（Reset）**

将属性的值还原成默认值。

**删除（Remove）**

从面板中移除属性或函数，使其不再向远程控制API公开。

## 远程控制实体

当你选择公开的属性时，此部分将显示。下表介绍了可以与每个属性关联的元数据。根据数据格式，部分属性可能具有更多的字段。

![远程控制实体元数据](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/347dc349-c80e-49f3-a770-f3c640cf3ba2/remote-control-entity-metadata.png)

元数据

说明

**标签（Label）**

与远程控制预设中的标签匹配的属性的唯一标签。可以在远程控制API中使用，用于访问公开的属性。

**ID**

属性在引擎中的唯一标识符。可以在远程控制API中使用，用于访问公开的属性。

**字段名称（FieldName）**

关联的字段的名称。

**控件（Widget）**

在远程控制Web应用程序中用于此属性所用的默认控件类型。

**说明（Description）**

此字段重载远程控制Web应用程序中显示的标签。

## 　DMX、MIDI和OSC专用远程控制协议

在远程控制面板中，你可以通过[DMX](/documentation/zh-cn/unreal-engine/dmx-in-unreal-engine)、MIDI和[OSC](/documentation/zh-cn/unreal-engine/osc-plugin-overview-for-unreal-engine)将公开的属性映射到外部设备。下表介绍了用于添加和查看协议映射的UI。

![远程控制协议映射用户界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a47474c5-b74b-417a-979e-408eea6e88e8/protocol-mapping-ui.png)

UI元素

说明

**协议映射选项（Protocol Mapping Option）**

选项包括：

-   DMX
-   MIDI
-   OSC

**添加协议（Add Protocol）**

为协议映射选项下拉菜单中当前选择的选项创建新的协议映射。

**查看选项（Viewing Options）**

筛选出你希望查看的协议映射。

此外，每个协议映射还具有自己的 **映射（Mapping）** 和 **范围（Ranges）** 分段，用于定义要连接到哪些外部设备和输入。下面的部分解释协议类型映射之间的不同，以及协议类型共同拥有的范围功能。

使用自动绑定按钮捕获当前协议的最新输入，并将其应用到映射。这提供了一种方便快捷的方法来手动指定属性。

例如，在现有或新创建的MIDI绑定中，你可以切换自动绑定，在设备上按音符，然后映射属性将相应填充。要完成自动绑定和停止对任何新输入的录制，需要再按一下自动绑定按钮，使其不再是红色。

以下是自动绑定的可用状态： ***灰色（Grey）**：不侦听输入* **红色（Red）**：侦听输入 \* **绿色（Green）**：具有绑定的输入

![OSC自动绑定设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7de21c5-7ec4-46a2-9f0d-7ea0f72b4163/osc-enable-disable.gif)

### DMX协议映射

下表介绍了用于通过DMX协议连接到外部设备上的特定输入的选项。

![DMX协议映射选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25fd6279-0725-4ce4-9b0c-9980cde45f72/dmx-protocol-mapping.png)

字段

说明

**通用（Universe）**

DMX通用映射

**使用LSB（Use LSB）**

启用后，如果使用16位DMX数值时的顺序不标准，则使用最不重要的数位来交换字节顺序。通常情况下，使用最重要的数位。

**数据类型（Data Type）**

指定传入数据的精度和最大数值。输入将限制为此类型的边界。可用的类型有：

-   8位
-   16位
-   24位
-   32位

目前，24位选项存储在内部，表示为32位整数。

**起始通道（Starting Channel）**

你要将属性绑定到的第一个DMX通道。目前，仅允许将一个通道绑定到参数。

### MIDI协议映射

下表介绍了用于通过MIDI协议连接到外部设备上的特定输入的选项。

![MIDI协议映射选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcd580f6-6da3-490f-8d1a-b62ee33c08d4/midi-protocol-mapping.png)

字段

说明

**事件类型（Event Type）**

指定传入数据的精度和最大数值。输入将限制为此类型的边界。可用的类型有：

-   8位
-   16位
-   24位
-   32位

目前，24位选项存储在内部，表示为32位整数。

**映射通道ID（Mapped Channel ID）**

使用MIDI设备输入指示符指定要连接到哪个设备。

**通道（Channel）**

输入MIDI通道。预期的数值范围为0-16。

**设备（Device）**

选择要映射哪个设备。默认使用项目设置中设置的数值。此外，你还可以按照设备的名称或ID来设置设备，从而根据协议绑定来重载设备。

要在 **项目设置（Project Settings）** 中指定MIDI设备：

1.  在编辑器（Editor）中，转到主菜单并选择 **项目设置（Project Settings）**，以打开"项目设置"窗口。
2.  在 **项目设置（Project Settings）** 窗口中，导航到 **插件（Plugins） > 远程控制MIDI协议（Remote Control MIDI Protocol）**。
3.  按设备 **名称（Name）** 或 **ID** 选择设备。字段旁边的下拉菜单显示可用设备列表，或者如果当前未连接，则可以指定设备。

![远程控制MIDI插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3e87876-44f1-4f90-8611-5beb3ddf98d9/remote-control-midi-plugin.png)

如果在编辑器打开时插入设备，点击 **刷新（Refresh）** 按钮可刷新设备列表。

![MIDI设备刷新按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91e38f81-9d9b-40a8-8b51-f58486c8351f/refresh-midi-device.png)

### OSC协议映射

下表介绍了用于通过OSC协议连接到外部设备上的特定输入的选项。

![OSC协议映射选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f9ee328-d7a6-49de-b75b-349ba4805905/osc-protocol-mapping.png)

字段

说明

**路径名称（Path Name）**

指定OSC设备的服务器地址和路径。

默认情况下，服务器为 `127.0.0.1:8001`。你可以在项目设置中更改或添加更多选项：

1.  在编辑器（Editor）中，转到主菜单并选择 **项目设置（Project Settings）**，以打开"项目设置"窗口。
2.  在 **项目设置（Project Settings）** 窗口中，导航到 **插件（Plugins） > 远程控制OSC协议（Remote Control MIDI Protocol）**。
3.  添加新的 **服务器设置（Server Settings）** 数组元素，或修改现有元素，然后设置其 **服务器地址（Server Address）** 以与您的设备匹配。

![远程控制OSC插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d21f8c9-6d15-415d-9fff-dc32e096b4f3/remote-control-osc-plugin.png)

### 协议范围

此部分显示映射到外部设备的范围。默认情况下，新协议映射将添加两个与预测的最小数值和最大数值对应的范围输入。

选择范围分段右侧的加号按钮可以添加更多的范围步长。如果为范围点输入不同的数值，将会在输入点之间（例如动画中的关键帧）插入属性数值。

下表介绍了如何为范围设置属性数值。

![协议范围属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f6156ea-de8a-43a1-b793-568040430503/protocol-range-properties.png)

UI元素

说明

**输入范围点（Input Range Point）**

你可以将其与特定属性数值关联的输入点。

**数据值（Data Values）**

为该范围点设置属性的数值。数据格式与关联的属性类型匹配。

**使用当前属性数值（Use Current Property Value）**

捕获关卡中属性的当前数值。

**删除输入（Remove Input）**

删除范围点。

当外部设备上的同一输入具有多个映射时，显示的警告图标。

## 协议日志

在远程控制面板的菜单中勾选 **启用日志（Enable Log）** 时，此部分将显示选定协议的传入数据。在下面的示例中，名称为/1/fader4的OSC设备向引擎发送浮点数值。

![协议日志](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3873b7fd-2db7-4116-94f9-7ce9ed3b066c/protocol-log.png)

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [osc](https://dev.epicgames.com/community/search?query=osc)
-   [midi](https://dev.epicgames.com/community/search?query=midi)
-   [remote control](https://dev.epicgames.com/community/search?query=remote%20control)
-   [dmx](https://dev.epicgames.com/community/search?query=dmx)
-   [remote control preset](https://dev.epicgames.com/community/search?query=remote%20control%20preset)
-   [remote control protocol](https://dev.epicgames.com/community/search?query=remote%20control%20protocol)
-   [remote control web application](https://dev.epicgames.com/community/search?query=remote%20control%20web%20application)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [远程控制面板界面](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine#%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6%E9%9D%A2%E6%9D%BF%E7%95%8C%E9%9D%A2)
-   [菜单](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine#%E8%8F%9C%E5%8D%95)
-   [公开的属性](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine#%E5%85%AC%E5%BC%80%E7%9A%84%E5%B1%9E%E6%80%A7)
-   [远程控制实体](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine#%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6%E5%AE%9E%E4%BD%93)
-   　[DMX、MIDI和OSC专用远程控制协议](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine#dmx%E3%80%81midi%E5%92%8Cosc%E4%B8%93%E7%94%A8%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6%E5%8D%8F%E8%AE%AE)
-   [DMX协议映射](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine#dmx%E5%8D%8F%E8%AE%AE%E6%98%A0%E5%B0%84)
-   [MIDI协议映射](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine#midi%E5%8D%8F%E8%AE%AE%E6%98%A0%E5%B0%84)
-   [OSC协议映射](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine#osc%E5%8D%8F%E8%AE%AE%E6%98%A0%E5%B0%84)
-   [协议范围](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine#%E5%8D%8F%E8%AE%AE%E8%8C%83%E5%9B%B4)
-   [协议日志](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine#%E5%8D%8F%E8%AE%AE%E6%97%A5%E5%BF%97)
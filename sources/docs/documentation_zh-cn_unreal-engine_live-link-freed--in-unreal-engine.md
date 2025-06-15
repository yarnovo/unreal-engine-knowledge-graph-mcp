# 虚幻引擎Live Link FreeD | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/live-link-freed--in-unreal-engine
> 
> 生成时间: 2025-06-14T20:08:25.464Z

---

目录

![Live Link FreeD](https://dev.epicgames.com/community/api/documentation/image/de5c1de0-fe1d-4dff-be5a-33ec35dc37c7?resizing_type=fill&width=1920&height=335)

Live Link 支持FreeD数据协议，该协议常用于使用来自变换位置、旋转和镜头的8轴数据来追踪摄像机。FreeD协议受某些特定的"平移、倾斜、变焦"(PTZ)摄像机支持，例如Panasonic AW-UE150和Sony BRC-X1000，并且用于将追踪数据添加到项目会比较经济高效。

![FreeD Live Link](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/172bd642-1910-47fd-9841-14b091122bc3/freed_livelink_010.gif)

FreeD是较早的协议，不支持某些摄像机现在包含的许多新功能。此插件提供的某些功能可能不可用，具体取决于你的摄像机型号及其提供的数据：

-   所有支持FreeD的摄像机都至少支持平移、倾斜和旋转。
    
-   一些摄像机可能支持聚焦、光圈和变焦(FIZ)。
    
-   一些摄像机可能支持世界上3D追踪的位置。
    

我们建议参考摄像机手册，详细了解摄像机对FreeD的支持情况。

## 入门指南

按照下面的步骤，使用 **Live Link FreeD** 设置摄像机追踪。

1.  同时启用[Live Link插件](/documentation/zh-cn/unreal-engine/live-link-in-unreal-engine)和 **Live Link FreeD** 插件。
    
    ![Live Link FreeD插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c8852ec-bc97-41df-ae8e-4c6d7e4e4f4c/freed-plugin.png)
2.  转至 **窗口（Window） > Live Link** 以打开 **Live Link** 窗口。
    
3.  选择 **源（Source） > LiveLinkFreeD 源（LiveLinkFreeD Source）**，并输入你要连接的摄像机的 **IP地址** 和 **端口号**。默认端口号为40000。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/327696be-a865-4246-bbb8-5e01599b804d/ipaddress-port.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/327696be-a865-4246-bbb8-5e01599b804d/ipaddress-port.png)
    
    并非所有摄像机都采用相同的设置。请参阅你的摄像机手册，了解如何连接摄像机并配置网络参数。
    
    对于某些摄像机，你需要启用通过UDP传递的摄像机数据，这有时称为FreeD数据。如果摄像机设置为通过UDP将摄像机数据发送到电脑，IP地址必须设置为0.0.0.0和相应端口号。
    
4.  添加源并连接摄像机后，摄像机将显示为主题。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7785cf0-20b1-488d-b4bb-07dba3309bb8/camera-subject.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7785cf0-20b1-488d-b4bb-07dba3309bb8/camera-subject.png)
    
    如果主题不显示，说明摄像机未正确设置。请检查IP地址、端口号和摄像机设置，以进行故障排除。
    
    FreeD协议将ID与摄像机关联，这无法在UE中修改。不过，某些摄像机确实有界面可供设置ID。由于Live Link需要主题采用唯一名称，请务必确保在将多个摄像机用于Live Link时采用唯一ID。
    
5.  选择 **查看选项（View Options） > 显示帧数据（Show Frame Data）**，验证引擎是否收到摄像机数据。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb5c2e99-046f-4dac-84bc-fc0ad67c96e8/show-frame-data.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb5c2e99-046f-4dac-84bc-fc0ad67c96e8/show-frame-data.png)
    
6.  将电影摄像机（或其他摄像机Actor）添加到关卡。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f16609a-640a-4912-98f9-84ccb04e286b/add-camera-actor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f16609a-640a-4912-98f9-84ccb04e286b/add-camera-actor.png)
    
7.  在 **世界大纲视图（World Outliner）** 中选择你的摄像机Actor，打开 **细节（Details）** 面板。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7fd275d0-27e8-480a-85bb-2f4914f0769a/select-camera-actor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7fd275d0-27e8-480a-85bb-2f4914f0769a/select-camera-actor.png)
    
8.  在 **细节（Details）** 面板中，选择 **添加组件（Add Component）**。搜索并选择 **Live Link控制器（Live Link Controller）**。
    
    ![添加Live Link控制器组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/851f057c-b1d5-4fad-baa9-ec56cf9464e2/live-link-controller-component.png)
9.  选择你添加到摄像机的 **LiveLinkComponentController**，并将其 **主题表示（Subject Representation）** 设置为你的 **Live Link FreeD主题（Live Link FreeD Subject）**。在此示例中，主题名称为 **Camera 0**。
    
    ![设置Live Link 控制器主题表示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cd819a3-204c-4ac8-93db-89ec3f5e6262/live-link-subject-representation.png)
10.  移动连接的实物摄像机并验证关卡中的摄像机Actor更新。
    

## 配置摄像机数据

大部分广播和电影摄像机都支持FreeD协议，但不支持其所有功能。由于每个摄像机提供不同的数据，因此在使用Live Link FreeD设置摄像机时，需要为你的设备自定义设置。不过，你可以设置参数一次，然后将其另存为 **Live Link预设（Live Link Preset）** 以供将来使用。

以下小节将说明如何为设备正确修改传入的摄像机数据。

### Live Link设置

传入数据是二进制格式，因此插件会根据摄像机型号，处理如何将数据解释为合适的聚焦、光圈、变焦参数。你可以修改插件解释数据的方式。

在"Live Link"窗口中的"主题（Subject）"分段下，选择 **FreeD** 并修改 **源（Source）** 设置。下表提供了有关设置的更多细节。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65abd24c-b0a4-4387-bfd6-ce97ce55d84a/freed-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65abd24c-b0a4-4387-bfd6-ce97ce55d84a/freed-settings.png)

设置

说明

发送额外元数据

启用时，摄像机会每帧发送更多信息。此选项可能会对性能略有影响。

默认配置

为某些摄像机品牌提供了自定义的配置。以下是可用的选项：

-   通用
-   Panasonic
-   Sony
-   stYpe
-   Mosys
-   Ncam

"通用"选项不会更改任何设置，因此你需要为摄像机修改设置。

对焦距离编码器数据

来自摄像机的对焦距离数据。请参阅[编码器数据设置](/documentation/zh-cn/unreal-engine/live-link-freed--in-unreal-engine#%E7%BC%96%E7%A0%81%E5%99%A8%E6%95%B0%E6%8D%AE%E8%AE%BE%E7%BD%AE)，以了解有关此分段中设置的细节。

焦距编码器数据

来自摄像机的焦距数据。请参阅[编码器数据设置](/documentation/zh-cn/unreal-engine/live-link-freed--in-unreal-engine#%E7%BC%96%E7%A0%81%E5%99%A8%E6%95%B0%E6%8D%AE%E8%AE%BE%E7%BD%AE)，以了解有关此分段中设置的细节。

用户定义的编码器数据

来自摄像机的其他数据，通常是光圈数据。FreeD规范将其视为用户定义的。请参阅[编码器数据设置](/documentation/zh-cn/unreal-engine/live-link-freed--in-unreal-engine#%E7%BC%96%E7%A0%81%E5%99%A8%E6%95%B0%E6%8D%AE%E8%AE%BE%E7%BD%AE)，以了解有关此分段中设置的细节。

#### 编码器数据设置

以下设置适用于其所在的"编码器数据"分段。可用的编码器数据包括：**对焦距离**、**焦距** 和 **用户定义**（通常为光圈数据，具体取决于摄像机型号）。

设置

说明

有效

启用后，引擎将使用此编码器数据。

反转编码器

启用后，传入轴方向将翻转。

使用手动范围

默认情况下，预期的值范围基于动态自动距离修正来确定。使用动态自动距离修正时，必须通过强制摄像机达到其最小值和最大值若干次来校准编码器。每次都必须执行此校准操作，即使你使用的是Live Link预设也不例外，因为摄像机编码器不一致。

启用"使用手动范围"以自行设置范围。如果在手动设置范围值之后切换到自动距离修正，那么自动距离修正将重置这些值。

最小值

启用"使用手动范围"时，预期值范围的最小值。

最大值

启用"使用手动范围"时，预期范围的最大值。

屏蔽位

将二进制掩码应用于传入数据。文本框预期掩码为十进制格式。某些摄像机制造商将编写多种类型的数据，因此如果你希望引擎忽略特定位数，请设置此字段。

### 实物摄像机设置

除了Live Link中的设置之外，还必须修改摄像机Actor上的设置以匹配实物摄像机参数。

选中摄像机Actor后，转至其 **细节** 面板，并在 **当前摄像机设置** 下修改以下字段。

![当前摄像机Actor设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d8dabc9-e536-492e-a7db-0c315d0b4216/current-camera-settings.png)

-   设置 **镜头设置（Lens Settings） > 最小焦距（Min Focal Length）** 和 **镜头设置（Lens Settings） > 最大焦距（Max Focal Length）** 以匹配实物摄像机镜头上的焦距范围。
    
-   设置 **镜头设置（Lens Settings） > 最小光圈级数（Min FStop）** 和 **镜头设置（Lens Settings） > 最大光圈级数（Max FStop）** 以匹配实物摄像机镜头上的光圈范围。
    

无法在摄像机上设置最大对焦距离。可以在摄像机Actor上设置 **焦点设置（Focus Settings） > 手动对焦距离（Manual Focus Distance）**。此对焦距离在引擎中是常量。

-   [camera](https://dev.epicgames.com/community/search?query=camera)
-   [live link](https://dev.epicgames.com/community/search?query=live%20link)
-   [freed](https://dev.epicgames.com/community/search?query=freed)
-   [camera tracking](https://dev.epicgames.com/community/search?query=camera%20tracking)
-   [ptz](https://dev.epicgames.com/community/search?query=ptz)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [入门指南](/documentation/zh-cn/unreal-engine/live-link-freed--in-unreal-engine#%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)
-   [配置摄像机数据](/documentation/zh-cn/unreal-engine/live-link-freed--in-unreal-engine#%E9%85%8D%E7%BD%AE%E6%91%84%E5%83%8F%E6%9C%BA%E6%95%B0%E6%8D%AE)
-   [Live Link设置](/documentation/zh-cn/unreal-engine/live-link-freed--in-unreal-engine#livelink%E8%AE%BE%E7%BD%AE)
-   [编码器数据设置](/documentation/zh-cn/unreal-engine/live-link-freed--in-unreal-engine#%E7%BC%96%E7%A0%81%E5%99%A8%E6%95%B0%E6%8D%AE%E8%AE%BE%E7%BD%AE)
-   [实物摄像机设置](/documentation/zh-cn/unreal-engine/live-link-freed--in-unreal-engine#%E5%AE%9E%E7%89%A9%E6%91%84%E5%83%8F%E6%9C%BA%E8%AE%BE%E7%BD%AE)
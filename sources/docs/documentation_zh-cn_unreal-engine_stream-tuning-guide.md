# 流送优化指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/stream-tuning-guide
> 
> 生成时间: 2025-06-14T20:46:51.844Z

---

目录

![流送优化指南](https://dev.epicgames.com/community/api/documentation/image/fff598e1-e4ff-46e6-8102-c475e831686d?resizing_type=fill&width=1920&height=335)

默认的像素流送配置平衡图像的质量、延迟和弹性，并假定其会用于互联网上，由用户在各种网络状态下使用。如果该假想与你计划的相同，那么你不需要要修改默认的像素流送配置。然而，像素流送是一种灵活的技术，可以在许多不同场景下使用。该指南介绍如何实现不同的质量、延迟和弹性，并且用示例说明有时优化图像质量、延迟或者弹性其中之一比平衡流送更重要。

## WebRTC

对于像素流送中图像质量、延迟和弹性的平衡主要由一种叫做WebRTC的技术实现。WebRTC普遍用于视频会议和实时流送，比如Facebook Messenger、Discord、Amazon Chime以及 Google Stadia。WebRTC设计来达到低延迟、不受误差影响、支持多用户之间的多媒体和数据传输。

使用像素流送时，WebRTC参与者便是使用像素流送插件的虚幻引擎应用程序和一些支持WebRTC的客户端，比如网络浏览器。由于多种类的使用场景，WebRTC并没有模式或者预设的配置。相反，WebRTC会在面对不同网络状态和资源限制的情况下试图平衡质量、延迟和弹性。

然而，我们在像素流送中留出了一些参数来供用户按照自己的需求调整，并偏重图像质量、延迟和弹性其中之一。

请注意，如果偏重其中一项，那么另外两者便会受到影响。你需要自行决定这种牺牲对于你的使用场景能否接受。在接下里的小节中我们会介绍如何：

1.  [在不同网络状态下保留图像质量](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E5%9C%A8%E4%B8%8D%E5%90%8C%E7%BD%91%E7%BB%9C%E7%8A%B6%E6%80%81%E4%B8%8B%E4%BF%9D%E7%95%99%E5%9B%BE%E5%83%8F%E8%B4%A8%E9%87%8F)
2.  [达到最低的延迟](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E8%BE%BE%E5%88%B0%E6%9C%80%E4%BD%8E%E7%9A%84%E5%BB%B6%E8%BF%9F)
3.  [让流送在较差的网络状态下保持弹性](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E8%AE%A9%E6%B5%81%E9%80%81%E5%9C%A8%E8%BE%83%E5%B7%AE%E7%9A%84%E7%BD%91%E7%BB%9C%E7%8A%B6%E6%80%81%E4%B8%8B%E4%BF%9D%E6%8C%81%E5%BC%B9%E6%80%A7)

## 图像质量

视频流送的图像质量主要取决于虚幻引擎图象编码时应用多少压缩再由WebRTC输送。该压缩步骤由像素流送应用进行，默认完全由WebRTC控制。

### WebRTC编码器码率适应

WebRTC会反复判断像素流送应用和WebRTC客户端之间可用的网络带宽，计算出适合的码率数值，然后用最新的预估码率更新视频流送编码器。之后视频流送编码器会将该码率作为一个最大值，并且生成码率不大于该数值的图像。

该系统在网络条件差的时候生成高度压缩的图像（成块像素化），网络条件能够支持高清视频流送时生成压缩较少的图像。也就是说，这个系统能够根据网络条件自行调整视频流送的压缩。

### 在不同网络状态下保留图像质量

由于像素流送现在支持多个视频编码解码器（每个编码解码器具有不同的QP范围），在5.5中，我们将旧的"QP"参数更改为新的"质量（Quality）"参数。此新参数将根据所选编码解码器自动缩放到正确的QP范围，从而易于使用，并更轻松地了解/控制你的流送质量。

此外，旧QP参数为"值越低 = 质量越高"。使用新的质量参数，值越高 = 质量越高。

**答案：** 使用 `-PixelStreamingEncoderMinQuality=N` 和 `-PixelStreamingEncoderMaxQuality=N` （N为1到100之间的整数，包括1和100）。

接下来我们会介绍QP的含义并解释使用该参数所带来的牺牲。

归根结底，真正影响视频流送图像质量的因素只有视频流送编码器进行的压缩。任意帧上进行的压缩都可以由称为 "量化参数（quantization parameter）" (QP) 的标准来度量。

在像素流送中，我们所使用的编解码器具有各自独特的、范围各异的量化比特率（QP）范围，如下所示

-   H264: 0-51
-   AV1: 0-255
-   VP8: 0-63
-   VP9: 0-63

QP值越大，量化更激进，从而产生较小的文件大小，但可能会降低质量，而较小的QP值会保留更多细节，但会增加文件大小。

默认情况下我们不限制该QP范围，也就意味着视频流送编码器可以自行根据WebRTC提供的目标码率自行选择QP。然而，在一些情况下我们的应用不能产生质量较差的图像（比如奢侈品产品配置器），那么我们需要限制编码器能够使用的QP范围。

像素流送质量参数会自动将每个编码解码器各自的QP值缩放到相对于质量参数值的正确范围。例如，将质量设置为60，将为H264的QP值设置为20。

如果MaxQuality受到限制，导致码率超过了网络条件能够接受的程度，或者超过了 -PixelStreamingWebRTCMaxBitrate，那么流送的帧率会下降并移除一些帧。

你可以使用以下启动参数控制像素流送视频编码器质量：

-   `-PixelStreamingEncoderMinQuality=`
-   `-PixelStreamingEncoderMaxQuality=`

通常情况下，要限制图像质量只需要调整MinQuality这一个参数。要找到适用于你的应用的MinQuality，需要进行一些试验，因为这取决于你的应用场景能够接受多少压缩（尤其是在带有动作的情况下）。然而，根据我们的经验，如果要限制图像压缩，大部分用户能够接受MinQuality数值60。

已经传输的码率和质量可以用像素流送包含的页面内 `settings"/"stats panel` 进行追踪，也可以使用基于Chromium的浏览器中的 `chrome://webrtc-internals` 或者Firefox内的about:webrtc。

以下图片展示了MaxQuality对于图像质量和码率的影响：

     ![MaxQuality对于图像质量和码率的影响](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03cad96a-d705-4a97-8874-8518bef4e8a3/quality1.jpg) ![MaxQuality对于图像质量和码率的影响](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5fbe98f5-e2be-442b-bd2e-a62350729e01/quality21.jpg) ![MaxQuality对于图像质量和码率的影响](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4dac71d0-d12d-48b7-9076-fa79b97695b1/quality41.jpg) ![MaxQuality对于图像质量和码率的影响](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3318ad4-7d56-4973-b9ac-d6b517c77c6e/quality60.jpg) ![MaxQuality对于图像质量和码率的影响](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c29c9a80-3f51-42d5-87d2-a4f72b00c5ba/quality80.jpg) ![MaxQuality对于图像质量和码率的影响](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ba17909-0edb-4961-bdc5-7728d31f87b8/quality90.jpg)

**MaxQuality对于图像质量和码率的影响**

请注意，质量和码率之间呈对数相关，意味着改变质量，比如Quality从96到95，会比Quality从61到260对码率产生更大的改变。

### 延迟

像素流送中的延迟由多个因素影响，其中一些是你能够控制的，另外一些却不能。虽然你无法控制终端用户的设备硬件、公共互联网、或者光的传播速度，但是还有一些可以控制的因素可以用于影响像素流送的延迟。接下来我们会重点介绍这些因素。

#### 达到最低的延迟

要最大限度减少延迟，你可能需要调整以下因素；但是，请注意，其中一些调整可能会影响流的质量和弹性。

延迟因素

指南

选用的视频编码器。

VP8/VP9基于软件的编码器会比硬件加速的H.264编码器带来更多的延迟。

应用程序的地理位置。

将像素流送应用部署在离目标用户尽量接近的地理位置。可能会需要在多个地区进行部署。

应用程序主机的硬件。

我们推荐使用支持硬件加速H.264编码的GPU。除此以外，我们还建议在目标CPU上调试你的应用，确保使用率不达到100%，否则会暂停WebRTC传输线程。

最大码率和分辨率。

减少分辨率和最大码率能够减少数据传输和编码复杂度，这样会让编码、封包和解码更快。这种减少延迟的方式通常不值得其带来的质量上的牺牲。

音画同步。

如果你能够接受音画不同步，那么你可以通过 `-PixelStreamingWebRTCDisableAudioSync` 改善延迟，这会将音频和视频用分别的流进行传输。

禁用音频。

如果你不需要音频，可以禁用其传输来节约带宽，使用 `-PixelStreamingWebRTCDisableReceiveAudio` 和 `-PixelStreamingWebRTCDisableTransmitAudio`。

禁用动态模糊或者减少场景复杂度。

禁用动态模糊或者其它任何增加视觉复杂度的特效，都能够在一些场景中显著减少编码复杂度，从而达到更低的码率。

通常情况下，地理位置和像素流送应用与用户之间的网络状况是影响延迟的最大因素。

### 弹性

在这里弹性是指流送在出现丢包、网络波动和数据出错的情况时的稳定性。WebRTC本身已经带有一些动态调节机制用于管理流送弹性。举个例子，WebRTC可以增加其 "抖动缓冲（jitter buffer）" 大小，用于储存接收到的包体来补偿网络延时和重新传输，这样做的代价是会增加延迟。虽然抖动缓冲不能直接控制，但是我们可以在视频流送编码过程中控制其它的因数来通过数据重复来增加流送的弹性。

#### 让流送在较差的网络状态下保持弹性

通过调节以下各项，可以增加像素流送中的视频流送弹性：

弹性因素

指南

编码器关键帧间隔

通过发送关键帧，流和解码器就可以在大量数据丢失后恢复。发送关键帧的间隔可以使用 -PixelStreaming.Encoder.KeyframeInterval\` 控制。

关键帧确实会比普通帧占用更多的带宽，因此如果发生丢包的原因是网络饱和，发送更多关键帧可能无济于事。

编码器帧内刷新

视频流恢复信息可以在多个帧切片之间编码。利用此信息，流在发生数据丢失的情况下会更具弹性；但是，这确实会为整个流占用更多带宽，并在发生流恢复时引入扫描线类型的瑕疵。

目前此选项仅在NVIDIA GPU上可用，你可以使用 -NVENCIntraRefreshPeriodFrames=N `和` \-NVENCIntraRefreshCountFrames=M\` 在像素流送中启用它（其中N是再次发送帧内刷新之前的帧数，M是要使用帧内刷新数据编码的帧数。Pixel Streaming 2已移除了该选项）。

通常情况下，流送弹性最容易受网络质量和传输的数据量所影响。所以，如果你的像素流送应用能够接受较低的质量来达到较高的弹性，那么通过不限制质量或者缩小应用分辨率来减少所传输的数据量也是可行的选项。

### 耦合和解耦模式

在像素流送中，耦合是指WebRTC和应用程序帧率相互绑定。要启用解耦模式，请使用 `-PixelStreamingDecoupleFramerate` 运行你的应用程序。有各种不同的用例，你的流送可能会从耦合中受益；

#### 耦合模式

在耦合模式下，像素流送将尝试以UE应用程序运行的任何速率流送帧。当UE应用程序达到一致且稳定的帧率并且延迟至关重要时，应首选此模式。

#### 解耦模式

在解耦模式下，像素流送将尝试以固定速率（例如60 FPS）流送帧。如果你的UE应用程序无法以目标帧率渲染，则像素流送将发送重复帧。此模式可用于延迟不那么重要但应用程序受到帧速率不一致的影响并导致流送出现卡顿的情况。

#### 注意事项

虽然在应用程序FPS不一致的情况下，解耦模式可以提供改进，但注意，无论帧速率是否一致，解耦模式在所有用例中都会引入1-2帧延迟。这意味着对于大多数用例，建议保持使用耦合模式。

### 为像素流送优化你的应用

以下是我们对于为像素流送优化应用的额外建议：

-   向场景中应用胶片颗粒后效，能够大幅减少色带产物；然而，这样会增加带宽占用。
-   如果你能够接受更多的延迟并且像素流送应用不计划支持多用户像素流送，那么你可以尝试使用VP8/VP9软件编码器，使用 `-PixelStreamingEncoderCodec=`。该编码器在同样的码率下能够比H.264生成质量更好的编码。
-   如果想要让多个像素流送应用在一个GPU上运行（多租户技术），你需要仔细配置优化你的应用，否则将会面临更低的帧率/分辨率。
-   如果你想要在云端成规模地运行你的应用，针对Linux构建你的虚幻应用能够更加简单并且成本较低，因为Linux有着更多诸如Kubernetes这类技术的支持。

## 在一对一流送中实现最佳性能

一对一用例是最简单、最常见的像素流送形式，即一个用户连接到一个像素流实例。有关像素流送配置的更多细节，请参阅[托管和网络指南](/documentation/zh-cn/unreal-engine/hosting-and-networking-guide-for-pixel-streaming-in-unreal-engine)

在讨论一对一流送的最佳设置之前，我们必须定义在设计最佳像素流送体验时需要考虑的指标。关键关注点如下：

-   延迟（用户和流送体验之间）；
-   视频质量（用户接收到的视频质量）；
-   不同网络条件下的流送稳健性（我们是否可以处理一些丢失的数据包并快速恢复）。

### 延迟

为了实现最佳延迟，你应使用以下架构：**直接点对点** （无SFU或媒体服务器），并且像素流送实例在地理位置上应尽可能地靠近用户。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/466759c7-b3ad-4e76-9c22-6a0fe8a3d04f/latency.jpg)

上图说明了低延迟的最佳像素流送配置。最终用户通过UDP直接连接到像素流送实例。

### 注意事项

-   要求UE实例可通过UDP上的公共互联网访问。
-   要求最终用户拥有允许他们通过UDP与未知IP地址进行通信的网络配置。就WebRTC而言，这要求两台机器之间有一个STUN服务器，以便克服NAT并交换公共IP。
-   对于无法满足这些要求的用户，可以使用TURN（中继）服务器，但其延迟 **将** 比P2P用户更糟糕。
-   当多个WebRTC对等体需要以不同的质量查看同一流送时，此配置 **将不起作用** （有关更多细节，请参阅有关[SFU配置](/documentation/zh-cn/unreal-engine/hosting-and-networking-guide-for-pixel-streaming-in-unreal-engine#%E4%BB%80%E4%B9%88%E6%98%AFsfu)的文档）。

### 视频质量

在视频优先的WebRTC体验（例如像素流送）中，视频质量可能是我们体验中最强大的调整参数。没有人想要斑驳或像素化的视觉体验；然而，我们也希望为不同网络上的广泛用户提供一致且稳定的体验。为了实现这一目的，我们需要考虑以下问题：

-   体验的最低可接受分辨率是多少？
-   该分辨率的最低可接受比特率是多少？
-   视觉质量、稳健性和延迟，哪个更重要？

提高视频质量会增加我们的体验所需的比特率，如果数据包丢失或延迟增加，体验会变得不那么稳健，更容易出现卡顿，因为抖动缓冲区会增加，以应对小但重要的重传数据包。

因此，我们必须谨慎考虑能够带来成功体验的最低视频质量。此外，一旦确定了最低质量，务必限制流送质量，不要超过此上限，在与用户进行仔细的现场试验之后的情况除外。

务必根据向用户部署一些试验并测量数据包丢失、抖动缓冲区延迟和比特率等关键指标，做出数据驱动型决策。

然而，在没有任何数据的情况下，起始点可能是：

-   1080p视频流送；（-ResX=1920，-ResY=1080，-ForceRes，-Renderoffscreen）
-   10兆比特/秒，最大编码质量；（-PixelStreamingWebRTCMaxBitrate=10000000）；
-   仅在需要时发送关键帧；（PixelStreamingEncoderKeyframeInterval=0）

## 稳健性

可以通过以下技巧提高视频流送的稳健性：

-   降低最大比特率；
-   在编码过程中添加冗余信息；（`-PixelStreamingEncoderIntraRefreshPeriodFrames=300 -PixelStreamingEncoderIntraRefreshCountFrames=5`）
-   确保协商要约/答复包含[Flex-FEC](https://datatracker.ietf.org/doc/html/rfc8627)（例如Chrome、Firefox），并使用-PixelStreamingWebRTCEnableFlexFec。然而，请注意这样将采用更多的比特率。

你可以根据稳健性对体验的重要程度以及用户遇到冻结和抖动缓冲区增长的频率来调整这些指标。

## 通用速度建议

虽然速度建议会视调整体验的方式而有所不同，但1080p流送中的H.264视频的一些通用准则如下。

用户网络连接：

-   **10-20兆比特/秒：** 将体验到良好的视觉质量；
-   **1.5-10兆比特/秒：** 在低端，随着网络波动，用户可能会体验到一些明显的视觉质量变化（例如，运动过程中的像素化在视频静止时会变得清晰）；
-   **0.5-1.5兆比特/秒：** 用户将获得像素化体验；
-   **0-0.5兆比特/秒：** 有可能无法使用。

这些取决于视频质量、延迟和稳健性目标。

### 导致低质量流送的因素

多种因素可能导致流送质量不佳。不过，最常见的因素如下：

-   用户端可实现的最大网络速度对于目标视频质量来说太低；
-   用户所处的网络环境较差，并遇到间歇性/突发性数据包丢失；
-   与流送实例的地理接近度（额外的延迟会使数据包丢失的可能性更大，这会导致流送质量下降，因为WebRTC会尝试通过降低比特率来稳定流送体验）；
-   体验的默认视频质量对于用户的网络连接来说太高，并且随着数据包丢失，抖动缓冲区会增加，导致在流送适应的初始阶段比特率降低；
-   TURN/中继服务器引入了延迟和额外的数据包丢失点（UDP）或数据包重传（TCP）；
-   媒体服务器/SFU引入了延迟和额外的数据包丢失点；
-   错误配置的媒体服务器/SFU会引入关于比特率和控制消息的抽象，而这些抽象不会传回像素流送实例。因此，流送源永远不会根据所需的反馈进行更新，以将体验调整为连接对等体的可用状态。

## WebRTC优化三角形

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13a35cbe-401c-4dc2-9baf-c5278588744d/balanceddiagram.png)

在某些流送场景中，可能需要优化流送设置以更好地满足所需结果。

延迟、视频质量和流送稳健性是流送提供商最关注的三个参数，他们会根据需求优化这三个参数，以调整流送。这将需要限制一个或两个（有时）其他参数，因为它们最终会因网络限制而紧密关联。

默认情况下，像素流送会尝试在这些配置之间实现最佳平衡，并根据用户的连接进行调整，如上图所示。

### 以牺牲质量和稳健性为代价来优化低延迟

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82a94d0b-a784-4cc2-a858-19024881797b/lowlatencydiagram.png)

在本地流送情况下，例如VCam像素流送，优化流送以实现低延迟并在稳健性和视频质量上妥协可能会有利。这可以通过以下参数实现：

```cpp
-PixelStreamingEncoderTargetBitrate=10000000
-PixelStreamingWebRTCDisableFrameDropper
-PixelStreamingWebRTCVideoPacingFactor=100
```

在此示例中，无论网络状况如何，我们都将比特率锁定为目标10兆比特/秒，禁用丢帧，以便即使出现拥塞仍始终发送帧，并在视频节奏器中设置一个宽容值以接受大量数据包。这样，无论网络状况如何，我们都可以无延迟发送数据包，从而确保实现最小延迟。此配置在互联网上是不可取的，因为互联网的速度受到更多限制，而丢弃帧和调整数据包速度有助于在不同的网络条件下实现流畅体验。

### 以延迟和稳健性为代价来优化质量

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fa1f34e-5377-48e1-8ee4-aee65d8b09de/qualitydiagram.png)

在不同的流送场景中，流送提供商无论如何都会以一定的视觉保真度为目标，例如对于奢华产品配置器，优化质量并在延迟和稳健性上妥协可能会有利。这可以通过使用以下配置来实现：

```cpp
-PixelStreamingEncoderMinQuality=70
```

此配置限制了编码器将产生的最大压缩率（值越低，图像压缩率越少），直接转化为保证的最低视频质量。但是，如果消费者的网络连接无法处理此比特率，他们将遇到卡顿，并且延迟增加。

-   [guide](https://dev.epicgames.com/community/search?query=guide)
-   [pixel streaming](https://dev.epicgames.com/community/search?query=pixel%20streaming)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [WebRTC](/documentation/zh-cn/unreal-engine/stream-tuning-guide#webrtc)
-   [图像质量](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E5%9B%BE%E5%83%8F%E8%B4%A8%E9%87%8F)
-   [WebRTC编码器码率适应](/documentation/zh-cn/unreal-engine/stream-tuning-guide#webrtc%E7%BC%96%E7%A0%81%E5%99%A8%E7%A0%81%E7%8E%87%E9%80%82%E5%BA%94)
-   [在不同网络状态下保留图像质量](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E5%9C%A8%E4%B8%8D%E5%90%8C%E7%BD%91%E7%BB%9C%E7%8A%B6%E6%80%81%E4%B8%8B%E4%BF%9D%E7%95%99%E5%9B%BE%E5%83%8F%E8%B4%A8%E9%87%8F)
-   [延迟](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E5%BB%B6%E8%BF%9F)
-   [达到最低的延迟](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E8%BE%BE%E5%88%B0%E6%9C%80%E4%BD%8E%E7%9A%84%E5%BB%B6%E8%BF%9F)
-   [弹性](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E5%BC%B9%E6%80%A7)
-   [让流送在较差的网络状态下保持弹性](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E8%AE%A9%E6%B5%81%E9%80%81%E5%9C%A8%E8%BE%83%E5%B7%AE%E7%9A%84%E7%BD%91%E7%BB%9C%E7%8A%B6%E6%80%81%E4%B8%8B%E4%BF%9D%E6%8C%81%E5%BC%B9%E6%80%A7)
-   [耦合和解耦模式](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E8%80%A6%E5%90%88%E5%92%8C%E8%A7%A3%E8%80%A6%E6%A8%A1%E5%BC%8F)
-   [耦合模式](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E8%80%A6%E5%90%88%E6%A8%A1%E5%BC%8F)
-   [解耦模式](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E8%A7%A3%E8%80%A6%E6%A8%A1%E5%BC%8F)
-   [注意事项](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
-   [为像素流送优化你的应用](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E4%B8%BA%E5%83%8F%E7%B4%A0%E6%B5%81%E9%80%81%E4%BC%98%E5%8C%96%E4%BD%A0%E7%9A%84%E5%BA%94%E7%94%A8)
-   [在一对一流送中实现最佳性能](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E5%9C%A8%E4%B8%80%E5%AF%B9%E4%B8%80%E6%B5%81%E9%80%81%E4%B8%AD%E5%AE%9E%E7%8E%B0%E6%9C%80%E4%BD%B3%E6%80%A7%E8%83%BD)
-   [延迟](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E5%BB%B6%E8%BF%9F-2)
-   [注意事项](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9-2)
-   [视频质量](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E8%A7%86%E9%A2%91%E8%B4%A8%E9%87%8F)
-   [稳健性](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E7%A8%B3%E5%81%A5%E6%80%A7)
-   [通用速度建议](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E9%80%9A%E7%94%A8%E9%80%9F%E5%BA%A6%E5%BB%BA%E8%AE%AE)
-   [导致低质量流送的因素](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E5%AF%BC%E8%87%B4%E4%BD%8E%E8%B4%A8%E9%87%8F%E6%B5%81%E9%80%81%E7%9A%84%E5%9B%A0%E7%B4%A0)
-   [WebRTC优化三角形](/documentation/zh-cn/unreal-engine/stream-tuning-guide#webrtc%E4%BC%98%E5%8C%96%E4%B8%89%E8%A7%92%E5%BD%A2)
-   [以牺牲质量和稳健性为代价来优化低延迟](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E4%BB%A5%E7%89%BA%E7%89%B2%E8%B4%A8%E9%87%8F%E5%92%8C%E7%A8%B3%E5%81%A5%E6%80%A7%E4%B8%BA%E4%BB%A3%E4%BB%B7%E6%9D%A5%E4%BC%98%E5%8C%96%E4%BD%8E%E5%BB%B6%E8%BF%9F)
-   [以延迟和稳健性为代价来优化质量](/documentation/zh-cn/unreal-engine/stream-tuning-guide#%E4%BB%A5%E5%BB%B6%E8%BF%9F%E5%92%8C%E7%A8%B3%E5%81%A5%E6%80%A7%E4%B8%BA%E4%BB%A3%E4%BB%B7%E6%9D%A5%E4%BC%98%E5%8C%96%E8%B4%A8%E9%87%8F)
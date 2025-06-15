# 虚幻引擎中SMPTE 2110标准下的NDisplay工作流程 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/ndisplay-workflows-for-smpte-2110-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:27:57.132Z

---

目录

![NDisplay工作流程](https://dev.epicgames.com/community/api/documentation/image/0ad4ecac-4110-4b4a-b9a8-3c62b4631873?resizing_type=fill&width=1920&height=335)

本指南将介绍如何使用NVIDIA Rivermax设置SMPTE 2110，从而与nDisplay配合使用，特别针对使用摄像机内视觉特效处理（ICVFX）和LED墙的情况。

### nDisplay ICVFX摄像机流送

媒体共享和屏幕外渲染的集成为大家提供了一种利用SMPTE 2110媒体源和输出的方法，让群集的性能可以得到进一步优化。 你可以将每台ICVFX摄像机的渲染转移到对应的机器上，然后用SMPTE 2110的组播功能将这些摄像机的流送传输到依赖它们的其他节点上。

这意味着你可以让渲染节点专门用于渲染摄像机，这通常比在所有渲染节点上渲染所有内视锥体的效果更好。 使用这种配置时，你不会改变虚幻引擎向墙体发送像素的方式。 合成器节点仍会使用同步卡，以同步的方式发送输出。 但是，专门用于渲染内视锥体的渲染节点则不需要同步卡。 此外，在此配置中，虚幻引擎实例之间共享的SMPTE 2110流送将不使用精确时间协议（PTP）来计时。

[![SMPTE ST 2110 ICVFX摄像机流送。](https://dev.epicgames.com/community/api/documentation/image/5dd16241-4b44-40b2-bd18-70f98abd2681?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/5dd16241-4b44-40b2-bd18-70f98abd2681?resizing_type=fit)

SMPTE ST 2110 ICVFX摄像机流送。

此处的示例说明了如何配置由三个节点和两台ICVFX摄像机组成的群集。 示例从现有的舞台配置开始，展示了将其转换为利用这些新组件的过程。

#### 节点配置

1.  转到**内容浏览器**，搜索后打开你的nDisplay配置。 示例中的文件名为**NDC\_MyStage**：
    
    [![image alt text](https://dev.epicgames.com/community/api/documentation/image/ad64e372-6a1e-4b8e-b4ae-837feb6d9ba8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ad64e372-6a1e-4b8e-b4ae-837feb6d9ba8?resizing_type=fit)
    
    此配置用3个节点驱动墙体，且每个节点均渲染了一组视口。 这些内容不得修改。
    
    节点
    
    视口（Viewports）
    
    Node\_1
    
    VP\_W1
    
    Node\_2
    
    VP\_W2
    
    Node\_3
    
    VP\_C1 VP\_C2
    
2.  同时还存在两台ICVFX摄像机。 针对每台摄像机，请点击**+添加（+Add）**，然后选择**添加新群集节点（Add New Cluster Node）**，以创建用于渲染该摄像机的节点。
    
    [![添加按钮的选项](https://dev.epicgames.com/community/api/documentation/image/1cf6a1b2-7880-45fc-940d-eb9b8d11319e?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1cf6a1b2-7880-45fc-940d-eb9b8d11319e?resizing_type=fit)
    
    为每个节点执行以下操作：
    
    -   为其命名，以标识要渲染的摄像机。
        
    -   禁用**调整群集节点位置以防止重叠（Adjust Cluster Node Position to Prevent Overlap）**。
        
    -   禁用**为新群集节点添加视口（Add Viewport to New Cluster Node）**。
        
    -   设置所需的主机IP。
        
    -   启用无头渲染（Headless Rendering）。
        
    -   如果系统有多个图形适配器，请进行配置。
        
3.  配置完成后，你的**添加新群集节点（Add New Cluster Node）**对话框应与下图类似。
    
    [![添加新群集节点对话框的选项](https://dev.epicgames.com/community/api/documentation/image/1bdd43da-05ad-43e2-b53a-3c6c49dfb6d8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1bdd43da-05ad-43e2-b53a-3c6c49dfb6d8?resizing_type=fit)
    
4.  创建节点后，你的群集应与下图类似：
    
    [![群集节点](https://dev.epicgames.com/community/api/documentation/image/de23ac8e-0d1e-4a6f-bccb-e1f3a3351f3c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/de23ac8e-0d1e-4a6f-bccb-e1f3a3351f3c?resizing_type=fit)
    

#### 媒体配置 – ICVFX摄像机A输出

配置好专门渲染摄像机视锥体的节点后，请继续下一步并配置媒体共享。

1.  转到舞台大纲视图，选择**ICVFXCameraA**。
    
    [![选择ICVFXCameraA](https://dev.epicgames.com/community/api/documentation/image/ea2474ee-90fe-4e0c-9a93-08078260576b?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ea2474ee-90fe-4e0c-9a93-08078260576b?resizing_type=fit)
    
2.  在**细节（Details）**面板中，找到**媒体（Media）**分段：
    
    [![细节面板中的媒体分段](https://dev.epicgames.com/community/api/documentation/image/59805889-aa54-4c73-84c3-ff1522dea68a?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/59805889-aa54-4c73-84c3-ff1522dea68a?resizing_type=fit)
    
3.  勾选**启用（Enable）**复选框。
    
4.  添加一个**媒体输出群组（Media Output Group）**。 你将在此处配置渲染此内视锥体的节点，以及它的共享方式。
    
5.  你需要用来渲染此摄像机的节点是**ICVFXCameraA** 的**Node\_CamA**。 如果你要配置ICVFXCameraB，请改为选择Node\_CamB。
    
6.  将**媒体输出类型（MediaOutput type）**配置为**Nvidia Rivermax输出（Nvidia Rivermax Output）**，以使用ST 2110进行共享。 此处的某些设置尤为重要：
    
    -   将**对齐模式（Alignment Mode）**设为**帧创建（Frame Creation）**，即一旦有视锥体的渲染结果，输出就会立即开始流送，并始终遵守流送的帧间隔配置。
        
    -   将**帧锁定（Frame Locking）**模式设为**在预留时阻止（Block On Reservation）**，以确保共享所有渲染的帧。
        
    -   启用**DoFrameCounterTimestamp**。 这将在视频流中嵌入虚幻引擎的帧号，接收节点将使用该编号来辨识取样对应的帧。
        
    -   无需强制执行**分辨率（Resolution）**，因为一旦捕获视锥体，虚幻引擎就会自动检测其大小。
        
    -   **帧率（Frame Rate）**非常重要。 2110标准与SDI一样，在整个帧间隔内传输单个视频帧。 如果将2110视频流送配置为24 FPS，则每一帧需要41毫秒才能完全被监听器接收到。 为减少延迟，且具体视网卡的可用带宽而定，请将帧率配置为快于群集所表示的速率。 这意味着，对于以24 FPS运行的群集而言，你应该以比这更快的速度向外流送内视锥体。 最好使用48、60或更快的帧率，但也要考虑带宽的占用。
        
    -   针对**接口地址（Interface Address）**，请使用通配符以使配置尽可能灵活，从而确保在不同IP的不同机器上运行。
        
    -   针对**流送地址（Stream Address）**，请选择唯一的组播地址，以避免两个内视锥体在同一地址上流送。 出现这种情况时，接收器将无法区分两者。 此处示例中，CameraA使用225.1.1.10，而CameraB则使用225.1.1.11。
        
    -   此处无需进行**捕获同步（Capture Synchronization）**，因为该流送并不会上墙。
        

你的输出配置应类似于下图：

[![SMPTE 2110 nDisplay ICVFX输出设置项的配置。](https://dev.epicgames.com/community/api/documentation/image/c1cdb3dd-4971-43c4-b7ca-b5fe166a876d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/c1cdb3dd-4971-43c4-b7ca-b5fe166a876d?resizing_type=fit)

SMPTE 2110 nDisplay ICVFX输出设置项的配置。

#### 媒体配置 – ICVFX摄像机A输入

之前已经完成了ICVFXCameraA渲染的输出端配置，现在可以开始处理接收端了。 接下来，你将配置接收共享渲染的节点，以及接收方式。

1.  首先，添加一个 **媒体输入群组（Media Input Group）**。
    
2.  添加接收此输出的**群集节点（Cluster Nodes）**。 在本案例中，你需要的是所有驱动着墙体的节点（Node\_1、Node\_2和Node\_3）。
    
3.  要接收使用ST 2110的共享渲染，请将**媒体源（Media Source）**配置为**Rivermax媒体源（Rivermax Media Source）**。 要让低延迟帧锁正常工作，需要正确设置某些设置项。
    
    -   针对**播放器模式（Player Mode）**，请使用**帧锁（Framelock）**，以让接收器在每次渲染时等待预期的帧。 若使用嵌入的帧编号，虚幻引擎的接收端实例可将视频样本与当前帧号相匹配。 如果帧尚未到达，接收端实例将等待，因为预期设置是帧终将到来。
        
    -   你可以通过**使用零延迟（Use Zero Latency）**选项，让接收端的虚幻引擎实例在不增加延迟的情况下等待与当前帧号相匹配的帧号。 这一点可能无法实现，具体视内容而定。因此你可以选择增加一帧延迟，从而留出更多余量来等待内视锥体。
        
    -   无需强制执行**分辨率（Resolution）**，因为接收端的虚幻引擎实例会在接收到流送时自动检测分辨率。
        
    -   使用与输出端相同的速率配置**帧率（Frame Rate）**。
        
    -   针对**接口地址（Interface Address）**，请再次使用通配符，因为群集的多个节点都将使用该地址，而它们的接口IP不会相同。
        
    -   根据输出端的配置，配置对应的**流送地址（Stream Address）**和**端口（Port）**。
        
    -   你可以启用**GPU Direct**，但请确保GPU和DPU（Mellanox网卡）位于同一个根复合体上。 如果两者不在同一个根复合体上，2110数据包可能会丢失，尤其是在处理多输入流时。
        
    -   要在输入端完全启用GPU Direct，请在虚幻引擎启动时或开启Rivermax流送之前，设置`Rivermax.GPUDirectInput=1`。
        

你的输入配置应类似于下图：

[![SMPTE 2110 nDisplay ICVFX输入设置项的配置。](https://dev.epicgames.com/community/api/documentation/image/74926140-f38d-45c9-ba90-3cfa126a8b5d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/74926140-f38d-45c9-ba90-3cfa126a8b5d?resizing_type=fit)

SMPTE 2110 nDisplay ICVFX输入设置项的配置。

你的ICVFXCameraA现已配置为从一个渲染节点共享到群集。 媒体设置应类似于下图：

[![SMPTE 2110 nDisplay ICVFX媒体设置项的配置。](https://dev.epicgames.com/community/api/documentation/image/68ee32ac-1ec6-4d08-8534-b80d5855aad8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/68ee32ac-1ec6-4d08-8534-b80d5855aad8?resizing_type=fit)

SMPTE 2110 nDisplay ICVFX媒体设置项的配置。

#### 媒体配置 – ICVFX摄像机B

完成ICVFXCameraA的配置后，就可以配置ICVFXCameraB，两者使用的设置基本相同，但以下细节除外：

1.  媒体输出群组
    
    -   渲染ICVFXCameraB的**群集节点（Cluster Node）**是Node\_CamB。
        
    -   **流送地址（Stream Address）**必须不同。 使用225.1.1.11，但**端口（Port）**编号必须相同。
        
2.  媒体输入群组
    
    -   仅**流送地址（Stream Address）**的设置必须更改，以匹配输出配置。在此示例中即225.1.1.11。
        

你可以为2110流送使用更快的帧率，以减少延迟。 这会造成更高的带宽开销，因此请根据具体网络配置加以考虑。 如果同一网络上还有其他设备在使用带宽，则必须一并纳入考虑。

示例带宽占用：

-   4k24 RGB10
    
    -   ~6.3Gb/s
        
-   4k48 RGB10
    
    -   ~12.6Gb/s
        
-   8k24 RGB10
    
    -   ~25Gb/s
        
-   8k48 RGB10
    
    -   ~50Gb/s
        

### nDisplay ICVFX摄像机流送和同步输出（试验性）

#### 要求

另一个可更新的nDisplay区域涉及如何将渲染内容发送到LED墙。 你现在可以直接从网卡发送ST 2110流送，而不是从GPU发送。 通过逐节点提供通用的PTP时间参考，你可以帧锁并同步发送到LED墙的所有流送，而无需依赖同步卡。

这需要：

-   生成PTP的主时钟。
    
-   支持ST 2110流送的交换机。
    
-   兼容的Nvidia网卡，例如ConnectX-6 BlueField-2卡。
    
-   LED处理器还必须能够接收ST 2110流送。
    

[![SMPTE ST 2110 ICVFX同步摄像机流送。](https://dev.epicgames.com/community/api/documentation/image/e1f4f6e9-3373-4476-951f-764bf67f9946?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e1f4f6e9-3373-4476-951f-764bf67f9946?resizing_type=fit)

SMPTE ST 2110 ICVFX同步摄像机流送。

如此配置后，所有节点都将被配置为无头或屏幕外。 由于不使用GPU进行流送，因此无需配置马赛克或处理EDID设置。 不过，所有节点的PTP时间参考必须始终有效。

要使此配置生效，**部署阶段提到的有关PTP设置的可选部分都为必选项。**

#### 配置基础项

就nDisplay配置而言，此功能不会改变ICVFX摄像机流送的配置方式。 相反，该功能利用了你可以在节点级别设置的媒体输出配置，从而向外流送由给定节点渲染的最终后备缓冲区。 同时必须配置帧锁。

在配置各节点的窗口大小时，可能会存在一些限制，具体视接收流的LED处理器而定。 如果同一个处理器接收了两份流送，那么你可能需要使各份流送大小相等。 下文将介绍如何为前文所述的示例群集强制执行这一限制。

[![使用原始配置的3节点流送。](https://dev.epicgames.com/community/api/documentation/image/7146cb41-140a-4de5-8378-261abed4a321?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/7146cb41-140a-4de5-8378-261abed4a321?resizing_type=fit)

使用原始配置的3节点流送。

示例中有三个节点需要发送，分别是Node\_1、Node\_2和Node\_3。 由于不存在分辨率限制，你可以尽可能缩小节点的窗口，从而仅发送最低限度的所需像素。 这时，你应添加一条限制，从而将Node\_1和Node\_2的窗口设置为相同大小。 当作它们使用了相同的LED处理器。 Node\_3的流送将不具有此限制，窗口大小也会不同。

#### 节点配置 – Node\_1和Node\_2

从Node\_1和Node\_2的配置开始。 在原始配置中：

-   Node\_1使用全屏节点，窗口大小为7680x2160，视口大小为2640x1408。
    
-   Node\_2使用全屏节点，窗口大小为3840x2160，视口大小为3344x1408。
    

[![Node_1的原始示例配置设置项。](https://dev.epicgames.com/community/api/documentation/image/ea1610af-cbda-43d4-ae0d-e461bbc0806a?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ea1610af-cbda-43d4-ae0d-e461bbc0806a?resizing_type=fit)

Node\_1的原始示例配置设置项。

[![VP_W1视口中使用原始示例设置的Node_1流送。](https://dev.epicgames.com/community/api/documentation/image/ccb451c3-36ee-4d1f-aa02-a4359a097f81?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ccb451c3-36ee-4d1f-aa02-a4359a097f81?resizing_type=fit)

VP\_W1视口中使用原始示例设置的Node\_1流送。

[![VP_W2视口中使用原始示例设置的Node_2流送。](https://dev.epicgames.com/community/api/documentation/image/ab881ed7-3848-4f0d-83b0-cc705920fe74?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/ab881ed7-3848-4f0d-83b0-cc705920fe74?resizing_type=fit)

VP\_W2视口中使用原始示例设置的Node\_2流送。

1.  由于视口VP\_W2最大，因此请使Node\_1和Node\_2使用相同的设置，并使用VP\_W2的3344x1408大小。
    
2.  启用**无头渲染（Headless Rendering）**设置，以将两个节点设置为屏幕外，并禁用**全屏（Fullscreen）**设置。
    

[![Node_1和Node_2的修改设置。](https://dev.epicgames.com/community/api/documentation/image/f951870d-46c1-4ded-a328-0ebfa951b1e5?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f951870d-46c1-4ded-a328-0ebfa951b1e5?resizing_type=fit)

Node\_1和Node\_2的修改设置。

[![修改设置后，VP_W1视口内的Node_1流送。](https://dev.epicgames.com/community/api/documentation/image/485e725c-d7d2-4869-a938-3fc9161e12ea?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/485e725c-d7d2-4869-a938-3fc9161e12ea?resizing_type=fit)

修改设置后，VP\_W1视口内的Node\_1流送。

[![修改设置后，VP_W2视口内的Node_2流送。](https://dev.epicgames.com/community/api/documentation/image/52f1130b-a340-432b-a1ed-f7a863366848?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/52f1130b-a340-432b-a1ed-f7a863366848?resizing_type=fit)

修改设置后，VP\_W2视口内的Node\_2流送。

这一改动为Node\_1的流送增加了额外的像素，从而使其与Node\_2的流送大小相匹配。 当视口不完全相等时，必须考虑其在各个节点上的组织形式，以尽量减少带宽浪费。

现在请配置各节点的媒体输出。 你可以在节点级别（最终后备缓冲区）和视口级别配置媒体。 必须要在节点上进行此配置，以发送最终合成和扭曲后的结果。

1.  选择Node\_1并找到其媒体（Media）分段：
    
    [![Node 1的媒体分段](https://dev.epicgames.com/community/api/documentation/image/5799e54b-1bde-4fc5-9da5-c620a90d58ba?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/5799e54b-1bde-4fc5-9da5-c620a90d58ba?resizing_type=fit)
    
2.  启用**媒体（Media）**配置：
    
    [![启用媒体（Media）配置](https://dev.epicgames.com/community/api/documentation/image/31108eb8-3ad3-47a7-8e79-14f74ac2063e?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/31108eb8-3ad3-47a7-8e79-14f74ac2063e?resizing_type=fit)
    
3.  添加**媒体输出**：
    
    [![添加媒体输出](https://dev.epicgames.com/community/api/documentation/image/8e7c63f3-38df-4533-b4c3-54900b1cbf10?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/8e7c63f3-38df-4533-b4c3-54900b1cbf10?resizing_type=fit)
    
4.  将媒体输出配置为**NVIDIA Rivermax Output**，并配置相应的设置：
    
    -   **对齐模式（Alignment Mode）：AlignmentPoint**。 你需要使用PTP时间参考，将输出与同步锁定相对齐。因此你需要在已知的对齐点发送输出。
        
    -   **进行连续输出（Do Continuous Output）：True**。 如果某帧未能及时渲染，则必须继续输出并重复上一帧。
        
    -   **帧锁定模式（Frame Locking Mode）：在预留时阻止（Block on Reservation）**。 你需要流送所有渲染的帧。
        
    -   **演示队列大小（Presentation Queue Size）：2**。 双重缓冲是将延迟降至最低的理想选择。
        
    -   **纹理缓冲区的数量（Number of Texture Buffers）：3**。 此项无硬性要求。
        
    -   **分辨率（Resolution）：取消选中**。 无需强制执行分辨率。 不选中此项，从而按节点的后备缓冲区大小创建流送。
        
    -   **帧率（Frame Rate）：***视项目而定*。 示例使用24 FPS，但你的项目可以使用不同的设置。
        
    -   **像素格式（Pixel Format）：RGB10**。 因项目而异。接收器（LED处理器）必须支持该格式。
        
    -   **接口地址（Interface Address）：10.69.70.***。 本示例中的所有节点都位于子网10.69.70.*中，以便于更换渲染各节点的机器。 在八位数的最后一位上使用通配符，表示所选节点能够解析到其本地的接口地址。
        
    -   **流送地址（Stream Address）**：*唯一的Node\_1流送地址*。 请为本例使用**225.1.2.1**，并递增所有节点的八位数最后一位，从而让每个节点都拥有唯一的组播地址。 请确保此处使用的组播群组尚未在网络中使用，以避免争用。
        
    -   **端口（Port）：50000**。 本例中所有节点都使用50000，且只有组播地址会发生变化。
        
    -   **使用GPUDirect（Use GPUDirect）：False**。 目前帧锁的ST 2110输出不支持此功能。
        
    
    [![配置完成后的媒体输出设置](https://dev.epicgames.com/community/api/documentation/image/a770c9db-2428-491b-b401-32b596654d97?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/a770c9db-2428-491b-b401-32b596654d97?resizing_type=fit)
    
5.  将**捕获同步（Capture Synchronization）**配置为使用**Rivermax (PTP)**。 这将启用一种机制，该机制通过使用以太网同步屏障，利用整个群集的通用PTP时间参考，在整个群集内强制执行帧锁。
    
    -   **余量（Margin）（毫秒）：5**。 使用默认值。 节点即将进入捕获同步屏障时引用的时间余量，就在将帧排入队列进行演示之前。 如果检测到离下一个对齐点太近（按余量算），则会延迟进入屏障。
        
    -   **屏障超时（Barrier Timeout）（毫秒）：3000**。 使用默认值。 若部分节点在超时结束前尚未加入，则此值表示退出屏障的超时时间。
        
    
    [![配置完成后的捕获同步设置](https://dev.epicgames.com/community/api/documentation/image/65af75b0-bce4-4084-b2b4-7e3c9478d11c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/65af75b0-bce4-4084-b2b4-7e3c9478d11c?resizing_type=fit)
    

Node\_1 的配置就此完成，其设置应如下所示：

[![针对nDisplay ICVFX摄像机流送和同步输出示例的Node_1媒体设置。](https://dev.epicgames.com/community/api/documentation/image/7aef1779-6c2e-44a0-9daf-861d8ec10913?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/7aef1779-6c2e-44a0-9daf-861d8ec10913?resizing_type=fit)

针对nDisplay ICVFX摄像机流送和同步输出示例的Node\_1媒体设置。

Node\_1配置完成后，请继续配置Node\_2。 其配置应与Node\_1相同，但**流送地址（Stream Address）**除外，因为必须**唯一**。

1.  将Node\_2设置为与Node\_1相同。
    
2.  将Node\_2的**流送地址（Stream Address）**设为225.1.2.2。
    

Node\_2的最终配置如下：

[![针对nDisplay ICVFX摄像机流送和同步输出示例的Node_2媒体设置。](https://dev.epicgames.com/community/api/documentation/image/80fa0f98-b858-44f1-8aba-b459e3f263bb?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/80fa0f98-b858-44f1-8aba-b459e3f263bb?resizing_type=fit)

针对nDisplay ICVFX摄像机流送和同步输出示例的Node\_2媒体设置。

#### 节点配置 – Node\_3

现在请配置Node\_3。 在上文的原始示例中，两个视口之间存在间隙。

[![原始的示例设置中视口间存在间隙、](https://dev.epicgames.com/community/api/documentation/image/d526f25a-24ec-4dce-a790-207e6e74ddde?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/d526f25a-24ec-4dce-a790-207e6e74ddde?resizing_type=fit)

原始的示例设置中视口间存在间隙、

为减少空间浪费，你可以配置视口以消除这一间隙。

[![配置视口以消除间隙。](https://dev.epicgames.com/community/api/documentation/image/5beafa52-aad5-45b8-a7f3-0b3e58a63587?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/5beafa52-aad5-45b8-a7f3-0b3e58a63587?resizing_type=fit)

配置视口以消除间隙。

然后，像对Node\_1和Node\_2所做的那样，将此节点配置为无头节点，并将其窗口大小调整为包含两个视口所需的最小大小。

1.  将**窗口大小（Window Size）**设置为6336x1408，而不是7680x2160。
    
2.  启用**无头渲染（Headless Rendering）**。
    

[![修改后的Node_3设置。](https://dev.epicgames.com/community/api/documentation/image/42a7b117-f44c-4097-9066-730846b19156?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/42a7b117-f44c-4097-9066-730846b19156?resizing_type=fit)

修改后的Node\_3设置。

[![VP_C1和VP_C2视口中显示的Node_3流送。](https://dev.epicgames.com/community/api/documentation/image/afb1e327-4228-49f9-bbc0-cbae4ab0fe65?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/afb1e327-4228-49f9-bbc0-cbae4ab0fe65?resizing_type=fit)

VP\_C1和VP\_C2视口中显示的Node\_3流送。

接下来，配置Node\_3的媒体输出配置。 同样地，采用与Node\_1和Node\_2相同的设置，但流送地址除外，它需要在群集中唯一。

1.  将Node\_3设置为与Node\_1和Node\_2相同。
    
2.  将Node\_3的**流送地址（Stream Address）**设为225.1.2.3。
    

配置完成后，你的群集现在将使用5个组播群组：

1.  225.1.1.10:50000：ICVFXCameraA
    
2.  225.1.1.11:50000：ICVFXCameraB
    
3.  225.1.2.1:50000 ：Node\_1
    
4.  225.1.2.2:50000 ：Node\_2
    
5.  225.1.2.3:50000 ：Node\_3
    

Node\_3的最终配置如下：

[![针对nDisplay ICVFX摄像机流送和同步输出示例的Node_3媒体设置。](https://dev.epicgames.com/community/api/documentation/image/eac922f9-9623-4c0e-ab6d-fb2f3a634d67?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/eac922f9-9623-4c0e-ab6d-fb2f3a634d67?resizing_type=fit)

针对nDisplay ICVFX摄像机流送和同步输出示例的Node\_3媒体设置。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [图形](https://dev.epicgames.com/community/search?query=%E5%9B%BE%E5%BD%A2)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [nDisplay ICVFX摄像机流送](/documentation/zh-cn/unreal-engine/ndisplay-workflows-for-smpte-2110-in-unreal-engine#n-display-icvfx-camera-streaming)
-   [节点配置](/documentation/zh-cn/unreal-engine/ndisplay-workflows-for-smpte-2110-in-unreal-engine#node-configuration)
-   [媒体配置 – ICVFX摄像机A输出](/documentation/zh-cn/unreal-engine/ndisplay-workflows-for-smpte-2110-in-unreal-engine#media-configuration-icvfx-camera-a-output)
-   [媒体配置 – ICVFX摄像机A输入](/documentation/zh-cn/unreal-engine/ndisplay-workflows-for-smpte-2110-in-unreal-engine#media-configuration-icvfx-camera-a-input)
-   [媒体配置 – ICVFX摄像机B](/documentation/zh-cn/unreal-engine/ndisplay-workflows-for-smpte-2110-in-unreal-engine#media-configuration-icvfx-camera-b)
-   [nDisplay ICVFX摄像机流送和同步输出（试验性）](/documentation/zh-cn/unreal-engine/ndisplay-workflows-for-smpte-2110-in-unreal-engine#n-display-icvfx-camera-streaming-and-synchronous-output-experimental)
-   [要求](/documentation/zh-cn/unreal-engine/ndisplay-workflows-for-smpte-2110-in-unreal-engine#requirements)
-   [配置基础项](/documentation/zh-cn/unreal-engine/ndisplay-workflows-for-smpte-2110-in-unreal-engine#configuration-basics)
-   [节点配置 – Node\_1和Node\_2](/documentation/zh-cn/unreal-engine/ndisplay-workflows-for-smpte-2110-in-unreal-engine#node-configuration-node-1-and-node-2)
-   [节点配置 – Node\_3](/documentation/zh-cn/unreal-engine/ndisplay-workflows-for-smpte-2110-in-unreal-engine#node-configuration-node-3)
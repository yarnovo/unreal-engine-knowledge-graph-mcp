# 虚幻引擎中的SMPTE 2110媒体IO工作流程 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/smpte-2110-media-io-workflows-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:27:26.966Z

---

目录

![SMPTE 2110媒体IO工作流程](https://dev.epicgames.com/community/api/documentation/image/ce46b71f-0952-4532-a2f1-74f02378b03d?resizing_type=fill&width=1920&height=335)

本指南提供以下两方面的说明：设置基本流送输出；按SMPTE 2110标准使用Nvidia Rivermax在本地网络接收流送。

由于Rivermax-SMPTE 2110视频流送的支持建立在媒体IO的框架之上，因此你可以像在引擎内外使用串行数字接口（SDI）视频流送一样使用它。

## 配置输出流

要让虚幻引擎视口在网络上可用，你可以通过SMPTE 2110媒体流组播虚幻引擎视口。另一台机器上的虚幻引擎实例可以接收到该媒体流。

配置完成后，此示例流将使用4k（3840 x 2160）30帧每秒的RGB10像素格式。

1.  启用插件 **NVIDIA Rivermax媒体流送和媒体框架实用工具（NVIDIA Rivermax Media Streaming and Media Framework Utilities）** 。
    
2.  打开媒体捕获（MediaCapture）面板。
    
    -   在菜单中选择 **窗口（Window） > 虚拟制片（Virtual Production） > 媒体捕获（Media Capture）** ，
    
    ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83926a17-6c3f-457e-b793-f989cc102585/image_0.png)
3.  创建一份Rivermax媒体输出（Rivermax Media Output）资产。
    
    -   在内容浏览器（Content Browser）中点击右键，选择 **媒体（Media） > Rivermax媒体输出（Rivermax Media Output）**
4.  在启用了Rivermax的接口上将输出配置为组播，并设置所需的选项。
    
    -   对齐模式（Alignment Mode）：选择 **对齐点（Alignment Point）** 和 **进行连续输出（Do Continuous Output）** ，以生成类似于SDI的输出，这意味着：
        
        -   输出流将与特定时间点对齐，比如引用同步锁定信号。
            
        -   即使没有新的可用帧，输出流也将始终以所需的帧率输出帧。
            
    -   帧锁定：使用 **在预留时阻止（Block on Reservation）** 来避免掉帧。这也会使引擎以30 FPS的演示帧率运行。
        
    -   设置：根据本地网络调整设置，以匹配所需的流送配置。
        
        -   请使用首个匹配 `*.*.*.107` 的网络接口。
            
        -   组播群组为 `225.1.1.1 on port 60000` 。
            
5.  在媒体捕获（Media Capture）面板中选择新配置的资产并开始捕获。
    
    ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a29d58e7-8d0c-4082-a8d4-42e31cbad844/image_1.png)
    
    在媒体捕获（Media Capture）面板中按名称选择Rivermax媒体输出（Rivermax Media Output）资产
    

现在，本地网络上任何兼容2110标准的设备都将可以使用你的视口。现在你可以通过Windows任务管理器的性能选项卡确认你的流送所占用的带宽。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/345afedb-9318-48fd-8a1b-6bb3d8454f7d/image_2.png)

Windows任务管理器显示的流送源网络带宽占用

如果任务管理器中未显示任何活动，请确保你没有将 **视图（View） > 更新速度（Update Speed）** 设为 **暂停（Paused）** 。

## 接收流送的配置

你可以使用Rivermax媒体源从其他虚幻引擎实例或其他外部源接收2110流送。你可以在网络中的另一台机器上配置虚幻引擎，以通过匹配 `*.*.*.108` 的接口接收流送。

1.  创建一份Rivermax媒体源（Rivermax Media Source）资产。
    
    -   在内容浏览器（Content Browser）中点击右键，选择 **媒体（Media） > Rivermax媒体源（Rivermax Media Source）** 。
2.  为要接收的媒体流配置媒体源。
    
    -   **播放器模式（Player Mode）：**请使用"最近（Latest）"模式，因为你的实例之间并不存在同步。
        
    -   系统将根据媒体流自动检测分辨率。
        
    -   将其他设置调整为与输出流的配置一致。
        
        ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa63ac04-c845-479d-9038-ec39b22dbcc9/image_3.png)
        
        Rivermax媒体源（Rivermax Media Source）资产的设置
        

配置完成后，点击顶部菜单栏中的 **打开（Open）** 按钮，即可直接在资产编辑器中预览媒体流。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80f181fd-5f81-403c-b2ef-09572a97eb99/image_4.png)

虚幻引擎接收端实例的资产编辑器中显示的数据流输出。

你可以使用任务管理器的性能选项卡确认流送的带宽占用，并查看网络接口所接收的内容：

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76b60f88-c4bb-4c3a-b5ea-8bcd08df9b93/image_5.png)

Windows任务管理器显示的流送接收端网络带宽占用。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [graphics](https://dev.epicgames.com/community/search?query=graphics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [配置输出流](/documentation/zh-cn/unreal-engine/smpte-2110-media-io-workflows-in-unreal-engine#%E9%85%8D%E7%BD%AE%E8%BE%93%E5%87%BA%E6%B5%81)
-   [接收流送的配置](/documentation/zh-cn/unreal-engine/smpte-2110-media-io-workflows-in-unreal-engine#%E6%8E%A5%E6%94%B6%E6%B5%81%E9%80%81%E7%9A%84%E9%85%8D%E7%BD%AE)
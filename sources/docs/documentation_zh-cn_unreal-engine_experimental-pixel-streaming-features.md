# 试验性的像素流送功能 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/experimental-pixel-streaming-features
> 
> 生成时间: 2025-06-14T20:46:51.277Z

---

目录

![试验性的像素流送功能](https://dev.epicgames.com/community/api/documentation/image/fb0d8ad6-b225-4df3-94d8-775c5ca5fffb?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

下面的功能是令人激动的新工具，已在像素流送中实现。虽然这些功能供了新的可能性，但要注意，功能不稳定，应谨慎使用。 不建议基于这些功能构建你的产品的关键组件，因为这些功能在后续版本的虚幻引擎中可能会更改或删除。

## VCam

VCam是一个新功能，允许你将VCam组件附加到场景中的Actor，并将关卡视口的视频内容流送到输出提供程序。

在此阶段，VCam主要用于虚拟制片用例。它可以与Live Link VCam iOS应用程序配对，并用于ARKit追踪。这很适合在虚幻引擎中导航虚拟摄像机，由像素流送处理触摸事件，并将关卡视口作为实时视频内容流送回iOS设备。如需详细了解Live Link VCam，请前往下面的站点：[iOS Live Link VCam](https://apps.apple.com/au/app/live-link-vcam/id1547309663)

### 如何使用VCam

1.  确保你启用了虚拟摄像机插件
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01c844a8-184e-4820-9fcb-f025eb0a7fb1/vcamplugin.jpg)
2.  添加位于"虚拟制片"下的VCam Actor。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/390edb53-c2d9-4d3b-b005-dc6c04fc072c/vcamactor.png)
3.  添加Actor后，你会看到如下所示的VCam视图：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8cf191b-81f3-4aaf-9f11-5545a3f83005/vcamadded.png)
4.  添加Actor后，它将开始流送。你可以通过像素流送工具栏开始和停止流送。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bdee1c5f-f57a-4953-b709-81f6d65929ad/streamingvcam.png)
5.  开始后，打开本地浏览器并转至127.0.0.1以查看流送的显示内容，或打开Live Link iOS应用程序并浏览到你的计算机的IP地址，然后点击"连接"。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71f0a8e4-1c3d-4418-8f86-21badfd82b56/vcambrowser.png)

如果你想通过浏览器与流交互，请在浏览器中打开控制面板，并将"控制方案（Control Scheme）"更改为"悬停（Hovering）"。

## 使用麦克风

利用像素流送，你现在可以允许通过Web浏览器使用WebRTC音频在引擎中播放特定对等端/播放器麦克风。

### 设置"在项目中使用麦克风"

使你的项目麦克风兼容极其简单，仅需要向你的项目添加一项内容。

1.  启用像素流送插件。
    
2.  在场景中的Actor上，添加 `PixelStreamingAudio` 组件。你可以将其设置保留为默认值。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2f3602c-ab13-4766-859a-705dd5170189/psaudiocomponent.jpg)

每个音频组件会将其自身与特定像素流送播放器/对等端关联（使用像素流送播放器ID）

### 在流中使用麦克风

1.  使用 `PixelStreamingAudio` 组件设置你的项目之后，按照像素流送的正常情况（使用像素流送启动参数打包或独立）运行你的应用程序，并启动你的信令服务器。
    
2.  通过Web浏览器连接到你的信令服务器。
    
3.  打开前端设置面板并将 `Use Mic` 设置为 `true` 。点击底部的 **重启（Restart）** 以重新连接。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f57df89-5c93-48e4-8c64-cb55491294b3/usemic.jpg) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16c3de66-5286-49f9-a1f8-f70c6d7e0737/restartstream.jpg)
4.  你的浏览器可能会请求使用麦克风的权限，请务必允许访问。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c7411bf-5a86-40b7-8a5e-913a1e017267/micperm.jpg)
5.  向麦克风说话，你应该会听到你的声音通过流播放！
    

云流送需要设置HTTPS，详见下文VR指南中创建HPPTS证书的步骤。此外，火狐浏览器需要HTTPS才能在本地和云部署中成功进行麦克风采集。

## 虚拟现实中的像素流送

虚拟现实（VR）像素流送是一种新功能，向用户提供了使用像素流送连接到兼容VR的应用程序的途径。这样用户可以使用自己的头戴设备享受VR体验，而不用运行本地应用程序。

### 设置项目

就本示例而言，我们将使用虚拟现实模板项目。

1.  使用虚拟现实模板创建新项目。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/753dff5c-9e5b-4e70-88a8-b97d275dc149/vrproject.jpg)
2.  启用像素流送插件并禁用OpenXR插件。重启编辑器。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4793c95-9541-4ca9-9fb0-33f0f7b35050/openxrplugin.jpg)  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3870419-8b52-47f5-8676-bc06e0b95178/pixelstreamingplugin.jpg)
    
3.  在内容浏览器（Content Browser）中，搜索"Asset\_Guideline"并删除"B\_AssetGuideline\_VRTemplate"。系统提示时，点击 **强制删除（Force Delete）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8624edb-c5a5-4974-a572-1d3caa487afc/assetguideline.jpg) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/686b3b7c-ddad-45af-82e9-ec42a26aaa30/assetforcedelete.jpg)
4.  现在，在内容浏览器中搜索"VRPawn"。双击打开VRPawn，然后编译蓝图。如果正常工作，它应该会成功编译。保存并关闭此蓝图。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b26589d-5509-47e2-a59d-6316b3aab706/vrpawn.jpg)
5.  打开 **编辑器偏好设置（Editor Preferences）> 关卡编辑器（Level Editor） > 播放（Play）** 并添加 `-PixelStreamingURL=ws://127.0.0.1:8888 -PixelStreamingEnableHMD -ResY=1080`。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5941e6d6-9370-43cb-9084-d45794147d32/launchargsvr.jpg)

你只需指定垂直分辨率即可，因为水平分辨率会自动调整以适应设备的纵横比。请根据你的性能与质量比值来设定最佳分辨率。

### 创建必需证书

你需要HTTPS证书才能将VR用于像素流送。这是因为，WebXR的标准要求该API仅可用于通过安全连接（HTTPS）加载的站点。对于制片用途，你将需要使用安全的来源，以支持WebXR。你可以在此处找到有关这些要求的额外信息：[https://developer.oculus.com/documentation/web/port-vr-xr/#https-is-required](https://developer.oculus.com/documentation/web/port-vr-xr/#https-is-required)。

就本示例而言，我们将通过Gitbash设置基本证书。如果你之前没有安装Gitbash，请前往此处的页面，了解Gitbash的安装步骤：[https://www.atlassian.com/git/tutorials/git-bash](https://www.atlassian.com/git/tutorials/git-bash)。

1.  在 `SignallingWebServer` 目录中创建 `certificates` 文件夹，如下所示：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f15bfd53-459e-48a9-bb38-f12c367f85a2/certificatesfolder.jpg)
2.  在 `certificates` 目录中右键点击，然后打开Gitbash。输入 `openssl req -x509 -newkey rsa:4096 -keyout client-key.pem -out client-cert.pem -sha256 -nodes` 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8c9b6ef-af54-4b33-b470-426131523a98/gitbashcert.jpg)
3.  按Enter键多次，直到命令完成。当certificates文件夹中创建了2个 `.pem` 文件时，命令即完成。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be16e852-cf7c-4ca1-b8e5-e0b1d180ab3f/pemfiles.jpg)
4.  打开位于 `SignallingWebServer` 文件夹中的 `config.json` 文件，将 `https` 值设置为 `true` 。如果缺失`config.json`，请运行一次信令服务器。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5fe821a-edca-4d9f-9b50-e6783f6c6ad6/httptrue.jpg)

你现在应该可以开始运行并测试你的VR应用程序！

上面创建的证书仅用于测试用途。如需完整云部署，你将需要整理恰当的证书。

### 加入VR流

就本示例而言，我们将使用Meta Quest 2。

1.  启动位于 `\SignallingWebServer\platform_scripts\cmd` 中的 `start_with_stun.bat` 脚本
    
2.  返回编辑器，独立运行应用程序。因为你在之前步骤中添加了启动参数，所以它应该在完全启动之后连接到信令服务器。
    
3.  现在使用你的VR头戴设备，打开Web浏览器并输入你的计算机的IP地址。你将看到"连接不安全（Connection not secure）"页面，打开"高级（Advanced）"选项卡并点击"继续到IP（Proceed to IP）"
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e71dbe3b-1e74-4493-ba46-2899795f0d74/notsafecert.jpg)
4.  你应该会在浏览器窗口中看到应用程序流送到两个视图。点击左侧的XR按钮以切换到VR。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a86925b-cf57-443b-a7df-82ab577219aa/xrbutton.jpg)
5.  大功告成！现在你应该位于你的像素流送的VR项目中！
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58c830d8-32df-4e48-a928-71335a1aa99b/invr.jpg)

## 像素流送播放器

像素流送播放器可以让你在虚幻引擎项目的3D空间中的显示屏上显示的活跃像素流送。有了它，你就可以将云托管的内容作为媒体源，本地应用程序中播放。

像素流送播放器是一项实验性功能，其API目前还在开发中。截至5.4版本，像素流送播放器兼容TH264、VPX和AV1解码器。

像素流送播放器的设置在Pixel Streaming 2插件中有所变化。更多详情请参阅[Pixel Streaming 2概览](/documentation/zh-cn/unreal-engine/pixel-streaming-2-overview-in-unreal-engine)。

### 设置像素流送播放器

1.  启用像素流送（Pixel Streaming）和像素流送播放器（Pixel Streaming Player）插件。
    
2.  新建一个 **蓝图** 类（Actor）。保存并根据自身需要为其命名。
    
3.  打开新建的蓝图类，添加两个组件， **PixelStreamingSignalling** 和**PixelStreamingPeer**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/844eaf06-1687-438a-97dd-370c84bb7407/addcomponentpsplay.jpg)
4.  将 **PixelStreamingSignalling** 组件拖入事件图表。从此节点拖出引线，并创建 **Connect** 节点。将 **BeginPlay** 连接到新节点的输入，并在URL值中输入"ws://127.0.0.1:80"。将端口添加到URL字段非常重要，因为像素流送播放器可能无法自动连接到正确的端口。Windows使用80端口，而Linux使用8080端口。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/248d7a3c-53f4-42d4-90e2-19d998c5ca7d/beginconnectnode.jpg)
5.  选择PixelStreamingSignalling组件并通过 **细节** 窗口添加：**On Connected**、**On Config**、**On Offer**和**On Ice Candidate** 事件。通过PixelStreamingPeer节点添加 **On Ice Candidate** 事件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f53ec07c-cedb-44b5-b2fc-391517f95fa0/addeventsps.jpg)
6.  从 **On Connected** 拖出引线，创建 **Get Streamer ID List** 节点。再从此节点的输出拖出引线，并创建 **Subscribe** 节点。确保将 **Pixel Streaming Signalling** 连接到 **Signalling Component** 和 **Target** 的输入，如下图所示。从 **Streamer List** 的输出拖出引线，创建 **Get (a ref)** 节点并将其连接到 **Streamer ID** 的输入。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4402aca5-da5b-4832-8920-169113c433f3/onconnected.png)
7.  从 **On Config (PixelStreamingSignalling)** 节点拖出引线并创建 **Set Config (Pixel Streaming Peer)**。确保将 **Set Config** 和 **On Config** 的配置值相连。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f97f75e-049d-4811-bf57-6f6d6a9da463/onconfigss.jpg)
8.  从 **On Offer (PixelStreamingSignalling)** 拖出引线并创建 **Create Answer**。确保 **Offer** 和 **Create Answer** 的提供值相连。从 **Create Answer** 的输出引脚拖出引线，创建 **Send Answer** 节点。将 **Create Answer**的 **Return Value** 连接到 **Send Answer** 的答案值。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa1161d8-76cc-4932-89ba-24cc178329b8/sendanswerps.jpg)
9.  从 **On Ice Candidate (PixelStreamingSignalling)** 拖出引线，创建 **Receive Ice Candidate** 并连接备选值。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/943fec83-2e5c-4a72-b95d-7dba9c990343/icecandss.jpg)
10.  从 **On Ice Candidate (PixelStreamingPeer)** 拖出引线，创建 **Send Ice Candidate** 节点并连接备选值。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29268d6c-1f1c-438b-8a8b-2fda97c96c8d/sendicecand.jpg)
11.  如果上述步骤都操作正确，你的最终蓝图应如下所示：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7dd496cd-fdd7-464d-8aa8-78a9ea93bf00/psplayerbp.jpg)
12.  在左侧的 **组件（Components）** 窗口中选择 **PixelStreamingPeer** 组件。在 **细节** 窗口的 **属性（Properties）** 类别下，可以看到 **像素流送视频接收器（Pixel Streaming Video Sink）**。点击下拉菜单，选择 **像素流送纹理（Pixel Streaming Media Texture）**。根据自身需要为其命名并保存。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9be24a72-92e4-4dfc-b4a4-a47e609b1689/mediatexture.jpg)
13.  将蓝图Actor拖入场景。创建一个简单的平面对象，调整其大小和形状，直至其成为适合的显示屏。
    
14.  将保存的像素流送媒体纹理直接从 **内容浏览器** 拖到场景中的平面上。这将自动创建一个材质，并将其应用到对象上。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ac90cd4-a6bb-40ca-a9a3-4ce6b5eb139d/mediavideotexture.jpg)
15.  运行场景。此时就可以看到场景中的平面开始显示你的外部像素流送。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8aed98ae-a8ae-48eb-89fa-ed7423945e75/psplayer.jpg)

-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [guide](https://dev.epicgames.com/community/search?query=guide)
-   [pixel streaming](https://dev.epicgames.com/community/search?query=pixel%20streaming)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [VCam](/documentation/zh-cn/unreal-engine/experimental-pixel-streaming-features#vcam)
-   [如何使用VCam](/documentation/zh-cn/unreal-engine/experimental-pixel-streaming-features#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8vcam)
-   [使用麦克风](/documentation/zh-cn/unreal-engine/experimental-pixel-streaming-features#%E4%BD%BF%E7%94%A8%E9%BA%A6%E5%85%8B%E9%A3%8E)
-   [设置"在项目中使用麦克风"](/documentation/zh-cn/unreal-engine/experimental-pixel-streaming-features#%E8%AE%BE%E7%BD%AE%22%E5%9C%A8%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%BD%BF%E7%94%A8%E9%BA%A6%E5%85%8B%E9%A3%8E%22)
-   [在流中使用麦克风](/documentation/zh-cn/unreal-engine/experimental-pixel-streaming-features#%E5%9C%A8%E6%B5%81%E4%B8%AD%E4%BD%BF%E7%94%A8%E9%BA%A6%E5%85%8B%E9%A3%8E)
-   [虚拟现实中的像素流送](/documentation/zh-cn/unreal-engine/experimental-pixel-streaming-features#%E8%99%9A%E6%8B%9F%E7%8E%B0%E5%AE%9E%E4%B8%AD%E7%9A%84%E5%83%8F%E7%B4%A0%E6%B5%81%E9%80%81)
-   [设置项目](/documentation/zh-cn/unreal-engine/experimental-pixel-streaming-features#%E8%AE%BE%E7%BD%AE%E9%A1%B9%E7%9B%AE)
-   [创建必需证书](/documentation/zh-cn/unreal-engine/experimental-pixel-streaming-features#%E5%88%9B%E5%BB%BA%E5%BF%85%E9%9C%80%E8%AF%81%E4%B9%A6)
-   [加入VR流](/documentation/zh-cn/unreal-engine/experimental-pixel-streaming-features#%E5%8A%A0%E5%85%A5vr%E6%B5%81)
-   [像素流送播放器](/documentation/zh-cn/unreal-engine/experimental-pixel-streaming-features#%E5%83%8F%E7%B4%A0%E6%B5%81%E9%80%81%E6%92%AD%E6%94%BE%E5%99%A8)
-   [设置像素流送播放器](/documentation/zh-cn/unreal-engine/experimental-pixel-streaming-features#%E8%AE%BE%E7%BD%AE%E5%83%8F%E7%B4%A0%E6%B5%81%E9%80%81%E6%92%AD%E6%94%BE%E5%99%A8)
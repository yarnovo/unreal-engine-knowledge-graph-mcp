# 在虚幻引擎中使用Live Link控制虚拟摄像机Actor | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:13:00.418Z

---

目录

![使用Live Link控制虚拟摄像机Actor](https://dev.epicgames.com/community/api/documentation/image/c5c147da-e46f-4bf1-a82a-f3cd15e73da9?resizing_type=fill&width=1920&height=335)

**虚拟摄像机（Virtual Camera）** Actor是放置在虚幻引擎场景中的摄像机，用于从连接到Live Link的设备流送数据。连接到Live Link的设备可用于查看场景并四处移动场景，以及设置和录制镜头。本用户指南将介绍如何在你的项目中使用虚拟摄像机以及Unreal VCam应用的不同部分。

## 必要设置

要使用虚拟摄像机，你需要在虚幻引擎项目中进行一些设置和配置，然后再设置并连接启用了Live Link的设备。

### 虚幻引擎设置

从位于 **编辑（Edit）** 菜单中的 **插件（Plugins）** 浏览器启用以下插件：

-   **VirtualCamera**
    
    -   使用此插件可以通过物理设备控制和查看摄像机。
-   **Live Link**
    
    -   使用此插件可以将动画数据流送到虚幻引擎中。如需详细信息，请参阅[Live Link](/documentation/zh-cn/unreal-engine/live-link-in-unreal-engine)。
-   **Take Recorder（Take Recorder）**
    
    -   这是一套工具和接口，设计用于在虚拟制片环境中录制、审核、播放镜头试拍。如需详细信息，请参阅[Take Recorder](/documentation/zh-cn/unreal-engine/take-recorder-in-unreal-engine)和[使用Take Recorder](/documentation/zh-cn/unreal-engine/record-gameplay-in-unreal-engine)。

Live Link和用于Sequencer的Take Recorder等功能不在本页面的讨论范围之内。我们建议你花一些时间熟悉这些功能及其用例。请参阅上面链接的文档。

### 设备设置

开始之前，你必须有兼容的iOS或Android设备，并且必须从[App Store](https://apps.apple.com/us/app/live-link-vcam/id1547309663)或[Google Play Store](https://play.google.com/store/apps/details?id=com.epicgames.live_link_vcam)下载 **Unreal VCam** 应用。

**iOS设备系统要求：**

-   iOS 15.0及更高版本
    
-   iPadOS 15.0及更高版本
    
-   支持ArKit
    

**Android设备系统要求：**

-   Android 24 (Nougat)或更高版本
    
-   ARCore支持
    

首次打开应用时，你必须接受许可协议才能使用应用。此时不需要进一步的设置。

### 本指南的可选先决条件

**Meerkat演示（Meerkat Demo）** 示例项目是由Weta Digital制作并完全在虚幻引擎中渲染的实时短片。该项目非常适合用于测试在项目中使用虚拟摄像机的一些功能。本指南使用示例项目来演示虚拟制片环境中的设置和用法。

你可以从[Fab](https://www.fab.com/listings/5ca1076f-c495-449a-b65a-1ae898ab9d37)下载该项目，也可以直接从Epic Games启动程序的 **示例（Samples）** 选项卡中进行下载。

你可以访问[Meerkat演示文档](/documentation/zh-cn/unreal-engine/meerkat-sample-project-for-unreal-engine)，了解有关示例项目的更多详情。

## 为虚拟摄像机准备场景

为了准备你的项目以使用虚拟摄像机设置，你必须首先在虚幻引擎中准备你的场景，然后设置你的iOS或Android移动设备以与之交互。

**虚幻引擎场景设置：**

要设置你的虚幻引擎场景：

1.  找到 **放置Actor（Place Actors）** 面板并在搜索字段中输入" **VCAM** "，或选择 **虚拟制片** 图标。

对于新创建的项目， **放置Actor（Place Actors）** 面板默认情况下不会在虚幻引擎中显示。如果没有显示，请找到 **窗口（Windows）** 菜单并点击 **放置Actor（Place Actors）** 打开一个面板。

1.  点击 **VCam Actor** 并将其拖入场景中。

将VCam Actor拖入场景中之后，视口会立即更改以自动导航虚拟摄像机。你的视口应该类似于下图。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63a5f798-91c6-46c7-b522-f8b8c178e2fa/vcamui.png)

接下来，你要将移动设备连接到虚幻编辑器，驱动放置在场景中的虚拟摄像机。

**移动设备设置：**

要设置设备：

1.  将移动设备连接到运行你的项目的计算机所使用的网络。
    
2.  在 **虚幻编辑器（Unreal Editor）** 中，点击工具栏中的 **像素流送（Pixel Streaming）** 下拉菜单。在菜单的 **信令服务器URL（Signaling Server URLs）** 分段下，你会看到至少两个IP地址。在Unreal VCam应用中，输入与你的设备相同的网络IP地址（例如，192.x.x.x）。
    
3.  在你的设备上，打开 **Unreal VCam** 应用。使用与你的共享网络匹配的IP地址，在应用中的文本字段中输入IP地址。
    
4.  点击 **连接（Connect）** 。
    

如果你的场景有单个虚拟摄像机，你的设备将自动连接到该VCam Actor。但是，如果你在场景中有多个虚拟摄像机，就必须选择要连接到哪一个。请参阅[使用多个虚拟摄像机](/documentation/zh-cn/unreal-engine/using-multiple-virtual-cameras-in-unreal-engine)，了解有关在项目中设置和使用多个摄像机的更多信息。

你的移动设备现在应该已连接到虚幻编辑器场景中放置的虚拟摄像机。你还应该可以从移动设备控制虚拟摄像机，并能够四处移动以更改视图。你还可以在移动设备上以及从虚幻编辑器视口访问Unreal VCam界面。VCAM界面包含许多功能按钮，可用于管理场景中虚拟摄像机的外观和行为。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/148edf03-3938-4cce-bac7-bd6cfff3fac0/vcammobile.png)

## 控制虚拟摄像机功能按钮的输入

使用虚幻引擎的增强输入功能，可以管理大量操作并动态进行更改。输入可以根据其当前状态更改行为。这意味着你可以在用户界面中分配比按钮数量更多的可映射键。在这种情况下，非常适合通过VCam应用程序将硬件设备的输入映射到虚幻引擎中的虚拟摄像机功能按钮。

你可以通过两种方法添加和配置映射输入：

-   在 **项目设置（Project Settings）** 的 **VCam输入设置（VCam Input Settings）** 下。
    
-   通过VCam组件 **细节面板** 的 **输入描述（Input Profile）** 分段。
    

如需详细了解如何设置和使用增强输入，请参阅\[控制虚拟摄像机功能按钮的输入\]animating-characters-and-objects/Sequencer/Cameras/VirtualCamera/controlling-virtual-camera-inputs)。

## 虚拟摄像机界面

虚拟摄像机的 **控制器界面（Controller Interface）** 包含一系列的功能按钮和设置。你可以用这些设置通过外部设备（例如启用了ARKit的iOS设备）在虚幻引擎中修改虚拟摄像机的外观和行为。使用ARKit功能，就可以对设备进行物理定位和旋转，以便在项目中实时移动和控制虚拟摄像机的位置和旋转。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46b90e63-a7ee-43d5-ac46-a14fce7cabfa/vcaminterface.png)

虚拟摄像机Actor包括以下内容：

1.  摄像机和设备信息
    
2.  虚拟摄像机设置
    
3.  Unreal VCam应用设置
    
4.  Sequencer和书签设置
    

## 调整设置调谐钮

Unreal VCam应用中的大部分可配置设置都使用径向调谐钮。这些调谐钮可能位于界面的任一侧，有时会包括内调谐钮和外调谐钮。要选择选项，你可以按任一方向沿调谐钮拖动手指，拨入你需要的值。使用调谐钮做出的更改会实时反映在虚幻引擎中。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91ff02aa-31c0-4eea-822d-e709d1bd31b3/vcamsettingsdials.gif)

## 使用Unreal VCam应用导航虚拟场景

通过Unreal VCam应用，可以使用ARKit在物理空间中进行全系列的动作追踪。为此，ARKit会使用Live Link通过网络将位置和旋转数据实时流送到虚幻引擎实例。这样你可以在实时环境中驱动3D摄像机，并在支持的iOS设备上查看镜头。

此外，使用触摸屏摇杆，可通过手动控制使用Unreal VCam应用导览场景。使用摇杆的移动会叠加在通过ARKit进行的追踪动作的移动之上。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2dfcbb2a-aa6e-40a6-983a-e4a8babc153e/vcamnavigation.png)

### 使用启用了ARKit的设备四处移动

使用启用了ARKit的设备，你可以在空间中自由移动，该移动会转换到运行你的项目的虚幻引擎实例。追踪的移动包括能够完全倾斜、平移和滚动设备，并在空间中朝任意方向四处移动。

通过Live Link追踪的动作会自动发生，并在虚幻引擎中与你的3D摄像机同步。这意味着你可以使用该应用程序设置镜头，包括正式拍摄前的视效预览镜头，从而在主要摄影期间捕获真实的镜头试拍，并在后期制作中创建新的镜头。

Unreal VCam应用包括用于缩放移动如何通过动作追踪转换到3D场景的设置。如需了解如何调整这些设置，请参阅此页面的[调整虚拟摄像机移动](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine#%E5%B8%A6%E6%9C%89%E7%BC%A9%E6%94%BE%E5%92%8C%E5%A2%9E%E7%9B%8A%E8%AE%BE%E7%BD%AE%E7%9A%84%E8%99%9A%E6%8B%9F%E6%91%84%E5%83%8F%E6%9C%BA%E7%A7%BB%E5%8A%A8)小节。

### 使用触摸屏摇杆移动

你可以在连接到Live Link的设备上使用触摸屏摇杆手动移动场景中的虚拟摄像机Actor。你还可以使用摇杆对摄像机进行定向移动、仅限垂直的移动和平移。

Unreal VCam应用包括用于在连接到Live Link的设备中调整移动的灵敏度和比例的设置。如需了解如何调整这些设置，请参阅此页面的[调整虚拟摄像机移动](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine#%E5%B8%A6%E6%9C%89%E7%BC%A9%E6%94%BE%E5%92%8C%E5%A2%9E%E7%9B%8A%E8%AE%BE%E7%BD%AE%E7%9A%84%E8%99%9A%E6%8B%9F%E6%91%84%E5%83%8F%E6%9C%BA%E7%A7%BB%E5%8A%A8)小节。

## 摄像机信息

虚拟摄像机Actor的最上端分段提供了配置的摄像机设置的快速参考信息。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0c698a3-5c1d-431f-95d2-02091c257ba1/vcamcamerainfo.png)

在上图中，数字对应于以下内容：

1.  配置的摄像机设置的快速参考和操作。
    
2.  时间戳和每秒影片帧数。
    
3.  开关摄像机行为（Camera Behavior）的快捷按钮。
    
    -   手动对焦与跟踪对焦（Manual and Tracking Focus）
        
    -   聚焦峰值（Focus Peaking）
        
    -   曝光斑马纹（Exposure Zebra Striping）
        
    -   保持位置（Hold Position）
        
    -   本地空间飞行模型（Local Space Flight Mode）
        
    -   禁止翻滚（Kill Roll）
        

### 快速访问虚拟摄像机设置和参考

在虚拟摄像机Actor的任一侧都是已配置的摄像机设置。直接点击其中的设置会在Unreal VCam应用中打开可调整的调谐钮。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9179c2ea-2e26-4513-8700-911c3d3770fe/vcamquickaccess.png)

可调整的设置包括：

-   镜头大小
    
-   胶片背板大小
    
-   遮罩大小
    
-   切换摄像机UI
    
-   ISO
    
-   焦距
    
-   光圈F值
    
-   快门速度
    

### 访问和共享输出日志

你可以访问和共享输出日志，从查看关于VCam会话的详细信息，以确认并排除你遇到的任何潜在可以。

要访问输出日志：

1.  点击Unreal VCam应用右上角的 **齿轮** 图标打开设置。
    
2.  点击 **应用日志（Application Log）** 查看可用的日志。
    
3.  点击一个日志，打开 **日志查看器（Log Viewer）**。带有（当前）标记的日志就是活动会话的日志。
    

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c286eab-4c3b-4140-853f-9ff3a13c704b/vcamsettingsgear.png) ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e82a1ca3-0100-450f-ad1f-524eead57568/vcamsettingswindow.png) ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1f9f0fb-1aee-4be1-bfb9-a9ad6c095584/vcamapplicationlog.png) ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1274182c-0f16-4029-b092-d5416592f2ab/vcamlogdetails.png)

要共享输出日志，请点击日志中的 **共享** 图标保存并发送日志。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/864a30de-e5ef-4aab-979a-4439458a7216/vcamsharelog.png)

-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [virtual camera](https://dev.epicgames.com/community/search?query=virtual%20camera)
-   [working with media](https://dev.epicgames.com/community/search?query=working%20with%20media)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [必要设置](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine#%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [虚幻引擎设置](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E8%AE%BE%E7%BD%AE)
-   [设备设置](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine#%E8%AE%BE%E5%A4%87%E8%AE%BE%E7%BD%AE)
-   [本指南的可选先决条件](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine#%E6%9C%AC%E6%8C%87%E5%8D%97%E7%9A%84%E5%8F%AF%E9%80%89%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [为虚拟摄像机准备场景](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine#%E4%B8%BA%E8%99%9A%E6%8B%9F%E6%91%84%E5%83%8F%E6%9C%BA%E5%87%86%E5%A4%87%E5%9C%BA%E6%99%AF)
-   [控制虚拟摄像机功能按钮的输入](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine#%E6%8E%A7%E5%88%B6%E8%99%9A%E6%8B%9F%E6%91%84%E5%83%8F%E6%9C%BA%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE%E7%9A%84%E8%BE%93%E5%85%A5)
-   [虚拟摄像机界面](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine#%E8%99%9A%E6%8B%9F%E6%91%84%E5%83%8F%E6%9C%BA%E7%95%8C%E9%9D%A2)
-   [调整设置调谐钮](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine#%E8%B0%83%E6%95%B4%E8%AE%BE%E7%BD%AE%E8%B0%83%E8%B0%90%E9%92%AE)
-   [使用Unreal VCam应用导航虚拟场景](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine#%E4%BD%BF%E7%94%A8unrealvcam%E5%BA%94%E7%94%A8%E5%AF%BC%E8%88%AA%E8%99%9A%E6%8B%9F%E5%9C%BA%E6%99%AF)
-   [使用启用了ARKit的设备四处移动](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%90%AF%E7%94%A8%E4%BA%86arkit%E7%9A%84%E8%AE%BE%E5%A4%87%E5%9B%9B%E5%A4%84%E7%A7%BB%E5%8A%A8)
-   [使用触摸屏摇杆移动](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%A7%A6%E6%91%B8%E5%B1%8F%E6%91%87%E6%9D%86%E7%A7%BB%E5%8A%A8)
-   [摄像机信息](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA%E4%BF%A1%E6%81%AF)
-   [快速访问虚拟摄像机设置和参考](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine#%E5%BF%AB%E9%80%9F%E8%AE%BF%E9%97%AE%E8%99%9A%E6%8B%9F%E6%91%84%E5%83%8F%E6%9C%BA%E8%AE%BE%E7%BD%AE%E5%92%8C%E5%8F%82%E8%80%83)
-   [访问和共享输出日志](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%92%8C%E5%85%B1%E4%BA%AB%E8%BE%93%E5%87%BA%E6%97%A5%E5%BF%97)
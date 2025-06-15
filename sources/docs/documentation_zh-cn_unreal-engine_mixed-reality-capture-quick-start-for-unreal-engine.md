# 虚幻引擎混合现实捕捉快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mixed-reality-capture-quick-start-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:28:58.133Z

---

目录

![混合现实捕捉快速入门](https://dev.epicgames.com/community/api/documentation/image/102422b7-156a-41cd-8bcd-0a0dec61c77d?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

![MR_RoboRecall.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f34bc601-b376-4f80-9890-b13da9dc5c2b/mr_roborecall-resize714x424.png "MR_RoboRecall.png")

本教程结束时，你将完成用于混合现实捕捉（MRC）的系统设置和校准。

## 1 - 设置绿幕和摄像机

需要具备合适的设备才能开始捕捉。我们将在此简单介绍一下所需的设备，并提供一些设置设备的提示。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4ffcfb1-470f-4220-ac6d-b63a309ac626/mr_greenscreensetup.png "MR_GreenScreenSetup.png")

1.  **视频摄像机**  
    UE5仅支持一组特定的视频捕捉设备，请参阅[受支持的视频设备](/documentation/zh-cn/unreal-engine/supported-video-devices-for-mixed-reality-capture-in-unreal-engine)以获取受支持的设备的最新列表。使用列表中包含的设备，并将它连接到PC以进行流送。
    
2.  **色度背景**  
    色度镶迭通常使用绿幕。布置绿幕时，需要确保将它拉紧，以尽量减少褶皱，尤其是主体后面的区域。如果设置光照，应确保不在对象后面直接投射阴影。需要确保颜色平滑、单一。背景中绿色阴影区域越多，色度镶迭就越困难。让拍摄对象尽可能远离背景会很有帮助。如果你打算对拍摄对象的脚进行拍摄，请考虑在地板上也使用绿幕。
    
3.  **摄像机架设**  
    进行初始架设（校准）时，摄像机需要保持静止不动。如果你使用网络摄像头，只需将其连接到你的桌面/显示器即可。另一种选择是将摄像机固定到三脚架上。
    
4.  **支架 + 追踪器（可选）**  
    如果你打算在拍摄期间四处移动摄像机，最好将跟踪设备（例如HTC Vive Tracker）连接到摄像机。另外，你还可以使用[多重安装](https://www.bhphotovideo.com/c/product/1062513-REG/desmond_d3d_1_stereo_camera_bracket.html)将摄像机和跟踪器牢固地安装在一个地方。
    

## 2 - 校准物理和虚拟摄像机

布置好物理空间和设备后，就可以从头至尾执行校准了。运行时，游戏需要知道摄像机相对于虚拟场景所处的位置。对于每次布置，该配置都是不同的，因此需要从头至尾执行校准过程。为了简化校准过程，我们制作了独立的校准工具（MRCalibration.exe），可以单击[此处](http://epic.gm/mrccal)来下载它。 

校准过程非常复杂，因此我们创建了独立的[如何使用混合现实捕捉校准工具](/documentation/zh-cn/unreal-engine/how-to-use-the-mixed-reality-capture-calibration-tool-in-unreal-engine)主题，其中包含有关使用该校准工具的详细说明。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f3cc88e-5d0a-4770-ba9c-cb9aba9a792c/adjustingalignmentstep.gif)

校准过程完成后，该校准工具会生成校准设置文件（*MrcCalibration.sav*）。校准设置文件（*MrcCalibration.sav*）位于该校准工具的*/Saved/SaveGames/*文件夹中。开始进行混合现实捕捉时，游戏会使用此设置文件。只要物理布置保持不变，就无需从头执行校准过程。可以在多个游戏中使用相同的校准设置文件。

如果你的摄像机镜头可调整，要注意不要在完成校准后调整变焦。调整变焦将更改物理摄像机的视野（FOV），但不会更改虚拟摄像机的视野。虚拟摄像机将使用校准过程中使用的FOV。如果在完成校准后调整了摄像机的变焦，需要重复校准过程。

## 3 - 将校准文件添加到游戏项目中

在上一步骤中，我们介绍了如何使用MRC Calibration Tool生成*MrcCalibration.sav*文件。*MrcCalibration.sav*文件生成好后，将其复制到游戏的*/Saved/SaveGames/*文件夹中。如果你的游戏尚没有SaveGames目录，需要手动创建该目录。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f92a3c24-ee12-48cb-9324-e02b86c48806/mr_applyingcalibdata.gif)

如果已在游戏中启用了混合现实捕捉框架插件，游戏会在启动时检查校准设置文件。

## 4 - 启用混合现实捕捉框架插件

将混合现实捕捉（MRC）框架集成到项目中的过程非常简单，只需启用混合现实捕捉框架插件即可。在已启用MRC插件并且已将校准设置文件复制到正确的位置后，游戏应会在MRC模式下启动，并且会在旁观者窗口中显示合成的场景。  
默认情况下，MRC播放使用[VR观众画面](/documentation/zh-cn/unreal-engine/virtual-reality-spectator-screen-in-unreal-engine)来显示合成的场景。如果游戏不处在VR模式下，那么就不会显示混合现实捕捉。MRC插件在进行捕捉，只是不会显示。

只要启用了MRC插件，混合现实捕捉在编辑器（VR PIE）和打包的游戏中都受支持。

1.  在 **编辑** 菜单下，选择 **插件**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7aed8dd8-b89b-4b3d-9314-fc5a0bf5a324/01-select-plugins_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7aed8dd8-b89b-4b3d-9314-fc5a0bf5a324/01-select-plugins_ue5.png)
    
    Click image to expand.
    
2.  使用搜索栏查找混合现实捕捉框架（Mixed Reality Capture Framework）插件。
3.  点击 **启用（Enabled）** 复选框，然后在警告弹窗上点击 **好（Yes）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f9fa905-8a3c-4d78-9f11-9491fa52b16a/02-mixed-reality-capture_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f9fa905-8a3c-4d78-9f11-9491fa52b16a/02-mixed-reality-capture_ue5.png)
    
    Click image to expand.
    
4.  必须重新启用虚幻编辑器以便彻底重启插件。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e3efd2f-3ccb-4746-bb88-885598956b31/03-restart-engine_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e3efd2f-3ccb-4746-bb88-885598956b31/03-restart-engine_ue5.png)
    
    Click image to expand.
    

#### 在MRC模式下启动

当MRC插件启动时，它会在游戏的*/Saved/SaveGames/*文件夹中检查校准设置文件（*MrcCalibration.sav*）。如果MRC插件找不到校准设置文件，它将不会在MRC模式下启动。以下示意图显示了游戏如何确定是否在MRC模式下启动。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ce6739d-a232-495e-9b68-972c37db2115/mr_startupflowchart.png "MR_StartUpFlowChart.png")

## 5 - 录制混合现实捕捉

MRC框架不会为捕捉录制视频。MRC框架只负责处理场景合成并将合成输出到显示窗口中。必须使用第三方软件（例如，[OBS](https://obsproject.com/)或[Nvidia ShadowPlay](https://www.nvidia.com/en-us/geforce/geforce-experience/shadowplay/)）来对捕捉进行录制。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/946d7def-b67d-4a5f-ba01-8c053d6e638f/mr_roborecall.gif)

## 6 - 自己动手！

创建混合现实捕捉时，最困难的部分就是做到正确地校准。一旦完成后（如果未更改布置），你就可以重复使用校准文件。只需复制文件并运行即可。

如果你的设备设置发生变动，就需要使用混合现实捕捉校准工具重新校准。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [basics/gettingstarted](https://dev.epicgames.com/community/search?query=basics%2Fgettingstarted)
-   [mr](https://dev.epicgames.com/community/search?query=mr)
-   [virtual sets](https://dev.epicgames.com/community/search?query=virtual%20sets)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1 - 设置绿幕和摄像机](/documentation/zh-cn/unreal-engine/mixed-reality-capture-quick-start-for-unreal-engine#1-%E8%AE%BE%E7%BD%AE%E7%BB%BF%E5%B9%95%E5%92%8C%E6%91%84%E5%83%8F%E6%9C%BA)
-   [2 - 校准物理和虚拟摄像机](/documentation/zh-cn/unreal-engine/mixed-reality-capture-quick-start-for-unreal-engine#2-%E6%A0%A1%E5%87%86%E7%89%A9%E7%90%86%E5%92%8C%E8%99%9A%E6%8B%9F%E6%91%84%E5%83%8F%E6%9C%BA)
-   [3 - 将校准文件添加到游戏项目中](/documentation/zh-cn/unreal-engine/mixed-reality-capture-quick-start-for-unreal-engine#3-%E5%B0%86%E6%A0%A1%E5%87%86%E6%96%87%E4%BB%B6%E6%B7%BB%E5%8A%A0%E5%88%B0%E6%B8%B8%E6%88%8F%E9%A1%B9%E7%9B%AE%E4%B8%AD)
-   [4 - 启用混合现实捕捉框架插件](/documentation/zh-cn/unreal-engine/mixed-reality-capture-quick-start-for-unreal-engine#4-%E5%90%AF%E7%94%A8%E6%B7%B7%E5%90%88%E7%8E%B0%E5%AE%9E%E6%8D%95%E6%8D%89%E6%A1%86%E6%9E%B6%E6%8F%92%E4%BB%B6)
-   [在MRC模式下启动](/documentation/zh-cn/unreal-engine/mixed-reality-capture-quick-start-for-unreal-engine#%E5%9C%A8mrc%E6%A8%A1%E5%BC%8F%E4%B8%8B%E5%90%AF%E5%8A%A8)
-   [5 - 录制混合现实捕捉](/documentation/zh-cn/unreal-engine/mixed-reality-capture-quick-start-for-unreal-engine#5-%E5%BD%95%E5%88%B6%E6%B7%B7%E5%90%88%E7%8E%B0%E5%AE%9E%E6%8D%95%E6%8D%89)
-   [6 - 自己动手！](/documentation/zh-cn/unreal-engine/mixed-reality-capture-quick-start-for-unreal-engine#6-%E8%87%AA%E5%B7%B1%E5%8A%A8%E6%89%8B%EF%BC%81)
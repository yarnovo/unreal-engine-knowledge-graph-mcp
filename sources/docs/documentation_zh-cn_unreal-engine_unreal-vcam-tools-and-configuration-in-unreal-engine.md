# 虚幻引擎中的虚幻虚拟摄像机（VCam）工具和配置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:13:39.114Z

---

目录

![虚幻虚拟摄像机（VCam）工具和配置](https://dev.epicgames.com/community/api/documentation/image/8831d73e-c865-45c1-9ad1-311151d0ad8a?resizing_type=fill&width=1920&height=335)

**工具（Tools）** 菜单包括可配置的设置和开关，可用于调整你与虚幻引擎场景中启用了Live Link的设备和虚拟摄像机的交互方式。

要打开工具（Tools）菜单，请点击屏幕右侧的 **扳手** 图标。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a57347c-963c-44d1-8543-546d13f5184f/vcamtoolsicon.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ece4ba67-50ff-4c1a-a292-6ce66252346a/vcamtoolsmenu.png)

该 **工具（Tools）** 菜单包括以下设置：

**图标**

**调谐钮名称 / 操作**

**说明**

**分段1**

 

 

![Takes Browser icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a33f3942-0c34-4529-956b-7c6ef95a0211/takesbrowser.png)

[**镜头试拍浏览器**](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E6%B5%8F%E8%A7%88%E5%BA%8F%E5%88%97%E5%B9%B6%E5%AE%A1%E6%A0%B8%E8%AF%95%E6%8B%8D%E9%95%9C%E5%A4%B4)

打开虚拟摄像机的镜头试拍浏览器（Takes Browser），你可以在其中搜索和打开关卡序列以进行审核或录制。

![Scale and Gain icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6718d3ca-6d43-42da-9084-0a57f4bb4bcd/scaleandgain.png)

[**缩放和增益设置**](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E5%B8%A6%E6%9C%89%E7%BC%A9%E6%94%BE%E5%92%8C%E5%A2%9E%E7%9B%8A%E8%AE%BE%E7%BD%AE%E7%9A%84%E8%99%9A%E6%8B%9F%E6%91%84%E5%83%8F%E6%9C%BA%E7%A7%BB%E5%8A%A8)

包含的设置用于配置启用了Live Link的设备如何根据虚幻引擎场景进行移动。这包括设备移动在物理空间中的灵敏度，以及摇杆移动的灵敏度。

![Hold icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4de9c18-bf37-43f5-a42e-f932759f7937/hold.png)

**保持（Hold）**

开启此项可冻结虚拟摄像机的位置和旋转，直到将其关闭。这很适合用于重新定位启用了Live Link的物理设备，而不会丢失虚拟摄像机在场景中的位置。

![Zero to Stage icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1edf85e-5a99-4310-b28e-a0e92ee87cec/zerotostage.png)

**阶段归零（Zero To Stage）**

点击此项可消除虚拟摄像机追踪位置的任何偏移。这会将摄像机放回追踪空间。

![Zero to Parent icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02fa90fc-c1b3-408e-808f-8d313b84fe27/zerotoparent.png)

**父项归零（Zero to Parent）**

点击此项可将虚拟摄像机对齐到其父项上，有效相对位置为（0,0,0）。如果虚拟摄像机没有父项，则会对齐到世界原点。

![Local Space Flight Mode icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fee366b3-15d2-4b79-85fb-2c521dc37233/localspaceflightmode.png)

**本地空间飞行模式（Local Space Flight Mode）**

启用此项可以使向前操纵杆移动跟随摄像机的前进方向，而非世界的前进方向。处于本地空间飞行模式时，当你将摇杆向前推时，向上看或向下看会使摄像机沿该方向移动。禁用时，摄像机可以在场景中四处自由转动，但在向前移动时不会沿摄像机所指的方向移动。

![Kill Roll icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78d28e35-60d2-4ae0-bb53-7929bfe3f6d6/killroll.png)

**禁止滚动（Kill Roll）**

开启此项可禁用X轴上的虚拟摄像机旋转，当连接到Live Link的设备在物理空间中移动时，使摄像机在四处移动时保持水平。

![Spline Mode icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c30d8a20-d260-49ca-a316-5317e6425500/splinemode.png)

[**样条线模式**](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E6%93%8D%E4%BD%9C%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%91%E5%AE%9A%E5%AF%BC%E8%BD%A8)

此模式允许你从Unreal VCam应用程序创建和编辑自己的绑定导轨。

![Tile Offset icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db614e7d-4eda-4ecc-9f50-4410a4694195/tiltoffseticon.png)

**倾斜偏移（Tilt Offset）**

启用此项后，可对虚拟摄像机的倾斜角度施加任意偏移量。这样一来，在拍摄时就能更自如地控制拍摄角度了。 启用后，Tilt HUD值上将显示加号（+）。

![Tile offset enabled HUD display](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79077602-b88d-4b6b-be1f-c38c76d7749a/tiltoffsetenabled.png)

![Bookmark Browser icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f55660d2-4170-462f-ab84-90a27aaf0d43/bookmarkbrowsericon.png)

**书签浏览器**

打开虚拟摄像机书签浏览器

![Multi User Replication](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7b2c8d4-ea40-4932-a06d-b6658852371f/multiuserreplication.png)

**多用户复制**

点此按钮，将当前客户端设置为多用户会话中虚拟摄像机的所有者，此客户端做出的修改将被传播到其他客户端，而其他客户端的修改会被此客户端的重载。

### 带有缩放和增益设置的虚拟摄像机移动

启用了Live Link的设备中的移动通过追踪设备中的位置数据和使用触摸屏摇杆来识别（包括倾斜、平移和滚动移动）。触摸屏摇杆将定向和旋转移动叠加在ARKit动作之上。

启用了Live Link的设备中的虚拟摄像机移动通过以下方式控制：

-   ARKit追踪的轴向和运动移动。
    
-   触摸屏摇杆
    
-   **左** 摇杆控制向前、向后、对角线和横向的定向移动。
    
-   **右** 摇杆包括两个单独的移动功能按钮:
    
-   **旋转** 移动通过在屏幕上左右拖动来实现。
    
-   **垂直** 移动通过在屏幕上上下拖动来实现。
    

你可以调整每种移动的灵敏度，使细微的移动产生较大的影响，或反过来使较大的移动产生较小的影响。你可以在屏幕右侧的 **缩放和增益（Scale and Gain）** 设置菜单下找到这些功能按钮。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c1dd02b-c8b1-4253-a9f0-a41e72e4dfb5/scaleandgainsettings.png)

该菜单包括以下设置：

**调谐钮名称 / 操作**

**说明**

**左调谐钮（Left Dials）**

 

**轴（Axis）**

设置移动的轴约束：

-   **全部（All）** 允许沿所有轴移动。
-   **平面（Planar）** 仅允许沿要缩放的X轴和Y轴移动。垂直移动不受影响。
-   **垂直（Vertical）** 允许沿要缩放的Z轴移动。沿X轴和Y轴的平面移动不受影响。

**缩放（Scale）**

缩放物理空间中设备的ARKit追踪的移动。缩放会调整移动如何通过Live Link从真实世界物理空间转换到虚拟摄像机数字空间。缩放值较小时，会将较大的物理空间移动转换为较小的数字空间移动。缩放值较大时，会将较小的物理空间移动转换为较大的数字空间移动。

**右调谐钮（Left Dials）**

 

**摇杆移动增益（Joystick Movement Gain）**

控制左向摇杆和仅限垂直的右摇杆移动的速度。

**摇杆旋转增益（Joystick Rotation Gain）**

在左或右旋转移动中操纵右摇杆时控制旋转的速度。

将任何调谐钮设置为 **锁定（Locked）** 或 **0** 会禁止通过Live Link或操纵摇杆来追踪移动。例如，将轴设置为垂直并将缩放设置为锁定，就意味着不能垂直移动。另一个示例是，将摇杆旋转增益设置为0会禁止通过摇杆应用的旋转。

## 浏览序列并审核镜头试拍

### 镜头试拍浏览器

点击工具菜单中的 **镜头试拍浏览器（Takes Browser）** 按钮，即可打开镜头试拍浏览器。镜头试拍浏览器将显示可以打开以供审核或录制的关卡序列的排序列表。

![The Takes Browser](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a14067da-11c8-4608-bf0c-44eb91016c56/browsingtakes.png)

点击关卡序列会出现两个选项

**按钮**

**说明**

![Takes Reload icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/753b882b-3381-48a0-9b39-832f372d27fd/takesreload.png)

点击此项可将选定序列加载到镜头试拍录制器中，使其成为下一次录制的基础。使用此选项可选择要进行摄像机录制的动画。

![Takes Review icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f87e18c8-e67c-475e-93c1-e2d29b4e75d7/takesreview.png)

点击此项可打开序列进行审核。这将引导序列的镜头切换轨道并提供简化的功能按钮以审核序列。

按住关卡序列将显示资产路径。在关卡序列被修改时，这还会显示脏污状态。

![Take overlay showing asset path](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/adb229f1-5db3-40e0-a304-34ba5c41dfe1/vcam_takeoverlay.png)

#### 标记镜头

在镜头试拍浏览器中的序列上向左或向右滑动，可使用所选元数据标记该序列，这可用于筛选镜头试拍浏览器中的序列。

**选项**

**说明**

![Star tag](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1cacbad2-7d68-468f-a455-e99979c30781/startag.png)

向右滑动会点亮一颗、两颗或三颗星，具体取决于滑动的距离。在一定数量的已点亮星处停下来，可用该星数标记试拍镜头。

![Flag take](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7a18c18-4bd0-4ee1-a3c9-ccb8b1f5dfaa/flagtakes.png)

向左滑动会看到一面黄旗。点击此项即可将该试拍镜头标记为已标记。使用此标志来表示与你的工作流程相关的信息。

![Take no good](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/940ea550-30eb-416c-a32a-641b21703669/takenogood.png)

向左滑动将显示红色大拇指向下标志。点击此项将把该试拍镜头标记为"欠佳"并将其从镜头浏览器中过滤掉。点击后，你会看到一个简短的撤消提示。若在到时间之前点击此按钮，将删除"欠佳"标签，并使试拍镜头回到浏览器中。

此操作不会删除关卡序列，只是默认将其从镜头试拍头浏览器列表中隐藏。

#### 镜头试拍浏览器中的筛选和排序

镜头试拍浏览器的顶部有一个搜索栏和筛选器下拉菜单。若在此搜索栏中输入含匹配字符串的内容，可按试拍镜头筛选列表。

![Filter takes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/015d3336-2157-471a-bc73-12ff364aac30/filtertakes.png)

点击筛选器下拉菜单，可以显示或隐藏镜头试拍浏览器的筛选器和排序选项。

![Take Sorting options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/627212a4-0fff-4cdd-bf83-ede80fd63752/takesort.png)

可用筛选器如下：

**筛选/排序选项**

**说明**

![Show Only Take icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afe982f0-b280-4952-9b18-05512988c771/showonlytake.png)

点击此项可仅显示镜头试拍录制器记录的序列并隐藏非记录序列。

![Show Flagged icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90fabd8c-b90d-4c00-b8b6-84f8032e6420/showflagged.png)

点击此项可仅显示带有标记标签的序列。

![Show No Good icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73f5b0a5-3ed3-441e-be57-ab182e402338/shownogood.png)

点击此项可仅显示带有"欠佳"的序列。如果需要恢复序列或者有序列被错误地标记为欠佳，请使用此选项。

![Show Starred icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a4d47cc-6398-4f7b-8f45-c1448a2212e8/showstarred.png)

点击此项可循环显示标记星数大于所示数量的序列。例如，点击直到星数显示数字2，则仅显示标记有2颗星或3颗星的序列。

![Sort Takes by Time icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa087bf8-58e9-4f5a-a654-7660ca7ef628/sorttakestime.png)

点击此项可循环使用从最新到最旧或从最旧到最新的镜头试拍浏览器排序。没有子排序，因此列表只能按创建日期或字母顺序排列。

![Sort Takes Alphabetical icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97a82464-a55b-4b65-8ed3-7bfb157a4600/sorttakesalpha.png)

点击此项可循环使用字母顺序或反字母顺序的镜头试拍浏览器排序。没有子排序，因此列表只能按创建日期或字母顺序排列。

### 镜头试拍查看器

你可以使用镜头试拍查看器（Take Viewer）在各个镜头间切换，对其进行标记和平滑操作。

从镜头试拍浏览器加载镜头时，镜头试拍查看器窗口就会打开。或者，你可以可以点击HUD左下角的镜头（Take）缩略图打开上一个镜头。

![Take Viewer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2499367-3b09-4204-a130-35ede53bc133/takeviewer.jpg)

#### 标记镜头

你可以在当前镜头上添加星号、旗帜标记，或将其标记为"不佳"。

![Take tagging options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ec0c051-928d-486c-8c54-84a063bde25e/takeviewer_tagging.png)

#### 平滑镜头

在浏览镜头时，你可以点击右上角的按钮，并使用出现的滑块对关卡序列中的摄像机关键帧进行平滑操作。

![Slider for Take smoothing](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0d03df0-c79f-44d3-a963-92e4c50098fd/vcam_smoothtake.png)

#### 使用轮播视图切换镜头

要打开轮播视图，请点击左下角的镜头（Take）缩略图。轮播视图会按时间顺序列出所有镜头。

![Take Viewer carousel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed678528-76fe-4b15-a3dd-5fe9e51df19f/takeviewer_carousel.png)

在轮播视图中，你可以进行以下操作：

-   滑动缩略图以切换镜头。位于中央的缩略图将成为当前项，其会以白色高亮显示，且其缩略图会在预览窗口中放大。
    
-   点击预览窗口，打开关卡序列进行浏览。顶部的蓝色高亮表示当前正在浏览的关卡序列。
    
-   点击下方按钮中的向下箭头关闭轮播视图。
    
-   点击轮播旁的 **<** 和 **\>** 按钮逐一切换镜头。
    

#### 打开镜头试拍浏览器

你可以点击右下角的放大器图标，打开镜头试拍浏览器，获取更多搜索和筛选选项。关于镜头试拍浏览器的更多响起，请查看上文中"浏览序列并审核镜头试拍"一节下的"镜头试拍浏览器"小节。

![Open Takes Browser icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5963475d-e6c7-4e11-be2b-66cae6c0768f/takeviewer_takesbrowser.png)

## 传送

用两根手指按下屏幕并拖动，可以实现VCam传送，从而更快地在场景中移动。当按住两根手指时，你触摸的位置会显示蓝色着陆区指示器。移动手指可使着陆区跟随你的手指移动。松开手指后，虚拟摄像机就会传送到着陆区指示的位置。

传送只能检测发生碰撞的表面。

### Sequencer和书签设置

虚拟摄像机Actor最底部的分段包含摄像机设置和Sequencer播放的快速参考。最上面的分段包含摄像机书签和录制。

![Virtual Camera actor top](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27acfad6-a21d-4ea2-855e-0503863e7698/vcamtop.png) ![Virtual Camera actor bottom](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d85249f-02a6-4f48-883a-6bc24c567dcf/vcambottom.png)

**图标**

**调谐钮名称 / 操作**

**说明**

**分段1**

 

 

![Create Bookmark icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/029015d6-bddd-4a35-b2f9-f7c900c2324b/createbookmark.png)

**创建书签（Create Bookmark）**

点击此项可以为虚拟摄像机使用的当前位置、旋转以及摄像机设置创建书签。如果你启用了照片保存模式（Photo Save Mode），会出现一个DSLR摄像机图标。

![Re-inherit Camera Settings icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e2472f3-5acb-46fc-8c2b-167fabf5d7e3/reinheritcamera.png)

**重新继承摄像机设置（Re-inherit Camera Settings）**

书签存储摄像机参数（包括光圈和焦距）。此项控制跳转到书签时是否加载那些存储的摄像机参数。

![Bookmark Navigation icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16fa3df3-92b3-4922-97f0-a7f65a46a399/bookmarknavigation.png)

**书签导航（Bookmark Navigation）**

用于在场景中通过虚拟摄像机书签前后循环的导航功能按钮。

![Remove Bookmark icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2cbbf6d7-29a3-45fc-8163-8f46a05e11a7/removebookmark.png)

**移除书签（Remove Bookmark）**

点击此项可以从Unreal VCam应用程序中移除当前选定的书签。此按钮将从你的虚幻引擎项目中移除书签场景Actor。

![Current/Select Bookmark icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db2cfc07-13c9-40ab-88ef-64246e29d1bf/currentselectbookmark.png)

**当前/选择书签（Current/Select Bookmark）**

显示最近加载的书签。点击此项会显示可供选择的书签列表。

**分段2**

 

 

![Scale icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89888444-5795-425c-93e1-164d4a8ac97e/scale.png)

**缩放（Scale）**

显示当前应用于设备移动的缩放比例。如需详细信息，请参阅[带有缩放和增益设置的虚拟摄像机移动](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine#%E5%B8%A6%E6%9C%89%E7%BC%A9%E6%94%BE%E5%92%8C%E5%A2%9E%E7%9B%8A%E8%AE%BE%E7%BD%AE%E7%9A%84%E8%99%9A%E6%8B%9F%E6%91%84%E5%83%8F%E6%9C%BA%E7%A7%BB%E5%8A%A8)。

![Stabilization icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75d67fd9-8ac7-4e1a-93d8-e95e9ad3be6d/stabilization.png)

**稳定性（Stabilization）**

显示应用于虚拟摄像机的旋转和位置移动的稳定值。值越高，移动的稳定性就越高，而响应能力会变差，带来更流畅的摄像机移动。值越低，稳定性越低，而响应能力越高，带来更不平滑的摄像机移动。如需详细信息，请参阅\[虚拟摄像机稳定性\]animating-characters-and-objects/Sequencer/Cameras/VirtualCamera/controlling-virtual-camera-actors#虚拟摄像机稳定性)。

![Orientation icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38e149da-bc9d-4b97-8c0c-bf91828c4d26/orientation.png)

**倾斜、平移、滚动方向（Tilt, Pan, Roll Orientation）**

显示虚拟摄像机的旋转位置。如需详细信息，请参阅[带有缩放和增益设置的虚拟摄像机移动](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine#%E5%B8%A6%E6%9C%89%E7%BC%A9%E6%94%BE%E5%92%8C%E5%A2%9E%E7%9B%8A%E8%AE%BE%E7%BD%AE%E7%9A%84%E8%99%9A%E6%8B%9F%E6%91%84%E5%83%8F%E6%9C%BA%E7%A7%BB%E5%8A%A8)。

**分段3**

 

 

![Timeline icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e99644e-df82-4d60-8ecc-f97c25ffa8d9/timeline.png)

**时间轴（Timeline）**

显示虚幻编辑器中当前加载的序列的时间轴。要将滑块移至序列中的不同帧，请沿时间轴拖动你的手指。

![Sequencer Playback Controls icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8abecaf-3eaa-4715-b6db-c7c28e1f252f/playbackcontrol.png)

**Sequencer播放功能按钮（Sequencer Playback Controls）**

播放功能按钮的功能类似于带有播放、跳过帧、跳至开始帧和结束帧等功能的标准媒体播放应用程序。如需详细信息，请参阅[Sequencer过场动画编辑器](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)。

![Playback TimeScale icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c21259c-978d-419b-bcb9-72894df246ee/timescale.png)

**播放时标（Playback TimeScale）**

将其用于Sequencer的时标。例如，设置0.5x的值会导致序列以半速播放。

![Slate icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dfe2b06e-9b14-478c-b122-786d1ad1b641/slate.png)

**场记板（Slate）**

显示下一次录制要使用的场记板名称。点击此项即可调出屏幕键盘，可以编辑场记板名称

![Take number icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/733c6154-a36a-42a7-81a9-f72d4c66d1da/takenumber.png)

**镜头试拍（Take）**

显示下一次录制的镜头试拍编号。点击此项即可调出屏幕键盘，可以编辑镜头试拍编号。

![Sequencer Frame Counter icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32fba073-c572-4621-b39a-53fd462083c7/sequencerframecounter.png)

**Sequencer帧计数器（Sequencer Frame Counter）**

显示时间轴正在读取的当前帧编号。

![Take Recorder icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/957bfe55-528e-41bc-865f-50f296b59761/takerecorder.png)

**镜头试拍录制器（Take Recorder）**

点击此项可打开镜头试拍录制器，并开始将Gameplay、现场表演和其他来源直接录制到虚幻引擎中。如需了解详细信息，请参阅[镜头试拍录制器](/documentation/zh-cn/unreal-engine/take-recorder-in-unreal-engine)和[使用镜头试拍录制器](/documentation/zh-cn/unreal-engine/record-gameplay-in-unreal-engine)。

![Recording Time Scale icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6430b4c-95cd-43f4-9103-b3cb103704ef/recordingtimescale.png)

**录制时标（Recording Time Scale）**

使用此项可设置录制的当前时标。例如，以0.5倍速录制会以半速播放待录制的试拍镜头。审核时，你的摄像机移动速度会加快到原来的2倍，以匹配序列的原始速度。

![Open Last Take icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6545b9fa-e9ba-4edd-85e9-968e538ed5ef/takedefaulticon.png)

**打开上一个镜头**

点击缩略图，在镜头试拍查看器中打开上一个录制的镜头。

### 虚拟摄像机稳定性

点击 **稳定性（Stabilization）** 文本，打开虚拟摄像机稳定性调谐钮。这些调谐钮会影响摄像机在多大程度上防止或补偿意外的摄像机移动。使用更高的稳定性值时，摄像机移动看起来更流畅，但响应能力更低。使用更低的值时，响应能力更高，而摄像机移动中会出现大量摇晃和不稳定的情况。

**左** 调谐钮可控制 **旋转稳定性（Rotation Stabilization）** ， **右** 调谐钮可控制 **位置稳定性（Location Stabilization）** 。在下面的视频中，你可以看到使用值0x、50x（默认值）和100x之间的差异。

## 父项关系和平台

当未处于样条线模式时，虚拟摄像机的右上角会显示父项关系和平台控制。

![Parenting and Platforming controls](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4858a699-5047-47e2-ab34-a3afceb2b8a7/parentingplatforming.png)

### 创建连接支架

虽然虚拟摄像机可以连接到台式机上的任何对象，但手持操作员的可用选项仅限于过场动画摄像机绑定导轨（Cine Camera RigRails）、过场动画摄像机Actor（Cine Camera Actor）和过场动画摄像机连接支架（Cine Camera Attach Mount）。使用过场动画摄像机连接支架，你可以更好地控制虚拟摄像机如何连接到其父项，包括启用和禁用某些轴以及在跟随父项时引入延迟，以实现更自然的跟随行为。

要创建连接支架，请点击"放置Actor菜单（place actors menu）"并搜索"连接"。将 **过场动画摄像机连接支架（Cine Camera Attach Mount）** 拖放到世界中。

![Create an Attach Mount](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c5cadef-6c89-4cf0-bf6e-3ada5424a842/createattachmount.png)

要配置连接支架的父项，请在世界大纲视图中选择它，然后在 **细节（Details）** 面板中，将 **目标Actor（Target Actor）** 设置为所需的Actor。如果目标Actor是骨骼，请指定 **目标插槽（Target Socket）** 以允许连接到特定骨骼或插槽。

![Configure an Attach Mount](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f84addb-283a-4f12-be7f-ac4db92a6b59/configureattachmount.png)

将连接支架命名为可指明其父项的名称，以便稍后使用。

### 选择并连接到父项

点击中央下拉菜单就会出现可用父项的列表。虽然虚拟摄像机可以连接到场景中的任何对象，但手持操作员的可用选项仅限于过场动画摄像机绑定导轨（Cine Camera Rig Rail）、过场动画摄像机Actor（Cine Camera Actor）和过场动画摄像机连接支架（Cine Camera Attach Mount）。从此下拉菜单中选择一个选项，会自动将虚拟摄像机对齐到其新的父项并启用连接。可以使用 **回形针** 按钮打开和关闭连接。

![Select and attach a camera to a parent](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ff22e44-1361-4876-93ef-d65245138c64/selectandattach.png)

### 继承特定轴和摄像机参数

默认情况下，虚拟摄像机将从父项继承所有轴，但它仍然可以在此平台顶部移动。但是，选择最右边的轴按钮会展开轴和摄像机参数列表，可以选择性地禁用、继承（虚拟摄像机继承父项的轴值，但仍可以在顶部偏移）或锁定（虚拟摄像机继承父项的轴值，但不能在顶部偏移）。这些选项仅当父项为过场动画摄像机绑定导轨（CineCamera Rig Rail）、过场动画摄像机Actor（Cine Camera Actor）或过场动画摄像机连接支架（Cine Camera Attach Mount）时才可用。

可用选项如下：

图标

调谐钮名称 / 操作

说明

分段1

 

 

![Dolly icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e085019-8adf-41d3-9ed2-96d0012239f8/dolly.png)

**移动车（Dolly）**

点击此项可在继承、锁定或忽略父项的前后移动之间循环。

![Truck icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1170dba4-e41b-4a00-a612-dffa02cee843/truck.png)

**卡车（Truck）**

点击此项可在继承、锁定或忽略父项的左右移动之间循环。

![Crane icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/774e6e2d-9c76-44ba-9890-31bd7fe37f6a/crane.png)

**升降机（Crane）**

点击此项可在继承、锁定或忽略父项的上下移动之间循环。

![Roll icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11989bdb-7202-452e-b17d-a6983e00ca29/roll.png)

**滚动（Roll）**

点击此项可在继承、锁定或忽略父项的滚动旋转之间循环。

![Tilt icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a90c7ccc-a61d-4d1c-8db5-45751d6a9411/tilt.png)

**倾斜（Tilt）**

点击此项可在继承、锁定或忽略父项的倾斜旋转之间循环。

![Pan icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2cb14591-e6ab-4d1f-a227-7e4847ca69f2/pan.png)

**平移（Pan）**

点击此项可在继承、锁定或忽略父项的平移旋转之间循环。

![Iris icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd45339f-a446-4e09-b920-ddd790e78781/iris.png)

**光圈（Iris）**

点击此项可在继承、锁定或忽略父项的光圈摄像机参数之间循环。摄像机参数只能从过场动画摄像机绑定导轨和过场动画摄像机Actor父项继承。

![Focal Length icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f207240-512d-43f7-a868-664121506303/focallength.png)

**焦距（Focal Length）**

点击此项可在继承、锁定或忽略父项的焦距摄像机参数之间循环。摄像机参数只能从过场动画摄像机绑定导轨和过场动画摄像机Actor父项继承。

![Focus Distance icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4fc7721-8ff4-4d17-9b4d-2e9904ce7953/focusdistance.png)

**对焦距离（Focus Distance）**

点击此项可在继承、锁定或忽略父项的对焦距离摄像机参数之间循环。摄像机参数只能从过场动画摄像机绑定导轨和过场动画摄像机Actor父项继承。

### 在连接中引入延迟

如果连接到CineCameraAttachMount，虚拟摄像机还具有启用和禁用跟随延迟的附加功能。这使得在跟随汽车等物体时移动更加自然，实体摄像机不会立即跟随移动。要打开或关闭延迟，请点击连接菜单中的延迟按钮。

![Toggle Lag](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48f1b0b6-7e10-4103-9f87-f7cceaacb5e6/eagleattach.png)

可以从CineCameraAttachMount的细节面板控制此延迟的速度。位置/旋转延迟速度的值越低，响应延迟越大，而值越高，响应越快。

![Set lag in the Details panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1523ac27-4042-4bf4-b484-48cd32106e63/lag.png)

## 创建和操作自定义绑定导轨

按下工具菜单中的样条线图标，可进入样条线模式。在此模式下，右上角的连接功能按钮将更改为样条线功能按钮。左下角现在还将出现关键帧功能按钮。

虚拟摄像机的移动车样条线由CineCameraRigRail Actor表示。CineCameraRigRail允许创建样条线点，这些样条线点同时存储变换和摄像机参数（焦点、光圈和变焦），这些参数可以被虚拟摄像机继承并操作。

![Creating a Spline point](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cef8ba3e-aa57-4377-8d18-7b5fa04fbf30/camerarigrail.png)

### 创建新的CineCameraRigRail

要创建新的CineCameraRigRail，请确保将功能按钮设置为样条线选择功能按钮（由样条线图标表示）。

![Select the Spline controls](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/144c8a86-3b21-41a7-871c-3ac228c3319c/newrigrail.png)

此模式提供以下功能按钮：

图标

调谐钮名称 / 操作

说明

分段1

 

 

![Spline Mode Select icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c920b42e-3b2b-4cc1-af4c-dad69eb3ebc2/splinemodeselect.png)

模式（Mode）

点击此分段式功能按钮中的选项可切换当前操作模式，即在 **RigRail** 选择模式、 **编辑（Edit）** 模式和 **驱动（Drive）** 模式之间选择。

在 **RigRail** 选择模式下，蓝色样条线图标会突出显示。

![Active RigRail icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11d48606-36ab-4e26-a588-4afb57919d61/activerigrail.png)

激活RigRail（Active RigRail）

此下拉菜单指示当前选定的RigRail。所有其他编辑、连接和驱动工具都基于此RigRail进行操作。要更改当前选择，请展开下拉菜单并选择新的RigRail。

![New RigRail icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57bc929c-4f12-4a43-b057-5da0925080cd/newrigrailicon.png)

新建RigRail（New RigRail）

点击此项可创建新的RigRail，并将其设置为当前选择。

![elete RigRail icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae770515-379a-42d1-af54-3f2712df17e0/deleterigrail.png)

删除RigRail（Delete RigRail）

按下此按钮将删除当前选定的RigRail。要确认删除，请按住按钮，直到红色时间指示器转完一整圈。在此之前释放会取消该操作。

这是一项破坏性操作，它会从场景中完全删除CineCameraRigRail。

![Attach icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f34e8c6-9b49-4d78-8159-91d47d6eae9a/attach.png)

连接（Attach）

开关此项可使虚拟摄像机与当前选定的RigRail连接/分离。

![Attach Axes icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97f7e0d9-e61e-44e3-b300-37b340b5f099/attachaxes.png)

连接轴（Attach Axes）

此下拉菜单提供从RigRail到虚拟摄像机的轴继承功能按钮。

点击新建绑定导轨（New Rig Rail）按钮可创建新的CineCameraRigRail，并将其第一个点设置为虚拟摄像机的当前变换和摄像机参数。功能按钮会立即切换到编辑模式。

### 编辑CineCameraRigRail

将模式分段功能按钮切换到铅笔图标，可将功能按钮切换为编辑模式。此模式用于添加、删除和修改当前选定RigRail上的点。

![Select Edit mode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/217cb010-a84e-455f-bc00-df5babe98c7a/editmodeselected.png)

此模式提供以下功能按钮：

图标

调谐钮名称 / 操作

说明

分段1

 

 

![Edit Mode Select icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a0878b5-86ab-4212-be90-c1834f4fe911/editmode.png)

模式（Mode）

点击此分段式功能按钮中的选项可切换当前操作模式，即在 **RigRail** 选择模式、 **编辑（Edit）** 模式和 **驱动（Drive）** 模式之间选择。

在 **编辑（Edit）** 模式下，蓝色铅笔图标会突出显示。

![Current Point icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1fa7ef04-5d12-4794-9753-a9f4239c5a89/currentpoint.png)

当前点（Current Point）

该分节器将显示沿样条线和当前编辑点的当前支架位置。点击前进和后退箭头将分别跳转到下一个点或上一个点。以任何方式与分节器交互都会调出一个滑块，可用于沿着RigRail拖动。

![Delete Current Point icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd60cda6-5fc5-41d6-a627-5cb5e26ee0e3/deletecurrentpoint.png)

删除当前点（Delete Current Point）

按此按钮可删除当前选定点。要确认删除，请按住按钮，直到红色时间指示器转完一整圈。在此之前释放会取消该操作。如果图标呈灰色，则表示分节器的当前值介于两个点之间。

这是一项破坏性操作，会完全删除该点。

![Add Point icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ed2340b-0191-4ef3-b45e-f999f708d7d2/addpoint.png)

添加点（Add Point）

按下此按钮可使用虚拟摄像机的当前变换和摄像机参数向RigRail添加新点。归于该点的沿样条线的位置值与你当前的位置值相关：

-   如果分节器的当前值 *n* 位于RigRail的末端，则该值为 *n+1*。
-   如果当前值 *n* 在某个点而非在末端，则该值位于当前值和下一个点之间。例如，当有点2时，如果你在点1上按下此按钮，则会创建一个位置为1.5的点。
-   如果当前值 *n* 不在某个点，则位置值为 *n.*。

![Attach icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4724a579-9f4c-4b2f-8fc0-28ad5adb8285/attach.png)

连接（Attach）

开关此项可使虚拟摄像机与当前选定的RigRail连接/分离。

![Attach Axes icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3092d7f-c708-4657-b079-fa8f2116d167/attachaxes.png)

连接轴（Attach Axes）

此下拉菜单提供从RigRail到虚拟摄像机的轴继承功能按钮。

要创建RigRail，请将虚拟摄像机移动到某个位置，然后使用这些摄像机参数在该变换处向RigRail添加一个点，并对导轨上的每一个点重复此过程。

完成RigRail后，点击汽车图标进入驱动模式。

### 搭乘和驱动CineCamera RigRail

将模式分段功能按钮切换到汽车图标，可将功能按钮切换为驱动模式。此模式用于驱动RigRail支架移动，与其他两种模式的不同之处在于，除了样条线功能按钮外，它还使用调谐钮。

![Creating a Custom RigRail](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f24b4bc3-acb1-43d5-a94e-7c970e8cf301/customrigrail.png)

驱动模式提供3种驱动模式来控制RigRail，通过右侧调谐钮选择：

-   **手动（Manual）**：手动模式用于手动驱动RigRail。在此模式下，拖动左侧调谐钮可以沿着导轨拖动位置。如果位置由硬件输入或Sequencer驱动，也应使用手动模式。
    
-   **时长（Duration）**：时长模式将自动驱动RigRail在设定的时间内完成完整路径。在此模式下，会显示第二个右调谐钮。使用此调谐钮设置完成一次完整路径所需的时间。
    
-   **速度（Speed）**：速度模式将自动驱动RigRail以设定速度移动。在此模式下，会显示第二个右调谐钮。使用此调谐钮设置所需速度（以厘米/秒为单位）。要加快或减慢RigRail的速度，请在运动时转动此调谐钮。
    

无论选择哪种模式，你都可以使用右上角的RigRail功能按钮管理连接，并为两种自动驱动模式提供运输功能按钮。

可用选项如下：

图标

调谐钮名称 / 操作

说明

分段1

 

 

![Drive Mode Select icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3b76eee-9357-4204-9612-888aff187451/drivemode.png)

模式（Mode）

点击此分段式功能按钮中的选项可切换当前操作模式，即在 **RigRail** 选择模式、 **编辑（Edit）** 模式和 **驱动（Drive）** 模式之间选择。

在 **驱动（Drive）** 模式下，蓝色汽车图标会突出显示。

![Back to Start icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac8c3a48-650e-48a1-a885-08005089beec/backtostart.png)

回到起点（Back to Start）

点击此项可沿RigRail将当前位置重置回第一个点。

![Play and Reverse Play icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2324dde-2449-4718-af2e-93fbcd2ea2fb/playreverseplay.png)

播放和倒放（Play and Reverse Play）

这些功能按钮仅在速度和时长模式下可用。要使支架沿着RigRail向前移动，请点击前进箭头。要使支架沿着RigRail向后移动，请点击向后箭头。移动速度取决于你当前的驱动模式和设置。

不论向哪个方向移动，对应的箭头都会变成暂停图标。点击此项可将支架暂停在当前位置。

![Loop icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba3a04a3-da8d-4e8b-86e3-03279e0958c9/loop.png)

循环（Loop）

点击此项可在循环和不循环样条线之间循环。循环时，样条线会在完成循环后会返回到其初始位置，并根据你的驱动模式继续移动。

![Attach icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cb0f54d-49ad-44cd-af90-03169997a007/attach.png)

连接（Attach）

开关此项连接项可使虚拟摄像机与当前选定的RigRail连接/分离

![Attach Axes icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f060e22-f003-4785-8772-1b21bbfc31e5/attachaxes.png)

连接轴（Attach Axes）

此下拉菜单提供从RigRail到虚拟摄像机的轴继承功能按钮。

### 将过场动画摄像机绑定导轨与Sequencer结合使用

处于样条线模式时，左下角会出现一组额外的功能按钮，可以用来在Sequencer中设置关键帧。你可以手动或通过自动键为绑定导轨支架添加和删除关键帧。若对绑定导轨支架位置进行关键帧设置，可将沿绑定导轨的特定位置与当前序列的帧绑定在一起。播放带有绑定导轨关键帧的关卡序列会导致支架根据有关键帧的位置移动。为了防止在驱动导轨时出现冲突，绑定导轨应处于手动模式或暂停速度/时长模式。

![Using RigRail with Sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e694bcd-e233-4601-bf86-535e8d73208a/rigrailwithsequencer.png)

时间轴的颜色表示支架在该序列部分中移动的相对速度。红色表示最快的片段，逐渐变为表示最慢片段的绿色。蓝色表示支架静止

可用的关键帧命令如下：

图标

调谐钮名称 / 操作

说明

分段1

 

 

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4883151c-e724-48ed-9edd-543e9f633ebb/autokey.png)

自动关键帧（Autokey）

点击此项可打开或关闭自动关键帧。

启用自动关键帧后，一旦向Rig Rail添加新点，都会以当前帧的支架相应位置将关键帧添加到Sequencer中。移除导轨上的一个点会移除其相应的关键帧。

![Remove Keyframe icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3eddaec8-e6c7-4eb1-a3d6-9aefe7a40471/removekeyframe.png)

移除关键帧（Remove Keyframe）

点击此项可删除当前播放头位置的关键帧。要确认移除，请按住按钮，直到红色时间指示器转完一整圈。在此之前释放会取消该操作。如果图标变灰，则表示Sequencer播放头不在绑定导轨关键帧上。

![Add Keyframe icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd0c7484-f64f-4885-aafd-dc68ae35c689/addkeyframe.png)

Add Keyframe

点击此项可以为打开的关卡序列添加新的关键帧。该关键帧位于播放头位置，并使用驱动模式调谐钮或绑定导轨功能按钮上指示的当前支架位置。

## 虚拟摄像机书签

要在场景中创建新的 **VPBookmark** Actor，请按下启用了Live Link的设备屏幕左上角的绿色 **书签** 图标。此Actor可存储有关虚拟摄像机的信息，包括其位置和旋转。该书签还可存储已为摄像机调整的设置，例如曝光和镜头设置。

你可以通过向前和向后箭头，使用屏幕左下角的书签导航功能按钮，或点击书签下拉菜单并从列表中选择一个书签，重新加载放置的书签。切换 **摄像机** 图标，可加载随此书签存储的摄像机参数，例如光圈、胶片背板和焦点设置。

使用 **减号** (-)图标从启用了Live Link的设备中删除当前引用的书签。因为书签作为Actor存在于虚幻引擎场景中，你还可以使用 **大纲视图（Outliner）** 面板从编辑器手动添加和删除书签。

### 书签浏览器

你也可以使用书签浏览器列出并管理场景中的VPBookmark Actor。你可以通过右侧齿轮菜单中的书签图标打开书签浏览器。

![Bookmark ear menu icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c5ab216-04db-4b14-8fb2-9eccc1e94a9a/bookmark_earmenuicon.png)

以图块视图排列的VPBookmark Actor：

![The Bookmark Browser](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40191b36-4ef2-46e2-a88d-a31dd123096d/bookmarkbrowser.png)

#### 加载书签

打开书签的方式是点击某个条目的缩略图并跳转到书签。打开书签后，你将看到一些选项。

#### 标记书签

![Bookmark swipe right options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8d74c1c-ed9b-4aa0-8b69-99274c67ab83/bookmark_swiperight.png)

向右滑动以添加星形标记。

![Bookmark swipe left options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d050e736-53d7-41e4-93f3-4283c2b7b9ae/bookmark_swipeleft.png)

向左滑动添加旗帜标记，或删除书签。

#### 重命名书签

![Rename a bookmark](Bookmark_Rename.png)

点击并按住条目，在LiveLinkVCam应用程序中打开文本输入框，对书签进行重命名。

#### 书签的筛选与排序

筛选和排序选项位于书签浏览器的顶部。展开筛选器按钮可显示更多选项。

![Bookmark Browser filtering and sorting](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/edd82aab-b677-4bc2-a623-8cbbfd8c5dc8/bookmarkbrowser_sortfilter.png)

![Bookmark search filter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/016523a6-81b8-42d4-9ec1-6d8e8f9c6f21/bookmark_filter_search.png)

在搜索栏中输入文本，通过匹配单词或字符串筛选书签。

![Bookmark flag filter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8005fe6-1c1d-45a2-806d-9a02046588eb/bookmark_filter_flag.png)

点击旗帜图标，只列出带旗帜标记的书签。

![Bookmark star filter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c1dd8b0-2e2a-4885-9f6a-e9be34750c68/bookmark_filter_star.png)

点击星形图标，切换显示仅包含大于所显示数字数量的星形标记的书签。例如，点击直至星形显示数字2时，仅会显示带有2或3颗星的书签。

![Bookmark time filter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99f7331a-20aa-4a0e-ab66-68a17ed5ff9e/bookmark_sort_datetime.png)

点击此按钮可在将书签按最新到最旧或最旧到最新进行排序之间切换。列表只能按创建时间或字母顺序排序。

![Bookmark alphabetical filter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2cc60aee-e836-46ee-9cdd-418fb3e6c2aa/bookmark_sort_name.png)

点击此按钮可在将书签按最字母顺序或反向字母顺序进行排序之间切换。列表只能按创建时间或字母顺序排序。

#### 其他选项

点击齿轮图标，打开书签的设置菜单，可查看以下选项：

![Bookmark Browser settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e23f23fe-cb19-47db-9f6b-0e8e99661c00/bookmarkbrowser_config.png)

![Bookmark store camera parameters](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f55d8569-0230-4997-ac01-38a6a4195b97/bookmark_cameraparam.png)

书签会存储摄像机参数，包括光圈和焦距。你可以使用此设置来确定在跳转至书签时是否应恢复这些存储的摄像机参数。

![Bookmark refresh thumbnails](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/850570eb-4f2f-4b1a-996d-d34fbcdee51a/bookmark_refreshthumbnail.png)

点击刷新所有的缩略图。

### 控制序列

在虚幻编辑器中打开 **序列** 时，你可以在连接到Live Link的设备上使用 **传输（Transport）** 按钮控制其时间轴和播放。你可以使用时间轴上 **播放（Play）**、**暂停（Pause）** 和 **推移（Scrub）** 标识的播放功能按钮，观察当前序列的数据。

### 将镜头试拍录制器用于Unreal VCam应用

你可以使用 **镜头试拍录制器（Take Recorder）**，为虚幻引擎项目中的场景和角色录制你自己的序列（或镜头）。这些可以在虚幻编辑器中播放，使用镜头试拍录制器和Sequencer进行审核。

要开始录制镜头，请点击Unreal VCam应用右上角的 **录制（Record）** 按钮。

将镜头试拍录制器用于Unreal VCam应用时，请注意以下事项：

-   开始录制时，**镜头试拍录制器（Take Recorder）** 窗口会自动在虚幻引擎中打开（如果尚未打开）。
    
-   开始录制时，当前关卡序列会自动播放。
    
-   录制镜头试拍后，你可以点击镜头试拍录制器窗口中的 **审核上次录制（Review the last recording）** 按钮，查看镜头。此操作会播放镜头并隐藏虚拟摄像机HUD。退出审核模式会取消隐藏虚拟摄像机HUD。
    
-   所有录制的镜头试拍会保存为 **Sequencer剪辑片段**。保存剪辑片段会将虚拟摄像机Actor替换为[过场动画摄像机Actor](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine)，因为虚拟摄像机用于对摄像机制作动画并录制其设置和移动。
    

虚拟摄像机处于活动状态时，它会在HUD中显示当前 **时间码（Timecode）**、**场记板（Slate）** 和 **序列帧（Sequence Frame）**。此数据从镜头试拍录制器窗口获得，在虚幻编辑器和连接到Live Link的设备中显示相同的信息。

如需详细了解如何在项目中使用镜头试拍录制器，请参阅：

-   [镜头试拍录制器](/documentation/zh-cn/unreal-engine/take-recorder-in-unreal-engine)
    
-   [使用镜头试拍录制器](/documentation/zh-cn/unreal-engine/record-gameplay-in-unreal-engine)
    
-   [多用户镜头试拍录制器](/documentation/zh-cn/unreal-engine/multi-user-take-recorder-in-unreal-engine)
    

-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [virtual camera](https://dev.epicgames.com/community/search?query=virtual%20camera)
-   [working with media](https://dev.epicgames.com/community/search?query=working%20with%20media)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [带有缩放和增益设置的虚拟摄像机移动](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E5%B8%A6%E6%9C%89%E7%BC%A9%E6%94%BE%E5%92%8C%E5%A2%9E%E7%9B%8A%E8%AE%BE%E7%BD%AE%E7%9A%84%E8%99%9A%E6%8B%9F%E6%91%84%E5%83%8F%E6%9C%BA%E7%A7%BB%E5%8A%A8)
-   [浏览序列并审核镜头试拍](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E6%B5%8F%E8%A7%88%E5%BA%8F%E5%88%97%E5%B9%B6%E5%AE%A1%E6%A0%B8%E9%95%9C%E5%A4%B4%E8%AF%95%E6%8B%8D)
-   [镜头试拍浏览器](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E9%95%9C%E5%A4%B4%E8%AF%95%E6%8B%8D%E6%B5%8F%E8%A7%88%E5%99%A8)
-   [标记镜头](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E6%A0%87%E8%AE%B0%E9%95%9C%E5%A4%B4)
-   [镜头试拍浏览器中的筛选和排序](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E9%95%9C%E5%A4%B4%E8%AF%95%E6%8B%8D%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%AD%E7%9A%84%E7%AD%9B%E9%80%89%E5%92%8C%E6%8E%92%E5%BA%8F)
-   [镜头试拍查看器](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E9%95%9C%E5%A4%B4%E8%AF%95%E6%8B%8D%E6%9F%A5%E7%9C%8B%E5%99%A8)
-   [标记镜头](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E6%A0%87%E8%AE%B0%E9%95%9C%E5%A4%B4-2)
-   [平滑镜头](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E5%B9%B3%E6%BB%91%E9%95%9C%E5%A4%B4)
-   [使用轮播视图切换镜头](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%BD%AE%E6%92%AD%E8%A7%86%E5%9B%BE%E5%88%87%E6%8D%A2%E9%95%9C%E5%A4%B4)
-   [打开镜头试拍浏览器](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E6%89%93%E5%BC%80%E9%95%9C%E5%A4%B4%E8%AF%95%E6%8B%8D%E6%B5%8F%E8%A7%88%E5%99%A8)
-   [传送](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E4%BC%A0%E9%80%81)
-   [Sequencer和书签设置](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#sequencer%E5%92%8C%E4%B9%A6%E7%AD%BE%E8%AE%BE%E7%BD%AE)
-   [虚拟摄像机稳定性](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E8%99%9A%E6%8B%9F%E6%91%84%E5%83%8F%E6%9C%BA%E7%A8%B3%E5%AE%9A%E6%80%A7)
-   [父项关系和平台](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E7%88%B6%E9%A1%B9%E5%85%B3%E7%B3%BB%E5%92%8C%E5%B9%B3%E5%8F%B0)
-   [创建连接支架](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%BF%9E%E6%8E%A5%E6%94%AF%E6%9E%B6)
-   [选择并连接到父项](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E9%80%89%E6%8B%A9%E5%B9%B6%E8%BF%9E%E6%8E%A5%E5%88%B0%E7%88%B6%E9%A1%B9)
-   [继承特定轴和摄像机参数](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E7%BB%A7%E6%89%BF%E7%89%B9%E5%AE%9A%E8%BD%B4%E5%92%8C%E6%91%84%E5%83%8F%E6%9C%BA%E5%8F%82%E6%95%B0)
-   [在连接中引入延迟](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E5%9C%A8%E8%BF%9E%E6%8E%A5%E4%B8%AD%E5%BC%95%E5%85%A5%E5%BB%B6%E8%BF%9F)
-   [创建和操作自定义绑定导轨](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E6%93%8D%E4%BD%9C%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%91%E5%AE%9A%E5%AF%BC%E8%BD%A8)
-   [创建新的CineCameraRigRail](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%96%B0%E7%9A%84cinecamerarigrail)
-   [编辑CineCameraRigRail](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E7%BC%96%E8%BE%91cinecamerarigrail)
-   [搭乘和驱动CineCamera RigRail](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E6%90%AD%E4%B9%98%E5%92%8C%E9%A9%B1%E5%8A%A8cinecamerarigrail)
-   [将过场动画摄像机绑定导轨与Sequencer结合使用](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E5%B0%86%E8%BF%87%E5%9C%BA%E5%8A%A8%E7%94%BB%E6%91%84%E5%83%8F%E6%9C%BA%E7%BB%91%E5%AE%9A%E5%AF%BC%E8%BD%A8%E4%B8%8Esequencer%E7%BB%93%E5%90%88%E4%BD%BF%E7%94%A8)
-   [虚拟摄像机书签](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E8%99%9A%E6%8B%9F%E6%91%84%E5%83%8F%E6%9C%BA%E4%B9%A6%E7%AD%BE)
-   [书签浏览器](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E4%B9%A6%E7%AD%BE%E6%B5%8F%E8%A7%88%E5%99%A8)
-   [加载书签](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E5%8A%A0%E8%BD%BD%E4%B9%A6%E7%AD%BE)
-   [标记书签](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E6%A0%87%E8%AE%B0%E4%B9%A6%E7%AD%BE)
-   [重命名书签](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E9%87%8D%E5%91%BD%E5%90%8D%E4%B9%A6%E7%AD%BE)
-   [书签的筛选与排序](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E4%B9%A6%E7%AD%BE%E7%9A%84%E7%AD%9B%E9%80%89%E4%B8%8E%E6%8E%92%E5%BA%8F)
-   [其他选项](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E5%85%B6%E4%BB%96%E9%80%89%E9%A1%B9)
-   [控制序列](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E6%8E%A7%E5%88%B6%E5%BA%8F%E5%88%97)
-   [将镜头试拍录制器用于Unreal VCam应用](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine#%E5%B0%86%E9%95%9C%E5%A4%B4%E8%AF%95%E6%8B%8D%E5%BD%95%E5%88%B6%E5%99%A8%E7%94%A8%E4%BA%8Eunrealvcam%E5%BA%94%E7%94%A8)
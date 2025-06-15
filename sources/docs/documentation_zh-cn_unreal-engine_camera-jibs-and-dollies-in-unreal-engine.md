# 虚幻引擎中的摄像机吊臂和推车 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/camera-jibs-and-dollies-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:13:38.534Z

---

目录

![摄像机绑定](https://dev.epicgames.com/community/api/documentation/image/0ac855e9-0e4c-4673-8991-cfd4a3380844?resizing_type=fill&width=1920&height=335)

现实中，电影制作人用于创造平滑的横扫镜头的方式之一是使用 **摄像机绑定（Camera Rigs）**，摄像机可以附着到绑定器材上。在虚幻引擎中，你可以使用 **导轨（Rail）** 和 **升降机（Crane）** 绑定创建真实的摄像机运动。

#### 先决条件

-   你先需要了解 **[过场动画摄像机Actor](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine)**，并已经将一个电影摄像机Actor添加到关卡中。
    
-   你需要知道如何在 **[Sequencer](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)** 中 **[创建摄像机动画](/documentation/zh-cn/unreal-engine/how-to-animate-cinematic-cameras-in-unreal-engine)**。
    

## 摄像机绑定导轨

摄像机绑定导轨用于模仿 **[摄像机推车（Camera Dolly）](https://en.wikipedia.org/wiki/Camera_dolly)** 系统，用于创建 **[跟随镜头（Tracking Shots）](https://en.wikipedia.org/wiki/Tracking_shot)**。你可以根据镜头需要调整导轨的轨道长度和弧度。

![camera rig rail](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e2ed63e-9f12-40f3-bfc9-9285ee29d263/railoverview.png)

### 创建

要将导轨绑定添加至关卡，可以在 **[放置Actors（Place Actors）](/documentation/zh-cn/unreal-engine/placing-actors-in-unreal-engine)** 面板的 **过场动画（Cinematic）** 选项卡中找到 **摄像机绑定导轨（Camera Rig Rail）**，将它从面板上拖拽到视口中。

![create camera rig rail](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5eac33e7-74a0-486b-9276-2944d5eab3f0/addrail.png)

接下来，将摄像机移动到你选择好的位置，和推车相关联，将 **[世界大纲视图](/documentation/zh-cn/unreal-engine/outliner-in-unreal-engine)** 中的摄像机Actor拖拽到绑定导轨上，以便将摄像机固定至导轨。

![attach camera rig rail](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c4c1f9d-dbb0-4386-b40d-4ba99618035d/attachcamrail.gif)

将摄像机固定至推车后，还可以继续移动，以便对最终位置进行微调。

### 轨道长度和形状

摄像机绑定导轨使用虚幻引擎的 **[蓝图样条](/documentation/zh-cn/unreal-engine/blueprint-splines-in-unreal-engine)** 来确定轨道长度和形状。默认情况下，导轨在轨道头尾使用线性样条线点。可以选择并移动这些点，以便调整轨道的长度和方向。

![camera rig rail length](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d56f790e-832a-4dd4-92e1-d9a2c0a01843/railshape1.gif)

选择并移动样条线切线点会基于切线角度向轨道添加弧度。

![camera rig rail curve](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1693fda1-e401-4781-9e60-18d0eeb1fcc6/railshape2.gif)

可以向轨道样条线添加额外的点，以便微调轨道的形状。选择绑定导轨，右击样条线并选择 **在此处添加样条线点（Add Spline Point Here）** 在你的光标位置处添加一个新的点。

![camera rail spline point](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cda72924-dd88-4d49-a029-b0cf414b1316/addsplinepoint.png)

### 导轨功能选项

选择 **摄像机绑定导轨Actor（Camera Rig Rail Actor）** 时，会显示以下属性，以便控制其行为和运动。

![rail details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7feae17-75ed-40ce-a030-4cbdfd700308/railproperties.png)

名称

描述

**当前在导轨上位置（Current Position on Rail）**

此属性控制推车沿着轨道运动。值的范围必须在 **0** 和 **1** 之间，其中 **0** 表示轨道 **起点**，**1** 表示 **终点**。

![current position on rail](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba3286eb-077a-41d2-a101-548186f4c6ec/railposition.gif)

**将朝向锁定至导轨（Lock Orientation to Rail）**

默认情况下，摄像机朝向和推车朝向单独进行设置。启用 **将朝向锁定至导轨（Lock Orientation to Rail）** 会将摄像机旋转设为和推车旋转相关联。

![lock orientation to rail](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb8dec5a-de0b-4548-87a0-7a9439391067/railorientation.gif)

**显示导轨可视化（Show Rail Visualization）**

禁用 **显示导轨可视化（Show Rail Visualization）** 可以隐藏推车和轨道网格体，仅样条线可见。

![show rail visualization](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46607d0c-3be1-45b5-856a-08eeaa090087/showrail.png)

**预览网格体缩放（Preview Mesh Scale）**

此属性控制轨道和推车预览几何体尺寸。

![preview mesh scale](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b57d489-1191-463a-a042-990fb20aad71/railscale.png)

## 摄像机绑定升降机

**摄像机绑定升降机Actor（Camera Rig Crane Actor）** 用于模仿吊臂或 **[摄像机吊臂（Camera Jib）](https://en.wikipedia.org/wiki/Jib_%28camera%29)** 系统，用于创建 **[升降镜头（Crane Shots）](https://en.wikipedia.org/wiki/Crane_shot)**。升降机沿着水平和垂直轴旋转，并可按需延长。

![camera rig crane](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44a67f1b-c450-4bb2-9b72-175361bb1faf/craneoverview.png)

### 创建

要将升降机绑定添加到关卡中，在 **[放置Actors（Place Actors）](/documentation/zh-cn/unreal-engine/placing-actors-in-unreal-engine)** 面板的 **过场动画（Cinematic）** 选项卡中找到 **摄像机绑定升降机（Camera Rig Crane）**，将其从面板上拖拽至你的视口中。

![create camera rig crane](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/094886c1-ba8b-4348-8857-a6dd808e45eb/addcrane.png)

接下来。将摄像机移动到你选定的位置，和升降机锚点相关，通过将 **[世界大纲视图](/documentation/zh-cn/unreal-engine/outliner-in-unreal-engine)** 中的摄像机拖拽至绑定升降机来固定摄像机。

![attach camera crane](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28c693c0-c2e6-4b78-8c74-1405b5717b4b/attachcamcrane.gif)

### 升降机功能选项

选择 **摄像机绑定升降机Actor（Camera Rig Crane Actor）** 时，会显示以下属性，以便控制其行为和运动。

![camera rig crane details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03773b11-422f-458c-95bd-96d600c7cf5b/cranecontrols.png)

名称

描述

**升降机俯仰（Crane Pitch）**

控制升降机装置的俯仰运动。

![crane pitch](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ceeeec2-ee77-4fae-8f29-deacc259d20b/cranepitch.gif)

**升降机偏转（Crane Yaw）**

控制升降机装置的偏转运动。

![crane yaw](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4db8c972-8c19-4264-92e1-62ec1755a2bc/craneyaw.gif)

**升降机臂长（Crane Arm Length）**

控制升降机臂长（以厘米为单位）。这是一个类型感知域，代表着如果你以其他单位输入，比如 **2m**，就会自动转换为 **200cm**。

![crane arm length](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcdf0ad6-5c8e-4f58-a2a6-a4d5bab0b813/cranelength.gif)

**锁定挂载俯仰/偏转（Lock Mount Pitch / Yaw）**

默认情况下，摄像机方向和升降机俯仰及偏转运动各自独立。启用 **锁定挂载俯仰（Lock Mount Pitch）** 或 **锁定挂载偏转（Lock Mount Yaw）** 其一会将摄像机旋转设为与升降机俯仰或偏转旋转相关。

![crane lock axis](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1705d0b-8482-4fef-bdc1-de3422e6fc0f/cranelockaxis.gif)

## Sequencer中的摄像机绑定

操纵摄像机绑定的主要方式之一是在 **Sequencer** 中为它们添加动画。摄像机绑定导轨（Camera Rig Rail）和摄像机绑定升降机Actor（Camera Rig Crane Actor）轨道可以被[**添加至你的序列**](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine#%E6%B7%BB%E5%8A%A0actor)

![add camera rig sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ec4173d-ead7-4751-869e-1a140bada30c/addtoseq.png)

你还需要将已固定的摄像机Actor作为Sequencer中的轨道添加，以便和绑定的运动一起设置动画。

![add camera rig sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f48cd04d-03d9-49b8-bba2-47b7f75d874e/addcameraseq.png)

### 导轨

可以点击轨道上的 **\+ 轨道（+ Track）** 按钮，在 **属性（Properties）** 类目中选择，将摄像机导轨属性轨道添加到Sequencer中。

![camera rail tracks](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f142507a-cc7b-4b2b-9fa2-f9c971f54d50/addrailtracks.png)

添加轨道后，你可以在导轨上 **[设置关键帧](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine)** 和摄像机属性轨道，以便创建跟踪镜头。

![camera rig rail example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1749c02e-0024-4ced-895d-3584b0573793/railexample.gif)

### 升降机

可以点击轨道上的 **\+ 轨道（+ Track）** 按钮，在 **属性（Properties）** 类目中选择，添加摄像机升降机绑定属性轨道。

![camera crane tracks](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4292ee26-14c2-464b-8b1b-3a31a4c54a92/addcranetracks.png)

添加轨道后，你可以在升降机上 **[设置关键帧](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine)** 和摄像机属性轨道，以便创建升降镜头。

![camera rig crane example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03996ec3-5416-4cdb-acc0-b2918bc723ea/craneexample.gif)

### 结合升降机和导轨

你也可以使用上述的摄像机固定步骤，将导轨固定到升降机，以便创建 **推车和升降机** 系统。升降机和导轨属性可一同添加动画，为你的镜头创作增添更多自由度与真实感。

![crane and rail example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb4801f4-c749-4b19-ae50-b38a68136dc1/combinedexample.gif)

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [camera](https://dev.epicgames.com/community/search?query=camera)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/camera-jibs-and-dollies-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [摄像机绑定导轨](/documentation/zh-cn/unreal-engine/camera-jibs-and-dollies-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA%E7%BB%91%E5%AE%9A%E5%AF%BC%E8%BD%A8)
-   [创建](/documentation/zh-cn/unreal-engine/camera-jibs-and-dollies-in-unreal-engine#%E5%88%9B%E5%BB%BA)
-   [轨道长度和形状](/documentation/zh-cn/unreal-engine/camera-jibs-and-dollies-in-unreal-engine#%E8%BD%A8%E9%81%93%E9%95%BF%E5%BA%A6%E5%92%8C%E5%BD%A2%E7%8A%B6)
-   [导轨功能选项](/documentation/zh-cn/unreal-engine/camera-jibs-and-dollies-in-unreal-engine#%E5%AF%BC%E8%BD%A8%E5%8A%9F%E8%83%BD%E9%80%89%E9%A1%B9)
-   [摄像机绑定升降机](/documentation/zh-cn/unreal-engine/camera-jibs-and-dollies-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA%E7%BB%91%E5%AE%9A%E5%8D%87%E9%99%8D%E6%9C%BA)
-   [创建](/documentation/zh-cn/unreal-engine/camera-jibs-and-dollies-in-unreal-engine#%E5%88%9B%E5%BB%BA-2)
-   [升降机功能选项](/documentation/zh-cn/unreal-engine/camera-jibs-and-dollies-in-unreal-engine#%E5%8D%87%E9%99%8D%E6%9C%BA%E5%8A%9F%E8%83%BD%E9%80%89%E9%A1%B9)
-   [Sequencer中的摄像机绑定](/documentation/zh-cn/unreal-engine/camera-jibs-and-dollies-in-unreal-engine#sequencer%E4%B8%AD%E7%9A%84%E6%91%84%E5%83%8F%E6%9C%BA%E7%BB%91%E5%AE%9A)
-   [导轨](/documentation/zh-cn/unreal-engine/camera-jibs-and-dollies-in-unreal-engine#%E5%AF%BC%E8%BD%A8)
-   [升降机](/documentation/zh-cn/unreal-engine/camera-jibs-and-dollies-in-unreal-engine#%E5%8D%87%E9%99%8D%E6%9C%BA)
-   [结合升降机和导轨](/documentation/zh-cn/unreal-engine/camera-jibs-and-dollies-in-unreal-engine#%E7%BB%93%E5%90%88%E5%8D%87%E9%99%8D%E6%9C%BA%E5%92%8C%E5%AF%BC%E8%BD%A8)
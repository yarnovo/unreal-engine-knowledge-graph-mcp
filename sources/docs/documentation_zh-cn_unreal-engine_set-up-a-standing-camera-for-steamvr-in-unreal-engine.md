# 在虚幻引擎中设置SteamVR的站立式相机 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/set-up-a-standing-camera-for-steamvr-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:45:27.440Z

---

目录

![设置SteamVR的站立式相机](https://dev.epicgames.com/community/api/documentation/image/c0793bc7-2090-45b0-89ae-e880c3f08748?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47da0579-1317-4d49-94a2-574c0d2ca861/vr_standing_experience.png)

开始用虚幻引擎开发SteamVR上的VR项目时，首先要考虑的一点便是确定该体验为坐立式还是站立式。以下指南将讲述如何设置站立式SteamVR 体验的UE项目VR相机。

## 步骤

以下内容将讲述如何进行站立式SteamVR体验的Pawn设置。

1.  首先，打开或新建Pawn蓝图，然后前往 **视口（Viewport）** 选项卡的 **组件（Component）** 部分。在此处用以下命名添加以下两个组件，并将VRCamera设为VRCameraRoot的子项：
    
    组件命名
    
    值
    
    **场景**
    
    VRCameraRoot
    
    **相机**
    
    VRCamera
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fa71c0e-2103-450c-97ee-5a97fd511cfc/ht_steamvr_camera_setup_00.png)
    
    由于VR相机能在不实际移动相机的情况下实现相机位置偏移，因此无论使用何种VR头戴显示器，Epic均推荐以此方式设置VR相机。
    
2.  接下来，打开Pawn蓝图（如未打开），然后在 **Event Graph** 中从 **Event Begin Play** 节点连出引线，显示可执行操作（Executable Actions）列表。在列表中搜索 **Set Tracking Origin** 节点，点击将其添加到事件图表。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a259ba47-bf32-4a64-8973-7f9086db9754/ht_rift_camera_setup_09.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a259ba47-bf32-4a64-8973-7f9086db9754/ht_rift_camera_setup_09.png)
    
    点击查看大图。
    
3.  Set Tracking Origin节点有两个选项：Floor Level和Eye Level。针对站立式体验，需将Set Tracking Origin节点的 **Origin** 留为默认 **Floor Level**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e44e0442-0a5c-4472-9834-e42dfaa48efa/ht_rift_camera_setup_10.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e44e0442-0a5c-4472-9834-e42dfaa48efa/ht_rift_camera_setup_10.png)
    
    点击查看大图。
    
4.  将Pawn蓝图从内容浏览器拖入关卡，将其放置在关卡中0,0,0的位置。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37c391d9-711a-4653-b8bd-150565003512/ht_rift_camera_setup_06.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37c391d9-711a-4653-b8bd-150565003512/ht_rift_camera_setup_06.png)
    
    点击查看大图。
    
5.  选中放置在关卡中的Pawn蓝图，然后在 **Pawn** 设置下的 **细节** 面板中，将 **自动拥有玩家（Auto Possess Player）** 从 **禁用（Disabled）** 设为 **玩家0（Player 0）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63147ba2-65f1-45d0-914e-929188f57c6a/ht_rift_camera_setup_07.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63147ba2-65f1-45d0-914e-929188f57c6a/ht_rift_camera_setup_07.png)
    
    点击查看大图。
    

## 最终结果

最后，前往 **主工具栏（Main Toolbar）** 将 **播放模式（Play Mode）** 改为 **VR预览（VR Preview）**，然后按下 **播放（Play）** 按钮。戴上HTC Vive头戴显示器，坐下观察关卡时，将看到与以下视频类似的内容：

## UE4项目下载

可使用以下链接下载用于创建此例的UE4项目。

-   [**SteamVR站立式VR相机范例项目**](https://epicgames.box.com/s/8n6rtur0q01jrmgbdacog986tuzfx7js)

-   [basics](https://dev.epicgames.com/community/search?query=basics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/set-up-a-standing-camera-for-steamvr-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/set-up-a-standing-camera-for-steamvr-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [UE4项目下载](/documentation/zh-cn/unreal-engine/set-up-a-standing-camera-for-steamvr-in-unreal-engine#ue4%E9%A1%B9%E7%9B%AE%E4%B8%8B%E8%BD%BD)
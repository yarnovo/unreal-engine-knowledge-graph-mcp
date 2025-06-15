# 在虚幻引擎中为Oculus Rift设置站立式相机 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/set-up-a-standing-camera-for-the-oculus-rift-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:45:58.419Z

---

目录

![为Oculus Rift设置站立式相机](https://dev.epicgames.com/community/api/documentation/image/450424f1-9b71-48c8-b8b4-de3553825932?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7639ba8-0fb3-4fe7-9ffb-0f83976c932b/vr_standing_experience.png)

开始用UE4开发Oculus Rift上的VR项目时，首先需要考虑的一点便是确定该体验为坐立式或站立式。以下指南将讲述如何设置站立式Oculus Rift体验的UE4项目VR相机。

## 步骤

以下内容将讲述如何进行站立式Oculus Rift体验的Pawn设置。

1.  首先打开或新建一个Pawn蓝图，然后前往 **视口** 标签的 **组件** 部分。在此处用以下命名添加以下两个组件，并将VRCamera设为VRCameraRoot的子项：
    
    组件命名
    
    值
    
    **场景**
    
    VRCameraRoot
    
    **相机**
    
    VRCamera
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/337b97ff-0ad4-45ed-9505-96dc4b69648b/ht_rift_camera_setup_03.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/337b97ff-0ad4-45ed-9505-96dc4b69648b/ht_rift_camera_setup_03.png)
    
    点击查看全图。
    
    When
    
    无论您使用的是何种VR头戴显示器，Epic都推荐以此方式设置VR相机。因为它能在不实际移动相机的情况下实现相机位置的偏移。
    
2.  接下来打开Pawn蓝图，然后在 **事件图表（Event Graph）** 中从 **Event Begin Play** 节点连出引线，显示"可执行操作（Executable Actions）"列表。在列表中搜索 **Set Tracking Origin** 节点，点击并将其添加到事件图表。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/386efc7e-e7f4-4bb9-a9f3-a96b0ae41ad0/ht_rift_camera_setup_09.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/386efc7e-e7f4-4bb9-a9f3-a96b0ae41ad0/ht_rift_camera_setup_09.png)
    
    点击查看全图。
    
3.  Set Tracking Origin节点拥有两个选项：**地面平面（Floor Level）** 和 **视线平面（Eye Level）**。针对站立式体验，需要将Set Tracking Origin节点的 **原点** 保持为默认的 **地面平面**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82689721-a391-46fb-b7df-f4b8b6760891/ht_rift_camera_setup_10.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82689721-a391-46fb-b7df-f4b8b6760891/ht_rift_camera_setup_10.png)
    
    点击查看全图。
    
4.  将Pawn蓝图从内容浏览器拖入关卡，将其放置在关卡中0,0,0处。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de557f9d-e758-4902-ae2c-52f5ec812a2f/ht_rift_camera_setup_06.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de557f9d-e758-4902-ae2c-52f5ec812a2f/ht_rift_camera_setup_06.png)
    
    点击查看全图。
    
5.  选中放置在关卡中的Pawn蓝图，然后在 **Pawn** 设置下的 **细节** 面板中将 **自动拥有玩家（Auto Possess Player）** 从 **禁用（Disabled）** 改为 **Player 0**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ecd775f-ecd0-428c-bc39-4a4566e32090/ht_rift_standing_camera_04.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ecd775f-ecd0-428c-bc39-4a4566e32090/ht_rift_standing_camera_04.png)
    
    点击查看全图。
    

## 最终结果

最后前往 **主工具栏** 将 **播放模式（Play Mode）** 改为 **VR预览（VR Preview）**，然后按下 **播放** 按钮。您戴上Oculus Rift头戴显示器站立观察关卡时，将看到与以下视频相似的内容。

## UE4项目下载

可使用以下链接下载用于创建此例的UE4项目。

-   [**Oculus Rift站立式VR相机范例项目**](https://epicgames.box.com/s/qgoh6uk0f8ra4rtvp0jdrxygfb2n9ykv)

-   [basics](https://dev.epicgames.com/community/search?query=basics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/set-up-a-standing-camera-for-the-oculus-rift-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/set-up-a-standing-camera-for-the-oculus-rift-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [UE4项目下载](/documentation/zh-cn/unreal-engine/set-up-a-standing-camera-for-the-oculus-rift-in-unreal-engine#ue4%E9%A1%B9%E7%9B%AE%E4%B8%8B%E8%BD%BD)
# 虚幻引擎中的nDisplay Actor复制 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/ndisplay-actor-replication-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:28:02.605Z

---

目录

![nDisplay Actor复制](https://dev.epicgames.com/community/api/documentation/image/880536a5-22b0-48c1-b546-8ab03accff0e?resizing_type=fill&width=1920&height=335)

nDisplay系统的所有输入仅能由主节点（primary node）处理。无任何复制时，仅主节点能发现场景中的变更。因此，主节点需要能将变更复制到nDisplay网络的所有其他部分。

要进行以上操作，nDisplay提供两种不同组件，可将其附加到Actor：

-   **DisplayClusterSceneComponentSyncParent** 组件追踪其父组件3D变换中的变更，并将此类变更推动到网络中的其他群集节点。  
    nDisplay系统所用的默认DisplayClusterPawn使用此组件。
    
-   **DisplayClusterSceneComponentSyncParent** 组件追踪其子组件3D变换中的变更，并将此类变更推动到网络中的其他群集节点。
    

例如，在以下Actor中，Actor在关卡中移动时，**DisplayClusterSceneComponentSyncParent\_Scene** 组件追踪并复制其父Actor 3D变换的变更。**DisplayClusterSceneComponentSyncThis** 组件追踪并同步其子立方体组件相对于场景图表根的移动。

![DisplayClusterSceneComponentSyncParent](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6935ce7-7b85-489e-83cf-5b7b213f0e6c/01-bp-actor-sync_ue5.png "DisplayClusterSceneComponentSyncParent")

如场景中的其他Actor可能会在游戏进程中受影响，则须使用这两个组件之一将此类变更复制到所有节点。为此，请执行以下操作：

1.  在关卡视口或 **世界大纲视图（World Outliner）** 面板中选择要复制的Actor。
2.  在 **细节（Details）** 面板中，点击 **\+ 添加组件（+ Add Component）**。搜索 **DisplayClusterSceneComponentSyncParent** 或 **DisplayClusterSceneComponentSyncThis**，并在列表中选择。

![Add an nDisplay sync Component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3dc85c82-4095-4f2b-96e7-9b202e0ac019/02-add-display-sync-parent_ue5.png "Add an nDisplay sync Component")

此类组件不进行完全复制。仅将父Actor或子组件的变换发送到群集。

## 复制自定义数据

如果需要在主节点和其他群集间复制其他自定数据，可以编写自己的C++类来实现 `IDisplayClusterClusterSyncObject` 接口。nDisplay会自动调用此接口中的方法来检查该类中是否需要将每个此类中每个实例从主节点同步到其他群集节点。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [graphics](https://dev.epicgames.com/community/search?query=graphics)
-   [guide](https://dev.epicgames.com/community/search?query=guide)
-   [ndisplay](https://dev.epicgames.com/community/search?query=ndisplay)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [复制自定义数据](/documentation/zh-cn/unreal-engine/ndisplay-actor-replication-in-unreal-engine#%E5%A4%8D%E5%88%B6%E8%87%AA%E5%AE%9A%E4%B9%89%E6%95%B0%E6%8D%AE)
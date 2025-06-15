# 虚幻引擎多用户镜头录制器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/multi-user-take-recorder-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:34:25.425Z

---

目录

![多用户镜头录制器](https://dev.epicgames.com/community/api/documentation/image/47805ca8-f63d-4c73-8aad-2fee0470b1c7?resizing_type=fill&width=1920&height=335)

在[多用户编辑](/documentation/zh-cn/unreal-engine/multi-user-editing-in-unreal-engine)会话中，你可以控制哪些节点包括在[镜头试拍录制](/documentation/zh-cn/unreal-engine/take-recorder-in-unreal-engine)会话中。 你可以将节点指定为录制节点，其中可能包含 **操作（Operator）** 会话中不可见的额外数据，例如，多用户会话中 **nDisplay** 或游戏节点的数据。

在下面的示例中，有四个节点连接到该会话。

-   **Computer A**: 主操作员，使用多用户功能控制阶段（Stage）。
-   **Computer B**：辅助主操作员会话的编辑者节点。

![The node list](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff904e2b-a93f-4513-a38a-48f416fb79f2/01-multi-user-session.png)

在 **Take Recorder** 面板中，你还会在使用新的"设置"分段时看到类似的界面。

有一个称为 **同步Take Recorder操作（Synchronize Take Recorder Transactions）** 的主属性，用于控制发送多用户录制事件的触发器。禁用此属性时，对应的节点将灰显，这表示用户无法触发多用户录制。

"多用户镜头试拍同步"属性还包含指向 **多用户镜头试拍设置（Multi-User Take Settings）** 中的 **排除筛选器（Exclusion Filters）** 的快捷方式，这样用户就可以筛选源。之前，如果不指定筛选器，就无法在多用户设置中使用Take Recorder来防止进行录制的镜头试拍。

![多用户镜头试拍同步属性已启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc5a8182-8c8b-442f-868a-8c3ea6c78938/02-set-exclusion-filters.png)

在下图中，"同步Take Recorder操作"已禁用，并且多用户图标消失了，这表示你将在本地进行录制。

![多用户镜头试拍同步属性已禁用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9c5b00b-40cc-4864-b534-a08a0102dc69/03-synchronize-take-recorder.png)

在启用了"同步Take Recorder操作"的已连接会话中，已连接节点将有两个属性指示它们参与了多用户录制会话。

1.  **在客户端上录制（Record on Client）**：这是在执行录制的客户端。 在"虚拟制片"阶段中，这通常会是作为录制权威的单台机器。
    
2.  **操作源（Transact Sources）**：这些是为其他节点传达Take Recorder中的 **源** 的节点。 在上图中，源 **Actor\_Blueprint** 由操作员节点提供。 操作员节点对源属性进行的任何更改都将传播到其他节点。如果其他节点更改了源，更改不会传播到其他节点。
    

指定了源并指定了至少一个进行录制的节点之后，多用户录制图标将重新显示，并且你可以开始录制。

可以同时激活多个录制节点。 但是，此配置将生成多个Take Recorder资产，这些资产会附加录制节点的名称。  
例如，如果 `computer_A` 和 `computer_B` 都在录制，`Scene_01_03` 将变为 `Scene_01_03_computer_A` 和 `Scene_01_03_computer_B`。  
如果用户激活了多个录制节点，将向用户显示警告。

如果不提供源，就无法开始录制。

![没有源，无法录制](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cbbecbe-b38c-4f5e-8be3-dc8d39288ddf/04-provide-source-to-record.png)

-   [post processing](https://dev.epicgames.com/community/search?query=post%20processing)
-   [take recorder](https://dev.epicgames.com/community/search?query=take%20recorder)
-   [multi-user editing](https://dev.epicgames.com/community/search?query=multi-user%20editing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
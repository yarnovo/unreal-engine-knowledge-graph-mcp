# 虚幻引擎多用户编辑概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:34:26.435Z

---

目录

![多用户编辑概述](https://dev.epicgames.com/community/api/documentation/image/57551833-dc20-404f-8c90-da17bbe0125c?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

多用户编辑工作流程基于客户端-服务器模型而构建，其中一个 *服务器* 托管任意数量的 *会话*。每个会话是单独的虚拟工作空间，位于同一个网络上的任何虚幻编辑器实例都可以连接到这个空间，以便在一个共享环境内就同一个项目内容进行协作。

![Multi-User Editing network server and clients](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fec0fb2-e677-4267-ab71-971600a8fbd6/multiuser-editing-overview.png "Multi-User Editing network server and clients")

在会话工作空间内时，每个用户都可以虚幻编辑器实例支持的任意方式与项目内容互动。例如：

-   某些用户可能使用标准台式机设置中的键盘和鼠标工作，或根据需要使用其他平台工作。
    
-   其他用户可能选择使用编辑器的VR编辑模式来显示场景，以及使用VR头显和控制器在场景中工作，或者可能使用移动设备通过[虚拟摄像机](/documentation/zh-cn/unreal-engine/virtual-cameras-in-unreal-engine)等插件进入同一个场景。
    

每当有任何连接的用户更改项目中的关卡或保存资产时，他们的虚幻编辑器实例会自动将关于该更改的信息转发到服务器。服务器负责跟踪所有这些更改记录，或者 **事务**，并将这些事务发送到所有其他连接的客户端。然后，每个客户端在其自己的环境内部本地应用相同的更改。这样，每个人看到的当前关卡和项目中的其他资产都是最新的，包含了最新更改。

## 同步事务

多用户编辑系统选择不同的策略来在连接的客户端之间同步更改，具体取决于你处理的资产类型和所做的更改类型。

### 关卡：即时同步

你对关卡内容所做的所有更改都会立即与会话中的所有其他计算机同步。如果你添加或移除Actor，四处移动Actor，切换材质，或更改Actor的属性，会话中的所有其他用户都会看到这些更改立即生效。拖动工具来移动、旋转或缩放Actor会导致你在拖动时发生多个事务。即使你还没未松开鼠标，其他用户也会看到这些更改。

例如，在以下视频中，当左侧用户四处拖动Actor以进行更改时，右侧用户会在他们的视口中立即看到这些变化，即使左侧用户没有松开鼠标。同样，当右侧用户旋转对象，左侧用户也会立即看到更改。

仅当处于同一种编辑器模式，才会看到其他用户更改的效果：即，两人都处于编辑模式，或者都处于 **在编辑器中运行（PIE）** 或 **模拟** 模式。

### 其他资产：保存时同步

在虚幻引擎项目中更改大多数资产类型时，多用户编辑系统不会立即将更改同步。这包括材质和材质实例、静态网格体资产、蓝图类等资产类型。在这些情况下，当你对这些资产进行更改时，你是唯一一个看到这些更改在环境中立即生效的人。当你保存更改时，多用户编辑系统会发送事务给会话中的所有其他用户。 

在这种情况下，事务实际上是保存的资产，而不是简单的更改记录。每个接收这些更新包的编辑器实例都会立即对更新进行热重载，让更改立即显示出来。

例如，在以下视频中，当左侧用户更改材质时，更改不会立即同步。但是，当用户保存对资产的更改时，事务会被处理，更改会立即显示给右侧用户。

在保存资产后，资产会自动锁定。此外，当某些类型资产存在未保存的更改时，多用户编辑系统会为其他用户将这些资产标记为"脏"。请参阅下文的[避免冲突](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E9%81%BF%E5%85%8D%E5%86%B2%E7%AA%81)。

### Sequencer：播放同步和可选UI同步

多用户编辑系统将关卡序列和主序列视为关卡：当任意用户对序列进行更改时，如添加或移除轨迹，或者添加新的关键帧，它会立即将该更改同步到会话中的所有其他用户。 

此外，当一个用户播放序列时，同一个序列会对打开该序列的所有用户立即播放。只有开始播放的用户才能够停止播放。序列停止后，所有用户都可以重新开始播放。

你还可以选择让多用户编辑系统在一个用户打开Sequencer UI时在所有客户端上同时打开该UI。由于多用户编辑系统会为打开同一个序列的所有用户同步播放，因此启用该UI同步选项可帮助你确保所有用户同时看到相同的序列播放。

以下视频显示了多用户编辑系统如何同步Sequencer UI事件、播放事件和编辑事件。

要按如上所示为Sequencer启用UI同步，请使用 `Concert.EnableOpenRemoteSequencer` 控制台命令。有关详细信息，请参阅[多用户编辑参考](/documentation/zh-cn/unreal-engine/multi-user-editing-reference-for-unreal-engine)的[控制台命令](/documentation/zh-cn/unreal-engine/multi-user-editing-reference-for-unreal-engine#%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%91%BD%E4%BB%A4)部分。

多用户编辑系统同步播放事件，但不同的计算机可能会按不同帧速播放动画。不要认为各个虚幻编辑器实例都拥有帧准确结果。

## 在线状态

多用户编辑系统提供一些不同的方法查看会话中的其他用户在进行的操作。

以下部分中描述的在线状态信息使用显示名称和颜色来区分连接的用户。每个用户可以使用 **项目设置（Project Settings）** 中的 **显示名称（Display Name）** 和 **头像颜色（Avatar Color）** 设置来自定义这些值。有关详细信息，请参阅[多用户编辑参考](/documentation/zh-cn/unreal-engine/multi-user-editing-reference-for-unreal-engine#%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)。

### 位置和视点

当你与另一个用户在同一关卡中操作时，会看到表示其在场景中位置和视点的头像。他们与场景互动时，你还会看到激光束，指示通过鼠标光标或运动控制器高亮显示的对象。

例如，下图显示了在同一个关卡中操作的两个台式机用户的头像：

![Multi-User Editing desktop avatars](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65a2f0d8-f5cb-47e9-a497-682087f965fc/multiuserediting-ov-presence-avatars.png "Multi-User Editing desktop avatars")

你可以随时使用 **多用户浏览器（Multi-User Browser）** 窗口中 **连接的客户端（Connected Clients）** 面板中的控制按钮来处理该在线状态信息。

![Multi-User Editing Connected Clients panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f798386-76da-4765-bf5b-f97d607cc2a6/ue5_01-connected-clients.png "Multi-User Editing Connected Clients panel")

图标

描述

![Teleport to user's point of view](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b75f390-c417-4e28-94e5-1e53fe01dbe4/multiuserediting-ov-presence-location.png "Teleport to user's point of view")

立即传送到与该用户相同的位置和视点。

![Toggle presence visibility](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5cbb37b5-6c81-419f-908e-134c23810b37/multiuserediting-ov-presence-visibility.png "Toggle presence visibility")

切换显示该用户的头像和激光指针。

你也可以点击任意已连接用户列出的 **关卡** 来切换到该关卡并立即传送到该用户的位置和视点。

### 会话更改历史记录

**多用户浏览器（Multi-User Session）** 窗口显示了当前会话中发生的所有编辑事务的列表，以及每次用户连接会话或断开会话连接的事务。

![Session change history](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3bce693-f902-4783-b24d-1772b8f87fb3/ue5_02-multi-user-browser.png "Session change history")

### 资产更改历史记录

你还可以查看各个资产的更改列表。在内容浏览器中右键单击资产，然后选择 **多用户（Multi-User）>资产历史记录（Asset History）**。你将获得修改该特定资产的所有事务的列表。

![Asset change history](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74f28449-bd09-4f7a-a883-3817511d99ec/ue5_03-asset-history.png "Asset change history")

## 避免冲突

当你允许多个人同时就同一内容协作时，他们最后可能会同时更改相同的内容。如果过于放松而允许发生这种情况，可能会导致因为大家争夺控制权而崩溃，或者丢失他们所做的更改。另一方面，如果过于严格，则会限制大家在需要时修改内容的能力，导致工作变慢或完全阻碍了工作。

多用户编辑系统尝试在这两种极端情况之间寻求平衡，防止大多数用户争用情况下发生争夺和覆盖。

### 锁定拖拽的选择

当你主动在关卡视口中拖拽选择时——例如，移动、旋转或调整大小——你就获得了对这些Actor的独占控制权。如果另一个用户尝试修改其中的任意Actor，无论是使用 **关卡视口** 中的工具拖拽还是在 **细节（Details）** 面板中设置属性，它们的更改都会立即被还原。

停止拖拽交互后，其他用户便立即可以自由使用这些Actor，即使你仍选中它们也毫无影响。

### 锁定资产

如果想要防止其他用户修改某些资产，可以将它们锁定。资产被锁定期间，只有锁定它的用户可以保存新修改。其他用户仍可以在其自己的项目本地修改锁定资产，但不能保存修改，直到拥有锁定的用户解锁为止。

要锁定和解锁资产，有两种方法：

-   任何时候，开始修改解锁的资产时，均会临时将其锁定，直到保存更改为止。
    
-   也可在不修改选定资产的情况下锁定和解锁它们。在 **内容浏览器** 中对其点击右键并选择 **多用户（Multi-User）>锁定资产（Lock Asset(s)）** 或 **多用户（Multi-User）>解锁资产（Unlock Asset(s)）**。
    
    ![Lock and unlock Assets](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/959ad959-63c7-4861-b813-8104aa47848c/ue5_04-lock-asset.png "Lock and unlock Assets")

你可以根据 **内容浏览器** 中的资产缩略图上的覆层来判断锁定和修改的资产。将鼠标移到资产上可以看到关于拥有锁定或修改资产的用户的详细信息。

![Asset locks and dirty flag](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78798836-1335-4c2d-8814-921af3a77005/ue5_05-asset-details.png "Asset locks and dirty flag")

覆层

描述

![Locked by you](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6998b5c-fd07-4234-82d1-80ffdec90a93/ue5_06-locked-by-me.png "Locked by you")

绿色表示你锁定了资产。你可以随时继续修改。其他用户不能修改此资产，直到你将其保存或解锁。

![Locked by someone else](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4fe2680-bd33-46b8-89fd-2806b8ed0de9/ue5_07-locked-by-other-user.png "Locked by someone else")

白色表示另一个用户已锁定该资产。你仍可在自己的项目中本地修改此资产。如果进行此操作，系统将告知另一用户已将其锁定：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7df49e9d-4829-4f80-97b4-99144853c40c/ue5_09-locked-asset-details.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7df49e9d-4829-4f80-97b4-99144853c40c/ue5_09-locked-asset-details.png)

除非负责锁定的用户解锁，否则将无法保存修改并将此更改同步到其他用户。

![Modified but unsaved on another computer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14b536da-1686-40a4-a54c-45763bc81f1d/ue5_08-modified-asset.png "Modified but unsaved on another computer")

橙色星号表示资产在另一台计算机上标记为"脏"（修改但未保存）。

只有选中的资产类型会用这个图标进行标记。在修改这个状态的资产时务必小心——保存更改的用户首先会锁定文件，他们的更改传播到所有其他客户端，因此可能会失去其他用户所做的更改。

### 撤销和重做

每个连接的用户都只能访问他们自己的操作历史记录。在该历史记录中，每个用户都可以自由地撤销和重做他们自己的操作，就像他们没有参与任何会话一样脱机工作。但是，用户不能撤销或重做会话中任何其他用户执行的操作。

## 从常见状态开始

为避免长时间延迟和高带宽利用，多用户编辑系统中的服务器不会在连接用户之间传输项目的整个内容。相反，当需要实现即时同步时依靠交换轻量级事务记录，并且仅在关卡、静态网格体、蓝图等资产在会话期间被修改和保存时，才传播这些资产。

要确保传入事务完全按照对所有连接用户相同的方式应用，从而使每个用户内容与所有其他用户的内容保持同步，唯一方法是让每个连接用户以完全相同的状态使用完全相同的内容 *开始* 操作。这样，将同一列事务按照相同顺序应用于每个客户端时，每个用户内容的总体状态会保证保持同步。

让所有用户以相同内容开始的典型方法是使用源控制系统，如Perforce、Git或SVN，并确保每个用户像其他所有人一样将本地副本同步到同一个更改列表或修订，然后再连接到一个会话。请参阅下面的[多用户编辑和源控制](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E5%A4%9A%E7%94%A8%E6%88%B7%E7%BC%96%E8%BE%91%E5%92%8C%E6%BA%90%E6%8E%A7%E5%88%B6)部分了解更多信息。

使用源控制不是绝对要求；你可以仅使用多用户编辑，而不使用外部源控制系统。但是，这样就由你自行寻找在组织内共享项目内容的方法，以便需要协作的所有用户都能够可靠地使用相同项目内容开始操作。

### 会话验证

每次用户尝试连接到会话时，服务器都会检查其内容和工作环境的某些属性，以确认它们是否与会话最开始启动时的内容相匹配。如果任何检查失败，则服务器不会允许用户加入会话。

-   **UE版本 -** 服务器检查尝试连接到会话的用户是否与启动会话的用户使用相同版本的虚幻引擎。例如，如果启动会话的用户使用的是版本5.0，而另一个使用4.27的用户尝试加入，则服务器不会允许连接。这有助于避免因为不同版本资产格式更改而引起的问题。
    
-   **项目名称 -** 服务器检查尝试连接到会话的用户是否打开了一个项目，其名称与用来创建会话的项目的名称相匹配。如果该检查失败，服务器会假设两个项目中的内容不相同，因此拒绝连接。
    
    ![Failure to join - invalid Project name](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1812792-7965-412a-b155-b91db3124a58/ue5_10-failed-to-join-invalid-name.png "Failure to join - invalid Project name")
-   **源控制版本 -** 如果启动会话的用户连接到了虚幻编辑器中的源控制提供者，服务器会将他们的项目更改列表或修订版与会话关联起来。当另一个拥有活跃源控制提供者的用户尝试连接到该会话时，服务器会检查他们的更改列表或修订版是否与会话关联的对应项匹配。 
    
-   **本地修改的文件 -** 如果你已连接到源控制提供者，并且你有任何本地修改的文件，服务器将阻止你创建新会话和加入现有会话。这样可以避免让使用不同版本特定资产的多个用户处理同一个变更列表。
    

## 事务和持久更改

当你和你的团队成员在一个实时会话中工作时，编辑器在类似于虚拟沙箱的环境中，在本地项目内容的基础上应用事务。只要你仍在会话中，磁盘上的项目文件实际上完全没有修改。多用户编辑系统负责跟踪更改，并在虚幻编辑器中向你显示对项目内容应用这些事务的结果。

任何会话参与方随时可以选择 **持久存储** 会话更改：获取当前会话中所作的所有修改，并将这些更改应用到磁盘上的本地文件。如果你在仍与源控制提供者相连时开始会话，还可以选择在新更改列表或修订版中检入这些相同的更改。

![Persist Session Changes from the Toolbar](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59c76fcc-2d8c-4843-b393-572bc2c31ae3/ue5_12-persist-session-changes.png "Persist Session Changes from the Toolbar")

如果你离开会话而不持久存储更改，编辑器会自动将项目恢复为开始或加入会话时的状态。它会将你在会话期间修改的所有资产热重载到项目中，废弃会话修改。虽然你退出会话后不会再看到会话更改，但事务不会完全丢失。每个会话仍保留其所有事务的记录，即使在所有用户退出后，每个会话仍会保留其所有事务的记录。如果稍后重新加入同一个会话，多用户编辑系统会在编辑器中重新应用所有这些事务。

如离开 *拥有* 的会话而不保存，系统也会提示保存更改。此操作有助于避免意外忘记保存会话中的更改。即使忽视该提示，也不会永久失去未保存的更改。可随时重新加入会话，然后保存更改。即使服务器关闭，会话更改也不会丢失；请参见下一节了解详情。

### 冗余

服务器会保留每个会话，直到创建会话的用户将其显式删除，或者直到服务器自身关闭。因此，任何一个甚至所有客户端崩溃或断开连接，都不会导致丢失修改。用户只需重新连接到服务器，并从退出的地方继续即可。

服务器还会自我保护，将会话记录保存到磁盘，这可以防止信息因意外关闭而丢失。

-   如果服务器异常关闭，下一次重新启动服务器时，它会立即按照关机时的状态恢复之前打开的所有会话。
    
-   如果彻底关闭服务器，它会将所有活跃会话存档。你可以在之后通过存档恢复会话。请参阅下一部分，了解详细信息。
    

## 多用户编辑和源控制

多用户编辑系统提供了类似于源控制系统的一些功能，例如，用一个服务器存储事务历史记录，让用户获得对所处理资产的锁定以减少争用。但是，**多用户编辑不能取代源控制**。

多用户编辑最好用于增强你在其中使用专用源控制系统（如Perforce、SVN或Git）的标准协作工作流，以定期记录你对项目的更改。

如果你正在使用Perforce，也可以考虑使用虚幻游戏同步工具（UGS）来简化这个过程。有关详细信息，请参阅[UGS文档](/documentation/zh-cn/unreal-engine/unreal-game-sync-ugs-for-unreal-engine)。

当你在团队中设置了这样的版本控制系统时，使用多用户编辑对特定的定义更改列表进行限时实时协作。

-   在每个实时会话开始时（拍摄、一天的工作、审查会议或者适用于你与团队共同工作的任何工作），所有参与者共同决定作为起点的变更列表。这通常是最新的修订版。所有都将同步到该修订版。
    
-   在实时会话结束时，一个人将这些更提交到团队的常规源控制系统以进行保存。
    
-   从一个会话将更改提交到源控制后，你可以删除该会话——已经不再需要该会话。
    
-   下一次需要与别人即时协作时，根据最新更改列表建立新会话。
    

我们建议你不要长时间（数天或数周）持续使用一个多用户编辑会话。定期暂停并将更改提交到源控制。

有关将虚幻编辑器UI连接到源控制提供者的更多信息，请参阅[虚幻引擎中的协作](/documentation/zh-cn/unreal-engine/collaboration-and-version-control-in-unreal-engine)和[源控制](/documentation/zh-cn/unreal-engine/source-control-in-unreal-engine)。

## 以"-game"模式启动

若你使用"-game"命令行选项启动项目，你还需要加入"-messaging"选项。该选项会启用消息总线（ MessageBus）系统，以便多人用户编辑系统的组件相互通信。

## 网络连接

当你加入一个会话时，虚幻编辑器实例通过UDP在端口 **6666** 上连接到服务器。

-   运行虚幻编辑器并且想要连接到服务器的每台电脑都必须能够看到该服务器计算机的专用IP地址。
    
-   服务器计算机必须向来自本地网络的UDP流量打开端口 **6666**。
    

这个连接应该仅在本地局域网（LAN）上有效，或者两个端点都位于同一个虚拟私有网络（VPN）中。**不能** 通过开放式互联网连接共享虚幻编辑器会话。

"入门"页面中的说明应该足以帮助你在简单LAN中启动并运行。如果你在客户端和服务器之间建立连接时遇到问题，可以调整虚幻编辑器实例和服务器的UDP消息设置。请参阅[高级多用户联网](/documentation/zh-cn/unreal-engine/advanced-multi-user-networking-in-unreal-engine)部分。

-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [multi-user editing](https://dev.epicgames.com/community/search?query=multi-user%20editing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [同步事务](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E5%90%8C%E6%AD%A5%E4%BA%8B%E5%8A%A1)
-   [关卡：即时同步](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E5%85%B3%E5%8D%A1%EF%BC%9A%E5%8D%B3%E6%97%B6%E5%90%8C%E6%AD%A5)
-   [其他资产：保存时同步](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E5%85%B6%E4%BB%96%E8%B5%84%E4%BA%A7%EF%BC%9A%E4%BF%9D%E5%AD%98%E6%97%B6%E5%90%8C%E6%AD%A5)
-   [Sequencer：播放同步和可选UI同步](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#sequencer%EF%BC%9A%E6%92%AD%E6%94%BE%E5%90%8C%E6%AD%A5%E5%92%8C%E5%8F%AF%E9%80%89ui%E5%90%8C%E6%AD%A5)
-   [在线状态](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E5%9C%A8%E7%BA%BF%E7%8A%B6%E6%80%81)
-   [位置和视点](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E4%BD%8D%E7%BD%AE%E5%92%8C%E8%A7%86%E7%82%B9)
-   [会话更改历史记录](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E4%BC%9A%E8%AF%9D%E6%9B%B4%E6%94%B9%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95)
-   [资产更改历史记录](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E8%B5%84%E4%BA%A7%E6%9B%B4%E6%94%B9%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95)
-   [避免冲突](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E9%81%BF%E5%85%8D%E5%86%B2%E7%AA%81)
-   [锁定拖拽的选择](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E9%94%81%E5%AE%9A%E6%8B%96%E6%8B%BD%E7%9A%84%E9%80%89%E6%8B%A9)
-   [锁定资产](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E9%94%81%E5%AE%9A%E8%B5%84%E4%BA%A7)
-   [撤销和重做](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E6%92%A4%E9%94%80%E5%92%8C%E9%87%8D%E5%81%9A)
-   [从常见状态开始](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E4%BB%8E%E5%B8%B8%E8%A7%81%E7%8A%B6%E6%80%81%E5%BC%80%E5%A7%8B)
-   [会话验证](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E4%BC%9A%E8%AF%9D%E9%AA%8C%E8%AF%81)
-   [事务和持久更改](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E4%BA%8B%E5%8A%A1%E5%92%8C%E6%8C%81%E4%B9%85%E6%9B%B4%E6%94%B9)
-   [冗余](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E5%86%97%E4%BD%99)
-   [多用户编辑和源控制](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E5%A4%9A%E7%94%A8%E6%88%B7%E7%BC%96%E8%BE%91%E5%92%8C%E6%BA%90%E6%8E%A7%E5%88%B6)
-   [以"-game"模式启动](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E4%BB%A5%22-game%22%E6%A8%A1%E5%BC%8F%E5%90%AF%E5%8A%A8)
-   [网络连接](/documentation/zh-cn/unreal-engine/multi-user-editing-overview-for-unreal-engine#%E7%BD%91%E7%BB%9C%E8%BF%9E%E6%8E%A5)
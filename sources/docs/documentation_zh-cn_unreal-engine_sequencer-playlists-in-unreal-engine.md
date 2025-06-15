# 虚幻引擎中的Sequencer播放列表 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/sequencer-playlists-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:13:04.112Z

---

目录

![Sequencer播放列表](https://dev.epicgames.com/community/api/documentation/image/d6b70a6a-46cf-4683-ae8c-7315fc96323a?resizing_type=fill&width=1920&height=335)

对于广播、现场活动或计时敏感型节目，你有时需要在任意一个指定的时间点播放一段序列。你可以使用 **Sequencer播放列表（Sequencer Playlists）** 执行此操作，以此在虚拟制片会话中触发序列播放。

本文档概括介绍了如何使用Sequencer播放列表。

#### 先决条件

-   Sequencer播放列表是一种必须在启用后才能使用的[插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)。在虚幻引擎菜单中找到 **编辑（Edit） > 插件（Plugins）** ，在 **虚拟制片（Virtual Production）** 分段中找到 **播放列表（Playlists）** ，并将其启用。之后你将需要重启编辑器。
    
    ![启用播放列表插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e56c2cf3-579e-4105-bedd-87bff2ed95f5/plugin.png)
    
-   你的项目已经包含你可以在播放列表中引用的一些[关卡序列](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)。

## 概述

要开始使用Sequencer播放列表，请找到虚幻引擎主菜单，并点击 **窗口（Window） > 虚拟制片（Virtual Production） > 播放列表（Playlists）** 。这将打开 **播放列表（Playlists）** 面板。

![打开播放列表面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24f7f973-ebc7-420c-a148-f4ec024fc6e0/overview1.png)

**播放列表（Playlists）** 面板包含以下界面：

![播放列表面板界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ab5091e-194b-45b7-ad07-a79130c596c8/overview2.png)

1.  **工具栏（Toolbar）** ，你可以在其中 **保存（Save）** 、 **加载（Load）** 和 **创建新播放列表（create new playlists）** 。
2.  当前播放列表的名称和简短说明。你可以通过 **保存（Save）** 播放列表来对其命名，并可以点击播放列表说明字段来编辑说明。
3.  将 **Sequencer项目** 添加到播放列表。添加一个项目后，你需要在该项目的主下拉菜单中指定你想播放的 **序列（Sequence）** 。
4.  **播放列表（Playlist）** ，其中将显示添加到播放列表的序列的列表。每个项目上还可以设置以下属性：
    
    -   **偏移（Offset）** ，用于在播放时控制序列的开始和结束剪辑。
    -   **保留（Hold）** ，用于在播放前保留序列的第一帧。具体做法是创建序列的第二个实例，并将其 **时标（Time Scale）** 设置为 **0** 。
    -   **循环（Loop）** ，用于让序列在触发时循环。如果启用了循环，那么你还必须设置在停止之前的循环次数。
    
5.  **播放模式（Play Mode）** ，它将为你的项目启用更精简的覆层，从而更容易为每个序列选择 **播放（Play）** 和 **停止（Stop）** 。
6.  **播放功能按钮（Playback Controls）** ，其中包含以下按钮：
    
    -   **全部播放（Play All）** ：开始同时播放所有播放列表项目。
    -   **全部停止（Stop All）** ：停止所有播放列表项目。
    -   **全部重置（Reset All）** ：停止所有播放列表项目，并为启用了 **保留（Hold）** 的所有序列重新保留第一帧。
    

将光标悬停在序列项目上还会显示更多按钮和属性。

![序列项目界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a16983c-2ab3-4a49-af39-ad0ac81d84ab/overview3.png)

1.  **播放功能按钮（Playback Controls）** ，你可以在其中 **播放（Play）** 、 **停止（Stop）** 和 **重置（Reset）** 该序列。
2.  该序列的 **设置（Settings）** ，其中包含以下各项：
    
    -   **播放功能按钮（Playback Controls）** 。
    -   **播放速度（Playback Speed）** ，用于控制序列在触发时的播放速度。
    -   **静音（Mute）** ，用于在点击 **全部播放（Play All）** 时禁止触发该序列。该序列仍可通过点击 **播放（Play）** 直接触发。
    -   **从播放列表删除（Remove from Playlist）** ，用于从播放列表删除该序列。
    

## 工作流程示例

Sequencer播放列表的主要用途是将预先创建的序列添加到"播放列表"，这样你可以在播放或录制另一个序列期间触发序列，以作为[子序列](/documentation/zh-cn/unreal-engine/cinematic-subscequences-track-in-unreal-engine)播放。在大部分情况下，这是在使用[镜头试拍录制器](/documentation/zh-cn/unreal-engine/take-recorder-in-unreal-engine)录制期间。

### 创建和填充播放列表

点击 **添加 (+) 项目（Add (+) Item）** 按钮，开始将序列添加到播放列表。

![创建播放列表项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8527044-373b-499c-ba65-d2b74fa98a35/create1.png)

接下来，点击 **下拉菜单** 并选择一个 **序列** ，将序列分配给项目。

![将序列分配给项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52678ab4-9b90-4916-ade2-a9b37329ce2d/create2.png)

继续添加和分配序列到播放列表，直至你对列表满意为止。

![使用项目填充播放列表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7ebe377-ccc5-41ea-91aa-deb0fdbfa62d/create3.png)

### 触发播放列表播放

要触发整个播放列表的播放，请点击 **全部播放（Play All）** 。如果尚未打开序列，这将打开新的待定序列，并无限播放所有序列，直至你停止播放为止。播放列表子序列将存储在名为 **播放列表（Playlist） - （你的播放列表名称）** 的文件夹中。

![触发播放列表播放](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95c49d57-05b2-4da6-8147-bdb2b8a1ae4f/trigger1.gif)

播放列表的最典型用例是在 **镜头试拍录制器（Take Recorder）** 会话期间将其触发。录制期间，你可以点击每个序列的播放功能按钮，在不同时间触发序列播放。在录制和播放过程期间，序列可以多次开始、停止和重置。

![镜头试拍录制器会话期间触发](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b4a2b47-14b6-401d-b60b-642234d270f0/trigger2.gif)

你还可以启用 **播放模式（Play Mode）**，它会为你的项目启用更精简的覆层，从而更容易为每个序列选择播放（Play）和停止（Stop）。

![播放模式更容易选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f71c4af9-d362-43d9-b79d-75a9779fe375/trigger3.gif)

### 保存和管理播放列表

你可以点击 **保存（Save）** 或打开保存（Save）**下拉菜单** 以点击 **播放列表另存为（Save Playlist As）** 来保存序列播放列表。保存的播放列表在 **内容浏览器（Content Browser）** 中存储为 **Sequencer播放列表资产（SequencerPlaylist Assets）** 。

![保存播放列表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45b9b91a-af45-4811-b5ad-25d424b98846/manage1.png)

点击 **加载（Load）** 将显示项目中所有播放列表的列表。选择一个播放列表会将其加载为当前播放列表。

![加载播放列表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bc44c4a-7c19-420c-86d9-580569d694ae/manage2.png)

你可以点击 **创建新播放列表（Create New Playlist）** 来清除当前播放列表。

![创建新播放列表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25debc18-da1c-46f1-942b-d63e6bf22f85/manage3.png)

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [playlist](https://dev.epicgames.com/community/search?query=playlist)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/sequencer-playlists-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [概述](/documentation/zh-cn/unreal-engine/sequencer-playlists-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [工作流程示例](/documentation/zh-cn/unreal-engine/sequencer-playlists-in-unreal-engine#%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B%E7%A4%BA%E4%BE%8B)
-   [创建和填充播放列表](/documentation/zh-cn/unreal-engine/sequencer-playlists-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E5%A1%AB%E5%85%85%E6%92%AD%E6%94%BE%E5%88%97%E8%A1%A8)
-   [触发播放列表播放](/documentation/zh-cn/unreal-engine/sequencer-playlists-in-unreal-engine#%E8%A7%A6%E5%8F%91%E6%92%AD%E6%94%BE%E5%88%97%E8%A1%A8%E6%92%AD%E6%94%BE)
-   [保存和管理播放列表](/documentation/zh-cn/unreal-engine/sequencer-playlists-in-unreal-engine#%E4%BF%9D%E5%AD%98%E5%92%8C%E7%AE%A1%E7%90%86%E6%92%AD%E6%94%BE%E5%88%97%E8%A1%A8)
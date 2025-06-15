# 虚幻引擎关卡流送体积 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/level-streaming-using-volumes-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:20:20.024Z

---

目录

![关卡流送指南](https://dev.epicgames.com/community/api/documentation/image/a9216181-c89f-4b72-99f7-ce5e90c0bc7d?resizing_type=fill&width=1920&height=335)

我们需要在此处开始流入天井。玩家转过弯拐靠近天井时，将加载并显示流送关卡。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80bab92b-e0df-4276-a044-fdeef522cf69/streaminglevelvisible.png)

设置拥有两个关卡，**SunTemple\_Persistent** 和 **SunTemple\_Streaming**。**玩家出生点** 位于 **SunTemple\_Persistent** 中，游戏中的玩家由 *角色* 表示。

1.  在 **Content Browser** 中打开 **SunTemple\_Persistent**。
    
2.  将 **玩家出生点** 移至庙宇开端的位置。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8565d8ef-79c3-427a-94a2-122538ecd7f2/playerstart.png)
3.  点击 **Windows**，然后选择 **Levels**。
    
    ![](Basics/Levels/LevelsWindow/WindowLevels.png)
4.  点击 **Levels** 下拉菜单，然后选择 **Add Existing...** 新增一个关卡分段。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42976a46-1fb2-4f67-9b38-715500c569fb/addexisting.png)
5.  选择 **SunTemple\_Streaming** 加入 **Open Level** 对话，然后点击 **Open**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ea89b10-d726-4bd2-960a-dfa38285b779/suntemplestreaming_select.png)
6.  **右键点击** **Persistent Level**，从下拉菜单中选择 **Make Current**。
    

## 使用体积流入关卡

1.  在 **放置Actor（Place Actors）** 面板的 **体积（Volumes）** 选项卡中将一个 **关卡流送体积（Level Streaming Volume）** 拖入关卡。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08e725bc-332d-4842-80b4-098e55001b8e/levelstreamingvolumemodes.png)
2.  使 **关卡流送体积** 包含 **SunTemple\_Streaming** 整个可行走的区域。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38c9307e-aac6-49f9-96ab-1e663f169e0c/lsvplacement.png)
    
    注意，关卡流送体积的逻辑会追踪使用中摄像机的位置。因此，如果摄像机离玩家 Pawn 或角色较远，可能需要相应地调整 关卡流送体积的大小和放置。
    
3.  点击 **Windows**，然后选择 **Levels**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b46ffbf-b046-415c-bfd3-ee9e982ae5bd/windowlevels.png)
4.  选择 **SunTemple\_Streaming**，然后点击 **Level Details** 图标。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f36691e-4ef9-4c40-a086-9426728c14f5/leveldetails.png)
5.  点击 **Streaming Volumes** 旁边的加号（**+**）新添加一个体积。然后使用下拉菜单或滴管选择放置在关卡中的 **关卡流送体积**。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/436c30ad-5fca-4c1c-ace3-f1dac4344459/addlsv.png)
    
6.  确保 **Initially Loaded** 和 **Initially Visible** 复选框未勾选，然后关闭 **Level Details** 面板。
    
7.  返回 **视口**，选择 **Level Streaming Volume**。在 **Details** 面板中设置体积的以下属性：取消勾选 **Editor Pre Vis Only** 和 **Disabled**；**Streaming Usage** 应被设为 **SVB Visibility Blocking on Load**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8ed77a4-399a-4de0-949f-ca9b9f1e77dd/lsvsettings.png)
8.  使用 **Play in Editor** 测试流送关卡。
    

-   [level streaming](https://dev.epicgames.com/community/search?query=level%20streaming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用体积流入关卡](/documentation/zh-cn/unreal-engine/level-streaming-using-volumes-in-unreal-engine#%E4%BD%BF%E7%94%A8%E4%BD%93%E7%A7%AF%E6%B5%81%E5%85%A5%E5%85%B3%E5%8D%A1)
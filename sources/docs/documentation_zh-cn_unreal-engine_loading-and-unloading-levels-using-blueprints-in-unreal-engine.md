# 在虚幻引擎中使用蓝图加载和卸载关卡 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/loading-and-unloading-levels-using-blueprints-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:20:24.221Z

---

目录

![使用蓝图加载和卸载关卡](https://dev.epicgames.com/community/api/documentation/image/22e12e29-d3d1-4493-b26f-7ae129a4ca95?resizing_type=fill&width=1920&height=335)

我们想在此处的露台关卡中开始流送，这样在玩家转过拐角并开始靠近露台时，流送中的关卡 就会加载好并可见。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e79151d0-fd48-4ad1-ac6f-0a0a1d91961e/streaminglevelvisible.png)

作为设置的一部分，我们有两个关卡：**SunTemple\_Persistent** 和 **SunTemple\_Streaming** 。我们的 **玩家出生点（Player Start）** 位于 **SunTemple\_Persistent** 中，我们的玩家在游戏中 由 *角色* 表示。

1.  在 **内容浏览器（Content Browser）** 中打开 **SunTemple\_Persistent** 。
    
2.  将 **玩家出生点（Player Start）** 移至模板的最开头。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18bc74cf-f91c-47a4-ba32-6dc7803502e0/playerstart.png)
3.  点击 **窗口（Windows）**，然后选择 **关卡（Levels）** 。
    
4.  点击 **关卡（Levels）** 下拉菜单，然后选择 **添加现有...（Add Existing...）** 以添加新的子关卡。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/409c637f-7e79-4195-9b02-a0a298858832/addexisting.png)
5.  选择 **SunTemple\_Streaming** 以添加 **打开关卡（Open Level）** 对话框，然后点击 **打开（Open）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e843df5-2d42-4bf3-801c-3dcd45004288/suntemplestreaming_select.png)
6.  **右键点击** **持久关卡（Persistent Level）** ，并从下拉菜单选择 **设为当前（Make Current）** 。
    

## 使用蓝图在关卡中流送

1.  打开 **内容浏览器（Content Browser）** 并创建新 **蓝图类** 。此类将基于 **Actor** 。
    
2.  将新 **蓝图类** 命名为"LevelStreamer"，然后将其保存。
    
3.  在 **蓝图编辑器** 中打开 **LevelStreamer** 。
    

对于这种情况，我们需要在 **角色** 与盒体组件重叠时立即流送第二个关卡。

1.  使用 **组件（Components）** 选项卡中的 **添加组件（Add Component）** 按钮添加 **盒体碰撞（Box Collision）** 组件。
    
2.  打开蓝图的 **事件图表（Event Graph）** 。在 **组件（Components）** 选项卡中选择 **盒体（Box）** 组件，然后 **右键点击** 图表以弹出上下文菜单。
    
3.  输入"begin overlap"，然后选择 **在组件开始重叠时（On Component Begin Overlap）** 以添加该事件。
    
4.  点击并拖移 **Other Actor** 引脚，然后在上下文菜单的搜索中输入"="。选择 **Equal (Object)** 条目以添加该节点。
    
5.  点击并拖移 **\==** 节点上的第二个对象（Object）引脚，然后在上下文菜单的搜索中输入"character"。选择 **Get Player Character** 条目以添加该节点。
    
6.  按住 **B** 键并点击图表以添加 **Branch** 节点，然后将 **\==** 节点的布尔值引脚连接到 **Branch** 节点上的输入。
    
7.  将 **OnComponentBeginOverlap** 节点的执行输出引脚连接到 **Branch** 节点的执行输入引脚。
    
8.  **右键点击** 图表，然后输入"level"以在上下文菜单中搜索。从菜单选择 **加载流送关卡（Load Stream Level）** 。
    
9.  **右键点击** **关卡名称（Level Name）** 引脚并将其提升到变量，然后将该变量命名为"LevelToStream"，并在 **细节（Details）** 面板中将其设为 **可编辑（Editable）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93b9dee5-6d85-42bc-b2f6-02c63c9e02ce/leveltostreamvar.png)
10.  在 **Load Stream Level** 节点上将 **加载后可见（Make Visible After Load）** 和 **加载时应阻止（Should Block on Load）** 切换为true。
    
    对于本示例，我们将对使用此蓝图的所有关卡采用相同的默认加载行为，但你还可以将那些设为 **可编辑（Editable）** 变量。
    
11.  将 **Branch** 节点的 **True** 执行输出引脚连接到 **Load Stream Level** 节点的输入执行引脚。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4049e1cb-92b1-40ef-8bdd-7817b49ee51c/finalloadbp.png)
12.  将 **LevelStreamer** 蓝图放入关卡中，然后调整位置并缩放，直至它包含你希望 **角色** 位于其中才能开始流送的持久世界的一部分， 以及流送中的关卡将位于的整个可行走体积。
    
13.  输入 \*SunTemple\_Streaming **作为** 要流送的关卡\*\* 。
    
14.  使用在编辑器中运行（Play in Editor）来测试流送中的关卡。
    

## 使用蓝图卸载关卡

要在 *角色* 离开 **盒体（Box）** 组件时卸载关卡，你的图表将采用非常类似的逻辑，但最终会位于 **Unload Stream Level** 节点中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfffe02f-a8a2-40e5-914e-2c3cfdc28137/unloadlevel.png)

-   [level streaming](https://dev.epicgames.com/community/search?query=level%20streaming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用蓝图在关卡中流送](/documentation/zh-cn/unreal-engine/loading-and-unloading-levels-using-blueprints-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%93%9D%E5%9B%BE%E5%9C%A8%E5%85%B3%E5%8D%A1%E4%B8%AD%E6%B5%81%E9%80%81)
-   [使用蓝图卸载关卡](/documentation/zh-cn/unreal-engine/loading-and-unloading-levels-using-blueprints-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%93%9D%E5%9B%BE%E5%8D%B8%E8%BD%BD%E5%85%B3%E5%8D%A1)
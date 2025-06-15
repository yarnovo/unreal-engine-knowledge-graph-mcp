# 虚幻引擎中的待处理镜头 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/pending-takes-for-take-recorder-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:12:36.932Z

---

目录

你可以使用 **Pending Takes** 来记录你的游戏、模拟、PIE事件，然后将它们添加到现有现有序列中，或用新数据覆盖现有序列。

## 添加新序列数据

要在现有序列中添加新数据，请按照以下步骤操作：

1.  新建一个项目，并按照[使用Sequencer创建摄像机剪切](/documentation/zh-cn/unreal-engine/creating-camera-cuts-using-sequencer-in-unreal-engine)教程中的步骤为立方体添加动画，可以参考[设置第三人称项目](/documentation/zh-cn/unreal-engine/creating-camera-cuts-using-sequencer-in-unreal-engine#setuptheproject)和[为立方体添加动画](/documentation/zh-cn/unreal-engine/creating-camera-cuts-using-sequencer-in-unreal-engine#animateacube)。
2.  打开 **Take Recorder** 面板：**窗口（Window）>过场动画（Cinematics）>Take Recorder（Take Recorder）**。
3.  右键单击 **内容浏览器** 中的立方体序列，然后选择 **在Take Recorder中打开（Open in Take Recorder）**。你选中的序列不会作为源出现在 **源（Source）** 面板中。不过，在 **大纲视图（Outliner）** 中，Sequencer会显示 **待处理镜头** 作为其序列，表明该镜头在Take Recorder中已激活。
    
    ![Existing sequence added to Take Recorder](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df1a6244-2604-4999-8f31-6d248634566e/outline_pending_take.png)
4.  将 **玩家** Actor添加到 **Take Recorder**中，记录玩家与立方体的互动。
    1.  点击 **+源（+Source）按钮**，然后选择 **玩家（Player）**。
    2.  启动 **PIE（编辑器内运行）**
    3.  点击 **Take Recorder录制（Take Recorder Record）按钮**。当你开始录制时，序列会同时开始播放。如果你的立方体动画不超过三秒，那么你需要调整 **用户设置（User Settings）** 中的[倒计时](/documentation/zh-cn/unreal-engine/take-recorder-in-unreal-engine#countdown)的值，它默认在开始录制时延迟三秒。
    4.  在已动画的立方体周围移动你的玩家。
5.  完成后，点击 **停止（Stop）** 按钮或按下 **Esc** 键。
6.  点击**查看上次录制（Review last recording）按钮**，查看你的录制。

你的录制时间可以超过已添加的序列时间。 在Take Recorder中打开序列与获取序列并不相同。

## 覆盖序列数据

覆盖序列只能录制所选序列的长度。

Take Recorder允许你重新录制某个镜头，并覆写现有序列数据。 该过程会破坏数据！使用Take Recorder录制时，会将所有获取的Actor轨道添加到所选序列中，并覆写序列中所有Actor的数据。 录制长度由所选序列的长度决定。

1.  新建一个项目，并按照[使用Sequencer创建摄像机剪切](/documentation/zh-cn/unreal-engine/creating-camera-cuts-using-sequencer-in-unreal-engine)教程中的步骤为立方体添加动画，可以参考[设置第三人称项目](/documentation/zh-cn/unreal-engine/creating-camera-cuts-using-sequencer-in-unreal-engine#setuptheproject)和[为立方体添加动画](/documentation/zh-cn/unreal-engine/creating-camera-cuts-using-sequencer-in-unreal-engine#animateacube)。
2.  打开 **Take Recorder** 面板：**窗口（Window）>过场动画（Cinematics）>Take Recorder（Take Recorder）**。
3.  在 **内容浏览器（Content Browser）** 中的立方体序列上单击右键，然后选择**用录制器录制**。所选序列不会作为源出现在源面板中。但是，Slate标题会包含你添加的序列名称。
4.  将 **玩家** Actor添加到 **Take Recorder**中，记录玩家与立方体的互动。
    1.  点击 **+源（+Source）**，然后选择 **玩家（Player）**。
    2.  启动 **PIE（编辑器内运行）**
    3.  在 **Take Recorder** 中点击 **录制** 按钮。当你开始录制时，序列会同时开始播放。如果你想提前结束录制，请单击 **停止** 按钮或按下 **Esc** 键。
    4.  移动玩家与运动的立方体互动，通过序列播放完成结束录制。
5.  在 **Sequencer** 中，播放修改后的序列，并注意其中的变化。

![Record with Take Recorder](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ae5f561-77dd-422f-ac80-6bef135e22b4/record_with_take_recorder.gif)

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [take recorder](https://dev.epicgames.com/community/search?query=take%20recorder)
-   [pending take](https://dev.epicgames.com/community/search?query=pending%20take)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [添加新序列数据](/documentation/zh-cn/unreal-engine/pending-takes-for-take-recorder-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E6%96%B0%E5%BA%8F%E5%88%97%E6%95%B0%E6%8D%AE)
-   [覆盖序列数据](/documentation/zh-cn/unreal-engine/pending-takes-for-take-recorder-in-unreal-engine#%E8%A6%86%E7%9B%96%E5%BA%8F%E5%88%97%E6%95%B0%E6%8D%AE)
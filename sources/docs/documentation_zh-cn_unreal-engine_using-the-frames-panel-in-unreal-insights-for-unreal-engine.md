# 使用虚幻引擎Unreal Insights的帧面板 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-frames-panel-in-unreal-insights-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:39:12.858Z

---

目录

![帧面板](https://dev.epicgames.com/community/api/documentation/image/51b150f0-a158-4b86-94ce-57c95758035d?resizing_type=fill&width=1920&height=335)

**帧（Frames）** 面板使用条形图格式显示每帧所用的总时间。这对于识别一般趋势很有用，例如加载关卡、未优化场景可见，或同时生成大量Actor时性能低下或帧率下降。

![Unreal Insights显示的帧面板。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bfcbfaee-8b93-454b-89ed-8ec13b375578/main-image.png)

帧面板会显示帧、时序、定时器、调用者、被调用者、计数器和日志轨道。

将光标悬停在条形上可显示该帧的索引和运行时间。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/64d4c4a8-e939-4ebb-8b37-df397f90546a/frames-timeline.png)

如果右键点击条形，以下 **缩放（Zoom）** 上下文菜单选项将显示：

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90c4b172-4a8c-46be-b248-9ee0f8829d6c/zoom-options.png)

**选项**

**说明**

**自动缩放（Auto Zoom）**

切换自动缩放，使整个会话时间范围拟合帧显示窗口。　

**帧选择的缩放时序视图（Zoom Timing View on Frame Selection）**

切换选择帧时是否缩放时序视图。　

这些选项在UnrealInsightsSettings.ini文件中也可供编辑。

-   [unreal insights](https://dev.epicgames.com/community/search?query=unreal%20insights)
-   [timing insights](https://dev.epicgames.com/community/search?query=timing%20insights)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
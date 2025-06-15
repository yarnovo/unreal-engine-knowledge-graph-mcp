# 虚幻引擎媒体框架 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/media-framework-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:24:18.709Z

---

目录

![媒体框架](https://dev.epicgames.com/community/api/documentation/image/04c2fce4-f257-458d-bc57-3222af3e027b?resizing_type=fill&width=1920&height=335)

![在虚幻引擎中播放媒体（GIF图片）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1746f8f-f162-4780-b262-a661dd1e1b9b/mediaframework.gif)

UE中现有一个 **启动影片播放器（Startup Movie Player）** 系统，它只能用于引擎加载时播放启动影片。其无法用于播放游戏中的影片，它无法作为UI元素的一部分来播放影片，或在关卡中的一个静态网格体上播放影片（如一台正在播放电影的电视机）。 因此 **媒体框架** 便应运而生，它不仅能执行上述的两个例子，还提供了更多总体媒体播放功能（下有详述）。 它将在未来的版本中替代已废弃的"启动影片播放器"框架。

虚幻引擎中的媒体框架为：

-   与引擎和Slate无关
-   支持本地化音频及视频
-   可在内容浏览器、材质编辑器以及声音系统中使用
-   可与蓝图和UMG UI设计器共用
-   支持流媒体
-   可在媒体上执行快进、倒退、播放、暂停和移动操作
-   支持可插拔播放器

如上所述，媒体框架自身与引擎和Slate无关，意味着其可在任意应用中使用（而非只能在游戏引擎或编辑器中使用）。框架上有多个层，为其他子系统（如 **引擎**、**蓝图**、**Slate** 和 **UMG UI 设计器**）提供媒体播放功能。 这将覆盖多数使用实例，如游戏中的纹理和UI、编辑器中的视频教程，以及商城视频。

此页面包含数个链接，可跳转至媒体框架其他文档。建议查看"总览"页面，了解媒体框架功能详解，以及媒体框架的详细使用说明指南和快速入门页面。

## 必备知识

[

![Electra媒体播放器](images/static/document_list/empty_thumbnail.svg)

Electra媒体播放器





](/documentation/zh-cn/unreal-engine/electra-media-player-in-unreal-engine)[

![媒体编辑器参考文档](images/static/document_list/empty_thumbnail.svg)

媒体编辑器参考文档





](/documentation/zh-cn/unreal-engine/media-editor-reference-for-unreal-engine)[

![媒体框架概述](images/static/document_list/empty_thumbnail.svg)

媒体框架概述





](/documentation/zh-cn/unreal-engine/media-framework-overview-for-unreal-engine)[

![Media Framework快速入门指南](images/static/document_list/empty_thumbnail.svg)

Media Framework快速入门指南





](/documentation/zh-cn/unreal-engine/media-framework-quick-start-for-unreal-engine)[

![媒体框架教程](images/static/document_list/empty_thumbnail.svg)

媒体框架教程





](/documentation/zh-cn/unreal-engine/media-framework-unreal-engine-tutorials)[

![媒体框架技术参考](images/static/document_list/empty_thumbnail.svg)

媒体框架技术参考





](/documentation/zh-cn/unreal-engine/media-framework-technical-reference-for-unreal-engine)

-   [media framework](https://dev.epicgames.com/community/search?query=media%20framework)
-   [video playback](https://dev.epicgames.com/community/search?query=video%20playback)
-   [media player](https://dev.epicgames.com/community/search?query=media%20player)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [必备知识](/documentation/zh-cn/unreal-engine/media-framework-in-unreal-engine#%E5%BF%85%E5%A4%87%E7%9F%A5%E8%AF%86)
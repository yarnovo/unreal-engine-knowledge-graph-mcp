# 在虚幻引擎中处理音频 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/working-with-audio-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:20:47.345Z

---

目录

![处理音频](https://dev.epicgames.com/community/api/documentation/image/f19224c9-0494-4dc0-a1b8-f5a6f6be043a?resizing_type=fill&width=1920&height=335)

声音对于创造真实和身临其境的环境非常重要。从关卡中的环境声音，到载具或武器的交互声音，再到角色的对话，游戏中的音频可以决定用户体验的成败。

虚幻引擎中的音频系统提供了各种工具和功能，供音效工程师及开发人员创建出他们想要的效果。这意味着你可以在外部应用中生成一个无修改的音效版本，然后在引擎中导入该音效，再进行精心设计，最后产生所需的效果。

## 主题

[

![音频分析和可视化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02c4862c-2001-4089-9141-ce8db30894d9/placeholder_topic.png)

音频分析和可视化

关于虚幻引擎中音频分析和可视化的一系列主题。





](/documentation/zh-cn/unreal-engine/audio-analysis-and-visualization-in-unreal-engine)[

![音频调试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a4a82b0-dc04-4418-93e1-e9b5ca194d98/placeholder_topic.png)

音频调试

关于虚幻引擎内音频调试内容的合集。





](/documentation/zh-cn/unreal-engine/audio-debugging-in-unreal-engine)[

![音频Gameplay体积](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2642d3aa-a4d0-4824-ae5f-f7f7245e533f/placeholder_topic.png)

音频Gameplay体积

音频Gameplay体积是虚幻引擎中的次世代音频体积方法。





](/documentation/zh-cn/unreal-engine/audio-gameplay-volumes-in-unreal-engine)[

![虚幻引擎中的音频](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1713b23b-dd72-4b88-9505-45e755e7de6d/topicimage_metasounds.png)

虚幻引擎中的音频

虚幻引擎中的音频





](/documentation/zh-cn/unreal-engine/audio-in-unreal-engine)[

![音频内存管理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd7b14ef-44be-442e-aa82-26b8005c912e/placeholder_topic.png)

音频内存管理

关于虚幻引擎中音频内存管理的一系列主题。





](/documentation/zh-cn/unreal-engine/audio-memory-management-in-unreal-engine)[

![音频混音](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f316b302-d88a-46a1-bb8e-a37ae6acd09a/placeholder_topic.png)

音频混音

关于虚幻引擎中音频混音的一系列主题。





](/documentation/zh-cn/unreal-engine/audio-mixing-in-unreal-engine)[

![Audio Link](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/729d2833-5b79-4d6d-9998-680b2babbf8b/placeholder_topic.png)

Audio Link

与虚幻引擎Audio Link相关的话题合集。





](/documentation/zh-cn/unreal-engine/audiolink)[

![外部音频控制](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14336c36-6d49-477e-be48-985bd24871fd/placeholder_topic.png)

外部音频控制

关于虚幻引擎内外部音频控制内容的合集。





](/documentation/zh-cn/unreal-engine/external-audio-control-in-unreal-engine)[

![音乐系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a365b6fe-6671-47b1-886f-6b1fb5d54c1b/placeholder_topic.png)

音乐系统

关于虚幻引擎中音乐系统的一系列主题。





](/documentation/zh-cn/unreal-engine/music-systems-in-unreal-engine)[

![Sound Source](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8af0818-6768-40b8-bad2-edbb34354551/placeholder_topic.png)

Sound Source

介绍虚幻引擎Sound Source相关的资料。





](/documentation/zh-cn/unreal-engine/sound-sources-in-unreal-engine)[

![Soundscape](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f102fdb-94fb-4e42-b036-bf62f7cedd73/placeholder_topic.png)

Soundscape

虚幻引擎Soundscape相关的话题。





](/documentation/zh-cn/unreal-engine/soundscape-in-unreal-engine)[

![空间化和声音衰减](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f04fa76d-44ad-44d7-bdfd-3e2ed389587d/placeholder_topic.png)

空间化和声音衰减

介绍了虚幻引擎中空间化和声音衰减的学习资源。





](/documentation/zh-cn/unreal-engine/spatialization-and-sound-attenuation-in-unreal-engine)[

![子混音](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a528ace-6a22-4141-87e7-ee1cf907426b/placeholder_topic.png)

子混音

关于虚幻引擎子混音的一系列主题。





](/documentation/zh-cn/unreal-engine/submixes-in-unreal-engine)[

![音频体积Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87a63b5b-5816-4a0b-96b0-d0b119c22e2d/audio_topic.png)

音频体积Actor

介绍与虚幻引擎音频体积Actor有关的话题。





](/documentation/zh-cn/unreal-engine/audio-volume-actors-in-unreal-engine)[

![混响](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7fd274a3-2ca7-42a7-aad3-ac9bcda5fd33/audio_topic.png)

混响

混响相关的文档。





](/documentation/zh-cn/unreal-engine/reverb-in-unreal-engine)

-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [sound](https://dev.epicgames.com/community/search?query=sound)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [主题](/documentation/zh-cn/unreal-engine/working-with-audio-in-unreal-engine#%E4%B8%BB%E9%A2%98)
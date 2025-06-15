# 虚幻引擎中的Mutable纹理流送 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mutable-texture-streaming-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:04:09.816Z

---

目录

![Mutable纹理流送](https://dev.epicgames.com/community/api/documentation/image/12bc118d-9ce7-4df4-b8b1-1220d27f078d?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

Mutable实例可以逐步生成纹理。这会产生以下影响：

-   对象可以更快地准备渲染，但质量较低。
-   对象占用的内存更少，因为不会生成不需要的较大纹理mipmap，也不会占用CPU或GPU内存。
-   对象生成总时间更长，因为每次mipmap更新都会重复一些工作。
-   更新纹理mipmap时会有明显的过渡，就像标准的虚幻引擎纹理流送一样。
-   Mutable运行时更频繁地处于忙碌状态，这可能会延迟其他对象的更新。

一般建议（也即默认行为）是，在游戏进行时开启纹理流送功能，而当玩家正在自定义对象时关闭纹理流送功能，以防止mipmap更新时出现纹理闪烁现象。

Mutable会将 **纹理压缩策略（Texture Compression Strategy）** 设置为 **无（None）** ，根据[状态](/documentation/zh-cn/unreal-engine/using-customizable-states-in-mutable-with-unreal-engine)切换纹理流送。这是一种启发法，假设未压缩的纹理仅用于那些优先考虑低更新延迟且不允许纹理闪烁的可自定义对象状态，例如在大厅中更改皮肤颜色时。

此外，可以使用控制台变量 `mutable.EnableMutableProgressiveMipStreaming` 切换全局Mutable纹理流送。

在运行时，可以使用以下方法对它进行控制：`UCustomizableObjectSystem::SetProgressiveMipStreamingEnabled(bool bIsEnabled)` 。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [working with content](https://dev.epicgames.com/community/search?query=working%20with%20content)
-   [skeletal mesh](https://dev.epicgames.com/community/search?query=skeletal%20mesh)
-   [mutable](https://dev.epicgames.com/community/search?query=mutable)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
# 虚幻引擎中的Flipbook组件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/flipbook-components-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:16:17.342Z

---

目录

![Flipbook组件](https://dev.epicgames.com/community/api/documentation/image/74d34736-f0b6-452b-a10a-0bee3614404d?resizing_type=fill&width=1920&height=335)

**Flipbook组件** 为常规原始组件，可将其在3D环境中随意放置、将其附着于其他组件，或使其被其他组件所附着。每个Flipbook组件实例均可指定一个自定义颜色。该颜色将作为顶点颜色传递至Flipbook材质。也可指定一个自定义材质，替换Flipbook中定义的默认材质。

可通过调用 **SetFlipbook** 变更当前Flipbook资产，但请注意须将 **移动性** 属性设为 **可移动**（或在构建Actor时调用）。利用组件上的多种其他方法，还可对播放速度、播放方向、循环等进行控制。

使用Flipbook组件的C++文档仍在编写过程中，请查阅 [UPaperFlipbookComponent](/documentation/404) 中的更多内容，详细文档我们将尽快奉上。

## 设置

通过下方链接了解更多使用蓝图的Flipbook组件。

-   [Paper 2D Flipbooks](/documentation/zh-cn/unreal-engine/paper-2d-flipbooks-in-unreal-engine)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置](/documentation/zh-cn/unreal-engine/flipbook-components-in-unreal-engine#%E8%AE%BE%E7%BD%AE)
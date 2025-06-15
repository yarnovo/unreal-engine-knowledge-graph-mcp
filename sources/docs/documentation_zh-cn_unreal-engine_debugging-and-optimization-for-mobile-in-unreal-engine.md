# 虚幻引擎移动端优化指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/debugging-and-optimization-for-mobile-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:59:35.655Z

---

目录

![移动端优化指南](https://dev.epicgames.com/community/api/documentation/image/54c34b1d-7229-44a8-a80a-8458638f22de?resizing_type=fill&width=1920&height=335)

与桌面级硬件和主机平台相比，许多移动设备都存在很大的硬件限制，特别是在图形功能的兼容性方面。为了解决这个问题，**虚幻引擎** 为移动设备提供了一个备用的渲染路径。该渲染路径在处理虚幻的许多渲染功能时（例如阴影和纹理），使用了简化的或面向性能的模型，并且删除了许多不支持的后期处理效果。本节中的指南提供了关于移动渲染器的配置选项和功能的详细信息。

[

![移动设备上的网格体自动实例化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2552b83c-182b-4453-a699-2c83c23db5e2/placeholder_topic.png)

移动设备上的网格体自动实例化

在移动设备上启用网格体自动实例化。





](/documentation/zh-cn/unreal-engine/using-mesh-auto-instancing-on-mobile-devices-in-unreal-engine)[

![移动设备的帧平滑](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f50a80a7-4c44-4809-8f4d-8d005be00712/placeholder_topic.png)

移动设备的帧平滑

为移动设备启用并自定义帧平滑





](/documentation/zh-cn/unreal-engine/frame-pacing-for-mobile-devices-in-unreal-engine)[

![移动端的渲染优化技巧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f3ce248-df07-484d-9f06-fe5bbb9984c0/placeholder_topic.png)

移动端的渲染优化技巧

有关如何优化移动设备性能以及从移动端HDR功能获取最高保真度的指南和最佳实践





](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine)

-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)
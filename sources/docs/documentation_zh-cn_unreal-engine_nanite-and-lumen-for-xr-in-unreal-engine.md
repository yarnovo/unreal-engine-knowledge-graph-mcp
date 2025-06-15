# 虚幻引擎中XR的Nanite和Lumen | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/nanite-and-lumen-for-xr-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:44:33.910Z

---

目录

![XR的Nanite和Lumen](https://dev.epicgames.com/community/api/documentation/image/ae3db28d-c22c-4a78-896f-e2361b91d684?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

XR上的Nanite和Lumen被视为试验性的功能，不受官方支持。

## 要求

-   仅在具有延迟渲染器和DX12的PC上受到支持。
-   在移动XR硬件上不受支持。

## 注意事项

XR设备和平台附带特殊注意事项和限制。自虚幻引擎5.1起，[Nanite](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)和[Lumen](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)在两个视图（XR头戴设备的每个显示器）中渲染，因此即使使用顶级硬件，你也可能难以达到目标帧率。

-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [lumen](https://dev.epicgames.com/community/search?query=lumen)
-   [xr](https://dev.epicgames.com/community/search?query=xr)
-   [nanite](https://dev.epicgames.com/community/search?query=nanite)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [要求](/documentation/zh-cn/unreal-engine/nanite-and-lumen-for-xr-in-unreal-engine#%E8%A6%81%E6%B1%82)
-   [注意事项](/documentation/zh-cn/unreal-engine/nanite-and-lumen-for-xr-in-unreal-engine#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
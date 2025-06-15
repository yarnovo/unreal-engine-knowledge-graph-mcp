# 虚幻引擎中的水体系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/water-system-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:18:31.847Z

---

目录

![水体系统](https://dev.epicgames.com/community/api/documentation/image/daf64f3d-c7e2-4496-90e5-3dbacbde9dbd?resizing_type=fill&width=1920&height=335)

水体系统允许你基于样条线创建各种河流、湖泊、海洋，并陆地地形有机互动。它集成了着色和渲染管线，其水体表面支持物理交互和动态流体模拟，比如脚本在水中的涟漪或船在水中移动时的尾迹。

## 启用水体系统插件和内容

水体系统是一个独立的插件，可以根据你的项目需求来启用/停用。该插件能为引擎增添水体渲染和网格划分系统，还提供了范例和默认内容供你使用。

如需启用水体系统，请点击 **编辑（Edit）> 插件（Plugin）** 打开 **插件** 浏览器。搜索 **水体** 插件，勾选复选框从而启用它。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80f2dd4a-6753-4c27-ae05-3850329f2014/01-water-plugin.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80f2dd4a-6753-4c27-ae05-3850329f2014/01-water-plugin.png)

点击查看大图。

请重启编辑器以便让插件生效。

### 其他水体插件相关的内容

水体插件还包含一些默认的材质和内容，可以在你自己的项目中使用，供你探索。你可以在内容浏览器的 **水体内容（Water Content）** 中找到这些内容。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/723f1d4a-9b17-4dec-a16f-532c0792d5fd/02-content-browser-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/723f1d4a-9b17-4dec-a16f-532c0792d5fd/02-content-browser-settings.png)

点击查看大图。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1011a870-d43a-417d-947e-fb299a46cf02/03-water-content-folder.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1011a870-d43a-417d-947e-fb299a46cf02/03-water-content-folder.png)

点击查看大图。

如果你在内容浏览器中没有看到这个文件夹，请点击 **查看选项**（位于右下角），勾选 **显示引擎内容** 和 **显示插件内容**。

在此目录中，我们提供了一些地图和内容示例供你探索，比如：

-   水波生成（Caustics generation）
-   流体模拟（Fluid simulation）
-   浮力模拟蓝图（ Physics simulation buoyancy Blueprints）

## 开始入门

%building-virtual-worlds/Water/WaterRendering:Topic%[](/documentation/zh-cn/unreal-engine/water-body-actors-in-unreal-engine)

[![水体Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40d94649-a365-4816-b860-ed28f8739252/water-body-topic.png)](/documentation/zh-cn/unreal-engine/water-body-actors-in-unreal-engine)

[水体Actor](/documentation/zh-cn/unreal-engine/water-body-actors-in-unreal-engine)

[大致了解现有的各种水体，以及如何利用它们与水系统建立世界。](/documentation/zh-cn/unreal-engine/water-body-actors-in-unreal-engine)

## 基础概念

%building-virtual-worlds/Water/WaterWaveAsset:Topic%[](/documentation/zh-cn/unreal-engine/water-buoyancy-component-in-unreal-engine)

[![水浮力组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04efe661-c6ec-4a7e-bdc0-b19725012b7b/water-buoyancy-topic.png)](/documentation/zh-cn/unreal-engine/water-buoyancy-component-in-unreal-engine)

[水浮力组件](/documentation/zh-cn/unreal-engine/water-buoyancy-component-in-unreal-engine)

[介绍如何设置和使用浮力组件使物体漂浮在水面上。](/documentation/zh-cn/unreal-engine/water-buoyancy-component-in-unreal-engine)

[

![单层水着色模型](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/649721d3-d726-4114-b983-ae0e38c5d0ee/water_topic.png)

单层水着色模型

介绍单层水材质着色模型的概念，以及它是如何用来渲染基于物理水面效果。





](/documentation/zh-cn/unreal-engine/single-layer-water-shading-model-in-unreal-engine)[

![水调试和可扩展性选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b346e1e2-3196-453f-80bb-c7a5c9b8e8f7/water-debug-topic.png)

水调试和可扩展性选项

介绍如何根据项目的需求调试和扩展水。





](/documentation/zh-cn/unreal-engine/water-debugging-and-scalability-options-in-unreal-engine)

## 其他资源

-   [water](https://dev.epicgames.com/community/search?query=water)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用水体系统插件和内容](/documentation/zh-cn/unreal-engine/water-system-in-unreal-engine#%E5%90%AF%E7%94%A8%E6%B0%B4%E4%BD%93%E7%B3%BB%E7%BB%9F%E6%8F%92%E4%BB%B6%E5%92%8C%E5%86%85%E5%AE%B9)
-   [其他水体插件相关的内容](/documentation/zh-cn/unreal-engine/water-system-in-unreal-engine#%E5%85%B6%E4%BB%96%E6%B0%B4%E4%BD%93%E6%8F%92%E4%BB%B6%E7%9B%B8%E5%85%B3%E7%9A%84%E5%86%85%E5%AE%B9)
-   [开始入门](/documentation/zh-cn/unreal-engine/water-system-in-unreal-engine#%E5%BC%80%E5%A7%8B%E5%85%A5%E9%97%A8)
-   [基础概念](/documentation/zh-cn/unreal-engine/water-system-in-unreal-engine#%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5)
-   [其他资源](/documentation/zh-cn/unreal-engine/water-system-in-unreal-engine#%E5%85%B6%E4%BB%96%E8%B5%84%E6%BA%90)
# 虚幻引擎大气表达式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/atmosphere-material-expressions-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:27:52.992Z

---

目录

![大气表达式](https://dev.epicgames.com/community/api/documentation/image/ff67bac8-595f-478f-9e94-c88d043dc392?resizing_type=fill&width=1920&height=335)

## AtmosphericFogColor

**AtmosphericFogColor（大气雾颜色）**材质表达式用来在全局空间中的任意位置，查询关卡的大气雾的当前颜色。如果没有向其输送全局位置，那么将使用相关像素的全局位置。这在您需要让材质逐渐融入远方的雾颜色时非常有用。

在以下示例中，使用 AtmosphericFogColor（大气雾颜色）节点来设置"底色"（Base Color），并且 World Position（全局位置）接收一个简单网络，该网络查询相对于摄像机位置而言始终位于对象后方 50,000 个单位处的位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ce1cc66-b44d-4e44-9975-5c77e3a70a82/atmosphere-material-expression.png)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [AtmosphericFogColor](/documentation/zh-cn/unreal-engine/atmosphere-material-expressions-in-unreal-engine#atmosphericfogcolor)
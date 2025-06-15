# 虚幻引擎中的水力侵蚀 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-hydroerosion-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:12:32.744Z

---

目录

![水力侵蚀工具](https://dev.epicgames.com/community/api/documentation/image/bf1fd47c-328a-4f22-a3a6-254283b28462?resizing_type=fill&width=1920&height=335)

**水力侵蚀（Hydro Erosion）** 工具利用水力侵蚀模拟（由水流形成的侵蚀）调整地形高度图的高度。Noise 过滤器用于决定模拟中初始降雨的出现位置。 计算出的模拟将确定初始降雨的水流，以及消融、水流迁移和蒸发。 计算结果将产生实际用于降低高度图的数值。

## 使用水力侵蚀工具

在此例中，水力侵蚀工具将用于在山坡表面上绘制水域侵蚀效果。将模拟出这样的效果：随雨水不断降落，地形的一部分将随时间流逝而形成侵蚀效果。 可通过工具设置降雨量和降雨区域，对效果进行定义。

可使用以下功能键为地形高度图打造水力侵蚀效果：

**功能键**

**操作**

**Left Mouse Button**

用于对高度图形成侵蚀的 noise 过滤器。

![Before](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/acacbaa8-06e5-4f47-b92a-0314483a3f61/01-before-hydro-erosion.png "Before")

![After](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/efdea274-e2d3-469a-8741-5752200813d3/02-after-hydro-erosion.png "After")

Before

After

在此例中，水力侵蚀将通过模拟被应用到地形高度图上，雨水将随时间流逝而对高度图形成侵蚀效果。这能 在地形上形成有趣的外观和缝隙。

## 工具设置

 

 

![Hydro Erosion Tool](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a40ced32-51f7-4ccf-9418-d8fafb0cf3f4/03-hydro-erosion-tool.png "Hydro Erosion Tool")

![Hydro Erosion Tool Properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/489d9dc6-e7ae-4c5e-a4c1-41cfd8e7682b/04-hydro-erosion-tool-properties.png "Hydro Erosion Tool Properties")

**属性**

**描述**

**Tool Strength**

设定每次笔刷笔划效果的量。

**Rain Amount**

应用至地表的降雨量。数值越大，侵蚀效果越强。

**Sediment Cap.**

水流可带动的沉积物量。数值越大，侵蚀效果越强。

**Iterations**

执行的迭代次数。数值越大，生成的侵蚀层数越多。

**Initial Rain Distribution**

随机应用降雨，或应用至整个区域。

-   **Both**：此选项将使用随机模式，在部分地区形成降雨，对高度图的一部分形成侵蚀。
-   **Positive**：此项将在应用区域的所有地方上形成降雨，对高度图形成侵蚀。

**Rain Dist Scale**

应用初始降雨到地表的 noise 过滤器尺寸。Noise 过滤器与位置和比例相关，如不修改 **Rain Dist.Scale**，同一 noise 过滤器将多次应用到相同位置。

**Detail Smooth**

勾选后，使用指定的细节平滑值为侵蚀效果执行保留细节的平滑操作。细节平滑值越大，将会移除更多细节；而数值越小，则会保留更多细节。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用水力侵蚀工具](/documentation/zh-cn/unreal-engine/landscape-hydroerosion-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%B0%B4%E5%8A%9B%E4%BE%B5%E8%9A%80%E5%B7%A5%E5%85%B7)
-   [工具设置](/documentation/zh-cn/unreal-engine/landscape-hydroerosion-tool-in-unreal-engine#%E5%B7%A5%E5%85%B7%E8%AE%BE%E7%BD%AE)
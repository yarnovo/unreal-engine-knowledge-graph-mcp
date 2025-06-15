# 虚幻引擎内的MRG配置设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mrg-configuration-settings-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:11:11.524Z

---

目录

![MRG配置设置](https://dev.epicgames.com/community/api/documentation/image/2c11b00f-ad33-4668-a7ab-c907b4e63481?resizing_type=fill&width=1920&height=335)

## 屏幕追踪

Lumen默认启用了一些屏幕追踪元素。这可能会干扰图表所调用的部分图层可见性设置。 例如，如果你希望角色对反射和全局光照可见，但在给定图层上对主像素隐藏，那么启用屏幕追踪将导致角色按需在Lumen场景中显示，因此建议禁用这些元素。

禁用Lumen屏幕追踪的方法有多种。

-   你可以调用控制台变量：
    
    -   `r.Lumen.Reflections.ScreenTraces 0`
        
    -   `r.Lumen.ScreenProbeGather.ScreenTraces 0`
        
-   使用下列控制台命令在显示标记（Show Flags）中禁用两者
    
    -   `ShowFlag.LumenScreenTraces 0`
-   在显示标记（Show Flags）分段下的MRG Deferred Rendering节点中，也可以将其提升为变量。
    

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca35a2fb-35e8-4ae6-9c64-be9a909ccd53/image_0.png)

-   在虚幻引擎5.4版本中，后期处理体积（Post Process Volume）的Lumen全局光照分段和Lumen反射分段都添加了屏幕追踪布尔参数。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1909f12b-6524-4bd7-90a8-a280dd1942d2/image_1.png)

下方给出了直观的示例，展示了屏幕追踪对"隐藏时影响间接光照（Affect Indirect Lighting While Hidden）"的干扰。第一张图片展示了球体在下方镜面上的反射。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/031bf73e-4c6d-4e63-9763-2b0cfa089565/image_2.png)

启用"隐藏时影响间接光照（Affect Indirect Lighting While Hidden）"并禁用"可见（Visible）"时，反射消失了，因为它是使用屏幕空间反射绘制的。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f0ad1c6-535e-4c39-adc9-1279220780c8/image_3.png)

但如果在"后期处理体积（Post Process Volume）"中禁用屏幕追踪，反射就会重新出现。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26528d39-3c65-4ef0-88d3-597a3c6be3d9/image_4.png)

对比：

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fa6d40d-75fb-4ef2-a4ee-5af9f1352a38/image_5.png)

禁用Lumen屏幕追踪可能会改变场景的外观，因此建议在为关卡提供光照时设置这一功能，而不是纯粹在渲染时切换。

## 色调曲线

使用 **半透明Actor** 时，建议 **禁用色调曲线** ，因为引擎应用曲线/编码前会预先对alpha进行乘算。因此，如果你应用了色调曲线并尝试在其本身的图层上渲染部分半透明对象，那么合成后的结果会与你在引擎中看到的有所不同。在这种情况下，色调曲线会给出非线性颜色，这对此类合成而言并不理想。你可能必须禁用色调曲线才能使用自己的OCIO配置。

## 允许OCIO

**Allow OCIO on the Deferred** 和 **Path Traced Rendering** 节点为面向数据的渲染图层提供了退出选项（默认为开启），而这类渲染层是通过显示标记（Show Flags）和材质修改器（Material Modifiers）处理的，并不适合OCIO。

## Groom

-   有时，若在渲染Groom时有多个图层存在动态模糊，可能产生不正确的结果。建议尝试使用命令 `MoviePipeline.FlushLayersDebug 1` 进行改进。
    
-   要在使用holdout时改善Groom周围的光晕，推荐使用 `r.HairStrands.HoldoutMode 1` 命令。
    

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [movie render queue](https://dev.epicgames.com/community/search?query=movie%20render%20queue)
-   [render](https://dev.epicgames.com/community/search?query=render)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [屏幕追踪](/documentation/zh-cn/unreal-engine/mrg-configuration-settings-in-unreal-engine#%E5%B1%8F%E5%B9%95%E8%BF%BD%E8%B8%AA)
-   [色调曲线](/documentation/zh-cn/unreal-engine/mrg-configuration-settings-in-unreal-engine#%E8%89%B2%E8%B0%83%E6%9B%B2%E7%BA%BF)
-   [允许OCIO](/documentation/zh-cn/unreal-engine/mrg-configuration-settings-in-unreal-engine#%E5%85%81%E8%AE%B8ocio)
-   [Groom](/documentation/zh-cn/unreal-engine/mrg-configuration-settings-in-unreal-engine#groom)
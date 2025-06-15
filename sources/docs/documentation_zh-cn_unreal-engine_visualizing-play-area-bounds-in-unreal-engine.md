# 在虚幻引擎显示游戏区域 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/visualizing-play-area-bounds-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:43:58.073Z

---

目录

![游戏区域边界可视化](https://dev.epicgames.com/community/api/documentation/image/7c8d1ccf-31cf-44d0-b968-51f694f4a908?resizing_type=fill&width=1920&height=335)

用户可以在自己的设备上指定游戏区域的边界，有时称为 *舞台（stage）*。你可以使用[OpenXR API](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)在虚幻引擎中访问这些边界。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b6a3b81-4d90-4c47-a139-b460ea65a3f7/play-area-boundary-oculus-guardian.gif)

在Oculus设备上，当用户靠近时会出现守卫边界。

此页面介绍了你可以如何将项目中的游戏区域边界可视化。要在你的设备上设置游戏区域边界，请参阅你设备的文档。

## 游戏区域边界可视化

`Get Play Area Bounds` 函数将返回可以在你的游戏区域内找到的最大矩形的长度。当用户接近边界时，你的OpenXR兼容运行时会将游戏区域边界可视化。当用户靠近应用程序中的自定义可视化边界时，通知用户也很有用。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c3f4d1c-e49c-413e-9ea9-66e6b3ced5f6/get-play-area-bounds-blueprint-node.png)

`Get Play Area Bounds` 函数具有三个可以返回的参考空间：**齐眼高度（Eye Level）**、**地面高度（Floor Level）** 和 **舞台（Stage）**。这三个空间分别映射到OpenXR参考空间 **视图（View）**、**局部（Local）** 和 **舞台（Stage）**。在大多数情况下，我们建议你返回 **舞台（Stage）** 参考空间。有关OpenXR参考空间的更多详细信息，请参阅[OpenXR规范](https://www.khronos.org/registry/OpenXR/specs/1.0/html/xrspec.html#参考-空间)。

如果 `Get Play Area Bounds` 函数没有返回数据，则你使用的OpenXR运行时可能没有实现用于游戏区域边界的OpenXR功能。

## 传送可视化

将游戏区域边界可视化的一个例子为传送可视化。[VR模板](/documentation/zh-cn/unreal-engine/vr-template-in-unreal-engine)在传送过程中提供了这种可视化的实现。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e74ebaf7-4e6c-4e2a-8258-7fa5499e4517/vr-template-teleport-visualization.gif)

传送可视化在位于 **Content/VRTemplate/Blueprints** 的蓝图 **VRTeleportVisualizer** 中定义。下面是对边界可视化逻辑的描述。

**On Begin Play：**

1.  蓝图会使用舞台参考空间调用 `Get Play Area Bounds`。
    
2.  然后，蓝图将X和Y数据分配给[Niagara系统](/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine)中的用户变量 **NS\_PlayAreaBounds**。
    
3.  NS\_PlayAreaBounds会使用从Get Play Area Bounds返回的X值和Y值动态地绘制矩形。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba796c21-fbe3-4686-b9fe-b7771ff0d00a/teleport-visualization-on-begin-play.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba796c21-fbe3-4686-b9fe-b7771ff0d00a/teleport-visualization-on-begin-play.png)

**On Tick：**

1.  蓝图相对于传送位置移动NS\_PlayAreaBounds，由 **NS\_TeleportRing** 标识。
    
2.  这会对玩家在传送后相对于游戏区域边界所处的位置进行准确地可视化。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4484c7f2-1f1c-487c-b471-547c4b1c6ade/teleport-visualization-on-tick.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4484c7f2-1f1c-487c-b471-547c4b1c6ade/teleport-visualization-on-tick.png)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [游戏区域边界可视化](/documentation/zh-cn/unreal-engine/visualizing-play-area-bounds-in-unreal-engine#%E6%B8%B8%E6%88%8F%E5%8C%BA%E5%9F%9F%E8%BE%B9%E7%95%8C%E5%8F%AF%E8%A7%86%E5%8C%96)
-   [传送可视化](/documentation/zh-cn/unreal-engine/visualizing-play-area-bounds-in-unreal-engine#%E4%BC%A0%E9%80%81%E5%8F%AF%E8%A7%86%E5%8C%96)
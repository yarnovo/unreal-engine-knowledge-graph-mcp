# 虚幻引擎中的绘制样条线工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/draw-spline-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:08:06.756Z

---

目录

![绘制样条线](https://dev.epicgames.com/community/api/documentation/image/2c8a51d0-ec1b-4b82-84cf-aefce8697449?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**绘制样条线（Draw Spline）** 工具能在关卡编辑器中创建样条线。你可以通过 **旋转样条线（Revolve Spline）** 和 **网格体样条线（Mesh Splines）** 建模工具使用创建的样条线来创建网格体，或使用自定义蓝图Actor创建各种对象，例如轨道或藤蔓。

如需详细了解其他样条线工作流程，请查看以下内容：

-   [蓝图样条线](/documentation/zh-cn/unreal-engine/blueprint-splines-in-unreal-engine)
-   [摄像机绑定](/documentation/zh-cn/unreal-engine/camera-jibs-and-dollies-in-unreal-engine)

你可以在工具外部编辑样条线，方法是选择并操控样条线上的点，右键点击样条线，或使用 **细节（Details）** 面板。

## 访问工具

你可以在 **建模模式（Modeling Mode）** 中的 **创建（Create）** 类别中找到绘制样条线工具。如需详细了解建模模式以及访问方法，请参阅[建模模式概述](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)。

## 使用绘制样条线

要创建样条线，请按照以下步骤操作：

1.  在 **输出模式（Output Mode）** 下拉菜单中选择样条线的输出类型。
    
2.  在 **绘制模式（Draw Mode）** 下拉菜单中选择如何绘制你的样条线。
    
3.  在关卡中点击或拖动以绘制你的样条线。
    
4.  在[工具确认](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%92%A4%E9%94%80%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E5%92%8C%E6%8E%A5%E5%8F%97%E6%9B%B4%E6%94%B9)面板中接受或取消更改。
    

### 输出模式

**输出模式（Output Mode）** 决定了样条线组件的创建方式。

**输出模式**

**说明**

**空Actor（Empty Actor）**

使用样条线组件创建空Actor。

**现有Actor（Existing Actor）**

将样条线组件附加到现有Actor，如果 **要替换的现有样条线索引（Existing Spline Index To Replace）** 有效，则替换该Actor中的样条线。要选择现有Actor，在切换模式之前点击Actor，或使用滴管来选择。

**创建蓝图（Create Blueprint）**

创建 **要创建的蓝图（Blueprint To Create）** 指定的蓝图，并将样条线附加到该蓝图，如果 **要替换的现有样条线索引（Existing Spline Index To Replace）** 有效，则替换创建的对象中的现有样条线。

如果你使用的蓝图Actor有成本高昂的构造脚本，关闭高级选项下的 **拖动时重新运行构造脚本（Rerun Construction Script on Drag）** 会很有用。

### 绘制模式

要调整如何在场景中绘制样条线，请使用 **绘制模式（Draw Mode）** 分段中的属性。在关卡中创建样条线时，你可以切换不同的模式。

**绘制模式**

**说明**

**示例**

**切线拖动（Tangent Drag）**

手动控制曲率（通过切线）来逐点绘制样条线。点击以放置一个点并拖动以设置其切线。点击而不拖动会创建锐利的内角。

![切线拖动绘制模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6528f68-5f7e-4985-af4c-9ab2b53a5c5d/tangent-drag-draw-mode.gif)

**点击自动切线（Click Auto Tangent）**

使用自动设置的曲率逐点绘制样条线。点击并拖动以放置新点，并自动设置切线。

![点击自动切线绘制模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/530b2ac3-8464-4f8c-b3ec-2dc4760d015b/click-auto-tangent-draw-mode.gif)

**自由绘制（Free Draw）**

使用徒手动作绘制样条线。点击并拖动以放置多个点，间距由 **最小点间距（Min Point Spacing）** 控制。

![自由绘制绘制模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d14ff9a8-0073-4b32-ac3e-b215c3615cb4/free-draw-draw-mode.gif)

你可以通过开关 **回路（Loop）** 来获得开放或闭合的路径。为true时，点会在你绘制的过程中继续附加到回路。要帮助可视化路径和旋转，请增加 **帧可视化宽度（Frame Visualization Width）** 值。

### 光线投射目标

**光线投射目标（Raycast Targets）** 分段将确定在绘制样条线时鼠标位置如何与场景交互。你可以同时切换多个选项。

你必须启用至少一个选项才能绘制样条线。

**光线投射目标**

**说明**

**示例**

**世界（World）**

样条线在关卡中的网格体表面上绘制，但在启用 **现有Actor（Existing Actor）** 时，目标网格体除外。

![世界光线投射目标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a47c914d-dd94-4195-be6b-52bf73c6a6a0/world-raycast-target.gif)

**自定义平面（Custom Plane）**

样条线在你可以使用小工具或使用 **Ctrl + 点击** 重新定位的平面上绘制。

![自定义平面光线投射目标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98ed2565-8063-46a6-99c9-fa588750e8f1/custom-plane-raycast-target.gif)

**地平面（Ground Planes）**

样条线在透视视口中的XY地平面上绘制，或在正交视口中的查看平面上绘制。

![地平面光线投射目标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/027d40eb-fe11-44c3-a28f-d31fb9a6b1de/ground-plane-raycast-target.gif)

### 热键

**热键**

**说明**

**C**

放大鼠标的位置。

**Enter**

接受工具更改。

**ESC**

取消更改并退出工具。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [modeling mode](https://dev.epicgames.com/community/search?query=modeling%20mode)
-   [modeling tools](https://dev.epicgames.com/community/search?query=modeling%20tools)
-   [splines](https://dev.epicgames.com/community/search?query=splines)
-   [spline mesh](https://dev.epicgames.com/community/search?query=spline%20mesh)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [访问工具](/documentation/zh-cn/unreal-engine/draw-spline-tool-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%B7%A5%E5%85%B7)
-   [使用绘制样条线](/documentation/zh-cn/unreal-engine/draw-spline-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%BB%98%E5%88%B6%E6%A0%B7%E6%9D%A1%E7%BA%BF)
-   [输出模式](/documentation/zh-cn/unreal-engine/draw-spline-tool-in-unreal-engine#%E8%BE%93%E5%87%BA%E6%A8%A1%E5%BC%8F)
-   [绘制模式](/documentation/zh-cn/unreal-engine/draw-spline-tool-in-unreal-engine#%E7%BB%98%E5%88%B6%E6%A8%A1%E5%BC%8F)
-   [光线投射目标](/documentation/zh-cn/unreal-engine/draw-spline-tool-in-unreal-engine#%E5%85%89%E7%BA%BF%E6%8A%95%E5%B0%84%E7%9B%AE%E6%A0%87)
-   [热键](/documentation/zh-cn/unreal-engine/draw-spline-tool-in-unreal-engine#%E7%83%AD%E9%94%AE)

相关文档

[

建模工具

![建模工具](https://dev.epicgames.com/community/api/documentation/image/152a0302-28b3-46e6-91d6-98c2ff1dde1b?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/modeling-tools-in-unreal-engine)

[

建模模式概述

![建模模式概述](https://dev.epicgames.com/community/api/documentation/image/5f9ab70c-68fd-4dd1-9e68-9294f46ed6e0?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)

[

建模模式 - 处理资产

![建模模式 - 处理资产](https://dev.epicgames.com/community/api/documentation/image/a47163cd-8973-4f6f-b9d8-6f3f03f03df0?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/working-with-meshes-in-unreal-engine)
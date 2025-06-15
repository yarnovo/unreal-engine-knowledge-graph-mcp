# 虚幻引擎地形自动拓扑工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-retopologize-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:13:01.431Z

---

目录

![自动拓扑](https://dev.epicgames.com/community/api/documentation/image/9210f8d7-8a3f-499d-865d-43f20a76d75b?resizing_type=fill&width=1920&height=335)

**自动拓扑（Retopologize）** 工具通过 X/Y 偏移贴图自动调整地形顶点，改善所需区域中的顶点密度（如陡峭悬崖）。它将顶点分散到这些密度较低的区域中， 从而减少这类区域中的纹理拉伸。

使用 X/Y 偏移贴图后，用其他工具渲染或绘制地形的速度将变慢，因此只推荐使用拓扑工具。

## 使用自动拓扑工具

在此例中，我们通过扁平区域形成了陡峭斜坡，然而这会使地形顶点数量较少的垂直区域沿表面分布，从而导致纹理出现拉伸， 扁平区域的边缘周围也会出现一些锯齿穿帮。使用拓扑工具可对可拉伸并重新分布周边顶点，无需对扁平区域的工作进行大量修改。 这能减少出现的拉伸和锯齿边。

使用以下功能键绘制 X/Y 偏移贴图，拓扑地形高度图：

**功能键**

**操作**

**鼠标左键**

增加高度图或所选图层的权重。

**拓扑光照视图**

![使用前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02de9615-6c53-4dc1-83cf-6d8744ab328c/01-before-retopologize-lit-view.png "Before")

![使用后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f245e948-c86a-4d09-bbf8-6797a1cca444/02-after-retopologize-lit-view.png "After")

使用前

使用后

**拓扑线框视图**

![使用前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48f615a4-3fdd-421b-aed5-d17767b526f2/03-before-retopologize-wireframe-view.png "Before")

![使用后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75da53f0-1a0f-41f8-8ab3-ef5c380e393a/04-after-retopologize-wireframe-view.png "After")

使用前

使用后

在范例对比中，您可在光照展示中法线尖锐坡度的纹理拉伸已减弱； 在线框展示中则能看到顶点已重新分布，更均匀地分布在这些陡峭的坡度上。

### 工具设置

![Retopologize Tool](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b5e8fb2-567c-4fe1-9ffb-64653ba0ff9a/05-retopologize-tool.png "Retopologize Tool")

没有可进行调整的拓扑特有工具设置。选择工具，在需要重新分布顶点密度的地形中绘制区域即可。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用自动拓扑工具](/documentation/zh-cn/unreal-engine/landscape-retopologize-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%87%AA%E5%8A%A8%E6%8B%93%E6%89%91%E5%B7%A5%E5%85%B7)
-   [工具设置](/documentation/zh-cn/unreal-engine/landscape-retopologize-tool-in-unreal-engine#%E5%B7%A5%E5%85%B7%E8%AE%BE%E7%BD%AE)
# 在虚幻引擎中为网格体绘制设置顶点颜色材质 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-a-vertex-color-material-for-mesh-painting-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:19:46.573Z

---

目录

当你在网格体绘制中使用顶点颜色模式时，顶点颜色数据将与材质一起用于网格体着色。为此，你需要在材质图表中使用 **顶点颜色** 材质表达式，并结合一些逻辑来有效地利用此颜色数据。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a7b3150-8f65-4a86-b252-21e11faea178/vertexcolornode.png)

顶点颜色材质表达式。

有许多方法可以将此颜色绘制的数据与顶点颜色材质表达式结合起来使用。以下小节将展示如何将顶点绘制的颜色添加到现有材质中，从而以某种方式为该材质着色。这是你在网格体绘制系统中将顶点颜色表达式与材质结合使用的一种方式。

如需详细了解顶点颜色材质，以及如何使用它们将纹理图层混合在一起，从而在网格体上进行绘制，请参阅[为网格体绘制设置纹理混合材质](/documentation/zh-cn/unreal-engine/setting-up-a-texture-blended-material-for-vertex-weights-painting-in-unreal-engine)。

## 网格体及其材质

下面的示例网格体及其材质展示了如何将顶点颜色工作流程集成到现有材质中。

![基础静态网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86e19428-d832-492b-a8ae-9157adffd6bc/base-static-mesh.png)

![应用于静态网格体的基础材质。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e63c755-842e-41c5-a84a-1d9fa672831b/base-material.png)

基础静态网格体

应用于网格体的基础材质。

## 顶点颜色材质设置

要设置一种可绘制的材质，使其能利用绘制的顶点颜色对材质中现有的基础颜色进行着色，请添加一个 **VertexColor** 材质表达式，并将RGB颜色通道连接到一个 **Multiply** 节点的 **A** 输入。

![简单顶点颜色示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4de38040-cbff-4342-bca3-c82e857d4ac5/vertex-color-example.png)

接下来，将基础颜色（反射率）的材质逻辑连接到 **Multiply** 节点的 **B** 输入，然后将Multiply节点的输出连接到 **Main Material** 节点。

完成可绘制顶点颜色的设置后，该材质应该与下图类似。

![材质图表中顶点颜色节点的示例。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b198b848-e513-4002-8239-9555ab62b085/vertex-color-material-setup.png)

## 使用顶点颜色材质在网格体上绘制

当你在关卡视口中切换到 **网格体绘制（Mesh Paint）** 模式时，请在模式工具栏中选择 **顶点颜色（Vertex Color）** 选项卡。

![顶点颜色绘制模式选择。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/744ba19c-cfb0-4630-83c3-320f505565d6/vertex-color-paintmode.png)

要开始，请使用以下工作流程：

1.  使用 **选择（Select）** 工具点击已设置材质使用顶点颜色绘制的网格体。
2.  切换到 **绘制（Paint）** 工具，选择要应用于网格体的 **绘制颜色（Paint Color）** 。
3.  根据需要，使用 **颜色视图模式（Color View Mode）**下拉菜单选择检查绘制的颜色。

通过对材质进行更改，你可以绘制一种可以为基础材质着色的颜色。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [reference](https://dev.epicgames.com/community/search?query=reference)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [mesh paint tool](https://dev.epicgames.com/community/search?query=mesh%20paint%20tool)
-   [vertex color](https://dev.epicgames.com/community/search?query=vertex%20color)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [网格体及其材质](/documentation/zh-cn/unreal-engine/setting-up-a-vertex-color-material-for-mesh-painting-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E5%8F%8A%E5%85%B6%E6%9D%90%E8%B4%A8)
-   [顶点颜色材质设置](/documentation/zh-cn/unreal-engine/setting-up-a-vertex-color-material-for-mesh-painting-in-unreal-engine#%E9%A1%B6%E7%82%B9%E9%A2%9C%E8%89%B2%E6%9D%90%E8%B4%A8%E8%AE%BE%E7%BD%AE)
-   [使用顶点颜色材质在网格体上绘制](/documentation/zh-cn/unreal-engine/setting-up-a-vertex-color-material-for-mesh-painting-in-unreal-engine#%E4%BD%BF%E7%94%A8%E9%A1%B6%E7%82%B9%E9%A2%9C%E8%89%B2%E6%9D%90%E8%B4%A8%E5%9C%A8%E7%BD%91%E6%A0%BC%E4%BD%93%E4%B8%8A%E7%BB%98%E5%88%B6)
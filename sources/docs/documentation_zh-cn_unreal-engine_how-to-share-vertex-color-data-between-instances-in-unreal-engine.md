# 如何在虚幻引擎中的实例之间共享顶点颜色数据 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-share-vertex-color-data-between-instances-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:19:46.775Z

---

目录

在某些情况下（如某个平台支持其中一种网格体绘制模式但不支持另一种），在一个绘制的网格体实例上同时保留 **顶点颜色（Vertex Color）** 和 **纹理颜色（Texture Color）** 数据非常有用。例如，一些规格较低的平台可能不支持使用纹理颜色数据所需的虚拟纹理，在这种情况下，平台要运行项目就需要使用顶点颜色数据。

为了将你的内容部署到更多平台上，你就需要一种方法来在这些平台支持的网格体绘制模式间复制数据，而无需工作两次。

要在项目中同时拥有顶点和纹理颜色数据，你必须：

-   在顶点颜色和纹理颜色绘制模式间复制现有的颜色数据。
-   将纹理颜色数据自动绘制到顶点颜色数据。

下文将介绍这两种选项及其所需的额外配置。

## 在顶点颜色和纹理颜色间复制数据

要在顶点颜色和纹理颜色绘制模式间传输绘制的颜色数据，你可以使用"来自纹理（From Texture）"和"来自顶点（From Vertex）"工具。

在这些工具间复制数据的方法如下：

-   **将纹理颜色复制到顶点颜色**
    -   要将颜色数据从纹理颜色的网格体绘制纹理复制到任意所选网格体组件的顶点颜色，请在网格体绘制（Mesh Paint）面板中选择 **顶点颜色（Vertex Color）** 绘制模式，并使用 **来自纹理（From Texture）** 工具。
        
        ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/631ff824-d0e5-4bcf-b3de-559c713030ba/mp-sharing-fromtexture.png)
-   **将顶点颜色复制到纹理颜色**
    -   要将来自顶点颜色的颜色数据复制到任意所选网格体组件，请请在网格体绘制（Mesh Paint）面板中选择 **纹理颜色（Texture Color）** 绘制模式，并使用 **来自顶点（From Vertex）** 工具。如果该网格体上没有网格体绘制纹理，会在复制颜色数据时创建一个。
        
        ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef80286f-371b-4792-9b71-d8a2af76fe40/mp-sharing-fromvertex.png)

每种网格体绘制模式的 **绘制（Paint）** 工具设置都有一个 **颜色视图模式（Color View Mode）**。其位于 **可视化（Visualization）** 类别中，你可以用它选择不同的颜色通道来查看颜色数据。关于颜色视图模式及其可视化设置的更多详情，请参阅[网格体绘制模式工具与设置](/documentation/zh-cn/unreal-engine/mesh-paint-tool-reference-in-unreal-engine)一文中的"可视化设置"一节。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/625e2e0c-f55f-41fa-b001-7ee33a481524/mp-sharing-colorviewmode.png)

选择了RGB通道的顶点颜色模式。

你可以在顶点颜色和纹理颜色模式间切换，查看两种模式下当前的颜色数据。下方实例展示了在两者间复制数据的结果。请注意，纹理颜色模式版的顶点颜色数据稍有不同，因为它使用的是纹理插值而不是顶点插值。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af857c52-9295-4a72-8591-c8211aa0b95b/mp-sharing-copiedtexturecolordata.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/64aaf81e-4bd5-4b91-9d4d-72bf5863e7d0/mp-sharing-copiedvertexcolordata.png)

复制纹理颜色数据后的顶点颜色模式

复制顶点颜色数据后的纹理颜色模式

对于所有启用了Nanite的网格体，逐实例的顶点颜色无法被可视化，即使其确实存在。要查看该颜色数据，你必须在编辑器中暂时禁用Nanite。你可以用以下任一方法禁用它：

-   使用控制台命令 `r.Nanite 0`。
-   在网格体组件上勾选 **禁用Nanite（Disallow Nanite）** 复选框，强制组件在网格体启用Nanite时使用回退网格体。

## 同时绘制到顶点颜色和纹理颜色

纹理颜色模式提供一个选项，可以在绘制工具设置启用了 **传播至顶点颜色（Propagate to Vertex Color）** 时，将所有绘制结果传输至顶点颜色模式。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/784e506c-de85-4950-b3fd-e4567cbe0cf9/mp-sharing-propagatesetting.png)

## 将纹理颜色从烘焙的构建中剥离

对于部署到多个平台的项目，你可以禁用一些不需要或是平台部支持的功能。从烘焙的构建中移除网格体绘制纹理等内容可以节省文件包的占用空间。例如，如果平台不支持[Nanite网格体](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)，你可以在各个设备的配置文件中，使用控制台变量逐平台禁用属于虚拟纹理的网格体绘制纹理。

要为一个平台禁用网格体绘制纹理，请将以下控制台变量添加到平台引擎配置（\*.ini）的)"Console Variables"分段：

r.MeshPaintVirtualTexture.Support False

## 为顶点颜色和纹理颜色设置材质

如果你的项目同时使用顶点颜色和纹理颜色绘制网格体，可以设置网格体的材质，在材质图表中通过一些逻辑在这两种颜色数据集中进行选择。

下面是一个简化的示例，展示了 **MeshPaintTextureReplace** 节点如何使用Default路径处理顶点颜色（顶层）路径，使用MeshPaintTexture路径处理纹理颜色（底层）。该示例可以适应你的目标平台的各种要求：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33e046a2-ef39-4411-a946-313dcdb277d6/mp-sharing-meshpainttexturereplacenode.png)

关于为网格体绘制设置材质的更多详情，请参阅以下文档：

-   [为网格体绘制设置顶点颜色材质](/documentation/zh-cn/unreal-engine/setting-up-a-vertex-color-material-for-mesh-painting-in-unreal-engine)
-   [为纹理颜色绘制设置材质和网格体](/documentation/zh-cn/unreal-engine/setting-up-a-material-and-mesh-for-texture-color-painting-in-unreal-engine)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [reference](https://dev.epicgames.com/community/search?query=reference)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)
-   [mesh paint tool](https://dev.epicgames.com/community/search?query=mesh%20paint%20tool)
-   [vertex color](https://dev.epicgames.com/community/search?query=vertex%20color)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [在顶点颜色和纹理颜色间复制数据](/documentation/zh-cn/unreal-engine/how-to-share-vertex-color-data-between-instances-in-unreal-engine#%E5%9C%A8%E9%A1%B6%E7%82%B9%E9%A2%9C%E8%89%B2%E5%92%8C%E7%BA%B9%E7%90%86%E9%A2%9C%E8%89%B2%E9%97%B4%E5%A4%8D%E5%88%B6%E6%95%B0%E6%8D%AE)
-   [同时绘制到顶点颜色和纹理颜色](/documentation/zh-cn/unreal-engine/how-to-share-vertex-color-data-between-instances-in-unreal-engine#%E5%90%8C%E6%97%B6%E7%BB%98%E5%88%B6%E5%88%B0%E9%A1%B6%E7%82%B9%E9%A2%9C%E8%89%B2%E5%92%8C%E7%BA%B9%E7%90%86%E9%A2%9C%E8%89%B2)
-   [将纹理颜色从烘焙的构建中剥离](/documentation/zh-cn/unreal-engine/how-to-share-vertex-color-data-between-instances-in-unreal-engine#%E5%B0%86%E7%BA%B9%E7%90%86%E9%A2%9C%E8%89%B2%E4%BB%8E%E7%83%98%E7%84%99%E7%9A%84%E6%9E%84%E5%BB%BA%E4%B8%AD%E5%89%A5%E7%A6%BB)
-   [为顶点颜色和纹理颜色设置材质](/documentation/zh-cn/unreal-engine/how-to-share-vertex-color-data-between-instances-in-unreal-engine#%E4%B8%BA%E9%A1%B6%E7%82%B9%E9%A2%9C%E8%89%B2%E5%92%8C%E7%BA%B9%E7%90%86%E9%A2%9C%E8%89%B2%E8%AE%BE%E7%BD%AE%E6%9D%90%E8%B4%A8)
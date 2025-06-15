# 在虚幻引擎中使用彩色半透明阴影 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-colored-translucent-shadows-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:28:49.867Z

---

目录

![使用彩色半透明阴影](https://dev.epicgames.com/community/api/documentation/image/3ec42050-f3f6-43da-bf73-f9425cf9df50?resizing_type=fill&width=1920&height=335)

本教程将介绍如何配置虚幻引擎来投射彩色半透明阴影。 此功能在许多应用中都很有用，常见例子就是透过彩色玻璃窗的彩色光。

![彩色玻璃示例图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a46c5dc-6eaf-483f-bff2-0e15fafcc540/translucent_t.jpg)

虚幻引擎中的半透明阴影颜色。

## 半透明阴影颜色

阴影在穿过半透明表面时所呈现的颜色即为半透明阴影颜色。 这个过程也称为 **透射**透过材质的彩色光量由其 **不透明度（Opacity）** 值（介于0和1之间）以及投射到材质上的光强度决定。

-   例如，如果不透明度值设置为 **0** ，则材质完全透明，不会透射颜色或投射阴影。
-   如果不透明度设置为 **1** ，则材质完全不透明并且完全不透光。
-   当不透明度值 **介于0和1** 之间时，透过该对象的光将染上材质的 **基础颜色** ，并且阴影会继承一些颜色。

### 与各种光照系统的兼容性

并非所有虚幻引擎的光照和[全局光照](/documentation/zh-cn/unreal-engine/global-illumination-in-unreal-engine)系统都支持半透明阴影颜色。 下方图表详细说明了哪些光照功能支持半透明彩色阴影。

光照系统

半透明彩色阴影

CPU Lightmass

是，仅限静态光源

GPU Lightmass

是，仅限静态光源

Lumen全局光照

否

硬件光线追踪

否

路径追踪器

是，需要薄的半透明着色模型

此列表中值得注意的一点是 **Lumen全局光照** ，它目前不支持半透明阴影颜色。

因为[Lumen全局光照](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)在所有新的UE5项目中默认启用，这意味着如果你要在关卡中使用彩色半透明阴影，你需要在 **项目设置（Project Settings）** 或 **PostProcessVolume** 中手动禁用Lumen。

以下小节介绍了如何设置场景和材质才能投射半透明彩色阴影。

## 在UE5中禁用Lumen

按照以下步骤在当前关卡中禁用Lumen全局光照。

1.  在工具栏中点击 **创建** 图标，并选择 **体积（Volumes）** > **PostProcessVolume** 。
    
    ![创建PostProcessVolume](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75547e82-44e5-4fa1-b2f7-bc11a1682273/add-post-process-volume.png)
2.  在关卡中选择PostProcessVolume，并在细节面板（Details Panel）中，搜索 **"extent"** 。启用 **无限范围（未限制）（Infinite Extent (Unbound)）** 设置，这样PostProcessVolume的影响范围为整个关卡。
    
    ![启用无限范围](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f5d8fed-6fa9-4bda-bd45-bbbe15cf482c/infinite-extent-unbound.png)
3.  在细节面板（Details Panel）中搜索 **Global Illumination** 。 启用 **方法（Method）** 设置，并使用下拉菜单将全局光照方法从 **Lumen** 更改为 **无（None）** 。
    
    ![全局光照方法](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c04be7f-fff6-4649-abf3-6311cb20db71/global-illumination-method.png)
    
    此设置可禁用当前关卡中的动态全局光照，但你仍然可以使用Lightmass从静态光源烘焙全局光照。
    

## 光照设置

对于光照，最要紧的是，你只能从 **移动性（Mobility）** 设置为了 **静态（Static）** 的光源Actor投射彩色半透明阴影。你可以使用以下光源类型。

-   定向光源
-   点光源
-   聚光光源
-   矩形光源

此页面上的所有示例都使用虚幻引擎 **昼夜变换（Time of Day）** 关卡模板中的定向光源。 在大纲视图（Outliner）中选择 **定向光源（Directional Light）** ，然后在细节面板（Details Panel）中将 **移动性（Mobility）** 更改为 **静态（Static）** 。

![静态光源移动性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6600a59a-c51b-4c37-ace7-c6299edc7f6c/light-mobility-static.png)

间接光照可以冲淡彩色阴影，使它们看起来没有材质的基础颜色饱和。如果你无法在关卡中看到彩色半透明阴影，请考虑降低光源的 **间接照明强度（Indirect Lighting Intensity）** ，或尝试使用较暗的环境。

## 材质设置

### 材质属性

你可以使用下面列出的混合模式和着色模型来投射彩色半透明阴影。

-   **混合模式：** 半透明、累加、AlphaComposite或调制
-   **着色模型：** 默认光照、无光照或薄半透明

若使用 **调制（Modulate）** 混合模式，需要在细节面板（Details Panel）属性中禁用 **移动单独半透明度（Mobile Separate Translucency）** 。

#### 双面

启用 **双面（Two Sided）** 属性是可选项，但如果你希望玩家使用材质查看网格体的两面，则必须启用该属性。 如果禁用了 **双面（Two Sided）**，则必须将光源投射到材质的可见面才能投射彩色阴影。

### 创建光照半透明材质

1.  创建新的 **材质** 资产，并在[材质编辑器](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-user-guide)中打开它。点击材质图表（Material Graph）中的任意位置以便在细节面板（Details Panel）中显示[材质属性](/documentation/zh-cn/unreal-engine/unreal-engine-material-properties)。
2.  在细节面板（Details Panel）中，将 **混合模式（Blend Mode）** 更改为 **半透明（Translucent）** 。
    
    ![将混合模式更改为半透明](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50e96c05-9d0e-405b-84e5-7bbc04c55829/translucent-blend-mode.png)
3.  启用 **双面（Two Sided）** 材质属性（可选）。
    
    ![启用双面选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c28e142-543a-43a1-bc99-0ff3228f5535/enable-two-sided.png)
4.  向下滚动并展开 **半透明（Translucency）** 分段。 将 **光照模式（Lighting Model）** 设为 **表面半透明体积（Surface Translucency Volume）** 。
    
    ![半透明光照模式下拉菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21778dcf-1f26-4a20-af98-954640245a46/translucency-lighting-mode.png)
5.  将 **纹理样本（Texture Sample）** 添加到材质图表（Material Graph）。此示例使用彩色几何图案模拟彩色玻璃窗，但任何彩色纹理都可行。 与饱和度低的图像相比，颜色饱和度高的图像生成的阴影更鲜艳。将纹理样本（Texture Sample）的 **RGB** 输出连接到[主材质节点](/documentation/zh-cn/unreal-engine/using-the-main-material-node-in-unreal-engine)上的 **基础颜色（Base Color）** 输入。
    
    ![彩色玻璃纹理样本](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad3be543-69b5-4449-ad53-616d81d26ffe/stained-glass-texture.png)
6.  创建 **标量参数（Scalar Parameter）** ，并将其重命名为 **不透明度（Opacity）** 。选择标量参数（Scalar Parameter）并在细节面板（Details Panel）中将 **默认值（Default Value）** 设置为0到1之间的值。你还可以将 **滑块最大值（Slider Max）** 设置为 **1** ，限制不透明度的值范围。
    
    ![标量参数值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ecfc71ad-c6cf-4846-9042-b8b2d6549355/scalar-values.png)
7.  将标量参数连接到 **不透明度（Opacity）** 输入。 你的材质图表看起来应该类似于下图。
    
    ![默认光照材质图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba87b322-57ff-4a3c-9285-3ea6b8aed38b/default-lit-graph.png)
8.  点击工具栏中的 **应用（Apply）** 和 **保存（Save）** 可编辑材质并保存资产。
    
    ![编译并保存材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c805f3e4-d0ca-4cb3-81b7-3d1732dfefd8/save-and-apply.png)

## 构建光照

关闭材质编辑器并将材质应用到关卡中的静态网格体。此示例使用来自虚幻引擎初学者内容包的简单平面。定向光源的角度大致垂直于平面，因此阴影将直接落到下面的地面。

在工具栏中，前往 **构建（Build）** > **仅限构建光照（Build Lighting Only）** 。 当Lightmass构建完成时，应该会出现彩色半透明阴影。

![为关卡构建Lightmass](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ac9c380-34aa-4c3f-9045-a49ca588b710/build-lighting-only.png)

### 阴影锐度

有几个因素会影响阴影的锐度，包括接收透射阴影颜色的网格体的光照贴图分辨率、光源的源角度以及纹理样本的质量。如果你的结果像下图一样模糊且不聚焦，则很可能是接收网格体上的光照贴图分辨率太低。

![模糊的Lighmass效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f8e2cda-f3fd-451c-aada-720616ffe95b/insufficient-lightmass-resolution.png)

选择阴影落在其上的静态网格体，在本例中为地板（Floor）资产。 在细节面板（Details Panel）中，向下滚动到 **光照（Lighting）** 分段。启用 **已覆盖光照贴图分辨率（Overriden Light Map Res）** 设置，输入新的光照贴图分辨率。

![覆盖Lightmass分辨率](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02250230-657c-45f6-8066-1fda62dd4fee/overridden-lightmass-res.png)

根据静态网格体的大小，可能需要相对较大的分辨率你才能看到清晰的阴影。 下面的滑块显示了当光照贴图分辨率逐渐增加时的情况。

   ![光照贴图分辨率从256增至1024、2048，最后增至3072。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9913c6e0-a7f7-4183-ab5e-3c70df209ce5/lm-256.png) ![光照贴图分辨率从256增至1024、2048，最后增至3072。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2efcdff4-de51-4cd8-86cc-e0fa5d96a219/lm-1024.png) ![光照贴图分辨率从256增至1024、2048，最后增至3072。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bce29254-20f4-4ba5-8627-425b672b52c5/lm-2048.png) ![光照贴图分辨率从256增至1024、2048，最后增至3072。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0c46409-2e8f-4e44-94b1-d4be662970d0/lm-3072.png)

**光照贴图分辨率从256增至1024、2048，最后增至3072。**

在此情况中，从 **256** 到 **2048** 是大幅提升，但是当分辨率提升到3072时收益递减。 较大的光照贴图会产生性能开销，因此请注意不要使用超出需求的分辨率。

## 材质变体

### 不透明度和阴影饱和度

材质的不透明度值会影响阴影的饱和度和强度。 在下面的对比中，这三个滑块显示了当 **不透明度（Opacity）** 值从0.2增加到0.9时的情况。 在这样的户外环境中，使用较高的不透明度值，更容易看到彩色阴影。然而，在昏暗室内，不透明度值较低可能会产生更好的效果。

  ![材质不透明度为0.2、0.5和0.9。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b650d2cf-c3eb-444d-931c-8593317c5174/opacity-02.png) ![材质不透明度为0.2、0.5和0.9。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f387a4a-fd7e-41a2-96a3-46413ff36bcb/opacity-05.png) ![材质不透明度为0.2、0.5和0.9。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2436cd93-51f7-4ec3-93e2-4e2d9d1711a9/opacity-09.png)

**材质不透明度为0.2、0.5和0.9。**

### 遮罩不透明度

投射彩色半透明阴影时，不透明遮罩将正常运转。 你可以使用纹理的Alpha通道，或将黑白纹理插入 **不透明度（Opacity）** 输入，以便控制材质的哪些部分可见并投射阴影。 如果你不熟悉该过程，请在此处阅读有关[纹理遮罩](/documentation/zh-cn/unreal-engine/using-texture-masks-in-unreal-engine)的更多信息。

下面的示例展示了投射彩色半透明阴影的遮罩材质。没有更改材质属性，但修改了材质图表，如下所示。

![带有不透明遮罩的彩色阴影](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80d92736-984d-4353-8831-e0dd8e8dc6c7/masked-graph.png)

并非将 **不透明度（Opacity）** 标量参数直接插入主材质节点，而是增加黑白纹理样本。 遮罩的黑色区域是透明的，而白色圆形区域是可见的。

这是光照重建后的效果。

![来自遮罩材质的彩色半透明阴影](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e72b3c7-8ba5-47d6-a55c-aca37238e8ca/masked-result.png)

## 使用路径追踪器的彩色阴影

路径追踪器（Path Tracer）是测试功能，需要在项目设置中启用多项设置。 [在此页面上](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine)阅读有关启用路径追踪器的信息。

路径追踪器（Path Tracer）支持动态彩色阴影，但仅当材质使用 **薄半透明（Thin Translucent）** 着色模型时支持。 按照以下步骤修改上述材质，这样材质可以使用路径追踪器投射彩色半透明阴影。

1.  点击材质图表背景的任意位置，在细节面板（Details Panel）中显示材质属性。
2.  将 **着色模型（Shading Model）** 更改为薄半透明。
    
    ![薄半透明着色模型](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55410254-08ef-4fb1-a97d-09fb6820008d/thin-translucent-sm.png)
3.  向下滚动到 **半透明（Translucency）** 分段，并将 **光照模式（Lighting Mode）** 更改为 **表面前向着色（Surface Forward Shading）** 。
    
    ![表面前向着色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6b4d4ea-ad05-4b85-bcde-8d73530ee030/surface-forward-shading.png)
4.  在右键菜单或材质控制板（Material Palette）中搜索"thin translucent"，然后将 **ThinTranslucentMaterialOutput** 节点添加到你的图表中。
    
    ![Thin Translucent Material节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f1956f4-cc1b-4ebf-9734-df3af408cdc9/thin-translucent-node.png)
5.  将第二个连接从纹理样本（Texture Sample）的 **RGB** 输出拖到Thin Translucent Material节点上的 **透射颜色（Transmittance Color）** 输入。 图表的其余部分与前面的示例没有变化，应该如下图所示。
    
    ![薄半透明材质图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/927f0fdb-9770-47c4-9621-53ba5eb1eed9/thin-translucent-material-graph.png)
6.  编译材质，并将其应用到你关卡中的网格体。

下面的视频显示了启用路径追踪器时薄半透明彩色玻璃材质的效果。 彩色阴影在路径追踪模式下是完全动态的，如果平面或光源旋转，它会立即更新。 该视频还演示了更改材质的不透明度和定向光源的源角度时的情况。

-   [materials](https://dev.epicgames.com/community/search?query=materials)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [半透明阴影颜色](/documentation/zh-cn/unreal-engine/using-colored-translucent-shadows-in-unreal-engine#%E5%8D%8A%E9%80%8F%E6%98%8E%E9%98%B4%E5%BD%B1%E9%A2%9C%E8%89%B2)
-   [与各种光照系统的兼容性](/documentation/zh-cn/unreal-engine/using-colored-translucent-shadows-in-unreal-engine#%E4%B8%8E%E5%90%84%E7%A7%8D%E5%85%89%E7%85%A7%E7%B3%BB%E7%BB%9F%E7%9A%84%E5%85%BC%E5%AE%B9%E6%80%A7)
-   [在UE5中禁用Lumen](/documentation/zh-cn/unreal-engine/using-colored-translucent-shadows-in-unreal-engine#%E5%9C%A8ue5%E4%B8%AD%E7%A6%81%E7%94%A8lumen)
-   [光照设置](/documentation/zh-cn/unreal-engine/using-colored-translucent-shadows-in-unreal-engine#%E5%85%89%E7%85%A7%E8%AE%BE%E7%BD%AE)
-   [材质设置](/documentation/zh-cn/unreal-engine/using-colored-translucent-shadows-in-unreal-engine#%E6%9D%90%E8%B4%A8%E8%AE%BE%E7%BD%AE)
-   [材质属性](/documentation/zh-cn/unreal-engine/using-colored-translucent-shadows-in-unreal-engine#%E6%9D%90%E8%B4%A8%E5%B1%9E%E6%80%A7)
-   [双面](/documentation/zh-cn/unreal-engine/using-colored-translucent-shadows-in-unreal-engine#%E5%8F%8C%E9%9D%A2)
-   [创建光照半透明材质](/documentation/zh-cn/unreal-engine/using-colored-translucent-shadows-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%85%89%E7%85%A7%E5%8D%8A%E9%80%8F%E6%98%8E%E6%9D%90%E8%B4%A8)
-   [构建光照](/documentation/zh-cn/unreal-engine/using-colored-translucent-shadows-in-unreal-engine#%E6%9E%84%E5%BB%BA%E5%85%89%E7%85%A7)
-   [阴影锐度](/documentation/zh-cn/unreal-engine/using-colored-translucent-shadows-in-unreal-engine#%E9%98%B4%E5%BD%B1%E9%94%90%E5%BA%A6)
-   [材质变体](/documentation/zh-cn/unreal-engine/using-colored-translucent-shadows-in-unreal-engine#%E6%9D%90%E8%B4%A8%E5%8F%98%E4%BD%93)
-   [不透明度和阴影饱和度](/documentation/zh-cn/unreal-engine/using-colored-translucent-shadows-in-unreal-engine#%E4%B8%8D%E9%80%8F%E6%98%8E%E5%BA%A6%E5%92%8C%E9%98%B4%E5%BD%B1%E9%A5%B1%E5%92%8C%E5%BA%A6)
-   [遮罩不透明度](/documentation/zh-cn/unreal-engine/using-colored-translucent-shadows-in-unreal-engine#%E9%81%AE%E7%BD%A9%E4%B8%8D%E9%80%8F%E6%98%8E%E5%BA%A6)
-   [使用路径追踪器的彩色阴影](/documentation/zh-cn/unreal-engine/using-colored-translucent-shadows-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%99%A8%E7%9A%84%E5%BD%A9%E8%89%B2%E9%98%B4%E5%BD%B1)

相关文档

[

Lightmass基础知识

![Lightmass基础知识](https://dev.epicgames.com/community/api/documentation/image/04748220-2148-4308-9ee4-ff69b22b87d2?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/lightmass-basics-in-unreal-engine)

[

不透明度材质函数

![不透明度材质函数](https://dev.epicgames.com/community/api/documentation/image/d5b75410-8c1d-4733-bdef-ae1c4bfc30de?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/opacity-material-functions-in-unreal-engine)

[

光照半透明

![光照半透明](https://dev.epicgames.com/community/api/documentation/image/573d88cf-d9d1-4fb5-8cf1-8148ef029950?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/lit-translucency-in-unreal-engine)
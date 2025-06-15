# 虚幻引擎材质 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-materials
> 
> 生成时间: 2025-06-14T19:25:37.681Z

---

目录

![材质](https://dev.epicgames.com/community/api/documentation/image/4cceb28b-5c71-4089-a263-db2f8ede4d01?resizing_type=fill&width=1920&height=335)

虚幻引擎中的 **材质（Materials）** 定义了场景中对象的表面属性。 从广义上来讲，你可以将材质视为涂在网格体上用来控制其视觉外观的"涂料"。

从更偏技术性的角度来讲，材质确切告知渲染引擎一个表面应该如何与场景中的光线交互。 材质定义了表面的每个方面，包括颜色、反射性、崎岖度、透明度，等等。 执行这些计算时使用了从各种图像（纹理）和基于节点的 **材质表达式（Material expressions）** 以及从材质本身固有的各种[属性设置](/documentation/zh-cn/unreal-engine/unreal-engine-material-properties)输入到材质的数据。

## 入门指南

材质创建是一个广泛的主题，基于节点的工作流程允许你创建几乎无限种类的表面类型。 建议初学者首先查看本分段中链接的页面。 "基本材质概念"和"基于物理的材质"页面介绍了构成虚幻引擎中材质创建的基础理论和思路。 《材质编辑器用户指南》是一组基于工具的文档，讲授了使用材质编辑器的实用方面。

[](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts)

[![材质基本概念](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fbac30c8-a779-4090-bf78-ba9029431fd8/essential-concepts-topic.png)](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts)

[材质基本概念](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts)

[关于虚幻引擎中材质的介绍文档。](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts)

[

![基于物理的材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d659c3a3-4fe9-461d-b484-ccab548f1612/pbr-topic-image.png)

基于物理的材质

基于物理的材质主要输入及其最佳使用方法的概述。





](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine)[

![材质编辑器指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14556df3-8b8e-4517-8ed0-d76a90f5fdfe/material-editor-ui-topic-image.png)

材质编辑器指南

了解如何用虚幻引擎基于节点的材质编辑器创建材质，以定义场景中的对象外观和表面属性。





](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-user-guide)[

![材质属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1dd04efc-be01-4b5d-b4c8-f876754895b1/material-properties-topic.png)

材质属性

关于虚幻引擎中材质属性的介绍文档。





](/documentation/zh-cn/unreal-engine/unreal-engine-material-properties)[

![材质输入](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e597ee6d-9089-48c5-948f-900cae75b677/material-inputs-topic.png)

材质输入

深入了解材质上可用的各种输入及其用途。





](/documentation/zh-cn/unreal-engine/material-inputs-in-unreal-engine)[

![材质数据类型](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7fe6da02-c869-4754-9215-313d36ae2842/data-types-topic.png)

材质数据类型

介绍材质编辑器中的四种浮点数据类型





](/documentation/zh-cn/unreal-engine/material-data-types-in-unreal-engine)

## Substrate材质框架

该系统属于试验性系统。

[](/documentation/zh-cn/unreal-engine/substrate-materials-in-unreal-engine)

[![Substrate材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d582b7df-09c3-4315-81d2-f0edc4860a1c/substrate-topic.png)](/documentation/zh-cn/unreal-engine/substrate-materials-in-unreal-engine)

[Substrate材质](/documentation/zh-cn/unreal-engine/substrate-materials-in-unreal-engine)

[有关Substrate材质框架的信息和参考内容。](/documentation/zh-cn/unreal-engine/substrate-materials-in-unreal-engine)

## 材质工作流程概念

在你理解材质创建背后的基本原则之后，强烈建议接下来查看本分段中的文档。 **材质实例（Material Instances）** 和 **材质函数（Material Functions）** 是材质创建中的基础主题，有助于你优化工作流程，以节省时间，避免重复做相同的事情。 材质实例允许你或你团队中的其他美术师快速、轻松地自定义材质，以从单个父材质生成多个变体（或实例）。材质函数允许你将材质图表的各个部分打包为单个节点，并将其共享到公共库以供在其他材质中复用。

[](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)

[![实例化材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/389a46ab-e487-4ed1-beeb-d1d8865de685/instanced-materials-topic.png)](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)

[实例化材质](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)

[一种层级化的材质关系，让你在不重新编译着色器的情况下，更改子材质的行为和外观。](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)

[

![材质函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76eb3d0a-6e28-46dc-8be8-c61547f8d6e4/material-functions-topic.png)

材质函数

材质函数相当于材质的





](/documentation/zh-cn/unreal-engine/material-functions-in-unreal-engine)[

![分层材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b908dab-e129-4032-94f5-6e7826fca804/layeredmaterialstopic.png)

分层材质

介绍两种材质分层方法，可用于创建复杂、独特的表面效果。





](/documentation/zh-cn/unreal-engine/layering-materials-in-unreal-engine)

## 教程索引

本分段中的页面是基于项目的分步文档，引导你逐步学习虚幻引擎中材质创建的某个特定方面。 例如：[制作UV坐标动画](/documentation/zh-cn/unreal-engine/animating-uv-coordinates-in-unreal-engine)或[使用纹理遮罩](/documentation/zh-cn/unreal-engine/using-texture-masks-in-unreal-engine)。

[](/documentation/zh-cn/unreal-engine/unreal-engine-materials-tutorials)

[![材质教程](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e91af2b-c340-48d8-85d5-3647b487fd13/materail_how_to.png)](/documentation/zh-cn/unreal-engine/unreal-engine-materials-tutorials)

[材质教程](/documentation/zh-cn/unreal-engine/unreal-engine-materials-tutorials)

[有关使用虚幻引擎材质编辑器各个方面的操作指南。](/documentation/zh-cn/unreal-engine/unreal-engine-materials-tutorials)

## 材质参考页面

[材质编辑器](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-user-guide)提供了几十个 **材质表达式（Material Expressions）** 和 **函数（Functions）** ，其中每一项都旨在执行材质图表中的某个特定任务。 如果你要查找关于如何及何时使用特定节点的信息，请首先查看下面链接的页面。 材质表达式和函数参考页面根据其在材质控制板中的类别进行组织，例如：混合、梯度、数学、坐标，等等。

[](/documentation/zh-cn/unreal-engine/unreal-engine-material-expressions-reference)

[![材质表达式参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9193bb7-2415-40f9-9ce6-998b0d1bed78/exp_ref_topic.png)](/documentation/zh-cn/unreal-engine/unreal-engine-material-expressions-reference)

[材质表达式参考](/documentation/zh-cn/unreal-engine/unreal-engine-material-expressions-reference)

[关于材质编辑器中所有可用材质表达式的参考页面。](/documentation/zh-cn/unreal-engine/unreal-engine-material-expressions-reference)

[

![材质函数参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a665179-3355-4c89-9772-2eee352e8088/material-functions-reference-topic.png)

材质函数参考

各种默认材质函数的参考页面，按类型排序 。





](/documentation/zh-cn/unreal-engine/unreal-engine-material-functions-reference)[

![材质编辑器UI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c4d4a6a-52c0-432a-bd48-7a029cd60652/material-editor-ui-topic.png)

材质编辑器UI

介绍材质编辑器用户界面的各个部分。





](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-ui)[

![材质实例编辑器用户界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45f14f92-be4d-4438-ab64-0051a45a21a7/instance-editor-topic-image.png)

材质实例编辑器用户界面

使用材质实例编辑器修改材质实例常量的指南。





](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui)

## 更多概念和工具

下方归纳了无法更精确归入其他类别的材质页面。其中许多页面是中高级主题，允许你超越材质创建的基础知识，并开始为你的项目开发更复杂的材质。

[](/documentation/zh-cn/unreal-engine/bent-normal-maps-in-unreal-engine)

[![环境法线贴图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa11428c-bb83-4cb0-9438-7fa6a9d33db7/bentnormaltopic.png)](/documentation/zh-cn/unreal-engine/bent-normal-maps-in-unreal-engine)

[环境法线贴图](/documentation/zh-cn/unreal-engine/bent-normal-maps-in-unreal-engine)

[在虚幻引擎中使用环境法线贴图的综述。](/documentation/zh-cn/unreal-engine/bent-normal-maps-in-unreal-engine)

[

![不基于切线空间的凹凸贴图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14925021-a0b5-4bdb-a086-e3bac2a635dd/bump_topic.png)

不基于切线空间的凹凸贴图

如何从无法使用经典切线空间的3D程序化着色器中实现凹凸贴图。





](/documentation/zh-cn/unreal-engine/bump-mapping-without-tangent-space-in-unreal-engine)[

![材质曲线图集](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02783537-e231-4c72-928f-60a8f56a558b/curve-atlases-topic.png)

材质曲线图集

曲线图集保存了一组曲线资产，允许你通过材质访问曲线线性颜色数据。





](/documentation/zh-cn/unreal-engine/curve-atlases-in-unreal-engine-materials)[

![自定义UV](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b43002b-7c1e-4cf4-8b48-cd9c5682f312/cuvs_topic.png)

自定义UV

一种在顶点着色器中运行计算的功能，相比逐像素运行计算，这有助于提升性能。





](/documentation/zh-cn/unreal-engine/customized-uvs-in-unreal-engine-materials)[

![材质分析器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad5c7daa-b765-402c-8e40-536f0452faaa/material-analyzer-topic.png)

材质分析器

本页介绍如何找到和使用材质分析器工具。





](/documentation/zh-cn/unreal-engine/unreal-engine-material-analyzer-tool)[

![使用像素法线偏移实现折射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e72ecbbe-24e1-486c-9854-909409c36e2e/pno_topic.png)

使用像素法线偏移实现折射

介绍材质中的像素法线偏移以及折射模式。





](/documentation/zh-cn/unreal-engine/refraction-using-pixel-normal-offset-in-unreal-engine)[

![在材质中按图元存储自定义数据](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d39cfa0a-f6e0-4390-9755-d1a97fe817eb/storing-custom-data-topic.png)

在材质中按图元存储自定义数据

介绍自定义图元数据工作流，以及如何按图元存储自定义数据，并通过蓝图访问此类自定义数据。





](/documentation/zh-cn/unreal-engine/storing-custom-data-in-unreal-engine-materials-per-primitive)[

![光照半透明](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/573d88cf-d9d1-4fb5-8cf1-8148ef029950/translucent_topic.png)

光照半透明

说明如何对半透明表面施以光照，并投射包括自身阴影在内的阴影。





](/documentation/zh-cn/unreal-engine/lit-translucency-in-unreal-engine)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [入门指南](/documentation/zh-cn/unreal-engine/unreal-engine-materials#%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)
-   [Substrate材质框架](/documentation/zh-cn/unreal-engine/unreal-engine-materials#substrate%E6%9D%90%E8%B4%A8%E6%A1%86%E6%9E%B6)
-   [材质工作流程概念](/documentation/zh-cn/unreal-engine/unreal-engine-materials#%E6%9D%90%E8%B4%A8%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B%E6%A6%82%E5%BF%B5)
-   [教程索引](/documentation/zh-cn/unreal-engine/unreal-engine-materials#%E6%95%99%E7%A8%8B%E7%B4%A2%E5%BC%95)
-   [材质参考页面](/documentation/zh-cn/unreal-engine/unreal-engine-materials#%E6%9D%90%E8%B4%A8%E5%8F%82%E8%80%83%E9%A1%B5%E9%9D%A2)
-   [更多概念和工具](/documentation/zh-cn/unreal-engine/unreal-engine-materials#%E6%9B%B4%E5%A4%9A%E6%A6%82%E5%BF%B5%E5%92%8C%E5%B7%A5%E5%85%B7)
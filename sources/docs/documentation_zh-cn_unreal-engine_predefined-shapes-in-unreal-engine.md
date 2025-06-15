# 虚幻引擎中的预设形状 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/predefined-shapes-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:08:02.933Z

---

目录

![预设形状](https://dev.epicgames.com/community/api/documentation/image/172d94f6-4cd1-44e2-bfe3-dbee40b9a2ba?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

你可以使用 **建模模式（Modeling Mode）** 中的 **创建（Create）** 类别创建新网格体。该类别提供了一系列精选的预定义图元，用作建模的基础。如需详细了解建模模式以及访问方法，请参阅[建模模式概述](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)。

## 使用预定义的形状

你可以在下表中列出的九个形状中进行选择。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/982e68b8-c6e8-4532-a81d-40716d9cdef8/box-shape.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a798f7a-1834-4223-9bdf-fe9d5e51eb58/sphere-shape.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b084617f-5097-4a0e-92bd-de93eef9e934/cylinder-shape.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7cb067c6-cc30-43c6-895c-09051b627f4c/cone-shape.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9efd505e-260d-45e8-aefe-4048fca199b9/torus-shape.png)

盒体

球体

圆柱体

椎体

环面

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f69df346-d2d9-40d3-8f46-2c80a3dc26a3/arrow-shape.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76eb0557-aac6-43d3-903f-3db3a6fc5142/rect-shape.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7519624-ddef-41af-be9f-c6eb883f0857/disc-shape.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/096f7e3b-ba5b-4601-8158-51c11a51cc7b/stairs-shape.png)

 

箭头

长方形

圆盘

楼梯

 

你可以选择所需形状，并将其拖入场景中放置。放置你的网格体后，你仍可以在[工具属性](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%BB%BA%E6%A8%A1%E6%A8%A1%E5%BC%8F)面板中调整工具设置。所需设置就绪后，点击 **接受（Accept）** 。

## 工具设置

你使用 **工具属性（Tool Properties）** 面板来控制输出类型、维度和材质等设置。

与其他建模模式工具一样，重新打开工具时会记住参数值。

### 输出类型

**输出类型（Output Type）** 用于设置你创建的网格体类型。你可以在以下类型之间选择：

-   **静态网格体（Static mesh）**
-   **动态网格体（Dynamic mesh）**
-   **体积（Volume）**

你可以使用各种工具在建模过程的任意阶段更新网格体类型，例如 **变换（Transform）** 类别中的 **转换（Convert）** 和 **传输（Transfer）** 。

如需详细了解这些输出类型和资产管理，请参阅[处理网格体](/documentation/zh-cn/unreal-engine/working-with-meshes-in-unreal-engine)文档。

### 形状

你可以在 **形状（Shape）** 设置下调整网格体的尺寸和细分。每个形状都有特定的选项。

此外，你还可以使用 **多边形组模式（PolyGroup Mode）** 设置来配置新网格体的多边形组。多边形组模式（Polygroup Mode）具有以下分组选项：

![按形状生成多边形组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91fbed75-e219-49a5-a9d5-936b10b6f06b/per-shape.png)

![按面生成多边形组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26db3557-9870-4732-afb3-bec9b6b0b102/per-face.png)

![按四边形生成多边形组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53545088-5dd5-4d63-bd38-35dbd1b64b06/per-quad.png)

**按形状（Per Shape）**

**按面（Per Face）**

**按四边形（Per Quad）**

将整个网格体作为单一组输出。

自动将网格体划分为可识别的面组。

自动为每个四边形将网格体划分为一组。

如需详细了解多边形组，请参阅[理解多边形组](/documentation/zh-cn/unreal-engine/understanding-polygroups-in-unreal-engine)文档。

### 定位

你可以基于场景或地平面将网格体定位到关卡中。

从 **目标表面（Target Surface）** 选择 **场景上（On Scene）** 会基于光标所在几何体的表面法线定位你的网格体。

如果你针对关卡中的对象将[碰撞预设](/documentation/zh-cn/unreal-engine/setting-up-collisions-with-static-meshes-in-unreal-engine#%E6%A8%A1%E6%8B%9F%E7%89%A9%E7%90%86%E5%92%8C%E7%A2%B0%E6%92%9E%E9%A2%84%E8%AE%BE)设置为 **无碰撞（No Collision）** ， **在场景上（On Scene）** 不会检测到该对象。

选择 **地平面（Ground Plane）** 会将网格体定位到关卡中并将Z轴设置为0。

你可以将枢轴点位置调整为底部、顶部或中心。放置光标可直观地看到枢轴点的位置，如下表中所高亮显示。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/551194cb-5714-4778-9636-599e44d1a23d/base-pivot.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3e0d722-7de7-469f-b69d-65e60af01e40/centered-pivot.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/480d050d-923b-47a2-aba5-d1f78320700a/top-pivot.png)

底部

居中

顶部

### 材质

你可以为网格体选择合适的 **材质（Material）** 。你还可以设置 **UV缩放（UV Scale）** 并启用 **显示线框（Show Wireframe）** 。

![将材质应用于网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac764fb5-05df-47ec-8159-96683469228b/material-setting.png)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [geometry](https://dev.epicgames.com/community/search?query=geometry)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [modeling mode](https://dev.epicgames.com/community/search?query=modeling%20mode)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用预定义的形状](/documentation/zh-cn/unreal-engine/predefined-shapes-in-unreal-engine#%E4%BD%BF%E7%94%A8%E9%A2%84%E5%AE%9A%E4%B9%89%E7%9A%84%E5%BD%A2%E7%8A%B6)
-   [工具设置](/documentation/zh-cn/unreal-engine/predefined-shapes-in-unreal-engine#%E5%B7%A5%E5%85%B7%E8%AE%BE%E7%BD%AE)
-   [输出类型](/documentation/zh-cn/unreal-engine/predefined-shapes-in-unreal-engine#%E8%BE%93%E5%87%BA%E7%B1%BB%E5%9E%8B)
-   [形状](/documentation/zh-cn/unreal-engine/predefined-shapes-in-unreal-engine#%E5%BD%A2%E7%8A%B6)
-   [定位](/documentation/zh-cn/unreal-engine/predefined-shapes-in-unreal-engine#%E5%AE%9A%E4%BD%8D)
-   [材质](/documentation/zh-cn/unreal-engine/predefined-shapes-in-unreal-engine#%E6%9D%90%E8%B4%A8)

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
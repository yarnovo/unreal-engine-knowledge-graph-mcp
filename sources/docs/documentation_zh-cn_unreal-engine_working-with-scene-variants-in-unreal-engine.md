# 使用场景变体 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/working-with-scene-variants-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:10:28.444Z

---

目录

![使用场景变体](https://dev.epicgames.com/community/api/documentation/image/bdff13ec-75e6-4f55-b408-dedb11ba43e0?resizing_type=fill&width=1920&height=335)

围绕设计数据创建实时3D体验时，需要时常切换场景中对象的状态。即将3D空间中对象的位置和旋转调换至他处，显示和隐藏特定对象，更改材质，开关光源等操作。

此类需求在机械和工业设计应用中极为常见，可使用部分行业标准建模和场景设计工具设置多个 *变体* 以表示场景的不同版本。此类情况有时也称为 *150% BOM*（材质清单），即场景包含100%以上的可见选项。

典型例子一类配置器：在昂贵载具（如轿车、摩托车或飞机）实际装配或制造前，客户可利用该配置器在不同潜在选项间提前选择。下方视频中的简单范例为汽车配置器，内含轮毂、制动钳和车身漆色等多种选项。

Unreal Studio内含名为 **变量编辑器** 的辅助程序，可协助你在可视化项目中处理此类场景。利用变量编辑器，可在编辑器中或运行时更为轻松地设置多个场景变体并在此类变体间切换。如之前的范例应用程序中所示，使用各可用选项设置变量编辑器。简单屏幕UMG UI将调用由变量编辑器公开的蓝图函数，以按需激活此类选项。

本章节主题将对变量编辑器及利用其产生类似效果的方法进行讲解。

## 入门

[

![变体管理器模板概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f754419-b5af-4c9c-9437-4037401ea443/topic-image.png)

变体管理器模板概述

变体管理器的定义及其工作原理。





](/documentation/zh-cn/unreal-engine/variant-manager-template-overview)

## 教程

[

![变体激活时调用函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/521c6976-8851-4b8d-b87a-5cc8ee8d4634/topic-image.png)

变体激活时调用函数

激活变体时调用函数，而非更改属性值。





](/documentation/zh-cn/unreal-engine/calling-functions-on-variant-activation)[

![编写变体管理器设置脚本](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb0ac28a-5535-4a9f-9bb9-1b1dfef5adeb/placeholder_topic.png)

编写变体管理器设置脚本

使用编辑器脚本，并利用所有场景变体设置变体管理器。





](/documentation/zh-cn/unreal-engine/scripting-the-variant-manager-setup)[

![产品配置器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39ace1ef-3ff1-4260-9e2b-2de93de25ada/topic-image.png)

产品配置器

如何自定义和使用产品配置器模板





](/documentation/zh-cn/unreal-engine/product-configurator-template-in-unreal-engine)

## 制作人员

本页所用车辆模型由[Allegorithmic](https://www.substance3d.com/)友情提供。

-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [enterprise](https://dev.epicgames.com/community/search?query=enterprise)
-   [manufacturing](https://dev.epicgames.com/community/search?query=manufacturing)
-   [variants](https://dev.epicgames.com/community/search?query=variants)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [入门](/documentation/zh-cn/unreal-engine/working-with-scene-variants-in-unreal-engine#%E5%85%A5%E9%97%A8)
-   [教程](/documentation/zh-cn/unreal-engine/working-with-scene-variants-in-unreal-engine#%E6%95%99%E7%A8%8B)
-   [制作人员](/documentation/zh-cn/unreal-engine/working-with-scene-variants-in-unreal-engine#%E5%88%B6%E4%BD%9C%E4%BA%BA%E5%91%98)
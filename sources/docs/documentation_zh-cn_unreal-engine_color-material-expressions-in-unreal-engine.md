# 虚幻引擎颜色材质表达式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/color-material-expressions-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:27:51.010Z

---

目录

![颜色材质表达式](https://dev.epicgames.com/community/api/documentation/image/b350d418-18cf-44ea-94d0-b81d13e1da2f?resizing_type=fill&width=1920&height=335)

## 去饱和度

**去饱和度（Desaturation）** 表达式对其输入进行去饱和，即根据特定百分比将其输入的颜色转换为灰色阴影。

项目

说明

属性

 

**亮度系数（Luminance Factors）**

指定每个通道对去饱和颜色的影响量。此属性用于控制，在去饱和之后，绿色比红色亮，而红色比蓝色亮。

输入

 

**小数（Fraction）**

指定要应用于输入的去饱和量。此百分比的范围为0.0（完全原始颜色，不去饱和）到1.0（完全去饱和）。

![Desaturation Material Expression](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6287fc1c-3cc9-4f78-97be-fff35a36535f/desaturation-expression.png)

**程序员需知：**定义去饱和颜色 `D`、输入颜色 `I` 和亮度系数 `L`。输出将为 `O = (1 - 百分比)*( D.dot( I )) + 百分比 * I`

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [去饱和度](/documentation/zh-cn/unreal-engine/color-material-expressions-in-unreal-engine#%E5%8E%BB%E9%A5%B1%E5%92%8C%E5%BA%A6)
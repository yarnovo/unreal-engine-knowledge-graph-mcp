# 虚幻引擎渐变材质函数 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/gradient-material-functions-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:26:50.240Z

---

目录

![渐变材质函数](https://dev.epicgames.com/community/api/documentation/image/9e5fb0f2-3164-418d-a460-bc0956924885?resizing_type=fill&width=1920&height=335)

渐变函数以程序方式生成根据纹理坐标表达式产生的渐变。与创建基于纹理的渐变相比，这些函数可节省内存。

## 渐变函数

以下是渐变函数的列表。

### 指数径向渐变

**RadialGradientExponential（指数径向渐变）**函数使用 UV 通道 0 来产生径向渐变，同时允许用户调整半径和中心点偏移。

项目

说明

输入

 

**UV（矢量 2）（UVs (Vector 2)）**

用于控制渐变所在的位置及其涵盖 0-1 空间的程度。

**中心点（矢量 2）（CenterPosition (Vector2)）**

基于 0-1 的渐变中心位置偏移。

**半径（标量）（Radius (Scalar)）**

源自中心的径向渐变的大小。默认值 0.5 使渐变边缘位于纹理空间边缘附近。

**密度（标量）（Density (Scalar)）**

调整此函数所产生的渐变的硬度。这个数值越大，意味着渐变越清晰。

**反转密度（布尔值）（Invert Density (Boolean)）**

对于渐变，将白色反转为黑色，并将黑色反转为白色。

![径向渐变](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ac06165-7644-402d-b42e-f927db05f7dd/radialgradient.png)

![默认径向渐变](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ecba508-dc6e-493a-a83a-7ee9aaf54f3b/radialgradient_default.png)

 

默认输出结果

 

### 菱形渐变

**DiamondGradient（菱形渐变）**函数使用 UV 通道 0 来产生径向渐变，同时允许用户调整渐变衰减率。

项目

说明

输入

 

**衰减（标量）（Falloff (Scalar)）**

通过控制渐变从白色变为黑色的速度，提高渐变对比度。

![菱形渐变](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef897c78-0b41-4d1c-9e87-1419046a42ba/diamondgradient.png)

![默认菱形渐变](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4323ba48-b6b4-4a98-981f-e3a44e119bb2/diamondgradient_default.png)

 

默认输出结果

 

### 线性渐变

**LinearGradient（线性渐变）**函数使用 UV 通道 0 在 U 或 V 方向上产生线性渐变，其中，方向取决于所使用的输出。

项目

说明

输出

 

**U 渐变（UGradient）**

在 U 方向上输出线性渐变。

**V 渐变（VGradient）**

在 V 方向上输出线性渐变。

![线性渐变](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54dd25a3-4568-4f89-9dc2-264e18b0d00f/lineargradient.png)

![默认线性渐变](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d8b7b21-da90-4199-964f-8492e130695e/lineargradient_defaultu.png)

默认 U 输出结果

![默认线性渐变](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59dddad8-ae47-4125-858a-c2cc5027fca5/lineargradient_defaultv.png)

默认 V 输出结果

### 平滑曲线

**SmoothCurve（平滑曲线）**函数接收现有的纹理通道或渐变，并使用程序式曲线来控制从暗到亮的过渡。用户可调整此曲线的切线以更改结果。

项目

说明

输入

 

**切换 1（标量）（Tangent 1 (Scalar)）**

控制曲线的第二条切线的角度。

**X（标量）（X (Scalar)）**

传入的纹理通道或渐变。

**切线 0（标量）（Tangent 0 (Scalar)）**

控制曲线的第一条切线的角度。

![平滑曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6df6ca82-0954-4134-ad36-ada2713ea679/smoothcurve.png)

![默认平滑曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4748bef-4120-4f9c-94a0-209bcf8c4845/smoothcurve_default.png)

 

默认输出结果

 

### 值阶

**ValueStep（值阶）**函数接收现有的纹理通道或渐变，并根据用户的输入来输出纯黑白色图像。结果是一个蒙版，它代表与输入值相等的渐变部分。

项目

说明

输入

 

**蒙版偏移值（标量）（Mask Offset Value (Scalar)）**

黑色点在结果中的位置偏移。

**白色结果之前的数目（标量）（Number Before White Result (Scalar)）**

控制输出到黑色的值数目上限。例如，如果您有从 0 到 10 的渐变，并将此值设置为 9，那么介于 0 与 9 之间的所有值均为黑色。10 将是白色。

**渐变（标量）（Gradient (Scalar)）**

接收值大于 1 的渐变。

![值阶](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e722751a-cd53-4ca1-ad25-e0e01da16a43/valuestep.png)

![默认值阶](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d9b53b1-5df6-461f-ad16-92155a8b1ed3/valuestep_default.png)

 

默认输出结果 

-   [materials](https://dev.epicgames.com/community/search?query=materials)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [渐变函数](/documentation/zh-cn/unreal-engine/gradient-material-functions-in-unreal-engine#%E6%B8%90%E5%8F%98%E5%87%BD%E6%95%B0)
-   [指数径向渐变](/documentation/zh-cn/unreal-engine/gradient-material-functions-in-unreal-engine#%E6%8C%87%E6%95%B0%E5%BE%84%E5%90%91%E6%B8%90%E5%8F%98)
-   [菱形渐变](/documentation/zh-cn/unreal-engine/gradient-material-functions-in-unreal-engine#%E8%8F%B1%E5%BD%A2%E6%B8%90%E5%8F%98)
-   [线性渐变](/documentation/zh-cn/unreal-engine/gradient-material-functions-in-unreal-engine#%E7%BA%BF%E6%80%A7%E6%B8%90%E5%8F%98)
-   [平滑曲线](/documentation/zh-cn/unreal-engine/gradient-material-functions-in-unreal-engine#%E5%B9%B3%E6%BB%91%E6%9B%B2%E7%BA%BF)
-   [值阶](/documentation/zh-cn/unreal-engine/gradient-material-functions-in-unreal-engine#%E5%80%BC%E9%98%B6)
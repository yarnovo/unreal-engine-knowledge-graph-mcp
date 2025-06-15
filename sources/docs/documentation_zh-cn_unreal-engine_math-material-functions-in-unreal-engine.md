# 虚幻引擎数学材质函数 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/math-material-functions-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:26:51.913Z

---

目录

![数学材质函数](https://dev.epicgames.com/community/api/documentation/image/70a59b40-3448-42bd-9ee1-0880e9f658f0?resizing_type=fill&width=1920&height=335)

数学函数对材质网络中像素的值执行基本数学方程式。

## 分量相加

**AddComponents（分量相加）**函数接收一个"矢量 2"、"矢量 3"或"矢量 4"，将其分量合并到一起，然后输出结果。您必须使用适合于相应输入的输出。例如，如果将图像输入到 *f3（矢量 3）（f3 (Vector3)）*，那么必须使用 *f3* 输出。

项目

说明

输入

 

**f2（矢量 2）（f2 (Vector2)）**

接收"矢量 2"值，以便可将其中的分量相加，然后发送到 *f2* 输出。

**f3（矢量 3）（f3 (Vector3)）**

接收"矢量 3"值，以便可将其中的分量相加，然后发送到 *f3* 输出。

**f4（矢量 4）（f4 (Vector4)）**

接收"矢量 4"值，以便可将其中的分量相加，然后发送到 *f4* 输出。

输出

 

**f2（矢量 2）（f2 (Vector2)）**

输出来自 *f2* 输入的分量的组合值。

**f3（矢量 3）（f3 (Vector3)）**

输出来自 *f3* 输入的分量的组合值。

**f4（矢量 4）（f4 (Vector4)）**

输出来自 *f4* 输入的分量的组合值。

![分量相加](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67c2db9b-7d44-40c6-990e-45fc83adb37a/add-components.png)

由于每个输入都针对其对应的输出单独计算，因此您可使用单个节点上的全部三个输入，前提是同时使用每个输入的对应输出。例如，您可使用一个 AddComponents（分量相加）函数节点对一个"矢量 2"的分量进行组合（利用 *f2* 输出），并使用同一节点对一个"矢量 3"的分量进行组合（利用 *f3* 输出）。

## Pi（π）

**Pi（π）**函数用作 π 的常量，并精确到第 6 位小数 (3.141592)。此节点还附有乘数输入。

输入

说明

**乘数（标量）（Multiplier (Scalar)）**

输入将与 π 相乘的值。

![Pi](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2ec10a8-b861-43e8-a02c-af94ae763ef8/pi-function.png)

## LinearSine

**LinearSine（线性正弦）**函数接收一个标量值，并输出该值的线性正弦或圆形线性正弦（介于 0 与 1 之间）。如果您将 Time（时间）表达式连接到值输入，并使用 LinearSine（线性正弦），那么可在输出中查看符合线性正弦波的动画。

项目

说明

输入

 

**值（标量）（Value (Scalar)）**

这是要对其应用线性正弦函数的传入值。如果此值随时间推移而变化，那么输出将是波形。

**周期（标量）（Period (Scalar)）**

周期控制进行一次完整过渡所需的时间。大于 1 的输入值将使波形速度减慢。

**\-1 到 1（静态布尔值）（-1 to 1 (StaticBool)）**

将此输入设置为 *true* 可调整波形的比例及偏移，使其介于 -1 与 1（而不是 0 与 1）之间。

**正弦相位（静态布尔值）（Sine Phase (StaticBool)）**

将此输入设置为 *true* 将输出普通正弦波，而不是输出线性正弦波。

输出

 

**线性正弦（Linear Sine）**

输出线性正弦波形。

**圆形线性正弦（Rounded Linear Sine）**

输出具有圆形边缘的线性正弦波形。

**方向（Direction）**

输出0或1，躯体取决于正弦波是向下（0）还是向上（1）走。

## VectorToRadialValue

**VectorToRadialValue（矢量到径向值）**函数将"矢量 2"矢量转换为角度，或者将 UV 坐标数据转换为径向坐标。对于矢量，角度将在一个通道中输出，而矢量长度在另一通道中输出。

项目

说明

输入

 

**矢量或 UV（矢量 2）（Vector or UVs (Vector2)）**

接收一个"矢量 2"或一组 UV 坐标。

**混合坐标输出（静态布尔值）（Swizzle Coordinate Output (StaticBool)）**

对调输出的 U 和 V 分量。

输出

 

**径向坐标（Radial Coordinates）**

返回输入的径向坐标。对于矢量，角度将在一个通道中输出，而距离在另一通道中输出。

**矢量转换为角度（Vector Converted to Angle）**

返回输入矢量的角度，对于 UV，返回径向梯度。

**线性距离（Linear Distance）**

返回输入矢量的线性长度，对于 UV，输出距离的径向梯度。

![矢量到径向值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85944f0b-074a-4185-80a0-6527c2ffabb2/vector-to-radial.png)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [分量相加](/documentation/zh-cn/unreal-engine/math-material-functions-in-unreal-engine#%E5%88%86%E9%87%8F%E7%9B%B8%E5%8A%A0)
-   [Pi（π）](/documentation/zh-cn/unreal-engine/math-material-functions-in-unreal-engine#pi%EF%BC%88%CF%80%EF%BC%89)
-   [LinearSine](/documentation/zh-cn/unreal-engine/math-material-functions-in-unreal-engine#linearsine)
-   [VectorToRadialValue](/documentation/zh-cn/unreal-engine/math-material-functions-in-unreal-engine#vectortoradialvalue)
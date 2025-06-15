# 虚幻引擎中的材质数据处理和运算 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/material-data-manipulation-and-arithmetic-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:25:37.976Z

---

目录

![材质中的数据处理和运算](https://dev.epicgames.com/community/api/documentation/image/82324020-0007-4985-a41a-caffbad7ba67?resizing_type=fill&width=1920&height=335)

[材质数据类型](/documentation/zh-cn/unreal-engine/material-data-types-in-unreal-engine)页面介绍了四种在材质编辑器中表示数据的方式。要正确创建材质，你不仅需要了解这些数据类型，还需要了解如何处理数据，以及如何控制信息在材质图表中的流动方式。

本文将讨论两个主题。

1.  [处理数据类型](/documentation/zh-cn/unreal-engine/material-data-manipulation-and-arithmetic-in-unreal-engine#%E5%A4%84%E7%90%86%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)：如何将浮点数组合成多通道向量，以及反之如何将信息从较大的数据类型中分离出来。
2.  [材质图表运算](/documentation/zh-cn/unreal-engine/material-data-manipulation-and-arithmetic-in-unreal-engine#%E6%9D%90%E8%B4%A8%E5%9B%BE%E8%A1%A8%E8%BF%90%E7%AE%97)：在具有不同数据类型的材质中执行运算运算的规则和流程。

## 处理数据类型

最初起源于一种数据类型的一段信息并不需要始终保持这种类型。 例如，可以将两个标量参数（float）组合或 **附加** 到一个双通道向量（float2）中，以便将它们传递到需要双通道数据的输入中。 另一方面，也可以使用 **ComponentMask** 从较大的向量中检索特定的通道子集。

本小节中介绍的材质表达式提供了组合和分离数据的方法，以便控制信息在材质图表中流动的方式。

### AppendVector

AppendVector材质表达式将 **输入A** 中的数据与 **输入B** 中的数据进行组合，并输出一个多通道向量（float2、float3或float4）。 在此示例中，两个常量附加在一起输出一个float2向量：**(1, 2)**.

![AppendVector Node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/280dd693-0758-4521-836c-49e1bce5d775/append-node.png)

#### 用法示例

如果你希望能够独立修改两个值但需要将它们传递到需要多通道数据的输入中，通常可以使用"附加（Append）"节点。如下图所示，美术师可采用一种方法控制材质实例中纹理的平铺（Tiling）或 **UV缩放**，但只能统一进行控制。

![UV Tiling controls uniform](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c474458-a4c9-44ee-ae68-28a2bd6eceac/tiling-uniform.png)

此示例的缺点是材质图表只包含一个参数，但UV坐标有两个通道。 使用此解决方案无法独立控制纹理的宽度和高度。

使用 **AppendVector** 便可以解决这个问题。为每个轴创建一个单独的标量参数，然后将它们传递到"附加（Append）"节点中。 "Append（附加）"节点将这两个参数组合成一个float2向量，然后乘以纹理坐标。

![UV tiling controls two-channel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5375f0e8-2e4b-4679-a465-6316b447a538/append-vector.png)

由于 **平铺X（Tiling X）** 和 **平铺Y（Tiling Y）** 是不同的参数，因此现在可以独立控制纹理的宽度和高度。

#### 附加顺序

AppendVector表达式按照数据附加到节点的顺序对数据进行组合。输入B中的数据始终附加到输入A中数据的末尾。请参考下面的两幅图像。

 ![undefined](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e611903-24e5-4fa5-8946-89f9f0d04326/append-order-01.png) ![undefined](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/239d9561-9e52-47cc-b77f-95fbad04b8ea/append-order-02.png)

-   在第一张幻灯片中，附加的结果为 **(0.05, 0.2, 0.8)**，即节点预览显示的浅蓝色。
-   在第二张幻灯片中，附加的结果为 **(0.8, 0.05, 0.2)**，即节点预览显示的粉色。

### AppendMany

**AppendMany** 是一个[材质函数](/documentation/zh-cn/unreal-engine/unreal-engine-material-functions-overview)，其功能与AppendVector表达式相同，但最多可以将四个单独的浮点/标量值组合成一个多通道向量。

![AppendMany Material Function](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e400e4b7-649c-432e-9f94-85e56e4c3174/append-many.png)

AppendMany函数的另一个好处是它提供了三个不同的输出引脚。 因此，你可以根据具体情况下的需求，访问部分或全部附加通道。

AppendMany节点在其输入端仅接受浮点/标量值。如果将float2、float3或float4向量传递到AppendMany节点中，则除第一个值之外的所有值都将被丢弃。

### 分量遮罩

**分量遮罩（Component Mask）** 材质表达式的作用与上文所述的"附加（Append）"节点刚好相反。 ComponentMask不是对数据进行组合，而是提供一种将数据分成其组成部分或通道的方法。

分量遮罩（Component Mask）的功能类似于"门"。 对于连接到输入端的任何数据，都可以准确选择允许哪些通道到达输出端。 下图显示了一个Constant4Vector向量，其中包含值(0, 1, 0.7, 0.5)。 在图表中选择"遮罩（Mask）"节点时，"细节（Details）"面板中会显示四个复选框。

![Component Mask Details Panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3fd5e30-7bde-488e-a13d-4efb859538cb/component-mask-properties.png)

这些复选框确定节点将输出哪些通道。目前没有勾选，所以"遮罩（Mask）"节点不会输出任何信息。 如果尝试将该节点插入下游的输入端，则会显示错误。

![Component Mask Details Panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2792dd40-8e7b-4b94-ab79-f86b16aa8bc0/component-mask-error.png)

通过这些复选框可以过滤信息，仅使用需要的通道。

假设需要使用 **A通道** 中的值来控制材质的不透明度， 则可以通过选中相应的复选框来启用A通道，然后将"遮罩（Mask）"的输出引脚连接到 **不透明度输入（Opacity Input）**。

![Component Mask example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11fae4bc-1b19-490e-ad9a-efacf07b6ca2/component-mask-opacity.png)

ComponentMask会丢弃未选中的R、G和B通道，仅输出A通道中的值，在本例中该值为0.5。

## 材质图表运算

在材质图表中处理数据的第二种主要方式是通过数学运算。 材质编辑器中提供了所有常见的运算运算。

![Arithmetic Material expressions](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6710325a-f368-4903-bd2c-71be63193abd/arithmetic-nodes.png)

四个运算材质表达式。 请参阅"数学材质表达式"页面以了解更多信息。

运算节点的基本用途应该是不言而喻的。 例如，如果将常数值 **0.3** 和 **0.2** 插入到"加（Add）"节点，则 **加（Add）** 节点会计算 **0.3 + 0.2** 并输出值 **0.5**。 两个常数值之间的运算简单明了。

![Simple addition operation](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a94207d6-1e35-4c04-802b-28d1b551b747/simple-add-graph.png)

但是，如数据类型页面中所示，信息并不总是作为单独的浮点值在材质图表中流动。 因此，了解在材质中的各种数据类型之间执行运算运算的规则和过程非常重要。 有两个主要方面需要重点关注。

1.  对于运算运算，并非所有数据类型都相互兼容。
2.  运算运算的工作方式因所涉及的数据类型而异。

### 兼容和不兼容的数据类型

上面的示例显示了两个浮点值之间的简单加法运算，即0.3 + 0.2 = 0.5。 由于这两个值都是相同类型的数据，因此该运算有效。 如果向其中一个输入传递另一种不同的数据类型，会发生什么情况？ 以下三点总结了数据类型之间的兼容性：

-   **等效数据类型** 之间的运算运算始终有效。例如，**float2 + float2** 会返回一个新的float2。
    
-   浮点数和任何维度更大的浮点数之间的运算运算有效。 例如，**float + float3** 会返回一个新的 **float3**。
    
-   两种非等效数据类型之间的运算运算无效。 例如，**float2 + float3** 无效并且返回错误。
    

换句话说，运算可以跨两种不同数据类型，但前提是其中一种数据类型是浮点数。在下面的图表中，运算 **0.3 + (1,2)** 有效。float与float2中的两个值相加，结果是一个新的float2，其值为 **(1.3, 2.3)**。

![Float1 plus float2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4fafa2b-a497-495b-b84b-ed1d4099db13/float1-float2-add.png)

但是，非等效的float2、float3或float4数据之间的运算运算会返回错误。

![Float3 plus float2 error](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b79c509-ca84-45b0-91c6-2803e9301858/float2-float3-error.png)

下表总结了材质图表运算的数据类型兼容性。

数据类型

运算的兼容数据类型

Float

任意

Float2

Float、Float2

Float3

Float、Float3

Float4

Float、Float4

### 数据类型之间的运算规则

此外，还需要了解如何在不同数据类型之间执行运算计算。下面的两个场景演示了当一个或两个数据类型均大于某个浮点值时是如何执行运算的。

#### 等效数据类型之间的运算运算

当等效数据类型（例如float2 + float2）之间进行运算运算时，输入A中的每个值都与输入B中的相应值进行运算。下面的示例显示了两个 **Constant2Vector** 表达式之间的加法。

![Addition between two Float2 variables](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2ec7903-dd7d-4f96-b15a-c80bc2911272/float2-float2-add.png)

如果详细说明，有两个单独的加法运算。每个节点中的第一个值相加：**(1 + 2)**. 然后，每个节点中的第二个值相加 **(3 + 3)**。得到的结果是一个新的float2值：**(2, 6)**.

以下图表显示了四种数据类型中每一种的运算示例。

输入A, 输入B

输入数据

数学表示法

结果数据

Float, Float

(4) / (2)

4 / 2 = 2

8

Float2, Float2

(1, 3) + (2, 3)

(1 + 2), (3 + 3)

(3, 6)

Float3, Float3

(3, 2, 0.5) \* (2, 1, 2)

(3 x 2), (2 x 1), (0.5 x 2)

(6, 2, 1)

Float4, Float4

(2, 2, 2, 3) - (1, 1, 2, 2,)

(2 - 1), (2 - 1), (2 - 2), (3 - 2)

(1, 1, 0, 1)

#### 浮点和向量之间的运算运算

当浮点数和任何维度更大的数据类型之间进行运算运算时，浮点数会重复用于每个单独的计算。 在下图中，一个 **Constant** 和一个 **Constant3Vector** 相乘。

![Multiplication between a Float and a Float3](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d33a7603-6aaa-41a9-931f-379de1a40e05/float-float3-mult.png)

如图所示，Constant中的值将乘以Constant 3Vector中的每个值。此处有三个单独的乘法表达式：**(2 *3)、(2* 1)** 和 **(2 \* 2)**。得到的乘积是一个float3值：**(6, 2, 4)**。

浮点数位于输入A还是输入B中，对乘法和加法没有影响，但对除法和减法很重要。

![Subtraction operation](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/127747cb-166f-4784-ae11-50d6ebc04f8b/float3-sub-float1.png)

在上图中，从Constant3Vector (6, 4, 3)中的每个值减去Constant (2)中的值。用数学表示法写成：(6 - 2), (4 - 2), (3 - 2). 得到的float3值为 **(4, 2, 1)**。

如果要颠倒输入顺序，结果会不同。

![Subtraction with inputs reversed](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4970c235-d702-42a3-89c3-3eda94f7145e/subtraction-reversed.png)

由于现在浮点数是减法节点中最上面的数字，因此每个运算都是相反的：**(2 - 6), (2 - 4), (2 - 3)**. 得到的float3值为 **(-4, -2, -1)**。

## 总结

本文介绍了你在编写材质图表逻辑时最常见的概念和技巧。下文链接中的参考页面可以帮助你加深对材质编辑器中的数学和数据操作的理解。

-   [数学材质表达式](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine)
-   [向量运算表达式](/documentation/zh-cn/unreal-engine/vector-operation-material-expressions-in-unreal-engine)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)
-   [material editor](https://dev.epicgames.com/community/search?query=material%20editor)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [处理数据类型](/documentation/zh-cn/unreal-engine/material-data-manipulation-and-arithmetic-in-unreal-engine#%E5%A4%84%E7%90%86%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)
-   [AppendVector](/documentation/zh-cn/unreal-engine/material-data-manipulation-and-arithmetic-in-unreal-engine#appendvector)
-   [用法示例](/documentation/zh-cn/unreal-engine/material-data-manipulation-and-arithmetic-in-unreal-engine#%E7%94%A8%E6%B3%95%E7%A4%BA%E4%BE%8B)
-   [附加顺序](/documentation/zh-cn/unreal-engine/material-data-manipulation-and-arithmetic-in-unreal-engine#%E9%99%84%E5%8A%A0%E9%A1%BA%E5%BA%8F)
-   [AppendMany](/documentation/zh-cn/unreal-engine/material-data-manipulation-and-arithmetic-in-unreal-engine#appendmany)
-   [分量遮罩](/documentation/zh-cn/unreal-engine/material-data-manipulation-and-arithmetic-in-unreal-engine#%E5%88%86%E9%87%8F%E9%81%AE%E7%BD%A9)
-   [材质图表运算](/documentation/zh-cn/unreal-engine/material-data-manipulation-and-arithmetic-in-unreal-engine#%E6%9D%90%E8%B4%A8%E5%9B%BE%E8%A1%A8%E8%BF%90%E7%AE%97)
-   [兼容和不兼容的数据类型](/documentation/zh-cn/unreal-engine/material-data-manipulation-and-arithmetic-in-unreal-engine#%E5%85%BC%E5%AE%B9%E5%92%8C%E4%B8%8D%E5%85%BC%E5%AE%B9%E7%9A%84%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)
-   [数据类型之间的运算规则](/documentation/zh-cn/unreal-engine/material-data-manipulation-and-arithmetic-in-unreal-engine#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E4%B9%8B%E9%97%B4%E7%9A%84%E8%BF%90%E7%AE%97%E8%A7%84%E5%88%99)
-   [等效数据类型之间的运算运算](/documentation/zh-cn/unreal-engine/material-data-manipulation-and-arithmetic-in-unreal-engine#%E7%AD%89%E6%95%88%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E4%B9%8B%E9%97%B4%E7%9A%84%E8%BF%90%E7%AE%97%E8%BF%90%E7%AE%97)
-   [浮点和向量之间的运算运算](/documentation/zh-cn/unreal-engine/material-data-manipulation-and-arithmetic-in-unreal-engine#%E6%B5%AE%E7%82%B9%E5%92%8C%E5%90%91%E9%87%8F%E4%B9%8B%E9%97%B4%E7%9A%84%E8%BF%90%E7%AE%97%E8%BF%90%E7%AE%97)
-   [总结](/documentation/zh-cn/unreal-engine/material-data-manipulation-and-arithmetic-in-unreal-engine#%E6%80%BB%E7%BB%93)
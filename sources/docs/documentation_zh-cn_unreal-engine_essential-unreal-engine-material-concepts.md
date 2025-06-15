# 虚幻引擎材质基本概念 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts
> 
> 生成时间: 2025-06-14T19:25:35.432Z

---

目录

![材质基本概念](https://dev.epicgames.com/community/api/documentation/image/c9f7bbb2-b307-4170-8d39-a190742eaef3?resizing_type=fill&width=1920&height=335)

虚幻引擎中的 **材质（Materials）** 定义了场景中对象的表面属性。从广义上来讲，你可以将材质理解为涂在网格体上用来控制其视觉外观的"涂料"。

更具体地说，材质能准确地告诉引擎某个表面应该如何与场景中的光源交互。材质定义了表面的各种特性，包括颜色、反射率、粗糙度、透明度等。

## 着色管线概述

在渲染管线中，着色器是定义每个顶点或像素应该如何渲染的程序。虚幻引擎中的着色器用[高级着色语言](https://en.wikipedia.org/wiki/High-Level_Shading_Language)（HLSL）编写。然后，将着色器代码转换为GPU硬件可以执行的一系列汇编语言指令。最终像素颜色就这样输出到了你的显示器。

在虚幻编辑器中，你无需编写HLSL代码即可为你的项目创建着色器。你在名为 **材质编辑器（Material Editor）** 的可视化脚本界面中创建名为 **材质（Materials）** 的资产。

### 材质

在着色器图表中组合名为 **材质表达式（Material Expressions）** 的节点，并将结果传递到[主材质节点](/documentation/zh-cn/unreal-engine/using-the-main-material-node-in-unreal-engine)上的输入，即可构建材质。

![简单的胡桃木地板材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc2711ca-b053-4c8e-9ed2-8128a3f752a5/walnut-floor-material.png)

这些节点图表在幕后被默默地转换为HLSL。作为用户，你可以查看HLSL代码，但你无法直接编辑它。这使得虚幻引擎中的材质创建直观且易于使用。

![材质图表和HLSL代码](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1df73972-0351-4aac-b57d-e8f8a7b3885d/mat-hlsl.png)

点击 **窗口（Window）** > **着色器代码（Shader Code）** > **HLSL代码（HLSL Code）** ，可以查看材质的HLSL代码。请注意，HLSL代码是只读选项卡，你无法直接在虚幻编辑器中编辑HLSL着色器代码。

## 材质工作流程概述

本小节提供了虚幻引擎中材质创建过程的简要概述。

这并非全面的分步指南，而是广泛的概念概述。有关材质编辑器的详细用法，请查看[材质编辑器用户指南](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E6%9D%90%E8%B4%A8%E7%BC%96%E8%BE%91%E5%99%A8%E7%94%A8%E6%88%B7%E6%8C%87%E5%8D%97)中的页面。

### 创建新材质

虚幻引擎中的材质是一种资产，如静态网格体、纹理或蓝图。你可以通过内容浏览器创建新材质。

1.  在 **内容浏览器（Content Browser）** 中右击。
2.  在上下文菜单的 **创建基本资产（Create Basic Asset）** 分段中选择 **材质（Material）**。
    
    ![创建材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b493ea19-f9e7-4f20-9371-1b1a5799567e/create-basic-asset.png)
3.  材质已在内容浏览器中创建。赋予它唯一的描述性名称。
    
    ![材质缩略图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/643131af-8577-465b-8b0c-a60461acadf1/material-asset-cb.png)

**双击** 材质资产开始编辑材质。**材质编辑器（Material Editor）** 窗口打开，如下所示。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/285467d1-135e-4301-b3d4-7778b168ab36/full-material-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/285467d1-135e-4301-b3d4-7778b168ab36/full-material-editor.png)

点击查看大图。

突出显示的区域称为 **材质图表（Material Graph）**，这是你在创建材质时完成大部分工作的区域。除了 **主材质节点（Main Material Node）**，新材质中的材质图表为空。主材质节点包含所有控制着材质外观的输入参数。

有关材质编辑器UI的详细分解，[请查看此处](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-ui)。

### 材质属性

选择 **主材质节点（Main Material Node）** 后，**细节面板（Details panel）** 中会显示材质的全局属性和设置。你还可以点击材质图表中的空白处，显示材质属性。

其中有三项设置在材质创建过程之初尤为重要，因为它们构成了材质的基础并决定了它的使用方式。

![细节属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c44ef43b-019c-4cfd-957d-c00b958e917a/details-properties.png)

-   **材质域（Material Domain）** – 定义材质在你的项目中的用途。例如，表面、用户界面和后期处理材质是不同的材质域。
-   **混合模式（Blend Mode）** – 定义材质如何与其后面的像素混合。例如，**不透明（Opaque）** 着色器将完全遮挡后面的对象，而 **半透明（Translucent）** 和 **附加（Additive）** 着色器将以某种方式与背景混合。
-   **着色模型（Shading Model）** – 定义材质如何与光源交互。通常，你的材质将简单地使用默认光照着色模型。但是，虚幻引擎包含针对 **毛发（Hair）**、**布料（Cloth）** 和 **皮肤（Skin）** 等事物的特定着色模型，这些模型提供上下文专属输入，以便更轻松地创建这些类型的表面。

这些属性准确地确定在主材质节点上启用哪些输入。在上图中，**不透明度（Opacity）** 显示为灰色，因为不透明混合模式不支持透明度。

如果你选择 **半透明混合模式（Translucent Blend Mode）**，那么 **不透明度（Opacity）** 输入可用，并且之前启用的几个输入将变灰。

![半透明混合模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/939e6173-1503-4a46-a515-f496141dd806/translucent.png)

创建新材质时，建议你先配置这三个属性。

有关细节面板中其余属性的信息，请查看[材质属性](/documentation/zh-cn/unreal-engine/unreal-engine-material-properties)文档。

### 材质表达式节点

如果材质属性是基础，**材质表达式** 则是材质的构建块。

![材质表达式节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72f631de-3bf3-48b7-8274-1733f65c65e1/material-expressions.png)

每个材质表达式在材质图表中将执行特定的操作。从技术上讲，材质表达式只是HLSL代码片段的视觉效果呈现。当你组合材质表达式时，你要做的是编写HLSL着色器，而无需查看代码本身。

将电缆连接从一个节点的 **输出引脚** 拖到另一个节点的 **输入引脚**，即可在材质表达式之间传递数据。

![连接节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd7703d1-541e-4475-a3bd-ed1235b12915/connect-nodes.png)

简单的表面可能仅需几个材质表达式定义材质，如下所示，三个纹理示例占大部分比重。 此图表中的其他节点可让美术师更好地控制粗糙度强度。

![简单材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b503c3b-87e9-48d5-9460-0fca0f2a0c3f/simple-material.png)

这可能是完成的材质，或者你可以在材质图表中使用数学和逻辑继续优化表面。 了解如何组合材质表达式，以便在材质中实现特定结果，是在虚幻中创建材质的基础。

欲了解如何在图表中放置材料表达式，请[查看此处](/documentation/zh-cn/unreal-engine/placing-material-expressions-and-functions-in-unreal-engine)。

虚幻引擎包括几十个材质表达式节点。其中的大多数都有鼠标悬停提示文本，但你可以查看[材质表达式参考](/documentation/zh-cn/unreal-engine/unreal-engine-material-expressions-reference)页面，了解每个节点的用途。

### 材质表达式属性和数值

每个材质表达式在节点被选中的时候，都有一些属性和数值可以在 **细节面板（Details Panel）** 中进行修改。在一些情况下这些数值还可以直接在材质图表中的节点上进行编辑。

材质表达式属性可以大致分为几个类别。

#### 浮点值

这些数值反映节点储存的数据或者材质表达式中用于运算的数据。比如由[常量](/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine)材质表达式定义的数值，或者[数学材质表达式](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine)中的算术运算符。你可以在细节面板或者节点上设置这些数值，也可以通过节点的上的引脚来输入数据。

![Constant value examples](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aafcc6bb-7ad2-4caf-8c45-f1e52f4ac9b9/material-expressions-constant-values.png)

如果在细节面板或者节点上设置了数值，那么通过输入引脚传入的该属性的数据会将其覆盖。

![Multiply with Constants](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/791d00e2-a24c-482c-9c75-956205502474/multiply-expression-input-values.png)

1.  左侧的乘法节点进行了一个运算 1 \* 2 并且输出数值2。
2.  常量被输入同一个乘法节点时，连接到输入引脚 **A** 和 **B** 的数值会覆盖细节面板中的数值。该节点会计算 2 \* 3 并且输出数值6。

#### 功能切换

材质表达式属性还包括切换和下拉菜单，用来控制该节点特定功能的开关，或者更改节点的运作方式。举个例子，**ViewProperty** 节点有一个下拉菜单，可以选择让节点输出哪一个查看属性。类似地，**ComponentMask** 节点由一组切换开关，可以决定哪些数据允许被输出。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5f3352a-e9a6-4c26-8f6b-cea67ac0fe3d/material-expression-properties.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5f3352a-e9a6-4c26-8f6b-cea67ac0fe3d/material-expression-properties.png)

#### 变量数据

在一些情况下，节点可能会包含变量，可以在材质表达式中引用其它地方的数据，比如蓝图或者代码。参数名称、排序优先级以及自定义原始数据指数都属于这类属性。这些数值通常为整数或者文本字符串。

### 在图表内编辑数值和属性

很多常用的材质表达式都能够直接在节点本身上修改常量值和属性。对于这些表达式，你不需要选中节点然后在细节面板中编辑数值，而是可以直接在节点的输入区域进行修改。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f5cb119-c8fd-4d8f-a197-5295f264e8f6/inline-editing.gif)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f5cb119-c8fd-4d8f-a197-5295f264e8f6/inline-editing.gif)

点击查看大图。

一些材质表达式节点上的属性并不会默认显示。你可以点击材质表达式底部的下拉图标来展开节点并显示更多属性。

### 主材质节点

数据在材质图表中从左到右流动，**主材质节点（Main Material Node）** 是每个材质网络的终点。

主材质节点包含最终输入引脚，这些引脚将确定使用材质编译哪些信息。除非图表中的材质表达式是连接到主材质节点的链的一部分，否则不会影响材质。

在上面的视频中，请注意材质预览仅在纹理示例连接到主材质节点上的相应输入后才会更新。

主材质节点上的每个输入都将定义整个材质的特定属性。这两个页面将帮助你了解每个输入的用途：

1.  [基于物理的材质](/documentation/zh-cn/unreal-engine/physically-based-materials-in-unreal-engine)，介绍虚幻基于物理的材质工作流程的原则和最佳实践。
2.  [材质输入](/documentation/zh-cn/unreal-engine/material-inputs-in-unreal-engine)，介绍主材质节点上每个输入的用途。

### 编译和应用

在编译材质之前，无法在关卡中看到材质的更改。要编译材质，请点击材质编辑器（Material Editor）顶部工具栏中的应用（Apply）或保存（Save）按钮。

![编译和应用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6aadec93-0353-43c4-818d-b9cb8d728cac/apply-compile.png)

编译后，你可以将材质直接从内容浏览器（Content Browser）拖到关卡中的Actor上。

![将材质拖到Actor上](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8195f7fb-2580-4655-b1b7-a32e3f6a11bd/drag-drop.png)

编译可能需要几秒钟，对于复杂的材质，最多可能需要几分钟。这可能会在开发和测试材质时妨碍你的工作进度，但有几种方法可以最大限度地减少编译延迟。

**材质实例化（Material Instancing）** 是一种缩短迭代时间并避免工作时编译长时间延迟的策略。在下面了解更多关于[实例化](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B%E5%92%8C%E5%8F%82%E6%95%B0%E5%8C%96)的信息。

### 材质编辑器用户指南

上述过程涵盖了虚幻引擎中的基本材质工作流程。上面讨论的每个步骤都在《材质编辑器用户指南》中进行了更全面的介绍。

建议你查看这些页面，了解材质创建的入门知识：

1.  [材质编辑器用户界面](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-ui)
2.  [放置材质表达式和函数](/documentation/zh-cn/unreal-engine/placing-material-expressions-and-functions-in-unreal-engine)
3.  [使用主材质节点](/documentation/zh-cn/unreal-engine/using-the-main-material-node-in-unreal-engine)
4.  [预览和应用材质](/documentation/zh-cn/unreal-engine/previewing-and-applying-your-materials-in-unreal-engine)
5.  [整理材质图表](/documentation/zh-cn/unreal-engine/organizing-a-material-graph-in-unreal-engine)

## 工作流程效率概念

你创建的材质很少是一次性资产。为项目中的每个Actor创作全新的着色器效率低下，特别是因为类似的资产往往需要非常相似的材质。

**材质实例（Material Instances）** 和 **材质函数（Material Functions）** 可以使你更轻松地自定义和复用材质，以便你可以更快地迭代并避免重复执行相同的工作。

### 材质实例和参数化

材质实例让你可以从单个父材质快速创建多个变体或实例。

当一组相关资产需要相同的基本材质，但具有不同的表面特征时，将使用实例。如具有多种颜色变体的家具。

![椅子材质实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/612b449c-2a18-4880-a388-5b201de4e28e/instances-example.png)

材质实例化让你可以为家具集创建单一的父材质。然后，你将为每种颜色创建材质实例，如上图椅子所示。

使用实例有几个优点：

-   你可以自定义材质实例，无需重新编译父材质。这意味着你对实例所做的更改在所有视口中立即可见。
-   你可以在[材质实例编辑器](/documentation/zh-cn/unreal-engine/unreal-engine-material-instance-editor-ui)中向美术师展示 **参数**。这意味着他们可以快速直观地创建材质变体，无需编辑更复杂的节点图表。

在此处查看[材料实例](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)，了解轨道。

### 材质函数

**材质函数** 让你可以将材质图表的一部分打包成可重复使用的资产，你可以将其共享到公共库，并轻松插入到其他材质。

它们的目的是即时访问常用的材质节点网络，从而简化材质创建。

例如，下面显示的 **Blend\_Overlay** 函数包含图像右侧显示的整个材质表达式网络。 你可以将它从函数库中直接插入到你的图表中，而不用一遍又一遍地构建此节点网络。

![材质函数示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c29a4fe0-24f6-4b3e-be88-12d44c1210bb/overlay-function.png)

虚幻编辑器包括几十个预制的材质函数。你可以编辑任何材质函数来改变其行为，或直接在编辑器中创建自己的函数。

在此处查看有关创建和使用[材质函数](/documentation/zh-cn/unreal-engine/material-functions-in-unreal-engine)的更多信息。

## 使用颜色和数据

虚幻引擎使用的是 **RGBA** 色彩模型，意味着每个像素都由四个数值定义，分别对应 **红（Red）、绿（Green）、蓝（Blue）、和Alpha** 通道。

举个例子，RGBA数值 **(0.0, 0.0, 1.0, 1.0)** 表示一个纯蓝色并且完全不透明的像素。在材质编辑器中，这样的一组数值称为 **浮点4（float4）**，因为它储存的是四个 **浮点** 数值。

所有穿过材质图表的信息都由浮点数值表示，但并不是都和上述例子一样四个数值为一组。材质编辑器中有四种数据类型：

数据类型

定义

示例

浮点（Float）

储存一个浮点数值

(1.0)

浮点2（Float2）

储存两个浮点数值

(1.5, 2.0)

浮点3（Float3）

储存三个浮点数值

(0.0, 1.0, 3.5)

浮点4（Float4）

储存四个浮点数值

(0.5, 1.0, 0.2, 0.9)

材质编辑器中的节点和引脚通常都设计为接收特定的数据类型。举个例子，很多针对每个通道运行的材质表达式只有在收到正确的数据类型时才能运作。

正因如此，理解上述四种数据类型才至关重要，还需要明白各种技巧和策略来操作数据并控制信息在你的图表中的流向。在你学习虚幻引擎材质创建的过程中，我们强烈建议参考以下两个页面。

-   [材质数据类型](/documentation/zh-cn/unreal-engine/material-data-types-in-unreal-engine)
-   [数据流和运算](/documentation/zh-cn/unreal-engine/material-data-manipulation-and-arithmetic-in-unreal-engine)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [着色管线概述](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E7%9D%80%E8%89%B2%E7%AE%A1%E7%BA%BF%E6%A6%82%E8%BF%B0)
-   [材质](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E6%9D%90%E8%B4%A8)
-   [材质工作流程概述](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E6%9D%90%E8%B4%A8%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B%E6%A6%82%E8%BF%B0)
-   [创建新材质](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E5%88%9B%E5%BB%BA%E6%96%B0%E6%9D%90%E8%B4%A8)
-   [材质属性](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E6%9D%90%E8%B4%A8%E5%B1%9E%E6%80%A7)
-   [材质表达式节点](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E6%9D%90%E8%B4%A8%E8%A1%A8%E8%BE%BE%E5%BC%8F%E8%8A%82%E7%82%B9)
-   [材质表达式属性和数值](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E6%9D%90%E8%B4%A8%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%B1%9E%E6%80%A7%E5%92%8C%E6%95%B0%E5%80%BC)
-   [浮点值](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E6%B5%AE%E7%82%B9%E5%80%BC)
-   [功能切换](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E5%8A%9F%E8%83%BD%E5%88%87%E6%8D%A2)
-   [变量数据](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E5%8F%98%E9%87%8F%E6%95%B0%E6%8D%AE)
-   [在图表内编辑数值和属性](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E5%9C%A8%E5%9B%BE%E8%A1%A8%E5%86%85%E7%BC%96%E8%BE%91%E6%95%B0%E5%80%BC%E5%92%8C%E5%B1%9E%E6%80%A7)
-   [主材质节点](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E4%B8%BB%E6%9D%90%E8%B4%A8%E8%8A%82%E7%82%B9)
-   [编译和应用](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E7%BC%96%E8%AF%91%E5%92%8C%E5%BA%94%E7%94%A8)
-   [材质编辑器用户指南](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E6%9D%90%E8%B4%A8%E7%BC%96%E8%BE%91%E5%99%A8%E7%94%A8%E6%88%B7%E6%8C%87%E5%8D%97)
-   [工作流程效率概念](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B%E6%95%88%E7%8E%87%E6%A6%82%E5%BF%B5)
-   [材质实例和参数化](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B%E5%92%8C%E5%8F%82%E6%95%B0%E5%8C%96)
-   [材质函数](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E6%9D%90%E8%B4%A8%E5%87%BD%E6%95%B0)
-   [使用颜色和数据](/documentation/zh-cn/unreal-engine/essential-unreal-engine-material-concepts#%E4%BD%BF%E7%94%A8%E9%A2%9C%E8%89%B2%E5%92%8C%E6%95%B0%E6%8D%AE)
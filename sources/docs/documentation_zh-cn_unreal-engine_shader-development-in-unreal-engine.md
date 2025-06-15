# 虚幻引擎着色器开发 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:24:33.285Z

---

目录

![着色器开发](https://dev.epicgames.com/community/api/documentation/image/461b626e-90ec-4de3-a19f-9c8d7f03d135?resizing_type=fill&width=1920&height=335)

## 快速入门

处理着色器时，请务必将 r.ShaderDevelopmentMode 设置为 1，以将其启用。最简单的方法是编辑 ConsoleVariables.ini，以便每次加载时都进行启用。这将启用"出错时重试"以及与着色器开发相关的日志和警告。

请使用 **Ctrl+Shift+.**，这样会执行 *recompileshaders changed* 命令。这个命令应该在你将更改保存到Unreal Shader（.usf）文件后执行。

如果你更改包括在许多着色器中的文件（例如common.usf），那么此操作可能需要花费一些时间。如果你想对某个材质进行迭代，那么可通过对材质进行小幅更改（例如移动节点）并使用材质编辑器中的"应用"（Apply）来触发材质重新编译。

## 着色器与材质

#### 全局着色器

全局着色器是对固定几何体（例如全屏幕四边形）执行操作并且不需要与材质进行交互的着色器。示例包括阴影过滤或者后处理。在内存中，对于任何给定的全局着色器类型，只有一个着色器。

#### 材质与网格类型

材质由一组用于控制材质渲染方式（混合模式以及双面，等等）的状态以及一组用于控制材质与各种渲染过程的交互方式的材质输入（底色、粗糙度和法线，等等）控制。

#### 顶点工厂

材质必须支持应用于不同的网格类型，而这是通过顶点工厂来实现的。`FVertexFactoryType` 代表唯一的网格类型，而 `FVertexFactory` 实例存储每个实例的数据以支持该唯一网格类型。例如，`FGPUSkinVertexFactory` 存储皮肤处理所需的骨基质，以及对 GPU 皮肤顶点工厂着色器代码需要用作输入的各种顶点缓冲区的引用。顶点工厂着色器代码是一个隐式接口，由各种过程着色器用于抽取网格类型差异。顶点工厂主要由顶点着色器代码组成，但也包含一些像素着色器代码。顶点工厂着色器代码的一些重要组成部分如下：

函数

说明

FVertexFactoryInput

定义顶点工厂所需的顶点着色器输入。这些输入必须与 C++ 端的 FVertexFactory 中的顶点声明匹配。

FVertexFactoryIntermediates

用于存储高速缓存的中间数据，该数据将在多个顶点工厂函数中使用。一个常用的示例是 TangentToLocal 矩阵，该矩阵必须根据未打包的顶点输入进行计算。

FVertexFactoryInterpolantsVSToPS

要从顶点着色器传递到像素着色器的顶点工厂数据。

VertexFactoryGetWorldPosition

此函数从顶点着色器中调用，用于获取全局空间顶点位置。对于静态网格，此函数只是使用 LocalToWorld 矩阵将局部空间位置从顶点缓冲区转换到全局空间。对于由 GPU 处理皮肤的网格，将首先处理此位置的皮肤，然后再转换到全局空间。

VertexFactoryGetInterpolantsVSToPS

将 FVertexFactoryInput 转换为 FVertexFactoryInterpolants，后者将由图形硬件进行插值，然后再传递到像素着色器。

GetMaterialPixelParameters

此函数在像素着色器中调用，并将特定于顶点工厂的插值 (FVertexFactoryInterpolants) 转换为 FMaterialPixelParameters 结构，该结构由过程像素着色器使用。

#### 材质着色器

使用 `FMaterialShaderType` 的着色器是特定于过程的着色器，它们需要访问材质的某些属性，因此必须针对每个材质进行编译，但不需要访问任何网格属性。光函数过程着色器是 `FMaterialShaderType` 的示例。

使用 `FMeshMaterialShaderType` 的着色器是特定于过程的着色器，它们依赖于材质的属性和网格类型，因此必须针对每个材质/顶点工厂组合进行编译。例如，`TBasePassVS` / `TBasePassPS` 需要对正向渲染过程中的所有材质输入进行评估。

材质的必需着色器集合包含在 `FMaterialShaderMap` 中。其类似于：

```cpp
	FMaterialShaderMap
		FLightFunctionPixelShader - FMaterialShaderType
		FLocalVertexFactory - FVertexFactoryType
			TDepthOnlyPS - FMeshMaterialShaderType
			TDepthOnlyVS - FMeshMaterialShaderType
			TBasePassPS - FMeshMaterialShaderType
			TBasePassVS - FMeshMaterialShaderType
			Etc
		FGPUSkinVertexFactory - FVertexFactoryType
			Etc

```

顶点工厂根据其 **ShouldCache** 函数包括在此矩阵中，该函数依赖于材质的使用。例如，bUsedWithSkeletalMesh 值为 `true` 表示包括 GPU 皮肤顶点工厂。`FMeshMaterialShaderType` 根据其 ShouldCache 函数包括在此矩阵中，该函数依赖于材质及顶点工厂属性。这是一种对着色器进行高速缓存的稀疏矩阵方法，这种方法会导致着色器数目迅速增加，从而占用内存并增加编译时间。相对于存储实际需要的着色器列表，主要优点是不必生成任何列表，因此在控制台上运行之前，所需的着色器始终已编译完成。虚幻引擎通过压缩着色器来缓解着色器内存问题，并通过多内核着色器编译来缓解编译时间问题。

#### 创建材质着色器

材质着色器类型是使用 DECLARE\_SHADER\_TYPE 宏来创建的：

```cpp

class FLightFunctionPixelShader : public FShader { DECLARE_SHADER_TYPE(FLightFunctionPixelShader,Material);

```

这个宏为材质着色器类型声明必要的元数据和函数。材质着色器类型将使用 IMPLEMENT\_MATERIAL\_SHADER\_TYPE 进行实例化：

```cpp

IMPLEMENT_MATERIAL_SHADER_TYPE(,FLightFunctionPixelShader,TEXT("LightFunctionPixelShader")

```

这将生成材质着色器类型的全局元数据，这些元数据允许我们在运行时执行各种操作，例如使用给定的着色器类型对所有着色器进行迭代。

典型的材质像素着色器类型将先通过调用 **GetMaterialPixelParameters** 顶点工厂函数来创建 `FMaterialPixelParameters` 构造。GetMaterialPixelParameters 将特定于顶点工厂的输入转换为任何过程可能想访问的属性，例如 WorldPosition 和 TangentNormal 等等。然后，材质着色器将调用 **CalcMaterialParameters**，后者将写出 `FMaterialPixelParameters` 的其余成员，之后 `FMaterialPixelParameters` 完全初始化。然后，材质着色器将通过 MaterialTemplate.usf 中的函数来访问该材质的某些输入（例如，通过 **GetMaterialEmissive** 访问材质的自发光输入），执行一些明暗处理，然后输出该过程的最终颜色。

#### 特殊引擎材质

**UMaterial** 具有一项名为 bUsedAsSpecialEngineMaterial 的设置，该设置允许将材质与任何顶点工厂类型配合使用。这意味着所有顶点工厂都随该材质一起编译，而这将是一个非常大的集合。bUsedAsSpecialEngineMaterial 用于：

-   仅与渲染视图模式（例如照明）配合使用的材质。
-   在发生编译错误时用作后备的材质（DefaultDecalMaterial 和 DefaultMaterial，等等）。
-   在渲染其他材质时使用其着色器，以减少必须高速缓存的着色器数目的材质。例如，某个不透明材质的"仅深度"着色器将生成与 DefaultMaterial 相同的深度输出，因此将改为使用 DefaultMaterial 的着色器，而该不透明材质将跳过对该"仅深度"着色器的高速缓存。

## 着色器编译

Unreal Engine 使用流式系统以异步方式编译着色器。编译请求在没有高速缓存的着色器贴图的材质加载时排入队列，编译结果将在它们变为可用时应用，而不会阻塞引擎。这可在装入时间和编译吞吐量方面实现最佳结果，但这意味着实际平台着色器编译与请求编译的材质之间存在相当多的层。

实际编译工作在称为"着色器编译工作程序"的辅助进程中完成，这是因为平台着色器编译函数 (D3DCompile) 中通常包含不可分割区块，这些区块导致无法在单个进程中进行多内核比例调整。

#### 调试着色器编译器

有一些设置可控制完成编译的方式，这可以简化着色器编译器的调试。你可在 BaseEngine.ini 的 \[DevOptions.Shaders\] 一节中找到这些设置。

设置

说明

bAllowCompilingThroughWorkers

是否启动 SCW 以调用编译器 DLL，或者虚幻引擎是否应直接调用编译器 DLL。如果禁用此设置，那么将以单内核方式执行编译。

bAllowAsynchronousShaderCompiling

是否应通过虚幻引擎中的另一个线程来执行编译。

如果你想直接从虚幻引擎中单步跳入着色器编译器 DLL（例如 CompileD3D11Shader），那么应将这两者都设置为 *false*。但是，编译将花费较长时间，因此请确保已对所有其他着色器进行高速缓存。

#### 发生编译错误时重试

启用 r.ShaderDevelopmentMode 之后，你将有机会在发生着色器编译错误时重试。这对于全局着色器而言特别重要，因为无法成功编译即表示发生致命错误。

在连接调试器之后进行调试时，你将遇到断点，而编译错误会显示在 Visual Studio 输出窗口中。然后，你可 **双击** 错误日志，以直接转到存在问题的行。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c5da543-75f3-40db-9492-24030cfd73d0/compilererrordebug.png)

否则，系统将显示 Yes/No 对话框

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7f767f6-870b-4392-9429-7f97de8d8d18/compileerror.png)

## 着色器高速缓存与准备

着色器编译之后，它们将存储在"派生的数据高速缓存"中。在它们的键中，包含所有编译输入（包括着色器源文件）的散列。这意味着，你每次重新启动引擎或执行 'recompileshaders changed' 时，都会自动应用对着色器源文件所作的更改。

当你修改 FShader 序列化函数时，不需要处理向后兼容性，而只需在该着色器所包括的着色器文件中添加一个空格。

准备资产时，材质着色器将直接插入到材质的包中，而全局着色器单独存储在全局着色器文件中，这使其可以在引擎启动过程中的早期加载。

## 调试

调试着色器的主要方法是修改着色器以输出中间结果，然后使用适当的 VisualizeTexture 命令将该结果可视化。这样就可以快速执行迭代，因为你可以迅速完成编译，而不必重新启动引擎。例如，你可以使用类似于以下的代码来验证 WorldPosition 是否正确：

```cpp

OutColor = frac(WorldPosition / 1000);

```

然后，验证比例正确，并且结果与视图无关。但是，对于那些构建数据结构的较复杂着色器，此方法无法很好地调整比例。

#### 转储调试信息

你还可以使用 r.DumpShaderDebugInfo=1，以将编译的所有着色器的文件保存到磁盘。就像 r.ShaderDevelopmentMode 一样，在 ConsoleVariables.ini 中进行此设置可能非常有用。文件将保存到 GameName/Saved/ShaderDebugInfo，其中包括

-   源文件，并包括
-   着色器的预处理版本
-   一个批处理文件，用于使用与已使用的编译器等效的命令行选项来编译预处理版本

如果保持此设置开启，那么会在硬盘上生成许多非常小的文件和文件夹。

## 迭代最佳实践

如果你正在处理全局着色器，那么 recompileshaders changed 或 **Ctrl+Shift+.** 是最快的迭代方法。如果着色器要花费较长时间才能完成编译，你可考虑在着色器的 ModifyCompilationEnvironment 中指定 CFLAG\_StandardOptimization 作为编译标志。

如果你正在处理材质着色器，例如 BasePassPixelShader.usf，那么对单个材质执行迭代将会快得多。你每次在材质编辑器中单击"应用"按钮时，都会从磁盘重新读取着色器文件，并且仅重新编译该材质。

## 交叉编译器

[HLSL 交叉编译器](/documentation/zh-cn/unreal-engine/cross-compiler-in-unreal-engine) 用来将 HLSL 自动转换为用于 OpenGL 平台的 GLSL，从而使你只需针对所有平台编写一次着色器。它在离线着色器编译期间运行，并对代码执行 OpenGL 驱动程序经常遗漏的各种优化。

## AsyncCompute

[AsyncCompute](/documentation/zh-cn/unreal-engine/asynccompute-in-unreal-engine) 是某些使用特定 GPU 的 API 中提供的一项硬件功能。它使交错能够更好更有效率地利用 GPU 中的硬件单元。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [快速入门](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine#%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8)
-   [着色器与材质](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine#%E7%9D%80%E8%89%B2%E5%99%A8%E4%B8%8E%E6%9D%90%E8%B4%A8)
-   [全局着色器](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine#%E5%85%A8%E5%B1%80%E7%9D%80%E8%89%B2%E5%99%A8)
-   [材质与网格类型](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine#%E6%9D%90%E8%B4%A8%E4%B8%8E%E7%BD%91%E6%A0%BC%E7%B1%BB%E5%9E%8B)
-   [顶点工厂](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine#%E9%A1%B6%E7%82%B9%E5%B7%A5%E5%8E%82)
-   [材质着色器](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine#%E6%9D%90%E8%B4%A8%E7%9D%80%E8%89%B2%E5%99%A8)
-   [创建材质着色器](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%9D%90%E8%B4%A8%E7%9D%80%E8%89%B2%E5%99%A8)
-   [特殊引擎材质](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine#%E7%89%B9%E6%AE%8A%E5%BC%95%E6%93%8E%E6%9D%90%E8%B4%A8)
-   [着色器编译](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine#%E7%9D%80%E8%89%B2%E5%99%A8%E7%BC%96%E8%AF%91)
-   [调试着色器编译器](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine#%E8%B0%83%E8%AF%95%E7%9D%80%E8%89%B2%E5%99%A8%E7%BC%96%E8%AF%91%E5%99%A8)
-   [发生编译错误时重试](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine#%E5%8F%91%E7%94%9F%E7%BC%96%E8%AF%91%E9%94%99%E8%AF%AF%E6%97%B6%E9%87%8D%E8%AF%95)
-   [着色器高速缓存与准备](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine#%E7%9D%80%E8%89%B2%E5%99%A8%E9%AB%98%E9%80%9F%E7%BC%93%E5%AD%98%E4%B8%8E%E5%87%86%E5%A4%87)
-   [调试](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine#%E8%B0%83%E8%AF%95)
-   [转储调试信息](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine#%E8%BD%AC%E5%82%A8%E8%B0%83%E8%AF%95%E4%BF%A1%E6%81%AF)
-   [迭代最佳实践](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine#%E8%BF%AD%E4%BB%A3%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)
-   [交叉编译器](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine#%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8)
-   [AsyncCompute](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine#asynccompute)
# 在虚幻引擎中添加全局着色器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/adding-global-shaders-to-unreal-engine
> 
> 生成时间: 2025-06-14T19:24:31.525Z

---

目录

![在虚幻引擎中添加全局着色器](https://dev.epicgames.com/community/api/documentation/image/16bd537b-aa3e-4022-979a-54e36bb4ab79?resizing_type=fill&width=1920&height=335)

**全局着色器（Global Shaders）** 是不通过材质编辑器创建的着色器。相反，全局着色器使用C++创建，它们在固定的几何体上运行，并且无需与材质或网格体结合。有时候，必须使用更高级的功能才能实现某些外观，为此，有必要自定义着色器通道。

全局着色器的部分示例包括渲染后期处理效果、分配计算着色器和清空屏幕。

## 虚幻着色器文件

虚幻引擎使用 **虚幻着色器文件（Unreal Shader）** （.usf）文件存储和读取有关所使用着色器的信息。所有新建的着色器的源文件都需要存储在 `Engine/Shaders` 文件夹中。若[着色器是插件的一部分](/documentation/zh-cn/unreal-engine/shaders-in-plugins-for-unreal-engine)，则应将其存储在 `Plugin/Shaders` 文件夹中。

在 **ConsoleVariables.ini** 文件中使用命令 **r.ShaderDevelopmentMode=1**，以获取有关着色器编译的详细日志。

有关更多信息，请参见[着色器开发](/documentation/zh-cn/unreal-engine/shader-development-in-unreal-engine)。

## 全局着色器示例

作为示例，我们将创建一个简单的直通（pass-through） **顶点着色器（Vertex Shader）** 以及一个会返回自定义颜色的 **像素着色器（Pixel Shader）**。

### 创建和添加新着色器

在 `Engine/Shaders` 文件夹中创建新的文本文件，创建自己的着色器。将其文件扩展名重命名为 **.usf**，然后指定着色器名称。以下示例使用 **MyTest.usf**。

然后，将以下代码添加到 **MyTest.usf** 文件：

MyTest.usf

```cpp
	// 简单的直通顶点着色器

	void MainVS(
		in float4 InPosition : ATTRIBUTE0,
		out float4 Output : SV_POSITION
	)
	{
		Output = InPosition;
	}

	// 简单的纯色像素着色器
	float4 MyColor;
	float4 MainPS() : SV_Target0
	{
		return MyColor;
	}
```

### 类声明

注意，如果要让虚幻引擎能够识别并开始编译着色器，你需要声明C++类。本示例使用顶点着色器作为该类：

MyTestVS.h

```cpp
	#include "GlobalShader.h"

	// 这段代码可以在头文件或cpp文件中声明
	class FMyTestVS : public FGlobalShader
	{
		DECLARE_EXPORTED_SHADER_TYPE(FMyTestVS, Global, /*MYMODULE_API*/);

		FMyTestVS() { }
		FMyTestVS(const ShaderMetaType::CompiledShaderInitializerType& Initializer)
			: FGlobalShader(Initializer)
		{
		}

		static bool ShouldCache(EShaderPlatform Platform)
		{
			return true;
		}
	};
```

进行此操作时，有一些要求：

-   这是 `FGlobalShader` 的子类。这样一来，着色器最终会出现在全局着色器贴图中，这意味着无需材质即可找到着色器。
-   需要使用 `DECLARE_EXPORTED_SHADER_TYPE()` 宏，它会生成着色器类型在序列化时所需的导出内容。第三个参数是着色器模块所在代码模块的外部链接类型（如需要）。例如，任何不存在于渲染器模块中的C++代码。
-   有两个构造函数：默认构造函数和序列化构造函数。
-   需要使用 `ShouldCache()` 函数，以便确定在某些情况下是否应编译此着色器。例如，你可能不想在支持RHI的非计算着色器上编译计算着色器。

### 注册着色器类型

**着色器类型（Shader Type）** 是由着色器代码指定的模板或类，映射到物理C++类。你可使用以下代码将着色器类型注册到虚幻引擎的类型列表中：

```cpp
	// 此操作需在cpp文件上进行
	IMPLEMENT_SHADER_TYPE(, FMyTestVS, TEXT("MyTest"), TEXT("MainVS"), SF_Vertex);

```

该宏将类型（`FMyTestVS`）映射到.usf文件（`MyTest.usf`）、着色器入口（`MainVS`）和频率/着色阶段（`SF_Vertex`）。只要 `ShouldCache()` 方法返回 *true*，它也会导致着色器添加到编译列表中。

`FGlobalShader` 的目标添加模块 *必须* 在引擎启动之前加载，否则将获得断言，例如：

```cpp
	> `着色器类型在引擎启动后加载。请对模块使用 `ELoadingPhase::PostConfigInit` 使其提前加载。`

```

启动游戏或编辑器后，不允许动态模块添加自己的着色器类型。

### 声明像素着色器

接下来，使用以下代码声明像素着色器：

```cpp
	class FMyTestPS : public FGlobalShader
	{
		DECLARE_EXPORTED_SHADER_TYPE(FMyTestPS, Global, /*MYMODULE_API*/);

		FShaderParameter MyColorParameter;

		FMyTestPS() { }
		FMyTestPS(const ShaderMetaType::CompiledShaderInitializerType& Initializer)
			: FGlobalShader(Initializer)
		{
			MyColorParameter.Bind(Initializer.ParameterMap, TEXT("MyColor"), SPF_Mandatory);
		}

		static void ModifyCompilationEnvironment(EShaderPlatform Platform, FShaderCompilerEnvironment& OutEnvironment)
		{
			FGlobalShader::ModifyCompilationEnvironment(Platform, OutEnvironment);
			// 添加自己的着色器代码定义
			OutEnvironment.SetDefine(TEXT("MY_DEFINE"), 1);
		}

		static bool ShouldCache(EShaderPlatform Platform)
		{
			// 例如，可跳过 "Platform == SP_METAL" 的编译
			return true;
		}

		// Fshader 接口。
		virtual bool Serialize(FArchive& Ar) override
		{
			bool bShaderHasOutdatedParameters = FGlobalShader::Serialize(Ar);
			Ar << MyColorParameter;
			return bShaderHasOutdatedParameters;
		}

		void SetColor(FRHICommandList& RHICmdList, const FLinearColor& Color)
		{
			SetShaderValue(RHICmdList, GetPixelShader(), MyColorParameter, Color);
		}
	};

	// 源文件与此前相同，但入口不同
	IMPLEMENT_SHADER_TYPE(, FMyTestPS, TEXT("MyTest"), TEXT("MainPS"), SF_Pixel);

```

在此类中，公开.usf文件中的着色器参数 **MyColor**：

-   `FShaderParameter MyColorParameter` 成员添加到该类中，该类保存用于运行时能够找到绑定的信息。这反过来又允许在运行时设置参数值。
-   在序列化构造函数中，`Bind()` 函数按名称将参数绑定到 `ParameterMap`。这 *必须* 匹配.usf文件的名称。
-   当同一C++类为不同的行为定义并能够在着色器中设置#define值时，使用 `ModifyCompilationEnvironment()` 函数。
-   `Serialize()` 方法为 *必选项*。这是运行时加载和存储着色器绑定（在序列化构造函数期间匹配）的编译和烘焙时间信息的位置。
-   最后，自定义 `SetColor()` 方法展示了如何在运行时使用指定值设置 `MyColor` 参数。

### 编写简单函数

以下代码编写了一个简单函数，该函数可使用指定的着色器类型绘制全屏四边形：

```cpp
	void RenderMyTest(FRHICommandList& RHICmdList, ERHIFeatureLevel::Type FeatureLevel, const FLinearColor& Color)
	{
		// 获取全局着色器集合
		auto ShaderMap = GetGlobalShaderMap(FeatureLevel);

		// 从ShaderMap获取实际的着色器实例
		TShaderMapRef MyVS(ShaderMap);
		TShaderMapRef MyPS(ShaderMap);

		// 使用这些着色器声明绑定着色器状态，并将其应用到命令列表
		static FGlobalBoundShaderState MyTestBoundShaderState;
		SetGlobalBoundShaderState(RHICmdList, FeatureLevel, MyTestBoundShaderState, GetVertexDeclarationFVector4(), *MyVS, *MyPS);

		// 调用函数以设置参数
		MyPS->SetColor(RHICmdList, Color);

		// 预先设置GPU，以绘制实体四边形
		RHICmdList.SetRasterizerState(TStaticRasterizerState::GetRHI());
		RHICmdList.SetBlendState(TStaticBlendState<>::GetRHI());
		RHICmdList.SetDepthStencilState(TStaticDepthStencilState::GetRHI(), 0);

		// 设置顶点
		FVector4 Vertices[4];
		Vertices[0].Set(-1.0f, 1.0f, 0, 1.0f);
		Vertices[1].Set(1.0f, 1.0f, 0, 1.0f);
		Vertices[2].Set(-1.0f, -1.0f, 0, 1.0f);
		Vertices[3].Set(1.0f, -1.0f, 0, 1.0f);

		// 绘制四边形
		DrawPrimitiveUP(RHICmdList, PT_TriangleStrip, 2, Vertices, sizeof(Vertices[0]));
	}

```

清除可在运行时切换的控制台变量，从而在代码库中对此进行测试。使用以下代码执行此操作：

```cpp
	static TAutoConsoleVariable CVarMyTest(
		TEXT("r.MyTest"),
		0,
		TEXT("Test My Global Shader, set it to 0 to disable, or to 1, 2 or 3 for fun!"),
		ECVF_RenderThreadSafe
	);

	void FDeferredShadingSceneRenderer::RenderFinish(FRHICommandListImmediate& RHICmdList)
	{
		[...]
		// ***
		// 在即将完成渲染之前插入代码，因此我们可覆盖屏幕内容！
		int32 MyTestValue = CVarMyTest.GetValueOnAnyThread();
		if (MyTestValue != 0)
		{
			FLinearColor Color(MyTestValue == 1, MyTestValue == 2, MyTestValue == 3, 1);
			RenderMyTest(RHICmdList, FeatureLevel, Color);
		}
		// 终止插入代码
		// ***
		FSceneRenderer::RenderFinish(RHICmdList);
		[...]
	}

```

运行项目并使用波浪号（~）键打开控制台窗口，测试刚刚添加的控制台变量的功能。然后输入以下任一命令以设置变量：

-   输入 **r.MyTest** 并且把数值设置为1、2、3，更改颜色。
-   输入 **r.MyTest 0** 禁用着色器通道。

## 其他说明

-   如需调试.usf文件的编译信息和/或查看已处理的文件，请参见[调试着色器编译过程](/documentation/zh-cn/unreal-engine/debugging-the-shader-compile-process-in-unreal-engine)。
-   你可以在运行未烘焙的游戏或编辑器时修改.usf文件，以便快速迭代。请使用键盘快捷键 **Ctrl + Shift + .**（句号），或打开控制台窗口并输入命令 **recompileshaders changed**，以便选择并重新编译着色器。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [虚幻着色器文件](/documentation/zh-cn/unreal-engine/adding-global-shaders-to-unreal-engine#%E8%99%9A%E5%B9%BB%E7%9D%80%E8%89%B2%E5%99%A8%E6%96%87%E4%BB%B6)
-   [全局着色器示例](/documentation/zh-cn/unreal-engine/adding-global-shaders-to-unreal-engine#%E5%85%A8%E5%B1%80%E7%9D%80%E8%89%B2%E5%99%A8%E7%A4%BA%E4%BE%8B)
-   [创建和添加新着色器](/documentation/zh-cn/unreal-engine/adding-global-shaders-to-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%9D%80%E8%89%B2%E5%99%A8)
-   [类声明](/documentation/zh-cn/unreal-engine/adding-global-shaders-to-unreal-engine#%E7%B1%BB%E5%A3%B0%E6%98%8E)
-   [注册着色器类型](/documentation/zh-cn/unreal-engine/adding-global-shaders-to-unreal-engine#%E6%B3%A8%E5%86%8C%E7%9D%80%E8%89%B2%E5%99%A8%E7%B1%BB%E5%9E%8B)
-   [声明像素着色器](/documentation/zh-cn/unreal-engine/adding-global-shaders-to-unreal-engine#%E5%A3%B0%E6%98%8E%E5%83%8F%E7%B4%A0%E7%9D%80%E8%89%B2%E5%99%A8)
-   [编写简单函数](/documentation/zh-cn/unreal-engine/adding-global-shaders-to-unreal-engine#%E7%BC%96%E5%86%99%E7%AE%80%E5%8D%95%E5%87%BD%E6%95%B0)
-   [其他说明](/documentation/zh-cn/unreal-engine/adding-global-shaders-to-unreal-engine#%E5%85%B6%E4%BB%96%E8%AF%B4%E6%98%8E)
# 虚幻引擎插件中的 Shader | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/overview-of-shaders-in-plugins-unreal-engine
> 
> 生成时间: 2025-06-14T19:24:58.034Z

---

目录

![插件中的 Shader](https://dev.epicgames.com/community/api/documentation/image/30303c81-c93c-476a-ba2f-fdafaf5343cc?resizing_type=fill&width=1920&height=335)

敬请注意，此文档 **并非** 编写 HLSL 代码或 GPU 低开销着色器的指南，仅仅是为用户展示如何通过插件（Plugin）系统创建新着色器。

在现版本中，用户可通过插件系统添加新着色器在虚幻引擎 使用。通过插件系统创建着色器后，可简单快捷地与其他用户共享创建的内容。以下文档将讲述如何在 Unreal Engine 中使用插件系统创建着色器。

如需更多帮助，可直接查看 **//Engine/Plugins/Compositing/LensDistortion's** 下的插件。

## 插件创建要点

创建新插件时，您需要注意以下事项：

-   使用插件精灵迅速创建插件所需的全部文件和文件夹。
    
-   此时已无法通过插件系统对材质编辑器进行较大的修改（如添加新的着色器模型）。
    
-   在要求的路径中添加所有文件和文件夹，然后生成 Visual Studio 解决方案文件。
    
-   在 ProjectName.uplugin 中，以下例为参考将模块的 LoadingPhase 设为 PostConfigInit（只针对将拥有着色器实现的模块）：
    
    ```cpp
              {
                  "FileVersion" :3,
                  "Version" :1,
                  "VersionName" :"1.0",
                  "FriendlyName" :"Foo",
                  "Description" :"Plugin to play around with shaders.",
                  "Category" :"Sandbox",
                  "CreatedBy" :"Epic Games, Inc.",
                  "CreatedByURL" :"http://epicgames.com",
                  "DocsURL" :"",
                  "MarketplaceURL" :"",
                  "SupportURL" :"",
                  "EnabledByDefault" : false,
                  "CanContainContent" : true,
                  "IsBetaVersion" : false,
                  "Installed" : false,
                  "Modules" :
                  [
                      {
                          "Name" :"Foo",
                          "Type" :"Developer",
                          "LoadingPhase" :"PostConfigInit"
                      }
                  ]
              }
    		
    ```
    

## 渲染线程

与游戏侧的 API 不同，RHI 渲染命令由专属线程进行排列：渲染线程。渲染线程从属于游戏线程，因为之后排列的 FIFO（首进首出）命令是通过 ENQUEUE\_RENDER\_COMMAND 命令执行之前的命令。渲染线程可在游戏线程的 0 帧或 1 帧之后。出于 CPU 性能的考虑，生产运行时必须全力避免这两者之间的同步。为确保插件的 C++ 函数由正确的线程所调用，用户可添加多个断言改善线程的稳健性，如 check (IsInGameThread()); 或 check (IsInRenderingThread());。

## 虚幻着色器文件

开发 Unreal Engine 中使用的新着色器时，需要注意两个不同的着色器文件类型。如下所示，每个文件的用途均不相同：

-   **虚幻着色器标头（.USH）**
    -   只由其他 USH 或 USF 文件所包含
-   **虚幻着色器格式（.USF）**
    
    -   只应为私有数据
        
        -   在私有目录中不保证反向兼容性
    -   应包含着色器进入点
        

## 着色器文件预处理和虚拟文件路径

基于 HLSL 语言的 USF 着色器文件是包含多平台着色器代码的虚幻引擎着色器文件格式。为实现多平台支持，引擎的着色器编译器已在平台特有的着色器编译器（如进行 GLSL 交叉编译的 FXC、HLSLCC 等）之前额外添加了一个平台独立的源文件预处理通道。因此，在最初的预处理之前所有的 #define 和 #if 将被解析。每个平台也内置有 #define 文件，以了解目标平台的着色器预处理，例如 VULKAN\_PROFILE。

与 C/C++ 文件相同，可通过 #include "HelloWorld.usf," 将 usf 文件包含，这会将命名为 HelloWorld.usf 的文件保存在写入了 #include 的 USF 文件所在的相同目录中。为避免多次包含相同文件，可在预处理指令位于文件顶部时添加 #pragma。例如：

-   FooCommon.usf
    
    ```cpp
              // 在所有插件的着色器之间共享的文件
              #pragma once
    		
              #include "/Engine/Public/Platform.ush"
    		
              // ...
    		
    ```
    
-   FooBar.usf
    
    ```cpp
              // 包含与 foobar 相关全部函数和结构体的文件
              #pragma once
    		
              #include "FooCommon.usf"
    		
              // ...
    		
    ```
    
-   FooBarComputeShader.usf
    
    ```cpp
              // 在 GPU 上执行 foobar 的计算着色器
    		
              #include "FooCommon.usf"
              #include "FooBar.usf"
    		
              // ...
    ```
    

用于也可从插件或项目模块的着色器执行此操作来包含 USF 文件，操作方法如下：

-   在引擎中加入 #include `/Engine/<FilePath>`，其中 `<FilePath>` 是相对于 `//Engine/Shaders/` 目录的文件路径；
    
-   或在另一个插件中加入 #include `/Plugin/<PluginName>/<PluginFilePath>`，`<PluginName>` 是 **已激活** 插件的命名，`<PluginFilePath>` 是相对于插件 `Shaders/` 目录的文件路径。开发者需要在 .uplugin 文件中为正确的插件添加依赖性。
    

## 首个全局着色器

全局着色器以以下方式继承自 FGlobalShader：

```cpp
	class FLensDistortionUVGenerationShader : public FGlobalShader
	{
	public:
		// 此函数决定着色器是否应该针对给定平台进行编译。
		// 因此，着色器在缺少 SM4 支持的情况下无法使用。
		static bool ShouldCache(EShaderPlatform Platform)
		{
			return IsFeatureLevelSupported(Platform, ERHIFeatureLevel::SM4);
		}

		// 着色器的编译时常量可在此函数中进行定义：
		static void ModifyCompilationEnvironment(EShaderPlatform Platform, FShaderCompilerEnvironment& OutEnvironment)
		{
			FGlobalShader::ModifyCompilationEnvironment(Platform, OutEnvironment);
			OutEnvironment.SetDefine(TEXT("GRID_SUBDIVISION_X"), kGridSubdivisionX);
			OutEnvironment.SetDefine(TEXT("GRID_SUBDIVISION_Y"), kGridSubdivisionY);
		}

		// 默认构造函数。
		FLensDistortionUVGenerationShader() {}

		// 使用初始化对象的构造函数我们将在此处绑定参数，使 C++ 代码
		// 能与 USF 进行交互，使用户能从代码设置着色器参数。
		FLensDistortionUVGenerationShader(const ShaderMetaType::CompiledShaderInitializerType& Initializer)
			:FGlobalShader(Initializer)
		{
			PixelUVSize.Bind(Initializer.ParameterMap, TEXT("PixelUVSize"));
			RadialDistortionCoefs.Bind(Initializer.ParameterMap, TEXT("RadialDistortionCoefs"));
			TangentialDistortionCoefs.Bind(Initializer.ParameterMap, TEXT("TangentialDistortionCoefs"));
			DistortedCameraMatrix.Bind(Initializer.ParameterMap, TEXT("DistortedCameraMatrix"));
			UndistortedCameraMatrix.Bind(Initializer.ParameterMap, TEXT("UndistortedCameraMatrix"));
			OutputMultiplyAndAdd.Bind(Initializer.ParameterMap, TEXT("OutputMultiplyAndAdd"));
		}

		// 必须在此处对全部成员进行序列化。此函数在加载和保存时运行，并用于
		// 将着色器放入 DDC 和 pak 文件。
		virtual bool Serialize(FArchive& Ar) override
		{
			bool bShaderHasOutdatedParameters = FGlobalShader::Serialize(Ar);
			Ar << PixelUVSize << RadialDistortionCoefs << TangentialDistortionCoefs << DistortedCameraMatrix << UndistortedCameraMatrix << OutputMultiplyAndAdd;
			return bShaderHasOutdatedParameters;
		}

		// 此函数是一个范例，说明如何基于
		// 特定于着色器的数据预计算着色器参数。因此，着色器需要数个可从几个参数进行计算的
		// 矩阵，而这在着色器自身中进行计算则效率不高。注意
		// 此函数并非为覆盖，它针对该类而定制，并在
		// 此功能的特定实现需要时进行调用。
		template<typename TShaderRHIParamRef>
		void SetParameters(
			FRHICommandListImmediate& RHICmdList,
			const TShaderRHIParamRef ShaderRHI,
			const FCompiledCameraModel& CompiledCameraModel,
			const FIntPoint& DisplacementMapResolution)
		{
			FVector2D PixelUVSizeValue(
				1.f / float(DisplacementMapResolution.X), 1.f / float(DisplacementMapResolution.Y));
			FVector RadialDistortionCoefsValue(
				CompiledCameraModel.OriginalCameraModel.K1,
				CompiledCameraModel.OriginalCameraModel.K2,
				CompiledCameraModel.OriginalCameraModel.K3);
			FVector2D TangentialDistortionCoefsValue(
				CompiledCameraModel.OriginalCameraModel.P1,
				CompiledCameraModel.OriginalCameraModel.P2);

			SetShaderValue(RHICmdList, ShaderRHI, PixelUVSize, PixelUVSizeValue);
			SetShaderValue(RHICmdList, ShaderRHI, DistortedCameraMatrix, CompiledCameraModel.DistortedCameraMatrix);
			SetShaderValue(RHICmdList, ShaderRHI, UndistortedCameraMatrix, CompiledCameraModel.UndistortedCameraMatrix);
			SetShaderValue(RHICmdList, ShaderRHI, RadialDistortionCoefs, RadialDistortionCoefsValue);
			SetShaderValue(RHICmdList, ShaderRHI, TangentialDistortionCoefs, TangentialDistortionCoefsValue);
			SetShaderValue(RHICmdList, ShaderRHI, OutputMultiplyAndAdd, CompiledCameraModel.OutputMultiplyAndAdd);
		}

	private:
		// 着色器参数。
		FShaderParameter PixelUVSize;
		FShaderParameter RadialDistortionCoefs;
		FShaderParameter TangentialDistortionCoefs;
		FShaderParameter DistortedCameraMatrix;
		FShaderParameter UndistortedCameraMatrix;
		FShaderParameter OutputMultiplyAndAdd;
	};

	// 此宏将把着色器公开到引擎。注意绝对的虚拟源文件路径。
	IMPLEMENT_SHADER_TYPE(, FLensDistortionUVGenerationVS, TEXT("/Plugin/LensDistortion/Private/UVGeneration.usf"), TEXT("MainVS"), SF_Vertex)
```

### Engine/Public/Platform.usf

要在所有 Unreal Engine 平台上完成着色器编译，需要将 /Engine/Public/Platform.usf（直接或间接）纳入到所有的着色器文件中。

## 着色器开发要点

可使用 ConsoleVariables.ini 进行本地自定义，修改渲染器中的部分设置，以加速编写着色器时的迭代进程。例如以下控制台变量将帮助您获得着色器所执行操作的详细调试信息：

-   **r.ShaderDevelopmentMode = 1** 获取着色器编译的详细目录，以及出现错误时重试的机会。
    
-   **r.DumpShaderDebugInfo = 1** 将预处理着色器转存到 Saved 文件夹中。
    
    警告：将此开启一段时间后硬盘上将出现很多小文件和文件夹，因此完成后必须将其禁用。
    

## 故障排除

如着色器无法编译或在 Unreal Engine 编辑器中显示，请尝试以下操作：

-   如出现错误 **Can't compile:**`/Plugin/<MyPluginName>/<MyFile>` **not found.**

请确保插件模块的 LoadingPhase 设为 PostConfigInit，且插件的着色器目录名中没有输入错误。

-   如出现错误 **Can't #include** `"/Plugin/<ParentPluginName>/<MyFile>":`

请确保检查父插件是否已启动，还需要检查插件依赖性，因为此错误代表 .uplugin 或 .uproject 文件中缺少插件依赖性。

## 现有渲染器规则

渲染器中通常有着色器类和着色器进入点的命名规则，尤其是下表中显示的着色器域后缀。

着色器域

后缀

**顶点着色器**

VS

**凸包着色器**

HS

**域着色器**

DS

**几何体着色器**

GS

**像素着色器**

PS

**计算着色器**

CS

举例而言，在 C++ 文件中对 **FLensDistortionUVGenerationVS** 的调用中以 VS 结尾，则说明这是一个顶点着色器。在 USF 文件中 **void MainVS(...)** 以 VS 结尾，说明其将使用顶点着色器。在 HLSL 中处理结构体时，结构体命名应以 **F** 开头，如 FBasePassInterpolators。

如需了解 Unreal Engine 中更多关于代码标准的内容，请查阅 [Unreal Engine 代码标准文档](/documentation/zh-cn/unreal-engine/epic-cplusplus-coding-standard-for-unreal-engine)。

## 附加链接

以下链接包含在 Unreal Engine 中进行全局着色器开发的更多内容。

-   [FGlobalShader 基类](/documentation/en-us/unreal-engine/API/Runtime/RenderCore/FGlobalShader)
-   [调试着色器编译进程](https://www.unrealengine.com/en-US/blog/debugging-the-shader-compiling-process)
-   [为 Unreal Engine 添加全局着色器](https://rcaloca.blogspot.com/2017/05/adding-global-shaders-to-ue4.html)

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [插件创建要点](/documentation/zh-cn/unreal-engine/overview-of-shaders-in-plugins-unreal-engine#%E6%8F%92%E4%BB%B6%E5%88%9B%E5%BB%BA%E8%A6%81%E7%82%B9)
-   [渲染线程](/documentation/zh-cn/unreal-engine/overview-of-shaders-in-plugins-unreal-engine#%E6%B8%B2%E6%9F%93%E7%BA%BF%E7%A8%8B)
-   [虚幻着色器文件](/documentation/zh-cn/unreal-engine/overview-of-shaders-in-plugins-unreal-engine#%E8%99%9A%E5%B9%BB%E7%9D%80%E8%89%B2%E5%99%A8%E6%96%87%E4%BB%B6)
-   [着色器文件预处理和虚拟文件路径](/documentation/zh-cn/unreal-engine/overview-of-shaders-in-plugins-unreal-engine#%E7%9D%80%E8%89%B2%E5%99%A8%E6%96%87%E4%BB%B6%E9%A2%84%E5%A4%84%E7%90%86%E5%92%8C%E8%99%9A%E6%8B%9F%E6%96%87%E4%BB%B6%E8%B7%AF%E5%BE%84)
-   [首个全局着色器](/documentation/zh-cn/unreal-engine/overview-of-shaders-in-plugins-unreal-engine#%E9%A6%96%E4%B8%AA%E5%85%A8%E5%B1%80%E7%9D%80%E8%89%B2%E5%99%A8)
-   [Engine/Public/Platform.usf](/documentation/zh-cn/unreal-engine/overview-of-shaders-in-plugins-unreal-engine#engine/public/platformusf)
-   [着色器开发要点](/documentation/zh-cn/unreal-engine/overview-of-shaders-in-plugins-unreal-engine#%E7%9D%80%E8%89%B2%E5%99%A8%E5%BC%80%E5%8F%91%E8%A6%81%E7%82%B9)
-   [故障排除](/documentation/zh-cn/unreal-engine/overview-of-shaders-in-plugins-unreal-engine#%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4)
-   [现有渲染器规则](/documentation/zh-cn/unreal-engine/overview-of-shaders-in-plugins-unreal-engine#%E7%8E%B0%E6%9C%89%E6%B8%B2%E6%9F%93%E5%99%A8%E8%A7%84%E5%88%99)
-   [附加链接](/documentation/zh-cn/unreal-engine/overview-of-shaders-in-plugins-unreal-engine#%E9%99%84%E5%8A%A0%E9%93%BE%E6%8E%A5)
# 虚幻引擎调试着色器编译过程 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/debugging-the-shader-compile-process-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:24:30.719Z

---

目录

![调试着色器编译过程](https://dev.epicgames.com/community/api/documentation/image/243a56e9-cd6e-4771-8df8-b45b441c4f29?resizing_type=fill&width=1920&height=335)

在开发期间，你最好掌握虚幻引擎在向平台的着色器编译器发送什么内容。本页所包含的信息将使你能够调试与之相关的任何问题。

## 启用中间着色器的转储

若要开始对引擎安装进行调试，你需要在 `Engine/Config` 文件夹中找到 **ConsoleVariables.ini** 配置文件，然后在其中启用部分预定义控制台变量。在 **\[Startup\]** 分段下，会发现以下控制台变量列表，这些变量应如下所示：

```cpp
	[Startup]

	; 取消注释以获得有关着色器编译的详细日志以及发生错误后的重试机会
	r.ShaderDevelopmentMode=1
	; 取消注释以在保存文件夹中转储着色器
	; 警告：将此变量保持开启一段时间，会让硬盘充满许多小文件和文件夹
	r.DumpShaderDebugInfo=1
	; 启用此变量后，SCW崩溃将输出当前工作程序中的作业列表
	r.ShaderCompiler.DumpQueuedJobs=1
	; 启用此变量后，转储着色器时，将生成一个与ShaderCompilerWorker -direct模式一起使用的额外文件
	r.DumpShaderDebugWorkerCommandLine=1
	; 启用此变量后，着色器编译器的警告将在所有着色器加载时发送到日志中（从DDC或者着色器编译任务发送）。
	r.ShaderCompiler.EmitWarningsOnLoad=1
	; 为每个单独的编译作业保存的工作器输入文件。
	r.ShaderCompiler.DebugDumpWorkerInputs=true
```

删除每个控制台变量紧接的 **;**（分号）以启用其功能，从而使其如以上示例代码所示。

## 在调试模式下构建ShaderCompileWorker

默认情况下，[UnrealBuildTool](/documentation/zh-cn/unreal-engine/unreal-build-tool-in-unreal-engine) (UBT)为工具生成项目，它们始终在 **开发（Development）** 模式下进行编译。出于调试目的，你需要在 **调试（Debug）** 模式下构建引擎和项目，此模式包含用于调试项目代码的符号。

若要在调试模式下构建项目，请执行以下操作：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42c272a9-b6c3-48ae-bfbd-d410ec751141/buildconfiguration_scw.png)

1.  使用 **配置管理器（Configuration Manager）** 更改Visual Studio中的解决方案属性，你可从 **构建（Build）** 菜单打开此管理器。
2.  将 **ShaderCompileWorker** (SCW)下拉框设为 **Debug\_Program**。

有关此类目标的更多信息，请参见[构建配置参考](/documentation/zh-cn/unreal-engine/build-configurations-reference-for-unreal-engine)页面。

## 生成中间文件

若要调试着色器，你首先需要生成想要实际调试的文件。这需要启用用于转储中间着色器的控制台变量，从而允许后续编译转储生成的文件。

请参见[启用中间着色器的转储](/documentation/zh-cn/unreal-engine/debugging-the-shader-compile-process-in-unreal-engine#enablingdumpingofintermediateshaders)章节，以了解启用相关控制台变量的方式。

通过在 `Engine/Shaders` 文件夹中的 **Common.usf** 文件中添加一个空格或做一些无关紧要的更改，强制重新编译所有着色器。然后重新运行编辑器。此操作将触发所有着色器的重新编译，并将所有中间文件转储到项目的 `Saved/ShaderDebugInfo` 文件夹中。

如果你在调试某个材质，你可以进行任何更改，或者做一些无关紧要的更改，例如移动节点，以便触发更改。使用工具栏中的 **保存（Save）** 或 **应用（Apply）** 功能来保存或应用材质的更改，从而再次转储着色器文件。

## 转储着色器的文件夹结构

转储着色器所生成的文件夹路径包含了相关信息。让我们来看看转储着色器路径示例并分析其各个部分：

-   D:\\UE4\\Samples\\Games\\TappyChicken\\Saved\\ShaderDebugInfo\\PCD3D\_SM5\\M\_Egg\\LocalVF\\BPPSFNoLMPolicy\\BasePassPixelShader.usf

首先是项目的根路径。在本例中，它指向名为Tappy Chicken的项目。

-   **D:\\UE4\\Samples\\Games\\TappyChicken\\**

路径的下一个部分表示着色器转储后的保存路径。

-   D:\\UE4\\Samples\\Games\\TappyChicken\\ **Saved\\ShaderDebugInfo**\\

对于每个着色器格式和/或平台，路径都将创建一个子文件夹。此路径将为 *PC D3D着色器模型5* 创建一个子文件夹。

-   D:\\UE4\\Samples\\Games\\TappyChicken\\Saved\\ShaderDebugInfo\\ **PCD3D\_SM5**\\

每个材质都将有一个文件夹，且路径将创建一个名为 *Global* 的特殊文件夹。这里看到的调试着色器用于 **M\_Egg** 材质。

-   D:\\UE4\\Samples\\Games\\TappyChicken\\Saved\\ShaderDebugInfo\\PCD3D\_SM5\\ **M\_Egg**\\

着色器在按顶点工厂排序的贴图中进行分组，此类顶点工厂通常对应于网格体/组件类型。此路径指向 *LocalVF*，它表示 **本地顶点工厂（Local Vertex Factory）**。

-   D:\\UE4\\Samples\\Games\\TappyChicken\\Saved\\ShaderDebugInfo\\PCD3D\_SM5\\M\_Egg\\ **LocalVF**\\

路径的最后一个部分表示用于材质的各种功能集合。

-   D:\\UE4\\Samples\\Games\\TappyChicken\\Saved\\ShaderDebugInfo\\PCD3D\_SM5\\M\_Egg\\LocalVF\\ **BPPSFNoLMPolicy**\\

由于 **ConsoleVariables.ini** 文件中设置了控制台变量 **r.DumpShaderDebugShortNames=1**，因此名称已经过压缩，以便缩短文件长度。

例如，如果之前未启用此控制台变量，则路径将为：

-   D:\\UE4\\Samples\\Games\\TappyChicken\\Saved\\ShaderDebugInfo\\PCD3D\_SM5\\M\_Egg\\FLocalVertexFactory\\TBasePassPSFNoLightMapPolicy\\

着色器转储文件夹包含生成的批处理文件、文本文件和usf文件。

-   usf文件是转至平台编译器的最终着色器代码，编译器在预处理器之后运行。
-   批处理文件用于调用平台编译器以查看中间代码。
-   名为 **DirectCompile.txt** 的文本文件包含使用ShaderCompileWorker进行调试的命令行。
-   名为 **DebugCoompileArgs.txt** 的文本文件包含使用ShaderCompileWorker进行调试的命令行。

## 使用ShaderCompileWorker进行调试

ShaderCompileWorker可以使用以下命令行，以便调试对平台编译器的调用：

```cpp
	PathToGeneratedUsfFile -directcompile -format=ShaderFormat -ShaderType -entry=EntryPoint {plus platform specific switches}

```

-   *PathToGeneratedUsfFile* 是ShaderDebugInfo文件夹中的最终usf文件。
-   *ShaderFormat* 是你需要调试的着色器平台格式（在本例中为PCD3D\_SM5）。
-   *ShaderType* 可以是vs/ps/gs/hs/ds/cs，它们分别对应下列其中一种着色器类型：
    
    文件夹名称缩写
    
    着色器类型
    
    **vs**
    
    顶点着色器（Vertex Shader）
    
    **ps**
    
    像素着色器（Pixel Shader）
    
    **gs**
    
    几何体着色器（Geometry Shader）
    
    **hs**
    
    凸包着色器（Hull Shader）
    
    **ds**
    
    域着色器（Domain Shader）
    
    **cs**
    
    计算着色器（Computer Shader）
    
-   *EntryPoint* 是此着色器在usf文件中的进入点的函数名。

例如：

-   D:\\UE4\\Samples\\Games\\TappyChicken\\Saved\\ShaderDebugInfo\\PCD3D\_SM5\\M\_Egg\\LocalVF\\BPPSFNoLMPolicy\\BasePassPixelShader.usf **\-format**\=PCD3D\_SM5 **\-ps -entry**\=Main

如果你在 `D3D11ShaderCompiler.cpp` 上的 `CompileD3D11Shader()`函数中添加了断点，则请用此命令行运行SCW以开始了解引擎调用平台编译器的方式。

如果你在 **ConsoleVariables.ini** 文件中启用了控制台变量 **r.DumpShaderDebugWorkerCommandLine=1**，而此变量可在生成的usf文件旁转储名为 **DirectCompile.txt** 的文件，则你可直接复制此命令行。

## 使用ShaderCompileWorker对原始编译作业进行调试

在运行ShaderCompileWorker时将 **DebugCompileArgs.txt** 的内容作为命令行参数复制，将会重复运行与保存到**ShaderDebugInfo**文件夹时相同的编译作业。

例如，命令行可能如下所示：

```cpp
	C:/Users/john.doe/Documents/Unreal Projects/MyEpicProject/Saved/ShaderDebugInfo/PCD3D_SM5/M_EpicMaterial/Default/FLocalVertexFactory/TBasePassPSFNoLightMapPolicy/0" 0 "DebugSCW" DebugSCW.in DebugSCW.out -TimeToLive=0.0f -KeepInput
```

在以上示例中，`john.doe` 可以被你的计算机用户名替代，`MyEpicProject` 可以被你的项目命名文件夹取代。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用中间着色器的转储](/documentation/zh-cn/unreal-engine/debugging-the-shader-compile-process-in-unreal-engine#%E5%90%AF%E7%94%A8%E4%B8%AD%E9%97%B4%E7%9D%80%E8%89%B2%E5%99%A8%E7%9A%84%E8%BD%AC%E5%82%A8)
-   [在调试模式下构建ShaderCompileWorker](/documentation/zh-cn/unreal-engine/debugging-the-shader-compile-process-in-unreal-engine#%E5%9C%A8%E8%B0%83%E8%AF%95%E6%A8%A1%E5%BC%8F%E4%B8%8B%E6%9E%84%E5%BB%BAshadercompileworker)
-   [生成中间文件](/documentation/zh-cn/unreal-engine/debugging-the-shader-compile-process-in-unreal-engine#%E7%94%9F%E6%88%90%E4%B8%AD%E9%97%B4%E6%96%87%E4%BB%B6)
-   [转储着色器的文件夹结构](/documentation/zh-cn/unreal-engine/debugging-the-shader-compile-process-in-unreal-engine#%E8%BD%AC%E5%82%A8%E7%9D%80%E8%89%B2%E5%99%A8%E7%9A%84%E6%96%87%E4%BB%B6%E5%A4%B9%E7%BB%93%E6%9E%84)
-   [使用ShaderCompileWorker进行调试](/documentation/zh-cn/unreal-engine/debugging-the-shader-compile-process-in-unreal-engine#%E4%BD%BF%E7%94%A8shadercompileworker%E8%BF%9B%E8%A1%8C%E8%B0%83%E8%AF%95)
-   [使用ShaderCompileWorker对原始编译作业进行调试](/documentation/zh-cn/unreal-engine/debugging-the-shader-compile-process-in-unreal-engine#%E4%BD%BF%E7%94%A8shadercompileworker%E5%AF%B9%E5%8E%9F%E5%A7%8B%E7%BC%96%E8%AF%91%E4%BD%9C%E4%B8%9A%E8%BF%9B%E8%A1%8C%E8%B0%83%E8%AF%95)
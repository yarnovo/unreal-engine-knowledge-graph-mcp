# 虚幻引擎中的控制台变量和命令 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/console-variables-cplusplus-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:39:17.144Z

---

目录

![控制台变量和命令](https://dev.epicgames.com/community/api/documentation/image/6afd0360-0145-4a35-876e-13d503fdac12?resizing_type=fill&width=1920&height=335)

**控制台命令** 是一条被发送到引擎的字符串，通常由用户在游戏内的控制台中输入。而引擎能以某种方式辨识并进行回应。如控制台命令可以触发控制台/日志响应，修改变量内部状态等。**控制台变量** 可用于保存一些状态信息，可通过控制台进行修改或查看。游戏内控制台还支持自动完成和列举由 **控制台管理器** 注册的控制台命令和控制台变量。控制台管理器还提供注册表，以便你查看所有注册的控制台命令和控制台变量，及其作用。因此，你需要避免使用老旧的 `Exec` 接口，而是通过控制台管理器定义并注册控制台变量和控制台命令。

## 什么是控制台变量？

控制台变量是一种简单的数据类型变量（如 `float`、`int32`、`FString`）。其拥有引擎层面的状态。使用者可对其状态进行读取和写入。控制台变量由唯一名称定义，游戏内控制台会帮助使用者在控制台中输入命名时自动完成拼写。举例而言：

**用户控制台输入**

**控制台输出**

**描述**

`MyConsoleVar`

`MyConsoleVar = 0`

变量的当前状态将被打印到控制台中。

`MyConsoleVar 123`

`MyConsoleVar = 123 LastSetBy: Constructor`

变量的状态已改变，新状态将被打印到控制台中。

`MyConsoleVar ?`

`Possibly multi line help text.`

将控制台变量帮助文本打印到控制台中。

## 控制台变量和控制台命令参考

请参阅[控制台变量参考](/documentation/zh-cn/unreal-engine/unreal-engine-console-variables-reference)以查看可用的控制台变量列表。

请参阅[控制台命令参考](/documentation/zh-cn/unreal-engine/unreal-engine-console-commands-reference)以查看可用的控制台命令列表。

## 创建/注册控制台变量

引擎创建时需要尽早注册所有控制台变量。下列示例截取自引擎代码：

```cpp
	static TAutoConsoleVariable<int32> CVarRefractionQuality(
		TEXT("r.RefractionQuality"),
		2,
		TEXT("Defines the distortion/refraction quality, adjust for quality or performance.\n")
		TEXT("<=0: off (fastest)\n")
		TEXT("  1: low quality (not yet implemented)\n")
		TEXT("  2: normal quality (default)\n")
		TEXT("  3: high quality (e.g. color fringe, not yet implemented)"),
		ECVF_Scalability | ECVF_RenderThreadSafe
	);
```

我们在此处注册了一个类型为 `int32` 的控制台变量，命名为 `r.RefractionQuality`、默认值为 `2`，并包括一些多行帮助文本和一些标签。使用者在控制台变量名称后输入"?"即可显示帮助文本。可用的标签名称和描述（来自 `EConsoleVariableFlags` 列举类型）可以在 [`EConsoleVariableFlags` API参考页面](/documentation/en-us/unreal-engine/API/Runtime/Core/HAL/EConsoleVariableFlags)找到。

`EConsoleVariableFlags` 列举类型里还有其他条目，但所有其他标签仅限内部使用。

如有需要，也可以在函数中生成一个控制台变量：

```cpp
	IConsoleManager::Get().RegisterConsoleVariable(
		TEXT("r.RefractionQuality"),
		2,
		TEXT("Defines the distortion/refraction quality, adjust for quality or performance.\n")
		TEXT("<=0: off (fastest)\n")
		TEXT("  1: low quality (not yet implemented)\n")
		TEXT("  2: normal quality (default)\n")
		TEXT("  3: high quality (e.g. color fringe, not yet implemented)"),
		ECVF_Scalability | ECVF_RenderThreadSafe
	);
```

`IConsoleManager::Get()` 是全局访问点。可在此处注册控制台变量，或寻找现有的控制台变量。第一个参数是控制台变量的命名。 第二个参数是默认值。此常量的类型不同，创建的控制台变量类型也有所不同：整数、浮点或字符串（!FString）。 下个参数将定义控制台变量帮助文本。

也可以注册一个对现有变量的引用。这种方法方便快速但会绕过多项功能（如线程安全、回调、sink、cheat），因此不建议使用此方法。请参考下例：

```cpp
	FAutoConsoleVariableRef CVarVisualizeGPUSimulation(
		TEXT("FX.VisualizeGPUSimulation"),
		VisualizeGPUSimulation,
		TEXT("Visualize the current state of GPU simulation.\n")
		TEXT("0 = off\n")
		TEXT("1 = visualize particle state\n")
		TEXT("2 = visualize curve texture"),
		ECVF_Cheat
		);
```

其类型可由变量类型推断而出。

## 获取控制台变量的状态

获取以 **RegisterConsoleVariableRef** 创建的控制台变量的状态十分便利，使用其注册时使用的变量即可。举例而言：

```cpp
	// 只在未处于相同cpp文件中时需要
	extern TAutoConsoleVariable<int32> CVarRefractionQuality;

	// 获取游戏线程上的值
	int32 MyVar = CVarRefractionQuality.GetValueOnGameThread();
```

使用Getter函数（即!GetInt()、!GetFloat()、!GetString()）来确定控制台变量状态会导致实现速度稍慢（虚拟函数调用、可能的缓存丢失等）。 要获得最佳性能，应使用用于注册变量的相同类型。为获取变量的指针，可保存注册函数的返回参数或在需要变量之前调用 **FindConsoleVariable**。范例如下：

```cpp
	static const auto CVar = IConsoleManager::Get().FindConsoleVariable(TEXT("TonemapperType"));
	int32 Value = CVar->GetInt();
```

此处的静态将确保命名搜索（实现为地图）只在此代码首次调用时完成。 这是正确的，因为变量从不会移动，只会在引擎关闭时被销毁。

## 如何追踪控制台变量修改

如果希望在控制台变量变化时执行一些自定义代码，可在三个方法中进行选择。

通常最简单的方法即是最佳方法：可将旧状态保存在子系统中，并每帧检查其是否有所不同。可在此处自由控制其发生时间（如渲染线程或游戏线程、流送线程、tick或渲染前后）。检测到差异时复制控制台变量状态并自定义代码。范例如下：

```cpp
	void MyFunc()
	{
		int GBufferFormat = CVarGBufferFormat.GetValueOnRenderThread();

		if(CurrentGBufferFormat != GBufferFormat)
		{
			CurrentGBufferFormat = GBufferFormat;

			// 自定义代码
		}
	}
```

也可注册一个控制台变量sink。范例如下：

```cpp
	static void MySinkFunction()
	{
		bool bNewAtmosphere = CVarAtmosphereRender.GetValueOnGameThread() != 0;

		// 默认假定状态为true
		static bool GAtmosphere = true;

		if (GAtmosphere != bNewAtmosphere)
		{
			GAtmosphere = bNewAtmosphere;

			// 自定义代码
		}
	}

	FAutoConsoleVariableSink CMyVarSink(FConsoleCommandDelegate::CreateStatic(&MySinkFunction));
```

sink将在渲染前主线程上的一个指定点处调用。函数不会获取控制台变量命名/指针，因为这通常会导致错误行为。 如多个控制台变量（如r.SceneColorFormat、r.GBufferFormat）皆会触发修改，则最好在所有修改完成后调用代码，而非一个接一个调用。

最后一种方法是使用回调，建议尽量不使用。如不谨慎使用，可能会引起问题：

-   循环可能出现死锁（可以防止死锁出现，但使用哪个回调则不明确）。
-   回调可在 **!Set()** 被调用中的任意时间处返回。代码必须在所有情况下（在初始化中、在序列化中）均能使用。 可假定其固定处于主线程一侧。

不建议使用此方法，除非用上述其他方法已无法解决。

示例：

```cpp
	void OnChangeResQuality(IConsoleVariable* Var)
	{
		SetResQualityLevel(Var->GetInt());
	}

	CVarResQuality.AsVariable()
		->SetOnChangedCallback(FConsoleVariableDelegate::CreateStatic(&OnChangeResQuality));
```

## 控制台变量预期行为和风格

-   控制台输入应反映用户输入，并不一定反映系统的状态（例如部分平台可能不支持!MotionBlur 0/1）。变量状态不应由代码修改。否则变量不含用户指定的状态时用户会无端怀疑他们错误输入，又或者他们可能因其他变量的状态而无法对控制台变量进行修改。
-   请务必提供解释，说明变量的用途和恰当的值。
-   多数控制台变量仅适用于开发，因此建议尽早指定 `ECVF_Cheat` 标签。能够使用定义来编译出功能则更佳（如#if !(UE\_BUILD\_SHIPPING || UE\_BUILD\_TEST)）。
-   变量命名应尽量简短，描述性强，不应使用否定含义。（举例而言，较差的命名有!EnableMotionBlur、!MotionBlurDisable、MBlur、!HideMotionBlur）。使用大小写，使命名统一、易读（如!MotionBlur）。
-   为便于缩进，可假定为固定的宽度字体（非比例）输出。
-   在引擎初始化中注册变量十分重要，这样自动完成、!DumpConsoleCommands和!Help才能正常工作。

请阅读 `IConsoleManager.h` 了解这部分详情。

## 加载控制台变量

引擎启动时，可从文件 **Engine/Config/ConsoleVariables.ini** 加载控制台变量的状态。此位置预留给本地开发者，不应用于项目设置。 文件自身中有更多详情：

```cpp
    ; 利用此文件当前可在引擎启动时设置控制台变量（排序未定义）。
    ; 当前无其他文件覆盖此文件。
    ; 此文件应在源码管理数据库中（便于进行注释和了解在何处进行查找）
    ; 变量中不应含空格。
    ; 开发者可在本地对其进行修改，避免输入重复的控制台变量设置，
    ; 以节约时间。须将变量放在名为[Startup]的部分中。
    ; 之后可能会有多个命名部分被部分命名所引用。
    ; 这会实现平台或关卡特定的覆盖。
    ; 命名对比不区分大小写；如果变量不存在，其便会被略过。
    ;
    ; 文本内容范例：
    ;
    ; [Startup]
    ; FogDensity = 0.9
    ; ImageGrain = 0.5
    ; FreezeAtPosition = 2819.5520 416.2633 75.1500 65378 -25879 0

    [Startup]
```

可将设定放在 **Engine/Config/BasEngine.ini** 中。范例如下：

```cpp
	[SystemSettings]
	r.MyCvar = 2

	[SystemSettingsEditor]
	r.MyCvar = 3
```

设置也可来自 **Script/Engine.RendererSettings**。这些项目设置公开如下：

```cpp
	UPROPERTY(config, EditAnywhere, Category=Optimizations, meta=(
		ConsoleVariable="r.EarlyZPassMovable",DisplayName="Movables in early Z-pass",
		ToolTip="是否在早Z阶段渲染可移动对象。需要重新加载关卡！"))
		uint32 bEarlyZPassMovable:1;
```

这些设置可在编辑器UI中修改。项目设置不应与可延展性设置混合（避免出现优先级问题）。

其他设置可来自可延展性功能。查看 **Config/BaseScalability.ini** 或可延展性文档了解更多信息。

## 命令行

命令行允许设置控制台变量、调用控制台命令或exec命令。范例如下：

```cpp
	UE4Editor.exe GAMENAME -ExecCmds="r.BloomQuality 12,vis 21,Quit"
```

可在此处执行3个命令。注意：以此方式设置控制台变量需要省略掉ini文件中需要的"="。

## 优先级

控制台变量可从多个源处覆盖，如用户/编辑器/项目设置、命令行、consolevariables.ini等。 为能够重新指定部分设置（如可在编辑器UI中修改的项目设置）而保持指定的覆盖（如从命令行），我们加入了优先级。现在所有设置均能按任意排序来应用。

参见IConsoleManager.h：

```cpp
	//最低优先级（控制台变量创建后为默认）
	ECVF_SetByConstructor =			0x00000000,
	// 来自Scalability.ini
	ECVF_SetByScalability =			0x01000000,
	//（在游戏UI或来自文件）
	ECVF_SetByGameSetting =			0x02000000,
	// 项目设置
	ECVF_SetByProjectSetting =		0x03000000,
	// 逐设备设置
	ECVF_SetByDeviceProfile =		0x04000000,
	// 逐项目设置
	ECVF_SetBySystemSettingsIni =	0x05000000,
	// consolevariables.ini（针对多个项目）
	ECVF_SetByConsoleVariablesIni = 0x06000000,
	// 减法命令，如-VSync
	ECVF_SetByCommandline =			0x07000000,
	// 用处不大，就像是hack一样，也许找到正确的SetBy更好
	ECVF_SetByCode =				0x08000000,
	// 编辑器UI或游戏/编辑器中的控制台
	ECVF_SetByConsole =				0x09000000,
```

一些情况下可能会出现此日志：

```cpp
	Console variable 'r.MyVar' wasn't set (Priority SetByDeviceProfile < SetByCommandline)
```

这可能是正常情况（如命令行强制进行用户设置），也可能是因一些代码问题而造成。优先级也有所帮助，可以查看最后设置变量的是谁。获取控制台变量状态时即可获得此信息。范例如下：

```cpp
	> r.GBuffer

	r.GBuffer = "1"      LastSetBy: Constructor
```

## 取消注册控制台变量

用 **UnregisterConsoleVariable** 方法可移除控制台变量。至少从使用者角度而言是如此。 变量仍被保留（带未注册的标签），使指针访问数据时不会发生崩溃。如新变量以相同命名注册，旧变量将被恢复，并从新变量复制标签。这样DLL加载和卸载便能正常工作，变量状态也不会丢失。注意：这无法用于控制台变量引用。

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [什么是控制台变量？](/documentation/zh-cn/unreal-engine/console-variables-cplusplus-in-unreal-engine#%E4%BB%80%E4%B9%88%E6%98%AF%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F%EF%BC%9F)
-   [控制台变量和控制台命令参考](/documentation/zh-cn/unreal-engine/console-variables-cplusplus-in-unreal-engine#%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F%E5%92%8C%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%91%BD%E4%BB%A4%E5%8F%82%E8%80%83)
-   [创建/注册控制台变量](/documentation/zh-cn/unreal-engine/console-variables-cplusplus-in-unreal-engine#%E5%88%9B%E5%BB%BA/%E6%B3%A8%E5%86%8C%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F)
-   [获取控制台变量的状态](/documentation/zh-cn/unreal-engine/console-variables-cplusplus-in-unreal-engine#%E8%8E%B7%E5%8F%96%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F%E7%9A%84%E7%8A%B6%E6%80%81)
-   [如何追踪控制台变量修改](/documentation/zh-cn/unreal-engine/console-variables-cplusplus-in-unreal-engine#%E5%A6%82%E4%BD%95%E8%BF%BD%E8%B8%AA%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F%E4%BF%AE%E6%94%B9)
-   [控制台变量预期行为和风格](/documentation/zh-cn/unreal-engine/console-variables-cplusplus-in-unreal-engine#%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F%E9%A2%84%E6%9C%9F%E8%A1%8C%E4%B8%BA%E5%92%8C%E9%A3%8E%E6%A0%BC)
-   [加载控制台变量](/documentation/zh-cn/unreal-engine/console-variables-cplusplus-in-unreal-engine#%E5%8A%A0%E8%BD%BD%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F)
-   [命令行](/documentation/zh-cn/unreal-engine/console-variables-cplusplus-in-unreal-engine#%E5%91%BD%E4%BB%A4%E8%A1%8C)
-   [优先级](/documentation/zh-cn/unreal-engine/console-variables-cplusplus-in-unreal-engine#%E4%BC%98%E5%85%88%E7%BA%A7)
-   [取消注册控制台变量](/documentation/zh-cn/unreal-engine/console-variables-cplusplus-in-unreal-engine#%E5%8F%96%E6%B6%88%E6%B3%A8%E5%86%8C%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F)
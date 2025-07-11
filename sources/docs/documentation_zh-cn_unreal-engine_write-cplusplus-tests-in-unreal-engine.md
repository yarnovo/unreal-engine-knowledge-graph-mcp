# 在虚幻引擎中编写C++测试 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/write-cplusplus-tests-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:40:34.867Z

---

目录

![编写C++测试](https://dev.epicgames.com/community/api/documentation/image/0701c9b6-ee1f-4b9c-9918-0314fe768e87?resizing_type=fill&width=1920&height=335)

## 自动化测试

**自动化测试（Automation Testing）** 是自动化测试的最低级别，最适合对 **虚幻引擎** 的核心功能进行低级别测试。此系统存在于"UObject"生态系统之外，所以它对 **蓝图** 或引擎的 **反射系统** 不可见。这些测试是在代码中编译的，可以通过 **控制台命令行（Console Command Line）** 在 **编辑器** 中运行或者使用操作系统中的 **命令行参数** 运行。自动化测试可以分为两种类型：**简单型** 和 **复杂型**。这两种类型都是基于"FAutomationTestBase"而作为派生类实现。

### 创建新的自动化测试

自动化测试由宏声明，并通过覆盖来自"FAutomationTestBase"类的虚拟函数来实现。简单测试使用"IMPLEMENT\_SIMPLE\_AUTOMATION\_TEST"宏声明，而复杂测试需要"IMPLEMENT\_COMPLEX\_AUTOMATION\_TEST"宏。这两个宏具有相同的三个参数，顺序如下：

参数

说明

"TClass"

测试的所需类名称。宏将创建使用此名称的类，即"FPlaceholderTest"，你可在此类中实施测试。

"PrettyName"

一个指定了将在UI中显示的层级测试名称的字符串。例如，我们最低限度示例（如下所示）中的"TestGroup.TestSubgroup.Placeholder Test"。

`TFlags`

`EAutomationTestFlags` 值的组合，用于指定自动化测试要求和行为。有关详情，请参阅[`EAutomationTestFlags`](/documentation/en-us/unreal-engine/API/Runtime/Core/Misc/EAutomationTestFlags)。

一旦新的自动化测试类被两个宏之一声明，其功能便可实现。必须写入以下函数：

函数

参数

说明

"RunTest"

 

此函数执行实际的测试，返回"真（true）"表示测试通过，返回"假（false）"表示测试失败。

 

"Parameters"

此参数可以被解析或者传递给其他适用于特定功能测试的函数。

\--

 

 

"GetTests"

 

仅对于复杂测试，才必须覆盖此函数；简单测试的声明宏中内置了此函数的自动生成版本。

 

"OutBeautifiedNames"

此字符串数组必须填充每个测试的UI可见的"PrettyName"。

 

"OutTestCommands"

此字符串数组应该与"OutBeautifiedNames"并行，并且必须填充要传递到"RunTest"中的"Parameters"。

#### 源文件位置

当前的惯例是将所有自动化测试放置到相关模块的"Private\\Tests"目录中。当自动化测试与特定的类一对一匹配时，请将测试文件命名为"\[ClassFilename\]Test.cpp"。例如，只适用于"FText"的测试将写入到"TextTest.cpp"中。

#### 最低限度示例

最低限度和最简单的测试可能是会自动成功（或失败）的简单测试。在构建更有意义的测试之前，构建这样的测试可以起到确保测试设置正确的第一步之作用。

```cpp
	IMPLEMENT_SIMPLE_AUTOMATION_TEST(FPlaceholderTest, "TestGroup.TestSubgroup.Placeholder Test", EAutomationTestFlags::EditorContext | EAutomationTestFlags::EngineFilter)

	bool FPlaceholderTest::RunTest(const FString& Parameters)
	{
		// 通过返回"真（true）"使测试通过，或者返回"假（false）"使测试失败。
		return true;
	}
```

### 简单测试

**简单测试** 用于描述单个原子测试，而且也可以用作单元测试或特性测试。例如，可以使用简单测试来测试当前地图是否在在编辑器中运行（Play in Editor）中加载，或者文本换行是否在Slate中正常工作。以下示例测试了"SetRes"命令的功能：

```cpp
	IMPLEMENT_SIMPLE_AUTOMATION_TEST( FSetResTest, "Windows.SetResolution", ATF_Game )

	bool FSetResTest::RunTest(const FString& Parameters)
	{
		FString MapName = TEXT("AutomationTest");
		FEngineAutomationTestUtilities::LoadMap(MapName);

		int32 ResX = GSystemSettings.ResX;
		int32 ResY = GSystemSettings.ResY;
		FString RestoreResolutionString = FString::Printf(TEXT("setres %dx%d"), ResX, ResY);

		ADD_LATENT_AUTOMATION_COMMAND(FEngineWaitLatentCommand(2.0f));
		ADD_LATENT_AUTOMATION_COMMAND(FExecStringLatentCommand(TEXT("setres 640x480")));
		ADD_LATENT_AUTOMATION_COMMAND(FEngineWaitLatentCommand(2.0f));
		ADD_LATENT_AUTOMATION_COMMAND(FExecStringLatentCommand(RestoreResolutionString));

		return true;
	}
```

### 复杂测试

**复杂测试** 用于在许多输入上运行相同的代码。这些测试通常是内容压力测试。例如，加载所有地图或编译所有蓝图将非常适合复杂的自动化测试。注意，必须覆盖"RunTest"和"GetTests"函数。以下示例测试了加载所有项目地图：

```cpp
	IMPLEMENT_COMPLEX_AUTOMATION_TEST(FLoadAllMapsInGameTest, "Maps.LoadAllInGame", ATF_Game)

	void FLoadAllMapsInGameTest::GetTests(TArray<FString>& OutBeautifiedNames, TArray <FString>& OutTestCommands) const
	{
		FEngineAutomationTestUtilities Utils;
		TArray<FString> FileList;
		FileList = GPackageFileCache->GetPackageFileList();

		// 迭代所有文件，并添加带有地图扩展名的文件。
		for( int32 FileIndex=0; FileIndex< FileList.Num(); FileIndex++ )
		{
			const FString& Filename = FileList[FileIndex];

			// Disregard filenames that don't have the map extension if we're in MAPSONLY mode.
			if ( FPaths::GetExtension(Filename, true) == FPackageName::GetMapPackageExtension() )
			{
				if (!Utils.ShouldExcludeDueToPath(Filename))
				{
					OutBeautifiedNames.Add(FPaths::GetBaseFilename(Filename));
					OutTestCommands.Add(Filename);
				}
			}
		}
	}

	bool FLoadAllMapsInGameTest::RunTest(const FString& Parameters)
	{
		FString MapName = Parameters;

		FEngineAutomationTestUtilities::LoadMap(MapName);
		ADD_LATENT_AUTOMATION_COMMAND(FEnqueuePerformanceCaptureCommands());

		return true;
	}
```

"Parameters"参数可以按照特定测试情况所需的任何方式构建和解析。对于复杂测试，这是使用相同代码测试多个数据点的预期方法。

### 潜在命令

在"RunTest"期间，系统可以对 **潜在命令** 进行排队，从而使代码的某些部分跨多个帧运行。若要创建一个潜在操作，则必须通过"DEFINE\_LATENT\_AUTOMATION\_COMMAND"宏来定义它。此宏接受一个名为"CommandName"的参数，该参数定义将为此类潜在命令创建的类名。若要完成潜在命令的创建，新类的"Update"函数将需要一个函数体。以下是一个简单的潜在命令示例，该命令将运行直至 **单元测试管理器（Unit Test Manager）** 完成运行测试：

```cpp
	DEFINE_LATENT_AUTOMATION_COMMAND(FNUTWaitForUnitTests);

	bool FNUTWaitForUnitTests::Update()
	{
		return GUnitTestManager == NULL || !GUnitTestManager->IsRunningUnitTests();
	}
```

如果你希望创建的潜在命令需要参数，例如需要一个参数字符串，则可以使用"DEFINE\_LATENT\_AUTOMATION\_COMMAND"宏。这个宏接受两个额外的参数，名为"ParamType"和"ParamName"，它们定义要传入的参数的类型和名称。在本例中，我们使用一个潜在命令开始连接到源码管理提供方，然后等待，直至连接尝试完成：

```cpp
	DEFINE_LATENT_AUTOMATION_COMMAND_ONE_PARAMETER(FConnectLatentCommand, SourceControlAutomationCommon::FAsyncCommandHelper, AsyncHelper);

	bool FConnectLatentCommand::Update()
	{
		// 尝试登录并等待结果。
		if(!AsyncHelper.IsDispatched())
		{
			if(ISourceControlModule::Get().GetProvider().Login( FString(), EConcurrency::Asynchronous, FSourceControlOperationComplete::CreateRaw( &AsyncHelper, &SourceControlAutomationCommon::FAsyncCommandHelper::SourceControlOperationComplete ) ) != ECommandResult::Succeeded)
			{
				return false;
			}
			AsyncHelper.SetDispatched();
		}

		return AsyncHelper.IsDone();
	}
```

当"Update"函数返回"真（true）"时，则视为潜在命令已完成。返回值"假（false）"表示自动化测试应该立即停止执行，并在下一帧重试。若要在测试代码中使用潜在命令，请使用希望运行的潜在命令的构造函数调用"ADD\_LATENT\_AUTOMATION\_COMMAND"。如果使用参数建立潜在命令，则传入该参数应用作构造函数参数的值。在"RunTest"函数中，以下代码将等待所有单元测试完成，然后尝试连接到之前指定的源码管理提供方：

```cpp
	ADD_LATENT_AUTOMATION_COMMAND(FNUTWaitForUnitTests());
	ADD_LATENT_AUTOMATION_COMMAND(FConnectLatentCommand(SourceControlAutomationCommon::FAsyncCommandHelper()));
```

潜在命令用途的候选项包括与加载或流送数据相关的活动，或任何不能保证在单个框架中运行的活动。例如，在编辑器中，加载地图是即时发生的，但在游戏中，加载地图发生在下一帧，因此必须使用潜在命令来确保当自动化测试需要加载地图时行为一致。

-   [testing](https://dev.epicgames.com/community/search?query=testing)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [automation](https://dev.epicgames.com/community/search?query=automation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [自动化测试](/documentation/zh-cn/unreal-engine/write-cplusplus-tests-in-unreal-engine#%E8%87%AA%E5%8A%A8%E5%8C%96%E6%B5%8B%E8%AF%95)
-   [创建新的自动化测试](/documentation/zh-cn/unreal-engine/write-cplusplus-tests-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%96%B0%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E6%B5%8B%E8%AF%95)
-   [源文件位置](/documentation/zh-cn/unreal-engine/write-cplusplus-tests-in-unreal-engine#%E6%BA%90%E6%96%87%E4%BB%B6%E4%BD%8D%E7%BD%AE)
-   [最低限度示例](/documentation/zh-cn/unreal-engine/write-cplusplus-tests-in-unreal-engine#%E6%9C%80%E4%BD%8E%E9%99%90%E5%BA%A6%E7%A4%BA%E4%BE%8B)
-   [简单测试](/documentation/zh-cn/unreal-engine/write-cplusplus-tests-in-unreal-engine#%E7%AE%80%E5%8D%95%E6%B5%8B%E8%AF%95)
-   [复杂测试](/documentation/zh-cn/unreal-engine/write-cplusplus-tests-in-unreal-engine#%E5%A4%8D%E6%9D%82%E6%B5%8B%E8%AF%95)
-   [潜在命令](/documentation/zh-cn/unreal-engine/write-cplusplus-tests-in-unreal-engine#%E6%BD%9C%E5%9C%A8%E5%91%BD%E4%BB%A4)
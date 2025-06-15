# 在虚幻引擎中设置安卓配置规则系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-android-configuration-rules-system-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:01:32.241Z

---

目录

![安卓配置规则系统](https://dev.epicgames.com/community/api/documentation/image/82709841-15a4-4015-ae74-d0979cb3719c?resizing_type=fill&width=1920&height=335)

安卓配置规则系统使得使用虚幻引擎的安卓开发者们可以确定基于安卓的特定设备是否具有运行他们开发的项目所需的硬件和软件。了解下列信息并按照步骤进行操作，你就可以面向要支持的设备和软件开发你的UE4项目。

## Config Rules文件

首先，创建名称为 **configrules.txt** 的新文本文件并把它放在项目的 **Build/Android** 目录中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a59e90a8-cde1-4dbf-a44a-f2c98db6a1c4/androidconfigrules_file_location.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a59e90a8-cde1-4dbf-a44a-f2c98db6a1c4/androidconfigrules_file_location.png)

单击查看大图。

创建好configrules.txt文件并把它放在Build/Android目录中之后，使用你选择的文本编辑器将其打开，然后添加以下文本（请确保以下文本是该文件中的第一个条目）。

```cpp
	// version:1

```

以上文本是打包时由ConfigRulesTool解析的版本代码，它必须采用这种形式（"//"和"version:"之间有一个空格，并且冒号后面没有空格）。开始时数字为"1"，然后，每次更新该文件之后，应该相应增大该数字。然后，UE4将使用该数字来确定是否应使用较当前嵌入在安卓包（APK）中的版本更新的版本。

任何以 **//** 或 **分号（;）** 开头的行都将被视为注释而且将被忽略。

命令用于操纵区分大小写的变量，这些变量将触发即时操作或将传递给引擎。在Config Rules运行之后定义的任何变量可使用以下函数从C++进行查询：

```cpp
	FString* FAndroidMisc::GetConfigRulesVariable(const FString& Key);

```

**示例：**

```cpp
	#if PLATFORM_ANDROID
	If (FAndroidMisc::GetConfigRulesVariable(TEXT("myflag") == TEXT("true"))
	{
		UE_LOG(LogAndroid, Display, TEXT("myflag was set!"));
	}
	#endif
```

如果要对它们进行迭代，也可以使用键/值条目来访问TMap：

```cpp
	TMap<FString, FString> FAndroidMisc::GetConfigRulesTMap();

```

**示例：**

```cpp
	#if PLATFORM_ANDROID
	TMap<FString, FString> ConfigRules = FAndroidMisc::GetConfigRulesTMap();
	for (const TPair<FString, FString>& Pair :ConfigRules)
	{
		FString VarKey = Pair.Key;
		if (VarKey.StartsWith("myvars_"))
	{
			FString VarValue = Pair.Value;
			UE_LOG(LogAndroid, Log, TEXT("Found variable %s = %s"), *VarKey, *VarValue);
	}
	}
	#endif

```

## Config Rules变量

可以通过下列语法在值中使用变量：

```cpp
	$(varname)

```

这意味着下列：

```cpp
	"$(SRC_DeviceMake) $(SRC_DeviceModel)"

```

将被 **SRC\_DeviceMake** 和 **SRC\_DeviceModel** 的值替换（使用空格分隔）。

以下变量在configrules.txt被解析前自动定义：

**变量名称**

**说明**

**示例值**

memory

总内存（以兆字节为单位）。

3550

hardware

芯片组（来自"/proc/cpuinfo"或"getprop ro.hardware"的"硬件（Hardware）"）。

Qualcomm Technologies, Inc SDM845

ro.hardware

来自"getprop ro.hardware"的结果。

blueline

processor

来自"/proc/cpuinfo"的处理器类型。

AArch64 Processor rev 12 (aarch64)

processorCount

来自"/proc/cpuinfo"的处理器数量。

8

useAffinity

是否为某些线程将线程关联性设置为"小（little）"核心。

true

hasNEON

指示处理器支持NEON特性（SIMD）。

true

isARM64

指示处理器支持ARM64 ABI。

true

littleCoreMask

指示哪些核心为"小（little）"核心的位掩码。

0x0f

bigCoreMask

指示哪些核心为"大（big）"核心的位掩码。

0xf0

SRC\_GpuVendor

来自"GLES20.glGetString(GLES20.GL\_VENDOR)"的"厂商（Vendor）"。

Qualcomm

SRC\_GpuFamily

来自"GLES20.glGetString(GLES20.GL\_RENDERER)"的"GPU系列（GPU family）"。

Adreno (TM) 630

SRC\_GlVersion

来自"GLES20.glGetString(GLES20.GL\_VERSION)"的"GL版本（GL version）"。

OpenGL ES 3.2 V@313.0 (GIT@3f88ca2, I42f6fe38fb) (Date:07/13/18)

SRC\_AndroidVersion

来自"android.os.Build.VERSION.RELEASE"的安卓版本。

9

SRC\_DeviceMake

来自"android.os.Build.MANUFACTURER"的设备制造商。

Google

SRC\_DeviceModel

来自"android.os.Build.MODEL"的设备型号。

Pixel 3

SRC\_DeviceBuildNumber

来自"android.os.Build.DISPLAY"的设备版本号。

PD1A.180720.030

SRC\_VulkanVersion

Vulkan支持的版本。

1.1.0

SRC\_VulkanAvailable

指示设备是否支持Vulkan。

true

SRC\_UsingHoudini

指示Houdini在Intel处理器上模拟ARM。

false

SRC\_SDKLevel

来自"android.os.Build.VERSION.SDK\_INT"的SDK等级。

28

supportsFloatingPointRenderTargets

指示GPU支持FP渲染目标。

true

TextureFormats

GPU支持的纹理格式列表（使用逗号分隔）。

ASTC,ATC,ETC2,ETC1

navigationBarHeight

安卓导航栏的高度（以像素为单位）。

132

statusBarHeight

安卓状态栏的高度（以像素为单位）。

66

screenWidth

屏幕宽度（以像素为单位）。

1080

screenHeight

屏幕高度（以像素为单位）。

2160

## Config Rules命令

可以以 **action:argument** 形式将命令与有效参数配合使用。你可以通过下述方法定义它们，而且，我们还提供了用例示例。

借助 **Set**，你可以指定一个或多个变量以及它们的指定值。

```cpp
	set:(myvar=true)
```

如果有多个变量，可以使用 **逗号**（**,**）分隔它们：

```cpp
	set:(myvar=false,myvar2="something",myvar3="else")
```

借助 **clear**，你可以清除为变量指定的值。

```cpp
	clear:(myvar)

```

通过使用 **逗号**（**,**）分隔要清除的多个值，你可以一次性清除多个变量。

```cpp
	clear:(myvar,myvar3)

```

**condition** 对条件列表进行求值，如果所有条件都为true，它将应用可选的集并清除命令。

```cpp
	condition:((comparison)[,(comparison)],[(set)],[(clear)]

```

比较由三个部分组成，使用逗号分隔并且位于括号中。这三个部分是 **SourceType**、**CompareType** 和 **MatchString**。

```cpp
	(SourceType=isARM64,CompareType=CMP_EQUAL,MatchString="true")

```

**SourceType** 指定用于比较的第一个参数，该参数通常为变量名称。以下是你可以使用的三个特殊的SourceType值：

**命令名称**

**说明**

SRC\_PreviousRegexMatch

最后一个正则表达式条件返回的组。

SRC\_CommandLine

嵌入在APK中的命令行。

\[EXIST\]

与MatchString配合使用，以确定变量是否存在。

**MatchString** 是用于比较的任意字符串值或用于 **\[EXIST\]** 情况的变量名称。

**CompareType** 可以为下列命令之中的任何一个：

**命令名称**

**说明**

CMP\_Exist

如果MatchString中的变量名称已设置则为True。

CMP\_NotExist

如果MatchString中的变量名称未设置则为True。

CMP\_Equal

如果MatchString中的变量名称未设置则为True。

CMP\_NotEqual

如果SourceType不等于MatchString则为True。

CMP\_EqualIgnore

如果SourceType等于MatchString（不区分大小写）则为True。

CMP\_NotEqualIgnore

如果SourceType不等于Matchstring（不区分大小写）则为True。

CMP\_Less

如果SourceType的值 < MatchString的值则为True。

CMP\_LessEqual

如果SourceType的值 <= MatchString的值则为True。

CMP\_Greater

如果SourceType的值 > MatchString的值则为True。

CMP\_GreaterEqual

如果SourceType的值 >= MatchString的值则为True

CMP\_Regex

如果可以在SourceType中找到MatchString中的正则表达式（在SRC\_PreviousRegexMatch中存在用于额外条件检查的匹配组）则为True

下列示例展示可以在UE4项目中设置并使用安卓Config Rules命令的方式：

如果 **isARM64** 为 **true**，下列代码会将 **myvar** 设置为 **arm64**：

```cpp
	condition:((SourceType=isARM64,CompareType=CMP_EQUAL,MatchString="true")),(myvar="arm64")
```

如果 **isARM64** 为 **true**，下列代码会将 **myvar** 设置为 **arm64** 并清除 **notsupported**：

```cpp
	set:(notsupported=true)
	condition:((SourceType=isARM64,CompareType=CMP_EQUAL,MatchString="true")),(myvar="arm64"),(notsupported)

```

下列代码使用 **正则表达式** 提取 **Adreno (TM) 630** 中的数字并进行比较以确定它是否小于 **510** 以标记错误：

```cpp
	condition:((SourceType=SRC_GpuFamily,CompareType=CMP_Regex,MatchString="(?!Adreno \(TM\))([0-9][0-9]*)"),(SourceType=SRC_PreviousRegexMatch,CompareType=CMP_LessEqual,MatchString="510")), (error="CR_Info_UnsupportedGPU")

```

如果"hardware string"等于ro.hardware或hardware，**chipset** 是设置一组变量的捷径。它设置useAffinity、chipset、GPU、processorCount、bigCoreMask和littleCoreMask。useAffinity使用littleCoreMask控制是否将taskgroup线程限制为"小"核心：

```cpp
	chipset: hardware string, useAffinity, part name, GPU name, processor count, big core mask, little core mask

```

以下是一些示例：

```cpp
chipset:"Qualcomm Technologies, Inc MSM8929", true, "Snapdragon 415", "Adreno (TM) 405", 8, 0xf0, 0x0f
chipset:"Qualcomm Technologies, Inc MSM8937", true, "Snapdragon 435", "Adreno (TM) 505", 8, 0xf0, 0x0f
chipset:"Qualcomm Technologies, Inc MSM8940", true, "Snapdragon 435", "Adreno (TM) 505", 8, 0xf0, 0x0f
chipset:"Qualcomm Technologies, Inc MSM8952", true, "Snapdragon 617", "Adreno (TM) 405", 8, 0xf0, 0x0f
chipset:"Qualcomm Technologies, Inc MSM8953", true, "Snapdragon 625/626", "Adreno (TM) 506", 8, 0xf0, 0x0f
chipset:"Qualcomm Technologies, Inc MSM8956", true, "Snapdragon 650", "Adreno (TM) 510", 6, 0x03, 0x0f
chipset:"Qualcomm Technologies, Inc MSM8976", true, "Snapdragon 652/653", "Adreno (TM) 510", 8, 0xf0, 0x0f
chipset:"Qualcomm Technologies, Inc SDM630", true, "Snapdragon 630", "Adreno (TM) 508", 8, 0xf0, 0x0f
chipset:"Qualcomm Technologies, Inc SDM636", true, "Snapdragon 636", "Adreno (TM) 509", 8, 0xf0, 0x0f
chipset:"Qualcomm Technologies, Inc SDM660", true, "Snapdragon 660", "Adreno (TM) 512", 8, 0xf0, 0x0f
chipset:"Qualcomm Technologies, Inc SDM640", true, "Snapdragon 640", "Adreno (TM) 610", 8, 0xc0, 0x3f
chipset:"Qualcomm Technologies, Inc SDM670", true, "Snapdragon 670", "Adreno (TM) 620", 8, 0xf0, 0x0f
chipset:"Qualcomm Technologies, Inc SDM710", true, "Snapdragon 710", "Adreno (TM) 616", 8, 0xc0, 0x3f
chipset:"Qualcomm Technologies, Inc SDM730", true, "Snapdragon 730", "Adreno (TM) 615", 8, 0xc0, 0x3f
chipset:"Qualcomm Technologies, Inc MSM8992", true, "Snapdragon 808", "Adreno (TM) 418", 6, 0x30, 0x0f
chipset:"Qualcomm Technologies, Inc MSM8994", true, "Snapdragon 810", "Adreno (TM) 430", 8, 0xf0, 0x0f
chipset:"Qualcomm Technologies, Inc MSM8996", true, "Snapdragon 820/821", "Adreno (TM) 530", 4, 0x0c, 0x03
chipset:"Qualcomm Technologies, Inc MSM8998", true, "Snapdragon 835", "Adreno (TM) 540", 8, 0xf0, 0x0f
chipset:"Qualcomm Technologies, Inc SDM845", true, "Snapdragon 845", "Adreno (TM) 630", 8, 0xf0, 0x0f
chipset:"samsungexynos9810", true, "Samsung Exynos 9 Series (9810)", "Mali-G72 MP18", 8, 0xf0, 0x0f
chipset:"samsungexynos8895", true, "Samsung Exynos 9 Series (8895)", "Mali-G71 MP20", 8, 0xf0, 0x0f
chipset:"samsungexynos9610", true, "Samsung Exynos 7 Series (9610)", "Mali-G72 MP3", 8, 0xf0, 0x0f
chipset:"samsungexynos7885", true, "Samsung Exynos 7 Series (7885)", "Mali-G71 MP2", 8, 0xc0, 0x3f
chipset:"samsungexynos7880", false, "Samsung Exynos 7 Series (7880)", "Mali-T830 MP3", 8, 0xff, 0x00
chipset:"samsungexynos7882", true, "Samsung Exynos 5 Series (7872)", "Mali-G71 MP1", 6, 0x30, 0x0f
```

## Config Rules特殊变量

存在两个特殊变量，如果设置，将触发操作：

```cpp
	set:(log="message for the logcat")

```

对任何命令进行求值之后的日志值将写入logcat输出然后被清除。

```cpp
	set:(dumpvars=1)

```

它会将当前设置的所有变量及它们的值转储到logcat中。

## Config Rules描述

你可以设置 **Profile** 变量来覆盖所使用的设备描述，该设备描述根据 **DefaultDeviceProfiles**.ini 中的 **AndroidDeviceProfileMatchingRules** 选择。如果未修改此值，一般规则仍将适用。以下示例将使用 **Android\_Galaxy\_S9Plus\_Adreno** 设置来覆盖 **SM-G965** 型号：

```cpp
	condition:((SourceType=sammodel,CompareType=CMP_Regex,MatchString="SM-G965")), (Profile="Android_Galaxy_S9Plus_Adreno")
```

## Config Rules对话框

你可以使用下列变量自定义显示的错误和警告对话框消息。

-   caption
-   exitbutton
-   continuebutton
-   updatebutton
-   helpbutton

需要在字符串表中查找放置在标题或按钮中的值，以获取用于对话框的本地化后的文本。对于项目支持的每种本地化语言，你应确保这些字符串名称的唯一性且将它们放置在 **ConfigurationStrings.xml** 文件中（文件应位于项目的 **Build/Android/res/values** 目录下）。（例如，对于法语，应使用"values-fr"）。

在下图中，我们展示了应将ConfigurationStrings.xml文件放置到的位置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5e579e1-ae0e-48fc-8a13-47a2d3ba6b43/androidconfigrules_file_location.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5e579e1-ae0e-48fc-8a13-47a2d3ba6b43/androidconfigrules_file_location.png)

单击查看大图。

-   **Error -** 你可以通过设置 **Error 变量** 来显示 **错误**。对话框将显示你为它指定的值的字符串表条目。当它被设置，configrules.txt的所有处理都将立即停止，而且用户将无法继续使用应用程序。
-   **Warning** - 你可以通过设置 **Warning变量** 来使 **警告** 对话框可以被触发。对话框将提供"继续（Continue）"选项并选择性地更新（如果设置了相应变量，还/或将提供"帮助（Help）"按钮）。"帮助（Help）"按钮将启动外部浏览器，目标网址为你在link变量中指定的URL。configrules.txt的求值将继续，直至在对话框显示前设置了结束或错误，这样，如果必要，你就可以使用不同的条件再次更改它。

如果设置了下列示例代码，用户尝试使用不支持ARM64的安卓设备时，将显示错误消息。

```cpp
	set:(caption="CR_Caption_DeviceNotSupported", exitbutton="CR_Button_Quit", continuebutton="CR_Button_Continue", helpbutton="CR_Button_Help")
	condition:((SourceType=isARM64,CompareType=CMP_EQUAL,MatchString="false")),(error="CR_Info_RequiresARM64")

```

在以上示例情况发生时，显示的错误消息将来自下列字符串表。

```cpp
<?xml version="1.0" encoding="utf-8"?>
<resources>

<string name="CR_Button_Quit">Quit</string>
<string name="CR_Button_Help">More Info</string>
<string name="CR_Button_Continue">Continue</string>
<string name="CR_Button_Update">Check for Update</string>

<string name="CR_Caption_DeviceNotSupported">Device Not Supported</string>

<string name="CR_Info_RequiresARM64">This game requires an ARM64-v8a processor.</string>
</resources>
```

## Config Rules Build文件

要通过压缩和加密（可选）configrules.txt文件将它包含在APK中，你需要在项目中添加以下内容。首先在项目的 **Build.cs** 文件中注册下列 **虚幻插件语言**（UPL）代码：

```cpp
	if (Target.Platform == UnrealTargetPlatform.Android)
	{
	// Add UPL to add configrules.txt to our APK
	string PluginPath = Utils.MakePathRelativeTo(ModuleDirectory, Target.RelativeEnginePath);
	AdditionalPropertiesForReceipt.Add("AndroidPlugin", System.IO.Path.Combine(PluginPath, "MyGame_UPL.xml"));
	}
```

接下来你需要创建名称为 **MyGame\_UPL.xm****l** 的新文件，并将它放置在与 **Build.cs** 文件相同的目录中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d59a6aa8-8a09-420e-9932-bfac1df016fa/androidconfigrules_mygame_upllocation.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d59a6aa8-8a09-420e-9932-bfac1df016fa/androidconfigrules_mygame_upllocation.png)

单击查看大图。

打开 MyGame\_UPL.xml 文件，然后添加下列代码，在完成之后保存文件（更改ConfigRulesKey，使它包含你的唯一加密密钥）：

```cpp
	<?xml version="1.0" encoding="utf-8"?>
	<root xmlns:android="http://schemas.android.com/apk/res/android">
		
		<init>
			
			<setString result="ConfigRulesKey" value="This is my encryption key"/>
		</init>
		
		<gradleCopies>
			<copyFile src="$S(BuildDir)/configrules.txt"
						dst="$S(BuildDir)/gradle/app/configrules.txt"/>
		</gradleCopies>
		<gradleProperties>
			<insertValue value="CONFIGRULESTOOL_KEY=$S(ConfigRulesKey)"/>
			<insertNewline/>
			<insertValue value="CONFIGRULESTOOL_JAR=$S(AbsEngineDir)/Build/Android/Prebuilt/ConfigRulesTool/bin/ConfigRulesTool.jar"/>
			<insertNewline/>
		</gradleProperties>
		<gameActivityClassAdditions>
			<insertValue value="public String CONFIGRULES_KEY = "$S(ConfigRulesKey)";"/>
			<insertNewline/>
		</gameActivityClassAdditions>
		<buildGradleAdditions>
			<insert>
			<![CDATA[
	task ProcessConfigRules(type: JavaExec) {
		description 'Produces compressed and encrypted configules.bin.png in assets'
		inputs.file file('configrules.txt')
		outputs.file file('src/main/assets/configrules.bin.png')
		main = "-jar"
		args = [
			"${CONFIGRULESTOOL_JAR}",
			'c',
			'configrules.txt',
			'src/main/assets/configrules.bin.png',
			"${CONFIGRULESTOOL_KEY}"
		]
	}
	tasks.whenTaskAdded { task ->
		if (CONFIGRULESTOOL_JAR != null) {
			if (task.name == 'assembleRelease') {
				task.dependsOn 'ProcessConfigRules'
			   }
			if (task.name == 'assembleDebug') {
				task.dependsOn 'ProcessConfigRules'
			}
		}
	}
			]]>
			</insert>
		</buildGradleAdditions>
	</root>
```

-   [reference](https://dev.epicgames.com/community/search?query=reference)
-   [android](https://dev.epicgames.com/community/search?query=android)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Config Rules文件](/documentation/zh-cn/unreal-engine/using-the-android-configuration-rules-system-in-unreal-engine#configrules%E6%96%87%E4%BB%B6)
-   [Config Rules变量](/documentation/zh-cn/unreal-engine/using-the-android-configuration-rules-system-in-unreal-engine#configrules%E5%8F%98%E9%87%8F)
-   [Config Rules命令](/documentation/zh-cn/unreal-engine/using-the-android-configuration-rules-system-in-unreal-engine#configrules%E5%91%BD%E4%BB%A4)
-   [Config Rules特殊变量](/documentation/zh-cn/unreal-engine/using-the-android-configuration-rules-system-in-unreal-engine#configrules%E7%89%B9%E6%AE%8A%E5%8F%98%E9%87%8F)
-   [Config Rules描述](/documentation/zh-cn/unreal-engine/using-the-android-configuration-rules-system-in-unreal-engine#configrules%E6%8F%8F%E8%BF%B0)
-   [Config Rules对话框](/documentation/zh-cn/unreal-engine/using-the-android-configuration-rules-system-in-unreal-engine#configrules%E5%AF%B9%E8%AF%9D%E6%A1%86)
-   [Config Rules Build文件](/documentation/zh-cn/unreal-engine/using-the-android-configuration-rules-system-in-unreal-engine#configrulesbuild%E6%96%87%E4%BB%B6)
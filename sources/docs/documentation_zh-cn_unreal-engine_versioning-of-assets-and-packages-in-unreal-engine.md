# 虚幻引擎资产和包的版本控制 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/versioning-of-assets-and-packages-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:40:43.370Z

---

目录

![资产和包的版本控制](https://dev.epicgames.com/community/api/documentation/image/a13f7e99-f21f-44ce-b578-8e61635f26a5?resizing_type=fill&width=1920&height=335)

**虚幻引擎** 包含多个版本控制系统，用于定义（并确保）引擎和代码及其所用数据之间的兼容性。版本控制不仅可以用来检测不兼容代码或数据，还可以管理自定义序列化和数据转换。我们将虚幻引擎版本控制拆解为三个主要系统：**引擎版本**、**序列化版本** 和 **构建ID**。

## 引擎版本

**引擎版本** 是虚幻引擎中的最高级别、用户可视性最高的版本控制形式。这一部分引擎版本控制系统确保向后兼容性，并通过控制资产的保存和加载来防止数据丢失。引擎版本出现在编辑器内的"帮助"（Help）菜单的"关于虚幻编辑器"（About Unreal Editor）部分中。

![The About Unreal Editor dialogue box displays the current version of the Unreal Editor as well as the current changelist.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe59bc9c-1d26-4792-9572-9ea30eba0321/about-unreal-editor.png "About Unreal Editor")

*编辑器中显示的引擎版本。*

实际的引擎版本包含五个部分：主版本、次要版本和补丁版本，后跟更改列表以及构建所依据的分支名称。在代码中，这五个部分存在于`FEngineVersion`类及其父类`FEngineVersionBase`中。

组件

类型

示例值（见以上截图）

主版本

`uint16`

5

次要版本

`uint16`

0

补丁版本

`uint16`

3

更改列表号

`uint32`

20979098

分支名称

`FString`

+++UE5+Release-5.0

每个数字组成部分的值不会随着时间而减小，但更高等级的值会增大。这意味着，任何两个引擎版本可以按组成部分进行比较，以确定它们是相同还是哪一个更新。此外，被授权者创建的更改列表将始终被视为比Epic的更改列表更新，前提是主版本、次要版本和补丁版本值全部匹配。分支名称不用于检查兼容性，存在的主要目的是为了显示。

不兼容引擎版本将导致引擎无法加载资产。在某些情况下，这样会明显地看到操作失败，但需要注意的是，较新版本引擎中保存的资产不仅不会显示在内容浏览器中，对它们的引用也会被视为空。保存引用资产存在一定的风险，因为现在为空的引用将保存在进程中，从而导致失去该信息却不通知用户。

### 资产和包

资产包含用于保存它们的编辑器的引擎版本。通过在加载时进行这项检查，引擎可以顺利地处理通过代码更改添加到序列化数据或从中删除的属性。在反序列化期间（如加载资产时）找到的被删除字段将不会被识别并被忽略，而新添加的字段会从序列化数据中缺失，但将保留其默认值。在序列化资产数据以保存到磁盘时，被删除字段的数据已被废弃，新添加字段的数据将存在并随着所有其他属性一起序列化。最终结果是，数据结构会随着时间而改变，这些结构的序列化表示将自然地废弃过时的字段，同时添加新字段。因此，对于任何给定版本引擎中的序列化数据，只有相同或较新版本能够识别。这条规则可防止因为较旧版本引擎废弃较新属性，然后将数据序列化回到磁盘格式而引起的数据丢失错误。

更改列表位0的引擎版本与所有其他引擎版本兼容。这有助于工程师的引擎开发，但不应用来将资产保存到磁盘。相反，内容创建者应使用分布式、二进制编辑器构建版，这样可以使用包含准确引擎版本数据的资产，并利用保护机制以防其提供的数据丢失。

### 关于引擎版本的编码

`FEngineVersion`类提供对项目中的引擎版本信息的访问。建议在需要显示引擎版本或检查兼容性时调用这些函数。

函数名称

静态/实例

效果

`Current`

静态

获取构建的引擎版本。通常用于显示目的，而不是实际的兼容性检查。

`CompatibleWith`

静态

获取当前构建兼容的最早（最低）引擎版本。旨在用于兼容性检查，如包含资产、模块和网络数据的版本。

`IsCompatibleWith`

实例

指示当前引擎版本是否兼容您提供的`FEngineVersionBase`输入参数。

如果当前引擎版本与正在检查的引擎版本相同或者更新，则可能兼容。例如，任何4.19编辑器构建将兼容任何4.18资产，但4.18编辑器将不兼容4.19构建中保存的资产。唯一例外的是如果两个引擎版本中任意一个的更改列表组件为0，则始终视为二者兼容。这是为了支持实时开发环境，因为基于代码的引擎构建如果没有通过虚幻游戏同步进行同步，则会被标记为更改列表0，从而形成与版本检查相关的更包容性环境。但在烘焙构建时，这些资产将引起警告，因此不建议使用 "Changelist 0" 资产。

要禁用烘焙 "Changelist 0" 资产的构建时出现的警告，将 `ZeroEngineVersionWarning=0` 添加到项目 `DefaultEngine.ini` 文件的 `[Core.System]` 分段。

### 更新引擎版本

构建的引擎版本由引擎中的 `/Build/Build.version` 中定义的值来控制。该文件可以通过手动编辑进行更新，可以运行 `UpdateLocalVersion` 命令或通过[虚幻游戏同步](/documentation/zh-cn/unreal-engine/unreal-game-sync-ugs-for-unreal-engine)进行同步。以下字段是从 `/Build/Build.version` 文件读取的：

字段名称

备注

`MajorVersion`

控制引擎的主版本。

`MinorVersion`

控制引擎的次要版本。

`PatchVersion`

控制引擎的补丁版本。

`Changelist`

手动定义。可以手动更新，或者使用 `UpdateLocalVersion` **自动化工具（AutomationTool）** 工具由构建系统更新。这将使用构建的depot路径名，用加号取代斜杠。

`CompatibleChangelist`

这是将视为与该引擎版本兼容的更改列表的最低（或最早）值。通常为0，如引擎的本地构建，但Epic的公开发布二进制构建或内部分发的二进制构建将包含非零值，因此与本地编译的版本不兼容。

`IsLicenseeVersion`

对于本地编译的从源控制同步的构建，应该为0，但构建系统通过"UpdateLocalVersion"AutomationTool命令设置为1。设置为1对于升级构建是很合适的，并且支持更严格的版本检查，但会禁用热重载。

`IsPromotedBuild`

指示这是升级构建。默认值为"1"。

`BranchName`

用于描述从中编译构建的分支的字符串。用于显示目的，或唯一地标识构建。不影响兼容性检查。

`BuildId`

编译时，引擎和模块都使用这个值进行标记。引擎将认为没有这个值的任何模块都不兼容。建议将该值留空，这样会在每次编译时生成一个新的唯一值。请参阅下文 **构建ID** 部分以了解更多信息。

### UpdateLocalVersion Commandlet

`UpdateLocalVersion` 命令对于不需要手动编辑 `Build/Build.version` 文件的情况十分有用，例如在专用构建机器上编译。`/Build/BatchFiles/RunUAT.bat` 文件可以用于启动 `UpdateLocalVersion` 命令，如下所示：

```cpp
	RunUAT.bat UpdateLocalVersion [-CL=INT] [-CompatibleCL=INT] [-Build=STRING] [-SkipHeader] [-Licensee] [-Promoted=BOOL] [-Branch=STRING]

```

这些参数解译如下：

参数

类型和默认值

解译

`CL`

整数（0）

控制 `Build.version` 中的 `Changelist` 字段。

`CompatibleCL`

整数（0）

控制"Build.version"中的"CompatibleChangelist"字段。

`Build`

字符串（空）

通过更新源代码中的`BUILD_VERSION`宏来替换构建版本字符串。

`SkipHeader`

布尔（false）

如果存在，将不会更新引擎的标头文件。

`Licensee`

布尔（false）

控制 `Build.version` 中的 `IsLicensee` 字段。如果该参数存在，将被视为 `true`。

`Promoted`

布尔（false）

控制 `Build.version` 中 `IsPromotedBuild` 字段。该参数的任何非零整数值将被视为 `true` 并在该字段中写入 `1`。

`Branch`

字符串（空）

控制 `Build.version` 中的 `BranchName` 字段。

## Object版本

`UObject`衍生类遵从基于引擎版本的兼容性检查，但也有单独的两部分版本控制系统，**Object版本** 包含引擎级别版本和任意数量的自定义Object级别版本。Object序列化通常会进行自定义以提高性能（如包含大量批量数据的资产），实现数据格式更改（如执行单位转换），或保存空间（如以压缩格式将Object数据写入磁盘）。实现自定义序列化要求覆盖`UObject`函数`Serialize`，根据项目需要更改数据格式，并在新代码中包含基于Object版本的检查。这样将使您能够在各序列化更改之间保持向后兼容性，同时防止数据丢失，就像引擎版本一样。

### 引擎级别序列化和版本化

在引擎级别，使用全局列举类型`EUnrealEngineObjectUE5Version`来对自定义序列化程序函数进行版本控制。每当自定义序列化程序更改时，就会向`EUnrealEngineObjectUE4Version`添加新的条目。由于Epic在官方虚幻引擎版本中修改了该列举类型，提供了一个并行全局列举类型`EUnrealEngineObjectLicenseeUE4Version`，以便于被授权者添加自己的引擎级别版本控制。所有将来保存的包都会将两种列举类型的递增值保存到包中，序列化（和反序列化）代码可以使用这些值来执行逻辑以确定如何读取或写入数据。

引擎将会对照自己自动检查这些版本值，如果版本号高于引擎的版本号，则会无法加载任何包。

如果开发商有多个团队负责处理不同的引擎方面，则不适用于这种方法。这种方法无法在多个位置更新版本列举，并且合并时重新排列常量顺序会导致使用这些版本号保存的资产损坏或失效。对于有多个团队编写自定义序列化代码的开发商，建议使用Object级别的序列化。

### Object级别序列化和版本控制

为了支持并行开发（尤其是使用不同分支时），引擎通过基于`FGuid`的自定义版本提供了Object级别的版本控制。`FGuid`结构包含一个整数版本号，可以像任何其他版本号一样随着时间而增加（通常实现为自定义列举类型），但也包含全局唯一标识符（GUID），这样可以根据团队需要拥有许多不同的并行自定义版本。针对每个系统或分支保持单独的自定义版本，可以轻松地更新一个分支的自定义版本，而不会在合并来自其他分支的代码时引起冲突。

要注册新的 `FGuid`，使用您的GUID和当前版本号创建 `FCustomVersionRegistration` 类型的全局对象。例如，以下代码在 `Engine/Source/Runtime/AnimGraphRuntime/Private/AnimationCustomVersion.cpp` 中创建 `AnimGraphVer` `FGuid`：

```cpp
	const FGuid FAnimationCustomVersion::GUID(0x2EB5FDBD, 0x01AC4D10, 0x8136F38F, 0x3393A5DA);
	// 将自定义版本注册到核心
	FCustomVersionRegistration GRegisterAnimationCustomVersion(FAnimationCustomVersion::GUID, FAnimationCustomVersion::LatestVersion, TEXT("AnimGraphVer"));

```

在Object级别，每个UObject派生类都可以选择通过调用 `FArchive` 函数 `UsingCustomVersion`，序列化一个或多个 `Serialize` 中的 `FGuid` 结构。然后，自定义代码可以根据任何注册的 `FGuid` 中的版本号执行逻辑，以确定要读取或写入的数据。由于与这样注册的任何 `FGuid` 关联的版本号会被假设为永不减小，这也让引擎能够确保不会加载来自新版本的资产，从而防止数据丢失，像引擎版本一样保持向后兼容性。

### 自定义序列化函数

Object可以覆盖 `UObject` 函数 `Serialize`，以控制它们在磁盘上拥有的确切数据表示。该函数会使用 `FArchive` 类读取和写入数据，意味着您只需要设置一次数据格式。以下 `FArchive` 函数在序列化代码中写入基于版本的逻辑时十分有用：

函数名称

用法

`UEVer`

返回（Epic）引擎级别版本号。该值将与 `EUnrealEngineObjectUE5Version` 中的条目匹配。

`LicenseeUEVer`

返回（被授权者）引擎级别版本号。该值将与 `EUnrealEngineObjectLicenseeUEVersion` 中的条目匹配。

`CustomVer`

根据提供的 `FGuid`，返回当前Object的Object级别自定义版本号。如果保存Object时，`UsingCustomVersion`（见下文）不是使用该`FGuid`调用的，则该函数将返回-1。

`UsingCustomVersion`

用Object跟踪其自定义版本号来注册`FGuid`。

### Object版本代码示例

PhysXVehicles插件（引擎随附）中的轮式载具使用引擎Object版本和自定义版本来保持与在对物理代码进行特定更改之前构建的资产的向后兼容性。

这里，使用自定义版本设置一个变量，它会更改将来如何计算对表示悬架的物理弹簧对象的偏移。使用的具体自定义版本值取自维护物理代码的团队创建的列举类型。

```cpp
	void UWheeledVehicleMovementComponent::Serialize(FArchive& Ar)
	{
		Super::Serialize(Ar);
		Ar.UsingCustomVersion(FFrameworkObjectVersion::GUID);
		if (Ar.CustomVer(FFrameworkObjectVersion::GUID) < FFrameworkObjectVersion::WheelOffsetIsFromWheel)
		{
			bDeprecatedSpringOffsetMode = true;
		}
	}

```

在以下示例中，执行了单位转换以响应一个物理变化，这个变化使得角速度用每秒钟转数测量，而不是每秒弧度。由于这些角速度作为浮点值存储（没有单位），旧资产现在需要加载时间转换。在这种情况下，我们将在加载资产时仅修改角速度变量。我们保存的这种类型的任何资产已经有了用每秒钟转数表示的角速度，将保存在当前引擎版本中，因此无需在下次加载该资产时运行转换代码。

```cpp
	void FConstraintInstance::PostSerialize(const FArchive& Ar)
	{
	#if WITH_EDITORONLY_DATA
	// ...
		if (Ar.IsLoading() && Ar.UEVer() < VER_UE_FIXUP_MOTOR_UNITS)
	{
		AngularVelocityTarget *= 1.f / (2.f * PI);
	}
		// ...
	#endif
	}

```

更改对 `LicenseeUEVer` 的 `UEVer` 函数调用将更改代码以使用被授权者版本号，而不是官方Epic版本号。建议想要保持自己版本的虚幻引擎的非Epic用户利用这种方法。

## 二进制文件的版本管理

**注意：** 请参阅[二进制文件的版本管理](/documentation/zh-cn/unreal-engine/how-to-version-binaries-in-unreal-engine)参考页面以了解详情。

-   [assets](https://dev.epicgames.com/community/search?query=assets)
-   [packages](https://dev.epicgames.com/community/search?query=packages)
-   [serialization](https://dev.epicgames.com/community/search?query=serialization)
-   [versioning](https://dev.epicgames.com/community/search?query=versioning)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [引擎版本](/documentation/zh-cn/unreal-engine/versioning-of-assets-and-packages-in-unreal-engine#%E5%BC%95%E6%93%8E%E7%89%88%E6%9C%AC)
-   [资产和包](/documentation/zh-cn/unreal-engine/versioning-of-assets-and-packages-in-unreal-engine#%E8%B5%84%E4%BA%A7%E5%92%8C%E5%8C%85)
-   [关于引擎版本的编码](/documentation/zh-cn/unreal-engine/versioning-of-assets-and-packages-in-unreal-engine#%E5%85%B3%E4%BA%8E%E5%BC%95%E6%93%8E%E7%89%88%E6%9C%AC%E7%9A%84%E7%BC%96%E7%A0%81)
-   [更新引擎版本](/documentation/zh-cn/unreal-engine/versioning-of-assets-and-packages-in-unreal-engine#%E6%9B%B4%E6%96%B0%E5%BC%95%E6%93%8E%E7%89%88%E6%9C%AC)
-   [UpdateLocalVersion Commandlet](/documentation/zh-cn/unreal-engine/versioning-of-assets-and-packages-in-unreal-engine#updatelocalversioncommandlet)
-   [Object版本](/documentation/zh-cn/unreal-engine/versioning-of-assets-and-packages-in-unreal-engine#object%E7%89%88%E6%9C%AC)
-   [引擎级别序列化和版本化](/documentation/zh-cn/unreal-engine/versioning-of-assets-and-packages-in-unreal-engine#%E5%BC%95%E6%93%8E%E7%BA%A7%E5%88%AB%E5%BA%8F%E5%88%97%E5%8C%96%E5%92%8C%E7%89%88%E6%9C%AC%E5%8C%96)
-   [Object级别序列化和版本控制](/documentation/zh-cn/unreal-engine/versioning-of-assets-and-packages-in-unreal-engine#object%E7%BA%A7%E5%88%AB%E5%BA%8F%E5%88%97%E5%8C%96%E5%92%8C%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)
-   [自定义序列化函数](/documentation/zh-cn/unreal-engine/versioning-of-assets-and-packages-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%BA%8F%E5%88%97%E5%8C%96%E5%87%BD%E6%95%B0)
-   [Object版本代码示例](/documentation/zh-cn/unreal-engine/versioning-of-assets-and-packages-in-unreal-engine#object%E7%89%88%E6%9C%AC%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B)
-   [二进制文件的版本管理](/documentation/zh-cn/unreal-engine/versioning-of-assets-and-packages-in-unreal-engine#%E4%BA%8C%E8%BF%9B%E5%88%B6%E6%96%87%E4%BB%B6%E7%9A%84%E7%89%88%E6%9C%AC%E7%AE%A1%E7%90%86)

相关文档

[

二进制文件版本划分

![二进制文件版本划分](https://dev.epicgames.com/community/api/documentation/image/b6649150-ab80-4773-83ba-c0071432efd8?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/how-to-version-binaries-in-unreal-engine)
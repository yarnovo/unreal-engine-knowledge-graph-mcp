# 如何为IDE生成虚幻引擎项目文件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-generate-unreal-engine-project-files-for-your-ide
> 
> 生成时间: 2025-06-14T20:31:48.189Z

---

目录

![IDE的项目文件](https://dev.epicgames.com/community/api/documentation/image/cb32b8fe-acf4-4d8e-b6da-f032735e88a9?resizing_type=fill&width=1920&height=335)

以下指南适用于从源代码下载并编译虚幻引擎的用户，该代码已在GitHub上提供。更多详情请参阅[下载虚幻引擎源代码](/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine)。

如已下载最新的 **虚幻引擎（UE）** 代码，您可能会注意到其中未含有用于编译和运行引擎或游戏范例的 **Visual Studio（VS）** 或 **Xcode** 项目文件。您需要运行一个脚本，它将生成可供加载的项目文件：

-   运行位于UE根目录中的 `GenerateProjectFiles.bat` 文件。
-   项目生成器工具将分析模块和目标编译文件，并生成新的项目文件。这可能需要一段时间才能完成。

对于VS开发者而言，此操作将在同一目录中生成一个 `UE5.sln` 文件。您将使用此解决方案文件来编译和运行UE游戏和程序。首次编译时，我们建议使用Win64平台的开发配置进行编译。

默认情况下，我们将针对检测到SDK的所有可用平台生成可编译项目，以便您还能够编译和调试控制台和移动平台。如只想针对当前运行平台（如Windows）生成项目，请使用-CurrentPlatform参数运行GenerateProjectFiles.bat。项目文件容量会相对更小。

从源码管理同步新的代码修改后，需重新运行 `GenerateProjectFiles.bat`。如忘记此操作，编译或运行游戏时可能会出错。

如对模块进行添加或删除源文件等本地修改，应重新运行 `GenerateProjectFiles.bat`。不建议手动更改项目文件。

## 命令行选项

项目生成器拥有部分可选命令行参数，如有需要可以使用这些参数来自定义已生成项目文件，以更好地匹配用户需求。通常不需要、也不推荐使用这些选项。

选项

描述

`-CurrentPlatform`

只生成当前桌面平台（Windows或Mac）的可编译项目，而非所有检测到的可用目标平台。

`-2019`

以VS 2019原生格式生成项目。设置此项后，将使用Visual C++2019编译器进行编译。

`-2022`

以VS 2022原生格式生成项目。设置此项后，将使用Visual C+2022编译器进行编译。

`-ThirdParty`

将标头和其他文件从第三方库中添加至项目。举例而言，如希望在如PhysX、Steamworks或Bink等的Visual Assist中查看符号和文件，此操作将十分实用。但它会增加项目文件的加载时间！

`GAME_NAME -Game`

要求项目生成器生成仅包含指定项目名称的代码和内容的项目（不包括其他所有已发现项目）。同时必须指定项目名称。举例而言，`GenerateProjectFiles.bat ShooterGame.uproject -Game` 将生成仅包含ShooterGame的源和目标的项目。如想在单个游戏项目中包含引擎源代码和程序，也可以传递 `-Engine` 参数，如 `GenerateProjectFiles.bat ShooterGame.uproject -Game -Engine`。

`-Engine`

使用 `-Game` 时，生成的解决方案会同时包含引擎代码、内容和程序。如对游戏项目进行操作时需大量修改引擎源代码，此操作将十分实用。

`-NoIntelliSense`

跳过生成用于在IDE中自动完成和错误波浪线提示的IntelliSense数据。

`-AllLanguages`

包括所有语言的引擎文档。默认情况下项目中仅包含英文文件。

`-OnlyPublic`

指定后，引擎模块的已生成项目只仅会包含公开头文件。引擎模块默认包含所有源文件。此操作可缩短项目的加载时间，但导航引擎代码可能会变得更难。

`-NoShippingConfigs`

在已生成项目中省略 `Shipping` 和 `Test` 编译配置。这将减少需要处理的目标配置的数量。

`-Platforms=PLATFORM_1+PLATFORM_2+...`

覆盖生成可编译项目所针对的默认平台集，转而生成指定平台的项目。可利用"+"字符进行分隔，指定多个平台。此操作同时会使用包含平台名称的后缀来命名生成的解决方案文件。

## 其他信息

`GenerateProjectFiles.bat` 脚本是一个围绕着虚幻引擎编译工具（Unreal Build Tool）所设计的一个简单封装程序，它以一种特殊的模式启动该工具，用于构建项目文件而非生成程序可执行文件。它通过使用 `-ProjectFiles` 命令行选项来调用虚幻引擎编译工具。

UE编译系统实际上不需要项目文件来编译代码。虚幻编译工具始终使用模块和目标编译文件来寻找源文件。因此，添加新的源文件并触发编译时，即使项目文件未被刷新，新的源文件也可能被包含在编译中。请留意此情况。

对VS项目而言，生成的解决方案文件为 `UE5.sln` ，并保存在UE4根目录中。但项目文件保存在 `UNREAL_ENGINE_ROOT/Engine/Intermediate/ProjectFiles/` 目录中。可安全地随时删除这些文件并重新生成项目，但如进行删除，可能会丢失部分项目特定的偏好（如命令行参数字符串）。

### 生成项目文件的优点

当然是有利也有弊，以下是我们决定生成UE项目文件的主要原因：

-   UE被设计为可使用多平台进行工作，但不同团队可能仅会使用部分特定平台进行工作。生成项目文件后，可省略不相关的特定平台文件和编译配置。
-   UE编程方法由多个子模块组成，为方便程序员添加新模块，我们将其设计得尽可能简单。
-   项目生成器发出高度精确的定义，并包括使用UE代码时VS IntelliSense所用的路径。
-   自动生成项目文件时，设置新项目将更加容易。
-   我们希望能支持多种平台和开发环境（如VS和Xcode）。手动维护多个项目文件集容易出错，且极为枯燥。
-   我们希望让程序员可以生成高度自定义的项目文件。希望此操作会随着时间而变得更为重要。
-   源文件的目录结构将在项目文件解决方案层级中自动镜像。在浏览源文件时此操作十分便利，但手动创作的项目将变得难以维护。
-   UE编译配置非常复杂，且难以手动维护。对开发人员而言，项目生成器将它变得几乎一目了然。

### 使用生成项目文件添加的其他文件

除C++模块的源代码外，我们还将其他多个文件自动添加到生成的项目中。这是便于在搜索时寻找此类文件。以下是添加到已生成项目中的其他文件的部分范例：

-   着色器源代码（`*.usf` 文件）
-   引擎文档文件（`*.udn` 文件）
-   程序配置文件（`*.ini` 文件）
-   本地化文件（`*.int` 文件）
-   程序源文件和清单（`*.rc` 、.manifest）
-   特定外部（非已生成）项目文件（如UnrealBuildTool、Clean）

### 项目文件和源代码管理

项目文件不会被签入源代码管理。将源码管理冲突合并到项目文件中既繁琐、又容易出错。新系统将项目文件视为纯中间物，从而完全避免了这种情况。另外，对开发不同游戏项目的各个团队而言，解决方案文件并不相同。如不进行修改，Epic使用的项目文件对其他团队可能并无用处。

### 调试项目生成器代码

以下技巧有助于你调试对项目生成代码所做的改动：

-   将启动项目更改为虚幻编译工具。
-   将用于调试的命令行参数设为 `-ProjectFiles`。
-   将工作目录设置为本地路径 `UNREAL_ENGINE_ROOT/Engine/Source/`。
-   正常编译和调试。

注意，项目生成器在你使用VS进行工作时可能会删除你正在使用的项目文件。因此，有时将虚幻编译工具项目直接加载到VS中，而不通过常规UE解决方案文件进行调试将十分实用。

### 编译多个配置

可使用VS中的 **批编译（Batch Build）** 功能。其位于 **编译（Build）** 菜单下。只需选择所有要编译的配置并单击 **编译（Build）** 即可。我们正设法让此界面在之后变得更加实用。

### 与UnrealVS扩展集成

针对VS的[UnrealVS Extension](/documentation/zh-cn/unreal-engine/using-the-unrealvs-extension-for-unreal-engine-cplusplus-projects)中有一个工具栏按钮，你可以点击它，为当前加载的解决方案重新生成项目文件。

你还可以为此功能绑定快捷键。方法是在VS中，打开 **工具（Tools） > 选项（Options） > 环境（Environment） > 键盘（Keyboard）**，然后搜索UnrealVS.RefreshProjects。

请注意，此功能只有在加载了解决方案后才会被启用（因为该工具需要知道要为哪个代码分支生成项目）。如果你还未生成过 `UE5.sln` 文件，需要先直接运行 `GenerateProjectFiles.bat` 脚本。

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [命令行选项](/documentation/zh-cn/unreal-engine/how-to-generate-unreal-engine-project-files-for-your-ide#%E5%91%BD%E4%BB%A4%E8%A1%8C%E9%80%89%E9%A1%B9)
-   [其他信息](/documentation/zh-cn/unreal-engine/how-to-generate-unreal-engine-project-files-for-your-ide#%E5%85%B6%E4%BB%96%E4%BF%A1%E6%81%AF)
-   [生成项目文件的优点](/documentation/zh-cn/unreal-engine/how-to-generate-unreal-engine-project-files-for-your-ide#%E7%94%9F%E6%88%90%E9%A1%B9%E7%9B%AE%E6%96%87%E4%BB%B6%E7%9A%84%E4%BC%98%E7%82%B9)
-   [使用生成项目文件添加的其他文件](/documentation/zh-cn/unreal-engine/how-to-generate-unreal-engine-project-files-for-your-ide#%E4%BD%BF%E7%94%A8%E7%94%9F%E6%88%90%E9%A1%B9%E7%9B%AE%E6%96%87%E4%BB%B6%E6%B7%BB%E5%8A%A0%E7%9A%84%E5%85%B6%E4%BB%96%E6%96%87%E4%BB%B6)
-   [项目文件和源代码管理](/documentation/zh-cn/unreal-engine/how-to-generate-unreal-engine-project-files-for-your-ide#%E9%A1%B9%E7%9B%AE%E6%96%87%E4%BB%B6%E5%92%8C%E6%BA%90%E4%BB%A3%E7%A0%81%E7%AE%A1%E7%90%86)
-   [调试项目生成器代码](/documentation/zh-cn/unreal-engine/how-to-generate-unreal-engine-project-files-for-your-ide#%E8%B0%83%E8%AF%95%E9%A1%B9%E7%9B%AE%E7%94%9F%E6%88%90%E5%99%A8%E4%BB%A3%E7%A0%81)
-   [编译多个配置](/documentation/zh-cn/unreal-engine/how-to-generate-unreal-engine-project-files-for-your-ide#%E7%BC%96%E8%AF%91%E5%A4%9A%E4%B8%AA%E9%85%8D%E7%BD%AE)
-   [与UnrealVS扩展集成](/documentation/zh-cn/unreal-engine/how-to-generate-unreal-engine-project-files-for-your-ide#%E4%B8%8Eunrealvs%E6%89%A9%E5%B1%95%E9%9B%86%E6%88%90)
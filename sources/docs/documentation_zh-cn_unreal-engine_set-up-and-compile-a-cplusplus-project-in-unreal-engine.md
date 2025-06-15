# Set Up and Compile a C++ Project in Unreal Engine | Unreal Engine 5.6 Documentation | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:49:50.191Z

---

目录

## 开始之前

确保完成如下事项：

-   [安装虚幻引擎](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/install-unreal-engine) 并为虚幻引擎设置[Visual Studio](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-visual-studio-development-environment-for-cplusplus-projects-in-unreal-engine?application_version=5.5)
    
-   了解项目和Actor，以及如何在虚幻编辑器中导航
    
-   阅读 [编写第一人称冒险游戏](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/code-a-firstperson-adventure-game-in-unreal-engine)
    

## 从模板开始

本教程将引导你从一项基于蓝图的项目开始。该项目包含了示例资产。 你将逐步添加代码，这些代码可自我复制并依靠现有蓝图功能进行拓展，你将在以蓝图作为参考的同时，学习在全新的C++项目中编译新的类。

要使用模板创建新游戏项目，请执行以下步骤：

1.  打开虚幻引擎。 打开**虚幻项目浏览器**，转到**游戏（Games）**项目类别，选择**第一人称（First Person）**模板。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/42246a79-8d2f-4df3-bb80-264b0db1c513?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/42246a79-8d2f-4df3-bb80-264b0db1c513?resizing_type=fit)
    
2.  转到**项目默认设置（Project Defaults）**，确保项目类型设为**蓝图（Blueprint）**。 这意味着虚幻引擎将使用蓝图类型的默认资产创建项目，而不是使用C++资产。
    
3.  将**变体（Variant）**设为**竞技场射击游戏（Arena Shooter）**。
    
4.  命名你的项目。 本教程使用的项目名称为`AdventureGame`。
    
5.  点击**创建（Create）**以在编辑器中打开新项目。
    

## 验证增强输入

使用**增强输入系统**，你可以编译自定义输入操作来定义角色可以做的动作（例如跳跃或下蹲等），从而控制角色的移。 所有输入操作都以数据资产的形式存在，而你可以在代码中引用这些数据资产，从而在代码和角色之间进行通信。

在本教程的稍后部分，你还将结合输入操作和代码，让角色可以移动并环顾四周。

你的项目应该已经启用了增强输入系统。 要验证这一点，请执行以下步骤：

1.  打开虚幻编辑器的主菜单，转到**编辑（Edit）**菜单，选择**插件（Plugins）**。
    
2.  搜索**Enhanced Input**。 这时你应该能看到该插件已安装且已启用。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/6e790941-535b-4526-9f2a-194ea0263f6e?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6e790941-535b-4526-9f2a-194ea0263f6e?resizing_type=fit)
    

如需详细了解增强输入系统和输入操作，请参阅[增强输入](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/enhanced-input-in-unreal-engine)。

## 创建C++游戏模式类

基于蓝图的项目在一开始并不包含任何可用的C++文件或Visual Studio（VS）项目。 接下来，你需要创建第一个类并将C++引入到项目中。 首先，请创建一个自定义游戏模式（Game Mode）类，该类会让虚幻引擎生成Visual Studio项目以及编码所需的文件。 你的自定义类派生自父类 `AGameModeBase`。

**游戏模式**资产定义了游戏的规则、获胜条件以及使用的角色。 游戏模式还设置了项目所用的默认游戏框架类，包括Pawn、PlayerController和HUD等。 在本教程稍后部分，你将使用游戏模式更改默认的玩家角色。

要创建新的游戏模式C++类，请执行以下步骤：

1.  打开虚幻编辑器主菜单，转到**工具（Tools） > 新C++类（New C++ Class）**。
    
2.  转到**选择父类（Choose Parent Class）**窗口，找到并选择**游戏模式基础（Game Mode Base）**，然后点击**下一步（Next）**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/d096b4e8-054d-4ab0-9559-3350e8681d57?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/d096b4e8-054d-4ab0-9559-3350e8681d57?resizing_type=fit)
    
3.  输入新类的名称，然后点击**创建类（Create Class）**。 本教程使用 `AdventureGameMode`。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/5201feb5-a3ed-4ffd-9f83-d1703fd1d8a1?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/5201feb5-a3ed-4ffd-9f83-d1703fd1d8a1?resizing_type=fit)
    
4.  这时会出现两条警告提示，表明你需要在VS中编译至少一次项目，之后C++类才会出现在内容浏览器中。 点击**确定（OK）**，然后在第二个警告提示中点击 **是（Yes）**以打开你的代码。
    

## 编译项目

在开始添加代码之前，请先在VS中编译项目并刷新虚幻编辑器，以此完成环境准备。

### 在Visual Studio中打开项目

如果在你创建游戏模式类后，引擎没有自动提示你在VS中打开项目，那么请在虚幻编辑器的主菜单中找到**工具（Tools）**，然后选择**打开Visual Studio（Open Visual Studio）**。

另外，项目的`.sln`文件默认位置为`/Documents/Unreal Projects/*[项目名称]*`。

虚幻引擎会追踪你对项目所做的更改，例如添加新类、模块、插件或修改编译设置等。 但VS项目文件可能不会自动反映这些更新。 使用 **刷新Visual Studio项目（Refresh Visual Studio Project）**（也在**工具（Tools）**菜单中），即可根据当前项目状态重新生成解决方案和项目文件，从而保持更新所有内容。

打开Visual Studio后，你会看到项目文件已经有序地排列在**解决方案浏览器**中。

[![](https://dev.epicgames.com/community/api/documentation/image/407d4e24-f06f-4618-8981-4e73df6d1622?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/407d4e24-f06f-4618-8981-4e73df6d1622?resizing_type=fit)

当你在VS中首次打开虚幻引擎C++项目时，你可能会在**解决方案浏览器**中看到一条关于缺少组件的警告。 点击**安装（Install）**，让VS安装项目所需的所有额外组件。

[![](https://dev.epicgames.com/community/api/documentation/image/6e51bbe7-ebfa-4e4c-9209-a22eccba9b05?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6e51bbe7-ebfa-4e4c-9209-a22eccba9b05?resizing_type=fit)

转到**解决方案浏览器**，展开**游戏（Games） > \[*项目名称*\] > 源（Source） > \[*项目名称*\]**。 这里就是游戏主要文件的所在位置，包括对应新游戏模式的两个文件，即`*[GameModeName]*.cpp`和`*[GameModeName]*.h`。

[![](https://dev.epicgames.com/community/api/documentation/image/c85100d8-8503-4ed1-9dd3-d2cd20b05422?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/c85100d8-8503-4ed1-9dd3-d2cd20b05422?resizing_type=fit)

### 编译项目并刷新虚幻编辑器

要让虚幻编辑器识别你的代码项目并将你的C++类包含在内容浏览器中，请在VS中编译你的项目，然后重启虚幻编辑器。

要编译项目并使项目类显示在虚幻编辑器中，请执行以下步骤：

1.  在**解决方案浏览器**中，转到**游戏（Games）** > ***\[项目名称\]***，右键点击项目，选择 **编译（Build）**。
    
2.  编译完成后，返回虚幻编辑器，检查底部工具栏是否出现了 **编译（Compile）** 按钮，以及内容浏览器中是否出现了新的 C++Classes 文件夹。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/22294f12-6096-4034-974f-633f886abc51?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/22294f12-6096-4034-974f-633f886abc51?resizing_type=fit)
    
3.  如果上述内容没有出现，请关闭编辑器，然后再次打开你的项目。 打开编辑器会重新编译你的项目，向虚幻引擎表明你的C++类已存在。 如果虚幻引擎询问是否要重新编译项目，请点击 **是（Yes）**。
    

### 禁用实时编码

在再次编译代码之前，请在虚幻编辑器中关闭**实时编码（Live Coding）**。 你可以使用实时编码在引擎运行时更改并重新编译实现（`.cpp`）文件中的C++代码；但是，实时编码遵循不同的编译工作流程，因此在编辑头文件（`.h`）或尝试使用Visual Studio编译时，可能会造成错误。 实时编码在迭代已开发的代码库时很有用，但我们建议在开始新项目时将其禁用。

要关闭实时编码，请转到编辑器的底部工具栏，点击**编译**按钮旁边的三点号，然后禁用**启用实时编码（Enable Live Coding）**。

[![](https://dev.epicgames.com/community/api/documentation/image/c02a8010-be63-43f9-a31a-0339ee25eb7b?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/c02a8010-be63-43f9-a31a-0339ee25eb7b?resizing_type=fit)

## 扩展C++类到蓝图

你已经创建了自定义游戏模式，接下来你需要将其扩展到蓝图，从而向编辑器公开其属性，然后将该新蓝图设为项目的默认游戏模式。

将游戏模式类扩展到蓝图即可直接向编辑器公开类的值，而无需通过代码完成各项操作。 蓝图会充当C++类的子类，继承该类的所有功能。

要从你的GameMode类派生蓝图资产，请执行以下步骤：

1.  打开**内容浏览器（Content Browser）**资产树，转到**C++类（C++ Classes） > \[*项目名称*\]**，找到你创建的C++类。
    
2.  右键点击你的**游戏模式基础（Game Mode Base）**类，选择**基于\[*游戏模式基础名称*\]创建蓝图类（Create Blueprint class based on \[GameModeBaseName\]）**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/88e0f224-964c-448f-b6ff-0df2d3e9394a?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/88e0f224-964c-448f-b6ff-0df2d3e9394a?resizing_type=fit)
    
3.  转到**添加蓝图类（Add Blueprint Class）**窗口，用`BP_` 开头命名你的蓝图，方便之后识别。 本教程使用`BP_AdventureGameMode`。
    
4.  至于**路径（Path）**，选择**All** \> **Content** \> **FirstPerson** \> **Blueprints**，然后 点击**创建类（Create Class）**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/67e6c4b0-7b5d-4ade-a203-2f31e79ea026?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/67e6c4b0-7b5d-4ade-a203-2f31e79ea026?resizing_type=fit)
    
    虚幻引擎会自动在新的蓝图编辑器窗口中打开该蓝图。
    

将蓝图的选项卡拖到主编辑器窗口中的地图选项卡（**Lvl\_FirstPerson**）旁边，即可将新窗口停靠在主编辑器窗口中。

![](https://dev.epicgames.com/community/api/documentation/image/2c70c96b-94dd-472f-9115-cc70cd05c5db?resizing_type=fit)

## 更改项目的游戏模式

默认情况下，新的虚幻引擎项目会使用示例游戏模式。 要将其更改为你的自定义游戏模式，请编辑项目的设置。

要更改默认游戏模式，请执行以下步骤：

1.  打开虚幻编辑器的主菜单，转到**编辑（Edit） > 项目设置（Project Settings）**。
    
2.  转到左侧面板的**项目（Project）**分段，选择**地图和模式（Maps & Modes）**。
    
3.  转到设置表格的顶部，将**默认游戏模式（Default GameMode）**更改为你的游戏模式蓝图。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/4506f1dd-3fa1-48e6-b284-1d46204f9264?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/4506f1dd-3fa1-48e6-b284-1d46204f9264?resizing_type=fit)
    
4.  关闭**项目设置（Project Settings）**。
    

## 添加屏上调试消息

要在项目中添加代码，一种不错的做法是在屏幕上添加一条"Hello World!"消息。

添加调试消息即可验证你使用的是你的游戏模式，而不是虚幻引擎提供的默认游戏模式。 日志消息和调试消息对于在开发过程中验证和调试代码非常有用。

### 重载默认StartPlay()函数

`AGameModeBase`自带`StartPlay()`函数，当游戏Gameplay就绪时，虚幻引擎会调用该函数。 通常而言，你会在自定义GameMode类中重载该函数，以此添加新的全局游戏启动逻辑。 在此，你需要重载该函数，以便在游戏开始时显示调试消息。

要重载自定义GameMode类中的`StartPlay()`函数，请执行以下步骤：

1.  转到VS，打开你的游戏模式类的 `.h` 头文件。 本教程示例代码所使用的类名称为 `AdventureGameMode`。
    
    默认代码如下：
    
    `   UCLASS()  class ADVENTUREGAME_API AAdventureGameMode : public AAdventureGameMode  {  	GENERATED_BODY()  	  };         `
    
    UCLASS() class ADVENTUREGAME\_API AAdventureGameMode : public AAdventureGameMode { GENERATED\_BODY() };
    
    复制完整片段(6行长度)
    
    `GENERATED_BODY()` 是虚幻头文件分析工具所使用宏，它可以自动生成该类和其他UObject所需的代码以配合虚幻引擎工作。 如需详细了解虚幻头文件分析工具，请参阅 [虚幻头文件分析工具文档](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-header-tool-for-unreal-engine)。
    
    `AAdventureGameMode` 类会向你的代码公开不同的游戏模式状态，例如游戏开始或结束、进入地图或游戏正在进行中。 每种状态被触发时都会运行相关函数，如 `StartPlay()` 或 `ResetLevel()`。
    
2.  Add an override declaration for the `StartPlay()` function to your `AAdventureGameModeBase` class.
    
    `   UCLASS()  class ADVENTUREGAME_API AAdventureGameMode : public AAdventureGameMode  {  	GENERATED_BODY()     	virtual void StartPlay() override;	  };         `
    
    UCLASS() class ADVENTUREGAME\_API AAdventureGameMode : public AAdventureGameMode { GENERATED\_BODY() virtual void StartPlay() override; };
    
    复制完整片段(7行长度)
    
3.  保存`.h`文件。
    

虚幻引擎的类和函数会使用前缀名向虚幻头文件分析工具告知类的类型。 例如，前缀`A` 代表Actor，`U`代表UObject，`F`代表结构体（Struct）。 如需详细了解虚幻引擎C++类的前缀，请参阅[Epic C++编码标准：命名规范](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/epic-cplusplus-coding-standard-for-unreal-engine)。

### 为StartPlay()添加调试消息

使用可打印调试消息的某个自定义代码来实现你的`StartPlay()`重载。

要在游戏开始时在屏上打印调试消息，请执行以下步骤：

1.  打开游戏模式的 `.cpp` 文件，实现刚才声明的函数。
    
2.  为 `StartPlay()`添加一项新的函数定义。 该函数在 `AAdventureGameMode` 中声明，因此请使用`AAdventureGameMode::StartPlay()`定义该函数。
    
    `   void AAdventureGameMode::StartPlay()  {     }         `
    
    void AAdventureGameMode::StartPlay() { }
    
    复制完整片段(4行长度)
    
3.  在 `AMyGameModeBase::StartPlay()`中，添加 `Super::StartPlay()` 以从 `AAdventureGameMode` 父类中调用 `StartPlay()` 函数。 这是处理游戏启动时应运行的其他逻辑所必需的操作。
    
4.  接下来，为 `GEngine != nullptr` 添加`check`，以确保全局引擎指针有效。
    
    `   void AAdventureGameMode::StartPlay()  {  	Super::StartPlay();     	check(GEngine != nullptr);  }         `
    
    void AAdventureGameMode::StartPlay() { Super::StartPlay(); check(GEngine != nullptr); }
    
    复制完整片段(6行长度)
    
    这是一个指向虚幻引擎本身所用的UEngine类的指针。检查该指针是否有效，以确保在继续执行代码前游戏运行正常。 如果全局引擎指针无效，游戏将崩溃。  
    
5.  使用`GEngine`访问虚幻引擎的 `AddOnScreenDebugMessage()`成员函数，该函数会在游戏运行时在屏幕上打印消息。
    
    该函数需要四个值：
    
    -   一个唯一的整型键，用于识别消息并防止多次添加同一消息。 如果唯一性不重要，则使用`-1`。
        
    -   用于显示消息的浮点秒数。
        
    -   用于设定文本颜色的`FColor`。
        
    -   待打印的`FString`消息。
        
    
    使用以下值，即可在游戏开始后，在屏幕上显示时长5秒钟的黄色"Hello World!"消息文本：
    
    `GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Yellow, TEXT("Hello World, this is AdventureGameMode!"));`
    
    GEngine-&gt;AddOnScreenDebugMessage(-1, 5.0f, FColor::Yellow, TEXT(&quot;Hello World, this is AdventureGameMode!&quot;));
    
    复制完整片段(1行长度)
    
6.  保存 `.cpp` 文件。   
    

现在， `AAdventureGameMode::StartPlay()` 应该如下所示：

`   #include "AdventureGameMode.h"     void AAdventureGameMode::StartPlay()  {  	Super::StartPlay();     	check(GEngine != nullptr);     	GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Yellow, TEXT("Hello World!"));  }         `

#include "AdventureGameMode.h" void AAdventureGameMode::StartPlay() { Super::StartPlay(); check(GEngine != nullptr); GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Yellow, TEXT("Hello World!")); }

复制完整片段(10行长度)

`UE_LOG`函数也对打印调试消息有所帮助。 该函数不会打印屏上消息，而是在运行时将消息记录到虚幻引擎的输出日志或控制台中。 该函数适合用于记录或追踪游戏中发生事项的详细信息。 你可以将日志分类到不同的通道中，并定义消息的类型（如信息消息、错误消息或警告消息等）。 例如：  
  
`UE_LOG(LogTemp, Warning, TEXT("This is a warning message!"));`

## 编译并测试代码

在虚幻编辑器中点击**编译（Compile）**按钮即可重新编译项目；但我们建议你使用VS重新编译。 编译完成后，你可以在编辑器和游戏中看到对应的代码更改。

要在游戏中查看你所做的更改，请点击主工具栏中的**运行（Play）**按钮，以启动**在编辑器中运行**（Play in Editor (**PIE**)）模式。 调试消息将在左上角显示。

[![](https://dev.epicgames.com/community/api/documentation/image/48890faf-47c9-4397-8098-1153ca83f962?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/48890faf-47c9-4397-8098-1153ca83f962?resizing_type=fit)

[![](https://dev.epicgames.com/community/api/documentation/image/1d00882c-8291-4641-a1f6-258cb5bc5e56?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1d00882c-8291-4641-a1f6-258cb5bc5e56?resizing_type=fit)

要退出PIE模式，请按**Shift + Escape**，或点击关卡编辑器工具栏中的**停止**按钮。

## 下一步

现在你已经拥有了一个使用新游戏模式的基础项目，可以开始创建玩家角色了！ 在下一节中，你将创建一个新的角色类，并学习如何使用输入操作为角色添加移动功能按钮。

[

![创建具有输入操作的玩家角色](https://dev.epicgames.com/community/api/documentation/image/9f7a4571-b47e-4a01-83e5-55831ef59ac0?resizing_type=fit&width=640&height=640)

创建具有输入操作的玩家角色

学习如何开始编译具有输入操作的C++角色。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/create-a-player-character-with-input-actions-in-cplusplus)

## 完整代码

本节中编译的完整代码如下：

```
#pragma once

#include "CoreMinimal.h"
#include "GameFramework/GameModeBase.h"
#include "AdventureGameMode.generated.h"

UCLASS()
class ADVENTUREGAME_API AAdventureGameMode : public AAdventureGameMode
{
	GENERATED_BODY()
```

展开代码复制完整片段(13行长度)

`   #include "AdventureGameMode.h"     void AdventureGameMode::StartPlay()  {  	Super::StartPlay();     	check(GEngine != nullptr);     	GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Yellow, TEXT("Hello World!"));  }         `

#include "AdventureGameMode.h" void AdventureGameMode::StartPlay() { Super::StartPlay(); check(GEngine != nullptr); GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Yellow, TEXT("Hello World!")); }

复制完整片段(10行长度)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [开始之前](/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine#%E5%BC%80%E5%A7%8B%E4%B9%8B%E5%89%8D)
-   [从模板开始](/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine#%E4%BB%8E%E6%A8%A1%E6%9D%BF%E5%BC%80%E5%A7%8B)
-   [验证增强输入](/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine#%E9%AA%8C%E8%AF%81%E5%A2%9E%E5%BC%BA%E8%BE%93%E5%85%A5)
-   [创建C++游戏模式类](/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine#%E5%88%9B%E5%BB%BAc++%E6%B8%B8%E6%88%8F%E6%A8%A1%E5%BC%8F%E7%B1%BB)
-   [编译项目](/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine#%E7%BC%96%E8%AF%91%E9%A1%B9%E7%9B%AE)
-   [在Visual Studio中打开项目](/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine#%E5%9C%A8visualstudio%E4%B8%AD%E6%89%93%E5%BC%80%E9%A1%B9%E7%9B%AE)
-   [编译项目并刷新虚幻编辑器](/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine#%E7%BC%96%E8%AF%91%E9%A1%B9%E7%9B%AE%E5%B9%B6%E5%88%B7%E6%96%B0%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8)
-   [禁用实时编码](/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine#%E7%A6%81%E7%94%A8%E5%AE%9E%E6%97%B6%E7%BC%96%E7%A0%81)
-   [扩展C++类到蓝图](/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine#%E6%89%A9%E5%B1%95c++%E7%B1%BB%E5%88%B0%E8%93%9D%E5%9B%BE)
-   [更改项目的游戏模式](/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine#%E6%9B%B4%E6%94%B9%E9%A1%B9%E7%9B%AE%E7%9A%84%E6%B8%B8%E6%88%8F%E6%A8%A1%E5%BC%8F)
-   [添加屏上调试消息](/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%B1%8F%E4%B8%8A%E8%B0%83%E8%AF%95%E6%B6%88%E6%81%AF)
-   [重载默认StartPlay()函数](/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine#%E9%87%8D%E8%BD%BD%E9%BB%98%E8%AE%A4startplay\(\)%E5%87%BD%E6%95%B0)
-   [为StartPlay()添加调试消息](/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine#%E4%B8%BAstartplay\(\)%E6%B7%BB%E5%8A%A0%E8%B0%83%E8%AF%95%E6%B6%88%E6%81%AF)
-   [编译并测试代码](/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine#%E7%BC%96%E8%AF%91%E5%B9%B6%E6%B5%8B%E8%AF%95%E4%BB%A3%E7%A0%81)
-   [下一步](/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine#%E4%B8%8B%E4%B8%80%E6%AD%A5)
-   [完整代码](/documentation/zh-cn/unreal-engine/set-up-and-compile-a-cplusplus-project-in-unreal-engine#%E5%AE%8C%E6%95%B4%E4%BB%A3%E7%A0%81)
# 虚幻引擎游戏模块 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/gameplay-modules-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:45:26.201Z

---

目录

![游戏模块](https://dev.epicgames.com/community/api/documentation/image/386f0eba-4809-44a9-abf1-18186e7ec31d?resizing_type=fill&width=1920&height=335)

正如引擎本身由一组模块构成一样，每个游戏也是由一个或多个游戏性模块构成的。这些模块类似于引擎以前的版本中的包的概念，它们都是一组相关类的容器。在虚幻引擎 4 中，由于游戏逻辑都可以通过 C++ 实现，所以模块实际上是 DLL 文件，而不再是包文件。（*译者：这里的"包文件"是指 UE3 中的 Package，Gameplay 相关的内容通常会被定义在 MyGame 的目录中，其中具有代码和脚本的实现，最终打包形成 MyGame.u 的形式。而 UE4 不再使用 .u 这类 Package 文件，而是使用更常规的模块化 DLL 文件。*）

如果您还没有创建游戏项目，那么请参照[创建游戏项目](/documentation/zh-cn/unreal-engine/creating-a-new-project-in-unreal-engine)页面获得关于如何创建及设置您的游戏项目的说明。

## 模块创建

游戏模块至少要包含一个头文件 (`.h`)、一个 C++ 文件 (`.cpp`) 和一个编译文件 (`*.Build.cs`)。头文件必须位于模块目录的 `Public` 文件夹中，也就是 \[GameName\] \\Source\\ \[ModuleName\]\\Public 目录。该文件包含了编译该模块中的类所需的所有头文件 - 包括模块自动生成的头文件。

```cpp
	#include "Engine.h"
	#include "EnginePrivate.h"
	#include "<ModuleName>Classes.h"
```

C++ 文件必须位于模块目录的 `Private` 文件夹中，也就是 `[GameName]\Source[ModuleName]\Private` 目录，用于注册及实现模块。

在您的游戏中，至少要使用 `IMPLEMENT_PRIMARY_GAME_MODULE` 注册一个模块。其他模块可以使用另一个可选的 `IMPLEMENT_GAME_MODULE` 方法进行注册。请参照 [多个游戏性模块](/documentation/zh-cn/unreal-engine/gameplay-modules-in-unreal-engine#%E5%A4%9A%E4%B8%AA%E6%B8%B8%E6%88%8F%E6%80%A7%E6%A8%A1%E5%9D%97) 部分获得在一个游戏项目中使用多个游戏性模块的更多细节。

```cpp
	// 包括游戏的头文件
	#include "<ModuleName>.h"

	// 将模块指定为主模块
	IMPLEMENT_PRIMARY_GAME_MODULE( <ModuleName>, "<GameName>" );
```

编译文件位于游戏性模块的根目录中，也就是目录 `[GameName]\Source[ModuleName]`，它定义了 UnrealBuildTool 编译该模块时要使用的一些信息。

```cpp
	using UnrealBuildTool;

	public class <ModuleName> : ModuleRules
	{
		public <ModuleName>( TargetInfo Target )
		{
			PublicDependencyModuleNames.AddRange( new string[] { "Core", "Engine" } );
			PrivateDependencyModuleNames.AddRange( new string[] { "RenderCore" } );
		}
	}
```

### INI 文件设置

由于新的游戏性模块包含 UObject 代码，所以需进行一些必要的配置。

1.  需要在 `DefaultEngine.ini` 文件中的几个地方添加该模块：
    
    `[UnrealEd.EditorEngine]` 部分的 `EditPackages` 数组:
    
    ```cpp
         [UnrealEd.EditorEngine]
         +EditPackages=<ModuleName>
    
    ```
    
    `[Launch]` 部分:
    
    ```cpp
         [Launch]
         Module=<ModuleName>
    
    ```
    
    `[/Script/Engine.UObjectPackages]` 部分的 `NativePackages` 数组:
    
    ```cpp
         [/Script/Engine.UObjectPackages]
         +NativePackages=<ModuleName>
    ```
    

## 多个游戏性模块

关于游戏 DLL 文件模块化处理有一些明智的做法选择。把游戏分为多个 DLL 文件会通常会得不偿失，带来很多麻烦，但这需要每个独立团队根据其需要和原则独立做出决定。使用多个游戏性模块会使得连接时间更短，代码迭代速度更快; 但使用过多的模块，你需要更加频繁地处理 DLL 文件导出 和/或 接口类。对于引擎和编辑器代码来说，做出这种妥协是正确的选择，但对于游戏性代码来说，就不是很合理了。

您可以创建一个主要的游戏模块，然后在创建多个额外的游戏相关的模块。您可以针对这些新模块创建 `*.Build.cs` 文件，然后把到这些模块的引用添加到您的游戏的 [`Target.cs` 文件](/documentation/zh-cn/unreal-engine/unreal-engine-build-tool-target-reference)（OutExtraModuleNames 数组）中。在C++代码中，请确保为您的游戏模块使用适当的宏。至少有一个模块必须使用 `IMPLEMENT_PRIMARY_GAME_MODULE` 宏，而所有其他模块应该使用 `IMPLEMENT_GAME_MODULE` 宏。虚幻编译工具将会自动发现这些模块，并编译额外的游戏DLL文件。

## 限制

我们确实支持创建相互依赖的模块（包括模块彼此间导入和导出函数及数据 -- 比如 Engine 和 UnrealEd 模块），但是这会对编译时间造成不利影响，且有时候可能导致出现变量静态初始化相关的问题。没有相互依赖的游戏性模块更难进行设计和维护，但模块的的代码可能会比较整洁。

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [模块创建](/documentation/zh-cn/unreal-engine/gameplay-modules-in-unreal-engine#%E6%A8%A1%E5%9D%97%E5%88%9B%E5%BB%BA)
-   [INI 文件设置](/documentation/zh-cn/unreal-engine/gameplay-modules-in-unreal-engine#ini%E6%96%87%E4%BB%B6%E8%AE%BE%E7%BD%AE)
-   [多个游戏性模块](/documentation/zh-cn/unreal-engine/gameplay-modules-in-unreal-engine#%E5%A4%9A%E4%B8%AA%E6%B8%B8%E6%88%8F%E6%80%A7%E6%A8%A1%E5%9D%97)
-   [限制](/documentation/zh-cn/unreal-engine/gameplay-modules-in-unreal-engine#%E9%99%90%E5%88%B6)
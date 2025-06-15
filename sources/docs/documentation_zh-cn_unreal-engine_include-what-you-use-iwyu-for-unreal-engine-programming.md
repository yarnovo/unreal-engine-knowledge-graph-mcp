# 虚幻引擎编程中的IWYU | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/include-what-you-use-iwyu-for-unreal-engine-programming
> 
> 生成时间: 2025-06-14T20:31:45.861Z

---

目录

![IWYU](https://dev.epicgames.com/community/api/documentation/image/47374e56-4bd5-44c8-8aaa-e93eedf3a754?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ef651a0-4f7a-4ded-bd24-06db63ba076d/iwyu.png)

**包含您所使用"（IWYU）**，正如名称所述，意味着 **虚幻引擎** 的源代码只包括其需要编译的依赖性。IWYU的目的是为避免包含单块头文件（如 `Engine.h` 或 `UnrealEd.h`），借此省去不必要的依赖性。以下参考指南将为您说明IWYU的含义，包括如何启用IWYU的高阶讲解，确保您的项目遵循IWYU规则。此外，如选择在游戏项目中使用IWYU模式，您将学习到一些总体技巧，有助于在IWYU模式中充分开展工作。

IWYU模式在游戏和游戏插件中默认禁用，但在引擎和引擎插件中默认启用。

## IWYU的含义

在旧版本的虚幻引擎中，引擎的大部分功能通过大型、以模块为中心的头文件（如 `Engine.h` 和 `UnrealEd.h`）进行包含。通过 **预编译头文件（PCH）** 快速编译这些文件即可达成较快的编译时间。但随着引擎的更新，这成为了一个瓶颈。

通过IWYU，每个文件只包括其需要的内容。我们选择使用的所有PCH文件纯粹只是作为基础源文件之上的优化层。可对它们进行修改，将编译时间缩至最短。其独立于源文件本身的修改，不会影响代码是否成功编译。

编写IWYU代码时，我们需要遵循4个特定规则：

1.  **所有头文件包含其所需的依赖性。**
    
2.  ***.cpp文件首先包含其匹配的*.h文件。**
    
3.  **PCH文件已不再是显式包含。**
    
4.  **不再包含单块头文件。**
    

### IWYU规则

以下IWYU规则描述可助您了解IWYU的含义。

1.  **所有头文件包含其所需的依赖性。**
    
    -   **CoreMinimal** 头文件包含一套来自UE核心编程环境的普遍存在类型（包括FString、FName、TArray等）。
        
    -   `CoreMinimal` 头文件（位于UE根目录下：`\Engine\Source\Runtime\Core\Public\CoreMinimal.h`）将首先被多数的引擎头文件所包含。
        
        ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41fd3f4c-ed73-46be-9f6f-ba0ba96267c7/coreminimalheader.png)
    -   在 `Core` 模块中，多数头文件首先包含 `CoreTypes.h` 头文件。这只包含基元C++类型的typedefs、UE编译宏以及配置编译环境的指令。
        
    
    主要概念是每个头文件现在都包含编译所需的全部内容。
    
2.  ***.cpp文件首先包含其匹配的*.h文件。**
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b756d60-b18f-455c-a051-f7b72d383ad1/cppfileincludingheader.png)
    -   禁用PCH文件，在非统一模式中编译游戏项目，即可验证所有源文件包含其必需的所有依赖性。
3.  **PCH文件已不再是显式包含。**
    
    -   虽然PCH文件仍在使用，但虚幻编译工具（UBT）将其强制包含在编译器命令行上。
4.  **不再包含单块头文件。**
    
    -   如引擎代码包含单块头文件（如 `Engine.h` 或 `UnrealEd.h`），编译器将发出警告。
    
    单块头文件仍存在于UE4中，以保证游戏项目的兼容性。如游戏项目包含单块头文件，默认将不会发出警告。
    

## 验证IWYU已启用

建立IWYU规则之前，UE代码通常在每个CPP文件顶部包含一个PCH文件，这和开发者希望IWYU合规代码所包含的内容相悖。按照IWYU，PCH文件可被视为编译时优化的层，独立于代码原始编写的方式进行应用。因此我们并不合成和包含PCH文件，而是让UBT来决定使用的PCH文件（如有）。

如果需要验证已经启用了IWYU模式，确保模块合乎IWYU规则，打开模块的 `*.build.cs` 文件并确认 `PCHUsage` 已被设为 `PCHUsageMode.UseExplicitOrSharedPCHs`。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb9f90c6-38ab-498d-bcf5-7026ef76edf1/exampleplugin_pchusage.png)

将 `PCHUsage` 设为 `PCHUsageMode.UseExplicitOrSharedPCHs` 会为模块创建一个显式PCH文件，必备条件是模块的\*.build.cs文件中拥有一个 `PrivatePCHHeaderFile` 设置。否则模块将与另一个模块共享一个PCH，使工具无需生成不必要的PCH文件。另外需要注意的是：启用 `UseExplicitOrSharedPCHs` 模式时，源文件必须包含其匹配的头文件。此外，如果希望模块不遵循IWYU规则，可将 `PCHUsage` 设为 `PCHUsageMode.UseSharedPCHs`。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07a08a97-94b6-4c80-bc8e-1939795b2cc9/exampleplugin_usesharedpchs.png)

将引擎的基本代码转换为IWYU模型后，UE编译时间将得到极大提升。

### 在IWYU模式中运行

如在IWYU模式中运行游戏，需要首先确保 `.cpp`文件包含其相应的 `.h` 文件。这是一项非常实用的操作，因其将启用编译器确保来 `.h` 文件包含其所需的全部依赖性（PCH文件和统一编译禁用时）。如未首先包含匹配的头文件（针对其相应的 `.cpp` 文件），虚幻编译工具（UBT）将发出警告。

如希望禁用编译器发出警告，可在模块的 `*.build.cs` 文件中将 `bEnforceIWYU` 设为 `false`。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eed8e928-b3c5-4376-b029-ad1628e7ee3c/modulebuildcs_benforceiwyufalse.png)

如希望禁用整个目标的警告，可在 `*.target.cs` 文件中将 `bEnforceIWYU` 设为false。

## 总体提示

如需要游戏使用IWYU，需要注意以下几点：

1.  在每个头文件的顶部包含 `CoreMinimal.h`。
    
2.  禁用PCH文件，在非统一模式中编译游戏项目，即可验证所有源文件包含其必需的所有依赖性。
    
3.  如果需要访问在 `Runtime\Engine\Classes\Engine\Engine.h` 中定义的 **UEngine** 或 **GEngine**，可 `#include Engine/Engine.h` （其有别于 `Runtime\Engine\Public\Engine.h` 中的单块头文件）。
    
4.  如果您使用了编译器无法识别的类，也不了解需要包括的内容，则可能会缺失头文件。如果从正确编译的非IWYU代码转换而来，情况尤为如此。您可以在API文档中查找类，并在页面底部查找必要的模块和头文件。
    

## 附加资源

为帮助用户将现有C++项目转换为一个IWYU格式，我们发布了 **IncludeTool**，其位于 `UNREAL_ENGINE_ROOT\Engine\Source\Programs\IncludeTool` 中。

%setting-up-your-production-pipeline/unreal-build-system/unreal-build-tool/IWYU/include-tool:topic%

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [IWYU的含义](/documentation/zh-cn/unreal-engine/include-what-you-use-iwyu-for-unreal-engine-programming#iwyu%E7%9A%84%E5%90%AB%E4%B9%89)
-   [IWYU规则](/documentation/zh-cn/unreal-engine/include-what-you-use-iwyu-for-unreal-engine-programming#iwyu%E8%A7%84%E5%88%99)
-   [验证IWYU已启用](/documentation/zh-cn/unreal-engine/include-what-you-use-iwyu-for-unreal-engine-programming#%E9%AA%8C%E8%AF%81iwyu%E5%B7%B2%E5%90%AF%E7%94%A8)
-   [在IWYU模式中运行](/documentation/zh-cn/unreal-engine/include-what-you-use-iwyu-for-unreal-engine-programming#%E5%9C%A8iwyu%E6%A8%A1%E5%BC%8F%E4%B8%AD%E8%BF%90%E8%A1%8C)
-   [总体提示](/documentation/zh-cn/unreal-engine/include-what-you-use-iwyu-for-unreal-engine-programming#%E6%80%BB%E4%BD%93%E6%8F%90%E7%A4%BA)
-   [附加资源](/documentation/zh-cn/unreal-engine/include-what-you-use-iwyu-for-unreal-engine-programming#%E9%99%84%E5%8A%A0%E8%B5%84%E6%BA%90)
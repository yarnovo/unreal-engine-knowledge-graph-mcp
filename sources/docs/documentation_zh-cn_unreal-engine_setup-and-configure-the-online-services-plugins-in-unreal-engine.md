# 在虚幻引擎中设置和配置在线服务插件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setup-and-configure-the-online-services-plugins-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:53:43.887Z

---

目录

![设置和配置在线服务插件](https://dev.epicgames.com/community/api/documentation/image/174b0a46-f1bc-43a1-9376-4801e4f692e9?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**在线服务（Online Services）** 插件可帮助你将各种后端在线服务（例如Epic、Steam、Xbox Live、PSN、NLPN等）连接到你的 **虚幻引擎 (UE)）** 项目。本指南介绍了如何：

-   [启用在线服务插件。](/documentation/zh-cn/unreal-engine/setup-and-configure-the-online-services-plugins-in-unreal-engine#%E5%90%AF%E7%94%A8%E5%9C%A8%E7%BA%BF%E6%9C%8D%E5%8A%A1%E6%8F%92%E4%BB%B6)
-   [将在线服务插件添加到你的项目依赖项。](/documentation/zh-cn/unreal-engine/setup-and-configure-the-online-services-plugins-in-unreal-engine#%E5%B0%86%E5%9C%A8%E7%BA%BF%E6%9C%8D%E5%8A%A1%E6%8F%92%E4%BB%B6%E6%B7%BB%E5%8A%A0%E5%88%B0%E9%A1%B9%E7%9B%AE%E4%BE%9D%E8%B5%96%E9%A1%B9)
-   [为你的项目配置默认服务。](/documentation/zh-cn/unreal-engine/setup-and-configure-the-online-services-plugins-in-unreal-engine#%E9%85%8D%E7%BD%AE%E9%BB%98%E8%AE%A4%E5%B9%B3%E5%8F%B0%E6%9C%8D%E5%8A%A1)

## 设置在线服务插件

本说明使用在线服务Null实现进行演示。此实现不连接到后端在线服务，只用于测试目的。这是很好的起始点，因为在线服务Null插件不需要外部注册或配置即可用于虚幻引擎。有关在线服务插件所支持服务的完整列表，请参阅[在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)文档。

### 启用在线服务插件

你可以在项目中使用各种在线服务插件。在线服务基础插件是默认启用的。

要启用其他必需功能，请执行以下步骤：

1.  创建或打开虚幻引擎C++项目。
2.  在菜单栏中找到 **编辑（Edit）> 插件（Plugins）** ，打开名为 **插件（Plugins）** 的新窗口或选项卡。
    
    1.  在此新窗口中，在左侧的导航栏中搜索“Online Services”或选择 **在线平台（Online Platform）** 类别。
    2.  界面上应该会显示若干插件。其中一个应该名为 **在线服务Null（Online Services Null）** 。勾选其对应的复选框以启用 **在线服务Null（Online Services Null）** 插件。
    
    ![启用在线服务插件](enable-plugins.png "Enable the Online Services Plugins")(w:800)
    
    如果你想将Epic在线服务用于你的后端在线服务，请选择 **在线服务EOS（Online Services EOS）** 而不是 **在线服务Null（Online Services Null）** 。这样做可能需要你向Epic在线服务注册你的产品并相应配置后端，以便在线服务插件能够按预期运行。
    
    1.  界面上将显示如下消息：“你必须重启虚幻编辑器才能使更改生效。（You must restart Unreal Editor for changes to take effect.）”点击 **立即重启（Restart Now）** 以重启 **虚幻编辑器**。
3.  现在你已经在项目中启用了在线服务Null插件。

### 将在线服务插件添加到项目依赖项

要在你的项目的C++代码中使用在线服务插件，你必须将插件作为公共依赖项添加到你的项目模块。

要将插件添加到你的项目模块的公共依赖项，请执行以下步骤：

1.  在 **虚幻编辑器** 中打开你的虚幻引擎C++项目。
2.  选择 **工具（Tools）> 打开Visual Studio（Open Visual Studio）** ，打开Visual Studio。这会在Visual Studio中打开你的项目的C++源文件。
3.  要使用在线服务插件提供的C++代码，你必须将 `OnlineServicesInterface` 模块作为公共依赖项添加到你的项目的 **.Build.cs** 文件。
4.  在 **解决方案浏览器（Solution Explorer）** 中找到 **游戏（Games）> \[你的游戏\] > 源（Source）> \[你的游戏\] > \[你的游戏\].Build.cs** ，打开你的项目的 **.Build.cs** 文件。
5.  将 `OnlineServicesInterface` 和 `CoreOnline` 添加到你的 `.Build.cs` 公共依赖项。你的 `.Build.cs` 文件应该如下所示：
    
    ```cpp
         // 版权所有Epic Games, Inc.保留所有权利。
    		
         using UnrealBuildTool;
    		
         public class MyProject : ModuleRules
         {
             public MyProject(ReadOnlyTargetRules Target) : base(Target)
             {
                 PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;
                 PublicDependencyModuleNames.AddRange(new string[] { 
                     "Core", 
                     "CoreUObject", 
                     "Engine", 
                     "InputCore", 
                     "EnhancedInput", 
                     "OnlineServicesInterface", 
                     "CoreOnline" 
                 });
             }
         }
    ```
    
6.  在Visual Studio中保存你的更改。

### 生成项目文件

由于你对项目的 **.Build.cs** 文件做了更改，你需要刷新你的Visual Studio项目文件。这可确保你所做的更改反映在Visual Studio Intellisense中，并允许你在刚才添加的插件中使用该功能。

要生成项目文件，请执行以下步骤：

1.  关闭Visual Studio。
2.  在虚幻编辑器中返回你打开的项目。
3.  选择 **工具（Tools）> 刷新Visual Studio项目（Refresh Visual Studio Project）** ，重新生成你的Visual Studio项目文件。

界面上将显示进度条，显示你的代码项目的更新状态，进度条会在该过程完成后消失。

## 配置默认平台服务

最后一步是为在线服务插件指定你的默认平台服务。默认平台服务指定调用 `UE::Online::GetServices` 时返回哪些后端平台服务。[在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)文档页面上提供了可用平台标识符的列表。

要将在线服务Null指定为默认平台服务，请执行以下步骤：

1.  在Visual Studio中打开你的项目。为此，你可以从虚幻编辑器中找到 **工具（Tools）> 打开Visual Studio（Open Visual Studio）** 。
2.  在Visual Studio解决方案浏览器中找到 **游戏（Games）> \[你的游戏\] > 配置（Config）> DefaultEngine.ini** ，打开你的项目的 **DefaultEngine.ini** 文件。
3.  将以下内容添加到你的项目的 **DefaultEngine.ini** 文件：
    
    ```cpp
         [OnlineServices]
         DefaultServices=Null
    ```
    

在线服务Null是不使用后端在线服务的在线服务实现。这用于在没有后端服务的情况下测试和调试你的在线服务实现。如果你想使用不同的后端在线服务作为你的项目的默认在线服务，你可以从[在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)的[配置](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E9%85%8D%E7%BD%AE)章节中提供的列表中选择一个。

## 在你的项目中访问在线服务

在线服务插件现在已启用并配置完毕，可以在你的项目中使用了。要访问在线服务插件及其各种接口，请执行以下步骤：

1.  将 `#include "Online/OnlineServices.h"` 添加到你想在其中访问在线服务插件的文件。
2.  使用 `IOnlineServicesPtr OnlineServicesPtr = UE::Online::GetServices();` 获取默认平台服务的指针。

现在你可以访问不同的在线服务插件接口功能。例如，要访问[身份验证接口](/documentation/zh-cn/unreal-engine/auth-interface-in-unreal-engine)，请执行以下步骤：

1.  确保你首先获取了默认平台服务的指针。
2.  将 `#include "Online/Auth.h"` 添加到你想在其中访问身份验证接口的文件。
3.  使用 `IAuthPtr AuthPtr = OnlineServicesPtr->GetAuthInterface();` 获取身份验证接口的指针。

现在你可以通过身份验证接口指针访问身份验证接口的功能。相同逻辑适用于其他所有在线服务接口。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [online](https://dev.epicgames.com/community/search?query=online)
-   [online services](https://dev.epicgames.com/community/search?query=online%20services)
-   [null](https://dev.epicgames.com/community/search?query=null)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置在线服务插件](/documentation/zh-cn/unreal-engine/setup-and-configure-the-online-services-plugins-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%9C%A8%E7%BA%BF%E6%9C%8D%E5%8A%A1%E6%8F%92%E4%BB%B6)
-   [启用在线服务插件](/documentation/zh-cn/unreal-engine/setup-and-configure-the-online-services-plugins-in-unreal-engine#%E5%90%AF%E7%94%A8%E5%9C%A8%E7%BA%BF%E6%9C%8D%E5%8A%A1%E6%8F%92%E4%BB%B6)
-   [将在线服务插件添加到项目依赖项](/documentation/zh-cn/unreal-engine/setup-and-configure-the-online-services-plugins-in-unreal-engine#%E5%B0%86%E5%9C%A8%E7%BA%BF%E6%9C%8D%E5%8A%A1%E6%8F%92%E4%BB%B6%E6%B7%BB%E5%8A%A0%E5%88%B0%E9%A1%B9%E7%9B%AE%E4%BE%9D%E8%B5%96%E9%A1%B9)
-   [生成项目文件](/documentation/zh-cn/unreal-engine/setup-and-configure-the-online-services-plugins-in-unreal-engine#%E7%94%9F%E6%88%90%E9%A1%B9%E7%9B%AE%E6%96%87%E4%BB%B6)
-   [配置默认平台服务](/documentation/zh-cn/unreal-engine/setup-and-configure-the-online-services-plugins-in-unreal-engine#%E9%85%8D%E7%BD%AE%E9%BB%98%E8%AE%A4%E5%B9%B3%E5%8F%B0%E6%9C%8D%E5%8A%A1)
-   [在你的项目中访问在线服务](/documentation/zh-cn/unreal-engine/setup-and-configure-the-online-services-plugins-in-unreal-engine#%E5%9C%A8%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE%E4%B8%AD%E8%AE%BF%E9%97%AE%E5%9C%A8%E7%BA%BF%E6%9C%8D%E5%8A%A1)

相关文档

[

在线服务概述

![在线服务概述](https://dev.epicgames.com/community/api/documentation/image/604f7896-c9e6-4007-a408-d229c7789a29?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)

[

在线服务接口

![在线服务接口](https://dev.epicgames.com/community/api/documentation/image/76c6c27b-740d-4bc6-baac-a8fd8a45c8ac?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/online-services-interfaces-in-unreal-engine)
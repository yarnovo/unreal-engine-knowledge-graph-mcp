# 在虚幻引擎中建立项目 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-your-project-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:33:35.394Z

---

目录

![建立项目](https://dev.epicgames.com/community/api/documentation/image/06bbe113-caa3-4602-9088-d49f5e3689a5?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9112e027-0d85-47f9-8421-8542b96ab218/22-fps-settingup-section-result.png)

完成本节后你将会看到以上内容。

## 目的

本节旨在展示如何建立第一人称射击游戏项目。

## 目标

完成教程的这一节后，你将能够：

-   建立新项目
-   设置编辑器启动地图
-   在Visual Studio中打开项目
-   为项目添加日志消息
-   编译你的第一个C++类
-   设置默认游戏模式

## 步骤

-   1.1 - 建立项目
-   1.2 - 在Visual Studio中打开项目
-   1.3 - 添加日志消息
-   1.4 - 编译项目
-   1.5 - 设置默认游戏模式
-   1.6 - 第一节总结

## 1.1 - 建立项目

在这一步中，我们将使用虚幻引擎为我们的第一人称射击游戏(FPS)创建一个起始点。

1.  通过Epic启动器打开 **虚幻引擎**，然后选择[创建新项目](/documentation/zh-cn/unreal-engine/creating-a-new-project-in-unreal-engine)。
    
2.  点击 **游戏（Games）** 新项目类别。
    
3.  选择 **空白模板（Blank template）**。
    
4.  将项目类型更改为 **C++**，而非 **蓝图（Blueprint）**。
    
5.  禁用 **初学者内容包（Starter Content）**。
    
6.  将新项目命名为 **FPSProject**。
    
7.  为项目命名后，点击 **创建（Create）** 按钮。项目将在虚幻编辑器中自动打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11f8f22f-dfcc-41b1-96f8-92e71d98912c/01-fps-settingup-create-project-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11f8f22f-dfcc-41b1-96f8-92e71d98912c/01-fps-settingup-create-project-settings.png)
    
    点击查看大图
    
    如果使用了其他项目名称，则本教程中的一些代码示例需要相应更改。
    
8.  找到 **内容浏览器（Content Browser）**，依次点击 **引擎（Engine）> 内容（Content）> 地图（Maps）> 模板（Templates）**，双击 **Template\_Default** 关卡将其打开。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84d8ba0f-42fd-4e9d-8b48-c7baba5f0e78/02-fps-settingup-open-default-level.png)
9.  点击 **关卡编辑器工具栏** 中的 **运行（Play）**，进入 **编辑器内运行**（PIE）模式。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13919cba-0276-4af0-a729-35e80f600763/03-fps-settingup-play-button.png)
    
    用鼠标调整视角，同时使用WASD键在关卡内移动。
    
10.  按 **Shift + Esc** 键或在 **关卡编辑器工具栏** 点击 **停止（Stop）**，即可退出PIE模式。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1fd87c2a-634f-4ca3-abf2-99ed16fb7c83/04-fps-settingup-stop-button.png)
11.  你已完成对关卡的探索，现在转到 **内容浏览器（Content Browser）**，在 **Content** 文件夹下创建一个 **Maps** 文件夹（选择 **Content** 文件夹，在内容浏览器的文件窗口中点击右键，选择 **新建文件夹（New Folder）**）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a8936fe-f6e5-4015-b967-df9e69b1b62a/05-fps-settingup-maps-folder.png)
12.  在 **主** 菜单面板中点击 **文件（File）**，选择 **将当前关卡另存为（Save Current Level as...）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10b3c304-a1ac-4250-9375-edbd6e0cb8a2/06-fps-settingup-save-level-as.png)
13.  在 **关卡另存为（Save Level As）** 窗口中选择 **Map** 文件夹，将新地图命名为 **FPSMap**，然后点击 **保存（Save）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68b9acca-038a-40ba-b596-9d2e35f58646/07-fps-settingup-save-level-settings.png)
14.  在 **主** 菜单面板中点击 **编辑（Edit）** 并选择 **项目设置（Project Settings）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19450b5b-3f70-4f9c-b01a-eec56f390b0a/08-fps-settingup-open-project-settings.png)
15.  在 **项目设置（Project Settings）** 选项卡左侧的 **项目（Project）** 分段下，点击 **地图和模式（Maps & Modes）**。展开 **编辑器启动地图（Editor Startup Map）** 下拉菜单，选择 **FPSMap**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2eb15a1a-4030-4d33-89e2-f2ec04f0170c/09-fps-settingup-editor-default-map.png)
    
    从现在开始，编辑器将自动加载FPSMap作为默认地图。
    
16.  最后，关闭 **项目设置（Project Settings）** 菜单，保存项目，然后继续下一步骤。
    

## 1.2 - 在Visual Studio中打开项目

在上一步中建立 **基础代码（Basic Code）** 项目后，虚幻引擎为你创建了一个 **游戏模式（Game Mode）**。游戏模式定义游戏规则和获胜条件。游戏模式还会设置一些默认类，用于某些基本游戏玩法框架类型，包括Pawn、PlayerController和HUD等。在本节中，你将使用编辑器将你的项目作为解决方案在Visual Studio中打开，以便查看项目的游戏模式类。

1.  在 **主** 菜单面板中点击 **工具（Tools）** 菜单，选择 **打开Visual Studio（Open Visual Studio）**，在Visual Studio中打开C++代码。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8d719a3-eb4f-4062-83c4-f53031f2cb0e/10-fps-settingup-tools-menu-open-vs.png)
2.  在Visual Studio启动项目之后，你应该会在Visual Studio的 **解决方案资源管理器** 中看到 **.cpp** 和 **.h** 文件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4e2953c-43ff-4df1-8534-0ee4625e92d9/11-fps-settingup-vs-solution-explorer.png)
    
    如果示例图中的Visual Studio与你的Visual Studio看起来略有不同，无需紧张，此示例只是使用了深色主题。要启用深色主题，请依次点击：**工具（Tools）> 选项（Options）> 环境（Environment）> 常规（General）> 颜色主题（Color Theme）**。
    
3.  展开 **源代码（Source）**，然后展开 **FPSProject** 以查看你的新游戏的主要文件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45e99265-d584-4e20-89ed-d78af966856d/12-fps-settingup-vs-expand-source.png)
4.  打开FPSProjectGameModeBase.cpp。文件内容应如下所示：
    
    FPSProjectGameModeBase.cpp
    
    ```cpp
        // Epic Games, Inc版权所有。保留所有权利。
         
        #include "FPSProjectGameModeBase.h"
    ```
    
5.  现在打开FPSProjectGameModeBase.h。文件内容应如下所示：
    
    FPSProjectGameModeBase.h
    
    ```cpp
        // Epic Games, Inc版权所有。保留所有权利。
             
        #pragma once
             
        #include "CoreMinimal.h"
        #include "GameFramework/GameModeBase.h"
        #include "FPSProjectGameModeBase.generated.h"
             
        /**
         * 
         */
        UCLASS()
        class FPSPROJECT_API AFPSProjectGameModeBase : public AGameModeBase
        {
            GENERATED_BODY()
        };
    ```
    
6.  现在你已经在Visual Studio中打开了C++项目，可以开始向项目中添加代码了。
    

## 1.3 - 添加日志消息

向项目中添加代码的一个不错的起点是向 **FPSGameMode** 添加一条日志消息。日志消息对于在开发期间验证和调试代码非常有用。在这一步中，你将使用日志消息来验证自己确实在使用 **FPSGameMode** 而非虚幻引擎提供的默认游戏模式。

### FPSProjectGameMode头文件

1.  在 **解决方案资源管理器** 中，展开 **FPSProject > 源代码（Source） > FPSProject**。
    
2.  双击 `FPSProjectGameModeBase.h` 打开 **FPSGameMode** 类的头文件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17125f10-5b6b-4a6b-8073-440ffe1457d3/13-fps-settingup-header-file.png)
3.  类声明应该如下所示：
    
    FPSProjectGameModeBase.h
    
    ```cpp
        UCLASS()
        class FPSPROJECT_API AFPSProjectGameModeBase : public AGameModeBase
        {
            GENERATED_BODY()
            
        };
    ```
    
4.  在 `AFPSProjectGameMode` 构造函数声明下方添加以下函数声明：
    
    FPSProjectGameModeBase.h
    
    ```cpp
       virtual void StartPlay() override;
    ```
    
      
    
    此函数声明允许你重载\[StartPlay\]((API:AGameModeBase::StartPlay)，以便游戏启动时在屏幕上打印日志消息。
    
5.  `FPSProjectGameMode.h` 现在应如下所示：
    
    FPSProjectGameModeBase.h
    
    \~~~ // Epic Games, Inc版权所有。保留所有权利。
    
    #pragma once
    
    #include "CoreMinimal.h" #include "GameFramework/GameModeBase.h" #include "FPSProjectGameModeBase.generated.h"
    
    /*\** \*/ UCLASS() class FPSPROJECT\_API AFPSProjectGameModeBase : public AGameModeBase { GENERATED\_BODY()
    
    virtual void StartPlay() override; }; ~~~
    
6.  在Visual Studio中保存你的头文件 `FPSProjectGameMode.h` 。
    

### FPSProjectGameMode CPP文件

1.  在 **解决方案资源管理器** 中，找到 **FPSProject > 源代码（Source）> FPSProject**。
    
2.  双击 `FPSProjectGameModeBase.cpp` 打开 **FPSGameModeBase** 类的实现文件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f57b535a-adf4-4e69-97e2-0fbba7d3c8e6/14-fps-settingup-cpp-file.png)
3.  现在将以下代码行添加到该文件中：
    
    FPSProjectGameModeBase.cpp
    
    ```cpp
        void AFPSProjectGameModeBase::StartPlay()
        {
            Super::StartPlay();
    	 
            check(GEngine != nullptr);
    	
            // 显示调试消息五秒。
            // -1"键"值参数能防止该消息被更新或刷新。
            GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Yellow, TEXT("Hello World, this is FPSGameMode!"));
        }
    ```
    
    游戏启动时，`StartPlay()` 将在屏幕上打印一条新的调试消息（"Hello World, this is FPSGameModeBase!"），采用黄色文本，显示五秒钟。
    
4.  `FPSProjectGameModeBase.cpp` 此时应如下所示：
    
    FPSProjectGameModeBase.cpp
    
    ```cpp
        // Epic Games, Inc版权所有。保留所有权利。
      
        #include "FPSProjectGameMode.h"
     
        void AFPSProjectGameModeBase::StartPlay()
        {
            Super::StartPlay();
    	 
            check(GEngine != nullptr);
        
            // 显示调试消息五秒。
            // -1"键"值参数能防止该消息被更新或刷新。
            GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Yellow, TEXT("Hello World, this is FPSGameModeBase!"));
        }
    ```
    
5.  在Visual Studio中保存 `FPSProjectGameModeBase.cpp` 实现文件。
    

## 1.4 - 编译项目

现在可以编译项目了，这样你就能看到新代码在游戏中的表现。

1.  回到编辑器，点击 **编译（Compile）** 按钮编译代码。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4426099a-b491-4146-8434-0ea36effc90b/15-fps-settingup-compile-project.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4426099a-b491-4146-8434-0ea36effc90b/15-fps-settingup-compile-project.png)
    
    因为你的项目以C++项目的形式进行开发，所以可以从虚幻编辑器中直接编译CPP代码。 点击查看大图
    
2.  点击 **关卡编辑器工具栏** 中的 **运行（Play）** 按钮，进入在编辑器内运行（PIE）模式。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02c61a90-492a-474d-a898-65914c4a29cf/16-fps-settingup-pie-game-mode.png)
    
    你可能有点迷惑，在PIE模式下时，日志消息为何没有显示在屏幕上。未看到日志消息的原因是，在当前开发阶段，编辑器仍在使用默认游戏模式。
    
3.  按 **Shift + Escape** 或在 **关卡编辑器工具栏** 中点击 **停止（Stop）** 按钮，即可退出PIE模式。
    

### 将你的C++游戏模式类扩展到蓝图

现在可以将C++游戏模式类扩展到蓝图了。关于此类扩展更多信息，请参阅[C++和蓝图](/documentation/zh-cn/unreal-engine/cpp-and-blueprints-example)参考页面 。

1.  在 **Content** 文件夹中创建一个 **Blueprints** 文件夹。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ce7ba23-1341-46a9-83ae-9c453048b80e/17-fps-settingup-blueprints-folder.png)
2.  右键点击 **C++类（C++ Classes）** > **FPSProject** 中的 **FPSProjectGameModeBase** 类，打开 **C++类操作（C++ Class Actions）** 菜单。
    
3.  点击 **基于FPSProjectGameModeBase创建蓝图类（Create Blueprint class based on FPSProjectGameModeBase）** 打开 **添加蓝图类（Add Blueprint Class）** 对话框菜单。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d9a1b85-a4ae-4bf5-9d92-976456827b28/18-fps-settingup-create-derived-bp-class.png)
4.  将你的新蓝图类命名为 **BP\_FPSProjectGameModeBase**，然后选择 **Blueprint** 文件夹，点击 **创建蓝图类（Create Blueprint Class）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f579d2b-3bd7-4503-9a8b-4d37e6721be4/19-fps-settingup-add-bp-class.png)
5.  此时，你将拥有一个新创建的 `BP_FPSProjectGameModeBase` 蓝图类，位于 **Blueprint** 文件夹内。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7c962ae-8fa9-43be-8abd-78f68a6a5071/20-fps-settingup-created-bp-class.png)
6.  请确保在关闭 **蓝图编辑器** 之前保存你的 **BP\_FPSProjectGameModeBase** 蓝图。
    

## 1.5 - 设置默认游戏模式

现在你已经成功地将新修改的游戏模式扩展到蓝图，在本步骤中，你需要设置你的项目，使用 `BP_FPSProjectGameModeBase` 作为默认 **游戏模式**。

1.  点击 **主** 菜单面板中的 **编辑（Edit）**，选择 **项目设置（Project Settings）**。
    
2.  在 **项目设置（Project Settings）** 选项卡左侧的 **项目（Project）** 分段下，点击 **地图和模式（Maps & Modes）**。展开 **默认游戏模式（Default GameMode）** 下拉菜单，选择 **BP\_FPSGameModeBase**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3c37d99-beed-4d43-ad59-1b697fd02941/21-fps-settingup-setting-default-gamemode.png)
3.  关闭 **项目设置（Project Settings）** 菜单。
    
4.  点击 **关卡编辑器工具栏** 中的 **运行（Play）** 按钮。"Hello World, this is FPSGameMode!"这句话应在视口左上角以黄色文本显示五秒钟。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16a347d3-de1b-4e1f-b40b-fcd6837b642c/22-fps-settingup-section-result.png)
5.  按 **Shift + Escape** 键或在 **关卡编辑器工具栏** 中点击 **停止（Stop）** 按钮，即可退出编辑器内运行（PIE）模式。
    

## 1.6 第一节总结

FPSProjectGameModeBase.h

```cpp
// Epic Games, Inc版权所有。保留所有权利。
 
#pragma once
 
#include "CoreMinimal.h"
#include "GameFramework/GameModeBase.h"
#include "FPSProjectGameModeBase.generated.h"
 
/**
 * 
 */
UCLASS()
class FPSPROJECT_API AFPSProjectGameModeBase : public AGameModeBase
{
    GENERATED_BODY()
 
    virtual void StartPlay() override;
};
```

FPSProjectGameModeBase.cpp

```cpp
// Epic Games, Inc版权所有。保留所有权利。
          
#include "FPSProjectGameMode.h"
 
void AFPSProjectGameMode::StartPlay()
{
    Super::StartPlay();
 
    checkGEngine != nullptr);
    
      // 显示调试消息五秒。 
      // -1"键"值参数可防止该消息被更新或刷新。
      GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Yellow, TEXT("Hello World, this is FPSGameModeBase!"));
}
```

恭喜！你已经学会了如何：

✓ 建立新项目  
✓ 在Visual Studio中打开项目  
✓ 向项目中添加日志消息  
✓ 编译你的第一个C++类  
✓ 设置默认游戏模式

在下一节中，我们将学习如何添加游戏角色，相信你已经准备好了！

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [目的](/documentation/zh-cn/unreal-engine/setting-up-your-project-in-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [目标](/documentation/zh-cn/unreal-engine/setting-up-your-project-in-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [步骤](/documentation/zh-cn/unreal-engine/setting-up-your-project-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [1.1 - 建立项目](/documentation/zh-cn/unreal-engine/setting-up-your-project-in-unreal-engine#11-%E5%BB%BA%E7%AB%8B%E9%A1%B9%E7%9B%AE)
-   [1.2 - 在Visual Studio中打开项目](/documentation/zh-cn/unreal-engine/setting-up-your-project-in-unreal-engine#12-%E5%9C%A8visualstudio%E4%B8%AD%E6%89%93%E5%BC%80%E9%A1%B9%E7%9B%AE)
-   [1.3 - 添加日志消息](/documentation/zh-cn/unreal-engine/setting-up-your-project-in-unreal-engine#13-%E6%B7%BB%E5%8A%A0%E6%97%A5%E5%BF%97%E6%B6%88%E6%81%AF)
-   [FPSProjectGameMode头文件](/documentation/zh-cn/unreal-engine/setting-up-your-project-in-unreal-engine#fpsprojectgamemode%E5%A4%B4%E6%96%87%E4%BB%B6)
-   [FPSProjectGameMode CPP文件](/documentation/zh-cn/unreal-engine/setting-up-your-project-in-unreal-engine#fpsprojectgamemodecpp%E6%96%87%E4%BB%B6)
-   [1.4 - 编译项目](/documentation/zh-cn/unreal-engine/setting-up-your-project-in-unreal-engine#14-%E7%BC%96%E8%AF%91%E9%A1%B9%E7%9B%AE)
-   [将你的C++游戏模式类扩展到蓝图](/documentation/zh-cn/unreal-engine/setting-up-your-project-in-unreal-engine#%E5%B0%86%E4%BD%A0%E7%9A%84c++%E6%B8%B8%E6%88%8F%E6%A8%A1%E5%BC%8F%E7%B1%BB%E6%89%A9%E5%B1%95%E5%88%B0%E8%93%9D%E5%9B%BE)
-   [1.5 - 设置默认游戏模式](/documentation/zh-cn/unreal-engine/setting-up-your-project-in-unreal-engine#15-%E8%AE%BE%E7%BD%AE%E9%BB%98%E8%AE%A4%E6%B8%B8%E6%88%8F%E6%A8%A1%E5%BC%8F)
-   [1.6 第一节总结](/documentation/zh-cn/unreal-engine/setting-up-your-project-in-unreal-engine#16%E7%AC%AC%E4%B8%80%E8%8A%82%E6%80%BB%E7%BB%93)

相关文档

[

第一人称射击游戏教程

![第一人称射击游戏教程](https://dev.epicgames.com/community/api/documentation/image/84299dcc-b92a-4600-91bc-946ae4bd4b79?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/first-person-shooter-tutorial-in-unreal-engine)
# 在虚幻引擎中添加角色 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:33:37.030Z

---

目录

![2 - 添加角色](https://dev.epicgames.com/community/api/documentation/image/a5134264-0731-4b1b-8bc6-37613b044f98?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [建立项目](/documentation/zh-cn/unreal-engine/setting-up-your-project-in-unreal-engine)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4fb71e54-7f5c-41bd-8a81-668c04daef63/41-result.png)

这是你完成本章节后将了解的内容。

## 目标

本章节旨在向你展示如何添加第一人称射击角色。

## 目的

完成本章节的教程，你将能够：

-   创建新角色
-   设置轴映射
-   实现角色移动函数
-   实现鼠标摄像机控制
-   实现角色跳跃
-   将网格体添加到角色
-   更改摄像机视角
-   将第一人称网格体添加到角色

## 步骤

-   2.1 - 创建新角色
-   2.2 - 设置轴映射
-   2.3 - 实现角色移动函数
-   2.4 - 实现鼠标摄像机控制
-   2.5 - 实现角色跳跃
-   2.6 - 将网格体添加到角色
-   2.7 - 更改摄像机视角
-   2.8 - 将第一人称网格体添加到角色

## 2.1 创建新角色

在此步骤中，你将使用引擎的 **Character** 基类在 **虚幻引擎**（UE）中创建一个新角色。角色类（派生自 **Pawn** 类）的内置功能支持走、跑和跳等双足运动。

### 添加Character类

虽然你可以手动将 `.h` 和 `.cpp` 文件添加到你的 **Visual Studio** (VS)解决方案，但使用 **C++类向导** 将新类添加到你的项目是一种很好的做法。

使用C++类向导，引擎hui 创建头文件和源文件模板，这些模板文件将为你预先设置一些虚幻特定的宏。

1.  在UE中启动 **FPSproject**（如果你尚未完成此操作）。
    
2.  在 **主（Main）** 菜单面板中点击 **工具（Tools）**，选择 **新建C++类...（New C++ Class...）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a94d7b7c-7091-4672-b413-c8b87e8ad7dd/01-new-cpp-class.png)
3.  在弹出的 **选择父类（Choose Parent Class）** 窗口中选择 **Character** 作为父类，然后点击 **下一步（Next）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2acab30f-6f90-448b-95af-999679112573/02-choose-parent-class.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2acab30f-6f90-448b-95af-999679112573/02-choose-parent-class.png)
    
    Click for full image.
    
4.  将新类命名为"FPSCharacter"，然后点击 **创建类（Create Class）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/910f5230-e078-4539-9517-d7ce50025ed6/03-name-new-class.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/910f5230-e078-4539-9517-d7ce50025ed6/03-name-new-class.png)
    
    Click for full image.
    

### 确认Character类

1.  在VS的 **解决方案浏览器（Solution Explorer）** 中，依次展开 **FPSProject > 源（Source）> FPSProject**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e71400d0-e0bb-4514-9229-a675819427e3/04-expand-fpsproject.png)
2.  点击 `FPSCharacter.cpp`，打开 **FPSCharacter** 类的实现文件。
    
3.  在 `void AFPSCharacter::BeginPlay()` 函数（在 `Super::BeginPlay();` 下面）中添加以下代码行，以便确认正在使用 `FPSCharacter` 类：
    
    FPSCharacter.cpp
    
    ```cpp
        check(GEngine != nullptr);
    
        // 显示调试消息五秒。 
        // -1"键"值参数可以防止更新或刷新消息。
        GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Red, TEXT("We are using FPSCharacter."));
    ```
    
4.  现在 `FPSCharacter.cpp` 的内容应如下所示：
    
    FPSCharacter.cpp
    
    ```cpp
        //Epic Games, Inc版权所有。保留所有权利。
                
        #include "FPSCharacter.h"
    
        // 设置默认值
        AFPSCharacter::AFPSCharacter()
        {
            // 将此角色设置为每帧调用Tick()。  如果不需要此特性，可以关闭以提升性能。
            PrimaryActorTick.bCanEverTick = true;
    
        }
    
        // 当游戏开始或重生（Spawn）时被调用
        void AFPSCharacter::BeginPlay()
        {
            Super::BeginPlay();
    
            check(GEngine != nullptr);
    
            // 显示调试消息五秒。 
            // -1"键"值参数可以防止更新或刷新消息。
             GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Red, TEXT("We are using FPSCharacter."));
        
        }
    
        // 每一帧都被调用
        void AFPSCharacter::Tick(float DeltaTime)
        {
            Super::Tick(DeltaTime);
    
        }
    
        // 被调用，将功能与输入绑定
        void AFPSCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
        {
            Super::SetupPlayerInputComponent(PlayerInputComponent);
    
        }
    ```
    
5.  在Visual Studio中保存 `FPSCharacter.cpp` 文件。
    
6.  在 **解决方案浏览器（Solution Explorer）** 中找到 **FPSProject**。
    
    到目前为止，你一直在使用编辑器的 **构建(Build)** 按钮编译项目。在此步骤中，你将使用Visual Studio的构建功能来编译代码。要在Visual Studio中编译代码，请右键点击 **FPSProject**，并选择 **构建（Build）** 来编译项目。
    
7.  要使用V中编译代码，请右键点击 **解决方案浏览器（Solution Explorer）** 中的 **FPSProject**，并选择 **构建（Build）** 来编译项目。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/215f708e-3d9a-40a4-b824-e149e70639e0/05-build-project.png)
    
    在进行此步骤前，请确保将虚幻引擎中的 **启用实时编码（Enable Live Coding）** 禁用。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ef0ee1c-7d27-4ada-8728-4f0180bac99a/06-disable-live-coding.png)
    
    如果你使用的是VS的默认设置，应该会在界面底部附近（可能在代码编辑器的下方）会看到一个对话框。当你点击构建（Build）后，在处理过程中该对话框中应该会显示一些信息，希望最后显示的是构建成功的信息。 如果构建失败也不要紧张！回头看看你之前的操作步骤，确保你的代码与此处和[建立项目](/documentation/zh-cn/unreal-engine/setting-up-your-project-in-unreal-engine)中列出的内容相同。
    
8.  构建完成后，打开虚幻编辑器，确认新编译的 **FPSCharacter** 类在 **内容浏览器** 中可见。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16a4dcd6-bde7-4022-b12c-614f11726d38/07-character-content-browser.png)

### 将你的C++ FPS Character类扩展到蓝图

现在可以将C++ FPS Character类扩展到蓝图了（类似之前你在[C++和蓝图](/documentation/zh-cn/unreal-engine/cpp-and-blueprints-example)中进行的FPSProject游戏模式操作）。你也可以前往[C++和蓝图](/documentation/zh-cn/unreal-engine/cpp-and-blueprints-example)参考页面了解更多关于将C++类扩展到蓝图的信息。

1.  右键点击 **内容浏览器（Content Browser）** 中的 **FPSCharacter** 类，打开 **操作（Actions）** 菜单。
    
2.  点击 **基于FPSCharacter创建蓝图类（Create Blueprint class based on FPSCharacter）**，打开 **添加蓝图类（Add Blueprint Class）** 对话框菜单。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dfa13b1a-5270-4d05-8da2-2987bfe7c37f/08-create-derived-bp-class.png)
3.  将新的蓝图类命名为 `BP_FPSCharacter`，并选择 **Blueprints** 文件夹，然后点击 **创建蓝图类（Create Blueprint Class）** 按钮。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20d34f93-0420-49fb-99bc-9f5e6ae66725/09-add-derived-bp-class-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20d34f93-0420-49fb-99bc-9f5e6ae66725/09-add-derived-bp-class-settings.png)
    
    点击查看大图。
    
4.  现在，你应该可以在 **Blueprints** 文件夹内看到新创建的 `BP_FPSCharacter` 蓝图类了。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c43b131c-71cf-4362-9fdb-50ed55aff82e/10-added-derived-bp-class.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c43b131c-71cf-4362-9fdb-50ed55aff82e/10-added-derived-bp-class.png)
    
    点击查看大图。
    
5.  请确保在关闭 **蓝图编辑器（Blueprint Editor）** 前 **保存** 你的 **BP\_FPSCharacter** 蓝图。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9731ee2d-75ed-4c42-b63b-98ca9712198a/27-compile-save.png)

### 设置默认的Pawn类

现在你已经成功地把新修改的游戏模式扩展到了蓝图，接下来你需要在此步骤中设置项目，将 `BP_FPSCharacter` 作为默认的 **Pawn**。

1.  点击 **主（Main）** 菜单面板中的 **编辑（Edit）**，选择 **项目设置（Project Settings）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01c350cf-99ad-4433-8c8a-eb9dc097f50f/11-open-project-settings.png)
2.  在 **项目设置（Project Settings）** 选项卡左侧的 **项目（Project）** 标题栏下，点击 **地图和模式（Maps & Modes）**。
    
3.  展开 **已选择的游戏模式（Selected GameMode）** 分段，并在 **默认Pawn类（Default Pawn Class）** 下拉菜单中选择 **BP\_FPSCharacter**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c852d70-ae62-474f-ab46-7c5f06b37de8/12-set-default-pawn-class.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c852d70-ae62-474f-ab46-7c5f06b37de8/12-set-default-pawn-class.png)
    
    点击查看大图。
    
4.  关闭 **项目设置（Project Settings）** 菜单。
    
5.  在 **关卡编辑器工具栏（Level Editor Toolbar）** 中点击 **运行（Play）** 按钮。在视口左上角，红色文本"We are using FPSCharacter."将显示在"Hello World, this is FPSGameMode!"的下方，并持续5秒钟。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8345cf93-a5d0-4172-b7a4-b83247bbfacd/13-verifying-result.png)
    
    如果你无法移动，说明你已经正确地将FPSCharacter用作了Pawn！你的新角色还没有任何移动功能按钮，因此你还不能在关卡中四处移动。
    
6.  在进入下一步前，按 **Shift + Escape** 或在 **关卡编辑器工具栏（Level Editor Toolbar）** 中点击 **停止（Stop）**，退出PIE模式。
    

## 2.2 - 设置轴映射

通常，轴映射支持将键盘、鼠标和控制器输入映射到"友好名称"，该名称稍后可以绑定到游戏行为上（例如移动）。轴映射会不断被轮询，从而实现无缝的移动过渡和流畅的游戏行为。硬件轴（例如游戏摇杆）所提供的输入值为程度值，而不是离散的数字输入（例如，按下为1，不按下为0）。虽然游戏摇杆输入方法在提供可平滑伸缩的移动输入方面很有效，但轴映射也可以将常见的移动键（如WASD键或箭头键）映射到持续轮询的游戏行为。

在继续此步骤之前，如果你想要了解有关玩家输入的更多信息，请参阅[玩家输入和Pawn](/documentation/zh-cn/unreal-engine/quick-start-guide-to-player-input-in-unreal-engine-cpp)教程。在此步骤中，你将设置W、A、S和D键的输入轴映射，从而使新角色可以在地图上四处移动。

### 向前移动轴映射

1.  点击 **主（Main）** 菜单面板中的 **编辑（Edit）**，选择 **项目设置（Project Settings）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1d9a79e-39c7-4043-8a7c-3e74313da96f/11-open-project-settings.png)
2.  在 **项目设置（Project Settings）** 选项卡左侧的 **引擎（Engine）** 标题栏下，点击 **输入（Input）**。
    
3.  在 **绑定（Bindings）** 分段中，点击 **轴映射（Axis Mappings）** 旁边的加号。
    
4.  点击 **轴映射（Axis Mappings）** 左侧的箭头。
    
5.  在出现的文本框中输入"MoveForward"。
    
6.  在下拉菜单中，从 **键盘（Keyboard）** 下拉列表中选择 **W**。
    
7.  现在输入设置界面应如下图所示：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fdf292cd-910e-4564-90c0-65c5f7754cdc/14-move-forward-w.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fdf292cd-910e-4564-90c0-65c5f7754cdc/14-move-forward-w.png)
    
    点击查看大图。
    
8.  点击 **MoveForward** 旁边的加号。
    
9.  在第二个下拉菜单中，从 **键盘（Keyboard）** 下拉列表中选择 **S**。
    
10.  在 **S** 旁边的 **比例（Scale）** 字段中输入"-1.0"。
    
11.  现在输入设置界面应如下图所示：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6163c55-808f-4135-b857-7c749acaa6e1/15-move-forward-s.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6163c55-808f-4135-b857-7c749acaa6e1/15-move-forward-s.png)
    
    点击查看大图。
    

### 向右移动轴映射

1.  在 **绑定（Bindings）** 分段中，点击 **轴映射（Axis Mappings）** 旁边的加号。
    
2.  在出现的文本字段中输入"向右移动（MoveForward）"。
    
3.  在下拉菜单中，从 **键盘（Keyboard）** 下拉列表中选择 **D**。
    
4.  现在输入设置界面应如下图所示：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e9b67b1-bf06-4b62-aa07-10eb9357ded4/16-move-right-d.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e9b67b1-bf06-4b62-aa07-10eb9357ded4/16-move-right-d.png)
    
    点击查看大图。
    
5.  点击 **向右移动（MoveRight）** 旁边的加号。
    
6.  在第二个下拉菜单中，从 **键盘（Keyboard）** 下拉列表中选择 **A**。
    
7.  在 **A** 旁边的 **比例（Scale）** 字段中输入"-1.0"。
    
8.  现在输入设置界面应如下图所示：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61a043a2-2164-4ef9-82eb-a4ce9eb2ea84/17-move-right-a.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61a043a2-2164-4ef9-82eb-a4ce9eb2ea84/17-move-right-a.png)
    
    点击查看大图。
    
9.  现在你已设置好向移动轴映射，请关闭 **项目设置（Project Settings）** 菜单并继续。
    

## 2.3 - 实现角色移动函数

在此步骤中，你将设置玩家输入组件（Player Input Component），并在 **FPSCharacter** 类中实现以下函数：

-   `MoveForward`
-   `MoveRight`

### 移动函数接口

你已经设置好 **FPSCharacter** 的轴映射，现在可以切换到VS中的项目界面。

1.  在 `FPSCharacter.h` 中，将以下函数声明添加到的 `SetupPlayerInputComponent` 的 `public` 访问说明符下方。
    
    FPSCharacter.h
    
    ```cpp
        // 处理用于前后移动的输入。
        UFUNCTION()
        void MoveForward(float Value);
     
        // 处理用于左右移动的输入。
        UFUNCTION()
        void MoveRight(float Value);
    ```
    
    `UFUNCTION` 宏（位于每个函数上方）让引擎可以发觉这些函数，以便将它们纳入序列化和其他引擎功能中。
    
2.  现在的 `FPSCharacter.h` 应如下所示：
    
    FPSCharacter.h
    
    ```cpp
        //Epic Games, Inc版权所有。保留所有权利。
             
        #pragma once
             
        #include "CoreMinimal.h"
        #include "GameFramework/Character.h"
        #include "FPSCharacter.generated.h"
             
        UCLASS()
        class FPSPROJECT_API AFPSCharacter : public ACharacter
        {
            GENERATED_BODY()
             
        public:
            // 为此角色的属性设置默认值
            AFPSCharacter();
             
        protected:
            // 当游戏开始或重生（Spawn）时被调用
            virtual void BeginPlay() override;
             
        public:
            // 每一帧都被调用
            virtual void Tick( float DeltaTime ) override;
             
            // 被调用，将功能与输入绑定
            virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;
             
            // 处理用于前后移动的输入。
            UFUNCTION()
            void MoveForward(float Value);
             
            // 处理用于左右移动的输入。
            UFUNCTION()
            void MoveRight(float Value);
             
        };
    ```
    

### 移动函数的实现

在典型的FPS控制模式中，角色的移动轴是相对于摄像机的。 "向前"移动是指"摄像机指向的方向"，"向右"是指"摄像机指向方向的右侧"。 你将使用 `PlayerController` 获取角色的控制旋转。 另外， `MoveForward` 函数将忽略控制旋转的俯仰（Pitch）组件，将输入限制在XY平面上，以确保在你向上或向下看时，你的角色将沿着地面移动。

1.  在 `FPSCharacter.cpp` 中，将以下行添加到`SetupPlayerInputComponent` 函数中的 `Super::SetupPlayerInputComponent(PlayerInputComponent);` 下方 。
    
    FPSCharacter.cpp
    
    ```cpp
        // 设置"移动"绑定。
        PlayerInputComponent->BindAxis("MoveForward", this, &AFPSCharacter::MoveForward);
        PlayerInputComponent->BindAxis("MoveRight", this, &AFPSCharacter::MoveRight);
    ```
    
    `InputComponent` 是定义如何处理输入数据的组件。可以将 `InputComponent` 附加到想要接收输入的Actor。
    
2.  在 `FPSCharacter.cpp` 中，在 `SetupPlayerInputComponent` 函数定义的下方，添加以下 `MoveForward` 函数定义。
    
    FPSCharacter.cpp
    
    ```cpp
        void AFPSCharacter::MoveForward(float Value)
        {
            // 找出"前进"方向，并记录玩家想向该方向移动。
            FVector Direction = FRotationMatrix(Controller->GetControlRotation()).GetScaledAxis(EAxis::X);
            AddMovementInput(Direction, Value);
        }
    ```
    
3.  在 `FPSCharacter.cpp` 中，在 `MoveForward` 函数定义下方，添加以下 `MoveRight` 函数定义。
    
    FPSCharacter.cpp
    
    ```cpp
        void AFPSCharacter::MoveRight(float Value)
        {
            // 找出"右侧"方向，并记录玩家想向该方向移动。
            FVector Direction = FRotationMatrix(Controller->GetControlRotation()).GetScaledAxis(EAxis::Y);
            AddMovementInput(Direction, Value);
        }
    ```
    
4.  现在的 `FPSCharacter.cpp` 应如下所示：
    
    FPSCharacter.cpp
    
    ```cpp
        //Epic Games, Inc版权所有。保留所有权利。
                      
        #include "FPSCharacter.h"
             
        // 设置默认值
        AFPSCharacter::AFPSCharacter()
        {
            // 将此角色设置为每帧调用Tick()。  如果不需要此特性，可以关闭以提升性能。
            PrimaryActorTick.bCanEverTick = true;
             
        }
             
        // 当游戏开始或重生（Spawn）时被调用
        void AFPSCharacter::BeginPlay()
        {
            Super::BeginPlay();
             
            check(GEngine != nullptr);
                
              // 显示调试消息五秒。 
            // -1"键"值参数可以防止更新或刷新消息。
              GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Red, TEXT("We are using FPSCharacter."));
                
        }
             
        // 每一帧都被调用
        void AFPSCharacter::Tick( float DeltaTime )
        {
            Super::Tick( DeltaTime );
             
        }
             
        // 被调用，将功能与输入绑定
        void AFPSCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
        {
            Super::SetupPlayerInputComponent(PlayerInputComponent);
             
            // 设置"移动"绑定。
            PlayerInputComponent->BindAxis("MoveForward", this, &AFPSCharacter::MoveForward);
            PlayerInputComponent->BindAxis("MoveRight", this, &AFPSCharacter::MoveRight);
        }
             
        void AFPSCharacter::MoveForward(float Value)
        {
            // 找出"前进"方向，并记录玩家想向该方向移动。
            FVector Direction = FRotationMatrix(Controller->GetControlRotation()).GetScaledAxis(EAxis::X);
            AddMovementInput(Direction, Value);
        }
             
        void AFPSCharacter::MoveRight(float Value)
        {
            // 找出"右侧"方向，并记录玩家想向该方向移动。
            FVector Direction = FRotationMatrix(Controller->GetControlRotation()).GetScaledAxis(EAxis::Y);
            AddMovementInput(Direction, Value);
        }
    ```
    

### 测试角色移动

现在我们来编译和测试新实现的角色移动函数。

1.  在VS中保存 **FPSCharacter** 的头文件 `.h`和 `.cpp` 文件。
    
2.  找到 **解决方案浏览器（Solution Explorer）** 并选择 **FPSProject**。
    
3.  右键点击 **FPSProject** 并选择 **构建（Build）**，编译你的项目。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/317d7831-a3b5-4bb3-bf08-a6212ce52a80/05-build-project.png)
4.  构建完毕后，在虚幻编辑器中打开 **FPSProject**。
    
5.  在 **关卡编辑器工具栏（Level Editor Toolbar）** 中点击 **运行（Play）**。现在，你可以使用 **WSAD** 键向前后左右移动了。
    
6.  按 **Shift + Escape** 或在 **关卡编辑器工具栏（Level Editor Toolbar）** 中点击 **停止（Stop）**，退出PIE模式。
    

## 2.4 - 实现鼠标摄像机控制

在此步骤中，你将为角色添加能够环顾四周并用鼠标操纵的功能。

### 转向轴映射

1.  在 **主（Main）** 菜单面板中点击 **编辑（Edit)**，并选择 **项目设置（Project Settings）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37c691f0-dcd7-42fc-a436-8da24fabbe0f/11-open-project-settings.png)
2.  在 **项目设置（Project Settings）** 选项卡左侧的 **引擎（Engine）** 标题栏下，点击 **输入（Input）**。
    
3.  在 **绑定（Bindings）** 分段中，点击 **轴映射（Axis Mappings）** 旁边的加号。
    
4.  点击 **轴映射（Axis Mappings）** 左侧的箭头。
    
5.  在出现的文本输入框中输入"Turn"。
    
6.  在下拉菜单中，在 **鼠标（Mouse）** 下拉列表中选择 **鼠标X（Mouse X）**。
    
7.  现在输入设置界面应如下图所示：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/645a8810-d49a-4902-8b8b-e1dae202354a/18-turn.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/645a8810-d49a-4902-8b8b-e1dae202354a/18-turn.png)
    
    点击查看大图。。
    

### 查找轴映射

1.  在 **绑定（Bindings）** 分段中，点击 **轴映射（Axis Mappings）** 旁边的加号。
    
2.  在出现的文本输入框中输入"LookUp"。
    
3.  在下拉菜单中，从 **鼠标（Mouse）** 下拉列表中选择 **鼠标Y（Mouse Y）**。
    
4.  在 **鼠标Y（Mouse Y）** 旁边的 **比例（Scale）** 输入框中输入"-1.0"。
    
5.  现在输入设置界面应如下图所示：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43af92b5-f204-4383-b59b-eb936bcc86b2/19-look-up.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43af92b5-f204-4383-b59b-eb936bcc86b2/19-look-up.png)
    
    点击查看大图。
    
6.  关闭 **项目设置（Project Settings）** 菜单。
    

### 实现输入处理

现在可以添加代码处理鼠标输入来实现转向和抬头看了。 `Character` 基类为我们定义了两个必要函数，即：

-   `AddControllerYawInput`
-   `AddControllerPitchInput`
    
    如果你想要执行更多的处理，例如增加对灵敏度或轴反转的支持，那么你可以提供自己的函数，以便在将输入值传递给函数之前对其进行调整。但是，在本示例中，你将直接将输入绑定到 `AddControllerYawInput` 和 `AddControllerPitchInput` 函数。
    

1.  将以下代码行添加到 `FPSCharacter.cpp` 中的 `SetupPlayerInputComponent` 函数。
    
    FPSCharacter.cpp
    
    ```cpp
        // 设置"观看"绑定。
        PlayerInputComponent->BindAxis("Turn", this, &AFPSCharacter::AddControllerYawInput);
        PlayerInputComponent->BindAxis("LookUp", this, &AFPSCharacter::AddControllerPitchInput);
    ```
    
2.  `SetupPlayerInputComponent` 函数应如下图所示：
    
    FPSCharacter.cpp
    
    ```cpp
        // 被调用，将功能与输入绑定
        void AFPSCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
        {
            Super::SetupPlayerInputComponent(PlayerInputComponent);
             
            // 设置"移动"绑定。
            PlayerInputComponent->BindAxis("MoveForward", this, &AFPSCharacter::MoveForward);
            PlayerInputComponent->BindAxis("MoveRight", this, &AFPSCharacter::MoveRight);
             
            // 设置"观看"绑定。
            PlayerInputComponent->BindAxis("Turn", this, &AFPSCharacter::AddControllerYawInput);
            PlayerInputComponent->BindAxis("LookUp", this, &AFPSCharacter::AddControllerPitchInput);
        }
    ```
    

### 测试鼠标摄像机控制

1.  在VS中保存 **FPSCharacter** 的实现文件。
    
2.  在 **解决方案浏览器（Solution Explorer）** 中找到 **FPSProject**。
    
3.  右键点击 **FPSProject** 并选择 **构建（Build）**，编译你的项目。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58baa3a5-81cd-495f-a331-a1eca5f883b0/05-build-project.png)
4.  构建完毕后，在虚幻编辑器中打开 **FPSProject**。
    
5.  在 **关卡编辑器工具栏（Level Editor Toolbar）** 中点击 **运行（Play）**。现在，你可以通过鼠标控制摄像机。
    
6.  在进行下一步前，按 **\*Shift + Escape** 或在 **关卡编辑器工具栏（Level Editor Toolbar）** 中点击 **停止（Stop）**，退出PIE模式。
    

## 2.5 - 实现角色跳跃

通常，操作映射处理离散事件的输入，让你可以将输入映射到"友好名称"，该名称稍后可以与事件驱动的行为绑定。 最终效果是，按下和/或释放单个键、鼠标按钮或辅助键盘按钮可以直接触发游戏行为。 在此步骤中，你将为空格键设置输入操作映射，增加角色的跳跃能力。

### 跳跃操作映射

1.  在 **主（Main）** 菜单面板中点击 **编辑（Edit）**，选择 **项目设置（Project Settings）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eba94027-f219-4765-8d76-0835b55c6e01/11-open-project-settings.png)
2.  在 **项目设置（Project Settings）** 选项卡左侧的 **引擎（Engine）** 标题栏下，点击 **输入（Input）**。
    
3.  在 **绑定（Bindings）** 分段中，点击 **操作映射（Action Mappings）** 旁边的加号。
    
4.  点击 **操作映射（Action Mappings）** 左侧的箭头。
    
5.  在出现的文本输入框中输入"Jump"。
    
6.  在下拉菜单中，从 **键盘（Keyboard）** 下拉列表中选择 **空格键（Space Bar）**。
    
7.  现在输入设置界面应如下图所示：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92d795c2-e801-4e54-90a5-cdb4c10d0128/20-jump.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92d795c2-e801-4e54-90a5-cdb4c10d0128/20-jump.png)
    
    点击查看大图。
    
8.  关闭 **项目设置（Project Settings）** 菜单。
    

### 实现输入处理

如果你查看 `Acharacter` 基类的头文件 `.h`，你会看到角色跳跃的内置支持。角色跳跃与 `bPressedJump` 变量绑定，因此你需要做的就是，在跳跃操作按下时将该布尔值设置为 `true`，在跳跃操作释放时将该布尔值设置为 `false`。你需要添加以下两个函数完成此操作：

-   `StartJump`
-   `StopJump`

返回Visual Studio，将代码添加到 `FPSCharacter` 类。

1.  在 `FPSCharacter.h` 中，在 `public` 访问说明符下方添加以下函数声明：
    
    FPSCharacter.h
    
    ```cpp
        // 按下键时，设置跳跃标记。
        UFUNCTION()
        void StartJump();
             
        // 释放键时，清除跳跃标记。
        UFUNCTION()
        void StopJump();
    ```
    
2.  现在你的 `FPSCharacter.h` 应如下所示：
    
    FPSCharacter.h
    
    ```cpp
        //Epic Games, Inc版权所有。保留所有权利。
             
        #pragma once
             
        #include "CoreMinimal.h"
        #include "GameFramework/Character.h"
        #include "FPSCharacter.generated.h"
             
        UCLASS()
        class FPSPROJECT_API AFPSCharacter : public ACharacter
        {
            GENERATED_BODY()
             
        public:
            // 为此角色的属性设置默认值
            AFPSCharacter();
             
        protected:
            // 当游戏开始或重生（Spawn）时被调用
            virtual void BeginPlay() override;
             
        public:
            // 每一帧都被调用
            virtual void Tick( float DeltaTime ) override;
             
            // 被调用，将功能与输入绑定
            virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;
             
            // 处理用于前后移动的输入。
            UFUNCTION()
            void MoveForward(float Value);
             
            // 处理用于左右移动的输入。
            UFUNCTION()
            void MoveRight(float Value);
             
            // 按下键时，设置跳跃标记。
            UFUNCTION()
            void StartJump();
             
            // 释放键时，清除跳跃标记。
            UFUNCTION()
            void StopJump();
        };
    ```
    
3.  在 `FPSCharacter.cpp` 中，将以下函数定义添加到文件底部：
    
    FPSCharacter.cpp
    
    ```cpp
        void AFPSCharacter::StartJump()
        {
            bPressedJump = true;
        }
     
        void AFPSCharacter::StopJump()
        {
            bPressedJump = false;
        }
    ```
    
4.  现在，将以下代码添加到 `SetupPlayerInputComponent` 函数，以便将跳跃操作与刚才编写的函数绑定：
    
    FPSCharacter.cpp
    
    ```cpp
        // 设置"操作"绑定。
        PlayerInputComponent->BindAction("Jump", IE_Pressed, this, &AFPSCharacter::StartJump);
        PlayerInputComponent->BindAction("Jump", IE_Released, this, &AFPSCharacter::StopJump);
    ```
    
5.  现在你的 `FPSCharacter.cpp` 应如下所示：
    
    FPSCharacter.cpp
    
    ```cpp
        //Epic Games, Inc版权所有。保留所有权利。
                      
        #include "FPSCharacter.h"
             
        // 设置默认值
        AFPSCharacter::AFPSCharacter()
        {
            // 将此角色设置为每帧调用Tick()。  如果不需要此特性，可以关闭以提升性能。
            PrimaryActorTick.bCanEverTick = true;
             
        }
             
        // 当游戏开始或重生（Spawn）时被调用
        void AFPSCharacter::BeginPlay()
        {
            Super::BeginPlay();
             
            check(GEngine != nullptr);
                
              // 显示调试消息五秒。 
            // -1"键"值参数可以防止更新或刷新消息。
              GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Red, TEXT("We are using FPSCharacter."));
                
        }
             
        // 每一帧都被调用
        void AFPSCharacter::Tick( float DeltaTime )
        {
            Super::Tick( DeltaTime );
             
        }
             
        // 被调用，将功能与输入绑定
        void AFPSCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
        {
            Super::SetupPlayerInputComponent(PlayerInputComponent);
             
            // 设置"移动"绑定。
            PlayerInputComponent->BindAxis("MoveForward", this, &AFPSCharacter::MoveForward);
            PlayerInputComponent->BindAxis("MoveRight", this, &AFPSCharacter::MoveRight);
             
            // 设置"观看"绑定。
            PlayerInputComponent->BindAxis("Turn", this, &AFPSCharacter::AddControllerYawInput);
            PlayerInputComponent->BindAxis("LookUp", this, &AFPSCharacter::AddControllerPitchInput);
             
            // 设置"操作"绑定。
            PlayerInputComponent->BindAction("Jump", IE_Pressed, this, &AFPSCharacter::StartJump);
            PlayerInputComponent->BindAction("Jump", IE_Released, this, &AFPSCharacter::StopJump);
        }
             
        void AFPSCharacter::MoveForward(float Value)
        {
            // 找出"前进"方向，并记录玩家想向该方向移动。
            FVector Direction = FRotationMatrix(Controller->GetControlRotation()).GetScaledAxis(EAxis::X);
            AddMovementInput(Direction, Value);
        }
             
        void AFPSCharacter::MoveRight(float Value)
        {
            // 找出"右侧"方向，并记录玩家想向该方向移动。
            FVector Direction = FRotationMatrix(Controller->GetControlRotation()).GetScaledAxis(EAxis::Y);
            AddMovementInput(Direction, Value);
        }
             
        void AFPSCharacter::StartJump()
        {
            bPressedJump = true;
        }
             
        void AFPSCharacter::StopJump()
        {
            bPressedJump = false;
        }
    ```
    

### 测试角色跳跃

现在我们来编译和测试新实现的角色移动函数。

1.  在VS中保存FPSCharacter 头文件 `.h`和 `.cpp` 实现文件。
    
2.  在 **解决方案浏览器（Solution Explorer）** 中找到 **FPSProject**。
    
3.  右键点击 **FPSProject** 并选择 **构建（Build）**，编译你的项目。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/429b8ef2-15e8-4453-a327-92bb8fdf34cf/05-build-project.png)
4.  构建完毕后，在虚幻引擎中打开 **FPSProject**。
    
5.  在 **关卡编辑器工具栏（Level Editor Toolbar）** 中点击 **运行（Play）**，现在你应该可以使用空格键控制角色跳跃了。
    
6.  在进行下一步前，按 **\*Shift + Escape** 或在 **关卡编辑器工具栏（Level Editor Toolbar）** 中点击 **停止（Stop）**，退出PIE模式。
    

## 2.6 - 将网格体添加到角色

通过以下链接下载并提取示例网格体：

-   [示例网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/04f89a88-c13c-4a1c-af88-6a3caaa0c10f/genericmale.zip)

在此步骤中，你将为角色提供骨骼网格体。默认情况下，Character类会为你创建SkeletalMeshComponent对象，因此你仅需了解要使用哪个SkeletalMesh资产。

### 导入骨骼网格体

1.  找到 **内容浏览器（Content Browser）** 并打开 **Content** 文件夹。
    
2.  右键点击 **内容浏览器（Content Browser）** 的文件窗口，打开 **导入资产（Import Asset）** 对话框。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/751708b5-e018-405c-839c-7e4b544d2d48/21-fbx-import-option-1.png)
3.  点击 **'导入到/游戏...（Import to /Game...）'**，打开 **导入（Import）** 对话框。
    
4.  找到并选择下载位置的文件夹中的 `GenericMale.fbx` 网格体文件。
    
5.  点击 **打开（Open）**，开始将网格体导入到你的项目中。
    
6.  **内容浏览器（Content Browser）** 将弹出 **FBX导入选项（FBX Import Options）** 对话框。点击 **全部导入（Import All）**，将你的网格体添加到项目。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/acf0b255-eeec-4e9f-aeba-6966cd29e561/21-fbx-import-options.png)
7.  点击 **主（Main）** 菜单面板中的 **文件（File）**，保存导入的网格体。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61d98b51-f42e-4019-9f3a-bfa993e951e4/22-save-all.png)

### 设置第三人称网格体

1.  在 **内容（Content）> 蓝图（Blueprints）** 中，双击 **BP\_FPSCharacter** 蓝图类图标，在 **蓝图编辑器（Blueprint Editor）** 中打开它。
    
    如果你看到有关此蓝图为仅数据蓝图的说明，请点击 **打开完整蓝图编辑器（Open Full Blueprint Editor）**。
    
2.  在 **组件（Components）** 选项卡中点击 **网格体（Mesh）** 组件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bfc5039b-268d-400e-861f-937abe2cefd9/23-mesh-component.png)
3.  找到 **细节（Details）** 面板中的 **网格体（Mesh）**（它位于屏幕右侧，或在 **窗口（Window）> 细节（Details）** 中）。
    
4.  打开 **骨骼网格体（Skeletal Mesh）** 的下拉窗口，选择 **GenericMale** 骨骼网格体。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9983f59e-a3f7-4045-b899-6ec762488870/24-select-skeletal-mesh.png)
5.  找到 **细节（Details）** 窗格中的 **变换（Transform）** 分段，将其 **位置（Location）** 选项 设置为 **X = -5.0; Y = 0.0; Z = -88.0**，使 `SkeletalMeshComponent` 与 `CapsuleComponent` 对齐。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25de937b-f622-485d-9aba-f87ee80180ac/25-set-location-options.png)
6.  点击 **蓝图编辑器** 中的 **视口** 以预览骨骼网格体。它应该如下图所示：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8457d293-08d6-47f1-98e9-372d8a93fb9e/26-viewport.png)
    
    确认骨骼网格体在 `CapsuleComponent` 内部，并且网格体的朝向与 `ArrowComponent` 相同。正确的骨骼网格体组件朝向将确保你的角色以正确的方式在整个世界中移动。
    
7.  请确保在关闭 **蓝图编辑器（Blueprint Editor）** 之前 **编译（Compile)** 并 **保存（Save）** **BP\_FPSCharacter** 蓝图。
    

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b59e0dc-3421-4ba2-8046-180295f751ce/27-compile-save.png)

### 在PIE模式中确认新网格体

现在可在编辑器中查看新添加的网格体了。

1.  在 **关卡编辑器工具栏（Level Editor Toolbar）** 中点击 **运行（Play）** 按钮。在你四处移动时，你应该能看到角色的影子。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d85c2b50-9497-4850-b54d-4ae1a98ec723/28-pawn-with-shadow.png)
    
    如果你要在编辑器的视口中查看角色的网格体，请按 **F8** 键，将自己从Ppawn中弹出。按下 **F8** 键后，你将可以在关卡中自由移动摄像机。要移动摄像机，请在移动鼠标的同时按住鼠标左键。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f69a2e33-c9bf-4036-92d8-d04f3eea1929/29-freely-moving-camera.png)
    
2.  按 **Shift + Escape** 或在 **关卡编辑器工具栏（Level Editor Toolbar）** 中点击 **停止（Stop）** 按钮，退出PIE模式。
    

## 2.7 - 更改摄像机视角

在上一步结束时，默认摄像机放置在网格体的颈部。 在此步骤中，你将设置FPS摄像机，调整摄像机的属性（例如位置和视野）。 在开始之前，你需要在 `FPSCharacter.h` 中包含更多的文件。 这将使你的代码可以访问更多与摄像机相关的函数，并最终使你能够操纵摄像机的位置。

1.  打开Visual Studio项目，找到 `FPSCharacter.h`。
    
2.  将以下头文件添加到 `FPSCharacter.h`：
    
    FPSCharacter.h
    
    ```cpp
        #include "Camera/CameraComponent.h"
        #include "Components/CapsuleComponent.h"
    ```
    

### 附加摄像机组件

1.  打开 `FPSCharacter.h`，在 `public` 访问说明符下方添加以下代码：
    
    FPSCharacter.h
    
    ```cpp
        // FPS摄像机。
        UPROPERTY(VisibleAnywhere)
        UCameraComponent* FPSCameraComponent;
    ```
    
2.  现在你的 `FPSCharacter.h` 应如下所示：
    
    FPSCharacter.h
    
    ```cpp
        //Epic Games, Inc版权所有。保留所有权利。
         
        #pragma once
         
        #include "CoreMinimal.h"
        #include "GameFramework/Character.h"
        #include "Camera/CameraComponent.h"
        #include "Components/CapsuleComponent.h"
        #include "FPSCharacter.generated.h"
              
        UCLASS()
        class FPSPROJECT_API AFPSCharacter : public ACharacter
        {
        GENERATED_BODY()
         
        public:
            // 为此角色的属性设置默认值
            AFPSCharacter();
         
        protected:
            // 当游戏开始或重生（Spawn）时被调用
            virtual void BeginPlay() override;
         
        public:     
            // 每一帧都被调用
            virtual void Tick( float DeltaTime ) override;
         
            // 被调用，将功能与输入绑定
            virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;
         
            // 处理用于前后移动的输入。
            UFUNCTION()
            void MoveForward(float Value);
         
            // 处理用于左右移动的输入。
        UFUNCTION()
        void MoveRight(float Value);
         
            // 按下键时，设置跳跃标记。
            UFUNCTION()
            void StartJump();
         
            // 释放键时，清除跳跃标记。
            UFUNCTION()
            void StopJump();
         
            // FPS摄像机
            UPROPERTY(VisibleAnywhere)
            UCameraComponent* FPSCameraComponent;
        };
    ```
    
3.  打开 `FPSCharacter.cpp`，将以下代码添加到 `PrimaryActorTick.bCanEverTick = true:` 下方的构造函数中。
    
    FPSCharacter.cpp
    
    ```cpp
        // 创建第一人称摄像机组件。
        FPSCameraComponent = CreateDefaultSubobject<UCameraComponent>(TEXT("FirstPersonCamera"));
        check(FPSCameraComponent != nullptr);
    
        // 将摄像机组件附加到我们的胶囊体组件。
        FPSCameraComponent->SetupAttachment(CastChecked<USceneComponent, UCapsuleComponent>(GetCapsuleComponent()));
    ```
    
    此代码创建 `UCameraComponent`，并将其附加到角色的 `CapsuleComponent`。
    
4.  现在，将以下代码添加到你刚刚在构造函数中编写的代码块下面：
    
    FPSCharacter.cpp
    
    ```cpp
        // 将摄像机置于略高于眼睛上方的位置。
        FPSCameraComponent->SetRelativeLocation(FVector(0.0f, 0.0f, 50.0f + BaseEyeHeight));
             
        // 允许Pawn控制摄像机旋转。
        FPSCameraComponent->bUsePawnControlRotation = true;
    ```
    
    此代码将摄像机的位置调整为略高于角色眼睛的位置，同时允许pawn控制摄像机的旋转。
    
    `SetRelativeLocation` 可以设置组件的默认值。不过，上一个值仍然会在被设置在编辑器中。为纠正这点，请打开 **蓝图编辑器**，点击 `FPSCameraComponent`，然后在 **细节（Details）** 面板中找到 **变换（Transform）> 位置（Location）** 值。点击这个值旁边的 **重置为默认（Reset to Default）**。
    
5.  现在你的 `FPSCharacter.cpp` 应如下所示：
    
    FPSCharacter.cpp
    
    ```cpp
        //Epic Games, Inc版权所有。保留所有权利。
                      
        #include "FPSCharacter.h"
             
        // 设置默认值
        AFPSCharacter::AFPSCharacter()
        {
            // 将此角色设置为每帧调用Tick()。  如果不需要此特性，可以关闭以提升性能。
            PrimaryActorTick.bCanEverTick = true;
             
            // 创建第一人称摄像机组件。
            FPSCameraComponent = CreateDefaultSubobject<UCameraComponent>(TEXT("FirstPersonCamera"));
            check(FPSCameraComponent != nullptr);
             
            // 将摄像机组件附加到我们的胶囊体组件。
            FPSCameraComponent->SetupAttachment(CastChecked<USceneComponent, UCapsuleComponent>(GetCapsuleComponent()));
             
            // 将摄像机置于略高于眼睛上方的位置。
            FPSCameraComponent->SetRelativeLocation(FVector(0.0f, 0.0f, 50.0f + BaseEyeHeight));
             
            // 启用Pawn控制摄像机旋转。
            FPSCameraComponent->bUsePawnControlRotation = true;
        }
             
        // 当游戏开始或重生（Spawn）时被调用
        void AFPSCharacter::BeginPlay()
        {
            Super::BeginPlay();
             
            check(GEngine != nullptr)
                
              // 显示调试消息五秒。 
             // -1"键"值（第一个参数）表示我们从不需要更新或刷新此消息。
              GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Red, TEXT("We are using FPSCharacter."));
        }
             
        // 每一帧都被调用
        void AFPSCharacter::Tick( float DeltaTime )
        {
            Super::Tick( DeltaTime );
             
        }
             
        // 被调用，将功能与输入绑定
        void AFPSCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
        {
            Super::SetupPlayerInputComponent(PlayerInputComponent);
             
            // 设置"移动"绑定。
            PlayerInputComponent->BindAxis("MoveForward", this, &AFPSCharacter::MoveForward);
            PlayerInputComponent->BindAxis("MoveRight", this, &AFPSCharacter::MoveRight);
             
            // 设置"观看"绑定。
            PlayerInputComponent->BindAxis("Turn", this, &AFPSCharacter::AddControllerYawInput);
            PlayerInputComponent->BindAxis("LookUp", this, &AFPSCharacter::AddControllerPitchInput);
             
            // 设置"操作"绑定。
            PlayerInputComponent->BindAction("Jump", IE_Pressed, this, &AFPSCharacter::StartJump);
            PlayerInputComponent->BindAction("Jump", IE_Released, this, &AFPSCharacter::StopJump);
        }
             
        void AFPSCharacter::MoveForward(float Value)
        {
            // 找出"前进"方向，并记录玩家想向该方向移动。
            FVector Direction = FRotationMatrix(Controller->GetControlRotation()).GetScaledAxis(EAxis::X);
            AddMovementInput(Direction, Value);
        }
             
        void AFPSCharacter::MoveRight(float Value)
        {
            // 找出"右侧"方向，并记录玩家想向该方向移动。
            FVector Direction = FRotationMatrix(Controller->GetControlRotation()).GetScaledAxis(EAxis::Y);
            AddMovementInput(Direction, Value);
        }
             
        void AFPSCharacter::StartJump()
        {
            bPressedJump = true;
        }
             
        void AFPSCharacter::StopJump()
        {
            bPressedJump = false;
        }
    ```
    

### 测试新摄像机

现在我们来编译和测试新实现的摄像机代码。

1.  在Visual Studio中保存 **FPSCharacter** 的头文件 `.h` 和 `.cpp` 实现文件。
    
2.  在 **解决方案浏览器（Solution Explorer）** 中找到 **FPSProject**。
    
3.  右键点击 **FPSProject** 并选择 **构建（Build）**，编译你的项目。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8d7408b-3163-412a-b7f1-b9a631347a7b/05-build-project.png)
4.  构建完毕后，在虚幻编辑器中打开 **FPSProject**。
    
5.  在 **关卡编辑器工具栏** 中点击 **运行（Play）**。
    

现在，摄像机应该略高于角色的头部。

你还可以通过在 **视口** 中打开 **BP\_FPSCharacter** 来确认新添加的摄像机组件。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6b0887a-a8c6-4e29-bb41-da02a08f6f01/30-camera-above-character.png)

如果你在 **内容浏览器** 中打开 **BP\_FPSCharacter** 并找到 **视口**，你的角色应该如下图所示：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45bb595b-ee5b-42f6-b231-85211a631f14/31-camera-above-character-viewport.png)

## 2.8 - 将第一人称网格体添加到你的角色

构建FPS游戏的常见方法是使用两个独立的角色网格体，其中一个是全身网格体，另一个是"武器和手部"网格体。全身网格体用于从第三人称视角观察角色。但是，当玩家以第一人称视角进行游戏时，全身网格体是隐藏的。"武器和手部"网格体通常附着到摄像机，并且仅当玩家以第一人称视角查看地图时才对玩家可见。在此步骤中，你将向角色添加第一人称网格体。

### 添加第一人称角色网格体

1.  切换回Visual Studio并打开 `FPSCharacter.h`，在 `public` 下添加以下代码：
    
    FPSCharacter.h
    
    ```cpp
        // 第一人称网格体（手臂），仅对所属玩家可见。
        UPROPERTY(VisibleDefaultsOnly, Category = Mesh)
        USkeletalMeshComponent* FPSMesh;
    ```
    
2.  打开 `FPSCharacter.cpp`，找到构造函数，添加以下代码，创建并配置第一人称网格体：
    
    FPSCharacter.cpp
    
    ```cpp
        // 为所属玩家创建第一人称网格体组件。
        FPSMesh = CreateDefaultSubobject<USkeletalMeshComponent>(TEXT("FirstPersonMesh"));
        check(FPSMesh != nullptr);
             
        // 只有所属玩家可以看见此网格体。
        FPSMesh->SetOnlyOwnerSee(true);
             
        // 将FPS网格体附加到FPS摄像机。
        FPSMesh->SetupAttachment(FPSCameraComponent);
             
        // 禁用某些环境阴影以便实现只有一个网格体的感觉。
        FPSMesh->bCastDynamicShadow = false;
        FPSMesh->CastShadow = false;
    ```
    
    `SetOnlyOwnerSee` 表示此网格体仅对拥有此角色的 `PlayerController` 可见。此代码还将网格体附加到摄像机，并禁用某些环境阴影。让手臂投射阴影会破坏第一人称角色应该只有一个网格体的感觉。
    
3.  最后，将以下代码添加到 `FPSCharacter.cpp` 的构造函数中，以便对所属角色隐藏现有的第三人称网格体：
    
    FPSCharacter.cpp
    
    ```cpp
        // 所属玩家看不到常规（第三人称）全身网格体。
        GetMesh()->SetOwnerNoSee(true);
    ```
    
4.  在Visual Studio中保存 **FPSCharacter** 头文件 `.h` 和 `.cpp` 实现文件。
    
5.  在 **解决方案浏览器（Solution Explorer）** 中找到 **FPSProject**。
    
6.  右键点击 **FPSProject** 并选择 **构建（Build）**，编译你的项目。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72449c24-5ce5-46c3-bebc-8c9b63b935d8/05-build-project.png)
7.  构建完成后，在虚幻编辑器中打开 **FPSProject**。
    
8.  在 **关卡编辑器工具栏** 中点击 **运行（Play）** 按钮。现在，你不会在PIE模式中看到角色阴影了。它应该如下图所示：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/392ea6da-46e6-4add-8b3e-9a1a1fd1d3e5/32-hidden-mesh-ingame.png)

此时，你的角色网格体在编辑器中应该不可见。

如果你仍然看到网格体及其阴影投射，请关闭并重新启动编辑器。

### 构建网格体蓝图

在继续之前，请通过以下链接下载并提取示例网格体：

-   ["第一人称骨骼网格体"](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/62abfa11-5df0-45c8-ac9b-53df7bda73d2/herofpp.zip)

1.  找到 **内容浏览器** 并打开 **Content** 文件夹。
    
2.  右键点击 **内容浏览器** 的文件窗口，打开 **导入资产（Import Asset）** 对话框。
    
3.  点击 **导入到/游戏...（Import to /Game...）**，打开 **导入（Import）** 对话框。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a34592b0-0821-4e6c-bcde-85fcfba5ce3c/33-import-option.png)
4.  在下载位置找到并选择 **HeroFPP.fbx** 网格体文件。
    
5.  点击 **打开（Open）**，开始将网格体导入到你的项目中。
    
6.  **内容浏览器（Content Browser）** 将弹出 **FBX导入选项（FBX Import Options）** 对话框。
    
7.  在 **FBX导入选项（FBX Import Options）** 对话框中，在 **Skelection（骨架）** 分段的下拉菜单中选择 **清理（Clear）**，然后点击 **全部导入（Import All）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcd55f0f-d301-4f60-ba1b-5e0af7177349/34-clear-option.png)
8.  关闭以下 **消息日志** 窗口。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c19b0fb-5d59-4831-8ad8-da565a5b3885/35-message-log.png)
    
      
    
    此网格体仍展示第一人称网格体设置，它将与你在后面小节中设置的动画一起使用。
    
9.  点击 **主（Main）** 菜单面板中的 **保存（Save）**，保存导入的网格体。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b03720a-1e06-4069-97aa-d42eeeaaf24b/22-save-all.png)
10.  找到 **内容浏览器（Content Browser）** 中的 **Blueprints** 文件夹。
    
11.  双击 **BP\_FPSCharacter** 图标，在 **蓝图编辑器** 中打开它。
    
12.  在 **蓝图编辑器** 中找到 **组件（Components）** 选项卡，选择新的 **FPSMesh** 组件。你可能需要先打开 **完整的蓝图编辑器**。
    

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/341ac0e2-06b0-450b-bbf9-116c1174401d/36-select-mesh-component.png)

**FPSMesh** 组件是 **FPSCameraComponent** 组件的子项，这意味着它将始终附加到摄像机。

1.  找到 **细节（Details）** 面板，下拉到 **网格体（Mesh）** 分段，点击 **骨骼网格体（Skeletal Mesh）** 下面的下拉菜单。在下拉菜单中选择 **HeroFPP** 骨骼网格体，将手臂添加到 **视口（Viewport）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59a16d2c-c680-4eb9-8994-34a44bd25406/37-select-hero-fpp.png)
2.  在 **视口（Viewport）** 中，新增的 **HeroFPP** 骨骼网格体应如下图所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41422ff1-a882-48e7-b6f4-98440128534f/38-hero-fpp-viewport.png)
3.  调整新增网格体的 **变换（Transform）** 选项。将其 **位置（Location）** 设置为 **{220, 0, 35}**，将其 **旋转（Rotation）** 设置为 **{180, 50, 180}**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70069575-8cb6-42c9-b46d-c1076e165e6d/39-transform-settings.png)
4.  该设置会将 **HeroFPP** 骨骼网格体放置在摄像机前方。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1038ba5c-9343-4e26-bfc4-26d4d79af02b/40-bpfpscharacter-viewport.png)
5.  请确保在关闭 **蓝图编辑器（Blueprint Editor）** 之前 **编译（Compile)** 并 **保存（Save）** **BP\_FPSCharacter** 蓝图。
    

### 在游戏中查看新网格体

1.  点击 **关卡编辑器工具栏** 中的 **运行（Play）** 按钮\*\*，在游戏中查看新网格体。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b97a519d-f818-4e61-a1c8-9715289b89db/41-result.png)
2.  按 **Shift + Escape** 或在 **关卡编辑器** 中点击 **停止（Stop）** 按钮，退出PIE模式。
    

### 已完成的本章节代码

FPSCharacter.h

```cpp
//Epic Games, Inc版权所有。保留所有权利。
 
#pragma once
 
#include "GameFramework/Character.h"
#include "Camera/CameraComponent.h"
#include "Components/CapsuleComponent.h"
#include "FPSCharacter.generated.h"
 
UCLASS()
class FPSPROJECT_API AFPSCharacter : public ACharacter
{
    GENERATED_BODY()
 
public:
    // 为此角色的属性设置默认值
    AFPSCharacter();
 
protected:          
    // 当游戏开始或重生（Spawn）时被调用
    virtual void BeginPlay() override;
 
public: 
    // 每一帧都被调用
    virtual void Tick( float DeltaTime ) override;
 
    // 被调用，将功能与输入绑定
    virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;
 
    // 处理用于前后移动的输入。
    UFUNCTION()
    void MoveForward(float Value);
 
    // 处理用于左右移动的输入。
    UFUNCTION()
    void MoveRight(float Value);
 
    // 按下键时，设置跳跃标记。
    UFUNCTION()
    void StartJump();
 
    // 释放键时，清除跳跃标记。
    UFUNCTION()
    void StopJump();
 
    // FPS摄像机
    UPROPERTY(VisibleAnywhere)
    UCameraComponent* FPSCameraComponent;
 
    // 第一人称网格体（手臂），仅对所属玩家可见。
    UPROPERTY(VisibleDefaultsOnly, Category = Mesh)
    USkeletalMeshComponent* FPSMesh;
};
```

FPSCharacter.cpp

```cpp
//Epic Games, In版权所有c。保留所有权利。
          
#include "FPSCharacter.h"
 
// 设置默认值
AFPSCharacter::AFPSCharacter()
{
    // 将此角色设置为每帧调用Tick()。  如果不需要此特性，可以关闭以提升性能。
    PrimaryActorTick.bCanEverTick = true;
 
    // 创建第一人称摄像机组件。
    FPSCameraComponent = CreateDefaultSubobject<UCameraComponent>(TEXT("FirstPersonCamera"));
    check(FPSCameraComponent != nullptr);
 
    // 将摄像机组件附加到我们的胶囊体组件。
    FPSCameraComponent->SetupAttachment(CastChecked<USceneComponent>(GetCapsuleComponent()));
 
    // 将摄像机置于略高于眼睛上方的位置。
    FPSCameraComponent->SetRelativeLocation(FVector(0.0f, 0.0f, 50.0f + BaseEyeHeight));
 
    // 允许Pawn控制摄像机旋转。
    FPSCameraComponent->bUsePawnControlRotation = true;
 
    // 为所属玩家创建第一人称网格体组件。
    FPSMesh = CreateDefaultSubobject<USkeletalMeshComponent>(TEXT("FirstPersonMesh"));
    check(FPSMesh != nullptr);
 
    // 仅所属玩家可以看见此网格体。
    FPSMesh->SetOnlyOwnerSee(true);
 
    // 将 FPS 网格体附加到 FPS 摄像机。
    FPSMesh->SetupAttachment(FPSCameraComponent);
 
    // 禁用某些环境阴影以便实现只有单个网格体的感觉。
    FPSMesh->bCastDynamicShadow = false;
    FPSMesh->CastShadow = false;
 
    // 所属玩家看不到常规（第三人称）全身网格体。
    GetMesh()->SetOwnerNoSee(true);
}
 
// 当游戏开始或重生（Spawn）时被调用
void AFPSCharacter::BeginPlay()
{
    Super::BeginPlay();
 
    check(GEngine != nullptr);
    
      // 显示调试消息五秒。 
    // -1"键"值参数可以防止更新或刷新消息。
      GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Red, TEXT("We are using FPSCharacter."));
    
}
 
// 每一帧都被调用
void AFPSCharacter::Tick( float DeltaTime )
{
    Super::Tick( DeltaTime );
 
}
 
// 被调用，将功能与输入绑定
void AFPSCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
    Super::SetupPlayerInputComponent(PlayerInputComponent);
 
    // 设置"移动"绑定。
    PlayerInputComponent->BindAxis("MoveForward", this, &AFPSCharacter::MoveForward);
    PlayerInputComponent->BindAxis("MoveRight", this, &AFPSCharacter::MoveRight);
 
    // 设置"观看"绑定。
    PlayerInputComponent->BindAxis("Turn", this, &AFPSCharacter::AddControllerYawInput);
    PlayerInputComponent->BindAxis("LookUp", this, &AFPSCharacter::AddControllerPitchInput);
 
    // 设置"操作"绑定。
    PlayerInputComponent->BindAction("Jump", IE_Pressed, this, &AFPSCharacter::StartJump);
    PlayerInputComponent->BindAction("Jump", IE_Released, this, &AFPSCharacter::StopJump);
}
 
void AFPSCharacter::MoveForward(float Value)
{
    // 找出"前进"方向，并记录玩家想向该方向移动。
    FVector Direction = FRotationMatrix(Controller->GetControlRotation()).GetScaledAxis(EAxis::X);
    AddMovementInput(Direction, Value);
}
 
void AFPSCharacter::MoveRight(float Value)
{
    // 找出"右侧"方向，并记录玩家想向该方向移动。
    FVector Direction = FRotationMatrix(Controller->GetControlRotation()).GetScaledAxis(EAxis::Y);
    AddMovementInput(Direction, Value);
}
 
void AFPSCharacter::StartJump()
{
    bPressedJump = true;
}
 
void AFPSCharacter::StopJump()
{
    bPressedJump = false;
}
```

恭喜！现在你已经学会了如何：

✓ 制作新角色  
✓ 设置轴映射  
✓ 实现角色移动函数  
✓ 实现鼠标摄像机控制  
✓ 实现角色跳跃  
✓ 将网格体添加到角色  
✓ 更改摄像机视角  
✓ 将第一人称网格体添加到角色

现在，你可以准备在下一章节中学习如何实现发射物了。

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [目标](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [目的](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [步骤](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [2.1 创建新角色](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#21%E5%88%9B%E5%BB%BA%E6%96%B0%E8%A7%92%E8%89%B2)
-   [添加Character类](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E6%B7%BB%E5%8A%A0character%E7%B1%BB)
-   [确认Character类](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E7%A1%AE%E8%AE%A4character%E7%B1%BB)
-   [将你的C++ FPS Character类扩展到蓝图](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E5%B0%86%E4%BD%A0%E7%9A%84c++fpscharacter%E7%B1%BB%E6%89%A9%E5%B1%95%E5%88%B0%E8%93%9D%E5%9B%BE)
-   [设置默认的Pawn类](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E9%BB%98%E8%AE%A4%E7%9A%84pawn%E7%B1%BB)
-   [2.2 - 设置轴映射](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#22-%E8%AE%BE%E7%BD%AE%E8%BD%B4%E6%98%A0%E5%B0%84)
-   [向前移动轴映射](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E5%90%91%E5%89%8D%E7%A7%BB%E5%8A%A8%E8%BD%B4%E6%98%A0%E5%B0%84)
-   [向右移动轴映射](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E5%90%91%E5%8F%B3%E7%A7%BB%E5%8A%A8%E8%BD%B4%E6%98%A0%E5%B0%84)
-   [2.3 - 实现角色移动函数](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#23-%E5%AE%9E%E7%8E%B0%E8%A7%92%E8%89%B2%E7%A7%BB%E5%8A%A8%E5%87%BD%E6%95%B0)
-   [移动函数接口](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E7%A7%BB%E5%8A%A8%E5%87%BD%E6%95%B0%E6%8E%A5%E5%8F%A3)
-   [移动函数的实现](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E7%A7%BB%E5%8A%A8%E5%87%BD%E6%95%B0%E7%9A%84%E5%AE%9E%E7%8E%B0)
-   [测试角色移动](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E6%B5%8B%E8%AF%95%E8%A7%92%E8%89%B2%E7%A7%BB%E5%8A%A8)
-   [2.4 - 实现鼠标摄像机控制](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#24-%E5%AE%9E%E7%8E%B0%E9%BC%A0%E6%A0%87%E6%91%84%E5%83%8F%E6%9C%BA%E6%8E%A7%E5%88%B6)
-   [转向轴映射](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E8%BD%AC%E5%90%91%E8%BD%B4%E6%98%A0%E5%B0%84)
-   [查找轴映射](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E6%9F%A5%E6%89%BE%E8%BD%B4%E6%98%A0%E5%B0%84)
-   [实现输入处理](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E5%AE%9E%E7%8E%B0%E8%BE%93%E5%85%A5%E5%A4%84%E7%90%86)
-   [测试鼠标摄像机控制](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E6%B5%8B%E8%AF%95%E9%BC%A0%E6%A0%87%E6%91%84%E5%83%8F%E6%9C%BA%E6%8E%A7%E5%88%B6)
-   [2.5 - 实现角色跳跃](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#25-%E5%AE%9E%E7%8E%B0%E8%A7%92%E8%89%B2%E8%B7%B3%E8%B7%83)
-   [跳跃操作映射](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E8%B7%B3%E8%B7%83%E6%93%8D%E4%BD%9C%E6%98%A0%E5%B0%84)
-   [实现输入处理](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E5%AE%9E%E7%8E%B0%E8%BE%93%E5%85%A5%E5%A4%84%E7%90%86-2)
-   [测试角色跳跃](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E6%B5%8B%E8%AF%95%E8%A7%92%E8%89%B2%E8%B7%B3%E8%B7%83)
-   [2.6 - 将网格体添加到角色](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#26-%E5%B0%86%E7%BD%91%E6%A0%BC%E4%BD%93%E6%B7%BB%E5%8A%A0%E5%88%B0%E8%A7%92%E8%89%B2)
-   [导入骨骼网格体](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E5%AF%BC%E5%85%A5%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [设置第三人称网格体](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E7%AC%AC%E4%B8%89%E4%BA%BA%E7%A7%B0%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [在PIE模式中确认新网格体](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E5%9C%A8pie%E6%A8%A1%E5%BC%8F%E4%B8%AD%E7%A1%AE%E8%AE%A4%E6%96%B0%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [2.7 - 更改摄像机视角](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#27-%E6%9B%B4%E6%94%B9%E6%91%84%E5%83%8F%E6%9C%BA%E8%A7%86%E8%A7%92)
-   [附加摄像机组件](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E9%99%84%E5%8A%A0%E6%91%84%E5%83%8F%E6%9C%BA%E7%BB%84%E4%BB%B6)
-   [测试新摄像机](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E6%B5%8B%E8%AF%95%E6%96%B0%E6%91%84%E5%83%8F%E6%9C%BA)
-   [2.8 - 将第一人称网格体添加到你的角色](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#28-%E5%B0%86%E7%AC%AC%E4%B8%80%E4%BA%BA%E7%A7%B0%E7%BD%91%E6%A0%BC%E4%BD%93%E6%B7%BB%E5%8A%A0%E5%88%B0%E4%BD%A0%E7%9A%84%E8%A7%92%E8%89%B2)
-   [添加第一人称角色网格体](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E7%AC%AC%E4%B8%80%E4%BA%BA%E7%A7%B0%E8%A7%92%E8%89%B2%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [构建网格体蓝图](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E6%9E%84%E5%BB%BA%E7%BD%91%E6%A0%BC%E4%BD%93%E8%93%9D%E5%9B%BE)
-   [在游戏中查看新网格体](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E5%9C%A8%E6%B8%B8%E6%88%8F%E4%B8%AD%E6%9F%A5%E7%9C%8B%E6%96%B0%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [已完成的本章节代码](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine#%E5%B7%B2%E5%AE%8C%E6%88%90%E7%9A%84%E6%9C%AC%E7%AB%A0%E8%8A%82%E4%BB%A3%E7%A0%81)

相关文档

[

第一人称射击游戏教程

![第一人称射击游戏教程](https://dev.epicgames.com/community/api/documentation/image/84299dcc-b92a-4600-91bc-946ae4bd4b79?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/first-person-shooter-tutorial-in-unreal-engine)
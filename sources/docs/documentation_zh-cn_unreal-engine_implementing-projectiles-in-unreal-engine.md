# 3 - 实现发射物 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:33:39.106Z

---

目录

![3 - 实现发射物](https://dev.epicgames.com/community/api/documentation/image/25375d4e-acec-4b97-acde-9ed99743cb7b?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [建立项目](/documentation/zh-cn/unreal-engine/setting-up-your-project-in-unreal-engine)
-   [2 - 添加角色](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c1e3cce-07ec-4a62-8294-53b0657437c4/fps-implementing-projectile-final-result.gif)

这就是你将在本分段结束时看到的内容。

## 目标

本分段旨在向你展示如何实现第一人称射击游戏的发射物。

## 目的

完成本教程的此分段，你能够：

-   将发射物添加到游戏
-   实现射击
-   设置发射物碰撞和生命周期
-   使发射物与世界交互
-   将十字准星添加到视口

## 步骤

-   3.1 - 将发射物添加到游戏
-   3.2 - 实现射击
-   3.3 - 设置发射物碰撞和生命周期
-   3.4 - 让发射物与世界交互
-   3.5 - 将十字准星添加到视口

## 3.1 - 将发射物添加到游戏

你已经设置好角色，现在可以实现武器发射物了。你将通过编程实现简单的手榴弹状发射物，它将从屏幕中心射击并飞行，直到与世界中的物体碰撞。在此步骤中，你将添加输入并为发射物创建新的代码类。

### 添加射击操作映射

1.  在 **编辑（Edit）** 菜单中，点击 **项目设置（Project Settings）**。
    
2.  在 **项目设置（Project Settings）** 选项卡左侧的 **引擎（Engine）** 标题栏下，点击 **输入（Input）**。
    
3.  在 **绑定（Bindings）** 中，点击 **操作映射（Action Mappings）** 旁边的+号。
    
4.  点击 **操作映射（Action Mappings）** 左侧的 **箭头**。
    
5.  在显示的文本输入框中输入"Fire"，然后点击文本框左侧的箭头，展开操作绑定选项。
    
6.  在下拉菜单中，从 **鼠标（Mouse）** 下拉列表中选择 **鼠标左键（Left Mouse Button）**。
    
7.  现在输入设置界面应如下图所示：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/248245d5-5368-4f12-a785-ede0c9a73d29/02-action-mapping-set.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/248245d5-5368-4f12-a785-ede0c9a73d29/02-action-mapping-set.png)
    
8.  关闭 **项目设置（Project Settings）** 菜单。
    

### 添加发射物类

1.  在文件（File）菜单中，选择 **新建C++类...（New C++ Class...）**，以选择新的父类。
2.  以上操作将打开 **选择父类（Choose Parent Class）** 菜单。向下滚动，选择 **Actor** 作为父类，然后点击 **下一步（Next）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eca120e4-1142-4b23-ab1e-1d9677c28fe8/03-new-cpp-class.png)
3.  将新类命名为"FPSProjectile"，然后点击 **创建类（Create Class）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc2785b7-87ab-423d-8f59-a1621bc2b960/05-name-actor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc2785b7-87ab-423d-8f59-a1621bc2b960/05-name-actor.png)
    
    Click for full image.
    

### 添加USphere组件

1.  在 **解决方案浏览器（Solution Explorer）** 中找到 `FPSProjectile` 类头文件，并打开 `FPSProjectile.h`。
    
2.  添加[SphereComponent](https://docs.unrealengine.com/en-US/API/Runtime/Engine/Components/USphereComponent/index.html)头文件：
    
    #include "Components/SphereComponent.h"
    
3.  在 `FPSProjectile` 接口中添加 `USphereComponent` 的引用。
    
    ```cpp
        // 球体碰撞组件。
        UPROPERTY(VisibleDefaultsOnly, Category = Projectile)
        USphereComponent* CollisionComponent;
    ```
    
4.  现在 `FPSProjectile.h` 的内容应如下图所示：
    
    \~~~ //版权所有Epic Games, Inc。保留所有权利。
    
    #pragma once
    
    #include "CoreMinimal.h" #include "GameFramework/Actor.h" #include "Components/SphereComponent.h" #include "FPSProjectile.generated.h"
    
    UCLASS() class FPSPROJECT\_API AFPSProjectile : public AActor { GENERATED\_BODY()
    
    public: // 为此Actor的属性设置默认值 AFPSProjectile();
    
    protected: // 当游戏开始或重生（Spawn）时被调用 virtual void BeginPlay() override;
    
    public: // 每一帧都被调用 virtual void Tick( float DeltaTime ) override;
    
    // 球体碰撞组件 UPROPERTY(VisibleDefaultsOnly, Category = Projectile) USphereComponent\* CollisionComponent; }; ~~~
    
5.  在 **解决方案浏览器（Solution Explorer）** 中找到 `FPSProjectile` 类CPP文件，并打开 `FPSProjectile.cpp`。
    
6.  将以下代码添加到 `FPSProjectile.cpp` 中的 `AFPSProjectile` 构造函数中（在 `PrimaryActorTick.bcanEverTick` 之后）：
    
    ```cpp
        if(!RootComponent)
        {
        RootComponent = CreateDefaultSubobject<USceneComponent>(TEXT("ProjectileSceneComponent"));
        }
        if(!CollisionComponent)
        {
        // 用球体进行简单的碰撞展示。
        CollisionComponent = CreateDefaultSubobject<USphereComponent>(TEXT("SphereComponent"));
        // 设置球体的碰撞半径。
        CollisionComponent->InitSphereRadius(15.0f);
        // 将根组件设置为碰撞组件。
        RootComponent = CollisionComponent;
        }
    ```
    
    你把 `CollisionComponent` 设为 `RootComponent`，模拟器将驱动此组件。
    
7.  现在 `FPSProjectile.cpp` 的内容应如下图所示：
    
    \~~~ //版权所有Epic Games, Inc。保留所有权利。
    
    #include "FPSProjectile.h"
    
    // 设置默认值 AFPSProjectile::AFPSProjectile() { // 将此actor设置为每帧调用Tick()。 如果不需要此特性，可以关闭以提升性能。 PrimaryActorTick.bCanEverTick = true;
    
    if(!RootComponent) { RootComponent = CreateDefaultSubobject(TEXT("ProjectileSceneComponent")); }
    
    if(!CollisionComponent) { // 用球体进行简单的碰撞展示。 CollisionComponent = CreateDefaultSubobject(TEXT("SphereComponent")); // 设置球体的碰撞半径。 CollisionComponent->InitSphereRadius(15.0f); // 将根组件设置为碰撞组件。 RootComponent = CollisionComponent; } }
    
    // 当游戏开始或重生（Spawn）时被调用 void AFPSProjectile::BeginPlay() { Super::BeginPlay();
    
    }
    
    // 每一帧都被调用 void AFPSProjectile::Tick( float DeltaTime ) { Super::Tick( DeltaTime );
    
    } ~~~
    

### 添加发射物移动组件

1.  在 **解决方案浏览器（Solution Explorer）** 中找到 `FPSProjectile` 类头文件，并打开 `FPSProjectile.h`。
    
2.  添加[ProjectileMovementComponent](https://docs.unrealengine.com/en-US/API/Runtime/Engine/GameFramework/UProjectileMovementComponent/index.html)头文件。
    
    \~~~ #include "GameFramework/ProjectileMovementComponent.h" ~~~
    
3.  将以下代码添加到 `FPSProjectile.h`：
    
    ```cpp
        // 发射物移动组件。
        UPROPERTY(VisibleAnywhere, Category = Movement)
        UProjectileMovementComponent* ProjectileMovementComponent;
    ```
    
4.  现在 `FPSProjectile.h` 的内容应如下图所示：
    
    ```cpp
        //版权所有Epic Games, Inc。保留所有权利。
    
        #pragma once
    
        #include "CoreMinimal.h"
        #include "GameFramework/Actor.h"
        #include "Components/SphereComponent.h"
        #include "GameFramework/ProjectileMovementComponent.h"
        #include "FPSProjectile.generated.h"
    
        UCLASS()
        class FPSPROJECT_API AFPSProjectile : public AActor
        {
            GENERATED_BODY()
    
        public: 
            // 为此Actor的属性设置默认值
            AFPSProjectile();
    
        protected:
            // 当游戏开始或重生（Spawn）时被调用
            virtual void BeginPlay() override;
    
        public:
            // 每一帧都被调用
            virtual void Tick( float DeltaTime ) override;
    
            // 球体碰撞组件。
            UPROPERTY(VisibleDefaultsOnly, Category = Projectile)
            USphereComponent* CollisionComponent;
    
            // 发射物移动组件。
            UPROPERTY(VisibleAnywhere, Category = Movement)
            UProjectileMovementComponent* ProjectileMovementComponent;
        };
    ```
    
5.  从 **解决方案浏览器（Solution Explorer）** 打开 `FPSProjectile.cpp`。
    
6.  将以下代码行添加到 `FPSProjectile.cpp` 中的 `FPSProjectile` 构造函数中：
    
    ```cpp
        if(!ProjectileMovementComponent)
        {
            // 使用此组件驱动发射物的移动。
            ProjectileMovementComponent = CreateDefaultSubobject<UProjectileMovementComponent>(TEXT("ProjectileMovementComponent"));
            ProjectileMovementComponent->SetUpdatedComponent(CollisionComponent);
            ProjectileMovementComponent->InitialSpeed = 3000.0f;
            ProjectileMovementComponent->MaxSpeed = 3000.0f;
            ProjectileMovementComponent->bRotationFollowsVelocity = true;
            ProjectileMovementComponent->bShouldBounce = true;
            ProjectileMovementComponent->Bounciness = 0.3f;
            ProjectileMovementComponent->ProjectileGravityScale = 0.0f;
        }
    ```
    
7.  现在 `FPSProjectile.cpp` 的内容应如下图所示：
    
    ```cpp
        //版权所有Epic Games, Inc。保留所有权利。
    
        #include "FPSProjectile.h"
    
        // 设置默认值
        AFPSProjectile::AFPSProjectile()
        {
            // 将此actor设置为每帧调用Tick()。  如果不需要此特性，可以关闭以提升性能。
            PrimaryActorTick.bCanEverTick = true;
            if(!RootComponent)
            {
                RootComponent = CreateDefaultSubobject<USceneComponent>(TEXT("ProjectileSceneComponent"));
            }
    
            if(!CollisionComponent)
            {
                // 用球体进行简单的碰撞展示。
                CollisionComponent = CreateDefaultSubobject<USphereComponent>(TEXT("SphereComponent"));
                // 设置球体的碰撞半径。
                CollisionComponent->InitSphereRadius(15.0f);
                // 将根组件设置为碰撞组件。
                RootComponent = CollisionComponent;
            }
    
            if(!ProjectileMovementComponent)
            {
                // 使用此组件驱动发射物的移动。
                ProjectileMovementComponent = CreateDefaultSubobject<UProjectileMovementComponent>(TEXT("ProjectileMovementComponent"));
                ProjectileMovementComponent->SetUpdatedComponent(CollisionComponent);
                ProjectileMovementComponent->InitialSpeed = 3000.0f;
                ProjectileMovementComponent->MaxSpeed = 3000.0f;
                ProjectileMovementComponent->bRotationFollowsVelocity = true;
                ProjectileMovementComponent->bShouldBounce = true;
                ProjectileMovementComponent->Bounciness = 0.3f;
                ProjectileMovementComponent->ProjectileGravityScale = 0.0f;
            }
        }
    
        // 当游戏开始或重生（Spawn）时被调用
        void AFPSProjectile::BeginPlay()
        {
            Super::BeginPlay();
    
        }
    
        // 每一帧都被调用
        void AFPSProjectile::Tick( float DeltaTime )
        {
            Super::Tick( DeltaTime );
    
        }
    ```
    

### 设置发射物的初始速度

1.  在 **解决方案浏览器（Solution Explorer）** 中打开 `FPSProjectile.h`。
    
2.  在FPSProjectile.h中添加以下函数声明：
    
    ```cpp
        // 初始化射击方向上发射物速度的函数。
        void FireInDirection(const FVector& ShootDirection);
    ```
    
    此函数将负责发射发射物。
    
3.  现在 `FPSProjectile.h` 的内容应如下图所示：
    
    ```cpp
        //版权所有Epic Games, Inc。保留所有权利。
    
        #pragma once
    
        #include "CoreMinimal.h"
        #include "GameFramework/Actor.h"
        #include "Components/SphereComponent.h"
        #include "GameFramework/ProjectileMovementComponent.h"
        #include "FPSProjectile.generated.h"
    
        UCLASS()
        class FPSPROJECT_API AFPSProjectile : public AActor
        {
            GENERATED_BODY()
    
        public: 
            // 为此Actor的属性设置默认值
            AFPSProjectile();
    
        protected:
            // 当游戏开始或重生（Spawn）时被调用
            virtual void BeginPlay() override;
    
        public:
            // 每一帧都被调用
            virtual void Tick( float DeltaTime ) override;
    
            // 球体碰撞组件。
            UPROPERTY(VisibleDefaultsOnly, Category = Projectile)
            USphereComponent* CollisionComponent;
    
            // 发射物移动组件。
            UPROPERTY(VisibleAnywhere, Category = Movement)
            UProjectileMovementComponent* ProjectileMovementComponent;
    
            // 初始化射击方向上发射物速度的函数。
            void FireInDirection(const FVector& ShootDirection);
        };
    ```
    
4.  在 **解决方案浏览器（Solution Explorer）** 中打开 `FPSProjectile.cpp`。
    
5.  将以下函数定义添加到 `FPSProjectile.cpp`：
    
    ```cpp
        // 初始化射击方向上发射物速度的函数。
        void AFPSProjectile::FireInDirection(const FVector& ShootDirection)
        {
            ProjectileMovementComponent->Velocity = ShootDirection * ProjectileMovementComponent->InitialSpeed;
        }
    ```
    
    你只需提供发射方向，因为发射物的速度由 `ProjectileMovementComponent` 定义。
    
6.  现在 `FPSProjectile.cpp` 的内容应如下图所示：
    
    ```cpp
        //版权所有Epic Games, Inc。保留所有权利。
    
        #include "FPSProjectile.h"
    
        // 设置默认值
        AFPSProjectile::AFPSProjectile()
        {
        // 将此actor设置为每帧调用Tick()。  如果不需要此特性，可以关闭以提升性能。
        PrimaryActorTick.bCanEverTick = true;
    
        if(!RootComponent)
        {
            // 用球体进行简单的碰撞展示。
            CollisionComponent = CreateDefaultSubobject<USphereComponent>(TEXT("SphereComponent"));
            // 设置球体的碰撞半径。
            CollisionComponent->InitSphereRadius(15.0f);
            // 将根组件设置为碰撞组件。
            RootComponent = CollisionComponent;
        }
    
        if(!ProjectileMovementComponent)
        {
            // 使用此组件驱动发射物的移动。
            ProjectileMovementComponent = CreateDefaultSubobject<UProjectileMovementComponent>(TEXT("ProjectileMovementComponent"));
            ProjectileMovementComponent->SetUpdatedComponent(CollisionComponent);
            ProjectileMovementComponent->InitialSpeed = 3000.0f;
            ProjectileMovementComponent->MaxSpeed = 3000.0f;
            ProjectileMovementComponent->bRotationFollowsVelocity = true;
            ProjectileMovementComponent->bShouldBounce = true;
            ProjectileMovementComponent->Bounciness = 0.3f;
            ProjectileMovementComponent->ProjectileGravityScale = 0.0f;
        }
        }
    
        // 当游戏开始或重生（Spawn）时被调用
        void AFPSProjectile::BeginPlay()
        {
        Super::BeginPlay();
    
        }
    
        // 每一帧都被调用
        void AFPSProjectile::Tick( float DeltaTime )
        {
        Super::Tick( DeltaTime );
    
        }
    
        // 初始化射击方向上发射物速度的函数。
        void AFPSProjectile::FireInDirection(const FVector& ShootDirection)
        {
        ProjectileMovementComponent->Velocity = ShootDirection * ProjectileMovementComponent->InitialSpeed;
        }
    ```
    

### 绑定发射输入操作

1.  在 **解决方案浏览器（Solution Explorer）** 中打开 `FPSCharacter.h`。
    
2.  在 `FPSCharacter.h` 中添加以下函数声明：
    
    ```cpp
        // 处理发射物射击的函数。
        UFUNCTION()
        void Fire();
    ```
    
3.  现在 `FPSCharacter.h` 的内容应如下所示：
    
    ```cpp
        //版权所有Epic Games, Inc。保留所有权利。
    
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
    
            // 处理发射物射击的函数。
            UFUNCTION()
            void Fire();
    
            // FPS摄像机
            UPROPERTY(VisibleAnywhere)
            UCameraComponent* FPSCameraComponent;
    
            // 第一人称网格体（手臂），仅对所属玩家可见。
            UPROPERTY(VisibleDefaultsOnly, Category = Mesh)
            USkeletalMeshComponent* FPSMesh;
        };
    ```
    
4.  在 **解决方案浏览器（Solution Explorer）** 中找到 `FPSCharacter` CPP文件，并打开 `FPSCharacter.cpp`。
    
5.  要绑定发射函数，请将以下代码添加到 `FPSCharacter.cpp` 中的 `SetupPlayerInputComponent` 函数中：
    
    ```cpp
        PlayerInputComponent->BindAction("Fire", IE_Pressed, this, &AFPSCharacter::Fire);
    ```
    
6.  现在，将以下函数定义添加到 `FPSCharacter.cpp`：
    
    ```cpp
        void AFPSCharacter::Fire()
        {
        }
    ```
    
7.  现在 `FPSCharacter.cpp` 的内容应如下所示：
    
    ```cpp
        //版权所有Epic Games, Inc。保留所有权利。
    
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
    
            if (GEngine)
            {
                // 显示调试消息五秒。 
                // -1"键"值参数可以防止更新或刷新消息。
                GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Red, TEXT("We are using FPSCharacter."));
            }
        }
    
        // 每一帧都被调用
        void AFPSCharacter::Tick( float DeltaTime )
        {
            Super::Tick( DeltaTime );
    
        }
    
        // 被调用，将功能与输入绑定
        void AFPSCharacter::SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent)
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
            PlayerInputComponent->BindAction("Fire", IE_Pressed, this, &AFPSCharacter::Fire);
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
    
        void AFPSCharacter::Fire()
        {
        }
    ```
    

### 定义发射物的生成位置

1.  生成 `FPSProjectile` actor并实现 `OnFire` 函数时需要考虑两点，即：
    
    -   发射物的生成位置。
    -   发射物对应的类（让 `FPSCharacter` 及其派生蓝图知道要生成哪种发射物）。
    
    你将使用一个摄像机空间中的偏移向量来确定发射物的生成位置。设置该参数为可编辑参数，这样你就可以在 `BP_FPSCharacter` 蓝图中对其进行设置和调整。最终，你可以基于这些数据计算发射物的初始位置。
    
2.  在 **解决方案浏览器（Solution Explorer）** 中打开 `FPSCharacter.h`。
    
3.  将以下代码添加到 `FPSCharacter.h`：
    
    ```cpp
        // 枪口相对于摄像机位置的偏移。
        UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = Gameplay)
        FVector MuzzleOffset;
    ```
    
    `EditAnywhere` 值让你可以在蓝图编辑器的默认（Defaults）模式下或在任何角色实例的细节（Details）选项卡中更改枪口偏移值。 `BlueprintReadWrite` 选项值让你可以在蓝图中获取和设置枪口偏移值。
    
4.  将以下代码添加到 `FPSCharacter.h` 中的受保护访问说明符下：
    
    ```cpp
        // 要生成的发射物类。
        UPROPERTY(EditDefaultsOnly, Category = Projectile)
        TSubclassOf<class AFPSProjectile> ProjectileClass;
    ```
    
    `EditDefaultsOnly` 意味着你只能将发射物类设置为蓝图上的默认值，而不是每个蓝图实例上的默认值。
    
5.  现在 `FPSCharacter.h` 的内容应如下图所示：
    
    ```cpp
        //版权所有Epic Games, Inc。保留所有权利。
    
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
    
        // 要生成的发射物类。
        UPROPERTY(EditDefaultsOnly, Category = Projectile)
        TSubclassOf<class AFPSProjectile> ProjectileClass;
    
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
    
        // 发射发射物的函数。
        UFUNCTION()
        void Fire();
    
        // FPS摄像机
        UPROPERTY(VisibleAnywhere)
        UCameraComponent* FPSCameraComponent;
    
        // 第一人称网格体（手臂），仅对所属玩家可见。
        UPROPERTY(VisibleDefaultsOnly, Category = Mesh)
        USkeletalMeshComponent* FPSMesh;
    
        // 枪口相对于摄像机位置的偏移。
        UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = Gameplay)
        FVector MuzzleOffset;
    
        };
    ```
    

### 编译并检查代码

现在我们来编译并检查新实现的发射物代码。

1.  在Visual Studio中保存所有头文件和实现文件。
    
2.  在 **解决方案浏览器（Solution Explorer）** 中找到 **FPSProject**。
    
3.  右键点击 **FPSProject** 并选择 **构建（Build）**，编译你的项目。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe3b6b33-418e-491c-a0ec-9a0c4626c0ea/06-build-project.png)
    
    此步骤的目的是在继续下一步之前发现所有构建错误。如果你遇到本教程范围之外的任何构建错误或警告，请参阅我们的[编码标准](/documentation/zh-cn/unreal-engine/epic-cplusplus-coding-standard-for-unreal-engine)和[虚幻引擎API引用](/documentation/en-us/unreal-engine/API)。
    

## 3.2 - 实现射击

了解如何实现第一人称射击角色的射击动作。

### 实现发射函数

1.  将以下代码行添加到FPSCharacter.h：
    
    ```cpp
        #include "FPSProjectile.h"
    ```
    
2.  将以下 `发射` 函数定义添加到FPSCharacter.cpp：
    
    ```cpp
        void AFPSCharacter::Fire()
        {
        // 试图发射发射物。
        if (ProjectileClass)
        {
        // 获取摄像机变换。
        FVector CameraLocation;
        FRotator CameraRotation;
        GetActorEyesViewPoint(CameraLocation, CameraRotation);
    
        // 设置MuzzleOffset，在略靠近摄像机前生成发射物。
        MuzzleOffset.Set(100.0f, 0.0f, 0.0f);
    
        // 将MuzzleOffset从摄像机空间变换到世界空间。
        FVector MuzzleLocation = CameraLocation + FTransform(CameraRotation).TransformVector(MuzzleOffset);
            
        // 使目标方向略向上倾斜。
        FRotator MuzzleRotation = CameraRotation;
        MuzzleRotation.Pitch += 10.0f;
    
        UWorld* World = GetWorld();
        if (World)
        {
            FActorSpawnParameters SpawnParams;
            SpawnParams.Owner = this;
            SpawnParams.Instigator = GetInstigator();
    
            // 在枪口位置生成发射物。
            AFPSProjectile* Projectile = World->SpawnActor<AFPSProjectile>(ProjectileClass, MuzzleLocation, MuzzleRotation, SpawnParams);
            if (Projectile)
            {
                // 设置发射物的初始轨迹。
                FVector LaunchDirection = MuzzleRotation.Vector();
                Projectile->FireInDirection(LaunchDirection);
            }
        }
        }
        }
    ```
    
3.  现在 `FPSCharacter.h` 的内容应如下所示：
    
    ```cpp
        //版权所有Epic Games, Inc。保留所有权利。
    
        #pragma once
    
        #include "CoreMinimal.h"
        #include "GameFramework/Character.h"
        #include "Camera/CameraComponent.h"
        #include "Components/CapsuleComponent.h"
        #include "FPSProjectile.h"
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
    
           // 要生成的发射物类。
           UPROPERTY(EditAnywhere, Category = Projectile)
           TSubclassOf<class AFPSProjectile> ProjectileClass;
        
        public:
            // 每一帧都被调用
            virtual void Tick(float DeltaTime) override;
        
            // 被调用，将功能与输入绑定
           virtual void SetupPlayerInputComponent(class UIComponent* PlayerInputComponent) override;
        
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
    
            // 发射发射物的函数。
            UFUNCTION()
            void Fire();
    
            // FPS摄像机
            UPROPERTY(VisibleAnywhere)
            UCameraComponent* FPSCameraComponent;
    
            // 第一人称网格体（手臂），仅对所属玩家可见。
            UPROPERTY(VisibleDefaultsOnly, Category = Mesh)
            USkeletalMeshComponent* FPSMesh;
    
            // 枪口相对于摄像机位置的偏移。
            UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = Gameplay)
            FVector MuzzleOffset;
    
        };
    ```
    
4.  现在 `FPSCharacter.cpp` 的内容应如下所示：
    
    ```cpp
        //版权所有Epic Games, Inc。保留所有权利。
    
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
    
            if (GEngine)
            {
                // 显示调试消息五秒。 
                // -1"键"值参数可以防止更新或刷新消息。
                GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Red, TEXT("We are using FPSCharacter."));
            }
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
            PlayerInputComponent->BindAction("Fire", IE_Pressed, this, &AFPSCharacter::Fire);
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
    
        void AFPSCharacter::Fire()
        {
            // 试图发射发射物。
            if (ProjectileClass)
            {
                // 获取摄像机变换。
                FVector CameraLocation;
                FRotator CameraRotation;
                GetActorEyesViewPoint(CameraLocation, CameraRotation);
    
                // 设置MuzzleOffset，在略靠近摄像机前生成发射物。
                MuzzleOffset.Set(100.0f, 0.0f, 0.0f);
    
                // 将MuzzleOffset从摄像机空间变换到世界空间。
                FVector MuzzleLocation = CameraLocation + FTransform(CameraRotation).TransformVector(MuzzleOffset);
                    
                // 使目标方向略向上倾斜。
                FRotator MuzzleRotation = CameraRotation;
                MuzzleRotation.Pitch += 10.0f;
    
                UWorld* World = GetWorld();
                if (World)
                {
                    FActorSpawnParameters SpawnParams;
                    SpawnParams.Owner = this;
                    SpawnParams.Instigator = GetInstigator();
                        
                    // 在枪口位置生成发射物。
                    AFPSProjectile* Projectile = World->SpawnActor<AFPSProjectile>(ProjectileClass, MuzzleLocation, MuzzleRotation, SpawnParams);
                    if (Projectile)
                    {
                        // 设置发射物的初始轨迹。
                        FVector LaunchDirection = MuzzleRotation.Vector();
                        Projectile->FireInDirection(LaunchDirection);
                    }
                }
            }
        }
    ```
    
5.  在 Visual Studio 中保存 `FPSCharacter.h` 和 `FPSCharacter.cpp`。
    
6.  在 **解决方案浏览器（Solution Explorer）** 中找到 **FPSProject**。
    
7.  右键点击 **FPSProject** 并选择 **构建（Build）**，编译你的项目。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e96ab83e-dbff-490b-95af-5772a0c5ff37/06-build-project.png)

### 导入发射物网格体

在继续之前，请通过以下链接下载并提取示例网格体： ["发射物网格体"](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/07ff80aa-eca1-42cf-a2d4-0ed20a7e3f52/sphere.zip)

1.  右键点击内容浏览器的文件框，打开 **导入资产（Import Asset）** 对话框
    
    尽管我们使用的是右键点击导入，但是一共有三种方法可以导入内容。阅读下面这些文档，了解如何使用以下方法导入内容：
    
    -   [导入按钮](/documentation/zh-cn/unreal-engine/importing-assets-directly-into-unreal-engine)
    
2.  点击 **'导入/游戏...（Import to /Game...）'**，打开 **导入（Import）** 对话框。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86d9fd28-547f-452b-9aa6-235803530cd2/07-import.png)
3.  找到并选择 **Sphere.fbx** 网格体文件。
    
4.  点击 **打开（Open）**，开始将网格体导入到你的项目中。
    
5.  **内容浏览器（Content Browser）** 中将显示 **FBX导入选项（FBX Import Options）** 对话框。点击 **全部导入（Import All）**，将你的网格体添加到项目。
    
    忽略以下有关平滑组的错误：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4405a899-74e4-418b-b5bc-2616583bb048/09-message-log.png)
    
    此网格体仍展示为第一人称网格体设置，它将与你在后面段中设置的动画一起使用。
    
6.  点击 **保存（Save）** 按钮，保存已导入的静态网格体。
    

### 添加发射物网格体

1.  将以下代码添加到FPSProjectile.h：
    
    ```cpp
        // 发射物网格体
        UPROPERTY(VisibleDefaultsOnly, Category = Projectile)
        UStaticMeshComponent* ProjectileMeshComponent;
    ```
    
2.  将以下代码添加到FPSProjectile.cpp中的构造函数中：
    
    ```cpp
        if(!ProjectileMeshComponent)
        {
            ProjectileMeshComponent = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("ProjectileMeshComponent"));
            static ConstructorHelpers::FObjectFinder<UStaticMesh>Mesh(TEXT("[ADD STATIC MESH ASSET REFERENCE]"));
            if(Mesh.Succeeded())
            {
                ProjectileMeshComponent->SetStaticMesh(Mesh.Object);
            }
        }
    ```
    
3.  打开内容浏览器，右键点击球体静态网格体，选择 **复制引用（Copy Reference）**：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8251916b-a6e5-4bd7-bdb1-791c54bb28e8/11-sphere-ref.png)
4.  返回到FPSProjectile.cpp中的ProjectileMeshComponent代码段，并用复制的引用替换\[添加静态网格体资产引用(ADD STATIC MESH ASSET REFERENCE)\]。你添加的代码段应类似于以下内容：
    
    ```cpp
        if(!ProjectileMeshComponent)
        {
            ProjectileMeshComponent = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("ProjectileMeshComponent"));
            static ConstructorHelpers::FObjectFinder<UStaticMesh>Mesh(TEXT("'/Game/Sphere.Sphere'"));
            if(Mesh.Succeeded())
            {
                ProjectileMeshComponent->SetStaticMesh(Mesh.Object);
            }
        }
    ```
    
    资产引用路径可能会有所不同，具体取决于你在内容浏览器中保存球体网格体时所选择的位置。此外，当你粘贴复制的资产引用时，该引用在资产的引用路径之前包含资产类型名称。在我们的示例中，你将看到StaticMesh'/Game/Sphere.Sphere'。请确保从引用路径中删除资产类型名称（例如StaticMesh）。
    
5.  现在 `FPSProjectile.h` 的内容应如下图所示：
    
    ```cpp
        //版权所有Epic Games, Inc。保留所有权利。
         
        #pragma once
         
        #include "CoreMinimal.h"
        #include "GameFramework/Actor.h"
        #include "Components/SphereComponent.h"
        #include "GameFramework/ProjectileMovementComponent.h"
        #include "FPSProjectile.generated.h"
         
        UCLASS()
        class FPSPROJECT_API AFPSProjectile : public AActor
        {
            GENERATED_BODY()
            
        public:	
            // 为此Actor的属性设置默认值
            AFPSProjectile();
         
        protected:
            // 当游戏开始或重生（Spawn）时被调用
            virtual void BeginPlay() override;
         
        public:	
            // 每一帧都被调用
            virtual void Tick(float DeltaTime) override;
         
            // 球体碰撞组件
            UPROPERTY(VisibleDefaultsOnly, Category = Projectile)
            USphereComponent* CollisionComponent;
         
            // 发射物移动组件
            UPROPERTY(VisibleAnywhere, Category = Movement)
            UProjectileMovementComponent* ProjectileMovementComponent;
         
            // 发射物网格体
            UPROPERTY(VisibleDefaultsOnly, Category = Projectile)
            UStaticMeshComponent* ProjectileMeshComponent;
         
            // 初始化射击方向上发射物速度的函数。
            void FireInDirection(const FVector& ShootDirection);
         
        };
    ```
    
6.  现在 `FPSProjectile.cpp` 的内容应如下图所示：
    
    ```cpp
        //版权所有Epic Games, Inc。保留所有权利。         
             
        #include "FPSProjectile.h"
             
        // 设置默认值
        AFPSProjectile::AFPSProjectile()
        {
            // 将此actor设置为每帧调用Tick()。  如果不需要此特性，可以关闭以提升性能。
            PrimaryActorTick.bCanEverTick = true;
             
            if (!RootComponent)
            {
                RootComponent = CreateDefaultSubobject<USceneComponent>(TEXT("ProjectileSceneComponent"));
            }
             
            if (!CollisionComponent)
            {
                // 用球体进行简单的碰撞展示。
                CollisionComponent = CreateDefaultSubobject<USphereComponent>(TEXT("SphereComponent"));
                // 设置球体的碰撞半径。
                CollisionComponent->InitSphereRadius(15.0f);
                // 将根组件设置为碰撞组件。
                RootComponent = CollisionComponent;
            }
             
            if (!ProjectileMovementComponent)
            {
                // 使用此组件驱动发射物的移动。
                ProjectileMovementComponent = CreateDefaultSubobject<UProjectileMovementComponent>(TEXT("ProjectileMovementComponent"));
                ProjectileMovementComponent->SetUpdatedComponent(CollisionComponent);
                ProjectileMovementComponent->InitialSpeed = 3000.0f;
                ProjectileMovementComponent->MaxSpeed = 3000.0f;
                ProjectileMovementComponent->bRotationFollowsVelocity = true;
                ProjectileMovementComponent->bShouldBounce = true;
                ProjectileMovementComponent->Bounciness = 0.3f;
                ProjectileMovementComponent->ProjectileGravityScale = 0.0f;
            }
             
            if (!ProjectileMeshComponent)
            {
                ProjectileMeshComponent = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("ProjectileMeshComponent"));
                static ConstructorHelpers::FObjectFinder<UStaticMesh>Mesh(TEXT("'/Game/Sphere.Sphere'"));
                if (Mesh.Succeeded())
                {
                    ProjectileMeshComponent->SetStaticMesh(Mesh.Object);
                }
            }
        }
             
        // 当游戏开始或重生（Spawn）时被调用
        void AFPSProjectile::BeginPlay()
        {
            Super::BeginPlay();
                
        }
             
        // 每一帧都被调用
        void AFPSProjectile::Tick(float DeltaTime)
        {
            Super::Tick(DeltaTime);
             
        }
             
        // 初始化射击方向上发射物速度的函数。
        void AFPSProjectile::FireInDirection(const FVector& ShootDirection)
        {
            ProjectileMovementComponent->Velocity = ShootDirection * ProjectileMovementComponent->InitialSpeed;
        }
    ```
    
7.  保存并构建代码，然后继续下一步，在下一步中你将设置网格体的材质和缩放。
    

### 添加发射物的材质

1.  将以下代码添加到FPSProjectile.h：
    
    ```cpp
        // 发射物材质
        UPROPERTY(VisibleDefaultsOnly, Category = Movement)
        UMaterialInstanceDynamic* ProjectileMaterialInstance;
    ```
    
2.  将以下代码添加到FPSProjectile.cpp中的构造函数中：
    
    ```cpp
        static ConstructorHelpers::FObjectFinder<UMaterial>Material(TEXT("[ADD MATERIAL ASSET REFERENCE]"));
        if (Material.Succeeded())
        {
        ProjectileMaterialInstance = UMaterialInstanceDynamic::Create(Material.Object, ProjectileMeshComponent);
        }
        ProjectileMeshComponent->SetMaterial(0, ProjectileMaterialInstance);
        ProjectileMeshComponent->SetRelativeScale3D(FVector(0.09f, 0.09f, 0.09f));
        ProjectileMeshComponent->SetupAttachment(RootComponent);
    ```
    
3.  在 **内容浏览器（Content Browser）** 中右键点击并选择 **材质（Material）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6c4040c-6d1b-43dc-965d-3dc8f6221782/12-create-material.png)
4.  将新材质命名为"SphereMaterial"。
    
5.  设置新材质的节点图表，其属性值类似下图：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7258cc51-0d25-4130-aaf9-ccaa18cee1ac/setspherenodes.png)
    
    -   **底色（Base Color）：**Constant2VectorNode设置为（1,0,0）
    -   **高光度（Specular）：**常量节点设置为0.5 自发光颜色：常量节点设置为0.05
    -   **自发光颜色：**常量节点设置为0.05
    
    在此步骤中，你将创建一个基础材质资产。如果想要学习如何制作更复杂的材质，请阅读"如何使用和制作材质"。
    
6.  设置新材质的节点图表后，点击保存（Save），并打开内容浏览器。
    
7.  右键点击球体材质（Sphere material），并选择复制引用（Copy Reference）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94fda945-33e2-4807-bebb-02afcbfd9fb2/15-material-ref.png)
8.  返回到FPSProjectile.cpp中的ProjectileMeshComponent代码段，用复制的引用替换\[添加材质资产引用(ADD MATERIAL ASSET REFERENCE)\]。你添加的代码段应类似于以下内容：
    
    ```cpp
        static ConstructorHelpers::FObjectFinder<UMaterial>Material(TEXT("'/Game/SphereMaterial.SphereMaterial'"));
        if (Material.Succeeded())
        {
            ProjectileMaterialInstance = UMaterialInstanceDynamic::Create(Material.Object, ProjectileMeshComponent);
        }
        ProjectileMeshComponent->SetMaterial(0, ProjectileMaterialInstance);
        ProjectileMeshComponent->SetRelativeScale3D(FVector(0.09f, 0.09f, 0.09f));
        ProjectileMeshComponent->SetupAttachment(RootComponent);
    ```
    
    资产引用路径可能会有所不同，具体取决于你在内容浏览器中保存球体材质时所选择的位置。此外，当你粘贴复制的资产引用时，该引用在资产的引用路径之前包含资产类型名称。在我们的例子中，你将看到Material'/Game/Sphere.Sphere'。请确保从引用路径中删除资产的类型名称（例如Material）。
    
9.  现在 `FPSProjectile.h` 的内容应如下图所示：
    
    ```cpp
        //版权所有Epic Games, Inc。保留所有权利。
             
        #pragma once
             
        #include "CoreMinimal.h"
        #include "GameFramework/Actor.h"
        #include "Components/SphereComponent.h"
        #include "GameFramework/ProjectileMovementComponent.h"
        #include "FPSProjectile.generated.h"
             
        UCLASS()
        class FPSPROJECT_API AFPSProjectile : public AActor
        {
            GENERATED_BODY()
                
        public:	
            // 为此Actor的属性设置默认值
            AFPSProjectile();
             
        protected:
            // 当游戏开始或重生（Spawn）时被调用
            virtual void BeginPlay() override;
             
        public:	
            // 每一帧都被调用
            virtual void Tick(float DeltaTime) override;
             
            // 球体碰撞组件
            UPROPERTY(VisibleDefaultsOnly, Category = Projectile)
            USphereComponent* CollisionComponent;
             
            // 发射物移动组件
            UPROPERTY(VisibleAnywhere, Category = Movement)
            UProjectileMovementComponent* ProjectileMovementComponent;
             
            // 发射物网格体
            UPROPERTY(VisibleDefaultsOnly, Category = Projectile)
            UStaticMeshComponent* ProjectileMeshComponent;
             
            // 发射物材质
            UPROPERTY(VisibleDefaultsOnly, Category = Movement)
            UMaterialInstanceDynamic* ProjectileMaterialInstance;
             
            // 初始化射击方向上发射物速度的函数。
            void FireInDirection(const FVector& ShootDirection);
             
        };
    ```
    
10.  现在 `FPSProjectile.cpp` 的内容应如下图所示：
    
    ```cpp
        //版权所有Epic Games, Inc。保留所有权利。     
         
        #include "FPSProjectile.h"
         
        // 设置默认值
        AFPSProjectile::AFPSProjectile()
        {
        // 将此actor设置为每帧调用Tick()。  如果不需要此特性，可以关闭以提升性能。
        PrimaryActorTick.bCanEverTick = true;
         
        if (!RootComponent)
        {
            RootComponent = CreateDefaultSubobject<USceneComponent>(TEXT("ProjectileSceneComponent"));
        }
         
        if (!CollisionComponent)
        {
            // 用球体进行简单的碰撞展示。
            CollisionComponent = CreateDefaultSubobject<USphereComponent>(TEXT("SphereComponent"));
            // 设置球体的碰撞半径。
            CollisionComponent->InitSphereRadius(15.0f);
            // 将根组件设置为碰撞组件。
            RootComponent = CollisionComponent;
        }
         
        if (!ProjectileMovementComponent)
        {
            // 使用此组件驱动发射物的移动。
            ProjectileMovementComponent = CreateDefaultSubobject<UProjectileMovementComponent>(TEXT("ProjectileMovementComponent"));
            ProjectileMovementComponent->SetUpdatedComponent(CollisionComponent);
            ProjectileMovementComponent->InitialSpeed = 3000.0f;
            ProjectileMovementComponent->MaxSpeed = 3000.0f;
            ProjectileMovementComponent->bRotationFollowsVelocity = true;
            ProjectileMovementComponent->bShouldBounce = true;
            ProjectileMovementComponent->Bounciness = 0.3f;
            ProjectileMovementComponent->ProjectileGravityScale = 0.0f;
        }
         
        if (!ProjectileMeshComponent)
        {
            ProjectileMeshComponent = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("ProjectileMeshComponent"));
            static ConstructorHelpers::FObjectFinder<UStaticMesh>Mesh(TEXT("'/Game/Sphere.Sphere'"));
            if (Mesh.Succeeded())
            {
                ProjectileMeshComponent->SetStaticMesh(Mesh.Object);
            }
         
            static ConstructorHelpers::FObjectFinder<UMaterial>Material(TEXT("'/Game/SphereMaterial.SphereMaterial'"));
            if (Material.Succeeded())
            {
                ProjectileMaterialInstance = UMaterialInstanceDynamic::Create(Material.Object, ProjectileMeshComponent);
            }
            ProjectileMeshComponent->SetMaterial(0, ProjectileMaterialInstance);
            ProjectileMeshComponent->SetRelativeScale3D(FVector(0.09f, 0.09f, 0.09f));
            ProjectileMeshComponent->SetupAttachment(RootComponent);
        }
            }
         
            // 当游戏开始或重生（Spawn）时被调用
            void AFPSProjectile::BeginPlay()
            {
        Super::BeginPlay();
            
            }
         
            // 每一帧都被调用
            void AFPSProjectile::Tick(float DeltaTime)
            {
        Super::Tick(DeltaTime);
         
            }
         
            // 初始化射击方向上发射物速度的函数。
            void AFPSProjectile::FireInDirection(const FVector& ShootDirection)
            {
        ProjectileMovementComponent->Velocity = ShootDirection * ProjectileMovementComponent->InitialSpeed;
            }
    ```
    
11.  前往内容浏览器中的蓝图文件夹，并打开BP\_FPSCharacter文件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5abe77f-a762-4015-800d-ef9ab7e84f19/16-bp-fps-character.png)
12.  打开完整的编辑器（如有必要），然后导航到细节（Detail）面板。
    
13.  找到发射物（Projectile）标头，然后在发射物类（Projectile Class）旁边的下拉列表中，选择FPSProjectile。
    
    ![](18-set-projectile-class.PNG)
14.  构建FPSProject，然后以PIE模式运行游戏，以确认在场景中生成了静态网格体和材质。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea4ce47a-adc5-42a8-8b8d-21c598c6cdb2/fps-implementing-projectile-animation-1.gif)
    
    发射发射物时，你会在世界大纲视图中看到发射物的数量不断增加，因为它们没有已定义的生命周期。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2e363aa-456a-489d-bd97-d54af6c65f84/20-increasing.png)
    
    在下一分段中，我们将展示如何定义发射物的初始生命周期。
    

## 3.3 - 设置发射物的碰撞和生命周期

目前，我们的发射物：

-   永远存在（永远不会从场景大纲中消失）
-   不会与世界中的其他对象碰撞

在此步骤中，我们将设置发射物的碰撞和生命周期。

### 限制发射物的生命周期

1.  打开FPSProjectile.cpp。
    
2.  将以下代码添加到FPSProjectile构造函数中，以设置发射物的生命周期：
    
    ```cpp
        // 3 秒后删除发射物。
        InitialLifeSpan = 3.0f;
    ```
    
3.  现在 `FPSProjectile.cpp` 的内容应如下图所示：
    
    ```cpp
        //版权所有Epic Games, Inc。保留所有权利。
                      
        #include "FPSProjectile.h"
             
        // 设置默认值
        AFPSProjectile::AFPSProjectile()
        {
            // 将此actor设置为每帧调用Tick()。  如果不需要此特性，可以关闭以提升性能。
            PrimaryActorTick.bCanEverTick = true;
             
            if (!RootComponent)
            {
                RootComponent = CreateDefaultSubobject<USceneComponent>(TEXT("ProjectileSceneComponent"));
            }
             
            if (!CollisionComponent)
            {
                // 用球体进行简单的碰撞展示。
                CollisionComponent = CreateDefaultSubobject<USphereComponent>(TEXT("SphereComponent"));
                // 设置球体的碰撞半径。
                CollisionComponent->InitSphereRadius(15.0f);
                // 将根组件设置为碰撞组件。
                RootComponent = CollisionComponent;
            }
             
            if (!ProjectileMovementComponent)
            {
                // 使用此组件驱动发射物的移动。
                ProjectileMovementComponent = CreateDefaultSubobject<UProjectileMovementComponent>(TEXT("ProjectileMovementComponent"));
                ProjectileMovementComponent->SetUpdatedComponent(CollisionComponent);
                ProjectileMovementComponent->InitialSpeed = 3000.0f;
                ProjectileMovementComponent->MaxSpeed = 3000.0f;
                ProjectileMovementComponent->bRotationFollowsVelocity = true;
                ProjectileMovementComponent->bShouldBounce = true;
                ProjectileMovementComponent->Bounciness = 0.3f;
                ProjectileMovementComponent->ProjectileGravityScale = 0.0f;
            }
             
            if (!ProjectileMeshComponent)
            {
                ProjectileMeshComponent = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("ProjectileMeshComponent"));
                static ConstructorHelpers::FObjectFinder<UStaticMesh>Mesh(TEXT("'/Game/Sphere.Sphere'"));
                if (Mesh.Succeeded())
                {
                    ProjectileMeshComponent->SetStaticMesh(Mesh.Object);
                }
             
                static ConstructorHelpers::FObjectFinder<UMaterial>Material(TEXT("'/Game/SphereMaterial.SphereMaterial'"));
                if (Material.Succeeded())
                {
                    ProjectileMaterialInstance = UMaterialInstanceDynamic::Create(Material.Object, ProjectileMeshComponent);
                }
                ProjectileMeshComponent->SetMaterial(0, ProjectileMaterialInstance);
                ProjectileMeshComponent->SetRelativeScale3D(FVector(0.09f, 0.09f, 0.09f));
                ProjectileMeshComponent->SetupAttachment(RootComponent);
            }
             
            // 3 秒后删除发射物。
            InitialLifeSpan = 3.0f;
        }
             
        // 当游戏开始或重生（Spawn）时被调用
        void AFPSProjectile::BeginPlay()
        {
            Super::BeginPlay();
                
        }
             
        // 每一帧都被调用
        void AFPSProjectile::Tick(float DeltaTime)
        {
            Super::Tick(DeltaTime);
             
        }
             
        // 初始化射击方向上发射物速度的函数。
        void AFPSProjectile::FireInDirection(const FVector& ShootDirection)
        {
            ProjectileMovementComponent->Velocity = ShootDirection * ProjectileMovementComponent->InitialSpeed;
        }
    ```
    
4.  保存并编译FPSProject。
    
5.  若要确认发射物是否在三秒后被销毁，请在PIE模式下运行游戏。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a24b4042-fdb3-48df-a0ed-9d56d78464f7/fps-implementing-projectile-animation-2.gif)
    
    从世界大纲中可以看到，每个生成的发射物将在三秒后从场景中消失。
    

### 编辑发射物的碰撞设置

虚幻引擎自带了数个预设碰撞通道；不过，引擎也支持游戏项目使用自定义通道。

1.  要创建自定义碰撞通道，打开项目设置（Project Settings），在引擎（Engine） - 碰撞（Collision）中，展开预设（Preset）。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c5442f8-0f53-4fda-83b1-8a89fe4b4404/21-collision-preset.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c5442f8-0f53-4fda-83b1-8a89fe4b4404/21-collision-preset.png)
    
2.  在对象通道（Object Channels）中，选择 **新建对象通道...（New Object Channel...）**，创建新碰撞通道。将新碰撞通道命名为"Projectile"，确保将默认响应（Default Response）设置为阻止（Block），然后点击接受（Accept）。
    
    ![](22-new-object-channel.PNG)
3.  在预设（Preset）中选择 **新建...（New...）**，将新配置文件命名为"Projectile"。参考以下图片来设置你的碰撞预设。然后点击"接受（Accept）"。
    
    ![](23-new-preset-profile.PNG)

此碰撞配置文件将发射物设定为将被静态Actor、动态Actor、模拟物理Actor、载具和可破坏Actor阻挡。此外，此碰撞配置文件设定发射物与Pawn重叠。

### 使用新碰撞通道的设置

1.  打开FPSProjectile.cpp。
    
2.  在FPSProjectile构造函数中，将以下代码行添加到CreateDefaultSubobject下方
    
    ```cpp
        // 将球体的碰撞配置文件名称设置为"Projectile"。
        CollisionComponent->BodyInstance.SetCollisionProfileName(TEXT("Projectile"));
    ```
    
3.  现在 `FPSProjectile.cpp` 的内容应如下图所示：
    
    ```cpp
        //版权所有Epic Games, Inc。保留所有权利。
    
        #include "FPSProjectile.h"
    
        // 设置默认值
        AFPSProjectile::AFPSProjectile()
        {
        // 将此actor设置为每帧调用Tick()。  如果不需要此特性，可以关闭以提升性能。
        PrimaryActorTick.bCanEverTick = true;
    
        if (!RootComponent)
        {
            RootComponent = CreateDefaultSubobject<USceneComponent>(TEXT("ProjectileSceneComponent"));
        }
    
        if (!CollisionComponent)
        {
            // 用球体进行简单的碰撞展示。
            CollisionComponent = CreateDefaultSubobject<USphereComponent>(TEXT("SphereComponent"));
            // 将球体的碰撞配置文件名称设置为"Projectile"。
            CollisionComponent->BodyInstance.SetCollisionProfileName(TEXT("Projectile"));
            // 设置球体的碰撞半径。
            CollisionComponent->InitSphereRadius(15.0f);
            // 将根组件设置为碰撞组件。
            RootComponent = CollisionComponent;
        }
    
        if (!ProjectileMovementComponent)
        {
            // 使用此组件驱动发射物的移动。
            ProjectileMovementComponent = CreateDefaultSubobject<UProjectileMovementComponent>(TEXT("ProjectileMovementComponent"));
            ProjectileMovementComponent->SetUpdatedComponent(CollisionComponent);
            ProjectileMovementComponent->InitialSpeed = 3000.0f;
            ProjectileMovementComponent->MaxSpeed = 3000.0f;
            ProjectileMovementComponent->bRotationFollowsVelocity = true;
            ProjectileMovementComponent->bShouldBounce = true;
            ProjectileMovementComponent->Bounciness = 0.3f;
            ProjectileMovementComponent->ProjectileGravityScale = 0.0f;
        }
    
        if (!ProjectileMeshComponent)
        {
            ProjectileMeshComponent = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("ProjectileMeshComponent"));
            static ConstructorHelpers::FObjectFinder<UStaticMesh>Mesh(TEXT("'/Game/Sphere.Sphere'"));
            if (Mesh.Succeeded())
            {
                ProjectileMeshComponent->SetStaticMesh(Mesh.Object);
            }
    
            static ConstructorHelpers::FObjectFinder<UMaterial>Material(TEXT("'/Game/SphereMaterial.SphereMaterial'"));
            if (Material.Succeeded())
            {
                ProjectileMaterialInstance = UMaterialInstanceDynamic::Create(Material.Object, ProjectileMeshComponent);
            }
            ProjectileMeshComponent->SetMaterial(0, ProjectileMaterialInstance);
            ProjectileMeshComponent->SetRelativeScale3D(FVector(0.09f, 0.09f, 0.09f));
            ProjectileMeshComponent->SetupAttachment(RootComponent);
        }
    
        // 3 秒后删除发射物。
        InitialLifeSpan = 3.0f;
        }
    
        // 当游戏开始或重生（Spawn）时被调用
        void AFPSProjectile::BeginPlay()
        {
        Super::BeginPlay();
            
        }
    
        // 每一帧都被调用
        void AFPSProjectile::Tick(float DeltaTime)
        {
        Super::Tick(DeltaTime);
    
        }
    
        // 初始化射击方向上发射物速度的函数。
        void AFPSProjectile::FireInDirection(const FVector& ShootDirection)
        {
        ProjectileMovementComponent->Velocity = ShootDirection * ProjectileMovementComponent->InitialSpeed;
        }
    ```
    
4.  保存并编译FPSProject。
    

## 3.4 - 让发射物与世界交互

现在我们可以检测到发射物的碰撞交互了，不仅如此，我们还能决定如何响应这些碰撞。在此步骤中，我们将向 `FPSProjectile` 中添加 `OnHit` 函数，该函数将响应碰撞事件。

### 使发射物对碰撞做出响应

1.  打开 `FPSProjectile.h`。
    
2.  将以下代码添加到 `FPSProjectile.h` 中：
    
    ```cpp
        // 当发射物击中物体时会调用的函数。
        UFUNCTION()
        void OnHit(UPrimitiveComponent* HitComponent, AActor* OtherActor, UPrimitiveComponent* OtherComponent, FVector NormalImpulse, const FHitResult& Hit);
    ```
    
3.  现在 `FPSProjectile.h` 的内容应如下图所示：
    
    ```cpp
        //版权所有Epic Games, Inc。保留所有权利。
         
        #pragma once
         
        #include "CoreMinimal.h"
        #include "GameFramework/Actor.h"
        #include "Components/SphereComponent.h"
        #include "GameFramework/ProjectileMovementComponent.h"
        #include "FPSProjectile.generated.h"
         
        UCLASS()
        class FPSPROJECT_API AFPSProjectile : public AActor
        {
        GENERATED_BODY()
            
        public:	
        // 为此Actor的属性设置默认值
        AFPSProjectile();
         
        protected:
        // 当游戏开始或重生（Spawn）时被调用
        virtual void BeginPlay() override;
         
        public:	
        // 每一帧都被调用
        virtual void Tick(float DeltaTime) override;
         
        // 当发射物击中物体时会调用的函数。
        UFUNCTION()
        void OnHit(UPrimitiveComponent* HitComponent, AActor* OtherActor, UPrimitiveComponent* OtherComponent, FVector NormalImpulse, const FHitResult& Hit);
         
        // 球体碰撞组件
        UPROPERTY(VisibleDefaultsOnly, Category = Projectile)
        USphereComponent* CollisionComponent;
         
        // 发射物移动组件
        UPROPERTY(VisibleAnywhere, Category = Movement)
        UProjectileMovementComponent* ProjectileMovementComponent;
         
        // 发射物网格体
        UPROPERTY(VisibleDefaultsOnly, Category = Projectile)
        UStaticMeshComponent* ProjectileMeshComponent;
         
        // 发射物材质
        UPROPERTY(VisibleDefaultsOnly, Category = Movement)
        UMaterialInstanceDynamic* ProjectileMaterialInstance;
         
        // 初始化射击方向上发射物速度的函数。
        void FireInDirection(const FVector& ShootDirection);
         
        };
    ```
    
4.  在 **解决方案浏览器（Solution Explorer）** 中找到 `FPSProjectile` 类CPP文件，并打开 `FPSProjectile.cpp`，添加以下代码：
    
    ```cpp
        // 当发射物击中物体时会调用的函数。
        void AFPSProjectile::OnHit(UPrimitiveComponent* HitComponent, AActor* OtherActor, UPrimitiveComponent* OtherComponent, FVector NormalImpulse, const FHitResult& Hit)
        {
            if (OtherActor != this && OtherComponent->IsSimulatingPhysics())
            {
                OtherComponent->AddImpulseAtLocation(ProjectileMovementComponent->Velocity * 100.0f, Hit.ImpactPoint);
            }
    
            Destroy();
        }
    ```
    
5.  在 `FPSProjectile` 构造函数中，将以下代码行添加到 `BodyInstance.SetCollisionProfileName` 下方：
    
    ```cpp
        // 组件击中某物时调用的事件。
        CollisionComponent->OnComponentHit.AddDynamic(this, &AFPSProjectile::OnHit);
    ```
    
6.  现在 `FPSProjectile.cpp` 的内容应如下图所示：
    
    ```cpp
        //版权所有Epic Games, Inc。保留所有权利。
    
        #include "FPSProjectile.h"
    
        // 设置默认值
        AFPSProjectile::AFPSProjectile()
        {
        // 将此actor设置为每帧调用Tick()。  如果不需要此特性，可以关闭以提升性能。
        PrimaryActorTick.bCanEverTick = true;
    
        if (!RootComponent)
        {
            RootComponent = CreateDefaultSubobject<USceneComponent>(TEXT("ProjectileSceneComponent"));
        }
    
        if (!CollisionComponent)
        {
            // 用球体进行简单的碰撞展示。
            CollisionComponent = CreateDefaultSubobject<USphereComponent>(TEXT("SphereComponent"));
            // 将球体的碰撞配置文件名称设置为"Projectile"。
            CollisionComponent->BodyInstance.SetCollisionProfileName(TEXT("Projectile"));
            // 组件击中某物时调用的事件。
            CollisionComponent->OnComponentHit.AddDynamic(this, &AFPSProjectile::OnHit);
            // 设置球体的碰撞半径。
            CollisionComponent->InitSphereRadius(15.0f);
            // 将根组件设置为碰撞组件。
            RootComponent = CollisionComponent;
        }
    
        if (!ProjectileMovementComponent)
        {
            // 使用此组件驱动发射物的移动。
            ProjectileMovementComponent = CreateDefaultSubobject<UProjectileMovementComponent>(TEXT("ProjectileMovementComponent"));
            ProjectileMovementComponent->SetUpdatedComponent(CollisionComponent);
            ProjectileMovementComponent->InitialSpeed = 3000.0f;
            ProjectileMovementComponent->MaxSpeed = 3000.0f;
            ProjectileMovementComponent->bRotationFollowsVelocity = true;
            ProjectileMovementComponent->bShouldBounce = true;
            ProjectileMovementComponent->Bounciness = 0.3f;
            ProjectileMovementComponent->ProjectileGravityScale = 0.0f;
        }
    
        if (!ProjectileMeshComponent)
        {
            ProjectileMeshComponent = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("ProjectileMeshComponent"));
            static ConstructorHelpers::FObjectFinder<UStaticMesh>Mesh(TEXT("'/Game/Sphere.Sphere'"));
            if (Mesh.Succeeded())
            {
                ProjectileMeshComponent->SetStaticMesh(Mesh.Object);
            }
    
            static ConstructorHelpers::FObjectFinder<UMaterial>Material(TEXT("'/Game/SphereMaterial.SphereMaterial'"));
            if (Material.Succeeded())
            {
                ProjectileMaterialInstance = UMaterialInstanceDynamic::Create(Material.Object, ProjectileMeshComponent);
            }
            ProjectileMeshComponent->SetMaterial(0, ProjectileMaterialInstance);
            ProjectileMeshComponent->SetRelativeScale3D(FVector(0.09f, 0.09f, 0.09f));
            ProjectileMeshComponent->SetupAttachment(RootComponent);
        }
    
        // 3 秒后删除发射物。
        InitialLifeSpan = 3.0f;
        }
    
        // 当游戏开始或重生（Spawn）时被调用
        void AFPSProjectile::BeginPlay()
        {
        Super::BeginPlay();
            
        }
    
        // 每一帧都被调用
        void AFPSProjectile::Tick(float DeltaTime)
        {
        Super::Tick(DeltaTime);
    
        }
        // 当发射物击中物体时会调用的函数。
            void AFPSProjectile::OnHit(UPrimitiveComponent* HitComponent, AActor* OtherActor, UPrimitiveComponent* OtherComponent, FVector NormalImpulse, const FHitResult& Hit)
        {
        if (OtherActor != this && OtherComponent->IsSimulatingPhysics())
        {
            OtherComponent->AddImpulseAtLocation(ProjectileMovementComponent->Velocity * 100.0f, Hit.ImpactPoint);
        }
    
              Destroy();
        }
    
        // 初始化射击方向上发射物速度的函数。
        void AFPSProjectile::FireInDirection(const FVector& ShootDirection)
        {
        ProjectileMovementComponent->Velocity = ShootDirection * ProjectileMovementComponent->InitialSpeed;
        }
    ```
    

### 测试发射物碰撞

1.  构建完成后，回到虚幻编辑器并打开FPSProject。
    
2.  选择地面StaticMesh.
    
3.  复制粘贴地面网格体。
    
4.  确保已解锁比例锁定（缩放（Scale）行旁边的锁定图标），将地面网格体副本（Floor2）的缩放值设为{0.2, 0.2, 3.0}。
    
5.  将地面网格体副本放在{320, 0, 170}位置。
    
6.  向下滚动至物理（Physics）段，并选中模拟物理（Simulate Physics）复选框。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05c3e4fa-a448-48f3-8d7e-12fdd6d2191d/25-transform.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05c3e4fa-a448-48f3-8d7e-12fdd6d2191d/25-transform.png)
    
    点击查看大图。
    
7.  保存地图。
    
8.  在关卡编辑器工具栏中点击运行（Play In）。
    
9.  要确认发射物与立方体碰撞，请点击鼠标左键发射发射物，并使立方体在关卡内移动。
    
    \[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1213b3aa-9e70-4922-a8c7-a0f40cc22fa9/fps-implementing-projectile-animation-3.gif)
    
    恭喜，你的发射物已完成！
    
10.  按退出键（Escape）或在关卡编辑器中点击停止（Stop），退出在编辑器中运行（Play in Editor）（PIE）模式。
    

## 3.5 - 将十字准星添加到视口

在此步骤中，我们会把十字准星HUD元素添加到游戏，这样我们就可以实现发射物的瞄准功能。

### 导入十字准星资产

在开始之前，请通过以下链接下载并提取示例图像：

-   [示例十字准星图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/89c629ad-1fb7-476e-ad1c-89dc45153aeb/crosshair_fps_tutorial.zip)

1.  右键点击内容浏览器的文件框，打开 **导入资产（Import Asset）** 对话框
    
2.  点击 **'导入/游戏...（Import to /Game...）'**，打开 **导入（Import）** 对话框。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8480158d-4034-45a7-af5e-2e5812bcf7b5/07-import.png)
3.  找到并选择 **crosshair.TGA** 图像文件。
    
4.  点击 **打开（Open）**，开始将图像文件导入项目。
    
5.  点击 **保存（Save）** 按钮，保存导入的图像。
    

### 添加新的HUD类

1.  在文件（File）菜单中，选择 **新建C++类...（New C++ Class...）**，以选择新的父类。
    
2.  以上操作将打开 **选择父类（Choose Parent Class）** 菜单。向下滚动，选择 **HUD** 作为父类，然后点击 **下一步（Next）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81da8490-6181-4f60-b69d-4448e2e4566f/26-hud-parent.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81da8490-6181-4f60-b69d-4448e2e4566f/26-hud-parent.png)
    
3.  将新类命名为"FPSHUD"，然后点击 **创建类（Create Class）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc441009-fb87-4c4d-a12b-46fa306f709a/27-name-hud.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc441009-fb87-4c4d-a12b-46fa306f709a/27-name-hud.png)
    
4.  在 **解决方案浏览器（Solution Explorer）** 中找到 `FPSHUD` 类头文件，并打开 `FPSHUD.h`，添加以下受保护的变量：
    
    ```cpp
        protected:
            // 将被绘制在屏幕中心。
            UPROPERTY(EditDefaultsOnly)
            UTexture2D* CrosshairTexture;
    ```
    
5.  在 `FPSHUD.h` 中添加以下函数声明：
    
    ```cpp
        public:
            // HUD绘制的主要调用。
            virtual void DrawHUD() override;
    ```
    
6.  将以下头文件添加到FPSHUD.h中：
    
    ```cpp
        #include "Engine/Canvas.h" 
    ```
    
7.  FPSHUD.h文件内容应如下所示：
    
    ```cpp
        //版权所有Epic Games, Inc。保留所有权利。
             
        #pragma once
             
        #include "CoreMinimal.h"
        #include "GameFramework/HUD.h"
        #include "Engine/Canvas.h"
        #include "FPSHUD.generated.h"
             
        /**
         * 
         */
        UCLASS()
        class FPSPROJECT_API AFPSHUD : public AHUD
        {
            GENERATED_BODY()
                
        public:
            // HUD绘制的主要调用。
            virtual void DrawHUD() override;
             
        protected:
            // 将被绘制在屏幕中心。
            UPROPERTY(EditDefaultsOnly)
            UTexture2D* CrosshairTexture;
        };
    ```
    
8.  现在我们在 `FPSHUD.cpp` 中实现 `DrawHUD` 函数：
    
    ```cpp
        void AFPSHUD::DrawHUD()
        {
            Super::DrawHUD();
    
            if (CrosshairTexture)
            {
                // 找出我们的画布的中心点。
                FVector2D Center(Canvas->ClipX * 0.5f, Canvas->ClipY * 0.5f);
    
                // 偏移纹理大小的一半，以便纹理中心与画布中心对齐。
                FVector2D CrossHairDrawPosition(Center.X - (CrosshairTexture->GetSurfaceWidth() * 0.5f), Center.Y - (CrosshairTexture->GetSurfaceHeight() * 0.5f));
    
                // 在中心点绘制十字准星。
                FCanvasTileItem TileItem(CrossHairDrawPosition, CrosshairTexture->Resource, FLinearColor::White);
                TileItem.BlendMode = SE_BLEND_Translucent;
                Canvas->DrawItem(TileItem);
            }
        }
    ```
    
9.  在Visual Studio中保存 `FPSHUD.h` 和 `FPSHUD.cpp`。
    
10.  在 **解决方案浏览器（Solution Explorer）** 中找到 **FPSProject**。
    
11.  右键点击 **FPSProject** 并选择 **构建（Build）**，编译你的项目。
    

### 扩展CPP HUD类到蓝图

现在可以扩展CPP HUD类到蓝图了。如果你需要复习一下相关内容，请前往我们的[C++和蓝图](/documentation/zh-cn/unreal-engine/cpp-and-blueprints-example)参考页面，了解更多有关扩展 C++类到蓝图的信息。

1.  右键点击 `FPSHUD` 类，打开 **C++类操作（C++ Class Actions）** 菜单。
    
2.  点击 **基于FPSHUD创建蓝图类（Create Blueprint class based on FPSHUD）**，打开 **添加蓝图类（Add Blueprint Class）** 对话框菜单。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/531165fb-6a5a-4983-b010-ee9c0b14705b/28-create-based-bp.png)
3.  将新的蓝图类命名为"BP\_FPSHUD"，选择蓝图（Blueprints）文件夹，然后点击 **创建蓝图类（Create Blueprint Class）** 按钮。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43a4118f-5384-402f-aefe-8193f2030e07/29-name-fpshud.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43a4118f-5384-402f-aefe-8193f2030e07/29-name-fpshud.png)
    
4.  现在，在蓝图（Blueprints）文件夹内，你应该有一个新创建的 `BP_FPSHUD` 蓝图类。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a68df1f-74c5-4a99-abeb-8bbca074de79/30-location-fpshud.png)
5.  请确保在关闭蓝图编辑器之前保存你的 `BP_FPSHUD` 蓝图。
    

### 设置默认的HUD类

1.  在 **编辑（Edit）** 菜单中，点击 **项目设置（Project Settings）**。
    
2.  在 **项目设置（Project Settings）** 选项卡左侧的 **项目（Project）** 标题栏下，点击 **地图和模式（Maps & Modes）**。
    
3.  在 **默认HUD（Default HUD）** 下拉菜单中，选择 **BP\_FPSHUD**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1847dec0-6ed0-405f-b771-15b9b4dc5928/31-choose-fpshud.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1847dec0-6ed0-405f-b771-15b9b4dc5928/31-choose-fpshud.png)
    
4.  关闭 **项目设置（Project Settings）** 菜单。
    
5.  返回并打开 `BP_FPSHUD` 蓝图编辑器。
    
6.  现在，点击位于蓝图编辑器的 `FPSHUD` 分段的下拉菜单，选择十字准星纹理。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/192a33f4-5970-44e5-b17a-c2d1cdadb1e7/32-select-crosshair.png)
7.  最后，在关闭蓝图编辑器之前保存 `BP_FPSHUD` 蓝图。
    

### 验证你的HUD

1.  在关卡编辑器工具栏中点击 **运行（Play）** 按钮。现在，你应该可以使用新添加的十字准星进行发射物的瞄准操作。
    
    ![](FPS-implementing-projectile-final-result.gif)(convert:false)
    
2.  在关卡编辑器中点击 **停止（Stop）** 按钮，退出在编辑器中运行（Play in Editor）（PIE）模式。
    

### 已完成分段代码

**FPSProjectile.h**

```cpp
//版权所有Epic Games, Inc。保留所有权利。
 
#pragma once
 
#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "Components/SphereComponent.h"
#include "GameFramework/ProjectileMovementComponent.h"
#include "FPSProjectile.generated.h"
 
UCLASS()
class FPSPROJECT_API AFPSProjectile : public AActor
{
    GENERATED_BODY()
    
public:	
    // 为此Actor的属性设置默认值
    AFPSProjectile();
 
protected:
    // 当游戏开始或重生（Spawn）时被调用
    virtual void BeginPlay() override;
 
public:	
    // 每一帧都被调用
    virtual void Tick(float DeltaTime) override;
 
    // 当发射物击中物体时会调用的函数。
    UFUNCTION()
    void OnHit(UPrimitiveComponent* HitComponent, AActor* OtherActor, UPrimitiveComponent* OtherComponent, FVector NormalImpulse, const FHitResult& Hit);
 
    // 球体碰撞组件
    UPROPERTY(VisibleDefaultsOnly, Category = Projectile)
    USphereComponent* CollisionComponent;
 
    // 发射物移动组件
    UPROPERTY(VisibleAnywhere, Category = Movement)
    UProjectileMovementComponent* ProjectileMovementComponent;
 
    // 发射物网格体
    UPROPERTY(VisibleDefaultsOnly, Category = Projectile)
    UStaticMeshComponent* ProjectileMeshComponent;
 
    // 发射物材质
    UPROPERTY(VisibleDefaultsOnly, Category = Movement)
    UMaterialInstanceDynamic* ProjectileMaterialInstance;
 
    // 初始化射击方向上发射物速度的函数。
    void FireInDirection(const FVector& ShootDirection);
 
};
```

**FPSProjectile.cpp**

```cpp
//版权所有Epic Games, Inc。保留所有权利。         
 
#include "FPSProjectile.h"
 
// 设置默认值
AFPSProjectile::AFPSProjectile()
{
    // 将此actor设置为每帧调用Tick()。  如果不需要此特性，可以关闭以提升性能。
    PrimaryActorTick.bCanEverTick = true;
 
    if (!RootComponent)
    {
        RootComponent = CreateDefaultSubobject<USceneComponent>(TEXT("ProjectileSceneComponent"));
    }
 
    if (!CollisionComponent)
    {
        // 用球体进行简单的碰撞展示。
        CollisionComponent = CreateDefaultSubobject<USphereComponent>(TEXT("SphereComponent"));
        // 将球体的碰撞配置文件名称设置为"Projectile"。
        CollisionComponent->BodyInstance.SetCollisionProfileName(TEXT("Projectile"));
        // 组件击中某物时调用的事件。
        CollisionComponent->OnComponentHit.AddDynamic(this, &AFPSProjectile::OnHit);
        // 设置球体的碰撞半径。
        CollisionComponent->InitSphereRadius(15.0f);
        // 将根组件设置为碰撞组件。
        RootComponent = CollisionComponent;
    }
 
    if (!ProjectileMovementComponent)
    {
        // 使用此组件驱动发射物的移动。
        ProjectileMovementComponent = CreateDefaultSubobject<UProjectileMovementComponent>(TEXT("ProjectileMovementComponent"));
        ProjectileMovementComponent->SetUpdatedComponent(CollisionComponent);
        ProjectileMovementComponent->InitialSpeed = 3000.0f;
        ProjectileMovementComponent->MaxSpeed = 3000.0f;
        ProjectileMovementComponent->bRotationFollowsVelocity = true;
        ProjectileMovementComponent->bShouldBounce = true;
        ProjectileMovementComponent->Bounciness = 0.3f;
        ProjectileMovementComponent->ProjectileGravityScale = 0.0f;
    }
 
    if (!ProjectileMeshComponent)
    {
        ProjectileMeshComponent = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("ProjectileMeshComponent"));
        static ConstructorHelpers::FObjectFinder<UStaticMesh>Mesh(TEXT("'/Game/Sphere.Sphere'"));
        if (Mesh.Succeeded())
        {
            ProjectileMeshComponent->SetStaticMesh(Mesh.Object);
        }
 
        static ConstructorHelpers::FObjectFinder<UMaterial>Material(TEXT("'/Game/SphereMaterial.SphereMaterial'"));
        if (Material.Succeeded())
        {
            ProjectileMaterialInstance = UMaterialInstanceDynamic::Create(Material.Object, ProjectileMeshComponent);
        }
        ProjectileMeshComponent->SetMaterial(0, ProjectileMaterialInstance);
        ProjectileMeshComponent->SetRelativeScale3D(FVector(0.09f, 0.09f, 0.09f));
        ProjectileMeshComponent->SetupAttachment(RootComponent);
    }
 
    // 3 秒后删除发射物。
    InitialLifeSpan = 3.0f;
}
 
// 当游戏开始或重生（Spawn）时被调用
void AFPSProjectile::BeginPlay()
{
    Super::BeginPlay();
    
}
 
// 每一帧都被调用
void AFPSProjectile::Tick(float DeltaTime)
{
    Super::Tick(DeltaTime);
 
}
 
void AFPSProjectile::OnHit(UPrimitiveComponent* HitComponent, AActor* OtherActor, UPrimitiveComponent* OtherComponent, FVector NormalImpulse, const FHitResult& Hit)
{
    if (OtherActor != nullptr && OtherActor != this && OtherComponent != nullptr && OtherComponent->IsSimulatingPhysics())
    {
        OtherComponent->AddImpulseAtLocation(ProjectileMovementComponent->Velocity * 100.0f, Hit.ImpactPoint);
    }

    Destroy();
}
 
// 初始化射击方向上发射物速度的函数。
void AFPSProjectile::FireInDirection(const FVector& ShootDirection)
{
    ProjectileMovementComponent->Velocity = ShootDirection * ProjectileMovementComponent->InitialSpeed;
}
```

**FPSCharacter.h**

```cpp
//版权所有Epic Games, Inc。保留所有权利。
 
#pragma once
 
#include "CoreMinimal.h"
#include "GameFramework/Character.h"
#include "Camera/CameraComponent.h"
#include "Components/CapsuleComponent.h"
#include "FPSProjectile.h"
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
 
    // 要生成的发射物类。
    UPROPERTY(EditAnywhere, Category = Projectile)
    TSubclassOf<class AFPSProjectile> ProjectileClass;
 
public:	
    // 每一帧都被调用
    virtual void Tick(float DeltaTime) override;
 
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
 
    // 发射发射物的函数。
    UFUNCTION()
    void Fire();
 
    // FPS摄像机
    UPROPERTY(VisibleAnywhere)
    UCameraComponent* FPSCameraComponent;
 
    // 第一人称网格体（手臂），仅对所属玩家可见。
    UPROPERTY(VisibleDefaultsOnly, Category = Mesh)
    USkeletalMeshComponent* FPSMesh;
 
    // 枪口相对于摄像机位置的偏移。
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = Gameplay)
    FVector MuzzleOffset;
};
```

**FPSCharacter.cpp**

```cpp
//版权所有Epic Games, Inc。保留所有权利。         
 
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
    
    // 为所属玩家创建第一人称网格体组件。
    FPSMesh = CreateDefaultSubobject<USkeletalMeshComponent>(TEXT("FirstPersonMesh"));
    check(FPSMesh != nullptr);
    
    // 仅所属玩家可以看见此网格体。
    FPSMesh->SetOnlyOwnerSee(true);
 
    //将 FPS 网格体连接到 FPS 摄像机。
    FPSMesh->SetupAttachment(FPSCameraComponent);
    
    // 禁用某些环境阴影，实现只有单个网格的感觉。
    FPSMesh->bCastDynamicShadow = false;
    FPSMesh->CastShadow = false;
    
    // 所属玩家看不到常规（第三人称）全身网格体。
    GetMesh()->SetOwnerNoSee(true);
}
 
// 当游戏开始或重生（Spawn）时被调用
void AFPSCharacter::BeginPlay()
{
    Super::BeginPlay();
    
    if (GEngine)
    {
        // 显示调试消息五秒。
        // -1"键"值参数可以防止更新或刷新消息。
        GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Red, TEXT("We are using FPSCharacter."));
    }
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
 
    // 设置"移动"绑定。
    PlayerInputComponent->BindAxis("MoveForward", this, &AFPSCharacter::MoveForward);
    PlayerInputComponent->BindAxis("MoveRight", this, &AFPSCharacter::MoveRight);
 
    // 设置"观看"绑定。
    PlayerInputComponent->BindAxis("Turn", this, &AFPSCharacter::AddControllerYawInput);
    PlayerInputComponent->BindAxis("LookUp", this, &AFPSCharacter::AddControllerPitchInput);
 
    // 设置"操作"绑定。
    PlayerInputComponent->BindAction("Jump", IE_Pressed, this, &AFPSCharacter::StartJump);
    PlayerInputComponent->BindAction("Jump", IE_Released, this, &AFPSCharacter::StopJump);
    PlayerInputComponent->BindAction("Fire", IE_Pressed, this, &AFPSCharacter::Fire);
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
 
void AFPSCharacter::Fire()
{
    // 试图发射发射物。
    if (ProjectileClass)
    {
        // 获取摄像机变换。
        FVector CameraLocation;
        FRotator CameraRotation;
        GetActorEyesViewPoint(CameraLocation, CameraRotation);
        
        // 设置MuzzleOffset，在略靠近摄像机前生成发射物。
        MuzzleOffset.Set(100.0f, 0.0f, 0.0f);
 
        // 将MuzzleOffset从摄像机空间变换到世界空间。
        FVector MuzzleLocation = CameraLocation + FTransform(CameraRotation).TransformVector(MuzzleOffset);
 
        // 使目标方向略向上倾斜。 
        FRotator MuzzleRotation = CameraRotation;
        MuzzleRotation.Pitch += 10.0f;
 
        UWorld* World = GetWorld();
        if (World)
        {
            FActorSpawnParameters SpawnParams;
            SpawnParams.Owner = this;
            SpawnParams.Instigator = GetInstigator();
 
            // 在枪口位置生成发射物。
            AFPSProjectile* Projectile = World->SpawnActor<AFPSProjectile>(ProjectileClass, MuzzleLocation, MuzzleRotation, SpawnParams);
            if (Projectile)
            {
                // 设置发射物的初始轨迹。
                FVector LaunchDirection = MuzzleRotation.Vector();
                Projectile->FireInDirection(LaunchDirection);
            }
            
        }
    }
}
```

**FPSHUD.h**

```cpp
//版权所有Epic Games, Inc。保留所有权利。
 
#pragma once
 
#include "CoreMinimal.h"
#include "GameFramework/HUD.h"
#include "Engine/Canvas.h"
#include "FPSHUD.generated.h"
 
/**
 * 
 */
UCLASS()
class FPSPROJECT_API AFPSHUD : public AHUD
{
    GENERATED_BODY()
    
public:
    // HUD绘制的主要调用。
    virtual void DrawHUD() override;
 
protected:
    // 将被绘制在屏幕中心。
    UPROPERTY(EditDefaultsOnly)
    UTexture2D* CrosshairTexture;
};
```

**FPSHUD.cpp**

```cpp
//版权所有Epic Games, Inc。保留所有权利。         
 
#include "FPSHUD.h"
 
void AFPSHUD::DrawHUD()
{
    Super::DrawHUD();
 
    if (CrosshairTexture)
    {
        // 找出我们的画布的中心点。
        FVector2D Center(Canvas->ClipX * 0.5f, Canvas->ClipY * 0.5f);
 
        // 偏移纹理大小的一半，以便纹理中心与画布中心对齐。
        FVector2D CrossHairDrawPosition(Center.X - (CrosshairTexture->GetSurfaceWidth() * 0.5f), Center.Y - (CrosshairTexture->GetSurfaceHeight() * 0.5f));
 
        // 在中心点绘制十字准星。
        FCanvasTileItem TileItem(CrossHairDrawPosition, CrosshairTexture->Resource, FLinearColor::White);
        TileItem.BlendMode = SE_BLEND_Translucent;
        Canvas->DrawItem(TileItem);
    }
}
```

祝贺你！你已经学会了如何：

✓ 将发射物添加到游戏  
✓ 实现射击  
✓ 设置发射物的碰撞和生命周期  
✓ 让发射物与世界交互  
✓ 将十字准星添加到视口

现在，你可以准备在下一分段中学习如何为角色添加动画。

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [目标](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [目的](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [步骤](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [3.1 - 将发射物添加到游戏](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#31-%E5%B0%86%E5%8F%91%E5%B0%84%E7%89%A9%E6%B7%BB%E5%8A%A0%E5%88%B0%E6%B8%B8%E6%88%8F)
-   [添加射击操作映射](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%B0%84%E5%87%BB%E6%93%8D%E4%BD%9C%E6%98%A0%E5%B0%84)
-   [添加发射物类](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%8F%91%E5%B0%84%E7%89%A9%E7%B1%BB)
-   [添加USphere组件](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E6%B7%BB%E5%8A%A0usphere%E7%BB%84%E4%BB%B6)
-   [添加发射物移动组件](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%8F%91%E5%B0%84%E7%89%A9%E7%A7%BB%E5%8A%A8%E7%BB%84%E4%BB%B6)
-   [设置发射物的初始速度](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%8F%91%E5%B0%84%E7%89%A9%E7%9A%84%E5%88%9D%E5%A7%8B%E9%80%9F%E5%BA%A6)
-   [绑定发射输入操作](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E7%BB%91%E5%AE%9A%E5%8F%91%E5%B0%84%E8%BE%93%E5%85%A5%E6%93%8D%E4%BD%9C)
-   [定义发射物的生成位置](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E5%AE%9A%E4%B9%89%E5%8F%91%E5%B0%84%E7%89%A9%E7%9A%84%E7%94%9F%E6%88%90%E4%BD%8D%E7%BD%AE)
-   [编译并检查代码](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E7%BC%96%E8%AF%91%E5%B9%B6%E6%A3%80%E6%9F%A5%E4%BB%A3%E7%A0%81)
-   [3.2 - 实现射击](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#32-%E5%AE%9E%E7%8E%B0%E5%B0%84%E5%87%BB)
-   [实现发射函数](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E5%AE%9E%E7%8E%B0%E5%8F%91%E5%B0%84%E5%87%BD%E6%95%B0)
-   [导入发射物网格体](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%8F%91%E5%B0%84%E7%89%A9%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [添加发射物网格体](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%8F%91%E5%B0%84%E7%89%A9%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [添加发射物的材质](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%8F%91%E5%B0%84%E7%89%A9%E7%9A%84%E6%9D%90%E8%B4%A8)
-   [3.3 - 设置发射物的碰撞和生命周期](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#33-%E8%AE%BE%E7%BD%AE%E5%8F%91%E5%B0%84%E7%89%A9%E7%9A%84%E7%A2%B0%E6%92%9E%E5%92%8C%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
-   [限制发射物的生命周期](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E9%99%90%E5%88%B6%E5%8F%91%E5%B0%84%E7%89%A9%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
-   [编辑发射物的碰撞设置](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%8F%91%E5%B0%84%E7%89%A9%E7%9A%84%E7%A2%B0%E6%92%9E%E8%AE%BE%E7%BD%AE)
-   [使用新碰撞通道的设置](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%96%B0%E7%A2%B0%E6%92%9E%E9%80%9A%E9%81%93%E7%9A%84%E8%AE%BE%E7%BD%AE)
-   [3.4 - 让发射物与世界交互](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#34-%E8%AE%A9%E5%8F%91%E5%B0%84%E7%89%A9%E4%B8%8E%E4%B8%96%E7%95%8C%E4%BA%A4%E4%BA%92)
-   [使发射物对碰撞做出响应](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E4%BD%BF%E5%8F%91%E5%B0%84%E7%89%A9%E5%AF%B9%E7%A2%B0%E6%92%9E%E5%81%9A%E5%87%BA%E5%93%8D%E5%BA%94)
-   [测试发射物碰撞](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E6%B5%8B%E8%AF%95%E5%8F%91%E5%B0%84%E7%89%A9%E7%A2%B0%E6%92%9E)
-   [3.5 - 将十字准星添加到视口](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#35-%E5%B0%86%E5%8D%81%E5%AD%97%E5%87%86%E6%98%9F%E6%B7%BB%E5%8A%A0%E5%88%B0%E8%A7%86%E5%8F%A3)
-   [导入十字准星资产](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%8D%81%E5%AD%97%E5%87%86%E6%98%9F%E8%B5%84%E4%BA%A7)
-   [添加新的HUD类](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%9A%84hud%E7%B1%BB)
-   [扩展CPP HUD类到蓝图](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E6%89%A9%E5%B1%95cpphud%E7%B1%BB%E5%88%B0%E8%93%9D%E5%9B%BE)
-   [设置默认的HUD类](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E9%BB%98%E8%AE%A4%E7%9A%84hud%E7%B1%BB)
-   [验证你的HUD](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E9%AA%8C%E8%AF%81%E4%BD%A0%E7%9A%84hud)
-   [已完成分段代码](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine#%E5%B7%B2%E5%AE%8C%E6%88%90%E5%88%86%E6%AE%B5%E4%BB%A3%E7%A0%81)

相关文档

[

第一人称射击游戏教程

![第一人称射击游戏教程](https://dev.epicgames.com/community/api/documentation/image/84299dcc-b92a-4600-91bc-946ae4bd4b79?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/first-person-shooter-tutorial-in-unreal-engine)
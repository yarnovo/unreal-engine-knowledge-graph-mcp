# 虚幻引擎组件和碰撞入门 - C++ | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/quick-start-guide-to-components-and-collision-in-unreal-engine-cpp
> 
> 生成时间: 2025-06-14T19:33:33.932Z

---

目录

![组件和碰撞](https://dev.epicgames.com/community/api/documentation/image/38004692-0e0f-423a-bc7f-ee081b4f7838?resizing_type=fill&width=1920&height=335)

本教程将讲解创建 **组件（Components）**、将其放进层级、在Gameplay中控制它们，以及在包含固体对象的场景中移动 **Pawn** 的方法。

## 1.创建和附加组件

如果你刚接触 **虚幻引擎**（UE），建议先阅读[编程入门](/documentation/zh-cn/unreal-engine/unreal-engine-cpp-quick-start)。本教程中将假设已熟悉创建项目和向其添加C++代码，及在虚幻编辑器中配置输入。

如果你对创建Pawn或输入设置不太熟悉，建议先学习[玩家输入教程](/documentation/zh-cn/unreal-engine/quick-start-guide-to-player-input-in-unreal-engine-cpp)。

1.  首先使用初学者内容包新建一个C++项目，将其命名为 `HowTo_Components`。需向此项目添加的首个项目是自定义Pawn，其将包含组件，在关卡中移动并与固体对象碰撞。本教程中将之命名为 `CollidingPawn`。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06afe858-ea87-416a-989c-ba0d19b71b19/chooseparentclass.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac0cd173-a44d-4fce-a718-1f2a742098fc/namepawnclass.png)
2.  在你的代码编辑器中（通常为 **Visual Studio** 或 **Xcode**），打开 `CollidingPawn.h`，然后在类的声明部分的底部添加以下代码：
    
    ```cpp
             UPROPERTY()
             class UParticleSystemComponent* OurParticleSystem;
    		
    ```
    
    使用此变量追踪之后将创建的 **粒子系统组件**。可直接创建组件而无需设置追踪组件的变量，但要在代码中使用此类组件，应将其储存在类似的类成员变量中。
    
3.  现在可打开CollidingPawn.cpp并编辑构造函数 **ACollidingPawn::ACollidingPawn**，添加将生成各种有用组件并将以层级进行安排的代码。将创建与物理场景交互的 **球体组件**、视觉显示碰撞形态的 **静态网格体组件**、可随意开关的粒子系统组件，及可用于附加 **摄像机组件** 控制游戏视角的 **弹簧臂组件**。在此之前，我们应该添加最终会用到的头文件。在头文件信息所在行的下方，我们要加入：
    
    ```cpp
             #include "UObject/ConstructorHelpers.h"
             #include "Particles/ParticleSystemComponent.h"
             #include "Components/SphereComponent.h"
             #include "Camera/CameraComponent.h"
             #include "GameFramework/SpringArmComponent.h"
    		
    ```
    
4.  决定用作层级根节点的组件。球体组件是一种可与游戏场景交互并碰撞的物理实体，本教程将使用球体组件。注意：**Actor** 的层级中可拥有多个启用物理的组件，但本教程中只需要一个。
    
    ```cpp
             // 根组件将成为对物理反应的球体
             USphereComponent* SphereComponent = CreateDefaultSubobject<USphereComponent>(TEXT("RootComponent"));
             RootComponent = SphereComponent;
             SphereComponent->InitSphereRadius(40.0f);
             SphereComponent->SetCollisionProfileName(TEXT("Pawn"));
    		
    ```
    
5.  接下来，将从 **静态网格体** 资源创建并附加半径为50的可见球体。其与刚才创建的半径40的球体组件无法完全吻合，因此需将把其缩小80%。还需将其向下移动40单位，使其中心与球体组件的中心对齐。
    
    ```cpp
             // 创建并放置网格体组件，以便查看球体位置
             UStaticMeshComponent* SphereVisual = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("VisualRepresentation"));
             SphereVisual->SetupAttachment(RootComponent);
             static ConstructorHelpers::FObjectFinder<UStaticMesh> SphereVisualAsset(TEXT("/Game/StarterContent/Shapes/Shape_Sphere.Shape_Sphere"));
             if (SphereVisualAsset.Succeeded())
             {
                 SphereVisual->SetStaticMesh(SphereVisualAsset.Object);
                 SphereVisual->SetRelativeLocation(FVector(0.0f, 0.0f, -40.0f));
                 SphereVisual->SetWorldScale3D(FVector(0.8f));
             }
    		
    ```
    
    基于硬编码的资产路径一般不太推荐，例如这个示例中的球体静态网格体的路径；我们通常会在构造函数中创建组件，让它可编辑，然后在虚幻编辑器中创建一个蓝图资产并且在那里设置静态网格体资产。但你也可以直接在代码中这样操作，对于程序员而言，这样还能让调试或者开发新功能变得更快。
    
6.  现可将非活跃粒子系统组件附加到层级。可在代码中操纵此组件，然后设置输入进行开关。注意：粒子系统组件直接附加到静态网格体组件，而非附加到根。其同时略微偏离网格体底部中心，以便在运行时清晰显示。
    
    ```cpp
             // 创建可激活或停止的粒子系统
             OurParticleSystem = CreateDefaultSubobject<UParticleSystemComponent>(TEXT("MovementParticles"));
             OurParticleSystem->SetupAttachment(SphereVisual);
             OurParticleSystem->bAutoActivate = false;
             OurParticleSystem->SetRelativeLocation(FVector(-20.0f, 0.0f, 20.0f));
             static ConstructorHelpers::FObjectFinder<UParticleSystem> ParticleAsset(TEXT("/Game/StarterContent/Particles/P_Fire.P_Fire"));
             if (ParticleAsset.Succeeded())
             {
                 OurParticleSystem->SetTemplate(ParticleAsset.Object);
             }
    		
    ```
    
7.  利用弹簧臂组件，可将摄像机以低于其追踪Pawn的速度加速和减速，从而获得更平滑的摄像机附加点。其同时拥有内置功能，可防止摄像机穿过固体对象，用于处理如玩家在第三人称游戏里退到角落时等情况。虽然弹簧臂组件并非必要的组件，但它能够轻松让摄像机在游戏中移动时变得更加平滑。
    
    ```cpp
             // 使用弹簧臂给予摄像机平滑自然的运动感。
             USpringArmComponent* SpringArm = CreateDefaultSubobject<USpringArmComponent>(TEXT("CameraAttachmentArm"));
             SpringArm->SetupAttachment(RootComponent);
             SpringArm->SetRelativeRotation(FRotator(-45.f, 0.f, 0.f));
             SpringArm->TargetArmLength = 400.0f;
             SpringArm->bEnableCameraLag = true;
             SpringArm->CameraLagSpeed = 3.0f;
    		
    ```
    
8.  摄像机组件的创建十分容易，在这个示例中，你无需进行任何特殊设置。弹簧臂内置一个特殊的插槽，可供我们添加对象，这样就不必将对象直接添加到组件的根节点上。
    
    ```cpp
             // 创建摄像机并附加到弹簧臂
             UCameraComponent* Camera = CreateDefaultSubobject<UCameraComponent>(TEXT("ActualCamera"));
             Camera->SetupAttachment(SpringArm, USpringArmComponent::SocketName);
    		
    ```
    
9.  组件已创建并附加，现在应将此Pawn设为受默认玩家控制。只需下列代码即可：
    
    ```cpp
             // 控制默认玩家
             AutoPossessPlayer = EAutoReceiveInput::Player0;
    ```
    

新Pawn已附加一系列有用组件，可开始用户控制配置。现在回到虚幻编辑器。

### 半成品代码

**CollidingPawn.h**

```cpp
	// Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.

	#pragma once

	#include "CoreMinimal.h"
	#include "GameFramework/Pawn.h"
	#include "CollidingPawn.generated.h"

	UCLASS()
	class HOWTO_COMPONENTS_API ACollidingPawn : public APawn
	{
		GENERATED_BODY()

	public:
		// 设置此Pawn属性的默认值
		ACollidingPawn();

	protected:
		// 游戏开始或生成时调用
		virtual void BeginPlay() override;

	public:
		// 逐帧调用
		virtual void Tick( float DeltaSeconds ) override;

		// 调用以将功能与输入绑定
		virtual void SetupPlayerInputComponent(class UInputComponent* InInputComponent) override;

		UPROPERTY()
		class UParticleSystemComponent* OurParticleSystem;
	};

```

**CollidingPawn.cpp**

```cpp
	// Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.

	#include "CollidingPawn.h"
	#include "UObject/ConstructorHelpers.h"
	#include "Particles/ParticleSystemComponent.h"
	#include "Components/SphereComponent.h"
	#include "Camera/CameraComponent.h"
	#include "GameFramework/SpringArmComponent.h"

	// 设置默认值
	ACollidingPawn::ACollidingPawn()
	{
		// 设置该Pawn以逐帧调用Tick()。如无需此功能，可关闭以提高性能。
		PrimaryActorTick.bCanEverTick = true;

		// 根组件将成为对物理反应的球体
		USphereComponent* SphereComponent = CreateDefaultSubobject<USphereComponent>(TEXT("RootComponent"));
		RootComponent = SphereComponent;
		SphereComponent->InitSphereRadius(40.0f);
		SphereComponent->SetCollisionProfileName(TEXT("Pawn"));

		// 创建并放置网格体组件，以便查看球体位置
		UStaticMeshComponent* SphereVisual = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("VisualRepresentation"));
		SphereVisual->SetupAttachment(RootComponent);
		static ConstructorHelpers::FObjectFinder<UStaticMesh> SphereVisualAsset(TEXT("/Game/StarterContent/Shapes/Shape_Sphere.Shape_Sphere"));
		if (SphereVisualAsset.Succeeded())
		{
			SphereVisual->SetStaticMesh(SphereVisualAsset.Object);
			SphereVisual->SetRelativeLocation(FVector(0.0f, 0.0f, -40.0f));
			SphereVisual->SetWorldScale3D(FVector(0.8f));
		}

		// 创建可激活或停止的粒子系统
		OurParticleSystem = CreateDefaultSubobject<UParticleSystemComponent>(TEXT("MovementParticles"));
		OurParticleSystem->SetupAttachment(SphereVisual);
		OurParticleSystem->bAutoActivate = false;
		OurParticleSystem->SetRelativeLocation(FVector(-20.0f, 0.0f, 20.0f));
		static ConstructorHelpers::FObjectFinder<UParticleSystem> ParticleAsset(TEXT("/Game/StarterContent/Particles/P_Fire.P_Fire"));
		if (ParticleAsset.Succeeded())
		{
			OurParticleSystem->SetTemplate(ParticleAsset.Object);
		}

		// 使用弹簧臂给予摄像机平滑自然的运动感。
		USpringArmComponent* SpringArm = CreateDefaultSubobject<USpringArmComponent>(TEXT("CameraAttachmentArm"));
		SpringArm->SetupAttachment(RootComponent);
		SpringArm->SetRelativeRotation(FRotator(-45.f, 0.f, 0.f));
		SpringArm->TargetArmLength = 400.0f;
		SpringArm->bEnableCameraLag = true;
		SpringArm->CameraLagSpeed = 3.0f;

		// 创建摄像机并附加到弹簧臂
		UCameraComponent* Camera = CreateDefaultSubobject<UCameraComponent>(TEXT("ActualCamera"));
		Camera->SetupAttachment(SpringArm, USpringArmComponent::SocketName);

		// 控制默认玩家
		AutoPossessPlayer = EAutoReceiveInput::Player0;
	}

	// 游戏开始或生成时调用
	void ACollidingPawn::BeginPlay()
	{
		Super::BeginPlay();

	}

	// 逐帧调用
	void ACollidingPawn::Tick( float DeltaTime )
	{
		Super::Tick( DeltaTime );

	}

	// 调用以将功能与输入绑定
	void ACollidingPawn::SetupPlayerInputComponent(class UInputComponent* InputComponent)
	{
		Super::SetupPlayerInputComponent(InInputComponent);
	}

```

## 2.配置输入和创建Pawn移动组件

1.  回到 **虚幻编辑器**，开始配置项目输入设置。可在 **编辑** 下拉菜单中的 **项目设置** 下找到相关设置。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4dd6b324-e6fa-4007-99d2-cddd1b30f533/editprojectsettings.png)
    
    进入该菜单后，可在左侧面板中的 **引擎** 部分中选择 **输入**。同时需要设置粒子系统切换的 **操作映射** 、移动 **Pawn** 的两个 **轴映射**，和转动 **Pawn** 的一个 **轴映射**。
    
    操作映射
    
     
    
     
    
    ParticleToggle
    
    空格
    
     
    
    轴映射
    
     
    
     
    
    MoveForward
    
    W
    
    1.0
    
     
    
    S
    
    \-1.0
    
    MoveRight
    
    A
    
    \-1.0
    
     
    
    D
    
    1.0
    
    Turn
    
    Mouse X
    
    1.0
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9045e4dd-4451-4279-88ef-eb53caf45027/inputsettings.png)
2.  将创建 **移动组件** 管理移动，而非直接在Pawn类中处理所有移动。本教程中将扩展 **Pawn移动组件** 类。首先在 **文件** 下拉菜单中选择 **将代码添加到项目（Add Code to Project）** 命令。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f94f91db-94f3-4f1f-9640-2310ea08b8df/addcppcode.png)
    
    与Pawn类不同的，Pawn移动组件类默认为不可见。要找到该组件，需选中 **显示所有类（Show All Classes）** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f80e1900-0b6d-489c-bb53-6d3f406e21a7/showallclasses.png)
    
    在搜索栏中输入"movement"，以便快速缩小列表范围。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/932c2a27-5ae7-4cbb-95a9-78fcc1b9021e/chooseparentclass2.png)
    
    Pawn移动组件拥有部分强大内置功能，以便使用常见物理功能，同时便于在大量Pawn类型间共享移动代码。使用组件分隔不同功能是上佳方法，可在项目增大、Pawn越加复杂时减少杂乱。
    
    由于已将Pawn类命名为 `CollidingPawn`，则将该类命名为 `CollidingPawnMovementComponent`。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4dd0736-917c-4660-8df2-e7d40f359880/namecomponent.png)

刚才已对输入配置进行了定义，并创建了自定义Pawn移动组件。现在让我们回到代码编辑器，继续编写代码，定义Pawn移动组件使用时Pawn的移动方式。

## 3.为Pawn移动组件的行为编写代码

1.  现在回到代码编辑器中，为自定义Pawn移动组件编写代码。只需编写 `TickComponent` 函数（类似Actor的 `Tick` 函数）告知逐帧移动方式。在 `CollidingPawnMovementComponent.h` 中，需在类定义中覆盖 `TickComponent`：
    
    ```cpp
             public:
                 virtual void TickComponent(float DeltaTime, enum ELevelTick TickType, FActorComponentTickFunction *ThisTickFunction) override;
    		
    ```
    
    在 `CollidingPawnMovementComponent.cpp` 中定义此函数：
    
    ```cpp
         void UCollidingPawnMovementComponent::TickComponent(float DeltaTime, enum ELevelTick TickType, FActorComponentTickFunction *ThisTickFunction)
         {
             Super::TickComponent(DeltaTime, TickType, ThisTickFunction);
    
             // 确保所有事物持续有效，以便进行移动。
             if (!PawnOwner || !UpdatedComponent || ShouldSkipUpdate(DeltaTime))
             {
                 return;
             }
    
             // 获取（然后清除）ACollidingPawn::Tick中设置的移动向量
             FVector DesiredMovementThisFrame = ConsumeInputVector().GetClampedToMaxSize(1.0f) * DeltaTime * 150.0f;
             if (!DesiredMovementThisFrame.IsNearlyZero())
             {
                 FHitResult Hit;
                 SafeMoveUpdatedComponent(DesiredMovementThisFrame, UpdatedComponent->GetComponentRotation(), true, Hit);
    
                 // 若发生碰撞，尝试滑过去
                 if (Hit.IsValidBlockingHit())
                 {
                     SlideAlongSurface(DesiredMovementThisFrame, 1.f - Hit.Time, Hit.Normal, Hit);
                 }
             }
         };
    
    ```
    
    该代码将在场景中平滑移动Pawn，适当时在表面滑动。未对Pawn应用重力，其最大速度被硬编码为每秒150 **虚幻单位**。
    
    此 `TickComponent` 函数使用 `UPawnMovementComponent` 类提供的几种强大功能。
    
    -   `ConsumeInputVector` 报告并清空用于存储移动输入的内置变量值。
        
    -   `SafeMoveUpdatedComponent` 利用虚幻引擎物理移动Pawn移动组件，同时考虑固体障碍。
        
    -   移动导致碰撞时， `SlideAlongSurface` 会处理沿墙壁和斜坡等碰撞表面平滑滑动所涉及的计算和物理，而非直接停留原地，粘在墙壁或斜坡上。
        
    
    Pawn移动组件中还包含众多值得探究的功能，但本教程范围中暂时无需使用。可查看如 **浮动Pawn移动**、**旁观者Pawn移动** 或 **角色移动组件**等其他类，了解额外使用范例和方法。
    

定义Pawn移动组件的行为后，可编写代码将其全部关联。

### 半成品代码

**CollidingPawn.h**

```cpp
	// Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.

	#pragma once

	#include "CoreMinimal.h"
	#include "GameFramework/Pawn.h"
	#include "CollidingPawn.generated.h"

	UCLASS()
	class HOWTO_COMPONENTS_API ACollidingPawn : public APawn
	{
		GENERATED_BODY()

	public:
		// 设置此Pawn属性的默认值
		ACollidingPawn();

	protected:
		// 游戏开始或生成时调用
		virtual void BeginPlay() override;

	public:
		// 逐帧调用
		virtual void Tick( float DeltaSeconds ) override;

		// 调用以将功能与输入绑定
		virtual void SetupPlayerInputComponent(class UInputComponent* InInputComponent) override;

		UPROPERTY()
		class UParticleSystemComponent* OurParticleSystem;
	};

```

**CollidingPawn.cpp**

```cpp
	// Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.

	#include "CollidingPawn.h"
	#include "UObject/ConstructorHelpers.h"
	#include "Particles/ParticleSystemComponent.h"
	#include "Components/SphereComponent.h"
	#include "Camera/CameraComponent.h"
	#include "GameFramework/SpringArmComponent.h"

	// 设置默认值
	ACollidingPawn::ACollidingPawn()
	{
		// 设置该Pawn以逐帧调用Tick()。如无需此功能，可关闭以提高性能。
		PrimaryActorTick.bCanEverTick = true;

		// 根组件将成为对物理反应的球体
		USphereComponent* SphereComponent = CreateDefaultSubobject<USphereComponent>(TEXT("RootComponent"));
		RootComponent = SphereComponent;
		SphereComponent->InitSphereRadius(40.0f);
		SphereComponent->SetCollisionProfileName(TEXT("Pawn"));

		// 创建并放置网格体组件，以便查看球体位置
		UStaticMeshComponent* SphereVisual = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("VisualRepresentation"));
		SphereVisual->SetupAttachment(RootComponent);
		static ConstructorHelpers::FObjectFinder<UStaticMesh> SphereVisualAsset(TEXT("/Game/StarterContent/Shapes/Shape_Sphere.Shape_Sphere"));
		if (SphereVisualAsset.Succeeded())
		{
			SphereVisual->SetStaticMesh(SphereVisualAsset.Object);
			SphereVisual->SetRelativeLocation(FVector(0.0f, 0.0f, -40.0f));
			SphereVisual->SetWorldScale3D(FVector(0.8f));
		}

		// 创建可激活或停止的粒子系统
		OurParticleSystem = CreateDefaultSubobject<UParticleSystemComponent>(TEXT("MovementParticles"));
		OurParticleSystem->SetupAttachment(SphereVisual);
		OurParticleSystem->bAutoActivate = false;
		OurParticleSystem->SetRelativeLocation(FVector(-20.0f, 0.0f, 20.0f));
		static ConstructorHelpers::FObjectFinder<UParticleSystem> ParticleAsset(TEXT("/Game/StarterContent/Particles/P_Fire.P_Fire"));
		if (ParticleAsset.Succeeded())
		{
			OurParticleSystem->SetTemplate(ParticleAsset.Object);
		}

		// 使用弹簧臂给予摄像机平滑自然的运动感。
		USpringArmComponent* SpringArm = CreateDefaultSubobject<USpringArmComponent>(TEXT("CameraAttachmentArm"));
		SpringArm->SetupAttachment(RootComponent);
		SpringArm->SetRelativeRotation(FRotator(-45.f, 0.f, 0.f));
		SpringArm->TargetArmLength = 400.0f;
		SpringArm->bEnableCameraLag = true;
		SpringArm->CameraLagSpeed = 3.0f;

		// 创建摄像机并附加到弹簧臂
		UCameraComponent* Camera = CreateDefaultSubobject<UCameraComponent>(TEXT("ActualCamera"));
		Camera->SetupAttachment(SpringArm, USpringArmComponent::SocketName);

		// 控制默认玩家
		AutoPossessPlayer = EAutoReceiveInput::Player0;
	}

	// 游戏开始或生成时调用
	void ACollidingPawn::BeginPlay()
	{
		Super::BeginPlay();

	}

	// 逐帧调用
	void ACollidingPawn::Tick( float DeltaTime )
	{
		Super::Tick( DeltaTime );

	}

	// 调用以将功能与输入绑定
	void ACollidingPawn::SetupPlayerInputComponent(class UInputComponent* InInputComponent)
	{
		Super::SetupPlayerInputComponent(InInputComponent);
	}

```

**CollidingPawnMovementComponent.h**

```cpp
	// Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.

	#pragma once

	#include "CoreMinimal.h"
	#include "GameFramework/PawnMovementComponent.h"
	#include "CollidingPawnMovementComponent.generated.h"

	/**
		*
		*/
	UCLASS()
	class HOWTO_COMPONENTS_API UCollidingPawnMovementComponent : public UPawnMovementComponent
	{
		GENERATED_BODY()

	public:
		virtual void TickComponent(float DeltaTime, enum ELevelTick TickType, FActorComponentTickFunction *ThisTickFunction) override;
	};

```

**CollidingPawnMovementComponent.cpp**

```cpp
	// Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.

	#include "CollidingPawnMovementComponent.h"

	void UCollidingPawnMovementComponent::TickComponent(float DeltaTime, enum ELevelTick TickType, FActorComponentTickFunction *ThisTickFunction)
	{
		Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

		// 确保所有事物持续有效，以便进行移动。
		if (!PawnOwner || !UpdatedComponent || ShouldSkipUpdate(DeltaTime))
		{
			return;
		}

		// 获取（然后清除）ACollidingPawn::Tick中设置的移动向量
		FVector DesiredMovementThisFrame = ConsumeInputVector().GetClampedToMaxSize(1.0f) * DeltaTime * 150.0f;
		if (!DesiredMovementThisFrame.IsNearlyZero())
		{
			FHitResult Hit;
			SafeMoveUpdatedComponent(DesiredMovementThisFrame, UpdatedComponent->GetComponentRotation(), true, Hit);

			// 若发生碰撞，尝试滑过去
			if (Hit.IsValidBlockingHit())
			{
				SlideAlongSurface(DesiredMovementThisFrame, 1.f - Hit.Time, Hit.Normal, Hit);
			}
		}
	};
```

## 4.同时使用Pawn和组件

1.  要使用自定义 **Pawn移动组件**，首先需将变量添加到 **Pawn** 类进行追踪。在CollidingPawn.h中的类定义底部，添加"OurParticleSystem"变量的位置旁，添加：
    
    ```cpp
             UPROPERTY()
             class UCollidingPawnMovementComponent* OurMovementComponent;
    		
    ```
    
2.  拥有可用于追踪其的位置后，需创建存储在新变量中的 **碰撞Pawn移动组件**。因此打开 `CollidingPawn.cpp` ，在文件顶部 `GameFramework/Pawn.h` 所在一行的下方添加下列行，以便代码引用新类：
    
    ```cpp
             #include "CollidingPawnMovementComponent.h"
    ```
    
    请确保列最后一个头文件是 "generated.h"，否则会造成编译错误。
    
    创建Pawn移动组件并将其与Pawn关联的方法非常简单。在 `ACollidingPawn::ACollidingPawn` 底部，添加此代码：
    
    ```cpp
         // 创建移动组件的实例，并要求其更新根。
         OurMovementComponent = CreateDefaultSubobject<UCollidingPawnMovementComponent>(TEXT("CustomMovementComponent"));
         OurMovementComponent->UpdatedComponent = RootComponent;
    
    ```
    
    与目前为止所见其他 **组件** 不同，无需将此组件附加到自己的组件层级。这是因为其他组件均属于 **场景组件** 类型，本身需要物理位置。但 **运动控制器** 并非场景组件，不代表物理对象，因此物理位置上存在或者与另一组件物理连接的概念不适用于此类控制器。
    
3.  Pawn拥有名为 `GetMovementComponent` 的函数，用于提供引擎中其他类访问该Pawn当前所用Pawn移动组件的权限。需覆盖该函数，使其返回自定义Pawn移动组件。在 `CollidingPawn.h` 中的类定义中，需添加：
    
    ```cpp
             virtual UPawnMovementComponent* GetMovementComponent() const override;
    		
    ```
    
    而在 `CollidingPawn.cpp` 中，需按以下所示，添加覆盖函数的定义：
    
    ```cpp
         UPawnMovementComponent* ACollidingPawn::GetMovementComponent() const
         {
             return OurMovementComponent;
         }
    
    ```
    
4.  设置新的Pawn移动组件后，可创建代码处理Pawn会接收的输入。首先在 `CollidingPawn.h` 中的类定义内声明以下函数：
    
    ```cpp
             void MoveForward(float AxisValue);
             void MoveRight(float AxisValue);
             void Turn(float AxisValue);
             void ParticleToggle();
    		
    ```
    
    在 `CollidingPawn.cpp` 中，按以下所示，添加此类函数的定义：
    
    ```cpp
             void ACollidingPawn::MoveForward(float AxisValue)
             {
                 if (OurMovementComponent && (OurMovementComponent->UpdatedComponent == RootComponent))
                 {
                     OurMovementComponent->AddInputVector(GetActorForwardVector() * AxisValue);
                 }
             }
    
             void ACollidingPawn::MoveRight(float AxisValue)
             {
                 if (OurMovementComponent && (OurMovementComponent->UpdatedComponent == RootComponent))
                 {
                     OurMovementComponent->AddInputVector(GetActorRightVector() * AxisValue);
                 }
             }
    
             void ACollidingPawn::Turn(float AxisValue)
             {
                 FRotator NewRotation = GetActorRotation();
                 NewRotation.Yaw += AxisValue;
                 SetActorRotation(NewRotation);
             }
    
             void ACollidingPawn::ParticleToggle()
             {
                 if (OurParticleSystem && OurParticleSystem->Template)
                 {
                     OurParticleSystem->ToggleActive();
                 }
             }
    
    ```
    
5.  现在只需将函数绑定到输入事件。将下列代码添加到 `ACollidingPawn::SetupPlayerInputComponent`：
    
    ```cpp
             InInputComponent->BindAction("ParticleToggle", IE_Pressed, this, &ACollidingPawn::ParticleToggle);
    		
             InInputComponent->BindAxis("MoveForward", this, &ACollidingPawn::MoveForward);
             InInputComponent->BindAxis("MoveRight", this, &ACollidingPawn::MoveRight);
             InInputComponent->BindAxis("Turn", this, &ACollidingPawn::Turn);
    		
    ```
    
6.  现已完成编程，可返回 **虚幻编辑器** 并按 **编译** 按钮加载更改。
    

编程工作已结束，现可将自定义Pawn放入场景进行移动。

### 最终代码

**CollidingPawn.h**

```cpp
	// Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.

	#pragma once

	#include "CoreMinimal.h"
	#include "GameFramework/Pawn.h"
	#include "CollidingPawn.generated.h"

	UCLASS()
	class HOWTO_COMPONENTS_API ACollidingPawn : public APawn
	{
		GENERATED_BODY()

	public:
		// 设置此Pawn属性的默认值
		ACollidingPawn();

	protected:
		// 游戏开始或生成时调用
		virtual void BeginPlay() override;

	public:
		// 逐帧调用
		virtual void Tick( float DeltaSeconds ) override;

		// 调用以将功能与输入绑定
		virtual void SetupPlayerInputComponent(class UInputComponent* InInputComponent) override;

		UPROPERTY()
		class UParticleSystemComponent* OurParticleSystem;

		UPROPERTY()
		class UCollidingPawnMovementComponent* OurMovementComponent;

		virtual UPawnMovementComponent* GetMovementComponent() const override;

		void MoveForward(float AxisValue);
		void MoveRight(float AxisValue);
		void Turn(float AxisValue);
		void ParticleToggle();
	};

```

**CollidingPawn.cpp**

```cpp
	// Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.

	#include "CollidingPawn.h"
	#include "CollidingPawnMovementComponent.h"
	#include "UObject/ConstructorHelpers.h"
	#include "Particles/ParticleSystemComponent.h"
	#include "Components/SphereComponent.h"
	#include "Camera/CameraComponent.h"
	#include "GameFramework/SpringArmComponent.h"

	// 设置默认值
	ACollidingPawn::ACollidingPawn()
	{
		// 设置该Pawn以逐帧调用Tick()。如无需此功能，可关闭以提高性能。
		PrimaryActorTick.bCanEverTick = true;

		// 根组件将成为对物理反应的球体
		USphereComponent* SphereComponent = CreateDefaultSubobject<USphereComponent>(TEXT("RootComponent"));
		RootComponent = SphereComponent;
		SphereComponent->InitSphereRadius(40.0f);
		SphereComponent->SetCollisionProfileName(TEXT("Pawn"));

		// 创建并放置网格体组件，以便查看球体位置
		UStaticMeshComponent* SphereVisual = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("VisualRepresentation"));
		SphereVisual->SetupAttachment(RootComponent);
		static ConstructorHelpers::FObjectFinder<UStaticMesh> SphereVisualAsset(TEXT("/Game/StarterContent/Shapes/Shape_Sphere.Shape_Sphere"));
		if (SphereVisualAsset.Succeeded())
		{
			SphereVisual->SetStaticMesh(SphereVisualAsset.Object);
			SphereVisual->SetRelativeLocation(FVector(0.0f, 0.0f, -40.0f));
			SphereVisual->SetWorldScale3D(FVector(0.8f));
		}

		// 创建可激活或停止的粒子系统
		OurParticleSystem = CreateDefaultSubobject<UParticleSystemComponent>(TEXT("MovementParticles"));
		OurParticleSystem->SetupAttachment(SphereVisual);
		OurParticleSystem->bAutoActivate = false;
		OurParticleSystem->SetRelativeLocation(FVector(-20.0f, 0.0f, 20.0f));
		static ConstructorHelpers::FObjectFinder<UParticleSystem> ParticleAsset(TEXT("/Game/StarterContent/Particles/P_Fire.P_Fire"));
		if (ParticleAsset.Succeeded())
		{
			OurParticleSystem->SetTemplate(ParticleAsset.Object);
		}

		// 使用弹簧臂给予摄像机平滑自然的运动感。
		USpringArmComponent* SpringArm = CreateDefaultSubobject<USpringArmComponent>(TEXT("CameraAttachmentArm"));
		SpringArm->SetupAttachment(RootComponent);
		SpringArm->SetRelativeRotation(FRotator(-45.f, 0.f, 0.f));
		SpringArm->TargetArmLength = 400.0f;
		SpringArm->bEnableCameraLag = true;
		SpringArm->CameraLagSpeed = 3.0f;

		// 创建摄像机并附加到弹簧臂
		UCameraComponent* Camera = CreateDefaultSubobject<UCameraComponent>(TEXT("ActualCamera"));
		Camera->SetupAttachment(SpringArm, USpringArmComponent::SocketName);

		// 控制默认玩家
		AutoPossessPlayer = EAutoReceiveInput::Player0;

		// 创建移动组件的实例，并要求其更新根组件。
		OurMovementComponent = CreateDefaultSubobject<UCollidingPawnMovementComponent>(TEXT("CustomMovementComponent"));
		OurMovementComponent->UpdatedComponent = RootComponent;
	}

	// 游戏开始或生成时调用
	void ACollidingPawn::BeginPlay()
	{
		Super::BeginPlay();

	}

	// 逐帧调用
	void ACollidingPawn::Tick( float DeltaTime )
	{
		Super::Tick( DeltaTime );

	}

	// 调用以将功能与输入绑定
	void ACollidingPawn::SetupPlayerInputComponent(class UInputComponent* InInputComponent)
	{
		Super::SetupPlayerInputComponent(InInputComponent);

		InInputComponent->BindAction("ParticleToggle", IE_Pressed, this, &ACollidingPawn::ParticleToggle);

		InInputComponent->BindAxis("MoveForward", this, &ACollidingPawn::MoveForward);
		InInputComponent->BindAxis("MoveRight", this, &ACollidingPawn::MoveRight);
		InInputComponent->BindAxis("Turn", this, &ACollidingPawn::Turn);
	}

	UPawnMovementComponent* ACollidingPawn::GetMovementComponent() const
	{
		return OurMovementComponent;
	}

	void ACollidingPawn::MoveForward(float AxisValue)
	{
		if (OurMovementComponent && (OurMovementComponent->UpdatedComponent == RootComponent))
		{
			OurMovementComponent->AddInputVector(GetActorForwardVector() * AxisValue);
		}
	}

	void ACollidingPawn::MoveRight(float AxisValue)
	{
		if (OurMovementComponent && (OurMovementComponent->UpdatedComponent == RootComponent))
		{
			OurMovementComponent->AddInputVector(GetActorRightVector() * AxisValue);
		}
	}

	void ACollidingPawn::Turn(float AxisValue)
	{
		FRotator NewRotation = GetActorRotation();
		NewRotation.Yaw += AxisValue;
		SetActorRotation(NewRotation);
	}

	void ACollidingPawn::ParticleToggle()
	{
		if (OurParticleSystem && OurParticleSystem->Template)
		{
			OurParticleSystem->ToggleActive();
		}
	}

```

**CollidingPawnMovementComponent.h**

```cpp
	// Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.

	#pragma once

	#include "CoreMinimal.h"
	#include "GameFramework/PawnMovementComponent.h"
	#include "CollidingPawnMovementComponent.generated.h"

	/**
		*
		*/
	UCLASS()
	class HOWTO_COMPONENTS_API UCollidingPawnMovementComponent : public UPawnMovementComponent
	{
		GENERATED_BODY()

	public:
		virtual void TickComponent(float DeltaTime, enum ELevelTick TickType, FActorComponentTickFunction *ThisTickFunction) override;
	};

```

**CollidingPawnMovementComponent.cpp**

```cpp
	// Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.

	#include "CollidingPawnMovementComponent.h"

	void UCollidingPawnMovementComponent::TickComponent(float DeltaTime, enum ELevelTick TickType, FActorComponentTickFunction *ThisTickFunction)
	{
		Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

		// 确保所有事物持续有效，以便进行移动。
		if (!PawnOwner || !UpdatedComponent || ShouldSkipUpdate(DeltaTime))
		{
			return;
		}

		// 获取（然后清除）ACollidingPawn::Tick中设置的移动向量
		FVector DesiredMovementThisFrame = ConsumeInputVector().GetClampedToMaxSize(1.0f) * DeltaTime * 150.0f;
		if (!DesiredMovementThisFrame.IsNearlyZero())
		{
			FHitResult Hit;
			SafeMoveUpdatedComponent(DesiredMovementThisFrame, UpdatedComponent->GetComponentRotation(), true, Hit);

			// 若发生碰撞，尝试滑过去
			if (Hit.IsValidBlockingHit())
			{
				SlideAlongSurface(DesiredMovementThisFrame, 1.f - Hit.Time, Hit.Normal, Hit);
			}
		}
	};

```

## 5.在编辑器中运行

1.  在 **虚幻编辑器** 中，可按 **编译** 按钮加载代码更改。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d39dc90-9d11-4be5-a28c-b032ade32966/compilefromeditor.png)
2.  需将 **CollidingPawn** 实例放入场景。可在 **内容浏览器** 的"C++ Classes/HowTo\_Components/CollidingPawn"下找到该类。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/376a3e94-a58a-408d-8e42-8da84c61699c/classincontentbrowser.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ae5fe29-26af-4b6d-843d-1f071cc4a6ac/leveleditorbeforeplay.png)
3.  按 **运行**，球体便会随WASD移动，随鼠标转动，并在场景中的物体（如桌子和椅子）上碰撞和滑动，或需要放入场景的任何物理对象。还可使用空格键向自己点火（或扑灭）！
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df4e2806-bfaf-47d8-9263-a6b53d392f3d/collidingandonfire.png)

**虚幻引擎** 提供各式 **组件** - 目前仅简略介绍了部分常用组件。请尝试探究内置组件，或自己编写组件！组件灵活且功能强大，可协助项目代码保持整洁和可重用性。

## 6.自行尝试！

利用所学内容，尝试以下操作：

-   创建在轨道上自动围绕父项运行的 **组件**。
-   编译最多生成三个子项的组件，此类子项一段时间后会自行消失。
-   了解通过组件将完整 **Actor** 附加到其他Actor的方法。

-   [collision](https://dev.epicgames.com/community/search?query=collision)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [quickstart](https://dev.epicgames.com/community/search?query=quickstart)
-   [component](https://dev.epicgames.com/community/search?query=component)
-   [pawn](https://dev.epicgames.com/community/search?query=pawn)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1.创建和附加组件](/documentation/zh-cn/unreal-engine/quick-start-guide-to-components-and-collision-in-unreal-engine-cpp#1%E5%88%9B%E5%BB%BA%E5%92%8C%E9%99%84%E5%8A%A0%E7%BB%84%E4%BB%B6)
-   [半成品代码](/documentation/zh-cn/unreal-engine/quick-start-guide-to-components-and-collision-in-unreal-engine-cpp#%E5%8D%8A%E6%88%90%E5%93%81%E4%BB%A3%E7%A0%81)
-   [2.配置输入和创建Pawn移动组件](/documentation/zh-cn/unreal-engine/quick-start-guide-to-components-and-collision-in-unreal-engine-cpp#2%E9%85%8D%E7%BD%AE%E8%BE%93%E5%85%A5%E5%92%8C%E5%88%9B%E5%BB%BApawn%E7%A7%BB%E5%8A%A8%E7%BB%84%E4%BB%B6)
-   [3.为Pawn移动组件的行为编写代码](/documentation/zh-cn/unreal-engine/quick-start-guide-to-components-and-collision-in-unreal-engine-cpp#3%E4%B8%BApawn%E7%A7%BB%E5%8A%A8%E7%BB%84%E4%BB%B6%E7%9A%84%E8%A1%8C%E4%B8%BA%E7%BC%96%E5%86%99%E4%BB%A3%E7%A0%81)
-   [半成品代码](/documentation/zh-cn/unreal-engine/quick-start-guide-to-components-and-collision-in-unreal-engine-cpp#%E5%8D%8A%E6%88%90%E5%93%81%E4%BB%A3%E7%A0%81-2)
-   [4.同时使用Pawn和组件](/documentation/zh-cn/unreal-engine/quick-start-guide-to-components-and-collision-in-unreal-engine-cpp#4%E5%90%8C%E6%97%B6%E4%BD%BF%E7%94%A8pawn%E5%92%8C%E7%BB%84%E4%BB%B6)
-   [最终代码](/documentation/zh-cn/unreal-engine/quick-start-guide-to-components-and-collision-in-unreal-engine-cpp#%E6%9C%80%E7%BB%88%E4%BB%A3%E7%A0%81)
-   [5.在编辑器中运行](/documentation/zh-cn/unreal-engine/quick-start-guide-to-components-and-collision-in-unreal-engine-cpp#5%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E8%BF%90%E8%A1%8C)
-   [6.自行尝试！](/documentation/zh-cn/unreal-engine/quick-start-guide-to-components-and-collision-in-unreal-engine-cpp#6%E8%87%AA%E8%A1%8C%E5%B0%9D%E8%AF%95%EF%BC%81)
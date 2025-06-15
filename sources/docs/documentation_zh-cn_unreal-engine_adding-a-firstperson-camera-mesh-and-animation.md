# Adding a First-Person Camera, Mesh, and Animation | Unreal Engine 5.6 Documentation | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation
> 
> 生成时间: 2025-06-14T18:50:14.536Z

---

目录

## 开始之前

请确保你已经完成了上一节 [配置角色移动](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/configure-character-movement-with-cplusplus-in-unreal-engine) 中的以下目标：

-   理解输入操作和输入映射上下文的工作原理。
    
-   设置角色的前后左右移动以及跳跃移动。
    

## 第一人称摄像机的控制

要更改摄像机的方向，我们需要更改摄像机**变换（Transform）**属性的**旋转（Rotation）**值。 要在3D空间中旋转，对象会使用**俯仰（Pitch）**、**滚动（Roll）**和**偏转（Yaw）**来控制自身转动的方向以及绕哪个轴转动。

-   **俯仰（Pitch）**：控制沿水平（X）轴的旋转。 更改此值会使对象向上或向下旋转，类似于点头。
    
-   **偏转（Yaw）**：控制沿垂直（Y）轴的旋转。 更改此值会使对象向左或向右旋转，类似于向左或向右转。
    
-   **滚动（Roll）**：控制沿纵向（Z）轴的旋转。 更改此值会使对象左右滚动，类似于将头 向左或向右倾斜。
    

[![](https://dev.epicgames.com/community/api/documentation/image/7b8b9bd4-1bcf-4a6d-a053-d5f38ca09632?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/7b8b9bd4-1bcf-4a6d-a053-d5f38ca09632?resizing_type=fit)

第一人称游戏中的摄像机通常使用偏转和俯仰来控制移动。 如果你正在编写一款游戏，需要让飞机或宇宙飞船旋转，或者需要模拟从角落窥视的场景，那么你可能还会用到滚动（Roll）。

### 探索蓝图中的摄像机移动

打开`BP_FirstPersonCharacter`，查看**蓝图编辑器**中默认角色的摄像机控制逻辑。 在**EventGraph**中，查看**Camera Input**节点组。

就像`IA_Move`一样，`IA_Look`输入操作也拥有一个**Axis2D值类型（Axis2D Value Type）**，因此它会将移动拆分为**X**值和**Y**值。 而这时，当**Add Controller Yaw Input**和**Pitch Input**函数节点为角色添加值时，X和Y分别会变成**偏转（Yaw）**和**俯仰（Pitch）**。

### 探索第一人称角色组件

转到`BP_FirstPersonCharacter`的**视口（Viewport）**选项卡，即可查看该Actor及其组件的3D预览。

在**组件（Components）**选项卡中，你会看到附加组件的结构化层级，而这些组件定义了该角色在世界中的形态。

角色蓝图会使用以下内容自动实例化：

-   一个**胶囊体组件（Capsule Component）**，该组件让角色能够与世界中的对象发生碰撞。
    
-   一个**骨骼网格体（Skeletal Mesh）**组件，用于实现动画效果并可视化角色。 在**细节（Details）**面板中，你会看到此角色使用`SKM_Manny_Simple`作为其**骨骼网格体资产（Skeletal Mesh Asset）**。
    
-   一个**角色移动组件（Character Movement Component）**，该组件让角色可以四处移动。
    

[![](https://dev.epicgames.com/community/api/documentation/image/e05a20d4-5e4e-47e9-a8dd-118ace82e0a4?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e05a20d4-5e4e-47e9-a8dd-118ace82e0a4?resizing_type=fit)

此角色还有第二份**骨骼网格体**（名为**FirstPersonMesh**，同样使用`SKM_Manny_Simple`），它是主网格体组件的子项。 在第一人称游戏中，角色通常会为第三人称和第一人称上下文分别设置不同的网格体。 第三人称网格体仅对其他玩家可见，或者当玩家处于第三人称视角时可见。 第一人称网格体在玩家处于第一人称视角时对玩家可见。

**FirstPersonMesh**拥有一个名为**FirstPersonCamera**的子项**摄像机组件**。 这个摄像机决定了玩家的第一人称视角，并会随着角色环顾四周而旋转。 在本教程的这一部分，你将使用C++在运行时为角色实例化一个摄像机，并为该摄像机设置匹配此摄像机的位置。

如需详细了解角色组件，请参阅[角色Gameplay框架](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/characters-in-unreal-engine)文档。

## 在代码中实现观察输入

要在代码中实现此摄像机的功能（就像你在上一步中实现的移动功能一样），你需要将`IA_Look`输入操作绑定到一个函数上，然后将该函数绑定到你的角色上。

### 声明Look()函数和变量

在Visual Studio中打开角色的`.h`文件。

本教程中的示例代码使用的角色类名称为`AdventureCharacter`。

当你的角色在运行时编译时，你需要让虚幻引擎为其添加一个摄像机组件，并动态地定位该摄像机。 要启用此功能，请为`"Camera/CameraComponent.h"`添加一个新的`#include`：

`   #include "CoreMinimal.h"  #include "Camera/CameraComponent.h"  #include "GameFramework/Character.h"  #include "EnhancedInputComponent.h"  #include "EnhancedInputSubsystems.h"   #include "InputActionValue.h"  #include "AdventureCharacter.generated.h"         `

#include "CoreMinimal.h" #include "Camera/CameraComponent.h" #include "GameFramework/Character.h" #include "EnhancedInputComponent.h" #include "EnhancedInputSubsystems.h" #include "InputActionValue.h" #include "AdventureCharacter.generated.h"

复制完整片段(7行长度)

在头文件的`protected` 小节中，声明一个名为`LookAction`的新`UInputAction`指针。 为该指针赋予与`MoveAction`和`JumpAction`相同的`UPROPERTY()`宏。 这将指向`IA_Look`输入操作。

`   // Look Input Actions  UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = Input)  UInputAction* LookAction;         `

// Look Input Actions UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = Input) UInputAction\* LookAction;

复制完整片段(3行长度)

在`public` 小节中，声明一个名为`Look()`的新函数，该函数将接受一个名为`Value`的常量`FInputActionValue`引用。 请确保为该函数添加一个`UFUNCTION()`宏。

`   // Handles Look Input  UFUNCTION()  void Look(const FInputActionValue& Value);         `

// Handles Look Input UFUNCTION() void Look(const FInputActionValue& Value);

复制完整片段(3行长度)

在声明`Look()`函数后，再声明一个名为`FirstPersonCameraComponent`的新`UCameraComponent`指针。 为了将此属性公开给虚幻编辑器，请添加一个包含`VisibleAnywhere`参数的`UPROPERTY()`宏。

`   // First Person camera  UPROPERTY(VisibleAnywhere)  UCameraComponent* FirstPersonCameraComponent;         `

// First Person camera UPROPERTY(VisibleAnywhere) UCameraComponent\* FirstPersonCameraComponent;

复制完整片段(3行长度)

在`FirstPersonCameraComponent`之后，声明一个名为`FirstPersonMeshComponent`的新`USkeletalMeshComponent`指针。 为其添加一个包含`VisibleAnywhere`和`Category = Mesh`参数的`UPROPERTY()`宏，从而让它出现在**细节**面板的**网格体（Mesh）**分段中。

`   // First-person mesh, visible only to the owning player  UPROPERTY(VisibleAnywhere, Category = Mesh)  USkeletalMeshComponent* FirstPersonMeshComponent;         `

// First-person mesh, visible only to the owning player UPROPERTY(VisibleAnywhere, Category = Mesh) USkeletalMeshComponent\* FirstPersonMeshComponent;

复制完整片段(3行长度)

你现在为如下项目设置了声明：

-   第一人称网格体（对应你在蓝图中所见的子FirstPersonMesh）
    
-   摄像机
    
-   `Look()`函数
    
-   `IA_Look`输入操作
    

角色的`.h`文件现在应该如下所示：

```
// Copyright Epic Games, Inc. All Rights Reserved.

#pragma once

#include "CoreMinimal.h"
#include "Camera/CameraComponent.h"
#include "GameFramework/Character.h"
#include "EnhancedInputComponent.h"
#include "EnhancedInputSubsystems.h" 
#include "InputActionValue.h"
```

展开代码复制完整片段(67行长度)

### 使用Look()添加观察输入

打开角色的`.cpp`文件以使用`Look()`函数实现角色蓝图的摄像机输入逻辑。

就和`IA_Move`一样，`IA_Look`也会在被触发时返回一个FVector2d值。 为`Look()`函数添加一个新的函数定义。 在该函数内部，在名为`LookAxisValue`的新`FVector2d`中获取`FInputActionValue`的值。

`   void AAdventureCharacter::Look(const FInputActionValue& Value)  {  	const FVector2D LookAxisValue = Value.Get<FVector2D>();  }         `

void AAdventureCharacter::Look(const FInputActionValue& Value) { const FVector2D LookAxisValue = Value.Get<FVector2D>(); }

复制完整片段(4行长度)

接下来，在`if`语句中，检查控制器是否有效。

如果有效，则调用`AddControllerYawInput()`和`AddControllerPitchInput()`函数，并分别传入`LookAxisValue.X`和`LookAxisValue.Y`的值。 完整的`Look()`函数应该如下所示：

`   void AAdventureCharacter::Look(const FInputActionValue& Value)  {  	const FVector2D LookAxisValue = Value.Get<FVector2D>();     	if (Controller)  	{  		AddControllerYawInput(LookAxisValue.X);  		AddControllerPitchInput(LookAxisValue.Y);  	}  }         `

void AAdventureCharacter::Look(const FInputActionValue& Value) { const FVector2D LookAxisValue = Value.Get<FVector2D>(); if (Controller) { AddControllerYawInput(LookAxisValue.X); AddControllerPitchInput(LookAxisValue.Y); } }

复制完整片段(10行长度)

### 使用SetupPlayerInputComponent将观察功能绑定至输入

在`SetupPlayerInputComponent()`内部（与移动操作类似），你需要将`Look()`函数绑定到`LookAction`输入操作。

`EnhancedInputComponent->BindAction(LookAction, ETriggerEvent::Triggered, this, &AAdventureCharacter::Look);`

EnhancedInputComponent->BindAction(LookAction, ETriggerEvent::Triggered, this, &AAdventureCharacter::Look);

复制完整片段(1行长度)

你的`SetupPlayerInputComponent()`函数应如下所示：

```
// Called to bind functionality to input
void AAdventureCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	// Check the UInputComponent passed to this function and cast it to an UEnhancedInputComponent
	if (UEnhancedInputComponent* EnhancedInputComponent = CastChecked<UEnhancedInputComponent>(PlayerInputComponent))
	{
		// Bind Movement Actions
		EnhancedInputComponent->BindAction(MoveAction, ETriggerEvent::Triggered, this, &AAdventurenCharacter::Move);

		// Bind Look Actions
```

展开代码复制完整片段(18行长度)

保存代码，并点击**编译（Build）**以在Visual Studio中进行编译。

### 测试观察的移动情况

按下**运行（Play）**按钮即可测试你的游戏，这时你将能够环顾四周，并朝任意方向移动你的角色！

请注意，虽然你的游戏内视角看起来像是来自于第一人称摄像机，但实际上，这时你的角色身上还没有摄像机组件。 相反地，是虚幻引擎模拟了从角色胶囊体组件中心出发的视角。 在下一步中，你将学习如何为角色类添加摄像机，从而改变这一点。

## 在运行时创建组件

接下来，你将实例化你在头文件中声明的`FirstPersonCameraComponent`和`FirstPersonMeshComponent`指针，从而完成角色的第一人称网格体和摄像机的创建。

首先，打开角色的`.cpp`文件。

在文件顶部，你会看到构造脚本函数（本教程中为`AAdventureCharacter()`），该函数设置了角色的默认值。 你将在这里添加额外组件。 如需了解构造脚本的功能概述，请参阅[构造脚本蓝图节点](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/construction-script-in-unreal-engine)文档。

### 添加摄像机

要为角色添加组件，你需要使用`CreateDefaultSubobject()`模板函数。 该函数会返回一个指向新组件的指针，并使用以下参数：

`CreateDefaultSubobject<*type*>(TEXT("*Name*"));`

其中*type*是你正在创建的子对象的类型，*Name*是虚幻引擎用于识别子对象并在编辑器中显示子对象的内部名称。

在构造脚本中，请将`FirstPersonCameraComponent`指针设为调用类型为`UCameraComponent`的`CreateDefaultSubobject()`函数的结果。 在`TEXT`参数中，将对象命名为"FirstPersonCamera"。

`FirstPersonCameraComponent = CreateDefaultSubobject<UCameraComponent>(TEXT("FirstPersonCamera"));`

FirstPersonCameraComponent = CreateDefaultSubobject<UCameraComponent>(TEXT("FirstPersonCamera"));

复制完整片段(1行长度)

这将创建一个默认的摄像机对象，作为`MyFirstPersonCharacter`类的子对象。

接下来，为确保摄像机已被正确实例化，请检查`FirstPersonCameraComponent`是否不为空。

`   // Create a first person camera component.  FirstPersonCameraComponent = CreateDefaultSubobject<UCameraComponent>(TEXT("FirstPersonCamera"));  check(FirstPersonCameraComponent != nullptr);         `

// Create a first person camera component. FirstPersonCameraComponent = CreateDefaultSubobject<UCameraComponent>(TEXT("FirstPersonCamera")); check(FirstPersonCameraComponent != nullptr);

复制完整片段(3行长度)

### 添加第一人称网格体

为`FirstPersonMeshComponent`再创建一个`CreateDefaultSubobject`函数调用，并使用`USkeletalMeshComponent`作为类型，"FirstPersonMesh"为名称。 记得在后面添加一个`check`。

`   // Create a first person mesh component for the owning player.  FirstPersonMeshComponent = CreateDefaultSubobject<USkeletalMeshComponent>(TEXT("FirstPersonMesh"));  	check(FirstPersonMeshComponent != nullptr);         `

// Create a first person mesh component for the owning player. FirstPersonMeshComponent = CreateDefaultSubobject<USkeletalMeshComponent>(TEXT("FirstPersonMesh")); check(FirstPersonMeshComponent != nullptr);

复制完整片段(3行长度)

### 附加网格体和摄像机

现在你已经创建了网格体，需要将其附加到角色上。

`SetupAttachment()`函数可将一个场景组件附加到另一个场景组件上，从而在组件层级中建立父子关系。 该函数会将父组件作为参数。

请对`FirstPersonMeshComponent`所指向的对象调用`SetupAttachment()`函数。 在本例中，父组件应该是角色的默认骨骼网格体，而你可以使用`GetMesh()`来获取该网格体：

`   // Attach the FirstPerson mesh to the Skeletal Mesh  FirstPersonMeshComponent->SetupAttachment(GetMesh());         `

// Attach the FirstPerson mesh to the Skeletal Mesh FirstPersonMeshComponent->SetupAttachment(GetMesh());

复制完整片段(2行长度)

这会将第一人称网格体作为子对象附加到角色的第三人称网格体之下。

接下来再使用`SetupAttachment()`调用，将摄像机组件附加到第一人称网格体上。 这次，你需要添加一个可选的重载项来指定组件应该附加到网格体上的确切位置（即**插槽**）。

本教程中使用的`SKM_Manny_Simple`网格体拥有一套用于动画的预设插槽（或骨骼）。 你可以在代码中使用`FName`字符串来引用插槽。 最好将摄像机放置在角色头部附近，所以你需要将`Head`插槽名称传递给`SetupAttachment`，以此以将摄像机附加到该插槽。 稍后，你需要将摄像机移近到角色的眼部位置。

`FName`是虚幻引擎所使用的一种特殊类字符串类型，作用是以节省内存的方式存储唯一的、不可变的名称。

`   // Attach the camera component to the first-person Skeletal Mesh.  FirstPersonCameraComponent->SetupAttachment(FirstPersonMeshComponent, FName("Head"));         `

// Attach the camera component to the first-person Skeletal Mesh. FirstPersonCameraComponent->SetupAttachment(FirstPersonMeshComponent, FName("Head"));

复制完整片段(2行长度)

如需了解插槽以及如何创建插槽，请参阅[骨骼网格体插槽](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine)。

最后，将`FirstPersonCameraComponent`的 `bUsePawnControlRotation`属性设为`true`。 这会让摄像机继承其父项Pawn的旋转，因此当角色转动时，摄像机也会随之转动。

`   // Enable the pawn to control camera rotation.  FirstPersonCameraComponent->bUsePawnControlRotation = true;         `

// Enable the pawn to control camera rotation. FirstPersonCameraComponent->bUsePawnControlRotation = true;

复制完整片段(2行长度)

角色的构造函数应如下所示：

```
// Sets default values
AAdventureCharacter::AAdventureCharacter()
{
	// Set this character to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

	// Create a first person camera component.
	FirstPersonCameraComponent = CreateDefaultSubobject<UCameraComponent>(TEXT("FirstPersonCamera"));
	check(FirstPersonCameraComponent != nullptr);

```

展开代码复制完整片段(23行长度)

### 隐藏网格体

到目前为止，你的角色拥有一个第一人称和第三人称骨骼网格体，而它们在游戏过程中会重叠。 然而，第一人称网格体应该对其他玩家不可见，而第三人称网格体应该对你（玩家）不可见。 为处理此问题，请为`BeginPlay()`添加代码，从而在游戏开始时隐藏网格体。

检查全局引擎指针后，请对`FirstPersonMeshComponent`调用`SetOnlyOwnerSee()`函数，并传入`true`，以使第一人称网格体仅对其所属的玩家可见。

`   // Only the owning player sees the first person mesh  FirstPersonMeshComponent->SetOnlyOwnerSee(true);         `

// Only the owning player sees the first person mesh FirstPersonMeshComponent->SetOnlyOwnerSee(true);

复制完整片段(2行长度)

使用`SetOwnerNoSee()`让第三人称网格体对你不可见。 但它依然对其他玩家可见。

`   // Hide the regular (third-person) body mesh from the owning player  GetMesh()->SetOwnerNoSee(true);         `

// Hide the regular (third-person) body mesh from the owning player GetMesh()->SetOwnerNoSee(true);

复制完整片段(2行长度)

### 偏移摄像机位置

在初始化摄像机组件时，你将其附加到了角色的头部插槽。 不过，如果将摄像机定位在角色的眼部位置，那么其视野会更准确。 要添加一个用于微调摄像机位置的FVector偏移量，请对摄像机组件调用`SetRelativeLocation`：

`   // Position the camera slightly above the eyes.  FirstPersonCameraComponent->SetRelativeLocation(FVector(2.8f, 5.9f, 0.0f));         `

// Position the camera slightly above the eyes. FirstPersonCameraComponent->SetRelativeLocation(FVector(2.8f, 5.9f, 0.0f));

复制完整片段(2行长度)

由于时序问题，在构造函数中附加摄像机后立即对其偏移操作可能无法生效，因此请在`BeginPlay()`中调用`SetRelativeLocation`以获取最佳性能。

你的`BeingPlay()`函数应如下所示：

```
// Called when the game starts or when spawned
void AAdventureCharacter::BeginPlay()
{
	Super::BeginPlay();

	check(GEngine != nullptr);

	// Only the owning player sees the first person mesh
	FirstPersonMeshComponent->SetOnlyOwnerSee(true);

```

展开代码复制完整片段(30行长度)

保存代码，并点击**编译（Build）**以在Visual Studio中进行编译。

## 在虚幻编辑器中指定网格体

你已设置好了摄像机功能按钮，现在还剩最后一步 — 使用编辑器为你在代码中声明的变量添加骨骼网格体资产。

要为角色蓝图添加骨骼网格体，请执行以下步骤：

1.  在虚幻编辑器中打开角色蓝图（如果尚未打开）。
    
2.  转到角色的**组件（Components）**面板，选择根骨骼`BP_CharacterName`组件。
    
3.  转到**细节（Details）**面板的**网格体（Mesh）**分段，你将看到角色拥有两个SkeletalMeshAsset插槽，而不是一个，这是因为你在代码中创建了`FirstPersonMeshComponent`。 点击各个属性的下拉菜单中的箭头，并为两个网格体都选择`SKM_Manny_Simple`。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/6a78171d-9f38-4725-9f86-6d0c5d1ad8a1?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6a78171d-9f38-4725-9f86-6d0c5d1ad8a1?resizing_type=fit)
    
    当你设置**FirstPersonMeshComponent**时，你的摄像机应该会移动到角色头部后方的位置。
    
4.  保存你的蓝图并点击**编译（Compile）**。
    

如果你运行游戏并向下看，你应该能看到角色的第一人称网格体！ 当你环顾四周时，该网格体会随之旋转并移动，而你的摄像机也会匹配这些动作。 第三人称网格体会在运行时隐藏，只对其他玩家可见。 然而，这时你的角色仍然处于静态的T字姿势，因此接下来你需要使用动画蓝图为角色添加动画，使其栩栩如生！

## 为角色添加动画

在代码中，你可以通过**UAnimInstance**类的实例来访问动画逻辑。此类是一种控制器，它会根据状态和其他变量来决定在骨骼网格体上混合并播放哪些动画。 动画蓝图也派生自UAnimInstance，而你可以在C++中使用UAnimBlueprint类型来引用动画蓝图。

编译动画实例（Anim Instance）类不在本教程的范围内；相反地，你需要为你的角色添加第一人称模板的预编译动画蓝图。 该蓝图包含了你的角色播放不同移动和闲置动画所需的动画和逻辑。

虚幻引擎中的动画是逐网格体设置的，因此你需要为第一人称和第三人称网格体分别设置动画。 由于在游戏开始时，你的第三人称网格体被隐藏，所以你只需要为第一人称网格体设置动画。

要为你的角色添加动画属性和动画蓝图，请执行以下步骤：

1.  在角色的`.h`文件顶部，前置声明`UAnimBlueprint`类。 此类代表了你项目中的动画蓝图。
    
    `   class UAnimBlueprint;  class UInputMappingContext;  class UInputAction;  class UInputComponent;         `
    
    class UAnimBlueprint; class UInputMappingContext; class UInputAction; class UInputComponent;
    
    复制完整片段(4行长度)
    
2.  然后在`public` 小节处，声明一个名为`FirstPersonDefaultAnim`的新`UAnimBlueprint`指针。 为其添加`UCLASS()`宏，并设`VisibleAnywhere`和`Category = Animation`。
    
    `   // First Person animations  UPROPERTY(VisibleAnywhere, Category = Animation)  UAnimBlueprint* FirstPersonDefaultAnim;         `
    
    // First Person animations UPROPERTY(VisibleAnywhere, Category = Animation) UAnimBlueprint\* FirstPersonDefaultAnim;
    
    复制完整片段(3行长度)
    
3.  在角色的`.cpp`文件的`BeginPlay()`函数中，转到 `FirstPersonMeshComponent->SetOnlyOwnerSee(true);`这一行之后，调用`FirstPersonMeshComponent->SetAnimInstanceClass()`。 即使你尚未在代码中定义Anim Instance类，你也可以使用`GeneratedClass`从动画蓝图中生成一个类。
    
    `   // Only the owning player sees the first person mesh.  FirstPersonMeshComponent->SetOnlyOwnerSee(true);     // Set the animations on the first person mesh.  FirstPersonMeshComponent->SetAnimInstanceClass(FirstPersonDefaultAnim->GeneratedClass);         `
    
    // Only the owning player sees the first person mesh. FirstPersonMeshComponent-&gt;SetOnlyOwnerSee(true); // Set the animations on the first person mesh. FirstPersonMeshComponent-&gt;SetAnimInstanceClass(FirstPersonDefaultAnim-&gt;GeneratedClass);
    
    复制完整片段(5行长度)
    
4.  保存你的代码并在Visual Studio中编译。
    
5.  转到虚幻编辑器，重新打开你的`BP_MyFirstPersonCharacter`蓝图类，并选择**BP\_MyFirstCharacter**组件。
    
6.  转到**细节（Details）**面板，在**动画（Animation）**项下，将**第一人称默认动画（First Person Default Anim）**设为`ABP_Unarmed`。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/24db31d8-c0f2-4b00-acaa-ba046962d96a?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/24db31d8-c0f2-4b00-acaa-ba046962d96a?resizing_type=fit)
    
7.  保存你的蓝图并进行编译。
    

## 测试角色

按下**运行（Play）**来测试你的游戏。 如果你向下看，你会看到 第一人称网格体会随着你的移动而播放动画！ 试着四处移动并跳跃，查看由此蓝图控制的各种动画。

![](https://dev.epicgames.com/community/api/documentation/image/af4c7330-1394-4669-bb3b-1ad11b1438d8?resizing_type=fit)

## 下一步

在下一节中，你将学习如何创建物品以供角色拾取和使用！

[

![管理物品和数据](https://dev.epicgames.com/community/api/documentation/image/cf498487-79cd-4030-8128-27224b04addd?resizing_type=fit&width=640&height=640)

管理物品和数据

学习使用物品数据结构体、数据资产和数据表来定义物品，并存储和组织物品数据以实现可伸缩性。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/manage-item-and-data-in-an-unreal-engine-game)

## 完整代码

本节中编译的完整代码如下：

```
// Copyright Epic Games, Inc. All Rights Reserved.

#pragma once

#include "CoreMinimal.h"
#include "Camera/CameraComponent.h"
#include "GameFramework/Character.h"
#include "EnhancedInputComponent.h"
#include "EnhancedInputSubsystems.h" 
#include "InputActionValue.h"
```

展开代码复制完整片段(73行长度)

```
#include "MyCharacter.h"

// Sets default values
AAdventureCharacter::AAdventureCharacter()
{
	// Set this character to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

	// Create a first person camera component.
	FirstPersonCameraComponent = CreateDefaultSubobject<UCameraComponent>(TEXT("FirstPersonCamera"));
```

展开代码复制完整片段(114行长度)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [开始之前](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E5%BC%80%E5%A7%8B%E4%B9%8B%E5%89%8D)
-   [第一人称摄像机的控制](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E7%AC%AC%E4%B8%80%E4%BA%BA%E7%A7%B0%E6%91%84%E5%83%8F%E6%9C%BA%E7%9A%84%E6%8E%A7%E5%88%B6)
-   [探索蓝图中的摄像机移动](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E6%8E%A2%E7%B4%A2%E8%93%9D%E5%9B%BE%E4%B8%AD%E7%9A%84%E6%91%84%E5%83%8F%E6%9C%BA%E7%A7%BB%E5%8A%A8)
-   [探索第一人称角色组件](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E6%8E%A2%E7%B4%A2%E7%AC%AC%E4%B8%80%E4%BA%BA%E7%A7%B0%E8%A7%92%E8%89%B2%E7%BB%84%E4%BB%B6)
-   [在代码中实现观察输入](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E5%9C%A8%E4%BB%A3%E7%A0%81%E4%B8%AD%E5%AE%9E%E7%8E%B0%E8%A7%82%E5%AF%9F%E8%BE%93%E5%85%A5)
-   [声明Look()函数和变量](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E5%A3%B0%E6%98%8Elook\(\)%E5%87%BD%E6%95%B0%E5%92%8C%E5%8F%98%E9%87%8F)
-   [使用Look()添加观察输入](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E4%BD%BF%E7%94%A8look\(\)%E6%B7%BB%E5%8A%A0%E8%A7%82%E5%AF%9F%E8%BE%93%E5%85%A5)
-   [使用SetupPlayerInputComponent将观察功能绑定至输入](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E4%BD%BF%E7%94%A8setupplayerinputcomponent%E5%B0%86%E8%A7%82%E5%AF%9F%E5%8A%9F%E8%83%BD%E7%BB%91%E5%AE%9A%E8%87%B3%E8%BE%93%E5%85%A5)
-   [测试观察的移动情况](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E6%B5%8B%E8%AF%95%E8%A7%82%E5%AF%9F%E7%9A%84%E7%A7%BB%E5%8A%A8%E6%83%85%E5%86%B5)
-   [在运行时创建组件](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E5%9C%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E5%88%9B%E5%BB%BA%E7%BB%84%E4%BB%B6)
-   [添加摄像机](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E6%B7%BB%E5%8A%A0%E6%91%84%E5%83%8F%E6%9C%BA)
-   [添加第一人称网格体](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E6%B7%BB%E5%8A%A0%E7%AC%AC%E4%B8%80%E4%BA%BA%E7%A7%B0%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [附加网格体和摄像机](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E9%99%84%E5%8A%A0%E7%BD%91%E6%A0%BC%E4%BD%93%E5%92%8C%E6%91%84%E5%83%8F%E6%9C%BA)
-   [隐藏网格体](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E9%9A%90%E8%97%8F%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [偏移摄像机位置](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E5%81%8F%E7%A7%BB%E6%91%84%E5%83%8F%E6%9C%BA%E4%BD%8D%E7%BD%AE)
-   [在虚幻编辑器中指定网格体](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E5%9C%A8%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E6%8C%87%E5%AE%9A%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [为角色添加动画](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E4%B8%BA%E8%A7%92%E8%89%B2%E6%B7%BB%E5%8A%A0%E5%8A%A8%E7%94%BB)
-   [测试角色](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E6%B5%8B%E8%AF%95%E8%A7%92%E8%89%B2)
-   [下一步](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E4%B8%8B%E4%B8%80%E6%AD%A5)
-   [完整代码](/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation#%E5%AE%8C%E6%95%B4%E4%BB%A3%E7%A0%81)
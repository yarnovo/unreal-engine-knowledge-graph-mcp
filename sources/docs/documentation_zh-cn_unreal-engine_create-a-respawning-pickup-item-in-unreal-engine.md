# Create a Respawning Pickup Item in Unreal Engine | Unreal Engine 5.6 Documentation | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:50:15.029Z

---

目录

## 开始之前

请确保你已经完成了上一节[管理物品和数据](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/manage-item-and-data-in-an-unreal-engine-game)中的以下目标：

-   设置一个物品数据结构体、`UDataAsset`类、一个名为`DA_Pickup_001`的消耗品类型数据资产实例，以及一张数据表。
    

## 创建新拾取物类

到目前为止，你已经学会了如何定义并存储物品的结构和数据。 在本节中，你将学习如何将这些数据转化为游戏中的"拾取物"，即表格数据的具体表现形式，让玩家可以与之交互并获得效果。 拾取物可以是 可装备的小道具、提供材料的箱子，或者是给予临时增益的强化道具。

要设置附带初始声明的拾取物类，请执行以下步骤：

1.  打开虚幻编辑器，转到**工具（Tools）** > **新C++类（New C++ Class）**。 选择**Actor**作为父类，并将该类命名为`PickupBase`。 然后点击**创建类（Create Class）**。
    
2.  在Visual Studio中，打开`PickupBase.h`并在文件顶部添加以下语句：
    
    -   `#include "Components/SphereComponent.h"`。 你需要为拾取物添加一个球体组件，以检测玩家与拾取物之间的碰撞。
        
    -   `#include "AdventureCharacter.h"`。 添加对第一人称角色类的引用，让你可以检查拾取物与该类角色之间的重叠。 （本教程使用AdventureCharacter。）
        
    -   针对`UItemDefinition`的前置声明。 这是所有拾取物会引用的关联数据资产物品。
        
    
    ```
    // Copyright Epic Games, Inc. All Rights Reserved.
    
    #pragma once
    
    #include "Components/SphereComponent.h"
    #include "CoreMinimal.h"
    #include "AdventureCharacter.h"
    #include "GameFramework/Actor.h"
    #include "PickupBase.generated.h"
    
    ```
    
    展开代码复制完整片段(11行长度)
    

在`APickupBase`类定义上方的`UCLASS()`宏中，添加`BlueprintType`和`Blueprintable`说明符，将其作为创建蓝图的基类公开。

`   UCLASS(BlueprintType, Blueprintable)  class ADVENTUREGAME_API APickupBase : public AActor  {         `

UCLASS(BlueprintType, Blueprintable) class ADVENTUREGAME\_API APickupBase : public AActor {

复制完整片段(3行长度)

## 使用表格数据初始化拾取物

到目前为止，你的拾取物还只是一个空白的Actor，因此在游戏开始时，你需要为它提供正常运行所需的数据。 拾取物应从数据表中提取一行值，并将这些值保存在ItemDefinition数据资产（即"引用物品"）中。

### 从数据表格拉取数据

转到`PickupBase.h`的public部分，声明一个新的void函数`InitializePickup()`。 你将使用此函数和数据表中的值初始化拾取物。

`   // Initializes this pickup with values from the data table.  void InitializePickup();         `

// Initializes this pickup with values from the data table. void InitializePickup();

复制完整片段(2行长度)

要从表中拉取数据，拾取物的蓝图需要两个属性：数据表资产和行名称（而你已将其设为与物品ID相同）。

转到protected小节，声明一个名为`PickupItemID`的`FName`属性。 为其添加`EditInstanceOnly`和`Category = "Pickup | Item Table"`说明符。 这将是此拾取物在关联数据表中的ID。

`   // The ID of this pickup in the associated data table.  UPROPERTY(EditInstanceOnly, Category = "Pickup | Item Table")  FName PickupItemID;         `

// The ID of this pickup in the associated data table. UPROPERTY(EditInstanceOnly, Category = "Pickup | Item Table") FName PickupItemID;

复制完整片段(3行长度)

拾取物不应具有默认物品ID，因此`EditInstanceOnly`说明符让你能够在世界中拾取物的实例里编辑此属性，但不能在原型（或类的默认值）中编辑。

在`Category`文本中，竖线（`|`）会创建一个嵌套子分段。 因此，在此例中，虚幻引擎会在资产的**细节（Details）**面板中创建一个名为**拾取物（Pickup）**的分段，并带有一个名为**物品表（Item Table）**的子分段。

接下来，为名为`PickupDataTable`的`UDataTable`声明一个`aTSoftObjectPtr`。 为其赋予与`PickupItemID`相同的说明符。 这将是拾取物获取其数据所用的数据表。

数据表可能不会在运行时加载，因此请在这里使用`TSoftObjectPtr`，以便异步加载数据表。

保存头文件，然后切换到`PickupBase.cpp`文件并实现`InitializePickup()`。

在函数内部，使用`if`语句检查提供的`PickupDataTable`是否有效，以及`PickupItemID`是否拥有值。

`   /**   *	Initializes the pickup with default values by retrieving them from the associated data table.  */  void APickupBase::InitializePickup()  {  	if (PickupDataTable && !PickupItemID.IsNone())  	{  	}  }         `

/\*\* \* Initializes the pickup with default values by retrieving them from the associated data table. \*/ void APickupBase::InitializePickup() { if (PickupDataTable && !PickupItemID.IsNone()) { } }

复制完整片段(9行长度)

在if语句中，添加代码以从数据表中检索该行的值。 声明一个名为`ItemDataRow`的常量`FItemData`指针，并将其设置为在你的`PickupDataTable`上调用`FindRow()`的结果。 将要查找的行的类型指定为`FItemData`。

`const FItemData* ItemDataRow = PickupDataTable->FindRow<FItemData>();`

const FItemData\* ItemDataRow = PickupDataTable->FindRow<FItemData>();

复制完整片段(1行长度)

`FindRow()`会使用两个参数：

-   你要查找的 `FName` 行的名称。 将 `PickupItemID` 作为行名称传入。
    
-   一个 `FString` 类型的上下文字符串。当未找到该行时，用它进行调试。 你可以使用 `Text("My context here.")` 来添加上下文字符串，或者使用`ToString()`将物品ID转换为上下文字符串。
    

`   if (PickupDataTable && !PickupItemID.IsNone())  {  	// Retrieve the item data associated with this pickup from the Data Table  	const FItemData* ItemDataRow = PickupDataTable->FindRow<FItemData>(PickupItemID, PickupItemID.ToString());  }         `

if (PickupDataTable && !PickupItemID.IsNone()) { // Retrieve the item data associated with this pickup from the Data Table const FItemData\* ItemDataRow = PickupDataTable->FindRow<FItemData>(PickupItemID, PickupItemID.ToString()); }

复制完整片段(5行长度)

### 创建引用物品

检索到拾取物的行数据后，请创建并初始化数据资产类型`ReferenceItem`来保存该信息。

只要将数据保存在这种引用物品中，虚幻引擎就可以在需要了解物品信息时轻松引用该数据，而无需执行更多的表格数据查找，而查找会导致降低效率。

在`PickupBase.h`中，声明一个指向名为`ReferenceItem`的`UItemDefinition`的`TObjectPtr`。 这就是存储拾取物数据的数据资产。 为其添加`VisibleAnywhere`和`Category = "Pickup | Reference Item"`说明符。

`   // Data asset associated with this item.  UPROPERTY(VisibleAnywhere, Category = "Pickup | Reference Item")  TObjectPtr<UItemDefinition> ReferenceItem;         `

// Data asset associated with this item. UPROPERTY(VisibleAnywhere, Category = "Pickup | Reference Item") TObjectPtr<UItemDefinition> ReferenceItem;

复制完整片段(3行长度)

`PickupBase.h`现在应该如下所示：

```
// Copyright Epic Games, Inc. All Rights Reserved.

#pragma once

#include "Components/SphereComponent.h"
#include "CoreMinimal.h"
#include "AdventureCharacter.h"
#include "GameFramework/Actor.h"
#include "PickupBase.generated.h"

```

展开代码复制完整片段(37行长度)

保存头文件，然后切换回`PickupBase.cpp`。

在`InitializePickup()`函数中，调用`FindRow()`之后，将`ReferenceItem`设置为`UItemDefinition`类型的`NewObject`。

在虚幻引擎中，`NewObject<T>()`是一个模板化的函数，用于在运行时动态创建派生于`UObject`的实例。 它会返回一个指向新对象的指针。 其常见语法如下：

`*T** Object = NewObject<*T*>(*Outer*, *Class*);`

其中*T*是你正在创建的`UObject`的类型，*`Outer`*是该对象的所有者，*`Class`*是你正在创建的对象的类。 `*Class*`参数通常是`T::StaticClass()`，会返回一个表示*T*的类类型的`UClass`指针。 不过，你通常可以省略这两个参数，因为虚幻引擎会假设当前类是*`Outer`*，并使用*T*来推断`UClass`。

传递 `this`作为外部类，传递UItemDefinition::StaticClass()作为类的类型，以创建一个基础UItemDefinition。

`ReferenceItem = NewObject<UItemDefinition>(this, UItemDefinition::StaticClass());`

ReferenceItem = NewObject<UItemDefinition>(this, UItemDefinition::StaticClass());

复制完整片段(1行长度)

要将拾取物的信息复制到`ReferenceItem`中，请将`ReferenceItem`中的每个字段设为`ItemDataRow`中相关字段的值。 对于`WorldMesh`，请从`ItemDataRow`所引用的`ItemBase`中拉取`WorldMesh`属性。

`   ReferenceItem = NewObject<UItemDefinition>(this, UItemDefinition::StaticClass());     ReferenceItem->ID = ItemDataRow->ID;  ReferenceItem->ItemType = ItemDataRow->ItemType;  ReferenceItem->ItemText = ItemDataRow->ItemText;  ReferenceItem->WorldMesh = ItemDataRow->ItemBase->WorldMesh;         `

ReferenceItem = NewObject<UItemDefinition>(this, UItemDefinition::StaticClass()); ReferenceItem->ID = ItemDataRow->ID; ReferenceItem->ItemType = ItemDataRow->ItemType; ReferenceItem->ItemText = ItemDataRow->ItemText; ReferenceItem->WorldMesh = ItemDataRow->ItemBase->WorldMesh;

复制完整片段(6行长度)

### 调用InitializePickup()

在`BeginPlay()`中，调用`InitializePickup()`，从而在游戏启动时初始化拾取物。

`   // Called when the game starts or when spawned  void APickupBase::BeginPlay()  {  	Super::BeginPlay();     	// Initialize this pickup with default values  	InitializePickup();  }         `

// Called when the game starts or when spawned void APickupBase::BeginPlay() { Super::BeginPlay(); // Initialize this pickup with default values InitializePickup(); }

复制完整片段(8行长度)

保存文件。 `PickupBase.cpp`现在应该如下所示：

```
// Copyright Epic Games, Inc. All Rights Reserved.

#include "PickupBase.h"

// Sets default values
APickupBase::APickupBase()
{
 	// Set this actor to call Tick() every frame.
	PrimaryActorTick.bCanEverTick = true;
}
```

展开代码复制完整片段(44行长度)

## 创建游戏内功能

你的拾取物已经拥有了所需的物品数据，但它仍需要知道如何在游戏世界中呈现和运作。 它需要一个供玩家查看的网格体，一个碰撞体积来决定玩家会在何时触碰它，还需要一些逻辑来让拾取物消失（就好像玩家拾取了它一样），并在一定时间后重新生成。

### 添加网格体组件

就像你在[添加第一人称摄像机、网格体和动画](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/adding-a-firstperson-camera-mesh-and-animation)中设置玩家角色时所做的那样，你需要使用`CreateDefaultSubobject`模板函数创建一个静态网格体对象，将其作为拾取物类的子组件，然后为该组件应用物品的网格体。 ….

转到`PickupBase.h`的`protected`小节，声明一个指向名为`PickupMeshComponent`的`UStaticMeshComponent`的`TObjectPtr`。 它将是在世界中代表该拾取物的网格体。

你将使用代码将数据资产的网格体分配给该属性，因此请为它添加`VisibleDefaultsOnly`和`Category = "Pickup | Mesh"`说明符，使其在虚幻编辑器中可见，但不可编辑。

`   protected:  	// Called when the game starts or when spawned  	virtual void BeginPlay() override;     	// The mesh component to represent this pickup in the world.  	UPROPERTY(VisibleDefaultsOnly, Category = "Pickup | Mesh")  	TObjectPtr<UStaticMeshComponent> PickupMeshComponent;         `

protected: // Called when the game starts or when spawned virtual void BeginPlay() override; // The mesh component to represent this pickup in the world. UPROPERTY(VisibleDefaultsOnly, Category = "Pickup | Mesh") TObjectPtr<UStaticMeshComponent> PickupMeshComponent;

复制完整片段(7行长度)

保存头文件，然后切换到`PickupBase.cpp`文件。

在`APickupBase`构造脚本中，将`PickupMeshComponent`指针设为调用类型为`UStaticMeshComponent`的`CreateDefaultSubobject()`函数的结果。 在`文本（Text）`参数中，将对象命名为`"PickupMesh"`。

为确保将网格体正确实例化，请检查`PickupMeshComponent`是否不为空。

`   // Sets default values  APickupBase::APickupBase()  {   	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.  	PrimaryActorTick.bCanEverTick = true;     	 // Create this pickup's mesh component  	PickupMeshComponent = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("PickupMesh"));  	check(PickupMeshComponent != nullptr);  }         `

// Sets default values APickupBase::APickupBase() { // Set this actor to call Tick() every frame. You can turn this off to improve performance if you don't need it. PrimaryActorTick.bCanEverTick = true; // Create this pickup's mesh component PickupMeshComponent = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("PickupMesh")); check(PickupMeshComponent != nullptr); }

复制完整片段(10行长度)

转到`InitializePickup()`的实现部分。

在为拾取物的网格体组件应用`WorldMesh`之前，由于你使用`TSoftObjectPtr`定义了该网格体，因此需要检查该网格体是否已被加载。

首先，声明一个名为`TempItemDefinition`的新`UItemDefinition`指针，并将其设置为调用`ItemDataRow->ItemBase.Get()`的结果。

`UItemDefinition* TempItemDefinition = ItemDataRow->ItemBase.Get();`

UItemDefinition\* TempItemDefinition = ItemDataRow->ItemBase.Get();

复制完整片段(1行长度)

然后，在一个`if`语句中，调用`WorldMesh.IsValid()`以检查当前是否已加载`WorldMesh`。

`   // Check if the mesh is currently loaded by calling IsValid().  if (TempItemDefinition->WorldMesh.IsValid()) {   }         `

// Check if the mesh is currently loaded by calling IsValid(). if (TempItemDefinition->WorldMesh.IsValid()) { }

复制完整片段(3行长度)

如果已加载，则调用`SetStaticMesh()`以设置`PickupMeshComponent`，从而使用`Get()`检索`WorldMesh`：

`   // Check if the mesh is currently loaded by calling IsValid().  if (TempItemDefinition->WorldMesh.IsValid()) {  // Set the pickup's mesh to the associated item's mesh  PickupMeshComponent->SetStaticMesh(TempItemDefinition->WorldMesh.Get());  }         `

// Check if the mesh is currently loaded by calling IsValid(). if (TempItemDefinition->WorldMesh.IsValid()) { // Set the pickup's mesh to the associated item's mesh PickupMeshComponent->SetStaticMesh(TempItemDefinition->WorldMesh.Get()); }

复制完整片段(5行长度)

如果未加载网格体，则对该网格体调用`LoadSynchronous()`以将其强制加载。 此函数会加载并返回一个指向该对象的资产指针。

在`if`语句之后的`else`语句中，声明一个名为`WorldMesh`的新`UStaticMesh`指针，并调用`WorldMesh.LoadSynchronous()`来设置它。

然后，使用`SetStaticMesh()` 设置`PickupMeshComponent`。

`   else {  	// If the mesh isn't loaded, load it by calling LoadSynchronous().  	UStaticMesh* WorldMesh = TempItemDefinition->WorldMesh.LoadSynchronous();  	PickupMeshComponent->SetStaticMesh(WorldMesh);  }         `

else { // If the mesh isn't loaded, load it by calling LoadSynchronous(). UStaticMesh\* WorldMesh = TempItemDefinition->WorldMesh.LoadSynchronous(); PickupMeshComponent->SetStaticMesh(WorldMesh); }

复制完整片段(5行长度)

在`else`语句之后，使用`SetVisiblity(true)` 将`PickupMeshComponent`设为可见：

`   // Set the mesh to visible.  PickupMeshComponent->SetVisibility(true);         `

// Set the mesh to visible. PickupMeshComponent->SetVisibility(true);

复制完整片段(2行长度)

保存`.cpp`文件。 `APickupBase()`现在应该如下所示：

`...`

...

复制完整片段(1行长度)

### 添加碰撞形态

添加球体组件以充当碰撞体积，然后为该组件启用碰撞查询。

转到`PickupBase.h`的`protected`小节，声明一个指向名为`SphereComponent`的`USphereComponent`的`TObjectPtr`。 这就是用于碰撞检测的球体组件。 为其添加`EditAnywhere`、`BlueprintReadOnly`和`Category = "Pickup | Components"`说明符。

`   // Sphere Component that defines the collision radius of this pickup for interaction purposes.  UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Pickup | Components")  TObjectPtr<USphereComponent> SphereComponent;         `

// Sphere Component that defines the collision radius of this pickup for interaction purposes. UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Pickup | Components") TObjectPtr<USphereComponent> SphereComponent;

复制完整片段(3行长度)

保存头文件，然后切换到`PickupBase.cpp`文件。

在`APickupBase`构造函数中，设置`PickupMeshComponent`之后，将`SphereComponent`设置为调用`CreateDefaultSubobject`的结果，并以`USphereComponent`作为类型，以`"SphereComponent"`作为名称。 在其后添加空值`check`。

`   // Create this pickup's sphere component  SphereComponent = CreateDefaultSubobject<USphereComponent>(TEXT("SphereComponent"));  check(SphereComponent != nullptr);         `

// Create this pickup's sphere component SphereComponent = CreateDefaultSubobject<USphereComponent>(TEXT("SphereComponent")); check(SphereComponent != nullptr);

复制完整片段(3行长度)

现在你拥有了两个组件，请使用`SetupAttachment()`将`PickupMeshComponent`附加到`SphereComponent`上：

`   // Attach the sphere component to the mesh component  SphereComponent->SetupAttachment(PickupMeshComponent);         `

// Attach the sphere component to the mesh component SphereComponent->SetupAttachment(PickupMeshComponent);

复制完整片段(2行长度)

将`SphereComponent`附加到`MeshComponent`上之后，使用`SetSphereRadius()`设置球体的大小。 这个值应该既能确保拾取物的碰撞体积大到可以发生碰撞，但又不能过大，以免你的角色意外撞到它。

`   // Set the sphere's collision radius  SphereComponent->SetSphereRadius(32.f);         `

// Set the sphere's collision radius SphereComponent->SetSphereRadius(32.f);

复制完整片段(2行长度)

转到`InitializePickup()`函数，在`SetVisibility(true)`这一行之后，调用`SetCollisionEnabled()`以使`SphereComponent`可发生碰撞。

此函数会使用一项枚举（`ECollisionEnabled`），该枚举会向引擎表明要使用的碰撞类型。 你需要让角色能够与拾取物发生碰撞并触发碰撞查询，但拾取物不应有因被撞击而弹开的物理效果，因此请传递`ECollisionEnabled::QueryOnly`选项。

`   // Set the mesh to visible and collidable.  PickupMeshComponent->SetVisibility(true);  SphereComponent->SetCollisionEnabled(ECollisionEnabled::QueryOnly);         `

// Set the mesh to visible and collidable. PickupMeshComponent->SetVisibility(true); SphereComponent->SetCollisionEnabled(ECollisionEnabled::QueryOnly);

复制完整片段(3行长度)

PickupBase.cpp现在应该如下所示：

```
// Copyright Epic Games, Inc. All Rights Reserved.

#include "PickupBase.h"
#include "ItemDefinition.h"

// Sets default values
APickupBase::APickupBase()
{
	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;
```

展开代码复制完整片段(79行长度)

### 模拟拾取碰撞

现在你的拾取物已经有了碰撞形态，请添加逻辑，以此检测拾取物和玩家之间的碰撞，并让拾取物在发生碰撞时消失。

#### 设置碰撞事件

转到PickupBase.h文件的protected小节，声明一个名为OnSphereBeginOverlap()的void函数。

所有继承自UPrimitiveComponent的组件（比如USphereComponent）都可以实现此函数，以便在该组件与其他Actor重叠时运行代码。 该函数会使用几个用不到的参数；而你只需传递以下内容即可：

-   UPrimitiveComponent\* OverlappedComponent：受到重叠的组件
    
-   AActor\* OtherActor：与组件重叠的Actor
    
-   UPrimitiveComponent\* OtherComp：受到重叠的Actor组件
    
-   int32 OtherBodyIndex：受重叠组件的索引
    
-   bool bFromSweep, const FHitResult& SweepResult：关于碰撞的信息，比如碰撞发生的位置和角度
    

`   // Code for when something overlaps the SphereComponent.   UFUNCTION()  void OnSphereBeginOverlap(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult);         `

// Code for when something overlaps the SphereComponent. UFUNCTION() void OnSphereBeginOverlap(UPrimitiveComponent\* OverlappedComponent, AActor\* OtherActor, UPrimitiveComponent\* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult);

复制完整片段(3行长度)

保存头文件，然后切换到PickupBase.cpp文件。

虚幻引擎会使用动态组播委托来实现碰撞事件。 在虚幻引擎中，这种委托系统让一个对象能够同时调用多个函数，这有点像向一个邮件列表广播消息，而这里的订阅者就是这些其他函数。 将函数绑定到委托就好比将它们订阅到邮件列表中。 "委托"就是我们的事件；在本例中就是玩家和拾取物之间的碰撞。 当事件发生时，虚幻引擎会调用所有绑定到该事件的函数。

注意：虚幻引擎包含了其他数个绑定函数，但你应该使用AddDynamic()，因为你的委托（OnComponentBeginOverlap）是一个动态委托。 而且你是在绑定UObject类中的一个UFUNCTION，而这需要使用AddDynamic()来提供反射支持。 如需详细了解动态组播委托，请参阅[组播委托](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/multicast-delegates-in-unreal-engine)。

在InitializePickup()函数中，使用AddDynamic宏将OnSphereBeginOverlap()绑定到球体组件的OnComponentBeginOverlap事件上。

`   // Register the Overlap Event  SphereComponent->OnComponentBeginOverlap.AddDynamic(this, &APickupBase::OnSphereBeginOverlap);         `

// Register the Overlap Event SphereComponent->OnComponentBeginOverlap.AddDynamic(this, &APickupBase::OnSphereBeginOverlap);

复制完整片段(2行长度)

保存你的工作。 现在，当角色与拾取物的球体组件碰撞时，OnSphereBeginOverlap()函数就会运行。

#### 在碰撞后隐藏拾取物

在PickupBase.cpp文件中，实现OnSphereBeginOverlap()函数以让拾取物消失，这样看起来就像是玩家拾取了它。

首先添加一条调试消息，以指示该函数被触发。

`   void APickupBase::OnSphereBeginOverlap(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult)  {  	GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Yellow, TEXT("Attempting a pickup collision"));  }         `

void APickupBase::OnSphereBeginOverlap(UPrimitiveComponent\* OverlappedComponent, AActor\* OtherActor, UPrimitiveComponent\* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult) { GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Yellow, TEXT("Attempting a pickup collision")); }

复制完整片段(4行长度)

由于此函数会在其他Actor与拾取物碰撞时运行，因此你需要确保是你的第一人称角色在进行碰撞。

声明一个名为Character的新AAdventureCharacter指针，并将OtherActor转换为你的角色类的名称（本教程使用`AAdventureCharacter`），从而为其设置。

`   // Checking if it's an AdventureCharacter overlapping  AAdventureCharacter* Character = Cast<AAdventureCharacter>(OtherActor);         `

// Checking if it's an AdventureCharacter overlapping AAdventureCharacter\* Character = Cast<AAdventureCharacter>(OtherActor);

复制完整片段(2行长度)

在if语句中，检查Character是否不为空。 空则表示类型转换失败，且OtherActor不是某种AAdventureCharacter的类型。

在if语句内部，调用RemoveAll()即可从该函数中注销OnComponentBeginOverlap，以免将其反复触发。 这将结束碰撞。

`   if (Character != nullptr)  {  	// Unregister from the Overlap Event so it is no longer triggered  	SphereComponent->OnComponentBeginOverlap.RemoveAll(this);  }         `

if (Character != nullptr) { // Unregister from the Overlap Event so it is no longer triggered SphereComponent->OnComponentBeginOverlap.RemoveAll(this); }

复制完整片段(5行长度)

然后，使用SetVisibility(false)将PickupMeshComponent设为不可见，并使用SetCollisionEnabled()传入NoCollision选项，从而使拾取物网格体和球体组件都变为不可碰撞。

`   if (Character != nullptr)  {  	// Unregister from the Overlap Event so it is no longer triggered  	SphereComponent->OnComponentBeginOverlap.RemoveAll(this);     	// Set this pickup to be invisible and disable collision  	PickupMeshComponent->SetVisibility(false);  	PickupMeshComponent->SetCollisionEnabled(ECollisionEnabled::NoCollision);  	SphereComponent->SetCollisionEnabled(ECollisionEnabled::NoCollision);  }         `

if (Character != nullptr) { // Unregister from the Overlap Event so it is no longer triggered SphereComponent->OnComponentBeginOverlap.RemoveAll(this); // Set this pickup to be invisible and disable collision PickupMeshComponent->SetVisibility(false); PickupMeshComponent->SetCollisionEnabled(ECollisionEnabled::NoCollision); SphereComponent->SetCollisionEnabled(ECollisionEnabled::NoCollision); }

复制完整片段(10行长度)

保存PickupBase.cpp文件。

### 重新生成拾取物

现在角色已经不再与拾取物发生交互，你需要让它在一段时间后重新生成。

转到PickupBase.h文件的protected小节，声明一个名为bShouldRespawn的布尔。 你可以使用它来开启或关闭重新生成功能。

声明一个初始值为4.0f的浮点型变量RespawnTime。 这即是拾取物重新生成前需要等待的时间。

为这两个属性添加EditAnywhere、BlueprintReadOnly和Category = "Pickup | Respawn"说明符。

`   // Whether this pickup should respawn after being picked up.  UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Pickup | Respawn")  bool bShouldRespawn;     // The time in seconds to wait before respawning this pickup.  UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Pickup | Respawn")  float RespawnTime = 4.0f;         `

// Whether this pickup should respawn after being picked up. UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Pickup | Respawn") bool bShouldRespawn; // The time in seconds to wait before respawning this pickup. UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Pickup | Respawn") float RespawnTime = 4.0f;

复制完整片段(7行长度)

声明一个名为RespawnTimerHandle的FTimerHandle。

`   // Timer handle to distinguish the respawn timer.  FTimerHandle RespawnTimerHandle;         `

// Timer handle to distinguish the respawn timer. FTimerHandle RespawnTimerHandle;

复制完整片段(2行长度)

在虚幻引擎中，Gameplay定时器由FTimerManager处理。 该类包含SetTimer()函数，而该函数会在设定的延迟后调用一个函数或委托。 FTimerManager的函数会使用FTimerHandle来启动、暂停、恢复函数，或使函数无限循环。 你需要使用RespawnTimerHandle来指示何时重新生成拾取物。 如需详细了解定时器管理器，请参阅[Gameplay定时器](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/gameplay-timers-in-unreal-engine)。

保存头文件，然后切换到PickupBase.cpp文件。 要实现拾取物的重新生成，请使用定时器管理器设置一个定时器，让后者在短暂等待后调用InitializePickup()。

你需要仅在启用重新生成功能时才重新生成拾取物；因此，请在 OnSphereBeginOverlap的底部添加一个if语句，检查bShouldRespawn是否为true。

`   if (bShouldRespawn)  {     }         `

if (bShouldRespawn) { }

复制完整片段(4行长度)

在if语句中，使用GetWorldTimerManager()获取定时器管理器，并对定时器管理器调用SetTimer()。 此函数的语法如下：

`SetTimer(*InOutHandle*, *Object*, *InFuncName*, *InRate*, *bLoop*, *InFirstDelay*);`

其中：

-   InOutHandle是控制定时器的FTimerHandle（即你的RespawnTimerHandle）。
    
-   Object是你正在调用的函数所属的UObject。 使用this。
    
-   InFuncName是指向你要调用的函数的指针（在本例中是InitializePickup()）。
    
-   InRate是一个浮点值，指定在调用你的函数之前要等待的时间（以秒为单位）。
    
-   bLoop使定时器每Time秒重复一次（true）或仅触发一次（false）。
    
-   InFirstDelay（可选）是循环定时器中第一次函数调用之前的初始延迟时间。 如果未指定，虚幻引擎将使用InRate作为延迟时间。
    

你只需要调用一次InitializePickup()即可替换拾取物，因此请将bLoop设置为false。

设置你想要的重新生成时间；本教程会让拾取物在四秒后重新生成，且没有初始延迟。

`   // If the pickup should respawn, wait an fRespawnTime amount of seconds before calling InitializePickup() to respawn it  if (bShouldRespawn)  {  	GetWorldTimerManager().SetTimer(RespawnTimerHandle, this, &APickupBase::InitializePickup, 4.0f, false, 0);  }         `

// If the pickup should respawn, wait an fRespawnTime amount of seconds before calling InitializePickup() to respawn it if (bShouldRespawn) { GetWorldTimerManager().SetTimer(RespawnTimerHandle, this, &APickupBase::InitializePickup, 4.0f, false, 0); }

复制完整片段(5行长度)

完整的OnSphereBeginOverlap()函数应如下所示：

```
/** 
*	Broadcasts an event when a character overlaps this pickup's SphereComponent. Sets the pickup to invisible and uninteractable, and respawns it after a set time.
*	@param OverlappedComponent - the component that was overlapped.
*	@param OtherActor - the Actor overlapping this component.
*	@param OtherComp - the Actor's component that overlapped this component.
*	@param OtherBodyIndex - the index of the overlapped component.
*	@param bFromSweep - whether the overlap was generated from a sweep.
*	@param SweepResult - contains info about the overlap such as surface normals and faces.
*/
void APickupBase::OnSphereBeginOverlap(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult)
```

展开代码复制完整片段(35行长度)

保存你的代码并在Visual Studio中编译。 你可能需要重新启动虚幻引擎，才能让新建的文件在编辑器中显示。

## 在关卡中实现拾取物

你已经定义了构成拾取物的代码，现在该在游戏中测试一下了！

要将拾取物品添加到你的关卡中，请执行以下步骤：

1.  打开虚幻编辑器，转到内容浏览器的资产树，转到Content > FirstPerson > Blueprints。
    
2.  在Blueprints文件夹中，新建一个名为Pickups的子文件夹，用它存储你的拾取物类。
    
3.  在资产树中，转到你的C++ Classes文件夹。 右键点击PickupBase类，从该类创建一个蓝图。
    
4.  将其命名为BP\_PickupBase。
    
5.  至于路径，请选择Content/FirstPerson/Blueprints/Pickups并点击创建拾取物基类（Create Pickup Base Class）。
    
6.  返回Blueprints > Pickups文件夹。 将BP\_PickupBase蓝图拖入关卡中。 它会在大纲视图（Outliner）面板中被自动选中。 不过，它目前还缺少网格体。
    
7.  在选中BP\_PickupBase Actor的状态下，转到细节面板并设置以下属性：
    
    1.  将拾取物ID（Pickup Item ID）设为pickup\_001
        
    2.  将拾取物数据表（Pickup Data Table）设为DT\_PickupData
        
    3.  将是否重复生成（Should Respawn）设为true
        

当你按下运行（Play）来测试游戏时，你的拾取物品应该使用拾取物ID（Pickup Item ID）来查询数据表，并检索与pickup\_001关联的数据。 这也会为它提供你之前定义的DA\_Pickup\_001数据资产。 它会使用来自于数据表和数据资产的数据来初始化一个引用物品并加载其静态网格体。

当你经过该拾取物时，你应该会看到它消失，然后在4秒后重新出现。

如果你将拾取物ID（Pickup Item ID）设为不同的值，那么你的拾取物将改为从数据表中的对应行检索数据。

要尝试切换拾取物ID（Pickup Item ID），请执行以下步骤：

1.  创建一份名为DA\_Pickup\_002的新数据资产。 为该资产设置以下值：
    
    -   ID：pickup\_002
        
    -   物品类型（Item Type）：消耗品（Consumable）
        
    -   名称（Name）：Test Name 2
        
    -   说明（Description）：Test Description 2
        
    -   世界网格体（World Mesh）：SM\_ChamferCube
        
2.  在DT\_PickupData表中新增一行，并填充该行字段，以引用该资产。
    
3.  在BP\_PickupBase Actor中，将拾取物ID（Pickup Item ID）更改为pickup\_002。
    

当你按下运行（Play）来测试游戏时，该拾取物品应该会按照DA\_Pickup\_002中的数值生成！

## 在编辑器中更新拾取物Actor

现在，你的拾取物已经在游戏中生效了，但由于缺少默认网格体，你还是难以在编辑器中看到它们。

要解决此问题，请使用PostEditChangeProperty()函数。 这是一个编辑器内函数。虚幻引擎会在编辑器更改某个属性时调用该函数，因此，你可以使用该函数来确保视口中的Actor随着属性的变更而保持最新状态。 例如，当你更改玩家的默认生命值时更新UI元素，或者当你使球体靠近或远离原点时，对球体进行缩放。

在此项目中，当拾取物ID（Pickup Item ID ）更改时，你都要使用该函数设置拾取物的静态网格体。 这样一来，你就可以更改拾取物的类型，并在视口中立即看到其更新，而无需点击运行（Play）！

要让拾取物的更改在编辑器中立即显示，请执行以下步骤：

1.  在Visual Studio中打开PickupBase.h文件，转到protected小节，声明一个#if WITH\_EDITOR宏。 这个宏会向虚幻头文件分析工具表明，它所含的任何内容都只应针对编辑器构建打包，而不应针对游戏的发布版本进行编译。 使用#endif语句结束这个宏。
    
    `   #if WITH_EDITOR     #endif         `
    
    #if WITH\_EDITOR #endif
    
    复制完整片段(3行长度)
    
2.  在宏内部，为PostEditChangeProperty()函数声明一个虚拟void函数重载项。 该函数会使用一个对FPropertyChangedEvent的引用，其中包含了被更改的属性和更改类型等信息。 保存头文件。
    
    `   #if WITH_EDITOR  	  // Runs whenever a property on this object is changed in the editor  	virtual void PostEditChangeProperty(FPropertyChangedEvent& PropertyChangedEvent) override;     #endif         `
    
    #if WITH\_EDITOR // Runs whenever a property on this object is changed in the editor virtual void PostEditChangeProperty(FPropertyChangedEvent&amp; PropertyChangedEvent) override; #endif
    
    复制完整片段(6行长度)
    
3.  在PickupBase.cpp文件中，实现PostEditChangeProperty()函数。 首先请调用Super::PostEditChangeProperty()函数，用其处理所有父类属性的更改。
    
    `   /**  *	Updates this pickup whenever a property is changed.  *	@param PropertyChangedEvent - contains info about the property that was changed.  */  void APickupBase::PostEditChangeProperty(FPropertyChangedEvent& PropertyChangedEvent)  {  	// Handle parent class property changes  	Super::PostEditChangeProperty(PropertyChangedEvent);  }         `
    
    /\*\* \* Updates this pickup whenever a property is changed. \* @param PropertyChangedEvent - contains info about the property that was changed. \*/ void APickupBase::PostEditChangeProperty(FPropertyChangedEvent&amp; PropertyChangedEvent) { // Handle parent class property changes Super::PostEditChangeProperty(PropertyChangedEvent); }
    
    复制完整片段(9行长度)
    
4.  新建一个名为ChangedProperty的常量FName变量，用其存储被更改属性的名称。
    
    `   // Handle parent class property changes  Super::PostEditChangeProperty(PropertyChangedEvent);     const FName ChangedPropertyName;         `
    
    // Handle parent class property changes Super::PostEditChangeProperty(PropertyChangedEvent); const FName ChangedPropertyName;
    
    复制完整片段(4行长度)
    
5.  要验证PropertyChangedEvent是否包含了Property并保存该属性，请以PropertyChangedEvent.Property为条件使用三元运算符。 如果条件为true，则将ChangedPropertyName设为PropertyChangedEvent.Property->GetFName()；如果为false，则将其设置为NAME\_None。
    
    `   // Handle parent class property changes  Super::PostEditChangeProperty(PropertyChangedEvent);     // If a property was changed, get the name of the changed property. Otherwise use none.  const FName ChangedPropertyName = PropertyChangedEvent.Property ? PropertyChangedEvent.Property->GetFName() : NAME_None;         `
    
    // Handle parent class property changes Super::PostEditChangeProperty(PropertyChangedEvent); // If a property was changed, get the name of the changed property. Otherwise use none. const FName ChangedPropertyName = PropertyChangedEvent.Property ? PropertyChangedEvent.Property-&gt;GetFName() : NAME\_None;
    
    复制完整片段(5行长度)
    
    `NAME_None`是一种类型为`FName`的全局虚幻引擎常量，意味着"无有效名称"或"空名称"。
    
6.  现在你已经知道了属性的名称，可以让虚幻引擎在检测到ID变更时更新网格体了。
    
    在一个if语句中，检查ChangePropertyName是否等于调用GET\_MEMBER\_NAME\_CHECKED()的结果，同时传入此APickupBase类和PickupItemID。 这个宏会进行编译时检查，以确保你传入的属性在传入的类中存在。
    
    你还需要根据数据表检索值，因此请在输入if语句前检查该表是否有效。
    
    `   // Verify that the changed property exists in this class and that the PickupDataTable is valid.  if (ChangedPropertyName == GET_MEMBER_NAME_CHECKED(APickupBase, PickupItemID) && PickupDataTable)  {  }         `
    
    // Verify that the changed property exists in this class and that the PickupDataTable is valid. if (ChangedPropertyName == GET\_MEMBER\_NAME\_CHECKED(APickupBase, PickupItemID) &amp;&amp; PickupDataTable) { }
    
    复制完整片段(4行长度)
    
7.  在if语句内部，请调用FindRow函数，像调用InitializePickup()那样检索与此拾取物关联的数据行。 这次，为了确保在继续操作之前PickupItemID存在于表中，请将FindRow行放在嵌套的if语句中。
    
    `   // Verify that the changed property exists in this class and that the PickupDataTable is valid.  if (ChangedPropertyName == GET_MEMBER_NAME_CHECKED(APickupBase, PickupItemID) && PickupDataTable)  {  	// Retrieve the associated ItemData for this pickup.  if (const FItemData* ItemDataRow = PickupDataTable->FindRow<FItemData>(PickupItemID, PickupItemID.ToString()))  	{  }  }         `
    
    // Verify that the changed property exists in this class and that the PickupDataTable is valid. if (ChangedPropertyName == GET\_MEMBER\_NAME\_CHECKED(APickupBase, PickupItemID) &amp;&amp; PickupDataTable) { // Retrieve the associated ItemData for this pickup. if (const FItemData\* ItemDataRow = PickupDataTable-&gt;FindRow&lt;FItemData&gt;(PickupItemID, PickupItemID.ToString())) { } }
    
    复制完整片段(8行长度)
    
8.  如果虚幻引擎成功找到该行数据，请创建一个TempItemDefinition变量来存储来自于ItemDataRow的数据资产（其中包含了新网格体）。
    
    `UItemDefinition* TempItemDefinition = ItemDataRow->ItemBase;`
    
    UItemDefinition\* TempItemDefinition = ItemDataRow-&gt;ItemBase;
    
    复制完整片段(1行长度)
    
9.  要更新网格体，请对PickupMeshComponent使用SetStaticMesh函数，并传入临时数据资产的WorldMesh。
    
10.  使用SetSphereRadius(32.f)设置球体组件的碰撞半径。
    
    ```
    // Retrieve the associated ItemData for this pickup.
    if (const FItemData* ItemDataRow = PickupDataTable->FindRow<FItemData>(PickupItemID, PickupItemID.ToString()))
    {
    	UItemDefinition* TempItemDefinition = ItemDataRow->ItemBase;
    
    	// Set the pickup's mesh to the associated item's mesh
    	PickupMeshComponent->SetStaticMesh(TempItemDefinition->WorldMesh.Get());
    
    	// Set the sphere's collision radius
    	SphereComponent->SetSphereRadius(32.f);
    ```
    
    展开代码复制完整片段(11行长度)
    
11.  保存你的代码并在Visual Studio中编译。
    

完整的PostEditChangeProperty()函数应如下所示：

```
/**
*	Updates this pickup whenever a property is changed.
*	@param PropertyChangedEvent - contains info about the property that was changed.
*/
void APickupBase::PostEditChangeProperty(FPropertyChangedEvent& PropertyChangedEvent)
{
	// Handle parent class property changes
	Super::PostEditChangeProperty(PropertyChangedEvent);

	// If a property was changed, get the name of the changed property. Otherwise use none.
```

展开代码复制完整片段(28行长度)

回到编辑器中，转到大纲视图，确保已选中BP\_PickupBase Actor。 将拾取物ID（Pickup Item ID）从pickup\_001更改为pickup\_002，然后再改回来。 当你更改ID时，视口中的拾取物网格体应该会随之更新。

\[更改网格体的视频/GIF\]

## 下一步

接下来，你需要进一步扩展拾取物类，创建一个自定义小道具并将其装备到角色身上！

[

![Equip Your Character](https://dev.epicgames.com/community/api/documentation/image/d7ce94e9-285d-4876-b873-3c7728f842fa?resizing_type=fit&width=640&height=640)

Equip Your Character

Learn to use C++ to create custom equippable items and attach them to your character.





](https://dev.epicgames.com/documentation/en-us/unreal-engine/equip-your-character-with-cplusplus-tools)

## 完整代码

`...`

...

复制完整片段(1行长度)

`...`

...

复制完整片段(1行长度)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [开始之前](/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine#%E5%BC%80%E5%A7%8B%E4%B9%8B%E5%89%8D)
-   [创建新拾取物类](/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%96%B0%E6%8B%BE%E5%8F%96%E7%89%A9%E7%B1%BB)
-   [使用表格数据初始化拾取物](/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%A1%A8%E6%A0%BC%E6%95%B0%E6%8D%AE%E5%88%9D%E5%A7%8B%E5%8C%96%E6%8B%BE%E5%8F%96%E7%89%A9)
-   [从数据表格拉取数据](/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine#%E4%BB%8E%E6%95%B0%E6%8D%AE%E8%A1%A8%E6%A0%BC%E6%8B%89%E5%8F%96%E6%95%B0%E6%8D%AE)
-   [创建引用物品](/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%BC%95%E7%94%A8%E7%89%A9%E5%93%81)
-   [调用InitializePickup()](/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine#%E8%B0%83%E7%94%A8initializepickup\(\))
-   [创建游戏内功能](/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%B8%B8%E6%88%8F%E5%86%85%E5%8A%9F%E8%83%BD)
-   [添加网格体组件](/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%84%E4%BB%B6)
-   [添加碰撞形态](/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E7%A2%B0%E6%92%9E%E5%BD%A2%E6%80%81)
-   [模拟拾取碰撞](/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine#%E6%A8%A1%E6%8B%9F%E6%8B%BE%E5%8F%96%E7%A2%B0%E6%92%9E)
-   [设置碰撞事件](/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E7%A2%B0%E6%92%9E%E4%BA%8B%E4%BB%B6)
-   [在碰撞后隐藏拾取物](/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine#%E5%9C%A8%E7%A2%B0%E6%92%9E%E5%90%8E%E9%9A%90%E8%97%8F%E6%8B%BE%E5%8F%96%E7%89%A9)
-   [重新生成拾取物](/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine#%E9%87%8D%E6%96%B0%E7%94%9F%E6%88%90%E6%8B%BE%E5%8F%96%E7%89%A9)
-   [在关卡中实现拾取物](/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine#%E5%9C%A8%E5%85%B3%E5%8D%A1%E4%B8%AD%E5%AE%9E%E7%8E%B0%E6%8B%BE%E5%8F%96%E7%89%A9)
-   [在编辑器中更新拾取物Actor](/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E6%9B%B4%E6%96%B0%E6%8B%BE%E5%8F%96%E7%89%A9actor)
-   [下一步](/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine#%E4%B8%8B%E4%B8%80%E6%AD%A5)
-   [完整代码](/documentation/zh-cn/unreal-engine/create-a-respawning-pickup-item-in-unreal-engine#%E5%AE%8C%E6%95%B4%E4%BB%A3%E7%A0%81)
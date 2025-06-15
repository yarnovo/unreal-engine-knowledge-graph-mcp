# 为Unity开发者准备的在虚幻引擎中创建Gameplay指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers
> 
> 生成时间: 2025-06-14T18:51:37.909Z

---

目录

![在虚幻引擎中创建Gameplay](https://dev.epicgames.com/community/api/documentation/image/d6eb5f31-54fd-4268-b915-b7d1e2c2a6b2?resizing_type=fill&width=1920&height=335)

本页面为Unity用户解释了一些虚幻引擎（UE）Gameplay编程概念。下面的说明假定你熟悉Unity C#并希望学习UE C++和蓝图。

下方的示例包含了一些Unity C#中常见的Gameplay编程用例，并介绍了如何在UE中实现同样的功能。

## 实例化GameObject/生成Actor

在Unity中，你会使用 `Instantiate` 函数创建对象的新实例。此函数可以获取任意 `UnityEngine.Object` 类型（GameObject、MonoBehaviour等），并创建其副本。

```cpp
public GameObject EnemyPrefab;
public Vector3 SpawnPosition;
public Quaternion SpawnRotation;

void Start()
{
	GameObject NewGO = (GameObject)Instantiate(EnemyPrefab, SpawnPosition, SpawnRotation);
	NewGO.name = "MyNewGameObject";
}
```

UE有两个不同的函数来实例化对象：

-   `NewObject` 用于创建新的 `UObject` 类型。
-   `SpawnActor` 用于生成 `AActor` 类型。

### UObject和NewObject

在UE中创建 `UObject` 的子类与在Unity中创建 `ScriptableObject` 的子类非常类似。对于不需要生成到世界中或像Actor那样绑定了组件的Gameplay类，这些很有用。

在Unity中，如果你创建一个 `ScriptableObject` 的子类，你可以如下所示将其实例化：

```cpp
MyScriptableObject NewSO = ScriptableObject.CreateInstance<MyScriptableObject>();
```

在UE中，如果你创建一个 `UObject` 的子类，你可以如下所示将其实例化：

```cpp
UMyObject* NewObj = NewObject<UMyObject>();
```

### AActor和SpawnActor

你可以用World（C++中的 `UWorld`）对象上的 `SpawnActor` 方法生成Actor。一些UObject和所有Actor都提供了 `GetWorld` 方法（例如，所有Actor都如此）来获取World对象。

在下面的示例中，我们对一个线程Actor的生成参数使用了这些方法，以模仿Unity的 `Instantiate` 方法。

#### 示例

下面是一个AActor子类的示例，`AMyActor`。默认构造函数初始化了 `int32` 和 `USphereComponent*`。

请注意 `CreateDefaultSubobject` 的使用。此函数创建组件并为其分配默认属性。使用此函数创建的子对象将充当默认模板，以便你在子类或蓝图中进行修改。

```cpp
UCLASS()
class AMyActor : public AActor
{
	GENERATED_BODY()

	UPROPERTY()
	int32 MyIntProp;

	UPROPERTY()
	USphereComponent* MyCollisionComp;

	AMyActor()
	{
		MyIntProp = 42;

		MyCollisionComp = CreateDefaultSubobject<USphereComponent>(FName(TEXT("CollisionComponent"));
		MyCollisionComp->RelativeLocation = FVector::ZeroVector;
		MyCollisionComp->SphereRadius = 20.0f;
	}
};
```

这创建了一个 `AMyActor` 的克隆体，包括所有成员变量、UPROPERTY和组件。

```cpp
AMyActor* CreateCloneOfMyActor(AMyActor* ExistingActor, FVector SpawnLocation, FRotator SpawnRotation)
{
	UWorld* World = ExistingActor->GetWorld();
	FActorSpawnParameters SpawnParams;
	SpawnParams.Template = ExistingActor;
	World->SpawnActor<AMyActor>(ExistingActor->GetClass(), SpawnLocation, SpawnRotation, SpawnParams);
}
```

## 类型转换

在此例中，我们获取了一个已知的组件，将其转换为特定类型，然后判断能否执行一些操作。

#### Unity

```cpp
Collider collider = gameObject.GetComponent<Collider>;
SphereCollider sphereCollider = collider as SphereCollider;
if (sphereCollider != null)
{
		// ...
}
```

#### UE C++

```cpp
UPrimitiveComponent* Primitive = MyActor->GetComponentByClass(UPrimitiveComponent::StaticClass());
USphereComponent* SphereCollider = Cast<USphereComponent>(Primitive);
if (SphereCollider != nullptr)
{
		// ...
}
```

#### 蓝图

你可以使用 **Cast to** 在蓝图中完成类型转换。更多详情请参阅[类型转换快速入门指南](/documentation/zh-cn/unreal-engine/casting-quick-start-guide-in-unreal-engine)。

## 销毁GameObject/Actor

**Unity C#**

```cpp
Destroy(MyGameObject);
```

**UE C++**

```cpp
MyActor->Destroy();
```

**蓝图** ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/457d73d5-5cde-40c1-b618-5ff660f9b1df/image_23.png)

## 销毁GameObject/Actor（延迟1秒）

**Unity C#**

```cpp
Destroy(MyGameObject, 1);
```

**UE C++**

```cpp
MyActor->SetLifeSpan(1);
```

**蓝图** ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6fd3b31d-31e6-4fd2-a09b-e1ef53aba24a/image_24.png)

## 禁用GameObject/Actor

**Unity C#**

```cpp
MyGameObject.SetActive(false);
```

**UE C++**

```cpp
// 隐藏可见组件
MyActor->SetActorHiddenInGame(true);

// 禁用碰撞组件
MyActor->SetActorEnableCollision(false);

// 禁止Actor更新
MyActor->SetActorTickEnabled(false);
```

**蓝图** ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83603f34-2871-4108-a4d3-e4c362d56b46/image_25.png)

## 从组件访问GameObject/Actor

**Unity C#**

```cpp
GameObject ParentGO =
MyComponent.gameObject;
```

**UE C++**

```cpp
AActor* ParentActor =
MyComponent->GetOwner();
```

**蓝图** ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c59b8ee5-68d0-48cf-aedc-da3e5fa86143/image_32.png)

## 从GameObject/Actor访问组件

#### Unity

```cpp
MyComponent MyComp = gameObject.GetComponent<MyComponent>();
```

#### UE C++

```cpp
UMyComponent* MyComp = MyActor->FindComponentByClass<UMyComponent>();
```

#### 蓝图

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4dbf46a7-3730-42b6-beb4-722a07450b5a/image_33.png)

## 查找GameObject/Actor

#### Unity

```cpp
// 按名称查找GameObject
GameObject MyGO = GameObject.Find("MyNamedGameObject");

// 按类型查找Object
MyComponent[] Components = Object.FindObjectsOfType(typeof(MyComponent)) as MyComponent[];
foreach (MyComponent Component in Components)
{
		// ...
}

// 按标签查找GameObject
GameObject[] GameObjects = GameObject.FindGameObjectsWithTag("MyTag");
foreach (GameObject GO in GameObjects)
{
		// ...
}
```

#### UE C++

```cpp
// 按类型查找UObjects
for (TObjectIterator<UMyObject> It; It; ++it)
{
	UMyObject* MyObject = *It;
	// ...
}

// 按名称查找Actor（也适用于UObject）
AActor* MyActor = FindObject<AActor>(nullptr, TEXT("MyNamedActor"));

// 按类型查找Actor（需要UWorld对象）
for (TActorIterator<AMyActor> It(GetWorld()); It; ++It)
{
		AMyActor* MyActor = *It;
		// ...
}

// 按标签查找Actor（也适用于ActorComponent，需要改用TObjectIterator）
for (TActorIterator<AActor> It(GetWorld()); It; ++It)
{
	AActor* Actor = *It;
	if (Actor->ActorHasTag(FName(TEXT("Mytag"))))
	{
		// ...
	}
}
```

#### 蓝图

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0a9a0c3-f610-4214-a87c-bfdc9a2fe082/image_14.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4131ca39-74a9-4af2-8bea-98a98d3a4aa7/image_15.png)

## 向GameObject/Actor添加标签

#### Unity

```cpp
MyGameObject.tag = "MyTag";
```

#### UE C++

```cpp
// Actor可以有多个标签
MyActor.Tags.AddUnique(TEXT("MyTag"));
```

#### 蓝图

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b683cb2-2f29-4c74-9577-cdba14ea1e67/image_16.png)

## 向MonoBehaviour/ActorComponent添加标签

#### Unity

```cpp
// 这会更改它绑定到的GameObject上的标签
MyComponent.tag = "MyTag";
```

#### UE C++

```cpp
// 组件有自己的标签数组
MyComponent.ComponentTags.AddUnique(TEXT("MyTag"));
```

## 比较GameObject/Actor和MonoBehaviour/ActorComponent上的标签

#### Unity

```cpp
if (MyGameObject.CompareTag("MyTag"))
{
	// ...
}

// 检查它绑定到的GameObject上的标签
if (MyComponent.CompareTag("MyTag"))
{
	// ...
}
```

#### UE C++

```cpp
// 检查某个Actor是否有此标签
if (MyActor->ActorHasTag(FName(TEXT("MyTag"))))
{
	// ...
}
```

#### 蓝图

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e8bb3b0-4b50-471c-a641-2ce90e6a85af/image_17.png)

#### UE C++

```cpp
// 检查某个ActorComponent是否有此标签
if (MyComponent->ComponentHasTag(FName(TEXT("MyTag"))))
{
	// ...
}
```

#### 蓝图

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bee5312-5e1e-4d6d-9fca-d7fe4f895ec8/image_18.png)

## 物理：刚体与图元组件

在Unity中，假如要为GameObject赋予物理特征，必须为其附加刚体组件。

在UE中，任何图元组件（C++中的 `UPrimitiveComponent`）都可以表示物理对象。一些常见图元组件如下：

-   形状组件（`USphereComponent`、`UCapsuleComponent`，等等）
-   静态网格体组件
-   骨骼网格体组件

Unity将碰撞和可视性划分到不同的组件中，UE则将"潜在的物理碰撞"和"潜在的可视效果"组合到了单个图元组件中。凡是在世界中具有几何体的组件，只要能被渲染或通过物理方式交互，都是 `UPrimitiveComponent` 的子类。

UE中的碰撞通道对应Unity中的层。如需详细信息，请参阅[碰撞过滤](https://www.unrealengine.com/zh-CN/blog/collision-filtering)。

### RayCast与RayTrace

#### Unity

```cpp
GameObject FindGOCameraIsLookingAt()
{
	Vector3 Start = Camera.main.transform.position;
	Vector3 Direction = Camera.main.transform.forward;
	float Distance = 100.0f;
	int LayerBitMask = 1 << LayerMask.NameToLayer("Pawn");

	RaycastHit Hit;
	bool bHit = Physics.Raycast(Start, Direction, out Hit, Distance, LayerBitMask);

	if (bHit)
	{
		return Hit.collider.gameObject;
	}

	return null;
}
```

#### UE C++

```cpp
APawn* AMyPlayerController::FindPawnCameraIsLookingAt()
{
	// 你可以在这里自定义有关追踪的各种属性
	FCollisionQueryParams Params;
	// 忽略玩家的Pawn
	Params.AddIgnoredActor(GetPawn());

	// 击中结果由线路追踪填充
	FHitResult Hit;

	// 来自摄像机的光线投射，仅与Pawn碰撞（它们在ECC_Pawn碰撞通道上）
	FVector Start = PlayerCameraManager->GetCameraLocation();
	FVector End = Start + (PlayerCameraManager->GetCameraRotation().Vector() * 1000.0f);
	bool bHit = GetWorld()->LineTraceSingle(Hit, Start, End, ECC_Pawn, Params);

	if (bHit)
	{
		// Hit.Actor包含指向追踪所击中的Actor的弱指针
		return Cast<APawn>(Hit.Actor.Get());
	}

	return nullptr;
}
```

#### 蓝图

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/034ad5b1-578c-4fd3-9c00-27f3a8e9555b/image_19.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/034ad5b1-578c-4fd3-9c00-27f3a8e9555b/image_19.png)

点击查看大图。

## 触发器体积

#### Unity

```cpp
public class MyComponent : MonoBehaviour
{
	void Start()
	{
		collider.isTrigger = true;
	}
	void OnTriggerEnter(Collider Other)
	{
		// ...
	}
	void OnTriggerExit(Collider Other)
	{
		// ...
	}
}
```

#### UE C++

```cpp
UCLASS()
class AMyActor : public AActor
{
	GENERATED_BODY()

	// 我的触发器组件
	UPROPERTY()
	UPrimitiveComponent* Trigger;

	AMyActor()
	{
		Trigger = CreateDefaultSubobject<USphereComponent>(TEXT("TriggerCollider"));

		// 两个碰撞物都需要将此项设置为true，才能触发事件
		Trigger.bGenerateOverlapEvents = true;

		// 设置碰撞物的碰撞模式
		// 此模式仅为光线投射、扫描和重叠启用碰撞物
		Trigger.SetCollisionEnabled(ECollisionEnabled::QueryOnly);
	}

	virtual void NotifyActorBeginOverlap(AActor* Other) override;

	virtual void NotifyActorEndOverlap(AActor* Other) override;
};
```

#### 蓝图

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b390148-6851-4a63-b7ab-e079bb40e39f/image_20.png)

如需详细了解如何设置碰撞响应，请参阅[碰撞](/documentation/zh-cn/unreal-engine/collision-in-unreal-engine)。

### 刚体运动

#### Unity

```cpp
public class MyComponent : MonoBehaviour
{
	void Start()
	{
		rigidbody.isKinematic = true;
		rigidbody.velocity = transform.forward * 10.0f;
	}
}
```

#### UE C++

```cpp
UCLASS()
class AMyActor : public AActor
{
	GENERATED_BODY()

	UPROPERTY()
	UPrimitiveComponent* PhysicalComp;

	AMyActor()
	{
		PhysicalComp = CreateDefaultSubobject<USphereComponent>(TEXT("CollisionAndPhysics"));
		PhysicalComp->SetSimulatePhysics(false);
		PhysicalComp->SetPhysicsLinearVelocity(GetActorRotation().Vector() * 100.0f);
	}
};
```

## 输入事件

#### Unity

```cpp
public class MyPlayerController : MonoBehaviour
{
	void Update()
	{
		if (Input.GetButtonDown("Fire"))
		{
			// ...
		}
		float Horiz = Input.GetAxis("Horizontal");
		float Vert = Input.GetAxis("Vertical");
		// ...
	}
}
```

#### UE C++

```cpp
UCLASS()
class AMyPlayerController : public APlayerController
{
	GENERATED_BODY()

	void SetupInputComponent()
	{
		Super::SetupInputComponent();

		InputComponent->BindAction("Fire", IE_Pressed, this, &AMyPlayerController::HandleFireInputEvent);
		InputComponent->BindAxis("Horizontal", this, &AMyPlayerController::HandleHorizontalAxisInputEvent);
		InputComponent->BindAxis("Vertical", this, &AMyPlayerController::HandleVerticalAxisInputEvent);
	}

	void HandleFireInputEvent();
	void HandleHorizontalAxisInputEvent(float Value);
	void HandleVerticalAxisInputEvent(float Value);
};
```

#### 蓝图

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b0bf210-09e7-4316-be66-236e1796a983/image_21.png)

你的项目设置中的输入属性可能如下所示：

![虚幻引擎中的输入设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff551d95-04be-4802-bd73-a08ec374d2fe/unreal-engine-input-settings.png)

如需详细了解如何设置UE项目的输入，请参阅[输入](/documentation/zh-cn/unreal-engine/input-in-unreal-engine)。

## 扩展阅读

如需详细了解上述各概念，推荐浏览以下文档：

-   [Gameplay框架](/documentation/zh-cn/unreal-engine/gameplay-framework-in-unreal-engine) - 介绍核心游戏系统，如游戏模式、玩家状态、控制器、Pawn、摄像机等。
-   [Gameplay架构](/documentation/zh-cn/unreal-engine/programming-with-cpp-in-unreal-engine) - 创建和实现Gameplay类的参考文档。
-   [Gameplay教程](/documentation/zh-cn/unreal-engine/gameplay-tutorials-for-unreal-engine) - 重新创建常用Gameplay元素的教程。Tutorials for recreating common gameplay elements.

-   [unity](https://dev.epicgames.com/community/search?query=unity)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [实例化GameObject/生成Actor](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E5%AE%9E%E4%BE%8B%E5%8C%96gameobject/%E7%94%9F%E6%88%90actor)
-   [UObject和NewObject](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#uobject%E5%92%8Cnewobject)
-   [AActor和SpawnActor](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#aactor%E5%92%8Cspawnactor)
-   [示例](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E7%A4%BA%E4%BE%8B)
-   [类型转换](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2)
-   [Unity](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#unity)
-   [UE C++](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#uec++)
-   [蓝图](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E8%93%9D%E5%9B%BE)
-   [销毁GameObject/Actor](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E9%94%80%E6%AF%81gameobject/actor)
-   [销毁GameObject/Actor（延迟1秒）](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E9%94%80%E6%AF%81gameobject/actor%EF%BC%88%E5%BB%B6%E8%BF%9F1%E7%A7%92%EF%BC%89)
-   [禁用GameObject/Actor](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E7%A6%81%E7%94%A8gameobject/actor)
-   [从组件访问GameObject/Actor](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E4%BB%8E%E7%BB%84%E4%BB%B6%E8%AE%BF%E9%97%AEgameobject/actor)
-   [从GameObject/Actor访问组件](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E4%BB%8Egameobject/actor%E8%AE%BF%E9%97%AE%E7%BB%84%E4%BB%B6)
-   [Unity](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#unity-2)
-   [UE C++](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#uec++-2)
-   [蓝图](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E8%93%9D%E5%9B%BE-2)
-   [查找GameObject/Actor](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E6%9F%A5%E6%89%BEgameobject/actor)
-   [Unity](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#unity-3)
-   [UE C++](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#uec++-3)
-   [蓝图](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E8%93%9D%E5%9B%BE-3)
-   [向GameObject/Actor添加标签](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E5%90%91gameobject/actor%E6%B7%BB%E5%8A%A0%E6%A0%87%E7%AD%BE)
-   [Unity](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#unity-4)
-   [UE C++](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#uec++-4)
-   [蓝图](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E8%93%9D%E5%9B%BE-4)
-   [向MonoBehaviour/ActorComponent添加标签](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E5%90%91monobehaviour/actorcomponent%E6%B7%BB%E5%8A%A0%E6%A0%87%E7%AD%BE)
-   [Unity](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#unity-5)
-   [UE C++](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#uec++-5)
-   [比较GameObject/Actor和MonoBehaviour/ActorComponent上的标签](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E6%AF%94%E8%BE%83gameobject/actor%E5%92%8Cmonobehaviour/actorcomponent%E4%B8%8A%E7%9A%84%E6%A0%87%E7%AD%BE)
-   [Unity](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#unity-6)
-   [UE C++](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#uec++-6)
-   [蓝图](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E8%93%9D%E5%9B%BE-5)
-   [UE C++](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#uec++-7)
-   [蓝图](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E8%93%9D%E5%9B%BE-6)
-   [物理：刚体与图元组件](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E7%89%A9%E7%90%86%EF%BC%9A%E5%88%9A%E4%BD%93%E4%B8%8E%E5%9B%BE%E5%85%83%E7%BB%84%E4%BB%B6)
-   [RayCast与RayTrace](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#raycast%E4%B8%8Eraytrace)
-   [Unity](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#unity-7)
-   [UE C++](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#uec++-8)
-   [蓝图](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E8%93%9D%E5%9B%BE-7)
-   [触发器体积](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E8%A7%A6%E5%8F%91%E5%99%A8%E4%BD%93%E7%A7%AF)
-   [Unity](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#unity-8)
-   [UE C++](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#uec++-9)
-   [蓝图](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E8%93%9D%E5%9B%BE-8)
-   [刚体运动](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E5%88%9A%E4%BD%93%E8%BF%90%E5%8A%A8)
-   [Unity](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#unity-9)
-   [UE C++](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#uec++-10)
-   [输入事件](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E8%BE%93%E5%85%A5%E4%BA%8B%E4%BB%B6)
-   [Unity](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#unity-10)
-   [UE C++](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#uec++-11)
-   [蓝图](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E8%93%9D%E5%9B%BE-9)
-   [扩展阅读](/documentation/zh-cn/unreal-engine/creating-gameplay-in-unreal-engine-for-unity-developers#%E6%89%A9%E5%B1%95%E9%98%85%E8%AF%BB)
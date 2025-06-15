# 虚幻引擎中的Lyra示例游戏交互系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lyra-sample-game-interaction-system-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:50:06.337Z

---

目录

![Lyra交互系统](https://dev.epicgames.com/community/api/documentation/image/eb244544-25d3-4dd0-a8ab-3ea6d6405b5a?resizing_type=fill&width=1920&height=335)

## Lyra交互系统

Lyra通过其自己的[Gameplay技能](/documentation/zh-cn/unreal-engine/gameplay-ability-system-for-unreal-engine)/[UGameplayAbility](/documentation/en-us/unreal-engine/API/Plugins/GameplayAbilities/Abilities/UGameplayAbility) (ULyraGameplayAbility\_Interact)使用其交互[接口](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine)/[IInterface](/documentation/en-us/unreal-engine/API/Runtime/CoreUObject/UObject/IInterface)，该技能在玩家与Lyra中对象交互的方式和这些对象与玩家交互的方式之间建立因果关系。

你可以使用 `LyraGameplayAbility_Interact` 类管理交互的调用逻辑。

**ULyraGameplayAbility\_Interact.h**

```cpp
		#pragma once
		#include "CoreMinimal.h"
		#include "AbilitySystem/Abilities/LyraGameplayAbility.h"
		#include "Interaction/InteractionQuery.h"
		#include "Interaction/IInteractableTarget.h"
		#include "LyraGameplayAbility_Interact.generated.h"

		class FIndicatorDescriptor;
		/**

		 * ULyraGameplayAbility_Interact
		 *
		 * 用于角色互动的Gameplay技能
		 */
		UCLASS(Abstract)
		class ULyraGameplayAbility_Interact : public ULyraGameplayAbility
		{
			GENERATED_BODY()
		public:

			ULyraGameplayAbility_Interact(const FObjectInitializer& ObjectInitializer = FObjectInitializer::Get());
			virtual void ActivateAbility(const FGameplayAbilitySpecHandle Handle, const FGameplayAbilityActorInfo* ActorInfo, const FGameplayAbilityActivationInfo ActivationInfo, const FGameplayEventData* TriggerEventData) override;

			UFUNCTION(BlueprintCallable)
			void UpdateInteractions(const TArray<FInteractionOption>& InteractiveOptions);

			UFUNCTION(BlueprintCallable)
			void TriggerInteraction();

		protected:

			UPROPERTY(BlueprintReadWrite)
			TArray<FInteractionOption> CurrentOptions;

			TArray<TSharedRef<FIndicatorDescriptor>> Indicators;

		protected:

			UPROPERTY(EditDefaultsOnly)
			float InteractionScanRate = 0.1f;

			UPROPERTY(EditDefaultsOnly)
			float InteractionScanRange = 500;

			UPROPERTY(EditDefaultsOnly)
			TSoftClassPtr<UUserWidget> DefaultInteractionWidgetClass;

		};

```

`AbilityTask_WaitForInteractableTargets_SingleLineTrace` 是一种Gameplay[技能任务](/documentation/zh-cn/unreal-engine/gameplay-ability-tasks-in-unreal-engine)，它执行线路追踪并在循环定时器中等待，直至碰到实现了该接口的Actor为止。

举例来说：

有一个控制LyraPawnActor的玩家，其生命值很低，于是命令Pawn去拾取可收集的生命值道具。在将玩家的十字准星与可收集物件对齐并按下"使用/交互（Use/Interact）"键时，将从Pawn触发线路追踪。当追踪碰到可收集物件时，可收集物件上实现的交互接口将处理相应逻辑，将玩家的生命值恢复为满血。

## 交互技能任务

`UAbilityTask_WaitForInteractableTargets` 用于创建追踪可交互目标的新方法。

举例来说：

有一个控制LyraPawnActor的玩家靠近了一扇门，并且想将门打开。在将玩家的十字准星与门对齐并按下"使用（Use）"键时，将显示径向菜单，其中包含"解锁/锁定（Unlock/Lock）"门或尝试打开门的选项。

如需虚幻中线路追踪的更多信息，请参阅[追踪](/documentation/zh-cn/unreal-engine/traces-tutorials-in-unreal-engine)

**UAbilityTask\_WaitForInteractableTargets.h**

```cpp
		#pragma once
		#include "CoreMinimal.h"
		#include "UObject/ObjectMacros.h"
		#include "Abilities/Tasks/AbilityTask.h"
		#include "Engine/EngineTypes.h"
		#include "CollisionQueryParams.h"
		#include "WorldCollision.h"
		#include "Engine/CollisionProfile.h"
		#include "Abilities/GameplayAbilityTargetDataFilter.h"
		#include "Interaction/InteractionOption.h"
		#include "Interaction/InteractionQuery.h"
		#include "Interaction/IInteractableTarget.h"
		#include "AbilityTask_WaitForInteractableTargets.generated.h"

		class AActor;
		class UPrimitiveComponent;
		class UGameplayAbility;

		DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FInteractableObjectsChangedEvent, const TArray<FInteractionOption>&, InteractableOptions);

		UCLASS(Abstract)
		class UAbilityTask_WaitForInteractableTargets : public UAbilityTask
		{
			GENERATED_UCLASS_BODY()

		public:

			UPROPERTY(BlueprintAssignable)
			FInteractableObjectsChangedEvent InteractableObjectsChanged;

		protected:

			static void LineTrace(FHitResult& OutHitResult, const UWorld* World, const FVector& Start, const FVector& End, FName ProfileName, const FCollisionQueryParams Params);
			void AimWithPlayerController(const AActor* InSourceActor, FCollisionQueryParams Params, const FVector& TraceStart, float MaxRange, FVector& OutTraceEnd, bool bIgnorePitch = false) const;
			static bool ClipCameraRayToAbilityRange(FVector CameraLocation, FVector CameraDirection, FVector AbilityCenter, float AbilityRange, FVector& ClippedPosition);
			void UpdateInteractableOptions(const FInteractionQuery& InteractQuery, const TArray<TScriptInterface<IInteractableTarget>>& InteractableTargets);
			FCollisionProfileName TraceProfile;

			// 轨迹是否影响瞄准俯仰
			bool bTraceAffectsAimPitch = true;

			TArray<FInteractionOption> CurrentOptions;

		};

```

你为追踪选择的AbilityTask会从 `FInteractionQuery` 结构体交付一组可交互目标。

**struct FInteractionQuery**

```cpp
		#pragma once
		#include "CoreMinimal.h"
		#include "Abilities/GameplayAbility.h"
		#include "InteractionQuery.generated.h"

		/**  */
		USTRUCT(BlueprintType)
		struct FInteractionQuery
		{

			GENERATED_BODY()

		public:
			/** 发出请求的pawn。*/
			UPROPERTY(BlueprintReadWrite)
			TWeakObjectPtr<AActor> RequestingAvatar;

			/** 为我们提供了指定控制器的能力——这并不需要与发出请求的头像的所有者相匹配。*/
			UPROPERTY(BlueprintReadWrite)
			TWeakObjectPtr<AController> RequestingController;

			/** 泛型UObject，可提供交互所需的额外数据 */
			UPROPERTY(BlueprintReadWrite)
			TWeakObjectPtr<UObject> OptionalObjectData;
		};

```

to the method `UAbilityTask_WaitForInteractableTargets::UpdateInteractableOptions`:

```cpp
		void UAbilityTask_WaitForInteractableTargets::UpdateInteractableOptions(const FInteractionQuery& InteractQuery, const TArray<TScriptInterface<IInteractableTarget>>& InteractableTargets)
		{

			TArray<FInteractionOption> NewOptions;

			for (const TScriptInterface<IInteractableTarget>& InteractiveTarget : InteractableTargets)

			{

				TArray<FInteractionOption> TempOptions;

				FInteractionOptionBuilder InteractionBuilder(InteractiveTarget, TempOptions);

				InteractiveTarget->GatherInteractionOptions(InteractQuery, InteractionBuilder);

				for (FInteractionOption& Option : TempOptions)

				{

					FGameplayAbilitySpec* InteractionAbilitySpec = nullptr;

					//如果有句柄和目标技能系统，我们就会触发目标上的技能。

					if (Option.TargetAbilitySystem && Option.TargetInteractionAbilityHandle.IsValid())

					{

						// 找到规格

						InteractionAbilitySpec = Option.TargetAbilitySystem->FindAbilitySpecFromHandle(Option.TargetInteractionAbilityHandle);

					}

					// 如果有交互技能，那么我们就会在自己身上激活这种技能。

					else if (Option.InteractionAbilityToGrant)

					{

						// 找到规格

						InteractionAbilitySpec = AbilitySystemComponent->FindAbilitySpecFromClass(Option.InteractionAbilityToGrant);

						if (InteractionAbilitySpec)

						{

							// 更新选项

							Option.TargetAbilitySystem = AbilitySystemComponent;

							Option.TargetInteractionAbilityHandle = InteractionAbilitySpec->Handle;

						}

					}

					if (InteractionAbilitySpec)

					{

						// 过滤掉因为某种原因我们现在不能激活的选项。

						if (InteractionAbilitySpec->Ability->CanActivateAbility(InteractionAbilitySpec->Handle, AbilitySystemComponent->AbilityActorInfo.Get()))

						{

							NewOptions.Add(Option);

						}

					}

				}

			}

			bool bOptionsChanged = false;

			if (NewOptions.Num() == CurrentOptions.Num())

			{

				NewOptions.Sort();

				for (int OptionIndex = 0; OptionIndex < NewOptions.Num(); OptionIndex++)

				{

					const FInteractionOption& NewOption = NewOptions[OptionIndex];

					const FInteractionOption& CurrentOption = CurrentOptions[OptionIndex];

					if (NewOption != CurrentOption)

					{

						bOptionsChanged = true;

						break;

					}

				}

			}

			else

			{

				bOptionsChanged = true;

			}

			if (bOptionsChanged)

			{

				CurrentOptions = NewOptions;

				InteractableObjectsChanged.Broadcast(CurrentOptions);

			}

		}
```

这将对每个可交互目标调用 `IInteractableTarget::GatherInteractionOptions` 。

```cpp
		virtual void GatherInteractionOptions(const FInteractionQuery& InteractQuery, FInteractionOptionBuilder& OptionBuilder) = 0;

```

更新一组可交互对象之后，交互技能（GA\_Interact）会在玩家聚焦于要与之交互的对象时调用 `TriggerInteraction` 函数，并从玩家接收输入（即玩家要与该特定对象交互）。

当你调用当前选项后，可通过两种方法交互。 第一种方法通过函数 `FInteractionOption::InteractionAbilityToGrant` 向玩家的技能系统组件授予技能，对于武器拾取Actor之类的简单逻辑，推荐使用此函数。

或者，如果你要与之交互的对象包含其自己的技能系统组件来处理复杂的逻辑，则可以调用 `FInteractionOption::TargetAbilitySystem` 和 `FInteractionOption::TargetInteractionHandle` 函数，这会对可交互对象调用技能，而不是对Lyra角色（头像）的技能系统组件调用技能。

交互函数 `FInteractionOption::InteractionAbilityToGrant` 继承自 `ULyraGameplayAbility_Interact` 交互技能的基类，该技能将任务函数 `AbilityTask_GrantNearbyInteraction` 作为范围循环和定时器来运行，以收集附近的技能并在你尝试与之交互之前将其授予你的角色。你可以增加 `InteractionScanRate` 浮点，以使用比 `InteractionRange` 更大的半径，否则，复制将无法及时将技能交付给客户端。

技能通过事件[Gameplay标签](/documentation/zh-cn/unreal-engine/using-gameplay-tags-in-unreal-engine) `FInteractionOption::InteractionEventTag` 进行调用。此标签需要与技能中的触发器相匹配。 例如，`GA_Collect_Interaction` 会在发送 `Ability.Type.Interact.Collect` 事件时触发，该事件在交互选项中设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/916cffd3-101a-4cff-ad13-18f8b8771ce6/interactinterface.png)

`GA_Collect_Interaction` 仅仅表示一种交互，它是一种技能，允许你拾取地上的物品并将其添加到你的物品栏。你可以尽情发挥想象，可以创建一个技能来消耗地上的苹果以补满玩家的生命值，也可以创建一个技能来开门、进入载具或开箱。

利用这种解耦行为，你可以从中央被动交互扫描程序进行各种各样的交互。

#### 重要的Lyra交互术语

**InteractableTarget** - 实现了IInteractableTarget接口的一种Actor或组件，这决定了可以与世界中的哪些对象交互。

**InteractionOption** - "可供性（Affordance）"或"选项（Option）"，例如，一个苹果可能同时提供"收集（Collect）"和"消耗（Consume）"的选项。

**InteractionInstigator** - 发起交互的Pawn（LyraPawnActor）。 它们不一定实现了 `IInteractionInstigator` 接口，而该接口允许进一步自定义选项及其呈现方式。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Lyra交互系统](/documentation/zh-cn/unreal-engine/lyra-sample-game-interaction-system-in-unreal-engine#lyra%E4%BA%A4%E4%BA%92%E7%B3%BB%E7%BB%9F)
-   [交互技能任务](/documentation/zh-cn/unreal-engine/lyra-sample-game-interaction-system-in-unreal-engine#%E4%BA%A4%E4%BA%92%E6%8A%80%E8%83%BD%E4%BB%BB%E5%8A%A1)
-   [重要的Lyra交互术语](/documentation/zh-cn/unreal-engine/lyra-sample-game-interaction-system-in-unreal-engine#%E9%87%8D%E8%A6%81%E7%9A%84lyra%E4%BA%A4%E4%BA%92%E6%9C%AF%E8%AF%AD)
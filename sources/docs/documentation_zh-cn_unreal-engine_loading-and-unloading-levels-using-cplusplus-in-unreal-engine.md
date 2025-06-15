# Loading and Unloading Levels using C++ in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/loading-and-unloading-levels-using-cplusplus-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:20:19.767Z

---

目录

![Loading and Unloading Levels using C++](https://dev.epicgames.com/community/api/documentation/image/d0288e54-3f1f-4989-b59a-9670848cd30a?resizing_type=fill&width=1920&height=335)

We want to start streaming in the patio level here, so that by the time the player rounds the corner and begins approaching the patio, the streaming level will be loaded and visible.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4478b0bb-c8a4-4314-b85b-bcd83baee31f/streaminglevelvisible.png)

As part of the setup, we have two levels, **SunTemple\_Persistent** and **SunTemple\_Streaming**. Our **Player Start** is in **SunTemple\_Persistent**, and our player in the game is represented by a *Character*.

1.  Open **SunTemple\_Persistent** in the **Content Browser**.
    
2.  Move the **Player Start** to the very beginning of the temple.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76b2378d-8fb0-4c1b-95bb-8461d431032e/playerstart.png)
3.  Click on **Windows**, then select **Levels**.
    
4.  Click on the **Levels** dropdown menu, then select **Add Existing...** to add a new sublevel.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c29c647-3204-4aed-b83b-a84ff39a33a2/addexisting.png)
5.  Select **SunTemple\_Streaming** to add in the **Open Level** dialog, then click on **Open**.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9544f84-f701-4dd8-961c-aceff8ac85bc/suntemplestreaming_select.png)
6.  **Right-click** on **Persistent Level** and select **Make Current** from the dropdown menu.
    

## Streaming In Levels with C++

1.  Open the **Content Browser** and create a new **C++ Class**. This class is going to be based on **Actor**, so select **Actor** and click **Next**.
    
2.  Name the new **C++ Class** "LevelStreamerActor", then click on **Create Class**. The new class will now open in Visual Studio or XCode.
    

For this scenario, we want to stream the second level in once the **Character** overlaps a BoxComponent called OverlapVolume in our LevelStreamerActor.

1.  In `LevelStreamerActor.h`, declare an OverlapVolume that is VisibleAnywhere, BlueprintReadOnly, and has the AllowPrivateAccess meta flag.
    
    ```cpp
             private:
             // Overlap volume to trigger level streaming
             UPROPERTY(VisibleAnywhere, BlueprintReadOnly, meta = (AllowPrivateAccess = "true"))
             UBoxComponent* OverlapVolume;
    ```
    
2.  In `LevelStreamerActor.cpp`, in the LevelStreamerActor constructor, create the OverlapVolume and make it the RootComponent.
    
    ```cpp
             OverlapVolume = CreateDefaultSubobject<UBoxComponent>(TEXT("OverlapVolume"));
             RootComponent = OverlapVolume;
    ```
    
3.  Back in `LevelStreamerActor.h`, declare a protected OverlapBegins function, which will be bound to the BoxComponent's OnComponentBeginOverlap function. This binding means that OverlapBegins must be tagged with a UFUNCTION macro, and must have the same signature as OnComponentBeginOverlap.
    
    ```cpp
         protected:
    
         UFUNCTION()
         void OverlapBegins(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult & SweepResult);
    ```
    
4.  Also in `LevelStreamerActor.h`, create a protected FName variable that is EditAnywhere called LevelToLoad. This will enable you to change the LevelToLoad on a per-instance basis.
    
    ```cpp
             UPROPERTY(EditAnywhere)
             FName LevelToLoad;
    		
    ```
    
5.  We are going to use a few functions from the GameplayStatics library, so include it at the top of `LevelStreamerActor.cpp`.
    
    ```cpp
             #include "Kismet/GameplayStatics.h"
    		
    ```
    
6.  Now you are ready to create your OverlapBegins functionality. In `LevelStreamerActor.cpp`, begin defining the function. You can use the GameplayStatics function `GetPlayerCharacter` to get the Character at index 0.
    
    ```cpp
             void ALevelStreamerActor::OverlapBegins(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult & SweepResult)
             {
                     ACharacter* MyCharacter = UGameplayStatics::GetPlayerCharacter(this, 0);
             }
    ```
    
7.  After getting MyCharacter, check it against the OtherActor overlapping your BoxComponent. Also, verify that LevelToLoad is not empty, then call LoadStreamLevel.
    
    ```cpp
             if (OtherActor == MyCharacter && LevelToLoad != "")
             {
                 FLatentActionInfo LatentInfo;
                 UGameplayStatics::LoadStreamLevel(this, LevelToLoad, true, true, LatentInfo);
             }
    ```
    
8.  In your LevelStreamerActor constructor, bind OverlapBegins to your BoxComponent's OnComponentBeginOverlap.
    
    ```cpp
             OverlapVolume->OnComponentBeginOverlap.AddUniqueDynamic(this, &ALevelStreamerActor::OverlapBegins);
    ```
    
    Your final `LevelStreamerActor.h` should look like:
    
    ```cpp
         #pragma once
    
         #include "GameFramework/Actor.h"
         #include "LevelStreamerActor.generated.h"
    
         UCLASS()
         class LEVELS_API ALevelStreamerActor : public AActor
         {
             GENERATED_BODY()
    
         public:
             // Sets default values for this actor's properties
             ALevelStreamerActor();
    
             // Called every frame
             virtual void Tick( float DeltaSeconds ) override;
    
         protected:
    
             // Called when the game starts or when spawned
             virtual void BeginPlay() override;
    
             UFUNCTION()
             void OverlapBegins(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult & SweepResult);
    
             UPROPERTY(EditAnywhere)
             FName LevelToLoad;
    
         private:
             // Overlap volume to trigger level streaming
             UPROPERTY(VisibleAnywhere, BlueprintReadOnly, meta = (AllowPrivateAccess = "true"))
             UBoxComponent* OverlapVolume;
    
         };
    ```
    
    Your final `LevelStreamerActor.cpp` should look like:
    
    ```cpp
         #include "Levels.h"
         #include "Kismet/GameplayStatics.h"
         #include "LevelStreamerActor.h"
    
         // Sets default values
         ALevelStreamerActor::ALevelStreamerActor()
         {
             // Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
             PrimaryActorTick.bCanEverTick = true;
    
             OverlapVolume = CreateDefaultSubobject<UBoxComponent>(TEXT("OverlapVolume"));
             RootComponent = OverlapVolume;
    
             OverlapVolume->OnComponentBeginOverlap.AddUniqueDynamic(this, &ALevelStreamerActor::OverlapBegins);
         }
         // Called when the game starts or when spawned
         void ALevelStreamerActor::BeginPlay()
         {
             Super::BeginPlay();
    
         }
    
         // Called every frame
         void ALevelStreamerActor::Tick( float DeltaTime )
         {
             Super::Tick( DeltaTime );
    
         }
    
         void ALevelStreamerActor::OverlapBegins(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult & SweepResult)
         {
                 ACharacter* MyCharacter = UGameplayStatics::GetPlayerCharacter(this, 0);
                 if (OtherActor == MyCharacter && LevelToLoad != "")
                 {
                     FLatentActionInfo LatentInfo;
                     UGameplayStatics::LoadStreamLevel(this, LevelToLoad, true, true, LatentInfo);
                 }
         }
    ```
    
9.  Compile your code, then switch back to the editor.
    
10.  Place your **LevelStreamer** Actor into your level, and adjust the placement and scale until it encompasses the part of the persistent world you want your **Character** to be in to begin streaming, as well as the entire walkable volume where the streaming level will be.
    
11.  Enter **SunTemple\_Streaming** as the **Level to Stream**.
    
12.  Use Play In Editor to test out your streaming level.
    

## Unloading Levels With C++

To unload the level as your *Character* exits the BoxComponent, you will create an `OverlapEnds` function that calls `UGameplayStatics::UnloadStreamLevel` and bind it to `OnComponentEndOverlap`. Add the following code snippets to your LevelStreamerActor:

In LevelStreamerActor.h:

```cpp
	UFUNCTION()
	void OverlapEnds(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex);
```

In LevelStreamerActor.cpp:

```cpp
	void ALevelStreamerActor::OverlapEnds(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex)
	{
			ACharacter* MyCharacter = UGameplayStatics::GetPlayerCharacter(this, 0);
			if (OtherActor == MyCharacter && LevelToLoad != "")
			{
				FLatentActionInfo LatentInfo;
				UGameplayStatics::UnloadStreamLevel(this, LevelToLoad, LatentInfo);
			}
	}
```

In the constructor:

```cpp
	OverlapVolume->OnComponentEndOverlap.AddUniqueDynamic(this, &ALevelStreamerActor::OverlapEnds);
```

-   [level streaming](https://dev.epicgames.com/community/search?query=level%20streaming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Streaming In Levels with C++](/documentation/zh-cn/unreal-engine/loading-and-unloading-levels-using-cplusplus-in-unreal-engine#streaminginlevelswithc++)
-   [Unloading Levels With C++](/documentation/zh-cn/unreal-engine/loading-and-unloading-levels-using-cplusplus-in-unreal-engine#unloadinglevelswithc++)
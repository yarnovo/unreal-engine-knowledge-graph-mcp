# Quick Start Guide to Variables Timers and Events in Unreal Engine CPP | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/quick-start-guide-to-variables-timers-and-events-in-unreal-engine-cpp
> 
> 生成时间: 2025-06-14T19:34:05.757Z

---

目录

![变量、定时器和事件](https://dev.epicgames.com/community/api/documentation/image/bc1391e4-5610-4f8c-8e56-f8f0f141cfed?resizing_type=fill&width=1920&height=335)

本教程将展示向编辑器公开变量和函数的方法，使用定时器延迟或重复代码执行的方法，以及使用事件在Actors间通信的方法。

## 1.创建使用定时器的Actor

如首次使用 **虚幻引擎**，建议先阅读[编程快速入门](/documentation/zh-cn/unreal-engine/unreal-engine-cpp-quick-start)。本教程将假设你已熟悉创建项目及向其添加C++代码。

1.  将使用名为HowTo\_VTE的初学者内容包，以新建基本代码项目开始，然后向其添加 **Actor** 类。本教程中将其命名为Countdown。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6d2989b-b801-4d3d-ade2-2856cae2be92/chooseparentclass.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db10399f-caae-4a9f-92d5-032d73edf3d5/nameyouractor.png)
2.  首先创建在游戏中显示的简单倒数定时器。在Countdown.h中，在类定义的末尾添加以下几行代码：
    
    ```cpp
             int32 CountdownTime;
             UTextRenderComponent* CountdownText;
             void UpdateTimerDisplay();
    		
    ```
    
3.  在Countdown.h中，可创建可渲染的文本 **组件**，并将倒数时间初始化为3秒。不需要这类 **Actor** 的 **Ticking**，因此可将其关闭。为此，须在文件顶部添加组件的标头，使"include"部分显示如下：
    
    ```cpp
             #include "GameFramework/Actor.h"
             #include "Components/TextRenderComponent.h"
             #include "Countdown.generated.h"
    		
    ```
    
    包含标头后，即可编写 `ACountdown::ACountdown`。其应如下所示：
    
    ```cpp
         ACountdown::ACountdown()
         {
             //将此Actor设为逐帧调用Tick()。如无需此功能，可关闭以提高性能。
             PrimaryActorTick.bCanEverTick = false;
             CountdownText = CreateDefaultSubobject<UTextRenderComponent>(TEXT("CountdownNumber"));
             CountdownText->SetHorizontalAlignment(EHTA_Center);
             CountdownText->SetWorldSize(150.0f);
             RootComponent = CountdownText;
             CountdownTime = 3;
         }
    
    ```
    
4.  `ACountdown::UpdateTimerDisplay` 应更新文本显示，以显示剩余时间。时间结束时，则显示为零。此代码应在游戏中首次生成 `ACountdown` 时运行，在 `CountdownTime` 变量为零前每秒运行一次。
    
    ```cpp
             void ACountdown::UpdateTimerDisplay()
             {
                 CountdownText->SetText(FString::FromInt(FMath::Max(CountdownTime, 0)));
             }
    		
    ```
    
5.  每次指定 **定时器** 运行函数时，都会得到 **定时器句柄**。需充分利用此句柄，以便在倒数结束时关闭定时器。在 `Countdown.h` 的类定义中添加倒数函数和控制其所需的定时器句柄。添加完成后，再添加一个函数，以便在倒数结束时执行特别操作：
    
    ```cpp
             void AdvanceTimer();
    		
             void CountdownHasFinished();
    		
             FTimerHandle CountdownTimerHandle;
    		
    ```
    
    也可在 `Countdown.cpp` 中编写 `ACountdown::AdvanceTimer` 和 `ACountdown::CountdownHasFinished` 的主体。
    
    ```cpp
         void ACountdown::AdvanceTimer()
         {
             --CountdownTime;
             UpdateTimerDisplay();
             if (CountdownTime < 1)
             {
                 //倒数完成，停止运行定时器。
                 GetWorldTimerManager().ClearTimer(CountdownTimerHandle);
                 CountdownHasFinished();
             }
         }
    
         void ACountdown::CountdownHasFinished()
         {
             //改为特殊读出
             CountdownText->SetText(TEXT("GO!"));
         }
    
    ```
    
6.  向新更新的函数添加调用，初始化 `ACountdown::BeginPlay` 中显示的文本，并设置逐秒前进和更新倒数的定时器：
    
    ```cpp
             UpdateTimerDisplay();
             GetWorldTimerManager().SetTimer(CountdownTimerHandle, this, &ACountdown::AdvanceTimer, 1.0f, true);
    		
    ```
    
    将在构造函数后 **BeginPlay** 前指定虚幻编辑器中设为变量的值，因此选择更新 `ACountdown::BeginPlay` 而非 `ACountdown::ACountdown` 中的显示。稍后在向编辑器公开 `CountdownTime` 时，需遵循此类数值。
    
7.  前往 **虚幻编辑器**，按 **编译** 检查目前的进度。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a84f2694-62e8-4c37-afd1-42621f9b1125/compilefromeditor.png)
    
    之后可将更新后的 `ACountdown` 类从 **内容浏览器** 拖入 **关卡编辑器**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c604d3ca-8e2b-4f30-a90d-81df7d23c912/classincontentbrowser.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df6b42f9-e319-492c-98f7-6d6d5455a092/leveleditortext.png)
    
    由于在 `ACountdown::BeginPlay` 期间设置倒数，而非 `ACountdown::ACountdown` 期间，因此默认文本会在 **关卡编辑器** 中显示。
    
    按下 **运行** 时，倒数会预期进行，显示3，2，1，最后GO！
    

至此，使用定时器的简单类已创建完毕。如非程序员用户可设置倒数计时，或在倒数结束时改变行为，他们将从中获益良多。接下来，向编辑器公开此类功能。

### 半成品代码

**Countdown.h**

```cpp
	// Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.

	#pragma once

	#include "GameFramework/Actor.h"
	#include "Countdown.generated.h"

	UCLASS()
	class HOWTO_VTE_API ACountdown : public AActor
	{
		GENERATED_BODY()

	public:
		//设置此Actor属性的默认值
		ACountdown();

	protected:
		// 游戏开始或生成时调用
		virtual void BeginPlay() override;

	public:
		// 逐帧调用
		virtual void Tick( float DeltaSeconds ) override;

		//倒数的运行时长（以秒计）
		int32 CountdownTime;

		UTextRenderComponent* CountdownText;

		void UpdateTimerDisplay();

		void AdvanceTimer();

		void CountdownHasFinished();

		FTimerHandle CountdownTimerHandle;
	};
```

**Countdown.cpp**

```cpp
	// Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.

	#include "HowTo_VTE.h"
	#include "Components/TextRenderComponent.h"
	#include "Countdown.h"

	//设置默认值
	ACountdown::ACountdown()
	{
		//将此Actor设为逐帧调用Tick()。如无需此功能，可关闭以提高性能。
		PrimaryActorTick.bCanEverTick = false;

		CountdownText = CreateDefaultSubobject<UTextRenderComponent>(TEXT("CountdownNumber"));
		CountdownText->SetHorizontalAlignment(EHTA_Center);
		CountdownText->SetWorldSize(150.0f);
		RootComponent = CountdownText;

		CountdownTime = 3;
	}

	// 游戏开始或生成时调用
	void ACountdown::BeginPlay()
	{
		Super::BeginPlay();

		UpdateTimerDisplay();
		GetWorldTimerManager().SetTimer(CountdownTimerHandle, this, &ACountdown::AdvanceTimer, 1.0f, true);
	}

	// 逐帧调用
	void ACountdown::Tick( float DeltaTime )
	{
		Super::Tick( DeltaTime );

	}

	void ACountdown::UpdateTimerDisplay()
	{
		CountdownText->SetText(FString::FromInt(FMath::Max(CountdownTime, 0)));
	}

	void ACountdown::AdvanceTimer()
	{
		--CountdownTime;
		UpdateTimerDisplay();
		if (CountdownTime < 1)
		{
			//倒数完成，停止运行定时器。
			GetWorldTimerManager().ClearTimer(CountdownTimerHandle);
			//定时器结束时，执行要执行的特殊操作。
			CountdownHasFinished();
		}
	}

	void ACountdown::CountdownHasFinished()
	{
		//改为特殊读出
		CountdownText->SetText(TEXT("GO!"));
	}

```

## 2.向编辑器公开变量和函数

1.  倒数定时器目前被硬编码为使用3秒的值。如可在编辑器中将倒数时间设为想要的任何值，此操作将十分有用，也较易完成。在 **Visual Studio** 中，可打开 `Countdown.h` 并找到以下代码行：
    
    ```cpp
             int32 CountdownTime;
    		
    ```
    
    为将此变量公开到虚幻引擎，需使其成为 **UPROPERTY**。利用此操作，可在启动游戏或加载保存的关卡时保留变量的值。带有空括号的 `UPROPERTY` 标记，将被添加到受其它影响的变量正上方：
    
    ```cpp
         UPROPERTY()
         int32 CountdownTime;
    
    ```
    
    `UPROPERTY` 支持改变虚幻引擎使用变量方式的参数。需将变量设为可编辑，因此可添加 `EditAnywhere` 参数:
    
    ```cpp
         UPROPERTY(EditAnywhere)
         int32 CountdownTime;
    
    ```
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c55a839-e146-4376-bbf5-c3337478eef6/exposingvariable.png)
    
    还可在C++中向变量添加注释，此注释将成为虚幻编辑器中变量的描述，如下所示：
    
    ```cpp
         //倒数的运行时长（以秒计）
         UPROPERTY(EditAnywhere)
         int32 CountdownTime;
    
    ```
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88705d80-b9a1-4e82-a02e-2fce5a0f512b/commentingvariable.png)
    
    使用 `UPROPERTY` 还可进行操作，研究如 `BlueprintReadWrite` 和 `Category` 等其他说明符则是下一步骤的最佳选择，但目前所需设置已经基本完成。
    
    返回虚幻编辑器并按下 **编译** 时，变量将出现在之前放置的 `ACountdown` 的 **细节面板** 中，可通过更改此数字并按下 **运行** 测试不同的定时器值。
    
2.  除改变定时器的值外，同时也使非程序员开发者可改变定时器启动时触发的操作。在Visual Studio中，打开Countdown.h，并找到以下行：
    
    ```cpp
             void CountdownHasFinished();
    		
    ```
    
    通过将这个函数变成 `UFUNCTION`，将其向虚幻引擎公开，如下所示：
    
    ```cpp
         UFUNCTION()
         void CountdownHasFinished();
    
    ```
    
    和 `UPROPERTY` 宏相同，需提供使用其进行操作的相关信息，以便非程序员开发者可使用更多功能和访问权。有三种选择可使用：
    
    1.  `BlueprintCallable` 函数以C++编写，可从 **蓝图图表** 中调用，但只能通过编辑C++代码进行修改或重写。以此类方式标记的函数通常具备供非程序员使用而编写的功能，但是不应对其进行修改，否则修改将毫无意义。数学函数便是此类函数的经典范例。
        
    2.  在C++ header (.h)文件中设置 `BlueprintImplementableEvent` 函数，但是函数的主体则在蓝图图表中完成编写，而非C++中。创建此类通常是为了使非程序员能够对无预期默认动作或标准行为的特殊情况创建自定义反应。在宇宙飞船游戏中，玩家飞船接触到能量升级时发生的事件便是这方面的范例。
        
    3.  `BlueprintNativeEvent` 函数与 `BlueprintCallable` 和 `BlueprintImplementableEvent` 函数的组合类似。其具备用C++中编程的默认行为，但此类行为可通过在蓝图图表中覆盖进行补充或替换。对此类代码编程时，C++代码固定使用命名末尾添加了\_Implementation的虚拟函数，如下所示。此为最为灵活的选项，因此本教程将采用这种方法。
        
    
    为了让非程序员调用C++函数，并用 **蓝图** 对其进行覆盖，需对 `Countdown.h` 进行以下修改。
    
    ```cpp
         UFUNCTION(BlueprintNativeEvent)
         void CountdownHasFinished();
         virtual void CountdownHasFinished_Implementation();
    
    ```
    
    然后，在Countdown.cpp中，需对以下行进行修改：
    
    ```cpp
         void ACountdown::CountdownHasFinished()
    
    ```
    
    改为：
    
    ```cpp
         void ACountdown::CountdownHasFinished_Implementation()
    ```
    

现在非程序员可访问并修改变量和函数，而在C++中提供了默认值和功能。要了解非程序员对其使用的方式，对 `ACountdown` 类进行蓝图扩展，并自行进行修改。

## 成品代码

**Countdown.h**

```cpp
	// Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.

	#pragma once

	#include "GameFramework/Actor.h"
	#include "Countdown.generated.h"

	UCLASS()
	class HOWTO_VTE_API ACountdown : public AActor
	{
		GENERATED_BODY()

	public:
		//设置此Actor属性的默认值
		ACountdown();

	protected:
		// 游戏开始或生成时调用
		virtual void BeginPlay() override;

	public:
		// 逐帧调用
		virtual void Tick( float DeltaSeconds ) override;

		//倒数的运行时长（以秒计）
		UPROPERTY(EditAnywhere)
		int32 CountdownTime;

		UTextRenderComponent* CountdownText;

		void UpdateTimerDisplay();

		void AdvanceTimer();

		UFUNCTION(BlueprintNativeEvent)
		void CountdownHasFinished();
		virtual void CountdownHasFinished_Implementation();

		FTimerHandle CountdownTimerHandle;
	};
```

**Countdown.cpp**

```cpp
	// Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.

	#include "HowTo_VTE.h"
	#include "Components/TextRenderComponent.h"
	#include "Countdown.h"

	//设置默认值
	ACountdown::ACountdown()
	{
		//将此Actor设为逐帧调用Tick()。如无需此功能，可关闭以提高性能。
		PrimaryActorTick.bCanEverTick = false;

		CountdownText = CreateDefaultSubobject<UTextRenderComponent>(TEXT("CountdownNumber"));
		CountdownText->SetHorizontalAlignment(EHTA_Center);
		CountdownText->SetWorldSize(150.0f);
		RootComponent = CountdownText;

		CountdownTime = 3;
	}

	// 游戏开始或生成时调用
	void ACountdown::BeginPlay()
	{
		Super::BeginPlay();

		UpdateTimerDisplay();
		GetWorldTimerManager().SetTimer(CountdownTimerHandle, this, &ACountdown::AdvanceTimer, 1.0f, true);
	}

	// 逐帧调用
	void ACountdown::Tick( float DeltaTime )
	{
		Super::Tick( DeltaTime );

	}

	void ACountdown::UpdateTimerDisplay()
	{
		CountdownText->SetText(FString::FromInt(FMath::Max(CountdownTime, 0)));
	}

	void ACountdown::AdvanceTimer()
	{
		--CountdownTime;
		UpdateTimerDisplay();
		if (CountdownTime < 1)
		{
			//倒数完成，停止运行定时器。
			GetWorldTimerManager().ClearTimer(CountdownTimerHandle);
			//定时器结束时，执行要执行的特殊操作。
			CountdownHasFinished();
		}
	}

	void ACountdown::CountdownHasFinished_Implementation()
	{
		//改为特殊读出
		CountdownText->SetText(TEXT("GO!"));
	}

```

## 3.使用蓝图扩展和覆盖C++

教程的本章节将涉及使用 **蓝图** 扩展C++类的功能。然而，此操作仅为测试是否正确编写C++代码，而非蓝图教程的一部分。欲了解蓝图的相关介绍，建议阅读 [%programming-and-scripting/blueprints-visual-scripting/GettingStarted/QuickStart:title%](/documentation/zh-cn/unreal-engine/quick-start-guide-for-blueprints-visual-scripting-in-unreal-engine)。

1.  要在编辑器中改变名为Countdown1的ACountdown实例的行为，须首先创建其可编辑的蓝图版本。为此，可在 **世界大纲视图（World Outliner）** 中将其选中，然后点击 **细节面板** 中的 **蓝图/添加脚本（Blueprint/Add Script）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce599a84-df34-48b2-9663-e8467a4243e3/addscript.png)
    
    现在便可提供蓝图资源的路径和名称，其中将包含已修改的ACountdown类。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8187c73-06aa-4978-a0ce-89878cc019d3/selectblueprintpath.png)
    
    此操作将新建资源，其代表Countdown1的蓝图版本。其同时还将使用此新蓝图的实例替换Countdown1，以便对蓝图的修改可影响游戏中的Countdown1。
    
2.  **虚幻编辑器** 会自动转到 **内容浏览器** 中的新资源，同时可 **右键点击** 其并选择"编辑……"，修改其 **蓝图图表**、**组件** 层级和 **默认值**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d760e36a-ebca-4723-a4dc-9030c3a787dc/blueprintincontentbrowser.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/962d4926-c659-4cd7-a59a-76664c595502/editblueprint.png)
3.  可在 **事件图表** 选项卡中找到函数和事件，先将其选中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/103e9b8a-d419-4bb6-86a5-7cc1057586ee/selecteventgraph.png)
    
    然后，**右键点击** **事件图表** 窗口中的任意位置，便可添加 **CountdownHasFinished** 函数，将其作为事件节点以定义其行为。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75fbd7d3-95ea-4c23-80b0-6c93384976fb/selectevent.png)
4.  通过点击左键并连出新节点右侧的白色（执行）引脚，添加需要的附加功能。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b253aac1-30b5-438f-9761-d5b49db07c24/dragexecpin.png)
    
    释放鼠标左键时，系统将询问需要执行的功能或事件。本教程中将在倒数结束时生成 **粒子系统**。由于需要 **Spawn Emitter At Location** 节点，因此在列表中选中。在搜索栏中输入如spawn loc的部分短语，即可节省时间。然后点击左键并拖动黄色的"Location"引脚，并将其附加到 **Get Actor Location** 函数上。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9f47d8a-0c5b-412b-8e21-cf1f506c277f/getactorlocation.png)
    
    现在只需选择想要的效果。通过点击发射器模板下的"选择资源"，即可获得合适的效果资源列表。P\_Explosion的效果不错，将其选中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0334492-3b6a-45df-b61a-2f5e19ef5a1c/selectparticle.png)
5.  点击 **蓝图编辑器** 左上角的 **编译** 按钮保存修改。
    
6.  如现在按 **运行**，便能看到倒数开始，而倒数数字降为零时，就会发生爆炸。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5cf49fc8-f9b6-4bca-b86b-be1be3d34339/explosion_zero.png)
    
    但本教程中，倒数被设为结束时显示GO！，而非0。由于已使用 **蓝图** 可视化脚本完全取代了C++功能，因此不会发生此情况。此结果并非理想结果，因此需添加对该函数C++版本的调用，此操作可通过右键点击 **Countdown Has Finished** 节点，并在快捷菜单中选择 **添加对父函数的调用（Add call to parent function）** 来完成。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e9c0d2f-37e9-42ea-9ccd-9309b851a4c0/calltoparent_menu.png)
    
    完成该步骤后，**事件图表** 将创建一个名为 **Parent: Countdown Has Finished** 的节点。通常，这类父节点可以直接连接到事件节点。这里，我们就这么做，虽然这不是强制的。这个"父调用"节点和其他节点一样，可以在任何位置调用，甚至可以调用多次。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd318eaf-8efb-4e05-82a0-6a58dce65fad/calltoparent_connectpins.png)
    
    注意：该操作会断开原有与 **Spawn Emitter At Location** 的连接，因此需重新连接。programming-and-scripting/programming-language-implementation/cpp-in-unreal-engine/unreal-engine-cpp-tutorials
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e69dad8f-e90b-4bdc-a190-db20b79a11df/calltoparent_fixpins.png)
    
    现在运行游戏，倒数结束后应能同时看到"GO！"（来自C++编码）和爆炸（来自蓝图图表）！
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6867dbf7-a130-49b9-88ec-6ea4a3ea79c7/explosion_go.png)

## 4.自行尝试！

利用所学内容，尝试以下操作：

-   创建在 **事件** 运行时移动或旋转至目标变换的 **Actor**。其在游戏中可用作移动平台或门。使事件启动 **定时器**，该定时器将触发第二个事件，将把Actor移回起始位置。在合适的情况下，使用公开变量（即通过 `UPROPERTY` 公开），而非对值进行硬编码。
-   使用定时器句柄和部分自定义事件，创建即将燃尽（通过停用炽热的 **粒子系统组件**）的火炬。例如，AddFuel事件可延长火炬的燃烧时间。DouseWithWater事件可将其立即终止关闭，并防止AddFuel在之后起效。可在不使用 **Tick** 的情况下编写这两个功能，只需在定时器运行时通过其句柄对其进行修改。

关于本教程中包含的细节：

-   欲了解定时器的更多相关信息，请浏览[Gameplay定时器](/documentation/zh-cn/unreal-engine/gameplay-timers-in-unreal-engine)页面。
-   欲了解在类或结构体中对变量使用 `UPROPERTY` 标记的完整参考，请参见[%programming-and-scripting/programming-language-implementation/unreal-engine-reflection-system/Properties:title%](/documentation/zh-cn/unreal-engine/unreal-engine-uproperties)页面。
-   欲了解 `UFUNCTIONS` 和事件创建的更多相关信息，请查看[%programming-and-scripting/programming-language-implementation/unreal-engine-reflection-system/Functions:title%](/documentation/zh-cn/unreal-engine/ufunctions-in-unreal-engine)页面。
-   欲学习更多教程，参见[%programming-and-scripting/programming-language-implementation/cpp-in-unreal-engine/tutorials:title%](/documentation/zh-cn/unreal-engine/unreal-engine-cpp-programming-tutorials)页面。

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1.创建使用定时器的Actor](/documentation/zh-cn/unreal-engine/quick-start-guide-to-variables-timers-and-events-in-unreal-engine-cpp#1%E5%88%9B%E5%BB%BA%E4%BD%BF%E7%94%A8%E5%AE%9A%E6%97%B6%E5%99%A8%E7%9A%84actor)
-   [半成品代码](/documentation/zh-cn/unreal-engine/quick-start-guide-to-variables-timers-and-events-in-unreal-engine-cpp#%E5%8D%8A%E6%88%90%E5%93%81%E4%BB%A3%E7%A0%81)
-   [2.向编辑器公开变量和函数](/documentation/zh-cn/unreal-engine/quick-start-guide-to-variables-timers-and-events-in-unreal-engine-cpp#2%E5%90%91%E7%BC%96%E8%BE%91%E5%99%A8%E5%85%AC%E5%BC%80%E5%8F%98%E9%87%8F%E5%92%8C%E5%87%BD%E6%95%B0)
-   [成品代码](/documentation/zh-cn/unreal-engine/quick-start-guide-to-variables-timers-and-events-in-unreal-engine-cpp#%E6%88%90%E5%93%81%E4%BB%A3%E7%A0%81)
-   [3.使用蓝图扩展和覆盖C++](/documentation/zh-cn/unreal-engine/quick-start-guide-to-variables-timers-and-events-in-unreal-engine-cpp#3%E4%BD%BF%E7%94%A8%E8%93%9D%E5%9B%BE%E6%89%A9%E5%B1%95%E5%92%8C%E8%A6%86%E7%9B%96c++)
-   [4.自行尝试！](/documentation/zh-cn/unreal-engine/quick-start-guide-to-variables-timers-and-events-in-unreal-engine-cpp#4%E8%87%AA%E8%A1%8C%E5%B0%9D%E8%AF%95%EF%BC%81)
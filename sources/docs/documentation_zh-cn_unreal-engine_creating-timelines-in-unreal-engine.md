# 创建虚幻引擎时间轴 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-timelines-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:36:07.386Z

---

目录

![创建时间轴](https://dev.epicgames.com/community/api/documentation/image/a2b956c8-3bc4-4138-9bb6-233bbb18df84?resizing_type=fill&width=1920&height=335)

编程语言

×C++

从下拉菜单中选择一个选项以查看与之相关的内容

## 创建时间轴

你可按照以下步骤，在**Actor**类中创建并实例化自定义的**时间轴组件**。

1.  找到你的**C++ Classes文件夹**，并点击**添加+（Add+）**。 在下拉菜单中选择**新建C++类（New C++ Class）**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/0bbaa55c-3003-469f-b874-c7ffb21f93a9?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/0bbaa55c-3003-469f-b874-c7ffb21f93a9?resizing_type=fit)
    
2.  选择**Actor**类作为**父类**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/1c03c897-b812-48c4-9251-c908b6803481?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1c03c897-b812-48c4-9251-c908b6803481?resizing_type=fit)
    
    点击查看大图。
    
3.  将新建的Actor类命名为**Timeline Actor**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/fce2c3a5-aefd-455d-897a-e1c00cc3c15b?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/fce2c3a5-aefd-455d-897a-e1c00cc3c15b?resizing_type=fit)
    
    点击查看大图。
    
4.  找到`TimelineActor.h`文件并包含以下`TimelineComponent`类的库。
    
    TimelineActor.h
    
    `#include "Components/TimelineComponent.h"`
    
    #include &quot;Components/TimelineComponent.h&quot;
    
    复制完整片段(1行长度)
    
5.  在TimelineActor类定义中实现以下类声明：
    
    TimelineActor.h
    
    `   protected:             UPROPERTY(EditAnywhere, BlueprintReadWrite)          UTimelineComponent* ExampleTimelineComp;         `
    
    protected: UPROPERTY(EditAnywhere, BlueprintReadWrite) UTimelineComponent\* ExampleTimelineComp;
    
    复制完整片段(4行长度)
    
    在此代码示例中，你需要使用[属性说明符标签](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-uproperties)**EditAnywhere**和**BlueprintReadWrite**。
    
6.  找到`TimelineActor.cpp`文件，然后将以下代码添加到你的TimelineActor构造函数`ATimelineActor::ATimelineActor()`之中。
    
    TimelineActor.cpp
    
    `   ATimelineActor::ATimelineActor()       {           // Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.           PrimaryActorTick.bCanEverTick = true;           ExampleTimelineComp = CreateDefaultSubobject<UTimelineComponent>(TEXT("TimelineComponent"));       }         `
    
    ATimelineActor::ATimelineActor() { // Set this actor to call Tick() every frame. You can turn this off to improve performance if you don&#39;t need it. PrimaryActorTick.bCanEverTick = true; ExampleTimelineComp = CreateDefaultSubobject&lt;UTimelineComponent&gt;(TEXT(&quot;TimelineComponent&quot;)); }
    
    复制完整片段(6行长度)
    
7.  **编译**你的代码。
    
8.  找到**C++ Classes文件夹**，右键点击你的**TimelineActor**，并基于你的TimelineActor类创建蓝图。 将其命名为**Bp\_TimelineActor**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/1f6716d0-f7e1-4418-96df-a2eadaf862b5?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1f6716d0-f7e1-4418-96df-a2eadaf862b5?resizing_type=fit)
    
9.  创建TimelineActor蓝图后，你可以查看**类默认值（Class Defaults）**。 在**组件（Components）**选项卡中，这时你应该可看到你的时间轴组件示例。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/bd048bc6-1f8b-4594-8de0-d89a75f73c86?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/bd048bc6-1f8b-4594-8de0-d89a75f73c86?resizing_type=fit)
    

### 阶段性代码

TimelineActor.h

```
#pragma once
	#include "Components/TimelineComponent.h"
	#include "CoreMinimal.h"
	#include "GameFramework/Actor.h"
	#include "TimelineActor.generated.h"

	UCLASS()
	class CPPTIMELINE_API ATimelineActor : public AActor
	{
		GENERATED_BODY()
```

展开代码复制完整片段(27行长度)

TimelineActor.cpp

```
#include "TimelineActor.h"

	// Sets default values
	ATimelineActor::ATimelineActor()
	{
		// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
		PrimaryActorTick.bCanEverTick = true;
		ExampleTimelineComp = CreateDefaultSubobject<UTimelineComponent>(TEXT("TimelineComponent"));
	}

```

展开代码复制完整片段(21行长度)

## 时间轴变量

当你在C++中使用`UProperty说明符`创建时间轴组件后，该组件会成为**组件（Components）**选项卡中的可用变量。 对于想要继续通过蓝图脚本对时间轴组件进行迭代的设计人员来说， 这个变量很有用。

[![](https://dev.epicgames.com/community/api/documentation/image/4ae48be3-1578-4170-b38b-b6285f077912?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/4ae48be3-1578-4170-b38b-b6285f077912?resizing_type=fit)

上图显示了使用原生C++时间轴变量获取蓝图中时间轴的当前播放速率（Current Play Rate）值。

如需了解全部的可用蓝图时间轴节点及其功能详情，请参阅[时间轴节点](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/timelines-nodes-in-unreal-engine)页面。

## 创建FTimeLineEvent

时间轴事件（`FOnTimelineEvent`）属于[动态委托](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dynamic-delegates-in-unreal-engine)，可以为时间轴组件提供处理事件的能力。 请按以下步骤创建你自己的`FTimeLineEvent`，并将其绑定到你的时间轴组件的已完成功能。

1.  找到`TimelineActor.h`文件并在**类定义**中声明以下代码：
    
    TimelineActor.h
    
    `   protected:              //Delegate signature for the function which will handle our Finished event.           FOnTimelineEvent TimelineFinishedEvent;              UFUNCTION()           void TimelineFinishedFunction();         `
    
    protected: //Delegate signature for the function which will handle our Finished event. FOnTimelineEvent TimelineFinishedEvent; UFUNCTION() void TimelineFinishedFunction();
    
    复制完整片段(7行长度)
    
2.  找到`TimelineActor.cpp`，并实现以下代码：
    
    TimelineActor.cpp
    
    `   void ATimelineActor::TimelineFinishedFunction()        {           UE_LOG(LogTemp, Warning, TEXT("Finished Event Called."));        }         `
    
    void ATimelineActor::TimelineFinishedFunction() { UE\_LOG(LogTemp, Warning, TEXT(&quot;Finished Event Called.&quot;)); }
    
    复制完整片段(4行长度)
    
3.  找到`ATimelineActor::BeginPlay()`方法，并实现以下代码：
    
    TimelineActor.cpp
    
    `   // Called when the game starts or when spawned          void ATimelineActor::BeginPlay()       {           Super::BeginPlay();              TimelineFinishedEvent.BindUFunction(this, FName("TimelineFinishedFunction"));           ExampleTimelineComp->SetTimelineFinishedFunc(TimelineFinishedEvent);           ExampleTimelineComp->PlayFromStart();       }         `
    
    // Called when the game starts or when spawned void ATimelineActor::BeginPlay() { Super::BeginPlay(); TimelineFinishedEvent.BindUFunction(this, FName(&quot;TimelineFinishedFunction&quot;)); ExampleTimelineComp-&gt;SetTimelineFinishedFunc(TimelineFinishedEvent); ExampleTimelineComp-&gt;PlayFromStart(); }
    
    复制完整片段(10行长度)
    
    现在你已成功将`TimelineFinished`事件绑定到自定义`TimelineFinished`函数。
    
4.  编译你的代码。 打开**编辑器（Editor）**并找到**内容浏览器（Content Browser）**。 找到你的**BP\_TimelineActor**并将其拖移到**关卡**中。
    
    [![image alt text](https://dev.epicgames.com/community/api/documentation/image/991ef73f-a8e5-4921-9aaf-d04fc8699cbb?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/991ef73f-a8e5-4921-9aaf-d04fc8699cbb?resizing_type=fit)
    
5.  按下**播放（Play）**按钮。 这时你应该可以在**输出日志（Output Log）**窗口看到以下消息：
    
    [![image alt text](https://dev.epicgames.com/community/api/documentation/image/8408d57d-c947-4278-95a8-1455aeacf6f3?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/8408d57d-c947-4278-95a8-1455aeacf6f3?resizing_type=fit)
    

### 已完成代码

TimelineActor.h

```
#pragma once
	#include "Components/TimelineComponent.h"
	#include "CoreMinimal.h"
	#include "GameFramework/Actor.h"
	#include "TimelineActor.generated.h"

	UCLASS()
	class CPPTIMELINE_API ATimelineActor : public AActor
	{
		GENERATED_BODY()
```

展开代码复制完整片段(35行长度)

TimelineActor.cpp

```
#include "TimelineActor.h"

	// Sets default values
	ATimelineActor::ATimelineActor()
	{
		// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
		PrimaryActorTick.bCanEverTick = true;
		ExampleTimelineComp = CreateDefaultSubobject<UTimelineComponent>(TEXT("TimelineComponent"));
	}

```

展开代码复制完整片段(31行长度)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建时间轴](/documentation/zh-cn/unreal-engine/creating-timelines-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%97%B6%E9%97%B4%E8%BD%B4)
-   [阶段性代码](/documentation/zh-cn/unreal-engine/creating-timelines-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%80%A7%E4%BB%A3%E7%A0%81)
-   [时间轴变量](/documentation/zh-cn/unreal-engine/creating-timelines-in-unreal-engine#%E6%97%B6%E9%97%B4%E8%BD%B4%E5%8F%98%E9%87%8F)
-   [创建FTimeLineEvent](/documentation/zh-cn/unreal-engine/creating-timelines-in-unreal-engine#%E5%88%9B%E5%BB%BAftimelineevent)
-   [已完成代码](/documentation/zh-cn/unreal-engine/creating-timelines-in-unreal-engine#%E5%B7%B2%E5%AE%8C%E6%88%90%E4%BB%A3%E7%A0%81)
# 在虚幻引擎中实现开门效果。 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/opening-doors-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:36:09.893Z

---

目录

![开门](https://dev.epicgames.com/community/api/documentation/image/b9fbebb7-a5b4-4258-9ab7-380937bf6e76?resizing_type=fill&width=1920&height=335)

编程语言

×C++

从下拉菜单中选择一个选项以查看与之相关的内容

本示例使用了C++**[时间轴](programming-and-scripting/blueprints-visual-scripting/UserGuide/Timelines)**来创建经典的基于距离的开门动画。

## 创建门Actor

1.  使用**空白（Blank）**模板新建一个**C++**项目，并启用**初学者内容包（Starter Content）**，将其命名为**TimelineDoorActor**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/afd22122-3be7-4653-a98f-639fbbb210c9?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/afd22122-3be7-4653-a98f-639fbbb210c9?resizing_type=fit)
    
    点击查看大图。
    
2.  找到**内容浏览器**，点击**C++ Classes**文件夹，然后点击**添加（+）（Add (+)）**按钮并选择**新建C++类（New C++ Class）**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/fab9945c-e5dd-4527-bf0b-6fddaa36fe21?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/fab9945c-e5dd-4527-bf0b-6fddaa36fe21?resizing_type=fit)
    
    点击查看大图。
    
3.  选择**Actor**作为**父类**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/7e3eda74-e913-4c1d-95a6-00a8c1430be9?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/7e3eda74-e913-4c1d-95a6-00a8c1430be9?resizing_type=fit)
    
    点击查看大图。
    
4.  将创建的Actor命名为**DoorActor**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/bd263128-8133-4a22-ac9f-c31e9fb51167?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/bd263128-8133-4a22-ac9f-c31e9fb51167?resizing_type=fit)
    
    点击查看大图。
    
5.  新建Actor后，**Visual Studio**会自动打开`DoorActor.h`以及`DoorActor.cpp`文件。 找到`DoorActor.h`文件并声明如下内容：
    
    DoorActor.h
    
    `#include "Components/TimelineComponent.h"`
    
    #include &quot;Components/TimelineComponent.h&quot;
    
    复制完整片段(1行长度)
    
6.  接下来，在`DoorActor`类定义中添加以下代码：
    
    DoorActor.h
    
    ```
    protected:
    
             //MeshComponents to represent Door assets
             UPROPERTY(VisibleAnywhere, BlueprintReadWrite)
             UStaticMeshComponent* DoorFrame;
             UPROPERTY(VisibleAnywhere, BlueprintReadWrite)
             UStaticMeshComponent* Door;
    
             //TimelineComponent to animate Door meshes
             UPROPERTY(VisibleAnywhere, BlueprintReadWrite)
    ```
    
    展开代码复制完整片段(15行长度)
    
7.  找到`DoorActor.cpp`。 需要包括以下类库，方可利用你的盒体组件。
    
    DoorActor.cpp
    
    `#include "Components/BoxComponent.h"`
    
    #include &quot;Components/BoxComponent.h&quot;
    
    复制完整片段(1行长度)
    
8.  在你的`ADoorActor::ADoorActor`构造函数中声明以下内容：
    
    DoorActor.cpp
    
    ```
    // Sets default values
         ADoorActor::ADoorActor()
         {
             // Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
             PrimaryActorTick.bCanEverTick = true;
    
             //Create our Default Components
             DoorFrame = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("DoorFrameMesh"));
             Door = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("DoorMesh"));
             DoorTimelineComp = CreateDefaultSubobject<UTimelineComponent>(TEXT("DoorTimelineComp"));
    ```
    
    展开代码复制完整片段(17行长度)
    
    *注意*：我们将门的相对变换保留为附件规则，以便稍后使用门Actor的自定义方法来操作它。 详情请参阅FAttachmentTransformRules。
    
9.  编译你的代码。
    

## 设置门静态网格体

你需要设置**静态网格体（Static Mesh）**资产，直观地表示你的DoorFrame和Door静态网格体组件。

1.  在**内容浏览器**中，找到你的**C++ Classes文件夹**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/867bcc7e-2b7f-4707-be5a-7f867d24ae02?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/867bcc7e-2b7f-4707-be5a-7f867d24ae02?resizing_type=fit)
    
2.  右键点击你的**DoorActor**类，选择**基于DoorActor创建蓝图类（Create Blueprint Class based on DoorActor）**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/225288f5-ea85-4d63-9e20-5869a90fc8c6?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/225288f5-ea85-4d63-9e20-5869a90fc8c6?resizing_type=fit)
    
3.  将你的蓝图Actor命名为**Bp\_DoorActor**并将其放入相应的文件夹。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/4749edbf-b45b-469e-ac04-5a18ee65c842?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/4749edbf-b45b-469e-ac04-5a18ee65c842?resizing_type=fit)
    
    点击查看大图。
    
4.  在**组件（Components）**选项卡中，选择**DoorFrame**静态网格体组件。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/f78b561d-dc87-4cd7-9269-41c3b42be8a1?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f78b561d-dc87-4cd7-9269-41c3b42be8a1?resizing_type=fit)
    
5.  找到**细节（Details）面板**，将**静态网格体**更改为**SM\_DoorFrame**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/1bd71fee-9d86-4743-9f8e-7fba6700cfc9?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1bd71fee-9d86-4743-9f8e-7fba6700cfc9?resizing_type=fit)
    
6.  找到**组件（Components）**选项卡，选择**DoorMesh**组件。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/a999e6f1-a07c-45db-b371-c121181e835f?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/a999e6f1-a07c-45db-b371-c121181e835f?resizing_type=fit)
    
7.  在**细节（Details）**面板中，将**静态网格体**更改为**SM\_Door**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/6c39361a-3d98-48cd-aacb-91d485d294b7?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6c39361a-3d98-48cd-aacb-91d485d294b7?resizing_type=fit)
    
8.  然后找到**变换（Transform）**类别，将**Y位置（Y Location）**的值更改为**45.0**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/adbe8966-9975-4d4a-8fea-c91e5336755f?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/adbe8966-9975-4d4a-8fea-c91e5336755f?resizing_type=fit)
    
9.  点击**编译（Compile）**和**保存（Save）**按钮。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/1b3fa282-ca6c-40d8-a782-66405008d82b?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1b3fa282-ca6c-40d8-a782-66405008d82b?resizing_type=fit)
    

## 创建UCurveFloat和时间轴事件轨道

时间轴组件需要[时间轴曲线](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/keys-and-curves-in-unreal-engine)。 每个曲线都可以包含多个关键点，用于定义时间和值。曲线会为这些关键点插值，以计算时间轴中任意点的值。

我们将在此例中使用UCurveFloat。

1.  找到`DoorActor.h`中的`ADoorActor`类定义，并声明如下变量：
    
    DoorActor.h
    
    ```
    public:
             // Variable to hold the Curve asset
             UPROPERTY(EditAnywhere)
             UCurveFloat* DoorTimelineFloatCurve;
    
         private:
             //Float Track Signature to handle our update track event
             FOnTimelineFloat UpdateFunctionFloat;
    
             //Function which updates our Door's relative location with the timeline graph
    ```
    
    展开代码复制完整片段(12行长度)
    
2.  找到`DoorActor.cpp`并实现`UpdateTimelineComp`方法：
    
    DoorActor.cpp
    
    `   void ADoorActor::UpdateTimelineComp(float Output)       {           // Create and set our Door's new relative location based on the output from our Timeline Curve           FRotator DoorNewRotation = FRotator(0.0f, Output, 0.f);           Door->SetRelativeRotation(DoorNewRotation);       }         `
    
    void ADoorActor::UpdateTimelineComp(float Output) { // Create and set our Door&#39;s new relative location based on the output from our Timeline Curve FRotator DoorNewRotation = FRotator(0.0f, Output, 0.f); Door-&gt;SetRelativeRotation(DoorNewRotation); }
    
    复制完整片段(6行长度)
    
3.  然后，在`BeginPlay`方法中添加以下代码：
    
    DoorActor.cpp
    
    `   //Binding our float track to our UpdateTimelineComp Function's output       UpdateFunctionFloat.BindDynamic(this, &ADoorActor::UpdateTimelineComp);          //If we have a float curve, bind it's graph to our update function       if (DoorTimelineFloatCurve)       {          DoorTimelineComp->AddInterpFloat(DoorTimelineFloatCurve, UpdateFunctionFloat);       }         `
    
    //Binding our float track to our UpdateTimelineComp Function&#39;s output UpdateFunctionFloat.BindDynamic(this, &amp;ADoorActor::UpdateTimelineComp); //If we have a float curve, bind it&#39;s graph to our update function if (DoorTimelineFloatCurve) { DoorTimelineComp-&gt;AddInterpFloat(DoorTimelineFloatCurve, UpdateFunctionFloat); }
    
    复制完整片段(8行长度)
    
4.  编译你的代码。
    

## 阶段性代码

DoorActor.h

```
// Copyright 1998-2022 Epic Games, Inc. All Rights Reserved.
	#pragma once
	#include "Components/TimelineComponent.h"
	#include "CoreMinimal.h"
	#include "GameFramework/Actor.h"
	#include "DoorActor.generated.h"

	UCLASS()
	class TIMELINEDOORACTOR_API ADoorActor : public AActor
	{
```

展开代码复制完整片段(53行长度)

DoorActor.cpp

```
//Copyright 1998-2022 Epic Games, Inc. All Rights Reserved.

	#include "DoorActor.h"
	#include "Components/BoxComponent.h"

	// Sets default values
	ADoorActor::ADoorActor()
	{
		// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
		PrimaryActorTick.bCanEverTick = true;
```

展开代码复制完整片段(51行长度)

## 创建并绑定盒体碰撞重叠事件

盒体组件需要拥有在Actor进入或离开碰撞边界时做出反应的能力。

1.  找到你的`DoorActor.h`文件的类定义并声明如下内容：
    
    DoorActor.h
    
    `   // Begin and End Overlap Events for our DoorProxVolume       UFUNCTION()       void OnOverlapBegin(class UPrimitiveComponent* OverlappedComp, class AActor* OtherActor, class UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult);          UFUNCTION()       void OnOverlapEnd(class UPrimitiveComponent* OverlappedComp, class AActor* OtherActor, class UPrimitiveComponent* OtherComp, int32 OtherBodyIndex);         `
    
    // Begin and End Overlap Events for our DoorProxVolume UFUNCTION() void OnOverlapBegin(class UPrimitiveComponent\* OverlappedComp, class AActor\* OtherActor, class UPrimitiveComponent\* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult&amp; SweepResult); UFUNCTION() void OnOverlapEnd(class UPrimitiveComponent\* OverlappedComp, class AActor\* OtherActor, class UPrimitiveComponent\* OtherComp, int32 OtherBodyIndex);
    
    复制完整片段(6行长度)
    
2.  接下来，找到你的`DoorActor.cpp`文件，实现`OnOverlapBegin`和`OnOverlapEnd`类方法：
    
    DoorActor.cpp
    
    `   void ADoorActor::OnOverlapBegin(UPrimitiveComponent * OverlappedComp, AActor * OtherActor, UPrimitiveComponent * OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult & SweepResult)       {           DoorTimelineComp->Play();       }          void ADoorActor::OnOverlapEnd(UPrimitiveComponent * OverlappedComp, AActor * OtherActor, UPrimitiveComponent * OtherComp, int32 OtherBodyIndex)       {           DoorTimelineComp->Reverse();       }         `
    
    void ADoorActor::OnOverlapBegin(UPrimitiveComponent \* OverlappedComp, AActor \* OtherActor, UPrimitiveComponent \* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult &amp; SweepResult) { DoorTimelineComp-&gt;Play(); } void ADoorActor::OnOverlapEnd(UPrimitiveComponent \* OverlappedComp, AActor \* OtherActor, UPrimitiveComponent \* OtherComp, int32 OtherBodyIndex) { DoorTimelineComp-&gt;Reverse(); }
    
    复制完整片段(9行长度)
    
3.  在`BeginPlay`方法中绑定重叠函数，如下所示：
    
    DoorActor.cpp
    
    ```
    void ADoorActor::BeginPlay()
         {
             Super::BeginPlay();
    
             //Binding our float track to our UpdateTimelineComp Function's output
             UpdateFunctionFloat.BindDynamic(this, &ADoorActor::UpdateTimelineComp);
    
             //If we have a float curve, bind it's graph to our update function
             if (DoorTimelineFloatCurve)
             {
    ```
    
    展开代码复制完整片段(17行长度)
    
4.  编译你的代码。
    

## 在虚幻编辑器中创建曲线资产

你必须在**虚幻编辑器**中创建**曲线资产**，以将其指定给你的时间轴Actor蓝图。

1.  找到**内容浏览器**，选择**添加（+）（Add (+)）> 杂项（Miscellaneous）> 曲线（Curve）**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/6daa4437-dbe1-4689-ac1a-1cb45e3e5b82?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6daa4437-dbe1-4689-ac1a-1cb45e3e5b82?resizing_type=fit)
    
2.  选择**CurveFloat**并将资产命名为**DoorCurveFloat**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/47554ecc-0913-4bd8-97f1-638a46848df3?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/47554ecc-0913-4bd8-97f1-638a46848df3?resizing_type=fit)
    
3.  双击新建的**DoorCurveFloat**，打开**时间轴编辑器**。
    
4.  右键点击**图表（Graph）**，然后选择**添加关键点（Add Key）**，为浮点曲线添加两个关键点。 将第一个关键点的时间值调整为**(0, 0)**。 将第二个关键点的时间值调整为**(4, 90)**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/2e44af14-6980-4131-abe0-b7481cff94d4?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/2e44af14-6980-4131-abe0-b7481cff94d4?resizing_type=fit)
    
    点击查看大图。
    
    如需详细了解**时间轴**曲线的编辑方法，请参阅[关键点和曲线](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/keys-and-curves-in-unreal-engine)。
    
5.  按住**Shift**键并点击以选中这两个关键点，右键点击**图表（Graph）**，将它们设置为**自动（Auto）**插值。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/3302706f-256b-4ba5-9fe5-22a7ed7cd33c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/3302706f-256b-4ba5-9fe5-22a7ed7cd33c?resizing_type=fit)
    
    点击查看大图。
    
6.  现在你的曲线内容应如下所示。 保存你的**DoorCuveFloat**并关闭**时间轴编辑器**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/22b402d7-2209-4a49-b0d1-b8301a00a804?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/22b402d7-2209-4a49-b0d1-b8301a00a804?resizing_type=fit)
    
    点击查看大图。
    
7.  打开你的**Bp\_DoorActor**并在**组件（Components）**选项卡中选择**Bp\_DoorActor**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/d5916971-683c-4ee9-890b-f70de85503b0?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/d5916971-683c-4ee9-890b-f70de85503b0?resizing_type=fit)
    
8.  找到**细节（Details）**面板，打开**门操作（Door Action）**分段的**门时间轴浮点曲线（Door Timeline Float Curve）**下拉菜单，选择**DoorCurveFloat**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/991d6a5d-5141-4d66-a090-31ef37090cb3?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/991d6a5d-5141-4d66-a090-31ef37090cb3?resizing_type=fit)
    
9.  找到**内容浏览器**并将**Bp\_DoorActor**放入**关卡**。
    
10.  编译并保存，然后按PIE。
    
    *你可以使用WASD键进行输入，以控制旁观者Pawn。 找到你的DoorActor的碰撞边界时，你可以观察时间轴的播放，而在退出边界时，可以观察到时间轴倒放。*
    

## 已完成代码

DoorActor.h

```
// Copyright 1998-2022 Epic Games, Inc. All Rights Reserved.

	#pragma once
	#include "Components/TimelineComponent.h"
	#include "CoreMinimal.h"
	#include "GameFramework/Actor.h"
	#include "DoorActor.generated.h"

	UCLASS()
	class TIMELINEDOORACTOR_API ADoorActor : public AActor
```

展开代码复制完整片段(61行长度)

DoorActor.cpp

```
// Copyright 1998-2022 Epic Games, Inc. All Rights Reserved.

	#include "DoorActor.h"
	#include "Components/BoxComponent.h"

	// Sets default values
	ADoorActor::ADoorActor()
	{
		// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
		PrimaryActorTick.bCanEverTick = true;
```

展开代码复制完整片段(64行长度)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [蓝图](https://dev.epicgames.com/community/search?query=%E8%93%9D%E5%9B%BE)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建门Actor](/documentation/zh-cn/unreal-engine/opening-doors-in-unreal-engine#%E5%88%9B%E5%BB%BA%E9%97%A8actor)
-   [设置门静态网格体](/documentation/zh-cn/unreal-engine/opening-doors-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E9%97%A8%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [创建UCurveFloat和时间轴事件轨道](/documentation/zh-cn/unreal-engine/opening-doors-in-unreal-engine#%E5%88%9B%E5%BB%BAucurvefloat%E5%92%8C%E6%97%B6%E9%97%B4%E8%BD%B4%E4%BA%8B%E4%BB%B6%E8%BD%A8%E9%81%93)
-   [阶段性代码](/documentation/zh-cn/unreal-engine/opening-doors-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%80%A7%E4%BB%A3%E7%A0%81)
-   [创建并绑定盒体碰撞重叠事件](/documentation/zh-cn/unreal-engine/opening-doors-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%B9%B6%E7%BB%91%E5%AE%9A%E7%9B%92%E4%BD%93%E7%A2%B0%E6%92%9E%E9%87%8D%E5%8F%A0%E4%BA%8B%E4%BB%B6)
-   [在虚幻编辑器中创建曲线资产](/documentation/zh-cn/unreal-engine/opening-doors-in-unreal-engine#%E5%9C%A8%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E5%88%9B%E5%BB%BA%E6%9B%B2%E7%BA%BF%E8%B5%84%E4%BA%A7)
-   [已完成代码](/documentation/zh-cn/unreal-engine/opening-doors-in-unreal-engine#%E5%B7%B2%E5%AE%8C%E6%88%90%E4%BB%A3%E7%A0%81)
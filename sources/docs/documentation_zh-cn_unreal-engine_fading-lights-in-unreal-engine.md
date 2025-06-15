# 在虚幻引擎中实现灯光闪烁 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fading-lights-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:36:17.552Z

---

目录

![实现灯光闪烁](https://dev.epicgames.com/community/api/documentation/image/0757302a-be82-49ac-858a-d3102e765195?resizing_type=fill&width=1920&height=335)

编程语言

×C++

从下拉菜单中选择一个选项以查看与之相关的内容

本文将介绍如何建立能够在接触时变色并随时间闪烁的光源Actor。

我们将用到[点光源组件](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/point-lights-in-unreal-engine)，该组件包含一个作为重叠触发器的盒体组件，以及一个用于操控点光源Actor的时间轴组件。

## 创建能够熄灭的光源Actor

1.  使用**空白（Blank）**模板新建一个**C++**项目，将项目命名为**FadingLights**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/4c1d373f-21f8-4a65-810c-51e9d4045343?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/4c1d373f-21f8-4a65-810c-51e9d4045343?resizing_type=fit)
    
    点击查看大图。
    
2.  找到**内容浏览器**，点击**C++ Classes**文件夹，然后点击**添加（+）（Add (+)）**按钮并选择**新建C++类（New C++ Class）**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/399502eb-40bb-4e02-b342-36c6fec8e005?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/399502eb-40bb-4e02-b342-36c6fec8e005?resizing_type=fit)
    
    点击查看大图。
    
3.  选择**Actor**作为**父类**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/98d1d781-c99c-41f5-8b60-01978452b5e1?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/98d1d781-c99c-41f5-8b60-01978452b5e1?resizing_type=fit)
    
    点击查看大图。
    
4.  将创建的Actor命名为**LightActor**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/42853d57-ef91-4289-9428-0cf81091efcb?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/42853d57-ef91-4289-9428-0cf81091efcb?resizing_type=fit)
    
    点击查看大图。
    
5.  创建新Actor时，**Visual Studio**会自动打开`LightActor.h`和`LightActor.cpp`文件。 找到`LightActor.h`文件并声明如下内容：
    
    LightActor.h
    
    `#include "Components/TimelineComponent.h"`
    
    #include &quot;Components/TimelineComponent.h&quot;
    
    复制完整片段(1行长度)
    
6.  接下来，在`LightActor`的类定义中添加以下代码：
    
    LightActor.h
    
    ```
    public:
    
                 UPROPERTY(EditAnywhere)
                 UCurveFloat* PointLightFloatCurve;
    
                 UPROPERTY(EditAnywhere)
                 UCurveLinearColor* PointLightColorCurve;
    
         protected:
    
    ```
    
    展开代码复制完整片段(37行长度)
    
7.  找到`LightActor.cpp`并添加以下类库。
    
    LightActor.cpp
    
    `   #include "Components/BoxComponent.h"       #include "Components/PointLightComponent.h"         `
    
    #include &quot;Components/BoxComponent.h&quot; #include &quot;Components/PointLightComponent.h&quot;
    
    复制完整片段(2行长度)
    
8.  在`ALightActor::ALightActor`的构造函数中声明以下内容：
    
    LightActor.cpp
    
    ```
    ALightActor::ALightActor()
         {
             // Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
             PrimaryActorTick.bCanEverTick = true;
    
             //Create our Default Components
             PointLightComp = CreateDefaultSubobject<UPointLightComponent>(TEXT("PointLightComp"));
             LightTimelineComp = CreateDefaultSubobject<UTimelineComponent>(TEXT("LightTimelineComp"));
             LightOverlapVolume = CreateDefaultSubobject<UBoxComponent>(TEXT("LightOverlapVolume"));
    
    ```
    
    展开代码复制完整片段(17行长度)
    
9.  接下来，实现点光源组件的`UFunction`方法：
    
    LightActor.cpp
    
    `   void ALightActor::UpdateLightBrightness(float BrightnessOutput)       {           PointLightComp->SetLightBrightness(BrightnessOutput * 20.0f);       }          void ALightActor::UpdateLightColor(FLinearColor ColorOutput)       {           PointLightComp->SetLightColor(ColorOutput);       }         `
    
    void ALightActor::UpdateLightBrightness(float BrightnessOutput) { PointLightComp-&gt;SetLightBrightness(BrightnessOutput \* 20.0f); } void ALightActor::UpdateLightColor(FLinearColor ColorOutput) { PointLightComp-&gt;SetLightColor(ColorOutput); }
    
    复制完整片段(9行长度)
    
10.  然后，在`BeginPlay`方法中添加以下代码：
    
    LightActor.cpp
    
    ```
    void ALightActor::BeginPlay()
         {
             Super::BeginPlay();
    
             //Binding our float and color track to their respective functions
             UpdateBrightnessTrack.BindDynamic(this, &ALightActor::UpdateLightBrightness);
             UpdateColorTrack.BindDynamic(this, &ALightActor::UpdateLightColor);
    
             //If we have a float curve, bind it's graph to our update function
             if (PointLightFloatCurve)
    ```
    
    展开代码复制完整片段(20行长度)
    
11.  编译你的代码。
    
12.  在**内容浏览器**中找到**C++Classes文件夹**。
    
13.  右键点击**LightActor**，选择 **基于LightActor创建蓝图类（Create Blueprint Class based on LightActor）**，并将蓝图Actor命名为**BP\_LightActor**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/5740aa9c-59b7-467c-9680-55419924aea0?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/5740aa9c-59b7-467c-9680-55419924aea0?resizing_type=fit)
    

BP\_LightActor的类默认值将按照如下方式显示：

[![](https://dev.epicgames.com/community/api/documentation/image/7e5bf94a-3834-489c-9a04-c02c7adcdd50?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/7e5bf94a-3834-489c-9a04-c02c7adcdd50?resizing_type=fit)

点击查看大图。

## 阶段性代码

LightActor.h

```
//Copyright 1998-2022 Epic Games, Inc. All Rights Reserved.

	#pragma once
	#include "Components/TimelineComponent.h"
	#include "CoreMinimal.h"
	#include "GameFramework/Actor.h"
	#include "LightActor.generated.h"

	UCLASS()
	class FADINGLIGHTS_API ALightActor : public AActor
```

展开代码复制完整片段(63行长度)

LightActor.cpp

```
//Copyright 1998-2022 Epic Games, Inc. All Rights Reserved.

	#include "LightActor.h"
	#include "Components/BoxComponent.h"
	#include "Components/PointLightComponent.h"

	// Sets default values
	ALightActor::ALightActor()
	{
		// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
```

展开代码复制完整片段(63行长度)

## 创建并绑定碰撞重叠事件

盒体组件需要拥有在Actor进入其碰撞边界时触发**TimelineComponent**的能力。

1.  找到你的`LightActor.h`文件的类定义，并在`BrightnessMultiplier`下声明如下内容：
    
    LightActor.h
    
    `   protected:              UFUNCTION()           void OnOverlapBegin(class UPrimitiveComponent* OverlappedComp, class AActor* OtherActor, class UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult);         `
    
    protected: UFUNCTION() void OnOverlapBegin(class UPrimitiveComponent\* OverlappedComp, class AActor\* OtherActor, class UPrimitiveComponent\* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult&amp; SweepResult);
    
    复制完整片段(4行长度)
    
2.  然后，找到`LightActor.cpp`文件并实现`OnOverlapBegin`函数。
    
    LightActor.cpp
    
    `   void ALightActor::OnOverlapBegin(class UPrimitiveComponent* OverlappedComp, class AActor* OtherActor, class UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult)       {           LightTimelineComp->Play();       }         `
    
    void ALightActor::OnOverlapBegin(class UPrimitiveComponent\* OverlappedComp, class AActor\* OtherActor, class UPrimitiveComponent\* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult&amp; SweepResult) { LightTimelineComp-&gt;Play(); }
    
    复制完整片段(4行长度)
    
3.  在`BeginPlay`方法中绑定重叠函数：
    
    LightActor.cpp
    
    `   //Binding our Box Component to our Light Actor's Overlap Function       LightOverlapVolume->OnComponentBeginOverlap.AddDynamic(this, &ALightActor::OnOverlapBegin);         `
    
    //Binding our Box Component to our Light Actor&#39;s Overlap Function LightOverlapVolume-&gt;OnComponentBeginOverlap.AddDynamic(this, &amp;ALightActor::OnOverlapBegin);
    
    复制完整片段(2行长度)
    
4.  编译你的代码。
    

## 已完成代码

LightActor.h

```
//Copyright 1998-2022 Epic Games, Inc. All Rights Reserved.

	#pragma once
	#include "Components/TimelineComponent.h"
	#include "CoreMinimal.h"
	#include "GameFramework/Actor.h"
	#include "LightActor.generated.h"

	UCLASS()
	class FADINGLIGHTS_API ALightActor : public AActor
```

展开代码复制完整片段(68行长度)

LightActor.cpp

```
//Copyright 1998-2022 Epic Games, Inc. All Rights Reserved.

	// Fill out your copyright notice in the Description page of Project Settings.

	#include "LightActor.h"
	#include "Components/BoxComponent.h"
	#include "Components/PointLightComponent.h"

	// Sets default values
	ALightActor::ALightActor()
```

展开代码复制完整片段(70行长度)

## 设置亮度轨道

当玩家与光源Actor的盒体组件边界重叠时，时间轴组件将需要使用浮点曲线来操控点光源组件的亮度值。

亮度的初始值为**5000**，并将在**5**秒钟内下降到**0**。

1.  找到**内容浏览器**，选择**添加（+）（Add (+)）> 杂项（Miscellaneous）> 曲线（Curve）**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/9fe9e6cc-e283-42e0-b786-a40b337e8693?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9fe9e6cc-e283-42e0-b786-a40b337e8693?resizing_type=fit)
    
2.  选择**CurveFloat**并将资产命名为**BrightnessCurveFloat**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/a0b91414-e3a6-4a6e-8fd8-2cc5811d60a2?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/a0b91414-e3a6-4a6e-8fd8-2cc5811d60a2?resizing_type=fit)
    
3.  双击**BrightnessCurveFloat**，打开**时间轴编辑器**。
    
4.  右键点击**图表（Graph）**，然后选择**添加关键点（Add Key）**，为浮点曲线添加两个关键点。 将第一个关键点的时间值调整为**(0, 5000)**。 将第二个关键点的时间值调整为**(5, 0)**。 你的**BrightnessCurveFloat**应如下所示：
    
    [![](https://dev.epicgames.com/community/api/documentation/image/63e44a2e-0037-4e67-8933-c738f3ee207e?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/63e44a2e-0037-4e67-8933-c738f3ee207e?resizing_type=fit)
    
    点击查看大图。
    
5.  保存**BrightnessCurveFloat**，然后回到**内容浏览器**，双击**BP\_LightActor**以打开**类默认值（Class Defaults）**。
    
6.  前往**细节（Details）**面板，在**点光源浮点曲线（Point Light Float Curve）**下拉菜单中，选择**亮度曲线浮点（Brightness Curve Float）**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/05924b8a-135b-4c4e-8ae0-be257455f1e4?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/05924b8a-135b-4c4e-8ae0-be257455f1e4?resizing_type=fit)
    
7.  点击**编译（Compile）**和**保存（Save）**按钮。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/44a80373-fb9b-44b8-b6ea-7539f7f3f85f?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/44a80373-fb9b-44b8-b6ea-7539f7f3f85f?resizing_type=fit)
    

## 设置颜色轨道

当玩家与光源Actor的盒体组件边界重叠时，PointLight时间轴将需要使用线性颜色曲线轨道来操控点光源组件的颜色属性。

1.  找到**内容浏览器**，选择**添加（+）（Add (+)）> 杂项（Miscellaneous）> 曲线（Curve）**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/a2a8524a-0460-43ea-ace5-aa3a0f235d03?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/a2a8524a-0460-43ea-ace5-aa3a0f235d03?resizing_type=fit)
    
2.  选择**CurveLinearColor**并将资产命名为**LinearColorCurve**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/1ac63294-0c28-4c3b-8b8b-88447e505459?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1ac63294-0c28-4c3b-8b8b-88447e505459?resizing_type=fit)
    
3.  双击**LinearColorCurve**以打开**时间轴编辑器**。
    
4.  双击第一个颜色关键点并修改，将**RGB**值修改为：(**R**：1、**G：**0.665、**B**：0.015)。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/7279ad6d-a913-4b4a-a44f-88cc8e194707?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/7279ad6d-a913-4b4a-a44f-88cc8e194707?resizing_type=fit)
    
    点击查看大图。
    
5.  双击第二个颜色关键点并修改，将**RGB**值修改为：(**R**：0、**G：**0、**B**：0)。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/e0ecfdba-d913-4d1b-9a6e-e56cb57e1513?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e0ecfdba-d913-4d1b-9a6e-e56cb57e1513?resizing_type=fit)
    
    点击查看大图。
    
6.  点击选择**图表**上的第二个**点（Point）**，并将时间设置为**5**秒。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/943dd0ea-4abd-4f33-8918-944d1cdf618d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/943dd0ea-4abd-4f33-8918-944d1cdf618d?resizing_type=fit)
    
    点击查看大图。
    
7.  你的**LinearColorCurve**应如下所示：
    
    [![](https://dev.epicgames.com/community/api/documentation/image/b2e7bb8c-5f48-44b3-aad8-1eb56922f7df?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/b2e7bb8c-5f48-44b3-aad8-1eb56922f7df?resizing_type=fit)
    
    点击查看大图。
    
8.  保存**LinearColorCurve**，然后回到内容浏览器，双击**BP\_LightActor**以打开类默认值。
    
9.  前往**细节（Details）**面板，在**点光源浮点曲线（Point Light Float Curve）**下拉菜单中，选择**亮度曲线浮点（Brightness Curve Float）**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/44b09b3b-494e-48b8-be45-d1041f2105ec?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/44b09b3b-494e-48b8-be45-d1041f2105ec?resizing_type=fit)
    
10.  点击**编译（Compile）**和**保存（Save）**按钮。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/2e39628a-0a4b-4dfc-89a3-903b1a041263?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/2e39628a-0a4b-4dfc-89a3-903b1a041263?resizing_type=fit)
    

## 关卡设置

为了充分展示你编写的代码的功能，需要从关卡中删除所有光源Actor。

1.  在**内容浏览器**中找到**BP\_LightActor**资产，将其选中并拖入**关卡**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/134ce701-0e2c-4ac4-bdbf-94025f09b2a7?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/134ce701-0e2c-4ac4-bdbf-94025f09b2a7?resizing_type=fit)
    
    点击查看大图。
    
2.  在**世界大纲视图**中选择**BP\_LightActor**，找到**细节（Details）**面板并将**位置（Location）**设置设为**(0, 0, 300)**，将**缩放（Scale）**设置设为**(10, 10, 10)**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/14aa8dbe-78a0-41fa-83a0-5f47276c97d9?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/14aa8dbe-78a0-41fa-83a0-5f47276c97d9?resizing_type=fit)
    
3.  在**世界大纲视图**中删除**定向光源Actor（DirectionalLight Actor）**。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/d17eaa17-0812-4238-b93f-b4956d21dc56?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/d17eaa17-0812-4238-b93f-b4956d21dc56?resizing_type=fit)
    
4.  关卡内容应如下所示。
    
    [![](https://dev.epicgames.com/community/api/documentation/image/f4c89593-d31d-4801-b35f-39e33af5ada7?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f4c89593-d31d-4801-b35f-39e33af5ada7?resizing_type=fit)
    
    点击查看大图。
    

## 最终结果

现在，光源Actor和关卡已经完成设置，点击**运行(PIE)（Play (PIE)）**即可自动持有旁观者Pawn。

你可以控制旁观者Pawn，可以找到光源Actor的盒体组件边界。

触发时间轴组件的播放功能之后，光源应该开始在5秒的时间跨度内变换颜色和亮度。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [蓝图](https://dev.epicgames.com/community/search?query=%E8%93%9D%E5%9B%BE)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建能够熄灭的光源Actor](/documentation/zh-cn/unreal-engine/fading-lights-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%83%BD%E5%A4%9F%E7%86%84%E7%81%AD%E7%9A%84%E5%85%89%E6%BA%90actor)
-   [阶段性代码](/documentation/zh-cn/unreal-engine/fading-lights-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%80%A7%E4%BB%A3%E7%A0%81)
-   [创建并绑定碰撞重叠事件](/documentation/zh-cn/unreal-engine/fading-lights-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%B9%B6%E7%BB%91%E5%AE%9A%E7%A2%B0%E6%92%9E%E9%87%8D%E5%8F%A0%E4%BA%8B%E4%BB%B6)
-   [已完成代码](/documentation/zh-cn/unreal-engine/fading-lights-in-unreal-engine#%E5%B7%B2%E5%AE%8C%E6%88%90%E4%BB%A3%E7%A0%81)
-   [设置亮度轨道](/documentation/zh-cn/unreal-engine/fading-lights-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E4%BA%AE%E5%BA%A6%E8%BD%A8%E9%81%93)
-   [设置颜色轨道](/documentation/zh-cn/unreal-engine/fading-lights-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E9%A2%9C%E8%89%B2%E8%BD%A8%E9%81%93)
-   [关卡设置](/documentation/zh-cn/unreal-engine/fading-lights-in-unreal-engine#%E5%85%B3%E5%8D%A1%E8%AE%BE%E7%BD%AE)
-   [最终结果](/documentation/zh-cn/unreal-engine/fading-lights-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
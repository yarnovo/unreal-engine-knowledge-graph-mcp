# Unreal Engine CPP Quick Start | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-cpp-quick-start
> 
> 生成时间: 2025-06-14T19:33:33.278Z

---

目录

![编程快速入门](https://dev.epicgames.com/community/api/documentation/image/dc285482-0d80-4d35-870c-1d89c6323b79?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [内容浏览器界面](/documentation/zh-cn/unreal-engine/content-browser-interface-in-unreal-engine)

选择操作系统：

Windows macOS Linux ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1750948f-9c57-4eac-b1c6-8502ac9ca64f/programmingquickstarttopic.png)

在本快速入门指南中，你将学到如何在虚幻引擎中设置C++项目及在Visual Studio中编写首个C++ gameplay类。学完本教程后将了解如何进行下列操作：

-   创建新的C++项目
-   用C++创建新的Actor类
-   在开发环境中编辑该C++类，添加可视化展示和功能
-   编译项目
-   在虚幻编辑器中测试新Actor

本指南假定已将Visual Studio设为编程环境。如未设置，请参见[为虚幻引擎设置Visual Studio](/documentation/404)了解Visual Studio安装和设置说明，以便将其用于虚幻引擎编程。我们还假定你在开始学习本指南前对使用 **虚幻编辑器** 有一定了解，但为方便起见，我们将逐一介绍从编辑器创建和管理C++类的所有必要步骤。本指南的最终产物将是一个在半空中轻盈地漂浮并不断旋转的立方体，让你在学习使用开发环境进行编程时拥有一个用来测试的简单对象。

本指南假定已将XCode设为编程环境。我们还假定你在开始学习本指南前对使用 **虚幻编辑器** 有一定了解，但为方便起见，我们将逐一介绍从编辑器创建和管理C++类的所有必要步骤。本指南的最终产物将是一个在半空中轻盈地漂浮并不断旋转的立方体，让你在学习使用开发环境进行编程时拥有一个用来测试的简单对象。

## 1\. 必要设置

启动 **虚幻编辑器**。在 **项目浏览器** 窗口弹出后，点击 **游戏** 分类并选择 **空白** 模板。确保已启用了 **C++** 和 **初学者内容包**，选择项目的 **保存位置（Save Location）** 和 **名称**，然后点击 **创建项目（Create Project）**。在本示例中，我们将项目命名为QuickStart。

此操作将自动创建简单的空白项目，在解决方案中只有基本C++代码，而且其会自动在虚幻编辑器及Visual Studio中打开。欲了解管理和创建项目的更多信息，请参见[项目浏览器](/documentation/zh-cn/unreal-engine/creating-a-new-project-in-unreal-engine)页面。

此操作将自动创建简单的空白项目，在解决方案中只有基本C++代码，而且其会自动在虚幻编辑器及XCode中打开。欲了解管理和创建项目的更多信息，请参见[项目浏览器](/documentation/zh-cn/unreal-engine/creating-a-new-project-in-unreal-engine)页面。

任何蓝图项目均可转换为C++项目。如要对蓝图项目添加C++，请按下一节的说明创建新的C++类，编辑器将设置代码环境。 另外请注意，使用C++项目并不会妨碍使用蓝图。C++项目不过是使用C++代替蓝图来设置项目的基本类。

## 2\. 创建新C++类

1.  在 **虚幻编辑器** 中，点击 **文件（File）** 下拉菜单，然后选择 **新建C++类...（New C++ Class...）** 命令。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d9cd501-2a8b-4f2f-aca6-c32d1867b0e8/prquickstart_2-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d9cd501-2a8b-4f2f-aca6-c32d1867b0e8/prquickstart_2-1.png)
    
    点击查看大图。
    
2.  此时将显示 **选择父类（Choose Parent Class）** 菜单。可以选择要扩展的现有类，将其功能添加到自己的类。选择 **Actor**，因为其是可在场景中放置的最基本对象类型，然后点击 **下一步（Next）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/301eefc2-6bfc-44a7-93a5-55fa20f54212/prquickstart_2-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/301eefc2-6bfc-44a7-93a5-55fa20f54212/prquickstart_2-2.png)
    
    点击查看大图。
    
3.  在 **为新Actor命名（Name Your New Actor）** 菜单中，将Actor命名为 **FloatingActor**，然后点击 **创建类（Create Class）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c2ebe41-93bb-4603-aefd-b28922c502f0/prquickstart_2-3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c2ebe41-93bb-4603-aefd-b28922c502f0/prquickstart_2-3.png)
    
    点击查看大图。
    
    在内容浏览器中选中新类后，虚幻引擎将会自动编译并重新加载它，编程环境也将随 `FloatingActor.cpp` 自动打开。
    

## 3\. 编辑C++类

现在我们已创建C++类，将切换到Visual Studio并编辑代码。

1.  在 **Visual Studio** 中，找到默认情况下显示在窗口左侧的 **解决方案浏览器**，然后用其找到 `FloatingActor.h`。在项目中，它将位于 **Games> QuickStart > Source > QuickStart** 下。
    
    ![解决方案浏览器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df6e8ae0-0930-4c7e-b424-ab787ae678db/prquickstart_3-1.png)
2.  双击 `FloatingActor.h` 打开它，并在文本编辑器中将它放到前台。
    
    ![打开标头文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ffc2357-7a59-4aa3-8c04-911e6b16e65e/prquickstart_3-2.png)
    
    此为 *标头* 文件。可以将它视作C++类的目录之类的东西。 要开始编译任何新功能，必须首先声明在此文件中使用的所有新 **变量** 或 **函数**。
    
3.  在 **AFloatingActor()** 的声明下面添加下列代码：
    
    ```cpp
             UPROPERTY(VisibleAnywhere)
             UStaticMeshComponent* VisualMesh;
    		
    ```
    
    这里声明的是 **StaticMeshComponent**，它将担当对象的视觉表示。请注意，它使用 **UProperty** 宏，这使它在虚幻编辑器中可见。 欲了解UProperty及其说明符的更多信息，请参见[属性](/documentation/zh-cn/unreal-engine/unreal-engine-uproperties)页面。
    
4.  现在打开 `FloatingActor.cpp`，在 **AFloatingActor::AFloatingActor()** 中将下列代码添加到右大括号前：
    
    ```cpp
             VisualMesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Mesh"));
             VisualMesh->SetupAttachment(RootComponent);
    		
             static ConstructorHelpers::FObjectFinder<UStaticMesh> CubeVisualAsset(TEXT("/Game/StarterContent/Shapes/Shape_Cube.Shape_Cube"));
    		
             if (CubeVisualAsset.Succeeded())
             {
                 VisualMesh->SetStaticMesh(CubeVisualAsset.Object);
                 VisualMesh->SetRelativeLocation(FVector(0.0f, 0.0f, 0.0f));
             }
    		
    ```
    
    此函数是 *构造函数*，它在类首次创建时告诉该类如何初始化自身。我们添加的代码将会在VisualMesh引用中填充新的StaticMeshComponent、 将它附加到Actor，并将它设为 **初学者内容包** 资源中的立方体模型。欲了解在代码中附加组件的更多信息，请参见[创建和附加组件](/documentation/zh-cn/unreal-engine/quick-start-guide-to-components-and-collision-in-unreal-engine-cpp)的指南。
    
5.  在 **AFloatingActor::Tick(float DeltaTime)** 中将下列代码添加到右大括号前：
    
    ```cpp
             FVector NewLocation = GetActorLocation();
             FRotator NewRotation = GetActorRotation();
             float RunningTime = GetGameTimeSinceCreation();
             float DeltaHeight = (FMath::Sin(RunningTime + DeltaTime) - FMath::Sin(RunningTime));
             NewLocation.Z += DeltaHeight * 20.0f;       //Scale our height by a factor of 20
             float DeltaRotation = DeltaTime * 20.0f;	//Rotate by 20 degrees per second
             NewRotation.Yaw += DeltaRotation;
             SetActorLocationAndRotation(NewLocation, NewRotation);
    		
    ```
    
    我们在 **Tick** 函数中添加要实时执行的代码。在此例中，它将使立方体在上下浮动的同时旋转。 欲了解对Actor进行Tick的更多信息，请参见[Actor更新](/documentation/zh-cn/unreal-engine/actor-ticking-in-unreal-engine)。
    

现在我们已创建C++类，将切换到XCode并编辑代码。

1.  在 **XCode** 中，找到默认情况下显示在窗口左侧的 **项目导航器**，然后用其找到 `FloatingActor.h`。在项目中，它将位于 **Games> QuickStart > Source > QuickStart** 下。
    
    ![解决方案浏览器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00954d0e-a207-4163-9ef5-cda208af20b8/prquickstart_mac_3-1.png)
2.  双击 `FloatingActor.h` 将其打开，并在文本编辑器中将它放到前台。此为 *标头* 文件。可以将它视作C++类的目录。 要开始编译任何新功能，必须首先声明在此文件中使用的所有新 **变量** 或 **函数**。
    
3.  在 **AFloatingActor()** 的声明下面添加下列代码：
    
    ```cpp
             UPROPERTY(VisibleAnywhere)
             UStaticMeshComponent* VisualMesh;
    		
    ```
    
    这里声明的是 **StaticMeshComponent**，它将担当对象的视觉表示。请注意，它使用 **UProperty** 宏，这使它在虚幻编辑器中可见。 欲了解UProperty及其说明符的更多信息，请参见[属性](/documentation/zh-cn/unreal-engine/unreal-engine-uproperties)页面。
    
4.  现在打开 `FloatingActor.cpp`，在 **AFloatingActor::AFloatingActor()** 中将下列代码添加到右大括号前：
    
    ```cpp
             VisualMesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Mesh"));
             VisualMesh->SetupAttachment(RootComponent);
    		
             static ConstructorHelpers::FObjectFinder<UStaticMesh> CubeVisualAsset(TEXT("/Game/StarterContent/Shapes/Shape_Cube.Shape_Cube"));
    		
             if (CubeVisualAsset.Succeeded())
             {
                 VisualMesh->SetStaticMesh(CubeVisualAsset.Object);
                 VisualMesh->SetRelativeLocation(FVector(0.0f, 0.0f, 0.0f));
             }
    		
    ```
    
    此函数是 *构造函数*，它在类首次创建时告诉该类如何初始化自身。我们添加的代码将会在VisualMesh引用中填充新的StaticMeshComponent、 将它附加到Actor，并将它设为 **初学者内容包** 资源中的立方体模型。欲了解在代码中附加组件的更多信息，请参见[创建和附加组件](/documentation/zh-cn/unreal-engine/quick-start-guide-to-components-and-collision-in-unreal-engine-cpp)的指南。
    
5.  在 **AFloatingActor::Tick(float DeltaTime)** 中将下列代码添加到右大括号前：
    
    ```cpp
             FVector NewLocation = GetActorLocation();
             FRotator NewRotation = GetActorRotation();
             float RunningTime = GetGameTimeSinceCreation();
             float DeltaHeight = (FMath::Sin(RunningTime + DeltaTime) - FMath::Sin(RunningTime));
             NewLocation.Z += DeltaHeight * 20.0f;       //Scale our height by a factor of 20
             float DeltaRotation = DeltaTime * 20.0f;	//Rotate by 20 degrees per second
             NewRotation.Yaw += DeltaRotation;
             SetActorLocationAndRotation(NewLocation, NewRotation);
    		
    ```
    
    我们在 **Tick** 函数中添加要实时执行的代码。在此例中，它将使立方体在上下浮动的同时旋转。 欲了解对Actor进行Tick的更多信息，请参见[Actor更新](/documentation/zh-cn/unreal-engine/actor-ticking-in-unreal-engine)。
    

## 4\. 编译和测试C++代码

1.  **保存** 在 `FloatingActor.h` 以及 `FloatingActor.cpp` 中的工作成果。然后在 **解决方案浏览器** 中右键点击项目，点击快捷菜单中的 **编译（Build）** 命令，然后等待项目完成编译。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/029d184a-8c33-4fb8-9fb3-19e989d34186/prquickstart_4-1.png)
    
    应会在窗口底部的 **输出** 日志中看到一条显示"已成功（Succeeded）"的消息。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0a0c714-1d01-414a-bd3e-1c8f0af38b60/prquickstart_4-2.png)
    
    或者，可以回到 **虚幻编辑器**，点击屏幕顶部工具栏中的 **编译（Compile）** 按钮。
    

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ebf73973-d47b-45e0-8cd3-1ad7825584a1/prquickstart_4-3.png)

一定要在尝试编译前保存工作，否则在代码中做的更改将不会生效。

1.  在 **虚幻编辑器** 中，转到 **内容浏览器**，展开 **C++类（C++ Classes）**，然后找到 **FloatingActor**。它将位于与项目同名的文件夹中，在范例中是QuickStart。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13c2ca17-77ca-41ea-ae95-dd81ea968e1e/prquickstart_4-4.png)
2.  点击 **FloatingActor** 并将它拖进 **透视视口** 来创建FloatingActor的实例。它将在 **世界大纲视图** 中作为"FloatingActor1"处于被选中状态，它的属性将显示在 **细节（Details）** 面板中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/30761ff5-0898-4224-b439-b0cc1f78a83a/prquickstart_4-5.png)
    
    欲了解在视口中导航和在世界场景中放置Actor的信息，请参见[关卡设计器快速入门](/documentation/zh-cn/unreal-engine/level-designer-quick-start-in-unreal-engine)。
    
3.  在 **FloatingActor1** 的 **细节（Details）** 面板中，将Actor的 **位置（Location）**设置为（-180、0、180）。此操作会将其放置在默认场景中桌子的正上方。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a80c32ae-5250-4ae5-b855-000d0393d976/prquickstart_4-6.png)
    
    或者也可使用移动小工具手动将其移到该处。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4243a3a3-7b9c-45e7-8922-1c3016ace534/prquickstart_4-7.png)
4.  按屏幕顶部的 **在编辑器中运行（Play In Editor）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53aa9a59-f6c9-4a90-b830-2afe01933035/prquickstart_4-8.png)

1.  **保存** 在 `FloatingActor.h` 及 `FloatingActor.cpp` 中的工作成果。然后点击屏幕顶部的 **产品（Product）** 下拉菜单，选择 **编译（Build）** 命令，等待项目完成编译。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d80ded7-101c-4c6d-865f-cb1e8376f870/prquickstart_mac_4-1.png)
    
    应会在窗口底部的 **输出** 日志中看到一条显示"成功（Succeeded）"的消息。或者，可以回到 **虚幻编辑器**，点击屏幕顶部工具栏中的 **编译（Compile）** 按钮。
    

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8ce7881-6107-48ab-99e2-36848282741a/prquickstart_4-3.png)

一定要在尝试编译前保存工作，否则在代码中做的更改将不会生效。

1.  在 **虚幻编辑器** 中，转到 **内容浏览器**，展开 **C++类（C++ Classes）**，然后找到 **FloatingActor**。它将位于与项目同名的文件夹中，在范例中是QuickStart。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62028e8b-0818-4153-8a2b-9d52638fb546/prquickstart_4-4.png)
2.  点击 **FloatingActor** 并将它拖进 **透视视口** 来创建FloatingActor的实例。它将在 **世界大纲视图** 中作为"FloatingActor1"处于被选中状态，它的属性将显示在 **细节（Details）** 面板中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05e51e93-105d-429a-9448-a3ba19dc08c9/prquickstart_4-5.png)
    
    欲了解在视口中导航和在世界场景中放置Actor的信息，请参见[关卡设计器快速入门](/documentation/zh-cn/unreal-engine/level-designer-quick-start-in-unreal-engine)。
    
3.  在 **FloatingActor1** 的 **细节（Details）** 面板中，将Actor的 **位置（Location）**设置为（-180、0、180）。此操作会将其放置在默认场景中桌子的正上方。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d86f98ef-940c-4801-9fb7-93b41f2b8d82/prquickstart_4-6.png)
    
    或者也可使用移动小工具手动将其移到该处。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed64a099-58a2-4691-8943-dd077698b1fa/prquickstart_4-7.png)
4.  按屏幕顶部的 **在编辑器中运行（Play In Editor）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf41492c-ee8a-4285-b26c-6de60691a83e/prquickstart_4-8.png)

## 5\. 最终结果

此时应看到立方体在桌子上方轻盈地上下漂浮，同时缓慢旋转。

祝贺你！你已经完全用C++创建了首个Actor类。虽然它只能表示非常简单的对象，这也只是C++源代码所能实现的最简单功能， 但你目前已经了解了创建、编辑和编译游戏C++代码的所有基础知识。现在可以迎接更复杂的gameplay编程挑战啦，建议你进行以下操作。

## 6\. 自己动手操作！

了解如何构建简单的C++ Actor之后，请尝试提高它的可配置性。例如添加变量来控制它的行为：

在 **FloatingActor.h** 中：

```cpp
	...
	public:
		UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="FloatingActor")
		float FloatSpeed = 20.0f;

		UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="FloatingActor")
		float RotationSpeed = 20.0f;
	...

```

在 **FloatingActor.cpp** 中：

```cpp
	...
	NewLocation.Z += DeltaHeight * FloatSpeed;			//按FloatSpeed调整高度
	float DeltaRotation = DeltaTime * RotationSpeed;	//每秒旋转等于RotationSpeed的角度
	...

```

通过在标头文件中添加这些变量，并替换在.cpp中用于缩放DeltaHeight和DeltaRotation的浮点值，可在选择Actor时在 **细节（Details）** 面板中编辑浮动和旋转速度。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/978e635e-bba2-4e7b-829e-de1b3e264951/prquickstart_6-1.png)

可以尝试使用位置、旋转和比例向Tick函数添加其他类型的行为。

也可尝试在C++中附加其他类型的组件来创建更复杂的对象。请参见[创建和附加组件](/documentation/zh-cn/unreal-engine/quick-start-guide-to-components-and-collision-in-unreal-engine-cpp)指南来了解可使用的不同类型组件的范例， 并尝试添加粒子系统组件来为你的浮动对象增添一点光辉。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c49ff41-1d9f-4025-987d-d7d4724bb83f/prquickstart_6-2.png)

最后，如在 **内容浏览器** 中右键点击自己的Actor类，将看到在C++或蓝图中扩展它的选项，可以用来创建它的新变体。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f298d80f-0897-476d-8856-d52e748b46f5/prquickstart_6-3.png)

可以建立FloatingActor的一整个库，其中每个都代表选择的不同网格体或参数。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/083b4330-8263-4c90-ba8f-699ec438fa91/prquickstart_6-4.png)

## 范例代码

**FloatingActor.h**

```cpp
	// 版权所有 1998-2019 Epic Games, Inc。保留所有权利。

	#pragma once

	#include "CoreMinimal.h"
	#include "GameFramework/Actor.h"
	#include "FloatingActor.generated.h"

	UCLASS()
	class QUICKSTART_API AFloatingActor : public AActor
	{
		GENERATED_BODY()

	public:
		// 设置此Actor属性的默认值
		AFloatingActor();

		UPROPERTY(VisibleAnywhere)
		UStaticMeshComponent* VisualMesh;

	protected:
		// 游戏开始时或生成时调用
		virtual void BeginPlay() override;

	public:
		// 逐帧调用
		virtual void Tick(float DeltaTime) override;

	};

```

**FloatingActor.cpp**

```cpp
	// 版权所有 1998-2019 Epic Games, Inc。保留所有权利。

	#include "FloatingActor.h"

	// 设置默认值
	AFloatingActor::AFloatingActor()
	{
		// 将此Actor设为逐帧调用Tick()。如无需此功能，可关闭以提高性能。
		PrimaryActorTick.bCanEverTick = true;

		VisualMesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Mesh"));
		VisualMesh->SetupAttachment(RootComponent);

		static ConstructorHelpers::FObjectFinder<UStaticMesh> CubeVisualAsset(TEXT("/Game/StarterContent/Shapes/Shape_Cube.Shape_Cube"));

		if (CubeVisualAsset.Succeeded())
		{
			VisualMesh->SetStaticMesh(CubeVisualAsset.Object);
			VisualMesh->SetRelativeLocation(FVector(0.0f, 0.0f, 0.0f));
		}
	}

	// 游戏开始时或生成时调用
	void AFloatingActor::BeginPlay()
	{
		Super::BeginPlay();

	}

	// 逐帧调用
	void AFloatingActor::Tick(float DeltaTime)
	{
		Super::Tick(DeltaTime);

		FVector NewLocation = GetActorLocation();
		FRotator NewRotation = GetActorRotation();
		float RunningTime = GetGameTimeSinceCreation();
		float DeltaHeight = (FMath::Sin(RunningTime + DeltaTime) - FMath::Sin(RunningTime));
		NewLocation.Z += DeltaHeight * 20.0f;       //Scale our height by a factor of 20
		float DeltaRotation = DeltaTime * 20.0f;	//Rotate by 20 degrees per second
		NewRotation.Yaw += DeltaRotation;
		SetActorLocationAndRotation(NewLocation, NewRotation);
	}
```

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [c++](https://dev.epicgames.com/community/search?query=c++)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1\. 必要设置](/documentation/zh-cn/unreal-engine/unreal-engine-cpp-quick-start#1%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [2\. 创建新C++类](/documentation/zh-cn/unreal-engine/unreal-engine-cpp-quick-start#2%E5%88%9B%E5%BB%BA%E6%96%B0c++%E7%B1%BB)
-   [3\. 编辑C++类](/documentation/zh-cn/unreal-engine/unreal-engine-cpp-quick-start#3%E7%BC%96%E8%BE%91c++%E7%B1%BB)
-   [4\. 编译和测试C++代码](/documentation/zh-cn/unreal-engine/unreal-engine-cpp-quick-start#4%E7%BC%96%E8%AF%91%E5%92%8C%E6%B5%8B%E8%AF%95c++%E4%BB%A3%E7%A0%81)
-   [5\. 最终结果](/documentation/zh-cn/unreal-engine/unreal-engine-cpp-quick-start#5%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [6\. 自己动手操作！](/documentation/zh-cn/unreal-engine/unreal-engine-cpp-quick-start#6%E8%87%AA%E5%B7%B1%E5%8A%A8%E6%89%8B%E6%93%8D%E4%BD%9C%EF%BC%81)
-   [范例代码](/documentation/zh-cn/unreal-engine/unreal-engine-cpp-quick-start#%E8%8C%83%E4%BE%8B%E4%BB%A3%E7%A0%81)
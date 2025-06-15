# C++和蓝图示例 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cpp-and-blueprints-example
> 
> 生成时间: 2025-06-14T19:46:24.932Z

---

目录

![C++和蓝图](https://dev.epicgames.com/community/api/documentation/image/48851d67-2c9c-4283-8b44-e3ea2bece9f3?resizing_type=fill&width=1920&height=335)

利用蓝图可延伸C++，程序员可在代码中设置新的gameplay类，关卡设计师可利用蓝图编译和修改此类代码。 有些说明符可修改C++类与蓝图系统的交互方式，其中一部分将在本范例中高亮显示。

## 类设置

类设置的第一部分：使用[C++类向导](/documentation/zh-cn/unreal-engine/using-the-cplusplus-class-wizard-in-unreal-engine)创建名为LightSwitchBoth的类。

Most of the code setup in the LightSwitchBoth类中设置的多数代码与[纯C++ LightSwitch范例](/documentation/zh-cn/unreal-engine/cpp-only-example)中的代码类似。可使用蓝图延展LightSwitchCodeOnly类，而蓝图图表无法访问这个类中的组件、变量和函数。此范例将讲解 `UPROPERTY()` 和 `UFUNCTION()` 说明符，这两个说明符可使LightSwitchBoth作为派生自其中的蓝图模板进行运作。

首先参考纯C++ LightSwitch范例会十分有用，可了解设置标头文件和源文件来创建LightSwitchComponent、SphereComponent、DesiredIntensity变量和OnOverlap函数的方法。

此标头文件源自纯C++ LightSwitch范例，以添加以下功能：

-   PointLightComponent和SphereComponent为BlueprintReadOnly，将在 **我的蓝图（My Blueprint）** 选项卡的 **切换组件（Switch Components）** 目录中显示。
-   OnOverlapBegin和OnOverlapEnd现为BlueprintNativeEvents，将在 **我的蓝图（My Blueprint）** 选项卡的 **切换函数（Switch Functions）** 目录中显示。
-   DesiredIntensity为BlueprintReadWrite，将在 **我的蓝图（My Blueprint）** 选项卡的 **切换变量（Switch Variables）** 目录中显示。
-   DesiredIntensity现为EditAnywhere，而非VisibleAnywhere。

`UCLASS()` 宏含有 `Blueprintable` 说明符。LightSwitchBoth可设为蓝图且直接继承自Actor，而可设为蓝图说明符已继承，因此其在此情况下并非必需。

有了 `UPROPERTY()` 和 `UFUNCTION()` 宏中的附加说明符后，LightSwitchBoth类的标头文件类似于：

LightSwitchBoth.h

```cpp
		// 版权所有 1998-2018 Epic Games, Inc. 保留所有权利。

		#pragma once

		#include "GameFramework/Actor.h"
		#include "LightSwitchBoth.generated.h"

		/**
		 *
		 */
		UCLASS()
		class [PROJECTNAME]_API ALightSwitchBoth : public AActor
		{
			GENERATED_BODY()
			public:
			/** 点光源组件 */
			UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category="Switch Components")
			class UPointLightComponent* PointLight1;

			/** 球体组件 */
			UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category="Switch Components")
			class USphereComponent* Sphere1;

			ALightSwitchBoth();

			/** 物体进入球体组件时调用 */
			UFUNCTION(BlueprintNativeEvent, Category="Switch Functions")
			void OnOverlapBegin(class UPrimitiveComponent* OverlappedComp, class AActor* OtherActor, class UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult);

			void OnOverlapBegin_Implementation(class UPrimitiveComponent* OverlappedComp, class AActor* OtherActor, class UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult);

			/** 物体离开球体组件时调用 */
			UFUNCTION(BlueprintNativeEvent, Category="Switch Functions")
			void OnOverlapEnd(class UPrimitiveComponent* OverlappedComp, class AActor* OtherActor, class UPrimitiveComponent* OtherComp, int32 OtherBodyIndex);

			void OnOverlapEnd_Implementation(class UPrimitiveComponent* OverlappedComp, class AActor* OtherActor, class UPrimitiveComponent* OtherComp, int32 OtherBodyIndex);

			/** 切换光源组件的可视性*/
			UFUNCTION()
			void ToggleLight();

			/** 光源的理想强度 */
			UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Switch Variables")
			float DesiredIntensity;

		};
```

在LightSwitchBoth的源文件中，构造函数保持不变。但 `OnOverlapBegin` 和 `OnOverlapEnd` 函数需要进行变更。此类函数现为BlueprintNativeEvent。这意味蓝图派生自该类，可放置覆盖 `OnOverlapBegin` 和 `OnOverlapEnd` 的事件，正常调用函数时将执行该事件。

若此类事件之一不存在，将转而执行函数的C++实现。要使此设置生效，需将C++函数分别重命名为 `OnOverlapBegin_Implementation` 和 `OnOverlapEnd_Implementation`。之后本范例将讲解蓝图设置。

修改 `OnOverlapBegin` 和 `OnOverlapEnd` 定义后，LightSwitchBoth的源文件类似于：

LightSwitchBoth.cpp

```cpp
	// 版权所有 1998-2018 Epic Games, Inc. 保留所有权利。

	#include "BasicClasses.h"
	#include "LightSwitchBoth.h"

	ALightSwitchBoth::ALightSwitchBoth()
	{

		DesiredIntensity = 3000.0f;

		PointLight1 = CreateDefaultSubobject<UPointLightComponent>(TEXT("PointLight1"));
		PointLight1->Intensity = DesiredIntensity;
		PointLight1->bVisible = true;
		RootComponent = PointLight1;

		Sphere1 = CreateDefaultSubobject<USphereComponent>(this, TEXT("Sphere1"));
		Sphere1->InitSphereRadius(250.0f);
		Sphere1->SetupAttachment(RootComponent);

		Sphere1->OnComponentBeginOverlap.AddDynamic(this, &ALightSwitchBoth::OnOverlapBegin);		// 设置通知，该组件进行覆盖时会弹出通知
		Sphere1->OnComponentEndOverlap.AddDynamic(this, &ALightSwitchBoth::OnOverlapEnd);		// 设置通知，该组件进行覆盖时会弹出通知
	}

	void ALightSwitchBoth::OnOverlapBegin_Implementation(UPrimitiveComponent* OverlappedComp, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult)
	{
		if (OtherActor && (OtherActor != this) && OtherComp)
		{
			ToggleLight();
		}
	}

	void ALightSwitchBoth::OnOverlapEnd_Implementation(UPrimitiveComponent* OverlappedComp, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex)
	{
		if (OtherActor && (OtherActor != this) && OtherComp)
		{
			ToggleLight();
		}
	}

	void ALightSwitchBoth::ToggleLight()
	{
		PointLight1->ToggleVisibility();
	}
```

若此为添加至空白项目的首个代码类，需要首先关闭虚幻编辑器，在Visual Studio或Xcode中编译项目，然后打开虚幻编辑器并重新打开项目，以保证正确创建和加载游戏模块。此外，需确保 **编译配置（Build Configuration）** 与用于开启项目的虚幻引擎可执行文件相匹配，这一点同样重要。浏览[编译游戏项目](/documentation/zh-cn/unreal-engine/compiling-game-projects-in-unreal-engine-using-cplusplus)文档，了解编译配置和编译项目的详情。

若将代码添加至现有C++项目，可使用热重载功能在虚幻编辑器中编译新代码。

编译此新类后可[新建](/documentation/zh-cn/unreal-engine/creating-blueprint-classes-in-unreal-engine)[蓝图类](/documentation/zh-cn/unreal-engine/blueprint-class-assets-in-unreal-engine)。 在这种情况下，LightSwitchBoth被用作蓝图的父类，将被命名为 **LightSwitchBoth\_BP**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45ea7cd3-8b2d-40af-b727-d6500b771627/bpboth_parentclass.png)

C++中添加的PointLightComponent和SphereComponent同样会在 **蓝图编辑器（Blueprint Editor）** 中的 **组件（Components）** 选项卡中显示。其图标为深蓝色，表明为继承自父LightSwitchBoth类的原生组件。添加至 **LightSwitchBoth\_BP** 蓝图的新组件将显示为淡蓝色图标。参见[组件](/documentation/zh-cn/unreal-engine/components-window-in-unreal-engine)选项卡文档，了解使用 **组件（Components）** 添加和整理组件的详情。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce0da284-0e6c-42c5-a617-5523f9c7f81c/both_componentlist.png)

**蓝图编辑器（**Components**）** 的 **图表（Graph）** 面板是蓝图编辑的核心。在 **图表（Graph）** 面板内，可在[蓝图编辑器"我的蓝图"面板](/documentation/zh-cn/unreal-engine/my-blueprint-panel-in-the-blueprints-visual-scripting-editor-for-unreal-engine)选项卡中添加新的[变量](/documentation/zh-cn/unreal-engine/blueprint-variables-in-unreal-engine)、[函数](/documentation/zh-cn/unreal-engine/functions-in-unreal-engine)和[宏](/documentation/zh-cn/unreal-engine/macros-in-unreal-engine)。 你还可以访问蓝图内的所有[图表](/documentation/zh-cn/unreal-engine/graphs-in-unreal-engine)。图表中的[节点](/documentation/zh-cn/unreal-engine/nodes-in-unreal-engine)互相连线，创建由类变量、gameplay事件，甚至是Actor周围环境驱动的设计时和gameplay功能。

**图表（Graph）** 面板的 **我的蓝图（My Blueprint）** 选项卡显示了添加到C++中LightSwitchBoth 类的PointLightComponent和the SphereComponent。这是 `BlueprintReadOnly` 说明符导致的。在 **我的蓝图（My Blueprint）** 中点击此类组件的节点并将其拖入图表，即可添加至图表。之后可将这些节点与修改变量可视度或光源颜色的变量相连接。**DesiredIntensity** 变量同样在 **我的蓝图（My Blueprint）** 选项卡中显示。其为变量而非组件，因此可使用 `BlueprintReadWrite` 说明符。这意味可创建节点在蓝图图表中同时获取和赋予 **DesiredIntensity** 的值。参见[蓝图编辑器"我的蓝图"面板](/documentation/zh-cn/unreal-engine/my-blueprint-panel-in-the-blueprints-visual-scripting-editor-for-unreal-engine)文档，了解常规使用信息。

默认不显示父LightSwitchBoth类的组件和变量。勾选 **我的蓝图（My Blueprint）** 选项卡底部的 **显示继承变量（Show inherited variables）** 复选框时，将显示继承自父类的变量。

显示所有变量

仅显示使用者创建的变量

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe3e3769-6f51-4734-b407-fae4bf5422b7/showinhvar2.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f30d1327-4f95-46bd-84cc-780102cc4095/showinhvar.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/920a23da-841d-41f3-a452-d99024dbca6b/bp_only_myblueprint.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91b1cc18-9e57-4e72-8f56-85b550f0b8c3/both_myblueprint.png)

有两种图表被用于设置LightSwitchBoth\_BP类行为。第一种是[构造脚本](/documentation/zh-cn/unreal-engine/construction-script-in-unreal-engine)图表，含有专用的构造脚本事件。若未设置构造脚本，新的LightSwitchBoth\_BP Actor将只使用LightSwitchBoth构造函数。但Actor在关卡中移动或修改DesiredIntensity时，构造脚本将执行。使用构造脚本意味着可轻易修改公开到蓝图的Actor变量，还能快速地看到这些变更的效果。

在 **LightSwitchBoth\_BP** 类中，**构造脚本（Construction Script）** 事件与 **设置强度（Set Intensity）** 节点相连，因此将Actor添加至关卡中或在其中移动时，或是DesiredIntensity发生变更时，**点光源1**（PointLightComponent）的亮度将被设为 **DesiredIntensity** 的值。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f98bbcf-df7e-4e5e-9f1f-4e1c5e4ef90c/both_constructionscript.png)

LightSwitch\_BPOnly类中设置的另一个图表是[EventGraph](/documentation/en-us/unreal-engine/event-graph-in-unreal-engine)。EventGraph中的执行将从事件开始。因此，C++功能 `OnOverlap` 被调用时，OnOverlap事件将执行。在LightSwitchBoth源文件中设置委托，以便Actor进入或离开SphereComponent时OnOverlap进行执行：

```cpp
	Sphere1->OnComponentBeginOverlap.AddDynamic(this, &ALightSwitchBoth::OnOverlapBegin);		// 设置通知，该组件进行覆盖时会弹出通知
	Sphere1->OnComponentEndOverlap.AddDynamic(this, &ALightSwitchBoth::OnOverlapEnd);		// 设置通知，该组件进行覆盖时会弹出通知

```

**OnOverlap** 事件节点与 **设置光源颜色（Set Light Color）** 节点相连。事件执行时其会导致PointLightComponent的光源颜色被设为随机颜色。这会覆盖源文件中的 `OnOverlap_Implementation` 功能，将切换PointLightComponent的可视性。

参见[事件](/documentation/zh-cn/unreal-engine/events-in-unreal-engine)、[EventGraph](/documentation/en-us/unreal-engine/event-graph-in-unreal-engine)，和[蓝图类UI](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-user-interface-for-blueprint-classes-in-unreal-engine)文档，了解事件和使用图表的详情。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9089da3-b423-4cef-819a-912eb218a332/both_eventgraph_2.png)

LightSwitchBoth标头文件中的 **DesiredIntensity** 变量设为EditAnywhere，因此其在 **蓝图编辑器（Blueprint Editor）** 的默认项中可见。点击 **类默认项（Class Defaults）** 按钮在细节面板中显示类默认项后，即可对其进行编辑。这也意味着可依据类的各实例修改变量，以便各Actor可拥有各自的DesiredIntensity。DesiredIntensity同样为在构造脚本中使用的BlueprintReadWrite，因此对其进行更新也会导致构造脚本再次执行。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68383fde-f234-4254-9120-7fe46e04de6a/both_defaults.png)

使用其他蓝图类可延展蓝图类，其方法为：使用 **类查看器（Class Viewer）** 中类旁的下拉按钮，或是对蓝图 **点击右键** 并选择 **基于此新建蓝图（Create New Blueprint Based on This）**，新建蓝图。

蓝图类LightSwitchBoth\_BP位于[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)中，可将其从其中拖入关卡。该蓝图类同样位于[类查看器](/documentation/zh-cn/unreal-engine/class-viewer-in-unreal-engine)中。 参见[放置Actor](/documentation/zh-cn/unreal-engine/placing-actors-in-unreal-engine)文档，了解使用"内容浏览器"或"类查看器"将Actor放入关卡的详情。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [类设置](/documentation/zh-cn/unreal-engine/cpp-and-blueprints-example#%E7%B1%BB%E8%AE%BE%E7%BD%AE)
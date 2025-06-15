# 虚幻引擎中的UMG Viewmodel | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:19:56.039Z

---

目录

![UMG Viewmodel](https://dev.epicgames.com/community/api/documentation/image/6dfbda7d-6464-4952-8b68-0562cd78b79b?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

UI开发人员通常会将后端数据和视觉设计分解成独立的系统。这样做可以在构建用户界面（UI）的过程中减少破坏性，提高构建效率，因为设计人员可以在不破坏UI底层代码的情况下更改视觉呈现，程序员则可以专注于数据和系统，不需要完整的前端。**Viewmodel** 插件通过引入Viewmodel资产和 **视图绑定（View Bindings）** 为该工作流程提供了实现途径。

## 工作流程

Viewmodel包含可在你的UI中使用的变量。设计人员可以使用 **视图绑定（View Binding）** 面板将其UI中的字段绑定到这些变量，而程序员可以自行构建Viewmodel，并根据自己的需要将它们与应用程序的代码配合使用。

将Viewmodel添加到 **UMG** 控件后，你就可以访问它并调用函数或更新变量。Viewmodel会将更新推送到字段已绑定到其变量的所有控件。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f715802-bf34-4000-b35d-027977b4126c/viewmodelworkflow.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f715802-bf34-4000-b35d-027977b4126c/viewmodelworkflow.png)

这种替代方法比原始属性绑定更有效率，因为它只会在你更新变量时更新控件。它还具有事件驱动UI框架的优点，却无需花费实现时间手动建立框架。

## 必需设置

要在项目的UI中使用Viewmodel，请启用 **插件（Plugins）** 菜单中的 **UMG Viewmodel** 插件。

![在插件菜单中启用Viewmodel插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eed389fb-e196-4d04-a462-d8acff53c1c8/viewmodelplugin.png)

如果你不启用此插件，将无法使用 `UMVVMViewModelBase` 类，也将无法使用UMG中的"视图绑定（View Bindings）"。

## Viewmodel

Viewmodel的主要用途有两个：

-   维护你的UI所需变量的清单。
    
-   提供你的UI与应用程序其余部分之间的通信途径。
    

需要让你的UI感知某个变量时，可以将它添加到Viewmodel，然后将该Viewmodel添加到你的控件，并将字段绑定到它。需要更新变量时，你可以获取对该Viewmodel的引用，并从该处设置它们。然后，它们会将更改通知绑定到这些变量的控件并更新控件。

### 在蓝图中创建Viewmodel

你可以在蓝图中通过扩展 **MVVMViewModelBase** 类来创建Viewmodel。

![为蓝图类选择MVVMViewModelBase](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0075856e-bd7e-4e1e-9686-d65300ffe7c4/viewmodelbp.png)

要想在C++中创建Viewmodel，实现 `INotifyFieldValueChanged` 接口即可。

#### 蓝图中的Viewmodel变量

要广播对绑定到你的参数的控件的更改，你需要将变量或函数标记为 **FieldNotifies** 。点击函数或变量旁边的钟形图标，将其设为FieldNotify。

![在变量面板中创建变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3aa74a6d-e9f3-416e-9079-c38d7e3264dd/viewmodelvars.png)

设置FieldNotify变量的调用会标记为 **Set W/Broadcast** ，而不是通常的Set节点。

![蓝图中的Set with Broadcast节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/235fdfd1-9178-4bda-a91e-838c4898ec08/broadcastvar.png)

每当你在Gameplay代码中为这些变量设置新值时，它们会向绑定到它们的所有控件发送消息，指示它们更新。

#### 蓝图中的Viewmodel函数

函数也可以视为FieldNotify。要将函数用作FieldNotify，它必须满足以下条件：

-   必须是纯函数。
-   必须标记为Const。
-   必须仅返回一个值。
-   不能接受输入变量。

例如，你可以创建一个Getter函数，返回一个角色的当前生命值相较于最大生命值的百分比。如果你不想创建单独的变量来保存角色的生命值百分比值，这是很好的备用选项。

![将当前生命值和最大生命值转换为百分比值的Getter示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/454dc741-a1ee-40f1-a072-aaa824def3ac/healthpercentgetter.png)

FieldNotify变量更改时，你必须从该变量触发FieldNotify函数。请参阅[使用FieldNotify变量触发其他FieldNotify](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#heading=h.qln36ehrtib7)，了解更多信息。

Viewmodel中的Getter和Setter工具函数可以执行其他操作并处理派生值。例如，如果你有一个Viewmodel追踪玩家的生命值，你可能需要以文本格式显示整型生命值，但是你的Gameplay逻辑会将其视为浮点，如果你在ProgressBar控件中使用它，那你还需要将其转换为百分比。

利用SetCurrentHealth函数，你有机会在其他FieldNotify变量中设置派生值，或执行你的游戏可能需要的其他逻辑。

![设置当前生命值的函数，带有局限性。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf02a761-7cdd-40a7-b61f-de4cd74b9956/setcurrenthealthexample.png)

你创建Getter函数不应该仅仅为了返回FieldNotify变量的值，因为直接获取FieldNotify变量的值就够了，当你以后试图将Viewmodel变量绑定到控件时，多余的Getter函数可能令人困惑。但是，你可以使用FieldNotify Getter处理转换为所需格式（例如字符串）的过程，而无需创建额外的变量来保存该信息。

![将当前生命值和最大生命值输出为字符串的函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72521cef-62d8-4c24-b805-efa5cd9769d1/healthtotext.png)

#### 使用FieldNotify变量触发其他FieldNotify

FieldNotify变量在发生更改时可以自动广播给其他FieldNotify函数。要进行设置，请执行以下步骤：

1.  在变量面板中，点击你想使用的FieldNotify变量。
    
2.  在细节面板中，点击Field Notify复选框旁边的下拉菜单。它将显示你可以使用此变量触发的所有有效FieldNotify，包括其他变量和函数的FieldNotify。
    
    ![在细节面板中设置FieldNotify](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/157e5a95-006b-4ce5-900c-4114bd67b073/setfieldnotify.png)
3.  勾选为响应此变量更改而要触发的每个FieldNotify的复选框。
    

现在当你更改目标变量时，你绑定到它的所有FieldNotify函数将连同目标变量本身的函数触发。相较于使用更多变量，这样可以简化派生值的处理。

### 在C++中创建Viewmodel

要想在C++中创建Viewmodel，实现 `INotifyFieldValueChanged` 接口即可。你还可以扩展类 `UMVVMViewModelBase` ，后者默认实现该接口。Viewmodel是 `UObject` ，依赖FieldNotify变量和函数将更改广播给绑定到它们的控件。

与蓝图中不同的是，在C++中，你需要手动调用FieldNotify广播。

Viewmodel系统使用与蓝图相同的访问权限。变量和函数需要在蓝图中可访问，才能由Viewmodel系统访问。

#### 带FieldNotify说明符的变量

在Viewmodel中定义变量时，每个变量都必须有带有 `FieldNotify` 说明符的 `UPROPERTY` 宏。用于FieldNotify变量的说明符的完整列表如下：

**UPROPERTY说明符**

**说明**

`FieldNotify`

使属性可用于字段通知广播系统。

`Setter`

声明变量应允许设置其值。使用此说明符的前提是，Setter函数的名称格式为 `Set[Variable Name]`

`Setter="[FUNCTION_NAME]"`

作为Setter，但你可以提供自定义函数的名称以将其用作Setter。

`Getter`

声明变量应允许检索其值。使用此说明符的前提是，Getter函数的名称格式为 `Get[Variable Name]`

`Getter="[FUNCTION_NAME]"`

作为Getter，但你可以提供自定义函数的名称以将其用作Getter。

必须指定 `FieldNotify` 说明符，才能向控件广播值更改。具有此说明符的变量将出现在"视图绑定（View Binding）"菜单中。如果没有 `FieldNotify` ，你就只能在OneTime模式下绑定到变量。

你可以决定是否提供 `Setter` 或 `Getter` 说明符。如果你决定不提供其中一个，将无法在此类之外执行该运算。如果你只想针对变量本身触发通知，只需在指定Getter和Setter说明符时不附带函数名称。 在访问变量时，它们自动从脚本（蓝图、Viewmodel、Sequencer……）执行。它们不会自动从cpp代码调用。

自定义Getter和Setter说明符适合在以下情况下使用：

-   你需要在检索变量之前执行一项运算。
    
-   你希望在设置变量时触发其他函数或更新其他变量。
    

如果你创建自定义Getter或Setter函数，不要将它们设置为 `UFUNCTIONS` ，因为如果这样做，将在蓝图中为Get和Set函数创建冗余列表。变量的 `UPROPERTY` 宏已经以变量的Get和Set节点的形式提供了对这些函数的访问。你还应该将自定义Getter函数设置为 `const` 函数，因为它们唯一的作用应该是返回值。

由于C++不会强制用户调用Getter或Setter函数，变量应该带有protected或private关键字，以防止用户犯错。

```cpp

	protected:

	  /**
	   * 可以从Viewmodel系统访问变量，并可以写入变量。启用TwoWay。
	   * FieldNotify启用了OneWay绑定模式（启用通知）。
	   * 它在cpp中带有protected关键字（强制用户使用Getter/Setter）。
	   * 它在蓝图中带有public关键字
	   * 蓝图/ViewBinding/...将使用Getter/Setter。
	   */

	  UPROPERTY(BlueprintReadWrite, FieldNotify, Setter, Getter)
	  int32 MyVariableA;

	private:

	  /**
	   * 可以从Viewmodel系统访问变量。
	   * 没有FieldNotify，只有OneTime绑定模式可用。
	   * 它在cpp中带有private关键字（强制用户使用Getter/Setter）。
	   * 它在蓝图中带有public关键字（由于 `AllowPrivateAccess` ）。
	   * 蓝图/ViewBinding/...将使用Getter/Setter。
	   */

	  UPROPERTY(BlueprintReadOnly, FieldNotify, Setter, Getter, meta=(AllowPrivateAccess))
	  int32 MyPropertyB;

```

#### 带FieldNotify说明符的函数

你可以创建自定义函数来广播 `FieldNotify` 说明符，并且你可以按绑定到变量的相同方式将控件的属性绑定到这些函数。这样用的函数必须遵循以下要求：

-   必须具有带 `FieldNotify` 和 `BlueprintPure` 说明符的 `UFUNCTION` 宏。
-   不得带有参数。
-   必须是 `const` 函数。
-   必须仅返回单个值（没有输出参数）。

如果你希望将控件绑定到的值是从其他变量派生或转换而来的值，但又不想创建额外的变量来容纳该信息，那么函数会很有用。

例如，以下函数是一个FieldNotify函数，用于返回角色当前生命值占其最大生命值的百分比值：

```cpp

	UFUNCTION(BlueprintPure, FieldNotify)

		float GetHealthPercent() const
		{
			//检查以避免除零错误

			if (MaxHealth != 0)
			{
				return (float) CurrentHealth / (float) MaxHealth;
			}
			else
			{
				return 0;
			}
		}

```

当 `CurrentHealth` 或 `MaxHealth` 更改时，你需要手动通知 `GetHealthPercent` 更改了。

#### 使用宏触发FieldNotify说明符

更改变量时，函数需要调用Viewmodel的其中一个通知宏，以将更改广播到绑定的控件。可用宏的列表如下：

**ViewModel宏**

**说明**

UE\_MVVM\_BROADCAST\_FIELD\_VALUE\_CHANGED(\[事件名称\])

广播事件。

UE\_MVVM\_SET\_PROPERTY\_VALUE(\[成员名称\], \[新值\])

测试字段值是否已更改，然后设置字段的新值并广播事件。

`SET_PROPERTY_VALUE` 宏的作用与 `BROADCAST_FIELD_VALUE` 宏基本相同，不同的是 `SET_PROPERTY_VALUE` 宏会在赋值并广播之前检查值是否已更改。这项检查在为Viewmodel创建Setter函数时很常见，将其包括在内是为了方便起见。

如果你想通知直接绑定到该值的控件， `BROADCAST_FIELD_VALUE_CHANGED` 宏能以变量本身为参数，否则也能以函数名称为参数。

#### 示例

以下代码片段是使用上述概念的Viewmodel类的示例。GetHealthPercent被定义为不同于Getter和Setter函数的独立函数，但Setter函数除了在变量本身变化时发出通知外，还会调用该函数。

```cpp

	UCLASS(BlueprintType)
	class UVMCharacterHealth : public UMVVMViewModelBase
	{
	GENERATED_BODY()

	private:
	UPROPERTY(BlueprintReadWrite, FieldNotify, Setter, Getter, meta=(AllowPrivateAccess))
		int32 CurrentHealth;
		
		UPROPERTY(BlueprintReadWrite, FieldNotify, Setter, Getter, meta=(AllowPrivateAccess))
		int32 MaxHealth;

	public:
		void SetCurrentHealth(int32 NewCurrentHealth)
		{
			if (UE_MVVM_SET_PROPERTY_VALUE(CurrentHealth, NewCurrentHealth))
			{
				UE_MVVM_BROADCAST_FIELD_VALUE_CHANGED(GetHealthPercent);
			}
		}

		void SetMaxHealth(int32 NewMaxHealth)
		{
			if (UE_MVVM_SET_PROPERTY_VALUE(MaxHealth, NewMaxHealth))
			{
				UE_MVVM_BROADCAST_FIELD_VALUE_CHANGED(GetHealthPercent);
			}

		}

		int32 GetCurrentHealth() const
		{
			return CurrentHealth;
		}

		int32 GetMaxHealth() const
		{
			return MaxHealth;
		}

	public:

		UFUNCTION(BlueprintPure, FieldNotify)

		float GetHealthPercent() const
		{
			if (MaxHealth != 0)
			{
				return (float) CurrentHealth / (float) MaxHealth;
			}
			else
				return 0;
		}
		
	};

```

### 向控件添加Viewmodel

你可以在UMG的Viewmodels窗口中向控件添加Viewmodel。你可以在"UMG设计器（UMG Designer）选项卡的 **窗口（Window）** > **Viewmodels** 下找到它。

![找到窗口下拉菜单中的Viewmodel窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c160193-b8ac-43ce-b5e8-ad21710ada68/viewmodelwindow.png)

点击 **\+ Viewmodel** 按钮，选择你的项目的其中一个Viewmodel，然后点击 **选择（Select）** 。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2143bd27-864c-43d1-8708-adce66a49ed6/addviewmodeltowidget.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2143bd27-864c-43d1-8708-adce66a49ed6/addviewmodeltowidget.png)

### 初始化你的Viewmodel

当你在Viewmodels窗口中点击Viewmodel时，可以通过 **创建类型（Creation Type）** 设置选择如何将它初始化。可使用以下方法：

**Viewmodel创建类型**

**说明**

**创建实例（Create Instance）**

该控件会自动创建它自己的Viewmodel实例。

**手动（Manual）**

该控件在初始化时Viewmodel为null，你需要手动创建一个实例并为其赋值。

**全局Viewmodel集合（Global Viewmodel Collection）**

指你的项目中的所有控件均可使用的全局可用Viewmodel。需要 **全局Viewmodel标识符** 。

**属性路径（Property Path）**

在初始化时，执行一个函数来查找Viewmodel。**Viewmodel属性路径** 将使用句点分隔的成员名称。例如：GetPlayerController.Vehicle.ViewModel。属性路径始终是相对于控件的路径。

Viewmodel与控件之间不一定存在一一对应的关系。你可用多种方法设置它们，并将它们赋值给控件，而且多个控件可以从单个Viewmodel获取信息。下文详述了每种创建类型方法。

#### 创建实例

**创建实例（Create Instance）** 创建方法会自动为控件的每个唯一实例创建一个新的Viewmodel实例。这意味着，如果你在视口中有同一控件的数个副本，并且你更改了其中一个副本的Viewmodel变量，则只有该控件会更新，所有其他副本将保持不变。同理，如果你创建多个使用同一Viewmodel的不同控件，这些控件都不会感知到彼此信息的变化。下面介绍的其他方法适用于你希望多个控件引用相同数据的情况。你还可以选择在创建后设置Viewmodel。

你可以在C++中的初始化回调后或在蓝图中的初始化回调期间为Viewmodel赋值。系统只会在Viewmodel未设置时创建新实例。Viewmodel会在PreConstruct和Construct事件之间创建。

#### 手动

**手动（Manual）** 创建方法需要你在应用程序代码的某个位置自行创建一个Viewmodel实例，然后手动将其赋值给控件。控件具有Viewmodel对象引用，但在你为它赋值Viewmodel之前，它将具有空值。你还可以在Create Widget节点中创建时分配Viewmodel。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff63e857-f488-4acf-b3e2-1c64237bae81/creationmanual.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff63e857-f488-4acf-b3e2-1c64237bae81/creationmanual.png)

你赋值Viewmodel后，就可以在想要更新UI时更新它，不用获取对控件的引用。这样就有机会将Actor类中的相同Viewmodel分配给UI中的多个不同控件。

#### 属性路径

**属性路径（Property Path）** 创建方法提供的替代方案可能更简洁，需要的代码支持也更少。控件并不是让其他类访问其内部来设置其Viewmodel引用，而是通过一系列函数调用和引用向外访问来获取Viewmodel。编辑器中的"属性路径（Property Path）"字段要求一系列句点分隔的成员名称，并且它假定调用这些函数的起始点是 `Self` 。换言之，它的起始点始终是你正在编辑的控件。

不要在你的属性路径中手动指定 `Self` ，因为"属性路径（Property Path）"字段已经假定你的起始点是对 `Self` 的引用。

例如，以下字段会获取控件的所属玩家控制器，然后获取它当前控制的载具上的Viewmodel：

```cpp
	GetPlayerController.Vehicle.ViewModel
```

你还可以调用在蓝图中定义的函数，这有助于精简属性路径的逻辑并提高灵活性。例如，以下函数会从拥有该控件的角色获取角色生命值Viewmodel：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d3f31c1-4f65-4978-bc98-0976d1004369/creationpropertypath.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d3f31c1-4f65-4978-bc98-0976d1004369/creationpropertypath.png)

然后你可以使用以下函数的名称作为属性路径：

```cpp
	GetHealthViewModel
```

#### 全局Viewmodel集合

**全局Viewmodel集合（Global Viewmodel Collection）** 是 **MVVM游戏子系统（MVVM Game Subsystem）** 中可全局访问的Viewmodel列表。这些Viewmodel非常适合用于处理可能需要在你的整个UI中访问的变量，例如你的游戏选项菜单的设置。如需将Viewmodel添加到蓝图中的全局Viewmodel集合，请执行以下步骤：

1.  添加对MVVM游戏子系统的引用。
    
2.  从MVVM Game Subsystem节点拖移引脚，然后命名为 **Get Viewmodel Collection** 。
    
3.  从全局Viewmodel集合拖出一个引脚，然后调用 **Add Viewmodel Instance** 。
    

然后你可以构建一个Viewmodel实例，并通过此节点将其添加到集合中。你可在 **游戏实例（Game Instance）** 类中方便地初始化这些实例。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7182a069-b24b-49ab-bdc0-c489c4b9f00a/creationglobal.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7182a069-b24b-49ab-bdc0-c489c4b9f00a/creationglobal.png)

选择"全局Viewmodel集合（Global Viewmodel Collection）"作为初始化模式时，请通过 **全局Viewmodel标识符（Global Viewmodel Identifier）** 中的 Add Viewmodel Instance 节点提供 **上下文名称（Context Name）** 。此名称必须与Viewmodel的类名一致。例如，如果你的Viewmodel叫做VM\_GraphicsOptions，你需要将其同时用作上下文名称和全局Viewmodel标识符。

### 访问Viewmodel的成员

将Viewmodel赋值给控件后，你可以在蓝图中将其作为控件的属性进行访问。它将位于 **变量（Variables）** > **Viewmodel** 类别下。获得对Viewmodel的引用后，你就可以访问其变量和函数。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8231ab05-ea6f-42ea-96dc-520957a9742f/accessviewmodelprops.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8231ab05-ea6f-42ea-96dc-520957a9742f/accessviewmodelprops.png)

根据Viewmodel中配置的选项，你可能无法访问所有内部函数或Setter函数。

### 使用数组

你通常无法访问Viewmodel中的数组。如需访问Viewmodel中的数组，请创建你自己的 `FieldNotify` 函数，以便直接向Viewmodel本身添加、从中删除以及获取数组成员。

你可以将数组用于Views (ListView, TreeView, TileView)。在数组中添加、删除、移动元素时，你需要进行通知。

## 视图绑定

创建Viewmodel后，你可以将其添加到UMG编辑器中的控件中，并使用"视图绑定（View Bindings）"窗口将其作为目标。

### 向控件添加视图绑定

要向控件添加视图绑定，有两种方法可用：你可以使用"细节（Details）"面板中的"属性绑定（property binding）"下拉列表添加它们，也可以使用"视图绑定（View Binding）"菜单来管理你的所有控件的绑定。

#### 使用拖放

在Viewmodel窗口中，点击你想绑定到控件的变量或函数，然后将其拖到你想绑定到的字段的 **绑定（Bind）** 下拉菜单。这是创建视图绑定的最简单、最快速方法。

#### 使用细节面板

如需在"细节（Details）"面板中使用视图绑定，请选择你要添加绑定的控件，然后点击你想绑定的属性上的 **绑定（Bind）** 下拉列表。适用于该属性的Viewmodel变量和函数将出现在下拉列表的底部。点击一个以指定绑定。

![使用绑定下拉菜单通过细节面板添加绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68598401-e74b-4529-b701-6f64388dbdfd/addbindingdetails.png)

为避免混淆，请禁用旧版绑定系统。为此，转至 **项目设置（Project Settings）** > **编辑器（Editor）> 控件设计器（团队）（Widget Designer (Team)）** ，然后将 **属性绑定规则（Property Binding Rule）** 设为 **防止（Prevent）** 。这会删除将传统属性绑定到控件的参数的选项。

![在项目设置菜单中禁用旧版绑定系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/177d21ba-0915-44df-af8d-1863246cd3d8/disablelegacybinding.png)

你还可以在 **插件（Plugins）** > **模型视图Viewmodel（Model View Viewmodel）** 分段中禁用 **允许细节视图中的绑定（Allow Binding from Detail View）** ，为Viewmodel禁用细节面板绑定。你仍可以使用视图绑定菜单来绑定Viewmodel变量。

![禁用细节面板中的所有绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa97c089-1698-4fd4-8278-694e671d458b/disabledetailsbindings.png)

#### 使用视图绑定菜单

视图绑定窗口提供了对视图绑定行为的更详细控制。在"UMG设计器（UMG Designer）"选项卡中点击 **窗口（Window）** > **视图绑定（View Binding）** ，打开"视图绑定（View Binding）"窗口。

![找到窗口下拉菜单中的视图绑定菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f876b73-3701-4f92-ab48-628ac974f4d7/viewbindingwindow.png)

点击 **\+ 添加控件（Add Widget）** ，将条目添加到视图绑定列表。

![向视图绑定列表添加控件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1fdb9b73-7e5c-45b2-800f-7f4b85f62e2c/addwidget.png)

你在Viewmodels窗口中添加的Viewmodel可以进行绑定。

在当前版本的虚幻引擎中，如果你使用"视图绑定（View Bindings）"菜单绑定Viewmodel，然后使用"细节（Details）"面板为其重新赋值，可能导致绑定失效。如需解决此问题，你应该从"视图绑定（View Bindings）"菜单中删除绑定，然后为其重新赋值。

### 配置视图绑定

"视图绑定（View Bindings）"包含以下信息：

-   绑定的 **目标控件** 和 **目标****Viewmodel** 。
    
-   你想相互绑定的 **控件属性** 和 **Viewmodel****属性** 。
    
-   绑定的 **方向** ，决定两个目标属性之间的信息流。
    
-   绑定的 **更新类型** 。
    
-   **启用/禁用** 切换开关，用于在禁用时从运行时删除绑定。这意味着绑定不会编译，并且在运行时将不可用。
    

以下小节详细介绍了其中的每个字段及其配置方法。

#### 选择目标控件

视图绑定条目的第一个下拉列表用于选择你要添加视图绑定的控件。当你点击它时，下拉列表将显示控件的层级，你可以选择父控件本身或其子控件。点击 **选择（Select）** 确认你的选择。

![选择你想作为视图绑定目标的控件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1417019a-e985-4430-a0c2-1713ccacc6f2/selecttargetwidget.png)

#### 创建视图绑定条目

目标控件下面有你想设置Viewmodel绑定的各个属性对应的条目。每个绑定都从它所属的控件缩进显示。你可以点击控件下拉列表旁的 **+** 按钮，为单个控件添加多个绑定。每个绑定都必须以不同的属性为目标。

![向目标控件添加视图绑定条目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/876487a2-5611-4059-9526-cddccd252600/addbindings.png)

#### 选择控件属性

视图绑定条目中的第一个下拉列表将显示目标控件的变量和函数列表。例如，如果你选择"进度条（Progress Bar）控件， **百分比（Percent）** 属性将可用。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a9fcbf1-b615-4fc5-bf3c-ebc46599d001/selecttargetwidgetproperty.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a9fcbf1-b615-4fc5-bf3c-ebc46599d001/selecttargetwidgetproperty.png)

如需使在C++中定义的属性或函数出现在此列表中，必须通过 `UFUNCTION` 或 `UPROPERTY` 宏令其对虚幻引擎反射系统可见。蓝图定义的变量和函数自动可用。

#### 选择Viewmodel属性

第三个下拉列表用于选择你想作为目标的Viewmodel，以及你在视图绑定时想要使用它的哪些属性。当你点击它时，它会显示你添加到该控件的Viewmodel的列表。

![选择视图绑定的目标属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49a02bff-c83b-41e0-b103-4fb19c00cfdb/bindingtargetproperty.png)

点击你在显示可进行视图绑定的变量和函数列表时想要使用的Viewmodel。由于这是 `单向至控件（One Way To Widget）` ，要使变量和函数显示在此处，它们必须有 `FieldNotify` 说明符。

#### 设置绑定方向

第二个下拉列表用于选择视图绑定的 **绑定方向（Bind Direction）** 。它将决定信息在控件和Viewmodel之间的流动方式。

![绑定方向下拉列表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2c6fcd4-85e7-46c3-b42a-85a498a9443f/bindingdirections.png)

可用的绑定方向如下：

**绑定方向（Bind Direction）**

**说明**

单向至控件

绑定仅从Viewmodel应用到控件一次。它会更新所选控件属性。

单向至控件（One Way to Widget）

仅执行从Viewmodel到控件的绑定。每当你更新Viewmodel中的对应变量时，它都会通知控件变量已改变，并更新选定的控件属性。或者，如果你选择某个函数，则调用该函数也会更新选定的控件属性。

单向至Viewmodel（One Way to Viewmodel）

仅执行从控件到Viewmodel的绑定。只要用户或你的代码更改了控件中的选定属性，都会将该更改应用于Viewmodel属性。典型示例包括用户编辑的文本字段或图形选项。

双向（Two Way）

绑定在两个方向上都适用。

所有绑定会在PreConstruct和Construct事件之间执行一次。 如果绑定方向是TwoWay，则只会执行OneWay绑定。 如果Viewmodel值通过SetViewmodel发生更改，将执行包括该Viewmodel的所有绑定。

### 使用转换函数

作为直接绑定到变量的替代方法，你可以选择 **转换函数（Conversion Functions）** 。这些函数提供了一个接口，用于将Viewmodel中的变量转译为不同类型的数据，比如将整型转换为文本。转换函数会出现在Viewmodel列表下方的Viewmodel属性下拉列表中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9bd7200c-9833-47d4-82a7-dd4941ec61c9/conversionfunctions.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9bd7200c-9833-47d4-82a7-dd4941ec61c9/conversionfunctions.png)

当你选择一种转换函数时，用于配置该函数参数的选项列表将出现在视图绑定的下拉列表下方。

![视图绑定菜单中的转换函数选项列表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c39ba2ac-0ab1-43d4-a10e-e03e6499a925/conversionfunctionoptions.png)

如果你点击其中一个属性的 **链接（link）** 按钮，可将该属性绑定到Viewmodel值。

![向转换函数添加值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6eb8c942-4b62-4ca0-a006-971a829cf847/addconversionfunctionvalue.png)

新的转换函数可以全局添加或在UserWidget（控件蓝图）上添加。函数不能是事件或网络，也不能弃用或仅限编辑器。函数需要对蓝图可见，有一个输入参数和一个返回值。如果在全局定义，函数还需要带有static关键字。如果在UserWidget中定义，函数还需要带有pure和const关键字。

## 创建Viewmodel的最佳实践

创建Viewmodel时，你应该秉承小而简洁而非大而庞杂的原则。这样做可以简化UI的调试。

例如，你可以创建一个表示角色扮演游戏（RPG）角色的Viewmodel，其中包含一组完整的特性、物品栏和击中点。但如需调试依赖此Viewmodel的UI部分，你首先需要生成一个完整的角色来填充Viewmodel的数据。如果你将这些拆分成不同的组件，在调试时就可以更轻松地使用测试数据填充它们。

### 嵌套Viewmodel

你可以将Viewmodel嵌套在其他Viewmodel中，以便更灵活地处理复杂数据集。

例如，你可以为角色的生命值创建一个Viewmodel，为其属性（力量、敏捷度、魔法）创建另一个Viewmodel，然后你可以将这两个Viewmodel都嵌套在一个表示完整角色的Viewmodel中。在测试时，各控件可从与其相关的Viewmodel获取数据（例如，血条可以引用角色生命值），而最终产品可以使用嵌套Viewmodel中的完整数据集。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [variables](https://dev.epicgames.com/community/search?query=variables)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [attributes](https://dev.epicgames.com/community/search?query=attributes)
-   [data](https://dev.epicgames.com/community/search?query=data)
-   [umg](https://dev.epicgames.com/community/search?query=umg)
-   [attribute binding](https://dev.epicgames.com/community/search?query=attribute%20binding)
-   [viewmodel](https://dev.epicgames.com/community/search?query=viewmodel)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [工作流程](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
-   [必需设置](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E5%BF%85%E9%9C%80%E8%AE%BE%E7%BD%AE)
-   [Viewmodel](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#viewmodel)
-   [在蓝图中创建Viewmodel](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E5%9C%A8%E8%93%9D%E5%9B%BE%E4%B8%AD%E5%88%9B%E5%BB%BAviewmodel)
-   [蓝图中的Viewmodel变量](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E8%93%9D%E5%9B%BE%E4%B8%AD%E7%9A%84viewmodel%E5%8F%98%E9%87%8F)
-   [蓝图中的Viewmodel函数](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E8%93%9D%E5%9B%BE%E4%B8%AD%E7%9A%84viewmodel%E5%87%BD%E6%95%B0)
-   [使用FieldNotify变量触发其他FieldNotify](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E4%BD%BF%E7%94%A8fieldnotify%E5%8F%98%E9%87%8F%E8%A7%A6%E5%8F%91%E5%85%B6%E4%BB%96fieldnotify)
-   [在C++中创建Viewmodel](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E5%9C%A8c++%E4%B8%AD%E5%88%9B%E5%BB%BAviewmodel)
-   [带FieldNotify说明符的变量](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E5%B8%A6fieldnotify%E8%AF%B4%E6%98%8E%E7%AC%A6%E7%9A%84%E5%8F%98%E9%87%8F)
-   [带FieldNotify说明符的函数](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E5%B8%A6fieldnotify%E8%AF%B4%E6%98%8E%E7%AC%A6%E7%9A%84%E5%87%BD%E6%95%B0)
-   [使用宏触发FieldNotify说明符](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E4%BD%BF%E7%94%A8%E5%AE%8F%E8%A7%A6%E5%8F%91fieldnotify%E8%AF%B4%E6%98%8E%E7%AC%A6)
-   [示例](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E7%A4%BA%E4%BE%8B)
-   [向控件添加Viewmodel](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E5%90%91%E6%8E%A7%E4%BB%B6%E6%B7%BB%E5%8A%A0viewmodel)
-   [初始化你的Viewmodel](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E5%88%9D%E5%A7%8B%E5%8C%96%E4%BD%A0%E7%9A%84viewmodel)
-   [创建实例](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E5%88%9B%E5%BB%BA%E5%AE%9E%E4%BE%8B)
-   [手动](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E6%89%8B%E5%8A%A8)
-   [属性路径](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E5%B1%9E%E6%80%A7%E8%B7%AF%E5%BE%84)
-   [全局Viewmodel集合](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E5%85%A8%E5%B1%80viewmodel%E9%9B%86%E5%90%88)
-   [访问Viewmodel的成员](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E8%AE%BF%E9%97%AEviewmodel%E7%9A%84%E6%88%90%E5%91%98)
-   [使用数组](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E4%BD%BF%E7%94%A8%E6%95%B0%E7%BB%84)
-   [视图绑定](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E8%A7%86%E5%9B%BE%E7%BB%91%E5%AE%9A)
-   [向控件添加视图绑定](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E5%90%91%E6%8E%A7%E4%BB%B6%E6%B7%BB%E5%8A%A0%E8%A7%86%E5%9B%BE%E7%BB%91%E5%AE%9A)
-   [使用拖放](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E4%BD%BF%E7%94%A8%E6%8B%96%E6%94%BE)
-   [使用细节面板](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E4%BD%BF%E7%94%A8%E7%BB%86%E8%8A%82%E9%9D%A2%E6%9D%BF)
-   [使用视图绑定菜单](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E4%BD%BF%E7%94%A8%E8%A7%86%E5%9B%BE%E7%BB%91%E5%AE%9A%E8%8F%9C%E5%8D%95)
-   [配置视图绑定](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E9%85%8D%E7%BD%AE%E8%A7%86%E5%9B%BE%E7%BB%91%E5%AE%9A)
-   [选择目标控件](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E9%80%89%E6%8B%A9%E7%9B%AE%E6%A0%87%E6%8E%A7%E4%BB%B6)
-   [创建视图绑定条目](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E5%88%9B%E5%BB%BA%E8%A7%86%E5%9B%BE%E7%BB%91%E5%AE%9A%E6%9D%A1%E7%9B%AE)
-   [选择控件属性](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E9%80%89%E6%8B%A9%E6%8E%A7%E4%BB%B6%E5%B1%9E%E6%80%A7)
-   [选择Viewmodel属性](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E9%80%89%E6%8B%A9viewmodel%E5%B1%9E%E6%80%A7)
-   [设置绑定方向](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E8%AE%BE%E7%BD%AE%E7%BB%91%E5%AE%9A%E6%96%B9%E5%90%91)
-   [使用转换函数](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E4%BD%BF%E7%94%A8%E8%BD%AC%E6%8D%A2%E5%87%BD%E6%95%B0)
-   [创建Viewmodel的最佳实践](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E5%88%9B%E5%BB%BAviewmodel%E7%9A%84%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)
-   [嵌套Viewmodel](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine#%E5%B5%8C%E5%A5%97viewmodel)
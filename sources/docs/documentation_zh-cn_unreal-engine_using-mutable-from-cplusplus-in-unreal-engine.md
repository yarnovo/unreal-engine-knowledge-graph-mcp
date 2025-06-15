# 在虚幻引擎中从C++使用Mutable | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-mutable-from-cplusplus-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:03:44.634Z

---

目录

![从C++使用Mutable](https://dev.epicgames.com/community/api/documentation/image/83bcaf36-c7bc-4476-bf70-062db974ba0a?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

你可以使用以下文档了解如何在C++中设置和使用Mutable角色。

## 创建可自定义对象的实例

**CustomizableObjectInstance** 包含 **可自定义对象** 的一组参数值。这些值可供Actor用于创建游戏内的网格体和材质。

要创建 **可自定义对象** 的实例，需要获取对 **对象** 的引用以及一个 **CustomizableObjectInstance** 。你可以使用两种方式获取 **对象** 引用，一是将指针作为 `UPROPERTY()` 添加到Actor的类，然后从蓝图中设置值，二是使用资产的路径加载它。拥有两者后，调用 `SetObject` 函数，即告知实例要表示的对象。这样，实例就知道要存储哪些参数以及这些参数的默认值是什么。

```cpp_programming
UCustomizableObject* CustomizableObject = 
    LoadObject<UCustomizableObject>(nullptr, TEXT("/Game/MyCustomizableObject"));

if (CustomizableObject)
{
    CustomizableObjectInstance = NewObject<UCustomizableObjectInstance>();
    CustomizableObjectInstance->SetObject(CustomizableObject);
}
```

## 将实例与Actor关联

将实例与Actor关联的最佳方法是使用 **CustomizableSkeletalComponent** ，该组件可以附加到Actor的 **SkeletalMeshComponent** 上，以便用Mutable生成的骨骼网格体（如果使用的是[Mesh Component](https://github.com/anticto/Mutable-Documentation/wiki/Node-Mesh-Component)节点）或标准的虚幻引擎骨骼网格体（如果使用的是[Passthrough Mesh Component](https://github.com/anticto/Mutable-Documentation/wiki/Node-Passthrough-Mesh-Component)节点）来更新和替换网格体资产。

创建组件后，当Actor被添加到关卡时，它将自动显示自定义骨骼网格体。你可以参考以下示例设置：

```cpp_programming
CSkeletalComponent = 
        NewObject<UCustomizableSkeletalComponent>(UCustomizableSkeletalComponent::StaticClass());

// 设置Actor将使用的实例
CSkeletalComponent->CustomizableObjectInstance = CustomizableObjectInstance;

// 选择在可自定义对象图表中声明的Mesh Component或Passthrough Mesh Component
CSkeletalComponent->SetComponentName(TEXT("Body"));

// 将CustomizableSkeletalComponent附加到Actor的SkeletalMeshComponent上
CSkeletalComponent->AttachToComponent(GetMesh(), FAttachmentTransformRules::KeepRelativeTransform);
```

## 更改参数

参数存储在每个实例的公共数组中。你可以直接修改这些参数，但建议使用API函数以避免无效值。下面是如何修改不同类型参数的示例：

```cpp_programming
// 设置参数"Frackles"的布尔值
CustomizableObjectInstance->SetBoolParameterSelectedOption(FString("Freckles"), true);

// 设置参数"Shirt"的整型值（枚举类型）
CustomizableObjectInstance->SetIntParameterSelectedOption(FString("Shirt"), FString("BasicShirt"));

// 设置参数"Fatness"的浮点值，取值范围为0到1
CustomizableObjectInstance->SetFloatParameterSelectedOption(FString("Fatness"), 0.5f);

// 设置参数"EyeColor"的颜色值
CustomizableObjectInstance->SetColorParameterSelectedOption(FString("EyeColor"), 
                                                             FLinearColor(FColor::Blue));

// 设置参数"VParam"的向量值
CustomizableObjectInstance->SetVectorParameterSelectedOption(FString("VParam"), 
                                                             FLinearColor(120.f, 50.f, 180.f));

// 设置参数"Tatto"的投射器值
CustomizableObjectInstance->SetProjectorValue(FString("Tatto"), LocalPosition, Direction, Up, Scale, Angle, 
                                               ECustomizableObjectProjectorType::Planar);
```

## 更改状态

正如[状态](/documentation/zh-cn/unreal-engine/using-customizable-states-in-mutable-with-unreal-engine)页面所述，Mutable具有状态的概念，可以根据用例实现某些优化。给定一个可自定义对象实例，可以使用以下API函数查询和更改其状态：

```cpp_programming
// 获取当前状态
CustomizableObjectInstance->GetCurrentState(FString("InGame"));

// 设置当前状态。需要待更新的可自定义对象实例
FString State = CustomizableObjectInstance->SetCurrentState();
```

给定一个可自定义对象，我们可以查询可用状态和每个状态中的参数：

```cpp_programming
// 获取状态数量
int32 Count = CustomizableObject->GetStateCount()

// 获取给定状态索引的状态名称
FString Name = CustomizableObject->GetStateName(1);

// 获取给定状态的参数数量
int32 ParameterCount = CustomizableObject->GetStateParameterCount(FString("InGame"));

// 获取给定状态中参数索引的名称
FString ParameterName = CustomizableObject->GetStateParameterName(FString("InGame"), 1);
```

## 更新实例

更改参数或状态不会自动更新实例。要应用这些更改，必须在 **CustomizableSkeletalComponent** 类中调用 `UpdateSkeletalMeshAsync()` 方法来更新实例。这样做将使用应用这些更改而生成的实例替换所有使用相同 **CustomizableObjectInstance** 的Actor的 **骨骼网格体** 组件。

```cpp_programming
// 更新实例
CSkeletalComponent->UpdateSkeletalMeshAsync();
```

## 实例更新委托

你可能希望在网格体更新后运行特定的方法，例如触发动画或使网格体可见。为了在网格体更新后运行方法，Mutable提供了一个可以注册回调的委托。此委托将向注册的回调广播骨骼网格体更新的完成情况。

```cpp_programming
// 将"此"UObject的"OnCustomizableSkeletalUpdated"方法绑定为委托的回调 
CSkeletalComponent->UpdatedDelegate.BindUObject(this, &MyCustomCharacter::OnCustomizableSkeletaUpdated);

// 取消绑定回调 
CSkeletalComponent->UpdatedDelegate.Unbind();
```

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [working with content](https://dev.epicgames.com/community/search?query=working%20with%20content)
-   [skeletal mesh](https://dev.epicgames.com/community/search?query=skeletal%20mesh)
-   [mutable](https://dev.epicgames.com/community/search?query=mutable)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建可自定义对象的实例](/documentation/zh-cn/unreal-engine/using-mutable-from-cplusplus-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%8F%AF%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%AE%9E%E4%BE%8B)
-   [将实例与Actor关联](/documentation/zh-cn/unreal-engine/using-mutable-from-cplusplus-in-unreal-engine#%E5%B0%86%E5%AE%9E%E4%BE%8B%E4%B8%8Eactor%E5%85%B3%E8%81%94)
-   [更改参数](/documentation/zh-cn/unreal-engine/using-mutable-from-cplusplus-in-unreal-engine#%E6%9B%B4%E6%94%B9%E5%8F%82%E6%95%B0)
-   [更改状态](/documentation/zh-cn/unreal-engine/using-mutable-from-cplusplus-in-unreal-engine#%E6%9B%B4%E6%94%B9%E7%8A%B6%E6%80%81)
-   [更新实例](/documentation/zh-cn/unreal-engine/using-mutable-from-cplusplus-in-unreal-engine#%E6%9B%B4%E6%96%B0%E5%AE%9E%E4%BE%8B)
-   [实例更新委托](/documentation/zh-cn/unreal-engine/using-mutable-from-cplusplus-in-unreal-engine#%E5%AE%9E%E4%BE%8B%E6%9B%B4%E6%96%B0%E5%A7%94%E6%89%98)
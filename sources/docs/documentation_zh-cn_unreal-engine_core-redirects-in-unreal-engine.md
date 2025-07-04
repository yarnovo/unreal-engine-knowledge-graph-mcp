# 虚幻引擎中的Core Redirects | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/core-redirects-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:39:43.877Z

---

目录

![Core Redirects](https://dev.epicgames.com/community/api/documentation/image/222cd57d-c3c8-4353-8bf7-2b5df240be60?resizing_type=fill&width=1920&height=335)

开发过程中，在某些情况下需要重命名现有类、属性、函数名称或相似代码成员。 然而，如果存在大量受这些更改影响的资源，仅重命名代码成员然后重新编译项目会导致相当数量的数据丢失，因为 **虚幻引擎** 无法再识别现有资源。 为解决此问题，引擎使用 **Core Redirects**。 你应在项目的`DefaultEngine.ini`文件中配置Core Redirects，对于插件，则在相应插件的添加前缀后的自命名`.ini`文件中配置，例如，对于引擎的Paper2D插件，相应的文件为`BasePaper2D.ini`，对于游戏插件，相应的文件为`Default<GamePluginName>.ini`。 在任何一种情况下，都需要将Core Redirects放置在"\[CoreRedirects\]"部分中。 加载资源时，这些Core Redirects将自动重新映射已过时数据，从而防止因重命名过程导致的数据丢失。 有关当前有效的Core Redirects的示例，请查看`BaseEngine.ini` 文件。

## 受支持的Core Redirect类型

在Core Redirect中指定类或结构体的名称时，输入的名称应与它在虚幻引擎的反射系统中显示的名称相同，这就是说，需要省略前缀字母。例如，`AMyActor`应写作`MyActor`，`FMyStruct`应写作`MyStruct`。由于对于列举类型，虚幻引擎的反射系统不使用前缀，在Core Redirects中，列举类型名称的显示方式与在代码中完全相同。例如，被Core Redirect引用时，`ESampleEnum`将仍为`ESampleEnum`。

当前支持下列Core Redirect格式：

-   `ClassRedirects`——更改对象和属性（使用已过时或已删除的UCLASS引用新UCLASS）。
    
    字段
    
    类型
    
    目的
    
    `OldName`
    
    字符串
    
    指定已过时或已删除的UCLASS的名称。
    
    `NewName`
    
    字符串
    
    指定新UCLASS的名称。
    
    `MatchSubstring`
    
    布尔
    
    （可选）如果存在并且设为`true`，此Core Redirect将应用给包含`OldName`值的任何类，而非要求完全匹配。
    
    `OverrideClassName`
    
    字符串
    
    （可选）指定要对UCLASS的底层类进行的更改。此字段通常用于将蓝图类更改为原生类（`/Script/CoreUObject.Class`）。
    
    `InstanceOnly`
    
    布尔
    
    （可选）如果存在并且设为`true`，指示原始类仍将存在并且可被引用，但是旧类的任何现有实例（例如放置在关卡中的Actor或组件）都应被重新映射到新类。当项目中具有引擎中存在的类的特化版本，但是关卡中包含大量原始类的实例，而你希望将它们全部更改为项目特定的版本时，此字段非常有用。
    
    `ValueChanges`
    
    字符串对列表
    
    （可选）重命名与对的第一个字符串匹配的旧类的实例。新名称将作为该对的第二个字符串。
    
    ```cpp
    [CoreRedirects]
    +ClassRedirects=(OldName="Pawn",NewName="MyPawn",InstanceOnly=true)
    +ClassRedirects=(OldName="/Script/MyModule.MyOldClass",NewName="/Script/MyModule.MyNewClass")
    +ClassRedirects=(OldName="PointLightComponent",NewName="PointLightComponent",ValueChanges=(("PointLightComponent0","LightComponent0")))
    +ClassRedirects=(OldName="AnimNotify_PlayParticleEffect_C",NewName="/Script/Engine.AnimNotify_PlayParticleEffect",OverrideClassName="/Script/CoreUObject.Class")
    
    ```
    
-   `EnumRedirects`——重新映射列举类型中的已过时UENUM类型和/或已过时数值。
    
    字段
    
    类型
    
    目的
    
    `OldName`
    
    字符串
    
    指定已过时UENUM的名称（如果指定了 `NewName` ）或现有UENUM的名称（如果仅重新映射数值）。
    
    `NewName`
    
    字符串
    
    （可选）指定新UENUM的名称（如果从已过时UENUM重新映射到新UENUM）。
    
    `MatchSubstring`
    
    布尔
    
    （可选）如果存在并且设为 `true`，此Core Redirect将应用给包含 `OldName` 值的任何列举类型，而非要求完全匹配。
    
    `ValueChanges`
    
    字符串对列表
    
    对中的第一个字符串是旧列举值，第二个字符串是新值。如果两个值都属于相同的类，旧值不应再存在于代码中。
    
    ```cpp
    [CoreRedirects]
    +EnumRedirects=(OldName="ENumbers",NewName="ELetters",ValueChanges=(("NumberTwo","LetterB"),("NumberThree","LetterC")))
    
    ```
    
-   `FunctionRedirects`——将已过时UFUNCTION重新映射到新UFUNCTION。
    
    字段
    
    类型
    
    目的
    
    `OldName`
    
    字符串
    
    指定已过时或已删除的UFUNCTION的名称。函数名称使用句号分隔，以便包含类名。
    
    `NewName`
    
    字符串
    
    指定新UFUNCTION的名称。可以使用句点分隔函数名称，这样就可将函数从一个类重新映射到另一个类。
    
    `MatchSubstring`
    
    布尔
    
    （可选）如果存在并且设为`true`，此Core Redirect将应用给包含`OldName`值的任何函数，而非要求完全匹配。
    
    ```cpp
    [CoreRedirects]
    +FunctionRedirects=(OldName="MyOldActor.OldFunction",NewName="MyNewActor.NewFunction")
    +FunctionRedirects=(OldName="MyActor.OldFunction",NewName="NewFunction")
    
    ```
    
-   `PackageRedirects`——从一个包重新映射到另一个包，或者禁止显示与对已删除包的引用相关的警告（引用将被清除或设置为空）。
    
    字段
    
    类型
    
    目的
    
    `OldName`
    
    字符串
    
    指定已过时或已删除的包的名称。
    
    `NewName`
    
    字符串
    
    （可选）如果需要重新映射，此字段指定替换已过时或已删除包的包的名称。如果不使用此字段，应使用`Removed`并且应将它设为`true`。
    
    `MatchSubstring`
    
    布尔
    
    （可选）如果存在并且设为`true`，此Core Redirect将应用给包含`OldName`值的任何包，而非要求完全匹配。
    
    `Removed`
    
    布尔
    
    （可选） 如果存在并且设为`true`，指定的包已被删除。对任何已删除内容的引用将在不生成警告或错误的情况下设置为空。如果情况如此，不应使用`NewName`参数。
    
    ```cpp
    [CoreRedirects]
    +PackageRedirects=(OldName="OldPlugin",NewName="/NewPlugin/",MatchSubstring=true)
    +PackageRedirects=(OldName="/Game/DeletedContentPackage",Removed=true)
    
    ```
    
-   `PropertyRedirects`——将已删除属性重新映射到新属性。
    
    字段
    
    类型
    
    目的
    
    `OldName`
    
    字符串
    
    已删除属性的名称。应使用句点分隔此名称，以便包含类名和任何子变量名，例如，`MyActor.MyStruct.MyProperty`。
    
    `NewName`
    
    字符串
    
    新属性的名称。与`OldName`相似，可以完全使用句点分隔此名称，或者，如果它与`OldName`存在于相同的命名空间中，则仅有变量名称亦可。
    
    `MatchSubstring`
    
    布尔
    
    （可选）如果存在并且设为 `true`，此Core Redirect将应用给包含 `OldName` 值的任何属性，而非要求完全匹配。
    
    ```cpp
    [CoreRedirects]
    +PropertyRedirects=(OldName="MyOldActor.OldIntProperty",NewName="MyNewActor.NewIntProperty")
    +PropertyRedirects=(OldName="MyActor.OldFloatProperty",NewName="NewFloatProperty")
    
    ```
    
-   `StructRedirects`——更改属性（使用已过时或已删除USTRUCT引用新USTRUCT）。
    
    字段
    
    类型
    
    目的
    
    `OldName`
    
    字符串
    
    指定已过时或已删除的USTRUCT的名称。
    
    `NewName`
    
    字符串
    
    指定新USTRUCT的名称。
    
    `MatchSubstring`
    
    布尔
    
    （可选）如果存在并且设为`true`，此Core Redirect将应用给包含`OldName`值的任何结构体，而非要求完全匹配。
    
    ```cpp
    [CoreRedirects]
    +StructRedirects=(OldName="MyStruct",NewName="MyNewStruct")
    
    ```
    

## 名称灵活性和独特性

编写用于说明类、结构体、属性和函数的名称时可以使它们具有不同程度的独特性。 此外，Core Redirects系统将尽可能多地或尽可能少地使用你提供的信息。下表中提供了一些不同等级的独特性的示例。

示例格式

适用范围

`/Script/MyModule.MyActor.MyFunctionOrProperty`

仅适用于调用`MyModule`模块的`MyActor`类中的`MyFunctionOrProperty`的函数或属性。

`MyActor.MyFunctionOrProperty`

仅适用于调用`MyActor`类中的`MyFunctionOrProperty`的任何函数或属性，无论该类和函数存在于哪个模块中。

`MyFunctionOrProperty`

适用于调用任何模块的任何类中的`MyFunctionOrProperty`的任何函数或属性。

可能会在游戏和早于4.16版本的样本的特定`.ini`文件中找到一些已过时Core Redirects。尽管由于引擎的向后兼容性它们使用的格式仍然受支持，但不建议将它们用作在更高版本中编写你自己的Core Redirects的模板。相反，请仅使用此页面上指定的格式。

## 子字符串匹配

可在任何Core Redirect类型中使用`MatchSubstring`参数.如果存在并且设为`true`，`OldName`和`NewName`字段将被作为子字符串对待，而非要求完全匹配。这样，使用单个Core Redirect就可实现多个匹配。在以下示例中，我们先从一个结构体和一个类开始。

原始代码和值：

```cpp
USTRUCT()
struct FMyStruct
{
		GENERATED_BODY()

		UPROPERTY(EditAnywhere, Category = "Documentation")
		int32 TestInt;

		UPROPERTY(EditAnywhere, Category = "Documentation")
		int32 TestIntFromStruct;
};

UCLASS()
class REDIRECTORSTEST_API AMyActor : public AActor
{
		GENERATED_BODY()

public:
		UPROPERTY(EditAnywhere, Category = "Documentation")
		int32 TestInt;

		UPROPERTY(EditAnywhere, Category = "Documentation")
		int32 MainClassTestInt;

		UPROPERTY(EditAnywhere, Category = "Documentation")
		FMyStruct TestStruct;
};
```

![原始值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e551f98-8e99-42fe-9213-0ef3f52e5872/originalvalues.png)

此为原始代码和保存到 AMyActor 资源中的一系列原始值。

使用上面所示的值创建`AMyActor`资源并保存之后，我们就可以关闭编辑器，然后在`.h`文件中更改代码，在游戏的`.ini`文件中更改Core Redirects。我们将更改代码，使它与以下所示相同（更改`int32`属性的名称）：

```cpp
USTRUCT()
struct FMyStruct
{
		GENERATED_BODY()

		UPROPERTY(EditAnywhere, Category = "Documentation")
		int32 TestInteger;

		UPROPERTY(EditAnywhere, Category = "Documentation")
		int32 TestIntegerFromStruct;
};

UCLASS()
class REDIRECTORSTEST_API AMyActor : public AActor
{
		GENERATED_BODY()

public:
		UPROPERTY(EditAnywhere, Category = "Documentation")
		int32 TestInteger;

		UPROPERTY(EditAnywhere, Category = "Documentation")
		int32 MainClassTestInteger;

		UPROPERTY(EditAnywhere, Category = "Documentation")
		FMyStruct TestStruct;
};
```

更改之后，我们可以检验Core Redirect的效果，尤其是`MatchSubstring`的影响。结果如下：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73c50ed6-3396-4fbe-a694-bf8c2df04253/nocoreredirect.png)

在代码中，属性被重命名，但是未创建任何Core Redirect。因此，没有数据值迁移到新属性。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6ffac0d-a364-4e4e-932b-0d55769914b3/coreredirectwithoutmatchsubstring.png)

PropertyRedirects=(OldName="TestInt",NewName="TestInteger")导致只有名称完全匹配的两个属性迁移其数据。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5a174fd-0dd0-4288-91b5-de338c2b4691/coreredirectwithmatchsubstring.png)

PropertyRedirects=(OldName="TestInt",NewName="TestInteger",MatchSubstring=true)导致所有四个属性都迁移（由于子字符串匹配）。

`MatchSubtring`要求对传入资源进行更全面的检查，因此它可能会对启动时间产生影响。`MatchSubstring`旨在在进行大量更改时暂时被用作修补。我们的建议是，立即重新保存这些更改中涉及到的资源并将它们检入项目的源代码管理数据库中（包含所有相关代码更改），并且删除Core Redirect（无需进入源代码管理）。

## 调试核心重定向

你可以使用 `-DebugCoreRedirects` 命令行参数来调试核心重定向（Core Redirects）问题。此命令行参数会将额外信息添加到 UE日志中，以帮助识别核心重定向问题，包括拼写错误等。

-   [assets](https://dev.epicgames.com/community/search?query=assets)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [coreredirects](https://dev.epicgames.com/community/search?query=coreredirects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [受支持的Core Redirect类型](/documentation/zh-cn/unreal-engine/core-redirects-in-unreal-engine#%E5%8F%97%E6%94%AF%E6%8C%81%E7%9A%84coreredirect%E7%B1%BB%E5%9E%8B)
-   [名称灵活性和独特性](/documentation/zh-cn/unreal-engine/core-redirects-in-unreal-engine#%E5%90%8D%E7%A7%B0%E7%81%B5%E6%B4%BB%E6%80%A7%E5%92%8C%E7%8B%AC%E7%89%B9%E6%80%A7)
-   [子字符串匹配](/documentation/zh-cn/unreal-engine/core-redirects-in-unreal-engine#%E5%AD%90%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%8C%B9%E9%85%8D)
-   [调试核心重定向](/documentation/zh-cn/unreal-engine/core-redirects-in-unreal-engine#%E8%B0%83%E8%AF%95%E6%A0%B8%E5%BF%83%E9%87%8D%E5%AE%9A%E5%90%91)
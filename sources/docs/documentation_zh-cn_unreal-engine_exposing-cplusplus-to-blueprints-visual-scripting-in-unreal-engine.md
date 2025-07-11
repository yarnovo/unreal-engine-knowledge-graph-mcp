# 在虚幻引擎中将C++暴露给蓝图 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/exposing-cplusplus-to-blueprints-visual-scripting-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:35:13.218Z

---

目录

![将C++暴露给蓝图](https://dev.epicgames.com/community/api/documentation/image/a4e71c6f-afb6-4cec-ab6d-c391a7a60411?resizing_type=fill&width=1920&height=335)

可从两个主要方面考虑使用 C++ 或蓝图：

-   速度
-   表达式复杂度

这两个因素之外，便主要取决于游戏的复杂程度和团队的构成。如团队中美术师的数量多于程序员，则蓝图的优越性大于 C++ 代码。 相反如果程序员数量较多，则最好使用 C++。还需要预计开发过程中人员的缺席。在 Epic，普遍的工作流程是 - 内容设计师创建十分复杂的蓝图后，程序员编写新蓝图节点的代码，明确如何将大量工作压缩到 C++ 中，这样他们就能将功能块移入一个新的 C++ 函数中。 较好的方法是大量使用蓝图，复杂度达到一定程度，启用功能更简洁的表达式（否则它对非程序人员而言过于复杂）时将内容转入 C++； 或由执行速度指定到 C++ 的移动。

### 速度

实际上，蓝图执行的速度比 C++ 执行慢。这并不意味着会影响性能。 但需要大量计算或进行高频率操作时，最好使用 C++。也可以根据团队状况和项目性能对二者进行完美结合。 如蓝图功能较多，可将部分功能移入 C++ 使速度加快，蓝图中剩余的部分功能可保留灵活性。 如分析表明蓝图中的一项操作耗时极长，考虑只将该部分移入 C++，其他部分仍然保留在蓝图中。

举例而言，控制上千个 Actor 的群组系统通过蓝图可视化脚本执行时间极长。 在这类情况下，在 C++ 中处理决定、路径、和其他群组功能性能更佳，之后可将部分调整参数和控制函数公开到蓝图。

### 复杂度

就表达式复杂度而言，部分操作在 C++ 中更容易执行。 蓝图可良好地执行大量操作，但部分内容不易在节点中表达。 操作大型数据集、执行字符串操作，在大量数据集上执行复杂算术等内容均十分复杂，不易在视觉系统中进行操作。 这些内容更适合于 C++，因为可以轻松进行查看，了解具体细节。群组系统更适合 C++ 代码的另一个原因在于表达式复杂度。

## 范例

部分功能块适合在 C++ 中处理，部分适合在蓝图中处理。 所以在此列举一些游戏开发中 C++ 程序员和蓝图作者搭档工作的实例。

-   程序员可在 C++ 中创建定义自定义事件的角色类，之后蓝图可用于该角色类的延展，实际指定模型并进行默认设置。 查看 ShooterGame 范例项目中的玩家角色和敌方机器人，了解类似实现。
    
-   可在 C++ 中实现能力系统的基础类，之后设计师再创建实际执行操作的蓝图。在 StrategyGame 范例项目中有一个在 C++ 中定义的基础炮台， 但火焰喷射器、火炮台和弓箭台的行为均在蓝图中定义。
    
-   "收集"或"重生"函数为可在蓝图中实现的事件，这样的可拾取道具可被覆写，以便设计师生成不同粒子发射器和声效。 ShooterGame 和 StrategyGame 中均有此方式创建的可拾取道具。
    

## 创建蓝图 API：提示和技巧

程序员创建对蓝图公开的 API 时需要考虑以下几点：

-   可选参数便于在蓝图中处理：
    
    ```cpp
              /**
               * 将字符串显示到日志中，也可选择显示到屏幕上。
               * 如 Print To Log 为 true，它将显示在 Output Log 窗口中。否则它将被记录为"Verbose"，通常不会显示。
               *
               * @param	InString		登出字符串
               * @param	bPrintToScreen	是否将输出显示到屏幕上
               * @param	bPrintToLog		是否将输出保存到日志中
               * @param	bPrintToConsole	是否将输出显示到控制台
               * @param	TextColor		是否将输出显示到控制台
               */
              UFUNCTION(BlueprintCallable, meta=(WorldContext="WorldContextObject", CallableWithoutWorldContext, Keywords = "log print", AdvancedDisplay = "2"), Category="Utilities|String")
              static void PrintString(UObject* WorldContextObject, const FString& InString = FString(TEXT("Hello")), bool bPrintToScreen = true, bool bPrintToLog = true, FLinearColor TextColor = FLinearColor(0.0,0.66,1.0));
    		
    ```
    
-   在带大量返回参数的函数和返回结构体的函数之间优先前者。以下片段显示如何在节点上创建多个输出引脚：
    
    ```cpp
              UFUNCTION(BlueprintCallable, Category = "Example Nodes")
              static void MultipleOutputs(int32& OutputInteger, FVector& OutputVector);
    		
    ```
    
-   可在现有函数上添加新参数，但如果要进行移除或变更，则需要否决原始函数并添加一个新函数。必须使用否决元数据，使新函数的信息显示在蓝图中：
    
    ```cpp
              UFUNCTION(BlueprintCallable, Category="Collision", meta=(DeprecatedFunction, DeprecationMessage = "Use new CapsuleOverlapActors", WorldContext="WorldContextObject", AutoCreateRefTerm="ActorsToIgnore"))
              static ENGINE_API bool CapsuleOverlapActors_DEPRECATED(UObject* WorldContextObject, const FVector CapsulePos, float Radius, float HalfHeight, EOverlapFilterOption Filter, UClass* ActorClassFilter, const TArray<AActor*>& ActorsToIgnore, TArray<class AActor*>& OutActors);
    		
    ```
    
-   如果函数需要接受枚举，考虑将"expand enum as execs"用作元数据，可使节点更易于使用。
    
    ```cpp
              UFUNCTION(BlueprintCallable, Category = "DataTable", meta = (ExpandEnumAsExecs="OutResult", DataTablePin="CurveTable"))
              static void EvaluateCurveTableRow(UCurveTable* CurveTable, FName RowName, float InXY, TEnumAsByte<EEvaluateCurveTableResult::Type>& OutResult, float& OutXY);
    		
    ```
    
-   许多完成耗时较长的操作（如 move here）均为隐藏函数。
    
    ```cpp
              /**
               * 执行带延迟的隐藏操作。
               *
               * @param WorldContext	世界背景。
               * @param Duration 		延迟长度。
               * @param LatentInfo 	隐藏操作。
               */
              UFUNCTION(BlueprintCallable, Category="Utilities|FlowControl", meta=(Latent, WorldContext="WorldContextObject", LatentInfo="LatentInfo", Duration="0.2"))
              static void	Delay(UObject* WorldContextObject, float Duration, struct FLatentActionInfo LatentInfo );
    		
    ```
    
-   如有可能，考虑将函数放入共享库。便于在多个类之间使用，避开"target"引脚。
    
    ```cpp
              class DOCUMENTATIONCODE_API UTestBlueprintFunctionLibrary : public UBlueprintFunctionLibrary
    		
    ```
    
-   尽可能将节点标记为纯，可避免在节点上使用连线的执行引脚。
    
    ```cpp
              /* 在 0 和 最大 - 1 之间返回一致分配的随机数 */
              UFUNCTION(BlueprintPure, Category="Math|Random")
              static int32 RandomInteger(int32 Max);
    		
    ```
    
-   将一个函数标记为 `const` 也可使蓝图节点不带执行引脚：
    
    ```cpp
              /**
               * 获得 actor 到世界的转换。
               * @return 从 actor 空间转换到世界空间的转换。
               */
              UFUNCTION(BlueprintCallable, meta=(DisplayName = "GetActorTransform"), Category="Utilities|Transformation")
              FTransform GetTransform() const;
    ```
    

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [速度](/documentation/zh-cn/unreal-engine/exposing-cplusplus-to-blueprints-visual-scripting-in-unreal-engine#%E9%80%9F%E5%BA%A6)
-   [复杂度](/documentation/zh-cn/unreal-engine/exposing-cplusplus-to-blueprints-visual-scripting-in-unreal-engine#%E5%A4%8D%E6%9D%82%E5%BA%A6)
-   [范例](/documentation/zh-cn/unreal-engine/exposing-cplusplus-to-blueprints-visual-scripting-in-unreal-engine#%E8%8C%83%E4%BE%8B)
-   [创建蓝图 API：提示和技巧](/documentation/zh-cn/unreal-engine/exposing-cplusplus-to-blueprints-visual-scripting-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%93%9D%E5%9B%BEapi%EF%BC%9A%E6%8F%90%E7%A4%BA%E5%92%8C%E6%8A%80%E5%B7%A7)
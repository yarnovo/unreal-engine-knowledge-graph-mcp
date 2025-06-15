# 在虚幻引擎中编程：蓝图与C++ | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/coding-in-unreal-engine-blueprint-vs.-cplusplus
> 
> 生成时间: 2025-06-14T18:51:11.809Z

---

目录

![在虚幻引擎中编程：蓝图与C++](https://dev.epicgames.com/community/api/documentation/image/052be925-5cfd-4072-b986-87d54e092f6a?resizing_type=fill&width=1920&height=335)

你可以只使用蓝图或只使用C++来制作虚幻引擎（UE）项目，但将两者结合使用对大多数项目都有益。那么，如何为你的项目决定蓝图和C++的最佳组合呢？本文档就如何回答这个问题提供了指导。

## 编程与脚本编写

要想知道何时使用蓝图或C++，首先必须了解编程和脚本编写的区别。

-   **编程** ：用于定义系统的指令。
-   **脚本编写** ：通过与现有系统交互来定义行为的指令。

例如，你可以用编程来定义载具系统，使其能发挥出加速和转向等基本功能，你可以用脚本来定义具体的载具类型，如汽车或船只等。

在这种情境下，C++是一种编程语言，而蓝图是一种脚本语言。不过，这两者之间的区别并不明显，因为你可以用C++来定义行为，也可以用蓝图来定义系统。此外，项目中有时会出现编程和脚本编写界限模糊的情况，两者之间的最佳分工取决于具体场景。

蓝图作为一种脚本语言，可与公开的虚幻引擎功能交互。同样地，你也可以对蓝图公开你的自定义功能。如需更多信息，请参阅[结合蓝图与C++](/documentation/zh-cn/unreal-engine/coding-in-unreal-engine-blueprint-vs.-cplusplus#%E7%BB%93%E5%90%88%E8%93%9D%E5%9B%BE%E4%B8%8Ec++)。

## 对比蓝图与C++

由于每个项目和团队都是独一无二的，因此在决定使用蓝图还是C++时，没有"对错之分"，但我们建议在使用前考虑清楚它们各自的优势。

### 蓝图的优势

-   **脚本编写** ：蓝图能更轻松地定义行为。
-   **迭代更快** ：蓝图非常适合原型开发，因为蓝图类的创建、修改、编译和测试更加快捷。
-   **可用性更广泛** ：蓝图的可视化流程展示更易于理解和使用，因此偏向可视化编程的程序员或非程序员（如设计师和美术师）均可使用蓝图。
-   **可发现性更强** ：有了蓝图，查找和吸纳API和资产引用将更为容易。
-   **内存模型更安全** ：蓝图在设计上具有安全的内存模型，可避免崩溃。

### C++的优势

-   **编程** ：C++可以更轻松地编译新系统。
-   **运行时性能更快** ：C++的性能更高，但程度取决于具体情况。如需更多详细信息，请参阅下方的性能问题小节。
-   **可访问性更广** ：C++可以访问较低级别的虚幻引擎功能。
-   **可扩展性更广** ：你可以使用C++创建并连接外部系统和库。
-   **控制能力更强** ：C++允许对系统、资源和复杂算法进行底层控制。
-   **协作更顺畅** ：C++以文本形式存储，这使得项目之间的对比、合并和共享更为容易。但你可以对蓝图使用[虚幻对比工具](/documentation/zh-cn/unreal-engine/ue-diff-tool-in-unreal-engine)。
-   **伸缩性更好** ：大型C++文件比大型蓝图图表更容易修改。
-   **更好调试** ：C++的调试工具比[蓝图调试器](/documentation/zh-cn/unreal-engine/blueprint-debugger-in-unreal-engine)更强大。

### 性能问题

从根本上说，C++比蓝图的性能更强，因为：

-   C++编译成机器代码，直接在CPU上执行。
-   蓝图编译成字节码，在虚拟机上执行。

这意味着蓝图存在额外的脚本执行开销。不过，蓝图和C++的性能差异通常不大，而且取决于情境。以下示例列出了影响最大的情境：

-   核心、底层基础设施。
-   大量使用I/O或处理资源的紧密循环。
-   处理大型数据集的系统。
-   具有多个实例且依赖于Tick的类。
-   因多线程而受益的场景，因为蓝图不支持多线程。

为提高性能，请使用定时器或委托来安排蓝图中的工作，而不要使用Tick。

如果你使用蓝图且存在性能问题，请使用[Unreal Insights](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)对项目进行分析，对最严重的性能瓶颈进行优化，然后再考虑[将蓝图转换为C++](/documentation/zh-cn/unreal-engine/coding-in-unreal-engine-blueprint-vs.-cplusplus#%E5%B0%86%E8%93%9D%E5%9B%BE%E8%BD%AC%E6%8D%A2%E4%B8%BAc++)。

## 结合蓝图与C++

要结合蓝图和C++，最佳方法是以C++为基础，在其上编译蓝图类。在实践中，这意味着将C++公开，以便从蓝图中使用。

你可以使用以下方法将C++公开给蓝图：

-   创建一个能扩展C++类的蓝图类，并使用诸如 `UPROPERTY(BlueprintReadWrite)` 或 `UFUNCTION(BlueprintCallable)` 的[元数据说明符](/documentation/zh-cn/unreal-engine/metadata-specifiers-in-unreal-engine)来公开特定元素。
-   创建一个能扩展 `UBlueprintFunctionLibrary` 的C++类，以公开该类的静态函数。

在一些不常见的情况下，你可能需要将蓝图公开给C++，这可以通过以下方法实现：

-   使用 `UFUNCTION(BlueprintImplementableEvent)` 说明符，定义必须在蓝图中实现的纯虚拟函数。
-   使用 `UFUNCTION(BlueprintNativeEvent)` 说明符，定义可选择在蓝图中重载的虚拟函数。
-   创建用户界面时，可使用 `UPROPERTY(meta=(BindWidget))` 访问在蓝图中创建的UserWidget。

如需详细了解这些方法，请参阅以下页面：

-   [C++和蓝图](/documentation/zh-cn/unreal-engine/cpp-and-blueprints-example)：创建可扩展蓝图的C++类的详细示例。
-   [将C++公开给蓝图](/documentation/zh-cn/unreal-engine/exposing-cplusplus-to-blueprints-visual-scripting-in-unreal-engine)：编写蓝图友好型API的技巧和窍门。
-   [向蓝图公开Gameplay元素](/documentation/zh-cn/unreal-engine/exposing-gameplay-elements-to-blueprints-visual-scripting-in-unreal-engine)：面向Gameplay程序员的技术指南，介绍如何将Gameplay元素公开给蓝图。
-   [蓝图函数库](/documentation/zh-cn/unreal-engine/blueprint-function-libraries-in-unreal-engine)：了解如何使用 `UBlueprintFunctionLibrary` 。
-   [Lyra示例游戏](/documentation/zh-cn/unreal-engine/lyra-sample-game-in-unreal-engine)：了解Lyra项目，该项目包含上述每种方法的示例。

## 将蓝图转换为C++

如果你想将蓝图转换为C++，可以先使用[蓝图头文件视图](/documentation/zh-cn/unreal-engine/an-overview-of-the-blueprint-header-view-in-unreal-engine)为蓝图类或结构体生成C++头文件。生成的 `.h` 文件包含蓝图中的所有变量和函数声明，但你必须手动将函数实现转换为匹配的 `.cpp` 文件。

将蓝图转换为C++后，可能需要更新引用才能使用新的C++类。如果需要进行多次更新，可以考虑使用[核心重定向](/documentation/zh-cn/unreal-engine/core-redirects-in-unreal-engine)来自动重新映射这些引用。

-   [c++](https://dev.epicgames.com/community/search?query=c++)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [编程与脚本编写](/documentation/zh-cn/unreal-engine/coding-in-unreal-engine-blueprint-vs.-cplusplus#%E7%BC%96%E7%A8%8B%E4%B8%8E%E8%84%9A%E6%9C%AC%E7%BC%96%E5%86%99)
-   [对比蓝图与C++](/documentation/zh-cn/unreal-engine/coding-in-unreal-engine-blueprint-vs.-cplusplus#%E5%AF%B9%E6%AF%94%E8%93%9D%E5%9B%BE%E4%B8%8Ec++)
-   [蓝图的优势](/documentation/zh-cn/unreal-engine/coding-in-unreal-engine-blueprint-vs.-cplusplus#%E8%93%9D%E5%9B%BE%E7%9A%84%E4%BC%98%E5%8A%BF)
-   [C++的优势](/documentation/zh-cn/unreal-engine/coding-in-unreal-engine-blueprint-vs.-cplusplus#c++%E7%9A%84%E4%BC%98%E5%8A%BF)
-   [性能问题](/documentation/zh-cn/unreal-engine/coding-in-unreal-engine-blueprint-vs.-cplusplus#%E6%80%A7%E8%83%BD%E9%97%AE%E9%A2%98)
-   [结合蓝图与C++](/documentation/zh-cn/unreal-engine/coding-in-unreal-engine-blueprint-vs.-cplusplus#%E7%BB%93%E5%90%88%E8%93%9D%E5%9B%BE%E4%B8%8Ec++)
-   [将蓝图转换为C++](/documentation/zh-cn/unreal-engine/coding-in-unreal-engine-blueprint-vs.-cplusplus#%E5%B0%86%E8%93%9D%E5%9B%BE%E8%BD%AC%E6%8D%A2%E4%B8%BAc++)
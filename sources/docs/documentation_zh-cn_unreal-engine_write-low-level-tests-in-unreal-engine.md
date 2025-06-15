# 在虚幻引擎中编写低级别测试 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:40:09.863Z

---

目录

![编写低级别测试](https://dev.epicgames.com/community/api/documentation/image/91cb59c0-4b68-4575-96ae-3240f2176158?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [低级别测试](/documentation/zh-cn/unreal-engine/low-level-tests-in-unreal-engine)
-   [低级别测试类型](/documentation/zh-cn/unreal-engine/types-of-low-level-tests-in-unreal-engine)

本文档旨在讨论以下内容：

-   [编写低级别测试](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E7%BC%96%E5%86%99%E4%BD%8E%E7%BA%A7%E5%88%AB%E6%B5%8B%E8%AF%95)，包括：
    -   [行为驱动开发（BDD）测试示例](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E8%A1%8C%E4%B8%BA%E9%A9%B1%E5%8A%A8%E5%BC%80%E5%8F%91%E6%B5%8B%E8%AF%95%E7%A4%BA%E4%BE%8B)
    -   [测试驱动开发（TDD）测试示例](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E6%B5%8B%E8%AF%95%E9%A9%B1%E5%8A%A8%E5%BC%80%E5%8F%91%E7%A4%BA%E4%BE%8B)
-   [其他低级别测试功能](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E5%85%B6%E4%BB%96%E4%BD%8E%E7%BA%A7%E5%88%AB%E6%B5%8B%E8%AF%95%E5%8A%9F%E8%83%BD)
-   [指南和最佳实践](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E7%BC%96%E5%86%99%E5%92%8C%E6%95%B4%E7%90%86%E6%B5%8B%E8%AF%95%E7%9A%84%E6%8C%87%E5%8D%97)

## 编写低级别测试

本页面主要讨论在 **虚幻引擎（UE）** 中用Catch2编写 **低级别测试（LLT）** 的结构、指南和最佳实践。有关Catch2的特定信息，请参阅[Catch2 GitHub仓库](https://github.com/catchorg/Catch2)。如需编写测试的完整指南，请参阅[Catch2参考](https://github.com/catchorg/Catch2/tree/devel/docs)。

请务必使用适用于测试的虚幻C++编码规范。有关更多信息，请参阅[虚幻编码标准](/documentation/zh-cn/unreal-engine/epic-cplusplus-coding-standard-for-unreal-engine)。

### 开始之前

查看[低级别测试类型](/documentation/zh-cn/unreal-engine/types-of-low-level-tests-in-unreal-engine)文档，了解以下项目：

-   确保你的目录匹配文档步骤中概述的目录。

当你准备好开始编写测试 `.cpp` 文件时，请遵循以下步骤：

1.  为你的 `.cpp` 测试文件指定一个描述性名称，如 `<NAME_OF_FILE>Test.cpp`
    -   有关更多信息，请参阅本文档的[命名规范](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E6%96%87%E4%BB%B6%E5%92%8C%E6%96%87%E4%BB%B6%E5%A4%B9%E7%9A%84%E5%91%BD%E5%90%8D%E8%A7%84%E8%8C%83)小节。
2.  准备所有必要的头文件。
    -   你至少需要具备可选的 `#include "CoreMinimal.h"` 和 `#include "TestHarness.h"` 。
    -   在你准备好最低标准的头文件后，仅采用完成测试所必需的头文件。
3.  现在，你可以使用 **TDD（测试驱动型开发）** 或 **BDD（行为驱动型开发）** 范例编写测试。
    -   [BDD测试示例](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E8%A1%8C%E4%B8%BA%E9%A9%B1%E5%8A%A8%E5%BC%80%E5%8F%91%E6%B5%8B%E8%AF%95%E7%A4%BA%E4%BE%8B)
    -   [TDD测试示例](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E6%B5%8B%E8%AF%95%E9%A9%B1%E5%8A%A8%E5%BC%80%E5%8F%91%E6%B5%8B%E8%AF%95%E7%A4%BA%E4%BE%8B)

### 行为驱动开发测试示例

BDD式测试专注于通过 `SCENARIO` 进行测试。一个文件可以包括多个场景。场景的核心结构为：

-   `GIVEN` ：设置条件
-   `WHEN` ：执行操作
-   `THEN` ：预期结果成立。

`GIVEN` 和 `WHEN` 分段可能包容其他初始化和内部状态变更。`THEN` 分段应执行检查，以确定理想结果是否成立。`REQUIRE` 停止执行单个测试时， `CHECK` 故障继续执行。

下方示例代码提供了UE低级别测试框架中BDD式测试的大致情况：

```cpp

#include "CoreMinimal.h"
#include "TestHarness.h"

// 其他include必须放在CoreMinimal.h和TestHarness.h之后，按范围分组（std库、UE模块、第三方等）

/* 一种BDD式测试 */

SCENARIO("Summary of test scenario", "[functional][feature][slow]") // 标签放入括号[]
{
    GIVEN("Setup phase")
    {
        // 初始化变量、设置测试先决条件等

        [...]

        WHEN("I perform an action")
        {
            // 改变内部状态

            [...]

            THEN("Check for expectations")
            {
                REQUIRE(Condition_1);
                REQUIRE(Condition_2);
                // 如果先前的要求失败，则未到达
                CHECK(Condition_3);
            }
        }
    }
}

```

### 测试驱动开发测试示例

TDD式测试专注于通过 `TEST_CASE` 进行测试。每个 `TEST_CASE` 都可包括设置所测试用例的代码。然后，实际测试用例可分为多个 `SECTION` 块。每个 `SECTION` 块应执行检查，以确定理想结果是否成立。在 `SECTION` 块中执行所有检查后， `TEST_CASE` 末尾可以包含必要的清理代码。

下方示例代码提供了UE低级别测试框架中TDD式测试的大致情况：

```cpp

#include "CoreMinimal.h"
#include "TestHarness.h"

// 其他include必须放在CoreMinimal.h和TestHarness.h之后，按范围分组（std库、UE模块、第三方等）

/* 典型TDD式测试 */

TEST_CASE("Summary of test case", "[unit][feature][fast]")
{
    // 此测试用例的设置代码

    [...]

    // 测试可以分为几个部分
    SECTION("Test #1")
    {
        REQUIRE(Condition_1);
    }

    ...

    SECTION("Test #n")
    {
        REQUIRE(Condition_n);
    }

    // 此测试用例的清理代码

    [...]

}

```

测试用例也可使用双冒号 `::` 符号在测试中创建层级：

```cpp
TEST_CASE("Organic::Tree::Apple::Throw an apple away from the tree") { ... }
```

本小节中提供的示例并未详尽介绍虚幻引擎中低级别测试或Catch2的所有功能。有关生成器、基准测试、浮点近似值助手、匹配器、变量捕获、记录等的详细信息，可查看外部[Catch2文档](https://github.com/catchorg/Catch2/tree/devel/docs)。

### 更多示例

引擎目录 `Engine/Source/Runtime/Core/Tests` 中有多个UE才有的低级别测试示例。要继续查看来自[低级别测试类型](/documentation/zh-cn/unreal-engine/types-of-low-level-tests-in-unreal-engine)的示例，你可以查看位于 `Engine/Source/Programs/LowLevelTests/FoundationTests/Tests` 中的 `ArchiveReplaceObjectRefTests.cpp` 文件中的TDD式测试示例。

## 其他低级别测试功能

### 测试组和生命周期事件

分组测试是UE的Catch2扩展库的功能。默认情况下，所有测试用例都分组到名称为空的组。要将测试添加到组中，请将其名称指定为第一个参数，并使用测试用例的 `GROUP_*` 版本：

```cpp
GROUP_TEST_CASE("Apples", "Recipes::Baked::Pie::Cut slice", "[baking][recipe]") 
GROUP_TEST_CASE_METHOD("Oranges", OJFixture, "Recipes::Raw::Juice Oranges", "[raw][recipe]") 
GROUP_METHOD_AS_TEST_CASE("Pears", PoachInWine, "Recipes::Boiled::Poached Pears", "[desert][recipe]") 
GROUP_REGISTER_TEST_CASE("Runtime", UnregisteredStaticMethod, "Dynamic", "[dynamic]")
```

对于每个组，有六个自我描述的生命周期事件。以下代码分段说明了这些事件：

```cpp
GROUP_BEFORE_ALL("Apples") {
    std::cout << "Called once before all tests in group Apples, use for one-time setup.\n";
} 

GROUP_AFTER_ALL("Oranges") { 
    std::cout << "Called once after all tests in group Oranges, use for one-time cleanup.\n"; 
} 

GROUP_BEFORE_EACH("Apples") { 
    std::cout << "Called once before each test in group Apples, use for repeatable setup.\n"; 
} 

GROUP_AFTER_EACH("Oranges") { 
    std::cout << "Called once after each tests in group Oranges, use for repeatable cleanup.\n"; 
} 

GROUP_BEFORE_GLOBAL() { 
    std::cout << "Called once before all groups, use for global setup.\n"; 
} 

GROUP_AFTER_GLOBAL() { 
    std::cout << "Called once after all groups, use for global cleanup.\n"; 
} 

GROUP_TEST_CASE("Apples", "Test #1") { 
    std::cout << "Apple #1\n"; 
} 

GROUP_TEST_CASE("Apples", "Test #2") { 
    std::cout << "Apple #2\n"; 
} 

GROUP_TEST_CASE("Oranges", "Test #1") { 
    std::cout << "Orange #1\n"; 
} 

GROUP_TEST_CASE("Oranges", "Test #2") { 
    std::cout << "Orange #2\n"; 
}
```

This produces the output:

```cpp
Called once before all groups, use for global setup. 
Called once before all tests in group Apples, use for one-time setup. 
Called once before each test in group Apples, use for repeatable setup. 
Apple #1. 
Called once before each test in group Apples, use for repeatable setup. 
Apple #2. 
Orange #1. 
Called once after each tests in group Oranges, use for repeatable cleanup. 
Orange #2. 
Called once after each tests in group Oranges, use for repeatable cleanup. 
Called once after all tests in group Oranges, use for one-time cleanup. 
Called once after all groups, use for global cleanup.
```

## 编写和整理测试的指南

### 文件和文件夹的命名规范

-   为你的测试文件指定描述性名称。
    -   如果 `SourceFile.cpp` 是你要测试的源文件，则将测试文件命名为 `SourceFileTest.cpp` 或 `SourceFileTests.cpp` 。
-   镜像所测试模块的文件夹结构。
    -   对于显性测试，`Alpha/Omega/SourceFile.cpp` 映射到 `Alpha/Omega/SourceFileTests.cpp` 。
-   如果不是单元测试，则避免在测试文件名称中使用从单元测试派生的术语，此定义具有限制性，错误命名可能引起混淆。

单元测试应瞄准最小的可测试单元，一个类或一个方法，并且运行时间为几秒或更短。相同原则适用于其他类型的专业测试：集成测试、功能测试、烟雾测试、端到端测试、性能测试、应力测试或负载测试。你还可以将所有单元测试放在 **Unit** 子文件夹中。

##### 显式测试资源文件夹

对于显式测试，测试文件（如任意二进制文件、资产文件或其他基于文件系统的资源）必须放在 *资源文件夹* 。在 `.Build.cs` 模块中设置此文件夹：

```cpp
SetResourcesFolder("TestFilesResources");
```

当 **虚幻编译工具（UBT）** 运行平台部署步骤时，UBT会将此文件夹及其完整的内容复制到二进制路径，以便测试可以进行相对定位，并从中加载资源。

### 最佳实践

-   标记测试用例和场景。
    -   使用统一的名称，并使名称保持简短。
    -   根据你的需求使用标记。例如，你可以选择并行运行标记为 `[unit]` 的测试，或将所有运行缓慢的测试标记为在夜间构建时运行。
-   确保每个 `SECTION` 或 `THEN` 块至少包含一个 `REQUIRE` 或 `CHECK` 。
    -   没有预期结果的测试毫无价值。
-   当必须满足测试先决条件时，使用 `REQUIRE` 。
    -   `REQUIRE` 会在出现故障时立即停止，但 `CHECK` 不会。
-   设计具有确定性且符合某种类型的测试。
    -   按类型创建测试并为其分组，无论它们是单元测试、集成测试、功能测试、应力测试还是其他测试。
-   将缓慢测试标记为 `[slow]` ，如果计划用作性能测试，则标记为 `[performance]` 。
    -   这可以用于将测试过滤到"持续集成/持续交付（CI/CD）"管线中的夜间构建中。
-   确保测试代码支持所测试模块需要的所有平台。
    -   例如，当使用平台文件系统时，使用 `FPlatformFileManager` 类，不要假定测试将仅在桌面平台上运行。
-   使用测试组和生命周期事件独立于其他测试初始化某些测试。
    -   参阅[测试组和生命周期事件](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E6%B5%8B%E8%AF%95%E7%BB%84%E5%92%8C%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%BA%8B%E4%BB%B6)小节。
-   遵循每种测试类型的最佳实践。
    -   例如，单元测试应使用模拟，并且不得依赖外部依赖项（其他模块、本地数据库等），同时不应有顺序依赖性。
    -   有关不同测试类型及其特性的更多信息，请参阅[低级别测试概述](/documentation/zh-cn/unreal-engine/low-level-tests-in-unreal-engine)。

## 下一步

你完成测试编写后，请参阅"构建和运行低级别测试"文档执行测试。

[](/documentation/zh-cn/unreal-engine/build-and-run-low-level-tests-in-unreal-engine)

[![构建和运行低级别测试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b0967aa-f2b2-4c97-90eb-a2a2fc66bfa5/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/build-and-run-low-level-tests-in-unreal-engine)

[构建和运行低级别测试](/documentation/zh-cn/unreal-engine/build-and-run-low-level-tests-in-unreal-engine)

[了解构建和运行低级别测试的不同方法。](/documentation/zh-cn/unreal-engine/build-and-run-low-level-tests-in-unreal-engine)

-   [testing](https://dev.epicgames.com/community/search?query=testing)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [test](https://dev.epicgames.com/community/search?query=test)
-   [low-level tests](https://dev.epicgames.com/community/search?query=low-level%20tests)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [编写低级别测试](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E7%BC%96%E5%86%99%E4%BD%8E%E7%BA%A7%E5%88%AB%E6%B5%8B%E8%AF%95)
-   [开始之前](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E5%BC%80%E5%A7%8B%E4%B9%8B%E5%89%8D)
-   [行为驱动开发测试示例](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E8%A1%8C%E4%B8%BA%E9%A9%B1%E5%8A%A8%E5%BC%80%E5%8F%91%E6%B5%8B%E8%AF%95%E7%A4%BA%E4%BE%8B)
-   [测试驱动开发测试示例](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E6%B5%8B%E8%AF%95%E9%A9%B1%E5%8A%A8%E5%BC%80%E5%8F%91%E6%B5%8B%E8%AF%95%E7%A4%BA%E4%BE%8B)
-   [更多示例](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E7%A4%BA%E4%BE%8B)
-   [其他低级别测试功能](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E5%85%B6%E4%BB%96%E4%BD%8E%E7%BA%A7%E5%88%AB%E6%B5%8B%E8%AF%95%E5%8A%9F%E8%83%BD)
-   [测试组和生命周期事件](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E6%B5%8B%E8%AF%95%E7%BB%84%E5%92%8C%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%BA%8B%E4%BB%B6)
-   [编写和整理测试的指南](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E7%BC%96%E5%86%99%E5%92%8C%E6%95%B4%E7%90%86%E6%B5%8B%E8%AF%95%E7%9A%84%E6%8C%87%E5%8D%97)
-   [文件和文件夹的命名规范](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E6%96%87%E4%BB%B6%E5%92%8C%E6%96%87%E4%BB%B6%E5%A4%B9%E7%9A%84%E5%91%BD%E5%90%8D%E8%A7%84%E8%8C%83)
-   [显式测试资源文件夹](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E6%98%BE%E5%BC%8F%E6%B5%8B%E8%AF%95%E8%B5%84%E6%BA%90%E6%96%87%E4%BB%B6%E5%A4%B9)
-   [最佳实践](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)
-   [下一步](/documentation/zh-cn/unreal-engine/write-low-level-tests-in-unreal-engine#%E4%B8%8B%E4%B8%80%E6%AD%A5)

相关文档

[

低级别测试类型

![低级别测试类型](https://dev.epicgames.com/community/api/documentation/image/4aee28c0-704f-45cb-bd5d-dc877bd50ddc?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/types-of-low-level-tests-in-unreal-engine)

[

构建和运行低级别测试

![构建和运行低级别测试](https://dev.epicgames.com/community/api/documentation/image/6b0967aa-f2b2-4c97-90eb-a2a2fc66bfa5?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/build-and-run-low-level-tests-in-unreal-engine)